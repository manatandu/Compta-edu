// ─────────────────────────────────────────────────────────────────────────────
// MODÈLE DE PERMISSION — étudiant / professeur / admin
//
// Avant ce module, chaque page redéclarait sa propre variable locale
// (`const isStudent = user?.role === 'etudiant'`, `user.role === 'professeur'`...)
// avec des variantes de casse (`user.role`, `currentUser?.role`, `(currentUser as
// any).role`). Ce n'était pas un trou de sécurité — l'application réelle des droits
// se fait côté serveur dans firestore.rules (isProf(), isAdmin(), sameAdmin(),
// studentCoursIds()), donc un oubli côté client ne pouvait jamais faire fuiter de
// donnée — mais c'était une source de divergence et de duplication.
//
// Règle de ce module : chaque fonction ici est un MIROIR EXACT de son équivalent
// dans firestore.rules, pas une réinterprétation. En particulier :
// - isProfRole()/useIsProf() ne reconnaît que 'admin' et 'professeur', comme
//   isProf() côté serveur — le rôle 'assistant' (qui existe dans UserRole) n'y est
//   PAS inclus, à dessein. Si l'assistant doit un jour obtenir des droits prof,
//   changer isProf() dans firestore.rules d'abord, puis PROF_ROLES ici, jamais
//   l'inverse : un rempart client plus permissif que le serveur ne protège rien
//   et affiche des contrôles que l'utilisateur ne peut pas réellement utiliser ;
//   un rempart client plus restrictif que le serveur cache des fonctionnalités
//   auxquelles l'utilisateur a pourtant droit.
// ─────────────────────────────────────────────────────────────────────────────
import { useUser } from './userContext'
import type { User, UserRole } from './db'

const PROF_ROLES: UserRole[] = ['admin', 'professeur']

// "Staff" au sens large (admin + professeur + assistant) : plusieurs pages affichent
// des contrôles de gestion (modifier/supprimer un exercice, gérer un étudiant...) à ce
// groupe élargi. ATTENTION : ce n'est PAS un miroir de isProf() côté serveur, qui
// n'accepte que 'admin' et 'professeur' — un compte 'assistant' voit donc ici des
// contrôles que Firestore refusera silencieusement s'il tente réellement l'action.
// Ce helper centralise ce comportement existant tel quel (aucun changement fonctionnel
// lors de son introduction), il ne le cautionne pas comme correct : si le rôle
// assistant doit vraiment avoir ces droits, il faut d'abord élargir isProf() dans
// firestore.rules, sans quoi ces contrôles resteront des boutons morts pour lui.
const STAFF_ROLES: UserRole[] = ['admin', 'professeur', 'assistant']

export function isAdminRole(user: User | null | undefined): boolean {
  return user?.role === 'admin'
}

export function isProfRole(user: User | null | undefined): boolean {
  return !!user && PROF_ROLES.includes(user.role)
}

export function isStaffRole(user: User | null | undefined): boolean {
  return !!user && STAFF_ROLES.includes(user.role)
}

export function isStudentRole(user: User | null | undefined): boolean {
  return user?.role === 'etudiant'
}

/** IDs des cours auxquels un étudiant est inscrit (champ coursIds de son profil) —
 * miroir de studentCoursIds() dans firestore.rules. Toujours [] pour un non-étudiant. */
export function studentCoursIds(user: User | null | undefined): string[] {
  return isStudentRole(user) ? (user?.coursIds || []) : []
}

export function useIsAdmin(): boolean {
  return isAdminRole(useUser())
}

export function useIsProf(): boolean {
  return isProfRole(useUser())
}

export function useIsStaff(): boolean {
  return isStaffRole(useUser())
}

export function useIsStudent(): boolean {
  return isStudentRole(useUser())
}

export function useStudentCoursIds(): string[] {
  return studentCoursIds(useUser())
}
