import Link from "next/link";
import { Fragment } from "react";
import type { CSSProperties, HTMLAttributes } from "react";
import { Icon } from "@/components/core/Icon";

export type BreadcrumbItem = { label: string; href?: string };

export type BreadcrumbProps = HTMLAttributes<HTMLElement> & {
  items: BreadcrumbItem[];
  style?: CSSProperties;
};

export function Breadcrumb({ items, style, ...rest }: BreadcrumbProps) {
  return (
    <nav
      {...rest}
      aria-label="Breadcrumb"
      style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap", ...style }}
    >
      {items.map((it, i) => (
        <Fragment key={it.label}>
          {/* --ink-40 is furniture only, never text. A separator glyph is furniture. */}
          {i > 0 ? (
            <span style={{ color: "var(--ink-40)", display: "flex" }}>
              <Icon name="chevron-right" size={18} />
            </span>
          ) : null}
          {i === items.length - 1 ? (
            <span aria-current="page" style={{ fontSize: "var(--size-meta)", fontWeight: 700, color: "var(--ink)" }}>
              {it.label}
            </span>
          ) : (
            <Link
              href={it.href || "#"}
              style={{ fontSize: "var(--size-meta)", fontWeight: 600, color: "var(--ink-60)", textDecoration: "none" }}
            >
              {it.label}
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
