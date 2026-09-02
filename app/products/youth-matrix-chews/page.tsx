import type { Metadata } from "next";
import { YouthMatrixPage } from "@/components/youth-matrix/YouthMatrixPage";
import { PRODUCT } from "@/lib/products/youth-matrix-chews";

export const metadata: Metadata = {
  title: `${PRODUCT.title} | SUNNYCELLS`,
  description: PRODUCT.subhead,
  robots: { index: false, follow: false },
};

export default function Page() {
  return <YouthMatrixPage />;
}
