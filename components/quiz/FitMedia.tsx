"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** A square picture or looping video that takes the height the text and button leave over,
    up to `size` px, and drops out altogether when under 80px is left, so a long body on a small phone is never pushed below the button. On a tall screen it is full size; on a short
    one it shrinks so the copy and the button stay in view without a scroll. The text never
    shrinks: the media is the thing that gives. */
export function FitMedia({ src, alt, video, size = 420 }: { src: string; alt: string; video?: string; size?: number }) {
  const fill = {
    position: "absolute",
    inset: 0,
    margin: "auto",
    height: "100%",
    width: "auto",
    maxWidth: "100%",
    aspectRatio: "1 / 1",
    objectFit: "cover",
    borderRadius: "var(--radius-card)",
    background: "var(--shell)",
  } as const;
  const box = useRef<HTMLDivElement>(null);
  const [room, setRoom] = useState(true);
  useEffect(() => {
    const el = box.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setRoom(el.clientHeight >= 80));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} style={{ position: "relative", flex: "1 1 0", minHeight: 0, maxHeight: size, width: "100%" }}>
      {!room ? null : video ? (
        <video src={video} poster={src} autoPlay loop muted playsInline preload="auto" aria-label={alt} style={fill} />
      ) : (
        <Image src={src} alt={alt} width={600} height={600} style={fill} />
      )}
    </div>
  );
}
