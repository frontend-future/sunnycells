import { chromium } from "playwright";

const BASE = "http://127.0.0.1:3100";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const failures = [];

const check = (label, condition) => {
  console.log(`${condition ? "ok" : "FAIL"}  ${label}`);
  if (!condition) failures.push(label);
};

await page.goto(`${BASE}/hormone-harmony`, { waitUntil: "networkidle" });
check("lander uses the dedicated route", new URL(page.url()).pathname === "/hormone-harmony");
check("lander renders the Metabolic Morning Blend offer", (await page.locator("body").innerText()).includes("Metabolic Morning Blend"));
check("page has no horizontal overflow", await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth));

await page.getByRole("button", { name: "Add to cart" }).nth(1).click();
await page.waitForURL("**/hormone-harmony/cart");
check("plan selection stays inside the new route family", new URL(page.url()).pathname === "/hormone-harmony/cart");
check("cart keeps the selected three month supply", (await page.locator("body").innerText()).includes("3-month supply"));
check("cart edit link returns to the new lander", (await page.getByRole("link", { name: "Edit plan" }).getAttribute("href")) === "/hormone-harmony#plans");

await page.getByRole("button", { name: "Continue to checkout" }).click();
await page.waitForURL("**/hormone-harmony/checkout");
check("checkout stays inside the new route family", new URL(page.url()).pathname === "/hormone-harmony/checkout");
check("checkout back link returns to the new cart", (await page.getByRole("link", { name: "Back", exact: true }).getAttribute("href")) === "/hormone-harmony/cart");

await page.goto(`${BASE}/quiz/diet/results/plans`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Try now" }).nth(1).click();
await page.waitForURL("**/quiz/diet/results/checkout");
check("existing quiz flow keeps its original direct checkout route", new URL(page.url()).pathname === "/quiz/diet/results/checkout");

await browser.close();
process.exit(failures.length ? 1 : 0);
