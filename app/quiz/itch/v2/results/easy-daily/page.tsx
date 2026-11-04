"use client";

import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchEducation } from "@/components/itch-quiz/ItchEducation";
import { useAnswers } from "@/lib/quiz/store";

export default function Page() {
  const { answers } = useAnswers(itchFridayZoomiesQuiz.id);
  // Label dosing is 1 pump up to 40 lbs, 2 over. Medium (20-50 lbs) straddles that, so it gets 1.
  const pumps = /^(Large|Extra large)/.test(answers["dog-size"] ?? "") ? 2 : 1;
  const he = { Male: "he", Female: "she" }[answers.gender as string] ?? "they";

  return (
    <ItchEducation quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/itch/v2/results/what-to-expect" video="easy-daily" title="The best part of their day">
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
