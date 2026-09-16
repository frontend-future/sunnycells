import type { Metadata } from "next";
import { BrainSummary } from "@/components/brain-quiz/BrainSummary";
import { brainV2Quiz } from "@/lib/quiz/brainV2";

export const metadata: Metadata = { title: "Your results | SUNNYCELLS" };

export default function SummaryPage() {
  return <BrainSummary quizId={brainV2Quiz.id} nextHref="/quiz/brain/v2/results/projection" />;
}
