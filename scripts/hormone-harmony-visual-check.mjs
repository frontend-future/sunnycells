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
  { name: "large-mobile", width: 430, height: 932 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "small-laptop", width: 1024, height: 768 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "desktop", width: 1440, height: 1000 },
]) {
  const page = await browser.newPage({ viewport });
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  const response = await page.goto(`${base}/hormone-harmony`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);
  check(response?.status() === 200, `${viewport.name} route returns 200`);
  check(await page.getByRole("heading", { level: 1, name: "Make your morning do more." }).isVisible(), `${viewport.name} hero heading is visible`);
  check(await page.getByRole("link", { name: "Shop the blend" }).first().isVisible(), `${viewport.name} primary CTA is visible`);
  check(await page.locator('img[alt*="orange flavor pouch"]').evaluate((image) => image.complete && image.naturalWidth > 0), `${viewport.name} hero product image loads`);
  check(await page.locator('article').filter({ hasText: "KSM-66 Ashwagandha" }).count() === 1, `${viewport.name} ingredient content renders`);

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  check(dimensions.scrollWidth === dimensions.clientWidth, `${viewport.name} has no horizontal overflow`);

  if (viewport.width <= 900) {
    const menuButton = page.getByRole("button", { name: "Open menu" });
    check(await menuButton.isVisible(), `${viewport.name} mobile menu button is visible`);
    await menuButton.click();
    check(await page.locator("#hormone-mobile-menu").getByRole("link", { name: /Take the diet quiz/ }).isVisible(), `${viewport.name} mobile menu opens with real navigation`);
    check(await page.evaluate(() => document.body.style.overflow === "hidden"), `${viewport.name} mobile menu locks body scroll`);
    await page.keyboard.press("Escape");
    check(await page.getByRole("button", { name: "Open menu" }).isVisible(), `${viewport.name} mobile menu closes with Escape`);
  } else {
    check(await page.getByRole("navigation", { name: "Hormone Harmony navigation" }).isVisible(), `${viewport.name} desktop navigation is visible`);
  }

  if (viewport.width < 768) {
    const sticky = page.getByRole("link", { name: "Choose plan" });
    check(!(await sticky.isVisible()), `${viewport.name} sticky CTA does not obstruct the hero`);
    await page.evaluate(() => {
      const hero = document.getElementById("top");
      window.scrollTo(0, (hero?.offsetTop ?? 0) + (hero?.offsetHeight ?? window.innerHeight) + 220);
    });
    await page.waitForTimeout(400);
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
  check(await page.getByRole("link", { name: "View cart" }).last().getAttribute("href") === "/hormone-harmony/cart", `${viewport.name} footer cart link is live`);
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
  const lightLock = await page.locator("main").evaluate((element) => ({
    scheme: getComputedStyle(element).colorScheme,
    background: getComputedStyle(element).backgroundColor,
  }));
  check(lightLock.scheme === "light" && lightLock.background !== "rgb(13, 13, 12)", `${viewport.name} remains locked to light mode`);
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
