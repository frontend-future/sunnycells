import type { Answers } from "./assessment";

/* Someone who has given their email has finished the quiz. Their answers go to localStorage,
   which outlives the tab, so a later visit to the landing page can send them straight back to
   their results. sessionStorage (lib/quiz/store.ts) stays the working copy; the landing page's
   redirect script (components/quiz/ReturningVisitorRedirect.tsx) reads the same keys.
   No "use client" here, so the server rendered landing page can build the same key. */
export const completedKey = (quizId: string) => `sunnycells.quiz.${quizId}.completed`;
export const answersKey = (quizId: string) => `sunnycells.quiz.${quizId}`;

export function rememberCompleted(quizId: string, answers: Answers) {
  try {
    window.localStorage.setItem(completedKey(quizId), JSON.stringify(answers));
  } catch {
    /* Private mode or a full store: the quiz still works, they just are not remembered. */
  }
}
