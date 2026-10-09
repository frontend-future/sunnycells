"use client";

import { PlansScreen } from "@/components/quiz/PlansScreen";
import Image from "next/image";
import { RATING } from "@/lib/products/dog-itch";
import styles from "@/app/quiz/itch/theme.module.css";
import { FridayZoomiesPdp } from "@/components/itch-quiz/FridayZoomiesPdp";
import { FZ_PLANS_CONTENT } from "@/lib/quiz/fridayzoomiesOffer";
import { goToCheckout } from "@/lib/shopify/fridayzoomies";

const DESTINATION = "/quiz/itch/results/checkout";

/* Lifted off the page with a blue glow and a hard lower edge, and a bigger label that
   scales with the viewport so it stays on one line down to a 320px phone. */
const HERO_CTA: React.CSSProperties = {
  fontSize: "clamp(16px, 5.2vw, 24px)",
  letterSpacing: "0.01em",
  whiteSpace: "nowrap",
  minHeight: 64,
  boxShadow: "0 12px 28px rgba(47, 95, 208, 0.45), 0 4px 0 var(--cobalt-press)",
};

export function FridayZoomiesPlans() {
  return (
    <PlansScreen
      content={FZ_PLANS_CONTENT}
      destinationHref={DESTINATION}
      planCtaLabel="Try now"
      heroTitleClassName={`${styles.sentence} ${styles.heroTitle}`}
      heroCtaLabel="Save 50% + Free Shipping"
      heroCtaStyle={HERO_CTA}
      stickyBuyButton
      plansSection={<FridayZoomiesPdp key="pdp" onStart={goToCheckout} />}
      heroMedia={
        <div key="hero-photo" className={styles.heroMedia}>
          <Image
            src="/quiz/fridayzoomies/hero-chew-spray.webp"
            alt="A fluffy white Great Pyrenees lying in the grass next to Friday Zoomies daily chews and itch spray"
            width={1000}
            height={1000}
            priority
            sizes="(min-width: 960px) 520px, 92vw"
            style={{ width: "100%", height: "auto", aspectRatio: "1 / 1", objectFit: "cover", borderRadius: "var(--radius-card)", alignSelf: "start" }}
          />
          <div className={styles.heroRating}>
            <span className={styles.heroStars} aria-hidden="true">★★★★★</span>
            <span><strong>{RATING.score} stars</strong> · {RATING.count} reviews</span>
          </div>
        </div>
      }
    />
  );
}
