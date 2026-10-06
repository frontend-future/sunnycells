import type { Metadata } from "next";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchSummary } from "@/components/itch-quiz/ItchSummary";

export const metadata: Metadata = { title: "Your dog's itch assessment" };

export default function SummaryPage() {
  return <ItchSummary quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/itch/results/projection" lede="because of the following:" />;
}
