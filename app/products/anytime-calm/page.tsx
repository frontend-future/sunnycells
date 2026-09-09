import type { Metadata } from "next";
import { CalmSixReasonsPage } from "@/components/advertorial/CalmSixReasonsPage";
import { META } from "@/lib/content/calm-6-reasons";

export const metadata: Metadata = {
  title: `${META.title} | SUNNYCELLS`,
  description: META.description,
};

export default function Page() {
  return <CalmSixReasonsPage />;
}
