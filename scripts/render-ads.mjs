/**
 * Renders the ad creatives in ads/creatives.json to PNGs.
 *
 *   node scripts/render-ads.mjs [outDir]
 *
 * Copy lives in ads/creatives.json and photos in ads/photos, so a new variation is a
 * JSON entry rather than a code change. Colours come from app/tokens/colors.css, so a
 * token change carries into the ads.
 *
 * Output is grouped by ad set: ads/out/adset-1-problem/ and so on. A set is one
 * layout across five angles, so a format that wins is legible in the reporting.
 *
 * Five layouts, chosen by the entry's `layout`:
 *   photo     1080x1920  a shot with the headline over it, then pack and points.
 *                        An `after` key turns it into a labelled before and after
 *                        pair; null leaves the after panel as a marked slot.
 *   stats     1080x1920  a flat colour field, headline, pack, then figures.
 *   timeline  1080x1080  a day by day routine beside the pack, with ingredients.
   deal      1080x1920  headline bar, the problem-state photo, what is included, the pack.
 *   studies   1080x1080  a photo and headline, then a study-dose comparison table.
 *   split     1080x1080  one photo graded two ways behind a headline, the same
 *                        photo on both halves so nothing about the face is faked.
 *   priceCompare 1080x1080  a headline, then a row per active priced as if bought
 *                        separately, a subtotal, and the subscription offer row.
 *   badge     1080x1080  a fal.ai gold seal with the wording coded on top: an arced
 *                        headline and two ribbon-tail words, transparent PNG.
 *   factsLabel 1080x1080  a Supplement Facts panel: serving line, the actives with
 *                        their amount and % daily value, and other ingredients.
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, cpSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = resolve(process.argv[2] ?? join(ROOT, "ads", "out"));
/* Which creative file to render. One product per file, so a set of ads is a JSON
   entry rather than a code change, and two products cannot land in one out folder. */
const FILE = process.env.ADS_FILE ?? "creatives.json";
const creatives = JSON.parse(readFileSync(join(ROOT, "ads", FILE), "utf8"));

const tokens = readFileSync(join(ROOT, "app", "tokens", "colors.css"), "utf8");
const token = (name) => tokens.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`))[1];
const INK = token("ink");
const INK_60 = token("ink-60");
const INK_40 = token("ink-40");
const INK_20 = token("ink-20");
const INK_10 = token("ink-10");
const SUN = token("sun");
const SUN_TINT = token("sun-tint");
const ZEST = token("zest");
const SHELL = token("shell");
const SUCCESS = token("status-success");
const SPROUT = token("sprout");
const SKY = token("sky");
const WHITE = "#FFFFFF";

/* The default pack. A creative naming its own `pack` overrides it, which is what
   lets a second product reuse these four layouts untouched. */
const PACK = "../public/product/metabolic-morning-blend.png";
const pack = (c) => c.pack ?? PACK;

/* A root is an ingredient name under public/ingredients, defaulting to .jpg because
   that is what most of them are. A name carrying its own extension, or a path with a
   slash in it, is used as given. */
const rootSrc = (r) =>
  r.includes("/") ? r : `../public/ingredients/${r.includes(".") ? r : `${r}.jpg`}`;

/* Marks drawn inline: the page is rendered standalone from a file, so there is no
   bundler to pull an icon package through. */
const ICONS = {
  down: '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  ban: '<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',
  star: '<path d="m12 3 2.7 5.8 6.3.8-4.6 4.4 1.2 6.2L12 17.8 6.4 20.2l1.2-6.2L3 9.6l6.3-.8Z"/>',
  spark: '<path d="M13 2 4.5 13H11l-1 9 8.5-11H12Z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"/>',
  leaf: '<path d="M5 21c0-9 5-15 14-15 0 10-6 15-14 15Z"/><path d="M5 21c2-4 5-7 9-9"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
  flame: '<path d="M12 3c1 3.5-2.5 5-2.5 8.5a2.5 2.5 0 0 0 5 0c0-1-.5-1.5-.5-2.5 2 1.5 3.5 4 3.5 6.5a6 6 0 1 1-12 0C5.5 10 9 6 12 3Z"/>',
  droplet: '<path d="M12 3s6.5 7.5 6.5 12A6.5 6.5 0 0 1 5.5 15C5.5 10.5 12 3 12 3Z"/>',
  shield: '<path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6Z"/>',
  atom: '<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/>',
};

const icon = (name, stroke = 2.4) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}"
    stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;

const head = (w, h) => `
<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&family=Figtree:wght@500;600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: ${w}px; height: ${h}px; background: ${WHITE}; font-family: Figtree, sans-serif; color: ${INK}; }
  .mark { position: absolute; inset: auto 0 56px 0; text-align: center;
    font-family: Outfit, sans-serif; font-weight: 900; font-size: 42px; letter-spacing: -0.04em;
    text-transform: uppercase; }
</style></head><body>`;

const photoPage = (c) => `${head(1080, 1920)}
<style>
  /* The photo is 1180px when the copy fits and gives ground when it does not, rather
     than the points running under the wordmark. A long third bullet used to collide. */
  body { display: flex; flex-direction: column; }
  .shot { position: relative; flex: 0 1 1180px; min-height: 0; overflow: hidden; }
  .mark { position: static; flex: none; margin-top: auto; padding: 40px 0 56px; }
  .shot > img { width: 100%; height: 100%; object-fit: cover; object-position: center 28%; display: block; }
  /* The headline sits on the photo, so it needs a scrim to stay readable whatever the
     picture is doing behind it. */
  .scrim { position: absolute; inset: auto 0 0 0; height: 62%;
    background: linear-gradient(to top, rgba(13,13,12,0.88) 34%, rgba(13,13,12,0)); }
  .headline { position: absolute; inset: auto 56px 60px 56px; color: ${WHITE};
    font-family: Outfit, sans-serif; font-weight: 900; font-size: 72px; line-height: 1.02;
    letter-spacing: -0.03em; text-transform: uppercase; text-wrap: balance; }
  .body { flex: 0 0 auto; padding: 60px 56px 0; }
  .line { font-size: 42px; font-weight: 800; line-height: 1.25; text-align: center; text-wrap: balance; }
  .line span { background: ${SUN}; padding: 0 10px; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
  .row { display: flex; gap: 40px; align-items: center; margin-top: 60px; }
  .pack { flex: none; width: 380px; }
  .pack img { width: 100%; height: auto; display: block; }
  ul { list-style: none; display: flex; flex-direction: column; gap: 34px; }
  li { display: flex; gap: 20px; align-items: flex-start; font-size: 31px; line-height: 1.35; font-weight: 500; }
  .tick { flex: none; width: 46px; height: 46px; border-radius: 50%; background: ${INK}; color: ${SUN};
    display: flex; align-items: center; justify-content: center; }
  .tick svg { width: 26px; height: 26px; }
  /* A spacer absorbs the slack instead of margin-top:auto on the button itself, so
     the button keeps a real, fixed gap above it no matter how much room is left,
     rather than sitting flush against whatever content happens to be above it. */
  .spacer { flex: 1 1 auto; }
  .cta { flex: none; margin: 32px 56px 56px; height: 240px; border-radius: 20px;
    background: ${c.cta ? CTA_COLORS[c.cta.color ?? "green"] : "transparent"};
    display: flex; align-items: center; justify-content: center; }
  .cta span { color: ${WHITE}; font-family: Outfit, sans-serif; font-weight: 900;
    font-size: 64px; letter-spacing: -0.02em; text-transform: uppercase; text-align: center;
    padding: 0 32px; text-wrap: balance; }
</style>
  <div class="shot">
    <img src="${c.photo}">
    <div class="scrim"></div>
    <div class="headline">${c.headline}</div>
  </div>
  <div class="body">
    <!-- A statement about the mechanism, not a quoted customer, so it is not set in
         quote marks as though somebody had said it. -->
    <div class="line"><span>${c.line}</span></div>
    <div class="row">
      <div class="pack"><img src="${pack(c)}"></div>
      <ul>${c.points.map((p) => `
        <li><span class="tick">${icon("check", 3.5)}</span><span>${p}</span></li>`).join("")}
      </ul>
    </div>
  </div>
  ${c.cta ? `<div class="spacer"></div><div class="cta"><span>${c.cta.text}</span></div>` : `<div class="mark">Sunnycells</div>`}
</body></html>`;

const statsPage = (c) => `${head(1080, 1920)}
<style>
  /* Ink, not sun: the pack is sun yellow, so a yellow field swallowed it. Black is
     the strongest ground the system has for a yellow product. */
  body { background: ${INK}; color: ${WHITE}; }
  .mark { color: ${WHITE}; }
  .page { height: 1920px; padding: 96px 74px 0; display: flex; flex-direction: column; align-items: center;
    justify-content: center; }
  .headline { font-family: Outfit, sans-serif; font-weight: 900; font-size: 68px; line-height: 1.12;
    letter-spacing: -0.03em; text-transform: uppercase; text-align: center; text-wrap: balance; }
  /* The knocked-out phrase carries the brand colour now the field is black, and
     takes ink type on it, which is the only pairing allowed on sun. */
  .headline em { font-style: normal; background: ${SUN}; color: ${INK}; padding: 0 14px;
    box-decoration-break: clone; -webkit-box-decoration-break: clone; }
  .pack { width: 560px; margin: 40px 0 28px; }
  .pack img { width: 100%; height: auto; display: block; }
  ul { list-style: none; display: flex; flex-direction: column; gap: 34px; width: 100%; }
  li { display: flex; gap: 22px; align-items: flex-start; font-size: 36px; line-height: 1.3; font-weight: 500; }
  b { font-weight: 800; }
  .ico { flex: none; width: 56px; height: 56px; border-radius: 50%; background: ${SUN}; color: ${INK};
    display: flex; align-items: center; justify-content: center; }
  .ico svg { width: 29px; height: 29px; }
  .fine { position: absolute; inset: auto 74px 130px 74px; font-size: 23px; color: rgba(255,255,255,0.6); text-align: center; }
</style>
  <div class="page">
    <div class="headline">${c.headline}</div>
    <div class="pack"><img src="${pack(c)}"></div>
    <ul>${c.stats.map((s) => `
      <li><span class="ico">${icon(s.icon)}</span><span>${s.text}</span></li>`).join("")}
    </ul>
    <div class="fine">${c.fine}</div>
  </div>
  <div class="mark">Sunnycells</div>
</body></html>`;

const timelinePage = (c) => `${head(1080, 1080)}
<style>
  body { background: ${SUN_TINT}; }
  .page { height: 1080px; padding: 56px 56px 0; display: flex; flex-direction: column; }
  .title { font-family: Outfit, sans-serif; font-weight: 900; font-size: 84px; line-height: 1;
    letter-spacing: -0.04em; text-transform: uppercase; text-align: center; }
  .strap { margin: 22px auto 0; background: ${INK}; color: ${WHITE}; border-radius: 10px;
    padding: 12px 26px; font-size: 27px; font-weight: 600; letter-spacing: 0.04em;
    text-transform: uppercase; }
  .strap b { font-weight: 900; }
  .split { display: grid; grid-template-columns: 500px 1fr; gap: 20px; align-items: center; margin-top: 26px; }
  .pack { position: relative; }
  .pack img { width: 100%; height: auto; display: block; }
  /* A flat disc rather than a starburst: the system has no spiked shapes in it. */
  /* Tuned for the cortisol pouch. A round tub carries its name higher, so a creative
     can lift the disc clear of the wordmark rather than sitting on it. */
  .flash { position: absolute; top: ${c.flashTop ?? "10px"}; left: -18px; width: 228px; height: 228px; padding: 0 18px; border-radius: 50%;
    background: ${SUN}; border: 4px solid ${INK}; display: flex; flex-direction: column;
    align-items: center; justify-content: center; text-align: center; line-height: 1.05; }
  .flash .big { font-family: Outfit, sans-serif; font-weight: 900; font-size: 34px; letter-spacing: -0.03em;
    text-transform: uppercase; }
  .flash .small { font-size: 19px; font-weight: 700; margin-top: 8px; }
  .days { list-style: none; display: flex; flex-direction: column; gap: 18px; }
  .days li { font-size: 33px; line-height: 1.2; }
  .days b { font-weight: 900; }
  .days li.last { margin-top: 8px; font-size: 38px; font-weight: 900; color: ${SUCCESS}; }
  .rating { display: flex; align-items: center; gap: 14px; margin-top: 22px;
    background: ${WHITE}; border-radius: 14px; padding: 12px 20px; width: fit-content; }
  .rating .n { font-family: Outfit, sans-serif; font-weight: 900; font-size: 32px; }
  .rating .s { display: flex; gap: 3px; color: ${INK}; }
  .rating .s svg { width: 24px; height: 24px; }
  .rating .c { font-size: 23px; color: rgba(13,13,12,0.62); }
  .roots { display: flex; gap: 16px; justify-content: center; margin-top: auto; padding-bottom: 14px; }
  .roots span { width: 128px; height: 128px; border-radius: 50%; overflow: hidden; background: ${SUN}; flex: none; }
  .roots img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .fine { padding-bottom: 18px; font-size: 19px; color: rgba(13,13,12,0.55); text-align: center; }
</style>
  <div class="page">
    <div class="title">${c.title}</div>
    <div class="strap">${c.strap}</div>
    <div class="split">
      <div class="pack">
        <img src="${pack(c)}">
        <div class="flash"><span class="big">${c.flash}</span><span class="small">${c.flashSub}</span></div>
      </div>
      <ul class="days">${c.days.map((d, i) => `
        <li${i === c.days.length - 1 ? ' class="last"' : ""}><b>${d.day}:</b> ${d.text}</li>`).join("")}
        ${c.rating ? `<div class="rating">
          <span class="n">${c.rating.score}</span>
          <span class="s">${[0, 1, 2, 3, 4].map(() => `<svg viewBox="0 0 24 24" fill="currentColor">${ICONS.star}</svg>`).join("")}</span>
          <span class="c">${c.rating.count}</span>
        </div>` : ""}
      </ul>
    </div>
    <div class="roots">${c.roots.map((r) => `<span><img src="${rootSrc(r)}"></span>`).join("")}</div>
    <div class="fine">${c.fine}</div>
  </div>
</body></html>`;

const dealPage = (c) => `${head(1080, 1920)}
<style>
  /* A one- or two-line headline changes the height of everything under it, so the
     column absorbs the slack in the pack rather than letting it run under the mark. */
  body { background: ${SUN_TINT}; display: flex; flex-direction: column; padding-bottom: 190px; }
  .bar { flex: none; background: ${INK}; color: ${WHITE}; padding: 44px 56px; text-align: center;
    font-family: Outfit, sans-serif; font-weight: 900; font-size: 82px; line-height: 1.02;
    letter-spacing: -0.04em; text-transform: uppercase; text-wrap: balance; }
  /* One photo, not a pair. The problem state is the whole point of the frame, and
     an empty second panel waiting on a customer release only advertised the gap. */
  .shot { flex: 1 1 auto; min-height: 0; padding: 46px 56px 0; }
  .panel { position: relative; height: 100%; border-radius: 20px; overflow: hidden; background: ${WHITE}; }
  .panel img { width: 100%; height: 100%; object-fit: cover; object-position: center 42%; display: block; }
  .extras { flex: none; display: flex; flex-direction: column; gap: 22px; padding: 44px 56px 0; }
  .extras div { display: flex; gap: 18px; align-items: center; font-size: 36px; font-weight: 700; }
  .extras .tick { flex: none; width: 50px; height: 50px; border-radius: 50%; background: ${INK}; color: ${SUN};
    display: flex; align-items: center; justify-content: center; }
  .extras .tick svg { width: 28px; height: 28px; }
  .pack { flex: none; width: 600px; margin: 4px auto 0; }
  .pack img { width: 100%; height: auto; display: block; }
  .fine { position: absolute; inset: auto 56px 126px 56px; font-size: 22px;
    color: rgba(13,13,12,0.6); text-align: center; }
</style>
  <div class="bar">${c.headline}</div>
  <div class="shot"><div class="panel"><img src="${c.photo}"></div></div>
  <div class="extras">
    ${c.extras.map((e) => `<div><span class="tick">${icon("check", 3.5)}</span>${e}</div>`).join("")}
  </div>
  <div class="pack"><img src="${pack(c)}"></div>
  <div class="fine">${c.fine}</div>
  <div class="mark">Sunnycells</div>
</body></html>`;

const studiesPage = (c) => `${head(1080, 1080)}
<style>
  body { display: flex; flex-direction: column; padding-bottom: 112px; }
  .shot { position: relative; flex: none; height: 360px; overflow: hidden; }
  .shot > img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .scrim { position: absolute; inset: 0; background: linear-gradient(to top, rgba(13,13,12,0.55) 10%, rgba(13,13,12,0.1) 60%, rgba(13,13,12,0.35)); }
  .headline { position: absolute; inset: auto 56px 26px 56px; color: ${WHITE};
    font-family: Outfit, sans-serif; font-weight: 800; font-size: 46px; line-height: 1.2;
    letter-spacing: -0.02em; }
  /* A loose hand-drawn ellipse rather than a straight underline, echoing the way
     someone would actually circle a number on a printed page. */
  .headline .ring { display: inline-block; border: 3px solid ${ZEST}; border-radius: 50%;
    padding: 0 16px 6px; transform: rotate(-3deg); }
  .table { flex: 1 1 auto; min-height: 0; padding: 32px 56px 28px; display: flex; }
  .card { flex: 1 1 auto; display: flex; flex-direction: column; background: ${SHELL}; border-radius: 24px; overflow: hidden; }
  .thead { flex: none; display: flex; background: ${SUN}; color: ${INK}; padding: 22px 30px;
    font-family: Figtree, sans-serif; font-weight: 600; font-size: 21px; }
  .thead span:first-child { flex: 1 1 auto; }
  .thead span:last-child { flex: none; }
  .rows { flex: 1 1 auto; display: flex; flex-direction: column; }
  .row { flex: 1 1 auto; display: flex; align-items: center; gap: 20px; padding: 0 30px;
    border-top: 1px solid rgba(13,13,12,0.12); }
  .row .name { flex: 1 1 auto; font-family: Figtree, sans-serif; font-weight: 700; font-size: 25px; }
  .row .study { flex: 1 1 auto; }
  .row .study .text { font-size: 20px; font-weight: 500; line-height: 1.3; }
  .row .cite { font-size: 17px; font-weight: 500; color: ${INK_60}; margin-top: 4px; display: block; }
  .row .dose { flex: none; text-align: right; }
  .row .dose .amount { font-family: Outfit, sans-serif; font-weight: 800; font-size: 32px; letter-spacing: -0.01em; }
  .row .matched { display: flex; align-items: center; justify-content: flex-end; gap: 6px;
    margin-top: 4px; font-size: 19px; font-weight: 600; color: ${SUCCESS}; }
  .row .matched svg { width: 18px; height: 18px; }
  .mark { color: ${WHITE}; text-shadow: 0 1px 6px rgba(13,13,12,0.4); }
</style>
  <div class="shot">
    <img src="${c.photo}">
    <div class="scrim"></div>
    <div class="headline">${c.headlineLines[0]}<br>${c.headlineLines[1].replace(c.ring, `<span class="ring">${c.ring}</span>`)}</div>
  </div>
  <div class="table">
    <div class="card">
      <div class="thead"><span>The studies say</span><span>We use</span></div>
      <div class="rows">${c.rows.map((r) => `
      <div class="row">
        <div class="name">${r.name}</div>
        <div class="study"><span class="text">${r.study}</span><span class="cite">${r.cite}</span></div>
        <div class="dose"><span class="amount">${r.dose}</span><span class="matched">${icon("check", 3.5)}Matched</span></div>
      </div>`).join("")}</div>
    </div>
  </div>
  <div class="mark">Sunnycells</div>
</body></html>`;

const splitPage = (c) => `${head(1080, 1080)}
<style>
  /* One photo split into two colour grades with CSS filters, rather than asking an
     image model to hallucinate a symmetric two-tone face. Same underlying photo on
     both halves, so the face lines up perfectly and nothing is fabricated beyond a
     colour grade, which is the same trick the reference image itself relies on. */
  body { position: relative; overflow: hidden; }
  .half { position: absolute; inset: 0; }
  .half img { width: 100%; height: 100%; object-fit: cover; object-position: center 18%; display: block; }
  .half.cool { clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%); }
  /* brightness stays close to 1 rather than dropping hard: a bigger cut reads as
     "tired" on light skin but goes near-silhouette on deep skin tones, which is not
     an even effect across the three variations. */
  .half.cool img { filter: grayscale(0.5) brightness(0.88) contrast(1.05) saturate(0.55); }
  .half.warm { clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%); }
  .half.warm img { filter: brightness(1.05) saturate(1.15) sepia(0.22) contrast(1.02); }
  .tint { position: absolute; inset: 0; }
  .tint.cool { clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%); background: rgba(70,95,130,0.3); mix-blend-mode: color; }
  .tint.warm { clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%); background: rgba(255,190,110,0.14); mix-blend-mode: soft-light; }
  .seam { position: absolute; top: 0; bottom: 0; left: 50%; width: 2px; margin-left: -1px; background: rgba(255,255,255,0.55); }
  .scrim { position: absolute; inset: auto 0 0 0; height: 46%; background: linear-gradient(to top, rgba(13,13,12,0.85) 32%, rgba(13,13,12,0)); }
  .headline { position: absolute; inset: auto 56px 60px 56px; color: ${WHITE};
    font-family: Outfit, sans-serif; font-weight: 900; font-size: 58px; line-height: 1.08;
    letter-spacing: -0.03em; text-transform: uppercase; text-wrap: balance; }
  .headline em { font-style: normal; color: ${ZEST}; }
</style>
  <div class="half cool"><img src="${c.photo}"></div>
  <div class="half warm"><img src="${c.photo}"></div>
  <div class="tint cool"></div>
  <div class="tint warm"></div>
  <div class="seam"></div>
  <div class="scrim"></div>
  <div class="headline">${c.headline}</div>
</body></html>`;

const priceComparePage = (c) => `${head(1080, 1080)}
<style>
  body { display: flex; flex-direction: column; padding: 72px 64px 56px; }
  .headline { font-family: Outfit, sans-serif; font-weight: 900; font-size: 54px; line-height: 1.08;
    letter-spacing: -0.03em; text-align: center; text-wrap: balance; }
  .sub { margin-top: 16px; font-size: 24px; font-weight: 500; line-height: 1.35; color: ${INK_60};
    text-align: center; text-wrap: balance; }
  .card { margin-top: 36px; flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column;
    border-radius: 24px; overflow: hidden; border: 2px solid ${INK}; background: ${WHITE}; }
  .row { flex: 1 1 auto; display: flex; align-items: center; justify-content: space-between; gap: 20px;
    padding: 0 32px; border-top: 1px solid rgba(13,13,12,0.14); }
  .row:first-child { border-top: none; }
  .name { font-size: 27px; font-weight: 700; }
  .dose { font-size: 19px; font-weight: 600; color: ${INK_60}; margin-left: 10px; }
  .price { font-family: Outfit, sans-serif; font-weight: 800; font-size: 27px; letter-spacing: -0.01em; flex: none; }
  .row.subtotal { background: ${SHELL}; }
  .row.subtotal .name { font-weight: 800; }
  .row.subtotal .price { font-size: 30px; }
  .row.offer { background: ${SUN}; color: ${INK}; }
  .row.offer .name { font-size: 29px; font-weight: 800; }
  .row.offer .big { font-family: Outfit, sans-serif; font-weight: 900; font-size: 40px; letter-spacing: -0.02em; }
  .fine { margin-top: 22px; font-size: 18px; color: ${INK_60}; text-align: center; }
</style>
  <div class="headline">${c.headline}</div>
  <div class="sub">${c.sub}</div>
  <div class="card">
    ${c.rows.map((r) => `
    <div class="row"><span class="name">${r.name}<span class="dose">${r.dose}</span></span><span class="price">$${r.price}/mo</span></div>`).join("")}
    <div class="row subtotal"><span class="name">${c.subtotalLabel}</span><span class="price">$${c.subtotal}/mo</span></div>
    <div class="row offer">
      <span class="name">${c.offerLabel}</span>
      <span class="big">${c.offerPerDay}/day</span>
    </div>
  </div>
  <div class="fine">${c.fine}</div>
</body></html>`;

const badgePage = (c) => `${head(1080, 1080)}
<style>
  /* Text goes on as real markup, not baked into the fal.ai render: the shape (seal,
     ribbon, checkmark) came back from fal.ai with a blank ring and blank tails left
     for exactly this, since arced or curved text is one of the harder things for an
     image model to get right and it is short, exact-wording copy here. */
  body { position: relative; background: transparent; }
  .badge { position: absolute; width: 780px; height: 780px; left: 50%; top: 50%;
    transform: translate(-50%, -50%); }
  .badge img { width: 100%; height: 100%; display: block; }
  .arc { position: absolute; inset: 0; }
  .arc text { font-family: Outfit, sans-serif; font-weight: 800; font-size: 54px;
    letter-spacing: 0.02em; fill: ${INK}; }
  .tail { position: absolute; font-family: Outfit, sans-serif; font-weight: 800;
    font-size: 34px; letter-spacing: 0.02em; color: ${INK}; text-transform: uppercase; }
  .tail.left { left: 200px; top: 760px; transform: rotate(-12deg); }
  .tail.right { right: 200px; top: 760px; transform: rotate(12deg); }
</style>
  <div class="badge">
    <img src="${c.photo}">
    <svg class="arc" viewBox="0 0 1024 1024">
      <path id="arcPath" d="M 202 380 A 320 320 0 0 1 822 380" fill="none" />
      <text text-anchor="middle"><textPath href="#arcPath" startOffset="50%">${c.arc}</textPath></text>
    </svg>
    <div class="tail left">${c.tailLeft}</div>
    <div class="tail right">${c.tailRight}</div>
  </div>
</body></html>`;

const factsLabelPage = (c) => `${head(1080, 1080)}
<style>
  /* A real Supplement Facts panel, rendered as markup: bold rules, an amount column,
     a % daily value column, and the other-ingredients line, the same way the on-site
     facts table is markup rather than a picture. Black on white throughout, since the
     format's whole job is to read as the official panel rather than a brand moment. */
  body { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 64px; }
  .eyebrow { font-family: Figtree, sans-serif; font-weight: 600; font-size: 22px;
    letter-spacing: 0.04em; color: ${INK_60}; text-align: center; }
  .panel { margin-top: 20px; width: 100%; max-width: 780px; border: 3px solid ${INK}; border-radius: 8px;
    padding: 32px 34px 28px; }
  .title { font-family: Outfit, sans-serif; font-weight: 900; font-size: 52px; letter-spacing: -0.02em; }
  .servings { margin-top: 14px; font-size: 22px; font-weight: 600; display: flex; justify-content: space-between; }
  .thick { height: 9px; background: ${INK}; margin-top: 14px; }
  .thin { height: 1px; background: ${INK}; opacity: 0.35; }
  .amtHead { display: flex; justify-content: space-between; align-items: flex-end; padding: 12px 0 8px; }
  .amtHead span:first-child { font-size: 22px; font-weight: 700; }
  .amtHead span:last-child { font-size: 18px; font-weight: 700; text-align: right; }
  .row { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 14px 0; }
  .row .name { font-size: 24px; font-weight: 600; }
  .row .right { flex: none; display: flex; gap: 22px; align-items: baseline; }
  .row .amt { font-size: 24px; font-weight: 700; min-width: 100px; text-align: right; }
  .row .dv { font-size: 22px; font-weight: 700; min-width: 60px; text-align: right; }
  .foot { margin-top: 10px; font-size: 16px; font-weight: 500; line-height: 1.5; color: ${INK_60}; }
  .other { margin-top: 16px; font-size: 17px; font-weight: 500; line-height: 1.5; }
  .other b { font-weight: 700; }
</style>
  <div class="eyebrow">${c.eyebrow}</div>
  <div class="panel">
    <div class="title">Supplement Facts</div>
    <div class="servings">
      <span>Serving Size ${c.servingSize}</span>
      <span>Servings ${c.servings}</span>
    </div>
    <div class="thick"></div>
    <div class="amtHead"><span>Amount Per Serving</span><span>% Daily Value*</span></div>
    <div class="thick" style="height: 6px;"></div>
    ${c.actives.map((a, i) => `
    ${i > 0 ? '<div class="thin"></div>' : ""}
    <div class="row"><span class="name">${a.name}</span><span class="right"><span class="amt">${a.amount}</span><span class="dv">${a.dv}</span></span></div>`).join("")}
    <div class="thick" style="height: 6px;"></div>
    <div class="foot">${c.footnote}</div>
    <div class="other"><b>Other ingredients:</b> ${c.other}</div>
  </div>
</body></html>`;

const benefitsPage = (c) => `${head(1080, 1080)}
<style>
  /* Pack-centred, pills either side, no photo: the pack is the hero, same as the
     Supplement Facts panel is markup rather than a picture, since exact wording on
     eight short labels is not something worth handing to an image model. */
  body { background: ${SHELL}; display: flex; flex-direction: column; align-items: center;
    padding: 64px 56px 108px; }
  .eyebrow { font-family: Figtree, sans-serif; font-weight: 600; font-size: 24px;
    letter-spacing: 0.04em; color: ${INK_60}; text-align: center; }
  .headline { margin-top: 14px; font-family: Outfit, sans-serif; font-weight: 900; font-size: 54px;
    line-height: 1.06; letter-spacing: -0.03em; text-transform: uppercase; text-align: center;
    text-wrap: balance; }
  /* No fine print below the pills, so the stage is the only flexible piece: it grows
     to fill whatever the headline and mark leave behind, and is centred in that space
     rather than left pinned to the top of it. */
  .stage { flex: 1 1 auto; min-height: 0; width: 100%;
    display: grid; grid-template-columns: 290px 460px 290px; justify-content: center;
    align-items: center; align-content: center; gap: 16px; }
  .pillCol { display: flex; flex-direction: column; justify-content: space-evenly; height: 100%;
    min-width: 0; }
  .pillCol.right { align-items: flex-end; }
  .pill { display: flex; align-items: center; gap: 18px; background: ${WHITE}; width: 100%;
    box-sizing: border-box; border: 2px solid rgba(13,13,12,0.12); border-radius: 999px;
    padding: 18px 32px 18px 16px; }
  .pillCol.right .pill { flex-direction: row-reverse; padding: 18px 16px 18px 32px; }
  .pill .ico { flex: none; width: 62px; height: 62px; border-radius: 50%; background: ${INK};
    color: ${SUN}; display: flex; align-items: center; justify-content: center; }
  .pill .ico svg { width: 34px; height: 34px; }
  .pill span.label { flex: 1 1 auto; min-width: 0; font-size: 30px; font-weight: 600;
    line-height: 1.15; text-align: left; }
  .pillCol.right .pill span.label { text-align: right; }
  .pack { text-align: center; }
  .pack img { width: 100%; height: auto; display: block; }
</style>
  <div class="eyebrow">${c.eyebrow}</div>
  <div class="headline">${c.headline}</div>
  <div class="stage">
    <div class="pillCol left">${c.pillsLeft.map((p) => `
      <div class="pill"><span class="ico">${icon(p.icon)}</span><span class="label">${p.label}</span></div>`).join("")}
    </div>
    <div class="pack"><img src="${pack(c)}"></div>
    <div class="pillCol right">${c.pillsRight.map((p) => `
      <div class="pill"><span class="ico">${icon(p.icon)}</span><span class="label">${p.label}</span></div>`).join("")}
    </div>
  </div>
  <div class="mark">Sunnycells</div>
</body></html>`;

/* Three flat surfaces, all already in the token set (paper, ink, sun-tint), so the
   three variations of one layout read as different ads at a glance without inventing
   a colour the system doesn't have. */
const HERO_THEMES = {
  light: { bg: SHELL, fg: INK, sub: INK_60, chipBg: INK, chipFg: SUN, pillBorder: "rgba(13,13,12,0.14)" },
  dark: { bg: INK, fg: WHITE, sub: "rgba(255,255,255,0.6)", chipBg: SUN, chipFg: INK, pillBorder: "rgba(255,255,255,0.22)" },
  tint: { bg: SUN_TINT, fg: INK, sub: INK_60, chipBg: INK, chipFg: SUN, pillBorder: "rgba(13,13,12,0.14)" },
};

const heroPage = (c) => {
  const t = HERO_THEMES[c.theme ?? "light"];
  return `${head(1080, 1080)}
<style>
  /* Headline, a big product shot, three short trust bullets beside it, a wordmark.
     Nothing else: no offer line, no eyebrow, no dose copy, no fine print. */
  body { background: ${t.bg}; color: ${t.fg}; display: flex; flex-direction: column;
    align-items: center; padding: 72px 64px 108px; }
  .headline { flex: none; font-family: Outfit, sans-serif; font-weight: 900; font-size: 66px;
    line-height: 1.05; letter-spacing: -0.03em; text-transform: uppercase; text-align: center;
    text-wrap: balance; max-width: 920px; }
  .stage { flex: 1 1 auto; min-height: 0; width: 100%; max-width: 960px; display: grid;
    grid-template-columns: 1fr 480px; align-items: center; align-content: center; gap: 44px; }
  .bullets { display: flex; flex-direction: column; gap: 30px; }
  .bullet { display: flex; align-items: center; gap: 20px; }
  .bullet .ico { flex: none; width: 64px; height: 64px; border-radius: 50%; background: ${t.chipBg};
    color: ${t.chipFg}; display: flex; align-items: center; justify-content: center; }
  .bullet .ico svg { width: 34px; height: 34px; }
  .bullet span.label { font-family: Figtree, sans-serif; font-weight: 700; font-size: 38px;
    line-height: 1.15; }
  .pack { text-align: center; }
  .pack img { width: 100%; height: auto; display: block; }
  .mark { color: ${t.fg}; }
</style>
  <div class="headline">${c.headline}</div>
  <div class="stage">
    <div class="bullets">${c.bullets.map((b) => `
      <div class="bullet"><span class="ico">${icon("check", 3.5)}</span><span class="label">${b}</span></div>`).join("")}
    </div>
    <div class="pack"><img src="${pack(c)}"></div>
  </div>
  <div class="mark">Sunnycells</div>
</body></html>`;
};

const sorryPage = (c) => `${head(1080, 1080)}
<style>
  /* Headline and subhead as real markup, the product photo underneath with no text
     baked into it at all: exact wording on a clean sans-serif headline is not
     something worth handing to an image model, unlike the marker-on-cardboard shots
     where a little imperfection reads as authentic rather than as a typo. */
  body { display: flex; flex-direction: column; align-items: center; padding: 60px 56px 108px; }
  .headline { flex: none; font-family: Outfit, sans-serif; font-weight: 900; font-size: 88px;
    line-height: 1; letter-spacing: -0.03em; text-transform: uppercase; text-align: center; }
  .sub { flex: none; margin-top: 18px; font-family: Figtree, sans-serif; font-weight: 700;
    font-size: 44px; line-height: 1.25; text-align: center; max-width: 960px; color: ${INK}; }
  .photoWrap { flex: 1 1 auto; min-height: 0; width: 100%; margin-top: 28px;
    display: flex; align-items: center; justify-content: center; }
  .photoWrap img { max-width: 100%; max-height: 100%; object-fit: contain; display: block; }
</style>
  <div class="headline">${c.headline}</div>
  <div class="sub">${c.sub}</div>
  <div class="photoWrap"><img src="${c.photo}"></div>
  <div class="mark">Sunnycells</div>
</body></html>`;

/* A two-panel "us vs others" comparison, styled after a competitor reference, but built as a real
   CSS grid rather than an AI-composed image: one shared grid_template_rows means the checkmark, the
   label, and the X in a given row are always vertically centred on the exact same line, no matter how
   many lines the label wraps to. An image model has no such guarantee. */
const brandAdvantagePage = (c) => `${head(1080, 1080)}
<style>
  body { background: ${CLICKBAIT_NAVY}; color: ${WHITE}; display: flex; flex-direction: column;
    padding: 64px 56px 56px; }
  .headline { flex: none; font-family: Outfit, sans-serif; font-weight: 900; font-size: 60px;
    text-align: center; letter-spacing: -0.02em; }
  /* The pack sits in its own row, never overlapping the grid below: an overlap that eats into
     row one is exactly the kind of misalignment this layout exists to avoid. */
  .packRow { flex: none; display: grid; grid-template-columns: 300px 1fr 300px; margin-top: 30px; }
  .pack { text-align: center; }
  .pack img { width: 200px; height: auto; display: block; margin: 0 auto; border-radius: 18px; }
  .themLabel { font-family: Outfit, sans-serif; font-weight: 800; font-size: 40px; color: ${WHITE};
    text-align: center; align-self: center; }
  .stage { position: relative; flex: 1 1 auto; min-height: 0; margin-top: 20px; }
  .panel { position: absolute; top: 0; bottom: 0; width: 300px; border-radius: 32px; }
  .panel.us { left: 0; background: ${SKY}; }
  .panel.them { right: 0; background: rgba(255,255,255,0.08); }
  .grid { position: relative; height: 100%; display: grid; grid-template-columns: 300px 1fr 300px; }
  .cell { display: flex; align-items: center; justify-content: center; }
  .cell.label { padding: 0 24px; font-family: Figtree, sans-serif; font-weight: 700; font-size: 34px;
    text-align: center; line-height: 1.3; }
  .dot { width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center;
    justify-content: center; }
  .dot.us { background: ${CLICKBAIT_NAVY}; color: ${SKY}; }
  .dot.them { background: rgba(255,255,255,0.14); color: rgba(255,255,255,0.6); }
  .dot svg { width: 30px; height: 30px; }
</style>
  <div class="headline">${c.headline}</div>
  <div class="packRow">
    <div class="pack"><img src="${c.bottlePhoto}"></div>
    <span></span>
    <div class="themLabel">${c.themLabel}</div>
  </div>
  <div class="stage">
    <div class="panel us"></div>
    <div class="panel them"></div>
    <div class="grid" style="grid-template-rows: repeat(${c.rows.length}, 1fr);">
      ${c.rows.map((r) => `
      <div class="cell"><span class="dot us">${icon("check", 3.5)}</span></div>
      <div class="cell label">${r}</div>
      <div class="cell"><span class="dot them">${icon("ban", 2.6)}</span></div>`).join("")}
    </div>
  </div>
</body></html>`;

const versusPage = (c) => `${head(1080, 1080)}
<style>
  body { display: flex; flex-direction: column; padding: 68px 56px 52px; }
  .headline { font-family: Outfit, sans-serif; font-weight: 900; font-size: 50px; line-height: 1.08;
    letter-spacing: -0.03em; text-align: center; text-wrap: balance; }
  .headline em { font-style: normal; color: ${ZEST}; }
  .card { margin-top: 30px; flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column;
    border-radius: 24px; overflow: hidden; background: ${SHELL}; }
  .thead { flex: none; display: grid; grid-template-columns: 1.1fr 1fr 1fr; }
  .thead span { padding: 20px 18px; font-family: Figtree, sans-serif; font-weight: 700; font-size: 22px; text-align: center; }
  .thead .us { background: ${SUN}; color: ${INK}; }
  .thead .them { background: ${INK}; color: ${WHITE}; }
  .rows { flex: 1 1 auto; display: flex; flex-direction: column; }
  .row { flex: 1 1 auto; display: grid; grid-template-columns: 1.1fr 1fr 1fr; align-items: center;
    border-top: 1px solid rgba(13,13,12,0.12); }
  .label { padding: 0 20px; font-family: Figtree, sans-serif; font-weight: 700; font-size: 21px; }
  .cell { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 8px; padding: 10px 14px; text-align: center; font-size: 18px; font-weight: 600; line-height: 1.25; }
  .cell.us { background: rgba(255,198,30,0.16); }
  .cell .dot { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
  .cell.us .dot { background: ${SUCCESS}; color: ${WHITE}; }
  .cell.them .dot { background: rgba(13,13,12,0.12); color: ${INK_60}; }
  .cell.us .dot svg { width: 18px; height: 18px; }
  .cell.them .dot svg { width: 16px; height: 16px; }
  .fine { margin-top: 20px; font-size: 17px; color: ${INK_60}; text-align: center; }
</style>
  <div class="headline">${c.headline}</div>
  <div class="card">
    <div class="thead"><span></span><span class="us">${c.usLabel}</span><span class="them">${c.themLabel}</span></div>
    <div class="rows">${c.rows.map((r) => `
      <div class="row">
        <div class="label">${r.label}</div>
        <div class="cell us"><span class="dot">${icon("check", 3.5)}</span><span>${r.us}</span></div>
        <div class="cell them"><span class="dot">${icon("ban", 2.6)}</span><span>${r.them}</span></div>
      </div>`).join("")}</div>
  </div>
  <div class="fine">${c.fine}</div>
</body></html>`;

const reviewCardPage = (c) => `${head(1080, 1080)}
<style>
  /* The quote is rendered verbatim as markup, never reworded or trimmed to fit: it is
     a real customer's own words, and a picture that misquoted them would misrepresent
     what they actually said. Only the palette varies between the three variations. */
  body { background: ${c.bg}; color: ${c.fg}; display: flex; flex-direction: column;
    justify-content: center; padding: 88px 84px; }
  .stars { display: flex; gap: 10px; }
  .stars svg { width: 44px; height: 44px; color: ${c.accent}; }
  .headline { margin-top: 28px; font-family: Outfit, sans-serif; font-weight: 800; font-size: 44px;
    line-height: 1.2; letter-spacing: -0.01em; text-wrap: balance; }
  .quote { margin-top: 22px; font-size: 29px; font-weight: 500; line-height: 1.48; text-wrap: balance; }
  .badge { margin-top: 36px; display: flex; align-items: center; gap: 12px; }
  .badge .dot { flex: none; width: 32px; height: 32px; border-radius: 50%; background: ${c.accent};
    color: ${c.dotFg}; display: flex; align-items: center; justify-content: center; }
  .badge .dot svg { width: 17px; height: 17px; }
  .badge span { font-family: Figtree, sans-serif; font-weight: 600; font-size: 20px;
    letter-spacing: 0.04em; color: ${c.fgMuted}; }
</style>
  <div class="stars">${[0, 1, 2, 3, 4].map(() => `<svg viewBox="0 0 24 24" fill="currentColor">${ICONS.star}</svg>`).join("")}</div>
  <div class="headline">${c.headline}</div>
  <div class="quote">${c.quote}</div>
  <div class="badge"><span class="dot">${icon("check", 3.5)}</span><span>${c.verified}</span></div>
</body></html>`;

const dualReviewCardPage = (c) => `${head(1080, 1080)}
<style>
  /* Two reviewCards on one canvas, each anchored to its own corner rather than centred,
     so a variable quote length grows away from its corner instead of risking a collision
     in the middle. Same verbatim-quote rule as the single card. */
  body { background: ${c.bg}; color: ${c.fg}; }
  .card { position: absolute; width: 540px; display: flex; flex-direction: column; }
  .card.tl { top: 64px; left: 64px; }
  .card.br { right: 64px; bottom: 64px; }
  .stars { display: flex; gap: 9px; }
  .stars svg { width: 36px; height: 36px; color: ${c.accent}; }
  .headline { margin-top: 20px; font-family: Outfit, sans-serif; font-weight: 800; font-size: 35px;
    line-height: 1.2; letter-spacing: -0.01em; text-wrap: balance; }
  .quote { margin-top: 16px; font-size: 24px; font-weight: 500; line-height: 1.42; text-wrap: balance; }
  .badge { margin-top: 22px; display: flex; align-items: center; gap: 10px; }
  .badge .dot { flex: none; width: 28px; height: 28px; border-radius: 50%; background: ${c.accent};
    color: ${c.dotFg}; display: flex; align-items: center; justify-content: center; }
  .badge .dot svg { width: 15px; height: 15px; }
  .badge span { font-family: Figtree, sans-serif; font-weight: 600; font-size: 18px;
    letter-spacing: 0.04em; color: ${c.fgMuted}; }
</style>
  ${c.reviews.map((r, i) => `
  <div class="card ${i === 0 ? "tl" : "br"}">
    <div class="stars">${[0, 1, 2, 3, 4].map(() => `<svg viewBox="0 0 24 24" fill="currentColor">${ICONS.star}</svg>`).join("")}</div>
    <div class="headline">${r.headline}</div>
    <div class="quote">${r.quote}</div>
    <div class="badge"><span class="dot">${icon("check", 3.5)}</span><span>${r.verified}</span></div>
  </div>`).join("")}
</body></html>`;

/* A native/advertorial thumbnail format, deliberately off the brand system (navy, not paper;
   a fake play button; a screaming highlight colour) because the whole point of this unit is
   to look nothing like a designed ad. The two photos are AI-generated with no text baked in,
   same reason as every other layout here: exact wording goes on as real markup. */
const CLICKBAIT_NAVY = "#132347";
/* A big CTA button in the reference's own red/green, not the brand's muted status
   pair (--status-success/--status-error): those are deliberately quiet furniture
   colours, and this is deliberately the opposite. One-off ad hues, same footing as
   CLICKBAIT_NAVY above. */
const CTA_COLORS = { red: "#E13A2E", green: "#2AAE53" };

const clickbaitPage = (c) => `${head(1080, 1296)}
<style>
  body { background: ${CLICKBAIT_NAVY}; display: flex; flex-direction: column; }
  .bar { flex: none; padding: 34px 32px; text-align: center; }
  .bar span { font-family: Outfit, sans-serif; font-weight: 900; font-size: 64px; line-height: 1.05;
    letter-spacing: -0.02em; text-transform: uppercase; color: ${WHITE}; }
  .bar mark { background: none; color: ${SUN}; }
  .stage { position: relative; flex: 1 1 auto; min-height: 0; display: flex; }
  .stage .half { flex: 1 1 50%; overflow: hidden; }
  .stage .half img { width: 100%; height: 100%; object-fit: cover; display: block; }
</style>
  <div class="bar"><span>${c.top}</span></div>
  <div class="stage">
    <div class="half"><img src="${c.photoLeft}"></div>
    <div class="half"><img src="${c.photoRight}"></div>
  </div>
  <div class="bar"><span>${c.bottom}</span></div>
</body></html>`;

const pacePage = (c) => `${head(1080, 1080)}
<style>
  /* The photo texture comes from fal.ai; the curves, dots, axis and every word of
     copy are drawn as real SVG/HTML on top, for the same reason the studies table
     stopped being an AI-rendered image: exact wording and exact line shapes are not
     something an image model reliably gets right. */
  body { position: relative; overflow: hidden; }
  .bg { position: absolute; inset: 0; }
  .bg img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .scrim { position: absolute; inset: 0; background: rgba(13,13,12,0.28); }
  .headline { position: absolute; inset: 52px 56px auto 56px; color: ${WHITE}; }
  .headline .lede { font-family: Outfit, sans-serif; font-weight: 900; font-size: 40px;
    letter-spacing: -0.02em; color: ${SUN}; }
  .headline .sub { margin-top: 8px; font-family: Figtree, sans-serif; font-weight: 600;
    font-size: 24px; line-height: 1.35; max-width: 640px; }
  .chart { position: absolute; left: 118px; right: 40px; top: 250px; bottom: 150px; }
  .chart svg { width: 100%; height: 100%; overflow: visible; }
  .axisLabel { font-family: Figtree, sans-serif; font-weight: 600; fill: rgba(255,255,255,0.55); font-size: 22px; }
  .tickLabel { font-family: Figtree, sans-serif; font-weight: 600; fill: rgba(255,255,255,0.55); font-size: 20px; }
  .curveLabel { font-family: Figtree, sans-serif; font-weight: 700; font-size: 21px; }
  .legend { position: absolute; left: 56px; right: 56px; bottom: 56px; display: flex; gap: 32px;
    justify-content: center; }
  .legend span { display: flex; align-items: center; gap: 10px; font-family: Figtree, sans-serif;
    font-weight: 700; font-size: 22px; color: ${WHITE}; }
  .legend .dot { width: 16px; height: 16px; border-radius: 50%; }
</style>
  <div class="bg"><img src="${c.photo}"></div>
  <div class="scrim"></div>
  <div class="headline">
    <div class="lede">${c.lede}</div>
    <div class="sub">${c.sub}</div>
  </div>
  <div class="chart">
    <svg viewBox="0 0 1000 560" preserveAspectRatio="none">
      <line x1="0" y1="520" x2="1000" y2="520" stroke="rgba(255,255,255,0.35)" stroke-width="2" />
      <line x1="0" y1="40" x2="0" y2="520" stroke="rgba(255,255,255,0.35)" stroke-width="2" />
      <text class="axisLabel" x="-8" y="46" text-anchor="end">High</text>
      <text class="axisLabel" x="-8" y="286" text-anchor="end">Medium</text>
      <text class="axisLabel" x="-8" y="516" text-anchor="end">Low</text>
      ${["9pm", "11pm", "1am", "3am", "5am", "7am"].map((t, i) => `
      <text class="tickLabel" x="${30 + i * 188}" y="552" text-anchor="middle">${t}</text>`).join("")}

      <path d="${c.them.path}" fill="none" stroke="${ZEST}" stroke-width="6" stroke-linecap="round" />
      <path d="${c.them.tail}" fill="none" stroke="${ZEST}" stroke-width="6" stroke-linecap="round" stroke-dasharray="4 14" />
      ${c.them.points.map((p) => `<circle cx="${p.x}" cy="${p.y}" r="9" fill="${WHITE}" stroke="${ZEST}" stroke-width="5" />`).join("")}
      ${c.them.labels.map((l) => `<text class="curveLabel" x="${l.x}" y="${l.y}" text-anchor="${l.anchor ?? "middle"}" fill="${ZEST}">${l.text}</text>`).join("")}

      <path d="${c.us.path}" fill="none" stroke="${SPROUT}" stroke-width="6" stroke-linecap="round" />
      ${c.us.points.map((p) => `<circle cx="${p.x}" cy="${p.y}" r="9" fill="${WHITE}" stroke="${SPROUT}" stroke-width="5" />`).join("")}
      ${c.us.labels.map((l) => `<text class="curveLabel" x="${l.x}" y="${l.y}" text-anchor="${l.anchor ?? "middle"}" fill="${SPROUT}">${l.text}</text>`).join("")}
    </svg>
  </div>
  <div class="legend">
    <span><span class="dot" style="background:${ZEST}"></span>${c.themLabel}</span>
    <span><span class="dot" style="background:${SPROUT}"></span>${c.usLabel}</span>
  </div>
</body></html>`;

const provenPage = (c) => `${head(1080, 1080)}
<style>
  /* Stats are pulled from published research on each ingredient at its studied dose,
     not from a study on Anytime Calm itself, which is why the fine print says so. */
  body { background: ${INK}; color: ${WHITE}; display: flex; flex-direction: column; padding: 64px 64px 48px; }
  .headline { font-family: Outfit, sans-serif; font-weight: 900; font-size: 56px; line-height: 1.1;
    letter-spacing: -0.03em; text-align: center; }
  .headline .ring { display: inline-block; border: 3px solid ${ZEST}; border-radius: 50%;
    padding: 2px 18px 10px; transform: rotate(-2deg); }
  .cards { margin-top: 34px; flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; gap: 18px; }
  .card { flex: 1 1 auto; background: rgba(255,255,255,0.06); border-radius: 20px;
    padding: 24px 28px; display: flex; flex-direction: column; justify-content: center; }
  .name { font-family: Figtree, sans-serif; font-weight: 700; font-size: 23px; }
  .stat { margin-top: 10px; display: inline-block; background: ${SUN}; color: ${INK};
    font-family: Outfit, sans-serif; font-weight: 900; font-size: 46px; letter-spacing: -0.02em;
    padding: 2px 16px; border-radius: 8px; }
  .desc { margin-top: 10px; font-size: 21px; font-weight: 500; line-height: 1.35; color: rgba(255,255,255,0.8); }
  .cite { display: block; margin-top: 2px; font-size: 16px; font-weight: 500; color: rgba(255,255,255,0.45); }
  .fine { margin-top: 22px; font-size: 15px; line-height: 1.4; color: rgba(255,255,255,0.42); text-align: center; }
</style>
  <div class="headline">${c.headlineLead}<br><span class="ring">${c.headlineRing}</span></div>
  <div class="cards">${c.cards.map((card) => `
    <div class="card">
      <span class="name">${card.name}</span>
      <span class="stat">${card.stat}</span>
      <span class="desc">${card.desc}<span class="cite">${card.cite}</span></span>
    </div>`).join("")}
  </div>
  <div class="fine">${c.fine}</div>
</body></html>`;

/* Lucide glyphs, redrawn as clip-art marks rather than photos of a real face: a
   stand-in that can show a claim clearing across four frames without implying any
   specific person's documented result, the same reasoning splitPage and badgePage
   above use for staying off photoreal faces. Each creative picks the glyph that
   actually matches its headline (a door for "walked into the room", a key for
   "where your keys are", ...) rather than every ad reusing one brain icon.
   Node data copied from node_modules/lucide-react/dist/esm/icons/*.mjs (ISC). */
const ICON_SETS = {
  brain: [
    ["path", { d: "M12 18V5" }],
    ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" }],
    ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" }],
    ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77" }],
    ["path", { d: "M18 18a4 4 0 0 0 2-7.464" }],
    ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" }],
    ["path", { d: "M6 18a4 4 0 0 1-2-7.464" }],
    ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77" }],
  ],
  "message-circle": [
    ["path", { d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" }],
  ],
  "id-card": [
    ["path", { d: "M16 10h2" }],
    ["path", { d: "M16 14h2" }],
    ["path", { d: "M6.17 15a3 3 0 0 1 5.66 0" }],
    ["circle", { cx: "9", cy: "11", r: "2" }],
    ["rect", { x: "2", y: "5", width: "20", height: "14", rx: "2" }],
  ],
  "door-open": [
    ["path", { d: "M11 20H2" }],
    ["path", { d: "M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z" }],
    ["path", { d: "M11 4H8a2 2 0 0 0-2 2v14" }],
    ["path", { d: "M14 12h.01" }],
    ["path", { d: "M22 20h-3" }],
  ],
  target: [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["circle", { cx: "12", cy: "12", r: "6" }],
    ["circle", { cx: "12", cy: "12", r: "2" }],
  ],
  sun: [
    ["circle", { cx: "12", cy: "12", r: "4" }],
    ["path", { d: "M12 2v2" }],
    ["path", { d: "M12 20v2" }],
    ["path", { d: "m4.93 4.93 1.41 1.41" }],
    ["path", { d: "m17.66 17.66 1.41 1.41" }],
    ["path", { d: "M2 12h2" }],
    ["path", { d: "M20 12h2" }],
    ["path", { d: "m6.34 17.66-1.41 1.41" }],
    ["path", { d: "m19.07 4.93-1.41 1.41" }],
  ],
  "key-round": [
    ["path", { d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" }],
    ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor" }],
  ],
  "book-open": [
    ["path", { d: "M12 5v16" }],
    ["path", { d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" }],
  ],
  mic: [
    ["path", { d: "M12 19v3" }],
    ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }],
    ["rect", { x: "9", y: "2", width: "6", height: "13", rx: "3" }],
  ],
  zap: [
    ["path", { d: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z" }],
  ],
  "rotate-ccw": [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }],
    ["path", { d: "M3 3v5h5" }],
  ],
  users: [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
    ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744" }],
    ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }],
    ["circle", { cx: "9", cy: "7", r: "4" }],
  ],
  "messages-square": [
    ["path", { d: "M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }],
    ["path", { d: "M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1" }],
  ],
  sparkles: [
    ["path", { d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" }],
    ["path", { d: "M20 2v4" }],
    ["path", { d: "M22 4h-4" }],
    ["circle", { cx: "4", cy: "20", r: "2" }],
  ],
};
/* One renderer for every glyph above: most nodes are stroked outlines, but a couple
   (the key's bow dot) are filled solids in the source icon, flagged by their own
   fill: "currentColor" rather than hardcoded per icon. */
const iconMarkup = (nodes, color) => nodes.map(([tag, a]) => {
  const solid = a.fill === "currentColor";
  const paint = solid ? `fill="${color}" stroke="none"`
    : `fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"`;
  if (tag === "path") return `<path d="${a.d}" ${paint} />`;
  if (tag === "circle") return `<circle cx="${a.cx}" cy="${a.cy}" r="${a.r}" ${paint} />`;
  if (tag === "rect") return `<rect x="${a.x}" y="${a.y}" width="${a.width}" height="${a.height}" rx="${a.rx ?? 0}" ${paint} />`;
  return "";
}).join("");
const SPARK_D = "M13 2 4.5 13H11l-1 9 8.5-11H12Z";
/* Six fixed positions round the frame's edges, well clear of the centred brain, so
   a stage just turns some of them on rather than recomputing layout for a panel
   that is no longer a circle. */
const SPARK_SPOTS = [
  { top: "10%", left: "14%" }, { top: "8%", left: "72%" }, { top: "42%", left: "84%" },
  { top: "78%", left: "76%" }, { top: "80%", left: "16%" }, { top: "44%", left: "8%" },
];
/* A glyph reads as a washed-out grey when it is meant to look foggy, not vivid, and
   in a real, warm tone, not a flat black line icon, once the fog clears: a dull
   taupe warming into a vivid coral as the four stages go on. One-off ad hues, same
   footing as CLICKBAIT_NAVY below, since neither is a UI colour token. */
const ICON_TONES = ["#BFB2AC", "#D08977", "#E06B52", "#D8492E"];
/* Four stages: the panel tints from flat grey to sun, the fog cloud over the glyph
   fades out, and more sparks light up round it. Nothing here is graded from a photo,
   it is drawn fresh per stage, which is how a mark can go from "foggy" to "clear"
   without four separate renders standing in for a real result. */
const CLARITY_STAGES = [
  { bg: INK_20, icon: ICON_TONES[0], fog: 0.85, sparks: 0 },
  { bg: INK_10, icon: ICON_TONES[1], fog: 0.5, sparks: 2 },
  { bg: SUN_TINT, icon: ICON_TONES[2], fog: 0.15, sparks: 4 },
  { bg: SUN_TINT, icon: ICON_TONES[3], fog: 0, sparks: 6 },
];
/* A creative naming c.photos gets the real seed-and-reference-edit chain (one
   generated frame, edited forward three times so the same silhouette/brain carries
   through instead of four independent renders); everything else keeps the drawn
   icon system so a title doesn't sit blank while photos are still being generated. */
const clarityFrame = (i, iconName, photoSrc) => {
  if (photoSrc) return `<div class="panel"><img src="${photoSrc}"></div>`;
  const s = CLARITY_STAGES[i];
  const nodes = ICON_SETS[iconName] ?? ICON_SETS.brain;
  return `<div class="panel" style="background: ${s.bg};">
    ${SPARK_SPOTS.slice(0, s.sparks).map((p) => `
    <svg class="spark" style="top: ${p.top}; left: ${p.left};" viewBox="0 0 24 24" fill="${SUN}">
      <path d="${SPARK_D}" /></svg>`).join("")}
    <svg class="mark" viewBox="0 0 24 24">${iconMarkup(nodes, s.icon)}</svg>
    ${s.fog > 0 ? `<div class="fog" style="opacity: ${s.fog};"></div>` : ""}
  </div>`;
};

const clarityPage = (c) => `${head(900, 1200)}
<style>
  /* Positioning follows the reference: headline bar, a 2x2 grid with the day label
     set as a plain caps line above each frame (not a badge on the photo), and the
     pack run large down the right side rather than parked underneath. Each panel
     fills its cell edge to edge rather than floating a small badge in empty space. */
  body { background: ${SHELL}; display: flex; flex-direction: column; padding: 32px 28px 32px; }
  .headline { flex: none; font-family: Outfit, sans-serif; font-weight: 900; font-size: 48px;
    line-height: 1.0; letter-spacing: -0.03em; text-transform: uppercase; text-align: center;
    text-wrap: balance; }
  .stage { flex: 1 1 auto; min-height: 0; margin-top: 14px; display: flex; gap: 14px; }
  /* Tight, square-edged gutters, closer to a contact sheet than four separate
     rounded tiles: the reference's four shots read as one continuous board because
     nothing about them announces "card". */
  .grid { flex: 1 1 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 3px; background: ${INK_20}; }
  .frame { display: flex; flex-direction: column; min-height: 0; background: ${SHELL}; }
  .frame .label { flex: none; font-family: Figtree, sans-serif; font-weight: 700; font-size: 17px;
    letter-spacing: 0.03em; text-transform: uppercase; padding: 10px 12px 6px; }
  .panel { position: relative; flex: 1 1 auto; min-height: 0; overflow: hidden;
    display: flex; align-items: center; justify-content: center; }
  .panel .mark { position: relative; z-index: 1; width: 46%; height: auto; }
  .panel .spark { position: absolute; width: 30px; height: 30px; }
  .panel .fog { position: absolute; inset: -20%; background: ${WHITE};
    filter: blur(26px); border-radius: 50%; }
  .panel img { width: 100%; height: 100%; object-fit: cover; display: block; }
  /* A bigger, tilted bottle carries more of the persuasive weight than a flat
     static cutout, the same role the angled dropper shot plays in the reference. */
  .pack { flex: none; width: ${c.cta ? 220 : 270}px; align-self: center; transform: rotate(-5deg);
    filter: drop-shadow(0 18px 26px rgba(13,13,12,0.22)); }
  .pack img { width: 100%; height: auto; display: block; }
  .offer { flex: none; margin-top: 22px; text-align: center; font-family: Outfit, sans-serif;
    font-weight: 800; font-size: 30px; letter-spacing: -0.02em; text-wrap: balance; }
  /* A full-width button standing in for the offer line: a fixed height (rather than
     content-sized) so it reliably reads as "about a quarter of the canvas" and the
     stage above shrinks to give it room, same flex-basis trade every other fixed
     footer in this file makes. */
  .cta { flex: none; height: 260px; margin-top: 20px; border-radius: 16px;
    background: ${c.cta ? CTA_COLORS[c.cta.color ?? "green"] : "transparent"};
    display: flex; align-items: center; justify-content: center; }
  .cta span { color: ${WHITE}; font-family: Outfit, sans-serif; font-weight: 900;
    font-size: 72px; letter-spacing: -0.02em; text-transform: uppercase; text-align: center;
    padding: 0 32px; text-wrap: balance; }
</style>
  <div class="headline">${c.headline}</div>
  <div class="stage">
    <div class="grid">${c.frames.map((f, i) => `
      <div class="frame">
        <span class="label">${f}</span>
        ${clarityFrame(i, c.icon, c.photos && c.photos[i])}
      </div>`).join("")}
    </div>
    <div class="pack"><img src="${pack(c)}"></div>
  </div>
  ${c.cta
    ? `<div class="cta"><span>${c.cta.text}</span></div>`
    : `<div class="offer">${c.offerLine}</div>`}
</body></html>`;

/* Modeled on the reference: a red title bar naming the challenge, two square photos
   side by side (same person, seed-and-reference-edited forward rather than two
   independent renders), a day label in the corner of each, the pack propped on the
   second photo, and a result strip with a fine-print line rather than a second
   unsupported claim stacked under it. */
const challengePage = (c) => `${head(1080, 1080)}
<style>
  body { display: flex; flex-direction: column; }
  .bar { flex: none; background: ${CTA_COLORS.red}; padding: 26px 32px; text-align: center; }
  .bar span { color: ${WHITE}; font-family: Outfit, sans-serif; font-weight: 900; font-size: 46px;
    letter-spacing: -0.02em; text-transform: uppercase; line-height: 1; white-space: nowrap; }
  .photos { flex: 1 1 auto; min-height: 0; display: flex; }
  .photo { position: relative; flex: 1 1 50%; overflow: hidden; }
  .photo + .photo { border-left: 2px solid ${WHITE}; }
  .photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .day { position: absolute; left: 16px; bottom: 16px; background: rgba(13,13,12,0.72);
    color: ${WHITE}; font-family: Figtree, sans-serif; font-weight: 700; font-size: 46px;
    letter-spacing: 0.02em; text-transform: uppercase; padding: 14px 22px; border-radius: 10px; }
  .pack { position: absolute; right: -6px; bottom: -10px; width: 150px;
    transform: rotate(-8deg); filter: drop-shadow(0 10px 16px rgba(13,13,12,0.35)); }
  .pack img { width: 100%; height: auto; display: block; }
  /* Claim on the left, CTA pill on the right, one row: at this size that only
     works because the CTA is a content-sized pill rather than a full-width block. */
  .result { flex: none; background: ${WHITE}; border-top: 1px solid ${INK_20};
    padding: 24px 32px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
  .result .claim { display: flex; align-items: center; gap: 16px; min-width: 0; }
  .result .tick { flex: none; width: 52px; height: 52px; border-radius: 50%; background: ${INK};
    color: ${SUN}; display: flex; align-items: center; justify-content: center; }
  .result .tick svg { width: 28px; height: 28px; }
  .result .claim span { font-family: Outfit, sans-serif; font-weight: 900; font-size: 34px;
    letter-spacing: -0.01em; text-transform: uppercase; line-height: 1.05; }
  .result .fine { font-size: 22px; font-weight: 600; color: ${INK_60}; line-height: 1.3; }
  .result .cta { flex: none; border-radius: 14px; padding: 20px 30px;
    background: ${c.cta ? CTA_COLORS[c.cta.color ?? "green"] : "transparent"};
    display: flex; align-items: center; justify-content: center; }
  .result .cta span { color: ${WHITE}; font-family: Outfit, sans-serif; font-weight: 900;
    font-size: 28px; letter-spacing: -0.02em; text-transform: uppercase; text-align: center;
    white-space: nowrap; }
</style>
  <div class="bar"><span>${c.challenge}</span></div>
  <div class="photos">
    <div class="photo"><img src="${c.dayPhoto}"><span class="day">${c.dayLabel}</span></div>
    <div class="photo"><img src="${c.resultPhoto}"><span class="day">${c.resultLabel}</span>
      <div class="pack"><img src="${pack(c)}"></div>
    </div>
  </div>
  <div class="result">
    <div class="claim"><span class="tick">${icon("check", 3.5)}</span><span>${c.resultClaim}</span></div>
    ${c.cta ? `<div class="cta"><span>${c.cta.text}</span></div>` : `<div class="fine">${c.fine}</div>`}
  </div>
</body></html>`;

const PAGES = { photo: photoPage, stats: statsPage, timeline: timelinePage, deal: dealPage, studies: studiesPage, split: splitPage, priceCompare: priceComparePage, badge: badgePage, factsLabel: factsLabelPage, versus: versusPage, reviewCard: reviewCardPage, pace: pacePage, proven: provenPage, benefits: benefitsPage, hero: heroPage, sorry: sorryPage, dualReviewCard: dualReviewCardPage, clickbait: clickbaitPage, brandAdvantage: brandAdvantagePage, clarity: clarityPage, challenge: challengePage };

/* Clear the set folders before writing them. The export folder already drops sets
   that no longer exist; without this, renaming a creative leaves its old PNG sitting
   in the folder next to the new one and it gets uploaded as a live ad. */
mkdirSync(OUT, { recursive: true });
const wantedSets = new Set(creatives.map((c) => `adset-${c.set}-${c.setName}`));
for (const dir of wantedSets) rmSync(join(OUT, dir), { recursive: true, force: true });
/* Renaming a set leaves its old folder behind too, not just its old files. The export
   folder already drops those; do the same here so the two cannot disagree. */
for (const e of readdirSync(OUT, { withFileTypes: true })) {
  if (e.isDirectory() && e.name.startsWith("adset-") && !wantedSets.has(e.name)) {
    rmSync(join(OUT, e.name), { recursive: true, force: true });
  }
}
const browser = await chromium.launch();
const tab = await browser.newPage({ deviceScaleFactor: 1 });

/* Written into ads/ and opened over file://, rather than pushed in with setContent:
   the photo and pack paths are relative and setContent gives the page no base to
   resolve them against, so nothing loads. */
const scratch = join(ROOT, "ads", ".render.html");
for (const c of creatives) {
  const layout = c.layout ?? "photo";
  const size = layout === "clickbait" ? { width: 1080, height: 1296 }
    : layout === "clarity" ? { width: 900, height: 1200 }
    : layout === "timeline" || layout === "studies" || layout === "split" || layout === "priceCompare" || layout === "badge" || layout === "factsLabel" || layout === "versus" || layout === "reviewCard" || layout === "pace" || layout === "proven" || layout === "benefits" || layout === "hero" || layout === "sorry" || layout === "dualReviewCard" || layout === "brandAdvantage" || layout === "challenge"
    ? { width: 1080, height: 1080 } : { width: 1080, height: 1920 };
  await tab.setViewportSize(size);
  writeFileSync(scratch, PAGES[layout](c));
  await tab.goto(pathToFileURL(scratch).href, { waitUntil: "networkidle" });
  await tab.evaluate(() => document.fonts.ready);
  const dir = join(OUT, `adset-${c.set}-${c.setName}`);
  mkdirSync(dir, { recursive: true });
  const file = join(dir, `${c.id}.png`);
  /* A fixed-height layout pushes anything that does not fit off the canvas without
     complaining. Long timeline copy cropped the ingredient row and the fine print
     once already, so overflow is reported rather than silently screenshotted. */
  const over = await tab.evaluate((h) => {
    let worst = { px: 0, what: "" };
    for (const e of document.querySelectorAll("body *")) {
      const px = Math.ceil(e.getBoundingClientRect().bottom - h);
      if (px > worst.px) worst = { px, what: `${e.tagName.toLowerCase()}.${e.className || "-"}` };
    }
    return worst;
  }, size.height);
  if (over.px > 1) console.warn(`  ! ${c.id}: ${over.what} overflows the canvas by ${over.px}px`);
  await tab.screenshot({ path: file, omitBackground: layout === "badge" });
  console.log(`set ${c.set}  ${c.setName.padEnd(15)} ${c.id}`);
}
rmSync(scratch, { force: true });
await browser.close();

/* ads/out is gitignored working output. The creatives are picked up from a folder
   outside the repo, so mirror there on every render rather than leaving it to a
   copy by hand, which is how a renamed set went missing once already. Stale set
   folders are cleared so a rename cannot leave both names sitting side by side. */
const EXPORT = process.env.ADS_EXPORT_DIR ?? join(homedir(), "Downloads", "sunnycells-ads");
const wanted = wantedSets;
mkdirSync(EXPORT, { recursive: true });
for (const entry of readdirSync(EXPORT, { withFileTypes: true })) {
  if (entry.isDirectory() && entry.name.startsWith("adset-") && !wanted.has(entry.name)) {
    rmSync(join(EXPORT, entry.name), { recursive: true, force: true });
    console.log(`removed stale ${entry.name}`);
  }
}
cpSync(OUT, EXPORT, { recursive: true });

const bySet = new Map();
for (const c of creatives) bySet.set(c.set, (bySet.get(c.set) ?? 0) + 1);
console.log("");
for (const [n, count] of [...bySet].sort((a, b) => a[0] - b[0])) {
  const name = creatives.find((c) => c.set === n).setName;
  console.log(`adset-${n}-${name}: ${count} creatives`);
}
console.log(`\nexported to ${EXPORT}`);
