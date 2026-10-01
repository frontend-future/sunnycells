import { itchQuiz } from "./itch.ts";
import type { QuizConfig } from "./types.ts";

/**
 * A deep clone of the original itch quiz at /quiz/fridayzoomies, question for
 * question: same steps array, so the two never drift apart by accident. Its own
 * id and basePath keep its answers in a separate sessionStorage slot from the
 * original. Same pattern as itchV2Quiz.
 */
export const itchFridayZoomiesQuiz: QuizConfig = {
  ...itchQuiz,
  id: "itch-fridayzoomies",
  basePath: "/quiz/fridayzoomies",
  resultsPath: "/quiz/fridayzoomies/results/analyzing",
};
