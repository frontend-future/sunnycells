import type { Metadata } from "next";
import { PlansScreen } from "@/components/quiz/PlansScreen";
import { HeroCarousel } from "@/components/quiz/HeroCarousel";
import { BrainPlanCard } from "@/components/brain-quiz/BrainPlanCard";
import { BRAIN_CAROUSEL, BRAIN_PLANS_CONTENT } from "@/lib/quiz/brainPlansContent";

export const metadata: Metadata = { title: "Your plan | SUNNYCELLS" };

const DESTINATION = "/products/brain-memory/checkout";

export default function BrainPlansV3Page() {
  return (
    <PlansScreen
      content={BRAIN_PLANS_CONTENT}
      destinationHref={DESTINATION}
      planCtaLabel="Try now"
      plansSlot={<BrainPlanCard key="plan-card" destinationHref={DESTINATION} ctaLabel="Try now" />}
      heroMedia={<HeroCarousel key="hero-carousel" content={BRAIN_CAROUSEL} pouchSrc="/product/brain-memory/01-hero-split.png" />}
    />
  );
}
