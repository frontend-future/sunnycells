"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Icon } from "@/components/core/Icon";
import { IconButton } from "@/components/core/IconButton";
import {
  SLIDE_ATTRIBUTES, SLIDE_BENEFITS, SLIDE_SEALS, SLIDE_STATS, SLIDE_STATS_NOTE,
  SUPPLEMENT_FACTS,
} from "@/lib/quiz/carousel";

/* Every slide is composed in markup rather than rendered into an image. Baked-in
   text cannot be edited, translated, selected, read by a screen reader, or kept
   legible when the slide is resized. */

const POUCH = "/product/metabolic-morning-blend.png";

function Pouch({ height = 220 }: { height?: number }) {
  return (
    <Image
      src={POUCH}
      alt=""
      width={2400}
      height={1792}
      style={{ width: "100%", height: "auto", maxHeight: height, objectFit: "contain" }}
    />
  );
}

function Slide({ children, tone = "tint" }: { children: React.ReactNode; tone?: "tint" | "white" }) {
  return (
    <div
      style={{
        flex: "0 0 100%",
        scrollSnapAlign: "start",
        background: tone === "tint" ? "var(--sun-tint)" : "var(--white)",
        borderRadius: "var(--radius-card)",
        padding: "var(--space-5)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: 380,
      }}
    >
      {children}
    </div>
  );
}

function SlideTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        margin: "0 0 var(--space-4)",
        fontFamily: "var(--font-display)",
        fontSize: "var(--size-h4)",
        fontWeight: 900,
        letterSpacing: "var(--tracking-heading)",
        lineHeight: 1.2,
      }}
    >
      {children}
    </h3>
  );
}

const SLIDE_COUNT = 6;

export function HeroCarousel({ photoSet }: { photoSet: "female" | "male" }) {
  const track = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);

  const go = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(SLIDE_COUNT - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    setAt(next);
  }, []);

  /* The dots follow the scroll position rather than only the buttons, so a swipe
     keeps them honest. */
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
          gap: 0,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          borderRadius: "var(--radius-card)",
        }}
      >
        {/* 1. What the ingredients do */}
        <Slide>
          <SlideTitle>Benefits of the ingredients in Metabolic Morning Blend</SlideTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", marginBottom: "var(--space-4)" }}>
            {SLIDE_BENEFITS.map((b) => (
              <span
                key={b}
                style={{
                  alignSelf: "flex-start",
                  background: "var(--white)",
                  borderRadius: "var(--radius-pill)",
                  padding: "6px 16px",
                  fontSize: "var(--size-meta)",
                  fontWeight: 700,
                }}
              >
                {b}
              </span>
            ))}
          </div>
          <Pouch height={150} />
        </Slide>

        {/* 2. Survey figures */}
        <Slide>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "var(--space-5)" }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Icon key={i} name="star" size={18} fill="currentColor" />
            ))}
          </div>
          {SLIDE_STATS.map((s) => (
            <div key={s.figure} style={{ display: "flex", gap: "var(--space-4)", alignItems: "baseline", marginBottom: "var(--space-4)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 40, letterSpacing: "var(--tracking-display)", flex: "none" }}>
                {s.figure}
              </span>
              <span style={{ fontSize: "var(--size-meta)", lineHeight: 1.35 }}>{s.body}</span>
            </div>
          ))}
          <p style={{ margin: 0, fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>{SLIDE_STATS_NOTE}</p>
        </Slide>

        {/* 3. Attributes */}
        <Slide>
          <SlideTitle>Cortisol control and hormonal support</SlideTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
            {SLIDE_ATTRIBUTES.map((a) => (
              <div
                key={a.label}
                style={{
                  background: "var(--white)",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-3) var(--space-2)",
                  textAlign: "center",
                }}
              >
                <span style={{ display: "flex", justifyContent: "center", color: "var(--ink)" }}>
                  <Icon name={a.icon} size={24} />
                </span>
                <span style={{ display: "block", marginTop: 6, fontSize: "var(--size-meta)", fontWeight: 600, lineHeight: 1.2 }}>
                  {a.label}
                </span>
              </div>
            ))}
          </div>
          <Pouch height={120} />
        </Slide>

        {/* 4. Serving */}
        <Slide>
          <SlideTitle>Take 1 scoop</SlideTitle>
          <p style={{ margin: "0 0 var(--space-4)", fontSize: "var(--size-body)", lineHeight: 1.4 }}>
            Daily in the morning. Mix with water or your favorite juice.
          </p>
          <div style={{ display: "flex", gap: "var(--space-6)", borderTop: "1px solid var(--ink-20)", paddingTop: "var(--space-3)", marginBottom: "var(--space-4)" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--size-h4)" }}>30 servings</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--size-h4)" }}>5.91 g each</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
            {SLIDE_SEALS.map((s) => (
              <span key={s} style={{ background: "var(--white)", borderRadius: "var(--radius-pill)", padding: "6px 14px", fontSize: "var(--size-meta)", fontWeight: 700 }}>
                {s}
              </span>
            ))}
          </div>
        </Slide>

        {/* 5. Supplement facts */}
        <Slide tone="white">
          <div style={{ border: "2px solid var(--ink)", borderRadius: "var(--radius-sm)", padding: "var(--space-4)", fontSize: 13, lineHeight: 1.35 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--size-h4)", letterSpacing: "-0.02em" }}>
              Supplement Facts
            </div>
            <div style={{ color: "var(--ink-80)" }}>Serving size: {SUPPLEMENT_FACTS.serving}</div>
            <div style={{ color: "var(--ink-80)", marginBottom: 6 }}>Servings per container: {SUPPLEMENT_FACTS.perContainer}</div>
            <table style={{ width: "100%", borderCollapse: "collapse", borderTop: "3px solid var(--ink)" }}>
              <thead>
                <tr>
                  <th />
                  <th style={{ textAlign: "right", fontWeight: 700, padding: "3px 0" }}>Per serving</th>
                  <th style={{ textAlign: "right", fontWeight: 700, padding: "3px 0" }}>% DV</th>
                </tr>
              </thead>
              <tbody>
                {SUPPLEMENT_FACTS.rows.map((r) => (
                  <tr key={r[0]} style={{ borderTop: "1px solid var(--ink-20)" }}>
                    <td style={{ padding: "3px 6px 3px 0" }}>{r[0]}</td>
                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>{r[1]}</td>
                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ borderTop: "3px solid var(--ink)", paddingTop: 6, marginTop: 4 }}>
              <strong>Proprietary blend</strong>{" "}
              <span style={{ float: "right" }}>{SUPPLEMENT_FACTS.blendAmount}</span>
              <div style={{ color: "var(--ink-80)", clear: "both" }}>{SUPPLEMENT_FACTS.blend}</div>
            </div>
            <div style={{ marginTop: 8, color: "var(--ink-60)" }}>
              Other ingredients: {SUPPLEMENT_FACTS.other}
            </div>
          </div>
        </Slide>

        {/* 6. Customers */}
        <Slide>
          <SlideTitle>People drinking it</SlideTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
            <Image
              src={`/photos/story-${photoSet}.jpg`}
              alt=""
              width={1080}
              height={1480}
              style={{ gridRow: "span 2", width: "100%", height: "100%", objectFit: "cover", borderRadius: "var(--radius-md)" }}
            />
            <Image
              src={`/photos/story-${photoSet === "female" ? "male" : "female"}.jpg`}
              alt=""
              width={1080}
              height={1480}
              style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: "var(--radius-md)" }}
            />
            <div style={{ background: "var(--white)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-3)" }}>
              <Pouch height={110} />
            </div>
          </div>
        </Slide>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
        <IconButton icon="chevron-left" label="Previous slide" size="sm" onClick={() => go(at - 1)} />
        <div style={{ display: "flex", gap: 8 }}>
          {Array.from({ length: SLIDE_COUNT }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === at}
              onClick={() => go(i)}
              style={{
                appearance: "none",
                border: 0,
                padding: 0,
                width: i === at ? 22 : 8,
                height: 8,
                borderRadius: "var(--radius-pill)",
                background: i === at ? "var(--ink)" : "var(--ink-20)",
                cursor: "pointer",
                transition: "width var(--duration-fast) var(--ease-standard)",
              }}
            />
          ))}
        </div>
        <IconButton icon="chevron-right" label="Next slide" size="sm" onClick={() => go(at + 1)} />
      </div>
    </div>
  );
}
