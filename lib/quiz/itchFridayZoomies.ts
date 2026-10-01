import { itchQuiz } from "./itch.ts";
import { renameProduct } from "../brandCopy.ts";
import type { QuizConfig } from "./types.ts";

/**
 * A deep clone of the original itch quiz at /quiz/fridayzoomies, question for
 * question: same steps array, so the two never drift apart by accident. Its own
 * id and basePath keep its answers in a separate sessionStorage slot from the
 * original. Same pattern as itchV2Quiz. The only copy that changes is the product
 * name on the reinforcement screen.
 */
const FZ_PRODUCT = "Inside-Out Itch Bundle";

export const itchFridayZoomiesQuiz: QuizConfig = {
  ...itchQuiz,
  id: "itch-fridayzoomies",
  basePath: "/quiz/fridayzoomies",
  resultsPath: "/quiz/fridayzoomies/results/analyzing",
  steps: itchQuiz.steps.map((s) =>
    s.kind === "info"
      ? { ...s, body: renameProduct(s.body, FZ_PRODUCT), footnote: s.footnote && renameProduct(s.footnote, FZ_PRODUCT) }
      : s,
  ),
};
