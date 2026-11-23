/* Creates the Pure Omega Salmon Oil prices the v3 plans page charges, on the existing oil product, under the
   lookup keys lib/quiz/fzPlans.ts expects. Safe to re-run: a key that already exists is left alone.
   Needs a Friday Zoomies key that can write Prices:
     node --env-file=$HOME/.claude/stripe/credentials.env scripts/fz-oil-plans.mjs */
const KEY = process.env.STRIPE_FRIDAY_ZOOMIES_RK;
const PRODUCT = "prod_VZEDPdebXxn2vd";
if (!KEY) throw new Error("STRIPE_FRIDAY_ZOOMIES_RK is not set");

const PRICES = [
  { key: "fz_oil_recur_4w", cents: 4999, nickname: "Oil rebill, every 4 weeks", recurring: true },
  { key: "fz_oil_1m_entry", cents: 2999, nickname: "Oil 1 month trial, entry" },
  { key: "fz_oil_3m_entry", cents: 7499, nickname: "Oil 3 month supply, entry" },
  { key: "fz_oil_once", cents: 5999, nickname: "Oil one time purchase" },
  { key: "fz_oil_once_ship", cents: 500, nickname: "Oil one time shipping" },
  /* The v4 buy box: 1, 2 and 3 month supplies. Entry is the first charge; the rebill comes every 4, 8 and 12 weeks.
     The $50 every 4 weeks price already existed (price_1UY5l2FLVvwYZWRNGdAlHGLd, the one STRIPE_FZ_OIL_PRICE_ID uses),
     so it is given a lookup key below instead of being duplicated. */
  { key: "fz_oil_m1_entry", cents: 3000, nickname: "Oil v4 1 month supply, entry" },
  { key: "fz_oil_m2_entry", cents: 5500, nickname: "Oil v4 2 month supply, entry" },
  { key: "fz_oil_m3_entry", cents: 8000, nickname: "Oil v4 3 month supply, entry" },
  { key: "fz_oil_recur_8w", cents: 9900, nickname: "Oil v4 2 month rebill, every 8 weeks", recurring: true, weeks: 8 },
  { key: "fz_oil_recur_12w", cents: 14900, nickname: "Oil v4 3 month rebill, every 12 weeks", recurring: true, weeks: 12 },
];

const call = async (path, body) => {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: body ? new URLSearchParams(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${path}: ${json.error?.message}`);
  return json;
};

for (const p of PRICES) {
  const have = (await call(`prices?lookup_keys[]=${p.key}&active=true`)).data[0];
  if (have) { console.log(`${p.key} exists: ${have.id} $${have.unit_amount / 100}`); continue; }
  const made = await call("prices", {
    product: PRODUCT, currency: "usd", unit_amount: p.cents, lookup_key: p.key, nickname: p.nickname,
    ...(p.recurring ? { "recurring[interval]": "week", "recurring[interval_count]": String(p.weeks ?? 4) } : {}),
  });
  console.log(`${p.key} created: ${made.id} $${p.cents / 100}`);
}

/* The existing $50 every 4 weeks price becomes fz_oil_recur_4w_50 (the v4 1 month rebill). */
const EXISTING_50 = "price_1UY5l2FLVvwYZWRNGdAlHGLd";
const cur = await call(`prices/${EXISTING_50}`);
if (cur.lookup_key === "fz_oil_recur_4w_50") console.log("fz_oil_recur_4w_50 exists");
else {
  if (cur.unit_amount !== 5000 || cur.recurring?.interval_count !== 4) throw new Error("the $50 price is not what was expected");
  await call(`prices/${EXISTING_50}`, { lookup_key: "fz_oil_recur_4w_50" });
  console.log("fz_oil_recur_4w_50 set on", EXISTING_50);
}
