import { describe, it, expect } from 'vitest'
import { calculerDecompte, genererEcritureEngagementFournisseur, genererEcritureEngagementClient } from '@/lib/useFacturesDevises'

const facture = (escompteConditionnel: boolean): any => ({
  tiers: 'T', reference: 'F1', dateFacture: '2026-03-01', coursEngagement: 2_800, tauxTVA: 0.16,
  lignes: [{ quantite: 10, prixUnitaire: 100 }],
  reductionsCommerciales: [{ libelle: 'Remise', pct: 10 }, { libelle: 'Rabais', pct: 5 }],
  escomptePct: 2, escompteConditionnel,
  emballages: [{ quantite: 2, prixUnitaireConsigne: 5 }],
  avanceRecue: 100,
})
const equilibre = (l: { debit: number; credit: number }[]) =>
  expect(l.reduce((s, x) => s + x.debit, 0)).toBeCloseTo(l.reduce((s, x) => s + x.credit, 0), 2)

describe('Factures (cascade commerciale, escompte, TVA, emballages, avance)', () => {
  it('cascade : remises successives puis escompte, TVA sur le net financier', () => {
    const d = calculerDecompte(facture(false))
    expect(d.netCommercial).toBe(855)          // 1000 × 0,90 × 0,95
    expect(d.escompte).toBeCloseTo(17.1, 2)
    expect(d.baseTVA).toBeCloseTo(837.9, 2)
    expect(d.tva).toBeCloseTo(134.06, 2)
  })

  it('escompte conditionnel : la TVA porte sur le net commercial', () => {
    expect(calculerDecompte(facture(true)).baseTVA).toBe(855)
  })

  it('les écritures d\'engagement sont équilibrées, chez le vendeur comme chez l\'acheteur', () => {
    for (const cond of [false, true]) {
      equilibre(genererEcritureEngagementFournisseur(facture(cond)).lignes)
      equilibre(genererEcritureEngagementClient(facture(cond)).lignes)
    }
  })
})
