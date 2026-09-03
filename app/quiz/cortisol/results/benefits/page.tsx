import type { Metadata } from "next";
import { CortisolBenefits } from "@/components/cortisol-quiz/CortisolBenefits";

export const metadata: Metadata = { title: "What it does | SUNNYCELLS" };

export default function BenefitsPage() {
  return <CortisolBenefits />;
}
