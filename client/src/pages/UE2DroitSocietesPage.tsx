import React from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { ChevronRight, Lock, BookOpen, CheckCircle2 } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useUser } from '@/lib/userContext'
import { cn } from '@/lib/utils'

const CHAPITRES = [
  {
    num: 1,
    titre: 'Notions g\u00e9n\u00e9rales \u2014 La soci\u00e9t\u00e9 commerciale',
    sousTitre: 'D\u00e9finition, classification, r\u00e9formes RDC, GUCE',
    duree: '3h',
    actif: true,
    route: '/ue2/chapitre-1',
    lecons: 8,
    exercices: 3,
    couleur: 'bg-indigo-50 text-indigo-700',
    accent: 'border-l-indigo-500',
    categorie: '',
  },
  {
    num: 2,
    titre: 'Constitution & formalit\u00e9s',
    sousTitre: 'Art. 7\u201314, 19\u2013103, 256-1\u2013263 AUSCGIE',
    duree: '4h',
    actif: true,
    route: '/ue2/chapitre-2',
    lecons: 7,
    exercices: 4,
    couleur: 'bg-violet-50 text-violet-700',
    accent: 'border-l-violet-500',
    categorie: '',
  },
  {
    num: 3,
    titre: 'Soci\u00e9t\u00e9s de personnes : SNC & SCS',
    sousTitre: 'Art. 270\u2013308 AUSCGIE \u2014 intuitu personae',
    duree: '3h',
    actif: true,
    route: '/ue2/chapitre-3',
    lecons: 5,
    exercices: 3,
    couleur: 'bg-blue-50 text-blue-700',
    accent: 'border-l-blue-500',
    categorie: 'Soci\u00e9t\u00e9s de personnes',
  },
  {
    num: 4,
    titre: 'Soci\u00e9t\u00e9s de capitaux : SA & SAS',
    sousTitre: 'Art. 385\u2013561, 853-1\u2013853-26 AUSCGIE',
    duree: '4h',
    actif: true,
    route: '/ue2/chapitre-4',
    lecons: 6,
    exercices: 3,
    couleur: 'bg-cyan-50 text-cyan-700',
    accent: 'border-l-cyan-500',
    categorie: 'Soci\u00e9t\u00e9s de capitaux',
  },
  {
    num: 5,
    titre: 'Soci\u00e9t\u00e9 mixte : SARL',
    sousTitre: 'Art. 309\u2013384 AUSCGIE \u2014 capital libre RDC',
    duree: '3h',
    actif: true,
    route: '/ue2/chapitre-5',
    lecons: 5,
    exercices: 3,
    couleur: 'bg-teal-50 text-teal-700',
    accent: 'border-l-teal-500',
    categorie: 'Soci\u00e9t\u00e9 mixte',
  },
  {
    num: 6,
    titre: 'Le GIE',
    sousTitre: 'Art. 869\u2013919 AUSCGIE \u2014 cat\u00e9gorie distincte',
    duree: '2h',
    actif: true,
    route: '/ue2/chapitre-6',
    lecons: 5,
    exercices: 3,
    couleur: 'bg-emerald-50 text-emerald-700',
    accent: 'border-l-emerald-500',
    categorie: 'Cat\u00e9gorie distincte',
  },
  {
    num: 7,
    titre: 'Les dirigeants sociaux',
    sousTitre: 'Art. 101\u2013135, 330\u2013445 AUSCGIE',
    duree: '3h',
    actif: true,
    route: '/ue2/chapitre-7',
    lecons: 5,
    exercices: 20,
    couleur: 'bg-amber-50 text-amber-700',
    accent: 'border-l-amber-500',
    categorie: '',
  },
  {
    num: 8,
    titre: 'Les associ\u00e9s & les assembl\u00e9es',
    sousTitre: 'Art. 51\u201360, 133\u2013163, 519\u2013695 AUSCGIE',
    duree: '3h',
    actif: true,
    route: '/ue2/chapitre-8',
    lecons: 5,
    exercices: 2,
    couleur: 'bg-sky-50 text-sky-700',
    accent: 'border-l-sky-500',
    categorie: '',
  },
  {
    num: 9,
    titre: 'Difficult\u00e9s & transformation',
    sousTitre: 'Art. 150\u2013164, 180\u2013200 AUSCGIE',
    duree: '2h',
    actif: true,
    route: '/ue2/chapitre-9',
    lecons: 4,
    exercices: 2,
    couleur: 'bg-orange-50 text-orange-700',
    accent: 'border-l-orange-500',
    categorie: '',
  },
  {
    num: 10,
    titre: 'Dissolution, liquidation & infractions',
    sousTitre: 'Art. 200–256, 886–920 AUSCGIE',
    duree: '3h',
    actif: true,
    route: '/ue2/chapitre-10',
    lecons: 4,
    exercices: 2,
    couleur: 'bg-rose-50 text-rose-700',
    accent: 'border-l-rose-500',
    categorie: '',
  },
  {
    num: 11,
    titre: 'Société en participation & Société de fait',
    sousTitre: 'Art. 854–868 AUSCGIE',
    duree: '2h',
    actif: true,
    route: '/ue2/chapitre-11',
    lecons: 5,
    exercices: 10,
    couleur: 'bg-emerald-50 text-emerald-700',
    accent: 'border-l-emerald-500',
    categorie: '',
  },
]

export default function UE2DroitSocietesPage() {
  const [, navigate] = useHashLocation()

  const totalLecons = CHAPITRES.reduce((s, c) => s + c.lecons, 0)
  const totalExercices = CHAPITRES.reduce((s, c) => s + c.exercices, 0)
  const totalHeures = '30h'

  return (
    <div className="space-y-4 pb-10 animate-fadeIn">
      {/* En-tête */}
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <Breadcrumb
            items={[
              { label: 'Mes cours', route: '/mes-cours' },
              { label: 'UE 2 — Droit des sociétés' },
            ]}
            color="indigo"
          />
          <h1 className="text-lg font-bold text-foreground leading-tight truncate mt-1">Droit des sociétés OHADA</h1>
          <p className="text-xs text-muted-foreground">Source : AUSCGIE révisé 2014 · Droit RDC</p>
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
      <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-indigo-600" />
          <span className="text-sm font-semibold text-indigo-800">Objectifs du cours</span>
        </div>
        <ul className="space-y-1.5">
          {[
            'Maîtriser le droit des sociétés dans l\'espace OHADA (AUSCGIE révisé 2014)',
            'Comprendre les spécificités du droit congolais (RDC) et ses réformes',
            'Appliquer les règles aux situations pratiques de création et gestion de sociétés',
            'Préparer aux examens DCG adapté OHADA',
          ].map((obj, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-indigo-700">
              <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-indigo-500" />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Liste des chapitres */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-2 px-1">Programme : 10 chapitres</h2>
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
        Sources : AUSCGIE révisé 30/01/2014 · Arrêté intermin. RDC 30/12/2014 · Ordonnance-loi RDC n° 22/030 du 08/09/2022
      </p>
    </div>
  )
}
