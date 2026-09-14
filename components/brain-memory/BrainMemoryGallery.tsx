"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/core/Icon";
import styles from "./brain-memory.module.css";

/** Real photography, unlike Clear Mind: the pack shot first, then the panels
    people actually work through. */
const SLIDES = [
  { src: "/product/brain-memory/01-hero-split.png", alt: "Brain & Memory Power Boost, a bottle of 120 capsules" },
  { src: "/product/brain-memory/02-natural-way.png", alt: "A daily way to support sharper thinking: memory and focus, backed by real research" },
  { src: "/product/brain-memory/03-ingredients-tan.png", alt: "The six actives in Brain & Memory Power Boost with what each one supports" },
  { src: "/product/brain-memory/04-pour.png", alt: "Four capsules poured into a hand next to the bottle" },
  { src: "/product/brain-memory/05-facts.png", alt: "The Brain & Memory Power Boost supplement facts panel" },
  { src: "/product/brain-memory/checklist.png", alt: "Backed by real research: sharper thinking, clearer focus, better memory" },
  { src: "/product/brain-memory/advantage.png", alt: "The Sunnycells advantage: doctor-formulated, 30 day guarantee, six research backed ingredients, easy capsule format, daily cognitive support, compared with other supplements offering none of these" },
  { src: "/product/brain-memory/guarantee.png", alt: "30 day money back guarantee: your order is covered by our return policy" },
];

export function BrainMemoryGallery() {
  const [i, setI] = useState(0);
  const go = (n: number) => setI((n + SLIDES.length) % SLIDES.length);

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryStage}>
        <Image
          key={SLIDES[i].src}
          src={SLIDES[i].src}
          alt={SLIDES[i].alt}
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
          {i + 1} / {SLIDES.length}
        </span>
      </div>

      <div className={styles.thumbs} role="tablist" aria-label="Product images">
        {SLIDES.map((s, n) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={n === i}
            aria-label={`Image ${n + 1}`}
            onClick={() => setI(n)}
            className={`${styles.thumb} ${n === i ? styles.thumbOn : ""}`}
          >
            <Image src={s.src} alt="" width={168} height={168} className={styles.thumbShot} />
          </button>
        ))}
      </div>
    </div>
  );
}
