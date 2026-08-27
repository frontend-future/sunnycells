"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./plans-sticky.module.css";

/**
 * Keeps a way to buy on screen once the plan cards have scrolled away. Phones only,
 * and only after the cards have been seen: showing it before someone has reached the
 * prices would be a bar asking them to choose a plan they have not been offered yet.
 */
export function PlansStickyBar({
  image, offer, terms = "Cancel anytime", targetId = "plans",
}: {
  image: string;
  /** The offer, not the product name. A name long enough to matter, and the brand has
      one at 23 characters, truncates on every phone once a 48px tap target and a
      thumbnail have taken their share of a 360px bar. The page above already says what
      the product is; what the bar has to carry is the terms and the way back. */
  offer: string;
  /** One short line only. The pair of terms together overran a 360px phone, and the
      cancel line is the one that answers the objection a subscription actually raises.
      Free shipping is already on the marquee at the top of the page. */
  terms?: string;
  targetId?: string;
}) {
  const [seen, setSeen] = useState(false);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const plans = document.getElementById(targetId);
    if (!plans) return;
    /* An observer rather than a scroll handler: the browser does the intersection
       maths off the main thread, and the callback never runs during render. */
    const watch = new IntersectionObserver(
      ([e]) => {
        setOnScreen(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0 },
    );
    watch.observe(plans);
    return () => watch.disconnect();
  }, [targetId]);

  const shown = seen && !onScreen;

  return (
    <div className={`${styles.bar} ${shown ? styles.on : ""}`} aria-hidden={!shown}>
      <Image src={image} alt="" aria-hidden="true" width={200} height={200} className={styles.shot} />
      <span className={styles.text}>
        <strong>{offer}</strong>
        <span>{terms}</span>
      </span>
      <button
        type="button"
        className={styles.cta}
        tabIndex={shown ? 0 : -1}
        onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" })}
      >
        See plans
      </button>
    </div>
  );
}
