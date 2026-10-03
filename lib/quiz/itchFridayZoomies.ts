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
          /* Sells the bundle as two jobs: the spray for relief today, the chew for the
             cause. Written for this funnel only, so itch v1 keeps its own copy. */
          /* **bold** and __underline__ are drawn by StepScreen's info body. */
          body: `The ${FZ_PRODUCT} works from **two sides**, because itching has two problems: the __flare-up on the skin right now__, and __what keeps causing it__.

**Relief today:** The Itch Spray calms irritated skin __on contact__, so {name} can settle down while the chews get to work.

**Fixes it at the source:** The daily chew supports the skin barrier and the body's response to allergens __from the inside__, which is what keeps the itch from coming back. It's made from natural ingredients with no steroids, and dogs love the taste.

Together they will:`,
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
