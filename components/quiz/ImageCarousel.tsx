"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { IconButton } from "@/components/core/IconButton";

export type CarouselImage = { src: string; alt: string };

/** A swipeable, full-bleed image carousel: same dots-and-arrows shell as
    ReviewsCarousel, but each slide is a single already-composed image rather
    than a markup card, for a set of pre-rendered marketing graphics. */
export function ImageCarousel({ images }: { images: readonly CarouselImage[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);
  const count = images.length;

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const next = (i + count) % count;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
      setAt(next);
    },
    [count],
  );

  const onScroll = () => {
    const el = track.current;
    if (el) setAt(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div>
      <div
        ref={track}
        onScroll={onScroll}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          borderRadius: "var(--radius-card)",
        }}
      >
        {images.map((img) => (
          <div key={img.src} style={{ flex: "0 0 100%", scrollSnapAlign: "start" }}>
            <Image
              src={img.src}
              alt={img.alt}
              width={1080}
              height={1080}
              priority={img === images[0]}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
        <IconButton icon="chevron-left" label="Previous image" size="sm" onClick={() => go(at - 1)} />
        <div style={{ display: "flex", gap: 8 }}>
          {images.map((img, i) => (
            <span
              key={img.src}
              aria-hidden="true"
              style={{
                width: i === at ? 22 : 8,
                height: 8,
                borderRadius: "var(--radius-pill)",
                background: i === at ? "var(--ink)" : "var(--ink-20)",
                transition: "width var(--duration-fast) var(--ease-standard)",
              }}
            />
          ))}
        </div>
        <IconButton icon="chevron-right" label="Next image" size="sm" onClick={() => go(at + 1)} />
      </div>
    </div>
  );
}
