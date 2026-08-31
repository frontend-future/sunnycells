import type { Metadata } from "next";
import { SteadyBurnAdvertorial } from "@/components/advertorial/SteadyBurnPage";
import { META } from "@/lib/content/steadyBurn";

export const metadata: Metadata = { title: META.title, description: META.description };

export default function Page() {
  return <SteadyBurnAdvertorial />;
}
