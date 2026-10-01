import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { BrandProvider } from "@/components/core/brand";
import { FZ_BRAND } from "@/lib/quiz/fridayzoomiesOffer";
import styles from "./theme.module.css";

/* Loaded here, not in the root layout, so no other page pays for it. */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Friday Zoomies", template: "%s | Friday Zoomies" },
};

export default function FridayZoomiesLayout({ children }: LayoutProps<"/quiz/fridayzoomies">) {
  return (
    <BrandProvider brand={FZ_BRAND}>
      <div className={`${styles.theme} ${bricolage.variable}`}>{children}</div>
    </BrandProvider>
  );
}
