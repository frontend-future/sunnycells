import type { Metadata } from "next";
import Image from "next/image";
import { Wordmark } from "@/components/core/Wordmark";
import { AnnouncementMarquee } from "@/components/quiz/AnnouncementMarquee";
import { RatingPill } from "@/components/quiz/RatingPill";
import { StartChoice } from "@/components/quiz/StartChoice";
import { PRODUCT, RATING } from "@/lib/products/brain-memory";
import { brainV3Quiz } from "@/lib/quiz/brainV3";

export const metadata: Metadata = {
  title: "Brain age quiz | SUNNYCELLS",
  description: "Find out your brain age in about two minutes, and what a stimulant-free, doctor-formulated routine can do about the gap.",
};

const PRESS = [
  { name: "Business Insider", src: "/press/business-insider.webp", width: 256, height: 80 },
  { name: "Women's Health", src: "/press/womens-health.webp", width: 256, height: 52 },
  { name: "Healthline", src: "/press/healthline.webp", width: 256, height: 42 },
  { name: "Sports Illustrated", src: "/press/sports-illustrated.webp", width: 256, height: 78 },
];

export default function BrainV3LandingPage() {
  return (
    <>
      <AnnouncementMarquee
        terms={[
          { strong: "First bottle free", rest: "just cover shipping" },
          { strong: "30 day", rest: "money back guarantee" },
          { strong: "Skip or cancel", rest: "anytime" },
        ]}
      />

      <div style={{ position: "relative", background: "var(--sky-tint)" }}>
        <div style={{ width: "100%", maxWidth: "var(--page-max)", margin: "0 auto", padding: "var(--space-4) var(--page-gutter-mobile) 0" }}>
          <Wordmark size={26} />
          {/* Generated stock-style photo, not a real customer: no name or quote is
              attached to it, unlike the story screen's placeholder testimonial. */}
          <div
            style={{
              maxWidth: 560,
              margin: "var(--space-4) auto 0",
              aspectRatio: "4 / 3",
              maxHeight: "min(34vh, 340px)",
              borderRadius: "var(--radius-card)",
              overflow: "hidden",
            }}
          >
            <Image
              src="/quiz/brain/hero-couple.webp"
              alt={`A couple smiling and holding a bottle of ${PRODUCT.name}`}
              width={1200}
              height={876}
              priority
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
            />
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
            <span style={{ fontWeight: 600 }}>Clear brain fog &amp; sharpen your mind with </span>
            <span style={{ fontWeight: 900 }}>{PRODUCT.name}</span>
          </h1>

          <p style={{ maxWidth: 480, margin: "var(--space-4) auto 0", fontSize: "var(--size-body)", lineHeight: 1.45, textWrap: "pretty" }}>
            A stimulant-free, doctor-formulated routine can support sharper recall, less
            brain fog, and steadier mental clarity in as little as 90 days.
          </p>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--space-4)" }}>
            <RatingPill value={RATING.score} count={RATING.count} />
          </div>

          <StartChoice
            config={brainV3Quiz}
            field="gender"
            options={[
              { label: "Male", icon: "mars" },
              { label: "Female", icon: "venus", variant: "accent" },
            ]}
          />
        </div>

        <section style={{ padding: "var(--space-16) 0 var(--space-12)", textAlign: "center" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              justifyItems: "center",
              gap: "var(--space-10) var(--space-8)",
              maxWidth: 460,
              margin: "0 auto",
            }}
          >
            {PRESS.map((p) => (
              <Image
                key={p.src}
                src={p.src}
                alt={p.name}
                width={p.width}
                height={p.height}
                style={{ width: "100%", height: "auto", maxWidth: 180, maxHeight: 56, objectFit: "contain", filter: "grayscale(1)", opacity: 0.55 }}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
