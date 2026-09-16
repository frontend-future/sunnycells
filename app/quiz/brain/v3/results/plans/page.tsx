import type { Metadata } from "next";
import { PlansOfferBar, PlansScreen } from "@/components/quiz/PlansScreen";
import { HeroCarousel } from "@/components/quiz/HeroCarousel";
import { BrainPlanCards } from "@/components/brain-quiz/BrainPlanCards";
import { BrainV3OfferBand } from "@/components/brain-quiz/v3/BrainV3OfferBand";
import { BRAIN_CAROUSEL, BRAIN_PLANS_CONTENT } from "@/lib/quiz/brainPlansContent";
import { BRAIN_PLANS_V3 } from "@/lib/quiz/brainLadder";
import { brainV3Quiz } from "@/lib/quiz/brainV3";

export const metadata: Metadata = { title: "Your plan | SUNNYCELLS" };

const DESTINATION = "/quiz/brain/v3/results/checkout";

export default function BrainV3PlansPage() {
  return (
    <>
      <PlansOfferBar content={BRAIN_PLANS_CONTENT} />
      <BrainV3OfferBand />
      <PlansScreen
        content={BRAIN_PLANS_CONTENT}
        destinationHref={DESTINATION}
        planCtaLabel="Continue with my plan"
        plansSlot={<BrainPlanCards key="plan-cards" destinationHref={DESTINATION} ctaLabel="Continue with my plan" plans={BRAIN_PLANS_V3} quizId={brainV3Quiz.id} layout="featured" />}
        heroMedia={<HeroCarousel key="hero-carousel" content={BRAIN_CAROUSEL} pouchSrc="/product/brain-memory/01-hero-split.png" />}
        hideTopOfferBar
      />
    </>
  );
}
