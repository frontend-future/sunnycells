import type { Metadata } from "next";
import { ItchBenefits } from "@/components/itch-quiz/ItchBenefits";

export const metadata: Metadata = { title: "How SC-01 Daily Chews help | SUNNYCELLS" };

export default function BenefitsPage() {
  return <ItchBenefits />;
}
