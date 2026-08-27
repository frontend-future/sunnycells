import type { Metadata } from "next";
import { AgingCollagen } from "@/components/aging-quiz/AgingCollagen";

export const metadata: Metadata = { title: "Collagen and aging | SUNNYCELLS" };

export default function Page() {
  return <AgingCollagen />;
}
