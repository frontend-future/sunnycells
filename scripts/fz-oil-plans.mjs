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
  { key: "fz_oil_once", cents: 6499, nickname: "Oil one time purchase" },
  { key: "fz_oil_once_ship", cents: 865, nickname: "Oil one time shipping" },
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
    ...(p.recurring ? { "recurring[interval]": "week", "recurring[interval_count]": "4" } : {}),
  });
  console.log(`${p.key} created: ${made.id} $${p.cents / 100}`);
}
