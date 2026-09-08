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
 * The copy is also re-pointed off the powder. The live page is a scoop mixed into
 * water, and every line that says so had to move: the product name, the plans title,
 * the ingredients heading, both how-it-works steps, the comparison rows about flavour,
 * six FAQs, and the four reviews plus the headline one, which between them mention a
 * scoop, mixing, dissolving, powders and a mild orange squash. Nothing else changed:
 * the claims, the timings and the prices are the live page's.
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

const PRODUCT = "Cortisol Control";

/* Reviews are the live ones with the format changed and nothing else: the same people,
   the same claims, the same timings. Only what they are putting in their mouth moves. */
const REVIEWS = [
  { ...DIET_PLANS_CONTENT.reviews[0] },
  {
    ...DIET_PLANS_CONTENT.reviews[1],
    body: "A month in and the three o'clock write-off has stopped. They taste like a proper tart cherry sweet, which matters when you are taking them every single morning.",
  },
  {
    ...DIET_PLANS_CONTENT.reviews[2],
    body: "I have taken enough powders to be suspicious of all of them. This one prints the milligrams on the front, which is the only reason I tried it. Two months on and I feel steadier than I have in years.",
  },
  {
    ...DIET_PLANS_CONTENT.reviews[3],
    body: "Two gummies, five seconds, no scoop and no shaker to wash. I tested cancelling in the first month on purpose and it took two clicks. I resubscribed the week after, which says more than the copy does.",
  },
];

export const STAGING_PLANS_CONTENT: PlansContent = {
  ...DIET_PLANS_CONTENT,
  productName: PRODUCT,
  productImage: `${IMG}/pack-1.webp`,
  plansTitle: "Let the gummies do the work",
  reviews: REVIEWS.map((r, i) => ({ ...r, photo: `${IMG}/review-${i + 1}.webp` })),
  ingredientsTitle: `The science behind the core ingredients of ${PRODUCT}`,
  comparisonNote: "Compared to other cortisol lowering supplements",
  comparison: DIET_PLANS_CONTENT.comparison.map((c) =>
    c === "Amazing orange flavor" ? "Amazing tart cherry flavor" : c),
  faqs: DIET_PLANS_CONTENT.faqs.map((f) => {
    const swap: Record<string, { title?: string; body?: string }> = {
      "How do I use Metabolic Morning Blend?": {
        title: `How do I use ${PRODUCT}?`,
        body: "Two gummies a day, in the morning, with or without food. Chewing them is the whole routine.",
      },
      "How does it taste?": { body: "Tart cherry, mild, no sugar. It tastes like a sweet rather than a supplement." },
      "Can I mix it with other products?": {
        title: "Can I take it with other products?",
        body: "Yes. It has no stimulants in it, so it sits alongside coffee, a protein shake, or anything else you already take.",
      },
      "Where should I store Metabolic Morning Blend?": {
        title: `Where should I store ${PRODUCT}?`,
        body: "Somewhere cool and dry with the lid closed. Not the windowsill, and not the fridge.",
      },
      "How long does the bag last?": {
        title: "How long does a canister last?",
        body: "One canister is 60 gummies, so a month at two a day.",
      },
    };
    const o = swap[f.title];
    return o ? { title: o.title ?? f.title, body: o.body ?? f.body } : f;
  }),
  /* Each pillar gets the shot that shows its outcome rather than the drawn pair. */
  pillars: DIET_PLANS_CONTENT.pillars.map((p) => ({
    ...p,
    illustration: `${IMG}/${
      p.slug === "reduced-stress" ? "calm-desk" : p.slug === "weight-loss" ? "active" : "sleep"
    }.webp`,
  })),
  headlineReview: DIET_PLANS_CONTENT.headlineReview
    ? {
        ...DIET_PLANS_CONTENT.headlineReview,
        body: "I've been taking the cortisol gummies for three months, and the results have been nothing short of remarkable. My stress levels are much lower, and I've dropped 17 pounds without making major changes to my diet. They taste good and take five seconds, which is the only reason I have actually kept it up. I feel more relaxed and healthier than I have in years. Definitely recommend giving it a shot.",
        photo: `${IMG}/story.webp`,
      }
    : undefined,
  howItWorks: [
    {
      ...DIET_PLANS_CONTENT.howItWorks[0],
      title: "Take 2 gummies",
      body: "Two tart cherry gummies in the morning. Chew them and get on with your day.",
      illustration: `${IMG}/palm-gummies.webp`,
    },
    { ...DIET_PLANS_CONTENT.howItWorks[1], illustration: `${IMG}/counter.webp` },
  ],
};
