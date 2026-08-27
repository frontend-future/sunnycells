"use client";

import { PlansScreen } from "@/components/quiz/PlansScreen";
import { AGING_PLANS_CONTENT } from "@/lib/quiz/agingPlansContent";
import { AgingPlanCards } from "./AgingPlanCards";

const CHECKOUT = "/quiz/aging/results/checkout";

/**
 * The diet funnel's plans page, selling the collagen. The layout, the section order and
 * the chrome all come from the shared screen: this file only says which content and
 * which cards. No hero media override, so it keeps the diet carousel, which is what the
 * brief asked for until the product has assets of its own.
 */
export function AgingPlans() {
  return (
    <PlansScreen
      content={AGING_PLANS_CONTENT}
      destinationHref={CHECKOUT}
      plansSlot={<AgingPlanCards destinationHref={CHECKOUT} />}
    />
  );
}
