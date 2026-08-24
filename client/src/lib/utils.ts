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

// Année académique en cours au format "AAAA-AAAA". La rentrée en RDC se situe
// en septembre : d'août inclus à décembre, on est dans l'année qui commence
// cette même année civile ; de janvier à juillet, dans celle commencée l'année
// civile précédente. Remplace les défauts codés en dur ("2025-2026") qui se
// périment silencieusement chaque rentrée.
export function anneeAcademiqueEnCours(): string {
  const maintenant = new Date()
  const annee = maintenant.getFullYear()
  const debut = maintenant.getMonth() >= 7 ? annee : annee - 1  // getMonth() : 7 = août
  return `${debut}-${debut + 1}`
}
