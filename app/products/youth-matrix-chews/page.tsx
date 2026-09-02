import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { YouthMatrixPage } from "@/components/youth-matrix/YouthMatrixPage";
import { PRODUCT } from "@/lib/products/youth-matrix-chews";

/* Editorial pairing scoped to this route, as on the advertorial it links to, so the
   house faces are untouched elsewhere. */
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: `${PRODUCT.title} | SUNNYCELLS`,
  description: PRODUCT.subhead,
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className={`${playfair.variable} ${inter.variable}`}>
      <YouthMatrixPage />
    </div>
  );
}
