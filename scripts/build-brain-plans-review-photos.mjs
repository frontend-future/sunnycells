/**
 * Five customer headshots for /quiz/brain/v3/results/plans: four for the reviews
 * grid and one for the headline review, matching five of the real named reviewers
 * in REVIEWS (lib/products/brain-memory.ts): Richard A., Mary W., Floyd B.,
 * Dayle N. (grid) and Dan B. (headline). Distinct from the story screen's
 * Robert/Carol photos and the trust step's Dr. Stevens photo, so no face is reused
 * under two different names anywhere on the site. Each is an edit of the real bottle
 * shot, not a fresh generation, so the label matches the actual product.
 *
 *   FAL_KEY=... node scripts/build-brain-plans-review-photos.mjs
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY not set");
const OUT = "public/quiz/brain";
const SRC = "public/product/brain-memory/01-hero-split.png";

const LOOK =
  "Natural daylight, soft shadows, shallow depth of field, plain neutral home " +
  "background, slightly candid rather than posed. Clean commercial healthcare " +
  "marketing photography, photorealistic, ultra detailed, realistic skin texture, " +
  "warm genuine smile, looking at the camera.";

const PEOPLE = [
  {
    name: "review-richard",
    prompt: `Recompose as a photorealistic headshot of a smiling man in his late 50s with short gray hair, wearing a casual collared shirt, holding up the same supplement bottle shown in the reference image toward the camera, label facing forward and matching the reference exactly (do not alter its design or text). ${LOOK}`,
  },
  {
    name: "review-mary",
    prompt: `Recompose as a photorealistic headshot of a smiling woman in her early 60s with shoulder-length light brown hair, wearing a casual blouse, holding up the same supplement bottle shown in the reference image toward the camera, label facing forward and matching the reference exactly (do not alter its design or text). ${LOOK}`,
  },
  {
    name: "review-floyd",
    prompt: `Recompose as a photorealistic headshot of a smiling man in his early 60s, bald with a short gray beard, wearing a casual sweater, holding up the same supplement bottle shown in the reference image toward the camera, label facing forward and matching the reference exactly (do not alter its design or text). ${LOOK}`,
  },
  {
    name: "review-dayle",
    prompt: `Recompose as a photorealistic headshot of a smiling woman in her late 50s with short curly gray hair, wearing a casual cardigan, holding up the same supplement bottle shown in the reference image toward the camera, label facing forward and matching the reference exactly (do not alter its design or text). ${LOOK}`,
  },
  {
    name: "review-dan",
    prompt: `Recompose as a photorealistic headshot of a smiling man in his late 60s with thinning white hair and glasses, wearing a casual quarter-zip sweater, holding up the same supplement bottle shown in the reference image toward the camera, label facing forward and matching the reference exactly (do not alter its design or text). ${LOOK}`,
  },
];

const auth = { Authorization: `Key ${KEY}`, "Content-Type": "application/json" };

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

async function save(name, buf) {
  await mkdir(OUT, { recursive: true });
  await writeFile(path.join(OUT, `${name}.png`), buf);
  console.log(`  -> ${name}.png`);
}

const b64 = (await readFile(SRC)).toString("base64");

for (const p of PEOPLE) {
  console.log(`generating ${p.name}...`);
  await save(p.name, await poll("fal-ai/nano-banana/edit", {
    prompt: p.prompt, image_urls: [`data:image/png;base64,${b64}`], num_images: 1, aspect_ratio: "1:1",
  }));
}
console.log("done");
