"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { OfferFlag } from "@/components/core/OfferFlag";
import { PLANS, PRODUCT, type Plan } from "@/lib/products/even-energy";
import styles from "./even-energy.module.css";

export function EvenOffer() {
  const [chosen, setChosen] = useState<Plan>(PLANS.find((p) => p.best) ?? PLANS[0]);

  return (
    <section className={styles.offer} id="buy" aria-labelledby="offer-title">
      <div className={`${styles.wrap} ${styles.section}`}>
        <div className={styles.offerGrid}>
          <div>
            <Image
              src="/product/even-energy.webp"
              alt={`${PRODUCT.name}, a light green pouch of ${PRODUCT.servings} watermelon stick packs`}
              width={1024}
              height={768}
              className={styles.offerShot}
            />
            <div className={styles.strip} style={{ marginTop: "var(--space-4)" }}>
              <Image src="/photos/even-sticks-fan.webp" alt="A hand holding a fan of Even Energy stick packs" width={600} height={800} className={styles.stripShot} />
              <Image src="/photos/even-mix.webp" alt="A glass of mixed Even Energy on a kitchen counter" width={600} height={800} className={styles.stripShot} />
            </div>
          </div>

          <div className={styles.offerCard}>
            <p className={styles.eyebrow}>{PRODUCT.sku}</p>
            <h2 className={styles.h2} id="offer-title">
              {PRODUCT.name}
            </h2>
            <p className={styles.lede} style={{ marginTop: "var(--space-3)" }}>
              {PRODUCT.servings} watermelon stick packs. One a day in cold water.
            </p>

            {/* The standing term, stated with the ongoing price beside it as the
                component's own docs require. No deadline, because there is not one. */}
            <div style={{ marginTop: "var(--space-5)" }}>
              <OfferFlag />
            </div>

            <div className={styles.priceRow}>
              <span className={styles.priceNow}>${chosen.price}</span>
              {/* Only where more than one pouch arrives, matching the plans page. On a
                  single pouch the price plainly is the whole thing. */}
              {chosen.months > 1 && <span className={styles.priceUnit}>/pouch</span>}
              <span className={styles.priceWas}>${chosen.compareAt * chosen.months}</span>
            </div>

            <div className={styles.plans} role="radiogroup" aria-label="Choose your supply">
              {PLANS.map((p) => {
                const on = p.id === chosen.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setChosen(p)}
                    className={`${styles.plan} ${on ? styles.planOn : ""}`}
                  >
                    <span className={styles.radio} aria-hidden="true">{on && <span />}</span>
                    <span className={styles.planText}>
                      <span className={styles.planName}>{p.name}</span>
                      <span className={styles.planSub}>{p.sub}</span>
                    </span>
                    <span className={styles.planPrice}>${p.price * p.months}</span>
                  </button>
                );
              })}
            </div>

            <Button fullWidth variant="accent" size="lg">
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

          </div>
        </div>
      </div>
    </section>
  );
}
