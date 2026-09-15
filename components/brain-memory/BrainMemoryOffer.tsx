"use client";

import { useRouter } from "next/navigation";
import { Accordion } from "@/components/navigation/Accordion";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { writeAnswer } from "@/lib/quiz/store";
import { trackMetaEvent } from "@/lib/meta";
import {
  INCLUDED, PLAN, PRODUCT, QUICK_INFO, RATING,
  REVIEWS, SHIPPING_PRICE, SUBHEAD, CART_ID,
} from "@/lib/products/brain-memory";
import { BrainMemoryGallery } from "./BrainMemoryGallery";
import styles from "./brain-memory.module.css";

function Stars() {
  return (
    <span className={styles.stars} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" size={17} fill="var(--sun)" strokeWidth={0} />
      ))}
    </span>
  );
}

export function BrainMemoryOffer() {
  const router = useRouter();

  const buy = () => {
    writeAnswer(CART_ID, "plan", PLAN.id);
    trackMetaEvent("InitiateCheckout", {
      currency: "USD",
      value: SHIPPING_PRICE,
      content_ids: [PLAN.id],
      content_type: "product",
      content_name: PRODUCT.name,
    });
    router.push("/products/brain-memory/checkout");
  };

  const quote = REVIEWS[0];

  return (
    <section className={styles.offer} id="buy" aria-label={PRODUCT.name}>
      <div className={`${styles.wrap} ${styles.section}`}>
        <div className={styles.offerGrid}>
          {/* Name, rating and subhead, above the gallery on a phone. The id lives
              here rather than on the desktop copy below: this is the element
              that's actually visible on mobile, and the sticky bar's
              IntersectionObserver has to watch a visible element to work. */}
          <div className={styles.offerHeadMobile}>
            <h2 className={styles.h2} id="hero-title">
              {PRODUCT.name}
            </h2>
            <div className={styles.ratingRow}>
              <Stars />
              <span className={styles.ratingScore}>{RATING.score}/5</span>
              <span className={styles.lineNote}>
                {RATING.count.toLocaleString("en-US")} reviews
              </span>
            </div>
            <p className={styles.subhead}>{SUBHEAD}</p>
          </div>

          <BrainMemoryGallery />

          <div className={styles.offerCard}>
            <div className={styles.offerHeadDesktop}>
              <h2 className={styles.h2}>
                {PRODUCT.name}
              </h2>

              <div className={styles.ratingRow}>
                <Stars />
                <span className={styles.ratingScore}>{RATING.score}/5</span>
                <span className={styles.lineNote}>
                  {RATING.count.toLocaleString("en-US")} reviews
                </span>
              </div>

              <p className={styles.subhead}>{SUBHEAD}</p>
            </div>

            {/* First bottle reads as free against the regular $49 price, with the
                dollar value of that saving stated beside it. */}
            <div className={styles.priceRow}>
              <span className={styles.priceNow}>First Month Free</span>
              <span className={styles.priceWas}>${PLAN.compareAt}</span>
              <span className={styles.savePill}>Save ${PLAN.compareAt}, Just Cover Shipping</span>
            </div>

            <ul className={styles.included}>
              {INCLUDED.map((i) => (
                <li key={i.label}>
                  <span className={styles.tick} aria-hidden="true">
                    <Icon name="check" size={13} strokeWidth={3.5} />
                  </span>
                  {i.label}
                </li>
              ))}
            </ul>

            <Button fullWidth variant="accent" size="lg" onClick={buy} style={{ marginTop: "var(--space-6)" }}>
              Rush my bottle
            </Button>

            <p className={styles.autoApplied}>
              <span className={styles.autoTick} aria-hidden="true">
                <Icon name="check" size={13} strokeWidth={3.5} />
              </span>
              First bottle free &mdash; just cover ${SHIPPING_PRICE} shipping today
            </p>
            <p className={styles.termsLine}>
              {PLAN.sub}. Cancel anytime.
            </p>

            <figure className={styles.pullQuote}>
              <div>
                <Stars />
                <blockquote className={styles.lineNote}>{quote.body}</blockquote>
                <figcaption className={styles.quoteWho}>
                  {quote.name} <span className={styles.verified}>Verified buyer</span>
                </figcaption>
              </div>
            </figure>

            <div style={{ marginTop: "var(--space-6)" }}>
              <Accordion items={QUICK_INFO.map((q) => ({ title: q.title, body: q.body }))} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
