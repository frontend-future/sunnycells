/**
 * Five variations on the Youth Matrix hero jar.
 *
 *   FAL_KEY=... OUT_DIR=~/Downloads/youth-matrix-hero \
 *     node scripts/youth-matrix-hero.mjs [variant ...]
 *
 * Runs openai/gpt-image-2 at quality "high" rather than flux/dev, and that choice is
 * the whole reason the label is readable. flux garbled YOUTH MATRIX on two of five and
 * invented extra lines of small print on the rest; a nano-banana correction pass fixed
 * the spelling but softened the type. gpt-image-2 gets it right in one pass. It costs
 * roughly thirty times a flux call and takes two to three minutes per image, so it is
 * worth it for label work and wasteful for anything without text in it.
 *
 * Two things the prompts have to fight for, both learned the hard way:
 *   - The jar renders small unless its size is pinned against the loose chews beside
 *     it. It has to look like it holds a month at four a day, so about forty-eight.
 *   - The chews come back as spheres unless the flat circular base is spelled out.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const KEY = process.env.FAL_KEY;
const OUT = process.env.OUT_DIR;

/* The label wording is identical across all five so the product reads as one SKU.
   Per the SUNNYCELLS system the wordmark is a heavy geometric sans, uppercase and
   tightly tracked. The system has no serif face, so the brief's "serif and
   sans-serif" is set as two weights of the same sans instead. */
const LABEL =
  "The minimalist label carries two lines of clean modern sans-serif type: " +
  "'SUNNYCELLS' in heavy uppercase letters with tight letter-spacing, and " +
  "'YOUTH MATRIX' beneath it in lighter, wider uppercase letters. Crisp, " +
  "correctly spelled, perfectly legible lettering, printed flat on the glass.";

const JAR =
  "A LARGE heavy wide-mouth apothecary-style frosted glass jar, tall and generously " +
  "proportioned, about the size of a 500ml storage jar and clearly big enough to hold " +
  "a full month's supply. It is filled almost to the top with roughly forty-eight rich " +
  "translucent ruby tart-cherry red soft chews, each a small smooth semi-circular " +
  "gumdrop dome, packed in layers and visibly stacked deep inside the glass. The jar " +
  "towers over the individual chews resting beside it: each loose chew is only about " +
  "a sixth of the jar's height. Deep emerald green screw cap. " + LABEL;

const LOOK =
  "High-end commercial hero product photography, luxury DTC skincare aesthetic, " +
  "photorealistic, ultra-detailed glass refractions, macro depth of field, 8k.";

export const VARIANTS = [
  {
    name: "01-open-cap-beside",
    prompt: `${JAR} The jar sits open with its emerald cap resting beside it on a honed beige travertine surface. Four glossy semi-translucent tart-cherry gumdrops arranged neatly next to the jar in soft focus. Soft warm ambient bathroom vanity lighting. ${LOOK}`,
  },
  {
    name: "02-eye-level-sealed",
    prompt: `${JAR} Shot straight on at eye level, the jar closed and centred on a honed beige travertine slab, a low even bank of soft light raking across the frosted glass so the chews glow through it from behind. A scatter of six chews across the stone in the foreground. Cool clean shadowless studio ground. ${LOOK}`,
  },
  {
    name: "03-overhead-into-jar",
    prompt: `${JAR} Shot from directly overhead looking down into the open jar, the mouth of the jar filling the frame and the packed ruby chews visible right to the rim. The emerald cap lies upturned beside it on cream travertine. Diffuse overhead daylight, soft shadow. ${LOOK}`,
  },
  {
    name: "04-vanity-scene",
    prompt: `${JAR} The closed jar standing on a pale marble bathroom vanity beside a folded oatmeal linen towel and a single stem of eucalyptus in a small ceramic vase. Soft directional window daylight from the left, long gentle shadows, warm neutral palette, restrained styling with plenty of negative space. ${LOOK}`,
  },
  {
    name: "05-macro-label",
    prompt: `${JAR} An extremely close three-quarter macro crop on the shoulder and label of the jar, the frosted glass texture and the printed lettering razor sharp and filling most of the frame, the ruby chews inside softly abstract behind the glass. Two chews in the extreme foreground thrown far out of focus. Warm side light, shallow plane of focus. ${LOOK}`,
  },
];

const auth = { Authorization: `Key ${KEY}`, "Content-Type": "application/json" };

async function run(model, body) {
  const r = await fetch(`https://queue.fal.run/${model}`, { method: "POST", headers: auth, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`submit: ${r.status} ${await r.text()}`);
  const { status_url, response_url } = await r.json();
  for (let i = 0; i < 120; i++) {
    await new Promise((s) => setTimeout(s, 2500));
    const st = await (await fetch(status_url, { headers: auth })).json();
    if (st.status === "COMPLETED") break;
    if (i === 119) throw new Error("timed out");
  }
  const out = await (await fetch(response_url, { headers: auth })).json();
  const url = out.images?.[0]?.url;
  if (!url) throw new Error(`no image: ${JSON.stringify(out).slice(0, 200)}`);
  return url;
}

await mkdir(OUT, { recursive: true });
const only = process.argv.slice(2);
for (const v of VARIANTS) {
  if (only.length && !only.includes(v.name)) continue;
  console.log(`generating ${v.name}...`);
  const url = await run("openai/gpt-image-2", {
    prompt: v.prompt, image_size: "landscape_16_9", num_images: 1, quality: "high",
    output_format: "png",
  });
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  await writeFile(path.join(OUT, `${v.name}.png`), buf);
  console.log(`  -> ${v.name}.png (${(buf.length / 1024).toFixed(0)} kB)`);
}
console.log("done");
