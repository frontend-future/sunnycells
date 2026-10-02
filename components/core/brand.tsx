"use client";

import { createContext, useContext, type ReactNode } from "react";
import { ITCH_PRODUCT, renameProduct } from "@/lib/brandCopy";

/**
 * Lets one funnel re-skin the shared quiz screens without forking them. Colours,
 * radii and fonts travel as CSS variables on the funnel's wrapper element; this
 * carries the things a variable cannot: the name, the logo image, and the product
 * name inside body copy. Outside a provider everything reads as SUNNYCELLS, so no
 * other funnel changes.
 */
export type Brand = {
  name: string;
  /** What the shared copy calls the product, swapped in for the SC-01 name. */
  productName: string;
  /** Replaces the typeset wordmark. */
  logo?: { src: string; alt: string };
  /** The results story screen's photo, for a funnel whose own product shot differs. */
  storyImage?: string;
  /** Alt text for it, when the photo is not the default owner-with-a-jar shot. */
  storyAlt?: string;
};

const SUNNYCELLS: Brand = { name: "SUNNYCELLS", productName: ITCH_PRODUCT };

const BrandContext = createContext<Brand>(SUNNYCELLS);

export const BrandProvider = ({ brand, children }: { brand: Brand; children: ReactNode }) => (
  <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>
);

/** The brand, plus `t` to rewrite a string that names the default product. */
export function useBrand() {
  const brand = useContext(BrandContext);
  return { ...brand, t: (s: string) => renameProduct(s, brand.productName) };
}
