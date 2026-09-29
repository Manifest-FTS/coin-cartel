"use client";

import { Flame, Landmark, Shield, Swords, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { SidebarNav } from "@/components/sidebar-nav";
import { Button } from "@/components/ui/button";
import { CountdownCard } from "@/components/ui/countdown-card";
import { CurrencyPill } from "@/components/ui/currency-pill";
import { JobCard } from "@/components/ui/job-card";
import { LocationList } from "@/components/ui/location-card";
import { Panel, PanelHeader } from "@/components/ui/panel";
import { HeatMeter, ProfilePill } from "@/components/ui/profile-pill";
import { RiskTag } from "@/components/ui/risk-meter";
import { SpecNote } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import { StatChip, VitalityBar } from "@/components/ui/vitality-bar";
import { formatDuration } from "@/lib/format";
import {
  BANK,
  CASH,
  COMBAT,
  DIRTY,
  LOCATIONS,
  PLAYER,
  POWER,
  STRAINS,
  VITALS,
  type TierKey,
} from "@/lib/data";
import { bankActionToast, cashActionToast, dirtyActionToast } from "@/lib/toasts";

/**
 * The full dashboard: the screen every other page in the game is a variant of.
 * Sidebar, header, jobs, timers, and fast travel in the real arrangement.
 */
export function ComposedDemo() {
  const [navId, setNavId] = useState("dashboard");
  const [locationId, setLocationId] = useState("weed-farm");
  const [tier, setTier] = useState<TierKey>("underground");
  const [cash, setCash] = useState(CASH.value);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[11px] text-slate-500">
          The reference arrangement. Every screen in the game drops a subset of
          these blocks.
        </p>
        <Link
          href="/"
          className="text-[11px] font-semibold text-acid-300 transition-colors hover:text-acid-400"
        >
          ← Back to the landing page
        </Link>
      </div>

      {/* Shell */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,18rem)]">
        {/* Left — nav */}
        <div className="flex flex-col gap-4">
          <SidebarNav
            activeId={navId}
            onActiveChange={setNavId}
            footer={
              <div className="flex items-center justify-between gap-2 px-3 py-1.5">
                <span className="text-[10px] uppercase tracking-[0.14em] text-slate-600">
                  Heat cools
                </span>
                <span className="font-mono text-[11px] tabular text-heat-400">00:42:18</span>
              </div>
            }
          />

          <Panel className="p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Vitals
            </p>
            <div className="mt-3 flex flex-col gap-3.5">
              {VITALS.map((vital) => (
                <VitalityBar
                  key={vital.id}
                  label={vital.label}
                  value={vital.value}
                  max={vital.max}
                  icon={vital.icon}
                  tone={vital.tone}
                  size="sm"
                />
              ))}
              <HeatMeter value={31} standing="Noticed" />
            </div>
          </Panel>
        </div>

        {/* Centre — header + jobs + timers */}
        <div className="flex min-w-0 flex-col gap-4">
          <Panel className="flex flex-wrap items-center justify-between gap-3 p-3">
            <ProfilePill
              handle={PLAYER.handle}
              rank={PLAYER.rank}
              level={PLAYER.level}
              nextLevel={PLAYER.nextLevel}
              progressPct={PLAYER.progressPct}
              subtitle={`${tier === "corporate" ? "Corporate" : "Underground"} · ${PLAYER.country}`}
            />

            <div className="flex flex-wrap items-center gap-2">
              <CurrencyPill currency="cash" value={cash} animated />
              <CurrencyPill currency="bank" value={BANK.value} />
              <CurrencyPill currency="dirty" value={DIRTY.value} />
            </div>
          </Panel>

          <div className="flex flex-wrap items-center gap-2">
            <StatChip label="Attack" value={COMBAT[0].value} icon={Swords} tone="heat" delta={2} />
            <StatChip label="Defense" value={COMBAT[1].value} icon={Shield} tone="ice" />
            <StatChip label="Power" value={POWER} icon={Flame} tone="gold" />
            <div className="ml-auto flex gap-2">
              <Button
                size="xs"
                variant={tier === "corporate" ? "bank" : "dirty"}
                onClick={() => {
                  const next = tier === "corporate" ? "underground" : "corporate";
                  setTier(next);
                  if (next === "corporate") {
                    bankActionToast({ meta: "+$888 banked", title: "Moved to the bank" });
                  } else {
                    cashActionToast({ meta: "+$2,400" });
                  }
                }}
              >
                {tier === "corporate" ? (
                  <>
                    <Landmark className="h-3 w-3" />
                    Banked
                  </>
                ) : (
                  <>
                    <Zap className="h-3 w-3" />
                    Street
                  </>
                )}
              </Button>
            </div>
          </div>

          <Panel>
            <PanelHeader
              title="Jobs"
              description="The Ridgeline · three plots online"
              action={<StatusBadge status="exposed" size="sm" />}
            />
            <div className="grid gap-4 p-4 sm:grid-cols-2">
              {STRAINS.slice(0, 2).map((strain) => (
                <JobCard
                  key={strain.id}
                  title={strain.name}
                  subtitle={`Plot ${strain === STRAINS[0] ? 1 : 2} · ${formatDuration(strain.growSec * 1000)} cycle`}
                  icon={strain.icon}
                  tier="underground"
                  value={strain.yieldValue}
                  currency={tier === "corporate" ? "bank" : "dirty"}
                  riskPct={strain.raidPct}
                  meta={[
                    { label: "Energy", value: String(strain.energy) },
                    { label: "XP", value: String(strain.xp) },
                  ]}
                  actionLabel="Start grow"
                  onAction={() => {
                    setCash((v) => v - strain.seed);
                    dirtyActionToast({ meta: `−$${strain.seed.toLocaleString("en-US")}` });
                  }}
                />
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Timers" description="Two cycles running" />
            <div className="grid gap-4 p-4 sm:grid-cols-2">
              <CountdownCard
                title="Northern Lights — Grow"
                durationSec={600}
                blurb="Premium strain. High yield, but the smell attracts attention."
                icon={STRAINS[1].icon}
                tone="rust"
                claimLabel={`Harvest $${STRAINS[1].yieldValue.toLocaleString("en-US")}`}
                onClaim={() => {
                  setCash((v) => v + STRAINS[1].yieldValue);
                  cashActionToast({ meta: `+$${STRAINS[1].yieldValue.toLocaleString("en-US")}` });
                }}
              />
              <CountdownCard
                title="Laundering Cycle"
                durationSec={240}
                blurb="Turns dirty into bank. Completes on its own; there is no skill in waiting."
                tone="ice"
                claimLabel={`Launder $${DIRTY.value.toLocaleString("en-US")}`}
                onClaim={() => bankActionToast({ meta: "+$888", title: "Moved to the bank" })}
              />
            </div>
          </Panel>
        </div>

        {/* Right — fast travel + ledger */}
        <div className="flex min-w-0 flex-col gap-4">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Fast travel
            </p>
            <LocationList
              locations={LOCATIONS.slice(0, 6)}
              activeId={locationId}
              onSelect={setLocationId}
            />
          </div>

          <Panel>
            <PanelHeader title="Ledger" description="This session" />
            <ul className="flex flex-col divide-y divide-noir-500/50">
              {[
                { k: "Harbor import run", v: "+$11,400", tone: "acid" },
                { k: "Skunk harvest", v: "+$900", tone: "acid" },
                { k: "Northern Lights seed", v: "−$1,500", tone: "rust" },
                { k: "Raid on Plot 3", v: "−$200", tone: "heat" },
              ].map((row) => (
                <li
                  key={row.k}
                  className="flex items-center justify-between gap-2 px-4 py-2.5"
                >
                  <span className="truncate text-[11px] text-slate-400">{row.k}</span>
                  <span
                    className={
                      row.tone === "acid"
                        ? "font-mono text-[11px] font-semibold tabular text-acid-300"
                        : row.tone === "rust"
                          ? "font-mono text-[11px] font-semibold tabular text-rust-300"
                          : "font-mono text-[11px] font-semibold tabular text-heat-300"
                    }
                  >
                    {row.v}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Wanted
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <RiskTag pct={34} />
              <RiskTag pct={5} />
              <RiskTag pct={30} />
            </div>
            <p className="mt-2.5 text-[11px] leading-relaxed text-slate-500">
              Live jobs, wanted rivals and the standings all read from the same
              risk bands as the cards.
            </p>
          </Panel>
        </div>
      </div>

      <SpecNote token="Composed shell">
        Three columns, always in this order: navigation and the player&apos;s own
        state on the left, actions in the middle, the world and the ledger on the
        right. Money moves right to left — the ledger on the right is the record of
        what the buttons in the middle just did.
      </SpecNote>
    </div>
  );
}
