"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  BENEFITS, BUY, DECLINE, DEFICIENCY, FAQS, FINAL, FIRST_PRICE, FOOTER, GIFTS, HERO,
  LONG_FAQ, MODERN, money, OFFER, OVER_TIME, PRESS, QUALITY, REAL_PEOPLE, SALE_PERCENT,
  SAYING, SHORT_FAQ, STRIP_REVIEWS, SUB_PRICE, SURVEY, THUMBS, WHY,
} from "@/lib/products/beetroot";
import { BeetIcon } from "./BeetrootIcons";
import s from "./beetroot.module.css";

const Stars = ({ size = 15 }: { size?: number }) => (
  <span className={s.stars} style={{ fontSize: size }} aria-hidden="true">★★★★★</span>
);

/* Every shot fills a box the design already sized, so they are all fill + cover
   rather than intrinsic. `sizes` keeps the optimiser from serving a 1400px file into
   a 88px thumbnail. */
const Art = ({
  photo, className, sizes = "(max-width: 900px) 100vw, 50vw", priority,
}: {
  photo: { src: string; alt: string };
  className?: string;
  sizes?: string;
  priority?: boolean;
}) => (
  <div className={`${s.shot} ${className ?? ""}`}>
    <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />
  </div>
);

const pad = (n: number) => String(n).padStart(2, "0");

/** One accordion, used by all three FAQ blocks. `card` gives each row its own border. */
function Faq({ items, card, startOpen = -1 }: { items: [string, string][]; card?: boolean; startOpen?: number }) {
  const [open, setOpen] = useState(startOpen);
  return (
    <div className={card ? undefined : s.acc} style={card ? { display: "grid", gap: 14 } : undefined}>
      {items.map(([q, a], i) => (
        <div key={q} className={card ? s.accCard : s.accRow}>
          <button
            type="button"
            className={s.accBtn}
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <span>{q}</span>
            <span className={s.accSign} aria-hidden="true">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && <div className={s.accBody}>{a}</div>}
        </div>
      ))}
    </div>
  );
}

export function BeetrootLander() {
  const [img, setImg] = useState(0);
  const [count, setCount] = useState(1);
  /* The design opens the buy-box accordion on its first row. */
  const [left, setLeft] = useState(10 * 3600 + 21 * 60 + 18);
  const [mounted, setMounted] = useState(false);

  /* Both the clock and the dated gift deadline are read on the client only. A
     statically rendered page would otherwise bake in the build date and the server
     and client markup would disagree on first paint. */
  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setLeft((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const offerDate = (() => {
    const d = new Date();
    const day = d.getDate();
    const suf = day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th";
    return `${d.toLocaleDateString("en-US", { month: "long" })} ${day}${suf}`;
  })();

  const cta = (
    <div className={s.ctaBlock}>
      <a href="#product" className={s.pill}>{OFFER.ctaLabel}</a>
      <span className={s.riskFree}>
        <span className={s.dot} aria-hidden="true">✓</span>
        <span>Try It <strong style={{ textDecoration: "underline" }}>{OFFER.riskFree}</strong></span>
      </span>
    </div>
  );

  return (
    <div className={s.page}>
      {/* announcement */}
      <div className={s.announce}>
        <span style={{ opacity: .85 }} aria-hidden="true">★</span>
        <span>{OFFER.announcement}</span>
        <span className={s.cd} aria-hidden="true">
          <span>{mounted ? pad(Math.floor(left / 3600)) : "00"}</span>
          <span>{mounted ? pad(Math.floor(left / 60) % 60) : "00"}</span>
          <span>{mounted ? pad(left % 60) : "00"}</span>
        </span>
      </div>

      {/* hero */}
      <section className={s.hero}>
        <div className={`${s.wrap} ${s.heroGrid}`}>
          <div>
            <div className={s.buyRating}>
              <Stars />
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-3)" }}>{HERO.rating}</span>
            </div>
            <h1 className={s.h1}>{HERO.title[0]}<br />{HERO.title[1]}</h1>
            <div className={s.heroPoints}>
              {HERO.points.map((p) => (
                <div key={p.text} className={s.heroPoint}>
                  <span className={s.tick} aria-hidden="true">✓</span>
                  <span>{p.text}{"note" in p && p.note ? <sup className={s.sup}>{p.note}</sup> : null}</span>
                </div>
              ))}
            </div>
            {cta}
          </div>
          <Art photo={HERO.photo} className={s.heroArt} priority />
        </div>
      </section>

      {/* review strip */}
      <section className={s.strip}>
        <div className={`${s.wrap} ${s.stripGrid}`}>
          {STRIP_REVIEWS.map((r) => (
            <div key={r.title} className={s.stripCard}>
              <Stars size={13} />
              <div className={s.stripTitle}>{r.title}</div>
              <div className={s.stripBody}>{r.body}</div>
              <div className={s.who}>{r.who}</div>
            </div>
          ))}
        </div>
      </section>

      {/* press marquee. Doubled so the -50% translate loops seamlessly. */}
      <div className={s.press} aria-hidden="true">
        <div className={s.pressRow}>
          {Array.from({ length: 12 }, (_, i) => <span key={i}>{PRESS[i % PRESS.length]}</span>)}
        </div>
      </div>

      {/* benefits */}
      <section className={s.benefits} id="science">
        <div className={s.mid} style={{ textAlign: "center" }}>
          <h2 className={s.h2}>{BENEFITS.title}</h2>
          <p className={s.lede} style={{ maxWidth: 620, margin: "0 auto" }}>{BENEFITS.lede}</p>
          <div className={s.benefitsGrid}>
            <div className={`${s.benefitCol} ${s.benefitColLeft}`}>
              {BENEFITS.left.map((b) => (
                <div key={b.name}>
                  <div className={s.benefitName}>{b.name}</div>
                  <div className={s.benefitBody}>{b.body}</div>
                </div>
              ))}
            </div>
            <Art photo={BENEFITS.photo} className={s.benefitArt} sizes="(max-width: 900px) 100vw, 33vw" />
            <div className={s.benefitCol}>
              {BENEFITS.right.map((b) => (
                <div key={b.name}>
                  <div className={s.benefitName}>{b.name}</div>
                  <div className={s.benefitBody}>{b.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* deficiency */}
      <section className={s.band}>
        <div className={`${s.wrap} ${s.split}`}>
          <div className={s.splitBody}>
            <h3 className={s.h3}>{DEFICIENCY.title}</h3>
            <p className={s.lede} style={{ fontSize: 15, marginTop: 0, marginBottom: 32 }}>{DEFICIENCY.lede}</p>
            <div className={s.figures}>
              {DEFICIENCY.stats.map((f) => (
                <div key={f.figure}>
                  <div className={`${s.figure} ${f.tone === "plum" ? s.figurePlum : s.figureNavy}`}>{f.figure}</div>
                  <div className={s.figureNote}>{f.body}</div>
                </div>
              ))}
            </div>
            <a href="#product" className={s.btnSm}>{OFFER.ctaLabel}</a>
          </div>
          <Art photo={DEFICIENCY.photo} className={s.splitArt} />
        </div>
      </section>

      {/* survey */}
      <section className={s.band} style={{ paddingTop: 0 }}>
        <div className={`${s.wrap} ${s.surveyCard}`}>
          <h3 className={s.h3} style={{ color: "var(--blue)" }}>{SURVEY.title}</h3>
          <p className={s.lede} style={{ fontSize: 15, maxWidth: 660, margin: "0 auto" }}>{SURVEY.lede}</p>
          <div className={s.surveyGrid}>
            {SURVEY.stats.map((f) => (
              <div key={f.figure}>
                <div className={s.surveyFigure}>{f.figure}</div>
                <div className={s.surveyNote}>{f.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* quality */}
      <section className={s.bandLast}>
        <div className={`${s.wrap} ${s.qualityCard}`}>
          <h3 className={s.h3} style={{ fontSize: 26, color: "var(--blue)" }}>{QUALITY.title}</h3>
          <p className={s.lede} style={{ fontSize: 15, maxWidth: 660, margin: "0 auto" }}>{QUALITY.lede}</p>
          <div className={s.qualityGrid}>
            {QUALITY.items.map((q) => (
              <div key={q} className={s.qualityItem}><span className={s.tick} aria-hidden="true">✓</span>{q}</div>
            ))}
          </div>
        </div>
      </section>

      {/* buy box */}
      <section className={s.buy} id="product">
        <div className={`${s.wrap} ${s.buyHead}`}>
          <div className={s.buyKicker}>{BUY.kicker}</div>
          <div className={s.buyHeadline}>{BUY.headline}</div>
        </div>

        <div className={`${s.wrap} ${s.buyGrid}`}>
          <div className={s.gallery}>
            <div className={s.thumbs}>
              {THUMBS.map((t, i) => (
                <button
                  key={t.short}
                  type="button"
                  onClick={() => setImg(i)}
                  aria-label={`Show ${t.alt}`}
                  aria-pressed={img === i}
                  className={`${s.thumb} ${img === i ? s.thumbOn : ""}`}
                >
                  <Image src={t.src} alt="" fill sizes="88px" style={{ objectFit: "cover" }} />
                </button>
              ))}
            </div>
            <div className={s.stage}>
              <Image
                key={THUMBS[img].src}
                src={THUMBS[img].src}
                alt={THUMBS[img].alt}
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
              />
              <div className={s.saveBadge}>Save {SALE_PERCENT}%</div>
            </div>
          </div>

          <div>
            <div className={s.buyRating}>
              <Stars size={14} />
              <span className={s.buyRatingNote}>{BUY.rating}</span>
            </div>
            <h2 className={s.buyName}>{BUY.name}</h2>
            <p className={s.buyLede}>{BUY.lede}</p>
            <div className={s.buyPoints}>
              {BUY.points.map((p) => (
                <div key={p} className={s.buyPoint}><span className={s.tick} aria-hidden="true">✓</span>{p}</div>
              ))}
            </div>

            <div className={s.priceRow}>
              <span className={s.priceNow}>{money(FIRST_PRICE)}</span>
              <span className={s.priceWas}>{money(SUB_PRICE)}</span>
              <span className={s.priceTag}>{SALE_PERCENT}% OFF TODAY</span>
            </div>

            <div className={s.factRow}>
              {BUY.facts.map((f) => (
                <div key={f} className={s.fact}><span className={s.dot} aria-hidden="true">✓</span>{f}</div>
              ))}
            </div>

            <div className={s.countLabel} id="count-label">{BUY.countLabel}</div>
            <div className={s.countRow} role="group" aria-labelledby="count-label">
              {BUY.counts.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCount(n)}
                  aria-pressed={count === n}
                  className={`${s.count} ${count === n ? s.countOn : ""}`}
                >
                  {n === 1 ? "1 adult" : `${n} adults`}
                </button>
              ))}
            </div>

            <div className={s.giftBox}>
              <div className={s.giftTitle}>{BUY.giftsTitle}</div>
              <div className={s.giftNote}>Exclusive FREE Gifts on Orders by {mounted ? offerDate : "…"}</div>
              <div className={s.giftGrid}>
                {GIFTS.map((g) => (
                  <div key={g.name} className={s.gift}>
                    <div className={`${s.giftTag} ${g.plum ? s.giftTagPlum : s.giftTagBlue}`}>
                      <span>{g.tag}</span>
                      {g.was && <span className={s.giftStrike}>{g.was}</span>}
                    </div>
                    <div className={s.giftArt}>
                      <Image src={g.src} alt={g.alt} fill sizes="120px" style={{ objectFit: "cover" }} />
                    </div>
                    <div className={s.giftName}>{g.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <button type="button" className={s.buyCta}>{BUY.cta}</button>
            <div className={s.applied}>
              <span className={s.appliedStar} aria-hidden="true">✓</span>
              <span className={s.appliedText}>{SALE_PERCENT}% Off Auto-Applied Today</span>
            </div>
            <div className={s.termsLine}>{BUY.terms}</div>

            <div className={s.attrGrid}>
              {BUY.attrs.map((a) => (
                <div key={a.name}>
                  <div className={s.attrDisc}><BeetIcon name={a.icon} size={26} /></div>
                  <div className={s.attrName}>{a.name}</div>
                </div>
              ))}
            </div>

            <Faq items={FAQS} startOpen={0} />
          </div>
        </div>
      </section>

      {/* real people */}
      <section className={s.people} id="reviews">
        <div className={s.mid}>
          <h3 className={s.h3} style={{ textAlign: "center" }}>{REAL_PEOPLE.title}</h3>
          <div className={s.peopleGrid}>
            {REAL_PEOPLE.items.map((r) => (
              <div key={r.who} className={s.personCard}>
                <Stars size={12} />
                <div className={s.personBody} style={{ marginTop: 10 }}>{r.body}</div>
                <div className={s.who}>{r.who}<br />{r.when}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* short faq */}
      <section className={s.shortFaq}>
        <div className={s.narrow}>
          <div style={{ textAlign: "center" }}>
            <div className={s.kicker}>{SHORT_FAQ.kicker}</div>
            <h3 className={s.h3}>{SHORT_FAQ.title}</h3>
          </div>
          <div className={s.shortFaqGrid}>
            <Faq items={SHORT_FAQ.items.slice(0, 3)} card />
            <Faq items={SHORT_FAQ.items.slice(3)} card />
          </div>
        </div>
      </section>

      {/* modern life */}
      <section className={s.modern}>
        <div className={s.narrow}>
          <div className={s.modernGrid}>
            <Art photo={MODERN.photo} className={s.modernArt} sizes="(max-width: 900px) 100vw, 40vw" />
            <div>
              <h3 className={s.h3} style={{ fontSize: 28 }}>{MODERN.title}</h3>
              <p className={s.lede} style={{ fontSize: 14, marginBottom: 16 }}>{MODERN.body}</p>
              <div className={s.modernPoints}>
                {MODERN.points.map((p) => (
                  <div key={p} className={s.modernPoint}><span className={s.tickPlum} aria-hidden="true">✓</span><span>{p}</span></div>
                ))}
              </div>
            </div>
          </div>
          <div className={s.rootCard}>
            <div>
              <div className={s.whyKicker} style={{ fontSize: 12 }}>{MODERN.card.kicker}</div>
              <h4 className={s.h3} style={{ fontSize: 24, margin: "0 0 10px" }}>{MODERN.card.title}</h4>
              <p className={s.lede} style={{ fontSize: 14, marginBottom: 22 }}>{MODERN.card.body}</p>
              <div className={s.rootIcons}>
                {MODERN.card.items.map((i) => (
                  <div key={i.name}>
                    <div className={s.rootDisc}><BeetIcon name={i.icon} size={19} /></div>
                    <div className={s.rootIconName}>{i.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <Art photo={MODERN.card.photo} className={s.rootArt} sizes="(max-width: 900px) 100vw, 30vw" />
          </div>
        </div>
      </section>

      {/* why beetroot */}
      <section className={s.why}>
        <div className={s.narrow}>
          <h3 className={s.h3} style={{ textAlign: "center" }}>{WHY.title}</h3>
          <div className={s.whyGrid}>
            {WHY.cards.map((c) => (
              <div key={c.title} className={s.whyCard}>
                <Art photo={c.photo} className={s.whyArt} sizes="(max-width: 900px) 100vw, 15vw" />
                <div className={s.whyBody}>
                  <div className={s.whyKicker}>{c.kicker}</div>
                  <div className={s.whyTitle}>{c.title}</div>
                  <div className={s.whyText}>{c.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* decline + chart */}
      <section className={s.decline} id="compare">
        <div className={`${s.narrow} ${s.declineGrid}`}>
          <div>
            <div className={s.whyKicker} style={{ fontSize: 12 }}>{DECLINE.kicker}</div>
            <h3 className={s.h3} style={{ fontSize: 28 }}>{DECLINE.title}</h3>
            <p className={s.lede} style={{ fontSize: 14, margin: 0 }}>{DECLINE.body}</p>
          </div>
          <div>
            <div className={s.chartTitle}>{DECLINE.chartTitle}</div>
            <div className={s.bars}>
              {DECLINE.bars.map((b) => (
                <div key={b.value} className={s.bar}>
                  <div className={s.barValue} style={{ color: b.plum ? "var(--plum)" : "var(--faint)" }}>{b.value}</div>
                  <div className={s.barShape} style={{ height: b.height, background: b.plum ? "var(--plum)" : "#DDE3EC" }} />
                  <div className={s.barLabel}>{b.label[0]}<br />{b.label[1]}</div>
                </div>
              ))}
            </div>
            <div className={s.chartNote}>{DECLINE.note}</div>
          </div>
        </div>
      </section>

      {/* over time */}
      <section className={s.overTime}>
        <div className={s.mid}>
          <h3 className={s.h3} style={{ textAlign: "center", marginBottom: 8 }}>{OVER_TIME.title}</h3>
          <p className={s.lede} style={{ fontSize: 14, textAlign: "center", maxWidth: 560, margin: "0 auto" }}>{OVER_TIME.lede}</p>
          <div className={s.rail}>
            <div className={s.railLine} aria-hidden="true" />
            <div className={s.railRow}>
              {OVER_TIME.phases.map((p) => (
                <div key={p.week} className={s.railItem}>
                  <div className={s.railDot} style={{ background: p.dot }} aria-hidden="true" />
                  <div className={s.railWeek}>{p.week}</div>
                  <div className={s.railPill}>{p.pill}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={s.phaseGrid}>
            {OVER_TIME.cards.map((c) => (
              <div key={c.when} className={s.phaseCard}>
                <div className={s.phaseWhen}>{c.when}</div>
                <div className={s.phasePill}>{c.pill}</div>
                <div className={s.phaseBody}>{c.body}</div>
                <div className={s.phaseTicks}>
                  {c.ticks.map((t) => (
                    <div key={t} className={s.phaseTick}><span className={s.tick} style={{ fontSize: 12 }} aria-hidden="true">✓</span><span>{t}</span></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={s.guaranteeBar}>
            <span className={s.guaranteeDisc} aria-hidden="true">✓</span>
            <div>
              <div className={s.guaranteeTitle}>{OVER_TIME.guarantee.title}</div>
              <div className={s.guaranteeBody}>{OVER_TIME.guarantee.body}</div>
            </div>
          </div>
        </div>
      </section>

      {/* customers saying */}
      <section className={s.saying}>
        <div className={`${s.mid} ${s.sayingCard}`}>
          <div className={s.sayingGrid}>
            <div>
              <h3 className={s.h3} style={{ fontSize: 26, marginBottom: 22 }}>{SAYING.title}</h3>
              <div className={s.sayingStats}>
                {SAYING.stats.map((f) => (
                  <div key={f.figure}>
                    <div className={s.sayingFigure}>{f.figure}</div>
                    <div className={s.sayingNote}>{f.body}</div>
                  </div>
                ))}
              </div>
              <div className={s.sayingSplit}>
                <Art photo={SAYING.photo} className={s.sayingArt} sizes="(max-width: 900px) 100vw, 25vw" />
                <div>
                  <div className={s.rootDisc} style={{ marginBottom: 10 }}><BeetIcon name="guarantee" size={19} /></div>
                  <div className={s.sayingBig}>{SAYING.guarantee.big}</div>
                  <div className={s.sayingGuarantee}>{SAYING.guarantee.title}</div>
                  <div className={s.sayingNote} style={{ marginBottom: 12 }}>{SAYING.guarantee.body}</div>
                  <div className={s.sayingTicks}>
                    {SAYING.guarantee.ticks.map((t) => <span key={t} className={s.sayingTick}>✓ {t}</span>)}
                  </div>
                </div>
              </div>
            </div>
            <Art photo={SAYING.portrait} className={s.portrait} sizes="(max-width: 900px) 100vw, 35vw" />
          </div>
        </div>
      </section>

      {/* long faq */}
      <section className={s.longFaq}>
        <h3 className={s.h3} style={{ textAlign: "center" }}>Frequently Asked Questions</h3>
        <div className={s.longFaqList}>
          <Faq items={LONG_FAQ} card />
        </div>
      </section>

      {/* final cta */}
      <section className={s.final}>
        <div className={s.finalGrid}>
          <div>
            <div className={s.buyRating}>
              <Stars />
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink-3)" }}>{FINAL.rating}</span>
            </div>
            <h3 className={s.finalTitle}>{FINAL.title}</h3>
            <div className={s.finalPoints}>
              {FINAL.points.map((p) => (
                <div key={p} className={s.heroPoint}><span className={s.tick} aria-hidden="true">✓</span><span>{p}</span></div>
              ))}
            </div>
            {cta}
          </div>
          <Art photo={FINAL.photo} className={s.finalArt} />
        </div>
      </section>

      {/* footer */}
      <footer className={s.footer}>
        <div className={`${s.wrap} ${s.footerGrid}`}>
          <div>
            <div className={s.footerMark}>SUNNYCELLS</div>
            <div className={s.footerBlurb}>{FOOTER.blurb}</div>
          </div>
          {FOOTER.columns.map((c) => (
            <div key={c.title}>
              <div className={s.footerColTitle}>{c.title}</div>
              <div className={s.footerCol}>
                {c.items.map((i) => <span key={i}>{i}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div className={s.footerBottom}>
          <div className={s.footerLegal}>{FOOTER.disclaimer}</div>
          <div style={{ fontSize: 11, color: "#6C82AC" }}>{FOOTER.copyright}</div>
        </div>
      </footer>
    </div>
  );
}
