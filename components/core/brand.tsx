"use client";

import { createContext, useContext, type ReactNode } from "react";

/**
 * Lets one funnel re-skin the shared quiz screens without forking them. Colours,
 * radii and fonts travel as CSS variables on the funnel's wrapper element; this
 * carries the things a variable cannot: the name, the logo image, and the product
 * name inside body copy. Outside a provider everything reads as SUNNYCELLS, so no
 * other funnel changes.
 */
export type Brand = {
  name: string;
  /** What the shared copy calls the product, swapped in for DEFAULT_PRODUCT. */
  productName: string;
  /** Replaces the typeset wordmark. */
  logo?: { src: string; alt: string };
  /** The results story screen's photo, for a funnel whose own product shot differs. */
  storyImage?: string;
};

export const DEFAULT_PRODUCT = "SC-01 Daily Chews";

const SUNNYCELLS: Brand = { name: "SUNNYCELLS", productName: DEFAULT_PRODUCT };

const BrandContext = createContext<Brand>(SUNNYCELLS);

export const BrandProvider = ({ brand, children }: { brand: Brand; children: ReactNode }) => (
  <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>
);

/** The brand, plus `t` to rewrite a string that names the default product. */
export function useBrand() {
  const brand = useContext(BrandContext);
  return { ...brand, t: (s: string) => s.replaceAll(DEFAULT_PRODUCT, brand.productName) };
}
