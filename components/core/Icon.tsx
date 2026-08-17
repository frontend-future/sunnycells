"use client";

import {
  ArrowRight, Check, ChevronDown, ChevronRight, Menu, Minus, Plus, Repeat,
  Search, ShieldCheck, ShoppingBag, Star, Truck, User, X,
} from "lucide-react";
import type { CSSProperties } from "react";

/* Lucide is the flagged stand-in icon set: no brand icons were supplied.
   The working set is deliberately closed. Adding an icon is a design decision,
   so it happens here, not at a call site. */
const ICONS = {
  "arrow-right": ArrowRight,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  menu: Menu,
  minus: Minus,
  plus: Plus,
  repeat: Repeat,
  search: Search,
  "shield-check": ShieldCheck,
  "shopping-bag": ShoppingBag,
  star: Star,
  truck: Truck,
  user: User,
  x: X,
} as const;

export type IconName = keyof typeof ICONS;

export type IconProps = {
  name: IconName;
  size?: number;
  /** 2px, always. 1.5px reads too thin next to 500-weight type. */
  strokeWidth?: number;
  fill?: string;
  /** Supply only when the icon carries meaning on its own. */
  title?: string;
  style?: CSSProperties;
  className?: string;
};

export function Icon({
  name, size = 24, strokeWidth = 2, fill = "none", title, style, className,
}: IconProps) {
  const Glyph = ICONS[name];
  return (
    <Glyph
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      fill={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      className={className}
      style={{ display: "block", flex: "none", color: "currentColor", ...style }}
    />
  );
}
