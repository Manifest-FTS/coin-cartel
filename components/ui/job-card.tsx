"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { useMotionPref } from "@/components/motion-pref";
import { Button } from "@/components/ui/button";
import type { CurrencyKey } from "@/components/ui/currency-pill";
import { ProgressBar } from "@/components/ui/progress-bar";
import { RiskMeter } from "@/components/ui/risk-meter";
import { StatusBadge } from "@/components/ui/status-badge";
import { TierPill } from "@/components/ui/tier-pill";
import { cn } from "@/lib/cn";
import { formatClock, formatCurrency } from "@/lib/format";
import type { StatusKey } from "@/lib/data";

export type JobCardProps = {
  title: string;
  icon?: LucideIcon;
  /** Sub-label under the title, e.g. "Plot 2 · The Ridgeline". */
  subtitle?: string;
  /** Tier of the job. Drives the left edge and the action colour. */
  tier: "corporate" | "underground";
  status?: StatusKey;
  /** Override the status label from the registry. */
  statusLabel?: string;
  /** Payout on a clean run. */
  value: number;
  /** Which balance the payout lands in. */
  currency?: CurrencyKey;
  /** Raid probability, 0-100. */
  riskPct: number;
  /** Small stat readouts under the payout: energy, XP, grow time. */
  meta?: { label: string; value: string }[];
  actionLabel: string;
  onAction?: () => void;
  actionVariant?: "primary" | "bank" | "dirty" | "danger";
  disabled?: boolean;
  /** Adds the hazard-tape top edge. For jobs that can cost the whole run. */
  hazard?: boolean;
  /** Live cycle progress. Presence of this object switches the card to "running". */
  timer?: { percent: number; remaining: number };
  className?: string;
};

const TIER_EDGE = {
  corporate: "before:bg-ice-400",
  underground: "before:bg-rust-400",
} as const;

const TIER_ICON_CHIP = {
  corporate: "border-ice-400/30 bg-ice-500/10 text-ice-300",
  underground: "border-rust-400/30 bg-rust-500/10 text-rust-300",
} as const;

/**
 * The workhorse. One job — a grow plot, a street crime, an organized contract.
 * Always shows the same four things in the same order: what it is, what it
 * pays, what it can cost you, and the one button that starts it.
 */
export function JobCard({
  title,
  icon: Icon,
  subtitle,
  tier,
  status,
  statusLabel,
  value,
  currency = "cash",
  riskPct,
  meta,
  actionLabel,
  onAction,
  actionVariant,
  disabled = false,
  hazard = false,
  timer,
  className,
}: JobCardProps) {
  const { reduced } = useMotionPref();
  const running = Boolean(timer);
  const variant = actionVariant ?? (tier === "corporate" ? "bank" : "dirty");

  return (
    <div
      className={cn(
        "edge-lit group relative flex flex-col gap-3.5 overflow-hidden rounded-2xl border border-noir-500/80 bg-noir-700/60 p-4 backdrop-blur-sm",
        "transition-all duration-300 ease-swift hover:border-noir-400",
        hazard && riskPct >= 25 && "hazard-edge",
        className,
      )}
    >
      {/* Tier edge rail — the two axes never share a shape. */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0 left-0 w-0.5 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:opacity-80",
          TIER_EDGE[tier],
        )}
      />

      <div className="flex items-start gap-3">
        {Icon ? (
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border",
              TIER_ICON_CHIP[tier],
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
        ) : null}

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-sm font-semibold text-white">{title}</h3>
          {subtitle ? (
            <p className="mt-0.5 truncate text-[11px] text-slate-500">{subtitle}</p>
          ) : null}
        </div>

        {status ? (
          <StatusBadge status={status} size="xs" label={statusLabel} />
        ) : (
          <TierPill tier={tier} size="xs" />
        )}
      </div>

      {/* Payout + risk. The whole trade-off in one line. */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Pays out
          </span>
          <span
            className={cn(
              "mt-0.5 block font-mono text-xl font-semibold tabular leading-none",
              currency === "dirty"
                ? "text-rust-300"
                : currency === "bank"
                  ? "text-ice-300"
                  : "text-acid-300",
            )}
          >
            {formatCurrency(value)}
            <span className="ml-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-slate-500">
              {currency === "bank" ? "banked" : currency}
            </span>
          </span>
        </div>

        <RiskMeter pct={riskPct} live={running} />
      </div>

      {timer ? (
        <div className="flex flex-col gap-1.5">
          <ProgressBar
            value={timer.percent}
            tone={tier === "corporate" ? "ice" : "rust"}
            size="sm"
            easing="linear"
            shimmer
          />
          <span className="font-mono text-[11px] tabular text-slate-400">
            {formatClock(timer.remaining)} remaining
          </span>
        </div>
      ) : meta && meta.length > 0 ? (
        <dl className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {meta.map((cell) => (
            <div key={cell.label} className="flex items-baseline gap-1.5">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                {cell.label}
              </dt>
              <dd className="font-mono text-[11px] font-semibold tabular text-slate-300">
                {cell.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <Button
        variant={variant}
        size="md"
        onClick={onAction}
        disabled={disabled}
        className="w-full"
      >
        {actionLabel}
        {!reduced ? (
          <motion.span
            aria-hidden
            className="opacity-0 transition-opacity duration-200 group-hover:opacity-80"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </motion.span>
        ) : null}
      </Button>
    </div>
  );
}
