import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CortisolMatrixPage } from "@/components/advertorial/CortisolMatrixPage";
import { META } from "@/lib/content/cortisolCollagenMatrix";

/* This route runs an editorial pairing rather than the house faces, so the two are
   loaded here and scoped to the page instead of in the root layout. */
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className={`${playfair.variable} ${inter.variable}`}>
      <CortisolMatrixPage />
    </div>
  );
}
