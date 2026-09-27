import { describe, it, expect } from 'vitest'
import {
  calculerCote, devoirConcerneEtudiant, baremeDevoir, estNotee, estACorriger, formaterNote, mentionDe,
} from '@/lib/cotes'
import { codePromotion, promotionCorrespond } from '@/lib/promotion'

const maintenant = new Date('2026-06-15T12:00:00Z')
const etu = { id: 'e1', coursIds: ['c1', 'c2'], faculteId: 'f1', classe: 'L2', dateCreation: '2026-01-01T00:00:00Z' }
const coursList = [{ id: 'c1' }, { id: 'c2' }, { id: 'c3' }]

const devoir = (id: string, o: any = {}): any => ({
  id, titre: id, consignes: '', coursId: 'c1', faculteId: 'f1', promotionId: 'L2',
  dateLimit: '2026-06-01T23:59:59Z', createdBy: 'p1', dateCreation: '2026-05-01', actif: true,
  type: 'qcm_chapitre', ...o,
})
const copie = (devoirId: string, o: any = {}): any => ({
  id: `s-${devoirId}`, devoirId, etudiantId: 'e1', dateSoumission: '2026-05-20', statut: 'soumis', ...o,
})
const seance = (id: string, coursId: string | undefined, etudiants: [string, boolean][]): any => ({
  id, titre: id, date: '2026-05-01', createdBy: 'p1', coursId,
  etudiants: etudiants.map(([etudiantId, present]) => ({ etudiantId, present })),
})

describe('Promotion', () => {
  it('ramène une saisie libre à son code', () => {
    expect(codePromotion('L1 Comptabilité')).toBe('L1')
    expect(codePromotion(' m2 ')).toBe('M2')
    expect(codePromotion('L12')).toBe('')
    expect(codePromotion('Licence')).toBe('')
  })
  it('« L1 » cible un étudiant saisi « L1 Comptabilité », pas un « L2 »', () => {
    expect(promotionCorrespond('L1', 'L1 Comptabilité')).toBe(true)
    expect(promotionCorrespond('L1', 'L2')).toBe(false)
  })
  it('sans cible, ou sans promotion connue de l\'étudiant : pas de filtre', () => {
    expect(promotionCorrespond('', 'L2')).toBe(true)
    expect(promotionCorrespond('L1', '')).toBe(true)
  })
})

describe('Copies et barèmes', () => {
  it('un devoir de chapitre est noté sur 20, un devoir classique sur 10', () => {
    expect(baremeDevoir({ type: 'qcm_chapitre' })).toBe(20)
    expect(baremeDevoir({ type: 'qcm_cas' })).toBe(20)
    expect(baremeDevoir({ type: 'theorique' })).toBe(10)
  })
  it('une copie portant une note est notée, même restée au statut « soumis »', () => {
    expect(estNotee(copie('d', { note: 12 }))).toBe(true)
    expect(estACorriger(copie('d', { note: 12 }))).toBe(false)
    expect(estACorriger(copie('d'))).toBe(true)
  })
  it('affiche la note avec le barème de son devoir', () => {
    expect(formaterNote(7.5, 10)).toBe('7,5/10')
    expect(formaterNote(14, 20)).toBe('14/20')
  })
})

describe('Destinataires d\'un devoir', () => {
  it('écarte un devoir d\'une autre promotion, d\'un cours non suivi ou masqué', () => {
    expect(devoirConcerneEtudiant(devoir('a'), etu, coursList)).toBe(true)
    expect(devoirConcerneEtudiant(devoir('b', { promotionId: 'L1' }), etu, coursList)).toBe(false)
    expect(devoirConcerneEtudiant(devoir('c', { coursId: 'c3' }), etu, coursList)).toBe(false)
    expect(devoirConcerneEtudiant(devoir('d', { actif: false }), etu, coursList)).toBe(false)
  })
})

describe('Cote de présence', () => {
  const seances = [
    seance('s1', 'c1', [['e1', true], ['e2', true]]),
    seance('s2', 'c1', [['e1', false], ['e2', true]]),
    seance('s3', 'c2', [['e1', true]]),
    seance('s4', 'c3', [['e2', true]]),          // l'étudiant n'y figure pas
    seance('s5', 'c3', [['e1', true]]),          // ancienne feuille : cours non suivi
  ]
  it('ne compte que les séances où l\'étudiant figure, dans ses cours : 2 présences sur 3', () => {
    const c = calculerCote({ etudiant: etu, seances, devoirs: [], soumissions: [], coursList, maintenant })
    expect(c.seances).toBe(3)
    expect(c.presences).toBe(2)
    expect(c.cotePresence).toBe(3.33)
  })
  it('une séance sans cours (antérieure à la règle) compte encore', () => {
    const c = calculerCote({ etudiant: etu, seances: [seance('s0', undefined, [['e1', false]])], devoirs: [], soumissions: [], coursList, maintenant })
    expect(c.seances).toBe(1)
    expect(c.cotePresence).toBe(0)
  })
  it('par cours : 1 présence sur 2 en c1, soit 2,5/5', () => {
    const c = calculerCote({ etudiant: etu, seances, devoirs: [], soumissions: [], coursList, maintenant, coursId: 'c1' })
    expect(c.seances).toBe(2)
    expect(c.cotePresence).toBe(2.5)
  })
})

describe('Cote des devoirs', () => {
  const devoirs = [
    devoir('noteSur20'),                                             // 15/20
    devoir('classique', { type: 'theorique' }),                      // 6/10
    devoir('nonRendu'),                                              // échu, rien rendu : 0
    devoir('ouvert', { dateLimit: '2026-07-01T23:59:59Z' }),         // pas encore dû
    devoir('aCorriger'),                                             // rendu, pas noté
    devoir('avantInscription', { dateLimit: '2025-12-01T23:59:59Z' }), // clos avant le compte
    devoir('autrePromo', { promotionId: 'L1' }),                     // ne le concerne pas
  ]
  const soumissions = [
    copie('noteSur20', { note: 15 }),       // statut resté « soumis » : ancienne copie auto-corrigée
    copie('classique', { note: 6, statut: 'note' }),
    copie('aCorriger'),
  ]
  it('compte les notes sur leur barème et le devoir non rendu à zéro', () => {
    const c = calculerCote({ etudiant: etu, seances: [], devoirs, soumissions, coursList, maintenant })
    expect(c.devoirsNotes).toBe(2)
    expect(c.devoirsNonRendus).toBe(1)
    expect(c.devoirsACorriger).toBe(1)
    // (0,75 + 0,6 + 0) / 3 = 0,45 → 2,25/5 et 9/20
    expect(c.coteDevoirs).toBe(2.25)
    expect(c.moyenneDevoirs).toBe(9)
  })
  it('sans devoir compté, pas de cote devoirs ni de total', () => {
    const c = calculerCote({ etudiant: etu, seances: [seance('s', 'c1', [['e1', true]])], devoirs: [devoir('ouvert', { dateLimit: '2026-07-01' })], soumissions: [], coursList, maintenant })
    expect(c.cotePresence).toBe(5)
    expect(c.coteDevoirs).toBeNull()
    expect(c.total).toBeNull()
    expect(c.mention).toBeNull()
  })
  it('total sur 10 et mention quand les deux parts existent', () => {
    const c = calculerCote({
      etudiant: etu, seances: [seance('s', 'c1', [['e1', true]])],
      devoirs: [devoir('a')], soumissions: [copie('a', { note: 16 })], coursList, maintenant,
    })
    expect(c.total).toBe(9)
    expect(c.mention).toBe('Excellent')
    expect(mentionDe(5.5)).toBe('Satisfaisant')
    expect(mentionDe(4.99)).toBe('Insuffisant')
  })
})
