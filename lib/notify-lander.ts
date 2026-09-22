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
  /* itch v1, v2, and v3 share one cart (ITCH_CART_ID), so this is the only signal
     that says which of the three quizzes a checkout notification came from. */
  "itch-v1": "Itch v1",
  "itch-v2": "Itch v2",
  "itch-v3": "Itch v3",
};

/** Missing or unrecognised resolves to nothing (subject tag) or the raw code
    (body line), rather than printing "[undefined]" or failing on a lander
    this file does not know about yet. */
export function landerLabel(lander?: string): string | null {
  if (!lander) return null;
  return LANDER_LABEL[lander] ?? lander;
}

export function landerTag(lander?: string): string {
  const label = landerLabel(lander);
  return label ? ` [${label}]` : "";
}
