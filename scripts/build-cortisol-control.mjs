/**
 * "Cortisol Control" bottle mockups, five colourways.
 *
 * The layout is held constant and only the colourway and finish change, so the five
 * are a choice of look rather than five different products. It follows the reference
 * humann bottle beat for beat: accent band across the shoulder, brand wordmark, the
 * product name in two weights, a benefit stack under a small "daily support for", a
 * flavour line, and a count row along the bottom.
 *
 * gpt-image-2 at quality "high", because the whole point of the shot is the label and
 * flux garbles lettering at that size. Every string that has to appear is spelled out
 * in the prompt rather than described.
 *
 * NO CERTIFICATION BADGE. The reference carries an NSF Certified Sport mark. That is a
 * real certification belonging to NSF, and putting it on a SUNNYCELLS bottle would be
 * claiming a certification this product does not hold, so the badge is left off rather
 * than faked. If the product ever earns one, add it here.
 *
 *   FAL_KEY=... node scripts/build-cortisol-control.mjs [name ...]
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY not set");
const OUT = process.env.OUT_DIR || path.join(os.homedir(), "Downloads/cortisol-control");

/* The copy on the label, identical across all five. Written out literally: describing
   it ("benefit bullets") gets invented words back. */
const LABEL = `
The label reads, from the top down:
- A narrow accent band across the shoulder of the bottle with the words
  'STRESS HORMONE SUPPORT' in small caps on the left, and a small rounded pill on the
  right reading 'ZERO SUGAR'.
- The brand wordmark 'SUNNYCELLS' in clean bold sans-serif capitals.
- The product name on two lines: 'Cortisol' and 'Control' in a large bold sans-serif,
  with the second line in a lighter weight.
- A small rounded pill reading 'Zero Sugar'.
- Small type reading 'DAILY SUPPORT FOR' above three stacked benefit lines:
  'Healthy Cortisol Response', 'Calm Focus Without Jitters', 'Deep Restorative Sleep'.
- A flavour line reading 'Tart Cherry' beside a small pill reading 'FLAVOR'.
- Along the bottom, three items in a row: '60 GUMMIES', 'DIETARY SUPPLEMENT', 'NON-GMO'.
Every word crisp, correctly spelled and perfectly legible. No other text anywhere, and
no certification badges or seals of any kind.`;

const SHOT =
  "Shot straight on at eye level, the bottle centred and upright and filling most of " +
  "the frame, on a plain very light warm-grey studio background with a soft contact " +
  "shadow beneath it. Even soft studio lighting, gentle highlight down one side of the " +
  "cylinder. High-end commercial e-commerce product photography, photorealistic, " +
  "ultra sharp, 8k.";

export const VARIANTS = [
  {
    name: "01-emerald",
    body: "a deep emerald green opaque cylindrical supplement bottle with a matching " +
      "deep emerald screw cap, matte finish. The accent band is warm cream and its type " +
      "is deep green; all other label type is white.",
  },
  {
    name: "02-sun",
    body: "a warm golden-yellow opaque cylindrical supplement bottle with a matching " +
      "golden-yellow screw cap, matte finish. The accent band is deep charcoal ink with " +
      "cream type; all other label type is deep charcoal ink.",
  },
  {
    name: "03-indigo",
    body: "a deep indigo navy opaque cylindrical supplement bottle with a matching navy " +
      "screw cap, soft-touch matte finish. The accent band is warm gold with navy type; " +
      "all other label type is white.",
  },
  {
    name: "04-terracotta",
    body: "a warm terracotta clay-red opaque cylindrical supplement bottle with a " +
      "matching terracotta screw cap, matte finish. The accent band is soft cream with " +
      "terracotta type; all other label type is cream white.",
  },
  {
    name: "05-sage",
    body: "a soft pale sage-green opaque cylindrical supplement bottle with a deep " +
      "forest green screw cap, matte finish. The accent band is deep forest green with " +
      "pale type; all other label type is deep forest green.",
  },
];

const auth = { Authorization: `Key ${KEY}`, "Content-Type": "application/json" };

/* fal 403s "Exhausted balance" intermittently on this account and a retry seconds
   later goes through, so a first 403 is never treated as fatal. */
async function post(url, body, tries = 8) {
  for (let i = 0; i < tries; i++) {
    const r = await fetch(url, { method: "POST", headers: auth, body: JSON.stringify(body) });
    if (r.ok) return r.json();
    const text = await r.text();
    if (r.status !== 403 || i === tries - 1) throw new Error(`${r.status} ${text}`);
    console.log(`  locked, retrying in ${5 * (i + 1)}s`);
    await new Promise((s) => setTimeout(s, 5000 * (i + 1)));
  }
}

async function run(prompt) {
  const { status_url, response_url } = await post("https://queue.fal.run/openai/gpt-image-2", {
    prompt, image_size: "square_hd", num_images: 1, quality: "high", output_format: "png",
  });
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
await mkdir(OUT, { recursive: true });
for (const v of VARIANTS) {
  if (only.length && !only.includes(v.name)) continue;
  console.log(`generating ${v.name}...`);
  const buf = await run(`Product mockup of ${v.body} ${LABEL} ${SHOT}`);
  await writeFile(path.join(OUT, `${v.name}.png`), buf);
  console.log(`  -> ${v.name}.png (${(buf.length / 1024).toFixed(0)} kB)`);
}
console.log("done");
