"use client";

import { useMemo } from "react";

import { useMotionPref } from "@/components/motion-pref";
import { cn } from "@/lib/cn";

/**
 * Deterministic pseudo-random so the rain field is identical between renders
 * and between server and client. `Math.random()` in a render body would make
 * every mount reshuffle the whole field.
 */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const STREAK_COUNT = 22;

export type AmbientProps = {
  /** Adds the falling data-rain. Off for dense screens. */
  rain?: boolean;
  /** Adds the slow CRT scanline sweep. */
  scanlines?: boolean;
  /** Adds the sodium-vapour light bloom behind the content. */
  flicker?: boolean;
  className?: string;
};

/**
 * The shared atmosphere. Layered so each one can be switched off per screen:
 * grid, haze, a flickering streetlight bloom, falling data-rain, scanlines.
 *
 * All motion is ambient and sits behind content at low opacity. Nothing here
 * animates on the reading axis.
 */
export function Ambient({
  rain = true,
  scanlines = true,
  flicker = true,
  className,
}: AmbientProps) {
  const { reduced } = useMotionPref();
  const still = reduced;

  const streaks = useMemo(
    () =>
      Array.from({ length: STREAK_COUNT }, (_, i) => {
        const r = pseudoRandom(i + 1);
        const r2 = pseudoRandom(i + 40);
        return {
          left: `${(r * 100).toFixed(2)}%`,
          delay: `${(r2 * 18).toFixed(2)}s`,
          duration: `${(11 + r2 * 16).toFixed(2)}s`,
          height: `${(28 + r * 84).toFixed(0)}px`,
          opacity: (0.10 + r2 * 0.22).toFixed(2),
          width: r > 0.86 ? "2px" : "1px",
        };
      }),
    [],
  );

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {/* Blueprint grid, faded out toward the bottom. */}
      <div
        className="absolute inset-0 bg-cartel-grid opacity-70"
        style={{
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(120% 80% at 50% 0%, #000 0%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(120% 80% at 50% 0%, #000 0%, transparent 78%)",
        }}
      />

      {/* Brand wash. */}
      <div className="absolute inset-0 bg-cartel-haze" />

      {/* Sodium-vapour streetlight. Flickers without moving. */}
      {flicker && !still ? (
        <div
          className="absolute left-1/2 top-[-18rem] h-[36rem] w-[52rem] -translate-x-1/2 animate-flicker rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,193,69,0.16), rgba(255,122,47,0.06) 55%, transparent 75%)",
          }}
        />
      ) : null}

      {/* Data rain. */}
      {rain && !still ? (
        <div className="absolute inset-0">
          {streaks.map((streak) => (
            <span
              key={streak.left}
              className="absolute top-0 animate-rain-drift bg-gradient-to-b from-transparent via-acid-300 to-transparent"
              style={{
                left: streak.left,
                width: streak.width,
                height: streak.height,
                opacity: streak.opacity,
                animationDelay: streak.delay,
                animationDuration: streak.duration,
              }}
            />
          ))}
        </div>
      ) : null}

      {/* Scanline sweep — one pass, very low contrast. */}
      {scanlines && !still ? (
        <>
          <div className="absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-acid-300/[0.045] to-transparent" />
          <div className="absolute inset-0 bg-cartel-scanlines opacity-[0.35]" />
        </>
      ) : null}

      {/* Vignette to seat the content. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, transparent 40%, rgba(6,9,10,0.75) 100%)",
        }}
      />
    </div>
  );
}
