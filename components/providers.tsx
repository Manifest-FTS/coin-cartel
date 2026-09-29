"use client";

import { MotionPrefProvider } from "@/components/motion-pref";
import { Toaster } from "@/components/ui/toaster";

/** Client boundary for the whole app: motion preference + the toast outlet. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionPrefProvider>
      {children}
      <Toaster />
    </MotionPrefProvider>
  );
}
