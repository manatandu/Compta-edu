// ─────────────────────────────────────────────────────────────────────────────
// CORRECTION DES QCM : règles de calcul, sans accès à Firestore
//
// Mêmes formules que celles appliquées jusqu'ici dans le navigateur de
// l'étudiant (DevoirChapitreEtudiant, DashboardEtudiant) : seul le lieu du
// calcul change. Testées par tests/calculs/correction-serveur.test.ts.
// ─────────────────────────────────────────────────────────────────────────────

export interface QuestionChapitre { id: string; reponseCorrecte: string }
export interface QuestionClassique { bonneReponse: number }
export interface DetailQuestion { qId: string; choix: string; correct: boolean }

const arrondi2 = (x: number) => Math.round(x * 100) / 100

// QCM de chapitre : une bonne réponse vaut un point, note ramenée sur 20.
export function corrigerQCMChapitre(questions: QuestionChapitre[], reponses: Record<string, string>) {
  const details: DetailQuestion[] = questions.map(q => ({
    qId: q.id, choix: reponses[q.id] || '', correct: reponses[q.id] === q.reponseCorrecte,
  }))
  const nbCorrectes = details.filter(d => d.correct).length
  const note20 = questions.length > 0 ? arrondi2(nbCorrectes / questions.length * 20) : 0
  return { details, nbCorrectes, note20 }
}

// Partie QCM d'un devoir « QCM + cas » : sur 10.
export function partieQCMSur10(nbCorrectes: number, total: number): number {
  return total > 0 ? arrondi2(nbCorrectes / total * 10) : 0
}

// QCM classique (ancien type « qcm ») : note sur 10, une décimale.
export function corrigerQCMClassique(questions: QuestionClassique[], reponses: number[]) {
  const details = questions.map((q, i) => reponses[i] === q.bonneReponse)
  const score = details.filter(Boolean).length
  const note10 = questions.length > 0 ? Math.round(score / questions.length * 10 * 10) / 10 : 0
  return { details, score, note10 }
}

// Score d'un cas pratique renvoyé par le correcteur : entier, borné au barème.
export function borneScoreCas(score: number, pointsMax: number): number {
  return Math.max(0, Math.min(pointsMax, Math.round(score)))
}

// Promotion : même règle que client/src/lib/promotion.ts. Pas de cible, ou
// promotion de l'étudiant inconnue : pas de filtre ; sinon codes identiques
// (« L1 Comptabilité » vaut L1).
const PROMOTIONS = ['L1', 'L2', 'L3', 'M1', 'M2']
function forme(v?: string | null): string {
  const m = (v || '').trim().toUpperCase().match(/^([LM]\d)(?!\d)/)
  const code = m?.[1]
  return code && PROMOTIONS.includes(code) ? code : (v || '').trim().toUpperCase()
}
export function promotionCorrespond(cible?: string | null, promotionEtudiant?: string | null): boolean {
  const c = forme(cible), e = forme(promotionEtudiant)
  return !c || !e || c === e
}

// Le devoir peut-il être rendu par cet étudiant maintenant ? Renvoie le motif
// du refus, ou null. Même règle d'accès que devoirConcerneEtudiant
// (client/src/lib/cotes.ts), plus la date limite.
export interface DevoirMin {
  actif?: boolean; type?: string; coursId?: string; faculteId?: string
  promotionId?: string; dateLimit?: string
}
export interface EtudiantMin {
  role?: string; actif?: boolean; coursIds?: string[]; faculteId?: string; classe?: string
}
export function motifRefus(
  devoir: DevoirMin, etudiant: EtudiantMin, promotionCours: string | undefined, maintenant: Date,
): string | null {
  if (etudiant.role !== 'etudiant' || etudiant.actif === false) return 'compte'
  if (!devoir.actif) return 'devoir-masque'
  if (!['qcm', 'qcm_chapitre', 'qcm_cas'].includes(devoir.type || '')) return 'type'
  if (!devoir.coursId || !(etudiant.coursIds || []).includes(devoir.coursId)) return 'cours'
  if (devoir.faculteId && etudiant.faculteId && devoir.faculteId !== etudiant.faculteId) return 'faculte'
  if (!promotionCorrespond(promotionCours, etudiant.classe) || !promotionCorrespond(devoir.promotionId, etudiant.classe)) return 'promotion'
  // Date seule (« 2026-06-01 ») : le devoir reste ouvert toute la journée.
  const brut = devoir.dateLimit || ''
  const limite = new Date(/^\d{4}-\d{2}-\d{2}$/.test(brut) ? `${brut}T23:59:59` : brut).getTime()
  if (Number.isFinite(limite) && maintenant.getTime() > limite) return 'delai'
  return null
}
