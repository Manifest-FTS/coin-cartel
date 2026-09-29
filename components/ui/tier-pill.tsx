import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";
import { TIERS, type TierKey } from "@/lib/data";

const TONES = {
  corporate: {
    chip: "bg-ice-500/12 text-ice-300 border-ice-400/30",
    solid: "bg-ice-500 text-noir-950 border-ice-400 shadow-glow-ice",
    accent: "text-ice-400",
  },
  underground: {
    chip: "bg-rust-500/12 text-rust-300 border-rust-400/30",
    solid: "bg-rust-500 text-noir-950 border-rust-400 shadow-glow-rust",
    accent: "text-rust-400",
  },
} as const;

export type TierPillProps = {
  tier: TierKey;
  variant?: "chip" | "solid";
  size?: "xs" | "sm";
  /** Show "Corporate"/"Underground" instead of the Clean/Dirty shorthand. */
  long?: boolean;
  icon?: LucideIcon;
  className?: string;
};

/** Marks whether a job, an action or the player is Corporate or Underground. */
export function TierPill({
  tier,
  variant = "chip",
  size = "sm",
  long = false,
  icon,
  className,
}: TierPillProps) {
  const def = TIERS[tier];
  const Icon = icon ?? def.icon;
  const spec = TONES[tier];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border font-semibold",
        size === "xs" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]",
        variant === "solid" ? spec.solid : spec.chip,
        className,
      )}
    >
      <Icon className={cn("shrink-0", size === "xs" ? "h-3 w-3" : "h-3.5 w-3.5")} />
      {long ? def.label : def.short}
    </span>
  );
}

/**
 * Interactive two-state selector. Used wherever the player commits to a path
 * (contract terms, laundering routes, faction standing).
 */
export function TierToggle({
  value,
  onChange,
  className,
}: {
  value: TierKey;
  onChange: (next: TierKey) => void;
  className?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Tier"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-noir-500/80 bg-noir-900/70 p-1",
        className,
      )}
    >
      {(Object.keys(TIERS) as TierKey[]).map((key) => {
        const def = TIERS[key];
        const Icon = def.icon;
        const isActive = value === key;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(key)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ease-swift",
              isActive
                ? TONES[key].solid
                : "text-slate-400 hover:bg-noir-700/70 hover:text-white",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {def.label}
          </button>
        );
      })}
    </div>
  );
}
