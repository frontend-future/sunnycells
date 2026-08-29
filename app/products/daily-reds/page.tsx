import type { Metadata } from "next";
import { DailyRedsPage } from "@/components/daily-reds/DailyRedsPage";

export const metadata: Metadata = {
  title: "Daily Reds Gummies | SUNNYCELLS",
  description:
    "Nine in ten US adults do not eat enough fruit. Daily Reds is eight red fruits in four gummies, once a day, with nothing to blend or wash up.",
};

export default function Page() {
  return <DailyRedsPage />;
}
