/**
 * The supplement facts thumbnail for /lander/beetroot, rendered from HTML.
 *
 * Not generated, for two reasons. Lettering at panel size garbles, which this project
 * has a long record of. And a generated nutrition panel that happened to come out
 * legible would be a fabricated label: made-up amounts and made-up daily values
 * printed in the one format a reader is entitled to trust.
 *
 * Every figure below comes from the lander's own copy. The one %DV is computed from
 * the FDA adult reference value, not estimated: vitamin C 60 mg of 90 mg. Beetroot
 * and L-citrulline have no established value and carry a dagger.
 *
 *   node scripts/build-beetroot-facts.mjs
 */
import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { execFileSync } from "child_process";
import { join } from "path";

const OUT = join(process.cwd(), "public/lander/beetroot");
const TMP = join(process.cwd(), ".beetroot-raw");
const SIZE = 1000;

const ROWS = [
  { name: "Beetroot (Beta vulgaris) root concentrate", amount: "3,000 mg", dv: "†" },
  { name: "L-Citrulline", amount: "250 mg", dv: "†" },
  { name: "Vitamin C (from acerola cherry)", amount: "60 mg", dv: "67%" },
];

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@500;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${SIZE}px;height:${SIZE}px}
body{background:#FBF6EC;display:grid;place-items:center;font-family:Figtree,Helvetica,Arial,sans-serif;color:#0E2049}
.panel{width:640px;background:#fff;border:4px solid #0E2049;padding:26px 30px}
.t{font-size:46px;font-weight:800;letter-spacing:-.02em;line-height:1}
.s{font-size:19px;font-weight:500;margin-top:8px}
.rule{border-bottom:14px solid #0E2049;margin:12px 0}
.thin{border-bottom:2px solid #0E2049;margin:6px 0}
.head{display:flex;justify-content:flex-end;gap:20px;font-size:16px;font-weight:800;text-align:center;line-height:1.15}
.row{display:grid;grid-template-columns:1fr auto 92px;gap:12px;padding:11px 0;border-top:2px solid #0E2049;align-items:baseline}
.row span:first-child{font-size:19px;font-weight:700;line-height:1.2}
.row span:nth-child(2){font-size:19px;font-weight:700}
.row span:last-child{font-size:19px;font-weight:700;text-align:right}
.foot{font-size:15px;font-weight:500;margin-top:12px;line-height:1.4;color:#3B4A66}
.other{font-size:15px;font-weight:500;margin-top:14px;line-height:1.4;color:#3B4A66}
</style></head><body>
<div class="panel">
  <div class="t">Supplement Facts</div>
  <div class="s">28 servings per pouch</div>
  <div class="s"><strong style="font-weight:800">Serving size</strong> 2 chews</div>
  <div class="rule"></div>
  <div class="head"><span>Amount per<br>serving</span><span>% Daily<br>Value</span></div>
  <div class="thin"></div>
  ${ROWS.map((r) => `<div class="row"><span>${r.name}</span><span>${r.amount}</span><span>${r.dv}</span></div>`).join("")}
  <div style="border-top:14px solid #0E2049;margin-top:10px"></div>
  <div class="foot">† Daily Value not established.</div>
  <div class="other"><strong style="font-weight:800">Other ingredients:</strong> tart cherry, pectin, citric acid, natural flavour.</div>
</div>
</body></html>`;

mkdirSync(OUT, { recursive: true });
mkdirSync(TMP, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(350);
const png = join(TMP, "thumb-facts.png");
await page.screenshot({ path: png });
execFileSync("cwebp", ["-quiet", "-q", "90", "-resize", "1000", "0", png, "-o", join(OUT, "thumb-facts.webp")]);
console.log("rendered thumb-facts");
await browser.close();
