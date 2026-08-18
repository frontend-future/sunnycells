import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 800, height: 1000 } });
const bad = [];
p.on("response", (r) => { if (r.status() >= 400) bad.push(r.url().slice(-40)); });
await p.goto("http://localhost:3100/quiz/diet/results/plans", { waitUntil: "networkidle" });
const h = p.getByRole("heading", { name: /The science behind/ });
await h.scrollIntoViewIfNeeded();
await p.waitForTimeout(600);

// every panel, paired with the image inside it
const rows = await p.evaluate(() =>
  [...document.querySelectorAll('[aria-controls]')].map((btn) => {
    const region = document.getElementById(btn.getAttribute("aria-controls"));
    const img = region.querySelector("img");
    const ticks = region.querySelectorAll("svg").length;
    return {
      title: btn.textContent.trim(),
      file: img ? decodeURIComponent(img.currentSrc || img.src).match(/ingredients\/([a-z-]+)\.jpg/)?.[1] : null,
      loaded: !!img && img.naturalWidth > 0,
      ticks,
    };
  }),
);
for (const r of rows) console.log(`${r.title.padEnd(20)} ${String(r.file).padEnd(20)} loaded=${r.loaded} ticks=${r.ticks}`);
console.log("all distinct images:", new Set(rows.map((r) => r.file)).size === rows.length);
console.log("every panel has 2 ticks:", rows.every((r) => r.ticks === 2));
console.log("failed:", bad.length ? bad : "none", "| sideways", await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth));

await p.getByRole("button", { name: "L-Theanine", exact: true }).click();
await p.waitForTimeout(500);
const box = await h.boundingBox();
await p.screenshot({ path: "ingredients.png", clip: { x: 0, y: Math.max(0, box.y - 20), width: 800, height: 860 } });
await b.close();
