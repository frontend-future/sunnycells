import type { Metadata } from "next";
import Image from "next/image";
import { PlansScreen } from "@/components/quiz/PlansScreen";
import { ItchPlanCards } from "@/components/itch-quiz/ItchPlanCards";
import { ITCH_PLANS_CONTENT } from "@/lib/quiz/itchPlansContent";
import { ITCH_V3_PLANS } from "@/lib/quiz/itchLadder";
import { itchV3Quiz } from "@/lib/quiz/itchV3";

export const metadata: Metadata = { title: "Your plan | SUNNYCELLS" };

const DESTINATION = "/quiz/itch/v3/results/checkout";

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
      heroMedia={
        <div
          key="hero-image"
          style={{
            background: "var(--sprout-tint)",
            borderRadius: "var(--radius-card)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 380,
            padding: "var(--space-8)",
          }}
        >
          <Image
            src="/quiz/itch/v3/bottle-1.webp"
            alt="SC-01 Daily Chews, a jar of soft chews for dog skin and coat health"
            width={800}
            height={588}
            style={{ width: "100%", maxWidth: 320, height: "auto" }}
            priority
          />
        </div>
      }
    />
  );
}
