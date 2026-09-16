import type { Metadata } from "next";
import { BrainV3Summary } from "@/components/brain-quiz/v3/BrainV3Summary";

export const metadata: Metadata = { title: "Your results | SUNNYCELLS" };

export default function SummaryPage() {
  return <BrainV3Summary />;
}
