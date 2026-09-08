"use client";

import { PlanCards } from "@/components/quiz/PlanCards";
import { HeroCarousel } from "@/components/quiz/HeroCarousel";
import { PlansScreen } from "@/components/quiz/PlansScreen";
import { STAGING_CAROUSEL } from "@/lib/quiz/stagingCarousel";
import { STAGING_PLANS, STAGING_PLANS_CONTENT } from "@/lib/quiz/stagingPlansContent";

/**
 * /quiz/diet/results/plans/staging.
 *
 * The live plans page with the Cortisol Control photography swapped in. The layout,
 * the copy and the prices come from the shared PlansScreen exactly as the live route
 * does, so what is on screen is the real page and only the pictures differ.
 *
 * The hero is the same six-slide HeroCarousel the live page runs, not a gallery of
 * photographs. That was the first attempt and it was the wrong kind of thing: the live
 * slides are benefits, survey figures, attributes, serving, a supplement facts panel
 * and a customer collage, all composed in markup so the text stays real.
 *
 * `optimizedImages` is off because these are already webp; the flag exists to rewrite
 * the diet funnel's .png paths and would mangle these.
 */
export function StagingPlans() {
  return (
    <PlansScreen
      content={STAGING_PLANS_CONTENT}
      heroMedia={<HeroCarousel pouchSrc={STAGING_PLANS_CONTENT.productImage} content={STAGING_CAROUSEL} />}
      plansSlot={<PlanCards plans={STAGING_PLANS} />}
    />
  );
}
