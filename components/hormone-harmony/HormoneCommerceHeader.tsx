import Link from "next/link";
import { Icon } from "@/components/core/Icon";
import { Wordmark } from "@/components/core/Wordmark";
import styles from "./hormone-commerce.module.css";

export function HormoneCommerceHeader({ step }: { step: "cart" | "shipping" | "payment" }) {
  const stepNumber = step === "cart" ? 1 : step === "shipping" ? 2 : 3;
  return (
    <>
      <div className={styles.offerBar}>Free shipping on every Metabolic Morning Blend plan</div>
      <header className={styles.header}>
        <Link href="/hormone-harmony" aria-label="Back to Metabolic Morning Blend">
          <Wordmark size="clamp(22px, 2.2vw, 29px)" />
        </Link>
        <ol className={styles.steps} aria-label="Checkout progress">
          {["Cart", "Shipping", "Payment"].map((label, index) => (
            <li key={label} className={index + 1 === stepNumber ? styles.activeStep : index + 1 < stepNumber ? styles.completeStep : ""} aria-current={index + 1 === stepNumber ? "step" : undefined}>
              <span>{index + 1 < stepNumber ? <Icon name="check" size={14} /> : index + 1}</span>{label}
            </li>
          ))}
        </ol>
        <span className={styles.secureLabel}><Icon name="shield-check" size={20} />Secure order</span>
      </header>
    </>
  );
}
