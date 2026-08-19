"use client";

import { useEffect, useState } from "react";
import styles from "./hormone-harmony.module.css";

export function MobilePurchaseBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.mobileBar} ${visible ? styles.mobileBarVisible : ""}`} aria-hidden={!visible}>
      <div>
        <strong>From $39/month</strong>
        <span>Free shipping</span>
      </div>
      <a href="#plans" tabIndex={visible ? 0 : -1}>Choose plan</a>
    </div>
  );
}
