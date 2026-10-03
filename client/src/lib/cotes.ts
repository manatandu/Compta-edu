// ─────────────────────────────────────────────────────────────────────────────
// COTES : UNE SEULE RÈGLE DE CALCUL
//
// La cote d'un étudiant est notée sur 10 : 5 points pour l'assiduité aux
// séances, 5 points pour les devoirs. Elle était calculée à trois endroits
// (Espace pédagogique, tableau de bord de l'étudiant, liste des devoirs de
// chapitre), chacun à sa manière, et affichait donc trois chiffres différents
// pour le même étudiant. Ce module est désormais la seule source du calcul.
//
// Assiduité : une séance compte pour l'étudiant qui figure sur sa feuille de
// présence et suit le cours de la séance. Une séance d'un autre cours n'entre
// pas dans son dénominateur.
//
// Devoirs : chaque devoir qui s'adresse à l'étudiant compte une fois,
//   - noté : sa note rapportée à son barème ;
//   - délai échu sans copie rendue : zéro, faute de quoi ne rien rendre
//     rapportait plus que rendre un travail faible ;
//   - copie rendue en attente de correction, ou délai non encore échu : pas
//     encore compté.
//
// Barème : les devoirs créés depuis un chapitre (QCM, QCM avec cas
// pratiques) sont notés sur 20 depuis leur création ; les devoirs classiques,
// corrigés à la main ou par le QCM du tableau de bord, sur 10. La note est
// toujours lue avec le barème de son devoir.
// ─────────────────────────────────────────────────────────────────────────────
import type { Cours, Devoir, DevoirType, Presence, Soumission } from './db'
import { promotionCorrespond } from './promotion'
import { corrigerQCMChapitre, corrigerQCMClassique, partieQCMSur10 } from './correctionQCM'

// ─── Barème et état d'une copie ──────────────────────────────────────────────

export const TYPES_DEVOIR_CHAPITRE: readonly DevoirType[] = ['qcm_chapitre', 'qcm_cas', 'redaction']

export function estDevoirChapitre(d: Pick<Devoir, 'type'> | null | undefined): boolean {
  return !!d && TYPES_DEVOIR_CHAPITRE.includes(d.type)
}

// Nom du type de devoir, tel qu'on l'affiche.
export const LIBELLES_TYPE_DEVOIR: Record<DevoirType, string> = {
  pratique: 'Pratique (journal)', theorique: 'Théorique', mixte: 'Mixte',
  qcm: 'QCM', qcm_chapitre: 'QCM de chapitre', qcm_cas: 'QCM + cas pratiques', redaction: 'Questions rédigées',
}

// Note maximale d'un devoir.
export function baremeDevoir(d: Pick<Devoir, 'type'> | null | undefined): 10 | 20 {
  return estDevoirChapitre(d) ? 20 : 10
}

// Une copie est notée dès qu'elle porte une note. Le statut seul ne suffit
// pas : jusqu'à ce correctif, l'enregistrement d'une copie remettait toujours
// le statut à « soumis », y compris pour un QCM corrigé automatiquement et
// déjà noté. Ces copies anciennes portent une note sous le statut « soumis ».
// Un QCM à corrigé séparé arrive sans note (correctionAuto) : il est noté
// d'office, sa note se calcule dès que le corrigé est lisible.
export function estNotee(s: Pick<Soumission, 'note' | 'correctionAuto'> | null | undefined): boolean {
  return !!s && ((typeof s.note === 'number' && Number.isFinite(s.note)) || s.correctionAuto === true)
}

// Corrigé du QCM pas encore lisible : étudiant avant la date limite.
export function corrigeQCMEnAttente(d: Partial<Pick<Devoir, 'corrigeQCMSepare' | 'corrigeQCMCharge'>> | null | undefined): boolean {
  return !!d?.corrigeQCMSepare && !d.corrigeQCMCharge
}

// Note d'une copie notée, à lire à la place de soumission.note. Pour un QCM
// corrigé automatiquement, elle est recalculée à partir des réponses de la
// copie et du corrigé du devoir : la note enregistrée par le navigateur de
// l'étudiant n'est pas crue sur parole. Les autres copies sont notées par
// l'enseignant, seul autorisé à écrire leur note (règles Firestore).
type DevoirCorrige = Pick<Devoir, 'type'> & Partial<Pick<Devoir, 'questions' | 'questionsChapitre' | 'corrigeQCMSepare' | 'corrigeQCMCharge'>>
export function noteDeCopie(s: Soumission | null | undefined, d: DevoirCorrige | null | undefined): number | null {
  if (!s || !estNotee(s)) return null
  if (corrigeQCMEnAttente(d) && d?.type === 'qcm_chapitre') return null
  if (d?.type === 'qcm_chapitre' && d.questionsChapitre?.length) {
    return corrigerQCMChapitre(d.questionsChapitre, s.reponsesQCMChapitre || {}).note20
  }
  if (d?.type === 'qcm' && d.questions?.length) {
    return corrigerQCMClassique(d.questions, s.reponsesQCM || []).note10
  }
  return s.note as number
}

// Partie QCM d'un devoir « QCM + cas pratiques », recalculée de même (sur 10).
export function partieQCMDeCopie(s: Soumission | null | undefined, d: DevoirCorrige | null | undefined): number | null {
  if (!s || d?.type !== 'qcm_cas' || !d.questionsChapitre?.length || corrigeQCMEnAttente(d)) return null
  const { nbCorrectes } = corrigerQCMChapitre(d.questionsChapitre, s.reponsesQCMChapitre || {})
  return partieQCMSur10(nbCorrectes, d.questionsChapitre.length)
}

// Copie rendue qui attend une note de l'enseignant.
export function estACorriger(s: Pick<Soumission, 'note' | 'correctionAuto'> | null | undefined): boolean {
  return !!s && !estNotee(s)
}

// « 4,25 » : deux décimales au plus, virgule décimale.
export function formaterNombre(x: number): string {
  return String(Math.round(x * 100) / 100).replace('.', ',')
}

// « 14/20 », « 7,5/10 » : la note avec le barème de son devoir.
export function formaterNote(note: number, bareme: number): string {
  return `${formaterNombre(note)}/${bareme}`
}

// ─── À qui s'adresse un devoir ───────────────────────────────────────────────

export interface ProfilEtudiantCote {
  id: string
  coursIds?: string[]
  faculteId?: string
  classe?: string
  dateCreation?: string
}

// Le devoir s'adresse-t-il à cet étudiant ? Même règle pour la liste de ses
// devoirs et pour sa cote : un devoir visible compte, un devoir invisible non.
export function devoirConcerneEtudiant(
  d: Devoir,
  etudiant: Pick<ProfilEtudiantCote, 'coursIds' | 'faculteId' | 'classe'>,
  coursList: Pick<Cours, 'id' | 'promotion'>[],
): boolean {
  if (!d.actif) return false
  if (!(etudiant.coursIds || []).includes(d.coursId)) return false
  if (d.faculteId && etudiant.faculteId && d.faculteId !== etudiant.faculteId) return false
  const cours = coursList.find(c => c.id === d.coursId)
  if (!promotionCorrespond(cours?.promotion, etudiant.classe)) return false
  if (!promotionCorrespond(d.promotionId, etudiant.classe)) return false
  return true
}

// ─── Calcul ──────────────────────────────────────────────────────────────────

export type EtatDevoir = 'note' | 'non_rendu' | 'a_corriger' | 'ouvert' | 'attente_corrige'

export interface LigneDevoirCote {
  devoir: Devoir
  soumission: Soumission | null
  etat: EtatDevoir
  bareme: 10 | 20
  // Part de la note maximale obtenue (0 à 1), pour les devoirs comptés.
  ratio: number | null
}

export type Mention = 'Excellent' | 'Bien' | 'Satisfaisant' | 'Insuffisant'

export interface Cote {
  seances: number           // séances où l'étudiant figure sur la feuille
  presences: number         // séances où il est marqué présent
  tauxPresence: number | null   // en %
  cotePresence: number | null   // sur 5
  devoirsNotes: number
  devoirsNonRendus: number  // délai échu sans copie : comptés zéro
  devoirsACorriger: number  // copies rendues, pas encore notées
  moyenneDevoirs: number | null // sur 20
  coteDevoirs: number | null    // sur 5
  total: number | null      // sur 10, seulement si les deux parts existent
  mention: Mention | null
  devoirs: LigneDevoirCote[]
}

export interface EntreeCalculCote {
  etudiant: ProfilEtudiantCote
  seances: Presence[]
  devoirs: Devoir[]
  soumissions: Soumission[]
  coursList: Pick<Cours, 'id' | 'promotion'>[]
  maintenant: Date
  // Limite le calcul à un cours : ses séances et ses devoirs.
  coursId?: string
}

const arrondi2 = (x: number) => Math.round(x * 100) / 100

export function mentionDe(total: number | null): Mention | null {
  if (total === null) return null
  if (total >= 8) return 'Excellent'
  if (total >= 6) return 'Bien'
  if (total >= 5) return 'Satisfaisant'
  return 'Insuffisant'
}

export function calculerCote(e: EntreeCalculCote): Cote {
  const { etudiant, maintenant, coursId } = e

  // Assiduité
  let seances = 0
  let presences = 0
  for (const s of e.seances) {
    if (coursId && s.coursId !== coursId) continue
    // Séance d'un cours que l'étudiant ne suit pas : les feuilles établies
    // avant ce correctif listaient tous les étudiants de l'enseignant.
    if (s.coursId && !(etudiant.coursIds || []).includes(s.coursId)) continue
    const ligne = s.etudiants?.find(x => x.etudiantId === etudiant.id)
    if (!ligne) continue
    seances++
    if (ligne.present) presences++
  }
  const cotePresence = seances > 0 ? arrondi2(5 * presences / seances) : null
  const tauxPresence = seances > 0 ? Math.round(100 * presences / seances) : null

  // Devoirs
  const inscritDepuis = etudiant.dateCreation ? new Date(etudiant.dateCreation).getTime() : null
  const lignes: LigneDevoirCote[] = []
  for (const d of e.devoirs) {
    if (coursId && d.coursId !== coursId) continue
    if (!devoirConcerneEtudiant(d, etudiant, e.coursList)) continue
    const limite = new Date(d.dateLimit).getTime()
    // Devoir clos avant la création du compte : l'étudiant n'a jamais pu le rendre.
    if (inscritDepuis !== null && Number.isFinite(limite) && limite < inscritDepuis) continue
    const soumission = e.soumissions.find(s => s.devoirId === d.id && s.etudiantId === etudiant.id) || null
    const bareme = baremeDevoir(d)
    let etat: EtatDevoir
    let ratio: number | null = null
    const note = noteDeCopie(soumission, d)
    if (soumission && estNotee(soumission) && note === null) {
      // QCM rendu dont le corrigé n'est publié qu'à la date limite
      etat = 'attente_corrige'
    } else if (soumission && estNotee(soumission)) {
      etat = 'note'
      ratio = Math.min(1, Math.max(0, (note as number) / bareme))
    } else if (soumission) {
      etat = 'a_corriger'
    } else if (maintenant.getTime() > limite) {
      etat = 'non_rendu'
      ratio = 0
    } else {
      etat = 'ouvert'
    }
    lignes.push({ devoir: d, soumission, etat, bareme, ratio })
  }
  const comptes = lignes.filter(l => l.ratio !== null)
  const sommeRatios = comptes.reduce((acc, l) => acc + (l.ratio as number), 0)
  const coteDevoirs = comptes.length > 0 ? arrondi2(5 * sommeRatios / comptes.length) : null
  const moyenneDevoirs = comptes.length > 0 ? arrondi2(20 * sommeRatios / comptes.length) : null

  const total = cotePresence !== null && coteDevoirs !== null ? arrondi2(cotePresence + coteDevoirs) : null

  return {
    seances, presences, tauxPresence, cotePresence,
    devoirsNotes: lignes.filter(l => l.etat === 'note').length,
    devoirsNonRendus: lignes.filter(l => l.etat === 'non_rendu').length,
    devoirsACorriger: lignes.filter(l => l.etat === 'a_corriger').length,
    moyenneDevoirs, coteDevoirs, total,
    mention: mentionDe(total),
    devoirs: lignes,
  }
}
