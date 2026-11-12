"use client";

import Image from "next/image";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { FridayZoomiesLabelDrawerV2 } from "@/components/itch-quiz/FridayZoomiesLabelDrawerV2";
import { RATING } from "@/lib/products/dog-itch";
import { FZ_OIL_NAME } from "@/lib/quiz/fridayzoomiesOfferV2";
import { FIRST, PRICE } from "@/lib/quiz/fzOrder";
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

function Check() {
  return (
    <svg className={styles.icon} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M15 4.5L6.75 12.75L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
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
 * The weight buttons start on the quiz answer. Picking another changes nothing else,
 * since every size is the same price and plan.
 */
export function FridayZoomiesPdpV3({ onStart }: { onStart: () => Promise<boolean> | void }) {
  const { answers } = useAnswers(itchFridayZoomiesQuiz.id);
  const quizSize = WEIGHTS.find((w) => answers["dog-size"]?.replace(/[–]/g, "-") === w.value)?.value;
  const [picked, setPicked] = useState<string | null>(null);
  const weight = picked ?? quizSize ?? null;
  const [at, setAt] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [labelOpen, setLabelOpen] = useState(false);
  const closeLabel = useCallback(() => setLabelOpen(false), []);
  const left = useEndOfDay();
  /* The track scrolls and snaps; the thumbs and arrows scroll it, and scrolling updates the highlighted thumb. */
  const goTo = (i: number) => {
    const t = trackRef.current;
    const slide = t?.children[i] as HTMLElement | undefined;
    if (t && slide) t.scrollTo({ left: slide.offsetLeft - t.offsetLeft, behavior: "smooth" });
    setAt(i);
  };
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const t = e.currentTarget;
    let best = 0;
    let min = Infinity;
    Array.from(t.children).forEach((c, i) => {
      const d = Math.abs((c as HTMLElement).offsetLeft - t.offsetLeft - t.scrollLeft);
      if (d < min) { min = d; best = i; }
    });
    setAt(best);
  };

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

      <div className={styles.wrap}>
        <div className={styles.inner}>
          <div className={styles.gallery} aria-roledescription="carousel" aria-label="Product images">
            <div className={styles.stage}>
              <div ref={trackRef} className={styles.track} onScroll={onScroll}>
                {IMAGES.map((img, i) => (
                  <div key={img.src} className={styles.slide} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${IMAGES.length}`}>
                    <Image className={styles.slideImg} src={img.src} alt={img.alt} width={900} height={900} priority={i === 0} sizes="(min-width: 1024px) 433px, calc(100vw - 47px)" />
                  </div>
                ))}
              </div>
              <div className={styles.arrows}>
                <button type="button" className={styles.arrow} aria-label="Previous image" onClick={() => goTo((at + IMAGES.length - 1) % IMAGES.length)}>
                  <Icon name="chevron-left" size={18} strokeWidth={2.5} />
                </button>
                <button type="button" className={styles.arrow} aria-label="Next image" onClick={() => goTo((at + 1) % IMAGES.length)}>
                  <Icon name="chevron-right" size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>
            <ul className={styles.thumbs}>
              {IMAGES.map((img, i) => (
                <li key={img.src}>
                  <button
                    type="button"
                    aria-label={`Show image ${i + 1}`}
                    aria-current={i === at}
                    className={`${styles.thumb} ${i === at ? styles.thumbOn : ""}`}
                    onClick={() => goTo(i)}
                  >
                    <Image src={img.src} alt="" width={160} height={160} />
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className={styles.label} onClick={() => setLabelOpen(true)}>
              View Nutrition Label
            </button>
          </div>

          <div className={styles.buy}>
            <div className={styles.titleBlock}>
              <h1 className={styles.title}>Less itching and smoother skin</h1>
              <div className={styles.rating}>
                <span className={styles.stars} aria-hidden="true">★★★★★</span>
                <p className={styles.ratingLabel}>Excellent <strong>{RATING.score}</strong> | {RATING.count} Reviews</p>
              </div>
              <p className={styles.body}>
                Friday Zoomies Pure Omega Salmon Oil is designed to support your dog&apos;s immune balance and skin comfort, easing the scratch-itch cycle and providing relief from seasonal and environmental triggers, especially for allergy-prone dogs.
              </p>
            </div>

            <div className={styles.step}>
              <h2 className={styles.stepTitle}>Select Your Dog&apos;s Weight</h2>
              <div className={styles.weights} role="radiogroup" aria-label="Select your dog's weight">
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
            </div>

            <div className={`${styles.step} ${styles.planStep}`}>
              <div className={styles.stepHead}>
                <h2 className={`${styles.stepTitle} ${styles.planTitle}`}>Choose your plan:</h2>
                <p className={styles.ship}>
                  <span className={styles.shipIcon} aria-hidden="true"><Icon name="truck" size={14} /></span>
                  Shipped in 24 hours. Straight from our USA warehouse.
                </p>
              </div>

              <div className={styles.feat}>
                <div className={styles.featHead}>Vet recommended</div>
                <div className={styles.featBody}>
                  <div className={styles.featTop}>
                    <div className={styles.planLine}>
                      <span className={styles.radio} aria-hidden="true" />
                      <p className={styles.name}>28 Day Supply (1 Bottle)</p>
                      <p className={styles.perDay}>${PER_DAY} / day</p>
                    </div>
                    <div className={styles.promo}><span>Save 50% + Free Shipping</span></div>
                  </div>
                  <div className={styles.includes}>
                    <p className={styles.incTitle}>Includes:</p>
                    <ul className={styles.ledger}>
                      <li className={styles.li}>
                        <div className={styles.liLeft}><Check /><p className={styles.liLabel}>28 Day Supply of Pure Omega Salmon Oil</p></div>
                        <p className={styles.liPrice}><s>${PRICE}</s><b>${FIRST}</b></p>
                      </li>
                      <li className={styles.li}>
                        <div className={styles.liLeft}><Check /><p className={styles.liLabel}>FREE Shipping</p></div>
                        <p className={styles.liPrice}><b>FREE</b></p>
                      </li>
                      <li className={styles.li}>
                        <div className={styles.liLeft}><Check /><p className={styles.liLabel}>90-Day Money Back Guarantee</p></div>
                      </li>
                    </ul>
                  </div>
                  <ul className={styles.fns}>
                    <li className={styles.fn}><Icon name="x" size={16} strokeWidth={2} />No commitment</li>
                    <li className={styles.fn}><Icon name="chevron-right" size={16} strokeWidth={2} />Skip or cancel anytime</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.checkout}>
              <Button
                size="lg"
                fullWidth
                onClick={start}
                disabled={busy}
                style={{ fontSize: 20, fontWeight: 800, lineHeight: "24px", letterSpacing: "-0.02em", minHeight: 69, paddingBlock: 16, whiteSpace: "pre-wrap" }}
              >
                Try risk free | ${FIRST} <s style={{ marginLeft: 8, opacity: 0.7 }}>${PRICE}</s>
              </Button>
              <p className={styles.avail}>In stock, ready to ship</p>

              <div className={styles.guar}>
                <div className={styles.guarText}>
                  <p className={styles.guarTitle}>90-Day Money<br />Back Guarantee</p>
                  <p className={styles.guarBody}>
                    Each pump plays a vital role in supporting your dog&apos;s health. <strong>Consistent use for 90 days is crucial, which is why we offer a 90-Day Money-Back Guarantee.</strong>
                  </p>
                </div>
                <span className={styles.jar} aria-hidden="true">
                  <span className={styles.jarIn}>
                    <Image src={`${DIR}/oil-bottle.webp`} alt="" width={308} height={340} />
                  </span>
                </span>
              </div>

              <p className={styles.update}><b>UPDATE: </b>Fall is a peak season for your dog&apos;s seasonal allergies.</p>
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
      </div>
      {labelOpen ? <FridayZoomiesLabelDrawerV2 onClose={closeLabel} /> : null}
    </section>
  );
}
