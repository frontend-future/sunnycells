/**
 * The eight carousel slides for SC-25, in the reference's order, because the order is
 * the argument. Reading the reference's sequence and what each position is doing:
 *
 *   1. Product on a plain ground. Answers "what am I buying" with no words at all.
 *   2. The outcome stack. What your life looks like after, not how it works. Icons and
 *      short lines, scannable in three seconds. This is the emotional slide.
 *   3. What is inside. The real facts panel with each ingredient translated into a job,
 *      so a layperson can read a label. This is the proof slide.
 *   4. The timeline. Sets expectation and is the argument for staying subscribed.
 *   5. The comparison. Names the alternatives the buyer is actually weighing and beats
 *      them on one axis.
 *   6. FAQ. Objections handled inside the carousel, for people who never scroll.
 *   7. Origin. A human reason the thing exists.
 *   8. Guarantee. Risk reversal, last thing before the decision.
 *
 * Ours keeps all eight positions and swaps the content to the cortisol argument. The
 * one deliberate change is slide 7: the reference uses a founder's personal story, and
 * we do not have one that is true, so that position carries the thing that IS true and
 * that nobody else in the aisle does, which is printing the strength of every claim.
 *
 * TYPE IS COMPOSITED IN HTML, NOT GENERATED. Generated lettering garbles at this size
 * every time. scripts/build-carousel.mjs renders these to 1080x1080 with Playwright.
 */

export const SLIDES = {
  /* 1. Identity. */
  product: {
    file: "01-product",
    photo: "/product/revitalize/studio.webp",
  },

  /* 2. Outcome. Nine lines, the shape of a day that is not running on cortisol. */
  outcome: {
    file: "02-outcome",
    title: "What a day off the cortisol curve looks like",
    items: [
      { icon: "check", text: "No afternoon cravings" },
      { icon: "check", text: "No 4pm brain fog" },
      { icon: "check", text: "No hair in the brush" },
      { icon: "check", text: "No shadows under your eyes" },
      { icon: "check", text: "No tight neck and jaw" },
      { icon: "check", text: "No burning eyes by five" },
      { icon: "check", text: "No lines arriving early" },
      { icon: "check", text: "No second coffee at three" },
      { icon: "check", text: "Evenings you have something left for" },
    ],
  },

  /* 3. Proof. The real panel, each active translated into its job. */
  inside: {
    file: "03-inside",
    title: "What's inside",
    left: [
      { name: "Vitamin C", claim: "Build collagen" },
      { name: "Gelatin, 10 g", claim: "Protein and the amino acids collagen is made of" },
      { name: "Magnesium glycinate", claim: "Calm the tension" },
      { name: "Vitamin B5", claim: "Feed the stress response" },
      { name: "Vitamin D3", claim: "For the indoor day" },
    ],
    right: [
      { name: "Vitamin B1", claim: "Turn food into energy" },
      { name: "Vitamin B3", claim: "Skin and energy" },
      { name: "Glucomannan", claim: "Slow the stomach down" },
      { name: "Lutein and zeaxanthin", claim: "For the screen" },
      { name: "Allulose", claim: "Sweet, with no added sugar" },
    ],
  },

  /* 4. Timeline. Staged by the biology, same clock as the page. */
  timeline: {
    file: "04-timeline",
    title: "What happens when you take Revitalize",
    cols: [
      { when: "Week 1", tone: "a", items: ["The 3pm hole shallows", "You stop grazing", "Sleep comes easier"] },
      { when: "Month 3", tone: "b", items: ["Skin has turned over once", "Calm is the baseline", "Steady through a long day"] },
      { when: "Month 6+", tone: "c", items: ["Hair grown on the new intake", "Macular pigment built", "The good days outnumber"] },
    ],
  },

  /* 5. Comparison. The three things a desk worker is actually choosing between. */
  compare: {
    file: "05-compare",
    title: "Stop choosing between tired and wired",
    photo: "/product/revitalize/marble.webp",
    us: "Revitalize",
    them: ["Coffee", "A multivitamin"],
    rows: [
      { label: "Energy without a crash", us: true, a: false, b: false },
      { label: "10 g of protein", us: true, a: false, b: false },
      { label: "Feeds what cortisol spends", us: true, a: false, b: true },
      { label: "Keeps you full to dinner", us: true, a: false, b: false },
      { label: "Something you look forward to", us: true, a: true, b: false },
      { label: "Every dose printed on the front", us: true, a: false, b: true },
    ],
  },

  /* 6. Objections. */
  faq: {
    file: "06-faq",
    title: "Frequently asked questions",
    photo: "/product/revitalize/hand.webp",
    items: [
      { q: "What is Revitalize?", a: "Four cherry lime gummies a day for what a desk job takes out of you." },
      { q: "How does it work?", a: "Making cortisol burns through vitamin C and pantothenic acid all day. This puts them back, adds 10 g of protein so 3pm is not a raid on the snack drawer, and carries the B vitamins your energy metabolism runs on." },
      { q: "Is there caffeine in it?", a: "None. Nothing in the pack raises your heart rate, so there is nothing to crash from." },
      { q: "How long until I notice?", a: "The afternoon changes first, usually inside a week. Skin and hair run on a three to six month clock and nobody can shortcut that." },
    ],
  },

  /* 7. Trust. The reference uses a founder story. We use the thing that is true. */
  honesty: {
    file: "07-honesty",
    title: "We print the weak claims too",
    photo: "/product/revitalize/monitor.webp",
    body: [
      "Sixteen things stress does to you are on our product page. Next to every one is how good the evidence actually is, in three grades.",
      "Six of them carry a caveat we wrote ourselves. Our glucomannan is a sixth of the dose in the European claim, and it says so. Our lutein is 5 mg against a trial that used 12 mg, and it says so. Nothing here reverses gray hair.",
      "Every other label in this aisle asserts all of it equally. Read ours, then go and read one of theirs.",
    ],
    kicker: "The strong claims are worth more when you can see we did not inflate the weak ones.",
  },

  /* 8. Risk reversal. */
  guarantee: {
    file: "08-guarantee",
    photo: "/product/revitalize/studio.webp",
    title: "30 day money back",
    body: "Try Revitalize for 30 days. If the afternoon does not change, email us and we refund the whole order. Keep the pouch.",
  },
} as const;

/** The order they render and the order they appear in the gallery. */
export const SLIDE_ORDER = [
  "01-product", "02-outcome", "03-inside", "04-timeline",
  "05-compare", "06-faq", "07-honesty", "08-guarantee",
] as const;
