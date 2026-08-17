"use client";

import Link from "next/link";
import { useState } from "react";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

export type NavLinkProps = Omit<ComponentProps<typeof Link>, "children"> & {
  children: ReactNode;
  active?: boolean;
  size?: "sm" | "md";
  style?: CSSProperties;
};

/** Header and footer link. Black text, 2px underline on hover, never a colour
    change. Nav labels are sentence case. */
export function NavLink({ children, href, active = false, size = "md", style, ...rest }: NavLinkProps) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      {...rest}
      href={href}
      aria-current={active ? "page" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        minHeight: "var(--tap-min)",
        fontFamily: "var(--font-text)",
        fontSize: size === "sm" ? "var(--size-meta)" : "var(--size-body)",
        fontWeight: active ? 800 : 600,
        color: "var(--text-link)",
        textDecoration: "none",
        borderBottom: "2px solid " + (active || hover ? "var(--ink)" : "transparent"),
        paddingBottom: 2,
        transition: "border-color var(--duration-fast) var(--ease-standard)",
        ...style,
      }}
    >
      {children}
    </Link>
  );
}
