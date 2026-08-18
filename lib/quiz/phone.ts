/**
 * US phone formatting for the checkout field. The country is fixed to the US there,
 * so the +1 is a constant rather than something to parse.
 */

const digitsOf = (v: string) => (v.match(/\d/g) ?? []).join("");

/** The ten digits after the country code, whatever shape they were typed in. */
export function nationalDigits(value: string): string {
  const d = digitsOf(value);
  /* A leading 1 is the country code, never the start of an area code: US area codes
     cannot begin with 0 or 1. So dropping it is safe and lets a pasted +1 number,
     a bare 10 digit number, and the field's own prefix all land the same way. */
  return (d.startsWith("1") ? d.slice(1) : d).slice(0, 10);
}

export function formatPhone(value: string): string {
  if (!digitsOf(value)) return "";
  const d = nationalDigits(value);
  if (!d) return "+1";
  if (d.length <= 3) return `+1 (${d}`;
  if (d.length <= 6) return `+1 (${d.slice(0, 3)}) ${d.slice(3)}`;
  return `+1 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export const phoneOk = (value: string) => nationalDigits(value).length === 10;
