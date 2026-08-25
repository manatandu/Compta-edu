import React, { useState } from 'react'
import { ChevronDown, ChevronRight, BookText, Calculator } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────────────────
// Composants partagés pour les notes de cours des chapitres du module Fiscalité
//
// Identité visuelle reprise à l'identique de ChapitreManuscrit.tsx (module UE1) :
// papier, encre, vert faculté, ambre pour la marginalia — pour qu'un chapitre
// de Fiscalité se lise comme n'importe quel autre chapitre de cours de l'app,
// et non comme un panneau d'aide à côté d'un simulateur.
// ─────────────────────────────────────────────────────────────────────────────
const ENCRE = 'text-[#262019]'
const ENCRE_DOUX = 'text-[#6B6047]'
const ENCRE_FAIBLE = 'text-[#948868]'
const PAPIER = 'bg-[#EDE6D3]'
const PAPIER_CARD = 'bg-[#F8F4E8]'
const LIGNE = 'border-[#D9CFA9]'
const LIGNE_FORTE = 'border-[#C6B788]'
const VERT = 'text-[#1E4A3D]'
const VERT_BG = 'bg-[#1E4A3D]'
const VERT_BORDER = 'border-[#1E4A3D]'
const AMBRE = 'text-[#8A6416]'
const LETTRINE = 'first-letter:font-serif first-letter:font-bold first-letter:text-5xl first-letter:float-left first-letter:leading-[0.8] first-letter:pr-2 first-letter:pt-1 first-letter:text-[#1E4A3D]'

export function Ref({ children }: { children: React.ReactNode }) {
  return <span className={cn('text-[11px] font-mono', ENCRE_FAIBLE)}>{children}</span>
}

let compteurSection = 0

export function Section({ titre, children }: { titre: string; icon?: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  const numero = React.useMemo(() => ++compteurSection, [])
  return (
    <section className="scroll-mt-16">
      <div className="flex items-baseline gap-3 mb-4">
        <span className={cn('font-serif font-bold text-sm', VERT)}>{numero}.</span>
        <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>{titre}</h2>
      </div>
      <div className={cn('space-y-4 text-[15px] leading-[1.75]', ENCRE)}>{children}</div>
    </section>
  )
}

/** Un paragraphe de corps de texte, avec lettrine sur le tout premier de la section. */
export function P({ children, lettrine = false }: { children: React.ReactNode; lettrine?: boolean }) {
  return <p className={lettrine ? LETTRINE : undefined}>{children}</p>
}

export function Depliant({ titre, defaultOpen = false, children }: { titre: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={cn('rounded-sm border overflow-hidden', LIGNE_FORTE, PAPIER_CARD)}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-left hover:bg-black/[.02] transition-colors"
      >
        <span className={cn('text-xs font-semibold', ENCRE)}>{titre}</span>
        {open ? <ChevronDown className={cn('h-3.5 w-3.5 shrink-0', VERT)} /> : <ChevronRight className={cn('h-3.5 w-3.5 shrink-0', ENCRE_FAIBLE)} />}
      </button>
      {open && (
        <div className={cn('px-4 pb-4 pt-0.5 text-xs leading-relaxed space-y-2 border-t', LIGNE, ENCRE_DOUX)}>
          {children}
        </div>
      )}
    </div>
  )
}

/** Encadré à filet vertical : exemple chiffré, mise en situation. */
export function Exemple({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn('rounded-sm border-l-[3px] pl-4 py-2 my-2', VERT_BORDER)}>
      <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-1', VERT)}>Exemple</p>
      <div className={cn('text-xs leading-relaxed space-y-1.5', ENCRE_DOUX)}>{children}</div>
    </div>
  )
}

/** Carte sur fond papier : point de vigilance, synthèse. */
export function ARetenir({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn('rounded-sm p-4 border', LIGNE_FORTE, PAPIER_CARD)}>
      <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-2', AMBRE)}>Point de vigilance</p>
      <div className={cn('text-xs leading-relaxed space-y-1.5', ENCRE_DOUX)}>{children}</div>
    </div>
  )
}

/** Bandeau de bascule "Notes de cours" / "Simulateur (exercices)" — deux blocs
 *  cliquables volontairement très différents dans leur habillage. */
export function BandeauModeChapitre({
  mode, onChangeMode, colorActive, chapitreLabel,
}: {
  mode: 'cours' | 'simulateur'
  onChangeMode: (m: 'cours' | 'simulateur') => void
  colorActive: string
  chapitreLabel: string
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5 mb-4">
      <button
        onClick={() => onChangeMode('cours')}
        className={cn(
          'flex items-center gap-2.5 rounded-sm border-2 px-3 py-3 text-left transition-all',
          mode === 'cours' ? cn(VERT_BORDER, VERT_BG, 'shadow-md') : 'border-dashed border-border bg-muted/20 hover:border-[#1E4A3D]/50 hover:bg-muted/40'
        )}
      >
        <BookText className={cn('h-5 w-5 shrink-0', mode === 'cours' ? 'text-[#EDE6D3]' : 'text-muted-foreground')} />
        <div className="min-w-0">
          <p className={cn('text-xs font-serif font-bold leading-tight', mode === 'cours' ? 'text-white' : 'text-foreground')}>Notes de cours</p>
          <p className={cn('text-[10px] font-mono leading-tight mt-0.5', mode === 'cours' ? 'text-white/70' : 'text-muted-foreground')}>Théorie, définitions, exemples</p>
        </div>
      </button>
      <button
        onClick={() => onChangeMode('simulateur')}
        className={cn(
          'flex items-center gap-2.5 rounded-sm border-2 px-3 py-3 text-left transition-all',
          mode === 'simulateur'
            ? `${colorActive} border-transparent shadow-md`
            : 'border-dashed border-border bg-muted/20 hover:border-primary/40 hover:bg-muted/40'
        )}
      >
        <Calculator className={cn('h-5 w-5 shrink-0', mode === 'simulateur' ? 'text-white' : 'text-muted-foreground')} />
        <div className="min-w-0">
          <p className={cn('text-xs font-bold leading-tight', mode === 'simulateur' ? 'text-white' : 'text-foreground')}>Simulateur — {chapitreLabel}</p>
          <p className={cn('text-[10px] leading-tight mt-0.5', mode === 'simulateur' ? 'text-white/80' : 'text-muted-foreground')}>Calculs, exercices interactifs</p>
        </div>
      </button>
    </div>
  )
}

/** Habillage "page de manuscrit" appliqué à tout le contenu en mode Notes de
 *  cours : fond papier, largeur de lecture, filet de clôture "À retenir". */
export function PageDeCours({ children, aRetenir }: { children: React.ReactNode; aRetenir?: string[] }) {
  compteurSection = 0
  return (
    <div className={cn('rounded-sm border px-5 py-6 sm:px-8', LIGNE, PAPIER)}>
      <div className="max-w-[62ch] mx-auto space-y-10">
        {children}
        {aRetenir && aRetenir.length > 0 && (
          <div className={cn('pt-6 border-t-2', 'border-[#262019]')}>
            <p className={cn('font-serif font-bold text-base mb-3', ENCRE)}>À retenir</p>
            <ul className="space-y-0">
              {aRetenir.map((l, i) => (
                <li key={i} className={cn('flex items-start gap-3 text-sm py-2.5 border-b', LIGNE, ENCRE_DOUX)}>
                  <span className={VERT}>▪</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
