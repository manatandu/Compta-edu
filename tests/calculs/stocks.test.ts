import { describe, it, expect } from 'vitest'
import { calculerFicheCUMP, calculerFichePEPS, genererEcritures } from '@/lib/useStock'

const article: any = { qteInitiale: 100, cuInitial: 10, dateInitiale: '2026-01-01', typeCompte: '31' }
const mvts: any[] = [
  { type: 'entree', date: '2026-01-05', quantite: 100, cuSaisi: 12, libelle: 'Achat', numeroBon: '1' },
  { type: 'sortie', date: '2026-01-10', quantite: 150, libelle: 'Vente', numeroBon: '2' },
]

describe('Fiches de stock', () => {
  it('CUMP après chaque entrée : (1 000 + 1 200) / 200 = 11', () => {
    const l = calculerFicheCUMP(article, mvts)
    expect(l[1].stockCU).toBe(11)
    expect(l[2].sortieMontant).toBe(1_650)
    expect(l[2].stockMontant).toBe(550)
  })

  it('PEPS : la sortie épuise d\'abord la couche la plus ancienne', () => {
    const l = calculerFichePEPS(article, mvts)
    expect(l[2].sortieMontant).toBe(100 * 10 + 50 * 12)
    expect(l[2].stockMontant).toBe(50 * 12)
  })
})

describe('Écritures de stock', () => {
  it('montant arrondi au centime quand le CUMP est fractionnaire', () => {
    const ec = genererEcritures('u', 'a', { typeCompte: '31' } as any,
      { type: 'sortie', date: '2025-02-18', quantite: 7, libelle: 'Sortie', numeroBon: '1802' } as any, 10_000 / 3)
    // 7 × 3 333,333… = 23 333,333… → 23 333,33
    expect(ec[0].montant).toBe(23_333.33)
  })
})
