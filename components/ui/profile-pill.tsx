import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";

export type ProfilePillProps = {
  handle: string;
  rank: string;
  level: number;
  nextLevel: number;
  /** 0-100 through the current level. */
  progressPct: number;
  initials?: string;
  /** Optional subtitle under the handle, e.g. the active tier. */
  subtitle?: string;
  /** Shown on the right when there is room, e.g. current cash. */
  trailing?: string;
  size?: "sm" | "md";
  className?: string;
};

/**
 * Header identity block: avatar, handle, rank, level, and the bar to the next
 * level. Collapses to avatar + level on the narrowest breakpoint.
 */
export function ProfilePill({
  handle,
  rank,
  level,
  nextLevel,
  progressPct,
  initials,
  subtitle,
  trailing,
  size = "md",
  className,
}: ProfilePillProps) {
  const letters =
    initials ??
    handle
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const avatar = size === "sm" ? "h-8 w-8 text-[11px]" : "h-10 w-10 text-xs";

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-full border border-noir-500/80 bg-noir-700/60 py-1.5 pl-1.5 backdrop-blur-sm",
        size === "sm" ? "pr-3" : "pr-4",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-full",
          "bg-gradient-to-br from-acid-500/25 to-rust-500/20",
          "font-display font-bold tracking-wide text-acid-300",
          "ring-1 ring-inset ring-acid-400/40",
          avatar,
        )}
      >
        {letters}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              "truncate font-display font-semibold text-white",
              size === "sm" ? "text-xs" : "text-sm",
            )}
          >
            {handle}
          </span>
          <span className="shrink-0 font-mono text-[11px] font-semibold text-acid-400">
            LV {level}
          </span>
        </div>

        <span className="block truncate text-[10px] uppercase tracking-[0.12em] text-slate-500">
          {subtitle ?? rank}
        </span>

        <div className="mt-1 flex items-center gap-2">
          <ProgressBar
            value={progressPct}
            tone="acid"
            size="xs"
            className="min-w-12 flex-1"
            bloom
          />
          <span className="shrink-0 font-mono text-[10px] tabular text-slate-500">
            <span className="text-slate-300">{Math.round(progressPct)}%</span> to {nextLevel}
          </span>
        </div>
      </div>

      {trailing ? (
        <span
          className={cn(
            "hidden shrink-0 border-l border-noir-500/80 pl-3 font-mono font-semibold tabular text-acid-300 lg:block",
            size === "sm" ? "text-xs" : "text-sm",
          )}
        >
          {trailing}
        </span>
      ) : null}
    </div>
  );
}

/**
 * Wanted level. The only bar in the game that is *bad* when it is full, and
 * the reason the heat ramp exists — it is deliberately the inverse of every
 * other meter on screen.
 */
export function HeatMeter({
  value,
  max = 100,
  standing,
  className,
}: {
  value: number;
  max?: number;
  standing?: string;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          Heat
          {standing ? <span className="ml-1.5 text-slate-400">{standing}</span> : null}
        </span>
        <span className="font-mono text-xs font-semibold tabular text-heat-400">
          {formatNumber(value)}
          <span className="text-slate-500">/{max}</span>
        </span>
      </div>
      <ProgressBar value={value} max={max} tone="heat" size="sm" bloom />
    </div>
  );
}
