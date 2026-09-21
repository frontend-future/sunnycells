import type { Metadata } from "next";
import Image from "next/image";
import { NavLink } from "@/components/navigation/NavLink";
import { AnnouncementMarquee } from "@/components/quiz/AnnouncementMarquee";
import { Wordmark } from "@/components/core/Wordmark";
import { RatingPill } from "@/components/quiz/RatingPill";
import { StartChoice } from "@/components/quiz/StartChoice";
import { itchV2Quiz } from "@/lib/quiz/itchV2";
import { RATING } from "@/lib/products/dog-itch";

export const metadata: Metadata = {
  title: "Dog itch quiz | SUNNYCELLS",
  description: "A couple minutes of questions to find out why your dog is itching, and what to do about it.",
};

const FOOTER_LINKS = [
  [
    { label: "Privacy policy", href: "#" },
    { label: "Terms and conditions", href: "#" },
    { label: "Refund policy", href: "#" },
  ],
  [
    { label: "Shipping policy", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Support", href: "#" },
  ],
];

/**
 * A deep clone of /quiz/itch's own landing page, pointed at itchV2Quiz instead of
 * itchQuiz. Same copy, same product photos (this is the same product, not a new
 * one), separate sessionStorage slot.
 */
export default function ItchQuizV2LandingPage() {
  return (
    <>
      <AnnouncementMarquee
        terms={[
          { strong: "Free shipping", rest: "on all orders" },
          { strong: "30 day", rest: "money back guarantee" },
          { strong: "Skip or cancel", rest: "anytime" },
        ]}
      />

      <div style={{ position: "relative", background: "var(--white)" }}>
        <div
          aria-hidden="true"
          style={{ position: "absolute", inset: "0 0 34% 0", background: "var(--sprout-tint)" }}
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "var(--page-max)",
            margin: "0 auto",
            padding: "var(--space-4) var(--page-gutter-mobile) 0",
          }}
        >
          <Wordmark size={26} />
          {/* Before/after rather than a plain product shot: the transformation
              itself is the pitch, and it pays off the ad's own "why is my dog
              itching" hook before she's answered a single question. */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--space-2)",
              maxWidth: 420,
              margin: "0 auto",
              paddingBottom: "var(--space-4)",
            }}
          >
            {[
              { src: "/quiz/itch/hero-before.webp", alt: "A dog scratching itself, uncomfortable and itchy", label: "Before" },
              { src: "/quiz/itch/hero-after.webp", alt: "A calm, happy dog resting beside a jar of SC-01 Daily Chews", label: "After" },
            ].map((s) => (
              <div key={s.label} style={{ position: "relative" }}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={700}
                  height={700}
                  priority
                  style={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "1 / 1",
                    height: "auto",
                    maxHeight: "min(24vh, 260px)",
                    objectFit: "cover",
                    borderRadius: "var(--radius-card)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "var(--space-2)",
                    left: "var(--space-2)",
                    padding: "3px 10px",
                    background: "var(--ink)",
                    color: "var(--white)",
                    borderRadius: "var(--radius-pill)",
                    fontFamily: "var(--font-label)",
                    fontSize: "var(--size-meta)",
                    fontWeight: 600,
                    letterSpacing: "var(--tracking-mono)",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main style={{ width: "100%", maxWidth: 720, margin: "0 auto", padding: "0 var(--page-gutter-mobile)" }}>
        <div style={{ textAlign: "center", paddingTop: "var(--space-6)" }}>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--size-h3), 8.2vw, var(--size-h1))",
              letterSpacing: "var(--tracking-heading)",
              lineHeight: "var(--leading-snug)",
              textWrap: "balance",
            }}
          >
            <span style={{ fontWeight: 900 }}>Discover why your dog is itching</span>
          </h1>

          <p
            style={{
              maxWidth: 480,
              margin: "var(--space-4) auto 0",
              fontSize: "var(--size-body)",
              lineHeight: 1.45,
              textWrap: "pretty",
            }}
          >
            A couple minutes of questions to get to the root cause of the scratching,
            licking, and skin irritation, and what to do about it.
          </p>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--space-4)" }}>
            <RatingPill value={RATING.score} count={RATING.count} />
          </div>

          <p
            style={{
              margin: "var(--space-6) 0 0",
              fontSize: "var(--size-body)",
              fontWeight: 700,
            }}
          >
            What gender is your dog?
          </p>

          <StartChoice
            config={itchV2Quiz}
            field="gender"
            options={[
              { label: "Male", icon: "mars" },
              { label: "Female", icon: "venus", variant: "accent" },
            ]}
          />
        </div>
      </main>

      <footer style={{ borderTop: "1px solid var(--border-hairline)", padding: "var(--space-12) var(--page-gutter-mobile)", marginTop: "var(--space-16)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <Wordmark size={22} tone="ink" style={{ opacity: 0.35 }} />
          <p style={{ margin: "var(--space-6) 0 var(--space-6)", fontSize: "var(--size-meta)", color: "var(--ink-80)" }}>
            Copyright © 2026 SUNNYCELLS. All rights reserved.
          </p>
          {FOOTER_LINKS.map((row, i) => (
            <div key={i} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 var(--space-6)" }}>
              {row.map((l) => (
                <NavLink key={l.label} href={l.href} size="sm" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
                  {l.label}
                </NavLink>
              ))}
            </div>
          ))}
          <p style={{ margin: "var(--space-8) 0 0", fontSize: "var(--size-meta)", color: "var(--ink-60)", lineHeight: 1.5 }}>
            These statements have not been evaluated by the Food and Drug Administration.
            This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </footer>
    </>
  );
}
