import type { Metadata } from "next";
import { JointBenefits } from "@/components/joint-quiz/JointBenefits";

export const metadata: Metadata = { title: "How SC-02 Hip & Joint Chews help | SUNNYCELLS" };

export default function BenefitsPage() {
  return <JointBenefits />;
}
