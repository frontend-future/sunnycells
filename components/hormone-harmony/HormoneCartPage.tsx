"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon, type IconName } from "@/components/core/Icon";
import { dietQuiz } from "@/lib/quiz/diet";
import { BONUSES, buildOrder } from "@/lib/quiz/order";
import { planById } from "@/lib/quiz/plans";
import { useAnswers } from "@/lib/quiz/store";
import { HormoneCommerceHeader } from "./HormoneCommerceHeader";
import styles from "./hormone-commerce.module.css";

const money = (value: number) => `$${value}`;
const bonusIcons: Record<string, IconName> = Object.fromEntries(BONUSES.map((bonus) => [bonus.id, bonus.icon as IconName]));

export function HormoneCartPage() {
  const router = useRouter();
  const { answers, ready } = useAnswers(dietQuiz.id);
  const plan = planById(answers.plan);
  const order = buildOrder(answers);

  return (
    <div className={styles.page}>
      <HormoneCommerceHeader step="cart" />
      <main className={styles.cartMain}>
        <Link className={styles.backLink} href="/hormone-harmony#plans"><Icon name="arrow-left" size={20} />Change supply</Link>
        <header className={styles.cartIntro}>
          <h1>Your mornings are almost sorted.</h1>
          <p>Review the supply, renewal rhythm, and today&apos;s total. Nothing is charged until the payment step.</p>
        </header>

        <div className={styles.cartLayout}>
          <div className={styles.cartContent}>
            <section className={styles.productBlock} aria-labelledby="cart-product-title">
              <div className={styles.productStage}>
                <span>{plan.months === 1 ? "30 mornings" : `${plan.months * 30} mornings`}</span>
                <Image src={plan.image.replace(/\.png$/, ".webp")} alt={`${plan.label} of SUNNYCELLS Metabolic Morning Blend`} width={1200} height={900} priority sizes="(max-width: 767px) 90vw, 52vw" />
              </div>
              <div className={styles.productDetails}>
                <div>
                  <p className={styles.microLabel}>{plan.label}</p>
                  <h2 id="cart-product-title">Metabolic Morning Blend</h2>
                  <p>{order.lines[0].note}</p>
                </div>
                <dl className={styles.planFacts}>
                  <div><dt>Flavor</dt><dd>Orange</dd></div>
                  <div><dt>Servings</dt><dd>{plan.months * 30}</dd></div>
                  <div><dt>Delivery</dt><dd>Every {plan.months} {plan.months === 1 ? "month" : "months"}</dd></div>
                </dl>
                <div className={styles.monthlyPrice}><strong>{money(plan.price)}</strong><span>per month</span><s>{money(plan.compareAt)}</s></div>
                <p className={styles.planTerms}><Icon name="repeat" size={19} />Subscription. Skip or cancel anytime.</p>
              </div>
            </section>

            <section className={styles.includedBlock} aria-labelledby="included-title">
              <div className={styles.includedIntro}>
                <p className={styles.microLabel}>Added at no charge</p>
                <h2 id="included-title">The useful extras come with it.</h2>
              </div>
              <ul>
                {BONUSES.map((bonus) => (
                  <li key={bonus.id}>
                    <span><Icon name={bonusIcons[bonus.id]} size={24} /></span>
                    <div><strong>{bonus.name}</strong><small>{money(bonus.was)} value</small></div>
                    <b>Free</b>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.cartAssurance} aria-label="Order assurances">
              <div><Icon name="truck" size={24} /><strong>Free shipping</strong><span>Included on this delivery.</span></div>
              <div><Icon name="shield-check" size={24} /><strong>30-day guarantee</strong><span>Try the routine with less risk.</span></div>
              <div><Icon name="repeat" size={24} /><strong>Flexible subscription</strong><span>Skip or cancel anytime.</span></div>
            </section>
          </div>

          <aside className={styles.cartSummary} aria-labelledby="cart-summary-title">
            <p className={styles.microLabel}>Your delivery</p>
            <h2 id="cart-summary-title">Order summary</h2>
            <div className={styles.summaryRows}>
              <div><span>{plan.months}-month supply</span><span>{money(order.listTotal)}</span></div>
              <div><span>Plan savings</span><strong>-{money(order.discount)}</strong></div>
              <div><span>Included extras</span><strong>Free</strong></div>
              <div><span>Shipping</span><strong>Free</strong></div>
            </div>
            <div className={styles.totalRow}>
              <span>Due today</span>
              <div><s>{money(order.strikeTotal)}</s><strong>{ready ? money(order.total) : "\u00a0"}</strong></div>
            </div>
            <button className={styles.primaryButton} type="button" onClick={() => router.push("/hormone-harmony/checkout")}>Continue to shipping<Icon name="arrow-right" size={21} /></button>
            <p className={styles.secureNote}><Icon name="shield-check" size={18} />Payment details come next.</p>
            <div className={styles.guaranteeNote}><Image src="/badges/money-back.png" alt="30-day money-back guarantee" width={90} height={90} /><p><strong>Covered for 30 days.</strong><span>Your order includes the SUNNYCELLS money-back guarantee.</span></p></div>
          </aside>
        </div>
      </main>
    </div>
  );
}
