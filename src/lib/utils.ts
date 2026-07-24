// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names efficiently */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
