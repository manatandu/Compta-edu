import React from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { ChevronRight, Lock, BookOpen, CheckCircle2 } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useUser } from '@/lib/userContext'
import { cn } from '@/lib/utils'

const CHAPITRES = [
  {
    num: 1,
    titre: 'Introduction aux finances publiques',
    sousTitre: 'LOFIP Art. 1-3, Constitution Art. 122, 174, 175',
    duree: '3h',
    actif: true,
    route: '/ue5/chapitre-1',
    lecons: 5,
    exercices: 15,
    couleur: 'bg-emerald-50 text-emerald-700',
    accent: 'border-l-emerald-500',
    categorie: '',
  },
  {
    num: 2,
    titre: 'Les principes budgétaires',
    sousTitre: 'LOFIP Art. 4-11 : annualité, unité, universalité',
    duree: '5h',
    actif: true,
    route: '/ue5/chapitre-2',
    lecons: 6,
    exercices: 15,
    couleur: 'bg-teal-50 text-teal-700',
    accent: 'border-l-teal-500',
    categorie: '',
  },
  {
    num: 3,
    titre: 'Le budget de l\'Etat - structure et présentation',
    sousTitre: 'LOFIP Art. 16-32, Art. 36-41',
    duree: '5h',
    actif: true,
    route: '/ue5/chapitre-3',
    lecons: 6,
    exercices: 12,
    couleur: 'bg-cyan-50 text-cyan-700',
    accent: 'border-l-cyan-500',
    categorie: '',
  },
  {
    num: 4,
    titre: 'Budget-programme et gestion par la performance',
    sousTitre: 'LOFIP Art. 43-45, 75-82',
    duree: '4h',
    actif: true,
    route: '/ue5/chapitre-4',
    lecons: 5,
    exercices: 10,
    couleur: 'bg-sky-50 text-sky-700',
    accent: 'border-l-sky-500',
    categorie: '',
  },
  {
    num: 5,
    titre: 'Elaboration et adoption du budget',
    sousTitre: 'LOFIP Art. 76-87 : calendrier budgétaire',
    duree: '5h',
    actif: true,
    route: '/ue5/chapitre-5',
    lecons: 5,
    exercices: 12,
    couleur: 'bg-blue-50 text-blue-700',
    accent: 'border-l-blue-500',
    categorie: '',
  },
  {
    num: 6,
    titre: 'Exécution des recettes publiques',
    sousTitre: 'LOFIP Art. 88-94, RGCP',
    duree: '4h',
    actif: true,
    route: '/ue5/chapitre-6',
    lecons: 5,
    exercices: 10,
    couleur: 'bg-indigo-50 text-indigo-700',
    accent: 'border-l-indigo-500',
    categorie: '',
  },
  {
    num: 7,
    titre: 'Exécution des dépenses - chaîne de la dépense',
    sousTitre: 'LOFIP Art. 88-115, RGCP',
    duree: '5h',
    actif: true,
    route: '/ue5/chapitre-7',
    lecons: 6,
    exercices: 12,
    couleur: 'bg-violet-50 text-violet-700',
    accent: 'border-l-violet-500',
    categorie: '',
  },
  {
    num: 8,
    titre: 'Décentralisation budgétaire',
    sousTitre: 'LOFIP Partie 3 et 4, Constitution Art. 175',
    duree: '5h',
    actif: true,
    route: '/ue5/chapitre-8',
    lecons: 5,
    exercices: 12,
    couleur: 'bg-amber-50 text-amber-700',
    accent: 'border-l-amber-500',
    categorie: '',
  },
  {
    num: 9,
    titre: 'Contrôle des finances publiques',
    sousTitre: 'LOFIP Art. 111-132, Constitution Art. 178-180',
    duree: '5h',
    actif: true,
    route: '/ue5/chapitre-9',
    lecons: 5,
    exercices: 12,
    couleur: 'bg-orange-50 text-orange-700',
    accent: 'border-l-orange-500',
    categorie: '',
  },
  {
    num: 10,
    titre: 'Réformes et actualité des finances publiques',
    sousTitre: 'LF rectificative 2025, rapports BCC/FMI',
    duree: '4h',
    actif: true,
    route: '/ue5/chapitre-10',
    lecons: 5,
    exercices: 10,
    couleur: 'bg-rose-50 text-rose-700',
    accent: 'border-l-rose-500',
    categorie: '',
  },
]

export default function UE5FinancesPubliquesPage() {
  const [, navigate] = useHashLocation()

  const totalLecons = CHAPITRES.reduce((s, c) => s + c.lecons, 0)
  const totalExercices = CHAPITRES.reduce((s, c) => s + c.exercices, 0)
  const totalHeures = '45h'

  return (
    <div className="space-y-4 pb-10 animate-fadeIn">
      {/* En-tête */}
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <Breadcrumb
            items={[
              { label: 'Mes cours', route: '/mes-cours' },
              { label: 'UE 5 - Finances publiques' },
            ]}
            color="emerald"
          />
          <h1 className="text-lg font-display font-bold text-foreground leading-tight truncate mt-1">Finances publiques</h1>
          <p className="text-xs text-muted-foreground">Source : LOFIP n° 11/011 du 13 juillet 2011 · Constitution RDC 2006 · RGCP n° 13/050</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Chapitres', value: '10' },
          { label: 'Leçons', value: String(totalLecons) },
          { label: 'Durée totale', value: totalHeures },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Objectifs du cours */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-800">Objectifs du cours</span>
        </div>
        <ul className="space-y-1.5">
          {[
            'Définir les notions fondamentales des finances publiques et situer leur cadre constitutionnel en RDC',
            'Expliquer et appliquer les 6 principes budgétaires consacrés par la LOFIP (Art. 4-11)',
            'Analyser la structure et la présentation du budget de l\'Etat congolais',
            'Comprendre le processus d\'élaboration, de vote et d\'adoption des lois de finances',
            'Décrire la chaîne de la dépense publique et les acteurs impliqués',
            'Identifier les mécanismes de contrôle interne et externe des finances publiques',
          ].map((obj, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Liste des chapitres */}
      <div>
        <h2 className="text-sm font-display font-semibold text-foreground mb-2 px-1">Programme : 10 chapitres</h2>
        <div className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
          {CHAPITRES.map((ch) => {
            const bloque = !ch.actif
            return bloque ? (
              <div
                key={ch.num}
                className="flex items-center gap-3 px-4 py-4 opacity-45 cursor-not-allowed"
              >
                <div className={cn(
                  'h-9 w-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold',
                  ch.couleur
                )}>
                  {ch.num}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-foreground text-sm leading-tight">{ch.titre}</p>
                    {ch.categorie ? (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground shrink-0">{ch.categorie}</span>
                    ) : null}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{ch.sousTitre}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground/70">{ch.lecons} leçons</span>
                    <span className="text-xs text-muted-foreground/70">{ch.exercices} exercices</span>
                    <span className="text-xs text-muted-foreground/70">{ch.duree}</span>
                  </div>
                </div>
                <Lock className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
              </div>
            ) : (
              <button
                key={ch.num}
                onClick={() => navigate(ch.route)}
                className={cn(
                  'group w-full flex items-center gap-3 px-4 py-4 text-left',
                  'hover:bg-muted/40 transition-colors duration-150',
                  'border-l-4',
                  ch.accent
                )}
              >
                <div className={cn(
                  'h-9 w-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold',
                  'transition-transform duration-200 group-hover:scale-110',
                  ch.couleur
                )}>
                  {ch.num}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">{ch.titre}</p>
                    {ch.categorie ? (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary/10 text-primary shrink-0">{ch.categorie}</span>
                    ) : null}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{ch.sousTitre}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{ch.lecons} leçons</span>
                    <span className="text-xs text-muted-foreground">{ch.exercices} exercices</span>
                    <span className="text-xs text-muted-foreground">{ch.duree}</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Source légale */}
      <p className="text-xs text-center text-muted-foreground/60 pb-2">
        Sources : LOFIP n° 11/011 du 13 juillet 2011 · Constitution RDC du 18 février 2006 · RGCP n° 13/050 du 06 novembre 2013 · LFR n° 25/044 du 28 juin 2025
      </p>
    </div>
  )
}
