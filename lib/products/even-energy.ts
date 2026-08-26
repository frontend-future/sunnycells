/**
 * SC-22 Even Energy: all page copy in one file, the way the quiz keeps its
 * questions in a config. Nothing here is written into a component, so the words
 * can be edited without going near markup.
 *
 * PLACEHOLDER FLAG: the quotes, review bodies and the rating count are written to
 * brand voice, not collected from customers. They read as real reviews, so they
 * must be replaced with genuine ones before this page takes traffic. Same footing
 * as the placeholder reviews already flagged in readme.md.
 */

/* The cart rides in sessionStorage under its own id, reusing the quiz store rather
   than adding a second one. Keyed separately so it never collides with a funnel. */
export const CART_ID = "even-energy";

export const PRODUCT = {
  sku: "SC-22",
  name: "Even Energy",
  flavour: "Watermelon",
  servings: 30,
  netWeight: "71 g",
} as const;

/** One pouch is a month at one stick a day. Integers only, per the price rule. */
export type Plan = {
  id: string;
  months: number;
  name: string;
  sub: string;
  price: number;
  compareAt: number;
  best?: boolean;
};

/* Same ladder as SC-21 on the plans page: one $50 list price per pouch, and the
   saving widening the longer the supply. First month lands at $25, which is the
   standing 50% off first order stated exactly. */
export const PLANS: Plan[] = [
  { id: "e1", months: 1, name: "1 month supply", sub: "Delivered fresh monthly", price: 25, compareAt: 50 },
  { id: "e3", months: 3, name: "3 month supply", sub: "Delivered every 3 months", price: 23, compareAt: 50, best: true },
  { id: "e6", months: 6, name: "6 month supply", sub: "Delivered every 6 months", price: 21, compareAt: 50 },
];

/** The three jobs the formula is built around, each with the dose that does it. */
export const PILLARS = [
  {
    key: "fuel",
    name: "Fuel",
    dose: "CoQ10 150 mg",
    photo: "/photos/even-fuel.webp",
    alt: "A woman at a sunlit kitchen counter in the morning holding a glass of watermelon drink",
    copy:
      "Your mitochondria use CoQ10 to move electrons through the chain that ends in ATP. Levels fall with age and fall faster on a statin, and the cell makes less of what it runs on.",
    ticks: ["Supports cellular energy production", "Supports healthy heart function"],
  },
  {
    key: "sustain",
    name: "Sustain",
    dose: "Taurine 1000 mg",
    photo: "/photos/even-sustain.webp",
    alt: "A woman working at a bright desk in the afternoon with a glass of watermelon drink beside her",
    copy:
      "Taurine is one of the most abundant amino acids in muscle and it is not a stimulant. It supports the machinery already running rather than pushing on it harder.",
    ticks: ["Supports fatigue reduction", "No caffeine and nothing to crash from"],
  },
  {
    key: "restore",
    name: "Restore",
    dose: "PEAK ATP 40 mg",
    photo: "/photos/even-restore.webp",
    alt: "A woman in workout clothes after exercise holding a glass of watermelon drink",
    copy:
      "ATP is the currency every cell spends. PEAK ATP is a studied oral form, included at the 40 mg the research used rather than a dusting of it for the label.",
    ticks: ["Supports muscle function", "Studied at the dose on the pack"],
  },
] as const;

/** Read side by side against what the category normally sells. */
export const COMPARISON = {
  us: [
    "Zero stimulants, so there is nothing to come down from",
    "Doses printed on the front of the pack",
    "One stick, 2.4 g, mixes clear in cold water",
    "Zero sugar and zero calories",
    "Subscription you can skip or cancel in two clicks",
  ],
  them: [
    "150 to 300 mg of caffeine doing the work",
    "Proprietary blend hiding how little is in it",
    "A spike, then an afternoon worse than the one you started with",
    "Sugar, or a sweetener load to cover the taste",
    "Buy again whenever you notice you ran out",
  ],
} as const;

export const IS = [
  "A daily drink you take in the morning",
  "Built around three ingredients at studied doses",
  "Designed for stimulant sensitive people",
  "Something you feel over weeks, not minutes",
] as const;

export const IS_NOT = [
  "A pre workout",
  "A caffeine substitute that hides caffeine",
  "A crash and burn energy drink",
  "A replacement for sleep, or for a doctor",
] as const;

export const EXPECT = [
  "A morning that starts without needing a second coffee",
  "An afternoon that does not fall off a cliff at three",
  "Steadier output through a long day",
  "Improved recovery between hard efforts",
  "No jitters, no racing heart, no dependency",
] as const;

export const BENEFITS = [
  { icon: "shield-check", name: "Third party tested", copy: "Every batch tested for identity, potency and heavy metals." },
  { icon: "repeat", name: "One stick a day", copy: "Two point four grams in cold water. Thirty seconds, done." },
  { icon: "leaf", name: "Clean formula", copy: "Zero sugar, zero calories, no stimulants, no artificial colours." },
] as const;

/* PLACEHOLDER reviews. Voice is ours, the people are not real. */
export const QUOTES = [
  {
    text:
      "I stopped at one coffee instead of three and did not really notice until my husband pointed it out. Week three was when it turned.",
    name: "Marisa T.",
  },
  {
    text:
      "I am sensitive to caffeine to the point that green tea keeps me up. This does nothing to my heart rate, which is the whole reason I kept taking it.",
    name: "Deb R.",
  },
  {
    text:
      "The three o'clock thing was the worst part of my day for about four years. It is not gone but it is a dip now instead of a wall.",
    name: "Angela K.",
  },
] as const;

export const REVIEWS = [
  {
    name: "Marisa T.",
    when: "2 weeks ago",
    title: "Third week was the turn",
    body:
      "The first fortnight I honestly thought it was doing nothing. Then I got to a Thursday afternoon and realised I had not thought about coffee since breakfast. Watermelon is not too sweet, which I was worried about.",
    tag: "Steady energy",
  },
  {
    name: "Deb R.",
    when: "1 month ago",
    title: "Nothing to come down from",
    body:
      "I cannot take anything with caffeine in it. This has none, and it still does something. I take it at seven with cold water and it dissolves properly instead of sitting on top.",
    tag: "Stimulant free",
  },
  {
    name: "Angela K.",
    when: "1 month ago",
    title: "The afternoon dip is a dip now",
    body:
      "Not a miracle. I still get tired, I just get tired at a normal time instead of falling apart at three. Sticks are handy, I keep one in my bag.",
    tag: "Afternoon",
  },
  {
    name: "Priya S.",
    when: "2 months ago",
    title: "Recovery is the part I noticed",
    body:
      "I lift three times a week and the day after used to be a write off. That has changed more than my energy during the day has. Doses are on the front which is why I bought it.",
    tag: "Recovery",
  },
] as const;

export const REVIEW_TAGS = ["All", "Steady energy", "Stimulant free", "Afternoon", "Recovery"] as const;

export const RATING = { score: 4.8, count: 1247 } as const;

/** Look a plan up by id, falling back to the one most people choose. */
export function evenPlanById(id: string | undefined): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS.find((p) => p.best) ?? PLANS[0];
}

export type EvenOrderLine = {
  id: string;
  name: string;
  note: string;
  was: number | null;
  now: number | null;
  image: string | null;
};

export type EvenOrder = {
  plan: Plan;
  lines: EvenOrderLine[];
  listTotal: number;
  discount: number;
  total: number;
};

/**
 * What the cart holds. Charged is the per pouch price times the pouches that
 * arrive; the struck figure is the same count at the $50 list price, which is the
 * rule the plan cards use. Shipping is a line at zero rather than silence, so the
 * summary answers the question before it is asked.
 */
export function buildEvenOrder(planId: string | undefined): EvenOrder {
  const plan = evenPlanById(planId);
  const now = plan.price * plan.months;
  const list = plan.compareAt * plan.months;
  const pouches = `${plan.months} ${plan.months === 1 ? "pouch" : "pouches"}`;

  return {
    plan,
    lines: [
      {
        id: "product",
        name: `${PRODUCT.name}, ${PRODUCT.flavour.toLowerCase()}`,
        note: `${pouches}. ${plan.sub}.`,
        was: list,
        now,
        image: "/product/even-energy.webp",
      },
      { id: "shipping", name: "Shipping", note: "Free on every order", was: null, now: 0, image: null },
    ],
    listTotal: list,
    discount: list - now,
    total: now,
  };
}

/** The short line under the title. Sentence case: it is a micro-label, not a headline. */
export const SUBHEAD = "No stimulants, and nothing to come down from";

export const DESCRIPTION =
  "Caffeine moves energy around your day and charges you for the move. This gives your cells the raw material they spend instead: taurine 1000 mg, CoQ10 150 mg, PEAK ATP 40 mg, plus B6 and B12.";

export const SERVING_NOTE = {
  title: "30 sticks, a month at one a day",
  body: "2.4 g in 8 to 10 oz of cold water. Dissolves clear. Zero sugar, zero calories, watermelon and not a sweet one.",
} as const;

/** What every order carries, whatever the supply. */
export const INCLUDED = [
  { icon: "truck", label: "Free shipping on every order" },
  { icon: "shield-check", label: "30 day money back guarantee" },
  { icon: "repeat", label: "Skip or cancel in two clicks" },
] as const;

/** How the subscription behaves, stated plainly rather than buried in terms. */
export const HOW_IT_WORKS = [
  "Your first delivery ships as soon as you order.",
  "After that it repeats on the cadence you picked, at the same price.",
  "Change the date, skip a delivery, or cancel from your account.",
  "No lock in, no fee for stopping, no phone call.",
] as const;

/** Faces on the reviews link. Cropped from the photography, not stock portraits. */
export const AVATARS = [
  "/photos/even-avatar-1.webp",
  "/photos/even-avatar-2.webp",
  "/photos/even-avatar-3.webp",
] as const;
