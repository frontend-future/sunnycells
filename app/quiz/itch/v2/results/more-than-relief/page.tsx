"use client";

import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchEducation } from "@/components/itch-quiz/ItchEducation";

export default function Page() {
  return (
    <ItchEducation quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/itch/v2/results/story" video="more-than-relief" title="More than itch relief">
      {({ name }) => `The same omega-3s support stiff joints and a sharp mind, which matters more as ${name} gets older.`}
    </ItchEducation>
  );
}
