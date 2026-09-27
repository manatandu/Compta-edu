// ─────────────────────────────────────────────────────────────────────────────
// CORRECTION DES QCM : règles de calcul
//
// Une seule formule par type de devoir, utilisée à l'envoi de la copie (pour
// afficher le résultat à l'étudiant) et à chaque lecture de la note (cotes,
// bulletin, écrans de l'enseignant). La note d'un QCM est ainsi toujours
// recalculée à partir des réponses enregistrées : une note écrite à la main
// dans la copie, depuis la console du navigateur, n'a aucun effet.
// ─────────────────────────────────────────────────────────────────────────────

export interface QuestionChapitreCorrigee { id: string; reponseCorrecte: string }
export interface QuestionClassiqueCorrigee { bonneReponse: number }
export interface DetailQuestion { qId: string; choix: string; correct: boolean }

const arrondi2 = (x: number) => Math.round(x * 100) / 100

// QCM de chapitre : une bonne réponse vaut un point, note ramenée sur 20.
export function corrigerQCMChapitre(questions: QuestionChapitreCorrigee[], reponses: Record<string, string>) {
  const details: DetailQuestion[] = questions.map(q => ({
    qId: q.id, choix: reponses[q.id] || '', correct: reponses[q.id] === q.reponseCorrecte,
  }))
  const nbCorrectes = details.filter(d => d.correct).length
  const note20 = questions.length > 0 ? arrondi2(nbCorrectes / questions.length * 20) : 0
  return { details, nbCorrectes, note20 }
}

// Partie QCM d'un devoir « QCM + cas pratiques » : sur 10.
export function partieQCMSur10(nbCorrectes: number, total: number): number {
  return total > 0 ? arrondi2(nbCorrectes / total * 10) : 0
}

// QCM classique (type « qcm ») : note sur 10, une décimale.
export function corrigerQCMClassique(questions: QuestionClassiqueCorrigee[], reponses: number[]) {
  const details = questions.map((q, i) => reponses[i] === q.bonneReponse)
  const score = details.filter(Boolean).length
  const note10 = questions.length > 0 ? Math.round(score / questions.length * 10 * 10) / 10 : 0
  return { details, score, note10 }
}

// Score d'un cas pratique proposé par l'IA : entier, borné au barème du cas.
export function borneScoreCas(score: number, pointsMax: number): number {
  return Math.max(0, Math.min(pointsMax, Math.round(score)))
}
