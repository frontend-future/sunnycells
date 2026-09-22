import type { Metadata } from "next";
import { ItchProjection } from "@/components/itch-quiz/ItchProjection";
import { itchV3Quiz } from "@/lib/quiz/itchV3";

export const metadata: Metadata = { title: "Your dog's itch timeline | SUNNYCELLS" };

export default function ProjectionPage() {
  return <ItchProjection quizId={itchV3Quiz.id} nextHref="/quiz/itch/v3/results/comfort" />;
}
