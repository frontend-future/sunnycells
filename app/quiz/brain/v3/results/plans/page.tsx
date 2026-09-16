import type { Metadata } from "next";
import { PlansScreen } from "@/components/quiz/PlansScreen";
import { BrainMemoryGallery } from "@/components/brain-memory/BrainMemoryGallery";
import { BrainPlanCards } from "@/components/brain-quiz/BrainPlanCards";
import { BRAIN_PLANS_CONTENT } from "@/lib/quiz/brainPlansContent";
import { brainV3Quiz } from "@/lib/quiz/brainV3";

export const metadata: Metadata = { title: "Your plan | SUNNYCELLS" };

const DESTINATION = "/quiz/brain/v3/results/checkout";

/* A deep clone of /quiz/brain/v2/results/plans: same plans page, just pointed at
   the brain age quiz's own id and checkout instead of v2's. */
export default function BrainPlansV3Page() {
  return (
    <PlansScreen
      content={BRAIN_PLANS_CONTENT}
      destinationHref={DESTINATION}
      planCtaLabel="Try now"
      plansSlot={<BrainPlanCards key="plan-cards" destinationHref={DESTINATION} ctaLabel="Try now" quizId={brainV3Quiz.id} />}
      heroMedia={<BrainMemoryGallery key="hero-gallery" />}
    />
  );
}
