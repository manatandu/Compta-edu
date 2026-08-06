import React from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { useGoBack } from '@/lib/navContext'
import { ChevronRight, Lock, BookOpen, ArrowLeft } from 'lucide-react'
import { useAllCours } from '@/lib/useFirestore'
import { COURS_SYSTEME } from '@/lib/db-firebase'
import { useUser } from '@/lib/userContext'
import { isStudentRole } from '@/lib/permissions'
import { cn } from '@/lib/utils'

// Cycle sur la palette « module » de la marque Orbit (5 teintes définies dans
// index.css) plutôt que des couleurs Tailwind ad hoc sans rapport avec l'identité.
const UE_COLORS = [
  'bg-module-blue/10 text-module-blue',
  'bg-module-violet/10 text-module-violet',
  'bg-module-teal/10 text-module-teal',
  'bg-module-rose/10 text-module-rose',
  'bg-module-emerald/10 text-module-emerald',
]

const ROUTES_CONNUES = ['comptabilite-generale', 'fiscalite', 'analyse-financiere', 'ue2-droit-societes', 'ue5-finances-publiques', 'ue13-ifrs-ias']

export default function MesCoursPage() {
  const [, navigate] = useHashLocation()
  const goBack = useGoBack('/')
  const user = useUser()
  const isStudent = isStudentRole(user)
  const { cours: allCoursRaw } = useAllCours()
  const allCours = allCoursRaw.filter(c => c.actif)
  const userCoursIds: string[] = (user as any)?.coursIds || []
  const userCours = allCours.filter(c => userCoursIds.includes(c.id))
  const coursBloque = isStudent && allCours.length > 0 && userCours.length === 0

  const nbActifs = COURS_SYSTEME.filter(c => c.actif).length

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
          <h1 className="font-display text-xl font-bold text-foreground leading-tight">Mes cours</h1>
          <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">{nbActifs} cours actifs · {COURS_SYSTEME.length} UE au total</p>
        </div>
      </div>

      {/* Contenu */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        {/* Étudiant sans cours assigné */}
        {coursBloque ? (
          <div className="p-10 text-center">
            <div className="text-4xl mb-3">📖</div>
            <p className="font-semibold text-amber-800">Aucun cours assigné</p>
            <p className="text-sm text-muted-foreground mt-1">
              Tu n&apos;es inscrit à aucun cours pour le moment.<br />
              Contacte ton professeur pour être inscrit à un cours.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {COURS_SYSTEME.map((cours, i) => {
              const couleur = UE_COLORS[i % UE_COLORS.length]
              const path = `/${cours.moduleKey}`
              const estActif = !!cours.actif && ROUTES_CONNUES.includes(cours.moduleKey)
              const estVerrouilleEtudiant = isStudent && estActif && !userCoursIds.includes(cours.id)
              const estInactif = !cours.actif
              const bloque = estVerrouilleEtudiant || estInactif

              return bloque ? (
                <div
                  key={cours.id}
                  title={estVerrouilleEtudiant ? "Tu n'es pas inscrit(e) à ce cours" : 'Bientôt disponible'}
                  className="flex items-center gap-3 px-4 py-4 opacity-50 cursor-not-allowed"
                >
                  <div className={cn('h-9 w-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold', couleur)}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm leading-tight truncate">{cours.nom}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{cours.description}</p>
                  </div>
                  <Lock className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
                </div>
              ) : (
                <button
                  key={cours.id}
                  onClick={() => navigate(path)}
                  className="group w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-muted/40 transition-colors duration-150"
                >
                  <div className={cn(
                    'h-9 w-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold',
                    'transition-transform duration-200 group-hover:scale-110',
                    couleur
                  )}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors truncate">{cours.nom}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{cours.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
