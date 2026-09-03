import type { QuizConfig } from "./types";

/**
 * The cortisol skin quiz, as content. Every question, option, and line of funnel copy
 * lives here, never inside a component. Slugs become URL segments, so they are stable:
 * renaming one breaks any link already in the wild.
 *
 * GENDER IS NOT IN THIS ARRAY, deliberately. It is asked on the landing page by
 * StartChoice, so the first tap begins the quiz instead of loading another screen,
 * which is how /quiz/diet and /quiz/aging both work. buildAnswersPayload in types.ts
 * reads answers.gender directly for the lead alert; putting a "gender" step in here as
 * well would send it twice, once as "Gender" and once as the question. So gender is
 * still question one for the visitor, it just is not step one for the router.
 *
 * PLACEHOLDER FLAG: the rating on the landing page is written to voice, not collected.
 * Same footing as every other rating in this repo.
 */

export const cortisolQuiz: QuizConfig = {
  id: "cortisol",
  basePath: "/quiz/cortisol",
  /* analyzing -> summary -> projection -> benefits, then the product page. The other
     funnels carry a story screen and their own plans/cart/checkout after benefits;
     this one hands to /products/youth-matrix-chews, which already has a real buy box,
     because there is no SKU, cart or order builder for Youth Matrix in lib/products to
     drive a checkout of its own. */
  resultsPath: "/quiz/cortisol/results/analyzing",
  steps: [
  {
    slug: "cortisol-familiarity",
    kind: "single",
    question:
      "How familiar are you with how cortisol, also known as the stress hormone, might affect your skin and aging?",
    options: ["I am an expert", "I know a thing or two", "I'm a beginner"],
  },
  {
    slug: "how-cortisol-works",
    kind: "info",
    question: "How the stress hormone affects your skin overnight",
    body: "Cortisol is meant to fall at night so your skin can repair. When it stays high, the repair window closes. Here is what that looks like in the mirror:",
    bullets: [
      "Waking up puffy, with fluid held under the eyes and along the jaw",
      "Fine lines arriving earlier than they should",
      "Skin that has lost its firmness and takes longer to bounce back",
      "A face that looks rounder or heavier than it used to",
      "Flushing, redness and a barrier that reacts to everything",
      "Expensive creams that stopped making any difference",
    ],
    cta: "Continue",
  },
  {
    slug: "goals",
    kind: "single",
    question: "What are your goals?",
    options: [
      "Firmer, lifted skin",
      "Less morning puffiness",
      "Fewer fine lines",
      "Calmer skin and better sleep",
    ],
  },
  {
    slug: "morning-bloat",
    kind: "single",
    question: "Do you experience morning facial puffiness or bloating?",
    options: ["Yes, most mornings", "Sometimes", "No"],
  },
  {
    slug: "jaw-tension",
    kind: "single",
    question: "Do you experience jaw tension or frequent headaches?",
    options: ["Yes, often", "Sometimes", "No"],
  },
  {
    slug: "fine-lines-wrinkles",
    kind: "single",
    question: "Have you noticed new fine lines or wrinkles?",
    options: ["Yes, and they arrived fast", "A few, gradually", "No"],
  },
  {
    slug: "stress-level",
    kind: "single",
    question: "How stressed or anxious do you feel during the day?",
    options: ["Constantly", "Often", "Sometimes", "Rarely"],
  },
  {
    slug: "skin-elasticity",
    kind: "single",
    question: "Have you noticed a loss of firmness or elasticity in your skin?",
    options: ["Yes", "No"],
  },
  {
    slug: "skincare-frustration",
    kind: "single",
    question: "Despite your efforts, do your creams and serums fail to improve your skin?",
    options: ["Yes", "No"],
  },
  {
    slug: "skin-type",
    kind: "single",
    question: "What's your skin type?",
    options: ["Dry", "Oily", "Combination", "Sensitive"],
  },
  {
    slug: "life-stage",
    kind: "single",
    question:
      "Which best describes where you are — perimenopause, menopause, post-menopause, or none of these?",
    options: ["Perimenopause", "Menopause", "Post-menopause", "None of these"],
  },
  {
    slug: "skin-goal-outcome",
    kind: "single",
    question: "What would your ideal skin look and feel like?",
    options: [
      "A jawline I can see again",
      "Waking up without the puffiness",
      "Smooth, plump and hydrated",
      "Calm, even and no longer reactive",
    ],
  },
  {
    slug: "age",
    kind: "number",
    question: "What's your age?",
    key: "age",
    units: ["years old", "years old"],
    label: "Age",
    prefix: "I am",
    trailing: "years old",
    min: 18,
    max: 100,
  },
  {
    slug: "last-content-skin",
    kind: "single",
    question: "When was the last time you felt confident in your skin without makeup?",
    options: [
      "Within the past year",
      "One to three years ago",
      "More than three years ago",
      "I honestly can't remember",
    ],
  },
  {
    slug: "morning-flushing",
    kind: "single",
    question: "Do you experience flushed or overheated skin in the mornings?",
    options: ["Yes, often", "Sometimes", "No"],
  },
  {
    slug: "sleep-quality",
    kind: "single",
    question: "Do you have trouble falling asleep, staying asleep, or both?",
    options: ["Falling asleep", "Staying asleep", "Both", "Neither"],
  },
  {
    slug: "already-treated-hormones",
    kind: "single",
    question: "Have you already addressed your hormones but still notice these symptoms?",
    options: [
      "Yes, and the symptoms are still here",
      "Yes, and it helped a little",
      "No, I haven't addressed them",
    ],
  },
  {
    slug: "moon-face",
    kind: "single",
    question:
      "Does your face appear rounder or puffier than usual, sometimes called “cortisol face”?",
    options: ["Yes", "No"],
  },
  {
    slug: "sleep",
    kind: "single",
    question: "How much do you usually sleep?",
    options: ["Less than 5 hours", "5 to 6 hours", "7 to 8 hours", "More than 8 hours"],
  },
  {
    slug: "made-for-you",
    kind: "info",
    /* The wordmark is drawn by the renderer and reads as the first line of the
       heading, so the question picks up mid-sentence. */
    question: "is made for you",
    brandHeading: true,
    bulletIcon: "check",
    /* The full stack, in the order the PDP and the advertorial list it. Keep the
       five in step with lib/products/youth-matrix-chews.ts: an ingredient named on one
       surface and missing on another is the kind of thing a reader notices. */
    body: "Youth Matrix Chews are four tart-cherry evening chews that work while you sleep. Gelatin, magnesium glycinate, L-theanine, niacinamide and vitamin C, with no melatonin. They will:",
    bullets: [
      "Help settle the nighttime cortisol that keeps your face puffy",
      "Supply the amino acids your skin rebuilds collagen from",
      "Support the deep sleep window when repair actually happens",
    ],
    footnote:
      "Continue to see what we recommend for your skin and learn more about Youth Matrix Chews.",
    cta: "Continue",
  },
  {
    slug: "email",
    kind: "email",
    question: "Enter your email",
    subhead: "and see what we recommend for your skin",
    placeholder: "Your email address",
    privacy: "We don't send spam or share email addresses. We respect your privacy.",
    cta: "See my recommendation",
    badge: "50% off your first order",
  },
  ],
};
