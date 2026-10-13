"use client";

import { useSyncExternalStore } from "react";
import { useAnswers } from "@/lib/quiz/store";
import m from "./mock.module.css";

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

/** Names from the quiz and checkout, with wording that still reads right when they are missing. */
export function useOliverText() {
  const { answers } = useAnswers(QUIZ_ID);
  const first = useBuyerFirstName();
  const dog = titleCase(answers["dog-name"] ?? "");
  const dogName = dog || "your dog";
  const possessive = dog ? `${dog}'s` : "your dog's";
  const message = `Hi Oliver, ${first ? `it's ${first}. ` : ""}I'd like to book ${possessive} call.`;
  return { first, dogName, possessive, message, href: `sms:${OLIVER}?&body=${encodeURIComponent(message)}` };
}

/* Stand-in until there is a real photo of Oliver. */
export function OliverAvatar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Oliver">
      <rect width="100" height="100" fill="#C9D6EE" />
      <path d="M10 100c2-22 18-34 40-34s38 12 40 34z" fill="#14213D" />
      <path d="M40 66l10 12 10-12z" fill="#fff" />
      <rect x="43" y="52" width="14" height="16" rx="6" fill="#E3B58F" />
      <ellipse cx="50" cy="40" rx="17" ry="20" fill="#EBBF9A" />
      <path d="M32 38c0-14 9-22 19-22 11 0 18 8 17 22-4-8-9-11-18-11-8 0-14 3-18 11z" fill="#5A3E2B" />
      <circle cx="43.5" cy="42" r="2" fill="#2B2B2B" />
      <circle cx="56.5" cy="42" r="2" fill="#2B2B2B" />
      <path d="M42 50c4 5 12 5 16 0" stroke="#8A4B3A" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function OliverTop({ qr }: { qr: string }) {
  const { first, dogName, possessive, message, href } = useOliverText();
  return (
    <>
      <div className={m.banner}>
        <p className={m.b1}>Your order is in</p>
        <p className={m.b2}>Do this now for the best results</p>
      </div>

      <div className={m.top}>
        <div className={m.left}>
          <h1 className={m.h1}>Book {possessive} protocol review call</h1>

          <div className={m.hdr}>
            <OliverAvatar className={m.avLg} />
            <p className={m.hdrName}>Oliver</p>
            <p className={m.hdrRole}>Friday Zoomies customer care</p>
          </div>

          <div className={m.thread}>
            <OliverAvatar className={m.avSm} />
            <div className={m.col}>
              <p className={m.bubble}>{first ? `Hi ${first}, it's Oliver.` : "Hi, it's Oliver."} Thank you for trusting us with {dogName}.</p>
              <p className={m.bubble}>
                I want {dogName} to stop the itching for good. So I&apos;ll spend <b>10 minutes</b> with you on the phone, hear
                what {dogName}&apos;s been going through, and explain exactly how to use the spray and chews for best results.
              </p>
              <p className={`${m.bubble} ${m.last}`}>
                You&apos;ll know what to watch for, and we&apos;ll send an extra surprise for {dogName}.
              </p>
            </div>
          </div>

          <a className={m.btn} href={href}>Text Oliver Now</a>
          <p className={m.sub}>Opens your messages with the text ready to send.</p>
          <p className={m.reply}><span className={m.dot} aria-hidden="true" />Oliver usually replies within an hour</p>
          <p className={m.number}>Or text <b>{OLIVER_DISPLAY}</b> from your phone.</p>

          <div className={m.outRow}><p className={m.out}>{message}</p></div>
          <p className={m.outCap}>What you&apos;ll send. Press send.</p>
        </div>

        <aside className={m.qr} aria-label="Text Oliver from your phone">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qr} alt="QR code that opens a text to Oliver" width={170} height={170} />
          <p className={m.qrTitle}>Scan to text Oliver</p>
          <p className={m.qrSub}>Point your phone&apos;s camera here, or text {OLIVER_DISPLAY}.</p>
        </aside>
      </div>
    </>
  );
}

export function OliverCover() {
  const { dogName, href } = useOliverText();
  return (
    <>
      <section className={m.card} aria-label="What we will cover">
        <h2 className={m.h2}>What we&apos;ll cover</h2>
        <ul className={m.checks}>
          <li><span className={m.tick} aria-hidden="true" />How to use the spray and chews for best results</li>
          <li><span className={m.tick} aria-hidden="true" />What to watch for in the first 12 weeks</li>
          <li><span className={m.tick} aria-hidden="true" />What&apos;s helped {dogName} before, and what hasn&apos;t</li>
        </ul>
      </section>

      <section className={m.gift} aria-label="Extra surprise">
        <div className={m.giftBox} aria-hidden="true">extra<br />surprise</div>
        <div>
          <h2 className={m.h2}>An extra surprise for {dogName}</h2>
          <p className={m.giftBody}>It comes with the call, on top of what&apos;s already in your order.</p>
        </div>
      </section>

      <a className={m.btn} href={href}>Text Oliver Now</a>
    </>
  );
}
