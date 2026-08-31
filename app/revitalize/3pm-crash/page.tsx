import type { Metadata } from "next";
import { RevitalizeAdvertorial } from "@/components/advertorial/RevitalizePage";
import { META } from "@/lib/content/revitalize";

export const metadata: Metadata = { title: META.title, description: META.description };

export default function Page() {
  return <RevitalizeAdvertorial />;
}
