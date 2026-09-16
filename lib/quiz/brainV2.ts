import { brainQuiz } from "./brain.ts";
import type { QuizConfig } from "./types.ts";

/**
 * A deep clone of the original brain quiz at /quiz/brain/v2, question for question:
 * same steps array, so the two never drift apart by accident. The one real
 * difference is downstream of the quiz itself, not in it: the story screen hands off
 * to /quiz/brain/v2/results/plans (the paid 1/3/6 month ladder built for v2/v3)
 * instead of the original's /products/brain-memory. Its own id and basePath keep its
 * answers in a separate sessionStorage slot from the original, so taking one quiz
 * never pre-fills or overwrites the other.
 */
export const brainV2Quiz: QuizConfig = {
  ...brainQuiz,
  id: "brain-quiz-v2",
  basePath: "/quiz/brain/v2",
  resultsPath: "/quiz/brain/v2/results/analyzing",
};
