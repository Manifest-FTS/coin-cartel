"use client";

import { Heart, Minus, Plus, Shield, Siren, Swords, Zap } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CURRENCIES, CurrencyPill, type CurrencyKey } from "@/components/ui/currency-pill";
import { HeatMeter, ProfilePill } from "@/components/ui/profile-pill";
import { SpecNote } from "@/components/ui/section";
import { StatChip, VitalityBar } from "@/components/ui/vitality-bar";
import {
  BANK,
  CASH,
  COMBAT,
  DIRTY,
  PLAYER,
  VITALS,
} from "@/lib/data";

const START: Record<CurrencyKey, number> = {
  cash: CASH.value,
  bank: BANK.value,
  dirty: DIRTY.value,
};

export function CountersDemo() {
  const [balances, setBalances] = useState<Record<CurrencyKey, number>>(START);
  const [energy, setEnergy] = useState(85);
  const [heat, setHeat] = useState(31);
  const [attack, setAttack] = useState(COMBAT[0].value);

  const bump = (key: CurrencyKey, by: number) =>
    setBalances((v) => ({ ...v, [key]: Math.max(0, v[key] + by) }));

  return (
    <div className="flex flex-col gap-8">
      {/* Currency */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">Currencies</h3>

        <div className="flex flex-wrap items-center gap-2.5 rounded-xl border border-noir-500/70 bg-noir-700/40 p-4">
          <CurrencyPill currency="cash" value={balances.cash} animated />
          <CurrencyPill currency="bank" value={balances.bank} animated />
          <CurrencyPill currency="dirty" value={balances.dirty} animated />
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <Button size="xs" variant="secondary" onClick={() => bump("cash", 300)}>
            <Plus className="h-3 w-3" />
            +$300 cash
          </Button>
          <Button size="xs" variant="bank" onClick={() => bump("bank", 1200)}>
            <Plus className="h-3 w-3" />
            +$1,200 banked
          </Button>
          <Button size="xs" variant="dirty" onClick={() => bump("dirty", 850)}>
            <Plus className="h-3 w-3" />
            +$850 dirty
          </Button>
          <Button size="xs" variant="ghost" onClick={() => setBalances(START)}>
            <Minus className="h-3 w-3" />
            Reset
          </Button>
        </div>

        <ul className="mt-3 flex flex-col divide-y divide-noir-500/50 overflow-hidden rounded-xl border border-noir-500/70">
          {(Object.keys(CURRENCIES) as CurrencyKey[]).map((key) => (
            <li
              key={key}
              className="flex flex-wrap items-center gap-3 bg-noir-700/40 px-4 py-2.5"
            >
              <code className="font-mono text-[10px] text-acid-300/80">{key}</code>
              <span className="min-w-0 flex-1 text-[11px] text-slate-400">
                {CURRENCIES[key].rule}
              </span>
            </li>
          ))}
        </ul>

        <SpecNote token="CurrencyPill currency=… size=… animated?">
          Three balances and never a fourth.{" "}
          <code className="font-mono text-[10px]">animated</code> eases the number
          to its new value so a payout reads as a tick-up. Keep it on the header
          counters only — animating a hundred ledger rows is noise.
        </SpecNote>
      </div>

      {/* Vitals */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">
          Vitals, heat &amp; combat
        </h3>

        <div className="grid gap-4 rounded-xl border border-noir-500/70 bg-noir-700/40 p-4 sm:grid-cols-2">
          {VITALS.map((vital) => (
            <VitalityBar
              key={vital.id}
              label={vital.label}
              value={vital.id === "energy" ? energy : vital.value}
              max={vital.max}
              icon={vital.icon}
              tone={vital.tone}
              note={vital.note}
            />
          ))}
          <HeatMeter value={heat} standing="Noticed" />
          <div className="flex flex-col justify-center gap-2.5 sm:items-end">
            <StatChip label="Attack" value={attack} icon={Swords} tone="heat" delta={2} />
            <StatChip
              label="Defense"
              value={COMBAT[1].value}
              icon={Shield}
              tone="ice"
            />
            <StatChip
              label="Power"
              value={attack + COMBAT[1].value}
              icon={Siren}
              tone="gold"
            />
          </div>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <Button
            size="xs"
            variant="secondary"
            onClick={() => setEnergy((v) => Math.max(0, v - 15))}
          >
            <Zap className="h-3 w-3" />
            −15 energy
          </Button>
          <Button
            size="xs"
            variant="ghost"
            onClick={() => setEnergy((v) => Math.min(100, v + 15))}
          >
            <Plus className="h-3 w-3" />
            Rest +15
          </Button>
          <Button
            size="xs"
            variant="danger"
            onClick={() => setHeat((v) => Math.min(100, v + 22))}
          >
            <Siren className="h-3 w-3" />
            Get noticed
          </Button>
          <Button
            size="xs"
            variant="ghost"
            onClick={() => setHeat((v) => Math.max(0, v - 12))}
          >
            <Minus className="h-3 w-3" />
            Lay low
          </Button>
          <Button size="xs" variant="secondary" onClick={() => setAttack((v) => v + 1)}>
            <Heart className="h-3 w-3" />
            Train +1 attack
          </Button>
        </div>

        <SpecNote token="VitalityBar · HeatMeter · StatChip">
          Health, energy and heat are capped meters. Attack, defense and power
          climb forever, so they get a chip instead of a bar — a bar implies a
          ceiling the player can&apos;t see. Heat is deliberately the inverse of
          every other meter: full is bad, and it is the only bar that drains on
          its own.
        </SpecNote>
      </div>

      {/* Profile */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">
          Player profile
        </h3>

        <div className="flex flex-col gap-3 rounded-xl border border-noir-500/70 bg-noir-900/60 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <ProfilePill
              handle={PLAYER.handle}
              rank={PLAYER.rank}
              level={PLAYER.level}
              nextLevel={PLAYER.nextLevel}
              progressPct={PLAYER.progressPct}
              subtitle="Underground · United States"
              trailing={`$${START.cash.toLocaleString("en-US")}`}
            />
            <ProfilePill
              handle={PLAYER.handle}
              rank={PLAYER.rank}
              level={PLAYER.level}
              nextLevel={PLAYER.nextLevel}
              progressPct={PLAYER.progressPct}
              size="sm"
            />
          </div>
          <p className="text-[11px] text-slate-500">
            Full variant, then the compact one. The compact variant drops the
            subtitle and the trailing balance — it survives down to a 380px
            viewport where the full pill would wrap.
          </p>
        </div>

        <SpecNote token="ProfilePill size=…">
          The level bar is the same <code className="font-mono text-[10px]">ProgressBar</code>{" "}
          as the vitals at <code className="font-mono text-[10px]">xs</code> height.
          One component, two jobs — if level progress ever needs a different
          visual, it should be a different component.
        </SpecNote>
      </div>
    </div>
  );
}
