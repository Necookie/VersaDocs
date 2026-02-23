import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind classes conditionally.
 * Combines clsx for conditional classes and tailwind-merge to resolve conflicts.
 * 
 * @param inputs - Array of class values (strings, objects, etc.)
 * @returns A single merged string of Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
