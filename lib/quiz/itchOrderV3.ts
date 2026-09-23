/**
 * Order building for the itch v3 checkout only (components/itch-quiz/ItchV3Checkout.tsx).
 * Its own bonus set, ITCH_V3_BONUSES, rather than reusing ITCH_V2_BONUSES: the v3
 * plans page's own hero gallery already shows "What's included" as free shipping,
 * a USA bandana, an airtight storage canister, and a "First 30 Days" dog health
 * guide (public/quiz/itch/v3/hero-carousel-02.webp), so the checkout summary
 * matches what that page just promised instead of the two unrelated digital PDF
 * downloads v2's checkout still offers. Bandana/canister/guidebook photos are
 * cropped straight from that same hero graphic (public/bonuses/itch-*), so the
 * gift shown at checkout is the exact one the shopper just saw.
 */
import { PRODUCT } from "@/lib/products/dog-itch";
import { itchPlanById } from "./itchLadder";

export const ITCH_V3_BONUSES = [
  { id: "shipping", image: null, icon: "truck", name: "Free shipping", was: 14 },
  { id: "usa-bandana", image: "/bonuses/itch-usa-bandana.webp", icon: "flag", name: "USA bandana", was: 12 },
  { id: "storage-canister", image: "/bonuses/itch-storage-canister.webp", icon: "shopping-bag", name: "Airtight storage canister", was: 18 },
  { id: "first-30-days-guide", image: "/bonuses/itch-first-30-days-guide.webp", icon: "book-open", name: "\"First 30 Days\" dog health guide", was: 19 },
] as const;

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
  const bonusTotal = ITCH_V3_BONUSES.reduce((n, b) => n + b.was, 0);

  const lines: ItchV3OrderLine[] = [
    {
      id: "product",
      name: PRODUCT.name,
      note: `${months} ${months === 1 ? "jar" : "jars"}. Ships every ${months} ${months === 1 ? "month" : "months"}.`,
      was: list,
      now,
      image: plan.image.replace("/quiz/itch/", "/quiz/itch/v3/"),
    },
    ...ITCH_V3_BONUSES.map((b) => ({ id: b.id, name: b.name, note: "First-order gift", was: b.was, now: null, image: b.image })),
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
