import type { Metadata } from "next";
import { BrainBenefits } from "@/components/brain-quiz/BrainBenefits";

export const metadata: Metadata = { title: "Why this works | SUNNYCELLS" };

export default function BenefitsPage() {
  return <BrainBenefits />;
}
