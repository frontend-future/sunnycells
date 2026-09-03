"use client";

import { EvenGallery } from "@/components/even-energy/EvenGallery";
import { PlansScreen } from "@/components/quiz/PlansScreen";
import { CORTISOL_PLANS_CONTENT } from "@/lib/quiz/cortisolPlansContent";
import { CortisolPlanCards } from "./CortisolPlanCards";

/* Youth Matrix has no checkout route of its own: no SKU, no cart, no order builder in
   lib/products. So the cards hand to the product page, which has a working buy box.
   Point this at /quiz/cortisol/results/checkout once that exists. */
const DESTINATION = "/products/youth-matrix-chews";

/* The pack first, then what it looks like in use, in the order someone works through
   it. The shared gallery takes its slides, so this funnel does not carry a carousel of
   another product's panels. */
const SLIDES = [
  { src: "/product/youth-matrix-chews.webp", alt: "A frosted glass SUNNYCELLS Youth Matrix jar filled with ruby tart-cherry chews" },
  { src: "/products/youth-matrix-chews/pdp-texture-macro.webp", alt: "Macro close-up of a single translucent tart-cherry chew" },
  { src: "/products/youth-matrix-chews/pdp-vessel-unboxing.webp", alt: "The jar beside an eco-friendly refill pouch" },
  { src: "/products/youth-matrix-chews/pdp-routine-vanity.webp", alt: "The open jar on a bathroom vanity at night" },
  { src: "/products/youth-matrix-chews/pdp-clinical-matrix.webp", alt: "A render of dermal collagen fibres repairing" },
  { src: "/products/youth-matrix-chews/pdp-before-after.webp", alt: "A woman's lower face, puffier on the left and more defined on the right" },
];

/**
 * The diet funnel's plans page, selling Youth Matrix Chews. The layout, the section
 * order and the chrome all come from the shared screen: this file only says which
 * content, which cards and which pictures.
 */
export function CortisolPlans() {
  return (
    <PlansScreen
      content={CORTISOL_PLANS_CONTENT}
      destinationHref={DESTINATION}
      heroMedia={<EvenGallery slides={SLIDES} />}
      plansSlot={<CortisolPlanCards destinationHref={DESTINATION} />}
    />
  );
}
