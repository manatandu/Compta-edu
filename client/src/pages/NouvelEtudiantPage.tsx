import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useUser } from '@/lib/userContext'
import { isAdminRole } from '@/lib/permissions'
import { TypeEtudiant, StatutEtudiant } from '@/lib/db'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useUniversites, useFacultes, useCours } from '@/lib/useFirestore'
import { anneeAcademiqueEnCours } from '@/lib/utils'
import {
  UserPlus, Save, X, GraduationCap, Building2,
  Phone, Mail, Hash, BookOpen, Calendar, ChevronDown
} from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

const PROMOTIONS = ['L1', 'L2', 'L3', 'M1', 'M2'] as const

const ANNEE_EN_COURS = anneeAcademiqueEnCours()

interface FormData {
  type: TypeEtudiant
  nom: string
  prenom: string
  matricule: string
  universiteId: string
  faculteId: string
  coursId: string
  promotion: string
  anneeAcademique: string
  statut: StatutEtudiant
  telephone: string
  email: string
  dateInscription: string
}

const FORM_INIT: FormData = {
  type: 'externe',
  nom: '',
  prenom: '',
  matricule: '',
  universiteId: '',
  faculteId: '',
  coursId: '',
  promotion: '',
  anneeAcademique: ANNEE_EN_COURS,
  statut: 'actif',
  telephone: '',
  email: '',
  dateInscription: new Date().toISOString().split('T')[0],
}

export default function NouvelEtudiantPage() {
  const user = useUser()
  const [, navigate] = useLocation()
  const { toast } = useToast()
  const [form, setForm] = useState<FormData>(FORM_INIT)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  // ─── Données Firestore en cascade ─────────────────────────────────────────
  const { universites } = useUniversites()
  const { facultes } = useFacultes(form.universiteId || undefined)
  const { cours } = useCours(form.faculteId || undefined, form.universiteId || undefined)

  // Cours sélectionné (pour affichage du nom dans le select)
  const coursSelectionne = cours.find(c => c.id === form.coursId)

  // Reset faculté + cours si université change
  function setUniversite(id: string) {
    setForm(prev => ({ ...prev, universiteId: id, faculteId: '', coursId: '' }))
    setErrors(prev => ({ ...prev, universiteId: undefined }))
  }

  // Reset cours si faculté change
  function setFaculte(id: string) {
    setForm(prev => ({ ...prev, faculteId: id, coursId: '' }))
    setErrors(prev => ({ ...prev, faculteId: undefined }))
  }

  function set(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const isAdmin = isAdminRole(user)
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Accès réservé à l'administrateur.</p>
      </div>
    )
  }

  function valider(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.nom.trim()) e.nom = 'Nom requis'
    if (!form.prenom.trim()) e.prenom = 'Prénom requis'
    if (!form.universiteId) e.universiteId = 'Université requise'
    if (!form.faculteId) e.faculteId = 'Faculté requise'
    if (!form.promotion) e.promotion = 'Promotion requise'
    if (!form.anneeAcademique.trim()) e.anneeAcademique = 'Année académique requise'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function soumettre() {
    if (!valider()) return
    setLoading(true)
    try {
      const uniObj = universites.find(u => u.id === form.universiteId)
      const facObj = facultes.find(f => f.id === form.faculteId)
      const coursObj = cours.find(c => c.id === form.coursId)

      await addDoc(collection(db, 'etudiants'), {
        type: form.type,
        userId: null,
        nom: form.nom.trim().toUpperCase(),
        prenom: form.prenom.trim(),
        matricule: form.matricule.trim(),
        // Noms lisibles (pour affichage)
        universite: uniObj?.nom || '',
        faculte: facObj?.nom || '',
        filiere: coursObj?.nom || '',
        promotion: form.promotion,
        // IDs (pour filtres)
        universiteId: form.universiteId || null,
        faculteId: form.faculteId || null,
        coursId: form.coursId || null,
        anneeAcademique: form.anneeAcademique.trim(),
        statut: form.statut,
        photo: null,
        telephone: form.telephone.trim(),
        email: form.email.trim().toLowerCase(),
        dateInscription: form.dateInscription,
        createdBy: user!.id,
        createdAt: serverTimestamp(),
      })

      toast({ title: 'Étudiant ajouté', description: `${form.prenom} ${form.nom.toUpperCase()} a été enregistré.` })
      navigate('/gestion-etudiants')
    } catch (e) {
      console.error(e)
      toast({ title: 'Erreur', description: "Impossible d'enregistrer l'étudiant.", variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 pb-10 animate-fadeIn max-w-3xl mx-auto px-4">

      {/* ─── HEADER ─── */}
      <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Tableau de bord', route: '/' },
            { label: 'Gestion des étudiants', route: '/gestion-etudiants' },
            { label: 'Nouvel étudiant' },
          ]}
          color="indigo"
        />
        <div className="flex items-center gap-3 mt-1">
          <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">Nouvel étudiant</h1>
            <p className="text-sm text-muted-foreground">Enregistrer un étudiant interne ou externe</p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-6">

        {/* ─── TYPE ─── */}
        <section className="space-y-3">
          <h2 className="text-sm font-display font-semibold text-foreground flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            Type d'étudiant
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {([
              ['externe', 'Externe', "Autre université, géré manuellement"],
              ['interne', 'Interne', 'A un compte sur la plateforme'],
            ] as const).map(([val, label, desc]) => (
              <button
                key={val}
                onClick={() => set('type', val)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  form.type === val
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-border hover:border-indigo-300'
                }`}
              >
                <p className="font-semibold text-foreground text-sm">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </button>
            ))}
          </div>
        </section>

        <hr className="border-border" />

        {/* ─── IDENTITÉ ─── */}
        <section className="space-y-4">
          <h2 className="text-sm font-display font-semibold text-foreground">Identité</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Nom <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.nom}
                onChange={e => set('nom', e.target.value)}
                placeholder="Ex: TANDU"
                className={`w-full px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.nom ? 'border-red-400' : 'border-border'}`}
              />
              {errors.nom && <p className="text-xs text-red-500">{errors.nom}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Prénom <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.prenom}
                onChange={e => set('prenom', e.target.value)}
                placeholder="Ex: Manasse"
                className={`w-full px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.prenom ? 'border-red-400' : 'border-border'}`}
              />
              {errors.prenom && <p className="text-xs text-red-500">{errors.prenom}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Hash className="w-3 h-3" /> Matricule
            </label>
            <input
              type="text"
              value={form.matricule}
              onChange={e => set('matricule', e.target.value)}
              placeholder="Ex: CPCC/2025/001"
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </section>

        <hr className="border-border" />

        {/* ─── ÉTABLISSEMENT (cascade Firestore) ─── */}
        <section className="space-y-4">
          <h2 className="text-sm font-display font-semibold text-foreground flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-500" />
            Établissement
          </h2>

          {/* Université */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              Université <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={form.universiteId}
                onChange={e => setUniversite(e.target.value)}
                className={`w-full appearance-none pl-3 pr-8 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.universiteId ? 'border-red-400' : 'border-border'}`}
              >
                <option value="">-- Sélectionner une université --</option>
                {universites.map(u => (
                  <option key={u.id} value={u.id}>{u.nom}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
            {universites.length === 0 && (
              <p className="text-xs text-amber-600">Aucune université dans le système — créez-en dans l'espace ADM.</p>
            )}
            {errors.universiteId && <p className="text-xs text-red-500">{errors.universiteId}</p>}
          </div>

          {/* Faculté */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              Faculté <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={form.faculteId}
                onChange={e => setFaculte(e.target.value)}
                disabled={!form.universiteId}
                className={`w-full appearance-none pl-3 pr-8 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 ${errors.faculteId ? 'border-red-400' : 'border-border'}`}
              >
                <option value="">-- Sélectionner une faculté --</option>
                {facultes.map(f => (
                  <option key={f.id} value={f.id}>{f.nom}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
            {form.universiteId && facultes.length === 0 && (
              <p className="text-xs text-amber-600">Aucune faculté pour cette université — créez-en dans l'espace ADM.</p>
            )}
            {errors.faculteId && <p className="text-xs text-red-500">{errors.faculteId}</p>}
          </div>

          {/* Cours */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Cours
            </label>
            <div className="relative">
              <select
                value={form.coursId}
                onChange={e => set('coursId', e.target.value)}
                disabled={!form.faculteId}
                className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
              >
                <option value="">-- Sélectionner un cours (optionnel) --</option>
                {cours.map(c => (
                  <option key={c.id} value={c.id}>{c.nom}{c.promotion ? ` — ${c.promotion}` : ''}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
            {form.faculteId && cours.length === 0 && (
              <p className="text-xs text-amber-600">Aucun cours pour cette faculté — créez-en dans l'espace ADM.</p>
            )}
          </div>

          {/* Promotion — catalogue fixe */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Promotion <span className="text-red-500">*</span></label>
            <div className="relative">
              <select
                value={form.promotion}
                onChange={e => set('promotion', e.target.value)}
                className={`w-full appearance-none pl-3 pr-8 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.promotion ? 'border-red-400' : 'border-border'}`}
              >
                <option value="">-- Choisir une promotion --</option>
                {PROMOTIONS.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
            {errors.promotion && <p className="text-xs text-red-500">{errors.promotion}</p>}
          </div>
        </section>

        <hr className="border-border" />

        {/* ─── SCOLARITÉ ─── */}
        <section className="space-y-4">
          <h2 className="text-sm font-display font-semibold text-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-500" />
            Scolarité
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Année académique <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.anneeAcademique}
                onChange={e => set('anneeAcademique', e.target.value)}
                placeholder="Ex: 2025-2026"
                className={`w-full px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.anneeAcademique ? 'border-red-400' : 'border-border'}`}
              />
              {errors.anneeAcademique && <p className="text-xs text-red-500">{errors.anneeAcademique}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Statut</label>
              <div className="relative">
                <select
                  value={form.statut}
                  onChange={e => set('statut', e.target.value as StatutEtudiant)}
                  className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="actif">Actif</option>
                  <option value="suspendu">Suspendu</option>
                  <option value="diplome">Diplômé</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Date d'inscription</label>
              <input
                type="date"
                value={form.dateInscription}
                onChange={e => set('dateInscription', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* ─── CONTACT ─── */}
        <section className="space-y-4">
          <h2 className="text-sm font-display font-semibold text-foreground">Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <Phone className="w-3 h-3" /> Téléphone
              </label>
              <input
                type="tel"
                value={form.telephone}
                onChange={e => set('telephone', e.target.value)}
                placeholder="Ex: +243 899 000 000"
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <Mail className="w-3 h-3" /> Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="Ex: etudiant@gmail.com"
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* ─── BOUTONS ─── */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => navigate('/gestion-etudiants')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" /> Annuler
          </button>
          <button
            onClick={soumettre}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </div>
  )
}
