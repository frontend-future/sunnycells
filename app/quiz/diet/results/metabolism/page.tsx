import type { Metadata } from "next";
import { MetabolismScreen } from "@/components/quiz/MetabolismScreen";

export const metadata: Metadata = { title: "Cortisol and weight | SUNNYCELLS" };

export default function MetabolismPage() {
  return <MetabolismScreen />;
}
