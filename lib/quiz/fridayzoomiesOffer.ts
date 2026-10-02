/**
 * Everything the /quiz/fridayzoomies funnel sells, in Friday Zoomies' words and
 * pictures: the jar, the plans, the order, the plans page copy. The prices, the
 * plan structure and the copy's claims are the itch quiz's own (same cart, same
 * ladder), so the two never quote different numbers for the same thing.
 */
import type { Brand } from "@/components/core/brand";
import { renameProduct } from "@/lib/brandCopy";
import { ITCH_PLANS, ITCH_CART_ID, buildItchOrder, type ItchOrder } from "./itchLadder";
import { ITCH_PLANS_CONTENT } from "./itchPlansContent";
import type { PlansContent } from "./plansContent";
import type { Plan } from "./plans";

export const FZ_PRODUCT_NAME = "Inside-Out Itch Bundle";
export const FZ_JAR = "/quiz/fridayzoomies/jar.webp";
const FZ_STORY_DOG = "/quiz/fridayzoomies/story-cooper.webp";
const PLANS_DIR = "/quiz/fridayzoomies/plans";

export const FZ_BRAND: Brand = {
  name: "Friday Zoomies",
  productName: FZ_PRODUCT_NAME,
  logo: { src: "/brand/fridayzoomies/logo-oneline.png", alt: "Friday Zoomies" },
  storyImage: FZ_STORY_DOG,
  storyQuote:
    "It got so bad that at one point we talked about putting him down. I'm so glad we didn't. It only took a week for his itching to start turning around, and by week three it was gone",
  storyOwner: "Jake",
  storyAlt: "Cooper, a fluffy white dog, sitting on a porch with his eyes closed and licking his nose, happy and relaxed",
};

export { ITCH_CART_ID as FZ_CART_ID };

/* One jar photo for all three tiers: the supplied hero shot is the only one, so the
   1, 3 and 6 jar plans do not yet show a different quantity. */
export const FZ_PLANS: Plan[] = ITCH_PLANS.map((p) => ({ ...p, image: FZ_JAR }));

const swap = (s: string) => renameProduct(s, FZ_PRODUCT_NAME);

export const FZ_PLANS_CONTENT: PlansContent = {
  ...ITCH_PLANS_CONTENT,
  productName: FZ_PRODUCT_NAME,
  /* The hero sells the bundle as two jobs, the wipes for relief today and the chew for
     the cause. **bold** in a point is drawn by PlansScreen. */
  hero: {
    ...ITCH_PLANS_CONTENT.hero,
    underline: "for good",
    lede: "Soothing Wipes calm irritated skin right away. The daily chew works from the inside on the histamine response behind your dog's scratching, licking, and skin irritation.",
    points: [
      "**Relief today:** wipes calm irritated skin on contact",
      "**Fixes it at the source:** the chew calms the histamine response from the inside",
      "**Supports healthy skin and a healthy coat** for the long haul",
    ],
  },
  productImage: FZ_JAR,
  squareImages: true,
  testingBadges: [`${PLANS_DIR}/badge-tested.webp`, `${PLANS_DIR}/badge-metals.webp`],
  provenLabel: "Clinically proven ingredients",
  usaLabel: "SUNNYCELLS is based in the USA",
  competitorImage: `${PLANS_DIR}/tub-generic.webp`,
  /* Illustrated 1:1 tiles in the brand palette replace the stock photography, which
     showed other brands' jars. Reviewers are shown as their dogs, not as people. */
  pillars: ITCH_PLANS_CONTENT.pillars.map((p) => ({
    ...p,
    illustration: `${PLANS_DIR}/${{ "less-itching": "pillar-itch", "healthier-coat": "pillar-coat", "fewer-hot-spots": "pillar-spots" }[p.slug]}.webp`,
    illustrationFit: undefined,
  })),
  reviews: ITCH_PLANS_CONTENT.reviews.map((r) => ({
    ...r,
    photo: `${PLANS_DIR}/${{ "Sarah T.": "rev-cooper", "Marcus D.": "rev-marcus", "Priya N.": "rev-priya", "Ellie B.": "rev-ellie" }[r.name]}.webp`,
  })),
  ingredients: ITCH_PLANS_CONTENT.ingredients.map((i) => ({
    ...i,
    image: `${PLANS_DIR}/${{ quercetin: "ing-quercetin", omega3: "ing-omega3", "zinc-e": "ing-zinc-e", probiotics: "ing-probiotic" }[i.slug]}.webp`,
  })),
  howItWorks: ITCH_PLANS_CONTENT.howItWorks.map((h, n) => ({
    ...h,
    ...(n === 1 && {
      title: "The scratching eases off first",
      body: "Most dogs scratch less by week two. Skin and coat take longer, so give it six to eight weeks of daily chews before you judge it.",
    }),
    illustration: `${PLANS_DIR}/${["how-chew", "how-results"][n]}.webp`,
    illustrationFit: undefined,
  })),
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
        ? { ...l, name: `${FZ_PRODUCT_NAME}, ${l.name.split(", ")[1]}`, image: FZ_JAR }
        : l.id === "shipping"
          ? { ...l, image: "/quiz/fridayzoomies/free-shipping.webp" }
          : l,
    ),
  };
}
