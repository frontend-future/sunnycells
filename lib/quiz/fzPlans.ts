/* The three ways to buy Pure Omega Salmon Oil on the v3 plans page. One source for the page, the
   checkout, the subscribe route and the webhook, so a price is never typed in two places.
   Stripe holds the real prices under these lookup keys (scripts/fz-oil-plans.mjs creates them);
   the server checks the amounts it finds against these numbers before charging anyone. */
export type OilPlan = "1" | "3" | "once";

/** Every rebill, 28 days apart. */
export const OIL_RECUR = 49.99;
export const OIL_RECUR_KEY = "fz_oil_recur_4w";
/** What a one time buyer pays to ship. Subscribers ship free. */
export const OIL_SHIPPING = 5;
export const OIL_SHIPPING_KEY = "fz_oil_once_ship";

export const OIL_PLANS: Record<OilPlan, { label: string; bottles: number; entry: number; key: string; /** Days to the first rebill. */ days: number }> = {
  "1": { label: "1 Month Trial", bottles: 1, entry: 29.99, key: "fz_oil_1m_entry", days: 28 },
  "3": { label: "3 Month Supply", bottles: 3, entry: 74.99, key: "fz_oil_3m_entry", days: 84 },
  once: { label: "One Time Purchase", bottles: 1, entry: 59.99, key: "fz_oil_once", days: 0 },
};

export const isOilPlan = (v: unknown): v is OilPlan => v === "1" || v === "3" || v === "once";

/* The only discount code the plans accept: it takes any plan's first charge down to $1, so a real order can be
   run end to end through Stripe and Shopify. The server makes a one use coupon for it each time. */
export const OIL_TEST_CODE = "TESTV3";
export const isTestCode = (c: unknown) => typeof c === "string" && c.trim().toUpperCase() === OIL_TEST_CODE;
/** Cents off that leave $1.00 to pay on the plan's first charge. */
export const testOff = (plan: OilPlan) => Math.round((OIL_PLANS[plan].entry + (plan === "once" ? OIL_SHIPPING : 0)) * 100) - 100;
