import React from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import {
  BookOpen, BookMarked, ClipboardList, Clock, Users, GraduationCap,
  CheckCircle2, ChevronRight,
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
// Le staff n'a ici ni relevé de notes ni devoirs personnels : le travail de
// suivi pédagogique lui-même — cours, progression, présences, cotes — vit
// dans l'Espace pédagogique (/professeurs), pas ici. Cette page reste donc un
// point d'entrée, mais un point d'entrée qui dit ce qui attend : les copies à
// corriger et les inscriptions à valider étaient jusqu'ici affichées comme de
// simples compteurs inertes dans le bandeau, alors que ce sont précisément les
// deux choses qui appellent une action. Elles sont désormais cliquables et
// mènent là où l'action se fait.
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

  // Ce qui appelle une action de la part du staff, dans l'ordre où il faut s'en
  // occuper : une copie rendue attend une note, une inscription attend un accord.
  // Les deux destinations reprennent celles déjà utilisées par la cloche de
  // notifications, qui renvoie également vers l'Espace pédagogique.
  const enAttente = [
    {
      cle: 'corrections',
      nombre: nbNonCorriges,
      label: nbNonCorriges > 1 ? 'copies à corriger' : 'copie à corriger',
      icon: ClipboardList,
      classeIcone: 'bg-rose-50 text-rose-600',
      vers: '/professeurs',
    },
    {
      cle: 'inscriptions',
      nombre: nbEnAttente,
      label: nbEnAttente > 1 ? 'inscriptions à valider' : 'inscription à valider',
      icon: Clock,
      classeIcone: 'bg-amber-50 text-amber-600',
      vers: '/professeurs',
    },
  ].filter(item => item.nombre > 0)

  return (
    <div className="space-y-6 pb-8">
      <DashboardHero
        greeting={`${greeting()}${user?.prenom ? ` ${user.prenom.toUpperCase()}` : ''} !`}
        identity={identity}
        stats={stats}
      />

      {/* ══ CE QUI M'ATTEND ══════════════════════════════════════════════════ */}
      <div className="animate-slideUp" style={{ animationDelay: '450ms' }}>
        <h2 className="text-base font-display font-semibold text-foreground mb-3">Ce qui m&apos;attend</h2>
        {enAttente.length === 0 ? (
          <div className="rounded-xl border border-border bg-card px-4 py-3 flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
            <p className="text-sm text-muted-foreground">Rien en attente : tout est corrigé et validé.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {enAttente.map((item, i) => {
              const Icon = item.icon
              return (
                <button
                  key={item.cle}
                  onClick={() => navigate(item.vers)}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-left flex items-center gap-3 hover:bg-muted/40 hover:border-primary/30 transition-colors animate-slideUp"
                  style={{ animationDelay: `${500 + i * 60}ms` }}
                >
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${item.classeIcone}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="flex-1 text-sm text-foreground">
                    <span className="font-semibold tabular-nums">{item.nombre}</span> {item.label}
                  </p>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                </button>
              )
            })}
          </div>
        )}
      </div>

      <DashboardModulesGrid navigate={navigate} />
      <DashboardFooter />
    </div>
  )
}
