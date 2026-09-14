/**
 * Clinician portraits for the "What clinicians say about this formula" section
 * of Brain & Memory Power Boost. Each is an edit of the real bottle shot
 * (checklist.png), not a fresh generation, so the label matches the actual
 * product instead of an invented one. See build-beetroot-shots.mjs for the
 * same master/edit pattern this follows.
 *
 * These are fictional people (Dr. Elena Cross, Priya Nakamura PhD, Dr. Marcus
 * Reyes) in lib/products/brain-memory.ts — see the SUBSTITUTION FLAG there.
 *
 *   FAL_KEY=... node scripts/build-brain-memory-experts.mjs
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY not set");
const OUT = "public/product/brain-memory/experts";
const SRC = "public/product/brain-memory/checklist.png";

const LOOK =
  "Natural daylight, soft shadows, shallow depth of field, bright modern clinical " +
  "office with a softly blurred background. Clean commercial healthcare marketing " +
  "photography, photorealistic, ultra detailed, realistic skin texture.";

const EXPERTS = [
  {
    name: "expert-1",
    prompt: `Recompose as a professional photorealistic portrait of a warm, confident female physician in her mid-40s with shoulder-length brown hair, wearing a white medical coat over a light blue blouse with a stethoscope around her neck, holding up the same supplement bottle shown in the reference image toward the camera, label facing forward and matching the reference exactly (do not alter its design or text). ${LOOK}`,
  },
  {
    name: "expert-2",
    prompt: `Recompose as a professional photorealistic portrait of a friendly female scientist of South Asian descent in her late 30s with dark hair pulled back, wearing a white lab coat over a navy top and thin glasses, holding up the same supplement bottle shown in the reference image toward the camera, label facing forward and matching the reference exactly (do not alter its design or text). ${LOOK}`,
  },
  {
    name: "expert-3",
    prompt: `Recompose as a professional photorealistic portrait of a confident male physician of Latino descent in his late 40s with short dark hair going gray at the temples, wearing a white medical coat over a light shirt and tie, holding up the same supplement bottle shown in the reference image toward the camera, label facing forward and matching the reference exactly (do not alter its design or text). ${LOOK}`,
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

for (const e of EXPERTS) {
  console.log(`generating ${e.name}...`);
  await save(e.name, await poll("fal-ai/nano-banana/edit", {
    prompt: e.prompt, image_urls: [`data:image/png;base64,${b64}`], num_images: 1, aspect_ratio: "1:1",
  }));
}
console.log("done");
