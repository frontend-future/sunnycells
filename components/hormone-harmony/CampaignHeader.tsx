"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/core/Icon";
import { Wordmark } from "@/components/core/Wordmark";
import styles from "./hormone-harmony.module.css";

const links = [
  { href: "#why-it-fits", label: "Why it fits" },
  { href: "#ingredients", label: "Ingredients" },
  { href: "#routine", label: "How to use" },
  { href: "#plans", label: "Plans" },
  { href: "#faq", label: "FAQ" },
] as const;

export function CampaignHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <div className={styles.announcement}>
        <span>Free shipping on every plan</span>
        <span>60-day money-back guarantee</span>
      </div>
      <header className={styles.siteHeader}>
        <div className={styles.headerInner}>
          <a className={styles.brandLink} href="#top" aria-label="SUNNYCELLS home">
            <Wordmark size="clamp(22px, 2.1vw, 30px)" />
          </a>
          <nav className={styles.desktopNav} aria-label="Hormone Harmony navigation">
            {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </nav>
          <div className={styles.headerActions}>
            <Link className={styles.cartLink} href="/hormone-harmony/cart" aria-label="View cart">
              <Icon name="shopping-bag" size={22} />
              <span>Cart</span>
            </Link>
            <button
              className={styles.menuButton}
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="hormone-mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <Icon name={open ? "x" : "menu"} size={26} />
            </button>
          </div>
        </div>
      </header>
      <div
        id="hormone-mobile-menu"
        className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile Hormone Harmony navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              {link.label}<Icon name="arrow-right" size={22} />
            </a>
          ))}
          <Link href="/hormone-harmony/cart" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            View cart<Icon name="shopping-bag" size={22} />
          </Link>
        </nav>
        <p>Stimulant-free. 30 servings. Orange flavor.</p>
      </div>
    </>
  );
}
