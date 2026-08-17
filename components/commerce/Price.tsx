import type { CSSProperties, HTMLAttributes } from "react";
import { formatPrice } from "@/lib/price";

const SIZES = { sm: 22, md: 30, lg: 44, xl: 60 } as const;

export type PriceProps = HTMLAttributes<HTMLDivElement> & {
  value: number;
  compareAt?: number;
  size?: keyof typeof SIZES;
  note?: string;
  align?: "left" | "right";
  style?: CSSProperties;
};

/**
 * THE PRICE RULE: integers only. This component rounds and never renders cents.
 * Savings read in dollars ("Save $10"), never percentages. Do not build an
 * alternative price display anywhere in the system.
 */
export function Price({
  value, compareAt, size = "md", note, align = "left", style, ...rest
}: PriceProps) {
  const px = SIZES[size];
  const saving = compareAt != null ? Math.round(compareAt) - Math.round(value) : 0;
  return (
    <div
      {...rest}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "right" ? "flex-end" : "flex-start",
        gap: 4,
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-3)" }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: px,
            letterSpacing: "var(--tracking-display)",
            lineHeight: 1,
            color: "var(--ink)",
          }}
        >
          {formatPrice(value)}
        </span>
        {compareAt != null && saving > 0 ? (
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: Math.round(px * 0.6),
              color: "var(--ink-60)",
              textDecoration: "line-through",
              letterSpacing: "-0.02em",
            }}
          >
            {formatPrice(compareAt)}
          </span>
        ) : null}
      </div>
      {note || saving > 0 ? (
        <span
          style={{
            fontSize: "var(--size-meta)",
            fontWeight: 700,
            color: saving > 0 ? "var(--status-success)" : "var(--ink-60)",
          }}
        >
          {note || "Save " + formatPrice(saving)}
        </span>
      ) : null}
    </div>
  );
}
