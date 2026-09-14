/**
 * Console-logs every visitable URL on the site, grouped by product, each one
 * prepended with the production domain.
 *
 * The static route tree is discovered by walking app/ for page.tsx files, so
 * it can't go stale the way a hand-typed list would. The one thing a
 * filesystem walk can't produce on its own is what a dynamic [slug] route
 * actually resolves to at runtime, so each quiz's five-or-so step slugs are
 * pulled straight out of its lib/quiz/<name>.ts config (the same file each
 * [slug]/page.tsx calls generateStaticParams against), by regex rather than
 * a real import, since this project has no TS loader wired up for plain
 * `node script.mjs`. API routes (app/api/**) are left out: those aren't
 * pages a visitor opens, they're endpoints other code calls.
 *
 *   node scripts/list-urls.mjs
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ORIGIN = "https://sunnycells.com";
const APP_DIR = "app";

async function findPages(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === "api") continue; // endpoints, not pages
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await findPages(full)));
    } else if (entry.name === "page.tsx") {
      found.push(full);
    }
  }
  return found;
}

/** app/products/even-energy/page.tsx -> /products/even-energy */
function toUrlPath(pageFile) {
  let p = pageFile.slice(APP_DIR.length).replace(/\/page\.tsx$/, "");
  return p === "" ? "/" : p;
}

/** Pulls every `slug: "..."` value out of a quiz config file, in file order,
    matching what that quiz's generateStaticParams actually builds. */
async function quizSlugs(name) {
  const src = await readFile(`lib/quiz/${name}.ts`, "utf8");
  return [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

/* Directory name under app/quiz -> config file under lib/quiz. Every
   [slug]/page.tsx in this repo follows that exact pairing today. */
const QUIZ_CONFIGS = { energy: "energy", aging: "aging", calm: "calm", cortisol: "cortisol", diet: "diet" };

/**
 * Which product a URL belongs to. Checked top to bottom, first match wins,
 * so a more specific prefix (e.g. the melatonin sub-page) can be listed
 * ahead of its parent. Anything matching nothing lands in "Other" instead
 * of silently vanishing, so a future page shows up as a gap to fix here
 * rather than a page nobody remembered to group.
 */
const GROUPS = [
  ["Brain & Memory Power Boost", (p) => p.startsWith("/products/brain-memory")],
  ["Even Energy", (p) => p.startsWith("/products/even-energy") || p.startsWith("/quiz/energy")],
  ["Anytime Calm", (p) => p.startsWith("/products/anytime-calm") || p.startsWith("/quiz/calm")],
  ["Daily Reds", (p) => p.startsWith("/products/daily-reds")],
  ["Revitalize", (p) => p.startsWith("/products/revitalize") || p.startsWith("/revitalize/")],
  [
    "Youth Matrix Chews",
    (p) => p.startsWith("/products/youth-matrix-chews") || p.startsWith("/quiz/cortisol") ||
      p === "/advertorials/cortisol-collagen-matrix",
  ],
  ["BeetRoot+ Chews", (p) => p.startsWith("/lander/beetroot")],
  /* Quiz-only funnel, no dedicated /products page of its own. */
  ["Creatine + Collagen + Electrolytes", (p) => p.startsWith("/quiz/aging") || p === "/aging/7-warning-signs"],
  /* Quiz-only funnel too; shares the diet quiz's own checkout screen. */
  ["Metabolic Morning Blend", (p) => p.startsWith("/quiz/diet")],
  ["Site", (p) => p === "/"],
];

function groupFor(urlPath) {
  for (const [name, test] of GROUPS) if (test(urlPath)) return name;
  return "Other (ungrouped — add this page to GROUPS in scripts/list-urls.mjs)";
}

const pageFiles = (await findPages(APP_DIR)).sort();
const byGroup = new Map();

for (const file of pageFiles) {
  const urlPath = toUrlPath(file);
  const slugMatch = urlPath.match(/^(\/quiz\/([a-z]+))\/\[slug\]$/);

  const expanded = slugMatch && QUIZ_CONFIGS[slugMatch[2]]
    ? (await quizSlugs(QUIZ_CONFIGS[slugMatch[2]])).map((slug) => `${slugMatch[1]}/${slug}`)
    : [urlPath];

  for (const p of expanded) {
    const group = groupFor(p);
    if (!byGroup.has(group)) byGroup.set(group, []);
    byGroup.get(group).push(ORIGIN + p);
  }
}

const order = [...GROUPS.map(([name]) => name), "Other (ungrouped — add this page to GROUPS in scripts/list-urls.mjs)"];
for (const group of order) {
  const urls = byGroup.get(group);
  if (!urls?.length) continue;
  console.log(`\n${group} (${urls.length})`);
  for (const url of urls) console.log(`  ${url}`);
}
