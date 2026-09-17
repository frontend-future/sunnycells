/**
 * The paid 1/3/6 month ladder for /quiz/itch/results/plans: same structure and
 * the same prices as the diet funnel's own PLANS (lib/quiz/plans.ts) and the
 * brain quiz's own ladder, just for jars of chews instead of pouches or
 * bottles. Kept in its own cart (ITCH_CART_ID) so it never touches another
 * product's checkout.
 */
import { PRODUCT } from "@/lib/products/dog-itch";
import { perDayLabel, SERVINGS_PER_POUCH, type Plan } from "./plans";

export const ITCH_CART_ID = "itch";

export const ITCH_PLANS: Plan[] = [
  {
    id: "i1",
    months: 1,
    label: "1 month supply",
    sub: "Ideal solution for trying out",
    image: "/quiz/itch/bottle-1.webp",
    price: 25,
    compareAt: 50,
    cadence: "Delivered fresh monthly",
  },
  {
    id: "i3",
    months: 3,
    label: "3 month supply",
    sub: "Great for building new habits",
    image: "/quiz/itch/bottle-3.webp",
    price: 23,
    compareAt: 50,
    cadence: "Delivered fresh every 60 days",
    flag: "Most popular",
    best: true,
  },
  {
    id: "i6",
    months: 6,
    label: "6 month supply",
    sub: "For achieving sustainable results",
    image: "/quiz/itch/bottle-6.webp",
    price: 21,
    compareAt: 50,
    cadence: "Delivered fresh every 90 days",
    flag: "Best value",
  },
];

export const itchPlanById = (id: string | undefined) =>
  ITCH_PLANS.find((p) => p.id === id) ?? ITCH_PLANS.find((p) => p.best) ?? ITCH_PLANS[0];

/** Jars, not pouches. Otherwise the same shape as planBullets in lib/quiz/plans.ts. */
export function itchPlanBullets(plan: Plan): string[] {
  const jars = plan.months;
  return [
    `${plan.months * SERVINGS_PER_POUCH} chews`,
    perDayLabel(plan.price),
    `${jars} ${jars === 1 ? "jar" : "jars"} delivered`,
    plan.cadence,
  ];
}

export type ItchOrderLine = {
  id: string;
  name: string;
  note: string;
  was: number | null;
  now: number | null;
  image: string | null;
};

export type ItchOrder = {
  /* EvenCheckout reads order.plan.name; lib/quiz/plans.ts calls the same field
     `label`. Carrying both keeps ItchPlanCards free to keep using the
     diet-shaped Plan type everywhere else on this page. */
  plan: Plan & { name: string };
  lines: ItchOrderLine[];
  listTotal: number;
  discount: number;
  total: number;
};

/** What the cart holds. Same contract as buildBrainLadderOrder. */
export function buildItchOrder(planId: string | undefined): ItchOrder {
  const plan = itchPlanById(planId);
  const now = plan.price * plan.months;
  const list = plan.compareAt * plan.months;
  const jars = `${plan.months} ${plan.months === 1 ? "jar" : "jars"}`;

  return {
    plan: { ...plan, name: plan.label },
    lines: [
      {
        id: "product",
        name: `${PRODUCT.name}, ${PRODUCT.form.toLowerCase()}`,
        note: `${jars}. ${plan.sub}.`,
        was: list,
        now,
        image: plan.image,
      },
      { id: "shipping", name: "Shipping", note: "Free on every order", was: null, now: 0, image: null },
    ],
    listTotal: list,
    discount: list - now,
    total: now,
  };
}
