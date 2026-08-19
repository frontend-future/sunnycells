import type { Metadata } from "next";
import { HormoneHarmonyPage } from "@/components/hormone-harmony/HormoneHarmonyPage";

export const metadata: Metadata = {
  title: "Metabolic Morning Blend | SUNNYCELLS",
  description:
    "Discover SUNNYCELLS Metabolic Morning Blend, compare supply options, and build a simple morning routine that supports stress and metabolic wellness.",
  alternates: { canonical: "https://sunnycells.com/hormone-harmony" },
};

export default function HormoneHarmonyRoute() {
  return <HormoneHarmonyPage />;
}
