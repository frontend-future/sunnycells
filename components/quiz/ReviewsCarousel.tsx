"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { StarRating } from "@/components/commerce/StarRating";
import { IconButton } from "@/components/core/IconButton";

export type Review = { name: string; rating: number; title: string; body: string };

const AUTOPLAY_MS = 6000;

/** Wraps at both ends, so the arrows and the timer both treat the reviews as a
    loop rather than stopping dead at the first or last card. */
export function ReviewsCarousel({ reviews }: { reviews: readonly Review[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);
  const count = reviews.length;

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

  useEffect(() => {
    const t = setInterval(() => {
      const el = track.current;
      if (!el) return;
      go(Math.round(el.scrollLeft / el.clientWidth) + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [go]);

  const onScroll = () => {
    const el = track.current;
    if (el) setAt(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div style={{ marginTop: "var(--space-8)" }}>
      <div
        ref={track}
        onScroll={onScroll}
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
              minHeight: 192,
              boxSizing: "border-box",
              textAlign: "center",
            }}
          >
            <StarRating
              value={r.rating}
              size={26}
              color="var(--sun)"
              style={{ justifyContent: "center" }}
            />
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
        <IconButton icon="chevron-left" label="Previous review" size="sm" onClick={() => go(at - 1)} />
        <div style={{ display: "flex", gap: 8 }}>
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
        <IconButton icon="chevron-right" label="Next review" size="sm" onClick={() => go(at + 1)} />
      </div>
    </div>
  );
}
