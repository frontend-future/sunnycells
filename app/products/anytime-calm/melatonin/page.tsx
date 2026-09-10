import type { Metadata } from "next";
import { CalmMelatoninReasonsPage } from "@/components/advertorial/CalmMelatoninReasonsPage";
import { META } from "@/lib/content/calm-melatonin-7-reasons";

export const metadata: Metadata = {
  title: `${META.title} | SUNNYCELLS`,
  description: META.description,
};

export default function Page() {
  return <CalmMelatoninReasonsPage />;
}
