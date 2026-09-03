/**
 * Renders the Youth Matrix gallery slides to
 * public/products/youth-matrix-chews/carousel/*.webp.
 *
 * Same approach as scripts/build-carousel.mjs, which does this for SC-25: every slide
 * is HTML and every glyph is real type. That is not an aesthetic preference. Generated
 * lettering garbles at this size, reliably, and this project has nine consecutive
 * failures on record. Photography comes from fal, words come from the content file,
 * and the words stay editable.
 *
 * Kept as its own script rather than folded into the SC-25 one: that builder is welded
 * to a red palette and to eight specific slide shapes, and generalising it to serve
 * both would be a larger change than the duplication it saves.
 *
 *   node scripts/build-youth-matrix-carousel.mjs
 */
import { chromium } from "playwright";
import { readFileSync, mkdirSync, existsSync } from "fs";
import { execFileSync } from "child_process";
import { join } from "path";

const ROOT = process.cwd();
const OUT = join(ROOT, "public/products/youth-matrix-chews/carousel");
const TMP = join(ROOT, ".ymx-carousel-tmp");
const SIZE = 1080;

/* The jar's own colours: the emerald cap, the brighter green the CTA uses, and the
   ruby of the chews. Cream ground rather than white, so the panel can be white. */
const DEEP = "#14402F", GREEN = "#18804F", RUBY = "#8E1B22";
const INK = "#0D0D0C", INK80 = "#38382F";
const IVORY = "#F3F1E9";

/** Photos are inlined as data URIs so the page needs no server. */
const img = (p) => {
  const abs = join(ROOT, "public", p);
  if (!existsSync(abs)) throw new Error(`missing photo: ${p}`);
  return `data:image/webp;base64,${readFileSync(abs).toString("base64")}`;
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&family=Figtree:wght@500;600;700;800&display=swap');`;

const shell = (body, bg = "#fff") => `<!doctype html><html><head><meta charset="utf-8"><style>
${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${SIZE}px;height:${SIZE}px}
body{background:${bg};font-family:Figtree,system-ui,sans-serif;color:${INK};
  -webkit-font-smoothing:antialiased;overflow:hidden}
.slide{width:${SIZE}px;height:${SIZE}px;position:relative;display:flex;flex-direction:column}
.d{font-family:Outfit,system-ui,sans-serif;font-weight:800;letter-spacing:-.02em;line-height:1.02}
.pad{padding:64px 68px}
/* The three stacked bands that close every slide, in this product's greens. */
.bands{position:absolute;left:0;right:0;bottom:0;height:54px;display:flex;flex-direction:column}
.bands i{flex:1}
.title{font-size:60px;text-transform:uppercase;color:${DEEP}}
</style></head><body><div class="slide">${body}
<div class="bands"><i style="background:${RUBY}"></i><i style="background:${GREEN}"></i><i style="background:${DEEP}"></i></div>
</div></body></html>`;

/* ---------- 3. proof: the panel, with each ingredient's job either side ---------- */
/* Wider side margins than the other slides: the gallery overlays a prev and next arrow
   at each edge. Measured on the rendered page, each arrow covers from 33px to 136px in
   this slide's own 1080 coordinates, so anything starting before ~140px gets its first
   or last letter clipped. 156px clears it with room to spare. */
const sInside = (S, facts) => shell(`
<div class="pad" style="flex:1;display:flex;flex-direction:column;gap:26px;padding:56px 156px 78px">
  <h1 class="d title" style="text-align:center">${S.inside.title}</h1>
  <div style="flex:1;display:grid;grid-template-columns:1fr 1.15fr 1fr;gap:24px;align-items:center">
    <div style="display:flex;flex-direction:column;gap:34px">
      ${S.inside.left.map((x) => `<div><div class="d" style="font-size:28px;text-transform:uppercase">${x.name}</div>
      <div style="color:${GREEN};font-weight:800;font-size:22px;line-height:1.2;margin-top:4px">${x.claim}</div></div>`).join("")}
    </div>
    <div style="border:3px solid ${INK};padding:18px 20px;font-size:15px;background:#fff">
      <div class="d" style="font-size:31px;letter-spacing:-.03em">Supplement Facts</div>
      <div style="font-weight:600">${facts.servingsPerContainer} servings per container</div>
      <div style="font-weight:600">Serving size: ${facts.servingSize}</div>
      <div style="border-bottom:9px solid ${INK};margin:7px 0"></div>
      <div style="display:flex;justify-content:flex-end;gap:14px;font-weight:800;font-size:13px;text-align:center">
        <span>Amount per<br>serving</span><span>% Daily<br>Value</span></div>
      <div style="border-bottom:1px solid ${INK};margin:3px 0"></div>
      ${facts.rows.map((r) => `<div style="display:grid;grid-template-columns:1fr auto 52px;gap:8px;padding:6px 0;border-top:1px solid ${INK};align-items:baseline">
        <span style="font-weight:700;line-height:1.15">${r.name}</span>
        <span style="font-weight:700">${r.amount}</span>
        <span style="text-align:right;font-weight:700">${r.dv}</span></div>`).join("")}
      <div style="border-top:9px solid ${INK};margin-top:7px"></div>
      <div style="font-size:13px;margin-top:7px;color:${INK80}">${facts.footnotes.join(" ")}</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:34px;text-align:right">
      ${S.inside.right.map((x) => `<div><div class="d" style="font-size:28px;text-transform:uppercase">${x.name}</div>
      <div style="color:${GREEN};font-weight:800;font-size:22px;line-height:1.2;margin-top:4px">${x.claim}</div></div>`).join("")}
    </div>
  </div>
</div>`, IVORY);

/* ---------- 4. expectation ---------- */
const sTimeline = (S) => {
  const tones = [GREEN, DEEP, "#0D2C20"];
  return shell(`
<div class="pad" style="flex:1;display:flex;flex-direction:column;gap:36px;padding:64px 104px 96px">
  <h1 class="d title" style="text-align:center;font-size:54px">${S.timeline.title}</h1>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;align-content:start">
    ${S.timeline.cols.map((c, i) => `
    <div style="display:flex;flex-direction:column">
      <div class="d" style="background:${tones[i]};color:#fff;font-size:34px;text-transform:uppercase;padding:18px 20px;text-align:center">${c.when}</div>
      <div style="background:${IVORY};border:3px solid ${tones[i]};border-top:0;padding:24px 22px;display:flex;flex-direction:column;gap:20px;flex:1">
        ${c.items.map((t) => `<div style="display:flex;gap:14px;align-items:flex-start">
          <span style="flex:none;color:${tones[i]};font-size:28px;font-weight:800;line-height:1">&#10003;</span>
          <span style="font-size:26px;font-weight:700;line-height:1.2">${t}</span></div>`).join("")}
      </div>
    </div>`).join("")}
  </div>
  <!-- 56%, measured rather than guessed: the ruby pixels in four-chews.webp span y 502
       to 801 of 1200, so the chews sit at 54.3% of the frame. At the 62% this used to
       carry, the crop landed 37px low and clipped the tops. -->
  <img src="${img(S.timeline.photo)}" style="width:100%;height:250px;object-fit:cover;object-position:50% 56%;margin-top:auto;border-radius:16px">
</div>`);
};

/* ---------- 5. the alternatives ---------- */
const mark = (yes) => yes
  ? `<span style="width:44px;height:44px;border-radius:50%;background:#fff;color:${GREEN};display:grid;place-items:center;font-size:24px;font-weight:800">&#10003;</span>`
  : `<span style="width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.16);color:rgba(255,255,255,.75);display:grid;place-items:center;font-size:24px;font-weight:800">&#10005;</span>`;

const sCompare = (S) => shell(`
<div style="position:absolute;inset:0;background:url('${img(S.compare.photo)}') center/cover"></div>
<div style="position:absolute;inset:0;background:${DEEP};opacity:.94"></div>
<div class="pad" style="position:relative;flex:1;display:flex;flex-direction:column;gap:34px;padding:64px 104px 88px">
  <h1 class="d" style="font-size:54px;text-transform:uppercase;color:#fff;text-align:center;line-height:1.06">${S.compare.title}</h1>
  <div style="display:grid;grid-template-columns:1.5fr .8fr .8fr .8fr;align-items:stretch">
    <span></span>
    <span class="d" style="color:#fff;font-size:26px;text-transform:uppercase;text-align:center;padding:14px 6px;background:${GREEN};border-radius:12px 12px 0 0">${S.compare.us}</span>
    ${S.compare.them.map((t) => `<span style="color:#fff;opacity:.8;font-size:24px;font-weight:700;text-align:center;padding:14px 6px">${t}</span>`).join("")}
    ${S.compare.rows.map((r, i) => `
      <span style="color:#fff;font-size:26px;font-weight:700;padding:20px 10px 20px 0;border-top:1px solid rgba(255,255,255,.22);line-height:1.2">${r.label}</span>
      <span style="display:grid;place-items:center;background:${GREEN};border-top:1px solid rgba(255,255,255,.22);${i === S.compare.rows.length - 1 ? "border-radius:0 0 12px 12px" : ""}">${mark(true)}</span>
      <span style="display:grid;place-items:center;border-top:1px solid rgba(255,255,255,.22)">${mark(r.a)}</span>
      <span style="display:grid;place-items:center;border-top:1px solid rgba(255,255,255,.22)">${mark(r.b)}</span>`).join("")}
  </div>
</div>`, DEEP);

/* ---------- 6. risk reversal ---------- */
/* The seal is drawn here rather than loaded: SC-25 has a badge photograph and this
   product does not, and a missing asset is worse than a shape made of two divs. */
const sGuarantee = (S) => shell(`
<div style="flex:1;display:grid;place-items:center;background:#fff;padding:40px 40px 0">
  <img src="${img(S.guarantee.photo)}" style="width:600px;height:460px;object-fit:contain">
</div>
<div style="background:${DEEP};color:#fff;padding:36px 70px 78px;text-align:center;position:relative">
  <div style="position:absolute;left:50%;top:-138px;transform:translateX(-50%);width:252px;height:252px;
    border-radius:50%;background:${GREEN};border:10px solid #fff;display:grid;place-items:center;
    box-shadow:0 10px 30px rgba(0,0,0,.18)">
    <div style="text-align:center;line-height:1">
      <div class="d" style="font-size:88px;color:#fff">30</div>
      <div class="d" style="font-size:27px;color:#fff;text-transform:uppercase;margin-top:6px">day</div>
      <div style="font-size:19px;font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:.06em;margin-top:4px">guarantee</div>
    </div>
  </div>
  <h1 class="d" style="font-size:68px;text-transform:uppercase;margin-top:128px">${S.guarantee.title}</h1>
  <p style="font-size:29px;font-weight:600;line-height:1.35;margin-top:12px;opacity:.94">${S.guarantee.body}</p>
</div>`, "#fff");

/* ---------- render ---------- */
const { SLIDES, FACTS } = await import(`file://${join(ROOT, "lib/products/youth-matrix-carousel.ts")}`);

const PAGES = [
  [SLIDES.inside.file, sInside(SLIDES, FACTS)],
  [SLIDES.timeline.file, sTimeline(SLIDES)],
  [SLIDES.compare.file, sCompare(SLIDES)],
  [SLIDES.guarantee.file, sGuarantee(SLIDES)],
];

mkdirSync(OUT, { recursive: true });
mkdirSync(TMP, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE }, deviceScaleFactor: 2 });
for (const [name, html] of PAGES) {
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  const png = join(TMP, `${name}.png`);
  await page.screenshot({ path: png });
  execFileSync("cwebp", ["-q", "88", "-resize", "1080", "0", png, "-o", join(OUT, `${name}.webp`)], { stdio: "ignore" });
  console.log("rendered", name);
}
await browser.close();
