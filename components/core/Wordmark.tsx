import type { CSSProperties, HTMLAttributes } from "react";

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
      Sunnycells
    </span>
  );
}
