import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Bell, X, CheckCircle2, UserPlus, Clock, BookOpen, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useHashLocation } from 'wouter/use-hash-location'
import { useAllSoumissions, useAllDevoirs } from '@/lib/useFirestore'
import { getUsersAsync } from '@/lib/db-firebase'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Notif {
  id: string
  type: 'inscription' | 'correction' | 'qcm_soumis'
  titre: string
  desc: string
  date: string        // ISO
  action: () => void
}

interface NotificationBellProps {
  user: any
}

// ─── Utilitaire : temps relatif ───────────────────────────────────────────────
function tempsRelatif(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const min = Math.floor(diff / 60000)
  if (min < 1) return 'À l\'instant'
  if (min < 60) return `Il y a ${min} min`
  const h = Math.floor(min / 60)
  if (h < 24) return `Il y a ${h}h`
  const j = Math.floor(h / 24)
  return `Il y a ${j} jour${j > 1 ? 's' : ''}`
}

// ─── Clé localStorage pour les notifications lues ────────────────────────────
function cleVues(userId: string) { return `notif_vues_${userId}` }

function getVues(userId: string): Set<string> {
  try {
    const raw = localStorage.getItem(cleVues(userId))
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch { return new Set() }
}

function saveVues(userId: string, vues: Set<string>) {
  try {
    localStorage.setItem(cleVues(userId), JSON.stringify([...vues]))
  } catch {}
}

// ─── Composant ────────────────────────────────────────────────────────────────
export function NotificationBell({ user }: NotificationBellProps) {
  const [open, setOpen] = useState(false)
  const [vues, setVues] = useState<Set<string>>(new Set())
  const [panelPos, setPanelPos] = useState<{top: number, right: number}>({top: 0, right: 0})
  const ref = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [, navigate] = useHashLocation()

  const isAdmin = ['admin', 'professeur', 'assistant'].includes(user?.role || '')

  // Données Firebase
  const { soumissions: toutesLesSoumissions } = useAllSoumissions()
  const { devoirs: tousLesDevoirs } = useAllDevoirs()
  const [usersEnAttente, setUsersEnAttente] = useState<any[]>([])

  // Charger les notifications vues au montage
  useEffect(() => {
    if (user?.id) setVues(getVues(user.id))
  }, [user?.id])

  // Charger les inscriptions en attente
  useEffect(() => {
    if (!isAdmin || !user?.id) return
    getUsersAsync().then(users => {
      const enAttente = users.filter(u => {
        if (u.role !== 'etudiant') return false
        const cb = (u as any).createdBy
        if (!cb) return false
        if (cb !== user?.id && cb !== user?.username) return false
        return (u as any).statutInscription === 'en_attente'
      })
      setUsersEnAttente(enAttente)
    }).catch(() => {})
  }, [user?.id, user?.username, isAdmin])

  // Fermer au clic extérieur
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  // Construire les notifications
  const notifications: Notif[] = isAdmin ? [
    // 1. Inscriptions en attente
    ...usersEnAttente.map(u => ({
      id: `inscription-${u.id}`,
      type: 'inscription' as const,
      titre: `${u.nom || ''} ${u.prenom || ''}`.trim() || u.username || 'Étudiant',
      desc: 'Demande d\'inscription en attente de validation',
      date: (u as any).dateCreation || new Date().toISOString(),
      action: () => { navigate('/professeurs'); setOpen(false) },
    })),

    // 2. Soumissions pratiques/théoriques à corriger manuellement
    ...toutesLesSoumissions
      .filter(s => s.statut === 'soumis')
      .slice(0, 15)
      .map(s => {
        const devoir = tousLesDevoirs.find(d => d.id === s.devoirId)
        return {
          id: `correction-${s.id}`,
          type: 'correction' as const,
          titre: devoir?.titre || 'Devoir à corriger',
          desc: `Soumis le ${s.dateSoumission ? new Date(s.dateSoumission).toLocaleDateString('fr-FR') : 'Date inconnue'}`,
          date: s.dateSoumission || new Date().toISOString(),
          action: () => { navigate('/professeurs'); setOpen(false) },
        }
      }),
  ] : []

  // Trier par date décroissante
  notifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Compter les non-lues
  const nonLues = notifications.filter(n => !vues.has(n.id))
  const nbNonLues = nonLues.length

  // Marquer toutes comme lues
  const marquerToutesLues = useCallback(() => {
    const nouvVues = new Set([...vues, ...notifications.map(n => n.id)])
    setVues(nouvVues)
    if (user?.id) saveVues(user.id, nouvVues)
  }, [vues, notifications, user?.id])

  // Ouvrir le panneau et marquer toutes comme lues immediatement
  const handleOpen = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setPanelPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right })
    }
    setOpen(v => {
      const newOpen = !v
      if (newOpen && nbNonLues > 0) marquerToutesLues()
      return newOpen
    })
  }

  // Icône de type
  function IconeType({ type }: { type: Notif['type'] }) {
    if (type === 'inscription') return (
      <div className="h-8 w-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
        <UserPlus className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      </div>
    )
    if (type === 'correction') return (
      <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
        <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      </div>
    )
    return (
      <div className="h-8 w-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0">
        <BookOpen className="h-4 w-4 text-violet-600 dark:text-violet-400" />
      </div>
    )
  }

  if (!isAdmin) return null

  return (
    <div ref={ref} className="relative">
      {/* Bouton cloche */}
      <button
        ref={btnRef}
        onClick={handleOpen}
        className={cn(
          'relative flex items-center justify-center h-9 w-9 rounded-lg transition-colors',
          open ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
        aria-label="Notifications"
      >
        <Bell className="h-[18px] w-[18px]" />
        {nbNonLues > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground leading-none shadow-sm animate-pulse">
            {nbNonLues > 9 ? '9+' : nbNonLues}
          </span>
        )}
      </button>

      {/* Panneau */}
      {open && (
        <div
          className="fixed z-[9999] w-80 rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
          style={{ top: panelPos.top, right: panelPos.right }}
        >

          {/* En-tête */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm text-foreground">Notifications</span>
              {nbNonLues > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-destructive text-destructive-foreground font-bold">
                  {nbNonLues} nouvelle{nbNonLues > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {nbNonLues > 0 && (
                <button
                  onClick={marquerToutesLues}
                  className="text-[11px] text-primary hover:underline font-medium"
                >
                  Tout lire
                </button>
              )}
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Liste */}
          <div className="max-h-80 overflow-y-auto divide-y divide-border">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center px-4">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <p className="text-sm font-semibold text-foreground">Tout est à jour</p>
                <p className="text-xs text-muted-foreground mt-1">Aucune action en attente</p>
              </div>
            ) : (
              notifications.map(n => {
                const lue = vues.has(n.id)
                return (
                  <button
                    key={n.id}
                    onClick={n.action}
                    className={cn(
                      'w-full flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left',
                      !lue && 'bg-primary/3'
                    )}
                  >
                    <IconeType type={n.type} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        {!lue && <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />}
                        <p className="text-sm font-medium text-foreground truncate">{n.titre}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{n.desc}</p>
                      <p className="text-[11px] text-muted-foreground/70 mt-1">{tempsRelatif(n.date)}</p>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 mt-1 shrink-0" />
                  </button>
                )
              })
            )}
          </div>

          {/* Pied */}
          {notifications.length > 0 && (
            <div className="px-4 py-2.5 border-t border-border bg-muted/20 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {notifications.length} notification{notifications.length > 1 ? 's' : ''} au total
              </span>
              <button
                onClick={() => { navigate('/professeurs'); setOpen(false) }}
                className="text-xs text-primary hover:underline font-medium"
              >
                Espace admin →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
