/**
 * Which Meta dataset a page reports to.
 *
 * Three funnels, three products, three audiences, and a pixel each. A page belongs to
 * exactly one, so an event never lands in two datasets and no funnel's attribution is
 * polluted by another's traffic.
 */
export type Funnel = "energy" | "aging" | "reds" | "revitalize" | "default";

/* Energy is the Even Energy product page with its checkout plus the energy quiz.
   Aging is the collagen quiz plus the /aging advertorials that feed it. Anything
   else, which today means the diet quiz and the Metabolic Morning Blend pages, stays
   on the original dataset. Matching is on the whole segment: a loose prefix on
   "/quiz/aging" would also swallow a future "/quiz/aging-something-else". */
const PATHS: [Funnel, string[]][] = [
  ["energy", ["/products/even-energy", "/quiz/energy"]],
  ["aging", ["/quiz/aging", "/aging"]],
  ["reds", ["/products/daily-reds"]],
  ["revitalize", ["/products/revitalize", "/revitalize"]],
];

export function funnelForPath(pathname: string): Funnel {
  for (const [funnel, paths] of PATHS)
    if (paths.some((p) => pathname === p || pathname.startsWith(p + "/"))) return funnel;
  return "default";
}

/* Both are read statically so Next can inline them into the client bundle. A
   NEXT_PUBLIC_* value reached through a computed key is not replaced at build
   time and arrives as undefined in the browser. */
export const PIXEL_IDS: Record<Funnel, string | undefined> = {
  energy: process.env.NEXT_PUBLIC_META_PIXEL_ID_ENERGY,
  aging: process.env.NEXT_PUBLIC_META_PIXEL_ID_AGING,
  /* No pixel of its own yet. Until one is set, Daily Reds reports nowhere rather than
     into the weight loss dataset, which is where an unrouted path would otherwise land
     and quietly poison that funnel's attribution. */
  reds: process.env.NEXT_PUBLIC_META_PIXEL_ID_REDS,
  /* SC-25 reports into the original cortisol dataset, the one the diet quiz and
     Metabolic Morning Blend already run on, rather than a dataset of its own. Same
     audience and the same cortisol angle, so the pixel keeps learning from one pool
     instead of starting cold. Named rather than left to fall through to "default", so
     the choice is visible here and a later split is one line. */
  revitalize: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  default: process.env.NEXT_PUBLIC_META_PIXEL_ID,
};
