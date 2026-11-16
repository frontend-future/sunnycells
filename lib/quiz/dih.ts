import type { QuizConfig } from "./types.ts";

/**
 * The /dih-quiz funnel: a short, product-first quiz that ends on a 50% off reveal and then
 * hands off to the v3 plans page. Its own id keeps its answers apart from the itch quiz.
 *
 * Offer wording: "50% off" only. The code is already applied at checkout, so the reveal says
 * so and asks for nothing. Nothing here mentions billing, renewals or a later price.
 */
const IMG = "/quiz/fridayzoomies";

export const dihQuiz: QuizConfig = {
  id: "dih",
  basePath: "/dih-quiz",
  resultsPath: "/quiz/itch/v3/results/plans",
  questionLabels: true,
  steps: [
    {
      slug: "skin-coat",
      kind: "multi",
      question: "Does your dog experience any skin and coat issues?",
      options: ["Itchy skin", "Paw licking", "Inflamed skin", "Hotspots", "Hair loss", "Allergies", "None of the above"],
      exclusive: "None of the above",
      cta: "Next",
    },
    {
      slug: "from-within",
      kind: "info",
      question: "A healthy skin and coat starts from *within*",
      emphasize: true,
      body: "Skin and coat trouble often traces back to what the body gets every day. **Friday Zoomies Pure Omega Salmon Oil** gives your dog EPA and DHA, the omega-3s skin cells use to settle their inflammatory response, so the skin can calm down from the inside.",
      image: { src: `${IMG}/edu/omega-3.webp`, video: `${IMG}/edu/omega-3.mp4`, alt: "A cartoon Labrador licking a drop of salmon oil, with its digestive system shown through its body", frame: "square" },
      cta: "Continue",
    },
    {
      slug: "other-issues",
      kind: "multi",
      question: "What other health problems does your dog experience?",
      options: ["Stiff joints", "Yeasty ears", "Tear stains", "Digestive problems", "Slowing down with age", "Other", "None of the above"],
      exclusive: "None of the above",
      cta: "Next",
    },
    {
      slug: "benefits",
      kind: "info",
      question: "All-in-one benefits for *long-term health*",
      emphasize: true,
      body: "**Friday Zoomies Pure Omega Salmon Oil** is made with only the **main ingredients**, salmon oil and mixed tocopherols, without any filler or harmful ingredients. Its EPA and DHA support calmer skin, a shinier coat, easier movement, a healthy heart and a sharper mind.",
      image: { src: `${IMG}/edu/more-than-relief.webp`, video: `${IMG}/edu/more-than-relief.mp4`, alt: "A happy cartoon Golden Retriever with glowing joints", frame: "square" },
      cta: "Continue",
    },
    {
      slug: "tried-before",
      kind: "single",
      question: "Has your dog tried salmon oil or fish oil before?",
      options: ["Yes", "No", "Not sure"],
    },
    /* Shown only to the dogs that have tried it. The usual objection is "it did nothing", so
       this answers it: skin is slow, and the bottle matters. */
    {
      slug: "not-all-the-same",
      kind: "info",
      showIf: { slug: "tried-before", oneOf: ["Yes"] },
      question: "Your dog deserves *premium* salmon oil",
      emphasize: true,
      body: "Many salmon oils are watered down with filler, so dogs never get enough DHA and EPA. **Friday Zoomies** has **zero unnecessary fillers**, so every pump delivers the full dose.",
      image: { src: `${IMG}/edu/easy-daily.webp`, video: `${IMG}/edu/easy-daily.mp4`, alt: "A cartoon puppy waiting beside a bowl as salmon oil is pumped onto its food", frame: "square" },
      cta: "Continue",
    },
    {
      slug: "simple-step",
      kind: "info",
      showIf: { slug: "tried-before", noneOf: ["Yes"] },
      question: "A simple step with a big difference",
      body: "Even a great diet can leave the skin short of the omega-3s it needs. **Friday Zoomies Pure Omega Salmon Oil** fills that gap with EPA and DHA, omega-3s that are clinically proven to improve itchy skin, scratching and paw licking. Just a pump or two a day at mealtime and your dog is set.",
      image: { src: `${IMG}/edu/easy-daily.webp`, video: `${IMG}/edu/easy-daily.mp4`, alt: "A cartoon puppy waiting beside a bowl as salmon oil is pumped onto its food", frame: "square" },
      cta: "Continue",
    },
    {
      slug: "complete",
      kind: "reveal",
      question: "Your dog is one step closer to calm, comfortable skin",
      body: "Your quiz results show that **Friday Zoomies Pure Omega Salmon Oil** is a great fit for your dog. Calm itchy skin, ease stiff joints and support a sharp mind, now at **50% off**.",
      image: { src: `${IMG}/hero-pyrenees.webp`, alt: "A fluffy white Great Pyrenees lying in the grass" },
      cta: "Reveal my 50% off code",
      panelTitle: "Code for 50% off",
      code: "QUIZ50",
      codeNote: "Already applied to your order. There is nothing you need to enter.",
      panelCta: "See my plan",
    },
  ],
};
