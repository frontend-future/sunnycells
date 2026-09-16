import type { Metadata } from "next";
import Image from "next/image";
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
      <BrainV3OfferBand />
      <PlansScreen
        content={BRAIN_PLANS_CONTENT}
        destinationHref={DESTINATION}
        planCtaLabel="Continue with my plan"
        plansSlot={<BrainPlanCards key="plan-cards" destinationHref={DESTINATION} ctaLabel="Continue with my plan" plans={BRAIN_PLANS_V3} quizId={brainV3Quiz.id} layout="featured" />}
        heroMedia={
          /* A plain static shot, not the sliding info carousel every other funnel's
             hero uses: the same ground (benefits, stats, supplement facts) is
             already covered further down this page, in its own dedicated sections. */
          <div
            key="hero-image"
            style={{
              background: "var(--sun-tint)",
              borderRadius: "var(--radius-card)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 380,
              padding: "var(--space-8)",
            }}
          >
            <Image
              src="/quiz/brain/bottle-3-transparent.webp"
              alt="Brain & Memory Power Boost, 3 month supply"
              width={800}
              height={660}
              style={{ width: "100%", maxWidth: 320, height: "auto" }}
              priority
            />
          </div>
        }
        hideTopOfferBar
      />
    </>
  );
}
