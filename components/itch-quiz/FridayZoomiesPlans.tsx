"use client";

import { PlansScreen } from "@/components/quiz/PlansScreen";
import Image from "next/image";
import { RATING } from "@/lib/products/dog-itch";
import styles from "@/app/quiz/itch/theme.module.css";
import { FridayZoomiesPdp } from "@/components/itch-quiz/FridayZoomiesPdp";
import { FZ_PLANS_CONTENT, FZ_PRODUCT_NAME } from "@/lib/quiz/fridayzoomiesOffer";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { FIRST } from "@/lib/quiz/fzOrder";
import { readAnswers } from "@/lib/quiz/store";
import { trackMetaEvent } from "@/lib/meta";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import posthog from "posthog-js";

const DESTINATION = "/quiz/itch/checkout";
const CHECKOUT_V2 = "/quiz/itch/v2/checkout";

/* Lifted off the page with a blue glow and a hard lower edge, and a bigger label that
   scales with the viewport so it stays on one line down to a 320px phone. */
const HERO_CTA: React.CSSProperties = {
  fontSize: "clamp(16px, 5.2vw, 24px)",
  letterSpacing: "0.01em",
  whiteSpace: "nowrap",
  minHeight: 64,
  boxShadow: "0 12px 28px rgba(47, 95, 208, 0.45), 0 4px 0 var(--cobalt-press)",
};

/* Fires on the real buy button, the one in the product block, never on the buttons that only
   scroll to it. The purchase itself is reported from the thank you page. */
const trackCheckout = () =>
  trackMetaEvent(
    "InitiateCheckout",
    { currency: "USD", value: FIRST, content_ids: ["inside-out-itch-bundle"], content_type: "product", content_name: FZ_PRODUCT_NAME },
    { email: readAnswers(itchFridayZoomiesQuiz.id).email },
  );

export function FridayZoomiesPlans() {
  const router = useRouter();
  /* The checkout split test. PostHog flag "checkout-split": variant "two-step" goes to the v2 checkout,
     everyone else (no flag, control, PostHog blocked or slow) stays on the current one. Reading the
     flag here, when the plans page shows, is what PostHog counts as the person entering the test. */
  const [destination, setDestination] = useState(DESTINATION);
  useEffect(() => {
    try {
      return posthog.onFeatureFlags(() => {
        if (posthog.getFeatureFlag("checkout-split") === "two-step") setDestination(CHECKOUT_V2);
      });
    } catch {
      /* PostHog is off here (no key): control checkout. */
    }
  }, []);
  const startCheckout = () => {
    trackCheckout();
    router.push(destination);
  };
  return (
    <PlansScreen
      content={FZ_PLANS_CONTENT}
      destinationHref={destination}
      planCtaLabel="Try now"
      heroTitleClassName={`${styles.sentence} ${styles.heroTitle}`}
      heroCtaLabel="Save 50% + Free Shipping"
      heroCtaStyle={HERO_CTA}
      stickyBuyButton
      plansSection={<FridayZoomiesPdp key="pdp" onStart={startCheckout} />}
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
