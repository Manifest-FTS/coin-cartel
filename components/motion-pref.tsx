"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type MotionPrefValue = {
  /** When true, components skip decorative animation and jump to end state. */
  reduced: boolean;
  setReduced: (value: boolean) => void;
  toggle: () => void;
};

const MotionPrefContext = createContext<MotionPrefValue>({
  reduced: false,
  setReduced: () => {},
  toggle: () => {},
});

export function MotionPrefProvider({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);

  // Seed from the OS preference on mount, then let the in-page toggle win.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) setReduced(true);
  }, []);

  const value = useMemo<MotionPrefValue>(
    () => ({
      reduced,
      setReduced,
      toggle: () => setReduced((prev) => !prev),
    }),
    [reduced],
  );

  return (
    <MotionPrefContext.Provider value={value}>{children}</MotionPrefContext.Provider>
  );
}

/**
 * Read the global motion preference. Components should degrade to instant
 * state changes when `reduced` is true rather than simply animating faster.
 */
export function useMotionPref(): MotionPrefValue {
  return useContext(MotionPrefContext);
}
