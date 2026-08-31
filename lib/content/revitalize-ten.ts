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
  title: "10 reasons your office job is aging you, and what stops each one",
  description:
    "A desk job spikes cortisol, and cortisol is what ages you. Ten ways it shows, and what in a daily gummy meets each one.",
};

export const HERO = {
  rating: "Excellent 4.8",
  count: "2,417 reviews",
  title: "10 Reasons Your Office Job Is Aging You, and What Stops Each One",
  sub: "Here's why office workers are chewing four of these before nine in the morning...",
  photo: "/product/revitalize/slump.webp",
  alt: "A pouch of Revitalize Gummies and an open sachet on a sunlit desk",
};

export type Reason = { n: number; title: string; body: string; photo: string; alt: string; fit?: "contain" };

export const REASONS: Reason[] = [
  { n: 1, title: "No more 4pm brain fog",
    body: "Turning food into energy takes B1, B3 and B5. Run short on any of them and the reaction runs badly. All three at 100% of the daily value, no caffeine, nothing to crash from.",
    photo: "/photos/revitalize/effects/flat.webp", alt: "Staring past the monitor at an office desk, chin on hand" },
  { n: 2, title: "No more bags under your eyes",
    body: "Those are a sleep problem, not an eye problem. Magnesium glycinate for getting to sleep. Pantothenic acid for the stress response that is keeping you awake at eleven.",
    photo: "/photos/revitalize/effects/eyes.webp", alt: "Close crop of tired eyes with faint shadows beneath them" },
  { n: 3, title: "No more early wrinkles",
    body: "Cortisol breaks collagen down faster than you build it back. Vitamin C is the one thing your body cannot make collagen without. 90 mg a sachet, 100% of the daily value.",
    photo: "/photos/revitalize/effects/lines.webp", alt: "Close crop of the corner of an eye and temple, fine lines visible" },
  /* The satiety is the claim, not the fat. Cortisol deciding where weight sits is real
     and citable; a gummy shrinking visceral fat is not, and this does not say it. */
  { n: 4, title: "No more stubborn weight round the middle",
    body: "Stare at a screen all day and cortisol decides where the weight sits. It arrives a few pounds at a time, in the places you least want it. 10 g of protein and konjac fiber keep you full past the 3pm drop, which is the part of this you can actually act on.",
    photo: "/photos/revitalize/effects/middle.webp", alt: "Waist-level crop of a man in a work shirt tugging at a waistband that has gone tight" },
  { n: 5, title: "No more afternoon cravings",
    body: "Caffeine on an empty stomach is a recipe for high cortisol. 10 g of gelatin protein keeps you full for hours, so you get through the afternoon without the tummy grumbles pulling you to the snack drawer.",
    photo: "/photos/revitalize/effects/snacking.webp", alt: "An open packet of biscuits and crumbs beside a keyboard" },
  { n: 6, title: "Your eyes\u2026 we've got them covered too",
    body: "Lutein and zeaxanthin are what your macula is made of. In a trial in heavy screen users, supplementing them cut headache, eye strain and fatigue. Eight hours of screen a day is what your job is.",
    photo: "/photos/revitalize/effects/screen.webp", alt: "Taking off glasses and pressing the bridge of the nose at a monitor" },
  { n: 7, title: "Clean ingredients with clinical support",
    body: "No proprietary blend. No caffeine. No added sugar. Every dose printed in milligrams and grams, at levels you can check against the research yourself.",
    photo: "/product/revitalize/carousel/03-inside.webp", fit: "contain",
    alt: "The supplement facts panel with every ingredient and the job it does" },
  { n: 8, title: "Results get better over time",
    body: "Week one is the afternoon. Month three is when skin has turned over once. Month six is hair grown on the new intake. Consistent use is the whole thing, which is why it turns up monthly.",
    photo: "/product/revitalize/carousel/04-timeline.webp", fit: "contain",
    alt: "What happens when you take Revitalize, staged at week one, month three and month six" },
  { n: 9, title: "Third-party tested every batch",
    body: "Heavy metals, microbials, allergens, and every vitamin assayed against the label rather than assumed from the recipe. Certificates of analysis on request for any batch.",
    photo: "/product/revitalize/marble.webp",
    alt: "The pouch and a torn sachet on a marble surface with gummies spilled out" },
  { n: 10, title: "It works or you do not pay",
    body: "30 days to try it. If the afternoon does not change, email us and we refund the order. Keep the pouch. We take the risk, not you.",
    photo: "/product/revitalize/carousel/08-guarantee.webp", fit: "contain",
    alt: "30 day money back guarantee on Revitalize Gummies" },
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
  ingredientsLink: "See the full ingredient list",
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
