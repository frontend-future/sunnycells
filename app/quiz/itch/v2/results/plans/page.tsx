import type { Metadata } from "next";
import Image from "next/image";
import { PlansScreen } from "@/components/quiz/PlansScreen";
import { ItchPlanCards } from "@/components/itch-quiz/ItchPlanCards";
import { ITCH_PLANS_CONTENT } from "@/lib/quiz/itchPlansContent";
import { itchV2Quiz } from "@/lib/quiz/itchV2";

export const metadata: Metadata = { title: "Your plan | SUNNYCELLS" };

const DESTINATION = "/quiz/itch/v2/results/checkout";

export default function ItchPlansV2Page() {
  return (
    <PlansScreen
      content={ITCH_PLANS_CONTENT}
      destinationHref={DESTINATION}
      planCtaLabel="Try now"
      plansSlot={<ItchPlanCards key="plan-cards" destinationHref={DESTINATION} ctaLabel="Try now" quizId={itchV2Quiz.id} />}
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
            src="/quiz/itch/bottle-1.webp"
            alt="SC-01 Daily Chews, a jar of soft chews for dog skin and coat health"
            width={800}
            height={800}
            style={{ width: "100%", maxWidth: 320, height: "auto" }}
            priority
          />
        </div>
      }
    />
  );
}
