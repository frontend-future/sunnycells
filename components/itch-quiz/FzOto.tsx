import Link from "next/link";
import { FZ_BRAND } from "@/lib/quiz/fridayzoomiesOffer";
import { FZ_OIL_NAME } from "@/lib/quiz/fridayzoomiesOfferV2";
import { IMG, PRICE } from "@/lib/quiz/fzOrder";
import { formatPrice } from "@/lib/price";
import { RATING } from "@/lib/products/dog-itch";
import s from "./fzOto.module.css";

/* One page for both the OTO1 offer and its downsell: same structure, different price and
   copy. Isolated for now. Nothing here talks to Stripe or Shopify, and no funnel page links
   here yet. ponytail: accept is a plain link to the thank you page until /api/fz/upsell exists. */
export type OtoProps = {
  step: 1 | 2;
  headline: string;
  subhead: string;
  intro: string;
  price: number;
  acceptHref: string;
  declineHref: string;
  whatsNext: string[];
};

const STEPS = ["Cart", "Payment", "Add-on", "Done"];

export function FzOto({ step, headline, subhead, intro, price, acceptHref, declineHref, whatsNext }: OtoProps) {
  const save = PRICE - price;
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

        <h1 className={s.h1}>{headline}</h1>
        <p className={s.sub}>{subhead}</p>
        <p className={s.intro}>{intro}</p>

        <section className={s.offer} aria-label="Add-on offer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={s.bottle} src={`${IMG}/oil-bottle.webp`} alt={FZ_OIL_NAME} />
          <div className={s.offerBody}>
            <h2 className={s.h2}>Add on: a backup bottle</h2>
            <p className={s.priceRow}>
              <del>{formatPrice(PRICE)}</del> <strong>{formatPrice(price)}</strong> <span className={s.save}>Save {formatPrice(save)}</span>
            </p>
            <p className={s.rating}>
              <span className={s.stars} aria-hidden="true">★★★★★</span> {RATING.score} · {RATING.count} reviews
            </p>
            <p className={s.body}>A second bottle of {FZ_OIL_NAME}, added to this order. This is a one-time payment, not a subscription.</p>
            <dl className={s.rows}>
              <div><dt>Shipping</dt><dd>Free</dd></div>
            </dl>
            <Link className={s.cta} href={acceptHref}>Add a backup bottle for {formatPrice(price)}</Link>
            <Link className={s.decline} href={declineHref}>Decline this offer</Link>
          </div>
        </section>

        <section className={s.block}>
          <h2 className={s.h2c}>Why this can help</h2>
          <p className={s.center}>
            Salmon oil works best given every day, and relief builds over the first 90 days. A second bottle means a late
            delivery or a weekend away never leaves a gap in the routine.
          </p>
        </section>

        <section className={s.block}>
          <h2 className={s.h2c}>Good to know</h2>
          <p className={s.center}><strong>The dose does not change.</strong> Up to 40 lbs is 1 pump a day, over 40 lbs is 2 pumps. Give half for the first week.</p>
          <p className={s.center}>Keep it somewhere cool and dark with the pump closed. Check with your vet before giving more than the label says.</p>
        </section>

        <section className={s.block}>
          <h2 className={s.h2c}>The first 90 days</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={s.hero} src="/quiz/fridayzoomies/pdp-v2/day-1-day-90.webp" alt="Day 1 and Day 90 of the first 90 days on Pure Omega Salmon Oil" />
        </section>

        <section className={s.block}>
          <h2 className={s.h2c}>What happens next</h2>
          {whatsNext.map((t) => <p className={s.center} key={t}>{t}</p>)}
        </section>

        <section className={s.promise}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/quiz/fridayzoomies/checkout/badge-90.webp" alt="" />
          <h2 className={s.promiseH}>The 90-day promise</h2>
          <p>
            Your backup bottle is covered by our 90-Day Itch-Free Guarantee. Email{" "}
            <a href="mailto:support@fridayzoomies.com">support@fridayzoomies.com</a> and we&apos;ll take care of you.
          </p>
        </section>

        <p className={s.confirm}>Your order is confirmed. Adding a bottle does not change your subscription.{step === 2 ? " This is the last offer." : ""}</p>
      </main>
    </div>
  );
}
