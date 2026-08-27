"use client";

import { EvenGallery } from "@/components/even-energy/EvenGallery";
import { PlansScreen } from "@/components/quiz/PlansScreen";
import { AGING_PLANS_CONTENT } from "@/lib/quiz/agingPlansContent";
import { AgingPlanCards } from "./AgingPlanCards";

const CHECKOUT = "/quiz/aging/results/checkout";

/* The pack first, then what it looks like in use, in the order someone works through
   it. The shared gallery takes its slides now, so this funnel does not carry a carousel
   of another product's panels. */
const SLIDES = [
  { src: "/product/complete-collagen.webp", alt: "Complete Collagen, a cream pouch of unflavored collagen powder" },
  { src: "/photos/collagen-pack-detail.webp", alt: "The ingredient block on the pack: hydrolyzed collagen, types I, II, III, V and X" },
  { src: "/photos/collagen-scoop.webp", alt: "One scoop of Complete Collagen going into a mug of coffee" },
  { src: "/photos/collagen-in-cup.webp", alt: "Complete Collagen stirred into coffee, beside the pouch" },
  { src: "/photos/collagen-flatlay.webp", alt: "The pouch, a scoop, a mug and a towel on warm linen" },
  { src: "/photos/collagen-nails.webp", alt: "A woman holding a warm mug, her natural nails visible" },
];

/**
 * The diet funnel's plans page, selling the collagen. The layout, the section order and
 * the chrome all come from the shared screen: this file only says which content, which
 * cards and which pictures.
 */
export function AgingPlans() {
  return (
    <PlansScreen
      content={AGING_PLANS_CONTENT}
      destinationHref={CHECKOUT}
      heroMedia={<EvenGallery slides={SLIDES} />}
      plansSlot={<AgingPlanCards destinationHref={CHECKOUT} />}
    />
  );
}
