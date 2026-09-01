import { useEffect, useRef, useState, useCallback } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { setFirestoreErrorSuppressed } from '@/lib/firestoreErrorHandler'

const IDLE_MS = 30 * 60 * 1000   // 30 minutes
const WARN_MS = 25 * 60 * 1000   // avertissement à 25 min

export function useIdleTimer() {
  const [showWarning, setShowWarning] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(300)
  const idleRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const warnRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearAll = useCallback(() => {
    if (idleRef.current)  clearTimeout(idleRef.current)
    if (warnRef.current)  clearTimeout(warnRef.current)
    if (countRef.current) clearInterval(countRef.current)
  }, [])

  const startCountdown = useCallback(() => {
    setSecondsLeft(300)
    if (countRef.current) clearInterval(countRef.current)
    countRef.current = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) { if (countRef.current) clearInterval(countRef.current); return 0 }
        return s - 1
      })
    }, 1000)
  }, [])

  const reset = useCallback(() => {
    clearAll()
    setShowWarning(false)
    warnRef.current = setTimeout(() => { setShowWarning(true); startCountdown() }, WARN_MS)
    idleRef.current = setTimeout(async () => {
      clearAll(); setShowWarning(false)
      setFirestoreErrorSuppressed(true)
      try { await signOut(auth) } catch {}
      window.location.hash = '#/login'
    }, IDLE_MS)
  }, [clearAll, startCountdown])

  const stayConnected = useCallback(() => { reset() }, [reset])

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll', 'click']
    const handler = () => { if (!showWarning) reset() }
    // Écoute en phase de CAPTURE : l'événement `scroll` ne remonte pas d'un
    // conteneur imbriqué jusqu'à window, or le conteneur défilant réel de
    // l'application est le <main> du Layout (overflow-auto), pas la fenêtre.
    // Sans le drapeau de capture, lire un long chapitre à la molette ou au
    // pavé tactile - sans bouger la souris ni toucher au clavier - ne réarmait
    // jamais le minuteur : au bout de trente minutes la session était fermée
    // et l'utilisateur renvoyé à l'écran de connexion en pleine lecture.
    // Même correctif que celui déjà appliqué au bouton « remonter » de
    // ChapitreManuscrit, qui écoute lui aussi le défilement en capture.
    const options = { passive: true, capture: true } as const
    events.forEach(e => window.addEventListener(e, handler, options))
    reset()
    return () => { clearAll(); events.forEach(e => window.removeEventListener(e, handler, options)) }
  }, [reset, clearAll, showWarning])

  return { showWarning, secondsLeft, stayConnected }
}
