import type { Metadata } from "next";
import { BrainStory } from "@/components/brain-quiz/BrainStory";
import { brainV2Quiz } from "@/lib/quiz/brainV2";

export const metadata: Metadata = { title: "Real results | SUNNYCELLS" };

export default function StoryPage() {
  return <BrainStory quizId={brainV2Quiz.id} nextHref="/quiz/brain/v2/results/plans" />;
}
