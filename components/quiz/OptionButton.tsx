"use client";

import { useState } from "react";
import { Icon } from "@/components/core/Icon";

/** A full-width answer card. 12px corners like every other control in the system,
    never the pill the reference uses. */
export function OptionButton({
  label, selected = false, indicator = "arrow", onClick,
}: {
  label: string;
  selected?: boolean;
  /** "check" for select-all-that-apply, where an arrow would promise navigation the
      tap does not do. Defaults to the arrow every single-select step uses. */
  indicator?: "arrow" | "check";
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        appearance: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-4)",
        width: "100%",
        minHeight: 76,
        padding: "var(--space-4) var(--space-5)",
        textAlign: "left",
        fontFamily: "var(--font-text)",
        fontSize: "var(--size-body)",
        fontWeight: 600,
        lineHeight: 1.35,
        color: "var(--ink)",
        background: selected || hover ? "var(--sun-tint)" : "var(--white)",
        border: selected ? "2px solid var(--ink)" : "1px solid var(--border-hairline)",
        borderRadius: "var(--radius-md)",
        cursor: "pointer",
        transition: "background var(--duration-fast) var(--ease-standard)",
      }}
    >
      <span>{label}</span>
      {indicator === "check" ? (
        <span
          aria-hidden="true"
          style={{
            flex: "none", width: 26, height: 26, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: selected ? "var(--ink)" : "transparent",
            border: selected ? "none" : "2px solid var(--border-hairline)",
            color: "var(--sun)",
          }}
        >
          {selected ? <Icon name="check" size={16} strokeWidth={3.5} /> : null}
        </span>
      ) : (
        <Icon name="arrow-right" size={24} />
      )}
    </button>
  );
}
