/**
 * SC-23 Complete Collagen: the product the aging funnel sells, kept as content in one
 * file the way the other two products are.
 *
 * PLACEHOLDER FLAG: the quotes, review bodies and the rating count are written to
 * brand voice, not collected from customers. They read as real reviews, so they must
 * be replaced with genuine ones before this funnel takes traffic. The same standing
 * instruction the other two products carry.
 */

/* The cart rides in sessionStorage under its own id, reusing the quiz store rather
   than adding a second one. Keyed separately so it never collides with a funnel. */
export const CART_ID = "complete-collagen";

export const PRODUCT = {
  sku: "SC-23",
  name: "Complete Collagen",
  flavour: "Unflavored",
  servings: 38,
  netWeight: "300 g",
  image: "/product/complete-collagen.webp",
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

/* The same ladder the other two products use: one list price per pouch and the saving
   widening with the supply. The first month lands at half the list price, which is the
   standing 50% off a first order stated exactly. */
export const PLANS: Plan[] = [
  { id: "c1", months: 1, name: "1 month supply", sub: "Delivered fresh monthly", price: 27, compareAt: 54 },
  { id: "c3", months: 3, name: "3 month supply", sub: "Delivered every 3 months", price: 25, compareAt: 54, best: true },
  { id: "c6", months: 6, name: "6 month supply", sub: "Delivered every 6 months", price: 22, compareAt: 54 },
];

export function collagenPlanById(id: string | undefined): Plan {
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

export function buildCollagenOrder(planId: string | undefined): Order {
  const plan = collagenPlanById(planId);
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
        image: PRODUCT.image,
      },
      { id: "shipping", name: "Shipping", note: "Free on every order", was: null, now: 0, image: null },
    ],
    listTotal: list,
    discount: list - now,
    total: now,
  };
}

export const RATING = { score: 4.8, count: 9312 } as const;

export const SUBHEAD = "One ingredient, five collagen types";

export const DESCRIPTION =
  "Complete Collagen is hydrolyzed collagen and nothing else. Types I, II, III, V and X in one unflavored scoop, so it goes into coffee, water or a smoothie without changing what you are drinking. Zero sugar, zero junk, and the type list printed on the front of the pack.";

export const SERVING_NOTE = {
  title: "Get 38 servings of Complete Collagen",
  body: "One 7.8 g scoop a day in anything you already drink. Unflavored, dissolves without clumping, and 300 g in the pouch.",
} as const;

/* PLACEHOLDER reviews. Voice is ours, the people are not real. */
export const QUOTES = [
  {
    text:
      "I have taken enough collagen to be suspicious of all of it. This one is a single ingredient with the types printed on the front, which is the only reason I tried it. Four months in and my nails stopped splitting first.",
    name: "Nadia R.",
  },
  {
    text:
      "Unflavored actually means unflavored. It goes in my coffee and I cannot tell it is there, which is the whole reason I have kept taking it.",
    name: "Bea T.",
  },
  {
    text:
      "The change I noticed was not in the mirror, it was my hairbrush. There is less in it than there was.",
    name: "Corinne L.",
  },
] as const;
