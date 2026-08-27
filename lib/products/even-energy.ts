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

/** The three jobs the formula is built around, each with the dose that does it. The
    tick list is labelled, because Fuel's four are study outcomes and the other two
    lists are what the ingredient supports. */
export const PILLARS = [
  {
    key: "fuel",
    name: "Fuel",
    dose: "Ubiqsome\u00ae CoQ10 (150 mg)",
    photo: "/photos/even-fuel.webp",
    alt: "A woman in a sunlit kitchen holding a pouch of Even Energy beside her face",
    copy:
      "A phytosome based form of Coenzyme Q10, the molecule your mitochondria use to generate ATP. Unlike standard CoQ10, Ubiqsome\u00ae is formulated for far higher absorption into muscle and skin tissue.",
    ticksLabel: "Clinical results",
    ticks: [
      "48% increase in muscle CoQ10 levels at 2 weeks",
      "103% increase in skin CoQ10 levels",
      "Significant reduction in fatigue scores",
      "Improved handgrip strength and aerobic endurance",
    ],
  },
  {
    key: "restore",
    name: "Restore",
    dose: "Taurine (1,000 mg)",
    photo: "/photos/even-restore.webp",
    alt: "A woman in workout clothes after exercise holding up an Even Energy stick pack",
    copy:
      "A conditionally essential amino acid involved in muscle contraction, calcium signalling and cellular hydration. Human studies associate taurine intake with reduced fatigue and improved endurance, particularly in aging populations.",
    ticksLabel: "Supports",
    ticks: [
      "Muscle function and efficiency",
      "Antioxidant defense",
      "Faster recovery between efforts",
    ],
  },
  {
    key: "sustain",
    name: "Sustain",
    dose: "B6 + B12 + PEAK ATP\u00ae (40 mg)",
    photo: "/photos/even-sustain.webp",
    alt: "A pouch of Even Energy on a sunlit counter beside a tall glass of iced watermelon drink",
    copy:
      "B vitamins are essential for converting food into usable cellular energy. PEAK ATP\u00ae supports energy signalling pathways. Together they give your body the nutritional foundation to sustain output, with no stimulants and no crash.",
    ticksLabel: "Supports",
    ticks: [
      "Nutrient to energy conversion",
      "Red blood cell formation",
      "Nervous system function",
    ],
  },
] as const;

/** Read side by side against what the category normally sells. */
export const COMPARISON = {
  us: [
    "Clinically studied CoQ10 with superior absorption",
    "Supports cellular energy, not just stimulation",
    "Clinically shown to reduce fatigue",
    "Supports muscle function with taurine",
    "Zero caffeine. Zero sugar. Zero crash.",
    "Built for daily, long term use",
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
  "A daily energy support formula",
  "Built around clinically studied ingredients",
  "Designed for consistent, sustainable use",
  "Non stimulant, working at the cellular level",
] as const;

export const IS_NOT = [
  "A caffeine hit",
  "A pre workout stimulant",
  "A crash and burn energy drink",
  "A replacement for sleep or medical care",
  "A prescription medication",
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
export const SUBHEAD = "Clinically studied, reduced fatigue";

export const DESCRIPTION =
  "Fuel your body from the inside out with Even Energy so you can perform your best, whether in the gym or tackling the day. Formulated with clinically studied ingredients shown to reduce muscle fatigue, increase energy and improve cardiovascular function, with CoQ10, B vitamins and taurine.";

export const SERVING_NOTE = {
  title: "Get 30 servings of Even Energy",
  body: "Support your body through real life changes. Clinically shown to support improved physical performance and reduced fatigue over 8 weeks, powered by highly absorbable CoQ10.",
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
