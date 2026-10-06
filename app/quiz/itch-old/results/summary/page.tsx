import type { Metadata } from "next";
import { ItchSummary } from "@/components/itch-quiz/ItchSummary";

export const metadata: Metadata = { title: "Your dog's itch assessment | SUNNYCELLS" };

export default function SummaryPage() {
  return <ItchSummary />;
}
