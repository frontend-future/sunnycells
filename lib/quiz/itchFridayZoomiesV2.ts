import { itchFridayZoomiesQuiz } from "./itchFridayZoomies.ts";
import type { QuizConfig } from "./types.ts";

/**
 * The Friday Zoomies itch funnel again at /quiz/itch/v2, step for step, ending at the salmon
 * oil plans page (/quiz/itch/v2/results/plans). The paths change, and so does the reinforcement
 * screen, which sells Pure Omega Salmon Oil instead of the bundle. The id stays the same so
 * answers, the Loops lead and the checkout prefill all work as they do for /quiz/itch.
 */
export const itchFridayZoomiesV2Quiz: QuizConfig = {
  ...itchFridayZoomiesQuiz,
  steps: itchFridayZoomiesQuiz.steps.map((s) =>
    s.slug === "reinforcement" && s.kind === "info"
      ? {
          ...s,
          cta: "See {name}'s results",
          footnote: undefined,
          /* **bold** and __underline__ are drawn by StepScreen's info body. */
          body: `Pure Omega Salmon Oil gives {name} daily **omega-3 support** from the __inside__ so that {name} stops itching for good.

**Works from the inside:** Salmon oil contains EPA and DHA, the omega-3s skin cells use to keep the skin barrier strong and calm their own inflammatory response. It's 100% natural with no steroids, and dogs love the taste.

{pumps} with meal time will:`,
        }
      : s,
  ),
  basePath: "/quiz/itch/v2",
  resultsPath: "/quiz/itch/v2/results/analyzing",
  returnToResults: "/quiz/itch/v2/results/plans",
};
