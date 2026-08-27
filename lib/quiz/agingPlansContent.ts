import type { PlansContent } from "./plansContent";

/**
 * Everything the aging plans page says. The page structure is the diet funnel's,
 * unchanged; this file is the swap. It keeps the diet funnel's yellow, which is what
 * the brief asked for until the product has a palette of its own.
 */

/* PLACEHOLDER REVIEWS. None of these people exist and none of these results were
   measured. Replace with real, documented customers before launch. */
const HEADLINE_REVIEW = {
  name: "Nadia R.",
  title: "One ingredient, and the types are on the front.",
  body: "I have taken enough collagen to be suspicious of all of it. Most of them are a proprietary blend with a scoop half full of things I did not ask for. This one is hydrolyzed collagen and nothing else, with the types printed on the front, which is the only reason I tried it. Four months in and my nails stopped splitting first, then the hair in my brush thinned out. My skin is the slowest of the three, which is what I was told to expect.",
};

const REVIEWS = [
  { name: "Bea T.", photo: "/photos/even-avatar-1.webp", title: "Unflavored actually means unflavored", body: "It goes in my coffee and I cannot tell it is there. That sounds like a small thing but it is the whole reason I have kept taking it, where every flavoured one ended up at the back of a cupboard." },
  { name: "Corinne L.", photo: "/photos/even-avatar-2.webp", title: "My hairbrush told me first", body: "The change I noticed was not in the mirror. There is less in the brush than there was, and I had quietly decided that was just my age." },
  { name: "Marguerite D.", photo: "/photos/even-avatar-3.webp", title: "Two months, and my nails are long", body: "I have not had nails past my fingertips since my thirties. They still bend, but they stopped tearing off, which is the part that mattered." },
  { name: "Suzanne P.", photo: "/photos/even-ugc-2.webp", title: "The knees were the surprise", body: "I bought it for my skin. What I actually noticed was getting up off the floor after gardening without the noise I usually make. I did not know collagen was in cartilage too." },
];

export const AGING_PLANS_CONTENT: PlansContent = {
  quizId: "aging",
  productName: "Complete Collagen",
  /* No countdown. 50% off a first order is a standing term of the brand, not a
     promotion, so it never carries a deadline. */
  offer: { label: "Standing offer", badge: "50% off first order", countdown: false },
  hero: {
    title: "One ingredient formula",
    lede: "SUNNYCELLS is here to replace the collagen your body has stopped making.",
    points: ["Types I, II, III, V and X", "Unflavored, goes in anything", "Zero sugar, zero junk"],
  },
  productImage: "/product/complete-collagen.png",
  plansTitle: "Let the collagen do the work",
  plansNote: {
    badge: "3x",
    body: "Skin turns over in about 4 weeks, nails in 3 to 6 months and hair slower still, so 3 months is where most people judge it",
  },
  quickBenefits: [
    { lead: "Dissolves in hot or cold in ", strong: "20 seconds" },
    { lead: "Nails usually change first, in ", strong: "4 to 8 weeks" },
    { lead: "Skin turns over about every ", strong: "4 weeks" },
    { lead: "Hair is the slowest, give it ", strong: "3 to 6 months" },
  ],
  pillars: [
    { slug: "skin", title: "Skin", body: "Types I and III are what the dermis is built from, the layer under the surface that keeps skin taut.", illustration: "/product/gallery/01-benefits.webp" },
    { slug: "hair-nails", title: "Hair and nails", body: "Built from the same protein scaffolding as your skin, which is why they tend to change together.", illustration: "/product/complete-collagen.webp" },
    { slug: "joints", title: "Joints", body: "Type II is the collagen in cartilage, with V and X in connective tissue and the growth plate.", illustration: "/product/gallery/06-in-the-glass.webp" },
  ],
  headlineReview: HEADLINE_REVIEW,
  reviews: REVIEWS,
  ingredientsTitle: "The science behind Complete Collagen",
  ingredients: [
    {
      slug: "type-i-iii",
      title: "Types I and III",
      image: "/product/complete-collagen.webp",
      points: [
        ["What your skin is made of", "Together they are the overwhelming majority of the collagen in your dermis, the layer under the surface that gives skin its firmness."],
        ["Also hair, nails and bone", "The same two types build the scaffolding in hair follicles and nail beds, which is why those tend to change together."],
      ],
    },
    {
      slug: "type-ii",
      title: "Type II",
      image: "/product/gallery/06-in-the-glass.webp",
      points: [
        ["The collagen in cartilage", "Type II is the main structural collagen in the cartilage between your joints rather than in skin."],
        ["Why one powder covers both", "It is the reason a collagen taken for skin is the same one people take to keep moving without paying for it the next day."],
      ],
    },
    {
      slug: "type-v-x",
      title: "Types V and X",
      image: "/product/gallery/02-ingredients.webp",
      points: [
        ["The two most formulas leave out", "Type V sits in connective tissue and the surface of cells; type X is found at the growth plate and in cartilage repair."],
        ["Five types, not one", "Most collagen powders are types I and III alone. Naming all five on the front is the point of the pack."],
      ],
    },
    {
      slug: "hydrolyzed",
      title: "Hydrolyzed, not whole",
      image: "/product/gallery/03-stick.webp",
      points: [
        ["Broken down to be absorbed", "Whole collagen is too large to cross the gut wall. Hydrolysis cuts it into peptides small enough to be taken up and carried to the tissue."],
        ["Which is why it is a powder", "It also dissolves in hot or cold liquid without gelling, so it goes into coffee without turning it into anything."],
      ],
    },
    {
      slug: "nothing-else",
      title: "Nothing else",
      image: "/product/gallery/05-supplement-facts.webp",
      points: [
        ["One line on the panel", "Hydrolyzed collagen is the whole formula. No proprietary blend, no sweetener, no filler taking up the scoop."],
        ["Unflavored on purpose", "Flavour is where the sugar and the sweeteners get in. Without it the powder goes into whatever you already drink."],
      ],
    },
  ],
  howItWorks: [
    { img: "step-scoop", title: "Add 1 scoop", body: "One 7.8 g scoop into coffee, water or a smoothie. Hot or cold, it dissolves either way.", illustration: "/illustrations/step-scoop.png" },
    { img: "step-drink", title: "Give it a few weeks", body: "Nails tend to change first, then hair, then skin. This is a habit rather than a hit, which is why the pouch is a month.", illustration: "/illustrations/step-drink.png" },
  ],
  comparisonNote: "Compared to other collagen powders",
  comparison: [
    "Five collagen types, I, II, III, V and X",
    "Hydrolyzed peptides, sized to be absorbed",
    "One ingredient, printed on the front",
    "No proprietary blend hiding the amounts",
    "Unflavored, so it goes in anything",
    "Zero sugar and no sweeteners",
    "No fillers taking up the scoop",
    "Dissolves in hot or cold without gelling",
    "38 servings in a 300 g pouch",
    "Made in the USA",
  ],
  faqs: [
    { title: "How do I use Complete Collagen?", body: "One 7.8 g scoop a day into coffee, water, tea or a smoothie. Hot or cold both work, and it dissolves without gelling." },
    { title: "What is actually in it?", body: "Hydrolyzed collagen and nothing else, covering types I, II, III, V and X. There is no proprietary blend, no sweetener and no filler." },
    { title: "Does it really taste of nothing?", body: "It is unflavored. In coffee or a smoothie most people cannot tell it is there. In plain water you may notice a faint savoury note." },
    { title: "How long until I notice anything?", body: "Nails usually change first, often in four to eight weeks. Skin turns over about every four weeks. Hair is the slowest, so give it three to six months before you judge it." },
    { title: "Why five types rather than one?", body: "Different types build different tissue. I and III are skin, hair and nails, II is cartilage, and V and X sit in connective tissue. Most powders carry only I and III." },
    { title: "Where is the formula produced?", body: "Made in the USA in a facility that follows current Good Manufacturing Practice." },
    { title: "Can I take it with other supplements?", body: "Yes. It has no stimulants and no active beyond the collagen itself, so it sits alongside anything else you already take." },
    { title: "What is the best time of day to take it?", body: "Whenever you will remember. Most people put it in their morning coffee, which is the habit that sticks." },
    { title: "Is it suitable for vegetarians?", body: "No. Collagen is an animal protein, so there is no vegetarian or vegan version of it. Anything sold as vegan collagen is a blend of nutrients meant to support your own production instead." },
    { title: "Where should I store it?", body: "Somewhere cool and dry with the zip closed. Not the windowsill, and not the fridge." },
    { title: "Are there any side effects?", body: "Most people have none. If you are pregnant, breastfeeding, taking prescription medication, or managing a health condition, talk to your doctor before starting." },
    { title: "How long does the pouch last?", body: "One pouch is 300 g, which is 38 scoops, so about five weeks at one a day." },
    { title: "Medical information, product, reviews, warnings and legal disclaimer", body: "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Results vary from person to person." },
  ],
};
