"use client";

import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchEducation } from "@/components/itch-quiz/ItchEducation";

export default function Page() {
  return (
    <ItchEducation quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/itch/v2/results/story" video="more-than-relief" title="More than just itch relief">
      {({ name }) => (
        <>
          The same omega-3s support <strong>joint health</strong> and a <strong>sharp mind</strong>, which helps {name} live a long and happy life.
        </>
      )}
    </ItchEducation>
  );
}
