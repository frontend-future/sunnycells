import type { QuizConfig } from "./types";

/**
 * The aging quiz, as content. Same engine and the same rhythm as the diet and energy
 * funnels: a familiarity read, an education screen, goals, a run of symptom questions,
 * the numbers, a second run, the brand statement, then the email. Only the subject
 * changes. Slugs become URL segments, so they are stable.
 *
 * The questions come from the supplied transcript, adapted in two ways. Where the
 * transcript said "select all that apply" the engine has no multi-select step, so the
 * option that most changes the recommendation is asked for instead. And every mention
 * of another brand is ours: asking a customer where they heard of a competitor is a
 * question this funnel has no reason to ask.
 */

export const agingQuiz: QuizConfig = {
  id: "aging",
  basePath: "/quiz/aging",
  resultsPath: "/quiz/aging/results/analyzing",
  steps: [
  {
    slug: "collagen-familiarity",
    kind: "single",
    question: "How familiar are you with what creatine and collagen do for women over 35?",
    options: ["I am an expert", "I know a thing or two", "I'm a beginner"],
  },
  {
    slug: "how-collagen-works",
    kind: "info",
    question: "What starts slipping after 35",
    body: "Two things fall away at once. Collagen production drops about one percent a year from your mid twenties and steepens around menopause, and lean muscle goes with it. Creatine is the most studied supplement there is for holding onto that muscle, and most women have never been offered it. Between them they explain a lot:",
    bullets: [
      "Fine lines that were not there last year",
      "Skin that has lost its bounce along the jaw",
      "Strength that has quietly dropped off",
      "Hair that sheds more and nails that split",
      "Workouts that take two days to recover from",
      "A dull, tired look that sleep does not fix",
    ],
    cta: "Continue",
  },
  {
    slug: "goals",
    kind: "single",
    question: "Which of these would you most like to improve?",
    options: [
      "Smoother, firmer skin",
      "Strength and lean muscle",
      "Stronger hair and nails",
      "Recovery and staying hydrated",
    ],
  },
  {
    slug: "skin-feel",
    kind: "single",
    question: "How does your skin feel most days?",
    options: ["Dry and flaky", "Oily and shiny", "Combination", "Perfectly balanced"],
  },
  {
    slug: "fine-lines",
    kind: "single",
    question: "Have you noticed fine lines or wrinkles around your eyes, forehead or mouth?",
    options: [
      "Yes, they are impossible to miss",
      "I have noticed, they are fine but visible",
      "Not really, they are barely there",
      "Nothing yet",
    ],
  },
  {
    slug: "skin-concern",
    kind: "single",
    question: "What bothers you most about your skin?",
    options: [
      "Wrinkles and lines",
      "Skin that has lost its firmness",
      "Dull, tired skin",
      "Dark spots and uneven tone",
      "Lack of hydration",
      "Nothing in particular",
    ],
  },
  {
    slug: "collagen-before",
    kind: "single",
    question: "Have you ever taken a collagen supplement?",
    options: ["Yes, I take one now", "Yes, I have in the past", "No, this would be my first"],
  },
  {
    slug: "hair-feel",
    kind: "single",
    question: "How would you describe your hair?",
    options: [
      "Dull with no shine",
      "Frizzy and in need of damage control",
      "Brittle with split ends",
      "Healthy and strong",
    ],
  },
  {
    slug: "hair-condition",
    kind: "single",
    question: "What is the current condition of your hair?",
    options: [
      "Shedding more and starting to thin",
      "Stuck, I cannot get it to grow",
      "My part is getting wider, I see more scalp",
      "No complaints",
    ],
  },
  {
    slug: "protein-days",
    kind: "number",
    question: "How many days a week do you eat a real source of protein?",
    key: "proteinDays",
    units: ["days", "days"],
    prefix: "About",
    trailing: "days a week",
    label: "Days",
    min: 0,
    max: 7,
  },
  {
    slug: "skin-age-now",
    kind: "number",
    question: "How old does your skin look to you right now?",
    key: "skinAge",
    units: ["years", "years"],
    prefix: "About",
    trailing: "years",
    label: "Years",
    min: 18,
    max: 100,
  },
  {
    slug: "skin-age-target",
    kind: "number",
    question: "And where would you like it to be?",
    key: "targetSkinAge",
    units: ["years", "years"],
    prefix: "About",
    trailing: "years",
    label: "Years",
    min: 18,
    max: 100,
  },
  {
    slug: "age",
    kind: "number",
    question: "To us it is just a number, but how old are you?",
    key: "age",
    units: ["years old", "years old"],
    label: "Age",
    prefix: "I am",
    trailing: "years old",
    min: 18,
    max: 100,
  },
  {
    slug: "last-happy-skin",
    kind: "single",
    question: "When was the last time you were happy with your skin?",
    options: ["Less than 6 months ago", "6 to 12 months ago", "1 to 2 years ago", "More than 2 years ago"],
  },
  {
    slug: "fitness",
    kind: "single",
    question: "How often do you do something that works your muscles?",
    options: [
      "Most days, I lift or train hard",
      "A couple of times a week",
      "I walk, and that is about it",
      "Almost never",
    ],
  },
  {
    slug: "hydration",
    kind: "single",
    question: "How do you feel after a workout or a hot day?",
    options: [
      "Wiped out, and it takes hours to come back",
      "Headachy or lightheaded",
      "Sore for a day or two afterwards",
      "Fine, I bounce back quickly",
    ],
  },
  {
    slug: "energy-mood",
    kind: "single",
    question: "Do you experience any of the following?",
    options: [
      "I wake up feeling tired",
      "I have low energy through the day",
      "I notice mood changes",
      "I feel perfectly balanced",
    ],
  },
  {
    slug: "stress",
    kind: "single",
    question: "How tense or rundown do you feel during the day?",
    options: [
      "Tense or overwhelmed most days",
      "Rundown, with low concentration",
      "Only at certain moments of the day",
      "Nothing to report",
    ],
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
    body: "Creatine + Collagen + Electrolytes is three things you were told to take separately, in one raspberry lemonade scoop. 5 g creatine, 10 g collagen peptides, and electrolytes with vitamin C and D3. It will:",
    bullets: [
      "Support strength and lean muscle",
      "Support smoother skin, stronger hair and nails",
      "Replace what a workout takes out of you",
    ],
    footnote: "Continue to get your personal results and learn more about the formula.",
    cta: "Continue",
  },
  {
    slug: "email",
    kind: "email",
    question: "Enter your email",
    subhead: "and see how Creatine + Collagen + Electrolytes can help you",
    placeholder: "Your email address",
    privacy: "We don't send spam or share email addresses. We respect your privacy.",
    cta: "Find my match",
    badge: "50% off your first order",
  },
  ],
};
