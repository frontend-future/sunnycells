import type { Metadata } from "next";
import { EnergySummary } from "@/components/energy-quiz/EnergySummary";

export const metadata: Metadata = { title: "Your results | SUNNYCELLS" };

export default function Page() {
  return <EnergySummary />;
}
