import type { Metadata } from "next";
import { BrainV3Energy } from "@/components/brain-quiz/v3/BrainV3Energy";

export const metadata: Metadata = { title: "Your cognitive energy | SUNNYCELLS" };

export default function EnergyPage() {
  return <BrainV3Energy />;
}
