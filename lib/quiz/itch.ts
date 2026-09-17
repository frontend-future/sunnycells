import type { QuizConfig } from "./types";

/**
 * The itch quiz, /quiz/itch, for SC-01 Daily Chews (lib/products/dog-itch.ts).
 * Built around the positive -> neutral -> negative functional-question arc:
 * the first third is towards language about what she wants for her dog, the
 * middle third is observational questions about the dog itself (a dog cannot
 * own an identity statement, so these stay factual), and the last third moves
 * onto the OWNER's own admissions ("I feel", "I am") before the pressure
 * release question. See the reinforcement step below for the mid-quiz turn.
 *
 * GENDER IS NOT IN THIS ARRAY: asked on the landing page by StartChoice, same
 * convention as every other funnel here, just asking about the dog instead.
 */
export const itchQuiz: QuizConfig = {
  id: "itch",
  basePath: "/quiz/itch",
  resultsPath: "/quiz/itch/results/analyzing",
  steps: [
    /* ---------- positive third ---------- */
    {
      slug: "goals",
      kind: "multi",
      question: "You want your dog to...",
      options: [
        "Stop scratching and finally feel comfortable",
        "Stop getting bald patches or hot spots",
        "Enjoy walks and cuddles without constant scratching interrupting them",
        "Just have peace of mind that it's nothing serious",
      ],
    },
    {
      slug: "dog-name",
      kind: "text",
      question: "What's your dog's name?",
      placeholder: "e.g. Bella",
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
      question: "Where does {name} scratch or lick the most?",
      options: ["Paws", "Ears", "Belly or armpits", "Base of the tail", "All over"],
    },
    {
      slug: "frequency",
      kind: "single",
      question: "How often does {name} scratch, lick, or chew at their skin?",
      options: ["A few times a day", "Constantly, it's hard to watch", "Mostly at night", "Comes and goes"],
    },
    {
      slug: "visible-signs",
      kind: "multi",
      question: "Have you noticed any of these?",
      options: ["Red or irritated skin", "Bald patches or thinning fur", "A musty or yeasty smell", "Scabs or hot spots", "None of these yet"],
    },
    {
      slug: "fleas-ruled-out",
      kind: "single",
      question: "Have you already ruled out fleas?",
      options: ["Yes, no fleas", "Not sure", "I think so, but haven't checked recently", "No, I haven't checked"],
    },
    {
      slug: "triggers",
      kind: "multi",
      question: "When does it seem to get worse?",
      options: ["After being outside", "After meals", "Certain seasons", "No clear pattern"],
    },
    {
      slug: "tried-before",
      kind: "multi",
      question: "What have you already tried?",
      options: ["Flea and tick prevention", "Special shampoo", "Diet change", "Vet visit or medication", "Nothing yet"],
    },

    /* ---------- negative third: about the owner, not the dog ---------- */
    {
      slug: "duration",
      kind: "single",
      question: "I've been dealing with {name}'s itching for...",
      options: ["Under a month", "1 to 6 months", "6 months to a year", "Over a year"],
    },
    {
      slug: "owner-feeling",
      kind: "multi",
      question: "Watching {name} go through this makes me feel...",
      options: ["Frustrated that nothing has worked", "Guilty that I can't fix it", "Worried it's something serious", "Helpless"],
    },
    {
      slug: "stuck",
      kind: "multi",
      question: "No matter what I try, I...",
      options: [
        "can't seem to get {name}'s itching under control",
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
        "This turning into a bigger skin infection",
        "Expensive vet bills that keep adding up",
        "{name} being in pain and not being able to tell me",
        "Never actually figuring out the cause",
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
      options: ["Stopping the scratching for good", "Getting to the root cause", "Something natural, without steroids", "Peace of mind that it's being handled"],
    },

    /* ---------- reinforcement: the mid-arc turn, same brand-statement device diet uses ---------- */
    {
      slug: "reinforcement",
      kind: "info",
      question: "is made for you",
      brandHeading: true,
      bulletIcon: "check",
      body: "SC-01 Daily Chews are a daily multivitamin that could help {name} find relief. They're made from natural ingredients, have no steroids, and dogs genuinely love the taste. They will:",
      bullets: [
        "Help stop the scratching, licking, and chewing",
        "Support healthy skin and a healthy coat",
        "Calm irritation from allergies, naturally",
      ],
      footnote: "Continue to get {name}'s personal results and learn more about SC-01 Daily Chews.",
      cta: "Continue",
    },

    /* ---------- close ---------- */
    {
      slug: "email",
      kind: "email",
      question: "{name}'s results are ready",
      subhead: "We'll send {name}'s itch report and unlock your offer",
      placeholder: "Your email address",
      privacy: "We don't send spam or share email addresses.",
      cta: "See {name}'s results",
      badge: "Sale up to 60% off",
    },
  ],
};
