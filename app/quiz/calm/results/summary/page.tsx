import type { Metadata } from "next";
import { CalmSummary } from "@/components/calm-quiz/CalmSummary";

export const metadata: Metadata = { title: "Your sleep assessment | SUNNYCELLS" };

export default function CalmSummaryPage() {
  return <CalmSummary />;
}
