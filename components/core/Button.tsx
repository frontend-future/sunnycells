"use client";

import { useState } from "react";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

const HEIGHTS = { sm: "var(--control-h-sm)", md: "var(--control-h-md)", lg: "var(--control-h-lg)" };
const FONTS = { sm: "17px", md: "18px", lg: "20px" };
const PADS = { sm: "0 20px", md: "0 28px", lg: "0 36px" };

/* Family colour to button fill, so an add-to-bag button can match its product
   block. Buttons are 12px corners, never pills. */
const FILLS = {
  primary: { bg: "var(--action-primary-bg)", fg: "var(--action-primary-fg)", press: "var(--action-primary-bg-press)", border: "transparent" },
  accent: { bg: "var(--action-accent-bg)", fg: "var(--action-accent-fg)", press: "var(--action-accent-bg-press)", border: "transparent" },
  zest: { bg: "var(--zest)", fg: "var(--ink)", press: "var(--zest-press)", border: "transparent" },
  sky: { bg: "var(--sky)", fg: "var(--ink)", press: "var(--sky-press)", border: "transparent" },
  sprout: { bg: "var(--sprout)", fg: "var(--ink)", press: "var(--sprout-press)", border: "transparent" },
  /* Hover and press on the unfilled buttons land on --sun-tint rather than a neutral
     grey, so every interactive surface in the system warms to the brand yellow. */
  outline: { bg: "transparent", fg: "var(--ink)", press: "var(--sun-tint)", border: "var(--ink)" },
  quiet: { bg: "transparent", fg: "var(--ink)", press: "var(--sun-tint)", border: "transparent" },
} as const;

export type ButtonVariant = keyof typeof FILLS;
export type ButtonSize = keyof typeof HEIGHTS;

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  /** Renders as `LABEL · $49`. Integers only, the component rounds. */
  price?: number;
  style?: CSSProperties;
};

export function Button({
  children, variant = "primary", size = "md", fullWidth = false, disabled = false,
  iconLeft, iconRight, price, style, ...rest
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const f = FILLS[variant];

  return (
    <button
      {...rest}
      disabled={disabled}
      style={{
        appearance: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-3)",
        width: fullWidth ? "100%" : undefined,
        minHeight: HEIGHTS[size],
        /* A full width button centres its own label, so the side padding buys nothing
           and only inflates min-content. At 36px a side it made "TRY NOW AND SAVE 50%"
           353px wide, which is more than a 360px phone has, and a nowrap label that
           cannot shrink drags the whole page into horizontal scroll. */
        padding: fullWidth ? "0 12px" : PADS[size],
        fontFamily: "var(--font-text)",
        fontSize: FONTS[size],
        fontWeight: 800,
        letterSpacing: "var(--tracking-caps)",
        textTransform: "uppercase",
        textDecoration: "none",
        lineHeight: 1,
        whiteSpace: "nowrap",
        color: disabled ? "var(--action-disabled-fg)" : f.fg,
        background: disabled ? "var(--action-disabled-bg)" : hover || down ? f.press : f.bg,
        border: "2px solid " + (disabled ? "transparent" : f.border),
        borderRadius: "var(--radius-button)",
        cursor: disabled ? "not-allowed" : "pointer",
        transform: down && !disabled ? "scale(var(--press-scale))" : "none",
        transition:
          "background var(--duration-fast) var(--ease-standard), transform var(--duration-instant) var(--ease-standard)",
        ...style,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setDown(false); }}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
    >
      {iconLeft ? <Icon name={iconLeft} size={size === "lg" ? 24 : 20} /> : null}
      <span>{children}</span>
      {price != null ? (
        <>
          <span aria-hidden="true" style={{ opacity: 0.45, fontWeight: 700 }}>·</span>
          <span>{"$" + Math.round(price)}</span>
        </>
      ) : null}
      {iconRight ? <Icon name={iconRight} size={size === "lg" ? 24 : 20} /> : null}
    </button>
  );
}
