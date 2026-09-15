import type { Metadata } from "next";
import { BrainProjection } from "@/components/brain-quiz/BrainProjection";

export const metadata: Metadata = { title: "Your 90 day outlook | SUNNYCELLS" };

export default function ProjectionPage() {
  return <BrainProjection />;
}
