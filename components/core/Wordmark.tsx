"use client";

import type { CSSProperties, HTMLAttributes } from "react";
import { useBrand } from "./brand";

export type WordmarkProps = HTMLAttributes<HTMLSpanElement> & {
  /** A number is pixels. A string passes straight to font-size, so "1.35em" scales
      the mark against whatever it sits inside. */
  size?: number | string;
  tone?: "ink" | "inverse";
  style?: CSSProperties;
};

/**
 * NO LOGO FILE WAS SUPPLIED. The brand name is set in type, deliberately: nothing
 * has been drawn or reconstructed. Swap this for the real mark when it exists.
 */
export function Wordmark({ size = 28, tone = "ink", style, ...rest }: WordmarkProps) {
  const { name, logo } = useBrand();
  /* A funnel with its own logo gets the image, sized so its height tracks the
     font-size the typeset mark would have had. */
  if (logo)
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={logo.src} alt={logo.alt} style={{ display: "inline-block", marginInline: "auto", verticalAlign: "-0.22em", height: typeof size === "number" ? size * 1.15 : `calc(${size} * 0.8)`, width: "auto", ...style }} />
    );
  return (
    <span
      {...rest}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 900,
        fontSize: size,
        letterSpacing: "-0.04em",
        lineHeight: 1,
        textTransform: "uppercase",
        color: tone === "inverse" ? "var(--white)" : "var(--ink)",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {name === "SUNNYCELLS" ? "Sunnycells" : name}
    </span>
  );
}
