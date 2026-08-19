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
  /** Shows the number of pouches the delivery actually contains. */
  image: string;
  /** Charged per month. */
  price: number;
  /** The one-month price, struck through. */
  compareAt: number;
  flag?: string;
  best?: boolean;
};

/** One pouch is a month at one scoop a day. */
export const SERVINGS_PER_POUCH = 30;

/**
 * The per-day line, worked out from the price rather than written beside it, so it
 * cannot quietly stop being true when a price changes.
 *
 * Always a whole dollar: the system does not print decimals, which is also why the
 * six month plan reads "just over" rather than "$1.30". Under a third of a dollar
 * past the mark rounds down and says "just over", otherwise it rounds up and says
 * "less than". Either way the number in front of the customer is the honest side of
 * the real figure.
 */
export function perDayLabel(price: number): string {
  const perDay = price / SERVINGS_PER_POUCH;
  const floor = Math.floor(perDay);
  /* A price that divides exactly, $30 a month being $1 a day, is neither just over
     nor less than. Saying either would be a false claim about a price. */
  if (Number.isInteger(perDay)) return `$${perDay} / day`;
  return perDay - floor <= 0.35 && floor >= 1
    ? `Just over $${floor} / day`
    : `Less than $${Math.ceil(perDay)} / day`;
}

export function planBullets(plan: Plan): string[] {
  const pouches = plan.months;
  return [
    `${plan.months * SERVINGS_PER_POUCH} servings`,
    perDayLabel(plan.price),
    `${pouches} ${pouches === 1 ? "pouch" : "pouches"} delivered`,
  ];
}

export const PLANS: Plan[] = [
  {
    id: "m1",
    months: 1,
    label: "1 month supply",
    sub: "Ideal solution for trying out",
    image: "/product/metabolic-morning-blend.png",
    price: 79,
    compareAt: 119,
  },
  {
    id: "m3",
    months: 3,
    label: "3 month supply",
    sub: "Great for building new habits",
    image: "/product/pouch-3.png",
    price: 54,
    compareAt: 119,
    flag: "Most chosen",
    best: true,
  },
  {
    id: "m6",
    months: 6,
    label: "6 month supply",
    sub: "For achieving sustainable results",
    image: "/product/pouch-6.png",
    price: 39,
    compareAt: 119,
    flag: "Best value",
  },
];

export const planById = (id: string) => PLANS.find((p) => p.id === id) ?? PLANS[1];
