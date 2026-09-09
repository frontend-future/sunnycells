import type { QuizConfig } from "./types";

/**
 * SC-26 Anytime Calm, the sleep funnel. Every question, option and line of funnel copy
 * lives here, never inside a component. Slugs become URL segments, so they are stable:
 * renaming one breaks any link already in the wild.
 *
 * GENDER IS NOT IN THIS ARRAY, deliberately. It is asked on the landing page by
 * StartChoice, so the first tap begins the quiz instead of loading another screen,
 * which is how every other funnel here works. buildAnswersPayload reads answers.gender
 * directly for the lead alert; a "gender" step here as well would send it twice.
 *
 * WHO THIS TALKS TO. Mothers who are wrung out and still lying awake. The word "mom"
 * appears in the two education screens, where it is the audience being named, and
 * nowhere on the product itself.
 *
 * CLAIMS FLAG: the whole funnel is structure and function claims about a supplement.
 * "Fall asleep faster" and "stay asleep longer" are the two hardest to defend and both
 * need substantiation on the finished formula. Nothing here says insomnia, anxiety or
 * any other diagnosis, because naming one turns a supplement into an unapproved drug.
 */

export const calmQuiz: QuizConfig = {
  id: "calm",
  basePath: "/quiz/calm",
  resultsPath: "/quiz/calm/results/analyzing",
  steps: [
    {
      slug: "cortisol-familiarity",
      kind: "single",
      question:
        "How familiar are you with how cortisol, also known as the stress hormone, might affect your sleep?",
      options: ["I am an expert", "I know a thing or two", "I'm a beginner"],
    },
    {
      slug: "how-cortisol-works",
      kind: "info",
      question: "How the stress hormone affects your sleep",
      body:
        "Cortisol, also known as the stress hormone, is supposed to drop in the evening so your body can wind down. For a lot of moms, it stays elevated instead. Here are some of the most common signs of an evening cortisol spike:",
      bullets: [
        "Wired but exhausted at bedtime",
        "Racing thoughts the moment your head hits the pillow",
        "Waking up at 2 to 4am and not being able to fall back asleep",
        "Relying on caffeine just to function the next day",
        "Feeling unable to switch off at night",
        "Waking up tired no matter how many hours you slept",
      ],
      cta: "Continue",
    },
    {
      slug: "goals",
      kind: "multi",
      question: "What are your goals?",
      options: [
        "Fall asleep faster",
        "Stay asleep through the night",
        "Wake up feeling rested",
        "Feel calmer in the evenings",
      ],
      cta: "Continue",
    },
    {
      slug: "switching-off",
      kind: "single",
      question: "Do you have a hard time switching off your mind once the kids are down for the night?",
      options: ["Yes, every night", "Some nights", "Not really"],
    },
    {
      slug: "wired-but-tired",
      kind: "single",
      question: "Do you feel wired, anxious, or on edge in the evenings even when you're exhausted?",
      options: ["Yes, most evenings", "Sometimes", "No"],
    },
    {
      slug: "time-to-sleep",
      kind: "single",
      question: "How long does it typically take you to fall asleep once you're in bed?",
      options: ["Over an hour", "30 to 60 minutes", "15 to 30 minutes", "Under 15 minutes"],
    },
    {
      slug: "stress-level",
      kind: "single",
      question: "How stressed or on do you feel by the end of a typical day?",
      options: ["Constantly", "Often", "Sometimes", "Rarely"],
    },
    {
      slug: "afternoon-caffeine",
      kind: "single",
      question: "Do you find yourself reaching for coffee or caffeine just to get through the afternoon?",
      options: ["Every day", "A few times a week", "Rarely or never"],
    },
    {
      slug: "tired-but-cant-sleep",
      kind: "single",
      question: "Despite feeling tired all day, do you still struggle to fall or stay asleep at night?",
      options: ["Yes, most nights", "Sometimes", "No"],
    },
    {
      slug: "night-wakings",
      kind: "single",
      question: "How many times do you typically wake up during the night?",
      options: ["Three or more", "Twice", "Once", "I usually sleep through"],
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
      /* Asked as one band rather than a count and a list of ages, because the funnel
         only uses it to gauge how much of the waking is the household rather than her. */
      slug: "kids",
      kind: "single",
      question: "What ages are your kids?",
      options: [
        "A baby under one",
        "Toddlers or preschoolers",
        "School age",
        "Teenagers",
        "Grown up, or no kids at home",
      ],
    },
    {
      slug: "last-rested",
      kind: "single",
      question: "When was the last time you woke up actually feeling rested?",
      options: ["This week", "A few months ago", "Over a year ago", "Since before the kids"],
    },
    {
      slug: "daytime-tiredness",
      kind: "single",
      question: "How tired do you typically feel during the day?",
      options: ["Exhausted", "Quite tired", "A bit tired", "Fine"],
    },
    {
      slug: "physical-tension",
      kind: "single",
      question: "Do you notice tension, a racing heart, or restlessness when you try to wind down at night?",
      options: ["Yes, most nights", "Sometimes", "No"],
    },
    {
      slug: "screens",
      kind: "single",
      question: "Do you rely on your phone, TV, or scrolling to try to relax before bed?",
      options: ["Every night", "Most nights", "Rarely"],
    },
    {
      slug: "headaches",
      kind: "single",
      question: "Do you suffer from frequent headaches or tension, especially by evening?",
      options: ["Yes, often", "Sometimes", "No"],
    },
    {
      slug: "stress-follows-you",
      kind: "single",
      question: "Does stress from your day tend to follow you into the evening and keep you keyed up?",
      options: ["Yes, most days", "Sometimes", "No"],
    },
    {
      slug: "sleep",
      kind: "single",
      question: "How much sleep do you typically get on a full night?",
      options: ["Less than 5 hours", "5 to 6 hours", "6 to 7 hours", "More than 7 hours"],
    },
    {
      slug: "made-for-you",
      kind: "info",
      question: "Anytime Calm is made for you",
      brandHeading: true,
      bulletIcon: "check",
      body:
        "Anytime Calm is a cortisol-calming drink made for moms running on empty. It is natural, sugar free, and designed to become part of your wind-down routine. It:",
      bullets: [
        "Helps calm evening cortisol spikes",
        "Supports falling asleep faster and staying asleep",
        "Helps you wake up actually feeling rested",
      ],
      footnote: "Continue to get your personal results and learn more about Anytime Calm.",
      cta: "Continue",
    },
    {
      slug: "email",
      kind: "email",
      question: "Enter your email",
      subhead: "to get your personal sleep results",
      placeholder: "you@example.com",
      privacy: "We send your results and nothing else. No sharing, no selling, unsubscribe in one click.",
      cta: "Unlock my results",
      badge: "Your results are ready",
    },
  ],
};
