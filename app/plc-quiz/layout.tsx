import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import type { ReactNode } from "react";
import { BrandProvider } from "@/components/core/brand";
import { FZ_BRAND } from "@/lib/quiz/fridayzoomiesOffer";
import styles from "../quiz/itch/theme.module.css";

/* Same brand and theme as the itch funnel (Cloud Day palette, Bricolage headings), so this
   quiz reads as Friday Zoomies and shares its tokens instead of forking them. */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Friday Zoomies | Is salmon oil right for your dog?",
  robots: { index: false, follow: false },
};

export default function PlcQuizLayout({ children }: { children: ReactNode }) {
  return (
    <BrandProvider brand={FZ_BRAND}>
      <div className={`${styles.theme} ${bricolage.variable}`}>{children}</div>
    </BrandProvider>
  );
}
