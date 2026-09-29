"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CountdownCard } from "@/components/ui/countdown-card";
import { JobCard } from "@/components/ui/job-card";
import { Panel, PanelHeader } from "@/components/ui/panel";
import { SpecNote } from "@/components/ui/section";
import { useCountdown } from "@/hooks/use-countdown";
import { formatDuration } from "@/lib/format";
import { PLOTS, STRAINS, type TierKey } from "@/lib/data";
import { cashActionToast, dirtyActionToast, raidToast } from "@/lib/toasts";

export function JobsDemo() {
  const [tier, setTier] = useState<TierKey>("underground");
  const [claimed, setClaimed] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-8">
      {/* Grow plots — the game's core loop. */}
      <div>
        <h3 className="mb-1 font-display text-sm font-semibold text-white">
          Grow plots
        </h3>
        <p className="mb-3 text-[11px] text-slate-500">
          Buy a seed, start the cycle, come back when the bar says ready. The risk
          ring is the whole decision — it is the price of leaving the plot running
          long enough to be worth harvesting.
        </p>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PLOTS.map((plot) => (
            <JobCard
              key={plot.id}
              title={plot.planted ? plot.crop : plot.crop}
              subtitle={`Plot ${plot.id.replace("plot-", "")} · The Ridgeline`}
              icon={plot.icon}
              tier="underground"
              value={plot.value}
              currency="dirty"
              riskPct={plot.raidPct}
              actionLabel={plot.planted ? `Harvest ${formatPlots(plot.value)}` : "Plant a seed"}
              disabled={!plot.planted}
              hazard={plot.raidPct >= 25}
              onAction={() => dirtyActionToast({ meta: `+$${plot.value}` })}
              className={plot.planted ? "" : "opacity-60"}
            />
          ))}
        </div>

        <SpecNote token="JobCard tier=… value=… riskPct=…">
          An unplanted plot keeps the card mounted and disabled rather than
          collapsing it, so the grid never reflows when a harvest lands. The
          action label is the state change — &ldquo;Harvest&quot; vs{" "}
          &ldquo;Plant a seed&rdquo; — not a generic &ldquo;Go&rdquo;.
        </SpecNote>
      </div>

      {/* Strains — the cost / time / yield / risk trade. */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">
          Strains — the trade
        </h3>
        <ul className="flex flex-col divide-y divide-noir-500/50 overflow-hidden rounded-xl border border-noir-500/70">
          {STRAINS.map((strain) => {
            const multiple = (strain.yieldValue / strain.seed).toFixed(1);
            return (
              <li
                key={strain.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 bg-noir-700/40 px-4 py-3"
              >
                <strain.icon className="h-4 w-4 shrink-0 text-acid-400" />

                <div className="min-w-[8rem] flex-1">
                  <p className="font-display text-sm font-semibold text-white">
                    {strain.name}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-500">{strain.blurb}</p>
                </div>

                <dl className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  {[
                    { k: "Seed", v: `$${strain.seed.toLocaleString("en-US")}` },
                    { k: "Grow", v: formatDuration(strain.growSec * 1000) },
                    { k: "Yield", v: `$${strain.yieldValue.toLocaleString("en-US")}` },
                    { k: "Multiple", v: `${multiple}×` },
                    { k: "Raid", v: `${strain.raidPct}%` },
                  ].map((cell) => (
                    <div key={cell.k} className="flex items-baseline gap-1.5">
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                        {cell.k}
                      </dt>
                      <dd className="font-mono text-[11px] font-semibold tabular text-slate-300">
                        {cell.v}
                      </dd>
                    </div>
                  ))}
                </dl>

                <code className="shrink-0 rounded bg-noir-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
                  LV {strain.minLevel}
                </code>
              </li>
            );
          })}
        </ul>

        <SpecNote token="STRAINS in lib/data.ts">
          The multiple (yield ÷ seed) is the number players actually optimise, so
          it gets its own column. A strain locked behind a level shows the level
          rather than a disabled button — the tease is the feature.
        </SpecNote>
      </div>

      {/* A job in flight. */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">
          A job in flight
        </h3>
        <RunningJob onRaid={raidToast} onPayout={cashActionToast} />
        <SpecNote token="timer={{ percent, remaining }}">
          Passing a <code className="font-mono text-[10px]">timer</code> switches
          the card to running: the ring gets its live sweep, the payout block is
          replaced by a progress bar, and the action is suppressed. One card, one
          state — not two components.
        </SpecNote>
      </div>

      {/* Composed. */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">
          Composed — job list
        </h3>
        <Panel>
          <PanelHeader
            title="Weed Farm"
            description="The Ridgeline · Running"
            action={
              <Button
                variant={tier === "corporate" ? "bank" : "dirty"}
                size="sm"
                onClick={() => setTier(tier === "corporate" ? "underground" : "corporate")}
              >
                {tier === "corporate" ? "Sell banked" : "Sell on the street"}
              </Button>
            }
          />
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <JobCard
              title="Northern Lights"
              subtitle="Plot 2 · 10m cycle"
              icon={STRAINS[1].icon}
              tier="underground"
              value={STRAINS[1].yieldValue}
              currency={tier === "corporate" ? "bank" : "dirty"}
              riskPct={STRAINS[1].raidPct}
              meta={[
                { label: "Energy", value: String(STRAINS[1].energy) },
                { label: "XP", value: String(STRAINS[1].xp) },
                { label: "Grow", value: formatDuration(STRAINS[1].growSec * 1000) },
              ]}
              actionLabel="Start grow"
              onAction={() =>
                (tier === "corporate" ? dirtyActionToast : cashActionToast)({
                  meta: `$${STRAINS[1].seed.toLocaleString("en-US")}`,
                })
              }
            />
            <JobCard
              title="OG Kush"
              subtitle="Plot 1 · top shelf"
              icon={STRAINS[2].icon}
              tier="underground"
              value={STRAINS[2].yieldValue}
              currency="dirty"
              riskPct={STRAINS[2].raidPct}
              status="exposed"
              meta={[
                { label: "Energy", value: String(STRAINS[2].energy) },
                { label: "XP", value: String(STRAINS[2].xp) },
                { label: "Grow", value: formatDuration(STRAINS[2].growSec * 1000) },
              ]}
              actionLabel="Push it"
              actionVariant="danger"
              hazard
            />
          </div>
        </Panel>

        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          <span className="text-[11px] text-slate-500">Claimed:</span>
          {claimed.length === 0 ? (
            <span className="text-[11px] text-slate-600">nothing yet</span>
          ) : (
            claimed.map((id) => (
              <code
                key={id}
                className="rounded bg-acid-500/15 px-1.5 py-0.5 font-mono text-[10px] text-acid-300"
              >
                {id}
              </code>
            ))
          )}
          <Button
            size="xs"
            variant="ghost"
            className="ml-auto"
            onClick={() => setClaimed([])}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}

function formatPlots(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

/** Live job card. Drives the ring sweep and the in-flight bar from one hook. */
function RunningJob({
  onRaid,
  onPayout,
}: {
  onRaid: (payload?: { meta?: string }) => void;
  onPayout: (payload?: { meta?: string }) => void;
}) {
  const timer = useCountdown({ durationMs: 90_000 });
  const [rolled, setRolled] = useState(false);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <JobCard
        title="Harbor — import run"
        subtitle="Containers in at low tide"
        tier="corporate"
        status={timer.isComplete ? "running" : "exposed"}
        statusLabel={timer.isComplete ? "Unloading" : "Exposed"}
        value={11_400}
        currency="bank"
        riskPct={34}
        hazard
        actionLabel="Collect the run"
        onAction={() => {
          if (rolled) {
            onRaid({ meta: "−$11,400" });
          } else {
            onPayout({ meta: "+$11,400" });
          }
          setRolled(true);
        }}
        timer={{ percent: timer.percent, remaining: timer.remaining }}
      />

      <div className="flex flex-col justify-center gap-3 rounded-2xl border border-noir-500/70 bg-noir-700/40 p-4">
        <CountdownCard
          title="Import run"
          durationSec={90}
          blurb="Runs on its own. Claim before the manifest clears."
          tone="ice"
          claimLabel="Collect $11,400"
          showControls
          className="border-0 bg-transparent p-0 shadow-none"
        />
        <p className="text-[11px] leading-relaxed text-slate-500">
          The card on the left is the same job rendered as a running{" "}
          <code className="font-mono text-[10px] text-acid-300/90">JobCard</code>{" "}
          with a <code className="font-mono text-[10px] text-acid-300/90">timer</code>{" "}
          prop, fed by the same{" "}
          <code className="font-mono text-[10px] text-acid-300/90">useCountdown</code>{" "}
          the card on the right owns.
        </p>
      </div>
    </div>
  );
}
