import type { ReactNode } from "react";

/**
 * Keeps the primary action on screen when the content above it is taller than the
 * phone. Measured on a 375px viewport, the info steps and the results screens both
 * pushed their button 200 to 900px below the fold without this.
 */
export function StickyCta({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        marginTop: "auto",
        paddingTop: "var(--space-5)",
        paddingBottom: "var(--space-5)",
        /* No fill and no rule: the button floats on the page rather than sitting in a
           bar of its own. Content passes behind it as you scroll. */
        background: "transparent",
      }}
    >
      {children}
    </div>
  );
}
