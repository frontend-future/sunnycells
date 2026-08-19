import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:3100";
const output = ".next/qa";
await mkdir(output, { recursive: true });

const browser = await chromium.launch();
let failures = 0;

async function warmLazyImages(page) {
  await page.evaluate(async () => {
    const pause = () => new Promise((resolve) => setTimeout(resolve, 50));
    const limit = document.documentElement.scrollHeight;
    for (let y = 0; y < limit; y += Math.max(500, window.innerHeight * 0.8)) {
      window.scrollTo(0, y);
      await pause();
    }
    const finalIngredientHeading = [...document.querySelectorAll("h3")].find(
      (heading) => heading.textContent?.trim() === "Black Pepper Extract",
    );
    const ingredientTrack = finalIngredientHeading?.closest("article")?.parentElement;
    if (ingredientTrack) {
      ingredientTrack.scrollIntoView({ block: "center" });
      await pause();
      for (const ingredient of ingredientTrack.children) {
        ingredientTrack.scrollLeft = ingredient.offsetLeft;
        await pause();
      }
      ingredientTrack.scrollLeft = 0;
    }
    window.scrollTo(0, 0);
    await pause();
  });
}

function check(condition, message) {
  console.log(`${condition ? "PASS" : "FAIL"}: ${message}`);
  failures += Number(!condition);
}

for (const viewport of [
  { name: "small-mobile", width: 360, height: 740 },
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "desktop", width: 1440, height: 1000 },
]) {
  const page = await browser.newPage({ viewport });
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  const response = await page.goto(`${base}/hormone-harmony`, { waitUntil: "networkidle" });
  check(response?.status() === 200, `${viewport.name} route returns 200`);
  check(await page.getByRole("heading", { level: 1, name: "Daily stress support, mixed into your morning." }).isVisible(), `${viewport.name} hero heading is visible`);
  check(await page.getByRole("link", { name: "Choose your plan" }).first().isVisible(), `${viewport.name} primary CTA is visible`);
  check(await page.locator('img[alt*="orange-flavor pouch"]').evaluate((image) => image.complete && image.naturalWidth > 0), `${viewport.name} hero product image loads`);
  check(await page.locator('article').filter({ hasText: "KSM-66 Ashwagandha" }).count() === 1, `${viewport.name} ingredient content renders`);

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  check(dimensions.scrollWidth === dimensions.clientWidth, `${viewport.name} has no horizontal overflow`);

  if (viewport.width < 768) {
    const sticky = page.getByRole("link", { name: "Choose plan" });
    check(!(await sticky.isVisible()), `${viewport.name} sticky CTA does not obstruct the hero`);
    await page.locator("section").nth(2).scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    check(await sticky.isVisible(), `${viewport.name} sticky CTA appears after the hero`);
  }

  const firstFaq = page.getByRole("button", { name: "How do I use Metabolic Morning Blend?" });
  check(await firstFaq.getAttribute("aria-expanded") === "true", `${viewport.name} FAQ defaults to an open answer`);
  await firstFaq.click();
  check(await firstFaq.getAttribute("aria-expanded") === "false", `${viewport.name} FAQ responds to input`);

  await warmLazyImages(page);
  await page.waitForTimeout(300);
  const failedImages = await page.locator("img").evaluateAll((images) =>
    images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.alt),
  );
  check(failedImages.length === 0, `${viewport.name} loads every image${failedImages.length ? ` (${failedImages.join(", ")})` : ""}`);
  await page.screenshot({ path: `${output}/hormone-harmony-${viewport.name}.png`, fullPage: true });
  check(consoleErrors.length === 0, `${viewport.name} has no console errors`);
  await page.close();
}

const commerce = await browser.newPage({ viewport: { width: 390, height: 844 } });
await commerce.goto(`${base}/hormone-harmony`, { waitUntil: "networkidle" });
await commerce.locator('label').filter({ hasText: "6 month supply" }).click();
await commerce.getByRole("button", { name: "Add 6 month supply to cart" }).click();
await commerce.waitForURL("**/hormone-harmony/cart");
check(await commerce.getByRole("heading", { name: "Review your order" }).isVisible(), "plan selection reaches the campaign cart");
check(await commerce.getByText("6 pouches. Ships every 6 months.").isVisible(), "selected six-month supply persists in cart");
await commerce.getByRole("button", { name: "Continue to checkout" }).click();
await commerce.waitForURL("**/hormone-harmony/checkout");
check(await commerce.getByRole("heading", { name: "Shipping details" }).isVisible(), "campaign cart reaches checkout");
await commerce.close();

for (const viewport of [
  { name: "dark-mobile", width: 390, height: 844 },
  { name: "dark-desktop", width: 1440, height: 1000 },
]) {
  const page = await browser.newPage({ viewport, colorScheme: "dark" });
  await page.goto(`${base}/hormone-harmony`, { waitUntil: "networkidle" });
  await warmLazyImages(page);
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  check(dimensions.scrollWidth === dimensions.clientWidth, `${viewport.name} has no horizontal overflow`);
  check(await page.getByRole("heading", { level: 1 }).isVisible(), `${viewport.name} remains readable`);
  await page.screenshot({ path: `${output}/hormone-harmony-${viewport.name}.png`, fullPage: true });
  await page.close();
}

const legacy = await browser.newPage({ viewport: { width: 1280, height: 900 } });
for (const [path, heading] of [
  ["/quiz/diet", /Release stress/],
  ["/quiz/diet/results/plans", "Complete natural formula"],
]) {
  const response = await legacy.goto(`${base}${path}`, { waitUntil: "networkidle" });
  check(response?.status() === 200, `${path} remains available`);
  check(await legacy.getByRole("heading", { level: 1, name: heading }).isVisible(), `${path} keeps its original heading`);
}
await legacy.close();

await browser.close();
process.exit(failures ? 1 : 0);
