/**
 * Order building for the itch v2 checkout only (components/itch-quiz/ItchV2Checkout.tsx).
 * A v2-only test: two digital bonuses plus free shipping, same shape as the diet
 * funnel's own BONUSES/buildOrder (lib/quiz/order.ts), so the total-value math
 * ($50 list + $60 of bonuses = $110, discounted to $25 on the 1 month plan, an
 * $85 total saving) reads the same way diet's own checkout does. The original
 * itch checkout (ItchCheckout, EvenCheckout-based) is untouched: it has no
 * bonuses and keeps its simpler order shape from itchLadder.ts.
 */
import { PRODUCT } from "@/lib/products/dog-itch";
import { itchPlanById } from "./itchLadder";

export const ITCH_V2_BONUSES = [
  { id: "allergy-blueprint", image: "/bonuses/itch-allergy-blueprint.png", icon: "book-open", name: "Canine Allergy & Itch Elimination Blueprint", was: 27 },
  { id: "food-guide", image: "/bonuses/itch-food-guide.png", icon: "file-text", name: "Vet-Approved Anti-Inflammatory Dog Food & Ingredient Guide", was: 19 },
  { id: "shipping", image: null, icon: "truck", name: "Free shipping", was: 14 },
] as const;

export type ItchV2OrderLine = { id: string; name: string; note: string; was: number; now: number | null; image: string | null };

export type ItchV2Order = {
  months: number;
  lines: ItchV2OrderLine[];
  listTotal: number;
  bonusTotal: number;
  discount: number;
  discountPct: number;
  total: number;
  strikeTotal: number;
};

export function buildItchOrderV2(planId: string | undefined): ItchV2Order {
  const plan = itchPlanById(planId);
  const months = plan.months;

  const now = plan.price * months;
  const list = plan.compareAt * months;
  const bonusTotal = ITCH_V2_BONUSES.reduce((n, b) => n + b.was, 0);

  const lines: ItchV2OrderLine[] = [
    {
      id: "product",
      name: PRODUCT.name,
      note: `${months} ${months === 1 ? "jar" : "jars"}. Ships every ${months} ${months === 1 ? "month" : "months"}.`,
      was: list,
      now,
      image: plan.image,
    },
    ...ITCH_V2_BONUSES.map((b) => ({ id: b.id, name: b.name, note: "Limited time offer", was: b.was, now: null, image: b.image })),
  ];

  return {
    months,
    lines,
    listTotal: list,
    bonusTotal,
    discount: list - now,
    discountPct: Math.round(((list - now) / list) * 100),
    total: now,
    strikeTotal: list + bonusTotal,
  };
}
