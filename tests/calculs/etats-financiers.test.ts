import { describe, it, expect } from 'vitest'
import { calculerSoldes, calculerEtatsFinanciers } from '@/lib/etatsFinanciers'

// Écritures d'un exercice complet, équilibrées (total débit = total crédit).
const E = (numeroCompte: string, debit: number, credit: number) => ({ numeroCompte, debit, credit })
const ecritures = [
  // Ouverture : capital souscrit 10 M dont 2 M non appelés, prime 1 M
  E('1013', 0, 10_000_000), E('105', 0, 1_000_000), E('109', 2_000_000, 0), E('521', 9_000_000, 0),
  // Achats et ventes de marchandises
  E('601', 5_000_000, 0), E('401', 0, 5_000_000),
  E('411', 8_000_000, 0), E('701', 0, 8_000_000),
  // Stock final en hausse : variation créditrice
  E('311', 1_000_000, 0), E('6031', 0, 1_000_000),
  // Matériel et son amortissement
  E('2441', 3_000_000, 0), E('521', 0, 3_000_000),
  E('6813', 600_000, 0), E('2844', 0, 600_000),
  // Fonds commercial et sa dépréciation
  E('215', 2_000_000, 0), E('521', 0, 2_000_000),
  E('6914', 200_000, 0), E('2915', 0, 200_000),
  // Salaires dus
  E('661', 1_000_000, 0), E('422', 0, 1_000_000),
]

describe('Bilan et compte de résultat (Système normal)', () => {
  const { actif, passif, cr, resultatNet } = calculerEtatsFinanciers(calculerSoldes(ecritures))

  it('le résultat net vaut produits moins charges', () => {
    expect(resultatNet).toBe(8_000_000 - 5_000_000 + 1_000_000 - 600_000 - 200_000 - 1_000_000)
  })

  it('le compte de résultat retrouve le même résultat (XI)', () => {
    expect(cr.get('XI')!.montant).toBe(resultatNet)
  })

  it('une variation de stock créditrice augmente la marge commerciale', () => {
    expect(cr.get('RB')!.montant).toBe(-1_000_000)
    expect(cr.get('XA')!.montant).toBe(8_000_000 - 5_000_000 + 1_000_000)
  })

  it('le capital ne reprend ni la prime ni le capital non appelé', () => {
    expect(passif.get('CA')).toBe(10_000_000)
    expect(passif.get('CD')).toBe(1_000_000)
    expect(passif.get('CB')).toBe(-2_000_000)
  })

  it('les amortissements et dépréciations viennent en déduction du bon poste', () => {
    expect(actif.get('AM')).toEqual({ brut: 3_000_000, corr: 600_000, net: 2_400_000 })
    expect(actif.get('AG')).toEqual({ brut: 2_000_000, corr: 200_000, net: 1_800_000 })
  })

  it('le bilan est équilibré : total actif = total passif', () => {
    expect(actif.get('BZ')!.net).toBe(17_200_000)
    expect(passif.get('DZ')).toBe(17_200_000)
  })

  it('un compte bilatéral va à l\'actif ou au passif selon le sens de son solde', () => {
    const s = calculerEtatsFinanciers(calculerSoldes([E('4441', 300_000, 0), E('4452', 0, 100_000), E('521', 0, 200_000)]))
    expect(s.actif.get('BJ')!.brut).toBe(300_000)
    expect(s.passif.get('DK')).toBe(100_000)
    expect(s.passif.get('DR')).toBe(200_000)
  })
})
