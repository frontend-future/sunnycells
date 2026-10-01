import type { Metadata } from "next";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchBenefits } from "@/components/itch-quiz/ItchBenefits";

export const metadata: Metadata = { title: "How SC-01 Daily Chews help | SUNNYCELLS" };

export default function BenefitsPage() {
  return <ItchBenefits quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/fridayzoomies/results/story" />;
}
