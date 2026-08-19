import type { ReactNode } from "react";
import styles from "./hormone-harmony.module.css";

export function CampaignLink({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a className={`${styles.primaryLink} ${className}`} href="#plans">
      {children}<span aria-hidden="true">↗</span>
    </a>
  );
}
