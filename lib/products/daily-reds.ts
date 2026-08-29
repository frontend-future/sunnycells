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

/** PLACEHOLDER. Point this at the real support inbox before the page takes traffic. */
export const SUPPORT_EMAIL = "support@sunnycells.com";

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

/* The house ladder. compareAt is the list price of a bag AT THAT SUPPLY, and every
   plan is exactly half of it: a bigger pack lists cheaper per bag, and the first order
   is half price whichever one you pick.

   It used to be a flat $50 list against $25/$23/$21, which made the 3 and 6 month
   plans 54% and 58% off while the flag, the banner, the sticky bar and the closing CTA
   all said 50%. Two of the three plans contradicted the only percentage in the brand.
   Integers only, and the halves land clean. */
export const PLANS: Plan[] = [
  { id: "r1", months: 1, name: "1 month supply", sub: "Delivered fresh monthly", price: 25, compareAt: 50 },
  { id: "r3", months: 3, name: "3 month supply", sub: "Delivered every 3 months", price: 23, compareAt: 46, best: true },
  { id: "r6", months: 6, name: "6 month supply", sub: "Delivered every 6 months", price: 21, compareAt: 42 },
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
  const bags = `${plan.months} ${plan.months === 1 ? "bag" : "bags"}`;
  return {
    plan,
    lines: [
      { id: "product", name: `${PRODUCT.name}, ${PRODUCT.flavor.toLowerCase()}`,
        note: `${bags} of 28 daily packs. ${plan.sub}.`, was: list, now, image: PRODUCT.image },
      { id: "shipping", name: "Shipping", note: "Free on every order", was: null, now: 0, image: null },
    ],
    listTotal: list, discount: list - now, total: now,
  };
}

/* PLACEHOLDER. Neither the score nor the count is measured. */
export const RATING = { score: 4.7, count: 3182 } as const;

export const GALLERY = [
  { src: "/product/daily-reds.webp", alt: "The Daily Reds bag with a single daily pack leaning against it" },
  { src: "/product/reds-card-1.webp", alt: "What you are short on if you do not eat fruit" },
  { src: "/product/reds-card-2.webp", alt: "Nine in ten US adults do not eat enough fruit" },
  { src: "/product/reds-card-3.webp", alt: "Why this one gets finished" },
  { src: "/product/reds-card-4.webp", alt: "What arrives in the bag" },
  { src: "/product/daily-reds-coral.webp", alt: "The bag and daily pack with fresh red fruit" },
] as const;

export const HERO = {
  title: "Daily gummies made for",
  titleAccent: "those of us who don’t eat fruit.",
  /* One line, because the bullets underneath carry the doses. */
  lede:
    "Four gummies a day to cover all the nutritional gaps that not eating fruit leaves behind.",
  points: [
    "100% of your daily vitamin C, from acerola cherry",
    "3 g fiber to help keep things moving",
    "Polyphenols from eight red fruits",
    "No added sugar, nothing to mix",
  ],
} as const;

/** Replaces the reference page's press-logo strip. Every line here is checkable. */
export const TRUST = [
  "Third-party tested every batch",
  "Made in the USA, GMP-certified facility",
  "Free shipping, arrives in 3 to 5 days",
  "30 day money back guarantee",
] as const;

/**
 * The header of the buy box: what it is, who it is for and what it does, restated at
 * the point of the decision rather than assumed from 3000px of page above it.
 */
export const BUYBOX = {
  lede: "Eight red fruits in four gummies, chewed once a day, covering what not eating fruit leaves you short on.",
  points: [
    "Supports skin, with 100% of your daily vitamin C",
    "Supports digestion, with 3 g of fiber",
    "Polyphenols from eight red fruits",
    "Third-party tested for heavy metals and potency",
  ],
} as const;

/**
 * The dated line above the buy box, in the format of the page this one is modelled on:
 * "Order by August 28th for 50% Off With Free Shipping". The date is today's, formatted
 * with the ordinal, and it is computed on the client so it is never stale.
 */
function ordinal(d: number): string {
  if (d > 3 && d < 21) return `${d}th`;
  return `${d}${["th", "st", "nd", "rd"][d % 10] ?? "th"}`;
}

export function orderLine(now: Date): string {
  const month = now.toLocaleDateString("en-US", { month: "long" });
  return `Order by ${month} ${ordinal(now.getDate())} for 50% Off With Free Shipping`;
}

export const MISSING = {
  title: "If you do not eat fruit, this is what you are short on",
  items: [
    { name: "Vitamin C", body: "Most people get theirs from fruit. Skip fruit and you run low on it, and you would not feel that happening." },
    { name: "Fiber", body: "The thing that keeps you regular. Fruit is the easiest place to get it, and it is the thing you are not eating." },
    { name: "Polyphenols", body: "The compounds that make fruit red in the first place. Coffee and tea carry their own kind. The red ones come from red fruit." },
  ],
} as const;

/* The one genuinely sourced number on the page. Fruit specifically, not fruit and
   vegetables, and stated as the share who fall short rather than the share who manage. */
export const GAP = {
  eyebrow: "You are not the only one",
  figure: "9 in 10",
  title: "US adults do not eat enough fruit.",
  body: "Only 12.3% hit the amount health authorities recommend. Not a little short of it, short of it. You probably already knew which side of that you are on.",
  stats: [
    { n: "8", label: "red fruits in one pack" },
    { n: "4", label: "gummies a day" },
    { n: "0 g", label: "added sugar" },
  ],
  image: "/photos/reds-fruit.webp",
  alt: "Strawberries, raspberries, cherries and pomegranate on a pale surface",
  source:
    "12.3% of US adults met the daily fruit intake recommendation. Lee SH et al., CDC MMWR 2022, from BRFSS 2019 data.",
} as const;

export const FINISH = {
  title: "You have tried this before. This one you will finish.",
  lede:
    "None of it counts if you stop. Fruit goes off in the bowl, tubs end up under the sink, tablets end up at the back of a drawer. Every one of them fails in the same place, so that is the part we built around.",
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
    { title: "Eight red fruits", body: "Strawberry, raspberry, tart cherry, pomegranate, cranberry, blackcurrant, acerola cherry and elderberry." },
    { title: "Vitamin C from acerola cherry", body: "Acerola is one of the densest natural sources there is, so the vitamin C comes out of the fruit rather than being added as a separate powder." },
    { title: "Prebiotic fiber", body: "The part of fruit that feeds the bacteria already living in you." },
    { title: "No added sugar", body: "The fruit brings its own. Nothing else is added to make it palatable." },
  ],
} as const;

/* PLACEHOLDER reviews. Voice is ours, the people are not real. */
export const ALTERNATIVES = {
  title: "Why not just do one of these instead",
  lede: "Three fair questions. We would rather answer them here than have you close the tab.",
  items: [
    { icon: "leaf", q: "Why not just eat fruit?",
      a: "You should, and it beats us on every measure except one: you are not going to. If you were, you would already be doing it, and a bowl of fruit going brown on the counter is worth nothing." },
    { icon: "shield-check", q: "Why not a multivitamin?",
      a: "A multivitamin covers the vitamins. It does not carry fiber or the polyphenols that come with red fruit, and most people abandon a tablet within a few months because there is no reason to look forward to it." },
    { icon: "repeat", q: "Why not a greens powder?",
      a: "Because you have to make it. A scoop, a shaker, a taste you tolerate and a thing to wash. That is why the tub is under your sink, and it is the whole reason this is four sweets instead." },
  ],
} as const;

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
    a: "That is what it is for. We cannot put a strawberry in a gummy and we are not going to pretend we can. What we can do is cover the nutrition fruit brings you: vitamin C, fiber and the polyphenols that make fruit red, in four gummies you will actually take." },
  { q: "How many do I take?",
    a: "Four gummies, once a day. That is one daily pack. There are 28 packs in a bag, so a bag is four weeks." },
  { q: "Does it have to be a subscription?",
    a: "Yes. It only does anything if you take it for months rather than weeks, and a subscription is the only version of that which actually happens. You can skip a delivery or cancel entirely in two clicks from your account." },
  { q: "When would I notice anything?",
    a: "The fiber tends to be the first thing people mention, usually inside a couple of weeks. Everything else is slower and harder to feel, which is why the guarantee runs 30 days and the supplies run longer." },
  { q: "What if I do not like them?",
    a: `Email ${SUPPORT_EMAIL} inside 30 days and we refund it. You keep the bag. We are not going to ask you to post gummies back.` },
  { q: "I bought six months. Is the guarantee still only 30 days?",
    a: `The 30 days runs from the day your first delivery arrives, and it refunds the whole order, not one bag of it. Email ${SUPPORT_EMAIL} inside that window and the full amount goes back. Keep whatever has already turned up.` },
  { q: "What do they taste like?",
    a: "Mixed berry. Sweet, chewy, closer to a fruit sweet than a supplement. That is deliberate: a gummy you have to talk yourself into is a gummy you stop taking in week three." },
  { q: "Is there added sugar?",
    a: "None. The fruit brings its own and nothing else is added to make them palatable." },
  { q: "What is not in them?",
    a: "No gelatin, no nuts, no dairy, no gluten, no artificial colors and no artificial flavors. They are vegan. The full panel is on the nutrition label." },
  { q: "When will it arrive?",
    a: "Orders leave the warehouse within one business day and land in 3 to 5 business days anywhere in the US. Shipping is free on every order with no minimum." },
  { q: "Where is it made?",
    a: "Made in the USA, in a facility that follows current Good Manufacturing Practice. Every batch goes to an independent lab before it ships." },
] as const;

export const INCLUDED = [
  { n: "28", label: "daily packs", body: "One a day for four weeks. Four gummies in each pack." },
  { n: "Free", label: "shipping", body: "On every order, every time, with no minimum." },
  { n: "30 days", label: "money back", body: "Email us and we refund it. You keep the bag." },
  { n: "2 clicks", label: "to cancel", body: "Skip a delivery or stop entirely from your account." },
] as const;

export const DISCLAIMER =
  "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.";

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
    "Organic Strawberry Fruit Powder, Organic Raspberry Fruit Powder, Organic Tart Cherry Fruit Powder, Organic Pomegranate Fruit Powder, Organic Cranberry Fruit Powder, Organic Blackcurrant Fruit Powder, Organic Acerola Cherry Fruit Extract, Organic Elderberry Fruit Powder.",
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
/**
 * The cost of the habit, stated as symptoms rather than nutrients. It runs high on the
 * page because a reader who does not eat fruit does not think of it as a problem yet.
 *
 * Every card is anchored to a mechanism that holds up on its own: vitamin C is a
 * required cofactor for collagen synthesis, vitamin C multiplies non-heme iron
 * absorption, fiber is what bulks and moves stool. Nothing here says Daily Reds fixes
 * a symptom, because that would be a disease claim we cannot make and cannot support.
 *
 * The graying card is the softest of the four. The peroxide mechanism is real (Wood JM
 * et al., FASEB J 2009) but nothing in the diet resets the genetic start date, so the
 * card says exactly that rather than implying otherwise. Cut it first if legal wants a
 * card cut.
 */
export const COST = {
  title: "What not eating fruit is costing you",
  lede: "It does not happen overnight. It shows up slowly, in the things you blame on getting older.",
  image: "/product/daily-reds.webp",
  alt: "The Daily Reds bag with a single daily pack",
  quadrants: [
    { icon: "droplet", title: "Wrinkles",
      body: "Your skin needs collagen to stay smooth. Your body needs vitamin C to make collagen. Fruit is where vitamin C comes from." },
    { icon: "leaf", title: "Bathroom trips you plan around",
      body: "Fiber is what keeps you regular. Fruit is the easiest place to get it. Skip the fruit and you are almost certainly not getting enough." },
    { icon: "dna", title: "Hair in the drain",
      body: "Hair thins when your iron runs low. Vitamin C is what helps your body absorb iron from food. Fruit is where you would normally get it." },
    { icon: "shield-check", title: "Gray before your friends",
      body: "Going gray is mostly your genes, and no food changes that. But hair also needs protection from damage, and that protection comes from plants." },
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
    "Every batch goes to an independent lab before it goes in a bag. Not because it is a nice line on a page, because gummies concentrate whatever was in the fruit.",
  items: [
    { title: "Heavy metals", body: "Lead, arsenic, cadmium and mercury, against California Proposition 65 limits." },
    { title: "Pesticides", body: "A multi-residue screen across the whole fruit blend." },
    { title: "Microbials", body: "Yeast, mould, salmonella, E. coli and total plate count." },
    { title: "Potency", body: "Vitamin C and fiber assayed against the label, not assumed from the recipe." },
  ],
  note: "Certificates of analysis are available on request for any batch, identified by the code printed on the bag.",
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
