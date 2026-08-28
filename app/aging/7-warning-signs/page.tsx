import type { Metadata } from "next";
import { WarningSignsPage } from "@/components/advertorial/WarningSignsPage";
import { META } from "@/lib/content/warningSigns";

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
};

export default function Page() {
  return <WarningSignsPage />;
}
