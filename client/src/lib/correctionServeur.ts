// ─────────────────────────────────────────────────────────────────────────────
// ENVOI D'UN QCM À CORRIGER PAR LE SERVEUR
//
// La note d'un QCM n'est plus calculée ni écrite par le navigateur : la
// fonction soumettreQCM (functions/src/index.ts) vérifie le devoir, corrige,
// fait évaluer les cas pratiques par Gemini, puis enregistre la copie.
// Le module Cloud Functions n'est téléchargé qu'au premier envoi.
// ─────────────────────────────────────────────────────────────────────────────
import type { Soumission } from './db'
import app from './firebase'

export interface EnvoiQCM {
  devoirId: string
  reponses: Record<string, string> | number[]
  reponsesCas?: Record<string, string>
}

export interface ResultatEnvoiQCM {
  soumission: Soumission
  // QCM classique : bonne réponse ou non, question par question.
  detailsQCM?: boolean[]
}

export async function soumettreQCM(envoi: EnvoiQCM): Promise<ResultatEnvoiQCM> {
  const { getFunctions, httpsCallable } = await import('firebase/functions')
  const appel = httpsCallable<EnvoiQCM, ResultatEnvoiQCM>(
    getFunctions(app, 'europe-west1'), 'soumettreQCM', { timeout: 200_000 },
  )
  const { data } = await appel(envoi)
  return data
}

// Message à montrer à l'étudiant : celui du serveur quand il en donne un
// (délai dépassé, copie déjà rendue...), sinon un message générique.
export function messageErreurEnvoi(err: unknown): string {
  const e = err as { code?: string; message?: string }
  const codesServeur = ['functions/failed-precondition', 'functions/already-exists', 'functions/invalid-argument', 'functions/not-found', 'functions/permission-denied']
  if (e?.code && codesServeur.includes(e.code) && e.message) return e.message
  return 'Envoi impossible pour le moment. Vérifiez votre connexion, puis réessayez.'
}
