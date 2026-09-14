"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { OfferFlag } from "@/components/core/OfferFlag";
import { writeAnswer } from "@/lib/quiz/store";
import { trackMetaEvent } from "@/lib/meta";
import {
  DESCRIPTION, INCLUDED, PLANS, PRODUCT, QUOTES,
  RATING, SERVING_NOTE, SUBHEAD, CART_ID, type Plan,
} from "@/lib/products/brain";
import { BrainGallery } from "./BrainGallery";
import styles from "./brain.module.css";

function Stars() {
  return (
    <span className={styles.stars} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" size={17} fill="var(--sun)" strokeWidth={0} />
      ))}
    </span>
  );
}

export function BrainOffer() {
  const router = useRouter();
  const [chosen, setChosen] = useState<Plan>(PLANS.find((p) => p.best) ?? PLANS[0]);

  /* Put the chosen plan in the cart before leaving, so checkout opens on the one
     that was actually selected rather than on a default. */
  const buy = () => {
    writeAnswer(CART_ID, "plan", chosen.id);
    trackMetaEvent("InitiateCheckout", {
      currency: "USD",
      value: chosen.price * chosen.months,
      content_ids: [chosen.id],
      content_type: "product",
      content_name: `${PRODUCT.name} ${chosen.name}`,
    });
    router.push("/products/brain/checkout");
  };

  const saving = (chosen.compareAt - chosen.price) * chosen.months;

  return (
    <section className={styles.offer} id="buy" aria-labelledby="offer-title">
      <div className={`${styles.wrap} ${styles.section}`}>
        <div className={styles.offerGrid}>
          <BrainGallery />

          <div className={styles.offerCard}>
            {/* The standing term, stated with the ongoing price beside it as the
                component's own docs require. No deadline, because there is not one. */}
            <div className={styles.offerTop}>
              <OfferFlag size="sm" />
              <span className={styles.offerTerms}>Free shipping &middot; Cancel anytime</span>
            </div>

            <h2 className={styles.h2} id="offer-title">
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

            <div className={styles.servingNote}>
              <h3 className={styles.servingTitle}>{SERVING_NOTE.title}</h3>
              <p className={styles.lineNote}>{SERVING_NOTE.body}</p>
            </div>

            <a className={styles.reviewLink} href="#reviews-title">
              <Stars />
              Read their reviews
              <Icon name="chevron-right" size={18} strokeWidth={2.5} />
            </a>

            <div className={styles.priceRow}>
              <span className={styles.priceNow}>${chosen.price}</span>
              {/* Only where more than one bottle arrives, matching the plans page. On a
                  single bottle the price plainly is the whole thing. */}
              {chosen.months > 1 && <span className={styles.priceUnit}>/bottle</span>}
              <span className={styles.priceWas}>${chosen.compareAt * chosen.months}</span>
              <span className={styles.savePill}>Save ${saving}</span>
            </div>

            {/* What every order carries, whatever the supply. Standing terms, so there is
                no deadline on any of them and nothing here runs out. */}
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

            {/* Three cards in a row, a badge overhanging the top edge, a placeholder
                pack shot on top: the reference's bundle tiles, not a stacked list of
                plan rows. Still cadence, not a one-time quantity, per the brand's
                subscriptions-only rule. */}
            <div className={styles.bundleGrid} role="radiogroup" aria-label="Choose your supply">
              {PLANS.map((p) => {
                const on = p.id === chosen.id;
                const pctOff = Math.round((1 - p.price / p.compareAt) * 100);
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setChosen(p)}
                    className={`${styles.bundleCard} ${on ? styles.bundleCardOn : ""}`}
                  >
                    {p.best && <span className={styles.bundleBadge}>Most popular</span>}
                    <span className={`${styles.bundleShot} ${styles.placeholder}`} style={{ fontSize: 9, padding: 2 }}>
                      {p.months}mo
                    </span>
                    <span className={styles.bundleName}>{p.name}</span>
                    <span>
                      <span className={styles.bundlePrice}>${p.price}</span>
                      <span className={styles.bundleWas}> ${p.compareAt}</span>
                    </span>
                    <span className={styles.lineNote}>{pctOff}% off</span>
                  </button>
                );
              })}
            </div>

            <Button fullWidth variant="accent" size="lg" onClick={buy}>
              Try it now
            </Button>

            <p className={styles.autoApplied}>
              <span className={styles.autoTick} aria-hidden="true">
                <Icon name="check" size={13} strokeWidth={3.5} />
              </span>
              50% off auto-applied today
            </p>
            {/* Cadence comes from the selected plan, so this line cannot say monthly
                while the customer has the six month supply chosen. */}
            <p className={styles.termsLine}>
              Free shipping &nbsp;|&nbsp; {chosen.sub} &nbsp;|&nbsp; Cancel anytime
            </p>

            <figure className={styles.pullQuote}>
              <div>
                <Stars />
                <blockquote className={styles.lineNote}>{QUOTES[1].text}</blockquote>
                <figcaption className={styles.quoteWho}>
                  {QUOTES[1].name} <span className={styles.verified}>Verified buyer</span>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
