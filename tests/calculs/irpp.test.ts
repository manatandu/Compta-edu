import { describe, it, expect } from 'vitest'
import { calculerBaremeIRPP, appliquerReductionEtPlafondIRPP, arrondiCentaineFC, qualifier663, BAREME_MENSUEL_IRPP } from '@/lib/irpp'

// Loi n° 23/053, art. 118 : barème annuel 3 % / 15 % / 30 % / 40 %, bornes 1 944 000,
// 21 600 000 et 43 200 000 FC ; plafond de 30 % du revenu imposable ; art. 150 : arrondi.
describe('IRPP - revenus salariaux (barème mensuel)', () => {
  it('les bornes mensuelles sont le douzième des bornes annuelles', () => {
    expect(BAREME_MENSUEL_IRPP.map(t => t.max).slice(0, 3)).toEqual([1_944_000 / 12, 21_600_000 / 12, 43_200_000 / 12])
    expect(BAREME_MENSUEL_IRPP.map(t => t.taux)).toEqual([0.03, 0.15, 0.30, 0.40])
  })

  it('1 000 000 FC : 3 % sur 162 000 puis 15 % sur 838 000', () => {
    expect(calculerBaremeIRPP(1_000_000).iprBrut).toBeCloseTo(162_000 * 0.03 + 838_000 * 0.15, 6)
  })

  it('5 000 000 FC : les quatre tranches, sans plafonnement', () => {
    const { iprBrut, iprMax } = calculerBaremeIRPP(5_000_000)
    expect(iprBrut).toBeCloseTo(4_860 + 245_700 + 540_000 + 560_000, 6)
    expect(appliquerReductionEtPlafondIRPP(iprBrut, iprMax, 0).plafonne).toBe(false)
  })

  it('50 000 000 FC : l\'impôt est ramené à 30 % du revenu imposable', () => {
    const { iprBrut, iprMax } = calculerBaremeIRPP(50_000_000)
    const r = appliquerReductionEtPlafondIRPP(iprBrut, iprMax, 0)
    expect(r.plafonne).toBe(true)
    expect(r.iprFinal).toBe(15_000_000)
  })

  it('la réduction pour charges de famille s\'impute avant le plafond', () => {
    const r = appliquerReductionEtPlafondIRPP(130_560, 300_000, 130_560 * 0.02 * 3)
    expect(r.iprFinal).toBeCloseTo(130_560 * 0.94, 6)
  })

  it('arrondi à la centaine la plus proche, 50 FC vers le haut (art. 150)', () => {
    expect(arrondiCentaineFC(130_560)).toBe(130_600)
    expect(arrondiCentaineFC(130_549)).toBe(130_500)
    expect(arrondiCentaineFC(130_550)).toBe(130_600)
    expect(arrondiCentaineFC(130_549.6)).toBe(130_600)
  })

  it('663 : logement exonéré dans la limite de 30 % de la rémunération, le reste imposable', () => {
    const r = qualifier663([
      { code: '6631', montant: '400000' },   // plafond 300 000 sur 1 000 000
      { code: '6634', montant: '50000' },    // transport : exonéré
      { code: '6632', montant: '80000' },    // représentation : imposable
    ], 1_000_000)
    expect(r).toEqual({ exempte: 350_000, imposable: 180_000 })
  })
})
