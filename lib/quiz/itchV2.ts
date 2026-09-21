import { itchQuiz } from "./itch.ts";
import type { QuizConfig } from "./types.ts";

/**
 * A deep clone of the original itch quiz at /quiz/itch/v2, question for question:
 * same steps array, so the two never drift apart by accident. Its own id and
 * basePath keep its answers in a separate sessionStorage slot from the original,
 * so taking one quiz never pre-fills or overwrites the other. Same pattern as
 * brainV2Quiz.
 */
export const itchV2Quiz: QuizConfig = {
  ...itchQuiz,
  id: "itch-quiz-v2",
  basePath: "/quiz/itch/v2",
  resultsPath: "/quiz/itch/v2/results/analyzing",
};
