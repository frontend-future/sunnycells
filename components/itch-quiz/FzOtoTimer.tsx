"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import s from "./fzOto.module.css";

/* A real 3 minute hold. The deadline lives in sessionStorage so a refresh does not restart it, and at zero the
   page moves on to the decline path, so the price is genuinely gone. */
export function FzOtoTimer({ id, seconds, expiredHref, label }: { id: string; seconds: number; expiredHref: string; label: string }) {
  const router = useRouter();
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    const key = `fz.oto.${id}`;
    let end = 0;
    try {
      end = Number(sessionStorage.getItem(key)) || 0;
      if (!end) sessionStorage.setItem(key, String((end = Date.now() + seconds * 1000)));
    } catch {
      end = Date.now() + seconds * 1000;
    }
    const tick = () => {
      const n = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      setLeft(n);
      if (n === 0) router.replace(expiredHref);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [id, seconds, expiredHref, router]);

  const m = Math.floor(left / 60);
  const sec = String(left % 60).padStart(2, "0");
  return (
    <p className={s.timer} role="timer" aria-live="off">
      {label} <strong>{m}:{sec}</strong>
    </p>
  );
}
