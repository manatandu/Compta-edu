import React from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import {
  BookOpen, BookMarked, ClipboardList, Clock, Users, GraduationCap,
} from 'lucide-react'
import { useAllCours, useFacultes, useUniversites, useAllSoumissions } from '@/lib/useFirestore'
import { getUsersAsync } from '@/lib/db-firebase'
import { useUser } from '@/lib/userContext'
import { isAdminRole } from '@/lib/permissions'
import { DashboardHero, greeting, type DashboardStat } from '@/components/DashboardHero'
import { DashboardModulesGrid } from '@/components/DashboardModulesGrid'
import { DashboardFooter } from '@/components/DashboardFooter'

// ─────────────────────────────────────────────────────────────────────────────
// TABLEAU DE BORD — ADMIN / PROFESSEUR / ASSISTANT
//
// Contrairement au tableau de bord étudiant, le staff n'a ici ni relevé de
// notes ni suivi de devoirs personnels à afficher : ce tableau de bord reste
// volontairement un simple point d'entrée (identité, quelques compteurs,
// accès rapide aux modules). Le vrai travail de suivi pédagogique — cours,
// progression, présences, cotes — vit dans l'Espace pédagogique
// (/professeurs), pas ici.
// ─────────────────────────────────────────────────────────────────────────────
export default function DashboardStaff() {
  const [, navigate] = useHashLocation()
  const user = useUser()

  const { cours: allCoursRaw } = useAllCours()
  const { facultes: allFacultes } = useFacultes()
  const { universites: allUniversites } = useUniversites()
  const { soumissions: toutesLesSoumissions } = useAllSoumissions()
  const [users, setUsers] = React.useState<any[]>([])

  React.useEffect(() => {
    getUsersAsync().then(setUsers).catch(() => {})
  }, [])

  const allCours = allCoursRaw.filter(c => c.actif)

  // Étudiants inscrits par ce professeur/admin (createdBy)
  const mesEtudiants = users.filter(u => {
    if (u.role !== 'etudiant') return false
    const cb = (u as any).createdBy
    if (!cb) return false
    return cb === user?.id || cb === (user as any)?.username
  })
  const nbEtudiants   = mesEtudiants.filter(u => u.actif && (u as any).statutInscription !== 'en_attente').length
  const nbEnAttente   = mesEtudiants.filter(u => (u as any).statutInscription === 'en_attente').length
  const nbNonCorriges = toutesLesSoumissions.filter(s => s.statut === 'soumis').length

  const stats: DashboardStat[] = [
    { label: 'Étudiants actifs', value: nbEtudiants,   icon: Users,         color: 'text-green-300' },
    { label: 'En attente',        value: nbEnAttente,   icon: Clock,         color: nbEnAttente > 0 ? 'text-amber-300' : 'text-blue-300/80' },
    { label: 'Non corrigés',      value: nbNonCorriges, icon: ClipboardList, color: nbNonCorriges > 0 ? 'text-rose-300' : 'text-blue-300/80' },
    { label: 'Cours',             value: allCours.length, icon: BookOpen,    color: 'text-blue-300/80' },
  ]

  const identity = (
    <>
      {/* Prof / Assistant : faculté → université */}
      {user?.role !== 'admin' && (
        <div className="mt-1 space-y-0.5">
          {(() => {
            const fId = (user as any)?.faculteId
            if (!fId) return null
            const fac = allFacultes.find(f => f.id === fId)
            return fac ? (
              <p className="text-sm text-white/75 flex items-center gap-1.5">
                <BookMarked className="h-3.5 w-3.5 text-secondary shrink-0" />
                <span>{fac.nom}</span>
              </p>
            ) : null
          })()}
          {(() => {
            const uId = (user as any)?.universiteId
            if (!uId) return null
            const uni = allUniversites.find(u => u.id === uId)
            return uni ? (
              <p className="text-sm text-white/75 flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 text-secondary shrink-0" />
                <span>{uni.nom}</span>
              </p>
            ) : null
          })()}
        </div>
      )}

      {/* Admin principal : mention assistant */}
      {isAdminRole(user) && (
        <p className="text-sm text-white/75 mt-1">
          Assistant : <span className="text-secondary font-semibold">Manasse TANDU SAVA</span>
        </p>
      )}
    </>
  )

  return (
    <div className="space-y-6 pb-8">
      <DashboardHero
        greeting={`${greeting()}${user?.prenom ? ` ${user.prenom.toUpperCase()}` : ''} !`}
        identity={identity}
        stats={stats}
      />
      <DashboardModulesGrid navigate={navigate} />
      <DashboardFooter />
    </div>
  )
}
