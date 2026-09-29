"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { clamp, toPercent } from "@/lib/format";

export type CountdownStatus = "idle" | "running" | "paused" | "complete";

export type UseCountdownOptions = {
  /** Cycle length in milliseconds. */
  durationMs: number;
  /** Start ticking as soon as the component mounts. */
  autoStart?: boolean;
  onComplete?: () => void;
};

export type UseCountdownResult = {
  remaining: number;
  duration: number;
  /** 0 -> 1 elapsed fraction. */
  progress: number;
  /** Percentage of the cycle consumed, 0-100. */
  percent: number;
  status: CountdownStatus;
  isComplete: boolean;
  start: () => void;
  pause: () => void;
  toggle: () => void;
  reset: () => void;
  /** Jump straight to the ready state — used by the style-guide demo controls. */
  completeNow: () => void;
};

const TICK_MS = 100;

/**
 * Wall-clock driven countdown. Ticks on an interval but derives `remaining`
 * from an absolute end timestamp, so it stays accurate through tab-throttling
 * and re-renders.
 */
export function useCountdown({
  durationMs,
  autoStart = true,
  onComplete,
}: UseCountdownOptions): UseCountdownResult {
  const [remaining, setRemaining] = useState(durationMs);
  const [status, setStatus] = useState<CountdownStatus>(
    autoStart ? "running" : "idle",
  );

  const endAtRef = useRef<number>(Date.now() + durationMs);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Restart cleanly whenever the cycle length itself changes.
  useEffect(() => {
    endAtRef.current = Date.now() + durationMs;
    completedRef.current = false;
    setRemaining(durationMs);
    setStatus(autoStart ? "running" : "idle");
  }, [durationMs, autoStart]);

  useEffect(() => {
    if (status !== "running") return;

    const id = setInterval(() => {
      const left = endAtRef.current - Date.now();

      if (left <= 0) {
        setRemaining(0);
        if (!completedRef.current) {
          completedRef.current = true;
          setStatus("complete");
          onCompleteRef.current?.();
        }
      } else {
        setRemaining(left);
      }
    }, TICK_MS);

    return () => clearInterval(id);
  }, [status]);

  const start = useCallback(() => {
    setStatus((current) => {
      if (current === "complete" || current === "running") return current;
      endAtRef.current = Date.now() + remaining;
      return "running";
    });
  }, [remaining]);

  const pause = useCallback(() => {
    setStatus((current) => {
      if (current !== "running") return current;
      setRemaining(Math.max(0, endAtRef.current - Date.now()));
      return "paused";
    });
  }, []);

  const reset = useCallback(() => {
    completedRef.current = false;
    endAtRef.current = Date.now() + durationMs;
    setRemaining(durationMs);
    setStatus(autoStart ? "running" : "idle");
  }, [autoStart, durationMs]);

  const completeNow = useCallback(() => {
    endAtRef.current = Date.now();
    setRemaining(0);
    if (!completedRef.current) {
      completedRef.current = true;
      setStatus("complete");
      onCompleteRef.current?.();
    }
  }, []);

  const toggle = useCallback(() => {
    if (status === "running") {
      pause();
    } else if (status === "paused" || status === "idle") {
      start();
    }
  }, [pause, start, status]);

  return {
    remaining,
    duration: durationMs,
    progress: clamp(1 - remaining / (durationMs || 1), 0, 1),
    percent: toPercent(durationMs - remaining, durationMs),
    status,
    isComplete: status === "complete",
    start,
    pause,
    toggle,
    reset,
    completeNow,
  };
}
