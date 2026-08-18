import type { Metadata } from "next";
import { BenefitsScreen } from "@/components/quiz/BenefitsScreen";

export const metadata: Metadata = { title: "What it does | SUNNYCELLS" };

export default function BenefitsPage() {
  return <BenefitsScreen />;
}
