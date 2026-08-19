import type { Metadata } from "next";
import { HormoneHarmonyPage } from "@/components/hormone-harmony/HormoneHarmonyPage";

export const metadata: Metadata = {
  title: "Metabolic Morning Blend for a Simpler Morning | SUNNYCELLS",
  description:
    "Meet SUNNYCELLS Metabolic Morning Blend: eight label-listed ingredients, one stimulant-free orange scoop, and 30 morning servings per pouch.",
  alternates: { canonical: "https://sunnycells.com/hormone-harmony" },
};

export default function HormoneHarmonyRoute() {
  return <HormoneHarmonyPage />;
}
