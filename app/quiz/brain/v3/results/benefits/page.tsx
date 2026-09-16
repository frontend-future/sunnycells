import type { Metadata } from "next";
import { BrainV3Benefits } from "@/components/brain-quiz/v3/BrainV3Benefits";

export const metadata: Metadata = { title: "How it works | SUNNYCELLS" };

export default function BenefitsPage() {
  return <BrainV3Benefits />;
}
