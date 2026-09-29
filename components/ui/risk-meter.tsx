"use client";

import { useMotionPref } from "@/components/motion-pref";
import { cn } from "@/lib/cn";
import { formatPercent } from "@/lib/format";

export type RiskBand = "low" | "moderate" | "high";

/**
 * The bands are fixed, not relative to the job. A 20% raid is "moderate"
 * whether or not the player has seen a 40% one — a scale that shifts under
 * the player is a scale they can't learn.
 */
export function riskBand(pct: number): RiskBand {
  if (pct >= 25) return "high";
  if (pct >= 10) return "moderate";
  return "low";
}

const BAND_TONE: Record<RiskBand, { arc: string; text: string; label: string }> = {
  low: { arc: "#22C55E", text: "text-acid-400", label: "Low" },
  moderate: { arc: "#FFC145", text: "text-gold-400", label: "Moderate" },
  high: { arc: "#FF3B4E", text: "text-heat-400", label: "High" },
};

export type RiskMeterProps = {
  /** Raid probability, 0-100. */
  pct: number;
  size?: "sm" | "md" | "lg";
  /** Adds the rotating sweep. Only for a job that is running right now. */
  live?: boolean;
  /** Hides the numeric readout — the arc alone. */
  bare?: boolean;
  className?: string;
};

/**
 * The raid-risk ring — the game's signature readout. Every job trades payout
 * against this number, so it gets a shape rather than a bar: a bar invites
 * comparison against the health and energy meters, and a risk is not a
 * resource you can spend down.
 */
export function RiskMeter({
  pct,
  size = "md",
  live = false,
  bare = false,
  className,
}: RiskMeterProps) {
  const { reduced } = useMotionPref();
  const clamped = Math.max(0, Math.min(100, pct));
  const band = riskBand(clamped);
  const tone = BAND_TONE[band];

  const box = size === "sm" ? "h-9 w-9" : size === "lg" ? "h-14 w-14" : "h-11 w-11";
  const inset = size === "sm" ? "inset-[3px]" : size === "lg" ? "inset-[5px]" : "inset-1.5";
  const text =
    size === "sm" ? "text-[9px]" : size === "lg" ? "text-sm" : "text-[11px]";

  return (
    <div
      className={cn("relative shrink-0", box, className)}
      role="img"
      aria-label={`Raid risk ${formatPercent(clamped)}, ${tone.label}`}
      title={`${tone.label} raid risk — ${formatPercent(clamped)} chance this job gets rolled`}
    >
      {/* Track */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-noir-600 ring-1 ring-inset ring-white/[0.06]"
      />

      {/* Filled arc, rotated so 0% starts at 12 o'clock. */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from -90deg, ${tone.arc} ${clamped}%, transparent ${clamped}% 100%)`,
        }}
      />

      {/* The live sweep. Motion only when there is something in flight. */}
      {live && !reduced ? (
        <span
          aria-hidden
          className="absolute inset-0 animate-sweep rounded-full"
          style={{
            background: `conic-gradient(from -90deg, transparent 0deg, ${tone.arc}44 40deg, transparent 80deg)`,
          }}
        />
      ) : null}

      {/* Centre — punches the hole and carries the number. */}
      <span
        aria-hidden
        className={cn(
          "absolute flex items-center justify-center rounded-full bg-noir-900 ring-1 ring-inset ring-white/[0.06]",
          inset,
        )}
      >
        {!bare ? (
          <span className={cn("font-mono font-semibold tabular", text, tone.text)}>
            {Math.round(clamped)}%
          </span>
        ) : null}
      </span>
    </div>
  );
}

/** Inline form of the same idea, for dense list rows. */
export function RiskTag({ pct, className }: { pct: number; className?: string }) {
  const tone = BAND_TONE[riskBand(pct)];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular",
        tone.text,
        className,
      )}
      title={`${tone.label} raid risk`}
    >
      <span aria-hidden className={cn("h-1 w-1 rounded-full bg-current")} />
      {formatPercent(pct)}
    </span>
  );
}
