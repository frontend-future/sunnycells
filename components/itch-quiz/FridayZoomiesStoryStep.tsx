"use client";

import posthog from "posthog-js";
import { ItchStory } from "@/components/itch-quiz/ItchStory";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";

const V2_PLANS = "/quiz/itch/v2/results/plans";
const V3_PLANS = "/quiz/itch/v3/results/plans";

/* The plans page split test. PostHog flag "plans-page": variant "v3" goes to the v3 product page, anyone else (and
   everyone while the flag is off, missing or PostHog has no key) to v2. Decided at the click, not on the plans page,
   so nobody sees one page flash into the other. Reading the flag here is what PostHog counts as entering the test. */
const plansPage = () => {
  try {
    return posthog.getFeatureFlag("plans-page") === "v3" ? V3_PLANS : V2_PLANS;
  } catch {
    return V2_PLANS;
  }
};

export function FridayZoomiesStoryStep() {
  return <ItchStory quizId={itchFridayZoomiesQuiz.id} nextHref={plansPage} oil />;
}
