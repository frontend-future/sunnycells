"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/core/Icon";
import { dietQuiz } from "@/lib/quiz/diet";
import { perDayLabel, PLANS, type Plan } from "@/lib/quiz/plans";
import { writeAnswer } from "@/lib/quiz/store";
import styles from "./hormone-harmony.module.css";

function PlanChoice({ plan, selected, onSelect, featured = false }: {
  plan: Plan;
  selected: boolean;
  onSelect: (plan: Plan) => void;
  featured?: boolean;
}) {
  const total = plan.price * plan.months;
  const savings = (plan.compareAt - plan.price) * plan.months;

  return (
    <label className={`${styles.planChoice} ${featured ? styles.planFeatured : ""} ${selected ? styles.planSelected : ""}`}>
      <input
        type="radio"
        name="supply"
        value={plan.id}
        checked={selected}
        onChange={() => onSelect(plan)}
      />
      <span className={styles.planRadio} aria-hidden="true" />
      <span className={styles.planText}>
        <span className={styles.planTopline}>
          <strong>{plan.label}</strong>
          {plan.flag ? <em>{plan.flag}</em> : null}
        </span>
        <span>{plan.sub}</span>
        <small>Save ${savings} per delivery · {perDayLabel(plan.price)}</small>
      </span>
      <span className={styles.planPrice}>
        <strong>${plan.price}</strong>
        <span>per month</span>
        <small>${total} today</small>
      </span>
    </label>
  );
}

export function OfferSection() {
  const router = useRouter();
  const featured = PLANS.find((plan) => plan.best) ?? PLANS[1];
  const others = PLANS.filter((plan) => plan.id !== featured.id);
  const [selected, setSelected] = useState(featured);

  const addToCart = () => {
    writeAnswer(dietQuiz.id, "plan", selected.id);
    writeAnswer(dietQuiz.id, "planPrice", String(selected.price));
    writeAnswer(dietQuiz.id, "planMonths", String(selected.months));
    router.push("/hormone-harmony/cart");
  };

  return (
    <section id="plans" className={`${styles.section} ${styles.offer}`} aria-labelledby="offer-title">
      <div className={styles.offerVisual}>
        <p className={styles.kicker}>Choose your supply</p>
        <h2 id="offer-title">Pick the rhythm that fits.</h2>
        <Image
          key={selected.id}
          src={selected.image.replace(/\.png$/, ".webp")}
          alt={`${selected.label} of SUNNYCELLS Metabolic Morning Blend`}
          width={1200}
          height={900}
          sizes="(max-width: 767px) 92vw, 46vw"
          priority={false}
        />
        <p>One pouch contains 30 servings. Every option is a subscription with free shipping and the flexibility to skip or cancel anytime.</p>
      </div>

      <div className={styles.offerPanel}>
        <PlanChoice plan={featured} selected={selected.id === featured.id} onSelect={setSelected} featured />
        <div className={styles.planSecondary}>
          {others.map((plan) => (
            <PlanChoice key={plan.id} plan={plan} selected={selected.id === plan.id} onSelect={setSelected} />
          ))}
        </div>
        <button className={styles.offerButton} type="button" onClick={addToCart}>
          Add {selected.label} to cart
        </button>
        <div className={styles.offerTerms}>
          <span><Icon name="truck" size={18} />Free shipping</span>
          <span><Icon name="shield-check" size={18} />30-day guarantee</span>
          <span><Icon name="repeat" size={18} />Skip or cancel anytime</span>
        </div>
        <p className={styles.subscriptionNote}>
          Subscription renews every {selected.months} {selected.months === 1 ? "month" : "months"} at ${selected.price * selected.months}.
        </p>
        <p className={styles.secureNote}>Secure checkout. Your plan and total are reviewed again before payment.</p>
      </div>
    </section>
  );
}
