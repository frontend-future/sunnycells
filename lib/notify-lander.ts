/**
 * One checkout serves the quiz funnel and every listicle that sells the same product,
 * so the purchase-attempt subject says which one sent them.
 *
 * Lives outside the route so it can be tested without pulling in next/server, same
 * reason as notify-stage.ts.
 */
const LANDER_LABEL: Record<string, string> = {
  quiz: "Quiz",
  postpartum: "Postpartum",
  melatonin: "Melatonin",
};

/** Missing or unrecognised just adds nothing, rather than printing "[undefined]" or
    failing on a lander this file does not know about yet. */
export function landerTag(lander?: string): string {
  if (!lander) return "";
  return ` [${LANDER_LABEL[lander] ?? lander}]`;
}
