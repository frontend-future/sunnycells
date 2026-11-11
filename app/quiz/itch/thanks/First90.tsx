import s from "./thanks.module.css";

/* Real text, not an image: the buyers are 65+ and a graphic shrinks to unreadable on a phone. */
const DIR = "/quiz/fridayzoomies/thanks";
const ASPIRATIONS = ["Less scratching", "Less paw licking", "Calmer, healthier skin", "A shinier coat"];

export function First90() {
  return (
    <section className={s.f90} aria-labelledby="first-90-title">
      <h2 id="first-90-title" className={s.f90Title}>Your first 90 days</h2>
      <ol className={s.f90List}>
        <li className={s.f90Item}>
          <span className={`${s.f90Dot} ${s.f90DotOn}`} aria-hidden="true">✓</span>
          <div className={s.f90Head}>
            <div>
              <span className={`${s.f90Pill} ${s.f90PillBlue}`}>Day 1</span>
              <h3 className={s.f90H}>Start routine.</h3>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${DIR}/day-1.webp`} width={96} height={96} alt="" />
          </div>
          <p className={s.f90P}>
            Itching starts on the inside. A weak skin barrier lets irritants in, and skin that overreacts to them. Today the omega-3s
            start supporting that barrier. Pump it over their food, half the amount this first week.
          </p>
          <p className={s.f90Note}>Softer stool at first? It can happen while your dog adjusts. Check with your vet if it lasts.</p>
        </li>

        <li className={s.f90Item}>
          <span className={s.f90Dot} aria-hidden="true">✓</span>
          <div className={s.f90Head}>
            <div>
              <span className={s.f90Pill}>Day 30</span>
              <h3 className={s.f90H}>Calmer skin begins.</h3>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${DIR}/day-30.webp`} width={96} height={96} alt="" />
          </div>
          <p className={s.f90P}>
            EPA and DHA build up with daily use, helping the skin barrier hold and calming the overreaction behind the scratching. Some
            owners notice it first at night, with less licking and chewing.
          </p>
        </li>

        <li className={s.f90Item}>
          <span className={s.f90Dot} aria-hidden="true">✓</span>
          <div className={s.f90Head}>
            <div>
              <span className={s.f90Pill}>Day 90</span>
              <h3 className={s.f90H}>This is where it really shows.</h3>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${DIR}/day-90.webp`} width={96} height={96} alt="" />
          </div>
          <p className={s.f90P}>By now the omega-3s have had time to work on the cause, not just the scratching. This is what we&apos;re aiming for:</p>
          <ul className={s.f90Aims}>
            {ASPIRATIONS.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </li>
      </ol>
      <p className={s.f90Foot}>Every dog is different. Some turn the corner sooner, others closer to day 90.</p>
    </section>
  );
}
