import type { Metadata } from "next";
import { PlansScreen } from "@/components/quiz/PlansScreen";
import { BrainMemoryGallery } from "@/components/brain-memory/BrainMemoryGallery";
import { BrainPlanCards } from "@/components/brain-quiz/BrainPlanCards";
import { BRAIN_PLANS_CONTENT } from "@/lib/quiz/brainPlansContent";
import { brainV2Quiz } from "@/lib/quiz/brainV2";

export const metadata: Metadata = { title: "Your plan | SUNNYCELLS" };

const DESTINATION = "/quiz/brain/v2/results/checkout";

export default function BrainPlansV2Page() {
  return (
    <PlansScreen
      content={BRAIN_PLANS_CONTENT}
      destinationHref={DESTINATION}
      planCtaLabel="Try now"
      plansSlot={<BrainPlanCards key="plan-cards" destinationHref={DESTINATION} ctaLabel="Try now" quizId={brainV2Quiz.id} />}
      heroMedia={<BrainMemoryGallery key="hero-gallery" />}
    />
  );
}
