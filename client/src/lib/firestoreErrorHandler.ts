// ─────────────────────────────────────────────────────────────────────────────
// GESTION CENTRALISÉE DES ERREURS onSnapshot (point 4 de l'audit)
//
// Avant ce module, la quasi-totalité des écoutes onSnapshot() de l'application
// (useFirestore.ts, db-firebase.ts) n'avaient pas de callback d'erreur. Le SDK
// Firestore désabonne SILENCIEUSEMENT un listener en erreur (droits révoqués
// après un changement de rôle, coupure réseau prolongée, requête invalide) sans
// prévenir l'appelant : l'état React reste figé sur sa dernière valeur (souvent
// [] ou un "chargement" qui ne se résout jamais), sans aucun message à
// l'utilisateur ni tentative de reconnexion.
//
// `toast` (client/src/components/ui/use-toast.ts) est exporté comme une fonction
// autonome, pas seulement comme hook - utilisable aussi bien depuis les hooks de
// useFirestore.ts que depuis les fonctions onXSnapshot() de db-firebase.ts, qui
// ne sont pas des composants React et ne peuvent pas appeler useToast().
// ─────────────────────────────────────────────────────────────────────────────
import { toast } from '@/components/ui/use-toast'

// Évite une rafale de toasts identiques si plusieurs écoutes échouent au même
// instant (ex. coupure réseau, session expirée) - un seul message suffit à
// prévenir l'utilisateur ; TOAST_LIMIT=1 dans use-toast.ts les aurait de toute
// façon écrasés les uns après les autres, mais autant éviter le clignotement.
const TOAST_THROTTLE_MS = 8000
let lastToastAt = 0

// Une déconnexion volontaire révoque immédiatement les droits Firestore de
// l'utilisateur : tous les onSnapshot() encore montés reçoivent alors une
// erreur permission-denied avant même que React ait eu le temps de démonter
// les composants, ce qui déclenchait ce toast à chaque logout alors qu'il
// n'y a jamais eu de coupure réseau. `setFirestoreErrorSuppressed(true)` est
// appelé juste avant le signOut() pour couper l'avertissement le temps de
// cette fenêtre attendue ; le rechargement de page qui suit le logout
// réinitialise de toute façon ce drapeau.
let suppressed = false
export function setFirestoreErrorSuppressed(value: boolean): void {
  suppressed = value
}

/**
 * Callback d'erreur générique à passer en 3ème argument d'un onSnapshot().
 * `context` identifie la fonction/le hook concerné (visible en console pour le
 * debug) ; l'utilisateur voit un message générique de perte de synchronisation.
 */
export function notifyFirestoreError(context: string, err: unknown): void {
  console.error(`[Firestore onSnapshot] ${context}:`, err)
  if (suppressed) return
  const now = Date.now()
  if (now - lastToastAt < TOAST_THROTTLE_MS) return
  lastToastAt = now
  // Le code technique (ex. "permission-denied", "failed-precondition",
  // "unavailable") est affiché directement dans le message : sur mobile,
  // l'utilisateur n'a pas accès à la console navigateur pour le retrouver,
  // et c'est ce code qui permet de diagnostiquer la vraie cause au lieu de
  // deviner à partir d'un message générique.
  const code = (err as { code?: string } | null)?.code
  const detail = code ? ` (code : ${code})` : ''
  toast({
    title: 'Connexion interrompue',
    description: `La synchronisation avec le serveur a été interrompue${detail}. Vérifiez votre connexion, ou rechargez la page si le problème persiste.`,
    variant: 'destructive',
  })
}
