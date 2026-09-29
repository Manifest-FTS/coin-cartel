"use client";

import { Toaster as HotToaster } from "react-hot-toast";

/**
 * react-hot-toast wraps every toast — including `toast.custom()` ones — in a
 * default white, padded, shadowed box before rendering its children. The game
 * draws all of its own chrome, so that wrapper is flattened here and each toast
 * supplies its own border, gradient and glow.
 *
 * These options are also the safety net for the plain `toast.success()` /
 * `toast.error()` helpers, so an un-themed call still lands in the palette
 * instead of a white card.
 */
const FLATTENED = {
  background: "transparent",
  color: "inherit",
  boxShadow: "none",
  border: "none",
  padding: 0,
  borderRadius: 0,
  maxWidth: "none",
  boxSizing: "border-box",
  overflow: "visible",
} as const;

const SURFACE = {
  background: "#162226",
  color: "#FFFFFF",
  border: "1px solid #26383E",
  boxShadow: "0 18px 40px -20px rgba(0,0,0,0.95)",
} as const;

export type ToasterProps = {
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  durationMs?: number;
};

export function Toaster({
  position = "bottom-right",
  durationMs = 4200,
}: ToasterProps) {
  return (
    <HotToaster
      position={position}
      gutter={12}
      containerClassName="w-[min(24rem,calc(100vw-2rem))] px-4"
      toastOptions={{
        duration: durationMs,
        className:
          "!bg-transparent !p-0 !rounded-none !shadow-none !border-0 !text-inherit !font-sans",
        style: FLATTENED,
        success: { style: SURFACE, icon: <span aria-hidden /> },
        error: { style: SURFACE, icon: <span aria-hidden /> },
      }}
    />
  );
}
