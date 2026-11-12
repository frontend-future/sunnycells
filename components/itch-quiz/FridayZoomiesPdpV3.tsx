"use client";

import Image from "next/image";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { FridayZoomiesLabelDrawerV2 } from "@/components/itch-quiz/FridayZoomiesLabelDrawerV2";
import { RATING } from "@/lib/products/dog-itch";
import { FZ_OIL_NAME } from "@/lib/quiz/fridayzoomiesOfferV2";
import { FIRST, PRICE } from "@/lib/quiz/fzOrder";
import { pumpsPerDay } from "@/lib/quiz/itchAssessment";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { useAnswers } from "@/lib/quiz/store";
import styles from "./fz-pdp-v3.module.css";

const DIR = "/quiz/fridayzoomies";

const IMAGES = [
  { src: `${DIR}/pdp-v2/guarantee.webp`, alt: "Save 50% plus free shipping on the Friday Zoomies salmon oil, backed by a 90-day Friday Zoomies Guarantee" },
  { src: `${DIR}/pdp-v2/day-1-day-90.webp`, alt: "Day 1 raw and red paw next to a day 90 soft and shiny paw, with the salmon oil bottle between them" },
  { src: `${DIR}/pdp-v2/targeted-relief.webp`, alt: "Gentle, targeted relief in every pump: salmon oil, DHA and EPA, and mixed tocopherols" },
  { src: `${DIR}/pdp-v2/reviews.webp`, alt: "Three dog parent reviews and a 4.8 out of 5 rating from 662 reviews" },
  { src: `${DIR}/pdp-v2/vet-quote.webp`, alt: "Dr. Marcus Reed, DVM: salmon oil gives your dog EPA and DHA, the omega-3s skin cells use to settle their inflammatory response" },
  { src: `${DIR}/pdp-v2/never-just-an-itch.webp`, alt: "It's never just an itch: obsessive paw licking, head shaking, 3AM scratching, raw red patches and stiff slow mornings" },
  { src: `${DIR}/pdp-v2/only-the-best.webp`, alt: "Only the best for your dog: based in the USA, 100% natural, no chicken or beef, just 2 ingredients, with a 90-day guarantee" },
  { src: `${DIR}/pdp-v2/how-much.webp`, alt: "How much do they need: 1 pump daily up to 40 lbs, 2 pumps daily over 40 lbs" },
];

const TRUST = [
  { label: "Vet-formulated", src: `${DIR}/trust-vet.webp` },
  { label: "Third-party tested", src: `${DIR}/trust-tested.webp` },
  { label: "Based in the USA", src: `${DIR}/trust-usa.webp` },
];

/* The quiz's four size answers as the buttons in the buy column, each carrying the string the quiz stores. */
const WEIGHTS = [
  { label: "Under 20 lbs", value: "Small (under 20 lbs)" },
  { label: "20–50 lbs", value: "Medium (20-50 lbs)" },
  { label: "50–90 lbs", value: "Large (50-90 lbs)" },
  { label: "90+ lbs", value: "Extra large (90+ lbs)" },
];

/* The first order spread over its 28 days. */
const PER_DAY = (FIRST / 28).toFixed(2);

/* Hours, minutes and seconds left in the shopper's own day, so it is always under 24 hours. Null until
   mounted, since the server's clock is not the shopper's. */
function useEndOfDay() {
  const [left, setLeft] = useState<[number, number, number] | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(24, 0, 0, 0);
      const s = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
      setLeft([Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60]);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

/** One product, so no tabs: the two ingredients with what each does. */
function Ingredients() {
  return (
    <>
      <p style={{ fontSize: "0.85em" }}>Per pump (1 mL).</p>
      <p>
        <strong>Salmon oil (99.8%).</strong> A source of omega-3s (EPA and DHA, about 20% of the oil) that supports the skin barrier and a healthy inflammatory response, for less dry, itchy skin and a shinier coat. 100% natural, nothing artificial.
      </p>
      <p>
        <strong>Mixed tocopherols (0.2%).</strong> Natural vitamin E that keeps the oil fresh.
      </p>
    </>
  );
}

/**
 * The plans page's product block, laid out like Wuffes' above the fold: an offer banner,
 * the gallery beside the buy column, then the weight buttons, the one plan card, the button
 * and the guarantee panel. The detail accordions follow.
 *
 * The weight buttons start on the quiz answer. Picking another only changes the dose line,
 * since every size is the same price and plan.
 */
export function FridayZoomiesPdpV3({ onStart }: { onStart: () => Promise<boolean> | void }) {
  const { answers, ready } = useAnswers(itchFridayZoomiesQuiz.id);
  const quizSize = WEIGHTS.find((w) => answers["dog-size"]?.replace(/[–]/g, "-") === w.value)?.value;
  const [picked, setPicked] = useState<string | null>(null);
  const weight = picked ?? quizSize ?? null;
  const [at, setAt] = useState(0);
  const touchX = useRef<number | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [labelOpen, setLabelOpen] = useState(false);
  const closeLabel = useCallback(() => setLabelOpen(false), []);
  const left = useEndOfDay();
  const step = (d: number) => setAt((n) => (n + d + IMAGES.length) % IMAGES.length);

  const start = async () => {
    if (busy) return;
    setBusy(true);
    const ok = await onStart();
    /* A resolved false is a failed checkout, so let them tap again. Anything else is
       a redirect already under way, so the button stays down. */
    if (ok === false) setBusy(false);
  };

  const sections = [
    {
      id: "why",
      title: "Why it works",
      body: (
        <>
          <p>Itching has two problems: dry, irritated skin on the surface, and the inflammation underneath that keeps it going.</p>
          <p>{FZ_OIL_NAME} gives your dog the omega-3s EPA and DHA from 100% natural salmon oil. They support the skin barrier and a healthy inflammatory response from the inside, which is what keeps the itch from coming back.</p>
        </>
      ),
    },
    {
      id: "ingredients",
      title: "Ingredients",
      body: <Ingredients />,
    },
    {
      id: "use",
      title: "How to use",
      body: (
        <>
          <p>Pump it over their food once a day:</p>
          <ul>
            <li>Up to 40 lbs: 1 pump (1 mL)</li>
            <li>Over 40 lbs: 2 pumps (2 mL)</li>
          </ul>
          <p>Give half for the first week, then the full amount.</p>
          <p>Most dogs scratch less by week two. Skin and coat take longer, so give it six to eight weeks of daily oil before you judge it.</p>
        </>
      ),
    },
    {
      id: "shipping",
      title: "Shipping & membership",
      body: (
        <>
          <p>
            Free shipping on your first order. Your {FZ_OIL_NAME} ships every 4 weeks, and you can skip or cancel anytime. Questions? Email{" "}
            <a href="mailto:support@fridayzoomies.com">support@fridayzoomies.com</a>.
          </p>
        </>
      ),
    },
    {
      id: "guarantee",
      title: "Our 90-day Guarantee",
      body: (
        <p>
          Try the oil for 90 days. If your dog&apos;s itching hasn&apos;t improved, email{" "}
          <a href="mailto:support@fridayzoomies.com">support@fridayzoomies.com</a> and we&apos;ll refund your order.
        </p>
      ),
    },
  ];

  return (
    <section id="plans" className={styles.pdp}>
      <div className={styles.banner} role="region" aria-label="Offer countdown">
        <div className={styles.bannerIn}>
          <div className={styles.bannerCopy}>
            <p className={styles.bannerLead}>Friday Zoomies Sale</p>
            <p className={styles.bannerSub}>Save 50% + Free Shipping</p>
          </div>
          <div className={styles.pill} aria-live="off">
            {(["HRS", "MIN", "SEC"] as const).map((unit, i) => (
              <Fragment key={unit}>
                {i > 0 ? <span className={styles.sep} aria-hidden="true">:</span> : null}
                <span className={styles.unit}>
                  <span className={styles.num}>{left ? String(left[i]).padStart(2, "0") : "--"}</span>
                  <span className={styles.lbl}>{unit}</span>
                </span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.thumbs}>
          {IMAGES.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`Show image ${i + 1}`}
              aria-current={i === at}
              className={`${styles.thumb} ${i === at ? styles.thumbOn : ""}`}
              onClick={() => setAt(i)}
            >
              <Image src={img.src} alt="" width={160} height={160} />
            </button>
          ))}
        </div>

        <div
          className={styles.main}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            /* A horizontal drag of 40px or more steps one image; shorter ones are taps or scrolls. */
            if (Math.abs(dx) >= 40) step(dx < 0 ? 1 : -1);
          }}
        >
          <Image key={IMAGES[at].src} src={IMAGES[at].src} alt={IMAGES[at].alt} width={900} height={900} priority={at === 0} sizes="(min-width: 960px) 560px, 92vw" />
          <button type="button" className={`${styles.arrow} ${styles.arrowL}`} aria-label="Previous image" onClick={() => step(-1)}>
            <Icon name="chevron-left" size={22} strokeWidth={2.5} />
          </button>
          <button type="button" className={`${styles.arrow} ${styles.arrowR}`} aria-label="Next image" onClick={() => step(1)}>
            <Icon name="chevron-right" size={22} strokeWidth={2.5} />
          </button>
        </div>
        <button type="button" className={styles.label} onClick={() => setLabelOpen(true)}>
          View Nutrition Label
        </button>

        <div className={styles.buy}>
          <h1 className={styles.title}>Less itching and a shinier coat</h1>
          <div className={styles.rating}>
            <span className={styles.stars} aria-hidden="true">★★★★★</span>
            <span>Excellent <strong>{RATING.score}</strong> | {RATING.count} Reviews</span>
          </div>
          <p className={styles.lede}>
            Friday Zoomies Pure Omega Salmon Oil is 100% natural salmon oil with the omega-3s EPA and DHA. It supports your dog&apos;s skin barrier and a healthy inflammatory response, easing the scratch-itch cycle for dogs with dry, irritated skin.
          </p>

          <h2 className={styles.h}>Select your dog&apos;s weight</h2>
          <div className={styles.weights} role="radiogroup" aria-label="Your dog's weight">
            {WEIGHTS.map((w) => (
              <button
                key={w.value}
                type="button"
                role="radio"
                aria-checked={weight === w.value}
                className={`${styles.weight} ${weight === w.value ? styles.weightOn : ""}`}
                onClick={() => setPicked(w.value)}
              >
                {w.label}
              </button>
            ))}
          </div>
          {ready && weight ? (
            <p className={styles.dose}>
              {pumpsPerDay({ "dog-size": weight }) === 2 ? "2 pumps" : "1 pump"} a day over their food
            </p>
          ) : null}

          <h2 className={styles.h}>Choose your plan:</h2>
          <p className={styles.ship}>
            <Icon name="truck" size={18} />
            Free shipping on your first order. Straight from our USA warehouse.
          </p>

          <div className={styles.plan}>
            <div className={styles.planTag}>Vet-recommended ingredients</div>
            <div className={styles.planBody}>
              <div className={styles.planTop}>
                <span className={styles.radio} aria-hidden="true" />
                <span className={styles.planName}>1 Month Supply, Every 4 Weeks</span>
                <span className={styles.planDay}>${PER_DAY} / day</span>
              </div>
              <div className={styles.planSave}>
                <span>Save 50% + Free Shipping</span>
              </div>
              <p className={styles.incl}>Includes:</p>
              <ul className={styles.inclList}>
                <li>
                  <span className={styles.tick} aria-hidden="true">✓</span>
                  <span>1 month supply of {FZ_OIL_NAME}</span>
                  <span className={styles.inclPrice}><del>${PRICE}</del> <strong>${FIRST}</strong></span>
                </li>
                <li>
                  <span className={styles.tick} aria-hidden="true">✓</span>
                  <span>Free shipping on your first order</span>
                  <span className={styles.inclPrice}><strong>FREE</strong></span>
                </li>
                <li>
                  <span className={styles.tick} aria-hidden="true">✓</span>
                  <span>90-Day Friday Zoomies Guarantee</span>
                </li>
              </ul>
              <div className={styles.planFoot}>
                <span><Icon name="x" size={14} strokeWidth={2.5} /> <u>No commitment</u></span>
                <span><Icon name="chevron-right" size={14} strokeWidth={2.5} /> <u>Skip or cancel anytime</u></span>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            fullWidth
            onClick={start}
            disabled={busy}
            style={{
              fontSize: "clamp(18px, 5.2vw, 22px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "0.01em",
              minHeight: 64,
              paddingBlock: 12,
              textTransform: "uppercase",
              boxShadow: "0 10px 24px rgba(47, 95, 208, 0.4), 0 4px 0 var(--cobalt-press)",
            }}
          >
            Try risk free | ${FIRST} <del style={{ opacity: 0.75, marginLeft: 8 }}>${PRICE}</del>
          </Button>

          <div className={styles.guar}>
            <div>
              <h2 className={styles.guarH}>90-day money back guarantee</h2>
              <p>
                Omega-3s work best when your dog gets them every day. <strong>Daily use for 90 days is why we back it with a 90-day money back guarantee.</strong> If the itching hasn&apos;t improved, email support@fridayzoomies.com and we&apos;ll refund your order.
              </p>
            </div>
            <Image className={styles.guarImg} src={`${DIR}/oil-bottle.webp`} alt={FZ_OIL_NAME} width={240} height={240} />
          </div>

          <ul className={styles.trust}>
            {TRUST.map((t) => (
              <li key={t.label}>
                <Image className={styles.trustDot} src={t.src} alt="" width={96} height={96} />
                {t.label}
              </li>
            ))}
          </ul>

          <div className={styles.acc}>
            {sections.map((s) => (
              <div key={s.id}>
                <button
                  type="button"
                  className={styles.accBtn}
                  aria-expanded={open === s.id}
                  aria-controls={`pdp-${s.id}`}
                  onClick={() => setOpen(open === s.id ? null : s.id)}
                >
                  {s.title}
                  <Icon name={open === s.id ? "minus" : "plus"} size={20} />
                </button>
                {open === s.id ? (
                  <div id={`pdp-${s.id}`} className={styles.accBody}>
                    {s.body}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
      {labelOpen ? <FridayZoomiesLabelDrawerV2 onClose={closeLabel} /> : null}
    </section>
  );
}
