"use client";

import { useState } from "react";
import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { Icon, type IconName } from "./Icon";

/* Every size clears --tap-min (48px). Icon-only controls always carry a label. */
const SIZES = { sm: 48, md: 52, lg: 56 } as const;

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  icon: IconName;
  label: string;
  size?: keyof typeof SIZES;
  variant?: "quiet" | "solid" | "outline";
  style?: CSSProperties;
};

export function IconButton({
  icon, label, size = "md", variant = "quiet", disabled = false, style, ...rest
}: IconButtonProps) {
  const [hover, setHover] = useState(false);
  const px = SIZES[size];
  const solid = variant === "solid";
  return (
    <button
      {...rest}
      type="button"
      aria-label={label}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        appearance: "none",
        width: px,
        height: px,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-button)",
        border: variant === "outline" ? "2px solid var(--ink)" : "2px solid transparent",
        background: disabled
          ? "var(--action-disabled-bg)"
          : solid
            ? hover ? "var(--ink-80)" : "var(--ink)"
            : hover ? "var(--ink-10)" : "transparent",
        color: disabled ? "var(--action-disabled-fg)" : solid ? "var(--white)" : "var(--ink)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background var(--duration-fast) var(--ease-standard)",
        ...style,
      }}
    >
      <Icon name={icon} size={size === "sm" ? 22 : 26} />
    </button>
  );
}
