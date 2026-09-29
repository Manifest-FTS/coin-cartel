"use client";

import { Flame, Zap } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { LocationCard, LocationList } from "@/components/ui/location-card";
import { Panel, PanelHeader } from "@/components/ui/panel";
import { SpecNote } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import { LOCATIONS, type StatusKey } from "@/lib/data";

export function LocationsDemo() {
  const [activeId, setActiveId] = useState("weed-farm");
  const active = LOCATIONS.find((l) => l.id === activeId) ?? LOCATIONS[0];

  const districts = LOCATIONS.reduce<Record<string, typeof LOCATIONS>>((acc, loc) => {
    (acc[loc.district] ??= []).push(loc);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-8">
      {/* Selected detail + list. */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
        <Panel>
          <PanelHeader
            title={active.title}
            description={`${active.district} · ${active.tag ?? "Civic"}`}
            action={<StatusBadge status={active.status} glow />}
          />

          <div className="flex flex-col gap-5 p-5">
            <p className="text-sm leading-relaxed text-slate-300">{active.description}</p>

            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { k: "Travel", v: active.travel },
                { k: "Energy", v: active.energyCost ? `−${active.energyCost}` : "None" },
                { k: "Payout", v: active.payout },
                {
                  k: "Status",
                  v: active.status,
                  badge: true,
                },
              ].map((cell) => (
                <div
                  key={cell.k}
                  className="rounded-xl border border-noir-500/60 bg-noir-900/50 p-3"
                >
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {cell.k}
                  </dt>
                  <dd className="mt-1.5 font-mono text-sm font-semibold tabular text-white">
                    {cell.badge ? (
                      <StatusBadge status={cell.v as StatusKey} size="xs" />
                    ) : (
                      cell.v
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap gap-2.5">
              <Button variant="primary" disabled={active.energyCost > 85}>
                Travel here
              </Button>
              <Button variant="secondary">View jobs</Button>
              {active.status === "locked" ? (
                <Button variant="ghost" disabled>
                  Unlocks at corporate tier
                </Button>
              ) : null}
            </div>
          </div>
        </Panel>

        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Fast travel
          </p>
          <LocationList locations={LOCATIONS} activeId={activeId} onSelect={setActiveId} />

          <SpecNote token="LocationList locations=… activeId=… onSelect?">
            The whole row is the hit target, and the active row is the only one
            that gets the acid glow — so &ldquo;where am I&rdquo; is answerable
            without reading.
          </SpecNote>
        </div>
      </div>

      {/* Grouped by district. */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">
          By district
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Object.entries(districts).map(([district, list]) => (
            <div key={district}>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-600">
                {district}
              </p>
              <div className="flex flex-col gap-1.5">
                {list.map((loc) => (
                  <LocationCard
                    key={loc.id}
                    location={loc}
                    active={loc.id === activeId}
                    onSelect={setActiveId}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <SpecNote token="LOCATIONS in lib/data.ts">
          Districts are a view concern, not a data field — they are derived at
          render time so adding a place never means editing a second list. Order
          the map, not the component.
        </SpecNote>
      </div>

      {/* Variants. */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">Variants</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Without travel time
            </p>
            <div className="flex flex-col gap-1.5">
              {LOCATIONS.slice(0, 4).map((loc) => (
                <LocationCard
                  key={loc.id}
                  location={loc}
                  active={loc.id === "harbor"}
                  showTravel={false}
                />
              ))}
            </div>
            <p className="mt-2 text-[11px] text-slate-600">
              <code className="font-mono text-[10px] text-acid-300/90">
                showTravel={"{false}"}
              </code>{" "}
              — for lists where travel time would be noise.
            </p>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Status ladder
            </p>
            <div className="flex flex-col gap-1.5">
              {(
                [
                  ["clean", "Nothing happening"],
                  ["running", "Something live"],
                  ["guarded", "Armed detail"],
                  ["exposed", "Units on the door"],
                  ["hot", "Active raid"],
                  ["locked", "Not yet earned"],
                ] as [StatusKey, string][]
              ).map(([status, note]) => (
                <div
                  key={status}
                  className="flex items-center gap-3 rounded-xl border border-noir-500/60 bg-noir-700/40 px-3 py-2"
                >
                  <StatusBadge status={status} size="xs" />
                  <span className="text-[11px] text-slate-400">{note}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-600">
              <Zap className="h-3 w-3" />
              <Flame className="h-3 w-3" />
              Severity increases left to right; hue is never the only signal.
            </p>
          </div>
        </div>

        <SpecNote token="StatusBadge">
          The status ramp runs acid → rust → gold → heat with slate for locked.
          Gold sits between exposed and hot on purpose: a guarded building is a
          cost, not a threat.
        </SpecNote>
      </div>
    </div>
  );
}
