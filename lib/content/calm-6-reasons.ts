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
 * HERO, OPENERS and REASONS are the copy as supplied. The headline no longer states a
 * per-day price, so it needs no exception to the house rule against per-day pricing.
 *
 * The guarantee is stated as 90 days everywhere on this page, also at the user's
 * explicit call. It still does not match lib/quiz/calmPlansContent.ts, which answers
 * the plans page's own FAQ with 30 days for the same product. That file was left
 * alone, since only this page was in scope: worth a pass to bring it in line before
 * both pages are live at once.
 */

export const META = {
  title: "7 Reasons Postpartum Mamas Are Raving About This New Sleepytime Drink",
  description:
    "3 clinically-dosed ingredients. One scoop. 30 seconds. Why moms who've tried everything say this is the only thing that helps them fall asleep, stay asleep, and feel recharged the next day.",
};

export const HERO = {
  title: "7 Reasons Postpartum Mamas Are Raving About This New Sleepytime Drink",
  /* The one word circled by hand in the headline, matched against `title` at render
     time rather than storing markup in a content file. */
  emphasis: "Raving",
  sub: "Moms who've tried everything are saying this is the only thing that helps them fall asleep, stay asleep, and feel fully recharged the next day.",
};

export const OPENERS = [
  "Maybe you've tried the pills or the powders. Or maybe you've been waiting to see if your sleep would improve on its own.",
  "None of it stuck because nothing has worked yet, and it's not your fault.",
  "We made Anytime Calm for mamas dealing with the same issue.\nHere are 7 Reasons Postpartum Mamas Are Raving About This New Sleepytime Drink...",
];

export type Reason = { n: number; title: string; body: string; photo: string; alt: string };

export const REASONS: Reason[] = [
  {
    n: 1,
    title: "30 Second Ritual To Fall Asleep And Stay Asleep",
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
    photo: "/products/anytime-calm/glycine-collagen-skin.png",
    alt: "An illustration of glycine feeding into a collagen strand that builds the skin",
  },
  {
    n: 4,
    title: "Supports Healthy Aging",
    body: "Your body needs glycine to build glutathione, your body's master antioxidant, which declines sharply with age. Taking Anytime Calm helps support your glutathione levels, so you can age gracefully just like your mom and grandma did.",
    photo: "/products/anytime-calm/not-old-just-depleted.png",
    alt: "A woman's face split down the middle, one side desaturated and tired, the other side warm, bright and rested, captioned Not old. Just depleted.",
  },
  {
    n: 5,
    title: "It Tastes Amazing",
    body: "With a natural but not overly sweet cherry-lime flavor, you'll look forward to your sleepytime ritual every night.",
    photo: "/products/anytime-calm/mixed-glass.webp",
    alt: "A tall glass of the mixed cherry lime drink over ice with a wedge of lime, the tub standing behind it",
  },
  {
    n: 6,
    title: "Double The Savings",
    body: "Buying the ingredients individually would cost you more and leave you with a chalky, tasteless drink. With Anytime Calm you'll save 50% on your first order and get to enjoy the benefits without the hassle.",
    photo: "/products/anytime-calm/double-savings.png",
    alt: "Skip the DIY stack: glycine, L-theanine and magnesium glycinate bought separately at $62 a month, versus Anytime Calm at $1.78 a day",
  },
  {
    n: 7,
    title: "You Can Try It Completely Risk Free",
    body: "Try it for yourself. You owe it to yourself. And if you don't absolutely love it or it doesn't work for you (and we know it will), send it back within 90 days with no awkward questions asked.",
    photo: "/products/anytime-calm/guarantee.avif",
    alt: "The 90 day money back guarantee",
  },
];

export const OFFER = {
  title: "Anytime Calm",
  bullets: [
    { lead: "Clinically proven results:", rest: " to help you fall asleep, stay asleep, and wake up feeling refreshed." },
    { lead: "No melatonin, non habit forming:", rest: " morning grogginess will be a thing of the past." },
    { lead: "Flavor you'll crave every night:", rest: " natural cherry-lime flavor will have you looking forward to mommy's nighttime drink every night." },
  ],
  cadence: "Delivered Every 4 Weeks",
  cta: "Try now",
  /* The sticky bar, once reason 3 has scrolled into view: name and "Save 50%"
     stacked in the middle column, "Try now" on the button, so the 50% is stated
     without lengthening the button label into the name column on a narrow phone. */
  stickySave: "Save 50%",
  accordions: [
    { title: "Supplement facts", table: true, body: "Per scoop (5.4 g). One scoop a day, any time from dinner onward, stirred into cold water." },
    { title: "Guarantee", body: "90 days, whole order refunded, and you keep the tub. Email us inside the window." },
    { title: "How to use", body: "One scoop in cold water, any time from dinner onward. Cherry lime, stirred, not shaken." },
  ],
};

/* Replaces the "Subscriber-only benefits" box: a green guarantee banner sitting above
   the collapsibles. */
export const TRUST = {
  guaranteeTitle: "90 day, 100% money back guarantee",
  guaranteeSub: "We're so confident you'll feel the benefits, try it for a full 90 days.",
};

export const DISCLAIMER =
  "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease. Results vary from person to person.";
