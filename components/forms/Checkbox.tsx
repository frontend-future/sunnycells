"use client";

import type { CSSProperties, InputHTMLAttributes, ReactNode } from "react";
import { Icon } from "@/components/core/Icon";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> & {
  label: ReactNode;
  description?: ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  style?: CSSProperties;
};

export function Checkbox({
  label, description, checked = false, onChange, disabled = false, style, ...rest
}: CheckboxProps) {
  return (
    <label
      style={{
        position: "relative",
        display: "flex",
        gap: "var(--space-4)",
        alignItems: "flex-start",
        minHeight: "var(--tap-min)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      <input
        {...rest}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 1, height: 1 }}
      />
      <span
        aria-hidden="true"
        style={{
          width: 28,
          height: 28,
          flex: "none",
          marginTop: 2,
          borderRadius: "var(--radius-xs)",
          border: "2px solid " + (checked ? "var(--ink)" : "var(--border-input)"),
          background: checked ? "var(--ink)" : "var(--white)",
          color: "var(--white)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background var(--duration-fast) var(--ease-standard)",
        }}
      >
        {checked ? <Icon name="check" size={18} strokeWidth={3} /> : null}
      </span>
      <span>
        <span style={{ display: "block", fontSize: "var(--size-body)", fontWeight: 600, lineHeight: 1.4 }}>
          {label}
        </span>
        {description ? (
          <span style={{ display: "block", fontSize: "var(--size-meta)", color: "var(--ink-60)", marginTop: 4 }}>
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
