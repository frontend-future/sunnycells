import type { Metadata } from "next";
import { CortisolProjection } from "@/components/cortisol-quiz/CortisolProjection";

export const metadata: Metadata = { title: "Your cortisol timeline | SUNNYCELLS" };

export default function ProjectionPage() {
  return <CortisolProjection />;
}
