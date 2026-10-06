import type { Metadata } from "next";
import { ItchProjection } from "@/components/itch-quiz/ItchProjection";

export const metadata: Metadata = { title: "Your dog's itch timeline | SUNNYCELLS" };

export default function ProjectionPage() {
  return <ItchProjection />;
}
