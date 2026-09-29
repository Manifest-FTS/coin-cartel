"use client";

import { useEffect, useRef, useState } from "react";

import { useMotionPref } from "@/components/motion-pref";
import { RiskTag } from "@/components/ui/risk-meter";
import { TierPill } from "@/components/ui/tier-pill";
import { cn } from "@/lib/cn";
import { formatClock, formatCurrency } from "@/lib/format";
import type { TierKey } from "@/lib/data";

type Row = {
  id: string;
  title: string;
  tier: TierKey;
  value: number;
  riskPct: number;
  /** Cycle length in ms. */
  cycle: number;
};

const ROWS: Row[] = [
  { id: "skunk", title: "Skunk — grow", tier: "underground", value: 900, riskPct: 12, cycle: 300_000 },
  { id: "harbor", title: "Harbor — import run", tier: "corporate", value: 11_400, riskPct: 34, cycle: 480_000 },
  { id: "launder", title: "Laundering cycle", tier: "corporate", value: 2_880, riskPct: 4, cycle: 240_000 },
  { id: "getaway", title: "Getaway driver", tier: "underground", value: 2_400, riskPct: 22, cycle: 360_000 },
];

const TICK_MS = 100;
const FLASH_MS = 1400;

/** Staggered start offsets, derived from the cycle lengths so SSR matches CSR. */
const STAGGERED_OFFSETS = ROWS.map((row, i) => Math.max(0, row.cycle - i * 47_000));

/**
 * A live job docket for the landing page. Each row counts down on its own
 * cycle; hitting zero flashes the row gold and restarts it, which is the same
 * ready-state transition `CountdownCard` performs in game.
 */
export function Docket() {
  const { reduced } = useMotionPref();

  // Deterministic on the server *and* the client: the initial paint is a pure
  // function of the cycle lengths, so there is nothing to mismatch on. The
  // wall-clock end times are stamped in an effect once we know we're in a browser.
  const [remaining, setRemaining] = useState<number[]>(() => STAGGERED_OFFSETS);
  const [flashed, setFlashed] = useState<Record<string, boolean>>({});
  const endsRef = useRef<number[]>([]);
  const flashTimersRef = useRef<number[]>([]);

  useEffect(() => {
    // Stagger the initial offsets so the four rows never tick in lockstep.
    endsRef.current = ROWS.map((row, i) => Date.now() + STAGGERED_OFFSETS[i]);

    if (reduced) return;

    const flash = (id: string) => {
      setFlashed((f) => ({ ...f, [id]: true }));
      flashTimersRef.current.push(
        window.setTimeout(
          () => setFlashed((f) => ({ ...f, [id]: false })),
          FLASH_MS,
        ),
      );
    };

    const id = setInterval(() => {
      const now = Date.now();
      const rolled: string[] = [];

      setRemaining((prev) => {
        const next = prev.map((ms, i) => {
          const left = endsRef.current[i] - now;
          if (left <= 0) {
            // Cycle complete: restart the row and flash it gold for a beat.
            endsRef.current[i] = now + ROWS[i].cycle;
            rolled.push(ROWS[i].id);
            return ROWS[i].cycle;
          }
          return left;
        });
        return next;
      });

      // Flashing happens after the updater so it never runs twice under StrictMode.
      rolled.forEach(flash);
    }, TICK_MS);

    return () => {
      clearInterval(id);
      flashTimersRef.current.forEach(window.clearTimeout);
      flashTimersRef.current = [];
    };
  }, [reduced]);

  return (
    <div className="edge-lit hazard-edge overflow-hidden rounded-2xl border border-noir-500/80 bg-noir-900/70 shadow-panel backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 border-b border-noir-500/70 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-acid-400" />
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Live docket
          </span>
        </div>
        <span className="font-mono text-[10px] tabular text-slate-600">
          Season 3 · Week 11
        </span>
      </div>

      <ul className="divide-y divide-noir-500/50">
        {ROWS.map((row, i) => {
          const ms = remaining[i] ?? 0;
          const percent = Math.min(100, ((row.cycle - ms) / row.cycle) * 100);
          const isFlash = flashed[row.id];

          return (
            <li
              key={row.id}
              className={cn(
                "relative flex flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-3 transition-colors duration-500",
                isFlash && "bg-gold-500/10",
              )}
            >
              {/* Cycle progress as a hairline under each row. */}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px transition-colors duration-500",
                  isFlash ? "bg-gold-400/70" : "bg-acid-400/40",
                )}
                style={{ width: `${percent}%` }}
              />

              <TierPill tier={row.tier} size="xs" />

              <span className="min-w-0 flex-1 truncate text-xs font-medium text-slate-200">
                {row.title}
              </span>

              <RiskTag pct={row.riskPct} />

              <span className="shrink-0 font-mono text-xs font-semibold tabular text-acid-300">
                {formatCurrency(row.value)}
              </span>

              <span
                className={cn(
                  "w-14 shrink-0 text-right font-mono text-xs font-semibold tabular transition-colors duration-300",
                  isFlash ? "text-gold-300" : "text-slate-400",
                )}
              >
                {isFlash ? "READY" : formatClock(ms)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
