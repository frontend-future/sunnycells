/**
 * Builds 25 Facebook creatives for SC-25: five angles by five formats, 1080 square,
 * written to ~/Downloads/revitalize-ads.
 *
 * Photography comes from fal. Every glyph is composited here, because generated
 * lettering garbles at this size and four of the five formats are mostly words.
 *
 *   node scripts/build-ads.mjs
 */
import { chromium } from "playwright";
import { readFileSync, mkdirSync, existsSync } from "fs";
import { execFileSync } from "child_process";
import { join } from "path";
import { homedir } from "os";

const SRC = process.argv[2];
const OUT = join(homedir(), "Downloads", "revitalize-ads");
const TMP = join(process.cwd(), ".ads-tmp");
const SIZE = 1080;
const RED = "#D6212B", DEEP = "#A9161E", LIME = "#A6DE1E", INK = "#14120F";

const img = (p) => {
  const abs = p.startsWith("/") ? p : join(SRC, p);
  if (!existsSync(abs)) throw new Error("missing " + abs);
  const ext = abs.endsWith(".png") ? "png" : "webp";
  return `data:image/${ext};base64,${readFileSync(abs).toString("base64")}`;
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&family=Figtree:wght@500;600;700;800&family=Caveat:wght@600;700&display=swap');`;

const shell = (body, bg = "#fff") => `<!doctype html><html><head><meta charset="utf-8"><style>
${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${SIZE}px;height:${SIZE}px}
body{background:${bg};font-family:Figtree,system-ui,sans-serif;color:${INK};
 -webkit-font-smoothing:antialiased;overflow:hidden}
.s{width:${SIZE}px;height:${SIZE}px;position:relative;overflow:hidden}
.d{font-family:Outfit,system-ui,sans-serif;font-weight:800;letter-spacing:-.02em;line-height:1.03}
</style></head><body><div class="s">${body}</div></body></html>`;

/* ---------- the five angles ---------- */
const ANGLES = [
  {
    key: "wrinkles", afterPos: "26% 50%", before: "wrink_b.webp", after: "wrink_a.webp",
    headline: "Your 9–5 Is Aging Your Skin Faster Than The Sun",
    kicker: "Dermatologists are blaming one hormone",
    baCaption: "Cortisol breaks collagen down faster than you rebuild it",
    dayLine: "Fine lines softened",
    sticky: ["Day 14", "the lines round my", "eyes have softened", "— keep going!"],
    chat: [
      { me: false, t: "ok be honest. do I look older than I did last year" },
      { me: false, t: "I swear this job has aged me 5 years" },
      { me: true, t: "it's not you it's cortisol. it eats collagen" },
      { me: true, t: "I started taking these in the morning, 4 chews" },
      { me: true, img: true },
      { me: false, t: "sending me the link right now" },
    ],
  },
  {
    key: "energy", afterPos: "24% 50%", before: "energy_b.webp", after: "energy_a.webp",
    headline: "The 3PM Crash Isn't Normal. It's Your Cortisol.",
    kicker: "And it's why you can't stop snacking at your desk",
    baCaption: "Same desk. Same hours. No afternoon hole.",
    dayLine: "No 3PM crash",
    sticky: ["Day 21", "made it to 6pm", "without the crash", "or a 2nd coffee"],
    chat: [
      { me: false, t: "how are you still awake it's 4pm" },
      { me: true, t: "lol I stopped crashing about 2 weeks ago" },
      { me: false, t: "what?? what changed" },
      { me: true, t: "cortisol drops in the afternoon and takes you with it" },
      { me: true, img: true },
      { me: true, t: "4 chews in the morning. that's it" },
    ],
  },
  {
    key: "face", afterPos: "24% 50%", before: "face_b.webp", after: "face_a.webp",
    headline: "“Cortisol Face” Is Real, And Your Job Is Causing It",
    kicker: "Why you wake up puffy every single morning",
    baCaption: "Fluid retention from unmanaged stress, not weight gain",
    dayLine: "Jawline back",
    sticky: ["Day 10", "woke up and could", "see my jawline", "again 🙂"],
    chat: [
      { me: false, t: "why does my face look so swollen every morning" },
      { me: false, t: "I haven't even changed what I eat" },
      { me: true, t: "cortisol face. it's fluid, not fat" },
      { me: true, t: "magnesium glycinate sorted mine out" },
      { me: true, img: true },
      { me: false, t: "ordering. I'm so tired of this" },
    ],
  },
  {
    key: "belly", afterPos: "78% 50%", before: "belly_b.webp", after: "belly_a.webp",
    headline: "Why Stress Puts Weight On Your Stomach First",
    kicker: "It isn't your diet. It's where cortisol stores fat.",
    baCaption: "Stress decides where the weight sits",
    dayLine: "Down 6 lbs",
    sticky: ["Day 28", "down 6 lbs and", "the pantry raids", "have stopped"],
    chat: [
      { me: false, t: "I eat well. I walk. nothing shifts this stomach" },
      { me: true, t: "because it's not a food problem, it's a stress one" },
      { me: true, t: "cortisol decides WHERE the weight sits" },
      { me: false, t: "so what do I even do about that" },
      { me: true, img: true },
      { me: true, t: "this + I stopped snacking at 3:30. down 6lbs" },
    ],
  },
  {
    key: "gray", afterPos: "22% 50%", before: "gray_b.webp", after: "gray_a.webp",
    headline: "Stress Is Greying Your Hair Years Before It Should",
    kicker: "The follicle research nobody told you about",
    baCaption: "Chronic stress depletes the cells that make your pigment",
    dayLine: "Roots look darker",
    sticky: ["Day 30", "roots actually look", "darker. not", "imagining it"],
    chat: [
      { me: false, t: "found 3 greys this morning. I'm 32" },
      { me: true, t: "same thing happened to me at 31" },
      { me: true, t: "it's oxidative stress on the follicle. it's a stress thing" },
      { me: true, img: true },
      { me: false, t: "and that actually helped??" },
      { me: true, t: "month in and my roots are noticeably darker" },
    ],
  },
];

/* ---------- format 1: text conversation ---------- */
const fmtChat = (a) => shell(`
<div style="position:absolute;inset:0;background:#fff;display:flex;flex-direction:column">
  <div style="padding:22px 30px 16px;border-bottom:1px solid #E5E5EA;display:flex;
    flex-direction:column;align-items:center;gap:8px;flex:none">
    <div style="width:74px;height:74px;border-radius:50%;background:#D8D3E8;display:grid;
      place-items:center;font-size:31px;font-weight:700;color:#5B5470">SJ</div>
    <div style="font-size:27px;font-weight:600">Sarah</div>
  </div>
  <div style="flex:1;padding:20px 28px;display:flex;flex-direction:column;gap:13px;justify-content:flex-end;overflow:hidden">
    ${a.chat.map((m) => m.img ? `
    <div style="align-self:flex-end;width:33%;background:#F2F2F7;border-radius:22px;padding:10px">
      <img src="${img("pouch.png")}" style="width:100%;display:block">
    </div>` : `
    <div style="align-self:${m.me ? "flex-end" : "flex-start"};max-width:78%;
      background:${m.me ? "#2C7BF6" : "#E9E9EB"};color:${m.me ? "#fff" : INK};
      padding:18px 24px;border-radius:26px;font-size:30px;line-height:1.3">${m.t}</div>`).join("")}
  </div>
  <div style="flex:none;padding:0 28px 30px">
    <div style="border:2px solid #E5E5EA;border-radius:24px;padding:16px 24px;color:#8E8E93;font-size:26px">iMessage</div>
  </div>
</div>`);

/* ---------- format 2: before and after, product in view ---------- */
const fmtBA = (a) => shell(`
<div style="position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr">
  <div style="position:relative;overflow:hidden">
    <img src="${img(a.before)}" style="width:100%;height:${SIZE}px;object-fit:cover;filter:saturate(.55) brightness(.93)">
    <span class="d" style="position:absolute;top:26px;left:26px;background:rgba(20,18,15,.8);color:#fff;
      padding:10px 20px;border-radius:8px;font-size:30px;text-transform:uppercase">Before</span>
  </div>
  <div style="position:relative;overflow:hidden">
    <img src="${img(a.after)}" style="width:100%;height:${SIZE}px;object-fit:cover;object-position:${a.afterPos}">
    <span class="d" style="position:absolute;top:26px;right:26px;background:${RED};color:#fff;
      padding:10px 20px;border-radius:8px;font-size:30px;text-transform:uppercase">After</span>
    <img src="${img("pouch.png")}" style="position:absolute;right:-34px;bottom:82px;width:300px;
      filter:drop-shadow(0 16px 26px rgba(0,0,0,.35))">
  </div>
</div>
<div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:120px;height:120px;
  display:grid;place-items:center;z-index:2">
  <svg viewBox="0 0 100 100" width="120" height="120">
    <circle cx="50" cy="50" r="46" fill="#fff"/><circle cx="50" cy="50" r="41" fill="${RED}"/>
    <path d="M31 50 H62 M52 38 L66 50 L52 62" fill="none" stroke="#fff" stroke-width="9"
      stroke-linecap="round" stroke-linejoin="round"/></svg>
</div>
<div style="position:absolute;left:0;right:0;bottom:0;background:${INK};color:#fff;padding:26px 34px;text-align:center">
  <div style="font-size:29px;font-weight:700;line-height:1.28">${a.baCaption}</div>
</div>`);

/* ---------- format 3: 28 day challenge, product in view ---------- */
const fmtChallenge = (a) => shell(`
<div style="position:absolute;inset:0;display:flex;flex-direction:column">
  <div class="d" style="background:${RED};color:#fff;text-align:center;padding:24px 20px;
    font-size:44px;text-transform:uppercase;flex:none">The 28 Day Cortisol Challenge</div>
  <div style="flex:1;display:grid;grid-template-columns:1fr 1fr">
    <div style="position:relative;overflow:hidden;border-right:5px solid #fff">
      <img src="${img(a.before)}" style="width:100%;height:100%;object-fit:cover;filter:saturate(.6)">
      <span class="d" style="position:absolute;bottom:22px;left:22px;background:rgba(20,18,15,.85);color:#fff;
        padding:10px 20px;border-radius:8px;font-size:32px;text-transform:uppercase">Day 1</span>
    </div>
    <div style="position:relative;overflow:hidden">
      <img src="${img(a.after)}" style="width:100%;height:100%;object-fit:cover;object-position:${a.afterPos}">
      <span class="d" style="position:absolute;bottom:22px;right:22px;background:${LIME};color:${INK};
        padding:10px 20px;border-radius:8px;font-size:32px;text-transform:uppercase">Day 28</span>
      <img src="${img("pouch.png")}" style="position:absolute;right:-30px;bottom:96px;width:280px;
        filter:drop-shadow(0 16px 26px rgba(0,0,0,.35))">
    </div>
  </div>
  <div style="flex:none;background:#fff;padding:22px 34px;display:flex;align-items:center;gap:20px">
    <span style="flex:none;width:44px;height:44px;border-radius:50%;background:${LIME};color:${INK};
      display:grid;place-items:center;font-size:24px;font-weight:800">&#10003;</span>
    <span class="d" style="font-size:38px;text-transform:uppercase">${a.dayLine}</span>
    <span style="margin-left:auto;font-size:24px;font-weight:700;color:#6B6B60">4 chews a day</span>
  </div>
  <div style="flex:none;height:16px;background:${DEEP}"></div>
</div>`);

/* ---------- format 4: clickbait headline, no product ---------- */
const fmtHeadline = (a) => shell(`
<img src="${img(a.before)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,18,15,.55) 0%,rgba(20,18,15,0) 34%,rgba(20,18,15,.9) 74%)"></div>
<div style="position:absolute;top:34px;left:34px;background:${RED};color:#fff;padding:10px 20px;
  border-radius:6px;font-size:24px;font-weight:800;letter-spacing:.12em;text-transform:uppercase">Health</div>
<div style="position:absolute;left:0;right:0;bottom:0;padding:0 44px 46px">
  <h1 class="d" style="color:#fff;font-size:64px;text-transform:uppercase;text-shadow:0 3px 18px rgba(0,0,0,.4)">${a.headline}</h1>
  <p style="color:#F0EDE6;font-size:29px;font-weight:600;margin-top:16px;line-height:1.3">${a.kicker}</p>
</div>`);

/* ---------- format 5: sticky note, product in view ---------- */
const fmtSticky = (a, deskFile) => shell(`
<img src="${img(deskFile)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
<div style="position:absolute;left:56px;top:92px;width:460px;height:460px;background:#FFE96B;
  transform:rotate(-5deg);box-shadow:0 20px 42px rgba(0,0,0,.26);padding:52px 46px;
  display:flex;flex-direction:column;gap:6px">
  <div style="font-family:Caveat,cursive;font-weight:700;font-size:76px;color:${DEEP};line-height:1">${a.sticky[0]}</div>
  ${a.sticky.slice(1).map((l) => `<div style="font-family:Caveat,cursive;font-weight:600;font-size:52px;color:#2B2718;line-height:1.18">${l}</div>`).join("")}
</div>`);

/* ---------- render ---------- */
const FORMATS = [
  ["chat", (a) => fmtChat(a)],
  ["before-after", (a) => fmtBA(a)],
  ["28-day", (a) => fmtChallenge(a)],
  ["headline", (a) => fmtHeadline(a)],
  ["sticky", (a, i) => fmtSticky(a, i % 2 ? "desk_b.webp" : "desk_a.webp")],
];

mkdirSync(OUT, { recursive: true });
mkdirSync(TMP, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE }, deviceScaleFactor: 2 });
let n = 0;
for (const [ai, a] of ANGLES.entries()) {
  for (const [fname, fn] of FORMATS) {
    const name = `${String(++n).padStart(2, "0")}-${a.key}-${fname}`;
    await page.setContent(fn(a, ai), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(320);
    const png = join(TMP, name + ".png");
    await page.screenshot({ path: png });
    execFileSync("cwebp", ["-q", "90", "-resize", "1080", "0", png, "-o", join(OUT, name + ".webp")], { stdio: "ignore" });
    console.log("rendered", name);
  }
}
await browser.close();
console.log("\n" + n + " creatives ->", OUT);
