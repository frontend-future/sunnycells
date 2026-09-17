/** Everything the joint quiz's plans page says for SC-02 Hip & Joint Chews,
    poured into the same layout the diet funnel's plans page uses. See
    PlansContent for what each field controls. */
import type { PlansContent } from "./plansContent";
import { INGREDIENTS, REVIEWS } from "@/lib/products/dog-joint";

export const JOINT_PLANS_CONTENT: PlansContent = {
  quizId: "joint",
  productName: "SC-02 Hip & Joint Chews",
  offer: { label: "Limited time offer", badge: "up to 60% off", countdown: true },
  hero: {
    title: "Stop the stiffness for good",
    lede: "SC-02 Hip & Joint Chews are made to rebuild cartilage and calm the inflammation behind your dog's stiffness.",
    points: ["Helps rebuild and cushion worn cartilage", "Supports a healthy inflammation response", "Keeps your dog moving without stiffness, naturally"],
  },
  productImage: "/quiz/joint/bottle-1.webp",
  plansTitle: "Let the chews do the work",
  plansNote: {
    badge: "2x",
    body: "Dogs on the 3 month plan show noticeably better mobility than dogs given just a single month",
  },
  quickBenefits: [
    { lead: "Most dogs show less stiffness within ", strong: "2 to 4 weeks" },
    { lead: "Cartilage support builds over ", strong: "8 weeks" },
    { lead: "Mobility and activity improve within ", strong: "6 to 8 weeks" },
    { lead: "No steroids, no fillers, just ", strong: "vet-formulated actives" },
  ],
  pillars: [
    {
      slug: "rebuilds-cartilage",
      title: "Rebuilds cartilage",
      body: "Glucosamine and chondroitin give your dog's body the raw material it needs to rebuild worn cartilage and keep it cushioned.",
      illustration: "/quiz/joint/benefit-cartilage.webp",
    },
    {
      slug: "calms-inflammation",
      title: "Calms joint inflammation",
      body: "MSM and green-lipped mussels are natural anti-inflammatories that can ease the swelling behind sore, achy joints.",
      illustration: "/quiz/joint/benefit-inflammation.webp",
    },
    {
      slug: "keeps-moving",
      title: "Keeps joints moving smoothly",
      body: "Hyaluronic acid helps lubricate joints, so your dog can move freely instead of feeling stiff and grinding.",
      illustration: "/quiz/joint/benefit-mobility.webp",
    },
  ],
  /* Each reviewer's own photo, not one photo reused four times: the dog breed
     and the owner's gender both match who's actually named in the quote. */
  reviews: REVIEWS.map((r) => ({
    name: r.name,
    photo: {
      "Tom H.": "/quiz/joint/story-tom.webp",
      "Linda K.": "/quiz/joint/review-linda.webp",
      "Carlos M.": "/quiz/joint/review-carlos.webp",
      "Emily R.": "/quiz/joint/review-emily.webp",
    }[r.name] ?? "/quiz/joint/story-tom.webp",
    title: r.title,
    body: r.body,
  })),
  ingredientsTitle: "The science behind the actives in SC-02 Hip & Joint Chews",
  /* Where each active actually comes from: glucosamine from shellfish, chondroitin
     from cartilage, MSM from a natural sulfur source, hyaluronic acid and green-lipped
     mussels from their namesakes, omega-3s from fish oil, vitamin C from acerola
     cherries, and yucca from the plant's own root. */
  ingredients: INGREDIENTS.map((i) => ({
    slug: i.key,
    title: `${i.name} (${i.dose})`,
    image: {
      glucosamine: "/ingredients/glucosamine.webp",
      chondroitin: "/ingredients/chondroitin.webp",
      msm: "/ingredients/msm.webp",
      "hyaluronic-acid": "/ingredients/hyaluronic-acid.webp",
      "green-lipped-mussels": "/ingredients/green-lipped-mussels.webp",
      omega3: "/ingredients/omega-3-fish-oil.webp",
      "vitamin-c": "/ingredients/acerola-vitamin-c.webp",
      yucca: "/ingredients/yucca-schidigera.webp",
    }[i.key],
    points: [[i.copy, `Dosed at ${i.dose} per serving, printed on the label rather than folded into a proprietary blend.`]] as [string, string][],
  })),
  howItWorks: [
    { img: "step-chew", title: "Give 1 chew daily", body: "With or without food, once a day. Dogs genuinely love the pork liver flavor, so it's an easy habit to keep.", illustration: "/quiz/joint/benefit-mobility.webp", illustrationFit: "contain" },
    { img: "step-relief", title: "Feel the difference build", body: "Less stiffness within about 2 to 4 weeks. The fuller effect on cartilage and mobility builds over 6 to 8 weeks of consistent use.", illustration: "/quiz/joint/benefit-cartilage.webp", illustrationFit: "contain" },
  ],
  comparisonNote: "Compared to a typical unbranded dog joint supplement",
  comparison: [
    "Eight research-backed actives, at studied doses",
    "No proprietary blend, every dose printed in full",
    "No steroids",
    "Formulated for daily use",
    "No artificial flavors",
    "30 day money back guarantee",
    "Free shipping on every order",
  ],
  faqs: [
    { title: "How do I give SC-02 Hip & Joint Chews?", body: "One chew daily, with or without food. Ask your vet before giving more than the labeled amount." },
    { title: "How soon will I notice a difference?", body: "Most owners notice less stiffness within 2 to 4 weeks, with the fuller effect on mobility building over about 8 weeks of consistent use." },
    { title: "Does it contain any allergens?", body: "No corn, wheat, or soy. Always check with your vet if your dog has a known food allergy before starting anything new." },
    { title: "Which dogs is this for?", body: "Formulated for large and giant breed dogs, 65 lbs and up, who carry more weight on their joints, though any adult or senior dog dealing with stiffness can take it." },
    { title: "Which dogs should not take it?", body: "Not recommended for puppies under 6 months, pregnant or nursing dogs, or dogs on other medication without checking with your vet first." },
    { title: "What is the formulation of the product?", body: `Eight active ingredients (${INGREDIENTS.map((i) => i.name).join(", ")}), each printed with its dose rather than hidden inside a proprietary blend.` },
    { title: "Where should I store it?", body: "Somewhere cool and dry with the lid closed. Not the windowsill, and not the fridge." },
    { title: "Medical information, product, reviews, warnings and legal disclaimer", body: "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease in animals. Results vary." },
  ],
  tint: "var(--sun-tint)",
  accent: { bg: "var(--sun)", press: "var(--sun-press)" },
};
