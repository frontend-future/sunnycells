"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@/components/core/Icon";
import styles from "./fz-label.module.css";

/** The Supplement Facts panel, opened from "View Nutrition Label". */
export function FridayZoomiesLabelDrawerV2({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  /* Locks the page behind it, closes on Escape, and hands focus back to whatever
     opened it. */
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div className={styles.drawer} role="dialog" aria-modal="true" aria-labelledby="fz-label-title">
        <div className={styles.head} id="fz-label-title">
          Nutrition Label
          <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Close nutrition label">
            <Icon name="x" size={24} />
          </button>
        </div>
        <div className={styles.scroll}>
          <h3 className={styles.title}>Supplement Facts</h3>
          <div className={styles.serving}>
            <span><strong>Serving Size:</strong> 1 pump (1 mL)</span>
            <span><strong>Net Contents:</strong> 6 fl oz (180 mL)</span>
          </div>
          <div className={styles.bar}>
            <span>Ingredients</span>
            <span>% of formula</span>
          </div>
          <table className={styles.table}>
            <tbody>
              <tr><td>Salmon oil (EPA and DHA about 20% of the oil)</td><td>99.8%</td></tr>
              <tr><td>Mixed tocopherols (natural vitamin E)</td><td>0.2%</td></tr>
            </tbody>
          </table>
          <ul className={styles.notes}>
            <li><strong>Daily amount by weight:</strong> Up to 40 lbs: 1 pump. Over 40 lbs: 2 pumps. Pump over their food once a day. Give half for the first week.</li>
            <li>Contains fish.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
