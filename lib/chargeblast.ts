/* Chargeblast tags a visitor with the email they gave us, so a later dispute can be matched
   to the order. The script is loaded site wide by components/analytics/Chargeblast.tsx; this
   is the one place that calls it. Safe to call early or twice: until the script has loaded
   the call is a no-op, and the loader re-sends the last email once it arrives. */
declare global {
  interface Window {
    Chargeblast?: { identify: (email: string) => void };
  }
}

let last: string | null = null;

export function identifyChargeblast(email?: string | null) {
  const e = email?.trim().toLowerCase();
  if (!e || !e.includes("@") || typeof window === "undefined") return;
  last = e;
  try {
    window.Chargeblast?.identify(e);
  } catch {
    /* A blocked or failed script must never break checkout. */
  }
}

export const lastChargeblastEmail = () => last;
