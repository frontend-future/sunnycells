import type { Metadata } from "next";
import { JointProjection } from "@/components/joint-quiz/JointProjection";

export const metadata: Metadata = { title: "Your dog's stiffness timeline | SUNNYCELLS" };

export default function ProjectionPage() {
  return <JointProjection />;
}
