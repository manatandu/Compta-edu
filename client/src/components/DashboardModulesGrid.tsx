import React from 'react'
import { LibraryBig, BookMarked, GraduationCap, FolderOpen, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { COURS_SYSTEME } from '@/lib/db-firebase'

// ─────────────────────────────────────────────────────────────────────────────
// GRILLE DE MODULES - identique pour l'étudiant et le staff, donc extraite une
// bonne fois plutôt que dupliquée dans les deux tableaux de bord.
//
// `afficherMesCours` : la tuile « Mes cours » fait doublon quand le tableau
// « Mes cours ce semestre » la précède déjà sur la même page - pire, les deux
// annonçaient des nombres différents (la tuile comptait le catalogue système,
// le tableau les cours de l'étudiant). L'appelant qui affiche déjà ce tableau
// passe donc false. Par défaut la tuile reste affichée (cas du staff, et cas
// de l'étudiant sans cours inscrit, où aucun tableau ne la précède).
// ─────────────────────────────────────────────────────────────────────────────
export function DashboardModulesGrid({ navigate, afficherMesCours = true }: {
  navigate: (path: string) => void
  afficherMesCours?: boolean
}) {
  return (
    <div className="animate-slideRight" style={{ animationDelay: '600ms' }}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-display font-semibold text-foreground">Modules</h2>
        <span className="text-xs text-muted-foreground">Accès rapide à tous les outils</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {/* Carreau Mes cours */}
        {afficherMesCours && (
        <button
          onClick={() => navigate('/mes-cours')}
          className={cn(
            'group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 text-left',
            'transition-all duration-200 hover:bg-muted/40 hover:border-primary/30 hover:shadow-sm',
            'animate-scaleIn'
          )}
          style={{ animationDelay: '650ms' }}
        >
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <LibraryBig className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm text-foreground leading-tight">Mes cours</p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{COURS_SYSTEME.filter(c => c.actif).length} cours actifs</p>
          </div>
          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
        </button>
        )}

        {/* Carreau Bibliothèque */}
        <button
          onClick={() => navigate('/dictionnaire')}
          className={cn(
            'group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 text-left',
            'transition-all duration-200 hover:bg-muted/40 hover:border-violet-300/30 hover:shadow-sm',
            'animate-scaleIn'
          )}
          style={{ animationDelay: '700ms' }}
        >
          <div className="h-10 w-10 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center">
            <BookMarked className="h-5 w-5" />
          </div>
          <div className="flex-1">
            {/* Cette tuile s'intitulait « Bibliothèque » et annonçait « Lois, textes
                officiels PDF » - deux erreurs : elle mène au Dictionnaire, un
                glossaire de termes, et ce sont « Documents » qui portent les PDF.
                Nom aligné sur celui de la barre latérale et de la page elle-même.
                Le nombre de termes n'est volontairement pas affiché : importer
                le catalogue ici ferait télécharger ses 212 ko à toute ouverture
                du tableau de bord, alors qu'il est aujourd'hui chargé à la
                demande, avec la page Dictionnaire seule. */}
            <p className="font-bold text-sm text-foreground leading-tight">Dictionnaire</p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-tight">Termes de compta, fiscalité, droit</p>
          </div>
          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all duration-200" />
        </button>

        {/* Carreau Exercices */}
        <button
          onClick={() => navigate('/exercices')}
          className={cn(
            'group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 text-left',
            'transition-all duration-200 hover:bg-muted/40 hover:border-orange-300/30 hover:shadow-sm',
            'animate-scaleIn'
          )}
          style={{ animationDelay: '800ms' }}
        >
          <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm text-foreground leading-tight">Exercices</p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-tight">Pratiquer &amp; s&apos;évaluer</p>
          </div>
          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all duration-200" />
        </button>

        {/* Carreau Documents */}
        <button
          onClick={() => navigate('/documents')}
          className={cn(
            'group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 text-left',
            'transition-all duration-200 hover:bg-muted/40 hover:border-teal-300/30 hover:shadow-sm',
            'animate-scaleIn'
          )}
          style={{ animationDelay: '850ms' }}
        >
          <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <FolderOpen className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm text-foreground leading-tight">Documents</p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-tight">Ressources pédagogiques</p>
          </div>
          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all duration-200" />
        </button>
      </div>
    </div>
  )
}
