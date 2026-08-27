import type { PlansContent } from "./plansContent";

/**
 * Everything the energy plans page says. The page structure is the diet funnel's,
 * unchanged; this file is the swap. Doses, claims, and ingredient copy are taken from
 * the Even Energy product page so the two surfaces cannot drift apart.
 */

/* PLACEHOLDER REVIEWS. None of these people exist and none of these results were
   measured. Replace with real, documented customers before launch, the same standing
   instruction the diet funnel's reviews carry. */
const HEADLINE_REVIEW = {
  name: "Kaitlin S.",
  title: "The first thing that actually feels balanced.",
  body: "I've always struggled with feeling in tune with my energy levels, and this is the first thing I've tried that actually feels balanced. No jitters, no crash, just steady, clean energy that helps me get through workouts and busy days. I was on four coffees a day before this and I did not think I would ever get off them.",
};

const REVIEWS = [
  {
    name: "Marisa T.",
    photo: "/photos/even-avatar-1.webp",
    title: "Took about three weeks for me",
    body: "Honestly, the first two weeks I figured I had wasted my money. Then one Thursday afternoon it hit me that I had not thought about coffee since breakfast. And the watermelon is not sweet, which was the thing I was worried about.",
  },
  {
    name: "Deb R.",
    photo: "/photos/even-avatar-2.webp",
    title: "Finally something I can actually take",
    body: "I cannot do caffeine at all, not even green tea. This has none in it and it still does something, which I was not expecting. I mix it at seven with cold water and it actually dissolves instead of sitting on top.",
  },
  {
    name: "Angela K.",
    photo: "/photos/even-avatar-3.webp",
    title: "Now it is a dip, not a cliff",
    body: "It is not a miracle and I still get tired. I just get tired at a normal hour instead of falling apart at three. The sticks are handy too, I keep one in my bag.",
  },
  {
    name: "Priya S.",
    photo: "/photos/even-ugc-2.webp",
    title: "The recovery is what got me",
    body: "I lift three times a week and the day after used to wreck me. That has changed more than my energy during the day has, which surprised me. I bought it because the doses are printed right on the front.",
  },
];

/* PLACEHOLDER SCIENCE. Each claim below needs a citation and a regulatory pass before
   it goes live: as written they are structure and function claims about a supplement. */
const INGREDIENTS: PlansContent["ingredients"] = [
  {
    slug: "coq10",
    title: "Ubiqsome® CoQ10, 150 mg",
    image: "/ingredients/even-coq10.png",
    points: [
      ["The molecule your cells make energy with", "CoQ10 moves electrons through the chain that ends in ATP. Your body makes less of it as you get older, and less again on a statin."],
      ["A phytosome form, for absorption", "Ubiqsome is formulated to get more of it into muscle and skin tissue than standard CoQ10 manages."],
    ],
  },
  {
    slug: "taurine",
    title: "Taurine, 1000 mg",
    image: "/ingredients/even-taurine.png",
    points: [
      ["One of the most abundant amino acids in muscle", "Involved in muscle contraction, calcium signalling and cellular hydration, and it is not a stimulant."],
      ["Studied for fatigue and endurance", "Human studies associate taurine intake with reduced fatigue and better endurance, particularly in aging populations."],
    ],
  },
  {
    slug: "peak-atp",
    title: "PEAK ATP®, 40 mg",
    image: "/product/gallery/03-stick.webp",
    points: [
      ["ATP is the currency every cell spends", "PEAK ATP is a studied oral form, included at the 40 mg the research used rather than a dusting for the label."],
      ["Supports energy signalling", "Trialled for muscle function and blood flow rather than for a stimulant effect, because it does not have one."],
    ],
  },
  {
    slug: "vitamin-b6",
    title: "Vitamin B6",
    image: "/ingredients/even-b6.png",
    points: [
      ["Turns food into usable energy", "B6 is a cofactor in the reactions that get energy out of what you eat rather than out of a stimulant."],
      ["Supports the nervous system", "One of the two B vitamins in the stick, both at the amounts printed on the front of the pack."],
    ],
  },
  {
    slug: "vitamin-b12",
    title: "Vitamin B12",
    image: "/ingredients/even-b12.png",
    points: [
      ["Red blood cell formation", "B12 is needed to make the cells that carry oxygen to the muscle doing the work."],
      ["Commonly low, and worth checking", "Levels fall with age and on a plant based diet, which is why it sits in a daily formula rather than a pre workout."],
    ],
  },
  {
    slug: "caffeine",
    title: "Caffeine: none",
    image: "/product/gallery/05-supplement-facts.webp",
    points: [
      ["Not a milligram of it", "There is no caffeine, guarana, yerba mate or green tea extract in the stick. Nothing in it has to wear off."],
      ["Which is the whole point", "A stimulant blocks the signal that tells you you are tired. It does not give your cells anything to spend."],
    ],
  },
];

export const ENERGY_PLANS_CONTENT: PlansContent = {
  quizId: "energy",
  productName: "Even Energy",
  /* No countdown. The 50% off a first order is a standing term of the brand, not a
     promotion, so it never carries a deadline. */
  offer: { label: "Standing offer", badge: "50% off first order", countdown: false },
  hero: {
    title: "Caffeine free daily energy",
    lede: "SUNNYCELLS is here to give you steady energy with nothing to come down from.",
    points: ["Zero caffeine and zero crash", "Clinically studied doses on the front", "Built to take every day"],
  },
  productImage: "/product/even-energy.webp",
  plansTitle: "Let your cells do the work",
  plansNote: {
    badge: "3x",
    body: "People taking SUNNYCELLS for 3 months pay a third less per pouch than for 1 month",
  },
  quickBenefits: [
    { lead: "Mixes clear in cold water in ", strong: "30 seconds" },
    { lead: "Studies show muscle CoQ10 up in ", strong: "2 weeks" },
    { lead: "Afternoons stop falling away in ", strong: "2 to 4 weeks" },
    { lead: "Built to keep taking for ", strong: "the long term" },
  ],
  pillars: [
    {
      slug: "fuel",
      title: "Fuel",
      body: "Ubiqsome CoQ10 at 150 mg, the molecule your mitochondria use on the way to making ATP.",
      illustration: "/photos/even-fuel.webp",
    },
    {
      slug: "restore",
      title: "Restore",
      body: "Taurine at 1000 mg, associated in human studies with reduced fatigue and better endurance.",
      illustration: "/photos/even-restore.webp",
    },
    {
      slug: "sustain",
      title: "Sustain",
      body: "B6, B12 and PEAK ATP at 40 mg, the nutritional foundation for output with no stimulants.",
      illustration: "/photos/even-sustain.webp",
    },
  ],
  headlineReview: HEADLINE_REVIEW,
  reviews: REVIEWS,
  ingredientsTitle: "The science behind the core ingredients of Even Energy",
  ingredients: INGREDIENTS,
  howItWorks: [
    {
      img: "step-stick",
      title: "Add 1 stick",
      body: "Tear one stick into 8 to 10 oz of cold water. Stir for thirty seconds. It dissolves clear.",
      illustration: "/product/even-stick-hand.png",
    },
    {
      img: "step-steady",
      title: "Feel steady, not wired",
      body: "There is no spike, so there is nothing to come down from. This is something you feel over weeks rather than minutes.",
      illustration: "/photos/even-mix.webp",
    },
  ],
  comparisonNote: "Compared to other energy drinks and powders",
  comparison: [
    "Clinically studied CoQ10 with superior absorption",
    "Supports cellular energy, not just stimulation",
    "Zero caffeine, so there is nothing to crash from",
    "Every dose printed on the front of the pack",
    "Supports muscle function with taurine",
    "Zero sugar, zero calories, no artificial colours",
    "Watermelon flavour, and not a sweet one",
    "Mixes clear in cold water in 30 seconds",
    "Built for daily, long term use",
    "Made in the USA",
  ],
  faqs: [
    { title: "How do I use Even Energy?", body: "One stick in 8 to 10 oz of cold water, once a day, in the morning. Stir for thirty seconds. That is the whole routine." },
    { title: "What is the formulation of the product?", body: "Taurine 1000 mg, CoQ10 150 mg, PEAK ATP 40 mg, plus vitamin B6 and B12. All of it printed on the front of the pouch with the doses rather than hidden inside a proprietary blend." },
    { title: "Is there really no caffeine in it?", body: "None. No caffeine, no guarana, no yerba mate, no green tea extract. Nothing in the stick has to wear off, which is why there is no crash after it." },
    { title: "Where is the formula produced?", body: "Made in the USA in a facility that follows current Good Manufacturing Practice." },
    { title: "How does it taste?", body: "Watermelon, and not a sweet one. Zero sugar and zero calories. It dissolves clear rather than sitting on top of the water." },
    { title: "Can I mix it with other products?", body: "Yes. It has no stimulants in it, so it sits alongside coffee, a protein shake, or anything else you already take." },
    { title: "What is the best time of the day to take it?", body: "Morning. It is not a stimulant, so it will not sit between you and your sleep, but the morning is the habit that sticks." },
    { title: "How long until I notice anything?", body: "This is something you feel over weeks, not minutes. Most people describe their afternoons changing before anything else does." },
    { title: "Can children use it?", body: "No. It is formulated for adults. Keep it out of reach of children." },
    { title: "Where should I store Even Energy?", body: "Somewhere cool and dry with the zip closed. Not the windowsill, and not the fridge." },
    { title: "Are there any side effects?", body: "Most people have none. If you are pregnant, breastfeeding, taking prescription medication, or managing a health condition, talk to your doctor before starting." },
    { title: "How long does the pouch last?", body: "One pouch is 30 stick packs, so a month at one a day." },
    { title: "Medical information, product, reviews, warnings and legal disclaimer", body: "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Results vary from person to person." },
  ],
  tint: "var(--sprout-tint)",
  accent: {
    bg: "linear-gradient(135deg, var(--sprout) 0%, var(--sprout-press) 100%)",
    press: "linear-gradient(135deg, var(--sprout-press) 0%, #4E9A55 100%)",
  },
};
