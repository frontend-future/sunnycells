import { chromium } from "playwright";
const b = await chromium.launch();
for (const w of [360, 375, 390, 430, 700, 900, 1100, 1400]) {
  const p = await b.newPage({ viewport: { width: w, height: 800 } });
  await p.goto("http://localhost:3100/quiz/diet/results/plans", { waitUntil: "networkidle" });
  await p.waitForTimeout(200);
  const r = await p.evaluate(() => {
    const h = document.querySelector("h1");
    const range = document.createRange();
    range.selectNodeContents(h);
    const cs = getComputedStyle(h);
    const rect = range.getBoundingClientRect();
    return { lines: range.getClientRects().length, size: cs.fontSize, w: Math.round(h.getBoundingClientRect().width), text: Math.round(rect.width),
             spill: document.documentElement.scrollWidth - document.documentElement.clientWidth };
  });
  console.log(`${String(w).padStart(4)}px  ${r.lines} line  text ${r.text}px in column ${r.w}px  ${r.text > r.w ? "OVERFLOWS by " + (r.text - r.w) : "fits"}  spill ${r.spill}`);
  await p.close();
}
await b.close();
