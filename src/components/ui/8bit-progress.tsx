// src/components/ui/8bit-progress.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ProgressProps = {
  /** Progress value from 0 to 100 */
  value: number;
  /** Optional variant for styling */
  variant?: "default" | "retro";
  /** Background color for the filled part */
  progressBg?: string;
  /** Additional class names */
  className?: string;
};

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, variant = "default", progressBg = "bg-primary", className }, ref) => {
    const clamped = Math.min(100, Math.max(0, value));
    const containerClasses = cn(
      "relative w-full overflow-hidden rounded-full bg-muted",
      variant === "retro" && "h-4",
      variant !== "retro" && "h-2",
      className
    );
    const fillerClasses = cn(
      "h-full transition-all duration-300 ease-out",
      progressBg,
      variant === "retro" && "rounded" // make retro look slightly rounded
    );

    return (
      <div ref={ref} className={containerClasses} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
        <div className={fillerClasses} style={{ width: `${clamped}%` }} />
      </div>
    );
  }
);

Progress.displayName = "Progress";
