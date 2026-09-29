"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CountdownCard } from "@/components/ui/countdown-card";
import { SpecNote } from "@/components/ui/section";
import { useCountdown } from "@/hooks/use-countdown";
import { formatClock } from "@/lib/format";
import {
  bankActionToast,
  cashActionToast,
  dirtyActionToast,
  raidToast,
} from "@/lib/toasts";
import { TIMERS } from "@/lib/data";

export function TimersDemo() {
  const [claimed, setClaimed] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">Cycle cards</h3>
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {TIMERS.map((timer) => (
            <CountdownCard
              key={timer.id}
              title={timer.title}
              icon={timer.icon}
              durationSec={timer.durationSec}
              blurb={timer.blurb}
              tone={timer.tone}
              claimLabel={timer.claimLabel}
              showControls
              toastOnComplete
              onClaim={() => {
                setClaimed((prev) => [...prev, timer.id]);
                if (timer.tone === "heat") raidToast();
                else if (timer.tone === "ice") bankActionToast();
                else if (timer.tone === "gold") cashActionToast({ meta: "+$2,400" });
                else dirtyActionToast({ meta: "+$900" });
              }}
            />
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2.5 rounded-xl border border-noir-500/70 bg-noir-700/40 p-4">
          <span className="text-[11px] text-slate-500">Claimed this session:</span>
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

        <SpecNote token="CountdownCard durationSec=…">
          Use <code className="font-mono text-[10px]">Skip to ready</code> to jump
          straight to the completed state instead of waiting out a fifteen-minute
          cycle. The bar fills toward ready — it never refills from zero, which
          would read as a glitch. On completion the card takes the gold glow, which
          is the only gold on the screen until you claim it.
        </SpecNote>
      </div>

      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">
          Cycle row — the same hook, no card
        </h3>
        <CooldownRow />
        <SpecNote token="useCountdown({ durationMs })">
          The hook is the reusable part. It ticks off an absolute end timestamp, so
          it stays accurate through tab throttling, and it exposes{" "}
          <code className="font-mono text-[10px]">percent</code> for the bar plus{" "}
          <code className="font-mono text-[10px]">isComplete</code> for the
          transition.
        </SpecNote>
      </div>
    </div>
  );
}

function CooldownRow() {
  const timer = useCountdown({ durationMs: 105_000, autoStart: false });

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-noir-500/70 bg-noir-700/40 p-4">
      <div className="min-w-[8rem] flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          Energy regen
        </p>
        <p
          className={
            timer.isComplete
              ? "font-mono text-xl font-semibold tabular text-gold-300"
              : "font-mono text-xl font-semibold tabular text-white"
          }
        >
          {timer.isComplete ? "Ready" : formatClock(timer.remaining)}
        </p>
      </div>

      <div className="h-full min-w-[10rem] flex-[2] self-center">
        <div className="h-2 w-full overflow-hidden rounded-full bg-noir-500/70">
          <div
            className={
              timer.isComplete
                ? "h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300"
                : "h-full rounded-full bg-gradient-to-r from-acid-600 to-acid-400"
            }
            style={{ width: `${timer.percent}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={timer.status === "running" ? "secondary" : "primary"}
          onClick={timer.toggle}
          disabled={timer.status === "idle" || timer.isComplete}
        >
          {timer.status === "running" ? "Pause" : "Start"}
        </Button>
        <Button size="sm" variant="ghost" onClick={timer.reset}>
          Reset
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={timer.completeNow}
          disabled={timer.isComplete}
        >
          Skip
        </Button>
      </div>
    </div>
  );
}
