import type { Metadata } from "next";
import { CortisolSummary } from "@/components/cortisol-quiz/CortisolSummary";

export const metadata: Metadata = { title: "Your cortisol assessment | SUNNYCELLS" };

export default function SummaryPage() {
  return <CortisolSummary />;
}
