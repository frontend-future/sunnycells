import type { Metadata } from "next";
import { ItchStory } from "@/components/itch-quiz/ItchStory";

export const metadata: Metadata = { title: "Real results | SUNNYCELLS" };

export default function StoryPage() {
  return <ItchStory />;
}
