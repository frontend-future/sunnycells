import type { Metadata } from "next";
import { SummaryScreen } from "@/components/quiz/SummaryScreen";

export const metadata: Metadata = { title: "Your stress assessment | SUNNYCELLS" };

export default function SummaryPage() {
  return <SummaryScreen />;
}
