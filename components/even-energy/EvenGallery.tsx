"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/core/Icon";
import styles from "./even-energy.module.css";

/** The pack shot first, then the panels, in the order someone works through them:
    what it does, what is in it, what a stick holds, how to take it, the facts
    table, what it looks like made up. */
const SLIDES = [
  { src: "/product/even-energy.webp", alt: "Even Energy, a light green pouch of 30 watermelon stick packs" },
  { src: "/product/gallery/01-benefits.webp", alt: "The three doses in Even Energy: CoQ10 150 mg, taurine 1000 mg and PEAK ATP 40 mg" },
  { src: "/product/gallery/02-ingredients.webp", alt: "Every active in Even Energy with its amount" },
  { src: "/product/gallery/03-stick.webp", alt: "One 2.4 gram stick and everything it holds" },
  { src: "/product/gallery/04-how-to-take-it.webp", alt: "How to take Even Energy: one stick in 8 to 10 oz of cold water, stirred or shaken" },
  { src: "/product/gallery/05-supplement-facts.webp", alt: "The Even Energy supplement facts panel" },
  { src: "/product/gallery/06-in-the-glass.webp", alt: "Even Energy mixed into a glass of cold water" },
];

export type Slide = { src: string; alt: string };

export function EvenGallery({ slides = SLIDES }: { slides?: readonly Slide[] } = {}) {
  const [i, setI] = useState(0);
  const go = (n: number) => setI((n + slides.length) % slides.length);

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryStage}>
        <Image
          key={slides[i].src}
          src={slides[i].src}
          alt={slides[i].alt}
          width={1080}
          height={1080}
          priority={i === 0}
          className={styles.galleryShot}
        />

        <button type="button" className={`${styles.galleryNav} ${styles.galleryPrev}`} onClick={() => go(i - 1)} aria-label="Previous image">
          <Icon name="chevron-left" size={24} strokeWidth={2.5} />
        </button>
        <button type="button" className={`${styles.galleryNav} ${styles.galleryNext}`} onClick={() => go(i + 1)} aria-label="Next image">
          <Icon name="chevron-right" size={24} strokeWidth={2.5} />
        </button>

        <span className={styles.galleryCount} aria-hidden="true">
          {i + 1} / {slides.length}
        </span>
      </div>

      {/* Thumbnails scroll rather than shrink, so a seventh slide does not squeeze
          the other six down to nothing on a phone. */}
      <div className={styles.thumbs} role="tablist" aria-label="Product images">
        {slides.map((s, n) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={n === i}
            aria-label={`Image ${n + 1}`}
            onClick={() => setI(n)}
            className={`${styles.thumb} ${n === i ? styles.thumbOn : ""}`}
          >
            <Image src={s.src} alt="" width={200} height={200} className={styles.thumbShot} />
          </button>
        ))}
      </div>
    </div>
  );
}
