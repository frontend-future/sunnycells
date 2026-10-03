"use client";

import { PlansScreen } from "@/components/quiz/PlansScreen";
import Image from "next/image";
import styles from "@/app/quiz/fridayzoomies/theme.module.css";
import { FridayZoomiesPdp } from "@/components/itch-quiz/FridayZoomiesPdp";
import { FZ_PLANS, FZ_PLANS_CONTENT, FZ_PRODUCT_NAME } from "@/lib/quiz/fridayzoomiesOffer";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { readAnswers } from "@/lib/quiz/store";
import { trackMetaEvent } from "@/lib/meta";
import { goToCheckout } from "@/lib/shopify/fridayzoomies";

const DESTINATION = "/quiz/fridayzoomies/results/checkout";

/* There is one box on offer, the $25 first month, so both buttons report that one. */
const trackCheckout = () => {
  const p = FZ_PLANS[0];
  trackMetaEvent(
    "InitiateCheckout",
    { currency: "USD", value: p.price * p.months, content_ids: [p.id], content_type: "product", content_name: `${FZ_PRODUCT_NAME} ${p.label}` },
    { email: readAnswers(itchFridayZoomiesQuiz.id).email },
  );
};

/* The product block's button waits on Shopify so it can re-arm if the cart fails. */
const goToCheckoutTracked = () => {
  trackCheckout();
  return goToCheckout();
};

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
      plansSection={<FridayZoomiesPdp key="pdp" onStart={goToCheckoutTracked} />}
      heroMedia={
        <div key="hero-photo" className={styles.heroMedia}>
          <Image
            src="/quiz/fridayzoomies/hero-pyrenees.webp"
            alt="A fluffy white Great Pyrenees lying in the grass, sniffing a tub of Friday Zoomies daily chews"
            width={1000}
            height={1000}
            priority
            sizes="(min-width: 960px) 520px, 92vw"
            style={{ width: "100%", height: "auto", aspectRatio: "1 / 1", objectFit: "cover", borderRadius: "var(--radius-card)", alignSelf: "start" }}
          />
          <div className={styles.heroRating}>
            <span className={styles.heroStars} aria-hidden="true">★★★★★</span>
            <span><strong>4.8 stars</strong> · 2,140 reviews</span>
          </div>
        </div>
      }
    />
  );
}
