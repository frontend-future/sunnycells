import type { Metadata } from "next";
import { JointSummary } from "@/components/joint-quiz/JointSummary";

export const metadata: Metadata = { title: "Your dog's joint assessment | SUNNYCELLS" };

export default function SummaryPage() {
  return <JointSummary />;
}
