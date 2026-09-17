/**
 * The paid 1/3/6 month ladder for /quiz/joint/results/plans: same structure and
 * the same prices as the itch quiz's own ladder (lib/quiz/itchLadder.ts), just
 * for jars of joint chews instead. Kept in its own cart (JOINT_CART_ID) so it
 * never touches another product's checkout.
 */
import { PRODUCT } from "@/lib/products/dog-joint";
import { perDayLabel, SERVINGS_PER_POUCH, type Plan } from "./plans";

export const JOINT_CART_ID = "joint";

export const JOINT_PLANS: Plan[] = [
  {
    id: "j1",
    months: 1,
    label: "1 month supply",
    sub: "Ideal solution for trying out",
    image: "/quiz/joint/bottle-1.webp",
    price: 25,
    compareAt: 50,
    cadence: "Delivered fresh monthly",
  },
  {
    id: "j3",
    months: 3,
    label: "3 month supply",
    sub: "Great for building new habits",
    image: "/quiz/joint/bottle-3.webp",
    price: 23,
    compareAt: 50,
    cadence: "Delivered fresh every 60 days",
    flag: "Most popular",
    best: true,
  },
  {
    id: "j6",
    months: 6,
    label: "6 month supply",
    sub: "For achieving sustainable results",
    image: "/quiz/joint/bottle-6.webp",
    price: 21,
    compareAt: 50,
    cadence: "Delivered fresh every 90 days",
    flag: "Best value",
  },
];

export const jointPlanById = (id: string | undefined) =>
  JOINT_PLANS.find((p) => p.id === id) ?? JOINT_PLANS.find((p) => p.best) ?? JOINT_PLANS[0];

/** Jars, not pouches. Otherwise the same shape as planBullets in lib/quiz/plans.ts. */
export function jointPlanBullets(plan: Plan): string[] {
  const jars = plan.months;
  return [
    `${plan.months * SERVINGS_PER_POUCH} chews`,
    perDayLabel(plan.price),
    `${jars} ${jars === 1 ? "jar" : "jars"} delivered`,
    plan.cadence,
  ];
}

export type JointOrderLine = {
  id: string;
  name: string;
  note: string;
  was: number | null;
  now: number | null;
  image: string | null;
};

export type JointOrder = {
  /* EvenCheckout reads order.plan.name; lib/quiz/plans.ts calls the same field
     `label`. Carrying both keeps JointPlanCards free to keep using the
     diet-shaped Plan type everywhere else on this page. */
  plan: Plan & { name: string };
  lines: JointOrderLine[];
  listTotal: number;
  discount: number;
  total: number;
};

/** What the cart holds. Same contract as buildItchOrder. */
export function buildJointOrder(planId: string | undefined): JointOrder {
  const plan = jointPlanById(planId);
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
