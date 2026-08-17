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
        background: "var(--white)",
        borderTop: "1px solid var(--border-hairline)",
        /* Bleed to the edges so the bar reads as chrome, while the button keeps the
           page gutter. */
        marginLeft: "calc(var(--page-gutter-mobile) * -1)",
        marginRight: "calc(var(--page-gutter-mobile) * -1)",
        paddingLeft: "var(--page-gutter-mobile)",
        paddingRight: "var(--page-gutter-mobile)",
      }}
    >
      {children}
    </div>
  );
}
