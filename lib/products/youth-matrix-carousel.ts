/**
 * Gallery slides for Youth Matrix Chews, rendered by
 * scripts/build-youth-matrix-carousel.mjs to 1080x1080.
 *
 * These replace positions 3 to 6 of the plans page carousel, which were four generic
 * product photographs doing no selling: a jar with a pouch, a vanity at night, a
 * collagen render and a before/after. The four here each carry an argument, and they
 * follow the same positions the SC-25 carousel uses, because the order is the argument:
 * proof, then expectation, then the alternatives, then risk reversal.
 *
 * TYPE IS COMPOSITED IN HTML, NOT GENERATED. Generated lettering garbles at this size
 * every time and this project has the failures on record to prove it. The photography
 * comes from fal, the words come from here, and the words stay editable.
 */

/**
 * The panel. Every %DV below is computed from the FDA adult reference value, not
 * estimated: vitamin C 90 mg, niacin 16 mg NE, magnesium 420 mg. Gelatin and
 * L-theanine have no established value and say so rather than carrying a number.
 * Calories, sugars and the other nutrition-facts lines are NOT here because nobody
 * has measured them for this product, and a made-up figure on a facts panel is the
 * one place a guess becomes a regulatory problem.
 */
export const FACTS = {
  servingSize: "4 chews",
  servingsPerContainer: 30,
  rows: [
    { name: "Vitamin C (from acerola cherry)", amount: "60 mg", dv: "67%" },
    { name: "Niacin (as niacinamide)", amount: "150 mg", dv: "938%" },
    { name: "Magnesium (as magnesium glycinate)", amount: "100 mg", dv: "24%" },
    { name: "Bovine gelatin", amount: "2,500 mg", dv: "†" },
    { name: "L-theanine", amount: "150 mg", dv: "†" },
  ],
  footnotes: ["† Daily Value not established."],
} as const;

export const SLIDES = {
  /* Proof. The real panel, each ingredient translated into the job it does. */
  inside: {
    file: "03-inside",
    title: "What's inside",
    left: [
      { name: "Gelatin", claim: "The material collagen is built from" },
      { name: "Vitamin C", claim: "Lets your body assemble it" },
      { name: "Magnesium", claim: "Settles the body for sleep" },
    ],
    right: [
      { name: "L-theanine", claim: "Quiets the racing mind" },
      { name: "Niacinamide", claim: "Overnight skin repair" },
      { name: "No melatonin", claim: "So no morning grogginess" },
    ],
  },

  /* Expectation, on the clock the biology actually runs on. */
  timeline: {
    file: "04-timeline",
    title: "What happens when you take Youth Matrix",
    photo: "/products/youth-matrix-chews/four-chews.webp",
    cols: [
      { when: "Week 1", items: [
        "You fall asleep without lying there",
        "You stop waking at three",
        "Mornings start a little easier",
      ] },
      { when: "Week 2", items: [
        "The puffiness under your eyes drains",
        "Your cheeks look less swollen",
        "Your jawline starts showing again",
      ] },
      { when: "Week 8", items: [
        "Skin feels firmer, not soft",
        "Fine lines look softer",
        "You look rested in photographs",
      ] },
    ],
  },

  /* The three things someone with this problem is actually choosing between. */
  compare: {
    file: "05-compare",
    title: "Creams work on the top. This works underneath.",
    photo: "/products/youth-matrix-chews/pdp-routine-vanity.webp",
    us: "Youth Matrix",
    them: ["Night cream", "Collagen pills"],
    rows: [
      { label: "Reaches below the surface, where collagen is lost", us: true, a: false, b: true },
      { label: "Settles the cortisol causing the damage", us: true, a: false, b: false },
      { label: "Vitamin C so your body can use the collagen", us: true, a: false, b: false },
      { label: "Helps you sleep, with no melatonin", us: true, a: false, b: false },
      { label: "Every dose printed on the front", us: true, a: false, b: false },
      { label: "Four sweets, not a six step routine", us: true, a: false, b: false },
    ],
  },

  /* Risk reversal, last thing before the decision. */
  guarantee: {
    file: "06-guarantee",
    photo: "/product/youth-matrix-chews.webp",
    title: "30 day money back",
    body: "Take them for 30 nights. If your face does not look less puffy in the morning, email us and we refund the whole order. Keep the jar.",
  },
} as const;

/** The order they render, and the order they appear in the gallery. */
export const SLIDE_ORDER = ["03-inside", "04-timeline", "05-compare", "06-guarantee"] as const;
