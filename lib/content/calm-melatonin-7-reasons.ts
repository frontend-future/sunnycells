/**
 * The "7 reasons" listicle at /products/anytime-calm/melatonin, cloned from
 * lib/content/calm-6-reasons.ts (the postpartum-mom version at /products/anytime-calm).
 * Same product, same page structure, same offer block. Only the hook changes: this one
 * targets people who've already tried melatonin and had it stop working, never work, or
 * leave them groggy, instead of postpartum sleep loss.
 *
 * NO RATING AND NO REVIEWS, same standing instruction as the page this was cloned from:
 * nobody has used this yet, and a written testimonial from a person who does not exist
 * is illegal under the FTC rule on consumer reviews. This page carries neither rather
 * than inventing either. Add both once real, permissioned customers exist.
 *
 * The guarantee is stated as 90 days, matching the page this was cloned from and the
 * guarantee banner on the plans page. It still does not match
 * lib/quiz/calmPlansContent.ts, which answers the plans page's own FAQ with 30 days for
 * the same product, an inconsistency that predates this file.
 */

export const META = {
  title: "7 Reasons People Who Ditched Melatonin Are Raving About This New Sleepytime Drink",
  description:
    "3 clinically-dosed ingredients. One scoop. 30 seconds. Why people who've tried melatonin say this is the only thing that helps them fall asleep, stay asleep, and wake up without the grogginess.",
};

export const HERO = {
  title: "7 Reasons People Who Ditched Melatonin Are Raving About This New Sleepytime Drink",
  /* The one word circled by hand in the headline, matched against `title` at render
     time rather than storing markup in a content file. */
  emphasis: "Raving",
  sub: "People who've tried melatonin are saying this is the only thing that actually helps them fall asleep, stay asleep, and wake up without the grogginess.",
  image: "/products/anytime-calm/hero-before-after.webp",
  imageAlt: "Split screen: a woman wide awake staring at the ceiling in a dark room on the left, a red arrow pointing right, the same woman sound asleep on the right",
};

export const OPENERS = [
  "Maybe melatonin worked for you… until it didn't.",
  "Your body got used to it, so you upped the dose, and you were back to staring at the ceiling by 2am anyway.",
  "Or maybe it never worked at all, just left your mind racing and a headache that lingered the whole next day.",
  "We made Anytime Calm for people who are done chasing a higher melatonin dose.\n\nHere are 7 Reasons People Who Ditched Melatonin Are Raving About This New Sleepytime Drink...",
];

export type Reason = { n: number; title: string; body: string; photo: string; alt: string };

export const REASONS: Reason[] = [
  {
    n: 1,
    title: "It Doesn't Stop Working Like Melatonin Does",
    body: "Melatonin is a hormone, which means your body builds a tolerance to it over time and it eventually stops working, if it ever worked at all. Anytime Calm works differently: it supplies amino acids and minerals your body already uses to calm its own nervous system, instead of adding more of a hormone it's already making. So night 100 feels like night 1.",
    photo: "/products/anytime-calm/melatonin-stops-working.webp",
    alt: "A bar chart titled Melatonin Stops Working, showing its effect shrinking from a tall bar on night 1 to almost nothing by night 100",
  },
  {
    n: 2,
    title: "It Crushes Cortisol And Helps You Fall Asleep Faster",
    body: "Melatonin's whole job is telling your body it's nighttime. That's it. It never touches the stress hormone, cortisol, that actually makes your mind race through tomorrow's to-do list or replay today's conversations in your head. L-theanine and magnesium glycinate take the edge off so that you'll fall asleep quicker.",
    photo: "/products/anytime-calm/racing-to-calm-mind.webp",
    alt: "An illustration of a red head with a tangled, racing mind next to an arrow pointing to a calm yellow head, eyes closed, asleep under a crescent moon",
  },
  {
    n: 3,
    title: "You'll Actually Sleep Through The Night",
    body: "Melatonin metabolizes fast, so a lot of people fall asleep fine and then snap awake at 3am for no obvious reason. That's the hormone wearing off, not you doing something wrong. Glycine doesn't spike and crash the same way, so instead of one sharp knockout you get a steadier sleep that helps you sleep through the night.",
    photo: "/products/anytime-calm/vs-melatonin-night.png",
    alt: "A chart comparing melatonin to Anytime Calm across a night: melatonin falls asleep fast but wears off by 3am with lingering grogginess, Anytime Calm settles in gently, stays asleep through the night, and wakes up refreshed",
  },
  {
    n: 4,
    title: "Every Dose Is Clinically Proven",
    body: "A lot of melatonin supplements hide the real dose behind a 'proprietary blend,' so you can't actually tell what you're taking. Anytime Calm uses three simple ingredients without the junk: Glycine, L-Theanine, and Magnesium Glycinate… the same amounts used in the studies, not a fraction of them.",
    photo: "/products/anytime-calm/mg-for-mg.png",
    alt: "A table matching the published research dose for glycine, L-theanine and magnesium glycinate against what is actually in Anytime Calm, mg for mg",
  },
  {
    n: 5,
    title: "It Tastes Amazing",
    body: "With a natural but not overly sweet cherry-lime flavor, you'll look forward to your sleepytime ritual every night.",
    photo: "/products/anytime-calm/hero-mix.webp",
    alt: "A scoop of Anytime Calm powder pouring into a glass of water, the tub beside it on a kitchen counter",
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
    body: "Try it for yourself. If it doesn't work for you, send it back within 90 days for a full refund, no awkward questions asked.",
    photo: "/products/anytime-calm/guarantee.avif",
    alt: "The 90 day money back guarantee",
  },
];

export const OFFER = {
  title: "Anytime Calm",
  bullets: [
    { lead: "Clinically proven results:", rest: " to help you fall asleep, stay asleep, and wake up feeling refreshed." },
    { lead: "No melatonin, non habit forming:", rest: " morning grogginess will be a thing of the past." },
    { lead: "Flavor you'll crave every night:", rest: " natural cherry-lime flavor will have you looking forward to your nighttime drink every night." },
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
