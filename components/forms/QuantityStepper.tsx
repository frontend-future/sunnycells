"use client";

import type { CSSProperties, HTMLAttributes } from "react";
import { IconButton } from "@/components/core/IconButton";

export type QuantityStepperProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  style?: CSSProperties;
};

export function QuantityStepper({
  value = 1, min = 1, max = 12, onChange, style, ...rest
}: QuantityStepperProps) {
  const set = (n: number) => onChange?.(Math.min(max, Math.max(min, n)));
  return (
    <div
      {...rest}
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "2px solid var(--border-input)",
        borderRadius: "var(--radius-input)",
        height: "var(--control-h-md)",
        ...style,
      }}
    >
      <IconButton
        icon="minus"
        label="Decrease quantity"
        size="sm"
        disabled={value <= min}
        onClick={() => set(value - 1)}
        style={{ borderRadius: 0 }}
      />
      <span
        aria-live="polite"
        style={{
          minWidth: 48,
          textAlign: "center",
          fontSize: "var(--size-body)",
          fontWeight: 700,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </span>
      <IconButton
        icon="plus"
        label="Increase quantity"
        size="sm"
        disabled={value >= max}
        onClick={() => set(value + 1)}
        style={{ borderRadius: 0 }}
      />
    </div>
  );
}
