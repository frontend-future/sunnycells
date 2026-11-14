import Link from "next/link";
import { FZ_BRAND } from "@/lib/quiz/fridayzoomiesOffer";
import { FZ_OIL_NAME } from "@/lib/quiz/fridayzoomiesOfferV2";
import { IMG } from "@/lib/quiz/fzOrder";
import { formatPrice } from "@/lib/price";
import { RATING } from "@/lib/products/dog-itch";
import { FzOtoTimer } from "./FzOtoTimer";
import s from "./fzOto.module.css";

/* One page for both the OTO1 offer and its downsell: same structure, different price and
   copy. Isolated for now. Nothing here talks to Stripe or Shopify, and no funnel page links
   here yet. ponytail: accept is a plain link to the thank you page until /api/fz/upsell exists. */
export type OtoProps = {
  step: 1 | 2;
  headline: string;
  subhead: string;
  /** Shown above the headline: the held price and how long it lasts. */
  timerLabel: string;
  intro: string;
  /** What they get, as short benefit lines under the intro. */
  gets: string[];
  /** The add-on card: its title, the regular price struck through, today's price, and the card copy. */
  offerTitle: string;
  was: number;
  price: number;
  offerBody: string;
  cta: string;
  /** The "What's next" lines under the offer. */
  next: string[];
  acceptHref: string;
  declineHref: string;
};

const STEPS = ["Cart", "Payment", "Add-on", "Done"];

export function FzOto({ step, headline, subhead, timerLabel, intro, gets, offerTitle, was, price, offerBody, cta, next, acceptHref, declineHref }: OtoProps) {
  const save = was - price;
  return (
    <div className={s.page}>
      <header className={s.header}>
        <div className={s.headerIn}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={s.logo} src={FZ_BRAND.logo?.src} alt="Friday Zoomies" />
          <p className={s.paid}><span className={s.check} aria-hidden="true">✓</span> Your order is in</p>
          <Link className={s.link} href="/quiz/itch/thanks?product=oil">View order confirmation</Link>
        </div>
      </header>

      <main className={s.main}>
        <ol className={s.track} aria-label="Checkout progress">
          {STEPS.map((label, i) => (
            <li key={label} className={i < 2 ? s.done : i === 2 ? s.now : s.todo} aria-current={i === 2 ? "step" : undefined}>
              <span className={s.dot} aria-hidden="true" />
              <span className={s.stepLabel}>{label}</span>
            </li>
          ))}
        </ol>

        <FzOtoTimer id={`oto${step}`} seconds={180} expiredHref={declineHref} label={timerLabel} />

        <h1 className={s.h1}>{headline}</h1>
        <p className={s.sub}>{subhead}</p>
        <p className={s.intro}>{intro}</p>
        <ul className={s.gets}>
          {gets.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>

        <section className={s.offer} aria-label="Add-on offer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={s.bottle} src={`${IMG}/oil-bottle.webp`} alt={FZ_OIL_NAME} />
          <div className={s.offerBody}>
            <h2 className={s.h2}>{offerTitle}</h2>
            <p className={s.priceRow}>
              <del>{formatPrice(was)}</del> <strong>{formatPrice(price)}</strong> <span className={s.save}>Save {formatPrice(save)}</span>
            </p>
            <p className={s.rating}>
              <span className={s.stars} aria-hidden="true">★★★★★</span> {RATING.score} · {RATING.count} reviews
            </p>
            <p className={s.body}>{offerBody}</p>
          </div>
          <div className={s.actions}>
            <dl className={s.rows}>
              <div><dt>Shipping</dt><dd>Free</dd></div>
            </dl>
            <Link className={s.cta} href={acceptHref}>{cta}</Link>
            <Link className={s.decline} href={declineHref}>Decline this offer</Link>
          </div>
        </section>

        <section className={s.block}>
          <h2 className={s.h2c}>Why this can help</h2>
          <p className={s.center}>
            Omega-3s work best when they&apos;re given every day over time. Relief builds over the first 90 days of steady
            EPA and DHA, <strong>so the full 90 days matters more than any single week.</strong>
          </p>
        </section>

        <section className={s.block}>
          <h2 className={s.h2c}>Day 1 to Day 90</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={s.hero} src="/quiz/fridayzoomies/pdp-v2/day-1-day-90.webp" alt="Day 1 and Day 90 on Pure Omega Salmon Oil" />
        </section>

        <section className={s.block}>
          <h2 className={s.h2c}>What&apos;s next?</h2>
          {next.map((line) => (
            <p key={line} className={s.center}>{line}</p>
          ))}
        </section>

        <section className={s.promise}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/quiz/fridayzoomies/checkout/badge-90.webp" alt="" />
          <h2 className={s.promiseH}>The 90-day promise</h2>
          <p>
            This add-on is risk free and covered by our 90-Day Itch-Free Guarantee. Email{" "}
            <a href="mailto:support@fridayzoomies.com">support@fridayzoomies.com</a> and we&apos;ll take care of you.
          </p>
        </section>

      </main>
    </div>
  );
}
