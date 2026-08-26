import type { ReactNode } from "react";
import styles from "./even-energy.module.css";

/** An anchor wearing the button's clothes. Button renders a <button>, and an
    anchor inside one is invalid, so link CTAs use this instead. */
export function EvenCta({
  children, href = "#buy", tone = "primary", size = "lg",
}: {
  children: ReactNode;
  href?: string;
  tone?: "primary" | "accent";
  size?: "sm" | "lg";
}) {
  return (
    <a
      href={href}
      className={[styles.cta, tone === "accent" && styles.ctaAccent, size === "sm" && styles.ctaSm]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </a>
  );
}
