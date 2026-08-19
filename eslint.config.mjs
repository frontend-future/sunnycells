import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Static design-system specimens are reference artifacts, not application code.
    "guidelines/**",
    "ui_kits/**",
    "components/**/*.jsx",
    "components/**/*.d.ts",
    "components/**/*.prompt.md",
    "components/**/*.card.html",
    "components/_card.js",
  ]),
]);

export default eslintConfig;
