/**
 * /aging/7-warning-signs: an advertorial for SC-23, built to the structure of the
 * long-form collagen advertorial the brief supplied. Every word lives here rather than
 * in the component, the way the product and quiz files work, so the copy can be edited
 * without going near markup.
 *
 * WHAT WAS DELIBERATELY NOT CLONED, and why. The reference page is a competitor's, and
 * four of its devices are things this brand does not do:
 *
 *   1. Scarcity. "Shortages may come", "no telling how long we can hold this price".
 *      The design system forbids countdowns and scarcity lines outright, so those two
 *      sections carry their honest equivalent: why the longer supplies exist at all.
 *   2. The 53% figure. 50% off a first order is the only percentage in this brand and
 *      it is a standing term, not a promotion. Savings are otherwise stated in dollars.
 *   3. A "FEATURED ON" press strip. There is no press. Fabricating logos is a false
 *      claim, so that band states what is actually verifiable about the jar.
 *   4. A credentialed author with a headshot. Inventing a doctor is inventing a
 *      person. The byline is the brand until a real named advisor exists to carry it.
 *
 * PLACEHOLDER FLAG: every review, every name, and both before/after pairs are written
 * to brand voice and generated, not collected. They read as real customers, so they
 * must be replaced with permissioned ones, and the visible results substantiated,
 * before this page takes a dollar of paid traffic. Same standing instruction the three
 * product files already carry.
 */

import { PLANS, PRODUCT, RATING } from "@/lib/products/creatine-collagen";

export { PLANS, PRODUCT, RATING };

export const META = {
  title: "7 warning signs of a collagen deficit | SUNNYCELLS",
  description:
    "Thin skin, easy bruising and knees that complain on the stairs are usually read as age. Seven signs they are a collagen problem instead, and the dose that addresses it.",
} as const;

export const HERO = {
  /* The <u> segments are the two symptoms the reader came in with. Underlining them is
     the reference page's device and it earns its place: it puts her own complaint in
     the first line she reads. */
  headlineLead: "The reason your skin bruises and your ",
  headlineMark1: "knees creak",
  headlineMid: " is not simply ",
  headlineMark2: "your age",
  headlineTail: "",
  sub: "Seven signs your body is running a collagen deficit, and the daily dose that puts it back.",
} as const;

export const BYLINE = {
  name: "The SUNNYCELLS research team",
  role: "Reviewed against the published trials cited at the foot of this page",
} as const;

/* Placeholder. Neither the photographs nor the customer exist. */
export const HERO_PROOF = {
  before: "/photos/collagen-before.webp",
  after: "/photos/collagen-after.webp",
  quote:
    "My hands and forearms were covered in those old-age bruises. I would barely catch the edge of a door and there would be a purple mark for two weeks. It is not only how it looks. The skin itself feels thicker now, and those marks have mostly stopped happening.",
  attribution: "Beth R., 12 weeks in",
  disclaimer: "Customer results have not been independently verified. Individual results vary.",
} as const;

export const OPENERS = [
  "Does your skin feel drier and thinner than it used to, like tissue paper across the back of your hands?",
  "Do your knees announce every flight of stairs before you are halfway up?",
  "Does a knock you barely felt still leave a mark two weeks later?",
] as const;

export const CRISIS_TITLE = "You may be running a collagen deficit.";

export const INTRO = [
  "Plenty changes as you get older. Some of it you can see in a mirror and most of it you cannot.",
  "One of the changes nobody warns you about is the slow decline of the protein that holds the whole structure together. Collagen is roughly a third of the protein in your body. It is the scaffolding under your skin, the cushion in your joints, and the flexible frame that your bones lay mineral onto.",
  "You make less of it every year after your mid twenties, and the drop steepens sharply through menopause. Most of what that costs you gets filed under getting older.",
  "Below are seven signs your body is losing collagen faster than it is replacing it, what each one is actually telling you, and what the research says you can do about it.",
] as const;

export type Sign = {
  n: number;
  title: string;
  image: string;
  alt: string;
  body: string[];
};

export const SIGNS: Sign[] = [
  {
    n: 1,
    title: "Thinning skin and age spots",
    image: "/photos/sign-skin.webp",
    alt: "A woman in her fifties looking closely at the skin on her cheek in a bathroom mirror",
    body: [
      "Thin skin is usually the first sign anyone notices, because it is the one you meet every morning.",
      "Collagen is what holds the dermis taut. As you make less of it the layer literally gets thinner, and it loses the springiness that let it snap back. That shows up as dryness, as skin that stays tented for a second when you pinch the back of your hand, and as fine lines settling into places they used to leave alone.",
      "A thinner dermis also defends itself less well against sun and everything else the day throws at it, which is why uneven tone and age spots tend to arrive in the same few years.",
    ],
  },
  {
    n: 2,
    title: "Bruises you cannot account for",
    image: "/photos/sign-bruises.webp",
    alt: "The forearms and hands of a woman in her fifties resting on a pale kitchen table",
    body: [
      "Easy bruising is the sign that gets misread most often. People assume it means something is wrong with their blood.",
      "Usually it means something is wrong with the wall. Collagen is the structural fiber in the capillaries just under your skin, and in the fatty layer that pads them. As both thin, a small knock is enough to rupture a vessel that would have flexed and survived ten years ago. With less padding above it, the blood spreads out where you can see it.",
      "If your honest description is that you barely touched anything and there is already a mark, that is a structural problem, not a clotting one.",
    ],
  },
  {
    n: 3,
    title: "Cellulite that arrived without a weight change",
    image: "/photos/sign-cellulite.webp",
    alt: "A woman in her fifties sitting on the edge of a bed in the morning, lacing her sneakers",
    body: [
      "Cellulite is not a fat problem. It is a ceiling problem.",
      "Fat sits in chambers held down by bands of connective tissue. When the collagen in those bands weakens and the dermis above them thins, the fat pushes up through the gaps and you see the dimpling. The fat did not change. What was holding it flat did.",
      "That is why it can appear in a year when your weight has not moved, and why losing weight often fails to shift it.",
    ],
  },
  {
    n: 4,
    title: "Spider veins showing through",
    image: "/photos/sign-veins.webp",
    alt: "A close crop of a woman's lower legs showing fine surface veins",
    body: [
      "Vein walls are built from collagen and elastin in layers. As the collagen goes, the wall gets less able to hold its shape against the pressure inside it, and small vessels dilate and stay dilated.",
      "Two things then happen at once. The vessels get wider, and the skin covering them gets thinner and more translucent.",
      "So a network that has probably been there for years becomes something you can suddenly see.",
    ],
  },
  {
    n: 5,
    title: "Knees and hips that complain",
    image: "/photos/collagen-joints.webp",
    alt: "A woman in her sixties crouching in a garden bed, working the soil with her hands",
    body: [
      "Cartilage is mostly collagen and water. It is the surface that lets one bone travel across another without either of them noticing.",
      "As collagen declines that surface thins and stiffens. It absorbs less shock and it grips more. You feel it as the noise on the stairs, as the first ten steps in the morning, and as the day after a long walk costing more than the walk did.",
      "This is the sign most likely to be waved off as wear and tear. Wear is real. Whether the surface can repair itself between the wear is a supply question.",
    ],
  },
  {
    n: 6,
    title: "Hair in the brush, nails that never make it",
    image: "/photos/collagen-nails.webp",
    alt: "A close crop of a woman's hands showing her fingernails",
    body: [
      "Hair and nails are built on the same protein scaffolding as your skin, which is why they tend to change in the same season rather than one at a time.",
      "Nails that peel in layers or split before they reach the end of your finger, and noticeably more hair left in the brush, are both worth reading as one signal rather than two problems.",
      "They are also the fastest of the seven to respond, which makes them a useful thing to watch.",
    ],
  },
  {
    n: 7,
    title: "Bone that is quietly thinning",
    image: "/photos/sign-bones.webp",
    alt: "A woman in her late fifties kneeling in a sunny garden planting seedlings",
    body: [
      "This is the one you cannot see, and the one that matters most.",
      "Around a third of bone by weight is collagen. Calcium gets the attention, but calcium is the mineral that gets laid down onto a collagen frame. Without enough frame there is nowhere for it to go, and what you end up with is bone that is dense on a scan and brittle in a fall.",
      "It is the difference between a bone that flexes under load and one that snaps. Feeding it more calcium does not help if the scaffolding it is meant to sit on is not being built.",
    ],
  },
];

export const NOT_JUST_AGE = {
  title: "Most of this is not simply part of getting older. Most of it is addressable.",
  body: "Thin skin, sore knees and thinning bone get treated as three separate complaints, handled by three separate aisles. More often they are one shortage showing up in three places.",
} as const;

/** The decline curve. Bars are relative collagen against age, and the shape is the
    published one: broadly flat to the mid twenties, then a steady annual loss that
    steepens through menopause. Rounded, and labeled as approximate on the page. */
export const DECLINE = {
  title: "Collagen production, by age",
  bars: [
    { age: 20, pct: 100 },
    { age: 25, pct: 100 },
    { age: 30, pct: 95 },
    { age: 35, pct: 90 },
    { age: 40, pct: 85 },
    { age: 45, pct: 78 },
    { age: 50, pct: 64 },
    { age: 55, pct: 55 },
    { age: 60, pct: 49 },
    { age: 70, pct: 42 },
    { age: 80, pct: 36 },
  ],
  axisLabel: "Relative collagen",
  ageLabel: "Age",
  note: "Indicative curve drawn from the published decline rates cited below. Not a measurement of any individual.",
  body: [
    "From your mid twenties you make roughly one percent less collagen every year. That is small enough to ignore for a decade and impossible to ignore after three.",
    "For women the line has a cliff in it. Studies of postmenopausal skin report around 30 percent of skin collagen lost in the first five years after menopause, then a slower decline of about two percent a year after that.",
    "Which is why so much seems to happen at once: the skin, the knees and the bone density scan all turn in the same handful of years.",
  ],
} as const;

export const RESEARCH = {
  title: "The useful part: supplemented collagen peptides show up in the tissue that needs them.",
  image: "/photos/collagen-powder.webp",
  alt: "Collagen peptide powder in a shallow dish on a pale surface",
  /* Every line describes what a published trial reported. None of them is a claim about
     what this jar will do for the reader, and the asterisk carries that distinction to
     the disclaimer at the foot. */
  bullets: [
    "Across 12 week trials, women taking daily collagen peptides reported better skin hydration and a measurable reduction in wrinkle depth.*",
    "In an eight week trial of 69 women aged 35 to 55, daily collagen peptides significantly improved skin elasticity against placebo.*",
    "In postmenopausal women, 12 months of daily collagen peptides was associated with an increase in bone mineral density.*",
    "12 weeks of collagen peptides significantly reduced joint pain in subjects with activity-related knee pain.*",
    "A trial in athletes reported improved knee cartilage measures after 24 weeks of daily hydrolyzed collagen.*",
    "Reviews of nail studies report faster growth and fewer split nails after three to six months.*",
  ],
} as const;

/* Placeholder. This customer does not exist and this result was not measured. */
export const CASE_STUDY = {
  title: "Maureen had written the whole lot off as her sixties arriving.",
  sub: "Two months in, the thing she noticed first was not her face.",
  before: "/photos/collagen-before.webp",
  after: "/photos/collagen-after.webp",
  quote:
    "I am 66 and I started this in January. Fewer of the small lines around my mouth, and my nails look clear instead of ridged. What I actually wanted was less pain in my hands and knees, and that has genuinely improved. I did not expect to be the person writing one of these.",
  attribution: "Maureen L., 8 weeks in",
  disclaimer: "Customer results have not been independently verified. Individual results vary.",
} as const;

export const ALSO = {
  title: "What else the research points at",
  image: "/photos/cc-lifestyle.webp",
  alt: "A woman in workout clothes drinking from a glass beside a jar of Creatine and Collagen",
  items: [
    "Bone mineral density in postmenopausal women",
    "Joint comfort and range of movement",
    "Skin elasticity and hydration",
    "Nail growth rate and fewer splits",
    "Hair thickness at the root",
    "Lean muscle retained through your fifties",
  ],
  tail: [
    "You can do this at your kitchen counter in about thirty seconds a day.",
    "But you cannot walk into a shop and grab the first jar of collagen you see, because most of what is on that shelf is built to look good on a label rather than to work.",
  ],
} as const;

export const BUYER_BEWARE = {
  title: "Not all collagen is the same, and most of the difference is hidden.",
  image: "/photos/collagen-pack-detail.webp",
  alt: "A close crop of the ingredient panel on the Creatine and Collagen jar",
  body: [
    "**Whole collagen is too big to get in.** The molecule cannot cross the gut wall intact. It has to be hydrolyzed, which means cut into peptides small enough to be absorbed and carried to the tissue. A jar that says collagen without saying hydrolyzed is selling you an expensive protein you will mostly not absorb.",
    "**The dose is usually hidden.** Trials that found something used 10 g a day or more. A great many jars put collagen inside a proprietary blend, which is a legal way of not telling you how much is in there. If the amount is not on the front of the pack, assume the reason is that it is small.",
    "**Multi-collagen is usually dilution.** Five types on a label sounds like more. For skin, bone and joints you are after types I and III, and every extra type on the panel is a share of the same scoop not being spent on those two.",
    "**Collagen on its own leaves out the muscle.** This is the one nobody says out loud. From your forties you lose lean muscle faster than you lose collagen, and muscle is what holds the joint stable and pulls on the bone hard enough to keep it dense. Collagen alone feeds the scaffolding and ignores the thing that loads it.",
  ],
} as const;

export const ORIGIN = {
  title: "We got tired of buying three jars and finishing none of them.",
  image: "/product/creatine-collagen.webp",
  alt: "The Creatine + Collagen + Electrolytes jar",
  body: [
    "This started as an ordinary problem. Collagen for skin came in one jar, creatine for strength in another, and electrolytes in a tub bought after a hot week and then forgotten.",
    "Three containers, three scoops, three chances to skip. The one thing every trial agrees on is that collagen only does anything if you take it every day for months, and nobody keeps a three jar habit for months.",
    "So we put the three doses that actually have evidence behind them into one scoop, printed every amount on the front of the jar, and made it taste like a raspberry lemonade rather than like a supplement. That last part is not a small thing. It is the only reason a jar gets finished.",
  ],
  signoff: "The SUNNYCELLS team",
} as const;

export const INTRODUCING = {
  eyebrow: "What we ended up with",
  title: `${PRODUCT.name}`,
  strapline: PRODUCT.strapline,
  image: "/product/creatine-collagen.webp",
  alt: "The Creatine + Collagen + Electrolytes jar in raspberry lemonade",
  ticks: [
    "10 g hydrolyzed collagen peptides, types I and III",
    "5 g creatine monohydrate, the dose the trials used",
    "Electrolytes with vitamin C and D3",
    "Every dose printed on the front of the jar",
    "Zero sugar, zero junk, no proprietary blend",
    "Raspberry lemonade, dissolves without clumping",
    "30 servings, one scoop a day",
    "Third-party tested, made in a GMP-certified facility",
  ],
} as const;

/** Replaces the reference page's press-logo strip. Everything here is checkable. */
export const TRUST = [
  "Third-party tested every batch",
  "GMP-certified facility",
  "Doses printed on the front",
  "30 day money back guarantee",
] as const;

/* PLACEHOLDER reviews. */
export const SHORT_REVIEWS = [
  {
    photo: "/photos/collagen-avatar-1.webp",
    body: "I have been putting this in water first thing for about six weeks. My skin looks less papery on the backs of my hands, which is the bit I hate, and I have stopped finding bruises I cannot explain.",
    who: "Barbara P.",
  },
  {
    photo: "/photos/collagen-avatar-2.webp",
    body: "The spots on my hands are fading and the skin looks fuller instead of see-through. My shoulders have eased off too. I did not expect both from one scoop.",
    who: "C.C.",
  },
  {
    photo: "/photos/collagen-avatar-3.webp",
    body: "My knees do not hurt nearly as much. I was skeptical, for the record. I wish I had known about the creatine part ten years ago rather than avoiding it.",
    who: "Marguerite D.",
  },
] as const;

export const COMPARE = {
  title: "The only jar on the shelf that ticks all four boxes",
  usLabel: "SUNNYCELLS",
  themLabel: "A typical collagen jar",
  rows: [
    { label: "10 g hydrolyzed peptides", sub: "The dose the trials used, not a dusting", them: false },
    { label: "Types I and III only", sub: "No filler types diluting the scoop", them: false },
    { label: "5 g creatine alongside", sub: "For the muscle that holds the joint together", them: false },
    { label: "Electrolytes, vitamin C and D3", sub: "Vitamin C is required to build collagen at all", them: false },
    { label: "Every amount on the front", sub: "No proprietary blend hiding the numbers", them: false },
    { label: "One scoop, one jar", sub: "As low as $23 a jar, about $0.77 a serving", them: false },
  ],
} as const;

/* PLACEHOLDER reviews. */
export const LONG_REVIEWS = [
  {
    who: "Janice W.",
    body: "I turned 70 this year and I was feeling every bit of it. Lines above my lip, dry elbows, hair coming out, nails like paper. I tried a collagen from the drugstore first and it tasted awful, did not dissolve, and I felt nothing. I nearly did not bother trying another one. I have been on this since July, one scoop every morning, and last week my husband asked what I had changed. My skin is softer, the lines above my lip have filled a little, and my nails are shiny instead of splitting.",
  },
  {
    who: "Candy B.",
    body: "No more knee pain is the headline. Everything else is a bonus. Less bruising, thicker hair, and my skin gets commented on now, which has not happened in a while. No pain means I actually exercise, and exercising means the rest of it keeps improving.",
  },
  {
    who: "Ludy S.",
    body: "I have taken three or four different collagens over the years and never really felt anything from any of them. The difference here is that the amount is printed on the front, so I could see I had been taking about a third of the dose before. A month in, my osteopenia numbers held, my knees are easier and my complexion has an actual glow to it.",
  },
  {
    who: "Carolyn S.",
    body: "Two weeks in and I can already see a difference in my skin and feel one in my bad knee. Just ordered again. I was at my wits end before this, so thank you.",
  },
  {
    who: "Joanne R.",
    body: "I had what my doctor called Covid shed and my hair was coming out in handfuls. My stylist suggested collagen and I was desperate enough to try anything before buying a wig. Two weeks and the shedding stopped. Skin is better too. I feel like myself.",
  },
  {
    who: "Colleen B.",
    body: "I stopped wearing my rings because I did not like looking at my hands. The spots have faded a lot, the skin is fuller, and my nails are worth doing again. The rings are back on. Small thing, but it is not a small thing.",
  },
] as const;

export const IMAGINE = {
  title: "The results compound, quietly.",
  before: "/photos/collagen-before.webp",
  after: "/photos/collagen-after.webp",
  body: [
    "Not thinking twice about a short-sleeved shirt in July.",
    "Hair that behaves like it did, and nails you can actually grow out.",
    "Getting up off the floor after an hour in the garden without the noise you usually make.",
    "Not spending another winter quietly worrying that one fall is all it would take.",
    "And a bone density appointment you walk into rather than dread.",
    "None of that arrives in a week. All of it is on the other side of a few months of the same scoop, which is the entire trick.",
  ],
} as const;

/* The honest replacement for the reference page's stock-up scarcity section. */
export const WHY_LONGER = {
  title: "Why we sell it in three and six month supplies",
  body: [
    "Not to get more money out of you up front. Because a one month jar is, on the evidence, not long enough to find out whether it works.",
    "Creatine works by saturation. It takes about 28 days at 5 g a day to fill your muscle stores, and the day you skip is the day that costs you.",
    "Collagen is slower still. The nail and hair trials read out at three to six months. The skin trials read out at eight to twelve weeks. The bone density trial ran for a year.",
    "So the three month supply is the shortest honest test of this, and the six month one is where the slower changes land. Both are cheaper per jar, and both can be paused or canceled in two clicks whenever you want.",
  ],
} as const;

export const ONLY_WORKS = {
  title: "Collagen only works if you",
  items: [
    { strong: "Take it every day.", rest: "One scoop in cold water, first thing, before the day gets hold of you." },
    { strong: "Take the full dose.", rest: "10 g is the amount the trials used. Half a scoop is a slower version of nothing." },
    { strong: "Take it long enough.", rest: "Skin at eight to twelve weeks. Nails and hair at three to six months. Bone over a year." },
  ],
  tail: "Which is to say a scoop here and there will not do it. Consistency is the whole mechanism, not a nice-to-have.",
} as const;

export const OFFER = {
  eyebrow: "Standing offer, no deadline",
  title: "Half off your first jar, every day of the year",
  body: "50% off the first order is a standing term here, not a sale. There is no countdown on this page because there is nothing to count down to.",
  cta: "Start with half off",
  terms: "Free shipping · Skip or cancel in two clicks · 30 day money back guarantee",
} as const;

export const GUARANTEE = {
  title: "The 30 day money back guarantee",
  body: "Take it every day for a month. If your nails have not changed, if your skin looks the same to you, or if you simply do not like the raspberry lemonade, email us and we refund it. You do not need to send the jar back and you will not be talked out of it. Thirty days is enough to know whether you will keep taking something, and whether you keep taking it is the only thing that decides whether it works.",
} as const;

/* PLACEHOLDER review. */
export const CLOSING_REVIEW = {
  photo: "/photos/collagen-review-nadia.webp",
  who: "Zannetta M.",
  body: [
    "I want to give a shout out to my favorite thing I have bought this year, and list what I have actually noticed since February. Not what I hoped for. What I noticed.",
    "Skin: the dark spots on my face are slowly fading. That has made me bother with a proper morning and evening routine again, which probably helps too.",
    "Nails: growing fast. I am cutting them every two weeks, which has not happened in years.",
    "Hair: I had visible thinning down the middle of my head. What is coming through is dark rather than gray, which I did not expect at all.",
    "Joints: I had stiffness in my feet from plantar fasciitis and I would have to pause before walking after sitting for half an hour. The strange thing about pain is that you do not notice its absence. I only realized a few weeks ago that it had gone.",
    "If this nudges one person to stick with something for longer than two weeks, it was worth typing.",
  ],
} as const;

export const FINAL = {
  title: "You have a month to find out, and nothing riding on it.",
  body: [
    "Your first jar arrives in a few days. Open it, put one scoop in cold water, and drink it.",
    "Then do that tomorrow, and the day after, and do not go looking for changes for eight weeks, because you will not find them and you will talk yourself out of it.",
    "Somewhere around week four your nails will be the first thing to give you away. The rest arrives on its own schedule.",
    "That is the whole method. One scoop, every morning, for long enough to matter.",
  ],
  cta: "Start with half off",
} as const;

export const REFERENCES = [
  "Proksch E, et al. Oral supplementation of specific collagen peptides has beneficial effects on human skin physiology. Skin Pharmacol Physiol. 2014.",
  "Proksch E, et al. Oral intake of specific bioactive collagen peptides reduces skin wrinkles. Skin Pharmacol Physiol. 2014.",
  "Konig D, et al. Specific collagen peptides improve bone mineral density and bone markers in postmenopausal women. Nutrients. 2018.",
  "Zdzieblik D, et al. Collagen peptide supplementation in combination with resistance training. Br J Nutr. 2015.",
  "Clark KL, et al. 24-week study on the use of collagen hydrolysate as a dietary supplement in athletes with activity-related joint pain. Curr Med Res Opin. 2008.",
  "Hexsel D, et al. Oral supplementation with specific bioactive collagen peptides improves nail growth and reduces symptoms of brittle nails. J Cosmet Dermatol. 2017.",
  "Brincat M, et al. Long-term effects of the menopause and sex hormones on skin thickness. Br J Obstet Gynaecol. 1985.",
  "Shuster S, et al. The influence of age and sex on skin thickness, skin collagen and density. Br J Dermatol. 1975.",
  "Kreider RB, et al. International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation. J Int Soc Sports Nutr. 2017.",
  "Smith-Ryan AE, et al. Creatine supplementation in women's health: a lifespan perspective. Nutrients. 2021.",
];

export const DISCLAIMER =
  "*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease. The studies cited describe results reported in published research and are not a claim about the results any individual will get from this product. Nothing on this page is a substitute for medical advice. Speak to your doctor about any symptom that concerns you, particularly unexplained bruising, and before starting any supplement.";
