import type { Metadata } from "next";
import { JointStory } from "@/components/joint-quiz/JointStory";

export const metadata: Metadata = { title: "Real results | SUNNYCELLS" };

export default function StoryPage() {
  return <JointStory />;
}
