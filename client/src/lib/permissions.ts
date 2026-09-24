// ─────────────────────────────────────────────────────────────────────────────
// MODÈLE DE PERMISSION - étudiant / professeur / admin
//
// Avant ce module, chaque page redéclarait sa propre variable locale
// (`const isStudent = user?.role === 'etudiant'`, `user.role === 'professeur'`...)
// avec des variantes de casse (`user.role`, `currentUser?.role`, `(currentUser as
// any).role`). Ce n'était pas un trou de sécurité - l'application réelle des droits
// se fait côté serveur dans firestore.rules (isProf(), isAdmin(), sameAdmin(),
// studentCoursIds()), donc un oubli côté client ne pouvait jamais faire fuiter de
// donnée - mais c'était une source de divergence et de duplication.
//
// Règle de ce module : chaque fonction ici est un MIROIR EXACT de son équivalent
// dans firestore.rules, pas une réinterprétation. isProfRole()/useIsProf()
// reconnaissent 'admin', 'professeur' et 'assistant', comme isProf() côté
// serveur : depuis le 24/09/2026, l'assistant a les mêmes droits que le
// professeur. Toute évolution se fait d'abord dans firestore.rules, puis ici.
// ─────────────────────────────────────────────────────────────────────────────
import { useUser } from './userContext'
import type { User, UserRole } from './db'

const PROF_ROLES: UserRole[] = ['admin', 'professeur', 'assistant']

// "Staff" : admin + professeur + assistant. Identique à PROF_ROLES depuis que
// l'assistant a les droits du professeur ; conservé pour la lisibilité des pages.
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

/** IDs des cours auxquels un étudiant est inscrit (champ coursIds de son profil) -
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
