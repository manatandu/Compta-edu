import { describe, it, expect } from 'vitest'
import {
  corrigerQCMChapitre, corrigerQCMClassique, partieQCMSur10, borneScoreCas, motifRefus, promotionCorrespond,
} from '../../functions/src/correction'
import { promotionCorrespond as promotionClient } from '@/lib/promotion'

const q = (id: string, bonne: string) => ({ id, reponseCorrecte: bonne })

describe('Correction serveur : QCM de chapitre', () => {
  it('7 bonnes réponses sur 8 : 17,5/20, avec le détail par question', () => {
    const questions = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(id => q(id, 'x'))
    const reponses = Object.fromEntries(questions.map(({ id }) => [id, id === 'h' ? 'y' : 'x']))
    const r = corrigerQCMChapitre(questions, reponses)
    expect(r.nbCorrectes).toBe(7)
    expect(r.note20).toBe(17.5)
    expect(r.details.find(d => d.qId === 'h')).toEqual({ qId: 'h', choix: 'y', correct: false })
  })
  it('arrondit au centième : 2 sur 3 donne 13,33/20', () => {
    expect(corrigerQCMChapitre([q('a', '1'), q('b', '1'), q('c', '1')], { a: '1', b: '1', c: '2' }).note20).toBe(13.33)
  })
  it('une réponse absente compte faux', () => {
    expect(corrigerQCMChapitre([q('a', '1')], {}).nbCorrectes).toBe(0)
  })
  it('partie QCM d\'un devoir « QCM + cas » : 3 sur 5 donne 6/10', () => {
    expect(partieQCMSur10(3, 5)).toBe(6)
    expect(partieQCMSur10(0, 0)).toBe(0)
  })
})

describe('Correction serveur : QCM classique et cas pratiques', () => {
  it('2 bonnes réponses sur 3 : 6,7/10', () => {
    const r = corrigerQCMClassique([{ bonneReponse: 0 }, { bonneReponse: 2 }, { bonneReponse: 1 }], [0, 2, 0])
    expect(r.score).toBe(2)
    expect(r.note10).toBe(6.7)
    expect(r.details).toEqual([true, true, false])
  })
  it('le score d\'un cas est un entier borné au barème', () => {
    expect(borneScoreCas(7.6, 5)).toBe(5)
    expect(borneScoreCas(-3, 5)).toBe(0)
    expect(borneScoreCas(3.4, 5)).toBe(3)
  })
})

describe('Correction serveur : droit de rendre le devoir', () => {
  const maintenant = new Date('2026-06-15T12:00:00Z')
  const etu = { role: 'etudiant', actif: true, coursIds: ['c1'], faculteId: 'f1', classe: 'L2' }
  const devoir = { actif: true, type: 'qcm_chapitre', coursId: 'c1', faculteId: 'f1', promotionId: 'L2', dateLimit: '2026-06-30T23:59:59Z' }

  it('accepte l\'étudiant inscrit, dans les délais', () => {
    expect(motifRefus(devoir, etu, 'L2', maintenant)).toBeNull()
  })
  it('donne le motif de chaque refus', () => {
    expect(motifRefus(devoir, { ...etu, role: 'professeur' }, 'L2', maintenant)).toBe('compte')
    expect(motifRefus(devoir, { ...etu, actif: false }, 'L2', maintenant)).toBe('compte')
    expect(motifRefus({ ...devoir, actif: false }, etu, 'L2', maintenant)).toBe('devoir-masque')
    expect(motifRefus({ ...devoir, type: 'theorique' }, etu, 'L2', maintenant)).toBe('type')
    expect(motifRefus({ ...devoir, coursId: 'c9' }, etu, 'L2', maintenant)).toBe('cours')
    expect(motifRefus({ ...devoir, faculteId: 'f2' }, etu, 'L2', maintenant)).toBe('faculte')
    expect(motifRefus(devoir, etu, 'L1', maintenant)).toBe('promotion')
    expect(motifRefus({ ...devoir, promotionId: 'M1' }, etu, 'L2', maintenant)).toBe('promotion')
    expect(motifRefus({ ...devoir, dateLimit: '2026-06-01T23:59:59Z' }, etu, 'L2', maintenant)).toBe('delai')
  })
  it('une date limite sans heure laisse toute la journée', () => {
    expect(motifRefus({ ...devoir, dateLimit: '2026-06-15' }, etu, 'L2', maintenant)).toBeNull()
    expect(motifRefus({ ...devoir, dateLimit: '2026-06-14' }, etu, 'L2', maintenant)).toBe('delai')
  })
  it('même règle de promotion que le site', () => {
    for (const [c, e] of [['L1', 'L1 Comptabilité'], ['L1', 'L2'], ['', 'L2'], ['L1', ''], ['m2 ', 'M2'], ['Licence', 'L1']]) {
      expect(promotionCorrespond(c, e)).toBe(promotionClient(c, e))
    }
  })
})
