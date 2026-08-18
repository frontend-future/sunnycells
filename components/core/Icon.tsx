"use client";

import {
  ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, ChevronLeft, ChevronRight, Dna, Droplet,
  FileText, Leaf,
  Mars, Menu, Minus, Percent, Plus, Repeat, Search, ShieldCheck, ShoppingBag, Star, Truck, User,
  Venus, WheatOff, X, ZapOff,
} from "lucide-react";
import type { CSSProperties } from "react";

/* Lucide is the flagged stand-in icon set: no brand icons were supplied.
   The working set is deliberately closed. Adding an icon is a design decision,
   so it happens here, not at a call site. */
const ICONS = {
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "book-open": BookOpen,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  dna: Dna,
  droplet: Droplet,
  "file-text": FileText,
  leaf: Leaf,
  mars: Mars,
  menu: Menu,
  minus: Minus,
  percent: Percent,
  plus: Plus,
  repeat: Repeat,
  search: Search,
  "shield-check": ShieldCheck,
  "shopping-bag": ShoppingBag,
  star: Star,
  truck: Truck,
  user: User,
  venus: Venus,
  "wheat-off": WheatOff,
  x: X,
  "zap-off": ZapOff,
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
