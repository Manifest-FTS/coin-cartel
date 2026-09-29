import { Banknote, HandCoins, Landmark, type LucideIcon } from "lucide-react";

import { AnimatedNumber } from "@/components/ui/animated-number";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";

export type CurrencyKey = "cash" | "bank" | "dirty";

type CurrencySpec = {
  label: string;
  icon: LucideIcon;
  chip: string;
  value: string;
  iconClass: string;
  /** One-line rule shown in the style guide so the three never get confused. */
  rule: string;
};

export const CURRENCIES: Record<CurrencyKey, CurrencySpec> = {
  cash: {
    label: "Cash",
    icon: Banknote,
    chip: "border-acid-400/30 bg-acid-500/10",
    value: "text-acid-300",
    iconClass: "text-acid-400",
    rule: "Spendable now. Earned by jobs. Loses value to nothing — it just leaves.",
  },
  bank: {
    label: "Bank",
    icon: Landmark,
    chip: "border-ice-400/30 bg-ice-500/10",
    value: "text-ice-300",
    iconClass: "text-ice-400",
    rule: "Protected and passive. The only balance that earns interest and lowers heat.",
  },
  dirty: {
    label: "Dirty",
    icon: HandCoins,
    chip: "border-rust-400/30 bg-rust-500/10",
    value: "text-rust-300",
    iconClass: "text-rust-400",
    rule: "Untraceable. Worth less than cash, raises heat, and must be laundered to be spent on anything real.",
  },
};

export type CurrencyPillProps = {
  currency: CurrencyKey;
  value: number;
  /** Hides the label, keeping icon + value. */
  compact?: boolean;
  size?: "sm" | "md" | "lg";
  /** Animates to the new value instead of snapping. */
  animated?: boolean;
  className?: string;
};

/** Header counter. Cash, Bank and Dirty are the three — never a fourth. */
export function CurrencyPill({
  currency,
  value,
  compact = false,
  size = "md",
  animated = false,
  className,
}: CurrencyPillProps) {
  const spec = CURRENCIES[currency];
  const Icon = spec.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border backdrop-blur-sm transition-colors",
        spec.chip,
        size === "sm" && "h-7 gap-1.5 px-2.5",
        size === "md" && "h-9 gap-2 px-3",
        size === "lg" && "h-11 gap-2.5 px-4",
        className,
      )}
      title={`${spec.label} — ${spec.rule}`}
    >
      <Icon
        className={cn(
          "shrink-0",
          size === "sm" && "h-3.5 w-3.5",
          size === "md" && "h-4 w-4",
          size === "lg" && "h-5 w-5",
          spec.iconClass,
        )}
      />
      <span
        className={cn(
          "font-mono font-semibold tabular",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          size === "lg" && "text-base",
          spec.value,
        )}
      >
        <span aria-hidden>$</span>
        {animated ? <AnimatedNumber value={value} /> : formatNumber(value)}
      </span>
      {!compact ? (
        <span
          className={cn(
            "hidden font-semibold uppercase tracking-[0.1em] text-slate-400 sm:inline",
            size === "lg" ? "text-[11px]" : "text-[10px]",
          )}
        >
          {spec.label}
        </span>
      ) : null}
    </span>
  );
}
