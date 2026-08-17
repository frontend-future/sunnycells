import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "@/components/core/Icon";

const TONES = {
  ink: { bg: "var(--ink)", fg: "var(--white)" },
  sun: { bg: "var(--sun)", fg: "var(--ink)" },
  success: { bg: "var(--status-success-tint)", fg: "var(--status-success)" },
  error: { bg: "var(--status-error-tint)", fg: "var(--status-error)" },
} as const;

export type BannerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  tone?: keyof typeof TONES;
  icon?: IconName;
  onDismiss?: () => void;
  style?: CSSProperties;
};

/** Full-bleed announcement strip for shipping terms, order status, service
    notices. It carries the standing offer, never a countdown. */
export function Banner({ children, tone = "ink", icon, onDismiss, style, ...rest }: BannerProps) {
  const t = TONES[tone];
  return (
    <div
      {...rest}
      role="status"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-3)",
        minHeight: 52,
        padding: "10px 20px",
        background: t.bg,
        color: t.fg,
        fontSize: "var(--size-meta)",
        fontWeight: 700,
        letterSpacing: "var(--tracking-caps)",
        textTransform: "uppercase",
        textAlign: "center",
        ...style,
      }}
    >
      {icon ? <Icon name={icon} size={20} /> : null}
      <span>{children}</span>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            marginLeft: "auto",
            appearance: "none",
            background: "transparent",
            border: 0,
            color: "inherit",
            cursor: "pointer",
            display: "flex",
            padding: 8,
          }}
        >
          <Icon name="x" size={20} />
        </button>
      ) : null}
    </div>
  );
}
