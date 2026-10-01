/**
 * Everything the /quiz/fridayzoomies funnel sells, in Friday Zoomies' words and
 * pictures: the jar, the plans, the order, the plans page copy. The prices, the
 * plan structure and the copy's claims are the itch quiz's own (same cart, same
 * ladder), so the two never quote different numbers for the same thing.
 */
import type { Brand } from "@/components/core/brand";
import { ITCH_PLANS, ITCH_CART_ID, buildItchOrder, type ItchOrder } from "./itchLadder";
import { ITCH_PLANS_CONTENT } from "./itchPlansContent";
import type { PlansContent } from "./plansContent";
import type { Plan } from "./plans";

/* The name the shared itch copy uses. Not imported from components/core/brand: that is
   a client module, and a constant crossing into a server file arrives as a reference. */
const ITCH_PRODUCT_NAME = "SC-01 Daily Chews";

export const FZ_PRODUCT_NAME = "Friday Zoomies Daily Chews";
export const FZ_JAR = "/quiz/fridayzoomies/jar.webp";
const FZ_STORY_DOG = "/quiz/fridayzoomies/story-dog-crop.webp";

export const FZ_BRAND: Brand = {
  name: "Friday Zoomies",
  productName: FZ_PRODUCT_NAME,
  logo: { src: "/brand/fridayzoomies/logo-oneline.png", alt: "Friday Zoomies" },
  storyImage: FZ_STORY_DOG,
};

export { ITCH_CART_ID as FZ_CART_ID };

/* One jar photo for all three tiers: the supplied hero shot is the only one, so the
   1, 3 and 6 jar plans do not yet show a different quantity. */
export const FZ_PLANS: Plan[] = ITCH_PLANS.map((p) => ({ ...p, image: FZ_JAR }));

const swap = (s: string) => s.replaceAll(ITCH_PRODUCT_NAME, FZ_PRODUCT_NAME);

export const FZ_PLANS_CONTENT: PlansContent = {
  ...ITCH_PLANS_CONTENT,
  productName: FZ_PRODUCT_NAME,
  hero: { ...ITCH_PLANS_CONTENT.hero, lede: swap(ITCH_PLANS_CONTENT.hero.lede) },
  productImage: FZ_JAR,
  /* The reviewer photo that held an SC-01 jar becomes the cropped dog. */
  reviews: ITCH_PLANS_CONTENT.reviews.map((r) =>
    r.photo === "/quiz/itch/story-sarah.webp" ? { ...r, photo: FZ_STORY_DOG } : r,
  ),
  ingredientsTitle: swap(ITCH_PLANS_CONTENT.ingredientsTitle),
  faqs: ITCH_PLANS_CONTENT.faqs.map((f) => ({ title: swap(f.title), body: swap(f.body) })),
  accent: { bg: "var(--sun)", press: "var(--sun-press)" },
};

/** The itch order with Friday Zoomies' name on the product line and the shipping
    badge on the free shipping line. */
export function buildFzOrder(planId: string | undefined): ItchOrder {
  const o = buildItchOrder(planId);
  return {
    ...o,
    lines: o.lines.map((l) =>
      l.id === "product"
        ? { ...l, name: l.name.replace(ITCH_PRODUCT_NAME, FZ_PRODUCT_NAME), image: FZ_JAR }
        : l.id === "shipping"
          ? { ...l, image: "/quiz/fridayzoomies/free-shipping.webp" }
          : l,
    ),
  };
}
