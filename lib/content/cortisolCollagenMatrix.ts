/**
 * Advertorial copy for /advertorials/cortisol-collagen-matrix.
 *
 * Rendered verbatim as supplied. Two things a reader of this file should know before
 * it goes anywhere near paid traffic:
 *
 *   1. THE BYLINE IS NOT A REAL PERSON. "Dr. Elena Vance" was supplied with the copy.
 *      A credentialed author invented to lend authority to a supplement page is the
 *      single most attackable element in this genre, and it is the one thing the
 *      SC-21 and SC-25 advertorials in this repo deliberately do not do: both are
 *      bylined to the brand. Flagged, not altered, because the brief said verbatim.
 *   2. Youth Matrix Chews is not a product this codebase sells. The formula, the
 *      doses and the SKU below have no counterpart in lib/products, and the CTA
 *      points at /checkout, a route that does not exist.
 *
 * The page is styled as an editorial piece and deliberately runs off the house
 * design system, so it states the standing offer in its own type rather than with
 * OfferFlag. The figures are still derived with firstOrderPrice(), never typed, and
 * the first-order price never appears without the ongoing price beside it.
 */

import { firstOrderPrice, formatPrice } from "@/lib/price";

/** $50 a month, half price on the first order. */
export const MONTHLY = formatPrice(50);
export const FIRST_ORDER = formatPrice(firstOrderPrice(50));

export const META = {
  category: "Dermal Physiology & Cellular Health",
  sub:
    "Here is why women are chewing four of these before bed, and what dermatologists look for when stress starts showing on a face.",
  title:
    "5 Signs High Stress Is Destroying Your Skin’s Collagen Matrix (And the Nightly Ritual Fixing It)",
  author: "By Dr. Elena Vance | 6 min read | Updated Today",
  description:
    "Cortisol-induced dermal collapse, the five warning signs, and the 10-second evening ritual that reverses it.",
} as const;

/**
 * The header, in the format the listicle at /revitalize/10-reasons uses: rating line,
 * title, subtitle, hero shot, then straight into the piece. No masthead, no section
 * rail, no byline furniture.
 *
 * The rating figures are the supplied ones from the PDP, and they are placeholders on
 * the same footing as every other rating in this repo: written to voice, not collected.
 */
export const HERO = {
  rating: "Excellent 4.9",
  count: "1,248 Reviews",
  photo: "/advertorials/cortisol-collagen-matrix/hero-header.webp",
  alt: "Split-screen of the same woman: on the left tired with morning facial puffiness, on the right rested with a sculpted jawline",
} as const;

/** Paid-content disclosure and the FDA line, both at the foot. */
export const FOOT = {
  disclosure:
    "Advertisement. This article is written and paid for by SUNNYCELLS and features a product we sell.",
  footnote:
    "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results vary.",
} as const;

export const CTA = {
  label: "Check availability",
  href: "/checkout?sku=youth-matrix-chews-sub",
} as const;

export const INTRO = [
  "If you’re over 30, you’ve likely experienced the frustration: you spend hundreds of dollars on top-rated night creams, potent retinoids, and luxury hyaluronic serums, yet you still wake up looking tired. Your skin feels thinner, your jawline looks softer, and that stubborn morning puffiness just won’t drain.",
  "Most women blame age. Dermatologists blame a hidden culprit: “Cortisol-Induced Dermal Collapse.”",
  "When you experience daily stress—whether from career demands, family schedules, or poor sleep—your body floods your system with cortisol. While cortisol is vital for survival, chronic nighttime spikes actively dismantle your skin’s structural framework. It chews through collagen fibers, halts natural NAD+ repair, and traps fluid in facial tissue overnight.",
  "Topical creams can only reach the outermost epidermal layer. If high stress is destroying your collagen matrix from the inside, no amount of exterior serum can fix it.",
  "Here are 5 warning signs that high stress is silently breaking down your dermal matrix—and the simple 10-second evening ritual that reverses it.",
] as const;

export type Sign = { n: number; title: string; image: string; alt: string; caption: string; body: string[] };

export const SIGNS: Sign[] = [
  {
    n: 1,
    title: "“Cortisol Face” & Persistent Morning Facial Puffiness",
    image: "/advertorials/cortisol-collagen-matrix/sign-1-puffiness.webp",
    alt: "A woman in a bathrobe at a bathroom mirror in early morning light, touching her swollen under-eye and jawline",
    caption:
      "Cortisol spikes alter vascular permeability, trapping fluid in delicate facial tissue overnight.",
    body: [
      "Do you wake up with swollen under-eyes, a softened jawline, or a generally “stuffed” appearance that takes hours to drain?",
      "When cortisol remains elevated during your sleep window, it disrupts vascular fluid regulation. Instead of your lymphatic system naturally draining fluids overnight, water leaks into the delicate dermal matrix of your face. If you constantly rely on ice rollers or gua sha tools just to look human before your morning coffee, your body is signalling a nighttime cortisol surge.",
    ],
  },
  {
    n: 2,
    title: "Crepey Skin & Loss of Elasticity (The Matrix Breakdown)",
    image: "/advertorials/cortisol-collagen-matrix/sign-2-elasticity.webp",
    alt: "Extreme close-up of a finger gently pinching the skin on a woman’s cheek, showing fine dehydration lines",
    caption:
      "When cortisol activates collagen-destroying enzymes, skin loses its structural bounce-back.",
    body: [
      "If you gently pinch the skin on your cheek and notice fine, crinkly dehydration lines or a slow bounce-back, your dermal density is under attack.",
      "High stress activates specific enzymes called matrix metalloproteinases (MMPs). These biological “scissors” actively slice through healthy collagen and elastin fibers. Over time, your skin’s internal scaffolding hollows out, leading to premature sagging, deeper smile lines, and thin, crepey texture.",
    ],
  },
  {
    n: 3,
    title: "Waking Up at 3 AM “Wired But Tired”",
    image: "/advertorials/cortisol-collagen-matrix/sign-3-wakeup.webp",
    alt: "Overhead view of a woman lying awake in bed at night in blue moonlight, looking at a bedside clock",
    caption:
      "Mid-night wake-ups block the deep slow-wave sleep window required for cellular collagen synthesis.",
    body: [
      "You go to bed exhausted, but suddenly find yourself wide awake at 3:00 AM with a racing mind.",
      "This isn’t just insomnia—it’s a malfunctioning HPA-axis (your body’s stress control center). Your peak pulse of Human Growth Hormone (HGH)—the exact biological trigger responsible for repairing skin tissue and synthesizing new collagen—occurs exclusively during deep, slow-wave sleep. When a nighttime cortisol surge jolts you awake, your skin is deprived of its crucial 8-hour restoration window.",
    ],
  },
  {
    n: 4,
    title: "A Weakened Skin Barrier & Unexpected Flare-Ups",
    image: "/advertorials/cortisol-collagen-matrix/sign-4-barrier.webp",
    alt: "Close-up of a woman’s lower cheek and jawline showing mild redness and dry patches",
    caption:
      "Chronic stress suppresses lipid production, leaving the moisture barrier vulnerable and inflamed.",
    body: [
      "Are you suddenly experiencing unexplained redness, dry patches, or breakouts around your chin and mouth despite using clean products?",
      "Stress depletes cellular NAD+, the essential co-enzyme needed for cellular energy and lipid synthesis. Without sufficient NAD+, your skin barrier develops micro-gaps. Moisture escapes rapidly (causing chronic tightness), while environmental irritants penetrate deeply, triggering localized micro-inflammation.",
    ],
  },
  {
    n: 5,
    title: "Your $150+ Night Creams Have Stopped Working",
    image: "/advertorials/cortisol-collagen-matrix/sign-5-vanity.webp",
    alt: "Top-down flat-lay of a marble bathroom vanity covered in frosted glass skincare jars and serum bottles",
    caption:
      "Topicals only address the top 10% of skin. True structural matrix repair happens internally.",
    body: [
      "You buy the creams endorsed by celebrity estheticians, but the results stall out after two weeks.",
      "This happens because topicals only treat the epidermis (the top 10% of your skin). They cannot reduce systemic vascular inflammation, they cannot lower circulating stress hormones, and they cannot supply raw amino acid building blocks to the deep dermis where collagen is actually manufactured. You are putting an expensive coat of paint on a crumbling foundation.",
    ],
  },
];

export const SOLUTION = {
  heading: "The Breakthrough",
  lead: "To stop cortisol-induced aging, you don’t need a 10-step topical routine. You need an internal solution that does two things simultaneously:",
  numbered: [
    "Downregulates nighttime cortisol so your nervous system enters deep cellular repair mode.",
    "Floods the dermal tissue with targeted amino acids and co-factors to rebuild the structural matrix while you sleep.",
  ],
  bridge:
    "This is why longevity scientists and premium formulation experts developed Youth Matrix Chews by Sunnycells.",
  image: "/advertorials/cortisol-collagen-matrix/product-reveal.webp",
  alt: "A frosted glass jar reading SUNNYCELLS Youth Matrix beside four tart-cherry red gummies on dark green marble",
  caption:
    "Youth Matrix Chews combine clinical-grade dermal building blocks with nervous system adaptogens.",
  after:
    "Instead of forcing you to swallow 5 or 6 massive pills before bed, Youth Matrix delivers a high-density, clinical stack in four delicious, tart-cherry evening chews. It acts as a guilt-free nighttime treat that doubles as the ultimate internal skincare step.",
  stackTitle: "The 4-In-1 Matrix Restoration Stack:",
  stack: [
    {
      lead: "2,500mg Bovine Gelatin (Glycine & Proline):",
      rest: " Supplies the exact amino acid substrate required to rebuild cross-linked collagen fibers and reinforce gut-barrier lining.",
    },
    {
      lead: "100mg Elemental Magnesium Glycinate + 150mg L-Theanine:",
      rest: " Blunts the sympathetic “fight-or-flight” response, lowers core body temperature, and stops the 3 AM cortisol spikes that cause facial puffiness.",
    },
    {
      lead: "150mg High-Purity Niacinamide:",
      rest: " Boosts cellular NAD+ levels overnight, strengthening the lipid barrier and improving moisture retention from within.",
    },
    {
      lead: "60mg Acerola Vitamin C:",
      rest: " Serves as the essential enzymatic trigger required for your body to convert raw amino acids into functional, resilient collagen tissue.",
    },
  ],
} as const;

export const TIMELINE = {
  heading: "Expected Results Timeline",
  rows: [
    {
      when: "Night 1:",
      body: "You fall asleep smoothly without melatonin-induced grogginess. Your central nervous system drops into deep parasympathetic rest.",
    },
    {
      when: "Week 2:",
      body: "You wake up noticing your face feels lighter and visibly drained of morning fluid retention. The “Cortisol Face” puffiness begins to disappear.",
    },
    {
      when: "Week 4 and Beyond:",
      body: "As dermal matrix density restores, skin elasticity improves. Fine lines appear softer, moisture retention increases, and your skin regains its firm, youthful bounce.",
    },
  ],
} as const;

export const OFFER = {
  image: "/advertorials/cortisol-collagen-matrix/refill-vessel.webp",
  alt: "A frosted glass SUNNYCELLS vessel open on a travertine pedestal beside an eco-friendly refill pouch",
  caption:
    "The heavy frosted glass vessel keeps your nightly ritual fresh while looking beautiful on your nightstand.",
  body: [
    "Sunnycells formulates Youth Matrix Chews in small batches using ultra-pure, bioavailable ingredients—free from synthetic fillers, melatonin, or excess sugars.",
    "To eliminate plastic waste, your initial order arrives in a heavy, frosted custom glass vessel designed to sit elegantly on your vanity, accompanied by a 30-day supply of Chews. Subsequent orders arrive in eco-friendly refill pouches.",
  ],
  offerLine: "Standing offer: 50% off your first order",
  offerPrice: `${FIRST_ORDER} for your first month, then ${MONTHLY} a month`,
  guarantee: "Backed by a 30-Day Money-Back Guarantee.",
} as const;
