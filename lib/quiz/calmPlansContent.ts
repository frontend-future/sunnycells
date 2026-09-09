import type { PlansContent } from "./plansContent";
import { discountPct, maxDiscountPct, PRODUCT, SUPPLY_PLANS } from "@/lib/products/anytime-calm";

/**
 * Everything the Anytime Calm plans page says. The page structure is the diet funnel's,
 * unchanged; this file is the swap.
 *
 * NO REVIEWS. The other funnels carry placeholder testimonials with a standing flag to
 * replace them; this one carries none rather than adding another set of people who do
 * not exist, with generated faces to match. Publishing a written testimonial is illegal
 * in the US under the FTC rule on consumer reviews, which names AI-generated endorsers
 * directly. Both review sections are skipped when empty, so the page reads as a page
 * with no reviews yet rather than a broken one.
 *
 * Doses and prices come from lib/products/anytime-calm.ts. Do not retype them.
 */
export const CALM_PLANS_CONTENT: PlansContent = {
  quizId: "calm",
  productName: PRODUCT.title,
  /* "Up to", because the ladder is 50, 54 and 58 off and each card prints its own.
     Read off the deepest rung rather than typed, so the bar cannot claim a number the
     cards do not back. No countdown: the first order discount is a standing term of the
     brand, not a promotion, so it never carries a deadline. */
  offer: { label: "Standing offer", badge: `up to ${maxDiscountPct()}% off`, countdown: false },
  hero: {
    title: "One scoop, after dinner",
    lede: "SUNNYCELLS is here to settle the evening cortisol that leaves you wired at eleven at night, and to give your body the two things it actually winds down on.",
    points: [
      "3,000 mg glycine and 200 mg L-theanine",
      "200 mg magnesium glycinate",
      "No melatonin, no sugar, no stimulants",
    ],
  },
  productImage: "/product/anytime-calm.webp",
  plansTitle: "Let the evenings settle",
  plansNote: {
    /* Sleep is a habit before it is anything else, and a pattern needs repeats to
       settle. Three months is roughly twelve weeks of the same evening. */
    badge: "12",
    body: "A sleep pattern is not fixed in a night. The evenings usually settle in the first week, the nights stitch back together over the month, and waking up rested is the last part to arrive. Three months gives it twelve weeks of the same routine to hold.",
  },
  /* Every line is something she can notice, on the clock it happens on. Deliberately no
     "fall asleep faster" or "stay asleep longer" as a dated promise: those are the two
     hardest claims in the category to substantiate and they sit closest to implying a
     treatment for a sleep disorder. */
  quickBenefits: [
    { lead: "Evenings that stop feeling switched on in ", strong: "3 to 7 days" },
    { lead: "Getting into bed already sleepy from ", strong: "week 1" },
    { lead: "Fewer nights broken up at three from ", strong: "week 2 to 4" },
    { lead: "Mornings that start without the coffee by ", strong: "week 8" },
  ],
  /* Each card is a promise, a mechanism and a timeframe, in that order. Every one
     carries its own illustration: without it the screen falls back to
     /illustrations/<slug>-<gender>.png, a gendered pair only the diet funnel has drawn,
     and the images 404. */
  pillars: [
    {
      slug: "switch-off",
      illustration: "/products/anytime-calm/wired-tired.webp",
      title: "The evening stops feeling switched on",
      body: "Wired but tired is your stress axis still running long after your body has given up. 200 mg of L-theanine settles that edge without sedating you. It is the first thing most people notice.",
    },
    {
      slug: "fall-asleep",
      illustration: "/products/anytime-calm/wind-down.webp",
      title: "You get into bed already sleepy",
      body: "Glycine is a calming signal your body already uses, and it nudges your core temperature down slightly, which is the drop your body waits for before it lets go. 3,000 mg is the dose the research uses.",
    },
    {
      slug: "stay-asleep",
      illustration: "/products/anytime-calm/sleep.webp",
      title: "Fewer nights that break at three",
      body: "Surfacing at three is the physical side of it: tension, restlessness, a heart that will not settle. 200 mg of magnesium glycinate is the well absorbed form, bound to glycine, and it works on exactly that.",
    },
  ],
  reviews: [],
  ingredientsTitle: "What is actually in Anytime Calm",
  /* Plain language, on purpose. Each panel says what the thing is, then what it does for
     you, in words nobody has to look up. The doses stay: they are the reason to believe,
     and the prose around them is what gets simplified. */
  ingredients: [
    {
      slug: "glycine",
      image: "/products/anytime-calm/powder-macro.webp",
      title: "3,000 mg glycine",
      points: [
        ["It is a calming signal your body already makes", "Glycine is an amino acid. Your body uses it as a quiet-down message, so this is topping up something that is already there rather than adding something foreign."],
        ["It cools you down a little", "Your body drops its temperature slightly before it lets you fall asleep. Glycine helps that happen, which is why it is the biggest thing in the tub."],
      ],
    },
    {
      slug: "l-theanine",
      /* The one real ingredient photograph this repo already had. */
      image: "/ingredients/l-theanine.jpg",
      title: "200 mg L-theanine",
      points: [
        ["It comes from green tea", "This is the part of green tea that makes you feel calm instead of wired. There is no caffeine in it, and none in the tub."],
        ["It turns the noise down", "It quiets a busy head without knocking you out, so you can take it after dinner and not just at bedtime."],
      ],
    },
    {
      slug: "magnesium-glycinate",
      image: "/ingredients/magnesium-glycinate.webp",
      title: "200 mg magnesium glycinate",
      points: [
        ["The kind that is easy on your stomach", "Some magnesium sends you running to the bathroom. This kind does not. It is attached to an amino acid so your body takes it in gently."],
        ["It works on the physical side", "Tight muscles, restless legs, a heart that will not settle. That is the part that wakes you at three, and this is the part of the formula aimed at it."],
      ],
    },
  ],
  howItWorks: [
    { img: "step-scoop", title: "One scoop, after dinner", body: "Cherry lime, stirred into cold water. Thirty seconds, no pills to count.", illustration: "/products/anytime-calm/scoop.webp" },
    { img: "step-drink", title: "Every night, not most nights", body: "Your cortisol rises every single evening, so the night you skip is the one that costs you.", illustration: "/products/anytime-calm/nightstand.webp" },
  ],
  comparisonNote: "Compared to a bedtime routine alone",
  comparison: [
    "Works on the evening cortisol rise itself",
    "3,000 mg glycine at the dose the research uses",
    "200 mg L-theanine for the wired but tired feeling",
    "200 mg magnesium glycinate, the well absorbed form",
    "No melatonin and no morning grogginess",
    "Every dose printed on the front of the tub",
    "No proprietary blend hiding the amounts",
    "One scoop, not a six step wind-down",
    "28 nights in every tub",
    "30 day money back guarantee",
  ],
  faqs: [
    { title: "How do I take it?", body: "One scoop stirred into cold water, any time from dinner onwards. It does not have to be right before bed." },
    { title: "What is actually in it?", body: `${PRODUCT.servingSize} gives you 3,000 mg glycine, 200 mg L-theanine and 200 mg magnesium glycinate. Every amount is printed on the front of the tub.` },
    { title: "Is there melatonin in this?", body: "No, deliberately. Melatonin puts you under and leaves a lot of people groggy. This settles the tension that keeps you switched on instead." },
    { title: "Will it make me drowsy if I take it early?", body: "It is not a sedative, which is the reason it is called Anytime Calm. L-theanine takes the edge off without making you dopey, so an after-dinner scoop does not write off your evening." },
    { title: "How long until I notice anything?", body: "The evenings usually shift inside the first week. Nights waking less tends to follow over the first month. Waking up rested is the last part and the one worth giving two months." },
    { title: "Can I take it with what I am already on?", body: "This is a supplement, not a treatment. If you are pregnant, breastfeeding, taking prescription medication, or managing a health condition, talk to your doctor before starting." },
    { title: "What does it taste like?", body: "Cherry lime, no sugar. It is sweetened with a little stevia and it mixes clear rather than going cloudy." },
    { title: "How long does a tub last?", body: `A tub is ${PRODUCT.servings} nights at one scoop a night.` },
    { title: "Can I cancel?", body: "Yes, in one click from your account, any time. There is no phone call and no fee for stopping." },
    /* The ladder, not a subscribe-or-once framing: this page sells a supply length.
       Built from the same SUPPLY_PLANS the cards render, so it cannot drift. */
    { title: "What does it cost?", body: `${SUPPLY_PLANS.map((p) => `$${p.price} a tub on the ${p.name.toLowerCase()}, ${discountPct(p)}% off`).join("; ")}. Free shipping and a 30 day money back guarantee on all three.` },
    { title: "Medical information, product, reviews, warnings and legal disclaimer", body: "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Results vary from person to person." },
  ],
};
