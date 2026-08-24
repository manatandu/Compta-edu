import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'wouter'
import {
  doc, getDoc, updateDoc, collection,
  query, where, getDocs, addDoc, deleteDoc, orderBy, serverTimestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useUser } from '@/lib/userContext'
import { isAdminRole, isStaffRole } from '@/lib/permissions'
import { EtudiantFiche, NoteManuelle, StatutEtudiant } from '@/lib/db'
import { anneeAcademiqueEnCours } from '@/lib/utils'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  User, BookOpen, Edit3, Save, X, Plus, Trash2,
  GraduationCap, Building2, Phone, Mail, Hash,
  Calendar, CheckCircle2, XCircle, Award,
  FileText, ChevronDown, AlertCircle
} from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

// ─── Constantes ───────────────────────────────────────────────────────────────
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

const UE_OPTIONS = [
  'UE2 - Droit des sociétés',
  'UE5 - Finances publiques',
  'UE13 - IFRS / IAS',
  'Comptabilité générale SYSCOHADA',
  'Comptabilité SYCEBNL',
  'Fiscalité',
  'Audit',
  'Autre',
]

// ─── Note badge ───────────────────────────────────────────────────────────────
function NoteBadge({ note }: { note: number }) {
  const color = note >= 14 ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
    : note >= 10 ? 'text-amber-700 bg-amber-50 border-amber-200'
    : 'text-red-700 bg-red-50 border-red-200'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-sm font-bold border ${color}`}>
      {note}/20
    </span>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function FicheEtudiantPage() {
  const { id } = useParams<{ id: string }>()
  const user = useUser()
  const [, navigate] = useLocation()
  const { toast } = useToast()

  const [etudiant, setEtudiant] = useState<EtudiantFiche | null>(null)
  const [notes, setNotes] = useState<NoteManuelle[]>([])
  const [onglet, setOnglet] = useState<'profil' | 'notes'>('profil')
  const [loading, setLoading] = useState(true)
  const [editStatut, setEditStatut] = useState(false)
  const [nouveauStatut, setNouveauStatut] = useState<StatutEtudiant>('actif')
  const [savingStatut, setSavingStatut] = useState(false)

  // Formulaire saisie note manuelle
  const [showFormNote, setShowFormNote] = useState(false)
  const [formNote, setFormNote] = useState({
    ueLabel: '',
    chapitreLabel: '',
    note: '',
    commentaire: '',
    anneeAcademique: anneeAcademiqueEnCours(),
  })
  const [savingNote, setSavingNote] = useState(false)
  const [confirmDeleteNote, setConfirmDeleteNote] = useState<string | null>(null)

  const isAdmin = isAdminRole(user)
  const isStaff = isStaffRole(user)

  // ─── Chargement ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!id || !isStaff) return
    charger()
  }, [id])

  async function charger() {
    setLoading(true)
    try {
      // Fiche étudiant
      const snap = await getDoc(doc(db, 'etudiants', id!))
      if (!snap.exists()) {
        toast({ title: 'Introuvable', description: 'Fiche étudiant introuvable.', variant: 'destructive' })
        navigate('/gestion-etudiants')
        return
      }
      const data = { id: snap.id, ...snap.data() } as EtudiantFiche
      setEtudiant(data)
      setNouveauStatut(data.statut)

      // Notes manuelles
      const qNotes = query(
        collection(db, 'notes_manuelles'),
        where('etudiantFicheId', '==', id),
        orderBy('dateSaisie', 'desc')
      )
      const snapNotes = await getDocs(qNotes)
      setNotes(snapNotes.docs.map(d => ({ id: d.id, ...d.data() } as NoteManuelle)))
    } catch (e) {
      console.error(e)
      toast({ title: 'Erreur', description: 'Impossible de charger la fiche.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  // ─── Mise à jour statut ────────────────────────────────────────────────────
  async function sauvegarderStatut() {
    if (!etudiant) return
    setSavingStatut(true)
    try {
      await updateDoc(doc(db, 'etudiants', etudiant.id), { statut: nouveauStatut })
      setEtudiant(prev => prev ? { ...prev, statut: nouveauStatut } : prev)
      setEditStatut(false)
      toast({ title: 'Statut mis à jour' })
    } catch (e) {
      toast({ title: 'Erreur', description: 'Impossible de mettre à jour le statut.', variant: 'destructive' })
    } finally {
      setSavingStatut(false)
    }
  }

  // ─── Ajout note manuelle ───────────────────────────────────────────────────
  async function ajouterNote() {
    const noteVal = parseFloat(formNote.note)
    if (!formNote.ueLabel || !formNote.chapitreLabel) {
      toast({ title: 'Champs requis', description: 'UE et intitulé du cours sont requis.', variant: 'destructive' })
      return
    }
    if (isNaN(noteVal) || noteVal < 0 || noteVal > 20) {
      toast({ title: 'Note invalide', description: 'La note doit être entre 0 et 20.', variant: 'destructive' })
      return
    }
    setSavingNote(true)
    try {
      const data = {
        etudiantFicheId: id,
        chapitreId: '',
        chapitreLabel: formNote.chapitreLabel.trim(),
        ueLabel: formNote.ueLabel,
        note: noteVal,
        mode: 'manuel' as const,
        commentaire: formNote.commentaire.trim(),
        saisiePar: user!.id,
        dateSaisie: new Date().toISOString(),
        anneeAcademique: formNote.anneeAcademique,
        createdAt: serverTimestamp(),
      }
      const ref = await addDoc(collection(db, 'notes_manuelles'), data)
      setNotes(prev => [{ id: ref.id, ...data } as NoteManuelle, ...prev])
      setFormNote({ ueLabel: '', chapitreLabel: '', note: '', commentaire: '', anneeAcademique: anneeAcademiqueEnCours() })
      setShowFormNote(false)
      toast({ title: 'Note ajoutée', description: `${noteVal}/20 enregistré.` })
    } catch (e) {
      toast({ title: 'Erreur', description: 'Impossible d\'ajouter la note.', variant: 'destructive' })
    } finally {
      setSavingNote(false)
    }
  }

  // ─── Suppression note ──────────────────────────────────────────────────────
  async function supprimerNote(noteId: string) {
    try {
      await deleteDoc(doc(db, 'notes_manuelles', noteId))
      setNotes(prev => prev.filter(n => n.id !== noteId))
      setConfirmDeleteNote(null)
      toast({ title: 'Note supprimée' })
    } catch (e) {
      toast({ title: 'Erreur', description: 'Suppression impossible.', variant: 'destructive' })
    }
  }

  // ─── Moyenne générale ──────────────────────────────────────────────────────
  const moyenne = notes.length > 0
    ? (notes.reduce((s, n) => s + n.note, 0) / notes.length).toFixed(2)
    : null

  // ─── Loading ───────────────────────────────────────────────────────────────
  if (!isStaff) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-muted-foreground">Accès non autorisé.</p>
    </div>
  )

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  )

  if (!etudiant) return null

  return (
    <div className="space-y-5 pb-10 animate-fadeIn max-w-5xl mx-auto px-4">

      {/* ─── HEADER ─── */}
      <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Tableau de bord', route: '/' },
            { label: 'Gestion des étudiants', route: '/gestion-etudiants' },
            { label: `${etudiant.prenom} ${etudiant.nom}` },
          ]}
          color="indigo"
        />
      </div>

      {/* ─── CARTE IDENTITÉ ─── */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-start gap-5 flex-wrap">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-bold shrink-0">
            {etudiant.prenom?.[0]}{etudiant.nom?.[0]}
          </div>

          {/* Infos principales */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-display font-bold text-foreground">{etudiant.nom} {etudiant.prenom}</h1>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUT_COLORS[etudiant.statut]}`}>
                {STATUT_ICONS[etudiant.statut]}
                {etudiant.statut === 'actif' ? 'Actif' : etudiant.statut === 'suspendu' ? 'Suspendu' : 'Diplômé'}
              </span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                etudiant.type === 'interne'
                  ? 'bg-sky-100 text-sky-800 border border-sky-200'
                  : 'bg-violet-100 text-violet-800 border border-violet-200'
              }`}>
                {etudiant.type === 'interne' ? <GraduationCap className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                {etudiant.type === 'interne' ? 'Interne' : 'Externe'}
              </span>
            </div>

            <div className="flex items-center gap-4 flex-wrap mt-2 text-sm text-muted-foreground">
              {etudiant.matricule && (
                <span className="flex items-center gap-1 font-mono">
                  <Hash className="w-3 h-3" /> {etudiant.matricule}
                </span>
              )}
              {etudiant.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {etudiant.email}
                </span>
              )}
              {etudiant.telephone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {etudiant.telephone}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 flex-wrap mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3" /> {etudiant.universite}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> {etudiant.filiere} — {etudiant.promotion}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {etudiant.anneeAcademique}
              </span>
            </div>
          </div>

          {/* Modifier statut */}
          {isAdmin && (
            <div className="shrink-0">
              {editStatut ? (
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <select
                      value={nouveauStatut}
                      onChange={e => setNouveauStatut(e.target.value as StatutEtudiant)}
                      className="appearance-none pl-3 pr-8 py-1.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                      <option value="actif">Actif</option>
                      <option value="suspendu">Suspendu</option>
                      <option value="diplome">Diplômé</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
                  </div>
                  <button
                    onClick={sauvegarderStatut}
                    disabled={savingStatut}
                    className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => { setEditStatut(false); setNouveauStatut(etudiant.statut) }}
                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditStatut(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border text-sm hover:bg-muted transition-colors"
                >
                  <Edit3 className="w-3 h-3" /> Modifier statut
                </button>
              )}
            </div>
          )}
        </div>

        {/* Moyenne rapide */}
        {moyenne && (
          <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Moyenne générale :</span>
            <NoteBadge note={parseFloat(moyenne)} />
            <span className="text-xs text-muted-foreground">({notes.length} note{notes.length > 1 ? 's' : ''})</span>
          </div>
        )}
      </div>

      {/* ─── ONGLETS ─── */}
      <div className="flex border-b border-border gap-1">
        {([['profil', 'Profil', <User className="w-4 h-4" />], ['notes', 'Notes & Progression', <FileText className="w-4 h-4" />]] as const).map(([key, label, icon]) => (
          <button
            key={key}
            onClick={() => setOnglet(key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
              onglet === key
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {icon}{label}
          </button>
        ))}
      </div>

      {/* ─── ONGLET PROFIL ─── */}
      {onglet === 'profil' && (
        <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-display font-semibold text-foreground">Informations complètes</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {[
              ['Nom', etudiant.nom],
              ['Prénom', etudiant.prenom],
              ['Matricule', etudiant.matricule || '--'],
              ['Type', etudiant.type === 'interne' ? 'Interne (compte plateforme)' : 'Externe'],
              ['Université', etudiant.universite],
              ['Faculté', etudiant.faculte || '--'],
              ['Filière', etudiant.filiere],
              ['Promotion', etudiant.promotion],
              ['Année académique', etudiant.anneeAcademique],
              ['Statut', etudiant.statut === 'actif' ? 'Actif' : etudiant.statut === 'suspendu' ? 'Suspendu' : 'Diplômé'],
              ['Téléphone', etudiant.telephone || '--'],
              ['Email', etudiant.email || '--'],
              ['Date d\'inscription', etudiant.dateInscription || '--'],
            ].map(([label, value]) => (
              <div key={label} className="space-y-0.5">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── ONGLET NOTES ─── */}
      {onglet === 'notes' && (
        <div className="space-y-4">

          {/* En-tête notes */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-sm font-display font-semibold text-foreground">Notes et progression</h2>
              {moyenne && (
                <p className="text-xs text-muted-foreground">
                  Moyenne : <span className="font-bold text-foreground">{moyenne}/20</span> sur {notes.length} note{notes.length > 1 ? 's' : ''}
                </p>
              )}
            </div>
            {isStaff && (
              <button
                onClick={() => setShowFormNote(v => !v)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
                Saisir une note
              </button>
            )}
          </div>

          {/* Formulaire saisie note */}
          {showFormNote && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-indigo-800 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Saisie manuelle d'une note
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-indigo-700">UE / Matière <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      value={formNote.ueLabel}
                      onChange={e => setFormNote(p => ({ ...p, ueLabel: e.target.value }))}
                      className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl border border-indigo-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                      <option value="">-- Sélectionner --</option>
                      {UE_OPTIONS.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-indigo-700">Intitulé du cours / examen <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formNote.chapitreLabel}
                    onChange={e => setFormNote(p => ({ ...p, chapitreLabel: e.target.value }))}
                    placeholder="Ex: Devoir chapitre 3 — SARL"
                    className="w-full px-3 py-2 rounded-xl border border-indigo-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-indigo-700">Note (sur 20) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    step={0.5}
                    value={formNote.note}
                    onChange={e => setFormNote(p => ({ ...p, note: e.target.value }))}
                    placeholder="Ex: 15"
                    className="w-full px-3 py-2 rounded-xl border border-indigo-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-indigo-700">Année académique</label>
                  <input
                    type="text"
                    value={formNote.anneeAcademique}
                    onChange={e => setFormNote(p => ({ ...p, anneeAcademique: e.target.value }))}
                    placeholder="Ex: 2025-2026"
                    className="w-full px-3 py-2 rounded-xl border border-indigo-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-indigo-700">Commentaire (optionnel)</label>
                <textarea
                  value={formNote.commentaire}
                  onChange={e => setFormNote(p => ({ ...p, commentaire: e.target.value }))}
                  placeholder="Observations sur ce devoir..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-indigo-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowFormNote(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-indigo-200 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={ajouterNote}
                  disabled={savingNote}
                  className="flex-1 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
                >
                  {savingNote ? 'Enregistrement...' : 'Enregistrer la note'}
                </button>
              </div>
            </div>
          )}

          {/* Liste notes */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {notes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 gap-2 text-muted-foreground">
                <AlertCircle className="w-8 h-8 opacity-30" />
                <p className="text-sm">Aucune note enregistrée pour cet étudiant.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="text-left px-5 py-3 font-semibold text-muted-foreground">UE / Matière</th>
                      <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Cours / Examen</th>
                      <th className="text-left px-5 py-3 font-semibold text-muted-foreground hidden sm:table-cell">Année</th>
                      <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Note</th>
                      <th className="text-left px-5 py-3 font-semibold text-muted-foreground hidden md:table-cell">Mode</th>
                      <th className="text-right px-5 py-3 font-semibold text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notes.map((n, i) => (
                      <tr
                        key={n.id}
                        className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${i % 2 === 0 ? '' : 'bg-muted/10'}`}
                      >
                        <td className="px-5 py-3 font-medium text-foreground">{n.ueLabel}</td>
                        <td className="px-5 py-3 text-foreground">
                          <p>{n.chapitreLabel}</p>
                          {n.commentaire && <p className="text-xs text-muted-foreground mt-0.5">{n.commentaire}</p>}
                        </td>
                        <td className="px-5 py-3 text-muted-foreground hidden sm:table-cell">{n.anneeAcademique}</td>
                        <td className="px-5 py-3">
                          <NoteBadge note={n.note} />
                        </td>
                        <td className="px-5 py-3 hidden md:table-cell">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                            n.mode === 'manuel'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-sky-100 text-sky-800 border border-sky-200'
                          }`}>
                            {n.mode === 'manuel' ? 'Manuel' : 'Plateforme'}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          {isAdmin && (
                            <button
                              onClick={() => setConfirmDeleteNote(n.id)}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="px-5 py-3 border-t border-border/50 bg-muted/20 text-xs text-muted-foreground">
                  {notes.length} note{notes.length > 1 ? 's' : ''} — Moyenne : {moyenne || '--'}/20
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── MODAL SUPPRESSION NOTE ─── */}
      {confirmDeleteNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-100 text-red-600">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground">Supprimer cette note ?</h3>
            </div>
            <p className="text-sm text-muted-foreground">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDeleteNote(null)}
                className="flex-1 px-4 py-2 rounded-xl border border-border text-sm font-semibold hover:bg-muted transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => supprimerNote(confirmDeleteNote)}
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
