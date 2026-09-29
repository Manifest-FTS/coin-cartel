"use client";

import { useEffect, useRef, useState } from "react";

import { useMotionPref } from "@/components/motion-pref";
import { formatNumber } from "@/lib/format";

export type AnimatedNumberProps = {
  value: number;
  /** Animation length in ms. */
  durationMs?: number;
  /** Skip the sweep and snap — for values that change on a fast tick. */
  instant?: boolean;
  className?: string;
};

/**
 * Eases from the previous value to the next one on change, so payouts read as
 * a tick-up rather than a snap. Renders the raw value instantly when motion is
 * reduced, when `instant` is set, or when the delta is large enough that the
 * sweep would just be noise.
 */
export function AnimatedNumber({
  value,
  durationMs = 650,
  instant = false,
  className,
}: AnimatedNumberProps) {
  const { reduced } = useMotionPref();
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced || instant) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }

    const from = fromRef.current;
    if (from === value) return;
    // A swing this large reads as a glitch, not a payout — snap instead.
    if (Math.abs(value - from) > 100_000) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }

    const startedAt = performance.now();
    const delta = value - from;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startedAt) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + delta * eased;
      setDisplay(next);
      fromRef.current = next;

      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = value;
        setDisplay(value);
        frameRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      // Preserve the in-flight position so the next change eases from here.
    };
  }, [value, durationMs, reduced, instant]);

  return <span className={className}>{formatNumber(Math.round(display))}</span>;
}
