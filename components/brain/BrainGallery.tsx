"use client";

import { useState } from "react";
import { Icon } from "@/components/core/Icon";
import styles from "./brain.module.css";

/** The pack shot first, then the panels, in the order someone works through
    them: what it does, what is in it, the facts panel, what it looks like
    poured out. See the PHOTOGRAPHY FLAG in lib/products/brain.ts: every slide
    here is a placeholder, standing in for a photo that has not been shot. */
const SLIDES = [
  "Clear Mind, a bottle of 30 capsules",
  "The three doses: citicoline 250 mg, bacopa 300 mg, l-theanine 200 mg",
  "Every active with its amount",
  "How to take it: two capsules with breakfast",
  "The supplement facts panel",
  "Capsules poured into hand",
];

export function BrainGallery() {
  const [i, setI] = useState(0);
  const go = (n: number) => setI((n + SLIDES.length) % SLIDES.length);

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryStage}>
        <div
          className={`${styles.galleryShot} ${styles.placeholder}`}
          style={{ aspectRatio: "1 / 1" }}
        >
          {SLIDES[i]}
        </div>

        <button type="button" className={`${styles.galleryNav} ${styles.galleryPrev}`} onClick={() => go(i - 1)} aria-label="Previous image">
          <Icon name="chevron-left" size={24} strokeWidth={2.5} />
        </button>
        <button type="button" className={`${styles.galleryNav} ${styles.galleryNext}`} onClick={() => go(i + 1)} aria-label="Next image">
          <Icon name="chevron-right" size={24} strokeWidth={2.5} />
        </button>

        <span className={styles.galleryCount} aria-hidden="true">
          {i + 1} / {SLIDES.length}
        </span>
      </div>

      {/* Thumbnails scroll rather than shrink, so a sixth slide does not squeeze
          the other five down to nothing on a phone. */}
      <div className={styles.thumbs} role="tablist" aria-label="Product images">
        {SLIDES.map((s, n) => (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={n === i}
            aria-label={`Image ${n + 1}`}
            onClick={() => setI(n)}
            className={`${styles.thumb} ${n === i ? styles.thumbOn : ""}`}
          >
            <span className={`${styles.thumbShot} ${styles.placeholder}`} style={{ fontSize: 9, padding: 2 }}>
              {n + 1}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
