/**
 * Outty, The Outgoing Co. A 1:1 rebuild of theoutgoing.co/pages/sub from the mockup,
 * for /pages/sub.
 *
 * READ THIS BEFORE SHIPPING ANY OF IT:
 *
 *   1. This is a clone of a live competitor page. The brand name, the wordmark, the
 *      product name and the founder story belong to The Outgoing Co. They are here so
 *      the layout can be reviewed against the reference, not to be published.
 *   2. Every testimonial is a real customer of theirs, transcribed off the mockup with
 *      their name and town. Republishing those as our own is the one thing on this page
 *      that is straightforwardly somebody else's.
 *   3. The supplement facts panel is theirs and describes their formula.
 *   4. FAQ answers were collapsed in the mockup, so the questions are theirs and the
 *      answers are written to fit. Marked individually below.
 *
 * It also deliberately ignores the SUNNYCELLS design system: emoji, all-caps display,
 * pill buttons, percentage savings and a purple palette are all in the reference.
 */

export const BRAND = "The Outgoing Co.";
export const PRODUCT_NAME = "Outty";

export const ANNOUNCE = {
  lead: "First time trial offer",
  link: "40% off Outty + free shipping",
} as const;

export const NAV = { signIn: "Sign in", bag: "Bag", bagCount: 1 } as const;

export const HERO = {
  rating: "35,000+ Happy Customers",
  title: "Rewire your brain to crave socializing",
  compareAt: "$59.99",
  price: "$35.99",
  bullets: [
    { emoji: "⚡", text: "Flow state energy without the crash" },
    { emoji: "\u{1F50B}", text: "Recharges your social battery" },
    { emoji: "\u{1F6AB}", text: "Silences self doubt & overthinking" },
    { emoji: "\u{1F5E3}️", text: "Effortless conversation off the cuff" },
  ],
  planLabel: "Subscribe & Save",
  servings: "15 servings per bag",
  cadence: "Delivers every 4 weeks. Pause, skip, or cancel anytime.",
  cta: "Take the edge off",
  trust: [
    { icon: "truck", text: "Free shipping for life" },
    { icon: "shield-check", text: "60-day 100% Money Back Guarantee" },
  ],
  oneTime: "One-time purchase | $59.99 + $7.99 Shipping",
  benefitsTitle: "Subscriber-Only Benefits",
  benefits: [
    "40% off your first order",
    "Free shipping always",
    "Cancel or pause anytime",
    "Exclusive member-only gifts",
    "First access to new products",
  ],
} as const;

/** Nine gallery frames. Frame 1 is the pack render, the rest are the infographics. */
export const GALLERY = [
  "Pack render on lilac",
  "Pack back, benefit list",
  "Whats inside infographic",
  "What happens when you take Outty",
  "Stop choosing between anxious and numb",
  "Frequently asked questions card",
  "How Outty came to be",
  "Founder portrait card",
  "60 day money back card",
] as const;

export type Accordion = { title: string; body?: string; bullets?: readonly string[] };

export const ACCORDIONS: readonly Accordion[] = [
  { title: "Ingredients", body: "See the full Supplement Facts panel below." },
  { title: "Guarantee", body: "60 days, 100% money back. Keep the bag." },
  {
    title: "How to use",
    bullets: [
      "Mix 1 stick with 12–16 oz of cold water.",
      "Shake or stir until fully dissolved.",
      "Enjoy 15–30 minutes before social events or whenever you want to feel more outgoing.",
    ],
  },
] as const;

export const INSIDE = {
  title: "Whats inside:",
  left: [
    { name: "Taurine", claim: "Smooth energy" },
    { name: "L-Theanine", claim: "Quiet mental chatter" },
    { name: "Mucuna Pruriens", claim: "Boost dopamine" },
    { name: "DL-Phenylalanine", claim: "Elevate mood" },
    { name: "Rhodiola Rosea", claim: "Block stress" },
  ],
  right: [
    { name: "GABA", claim: "Stop overthinking" },
    { name: "Tauromag", claim: "Calm nerves" },
    { name: "Honokiol", claim: "Take the edge off" },
    { name: "Magnolol", claim: "Ease the tension" },
    { name: "Oroxylin A", claim: "Sharpen the focus" },
  ],
  facts: {
    servings: "15 servings per container",
    servingSize: "Serving size: 1 stick packet (7 grams)",
    rows: [
      { name: "Taurine", amount: "2000mg" },
      { name: "L-Theanine", amount: "1000mg" },
      { name: "Mucuna Pruriens Seed Extract", sub: "(standardized to min 90% L-Dopa)", amount: "500mg" },
      { name: "DL-phenylalanine", amount: "500mg" },
      { name: "Rhodiola Rosea Root extract", sub: "(3% rosavins, 1% Salidrosides)", amount: "400mg" },
      { name: "Gamma-aminobutyric acid (GABA)", amount: "140mg" },
      { name: "Magnolol", amount: "100mg" },
      { name: "Magnesium Acetyl-Taurinate", amount: "100mg" },
      { name: "HonokioL", amount: "100mg" },
      { name: "Pure Oroxylin A [Tree of Damocies (oroxylum indicum) bark extract]", amount: "25mg" },
    ],
    footnote: "*  Daily Value % not established.",
    other:
      "Other Ingredients: Citric Acid, Natural Flavor, Black Carrot Root, Sucralose, Silicon Dioxide",
  },
} as const;

export const TIMELINE = {
  title: "What should you expect from taking Outty daily?",
  cta: "Take the edge off",
  steps: [
    { when: "Week 1", emoji: "⚡", title: "L-Theanine and GABA quiet the mental noise",
      body: "Less overthinking. More presence. Relaxed but still sharp.", art: "Brain with mute icon" },
    { when: "Month 1", emoji: "\u{1F9E0}", title: "Mucuna Pruriens builds dopamine levels",
      body: "You actually want to engage. Social drive comes back.", art: "Battery charging 20 to 100" },
    { when: "Month 2", emoji: "\u{1F3AF}", title: "Rhodiola lowers baseline cortisol",
      body: "You stay level when things get tense.", art: "Seated meditation figure" },
    { when: "Month 3", emoji: "\u{1F4D7}", title: "Your brain chemistry stabilizes",
      body: "Calm and sharp become your normal state.", art: "Scales, brain and heart" },
    { when: "Month 6", emoji: "\u{1F48E}", title: "Long-term dopamine support changes your default",
      body: "You're the one making plans now. Not avoiding them.", art: "Open door onto a party" },
    { when: "Month 12", emoji: "\u{1F3C6}", title: "Your brain handles stress and socializing like it's nothing",
      body: "Good days are normal. Bad days are rare and short.", art: "Figure at ease in a crowd" },
  ],
} as const;

/**
 * THESE ARE THE OUTGOING CO'S CUSTOMERS. Transcribed from the mockup so the grid can be
 * reviewed at real length. Replace every one before this page is published anywhere.
 */
export const REVIEWS = {
  title: "What people are saying about Outty",
  cards: [
    { photo: "Pack on a granite counter",
      headline: "It calms me down and puts me in a flow state where I am the most productive and calm.",
      body: "It's truly a one of a kind supplement that I take at least 3 times a week. Especially when I have anxiety about going into work at the office. It calms me down and puts me in a flow state where I am the most productive and calm.",
      name: "Dylan O.", place: "Haddon Heights, NJ" },
    { photo: "Two sticks on a steel worktop",
      headline: "…clearing space in my head to work through each issue in a more focused way.",
      body: "It’s genuinely a fantastic product. I went into it expecting as much placebo effect as anything…it is 100% not a placebo. I felt extremely calm even during the highest stress situations, clearing space in my head to work through each issue in a more focused way. I also felt no negative effects whatsoever when it wore off.",
      name: "Michael F.", place: "Boston, MA" },
    { photo: "A stick standing in beach sand",
      headline: "As an introvert, this helps me be more outgoing without relying on alcohol…",
      body: "As an introvert, this helps me be more outgoing without relying on alcohol but if I am needing to get work done, it gives you a level of focus without jitters. I can grind and get work done for hours. I highly recommend.",
      name: "Drew J.", place: "Richmond, VA" },
    { photo: "Pack held up in a dim room",
      headline: "…slows everything down to the point that I feel like I have more time to think through my responses.",
      body: "I have used it 9 or 10 times now, and it pretty much slows everything down to the point that I feel like I have more time to think through my responses to any given situation and less reflex to respond emotionally.",
      name: "Nathan S.", place: "Powder Springs, GA" },
    { photo: "A stick on a concrete floor",
      headline: "Helps me function at my best.",
      body: "In my job, I am in state of stress most of the day. Helps me to focus be able to have the meetings that I need to speak intelligently without my mind being all garbled. Helps me function at my best.",
      name: "Kevin M.", place: "Estes Park, CO" },
    { photo: "Mixed drink and a stick on a deck table",
      headline: "…get that ‘two beers in’ feeling without actually having to drink.",
      body: "I personally love Outty. Sometimes it’s nice to get that ‘two beers in’ feeling without actually having to drink. It’s great if you’re doing dry January. However, my cousin quit drinking and was using NA beers. You know what sucks about NA beers? The fact that they are still empty calories. Outty user for life!",
      name: "Shawn O.", place: "Harvey Cedars, NJ" },
    { photo: "Pack and a full glass on a counter",
      headline: "…great effects",
      body: "Great ingredients, great effects, good branding/mission what else can you ask for?!",
      name: "Daniel C.", place: "Richmond, TX" },
    { photo: "Overhead glass and sticks on black",
      headline: "…gave me what I was looking for with alcohol.",
      body: "I stopped drinking last year and going out was difficult. Alcohol never really opened me up or made me chatty. This stuff gave me what I was looking for with alcohol. I used it to go out to a birthday party with a bunch of people I did not know. It was great. I talked to a bunch of people and made some new friends. 10/10 would recommend.",
      name: "Jamie M.", place: "Black Mountain, NC" },
  ],
  moreTitle: "More feedback from Outty users…",
  more: [
    "Facebook comment thread screenshot",
    "Instagram comment replies screenshot",
    "X post with venue photo screenshot",
  ],
  cta: "Take the edge off",
} as const;

export const HOW = {
  title: "How it works",
  photo: "Customer holding the pack to camera",
  steps: [
    { n: 1, title: "Tear", body: "Open one packet." },
    { n: 2, title: "Pour", body: "Mix into 8oz of water." },
    { n: 3, title: "Go", body: "Feel it kick in within 30-60 minutes." },
  ],
} as const;

/** The founder's own account of his life. Not ours to publish. */
export const FOUNDER = {
  title: "Why Outty Exists",
  photo: "Founder drinking Outty at a desk",
  paragraphs: [
    "I was in sales for over a decade. My job was talking to people all day. I loved it, but over time it wore me down.",
    "I'd come home every night with no energy for my family or friends. I didn't want to see or talk to anyone.",
    "So I teamed up with an expert biohacker to create Outty. It gave me my energy back. For work. For friends. For life. I quit my job to bring this to everyone running on empty.",
  ],
  attribution: "— TJ, Founder of The Outgoing Co.",
  cta: "Take the edge off",
} as const;

/* Questions are the reference's. Answers were collapsed in the mockup, so these are
   written to fit and are not the reference's wording. */
export const FAQ = {
  title: "Frequently Asked Questions",
  items: [
    { q: "How quickly will I see results?",
      a: "Most people feel the first stick within 30 to 60 minutes. The compounding effects on baseline mood and social drive build over the first one to three months." },
    { q: "Is this third-party tested?",
      a: "Every batch is tested by an independent lab for identity, potency and contaminants before it ships." },
    { q: "How many servings are in each bag?",
      a: "15 stick packets per bag, 7 grams each. One stick is one serving." },
    { q: "What if it doesn't work for me?",
      a: "60 days, 100% money back. Email us and we refund the order. You keep the bag." },
    { q: "Is this safe to take every day? Will I become dependent on it?",
      a: "It is formulated for daily use and contains no stimulants or habit-forming compounds. If you are pregnant, nursing, on prescription medication or managing a condition, speak to your doctor first." },
    { q: "How is this different from just taking magnesium or ashwagandha?",
      a: "Those cover one mechanism each. This runs ten actives at clinical doses across calm, mood, dopamine and focus, with every amount printed rather than hidden in a proprietary blend." },
    { q: "Can I take this with my other supplements or medications?",
      a: "With most supplements, yes. If you are on prescription medication, particularly anything affecting mood or blood pressure, check with your doctor before starting." },
  ],
  cta: "Take the edge off",
} as const;

export const FOOTER = {
  emailPlaceholder: "Enter your email",
  columns: [
    { title: "Products", links: ["Outty", "Ramp Health B4 Clearance", "Adaptogen Drinks", "Nootropic Drinks"] },
    { title: "Customer", links: ["Manage Subscription", "Orders", "My Account"] },
    { title: "Information", links: ["Contact Us", "Blog", "Science & Ingredients"] },
    { title: "Policy", links: ["Privacy Policy", "Terms of Service", "Refund Policy", "Money Back Guarantee"] },
  ],
  powered: "Powered by Shopify",
} as const;
