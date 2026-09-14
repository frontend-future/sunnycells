/**
 * SC-27 Clear Mind: all page copy in one file, the way every other product keeps
 * its words out of markup so they can be edited without touching a component.
 *
 * PLACEHOLDER FLAG: the quotes, review bodies and the rating count are written to
 * brand voice, not collected from customers. They read as real reviews, so they
 * must be replaced with genuine ones before this page takes traffic. Same footing
 * as the placeholder reviews already flagged on Even Energy.
 *
 * PHOTOGRAPHY FLAG: no product photography was supplied for this SKU. The page
 * renders flat colour placeholders where a pack shot, ingredient close-up or
 * lifestyle photo belongs (see `.placeholder` in brain.module.css). Swap those
 * for real photography before launch.
 */

export const CART_ID = "brain";

export const PRODUCT = {
  sku: "SC-27",
  name: "Clear Mind",
  form: "Capsules",
  servings: 30,
  netWeight: "30 capsules",
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

/* Same ladder every SKU runs: one $50 list price per bottle, first month lands at
   $25, which is the standing 50% off first order stated exactly. */
export const PLANS: Plan[] = [
  { id: "b1", months: 1, name: "1 month supply", sub: "Delivered fresh monthly", price: 25, compareAt: 50 },
  { id: "b3", months: 3, name: "3 month supply", sub: "Delivered every 3 months", price: 23, compareAt: 50, best: true },
  { id: "b6", months: 6, name: "6 month supply", sub: "Delivered every 6 months", price: 21, compareAt: 50 },
];

/** The three jobs the formula is built around, each with the dose that does it. */
export const PILLARS = [
  {
    key: "focus",
    name: "Focus",
    dose: "Cognizin® Citicoline (250 mg)",
    alt: "A woman at a desk in a sunlit room, working with a bottle of Clear Mind beside her laptop",
    copy:
      "A patented, clinically studied form of citicoline that supports the brain’s supply of phosphatidylcholine, a building block of the membranes neurons use to send signals. Citicoline is one of the most researched nootropic actives for supporting attention and mental energy.",
    ticksLabel: "Clinical results",
    ticks: [
      "Improved attention scores in healthy adults",
      "Supports mental energy without stimulants",
      "Supports healthy brain phospholipid levels",
      "Studied at the exact dose used here",
    ],
  },
  {
    key: "clarity",
    name: "Clarity",
    dose: "Bacopa Monnieri (300 mg)",
    alt: "A woman reading with a notebook, a glass of water and a bottle of Clear Mind on the table",
    copy:
      "A herb used in Ayurvedic tradition for centuries and studied more recently for its role in memory and information recall. Human trials associate consistent bacopa intake with improved working memory over weeks of use, not minutes.",
    ticksLabel: "Supports",
    ticks: [
      "Memory formation and recall",
      "Reduced mental fatigue under load",
      "Cognitive performance with consistent use",
    ],
  },
  {
    key: "calm",
    name: "Calm focus",
    dose: "L-Theanine (200 mg)",
    alt: "A woman closing her eyes and breathing at her desk, a bottle of Clear Mind nearby",
    copy:
      "An amino acid found in tea leaves, studied for promoting a relaxed but alert mental state. Taken without caffeine, it supports steady attention rather than the wired, jittery focus a stimulant produces.",
    ticksLabel: "Supports",
    ticks: [
      "A relaxed, alert mental state",
      "Steadier attention under pressure",
      "Sleep quality when taken earlier in the day",
    ],
  },
] as const;

/** One row per trait, checked for us and crossed for the category default, the
    same list read against both columns rather than two different lists. */
export const COMPARISON = [
  "Clinically studied, stimulant free actives",
  "Citicoline, bacopa and l-theanine at stated doses",
  "No caffeine, no jitters, no crash",
  "Third party tested, every batch",
  "Vegan friendly capsules",
  "Fulfilled in the USA",
] as const;

export const IS = [
  "A daily cognitive support formula",
  "Built around clinically studied ingredients",
  "Designed for consistent, sustainable use",
  "Non stimulant, working at the cellular level",
] as const;

export const IS_NOT = [
  "A caffeine hit",
  "A study drug or prescription stimulant",
  "A crash and burn energy pill",
  "A replacement for sleep or medical care",
  "A prescription medication",
] as const;

export const EXPECT = [
  "A morning that starts clear without needing a second coffee",
  "Fewer moments of losing your train of thought",
  "Steadier attention through a long day of screens",
  "Improved recall when you need to remember something",
  "No jitters, no racing heart, no crash at three",
] as const;

export const BENEFITS = [
  { icon: "shield-check", name: "Third party tested", copy: "Every batch tested for identity, potency and heavy metals." },
  { icon: "repeat", name: "One capsule a day", copy: "Two capsules with breakfast. No powder, no mixing, no taste." },
  { icon: "zap-off", name: "Stimulant free", copy: "No caffeine, no jitters, no afternoon crash to plan around." },
] as const;

/* PLACEHOLDER reviews. Voice is ours, the people are not real. */
export const QUOTES = [
  {
    text:
      "I work from home and my afternoons used to disappear into scrolling. Two weeks in, I actually notice when my focus starts to drift now, and it does not drift as far or as often.",
    name: "Priya M.",
  },
  {
    text:
      "No jitters, no crash, just clearer thinking. I stopped needing a third coffee to get through a deposition prep.",
    name: "Renata H.",
  },
  {
    text:
      "I was skeptical about anything that is not caffeine actually doing something. This does. I read for longer without my mind wandering off the page.",
    name: "Devon K.",
  },
] as const;

export const REVIEWS = [
  {
    name: "Marisa T.",
    when: "2 weeks ago",
    title: "Took about three weeks for me",
    body:
      "Honestly, the first two weeks I figured I had wasted my money. Then one Thursday I realized I had read for an hour straight without checking my phone. It is subtle, not a light switch.",
  },
  {
    name: "Deb R.",
    when: "1 month ago",
    title: "Finally something that does not wire me",
    body:
      "I cannot do caffeine past noon, not even green tea. This has none in it and I still notice a difference by early afternoon, which I was not expecting.",
  },
  {
    name: "Angela K.",
    when: "1 month ago",
    title: "Fewer scattered afternoons",
    body:
      "It is not a miracle and I still get tired by evening. I just lose fewer hours to scrolling in the middle of the day. Two capsules with breakfast and I am done thinking about it.",
  },
  {
    name: "Priya S.",
    when: "2 months ago",
    title: "The memory piece is what got me",
    body:
      "I study for licensing exams on top of a full time job. Recall during practice tests improved more than my energy did during the day, which surprised me. The dose is printed right on the label.",
  },
] as const;

export const RATING = { score: 4.8, count: 1189 } as const;

export const FAQ = [
  {
    title: "What does Clear Mind do?",
    body: "It is a daily cognitive support formula built around three clinically studied, stimulant free ingredients: citicoline for focus and mental energy, bacopa monnieri for memory over weeks of use, and l-theanine for calm, jitter-free attention.",
  },
  {
    title: "How do I take it?",
    body: "Two capsules once a day, with food. Most people take it with breakfast. Consistency matters more than timing, since bacopa's memory effects build over weeks rather than minutes.",
  },
  {
    title: "Is it safe for daily use?",
    body: "Yes. Every batch is third-party tested for identity, potency and heavy metals. As with any supplement, check with your healthcare provider if you are pregnant, nursing, or taking medication.",
  },
  {
    title: "Will it feel like caffeine?",
    body: "No. There is no caffeine or other stimulant in this formula, so there is no jitteriness, no racing heart and no afternoon crash to plan around.",
  },
  {
    title: "What if it does not work for me?",
    body: "You are covered by a 30 day money back guarantee. If you do not notice a difference, contact us for a full refund.",
  },
] as const;

/** Look a plan up by id, falling back to the one most people choose. */
export function brainPlanById(id: string | undefined): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS.find((p) => p.best) ?? PLANS[0];
}

export type BrainOrderLine = {
  id: string;
  name: string;
  note: string;
  was: number | null;
  now: number | null;
  image: string | null;
};

export type BrainOrder = {
  plan: Plan;
  lines: BrainOrderLine[];
  listTotal: number;
  discount: number;
  total: number;
};

/**
 * What the cart holds. Charged is the per bottle price times the bottles that
 * arrive; the struck figure is the same count at the $50 list price, the rule
 * every plan card in the catalogue uses.
 */
export function buildBrainOrder(planId: string | undefined): BrainOrder {
  const plan = brainPlanById(planId);
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
        image: null,
      },
      { id: "shipping", name: "Shipping", note: "Free on every order", was: null, now: 0, image: null },
    ],
    listTotal: list,
    discount: list - now,
    total: now,
  };
}

export const SUBHEAD = "Clinically studied, stimulant free focus";

export const DESCRIPTION =
  "Support clearer thinking without the jitters or the crash. Clear Mind is formulated with clinically studied citicoline, bacopa monnieri and l-theanine, at the amounts the research used, so you can focus through a long day without reaching for another coffee.";

export const SERVING_NOTE = {
  title: "Get 30 servings of Clear Mind",
  body: "Support focus and memory through real days at a desk. Clinically studied actives, taken daily, with no stimulant to manage and nothing to crash from.",
} as const;

export const INCLUDED = [
  { icon: "truck", label: "Free shipping on every order" },
  { icon: "shield-check", label: "30 day money back guarantee" },
  { icon: "repeat", label: "Skip or cancel in two clicks" },
] as const;

export const HOW_IT_WORKS = [
  "Your first delivery ships as soon as you order.",
  "After that it repeats on the cadence you picked, at the same price.",
  "Change the date, skip a delivery, or cancel from your account.",
  "No lock in, no fee for stopping, no phone call.",
] as const;
