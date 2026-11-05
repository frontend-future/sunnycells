"use client";

import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchEducation } from "@/components/itch-quiz/ItchEducation";
import { useAnswers } from "@/lib/quiz/store";

/* One line per thing they tried, in the order the lines are shown. Two at most, so the slide stays short. */
const LINES: [RegExp, string][] = [
  [/Vet visit/, "Many prescriptions silence the symptoms without addressing the root cause."],
  [/Supplement/, "Many supplements don't have enough EPA and DHA per serving to reach the skin."],
  [/Diet change/, "Most dog foods don't carry enough omega-3s to calm skin inflammation."],
  [/shampoo|spray/i, "Shampoos, sprays and creams only reach the surface, so the itch returns when they wear off."],
  [/Flea/, "Flea prevention handles fleas, but it doesn't touch an allergy itch."],
];
const GENERIC = "Most shampoos, sprays and supplements only silence the symptoms and don't fix the root cause.";

export default function Page() {
  const { answers } = useAnswers(itchFridayZoomiesQuiz.id);
  const tried = answers["tried-before"] ?? "";
  const lines = LINES.filter(([re]) => re.test(tried)).map(([, line]) => line).slice(0, 2);

  return (
    <ItchEducation quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/itch/v2/results/omega-3" video="why-it-returns" title="Why the itching keeps coming back" cta={(name) => `See what ${name}'s skin cells need`}>
      {(lines.length ? lines : [GENERIC]).join(" ")} Healthy skin starts by addressing the root cause from within.
    </ItchEducation>
  );
}
