"use client";

import { PlansScreen } from "@/components/quiz/PlansScreen";
import { ImageGallery, type GalleryImage } from "@/components/quiz/ImageGallery";
import styles from "@/app/quiz/fridayzoomies/theme.module.css";
import { ItchPlanCards } from "@/components/itch-quiz/ItchPlanCards";
import { FZ_PLANS, FZ_PLANS_CONTENT, FZ_PRODUCT_NAME } from "@/lib/quiz/fridayzoomiesOffer";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { readAnswers } from "@/lib/quiz/store";
import { trackMetaEvent } from "@/lib/meta";
import { goToCheckout } from "@/lib/shopify/fridayzoomies";

const DESTINATION = "/quiz/fridayzoomies/results/checkout";

/* The freebies shot from the start page, then each gift on its own. */
const HERO_IMAGES: GalleryImage[] = [
  { src: "/quiz/fridayzoomies/hero-freebies.webp", alt: "The jar plus free gifts: soothing wipes, a USA bandana, a mystery gift and free shipping" },
  { src: "/quiz/fridayzoomies/gift-wipes.webp", alt: "Free soothing wipes" },
  { src: "/quiz/fridayzoomies/gift-bandana.webp", alt: "Free USA bandana" },
  { src: "/quiz/fridayzoomies/gift-mystery.webp", alt: "Free mystery gift" },
  { src: "/quiz/fridayzoomies/gift-shipping.webp", alt: "Free shipping" },
];

/* The hero button has no plan chosen, so it reports the most popular one, same as the
   card it sits above, then goes straight to Shopify. */
const heroCheckout = () => {
  const p = FZ_PLANS.find((x) => x.best) ?? FZ_PLANS[0];
  trackMetaEvent(
    "InitiateCheckout",
    { currency: "USD", value: p.price * p.months, content_ids: [p.id], content_type: "product", content_name: `${FZ_PRODUCT_NAME} ${p.label}` },
    { email: readAnswers(itchFridayZoomiesQuiz.id).email },
  );
  void goToCheckout();
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
      onHeroCtaClick={heroCheckout}
      heroCtaStyle={HERO_CTA}
      stickyBuyButton
      plansSlot={<ItchPlanCards key="plan-cards" destinationHref={DESTINATION} ctaLabel="Try now" plans={FZ_PLANS} quizId={itchFridayZoomiesQuiz.id} lander="fridayzoomies" onChoose={goToCheckout} fz />}
      heroMedia={<ImageGallery key="hero-gallery" images={HERO_IMAGES} />}
    />
  );
}
