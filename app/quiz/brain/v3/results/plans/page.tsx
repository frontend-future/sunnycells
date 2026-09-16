import type { Metadata } from "next";
import { PlansOfferBar, PlansScreen } from "@/components/quiz/PlansScreen";
import { BrainPlanCards } from "@/components/brain-quiz/BrainPlanCards";
import { BrainV3OfferBand } from "@/components/brain-quiz/v3/BrainV3OfferBand";
import { BRAIN_PLANS_CONTENT } from "@/lib/quiz/brainPlansContent";
import { BRAIN_PLANS_V3 } from "@/lib/quiz/brainLadder";
import { brainV3Quiz } from "@/lib/quiz/brainV3";

export const metadata: Metadata = { title: "Your plan | SUNNYCELLS" };

const DESTINATION = "/quiz/brain/v3/results/checkout";

export default function BrainV3PlansPage() {
  return (
    <>
      <PlansOfferBar content={BRAIN_PLANS_CONTENT} />
      {/* The plan card sits beside the recommendation on desktop, inside the same
          dark band, rather than being repeated further down the page: no second
          copy of it in PlansScreen's own "Plans" section (plansSlot below), and no
          standalone product shot in the hero (heroMedia below) competing with it. */}
      <BrainV3OfferBand
        planCard={
          <BrainPlanCards
            key="plan-cards"
            destinationHref={DESTINATION}
            ctaLabel="Continue with my plan"
            plans={BRAIN_PLANS_V3}
            quizId={brainV3Quiz.id}
            layout="featured"
          />
        }
      />
      {/* Not an empty fragment for plansSlot/heroMedia below: with nothing to
          serialize, one gets normalized away across the server/client boundary
          and PlansScreen's own ?? falls back to its default (the diet funnel's
          carousel and cards). A real, if invisible, element survives that trip. */}
      <PlansScreen
        content={BRAIN_PLANS_CONTENT}
        destinationHref={DESTINATION}
        planCtaLabel="Continue with my plan"
        plansSlot={<span aria-hidden="true" style={{ display: "none" }} />}
        heroMedia={<span aria-hidden="true" style={{ display: "none" }} />}
        hideTopOfferBar
      />
    </>
  );
}
