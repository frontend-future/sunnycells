import type { Metadata } from "next";
import { ItchBenefits } from "@/components/itch-quiz/ItchBenefits";
import { itchV3Quiz } from "@/lib/quiz/itchV3";

export const metadata: Metadata = { title: "How SC-01 Daily Chews help | SUNNYCELLS" };

export default function BenefitsPage() {
  return <ItchBenefits quizId={itchV3Quiz.id} nextHref="/quiz/itch/v3/results/story" />;
}
