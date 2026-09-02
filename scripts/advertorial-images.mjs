/**
 * Regenerates the eight photographs on /advertorials/cortisol-collagen-matrix.
 *
 * The originals were generated from the prompts supplied with the brief, which asked
 * for studio and editorial photography ("8k", "high-end beauty brand photography",
 * "cinematic lighting", "luxury product photography"). They came back looking like
 * stock, which is the wrong register for an advertorial: the reader is meant to take
 * it for something a person actually photographed.
 *
 * These are the same eight shots rewritten as iPhone snapshots. What does the work is
 * not the words "shot on iPhone" (the original sign-1 prompt already had them and
 * still came back polished) but naming the specific defects: the wrong light source,
 * the crooked handheld angle, the grain in the shadows, the clutter that a stylist
 * would have removed, the skin nobody retouched.
 *
 * The two product shots are EDITED rather than regenerated. Generated lettering
 * garbles reliably, and the existing jar already carries a clean SUNNYCELLS YOUTH
 * MATRIX label, so nano-banana restyles the photography around it and leaves the
 * label alone. Same pipeline the Revitalize shots use.
 *
 *   FAL_KEY=... OUT_DIR=/tmp/shots node scripts/advertorial-images.mjs [name ...]
 *
 * Writes PNGs to OUT_DIR and leaves public/ untouched: converting to webp and swapping
 * the files in is a separate deliberate step.
 *
 * CAUTION on re-running the product edits. product-reveal sources from the file now in
 * public/, which has already been through this pass once. Running it again restyles an
 * already-restyled photo and drifts further from the original studio frame each time.
 * If you need to start over, take the source from git history rather than from public/.
 */

import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY not set");

const OUT = process.env.OUT_DIR || "/tmp/advertorial-images";
const PUB = "public/advertorials/cortisol-collagen-matrix";

/* Appended to every from-scratch prompt. Held in one place so the eight shots read as
   one person's camera roll rather than eight different cameras. */
const PHONE =
  "Shot on an iPhone by an ordinary person, not a photographer. Handheld and slightly " +
  "crooked, imperfect casual framing, visible digital noise in the shadows, mild " +
  "over-sharpening from phone processing, no filter, no retouching, no studio " +
  "lighting, no professional colour grading. Real unedited skin with pores, fine " +
  "hairs and uneven tone.";

/* nano-banana drifts wide unless the crop is pinned. */
const KEEP =
  "Keep the existing framing and crop: the product must stay the same size in the " +
  "frame and stay in sharp focus with its label facing the camera and readable. Do " +
  "not zoom out, do not move the product further away, do not shrink it. ";

export const SHOTS = [
  {
    name: "hero-header",
    size: "landscape_16_9",
    prompt:
      "A before-and-after comparison image split down the middle by a hard vertical " +
      "white dividing line, two clearly different photographs of the same 38-year-old " +
      "woman. LEFT HALF, the before: puffy swollen face, heavy bags and fluid under both " +
      "eyes, soft undefined jawline, dull grey blotchy complexion, greasy flat hair, " +
      "exhausted defeated expression, sickly green overhead bathroom bulb. RIGHT HALF, " +
      "the after: the same woman visibly transformed, face slimmer and drained of fluid, " +
      "sharp defined jawline, no under-eye bags, clear even skin, hair clean, small " +
      "genuine smile, warm daylight from a window. The two halves must look obviously " +
      "different from each other. " + PHONE,
  },
  {
    name: "sign-1-puffiness",
    size: "landscape_4_3",
    prompt:
      "An unposed photo of a 35-year-old woman in a worn dressing gown at her bathroom " +
      "mirror first thing in the morning. Hair flat and messy, no makeup, pressing two " +
      "fingers under a swollen eye, tired and irritated. Cluttered counter with " +
      "toothpaste, a hairbrush and a used glass. Harsh overhead bathroom light, slight " +
      "motion blur, mirror smudges. An ordinary small bathroom, not a showroom. " + PHONE,
  },
  {
    name: "sign-2-elasticity",
    size: "landscape_4_3",
    prompt:
      "A very close macro photo of a 45-year-old woman gripping a fold of the skin on " +
      "her own cheek between her thumb and forefinger and pulling it away from her face, " +
      "so the skin is visibly tented and pinched up into a ridge. The pinched fold is " +
      "crepey and crinkled, gathered into fine dehydration lines across the fold, thin " +
      "and slow to spring back. Smooth clear complexion elsewhere, just weathered and " +
      "dry: visible pores, faint peach fuzz, a little sun damage, no makeup. " +
      "Ordinary window daylight in a home. Focus is slightly soft at the edges because " +
      "the phone is struggling to focus this close. " + PHONE,
  },
  {
    name: "sign-3-wakeup",
    size: "landscape_4_3",
    prompt:
      "A grainy photo taken in a dark bedroom in the middle of the night, lit only by a " +
      "phone screen and a sliver of streetlight through the blinds. A 36-year-old woman " +
      "on rumpled sheets, hair everywhere, wide awake with a flat exhausted stare, " +
      "holding up a phone reading 3:14. Heavy noise in the shadows, blown-out highlights " +
      "where the screen hits her face, a cluttered nightstand. " + PHONE,
  },
  {
    name: "sign-4-barrier",
    size: "landscape_4_3",
    prompt:
      "A close-up photo a woman took of one side of her own chin and jaw to check on a " +
      "small irritated patch. MOSTLY NORMAL HEALTHY SKIN with a mild localised problem: " +
      "a soft diffuse patch of pink irritation along the jaw, two or three small ordinary " +
      "spots near the corner of the mouth, and a little dry flakiness beside the nostril. " +
      "Subtle and everyday, the kind of thing you only notice up close. Not acne, not a " +
      "rash, no widespread red bumps, no inflammation across the face. Plain bathroom " +
      "light, no makeup, slight camera shake. " + PHONE,
  },
  {
    name: "sign-5-vanity",
    size: "landscape_4_3",
    prompt:
      "A casual overhead photo of a real bathroom counter cluttered with half-used " +
      "skincare: expensive glass serum bottles with their labels turned at angles, a jar " +
      "with the lid off beside it, a pump bottle missing its cap, a hair tie, a used " +
      "cotton pad, water rings and toothpaste flecks on the counter. Mixed light from an " +
      "overhead bulb and a window, and the shadow of the person holding the phone falls " +
      "across one corner. Nothing arranged or styled. " + PHONE,
  },
];

/* Edited, not regenerated: the label has to survive. */
export const EDITS = [
  {
    name: "product-reveal",
    from: `${PUB}/product-reveal.webp`,
    prompt:
      "Restyle this into a casual snapshot a customer took at home on an iPhone. Keep " +
      "the jar, the gummies and every word on the label exactly as they are. " + KEEP +
      "Change only the photography: an ordinary bathroom or kitchen counter instead of a studio set, " +
      "mixed indoor lighting with a slightly warm uneven cast, faint camera grain, a " +
      "slightly crooked handheld angle, shallow imperfect focus, a couple of water marks " +
      "on the surface. Remove the studio lighting, the mirror-clean reflections and the " +
      "professional gloss. Unedited phone photo.",
  },
  {
    name: "refill-vessel",
    /* Chained off the product-reveal output: see the note above. */
    from: `${OUT}/product-reveal.png`,
    prompt:
      "Add a plain kraft-paper refill pouch standing upright behind and just to the left " +
      "of the jar, leaning against it. Keep the jar exactly as it is, in the same place " +
      "and at the same size, and keep every word already printed on its label unchanged " +
      "and readable. Do not add, invent or alter any text on the jar, and leave the " +
      "refill pouch blank and unlabelled. Remove the loose gummies from the counter. " +
      "Everything else about the photograph stays as it is: the same home counter, the " +
      "same ordinary indoor light, the same casual handheld phone-snapshot look.",
  },
];

const auth = { Authorization: `Key ${KEY}`, "Content-Type": "application/json" };

/* Submit is /fal-ai/flux/dev; status and result hang off /fal-ai/flux. Rebuilding
   those URLs by hand gets it wrong, so use the ones the submit call hands back. */
async function run(model, body) {
  const r = await fetch(`https://queue.fal.run/${model}`, {
    method: "POST", headers: auth, body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`submit ${model}: ${r.status} ${await r.text()}`);
  const { status_url, response_url } = await r.json();
  for (let i = 0; i < 120; i++) {
    await new Promise((s) => setTimeout(s, 2500));
    const st = await (await fetch(status_url, { headers: auth })).json();
    if (st.status === "COMPLETED") break;
    if (i === 119) throw new Error("timed out");
  }
  const out = await (await fetch(response_url, { headers: auth })).json();
  const url = out.images?.[0]?.url;
  if (!url) throw new Error(`no image: ${JSON.stringify(out).slice(0, 300)}`);
  return url;
}

async function save(name, url) {
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  const file = path.join(OUT, `${name}.png`);
  await writeFile(file, buf);
  console.log(`  ${name} -> ${file} (${(buf.length / 1024).toFixed(0)} kB)`);
}

/* Optional: name one or more shots to regenerate just those. */
const only = process.argv.slice(2);
const want = (n) => only.length === 0 || only.includes(n);

await mkdir(OUT, { recursive: true });

for (const s of SHOTS) {
  if (!want(s.name)) continue;
  console.log(`generating ${s.name}...`);
  await save(s.name, await run("fal-ai/flux/dev", {
    prompt: s.prompt, image_size: s.size, num_images: 1, enable_safety_checker: false,
  }));
}

for (const e of EDITS) {
  if (!want(e.name)) continue;
  console.log(`editing ${e.name}...`);
  const b64 = (await readFile(e.from)).toString("base64");
  await save(e.name, await run("fal-ai/nano-banana/edit", {
    prompt: e.prompt, image_urls: [`data:image/webp;base64,${b64}`], num_images: 1,
  }));
}
console.log("done");
