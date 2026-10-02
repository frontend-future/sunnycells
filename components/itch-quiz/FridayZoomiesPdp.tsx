"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/core/Button";
import { Icon, type IconName } from "@/components/core/Icon";
import { INGREDIENTS } from "@/lib/products/dog-itch";
import { FZ_PLANS, FZ_PRODUCT_NAME } from "@/lib/quiz/fridayzoomiesOffer";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { useAnswers } from "@/lib/quiz/store";
import styles from "./fz-pdp.module.css";

const DIR = "/quiz/fridayzoomies";

const IMAGES = [
  { src: `${DIR}/hero-freebies.webp`, alt: "The jar plus free gifts: soothing wipes, a USA bandana, a mystery gift and free shipping" },
  { src: `${DIR}/gift-wipes.webp`, alt: "Free soothing wipes" },
  { src: `${DIR}/gift-bandana.webp`, alt: "Free USA bandana" },
  { src: `${DIR}/gift-mystery.webp`, alt: "Free mystery gift" },
  { src: `${DIR}/gift-shipping.webp`, alt: "Free shipping" },
];

const GIFTS = [
  { src: `${DIR}/gift-wipes.webp`, name: "Itch wipes" },
  { src: `${DIR}/gift-bandana.webp`, name: "USA bandana" },
  { src: `${DIR}/gift-mystery.webp`, name: "Mystery gift" },
  { src: `${DIR}/gift-shipping.webp`, name: "Free shipping" },
];

const TRUST: { label: string; icon: IconName; bg: string }[] = [
  { label: "Vet-formulated", icon: "shield-check", bg: "var(--sun)" },
  { label: "Third-party tested", icon: "search", bg: "var(--sky)" },
  { label: "Based in the USA", icon: "flag", bg: "var(--zest)" },
];

const CHECKS = [
  "Helps stop the scratching, licking and chewing",
  "Supports healthy skin and a healthy coat",
  "Calms irritation from allergies, naturally",
];

/* "Medium (20-50 lbs)" as the quiz stores it, with the en dash a numeric range wants. */
const sizeLabel = (s: string) => s.replace(/(\d)-(\d)/g, "$1–$2");

/* Each word capitalised, so "max" reads "Max" in the card title. */
const titleCase = (s: string) => s.replace(/(^|\s)(\S)/g, (_, sp: string, c: string) => sp + c.toUpperCase());

const plan = FZ_PLANS[0];

/**
 * The plans page's product block, replacing the 1, 3 and 6 month cards: gallery, price,
 * the dog's own routine card, the free gifts, one button, and the detail accordions.
 *
 * The routine card is built from the quiz answers (name and weight band). With no dog
 * name it is left out rather than showing a stand-in.
 */
export function FridayZoomiesPdp({ onStart }: { onStart: () => Promise<boolean> | void }) {
  const { answers, ready } = useAnswers(itchFridayZoomiesQuiz.id);
  const name = answers["dog-name"]?.trim();
  const size = answers["dog-size"]?.trim();
  const [at, setAt] = useState(0);
  const [open, setOpen] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const ingredientsRef = useRef<HTMLButtonElement>(null);

  const start = async () => {
    if (busy) return;
    setBusy(true);
    const ok = await onStart();
    /* A resolved false is a failed checkout, so let them tap again. Anything else is
       a redirect already under way, so the button stays down. */
    if (ok === false) setBusy(false);
  };

  const showLabel = () => {
    setOpen("ingredients");
    ingredientsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const sections = [
    {
      id: "why",
      title: "Why it works",
      body: (
        <>
          <p>Itching has two problems: the flare-up on the skin right now, and what keeps causing it.</p>
          <p>Soothing Wipes calm irritated skin on contact. The daily chew calms the histamine response from the inside, which is what keeps the itch from coming back.</p>
        </>
      ),
    },
    {
      id: "ingredients",
      title: "Ingredients",
      body: (
        <>
          {INGREDIENTS.map((i) => (
            <p key={i.key}>
              <strong>{i.name} ({i.dose}).</strong> {i.copy}
            </p>
          ))}
        </>
      ),
    },
    {
      id: "use",
      title: "How to use",
      body: (
        <>
          <p>Give 1 chew daily, with or without food. Use the Soothing Wipes on irritated skin for relief between chews.</p>
          <p>Most dogs scratch less by week two. Skin and coat take longer, so give it six to eight weeks of daily chews before you judge it.</p>
        </>
      ),
    },
    {
      id: "shipping",
      title: "Shipping & subscription",
      body: (
        <>
          <p>
            Free shipping on your first order. Your bundle ships every 4 weeks, and you can skip or cancel anytime. Questions? Email{" "}
            <a href="mailto:support@fridayzoomies.com">support@fridayzoomies.com</a>.
          </p>
        </>
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

        <div className={styles.main}>
          <Image key={IMAGES[at].src} src={IMAGES[at].src} alt={IMAGES[at].alt} width={900} height={900} priority={at === 0} sizes="(min-width: 960px) 560px, 92vw" />
          {at === 0 ? (
            <div className={styles.save}>
              <span className={styles.saveTop}>Save</span>
              <span className={styles.saveBig}>50%</span>
              <span className={styles.saveGift}>+ 4 free gifts</span>
            </div>
          ) : null}
        </div>
        <button type="button" className={styles.label} onClick={showLabel}>
          View Nutrition Label
        </button>

        <div className={styles.buy}>
          <div className={styles.rating}>
            <span className={styles.stars} aria-hidden="true">★★★★★</span>
            <span className={styles.rate}>4.8 · 2,140 reviews</span>
          </div>
          <h2 className={styles.title}>{FZ_PRODUCT_NAME}</h2>
          <div className={styles.priceRow}>
            <span className={styles.price}>${plan.price}</span>
            <span className={styles.was}>${plan.compareAt}</span>
            <span className={styles.off}>50% OFF FIRST BOX</span>
          </div>
          <p className={styles.lede}>
            Stop the itching for good. Calms the histamine response behind the scratching, licking and skin irritation.
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
            <span className={styles.vetIcon} aria-hidden="true">
              <Icon name="shield-check" size={20} />
            </span>
            Veterinarian recommended ingredients
          </div>
          <hr className={styles.rule} />

          {ready && name ? (
            <div className={styles.routine}>
              <h3 className={styles.routineTitle}>{titleCase(name)}&apos;s Anti-Itch Routine</h3>
              <span className={styles.routineSub}>
                {size ? `${sizeLabel(size)} · ` : ""}less scratching in as little as 7 days
              </span>
            </div>
          ) : null}

          <div className={styles.gifts}>
            <div className={styles.giftsHead}>
              <span className={styles.giftsHeadText}>Free with your first order</span>
              <span className={styles.giftsCount}>4 gifts</span>
            </div>
            <div className={styles.giftsGrid}>
              {GIFTS.map((g) => (
                <div key={g.name} className={styles.gift}>
                  <div className={styles.giftImg}>
                    <Image src={g.src} alt="" width={200} height={200} />
                  </div>
                  <span className={styles.free}>FREE</span>
                  <span className={styles.giftName}>{g.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.cta}>
            <Button
              size="lg"
              fullWidth
              onClick={start}
              disabled={busy}
              style={{ fontSize: 18, fontWeight: 800, minHeight: 60, boxShadow: "0 10px 24px rgba(47, 95, 208, 0.4), 0 4px 0 var(--cobalt-press)" }}
            >
              Start Now
            </Button>
            <div className={styles.ctaNote}>
              <span className={styles.ctaOff}>50% off auto-applied today</span>
              <span className={styles.ctaTerms}>Free shipping on first order · Ships every 4 weeks · Cancel anytime</span>
            </div>
          </div>

          <ul className={styles.trust}>
            {TRUST.map((t) => (
              <li key={t.label}>
                <span className={styles.trustDot} style={{ background: t.bg }} aria-hidden="true">
                  <Icon name={t.icon} size={18} />
                </span>
                {t.label}
              </li>
            ))}
          </ul>

          <div className={styles.acc}>
            {sections.map((s) => (
              <div key={s.id}>
                <button
                  type="button"
                  ref={s.id === "ingredients" ? ingredientsRef : undefined}
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
    </section>
  );
}
