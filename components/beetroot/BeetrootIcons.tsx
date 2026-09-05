/**
 * The lander's icon set, drawn rather than generated.
 *
 * These sit in 52px and 34px discs. A raster at that size is mush however it is made,
 * and an image model cannot draw a legible "no sugar" slash anyway, so they are inline
 * SVG on a 24 unit grid: crisp at any size, no network cost, and they take the disc's
 * colour through currentColor.
 *
 * The house Icon component is not used here for the same reason the rest of this page
 * does not use the house tokens: the lander runs its own design, and it needs a dozen
 * marks (a beet, a heart with a pulse, a crossed-out sugar cube) that the system set
 * has no business carrying.
 */

export type BeetIconName =
  | "fruit" | "no-sugar" | "clean-label" | "non-gmo" | "no-alcohols" | "gluten-free"
  | "vegan" | "tested" | "blood-flow" | "energy" | "clarity" | "heart" | "guarantee";

const P = {
  /* A beetroot: round shoulders tapering to a root, two leaves on top. The first
     attempt drew the body as two arcs and a stem and read as a lightbulb. */
  fruit: <><path d="M12 21.2c-4-3.6-5.6-6.1-5.6-8.5a5.6 5.6 0 0111.2 0c0 2.4-1.6 4.9-5.6 8.5z" /><path d="M12 7c-1-1.9-2.7-2.6-4.3-2.3.3 1.9 1.9 3 4.3 2.3z" /><path d="M12 7c1-1.9 2.7-2.6 4.3-2.3-.3 1.9-1.9 3-4.3 2.3z" /></>,
  /* Sugar cube, struck through. */
  "no-sugar": <><rect x="4.5" y="7.5" width="11" height="9" rx="1.6" /><path d="M4 4l16 16" /></>,
  /* A label tag with a tick on it. */
  "clean-label": <><path d="M20 12.6l-7.4 7.4a2 2 0 01-2.8 0l-6-6a2 2 0 010-2.8L11.2 4H19a1 1 0 011 1v7.6z" /><circle cx="16" cy="8" r="1.1" /></>,
  /* A DNA helix. Two mirrored strands with rungs: the single crossing curve the first
     version drew came out as an X with dots. */
  "non-gmo": <><path d="M8 3c0 4.5 8 4.5 8 9s-8 4.5-8 9" /><path d="M16 3c0 4.5-8 4.5-8 9s8 4.5 8 9" /><path d="M9.6 6h4.8M8.6 12h6.8M9.6 18h4.8" /></>,
  /* A droplet, struck through. */
  "no-alcohols": <><path d="M12 4.5s5 5.2 5 8.4a5 5 0 01-10 0c0-3.2 5-8.4 5-8.4z" /><path d="M4 4l16 16" /></>,
  /* An ear of wheat, struck through. Chevrons rather than the teardrop grains of the
     first version, which turned to a scribble once the slash crossed them. */
  "gluten-free": <><path d="M12 20.5V7" /><path d="M12 8.4L9.4 6M12 8.4l2.6-2.4" /><path d="M12 12.2L9.4 9.8M12 12.2l2.6-2.4" /><path d="M12 16L9.4 13.6M12 16l2.6-2.4" /><path d="M4.5 4.5l15 15" /></>,
  /* A leaf. */
  vegan: <><path d="M4.5 19.5C3 15 5.5 5.5 19.5 4.5c1 12-7 16.5-13 14" /><path d="M9 15c2-3.5 5-5.8 8.5-7" /></>,
  /* A shield with a tick. */
  tested: <><path d="M12 3l7 3v5.5c0 4.4-3 8-7 9.5-4-1.5-7-5.1-7-9.5V6l7-3z" /><path d="M9 12l2.2 2.2L15.4 10" /></>,
  /* A heart with a pulse line through it. */
  "blood-flow": <><path d="M12 20.2S3.8 15.3 3.8 9.6A4.1 4.1 0 0112 7.7a4.1 4.1 0 018.2 1.9c0 5.7-8.2 10.6-8.2 10.6z" /><path d="M4.5 12.4h3.3l1.6-2.6 2 4.7 1.7-3.1h6.4" /></>,
  /* A lightning bolt. */
  energy: <><path d="M13.2 3L5.4 13.2h5.2L10 21l7.8-10.2h-5.2L13.2 3z" /></>,
  /* A head in profile with a spark inside. */
  clarity: <><path d="M15.5 20.5v-2.2c2.4-1.2 4-3.5 4-6.2 0-4-3.5-7.1-7.7-7.1S4 8.1 4 12.1c0 1.9.8 3.6 2.1 4.9v3.5" /><path d="M12 8.6l1.1 2.3 2.3 1.1-2.3 1.1L12 15.4l-1.1-2.3-2.3-1.1 2.3-1.1L12 8.6z" /></>,
  /* A plain heart. */
  heart: <><path d="M12 20.2S3.8 15.3 3.8 9.6A4.1 4.1 0 0112 7.7a4.1 4.1 0 018.2 1.9c0 5.7-8.2 10.6-8.2 10.6z" /></>,
  /* A rosette seal. */
  guarantee: <><circle cx="12" cy="10" r="6" /><path d="M9 15.2L7.6 21l4.4-2.2L16.4 21 15 15.2" /><path d="M9.6 10l1.7 1.7 3.3-3.3" /></>,
};

export function BeetIcon({ name, size = 24, stroke = 1.7 }: { name: BeetIconName; size?: number; stroke?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {P[name]}
    </svg>
  );
}
