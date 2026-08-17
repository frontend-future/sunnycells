"use client";

import { useId, useState } from "react";
import type { CSSProperties, InputHTMLAttributes } from "react";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  hint?: string;
  /** States what is needed, never "Invalid input". */
  error?: string;
  suffix?: string;
  style?: CSSProperties;
  containerStyle?: CSSProperties;
};

export function Input({
  label, hint, error, id, type = "text", suffix, style, containerStyle, onFocus, onBlur, ...rest
}: InputProps) {
  const auto = useId();
  const inputId = id || "sc-" + auto;
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...containerStyle }}>
      {label ? (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-body)",
            fontWeight: 700,
            color: "var(--ink)",
          }}
        >
          {label}
        </label>
      ) : null}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <input
          {...rest}
          id={inputId}
          type={type}
          onFocus={(e) => { setFocus(true); onFocus?.(e); }}
          onBlur={(e) => { setFocus(false); onBlur?.(e); }}
          aria-invalid={error ? true : undefined}
          style={{
            width: "100%",
            minHeight: "var(--control-h-md)",
            padding: suffix ? "0 88px 0 18px" : "0 18px",
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-body)",
            fontWeight: 500,
            color: "var(--ink)",
            background: "var(--white)",
            border:
              "2px solid " +
              (error ? "var(--status-error)" : focus ? "var(--ink)" : "var(--border-input)"),
            borderRadius: "var(--radius-input)",
            outline: "none",
            transition: "border-color var(--duration-fast) var(--ease-standard)",
            ...style,
          }}
        />
        {suffix ? (
          <span
            style={{
              position: "absolute",
              right: 18,
              fontFamily: "var(--font-label)",
              fontSize: "var(--size-meta)",
              fontWeight: 600,
              color: "var(--ink-60)",
              letterSpacing: "var(--tracking-mono)",
              pointerEvents: "none",
            }}
          >
            {suffix}
          </span>
        ) : null}
      </div>
      {error ? (
        <div style={{ fontSize: "var(--size-meta)", fontWeight: 600, color: "var(--status-error)" }}>{error}</div>
      ) : hint ? (
        <div style={{ fontSize: "var(--size-meta)", fontWeight: 500, color: "var(--ink-60)" }}>{hint}</div>
      ) : null}
    </div>
  );
}
