import { planById } from "./plans.ts";
import type { Answers } from "./assessment.ts";

/* Relative imports carry their .ts extension so `node --test` can strip types and
   run this file directly; the bundler resolves it either way. */

/** Bonuses that come with any plan. Integer prices, like everything else. */
export const BONUSES = [
  { id: "guidebook", icon: "book-open", name: "Cortisol Blueprint guidebook", was: 27 },
  { id: "recipes", icon: "file-text", name: "Breakfast recipes to lower cortisol", was: 19 },
  { id: "shipping", icon: "truck", name: "Free shipping", was: 14 },
] as const;

export type OrderLine = { id: string; name: string; note: string; was: number; now: number | null };

export type Order = {
  months: number;
  lines: OrderLine[];
  /** What the pouches alone would have cost at the one-month price. */
  listTotal: number;
  bonusTotal: number;
  discount: number;
  total: number;
  strikeTotal: number;
};

/**
 * Turns the chosen plan into the order summary. Charged per delivery, so a three
 * month supply is three pouches at the plan's monthly price. Everything is an
 * integer, so the reference's .99 endings are not reproduced.
 */
export function buildOrder(answers: Answers): Order {
  const plan = planById(answers.plan);
  const months = plan.months;

  const now = plan.price * months;
  const list = plan.compareAt * months;
  const bonusTotal = BONUSES.reduce((n, b) => n + b.was, 0);

  const lines: OrderLine[] = [
    {
      id: "product",
      name: "Metabolic Morning Blend",
      note: `${months} ${months === 1 ? "pouch" : "pouches"}. Ships every ${months} ${months === 1 ? "month" : "months"}.`,
      was: list,
      now,
    },
    ...BONUSES.map((b) => ({ id: b.id, name: b.name, note: "Limited time offer", was: b.was, now: null })),
  ];

  return {
    months,
    lines,
    listTotal: list,
    bonusTotal,
    discount: list - now,
    total: now,
    strikeTotal: list + bonusTotal,
  };
}

export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois",
  "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
  "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];
