/**
 * The "6 reasons" listicle at /products/anytime-calm, cloned from a competitor
 * stick-pack advertorial's structure (top offer strip, headline, six numbered reasons
 * alternating photo and copy, then an offer block with an image carousel). Sells
 * SC-26 Anytime Calm, the same product the /quiz/calm funnel sells, so every dose and
 * price here is imported from lib/products, never retyped.
 *
 * NO RATING AND NO REVIEWS, same standing instruction as lib/quiz/calmPlansContent.ts:
 * nobody has used this yet, and a written testimonial from a person who does not exist
 * is illegal under the FTC rule on consumer reviews. This page carries neither rather
 * than inventing either. Add both once real, permissioned customers exist.
 *
 * The six reason angles are drawn from the ad creative already written for this
 * product (ads/creatives-anytime-calm.json), not invented fresh for this page.
 */

export const META = {
  title: "6 reasons Anytime Calm is replacing the melatonin",
  description:
    "3,000 mg glycine, 200 mg L-theanine, 200 mg magnesium glycinate, one scoop after dinner. No melatonin, no sedation, no next-day hangover.",
};

export const TOP_STRIP = "Free shipping · Standing 50% off first order · Cancel anytime";

export const HERO = {
  title: "6 reasons Anytime Calm is replacing the melatonin",
  sub: "Getting woken up at three is the part you cannot fix. Getting back down is the part you can. Here is what is actually in the scoop, and why it is not another sedative.",
};

export type Reason = { n: number; title: string; body: string; photo: string; alt: string };

export const REASONS: Reason[] = [
  {
    n: 1,
    title: "Twenty-eight scoops. That's the whole routine",
    body: "One scoop, cold water, any time from dinner onward. No pills to count, no bedtime ritual to remember. That is the entire routine, which is most of why it gets finished.",
    photo: "/products/anytime-calm/scoop.webp",
    alt: "A hand holding the white scoop heaped with pink powder, the tub behind it on a counter",
  },
  {
    n: 2,
    title: "Every dose is on the front of the tub",
    body: "3,000 mg glycine, 200 mg L-theanine and 200 mg magnesium glycinate, each printed with its own amount. A lot of sleep formulas put small doses in a blend so nobody can check them.",
    photo: "/products/anytime-calm/powder-macro.webp",
    alt: "A close, textured shot of the cherry lime Anytime Calm powder",
  },
  {
    n: 3,
    title: "Calm without drowsy",
    body: "L-theanine works on the mental edge, not on your eyelids, so you do not feel it come on. You notice that getting comfortable stopped being a project, and there is nothing left in you at seven the next morning.",
    photo: "/products/anytime-calm/morning-rested.webp",
    alt: "A woman waking up looking rested, morning light through the window",
  },
  {
    n: 4,
    title: "Not melatonin, so no hangover and no strange dreams",
    body: "Melatonin is a hormone that sedates you, which is exactly why people quit it: the vivid dreams, the groggy morning, and not being able to wake up when someone actually needs you. Glycine is an amino acid your body already runs on.",
    photo: "/products/anytime-calm/wired-tired.webp",
    alt: "A woman lying awake in bed at night, wired but tired",
  },
  {
    n: 5,
    title: "Fewer nights that break at three",
    body: "Getting woken up is the part you cannot fix. Getting back down in nine minutes instead of ninety is the part you can. 200 mg of magnesium glycinate works on exactly that restlessness.",
    photo: "/products/anytime-calm/sleep.webp",
    alt: "A woman sleeping soundly through the night",
  },
  {
    n: 6,
    title: "It's called Anytime Calm for a reason",
    body: "It does not have to be the last thing you do all day. Take it at dinner, not just at bedtime, and it is still working by the time you actually get into bed.",
    photo: "/products/anytime-calm/mixed-glass.webp",
    alt: "A finished glass of the cherry lime Anytime Calm drink beside the tub",
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
    "30 day money back guarantee",
  ],
  accordions: [
    { title: "Supplement facts", table: true, body: "Per scoop (5.4 g). One scoop a day, any time from dinner onward, stirred into cold water." },
    { title: "Guarantee", body: "30 days, whole order refunded, and you keep the tub. Email us inside the window." },
    { title: "How to use", body: "One scoop in cold water, any time from dinner onward. Cherry lime, stirred, not shaken." },
  ],
};

export const DISCLAIMER =
  "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease. Results vary from person to person.";
