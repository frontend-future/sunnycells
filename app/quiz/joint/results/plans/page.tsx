import type { Metadata } from "next";
import Image from "next/image";
import { PlansScreen } from "@/components/quiz/PlansScreen";
import { JointPlanCards } from "@/components/joint-quiz/JointPlanCards";
import { JOINT_PLANS_CONTENT } from "@/lib/quiz/jointPlansContent";
import { jointQuiz } from "@/lib/quiz/joint";

export const metadata: Metadata = { title: "Your plan | SUNNYCELLS" };

const DESTINATION = "/quiz/joint/results/checkout";

export default function JointPlansPage() {
  return (
    <PlansScreen
      content={JOINT_PLANS_CONTENT}
      destinationHref={DESTINATION}
      planCtaLabel="Try now"
      plansSlot={<JointPlanCards key="plan-cards" destinationHref={DESTINATION} ctaLabel="Try now" quizId={jointQuiz.id} />}
      heroMedia={
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
            src="/quiz/joint/bottle-1.webp"
            alt="SC-02 Hip & Joint Chews, a jar of soft chews for dog hip and joint health"
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
