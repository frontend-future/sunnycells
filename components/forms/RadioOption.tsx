"use client";

import { useState } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type RadioOptionProps = Omit<HTMLAttributes<HTMLLabelElement>, "onSelect"> & {
  label: ReactNode;
  description?: ReactNode;
  price?: number;
  priceNote?: string;
  selected?: boolean;
  onSelect?: () => void;
  name?: string;
  badge?: ReactNode;
  style?: CSSProperties;
};

/** Large selectable card for a small set of priced or described choices.
    Purchase mode is not one of them: the brand sells subscriptions only, and the
    buy box is SubscriptionBox. Use this for cadence, bundle size, or flavour. */
export function RadioOption({
  label, description, price, priceNote, selected = false, onSelect, name, badge, style, ...rest
}: RadioOptionProps) {
  const [hover, setHover] = useState(false);
  return (
    <label
      {...rest}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "flex",
        gap: "var(--space-4)",
        alignItems: "flex-start",
        padding: "var(--space-5)",
        background: selected || hover ? "var(--sun-tint)" : "var(--white)",
        border: "2px solid " + (selected ? "var(--ink)" : "var(--border-hairline)"),
        borderRadius: "var(--radius-md)",
        cursor: "pointer",
        transition:
          "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
        ...style,
      }}
    >
      <input
        type="radio"
        name={name}
        checked={selected}
        onChange={() => onSelect?.()}
        style={{ position: "absolute", opacity: 0, width: 1, height: 1 }}
      />
      <span
        aria-hidden="true"
        style={{
          width: 28,
          height: 28,
          flex: "none",
          marginTop: 2,
          borderRadius: "50%",
          border: "2px solid " + (selected ? "var(--ink)" : "var(--border-input)"),
          background: "var(--white)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selected ? <span style={{ width: 14, height: 14, borderRadius: "50%", background: "var(--ink)" }} /> : null}
      </span>
      <span style={{ flex: 1 }}>
        <span style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
          <span style={{ fontSize: "var(--size-body)", fontWeight: 700 }}>{label}</span>
          {badge}
        </span>
        {description ? (
          <span
            style={{
              display: "block",
              fontSize: "var(--size-meta)",
              color: "var(--ink-60)",
              marginTop: 4,
              lineHeight: 1.45,
            }}
          >
            {description}
          </span>
        ) : null}
      </span>
      {price != null ? (
        <span style={{ textAlign: "right", flex: "none" }}>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 26,
              letterSpacing: "-0.02em",
            }}
          >
            {"$" + Math.round(price)}
          </span>
          {priceNote ? (
            <span style={{ display: "block", fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>{priceNote}</span>
          ) : null}
        </span>
      ) : null}
    </label>
  );
}
