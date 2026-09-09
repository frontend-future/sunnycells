"use client";

import { EvenGallery } from "@/components/even-energy/EvenGallery";
import { PlansScreen } from "@/components/quiz/PlansScreen";
import { CALM_PLANS_CONTENT } from "@/lib/quiz/calmPlansContent";
import { CalmPlanCards } from "./CalmPlanCards";

/* The funnel's own checkout, reading the supply the cards wrote into the product's
   cart. */
const DESTINATION = "/quiz/calm/results/checkout";

const IMG = "/products/anytime-calm";

/* The pack, then what is inside it, then the dose, then where it lives. Every slide is
   a photograph of the actual product.

   No fabricated argument panels. The sibling funnel's carousel carries rendered
   comparison tables and a guarantee seal built by a script; those assert things this
   product has not established, so this gallery shows the product and nothing else. */
const SLIDES = [
  { src: `${IMG}/pack-1.webp`, alt: "A cream and cherry red SUNNYCELLS Anytime Calm tub, straight on, with the three doses printed across the front" },
  { src: `${IMG}/pack-open.webp`, alt: "The open tub with the scoop resting in the pink cherry lime powder and the lid beside it" },
  { src: `${IMG}/scoop.webp`, alt: "A hand holding the white scoop heaped with pink powder, the tub behind it on a counter" },
  { src: `${IMG}/mixed-glass.webp`, alt: "A tall glass of the mixed cherry lime drink over ice with a wedge of lime, the tub standing behind it" },
  { src: `${IMG}/nightstand.webp`, alt: "The tub on a bedside table beside a lamp, a book and a glass of water" },
  { src: `${IMG}/gallery-angle.webp`, alt: "A three-quarter view of the tub showing the curve of the paper body and the seam where the lid meets it" },
];

/**
 * The diet funnel's plans page, selling Anytime Calm. The layout, the section order and
 * the chrome all come from the shared screen: this file only says which content, which
 * cards and which pictures.
 */
export function CalmPlans() {
  return (
    <PlansScreen
      content={CALM_PLANS_CONTENT}
      destinationHref={DESTINATION}
      heroMedia={<EvenGallery slides={SLIDES} />}
      plansSlot={<CalmPlanCards destinationHref={DESTINATION} />}
    />
  );
}
