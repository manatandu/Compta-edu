import BackButton from '@/components/BackButton'
import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import {
  BookOpen, BookMarked, BarChart2, FileText, ChevronRight,
  Sparkles, FolderOpen, Folder, Package, Receipt, Building2,
  ScrollText, Scale, TrendingUp, Lock, Users, Landmark, Layers, PenLine, List
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import { useNav } from '@/lib/navContext'
import { useSessions, useEcritures } from '@/lib/useFirestore'

// ── Types ────────────────────────────────────────────────────────────────────
interface SubModule {
  path: string | null
  label: string
  desc: string
  icon: React.ElementType
  color: string
  soon?: boolean
}

interface Folder {
  id: string
  number: number
  label: string
  icon: React.ElementType
  folderColor: string
  subModules: SubModule[]
  soon?: boolean
}

// ── Structure des 5 dossiers ─────────────────────────────────────────────────
const FOLDERS: Folder[] = [
  {
    id: 'docs-comptables',
    number: 1,
    label: 'Documents Comptables',
    icon: ScrollText,
    folderColor: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400',
    subModules: [
      {
        path: '/docs-comptables-hub',
        label: 'Documents Comptables',
        desc: 'Livre Journal, Grand Livre, Balance Générale.',
        icon: ScrollText,
        color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      },
    ],
  },
  {
    id: 'etats-financiers',
    number: 2,
    label: 'États Financiers',
    icon: TrendingUp,
    folderColor: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400',
    subModules: [
      {
        path: '/etats-financiers-hub',
        label: 'États Financiers',
        desc: 'Bilan et Compte de Résultat SYSCOHADA.',
        icon: TrendingUp,
        color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
      },
    ],
  },
  {
    id: 'immobilisations',
    number: 3,
    label: 'Immobilisations & Amortissements',
    icon: Building2,
    folderColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400',
    subModules: [
      {
        path: '/immobilisations',
        label: 'Immobilisations & Amortissements',
        desc: 'Catalogue AR n°088, simulateur 3 modes (linéaire, dégressif, exceptionnel), fiches pédagogiques.',
        icon: Building2,
        color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
      },
    ],
  },
  {
    id: 'gestion-stock',
    number: 4,
    label: 'Gestion de Stock',
    icon: Package,
    folderColor: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400',
    soon: false,
    subModules: [
      {
        path: '/stock',
        label: 'Gestion de Stock',
        desc: 'Fiches articles, mouvements, CUMP, PEPS/FIFO, écritures automatiques.',
        icon: Package,
        color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      },
    ],
  },
  {
    id: 'factures',
    number: 5,
    label: 'Enregistrement des Factures',
    icon: Receipt,
    folderColor: 'text-rose-600 bg-rose-50 dark:bg-rose-900/20 dark:text-rose-400',
    soon: true,
    subModules: [],
  },
  {
    id: 'personnels',
    number: 6,
    label: 'Charges du personnel',
    icon: Users,
    folderColor: 'text-sky-600 bg-sky-50 dark:bg-sky-900/20 dark:text-sky-400',
    soon: false,
    subModules: [
      {
        label: 'Simulateur IPR / Salaires',
        desc: 'Calcul IPR nationaux et expatriés, charges patronales, net à payer',
        icon: Users,
        color: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400',
        path: '/charges-personnel/ipr',
      },
    ],
  },
  {
    id: 'emprunts',
    number: 7,
    label: 'Gestion des Emprunts',
    icon: Landmark,
    folderColor: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400',
    soon: true,
    subModules: [],
  },
  {
    id: 'plan-comptable',
    number: 8,
    label: 'Plan Comptable SYSCOHADA',
    icon: List,
    folderColor: 'text-teal-600 bg-teal-50 dark:bg-teal-900/20 dark:text-teal-400',
    subModules: [
      {
        path: '/plan-comptable',
        label: 'Plan Comptable SYSCOHADA',
        desc: 'Liste complète des comptes SYSCOHADA révisé : classes 1 à 9, numéros, intitulés et soldes normaux.',
        icon: List,
        color: 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400',
      },
    ],
  },
]

// ── Composant ────────────────────────────────────────────────────────────────
export default function ComptabiliteGeneralePage() {
  const [, navigate] = useHashLocation()
  const { setNav } = useNav()
  const [openFolder, setOpenFolder] = useState<string | null>(null)
  const user = useUser()
  const { sessions } = useSessions(user?.id)
  const { ecritures } = useEcritures(user?.id)
  const recentSessions = [...sessions].reverse().slice(0, 3)

  const toggleFolder = (id: string, soon?: boolean) => {
    if (soon) return
    // Navigation directe si un seul sous-module
    const folder = FOLDERS.find(f => f.id === id)
    if (folder && folder.subModules.length === 1 && folder.subModules[0].path) {
      navigate(folder.subModules[0].path)
      return
    }
    setOpenFolder(prev => (prev === id ? null : id))
  }

  return (
    <div className="space-y-6 pb-4">
      <BackButton />

      {/* ── En-tête animé ── */}
      <div className="animate-slideDown" style={{ animationDelay: '0ms' }}>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10 px-4 sm:px-6 py-4 sm:py-5">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-blue-500/5 to-transparent rounded-xl" />
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 animate-pulseGlow" />
          <div className="pointer-events-none absolute -right-2 bottom-0 h-14 w-14 rounded-full bg-primary/6 animate-float" />
          <div className="flex items-center gap-3 relative">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-md shadow-primary/20 transition-all duration-300 hover:scale-110 hover:rotate-6">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground leading-tight">Comptabilité Générale</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <Sparkles className="h-3 w-3 text-primary" />
                SYSCOHADA Révisé : 5 modules disponibles
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mini tableau de bord ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-border bg-card px-4 py-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
            <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Sessions</p>
            <p className="text-lg font-bold text-foreground">{sessions.length}</p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card px-4 py-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0">
            <PenLine className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Écritures</p>
            <p className="text-lg font-bold text-foreground">{ecritures.length}</p>
          </div>
        </div>
        {/* Bouton Documents */}
        <div
          className="col-span-2 sm:col-span-3 rounded-xl border border-border bg-card px-4 py-3 flex items-center gap-3 cursor-pointer hover:border-teal-300/50 transition-colors"
          onClick={() => { setNav({ cours: 'comptabilite-generale' }); navigate('/documents') }}
        >
          <div className="h-9 w-9 rounded-lg bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center shrink-0">
            <FolderOpen className="h-4 w-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Ressources</p>
            <p className="text-sm font-semibold text-teal-700 dark:text-teal-400">Documents &amp; Plan Comptable</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0" />
        </div>
      </div>

      {/* ── Sessions récentes ── */}
      {recentSessions.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">Sessions récentes</p>
            <button onClick={() => navigate('/journal')} className="text-xs text-primary hover:underline flex items-center gap-0.5">
              Voir tout <ChevronRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-2">
            {recentSessions.map(s => {
              const count = ecritures.filter(e => e.sessionId === s.id).length
              return (
                <button
                  key={s.id}
                  onClick={() => navigate(`/journal?session=${s.id}`)}
                  className="w-full flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left hover:border-primary/30 hover:bg-muted/30 transition-all duration-200 group"
                >
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{s.nom}</p>
                    <p className="text-xs text-muted-foreground">Exercice {s.exercice}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">{count} écriture{count !== 1 ? 's' : ''}</Badge>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Liste des dossiers ── */}
      <div className="space-y-3">
        {FOLDERS.map((folder, fi) => {
          const FolderIcon = folder.icon
          const isOpen = openFolder === folder.id
          const isSoon = !!folder.soon

          return (
            <div
              key={folder.id}
              className="animate-slideUp"
              style={{ animationDelay: `${60 + fi * 70}ms` }}
            >
              {/* ── Dossier header ── */}
              <button
                onClick={() => toggleFolder(folder.id, isSoon)}
                disabled={isSoon}
                className={cn(
                  'group w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-250',
                  isSoon
                    ? 'border-border/50 bg-muted/30 cursor-default opacity-60'
                    : isOpen
                      ? 'border-primary/30 bg-primary/5 shadow-sm'
                      : 'border-border bg-card hover:border-primary/20 hover:bg-primary/5 hover:shadow-sm cursor-pointer'
                )}
              >
                {/* Numéro */}
                <div className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold flex-shrink-0 transition-all duration-300',
                  folder.folderColor,
                  !isSoon && 'group-hover:scale-110 group-hover:shadow-md'
                )}>
                  {folder.number}
                </div>

                {/* Icône dossier */}
                <div className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0 transition-all duration-300',
                  folder.folderColor,
                  !isSoon && 'group-hover:scale-110'
                )}>
                  {isOpen && !isSoon
                    ? <FolderOpen className="h-5 w-5 transition-transform duration-300" />
                    : <FolderIcon className="h-5 w-5 transition-transform duration-300" />
                  }
                </div>

                {/* Label */}
                <span className={cn(
                  'flex-1 text-left font-semibold text-sm',
                  isSoon ? 'text-muted-foreground' : 'text-foreground'
                )}>
                  {folder.label}
                </span>

                {/* Badge bientôt / count */}
                {isSoon ? (
                  <Badge variant="outline" className="text-xs px-2 py-0 border-muted-foreground/30 text-muted-foreground">
                    <Lock className="h-2.5 w-2.5 mr-1" />
                    Bientôt
                  </Badge>
                ) : (
                  <div className="flex items-center gap-2">
                    {folder.subModules.length > 1 && (
                      <span className="text-xs text-muted-foreground">{folder.subModules.length} modules</span>
                    )}
                    <ChevronRight className={cn(
                      'h-4 w-4 text-muted-foreground/60 transition-transform duration-300',
                      folder.subModules.length > 1 && isOpen && 'rotate-90 text-primary'
                    )} />
                  </div>
                )}
              </button>

              {/* ── Contenu ouvert ── */}
              {isOpen && !isSoon && folder.subModules.length > 0 && (
                <div className="mt-2 ml-4 pl-3 border-l-2 border-primary/20 space-y-2">
                  {folder.subModules.map((mod, mi) => {
                    const ModIcon = mod.icon
                    return (
                      <button
                        key={mod.label}
                        onClick={() => mod.path && navigate(mod.path)}
                        className={cn(
                          'group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card text-left',
                          'transition-all duration-250 animate-slideUp',
                          'hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20 hover:ring-2 hover:ring-primary/15 cursor-pointer'
                        )}
                        style={{ animationDelay: `${mi * 50}ms` }}
                      >
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-primary/40 transition-all duration-300 group-hover:w-full" />
                        <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md', mod.color)}>
                          <ModIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-200">{mod.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{mod.desc}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/40 flex-shrink-0 transition-all duration-200 group-hover:text-primary group-hover:translate-x-0.5" />
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
