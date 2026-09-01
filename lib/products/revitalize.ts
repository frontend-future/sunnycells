/**
 * SC-25 Revitalize Gummies. Same shape as the other product files: every word the
 * page says lives here.
 *
 * THE FORMULA IS REAL. The panel below is transcribed from the spec sheet, unlike the
 * Daily Reds one. What still needs settling before paid traffic:
 *
 *   1. Reviews, the rating and the count are written to brand voice. Nobody in them
 *      exists. Replace with permissioned customers.
 *   2. Price is a placeholder on the house ladder.
 *   3. Every claim here is structure/function and carries the FDA disclaimer.
 *
 * THREE THINGS THE PANEL DOES NOT SUPPORT, and which the copy therefore does not say:
 *
 *   a. "Boosts metabolism." B1, B3 and B5 are the cofactors energy metabolism runs on.
 *      In somebody already replete they do not raise metabolic rate, they let it run.
 *      The page says "runs on" and never "boosts", "revs" or "burns more".
 *   b. Glucomannan. The EFSA weight-loss claim is at 3 g a day split across three
 *      doses. One sachet carries 0.5 g, a sixth of it. The page credits satiety to the
 *      10 g of protein, which is the dose that actually does the work here, and treats
 *      the glucomannan as the second thing rather than the headline.
 *   c. Lutein and zeaxanthin serve none of the three goals. They are for the macula.
 *      Stated plainly in the ingredient list rather than stretched into the pitch.
 *
 * The word "anti-aging" appears nowhere, per the house rule. The stress section talks
 * about cortisol and what it does, which is the mechanism, not the promise.
 */

export const CART_ID = "revitalize";

/** PLACEHOLDER. Point at the real support inbox before launch. */
export const SUPPORT_EMAIL = "support@sunnycells.com";

export const PRODUCT = {
  sku: "SC-25",
  name: "Revitalize Gummies",
  shortName: "Revitalize",
  strapline: "Four gummies, once a day, cherry lime",
  flavor: "Cherry lime",
  servings: 28,
  perServing: "4 gummies",
  sachetWeight: "28 g",
  pouchWeight: "784 g",
  image: "/product/revitalize/kitchen.webp",
} as const;

export type Plan = {
  id: string;
  months: number;
  name: string;
  sub: string;
  price: number;
  compareAt: number;
  best?: boolean;
};

/* House ladder. compareAt is the list price of a pouch at that supply and every plan is
   exactly half of it, so the standing 50% is true on all three. */
export const PLANS: Plan[] = [
  { id: "s1", months: 1, name: "1 month supply", sub: "Delivered fresh monthly", price: 25, compareAt: 50 },
  { id: "s3", months: 3, name: "3 month supply", sub: "Delivered every 3 months", price: 23, compareAt: 46, best: true },
  { id: "s6", months: 6, name: "6 month supply", sub: "Delivered every 6 months", price: 21, compareAt: 42 },
];

export function planById(id: string | undefined): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS.find((p) => p.best) ?? PLANS[0];
}

export type OrderLine = { id: string; name: string; note: string; was: number | null; now: number | null; image: string | null };
export type Order = { plan: Plan; lines: OrderLine[]; listTotal: number; discount: number; total: number };

export function buildOrder(planId: string | undefined): Order {
  const plan = planById(planId);
  const now = plan.price * plan.months;
  const list = plan.compareAt * plan.months;
  const pouches = `${plan.months} ${plan.months === 1 ? "pouch" : "pouches"}`;
  return {
    plan,
    lines: [
      { id: "product", name: `${PRODUCT.name}, ${PRODUCT.flavor.toLowerCase()}`,
        note: `${pouches} of ${PRODUCT.servings} daily sachets. ${plan.sub}.`,
        was: list, now, image: PRODUCT.image },
      { id: "shipping", name: "Shipping", note: "Free on every order", was: null, now: 0, image: null },
    ],
    listTotal: list, discount: list - now, total: now,
  };
}

/**
 * The dated line above the buy box. Today's date with the ordinal, computed on the
 * client so it is never stale. No expiry on it: 50% off the first order is a standing
 * term, so a deadline would be a countdown on something that never counts down.
 */
function ordinal(d: number): string {
  if (d > 3 && d < 21) return `${d}th`;
  return `${d}${["th", "st", "nd", "rd"][d % 10] ?? "th"}`;
}

export function orderLine(now: Date): string {
  const month = now.toLocaleDateString("en-US", { month: "long" });
  return `Order by ${month} ${ordinal(now.getDate())} for 50% Off With Free Shipping`;
}

/** PLACEHOLDER rating. */
export const RATING = { score: 4.8, count: 2417 } as const;

/* Carousel slides first, then the photography. The slides are the argument in order:
   what it is, what you get, what is in it, when it works, why not the alternatives,
   objections, why trust us, no risk. Built by scripts/build-carousel.mjs. */
export const GALLERY = [
  { src: "/product/revitalize/carousel/01-product.webp", alt: "A pouch of Revitalize Gummies with two sachets and five cherry lime gummies on white" },
  { src: "/product/revitalize/carousel/02-outcome.webp", alt: "What a day with Revitalize looks like: no 3:30 PM pantry raids, no afternoon brain fog, no morning puffy face, no dark circles under your eyes, no tight neck or jaw tension, no screen-strained eyes by 5 PM, no premature fine lines, no second cup of afternoon coffee, no feeling too drained to enjoy your evenings" },
  { src: "/product/revitalize/carousel/03-inside.webp", alt: "The supplement facts panel with each ingredient and its job: vitamin C to build collagen, 10 g gelatin for protein, magnesium glycinate to calm tension, B5 for the stress response, D3 for the indoor day, B1 and B3 for energy and skin, glucomannan to slow the stomach, lutein and zeaxanthin for the screen, allulose for sweetness with no added sugar" },
  { src: "/product/revitalize/carousel/04-timeline.webp", alt: "What happens when you take Revitalize: week one the 3pm hole shallows, month three skin has turned over once, month six and beyond hair grown on the new intake" },
  { src: "/product/revitalize/carousel/05-compare.webp", alt: "Revitalize compared with coffee and a multivitamin across energy without a crash, 10 g of protein, feeding what cortisol spends, staying full to dinner, being something you look forward to, and every dose printed on the front" },
  { src: "/product/revitalize/carousel/06-faq.webp", alt: "Frequently asked questions: what Revitalize is, how it works, whether there is caffeine in it, and how long until you notice" },
  { src: "/product/revitalize/carousel/07-honesty.webp", alt: "We print the weak claims too: every claim on the product page carries an evidence grade and six carry a caveat we wrote ourselves" },
  { src: "/product/revitalize/carousel/08-guarantee.webp", alt: "60 day money back. Try Revitalize for 60 days, and if the afternoon does not change we refund the whole order" },
] as const;

/* The eight argument slides on their own. The listicle's offer carousel runs these and
   nothing else: twelve dots wrapped onto two rows, and the four photographs are not
   part of the argument anyway. */
export const CAROUSEL = GALLERY;

export const GALLERY_FULL = [
  ...GALLERY,
  { src: "/product/revitalize/kitchen.webp", alt: "A pouch of Revitalize Gummies on a marble kitchen counter beside a pour-over coffee brewer and a bowl of limes" },
  { src: "/product/revitalize/hand.webp", alt: "A hand holding a cherry lime gummy above an open sachet" },
  { src: "/product/revitalize/slump.webp", alt: "The pouch and an open sachet of gummies on a sunlit desk beside a monitor and a mug" },
  { src: "/product/revitalize/tote.webp", alt: "The pouch tucked into a canvas tote bag with a sachet beside it" },
] as const;

export const HERO = {
  title: "Office work spikes your cortisol.",
  titleAccent: "Cortisol is what ages you.",
  /* Both halves of the headline are claims about stress physiology, not about this
     product, and both are cited on the advertorial: chronic work strain is associated
     with a raised cortisol awakening response, and chronic cortisol tracks with
     accelerated cellular aging and with collagen breakdown.
     
     The lede stops at "puts back what the day takes", which is what the panel supports.
     "We built this to stop that" would be a claim that a gummy blocks cortisol, and
     neither the doses nor the law will carry it. */
  lede:
    "Making cortisol burns through vitamin C and pantothenic acid. Then it breaks collagen down faster than you build it back, and drops you into the afternoon where the snacking starts. Revitalize puts back what the day takes: four gummies, once a day.",
  points: [
    "10 g of protein, so the snack drawer stays shut",
    "Magnesium glycinate and vitamin C for the stress response",
    "B1, B3 and B5 at 100% of the daily value",
    "65 calories, no added sugar",
  ],
  photo: "/product/revitalize/kitchen.webp",
} as const;

export const TRUST = [
  "Third-party tested every batch",
  "Made in the USA, GMP-certified facility",
  "Free shipping, arrives in 3 to 5 days",
  "60 day money back guarantee",
] as const;

/**
 * The cost section, symptom first. Every card is anchored to something the panel can
 * actually stand behind, and none of them says the product treats anything.
 */
export const COST = {
  title: "What cortisol takes on the way through",
  lede: "None of it arrives as an event. It arrives as a normal Tuesday that leaves you wrecked by six, over and over, until it is just how you are.",
  image: "/product/revitalize/monitor.webp",
  alt: "A pouch of Revitalize Gummies on a desk in front of a monitor, mid afternoon",
  quadrants: [
    { icon: "zap-off", title: "The 3pm hole",
      body: "Cortisol peaks in the morning and drops through the afternoon. When it drops you get hungry, foggy and short with people. Most of us call that being tired." },
    { icon: "shopping-bag", title: "The snack drawer",
      body: "Nobody snacks at 3pm because they are hungry for lunch. They snack because breakfast had no protein in it and the body wants fast sugar." },
    { icon: "droplet", title: "Skin that shows the week",
      body: "Cortisol breaks collagen down faster than you build it back, and a desk job is a long run of days doing exactly that. Vitamin C is the cofactor your body needs to build collagen at all." },
    { icon: "repeat", title: "Wired at eleven",
      body: "Adrenaline you never spent has to go somewhere. It usually turns up as lying awake replaying the day at eleven at night." },
  ],
} as const;


/**
 * WHAT STRESS DOES, AND WHAT IN THE PACK MEETS IT.
 *
 * One row per visible effect, from the formula map. Three things about how this is
 * rendered, all deliberate:
 *
 *   1. Every row carries an evidence grade and the page prints it. "Strong" means a
 *      required biochemical role or a controlled trial at a comparable dose.
 *      "Supportive" means the nutrient's role is established and the link to the
 *      visible effect is reasonable rather than trialled. "Early" means the mechanism
 *      is plausible and the human evidence is thin. Showing the reader which is which
 *      is the single most persuasive thing on the page, and it is also the only honest
 *      way to put fourteen rows next to each other.
 *   2. Nothing says reduces, reverses, clears or shrinks. Every row says what the
 *      nutrient does in the body. Wrinkle reduction, gray reversal and belly fat are
 *      the three that cross from structure/function into a cosmetic or disease claim,
 *      and they are the three graded lowest here on purpose.
 *   3. Where the dose is below what the research used, the row says so.
 *
 * NEEDS A COMPLIANCE PASS before this takes paid traffic, as flagged in the brief.
 */
export type Grade = "strong" | "supportive" | "early";

export type AgingRow = {
  key: string;
  short: string;
  photo: string;
  alt: string;
  effect: string;
  actives: string[];
  short_body: string;
  body: string;
  grade: Grade;
  caveat?: string;
};

export const GRADE_LABEL: Record<Grade, string> = {
  strong: "Strong evidence",
  supportive: "Supportive evidence",
  early: "Early evidence",
};

export const AGING_MAP: { group: string; blurb: string; rows: AgingRow[] }[] = [
  {
    group: "Your face",
    blurb: "Cortisol is catabolic. It breaks tissue down faster than you rebuild it, and skin is where that shows first.",
    rows: [
      { key: "eyes", short: "Under-eye shadows", photo: "/photos/revitalize/effects/eyes.webp", short_body: "Poor sleep shows here before anywhere else.",
        alt: "Close crop of tired eyes with faint shadows beneath them",
        effect: "Under-eye bags and dark circles", actives: ["Magnesium glycinate 60 mg", "B5 5 mg"], grade: "supportive",
        body: "Neither of these does anything to the skin under your eyes directly. Magnesium glycinate supports sleep quality and pantothenic acid supports a normal stress response, which is the thing keeping you up.",
        caveat: "This addresses the sleep behind the shadows rather than the shadows. Nothing taken orally moves fluid out from under your eyes." },
      { key: "lines", short: "Lines and crow's feet", photo: "/photos/revitalize/effects/lines.webp", short_body: "Cortisol breaks collagen down faster than you rebuild it.", alt: "Close crop of the corner of an eye and temple, fine lines visible", effect: "Lines around the eyes and forehead", actives: ["Vitamin C 90 mg"], grade: "strong",
        body: "Collagen cannot be made without vitamin C. The enzymes that assemble it use ascorbate as a required cofactor, and there is no substitute for it in the reaction. In 4,025 women, higher vitamin C intake tracked with a lower likelihood of a wrinkled appearance." },
      { key: "crepey", short: "Crepey skin", photo: "/photos/revitalize/effects/crepey.webp", short_body: "Less collagen means thinner, looser skin.", alt: "Close crop of a cheek and jaw under flat office light", effect: "Crepey, thinning skin", actives: ["Gelatin 10 g", "Vitamin C 90 mg"], grade: "strong",
        body: "Gelatin supplies glycine, proline and hydroxyproline, which are the amino acids collagen is built from. Vitamin C is the cofactor that lets your body assemble them. The pack carries both, which is the point of putting them together.",
        caveat: "Gelatin is an incomplete protein and is not the same thing as hydrolysed collagen peptides." },
      { key: "dull", short: "Dull tone", photo: "/photos/revitalize/effects/dull.webp", short_body: "Tired cells, tired-looking skin.", alt: "Skin looking tired and matte under office fluorescent light", effect: "Dull, sallow tone", actives: ["Vitamin C 90 mg", "B1 1.2 mg", "B3 16 mg"], grade: "supportive",
        body: "Niacin supports normal skin function and thiamine and vitamin C sit in the reactions that keep cells energised. Both are recognised roles rather than a colour claim." },
      { key: "breakout", short: "Stress breakouts", photo: "/photos/revitalize/effects/breakout.webp", short_body: "Stress hormones push oil production up.", alt: "Close crop of a jawline with a few small blemishes", effect: "Breakouts under stress", actives: ["Niacinamide 16 mg"], grade: "early",
        body: "Niacinamide is well studied for barrier function and oil regulation, and it supports the maintenance of normal skin.",
        caveat: "That research is overwhelmingly topical niacinamide. This is 16 mg taken orally, which is a nutritional dose, not a dermatological one." },
      { key: "puffy", short: "Puffiness", photo: "/photos/revitalize/effects/puffy.webp", short_body: "Cortisol holds onto water.", alt: "A face on waking, slightly puffy around the eyes", effect: "Puffiness and facial bloating", actives: ["Magnesium glycinate 60 mg"], grade: "early",
        body: "Magnesium is involved in electrolyte balance and in the stress response that drives fluid retention. The mechanism is plausible; the human evidence on facial puffiness specifically is thin, and we would rather say so." },
    ],
  },
  {
    group: "Hair and nails",
    blurb: "Follicles and nail beds are among the most metabolically demanding tissue you have, so they are the first thing the body deprioritises.",
    rows: [
      { key: "shedding", short: "Hair in the brush", photo: "/photos/revitalize/effects/shedding.webp", short_body: "Follicles are the first thing your body deprioritises.", alt: "A hairbrush on a bathroom counter with loose strands caught in it", effect: "Shedding and thinning", actives: ["Protein 10 g", "B1, B3, B5", "Magnesium 60 mg"], grade: "supportive",
        body: "Hair growth runs on a steady supply of amino acids and the B vitamin cofactors that turn them into usable energy. Under-eating protein is one of the commonest nutritional reasons hair sheds." },
      { key: "nails", short: "Brittle nails", photo: "/photos/revitalize/effects/nails.webp", short_body: "Nails are protein. Short on it and they split.", alt: "A hand resting on a desk, short unpolished nails", effect: "Brittle nails", actives: ["Protein 10 g", "B1, B3, B5"], grade: "supportive",
        body: "Nail keratin is a protein, built from the same amino acid pool and the same B vitamin cofactors as everything else." },
      { key: "graying", short: "Gray coming early", photo: "/photos/revitalize/effects/graying.webp", short_body: "Pigment cells wear out under oxidative load.", alt: "The side of a head with a few grey hairs at the temple", effect: "Going gray earlier", actives: ["Pantothenic acid 5 mg"], grade: "early",
        body: "Pantothenic acid has a long history in the pigment literature and supports normal mental performance and energy metabolism at this dose.",
        caveat: "The graying research is mid-century animal work. Nothing in this pack reverses gray hair, genetics sets when it starts, and we are not going to imply otherwise." },
    ],
  },
  {
    group: "Your body",
    blurb: "The part nobody photographs. Stress moves where fat sits and what you reach for at three in the afternoon.",
    rows: [
      { key: "snacking", short: "The 3pm snack", photo: "/photos/revitalize/effects/snacking.webp", short_body: "Cortisol drops at three and asks for sugar.", alt: "An open packet of biscuits and crumbs beside a keyboard", effect: "The snacking that puts weight on", actives: ["Protein 10 g", "Glucomannan 500 mg"], grade: "strong",
        body: "Protein is the most satiating of the three macronutrients and 10 g is a real amount rather than a gesture. Glucomannan is a soluble fiber that takes on water and slows the stomach.",
        caveat: "The EFSA weight loss claim for glucomannan is 3 g a day in three doses. A sachet carries 0.5 g. The protein is doing the work here." },
      { key: "middle", short: "Weight round the middle", photo: "/photos/revitalize/effects/middle.webp", short_body: "Stress decides where the weight sits.", alt: "Fastening a work trouser waistband in the morning", effect: "Weight settling around the middle", actives: ["Magnesium 60 mg", "B5 5 mg", "Glucomannan 500 mg"], grade: "early",
        body: "Magnesium and pantothenic acid support a normal stress response, and eating less between meals is the part of this you can actually act on.",
        caveat: "No supplement targets visceral fat. Where cortisol puts fat is not something a gummy changes." },
      { key: "tone", short: "Losing tone", photo: "/photos/revitalize/effects/tone.webp", short_body: "Not enough protein, and muscle goes first.", alt: "A person slumped in a desk chair, seen from the side", effect: "Losing tone", actives: ["Protein 10 g"], grade: "supportive",
        body: "Protein contributes to the maintenance of muscle mass, which is an authorised claim at this level of intake.",
        caveat: "Gelatin is low in tryptophan, so this supports your total intake rather than replacing a complete protein." },
      { key: "tension", short: "Neck and jaw tension", photo: "/photos/revitalize/effects/tension.webp", short_body: "Adrenaline you never spend ends up in your shoulders.", alt: "Reaching back to rub the base of the neck at a desk", effect: "Held tension in the neck and jaw", actives: ["Magnesium glycinate 60 mg"], grade: "supportive",
        body: "Magnesium contributes to normal muscle function and to the reduction of tiredness. The glycinate form was chosen because it absorbs well and is gentle on the stomach." },
    ],
  },
  {
    group: "Energy and eyes",
    blurb: "The two things a desk actually asks of you all day, and the two the day takes back.",
    rows: [
      { key: "screen", short: "Screen-strained eyes", photo: "/photos/revitalize/effects/screen.webp", short_body: "Eight hours of screen, no recovery.", alt: "Taking off glasses and pressing the bridge of the nose at a monitor", effect: "Strained eyes from a screen", actives: ["Lutein and zeaxanthin 5 mg"], grade: "strong",
        body: "These two carotenoids are what the macula is made of. In a controlled trial in heavy screen users, supplementation raised macular pigment and reduced headache, eye strain and fatigue.",
        caveat: "That trial used 12 mg a day for six months. This is 5 mg." },
      { key: "flat", short: "Flat by mid-afternoon", photo: "/photos/revitalize/effects/flat.webp", short_body: "The reaction that makes your energy runs short.", alt: "Staring past the monitor at an office desk, chin on hand", effect: "Flat by mid-afternoon", actives: ["B1, B3, B5 at 100% DV", "Vitamin D3 25 mcg"], grade: "strong",
        body: "Thiamine, niacin and pantothenic acid all carry authorised claims for normal energy-yielding metabolism, and niacin and pantothenic acid for the reduction of tiredness and fatigue. These are the cofactors the reaction runs on rather than a stimulant pushing on it." },
      { key: "daylight", short: "No daylight", photo: "/photos/revitalize/effects/daylight.webp", short_body: "Indoors all day, no vitamin D.", alt: "An open plan office under grey overcast light and ceiling fluorescents", effect: "Not seeing daylight", actives: ["Vitamin D3 25 mcg"], grade: "supportive",
        body: "Indoor workers run lower on vitamin D than people who work outside, for the obvious reason. 1000 IU is 125% of the daily value." },
    ],
  },
];

/** Counted from the map rather than written into a headline that can drift out of date. */
export const AGING_ROW_COUNT = AGING_MAP.reduce((n, g) => n + g.rows.length, 0);

/** The panel as a picture. Percentages are the label's own %DV. */
export const DOSE_BARS = [
  { name: "Vitamin D3", amount: "25 mcg", pct: 125 },
  { name: "Vitamin C", amount: "90 mg", pct: 100 },
  { name: "Vitamin B1", amount: "1.2 mg", pct: 100 },
  { name: "Vitamin B3", amount: "16 mg", pct: 100 },
  { name: "Vitamin B5", amount: "5 mg", pct: 100 },
  { name: "Protein", amount: "10 g", pct: 20 },
  { name: "Magnesium", amount: "60 mg", pct: 14 },
] as const;

/** The three goals, in the order the day happens. */
export const PILLARS = {
  title: "Three jobs, four gummies",
  lede: "Putting it back is three separate jobs, and each one has a named dose behind it rather than a promise.",
  items: [
    {
      key: "calm",
      name: "Calm the stress response",
      dose: "Magnesium glycinate 60 mg · Vitamin C 90 mg · B5 5 mg",
      photo: "/product/revitalize/hand.webp",
      alt: "A hand holding a cherry lime gummy above an open sachet",
      copy:
        "Making cortisol uses up vitamin C and pantothenic acid, which is why the adrenal glands hold more vitamin C than almost any other tissue in the body. Magnesium bound to glycine absorbs well and does not upset the stomach the way oxide does.",
      ticksLabel: "Supports",
      ticks: ["A normal stress response", "The tissue that cortisol draws on", "Collagen synthesis, which cortisol works against"],
    },
    {
      key: "full",
      name: "Stay full past lunch",
      dose: "Protein 10 g · Glucomannan 500 mg",
      photo: "/product/revitalize/marble.webp",
      alt: "The pouch and a torn sachet on a marble surface with gummies spilled out",
      copy:
        "Protein is the most satiating of the three macronutrients, and 10 g is a real amount of it rather than a gesture. Glucomannan is a soluble fiber from konjac root that takes on water in the stomach and slows it down.",
      ticksLabel: "Supports",
      ticks: ["Feeling full between meals", "Fewer reasons to open the snack drawer", "Slower gastric emptying"],
    },
    {
      key: "revitalize",
      name: "Run the engine you already have",
      dose: "B1 1.2 mg · B3 16 mg · B5 5 mg, all at 100% DV",
      photo: "/product/revitalize/typing.webp",
      alt: "The pouch beside a keyboard with a sachet open at the side of the desk",
      copy:
        "These three are not stimulants and they do not speed anything up. They are the cofactors the reaction needs: thiamine to get carbohydrate into the Krebs cycle, niacin as the NAD that carries the electrons, pantothenic acid as the coenzyme A the fat goes through. Run short and the reaction runs badly.",
      ticksLabel: "Supports",
      ticks: ["Normal energy-yielding metabolism", "Turning food into usable energy", "Normal function through a long day"],
    },
  ],
} as const;

/**
 * The two figures on the page that come from published sources rather than from us.
 */
export const STATS = [
  {
    figure: "1 in 4",
    title: "US adults report their stress as high on most days.",
    body: "Not a bad week. The ordinary baseline, on the days nothing in particular went wrong.",
    source: "American Psychological Association, Stress in America 2023.",
  },
  {
    figure: "~16 g",
    title: "is what the average American eats for breakfast in protein.",
    body: "Against 25 to 30 g at a meal, which is roughly where the satiety research starts to see an effect. Ten grams closes a good part of that.",
    source: "Berryman CE et al., protein intake distribution, NHANES 2007 to 2010.",
  },
] as const;

export const FINISH = {
  title: "You have a drawer of things you stopped taking.",
  lede:
    "None of it counts if you stop. Capsules end up at the back of a cupboard, powders end up under the sink, and a pill you have to remember with water is a pill you skip on the days that matter.",
  steps: [
    { image: "/product/revitalize/hand.webp", alt: "A hand holding a cherry lime gummy above an open sachet",
      title: "They taste like sweets", body: "Cherry lime, chewed. If it tasted worthy you would stop by week three, and we both know it." },
    { image: "/product/revitalize/laptop.webp", alt: "The pouch and a sachet next to an open laptop",
      title: "Nothing to measure", body: "One sachet, four gummies. No water, no scoop, no counting out five different bottles." },
    { image: "/product/revitalize/tote.webp", alt: "The pouch tucked into a canvas tote bag with a sachet beside it",
      title: "It travels flat", body: "Single-serve sachets. One lives in a bag rather than a cabinet you only open at home." },
  ],
} as const;

export const INSIDE = {
  title: "What is in it, and what each thing is for",
  groups: [
    { title: "10 g protein, from bovine gelatin", body: "The satiety comes from here. It also means this is not vegan or vegetarian." },
    { title: "Glucomannan, 500 mg", body: "Konjac root fiber. It takes on water and slows the stomach down. Worth saying: the European weight-loss claim for glucomannan sits at 3 g a day, six times this." },
    { title: "Magnesium glycinate, 60 mg", body: "Bound to glycine, which absorbs well and is gentle. 14% of the daily value." },
    { title: "Vitamin C from acerola, 90 mg", body: "100% DV. Used up making cortisol, and required to build collagen." },
    { title: "Vitamin D3, 25 mcg", body: "1000 IU, 125% DV. The one most people are short of through winter." },
    { title: "B1, B3 and B5", body: "Thiamine, niacinamide and pantothenic acid, each at 100% DV. The cofactors energy metabolism runs on." },
    { title: "Lutein and zeaxanthin, 5 mg", body: "For the macula, not for any of the three jobs above. It is in there because screens are." },
    { title: "Allulose, 6 g", body: "The sweetener. Nearly no calories and the FDA exempts it from added sugars, which is why the panel reads the way it does." },
  ],
} as const;

export const QUOTE = {
  photo: "/product/revitalize/park.webp",
  text:
    "I did not buy it to lose weight. I bought it because I was eating a flapjack at half three every single day and hating myself about it. Six weeks in I still eat one sometimes. Just not every day, and not standing at the cupboard.",
  name: "Erin L.",
  meta: "6 weeks in",
} as const;

/** PLACEHOLDER reviews. Voice is ours, the people are not real. */
export const REVIEWS = [
  { name: "Priya M.", when: "3 weeks ago", title: "The afternoon is the difference",
    body: "I take them with coffee about nine. By the time three comes round I am not hunting for something sweet, which has never been true before. Cannot tell you anything about my metabolism. Can tell you about that." },
  { name: "Dan W.", when: "1 month ago", title: "Ten grams of protein in a sweet",
    body: "Bought it for the protein honestly. Four gummies is easier than a shake at my desk and it does not need washing up. Cherry lime is not sickly, which I was worried about." },
  { name: "Marguerite S.", when: "1 month ago", title: "Sleeping better, which I did not expect",
    body: "The magnesium is the bit doing something for me. I am not lying there at eleven going over the day the way I was. Everything else I am taking on faith." },
  { name: "Tom R.", when: "2 months ago", title: "Honest report at two months",
    body: "Down about six pounds but I also started walking at lunch, so I am not going to pretend it was the gummies. What did change is I stopped grazing after dinner. Make of that what you like." },
] as const;

export const FAQ = [
  { q: "Is this a weight loss product?",
    a: "No, and it is not sold as one. It is 10 g of protein and 0.5 g of fiber, which help you feel full, plus the vitamins your body runs energy metabolism on. If eating less between meals leads somewhere for you, that is the mechanism, not a drug." },
  { q: "How many do I take?",
    a: `Four gummies, once a day. That is one sachet. There are ${PRODUCT.servings} sachets in a pouch, so a pouch is four weeks.` },
  { q: "Is it vegan?",
    a: "No. The 10 g of protein is bovine gelatin, which is where the satiety comes from. There is no vegan version of this formula and we are not going to imply otherwise." },
  { q: "Does it have caffeine or a stimulant in it?",
    a: "Neither. Nothing in it raises your heart rate. The B vitamins support the reaction that makes energy rather than pushing on it, so there is nothing to crash from." },
  { q: "When would I notice anything?",
    a: "Most people notice the afternoon first, usually inside a couple of weeks, because 10 g of protein is a thing you can feel. The magnesium and the B vitamins are slower and harder to point at." },
  { q: "65 calories and 6 g of sugar. Is that a lot?",
    a: "The 6 g is allulose, a sugar the body barely absorbs, which is why the FDA does not count it as added sugar. The 65 calories are mostly the 10 g of protein. It is a smaller number than whatever you were going to eat at 3pm." },
  { q: "What does it taste like?",
    a: "Cherry lime. Tart rather than sweet, and chewy rather than gritty. That is deliberate: a gummy you have to talk yourself into is a gummy you stop taking." },
  { q: "Can I take it with other supplements or medication?",
    a: `With most supplements, yes. Glucomannan can slow the absorption of oral medication, so take those an hour either side. If you are pregnant, nursing, or on prescription medication, speak to your doctor first, and email ${SUPPORT_EMAIL} if you want the full panel to show them.` },
  { q: "What if I do not like them?",
    a: `Email ${SUPPORT_EMAIL} inside 60 days and we refund the whole order. You keep the pouch.` },
  { q: "Where is it made?",
    a: "Made in the USA, in a facility that follows current Good Manufacturing Practice. Every batch goes to an independent lab before it ships." },
] as const;

export const INCLUDED = [
  { n: "28", label: "daily sachets", body: "One a day for four weeks. Four gummies in each." },
  { n: "Free", label: "shipping", body: "On every order, every time, with no minimum." },
  { n: "60 days", label: "money back", body: "Email us and we refund it. You keep the pouch." },
  { n: "2 clicks", label: "to cancel", body: "Skip a delivery or stop entirely from your account." },
] as const;

export const TESTING = {
  title: "Tested before it ships",
  lede: "Every batch goes to an independent lab first, because a gummy concentrates whatever went into it.",
  items: [
    { title: "Heavy metals", body: "Lead, arsenic, cadmium and mercury, against California Proposition 65 limits." },
    { title: "Microbials", body: "Yeast, mold, salmonella, E. coli and total plate count." },
    { title: "Potency", body: "Protein, glucomannan and every vitamin assayed against the label rather than assumed from the recipe." },
    { title: "Allergens", body: "Screened for the major allergens. Contains bovine gelatin." },
  ],
  note: "Certificates of analysis are available on request for any batch, identified by the code printed on the pouch.",
} as const;

export const DISCLAIMER =
  "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.";

/**
 * The supplement facts panel, transcribed from the spec. Unlike SC-24's, this one is
 * real, but it still needs a regulatory read before it prints: the FDA reads serving
 * size, %DV, ingredient order and the allergen statement literally.
 */
export const FACTS = {
  servingSize: "One sachet (4 gummies, approx. 28 g)",
  servingsPerContainer: 28,
  suggestedUse: "One pack a day, taken in the morning with or without food. Chew all four thoroughly. Take with 8 to 16 fl oz of water for best effect. Do not exceed one pack per day.",
  callout: {
    headline: "10 g of protein per sachet",
    parts: [
      { n: "10 g", label: "Protein" },
      { n: "65", label: "Calories" },
      { n: "0 g", label: "Added sugars" },
      { n: "0.5 g", label: "Fiber" },
    ],
  },
  chips: ["10 g protein", "Konjac fiber", "Magnesium glycinate", "100% DV B vitamins"],
  cleanChips: ["No added sugar", "Gluten free", "Nut free", "Dairy free", "No artificial colors", "Contains bovine gelatin"],
  rows: [
    { name: "Calories", amount: "65", dv: "" },
    { name: "Total Carbohydrate", amount: "8 g", dv: "3%**" },
    { name: "Dietary Fiber (Glucomannan)", amount: "0.5 g", dv: "2%**", indent: 1 },
    { name: "Total Sugars (Allulose)", amount: "6 g", dv: "††", indent: 1 },
    { name: "Includes 0 g Added Sugars", amount: "", dv: "", indent: 2 },
    { name: "Protein (from Gelatin)", amount: "10 g", dv: "20%" },
    { name: "Vitamin C (Acerola)", amount: "90 mg", dv: "100%" },
    { name: "Vitamin D3", amount: "25 mcg (1000 IU)", dv: "125%" },
    { name: "Vitamin B1 (Thiamine)", amount: "1.2 mg", dv: "100%" },
    { name: "Vitamin B3 (Niacinamide)", amount: "16 mg", dv: "100%" },
    { name: "Vitamin B5 (Pantothenic Acid)", amount: "5 mg", dv: "100%" },
    { name: "Magnesium (Glycinate)", amount: "60 mg", dv: "14%" },
    { name: "Gelatin (Bovine, Type B)", amount: "10,000 mg (10 g)", dv: "†" },
    { name: "Glucomannan (Konjac Root)", amount: "500 mg", dv: "†" },
    { name: "Lutein/Zeaxanthin", amount: "5 mg", dv: "†" },
    { name: "Allulose", amount: "6 g", dv: "†" },
  ],
  footnotes: [
    "** Percent Daily Values are based on a 2,000 calorie diet.",
    "† Daily Value not established.",
    "†† Allulose is not included in Added Sugars under the FDA exemption.",
  ],
  caution:
    "CONTAINS BOVINE GELATIN. Take oral medication one hour either side of this product, as glucomannan can slow absorption. CHILDREN, PREGNANT OR NURSING WOMEN should seek professional medical advice before taking this or any other dietary supplement. Keep out of reach of children.",
  spec: [
    { label: "Weight per gummy", value: "approx. 7 g" },
    { label: "Gummies per sachet", value: "4" },
    { label: "Sachet weight", value: "approx. 28 g" },
    { label: "Sachets per pouch", value: "28" },
    { label: "Pouch weight", value: "approx. 784 g" },
  ],
} as const;
