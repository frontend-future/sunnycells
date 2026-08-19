import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 430, height: 1000 } });
await ctx.addInitScript(() => sessionStorage.setItem("sunnycells.quiz.diet", JSON.stringify({ plan: "m3", planPrice: "54", email: "dana@example.com" })));
const p = await ctx.newPage();
const say = (l, ok) => console.log(`  ${ok ? "ok " : "FAIL"} ${l}`);
await p.goto("http://localhost:3100/quiz/diet/results/checkout", { waitUntil: "networkidle" });

for (const [l, v] of [["First name", "Dana"], ["Last name", "Reyes"], ["Address line 1", "18 Alder Road"], ["Town or city", "Portland"], ["Zip code", "97205"], ["Phone", "5035550142"]])
  await p.getByLabel(l, { exact: true }).fill(v);
await p.getByLabel("State", { exact: true }).selectOption("Oregon");
say("phone auto formats as typed", (await p.getByLabel("Phone", { exact: true }).inputValue()) === "+1 (503) 555-0142");
await p.getByRole("button", { name: "Continue to payment", exact: true }).click();
await p.waitForTimeout(300);

say("shipping form collapses", await p.locator("form[hidden]").count() === 1);
say("payment section appears", (await p.getByRole("heading", { name: "Payment" }).count()) === 1);
say("breadcrumb advances to Payments", (await p.locator('[aria-current="step"]').innerText()) === "Payments");
await p.screenshot({ path: "pay-1.png" });

// brand detection as you type
const num = p.getByLabel("Card number", { exact: true });
for (const [digits, want] of [["4", "Visa"], ["55", "Mastercard"], ["37", "American Express"], ["6011", "Discover"]]) {
  await num.fill(digits);
  await p.waitForTimeout(80);
  const shown = await p.evaluate(() => {
    const i = [...document.querySelectorAll("input")].find((x) => x.autocomplete === "cc-number");
    return i.closest("form").querySelector("svg[aria-label]")?.getAttribute("aria-label") ?? "";
  });
  say(`${digits} -> ${want}`, shown === want);
}

// bad number is caught before any request
await p.getByLabel("Name on card", { exact: true }).fill("Dana Reyes");
await num.fill("4242 4242 4242 4243");
await p.getByLabel("Expiry", { exact: true }).fill("0730");
await p.getByLabel("Security code", { exact: true }).fill("123");
await p.getByRole("button", { name: /Submit secure payment/ }).click();
await p.waitForTimeout(250);
say("mistyped digit is rejected", (await p.getByText(/a digit looks wrong/).count()) === 1);

await num.fill("4242 4242 4242 4242");
await p.getByRole("button", { name: /Submit secure payment/ }).click();
await p.waitForTimeout(400);
say("spinner shows while working", (await p.getByText("Contacting your bank").count()) === 1);
await p.screenshot({ path: "pay-2.png" });
await p.waitForTimeout(1800);
say("lands on the out of stock state", (await p.getByText("Back in stock soon").count()) === 1);
say("says the card was not charged", (await p.getByText(/card has not been charged/).count()) === 1);
await p.screenshot({ path: "pay-3.png" });

// nothing sensitive persisted
const stored = await p.evaluate(() => sessionStorage.getItem("sunnycells.quiz.diet") ?? "");
say("card number never reaches storage", !/4242/.test(stored));
await b.close();
