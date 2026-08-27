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
    question: "How familiar are you with what collagen does for your skin, hair and nails?",
    options: ["I am an expert", "I know a thing or two", "I'm a beginner"],
  },
  {
    slug: "how-collagen-works",
    kind: "info",
    question: "What happens to your collagen after 25",
    body: "Your body makes about one percent less collagen every year from your mid twenties, and the drop steepens around menopause. Collagen is the scaffolding under your skin, in your hair follicles, your nails and your joints, which is why it shows up in all of them at once:",
    bullets: [
      "Fine lines that were not there last year",
      "Skin that has lost its bounce along the jaw",
      "Hair that sheds more and grows slower",
      "Nails that split before they get long",
      "Joints that ache after the things you enjoy",
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
      "Stronger, thicker hair",
      "Stronger nails",
      "Staying active without the aches",
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
    question: "Which best describes your fitness level?",
    options: [
      "The gym is my second home",
      "I work out regularly",
      "I walk, and that is about it",
      "Does lifting my drink count?",
    ],
  },
  {
    slug: "digestion",
    kind: "single",
    question: "Do you have any digestion or stomach concerns?",
    options: [
      "I get a lot of bloating",
      "There are foods I cannot eat",
      "Occasional constipation",
      "My stomach has things covered",
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
    body: "Complete Collagen is hydrolyzed collagen and nothing else, types I, II, III, V and X in one unflavored scoop. It goes into the coffee you already drink without changing it. It will:",
    bullets: [
      "Support smoother, firmer looking skin",
      "Support stronger hair and nails",
      "Support the joints you need for an active life",
    ],
    footnote: "Continue to get your personal results and learn more about Complete Collagen.",
    cta: "Continue",
  },
  {
    slug: "email",
    kind: "email",
    question: "Enter your email",
    subhead: "and see how Complete Collagen can help you",
    placeholder: "Your email address",
    privacy: "We don't send spam or share email addresses. We respect your privacy.",
    cta: "Find my match",
    badge: "50% off your first order",
  },
  ],
};
