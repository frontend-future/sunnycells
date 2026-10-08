"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/core/Icon";
import { CHEW_ACTIVES, CHEW_DOSING, CHEW_OTHER, CHEW_SERVING, PRODUCT } from "@/lib/products/dog-itch";
import styles from "./fz-label.module.css";

/* Spray panel: the five actives with what each does, then the base as fine print. */
const SPRAY_ACTIVES = [
  ["Aloe barbadensis extract", "Soothes and hydrates irritated, itchy skin and gives a mild cooling effect"],
  ["Sodium bicarbonate", "Neutralizes odor and calms itch by buffering skin pH"],
  ["Hydrolyzed silk", "Small silk proteins that bind to hair and skin, leaving the coat softer, shinier, and better moisturized"],
  ["Chamomile extract", "A botanical with calming, anti-redness properties that helps settle inflamed or sensitive skin"],
  ["Peppermint oil", "Provides a cooling sensation that distracts from itch, plus a fresh scent"],
];
const SPRAY_BASE = "Water, Polysorbate 20, Glycerin, Fragrance, Sodium Benzoate, Disodium EDTA, Butanediol";

/** The Supplement Facts panel, opened from "View Nutrition Label". */
export function FridayZoomiesLabelDrawer({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [tab, setTab] = useState<"chew" | "spray">("chew");

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
        <div className={styles.tabs} role="tablist" aria-label="Product">
          {(["chew", "spray"] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={tab === k}
              className={`${styles.tab} ${tab === k ? styles.tabOn : ""}`}
              onClick={() => setTab(k)}
            >
              {k === "chew" ? "Daily Chew" : "Itch Spray"}
            </button>
          ))}
        </div>
        <div className={styles.scroll}>
          {tab === "spray" ? (
            <>
              <h3 className={styles.title}>Product Facts</h3>
              <div className={styles.bar}>
                <span>Key Ingredients</span>
              </div>
              <table className={styles.table}>
                <tbody>
                  {SPRAY_ACTIVES.map(([name, what]) => (
                    <tr key={name}><td>{name}</td><td>{what}</td></tr>
                  ))}
                </tbody>
              </table>
              <ul className={styles.notes}>
                <li><strong>Other ingredients:</strong> {SPRAY_BASE}.</li>
                <li>Spray dog from back of ears to tail, carefully avoiding eyes. Massage into coat. Repeat as necessary. Can be used on wet or dry fur. For external use only.</li>
              </ul>
            </>
          ) : (
            <>
          <h3 className={styles.title}>Supplement Facts</h3>
          <div className={styles.serving}>
            <span><strong>Serving Size:</strong> {CHEW_SERVING}</span>
            <span><strong>Soft Chews Per Container:</strong> {PRODUCT.servings}</span>
          </div>
          <div className={styles.bar}>
            <span>Amount Per Serving</span>
            <span>%DV</span>
          </div>
          <table className={styles.table}>
            <tbody>
              {CHEW_ACTIVES.map(({ name, dose }) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{dose}</td>
                  <td>*</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className={styles.notes}>
            <li>* Daily Value not established for dogs.</li>
            <li><strong>Other ingredients:</strong> {CHEW_OTHER}.</li>
            <li>
              <strong>Daily amount by weight:</strong>{" "}
              {CHEW_DOSING.map(([wt, n]) => `${wt}: ${n}`).join(". ")}. With or without food.
            </li>
          </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}
