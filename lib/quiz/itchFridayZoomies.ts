import { itchQuiz } from "./itch.ts";
import { renameProduct } from "../brandCopy.ts";
import type { QuizConfig } from "./types.ts";

/**
 * A deep clone of the original itch quiz at /quiz/fridayzoomies, question for
 * question: same steps array, so the two never drift apart by accident. Its own
 * id and basePath keep its answers in a separate sessionStorage slot from the
 * original. Same pattern as itchV2Quiz. The only copy that changes is the product
 * name, and "daily multivitamin" becoming "daily chew", on the reinforcement screen.
 */
const FZ_PRODUCT = "Inside-Out Itch Bundle";

export const itchFridayZoomiesQuiz: QuizConfig = {
  ...itchQuiz,
  id: "itch-fridayzoomies",
  basePath: "/quiz/fridayzoomies",
  resultsPath: "/quiz/fridayzoomies/results/analyzing",
  steps: itchQuiz.steps.map((s) =>
    s.slug === "reinforcement" && s.kind === "info"
      ? {
          ...s,
          /* Sells the bundle as two jobs: the wipes for relief today, the chew for the
             cause. Written for this funnel only, so itch v1 keeps its own copy. */
          body: `The ${FZ_PRODUCT} works from both sides, so {name} gets relief today and a fix that lasts. Soothing Wipes calm irritated skin on contact. The daily chew works from the inside, with natural ingredients, no steroids, and a taste dogs love. Together they will:`,
          bullets: [
            "Calm the scratching, licking, and chewing sooner",
            "Support healthy skin and a healthy coat for the long haul",
            "Ease allergy irritation without steroids",
          ],
          footnote: "Continue to see {name}'s personal results.",
        }
      : s.kind === "info"
      ? { ...s, body: renameProduct(s.body, FZ_PRODUCT).replace("daily multivitamin", "daily chew"), footnote: s.footnote && renameProduct(s.footnote, FZ_PRODUCT) }
      : s,
  ),
};
