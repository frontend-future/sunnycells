import { chromium } from "playwright";
const b = await chromium.launch();
for (const w of [390, 800, 1000, 1280, 1440]) {
  const p = await b.newPage({ viewport: { width: w, height: 1000 } });
  await p.goto("http://localhost:3100/quiz/diet/results/plans", { waitUntil: "networkidle" });
  const h = p.getByRole("heading", { name: /Thousands of happy/ });
  await h.scrollIntoViewIfNeeded();
  await p.waitForTimeout(250);
  const cols = await p.evaluate(() => {
    const grid = [...document.querySelectorAll("div")].find((d) => d.style.display === "grid" && d.textContent.includes("Marcus O."));
    return { cols: getComputedStyle(grid).gridTemplateColumns.split(" ").length, card: Math.round(grid.firstElementChild.getBoundingClientRect().width) };
  });
  console.log(`${String(w).padStart(4)}px  ${cols.cols} columns, card ${cols.card}px, sideways ${await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)}`);
  await p.close();
}
await b.close();
