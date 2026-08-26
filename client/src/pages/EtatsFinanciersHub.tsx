import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { ArrowLeft, FileText, BarChart2, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ModuleProvider } from '@/lib/moduleContext'
import BilanPage from '@/pages/BilanPage'

// Palette « module » de la marque Orbit, cohérente avec DocsComptablesHub
// et ComptabiliteGeneralePage (voir PR #98, #100).
const ONGLETS = [
  {
    id: 'bilan',
    label: 'Bilan',
    icon: FileText,
    color: 'text-module-rose',
    activeBorder: 'border-module-rose',
    mode: 'bilan' as const,
  },
  {
    id: 'compte-resultat',
    label: 'Compte de Résultat',
    icon: BarChart2,
    color: 'text-module-emerald',
    activeBorder: 'border-module-emerald',
    mode: 'cr' as const,
  },
]

export default function EtatsFinanciersHub() {
  const [, navigate] = useHashLocation()
  const [actif, setActif] = useState('bilan')

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3 animate-slideDown">
        <button
          onClick={() => navigate('/comptabilite-generale')}
          className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted hover:scale-110 transition-all"
        >
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-module-rose/10 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-module-rose" />
          </div>
          <div>
            <h1 className="text-sm font-display font-bold text-foreground leading-tight">États Financiers</h1>
            <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Module 2 · SYSCOHADA Révisé</p>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div role="tablist" aria-label="États financiers" className="flex border-b border-border bg-background sticky top-[57px] z-20">
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
                  ? `${o.activeBorder} ${o.color} scale-105`
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:scale-105'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {o.label}
            </button>
          )
        })}
      </div>

      {/* Contenu direct */}
      <ModuleProvider module="syscohada">
        <div className={cn(actif === 'bilan' ? '' : 'hidden', 'px-4 pt-4')}>
          <BilanPage mode="bilan" embedded />
        </div>
        <div className={cn(actif === 'compte-resultat' ? '' : 'hidden', 'px-4 pt-4')}>
          <BilanPage mode="cr" embedded />
        </div>
      </ModuleProvider>
    </div>
  )
}
