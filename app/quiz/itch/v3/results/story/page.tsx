import type { Metadata } from "next";
import { ItchStory } from "@/components/itch-quiz/ItchStory";
import { itchV3Quiz } from "@/lib/quiz/itchV3";

export const metadata: Metadata = { title: "Real results | SUNNYCELLS" };

export default function StoryPage() {
  return <ItchStory quizId={itchV3Quiz.id} nextHref="/quiz/itch/v3/results/plans" />;
}
