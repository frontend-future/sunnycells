import type { Metadata } from "next";
import { FZ_BRAND } from "@/lib/quiz/fridayzoomiesOffer";
import { IMG, LINES, OIL_LINES } from "@/lib/quiz/fzOrder";
import { OIL_PLANS, OIL_RECUR, OIL_SHIPPING, isOilPlan } from "@/lib/quiz/fzPlans";
import { Confetti } from "./Confetti";
import { First90 } from "./First90";
import { PurchaseTracker } from "./PurchaseTracker";
import s from "./thanks.module.css";

/* A thank you page is for the buyer, not for search. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

const STEPS = [
  { when: "Within 24 hours", title: "We start preparing your order", body: "Our team picks and packs your Inside-Out Itch Bundle and free gifts." },
  { when: "Within 48 hours", title: "Your order ships", body: "Your Inside-Out Itch Bundle and free gifts leave our warehouse." },
  { when: "Within 5 business days of shipping", title: "It arrives", body: "Free shipping to your door, with the Itch Spray, bandana and mystery gift in the box." },
];

/* ?product=oil comes from the Pure Omega Salmon Oil checkout: just the oil, no gifts. */
const money = (n: number) => `$${n.toFixed(2)}`;

/* ?plan= comes from the v3 checkout: what they bought, at the price they paid, with the cents. The struck price is
   the one time price, the same one the plans page strikes. */
export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ product?: string; plan?: string }> }) {
  const sp = await searchParams;
  const oil = sp.product === "oil";
  const plan = oil && isOilPlan(sp.plan) ? sp.plan : null;
  const P = plan ? OIL_PLANS[plan] : null;
  const was = OIL_PLANS.once.entry;
  const lines: typeof LINES = P
    ? [
        {
          name: plan === "once" ? "Pure Omega Salmon Oil (1 Bottle)" : `Pure Omega Salmon Oil (${P.label}, ${P.bottles} ${P.bottles === 1 ? "Bottle" : "Bottles"})`,
          image: `${IMG}/oil-bottle.webp`,
          ...(plan === "once" ? { now: money(P.entry) } : { price: money(P.bottles * was), now: money(P.entry) }),
        },
        ...(plan === "once" ? [{ name: "Shipping", image: `${IMG}/gift-shipping.webp`, now: money(OIL_SHIPPING) }] : []),
      ]
    : oil ? OIL_LINES : LINES;
  const steps = oil
    ? STEPS.map((st, i) => i === 0 ? { ...st, body: "Our team picks and packs your Pure Omega Salmon Oil." } : i === 1 ? { ...st, body: "Your Pure Omega Salmon Oil leaves our warehouse." } : i === 2 ? { ...st, body: plan === "once" ? "To your door." : "Free shipping to your door." } : st)
    : STEPS;
  return (
    <div className={s.page}>
      <Confetti />
      <PurchaseTracker oil={oil} />
      <header className={s.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={s.logo} src={FZ_BRAND.logo?.src} alt="Friday Zoomies" />
      </header>

      <main className={s.main}>
        <h1 className={s.h1}>Thank you, your order is in</h1>
        <p className={s.lead}>Here is what happens next.</p>

        {oil && <First90 />}

        <ol className={s.steps}>
          {steps.map((st, i) => (
            <li key={st.title} className={s.step}>
              <span className={s.num} aria-hidden="true">{i + 1}</span>
              <div>
                <p className={s.when}>{st.when}</p>
                <h2 className={s.h2}>{st.title}</h2>
                <p className={s.body}>{st.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <section className={s.card} aria-label="Your order">
          <h2 className={s.h2}>What you are getting</h2>
          {lines.map((l) => (
            <div className={s.line} key={l.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.image} alt="" />
              <div className={s.lineName}>{l.name}</div>
              <div className={s.price}>{l.now ? <>{l.price ? <del>{l.price}</del> : null} {l.now}</> : <span className={s.free}>FREE</span>}</div>
            </div>
          ))}
          {P && plan !== "once" ? (
            <p className={s.body}>
              Then {money(OIL_RECUR)} every 4 weeks, starting {P.days} days from today. Skip or cancel anytime.
            </p>
          ) : null}
        </section>

        <section className={s.guarantee}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/quiz/fridayzoomies/checkout/badge-90.webp" alt="" />
          <div>
            <h2 className={s.h2}>90-Day Itch-Free Guarantee</h2>
            <p className={s.body}>
              Not seeing results after 90 days? Contact us at <a href="mailto:support@fridayzoomies.com">support@fridayzoomies.com</a> and
              we&apos;ll take care of you.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
