/**
 * Hero photo for the /quiz/brain landing page: an older couple, smiling at the
 * camera, holding the real bottle. An edit of the real bottle shot
 * (01-hero-split.png), not a fresh generation, so the label matches the actual
 * product instead of an invented one. Same master/edit pattern as
 * build-brain-memory-experts.mjs and build-beetroot-shots.mjs.
 *
 * These are stock-style generated people, not real customers or the story
 * screen's Carol/Robert placeholder, so no name or quote is attached to them.
 *
 *   FAL_KEY=... node scripts/build-brain-quiz-hero.mjs
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY not set");
const OUT = "public/quiz/brain";
const SRC = "public/product/brain-memory/01-hero-split.png";

const PROMPT =
  "Recompose as a professional photorealistic lifestyle photo of a happy, healthy " +
  "couple in their early 60s, a man and a woman, standing close together in a " +
  "bright modern kitchen, both smiling warmly directly at the camera. The woman " +
  "is holding up the same supplement bottle shown in the reference image toward " +
  "the camera, label facing forward and matching the reference exactly (do not " +
  "alter its design or text). Natural daylight through a window, soft shadows, " +
  "shallow depth of field, warm and inviting home setting. Clean commercial " +
  "healthcare marketing photography, photorealistic, ultra detailed, realistic " +
  "skin texture, candid genuine smiles, not stiff or posed.";

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

console.log("generating quiz hero...");
const buf = await poll("fal-ai/nano-banana/edit", {
  prompt: PROMPT, image_urls: [`data:image/png;base64,${b64}`], num_images: 1, aspect_ratio: "4:3",
});

await mkdir(OUT, { recursive: true });
await writeFile(path.join(OUT, "hero-couple.png"), buf);
console.log(`  -> ${path.join(OUT, "hero-couple.png")}`);
console.log("done");
