"use client";

import {
  HandCoins,
  Landmark,
  Banknote,
  Siren,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/cn";

export type ToastVariant = "cash-in" | "dirty-in" | "bank-in" | "raid" | "ready" | "info";

type VariantSpec = {
  icon: LucideIcon;
  /** Small caps channel label above the title. */
  eyebrow: string;
  border: string;
  background: string;
  glow: string;
  iconChip: string;
  title: string;
};

export const TOAST_VARIANTS: Record<ToastVariant, VariantSpec> = {
  "cash-in": {
    icon: Banknote,
    eyebrow: "Cash · Clean",
    border: "1px solid rgba(34, 197, 94, 0.55)",
    background:
      "linear-gradient(180deg, rgba(22, 34, 38, 0.98) 0%, rgba(11, 17, 19, 0.98) 100%)",
    glow: "0 0 0 1px rgba(34,197,94,0.22), 0 0 30px -4px rgba(34,197,94,0.55), 0 18px 40px -20px rgba(0,0,0,0.95)",
    iconChip: "bg-acid-500/18 text-acid-300 ring-1 ring-inset ring-acid-400/40",
    title: "text-white",
  },
  "dirty-in": {
    icon: HandCoins,
    eyebrow: "Dirty · Underground",
    border: "1px solid rgba(255, 122, 47, 0.55)",
    background:
      "linear-gradient(180deg, rgba(42, 26, 18, 0.98) 0%, rgba(11, 17, 19, 0.98) 100%)",
    glow: "0 0 0 1px rgba(255,122,47,0.22), 0 0 30px -4px rgba(255,122,47,0.5), 0 18px 40px -20px rgba(0,0,0,0.95)",
    iconChip: "bg-rust-500/18 text-rust-300 ring-1 ring-inset ring-rust-400/40",
    title: "text-white",
  },
  "bank-in": {
    icon: Landmark,
    eyebrow: "Banked · Protected",
    border: "1px solid rgba(34, 211, 238, 0.5)",
    background:
      "linear-gradient(180deg, rgba(17, 34, 38, 0.98) 0%, rgba(11, 17, 19, 0.98) 100%)",
    glow: "0 0 0 1px rgba(34,211,238,0.20), 0 0 30px -4px rgba(34,211,238,0.45), 0 18px 40px -20px rgba(0,0,0,0.95)",
    iconChip: "bg-ice-500/18 text-ice-300 ring-1 ring-inset ring-ice-400/40",
    title: "text-white",
  },
  raid: {
    icon: Siren,
    eyebrow: "Raid",
    border: "1px solid rgba(255, 59, 78, 0.6)",
    background:
      "linear-gradient(180deg, rgba(46, 20, 24, 0.98) 0%, rgba(11, 17, 19, 0.98) 100%)",
    glow: "0 0 0 1px rgba(255,59,78,0.24), 0 0 30px -4px rgba(255,59,78,0.55), 0 18px 40px -20px rgba(0,0,0,0.95)",
    iconChip: "bg-heat-500/20 text-heat-300 ring-1 ring-inset ring-heat-400/40",
    title: "text-heat-300",
  },
  ready: {
    icon: Sparkles,
    eyebrow: "Cycle complete",
    border: "1px solid rgba(255, 193, 69, 0.65)",
    background:
      "linear-gradient(180deg, rgba(44, 35, 16, 0.98) 0%, rgba(11, 17, 19, 0.98) 100%)",
    glow: "0 0 0 1px rgba(255,193,69,0.30), 0 0 36px -4px rgba(255,193,69,0.65), 0 18px 40px -20px rgba(0,0,0,0.95)",
    iconChip: "bg-gold-500/20 text-gold-300 ring-1 ring-inset ring-gold-400/50",
    title: "text-gold-300",
  },
  info: {
    icon: Sparkles,
    eyebrow: "Coin Cartel",
    border: "1px solid rgba(138, 155, 163, 0.32)",
    background:
      "linear-gradient(180deg, rgba(22, 34, 38, 0.98) 0%, rgba(11, 17, 19, 0.98) 100%)",
    glow: "0 0 0 1px rgba(138,155,163,0.14), 0 18px 40px -20px rgba(0,0,0,0.95)",
    iconChip: "bg-noir-500/60 text-slate-200 ring-1 ring-inset ring-white/10",
    title: "text-white",
  },
};

export type GameToastProps = {
  variant: ToastVariant;
  title: string;
  description?: string;
  icon?: LucideIcon;
  /** Optional reward/meta line rendered as a mono chip on the right. */
  meta?: string;
  /** Supplies the dismiss close button. Omit for static reference renders. */
  onDismiss?: () => void;
  className?: string;
};

/**
 * The visual body of every in-game toast. Rendered through `toast.custom()` so
 * react-hot-toast owns the positioning and enter/exit transition while the
 * game owns the chrome.
 */
export function GameToast({
  variant,
  title,
  description,
  icon,
  meta,
  onDismiss,
  className,
}: GameToastProps) {
  const spec = TOAST_VARIANTS[variant];
  const Icon = icon ?? spec.icon;

  return (
    <div
      role="status"
      className={cn(
        "pointer-events-auto flex w-full items-start gap-3 rounded-xl px-4 py-3 backdrop-blur-md",
        className,
      )}
      style={{
        border: spec.border,
        background: spec.background,
        boxShadow: spec.glow,
      }}
    >
      <span
        aria-hidden
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          spec.iconChip,
        )}
      >
        <Icon className="h-4 w-4" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          {spec.eyebrow}
        </p>
        <p className={cn("mt-0.5 text-sm font-semibold leading-snug", spec.title)}>
          {title}
        </p>
        {description ? (
          <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{description}</p>
        ) : null}
      </div>

      {meta ? (
        <span className="mt-0.5 shrink-0 self-center rounded-md bg-white/[0.06] px-2 py-1 font-mono text-[11px] font-semibold tabular text-slate-200 ring-1 ring-inset ring-white/10">
          {meta}
        </span>
      ) : null}

      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="mt-0.5 shrink-0 self-start rounded-md p-1 text-slate-500 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  );
}
