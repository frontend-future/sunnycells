/**
 * Outty pre-lander, a 1:1 rebuild of theoutgoing.co/pages/outty for /pages/pre-sub.
 * Every CTA points at /pages/sub, the PDP.
 *
 * Same warning as lib/products/outty.ts, which this file reuses for the ingredient
 * panel and the review grid: the brand, the product, the formula and every named
 * person quoted here belong to The Outgoing Co. This exists to review the layout.
 *
 * FAQ answers were collapsed in the mockup, so the eleven questions are theirs and the
 * answers are written to fit.
 */

export const PDP = "/pages/sub";

export const ANNOUNCE = "🔥 40% off on first order · Free shipping 🔥";
export const CTA = "Take the edge off";
export const CTA_NOTE = "40% Off First Order + Free Shipping";

export const HERO = {
  rating: "100,000+ social lives improved",
  titleTop: '"I quit drinking and',
  titleAccent: 'kept my social life"',
  lede:
    "Outty is an alcohol-free drink mix that calms your nerves & keeps your head clear without making you sloppy, tired, or hungover.",
  photo: "Pack and stick on a bar, with a Facebook comment overlaid",
} as const;

export const STRIP = [
  { emoji: "👍", text: "Loosen up" },
  { emoji: "\u{1F9E0}", text: "Stay sharp" },
  { emoji: "\u{1F305}", text: "No hangovers" },
  { emoji: "⚡", text: "Last all night" },
] as const;

export const WAYS = {
  titleA: "Turn off your ",
  titleAccentA: "nerves",
  titleB: " & turn on your ",
  titleAccentB: "social energy",
  titleC: " at the same time",
  eyebrow: "Outty helps you enjoy being around people again in",
  eyebrowLink: "5 unique ways",
  lede:
    "Your nerves have cost you a lot of nights. You left some parties early, you skipped some completely, and you drank your way through the rest. Outty fixes all three, starting",
  ledeStrong: "TONIGHT:",
  items: [
    {
      n: 1,
      title: "Loosens you up and keeps you sharp ",
      titleAccent: "at the same time",
      photo: "Customer smiling to camera in a hallway",
      paras: [
        "Alcohol can loosen you up, but by the third drink you're sloppy. Caffeine can wake you up, but two hours later you crash. THC can relax you, but it turns you quiet and tired in a room full of people.",
      ],
      highlight: "Every one of them trades away the thing you need most.",
      after: "Outty has **9 active ingredients at full doses**: 5 that calm you down, 4 that keep you quick. You stay loose AND sharp for the whole night.",
    },
    {
      n: 2,
      title: "Settles the nervous system ",
      titleAccent: "(the real reason you reach for a drink)",
      photo: "Nervous system diagram on black",
      paras: ["The nervousness you feel around people is your body's 'fight or flight' response kicking on."],
      highlight: "That's what alcohol was numbing all these years.",
      after: "**L-Theanine, GABA, Taurine, & other calming ingredients** in Outty switch that system off:",
      bullets: [
        "The nervousness fades → you stop overthinking every sentence",
        "You stop overthinking → you're comfortable in the group",
        "You're comfortable → you enjoy being there instead of managing being there",
      ],
    },
    {
      n: 3,
      title: "Feeds the ",
      titleAccent: "brain chemical of connection",
      photo: "Pink head illustration labelled DOPAMINE",
      paras: [
        "Two drinks in, you feel like the best version of yourself. That feeling is **dopamine**, and alcohol doesn't make it. It borrows it from tomorrow, which is why you don't want to do anything the morning after you drink.",
        "Outty contains three key ingredients that feed your brain's natural dopamine production instead of spiking it...so you can enjoy the night without regretting it the next morning.",
      ],
    },
    {
      n: 4,
      title: "Works before the party. ",
      titleAccent: "Costs you nothing after.",
      photo: "Front step of a house at dusk",
      paras: ["Stop drinking and you get sleepy. Keep drinking and you overshare. And whichever way the night goes, the hangover is waiting."],
      highlight: "But the fix is now easier than ever:",
      after: "Mix one packet of Outty in water **30 minutes before you leave**. The calm lasts the whole night, you stay sharp the whole night, and you wake up without a hangover.",
    },
    {
      n: 5,
      title: "Gets ",
      titleAccent: "stronger",
      titleAfter: " with every use",
      photo: "Customer in a kitchen mid-conversation",
      paras: [
        "Alcohol builds tolerance. Every month it takes more to feel the same.",
        "Outty works in the other direction. The ingredients build in your system, which is why:",
      ],
      bullets: [
        "Every good night makes the next one easier to say yes to",
        "You start accepting invites you used to dodge",
        "Going out stops being a hard decision",
      ],
    },
  ],
} as const;

export const PULL_QUOTE = "Facebook comment from Amanda Racz about quitting alcohol";

export const TWO = {
  titleA: "Socializing feels hard for two reasons. ",
  titleAccent: "Outty fixes both.",
  lede:
    "You've probably explained your nerves, awkwardness, or urge to drink just to loosen up as personality. You're just shy. You're an introvert. You're not a people person.",
  highlight: "But that explanation is why nothing has worked for you yet.",
  after: "It's not your personality. It's two things happening in your body, and both of them can be fixed.",
  problems: [
    {
      eyebrow: "Problem 01 · Stress response",
      titleA: "Your nerves run too ",
      titleAccent: "high",
      photo: "Brain with a NERVES switch flipped up, glowing red",
      caption: "Nerves up",
      lede: "Before and during social events, your nerves run high. That's why:",
      bullets: ["You get nervous around new people", "You worry what others think", "You start finding excuses not to go out"],
      tone: "red",
    },
    {
      eyebrow: "Problem 02 · Your energy",
      titleA: "Your social energy runs too ",
      titleAccent: "low",
      photo: "Melting brain with a SOCIAL ENERGY switch flipped down",
      caption: "Social energy down",
      lede: "Talking to people is hard without energy. When your social battery is low:",
      bullets: ["You have no interest in being social", "You feel drained at social events", "You feel like a shell of yourself in a room full of people"],
      tone: "purple",
    },
  ],
} as const;

export const BOTH = {
  titleA: "To enjoy being around people, your nerves need to come ",
  titleAccentA: "down",
  titleB: " and your energy need to come ",
  titleAccentB: "up",
  paras: [
    "A drink lowers your nerves, but it makes you sloppy and never touches your energy.",
    "An energy drink raises your energy, but it makes your nerves worse.",
  ],
  highlight: "Outty does both at the same time.",
  after: "Five ingredients **calm your nerves**. Five ingredients **raise your energy**.",
} as const;

export const FORMULA_TITLE = "The full formula, ingredient by ingredient";

export const TIMELINE = {
  eyebrow: "Your transformation timeline",
  title: "What to expect when you stop needing a drink to enjoy people",
  lede: "Your first packet works immediately. The full formula builds for months.",
  ledeHighlight: "Here's what changes, stage by stage:",
  stages: [
    { icon: "🌙", when: "The first night", title: "You walk in without needing a drink",
      mechanism: "**L-Theanine, GABA, Honokiol, and Magnolol** calm you down while **Taurine and Oroxylin A** keep you sharp.",
      ticks: ["The nerves settle 20-30 minutes after you drink it", "You stay for the whole event", "You stop overthinking what to say"],
      proof: "Facebook comment from Pam Zanin about the chatter stopping" },
    { icon: "🗓️", when: "Week 1", title: "Talking to people starts to feel good",
      mechanism: "**Mucuna and DL-Phenylalanine** start building your dopamine.",
      ticks: ["You stop replaying conversations in your head", "You catch yourself saying yes to plans you would have dodged"],
      proof: "Instagram comment from Clinton Kaley about being the coolest guy in the room" },
    { icon: "🗓️", when: "Month 1", title: "You stay calm when things get tense",
      mechanism: "**Rhodiola** reaches full strength.",
      ticks: ["A stressful moment passes and your night keeps going", "You still have energy when the event ends"],
      proof: "Facebook comment from Shannon Delaney Parr about feeling energized and social" },
    { icon: "🗓️", when: "Month 3", title: "Calm is your normal now",
      mechanism: "All ten ingredients are at work in your system.",
      ticks: ["You feel good even on days you skip the packet", "You stop thinking about how the night will go and just go"],
      proof: "Facebook comment from Tim Kaiser saying it works for him" },
    { icon: "🗓️", when: "Month 6", title: "You like being around people again",
      mechanism: "Six months of dopamine support adds up to this.",
      ticks: ["You're the one making plans now, not avoiding them", "Friends ask what changed", "Your spouse notices you talk more at parties"],
      proof: "Facebook comment from David Stevens about staying focused and coherent" },
    { icon: "🏆", when: "Month 12", title: "Parties, meetings, & family events all feel normal",
      mechanism: "A year of calm nights on the books.",
      ticks: ["The good nights outnumber the hard ones", "You can't remember the last time you needed a drink to enjoy people"],
      proof: "Messenger note from Jared McPhillen calling it an incredible product" },
  ],
} as const;

export const REVIEWS_TITLE = "What people say after trying Outty";

export const GUARANTEE = {
  badgeN: "60",
  badgeUnit: "day",
  badgeRibbon: "Guaranteed",
  title: "Feel it or your money back",
  body: "Try Outty for 60 days. If it doesn't make going out feel easier,",
  bodyHighlight: "email us and we'll refund you.",
} as const;

/* Questions are the reference's. Answers were collapsed, so these are written to fit. */
export const FAQ = {
  eyebrow: "Get the clarity you're looking for 👇",
  title: "Frequently asked questions",
  items: [
    { q: "Does it make you feel euphoric or high?",
      a: "No. There is nothing intoxicating in it. It takes the edge off and leaves your head clear, which is the whole point." },
    { q: "What does it feel like?",
      a: "Most people describe it as the first twenty minutes of a drink without anything that comes after: calmer, looser, still completely sharp." },
    { q: "I've tried supplements before. They never do anything.",
      a: "Most of them hide small amounts inside a proprietary blend. Every amount in Outty is printed on the pack, at the doses the research uses." },
    { q: "Is there kava or kratom in it?",
      a: "Neither. No kava, no kratom, no alcohol, nothing habit forming." },
    { q: "Is there caffeine in it?",
      a: "None. The alertness comes from Taurine and Oroxylin A rather than a stimulant, so there is no crash and no jitters." },
    { q: "Will it keep me awake if I take it at night?",
      a: "No. There is no caffeine, and the calming side of the formula tends to make sleep easier rather than harder." },
    { q: "How long does it last?",
      a: "It comes on in 30 to 60 minutes and holds for four to six hours, which covers most nights out." },
    { q: "What does it taste like?",
      a: "Acai mixed berry. Sweet, not chalky, and it dissolves rather than sitting on top of the water." },
    { q: "What do I mix it with?",
      a: "12 to 16 oz of cold water. It also works in sparkling water or a non-alcoholic mixer if you want something that looks like a drink in your hand." },
    { q: "Can I just buy one bag without subscribing?",
      a: "Yes. A one-time bag is $59.99 plus $7.99 shipping. Subscribing takes 40% off the first bag and makes shipping free for life." },
    { q: "Is the 40% off just my first order?",
      a: "The 40% applies to your first order. After that you stay on the subscriber price with free shipping, and you can pause, skip or cancel at any point." },
  ],
} as const;

export const CLOSING = {
  title: "Stop choosing between anxious and numb",
  body: "One packet, 30 minutes before you leave. That is the whole thing.",
} as const;
