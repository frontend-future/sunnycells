import { chromium } from "playwright";

const BASE = "http://localhost:3100";
// smallest common phone, iPhone 13/14, iPhone Pro Max
const VIEWPORTS = [
  { name: "375x667 SE", width: 375, height: 667 },
  { name: "390x844 14 ", width: 390, height: 844 },
  { name: "430x932 Max", width: 430, height: 932 },
];

const TARGETS = [
  ["/quiz/diet", "button:has-text('Female')", "gender buttons"],
  ["/quiz/diet/cortisol-familiarity", "button:has-text(\"I'm a beginner\")", "last option"],
  ["/quiz/diet/how-cortisol-works", "button:has-text('Continue')", "info CTA"],
  ["/quiz/diet/goals", "button:has-text('Improving overall health')", "last option"],
  ["/quiz/diet/height", "button:has-text('Continue')", "height CTA"],
  ["/quiz/diet/current-weight", "button:has-text('Continue')", "weight CTA"],
  ["/quiz/diet/daytime-tiredness", "button:has-text('ball of fire')", "last option"],
  ["/quiz/diet/made-for-you", "button:has-text('Continue')", "info CTA"],
  ["/quiz/diet/email", "button:has-text('Unlock my results')", "email CTA"],
  ["/quiz/diet/results/summary", "button:has-text('Continue')", "summary CTA"],
  ["/quiz/diet/results/plans", "button:has-text('Get it now')", "plans hero CTA"],
  ["/quiz/diet/results/cart", "button:has-text('Continue to checkout')", "cart CTA"],
  ["/quiz/diet/results/checkout", "button:has-text('Continue to payment')", "checkout CTA"],
];

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  console.log(`\n=== ${vp.name} ===`);
  for (const [url, sel, label] of TARGETS) {
    await page.goto(BASE + url, { waitUntil: "networkidle" });
    const box = await page.locator(sel).first().boundingBox();
    const { scrollH, overflowX } = await page.evaluate(() => ({
      scrollH: document.documentElement.scrollHeight,
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }));
    if (overflowX > 0) {
      const offenders = await page.evaluate(() =>
        [...document.querySelectorAll("body *")]
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              element: element.tagName.toLowerCase(),
              className: typeof element.className === "string" ? element.className : "",
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
            };
          })
          .filter(({ left, right }) => left < 0 || right > document.documentElement.clientWidth)
          .slice(0, 4),
      );
      console.log(`  SPILL ${label.padEnd(14)} page scrolls ${overflowX}px sideways`, offenders);
    }
    if (!box) { console.log(`  ?? ${label.padEnd(14)} ${url}  (not found)`); continue; }
    const bottom = Math.round(box.y + box.height);
    const over = bottom - vp.height;
    const flag = over <= 0 ? "ok  " : "BELOW";
    console.log(
      `  ${flag} ${label.padEnd(14)} bottom ${String(bottom).padStart(4)} / ${vp.height}` +
      (over > 0 ? `  needs ${over}px of scroll` : ` (${-over}px clear)`) +
      `   page ${scrollH}px`
    );
  }
  await page.close();
}
await browser.close();
