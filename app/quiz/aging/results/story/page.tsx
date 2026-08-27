import type { Metadata } from "next";
import { AgingStory } from "@/components/aging-quiz/AgingStory";

export const metadata: Metadata = { title: "A customer story | SUNNYCELLS" };

export default function Page() {
  return <AgingStory />;
}
