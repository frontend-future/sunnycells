import { firstOrderPrice, formatPrice } from "@/lib/price";

/**
 * Youth Matrix Chews PDP content for /products/youth-matrix-chews.
 *
 * Rendered as supplied. Before this is anything other than a build:
 *
 *   1. NOT A PRODUCT THIS CODEBASE SELLS. There is no SKU, no cart, no order builder
 *      and no checkout for it. The CTA points at /checkout, a route that does not
 *      exist, so every button on this page currently 404s.
 *   2. The 4.9 and the 1,248 verified reviews are supplied figures, not collected
 *      ones. Same footing as the placeholder ratings flagged across SC-24 and SC-25.
 *   3. The comparison table and the stack claims are structure/function claims and
 *      need the FDA disclaimer, which the page renders at the foot.
 */

export const PRODUCT = {
  badge: "Clinical formula · non-melatonin",
  title: "Youth Matrix Chews",
  subhead: "Internal Dermal Repair & Cortisol Defense Chews",
  rating: { score: "4.9/5", count: "1,248 Verified Reviews" },
} as const;

export const ADVERTORIAL = {
  href: "/advertorials/cortisol-collagen-matrix",
  eyebrow: "Dermal Physiology & Cellular Health",
  quote: "Why Dermatologists Are Treating Cortisol Face From Within",
  cta: "Read the Full Clinical Case Study →",
} as const;

export const CHECKOUT_HREF = "/checkout?sku=youth-matrix-chews-sub";

export type Plan = {
  id: "sub" | "once";
  name: string;
  price: string;
  compareAt?: string;
  save?: string;
  cadence?: string;
  /* The compact form for the sticky bar, where the full sentence has no room. */
  shortCadence?: string;
  best?: boolean;
  points?: string[];
};

/* $50 a month, half price on the first order. Derived, never typed by hand. */
export const MONTHLY = formatPrice(50);
export const FIRST_ORDER = formatPrice(firstOrderPrice(50));

export const PLANS: Plan[] = [
  {
    id: "sub",
    name: "Subscribe and save",
    price: FIRST_ORDER,
    compareAt: MONTHLY,
    save: `Save ${formatPrice(50 - firstOrderPrice(50))}`,
    cadence: `first month, then ${MONTHLY} a month`,
    shortCadence: `then ${MONTHLY} a month`,
    best: true,
    points: [
      "Includes the heavy frosted glass vessel, free with your first order",
      "Eco-friendly refill pouches delivered every 30 days",
      "Swap, pause, or cancel anytime in one click",
    ],
  },
  { id: "once", name: "One-time purchase", price: MONTHLY, cadence: "one delivery, no repeat" },
];

export const TRUST = [
  "30 day money back guarantee",
  "Free priority shipping on subscriptions",
  "Formulated without melatonin or synthetic fillers",
] as const;

const IMG = "/products/youth-matrix-chews";

export const GALLERY = [
  { src: `${IMG}/pdp-hero-jar.webp`, alt: "A frosted glass jar reading SUNNYCELLS Youth Matrix beside four tart-cherry red gummies on dark green marble" },
  { src: `${IMG}/pdp-texture-macro.webp`, alt: "Macro close-up of a single translucent tart-cherry red chew on white travertine" },
  { src: `${IMG}/pdp-vessel-unboxing.webp`, alt: "The frosted glass jar beside a dark green eco-friendly refill pouch on beige linen" },
  { src: `${IMG}/pdp-routine-vanity.webp`, alt: "The open jar on a bathroom vanity at night beside a glass of water" },
  { src: `${IMG}/pdp-clinical-matrix.webp`, alt: "A 3D render of dermal collagen fibers repairing and plumping" },
  { src: `${IMG}/pdp-before-after.webp`, alt: "Split image of a woman's lower face: puffier and duller on the left, defined jawline on the right" },
] as const;

export const STACK = {
  /* Five since magnesium and L-theanine were split onto their own cards. The
     advertorial still says 4-in-1 and is still right: it lists the two together in a
     single bullet. If that ever splits too, this number moves with it. */
  title: "The five in one clinical stack",
  lede: "Every chew carries the full stack. No proprietary blend, no rounding down.",
  items: [
    {
      dose: "2,500mg",
      name: "Bovine Gelatin (Glycine & Proline)",
      body: "Rebuilds cross-linked collagen fibers in the deep dermis and seals the gut mucosa.",
    },
    {
      dose: "100mg",
      name: "Magnesium Glycinate",
      body: "Blunts nighttime HPA-axis stress surges and drops core body temperature, the signal that starts sleep.",
    },
    {
      dose: "150mg",
      name: "L-Theanine",
      body: "Raises alpha wave activity to quiet the racing mind behind 3 AM wake-ups, without sedating you.",
    },
    {
      dose: "150mg",
      name: "Niacinamide (Vitamin B3)",
      body: "Restores cellular NAD+ levels overnight, locks in moisture, and restores lipid barrier integrity.",
    },
    {
      dose: "60mg",
      name: "Acerola Vitamin C",
      body: "Serves as the essential enzymatic cofactor required to bind and synthesize raw collagen.",
    },
  ],
} as const;

export const COMPARE = {
  title: "Why chews beat pills",
  usLabel: "Youth Matrix Chews",
  themLabel: "Standard Capsules / Pills",
  rows: [
    { feature: "Active Ingredient Volume", us: "3,500mg+ High-Density Stack", them: "Requires swallowing 5–6 horse pills" },
    { feature: "Habit Retention", us: "Delicious Tart-Cherry Evening Ritual", them: "Feels like a medical chore" },
    { feature: "Delivery System", us: "Buccal + Gastrointestinal Absorption", them: "Slow degradation in gut acid" },
    { feature: "Melatonin-Free Sleep", us: "Yes (Glycine/Magnesium Recovery)", them: "Often packed with synthetic hormones" },
  ],
} as const;

export const PROOF_BANNER = {
  heading: "Tired of Waking Up to “Cortisol Face”?",
  body: "Topicals only address the outer 10% of your skin. If nighttime stress is breaking down your internal collagen matrix, creams won’t fix it.",
  cta: "Read our deep-dive article: 5 Signs High Stress Is Destroying Your Collagen Matrix →",
  href: "/advertorials/cortisol-collagen-matrix",
  image: `${IMG}/pdp-clinical-matrix.webp`,
  alt: "A 3D render of dermal collagen fibers repairing and plumping",
} as const;

/** PLACEHOLDER. Written to voice, not collected from customers. */
export const REVIEWS = [
  { name: "Marisa T.", when: "3 weeks ago", stars: 5, title: "The 3 AM wake-ups stopped first",
    body: "I did not expect the sleep part to be the thing I noticed. Second week in I slept through, and my face in the morning is not the puffy mess it was." },
  { name: "Danielle R.", when: "1 month ago", stars: 5, title: "Actually pleasant to take",
    body: "I have a drawer of capsules I never finished. Four chews after dinner is the first supplement routine that has survived a month in this house." },
  { name: "Priya N.", when: "2 months ago", stars: 5, title: "Jawline is back",
    body: "The morning puffiness is what changed for me. Not gone entirely but I am not icing my face before work any more, which I was doing daily." },
  { name: "Kate W.", when: "2 months ago", stars: 4, title: "Slower than I hoped, but real",
    body: "Nothing happened in week one and I nearly gave up. Around week five the skin on my cheeks felt firmer. Worth staying on it." },
] as const;

export const DISCLAIMER =
  "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease. Individual results vary.";


/* ------------------------------------------------------------------------------ */
/* The supply ladder, for the cortisol funnel's plans page and its checkout.        */
/* ------------------------------------------------------------------------------ */

/**
 * The PDP above sells one month with a subscribe-or-once choice. The funnel sells a
 * supply length, the way the other three funnels do, so it needs a ladder rather than
 * a cadence toggle. Both describe the same jar at the same monthly price.
 *
 * Note the compareAt: it drops with the supply instead of sitting flat at the one
 * month list price. A flat $50 against $23 and $21 would make the three and six month
 * plans 54% and 58% off while the page states 50% off, which is the exact arithmetic
 * bug that had to be fixed on Daily Reds and Revitalize. Every rung here is half of
 * its own list price, so the one percentage the brand states stays true on all three.
 */
export type SupplyPlan = {
  id: string;
  months: number;
  /* `name`, not `label`: EvenCheckout's order type expects this field, and this ladder
     is what feeds it. */
  name: string;
  /** One line under the label saying who the length suits. */
  sub: string;
  /**
   * The card's picture. The diet and aging funnels have renders showing the actual
   * number of pouches or jars a delivery contains; this product has one jar shot and
   * nothing else, so all three rungs use it and the jar count is carried by the
   * bullet instead. Replace with real 3 and 6 jar renders when they exist.
   */
  image: string;
  /** Charged per month. */
  price: number;
  /** Struck through. Per supply, so every rung is exactly half. */
  compareAt: number;
  flag?: string;
  best?: boolean;
  /** How often a delivery arrives, shown as the last bullet. */
  cadence: string;
};

/** One jar is a month at four chews a night. */
export const NIGHTS_PER_JAR = 30;

export const SUPPLY_PLANS: SupplyPlan[] = [
  {
    id: "y1", months: 1, name: "1 month supply",
    sub: "Ideal solution for trying out",
    image: "/product/youth-matrix-chews.webp",
    price: 25, compareAt: 50,
    cadence: "Delivered fresh monthly",
  },
  {
    id: "y3", months: 3, name: "3 month supply",
    sub: "One full skin turnover cycle, and then some",
    image: "/product/youth-matrix-chews.webp",
    price: 23, compareAt: 46,
    cadence: "Delivered fresh every 3 months",
    flag: "Most popular", best: true,
  },
  {
    id: "y6", months: 6, name: "6 month supply",
    sub: "For achieving sustainable results",
    image: "/product/youth-matrix-chews.webp",
    price: 21, compareAt: 42,
    cadence: "Delivered fresh every 6 months",
    flag: "Best value",
  },
];

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
  const perNight = price / NIGHTS_PER_JAR;
  const floor = Math.floor(perNight);
  if (Number.isInteger(perNight)) return `$${perNight} / night`;
  return perNight - floor <= 0.35 && floor >= 1
    ? `Just over $${floor} / night`
    : `Less than $${Math.ceil(perNight)} / night`;
}

export function supplyBullets(plan: SupplyPlan): string[] {
  const jars = plan.months;
  return [
    `${plan.months * NIGHTS_PER_JAR} nights`,
    perNightLabel(plan.price),
    `${jars} ${jars === 1 ? "jar" : "jars"} delivered`,
    plan.cadence,
  ];
}

/* The cart rides in sessionStorage under its own id, keyed separately so it never
   collides with a funnel's answers. */
export const CART_ID = "youth-matrix";

export type OrderLine = { id: string; name: string; note: string; was: number | null; now: number | null; image: string | null };
export type Order = { plan: SupplyPlan; lines: OrderLine[]; listTotal: number; discount: number; total: number };

export function buildOrder(planId: string | undefined): Order {
  const plan = supplyPlanById(planId);
  const now = plan.price * plan.months;
  const list = plan.compareAt * plan.months;
  const jars = `${plan.months} ${plan.months === 1 ? "jar" : "jars"}`;
  return {
    plan,
    lines: [
      {
        id: "product",
        name: `${PRODUCT.title}, tart cherry`,
        note: `${jars} of ${NIGHTS_PER_JAR} nights. ${plan.sub}.`,
        was: list, now, image: "/product/youth-matrix-chews.webp",
      },
      { id: "shipping", name: "Shipping", note: "Free on every order", was: null, now: 0, image: null },
    ],
    listTotal: list, discount: list - now, total: now,
  };
}
