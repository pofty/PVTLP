import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with the help of `clsx`.
 *
 * @param inputs - The classes to merge.
 * @returns The merged classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}