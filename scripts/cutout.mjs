/**
 * Knocks the white studio ground and its drop shadow out of a product shot.
 *
 *   node scripts/cutout.mjs <in.webp> <out.png>
 *
 * Brightness alone does not separate them: the pouch is cream, which is bright. The
 * ground and the shadow are neutral and the cream is warm, so the test is on channel
 * spread. Measured on the real file: ground spread 4, shadow slab 13, cream 24.
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "fs";

const [src, out] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage();
const ext = src.endsWith(".png") ? "png" : "webp";
await p.setContent(`<img id="i" src="data:image/${ext};base64,${readFileSync(src).toString("base64")}">`);
await p.waitForFunction(() => document.getElementById("i").complete);

const res = await p.evaluate(async () => {
  const img = document.getElementById("i");
  const c = document.createElement("canvas");
  c.width = img.naturalWidth; c.height = img.naturalHeight;
  const x = c.getContext("2d"); x.drawImage(img, 0, 0);
  const d = x.getImageData(0, 0, c.width, c.height), a = d.data, w = c.width, h = c.height, N = w * h;

  const bg = (i) => {
    const r = a[i*4], g = a[i*4+1], bl = a[i*4+2];
    const mn = Math.min(r, g, bl), mx = Math.max(r, g, bl);
    return mn > 180 && (mx - mn) <= 16;
  };

  /* Flood from the border only, so white inside the label survives. */
  const seen = new Uint8Array(N), q = [];
  for (let px = 0; px < w; px++) { q.push(px); q.push((h-1)*w + px); }
  for (let py = 0; py < h; py++) { q.push(py*w); q.push(py*w + w - 1); }
  while (q.length) {
    const i = q.pop();
    if (seen[i] || !bg(i)) continue;
    seen[i] = 1; a[i*4+3] = 0;
    const px = i % w, py = (i / w) | 0;
    if (px > 0) q.push(i-1); if (px < w-1) q.push(i+1);
    if (py > 0) q.push(i-w); if (py < h-1) q.push(i+w);
  }

  /* The shadow fades, so its core can survive as an island. Anything too small to be
     part of the product goes. */
  const lab = new Int32Array(N).fill(-1), sizes = [];
  for (let s = 0; s < N; s++) {
    if (lab[s] !== -1 || a[s*4+3] === 0) continue;
    const id = sizes.length; const st = [s]; lab[s] = id; let n = 0;
    while (st.length) {
      const i = st.pop(); n++;
      const px = i % w, py = (i / w) | 0, nb = [];
      if (px > 0) nb.push(i-1); if (px < w-1) nb.push(i+1);
      if (py > 0) nb.push(i-w); if (py < h-1) nb.push(i+w);
      for (const j of nb) if (lab[j] === -1 && a[j*4+3] !== 0) { lab[j] = id; st.push(j); }
    }
    sizes.push(n);
  }
  const MIN = N * 0.012;
  for (let i = 0; i < N; i++) if (lab[i] >= 0 && sizes[lab[i]] < MIN) a[i*4+3] = 0;

  /* One blur pass so the cut does not read as a jagged sticker. */
  const alpha = new Uint8ClampedArray(N);
  for (let i = 0; i < N; i++) alpha[i] = a[i*4+3];
  for (let y = 1; y < h-1; y++) for (let px = 1; px < w-1; px++) {
    const i = y*w + px;
    if (alpha[i] === 0) continue;
    let sum = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) sum += alpha[i + dy*w + dx];
    a[i*4+3] = Math.round(sum / 9);
  }
  x.putImageData(d, 0, 0);
  return { png: c.toDataURL("image/png").split(",")[1], kept: sizes.filter((s) => s >= MIN).length };
});

writeFileSync(out, Buffer.from(res.png, "base64"));
console.log(`kept ${res.kept} components ->`, out);
await b.close();
