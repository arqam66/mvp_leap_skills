"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/8bit-progress";

const DEFAULT_TIPS = [
  "Press any key to continue...",
  "Did you know? Saving often prevents lost progress!",
  "Tip: Explore every corner for hidden treasures.",
  "Remember to take breaks during long gaming sessions!",
  "Pro tip: Read the manual for secret moves.",
];

export interface LoadingScreenProps extends React.ComponentProps<"div"> {
  title?: string;
  tips?: string[];
  progress?: number;
  showPercentage?: boolean;
  tipInterval?: number;
  variant?: "default" | "fullscreen";
  autoProgress?: boolean;
  autoProgressDuration?: number;
}

export default function LoadingScreen({
  className,
  title = "LOADING",
  tips = DEFAULT_TIPS,
  progress = 0,
  showPercentage = true,
  tipInterval = 3000,
  variant = "default",
  autoProgress = false,
  autoProgressDuration = 5000,
  ...props
}: LoadingScreenProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [internalProgress, setInternalProgress] = useState(
    autoProgress ? 0 : progress
  );

  useEffect(() => {
    if (!autoProgress) {
      setInternalProgress(progress);
      return;
    }
    setInternalProgress(0);
    const step = 5;
    const steps = 100 / step;
    const intervalTime = autoProgressDuration / steps;
    const timer = setInterval(() => {
      setInternalProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);
    return () => clearInterval(timer);
  }, [autoProgress, autoProgressDuration, progress]);

  useEffect(() => {
    if (tips.length === 0) return;
    const tipTimer = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, tipInterval);
    return () => clearInterval(tipTimer);
  }, [tips, tipInterval]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  const isFullscreen = variant === "fullscreen";
  const displayProgress = autoProgress ? internalProgress : progress;
  const isDone = displayProgress >= 100;

  const content = (
    <div className="relative flex flex-col items-center justify-center gap-8 p-8">
      {/* Pixel corner brackets */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        <span className="absolute -left-2 -top-2 h-6 w-6 border-l-4 border-t-4 border-primary/60" />
        <span className="absolute -right-2 -top-2 h-6 w-6 border-r-4 border-t-4 border-primary/60" />
        <span className="absolute -bottom-2 -left-2 h-6 w-6 border-b-4 border-l-4 border-primary/60" />
        <span className="absolute -bottom-2 -right-2 h-6 w-6 border-b-4 border-r-4 border-primary/60" />
      </div>

      {/* Title */}
      <div className="flex flex-col items-center gap-2">
        <h2
          className={cn(
            "retro text-2xl md:text-3xl text-center tracking-[0.25em] text-foreground",
            isDone ? "animate-none" : "animate-pulse"
          )}
        >
          {title}
          <span
            className={cn(
              "ml-1 inline-block text-primary",
              showCursor ? "opacity-100" : "opacity-0"
            )}
          >
            ▮
          </span>
        </h2>
        <span
          className={cn(
            "retro text-[0.625rem] tracking-[0.4em] text-muted-foreground",
            isDone ? "text-primary" : "animate-pulse"
          )}
        >
          {isDone ? "COMPLETE" : "PLEASE WAIT"}
        </span>
      </div>

      {/* Progress section */}
      <div className="w-full max-w-md space-y-2">
        {showPercentage && (
          <div className="flex justify-end">
            <span
              className={cn(
                "retro text-xs text-muted-foreground tabular-nums",
                isDone && "text-primary"
              )}
            >
              {Math.round(displayProgress)}%
            </span>
          </div>
        )}
        <div
          className={cn(
            "rounded-sm border-2 p-1.5",
            isDone
              ? "border-primary/50 bg-primary/5"
              : "border-foreground/10 bg-muted"
          )}
        >
          <Progress
            value={displayProgress}
            variant="retro"
            progressBg="bg-primary"
            className="h-4"
          />
        </div>
        <div
          aria-hidden
          className="flex justify-between px-1 pt-1 text-[0.5rem] leading-none text-muted-foreground/60"
        >
          {Array.from({ length: 11 }).map((_, i) => (
            <span key={i}>▮</span>
          ))}
        </div>
      </div>

      {/* Tips section */}
      {tips.length > 0 && (
        <div className="w-full max-w-md min-h-16 flex items-center justify-center">
          <p
            key={currentTipIndex}
            className="retro text-[0.625rem] md:text-xs text-center text-muted-foreground leading-relaxed animate-pulse"
          >
            <span className="text-primary">▸ </span>
            {tips[currentTipIndex]}
          </p>
        </div>
      )}
    </div>
  );

  if (isFullscreen) {
    return (
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center overflow-hidden",
          "bg-background",
          className
        )}
        {...props}
      >
        {/* CRT scanlines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.8) 0px, rgba(0,0,0,0.8) 1px, transparent 1px, transparent 3px)",
          }}
        />
        {/* Vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 55%, rgba(0,0,0,0.22))",
          }}
        />
        <div className="relative z-10 w-full max-w-lg px-4">{content}</div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      {content}
    </div>
  );
}
