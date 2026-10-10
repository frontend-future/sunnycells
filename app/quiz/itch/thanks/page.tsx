import { FZ_BRAND } from "@/lib/quiz/fridayzoomiesOffer";
import { LINES } from "@/lib/quiz/fzOrder";
import { Confetti } from "./Confetti";
import { PurchaseTracker } from "./PurchaseTracker";
import s from "./thanks.module.css";

const STEPS = [
  { when: "Within 24 hours", title: "A text from our team", body: "Look out for a text from us. Reply to it and we will send you a freebie." },
  { when: "Within 48 hours", title: "Your order ships", body: "Your Inside-Out Itch Bundle and free gifts leave our warehouse." },
  { when: "Within 5 business days of shipping", title: "It arrives", body: "Free shipping to your door, with the Itch Spray, bandana and mystery gift in the box." },
];

export default function ThanksPage() {
  return (
    <div className={s.page}>
      <Confetti />
      <PurchaseTracker />
      <header className={s.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={s.logo} src={FZ_BRAND.logo?.src} alt="Friday Zoomies" />
      </header>

      <main className={s.main}>
        <h1 className={s.h1}>Thank you, your order is in</h1>
        <p className={s.lead}>Here is what happens next.</p>

        <ol className={s.steps}>
          {STEPS.map((st, i) => (
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
          {LINES.map((l) => (
            <div className={s.line} key={l.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.image} alt="" />
              <div className={s.lineName}>{l.name}</div>
              <div className={s.price}>{l.now ? <><del>{l.price}</del> {l.now}</> : <span className={s.free}>FREE</span>}</div>
            </div>
          ))}
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
