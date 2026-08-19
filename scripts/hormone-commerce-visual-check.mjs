import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:3100";
const output = ".next/qa-commerce";
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
let failures = 0;

function check(condition, message) {
  console.log(`${condition ? "PASS" : "FAIL"}: ${message}`);
  failures += Number(!condition);
}

for (const viewport of [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
]) {
  const context = await browser.newContext({ viewport });
  await context.addInitScript(() => {
    window.sessionStorage.setItem("sunnycells.quiz.diet", JSON.stringify({ plan: "m3", planPrice: "54", planMonths: "3" }));
  });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });

  let response = await page.goto(`${base}/hormone-harmony/cart`, { waitUntil: "networkidle" });
  check(response?.status() === 200, `${viewport.name} cart returns 200`);
  check(await page.getByRole("heading", { level: 1, name: "Your mornings are almost sorted." }).isVisible(), `${viewport.name} cart uses the dedicated campaign heading`);
  check(await page.getByText("$162").last().isVisible(), `${viewport.name} cart keeps the selected three-month total`);
  check(!(await page.getByRole("heading", { name: "Review your order" }).count()), `${viewport.name} cart no longer uses the quiz-screen heading`);
  const cartWidths = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  if (cartWidths.client !== cartWidths.scroll) {
    const overflow = await page.evaluate(() => [...document.querySelectorAll("body *")]
      .map((element) => ({
        selector: `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ""}${element.className && typeof element.className === "string" ? `.${element.className.trim().replace(/\s+/g, ".")}` : ""}`,
        left: Math.round(element.getBoundingClientRect().left),
        right: Math.round(element.getBoundingClientRect().right),
      }))
      .filter(({ left, right }) => left < 0 || right > document.documentElement.clientWidth));
    console.log(`OVERFLOW ${viewport.name}: ${JSON.stringify({ ...cartWidths, overflow })}`);
  }
  check(cartWidths.client === cartWidths.scroll, `${viewport.name} cart has no horizontal overflow`);
  await page.screenshot({ path: `${output}/cart-${viewport.name}.png`, fullPage: true });

  await page.getByRole("button", { name: "Continue to shipping" }).click();
  await page.waitForURL("**/hormone-harmony/checkout");
  check(await page.getByRole("heading", { level: 1, name: "Where should we send it?" }).isVisible(), `${viewport.name} checkout uses the dedicated shipping heading`);
  await page.screenshot({ path: `${output}/shipping-${viewport.name}.png`, fullPage: true });

  if (viewport.width <= 900) {
    const summary = page.getByRole("button", { name: /Order summary/ });
    check(await summary.isVisible(), `${viewport.name} checkout provides a mobile order summary`);
    await summary.click();
    check(await page.getByText("3 pouches. Ships every 3 months.").first().isVisible(), `${viewport.name} mobile order summary expands`);
  }

  await page.getByRole("button", { name: "Continue to payment" }).click();
  check(await page.getByRole("alert").getByText("Check the highlighted fields.").isVisible(), `${viewport.name} shipping validation is visible and specific`);
  await page.getByLabel("First name").fill("Dana");
  await page.getByLabel("Last name").fill("Reyes");
  await page.getByLabel("Street address").fill("120 Market Street");
  await page.getByLabel("State").selectOption("California");
  await page.getByLabel("Town or city").fill("San Diego");
  await page.getByLabel("Zip code").fill("92101");
  await page.getByLabel("Email for receipt").fill("dana@example.com");
  await page.getByLabel("Phone for delivery updates").fill("2025550148");
  await page.getByRole("button", { name: "Continue to payment" }).click();
  check(await page.getByRole("heading", { level: 1, name: "Review, then pay." }).isVisible(), `${viewport.name} valid shipping details reach the unique payment step`);
  check(await page.getByText("120 Market Street, San Diego, California 92101").isVisible(), `${viewport.name} payment step preserves the shipping address`);
  await page.screenshot({ path: `${output}/payment-${viewport.name}.png`, fullPage: true });

  await page.getByRole("button", { name: "Submit secure payment" }).click();
  check(await page.getByText("Enter the name printed on the card.").isVisible(), `${viewport.name} payment validation remains active`);
  await page.getByLabel("Name on card").fill("Dana Reyes");
  await page.getByLabel("Card number").fill("4242 4242 4242 4242");
  await page.getByLabel("Expiry").fill("12 / 30");
  await page.getByLabel("Security code").fill("123");
  await page.getByRole("button", { name: "Submit secure payment" }).click();
  const safeHeading = page.getByRole("heading", { name: "Back in stock soon" });
  await safeHeading.waitFor({ timeout: 5000 });
  check(await safeHeading.isVisible(), `${viewport.name} preview payment ends in the safe no-charge state`);
  await page.screenshot({ path: `${output}/checkout-${viewport.name}.png`, fullPage: true });

  const checkoutWidths = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  check(checkoutWidths.client === checkoutWidths.scroll, `${viewport.name} checkout has no horizontal overflow`);
  check(consoleErrors.length === 0, `${viewport.name} commerce flow has no console errors`);
  await context.close();
}

const legacy = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const legacyResponse = await legacy.goto(`${base}/quiz/diet/results/checkout`, { waitUntil: "networkidle" });
check(legacyResponse?.status() === 200, "legacy quiz checkout remains available");
check(await legacy.getByRole("heading", { name: "Shipping details" }).isVisible(), "legacy quiz checkout remains unchanged");
await legacy.close();

await browser.close();
process.exit(failures ? 1 : 0);
