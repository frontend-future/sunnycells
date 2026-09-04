/**
 * Photography for /lander/beetroot, replacing the design's placeholder boxes.
 *
 * Two rules this project has learned the hard way and this script follows:
 *
 *   1. ANYTHING WITH LEGIBLE TYPE GOES THROUGH gpt-image-2 AT quality:"high".
 *      flux garbles lettering at label size, reliably. That is the master pouch.
 *   2. EVERY OTHER POUCH SHOT IS AN EDIT OF THE MASTER, not a fresh generation, so
 *      the pack is the same pack in all of them. Describing a pouch in a prompt six
 *      times gets six different products.
 *
 * The supplement facts panel is not here at all: it is built from HTML by
 * scripts/build-beetroot-facts.mjs, because a generated nutrition panel is both
 * garbled and, if it were legible, a fabricated label.
 *
 *   FAL_KEY=... node scripts/build-beetroot-shots.mjs [name ...]
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY not set");
const OUT = "public/lander/beetroot";
const RAW = ".beetroot-raw";

/* The lander's own palette, so the product belongs to the page it sits on. */
const PACK =
  "a matte cream stand-up pouch with a deep navy blue band across the top and a plum " +
  "burgundy accent stripe, reading 'SUNNYCELLS' in small navy capitals above " +
  "'BEETROOT+' in large bold navy letters, with 'CHEWS' beneath in smaller plum " +
  "capitals. Along the bottom, small type reading 'DIETARY SUPPLEMENT' above " +
  "'56 CHEWS · 28 SERVINGS'. Crisp, correctly spelled, perfectly legible lettering. " +
  "The count has to read 56 chews and 28 servings: the page says 28 servings at two " +
  "chews a day, and a pack that says anything else contradicts its own lander.";

const CHEWS =
  "deep beet-red soft chews, each a small smooth rounded square with a matte " +
  "sugar-dusted finish";

const LOOK =
  "Natural daylight, soft shadows, shallow depth of field, warm cream and stone " +
  "surfaces. Clean modern wellness brand photography, photorealistic, ultra detailed.";

/* Generated fresh: none of these carry the pack, so none of them can garble a label. */
export const FLUX = [
  { name: "chew-macro", size: "square_hd",
    prompt: `An extreme macro photograph of one single ${CHEWS}, filling the frame on a pale travertine surface, its texture and slightly translucent edge visible. ${LOOK}` },
  { name: "thumb-chews", size: "square_hd",
    prompt: `A small pile of ${CHEWS} spilled loose across a pale cream surface, shot from just above, some overlapping. ${LOOK}` },
  { name: "thumb-run", size: "square_hd",
    prompt: `A woman in her forties in running kit on a tree-lined path early in the morning, mid-stride, relaxed and strong, shot from the side with the background thrown out of focus. Warm low sun. Candid lifestyle photography, photorealistic, natural skin texture.` },
  { name: "morning-routine", size: "landscape_4_3",
    prompt: `A bright uncluttered kitchen counter in the morning: a cup of coffee, a glass of water and a pair of reading glasses beside a folded newspaper, warm sunlight falling across pale stone. Nobody in frame. ${LOOK}` },
  { name: "customer-portrait", size: "portrait_4_3",
    prompt: `A relaxed candid portrait of a woman in her fifties at home by a window, natural grey-streaked hair, no makeup, warm genuine half-smile, soft daylight. Real unretouched skin with texture and fine lines. Photorealistic lifestyle portrait, no text.` },
  { name: "why-1-nitrates", size: "portrait_4_3",
    prompt: `Fresh whole beetroots with their stems and leaves still on, deep purple-red, on a pale linen cloth, one cut in half to show the concentric rings inside. ${LOOK}` },
  { name: "why-2-gap", size: "portrait_4_3",
    prompt: `A wooden chopping board stained deep magenta with beet juice, a knife and a half-chopped beetroot on it, a little mess around the edges. The awkward reality of preparing beets. ${LOOK}` },
  { name: "why-3-solution", size: "portrait_4_3",
    prompt: `Two ${CHEWS} resting in an open upturned palm, shot close, warm daylight, a plain soft background. ${LOOK}` },
];

/* The four free-gift tiles. Small slots, so these are shot flat and simple: at 66px
   tall anything busy turns to mush. */
export const GIFT_SHOTS = [
  { name: "gift-guide", size: "square_hd",
    prompt: `A slim printed booklet lying flat on a pale cream surface, plain navy cover with no readable text, shot straight down, soft daylight. Minimal, clean, photorealistic. ${LOOK}` },
  { name: "gift-shipping", size: "square_hd",
    prompt: `A small plain kraft cardboard shipping box, closed and taped, on a pale cream surface, shot from a low three-quarter angle. No text or labels on it. Minimal, clean, photorealistic. ${LOOK}` },
  { name: "gift-mystery", size: "square_hd",
    prompt: `A small gift box wrapped in plain plum-burgundy paper with a simple cream ribbon, on a pale cream surface. No text. Minimal, clean, photorealistic. ${LOOK}` },
  { name: "gift-giveaway", size: "square_hd",
    prompt: `A plain cream envelope with a navy wax seal resting on a pale stone surface, shot straight down. No text or writing on it. Minimal, clean, photorealistic. ${LOOK}` },
];

/* Master first, then everything that carries the pack is an edit of it. */
export const MASTER = {
  name: "hero",
  size: "landscape_4_3",
  prompt: `High-end commercial hero product photography of ${PACK} The pouch stands upright on a pale cream surface with a scattering of ${CHEWS} in front of it and a few fresh beetroots softly out of focus behind. ${LOOK}`,
};

export const EDITS = [
  { name: "thumb-front", size: "1:1",
    prompt: "Recompose as a straight-on square product shot: the pouch centred and upright, filling most of the frame, label flat to the camera and every word on it readable and unchanged. Plain pale cream background, no beetroots, no loose chews. Keep the pouch design exactly as it is." },
  { name: "hand-tearing", size: "3:4",
    prompt: "Recompose as a vertical lifestyle shot: a woman's hands holding the same pouch at chest height and pinching the resealable strip open, in a bright kitchen. Keep the pouch design and every word on the label exactly as they are and keep the label readable. Natural daylight, shallow depth of field." },
  { name: "thumb-hand", size: "1:1",
    prompt: "Recompose as a square shot showing scale: one hand holding the same pouch upright from the side, so the size of the pack against the hand is obvious. Plain pale background. Keep the pouch design and every word on the label exactly as they are." },
  { name: "three-pouches", size: "16:9",
    prompt: "Recompose as a wide shot of three of the same pouches standing in a row at slight angles to each other on a pale cream surface, overlapping a little, the front one square to the camera with its label readable. Keep the pouch design and every word on the labels exactly as they are. No loose chews." },
  { name: "pouch-trio", size: "16:9",
    prompt: "Recompose as a wide shot of three of the same pouches grouped closely on a warm blush-pink surface, one lying flat in front of two standing behind, soft daylight. Keep the pouch design and every word on the labels exactly as they are." },
];

const auth = { Authorization: `Key ${KEY}`, "Content-Type": "application/json" };

/* fal returns 403 "Exhausted balance" intermittently on this account; a retry seconds
   later goes through. Never treat the first one as fatal. */
async function post(url, body, tries = 8) {
  for (let i = 0; i < tries; i++) {
    const r = await fetch(url, { method: "POST", headers: auth, body: JSON.stringify(body) });
    if (r.ok) return r.json();
    const text = await r.text();
    if (r.status !== 403 || i === tries - 1) throw new Error(`${r.status} ${text}`);
    const wait = 5000 * (i + 1);
    console.log(`  locked, retrying in ${wait / 1000}s`);
    await new Promise((s) => setTimeout(s, wait));
  }
}

async function poll(model, body) {
  const { status_url, response_url } = await post(`https://queue.fal.run/${model}`, body);
  for (let i = 0; i < 160; i++) {
    await new Promise((s) => setTimeout(s, 2500));
    const st = await (await fetch(status_url, { headers: auth })).json();
    if (st.status === "COMPLETED") break;
    if (i === 159) throw new Error("timed out");
  }
  const o = await (await fetch(response_url, { headers: auth })).json();
  const u = o.images?.[0]?.url;
  if (!u) throw new Error(JSON.stringify(o).slice(0, 200));
  return Buffer.from(await (await fetch(u)).arrayBuffer());
}

async function save(name, buf, width) {
  await mkdir(RAW, { recursive: true });
  await mkdir(OUT, { recursive: true });
  const png = path.join(RAW, `${name}.png`);
  await writeFile(png, buf);
  execFileSync("cwebp", ["-quiet", "-q", "86", "-resize", String(width), "0", png, "-o", path.join(OUT, `${name}.webp`)]);
  console.log(`  -> ${name}.webp`);
}

const only = process.argv.slice(2);
const want = (n) => only.length === 0 || only.includes(n);

if (want(MASTER.name)) {
  console.log(`generating ${MASTER.name} (gpt-image-2 high, the label has to be readable)...`);
  await save(MASTER.name, await poll("openai/gpt-image-2", {
    prompt: MASTER.prompt, image_size: MASTER.size, num_images: 1, quality: "high", output_format: "png",
  }), 1400);
}

for (const f of [...FLUX, ...GIFT_SHOTS]) {
  if (!want(f.name)) continue;
  console.log(`generating ${f.name}...`);
  await save(f.name, await poll("fal-ai/flux/dev", {
    prompt: f.prompt, image_size: f.size, num_images: 1, num_inference_steps: 34,
  }), 1000);
}

for (const e of EDITS) {
  if (!want(e.name)) continue;
  const src = path.join(OUT, "hero.webp");
  if (!existsSync(src)) throw new Error("run the master (hero) first: every pack shot is an edit of it");
  console.log(`editing ${e.name} from the master...`);
  const b64 = (await readFile(src)).toString("base64");
  await save(e.name, await poll("fal-ai/nano-banana/edit", {
    prompt: e.prompt, image_urls: [`data:image/webp;base64,${b64}`], num_images: 1, aspect_ratio: e.size,
  }), 1000);
}
console.log("done");
