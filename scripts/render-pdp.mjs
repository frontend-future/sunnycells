/**
 * Renders the Even Energy product gallery: six 1080x1080 panels written in HTML and
 * screenshotted, the same approach as render-ads.mjs. Image models cannot be trusted
 * with a supplement facts table or a dose list, and these have to be exactly right.
 *
 *   node scripts/render-pdp.mjs
 *
 * Writes into public/product/gallery/. Rerun after editing any copy here.
 *
 * On claims: nothing in these panels asserts a result. SUNNYCELLS has run no trial,
 * so there are no percentages, no participant counts and no before-and-after figures.
 * "Studied dose" refers to the published research on each ingredient at that amount,
 * which is a claim about the ingredient, not about this product.
 */
import { chromium } from "playwright";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, "public", "product", "gallery");
const P = (f) => `../public/${f}`;

const INK = "#0D0D0C";
const WHITE = "#FFFFFF";
const SHELL = "#F7F5F0";
const SPROUT_TINT = "#E3F2E4";
const PACK = "#C3E36A";

const head = () => `
<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800;900&family=Figtree:wght@500;600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1080px; height: 1080px; font-family: Figtree, sans-serif; color: ${INK};
         background: ${WHITE}; overflow: hidden; }
  .display { font-family: Outfit, sans-serif; font-weight: 900; letter-spacing: -0.03em; line-height: 1.02; }
  /* Micro-labels are sentence case in the text face, never caps and never mono. */
  .label { font-weight: 800; letter-spacing: 0.04em; }
  .muted { color: #6B6B60; }
</style></head><body>`;

/* 1. What each dose is for, around the pack. */
const benefits = () => `${head()}
<style>
  body { background: ${SPROUT_TINT}; display: flex; flex-direction: column; }
  .top { padding: 56px 60px 0; text-align: center; }
  .top h1 { font-size: 60px; }
  .top p { margin-top: 14px; font-size: 30px; font-weight: 600; color: #38382F; }
  .stage { flex: 1; position: relative; display: grid; place-items: center; min-height: 0; }
  .stage img { height: 100%; max-height: 560px; width: auto; object-fit: contain; }
  .card { position: absolute; background: ${WHITE}; border-radius: 20px; padding: 22px 26px;
          box-shadow: 0 10px 30px rgba(13,13,12,0.08); width: 268px; }
  .card .label { font-size: 27px; }
  .card .dose { margin-top: 6px; font-size: 25px; font-weight: 600; color: #38382F; }
  .l1 { left: 40px; top: 40px; }
  .l2 { left: 40px; bottom: 40px; }
  .r1 { right: 40px; top: 50%; transform: translateY(-50%); }
  .bar { background: ${INK}; color: ${WHITE}; padding: 30px 60px; display: flex;
         align-items: center; justify-content: center; gap: 40px; }
  .bar b { font-family: Outfit, sans-serif; font-weight: 900; font-size: 44px; letter-spacing: -0.02em; }
  .bar span { font-size: 27px; font-weight: 600; }
</style>
  <div class="top">
    <h1 class="display">Three jobs, three doses</h1>
    <p>No stimulants. Nothing to come down from.</p>
  </div>
  <div class="stage">
    <img src="${P("product/even-energy.png")}">
    <div class="card l1"><div class="label">Fuel</div><div class="dose">CoQ10 150 mg</div></div>
    <div class="card l2"><div class="label">Sustain</div><div class="dose">Taurine 1000 mg</div></div>
    <div class="card r1"><div class="label">Restore</div><div class="dose">PEAK ATP 40 mg</div></div>
  </div>
  <div class="bar"><b>50% off first order</b><span>Free shipping, always</span></div>
</body></html>`;

/* 2. Every active, named, with the amount in it. */
const ingredients = () => `${head()}
<style>
  body { background: ${SHELL}; padding: 56px 56px 44px; display: flex; flex-direction: column; }
  h1 { font-size: 58px; }
  /* Fixed middle track. With auto, the pack sized itself off the row height, grew
     wider than the canvas and shoved the right hand column off the edge. */
  .grid { flex: 1; display: grid; grid-template-columns: 1fr 340px 1fr; align-items: stretch;
          gap: 16px; margin-top: 26px; min-height: 0; }
  .col { display: flex; flex-direction: column; justify-content: space-evenly; min-width: 0; }
  .ing { display: flex; align-items: center; gap: 16px; }
  .ing img { width: 104px; height: 104px; border-radius: 50%; object-fit: cover; flex: none; }
  .ing .label { font-size: 26px; }
  .ing .dose { margin-top: 4px; font-size: 22px; font-weight: 600; color: #38382F; line-height: 1.3; }
  .pack { min-width: 0; display: grid; place-items: center; }
  .pack img { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; }
  .foot { margin-top: 22px; font-size: 24px; font-weight: 600; color: #6B6B60; text-align: center; }
</style>
  <h1 class="display">Everything in it, and how much</h1>
  <div class="grid">
    <div class="col">
      <div class="ing"><img src="${P("ingredients/even-coq10.png")}">
        <div><div class="label">CoQ10</div><div class="dose">150 mg coenzyme Q10</div></div></div>
      <div class="ing"><img src="${P("ingredients/even-taurine.png")}">
        <div><div class="label">Taurine</div><div class="dose">1000 mg amino acid</div></div></div>
    </div>
    <div class="pack"><img src="${P("product/even-energy.png")}"></div>
    <div class="col">
      <div class="ing"><img src="${P("ingredients/even-b12.png")}">
        <div><div class="label">Vitamin B12</div><div class="dose">500 mcg methylcobalamin</div></div></div>
      <div class="ing"><img src="${P("ingredients/even-b6.png")}">
        <div><div class="label">Vitamin B6</div><div class="dose">40 mg pyridoxal 5-phosphate</div></div></div>
    </div>
  </div>
  <p class="foot">PEAK ATP 40 mg in every stick as well. Amounts are printed on the front of the pack.</p>
</body></html>`;

/* 3. The stick itself, and what one of them holds. */
const stick = () => `${head()}
<style>
  body { background: ${SHELL}; display: grid; grid-template-columns: 1fr 1fr; }
  .copy { padding: 70px 20px 70px 60px; display: flex; flex-direction: column; justify-content: center; }
  h1 { font-size: 62px; }
  .sub { margin-top: 16px; font-size: 28px; font-weight: 600; color: #38382F; }
  ul { list-style: none; margin-top: 40px; display: flex; flex-direction: column; gap: 20px; }
  li { display: flex; align-items: baseline; gap: 14px; font-size: 30px; font-weight: 600; }
  li b { font-family: Outfit, sans-serif; font-weight: 900; font-size: 34px; min-width: 172px; }
  .shot { position: relative; overflow: hidden; }
  .shot img { width: 100%; height: 100%; object-fit: cover; }
</style>
  <div class="copy">
    <h1 class="display">One stick.<br>2.4 grams.</h1>
    <p class="sub">Torn into cold water, once a day.</p>
    <ul>
      <li><b>1000 mg</b> Taurine</li>
      <li><b>150 mg</b> CoQ10</li>
      <li><b>40 mg</b> PEAK ATP</li>
      <li><b>40 mg</b> Vitamin B6</li>
      <li><b>500 mcg</b> Vitamin B12</li>
    </ul>
  </div>
  <div class="shot"><img src="${P("product/even-stick-hand.png")}"></div>
</body></html>`;

/* 4. How to take it. */
const howto = () => `${head()}
<style>
  body { background: ${WHITE}; padding: 60px; display: flex; flex-direction: column; }
  .tag { display: inline-block; background: ${PACK}; border-radius: 14px; padding: 14px 26px;
         font-family: Outfit, sans-serif; font-weight: 900; font-size: 46px; letter-spacing: -0.02em; }
  .steps { display: grid; grid-template-columns: 1fr 1px 1fr; gap: 40px; align-items: start;
           margin: 46px 0 46px; }
  .spacer { flex: 1; }
  .rule { background: #D8D6CE; height: 100%; }
  .step { display: flex; gap: 20px; }
  .n { font-family: Outfit, sans-serif; font-weight: 900; font-size: 76px; line-height: 0.9; }
  .step p { font-size: 30px; font-weight: 600; line-height: 1.35; }
  .note { background: ${SPROUT_TINT}; border-radius: 20px; padding: 34px 38px; font-size: 27px;
          font-weight: 600; line-height: 1.45; }
  .note + .note { margin-top: 18px; }
  .close { margin-top: 26px; background: ${INK}; color: ${WHITE}; border-radius: 20px;
           padding: 38px 42px; }
  .close p { font-size: 32px; font-weight: 700; line-height: 1.35; }
  .close .mark { margin-top: 18px; font-family: Outfit, sans-serif; font-weight: 900; font-size: 34px;
                 letter-spacing: -0.02em; }
</style>
  <div><span class="tag">How to take it</span></div>
  <div class="steps">
    <div class="step"><span class="n">1</span><p>Tear one stick into 8 to 10 oz of cold water.</p></div>
    <div class="rule"></div>
    <div class="step"><span class="n">2</span><p>Stir it, or cap it and shake.</p></div>
  </div>
  <div class="spacer"></div>
  <div class="note">Cold water, not hot. It dissolves clear and drinks best straight away.</div>
  <div class="note">Want it less sweet? Go past 10 oz. Under 8 oz is where it gets strong.</div>
  <div class="close">
    <p>One stick a morning. No stimulants, so it does not fight your sleep and there is nothing to taper off.</p>
    <div class="mark">SUNNYCELLS</div>
  </div>
</body></html>`;

/* 5. The panel off the back of the pack. */
const facts = () => `${head()}
<style>
  body { background: ${PACK}; padding: 46px; display: grid; grid-template-columns: 300px 1fr; gap: 34px; }
  .side { display: flex; flex-direction: column; }
  .side h1 { font-size: 52px; }
  .marks { margin-top: 34px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .mk { border: 2px solid ${INK}; border-radius: 50%; width: 128px; height: 128px; display: grid;
        place-items: center; text-align: center; font-size: 20px; font-weight: 800; line-height: 1.2;
        letter-spacing: 0.04em; }
  .flavour { margin-top: auto; background: ${INK}; color: ${WHITE}; border-radius: 14px;
             padding: 18px 22px; font-size: 25px; font-weight: 800; text-align: center; }
  .panel { background: ${WHITE}; border-radius: 16px; padding: 30px 32px; display: flex;
           flex-direction: column; }
  .panel h2 { font-family: Outfit, sans-serif; font-weight: 900; font-size: 46px; letter-spacing: -0.02em; }
  table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 22px; }
  td { padding: 9px 0; vertical-align: top; }
  .thick { border-top: 9px solid ${INK}; }
  .thin { border-top: 2px solid ${INK}; }
  .r { text-align: right; white-space: nowrap; }
  .sm { font-size: 19px; line-height: 1.4; }
  .other { margin-top: 14px; font-size: 20px; line-height: 1.45; }
</style>
  <div class="side">
    <h1 class="display">Wellness built daily.</h1>
    <div class="marks">
      <div class="mk">Zero<br>calories</div>
      <div class="mk">Sugar<br>free</div>
      <div class="mk">Gluten<br>free</div>
      <div class="mk">Vegan</div>
    </div>
    <div class="flavour">Watermelon</div>
  </div>
  <div class="panel">
    <h2>Supplement facts</h2>
    <div class="sm" style="margin-top:4px">Serving size one stick (2.37 g) &nbsp;&middot;&nbsp; 30 servings per container</div>
    <table>
      <tr class="thick"><td class="sm"><b>Amount per serving</b></td><td class="r sm"><b>% daily value</b></td></tr>
      <tr class="thin"><td>Vitamin B6 <span class="sm muted">(as pyridoxal 5-phosphate)</span></td><td class="r">40 mg &nbsp; 3076%</td></tr>
      <tr class="thin"><td>Vitamin B12 <span class="sm muted">(as methylcobalamin)</span></td><td class="r">500 mcg &nbsp; 20833%</td></tr>
      <tr class="thin"><td>Taurine</td><td class="r">1000 mg &nbsp; &dagger;</td></tr>
      <tr class="thin"><td>CoQ10 <span class="sm muted">(coenzyme Q10)</span></td><td class="r">150 mg &nbsp; &dagger;</td></tr>
      <tr class="thin"><td>PEAK ATP <span class="sm muted">(adenosine 5-triphosphate disodium)</span></td><td class="r">40 mg &nbsp; &dagger;</td></tr>
      <tr class="thick"><td colspan="2" class="sm" style="padding-top:12px">&dagger; Daily value not established. Percent daily values are based on a 2000 calorie diet.</td></tr>
    </table>
    <p class="other"><b>Other ingredients:</b> citric acid, natural watermelon flavour, stevia extract (reb m.), beet juice (colour).</p>
    <p class="other muted" style="margin-top:26px">These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Talk to your doctor before starting a supplement, particularly if you are pregnant, breastfeeding, or taking medication.</p>
  </div>
</body></html>`;

/* 6. What it looks like made up. */
const glass = () => `${head()}
<style>
  body { background: ${SPROUT_TINT}; display: flex; flex-direction: column; }
  .row { display: flex; justify-content: center; gap: 26px; padding: 50px 40px 0; }
  .pill { background: ${WHITE}; border-radius: 999px; padding: 18px 30px; display: flex;
          align-items: baseline; gap: 10px; box-shadow: 0 8px 22px rgba(13,13,12,0.07); }
  .pill .label { font-size: 25px; }
  .pill span { font-size: 24px; font-weight: 600; color: #38382F; }
  .stage { flex: 1; display: grid; place-items: center; min-height: 0; padding: 20px 40px 0; }
  .stage img { max-width: 100%; max-height: 100%; object-fit: contain; }
  .foot { text-align: center; padding: 0 60px 46px; }
  .foot h2 { font-size: 46px; }
  .foot p { margin-top: 10px; font-size: 27px; font-weight: 600; color: #38382F; }
</style>
  <div class="row">
    <span class="pill"><span class="label">Fuel</span><span>CoQ10</span></span>
    <span class="pill"><span class="label">Sustain</span><span>Taurine</span></span>
    <span class="pill"><span class="label">Restore</span><span>PEAK ATP</span></span>
  </div>
  <div class="stage"><img src="${P("product/even-pouch-glass.png")}"></div>
  <div class="foot">
    <h2 class="display">Watermelon, in cold water</h2>
    <p>Zero sugar, zero calories, no stimulants.</p>
  </div>
</body></html>`;

const PANELS = [
  ["01-benefits", benefits],
  ["02-ingredients", ingredients],
  ["03-stick", stick],
  ["04-how-to-take-it", howto],
  ["05-supplement-facts", facts],
  ["06-in-the-glass", glass],
];

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });
const scratch = join(ROOT, "public", ".pdp.html");

for (const [name, build] of PANELS) {
  writeFileSync(scratch, build());
  await tab.goto(pathToFileURL(scratch).href, { waitUntil: "networkidle" });
  await tab.evaluate(() => document.fonts.ready);
  await tab.screenshot({ path: join(OUT, `${name}.png`) });
  console.log(`  ${name}`);
}

rmSync(scratch, { force: true });
await browser.close();
console.log(`\n${PANELS.length} panels -> public/product/gallery/`);
