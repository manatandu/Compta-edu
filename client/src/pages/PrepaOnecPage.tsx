import React from 'react'
import { Lock, BookOpen, TrendingUp, Scale, BarChart2, Cpu, Globe } from 'lucide-react'
import BackButton from '@/components/BackButton'
import { useUser } from '@/lib/userContext'
import { isStudentRole } from '@/lib/permissions'
import { useHashLocation } from 'wouter/use-hash-location'

// Les 6 UE du DSCG — toutes verrouillées pour l'instant
const UE_DSCG = [
  {
    code: 'UE 1',
    titre: 'Gestion juridique, fiscale et sociale',
    heures: '200h — 20 ECTS',
    description: 'Droit des sociétés, fiscalité des entreprises, droit social et relations de travail.',
    icon: Scale,
    color: 'from-purple-500/20 to-purple-600/10',
    border: 'border-purple-300/40',
    iconColor: 'text-purple-600',
  },
  {
    code: 'UE 2',
    titre: 'Finance',
    heures: '140h — 15 ECTS',
    description: 'Valeur, diagnostic financier, évaluation d\'entreprise, investissement, trésorerie et ingénierie financière.',
    icon: TrendingUp,
    color: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-300/40',
    iconColor: 'text-blue-600',
  },
  {
    code: 'UE 3',
    titre: 'Management et contrôle de gestion',
    heures: '200h — 20 ECTS',
    description: 'Stratégie, organisation, contrôle de gestion, tableaux de bord et performance.',
    icon: BarChart2,
    color: 'from-green-500/20 to-green-600/10',
    border: 'border-green-300/40',
    iconColor: 'text-green-600',
  },
  {
    code: 'UE 4',
    titre: 'Comptabilité et audit',
    heures: '200h — 20 ECTS',
    description: 'Comptabilité approfondie, consolidation, IFRS, normes d\'audit et commissariat aux comptes.',
    icon: BookOpen,
    color: 'from-amber-500/20 to-amber-600/10',
    border: 'border-amber-300/40',
    iconColor: 'text-amber-600',
  },
  {
    code: 'UE 5',
    titre: 'Management des systèmes d\'information',
    heures: '140h — 15 ECTS',
    description: 'Systèmes d\'information, gouvernance IT, sécurité et transformation numérique.',
    icon: Cpu,
    color: 'from-rose-500/20 to-rose-600/10',
    border: 'border-rose-300/40',
    iconColor: 'text-rose-600',
  },
  {
    code: 'UE 6',
    titre: 'Anglais des affaires',
    heures: 'Épreuve orale',
    description: 'Communication professionnelle en anglais dans les domaines comptable, fiscal et financier.',
    icon: Globe,
    color: 'from-teal-500/20 to-teal-600/10',
    border: 'border-teal-300/40',
    iconColor: 'text-teal-600',
  },
]

export default function PrepaOnecPage() {
  const user = useUser()
  const [, navigate] = useHashLocation()

  // Page réservée au staff — les étudiants ne doivent jamais arriver ici
  if (!user || isStudentRole(user)) {
    navigate('/')
    return null
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <BackButton />

      {/* En-tête */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Prépa ONEC</h1>
            <p className="text-sm text-muted-foreground">
              Préparation aux examens d'admission au stage — Ordre National des Experts-Comptables (RDC)
            </p>
          </div>
        </div>

        {/* Bandeau info */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
          <strong className="text-foreground">6 Unités d'Enseignement</strong> basées sur le programme DSCG —
          4 heures d'épreuve par UE, calculatrice seule autorisée, aucun document.
          Les modules seront déverrouillés progressivement.
        </div>
      </div>

      {/* Grille des 6 UE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {UE_DSCG.map((ue) => {
          const Icon = ue.icon
          return (
            <div
              key={ue.code}
              className={`
                relative rounded-2xl border bg-gradient-to-br ${ue.color} ${ue.border}
                p-5 space-y-3 opacity-80
                cursor-not-allowed select-none
              `}
            >
              {/* Cadenas en haut à droite */}
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  Bientôt disponible
                </div>
              </div>

              {/* Icône + code */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-background/60 backdrop-blur-sm">
                  <Icon className={`h-5 w-5 ${ue.iconColor}`} />
                </div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  {ue.code}
                </span>
              </div>

              {/* Titre */}
              <div>
                <h3 className="font-semibold text-foreground leading-tight">{ue.titre}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{ue.heures}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {ue.description}
              </p>

              {/* Overlay cadenas au survol */}
              <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-background/0 hover:bg-background/10 transition-colors" />
            </div>
          )
        })}
      </div>

      {/* Note de bas de page */}
      <p className="text-center text-xs text-muted-foreground pb-4">
        Les cas pratiques, exercices types et corrigés des sessions ONEC 2023–2026 seront intégrés module par module.
      </p>
    </div>
  )
}
