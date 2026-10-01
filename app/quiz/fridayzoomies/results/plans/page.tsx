import type { Metadata } from "next";
import { PlansScreen } from "@/components/quiz/PlansScreen";
import { ImageGallery, type GalleryImage } from "@/components/quiz/ImageGallery";
import { ItchPlanCards } from "@/components/itch-quiz/ItchPlanCards";
import { FZ_JAR, FZ_PLANS, FZ_PLANS_CONTENT, FZ_PRODUCT_NAME } from "@/lib/quiz/fridayzoomiesOffer";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";

export const metadata: Metadata = { title: "Your plan" };

const DESTINATION = "/quiz/fridayzoomies/results/checkout";

/* The jar first, then what comes free with it: the freebies shot from the start page,
   followed by each gift on its own. */
const HERO_IMAGES: GalleryImage[] = [
  { src: FZ_JAR, alt: `${FZ_PRODUCT_NAME}, a jar of soft chews for dog skin and coat health` },
  { src: "/quiz/fridayzoomies/hero-freebies.webp", alt: "The jar plus free gifts: soothing wipes, a USA bandana, a mystery gift and free shipping" },
  { src: "/quiz/fridayzoomies/gift-wipes.webp", alt: "Free soothing wipes" },
  { src: "/quiz/fridayzoomies/gift-bandana.webp", alt: "Free USA bandana" },
  { src: "/quiz/fridayzoomies/gift-mystery.webp", alt: "Free mystery gift" },
  { src: "/quiz/fridayzoomies/gift-shipping.webp", alt: "Free shipping" },
];

export default function FridayZoomiesPlansPage() {
  return (
    <PlansScreen
      content={FZ_PLANS_CONTENT}
      destinationHref={DESTINATION}
      planCtaLabel="Try now"
      plansSlot={<ItchPlanCards key="plan-cards" destinationHref={DESTINATION} ctaLabel="Try now" plans={FZ_PLANS} quizId={itchFridayZoomiesQuiz.id} lander="fridayzoomies" />}
      heroMedia={<ImageGallery key="hero-gallery" images={HERO_IMAGES} />}
    />
  );
}
