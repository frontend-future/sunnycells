import type { Metadata } from "next";
import { BrainV3Age } from "@/components/brain-quiz/v3/BrainV3Age";

export const metadata: Metadata = { title: "Your brain age | SUNNYCELLS" };

export default function BrainAgePage() {
  return <BrainV3Age />;
}
