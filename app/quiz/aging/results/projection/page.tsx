import type { Metadata } from "next";
import { AgingProjection } from "@/components/aging-quiz/AgingProjection";

export const metadata: Metadata = { title: "Your skin timeline | SUNNYCELLS" };

export default function Page() {
  return <AgingProjection />;
}
