/**
 * The copy for /itch-5-reasons-w: a "5 reasons" listicle for Friday Zoomies Pure Omega Salmon Oil.
 *
 * The layout follows a competitor's listicle (hero, a "why us" band, five numbered reasons
 * alternating media and copy, one offer block). None of its words, name, doctor byline, reviews,
 * photos or ingredient claims are used. Everything here comes from the claims the live v2 and v3
 * plans pages already make, so nothing on this page says more than those do.
 *
 * No countdown, no per-dose price, no survey statistic. The offer is the standing "Save 50% today".
 */
export const META = {
  title: "Friday Zoomies | 5 Reasons Your Dog May Need This Salmon Oil for Itchy Skin",
  description:
    "Pure Omega Salmon Oil gives itchy dogs the omega-3s EPA and DHA. Two ingredients, one pump a day, backed by a 90 day money back guarantee.",
};

export const BANNER = {
  headline: "Save 50% today",
  subline: "Free shipping on your first order",
};

export const HERO = {
  title: "5 Reasons Your Dog May Need This Salmon Oil for Itchy Skin",
  /* The same vet who appears on the plans and product page carousel. */
  author: "Dr. Marcus Reed, DVM",
  authorImage: "/quiz/fridayzoomies/author-marcus-reed.webp",
  updated: "Updated 11/2026",
  intro:
    "Friday Zoomies Pure Omega Salmon Oil gives your dog the omega-3s EPA and DHA that itchy skin runs short on. One pump over their food each day supports the skin barrier and a calmer inflammatory response, from the inside out.",
  image: "/quiz/fridayzoomies/hero-oil.webp",
  alt: "A white dog lying on grass beside a bottle of Friday Zoomies Salmon Oil",
};

export const WHY = {
  title: "Why Salmon Oil Over Other Itch Options?",
  video: "/quiz/fridayzoomies/edu/why-it-returns.mp4",
  poster: "/quiz/fridayzoomies/edu/why-it-returns.webp",
  alt: "An illustrated dog licking an irritated paw",
  paragraphs: [
    "Most itch treatments calm the reaction. The scratching eases, but it often returns once you stop.",
    "Skin cells rely on the omega-3s EPA and DHA to settle their inflammatory response, and most diets fall short. Pure Omega Salmon Oil adds them back, so your dog's skin can calm down from the inside out.",
    "That is why it is made for every day, not as a quick fix.",
  ],
};

export const PILLS = [
  "Calms Itchy, Irritated Skin",
  "Skin Barrier Support",
  "Healthy Inflammatory Response",
  "Shinier Coat",
  "Fewer Hot Spots",
  "Omega-3s For Skin, Joints & Mind",
  "100% Natural Salmon Oil",
  "No Steroids",
  "Just 2 Ingredients",
];

export const REASONS = {
  one: {
    title: "Complete Itch Support in One Daily Pump",
    body: "One pump over their regular food, once a day. No pills to hide, no sprays to chase them with, nothing to mix.",
    video: "/quiz/fridayzoomies/edu/easy-daily.mp4",
    poster: "/quiz/fridayzoomies/edu/easy-daily.webp",
    alt: "An illustrated puppy watching salmon oil being pumped over its food",
  },
  two: {
    title: "Dog Parents Are Seeing the Difference",
    body: [
      "Itch rarely stays in one place. It shows up as paw chewing, nighttime licking, head shaking and hot spots.",
      "Those are the signs the dog parents below describe getting better.",
    ],
  },
  three: {
    title: "Just Two Ingredients, Nothing Extra",
    body: "Pure Omega Salmon Oil is salmon oil and mixed tocopherols, a natural vitamin E. That is the whole formula.",
  },
  four: {
    title: "Relief That Builds Over 90 Days",
    body: "Omega-3s start working right away and keep building through the skin barrier. Give it every day. Skipping days is the most common reason a supplement seems not to work.",
    photo: "/quiz/fridayzoomies/before-after-belly.webp",
    photoAlt: "A before and after photo of a white bulldog: on the left the skin on the chest and belly is blotchy and pink, on the right the coat is clear and evenly white",
    steps: [
      {
        title: "Day 7: First Signs",
        body: "Start with half the usual amount over their food for the first week, then the full amount. The omega-3s EPA and DHA begin supporting the skin barrier.",
        note: "Most users noticed their dog scratching less and sleeping more soundly.",
      },
      {
        title: "Day 30: Visible Changes",
        body: "Skin comfort starts to improve as the omega-3s keep building in the skin barrier. Coat condition begins to look better.",
        note: "Most users noticed a reduction in redness, hot spots, and paw chewing.",
      },
      {
        title: "Day 90: Full Impact",
        body: "Relief has built over the first 90 days. The skin barrier is better supported and your dog is more comfortable in their own skin. After that, daily use maintains it.",
        note: "Most users reported their dog was noticeably more settled, comfortable, and back to themselves.",
      },
    ],
  },
  five: {
    title: "No Fillers, No Artificial Additives",
    body: "It is 100% natural salmon oil with natural vitamin E, with no chicken, beef, corn, wheat or soy. It does contain fish, so check with your vet first if your dog has a known fish allergy.",
    image: "/quiz/fridayzoomies/oil-bottle.webp",
    alt: "A bottle of Friday Zoomies Pure Omega Salmon Oil",
    /* Every line is a claim the plans pages already make. */
    facts: [
      { icon: "flag", label: "Based in the USA" },
      { icon: "leaf", label: "100% natural salmon oil" },
      { icon: "droplet", label: "Just 2 ingredients" },
      { icon: "wheat-off", label: "No corn, wheat or soy" },
      { icon: "shield-check", label: "90 day money back guarantee" },
    ] as { icon: "flag" | "leaf" | "droplet" | "wheat-off" | "shield-check"; label: string }[],
  },
};

export const OFFER = {
  tag: "SAVE 50% TODAY",
  title: "Pure Omega Salmon Oil",
  image: "/quiz/fridayzoomies/oil-bottle.webp",
  alt: "A bottle of Friday Zoomies Pure Omega Salmon Oil",
  bullets: [
    "Made for dogs of all ages and sizes",
    "Omega-3s EPA and DHA from 100% natural salmon oil",
    "Dosed to your dog's weight",
  ],
  rating: "Thousands of happy pups",
  cta: "Try Risk-Free Today With 50% Off",
  trust: ["Relief you can feel. Comfort they deserve.", "Better Skin & Comfort in 90 Days or Your Money Back", "FREE and FAST Shipping"],
  /* The v2 plans page, for now. */
  href: "/quiz/itch/v2/results/plans",
  stickyCta: "Apply Discount And Check Availability",
  stickyHead: "Get 50% off today",
  stickySub: "90 day money back guarantee",
};

export const LEGAL =
  "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Results vary from dog to dog. Check with your veterinarian before starting any new supplement.";
