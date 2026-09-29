import { Slot } from "@/components/ui/slot";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "bank"
  | "secondary"
  | "ghost"
  | "outline"
  | "danger"
  | "dirty";

export type ButtonSize = "xs" | "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-acid-500/90 text-noir-950 hover:bg-acid-400 active:bg-acid-600 shadow-glow-acid hover:shadow-glow-acid-lg font-semibold",
  bank: "bg-ice-500/90 text-noir-950 hover:bg-ice-400 active:bg-ice-600 shadow-glow-ice font-semibold",
  secondary:
    "bg-noir-600 text-white hover:bg-noir-500 border border-noir-400/70 active:bg-noir-700",
  outline:
    "bg-transparent text-acid-300 border border-acid-500/40 hover:bg-acid-500/10 hover:border-acid-400/60",
  ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-noir-700/70",
  danger:
    "bg-heat-500/90 text-white hover:bg-heat-400 active:bg-heat-600 shadow-glow-heat font-semibold",
  dirty:
    "bg-rust-500/90 text-noir-950 hover:bg-rust-400 active:bg-rust-600 shadow-glow-rust font-semibold",
};

const SIZES: Record<ButtonSize, string> = {
  xs: "h-7 px-2.5 text-[11px] gap-1.5 rounded-md",
  sm: "h-9 px-3.5 text-xs gap-2 rounded-lg",
  md: "h-11 px-5 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-sm gap-2.5 rounded-xl",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render as the single child element instead of a `<button>`. */
  asChild?: boolean;
};

export function Button({
  className,
  variant = "secondary",
  size = "md",
  asChild = false,
  type,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      {...(asChild ? {} : { type: type ?? "button" })}
      className={cn(
        "inline-flex select-none items-center justify-center whitespace-nowrap",
        "transition-all duration-200 ease-swift",
        "disabled:pointer-events-none disabled:opacity-40",
        SIZES[size],
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  );
}
