"use client";

import { useEffect, useState } from "react";
import s from "./thanks.module.css";

const COLORS = ["#2F5FD0", "#FFC845", "#8EC5F2", "#FFC845", "#2F5FD0"];
const COUNT = 90;

type Piece = { left: number; size: number; delay: number; dur: number; color: string; drift: number; round: boolean };

/* One burst of blue and yellow confetti falling the full height of the screen, then it
   removes itself. Pieces are random, so they are made after mount to keep the server and
   client markup identical. Skipped for people who ask for reduced motion. */
export function Confetti() {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPieces(
      Array.from({ length: COUNT }, (_, i) => ({
        left: Math.random() * 100,
        size: 8 + Math.random() * 8,
        delay: Math.random() * 2.5,
        dur: 3 + Math.random() * 2.5,
        color: COLORS[i % COLORS.length],
        drift: (Math.random() - 0.5) * 160,
        round: Math.random() < 0.3,
      })),
    );
    const t = setTimeout(() => setPieces([]), 8500);
    return () => clearTimeout(t);
  }, []);

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
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
