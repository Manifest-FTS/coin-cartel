import type { LucideIcon } from "lucide-react";
import { Zap } from "lucide-react";

import { ProgressBar, type ProgressTone } from "@/components/ui/progress-bar";
import { cn } from "@/lib/cn";

export type VitalityBarProps = {
  label: string;
  value: number;
  max?: number;
  icon?: LucideIcon;
  tone?: ProgressTone;
  size?: "sm" | "md" | "lg";
  /** Renders the numeric readout on the right of the label. */
  showValue?: boolean;
  /** Extra meta under the bar, e.g. "Restores at the Hospital." */
  note?: string;
  className?: string;
};

/** Labelled horizontal meter — Health, Energy, and any future resource. */
export function VitalityBar({
  label,
  value,
  max = 100,
  icon,
  tone = "acid",
  size = "md",
  showValue = true,
  note,
  className,
}: VitalityBarProps) {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0;
  const Icon = icon ?? Zap;

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5">
          <Icon
            className={cn(
              "h-3.5 w-3.5 shrink-0",
              tone === "acid" && "text-acid-400",
              tone === "ice" && "text-ice-400",
              tone === "gold" && "text-gold-400",
              tone === "heat" && "text-heat-400",
              tone === "rust" && "text-rust-400",
            )}
          />
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            {label}
          </span>
        </span>
        {showValue ? (
          <span className="font-mono text-xs font-semibold tabular text-slate-200">
            {Math.round(value)}
            <span className="text-slate-500">/{max}</span>
          </span>
        ) : null}
      </div>

      <ProgressBar
        value={value}
        max={max}
        tone={tone}
        size={size === "sm" ? "xs" : size === "md" ? "sm" : "md"}
        bloom
      />

      {note ? <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">{note}</p> : null}
      <span className="sr-only">{percent}% remaining</span>
    </div>
  );
}

export type StatChipProps = {
  label: string;
  value: number;
  icon?: LucideIcon;
  /** Renders the value in gold, for the derived "power" total. */
  tone?: ProgressTone;
  /** Signed delta shown under the label, e.g. "+2 since last level". */
  delta?: number;
  className?: string;
};

const CHIP_TONES: Record<ProgressTone, string> = {
  acid: "border-acid-400/30 bg-acid-500/10 text-acid-300",
  ice: "border-ice-400/30 bg-ice-500/10 text-ice-300",
  heat: "border-heat-400/30 bg-heat-500/10 text-heat-300",
  rust: "border-rust-400/30 bg-rust-500/10 text-rust-300",
  gold: "border-gold-400/30 bg-gold-500/10 text-gold-300",
};

/**
 * A compact non-zero-based readout — Attack, Defense, Power, Heat.
 * Deliberately not a bar: these climb forever and a bar implies a ceiling.
 */
export function StatChip({
  label,
  value,
  icon: Icon,
  tone = "acid",
  delta,
  className,
}: StatChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-sm",
        CHIP_TONES[tone],
        className,
      )}
    >
      {Icon ? <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" /> : null}
      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </span>
      <span className="font-mono text-sm font-semibold tabular">{value}</span>
      {delta ? (
        <span className="font-mono text-[10px] tabular text-acid-400/80">+{delta}</span>
      ) : null}
    </span>
  );
}
