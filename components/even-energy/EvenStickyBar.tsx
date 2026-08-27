"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PLANS, PRODUCT } from "@/lib/products/even-energy";
import styles from "./even-energy.module.css";

const best = PLANS.find((p) => p.best) ?? PLANS[0];

/**
 * Keeps the price and the action on screen once the buy box has scrolled away.
 * Phones only: on a wide screen the gallery column is already sticky and the buy
 * box stays in view on its own.
 *
 * Shown when the hero is behind us and the buy box is not on screen, so it never
 * covers the thing it is pointing at.
 */
export function EvenStickyBar() {
  const [pastHero, setPastHero] = useState(false);
  const [buyOnScreen, setBuyOnScreen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-title");
    const buy = document.getElementById("buy");
    if (!hero || !buy) return;

    /* Observers rather than a scroll handler: the browser does the intersection
       maths off the main thread, and neither callback runs during render. */
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
      <Image
        src="/product/even-energy.webp"
        alt=""
        aria-hidden="true"
        width={1024}
        height={768}
        className={styles.stickyShot}
      />
      <span className={styles.stickyText}>
        <strong>{PRODUCT.name}</strong>
        <span>${best.price}/pouch &middot; 50% off first order</span>
      </span>
      <a href="#buy" className={styles.stickyCta} tabIndex={shown ? 0 : -1}>
        Try it now
      </a>
    </div>
  );
}
