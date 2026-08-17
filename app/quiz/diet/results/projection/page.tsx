import type { Metadata } from "next";
import { ProjectionScreen } from "@/components/quiz/ProjectionScreen";

export const metadata: Metadata = { title: "Your weight timeline | SUNNYCELLS" };

export default function ProjectionPage() {
  return <ProjectionScreen />;
}
