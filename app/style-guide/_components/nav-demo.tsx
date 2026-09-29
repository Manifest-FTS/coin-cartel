"use client";

import { useState } from "react";

import { SidebarNav } from "@/components/sidebar-nav";
import { NavItem } from "@/components/ui/nav-item";
import { SpecNote } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import { NAV_ITEMS } from "@/lib/data";

export function NavDemo() {
  const [activeId, setActiveId] = useState(NAV_ITEMS[0].id);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,17rem)_1fr]">
        <SidebarNav
          activeId={activeId}
          onActiveChange={setActiveId}
          footer={
            <div className="px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.14em] text-slate-600">
                Heat cools in
              </p>
              <p className="mt-0.5 font-mono text-sm tabular text-heat-400">00:42:18</p>
            </div>
          }
        />

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-noir-500/70 bg-noir-700/40 p-4">
            <h3 className="font-display text-sm font-semibold text-white">
              States side by side
            </h3>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Active row (acid + pulsing dot), resting row, a row with a count, a
              gated row, and a disabled row.
            </p>

            <div className="mt-3 flex flex-col gap-0.5">
              <NavItem label="Active row" icon={NAV_ITEMS[0].icon} active />
              <NavItem label="Resting row" icon={NAV_ITEMS[2].icon} />
              <NavItem label="Row with a count" icon={NAV_ITEMS[1].icon} meta="4" />
              <NavItem label="Hover me" icon={NAV_ITEMS[5].icon} meta="12" />
              <NavItem label="Gated subsystem" icon={NAV_ITEMS[4].icon} locked />
              <NavItem label="Disabled row" icon={NAV_ITEMS[7].icon} disabled />
            </div>
          </div>

          <div className="rounded-xl border border-noir-500/70 bg-noir-700/40 p-4">
            <h3 className="font-display text-sm font-semibold text-white">
              Trailing status
            </h3>
            <p className="mt-0.5 text-[11px] text-slate-500">
              When a nav row needs to advertise a live state, put a badge below
              the title rather than colouring the whole row.
            </p>
            <div className="mt-3 flex flex-col gap-0.5">
              <NavItem
                label="Vehicle Crimes"
                icon={NAV_ITEMS[2].icon}
                active={activeId === "vehicle"}
                onClick={() => setActiveId("vehicle")}
                meta="2 ready"
              />
              <NavItem
                label="Underground Crimes"
                icon={NAV_ITEMS[4].icon}
                active={activeId === "underground"}
                onClick={() => setActiveId("underground")}
                meta="Lv 12"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusBadge status="running" size="xs" />
              <StatusBadge status="exposed" size="xs" />
              <StatusBadge status="locked" size="xs" />
            </div>
          </div>
        </div>
      </div>

      <SpecNote token="SidebarNav · NavItem">
        Renders as <code className="font-mono text-[10px]">&lt;button&gt;</code> by
        default and switches to an anchor if you pass{" "}
        <code className="font-mono text-[10px]">href</code> with no{" "}
        <code className="font-mono text-[10px]">onClick</code>. The active state
        uses both a colour and a shape cue, so it never depends on hue alone.{" "}
        <code className="font-mono text-[10px]">locked</code> is for a row the
        player can see but cannot enter yet; it shows a padlock in the meta slot
        so the row keeps its width.
      </SpecNote>
    </div>
  );
}
