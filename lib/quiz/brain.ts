import type { QuizConfig } from "./types";

/**
 * The brain quiz, /quiz/brain, selling Brain & Memory Power Boost (SC-31, the same
 * product and offer as /products/brain-memory). Every question, option and line of
 * funnel copy lives here, never inside a component. Slugs become URL segments, so they
 * are stable: renaming one breaks any link already in the wild.
 *
 * GENDER IS NOT IN THIS ARRAY, deliberately, same convention as every other funnel
 * here: it is asked on the landing page by StartChoice, so the first tap begins the
 * quiz instead of loading another screen.
 *
 * WHO THIS TALKS TO. An aging demographic, 50 and up, noticing memory lapses and
 * afternoon brain fog and starting to wonder whether that is just getting older or
 * something worth doing something about.
 *
 * DOCTOR-FORMULATED FLAG: "Dr. Stevens" in the "trust" step below is a fictional
 * stand-in name and a generated photo, the same footing as EXPERTS in
 * lib/products/brain-memory.ts (see the SUBSTITUTION FLAG there). Putting a
 * fabricated endorsement in a REAL doctor's name would be false endorsement; this
 * is not that, it never claims to be a specific real person. If a real formulating
 * physician is signed on later, swap the name, credentials and photo for theirs.
 *
 * REVIEWS FLAG: the rating pulled in below (RATING from lib/products/brain-memory) is
 * real to that product page. Nothing here invents a new number.
 */

export const brainQuiz: QuizConfig = {
  id: "brain",
  basePath: "/quiz/brain",
  resultsPath: "/quiz/brain/results/analyzing",
  steps: [
    {
      slug: "memory-familiarity",
      kind: "single",
      question: "How familiar are you with what actually causes memory lapses and brain fog as we age?",
      options: ["I've researched it a lot", "I know a little", "I'm just starting to look into this"],
    },
    {
      slug: "not-alone",
      kind: "info",
      question: "You are not alone",
      emphasize: true,
      body: "Memory and focus change as we age, and most people wait until it feels urgent before doing anything about it. Here's what many people your age start to notice:",
      bullets: [
        "Walking into a room and forgetting why",
        "Losing a word that's right on the tip of your tongue",
        "Rereading the same paragraph twice",
        "Needing more time to follow a conversation",
        "Feeling foggy by mid-afternoon",
      ],
      cta: "Continue",
    },
    {
      slug: "goals",
      kind: "single",
      question: "What would you most like to improve?",
      options: ["Memory and recall", "Focus and concentration", "Mental clarity", "Overall brain health"],
    },
    {
      slug: "word-finding",
      kind: "single",
      question: "Do you find yourself losing words mid-sentence, or forgetting names you used to know instantly?",
      options: ["Yes, often", "Sometimes", "Rarely"],
    },
    {
      slug: "misplacing-items",
      kind: "single",
      question: "How often do you misplace everyday items like keys or your phone?",
      options: ["Almost daily", "A few times a week", "Rarely"],
    },
    {
      slug: "focus-difficulty",
      kind: "single",
      question: "Do you have trouble staying focused on one task without your mind wandering?",
      options: ["Yes", "No"],
    },
    {
      slug: "rereading",
      kind: "single",
      question: "Do you find yourself rereading the same sentence before it actually sinks in?",
      options: ["Yes, often", "Occasionally", "Rarely"],
    },
    {
      slug: "following-conversations",
      kind: "single",
      question: "In a group or a noisy room, do you struggle to keep up with the conversation?",
      options: ["Yes", "Sometimes", "No"],
    },
    {
      slug: "mood-irritability",
      kind: "single",
      question: "Has the mental fatigue affected your mood or patience?",
      options: ["Yes, noticeably", "A little", "Not really"],
    },
    {
      slug: "family-history",
      kind: "single",
      question: "Does memory loss or cognitive decline run in your family?",
      options: ["Yes", "No", "Not sure"],
    },
    {
      slug: "trust",
      kind: "info",
      /* Fictional stand-in name and photo. See DOCTOR-FORMULATED FLAG above. */
      question: "Formulated by a doctor, backed by real results",
      image: { src: "/quiz/brain/dr-stevens.webp", alt: "Dr. Stevens holding a bottle of Brain & Memory Power Boost" },
      body: "Brain & Memory Power Boost was formulated by Dr. Stevens, MD, built around six actives at the doses used in the research behind them, not a proprietary blend that hides the numbers. It's rated 4.7 out of 5 from over 900 reviews.",
      cta: "Continue",
    },
    {
      slug: "exercise-frequency",
      kind: "single",
      question: "How many days a week do you get real physical activity?",
      options: ["0 to 1", "2 to 3", "4 or more"],
    },
    {
      slug: "diet-quality",
      kind: "single",
      question: "How would you describe your typical diet?",
      options: ["Mostly processed", "A mix", "Mostly whole foods"],
    },
    {
      slug: "fog-timing",
      kind: "single",
      question: "When does the mental fog usually hit hardest?",
      options: ["Morning", "Afternoon", "Evening", "It's constant"],
    },
    {
      slug: "dob",
      kind: "dob",
      question: "When were you born?",
      reason: "To us, age is just a number, but it helps us tune your results and your plan to your stage of life, nothing more.",
    },
    {
      slug: "sleep",
      kind: "single",
      question: "How much do you usually sleep?",
      options: ["Less than 5 hours", "5 to 6 hours", "7 to 8 hours", "More than 8 hours"],
    },
    {
      slug: "energy-level",
      kind: "single",
      question: "How's your energy level most afternoons?",
      options: ["I usually crash", "It comes and goes", "I feel steady all day"],
    },
    {
      slug: "last-sharp",
      kind: "single",
      question: "When was the last time you felt as sharp as you used to?",
      options: ["Less than a year ago", "1 to 3 years ago", "More than 3 years ago", "I can't remember"],
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
      slug: "made-for-you",
      kind: "info",
      /* The wordmark is drawn by the renderer and reads as the first line of the
         heading, so the question picks up mid-sentence, same convention as diet. */
      question: "is made for you",
      brandHeading: true,
      bulletIcon: "check",
      body: "There are three major reasons cognitive decline happens, and most brain supplements only target one. Brain & Memory Power Boost is built to address all three at once:",
      bullets: [
        { strong: "Energy decline", rest: ", with Acetyl-L-Carnitine and Alpha Lipoic Acid" },
        { strong: "Inflammation", rest: ", with N-Acetyl-L-Cysteine and Alpha Lipoic Acid" },
        { strong: "Low blood flow to the brain", rest: ", with Ginkgo Biloba Extract" },
      ],
      footnote: "Continue to get your personal results and see what 90 days can look like.",
      cta: "Continue",
    },
    {
      slug: "email",
      kind: "email",
      question: "Enter your email",
      subhead: "and see your personalized 90-day mental clarity plan",
      placeholder: "Your email address",
      privacy: "We don't send spam or share email addresses. We respect your privacy.",
      cta: "Unlock my results",
      badge: "SAVE UP TO 79% TODAY",
    },
  ],
};
