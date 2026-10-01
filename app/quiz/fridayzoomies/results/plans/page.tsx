import type { Metadata } from "next";
import Image from "next/image";
import { PlansScreen } from "@/components/quiz/PlansScreen";
import { ItchPlanCards } from "@/components/itch-quiz/ItchPlanCards";
import { FZ_JAR, FZ_PLANS, FZ_PLANS_CONTENT, FZ_PRODUCT_NAME } from "@/lib/quiz/fridayzoomiesOffer";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";

export const metadata: Metadata = { title: "Your plan" };

const DESTINATION = "/quiz/fridayzoomies/results/checkout";

export default function FridayZoomiesPlansPage() {
  return (
    <PlansScreen
      content={FZ_PLANS_CONTENT}
      destinationHref={DESTINATION}
      planCtaLabel="Try now"
      plansSlot={<ItchPlanCards key="plan-cards" destinationHref={DESTINATION} ctaLabel="Try now" plans={FZ_PLANS} quizId={itchFridayZoomiesQuiz.id} lander="fridayzoomies" />}
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
            padding: "var(--space-4)",
          }}
        >
          <Image
            src={FZ_JAR}
            alt={`${FZ_PRODUCT_NAME}, a jar of soft chews for dog skin and coat health`}
            width={800}
            height={800}
            style={{ width: "100%", maxWidth: 380, borderRadius: "var(--radius-card)", height: "auto" }}
            priority
          />
        </div>
      }
    />
  );
}
