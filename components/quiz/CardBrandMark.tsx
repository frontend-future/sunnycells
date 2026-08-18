import type { CardBrand } from "@/lib/quiz/card";

/**
 * Card network acceptance marks.
 *
 * APPROXIMATIONS, not the official artwork. Each network publishes exact SVGs and
 * usage rules through its brand centre, and a merchant displaying them on a checkout
 * is the intended use. Drop the official files in here before launch; the sizing and
 * the switch below stay as they are.
 */
export function CardBrandMark({ brand, height = 20 }: { brand: CardBrand; height?: number }) {
  if (!brand) return null;
  const w = Math.round(height * 1.58);
  const common = { width: w, height, viewBox: "0 0 38 24", role: "img" as const };
  /* The pale marks need an outline or they vanish on anything that is not pure white:
     on the --shell sections their own fill is within a shade of the background. */
  const pale = { fill: "#FFFFFF", stroke: "#DCDCD6", strokeWidth: 1 };

  if (brand === "mastercard") {
    return (
      <svg {...common} aria-label="Mastercard">
        <rect x="0.5" y="0.5" width="37" height="23" rx="3" {...pale} />
        <circle cx="15" cy="12" r="7" fill="#EB001B" />
        <circle cx="23" cy="12" r="7" fill="#F79E1B" />
        <path d="M19 6.6a7 7 0 0 0 0 10.8 7 7 0 0 0 0-10.8Z" fill="#FF5F00" />
      </svg>
    );
  }

  if (brand === "visa") {
    return (
      <svg {...common} aria-label="Visa">
        <rect width="38" height="24" rx="3" fill="#1A1F71" />
        <text x="19" y="16.5" textAnchor="middle" fill="#fff" fontSize="10.5" fontWeight="700" fontStyle="italic" fontFamily="system-ui, sans-serif" letterSpacing="0.5">
          VISA
        </text>
      </svg>
    );
  }

  if (brand === "amex") {
    return (
      <svg {...common} aria-label="American Express">
        <rect width="38" height="24" rx="3" fill="#1F72CD" />
        <text x="19" y="15.5" textAnchor="middle" fill="#fff" fontSize="7.5" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="0.2">
          AMEX
        </text>
      </svg>
    );
  }

  if (brand === "discover") {
    return (
      <svg {...common} aria-label="Discover">
        <rect x="0.5" y="0.5" width="37" height="23" rx="3" {...pale} />
        <path d="M22 24h13a3 3 0 0 0 3-3v-5c-5 3.4-10.5 6.1-16 8Z" fill="#F27712" />
        {/* 5.4px, centred on the box: at 6.4 the D fell outside the 38 unit viewBox. */}
        <text x="19" y="12.8" textAnchor="middle" fill="#231F20" fontSize="5.4" fontWeight="700" fontFamily="system-ui, sans-serif">
          DISCOVER
        </text>
      </svg>
    );
  }

  return (
    <svg {...common} aria-label={brand === "diners" ? "Diners Club" : "JCB"}>
      <rect x="0.5" y="0.5" width="37" height="23" rx="3" {...pale} />
      <text x="19" y="15" textAnchor="middle" fill="#231F20" fontSize="6.4" fontWeight="700" fontFamily="system-ui, sans-serif">
        {brand === "diners" ? "DINERS" : "JCB"}
      </text>
    </svg>
  );
}
