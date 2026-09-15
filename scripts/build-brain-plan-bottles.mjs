/**
 * Clean product-catalog shots of 1, 3 and 6 bottles for the paid 1/3/6 month plan
 * cards on /quiz/brain/v2/results/plans, matching the diet funnel's own pouch-1/3/6
 * product photography style (isolated on a plain background, no lifestyle scene).
 * Each is an edit of the real bottle shot, not a fresh generation, so the label
 * matches the actual product.
 *
 *   FAL_KEY=... node scripts/build-brain-plan-bottles.mjs
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY not set");
const OUT = "public/quiz/brain";
const SRC = "public/product/brain-memory/01-hero-split.png";

const LOOK =
  "Isolated product photography on a plain white background, no scene or props, " +
  "studio lighting, sharp focus, photorealistic, ultra detailed, commercial " +
  "supplement catalog style, matching the reference bottle's label exactly, " +
  "pixel for pixel, including all text (do not alter, blur, or invent any text " +
  "on the label).";

const SHOTS = [
  {
    name: "bottle-1",
    prompt: `Recompose as a single bottle of the same supplement shown in the reference image, standing upright, centered, label facing forward. ${LOOK}`,
  },
  {
    name: "bottle-3",
    prompt: `Recompose as three bottles of the same supplement shown in the reference image, standing upright side by side and slightly overlapping like a product bundle shot, the center bottle slightly forward and taller-looking than the two behind it, all labels facing forward and matching the reference exactly. ${LOOK}`,
  },
  {
    name: "bottle-6",
    prompt: `Recompose as six bottles of the same supplement shown in the reference image, arranged in a staggered cluster like a product bundle shot (a few in front, a few behind, slightly offset heights and angles), labels mostly facing forward and matching the reference exactly. ${LOOK}`,
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

for (const s of SHOTS) {
  console.log(`generating ${s.name}...`);
  await save(s.name, await poll("fal-ai/nano-banana/edit", {
    prompt: s.prompt, image_urls: [`data:image/png;base64,${b64}`], num_images: 1, aspect_ratio: "4:3",
  }));
}
console.log("done");
