"use client";

import { useRouter } from "next/navigation";
import { Accordion } from "@/components/navigation/Accordion";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { writeAnswer } from "@/lib/quiz/store";
import { trackMetaEvent } from "@/lib/meta";
import {
  DESCRIPTION, INCLUDED, PLAN, PRODUCT, QUICK_INFO, RATING,
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

/** Not OfferFlag: that component is the brand's standing 50% off percentage
    offer specifically. This product runs a different mechanic (a free first
    bottle, shipping only due today), so it gets its own badge rather than
    borrowing one whose copy says something else. */
function FreeMonthFlag() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 32,
        padding: "0 12px",
        background: "var(--ink)",
        color: "var(--white)",
        borderRadius: "var(--radius-xs)",
        fontFamily: "var(--font-text)",
        fontWeight: 800,
        fontSize: "var(--size-meta)",
        letterSpacing: "var(--tracking-caps)",
        textTransform: "uppercase",
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      First month free
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
    <section className={styles.offer} id="buy" aria-labelledby="hero-title">
      <div className={`${styles.wrap} ${styles.section}`}>
        <div className={styles.offerGrid}>
          <BrainMemoryGallery />

          <div className={styles.offerCard}>
            <div className={styles.offerTop}>
              <FreeMonthFlag />
              <span className={styles.offerTerms}>Just pay ${SHIPPING_PRICE} shipping &middot; Cancel anytime</span>
            </div>

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
            <p className={styles.offerBody}>{DESCRIPTION}</p>

            <a className={styles.reviewLink} href="#reviews-title">
              <Stars />
              Read their reviews
              <Icon name="chevron-right" size={18} strokeWidth={2.5} />
            </a>

            {/* First bottle reads as free against the regular $49 price, with the
                $10 shipping charge stated plainly right beside it rather than
                folded into a number that looks like the product's price. */}
            <div className={styles.priceRow}>
              <span className={styles.priceNow}>Free</span>
              <span className={styles.priceWas}>${PLAN.compareAt}</span>
              <span className={styles.savePill}>+ ${SHIPPING_PRICE} shipping today</span>
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
              Claim my free bottle
            </Button>

            <p className={styles.autoApplied}>
              <span className={styles.autoTick} aria-hidden="true">
                <Icon name="check" size={13} strokeWidth={3.5} />
              </span>
              First bottle free &mdash; just pay ${SHIPPING_PRICE} shipping today
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
