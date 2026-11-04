"use client";

import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchEducation } from "@/components/itch-quiz/ItchEducation";

export default function Page() {
  return (
    <ItchEducation quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/itch/v2/results/omega-3" video="why-it-returns" title="Why the itching keeps coming back" cta={(name) => `See what ${name}'s skin cells need`}>
      {({ tried }) => {
        const sprayed = tried.filter((t) => /shampoo|spray/.test(t));
        const list = sprayed.length === 1 ? sprayed[0] : sprayed.slice(0, -1).join(", ") + " and " + sprayed[sprayed.length - 1];
        return (
          <>
            {sprayed.length ? `You've already tried ${list}. ` : ""}
            Shampoos, sprays and creams only reach the surface, so the itch returns when they wear off. Healthy skin starts from the inside.
          </>
        );
      }}
    </ItchEducation>
  );
}
