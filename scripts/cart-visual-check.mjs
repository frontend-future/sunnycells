import { chromium } from "playwright";

const BASE = "http://localhost:3100/quiz/diet/results/cart";
const browser = await chromium.launch();
let failures = 0;

for (const viewport of [
  { name: "mobile", width: 375, height: 812 },
  { name: "desktop", width: 1280, height: 900 },
]) {
  const page = await browser.newPage({ viewport });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.screenshot({ path: `cart-${viewport.name}.png`, fullPage: true });

  const metrics = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    h1: document.querySelector("h1")?.textContent?.trim(),
  }));
  const hasCta = await page.getByRole("button", { name: "Continue to checkout" }).isVisible();
  const noOverflow = metrics.scrollWidth === metrics.clientWidth;
  const hasHeading = metrics.h1 === "Review your order";
  failures += Number(!hasCta) + Number(!noOverflow) + Number(!hasHeading);
  console.log(
    `${viewport.name}: CTA ${hasCta ? "visible" : "missing"}, ` +
      `overflow ${metrics.scrollWidth - metrics.clientWidth}px, ` +
      `heading ${hasHeading ? "correct" : "incorrect"}`,
  );
  await page.close();
}

await browser.close();
process.exit(failures ? 1 : 0);
