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
