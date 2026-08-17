"use client";

import type { CSSProperties, HTMLAttributes } from "react";

export type TabItem = string | { value: string; label: string };

export type TabsProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  items: TabItem[];
  value: string;
  onChange?: (value: string) => void;
  style?: CSSProperties;
};

export function Tabs({ items, value, onChange, style, ...rest }: TabsProps) {
  return (
    <div
      {...rest}
      role="tablist"
      style={{
        display: "flex",
        gap: "var(--space-8)",
        borderBottom: "1px solid var(--border-hairline)",
        ...style,
      }}
    >
      {items.map((it) => {
        const val = typeof it === "string" ? it : it.value;
        const lab = typeof it === "string" ? it : it.label;
        const on = val === value;
        return (
          <button
            key={val}
            role="tab"
            aria-selected={on}
            type="button"
            onClick={() => onChange?.(val)}
            style={{
              appearance: "none",
              background: "transparent",
              border: 0,
              borderBottom: "3px solid " + (on ? "var(--ink)" : "transparent"),
              padding: "0 0 14px",
              marginBottom: -1,
              minHeight: "var(--tap-min)",
              fontFamily: "var(--font-text)",
              fontSize: "var(--size-body)",
              fontWeight: on ? 800 : 600,
              color: on ? "var(--ink)" : "var(--ink-60)",
              cursor: "pointer",
              transition: "color var(--duration-fast) var(--ease-standard)",
            }}
          >
            {lab}
          </button>
        );
      })}
    </div>
  );
}
