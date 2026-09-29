"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SpecNote } from "@/components/ui/section";

export function ActionsDemo() {
  const [label, setLabel] = useState("");
  const [armed, setArmed] = useState(false);

  const fieldClass =
    "h-11 rounded-xl border border-noir-500 bg-noir-900/70 px-3.5 text-sm text-white placeholder:text-slate-600 transition-colors duration-200 focus:border-acid-400/60";

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">Variants</h3>
        <div className="flex flex-wrap items-center gap-2.5 rounded-xl border border-noir-500/70 bg-noir-700/40 p-4">
          <Button variant="primary">Take the job</Button>
          <Button variant="bank">Launder</Button>
          <Button variant="secondary">Scout</Button>
          <Button variant="outline">Plant seed</Button>
          <Button variant="ghost">Decline</Button>
          <Button variant="dirty">Sell on the street</Button>
          <Button variant="danger">Burn the plot</Button>
        </div>
        <SpecNote token="Button variant=…">
          <code className="font-mono text-[10px]">primary</code> for the one thing
          you want done. <code className="font-mono text-[10px]">dirty</code>,{" "}
          <code className="font-mono text-[10px]">bank</code> and{" "}
          <code className="font-mono text-[10px]">danger</code> are the only ones
          that get a glow — they are the only ones that move money irreversibly.
        </SpecNote>
      </div>

      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">Sizes</h3>
        <div className="flex flex-wrap items-center gap-2.5 rounded-xl border border-noir-500/70 bg-noir-700/40 p-4">
          <Button size="xs">Extra small</Button>
          <Button size="sm" variant="secondary">
            Small
          </Button>
          <Button size="md" variant="secondary">
            Medium
          </Button>
          <Button size="lg" variant="secondary">
            Large
          </Button>
          <Button size="md" variant="primary" disabled>
            Not enough energy
          </Button>
        </div>
        <SpecNote token="Button size=…">
          Minimum 28px hit target on desktop, 36px minimum anywhere tappable. The{" "}
          <code className="font-mono text-[10px]">xs</code> size is for dense rows
          and demo controls only. A disabled button carries the reason in its
          label — a greyed-out button with no explanation is a support ticket.
        </SpecNote>
      </div>

      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">Inputs</h3>
        <div className="grid gap-4 rounded-xl border border-noir-500/70 bg-noir-700/40 p-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              Front name
            </span>
            <input
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              placeholder="Cedar Ridge Farm"
              className={fieldClass}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              Seed quantity
            </span>
            <input
              type="number"
              defaultValue={3}
              className={`${fieldClass} font-mono tabular`}
            />
          </label>

          <div className="sm:col-span-2">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              Two-step destructive confirm
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              {armed ? (
                <>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setArmed(false)}
                    autoFocus
                  >
                    Confirm — burn {label || "this plot"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setArmed(false)}>
                    Keep it
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setArmed(true)}
                  className="border-heat-400/40 text-heat-300 hover:bg-heat-500/10"
                >
                  Burn plot…
                </Button>
              )}
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
              Burning a plot is the only action with no undo in the game, so it
              takes two clicks and the second one names the target out loud.
            </p>
          </div>
        </div>
        <SpecNote token="Armed state">
          Anything irreversible gets a two-step confirm, and the destructive
          button only exists after intent. A stray click can never cost a player
          a whole season of growing.
        </SpecNote>
      </div>
    </div>
  );
}
