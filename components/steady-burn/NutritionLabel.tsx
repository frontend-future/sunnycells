"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@/components/core/Icon";
import { FACTS, PRODUCT } from "@/lib/products/steady-burn";
import styles from "./nutrition-label.module.css";

/**
 * The supplement facts panel, behind the "View nutrition label" link.
 *
 * Unlike SC-24's, every figure here comes off the real spec. It still wants a
 * regulatory read before it prints: the FDA reads serving size, %DV, ingredient order
 * and the allergen statement literally.
 */
export function NutritionLabel({ onClose }: { onClose: () => void }) {
  const sheet = useRef<HTMLDivElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement | null>(null);

  /* Escape closes it, focus starts inside it, and the page behind does not scroll
     while it is open. */
  useEffect(() => {
    closeBtn.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !sheet.current) return;
      const focusable = sheet.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className={styles.sheet}
        ref={sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="facts-title"
      >
        <div className={styles.head}>
          <p className={styles.headTitle} id="facts-title">Nutrition label</p>
          <button ref={closeBtn} type="button" className={styles.close} onClick={onClose} aria-label="Close nutrition label">
            <Icon name="x" size={24} strokeWidth={2.5} />
          </button>
        </div>

        <div className={styles.scroll}>
          <div className={styles.panel}>
            <p className={styles.kicker}>No added sugar</p>
            <p className={styles.brand}>{PRODUCT.shortName}</p>

            <p className={styles.spec}><strong>Serving size:</strong> {FACTS.servingSize}</p>
            <p className={styles.spec}><strong>Servings per container:</strong> {FACTS.servingsPerContainer}</p>
            <p className={styles.spec}><strong>Suggested use:</strong> {FACTS.suggestedUse}</p>

            <h3 className={styles.calloutTitle}>{FACTS.callout.headline}</h3>
            <div className={styles.calloutRow}>
              {FACTS.callout.parts.map((p) => (
                <span key={p.label}>
                  <span className={styles.calloutN}>{p.n}</span>
                  <span className={styles.calloutL}>{p.label}</span>
                </span>
              ))}
            </div>

            <h3 className={styles.groupTitle}>What is in it</h3>
            <div className={styles.chips}>
              {FACTS.chips.map((c) => <span key={c} className={styles.chip}>{c}</span>)}
            </div>

            <h3 className={styles.groupTitle}>Clean ingredients</h3>
            <div className={styles.chips}>
              {FACTS.cleanChips.map((c) => <span key={c} className={styles.chip}>{c}</span>)}
            </div>

            <h3 className={styles.groupTitle}>Supplement facts</h3>
            <div className={styles.facts}>
              <div className={styles.factsHead}>
                <span>Amount per serving</span>
                <span>% DV</span>
              </div>
              {FACTS.rows.map((r) => (
                <div className={styles.row} key={r.name}>
                  <span
                    className={`${styles.rowName} ${
                      "indent" in r && r.indent === 1 ? styles.rowIndent1 : ""
                    } ${"indent" in r && r.indent === 2 ? styles.rowIndent2 : ""}`}
                  >
                    {r.name}
                  </span>
                  <span className={styles.rowRight}>
                    <span>{r.amount}</span>
                    <span className={styles.dv}>{r.dv}</span>
                  </span>
                </div>
              ))}
              <p className={styles.blend}>
                <strong>Per gummy:</strong>{" "}
                {FACTS.spec.map((x) => `${x.label} ${x.value}`).join(" · ")}
              </p>
              {FACTS.footnotes.map((f) => <p className={styles.foot} key={f}>{f}</p>)}
            </div>

            <div className={styles.warn}>{FACTS.caution}</div>
            <p className={styles.legal}>
              These statements have not been evaluated by the Food and Drug Administration.
              This product is not intended to diagnose, treat, cure or prevent any disease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
