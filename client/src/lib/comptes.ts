// Accès au plan comptable OHADA, séparé de lib/db.ts pour que le fichier
// du plan (85 Ko) ne soit téléchargé qu'avec les pages qui l'utilisent.
import { PLAN_COMPTABLE_OHADA } from './planComptable'
import type { CompteOHADA } from './db'

export function getComptes(): CompteOHADA[] {
  return PLAN_COMPTABLE_OHADA
}

export function getCompteByNumero(num: string): CompteOHADA | undefined {
  return PLAN_COMPTABLE_OHADA.find(c => c.numero === num)
}
