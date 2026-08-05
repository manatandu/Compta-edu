import React, { useState, useRef, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * InfoTooltip : icône "?" avec popover de définition
 * Utilise createPortal pour s'attacher à document.body,
 * contournant tout overflow:hidden ou transform parent.
 */
export function InfoTooltip({ texte, loi }: { texte: string; loi?: string }) {
  const [ouvert, setOuvert] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const btnRef = useRef<HTMLButtonElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const calcPos = useCallback(() => {
    if (!btnRef.current) return
    const r = btnRef.current.getBoundingClientRect()
    const popW = 260
    const popH = 180 // hauteur estimée max
    const margin = 8

    // Horizontal : aligné sur le bouton, recadré si débordement droite
    let left = r.left
    if (left + popW > window.innerWidth - margin) {
      left = window.innerWidth - popW - margin
    }
    if (left < margin) left = margin

    // Vertical : sous le bouton par défaut, au-dessus si pas de place
    let top = r.bottom + 6
    if (top + popH > window.innerHeight - margin) {
      top = r.top - popH - 6
    }
    if (top < margin) top = margin

    setPos({ top, left })
  }, [])

  // Recalcul si scroll pendant ouverture
  useEffect(() => {
    if (!ouvert) return
    const onScroll = () => calcPos()
    window.addEventListener('scroll', onScroll, true)
    return () => window.removeEventListener('scroll', onScroll, true)
  }, [ouvert, calcPos])

  const open = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    calcPos()
    setOuvert(true)
  }

  const close = (delay = 150) => {
    timerRef.current = setTimeout(() => setOuvert(false), delay)
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (ouvert) { setOuvert(false) } else { open() }
  }

  const popover = ouvert ? createPortal(
    <span
      role="tooltip"
      onMouseEnter={() => { if (timerRef.current) clearTimeout(timerRef.current) }}
      onMouseLeave={() => close()}
      style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 99999 }}
      className={cn(
        'w-64 rounded-xl border border-border bg-card shadow-2xl p-3 text-left pointer-events-auto',
        'animate-in fade-in-0 zoom-in-95 duration-150'
      )}
    >
      <p className="text-sm text-foreground leading-relaxed">{texte}</p>
      {loi && (
        <p className="mt-1.5 text-xs text-primary font-medium">{loi}</p>
      )}
    </span>,
    document.body
  ) : null

  return (
    <span className="relative inline-flex items-center">
      <button
        ref={btnRef}
        type="button"
        onMouseEnter={open}
        onMouseLeave={() => close()}
        onClick={handleClick}
        className="ml-1 text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
        aria-label="Définition"
        aria-expanded={ouvert}
      >
        <HelpCircle className="h-3.5 w-3.5" />
      </button>
      {popover}
    </span>
  )
}
