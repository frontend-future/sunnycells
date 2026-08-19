import { mkdir, writeFile } from "node:fs/promises";
import { fal } from "@fal-ai/client";
import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

if (!process.env.FAL_KEY) {
  throw new Error("FAL_KEY is required. Set it in the shell environment and run this script again.");
}

const jobs = [
  {
    file: "public/photos/hormone-morning-fal.webp",
    size: { width: 1600, height: 1120 },
    prompt: "Premium editorial wellness campaign photograph, authentic woman in her early forties in a refined but lived-in sunlit kitchen at early morning, relaxed natural expression, preparing a pale orange drink in a clear glass, warm cream stone and light oak palette with one restrained sunny yellow accent, candid moment, realistic skin texture and hands, soft natural window light, subtle film grain, 50mm commercial photography, generous negative space, quiet sophisticated composition, relatable rather than glamorous, no product package, no brand, no logo, no text, no supplement container, no surreal objects, photorealistic",
  },
  {
    file: "public/photos/hormone-ingredients-fal.webp",
    size: { width: 1600, height: 1040 },
    prompt: "High-end editorial ingredient still life for a modern wellness brand, top-down and slightly oblique studio photograph on warm off-white limestone, ashwagandha roots, turmeric root and powder, black peppercorns, delicate tea leaves, rhodiola root, sunflower petals and sliced fresh orange arranged with intentional asymmetry, bright soft daylight from the left, tactile natural textures, crisp macro detail, subtle shadows, restrained yellow black cream color language, clean generous negative space, no package, no container, no label, no logo, no text, no capsules, photorealistic commercial food photography",
  },
];

await mkdir("public/photos", { recursive: true });

for (const job of jobs) {
  console.log(`Generating ${job.file}...`);
  const result = await fal.subscribe("fal-ai/flux-2", {
    input: {
      prompt: job.prompt,
      image_size: job.size,
      num_images: 1,
      output_format: "webp",
      enable_prompt_expansion: false,
      enable_safety_checker: true,
    },
  });
  const url = result.data.images?.[0]?.url;
  if (!url) throw new Error(`FAL returned no image for ${job.file}`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not download ${job.file}: ${response.status}`);
  await writeFile(job.file, Buffer.from(await response.arrayBuffer()));
  console.log(`Saved ${job.file}`);
}
