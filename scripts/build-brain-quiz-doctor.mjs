/**
 * Portrait for the "trust" step of /quiz/brain: "Dr. Stevens", a fictional
 * stand-in formulator, the same footing as EXPERTS in
 * lib/products/brain-memory.ts (see the SUBSTITUTION FLAG there and the
 * DOCTOR-FORMULATED FLAG in lib/quiz/brain.ts). An edit of the real bottle shot,
 * not a fresh generation, so the label matches the actual product.
 *
 *   FAL_KEY=... node scripts/build-brain-quiz-doctor.mjs
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY not set");
const OUT = "public/quiz/brain";
const SRC = "public/product/brain-memory/01-hero-split.png";

const PROMPT =
  "Recompose as a professional photorealistic portrait of a friendly white male " +
  "physician in his early 60s with gray and silver hair, neatly styled, smiling " +
  "warmly directly at the camera, wearing a white medical coat over a light blue " +
  "collared shirt with a stethoscope around his neck, holding up the same " +
  "supplement bottle shown in the reference image toward the camera, tilted " +
  "slightly so the label is clearly readable, label facing forward and matching " +
  "the reference EXACTLY, pixel-for-pixel, including all text (do not alter, " +
  "blur, or invent any text on the label). Natural daylight, soft shadows, " +
  "shallow depth of field, bright modern clinical office with a softly blurred " +
  "background. Clean commercial healthcare marketing photography, " +
  "photorealistic, ultra detailed, realistic skin texture, candid genuine smile.";

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

const b64 = (await readFile(SRC)).toString("base64");

console.log("generating doctor portrait...");
const buf = await poll("fal-ai/nano-banana/edit", {
  prompt: PROMPT, image_urls: [`data:image/png;base64,${b64}`], num_images: 1, aspect_ratio: "1:1",
});

await mkdir(OUT, { recursive: true });
await writeFile(path.join(OUT, "dr-stevens.png"), buf);
console.log(`  -> ${path.join(OUT, "dr-stevens.png")}`);
console.log("done");
