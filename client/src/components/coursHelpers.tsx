import React, { useState } from 'react'
import { ChevronDown, ChevronRight, BookText } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────────────────
// Composants partagés pour les notes de cours des chapitres du module Fiscalité
// ─────────────────────────────────────────────────────────────────────────────

export function Ref({ children }: { children: React.ReactNode }) {
  return <span className="text-[11px] font-medium text-muted-foreground italic">{children}</span>
}

export function Section({ titre, icon: Icon, children }: { titre: string; icon?: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2 pb-1 border-b border-border/50">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground shrink-0" />}
        <h3 className="text-sm font-bold text-foreground">{titre}</h3>
      </div>
      <div className="space-y-2.5">{children}</div>
    </div>
  )
}

export function Depliant({ titre, defaultOpen = false, children }: { titre: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded-lg border border-border/60 bg-card overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left hover:bg-muted/40 transition-colors"
      >
        <span className="text-xs font-semibold text-foreground">{titre}</span>
        {open ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
      </button>
      {open && (
        <div className="px-3 pb-3 pt-0.5 text-xs text-foreground/80 leading-relaxed space-y-2 border-t border-border/40">
          {children}
        </div>
      )}
    </div>
  )
}

export function Exemple({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-sky-200 bg-sky-50 p-3">
      <p className="text-[11px] font-bold text-sky-700 mb-1">Exemple</p>
      <div className="text-xs text-sky-800 leading-relaxed space-y-1">{children}</div>
    </div>
  )
}

export function ARetenir({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
      <p className="text-[11px] font-bold text-amber-700 mb-1">À retenir</p>
      <div className="text-xs text-amber-800 leading-relaxed space-y-1">{children}</div>
    </div>
  )
}

/** Bandeau de bascule "Notes de cours" / "Simulateur (exercices)" */
export function BandeauModeChapitre({
  mode, onChangeMode, colorActive,
}: {
  mode: 'cours' | 'simulateur'
  onChangeMode: (m: 'cours' | 'simulateur') => void
  colorActive: string
}) {
  return (
    <div className="flex gap-1.5 mb-4 p-1 rounded-lg bg-muted/50 border border-border/50 w-fit">
      <button
        onClick={() => onChangeMode('cours')}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all',
          mode === 'cours' ? `${colorActive} text-white shadow-sm` : 'text-muted-foreground hover:text-foreground'
        )}
      >
        <BookText className="h-3.5 w-3.5" /> Notes de cours
      </button>
      <button
        onClick={() => onChangeMode('simulateur')}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all',
          mode === 'simulateur' ? `${colorActive} text-white shadow-sm` : 'text-muted-foreground hover:text-foreground'
        )}
      >
        Simulateur (exercices) →
      </button>
    </div>
  )
}
