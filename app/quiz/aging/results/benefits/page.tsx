import type { Metadata } from "next";
import { AgingBenefits } from "@/components/aging-quiz/AgingBenefits";

export const metadata: Metadata = { title: "How Complete Collagen works | SUNNYCELLS" };

export default function Page() {
  return <AgingBenefits />;
}
