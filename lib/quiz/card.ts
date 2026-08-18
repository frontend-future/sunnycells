/**
 * Card field helpers: brand from the leading digits, display grouping, and a Luhn
 * check. Pure functions so they can be tested without a browser.
 *
 * NOTE: none of this validates that a card is real or has money on it. It catches
 * typos before a request is made, which is all client-side card logic can ever do.
 */

export type CardBrand = "visa" | "mastercard" | "amex" | "discover" | "diners" | "jcb" | null;

export const BRAND_LABEL: Record<Exclude<CardBrand, null>, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "Amex",
  discover: "Discover",
  diners: "Diners Club",
  jcb: "JCB",
};

/** Longest digit run the brand uses, so the field stops accepting more. */
export const BRAND_LENGTH: Record<Exclude<CardBrand, null>, number> = {
  visa: 19,
  mastercard: 16,
  amex: 15,
  discover: 19,
  diners: 14,
  jcb: 19,
};

export const digitsOf = (v: string) => (v.match(/\d/g) ?? []).join("");

/* Matched on the issuer identification number, which is what the leading digits are.
   Ordered so the narrower ranges are tested before the wider ones. */
export function brandOf(value: string): CardBrand {
  const d = digitsOf(value);
  if (!d) return null;
  if (/^4/.test(d)) return "visa";
  if (/^3[47]/.test(d)) return "amex";
  if (/^3(0[0-5]|[68])/.test(d)) return "diners";
  if (/^35/.test(d)) return "jcb";
  if (/^5[1-5]/.test(d) || /^2(2[2-9]|[3-6]\d|7[01]|720)/.test(d)) return "mastercard";
  if (/^6(011|5|4[4-9]|22)/.test(d)) return "discover";
  return null;
}

/** 4-6-5 for Amex and Diners, otherwise fours, which is how the numbers are printed. */
export function formatCardNumber(value: string): string {
  const brand = brandOf(value);
  const max = brand ? BRAND_LENGTH[brand] : 19;
  const d = digitsOf(value).slice(0, max);
  const groups = brand === "amex" ? [4, 6, 5] : brand === "diners" ? [4, 6, 4] : [4, 4, 4, 4, 4];

  const out: string[] = [];
  let i = 0;
  for (const size of groups) {
    if (i >= d.length) break;
    out.push(d.slice(i, i + size));
    i += size;
  }
  return out.join(" ");
}

/** The checksum every card number satisfies. Catches a mistyped digit, nothing more. */
export function luhnOk(value: string): boolean {
  const d = digitsOf(value);
  if (d.length < 12) return false;
  let sum = 0;
  let double = false;
  for (let i = d.length - 1; i >= 0; i--) {
    let n = d.charCodeAt(i) - 48;
    if (double) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    double = !double;
  }
  return sum % 10 === 0;
}

export function formatExpiry(value: string): string {
  const d = digitsOf(value).slice(0, 4);
  return d.length <= 2 ? d : `${d.slice(0, 2)} / ${d.slice(2)}`;
}

/** Valid month, and the last day of that month is still ahead of `now`. */
export function expiryOk(value: string, now = new Date()): boolean {
  const d = digitsOf(value);
  if (d.length !== 4) return false;
  const month = Number(d.slice(0, 2));
  const year = 2000 + Number(d.slice(2));
  if (month < 1 || month > 12) return false;
  /* Day 0 of the next month is the last day of this one, so a card is good through
     the whole of its printed month. */
  return new Date(year, month, 0, 23, 59, 59) > now;
}

export function cvcOk(value: string, brand: CardBrand): boolean {
  const d = digitsOf(value);
  return d.length === (brand === "amex" ? 4 : 3);
}
