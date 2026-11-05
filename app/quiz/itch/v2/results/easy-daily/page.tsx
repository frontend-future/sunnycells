"use client";

import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchEducation } from "@/components/itch-quiz/ItchEducation";
import { pumpsPerDay } from "@/lib/quiz/itchAssessment";
import { useAnswers } from "@/lib/quiz/store";

export default function Page() {
  const { answers } = useAnswers(itchFridayZoomiesQuiz.id);
  const pumps = pumpsPerDay(answers);
  const he = { Male: "he", Female: "she" }[answers.gender as string] ?? "they";

  return (
    <ItchEducation quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/itch/v2/results/what-to-expect" video="easy-daily" title="The best part of their day" cta={(name) => `See what to expect for ${name}`}>
      {({ name }) => (
        <>
          <p style={{ margin: 0 }}>Dogs love the taste, even the picky eaters.</p>
          <p style={{ margin: "var(--space-4) 0 0" }}>
            Based on {name}&apos;s size, {he}&apos;ll only need {pumps} {pumps === 1 ? "pump" : "pumps"} per day to get the omega-3s {he === "they" ? "they" : he} need{he === "they" ? "" : "s"} for relief.
          </p>
        </>
      )}
    </ItchEducation>
  );
}
