import React from 'react'

// Pied de page du tableau de bord — identique pour l'étudiant et le staff.
export function DashboardFooter() {
  return (
    <div
      className="flex items-center justify-center gap-2 pt-2 animate-fadeIn"
      style={{ animationDelay: '1400ms' }}
    >
      <div className="h-px flex-1 bg-border" />
      <div className="flex flex-col items-center px-3">
        <p className="text-xs text-muted-foreground">
          Orbit © {new Date().getFullYear()} : SYSCOHADA Révisé
        </p>
        <p className="text-xs text-muted-foreground/60 mt-0.5">
          Propriété de Manassé TANDU
        </p>
      </div>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}
