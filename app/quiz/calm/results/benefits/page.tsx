import type { Metadata } from "next";
import { CalmBenefits } from "@/components/calm-quiz/CalmBenefits";

export const metadata: Metadata = { title: "What it does | SUNNYCELLS" };

export default function CalmBenefitsPage() {
  return <CalmBenefits />;
}
