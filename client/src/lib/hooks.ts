import { useState, useEffect } from 'react'
import { getEcritures, getSessions, Ecriture } from './db'

/**
 * Hook réactif : lit TOUTES les écritures du module.
 * - Se rafraîchit au MONTAGE du composant (données toujours fraîches à l'ouverture)
 * - Se rafraîchit sur compta-data-changed (ajout, suppression, réinitialisation en temps réel)
 */
export function useEcritures(sessionId?: string, module?: 'syscohada' | 'sycebnl'): Ecriture[] {
  const [all, setAll] = useState<Ecriture[]>(() => getEcritures(undefined, module))

  useEffect(() => {
    // Re-lire immédiatement au montage (cas : page ouverte après modif dans Journal)
    setAll(getEcritures(undefined, module))

    // Puis écouter les changements en temps réel
    const refresh = () => setAll(getEcritures(undefined, module))
    window.addEventListener('compta-data-changed', refresh)
    return () => window.removeEventListener('compta-data-changed', refresh)
  }, [module])

  if (sessionId) {
    return all.filter(e => e.sessionId === sessionId)
  }
  return all
}

/**
 * Hook réactif pour les sessions.
 * - Se rafraîchit au MONTAGE (données fraîches à l'ouverture)
 * - Se rafraîchit sur compta-data-changed
 */
export function useSessions(module?: 'syscohada' | 'sycebnl') {
  const [sessions, setSessions] = useState(() => getSessions(module))

  useEffect(() => {
    // Re-lire au montage
    setSessions(getSessions(module))

    const refresh = () => setSessions(getSessions(module))
    window.addEventListener('compta-data-changed', refresh)
    return () => window.removeEventListener('compta-data-changed', refresh)
  }, [module])

  return sessions
}
