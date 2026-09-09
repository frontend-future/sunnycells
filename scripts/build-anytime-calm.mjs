/**
 * "Anytime Calm" powder tub mockups, five colourways.
 *
 * Same paper finish, shot and label architecture as build-cortisol-control.mjs so the
 * two read as one line, but the vessel is a tub rather than a tall canister: this is a
 * 28 serving powder, not chews, so it is squat and wide with a large flat lid.
 *
 * The two doses are printed on the front because that is the brand's habit and it is
 * the only claim on the label that is checkable.
 *
 * gpt-image-2 at quality "high": the whole point of the shot is the label, and the
 * cheaper tiers garble lettering at this size. Every string is spelled out literally
 * rather than described, because describing it gets invented words back.
 *
 * NO CERTIFICATION BADGES. Same reason as the sister script: a seal on the tube would
 * claim a certification this product does not hold.
 *
 *   FAL_KEY=... node scripts/build-anytime-calm.mjs [name ...]
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY not set");
const OUT = process.env.OUT_DIR || path.join(os.homedir(), "Downloads/anytime-calm-sleep");

/* The label, with the shoulder band and the three benefit lines left open so a copy
   variant can fill them. Everything else is fixed, so the five read as one product with
   five wordings rather than five products. */
const label = (v) => `
The label reads, from the top down:
- A narrow accent band across the shoulder of the tub with the words
  '${v.band}' in small caps on the left, and a small rounded pill on the
  right reading 'ZERO SUGAR'.
- The brand wordmark 'SUNNYCELLS' in clean bold sans-serif capitals.
- The product name on two lines: 'Anytime' and 'Calm' in a large bold sans-serif,
  with the second line in a lighter weight.
- Two dose callouts side by side, each a number above a name:
  '3,000 mg' above 'GLYCINE', and '200 mg' above 'L-THEANINE'.
- Small type reading '${v.kicker}' above three stacked benefit lines:
  '${v.lines[0]}', '${v.lines[1]}', '${v.lines[2]}'.
- A flavour line reading 'Cherry Lime' beside a small pill reading 'FLAVOR'.
- Along the bottom, three items in a row: '28 SERVINGS', 'DIETARY SUPPLEMENT',
  'NON-GMO'.
Every word crisp, correctly spelled and perfectly legible. No other text anywhere, and
no certification badges or seals of any kind.`

/* A tub, not the tall canister the sister product uses. Squat and wide, with a large
   flat lid the full diameter of the body. Saying "canister" or "bottle" here returns a
   tall slim tube, which is the wrong vessel for a 28 serving powder. */
const VESSEL =
  "a wide squat cylindrical paperboard supplement tub for powder, the proportions of a " +
  "protein or drink-mix tub: roughly as wide as it is tall, with a broad flat screw lid " +
  "that is the full diameter of the body. The tub is uncoated matte paper with a faint " +
  "fibrous texture and no gloss at all. The sides are perfectly straight with no taper. " +
  "There is a fine seam where the lid meets the body, and a subtle knurled grip texture " +
  "around the edge of the lid. The artwork is printed directly onto the paper, wrapping " +
  "the full body edge to edge, not applied as a separate glossy label panel.";

const SHOT =
  "Shot straight on at eye level, the tub centred and upright and filling most of " +
  "the frame, on a plain very light warm-grey studio background with a soft contact " +
  "shadow beneath it. Even soft studio lighting, gentle highlight down one side of the " +
  "cylinder. High-end commercial e-commerce product photography, photorealistic, " +
  "ultra sharp, 8k.";

/* The colourway the cherry pass landed on, now held fixed. */
const CHERRY =
  "The paper is a warm pale cream. The accent band is a deep cherry red with " +
  "cream type; the product name and the two dose callouts are the same cherry " +
  "red, and the remaining type is near-black. The lid is deep cherry red.";

/* Five wordings for the same tub. The audience is women who are wound up at the end of
   a long day and lying awake on it, so the lines name that night rather than describing
   a category. "Anytime" stays true because the stack is non-sedating: it is the reason
   the product can be taken in the afternoon and still help at eleven.

   Deliberately absent: insomnia, anxiety, and anything that treats a diagnosis. Those
   are disease claims and they cost the supplement its structure and function footing. */
export const VARIANTS = [
  {
    name: "sleep-01-edge",
    band: "NIGHTTIME CALM SUPPORT",
    kicker: "DAILY SUPPORT FOR",
    lines: ["Takes The Edge Off", "Fall Asleep, Stay Asleep", "Wake Up Actually Rested"],
  },
  {
    name: "sleep-02-wired",
    band: "FOR WIRED BUT TIRED NIGHTS",
    kicker: "DAILY SUPPORT FOR",
    lines: ["Quiets A Busy Head", "Deep Restorative Sleep", "Overnight Recovery"],
  },
  {
    name: "sleep-03-plain",
    band: "NIGHTTIME CALM SUPPORT",
    kicker: "DAILY SUPPORT FOR",
    lines: ["Fall Asleep Faster", "Stay Asleep Longer", "Wake Up Without Grogginess"],
  },
  {
    name: "sleep-04-recovery",
    band: "WIND DOWN AND RECOVER",
    kicker: "NIGHTLY SUPPORT FOR",
    lines: ["Takes The Edge Off", "Restorative Sleep", "Overnight Recovery"],
  },
  {
    name: "sleep-05-anytime",
    band: "CALM BY DAY, SLEEP BY NIGHT",
    kicker: "DAILY SUPPORT FOR",
    lines: ["Takes The Edge Off", "Deeper, Unbroken Sleep", "Wake Up Restored"],
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
  const buf = await run(`Product mockup of ${VESSEL} ${CHERRY} ${label(v)} ${SHOT}`);
  await writeFile(path.join(OUT, `${v.name}.png`), buf);
  console.log(`  -> ${v.name}.png (${(buf.length / 1024).toFixed(0)} kB)`);
}
console.log(`done -> ${OUT}`);
