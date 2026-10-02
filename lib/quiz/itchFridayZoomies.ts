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
  titleCaseName: true,
  steps: itchQuiz.steps.map((s) =>
    s.slug === "reinforcement" && s.kind === "info"
      ? {
          ...s,
          question: "is made for {name}",
          /* Sells the bundle as two jobs: the wipes for relief today, the chew for the
             cause. Written for this funnel only, so itch v1 keeps its own copy. */
          body: `The ${FZ_PRODUCT} works from two sides, because itching has two problems: the flare-up on the skin right now, and what keeps causing it.

Relief today: Soothing Wipes calm irritated skin on contact, so {name} can settle down while the chews get to work.

Fixes it at the source: The daily chew supports the skin barrier and the body's response to allergens from the inside, which is what keeps the itch from coming back. It's made from natural ingredients with no steroids, and dogs love the taste.`,
          bullets: undefined,
          footnote: "Continue to see {name}'s personal results.",
        }
      : s.kind === "info"
      ? { ...s, body: renameProduct(s.body, FZ_PRODUCT).replace("daily multivitamin", "daily chew"), footnote: s.footnote && renameProduct(s.footnote, FZ_PRODUCT) }
      : s,
  ),
};
