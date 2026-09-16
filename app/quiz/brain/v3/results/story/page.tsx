import type { Metadata } from "next";
import { BrainV3Story } from "@/components/brain-quiz/v3/BrainV3Story";

export const metadata: Metadata = { title: "Real results | SUNNYCELLS" };

export default function StoryPage() {
  return <BrainV3Story />;
}
