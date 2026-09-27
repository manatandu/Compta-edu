import React from 'react'
import { useHashLocation } from '@/lib/hashLocation'
import {
  BookOpen, BookMarked, ClipboardList, Clock, Users, GraduationCap,
} from 'lucide-react'
import { useAllCours, useFacultes, useUniversites, useAllSoumissions, useDevoirs } from '@/lib/useFirestore'
import { getEtudiantsCreesParAsync, COURS_RETIRES_IDS } from '@/lib/db-firebase'
import { useEquipe, creeParEquipe } from '@/lib/equipe'
import { useUser } from '@/lib/userContext'
import { isAdminRole } from '@/lib/permissions'
import { DashboardHero, greeting, type DashboardStat } from '@/components/DashboardHero'
import { DashboardModulesGrid } from '@/components/DashboardModulesGrid'
import { DashboardFooter } from '@/components/DashboardFooter'

// ─────────────────────────────────────────────────────────────────────────────
// TABLEAU DE BORD - ADMIN / PROFESSEUR / ASSISTANT
//
// Le suivi pédagogique lui-même (étudiants, devoirs, copies, progression,
// présences, cotes) vit dans l'Espace pédagogique (/professeurs). Cette page
// en est le point d'entrée : chaque compteur ouvre l'onglet correspondant.
// ─────────────────────────────────────────────────────────────────────────────
export default function DashboardStaff() {
  const [, navigate] = useHashLocation()
  const user = useUser()

  const { cours: allCoursRaw } = useAllCours()
  const { facultes: allFacultes } = useFacultes()
  const { universites: allUniversites } = useUniversites()
  const { soumissions: toutesLesSoumissions } = useAllSoumissions()
  // Équipe pédagogique (titulaire + assistants) : devoirs et étudiants partagés.
  const equipe = useEquipe()
  const { devoirs: mesDevoirs } = useDevoirs(equipe?.ids)
  const [users, setUsers] = React.useState<any[]>([])

  // Seuls les étudiants rattachés à ce compte sont lus (requête sur createdBy),
  // pas toute la collection users : le tableau de bord n'affiche qu'eux.
  const refsEquipe = equipe?.refs.join(',') || ''
  React.useEffect(() => {
    if (!user?.id) return
    getEtudiantsCreesParAsync({ id: user.id, username: (user as any).username }, undefined, equipe?.refs || [])
      .then(setUsers).catch(() => {})
  }, [user?.id, refsEquipe])

  // Compte les UE distinctes, pas les instances par faculté : depuis que
  // chaque UE active est auto-provisionnée dans toutes les facultés
  // (provisionCoursManquantsAsync), un cours système actif donne autant de
  // documents Cours que de facultés - le compter tel quel gonflait le
  // chiffre affiché ici (ex. 6 UE actives × 7 facultés = 42 « cours »).
  // On déduplique par coursSystemeId pour retomber sur le nombre d'UE.
  const vusCoursSysteme = new Set<string>()
  const allCours = allCoursRaw.filter(c => {
    if (!c.actif) return false
    const csId = (c as any).coursSystemeId as string | undefined
    if (csId && COURS_RETIRES_IDS.has(csId)) return false
    const key = csId || c.id
    if (vusCoursSysteme.has(key)) return false
    vusCoursSysteme.add(key)
    return true
  })

  // Étudiants inscrits par ce professeur/admin (createdBy)
  const mesEtudiants = users.filter(u => {
    if (u.role !== 'etudiant') return false
    const cb = (u as any).createdBy
    if (!cb) return false
    return cb === user?.id || cb === (user as any)?.username || creeParEquipe(cb, equipe)
  })
  const nbEtudiants   = mesEtudiants.filter(u => u.actif && (u as any).statutInscription !== 'en_attente').length
  const nbEnAttente   = mesEtudiants.filter(u => (u as any).statutInscription === 'en_attente').length
  // Copies en attente sur MES devoirs uniquement. Le filtre portait auparavant
  // sur toutes les soumissions de la plateforme, sans distinction d'auteur :
  // le bandeau annonçait donc des copies à corriger appartenant aux devoirs
  // d'autres membres du staff, que l'utilisateur ne voit ni ne peut corriger
  // (l'onglet « Copies à corriger » est, lui, filtré sur ses propres devoirs).
  // Même portée que « En attente », déjà restreint via mesEtudiants/createdBy.
  const nbNonCorriges = toutesLesSoumissions.filter(
    s => s.statut === 'soumis' && mesDevoirs.some(d => d.id === s.devoirId)
  ).length

  const stats: DashboardStat[] = [
    { label: 'Étudiants actifs', value: nbEtudiants,   icon: Users,         color: 'text-green-300', onClick: () => navigate('/professeurs?tab=etudiants') },
    { label: 'En attente',        value: nbEnAttente,   icon: Clock,         color: nbEnAttente > 0 ? 'text-amber-300' : 'text-blue-300/80', onClick: () => navigate('/professeurs?tab=inscriptions') },
    { label: 'Non corrigés',      value: nbNonCorriges, icon: ClipboardList, color: nbNonCorriges > 0 ? 'text-rose-300' : 'text-blue-300/80', onClick: () => navigate('/professeurs?tab=copies') },
    // « Cours » n'est un onglet que pour l'administrateur ; l'enseignant
    // retrouve ses cours dans Mes cours.
    { label: 'Cours',             value: allCours.length, icon: BookOpen,    color: 'text-blue-300/80', onClick: () => navigate(user?.role === 'admin' ? '/professeurs?tab=cours' : '/mes-cours') },
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
    <div className="space-y-6 pb-8 animate-fadeIn">
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
