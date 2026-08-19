"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/core/Icon";
import { firstOrderPrice } from "@/lib/price";
import { dietQuiz } from "@/lib/quiz/diet";
import { PLANS, type Plan } from "@/lib/quiz/plans";
import { writeAnswer } from "@/lib/quiz/store";
import styles from "./hormone-harmony.module.css";

const supplyCopy: Record<number, string> = {
  1: "A thirty-serving introduction to the routine",
  3: "A longer rhythm for making the morning habit familiar",
  6: "The lowest monthly price across the available plans",
};

function PackageCard({ plan }: { plan: Plan }) {
  const router = useRouter();
  const firstPrice = firstOrderPrice(plan.price);
  const savings = (plan.compareAt - plan.price) * plan.months;

  const choosePlan = () => {
    writeAnswer(dietQuiz.id, "plan", plan.id);
    writeAnswer(dietQuiz.id, "planPrice", String(plan.price));
    writeAnswer(dietQuiz.id, "planMonths", String(plan.months));
    router.push("/hormone-harmony/cart");
  };

  return (
    <article className={`${styles.packageCard} ${plan.best ? styles.packageFeatured : ""}`}>
      <div className={styles.packageFlag}>{plan.flag ?? (plan.months === 1 ? "Starter supply" : "Longer supply")}</div>
      <h3>{plan.label}</h3>
      <p>{supplyCopy[plan.months]}</p>
      <Image src={plan.image.replace(/\.png$/, ".webp")} alt={`${plan.label} of Metabolic Morning Blend`} width={760} height={560} sizes="(max-width: 767px) 82vw, 30vw" />
      <div className={styles.packagePrice}>
        <span>50% off your first order</span>
        <strong>${firstPrice}</strong>
        <p>first month, then ${plan.price} per month</p>
      </div>
      <ul>
        <li><Icon name="check" size={20} />Save ${savings} per delivery</li>
        <li><Icon name="check" size={20} />{plan.months * 30} servings supplied</li>
        <li><Icon name="check" size={20} />Free shipping</li>
        <li><Icon name="check" size={20} />Skip or cancel anytime</li>
      </ul>
      <button type="button" onClick={choosePlan}>CHOOSE {plan.label.toUpperCase()}</button>
      <small>60-day returns. Secure checkout.</small>
    </article>
  );
}

export function OfferSection() {
  return (
    <section id="plans" className={styles.packageSection} aria-labelledby="offer-title">
      <div className={styles.shippingBanner}>FREE SHIPPING ON EVERY SUNNYCELLS PLAN</div>
      <div className={styles.checkoutSteps} aria-label="Checkout steps">
        <div className={styles.checkoutStepActive}><span>1</span><p><strong>Choose</strong>Your supply</p></div>
        <div><span>2</span><p><strong>Review</strong>Cart and billing</p></div>
        <div><span>3</span><p><strong>Begin</strong>Your morning routine</p></div>
      </div>
      <div className={styles.packageHeading}>
        <p className={styles.kicker}>Choose your package below</p>
        <h2 id="offer-title">START WITH THE SUPPLY THAT FITS YOUR ROUTINE.</h2>
        <p>Every option is a subscription. Prices, renewal timing, shipping, and cancellation terms are shown before payment.</p>
      </div>
      <div className={styles.packageGrid}>
        {PLANS.map((plan) => <PackageCard key={plan.id} plan={plan} />)}
      </div>
      <div className={styles.paymentConfidence}>
        <span><Icon name="shield-check" size={22} />60-day returns</span>
        <span><Icon name="truck" size={22} />Free shipping</span>
        <span><Icon name="repeat" size={22} />Skip or cancel anytime</span>
      </div>
    </section>
  );
}
