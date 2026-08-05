import { useEffect, useRef, useState, useCallback } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

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
      try { await signOut(auth) } catch {}
      window.location.hash = '#/login'
    }, IDLE_MS)
  }, [clearAll, startCountdown])

  const stayConnected = useCallback(() => { reset() }, [reset])

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll', 'click']
    const handler = () => { if (!showWarning) reset() }
    events.forEach(e => window.addEventListener(e, handler, { passive: true }))
    reset()
    return () => { clearAll(); events.forEach(e => window.removeEventListener(e, handler)) }
  }, [reset, clearAll, showWarning])

  return { showWarning, secondsLeft, stayConnected }
}
