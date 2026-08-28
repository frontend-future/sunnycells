/**
 * Which Meta dataset a page reports to.
 *
 * Three funnels, three products, three audiences, and a pixel each. A page belongs to
 * exactly one, so an event never lands in two datasets and no funnel's attribution is
 * polluted by another's traffic.
 */
export type Funnel = "energy" | "aging" | "default";

/* Energy is the Even Energy product page with its checkout plus the energy quiz.
   Aging is the collagen quiz, which is the only place that product is sold. Anything
   else, which today means the diet quiz and the Metabolic Morning Blend pages, stays
   on the original dataset. Matching is on the whole segment: a loose prefix on
   "/quiz/aging" would also swallow a future "/quiz/aging-something-else". */
const PATHS: [Funnel, string[]][] = [
  ["energy", ["/products/even-energy", "/quiz/energy"]],
  ["aging", ["/quiz/aging"]],
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
  default: process.env.NEXT_PUBLIC_META_PIXEL_ID,
};
