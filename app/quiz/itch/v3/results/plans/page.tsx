import type { Metadata } from "next";
import { PlansScreen } from "@/components/quiz/PlansScreen";
import { ImageGallery, type GalleryImage } from "@/components/quiz/ImageGallery";
import { ItchPlanCards } from "@/components/itch-quiz/ItchPlanCards";
import { ITCH_PLANS_CONTENT } from "@/lib/quiz/itchPlansContent";
import { ITCH_V3_PLANS } from "@/lib/quiz/itchLadder";
import { itchV3Quiz } from "@/lib/quiz/itchV3";

export const metadata: Metadata = { title: "Your plan | SUNNYCELLS" };

const DESTINATION = "/quiz/itch/v3/results/checkout";

/* In file-name-number order (there is no 06): the product hero, what's
   included, the week-by-week timeline, key actives, the benefits photo, how
   to use it, and the "replaces 4 products" comparison. */
const HERO_IMAGES: GalleryImage[] = [
  { src: "/quiz/itch/v3/hero-carousel-01.webp", alt: "SC-01 Daily Chews jar with key benefits: calms itching, healthier coat, fewer hot spots, vet-formulated, no steroids" },
  { src: "/quiz/itch/v3/hero-carousel-02.webp", alt: "What's included: SC-01 Daily Chews plus free shipping, a USA bandana, an airtight storage canister, and a first 30 days dog health guide" },
  { src: "/quiz/itch/v3/hero-carousel-03.webp", alt: "What to expect after starting SC-01 Daily Chews: less scratching by week 2, skin recovering by week 4, coat and comfort by week 8" },
  { src: "/quiz/itch/v3/hero-carousel-04.webp", alt: "Key actives per serving: 50mg quercetin, 150mg omega-3 fish oil, 10mg/15IU zinc and vitamin E, 1 billion CFU probiotic blend" },
  { src: "/quiz/itch/v3/hero-carousel-05.webp", alt: "A woman feeding a golden retriever a chew, with callouts for calming itching, supporting healthy skin and coat, and fewer hot spots" },
  { src: "/quiz/itch/v3/hero-carousel-07.webp", alt: "Four steps to use SC-01 Daily Chews: take one out, give it with or without food, watch them enjoy the taste, one chew a day" },
  { src: "/quiz/itch/v3/hero-carousel-08.webp", alt: "SC-01 Daily Chews replaces 4 separate products: allergy and itch support, omega-3 fish oil, skin and coat support, and a probiotic" },
];

export default function ItchPlansV3Page() {
  return (
    <PlansScreen
      content={ITCH_PLANS_CONTENT}
      destinationHref={DESTINATION}
      planCtaLabel="Try now"
      plansSlot={
        <ItchPlanCards
          key="plan-cards"
          destinationHref={DESTINATION}
          ctaLabel="Try now"
          quizId={itchV3Quiz.id}
          lander="itch-v3"
          plans={ITCH_V3_PLANS}
        />
      }
      heroMedia={<ImageGallery key="hero-gallery" images={HERO_IMAGES} />}
    />
  );
}
