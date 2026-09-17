import type { QuizConfig } from "./types";

/**
 * The joint quiz, /quiz/joint, for SC-02 Hip & Joint Chews (lib/products/dog-joint.ts).
 * Same positive -> neutral -> negative functional-question arc as the itch quiz
 * (see lib/quiz/itch.ts): towards language about what she wants for her dog,
 * then observational questions about the dog itself, then the OWNER's own
 * admissions before the pressure release question.
 *
 * GENDER IS NOT IN THIS ARRAY: asked on the landing page by StartChoice, same
 * convention as every other funnel here, just asking about the dog instead.
 */
export const jointQuiz: QuizConfig = {
  id: "joint",
  basePath: "/quiz/joint",
  resultsPath: "/quiz/joint/results/analyzing",
  steps: [
    /* ---------- positive third ---------- */
    {
      slug: "goals",
      kind: "multi",
      question: "You want your dog to...",
      options: [
        "Jump on the bed or couch again without hesitating",
        "Run and play without stiffness holding them back",
        "Get up from lying down without struggling",
        "Just have peace of mind that it's nothing serious",
      ],
    },
    {
      slug: "dog-name",
      kind: "text",
      question: "What's your dog's name?",
      placeholder: "e.g. Max",
    },
    {
      slug: "dog-size",
      kind: "single",
      question: "How big is {name}?",
      options: ["Small (under 20 lbs)", "Medium (20-50 lbs)", "Large (50-90 lbs)", "Extra large (90+ lbs)"],
    },
    {
      slug: "dog-age",
      kind: "single",
      question: "How old is {name}?",
      options: ["Puppy (under 1 year)", "Young adult (1-3 years)", "Adult (4-7 years)", "Senior (8+ years)"],
    },

    /* ---------- neutral third ---------- */
    {
      slug: "where-it-hits",
      kind: "multi",
      question: "Where does {name} seem stiff or sore?",
      options: ["Back legs or hips", "Front legs or shoulders", "Back", "Not sure, just seems slower overall"],
    },
    {
      slug: "frequency",
      kind: "single",
      question: "How often do you notice {name} struggling with stiffness?",
      options: ["Every morning, then it eases up", "Constantly, it's hard to watch", "Mostly after exercise or long walks", "Comes and goes"],
    },
    {
      slug: "visible-signs",
      kind: "multi",
      question: "Have you noticed any of these?",
      options: ["Limping or favoring a leg", "Trouble with stairs or jumping onto furniture", "Slow to get up after resting", "Reluctance to play or go on walks", "None of these yet"],
    },
    {
      slug: "injury-ruled-out",
      kind: "single",
      question: "Have you already ruled out an injury or sprain?",
      options: ["Yes, no injury", "Not sure", "I think so, but haven't checked recently", "No, I haven't checked"],
    },
    {
      slug: "triggers",
      kind: "multi",
      question: "When does it seem to get worse?",
      options: ["After long walks or exercise", "In cold or damp weather", "After lying down for a while", "No clear pattern"],
    },
    {
      slug: "tried-before",
      kind: "multi",
      question: "What have you already tried?",
      options: ["Joint supplements", "Weight management or diet change", "Vet visit or medication", "Physical therapy or acupuncture", "Nothing yet"],
    },

    /* ---------- negative third: about the owner, not the dog ---------- */
    {
      slug: "duration",
      kind: "single",
      question: "I've been noticing {name}'s stiffness for...",
      options: ["Under a month", "1 to 6 months", "6 months to a year", "Over a year"],
    },
    {
      slug: "owner-feeling",
      kind: "multi",
      question: "Watching {name} slow down makes me feel...",
      options: ["Frustrated that nothing has worked", "Guilty that I can't fix it", "Worried it's something serious", "Helpless"],
    },
    {
      slug: "stuck",
      kind: "multi",
      question: "No matter what I try, I...",
      options: [
        "can't seem to get {name}'s stiffness under control",
        "feel like I'm failing {name}",
        "run out of ideas",
        "end up right back where I started",
      ],
    },
    {
      slug: "fears",
      kind: "multi",
      question: "The thing I'm most afraid of is...",
      options: [
        "This turning into arthritis or something permanent",
        "Expensive vet bills that keep adding up",
        "{name} being in pain and not being able to tell me",
        "Watching {name} slow down for good",
        "Something else",
      ],
    },
    {
      slug: "cost-so-far",
      kind: "single",
      question: "Roughly how much have you already spent trying to fix this?",
      options: ["Under $50", "$50 to $200", "$200 to $500", "Over $500"],
    },

    /* ---------- pressure release ---------- */
    {
      slug: "priority",
      kind: "single",
      question: "What would help you most right now?",
      options: ["Getting {name} moving comfortably again", "Getting to the root cause", "Something natural, without heavy medication", "Peace of mind that it's being handled"],
    },

    /* ---------- reinforcement: the mid-arc turn, same brand-statement device diet uses ---------- */
    {
      slug: "reinforcement",
      kind: "info",
      question: "is made for you",
      brandHeading: true,
      bulletIcon: "check",
      body: "SC-02 Hip & Joint Chews are a daily supplement that could help {name} move more comfortably. They're made from natural ingredients, have no fillers, and dogs genuinely love the taste. They will:",
      bullets: [
        "Help rebuild and cushion worn cartilage",
        "Support a healthy inflammation response",
        "Keep {name} moving without stiffness, naturally",
      ],
      footnote: "Continue to get {name}'s personal results and learn more about SC-02 Hip & Joint Chews.",
      cta: "Continue",
    },

    /* ---------- close ---------- */
    {
      slug: "email",
      kind: "email",
      question: "{name}'s results are ready",
      subhead: "We'll send {name}'s mobility report and unlock your offer",
      placeholder: "Your email address",
      privacy: "We don't send spam or share email addresses.",
      cta: "See {name}'s results",
      badge: "Sale up to 60% off",
    },
  ],
};
