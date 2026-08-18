import type { Metadata } from "next";
import { StoryScreen } from "@/components/quiz/StoryScreen";

export const metadata: Metadata = { title: "A customer story | SUNNYCELLS" };

export default function StoryPage() {
  return <StoryScreen />;
}
