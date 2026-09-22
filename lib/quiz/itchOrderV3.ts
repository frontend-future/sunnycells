/**
 * Order building for the itch v3 checkout only (components/itch-quiz/ItchV3Checkout.tsx).
 * Reuses the same two digital bonuses ITCH_V2_BONUSES already defines (per product
 * decision: v3 runs the same bonus-inflated strikethrough v2 does), so the two never
 * drift apart on what the bonuses are or cost. The only difference from
 * buildItchOrderV2 is the product line's image: v3's own relabeled jar photography
 * (public/quiz/itch/v3/) instead of the shared bottle-*.webp v1 and v2 still use.
 */
import { PRODUCT } from "@/lib/products/dog-itch";
import { itchPlanById } from "./itchLadder";
import { ITCH_V2_BONUSES } from "./itchOrderV2";

export type ItchV3OrderLine = { id: string; name: string; note: string; was: number; now: number | null; image: string | null };

export type ItchV3Order = {
  months: number;
  lines: ItchV3OrderLine[];
  listTotal: number;
  bonusTotal: number;
  discount: number;
  discountPct: number;
  total: number;
  strikeTotal: number;
};

export function buildItchOrderV3(planId: string | undefined): ItchV3Order {
  const plan = itchPlanById(planId);
  const months = plan.months;

  const now = plan.price * months;
  const list = plan.compareAt * months;
  const bonusTotal = ITCH_V2_BONUSES.reduce((n, b) => n + b.was, 0);

  const lines: ItchV3OrderLine[] = [
    {
      id: "product",
      name: PRODUCT.name,
      note: `${months} ${months === 1 ? "jar" : "jars"}. Ships every ${months} ${months === 1 ? "month" : "months"}.`,
      was: list,
      now,
      image: plan.image.replace("/quiz/itch/", "/quiz/itch/v3/"),
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
