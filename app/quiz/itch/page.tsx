import type { Metadata } from "next";
import Image from "next/image";
import { NavLink } from "@/components/navigation/NavLink";
import { AnnouncementMarquee } from "@/components/quiz/AnnouncementMarquee";
import { Wordmark } from "@/components/core/Wordmark";
import { RatingPill } from "@/components/quiz/RatingPill";
import { StartChoice } from "@/components/quiz/StartChoice";
import { itchQuiz } from "@/lib/quiz/itch";
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

export default function ItchQuizLandingPage() {
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
          <Image
            src="/quiz/itch/bottle-1.webp"
            alt="SC-01 Daily Chews, a jar of soft chews for dog skin and coat health"
            width={800}
            height={800}
            priority
            style={{
              display: "block",
              width: "100%",
              maxWidth: 360,
              height: "auto",
              maxHeight: "min(21vh, 300px)",
              objectFit: "contain",
              margin: "0 auto",
            }}
          />
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

          <StartChoice
            config={itchQuiz}
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
