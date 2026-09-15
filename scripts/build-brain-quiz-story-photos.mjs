/**
 * Story-screen photos for /quiz/brain: Robert and Carol, the placeholder
 * testimonial's fictional customers (see PLACEHOLDER STORY flag in
 * BrainStory.tsx). Each is an edit of the real bottle shot, not a fresh
 * generation, so the label matches the actual product. Candid, phone-photo
 * style on purpose, not a studio portrait: natural light, not looking straight
 * at the camera, organic rather than posed.
 *
 *   FAL_KEY=... node scripts/build-brain-quiz-story-photos.mjs
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY not set");
const OUT = "public/quiz/brain";
const SRC = "public/product/brain-memory/01-hero-split.png";

const LOOK =
  "Shot like a real photo taken on a smartphone, not a studio portrait: natural " +
  "window light, slightly imperfect candid framing, a little bit of grain, not " +
  "looking straight into the lens, caught mid-smile as if glancing slightly off " +
  "to the side or down at something, genuine and unposed. Photorealistic, ultra " +
  "detailed, realistic skin texture.";

const PEOPLE = [
  {
    name: "story-robert",
    prompt: `Recompose as a candid photo of a smiling older white man in his early 60s with silver and gray hair, wearing a casual sweater, sitting at a kitchen table at home, holding up the same supplement bottle shown in the reference image, label facing mostly toward the camera and matching the reference exactly (do not alter its design or text). ${LOOK}`,
  },
  {
    name: "story-carol",
    prompt: `Recompose as a candid photo of a smiling older white woman in her early 60s with silver and gray hair, wearing a casual cardigan, sitting at a kitchen table at home, holding up the same supplement bottle shown in the reference image, label facing mostly toward the camera and matching the reference exactly (do not alter its design or text). ${LOOK}`,
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
    prompt: p.prompt, image_urls: [`data:image/png;base64,${b64}`], num_images: 1, aspect_ratio: "3:4",
  }));
}
console.log("done");
