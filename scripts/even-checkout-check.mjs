/**
 * Walks the Even Energy buy flow: pick a plan, press the button, and confirm the
 * cart that arrives at checkout is the plan that was chosen rather than a default.
 * Guards the thing that breaks silently, which is the wrong supply in the cart.
 *
 *   npx next start -p 3100 && node scripts/even-checkout-check.mjs
 */
import { chromium } from "playwright";

const BASE = "http://localhost:3100";
let fails = 0;
const check = (label, cond, detail = "") => {
  if (!cond) fails++;
  console.log(`  ${cond ? "ok " : "FAIL"} ${label}${!cond && detail ? `  ${detail}` : ""}`);
};

const browser = await chromium.launch();
const errors = [];

/* Every plan has to survive the hop, not just the default one. */
for (const [name, total, pouches] of [
  ["1 month supply", "$25", "1 pouch"],
  ["3 month supply", "$69", "3 pouches"],
  ["6 month supply", "$126", "6 pouches"],
]) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 950 } });
  page.on("pageerror", (e) => errors.push(e.message));
  /* The pixel request is aborted by this script on purpose, so the browser logging
     that it failed is our own doing and not a fault in the page. */
  page.on("console", (m) => {
    if (m.type() === "error" && !m.text().includes("ERR_FAILED")) errors.push(m.text());
  });
  await page.route("**connect.facebook.net/**", (r) => r.abort());

  await page.goto(`${BASE}/products/even-energy`, { waitUntil: "networkidle" });
  await page.locator("#buy").scrollIntoViewIfNeeded();
  await page.locator('button[role="radio"]', { hasText: name }).click();
  await page.getByRole("button", { name: "Try it now" }).click();
  await page.waitForURL("**/products/even-energy/checkout", { timeout: 8000 });
  await page.waitForTimeout(500);

  const summary = await page.locator("aside").innerText();
  check(`${name} carries to checkout`, summary.includes(pouches), summary.split("\n").slice(0, 4).join(" | "));
  check(`${name} totals ${total}`, summary.includes(total));
  await page.close();
}

/* The form must reject an empty submit and open payment on a good one. */
const page = await browser.newPage({ viewport: { width: 1280, height: 950 } });
page.on("pageerror", (e) => errors.push(e.message));
await page.route("**connect.facebook.net/**", (r) => r.abort());
await page.route("**/api/notify-purchase", (r) => r.fulfill({ status: 200, body: "{}" }));
await page.goto(`${BASE}/products/even-energy`, { waitUntil: "networkidle" });
await page.locator("#buy").scrollIntoViewIfNeeded();
await page.getByRole("button", { name: "Try it now" }).click();
await page.waitForURL("**/checkout");

await page.getByRole("button", { name: "Continue to payment" }).click();
await page.waitForTimeout(300);
check("empty submit is rejected", (await page.locator('[aria-invalid="true"]').count()) >= 7);
check("stayed on shipping", (await page.getByRole("button", { name: "Continue to payment" }).count()) === 1);

for (const [label, value] of [
  ["First name", "Dana"], ["Last name", "Reyes"], ["Address line 1", "18 Alder Road"],
  ["Town or city", "Portland"], ["Zip code", "97205"], ["Phone", "5035550142"],
  ["Email", "dana@example.com"],
]) await page.getByLabel(label, { exact: true }).fill(value);
await page.getByLabel("State", { exact: true }).selectOption("Oregon");
await page.getByRole("button", { name: "Continue to payment" }).click();
await page.waitForTimeout(700);

check("payment step opens", (await page.getByRole("heading", { name: "Payment" }).count()) === 1);
check("shipping collapses behind an edit", (await page.getByRole("button", { name: "Edit" }).count()) === 1);

/* Card detail must never reach storage. */
const stored = await page.evaluate(() => JSON.stringify(window.sessionStorage));
check("no card detail in storage", !/4242|cvc|cvv|cardNumber/i.test(stored));
await page.close();

await browser.close();
console.log(`\nfailures: ${fails}`);
console.log("page errors:", errors.length ? errors : "none");
process.exit(fails || errors.length ? 1 : 0);
