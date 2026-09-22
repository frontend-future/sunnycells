import type { Metadata } from "next";
import { ItchSummary } from "@/components/itch-quiz/ItchSummary";
import { itchV3Quiz } from "@/lib/quiz/itchV3";

export const metadata: Metadata = { title: "Your dog's itch assessment | SUNNYCELLS" };

export default function SummaryPage() {
  return <ItchSummary quizId={itchV3Quiz.id} nextHref="/quiz/itch/v3/results/projection" />;
}
