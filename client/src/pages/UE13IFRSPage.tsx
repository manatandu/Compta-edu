import React from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { ChevronRight, BookOpen } from 'lucide-react'
import BackButton from '@/components/BackButton'
import { useUser } from '@/lib/userContext'
import { cn } from '@/lib/utils'

const CHAPITRES = [
  {
    num: 1,
    titre: "Fondements conceptuels, normalisation internationale et architecture IFRS",
    sousTitre: "Cadre conceptuel IASB · Due Process · IFRS Foundation · ISSB",
    duree: "4h",
    actif: true,
    route: '/ue13/chapitre-1',
    lecons: 6,
    exercices: 12,
    couleur: 'bg-sky-50 text-sky-700',
    accent: 'border-l-sky-500',
  },
  {
    num: 2,
    titre: "Immobilisations corporelles et incorporelles",
    sousTitre: "IAS 16 · IAS 38",
    duree: "5h",
    actif: true,
    route: '/ue13/chapitre-2',
    lecons: 6,
    exercices: 12,
    couleur: 'bg-cyan-50 text-cyan-700',
    accent: 'border-l-cyan-500',
  },
  {
    num: 3,
    titre: "Depreciation des actifs et immeubles de placement",
    sousTitre: "IAS 36 · IAS 40",
    duree: "4h30",
    actif: true,
    route: '/ue13/chapitre-3',
    lecons: 6,
    exercices: 12,
    couleur: 'bg-blue-50 text-blue-700',
    accent: 'border-l-blue-500',
  },
  {
    num: 4,
    titre: "Stocks, creances et instruments financiers",
    sousTitre: "IAS 2 · IFRS 9",
    duree: "5h",
    actif: false,
    route: '/ue13/chapitre-4',
    lecons: 6,
    exercices: 12,
    couleur: 'bg-indigo-50 text-indigo-700',
    accent: 'border-l-indigo-500',
  },
  {
    num: 5,
    titre: "Produits des contrats avec les clients et subventions publiques",
    sousTitre: "IFRS 15 · IAS 20",
    duree: "4h",
    actif: false,
    route: '/ue13/chapitre-5',
    lecons: 6,
    exercices: 12,
    couleur: 'bg-violet-50 text-violet-700',
    accent: 'border-l-violet-500',
  },
  {
    num: 6,
    titre: "Impots differes, monnaies etrangeres et avantages du personnel",
    sousTitre: "IAS 12 · IAS 21 · IAS 19",
    duree: "5h",
    actif: false,
    route: '/ue13/chapitre-6',
    lecons: 6,
    exercices: 12,
    couleur: 'bg-purple-50 text-purple-700',
    accent: 'border-l-purple-500',
  },
  {
    num: 7,
    titre: "Premiere adoption des IFRS et IFRS pour les PME",
    sousTitre: "IFRS 1 · IFRS pour PME",
    duree: "4h",
    actif: false,
    route: '/ue13/chapitre-7',
    lecons: 6,
    exercices: 12,
    couleur: 'bg-fuchsia-50 text-fuchsia-700',
    accent: 'border-l-fuchsia-500',
  },
  {
    num: 8,
    titre: "Presentation des etats financiers et methodes comptables",
    sousTitre: "IAS 1 · IAS 8",
    duree: "4h",
    actif: false,
    route: '/ue13/chapitre-8',
    lecons: 6,
    exercices: 12,
    couleur: 'bg-rose-50 text-rose-700',
    accent: 'border-l-rose-500',
  },
]

export default function UE13IFRSPage() {
  const [, navigate] = useHashLocation()
  const user = useUser()

  return (
    <div className="min-h-screen bg-background animate-fadeIn">
      <div className="px-4 pt-3">
        <BackButton />
      </div>
      {/* Header */}
      <div className="bg-sky-600 text-white px-4 py-6 animate-slideDown">
        <div className="mb-4">
          <nav aria-label="Fil d'ariane" className="flex items-center flex-wrap gap-0.5 text-xs text-sky-200">
            <button onClick={() => navigate('/mes-cours')} className="hover:text-white font-medium transition-colors">Mes cours</button>
            <ChevronRight className="h-3 w-3 text-sky-300/60 shrink-0" />
            <span className="font-semibold text-white">UE 13 IFRS / IAS</span>
          </nav>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-white/20 rounded-full px-3 py-1">UE13</span>
            <span className="text-xs bg-white/10 rounded-full px-3 py-1">Master / Professionnel</span>
          </div>
          <h1 className="text-2xl font-display font-bold mt-2">Normes Comptables Internationales IAS/IFRS</h1>
          <p className="text-sky-100 text-sm mt-1">
            8 chapitres · 12 normes · 48 leçons · Source : IFRS Foundation 
          </p>
          <div className="flex gap-4 mt-3 text-xs text-sky-200">
            <span>48 leçons</span>
            <span>96 QCMs</span>
            <span>40 cas pratiques</span>
          </div>
        </div>
      </div>

      {/* Liste des chapitres */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-3">
        {CHAPITRES.map((ch, i) => (
          <button
            key={ch.num}
            onClick={() => ch.actif && navigate(ch.route)}
            disabled={!ch.actif}
            className={cn(
              "w-full text-left rounded-2xl border bg-card transition-all p-4 flex items-start gap-4 border-l-4 animate-slideUp",
              ch.accent,
              ch.actif
                ? "hover:shadow-sm hover:border-sky-300 hover:scale-[1.01] cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            )}
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className={cn("flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold", ch.couleur)}>
              {ch.num}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm leading-snug">{ch.titre}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{ch.sousTitre}</p>
              <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{ch.lecons} leçons</span>
                <span>{ch.duree}</span>
                {!ch.actif && <span className="text-amber-500">Bientôt disponible</span>}
              </div>
            </div>
            {ch.actif && <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />}
          </button>
        ))}
      </div>
    </div>
  )
}
