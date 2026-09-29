import { cn } from "@/lib/cn";

export type Glow =
  | "acid"
  | "gold"
  | "ice"
  | "heat"
  | "rust"
  | "none";

const GLOWS: Record<Glow, string> = {
  none: "",
  acid: "shadow-glow-acid",
  gold: "shadow-glow-gold",
  ice: "shadow-glow-ice",
  heat: "shadow-glow-heat",
  rust: "shadow-glow-rust",
};

export type PanelProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Adds the 1px top highlight used on raised surfaces. */
  lit?: boolean;
  /** Adds a soft coloured bloom behind the card. */
  glow?: Glow;
  /** Adds the hazard-tape top edge. Flags irreversible risk. */
  hazard?: "gold" | "heat" | false;
};

export function Panel({
  className,
  lit = true,
  glow = "none",
  hazard = false,
  ...props
}: PanelProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-noir-500/80 bg-noir-700/70 backdrop-blur-sm",
        lit && "edge-lit",
        GLOWS[glow],
        hazard && "hazard-edge",
        hazard === "heat" && "hazard-edge-heat",
        className,
      )}
      {...props}
    />
  );
}

export function PanelHeader({
  className,
  title,
  description,
  action,
}: {
  className?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-start justify-between gap-3 border-b border-noir-500/70 px-5 py-4",
        className,
      )}
    >
      <div className="min-w-0">
        <h3 className="font-display text-base font-semibold uppercase tracking-tight text-white">
          {title}
        </h3>
        {description ? (
          <p className="mt-0.5 text-xs text-slate-400">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
