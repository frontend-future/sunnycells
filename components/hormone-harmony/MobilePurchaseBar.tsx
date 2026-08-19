"use client";

import { useEffect, useState } from "react";
import { firstOrderPrice } from "@/lib/price";
import { PLANS } from "@/lib/quiz/plans";
import styles from "./hormone-harmony.module.css";

const lowestPlan = PLANS.reduce((lowest, plan) => plan.price < lowest.price ? plan : lowest);

export function MobilePurchaseBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const plans = document.getElementById("plans");
    const update = () => {
      const heroRect = hero.getBoundingClientRect();
      const plansRect = plans?.getBoundingClientRect();
      const purchaseAreaVisible = plansRect
        ? plansRect.top < window.innerHeight && plansRect.bottom > 0
        : false;
      setVisible(heroRect.bottom < 80 && !purchaseAreaVisible);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className={`${styles.mobileBar} ${visible ? styles.mobileBarVisible : ""}`} aria-hidden={!visible}>
      <div>
        <strong>From ${firstOrderPrice(lowestPlan.price)} first month</strong>
        <span>Then ${lowestPlan.price} per month. Free shipping.</span>
      </div>
      <a href="#plans" tabIndex={visible ? 0 : -1}>Choose plan</a>
    </div>
  );
}
