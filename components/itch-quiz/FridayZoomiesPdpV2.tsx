"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { FridayZoomiesLabelDrawerV2 } from "@/components/itch-quiz/FridayZoomiesLabelDrawerV2";
import { RATING } from "@/lib/products/dog-itch";
import { FZ_PLANS } from "@/lib/quiz/fridayzoomiesOffer";
import { FZ_OIL_NAME } from "@/lib/quiz/fridayzoomiesOfferV2";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { useAnswers } from "@/lib/quiz/store";
import styles from "./fz-pdp-v2.module.css";

const DIR = "/quiz/fridayzoomies";

const IMAGES = [
  { src: `${DIR}/pdp-v2/guarantee.webp`, alt: "90-day money back guarantee on the Friday Zoomies salmon oil" },
  { src: `${DIR}/pdp-v2/day-1-day-90.webp`, alt: "Day 1 raw and red paw next to a day 90 soft and shiny paw, with the salmon oil bottle between them" },
  { src: `${DIR}/pdp-v2/targeted-relief.webp`, alt: "Gentle, targeted relief in every pump: salmon oil, DHA and EPA, and mixed tocopherols" },
  { src: `${DIR}/pdp-v2/never-just-an-itch.webp`, alt: "It's never just an itch: obsessive paw licking, head shaking, 3AM scratching, raw red patches and stiff slow mornings" },
  { src: `${DIR}/pdp-v2/only-the-best.webp`, alt: "Only the best for your dog: based in the USA, 100% natural, no chicken or beef, just 2 ingredients, with a 90-day guarantee" },
  { src: `${DIR}/pdp-v2/how-much.webp`, alt: "How much do they need: 1 pump daily up to 40 lbs, 2 pumps daily over 40 lbs" },
];


const TRUST = [
  { label: "Vet-formulated", src: `${DIR}/trust-vet.webp` },
  { label: "Third-party tested", src: `${DIR}/trust-tested.webp` },
  { label: "Based in the USA", src: `${DIR}/trust-usa.webp` },
];

const CHECKS = [
  "Helps ease the scratching, licking and chewing",
  "Supports healthy skin, coat and joints",
  "100% natural salmon oil, nothing artificial",
];

/* "Medium (20-50 lbs)" as the quiz stores it, with the en dash a numeric range wants. */
const sizeLabel = (s: string) => s.replace(/(\d)-(\d)/g, "$1–$2");

/* Each word capitalised, so "max" reads "Max" in the card title. */
const titleCase = (s: string) => s.replace(/(^|\s)(\S)/g, (_, sp: string, c: string) => sp + c.toUpperCase());

const plan = FZ_PLANS[0];

/* "October 2nd": today's date with its ordinal, read on the client so the server's
   clock and timezone never disagree with the shopper's. */
function todayLabel() {
  const d = new Date();
  const n = d.getDate();
  const suffix = n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] ?? "th";
  return `${d.toLocaleDateString("en-US", { month: "long" })} ${n}${suffix}`;
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
 * The plans page's product block, replacing the 1, 3 and 6 month cards: gallery, price,
 * the dog's own routine card, the free gifts, one button, and the detail accordions.
 *
 * The routine card is built from the quiz answers (name and weight band). With no dog
 * name it is left out rather than showing a stand-in.
 */
export function FridayZoomiesPdpV2({ onStart }: { onStart: () => Promise<boolean> | void }) {
  const { answers, ready } = useAnswers(itchFridayZoomiesQuiz.id);
  const name = answers["dog-name"]?.trim();
  const size = answers["dog-size"]?.trim();
  const [at, setAt] = useState(0);
  const touchX = useRef<number | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [labelOpen, setLabelOpen] = useState(false);
  const closeLabel = useCallback(() => setLabelOpen(false), []);

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
      body: (
        <Ingredients />
      ),
    },
    {
      id: "use",
      title: "How to use",
      body: (
        <>
          <p>Pump the oil over your dog's wet or dry food once a day:</p>
          <ul>
            <li>Up to 40 lbs: 1 pump (1 mL)</li>
            <li>Over 40 lbs: 2 pumps (2 mL)</li>
          </ul>
          <p>Start with half the amount for the first week, then work up to the full amount.</p>
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
          Try the oil for 90 days. If your dog's itching hasn't improved, email{" "}
          <a href="mailto:support@fridayzoomies.com">support@fridayzoomies.com</a> and we'll refund your order.
        </p>
      ),
    },
  ];

  return (
    <section id="plans" className={styles.pdp}>
      <h2 className={styles.birthday}>
        <span>It’s Our Birthday!</span>
        <span>We Lowered Our Prices to Celebrate.</span>
      </h2>
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
            if (Math.abs(dx) >= 40) setAt((n) => Math.min(IMAGES.length - 1, Math.max(0, n + (dx < 0 ? 1 : -1))));
          }}
        >
          <Image key={IMAGES[at].src} src={IMAGES[at].src} alt={IMAGES[at].alt} width={900} height={900} priority={at === 0} sizes="(min-width: 960px) 560px, 92vw" />
        </div>
        <button type="button" className={styles.label} onClick={() => setLabelOpen(true)}>
          View Nutrition Label
        </button>

        <div className={styles.buy}>
          {ready ? (
            <div className={styles.urgency}>
              <svg className={styles.urgencyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="8" width="18" height="4" rx="1" />
                <path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                <path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" />
              </svg>
              <span>Order by {todayLabel()} for 50% Off With Free Shipping!</span>
            </div>
          ) : null}
          <div className={styles.rating}>
            <span className={styles.stars} aria-hidden="true">★★★★★</span>
            <span className={styles.rate}>{RATING.score} · {RATING.count} reviews</span>
          </div>
          <h2 className={styles.title}>{FZ_OIL_NAME}</h2>
          <div className={styles.priceRow}>
            <span className={styles.price}>${plan.price}</span>
            <span className={styles.was}>${plan.compareAt}</span>
            <span className={styles.off}>50% OFF TODAY</span>
          </div>
          <p className={styles.lede}>
            Stop the itching for good. Omega-3 rich salmon oil that calms the irritation behind the scratching, licking and dry skin.
          </p>
          <ul className={styles.checks}>
            {CHECKS.map((c) => (
              <li key={c}>
                <span className={styles.tick} aria-hidden="true">✓</span>
                {c}
              </li>
            ))}
          </ul>
          <div className={styles.vet}>
            <span className={styles.vetStack} aria-hidden="true">
              {["vet-1", "vet-2", "vet-3-centered"].map((f) => (
                <Image key={f} src={`${DIR}/${f}.webp`} alt="" width={80} height={80} />
              ))}
            </span>
            <span className={styles.vetLong}>Veterinarian recommended ingredients</span>
            <span className={styles.vetShort}>Vet-recommended ingredients</span>
          </div>
          <hr className={styles.rule} />

          {ready && name ? (
            <div className={styles.routine}>
              <h3 className={styles.routineTitle}>{titleCase(name)}&apos;s Salmon Oil Routine</h3>
              <span className={styles.routineSub}>
                {size ? `${sizeLabel(size)} · ` : ""}daily omega-3 support
              </span>
            </div>
          ) : null}

          <div className={styles.cta}>
            <Button
              size="lg"
              fullWidth
              onClick={start}
              disabled={busy}
              style={{
                fontSize: "clamp(20px, 5.8vw, 24px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "0.01em",
                minHeight: 68,
                paddingBlock: 12,
                boxShadow: "0 10px 24px rgba(47, 95, 208, 0.4), 0 4px 0 var(--cobalt-press)",
              }}
            >
              {ready && name ? `Start ${titleCase(name)}'s Routine` : "Start Now"}
            </Button>
            <div className={styles.ctaNote}>
              <span className={styles.ctaOff}>50% off auto-applied today</span>
              <span className={styles.ctaTerms}>Free shipping on first order · Ships every 4 weeks · Cancel anytime</span>
            </div>
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
