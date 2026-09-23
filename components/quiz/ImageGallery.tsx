"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type GalleryImage = { src: string; alt: string };

/**
 * A big active image with a thumbnail strip, layout switching via the .sc-gallery
 * CSS in globals.css: thumbnails run in a row below the image on a phone, and
 * move to a right-hand rail from 900px. The main image is a native horizontal
 * scroll-snap track, so a touch swipe or a trackpad's horizontal scroll both
 * change the active slide with no extra gesture handling -- no arrow buttons,
 * a thumbnail tap is the only other way to jump slides.
 *
 * `alignSelf: "start"` on the root: PlansScreen's own hero grid centers its two
 * columns vertically, and this gallery (image plus thumbnail rail) runs taller
 * than the text column beside it, so centering left a large gap above and below
 * the shorter column instead of both starting flush at the top.
 *
 * The rail's height (--gallery-rail-height, consumed only in the desktop rule
 * in globals.css) is measured off the main image rather than left to flexbox
 * stretch: stretch takes the MAX of every item's own content height, so an
 * unclipped rail wanting more room than the image is tall would win and pull
 * the image's own box up to match it, opening the exact gap this is fixing,
 * just moved inside the image's box instead of removed. Measuring the real
 * image height and handing the rail exactly that (scrolling internally for
 * whatever does not fit) is what makes the two actually match.
 */
export function ImageGallery({ images }: { images: readonly GalleryImage[] }) {
  const track = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [at, setAt] = useState(0);
  const [railHeight, setRailHeight] = useState<number | null>(null);
  const count = images.length;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => setRailHeight(entries[0].contentRect.height));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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
    <div
      className="sc-gallery"
      style={{ alignSelf: "start", ...(railHeight ? { ["--gallery-rail-height" as string]: `${railHeight}px` } : {}) }}
    >
      <div className="sc-gallery-main">
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
