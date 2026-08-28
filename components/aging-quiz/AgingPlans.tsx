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
  { src: "/product/creatine-collagen.webp", alt: "Creatine + Collagen + Electrolytes, a jar of raspberry lemonade powder" },
  { src: "/photos/cc-watercolour.webp", alt: "The jar with its doses: 5 g creatine, 10 g collagen peptides and electrolytes" },
  { src: "/photos/cc-mix.webp", alt: "A scoop of raspberry lemonade powder beside a mixed glass" },
  { src: "/photos/cc-flavor.webp", alt: "The mixed drink over ice with raspberries and lemon" },
  { src: "/photos/cc-lifestyle.webp", alt: "A woman drinking a shaker of the mixed drink after training" },
  { src: "/product/creatine-collagen-3.webp", alt: "Three jars, the three month supply" },
];

/**
 * The diet funnel's plans page, selling the creatine and collagen jar. The layout, the section order and
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
