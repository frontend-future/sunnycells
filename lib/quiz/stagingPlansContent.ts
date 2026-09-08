import { DIET_PLANS_CONTENT, type PlansContent } from "./plansContent";
import { PLANS, type Plan } from "./plans";

/**
 * The diet plans page with the Cortisol Control photography in place of the Metabolic
 * Morning Blend photography. Words, prices, structure and section order are the live
 * page's, untouched: this exists so the new shots can be seen in the real layout at
 * real sizes before anything is decided.
 *
 * STATIC STAGING. It is not wired into the funnel, nothing links to it, and its route
 * is noindex. The live page at /quiz/diet/results/plans is unchanged.
 *
 * The eight ingredient panels keep their existing photographs. Those are real
 * ingredient shots that already ship, and the new set has no equivalent for
 * rhodiola or phosphatidylserine, so swapping them would be a downgrade.
 */

const IMG = "/staging/cortisol-control";

/* Same three supply lengths and the same prices. Only the photograph changes. */
export const STAGING_PLANS: Plan[] = PLANS.map((p) => ({
  ...p,
  image: `${IMG}/${p.months === 1 ? "pack-1" : p.months === 3 ? "pack-3" : "pack-6"}.webp`,
}));

export const STAGING_PLANS_CONTENT: PlansContent = {
  ...DIET_PLANS_CONTENT,
  productImage: `${IMG}/pack-1.webp`,
  /* Each pillar gets the shot that shows its outcome rather than the drawn pair. */
  pillars: DIET_PLANS_CONTENT.pillars.map((p) => ({
    ...p,
    illustration: `${IMG}/${
      p.slug === "reduced-stress" ? "calm-desk" : p.slug === "weight-loss" ? "active" : "sleep"
    }.webp`,
  })),
  headlineReview: DIET_PLANS_CONTENT.headlineReview
    ? { ...DIET_PLANS_CONTENT.headlineReview, photo: `${IMG}/story.webp` }
    : undefined,
  reviews: DIET_PLANS_CONTENT.reviews.map((r, i) => ({ ...r, photo: `${IMG}/review-${i + 1}.webp` })),
  howItWorks: [
    { ...DIET_PLANS_CONTENT.howItWorks[0], illustration: `${IMG}/palm-gummies.webp` },
    { ...DIET_PLANS_CONTENT.howItWorks[1], illustration: `${IMG}/counter.webp` },
  ],
};

/** The hero carousel: pack, then the product in use, then the people using it. */
export const STAGING_SLIDES = [
  { src: `${IMG}/pack-1.webp`, alt: "A marigold SUNNYCELLS Cortisol Control canister" },
  { src: `${IMG}/gallery-angle.webp`, alt: "The canister turned to show the paper tube and cap seam" },
  { src: `${IMG}/pack-open.webp`, alt: "The canister open with tart cherry gummies poured out in front of it" },
  { src: `${IMG}/gummies-macro.webp`, alt: "A macro close-up of the deep red tart cherry gummies" },
  { src: `${IMG}/hold-hand.webp`, alt: "A hand holding the canister, showing its size" },
  { src: `${IMG}/hold-woman.webp`, alt: "A woman in a kitchen holding the canister" },
  { src: `${IMG}/ugc-1.webp`, alt: "A customer holding the canister in her kitchen" },
  { src: `${IMG}/ugc-2.webp`, alt: "A customer holding the canister at his kitchen table" },
  { src: `${IMG}/ugc-3.webp`, alt: "A customer holding the canister in a bathroom mirror selfie" },
  { src: `${IMG}/ugc-4.webp`, alt: "A customer holding the canister on her sofa" },
];
