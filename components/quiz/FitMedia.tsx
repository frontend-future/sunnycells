"use client";

import Image from "next/image";

/** A square picture or looping video that takes the height the text and button leave over,
    up to `size` px, and never less than 120px. On a tall screen it is full size; on a short
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
  return (
    <div style={{ position: "relative", flex: "1 1 0", minHeight: 120, maxHeight: size, width: "100%" }}>
      {video ? (
        <video src={video} poster={src} autoPlay loop muted playsInline preload="auto" aria-label={alt} style={fill} />
      ) : (
        <Image src={src} alt={alt} width={600} height={600} style={fill} />
      )}
    </div>
  );
}
