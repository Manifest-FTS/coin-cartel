import { cn } from "@/lib/cn";

export type SectionProps = {
  id: string;
  /** Small caps index label, e.g. "03". */
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

/** One chapter of the style guide, addressable by hash. */
export function Section({
  id,
  index,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-28", className)}>
      <header className="mb-5">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[11px] font-semibold tabular text-acid-400/80">
            {index}
          </span>
          <span className="h-px w-8 bg-gradient-to-r from-acid-400/60 to-transparent" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {eyebrow}
          </span>
        </div>
        <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-white">
          {title}
        </h2>
        {description ? (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-400">{description}</p>
        ) : null}
      </header>
      {children}
    </section>
  );
}

/** The bordered surface every live demo sits on. */
export function DemoSurface({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "edge-lit rounded-2xl border border-noir-500/70 bg-noir-900/50 p-5",
        className,
      )}
    >
      {label ? (
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          {label}
        </p>
      ) : null}
      {children}
    </div>
  );
}

/** Caption + copyable token name, used under each demo. */
export function SpecNote({
  token,
  children,
}: {
  token?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[11px] leading-relaxed text-slate-500">
      {token ? (
        <code className="rounded bg-noir-700 px-1.5 py-0.5 font-mono text-[10px] text-acid-300/90">
          {token}
        </code>
      ) : null}
      <span>{children}</span>
    </div>
  );
}

/** Grid wrapper so demos line up regardless of content length. */
export function DemoGrid({
  children,
  cols = 2,
  className,
}: {
  children: React.ReactNode;
  cols?: 1 | 2 | 3;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-4",
        cols === 1 && "grid-cols-1",
        cols === 2 && "grid-cols-1 md:grid-cols-2",
        cols === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
