"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useMotionPref } from "@/components/motion-pref";
import { cn } from "@/lib/cn";

import { SECTIONS } from "../_sections";

/** Sticky section index with an IntersectionObserver-driven active marker. */
export function StyleGuideNav() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  useEffect(() => {
    const elements = SECTIONS.map((section) =>
      document.getElementById(section.id),
    ).filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Bias the "current" band towards the upper third of the viewport.
      { rootMargin: "-96px 0px -62% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Style guide sections"
      className="no-scrollbar sticky top-24 z-30 -mx-1 flex gap-1 overflow-x-auto px-1 pb-1 lg:mx-0 lg:block lg:overflow-visible lg:px-0 lg:pb-0"
    >
      <ul className="flex min-w-max gap-1 lg:min-w-0 lg:flex-col">
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id} className="lg:w-full">
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group relative flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs transition-colors duration-200",
                  "lg:whitespace-normal",
                  isActive ? "text-white" : "text-slate-500 hover:text-slate-200",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="styleguide-nav-active"
                    className="absolute inset-0 rounded-lg border border-acid-400/30 bg-acid-500/10"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                ) : null}
                <span
                  className={cn(
                    "relative font-mono text-[10px] font-semibold tabular",
                    isActive ? "text-acid-400" : "text-slate-600",
                  )}
                >
                  {section.index}
                </span>
                <span className="relative font-medium">{section.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Global motion switch. Components jump to end state instead of animating. */
export function MotionToggle() {
  const { reduced, toggle } = useMotionPref();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={reduced}
      onClick={toggle}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ease-swift",
        reduced
          ? "border-slate-500/40 bg-noir-700/80 text-slate-300"
          : "border-acid-400/40 bg-acid-500/10 text-acid-300",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "relative h-4 w-7 rounded-full transition-colors duration-200",
          reduced ? "bg-noir-500" : "bg-acid-500/70",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform duration-200 ease-swift",
            reduced ? "translate-x-0.5" : "translate-x-3.5",
          )}
        />
      </span>
      Motion {reduced ? "off" : "on"}
    </button>
  );
}
