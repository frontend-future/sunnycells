import { stripe } from "./server";

export type PromoQuote = { id: string; code: string; total: number; discount: number };

/* Looks a typed discount code up in Stripe and prices the first invoice with it, in cents.
   Returns null for a code that does not exist, is inactive, or has no usable coupon. The
   client never supplies an amount: the subscription route calls this again and takes the id. */
export async function quotePromo(code: string, base: number): Promise<PromoQuote | null> {
  const clean = code.trim();
  if (!clean || clean.length > 40) return null;
  const hit = (await stripe().promotionCodes.list({ code: clean, active: true, limit: 1, expand: ["data.promotion.coupon"] })).data[0];
  const coupon = hit?.promotion?.coupon;
  if (!hit || !coupon || typeof coupon === "string" || !coupon.valid) return null;
  if (coupon.currency && coupon.currency !== "usd") return null;
  const off = coupon.amount_off ?? Math.floor((base * (coupon.percent_off ?? 0)) / 100);
  const discount = Math.min(base, off);
  return { id: hit.id, code: hit.code, total: base - discount, discount };
}
