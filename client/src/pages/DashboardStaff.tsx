import React from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import {
  BookOpen, BookMarked, ClipboardList, Clock, Users, GraduationCap,
} from 'lucide-react'
import { useAllCours, useFacultes, useUniversites, useAllSoumissions, useDevoirs } from '@/lib/useFirestore'
import { getUsersAsync, COURS_SYSTEME } from '@/lib/db-firebase'
import { useUser } from '@/lib/userContext'
import { isAdminRole } from '@/lib/permissions'
import { DashboardHero, greeting, type DashboardStat } from '@/components/DashboardHero'
import { DashboardModulesGrid } from '@/components/DashboardModulesGrid'
import { DashboardFooter } from '@/components/DashboardFooter'

// ─────────────────────────────────────────────────────────────────────────────
// TABLEAU DE BORD - ADMIN / PROFESSEUR / ASSISTANT
//
// Le staff n'a ici ni relevé de notes ni devoirs personnels : le travail de
// suivi pédagogique lui-même - cours, progression, présences, cotes - vit
// dans l'Espace pédagogique (/professeurs), pas ici. Cette page reste donc un
// simple point d'entrée.
//
// Une section « Ce qui m'attend » (copies à corriger, inscriptions à valider)
// a été essayée puis retirée : les deux actions qu'elle proposait n'existent
// pas dans l'application.
//   - Corriger une copie : le seul bouton qui ouvre la fenêtre de correction
//     vit dans l'onglet « Devoirs » de ProfesseurPage, désactivé en dur
//     (`{false && ...}`, commentaire « désactivé - devoirs depuis chapitres »).
//   - Valider une inscription : `statutInscription` n'est écrit qu'une fois,
//     à 'en_attente' (LoginPage), et jamais modifié ensuite ; l'activation
//     d'un compte (`actif`) n'est proposée que dans l'onglet « Prof /
//     Assistants », qui ne liste que les admins (`role === 'admin'`).
// Tant que ces deux actions n'existent pas, les compteurs correspondants
// restent de simples indicateurs : les rendre cliquables ne ferait que
// promettre une action impossible.
// ─────────────────────────────────────────────────────────────────────────────
export default function DashboardStaff() {
  const [, navigate] = useHashLocation()
  const user = useUser()

  const { cours: allCoursRaw } = useAllCours()
  const { facultes: allFacultes } = useFacultes()
  const { universites: allUniversites } = useUniversites()
  const { soumissions: toutesLesSoumissions } = useAllSoumissions()
  const { devoirs: mesDevoirs } = useDevoirs(user?.id)
  const [users, setUsers] = React.useState<any[]>([])

  React.useEffect(() => {
    getUsersAsync().then(setUsers).catch(() => {})
  }, [])

  // Compte les UE distinctes, pas les instances par faculté : depuis que
  // chaque UE active est auto-provisionnée dans toutes les facultés
  // (provisionCoursManquantsAsync), un cours système actif donne autant de
  // documents Cours que de facultés - le compter tel quel gonflait le
  // chiffre affiché ici (ex. 6 UE actives × 7 facultés = 42 « cours »).
  // On déduplique par coursSystemeId pour retomber sur le nombre d'UE.
  const coursSystemeInactifsIds = new Set(COURS_SYSTEME.filter(c => !c.actif).map(c => c.id))
  const vusCoursSysteme = new Set<string>()
  const allCours = allCoursRaw.filter(c => {
    if (!c.actif) return false
    const csId = (c as any).coursSystemeId as string | undefined
    if (csId && coursSystemeInactifsIds.has(csId)) return false
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
    return cb === user?.id || cb === (user as any)?.username
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
    { label: 'Étudiants actifs', value: nbEtudiants,   icon: Users,         color: 'text-green-300', onClick: () => navigate('/gestion-etudiants') },
    { label: 'En attente',        value: nbEnAttente,   icon: Clock,         color: nbEnAttente > 0 ? 'text-amber-300' : 'text-blue-300/80' },
    { label: 'Non corrigés',      value: nbNonCorriges, icon: ClipboardList, color: nbNonCorriges > 0 ? 'text-rose-300' : 'text-blue-300/80' },
    { label: 'Cours',             value: allCours.length, icon: BookOpen,    color: 'text-blue-300/80', onClick: () => navigate('/professeurs') },
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
