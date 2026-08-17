import type { QuizConfig } from "./types";

/**
 * The diet quiz, as content. Every question, option, and line of funnel copy lives
 * here, never inside a component. Slugs become URL segments, so they are stable:
 * renaming one breaks any link already in the wild.
 */

export const dietQuiz: QuizConfig = {
  id: "diet",
  basePath: "/quiz/diet",
  resultsPath: "/quiz/diet/results/analyzing",
  steps: [
  {
    slug: "cortisol-familiarity",
    kind: "single",
    question: "How familiar are you with how cortisol, also known as the stress hormone, might affect your mood and weight?",
    options: ["I am an expert", "I know a thing or two", "I'm a beginner"],
  },
  {
    slug: "how-cortisol-works",
    kind: "info",
    question: "How the stress hormone affects your body",
    body: "Cortisol also known as stress hormone plays a central role in nearly every long-term health problem. Here are some of the most common symptoms of increased cortisol:",
    bullets: [
      "Can't lose weight no matter what you do",
      "Have tension and chronic pain",
      "Feeling like your nervous system is dysregulated",
      "Struggling with anxiety",
      "Have cortisol belly that does not seem to go away",
      "Feeling like you have no energy",
    ],
    cta: "Continue",
  },
  {
    slug: "goals",
    kind: "single",
    question: "What are your goals?",
    options: ["Losing weight", "Have more energy", "Improving my mood", "Improving overall health"],
  },
  {
    slug: "skin-changes",
    kind: "single",
    question: "Are you experiencing skin changes like thinning, easy bruising, acne, or unusual facial hair growth?",
    options: ["Yes", "No"],
  },
  {
    slug: "brain-fog",
    kind: "single",
    question: "Do you feel fatigued or have difficulty concentrating, often described as “brain fog”?",
    options: ["Yes", "No"],
  },
  {
    slug: "belly-weight-gain",
    kind: "single",
    question: "Have you noticed unexplained weight gain, especially around your belly?",
    options: ["Yes", "No"],
  },
  {
    slug: "stress-level",
    kind: "single",
    question: "How stressed or anxious do you feel during the day?",
    options: ["I am usually always stressed", "Only at certain moments of the day", "I usually feel good"],
  },
  {
    slug: "weight-loss-difficulty",
    kind: "single",
    question: "Despite your efforts, do you find it challenging to lose weight?",
    options: ["Yes", "No"],
  },
  { slug: "height", kind: "height", question: "What's your height?" },
  {
    slug: "current-weight",
    kind: "number",
    question: "What's your current weight?",
    key: "weight",
    units: ["lb", "kg"],
    label: "Weight",
    min: 60,
    max: 500,
  },
  {
    slug: "target-weight",
    kind: "number",
    question: "What's your target weight?",
    key: "targetWeight",
    units: ["lb", "kg"],
    label: "Weight",
    min: 60,
    max: 500,
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
    slug: "last-content-weight",
    kind: "single",
    question: "When was the last time you were content with your body weight?",
    options: ["Less than 6 months ago", "6 to 12 months ago", "1 to 2 years ago", "More than 2 years ago"],
  },
  {
    slug: "daytime-tiredness",
    kind: "single",
    question: "How tired do you typically feel during the day?",
    options: [
      "I usually feel tired all day long",
      "I feel tired before meals",
      "I feel sleepy after lunch",
      "I am a ball of fire all day long",
    ],
  },
  {
    slug: "thirst-urination",
    kind: "single",
    question: "Have you noticed an increase in thirst and how often you need the bathroom?",
    options: ["Yes", "No"],
  },
  {
    slug: "headaches",
    kind: "single",
    question: "Do you suffer from frequent headaches?",
    options: ["Yes", "No"],
  },
  {
    slug: "moon-face",
    kind: "single",
    question: "Does your face appear rounder or puffier than usual, sometimes called “moon face”?",
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
    question: "SUNNYCELLS is made for you",
    body: "SC-21 Metabolic Morning Blend is one scoop in water, taken in the morning. It carries ashwagandha, rhodiola, and L-theanine at the doses used in published trials, plus inositol and phosphatidylserine. No stimulants, so it does not push cortisol further up to make you feel something.",
    bullets: [
      "One scoop a day, thirty seconds, no pills to count",
      "Doses printed on the front of the pack, not hidden in a blend",
      "Free shipping, always, with no minimum to reach",
      "Skip, change, or cancel from your account, with no call",
    ],
    cta: "Continue",
  },
  {
    slug: "email",
    kind: "email",
    question: "Where should we send your results?",
    body: "Your answers stay attached to this address so you can come back to them. Order updates and your results, nothing else.",
    cta: "Show my results",
  },
  ],
};
