import type { QuizConfig } from "./types";

/**
 * The brain age quiz, /quiz/brain/v3. A second, alternate funnel for Brain & Memory
 * Power Boost (SC-31, the same product as /products/brain-memory and /quiz/brain),
 * built to mirror a competitor gut-health quiz's structure, pacing and question
 * density almost 1:1: more multi-select questions than the original brain quiz, a
 * mid-quiz reinforcement interstitial, a medication screen, and a dynamic
 * concern-to-solution reveal keyed to her actual answers rather than a static one.
 *
 * "Brain age" replaces that reference funnel's weight-loss framing as the
 * before/after hook: lib/quiz/brainV3Assessment.ts computes it from these answers,
 * always sizably higher than her real age, never an implausible one. See that
 * file's own comments for the formula and its floor/ceiling.
 *
 * GENDER IS NOT IN THIS ARRAY, same convention as every other funnel here: asked
 * on the landing page by StartChoice.
 *
 * MEDICATIONS FLAG: step 15 asks which medications she takes without first asking
 * a yes/no gate. The engine has no conditional branching between steps, so rather
 * than build that for one screen, "None of the above" carries the "No" case.
 */
export const brainV3Quiz: QuizConfig = {
  id: "brain-v3",
  basePath: "/quiz/brain/v3",
  resultsPath: "/quiz/brain/v3/results/analyzing",
  steps: [
    {
      slug: "goals",
      kind: "multi",
      question: "What are your goals?",
      options: ["Sharper memory", "Improving my overall health", "Improving my focus and mental clarity"],
    },
    {
      slug: "mental-engagement",
      kind: "single",
      question: "How often do you do mentally engaging activities, like reading or puzzles or learning something new?",
      options: ["Every day", "Often", "Sometimes", "Never"],
    },
    {
      slug: "brain-healthy-eating",
      kind: "single",
      question: "How often do you eat foods that support brain health, like fatty fish, leafy greens, nuts or berries?",
      options: ["Every day", "Often", "Sometimes", "Never"],
    },
    {
      slug: "decline-check",
      kind: "single",
      question: "Have you noticed your memory or focus getting worse in the last year?",
      options: ["Yes", "No"],
    },
    {
      slug: "where-it-hits",
      kind: "multi",
      question: "Which of these happen to you?",
      options: [
        "Walking into a room and forgetting why",
        "Losing your train of thought mid-conversation",
        "Misplacing everyday items",
        "Struggling to focus at work",
        "All of the above",
      ],
    },
    {
      slug: "tried-before",
      kind: "multi",
      question: "What have you tried in the last year to help with focus or memory?",
      options: ["None", "Brain training apps", "Caffeine or energy drinks", "Meditation", "Sleep tracking", "Other supplements"],
    },
    {
      slug: "symptoms",
      kind: "multi",
      question: "Do you experience any of the following?",
      options: [
        "Brain fog or fatigue",
        "Trouble finding words",
        "Losing focus easily",
        "Trouble following conversations",
        "Forgetting names or appointments",
        "None of the above",
      ],
    },
    {
      slug: "daily-issues",
      kind: "multi",
      question: "Do you struggle with any of the following?",
      options: ["Forgetting where I put things", "Low energy or motivation", "Mood swings or irritability", "None"],
    },
    {
      slug: "habits",
      kind: "multi",
      question: "Do you sometimes tend to...",
      options: [
        "Multitask constantly",
        "Skip mentally restful breaks",
        "Rely on caffeine to push through",
        "Push through exhaustion",
        "None of the above",
      ],
    },
    {
      slug: "reinforcement",
      kind: "info",
      question: "We got you",
      invert: true,
      image: { src: "/quiz/brain/bottle-1-cutout.webp", alt: "A bottle of Brain & Memory Power Boost", size: 220 },
      body: "That's definitely something we can help with. Brain & Memory Power Boost is built around six research-backed actives:",
      bullets: [
        { strong: "Cellular energy support", rest: ", with Acetyl-L-Carnitine" },
        { strong: "Antioxidant defense", rest: ", with N-Acetyl-L-Cysteine and Alpha Lipoic Acid" },
        { strong: "Healthy blood flow", rest: ", with Ginkgo Biloba Extract" },
      ],
      bulletIcon: "check",
      footnote: "Let's finish the quiz and get to your results.",
      cta: "Continue",
    },
    {
      slug: "exercise-status",
      kind: "single",
      question: "Do you exercise?",
      options: ["Yes, I do", "Sometimes", "Not really"],
    },
    {
      slug: "exercise-routine",
      kind: "multi",
      question: "What best describes your exercise routine?",
      options: ["Walking or light activity", "Strength training", "Cardio", "Yoga or Pilates", "Sports", "None of the above"],
    },
    {
      slug: "alcohol",
      kind: "single",
      question: "How often do you drink alcohol?",
      options: ["Rarely or never", "Weekends only", "A few times a week", "Daily"],
    },
    {
      slug: "medications",
      kind: "single",
      question: "Do you take any medications?",
      options: ["I do", "No"],
    },
    {
      slug: "medication-types",
      kind: "multi",
      question: "To understand your results better, which medications are you taking?",
      options: ["Blood pressure medication", "Antidepressants", "Anti-anxiety medication", "Diabetes medication", "None of the above"],
    },
    {
      slug: "dob",
      kind: "dob",
      question: "When were you born?",
      reason: "To us, age is just a number, but it helps us tune your results to your stage of life.",
    },
    {
      slug: "last-sharp",
      kind: "single",
      question: "How many years ago did you last feel as sharp as you used to?",
      options: ["Less than 1 year", "1 to 3 years", "3 to 5 years", "More than 5 years"],
    },
    {
      slug: "email",
      kind: "email",
      question: "Your results are saved and waiting",
      subhead: "We'll send your brain age report and unlock your offer",
      placeholder: "Your email address",
      privacy: "We don't send spam or share email addresses. We respect your privacy.",
      cta: "Unlock my results",
      badge: "Sale up to 58% off",
    },
  ],
};
