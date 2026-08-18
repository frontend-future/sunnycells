/**
 * The three supply lengths, as content. Prices are integers, which is the system's
 * hardest pricing rule, so the reference's .99 endings are not reproduced. Savings
 * read in dollars for the same reason: the one percentage the brand states is the
 * standing 50% off a first order.
 *
 * SUBSCRIPTIONS ONLY. There is no one-time option here because the brand does not
 * sell one, which is why the reference's one-time / subscribe toggle is absent.
 */
export type Plan = {
  id: string;
  months: number;
  label: string;
  /** One line under the label saying who the length suits. */
  sub: string;
  /** Charged per month. */
  price: number;
  /** The one-month price, struck through. */
  compareAt: number;
  flag?: string;
  best?: boolean;
  bullets: string[];
};

export const PLANS: Plan[] = [
  {
    id: "m1",
    months: 1,
    label: "1 month supply",
    sub: "Ideal solution for trying out",
    price: 79,
    compareAt: 119,
    bullets: ["30 servings", "$3 a day", "1 pouch delivered"],
  },
  {
    id: "m3",
    months: 3,
    label: "3 month supply",
    sub: "Great for building new habits",
    price: 54,
    compareAt: 119,
    flag: "Most chosen",
    best: true,
    bullets: ["90 servings", "$2 a day", "3 pouches delivered"],
  },
  {
    id: "m6",
    months: 6,
    label: "6 month supply",
    sub: "For achieving sustainable results",
    price: 39,
    compareAt: 119,
    flag: "Best value",
    bullets: ["180 servings", "$1 a day", "6 pouches delivered"],
  },
];

export const planById = (id: string) => PLANS.find((p) => p.id === id) ?? PLANS[1];
