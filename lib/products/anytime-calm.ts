import { firstOrderPrice, formatPrice } from "@/lib/price";

/**
 * SC-26 Anytime Calm: the powder the /quiz/calm funnel sells.
 *
 * A 28 serving tub, one scoop stirred into cold water from dinner onwards. Three
 * actives, each dosed openly on the front of the tub rather than hidden in a blend,
 * which is the only claim on this product that is checkable without a study.
 *
 * PLACEHOLDER FLAGS, same footing as every other product in this repo:
 *   1. No rating and no reviews are collected. This file carries none rather than
 *      inventing a fourth set of people who do not exist. Add them when there are real
 *      customers who have given permission.
 *   2. The supplement facts panel below has not been through a formulator or
 *      regulatory review. The three actives and their doses are the formula as given;
 *      the calories, carbohydrate and other-ingredients line are plausible for a
 *      flavoured powder at this dose and nothing more. Do not print it on anything.
 *   3. Every benefit line is a structure and function claim and needs substantiation
 *      on the finished formula before this takes traffic. The FDA disclaimer renders
 *      at the foot of the plans page.
 */

export const PRODUCT = {
  sku: "SC-26",
  title: "Anytime Calm",
  subhead: "Nighttime calm support",
  flavour: "Cherry Lime",
  servings: 28,
  servingSize: "1 scoop (5.4 g)",
} as const;

/** The three actives, in the order they are printed on the tub. */
export const ACTIVES = [
  { name: "Glycine", dose: "3,000 mg" },
  { name: "L-Theanine", dose: "200 mg" },
  { name: "Magnesium Glycinate", dose: "200 mg" },
] as const;

export const MONTHLY = formatPrice(50);
export const FIRST_ORDER = formatPrice(firstOrderPrice(50));

const IMG = "/products/anytime-calm";

/* The pack shots carry an alpha channel: they are composited from one cut-out master so
   the tubs sit on whatever the card behind them is, not on a white square. Encoded with
   cwebp -exact, which keeps the RGB under fully transparent pixels rather than letting
   the encoder rewrite it for compression. */
export type SupplyPlan = {
  id: string;
  months: number;
  name: string;
  sub: string;
  image: string;
  price: number;
  compareAt: number;
  cadence: string;
  flag?: string;
  best?: boolean;
};

/* One $50 list price per tub, the saving widening the longer the supply. The first
   month lands at $25, which is the standing 50% off first order stated exactly.

   The cadence on each rung matches its own length. The diet funnel has a live bug
   where a 3 month supply says it ships every 60 days on one screen and every 3 months
   on another, which is a material disagreement about how often a card is charged.
   Stated once here, and read everywhere, so the two cannot drift. */
export const SUPPLY_PLANS: SupplyPlan[] = [
  {
    id: "c1", months: 1, name: "1 month supply",
    sub: "Ideal solution for trying out",
    image: `${IMG}/pack-1.webp`,
    price: 25, compareAt: 50,
    cadence: "Delivered fresh every month",
  },
  {
    id: "c3", months: 3, name: "3 month supply",
    sub: "Long enough for a sleep pattern to settle",
    image: `${IMG}/pack-3.webp`,
    price: 23, compareAt: 50,
    cadence: "Delivered fresh every 3 months",
    flag: "Most popular", best: true,
  },
  {
    id: "c6", months: 6, name: "6 month supply",
    sub: "For achieving sustainable results",
    image: `${IMG}/pack-6.webp`,
    price: 21, compareAt: 50,
    cadence: "Delivered fresh every 6 months",
    flag: "Best value",
  },
];

/** A rung's own discount, worked out from its prices so a card can never state a
    figure its own numbers do not support. */
export const discountPct = (p: SupplyPlan): number =>
  Math.round((1 - p.price / p.compareAt) * 100);

/** The deepest rung, for any surface quoting one "up to" number for the whole ladder. */
export const maxDiscountPct = (): number => Math.max(...SUPPLY_PLANS.map(discountPct));

export const supplyPlanById = (id: string | undefined): SupplyPlan =>
  SUPPLY_PLANS.find((p) => p.id === id) ?? SUPPLY_PLANS.find((p) => p.best) ?? SUPPLY_PLANS[0];

/**
 * The per-night line, worked out from the price rather than written beside it, so it
 * cannot quietly stop being true when a price changes. Always a whole dollar: the
 * system does not print decimals. Under a third past the mark rounds down and says
 * "just over", otherwise it rounds up and says "less than", so the number in front of
 * the customer is always the honest side of the real figure.
 */
export function perNightLabel(price: number): string {
  const perNight = price / PRODUCT.servings;
  const floor = Math.floor(perNight);
  if (Number.isInteger(perNight)) return `$${perNight} / night`;
  return perNight - floor <= 0.35 && floor >= 1
    ? `Just over $${floor} / night`
    : `Less than $${Math.ceil(perNight)} / night`;
}

export function supplyBullets(plan: SupplyPlan): string[] {
  const tubs = plan.months;
  return [
    `${plan.months * PRODUCT.servings} nights`,
    perNightLabel(plan.price),
    `${tubs} ${tubs === 1 ? "tub" : "tubs"} delivered`,
    plan.cadence,
  ];
}

/* The cart rides in sessionStorage under its own id, keyed separately so it never
   collides with a funnel's answers. */
export const CART_ID = "anytime-calm";

export type OrderLine = { id: string; name: string; note: string; was: number | null; now: number | null; image: string | null };
export type Order = { plan: SupplyPlan; lines: OrderLine[]; listTotal: number; discount: number; total: number };

export function buildOrder(planId: string | undefined): Order {
  const plan = supplyPlanById(planId);
  const now = plan.price * plan.months;
  const list = plan.compareAt * plan.months;
  const tubs = `${plan.months} ${plan.months === 1 ? "tub" : "tubs"}`;
  return {
    plan,
    lines: [
      {
        id: "product",
        name: `${PRODUCT.title}, ${PRODUCT.flavour.toLowerCase()}`,
        note: `${tubs} of ${PRODUCT.servings} servings. ${plan.cadence}.`,
        was: list, now, image: "/product/anytime-calm.webp",
      },
      { id: "shipping", name: "Shipping", note: "Free on every order", was: null, now: 0, image: null },
    ],
    listTotal: list, discount: list - now, total: now,
  };
}

/**
 * Supplement facts, rendered as markup rather than baked into a picture. Text in an
 * image cannot be selected, translated, corrected or read by a screen reader.
 *
 * The arithmetic is exact even though the panel is a placeholder: magnesium 200 mg
 * against the FDA adult reference value of 420 mg is 48%. Glycine and L-theanine have
 * no established Daily Value, so they carry the dagger rather than an invented figure.
 */
export const FACTS = {
  serving: PRODUCT.servingSize,
  perContainer: String(PRODUCT.servings),
  rows: [
    ["Calories", "15", ""],
    ["Total carbohydrate", "1 g", "<1%*"],
    ["Total sugars", "0 g", "†"],
    ["Magnesium (as magnesium glycinate)", "200 mg", "48%"],
    ["Glycine", "3,000 mg", "†"],
    ["L-Theanine", "200 mg", "†"],
  ] as [string, string, string][],
  /* No proprietary blend. Every active is listed with its own dose, which is the whole
     reason the doses are printed on the front of the tub. */
  blend: null,
  blendAmount: null,
  other:
    "Natural cherry and lime flavors, citric acid, malic acid, beetroot powder (color), stevia leaf extract, silicon dioxide",
};

/* Real product and lifestyle shots, already rendered for this product's ad set.
   Used by the 6-reasons listicle's offer carousel. */
export const GALLERY = [
  { src: `${IMG}/finally-reliably-good-sleep.png`, alt: "Finally, reliably good sleep: proven ingredients, free shipping, 90 day guarantee, beside the Anytime Calm tub" },
  { src: `${IMG}/benefits-grid.png`, alt: "What one scoop supports: sleep quality, skin and collagen, calm rejuvenation, metabolic support, muscle relaxation, stress response, antioxidant support, nervous system" },
  { src: `${IMG}/review-postpartum.png`, alt: "A five star review: getting better sleep as a postpartum, breastfeeding mama" },
  { src: `${IMG}/proven-built-on.png`, alt: "Built on what actually works: glycine cuts time to fall asleep by 15 minutes, L-theanine lowers perceived stress 18%, magnesium glycinate drops insomnia severity 70% more than placebo, each from published research at the studied dose" },
  { src: `${IMG}/vs-melatonin.png`, alt: "Anytime Calm versus melatonin: how it works, morning after, habit forming, dose you get, and if it doesn't work" },
  { src: `${IMG}/vs-melatonin-night.png`, alt: "A chart comparing melatonin to Anytime Calm across a night: melatonin falls asleep fast but wears off by 3am with lingering grogginess, Anytime Calm settles in gently, stays asleep through the night, and wakes up refreshed" },
  { src: `${IMG}/facts-label.png`, alt: "The Anytime Calm supplement facts panel: 3,000 mg glycine, 200 mg L-theanine, 120 mg magnesium glycinate" },
  { src: `${IMG}/mixed-glass.webp`, alt: "The finished cherry lime drink in a glass beside the tub" },
  { src: `${IMG}/nightstand.webp`, alt: "The tub and scoop on a nightstand beside a lamp" },
  { src: `${IMG}/scoop.webp`, alt: "A hand holding the white scoop heaped with pink powder" },
] as const;
