import type { Metadata } from "next";
import { DailyRedsPage } from "@/components/daily-reds/DailyRedsPage";

export const metadata: Metadata = {
  title: "Daily Reds Gummies | SUNNYCELLS",
  description:
    "Not eating fruit leaves three specific gaps: vitamin C, fiber and polyphenols. Daily Reds puts all three back in four gummies a day.",
};

export default function Page() {
  return <DailyRedsPage />;
}
