/**
 * SC-23 Creatine + Collagen + Electrolytes: the product the aging funnel sells, kept as content in one
 * file the way the other two products are.
 *
 * PLACEHOLDER FLAG: the quotes, review bodies and the rating count are written to
 * brand voice, not collected from customers. They read as real reviews, so they must
 * be replaced with genuine ones before this funnel takes traffic. The same standing
 * instruction the other two products carry.
 */

/* The cart rides in sessionStorage under its own id, reusing the quiz store rather
   than adding a second one. Keyed separately so it never collides with a funnel. */
export const CART_ID = "creatine-collagen";

export const PRODUCT = {
  sku: "SC-23",
  name: "Creatine + Collagen + Electrolytes",
  /* The pack prints the full name, so nothing here shortens it. Where a line is too
     tight for all three, `shortName` is the one to use. */
  shortName: "Creatine + Collagen",
  strapline: "Daily Strength & Recovery Blend",
  flavour: "Raspberry Lemonade",
  servings: 30,
  netWeight: "330 g",
  image: "/product/creatine-collagen.webp",
} as const;

export type Plan = {
  id: string;
  months: number;
  name: string;
  sub: string;
  price: number;
  compareAt: number;
  best?: boolean;
  /** Shows the number of pouches the delivery actually contains, so a six month
      supply does not look like one bag. */
  image: string;
};

/* The same ladder the other two products use: one list price per pouch and the saving
   widening with the supply. The first month lands at half the list price, which is the
   standing 50% off a first order stated exactly. */
export const PLANS: Plan[] = [
  { id: "c1", months: 1, name: "1 month supply", sub: "Delivered fresh monthly", price: 29, compareAt: 58, image: "/product/creatine-collagen.webp" },
  { id: "c3", months: 3, name: "3 month supply", sub: "Delivered every 3 months", price: 26, compareAt: 58, best: true, image: "/product/creatine-collagen-3.webp" },
  { id: "c6", months: 6, name: "6 month supply", sub: "Delivered every 6 months", price: 23, compareAt: 58, image: "/product/creatine-collagen-6.webp" },
];

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
  const tubs = `${plan.months} ${plan.months === 1 ? "tub" : "tubs"}`;

  return {
    plan,
    lines: [
      {
        id: "product",
        name: `${PRODUCT.name}, ${PRODUCT.flavour.toLowerCase()}`,
        note: `${tubs}. ${plan.sub}.`,
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

export const SUBHEAD = "Strength, skin and hydration in one scoop";

export const DESCRIPTION =
  "Three things women over 35 are usually told to take separately, in one raspberry lemonade scoop. Creatine at 5 g for strength, collagen peptides at 10 g for skin, hair and nails, and electrolytes with vitamin C and D3 for what you lose in a workout. Every dose printed on the front of the tub.";

export const SERVING_NOTE = {
  title: "Get 30 servings of Creatine + Collagen + Electrolytes",
  body: "One scoop a day in 300 to 400 ml of water. Raspberry lemonade, dissolves without clumping, 30 servings in the tub.",
} as const;

/* PLACEHOLDER reviews. Voice is ours, the people are not real. */
export const QUOTES = [
  {
    text:
      "I was taking creatine out of one tub and collagen out of another and skipping both half the time. One scoop of this replaced the pair, and it is the first one I have actually finished.",
    name: "Nadia R.",
  },
  {
    text:
      "It tastes like a raspberry lemonade rather than like a supplement, which is the only reason I remember it. My nails were the first thing to change.",
    name: "Bea T.",
  },
  {
    text:
      "I lift three times a week and the day after used to wreck me. The electrolytes are doing something the plain collagen never did.",
    name: "Corinne L.",
  },
] as const;
