import type { Metadata } from "next";
import { BrainStory } from "@/components/brain-quiz/BrainStory";

export const metadata: Metadata = { title: "Real results | SUNNYCELLS" };

export default function StoryPage() {
  return <BrainStory />;
}
