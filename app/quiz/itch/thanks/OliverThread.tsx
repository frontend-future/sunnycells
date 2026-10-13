"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useAnswers } from "@/lib/quiz/store";
import m from "./oliver.module.css";

/* Oliver's number, in the form an sms: link wants. */
const OLIVER = "+12147736688";
export const OLIVER_DISPLAY = "(214) 773-6688";
const QUIZ_ID = "itch-fridayzoomies";

const titleCase = (s: string) => s.trim().replace(/(^|\s)(\S)/g, (_, sp, c) => sp + c.toUpperCase());

/* The checkout keeps who is buying in sessionStorage for the Purchase event. Its first name
   is the only place the buyer's own name lives on this page. */
const noop = () => () => {};
function useBuyerFirstName(): string {
  const raw = useSyncExternalStore(
    noop,
    () => { try { return sessionStorage.getItem("fz-buyer") ?? ""; } catch { return ""; } },
    () => "",
  );
  try { return titleCase((JSON.parse(raw || "{}").firstName as string | undefined) ?? ""); } catch { return ""; }
}

/** Names from the quiz and checkout, with wording that still reads right when they are missing.
    `sampleDog` is for a preview page opened without a quiz in the browser; the live page leaves it out. */
export function useOliverText(sampleDog?: string) {
  const { answers } = useAnswers(QUIZ_ID);
  const first = useBuyerFirstName();
  const real = titleCase(answers["dog-name"] ?? "");
  const dogName = real || sampleDog || "your dog";
  const possessive = `${dogName}'s`;
  /* The text is the buyer speaking, so with no name it says "my dog's", never "your dog's". */
  const message = `Hi Oliver, ${first ? `it's ${first}. ` : ""}I'd like to book ${real ? `${real}'s` : "my dog's"} protocol review call.`;
  /* "What gender is your dog?" is the first question of the quiz. With no answer it stays neutral. */
  const their = answers.gender === "Male" ? "his" : answers.gender === "Female" ? "her" : "the";
  return { first, dogName, their, possessive, message, href: `sms:${OLIVER}?&body=${encodeURIComponent(message)}` };
}

export function OliverAvatar({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src="/quiz/fridayzoomies/oliver.jpg" alt="Oliver" width={400} height={400} />;
}

/* Everything below the thread stays hidden until Oliver has sent all three messages, so the messages are
   what gets read first. A module level flag, not context, because the page below is rendered by the server
   and only needs to hear one thing: that the thread has finished. */
let threadDone = false;
const doneListeners = new Set<() => void>();
function markThreadDone() {
  if (threadDone) return;
  threadDone = true;
  doneListeners.forEach((l) => l());
}
function subscribeDone(cb: () => void) {
  doneListeners.add(cb);
  return () => { doneListeners.delete(cb); };
}

export function AfterThread({ children }: { children: React.ReactNode }) {
  const done = useSyncExternalStore(subscribeDone, () => threadDone, () => false);
  return <div className={done ? m.revealed : m.reveal}>{children}</div>;
}

/* Oliver's messages arrive one at a time. A typing bubble shows at the bottom, beside his photo, and each
   message replaces it there while the older ones move up. A hidden copy of the full thread holds the height,
   so the section never changes size. */
/* How long the typing bubble shows before each message arrives, in ms. Longer messages type for longer. */
const TYPING_MS = [900, 1100, 1200, 2000, 1500];
const START_MS = 1000;
const PAUSE_MS = 250;
const TOTAL = TYPING_MS.length;

const STEPS = (() => {
  const steps: { at: number; shown: number; typing: boolean }[] = [];
  let t = START_MS;
  TYPING_MS.forEach((typingMs, i) => {
    steps.push({ at: t, shown: i, typing: true });
    t += typingMs;
    steps.push({ at: t, shown: i + 1, typing: false });
    t += PAUSE_MS;
  });
  return steps;
})();

const calm = () => () => {};
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useThreadStep(): { shown: number; typing: boolean } {
  const reduced = useSyncExternalStore(calm, reducedMotion, () => false);
  const [step, setStep] = useState({ shown: 0, typing: false });
  useEffect(() => {
    if (reduced) return;
    const timers = STEPS.map((st) => setTimeout(() => setStep({ shown: st.shown, typing: st.typing }), st.at));
    return () => timers.forEach(clearTimeout);
  }, [reduced]);
  const current = reduced ? { shown: TOTAL, typing: false } : step;
  useEffect(() => {
    if (current.shown === TOTAL) markThreadDone();
  }, [current.shown]);
  return current;
}

function Thread({ messages }: { messages: React.ReactNode[] }) {
  const { shown, typing } = useThreadStep();
  const tail = typing ? -1 : shown - 1;
  return (
    <div className={m.stackWrap}>
      {/* Reserves the final height, and carries the text for screen readers. */}
      <div className={m.spacer}>
        {messages.map((msg, i) => <p key={i} className={m.bubble}>{msg}</p>)}
      </div>
      <div className={m.stack} aria-hidden="true">
        {messages.map((msg, i) => (
          <div key={i} className={`${m.slot} ${shown > i ? m.on : ""}`}>
            <div className={m.slotInner}>
              <p className={`${m.bubble} ${tail === i ? m.last : ""}`}>{msg}</p>
            </div>
          </div>
        ))}
        <div className={`${m.slot} ${typing ? m.on : ""}`}>
          <div className={m.slotInner}>
            <span className={`${m.typing} ${m.last}`}><i /><i /><i /></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OliverTop({ qr, sampleDog }: { qr: string; sampleDog?: string }) {
  const { first, dogName, their, message, href } = useOliverText(sampleDog);
  return (
    <>
      <div className={m.banner}>
        <p className={m.b1}>Your order is confirmed!</p>
        <p className={m.b2}>One last step for lasting itch relief</p>
      </div>

      <div className={m.top}>
        <div className={m.left}>
          <div className={m.hdr}>
            <OliverAvatar className={m.avLg} />
            <p className={m.hdrName}>Oliver</p>
            <p className={m.hdrRole}>Friday Zoomies customer care</p>
          </div>

          <div className={`${m.thread} ph-no-capture`}>
            <OliverAvatar className={m.avSm} />
            <Thread
              messages={[
                <>{first ? `Hi ${first}, it's Oliver.` : "Hi, it's Oliver."}</>,
                <>Thank you for trusting us with {dogName}.</>,
                <>We&apos;re gonna help {dogName} to stop {their} itching for good.</>,
                <>
                  So I&apos;d like to spend <b>10 minutes</b> with you on the phone, understand what {dogName}&apos;s been going
                  through, and explain exactly how to use the spray and chews for lasting itch relief.
                </>,
                <>You&apos;ll know what to watch for, and we&apos;ll send an extra surprise for {dogName}.</>,
              ]}
            />
          </div>

          <AfterThread>
            <a className={m.btn} href={href}>Text Oliver Now</a>
            <p className={m.reply}><span className={m.dot} aria-hidden="true" />Oliver usually replies within an hour</p>
            <p className={m.number}>Or text <a className={m.tel} href={href}>{OLIVER_DISPLAY}</a> from your phone.</p>

            <div className={`${m.outRow} ph-no-capture`}><p className={m.out}>{message}</p></div>
            <p className={m.outCap}>What you&apos;ll send. Press send.</p>
          </AfterThread>
        </div>

        <aside className={m.qr} aria-label="Text Oliver from your phone">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qr} alt="QR code that opens a text to Oliver" width={170} height={170} />
          <p className={m.qrTitle}>Scan to text Oliver</p>
          <p className={m.qrSub}>Point your phone&apos;s camera here, or text <a className={m.tel} href={href}>{OLIVER_DISPLAY}</a>.</p>
        </aside>
      </div>
    </>
  );
}

/* A flat red and yellow gift box, drawn here so the card needs no image file. */
function GiftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="10" y="31" width="44" height="26" rx="3" fill="#D93B30"/>
      <rect x="10" y="31" width="44" height="4" fill="#B52E26"/>
      <rect x="6" y="22" width="52" height="11" rx="3" fill="#E5483A"/>
      <rect x="6" y="29" width="52" height="4" rx="2" fill="#B52E26"/>
      <rect x="27.5" y="22" width="9" height="35" fill="#FFC845"/>
      <rect x="27.5" y="22" width="9" height="11" fill="#EDB22C"/>
      <path d="M32 22C26 7 12 8 15 17c1.6 5 11 5 17 5z" fill="#FFC845"/>
      <path d="M32 22C38 7 52 8 49 17c-1.6 5-11 5-17 5z" fill="#FFC845"/>
      <path d="M32 22C28 14 21 13 20.5 16.5 20 19.5 26 21.5 32 22z" fill="#EDB22C"/>
      <path d="M32 22C36 14 43 13 43.5 16.5 44 19.5 38 21.5 32 22z" fill="#EDB22C"/>
      <rect x="28" y="19" width="8" height="7" rx="2.5" fill="#EDB22C"/>
    </svg>
  );
}

export function OliverCover({ sampleDog }: { sampleDog?: string }) {
  const { dogName, href } = useOliverText(sampleDog);
  return (
    <>
      <section className={m.card} aria-label="What we will cover">
        <h2 className={m.h2}>What we&apos;ll cover</h2>
        <ul className={m.checks}>
          <li><span className={m.tick} aria-hidden="true" />How to use the spray and chews for lasting itch relief</li>
          <li><span className={m.tick} aria-hidden="true" />What to watch for in the first 12 weeks</li>
          <li><span className={m.tick} aria-hidden="true" />What&apos;s helped {dogName} before, and what hasn&apos;t</li>
        </ul>
      </section>

      <section className={m.gift} aria-label="Extra surprise">
        <GiftIcon className={m.giftBox} />
        <div>
          <h2 className={m.h2}>An extra surprise for {dogName}</h2>
          <p className={m.giftBody}>It comes with the call, on top of what&apos;s already in your order.</p>
        </div>
      </section>

      <a className={m.btn} href={href}>Text Oliver Now</a>
    </>
  );
}
