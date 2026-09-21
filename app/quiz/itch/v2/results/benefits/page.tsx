import type { Metadata } from "next";
import { ItchBenefits } from "@/components/itch-quiz/ItchBenefits";
import { itchV2Quiz } from "@/lib/quiz/itchV2";

export const metadata: Metadata = { title: "How SC-01 Daily Chews help | SUNNYCELLS" };

export default function BenefitsPage() {
  return <ItchBenefits quizId={itchV2Quiz.id} nextHref="/quiz/itch/v2/results/story" />;
}
