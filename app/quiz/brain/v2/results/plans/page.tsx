import type { Metadata } from "next";
import { PlansScreen } from "@/components/quiz/PlansScreen";
import { HeroCarousel } from "@/components/quiz/HeroCarousel";
import { BrainPlanCards } from "@/components/brain-quiz/BrainPlanCards";
import { BRAIN_CAROUSEL, BRAIN_PLANS_CONTENT } from "@/lib/quiz/brainPlansContent";

export const metadata: Metadata = { title: "Your plan | SUNNYCELLS" };

const DESTINATION = "/quiz/brain/v2/results/checkout";

export default function BrainPlansV2Page() {
  return (
    <PlansScreen
      content={BRAIN_PLANS_CONTENT}
      destinationHref={DESTINATION}
      planCtaLabel="Try now"
      plansSlot={<BrainPlanCards key="plan-cards" destinationHref={DESTINATION} ctaLabel="Try now" />}
      heroMedia={<HeroCarousel key="hero-carousel" content={BRAIN_CAROUSEL} pouchSrc="/product/brain-memory/01-hero-split.png" />}
    />
  );
}
