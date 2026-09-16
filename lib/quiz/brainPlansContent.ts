/** Everything the v3 plans page says for Brain & Memory Power Boost, the brain
    quiz's own copy and pictures poured into the same layout the diet funnel's
    plans page uses. See PlansContent and CarouselContent for what each field
    controls; the structure itself lives in PlansScreen and HeroCarousel. */
import type { CarouselContent, Facts } from "@/components/quiz/HeroCarousel";
import type { PlansContent } from "./plansContent";
import { INGREDIENTS } from "@/lib/products/brain-memory";

const BRAIN_FACTS: Facts = {
  serving: "4 capsules",
  perContainer: "30",
  /* No %DV column value exists for these actives, so each row uses the dagger a
     real supplement facts panel uses for "Daily Value not established", rather
     than a number invented to fill the cell. */
  rows: INGREDIENTS.map((i) => [i.name, i.dose, "†"]),
  /* No blend and no blendAmount: every active here is dosed and printed on its
     own row, which is the whole point of the "not a proprietary blend" claim
     the product makes elsewhere. Leaving both unset is what tells the carousel
     to skip that footer row instead of rendering an empty or invented one. */
  other: "Hypromellose (capsule), rice flour, magnesium stearate, silicon dioxide",
};

export const BRAIN_CAROUSEL: CarouselContent = {
  benefitsTitle: "Benefits of the actives in Brain & Memory Power Boost",
  benefits: [
    "Sharper memory and recall",
    "Supports mental clarity",
    "Supports healthy blood flow",
    "Stimulant-free focus",
    "Supports antioxidant defenses",
    "Supports cognitive resilience",
  ],
  stats: [
    { figure: "4.7/5", body: "average rating from 914 verified reviews" },
    { figure: "87%", body: "of surveyed users said they noticed sharper focus*" },
    { figure: "91%", body: "of surveyed users said they would recommend it*" },
  ],
  statsNote: "*Based on an internal survey of past customers",
  attributesTitle: "Stimulant-free, doctor-formulated support",
  attributes: [
    { icon: "zap-off", label: "Stimulant-free" },
    { icon: "wheat-off", label: "Gluten-free" },
    { icon: "droplet", label: "No added sugar" },
    { icon: "leaf", label: "Dairy-free" },
    { icon: "shield-check", label: "No artificial colors" },
    { icon: "check", label: "No proprietary blends" },
  ],
  servingTitle: "Take 4 capsules",
  servingBody: "Daily with food. Consistency matters most, since the fuller effect builds over about 12 weeks.",
  servingFigures: [["30", "day supply"], ["4", "capsules per serving"]],
  seals: [
    { src: "/badges/third-party-tested.webp", label: "Third party tested" },
    { src: "/badges/heavy-metal-tested.webp", label: "Heavy metal tested" },
    { src: "/badges/money-back.png", label: "Money back guarantee" },
    { src: "/badges/made-in-usa.png", label: "Made in the USA" },
  ],
  facts: BRAIN_FACTS,
  /* Fixed rather than gendered, same reasoning the diet carousel documents: this
     panel is showing a range of people using it, so a mix says more than a match
     to whoever is reading. */
  socialPhotos: ["/quiz/brain/story-robert.webp", "/quiz/brain/story-carol.webp"],
};

export const BRAIN_PLANS_CONTENT: PlansContent = {
  quizId: "brain",
  productName: "Brain & Memory Power Boost",
  offer: { label: "Limited time offer", badge: "up to 60% off", countdown: true },
  hero: {
    title: "Doctor-formulated nootropic",
    lede: "SUNNYCELLS Brain & Memory Power Boost is built to sharpen focus, memory and mental clarity, without a stimulant.",
    points: ["Supports memory and recall", "Supports focus and mental clarity", "Supports healthy blood flow to the brain"],
  },
  /* A plain cutout, not the hero-split composite with the benefits panel baked in:
     the comparison table and sticky bar both just need the bottle. */
  productImage: "/quiz/brain/bottle-1-cutout.webp",
  plansTitle: "Let the formula do the work",
  plansNote: {
    badge: "12",
    body: "Most people notice a fuller effect by week 12 of consistent daily use",
  },
  quickBenefits: [
    { lead: "Begins fueling brain cell energy from ", strong: "the first dose" },
    { lead: "Supports memory circuits and focus by ", strong: "week 4" },
    { lead: "Reinforces antioxidant defenses by ", strong: "week 8" },
    { lead: "Supports steadier recall and stamina by ", strong: "week 12" },
  ],
  /* "contain" in a taller box, not the default "cover": these are square product
     photos, and cropping one to a 150px-tall wide rectangle cut off most of it. */
  pillars: [
    { slug: "circulation", title: "Supports circulation", body: "Ginkgo biloba extract is one of the most studied herbal extracts for supporting healthy blood flow, including to the brain.", illustration: "/product/brain-memory/04-pour.png", illustrationFit: "contain" },
    { slug: "memory", title: "Supports memory", body: "Phosphatidylserine and acetyl-L-carnitine support short and long term memory with consistent daily use.", illustration: "/product/brain-memory/checklist.png", illustrationFit: "contain" },
    { slug: "focus", title: "Supports focus", body: "Built around six research-backed actives at studied doses, to support focus and mental clarity without any stimulant.", illustration: "/product/brain-memory/02-natural-way.png", illustrationFit: "contain" },
  ],
  /* No standalone headline review: Dan sits in the grid below with everyone else
     instead of getting his own section. */
  reviews: [
    { name: "Dan B.", photo: "/quiz/brain/review-dan.webp", title: "My memory has improved", body: "I have been using it for two months and I have noticed I can remember more numbers and details than before." },
    { name: "Richard A.", photo: "/quiz/brain/review-richard.webp", title: "This really helped me get back to myself", body: "I am now able to get back to the way I used to think. This is a wonderful product and I notice the difference every day." },
    { name: "Mary W.", photo: "/quiz/brain/review-mary.webp", title: "The ingredients matched what I researched", body: "This has many of the ingredients I had already seen research for when it comes to memory. Glad to find them together in one formula." },
    { name: "Floyd B.", photo: "/quiz/brain/review-floyd.webp", title: "More energy and clarity", body: "I seem to have more energy and clarity since I started taking it. Still a little early to say for sure, but I believe this is going to be very good." },
    { name: "Dayle N.", photo: "/quiz/brain/review-dayle.webp", title: "Years of consistent use", body: "I have been using it for years and it really helps me stay sharp." },
  ],
  ingredientsTitle: "The science behind the six actives in Brain & Memory Power Boost",
  /* Where each active actually comes from, not the same product shot six times:
     an amino acid abundant in red meat, a precursor found in eggs, antioxidants
     from leafy greens, an extract from the Ginkgo tree, a phospholipid sourced
     from sunflower lecithin, and a compound from Chinese club moss. */
  ingredients: INGREDIENTS.map((i) => ({
    slug: i.key,
    title: `${i.name} (${i.dose})`,
    image: {
      alc: "/ingredients/acetyl-l-carnitine.webp",
      nac: "/ingredients/n-acetyl-l-cysteine.webp",
      ala: "/ingredients/alpha-lipoic-acid.webp",
      ginkgo: "/ingredients/ginkgo-biloba.webp",
      ps: "/ingredients/phosphatidylserine.jpg",
      huperzine: "/ingredients/huperzine-a.webp",
    }[i.key],
    points: [[i.copy, `Dosed at ${i.dose} per serving, printed on the label rather than folded into a proprietary blend.`]] as [string, string][],
  })),
  howItWorks: [
    { img: "step-capsules", title: "Take 4 capsules", body: "With food, once a day. No stimulant, so it sits alongside coffee or anything else you already take.", illustration: "/product/brain-memory/04-pour.png" },
    { img: "step-results", title: "Feel the difference build", body: "Cell energy and antioxidant support start from day one. The fuller effect on memory and focus builds over about 12 weeks.", illustration: "/product/brain-memory/checklist.png" },
  ],
  comparisonNote: "Compared to a typical unbranded brain supplement",
  comparison: [
    "Six research-backed actives, at studied doses",
    "No proprietary blend, every dose printed in full",
    "Stimulant-free formula",
    "Formulated by a doctor",
    "No added sugar, gluten or dairy",
    "30 day money back guarantee",
    "Free shipping on every order",
  ],
  faqs: [
    { title: "How do I take Brain & Memory Power Boost?", body: "Take 4 capsules daily with food. Ask a nutritionally informed physician before taking more than the labeled amount." },
    { title: "How soon will I notice a difference?", body: "Results vary by person. Many people notice a difference within 2 to 3 weeks, with the fuller effect building over 12 weeks of consistent use." },
    { title: "Does it contain any allergens?", body: "No. This formula contains no milk or dairy, gluten, wheat, yeast, eggs, corn, soy, added sugars, or artificial colors or flavors." },
    { title: "Who should take Brain & Memory Power Boost?", body: "This formula is designed for adults of any age looking for daily cognitive support." },
    { title: "Who should not take it?", body: "Not recommended for pregnant or nursing women, or for people taking anticoagulant medication or with a serious heart condition. Check with your healthcare provider if you are unsure." },
    { title: "What is the formulation of the product?", body: `Six active ingredients (${INGREDIENTS.map((i) => i.name).join(", ")}), each printed with its dose rather than hidden inside a proprietary blend.` },
    { title: "Where should I store it?", body: "Somewhere cool and dry with the cap closed. Not the windowsill, and not the fridge." },
    { title: "Medical information, product, reviews, warnings and legal disclaimer", body: "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Results vary from person to person." },
  ],
  /* Sky, this product's own accent, rather than the diet funnel's sun tint. */
  tint: "var(--sky-tint)",
  accent: { bg: "var(--sky)", press: "var(--sky-press)" },
};
