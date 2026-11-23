/* The three ways to buy Pure Omega Salmon Oil on the v3 plans page. One source for the page, the
   checkout, the subscribe route and the webhook, so a price is never typed in two places.
   Stripe holds the real prices under these lookup keys (scripts/fz-oil-plans.mjs creates them);
   the server checks the amounts it finds against these numbers before charging anyone. */
export type OilPlan = "1" | "3" | "once" | "m1" | "m2" | "m3";

/** Every rebill, 28 days apart. */
export const OIL_RECUR = 49.99;
export const OIL_RECUR_KEY = "fz_oil_recur_4w";
/** What a one time buyer pays to ship. Subscribers ship free. */
export const OIL_SHIPPING = 5;
export const OIL_SHIPPING_KEY = "fz_oil_once_ship";

/* Per plan: `recur` is what every rebill costs and `recurKey` its Stripe price, `days` how long until the first one
   (the trial), `weeks` the rebill cadence, and `variant` the 1, 2 or 3 month supply variant in Shopify (v4 plans
   only; the v3 plans ship the 1 month variant, 3 times for the 3 month supply). `compare` is the struck price.
   m1, m2 and m3 are the v4 buy box: $30, $55 and $80 today, then $50 every 4 weeks, $99 every 8 and $149 every 12. */
type Plan = { label: string; bottles: number; entry: number; key: string; days: number; recur: number; recurKey: string; weeks: number; compare?: number; variant?: 1 | 2 | 3 };
const V3 = { recur: OIL_RECUR, recurKey: OIL_RECUR_KEY, weeks: 4 };
export const OIL_PLANS: Record<OilPlan, Plan> = {
  "1": { label: "1 Month Trial", bottles: 1, entry: 29.99, key: "fz_oil_1m_entry", days: 28, ...V3 },
  "3": { label: "3 Month Supply", bottles: 3, entry: 74.99, key: "fz_oil_3m_entry", days: 84, ...V3 },
  once: { label: "One Time Purchase", bottles: 1, entry: 59.99, key: "fz_oil_once", days: 0, ...V3 },
  m1: { label: "1 Month Supply", bottles: 1, entry: 30, key: "fz_oil_m1_entry", days: 28, recur: 50, recurKey: "fz_oil_recur_4w_50", weeks: 4, compare: 55, variant: 1 },
  m2: { label: "2 Month Supply", bottles: 2, entry: 55, key: "fz_oil_m2_entry", days: 56, recur: 99, recurKey: "fz_oil_recur_8w", weeks: 8, compare: 110, variant: 2 },
  m3: { label: "3 Month Supply", bottles: 3, entry: 80, key: "fz_oil_m3_entry", days: 84, recur: 149, recurKey: "fz_oil_recur_12w", weeks: 12, compare: 165, variant: 3 },
};

export const isOilPlan = (v: unknown): v is OilPlan => typeof v === "string" && v in OIL_PLANS;

/* The only discount code the plans accept: it takes any plan's first charge down to $1, so a real order can be
   run end to end through Stripe and Shopify. The server makes a one use coupon for it each time. */
export const OIL_TEST_CODE = "TESTV3";
export const isTestCode = (c: unknown) => typeof c === "string" && c.trim().toUpperCase() === OIL_TEST_CODE;
/** Cents off that leave $1.00 to pay on the plan's first charge. */
export const testOff = (plan: OilPlan) => Math.round((OIL_PLANS[plan].entry + (plan === "once" ? OIL_SHIPPING : 0)) * 100) - 100;
