import { StarRating } from "@/components/commerce/StarRating";

/** The rating badge from the reference layout. A pill is legal here: the system
    reserves 999px corners for tags, chips, and rating badges. */
export function RatingPill({ value, count }: { value: number; count: number }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-3)",
        minHeight: 52,
        padding: "0 var(--space-5)",
        border: "1px solid var(--border-hairline)",
        borderRadius: "var(--radius-pill)",
        background: "var(--white)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "var(--size-h4)",
          letterSpacing: "var(--tracking-heading)",
          lineHeight: 1,
        }}
      >
        {value.toFixed(1)}
      </span>
      {/* Stars stay --ink. An icon never carries an accent colour on its own, which is
          why these are black where the reference has gold. */}
      <StarRating value={value} size={20} />
      <span aria-hidden="true" style={{ width: 1, alignSelf: "stretch", margin: "12px 0", background: "var(--border-hairline)" }} />
      <span style={{ fontSize: "var(--size-meta)", fontWeight: 500, color: "var(--ink-60)", whiteSpace: "nowrap" }}>
        {count.toLocaleString("en-US")} reviews
      </span>
    </div>
  );
}
