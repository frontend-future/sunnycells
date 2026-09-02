"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/core/Icon";
import {
  CTA, FOOT, HERO, INTRO, META, OFFER, SIGNS, SOLUTION, TIMELINE,
} from "@/lib/content/cortisolCollagenMatrix";

/* Deep green ground with a champagne hover, per the brief. Held here rather than in
   three places so every placement stays identical. */
const BTN =
  "block w-full max-w-md mx-auto rounded-lg px-8 py-4 text-center text-lg font-bold " +
  "uppercase tracking-wide text-white shadow-xl transition-all duration-200 md:text-xl " +
  "bg-[#18804F] hover:bg-[#C8A96A] hover:text-[#18804F] hover:scale-[1.02] active:scale-100";

const BODY = "space-y-5 text-lg leading-relaxed text-stone-800 md:text-xl md:leading-[1.75]";

function Cta() {
  return <a href={CTA.href} className={BTN}>{CTA.label}</a>;
}

function Figure({ src, alt, caption, priority }: { src: string; alt: string; caption: string; priority?: boolean }) {
  return (
    <figure className="my-8 md:my-10">
      {/* Plain <img> per the brief rather than next/image. */}
      <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} className="w-full rounded-xl shadow-lg" />
      <figcaption className="mt-3 font-editorial-ui text-sm leading-relaxed italic text-stone-500 md:text-base">
        {caption}
      </figcaption>
    </figure>
  );
}

export function CortisolMatrixPage() {
  /* The offer is not on the page until the reader has been through the five signs and
     reached the section that explains the fix. Nothing above that shows a price. */
  const [pastGate, setPastGate] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const gate = document.getElementById("the-fix");
      if (gate) setPastGate(gate.getBoundingClientRect().top < window.innerHeight * 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-editorial text-stone-800 antialiased">
      <article className="mx-auto max-w-3xl px-5 pb-28 pt-8 md:pt-12">
        {/* Rating, title, subtitle, hero shot. Then straight into it. */}
        <p className="flex items-center justify-center gap-2 font-editorial-ui text-base text-stone-600">
          <span className="flex text-[#C8A96A]" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <Icon key={i} name="star" size={16} fill="currentColor" strokeWidth={0} />
            ))}
          </span>
          <span className="font-semibold text-stone-800">{HERO.rating}</span>
          <span>{HERO.count}</span>
        </p>

        <h1 className="mt-4 text-center font-editorial text-3xl font-bold leading-[1.15] tracking-[-0.01em] text-stone-900 md:text-[2.9rem]">
          {META.title}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-center font-editorial-ui text-lg leading-relaxed text-stone-600 md:text-xl">
          {META.sub}
        </p>

        <Figure
          src={HERO.photo}
          alt={HERO.alt}
          caption="Left: elevated nighttime cortisol. Right: after four weeks of restored deep sleep."
          priority
        />

        <div className={BODY}>
          {INTRO.map((p) => <p key={p}>{p}</p>)}
        </div>

        {SIGNS.map((s) => (
          <section key={s.n} className="mt-12 border-t border-stone-200 pt-10">
            <h2 className="font-editorial text-2xl font-bold leading-tight text-stone-900 md:text-4xl">
              <span className="text-[#C8A96A]">{s.n}.</span> {s.title}
            </h2>
            <Figure src={s.image} alt={s.alt} caption={s.caption} />
            <div className={BODY}>{s.body.map((p) => <p key={p}>{p}</p>)}</div>
          </section>
        ))}

        {/* Everything from here down is where the product first appears. */}
        <section id="the-fix" className="mt-12 border-t border-stone-200 pt-10">
          <h2 className="font-editorial text-2xl font-bold leading-tight text-stone-900 md:text-4xl">
            {SOLUTION.heading}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-stone-800 md:text-xl md:leading-[1.75]">
            {SOLUTION.lead}
          </p>
          <ol className="mt-5 space-y-4 text-lg leading-relaxed text-stone-800 md:text-xl">
            {SOLUTION.numbered.map((t, i) => (
              <li key={t} className="flex gap-4">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#18804F] font-editorial-ui text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-lg font-semibold leading-relaxed text-stone-900 md:text-xl">
            {SOLUTION.bridge}
          </p>

          <Figure src={SOLUTION.image} alt={SOLUTION.alt} caption={SOLUTION.caption} />

          <p className="text-lg leading-relaxed text-stone-800 md:text-xl md:leading-[1.75]">
            {SOLUTION.after}
          </p>

          <div className="mt-8 rounded-xl border border-stone-200 bg-stone-50 p-6 md:p-8">
            <h3 className="font-editorial text-xl font-bold text-stone-900 md:text-2xl">
              {SOLUTION.stackTitle}
            </h3>
            <ul className="mt-5 space-y-5">
              {SOLUTION.stack.map((x) => (
                <li key={x.lead} className="flex gap-3 text-base leading-relaxed text-stone-700 md:text-lg">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 flex-none rounded-full bg-[#C8A96A]" />
                  <span>
                    <strong className="font-bold text-stone-900">{x.lead}</strong>
                    {x.rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10"><Cta /></div>
        </section>

        <section className="mt-12 border-t border-stone-200 pt-10">
          <h2 className="font-editorial text-2xl font-bold leading-tight text-stone-900 md:text-4xl">
            {TIMELINE.heading}
          </h2>
          <ul className="mt-6 space-y-6">
            {TIMELINE.rows.map((r) => (
              <li key={r.when} className="border-l-4 border-[#C8A96A] pl-5">
                <p className="font-editorial text-lg font-bold text-stone-900 md:text-xl">{r.when}</p>
                <p className="mt-1 text-lg leading-relaxed text-stone-800 md:text-xl">{r.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 border-t border-stone-200 pt-10">
          <Figure src={OFFER.image} alt={OFFER.alt} caption={OFFER.caption} />
          <div className={BODY}>{OFFER.body.map((p) => <p key={p}>{p}</p>)}</div>
          <div className="mt-8 rounded-xl border-2 border-[#18804F] bg-[#18804F]/[0.04] p-6 text-center md:p-10">
            <p className="font-editorial text-xl font-bold text-[#18804F] md:text-3xl">
              {OFFER.offerLine}
            </p>
            {/* The first-order price never stands alone. */}
            <p className="mt-3 font-editorial-ui text-lg font-semibold text-stone-900 md:text-xl">
              {OFFER.offerPrice}
            </p>
            <p className="mt-2 font-editorial-ui text-base text-stone-600">{OFFER.guarantee}</p>
            <div className="mt-7"><Cta /></div>
          </div>
        </section>

        {/* Paid-content disclosure and the FDA line, at the foot rather than as a strip
            across the top. Still on the page: this is an ad for something we sell. */}
        <footer className="mt-12 border-t border-stone-200 pt-8">
          <p className="font-editorial-ui text-sm leading-relaxed text-stone-500">{FOOT.disclosure}</p>
          <p className="mt-3 font-editorial-ui text-sm leading-relaxed text-stone-500">{FOOT.footnote}</p>
        </footer>
      </article>

      {/* The offer bar, only once the reader has reached the section that explains the
          fix. Above that point the page has no price on it. */}
      <div
        aria-hidden={!pastGate}
        className={
          "fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 px-4 py-3 " +
          "shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 " +
          (pastGate ? "translate-y-0" : "pointer-events-none translate-y-full")
        }
      >
        <div className="mx-auto max-w-2xl">
          <a
            href={CTA.href}
            className="block w-full rounded-lg bg-[#18804F] px-4 py-4 text-center font-editorial-ui text-base font-bold uppercase tracking-wide text-white shadow-xl transition-transform duration-200 hover:bg-[#166E45] active:scale-[0.99]"
          >
            {CTA.label}
          </a>
        </div>
      </div>
    </div>
  );
}
