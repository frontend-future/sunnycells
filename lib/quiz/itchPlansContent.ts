/** Everything the itch quiz's plans page says for SC-01 Daily Chews, poured
    into the same layout the diet funnel's plans page uses. See PlansContent
    for what each field controls. */
import type { PlansContent } from "./plansContent";
import { INGREDIENTS, REVIEWS } from "@/lib/products/dog-itch";

export const ITCH_PLANS_CONTENT: PlansContent = {
  quizId: "itch",
  productName: "SC-01 Daily Chews",
  offer: { label: "Limited time offer", badge: "up to 60% off", countdown: true },
  hero: {
    title: "Stop the itching for good",
    lede: "SC-01 Daily Chews are made to calm the histamine response behind your dog's scratching, licking, and skin irritation.",
    points: ["Helps stop the scratching, licking, and chewing", "Supports healthy skin and a healthy coat", "Calms irritation from allergies, naturally"],
  },
  productImage: "/quiz/itch/bottle-1.webp",
  plansTitle: "Let the chews do the work",
  plansNote: {
    badge: "2x",
    body: "Dogs on the 3 month plan show noticeably less scratching than dogs given just a single month",
  },
  quickBenefits: [
    { lead: "Most dogs scratch noticeably less within ", strong: "2 weeks" },
    { lead: "Skin starts visibly healing within ", strong: "4 weeks" },
    { lead: "Coat and shedding improve within ", strong: "6 to 8 weeks" },
    { lead: "No steroids, no artificial anything, just ", strong: "natural ingredients" },
  ],
  pillars: [
    {
      slug: "less-itching",
      title: "Less itching",
      body: "Quercetin calms the body's histamine response, the same overreaction behind nonstop scratching, licking, and chewing.",
      illustration: "/quiz/itch/benefit-less-itching.webp",
    },
    {
      slug: "healthier-coat",
      title: "Healthier coat",
      body: "Omega-3 fish oil supports the skin barrier from the inside out, for a shinier coat and less shedding over time.",
      illustration: "/quiz/itch/benefit-coat.webp",
    },
    {
      slug: "fewer-hot-spots",
      title: "Fewer hot spots",
      body: "Zinc and vitamin E help skin heal faster and stay resilient, so an irritated patch is less likely to turn into a hot spot.",
      illustration: "/quiz/itch/benefit-hotspots.webp",
    },
  ],
  /* Each reviewer's own photo, not one photo reused four times: the dog breed
     and the owner's gender both match who's actually named in the quote. */
  reviews: REVIEWS.map((r) => ({
    name: r.name,
    photo: {
      "Sarah T.": "/quiz/itch/story-sarah.webp",
      "Marcus D.": "/quiz/itch/review-marcus.webp",
      "Priya N.": "/quiz/itch/review-priya.webp",
      "Ellie B.": "/quiz/itch/review-ellie.webp",
    }[r.name] ?? "/quiz/itch/story-sarah.webp",
    title: r.title,
    body: r.body,
  })),
  ingredientsTitle: "The science behind the actives in SC-01 Daily Chews",
  ingredients: INGREDIENTS.map((i) => ({
    slug: i.key,
    title: `${i.name} (${i.dose})`,
    points: [[i.copy, `Dosed at ${i.dose} per serving, printed on the label rather than folded into a proprietary blend.`]] as [string, string][],
  })),
  howItWorks: [
    { img: "step-chew", title: "Give 1 chew daily", body: "With or without food, once a day. Dogs genuinely love the taste, so it's an easy habit to keep.", illustration: "/quiz/itch/benefit-gut.webp", illustrationFit: "contain" },
    { img: "step-relief", title: "Feel the difference build", body: "Less scratching within about 2 weeks. The fuller effect on skin and coat builds over 6 to 8 weeks of consistent use.", illustration: "/quiz/itch/benefit-hotspots.webp", illustrationFit: "contain" },
  ],
  comparisonNote: "Compared to a typical unbranded dog supplement",
  comparison: [
    "Four research-backed actives, at studied doses",
    "No proprietary blend, every dose printed in full",
    "No steroids",
    "Formulated for daily use",
    "No artificial flavors",
    "30 day money back guarantee",
    "Free shipping on every order",
  ],
  faqs: [
    { title: "How do I give SC-01 Daily Chews?", body: "One chew daily, with or without food. Ask your vet before giving more than the labeled amount." },
    { title: "How soon will I notice a difference?", body: "Most owners notice less scratching within 2 weeks, with the fuller effect on skin and coat building over about 8 weeks of consistent use." },
    { title: "Does it contain any allergens?", body: "No corn, wheat, or soy. Always check with your vet if your dog has a known food allergy before starting anything new." },
    { title: "Which dogs is this for?", body: "Adult and senior dogs of any size dealing with occasional or ongoing itching, licking, or skin irritation." },
    { title: "Which dogs should not take it?", body: "Not recommended for puppies under 6 months, pregnant or nursing dogs, or dogs on other medication without checking with your vet first." },
    { title: "What is the formulation of the product?", body: `Four active ingredients (${INGREDIENTS.map((i) => i.name).join(", ")}), each printed with its dose rather than hidden inside a proprietary blend.` },
    { title: "Where should I store it?", body: "Somewhere cool and dry with the lid closed. Not the windowsill, and not the fridge." },
    { title: "Medical information, product, reviews, warnings and legal disclaimer", body: "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease in animals. Results vary." },
  ],
  tint: "var(--sprout-tint)",
  accent: { bg: "var(--sprout)", press: "var(--sprout-press)" },
};
