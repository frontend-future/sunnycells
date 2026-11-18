import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import type { ReactNode } from "react";
import { BrandProvider } from "@/components/core/brand";
import { META } from "@/lib/content/itch-5-reasons-w";
import { FZ_BRAND } from "@/lib/quiz/fridayzoomiesOffer";
import styles from "../quiz/itch/theme.module.css";

/* Same brand and Cloud Day theme as the itch funnel. */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = { title: META.title, description: META.description };

export default function Itch5ReasonsWLayout({ children }: { children: ReactNode }) {
  return (
    <BrandProvider brand={FZ_BRAND}>
      <div className={`${styles.theme} ${bricolage.variable}`}>{children}</div>
    </BrandProvider>
  );
}
