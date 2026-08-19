"use client";

import { Fragment } from "react";
import Image from "next/image";
import { Accordion } from "@/components/navigation/Accordion";
import { Badge } from "@/components/core/Badge";
import { BrandText } from "@/components/core/BrandText";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { StarRating } from "@/components/commerce/StarRating";
import { Wordmark } from "@/components/core/Wordmark";
import { dietQuiz } from "@/lib/quiz/diet";
import { useAnswers } from "@/lib/quiz/store";
import {
  COMPARISON, FAQS, HEADLINE_REVIEW, INGREDIENTS, PILLARS, QUICK_BENEFITS, REVIEWS,
} from "@/lib/quiz/plansContent";
import { AnnouncementMarquee } from "./AnnouncementMarquee";
import { HeroCarousel } from "./HeroCarousel";
import { OfferCountdown } from "./OfferCountdown";
import { CardBrandMark } from "./CardBrandMark";
import { UsaFlag } from "./UsaFlag";
import { PlanCards } from "./PlanCards";

const PRESS = [
  { name: "Business Insider", src: "/press/business-insider.webp", width: 256, height: 80 },
  { name: "Women's Health", src: "/press/womens-health.webp", width: 256, height: 52 },
  { name: "Healthline", src: "/press/healthline.webp", width: 256, height: 42 },
  { name: "Sports Illustrated", src: "/press/sports-illustrated.webp", width: 256, height: 78 },
];

const TESTING = [
  {
    badge: "/badges/third-party-tested.webp",
    title: "3rd party tested",
    body: "SUNNYCELLS is tested at an independent scientific laboratory to guarantee quality and efficacy.",
  },
  {
    badge: "/badges/heavy-metal-tested.webp",
    title: "Heavy metal tested",
    body: "Know with absolute confidence all ingredients have been examined for heavy metals using world class testing methods.",
  },
];

const HERO_POINTS = ["Helps with weight loss", "Lowers cortisol levels", "Relieves mood swings"];

const TRUST = [
  { icon: "truck", label: "Free shipping" },
  { icon: "flag", label: "SUNNYCELLS is made in the USA", flag: true },
  { icon: "book-open", label: "Scientifically proven" },
] as const;

/* Card networks we accept. Rendered from the same marks the checkout field uses, so
   there is one place to drop the official artwork into. No PayPal: we do not take it.
   No processor badge either, since none is wired up yet. */
const PAYMENT_BRANDS = ["visa", "mastercard", "amex", "discover"] as const;

function Section({
  eyebrow, title, sub, children, tone = "white", id, wide = false,
}: {
  /** Raises the container so four cards fit a row instead of three. */
  wide?: boolean;
  /** Small line above the heading. Sentence case in the label face, per the system. */
  eyebrow?: string;
  title?: string;
  sub?: string;
  children: React.ReactNode;
  tone?: "white" | "shell";
  id?: string;
}) {
  return (
    <section
      id={id}
      style={{
        background: tone === "shell" ? "var(--surface-sunk)" : "var(--surface-page)",
        padding: "var(--space-16) var(--page-gutter-mobile)",
      }}
    >
      <div style={{ maxWidth: wide ? 1180 : 960, margin: "0 auto" }}>
        {eyebrow ? (
          <div
            style={{
              marginBottom: "var(--space-2)",
              textAlign: "center",
              fontFamily: "var(--font-label)",
              fontSize: "var(--size-meta)",
              fontWeight: 600,
              letterSpacing: "var(--tracking-mono)",
              color: "var(--ink-60)",
            }}
          >
            {eyebrow}
          </div>
        ) : null}
        {title ? (
          <h2
            style={{
              margin: "0 0 var(--space-3)",
              textAlign: "center",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--size-h4), 5.4vw, var(--size-h2))",
              fontWeight: 900,
              letterSpacing: "var(--tracking-heading)",
              lineHeight: "var(--leading-snug)",
            }}
          >
            {title}
          </h2>
        ) : null}
        {sub ? (
          <p style={{ margin: "0 auto var(--space-8)", maxWidth: 620, textAlign: "center", fontSize: "var(--size-body)", color: "var(--ink-80)" }}>
            {sub}
          </p>
        ) : (
          title && <div style={{ height: "var(--space-8)" }} />
        )}
        {children}
      </div>
    </section>
  );
}

function Tick() {
  return (
    <span
      aria-hidden="true"
      style={{
        flex: "none",
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: "var(--ink)",
        color: "var(--sun)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon name="check" size={15} strokeWidth={3.5} />
    </span>
  );
}

export function PlansScreen({
  destinationHref = "/quiz/diet/results/checkout",
  planCtaLabel = "Try now",
  optimizedImages = false,
}: {
  destinationHref?: string;
  planCtaLabel?: string;
  optimizedImages?: boolean;
}) {
  const { answers } = useAnswers(dietQuiz.id);
  const set = answers.gender === "Male" ? "male" : "female";

  return (
    <div style={{ background: "var(--surface-page)" }}>
      {/* Offer bar. The countdown is the brand's one timer, called out in
          OfferCountdown. Sun with ink on it, the only pairing allowed on yellow. */}
      <div
        style={{
          background: "var(--sun)",
          color: "var(--ink)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-3) var(--space-6)",
          padding: "8px var(--page-gutter-mobile)",
          fontSize: "var(--size-meta)",
          fontWeight: 700,
          letterSpacing: "var(--tracking-caps)",
          textTransform: "uppercase",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-3)" }}>
          Limited time offer <Badge tone="ink">up to 60% off</Badge> <OfferCountdown />
        </span>
      </div>

      <AnnouncementMarquee
        terms={[
          { strong: "Free shipping", rest: "on all orders" },
          { strong: "30 day", rest: "money back guarantee" },
          { strong: "Skip or cancel", rest: "anytime" },
        ]}
      />

      {/* Hero */}
      <section style={{ padding: "var(--space-8) var(--page-gutter-mobile) var(--space-12)" }}>
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            display: "grid",
            /* 440, not 300: at 300 the hero split into two columns while each was only
               ~314px, narrower than the heading needs, which broke it onto two lines.
               min(440px, 100%) is what keeps that floor from forcing a 440px column on
               a 360px phone and pushing the page sideways. */
            gridTemplateColumns: "repeat(auto-fit, minmax(min(440px, 100%), 1fr))",
            gap: "var(--space-8)",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                /* Sized to keep this on one line at every width. At the old cap it
                   broke after "natural" on desktop. */
                fontSize: "clamp(var(--size-h4), 5.4vw, var(--size-h2))",
                fontWeight: 900,
                letterSpacing: "var(--tracking-heading)",
                lineHeight: "var(--leading-snug)",
              }}
            >
              Complete natural formula
            </h1>
            <p style={{ margin: "var(--space-4) 0 var(--space-6)", fontSize: "var(--size-body-lg)", lineHeight: 1.35 }}>
              <BrandText>SUNNYCELLS is here to release your stress and help you to lose weight.</BrandText>
            </p>
            <ul style={{ margin: "0 0 var(--space-6)", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {HERO_POINTS.map((h) => (
                <li key={h} style={{ display: "flex", gap: "var(--space-3)", alignItems: "center", fontSize: "var(--size-body)" }}>
                  <Tick />
                  {h}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-4)" }}>
              <Button
                size="lg"
                fullWidth
                onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get it now
              </Button>

              {/* The shipping line as a badge rather than a note under the button, so it
                  reads as a term of the offer instead of small print. */}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  minHeight: "var(--control-h-lg)",
                  padding: "var(--space-2) var(--space-5) var(--space-2) var(--space-2)",
                  background: "var(--white)",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "var(--radius-pill)",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "var(--sun)",
                    color: "var(--ink)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="percent" size={22} strokeWidth={2.5} />
                </span>
                <span style={{ lineHeight: 1.25 }}>
                  <span style={{ display: "block", fontSize: "var(--size-body)", fontWeight: 800 }}>Order now</span>
                  <span style={{ display: "block", fontSize: "var(--size-meta)" }}>
                    and get it shipped for <strong style={{ fontWeight: 800 }}>free</strong>
                  </span>
                </span>
              </span>
            </div>
          </div>

          <HeroCarousel pouchSrc={optimizedImages ? "/product/metabolic-morning-blend.webp" : undefined} />
        </div>
      </section>

      {/* Plans */}
      <Section id="plans" title="Let the Blend do the work" tone="shell">
        {/* Sits above the cards, where it is an argument for the longer supply rather
            than a line of small print underneath one. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-4)",
            maxWidth: 620,
            margin: "0 auto var(--space-8)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              flex: "none",
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "var(--sun)",
              color: "var(--ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "var(--size-body)",
              letterSpacing: "-0.02em",
            }}
          >
            2x
          </span>
          <span style={{ fontSize: "var(--size-body)", lineHeight: 1.35, textAlign: "left" }}>
            <BrandText>
              People using SUNNYCELLS for 3 months lose twice as much weight as for 1 month
            </BrandText>
          </span>
        </div>

        <PlanCards
          destinationHref={destinationHref}
          ctaLabel={planCtaLabel}
          optimizedImages={optimizedImages}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "var(--space-6) var(--space-8)",
            marginTop: "var(--space-10)",
          }}
        >
          {TRUST.map((t) => (
            <div key={t.label} style={{ width: 140, textAlign: "center" }}>
              <span
                aria-hidden="true"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  border: "1px solid var(--border-hairline)",
                  background: "var(--white)",
                  color: "var(--ink)",
                }}
              >
                {"flag" in t ? <UsaFlag size={26} /> : <Icon name={t.icon} size={24} />}
              </span>
              <span style={{ display: "block", marginTop: "var(--space-3)", fontSize: "var(--size-meta)", lineHeight: 1.3 }}>
                <BrandText>{t.label}</BrandText>
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-3)",
            marginTop: "var(--space-8)",
            paddingTop: "var(--space-6)",
            borderTop: "1px solid var(--border-hairline)",
          }}
        >
          {PAYMENT_BRANDS.map((brand) => (
            <CardBrandMark key={brand} brand={brand} height={30} />
          ))}
        </div>
      </Section>

      {/* Quick benefits */}
      <Section>
        <div
          style={{
            background: "var(--surface-sunk)",
            border: "1px solid var(--border-hairline)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-8) var(--space-6)",
          }}
        >
          <h2
            style={{
              margin: "0 0 var(--space-6)",
              textAlign: "center",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--size-h4), 5.4vw, var(--size-h2))",
              fontWeight: 900,
              letterSpacing: "var(--tracking-heading)",
            }}
          >
            Benefits
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "var(--space-5)" }}>
            {/* 190px, not 210: at 210 the fourth item dropped to a second row on a
                1000px viewport, three across and one alone. */}
            {QUICK_BENEFITS.map((b) => (
              <div key={b.strong} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
                <Tick />
                <span style={{ fontSize: "var(--size-meta)", lineHeight: 1.45 }}>
                  {b.lead}
                  <strong style={{ fontWeight: 800 }}>{b.strong}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars sit inside the same section, so the two blocks read as one band
           rather than being pushed apart by two lots of section padding. */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--space-5)", marginTop: "var(--space-5)" }}>
          {PILLARS.map((p) => (
            <div
              key={p.slug}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "var(--surface-sunk)",
                border: "1px solid var(--border-hairline)",
                borderRadius: "var(--radius-xl)",
                padding: "var(--space-6)",
              }}
            >
              <Image
                src={`/illustrations/${p.slug}-${set}.png`}
                alt=""
                width={320}
                height={320}
                style={{ width: 130, height: 130, margin: "0 auto var(--space-6)" }}
              />
              <h3
                style={{
                  margin: "0 0 var(--space-3)",
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--size-h4)",
                  fontWeight: 900,
                  letterSpacing: "var(--tracking-heading)",
                  lineHeight: 1.2,
                }}
              >
                {p.title}
              </h3>
              <p style={{ margin: 0, fontSize: "var(--size-meta)", color: "var(--ink-80)", lineHeight: 1.55 }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Press */}
      <Section eyebrow="Research backed ingredients" title="Featured in">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            alignItems: "center",
            justifyItems: "center",
            gap: "var(--space-8)",
            maxWidth: 760,
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
              style={{ width: "100%", height: "auto", maxWidth: 150, maxHeight: 46, objectFit: "contain", filter: "grayscale(1)", opacity: 0.55 }}
            />
          ))}
        </div>
      </Section>

      {/* Headline review */}
      <Section tone="shell">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-8)", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
              <span style={{ fontSize: "var(--size-meta)", fontWeight: 700 }}>{HEADLINE_REVIEW.name}</span>
              <Badge tone="success">Verified</Badge>
            </div>
            <StarRating value={5} size={18} />
            <h3 style={{ margin: "var(--space-4) 0 var(--space-3)", fontFamily: "var(--font-display)", fontSize: "var(--size-h4)", fontWeight: 900, letterSpacing: "var(--tracking-heading)", lineHeight: 1.2 }}>
              {HEADLINE_REVIEW.title}
            </h3>
            <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)", color: "var(--ink-80)" }}>
              {HEADLINE_REVIEW.body}
            </p>
          </div>
          <Image
            src={`/photos/story-${set}.jpg`}
            alt=""
            width={1080}
            height={1480}
            style={{ width: "auto", maxWidth: "100%", maxHeight: 420, height: "auto", margin: "0 auto", display: "block", borderRadius: "var(--radius-card)" }}
          />
        </div>
      </Section>

      {/* Reviews */}
      <Section wide title="Thousands of happy clients" sub="Read what customers around the world say.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))", gap: "var(--space-5)" }}>
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
                padding: "var(--space-5)",
                background: "var(--surface-sunk)",
                border: "1px solid var(--border-hairline)",
                borderRadius: "var(--radius-xl)",
              }}
            >
              {/* Headline block on the left, photo on the right, body full width
                  beneath. Keeps the cards even when a headline runs to three lines. */}
              <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "flex-start" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <StarRating value={5} size={16} />
                  <h3
                    style={{
                      margin: "var(--space-3) 0 var(--space-3)",
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--size-body-lg)",
                      fontWeight: 900,
                      letterSpacing: "var(--tracking-heading)",
                      lineHeight: 1.2,
                    }}
                  >
                    {r.title}
                  </h3>
                  <div style={{ fontSize: "var(--size-meta)", fontWeight: 700 }}>{r.name}</div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: "var(--space-2)",
                      padding: "3px 10px 3px 6px",
                      background: "var(--status-success-tint)",
                      color: "var(--status-success)",
                      borderRadius: "var(--radius-pill)",
                      fontSize: "var(--size-meta)",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Icon name="check" size={14} strokeWidth={3} />
                    Verified buyer
                  </span>
                </div>
                <Image
                  src={r.photo}
                  alt=""
                  width={600}
                  height={600}
                  style={{ flex: "none", width: 88, height: 88, objectFit: "cover", borderRadius: "var(--radius-md)" }}
                />
              </div>
              <p style={{ margin: 0, fontSize: "var(--size-meta)", lineHeight: 1.55, color: "var(--ink-80)" }}>{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Ingredients */}
      <Section title="The science behind the core ingredients of Metabolic Morning Blend" tone="shell">
        {/* 660, not 760: Accordion holds its body to a 620px reading measure, so a
            wider container left the photo floating short of the panel edge. */}
        <div style={{ maxWidth: 660, margin: "0 auto" }}>
          <Accordion
            items={INGREDIENTS.map((ing) => ({
              title: ing.title,
              body: (
                <div>
                  <Image
                    src={`/ingredients/${ing.slug}.jpg`}
                    alt=""
                    width={800}
                    height={450}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      borderRadius: "var(--radius-md)",
                      marginBottom: "var(--space-5)",
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                    {ing.points.map(([lead, body]) => (
                      <div key={lead} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
                        <Tick />
                        <span>
                          <span style={{ display: "block", fontSize: "var(--size-meta)", fontWeight: 800 }}>{lead}</span>
                          <span style={{ display: "block", marginTop: 2, fontSize: "var(--size-meta)", color: "var(--ink-80)", lineHeight: 1.5 }}>
                            {body}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </Section>

      {/* How it works */}
      <Section title="How does it work?">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--space-8)", maxWidth: 720, margin: "0 auto" }}>
          {[
            { img: "step-scoop", title: "Add 1 scoop", body: "Mix a scoop into water or your favorite juice. Drink it in the morning." },
            { img: "step-drink", title: "Feel calmer and healthier", body: "Notice your cortisol blend take effect within 48 hours. Release stress and boost your metabolism." },
          ].map((s) => (
            <div key={s.img} style={{ textAlign: "center" }}>
              <Image src={`/illustrations/${s.img}.png`} alt="" width={320} height={320} style={{ width: 130, height: 130, margin: "0 auto" }} />
              <h3 style={{ margin: "var(--space-3) 0 var(--space-2)", fontSize: "var(--size-body-lg)", fontWeight: 800 }}>{s.title}</h3>
              <p style={{ margin: 0, fontSize: "var(--size-body)", color: "var(--ink-80)", lineHeight: "var(--leading-body)" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Comparison */}
      <Section tone="shell">
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            background: "var(--white)",
            border: "1px solid var(--border-hairline)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-8) var(--space-5) var(--space-6)",
          }}
        >
          <div
            style={{
              display: "grid",
              /* The two verdict columns shrink with the viewport so the row labels keep
                 their measure on a phone. */
              gridTemplateColumns: "minmax(0, 1fr) clamp(56px, 15vw, 110px) clamp(56px, 15vw, 110px)",
              /* Stretch, not centre: centred items shrink to their content, which left
                 the tint band with a white gap between the product cell and the first
                 row. Each cell centres its own content instead. */
              alignItems: "stretch",
            }}
          >
            <div style={{ paddingRight: "var(--space-4)", paddingBottom: "var(--space-5)" }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--size-h4), 5.2vw, var(--size-h2))",
                  fontWeight: 900,
                  letterSpacing: "var(--tracking-heading)",
                  lineHeight: "var(--leading-snug)",
                }}
              >
                Metabolic Morning Blend
              </h2>
              <p style={{ margin: "var(--space-2) 0 0", fontSize: "var(--size-meta)", color: "var(--ink-60)", lineHeight: 1.4 }}>
                Compared to other cortisol lowering drinks
              </p>
            </div>

            {/* Our column is a raised band running the height of the table, which is
                what separates the two verdicts without needing a second colour. */}
            <div
              style={{
                background: "var(--sun-tint)",
                borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
                padding: "var(--space-4) var(--space-2) var(--space-3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={optimizedImages ? "/product/metabolic-morning-blend.webp" : "/product/metabolic-morning-blend.png"}
                alt="Metabolic Morning Blend"
                width={2400}
                height={1792}
                style={{ width: "100%", height: "auto", maxHeight: 88, objectFit: "contain" }}
              />
            </div>

            <div style={{ padding: "var(--space-4) var(--space-2) var(--space-3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Image
                src="/product/generic-tub.png"
                alt="An unbranded competitor tub"
                width={320}
                height={320}
                style={{ width: "100%", height: "auto", maxHeight: 88, objectFit: "contain", opacity: 0.65 }}
              />
            </div>

            {COMPARISON.map((row, i) => {
              const last = i === COMPARISON.length - 1;
              return (
                <Fragment key={row}>
                  <div
                    style={{
                      paddingRight: "var(--space-4)",
                      paddingTop: "var(--space-4)",
                      paddingBottom: "var(--space-4)",
                      borderTop: "1px solid var(--border-hairline)",
                      fontSize: "var(--size-meta)",
                      lineHeight: 1.4,
                    }}
                  >
                    {row}
                  </div>
                  <div
                    style={{
                      background: "var(--sun-tint)",
                      borderRadius: last ? "0 0 var(--radius-lg) var(--radius-lg)" : undefined,
                      display: "flex",
                      justifyContent: "center",
                      alignSelf: "stretch",
                      alignItems: "center",
                      color: "var(--status-success)",
                    }}
                  >
                    <Icon name="check" size={22} strokeWidth={3} title="Yes" />
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "stretch", color: "var(--ink-40)" }}>
                    <Icon name="x" size={20} strokeWidth={2.5} title="No" />
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Testing */}
      <Section title="Pioneering world leading quality standards and testing">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--space-8)", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          {TESTING.map((t) => (
            <div key={t.title}>
              <Image
                src={t.badge}
                alt=""
                width={256}
                height={255}
                style={{ width: 104, height: "auto", margin: "0 auto", display: "block" }}
              />
              <h3 style={{ margin: "var(--space-4) 0 var(--space-2)", fontSize: "var(--size-body-lg)", fontWeight: 800 }}>{t.title}</h3>
              <p style={{ margin: 0, fontSize: "var(--size-meta)", color: "var(--ink-80)", lineHeight: 1.5 }}>
                <BrandText>{t.body}</BrandText>
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section title="Frequently asked questions by our customers" tone="shell">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Accordion items={FAQS} />
        </div>
      </Section>

      <footer style={{ borderTop: "1px solid var(--border-hairline)", padding: "var(--space-12) var(--page-gutter-mobile)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <Wordmark size={20} tone="ink" style={{ opacity: 0.35 }} />
          <p style={{ margin: "var(--space-5) 0 0", fontSize: "var(--size-meta)", color: "var(--ink-60)", lineHeight: 1.55 }}>
            These statements have not been evaluated by the Food and Drug Administration.
            This product is not intended to diagnose, treat, cure, or prevent any disease.
            Results vary from person to person.
          </p>
          <p style={{ margin: "var(--space-4) 0 0", fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>
            Copyright © 2026 SUNNYCELLS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
