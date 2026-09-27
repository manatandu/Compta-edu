import { describe, it, expect } from 'vitest'
import { getCoeffDegressif, calculerLineaire, calculerDegressif, calculerExceptionnel } from '@/lib/amortissements'

const annuites = (l: { annuite: number }[]) => l.map(x => x.annuite)
const total = (l: { annuite: number }[]) => l.reduce((s, x) => s + x.annuite, 0)

describe('Amortissements fiscaux (loi n° 23/053, art. 30 à 38)', () => {
  it('coefficients du dégressif : exclu sous 4 ans, 1,5 / 2 / 2,5 (art. 32 et 33)', () => {
    expect([3, 4, 5, 6, 7, 10].map(getCoeffDegressif)).toEqual([0, 1.5, 2, 2, 2.5, 2.5])
  })

  it('linéaire mis en service en janvier : annuités constantes', () => {
    expect(annuites(calculerLineaire(1_200_000, 5, 1))).toEqual([240_000, 240_000, 240_000, 240_000, 240_000])
  })

  it('linéaire mis en service en mars : prorata de 10/12 puis solde en dernière année (art. 34)', () => {
    const l = calculerLineaire(1_200_000, 5, 3)
    expect(l[0].annuite).toBe(200_000)
    expect(l).toHaveLength(6)
    expect(l[5].annuite).toBe(40_000)
    expect(total(l)).toBe(1_200_000)
  })

  it('dégressif sur 5 ans (taux 40 %) avec bascule en linéaire (art. 35)', () => {
    const l = calculerDegressif(1_000_000, 5, 1)
    expect(annuites(l)).toEqual([400_000, 240_000, 144_000, 108_000, 108_000])
    expect(total(l)).toBe(1_000_000)
  })

  it('exceptionnel : 60 % la première année, puis dégressif sur la valeur résiduelle (art. 38)', () => {
    const l = calculerExceptionnel(1_000_000, 5, 1)
    expect(annuites(l)).toEqual([600_000, 160_000, 96_000, 72_000, 72_000])
    expect(total(l)).toBe(1_000_000)
  })
})
