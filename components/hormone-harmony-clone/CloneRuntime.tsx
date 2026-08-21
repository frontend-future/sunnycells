"use client";

import { useEffect } from "react";

type ClonePageName = "index" | "cart" | "checkout";

const scripts: Record<ClonePageName, string[]> = {
  index: ["store.js", "home.js"],
  cart: ["store.js", "cart.js"],
  checkout: ["store.js", "checkout.js"],
};

export function CloneRuntime({ page }: { page: ClonePageName }) {
  useEffect(() => {
    const runtimeWindow = window as Window & { __sunnyCellsCloneRuntime?: ClonePageName };
    if (runtimeWindow.__sunnyCellsCloneRuntime === page) return;
    runtimeWindow.__sunnyCellsCloneRuntime = page;

    const load = (file: string) => new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `/hormone-harmony-clone/assets/js/${file}`;
      script.async = false;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Unable to load ${file}`));
      document.body.appendChild(script);
    });

    void (async () => {
      try {
        for (const file of scripts[page]) await load(file);
        document.dispatchEvent(new Event("DOMContentLoaded"));
      } catch {
        // The route remains readable if an optional enhancement script fails.
      }
    })();
  }, [page]);

  return null;
}
