"use client";

import { motion, type Transition } from "framer-motion";

import { useMotionPref } from "@/components/motion-pref";
import { cn } from "@/lib/cn";
import { clamp, toPercent } from "@/lib/format";

export type ProgressTone = "acid" | "gold" | "ice" | "heat" | "rust";

const TONES: Record<ProgressTone, { fill: string; glow: string }> = {
  acid: {
    fill: "bg-gradient-to-r from-acid-600 to-acid-400 shadow-[0_0_12px_-1px_rgba(34,197,94,0.7)]",
    glow: "rgba(34,197,94,0.55)",
  },
  gold: {
    fill: "bg-gradient-to-r from-gold-600 to-gold-400 shadow-[0_0_12px_-1px_rgba(255,193,69,0.7)]",
    glow: "rgba(255,193,69,0.55)",
  },
  ice: {
    fill: "bg-gradient-to-r from-ice-600 to-ice-400 shadow-[0_0_12px_-1px_rgba(34,211,238,0.7)]",
    glow: "rgba(34,211,238,0.55)",
  },
  heat: {
    fill: "bg-gradient-to-r from-heat-600 to-heat-400 shadow-[0_0_12px_-1px_rgba(255,59,78,0.7)]",
    glow: "rgba(255,59,78,0.55)",
  },
  rust: {
    fill: "bg-gradient-to-r from-rust-600 to-rust-400 shadow-[0_0_12px_-1px_rgba(255,122,47,0.7)]",
    glow: "rgba(255,122,47,0.55)",
  },
};

const TRACK_HEIGHTS = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2",
  lg: "h-2.5",
} as const;

export type ProgressBarProps = {
  value: number;
  max?: number;
  tone?: ProgressTone;
  size?: keyof typeof TRACK_HEIGHTS;
  /** `linear` suits timers; the default spring suits discrete jumps. */
  easing?: "spring" | "linear";
  /** Optional sheen that sweeps the fill on mount and on value change. */
  shimmer?: boolean;
  /** Renders a soft coloured bloom centred on the fill. */
  bloom?: boolean;
  className?: string;
};

export function ProgressBar({
  value,
  max = 100,
  tone = "acid",
  size = "md",
  easing = "spring",
  shimmer = false,
  bloom = false,
  className,
}: ProgressBarProps) {
  const { reduced } = useMotionPref();
  const percent = toPercent(value, max);
  const spec = TONES[tone];

  const transition: Transition =
    reduced || easing === "linear"
      ? { duration: reduced ? 0 : 0.12, ease: "linear" }
      : { type: "spring", stiffness: 140, damping: 22, mass: 0.6 };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-noir-500/70",
        "ring-1 ring-inset ring-white/[0.04]",
        TRACK_HEIGHTS[size],
        className,
      )}
      role="progressbar"
      aria-valuenow={clamp(Math.round(value), 0, max)}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      {bloom ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -z-0 blur-md"
          style={{
            width: `${percent}%`,
            background: spec.glow,
            opacity: 0.45,
          }}
        />
      ) : null}

      <motion.div
        className={cn("relative h-full rounded-full", spec.fill)}
        initial={false}
        animate={{ width: `${percent}%` }}
        transition={transition}
      >
        {shimmer ? (
          <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-y-0 -left-1/2 w-1/2 animate-shimmer bg-gradient-to-r from-transparent via-white/35 to-transparent" />
          </span>
        ) : null}
      </motion.div>
    </div>
  );
}
