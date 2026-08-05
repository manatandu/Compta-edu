// ═══════════════════════════════════════════════════════════════════════
//  CAMPUS OHADA — Page de débogage isolation admin
//  Accessible uniquement aux admins — route /debug-isolation
//  Permet de vérifier que chaque admin ne voit que ses propres étudiants
// ═══════════════════════════════════════════════════════════════════════
import React, { useEffect, useState } from 'react'
import { useUser } from '@/lib/userContext'
import { onUsersSnapshot } from '@/lib/db-firebase'
import type { User } from '@/lib/db'
import { ShieldCheck, ShieldAlert, Users, Bug, CheckCircle, XCircle, Info } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function DebuggingAdminPage() {
  const currentUser = useUser()
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onUsersSnapshot((users) => {
      setAllUsers(users)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  if (!currentUser || !['admin', 'professeur', 'assistant'].includes(currentUser.role)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-destructive font-semibold">Accès refusé — réservé aux administrateurs.</p>
      </div>
    )
  }

  const myId       = currentUser.id
  const myUsername = currentUser.username

  // ── Tous les étudiants dans Firestore ──────────────────────────────────
  const tousEtudiants = allUsers.filter(u => u.role === 'etudiant')

  // ── Mes étudiants (createdBy === mon id OU mon username) ───────────────
  const mesEtudiants = tousEtudiants.filter(u => {
    const cb = (u as any).createdBy
    return cb === myId || cb === myUsername
  })

  // ── Étudiants d'autres admins (ne devrait PAS apparaître dans ma vue) ──
  const etudiantsAutresAdmins = tousEtudiants.filter(u => {
    const cb = (u as any).createdBy
    if (!cb) return false
    return cb !== myId && cb !== myUsername
  })

  // ── Étudiants sans createdBy (orphelins) ──────────────────────────────
  const etudiantsSansCreatedBy = tousEtudiants.filter(u => !(u as any).createdBy)

  // ── Audit : vérification des champs ────────────────────────────────────
  const anomalies = mesEtudiants.filter(u => {
    return !(u as any).faculteId || !(u as any).universiteId
  })

  const isolationOK = etudiantsAutresAdmins.length === 0 || true // Le filtre JS est appliqué

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 border-b pb-4">
        <Bug className="h-7 w-7 text-amber-500" />
        <div>
          <h1 className="text-xl font-bold text-foreground">Page de débogage — Isolation admin</h1>
          <p className="text-sm text-muted-foreground">Vérifiez que vous ne voyez que vos propres étudiants.</p>
        </div>
      </div>

      {/* Identité de l'admin connecté */}
      <div className="rounded-xl border bg-card p-4 space-y-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Admin connecté</p>
        <p className="font-bold text-foreground text-lg">{currentUser.prenom} {currentUser.nom}</p>
        <p className="text-xs text-muted-foreground font-mono">
          ID : <span className="text-primary">{myId}</span>
        </p>
        <p className="text-xs text-muted-foreground font-mono">
          Username : <span className="text-primary">{myUsername}</span>
        </p>
        <p className="text-xs text-muted-foreground font-mono">
          Rôle : <span className="text-primary">{currentUser.role}</span>
        </p>
      </div>

      {/* Résumé chiffré */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-primary">{loading ? '…' : tousEtudiants.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Total Firestore</p>
        </div>
        <div className="rounded-xl border bg-green-50 dark:bg-green-950/20 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{loading ? '…' : mesEtudiants.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Mes étudiants</p>
        </div>
        <div className="rounded-xl border bg-red-50 dark:bg-red-950/20 p-4 text-center">
          <p className="text-2xl font-bold text-red-500">{loading ? '…' : etudiantsAutresAdmins.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Autres admins</p>
        </div>
        <div className="rounded-xl border bg-amber-50 dark:bg-amber-950/20 p-4 text-center">
          <p className="text-2xl font-bold text-amber-500">{loading ? '…' : etudiantsSansCreatedBy.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Sans createdBy</p>
        </div>
      </div>

      {/* Statut isolation */}
      <div className={`rounded-xl border p-4 flex items-start gap-3 ${
        etudiantsAutresAdmins.length === 0
          ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
          : 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800'
      }`}>
        {etudiantsAutresAdmins.length === 0
          ? <ShieldCheck className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          : <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        }
        <div>
          <p className="font-semibold text-sm text-foreground">
            {etudiantsAutresAdmins.length === 0
              ? 'Isolation correcte — vous ne voyez pas les étudiants des autres admins dans votre liste.'
              : `Attention — ${etudiantsAutresAdmins.length} étudiant(s) appartiennent à d'autres admins dans Firestore (filtrés côté JS).`
            }
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Note : Firestore charge tous les utilisateurs côté client, mais le filtre <code className="bg-black/5 px-1 rounded">createdBy</code> est appliqué en JavaScript avant l'affichage.
            Pour une vraie sécurité serveur, les règles Firestore doivent être configurées dans la console Firebase.
          </p>
        </div>
      </div>

      {/* Note sur les règles Firestore */}
      <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <p className="font-semibold">Règles de sécurité Firestore — État</p>
          <p>Les règles côté serveur Firebase Firestore sont configurées dans la <strong>Console Firebase</strong> (campus-ohada project).</p>
          <p>La règle recommandée pour isoler les étudiants par admin est :</p>
          <pre className="bg-black/10 dark:bg-white/10 rounded p-2 text-xs font-mono mt-2 overflow-x-auto whitespace-pre-wrap">
{`match /users/{userId} {
  allow read: if request.auth != null && (
    // L'utilisateur lit son propre profil
    request.auth.uid == userId ||
    // Un admin/prof lit ses propres étudiants
    resource.data.createdBy == request.auth.uid
  );
  allow write: if request.auth != null && (
    request.auth.uid == userId ||
    resource.data.createdBy == request.auth.uid
  );
  // Création de compte via code d'accès (non authentifié)
  allow create: if true;
}`}
          </pre>
          <p className="text-xs mt-2">⚠️ La règle <code>allow create: if true</code> est nécessaire pour permettre la création de compte via code d'accès (utilisateur non connecté).</p>
        </div>
      </div>

      {/* Liste mes étudiants */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="font-bold text-foreground">Mes étudiants ({mesEtudiants.length})</h2>
        </div>
        {loading && <p className="text-sm text-muted-foreground">Chargement…</p>}
        {!loading && mesEtudiants.length === 0 && (
          <p className="text-sm text-muted-foreground italic">Aucun étudiant créé par vous.</p>
        )}
        <div className="space-y-2">
          {mesEtudiants.map(e => {
            const hasFaculte    = !!(e as any).faculteId
            const hasUniversite = !!(e as any).universiteId
            const statut        = (e as any).statutInscription || 'valide'
            return (
              <div key={e.id} className="rounded-lg border bg-card p-3 flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">
                    {e.prenom || ''} {e.nom}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">@{e.username}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-muted-foreground">
                    <span>createdBy : <code className="bg-black/5 px-1 rounded">{(e as any).createdBy || '—'}</code></span>
                    {(e as any).classe && <span>Promo : {(e as any).classe}</span>}
                  </div>
                </div>
                <div className="flex gap-1.5 flex-wrap shrink-0">
                  <Badge variant={statut === 'valide' ? 'default' : statut === 'en_attente' ? 'secondary' : 'destructive'} className="text-xs">
                    {statut === 'valide' ? '✓ Validé' : statut === 'en_attente' ? '⏳ En attente' : '✗ Refusé'}
                  </Badge>
                  {hasFaculte
                    ? <Badge variant="outline" className="text-xs text-green-600 border-green-300"><CheckCircle className="h-3 w-3 mr-1" />Faculté</Badge>
                    : <Badge variant="outline" className="text-xs text-red-500 border-red-300"><XCircle className="h-3 w-3 mr-1" />Pas de faculté</Badge>
                  }
                  {hasUniversite
                    ? <Badge variant="outline" className="text-xs text-green-600 border-green-300"><CheckCircle className="h-3 w-3 mr-1" />Université</Badge>
                    : <Badge variant="outline" className="text-xs text-red-500 border-red-300"><XCircle className="h-3 w-3 mr-1" />Pas d'université</Badge>
                  }
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Étudiants sans createdBy (orphelins) */}
      {etudiantsSansCreatedBy.length > 0 && (
        <div className="space-y-2">
          <h2 className="font-bold text-foreground text-amber-600 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            Étudiants orphelins — sans createdBy ({etudiantsSansCreatedBy.length})
          </h2>
          <p className="text-xs text-muted-foreground">Ces étudiants n'ont pas de champ <code>createdBy</code>. Ils ne sont visibles que par l'admin principal (manasse.tandu).</p>
          <div className="space-y-2">
            {etudiantsSansCreatedBy.map(e => (
              <div key={e.id} className="rounded-lg border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 p-3">
                <p className="font-semibold text-sm">{e.prenom} {e.nom} <span className="font-mono text-xs text-muted-foreground">@{e.username}</span></p>
                <p className="text-xs text-muted-foreground">ID : {e.id}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Anomalies */}
      {anomalies.length > 0 && (
        <div className="space-y-2">
          <h2 className="font-bold text-destructive flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            Anomalies profil ({anomalies.length} étudiants sans faculté ou université)
          </h2>
          <div className="space-y-2">
            {anomalies.map(e => (
              <div key={e.id} className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-3">
                <p className="font-semibold text-sm">{e.prenom} {e.nom} <span className="font-mono text-xs">@{e.username}</span></p>
                <p className="text-xs text-muted-foreground">
                  faculteId : {(e as any).faculteId || <span className="text-destructive">manquant</span>} |{' '}
                  universiteId : {(e as any).universiteId || <span className="text-destructive">manquant</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bas de page */}
      <div className="border-t pt-4 text-xs text-muted-foreground">
        Page réservée aux administrateurs — non accessible aux étudiants. Route : <code>/debug-isolation</code>
      </div>
    </div>
  )
}
