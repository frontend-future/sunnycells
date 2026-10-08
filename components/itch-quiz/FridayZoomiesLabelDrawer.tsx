"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/core/Icon";
import { PRODUCT } from "@/lib/products/dog-itch";
import styles from "./fz-label.module.css";

/* Amounts per chew, from the product record. Daily Values are not set for dogs, so the
   %DV column carries the asterisk and its footnote rather than a made-up percentage. */
const ROWS = [
  ["Quercetin", "50 mg"],
  ["Omega-3 Fish Oil", "150 mg"],
  ["Zinc", "10 mg"],
  ["Vitamin E", "15 IU"],
  ["Probiotic Blend", "1 billion CFU"],
];

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
            <span><strong>Serving Size:</strong> {PRODUCT.chewsPerServing} Soft Chew</span>
            <span><strong>Servings Per Container:</strong> {PRODUCT.servings}</span>
          </div>
          <div className={styles.bar}>
            <span>Amount Per Serving</span>
            <span>%DV</span>
          </div>
          <table className={styles.table}>
            <tbody>
              {ROWS.map(([name, amount]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{amount}</td>
                  <td>*</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className={styles.notes}>
            <li>* Daily Value not established for dogs.</li>
            <li>No corn, wheat, or soy.</li>
            <li>Give 1 chew daily. Ask your vet before giving more than the labeled amount.</li>
          </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}
