"use client";

import { EvenGallery } from "@/components/even-energy/EvenGallery";
import { PlanCards } from "@/components/quiz/PlanCards";
import { PlansScreen } from "@/components/quiz/PlansScreen";
import { STAGING_PLANS, STAGING_PLANS_CONTENT, STAGING_SLIDES } from "@/lib/quiz/stagingPlansContent";

/**
 * /quiz/diet/results/plans/staging.
 *
 * The live plans page with the Cortisol Control photography swapped in. The layout,
 * the copy and the prices come from the shared PlansScreen exactly as the live route
 * does, so what is on screen is the real page and only the pictures differ.
 *
 * `optimizedImages` is off because these are already webp; the flag exists to rewrite
 * the diet funnel's .png paths and would mangle these.
 */
export function StagingPlans() {
  return (
    <PlansScreen
      content={STAGING_PLANS_CONTENT}
      heroMedia={<EvenGallery slides={STAGING_SLIDES} />}
      plansSlot={<PlanCards plans={STAGING_PLANS} />}
    />
  );
}
