import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { CortisolMatrixPage } from "@/components/advertorial/CortisolMatrixPage";
import { META } from "@/lib/content/cortisolCollagenMatrix";

/* This route runs an editorial pairing rather than the house faces, so the two are
   loaded here and scoped to the page instead of in the root layout. A text serif
   rather than a display one: it sets the headline and the body, which is what makes
   a page read as a newspaper rather than as a landing page with a serif title. The
   variable names are the ones app/globals.css maps to font-editorial and
   font-editorial-ui, and nothing outside this wrapper defines them. */
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-editorial-serif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-editorial-sans", display: "swap" });

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className={`${serif.variable} ${sans.variable}`}>
      <CortisolMatrixPage />
    </div>
  );
}
