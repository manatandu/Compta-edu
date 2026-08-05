import BackButton from '@/components/BackButton'
import React from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { BookOpen, BookMarked, BarChart2, FileText, ClipboardList, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Module { path: string; label: string; desc: string; icon: React.ReactElement; color: string; available: boolean; comingSoon?: string }

const MODULES: Module[] = [
  {
    path: '/sycebnl/journal',
    label: 'Journal Comptable',
    desc: 'Saisir et consulter les écritures comptables par ordre chronologique.',
    icon: <BookOpen className="h-6 w-6" />,
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    available: true,
  },
  {
    path: '/sycebnl/grand-livre',
    label: 'Grand Livre',
    desc: 'Visualiser les mouvements compte par compte avec soldes déroulés.',
    icon: <BookMarked className="h-6 w-6" />,
    color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    available: true,
  },
  {
    path: '/sycebnl/balance',
    label: 'Balance Générale',
    desc: 'Balance à 6 colonnes SYCEBNL : ouverture, mouvements et clôture.',
    icon: <BarChart2 className="h-6 w-6" />,
    color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    available: true,
  },
  {
    path: '/sycebnl/bilan',
    label: 'Bilan & Compte de Résultat',
    desc: 'États financiers SYCEBNL : Bilan (Fonds propres / Fonds affectés) + CR (Revenus – Charges = Excédent/Déficit). Modèle officiel p.346-347.',
    icon: <FileText className="h-6 w-6" />,
    color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
    available: true,
  },
  {
    path: '/sycebnl/plan-comptable',
    label: 'Plan Comptable SYCEBNL',
    desc: 'Plan comptable officiel SYCEBNL : 8 classes, comptes spécifiques aux entités à but non lucratif (associations, ONG, fondations).',
    icon: <ClipboardList className="h-6 w-6" />,
    color: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    available: true,
  },
]

export default function ComptabiliteSYCEBNLPage() {
  const [, navigate] = useHashLocation()

  return (
    <div className="space-y-5 animate-fadeIn">
      <BackButton />
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Comptabilité SYCEBNL</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Système Comptable des Entités à But Non Lucratif : Associations, ONG, Fondations, Projets de développement
        </p>
      </div>

      {/* Grille des modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MODULES.map(m => (
          <button
            key={m.path + m.label}
            onClick={() => m.available && navigate(m.path)}
            className={`text-left w-full group ${!m.available ? 'cursor-default' : ''}`}
          >
            <Card className={`border-border transition-all duration-200 ${m.available ? 'hover:border-primary/40 hover:shadow-lg hover:bg-muted/30 hover:-translate-y-1 cursor-pointer' : 'opacity-70'}`}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${m.color}`}>
                    {m.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`font-semibold text-foreground ${m.available ? 'group-hover:text-primary transition-colors' : ''}`}>
                        {m.label}
                      </p>
                      {!m.available && (
                        <Badge variant="outline" className="text-xs px-1.5 py-0">Bientôt</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {m.desc}
                    </p>
                    {m.comingSoon && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 italic">{m.comingSoon}</p>
                    )}
                  </div>
                  {m.available && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  )}
                </div>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>

      {/* Note SYCEBNL */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800 px-4 py-3">
        <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">SYCEBNL : En vigueur depuis le 1ᵉʳ janvier 2024</p>
        <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
          Journal, Grand Livre et Balance fonctionnent avec la même logique que SYSCOHADA.
          Le Bilan et le Compte de Résultat utilisent le modèle officiel SYCEBNL p.346-347 (Ressources propres, Fonds affectés, Excédent/Déficit).
        </p>
      </div>
    </div>
  )
}
