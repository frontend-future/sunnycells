"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/core/Button";
import { Input } from "@/components/forms/Input";
import { useAnswers, type Answers } from "@/lib/quiz/store";
import { nextHref, prevHref, type QuizConfig, type Step } from "@/lib/quiz/types";
import { OptionButton } from "./OptionButton";
import { QuizChrome, QuizQuestion } from "./QuizChrome";

/** Renders any step of any quiz. Everything it needs comes from the config. */
export function StepScreen({ config, index }: { config: QuizConfig; index: number }) {
  const step = config.steps[index];
  const router = useRouter();
  const { answers, set } = useAnswers(config.id);
  const go = () => router.push(nextHref(config, index));

  const answer = (value: string) => {
    set(step.slug, value);
    go();
  };

  return (
    <QuizChrome step={index + 1} total={config.steps.length} backHref={prevHref(config, index)}>
      <QuizQuestion>{step.question}</QuizQuestion>
      <Body step={step} answers={answers} set={set} answer={answer} go={go} />
    </QuizChrome>
  );
}

type Setter = (field: string, value: string) => void;
type BodyProps = { step: Step; answers: Answers; set: Setter; answer: (value: string) => void; go: () => void };

function Body({ step, answers, set, answer, go }: BodyProps) {
  if (step.kind === "single") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
        {step.options.map((o) => (
          <OptionButton key={o} label={o} selected={answers[step.slug] === o} onClick={() => answer(o)} />
        ))}
      </div>
    );
  }

  if (step.kind === "info") {
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "var(--space-6)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>{step.body}</p>
        {step.bullets ? (
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {step.bullets.map((b) => (
              <li key={b} style={{ display: "flex", gap: "var(--space-4)", alignItems: "flex-start", fontSize: "var(--size-body)", lineHeight: 1.4 }}>
                <span aria-hidden="true" style={{ flex: "none", width: 8, height: 8, marginTop: 11, borderRadius: "50%", background: "var(--ink)" }} />
                {b}
              </li>
            ))}
          </ul>
        ) : null}
        <Footer>
          <Button size="lg" fullWidth iconRight="arrow-right" onClick={go}>
            {step.cta}
          </Button>
        </Footer>
      </div>
    );
  }

  if (step.kind === "height") return <HeightBody answers={answers} set={set} go={go} />;
  if (step.kind === "number") return <NumberBody step={step} answers={answers} set={set} go={go} />;
  return <EmailBody step={step} set={set} go={go} />;
}

function Footer({ children }: { children: React.ReactNode }) {
  return <div style={{ marginTop: "auto", paddingTop: "var(--space-8)" }}>{children}</div>;
}

function FieldError({ children }: { children: string }) {
  return <div style={{ fontSize: "var(--size-meta)", fontWeight: 600, color: "var(--status-error)" }}>{children}</div>;
}

/** Segmented unit switch. Two options only, so a pair of buttons beats a select:
    no menu to open, and both hit targets already clear 48px. */
function UnitSwitch({ units, value, onChange }: { units: readonly string[]; value: string; onChange: (u: string) => void }) {
  return (
    <div role="radiogroup" aria-label="Units" style={{ display: "flex", gap: "var(--space-3)" }}>
      {units.map((u) => {
        const on = u === value;
        return (
          <button
            key={u}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(u)}
            style={{
              appearance: "none",
              minHeight: "var(--tap-min)",
              padding: "0 22px",
              fontFamily: "var(--font-text)",
              fontSize: "var(--size-body)",
              fontWeight: on ? 800 : 600,
              color: "var(--ink)",
              background: on ? "var(--sun-tint)" : "var(--white)",
              border: on ? "2px solid var(--ink)" : "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
            }}
          >
            {u}
          </button>
        );
      })}
    </div>
  );
}

function HeightBody({ answers, set, go }: { answers: Answers; set: Setter; go: () => void }) {
  const [unit, setUnit] = useState(answers.heightUnit || "ft / in");
  const [feet, setFeet] = useState(answers.heightFeet || "");
  const [inches, setInches] = useState(answers.heightInches || "");
  const [cm, setCm] = useState(answers.heightCm || "");
  const [error, setError] = useState("");
  const imperial = unit === "ft / in";

  const submit = () => {
    if (imperial) {
      const f = Number(feet);
      const i = Number(inches || 0);
      if (!f || f < 3 || f > 8 || i < 0 || i > 11) {
        setError("We need a height between 3 ft and 8 ft, with inches from 0 to 11.");
        return;
      }
      set("heightUnit", unit);
      set("heightFeet", String(f));
      set("heightInches", String(i));
    } else {
      const c = Number(cm);
      if (!c || c < 100 || c > 240) {
        setError("We need a height between 100 cm and 240 cm.");
        return;
      }
      set("heightUnit", unit);
      set("heightCm", String(c));
    }
    go();
  };

  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); submit(); }} style={{ display: "flex", flexDirection: "column", flex: 1, gap: "var(--space-6)" }}>
      <UnitSwitch units={["ft / in", "cm"]} value={unit} onChange={(u) => { setUnit(u); setError(""); }} />
      {imperial ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
          <Input label="Feet" type="number" inputMode="numeric" value={feet} onChange={(e) => setFeet(e.target.value)} />
          <Input label="Inches" type="number" inputMode="numeric" value={inches} onChange={(e) => setInches(e.target.value)} />
        </div>
      ) : (
        <Input label="Centimetres" type="number" inputMode="numeric" value={cm} onChange={(e) => setCm(e.target.value)} />
      )}
      {error ? <FieldError>{error}</FieldError> : null}
      <Footer>
        <Button size="lg" fullWidth type="submit" iconRight="arrow-right">
          Continue
        </Button>
      </Footer>
    </form>
  );
}

function NumberBody({
  step, answers, set, go,
}: { step: Extract<Step, { kind: "number" }>; answers: Answers; set: Setter; go: () => void }) {
  const switchable = step.units[0] !== step.units[1];
  const [unit, setUnit] = useState(answers[step.key + "Unit"] || step.units[0]);
  const [value, setValue] = useState(answers[step.key] || "");
  const [error, setError] = useState("");

  const submit = () => {
    const n = Number(value);
    if (!n || Number.isNaN(n) || n < step.min || n > step.max) {
      setError(`We need a number between ${step.min} and ${step.max}.`);
      return;
    }
    set(step.key, String(n));
    set(step.key + "Unit", unit);
    go();
  };

  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); submit(); }} style={{ display: "flex", flexDirection: "column", flex: 1, gap: "var(--space-6)" }}>
      {switchable ? <UnitSwitch units={step.units} value={unit} onChange={setUnit} /> : null}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "var(--space-4)" }}>
        {step.prefix ? (
          <span style={{ fontSize: "var(--size-body-lg)", fontWeight: 600, paddingBottom: 14 }}>{step.prefix}</span>
        ) : null}
        <Input
          label={step.label}
          type="number"
          inputMode="numeric"
          suffix={switchable ? unit : undefined}
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(""); }}
          containerStyle={{ flex: 1 }}
        />
        {step.trailing ? (
          <span style={{ fontSize: "var(--size-body-lg)", fontWeight: 600, paddingBottom: 14 }}>{step.trailing}</span>
        ) : null}
      </div>
      {error ? <FieldError>{error}</FieldError> : null}
      <Footer>
        <Button size="lg" fullWidth type="submit" iconRight="arrow-right">
          Continue
        </Button>
      </Footer>
    </form>
  );
}

/* Deliberately permissive: one @, a dot in the domain, no spaces. A stricter regex
   rejects real addresses, and the only real check is whether the mail arrives. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function EmailBody({ step, set, go }: { step: Extract<Step, { kind: "email" }>; set: Setter; go: () => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    const trimmed = email.trim();
    if (!trimmed) {
      setError("We need an email address to send your results.");
      return;
    }
    if (!EMAIL.test(trimmed)) {
      setError("That address is missing an @ or a domain. Check it and try again.");
      return;
    }
    set("email", trimmed);
    go();
  };

  return (
    /* noValidate so our own copy is what she reads. The browser's native bubble on
       type="email" would otherwise block submit before the handler runs. */
    <form noValidate onSubmit={(e) => { e.preventDefault(); submit(); }} style={{ display: "flex", flexDirection: "column", flex: 1, gap: "var(--space-6)" }}>
      <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)", color: "var(--ink-80)" }}>
        {step.body}
      </p>
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        error={error || undefined}
        onChange={(e) => { setEmail(e.target.value); setError(""); }}
      />
      <Footer>
        <Button size="lg" fullWidth type="submit" iconRight="arrow-right">
          {step.cta}
        </Button>
      </Footer>
    </form>
  );
}
