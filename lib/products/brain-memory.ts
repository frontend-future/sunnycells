/**
 * Brain & Memory Power Boost: all page copy in one file, kept out of the
 * components the way every other product on this site does.
 *
 * SUBSTITUTION FLAG: the reference this was cloned from attributed its "expert
 * reviews" to real, identifiable people (a named neuropsychiatrist, a named
 * nutrition scientist) and a real clinic brand. Putting fabricated endorsement
 * quotes in a real person's name on our product is false endorsement, not a
 * copy problem, so EXPERTS below are fictional names in the same voice
 * instead. Confirm before launch that nothing here reads as a real person.
 *
 * PLACEHOLDER FLAG: REVIEWS are written to brand voice, not collected from
 * customers, same footing as every other product's placeholder reviews.
 */

export const CART_ID = "brain-memory";

export const PRODUCT = {
  sku: "SC-31",
  name: "Brain & Memory Power Boost",
  form: "Capsules",
  servings: 30,
  capsulesPerServing: 4,
  netWeight: "120 capsules",
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

/**
 * One offer, not a quantity ladder: the first bottle is free, only shipping is
 * charged today, and the subscription renews monthly at the regular price after
 * that. `price` here is what is charged for the PRODUCT today (0); the $10
 * shipping charge is its own line in buildOrder below, and `compareAt` is the
 * regular price the subscription renews at.
 */
export const PLAN: Plan = {
  id: "trial",
  months: 1,
  name: PRODUCT.name,
  sub: "Then $49 every month after your free first bottle, delivered automatically",
  price: 0,
  compareAt: 49,
};

export const SHIPPING_PRICE = 10;

/** Six actives, in the order the supplement facts panel lists them. */
export const INGREDIENTS = [
  {
    key: "alc",
    name: "Acetyl-L-Carnitine",
    dose: "665 mg",
    copy: "An amino acid the body makes naturally, playing a role in brain-cell energy production and in the neurotransmitters involved in memory and learning.",
  },
  {
    key: "nac",
    name: "N-Acetyl-L-Cysteine",
    dose: "400 mg",
    copy: "An antioxidant that helps protect cells from oxidative stress and is a precursor to glutathione, one of the body's own protective compounds.",
  },
  {
    key: "ala",
    name: "Alpha Lipoic Acid",
    dose: "200 mg",
    copy: "A vitamin-like antioxidant involved in converting blood sugar into usable cellular energy, working in both water and fat soluble environments.",
  },
  {
    key: "ginkgo",
    name: "Ginkgo Biloba Extract",
    dose: "120 mg",
    copy: "One of the most studied herbal extracts for cognitive health, supporting healthy circulation, including blood flow to the brain.",
  },
  {
    key: "ps",
    name: "Phosphatidylserine",
    dose: "100 mg",
    copy: "A phospholipid that makes up part of every cell membrane, at its highest concentration in brain cells, supporting attention and memory.",
  },
  {
    key: "huperzine",
    name: "Huperzine A",
    dose: "100 mcg",
    copy: "A compound traditionally used in Chinese herbal medicine, supporting the neurotransmitter activity most closely tied to memory and learning.",
  },
] as const;

export const BENEFITS = [
  { icon: "droplet", name: "Circulation", copy: "Supports healthy blood flow, including circulation to the brain." },
  { icon: "dna", name: "Memory", copy: "Supports short and long term memory with consistent daily use." },
  { icon: "zap-off", name: "Focus", copy: "Supports focus and mental clarity without any stimulant." },
] as const;

export const RATING = { score: 4.7, count: 914 } as const;

/** Fictional expert quotes. See SUBSTITUTION FLAG at the top of this file. */
export const EXPERTS = [
  {
    quote:
      "This is one of the more complete brain formulas I have reviewed. Six actives, each at a dose the research actually used, and nothing here relies on a stimulant to feel like it is working.",
    name: "Dr. Elena Cross",
    role: "Integrative physician",
    image: "/product/brain-memory/experts/expert-1.webp",
  },
  {
    quote:
      "The combination of phosphatidylserine with acetyl-L-carnitine is well supported for supporting memory and attention over consistent use, not just a single dose.",
    name: "Priya Nakamura, PhD",
    role: "Nutrition scientist",
    image: "/product/brain-memory/experts/expert-2.webp",
  },
  {
    quote:
      "Patients ask me for a stimulant-free option for daily focus more than almost anything else. This formula is built around exactly that question.",
    name: "Dr. Marcus Reyes",
    role: "Psychiatrist",
    image: "/product/brain-memory/experts/expert-3.webp",
  },
] as const;

export const TIMELINE = [
  {
    when: "Day 1",
    title: "Cell energy",
    copy: "Acetyl-L-carnitine begins fueling brain cell energy, while alpha lipoic acid and NAC start working as antioxidants from the first dose.",
  },
  {
    when: "Week 4",
    title: "Focus and recall",
    copy: "Phosphatidylserine and ginkgo biloba support memory circuits and healthy blood flow, which shows up in day to day focus and attention.",
  },
  {
    when: "Week 8",
    title: "Cognitive resilience",
    copy: "NAC and alpha lipoic acid continue reinforcing antioxidant defenses, supporting long term brain health with consistent use.",
  },
  {
    when: "Week 12",
    title: "Memory, supported",
    copy: "Huperzine A supports the neurotransmitter central to learning and memory. With continued use, expect steadier recall and cognitive stamina.",
  },
] as const;

export const FAQ = [
  {
    title: "How do I take Brain & Memory Power Boost?",
    body: "Take 4 capsules daily with food. Ask a nutritionally informed physician before taking more than the labeled amount.",
  },
  {
    title: "How soon will I notice a difference?",
    body: "Results vary by person. Many people notice a difference within 2 to 3 weeks, with the fuller effect building over 12 weeks of consistent use.",
  },
  {
    title: "Does it contain any allergens?",
    body: "No. This formula contains no milk or dairy, gluten, wheat, yeast, eggs, corn, soy, added sugars, or artificial colors or flavors.",
  },
  {
    title: "Who should take Brain & Memory Power Boost?",
    body: "This formula is designed for adults of any age looking for daily cognitive support.",
  },
  {
    title: "Who should not take it?",
    body: "Not recommended for pregnant or nursing women, or for people taking anticoagulant medication or with a serious heart condition. Check with your healthcare provider if you are unsure.",
  },
] as const;

/* PLACEHOLDER reviews. Voice is ours, the people are not real. */
export const REVIEWS = [
  {
    name: "Richard A.",
    when: "3 weeks ago",
    title: "This really helped me get back to myself",
    body: "I am now able to get back to the way I used to think. This is a wonderful product and I notice the difference every day.",
  },
  {
    name: "Floyd B.",
    when: "1 month ago",
    title: "More energy and clarity",
    body: "I seem to have more energy and clarity since I started taking it. Still a little early to say for sure, but I believe this is going to be very good.",
  },
  {
    name: "Dan B.",
    when: "2 months ago",
    title: "My memory has improved",
    body: "I have been using it for two months and I have noticed I can remember more numbers and details than before.",
  },
  {
    name: "Dayle N.",
    when: "6 months ago",
    title: "Years of consistent use",
    body: "I have been using it for years and it really helps me stay sharp.",
  },
  {
    name: "Mary W.",
    when: "2 months ago",
    title: "The ingredients matched what I researched",
    body: "This has many of the ingredients I had already seen research for when it comes to memory. Glad to find them together in one formula.",
  },
  {
    name: "Darren S.",
    when: "3 weeks ago",
    title: "Great ingredients, worth the wait",
    body: "This has great ingredients to support and boost memory and keep my brain healthy. It has been a few weeks and the longer I take it, the better I feel.",
  },
] as const;

/** The three collapsible rows under the buy button. */
export const QUICK_INFO = [
  {
    title: "Product description",
    body: "Brain & Memory Power Boost is a daily nootropic built around six research backed actives, including phosphatidylserine, acetyl-L-carnitine and ginkgo biloba, at the amounts studies have used, to support sharper thinking, focus and memory.",
  },
  {
    title: "How do I take it?",
    body: "Take 4 capsules daily with food. Consistency matters most, since the fuller effect builds over about 12 weeks of daily use.",
  },
  {
    title: "Shipping, returns & guarantee",
    body: "Your first bottle is free. You pay $10 shipping today, then $49 every month after that, shipped automatically. Cancel anytime. If you do not notice a difference, you are covered by a 30 day money back guarantee.",
  },
] as const;

/** No picker, so this always resolves to the one offer. Kept as a function so
    the checkout, which calls buildOrder(planId), does not need to change shape
    for a product with nothing to choose between. */
export function planById(): Plan {
  return PLAN;
}

export type OrderLine = {
  id: string;
  name: string;
  note: string;
  was: number | null;
  now: number | null;
  image: string | null;
};

export type Order = {
  plan: Plan;
  lines: OrderLine[];
  listTotal: number;
  discount: number;
  total: number;
};

/**
 * The free-trial order: the product itself is free, shipping is $10, and that
 * $10 is the only thing charged today. `listTotal` is the regular $49 the
 * subscription renews at, so "your saving" reads as the value of the free
 * bottle rather than as a discount on shipping.
 */
export function buildOrder(): Order {
  return {
    plan: PLAN,
    lines: [
      {
        id: "product",
        name: `${PRODUCT.name}, ${PRODUCT.form.toLowerCase()}`,
        note: "First bottle free.",
        was: PLAN.compareAt,
        now: 0,
        image: "/product/brain-memory/01-hero-split.png",
      },
      {
        id: "shipping",
        name: "Shipping",
        note: "Charged today",
        was: null,
        now: SHIPPING_PRICE,
        image: null,
      },
    ],
    listTotal: PLAN.compareAt,
    discount: PLAN.compareAt - SHIPPING_PRICE,
    total: SHIPPING_PRICE,
  };
}

export const SUBHEAD = "The #1 doctor-formulated nootropic for a sharper brain";

export const INCLUDED = [
  { icon: "truck", label: "$10 shipping, charged today" },
  { icon: "shield-check", label: "30 day money back guarantee" },
  { icon: "repeat", label: "Skip or cancel in two clicks" },
] as const;
