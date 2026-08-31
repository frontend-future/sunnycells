/**
 * Renders the SC-25 carousel slides to public/product/revitalize/carousel/*.webp.
 *
 * Every slide is HTML and every glyph is real type. This is not an aesthetic
 * preference: generated lettering garbles at this size, reliably, and this project has
 * eight consecutive failed attempts on record to prove it. Photography comes from fal,
 * words come from here, and the words stay editable.
 *
 *   node scripts/build-carousel.mjs
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { execFileSync } from "child_process";
import { join } from "path";

const ROOT = process.cwd();
const OUT = join(ROOT, "public/product/revitalize/carousel");
const TMP = join(ROOT, ".carousel-tmp");
const SIZE = 1080;

const RED = "#D6212B", DEEP = "#A9161E", LIME = "#A6DE1E";
const INK = "#0D0D0C", INK60 = "#6B6B60", INK80 = "#38382F";
const IVORY = "#F4F1E6", CREAM = "#FDFBF4";

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
/* The three stacked bands that close every slide in the reference. */
.bands{position:absolute;left:0;right:0;bottom:0;height:54px;display:flex;flex-direction:column}
.bands i{flex:1}
.title{font-size:62px;text-transform:uppercase;color:${RED}}
</style></head><body><div class="slide">${body}
<div class="bands"><i style="background:${LIME}"></i><i style="background:${RED}"></i><i style="background:${DEEP}"></i></div>
</div></body></html>`;

/* ---------- 1. identity ---------- */
const s01 = (S) => shell(`
<div style="flex:1;display:grid;place-items:center;background:#fff">
  <img src="${img(S.product.photo)}" style="width:1000px;height:1000px;object-fit:contain">
</div>`, "#fff");

/* ---------- 2. outcome ---------- */
const s02 = (S) => shell(`
<div class="pad" style="flex:1;display:flex;flex-direction:column;gap:26px;padding-bottom:96px">
  <h1 class="d" style="font-size:60px;text-transform:uppercase;color:${RED};max-width:900px">${S.outcome.title}</h1>
  <ul style="list-style:none;display:flex;flex-direction:column;gap:19px">
    ${S.outcome.items.map((i) => `
    <li style="display:flex;align-items:center;gap:20px">
      <span style="flex:none;width:44px;height:44px;border-radius:50%;background:${RED};display:grid;place-items:center;color:#fff;font-weight:800;font-size:22px">&#10003;</span>
      <span style="font-size:35px;font-weight:700">${i.text}</span>
    </li>`).join("")}
  </ul>
  <img src="${img(S.product.photo)}" style="width:100%;height:230px;object-fit:contain;margin-top:auto">
</div>`);

/* ---------- 3. proof ---------- */
const s03 = (S, facts) => shell(`
<div class="pad" style="flex:1;display:flex;flex-direction:column;gap:24px;padding-bottom:74px">
  <h1 class="d title" style="text-align:center">${S.inside.title}</h1>
  <div style="flex:1;display:grid;grid-template-columns:1fr 1.05fr 1fr;gap:22px;align-items:center">
    ${[S.inside.left, S.inside.right].map((col, ci) => ci === 0 ? `
    <div style="display:flex;flex-direction:column;gap:26px">
      ${col.map((x) => `<div><div class="d" style="font-size:29px;text-transform:uppercase">${x.name}:</div>
      <div style="color:${RED};font-weight:800;font-size:23px;text-transform:uppercase;line-height:1.15">${x.claim}</div></div>`).join("")}
    </div>` : "").join("")}
    <div style="border:3px solid ${INK};padding:16px 18px;font-size:15px;background:#fff">
      <div class="d" style="font-size:30px;letter-spacing:-.03em">Supplement Facts</div>
      <div style="font-weight:600">${facts.servingsPerContainer} servings per container</div>
      <div style="font-weight:600">Serving size: ${facts.servingSize}</div>
      <div style="border-bottom:9px solid ${INK};margin:6px 0"></div>
      <div style="display:flex;justify-content:flex-end;gap:14px;font-weight:800;font-size:13px;text-align:center">
        <span>Amount per<br>serving</span><span>% Daily<br>Value</span></div>
      <div style="border-bottom:1px solid ${INK};margin:3px 0"></div>
      ${facts.rows.map((r) => `<div style="display:grid;grid-template-columns:1fr auto 46px;gap:8px;padding:4px 0;border-top:1px solid ${INK};align-items:baseline">
        <span style="padding-left:${(r.indent || 0) * 12}px;font-weight:${r.indent ? 500 : 700}">${r.name}</span>
        <span style="font-weight:700">${r.amount}</span>
        <span style="text-align:right;font-weight:700">${r.dv}</span></div>`).join("")}
      <div style="border-top:9px solid ${INK};margin-top:6px"></div>
      <div style="font-size:12px;margin-top:6px;color:${INK80}">${facts.footnotes.join(" ")}</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:26px;text-align:right">
      ${S.inside.right.map((x) => `<div><div class="d" style="font-size:29px;text-transform:uppercase">${x.name}:</div>
      <div style="color:${RED};font-weight:800;font-size:23px;text-transform:uppercase;line-height:1.15">${x.claim}</div></div>`).join("")}
    </div>
  </div>
</div>`);

/* ---------- 4. timeline ---------- */
const s04 = (S) => {
  const tones = { a: RED, b: DEEP, c: "#7A1015" };
  return shell(`
<div class="pad" style="flex:1;display:flex;flex-direction:column;gap:40px;padding-bottom:96px">
  <h1 class="d title" style="text-align:center;font-size:56px">${S.timeline.title}</h1>
  <div style="flex:1;display:grid;grid-template-columns:repeat(3,1fr);gap:26px;align-content:start">
    ${S.timeline.cols.map((c) => `
    <div style="display:flex;flex-direction:column;gap:0">
      <div class="d" style="background:${tones[c.tone]};color:#fff;font-size:34px;text-transform:uppercase;padding:18px 20px;text-align:center">${c.when}</div>
      <div style="background:${IVORY};border:3px solid ${tones[c.tone]};border-top:0;padding:24px 22px;display:flex;flex-direction:column;gap:20px;flex:1">
        ${c.items.map((i) => `<div style="display:flex;gap:14px;align-items:flex-start">
          <span style="flex:none;color:${tones[c.tone]};font-size:28px;font-weight:800;line-height:1">&#10003;</span>
          <span style="font-size:27px;font-weight:700;line-height:1.2">${i}</span></div>`).join("")}
      </div>
    </div>`).join("")}
  </div>
  <img src="${img(S.product.photo)}" style="width:100%;height:300px;object-fit:contain;margin-top:auto">
</div>`);
};

/* ---------- 5. comparison ---------- */
const s05 = (S) => shell(`
<div style="position:absolute;inset:0;background:url('${img(S.compare.photo)}') center/cover"></div>
<div style="position:absolute;inset:0;background:${DEEP};opacity:.93"></div>
<div class="pad" style="position:relative;flex:1;display:flex;flex-direction:column;gap:36px;padding-bottom:88px">
  <h1 class="d" style="font-size:58px;text-transform:uppercase;color:#fff;text-align:center">${S.compare.title}</h1>
  <div style="display:grid;grid-template-columns:1.5fr .8fr .8fr .8fr;align-items:stretch">
    <span></span>
    <span class="d" style="color:#fff;font-size:27px;text-transform:uppercase;text-align:center;padding:14px 6px;background:${RED};border-radius:12px 12px 0 0">${S.compare.us}</span>
    ${S.compare.them.map((t) => `<span style="color:#fff;opacity:.8;font-size:25px;font-weight:700;text-align:center;padding:14px 6px">${t}</span>`).join("")}
    ${S.compare.rows.map((r, i) => `
      <span style="color:#fff;font-size:27px;font-weight:700;padding:20px 10px 20px 0;border-top:1px solid rgba(255,255,255,.22)">${r.label}</span>
      <span style="display:grid;place-items:center;background:${RED};border-top:1px solid rgba(255,255,255,.22);${i === S.compare.rows.length - 1 ? "border-radius:0 0 12px 12px" : ""}">${mark(true)}</span>
      <span style="display:grid;place-items:center;border-top:1px solid rgba(255,255,255,.22)">${mark(r.a)}</span>
      <span style="display:grid;place-items:center;border-top:1px solid rgba(255,255,255,.22)">${mark(r.b)}</span>`).join("")}
  </div>
</div>`, DEEP);

const mark = (yes) => yes
  ? `<span style="width:44px;height:44px;border-radius:50%;background:#fff;color:${RED};display:grid;place-items:center;font-size:24px;font-weight:800">&#10003;</span>`
  : `<span style="width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.16);color:rgba(255,255,255,.75);display:grid;place-items:center;font-size:24px;font-weight:800">&#10005;</span>`;

/* ---------- 6. faq ---------- */
const s06 = (S) => shell(`
<div class="pad" style="flex:1;display:grid;grid-template-columns:280px 1fr;gap:40px;padding-bottom:82px;align-items:center">
  <img src="${img(S.faq.photo)}" style="width:100%;height:700px;object-fit:cover;object-position:52% 40%;border-radius:18px">
  <div style="display:flex;flex-direction:column;gap:28px">
    <h1 class="d" style="font-size:44px;text-transform:uppercase;color:${RED}">${S.faq.title}</h1>
    ${S.faq.items.map((i) => `<div>
      <div class="d" style="font-size:33px;text-transform:uppercase;line-height:1.06">${i.q}</div>
      <div style="font-size:25px;font-weight:600;color:${INK80};line-height:1.35;margin-top:6px">${i.a}</div>
    </div>`).join("")}
  </div>
</div>`);

/* ---------- 7. trust ---------- */
const s07 = (S) => shell(`
<div class="pad" style="flex:1;display:flex;flex-direction:column;gap:26px;padding-bottom:82px">
  <h1 class="d" style="font-size:64px;text-transform:uppercase;color:${RED};max-width:900px">${S.honesty.title}</h1>
  <div style="display:grid;grid-template-columns:1fr 340px;gap:36px;align-items:start">
    <div style="display:flex;flex-direction:column;gap:22px">
      ${S.honesty.body.map((p) => `<p style="font-size:29px;font-weight:600;line-height:1.35;color:${INK80}">${p}</p>`).join("")}
    </div>
    <img src="${img(S.honesty.photo)}" style="width:340px;height:340px;object-fit:cover;border-radius:20px">
  </div>
  <p style="font-size:31px;font-weight:800;line-height:1.25;border-left:8px solid ${RED};padding-left:22px;margin-top:auto">${S.honesty.kicker}</p>
</div>`);

/* ---------- 8. guarantee ---------- */
const s08 = (S) => shell(`
<div style="flex:1;display:grid;place-items:center;background:#fff">
  <img src="${img(S.guarantee.photo)}" style="width:700px;height:600px;object-fit:contain">
</div>
<div style="background:${DEEP};color:#fff;padding:44px 70px 78px;text-align:center">
  <h1 class="d" style="font-size:76px;text-transform:uppercase">${S.guarantee.title}</h1>
  <p style="font-size:31px;font-weight:600;line-height:1.35;margin-top:14px;opacity:.94">${S.guarantee.body}</p>
</div>`, "#fff");

/* ---------- render ---------- */
const { SLIDES } = await import(`file://${join(ROOT, "lib/products/revitalize-carousel.ts")}`);
const { FACTS } = await import(`file://${join(ROOT, "lib/products/revitalize.ts")}`);

const PAGES = [
  [SLIDES.product.file, s01(SLIDES)],
  [SLIDES.outcome.file, s02(SLIDES)],
  [SLIDES.inside.file, s03(SLIDES, FACTS)],
  [SLIDES.timeline.file, s04(SLIDES)],
  [SLIDES.compare.file, s05(SLIDES)],
  [SLIDES.faq.file, s06(SLIDES)],
  [SLIDES.honesty.file, s07(SLIDES)],
  [SLIDES.guarantee.file, s08(SLIDES)],
];

mkdirSync(OUT, { recursive: true });
mkdirSync(TMP, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE }, deviceScaleFactor: 2 });
for (const [name, html] of PAGES) {
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(350);
  const png = join(TMP, `${name}.png`);
  await page.screenshot({ path: png });
  execFileSync("cwebp", ["-q", "88", "-resize", "1080", "0", png, "-o", join(OUT, `${name}.webp`)], { stdio: "ignore" });
  console.log("rendered", name);
}
await browser.close();
