"use client";

import { useSyncExternalStore } from "react";
import { useAnswers } from "@/lib/quiz/store";
import m from "./mock.module.css";

/* Oliver's number, in the form an sms: link wants. */
const OLIVER = "+12147736688";
export const OLIVER_DISPLAY = "(214) 773-6688";
const QUIZ_ID = "itch-fridayzoomies";
/* The mock shows this name when it is opened without a quiz in the browser, so the page previews right. */
const SAMPLE_DOG = "Bella";

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
  const real = titleCase(answers["dog-name"] ?? "");
  const dogName = real || SAMPLE_DOG;
  const possessive = `${dogName}'s`;
  /* The text is the buyer speaking, so with no name it says "my dog's", never "your dog's". */
  const message = `Hi Oliver, ${first ? `it's ${first}. ` : ""}I'd like to book ${real ? `${real}'s` : "my dog's"} protocol review call.`;
  return { first, dogName, possessive, message, href: `sms:${OLIVER}?&body=${encodeURIComponent(message)}` };
}

export function OliverAvatar({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src="/quiz/fridayzoomies/oliver.jpg" alt="Oliver" width={400} height={400} />;
}

/* Oliver's messages arrive one at a time, each after a typing indicator. All three bubbles hold their
   place from the start, hidden until their turn, so the thread never changes height. The timing is
   plain CSS (see mock.module.css), so there is no flash on load and reduced motion shows them at once. */
const TIMING = [
  { from: "0.8s", dur: "1.4s", at: "2.2s" },
  { from: "2.2s", dur: "1.6s", at: "3.8s" },
  { from: "3.8s", dur: "1.4s", at: "5.2s" },
] as const;

function Msg({ i, last, children }: { i: 0 | 1 | 2; last?: boolean; children: React.ReactNode }) {
  const t = TIMING[i];
  return (
    <div className={m.msg} style={{ ["--from" as string]: t.from, ["--dur" as string]: t.dur, ["--at" as string]: t.at }}>
      <span className={m.typing} aria-hidden="true"><i /><i /><i /></span>
      <p className={`${m.bubble} ${m.pop} ${last ? m.last : ""}`}>{children}</p>
    </div>
  );
}

export function OliverTop({ qr }: { qr: string }) {
  const { first, dogName, message, href } = useOliverText();
  return (
    <>
      <div className={m.banner}>
        <p className={m.b2}>Your order is confirmed!</p>
      </div>

      <div className={m.top}>
        <div className={m.left}>
          <h1 className={m.h1}>Do this now for the best results</h1>

          <div className={m.hdr}>
            <OliverAvatar className={m.avLg} />
            <p className={m.hdrName}>Oliver</p>
            <p className={m.hdrRole}>Friday Zoomies customer care</p>
          </div>

          <div className={m.thread}>
            <OliverAvatar className={m.avSm} />
            <div className={m.col}>
              <Msg i={0}>
                {first ? `Hi ${first}, it's Oliver.` : "Hi, it's Oliver."} Thank you for trusting us with {dogName}.
              </Msg>
              <Msg i={1}>
                I want {dogName} to stop the itching for good. So I&apos;ll spend <b>10 minutes</b> with you on the phone, hear
                what {dogName}&apos;s been going through, and explain exactly how to use the spray and chews for best results.
              </Msg>
              <Msg i={2} last>
                You&apos;ll know what to watch for, and we&apos;ll send an extra surprise for {dogName}.
              </Msg>
            </div>
          </div>

          <a className={m.btn} href={href}>Text Oliver Now</a>
          <p className={m.reply}><span className={m.dot} aria-hidden="true" />Oliver usually replies within an hour</p>
          <p className={m.number}>Or text <a className={m.tel} href={href}>{OLIVER_DISPLAY}</a> from your phone.</p>

          <div className={m.outRow}><p className={m.out}>{message}</p></div>
          <p className={m.outCap}>What you&apos;ll send. Press send.</p>
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
