/**
 * Proves the Meta wiring end to end without ever contacting Meta: the pixel
 * script is blocked and fbq is stubbed, so this records what the app asks the
 * pixel to do and what it posts to the Conversions API.
 *
 * What it is really guarding:
 *   - PageView follows client-side navigation, which the init snippet does not do
 *   - every event carries the same id on both sides, or Meta counts it twice
 *   - AddPaymentInfo carries the full match set, which is what CAPI is worth
 *   - Purchase fires with the currency and value Meta needs to report on it
 *   - no card detail reaches either side
 *
 * Run against a build started with a stub id:
 *   NEXT_PUBLIC_META_PIXEL_ID=000000000000000 npx next start -p 3100
 */
import { chromium } from "playwright";

const BASE = "http://localhost:3100";
let fails = 0;
const check = (label, cond, detail = "") => {
  if (!cond) fails++;
  console.log(`  ${cond ? "ok " : "FAIL"} ${label}${detail && !cond ? `  ${detail}` : ""}`);
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.route("**connect.facebook.net/**", (r) => r.abort());
/* Collected in node, not on window: the funnel does full document loads and each
   one would otherwise reset the record of what fired before it. */
const calls = [];
await page.exposeFunction("__record", (args) => { calls.push(args); });
await page.addInitScript(() => {
  window.fbq = (...args) => window.__record(args);
});
const capi = [];
page.on("request", (r) => {
  if (r.url().includes("/api/meta-capi")) capi.push(JSON.parse(r.postData() ?? "null"));
});

await page.goto(`${BASE}/quiz/diet`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Female" }).click();
await page.waitForTimeout(600);
await page.getByRole("button", { name: /I know a thing or two/ }).click();
await page.waitForTimeout(600);
const views = calls.filter((a) => a[1] === "PageView");
check("PageView follows client-side routing", views.length === 3, `saw ${views.length}, wanted 3`);

await page.goto(`${BASE}/quiz/diet/email`, { waitUntil: "networkidle" });
await page.getByLabel("Email address").fill("dana@example.com");
await page.getByRole("button", { name: /Unlock my results/ }).click();
await page.waitForTimeout(1200);

await page.goto(`${BASE}/quiz/diet/results/plans`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: /Try now/ }).nth(1).click();
await page.waitForURL("**/results/checkout");
await page.waitForTimeout(600);
for (const [label, value] of [
  ["First name", "Dana"], ["Last name", "Reyes"], ["Address line 1", "18 Alder Road"],
  ["Town or city", "Portland"], ["Zip code", "97205"], ["Phone", "5035550142"],
  ["Email", "dana@example.com"],
]) await page.getByLabel(label, { exact: true }).fill(value);
await page.getByLabel("State", { exact: true }).selectOption("Oregon");
await page.getByRole("button", { name: "Continue", exact: true }).click();
await page.waitForTimeout(1200);

for (const name of ["Lead", "InitiateCheckout", "AddPaymentInfo", "Purchase"]) {
  const brow = calls.find((a) => a[1] === name);
  const serv = capi.find((c) => c?.event_name === name);
  check(`${name} fires in the browser`, !!brow);
  check(`${name} fires server side`, !!serv);
  check(`${name} dedupes on one id`, !!brow?.[3]?.eventID && brow[3].eventID === serv?.event_id);
  check(`${name} identifies the person`, !!serv?.user_data?.email);
}

const payment = capi.find((c) => c?.event_name === "AddPaymentInfo");
check(
  "AddPaymentInfo carries the full match set",
  ["email", "phone", "firstName", "lastName", "city", "state", "zip", "country"]
    .every((k) => payment?.user_data?.[k]),
);

/* Purchase fires on the same submit as the attempt email. Meta drops a Purchase
   with no currency and value, which is the quiet way for this to look wired and
   report nothing. */
const purchase = calls.find((a) => a[1] === "Purchase");
check("Purchase carries currency and value", purchase?.[2]?.currency === "USD" && purchase?.[2]?.value > 0);
check(
  "Purchase and AddPaymentInfo are separate events",
  purchase?.[3]?.eventID !== calls.find((a) => a[1] === "AddPaymentInfo")?.[3]?.eventID,
);

/* Card fields live in CardForm and are never lifted, so nothing here should carry
   one. Matched by field name and by the test PAN rather than by digit run: the stub
   pixel id is itself fifteen digits. */
const blob = JSON.stringify(calls) + JSON.stringify(capi);
check("no card detail reaches Meta", !/card_?number|\bcvc\b|\bcvv\b|4242\s?4242/i.test(blob));

await browser.close();
console.log(`\nfailures: ${fails}`);
process.exit(fails ? 1 : 0);
