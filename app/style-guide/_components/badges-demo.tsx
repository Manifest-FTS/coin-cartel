"use client";

import { useState } from "react";

import { DemoGrid, SpecNote } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import { RiskMeter, RiskTag } from "@/components/ui/risk-meter";
import { TierPill, TierToggle } from "@/components/ui/tier-pill";
import { STATUSES, STATUS_ORDER, TIERS, type TierKey } from "@/lib/data";

export function BadgesDemo() {
  const [tier, setTier] = useState<TierKey>("underground");

  return (
    <div className="flex flex-col gap-8">
      {/* Tier */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">Tier</h3>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <TierToggle value={tier} onChange={setTier} />
            <span className="text-[11px] text-slate-500">
              Selected:{" "}
              <span className={tier === "corporate" ? "text-ice-300" : "text-rust-300"}>
                {TIERS[tier].label}
              </span>
            </span>
          </div>

          <DemoGrid cols={2}>
            {(["corporate", "underground"] as TierKey[]).map((key) => (
              <div
                key={key}
                className="rounded-xl border border-noir-500/70 bg-noir-700/40 p-4"
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <TierPill tier={key} />
                  <TierPill tier={key} long />
                  <TierPill tier={key} size="xs" />
                  <TierPill tier={key} variant="solid" />
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
                  <span className="font-semibold text-white">{TIERS[key].label}</span> —{" "}
                  {TIERS[key].blurb}
                </p>
              </div>
            ))}
          </DemoGrid>
        </div>

        <SpecNote token="TierPill · TierToggle">
          The toggle commits the player to a path. The pill only labels one. Never
          use a pill where a choice is being made — a player who can&apos;t tell
          them apart will tap the wrong thing.
        </SpecNote>
      </div>

      {/* Status */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">Status badges</h3>

        <div className="mb-4 flex flex-wrap gap-2">
          {STATUS_ORDER.map((key) => (
            <StatusBadge key={key} status={key} />
          ))}
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-500">xs · glow:</span>
          {STATUS_ORDER.slice(0, 3).map((key) => (
            <StatusBadge key={key} status={key} size="xs" />
          ))}
          <StatusBadge status="running" size="xs" glow />
          <StatusBadge status="hot" size="sm" glow />
        </div>

        <ul className="flex flex-col divide-y divide-noir-500/50 overflow-hidden rounded-xl border border-noir-500/70">
          {STATUS_ORDER.map((key) => (
            <li
              key={key}
              className="flex flex-wrap items-center gap-3 bg-noir-700/40 px-4 py-2.5"
            >
              <StatusBadge status={key} size="xs" />
              <code className="font-mono text-[10px] text-acid-300/90">{key}</code>
              <span className="min-w-0 flex-1 text-[11px] text-slate-400">
                {STATUSES[key].description}
              </span>
            </li>
          ))}
        </ul>

        <SpecNote token="StatusBadge status=… size=… glow?">
          <code className="font-mono text-[10px]">glow</code> is meant for exactly
          one badge in view at a time — the location the player is standing in.
          Glowing everything is the same as glowing nothing.
        </SpecNote>
      </div>

      {/* Risk */}
      <div>
        <h3 className="mb-1 font-display text-sm font-semibold text-white">
          Risk — the raid ring
        </h3>
        <p className="mb-3 text-[11px] text-slate-500">
          A shape, not a bar. Every payout in the game is paired with the
          probability of losing it, and it has to read as a different kind of
          number from health, energy and heat.
        </p>

        <div className="flex flex-wrap items-end gap-6 rounded-xl border border-noir-500/70 bg-noir-700/40 p-5">
          <RiskMeter pct={5} live />
          <RiskMeter pct={20} size="lg" />
          <RiskMeter pct={30} size="lg" live />
          <RiskMeter pct={100} size="sm" />
          <RiskMeter pct={0} size="sm" bare />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          <span className="text-[11px] text-slate-500">Inline form:</span>
          <RiskTag pct={5} />
          <RiskTag pct={12} />
          <RiskTag pct={30} />
          <span className="ml-2 text-[11px] text-slate-600">
            Bands: &lt;10% low · 10–24% moderate · ≥25% high
          </span>
        </div>

        <DemoGrid cols={2} className="mt-3">
          <SpecNote token="riskBand(pct)">
            The bands are fixed, not relative to the job on screen. A 20% raid is
            &ldquo;moderate&rdquo; whether or not a 40% one is on the same screen —
            a scale that shifts under the player is a scale they can&apos;t learn.
          </SpecNote>
          <SpecNote token="live">
            The rotating sweep only runs when the job is actually in flight. Four
            static rings spinning at once is noise, and the sweep would pull the
            eye away from the countdown next to it.
          </SpecNote>
        </DemoGrid>
      </div>

      {/* Composed */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">
          Composed — how they read together
        </h3>
        <div className="flex flex-col gap-3 rounded-xl border border-noir-500/70 bg-noir-700/40 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <TierPill tier="underground" />
            <span className="text-sm font-semibold text-white">Harbor — import run</span>
            <StatusBadge status="exposed" glow />
            <RiskTag pct={34} />
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Tier says the job is underground. Status says units are on the dock.
            The ring says the run gets rolled a third of the time. All three are
            readable before the player spends a point of energy.
          </p>
        </div>

        <SpecNote token="Composed">
          Tier on the left, the job in the middle, status and risk on the right,
          actions beneath. Keep this reading order consistent across every panel.
        </SpecNote>
      </div>

      {/* Risk band reference */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">
          Band reference
        </h3>
        <ul className="flex flex-col divide-y divide-noir-500/50 overflow-hidden rounded-xl border border-noir-500/70">
          {(["low", "moderate", "high"] as const).map((band) => (
            <li
              key={band}
              className="flex flex-wrap items-center gap-3 bg-noir-700/40 px-4 py-2.5"
            >
              <RiskMeter pct={band === "low" ? 5 : band === "moderate" ? 18 : 30} size="sm" />
              <code className="font-mono text-[10px] text-acid-300/90">{band}</code>
              <span className="min-w-0 flex-1 text-[11px] text-slate-400">
                {band === "low"
                  ? "Under 10%. The default state of most street work."
                  : band === "moderate"
                    ? "10–24%. Noticeable enough that a bad night costs a plot."
                    : "Above 25%. Only worth it when the payout is disproportionate."}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
