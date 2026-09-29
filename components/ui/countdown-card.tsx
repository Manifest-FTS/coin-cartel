"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { useCallback, useMemo } from "react";

import { useMotionPref } from "@/components/motion-pref";
import { Button } from "@/components/ui/button";
import { ProgressBar, type ProgressTone } from "@/components/ui/progress-bar";
import { useCountdown, type UseCountdownResult } from "@/hooks/use-countdown";
import { cn } from "@/lib/cn";
import { formatClock, formatDuration } from "@/lib/format";
import { timerCompleteToast } from "@/lib/toasts";

const READY_LABEL = "Ready to claim";

const STATUS_COPY: Record<UseCountdownResult["status"], { label: string; className: string }> = {
  idle: { label: "Idle", className: "text-slate-500" },
  running: { label: "In progress", className: "text-slate-400" },
  paused: { label: "Paused", className: "text-gold-400" },
  complete: { label: READY_LABEL, className: "text-gold-300" },
};

export type CountdownCardProps = {
  title: string;
  /** Cycle length in seconds. */
  durationSec: number;
  blurb?: string;
  icon?: React.ElementType;
  tone?: ProgressTone;
  /** Text on the post-completion button. */
  claimLabel?: string;
  /** Start ticking on mount. */
  autoStart?: boolean;
  /** Renders the demo transport controls (play/pause/reset/skip). */
  showControls?: boolean;
  /** Fires the golden "ready" toast the moment the cycle completes. */
  toastOnComplete?: boolean;
  onClaim?: () => void;
  onComplete?: () => void;
  className?: string;
};

export function CountdownCard({
  title,
  durationSec,
  blurb,
  icon: Icon,
  tone = "acid",
  claimLabel = "Claim",
  autoStart = true,
  showControls = false,
  toastOnComplete = false,
  onClaim,
  onComplete,
  className,
}: CountdownCardProps) {
  const { reduced } = useMotionPref();

  const handleComplete = useCallback(() => {
    onComplete?.();
    if (toastOnComplete) timerCompleteToast(title);
  }, [onComplete, title, toastOnComplete]);

  const timer = useCountdown({
    durationMs: durationSec * 1000,
    autoStart,
    onComplete: handleComplete,
  });

  const { isComplete, status } = timer;
  const barTone: ProgressTone = isComplete ? "gold" : tone;
  const statusCopy = STATUS_COPY[status];

  const urgency = useMemo(() => {
    const ratio = timer.remaining / (durationSec * 1000 || 1);
    if (ratio <= 0.15) return "near";
    if (ratio <= 0.4) return "mid";
    return "far";
  }, [durationSec, timer.remaining]);

  return (
    <div
      className={cn(
        "edge-lit relative flex flex-col gap-4 overflow-hidden rounded-2xl border bg-noir-700/70 p-4 backdrop-blur-sm transition-shadow duration-500 ease-swift",
        isComplete
          ? "border-gold-400/50 shadow-glow-gold"
          : "border-noir-500/80 shadow-panel",
        className,
      )}
    >
      {/* Completion bloom. */}
      {isComplete ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-400/20 blur-2xl"
        />
      ) : null}

      <div className="flex items-start gap-3">
        {Icon ? (
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors duration-500",
              isComplete
                ? "border-gold-400/40 bg-gold-500/15 text-gold-300"
                : "border-noir-400/70 bg-noir-800/80 text-acid-300",
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
        ) : null}

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-sm font-semibold text-white">{title}</h3>
          {blurb ? <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">{blurb}</p> : null}
        </div>
      </div>

      <div className="flex items-end justify-between gap-3">
        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            {isComplete ? "Cycle complete" : "Time remaining"}
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isComplete ? "ready" : urgency}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "mt-0.5 block font-mono text-2xl font-semibold tabular leading-none",
                isComplete ? "text-gold-300" : "text-white",
              )}
            >
              {isComplete ? READY_LABEL : formatClock(timer.remaining)}
            </motion.span>
          </AnimatePresence>
        </div>

        <span
          className={cn(
            "text-[11px] font-semibold uppercase tracking-[0.1em]",
            statusCopy.className,
          )}
        >
          {statusCopy.label}
        </span>
      </div>

      <ProgressBar
        value={timer.percent}
        tone={barTone}
        size="lg"
        easing="linear"
        shimmer={!isComplete && status === "running"}
        bloom
      />

      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] tabular text-slate-500">
          {Math.round(timer.percent)}% · cycle {formatDuration(durationSec * 1000)}
        </span>

        {isComplete ? (
          <Button variant="primary" size="sm" onClick={onClaim} className="shadow-glow-gold">
            <Check className="h-3.5 w-3.5" />
            {claimLabel}
          </Button>
        ) : null}
      </div>

      {showControls ? (
        <div className="flex flex-wrap items-center gap-1.5 border-t border-noir-500/60 pt-3">
          <Button
            variant="ghost"
            size="xs"
            onClick={timer.toggle}
            disabled={status === "idle" || isComplete}
            aria-label={status === "running" ? "Pause timer" : "Resume timer"}
          >
            {status === "running" ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {status === "running" ? "Pause" : "Resume"}
          </Button>
          <Button variant="ghost" size="xs" onClick={timer.reset}>
            <RotateCcw className="h-3 w-3" />
            Reset
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={timer.completeNow}
            disabled={isComplete}
            title="Jump to the ready state"
          >
            <SkipForward className="h-3 w-3" />
            Skip to ready
          </Button>
        </div>
      ) : null}
    </div>
  );
}
