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
  /* Split so the claim carries a rule under it. The three parts join back into one
     sentence, so the page title and any share preview still read normally. */
  titleLead: "Your Laptop Screen Is ",
  titleUnderline: "Aging You Faster Than The Sun",
  titleRest: ". Here Are 10 Reasons Office Workers Are Fighting Back With This Chew",
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
    photo: "/photos/revitalize/effects/middle.webp", fit: "contain", alt: "A before and after illustration of a midsection, with a diagram of fat under the skin reducing" },
  { n: 2, title: "It flushes away \u201cCortisol Face\u201d",
    body: "Unmanaged cortisol disrupts fluid balance, leaving you swollen and heavy-looking. The Magnesium Glycinate in Revitalize helps restore fluid regulation and relax micro-vessels, flushing out morning retention so you wake up with a defined face.",
    photo: "/photos/revitalize/effects/puffy.webp", fit: "contain", alt: "Two women photographed side by side, one with a fuller puffier face and one with a more defined face" },
  { n: 3, title: "It stops early wrinkles before they start",
    body: "Elevated cortisol breaks down your collagen and accelerates fine lines. Revitalize counters this by pairing Bovine Gelatin, rich in skin-building glycine aminos, with natural Acerola Vitamin C to shield your collagen matrix from stress breakdown.",
    photo: "/photos/revitalize/effects/lines.webp", alt: "Close on a tired woman's face under overhead bathroom light, deep crow's feet and forehead lines" },
  { n: 4, title: "It shields your eyes from digital damage",
    body: "Staring at screens all day drains ocular tissue and causes micro-tension. Revitalize delivers clinically backed Lutein and Zeaxanthin alongside Acerola antioxidants to actively filter blue light and neutralize digital strain, keeping your eyes fresh after long workdays.",
    photo: "/photos/revitalize/effects/screen.webp", alt: "A woman at a laptop at night taking off her glasses and pressing the bridge of her nose" },
  { n: 5, title: "It kills relentless afternoon cravings",
    body: "That 3:30 PM pantry raid isn\u2019t a lack of willpower. Revitalize pairs 10 g of satiety-boosting gelatin aminos with konjac fiber that swells in the stomach, keeping you full and silencing afternoon cravings until dinner.",
    photo: "/photos/revitalize/effects/snacking.webp", alt: "A takeaway bag overflowing with burgers, fries, pizza, cake and a cola" },
  { n: 6, title: "It erases tired, baggy eyes",
    body: "Spiked nighttime cortisol ruins sleep quality and restricts facial blood flow, leaving dark circles. Revitalize uses Magnesium Glycinate and Pantothenic Acid to lower evening tension, supporting the deep sleep needed to wake up looking rested.",
    photo: "/photos/revitalize/effects/eyes.webp", fit: "contain", alt: "A grid of faces showing under-eye bags and dark circles" },
  { n: 7, title: "It fights stress-induced gray hair",
    body: "Chronic stress depletes the follicle stem cells that produce natural hair pigment. Revitalize delivers Niacinamide to shield hair follicles from oxidative stress, helping preserve your natural hair color and strand vitality.",
    photo: "/photos/revitalize/effects/graying.webp", fit: "contain", alt: "A woman lifting her hair back from the parting to show grey strands through the roots" },
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
    photo: "/photos/revitalize/effects/guarantee.webp", fit: "contain",
    alt: "60 day 100% money back guarantee badge" },
];





export const REVIEWS_TITLE = "What people are saying about Revitalize";

/** PLACEHOLDER. None of these people exist. */
export const REVIEWS = [
  { headline: "Finally stopped raiding the office pantry at 3:30.",
    body: "I take four of these with my morning coffee around 9 AM. By the time 3 PM rolls around, I\u2019m not mindlessly hunting for sugar, which has literally never happened before. I can\u2019t speak to all the cellular science, but the lack of afternoon cravings is very real.",
    name: "Stacy M.", place: "Austin, TX", photo: "/photos/revitalize/ugc/holding.webp" },
  { headline: "Way easier than mixing a protein shake at my desk.",
    body: "Bought these to help bridge the gap between lunch and dinner. Popping four gummies is so much cleaner than shaking up a chalky powder at my keyboard and washing out a cup in the office sink. Cherry Lime actually tastes like real fruit, not overly sweet chemical candy.",
    name: "Dan W.", place: "Columbus, OH", photo: "/photos/revitalize/ugc/desk-overhead.webp" },
  { headline: "My brain actually shuts off when my head hits the pillow.",
    body: "The stress and magnesium combo is doing heavy lifting for me. I used to lie in bed at 11 PM replaying Slack messages and meeting notes in my head for an hour. Now I actually wind down. Waking up without that heavy, puffy morning face is just a massive bonus.",
    name: "Marguerite S.", place: "Portland, OR", photo: "/photos/revitalize/ugc/palm.webp" },
  { headline: "Honest 60-day update.",
    body: "Down about 6 pounds, but I also started walking on my lunch break, so I\u2019m not going to pretend this is some magic weight-loss chew. What did change is that my stress-snacking completely stopped. I\u2019m no longer grazing through the pantry after dinner.",
    name: "Tom R.", place: "Nashville, TN", photo: "/photos/revitalize/ugc/car.webp" },
];


export type Accordion = { title: string; body: string; table?: boolean };

export const OFFER = {
  customers: "2,417 reviews",
  title: "Daily stress chews to keep your job from aging you prematurely",
  /* Split at the colon: the lead-in is the scannable half, so it carries the weight
     and the rule while the explanation stays plain. */
  bullets: [
    { lead: "Kills Snack Room Cravings:", rest: " Keeps your energy steady all afternoon so you stop hunting for snacks" },
    { lead: "Fights Cortisol Belly:", rest: " Helps your body stop hoarding stubborn stress fat around your midsection" },
    { lead: "Combats Early Wrinkles:", rest: " Protects your collagen matrix from daily work stress so skin stays firm" },
    { lead: "Clean, Steady Energy:", rest: " Lifts afternoon brain fog and fatigue without jitters, crashes, or anxiety" },
  ],
  servings: "28 daily sachets per pouch",
  cadence: "Delivered fresh monthly. Pause, skip, or cancel anytime.",
  cta: "Try Now",
  benefitsTitle: "Subscriber-only benefits",
  benefits: [
    "50% off your first order",
    "Free shipping always",
    "Cancel or pause anytime",
    "60 day money back guarantee",
    "First access to new products",
  ],
  accordions: [
    { title: "Ingredients", table: true, body: "Per pack of four gummies. The full panel, including the allergen statement, is on the product page." },
    { title: "Guarantee", body: "60 days, whole order refunded, and you keep the pouch. Email us inside the window." },
    { title: "How to use", body: "One pack a day, taken in the morning with or without food. Chew all four thoroughly. Take with 8 to 16 fl oz of water for best effect." },
  ],
};

export const DISCLAIMER =
  "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease. Revitalize is a dietary supplement, not a treatment for stress and not a weight loss drug. Individual results vary.";
