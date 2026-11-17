import type { QuizConfig } from "./types.ts";

/**
 * The /plc-quiz funnel: a symptom-led, four-step-then-result quiz (3 questions, 2 education
 * screens) that ends on a 50% off reveal and hands off to the v3 plans page. Its own id keeps
 * its answers apart from the other quizzes.
 *
 * Offer wording: "50% off" only. The code is already applied at checkout.
 */
const IMG = "/quiz/fridayzoomies";

export const plcQuiz: QuizConfig = {
  id: "plc",
  basePath: "/plc-quiz",
  resultsPath: "/quiz/itch/v3/results/plans",
  questionLabels: true,
  steps: [
    {
      slug: "signs",
      kind: "multi",
      question: "Does your dog show any signs of skin trouble?",
      options: ["Scratching", "Paw licking", "Head shaking", "Dull or flaky coat", "Stiff joints", "None of the above"],
      exclusive: "None of the above",
      cta: "Continue",
    },
    {
      slug: "root-cause",
      kind: "info",
      question: "Target the root cause of your dog's itch",
      emphasize: true,
      body: "Scratching, licking and shaking are signals from the skin. Skin cells rely on the omega-3s EPA and DHA to settle their inflammatory response, and most diets fall short. **Friday Zoomies Pure Omega Salmon Oil** adds them back, clinically proven to improve itchy skin, so your dog can calm down from the inside out.",
      image: { src: `${IMG}/edu/omega-3.webp`, video: `${IMG}/edu/omega-3.mp4`, alt: "A cartoon Labrador licking a drop of salmon oil, with its digestive system shown through its body", frame: "square" },
      cta: "Continue",
    },
    {
      slug: "routine",
      kind: "multi",
      question: "What is your dog's current itch routine?",
      options: ["Daily chews", "Salmon oil", "Shampoo, spray or vet medication", "None of the above"],
      exclusive: "None of the above",
      cta: "Continue",
    },
    /* Anyone who already uses a salmon oil sees the objection handler; everyone else the default. */
    {
      slug: "premium-oil",
      kind: "info",
      showIf: { slug: "routine", oneOf: ["Salmon oil"] },
      question: "Your dog deserves premium salmon oil",
      emphasize: true,
      body: "Many salmon oils are watered down with filler, so dogs never get enough DHA and EPA. **Friday Zoomies** has **zero unnecessary fillers**, so every pump delivers the full dose. Relief builds over 90 days of daily use.",
      image: { src: `${IMG}/edu/easy-daily.webp`, video: `${IMG}/edu/easy-daily.mp4`, alt: "A cartoon puppy waiting beside a bowl as salmon oil is pumped onto its food", frame: "square" },
      cta: "Continue",
    },
    {
      slug: "boost",
      kind: "info",
      showIf: { slug: "routine", noneOf: ["Salmon oil"] },
      question: "Give your dog's skin a clinically proven boost",
      emphasize: true,
      body: "Upgrade your dog's routine with **Friday Zoomies Pure Omega Salmon Oil**, made with only the main ingredients, salmon oil and mixed tocopherols, and zero unnecessary fillers. Just a pump or two a day at mealtime and your dog gets the omega-3s they need.",
      image: { src: `${IMG}/edu/easy-daily.webp`, video: `${IMG}/edu/easy-daily.mp4`, alt: "A cartoon puppy waiting beside a bowl as salmon oil is pumped onto its food", frame: "square" },
      cta: "Continue",
    },
    {
      slug: "weight",
      kind: "single",
      question: "How much does your dog weigh?",
      cards: true,
      options: ["Small dog, under 25 lbs", "Medium dog, 25-75 lbs", "Large dog, over 75 lbs"],
    },
    {
      slug: "complete",
      kind: "reveal",
      question: "Start their journey to calmer skin today",
      body: "Your quiz results show that **Friday Zoomies Salmon Oil** is a great fit for your dog. Calm itchy skin and ease stiff joints, now at **50% off**.",
      image: { src: `${IMG}/hero-oil.webp`, alt: "A fluffy white Great Pyrenees lying in the grass next to a bottle of Friday Zoomies salmon oil" },
      cta: "Claim 50% Off",
      panelTitle: "Code for 50% off",
      code: "QUIZ50",
      codeNote: "Already applied to your order. There is nothing you need to enter.",
      panelCta: "See my plan",
    },
  ],
};
