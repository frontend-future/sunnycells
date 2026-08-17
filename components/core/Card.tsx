"use client";

import { useState } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  hoverable?: boolean;
  padded?: boolean;
  tone?: "white" | "shell" | "ink";
  style?: CSSProperties;
};

/** White surface, 1px hairline, 16px corners, no shadow at rest. Structure comes
    from the hairline and the colour block, never from depth. */
export function Card({
  children, hoverable = false, padded = true, tone = "white", style, ...rest
}: CardProps) {
  const [hover, setHover] = useState(false);
  const bg =
    tone === "shell" ? "var(--surface-sunk)" : tone === "ink" ? "var(--surface-invert)" : "var(--surface-card)";
  return (
    <div
      {...rest}
      onMouseEnter={hoverable ? () => setHover(true) : undefined}
      onMouseLeave={hoverable ? () => setHover(false) : undefined}
      style={{
        background: bg,
        color: tone === "ink" ? "var(--white)" : "var(--ink)",
        border: "1px solid " + (tone === "ink" ? "var(--ink)" : "var(--border-hairline)"),
        borderRadius: "var(--radius-card)",
        padding: padded ? "var(--space-6)" : 0,
        overflow: "hidden",
        boxShadow: hover ? "var(--shadow-card)" : "none",
        transform: hover ? "translateY(var(--hover-lift))" : "none",
        transition:
          "box-shadow var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
