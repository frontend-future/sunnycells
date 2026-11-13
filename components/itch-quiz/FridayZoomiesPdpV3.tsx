"use client";

import Image from "next/image";
import { Fragment, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { FridayZoomiesLabelDrawerV2 } from "@/components/itch-quiz/FridayZoomiesLabelDrawerV2";
import { RATING } from "@/lib/products/dog-itch";
import { FZ_OIL_NAME } from "@/lib/quiz/fridayzoomiesOfferV2";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { completedKey } from "@/lib/quiz/completed";
import { useAnswers } from "@/lib/quiz/store";
import { OIL_PLANS, OIL_SHIPPING, type OilPlan } from "@/lib/quiz/fzPlans";
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

/* The 1 month trial's own prices, with cents. Not the v2 checkout's FIRST and PRICE, which are whole dollars. */
const TRIAL = OIL_PLANS["1"].entry;
/* The one time price, which is also what the struck-through prices are built from. */
const ONCE = OIL_PLANS.once.entry;
const TRIAL_WAS = ONCE;
/* What a one time buyer pays to ship, struck through next to FREE. */
const SHIPPING = OIL_SHIPPING;
const money = (n: number) => `$${n.toFixed(2)}`;
/* The trial spread over its 28 days. */
const PER_DAY = (TRIAL / 28).toFixed(2);

/* The 3 month plan: 3 bottles for $74.99 against 3 times the one time price, spread over 84 days. */
const PLAN3_PRICE = OIL_PLANS["3"].entry;
const PLAN3_WAS = Math.round(3 * TRIAL_WAS * 100) / 100;
const PLAN3_PER_DAY = (PLAN3_PRICE / 84).toFixed(2);

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

/**
 * The plans page's product block, laid out like Wuffes' above the fold: an offer banner,
 * the gallery beside the buy column, then the weight buttons, the one plan card, the button
 * and the guarantee panel.
 *
 * The weight buttons start on the quiz answer. Picking another changes nothing else,
 * since every size is the same price and plan.
 */
export function FridayZoomiesPdpV3({ onStart }: { onStart: (plan: OilPlan) => Promise<boolean> | void }) {
  const { answers } = useAnswers(itchFridayZoomiesQuiz.id);
  /* The quiz answer, from this tab's session, or failing that from the copy kept on the device once the quiz was
     finished, so opening the page in a new tab or on a later day still has the dog's size. */
  const saved = useSyncExternalStore(
    () => () => {},
    () => { try { return window.localStorage.getItem(completedKey(itchFridayZoomiesQuiz.id)) ?? ""; } catch { return ""; } },
    () => "",
  );
  let savedSize: string | undefined;
  try { savedSize = (JSON.parse(saved || "{}") as Record<string, string>)["dog-size"]; } catch {}
  const size = answers["dog-size"] ?? savedSize;
  const quizSize = WEIGHTS.find((w) => size?.replace(/[–]/g, "-") === w.value)?.value;
  const [picked, setPicked] = useState<string | null>(null);
  const weight = picked ?? quizSize ?? null;
  const [at, setAt] = useState(0);
  const [plan, setPlan] = useState<1 | 3>(1);
  const trackRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [labelOpen, setLabelOpen] = useState(false);
  const closeLabel = useCallback(() => setLabelOpen(false), []);
  const left = useEndOfDay();
  const ctaRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  /* The mobile sticky buy bar shows once the main button has scrolled up out of view. */
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const watch = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting && e.boundingClientRect.top < 0));
    watch.observe(el);
    return () => watch.disconnect();
  }, []);
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

  const ctaLabel = (
    <>
      TRY RISK FREE | {plan === 1 ? money(TRIAL) : money(PLAN3_PRICE)} <s style={{ marginLeft: 8, opacity: 0.7 }}>{plan === 1 ? money(TRIAL_WAS) : money(PLAN3_WAS)}</s>
    </>
  );

  const start = async (buy: OilPlan = plan === 1 ? "1" : "3") => {
    if (busy) return;
    setBusy(true);
    const ok = await onStart(buy);
    /* A resolved false is a failed checkout, so let them tap again. Anything else is
       a redirect already under way, so the button stays down. */
    if (ok === false) setBusy(false);
  };

  return (
    <section id="plans" className={styles.pdp}>
      <div className={styles.banner} role="region" aria-label="Offer countdown">
        <div className={styles.bannerIn}>
          <div className={styles.bannerCopy}>
            <p className={styles.bannerLead}>BLACK FRIDAY SALE 🐶</p>
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
              <h1 className={styles.title}>LESS ITCHING AND SMOOTHER SKIN</h1>
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

              <div className={styles.plans} role="radiogroup" aria-label="Choose your plan">
                <div
                  role="radio"
                  aria-checked={plan === 1}
                  tabIndex={0}
                  className={`${styles.feat} ${plan === 1 ? styles.cardOn : ""}`}
                  onClick={() => setPlan(1)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setPlan(1); } }}
                >
                  <div className={styles.featHead}>Vet recommended</div>
                  <div className={styles.featBody}>
                    <div className={styles.featTop}>
                      <div className={styles.planLine}>
                        <span className={styles.radio} aria-hidden="true" />
                        <p className={styles.name}>1 Month Trial (1 Bottle)</p>
                        <p className={styles.perDay}>${PER_DAY} / day</p>
                      </div>
                      <div className={styles.promo}><span>Save 50% + Free Shipping</span></div>
                    </div>
                    <div className={styles.includes}>
                      <p className={styles.incTitle}>Includes:</p>
                      <ul className={styles.ledger}>
                        <li className={styles.li}>
                          <div className={styles.liLeft}><Check /><p className={styles.liLabel}>1 Month Supply of Pure Omega Salmon Oil</p></div>
                          <p className={styles.liPrice}><s>{money(TRIAL_WAS)}</s><b>{money(TRIAL)}</b></p>
                        </li>
                        <li className={styles.li}>
                          <div className={styles.liLeft}><Check /><p className={styles.liLabel}>FREE Shipping</p></div>
                          <p className={styles.liPrice}><s>{money(SHIPPING)}</s><b>FREE</b></p>
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

                <div
                  role="radio"
                  aria-checked={plan === 3}
                  tabIndex={0}
                  className={`${styles.row} ${plan === 3 ? styles.cardOn : ""}`}
                  onClick={() => setPlan(3)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setPlan(3); } }}
                >
                  <div className={styles.rowId}>
                    <span className={styles.radio} aria-hidden="true" />
                    <div className={styles.rowText}>
                      <p className={styles.rowName}>3 Month Supply (3 Bottles)</p>
                      <p className={styles.rowPer}>${PLAN3_PER_DAY} / day</p>
                    </div>
                  </div>
                  <span className={styles.save}>Save {money(PLAN3_WAS - PLAN3_PRICE)}</span>
                </div>
              </div>
            </div>

            <div className={styles.checkout}>
              <div ref={ctaRef}>
                <Button
                  size="lg"
                  fullWidth
                  onClick={() => start()}
                  disabled={busy}
                  style={{ fontSize: 20, fontWeight: 800, lineHeight: "24px", letterSpacing: "-0.02em", minHeight: 69, paddingBlock: 16, whiteSpace: "pre-wrap" }}
                >
                  {ctaLabel}
                </Button>
              </div>
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
                    <Image src={`${DIR}/oil-bottle-cutout.webp`} alt="" width={163} height={497} />
                  </span>
                </span>
              </div>

              <button type="button" className={styles.once} disabled={busy} onClick={() => start("once")}>Buy Once For {money(ONCE)} + Shipping</button>

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
          </div>
        </div>
      </div>
      <div className={`${styles.sticky} ${stuck ? styles.stickyOn : ""}`} aria-hidden={!stuck}>
        <div className={styles.stickyId}>
          <span className={styles.stickyTile}>
            <Image src={`${DIR}/oil-bottle-cutout.webp`} alt="" width={163} height={497} />
          </span>
          <p className={styles.stickyTitle}>{FZ_OIL_NAME}</p>
        </div>
        <Button
          size="lg"
          fullWidth
          onClick={() => start()}
          disabled={busy}
          tabIndex={stuck ? 0 : -1}
          style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", minHeight: 48, paddingBlock: 8, whiteSpace: "pre-wrap" }}
        >
          {ctaLabel}
        </Button>
      </div>
      {labelOpen ? <FridayZoomiesLabelDrawerV2 onClose={closeLabel} /> : null}
    </section>
  );
}
