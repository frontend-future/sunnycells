import type { Metadata } from "next";
import { EnergyCaffeine } from "@/components/energy-quiz/EnergyCaffeine";

export const metadata: Metadata = { title: "Caffeine and your energy | SUNNYCELLS" };

export default function Page() {
  return <EnergyCaffeine />;
}
