"use client";

import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";

/**
 * Shared "no provider to call" outcome for every mock payment path on a checkout:
 * the card form (CardForm) and any express-checkout button that fires the same
 * Purchase signal without ever collecting a card. Same copy and treatment either
 * way, so a shopper sees one consistent story regardless of which button she used.
 */
export function OutOfStockNotice({ onRetry }: { onRetry?: () => void }) {
  return (
    <div
      role="alert"
      style={{
        border: "2px solid var(--ink)",
        borderRadius: "var(--radius-card)",
        padding: "var(--space-6)",
        textAlign: "center",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "var(--status-error-tint)",
          color: "var(--status-error)",
        }}
      >
        <Icon name="x" size={28} strokeWidth={3} />
      </span>
      <h3 style={{ margin: "var(--space-4) 0 var(--space-2)", fontFamily: "var(--font-display)", fontSize: "var(--size-h4)", fontWeight: 900, letterSpacing: "var(--tracking-heading)" }}>
        Back in stock soon
      </h3>
      <p style={{ margin: "0 auto", maxWidth: 420, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)", color: "var(--ink-80)" }}>
        We could not complete your order because this size sold out while you were
        checking out. Your card has not been charged. We will email you the day it is
        back.
      </p>
      {onRetry ? (
        <div style={{ marginTop: "var(--space-5)" }}>
          <Button variant="outline" onClick={onRetry}>
            Try again
          </Button>
        </div>
      ) : null}
    </div>
  );
}
