"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { IconButton } from "@/components/core/IconButton";

export type GalleryImage = { src: string; alt: string };

/**
 * A big active image with a thumbnail strip, layout switching via the .sc-gallery
 * CSS in globals.css: thumbnails run in a row below the image on a phone, and
 * move to a right-hand rail from 900px. The main image is a native horizontal
 * scroll-snap track, so a touch swipe or a trackpad's horizontal scroll both
 * change the active slide with no extra gesture handling; the arrows and
 * thumbnails just call the same go() a swipe would land on.
 */
export function ImageGallery({ images }: { images: readonly GalleryImage[] }) {
  const track = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [at, setAt] = useState(0);
  const count = images.length;

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const next = (i + count) % count;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
      setAt(next);
      thumbRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    },
    [count],
  );

  const onScroll = () => {
    const el = track.current;
    if (el) setAt(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="sc-gallery">
      <div className="sc-gallery-main" style={{ position: "relative" }}>
        <div
          ref={track}
          onScroll={onScroll}
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--border-hairline)",
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

        <span style={{ position: "absolute", left: "var(--space-3)", top: "50%", transform: "translateY(-50%)" }}>
          <IconButton
            icon="chevron-left"
            label="Previous image"
            size="sm"
            onClick={() => go(at - 1)}
            style={{ background: "var(--white)", boxShadow: "var(--shadow-raised)" }}
          />
        </span>
        <span style={{ position: "absolute", right: "var(--space-3)", top: "50%", transform: "translateY(-50%)" }}>
          <IconButton
            icon="chevron-right"
            label="Next image"
            size="sm"
            onClick={() => go(at + 1)}
            style={{ background: "var(--white)", boxShadow: "var(--shadow-raised)" }}
          />
        </span>
      </div>

      <div className="sc-gallery-thumbs">
        {images.map((img, i) => (
          <button
            key={img.src}
            ref={(el) => { thumbRefs.current[i] = el; }}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === at}
            style={{
              flex: "none",
              width: 72,
              height: 72,
              padding: 0,
              appearance: "none",
              background: "none",
              borderRadius: "var(--radius-sm)",
              border: "2px solid " + (i === at ? "var(--ink)" : "transparent"),
              overflow: "hidden",
              cursor: "pointer",
              opacity: i === at ? 1 : 0.65,
              transition: "opacity var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
            }}
          >
            <Image src={img.src} alt="" width={144} height={144} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </button>
        ))}
      </div>
    </div>
  );
}
