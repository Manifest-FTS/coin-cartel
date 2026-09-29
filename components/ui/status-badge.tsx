import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";
import { STATUSES, type StatusKey } from "@/lib/data";

type ToneSpec = {
  /** Chip background + text + border. */
  chip: string;
  /** Colour of the icon / live dot. */
  accent: string;
  /** Colour used by the glow ring when `glow` is set. */
  ring: string;
};

const TONES: Record<StatusKey, ToneSpec> = {
  clean: {
    chip: "bg-acid-500/12 text-acid-300 border-acid-400/30",
    accent: "text-acid-400",
    ring: "shadow-glow-acid",
  },
  running: {
    chip: "bg-acid-400/12 text-acid-300 border-acid-300/30",
    accent: "bg-acid-400",
    ring: "shadow-glow-acid",
  },
  exposed: {
    chip: "bg-rust-500/12 text-rust-300 border-rust-400/30",
    accent: "text-rust-400",
    ring: "shadow-glow-rust",
  },
  guarded: {
    chip: "bg-gold-500/12 text-gold-300 border-gold-400/30",
    accent: "text-gold-400",
    ring: "shadow-glow-gold",
  },
  hot: {
    chip: "bg-heat-500/12 text-heat-300 border-heat-400/30",
    accent: "text-heat-400",
    ring: "shadow-glow-heat",
  },
  locked: {
    chip: "bg-slate-500/12 text-slate-400 border-slate-500/25",
    accent: "text-slate-500",
    ring: "",
  },
};

export type StatusBadgeProps = {
  status: StatusKey;
  /** Override the label from the shared status registry. */
  label?: string;
  size?: "xs" | "sm";
  /** Adds the tone's coloured shadow — reserve for the one item in view. */
  glow?: boolean;
  icon?: LucideIcon;
  className?: string;
};

/** Says what a place is doing right now. Never says which tier an action is. */
export function StatusBadge({
  status,
  label,
  size = "sm",
  glow = false,
  icon,
  className,
}: StatusBadgeProps) {
  const def = STATUSES[status];
  const spec = TONES[status];
  const Icon = icon ?? def.icon;
  const isLive = Boolean(def.live);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border font-semibold uppercase tracking-[0.1em]",
        size === "xs" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]",
        spec.chip,
        glow && spec.ring,
        className,
      )}
    >
      {isLive ? (
        <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden>
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-70",
              spec.accent,
            )}
          />
          <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", spec.accent)} />
        </span>
      ) : (
        <Icon
          className={cn(
            "shrink-0",
            size === "xs" ? "h-3 w-3" : "h-3.5 w-3.5",
            spec.accent,
          )}
        />
      )}
      {label ?? def.label}
    </span>
  );
}

export function statusTone(status: StatusKey): ToneSpec {
  return TONES[status];
}
