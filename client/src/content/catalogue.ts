import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// CATALOGUE DES CHAPITRES
//
// Point d'entrée unique reliant un module et un numéro de chapitre au fichier
// de données correspondant. Les chargeurs sont des imports différés : chaque
// chapitre reste un fragment de code distinct, comme lorsqu'il s'agissait d'une
// page React, donc aucun alourdissement du chargement initial.
//
// Ajouter un chapitre au logiciel se réduit désormais à écrire son fichier de
// contenu et à l'inscrire ici. Aucune route ni aucun composant à créer.
// ─────────────────────────────────────────────────────────────────────────────

export type ChargeurChapitre = () => Promise<{ default: Chapitre }>

export const CATALOGUE: Record<string, Record<number, ChargeurChapitre>> = {
  ue1: {
    1: () => import('./ue1/chapitre-1'),
    2: () => import('./ue1/chapitre-2'),
    3: () => import('./ue1/chapitre-3'),
    4: () => import('./ue1/chapitre-4'),
    5: () => import('./ue1/chapitre-5'),
    6: () => import('./ue1/chapitre-6'),
    7: () => import('./ue1/chapitre-7'),
    8: () => import('./ue1/chapitre-8'),
    9: () => import('./ue1/chapitre-9'),
    10: () => import('./ue1/chapitre-10'),
  },
  ue2: {
    1: () => import('./ue2/chapitre-1'),
    2: () => import('./ue2/chapitre-2'),
    3: () => import('./ue2/chapitre-3'),
    4: () => import('./ue2/chapitre-4'),
    5: () => import('./ue2/chapitre-5'),
    6: () => import('./ue2/chapitre-6'),
    7: () => import('./ue2/chapitre-7'),
    8: () => import('./ue2/chapitre-8'),
    9: () => import('./ue2/chapitre-9'),
    10: () => import('./ue2/chapitre-10'),
    11: () => import('./ue2/chapitre-11'),
  },
  ue5: {
    1: () => import('./ue5/chapitre-1'),
    2: () => import('./ue5/chapitre-2'),
    3: () => import('./ue5/chapitre-3'),
    4: () => import('./ue5/chapitre-4'),
    5: () => import('./ue5/chapitre-5'),
    6: () => import('./ue5/chapitre-6'),
    7: () => import('./ue5/chapitre-7'),
    8: () => import('./ue5/chapitre-8'),
    9: () => import('./ue5/chapitre-9'),
    10: () => import('./ue5/chapitre-10'),
  },
  ue13: {
    1: () => import('./ue13/chapitre-1'),
  },
}

/** Les modules dont les chapitres passent par le moteur de rendu commun. */
export const MODULES_MIGRES = Object.keys(CATALOGUE)

export function chargeurDe(ue: string, numero: number): ChargeurChapitre | undefined {
  return CATALOGUE[ue]?.[numero]
}
