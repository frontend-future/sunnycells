import type { Metadata } from "next";
import { BrainSummary } from "@/components/brain-quiz/BrainSummary";

export const metadata: Metadata = { title: "Your results | SUNNYCELLS" };

export default function SummaryPage() {
  return <BrainSummary />;
}
