import { useState } from 'react'
import { BookOpen, BookMarked, Scale } from 'lucide-react'
import BackButton from '@/components/BackButton'
import { cn } from '@/lib/utils'
import { ModuleProvider } from '@/lib/moduleContext'
import JournalPage from '@/pages/JournalPage'
import GrandLivrePage from '@/pages/GrandLivrePage'
import BalancePage from '@/pages/BalancePage'

// Palette « module » de la marque Orbit — cohérente avec le header du hub
// (module-blue) et avec la refonte de ComptabiliteGeneralePage (PR #98).
const ONGLETS = [
  {
    id: 'journal',
    label: 'Livre Journal',
    icon: BookOpen,
    color: 'text-module-blue',
    activeBorder: 'border-module-blue',
  },
  {
    id: 'grand-livre',
    label: 'Grand Livre',
    icon: BookMarked,
    color: 'text-module-violet',
    activeBorder: 'border-module-violet',
  },
  {
    id: 'balance',
    label: 'Balance Générale',
    icon: Scale,
    color: 'text-module-teal',
    activeBorder: 'border-module-teal',
  },
]

export default function DocsComptablesHub() {
  const [actif, setActif] = useState('journal')

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3 animate-slideDown">
        <BackButton />
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-module-blue/10 flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-module-blue" />
          </div>
          <div>
            <h1 className="text-sm font-display font-bold text-foreground leading-tight">Documents Comptables</h1>
            <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Module 1 · SYSCOHADA Révisé</p>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div role="tablist" aria-label="Documents comptables" className="flex border-b border-border bg-background sticky top-[57px] z-20">
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
        <div className={cn(actif === 'journal' ? '' : 'hidden', 'px-4 pt-4')}>
          <JournalPage embedded />
        </div>
        <div className={cn(actif === 'grand-livre' ? '' : 'hidden', 'px-4 pt-4')}>
          <GrandLivrePage embedded />
        </div>
        <div className={cn(actif === 'balance' ? '' : 'hidden', 'px-4 pt-4')}>
          <BalancePage embedded />
        </div>
      </ModuleProvider>
    </div>
  )
}
