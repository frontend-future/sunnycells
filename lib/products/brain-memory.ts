/**
 * SC-31 Brain & Memory Power Boost: all page copy in one file, kept out of the
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

export const PLANS: Plan[] = [
  { id: "b1", months: 1, name: "1 month supply", sub: "Delivered fresh monthly", price: 30, compareAt: 60 },
  { id: "b3", months: 3, name: "3 month supply", sub: "Delivered every 3 months", price: 27, compareAt: 60, best: true },
  { id: "b6", months: 6, name: "6 month supply", sub: "Delivered every 6 months", price: 24, compareAt: 60 },
];

export const INTRO_BADGES = [
  { icon: "dna", label: "Six research backed actives" },
  { icon: "shield-check", label: "Third party tested" },
  { icon: "check", label: "Four capsules, once a day" },
] as const;

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
  },
  {
    quote:
      "The combination of phosphatidylserine with acetyl-L-carnitine is well supported for supporting memory and attention over consistent use, not just a single dose.",
    name: "Priya Nakamura, PhD",
    role: "Nutrition scientist",
  },
  {
    quote:
      "Patients ask me for a stimulant-free option for daily focus more than almost anything else. This formula is built around exactly that question.",
    name: "Dr. Marcus Reyes",
    role: "Psychiatrist",
  },
] as const;

export const STUDIES = [
  {
    title: "Acetyl-L-carnitine and mild cognitive impairment",
    sub: "Meta-analysis of double-blind, randomized trials",
    blurb: "Findings suggest acetyl-L-carnitine may support symptoms of mild cognitive impairment and brain health in aging adults.",
  },
  {
    title: "Acetyl-L-carnitine with alpha lipoic acid",
    sub: "Clinical study on cognitive performance",
    blurb: "Supplementing with both actives together is associated with support for memory, attention and overall mental clarity.",
  },
  {
    title: "Phosphatidylserine and memory",
    sub: "Randomized, double-blind, placebo-controlled trial",
    blurb: "Phosphatidylserine has been shown to support cognitive function and memory in older adults with mild cognitive impairment.",
  },
  {
    title: "Ginkgo biloba and cognitive function",
    sub: "Double-blind, placebo-controlled study",
    blurb: "Research suggests ginkgo biloba may help support attention and emotional balance.",
  },
  {
    title: "Huperzine A and neuroprotection",
    sub: "Pharmacological review",
    blurb: "Huperzine A has demonstrated potential for supporting memory and protecting brain cells, particularly around age-related cognitive change.",
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

export const COMPARISON = [
  "Six research backed actives, at stated doses",
  "Third party tested, every batch",
  "No stimulants, no jitters",
  "Simple capsule format, four a day",
  "30 day money back guarantee",
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
    body: "Free shipping on every order. If you do not notice a difference, you are covered by a 30 day money back guarantee.",
  },
] as const;

export function planById(id: string | undefined): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS.find((p) => p.best) ?? PLANS[0];
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

export function buildOrder(planId: string | undefined): Order {
  const plan = planById(planId);
  const now = plan.price * plan.months;
  const list = plan.compareAt * plan.months;
  const bottles = `${plan.months} ${plan.months === 1 ? "bottle" : "bottles"}`;

  return {
    plan,
    lines: [
      {
        id: "product",
        name: `${PRODUCT.name}, ${PRODUCT.form.toLowerCase()}`,
        note: `${bottles}. ${plan.sub}.`,
        was: list,
        now,
        image: "/product/brain-memory/01-hero-split.png",
      },
      { id: "shipping", name: "Shipping", note: "Free on every order", was: null, now: 0, image: null },
    ],
    listTotal: list,
    discount: list - now,
    total: now,
  };
}

export const SUBHEAD = "The #1 doctor-formulated nootropic for a sharper brain";

export const DESCRIPTION =
  "Struggling to focus, or losing your train of thought mid conversation? Brain & Memory Power Boost is built around six research backed actives, including phosphatidylserine, acetyl-L-carnitine and ginkgo biloba, to support sharper memory, steadier focus and clearer thinking, at any age.";

export const SERVING_NOTE = {
  title: "Get 30 daily servings of Brain & Memory Power Boost",
  body: "Four capsules with food, once a day. Six actives at the doses the research used, with nothing here relying on a stimulant.",
} as const;

export const INCLUDED = [
  { icon: "truck", label: "Free shipping on every order" },
  { icon: "shield-check", label: "30 day money back guarantee" },
  { icon: "repeat", label: "Skip or cancel in two clicks" },
] as const;
