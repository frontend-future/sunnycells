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
  title: "Your laptop screen is aging you faster than the sun",
  description:
    "A desk job spikes cortisol, and cortisol is what ages you. Ten ways it shows, and what in a daily gummy meets each one.",
};

export const HERO = {
  rating: "Excellent 4.8",
  count: "2,417 reviews",
  title: "Your Laptop Screen Is Aging You Faster Than The Sun. Here Are 10 Reasons Office Workers Are Fighting Back With This Chew",
  sub: "From puffy morning eyes to stubborn cortisol belly, here's why thousands of desk workers chew four of these before 9 AM to keep their skin, eyes, and body looking ten years younger.",
  photo: "/product/revitalize/slump.webp",
  alt: "A pouch of Revitalize Gummies and an open sachet on a sunlit desk",
};

export type Reason = { n: number; title: string; body: string; photo: string; alt: string; fit?: "contain" };

/*
 * Copy as supplied, with two corrections that are factual rather than editorial.
 *
 *   L-THEANINE IS NOT IN SC-25. The supplied text named it twice. It is an Outty
 *   ingredient, from the competitor page in lib/products/outty.ts, and naming an
 *   ingredient the pack does not contain is the one thing on a supplement page that
 *   is indefensible. Replaced with what is actually in the sachet and does the job
 *   described: magnesium glycinate and pantothenic acid.
 *
 *   "grass-fed gelatin" and "real fruit juice" are not on our label either. The label
 *   says Gelatin (Bovine, Type B), and there is no juice in it. Written to the label.
 *
 * TWO THINGS STILL NEED A DECISION, both flagged rather than quietly changed:
 *   1. Reason 10 says 60 days. Every other surface says 30, including the guarantee
 *      slide, which is an image. Reason 10 therefore uses a photograph rather than
 *      that slide, so nothing on screen contradicts itself while the number is open.
 *   2. "thousands of desk workers" and "ten years younger" in the subhead, plus the
 *      belly-fat and gray-hair claims below, are the strongest things anywhere in
 *      SC-25. They want the compliance read the brief already asked for.
 */
export const REASONS: Reason[] = [
  { n: 1, title: "It shrinks stubborn \u201cCortisol Belly\u201d",
    body: "High stress triggers your body to store visceral fat around your midsection. Revitalize uses Niacinamide and Magnesium Glycinate to mute the stress response at the cellular level, signaling your body to stop hoarding emergency fat and finally let go of lower-belly weight.",
    photo: "/photos/revitalize/effects/middle.webp", alt: "Side profile of a middle aged man in a t-shirt, a soft belly visible in profile against a plain wall" },
  { n: 2, title: "It flushes away morning \u201cPuffy Face\u201d",
    body: "Unmanaged cortisol disrupts fluid balance, leaving you swollen and heavy-looking. The Magnesium Glycinate in Revitalize helps restore fluid regulation and relax micro-vessels, flushing out morning retention so you wake up with a defined face.",
    photo: "/photos/revitalize/effects/puffy.webp", alt: "A woman sitting on the edge of a bed just after waking, face puffy around the eyes and cheeks, pillow crease on one cheek" },
  { n: 3, title: "It stops early wrinkles before they start",
    body: "Elevated cortisol breaks down your collagen and accelerates fine lines. Revitalize counters this by pairing Bovine Gelatin, rich in skin-building glycine aminos, with natural Acerola Vitamin C to shield your collagen matrix from stress breakdown.",
    photo: "/photos/revitalize/effects/lines.webp", alt: "Close on a tired woman's face under overhead bathroom light, deep crow's feet and forehead lines" },
  { n: 4, title: "It shields your eyes from digital damage",
    body: "Staring at screens all day drains ocular tissue and causes micro-tension. Revitalize delivers clinically backed Lutein and Zeaxanthin alongside Acerola antioxidants to actively filter blue light and neutralize digital strain, keeping your eyes fresh after long workdays.",
    photo: "/photos/revitalize/effects/screen.webp", alt: "A man at a cluttered office desk late in the day, glasses pushed up, rubbing reddened tired eyes" },
  { n: 5, title: "It kills relentless afternoon cravings",
    body: "That 3:30 PM pantry raid isn\u2019t a lack of willpower. Revitalize pairs 10 g of satiety-boosting gelatin aminos with konjac fiber that swells in the stomach, keeping you full and silencing afternoon cravings until dinner.",
    photo: "/photos/revitalize/effects/snacking.webp", alt: "A messy office desk mid afternoon: a half-eaten packet of biscuits on its side, crumbs, a stained mug" },
  { n: 6, title: "It erases tired, baggy eyes",
    body: "Spiked nighttime cortisol ruins sleep quality and restricts facial blood flow, leaving dark circles. Revitalize uses Magnesium Glycinate and Pantothenic Acid to lower evening tension, supporting the deep sleep needed to wake up looking rested.",
    photo: "/photos/revitalize/effects/eyes.webp", alt: "Close on a woman's face in a bathroom, dark shadows and puffiness under both eyes" },
  { n: 7, title: "It fights stress-induced gray hair",
    body: "Chronic stress depletes the follicle stem cells that produce natural hair pigment. Revitalize delivers Niacinamide to shield hair follicles from oxidative stress, helping preserve your natural hair color and strand vitality.",
    photo: "/photos/revitalize/effects/graying.webp", alt: "Close on the side of a man's head, grey hairs scattered through darker hair at the temple" },
  { n: 8, title: "It\u2019s built with 100% clean ingredients",
    body: "No cheap fillers, synthetic dyes, seed oils, or numbing herbs like Ashwagandha. Every chew of Revitalize uses pure, highly bioavailable ingredients, like Bovine Gelatin and Magnesium Glycinate, to support cellular metabolism naturally.",
    photo: "/product/revitalize/carousel/03-inside.webp", fit: "contain",
    alt: "The supplement facts panel with every ingredient and the job it does" },
  { n: 9, title: "It\u2019s third-party tested & backed by biochemistry",
    body: "No hidden proprietary blends or micro-dosed gimmick ingredients. Every batch of Revitalize undergoes rigorous independent third-party lab testing for purity, potency, and heavy metals.",
    photo: "/product/revitalize/marble.webp",
    alt: "The pouch and a torn sachet on a marble surface with gummies spilled out" },
  { n: 10, title: "It works or you don\u2019t pay",
    body: "Try Revitalize for 60 full days. If you don\u2019t notice a real difference in your stress, afternoon energy, and appearance, you get a full refund. We take the risk, not you.",
    photo: "/photos/revitalize/ten/r10.webp",
    alt: "A person on a sofa at home holding a cream supplement pouch" },
];





export const REVIEWS_TITLE = "What people are saying about Revitalize";

/** PLACEHOLDER. None of these people exist. */
export const REVIEWS = [
  { headline: "I stopped raiding the cupboard at half three.",
    body: "I take them with coffee about nine. By the time three comes round I am not hunting for something sweet, which has never been true before. Cannot tell you anything about my metabolism. Can tell you about that.",
    name: "Priya M.", place: "Austin, TX", photo: "/photos/revitalize/ugc/holding.webp" },
  { headline: "Ten grams of protein in a sweet.",
    body: "Bought it for the protein honestly. Four gummies is easier than a shake at my desk and it does not need washing up. Cherry lime is not sickly, which I was worried about.",
    name: "Dan W.", place: "Columbus, OH", photo: "/photos/revitalize/ugc/desk-overhead.webp" },
  { headline: "The magnesium is the bit doing something for me.",
    body: "I am not lying there at eleven going over the day the way I was. Everything else I am taking on faith, and I am fine with that because they say which bits are which.",
    name: "Marguerite S.", place: "Portland, OR", photo: "/photos/revitalize/ugc/palm.webp" },
  { headline: "Honest report at two months.",
    body: "Down about six pounds but I also started walking at lunch, so I am not going to pretend it was the gummies. What did change is I stopped grazing after dinner.",
    name: "Tom R.", place: "Nashville, TN", photo: "/photos/revitalize/ugc/car.webp" },
];

export const OFFER = {
  customers: "2,417 reviews",
  ingredientsLink: "See the full ingredient list",
  title: "Daily chews to keep your high-stress workweeks from prematurely aging you",
  bullets: [
    "Kills Snack Room Cravings: Keeps your energy steady all afternoon so you stop hunting for snacks",
    "Fights Cortisol Belly: Helps your body stop hoarding stubborn stress fat around your midsection",
    "Combats Early Wrinkles: Protects your collagen matrix from daily work stress so skin stays firm",
    "Clean, Steady Energy: Lifts afternoon brain fog and fatigue without jitters, crashes, or anxiety",
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
