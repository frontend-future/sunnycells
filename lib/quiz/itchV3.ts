import { itchQuiz } from "./itch.ts";
import type { QuizConfig } from "./types.ts";

/**
 * A deep clone of the original itch quiz at /quiz/itch/v3, question for question:
 * same steps array, so the two never drift apart by accident. Its own id and
 * basePath keep its answers in a separate sessionStorage slot from the original,
 * so taking one quiz never pre-fills or overwrites the other. Same pattern as
 * itchV2Quiz.
 */
export const itchV3Quiz: QuizConfig = {
  ...itchQuiz,
  id: "itch-quiz-v3",
  basePath: "/quiz/itch/v3",
  resultsPath: "/quiz/itch/v3/results/analyzing",
};
