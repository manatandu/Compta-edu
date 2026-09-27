import { describe, it, expect } from 'vitest'
import { calculerAmortissement, genererEcritureEcheance, calculerEcartConversion } from '@/lib/useEmprunts'

const base = { capital: 1_000_000, tauxAnnuel: 0.10, dureeAnnees: 3, dateMiseADisposition: '2026-01-01' }
const somme = (l: { debit: number; credit: number }[]) => [l.reduce((s, x) => s + x.debit, 0), l.reduce((s, x) => s + x.credit, 0)]

describe('Emprunts', () => {
  it('annuités constantes : a = C·i / (1 - (1+i)^-n), capital intégralement remboursé', () => {
    const l = calculerAmortissement({ ...base, methode: 'annuites_constantes' })
    const a = 1_000_000 * 0.1 / (1 - Math.pow(1.1, -3))
    l.forEach(x => expect(x.annuite).toBeCloseTo(a, 4))
    expect(l.reduce((s, x) => s + x.amortCapital, 0)).toBeCloseTo(1_000_000, 4)
    expect(l[2].capitalFin).toBe(0)
  })

  it('amortissement constant : intérêts sur le capital restant dû', () => {
    const l = calculerAmortissement({ ...base, methode: 'constant' })
    expect(l.map(x => Math.round(x.interets))).toEqual([100_000, 66_667, 33_333])
  })

  it('in fine : intérêts seuls, capital au terme', () => {
    const l = calculerAmortissement({ ...base, methode: 'in_fine' })
    expect(l.map(x => x.annuite)).toEqual([100_000, 100_000, 1_100_000])
  })

  it('échéance en devise : écriture équilibrée, perte de change réalisée en 676', () => {
    const emprunt: any = { ...base, methode: 'in_fine', coursEntree: 2_800, preteur: 'P', reference: 'R' }
    const ligne = calculerAmortissement(emprunt)[2]
    const e = genererEcritureEcheance(emprunt, ligne, 2_900)
    const [d, c] = somme(e.lignes)
    expect(d).toBeCloseTo(c, 2)
    expect(e.lignes.find(l => l.compte === '676')!.debit).toBe(1_000_000 * 100)
  })

  it('écart de conversion calculé sur la valeur d\'origine', () => {
    expect(calculerEcartConversion({ coursEntree: 2_800 }, 500, 2_850)).toMatchObject({ ecart: 25_000, sens: 'perte' })
  })
})
