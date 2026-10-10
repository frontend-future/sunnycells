import { RATING } from "@/lib/products/dog-itch";
import { formatPrice } from "@/lib/price";
import { FZ_BRAND } from "@/lib/quiz/fridayzoomiesOffer";
import { FIRST, LINES, PRICE } from "@/lib/quiz/fzOrder";
import s from "./thanks.module.css";

const STEPS = [
  { when: "Within 24 hours", title: "A text from our team", body: "Look out for a text from us. Reply to it and we will send you a freebie." },
  { when: "Within 48 hours", title: "Your order ships", body: "Your Inside-Out Itch Bundle and free gifts leave our warehouse." },
  { when: "Within 5 business days of shipping", title: "It arrives", body: "Free shipping to your door, with the Itch Spray, bandana and mystery gift in the box." },
];

export default function ThanksPage() {
  return (
    <div className={s.page}>
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
              <div className={s.lineName}>{l.name}{l.sub ? <span className={s.sub}>{l.sub}</span> : null}</div>
              <div className={s.price}>{l.now ? <><del>{l.price}</del> {l.now}</> : <span className={s.free}>FREE</span>}</div>
            </div>
          ))}
          <p className={s.note}>
            {formatPrice(FIRST)} today, then {formatPrice(PRICE)} every 4 weeks. Cancel anytime before your next billing date
            by emailing <a href="mailto:support@fridayzoomies.com">support@fridayzoomies.com</a>.
          </p>
        </section>

        <section className={s.guarantee}>
          <strong>90-day money back guarantee.</strong> Itching not improved? Full refund. {RATING.count} dog owners have rated us {RATING.score} stars.
        </section>
      </main>
    </div>
  );
}
