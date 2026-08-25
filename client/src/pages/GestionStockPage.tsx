import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { ArrowLeft, Package, ClipboardList, BookOpen, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import StockArticlesPage from '@/pages/StockArticlesPage'
import StockJournalPage from '@/pages/StockJournalPage'
import StockExercicePage from '@/pages/StockExercicePage'

// Hub à onglets, cohérent avec DocsComptablesHub (module 1) et
// EtatsFinanciersHub (module 2) : la navigation « réelle » du module est
// Articles (obligatoire en premier) -> actions par article (Mouvement,
// Fiche), plus deux destinations autonomes (Journal, Exercice). Les onglets
// ne reprennent que les trois destinations qui n'exigent pas d'article déjà
// sélectionné ; Mouvement et Fiche restent des pages dédiées, atteintes
// uniquement depuis la carte d'un article (StockArticlesPage).
const ONGLETS = [
  {
    id: 'articles',
    label: 'Fiches de stock',
    icon: ClipboardList,
    // Violet : reflète la couleur d'accent réellement utilisée dans
    // StockArticlesPage (boutons, badges, sélecteurs internes).
    color: 'text-module-violet',
    activeBorder: 'border-module-violet',
  },
  {
    id: 'journal',
    label: 'Journal interne',
    icon: BookOpen,
    color: 'text-module-blue',
    activeBorder: 'border-module-blue',
  },
  {
    id: 'exercice',
    label: 'Exercice pédagogique',
    icon: Sparkles,
    // Violet : StockExercicePage utilise le violet comme couleur d'accent
    // principale pour ses CTA/callouts (l'émeraude n'y sert qu'au balisage
    // sémantique des entrées de stock, distinct de la couleur de marque).
    color: 'text-module-violet',
    activeBorder: 'border-module-violet',
  },
] as const

export default function GestionStockPage() {
  const [, navigate] = useHashLocation()
  const [actif, setActif] = useState<typeof ONGLETS[number]['id']>('articles')

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate('/comptabilite-generale')}
          className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-module-rose/10 flex items-center justify-center">
            <Package className="h-4 w-4 text-module-rose" />
          </div>
          <div>
            <h1 className="text-sm font-display font-bold text-foreground leading-tight">Gestion de Stock</h1>
            <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Module 4 · CUMP & PEPS/FIFO</p>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div role="tablist" aria-label="Gestion de stock" className="flex border-b border-border bg-background sticky top-[57px] z-20">
        {ONGLETS.map(o => {
          const Icon = o.icon
          const estActif = actif === o.id
          return (
            <button
              key={o.id}
              role="tab"
              aria-selected={estActif}
              onClick={() => setActif(o.id)}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-b-2 transition-all',
                estActif
                  ? `${o.activeBorder} ${o.color}`
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {o.label}
            </button>
          )
        })}
      </div>

      {/* Contenu direct */}
      <div className={cn(actif === 'articles' ? '' : 'hidden', 'px-4 pt-4')}>
        <StockArticlesPage embedded />
      </div>
      <div className={cn(actif === 'journal' ? '' : 'hidden', 'px-4 pt-4')}>
        <StockJournalPage embedded />
      </div>
      <div className={cn(actif === 'exercice' ? '' : 'hidden', 'px-4 pt-4')}>
        <StockExercicePage embedded />
      </div>
    </div>
  )
}
