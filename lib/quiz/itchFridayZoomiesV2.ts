import { itchFridayZoomiesQuiz } from "./itchFridayZoomies.ts";
import type { QuizConfig } from "./types.ts";

/**
 * The Friday Zoomies itch funnel again at /quiz/itch/v2, step for step, ending at the salmon
 * oil plans page (/quiz/itch/v2/results/plans). Only the paths change. The id stays the same so
 * answers, the Loops lead and the checkout prefill all work as they do for /quiz/itch.
 */
export const itchFridayZoomiesV2Quiz: QuizConfig = {
  ...itchFridayZoomiesQuiz,
  basePath: "/quiz/itch/v2",
  resultsPath: "/quiz/itch/v2/results/analyzing",
  returnToResults: "/quiz/itch/v2/results/plans",
};
