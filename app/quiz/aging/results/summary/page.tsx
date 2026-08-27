import type { Metadata } from "next";
import { AgingSummary } from "@/components/aging-quiz/AgingSummary";

export const metadata: Metadata = { title: "Your results | SUNNYCELLS" };

export default function Page() {
  return <AgingSummary />;
}
