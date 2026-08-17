"use client";

import { useState } from "react";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

export type TagProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: ReactNode;
  selected?: boolean;
  style?: CSSProperties;
};

/** Pill-shaped filter chip. Tags, chips, and rating badges are the only pills in
    the system. A pill-shaped button is off-brand. */
export function Tag({ children, selected = false, onClick, style, ...rest }: TagProps) {
  const [hover, setHover] = useState(false);
  const interactive = typeof onClick === "function";
  return (
    <button
      {...rest}
      type="button"
      onClick={onClick}
      aria-pressed={interactive ? selected : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        appearance: "none",
        display: "inline-flex",
        alignItems: "center",
        minHeight: 48,
        padding: "0 22px",
        fontFamily: "var(--font-text)",
        fontSize: "var(--size-body)",
        fontWeight: 600,
        color: "var(--ink)",
        background: selected || (hover && interactive) ? "var(--sun-tint)" : "var(--white)",
        border: selected ? "2px solid var(--ink)" : "1px solid var(--border-hairline)",
        borderRadius: "var(--radius-pill)",
        cursor: interactive ? "pointer" : "default",
        transition: "background var(--duration-fast) var(--ease-standard)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
