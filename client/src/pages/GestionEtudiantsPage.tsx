import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import {
  collection, getDocs, query, where, orderBy,
  doc, deleteDoc
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useUser } from '@/lib/userContext'
import { isAdminRole, isStaffRole } from '@/lib/permissions'
import { EtudiantFiche, StatutEtudiant } from '@/lib/db'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  Users, Search, Filter, Eye, Trash2,
  GraduationCap, Building2, BookOpen, Calendar,
  CheckCircle2, XCircle, Award, ChevronDown, UserPlus
} from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

// ─── Constantes ──────────────────────────────────────────────────────────────
const STATUT_LABELS: Record<StatutEtudiant, string> = {
  actif: 'Actif',
  suspendu: 'Suspendu',
  diplome: 'Diplômé',
}

const STATUT_COLORS: Record<StatutEtudiant, string> = {
  actif: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  suspendu: 'bg-amber-100 text-amber-800 border border-amber-200',
  diplome: 'bg-blue-100 text-blue-800 border border-blue-200',
}

const STATUT_ICONS: Record<StatutEtudiant, JSX.Element> = {
  actif: <CheckCircle2 className="w-3 h-3" />,
  suspendu: <XCircle className="w-3 h-3" />,
  diplome: <Award className="w-3 h-3" />,
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function GestionEtudiantsPage() {
  const user = useUser()
  const [, navigate] = useLocation()
  const { toast } = useToast()

  const [etudiants, setEtudiants] = useState<EtudiantFiche[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filtreStatut, setFiltreStatut] = useState<StatutEtudiant | 'tous'>('tous')
  const [filtreType, setFiltreType] = useState<'tous' | 'interne' | 'externe'>('tous')
  const [filtreAnnee, setFiltreAnnee] = useState<string>('tous')
  const [annees, setAnnees] = useState<string[]>([])
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const isAdmin = isAdminRole(user)
  const isStaff = isStaffRole(user)

  // ─── Chargement ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isStaff) return
    chargerEtudiants()
  }, [])

  async function chargerEtudiants() {
    setLoading(true)
    try {
      const q = query(
        collection(db, 'etudiants'),
        orderBy('nom', 'asc')
      )
      const snap = await getDocs(q)
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as EtudiantFiche))
      setEtudiants(data)

      // Années uniques
      const anneesSet = new Set(data.map(e => e.anneeAcademique).filter(Boolean))
      setAnnees(Array.from(anneesSet).sort().reverse())
    } catch (e) {
      console.error(e)
      toast({ title: 'Erreur', description: 'Impossible de charger les étudiants.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  // ─── Suppression ───────────────────────────────────────────────────────────
  async function supprimerEtudiant(id: string) {
    try {
      await deleteDoc(doc(db, 'etudiants', id))
      setEtudiants(prev => prev.filter(e => e.id !== id))
      setConfirmDelete(null)
      toast({ title: 'Supprimé', description: 'Fiche étudiant supprimée.' })
    } catch (e) {
      toast({ title: 'Erreur', description: 'Suppression impossible.', variant: 'destructive' })
    }
  }

  // ─── Filtres ───────────────────────────────────────────────────────────────
  const etudiantsFiltres = etudiants.filter(e => {
    const matchSearch = search === '' ||
      `${e.nom} ${e.prenom} ${e.matricule} ${e.universite} ${e.filiere}`
        .toLowerCase().includes(search.toLowerCase())
    const matchStatut = filtreStatut === 'tous' || e.statut === filtreStatut
    const matchType = filtreType === 'tous' || e.type === filtreType
    const matchAnnee = filtreAnnee === 'tous' || e.anneeAcademique === filtreAnnee
    return matchSearch && matchStatut && matchType && matchAnnee
  })

  // ─── Stats rapides ─────────────────────────────────────────────────────────
  const stats = {
    total: etudiants.length,
    actifs: etudiants.filter(e => e.statut === 'actif').length,
    internes: etudiants.filter(e => e.type === 'interne').length,
    externes: etudiants.filter(e => e.type === 'externe').length,
  }

  if (!isStaff) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Accès non autorisé.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-10 animate-fadeIn max-w-7xl mx-auto px-4">

      {/* ─── HEADER ─── */}
      <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Tableau de bord', route: '/' },
            { label: 'Gestion des étudiants' },
          ]}
          color="indigo"
        />
        <div className="flex items-center justify-between flex-wrap gap-3 mt-1">
          <div>
            <h1 className="text-xl font-display font-bold text-foreground leading-tight">Gestion des étudiants</h1>
            <p className="text-sm text-muted-foreground">Étudiants internes et externes — toutes universités</p>
          </div>
          {isAdmin && (
            <button
              onClick={() => navigate('/inscription-plateforme')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Inscrire un étudiant
            </button>
          )}
        </div>
      </div>

      {/* ─── STATS ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: stats.total, icon: <Users className="w-5 h-5" />, color: 'indigo' },
          { label: 'Actifs', value: stats.actifs, icon: <CheckCircle2 className="w-5 h-5" />, color: 'emerald' },
          { label: 'Internes', value: stats.internes, icon: <GraduationCap className="w-5 h-5" />, color: 'sky' },
          { label: 'Externes', value: stats.externes, icon: <Building2 className="w-5 h-5" />, color: 'amber' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-${s.color}-50 text-${s.color}-600`}>
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ─── FILTRES ─── */}
      <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Filter className="w-4 h-4 text-indigo-500" />
          Filtres
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* Recherche */}
          <div className="sm:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Nom, matricule, université, filière..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Statut */}
          <div className="relative">
            <select
              value={filtreStatut}
              onChange={e => setFiltreStatut(e.target.value as any)}
              className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="tous">Tous les statuts</option>
              <option value="actif">Actif</option>
              <option value="suspendu">Suspendu</option>
              <option value="diplome">Diplômé</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          {/* Type */}
          <div className="relative">
            <select
              value={filtreType}
              onChange={e => setFiltreType(e.target.value as any)}
              className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="tous">Interne et externe</option>
              <option value="interne">Interne</option>
              <option value="externe">Externe</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Filtre année */}
        {annees.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Année :
            </span>
            {['tous', ...annees].map(a => (
              <button
                key={a}
                onClick={() => setFiltreAnnee(a)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filtreAnnee === a
                    ? 'bg-indigo-600 text-white'
                    : 'bg-muted text-muted-foreground hover:bg-indigo-50 hover:text-indigo-700'
                }`}
              >
                {a === 'tous' ? 'Toutes les années' : a}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ─── TABLEAU ─── */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          </div>
        ) : etudiantsFiltres.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-3 text-muted-foreground">
            <Users className="w-10 h-10 opacity-30" />
            <p className="text-sm">
              {etudiants.length === 0
                ? 'Aucun étudiant enregistré. Commencez par en ajouter un.'
                : 'Aucun résultat pour ces filtres.'}
            </p>
            {isAdmin && etudiants.length === 0 && (
              <button
                onClick={() => navigate('/nouvel-etudiant')}
                className="text-indigo-600 text-sm font-semibold hover:underline"
              >
                + Ajouter le premier étudiant
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Étudiant</th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Matricule</th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground hidden sm:table-cell">Université</th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground hidden md:table-cell">Filière / Promo</th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground hidden lg:table-cell">Année</th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Type</th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Statut</th>
                  <th className="text-right px-5 py-3 font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {etudiantsFiltres.map((e, i) => (
                  <tr
                    key={e.id}
                    className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${i % 2 === 0 ? '' : 'bg-muted/10'}`}
                  >
                    {/* Nom + prénom */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {e.photo ? (
                          <img src={e.photo} alt="" className="w-8 h-8 rounded-full object-cover border border-border" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                            {e.prenom?.[0]}{e.nom?.[0]}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-foreground">{e.nom} {e.prenom}</p>
                          <p className="text-xs text-muted-foreground">{e.email || e.telephone || ''}</p>
                        </div>
                      </div>
                    </td>

                    {/* Matricule */}
                    <td className="px-5 py-3 font-mono text-xs text-foreground">{e.matricule || '--'}</td>

                    {/* Université */}
                    <td className="px-5 py-3 text-foreground hidden sm:table-cell">{e.universite || '--'}</td>

                    {/* Filière / Promo */}
                    <td className="px-5 py-3 hidden md:table-cell">
                      <p className="text-foreground">{e.filiere || '--'}</p>
                      <p className="text-xs text-muted-foreground">{e.promotion || ''}</p>
                    </td>

                    {/* Année */}
                    <td className="px-5 py-3 text-muted-foreground hidden lg:table-cell">{e.anneeAcademique || '--'}</td>

                    {/* Type */}
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                        e.type === 'interne'
                          ? 'bg-sky-100 text-sky-800 border border-sky-200'
                          : 'bg-violet-100 text-violet-800 border border-violet-200'
                      }`}>
                        {e.type === 'interne' ? <GraduationCap className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                        {e.type === 'interne' ? 'Interne' : 'Externe'}
                      </span>
                    </td>

                    {/* Statut */}
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${STATUT_COLORS[e.statut]}`}>
                        {STATUT_ICONS[e.statut]}
                        {STATUT_LABELS[e.statut]}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/etudiant/${e.id}`)}
                          className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors"
                          title="Voir la fiche"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {isAdmin && (
                          <button
                            onClick={() => setConfirmDelete(e.id)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer tableau */}
            <div className="px-5 py-3 border-t border-border/50 bg-muted/20 text-xs text-muted-foreground">
              {etudiantsFiltres.length} étudiant{etudiantsFiltres.length > 1 ? 's' : ''} affiché{etudiantsFiltres.length > 1 ? 's' : ''}
              {etudiants.length !== etudiantsFiltres.length && ` sur ${etudiants.length}`}
            </div>
          </div>
        )}
      </div>

      {/* ─── MODAL CONFIRMATION SUPPRESSION ─── */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-100 text-red-600">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground">Supprimer cet étudiant ?</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Cette action est irréversible. La fiche et toutes les notes associées seront supprimées définitivement.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 px-4 py-2 rounded-xl border border-border text-sm font-semibold hover:bg-muted transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => supprimerEtudiant(confirmDelete)}
                className="flex-1 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
