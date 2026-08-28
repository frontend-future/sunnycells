import type { PlansContent } from "./plansContent";

/**
 * Everything the aging plans page says. The page structure is the diet funnel's,
 * unchanged; this file is the swap. It keeps the diet funnel's yellow chrome, which is
 * what the brief asked for, while the product photography carries the jar's own mauve.
 */

/* PLACEHOLDER REVIEWS. None of these people exist and none of these results were
   measured. Replace with real, documented customers before launch. */
const HEADLINE_REVIEW = {
  /* A different woman from the four in the review row below. The same face under two
     names is the tell that gives a placeholder away. */
  photo: "/photos/collagen-skin.webp",
  name: "Nadia R.",
  title: "It replaced two jars and a bottle.",
  body: "I was taking creatine out of one jar, collagen out of another, and an electrolyte tablet when I remembered, which was maybe twice a week. One scoop of this replaced all three and it is the first one I have actually finished. My nails changed first, inside about a month. The strength side is slower and harder to see in a mirror, but I am not sore for two days after a session any more, and that I do notice.",
};

const REVIEWS = [
  { name: "Bea T.", photo: "/photos/collagen-avatar-1.webp", title: "It tastes like a drink, not a supplement", body: "Raspberry lemonade, and it means it. That sounds like a small thing but it is the whole reason I have kept taking it, where every chalky one ended up at the back of a cupboard." },
  { name: "Corinne L.", photo: "/photos/collagen-avatar-2.webp", title: "Nobody had ever suggested creatine to me", body: "Forty six, lifting twice a week, and every article I read was written for men. Turns out it is the most studied thing on the shelf and I had been avoiding it over a myth about bulking up." },
  { name: "Marguerite D.", photo: "/photos/collagen-avatar-3.webp", title: "Two months, and my nails are long", body: "I have not had nails past my fingertips since my thirties. They still bend, but they stopped tearing off, which is the part that mattered." },
  { name: "Suzanne P.", photo: "/photos/collagen-avatar-4.webp", title: "The recovery is what got me", body: "I bought it for my skin. What I actually noticed was getting up off the floor after gardening without the noise I usually make." },
];

export const AGING_PLANS_CONTENT: PlansContent = {
  quizId: "aging",
  productName: "Creatine + Collagen + Electrolytes",
  /* No countdown. 50% off a first order is a standing term of the brand, not a
     promotion, so it never carries a deadline. */
  offer: { label: "Standing offer", badge: "50% off first order", countdown: false },
  hero: {
    title: "Three in one scoop",
    lede: "SUNNYCELLS is here to cover strength, skin and hydration in one raspberry lemonade scoop.",
    points: ["5 g creatine and 10 g collagen peptides", "Electrolytes with vitamin C and D3", "Zero sugar, zero junk"],
  },
  productImage: "/product/creatine-collagen.png",
  plansTitle: "Let the scoop do the work",
  plansNote: {
    /* The badge carries the number the line is built on, the way the diet funnel's 2x
       does. A day count is more concrete than a multiple and it is the one figure here
       that is actually measurable. */
    badge: "28",
    body: "28 days of 5 g is what it takes to fill your muscle creatine stores. Collagen trials measure firmer skin at week 8. The 3 month supply clears both, with a month spare to feel it.",
  },
  quickBenefits: [
    { lead: "Dissolves in cold water in ", strong: "20 seconds" },
    { lead: "Creatine saturates in about ", strong: "4 weeks" },
    { lead: "Nails usually change first, in ", strong: "4 to 8 weeks" },
    { lead: "Hair is the slowest, give it ", strong: "3 to 6 months" },
  ],
  pillars: [
    { slug: "strength", title: "Strength", body: "Creatine at 5 g, the dose the trials used, for the lean muscle that goes with the collagen.", illustration: "/photos/collagen-joints.webp" },
    { slug: "skin", title: "Skin, hair and nails", body: "Collagen peptides at 10 g, hydrolyzed small enough to reach the layer under the surface.", illustration: "/photos/collagen-skin.webp" },
    { slug: "recovery", title: "Recovery", body: "Electrolytes with vitamin C and D3, replacing what a workout or a hot day takes out.", illustration: "/photos/cc-lifestyle.webp" },
  ],
  headlineReview: HEADLINE_REVIEW,
  reviews: REVIEWS,
  ingredientsTitle: "The science behind Creatine + Collagen + Electrolytes",
  ingredients: [
    {
      slug: "creatine",
      title: "Creatine monohydrate, 5 g",
      image: "/photos/cc-mix.webp",
      points: [
        ["The most studied supplement there is", "Hundreds of trials, and 5 g a day is the dose almost all of them used. It is not a stimulant and there is nothing to come down from."],
        ["Women are rarely offered it", "Usually on a worry about bulk that the research does not support. What it supports is holding onto the lean muscle you already have."],
      ],
    },
    {
      slug: "collagen",
      title: "Collagen peptides, 10 g",
      image: "/photos/collagen-skin.webp",
      points: [
        ["Hydrolyzed, so it is absorbed", "Whole collagen is too large to cross the gut wall. Hydrolysis cuts it into peptides small enough to be taken up and carried to the tissue."],
        ["Skin, hair and nails together", "They are built from the same protein scaffolding, which is why they tend to change at the same time."],
      ],
    },
    {
      slug: "electrolytes",
      title: "Electrolytes",
      image: "/photos/cc-flavour.webp",
      points: [
        ["What a workout takes out", "Sodium, potassium and magnesium are what you lose in sweat, and what a plain glass of water does not put back."],
        ["Why it is in a daily scoop", "Hydration is not only a gym problem. A hot day and a long afternoon do the same thing more slowly."],
      ],
    },
    {
      slug: "vitamins",
      title: "Vitamin C and D3",
      image: "/photos/cc-watercolour.webp",
      points: [
        ["Vitamin C is not decoration", "Your body cannot build collagen without it, so it is doing a job for the scoop it shares rather than padding the label."],
        ["D3 alongside it", "Commonly low, particularly through winter and particularly in women over 25."],
      ],
    },
    {
      slug: "nothing-else",
      title: "Zero sugar, zero junk",
      image: "/product/creatine-collagen.webp",
      points: [
        ["Every dose on the front", "5 g, 10 g and the electrolytes are printed on the jar rather than hidden inside a proprietary blend."],
        ["Raspberry lemonade, no sugar", "The flavour is there so you finish the jar. The sugar that usually comes with it is not."],
      ],
    },
  ],
  howItWorks: [
    { img: "step-scoop", title: "Add 1 scoop", body: "One scoop into 300 to 400 ml of cold water. It dissolves without clumping.", illustration: "/photos/cc-mix.webp" },
    { img: "step-drink", title: "Once a day, every day", body: "Creatine works by saturation rather than by dose, so the day you skip is the one that costs you.", illustration: "/photos/cc-flavour.webp" },
  ],
  comparisonNote: "Compared to buying the three separately",
  comparison: [
    "5 g creatine at the dose the trials used",
    "10 g hydrolyzed collagen peptides",
    "Electrolytes with vitamin C and D3",
    "Three supplements in one scoop",
    "Every dose printed on the front",
    "No proprietary blend hiding the amounts",
    "Raspberry lemonade with zero sugar",
    "Dissolves in cold water without clumping",
    "30 servings in every jar",
    "Made in the USA",
  ],
  faqs: [
    { title: "How do I use it?", body: "One scoop a day into 300 to 400 ml of cold water. Any time of day works, so pick the one you will remember." },
    { title: "What is actually in it?", body: "5 g creatine monohydrate, 10 g hydrolyzed collagen peptides, and electrolytes with vitamin C and D3. Every amount is printed on the front of the jar." },
    { title: "Will creatine make me bulky?", body: "No. That worry comes from bodybuilding marketing rather than from the research. Creatine supports the lean muscle you already have, and building visible size takes a training and eating programme built for it." },
    { title: "Do I need to load it?", body: "No. Loading gets you to saturation faster, but 5 g a day gets you to the same place in about four weeks with less chance of an upset stomach." },
    { title: "How long until I notice anything?", body: "Nails usually change first, often in four to eight weeks. Creatine saturates in about four weeks. Skin turns over about every four weeks, and hair is the slowest, so give it three to six months." },
    { title: "Does it taste of anything?", body: "Raspberry lemonade, with no sugar in it. It is flavoured on purpose: an unflavoured jar is the one that ends up at the back of a cupboard." },
    { title: "Where is the formula produced?", body: "Made in the USA in a facility that follows current Good Manufacturing Practice." },
    { title: "Can I take it with other supplements?", body: "Yes. There are no stimulants in it, so it sits alongside anything else you already take." },
    { title: "Is it suitable for vegetarians?", body: "No. Collagen is an animal protein, so there is no vegetarian version of it. Anything sold as vegan collagen is a blend of nutrients meant to support your own production instead." },
    { title: "Where should I store it?", body: "Somewhere cool and dry with the lid closed. Not the windowsill, and not the fridge." },
    { title: "Are there any side effects?", body: "Most people have none. If you are pregnant, breastfeeding, taking prescription medication, or managing a health condition, talk to your doctor before starting." },
    { title: "How long does a jar last?", body: "One jar is 30 servings, so a month at one scoop a day." },
    { title: "Medical information, product, reviews, warnings and legal disclaimer", body: "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Results vary from person to person." },
  ],
};
