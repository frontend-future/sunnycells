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
 * Four layouts, chosen by the entry's `layout`:
 *   photo     1080x1920  a shot with the headline over it, then pack and points.
 *                        An `after` key turns it into a labelled before and after
 *                        pair; null leaves the after panel as a marked slot.
 *   stats     1080x1920  a flat colour field, headline, pack, then figures.
 *   timeline  1080x1080  a day by day routine beside the pack, with ingredients.
   deal      1080x1920  headline bar, the problem-state photo, what is included, the pack.
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = resolve(process.argv[2] ?? join(ROOT, "ads", "out"));
const creatives = JSON.parse(readFileSync(join(ROOT, "ads", "creatives.json"), "utf8"));

const tokens = readFileSync(join(ROOT, "app", "tokens", "colors.css"), "utf8");
const token = (name) => tokens.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`))[1];
const INK = token("ink");
const SUN = token("sun");
const SUN_TINT = token("sun-tint");
const SUCCESS = token("status-success");
const WHITE = "#FFFFFF";

const PACK = "../public/product/metabolic-morning-blend.png";

/* Marks drawn inline: the page is rendered standalone from a file, so there is no
   bundler to pull an icon package through. */
const ICONS = {
  down: '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  ban: '<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',
  star: '<path d="m12 3 2.7 5.8 6.3.8-4.6 4.4 1.2 6.2L12 17.8 6.4 20.2l1.2-6.2L3 9.6l6.3-.8Z"/>',
  spark: '<path d="M13 2 4.5 13H11l-1 9 8.5-11H12Z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
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
  .shot { position: relative; height: 1180px; overflow: hidden; }
  .shot > img { width: 100%; height: 100%; object-fit: cover; object-position: center 28%; display: block; }
  .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; height: 100%; }
  .panel { position: relative; overflow: hidden; background: ${SUN_TINT}; }
  .panel img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; display: block; }
  .tag { position: absolute; top: 24px; left: 24px; z-index: 2; background: ${INK}; color: ${WHITE};
    font-size: 24px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
    padding: 8px 16px; border-radius: 8px; }
  .slot { height: 100%; display: flex; align-items: center; justify-content: center; padding: 40px;
    text-align: center; font-size: 30px; font-weight: 700; line-height: 1.4; }
  /* The headline sits on the photo, so it needs a scrim to stay readable whatever the
     picture is doing behind it. */
  .scrim { position: absolute; inset: auto 0 0 0; height: 62%;
    background: linear-gradient(to top, rgba(13,13,12,0.88) 34%, rgba(13,13,12,0)); }
  .headline { position: absolute; inset: auto 56px 60px 56px; color: ${WHITE};
    font-family: Outfit, sans-serif; font-weight: 900; font-size: 72px; line-height: 1.02;
    letter-spacing: -0.03em; text-transform: uppercase; text-wrap: balance; }
  .body { padding: 60px 56px 0; }
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
</style>
  <div class="shot">
    ${!("after" in c)
      ? `<img src="${c.photo}">`
      : `<div class="pair">
           <div class="panel"><span class="tag">Before</span><img src="${c.photo}"></div>
           <div class="panel"><span class="tag">After</span>${
             c.after ? `<img src="${c.after}">` : `<div class="slot">A real customer&rsquo;s after photo goes here</div>`
           }</div>
         </div>`}
    <div class="scrim"></div>
    <div class="headline">${c.headline}</div>
  </div>
  <div class="body">
    <!-- A statement about the mechanism, not a quoted customer, so it is not set in
         quote marks as though somebody had said it. -->
    <div class="line"><span>${c.line}</span></div>
    <div class="row">
      <div class="pack"><img src="${PACK}"></div>
      <ul>${c.points.map((p) => `
        <li><span class="tick">${icon("check", 3.5)}</span><span>${p}</span></li>`).join("")}
      </ul>
    </div>
  </div>
  <div class="mark">Sunnycells</div>
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
    <div class="pack"><img src="${PACK}"></div>
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
  .flash { position: absolute; top: 10px; left: -18px; width: 228px; height: 228px; padding: 0 18px; border-radius: 50%;
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
        <img src="${PACK}">
        <div class="flash"><span class="big">${c.flash}</span><span class="small">${c.flashSub}</span></div>
      </div>
      <ul class="days">${c.days.map((d, i) => `
        <li${i === c.days.length - 1 ? ' class="last"' : ""}><b>${d.day}:</b> ${d.text}</li>`).join("")}
        <div class="rating">
          <span class="n">4.7</span>
          <span class="s">${[0, 1, 2, 3, 4].map(() => `<svg viewBox="0 0 24 24" fill="currentColor">${ICONS.star}</svg>`).join("")}</span>
          <span class="c">12,480 ratings</span>
        </div>
      </ul>
    </div>
    <div class="roots">${c.roots.map((r) => `<span><img src="../public/ingredients/${r}.jpg"></span>`).join("")}</div>
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
  <div class="pack"><img src="${PACK}"></div>
  <div class="fine">${c.fine}</div>
  <div class="mark">Sunnycells</div>
</body></html>`;

const PAGES = { photo: photoPage, stats: statsPage, timeline: timelinePage, deal: dealPage };

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const tab = await browser.newPage({ deviceScaleFactor: 1 });

/* Written into ads/ and opened over file://, rather than pushed in with setContent:
   the photo and pack paths are relative and setContent gives the page no base to
   resolve them against, so nothing loads. */
const scratch = join(ROOT, "ads", ".render.html");
for (const c of creatives) {
  const layout = c.layout ?? "photo";
  const size = layout === "timeline" ? { width: 1080, height: 1080 } : { width: 1080, height: 1920 };
  await tab.setViewportSize(size);
  writeFileSync(scratch, PAGES[layout](c));
  await tab.goto(pathToFileURL(scratch).href, { waitUntil: "networkidle" });
  await tab.evaluate(() => document.fonts.ready);
  const dir = join(OUT, `adset-${c.set}-${c.setName}`);
  mkdirSync(dir, { recursive: true });
  const file = join(dir, `${c.id}.png`);
  await tab.screenshot({ path: file });
  console.log(`set ${c.set}  ${c.setName.padEnd(15)} ${c.id}`);
}
rmSync(scratch, { force: true });
await browser.close();

const bySet = new Map();
for (const c of creatives) bySet.set(c.set, (bySet.get(c.set) ?? 0) + 1);
console.log("");
for (const [n, count] of [...bySet].sort((a, b) => a[0] - b[0])) {
  const name = creatives.find((c) => c.set === n).setName;
  console.log(`adset-${n}-${name}: ${count} creatives`);
}
