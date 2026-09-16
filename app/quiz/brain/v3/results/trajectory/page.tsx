import type { Metadata } from "next";
import { BrainV3Trajectory } from "@/components/brain-quiz/v3/BrainV3Trajectory";

export const metadata: Metadata = { title: "Your 90 day outlook | SUNNYCELLS" };

export default function TrajectoryPage() {
  return <BrainV3Trajectory />;
}
