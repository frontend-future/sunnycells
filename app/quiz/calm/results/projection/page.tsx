import type { Metadata } from "next";
import { CalmProjection } from "@/components/calm-quiz/CalmProjection";

export const metadata: Metadata = { title: "Your sleep timeline | SUNNYCELLS" };

export default function CalmProjectionPage() {
  return <CalmProjection />;
}
