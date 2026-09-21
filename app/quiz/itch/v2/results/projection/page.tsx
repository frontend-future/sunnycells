import type { Metadata } from "next";
import { ItchProjection } from "@/components/itch-quiz/ItchProjection";
import { itchV2Quiz } from "@/lib/quiz/itchV2";

export const metadata: Metadata = { title: "Your dog's itch timeline | SUNNYCELLS" };

export default function ProjectionPage() {
  return <ItchProjection quizId={itchV2Quiz.id} nextHref="/quiz/itch/v2/results/comfort" />;
}
