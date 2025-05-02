// src/utils/classNames.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// This function merges Tailwind classes intelligently, handling conflicts.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}