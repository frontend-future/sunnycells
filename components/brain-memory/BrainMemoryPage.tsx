import Image from "next/image";
import { Accordion } from "@/components/navigation/Accordion";
import { Icon } from "@/components/core/Icon";
import { Wordmark } from "@/components/core/Wordmark";
import { AnnouncementMarquee } from "@/components/quiz/AnnouncementMarquee";
import {
  BENEFITS, COMPARISON, EXPERTS, FAQ, INGREDIENTS, PRODUCT, STUDIES, TIMELINE,
} from "@/lib/products/brain-memory";
import { BrainMemoryCta } from "./BrainMemoryCta";
import { BrainMemoryOffer } from "./BrainMemoryOffer";
import { BrainMemoryReviews } from "./BrainMemoryReviews";
import { BrainMemoryStickyBar } from "./BrainMemoryStickyBar";
import styles from "./brain-memory.module.css";

const FOOTER = [
  { head: "Shop", links: ["Brain & Memory Power Boost", "Clear Mind", "Take the quiz"] },
  { head: "About", links: ["Our standard", "Ingredients", "Science"] },
  { head: "Help", links: ["Contact", "Shipping", "Returns", "FAQ"] },
];

function Tick() {
  return (
    <span className={styles.tick} aria-hidden="true">
      <Icon name="check" size={13} strokeWidth={3.5} />
    </span>
  );
}

export function BrainMemoryPage() {
  return (
    <div className={styles.page}>
      <AnnouncementMarquee
        terms={[
          { strong: "First bottle free", rest: "just pay shipping" },
          { strong: "30 day", rest: "money back guarantee" },
          { strong: "Skip or cancel", rest: "anytime" },
        ]}
      />

      <header className={styles.header}>
        <div className={`${styles.wrap} ${styles.headerInner}`}>
          <Wordmark size={22} />
          <BrainMemoryCta size="sm">Try it now</BrainMemoryCta>
        </div>
      </header>

      {/* ---------- gallery + buy box ---------- */}
      <BrainMemoryOffer />
      <BrainMemoryStickyBar />

      {/* ---------- the problem ---------- */}
      <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="problem-title">
        <div className={styles.split}>
          <div>
            <h2 className={styles.h2} id="problem-title">
              Modern life doesn&rsquo;t always make it easy
            </h2>
            <p className={styles.lede}>
              Can&rsquo;t find the right word? Walk into a room and forget why? Struggling to stay
              focused or keep up with a conversation? These are not just normal signs of getting
              older. They are signals your brain could use some support.
            </p>
            <p className={styles.lede}>
              {PRODUCT.name} is built to help clear mental fog, sharpen focus, and support long
              term brain health, so distraction and forgetfulness have less room to crowd in.
            </p>
            <div style={{ marginTop: "var(--space-6)" }}>
              <BrainMemoryCta>Try it now</BrainMemoryCta>
            </div>
          </div>
          <Image
            src="/product/brain-memory/checklist.png"
            alt="Backed by real research: sharper thinking, clearer focus, better memory"
            width={1024}
            height={1024}
            className={styles.splitShot}
          />
        </div>
      </section>

      {/* ---------- support your body ---------- */}
      <section className={`${styles.wrap} ${styles.sectionTight}`} aria-labelledby="support-title">
        <div className={styles.centered}>
          <h2 className={styles.h2} id="support-title">
            Support your brain from the inside out
          </h2>
        </div>
        <div className={styles.benefits} style={{ marginTop: "var(--space-10)" }}>
          {BENEFITS.map((b) => (
            <div key={b.name}>
              <span className={styles.benefitIcon}>
                <Icon name={b.icon} size={24} strokeWidth={2} />
              </span>
              <h3 className={styles.benefitName}>{b.name}</h3>
              <p className={styles.pillarCopy}>{b.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- ingredients ---------- */}
      <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="ingredients-title">
        <div className={styles.split}>
          <div>
            <h2 className={styles.h2} id="ingredients-title">
              Six clinically researched actives
            </h2>
            <p className={styles.lede}>
              Every formula is built at effective doses, designed for safety, potency and results
              you can trust.
            </p>

            <div className={styles.ingredientList}>
              {INGREDIENTS.map((ing) => (
                <div className={styles.ingredientItem} key={ing.key}>
                  <span className={styles.ingredientDot} aria-hidden="true">
                    <Icon name="dna" size={22} strokeWidth={2} />
                  </span>
                  <span>
                    <span className={styles.ingredientName}>{ing.name}</span>
                    <span className={styles.ingredientDose}>{ing.dose}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Image
            src="/product/brain-memory/whats-inside.png"
            alt="What's inside Brain & Memory Power Boost: ginkgo biloba, phosphatidylserine, huperzine A, acetyl-L-carnitine, alpha lipoic acid and N-acetyl-L-cysteine"
            width={1024}
            height={1024}
            className={styles.splitShot}
          />
        </div>

        <div className={styles.pillars} style={{ marginTop: "var(--space-12)" }}>
          {INGREDIENTS.map((ing) => (
            <article className={styles.isCard} key={ing.key}>
              <h3 className={styles.pillarName}>{ing.name}</h3>
              <p className={styles.pillarDose} style={{ display: "block", margin: "4px 0 12px" }}>{ing.dose}</p>
              <p className={styles.pillarCopy}>{ing.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- clinical research ---------- */}
      <section className={styles.mechanism} aria-labelledby="studies-title">
        <div className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.centered}>
            <h2 className={styles.h2} id="studies-title">
              Supported by clinical research
            </h2>
          </div>
          <div className={styles.quotes}>
            {STUDIES.map((s) => (
              <div className={styles.quote} key={s.title}>
                <p className={styles.pillarTicksLabel} style={{ margin: 0 }}>{s.sub}</p>
                <h3 className={styles.reviewTitle} style={{ margin: 0 }}>{s.title}</h3>
                <p className={styles.quoteText}>{s.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- expert quotes ---------- */}
      <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="experts-title">
        <div className={styles.centered}>
          <p className={styles.eyebrow}>Backed by research, reviewed by clinicians</p>
          <h2 className={styles.h2} id="experts-title">
            What clinicians say about this formula
          </h2>
        </div>
        <div className={styles.quotes}>
          {EXPERTS.map((e) => (
            <figure className={styles.quote} key={e.name}>
              <blockquote className={styles.quoteText}>&ldquo;{e.quote}&rdquo;</blockquote>
              <figcaption className={styles.quoteWho}>
                {e.name} <span className={styles.verified}>{e.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- customer photos ---------- */}
      <section className={`${styles.wrap} ${styles.section}`} aria-label="Customer photos">
        <div className={styles.photoGrid}>
          <Image
            src="/product/brain-memory/testimonial-morgan.png"
            alt="Morgan T., verified customer: finally remembering names again"
            width={1024}
            height={1024}
            className={styles.photoGridShot}
          />
          <Image
            src="/product/brain-memory/06-testimonial-jordan.png"
            alt="Jordan, verified customer: two weeks in, finally feeling like myself again"
            width={1024}
            height={1024}
            className={styles.photoGridShot}
          />
        </div>
      </section>

      {/* ---------- advantage ---------- */}
      <section className={`${styles.wrap} ${styles.section}`} aria-label="The Sunnycells advantage">
        <Image
          src="/product/brain-memory/advantage.png"
          alt="The Sunnycells advantage: doctor-formulated, 30 day guarantee, six research backed ingredients, easy capsule format, daily cognitive support, compared with other supplements offering none of these"
          width={1024}
          height={1024}
          className={styles.imageBanner}
          style={{ maxWidth: 560 }}
        />
        <ul className={styles.included} style={{ maxWidth: 480, marginInline: "auto", marginTop: "var(--space-8)" }}>
          {COMPARISON.map((c) => (
            <li key={c}>
              <Tick />
              {c}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- what to expect ---------- */}
      <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="expect-title">
        <div className={styles.centered}>
          <h2 className={styles.h2} id="expect-title">
            What to expect, week by week
          </h2>
        </div>
        <div className={styles.worksBox} style={{ maxWidth: 640, marginInline: "auto", marginTop: "var(--space-8)" }}>
          <ul className={styles.worksList}>
            {TIMELINE.map((t) => (
              <li key={t.when}>
                <strong>{t.when}, {t.title}.</strong> {t.copy}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- guarantee ---------- */}
      <section className={`${styles.wrap} ${styles.sectionTight} ${styles.centered}`} aria-label="30 day money back guarantee">
        <Image
          src="/product/brain-memory/guarantee.png"
          alt="30 day money back guarantee: your order is covered by our return policy"
          width={1024}
          height={1024}
          className={styles.imageBanner}
          style={{ maxWidth: 420 }}
        />
      </section>

      <BrainMemoryReviews />

      {/* ---------- FAQ ---------- */}
      <section className={`${styles.wrap} ${styles.section} ${styles.darkBand}`} aria-labelledby="faq-title">
        <div className={styles.centered}>
          <h2 className={styles.h2} id="faq-title">
            Frequently asked questions
          </h2>
        </div>
        <div style={{ maxWidth: 720, margin: "var(--space-8) auto 0" }}>
          <Accordion items={FAQ.map((f) => ({ title: f.title, body: f.body }))} tone="dark" />
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <div className={styles.footerGrid}>
            <div className={styles.footerCol}>
              <Wordmark size={22} />
              <p className={styles.pillarCopy} style={{ marginTop: "var(--space-4)", maxWidth: "28ch" }}>
                The daily use supplement system, backed by science and designed for women.
              </p>
            </div>
            {FOOTER.map((c) => (
              <div className={styles.footerCol} key={c.head}>
                <h3>{c.head}</h3>
                <ul>
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <span className={styles.footerMark} aria-hidden="true">
          SUNNYCELLS
        </span>

        <div className={styles.wrap}>
          <p className={styles.legal}>
            These statements have not been evaluated by the Food and Drug Administration. This
            product is not intended to diagnose, treat, cure, or prevent any disease. Copyright ©
            2026 SUNNYCELLS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
