"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/core/Icon";

/** A full-width answer card. 12px corners like every other control in the system,
    never the pill the reference uses. */
export function OptionButton({
  label, selected = false, onClick, icon = "arrow-right",
}: {
  label: string;
  selected?: boolean;
  onClick: () => void;
  /** A single-select step reads as "tap to advance", so it keeps the arrow. A
      multi-select step passes "check" (or null for no icon at all), since tapping
      here toggles rather than navigates. */
  icon?: IconName | null;
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
      {icon ? <Icon name={icon} size={24} /> : null}
    </button>
  );
}
