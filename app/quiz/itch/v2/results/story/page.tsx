import type { Metadata } from "next";
import { ItchStory } from "@/components/itch-quiz/ItchStory";
import { itchV2Quiz } from "@/lib/quiz/itchV2";

export const metadata: Metadata = { title: "Real results | SUNNYCELLS" };

export default function StoryPage() {
  return <ItchStory quizId={itchV2Quiz.id} nextHref="/quiz/itch/v2/results/plans" />;
}
