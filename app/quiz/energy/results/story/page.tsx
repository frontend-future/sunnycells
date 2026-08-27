import type { Metadata } from "next";
import { EnergyStory } from "@/components/energy-quiz/EnergyStory";

export const metadata: Metadata = { title: "A customer story | SUNNYCELLS" };

export default function Page() {
  return <EnergyStory />;
}
