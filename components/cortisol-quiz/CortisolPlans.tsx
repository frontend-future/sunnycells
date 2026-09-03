"use client";

import { EvenGallery } from "@/components/even-energy/EvenGallery";
import { PlansScreen } from "@/components/quiz/PlansScreen";
import { CORTISOL_PLANS_CONTENT } from "@/lib/quiz/cortisolPlansContent";
import { CortisolPlanCards } from "./CortisolPlanCards";

/* The funnel's own checkout, reading the supply the cards wrote into the product's
   cart. Sending a ladder to the PDP instead would drop the choice: the PDP sells one
   month with a subscribe-or-once toggle and knows nothing about a six month supply. */
const DESTINATION = "/quiz/cortisol/results/checkout";

const CAROUSEL = "/products/youth-matrix-chews/carousel";

/* The pack, then the dose, then the argument: proof, expectation, the alternatives and
   risk reversal, which is the order the SC-25 carousel runs and the order someone works
   through a decision. The shared gallery takes its slides, so this funnel does not
   carry a carousel of another product's panels. */
const SLIDES = [
  { src: "/product/youth-matrix-chews.webp", alt: "A frosted glass SUNNYCELLS Youth Matrix jar filled with ruby tart-cherry chews" },
  { src: "/products/youth-matrix-chews/four-chews.webp", alt: "Four ruby tart-cherry gumdrop chews on a travertine counter, one turned to show its flat base" },
  /* 3 to 6 are built by scripts/build-youth-matrix-carousel.mjs rather than shot.
     They replaced four generic product photographs that were doing no selling: a jar
     beside a pouch, a vanity at night, a collagen render and a before/after. Each of
     these carries an argument instead, in the order the SC-25 carousel uses. */
  { src: `${CAROUSEL}/03-inside.webp`, alt: "The supplement facts panel with each ingredient and the job it does: gelatin for collagen, vitamin C to assemble it, magnesium and L-theanine to settle you, niacinamide for overnight repair" },
  { src: `${CAROUSEL}/04-timeline.webp`, alt: "What happens week by week: sleeping through by week 1, the puffiness drained by week 2, firmer skin by week 8" },
  { src: `${CAROUSEL}/05-compare.webp`, alt: "Youth Matrix compared with a night cream and collagen pills across six things, and the only one that does all six" },
  { src: `${CAROUSEL}/06-guarantee.webp`, alt: "A 30 day money back guarantee seal over the jar" },
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
