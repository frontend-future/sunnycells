/**
 * The paid 1/3/6 month ladder for /quiz/brain/v2/results/plans: same structure and
 * the same prices as the diet funnel's own PLANS (lib/quiz/plans.ts), just for
 * bottles instead of pouches. This is a deliberate alternate to Brain & Memory
 * Power Boost's real free-trial offer (lib/products/brain-memory.ts): no free
 * bottle, no shipping charge, straight subscription pricing, kept in its own cart
 * (BRAIN_LADDER_CART_ID) so it never touches the real product's own cart or
 * checkout, which only ever knows how to build the free-trial order.
 */
import { PRODUCT } from "@/lib/products/brain-memory";
import { perDayLabel, SERVINGS_PER_POUCH, type Plan } from "./plans";

export const BRAIN_LADDER_CART_ID = "brain-v2";

export const BRAIN_PLANS: Plan[] = [
  {
    id: "b1",
    months: 1,
    label: "1 month supply",
    sub: "Ideal solution for trying out",
    image: "/quiz/brain/bottle-1.webp",
    price: 25,
    compareAt: 50,
    cadence: "Delivered fresh monthly",
  },
  {
    id: "b3",
    months: 3,
    label: "3 month supply",
    sub: "Great for building new habits",
    image: "/quiz/brain/bottle-3.webp",
    price: 23,
    compareAt: 50,
    cadence: "Delivered fresh every 60 days",
    flag: "Most popular",
    best: true,
  },
  {
    id: "b6",
    months: 6,
    label: "6 month supply",
    sub: "For achieving sustainable results",
    image: "/quiz/brain/bottle-6.webp",
    price: 21,
    compareAt: 50,
    cadence: "Delivered fresh every 90 days",
    flag: "Best value",
  },
];

export const brainPlanById = (id: string | undefined) =>
  BRAIN_PLANS.find((p) => p.id === id) ?? BRAIN_PLANS.find((p) => p.best) ?? BRAIN_PLANS[0];

/** Bottles, not pouches. Otherwise the same shape as planBullets in lib/quiz/plans.ts. */
export function brainPlanBullets(plan: Plan): string[] {
  const bottles = plan.months;
  return [
    `${plan.months * SERVINGS_PER_POUCH} servings`,
    perDayLabel(plan.price),
    `${bottles} ${bottles === 1 ? "bottle" : "bottles"} delivered`,
    plan.cadence,
  ];
}

export type BrainLadderOrderLine = {
  id: string;
  name: string;
  note: string;
  was: number | null;
  now: number | null;
  image: string | null;
};

export type BrainLadderOrder = {
  /* EvenCheckout (which this order is built for) reads order.plan.name for its
     tracking and notification copy; lib/quiz/plans.ts calls the same field
     `label`. Carrying both rather than renaming one keeps BrainPlanCards free to
     keep using the diet-shaped Plan type everywhere else on this page. */
  plan: Plan & { name: string };
  lines: BrainLadderOrderLine[];
  listTotal: number;
  discount: number;
  total: number;
};

/** What the cart holds. Same contract as buildEvenOrder in lib/products/even-energy.ts:
    charged is the per bottle price times the bottles that arrive, the struck figure is
    the same count at list price, and shipping is a line at zero rather than silence. */
export function buildBrainLadderOrder(planId: string | undefined): BrainLadderOrder {
  const plan = brainPlanById(planId);
  const now = plan.price * plan.months;
  const list = plan.compareAt * plan.months;
  const bottles = `${plan.months} ${plan.months === 1 ? "bottle" : "bottles"}`;

  return {
    plan: { ...plan, name: plan.label },
    lines: [
      {
        id: "product",
        name: `${PRODUCT.name}, ${PRODUCT.form.toLowerCase()}`,
        note: `${bottles}. ${plan.sub}.`,
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
