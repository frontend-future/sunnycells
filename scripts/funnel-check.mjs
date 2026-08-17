import { chromium } from "playwright";

const BASE = "http://localhost:3100";
const errors = [];
let fails = 0;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 375, height: 667 } });
page.on("console", (m) => { if (m.type() === "error") errors.push(`console: ${m.text()}`); });
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));

const at = () => new URL(page.url()).pathname;

/** Click, then wait for the URL we expect. A wrong slug fails here, not three steps later. */
async function step(label, expected, fn) {
  const from = at();
  await fn();
  try {
    await page.waitForURL(`**${expected}`, { timeout: 8000 });
    console.log(`  ok  ${label.padEnd(24)} ${from} -> ${expected}`);
  } catch {
    fails++;
    console.log(`  FAIL ${label.padEnd(23)} expected ${expected}, landed on ${at()}`);
  }
}
const check = (label, cond) => { if (!cond) fails++; console.log(`  ${cond ? "ok " : "FAIL"} ${label}`); };

await page.goto(`${BASE}/quiz/diet`, { waitUntil: "networkidle" });
console.log("landing:", at());
await page.screenshot({ path: "shot-landing.png" });

await step("pick Female", "/quiz/diet/cortisol-familiarity", () => page.getByRole("button", { name: "Female" }).click());
await page.screenshot({ path: "shot-q1.png" });

await step("q1 familiarity", "/quiz/diet/how-cortisol-works", () => page.getByRole("button", { name: /I know a thing or two/ }).click());
await page.screenshot({ path: "shot-q2-info.png" });
await step("q2 info", "/quiz/diet/goals", () => page.getByRole("button", { name: /^Continue/ }).click());
await step("q3 goals", "/quiz/diet/skin-changes", () => page.getByRole("button", { name: /Losing weight/ }).click());
await step("q4 skin", "/quiz/diet/brain-fog", () => page.getByRole("button", { name: "Yes", exact: true }).click());
await step("q5 brain fog", "/quiz/diet/belly-weight-gain", () => page.getByRole("button", { name: "Yes", exact: true }).click());
await step("q6 belly", "/quiz/diet/stress-level", () => page.getByRole("button", { name: "Yes", exact: true }).click());
await step("q7 stress", "/quiz/diet/post-meal-hunger", () => page.getByRole("button", { name: /always stressed/ }).click());
await step("q8 hunger", "/quiz/diet/weight-loss-difficulty", () => page.getByRole("button", { name: "Yes", exact: true }).click());
await step("q9 difficulty", "/quiz/diet/height", () => page.getByRole("button", { name: "Yes", exact: true }).click());

await step("q10 height", "/quiz/diet/current-weight", async () => {
  await page.getByLabel("Feet").fill("5");
  await page.getByLabel("Inches").fill("6");
  await page.getByRole("button", { name: /^Continue/ }).click();
});
await step("q11 weight", "/quiz/diet/target-weight", async () => {
  await page.getByLabel("Weight").fill("196");
  await page.getByRole("button", { name: /^Continue/ }).click();
});
await step("q12 target", "/quiz/diet/age", async () => {
  await page.getByLabel("Weight").fill("165");
  await page.getByRole("button", { name: /^Continue/ }).click();
});
await page.screenshot({ path: "shot-q12-age.png" });
await step("q13 age", "/quiz/diet/last-content-weight", async () => {
  await page.getByLabel("Age").fill("47");
  await page.getByRole("button", { name: /^Continue/ }).click();
});
await step("q14 content", "/quiz/diet/daytime-tiredness", () => page.getByRole("button", { name: /1 to 2 years ago/ }).click());
await step("q15 tiredness", "/quiz/diet/thirst-urination", () => page.getByRole("button", { name: /tired all day long/ }).click());
await step("q16 thirst", "/quiz/diet/headaches", () => page.getByRole("button", { name: "No", exact: true }).click());
await step("q17 headaches", "/quiz/diet/moon-face", () => page.getByRole("button", { name: "Yes", exact: true }).click());
await step("q18 moon face", "/quiz/diet/sleep", () => page.getByRole("button", { name: "No", exact: true }).click());
await step("q19 sleep", "/quiz/diet/made-for-you", () => page.getByRole("button", { name: /5 to 6 hours/ }).click());
await step("q20 made for you", "/quiz/diet/email", () => page.getByRole("button", { name: /^Continue/ }).click());

await page.getByRole("button", { name: /Unlock my results/ }).click();
await page.waitForTimeout(250);
check("empty email is rejected", (await page.getByText(/We need an email address/).count()) === 1);
check("stayed on email step", at() === "/quiz/diet/email");
await page.getByLabel("Email").fill("nope");
await page.getByRole("button", { name: /Unlock my results/ }).click();
await page.waitForTimeout(250);
check("malformed email is rejected", (await page.getByText(/missing an @/).count()) === 1);
await page.getByLabel("Email").fill("dana@example.com");
await step("q21 email", "/quiz/diet/results/analyzing", () => page.getByRole("button", { name: /Unlock my results/ }).click());

await page.waitForURL("**/results/summary", { timeout: 15000 });
console.log("  ok  analyzing auto-advanced ->", at());
await page.waitForTimeout(400);
await page.screenshot({ path: "shot-summary.png", fullPage: true });
console.log("  summary h1:", (await page.locator("h1").innerText()).replace(/\n/g, " "));

await step("summary", "/quiz/diet/results/projection", () => page.getByRole("button", { name: /Continue/ }).click());
await page.waitForTimeout(300);
await page.screenshot({ path: "shot-projection.png", fullPage: true });
console.log("  projection h1:", (await page.locator("h1").innerText()).replace(/\n/g, " "));

await step("projection", "/quiz/diet/results/metabolism", () => page.getByRole("button", { name: /Continue/ }).click());
await step("metabolism", "/quiz/diet/results/reviews", () => page.getByRole("button", { name: /Continue/ }).click());
await step("reviews", "/quiz/diet/results/plans", () => page.getByRole("button", { name: /See my plan/ }).click());
await page.waitForTimeout(400);
await page.screenshot({ path: "shot-plans.png", fullPage: true });

await step("plans", "/quiz/diet/results/checkout", () => page.getByRole("button", { name: /Start my routine/ }).click());
await page.waitForTimeout(300);
const summaryText = await page.locator("body").innerText();
check("checkout shows $17 today (50% of $35, rounded down)", summaryText.includes("$17"));
check("checkout shows the ongoing price", /Then \$35 per month/.test(summaryText));
check("checkout shows the chosen cadence", summaryText.includes("Every two months"));

await page.getByRole("button", { name: /Continue to payment/ }).click();
await page.waitForTimeout(250);
check("4 shipping errors on empty submit", (await page.getByText(/We need a/).count()) === 4);
for (const [l, v] of [["Full name", "Dana Reyes"], ["Address", "18 Alder Road"], ["City", "Portland"], ["Postcode", "97205"]])
  await page.getByLabel(l, { exact: true }).fill(v);
await page.getByRole("button", { name: /Continue to payment/ }).click();
await page.waitForTimeout(300);
check("valid shipping reaches the payment handoff", (await page.getByText(/Payment is not wired up yet/).count()) === 1);
await page.screenshot({ path: "shot-checkout.png", fullPage: true });

await page.goto(`${BASE}/quiz/diet/sleep`, { waitUntil: "networkidle" });
check("deep link to a step works", (await page.locator("h1").innerText()).includes("How much do you usually sleep"));
const back = await page.goto(`${BASE}/quiz/diet/not-a-step`);
check("unknown slug 404s", back.status() === 404);

console.log("\nfailures:", fails);
console.log("page errors:", errors.length ? errors : "none");
await browser.close();
process.exit(fails || errors.length ? 1 : 0);
