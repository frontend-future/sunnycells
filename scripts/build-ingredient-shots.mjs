/**
 * The five ingredient photographs for the Youth Matrix panels, plus the night-routine
 * shot for the "Every night, not most nights" step.
 *
 * l-theanine is NOT here: the repo already has a real green tea photograph at
 * /ingredients/l-theanine.jpg at exactly the 800x450 the panel renders, so there is
 * nothing to generate for it.
 *
 * Written and left ready rather than run: fal's balance was exhausted mid-task. One
 * command once it is topped up, and then swap the four TODO lines in
 * lib/quiz/cortisolPlansContent.ts and the one in the howItWorks step.
 *
 *   FAL_KEY=$(grep -oE 'FAL_KEY=.*' ~/.claude/fal/credentials.env | cut -d= -f2-) \
 *     node scripts/build-ingredient-shots.mjs [name ...]
 *
 * Panels render at 800x450, so everything here is 16:9.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY not set");
const OUT = process.env.OUT_DIR || "public/ingredients";

/* The same register as the existing l-theanine shot, which is what these sit beside:
   the raw ingredient itself, shot close, natural light, nothing styled into a set. */
const LOOK =
  "Natural daylight, shallow depth of field, close and simple, shot on a plain " +
  "surface with nothing else in frame. Editorial ingredient photography, " +
  "photorealistic, no text, no packaging, no labels, no hands.";

export const SHOTS = [
  {
    name: "gelatin",
    prompt:
      "A small heap of pale amber gelatin granules spilling from a white ceramic dish " +
      "onto a light stone surface, with a few translucent sheets of leaf gelatin " +
      "resting beside it. " + LOOK,
  },
  {
    name: "magnesium-glycinate",
    prompt:
      "A small pile of fine white magnesium glycinate powder on a pale grey slate " +
      "surface, with a brushed steel measuring spoon lying beside it holding a little " +
      "more. Clean, mineral, slightly crystalline texture visible up close. " + LOOK,
  },
  {
    name: "niacinamide",
    prompt:
      "A small mound of fine white niacinamide powder on a smooth off-white surface " +
      "beside a scattering of raw brown rice grains and a few peanuts, the everyday " +
      "foods vitamin B3 comes from. Soft daylight from one side. " + LOOK,
  },
  {
    name: "acerola-vitamin-c",
    prompt:
      "A small cluster of bright red acerola cherries on the branch with a few glossy " +
      "green leaves, resting on a pale wooden surface, one cherry cut in half to show " +
      "the pale flesh inside. Fresh, just-picked, water still on the skin. " + LOOK,
  },
  {
    name: "night-routine",
    /* The "Every night, not most nights" step. The point of the picture is the habit,
       so it is a person doing the thing at the time she does it, not a still life. */
    prompt:
      "A woman in her late thirties in a warm, softly lit bathroom late at night, hair " +
      "tied back, face bare and clean after her skincare routine, eating a small red " +
      "chew with a calm, unposed expression. Warm lamp light, a mirror behind her, an " +
      "ordinary tidy home bathroom rather than a set. Candid and relaxed, natural " +
      "unretouched skin with real texture, photorealistic, editorial lifestyle " +
      "photography, no text and no readable packaging.",
  },
];

const auth = { Authorization: `Key ${KEY}`, "Content-Type": "application/json" };

/* fal returns 403 "Exhausted balance" intermittently on a low balance: a probe a few
   seconds later goes straight through. Treating the first one as fatal cost this task
   a whole round trip, so submits retry with backoff and only give up after the lock
   has held for a couple of minutes. */
async function submit(body, tries = 8) {
  for (let i = 0; i < tries; i++) {
    const r = await fetch("https://queue.fal.run/fal-ai/flux/dev", {
      method: "POST", headers: auth, body: JSON.stringify(body),
    });
    if (r.ok) return r.json();
    const text = await r.text();
    if (r.status !== 403 || i === tries - 1) throw new Error(`submit: ${r.status} ${text}`);
    const wait = 5000 * (i + 1);
    console.log(`  locked, retrying in ${wait / 1000}s (${i + 1}/${tries - 1})`);
    await new Promise((s) => setTimeout(s, wait));
  }
}

async function run(prompt) {
  const { status_url, response_url } = await submit({
    prompt, image_size: "landscape_16_9", num_images: 1, num_inference_steps: 34,
  });
  for (let i = 0; i < 120; i++) {
    await new Promise((s) => setTimeout(s, 2500));
    const st = await (await fetch(status_url, { headers: auth })).json();
    if (st.status === "COMPLETED") break;
    if (i === 119) throw new Error("timed out");
  }
  const o = await (await fetch(response_url, { headers: auth })).json();
  const u = o.images?.[0]?.url;
  if (!u) throw new Error(JSON.stringify(o).slice(0, 200));
  return Buffer.from(await (await fetch(u)).arrayBuffer());
}

const only = process.argv.slice(2);
await mkdir(OUT, { recursive: true });
for (const s of SHOTS) {
  if (only.length && !only.includes(s.name)) continue;
  console.log(`generating ${s.name}...`);
  const png = path.join(OUT, `${s.name}.png`);
  await writeFile(png, await run(s.prompt));
  /* jpg to match the existing /ingredients shots, and 800 wide because that is what
     the panel renders at. */
  execFileSync("cwebp", ["-q", "86", "-resize", "800", "0", png, "-o", path.join(OUT, `${s.name}.webp`)], { stdio: "ignore" });
  console.log(`  -> ${s.name}.webp`);
}
console.log("done");
