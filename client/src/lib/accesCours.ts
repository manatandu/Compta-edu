// ─────────────────────────────────────────────────────────────────────────────
// ACCÈS D'UN ÉTUDIANT À UN MODULE DE COURS
//
// La page Mes cours affichait un cadenas sur les UE auxquelles l'étudiant n'est
// pas inscrit, mais le sommaire et les chapitres restaient ouverts à qui
// connaissait leur adresse. Ce hook applique la même règle aux pages elles-mêmes.
//
// Règle, identique à celle de MesCoursPage : le personnel (admin, professeur,
// assistant) a accès à tout ; un étudiant a accès à une UE si l'un des cours
// actifs de son profil (coursIds) est une instance de cette UE (coursSystemeId).
// Le contenu des chapitres est embarqué dans l'application : ce verrou relève
// de l'interface, non de la sécurité des données, qui reste assurée par
// firestore.rules.
// ─────────────────────────────────────────────────────────────────────────────
import { useUser } from './userContext'
import { isStaffRole } from './permissions'
import { useAllCours } from './useFirestore'
import { COURS_SYSTEME } from './db-firebase'

export type AccesCours = 'chargement' | 'autorise' | 'refuse'

/** @param moduleKey clé du cours système, identique à l'adresse du sommaire sans « / » */
export function useAccesCours(moduleKey: string): AccesCours {
  const user = useUser()
  const { cours, loading } = useAllCours()

  if (!user) return 'refuse'
  if (isStaffRole(user)) return 'autorise'

  const coursSysteme = COURS_SYSTEME.find(c => c.moduleKey === moduleKey)
  if (!coursSysteme) return 'autorise'
  if (loading) return 'chargement'

  const inscrits = new Set(user.coursIds || [])
  const autorise = cours.some(c =>
    c.actif && inscrits.has(c.id) &&
    ((c as any).coursSystemeId === coursSysteme.id || c.id === coursSysteme.id)
  )
  return autorise ? 'autorise' : 'refuse'
}
