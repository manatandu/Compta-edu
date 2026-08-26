/**
 * InscriptionPlatformePage
 * Regroupe les 3 méthodes pour créer un étudiant INTERNE (compte Firebase) :
 *  A) Formulaire individuel
 *  B) Import CSV
 *  C) Code d'accès
 *
 * Accessible depuis GestionEtudiantsPage.
 * Aucun conflit Firestore : écrit dans `users/` et `codesAcces/`
 * indépendamment de la collection `etudiants/` (fiches externes).
 */
import { useState } from 'react'
import { useLocation } from 'wouter'
import { collection, setDoc, doc, getFirestore } from 'firebase/firestore'
import { getApp } from 'firebase/app'
import {
  createUserAsync, onUsersSnapshot,
} from '@/lib/db-firebase'
import { useUniversites, useAllFacultes, useAllCours } from '@/lib/useFirestore'
import { useUser } from '@/lib/userContext'
import { isAdminRole, isStaffRole } from '@/lib/permissions'
import { Breadcrumb } from '@/components/Breadcrumb'
import PasswordInput from '@/components/PasswordInput'
import { useToast } from '@/components/ui/use-toast'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { User } from '@/lib/db'
import { useEffect } from 'react'
import {
  UserPlus, Upload, Key, ChevronDown, Check,
  Copy, AlertCircle, FileText, X, ArrowLeft
} from 'lucide-react'

// ─── Catalogues fixes ───────────────────────────────────────────────────────
const PROMOTIONS = ['L1', 'L2', 'L3', 'M1', 'M2'] as const

// ─── Helpers ─────────────────────────────────────────────────────────────────
const METHODES = [
  { id: 'form' as const, label: 'Formulaire individuel', icon: <UserPlus className="w-4 h-4" />, desc: 'Créer un compte manuellement' },
  { id: 'csv'  as const, label: 'Import CSV',             icon: <Upload className="w-4 h-4" />,   desc: 'Importer une liste d\'étudiants' },
  { id: 'code' as const, label: 'Code d\'accès',          icon: <Key className="w-4 h-4" />,      desc: 'Générer un code d\'inscription' },
]

type Methode = 'form' | 'csv' | 'code'

// ─── Composant principal ──────────────────────────────────────────────────────
export default function InscriptionPlatformePage() {
  const user = useUser()
  const [, navigate] = useLocation()
  const { toast } = useToast()
  const { universites } = useUniversites()
  const { facultes: facultesList } = useAllFacultes()
  const { cours: coursList } = useAllCours()

  const [methode, setMethode] = useState<Methode>('form')
  const [users, setUsers] = useState<User[]>([])

  const isAdmin = isAdminRole(user)
  const isStaff = isStaffRole(user)

  // Listener temps réel pour détecter les doublons username
  useEffect(() => {
    const unsub = onUsersSnapshot(setUsers)
    return () => unsub()
  }, [])

  if (!isStaff) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-muted-foreground">Accès non autorisé.</p>
    </div>
  )

  // ─── Filtres facultés / cours selon université sélectionnée ────────────────
  const getFacultes = (uniId: string) =>
    facultesList.filter(f => f.actif && (!uniId || f.universiteId === uniId))
  const getCours = (uniId: string) =>
    coursList.filter(c => c.actif && (!uniId || c.universiteId === uniId))

  return (
    <div className="space-y-6 pb-10 animate-fadeIn max-w-3xl mx-auto px-4">

      {/* ─── HEADER ─── */}
      <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Tableau de bord', route: '/' },
            { label: 'Gestion des étudiants', route: '/gestion-etudiants' },
            { label: 'Inscrire sur la plateforme' },
          ]}
          color="indigo"
        />
        <div className="flex items-center gap-3 mt-1">
          <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">Inscrire un étudiant sur la plateforme</h1>
            <p className="text-sm text-muted-foreground">Créer un compte Firebase (étudiant interne)</p>
          </div>
        </div>
      </div>

      {/* ─── SÉLECTEUR DE MÉTHODE ─── */}
      <div className="grid grid-cols-3 gap-3">
        {METHODES.map(m => (
          <button
            key={m.id}
            onClick={() => setMethode(m.id)}
            className={`p-4 rounded-2xl border-2 text-left transition-all space-y-1 ${
              methode === m.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-border hover:border-indigo-300 bg-card'
            }`}
          >
            <div className={`flex items-center gap-2 font-semibold text-sm ${methode === m.id ? 'text-indigo-700' : 'text-foreground'}`}>
              {m.icon} {m.label}
            </div>
            <p className="text-xs text-muted-foreground">{m.desc}</p>
          </button>
        ))}
      </div>

      {/* ═══ MÉTHODE A : Formulaire individuel ═══════════════════════════════ */}
      {methode === 'form' && (
        <FormIndividuel
          users={users}
          universites={universites}
          getFacultes={getFacultes}
          getCours={getCours}
          currentUserId={user?.id || ''}
          toast={toast}
        />
      )}

      {/* ═══ MÉTHODE B : Import CSV ══════════════════════════════════════════ */}
      {methode === 'csv' && (
        <ImportCSV
          users={users}
          universites={universites}
          getFacultes={getFacultes}
          getCours={getCours}
          currentUserId={user?.id || ''}
          toast={toast}
        />
      )}

      {/* ═══ MÉTHODE C : Code d'accès ════════════════════════════════════════ */}
      {methode === 'code' && (
        <CodeAcces
          universites={universites}
          getFacultes={getFacultes}
          getCours={getCours}
          currentUserId={user?.id || ''}
          toast={toast}
        />
      )}
    </div>
  )
}

// ─── Sous-composant A : Formulaire individuel ─────────────────────────────────
function FormIndividuel({ users, universites, getFacultes, getCours, currentUserId, toast }: any) {
  const [form, setForm] = useState({
    username: '', password: '', nom: '', prenom: '',
    universiteId: '', faculteId: '', classe: '', actif: true, coursIds: [] as string[]
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const facultes = getFacultes(form.universiteId)
  const cours = getCours(form.universiteId)

  const toggleCours = (id: string) =>
    setForm(f => ({
      ...f,
      coursIds: f.coursIds.includes(id) ? f.coursIds.filter(c => c !== id) : [...f.coursIds, id]
    }))

  const handleSubmit = async () => {
    setError('')
    setSuccess(false)
    if (!form.username.trim() || !form.nom.trim() || !form.password.trim()) {
      setError('Nom, identifiant et mot de passe sont obligatoires.')
      return
    }
    const existing = users.find((u: User) => u.username === form.username.trim().toLowerCase())
    if (existing) { setError("Ce nom d'utilisateur est déjà pris."); return }

    setLoading(true)
    try {
      await createUserAsync({
        username: form.username.trim(),
        password: form.password.trim(),
        nom: form.nom.trim().toUpperCase(),
        prenom: form.prenom.trim(),
        faculteId: form.faculteId || undefined,
        role: 'etudiant',
        actif: form.actif,
        universiteId: form.universiteId || undefined,
        classe: form.classe.trim() || undefined,
        coursIds: form.coursIds.length > 0 ? form.coursIds : undefined,
        createdBy: currentUserId,
      } as any)
      setSuccess(true)
      setForm(f => ({ ...f, username: '', password: '', nom: '', prenom: '', classe: '' }))
      toast({ title: 'Étudiant créé avec succès' })
    } catch (err: any) {
      const msg = err?.message || err?.code || ''
      if (msg.includes('already-in-use') || msg.includes('déjà utilisé')) {
        setError("Cet identifiant est déjà utilisé. Choisissez un autre.")
      } else {
        setError("Erreur : " + (msg || 'inconnue'))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
      <h2 className="text-sm font-display font-semibold text-foreground">Créer un compte étudiant</h2>

      {success && (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm">
          <Check className="w-4 h-4 shrink-0" />
          Étudiant créé avec succès. Vous pouvez en créer un autre.
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Nom <span className="text-red-500">*</span></label>
          <input type="text" value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
            placeholder="Ex: TANDU" className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Prénom</label>
          <input type="text" value={form.prenom} onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))}
            placeholder="Ex: Manasse" className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Identifiant (username) <span className="text-red-500">*</span></label>
          <input type="text" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value.toLowerCase() }))}
            placeholder="Ex: tandu.manasse" className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Mot de passe <span className="text-red-500">*</span></label>
          <PasswordInput value={form.password} onChange={(e: any) => setForm(f => ({ ...f, password: e.target.value }))}
            className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">Promotion</label>
          <div className="relative">
            <select value={form.classe} onChange={e => setForm(f => ({ ...f, classe: e.target.value }))}
              className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="">-- Choisir une promotion --</option>
              {PROMOTIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Université + Faculté */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Université</label>
          <div className="relative">
            <select value={form.universiteId} onChange={e => setForm(f => ({ ...f, universiteId: e.target.value, faculteId: '' }))}
              className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="">Toutes / non définie</option>
              {universites.map((u: any) => <option key={u.id} value={u.id}>{u.nom}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Faculté</label>
          <div className="relative">
            <select value={form.faculteId} onChange={e => setForm(f => ({ ...f, faculteId: e.target.value }))}
              className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="">-- Sélectionner --</option>
              {facultes.map((f: any) => <option key={f.id} value={f.id}>{f.nom}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Cours */}
      {cours.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Cours assignés</label>
          <div className="flex flex-wrap gap-2">
            {cours.map((c: any) => (
              <button key={c.id} onClick={() => toggleCours(c.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  form.coursIds.includes(c.id)
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-background text-muted-foreground border-border hover:border-indigo-400'
                }`}>
                {c.nom || c.id}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actif */}
      <div className="flex items-center gap-3">
        <Switch checked={form.actif} onCheckedChange={v => setForm(f => ({ ...f, actif: v }))} id="actif" />
        <Label htmlFor="actif" className="text-sm text-foreground">Compte actif immédiatement</Label>
      </div>

      <button onClick={handleSubmit} disabled={loading}
        className="w-full px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors">
        {loading ? 'Création en cours...' : 'Créer le compte étudiant'}
      </button>
    </div>
  )
}

// ─── Sous-composant B : Import CSV ────────────────────────────────────────────
function ImportCSV({ users, universites, getFacultes, getCours, currentUserId, toast }: any) {
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [csvPreview, setCsvPreview] = useState<any[]>([])
  const [csvError, setCsvError] = useState('')
  const [csvImporting, setCsvImporting] = useState(false)
  const [csvResult, setCsvResult] = useState<{ success: number; errors: string[] } | null>(null)
  const [universiteId, setUniversiteId] = useState('')
  const [faculteId, setFaculteId] = useState('')
  const [classe, setClasse] = useState('')
  const [coursIds, setCoursIds] = useState<string[]>([])

  const facultes = getFacultes(universiteId)
  const cours = getCours(universiteId)

  const toggleCours = (id: string) =>
    setCoursIds(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])

  const parseCsvFile = (file: File) => {
    setCsvError(''); setCsvResult(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      if (!text) { setCsvError('Fichier vide ou illisible.'); return }
      const lines = text.split(/\r?\n/).filter(l => l.trim())
      if (lines.length < 2) { setCsvError('Le fichier doit contenir au moins une ligne de données (en-tête + 1 étudiant).'); return }
      const sep = lines[0].includes(';') ? ';' : ','
      const headers = lines[0].split(sep).map(h => h.trim().toLowerCase().replace(/[^a-z]/g, ''))
      const rows = lines.slice(1).map((line, idx) => {
        const cols = line.split(sep).map(c => c.trim().replace(/^"|"$/g, ''))
        const row: any = { _line: idx + 2 }
        headers.forEach((h, i) => { row[h] = cols[i] || '' })
        return row
      }).filter(r => r.nom || r.prenom || r.username)
      if (rows.length === 0) { setCsvError('Aucune ligne valide trouvée.'); return }
      setCsvPreview(rows)
    }
    reader.readAsText(file, 'UTF-8')
  }

  const handleImport = async () => {
    if (csvPreview.length === 0) return
    setCsvImporting(true); setCsvResult(null)
    let success = 0
    const errors: string[] = []
    for (const row of csvPreview) {
      const nom = (row.nom || '').trim()
      const prenom = (row.prenom || '').trim()
      const username = (row.username || row.id || row.identifiant || '').trim().toLowerCase()
      const password = (row.motdepasse || row.password || row.mdp || 'campus2026').trim()
      const classeRow = (row.classe || '').trim()
      const telephone = (row.telephone || row.tel || '').trim()
      if (!nom || !username) {
        errors.push(`Ligne ${row._line} : Nom et Identifiant obligatoires.`)
        continue
      }
      const exists = users.find((u: User) => u.username === username)
      if (exists) {
        errors.push(`Ligne ${row._line} : Identifiant "${username}" déjà utilisé.`)
        continue
      }
      try {
        await createUserAsync({
          username, password, nom: nom.toUpperCase(), prenom, role: 'etudiant', actif: true,
          universiteId: universiteId || undefined,
          faculteId: faculteId || undefined,
          classe: classeRow || classe || undefined,
          telephone: telephone || undefined,
          coursIds: coursIds.length > 0 ? coursIds : undefined,
          createdBy: currentUserId,
        } as any)
        success++
      } catch (err: any) {
        errors.push(`Ligne ${row._line} (${username}) : ${err?.message || 'Erreur inconnue'}`)
      }
    }
    setCsvImporting(false)
    setCsvResult({ success, errors })
    if (success > 0) toast({ title: `${success} étudiant${success > 1 ? 's' : ''} importé${success > 1 ? 's' : ''} avec succès` })
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
      <div className="space-y-1">
        <h2 className="text-sm font-display font-semibold text-foreground">Import depuis un fichier CSV</h2>
        <p className="text-xs text-muted-foreground">Colonnes attendues : <code className="bg-muted px-1 rounded">nom, prenom, username, motdepasse, classe, telephone</code></p>
      </div>

      {/* Paramètres communs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Université (optionnel)</label>
          <div className="relative">
            <select value={universiteId} onChange={e => { setUniversiteId(e.target.value); setFaculteId('') }}
              className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="">Toutes</option>
              {universites.map((u: any) => <option key={u.id} value={u.id}>{u.nom}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Faculté</label>
          <div className="relative">
            <select value={faculteId} onChange={e => setFaculteId(e.target.value)}
              className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="">--</option>
              {facultes.map((f: any) => <option key={f.id} value={f.id}>{f.nom}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Promotion par défaut</label>
          <div className="relative">
            <select value={classe} onChange={e => setClasse(e.target.value)}
              className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="">-- Choisir une promotion --</option>
              {PROMOTIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Cours */}
      {cours.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Cours à assigner à tous les importés</label>
          <div className="flex flex-wrap gap-2">
            {cours.map((c: any) => (
              <button key={c.id} onClick={() => toggleCours(c.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  coursIds.includes(c.id)
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-background text-muted-foreground border-border hover:border-indigo-400'
                }`}>
                {c.nom || c.id}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Upload fichier */}
      <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center space-y-3">
        <FileText className="w-8 h-8 mx-auto text-muted-foreground opacity-50" />
        <div>
          <label htmlFor="csv-upload" className="cursor-pointer text-indigo-600 font-semibold text-sm hover:underline">
            Choisir un fichier CSV
          </label>
          <input id="csv-upload" type="file" accept=".csv,.txt" className="hidden"
            onChange={e => {
              const f = e.target.files?.[0]
              if (f) { setCsvFile(f); parseCsvFile(f) }
            }} />
        </div>
        {csvFile && <p className="text-xs text-muted-foreground">{csvFile.name}</p>}
      </div>

      {csvError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" /> {csvError}
        </div>
      )}

      {/* Prévisualisation */}
      {csvPreview.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground">{csvPreview.length} ligne{csvPreview.length > 1 ? 's' : ''} détectée{csvPreview.length > 1 ? 's' : ''}</p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  {['nom', 'prenom', 'username', 'classe'].map(h => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvPreview.slice(0, 5).map((r, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="px-3 py-1.5">{r.nom}</td>
                    <td className="px-3 py-1.5">{r.prenom}</td>
                    <td className="px-3 py-1.5 font-mono">{r.username}</td>
                    <td className="px-3 py-1.5">{r.classe}</td>
                  </tr>
                ))}
                {csvPreview.length > 5 && (
                  <tr><td colSpan={4} className="px-3 py-1.5 text-muted-foreground italic">...et {csvPreview.length - 5} autres</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <button onClick={handleImport} disabled={csvImporting}
            className="w-full px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors">
            {csvImporting ? 'Importation en cours...' : `Importer ${csvPreview.length} étudiant${csvPreview.length > 1 ? 's' : ''}`}
          </button>
        </div>
      )}

      {/* Résultats */}
      {csvResult && (
        <div className="space-y-2">
          {csvResult.success > 0 && (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm">
              <Check className="w-4 h-4 shrink-0" />
              {csvResult.success} étudiant{csvResult.success > 1 ? 's' : ''} importé{csvResult.success > 1 ? 's' : ''} avec succès.
            </div>
          )}
          {csvResult.errors.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1">
              <p className="text-xs font-semibold text-red-700">{csvResult.errors.length} erreur{csvResult.errors.length > 1 ? 's' : ''} :</p>
              {csvResult.errors.map((e, i) => (
                <p key={i} className="text-xs text-red-600">{e}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Sous-composant C : Code d'accès ─────────────────────────────────────────
function CodeAcces({ universites, getFacultes, getCours, currentUserId, toast }: any) {
  const [, navigate] = useLocation()
  const [form, setForm] = useState({ universiteId: '', faculteId: '', coursIds: [] as string[], classe: '' })
  const [generatedCode, setGeneratedCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const facultes = getFacultes(form.universiteId)
  const cours = getCours(form.universiteId)

  const toggleCours = (id: string) =>
    setForm(f => ({
      ...f,
      coursIds: f.coursIds.includes(id) ? f.coursIds.filter(c => c !== id) : [...f.coursIds, id]
    }))

  const handleGenerate = async () => {
    setError(''); setLoading(true)
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    const code = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    try {
      const db2 = getFirestore(getApp())
      await setDoc(doc(collection(db2, 'codesAcces'), code), {
        code,
        universiteId: form.universiteId,
        faculteId: form.faculteId || null,
        coursIds: form.coursIds.length > 0 ? form.coursIds : [],
        classe: form.classe || null,
        createdBy: currentUserId,
        createdAt: new Date().toISOString(),
        actif: true,
      })
      setGeneratedCode(code)
      toast({ title: 'Code généré avec succès' })
    } catch (err: any) {
      setError('Erreur : ' + (err?.message || 'inconnue'))
    } finally {
      setLoading(false)
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
      <div className="space-y-1">
        <h2 className="text-sm font-display font-semibold text-foreground">Générer un code d'accès</h2>
        <p className="text-xs text-muted-foreground">
          Les étudiants entrent ce code lors de leur première connexion pour rejoindre automatiquement la bonne université, faculté et les cours associés.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Université</label>
          <div className="relative">
            <select value={form.universiteId} onChange={e => setForm(f => ({ ...f, universiteId: e.target.value, faculteId: '' }))}
              className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="">Non définie</option>
              {universites.map((u: any) => <option key={u.id} value={u.id}>{u.nom}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Faculté</label>
          <div className="relative">
            <select value={form.faculteId} onChange={e => setForm(f => ({ ...f, faculteId: e.target.value }))}
              className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="">--</option>
              {facultes.map((f: any) => <option key={f.id} value={f.id}>{f.nom}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">Promotion (optionnel)</label>
          <div className="relative">
            <select value={form.classe} onChange={e => setForm(f => ({ ...f, classe: e.target.value }))}
              className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="">-- Choisir une promotion --</option>
              {PROMOTIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Cours */}
      {cours.length > 0 ? (
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Cours inclus dans ce code</label>
          <div className="flex flex-wrap gap-2">
            {cours.map((c: any) => (
              <button key={c.id} onClick={() => toggleCours(c.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  form.coursIds.includes(c.id)
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-background text-muted-foreground border-border hover:border-indigo-400'
                }`}>
                {c.nom || c.id}
              </button>
            ))}
          </div>
        </div>
      ) : form.universiteId && (
        // Aucune UE n'a encore été « provisionnée » pour cette université : les UE
        // affectables ici sont les cours réels créés dans Espace pédagogique >
        // Cours (clonés depuis le catalogue UE1-UE13), pas le catalogue lui-même -
        // sans quoi le code ne pourrait pas isoler les inscrits par faculté. Tant
        // qu'aucun cours n'existe pour cette université, il n'y a donc rien à
        // cocher ici ; on le dit explicitement au lieu de laisser la section
        // disparaître sans explication.
        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <p>Aucun cours n'a encore été créé pour cette université - le code fonctionnera, mais sans UE pré-affectée (l'étudiant devra être ajouté aux cours manuellement après son inscription).</p>
            <button onClick={() => navigate('/professeurs')} className="font-semibold underline hover:no-underline">
              Créer des cours pour cette université →
            </button>
          </div>
        </div>
      )}

      <button onClick={handleGenerate} disabled={loading}
        className="w-full px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors">
        {loading ? 'Génération...' : 'Générer le code d\'accès'}
      </button>

      {/* Code généré */}
      {generatedCode && (
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3 text-center">
          <p className="text-xs text-emerald-700 font-medium">Code d'accès généré</p>
          <p className="text-4xl font-bold text-emerald-800 tracking-[0.3em] font-mono">{generatedCode}</p>
          <button onClick={copyCode}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              copied ? 'bg-emerald-600 text-white' : 'bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-100'
            }`}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copié !' : 'Copier le code'}
          </button>
          <p className="text-xs text-emerald-600">Transmettez ce code aux étudiants. Il sera valide jusqu'à sa désactivation.</p>
        </div>
      )}
    </div>
  )
}
