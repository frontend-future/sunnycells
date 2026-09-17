import type { Metadata } from "next";
import { JointComfort } from "@/components/joint-quiz/JointComfort";

export const metadata: Metadata = { title: "How inflammation affects your dog | SUNNYCELLS" };

export default function ComfortPage() {
  return <JointComfort />;
}
