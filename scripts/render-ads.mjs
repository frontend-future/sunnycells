/**
 * Renders the ad creatives in ads/creatives.json to 1080x1920 PNGs.
 *
 *   node scripts/render-ads.mjs [outDir]
 *
 * Copy lives in ads/creatives.json and photos in ads/photos, so a new variation is a
 * JSON entry and an image, not a code change. Colours and type are read from the
 * design tokens rather than restated here, so a token change carries into the ads.
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = resolve(process.argv[2] ?? join(ROOT, "ads", "out"));
const creatives = JSON.parse(readFileSync(join(ROOT, "ads", "creatives.json"), "utf8"));

/* Pull the values straight out of the token file so the ads cannot drift from the app. */
const tokens = readFileSync(join(ROOT, "app", "tokens", "colors.css"), "utf8");
const token = (name) => tokens.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`))[1];
const INK = token("ink");
const SUN = token("sun");
const SUN_TINT = token("sun-tint");
const WHITE = "#FFFFFF";

const page = (c) => `
<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&family=Figtree:wght@500;600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1080px; height: 1920px; background: ${WHITE}; font-family: Figtree, sans-serif; color: ${INK}; }
  .shot { position: relative; height: 1180px; overflow: hidden; }
  /* Pair format: two panels under one headline, each labelled. */
  .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; height: 100%; }
  .panel { position: relative; overflow: hidden; background: ${SUN_TINT}; }
  .panel img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; display: block; }
  .tag { position: absolute; top: 24px; left: 24px; background: ${INK}; color: ${WHITE};
    font-size: 24px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
    padding: 8px 16px; border-radius: 8px; z-index: 2; }
  .slot { height: 100%; display: flex; align-items: center; justify-content: center; padding: 40px;
    text-align: center; font-size: 30px; font-weight: 700; line-height: 1.4; color: ${INK}; }
  .shot img { width: 100%; height: 100%; object-fit: cover; object-position: center 28%; display: block; }
  /* The headline sits on the photo, so it needs a scrim under it to stay readable
     whatever the picture is doing behind. */
  .scrim { position: absolute; inset: auto 0 0 0; height: 62%;
    background: linear-gradient(to top, rgba(13,13,12,0.88) 34%, rgba(13,13,12,0)); }
  .headline { position: absolute; inset: auto 56px 56px 56px; color: ${WHITE};
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
  .mark { position: absolute; inset: auto 0 56px 0; text-align: center;
    font-family: Outfit, sans-serif; font-weight: 900; font-size: 42px; letter-spacing: -0.04em;
    text-transform: uppercase; }
</style></head><body>
  <div class="shot">
    ${!("after" in c)
      ? `<img src="${c.photo}">`
      : `<div class="pair">
           <div class="panel"><span class="tag">Before</span><img src="${c.photo}"></div>
           <div class="panel"><span class="tag">After</span>${
             c.after
               ? `<img src="${c.after}">`
               : `<div class="slot">A real customer&rsquo;s after photo goes here</div>`
           }</div>
         </div>`}
    <div class="scrim"></div>
    <div class="headline">${c.headline}</div>
  </div>
  <div class="body">
    <!-- A statement about the mechanism rather than a quoted customer: nobody has
         said this, so it is not set in quote marks as though somebody had. -->
    <div class="line"><span>${c.line}</span></div>
    <div class="row">
      <div class="pack"><img src="../public/product/metabolic-morning-blend.png"></div>
      <ul>${c.points.map((p) => `
        <li><span class="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"
          stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span><span>${p}</span></li>`).join("")}
      </ul>
    </div>
  </div>
  <div class="mark">Sunnycells</div>
</body></html>`;

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });

/* Written to a file inside ads/ and opened over file://, rather than pushed in with
   setContent: the photo and pack paths are relative, and setContent gives the page no
   base to resolve them against, so nothing loads. */
const scratch = join(ROOT, "ads", ".render.html");
for (const c of creatives) {
  writeFileSync(scratch, page(c));
  await tab.goto(pathToFileURL(scratch).href, { waitUntil: "networkidle" });
  await tab.evaluate(() => document.fonts.ready);
  const file = join(OUT, `${c.id}.png`);
  await tab.screenshot({ path: file });
  console.log("wrote", file);
}
rmSync(scratch, { force: true });
await browser.close();
