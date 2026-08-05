import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { ArrowLeft, FileText, BarChart2, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ModuleProvider } from '@/lib/moduleContext'
import BilanPage from '@/pages/BilanPage'

const ONGLETS = [
  {
    id: 'bilan',
    label: 'Bilan',
    icon: FileText,
    color: 'text-orange-600 dark:text-orange-400',
    activeBorder: 'border-orange-500',
    mode: 'bilan' as const,
  },
  {
    id: 'compte-resultat',
    label: 'Compte de Résultat',
    icon: BarChart2,
    color: 'text-amber-600 dark:text-amber-400',
    activeBorder: 'border-amber-500',
    mode: 'cr' as const,
  },
]

export default function EtatsFinanciersHub() {
  const [, navigate] = useHashLocation()
  const [actif, setActif] = useState('bilan')

  const ongletActif = ONGLETS.find(o => o.id === actif)!

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
          <div className="h-8 w-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground leading-tight">États Financiers</h1>
            <p className="text-xs text-muted-foreground">Dossier 2 · SYSCOHADA Révisé</p>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex border-b border-border bg-background sticky top-[57px] z-20">
        {ONGLETS.map(o => {
          const Icon = o.icon
          return (
            <button
              key={o.id}
              onClick={() => setActif(o.id)}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-b-2 transition-all',
                actif === o.id
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
      <ModuleProvider module="syscohada">
        <div className={actif === 'bilan' ? '' : 'hidden'}>
          <BilanPage mode="bilan" />
        </div>
        <div className={actif === 'compte-resultat' ? '' : 'hidden'}>
          <BilanPage mode="cr" />
        </div>
      </ModuleProvider>
    </div>
  )
}
