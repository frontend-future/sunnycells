import type { Metadata } from "next";
import { BrainV3Concerns } from "@/components/brain-quiz/v3/BrainV3Concerns";

export const metadata: Metadata = { title: "How we help | SUNNYCELLS" };

export default function ConcernsPage() {
  return <BrainV3Concerns />;
}
