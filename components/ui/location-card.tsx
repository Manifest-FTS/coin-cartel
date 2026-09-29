"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useId } from "react";

import { useMotionPref } from "@/components/motion-pref";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/cn";
import type { LocationDef } from "@/lib/data";

export type LocationCardProps = {
  location: LocationDef;
  /** Currently selected / player is present here. */
  active?: boolean;
  onSelect?: (id: string) => void;
  /** Renders the trailing travel-time affordance. */
  showTravel?: boolean;
  className?: string;
};

/**
 * Compact location row for the right sidebar: icon, title, subtitle district,
 * status pill, and a travel time. The whole row is the hit target.
 */
export function LocationCard({
  location,
  active = false,
  onSelect,
  showTravel = true,
  className,
}: LocationCardProps) {
  const { reduced } = useMotionPref();
  const Icon = location.icon;
  // Scoped per component instance so two lists on one page don't share a
  // framer-motion layoutId and animate against each other.
  const layoutId = useId();

  const shell = cn(
    "group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-3 py-2.5 text-left",
    "transition-all duration-200 ease-swift",
    active
      ? "border-acid-400/45 bg-acid-500/10 shadow-glow-acid"
      : "border-noir-500/70 bg-noir-700/60 hover:border-noir-400 hover:bg-noir-600",
    className,
  );

  const inner = (
    <>
      {active && !reduced ? (
        <motion.span
          aria-hidden
          layoutId={`location-active-${layoutId}`}
          className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-acid-500/10 to-transparent"
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      ) : null}

      <span
        aria-hidden
        className={cn(
          "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200",
          active
            ? "border-acid-400/40 bg-acid-500/15 text-acid-300"
            : "border-noir-400/70 bg-noir-800/80 text-slate-400 group-hover:text-slate-200",
        )}
      >
        <Icon className="h-4 w-4" />
      </span>

      <span className="relative min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate font-display text-sm font-semibold text-white">
            {location.title}
          </span>
          {location.tag ? (
            <span className="shrink-0 rounded border border-noir-400/60 bg-noir-800/80 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
              {location.tag}
            </span>
          ) : null}
        </span>
        <span className="mt-0.5 block truncate text-[11px] text-slate-500">
          {location.district}
        </span>
      </span>

      <span className="relative flex shrink-0 flex-col items-end gap-1">
        <StatusBadge status={location.status} size="xs" glow={active} />
        {showTravel ? (
          <span className="flex items-center gap-1 font-mono text-[10px] tabular text-slate-500">
            {location.travel}
            <ArrowRight
              className={cn(
                "h-3 w-3 transition-transform duration-200",
                onSelect ? "group-hover:translate-x-0.5" : "hidden",
              )}
            />
          </span>
        ) : null}
      </span>
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={() => onSelect(location.id)}
        aria-current={active ? "true" : undefined}
        className={cn(shell, "cursor-pointer")}
      >
        {inner}
      </button>
    );
  }

  return (
    <div aria-current={active ? "true" : undefined} className={shell}>
      {inner}
    </div>
  );
}

export type LocationListProps = {
  locations: LocationDef[];
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
};

export function LocationList({
  locations,
  activeId,
  onSelect,
  className,
}: LocationListProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {locations.map((location) => (
        <LocationCard
          key={location.id}
          location={location}
          active={activeId === location.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
