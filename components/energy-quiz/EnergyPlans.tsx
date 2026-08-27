"use client";

import { EvenGallery } from "@/components/even-energy/EvenGallery";
import { PlansScreen } from "@/components/quiz/PlansScreen";
import { ENERGY_PLANS_CONTENT } from "@/lib/quiz/energyPlansContent";
import { EnergyPlanCards } from "./EnergyPlanCards";

const CHECKOUT = "/quiz/energy/results/checkout";

/**
 * The diet funnel's plans page, selling the other product. The layout, the section
 * order, and the chrome all come from the shared screen: this file only says which
 * content, which cards, and which gallery.
 */
export function EnergyPlans() {
  return (
    <PlansScreen
      content={ENERGY_PLANS_CONTENT}
      destinationHref={CHECKOUT}
      heroMedia={<EvenGallery />}
      plansSlot={<EnergyPlanCards destinationHref={CHECKOUT} />}
    />
  );
}
