/**
 * The Revitalize advertorial at /revitalize/3pm-crash.
 *
 * Written to the same rules the collagen advertorial ended up on. What it does NOT do,
 * on purpose, because the reference genre does all four and they are the parts that
 * make an advertorial a liability:
 *
 *   1. No scarcity. No countdown, no "only 43 left", no expiring discount. 50% off the
 *      first order is a standing term.
 *   2. No invented clinical trial. Every number below has a citation and the reference
 *      list at the foot carries them in full.
 *   3. No press logos. We have not been in any of those magazines.
 *   4. No credentialed author. The byline is the brand, because inventing a doctor to
 *      lend authority to a supplement page is the single worst thing in the genre.
 *
 * PLACEHOLDER: every review is written to brand voice and none of these people exist.
 *
 * On the science: cortisol's diurnal fall, protein and satiety, and the roles of B1,
 * B3 and B5 as metabolic cofactors are all well established and cited. What is NOT
 * claimed anywhere is that Revitalize lowers cortisol, causes weight loss, or raises
 * metabolic rate. The page describes the mechanism and states the dose.
 */

export const META = {
  title: "Office work spikes your cortisol, and cortisol is what ages you",
  description:
    "What chronic work stress does to cortisol, what cortisol does to collagen and to your afternoon, and how to read a supplement label before you buy one.",
} as const;

export const HERO = {
  eyebrow: "Stress and aging",
  title: "Office work spikes your cortisol. Cortisol is what ages you.",
  sub:
    "Nobody leaves a desk job feeling like they did anything physical. You still come home emptied out, the weight still goes on, and the face in the mirror still shows the year. All three run through one hormone, and what it costs you is measurable.",
} as const;

export const BYLINE = {
  name: "The SUNNYCELLS editorial team",
  role: "Reviewed against the references listed at the foot of this page",
  date: "Updated August 2026",
} as const;

export const OPENERS = [
  "It arrives at roughly the same time every day. Somewhere between half two and half three the words on the screen stop going in, the meeting you were fine about becomes irritating, and you find yourself standing at a cupboard you did not decide to walk to.",
  "Most people file that under being tired, or being busy, or not having enough discipline. It is none of those. It is the predictable back half of a hormone curve that started before you woke up, and it behaves the same way in almost everybody.",
  "The reason it matters is that it does not stay an afternoon problem. Repeated a few hundred times, it is the whole slow drift: the weight that arrives a pound at a time, the skin that starts showing the week, the evenings you have nothing left for.",
];

export const CRISIS_TITLE = "Cortisol is not the villain. Living on it is.";

export const INTRO = [
  "Cortisol is the hormone that gets you out of bed. It peaks about thirty to forty-five minutes after you wake, which is called the cortisol awakening response, and then it falls through the day until it bottoms out around midnight. That is the healthy shape.",
  "Chronic job strain bends that shape. A meta-analysis of 62 studies found work stress and job strain among the psychosocial factors reliably associated with a raised awakening response, which is a polite way of saying your body starts every day braced for something.",
  "The reason that matters past the tiredness: cortisol is catabolic. It breaks tissue down. It suppresses the fibroblasts that make collagen while speeding up the enzymes that degrade it, which is why a hard year shows on a face before it shows anywhere else. And in the study that made this famous, women under the highest chronic stress had telomeres shorter by the equivalent of roughly a decade of additional aging.",
  "That fall is supposed to be gentle. What makes it steep is a morning with no protein in it, a stress response that never got switched off, and a day where the only thing you put in front of the drop was coffee.",
  "The result is not mysterious. Blood sugar dips, the body asks for the fastest carbohydrate it can find, and you are at the cupboard before you have decided anything.",
];


/**
 * The evidence, shown rather than asserted. Each card carries the design, the sample
 * size and the finding, so a reader can judge it instead of taking "clinically studied"
 * on trust. Every one is a real paper.
 *
 * Note what these studies are OF. Four of them are about stress and about the
 * nutrients. None of them is a trial of this product, and the page says so.
 */
export const STUDIES = [
  {
    finding: "Work strain raises the cortisol you wake up with",
    n: "62 studies",
    design: "Systematic review and meta-analysis",
    body: "Across the pooled literature, work stress and job strain were among the psychosocial factors reliably associated with a raised cortisol awakening response.",
    cite: "Chida & Steptoe, Biological Psychology, 2009",
  },
  {
    finding: "Chronic stress tracked with a decade of extra cellular aging",
    n: "58 women",
    design: "Controlled observational study",
    body: "Women in the highest chronic stress group had telomeres shorter by an amount the authors equated to roughly one additional decade of aging.",
    cite: "Epel et al., PNAS, 2004",
  },
  {
    finding: "Higher vitamin C intake, less wrinkled appearance",
    n: "4,025 women",
    design: "Cross-sectional, NHANES I, aged 40 to 74",
    body: "Higher dietary vitamin C intake was associated with a lower likelihood of a wrinkled appearance and of senile dryness, after adjusting for age, sun exposure and other factors.",
    cite: "Cosgrove et al., American Journal of Clinical Nutrition, 2007",
  },
  {
    finding: "Lutein and zeaxanthin cut eye strain in heavy screen users",
    n: "48 adults",
    design: "Randomised, double-blind, placebo-controlled, 6 months",
    body: "Supplementation raised macular pigment optical density and significantly reduced headache, eye strain and fatigue in people with high screen exposure.",
    cite: "Stringham et al., Foods, 2017. Dose used: 12 mg a day, against 5 mg here.",
  },
  {
    finding: "Vitamin C is not optional for collagen. It is the cofactor.",
    n: "Review",
    design: "Mechanistic review",
    body: "The prolyl and lysyl hydroxylases that assemble collagen require ascorbate. Without it the reaction does not proceed, which is what scurvy is.",
    cite: "Pullar, Carr & Vissers, Nutrients, 2017",
  },
  {
    finding: "Glucocorticoids suppress the cells that build collagen",
    n: "Review",
    design: "Mechanistic review",
    body: "Chronic cortisol suppresses fibroblast activity while accelerating the enzymes that degrade collagen, which is the route from a hard year to a face that shows it.",
    cite: "Hunter, Momen & Kleyn, Clinical and Experimental Dermatology, 2015",
  },
] as const;

/**
 * The cortisol curve, drawn rather than described. Values are illustrative shape, not
 * measured data, and the caption says so: the point is the difference between the two
 * profiles, which is what the literature describes.
 */
export const CURVE = {
  title: "The shape of a normal day, and the shape of a stressful one",
  caption:
    "Illustrative. Cortisol peaks 30 to 45 minutes after waking and falls through the day. Chronic job strain raises the waking peak and flattens the fall, which is the pattern the meta-analysis above describes.",
  hours: ["6am", "9am", "12pm", "3pm", "6pm", "9pm", "12am"],
  normal: [62, 100, 62, 38, 26, 16, 8],
  strained: [78, 118, 88, 70, 58, 44, 26],
  legend: [{ key: "normal", label: "A normal profile" }, { key: "strained", label: "Under chronic job strain" }],
} as const;

/**
 * PLACEHOLDER, and it stays a placeholder. Before-and-after imagery is a performance
 * claim, and generating one would be fabricating evidence for a product that has never
 * been photographed on a customer. The slot exists so the layout is ready. Fill it only
 * with permissioned photographs of real customers, same lighting, same framing, dated,
 * with the disclosure the FTC requires.
 */
export const BEFORE_AFTER = {
  title: "Before and after",
  body:
    "We do not have these yet. When we do they will be real customers, photographed in the same light at the same distance, dated, and shown with what else changed in between. Anything else on a page like this is a drawing.",
  slots: ["Customer photo, day 1", "Customer photo, day 90"],
} as const;

export type Sign = { n: number; title: string; body: string[]; image?: string; alt?: string };

export const SIGNS: Sign[] = [
  {
    n: 1,
    title: "You are not hungry at 3pm. You are looking for sugar.",
    image: "/photos/revitalize/cupboard.webp",
    alt: "An open kitchen cupboard of snack bars with a hand reaching in",
    body: [
      "There is a difference and you can feel it if you look for it. Real hunger builds and will accept anything. The 3pm thing is specific: it wants something sweet, it wants it now, and a bowl of soup will not do.",
      "That is a blood sugar signal rather than an appetite one, and the usual reason it turns up is that breakfast had almost no protein in it. Americans average around 16 g at breakfast, against the 25 to 30 g at a meal where the satiety research starts to see an effect.",
    ],
  },
  {
    n: 2,
    title: "The tiredness is in your head, not your legs.",
    image: "/photos/revitalize/slump.webp",
    alt: "A woman at a home office desk in the afternoon, hand pressed to her forehead",
    body: [
      "Physical tiredness makes you want to sit down. This makes you re-read the same paragraph four times while feeling perfectly capable of standing up and walking somewhere.",
      "Converting food into usable energy is a chain of reactions, and three B vitamins are the cofactors it runs on: thiamine to get carbohydrate into the Krebs cycle, niacin as the NAD that carries the electrons, pantothenic acid as the coenzyme A that fat goes through. Run short and the reaction does not stop, it just runs badly.",
    ],
  },
  {
    n: 3,
    title: "Small things make you disproportionately annoyed.",
    body: [
      "A message that would have been fine at ten in the morning lands badly at four. That is not a character flaw showing through as the day goes on. It is a stress response that has been on since your alarm and has nothing left to modulate itself with.",
      "Making cortisol consumes vitamin C and pantothenic acid, which is why the adrenal glands hold more vitamin C per gram than nearly any other tissue in the body. A long stretch of stressful days is a genuine draw on both.",
    ],
  },
  {
    n: 4,
    title: "You are wired at eleven at night.",
    image: "/photos/revitalize/awake.webp",
    alt: "A person lying awake in a dim bedroom at night",
    body: [
      "Adrenaline you generated and never spent has to go somewhere. It usually turns up as lying flat on your back at eleven, replaying a conversation from two in the afternoon.",
      "Magnesium is involved in the regulation of the stress axis, and most adults in the US fall short of the recommended intake. The form matters more than the number: magnesium bound to glycine absorbs well and does not do what magnesium oxide does to your stomach.",
    ],
  },
  {
    n: 5,
    title: "Your skin looks like the week you have had.",
    image: "/photos/revitalize/morning.webp",
    alt: "A woman at a sunlit kitchen counter in the morning holding a mug of coffee",
    body: [
      "This one is slower and easier to miss. Cortisol breaks collagen down faster than the body puts it back, and the enzymes that build collagen in the first place use vitamin C as a required cofactor. It is not optional and there is no substitute for it in the reaction.",
      "So a stretch of high-stress weeks pulls on both ends at once: more breakdown, and a bigger draw on the thing you need to rebuild. That is the mechanism behind the vague sense that a bad year aged you. It is not vague. It is collagen.",
    ],
  },
];

export const NOT_JUST_AGE = {
  title: "This is not about being busy, and it is not about your age.",
  body: [
    "Plenty of very busy people do not have a 3pm. The difference is rarely how much they have on. It is what went in at breakfast, and whether their stress response ever gets switched off.",
    "Both of those are things you can put a number on, which is the only reason this page is worth reading. Age is not a lever. Those two are.",
  ],
} as const;

export const THREE = {
  title: "There are three levers, and only three.",
  lede: "Every honest product in this category is pulling one of them. Most pull one and imply the other two.",
  items: [
    {
      title: "Blunt the fall, do not fight it",
      body: "You are not going to stop cortisol falling in the afternoon and you would not want to. What you can change is what the fall lands on. Protein is the most satiating of the three macronutrients, and putting 10 g in front of the drop is a different afternoon from putting nothing in front of it.",
    },
    {
      title: "Give the stress response something to work with",
      body: "Magnesium glycinate for the axis itself, vitamin C and pantothenic acid for the tissue that is doing the work. None of this sedates you. It supplies the things the reaction consumes.",
    },
    {
      title: "Stop running the engine short",
      body: "B1, B3 and B5 do not speed metabolism up. Anyone telling you a B vitamin boosts your metabolism is selling you something. What they do is let the reaction run properly, and running one short is a real and common way to feel worse than you need to.",
    },
  ],
} as const;

/** The section the sticky bar waits for. Named so the component can find it. */
export const BUYER_BEWARE = {
  title: "Buyer beware: most of this category fails on the dose.",
  body: [
    "The trick is almost never a fake ingredient. It is a real ingredient at a fraction of the amount the research used, printed in a way that looks the same on a shelf.",
    "Three things worth checking on any label before you buy it, ours included.",
  ],
  checks: [
    {
      title: "Is the amount printed, or is it inside a blend?",
      body: "A proprietary blend gives you the total weight of eight things and the amount of none of them. If a label will not tell you the dose, the dose is the reason.",
    },
    {
      title: "Is the dose the one from the study?",
      body: "Glucomannan is the clean example. The European weight-loss claim sits at 3 g a day split across three doses. Plenty of products carry a tenth of that and cite the same research. Revitalize carries 0.5 g, and we would rather say so here than have you find it on the panel.",
    },
    {
      title: "Does it need you to do anything?",
      body: "A scoop, a shaker, a glass of water and a thing to wash up is four chances a day to not bother. The best formula in the world does nothing from the back of a cupboard.",
    },
  ],
} as const;

export const INTRODUCING = {
  eyebrow: "What we made",
  title: "Revitalize: four gummies against what the desk takes.",
  body: [
    "One sachet a day, cherry lime, chewed. No water, no scoop, nothing to wash up. Twenty-eight sachets to a pouch, so a pouch is four weeks.",
    "It is not a stimulant and it is not a weight loss drug. It is 10 g of protein so the afternoon has something under it, magnesium glycinate and vitamin C for the stress response, and B1, B3 and B5 at 100% of the daily value so the reaction that makes your energy is not running short.",
  ],
  doses: [
    { name: "Protein, from bovine gelatin", amount: "10 g", note: "The satiety. Also why this is not vegan." },
    { name: "Glucomannan (konjac root)", amount: "500 mg", note: "Soluble fiber. A sixth of the EFSA claim dose, stated plainly." },
    { name: "Magnesium glycinate", amount: "60 mg", note: "14% DV. Bound to glycine, gentle on the stomach." },
    { name: "Vitamin C, from acerola", amount: "90 mg", note: "100% DV. Used up making cortisol, required to build collagen." },
    { name: "Vitamin B1, B3 and B5", amount: "100% DV", note: "Thiamine, niacinamide, pantothenic acid." },
    { name: "Vitamin D3", amount: "25 mcg", note: "1000 IU, 125% DV." },
  ],
  image: "/product/revitalize/kitchen.webp",
  alt: "A pouch of Revitalize Gummies on a marble kitchen counter beside a pour-over coffee brewer and a bowl of limes",
} as const;

export const TRUST = [
  "Third-party tested every batch",
  "Made in the USA, GMP-certified facility",
  "65 calories, no added sugar",
  "30 day money back guarantee",
] as const;

/** PLACEHOLDER reviews. None of these people exist. */
export const REVIEWS = [
  { name: "Priya M.", place: "Austin, TX", body: "I take them with coffee about nine. By the time three comes round I am not hunting for something sweet, which has never been true before." },
  { name: "Dan W.", place: "Columbus, OH", body: "Bought it for the protein honestly. Four gummies is easier than a shake at my desk and it does not need washing up." },
  { name: "Marguerite S.", place: "Portland, OR", body: "The magnesium is the bit doing something for me. I am not lying there at eleven going over the day the way I was." },
  { name: "Tom R.", place: "Nashville, TN", body: "Down about six pounds but I also started walking at lunch, so I am not going to pretend it was the gummies. What did change is I stopped grazing after dinner." },
] as const;

export const CLOSING = {
  title: "The job is not going anywhere. What it spends, you can put back.",
  body: [
    "You will be at your desk at three whatever you decide here. The only question is what is underneath it when you get there.",
    "Half off your first pouch, free shipping, and thirty days to change your mind. If it does not do anything for you, email us and we refund it. Keep the pouch.",
  ],
} as const;

export const REFERENCES = [
  "Fries E, Dettenborn L, Kirschbaum C. The cortisol awakening response (CAR): facts and future directions. International Journal of Psychophysiology, 2009.",
  "Chida Y, Steptoe A. Cortisol awakening response and psychosocial factors: a systematic review and meta-analysis. Biological Psychology, 2009. 62 studies; work stress and job strain among the factors associated with a raised awakening response.",
  "Epel ES, Blackburn EH, Lin J, Dhabhar FS, Adler NE, Morrow JD, Cawthon RM. Accelerated telomere shortening in response to life stress. PNAS, 2004.",
  "Hunter HJA, Momen SE, Kleyn CE. The impact of psychosocial stress on healthy skin. Clinical and Experimental Dermatology, 2015. On glucocorticoids, fibroblast suppression and collagen degradation.",
  "Berryman CE, Lieberman HR, Fulgoni VL, Pasiakos SM. Protein intake trends and conformity with the Dietary Reference Intakes in the United States. American Journal of Clinical Nutrition, 2018.",
  "Leidy HJ et al. The role of protein in weight loss and maintenance. American Journal of Clinical Nutrition, 2015.",
  "EFSA Panel on Dietetic Products, Nutrition and Allergies. Scientific Opinion on the substantiation of a health claim related to glucomannan and reduction of body weight. EFSA Journal, 2010. Claim conditions: 3 g per day in three doses of 1 g.",
  "Padayatty SJ, Levine M. Vitamin C: the known and the unknown and Goldilocks. Oral Diseases, 2016. On adrenal concentration of ascorbate.",
  "Pizzorno J. Magnesium: an underappreciated key to health. Integrative Medicine, 2015.",
  "Pullar JM, Carr AC, Vissers MCM. The roles of vitamin C in skin health. Nutrients, 2017. On ascorbate as a required cofactor for collagen hydroxylases.",
  "Institute of Medicine. Dietary Reference Intakes for Thiamin, Riboflavin, Niacin, Vitamin B6, Folate, Vitamin B12, Pantothenic Acid, Biotin, and Choline. National Academies Press, 1998.",
];

export const DISCLAIMER =
  "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease. Revitalize is a dietary supplement, not a treatment for stress or a weight loss drug. If you are pregnant, nursing, taking prescription medication or managing a health condition, speak to your doctor before starting any supplement.";
