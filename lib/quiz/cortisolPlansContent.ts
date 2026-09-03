import type { PlansContent } from "./plansContent";
import { discountPct, maxDiscountPct, SUPPLY_PLANS } from "@/lib/products/youth-matrix-chews";

/**
 * Everything the cortisol plans page says. The page structure is the diet funnel's,
 * unchanged; this file is the swap.
 *
 * NO REVIEWS. The other three funnels carry placeholder testimonials with a standing
 * flag to replace them; this one carries none rather than adding a fourth set of
 * people who do not exist, with faces to match. Both review sections are skipped when
 * they are empty, so the page reads as a page with no reviews yet rather than a broken
 * one. Add them here when there are real customers who have given permission.
 *
 * Doses and prices come from lib/products/youth-matrix-chews.ts. Do not retype them.
 */
export const CORTISOL_PLANS_CONTENT: PlansContent = {
  quizId: "cortisol",
  productName: "Youth Matrix Chews",
  /* "Up to", because the ladder is 50, 54 and 58 off and each card prints its own.
     Read off the deepest rung rather than typed, so the bar cannot claim a number the
     cards do not back. Still no countdown: the first order discount is a standing term
     of the brand, not a promotion, so it never carries a deadline. */
  offer: { label: "Standing offer", badge: `up to ${maxDiscountPct()}% off`, countdown: false },
  hero: {
    title: "Four chews, before bed",
    lede: "SUNNYCELLS is here to settle the cortisol that keeps your face puffy and to give your skin the material it rebuilds with.",
    points: [
      "Magnesium glycinate with L-theanine",
      "2,500 mg gelatin and vitamin C for collagen",
      "No melatonin, no stimulants",
    ],
  },
  productImage: "/product/youth-matrix-chews.webp",
  plansTitle: "Let the chews do the work",
  plansNote: {
    /* The one figure on this page that is actually measurable: skin turns over on
       roughly a four week cycle, so a month is one cycle and three is three. */
    badge: "4",
    body: "Your skin grows a whole new layer about every 4 weeks. The puffiness goes first, usually in two weeks, because that part is just water. Getting firm again takes longer. Three months gives your skin three full rounds to rebuild.",
  },
  /* Every line is something she can see happening, on the clock it happens on. */
  quickBenefits: [
    { lead: "Falling asleep without lying there in ", strong: "3 to 7 days" },
    { lead: "Waking up with the puffiness drained in ", strong: "2 weeks" },
    { lead: "A jawline you can see again by ", strong: "week 4" },
    { lead: "Firmer, smoother skin from ", strong: "week 8" },
  ],
  /* Each card is a promise, a mechanism and a date, in that order. Every one carries
     its own illustration: without it the screen falls back to /illustrations/<slug>-
     <gender>.png, a gendered pair only the diet funnel has drawn, and the images 404. */
  pillars: [
    {
      slug: "puffiness",
      illustration: "/products/youth-matrix-chews/pdp-before-after.webp",
      title: "The morning puffiness drains",
      body: "Raised evening cortisol changes how your vessels hold water overnight, which is why you wake up swollen. Magnesium glycinate with L-theanine settles that before you sleep. Fluid is the fastest thing here to move.",
    },
    {
      slug: "firmness",
      illustration: "/products/youth-matrix-chews/pdp-clinical-matrix.webp",
      title: "Firmness comes back",
      body: "Cortisol switches on the enzymes that cut collagen faster than you lay it down. 2,500 mg of gelatin supplies the glycine and proline to rebuild with, and vitamin C is the cofactor without which none of it assembles.",
    },
    {
      slug: "sleep",
      illustration: "/products/youth-matrix-chews/pdp-routine-vanity.webp",
      title: "Asleep, and still asleep at three",
      body: "Waking at three is the stress axis firing in the window when repair happens. This lowers the tension behind it. There is no melatonin in it on purpose: melatonin puts you under and leaves you groggy.",
    },
  ],
  reviews: [],
  ingredientsTitle: "The science behind Youth Matrix Chews",
  /* Plain language, on purpose. Each panel says what the thing is, then what it does
     for you, in words nobody has to look up. The doses stay: they are the reason to
     believe, and the prose around them is what gets simplified.

     PHOTOGRAPHY: every panel now shows the ingredient itself rather than a product
     shot. l-theanine was already in the repo; the other four come from
     scripts/build-ingredient-shots.mjs. */
  ingredients: [
    {
      slug: "gelatin",
      image: "/ingredients/gelatin.webp",
      title: "2,500 mg bovine gelatin",
      points: [
        ["It is what collagen is made of", "Collagen is the stuff under your skin that keeps it tight. Your body builds it out of tiny pieces called amino acids. Gelatin is those pieces."],
        ["It works while you sleep", "Your skin only does this building at night. That is why you take these before bed and not in the morning."],
      ],
    },
    {
      slug: "magnesium-glycinate",
      image: "/ingredients/magnesium-glycinate.webp",
      title: "100 mg magnesium glycinate",
      points: [
        ["The kind that is easy on your stomach", "Some magnesium sends you running to the bathroom. This kind does not. It is attached to an amino acid so your body takes it in gently."],
        ["It helps your body wind down", "It loosens tight muscles and cools you down a little. Getting slightly cooler is one of the signals that tells your body it is time to sleep."],
      ],
    },
    {
      slug: "l-theanine",
      /* The one real ingredient photograph this repo already had. */
      image: "/ingredients/l-theanine.jpg",
      title: "150 mg L-theanine",
      points: [
        ["It comes from green tea", "This is the part of green tea that makes you feel calm instead of wired. There is no caffeine in it."],
        ["It turns the noise down", "It quiets a busy mind without knocking you out, so you wake up clear instead of foggy."],
      ],
    },
    {
      slug: "niacinamide",
      image: "/ingredients/niacinamide.webp",
      title: "150 mg niacinamide",
      points: [
        ["It powers the night shift", "Your skin cells need fuel to repair themselves overnight. This is what gives them that fuel."],
        ["It patches your skin back up", "Your skin has a thin outer layer that holds water in and keeps irritation out. Stress wears it thin. This helps build it back from the inside."],
      ],
    },
    {
      slug: "vitamin-c",
      image: "/ingredients/acerola-vitamin-c.webp",
      title: "60 mg acerola vitamin C",
      points: [
        ["Your body cannot make collagen without it", "Gelatin gives your body the parts. Vitamin C is what snaps them together. Without it the parts just sit there."],
        ["It comes from acerola cherries", "A small red cherry with a lot of vitamin C in it. It is here to do a job, not to pad the label."],
      ],
    },
  ],
  howItWorks: [
    { img: "step-chew", title: "Four chews, after dinner", body: "Tart cherry. No water, no counting out pills, no shaker to wash.", illustration: "/products/youth-matrix-chews/four-chews.webp" },
    { img: "step-sleep", title: "Every night, not most nights", body: "Your cortisol goes up every single night, so the night you skip is the one that costs you.", illustration: "/ingredients/night-routine.webp" },
  ],
  comparisonNote: "Compared to a nighttime skincare routine",
  comparison: [
    "Works below the epidermis, where collagen is lost",
    "2,500 mg gelatin as collagen substrate",
    "Vitamin C so your body can actually assemble it",
    "Settles the nighttime cortisol rise itself",
    "No melatonin and no morning grogginess",
    "Every dose printed on the front",
    "No proprietary blend hiding the amounts",
    "Four chews, not a six step routine",
    "30 nights in every jar",
    "30 day money back guarantee",
  ],
  faqs: [
    { title: "How do I take them?", body: "Four chews in the evening, after dinner or on the way to bed. No water needed." },
    { title: "What is actually in them?", body: "2,500 mg bovine gelatin, 100 mg magnesium glycinate with 150 mg L-theanine, 150 mg niacinamide, and 60 mg acerola vitamin C. Every amount is printed on the front." },
    { title: "Is there melatonin in this?", body: "No, deliberately. Melatonin puts you under and leaves a lot of people groggy. This lowers the tension that wakes you at three instead." },
    { title: "How long until I notice anything?", body: "Sleep usually shifts inside the first week. Puffiness is the visible one and tends to go in about two weeks, because it is fluid. Firmness runs on skin turnover, roughly four weeks a cycle, so give that two months." },
    { title: "Can I take them with my skincare?", body: "Yes. They work under the layer a topical reaches, so they are not doing the same job." },
    { title: "Will this help if my hormones are already treated?", body: "Cortisol is a separate axis from the sex hormones, which is why the symptoms can persist after those are handled. That said, this is a supplement, not a treatment, and your doctor is the person to ask about your own case." },
    { title: "Is it a gummy or a chew?", body: "A soft chew, tart cherry, made on a gelatin base. Not a hard gummy and not a capsule." },
    { title: "Is it suitable for vegetarians?", body: "No. Gelatin is an animal protein, so there is no vegetarian version of this formula." },
    { title: "How long does a jar last?", body: "A jar is 30 nights at four chews a night." },
    { title: "Can I cancel?", body: "Yes, in one click from your account, any time. There is no phone call and no fee for stopping." },
    { title: "Are there any side effects?", body: "Most people have none. If you are pregnant, breastfeeding, taking prescription medication, or managing a health condition, talk to your doctor before starting." },
    /* The ladder, not the PDP's subscribe-or-once framing: this page sells a supply
       length. Built from the same SUPPLY_PLANS the cards render, so it cannot drift. */
    { title: "What does it cost?", body: `${SUPPLY_PLANS.map((p) => `$${p.price} a jar on the ${p.name.toLowerCase()}, ${discountPct(p)}% off`).join("; ")}. Free shipping and a 30 day money back guarantee on all three.` },
    { title: "Medical information, product, reviews, warnings and legal disclaimer", body: "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Results vary from person to person." },
  ],
};
