// ─────────────────────────────────────────────────────────────────────────────
// DÉCONNEXION COMPLÈTE
//
// Une seule façon de fermer une session, quelle qu'en soit la cause : bouton
// de déconnexion, inactivité prolongée, compte suspendu ou supprimé pendant
// la session. La déconnexion pour inactivité se contentait de signOut() : le
// cache Firestore persistant (IndexedDB) gardait les données du compte, et
// sur un poste partagé (salle informatique) le suivant pouvait les voir
// réapparaître avant toute vérification des règles de sécurité.
// ─────────────────────────────────────────────────────────────────────────────
import { terminate, clearIndexedDbPersistence } from 'firebase/firestore'
import { db } from './firebase'
import { logoutAsync } from './db-firebase'
import { setFirestoreErrorSuppressed } from './firestoreErrorHandler'

// Motif affiché sur l'écran de connexion après une déconnexion imposée.
const CLE_MOTIF = 'orbit_motif_deconnexion'

export async function seDeconnecter(motif?: string): Promise<void> {
  // Le signOut() révoque immédiatement les droits Firestore : les écoutes
  // encore montées échouent en permission-denied avant le rechargement. Ce
  // n'est pas une coupure réseau, l'avertissement est donc coupé.
  setFirestoreErrorSuppressed(true)
  try { await logoutAsync() } catch { /* session déjà fermée */ }
  try {
    await terminate(db)
    await clearIndexedDbPersistence(db)
  } catch (e) {
    console.warn('Nettoyage du cache Firestore impossible :', e)
  }
  try {
    if (motif) sessionStorage.setItem(CLE_MOTIF, motif)
  } catch { /* stockage indisponible : le motif n'est simplement pas affiché */ }
  window.location.hash = '#/login'
  window.location.reload()
}

// Lu une fois par l'écran de connexion, puis effacé.
export function lireMotifDeconnexion(): string | null {
  try {
    const m = sessionStorage.getItem(CLE_MOTIF)
    if (m) sessionStorage.removeItem(CLE_MOTIF)
    return m
  } catch {
    return null
  }
}
