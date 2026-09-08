/**
 * Every image the diet results plans page has a slot for, shot around the
 * Cortisol Control canister. Read the slots off components/quiz/PlansScreen.tsx:
 * a hero product shot, three plan-card packs, three pillar illustrations, a headline
 * review portrait, four review avatars, ingredient panels, two how-it-works steps,
 * and the gallery.
 *
 * ANYTHING WITH THE CANISTER IN IT IS AN EDIT OF sun-02-marigold.png, never a fresh
 * generation. Describing the pack again gets a different pack: the yellow drifts, the
 * cap changes, the label rewrites itself. Editing the master keeps one product across
 * twenty photographs. Shots with no pack in them go through flux, which is a fraction
 * of the cost and cannot garble a label that is not there.
 *
 *   FAL_KEY=... node scripts/build-cortisol-plans-shots.mjs [name ...]
 *
 * Writes into the same folder as the mockups. Nothing is wired into the page.
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY not set");
const DIR = process.env.OUT_DIR || path.join(os.homedir(), "Downloads/cortisol-control");
const MASTER = path.join(DIR, "sun-02-marigold.png");

const KEEP =
  "Keep the canister exactly as it is: the same marigold yellow paper tube, the same " +
  "near-black cap, and every word already printed on it unchanged, correctly spelled " +
  "and readable. Do not redesign the label, do not add or remove any text.";

const LOOK =
  "Natural soft daylight, shallow depth of field, warm neutral surfaces, nothing " +
  "styled into a set. Photorealistic, editorial product and lifestyle photography.";

/* Edits of the master. `ar` is the shape the slot renders at. */
export const EDITS = [
  { name: "plans-pack-1", ar: "1:1",
    p: `${KEEP} Recompose as a clean straight-on e-commerce shot: one canister centred and upright on a plain warm white background with a soft contact shadow, filling most of the frame.` },
  { name: "plans-pack-3", ar: "1:1",
    p: `${KEEP} Recompose as three identical canisters standing in a row on a plain warm white background, the middle one square to camera and the outer two turned very slightly, overlapping a little. Soft contact shadows. No caption, no words anywhere in the image except what is printed on the canisters themselves.` },
  { name: "plans-pack-6", ar: "1:1",
    p: `${KEEP} Recompose as six identical canisters on a plain warm white background, arranged as a back row of three and a front row of three, the front centre one square to camera with its label fully readable. Soft contact shadows. No caption, no words anywhere in the image except what is printed on the canisters themselves.` },
  { name: "plans-pack-open", ar: "1:1",
    p: `${KEEP} Recompose with the canister open, its cap resting beside it, and a scatter of deep tart-cherry red gummies spilling from the mouth onto a warm cream surface. ${LOOK}` },
  { name: "plans-hold-hand", ar: "1:1",
    p: `${KEEP} Recompose as one hand holding the canister upright from the side against a plain warm background, so the size of the tube against the hand is obvious. ${LOOK}` },
  { name: "plans-hold-woman", ar: "4:3",
    p: `${KEEP} Recompose as a woman in her forties in a bright kitchen holding the canister at chest height in both hands, looking down at it with a relaxed, unposed expression. Real unretouched skin. ${LOOK}` },
  { name: "plans-palm-gummies", ar: "4:3",
    p: `${KEEP} Recompose as an open palm holding two deep tart-cherry red gummies, with the canister standing softly out of focus behind it on a kitchen counter. ${LOOK}` },
  { name: "plans-counter", ar: "16:9",
    p: `${KEEP} Recompose as the canister standing on a sunlit kitchen counter beside a cup of coffee and a glass of water, morning light falling across pale stone, nobody in frame. ${LOOK}` },
  { name: "plans-bag", ar: "4:3",
    p: `${KEEP} Recompose as the canister tucked into an open canvas tote on a hallway bench beside keys and sunglasses, shot from above. ${LOOK}` },
  { name: "plans-gallery-angle", ar: "1:1",
    p: `${KEEP} Recompose as a three-quarter view of one canister on a plain warm white background, turned enough to show the curve of the paper tube and the seam where the cap meets it, label still readable. Soft contact shadow.` },
];

/* No pack in frame, so these are generated rather than edited. */
export const FRESH = [
  { name: "plans-gummies-macro", size: "landscape_16_9",
    p: `An extreme macro photograph of deep tart-cherry red soft gummies on a warm cream surface, sugar-free matte finish, their translucent edges catching the light. ${LOOK}` },
  { name: "plans-tart-cherries", size: "landscape_16_9",
    p: `Fresh tart cherries with their stems on, deep red and glossy, scattered on a pale linen cloth with one cut in half to show the flesh and stone. ${LOOK}` },
  { name: "plans-story", size: "portrait_4_3",
    p: `A relaxed candid portrait of a woman in her forties at home by a window, no makeup, warm genuine half-smile, soft daylight. Real unretouched skin with texture and fine lines. Photorealistic lifestyle portrait, no text.` },
  { name: "plans-calm-desk", size: "landscape_4_3",
    p: `A woman in her late thirties at a tidy home desk mid-afternoon, sitting back from her laptop looking calm and unhurried, warm daylight from a window. Candid, unposed, real skin texture. Photorealistic.` },
  { name: "plans-sleep", size: "landscape_4_3",
    p: `A woman asleep on her side in soft white bedding in a dark bedroom, peaceful and still, faint cool light through the blinds. Calm and quiet, not staged. Photorealistic.` },
  { name: "plans-active", size: "landscape_4_3",
    p: `A woman in her forties walking briskly on a tree-lined path in morning light, relaxed and energetic, shot from the side with the background thrown out of focus. Candid lifestyle photography, photorealistic.` },
  { name: "plans-review-1", size: "square_hd",
    p: `A candid head and shoulders portrait of a woman in her fifties with grey-streaked hair, at home, warm natural light, no makeup, real skin texture. Photorealistic, no text.` },
  { name: "plans-review-2", size: "square_hd",
    p: `A candid head and shoulders portrait of a man in his forties with a short beard, at home by a window, natural light, relaxed expression. Photorealistic, no text.` },
  { name: "plans-review-3", size: "square_hd",
    p: `A candid head and shoulders portrait of a woman in her thirties with dark curly hair, soft daylight, warm genuine smile, real skin texture. Photorealistic, no text.` },
  { name: "plans-review-4", size: "square_hd",
    p: `A candid head and shoulders portrait of a woman in her sixties with short silver hair, at home, soft daylight, calm expression, real skin texture. Photorealistic, no text.` },
];

const auth = { Authorization: `Key ${KEY}`, "Content-Type": "application/json" };

async function post(url, body, tries = 8) {
  for (let i = 0; i < tries; i++) {
    const r = await fetch(url, { method: "POST", headers: auth, body: JSON.stringify(body) });
    if (r.ok) return r.json();
    const t = await r.text();
    if (r.status !== 403 || i === tries - 1) throw new Error(`${r.status} ${t}`);
    console.log(`  locked, retrying in ${5 * (i + 1)}s`);
    await new Promise((s) => setTimeout(s, 5000 * (i + 1)));
  }
}

async function run(model, body) {
  const { status_url, response_url } = await post(`https://queue.fal.run/${model}`, body);
  for (let i = 0; i < 200; i++) {
    await new Promise((s) => setTimeout(s, 2500));
    const st = await (await fetch(status_url, { headers: auth })).json();
    if (st.status === "COMPLETED") break;
    if (i === 199) throw new Error("timed out");
  }
  const o = await (await fetch(response_url, { headers: auth })).json();
  const u = o.images?.[0]?.url;
  if (!u) throw new Error(JSON.stringify(o).slice(0, 200));
  return Buffer.from(await (await fetch(u)).arrayBuffer());
}

const only = process.argv.slice(2);
const want = (n) => only.length === 0 || only.includes(n);
await mkdir(DIR, { recursive: true });
const b64 = (await readFile(MASTER)).toString("base64");

for (const e of EDITS) {
  if (!want(e.name)) continue;
  console.log(`editing ${e.name} from the marigold master...`);
  const buf = await run("fal-ai/nano-banana/edit", {
    prompt: e.p, image_urls: [`data:image/png;base64,${b64}`], num_images: 1, aspect_ratio: e.ar,
  });
  await writeFile(path.join(DIR, `${e.name}.png`), buf);
  console.log(`  -> ${e.name}.png`);
}
for (const f of FRESH) {
  if (!want(f.name)) continue;
  console.log(`generating ${f.name}...`);
  const buf = await run("fal-ai/flux/dev", {
    prompt: f.p, image_size: f.size, num_images: 1, num_inference_steps: 34,
  });
  await writeFile(path.join(DIR, `${f.name}.png`), buf);
  console.log(`  -> ${f.name}.png`);
}
console.log("done");
