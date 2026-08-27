/** Everything the plans page says, kept out of the component. */

/** Split so the timeframe can carry the weight, which is where the eye lands. */
export const QUICK_BENEFITS = [
  { lead: "Reduces bloating and fluid retention in ", strong: "1 to 5 days" },
  { lead: "Eases hot flashes in as little as ", strong: "4 to 7 days" },
  { lead: "Induces deep, uninterrupted sleep in ", strong: "8 days" },
  { lead: "Starts shifting your weight in ", strong: "8 to 21 days" },
];

export const PILLARS = [
  {
    slug: "reduced-stress",
    title: "Reduces cortisol",
    body: "Contains blend of plant extracts shown to release stress and tension.",
  },
  {
    slug: "weight-loss",
    title: "Promotes weight management",
    body: "Contains blend of plant extracts shown to support cortisol, progesterone and estrogen levels to assist weight management and curb cravings.",
  },
  {
    slug: "better-sleep",
    title: "Improves sleep and overall well-being",
    body: "Improved formula shown to help with relaxation and restless sleep.",
  },
];

/* PLACEHOLDER REVIEWS. None of these people exist and none of these results were
   measured. Replace with real, documented customers before launch. */
export const HEADLINE_REVIEW = {
  name: "Simon M.",
  title: "Remarkable results for unwanted pounds and stress.",
  body: "I've been drinking the cortisol cocktail for three months, and the results have been nothing short of remarkable. My stress levels are much lower, and I've dropped 17 pounds without making major changes to my diet. The drink is tasty and easy to fit into my daily routine. I feel more relaxed and healthier than I have in years. Definitely recommend giving it a shot.",
};

export const REVIEWS = [
  {
    name: "Marcus O.",
    photo: "/photos/review-1.jpg",
    title: "Two months in, sixteen pounds down",
    body: "I was skeptical about anything that promises to fix stress. What changed first was not the scale, it was sleeping through instead of waking at three. The weight followed once I was not exhausted and reaching for sugar every afternoon.",
  },
  {
    name: "Dan W.",
    photo: "/photos/review-2.jpg",
    title: "The afternoon crash is gone",
    body: "A month in and the three o'clock write-off has stopped. It mixes clean and tastes like a mild orange squash, which matters when you are drinking it every morning. I am not white-knuckling my evenings any more.",
  },
  {
    name: "Priya N.",
    photo: "/photos/review-3.jpg",
    title: "Calmer, and nine pounds lighter",
    body: "I have taken enough powders to be suspicious of all of them. This one prints the milligrams on the front, which is the only reason I tried it. Two months on and I feel steadier than I have in years.",
  },
  {
    name: "Ellie B.",
    photo: "/photos/review-4.jpg",
    title: "It fits a morning that is already busy",
    body: "One scoop, thirty seconds, no pills to count. I tested cancelling in the first month on purpose and it took two clicks. I resubscribed the week after, which says more than the copy does.",
  },
];

/* PLACEHOLDER SCIENCE. Each claim below needs a citation and a regulatory pass before
   it goes live: as written they are structure and function claims about a supplement. */
export const INGREDIENTS: { slug: string; title: string; points: [string, string][] }[] = [
  {
    slug: "l-theanine",
    title: "L-Theanine",
    points: [
      ["Reduces stress-induced cortisol", "The amino acid in green tea. It raises GABA, serotonin and dopamine, which is the route by which it brings cortisol down under stress."],
      ["Takes the edge off without sedating", "It calms without making you drowsy, which is why there is no caffeine in the blend to work against it."],
    ],
  },
  {
    slug: "rhodiola-rosea",
    title: "Rhodiola rosea",
    points: [
      ["Aimed at fatigue, not sleep", "Studied for the flat, wrung-out feeling that follows long stress rather than for sedation."],
      ["Supports mental stamina", "Trialled for concentration and endurance in people working under sustained pressure."],
    ],
  },
  {
    slug: "myo-inositol",
    title: "Myo-Inositol",
    points: [
      ["Acts on insulin signalling", "Most studied in women with PCOS, where it improves how cells respond to insulin."],
      ["Steadies appetite", "Appetite and blood sugar move together, which is why this sits alongside the cortisol ingredients."],
    ],
  },
  {
    slug: "d-chiro-inositol",
    title: "D-Chiro Inositol",
    points: [
      ["Works in a ratio, not alone", "Paired with myo-inositol at the 40 to 1 ratio the research uses rather than dosed on its own."],
      ["Supports hormonal balance", "Studied alongside myo-inositol for ovarian function and cycle regularity."],
    ],
  },
  {
    slug: "ashwagandha",
    title: "Ashwagandha",
    points: [
      ["The extract the trials used", "KSM-66, the root extract most of the cortisol research was run on, at the dose those studies used."],
      ["Lowers serum cortisol", "In an eight week study of adults under chronic stress, the group taking it showed lower serum cortisol than placebo."],
    ],
  },
  {
    slug: "turmeric",
    title: "Turmeric",
    points: [
      ["Organic turmeric root", "Whole root rather than an isolated curcuminoid, which is the form most of the food research uses."],
      ["Paired so it is absorbed", "On its own turmeric mostly passes through you. The black pepper in the blend is what changes that."],
    ],
  },
  {
    slug: "phosphatidylserine",
    title: "Phosphatidylserine",
    points: [
      ["From sunflower, not soy", "SunPS sunflower seed extract, standardised to 20% phosphatidylserine."],
      ["Blunts the cortisol spike", "Trialled for the cortisol response to hard exercise and sustained mental strain."],
    ],
  },
  {
    slug: "black-pepper",
    title: "Black pepper extract",
    points: [
      ["Here for one job", "Piperine raises how much of the turmeric alongside it your body actually takes up."],
      ["A small dose does it", "It works at milligrams, which is why it sits at the end of the panel rather than the top."],
    ],
  },
];

export const COMPARISON = [
  "Intelligent cortisol support system",
  "Ingredients adapt to unique needs of your body",
  "Releases stress, improves mood and helps with metabolism",
  "Helps address symptoms of menopause and PCOS",
  "Plant-based formula",
  "Free from GMO, corn and gluten. Vegetarian friendly.",
  "Amazing orange flavor",
  "Amazing taste with 0 sugar",
  "Puts your cortisol levels into place",
  "Made in the USA",
];

export const FAQS = [
  { title: "How do I use Metabolic Morning Blend?", body: "One scoop in about 250 ml of water or juice, once a day, in the morning. Stir for ten seconds. That is the whole routine." },
  { title: "What is the formulation of the product?", body: "Eight active ingredients, printed on the front of the pouch with their doses rather than hidden inside a proprietary blend. The full panel is on the back." },
  { title: "Where is the formula produced?", body: "Made in the USA in a facility that follows current Good Manufacturing Practice." },
  { title: "How does it taste?", body: "Orange, mild, no sugar. It tastes like a light squash rather than a supplement." },
  { title: "Can I mix it with other products?", body: "Yes. It has no stimulants in it, so it sits alongside coffee, a protein shake, or anything else you already take." },
  { title: "Is it vegetarian friendly?", body: "Yes. The formula is plant based, and the phosphatidylserine comes from sunflower rather than soy." },
  { title: "What is the best time of the day to take it?", body: "Morning. Cortisol peaks shortly after you wake, which is the pattern the blend is built around." },
  { title: "Can children use it?", body: "No. It is formulated for adults. Keep it out of reach of children." },
  { title: "Where should I store Metabolic Morning Blend?", body: "Somewhere cool and dry with the zip closed. Not the windowsill, and not the fridge." },
  { title: "Are there any side effects?", body: "Most people have none. If you are pregnant, breastfeeding, taking prescription medication, or managing a health condition, talk to your doctor before starting." },
  { title: "How long does the bag last?", body: "One pouch is 30 servings, so a month at one scoop a day." },
  { title: "Medical information, product, reviews, warnings and legal disclaimer", body: "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Results vary from person to person." },
];

/* ---------------------------------------------------------------------------
   The page as one bundle.

   PlansScreen used to read these exports directly, which tied it to the diet
   funnel. It now takes a bundle, so a second funnel is a second content file and
   the structure of the page stays in one component for both.
   --------------------------------------------------------------------------- */

export type PlansContent = {
  /** Namespaces the answers read for the gendered illustrations. */
  quizId: string;
  productName: string;
  /** Right hand side of the offer bar. No countdown where a funnel has no deadline. */
  offer: { label: string; badge: string; countdown: boolean };
  hero: { title: string; lede: string; points: string[] };
  /** Product shot for the hero, the comparison table, and the plan cards. */
  productImage: string;
  plansTitle: string;
  /** The argument above the cards for taking the longer supply. */
  plansNote: { badge: string; body: string };
  quickBenefits: { lead: string; strong: string }[];
  /** `illustration` is a path. `slug` alone means the gendered pair under
      /illustrations, which only the diet funnel has drawn. */
  pillars: { slug: string; title: string; body: string; illustration?: string }[];
  headlineReview: { name: string; title: string; body: string };
  reviews: { name: string; photo: string; title: string; body: string }[];
  ingredientsTitle: string;
  ingredients: { slug: string; title: string; image?: string; points: [string, string][] }[];
  howItWorks: { img: string; title: string; body: string; illustration?: string }[];
  comparisonNote: string;
  comparison: string[];
  faqs: { title: string; body: string }[];
  /** The raised column behind our side of the comparison table. Defaults to the
      brand yellow the diet funnel uses. */
  tint?: string;
  /** Rebinds the accent button tokens, so a funnel's buttons match its product. */
  accent?: { bg: string; press: string };
};

export const DIET_PLANS_CONTENT: PlansContent = {
  quizId: "diet",
  productName: "Metabolic Morning Blend",
  offer: { label: "Limited time offer", badge: "up to 60% off", countdown: true },
  hero: {
    title: "Complete natural formula",
    lede: "SUNNYCELLS is here to release your stress and help you to lose weight.",
    points: ["Helps with weight loss", "Lowers cortisol levels", "Relieves mood swings"],
  },
  productImage: "/product/metabolic-morning-blend.png",
  plansTitle: "Let the Blend do the work",
  plansNote: {
    badge: "2x",
    body: "People using SUNNYCELLS for 3 months lose twice as much weight as for 1 month",
  },
  quickBenefits: QUICK_BENEFITS,
  pillars: PILLARS,
  headlineReview: HEADLINE_REVIEW,
  reviews: REVIEWS,
  ingredientsTitle: "The science behind the core ingredients of Metabolic Morning Blend",
  ingredients: INGREDIENTS.map((i) => ({ ...i, image: `/ingredients/${i.slug}.jpg` })),
  howItWorks: [
    { img: "step-scoop", title: "Add 1 scoop", body: "Mix a scoop into water or your favorite juice. Drink it in the morning.", illustration: "/illustrations/step-scoop.png" },
    { img: "step-drink", title: "Feel calmer and healthier", body: "Notice your cortisol blend take effect within 48 hours. Release stress and boost your metabolism.", illustration: "/illustrations/step-drink.png" },
  ],
  comparisonNote: "Compared to other cortisol lowering drinks",
  comparison: COMPARISON,
  faqs: FAQS,
};
