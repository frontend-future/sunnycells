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
    title: "What a day with Revitalize looks like",
    items: [
      { icon: "check", text: "No 3:30 PM pantry raids" },
      { icon: "check", text: "No afternoon brain fog" },
      { icon: "check", text: "No morning puffy face" },
      { icon: "check", text: "No dark circles under your eyes" },
      { icon: "check", text: "No tight neck or jaw tension" },
      { icon: "check", text: "No screen-strained eyes by 5 PM" },
      { icon: "check", text: "No premature fine lines" },
      { icon: "check", text: "No second cup of afternoon coffee" },
      { icon: "check", text: "No feeling too drained to enjoy your evenings" },
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
      { when: "Week 1", tone: "a", items: [
        "Afternoon cravings vanish",
        "3 PM energy crash disappears",
        "Sleep feels deeper and more restful",
      ] },
      { when: "Month 1", tone: "b", items: [
        "Face looks noticeably less puffy",
        "Cortisol belly starts shrinking",
        "Skin stays calm and smooth under deadline stress",
      ] },
      { when: "Month 3", tone: "c", items: [
        "Fine lines and screen strain fade",
        "Steady focus is your new baseline",
        "You look and feel rested, even on 60-hour weeks",
      ] },
    ],
  },

  /* 5. Comparison. The three things a desk worker is actually choosing between. */
  compare: {
    file: "05-compare",
    title: "Stop choosing between tired and wired",
    photo: "/product/revitalize/marble.webp",
    us: "Revitalize",
    them: ["Coffee", "Multivitamin"],
    rows: [
      { label: "All-day energy without jitters or crashes", us: true, a: false, b: false },
      { label: "Satiety-boosting protein matrix", us: true, a: false, b: false },
      { label: "Flushes cortisol & shields against screen strain", us: true, a: false, b: false },
      { label: "Kills afternoon pantry cravings until dinner", us: true, a: false, b: false },
      { label: "A daily ritual you actually look forward to", us: true, a: true, b: false },
      { label: "Fully transparent, high-potency ingredients", us: true, a: false, b: true },
    ],
  },

  /* 6. Objections. */
  faq: {
    file: "06-faq",
    title: "Frequently asked questions",
    photo: "/product/revitalize/hand.webp",
    items: [
      { q: "What is Revitalize?",
        a: "A daily morning chew designed to protect desk workers from screen-induced aging, cortisol stress, and afternoon fatigue." },
      { q: "How does it work?",
        a: "High-stress workweeks rapidly drain your body\u2019s key nutrients. Revitalize replenishes what stress burns through, delivers satiety-boosting gelatin to kill 3:30 PM cravings, and filters screen strain to keep your skin and eyes protected." },
      { q: "Is there caffeine in it?",
        a: "Zero. There are no synthetic stimulants or jittery herbs, just clean bioenergetic nutrients that lift afternoon brain fog without a heart-racing crash later." },
      { q: "How fast will I see results?",
        a: "You\u2019ll notice fewer cravings, smoother energy, and better sleep in Week 1. Visible physical benefits like reduced morning puffiness and smoother skin build continuously through Months 1 to 3." },
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
    badge: "/photos/revitalize/effects/guarantee.webp",
    title: "60 day money back",
    body: "Try Revitalize for 60 days. If the afternoon does not change, email us and we refund the whole order. Keep the pouch.",
  },
} as const;

/** The order they render and the order they appear in the gallery. */
export const SLIDE_ORDER = [
  "01-product", "02-outcome", "03-inside", "04-timeline",
  "05-compare", "06-faq", "07-honesty", "08-guarantee",
] as const;
