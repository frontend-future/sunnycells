/**
 * The /quiz/itch/results/plans/v2 page's copy: the same page as the live one, with the
 * product renamed to Pure Omega Salmon Oil. Everything not overridden here (images, plan
 * structure, offer, FDA footer) comes from the live FZ_PLANS_CONTENT unchanged.
 *
 * The 99.8% salmon oil, 0.2% mixed tocopherols, 20% EPA and DHA and the dosing (1 pump
 * up to 40 lbs, 2 pumps over) are the same placeholders as the salmon oil images, until
 * a supplier spec sheet confirms them.
 */
import type { PlansContent } from "./plansContent";
import { FZ_PLANS_CONTENT } from "./fridayzoomiesOffer";

export const FZ_OIL_NAME = "Pure Omega Salmon Oil";
const PLANS_DIR = "/quiz/fridayzoomies/plans";

export const FZ_PLANS_CONTENT_V2: PlansContent = {
  ...FZ_PLANS_CONTENT,
  productName: FZ_OIL_NAME,
  hero: {
    ...FZ_PLANS_CONTENT.hero,
    points: [
      "Calms Itchy, Irritated Skin",
      "100% Natural Salmon Oil, Nothing Artificial",
      "Omega-3s For Skin, Joints & Mind",
    ],
  },
  quickBenefits: [
    ...FZ_PLANS_CONTENT.quickBenefits.slice(0, 3),
    { lead: "No steroids, no artificial anything, just ", strong: "100% natural salmon oil" },
  ],
  pillars: FZ_PLANS_CONTENT.pillars.map((p) => ({
    ...p,
    body:
      p.slug === "less-itching"
        ? "The omega-3s EPA and DHA support a healthy inflammatory response, the same overreaction behind nonstop scratching, licking, and chewing."
        : p.slug === "healthier-coat"
          ? "Omega-3s from salmon oil support the skin barrier from the inside out, for a shinier coat and less shedding over time."
          : "Omega-3s help skin heal faster and stay resilient, so an irritated patch is less likely to turn into a hot spot.",
  })),
  reviews: FZ_PLANS_CONTENT.reviews.map((r, i) => ({
    ...r,
    body: [
      "We tried three different vet treatments before this. A few weeks after adding the oil to Biscuit's dinner, the constant scratching just stopped.",
      "Our lab used to get a hot spot every few weeks. One pump over his breakfast every day, and it's been over a month with nothing.",
      "I noticed the shedding slow down before I noticed the itching stop. Her coat looks shinier than it has in years, and she licks the bowl clean.",
      "He used to keep us up licking his paws all night. It's one pump on his dinner, and that alone was worth trying this.",
    ][i],
  })),
  ingredientsTitle: `The science behind ${FZ_OIL_NAME}`,
  ingredients: [
    {
      slug: "salmon-oil",
      title: "Salmon oil (99.8%)",
      image: `${PLANS_DIR}/ing-omega3.webp`,
      points: [
        ["A source of omega-3s (EPA and DHA)", "EPA and DHA support the skin barrier and a healthy inflammatory response, for less dry, itchy skin and a shinier coat. They make up about 20% of the oil."],
        ["100% natural, nothing artificial", "Pure salmon oil is the whole formula, with no fillers, no chicken and no beef."],
      ],
    },
    {
      slug: "mixed-tocopherols",
      title: "Mixed tocopherols (0.2%)",
      image: `${PLANS_DIR}/ing-vitamin-e.webp`,
      points: [["Natural vitamin E", "Keeps the oil fresh by slowing oxidation, so every pump is as good as the first."]],
    },
  ],
  howItWorks: [
    {
      ...FZ_PLANS_CONTENT.howItWorks[0],
      title: "1. Pump over their food",
      body: "Even the picky eaters love the taste.",
      illustration: `${PLANS_DIR}/how-pump.webp`,
    },
    {
      ...FZ_PLANS_CONTENT.howItWorks[1],
      title: "2. Give it daily for lasting relief",
      body: "One easy pump a day works from the inside out.",
      illustration: `${PLANS_DIR}/how-daily.webp`,
    },
    {
      ...FZ_PLANS_CONTENT.howItWorks[2],
      body: "Less scratching, a shinier coat, and daily support for joints and mind.",
    },
  ],
  comparison: [
    "Calms itchy, irritated skin",
    "Omega-3s from 100% natural salmon oil",
    "Just 2 ingredients, no fillers",
    "A softer, shinier coat",
    "Dosed to your dog's weight",
    "All natural, no steroids",
    "90 day money back guarantee",
    "Free shipping on your first order",
  ],
  comparisonImage: `${PLANS_DIR}/comparison-oil.webp`,
  usaLabel: "Friday Zoomies is based in the USA",
  faqs: FZ_PLANS_CONTENT.faqs.map((f) => {
    const t = f.title;
    if (t.startsWith("How do I give"))
      return { title: `How do I give ${FZ_OIL_NAME}?`, body: "Pump it over their food once a day. Dogs up to 40 lbs get 1 pump, bigger dogs get 2. Give half for the first week, then the full amount. Check with your vet before giving more." };
    if (t.startsWith("Does it contain"))
      return { title: t, body: "It is 100% natural salmon oil with natural vitamin E, with no chicken, beef, corn, wheat or soy. It does contain fish, so check with your vet first if your dog has a known fish allergy." };
    if (t.startsWith("What is the formulation"))
      return { title: t, body: "Two ingredients: salmon oil (99.8%) and mixed tocopherols (0.2%), a natural vitamin E that keeps the oil fresh. The omega-3s EPA and DHA make up about 20% of the oil." };
    if (t.startsWith("Where should I store"))
      return { title: t, body: "Somewhere cool and dark with the pump closed. Not the windowsill. The fridge is fine, though the oil may thicken a little." };
    return f;
  }),
};
