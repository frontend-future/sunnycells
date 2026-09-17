import type { Metadata } from "next";
import { ItchComfort } from "@/components/itch-quiz/ItchComfort";

export const metadata: Metadata = { title: "How histamine affects your dog | SUNNYCELLS" };

export default function ComfortPage() {
  return <ItchComfort />;
}
