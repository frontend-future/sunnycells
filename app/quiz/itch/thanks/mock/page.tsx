import type { Metadata } from "next";
import QRCode from "qrcode";
import { FZ_BRAND } from "@/lib/quiz/fridayzoomiesOffer";
import { LINES } from "@/lib/quiz/fzOrder";
import { Confetti } from "../Confetti";
import s from "../thanks.module.css";
import m from "./mock.module.css";
import { OliverCover, OliverTop } from "./OliverThread";

/* A working draft of the thank you page, not linked from anywhere. The live page at
   /quiz/itch/thanks is untouched. Left out on purpose: PurchaseTracker, so opening this
   page never reports a Purchase to Meta. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

const STEPS = [
  { when: "Within 48 hours", title: "Your order ships", body: "Your Inside-Out Itch Bundle and free gifts leave our warehouse." },
  { when: "Within 5 business days of shipping", title: "It arrives", body: "Free shipping to your door, with the Itch Spray, bandana and mystery gift in the box." },
];

export default async function ThanksMockPage() {
  const qr = await QRCode.toDataURL("sms:+12147736688", { margin: 1, width: 340, color: { dark: "#14213D", light: "#FFFFFF" } });

  return (
    <div className={s.page}>
      <Confetti />
      <header className={s.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={s.logo} src={FZ_BRAND.logo?.src} alt="Friday Zoomies" />
      </header>

      <OliverTop qr={qr} />

      <main className={m.after}>
        <OliverCover />

        <h2 className={s.h2} style={{ marginTop: 32 }}>What happens next</h2>
        <ol className={s.steps}>
          {STEPS.map((st, i) => (
            <li key={st.title} className={s.step}>
              <span className={s.num} aria-hidden="true">{i + 1}</span>
              <div>
                <p className={s.when}>{st.when}</p>
                <h3 className={s.h2}>{st.title}</h3>
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
