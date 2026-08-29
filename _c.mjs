import { chromium } from 'playwright'; import fs from 'fs';
const [dir, src, out, cx, cy, ang, scale] = process.argv.slice(2);
const b64 = fs.readFileSync(`${dir}/${src}.png`).toString('base64');
const html = `<!doctype html><html><head>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap" rel="stylesheet">
<style>html,body{margin:0}canvas{display:block}</style></head><body>
<canvas id="c" width="1024" height="1024"></canvas>
<img id="i" src="data:image/png;base64,${b64}" style="display:none">
<script>
window.render = async (CX, CY, ANG, K) => {
  await document.fonts.load('800 40px Outfit'); await document.fonts.ready;
  const img = document.getElementById('i');
  if (!img.complete) await new Promise(r => img.onload = r);
  const c = document.getElementById('c'), x = c.getContext('2d');
  x.drawImage(img, 0, 0);
  const CREAM = 'rgba(240,228,206,0.95)';
  x.save();
  x.translate(CX, CY); x.rotate(ANG * Math.PI / 180); x.scale(K, K);
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillStyle = CREAM; x.globalAlpha = 0.93;
  x.font = '800 13px Outfit'; x.letterSpacing = '3.6px';
  x.fillText('SUNNYCELLS', 0, -72);
  x.letterSpacing = '0px'; x.font = '800 34px Outfit';
  x.fillText('DAILY REDS', 0, -22);
  x.font = '600 13px Outfit'; x.letterSpacing = '3.2px';
  x.fillText('GUMMIES', 0, 10);
  const label = 'ONE DAILY PACK';
  x.font = '600 12px Outfit'; x.letterSpacing = '1.8px';
  const w = x.measureText(label).width + 26;
  x.globalAlpha = 0.72; x.lineWidth = 1.4; x.strokeStyle = CREAM;
  x.beginPath(); x.roundRect(-w/2, 52, w, 24, 12); x.stroke();
  x.globalAlpha = 0.93; x.fillText(label, 0, 64);
  x.restore();
  return c.toDataURL('image/png');
};
</script></body></html>`;
const br = await chromium.launch();
const p = await br.newPage({ viewport: { width: 1100, height: 1100 } });
await p.setContent(html, { waitUntil: 'networkidle' });
const d = await p.evaluate(a => window.render(...a), [+cx, +cy, +ang, +scale]);
fs.writeFileSync(`${dir}/${out}.png`, Buffer.from(d.split(',')[1], 'base64'));
await br.close(); process.exit(0);
