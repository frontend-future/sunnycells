"use client";

import { useEffect, useRef, useState } from "react";
import { StarRating } from "@/components/commerce/StarRating";

export type Review = { name: string; rating: number; title: string; body: string };

const AUTOPLAY_MS = 6000;

/** Autoplay stops the moment the reader touches the track, so a swipe never gets
    fought by the next scheduled tick. */
export function ReviewsCarousel({ reviews }: { reviews: readonly Review[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    if (interacted) return;
    const t = setInterval(() => {
      const el = track.current;
      if (!el) return;
      const next = (Math.round(el.scrollLeft / el.clientWidth) + 1) % reviews.length;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [interacted, reviews.length]);

  const onScroll = () => {
    const el = track.current;
    if (el) setAt(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div style={{ marginTop: "var(--space-8)" }}>
      <div
        ref={track}
        onScroll={onScroll}
        onPointerDown={() => setInteracted(true)}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          gap: "var(--space-4)",
        }}
      >
        {reviews.map((r) => (
          <div
            key={r.name}
            style={{
              flex: "0 0 100%",
              scrollSnapAlign: "start",
              background: "var(--white)",
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-card)",
              padding: "var(--space-5)",
              minHeight: 176,
              boxSizing: "border-box",
            }}
          >
            <StarRating value={r.rating} size={16} />
            <p
              style={{
                margin: "var(--space-3) 0 var(--space-2)",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "var(--size-body)",
              }}
            >
              {r.title}
            </p>
            <p style={{ margin: 0, fontSize: "var(--size-body)", fontWeight: 500, lineHeight: 1.4 }}>
              {r.body}
            </p>
            <p
              style={{
                margin: "var(--space-3) 0 0",
                fontFamily: "var(--font-label)",
                fontSize: "var(--size-meta)",
                fontWeight: 600,
                letterSpacing: "var(--tracking-mono)",
                color: "var(--ink-60)",
              }}
            >
              {r.name}
            </p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: "var(--space-4)" }}>
        {reviews.map((_, i) => (
          <span
            key={i}
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
    </div>
  );
}
