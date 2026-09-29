"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Lock } from "lucide-react";

import { useMotionPref } from "@/components/motion-pref";
import { cn } from "@/lib/cn";

export type NavItemProps = {
  label: string;
  icon: LucideIcon;
  /** Trailing count or short meta, right-aligned. */
  meta?: string;
  /** Renders a padlock instead of the meta chip. */
  locked?: boolean;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
};

/**
 * Vertical nav row. The active state is signalled three ways so it survives
 * both a quick glance and a colour-vision difference: a pulsing dot, an acid
 * text/icon tint, and a left edge rail.
 */
export function NavItem({
  label,
  icon: Icon,
  meta,
  locked = false,
  active = false,
  disabled = false,
  onClick,
  href,
  className,
}: NavItemProps) {
  const { reduced } = useMotionPref();

  const content = (
    <>
      {/* Active indicator rail. */}
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-1/2 w-0.5 -translate-y-1/2 rounded-r-full bg-acid-400 transition-all duration-300 ease-swift",
          active ? "h-7 opacity-100 shadow-[0_0_10px_0_rgba(74,222,128,0.9)]" : "h-0 opacity-0",
        )}
      />

      {/* Glowing dot. */}
      <span
        aria-hidden
        className={cn(
          "relative flex h-2 w-2 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
          active ? "opacity-100" : "opacity-0",
        )}
      >
        <span className="absolute h-2 w-2 rounded-full bg-acid-400" />
        {!reduced ? (
          <motion.span
            className="absolute h-2 w-2 rounded-full bg-acid-400"
            animate={{ opacity: [0.75, 0, 0.75], scale: [1, 2.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}
      </span>

      <Icon
        className={cn(
          "h-4 w-4 shrink-0 transition-colors duration-200",
          active ? "text-acid-300" : "text-slate-500 group-hover:text-slate-200",
        )}
      />

      <span
        className={cn(
          "min-w-0 flex-1 truncate text-left text-sm font-medium transition-colors duration-200",
          active ? "text-white" : "text-slate-400 group-hover:text-white",
        )}
      >
        {label}
      </span>

      {locked ? (
        <Lock className="h-3 w-3 shrink-0 text-slate-600" />
      ) : meta ? (
        <span
          className={cn(
            "shrink-0 rounded-full px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular transition-colors duration-200",
            active
              ? "bg-acid-500/20 text-acid-300"
              : "bg-noir-700 text-slate-500 group-hover:text-slate-300",
          )}
        >
          {meta}
        </span>
      ) : null}
    </>
  );

  const shared = cn(
    "group relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5",
    "transition-colors duration-200 ease-swift",
    "hover:bg-noir-700/70",
    active && "bg-gradient-to-r from-acid-500/12 to-transparent",
    disabled && "pointer-events-none opacity-40",
    className,
  );

  if (href && !onClick) {
    return (
      <a
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(shared, "focus-visible:ring-2 focus-visible:ring-acid-400/70")}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      disabled={disabled}
      className={shared}
    >
      {content}
    </button>
  );
}
