/**
 * Every image the results plans page has a slot for, shot around the Anytime Calm tub.
 * Slot list read off components/quiz/PlansScreen.tsx and lib/quiz/stagingCarousel.ts:
 * a hero shot, three plan-card packs, an open pack, a powder macro, hand and lifestyle
 * shots, a gallery angle, four review portraits, four UGC shots, and the pillar scenes.
 *
 * ANYTHING WITH THE TUB IN IT IS AN EDIT OF calm-master.png, never a fresh generation.
 * Describing the pack again gets a different pack: the cream drifts, the cap changes,
 * the label rewrites itself. Editing one master keeps one product across twenty
 * photographs. Shots with no pack in them go through flux, which is a fraction of the
 * cost and cannot garble a label that is not there.
 *
 * Order matters: the master is generated first, then the review portraits, because the
 * UGC edits take a portrait AND the master as their two references.
 *
 * This is a POWDER, 28 servings with a scoop. Every gummy shot from the sister script
 * becomes a powder shot here.
 *
 *   FAL_KEY=... node scripts/build-anytime-calm-plans.mjs [name ...]
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY not set");
const DIR = process.env.OUT_DIR || path.join(os.homedir(), "Downloads/anytime-calm-plans");

/* ---- the master, the one gpt-image-2 call in the script ---------------------- */

const VESSEL =
  "a wide squat cylindrical paperboard supplement tub for powder, the proportions of a " +
  "protein or drink-mix tub: roughly as wide as it is tall, with a broad flat screw lid " +
  "that is the full diameter of the body. The tub is uncoated matte paper with a faint " +
  "fibrous texture and no gloss at all. The sides are perfectly straight with no taper. " +
  "There is a fine seam where the lid meets the body, and a subtle knurled grip texture " +
  "around the edge of the lid. The artwork is printed directly onto the paper, wrapping " +
  "the full body edge to edge, not applied as a separate glossy label panel.";

const CHERRY =
  "The paper is a warm pale cream. The accent band is a deep cherry red with cream " +
  "type; the product name and the dose callouts are the same cherry red, and the " +
  "remaining type is near-black. The lid is deep cherry red.";

/* sleep-01-edge, with the third active added to the dose row. The formula has three
   ingredients and a front panel naming two of them would be wrong on a real tub. */
const MASTER_LABEL = `
The label reads, from the top down:
- A narrow accent band across the shoulder of the tub with the words
  'NIGHTTIME CALM SUPPORT' in small caps on the left, and a small rounded pill on the
  right reading 'ZERO SUGAR'.
- The brand wordmark 'SUNNYCELLS' in clean bold sans-serif capitals.
- The product name on two lines: 'Anytime' and 'Calm' in a large bold sans-serif,
  with the second line in a lighter weight.
- Three dose callouts in one row, separated by thin vertical rules, each a number above
  a name: '3,000 mg' above 'GLYCINE', then '200 mg' above 'L-THEANINE', then '200 mg'
  above 'MAGNESIUM'.
- Small type reading 'DAILY SUPPORT FOR' above three stacked benefit lines:
  'Takes The Edge Off', 'Fall Asleep, Stay Asleep', 'Wake Up Actually Rested'.
- A flavour line reading 'Cherry Lime' beside a small pill reading 'FLAVOR'.
- Along the bottom, three items in a row: '28 SERVINGS', 'DIETARY SUPPLEMENT',
  'NON-GMO'.
Every word crisp, correctly spelled and perfectly legible. No other text anywhere, and
no certification badges or seals of any kind.`;

const MASTER_SHOT =
  "Shot straight on at eye level, the tub centred and upright and filling most of the " +
  "frame, on a plain very light warm-grey studio background with a soft contact shadow " +
  "beneath it. Even soft studio lighting, gentle highlight down one side of the " +
  "cylinder. High-end commercial e-commerce product photography, photorealistic, " +
  "ultra sharp, 8k.";

/* ---- shared language for the edits ------------------------------------------ */

const KEEP =
  "Keep the tub exactly as it is: the same warm pale cream paper body, the same deep " +
  "cherry red lid and shoulder band, and every word already printed on it unchanged, " +
  "correctly spelled and readable. Do not redesign the label, do not add or remove any " +
  "text.";

/* The powder, fixed once so it does not drift between shots. Cherry lime reads as a
   pink-red, not the brown a "cherry powder" prompt tends to return. */
const POWDER =
  "The powder is a fine loose drink mix in a soft dusty rose pink with a faint red " +
  "cast, the colour of freeze-dried cherry, not brown and not orange. It sits in soft " +
  "natural mounds, slightly uneven, not moulded or smoothed.";

const SCOOP =
  "The scoop is a plain small white plastic measuring scoop, the kind that ships inside " +
  "a drink-mix tub.";

const LOOK =
  "Natural soft daylight, shallow depth of field, warm neutral surfaces, nothing " +
  "styled into a set. Photorealistic, editorial product and lifestyle photography.";

/* This is a sleep product for women running on empty at the end of a long day, so the
   lifestyle shots sit in the evening rather than the bright kitchen mornings the
   cortisol set used. */
const EVENING =
  "Late evening, warm low lamplight, calm and quiet, the end of a long day.";

export const EDITS = [
  { name: "plans-pack-1", ar: "1:1",
    p: `${KEEP} Recompose as a clean straight-on e-commerce shot: one tub centred and upright on a plain warm white background with a soft contact shadow, filling most of the frame.` },
  { name: "plans-pack-3", ar: "1:1",
    p: `${KEEP} Recompose as three identical tubs standing in a row on a plain warm white background, the middle one square to camera and the outer two turned very slightly, overlapping a little. Soft contact shadows. No caption, no words anywhere in the image except what is printed on the tubs themselves.` },
  { name: "plans-pack-6", ar: "1:1",
    p: `${KEEP} Recompose as six identical tubs grouped into one tight cluster on a plain warm white background, arranged exactly like a hero group shot and NOT as an evenly spaced grid: three standing across the front and three behind them, the rows staggered so the back tubs peek between the front ones, every tub overlapping its neighbour, the front centre one square to camera with its label fully readable and the others turned very slightly. Shot at the same low eye level as a single-tub hero, so the group reads as one arrangement with depth rather than a product listing. Soft contact shadows pooling under the cluster. No caption, no words anywhere in the image except what is printed on the tubs themselves.` },
  { name: "plans-pack-open", ar: "1:1",
    p: `${KEEP} ${POWDER} ${SCOOP} Recompose with the tub STANDING UPRIGHT on its base, not tipped over and not lying on its side, open with no lid on it, its lid resting flat on the surface beside it, the pink powder visible filling the tub, and the white scoop resting in the powder. The tub stays square to camera with the full label readable. ${LOOK}` },
  { name: "plans-powder-macro", ar: "16:9",
    p: `${POWDER} An extreme macro photograph of a small mound of that loose pink drink powder on a warm cream surface, filling the frame, showing the fine grain of it. No hand, no scoop and no packaging anywhere in shot. ${LOOK}` },
  { name: "plans-scoop", ar: "4:3",
    p: `${KEEP} ${POWDER} ${SCOOP} Recompose as a hand holding the white scoop heaped with the pink powder, level with the camera, with the tub standing softly out of focus behind it on a kitchen counter. ${LOOK}` },
  { name: "plans-mixed-glass", ar: "4:3",
    p: `${KEEP} Recompose as a tall clear glass of the mixed drink on a kitchen counter beside the tub: the liquid is a clear bright cherry red, lightly fizzing, with ice and a wedge of lime on the rim. The tub stands behind it, label readable. ${EVENING} ${LOOK}` },
  { name: "plans-hold-hand", ar: "1:1",
    p: `${KEEP} Recompose as one hand holding the tub from the side against a plain warm background, so the size of the tub against the hand is obvious. ${LOOK}` },
  { name: "plans-hold-woman", ar: "4:3",
    p: `${KEEP} Recompose as a woman in her late thirties in her kitchen holding the tub at chest height in both hands, looking down at it with a relaxed, unposed expression. Real unretouched skin. ${EVENING} ${LOOK}` },
  { name: "plans-counter", ar: "16:9",
    p: `${KEEP} Recompose as the tub standing on a kitchen counter at night beside a glass of water and a folded tea towel, one warm lamp on, nobody in frame. ${EVENING} ${LOOK}` },
  { name: "plans-nightstand", ar: "4:3",
    p: `${KEEP} Recompose as the tub on a bedside table beside a lamp, a book and a glass of water, the bed softly out of focus behind it. ${EVENING} ${LOOK}` },
  { name: "plans-gallery-angle", ar: "1:1",
    p: `${KEEP} Recompose as a three-quarter view of one tub on a plain warm white background, turned enough to show the curve of the paper body and the seam where the lid meets it, label still readable. Soft contact shadow.` },
];

/**
 * UGC. Each one is a two-reference edit: the person from a review portrait and the tub
 * from the master, so the face holding the product is the same face that appears beside
 * the quote rather than a stranger.
 *
 * What makes these read as UGC is not the words "phone photo" but naming the defects:
 * the wrong light source, the crooked handheld angle, grain in the shadows, an ordinary
 * room nobody tidied. A polished version of this is just a stock photo.
 *
 * PLACEHOLDER PEOPLE. None of them exist. A generated face presented as a customer
 * holding the product is a testimonial, and the FTC rule on consumer reviews names
 * AI-generated endorsers directly. These are comps for layout only.
 */
const UGC =
  "Shot on a phone by the person themselves or a friend, not by a photographer. " +
  "Handheld and very slightly crooked, casual imperfect framing, mixed indoor light " +
  "from a window and a lamp, faint grain in the shadows, no filter, no retouching, no " +
  "studio lighting. Real unedited skin with pores and fine lines. An ordinary home " +
  "that nobody tidied for the photo.";

export const UGC_SHOTS = [
  /* First pass came back as a moody low-lit portrait with the tub barely visible. The
     fix is naming the light and the framing, not the mood: kitchen lights on, tub up by
     her face and square to the lens. */
  { name: "plans-ugc-1", ref: "plans-review-1.png",
    scene: "standing in her own kitchen with the overhead lights on, holding the tub up beside her face at head height and turned square to the lens so the whole front label is clearly visible, grinning at the camera, her other arm out of frame holding the phone" },
  { name: "plans-ugc-2", ref: "plans-review-2.png",
    scene: "sitting on the end of her bed at night in pyjamas, holding the tub in one hand and looking at the camera" },
  { name: "plans-ugc-3", ref: "plans-review-3.png",
    scene: "in her bathroom in front of the mirror at night, holding the tub beside her face, taking the photo herself" },
  { name: "plans-ugc-4", ref: "plans-review-4.png",
    scene: "on her sofa in the evening with a lamp on, holding the tub in her lap and smiling at the camera" },
];

/* No pack in frame, so these are generated rather than edited. The portraits run first
   because the UGC edits use them as a reference. */
export const FRESH = [
  { name: "plans-review-1", size: "square_hd",
    p: `A candid head and shoulders portrait of a woman in her late thirties with hair tied back, at home in the evening, warm lamplight, no makeup, real skin texture and fine lines. Photorealistic, no text.` },
  { name: "plans-review-2", size: "square_hd",
    p: `A candid head and shoulders portrait of a woman in her forties with shoulder-length brown hair, at home by a window in soft evening light, relaxed expression, real skin texture. Photorealistic, no text.` },
  { name: "plans-review-3", size: "square_hd",
    p: `A candid head and shoulders portrait of a woman in her thirties with dark curly hair, soft indoor light, warm genuine smile, real skin texture. Photorealistic, no text.` },
  { name: "plans-review-4", size: "square_hd",
    p: `A candid head and shoulders portrait of a woman in her fifties with short grey-streaked hair, at home, soft lamplight, calm expression, real skin texture. Photorealistic, no text.` },
  { name: "plans-cherries-lime", size: "landscape_16_9",
    p: `Fresh tart cherries with their stems on, deep red and glossy, scattered on a pale linen cloth with two lime halves beside them and one cherry cut open to show the flesh and stone. ${LOOK}` },
  { name: "plans-story", size: "portrait_4_3",
    p: `A relaxed candid portrait of a woman in her late thirties at home in the evening, no makeup, warm genuine half-smile, soft lamplight. Real unretouched skin with texture and fine lines. Photorealistic lifestyle portrait, no text.` },
  { name: "plans-wind-down", size: "landscape_4_3",
    p: `A woman in her late thirties sitting on her sofa late in the evening with one warm lamp on, holding a mug, shoulders down, calm and unhurried. Candid, unposed, real skin texture. Photorealistic.` },
  { name: "plans-sleep", size: "landscape_4_3",
    p: `A woman asleep on her side in soft white bedding in a dark bedroom, peaceful and still, faint cool light through the blinds. Calm and quiet, not staged. Photorealistic.` },
  { name: "plans-morning-rested", size: "landscape_4_3",
    p: `A woman in her late thirties sitting up on the edge of her bed in soft early morning light, stretching, looking genuinely rested rather than posed. Candid lifestyle photography, real skin texture, photorealistic.` },
  { name: "plans-wired-tired", size: "landscape_4_3",
    p: `A woman in her late thirties lying awake in bed at night, eyes open, one hand behind her head, faint light from a phone on the nightstand. Quiet and still, honest rather than dramatic. Photorealistic.` },
];

const auth = { Authorization: `Key ${KEY}`, "Content-Type": "application/json" };

/* fal 403s "Exhausted balance" intermittently on this account and a retry seconds later
   goes through, so a first 403 is never treated as fatal. */
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
  for (let i = 0; i < 240; i++) {
    await new Promise((s) => setTimeout(s, 2500));
    const st = await (await fetch(status_url, { headers: auth })).json();
    if (st.status === "COMPLETED") break;
    if (i === 239) throw new Error("timed out");
  }
  const o = await (await fetch(response_url, { headers: auth })).json();
  const u = o.images?.[0]?.url;
  if (!u) throw new Error(JSON.stringify(o).slice(0, 200));
  return Buffer.from(await (await fetch(u)).arrayBuffer());
}

for (const u of UGC_SHOTS) {
  EDITS.push({
    name: u.name, ar: "1:1", refs: [u.ref, "calm-master.png"],
    p: `Use the person from the first image and the product from the second image. Keep that person's face, hair, age and build exactly as they are, and keep the tub exactly as it is with every word on its label unchanged and readable. Recompose as a candid photograph of that same person ${u.scene}. ${UGC}`,
  });
}

const only = process.argv.slice(2);
const want = (n) => only.length === 0 || only.includes(n);
await mkdir(DIR, { recursive: true });
const asDataUri = async (f) =>
  `data:image/png;base64,${(await readFile(path.join(DIR, f))).toString("base64")}`;

if (want("calm-master")) {
  console.log("generating calm-master (gpt-image-2 high)...");
  const buf = await run("openai/gpt-image-2", {
    prompt: `Product mockup of ${VESSEL} ${CHERRY} ${MASTER_LABEL} ${MASTER_SHOT}`,
    image_size: "square_hd", num_images: 1, quality: "high", output_format: "png",
  });
  await writeFile(path.join(DIR, "calm-master.png"), buf);
  console.log("  -> calm-master.png");
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

for (const e of EDITS) {
  if (!want(e.name)) continue;
  const files = e.refs ?? ["calm-master.png"];
  console.log(`editing ${e.name} from ${files.join(" + ")}...`);
  const buf = await run("fal-ai/nano-banana/edit", {
    prompt: e.p, image_urls: await Promise.all(files.map(asDataUri)), num_images: 1, aspect_ratio: e.ar,
  });
  await writeFile(path.join(DIR, `${e.name}.png`), buf);
  console.log(`  -> ${e.name}.png`);
}
console.log(`done -> ${DIR}`);
