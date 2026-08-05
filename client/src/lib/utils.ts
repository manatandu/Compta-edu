import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMontant(n: number): string {
  if (n === 0) return "0"
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(n)
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
}
