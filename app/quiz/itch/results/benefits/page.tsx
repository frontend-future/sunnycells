import type { Metadata } from "next";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchBenefits } from "@/components/itch-quiz/ItchBenefits";

export const metadata: Metadata = { title: "How the Inside-Out Itch Bundle helps" };

export default function BenefitsPage() {
  return <ItchBenefits quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/itch/results/story" usaLabel="Based in the USA" />;
}
