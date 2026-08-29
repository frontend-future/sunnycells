/**
 * SC-24 Daily Reds Gummies. Same shape as the other three product files: everything the
 * page says lives here, so the words can be edited without going near markup.
 *
 * PLACEHOLDER FLAGS, all of which must be settled before this page takes paid traffic:
 *
 *   1. THE FORMULA IS INVENTED. Eight red fruits, the acerola cherry vitamin C, the tart
 *      cherry and beet polyphenols and the fiber figure are product design, not a spec
 *      sheet. Replace with the real panel and the real amounts.
 *   2. Every review and every rating is written to brand voice. None of these people
 *      exist. Replace with permissioned customers.
 *   3. The vitamin C, fiber and polyphenol lines are structure/function claims and need
 *      the FDA disclaimer, which the page renders at the foot.
 *
 * What is NOT invented: the CDC fruit intake figure, which is cited in full on the page.
 */

export const CART_ID = "daily-reds";

export const PRODUCT = {
  sku: "SC-24",
  name: "Daily Reds Gummies",
  shortName: "Daily Reds",
  strapline: "Eight red fruits, four gummies, once a day",
  flavor: "Mixed Berry",
  servings: 28,
  perServing: "4 gummies",
  image: "/product/daily-reds.webp",
} as const;

export type Plan = {
  id: string;
  months: number;
  name: string;
  sub: string;
  price: number;
  compareAt: number;
  best?: boolean;
};

/* The house ladder: list price per month, halved on a first order, and the saving
   widening with the supply. Integers only. */
export const PLANS: Plan[] = [
  { id: "r1", months: 1, name: "1 month supply", sub: "Delivered fresh monthly", price: 22, compareAt: 44 },
  { id: "r3", months: 3, name: "3 month supply", sub: "Delivered every 3 months", price: 20, compareAt: 44, best: true },
  { id: "r6", months: 6, name: "6 month supply", sub: "Delivered every 6 months", price: 18, compareAt: 44 },
];

export function planById(id: string | undefined): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS.find((p) => p.best) ?? PLANS[0];
}

export type OrderLine = { id: string; name: string; note: string; was: number | null; now: number | null; image: string | null };
export type Order = { plan: Plan; lines: OrderLine[]; listTotal: number; discount: number; total: number };

export function buildOrder(planId: string | undefined): Order {
  const plan = planById(planId);
  const now = plan.price * plan.months;
  const list = plan.compareAt * plan.months;
  const boxes = `${plan.months} ${plan.months === 1 ? "box" : "boxes"}`;
  return {
    plan,
    lines: [
      { id: "product", name: `${PRODUCT.name}, ${PRODUCT.flavor.toLowerCase()}`,
        note: `${boxes} of 28 daily packs. ${plan.sub}.`, was: list, now, image: PRODUCT.image },
      { id: "shipping", name: "Shipping", note: "Free on every order", was: null, now: 0, image: null },
    ],
    listTotal: list, discount: list - now, total: now,
  };
}

/* PLACEHOLDER. Neither the score nor the count is measured. */
export const RATING = { score: 4.7, count: 3182 } as const;

export const GALLERY = [
  { src: "/product/daily-reds.webp", alt: "The Daily Reds box with a single daily pack leaning against it" },
  { src: "/product/reds-card-1.webp", alt: "What you are short on if you do not eat fruit" },
  { src: "/product/reds-card-2.webp", alt: "Nine in ten US adults do not eat enough fruit" },
  { src: "/product/reds-card-3.webp", alt: "Why this one gets finished" },
  { src: "/product/reds-card-4.webp", alt: "What arrives in the box" },
  { src: "/product/daily-reds-coral.webp", alt: "The box and daily pack with fresh red fruit" },
] as const;

export const HERO = {
  eyebrow: "Daily Reds Gummies",
  title: "Daily gummies made for",
  titleAccent: "those of us who don’t eat fruit.",
  /* The whole proposition in two sentences: skipping fruit costs you three specific
     things, and this puts those three back. Naming them is the point. A gummy that
     just says "supports wellness" is asking the reader to take the gap on faith. */
  lede:
    "Skipping fruit leaves three specific gaps: vitamin C, fiber and the polyphenols that make fruit red. Daily Reds puts all three back in four gummies you chew once a day, with nothing to blend or measure.",
  points: [
    "100% of your daily vitamin C, from acerola cherry",
    "3 g of fiber, the thing 95% of us fall short on",
    "Polyphenols from eight red fruits",
    "No added sugar, nothing to mix",
  ],
} as const;

/** Replaces the reference page's press-logo strip. Every line here is checkable. */
export const TRUST = [
  "Third-party tested every batch",
  "Made in a GMP-certified facility",
  "No added sugar",
  "30 day money back guarantee",
] as const;

export const MISSING = {
  title: "If you do not eat fruit, this is what you are short on",
  items: [
    { name: "Vitamin C", body: "Most people get theirs from fruit. Skip fruit and you run low on it, and you would not feel that happening." },
    { name: "Fiber", body: "The thing that keeps you regular. Fruit is the easiest place to get it, and it is the thing you are not eating." },
    { name: "Polyphenols", body: "The compounds that make fruit red in the first place. There is nowhere else to get them." },
  ],
} as const;

/* The one genuinely sourced number on the page. Fruit specifically, not fruit and
   vegetables, and stated as the share who fall short rather than the share who manage. */
export const GAP = {
  eyebrow: "You are not the only one",
  figure: "9 in 10",
  title: "US adults do not eat enough fruit.",
  body: "Not a little short. Short of the amount health authorities actually recommend. You probably already knew which side of that you are on.",
  stats: [
    { n: "8", label: "red fruits in one pack" },
    { n: "4", label: "gummies a day" },
    { n: "0 g", label: "added sugar" },
  ],
  image: "/photos/reds-fruit.webp",
  alt: "Strawberries, raspberries, cherries and pomegranate on a pale surface",
  source:
    "12.3% of US adults met the daily fruit intake recommendation. Lee SH et al., CDC MMWR 2022, from BRFSS 2019 data. Daily Reds is a supplement, not a substitute for eating fruit.",
} as const;

export const FINISH = {
  title: "You have tried this before. This one you will finish.",
  lede: "Every fruit habit dies for the same three reasons. So we removed all three.",
  steps: [
    { image: "/photos/reds-pour.webp", alt: "Gummies tipped from a daily pack into an open palm",
      title: "They taste like sweets", body: "Four gummies, chewed. If it tasted like a supplement you would stop, and we both know it." },
    { image: "/photos/reds-bag.webp", alt: "A daily pack tucked into the top of a handbag",
      title: "Nothing to wash up", body: "No blender, no shaker, no scoop. That is usually the bit that ends the habit by week two." },
    { image: "/photos/reds-hold.webp", alt: "A woman holding up a single gummy in a sunlit kitchen",
      title: "It fits in your bag", body: "Flat packs. One lives in your bag rather than at the back of a cabinet behind the flour." },
  ],
} as const;

export const INSIDE = {
  title: "What is in it",
  /* PLACEHOLDER FORMULA. Replace every line with the real panel. */
  groups: [
    { title: "Eight red fruits", body: "Strawberry, raspberry, tart cherry, pomegranate, cranberry, blackcurrant, acerola cherry and beet." },
    { title: "Vitamin C from acerola cherry", body: "Not synthetic ascorbic acid. Acerola is one of the densest natural sources there is." },
    { title: "Prebiotic fiber", body: "The part of fruit that feeds the bacteria already living in you." },
    { title: "No added sugar", body: "The fruit brings its own. Nothing else is added to make it palatable." },
  ],
} as const;

export const COMPARE = {
  title: "Daily Reds against the alternatives",
  usLabel: "Daily Reds",
  themLabel: "A greens powder",
  rows: [
    { label: "Tastes like something you want", sub: "The reason a jar gets finished rather than shelved" },
    { label: "Nothing to blend or wash", sub: "No shaker, no scoop, no sink" },
    { label: "Travels in a pocket", sub: "Flat single-serve packs rather than a tub" },
    { label: "Built around fruit", sub: "Not a green powder with fruit dusted on top" },
    { label: "No added sugar", sub: "The fruit brings its own" },
    { label: "Doses on the pack", sub: "No proprietary blend hiding the amounts" },
  ],
} as const;

/* PLACEHOLDER reviews. Voice is ours, the people are not real. */
export const QUOTE = {
  photo: "/photos/reds-smile.webp",
  text:
    "I have not voluntarily eaten a piece of fruit since I was about nineteen. I am not proud of it and I was not going to change it. This is the first thing I have taken past the second week, and the only reason is that it tastes like a sweet and lives in my bag.",
  name: "Dana W.",
  meta: "4 months in",
} as const;

export const REVIEWS = [
  { name: "Marcy H.", when: "3 weeks ago", title: "The first one I have finished",
    body: "I have a graveyard of half-used tubs under the sink. This is a flat pack in my bag and I have not missed a day, which has genuinely never happened before." },
  { name: "Ted K.", when: "1 month ago", title: "I eat almost no fruit, honestly",
    body: "Bought it because my doctor raised an eyebrow at my diet. Cannot tell you it has changed how I feel yet. Can tell you I am actually taking it, which is more than I managed with the powder." },
  { name: "Priya N.", when: "1 month ago", title: "Tastes like a sweet, which is the point",
    body: "If it tasted worthy I would have stopped. It does not. My kids keep trying to steal them, which is its own problem." },
  { name: "Rob A.", when: "2 months ago", title: "Regularity, mostly",
    body: "The honest report after two months is that the fiber part is doing something noticeable and the rest I am taking on faith. Worth it for that alone." },
] as const;

export const FAQ = [
  { q: "Is this a replacement for eating fruit?",
    a: "No, and we would not sell it that way. Whole fruit brings water, bulk and a mix of compounds no supplement matches. This is a floor under the days you do not get there, which for most people is most days." },
  { q: "How many do I take?",
    a: "Four gummies, once a day. That is one daily pack. There are 28 packs in a box, so a box is four weeks." },
  { q: "Does it have to be a subscription?",
    a: "Yes. It only does anything if you take it for months rather than weeks, and a subscription is the only version of that which actually happens. You can skip a delivery or cancel entirely in two clicks from your account." },
  { q: "When would I notice anything?",
    a: "The fiber tends to be the first thing people mention, usually inside a couple of weeks. Everything else is slower and harder to feel, which is why the guarantee runs 30 days and the supplies run longer." },
  { q: "What if I do not like them?",
    a: "Email us inside 30 days and we refund it. You keep the box. We are not going to ask you to post gummies back." },
  { q: "Is there added sugar?",
    a: "None. The fruit brings its own and nothing else is added to make them palatable." },
] as const;

export const INCLUDED = [
  { n: "28", label: "daily packs", body: "One a day for four weeks. Four gummies in each pack." },
  { n: "Free", label: "shipping", body: "On every order, every time, with no minimum." },
  { n: "30 days", label: "money back", body: "Email us and we refund it. You keep the box." },
  { n: "2 clicks", label: "to cancel", body: "Skip a delivery or stop entirely from your account." },
] as const;

export const DISCLAIMER =
  "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease. Daily Reds is a supplement and not a substitute for eating fruit and vegetables.";

/**
 * The supplement facts panel behind the "View nutrition label" link.
 *
 * EVERY NUMBER HERE IS INVENTED. A facts panel is the most regulated artifact on the
 * whole page: serving size, %DV, the ingredient order and the allergen and warning
 * statements are all things the FDA and FTC read literally, and a wrong one is a
 * recall rather than a typo. Nothing in this block may ship without coming off the
 * real certificate of analysis and a regulatory review.
 */
export const FACTS = {
  servingSize: "One pack (4 gummies)",
  servingsPerContainer: 28,
  suggestedUse: "Take one pack daily. Do not exceed one pack per day.",
  callout: {
    headline: "Only 4 g of net carbs",
    parts: [
      { n: "4 g", label: "Net carbs" },
      { n: "9 g", label: "Total carbs" },
      { n: "3 g", label: "Dietary fiber" },
      { n: "2 g", label: "Allulose" },
    ],
  },
  chips: ["Whole food fruits", "Vitamins and minerals", "Prebiotic fiber", "Antioxidants"],
  cleanChips: ["Vegan", "Gluten free", "Nut free", "Dairy free", "No artificial colors", "No artificial flavors"],
  rows: [
    { name: "Calories", amount: "35", dv: "" },
    { name: "Total Carbohydrate", amount: "9 g", dv: "3%**" },
    { name: "Dietary Fiber", amount: "3 g", dv: "11%**", indent: 1 },
    { name: "Total Sugars", amount: "3 g", dv: "†", indent: 1 },
    { name: "Includes 0 g Added Sugars", amount: "", dv: "", indent: 2 },
    { name: "Vitamin A (as beta-carotene)", amount: "270 mcg RAE", dv: "30%" },
    { name: "Vitamin C (from acerola cherry)", amount: "90 mg", dv: "100%" },
    { name: "Vitamin E (as d-alpha-tocopherol)", amount: "4.5 mg", dv: "30%" },
    { name: "Vitamin K (as menaquinone-7)", amount: "36 mcg", dv: "30%" },
    { name: "Zinc (as zinc citrate)", amount: "2.8 mg", dv: "25%" },
    { name: "Manganese (as manganese gluconate)", amount: "0.6 mg", dv: "26%" },
    { name: "Red Fruit Blend", amount: "1.2 g", dv: "†" },
  ],
  blendTitle: "Red Fruit Blend",
  blend:
    "Organic Strawberry Fruit Powder, Organic Raspberry Fruit Powder, Organic Tart Cherry Fruit Powder, Organic Pomegranate Fruit Powder, Organic Cranberry Fruit Powder, Organic Blackcurrant Fruit Powder, Organic Acerola Cherry Fruit Extract, Organic Beet Root Powder.",
  otherIngredients:
    "Allulose, Tapioca Fiber, Water, Pectin, Citric Acid, Natural Mixed Berry Flavor, Sodium Citrate, Organic Carnauba Wax, Fruit and Vegetable Juice (for color).",
  footnotes: [
    "** Percent Daily Values are based on a 2,000 calorie diet.",
    "† Daily Value not established.",
  ],
  caution:
    "CHILDREN, PREGNANT OR NURSING WOMEN should seek professional medical advice before taking this or any other dietary supplement. Keep out of reach of children.",
  storage: "Store in a cool, dry place after opening.",
} as const;

/* PLACEHOLDER faces. Generated, not customers. */
export const AVATARS = [
  "/photos/reds-avatar-1.webp",
  "/photos/reds-avatar-2.webp",
  "/photos/reds-avatar-3.webp",
  "/photos/reds-avatar-4.webp",
] as const;

/**
 * The education block. The reference page opens this with "over 35,000 research
 * publications support the ingredients", which is a count nobody can check and we are
 * not going to invent one. Each quadrant instead names the nutrient, what it does, and
 * where it normally comes from, which is the part this reader is actually missing.
 */
export const TRANSFORM = {
  title: "What fruit is actually doing for people who eat it",
  lede:
    "None of this is exotic. It is the ordinary work that fruit does every day in the people who eat it, and does not do in the people who do not.",
  image: "/product/daily-reds.webp",
  alt: "The Daily Reds box with a single daily pack",
  quadrants: [
    { icon: "shield-check", title: "Immunity",
      body: "Vitamin C supports normal immune function. Fruit is where most people get theirs, so skipping fruit is how most people end up short." },
    { icon: "leaf", title: "Digestion",
      body: "Fiber is what keeps things moving, and it is the nutrient Americans fall shortest on. Fruit is the easiest place in the diet to find it." },
    { icon: "droplet", title: "Skin",
      body: "Vitamin C is required to build collagen at all. Your body cannot make the protein that holds skin taut without it." },
    { icon: "dna", title: "Everyday steadiness",
      body: "Polyphenols are the compounds that color fruit. They are the part of fruit that no other food group replaces." },
  ],
} as const;

/**
 * The second sourced figure. Fiber rather than fruit, because it is the specific
 * shortfall that follows from not eating fruit and it is separately documented.
 */
export const GAP_SECOND = {
  figure: "5%",
  title: "of Americans meet the recommended daily fiber intake.",
  body: "Average intake sits around 16 g against a recommendation of 25 to 38 g. Fruit is the easiest place in an ordinary diet to close that.",
  source:
    "Quagliani D and Felt-Gunderson P, Closing America's Fiber Intake Gap, American Journal of Lifestyle Medicine, 2017.",
} as const;

/**
 * What third-party testing actually covers. This replaces the reference page's
 * post-purchase survey block, which reports percentages from a customer survey we have
 * not run. Everything here is a property of the testing regime rather than a claim
 * about outcomes, so it needs no substantiation beyond the certificate of analysis.
 */
export const TESTING = {
  title: "Snackable, packable, tested",
  lede:
    "Every batch goes to an independent lab before it goes in a box. Not because it is a nice line on a page, because gummies concentrate whatever was in the fruit.",
  items: [
    { title: "Heavy metals", body: "Lead, arsenic, cadmium and mercury, against California Proposition 65 limits." },
    { title: "Pesticides", body: "A multi-residue screen across the whole fruit blend." },
    { title: "Microbials", body: "Yeast, mould, salmonella, E. coli and total plate count." },
    { title: "Potency", body: "Vitamin C and fiber assayed against the label, not assumed from the recipe." },
  ],
  note: "Certificates of analysis are available on request for any batch, identified by the code printed on the box.",
} as const;

/* PLACEHOLDER testimonials for the carousel. None of these people exist. */
export const CAROUSEL = [
  { quote: "I have not eaten a piece of fruit on purpose since school. Two months in, the only thing I can honestly report is that I am regular for the first time in years, and that alone was worth it.",
    name: "Chelsea W.", photo: "/photos/reds-avatar-1.webp" },
  { quote: "Bought it to stop my wife asking. Stayed on it because it is four sweets and takes four seconds, which is about my limit for anything health related.",
    name: "Marcus B.", photo: "/photos/reds-avatar-2.webp" },
  { quote: "The powders always ended up under the sink. This is a flat pack in my handbag and I have not missed a day since March, which is genuinely a first.",
    name: "Ruth A.", photo: "/photos/reds-avatar-3.webp" },
  { quote: "I am not going to pretend I feel transformed. I will say I have stopped feeling vaguely guilty every time I walk past the fruit aisle.",
    name: "Owen T.", photo: "/photos/reds-avatar-4.webp" },
] as const;
