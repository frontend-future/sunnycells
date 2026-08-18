import { chromium } from "playwright";
const b = await chromium.launch();
for (const [w, tag] of [[390, "mobile"], [1200, "desktop"]]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto("http://localhost:3100/quiz/diet/results/plans", { waitUntil: "networkidle" });
  await p.locator('[aria-label="Go to slide 2"]').click();
  await p.waitForTimeout(600);
  const r = await p.evaluate(() => {
    const note = [...document.querySelectorAll("p")].find((x) => x.textContent.startsWith("*Based"));
    const range = document.createRange();
    range.selectNodeContents(note);
    const bodies = [...document.querySelectorAll("span")].filter((s) => /of users|of SUNNYCELLS/.test(s.textContent) && s.style.width === "190px");
    const lines = bodies.map((s) => { const r2 = document.createRange(); r2.selectNodeContents(s); return r2.getClientRects().length; });
    const lefts = bodies.map((s) => Math.round(s.getBoundingClientRect().left));
    return { noteLines: range.getClientRects().length, bodyLines: lines, aligned: new Set(lefts).size === 1 };
  });
  console.log(`${tag}: footnote ${r.noteLines} line, body lines ${JSON.stringify(r.bodyLines)}, left edges aligned ${r.aligned}`);
  const h = await p.locator('[aria-label="Go to slide 1"]').evaluateHandle((e) => e.closest("div").parentElement.parentElement);
  await h.asElement().screenshot({ path: `statslide-${tag}.png` });
  await p.close();
}
await b.close();
