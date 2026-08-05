import { useUser } from '@/lib/userContext'

/**
 * Hook de compatibilité : fournit { currentUser } à partir du UserContext.
 * Utilisé par les chapitres UE2 pour déterminer le rôle (prof / admin / assistant).
 */
export function useAuth() {
  const currentUser = useUser()
  return { currentUser }
}
