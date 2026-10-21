"use client";
import { useEffect, useState } from "react";
import styles from "./membership.module.css";

/* The end of a flow: counts down, then sends the visitor to the home page. */
export default function Redirect({ to, seconds = 5 }: { to: string; seconds?: number }) {
  const [n, setN] = useState(seconds);
  useEffect(() => {
    if (n <= 0) {
      window.location.href = to;
      return;
    }
    const t = setTimeout(() => setN(n - 1), 1000);
    return () => clearTimeout(t);
  }, [n, to]);
  return (
    <p className={styles.redirect} aria-live="polite">
      Redirecting you to our home page in {Math.max(n, 0)}... <a href={to}>Go now</a>
    </p>
  );
}
