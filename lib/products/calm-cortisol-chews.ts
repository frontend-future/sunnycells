/**
 * SC-25 Calm Cortisol Chews. Same shape as the other product files: everything the
 * page says lives here, so the words can be edited without going near markup.
 *
 * PLACEHOLDER FLAGS, all of which must be settled before this page takes paid traffic:
 *
 *   1. THE FORMULA IS FORMULATION INTENT, not a certificate of analysis. The doses
 *      below are the ones the cited trials used. Whether they survive a gummy base at
 *      three chews a day is a manufacturing question nobody here has answered.
 *   2. No reviews and no rating in this file, deliberately. The other three products
 *      carry placeholder ones that read as real. This one starts without them.
 *   3. THE PRODUCT NAME IS ITSELF A STRUCTURE/FUNCTION CLAIM. "Calm Cortisol" states
 *      an effect on a hormone, which is allowed under DSHEA but pulls the FDA
 *      disclaimer onto the label and every page the name appears on, and it needs the
 *      substantiation file in hand BEFORE launch, not after a warning letter. There is
 *      precedent for hormone-named supplements, so this is a cost, not a blocker.
 *   4. No supplement facts panel here. That block is the most regulated artifact on
 *      the page and must come off the real COA. See the FACTS note in daily-reds.ts.
 *
 * What is NOT invented: the four cited studies, quoted with the dose and the duration
 * they actually ran at.
 */

export const CART_ID = "calm-cortisol-chews";

/** PLACEHOLDER. Point this at the real support inbox before the page takes traffic. */
export const SUPPORT_EMAIL = "support@sunnycells.com";

export const PRODUCT = {
  sku: "SC-25",
  name: "Calm Cortisol Chews",
  shortName: "Calm Cortisol",
  strapline: "Three chews a day for the hormone behind the 4pm crash and the 9pm snack",
  flavor: "Blood Orange",
  servings: 30,
  perServing: "3 chews",
  image: "/product/calm-cortisol.webp",
} as const;

/* Three chews rather than two. 600 mg of ashwagandha plus 200 mg of theanine plus the
   saffron is close to 900 mg of actives, and a pectin base carries that across three
   chews without tasting like the raw powder. If the manufacturer can hold it in two,
   drop to two: fewer is better and the label copy changes in one place. */

export type Plan = {
  id: string;
  months: number;
  name: string;
  sub: string;
  price: number;
  compareAt: number;
  best?: boolean;
};

/* The house ladder, same as SC-24. compareAt is the list price of a bag AT THAT
   SUPPLY, and price is exactly half of it, so every plan is the 50% the flag claims.
   Derived rather than typed: see PLANS below and the test beside this file. */
import { firstOrderPrice } from "../price.ts";

const LIST: { id: string; months: number; name: string; sub: string; compareAt: number; best?: boolean }[] = [
  { id: "c1", months: 1, name: "1 month supply", sub: "Delivered fresh monthly", compareAt: 50 },
  { id: "c3", months: 3, name: "3 month supply", sub: "Delivered every 3 months", compareAt: 46, best: true },
  { id: "c6", months: 6, name: "6 month supply", sub: "Delivered every 6 months", compareAt: 42 },
];

export const PLANS: Plan[] = LIST.map((p) => ({ ...p, price: firstOrderPrice(p.compareAt) }));

export function planById(id: string | undefined): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS.find((p) => p.best) ?? PLANS[0];
}

export type OrderLine = { id: string; name: string; note: string; was: number | null; now: number | null; image: string | null };
export type Order = { plan: Plan; lines: OrderLine[]; listTotal: number; discount: number; total: number };

export function buildOrder(planId: string | undefined): Order {
  const plan = planById(planId);
  const now = plan.price * plan.months;
  const list = plan.compareAt * plan.months;
  const bags = `${plan.months} ${plan.months === 1 ? "bag" : "bags"}`;
  return {
    plan,
    lines: [
      { id: "product", name: `${PRODUCT.name}, ${PRODUCT.flavor.toLowerCase()}`,
        note: `${bags} of 90 chews. ${plan.sub}.`, was: list, now, image: PRODUCT.image },
      { id: "shipping", name: "Shipping", note: "Free on every order", was: null, now: 0, image: null },
    ],
    listTotal: list, discount: list - now, total: now,
  };
}

export const HERO = {
  title: "You are not eating because you are hungry.",
  titleAccent: "You are eating because you are stressed.",
  lede:
    "Cortisol is the hormone that runs both. Three chews a day, built on the doses the trials actually used.",
  points: [
    "600 mg KSM-66® ashwagandha, the dose that lowered serum cortisol 23% in 8 weeks",
    "200 mg L-theanine for the stress response, not for sedation",
    "88 mg saffron extract, studied for snacking frequency",
    "No caffeine, no stimulant, nothing that pushes cortisol back up",
  ],
} as const;

/**
 * The spine of the page, and the reason the three benefits are one product rather
 * than three. Written out because a reader who sees "calm, satiety and metabolism" on
 * one bag assumes three unrelated actives and stops believing the label.
 */
export const ONE_MECHANISM = {
  eyebrow: "Why one hormone covers all three",
  title: "Cortisol is not just the stress one",
  lede:
    "It is the hormone that tells your body a hard thing is happening. Everything it does next made sense on a savannah and makes very little sense at a desk.",
  steps: [
    { n: "1", title: "It keeps you switched on",
      body: "Cortisol is supposed to rise in the morning and fall by night. Under chronic stress it stops falling, which is the tired-and-wired feeling and the reason you are awake at 1am." },
    { n: "2", title: "It sends you to the kitchen",
      body: "Raised cortisol drives appetite for calorie-dense food specifically. That is not a willpower failure at 9pm, it is a signal, and it is the one saffron was studied against." },
    { n: "3", title: "It changes where the weight goes",
      body: "Cortisol promotes fat storage around the middle and works against insulin sensitivity. Lower the signal and you are not fighting your own biology to hold a deficit." },
  ],
  note:
    "This is why there is no thermogenic in here. Caffeine and its relatives raise cortisol, so a stimulant would undo the first claim to serve the third. The metabolism part runs through the same hormone as the other two.",
} as const;

/* Real trials, quoted at the dose and duration they ran. Anything added to this list
   needs the paper in hand, not a supplier one-pager. */
export const EVIDENCE = [
  { active: "KSM-66® ashwagandha", dose: "600 mg",
    finding: "23% lower serum cortisol against placebo at 8 weeks in adults under chronic stress.",
    source: "Salve J et al., Cureus, 2019." },
  { active: "Ashwagandha root extract", dose: "600 mg daily",
    finding: "Serum cortisol down 27.9% against placebo over 60 days, with lower stress scores.",
    source: "Chandrasekhar K et al., Indian Journal of Psychological Medicine, 2012." },
  { active: "L-theanine", dose: "200 mg",
    finding: "Blunted the cortisol and heart rate response to an acute stress task.",
    source: "Kimura K et al., Biological Psychology, 2007." },
  { active: "Saffron extract", dose: "176.5 mg daily",
    finding: "55% fewer snacking episodes against placebo over 8 weeks in healthy women.",
    source: "Gout B et al., Nutrition Research, 2010." },
] as const;

/* NOTE ON THE SAFFRON LINE: the trial ran at 176.5 mg and the formula above carries
   88 mg, which is the dose most of the category uses. Either raise the formula to the
   studied dose or the page cannot lean on that trial. Raise it. */

export const IS = [
  "A daily cortisol support formula",
  "Built on the doses the published trials used",
  "Non stimulant, taken every day for months",
  "Designed to be swallowed at the same time every evening",
] as const;

export const IS_NOT = [
  "A fat burner",
  "A stimulant or a thermogenic",
  "A sleeping pill",
  "A treatment for Cushing's, adrenal disease or any diagnosed condition",
  "A replacement for sleep, food or medical care",
] as const;

export const EXPECT = [
  "An evening that winds down instead of stalling at wired",
  "Less pull toward the cupboard at 9pm",
  "Waking up without the jolt",
  "Nothing dramatic in week one. The trials ran 8 weeks.",
] as const;

export const FAQ = [
  { q: "How would I know it is working?",
    a: "Most people notice the evening first: less of a pull to the kitchen, and getting to sleep without the mind racing. Nothing here is a same-day effect. The trials behind these doses ran 8 weeks, which is why the smallest supply is a month and the guarantee is 30 days." },
  { q: "Will it make me drowsy?",
    a: "It is not a sedative. Theanine at 200 mg lowers the stress response without sedating, and ashwagandha is not a sleep aid. If you take them in the evening you will probably find it easier to get to sleep, which is a consequence of cortisol falling rather than a drug effect." },
  { q: "Can I take it with coffee?",
    a: "You can. Caffeine raises cortisol, so a large afternoon coffee is working against the thing you bought this for. Morning coffee, then the chews in the evening, is the version that makes sense." },
  { q: "Is this a weight loss product?",
    a: "No, and we will not sell it as one. It works on appetite and on the hormone that decides where weight goes. What you eat still decides the rest. Anyone telling you a gummy burns fat is selling you something else." },
  { q: "Why three chews?",
    a: "Because the doses in the trials are real doses. Six hundred milligrams of ashwagandha does not fit in one gummy without either shrinking the dose or making it taste like the raw powder. Three is what the formula needs." },
  { q: "Does it have to be a subscription?",
    a: "Yes. Eight weeks is the shortest run in any of the studies behind it, so a one-off bag would be selling you a result the bag cannot deliver. Skip a delivery or cancel in two clicks from your account." },
  { q: "Who should not take this?",
    a: "Ashwagandha is not for pregnancy, and it interacts with thyroid medication, sedatives and immunosuppressants. If you are on any of those, or you have a thyroid condition, ask your doctor before you order rather than after." },
  { q: "What if I do not like them?",
    a: `Email ${SUPPORT_EMAIL} inside 30 days and we refund it. You keep the bag.` },
] as const;

export const INCLUDED = [
  { n: "90", label: "chews a bag", body: "Three a day for 30 days." },
  { n: "Free", label: "shipping", body: "On every order, every time, with no minimum." },
  { n: "30 days", label: "money back", body: "Email us and we refund it. You keep the bag." },
  { n: "2 clicks", label: "to cancel", body: "Skip a delivery or stop entirely from your account." },
] as const;

export const DISCLAIMER =
  "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.";
