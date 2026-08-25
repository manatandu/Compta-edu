import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { useGoBack } from '@/lib/navContext'
import {
  ArrowLeft, ChevronRight, Sparkles, FolderOpen, Package, Receipt, Building2,
  ScrollText, TrendingUp, Lock, Users, Landmark, Layers, PenLine, List, BookOpen
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
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
}

interface Module {
  id: string
  number: number
  label: string
  desc: string
  icon: React.ElementType
  subModules: SubModule[]
  soon?: boolean
}

// Palette « module » de la marque Orbit, cyclée sur les modules (5 teintes
// définies dans index.css) — même identité que MesCoursPage.tsx, plutôt qu'une
// palette Tailwind ad hoc propre à cette page.
const MODULE_COLORS = [
  'bg-module-blue/10 text-module-blue',
  'bg-module-violet/10 text-module-violet',
  'bg-module-teal/10 text-module-teal',
  'bg-module-rose/10 text-module-rose',
  'bg-module-emerald/10 text-module-emerald',
]

// ── Structure des modules ───────────────────────────────────────────────────
const MODULES: Module[] = [
  {
    id: 'docs-comptables',
    number: 1,
    label: 'Documents Comptables',
    desc: 'Livre Journal, Grand Livre, Balance Générale.',
    icon: ScrollText,
    subModules: [{ path: '/docs-comptables-hub', label: 'Documents Comptables', desc: '', icon: ScrollText }],
  },
  {
    id: 'etats-financiers',
    number: 2,
    label: 'États Financiers',
    desc: 'Bilan et Compte de Résultat SYSCOHADA.',
    icon: TrendingUp,
    subModules: [{ path: '/etats-financiers-hub', label: 'États Financiers', desc: '', icon: TrendingUp }],
  },
  {
    id: 'immobilisations',
    number: 3,
    label: 'Immobilisations & Amortissements',
    desc: 'Catalogue AR n°088, simulateur 3 modes (linéaire, dégressif, exceptionnel), fiches pédagogiques.',
    icon: Building2,
    subModules: [{ path: '/immobilisations', label: 'Immobilisations & Amortissements', desc: '', icon: Building2 }],
  },
  {
    id: 'gestion-stock',
    number: 4,
    label: 'Gestion de Stock',
    desc: 'Fiches articles, mouvements, CUMP, PEPS/FIFO, écritures automatiques.',
    icon: Package,
    subModules: [{ path: '/stock', label: 'Gestion de Stock', desc: '', icon: Package }],
  },
  {
    id: 'factures',
    number: 5,
    label: 'Enregistrement des Factures',
    desc: 'Créances et dettes commerciales en devises, écarts de conversion (comptes 401/411, 478-479).',
    icon: Receipt,
    subModules: [{ path: '/factures', label: 'Enregistrement des Factures', desc: '', icon: Receipt }],
  },
  {
    id: 'personnels',
    number: 6,
    label: 'Charges du personnel',
    desc: 'Calcul IPR nationaux et expatriés, charges patronales, net à payer.',
    icon: Users,
    subModules: [{ path: '/charges-personnel/ipr', label: 'Simulateur IPR / Salaires', desc: '', icon: Users }],
  },
  {
    id: 'emprunts',
    number: 7,
    label: 'Gestion des Emprunts',
    desc: 'Tableau d\'amortissement, écritures et écarts de conversion (comptes 16, 478-479).',
    icon: Landmark,
    subModules: [{ path: '/emprunts', label: 'Gestion des Emprunts', desc: '', icon: Landmark }],
  },
  {
    id: 'plan-comptable',
    number: 8,
    label: 'Plan Comptable SYSCOHADA',
    desc: 'Classes 1 à 9, numéros, intitulés et soldes normaux.',
    icon: List,
    subModules: [{ path: '/plan-comptable', label: 'Plan Comptable SYSCOHADA', desc: '', icon: List }],
  },
]

// ── Composant ────────────────────────────────────────────────────────────────
export default function ComptabiliteGeneralePage() {
  const [, navigate] = useHashLocation()
  const goBack = useGoBack('/mes-cours')
  const { setNav } = useNav()
  const [ouvert, setOuvert] = useState<string | null>(null)
  const user = useUser()
  const { sessions } = useSessions(user?.id)
  const { ecritures } = useEcritures(user?.id)
  const recentSessions = [...sessions].reverse().slice(0, 3)
  const nbActifs = MODULES.filter(m => !m.soon).length

  const clicModule = (mod: Module) => {
    if (mod.soon) return
    if (mod.subModules.length === 1 && mod.subModules[0].path) {
      navigate(mod.subModules[0].path)
      return
    }
    setOuvert(prev => (prev === mod.id ? null : mod.id))
  }

  return (
    <div className="space-y-4 pb-8 animate-fadeIn">
      {/* En-tête */}
      <div className="flex items-center gap-3">
        <button
          onClick={goBack}
          className="h-9 w-9 rounded-xl border border-border bg-card flex items-center justify-center hover:bg-muted/50 transition-colors shrink-0"
        >
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </button>
        <div>
          <h1 className="font-display text-xl font-bold text-foreground leading-tight">Comptabilité Générale</h1>
          <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">SYSCOHADA Révisé · {nbActifs} modules disponibles</p>
        </div>
      </div>

      {/* ── Mini tableau de bord ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-border bg-card px-4 py-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-module-blue/10 flex items-center justify-center shrink-0">
            <Layers className="h-4 w-4 text-module-blue" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Sessions</p>
            <p className="text-lg font-bold text-foreground">{sessions.length}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card px-4 py-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-module-emerald/10 flex items-center justify-center shrink-0">
            <PenLine className="h-4 w-4 text-module-emerald" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Écritures</p>
            <p className="text-lg font-bold text-foreground">{ecritures.length}</p>
          </div>
        </div>
        <button
          className="col-span-2 sm:col-span-1 rounded-2xl border border-border bg-card px-4 py-3 flex items-center gap-3 hover:border-module-teal/40 transition-colors text-left"
          onClick={() => { setNav({ cours: 'comptabilite-generale' }); navigate('/documents') }}
        >
          <div className="h-9 w-9 rounded-xl bg-module-teal/10 flex items-center justify-center shrink-0">
            <FolderOpen className="h-4 w-4 text-module-teal" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Ressources</p>
            <p className="text-sm font-semibold text-foreground truncate">Documents & Plan Comptable</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0" />
        </button>
      </div>

      {/* ── Sessions récentes ── */}
      {recentSessions.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Sessions récentes</p>
            <button onClick={() => navigate('/journal')} className="text-xs text-primary hover:underline flex items-center gap-0.5">
              Voir tout <ChevronRight className="h-3 w-3" />
            </button>
          </div>
          <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
            {recentSessions.map(s => {
              const count = ecritures.filter(e => e.sessionId === s.id).length
              return (
                <button
                  key={s.id}
                  onClick={() => navigate(`/journal?session=${s.id}`)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/40 transition-colors group"
                >
                  <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">{s.nom}</p>
                    <p className="text-xs text-muted-foreground">Exercice {s.exercice}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">{count} écriture{count !== 1 ? 's' : ''}</Badge>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Liste des modules ── */}
      <div>
        <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground mb-2 px-1">Modules</p>
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm divide-y divide-border">
          {MODULES.map((mod, i) => {
            const couleur = MODULE_COLORS[i % MODULE_COLORS.length]
            const isOuvert = ouvert === mod.id
            const aPlusieurs = mod.subModules.length > 1

            return (
              <div key={mod.id}>
                <button
                  onClick={() => clicModule(mod)}
                  disabled={mod.soon}
                  title={mod.soon ? 'Bientôt disponible' : undefined}
                  className={cn(
                    'group w-full flex items-center gap-3 px-4 py-4 text-left transition-colors duration-150',
                    mod.soon ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted/40'
                  )}
                >
                  <div className={cn(
                    'h-9 w-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold',
                    !mod.soon && 'transition-transform duration-200 group-hover:scale-110',
                    couleur
                  )}>
                    {mod.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn('font-semibold text-sm leading-tight truncate', mod.soon ? 'text-muted-foreground' : 'text-foreground group-hover:text-primary transition-colors')}>
                      {mod.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{mod.desc}</p>
                  </div>
                  {mod.soon ? (
                    <Badge variant="outline" className="text-xs px-2 py-0 border-muted-foreground/30 text-muted-foreground shrink-0">
                      <Lock className="h-2.5 w-2.5 mr-1" /> Bientôt
                    </Badge>
                  ) : (
                    <ChevronRight className={cn(
                      'h-4 w-4 text-muted-foreground/40 shrink-0 transition-all duration-200',
                      'group-hover:text-primary group-hover:translate-x-0.5',
                      aPlusieurs && isOuvert && 'rotate-90'
                    )} />
                  )}
                </button>

                {isOuvert && aPlusieurs && (
                  <div className="pl-16 pr-4 pb-3 space-y-1.5">
                    {mod.subModules.map(sm => {
                      const SmIcon = sm.icon
                      return (
                        <button
                          key={sm.label}
                          onClick={() => sm.path && navigate(sm.path)}
                          className="w-full flex items-center gap-2.5 rounded-xl border border-border/60 px-3 py-2 text-left hover:border-primary/30 hover:bg-muted/30 transition-colors"
                        >
                          <SmIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span className="text-xs font-medium text-foreground">{sm.label}</span>
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

      <p className="text-xs text-center text-muted-foreground/60 pb-2 flex items-center justify-center gap-1.5">
        <Sparkles className="h-3 w-3" /> Simulateurs pédagogiques : ORBIT · Acte Uniforme relatif au droit comptable et à l'information financière (SYSCOHADA révisé)
      </p>
    </div>
  )
}
