import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { ArrowLeft, BookOpen, BookMarked, Scale } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ModuleProvider } from '@/lib/moduleContext'
import JournalPage from '@/pages/JournalPage'
import GrandLivrePage from '@/pages/GrandLivrePage'
import BalancePage from '@/pages/BalancePage'

const ONGLETS = [
  {
    id: 'journal',
    label: 'Livre Journal',
    icon: BookOpen,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    activeBorder: 'border-blue-500',
  },
  {
    id: 'grand-livre',
    label: 'Grand Livre',
    icon: BookMarked,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    activeBorder: 'border-indigo-500',
  },
  {
    id: 'balance',
    label: 'Balance Générale',
    icon: Scale,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    activeBorder: 'border-cyan-500',
  },
]

export default function DocsComptablesHub() {
  const [, navigate] = useHashLocation()
  const [actif, setActif] = useState('journal')

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
          <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground leading-tight">Documents Comptables</h1>
            <p className="text-xs text-muted-foreground">Dossier 1 · SYSCOHADA Révisé</p>
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
        <div className={actif === 'journal' ? '' : 'hidden'}>
          <JournalPage />
        </div>
        <div className={actif === 'grand-livre' ? '' : 'hidden'}>
          <GrandLivrePage />
        </div>
        <div className={actif === 'balance' ? '' : 'hidden'}>
          <BalancePage />
        </div>
      </ModuleProvider>
    </div>
  )
}
