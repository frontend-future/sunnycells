import type { Metadata } from "next";
import { RevitalizeTenPage } from "@/components/advertorial/RevitalizeTenPage";
import { META } from "@/lib/content/revitalize-ten";

export const metadata: Metadata = { title: META.title, description: META.description };

export default function Page() {
  return <RevitalizeTenPage />;
}
