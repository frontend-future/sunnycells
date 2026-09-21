import type { Metadata } from "next";
import { ItchSummary } from "@/components/itch-quiz/ItchSummary";
import { itchV2Quiz } from "@/lib/quiz/itchV2";

export const metadata: Metadata = { title: "Your dog's itch assessment | SUNNYCELLS" };

export default function SummaryPage() {
  return <ItchSummary quizId={itchV2Quiz.id} nextHref="/quiz/itch/v2/results/projection" />;
}
