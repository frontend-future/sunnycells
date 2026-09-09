/**
 * The "7 reasons" listicle at /products/anytime-calm, cloned from a competitor
 * stick-pack advertorial's structure (top offer strip, headline, opener, seven
 * numbered reasons alternating photo and copy, then an offer block with an image
 * carousel). Sells SC-26 Anytime Calm, the same product the /quiz/calm funnel sells,
 * so every dose and price here is imported from lib/products, never retyped.
 *
 * NO RATING AND NO REVIEWS, same standing instruction as lib/quiz/calmPlansContent.ts:
 * nobody has used this yet, and a written testimonial from a person who does not exist
 * is illegal under the FTC rule on consumer reviews. This page carries neither rather
 * than inventing either. Add both once real, permissioned customers exist.
 *
 * HERO, OPENERS and REASONS are the copy as supplied. The headline's "$1.78/day" is
 * back at the user's explicit call, overriding the house rule against per-day pricing
 * (which forces a decimal and the system's prices are otherwise integers only).
 *
 * The guarantee is stated as 90 days everywhere on this page, also at the user's
 * explicit call. It still does not match lib/quiz/calmPlansContent.ts, which answers
 * the plans page's own FAQ with 30 days for the same product. That file was left
 * alone, since only this page was in scope: worth a pass to bring it in line before
 * both pages are live at once.
 */

export const META = {
  title: "7 reasons postpartum moms are raving about this $1.78/day sleepytime drink",
  description:
    "3 clinically-dosed ingredients. One scoop. 30 seconds. Why moms who've tried everything say this is the only thing that helps them fall asleep, stay asleep, and feel recharged the next day.",
};

export const HERO = {
  title: "7 reasons postpartum moms are raving about this $1.78/day sleepytime drink",
  sub: "3 clinically-dosed ingredients. One scoop. 30 seconds. Addicting taste. Here's why moms who've tried everything are saying this is the only thing that helps them fall asleep, stay asleep, and feel fully recharged the next day.",
};

export const OPENERS = [
  "You've tried the pills. You've tried the powders. You've tried doing nothing and hoping you'd feel better on your own.",
  "None of it stuck because none of it was easy enough to stick with.",
];

export type Reason = { n: number; title: string; body: string; photo: string; alt: string };

export const REASONS: Reason[] = [
  {
    n: 1,
    title: "It Takes 30 Seconds",
    body: "Mix a scoop into a glass of water, stir and enjoy. No need to get out the blender, no need for other supplements, you've got all the nutrients you need in just one scoop.",
    photo: "/products/anytime-calm/scoop.webp",
    alt: "A hand holding the white scoop heaped with pink powder, the tub behind it on a counter",
  },
  {
    n: 2,
    title: "Every Dose Is Clinically Proven",
    body: "If you've ever taken a supplement and not felt anything, and let's face it, most of us have, odds are it was because the company undercut your dose to jack up their profits. Anytime Calm is different. Every scoop contains all the nutrients needed from the latest sleep research so you can return to having restorative sleep.",
    photo: "/products/anytime-calm/mg-for-mg.png",
    alt: "A table matching the published research dose for glycine, L-theanine and magnesium glycinate against what is actually in Anytime Calm, mg for mg",
  },
  {
    n: 3,
    title: "Brings Your Skin To Life",
    body: "Glycine is a primary building block of collagen, which helps your skin glow like it did in your 20s. Now how's that for a side effect?",
    photo: "/products/anytime-calm/hold-woman.webp",
    alt: "A woman with a healthy, glowing complexion",
  },
  {
    n: 4,
    title: "Supports Healthy Aging",
    body: "Your body needs glycine to build glutathione, your body's master antioxidant, which declines sharply with age. Taking Anytime Calm helps support your glutathione levels, so you can age gracefully just like your mom and grandma did.",
    photo: "/products/anytime-calm/story.webp",
    alt: "A woman relaxing in the evening with a glass of the Anytime Calm drink",
  },
  {
    n: 5,
    title: "It Tastes Amazing",
    body: "With a natural but not overly sweet cherry-lime flavor, you'll look forward to your sleepytime ritual every night.",
    photo: "/products/anytime-calm/cherries-lime.webp",
    alt: "Fresh cherries and lime, the flavor behind the Anytime Calm powder",
  },
  {
    n: 6,
    title: "Double The Savings",
    body: "Buying the ingredients individually would cost you more and leave you with a chalky, tasteless drink. With Anytime Calm you'll save 50% on your first order and get to enjoy the benefits without the hassle.",
    photo: "/products/anytime-calm/pack-open.webp",
    alt: "An open tub of Anytime Calm beside the scoop",
  },
  {
    n: 7,
    title: "You Can Try It Completely Risk Free",
    body: "Try it for yourself. You owe it to yourself. And if you don't absolutely love it or it doesn't work for you (but we know it will), send it back within 90 days with no awkward questions asked.",
    photo: "/products/anytime-calm/nightstand.webp",
    alt: "The Anytime Calm tub and scoop on a nightstand beside a lamp",
  },
];

export const OFFER = {
  title: "Anytime Calm",
  bullets: [
    { lead: "Three actives, three doses:", rest: " glycine, L-theanine and magnesium glycinate, each printed on the tub." },
    { lead: "No melatonin:", rest: " nothing here sedates you, so there is no next-day hangover to plan around." },
    { lead: "Calm without drowsy:", rest: " you notice the edge come off, not your eyelids getting heavy." },
    { lead: "Third-party tested:", rest: " every batch, with the amounts on the front, not in a blend." },
  ],
  servingsLabel: `${28} servings per tub`,
  cta: "Start now",
  benefitsTitle: "Subscriber-only benefits",
  benefits: [
    "Standing 50% off your first order",
    "Free shipping, always",
    "Skip or cancel in two clicks",
    "90 day money back guarantee",
  ],
  accordions: [
    { title: "Supplement facts", table: true, body: "Per scoop (5.4 g). One scoop a day, any time from dinner onward, stirred into cold water." },
    { title: "Guarantee", body: "90 days, whole order refunded, and you keep the tub. Email us inside the window." },
    { title: "How to use", body: "One scoop in cold water, any time from dinner onward. Cherry lime, stirred, not shaken." },
  ],
};

export const DISCLAIMER =
  "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease. Results vary from person to person.";
