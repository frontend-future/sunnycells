import type { CSSProperties, HTMLAttributes } from "react";

export type OfferFlagProps = HTMLAttributes<HTMLSpanElement> & {
  percent?: number;
  label?: string;
  /** "sun" on photography, black on white or on a colour block. Never red. */
  tone?: "ink" | "sun";
  size?: "sm" | "md";
  style?: CSSProperties;
};

/**
 * The standing acquisition offer: 50% off the first order. This is the only place
 * the brand states a saving as a percentage, and the only offer it runs. It is a
 * permanent term, not a promotion, so it never carries a deadline or a countdown.
 * Never show it without the ongoing price beside it.
 */
export function OfferFlag({
  percent = 50, label = "off first order", tone = "ink", size = "md", style, ...rest
}: OfferFlagProps) {
  const solid = tone === "ink";
  const sm = size === "sm";
  return (
    <span
      {...rest}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: sm ? 32 : 40,
        padding: sm ? "0 12px" : "0 16px",
        background: solid ? "var(--ink)" : "var(--sun)",
        color: solid ? "var(--white)" : "var(--ink)",
        borderRadius: "var(--radius-xs)",
        fontFamily: "var(--font-text)",
        fontWeight: 800,
        fontSize: sm ? "var(--size-meta)" : "var(--size-body)",
        letterSpacing: "var(--tracking-caps)",
        textTransform: "uppercase",
        lineHeight: 1,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {percent + "% " + label}
    </span>
  );
}
