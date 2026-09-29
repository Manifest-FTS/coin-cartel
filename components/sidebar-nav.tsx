"use client";

import { Landmark } from "lucide-react";
import { useState } from "react";

import { NavItem } from "@/components/ui/nav-item";
import { NAV_ITEMS } from "@/lib/data";
import { cn } from "@/lib/cn";

export type SidebarNavProps = {
  /** Controlled active id. Omit for an internally-managed demo state. */
  activeId?: string;
  onActiveChange?: (id: string) => void;
  /** Brand mark shown above the list. */
  showBrand?: boolean;
  footer?: React.ReactNode;
  className?: string;
};

/**
 * Primary left navigation. Controlled by default in the game shell; falls back
 * to internal state so it can be dropped into a prototype as-is.
 */
export function SidebarNav({
  activeId,
  onActiveChange,
  showBrand = true,
  footer,
  className,
}: SidebarNavProps) {
  const [internal, setInternal] = useState(NAV_ITEMS[0].id);
  const active = activeId ?? internal;

  const select = (id: string) => {
    if (onActiveChange) onActiveChange(id);
    else setInternal(id);
  };

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "flex w-full flex-col gap-1 rounded-2xl border border-noir-500/70 bg-noir-900/70 p-2.5 backdrop-blur-sm",
        className,
      )}
    >
      {showBrand ? (
        <div className="mb-1.5 flex items-center gap-2.5 rounded-xl border border-noir-500/60 bg-noir-800/60 px-3 py-2.5">
          <span
            aria-hidden
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-500/15 text-gold-300 ring-1 ring-inset ring-gold-400/30"
          >
            <Landmark className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="wordmark block text-[15px] text-white">Coin Cartel</span>
            <span className="block text-[10px] uppercase tracking-[0.14em] text-slate-500">
              Season 3 · Week 11
            </span>
          </span>
        </div>
      ) : null}

      <div className="flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            meta={item.meta}
            locked={item.locked}
            active={active === item.id}
            onClick={() => select(item.id)}
          />
        ))}
      </div>

      {footer ? <div className="mt-2 border-t border-noir-500/60 pt-2">{footer}</div> : null}
    </nav>
  );
}
