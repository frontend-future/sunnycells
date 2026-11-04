"use client";

import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchEducation } from "@/components/itch-quiz/ItchEducation";

export default function Page() {
  return (
    <ItchEducation quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/itch/v2/results/easy-daily" video="omega-3" title="Omega-3s are what skin cells need" cta={(name) => `See how easy it is for ${name}`}>
      {({ name }) => `Salmon oil gives ${name} EPA and DHA, the omega-3s skin cells use to keep the skin barrier strong and calm their own inflammatory response.`}
    </ItchEducation>
  );
}
