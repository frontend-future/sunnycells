"use client";

import { useEffect, useState } from "react";
import { PLANS, PRODUCT } from "@/lib/products/brain";
import styles from "./brain.module.css";

const best = PLANS.find((p) => p.best) ?? PLANS[0];

/**
 * Keeps the price and the action on screen once the buy box has scrolled away.
 * Phones only: on a wide screen the gallery column is already sticky and the buy
 * box stays in view on its own.
 */
export function BrainStickyBar() {
  const [pastHero, setPastHero] = useState(false);
  const [buyOnScreen, setBuyOnScreen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-title");
    const buy = document.getElementById("buy");
    if (!hero || !buy) return;

    const heroWatch = new IntersectionObserver(
      ([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    const buyWatch = new IntersectionObserver(([e]) => setBuyOnScreen(e.isIntersecting), {
      threshold: 0,
    });
    heroWatch.observe(hero);
    buyWatch.observe(buy);
    return () => {
      heroWatch.disconnect();
      buyWatch.disconnect();
    };
  }, []);

  const shown = pastHero && !buyOnScreen;

  return (
    <div className={`${styles.stickyBar} ${shown ? styles.stickyBarOn : ""}`} aria-hidden={!shown}>
      <span
        className={styles.stickyShot}
        aria-hidden="true"
        style={{ background: "var(--sprout-tint)", border: "1px solid var(--sprout)" }}
      />
      <span className={styles.stickyText}>
        <strong>{PRODUCT.name}</strong>
        <span>${best.price}/bottle &middot; 50% off first order</span>
      </span>
      <a href="#buy" className={styles.stickyCta} tabIndex={shown ? 0 : -1}>
        Try it now
      </a>
    </div>
  );
}
