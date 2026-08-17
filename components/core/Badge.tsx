import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

const TONES = {
  ink: { bg: "var(--ink)", fg: "var(--white)" },
  sun: { bg: "var(--sun)", fg: "var(--ink)" },
  zest: { bg: "var(--zest)", fg: "var(--ink)" },
  sky: { bg: "var(--sky)", fg: "var(--ink)" },
  sprout: { bg: "var(--sprout)", fg: "var(--ink)" },
  success: { bg: "var(--status-success-tint)", fg: "var(--status-success)" },
  error: { bg: "var(--status-error-tint)", fg: "var(--status-error)" },
} as const;

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: keyof typeof TONES;
  style?: CSSProperties;
};

/** Small, loud, rectangular label: "BESTSELLER", "NEW". One of only three
    all-caps elements in the system, alongside display headlines and buttons. */
export function Badge({ children, tone = "ink", style, ...rest }: BadgeProps) {
  const t = TONES[tone];
  return (
    <span
      {...rest}
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 32,
        padding: "0 12px",
        background: t.bg,
        color: t.fg,
        fontFamily: "var(--font-label)",
        fontSize: "var(--size-meta)",
        fontWeight: 600,
        letterSpacing: "var(--tracking-caps)",
        textTransform: "uppercase",
        borderRadius: "var(--radius-xs)",
        lineHeight: 1,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
