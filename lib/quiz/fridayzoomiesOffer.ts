/**
 * Everything the /quiz/itch funnel sells, in Friday Zoomies' words and
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
import { CHEW_ACTIVES, CHEW_SERVING, SPRAY_ACTIVES } from "@/lib/products/dog-itch";

const CHEW_IMAGES: Record<string, string> = {
  "Bovine colostrum 20%": "ing-colostrum",
  "Wild Alaskan salmon oil": "ing-omega3",
  "Quercetin dihydrate": "ing-quercetin",
  "Vitamin C (ascorbic acid)": "ing-vitamin-c",
  Bromelain: "ing-bromelain",
  Zinc: "ing-zinc-e",
  "Vitamin E (d-alpha tocopheryl acetate)": "ing-zinc-e",
  "Six-probiotic blend": "ing-probiotic",
};

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
  /* One standing 50% offer and a 90 day guarantee, matching the plans block below. */
  offer: { ...ITCH_PLANS_CONTENT.offer, badge: "up to 50% off", countdown: false },
  shippingTerm: "on your first order",
  guaranteeLength: "90 day",
  heroAssurance: { text: "Try It Risk-Free For 90 Days", underlined: "Risk-Free For 90 Days" },
  comparison: [
    "Soothes itchy skin on contact",
    "Addresses the root cause of itching",
    "Fewer hot spots, less paw licking and chewing",
    "A softer, shinier coat",
    "Dosed to your dog's weight",
    "All natural, no steroids",
    "90 day money back guarantee",
    "Free shipping on your first order",
  ],
  /* The hero sells the bundle as two jobs, the spray for relief today and the chew for
     the cause. No lede: three short proof points under the headline. **bold** in a point is drawn by PlansScreen. */
  hero: {
    ...ITCH_PLANS_CONTENT.hero,
    underline: "for good",
    lede: "",
    points: [
      "Provides Immediate & Lasting Relief",
      "Proven Vet-Recommended Formulas",
      "3rd Party & Clinically Tested",
    ],
  },
  productImage: FZ_JAR,
  comparisonImage: `${PLANS_DIR}/bundle-pair.webp`,
  squareImages: true,
  testingBadges: [`${PLANS_DIR}/badge-tested.webp`, `${PLANS_DIR}/badge-metals.webp`],
  provenLabel: "Clinically proven ingredients",
  reviewsTitle: "Thousands of happy pups",
  reviewsSub: "Read what dog parents around the world say.",
  faqTitle: "Frequently asked questions by our dog parents",
  usaLabel: "SUNNYCELLS is based in the USA",
  competitorImage: `${PLANS_DIR}/tub-generic.webp`,
  /* Illustrated 1:1 tiles in the brand palette replace the stock photography, which
     showed other brands' jars. Reviewers are shown as their dogs, not as people. */
  pillars: ITCH_PLANS_CONTENT.pillars.map((p) => ({
    ...p,
    illustration: `${PLANS_DIR}/${{ "less-itching": "pillar-itch", "healthier-coat": "pillar-coat", "fewer-hot-spots": "pillar-spots" }[p.slug]}.webp`,
    illustrationFit: undefined,
  })),
  /* Four different dogs in four different, ordinary places, shot to look like quick phone
     photos rather than a set. The names and photos are placeholders, like the rest. */
  reviews: [
    { name: "Jenna R.", photo: `${PLANS_DIR}/rev-jenna.webp`, title: "Biscuit finally stopped scratching", body: ITCH_PLANS_CONTENT.reviews[0].body },
    { name: "Dave M.", photo: `${PLANS_DIR}/rev-dave.webp`, title: "No more hot spots", body: ITCH_PLANS_CONTENT.reviews[1].body },
    { name: "Aaliyah P.", photo: `${PLANS_DIR}/rev-aaliyah.webp`, title: "Coat looks so much better", body: ITCH_PLANS_CONTENT.reviews[2].body },
    { name: "Lisa K.", photo: `${PLANS_DIR}/rev-lisa.webp`, title: "Worth it for the sleep alone", body: ITCH_PLANS_CONTENT.reviews[3].body },
  ],
  /* The eight chew actives, then the spray's. Zinc and vitamin E share a picture, as they
     always have. */
  ingredients: [
    ...CHEW_ACTIVES.map((i) => ({
      slug: i.name,
      title: `${i.name} (${i.dose})`,
      image: `${PLANS_DIR}/${CHEW_IMAGES[i.name]}.webp`,
      points: [[i.copy, `Dosed at ${i.dose} per serving of ${CHEW_SERVING}, printed on the label rather than folded into a proprietary blend.`]] as [string, string][],
    })),
    {
      slug: "itch-spray",
      title: "Aloe, Chamomile, Peppermint, Silk and Sodium Bicarbonate",
      image: `${PLANS_DIR}/ing-spray.webp`,
      points: SPRAY_ACTIVES.map(([n, d]) => [n, d]) as [string, string][],
    },
  ],
  /* Spray first for relief today, the chew for the cause, then the result. The chew
     dose depends on the dog's weight, so the copy points at the label, not a number. */
  howItWorks: [
    {
      img: "step-spray",
      title: "1. Spray for quick relief",
      body: "Spritz the Itch Spray on any itchy or irritated spot. It calms the skin right away, so your dog can settle down while the chews get to work.",
      illustration: `${PLANS_DIR}/how-spray.webp`,
    },
    {
      img: "step-chew",
      title: "2. Give the daily chew for lasting relief",
      body: "Give the daily chew amount for your dog's weight, with or without food. It works on the root cause from the inside, so it takes a few weeks to build.",
      illustration: `${PLANS_DIR}/how-chew.webp`,
    },
    {
      img: "step-results",
      title: "3. Enjoy lasting relief",
      body: "Most dogs scratch less by week two. As the chews keep working, skin and coat keep improving, and the itching stops for good.",
      illustration: `${PLANS_DIR}/how-results.webp`,
    },
  ],
  ingredientsTitle: swap(ITCH_PLANS_CONTENT.ingredientsTitle),
  faqs: ITCH_PLANS_CONTENT.faqs.map((f) => ({
    title: swap(f.title),
    /* The label prints eight actives, each with its dose. */
    body: f.title.startsWith("What is the formulation")
      ? "Eight active ingredients in the chew (bovine colostrum, wild Alaskan salmon oil, quercetin, vitamin C, bromelain, zinc, vitamin E and a six-strain probiotic blend), each printed with its dose rather than hidden inside a proprietary blend."
      : swap(f.body),
  })),
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
