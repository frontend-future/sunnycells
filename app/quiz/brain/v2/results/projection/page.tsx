import type { Metadata } from "next";
import { BrainProjection } from "@/components/brain-quiz/BrainProjection";
import { brainV2Quiz } from "@/lib/quiz/brainV2";

export const metadata: Metadata = { title: "Your 90 day outlook | SUNNYCELLS" };

export default function ProjectionPage() {
  return <BrainProjection quizId={brainV2Quiz.id} nextHref="/quiz/brain/v2/results/benefits" />;
}
