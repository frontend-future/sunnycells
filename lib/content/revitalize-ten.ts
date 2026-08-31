/**
 * The listicle advertorial at /revitalize/10-reasons. Modelled on the reference's
 * shape: rating line, big promise headline, product shot, then ten numbered reasons
 * alternating photo and copy, reviews, offer.
 *
 * The reference's copy is two or three sentences a reason and no sentence is long.
 * That is the constraint here too. Everything that needs a caveat has one on the PDP
 * and the main advertorial; this page is the short version, so a reason either stands
 * up in three sentences or it does not go on the page.
 *
 * PLACEHOLDER: the rating, the count and every review are written to brand voice.
 */

export const META = {
  title: "10 reasons office workers are chewing these before 9am",
  description:
    "Ten things people notice after a month on Revitalize, from the 3pm snack drawer to what cortisol spends on the way through.",
};

export const HERO = {
  rating: "Excellent 4.8",
  count: "2,417 reviews",
  title: "10 Reasons You'll Stop Blaming Yourself for the 3pm Crash",
  sub: "Here's why people are chewing four of these before nine in the morning...",
  photo: "/product/revitalize/kitchen.webp",
  alt: "A pouch of Revitalize Gummies on a marble kitchen counter beside a coffee brewer and a bowl of limes",
};

export type Reason = { n: number; title: string; body: string; photo: string; alt: string };

export const REASONS: Reason[] = [
  { n: 1, title: "It shuts the snack drawer",
    body: "10 g of protein sits in front of the 3pm drop. You stop hunting for something sweet at half three because you are not actually hungry. Most people notice this one inside a week.",
    photo: "/photos/revitalize/ten/r01.webp", alt: "A woman pushing a desk drawer shut while holding a laptop" },
  { n: 2, title: "It puts back what stress spends",
    body: "Making cortisol burns through vitamin C and pantothenic acid. Your adrenal glands hold more vitamin C per gram than almost any tissue you have. A desk job spends it all day.",
    photo: "/photos/revitalize/ten/r02.webp", alt: "A man at a kitchen counter in the morning with a mug of coffee" },
  { n: 3, title: "Your body cannot build collagen without it",
    body: "Vitamin C is not a nice-to-have in that reaction. It is the cofactor. In 4,025 women, higher vitamin C intake tracked with a lower likelihood of wrinkled skin.",
    photo: "/photos/revitalize/ten/r03.webp", alt: "A woman looking in a bathroom mirror in morning daylight" },
  { n: 4, title: "It is four sweets, not a routine",
    body: "No scoop. No shaker. No glass of water. Tear one sachet, chew four, done. The best formula in the world does nothing from the back of a cupboard.",
    photo: "/photos/revitalize/ten/r04.webp", alt: "A hand tearing open a sachet over an office desk" },
  { n: 5, title: "No caffeine, so there is nothing to crash from",
    body: "B1, B3 and B5 let the reaction that makes your energy run properly. They do not push on it. Nothing in the pack raises your heart rate.",
    photo: "/photos/revitalize/ten/r05.webp", alt: "A man walking through an open plan office in the morning with a coffee" },
  { n: 6, title: "Every dose is printed on the front",
    body: "No proprietary blend hiding the amounts. Vitamin C 90 mg. Magnesium 60 mg. Protein 10 g. In milligrams and grams, where you can check them against the research.",
    photo: "/photos/revitalize/ten/r06.webp", alt: "A hand holding a cream supplement pouch, reading the label" },
  { n: 7, title: "It covers your eyes too",
    body: "Lutein and zeaxanthin are what the macula is made of. In a controlled trial in heavy screen users, supplementing them cut headache, eye strain and fatigue. Ours is 5 mg.",
    photo: "/photos/revitalize/ten/r07.webp", alt: "A woman at a monitor in the late afternoon, relaxed posture" },
  { n: 8, title: "The longer you take it, the more of it is working",
    body: "Week one is the afternoon. Month three is when skin turns over. Month six is when the hair grown in that window is hair grown on the new intake. Nobody can shortcut those clocks.",
    photo: "/photos/revitalize/ten/r08.webp", alt: "A wall calendar in a kitchen with days marked" },
  { n: 9, title: "We print how good the evidence is, claim by claim",
    body: "Three pips for a required biochemical role. One for a plausible mechanism and thin human evidence. Six things on the label get a caveat next to them. Nobody else in this aisle does that.",
    photo: "/photos/revitalize/ten/r09.webp", alt: "An open notebook and pen on a desk beside a laptop" },
  { n: 10, title: "It works or you do not pay",
    body: "30 days to try it. If the afternoon does not change, email us and we refund the order. Keep the pouch. We take the risk, not you.",
    photo: "/photos/revitalize/ten/r10.webp", alt: "A person on a sofa at home holding a cream supplement pouch" },
];

export const REVIEWS_TITLE = "What people are saying about Revitalize";

/** PLACEHOLDER. None of these people exist. */
export const REVIEWS = [
  { headline: "I stopped raiding the cupboard at half three.",
    body: "I take them with coffee about nine. By the time three comes round I am not hunting for something sweet, which has never been true before. Cannot tell you anything about my metabolism. Can tell you about that.",
    name: "Priya M.", place: "Austin, TX", photo: "/product/revitalize/desk.webp" },
  { headline: "Ten grams of protein in a sweet.",
    body: "Bought it for the protein honestly. Four gummies is easier than a shake at my desk and it does not need washing up. Cherry lime is not sickly, which I was worried about.",
    name: "Dan W.", place: "Columbus, OH", photo: "/product/revitalize/typing.webp" },
  { headline: "The magnesium is the bit doing something for me.",
    body: "I am not lying there at eleven going over the day the way I was. Everything else I am taking on faith, and I am fine with that because they say which bits are which.",
    name: "Marguerite S.", place: "Portland, OR", photo: "/product/revitalize/marble.webp" },
  { headline: "Honest report at two months.",
    body: "Down about six pounds but I also started walking at lunch, so I am not going to pretend it was the gummies. What did change is I stopped grazing after dinner.",
    name: "Tom R.", place: "Nashville, TN", photo: "/product/revitalize/park.webp" },
];

export const OFFER = {
  customers: "2,417 reviews",
  title: "Putting back what a desk job spends, four gummies at a time",
  bullets: [
    "10 g of protein, so the snack drawer stays shut",
    "Vitamin C and magnesium for what cortisol burns",
    "B1, B3 and B5 at 100% of the daily value",
    "65 calories, no added sugar, no stimulants",
  ],
  servings: "28 daily sachets per pouch",
  cadence: "Delivered fresh monthly. Pause, skip, or cancel anytime.",
  cta: "Try now and save 50%",
  benefitsTitle: "Subscriber-only benefits",
  benefits: [
    "50% off your first order",
    "Free shipping always",
    "Cancel or pause anytime",
    "30 day money back guarantee",
    "First access to new products",
  ],
  accordions: [
    { title: "Ingredients", body: "10 g protein from bovine gelatin, glucomannan 500 mg, magnesium glycinate 60 mg, vitamin C 90 mg from acerola, vitamin D3 25 mcg, B1, B3 and B5 at 100% DV, lutein and zeaxanthin 5 mg, sweetened with allulose. Full panel on the product page." },
    { title: "Guarantee", body: "30 days, whole order refunded, and you keep the pouch. Email us inside the window." },
    { title: "How to use", body: "One sachet a day. Tear it open and chew all four. Any time of day, with or without food. Take oral medication an hour either side, as glucomannan can slow absorption." },
  ],
};

export const DISCLAIMER =
  "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease. Revitalize is a dietary supplement, not a treatment for stress and not a weight loss drug. Individual results vary.";
