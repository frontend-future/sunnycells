"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PRODUCT, SHIPPING_PRICE } from "@/lib/products/brain-memory";
import styles from "./brain-memory.module.css";

/**
 * Keeps the price and the action on screen once the buy box has scrolled away.
 * Phones only: on a wide screen the gallery column is already sticky.
 */
export function BrainMemoryStickyBar() {
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
      <Image
        src="/product/brain-memory/01-hero-split.png"
        alt=""
        width={44}
        height={44}
        className={styles.stickyShot}
        style={{ objectFit: "cover" }}
      />
      <span className={styles.stickyText}>
        <strong>{PRODUCT.name}</strong>
        <span>Free first bottle &middot; ${SHIPPING_PRICE} shipping today</span>
      </span>
      <a href="#buy" className={styles.stickyCta} tabIndex={shown ? 0 : -1}>
        Claim it free
      </a>
    </div>
  );
}
