/**
 * useCoursAcces : Hook centralisé de contrôle d'accès aux cours
 *
 * Logique :
 * - Admin / prof / assistant : accès total à tout
 * - Étudiant avec coursIds renseigné : accès uniquement aux cours de sa liste
 * - Étudiant avec coursIds vide ou absent : aucun accès aux modules de cours
 *   (il doit être inscrit à au moins un cours pour y accéder)
 */
import { useUser } from '@/lib/userContext'
import { COURS_SYSTEME } from '@/lib/db-firebase'

/** Retourne true si l'utilisateur courant peut accéder au cours donné */
export function useCoursAcces(coursId: string): boolean {
  const user = useUser()
  if (!user) return false
  if (user.role !== 'etudiant') return true // staff = accès total

  const userCoursIds: string[] = (user as any).coursIds || []
  // Étudiant sans aucun cours assigné : aucun accès aux modules
  if (userCoursIds.length === 0) return false

  return userCoursIds.includes(coursId)
}

/** Retourne true si l'utilisateur courant peut accéder à un chemin de route */
export function useRouteAcces(routePath: string): boolean {
  const user = useUser()
  if (!user) return false
  if (user.role !== 'etudiant') return true

  // Routes toujours libres pour tout étudiant connecté
  const routesLibres = ['/', '/exercices', '/documents', '/chat', '/apercu-devoir']
  const estLibre = routesLibres.some(r => routePath === r || routePath.startsWith(r + '/'))
  if (estLibre) return true

  const userCoursIds: string[] = (user as any).coursIds || []
  // Étudiant sans aucun cours assigné : aucun accès aux modules
  if (userCoursIds.length === 0) return false

  // Trouver le cours système correspondant à ce chemin
  const cours = COURS_SYSTEME.find(c => {
    const key = c.moduleKey || c.id
    return routePath === `/${key}` || routePath.startsWith(`/${key}/`)
  })

  // Route de module reconnue → vérifier l'inscription
  if (cours) return userCoursIds.includes(cours.id)

  // Route inconnue (ex: /sycebnl/...) → bloquer par sécurité
  return false
}

/** Retourne la liste des coursIds auxquels l'étudiant a accès */
export function useUserCoursIds(): string[] {
  const user = useUser()
  if (!user || user.role !== 'etudiant') return COURS_SYSTEME.map(c => c.id)
  return (user as any).coursIds || []
}
