"use client";

import { useEffect, useState } from "react";
import s from "./thanks.module.css";

const COLORS = ["#2F5FD0", "#FFC845", "#8EC5F2", "#FFC845", "#2F5FD0"];
const COUNT = 70;
const COUNT_ONCE = 120;
const ONCE_MS = 5600;

type Piece = { left: number; size: number; delay: number; dur: number; color: string; drift: number; round: boolean };

/* Blue and yellow confetti raining down the full height of the screen, on a loop, or once through with `once`. Pieces are random, so they are made after mount to keep the server and
   client markup identical. Skipped for people who ask for reduced motion. */
export function Confetti({ once = false }: { once?: boolean }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPieces(
      Array.from({ length: once ? COUNT_ONCE : COUNT }, (_, i) => ({
        left: Math.random() * 100,
        size: 8 + Math.random() * 8,
        /* Once: pieces keep starting for the first 2.2 seconds and the last lands by about 5, then the layer goes. */
        delay: once ? Math.random() * 2.2 : Math.random() * 2.5,
        dur: once ? 2.6 + Math.random() * 0.4 : 3 + Math.random() * 2.5,
        color: COLORS[i % COLORS.length],
        drift: (Math.random() - 0.5) * 160,
        round: Math.random() < 0.3,
      })),
    );
    if (!once) return;
    const done = setTimeout(() => setPieces([]), ONCE_MS);
    return () => clearTimeout(done);
  }, [once]);

  if (!pieces.length) return null;
  return (
    <div className={s.confetti} aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          className={s.piece}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.round ? p.size : p.size * 0.55,
            borderRadius: p.round ? "50%" : 2,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            animationIterationCount: once ? 1 : undefined,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
