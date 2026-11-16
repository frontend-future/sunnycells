"use client";

import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { useEffect, useId, useState } from "react";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { trackMetaEvent } from "@/lib/meta";
import type { QuizConfig, Step } from "@/lib/quiz/types";
import { FitMedia } from "./FitMedia";
import { StickyCta } from "./StickyCta";

/** `**bold**` markers in a copy string. */
function bold(text: string) {
  return text.split(/(\*\*.+?\*\*)/).map((part, i) =>
    part.startsWith("**") ? <strong key={i} style={{ fontWeight: 800 }}>{part.slice(2, -2)}</strong> : part,
  );
}

/** The last step of a quiz that ends on a discount: the result, then a button that opens
    a panel with the code. The code is already applied at checkout, so the panel says so and
    asks for nothing. Its button hands off to the quiz's `resultsPath`. */
export function RevealBody({ step, config }: { step: Extract<Step, { kind: "reveal" }>; config: QuizConfig }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const titleId = useId();

  /* Reaching the result is the finish line of the quiz, so it is the Lead: once per visit, however
     many times the screen remounts or they come back to it. */
  useEffect(() => {
    try {
      const key = `${config.id}.lead`;
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, "1");
    } catch {
      /* No storage: send it anyway rather than lose the event. */
    }
    trackMetaEvent("Lead", { content_name: config.id });
  }, [config.id]);

  const track = (event: string) => {
    try { if (posthog.__loaded) posthog.capture(event, { quiz: config.id }); } catch { /* analytics never blocks the quiz */ }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "var(--space-6)" }}>
      {step.image ? <FitMedia src={step.image.src} alt={step.image.alt} size={step.image.size} /> : null}
      <p style={{ margin: 0, textAlign: "center", fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>{bold(step.body)}</p>
      <StickyCta>
        <Button variant="accent" size="lg" fullWidth iconRight="arrow-right" onClick={() => { track("quiz_code_revealed"); setOpen(true); }}>
          {step.cta}
        </Button>
      </StickyCta>

      {open ? (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "var(--page-gutter-mobile)",
            background: "rgba(20, 33, 61, 0.6)",
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 440,
              padding: "var(--space-8) var(--space-6) var(--space-6)",
              background: "var(--white)",
              borderRadius: "var(--radius-sheet)",
              boxShadow: "0 24px 48px rgba(20, 33, 61, 0.35)",
              textAlign: "center",
            }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              style={{
                appearance: "none",
                position: "absolute",
                top: 8,
                right: 8,
                width: "var(--tap-min)",
                height: "var(--tap-min)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: 0,
                color: "var(--ink)",
                cursor: "pointer",
              }}
            >
              <Icon name="x" size={24} />
            </button>
            <h2
              id={titleId}
              style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--size-h3)", letterSpacing: "var(--tracking-heading)", lineHeight: "var(--leading-snug)" }}
            >
              {step.panelTitle}
            </h2>
            <div
              style={{
                margin: "var(--space-5) 0 var(--space-3)",
                padding: "var(--space-4)",
                background: "var(--sun-tint)",
                border: "2px dashed var(--ink)",
                borderRadius: "var(--radius-input)",
                fontFamily: "var(--font-display)",
                fontSize: "var(--size-h3)",
                fontWeight: 800,
                letterSpacing: "0.08em",
              }}
            >
              {step.code}
            </div>
            <p style={{ margin: "0 0 var(--space-6)", display: "flex", gap: "var(--space-5)", alignItems: "center", justifyContent: "center", fontSize: "var(--size-body)", fontWeight: 700, lineHeight: 1.35 }}>
              <span aria-hidden="true" style={{ flex: "none", width: 26, height: 26, borderRadius: "50%", background: "var(--ink)", color: "var(--sun)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="check" size={16} strokeWidth={3.5} />
              </span>
              <span>{step.codeNote}</span>
            </p>
            <Button variant="accent" size="lg" fullWidth iconRight="arrow-right" autoFocus onClick={() => { track("quiz_plan_clicked"); router.push(config.resultsPath); }}>
              {step.panelCta}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
