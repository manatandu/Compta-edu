import React, { useMemo, useEffect, useRef, useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import {
  BookOpen, BookMarked, BarChart2, FileText,
  ClipboardList, GraduationCap, FolderOpen, MessageSquare,
  TrendingUp, ArrowRight, Layers, ChevronRight, Award, Sparkles,
  LibraryBig, Lock, CheckCircle2, Clock, FileDown, Users, User, Target,
  Download, Calculator, FileSpreadsheet, TrendingDown, BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { isDevoirExpire, QuestionQCM } from '@/lib/db'
import DevoirChapitreEtudiant from '@/components/DevoirChapitreEtudiant'
import {
  useSessions, useEcritures, useAllCours, useAllDevoirs, useSoumissionsEtudiant,
  useUniversites, useFacultes, useAllSessions, useAllEcritures, useExercices, useTentatives, usePresencesEtudiant,
  useAllSoumissions
} from '@/lib/useFirestore'
import { createSoumissionAsync, getUsersAsync, createSessionAsync, COURS_SYSTEME } from '@/lib/db-firebase'
import { useUser } from '@/lib/userContext'
import { useModule } from '@/lib/moduleContext'
import { cn } from '@/lib/utils'

// ─── Composant compteur animé ─────────────────────────────────────────────────
function AnimatedCount({ target, suffix = '' }: { target: number | string; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  const isNum = typeof target === 'number'

  useEffect(() => {
    if (!isNum) return
    if (target === 0) return
    let start = 0
    const duration = 900
    const step = 16
    const increment = target / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setDisplay(target); clearInterval(timer) }
      else setDisplay(Math.floor(start))
    }, step)
    return () => clearInterval(timer)
  }, [target, isNum])

  if (!isNum) return <span>{target}</span>
  return <span>{display}{suffix}</span>
}

// ─── Utilitaire université ────────────────────────────────────────────────────
function UniversiteName({ universiteId }: { universiteId: string }) {
  const { universites } = useUniversites()
  const uni = universites.find(u => u.id === universiteId)
  return <span>{uni ? uni.nom : ''}</span>
}
function FaculteName({ faculteId }: { faculteId: string }) {
  const { facultes } = useFacultes()
  const fac = facultes.find(f => f.id === faculteId)
  return <span>{fac ? fac.nom : ''}</span>
}
function CoursNom({ coursId }: { coursId: string }) {
  const { cours } = useAllCours()
  const c = cours.find(x => x.id === coursId)
  return <span>{c ? c.nom : ''}</span>
}

// ─── Composants devoir ───────────────────────────────────────────────────────

function SoumettreButton({ devoirId, etudiantId, sessionId, navigate }: { devoirId: string; etudiantId: string; sessionId: string; navigate: (p: string) => void }) {
  return (
    <Button
      size="sm"
      variant="outline"
      className="w-full gap-1.5"
      onClick={() => navigate(`/apercu-devoir?devoir=${devoirId}&session=${sessionId}`)}
    >
      <CheckCircle2 className="h-3.5 w-3.5" />Vérifier avant soumission
    </Button>
  )
}

// Bouton "Commencer le devoir" : crée une session dédiée et redirige vers le journal
// ────────────────────────────────────────────────────────────────────────────
// QCMForm : Interface étudiant pour répondre à un QCM + correction automatique
// ────────────────────────────────────────────────────────────────────────────
function QCMForm({ devoir, etudiantId, soumission }: { devoir: any; etudiantId: string; soumission: any }) {
  const questions: QuestionQCM[] = devoir.questions || []
  const [reponses, setReponses] = useState<Record<number, number>>({})
  const [soumis, setSoumis] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resultat, setResultat] = useState<{ score: number; total: number; details: boolean[] } | null>(null)

  // Si déjà soumis avec note
  if (soumission?.statut === 'note') {
    return (
      <div className="mt-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3 space-y-1">
        <p className="text-sm font-semibold text-green-700 dark:text-green-400">✓ QCM corrigé automatiquement</p>
        <p className="text-sm text-green-700 dark:text-green-400">Note : <strong>{soumission.note}/10</strong></p>
        {soumission.commentaire && <p className="text-xs text-muted-foreground">{soumission.commentaire}</p>}
      </div>
    )
  }

  if (soumission?.statut === 'soumis') {
    return (
      <p className="mt-2 text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
        <Lock className="h-3 w-3" /> QCM soumis : correction en cours...
      </p>
    )
  }

  if (questions.length === 0) {
    return <p className="mt-2 text-xs text-muted-foreground">Aucune question disponible pour ce QCM.</p>
  }

  const toutesRépondu = questions.every((_, i) => reponses[i] !== undefined)

  const handleSubmit = async () => {
    if (!toutesRépondu) return
    setLoading(true)
    // Calcul score
    const details = questions.map((q, i) => reponses[i] === q.bonneReponse)
    const score = details.filter(Boolean).length
    const note = Math.round((score / questions.length) * 10 * 10) / 10
    const reponsesArray = questions.map((_, i) => reponses[i])
    try {
      await createSoumissionAsync({
        devoirId: devoir.id,
        etudiantId,
        reponsesQCM: reponsesArray,
        dateSoumission: new Date().toISOString(),
        statut: 'note',           // QCM : corrigé automatiquement
        note,
        commentaire: `Correction automatique : ${score}/${questions.length} bonne${score > 1 ? 's' : ''} réponse${score > 1 ? 's' : ''}.`,
        dateCorrection: new Date().toISOString(),
      } as any)
      setResultat({ score, total: questions.length, details })
      setSoumis(true)
    } catch (err: any) {
      console.error('Erreur soumission QCM:', err)
    }
    setLoading(false)
  }

  // Après soumission : afficher le résultat avec correction détaillée
  if (soumis && resultat) {
    const note = Math.round((resultat.score / resultat.total) * 10 * 10) / 10
    const mention = note >= 8 ? 'Excellent' : note >= 6 ? 'Bien' : note >= 5 ? 'Satisfaisant' : 'Insuffisant'
    const mentionColor = note >= 8 ? 'text-green-600 dark:text-green-400' : note >= 6 ? 'text-blue-600 dark:text-blue-400' : note >= 5 ? 'text-amber-600 dark:text-amber-400' : 'text-destructive'
    return (
      <div className="mt-3 space-y-3">
        <div className="bg-muted rounded-lg p-4 text-center space-y-1">
          <p className="text-2xl font-bold text-foreground">{note}<span className="text-sm font-normal text-muted-foreground">/10</span></p>
          <p className={`text-sm font-semibold ${mentionColor}`}>{mention}</p>
          <p className="text-xs text-muted-foreground">{resultat.score}/{resultat.total} bonne{resultat.score > 1 ? 's' : ''} réponse{resultat.score > 1 ? 's' : ''}</p>
        </div>
        {questions.map((q, i) => (
          <div key={i} className={`rounded-lg border p-3 space-y-1.5 ${ resultat.details[i] ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20' }`}>
            <p className="text-xs font-medium text-foreground">{i + 1}. {q.texte}</p>
            <p className="text-xs">
              {resultat.details[i]
                ? <span className="text-green-600 dark:text-green-400">✓ Bonne réponse : {q.choix[q.bonneReponse]}</span>
                : <span className="text-destructive">✗ Votre réponse : {q.choix[reponses[i]]} : Bonne réponse : {q.choix[q.bonneReponse]}</span>
              }
            </p>
            {q.explication && <p className="text-xs text-muted-foreground italic">{q.explication}</p>}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-3 space-y-4">
      {questions.map((q, qIdx) => (
        <div key={qIdx} className="space-y-2">
          <p className="text-sm font-medium text-foreground">{qIdx + 1}. {q.texte}</p>
          <div className="space-y-1.5">
            {q.choix.map((choix, cIdx) => (
              <label
                key={cIdx}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                  reponses[qIdx] === cIdx
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <input
                  type="radio"
                  name={`qcm-${devoir.id}-q${qIdx}`}
                  checked={reponses[qIdx] === cIdx}
                  onChange={() => setReponses(r => ({ ...r, [qIdx]: cIdx }))}
                  className="accent-primary"
                />
                <span className="text-sm">{choix}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <Button
        onClick={handleSubmit}
        disabled={!toutesRépondu || loading}
        className="w-full gap-1.5"
      >
        {loading ? 'Soumission...' : `Soumettre le QCM (${Object.keys(reponses).length}/${questions.length} répondu${Object.keys(reponses).length > 1 ? 'es' : 'e'})`}
      </Button>
    </div>
  )
}

function CommencerDevoirButton({ devoir, etudiantId, sessionExistante, navigate, module, faculteId, universiteId }: {
  devoir: any; etudiantId: string; sessionExistante: any | null; navigate: (p: string) => void; module: string; faculteId?: string; universiteId?: string
}) {
  const [loading, setLoading] = React.useState(false)
  const handleCommencer = async () => {
    setLoading(true)
    try {
      let session = sessionExistante
      if (!session) {
        // Créer une session dédiée nommée d'après le devoir, avec le bon module
        session = await createSessionAsync({
          nom: devoir.titre,
          exercice: new Date().getFullYear(),
          description: `Devoir : ${devoir.titre}`,
          userId: etudiantId,
          devoirId: devoir.id,
          verrouille: false,
          faculteId: faculteId || undefined,
          universiteId: universiteId || undefined,
        } as any, module as any)
      }
      // Naviguer vers le journal en sélectionnant automatiquement la session du devoir
      navigate(`/journal?session=${session.id}`)
    } catch(e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button size="sm" className="w-full gap-1.5" onClick={handleCommencer} disabled={loading}>
      {loading ? 'Création...' : sessionExistante ? '▶ Continuer le devoir' : '▶ Commencer le devoir'}
    </Button>
  )
}

// Zone de réponse théorique
function ReponseTheoriqueForm({ devoir, etudiantId, soumission }: { devoir: any; etudiantId: string; soumission: any }) {
  const [reponse, setReponse] = React.useState('')
  const [etape, setEtape] = React.useState<'redaction' | 'verification' | 'submitting'>('redaction')

  if (soumission) return null // déjà soumis, géré ailleurs

  const handleSoumettre = async () => {
    setEtape('submitting')
    try {
      await createSoumissionAsync({ devoirId: devoir.id, etudiantId, reponseTexte: reponse.trim() } as any)
      window.location.reload()
    } catch(e) {
      console.error(e)
      setEtape('verification')
    }
  }

  // Étape 1 : rédaction
  if (etape === 'redaction') {
    return (
      <div className="mt-3 space-y-2">
        <textarea
          value={reponse}
          onChange={e => setReponse(e.target.value)}
          placeholder="Rédigez vos réponses ici..."
          rows={5}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-y focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <Button
          size="sm"
          variant="outline"
          className="w-full gap-1.5"
          onClick={() => setEtape('verification')}
          disabled={!reponse.trim()}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />Vérifier avant soumission
        </Button>
      </div>
    )
  }

  // Étape 2 : vérification + soumission
  return (
    <div className="mt-3 rounded-md border border-border bg-muted/40 p-3 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-foreground">Vos réponses</p>
        <button onClick={() => setEtape('redaction')} className="text-xs text-muted-foreground hover:text-foreground">× Modifier</button>
      </div>
      <div className="rounded-md bg-background border border-border px-3 py-2 text-sm text-foreground whitespace-pre-wrap max-h-40 overflow-y-auto">
        {reponse}
      </div>
      <div className="rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-3 py-2">
        <p className="text-xs text-amber-800 dark:text-amber-300">
          Une fois soumis, votre devoir sera transmis au professeur et vous ne pourrez plus modifier vos réponses.
        </p>
      </div>
      <Button
        size="sm"
        className="w-full"
        onClick={handleSoumettre}
        disabled={etape === 'submitting'}
      >
        {etape === 'submitting' ? 'Soumission en cours...' : 'Soumettre définitivement'}
      </Button>
    </div>
  )
}

// ─── Palettes couleurs UE ────────────────────────────────────────────────────
const UE_COLORS = [
  'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  'bg-gray-50 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400',
  'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
]
const UE_RINGS = [
  'hover:ring-blue-300/40', 'hover:ring-indigo-300/40', 'hover:ring-violet-300/40',
  'hover:ring-amber-300/40', 'hover:ring-gray-300/40', 'hover:ring-emerald-300/40',
  'hover:ring-cyan-300/40', 'hover:ring-teal-300/40', 'hover:ring-blue-300/40',
  'hover:ring-sky-300/40', 'hover:ring-rose-300/40', 'hover:ring-orange-300/40',
  'hover:ring-purple-300/40',
]

// Raccourcis outils (hors cours UE)
const MODULES_OUTILS = [
  { path: '/exercices', label: 'Exercices',  desc: "Pratiquer & s'évaluer", icon: GraduationCap, light: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300', ring: 'hover:ring-orange-300/40' },
  { path: '/documents', label: 'Documents', desc: 'Ressources pédagogiques',  icon: FolderOpen,    light: 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',    ring: 'hover:ring-teal-300/40' },
]

// Salutation selon l'heure
function greeting() {
  const h = new Date().getHours()
  if (h >= 5 && h < 12)  return 'Bonjour'
  if (h >= 12 && h < 18) return 'Bonjour'
  if (h >= 18 && h < 22) return 'Bonsoir'
  return 'Bonne nuit'
}

// Délais en cascade pour les modules
const MODULE_DELAYS = ['0ms','50ms','100ms','150ms','200ms','250ms','300ms','350ms']

export default function DashboardPage() {
  const [, navigate] = useHashLocation()
  const user = useUser()
  const module = useModule()
  const isStudent = user?.role === 'etudiant'
  const isAdmin   = ['admin', 'professeur', 'assistant'].includes(user?.role || '')

  // Sessions et écritures : version personnelle pour étudiants, globale pour admins
  const { sessions: mySessions }        = useSessions(user?.id)
  const { ecritures: myEcritures }      = useEcritures(user?.id)
  const { sessions: allSessionsRaw }    = useAllSessions()
  const { ecritures: allEcrituresRaw }  = useAllEcritures()

  const sessions  = isAdmin ? allSessionsRaw  : mySessions
  const ecritures = isAdmin ? allEcrituresRaw : myEcritures

  const { cours: allCoursRaw } = useAllCours()
  const { devoirs: allDevoirs } = useAllDevoirs()
  const { universites: allUniversites } = useUniversites()
  const { facultes: allFacultes } = useFacultes()
  const { soumissions: mesSoumissions } = useSoumissionsEtudiant(user?.id)
  const { soumissions: toutesLesSoumissions } = useAllSoumissions()
  const [users, setUsers] = React.useState<any[]>([])
  const { exercices: allExercices } = useExercices()
  const { tentatives: myTentativesRaw } = useTentatives(user?.id)
  const { presences: mesPresences } = usePresencesEtudiant(isStudent ? user?.id : undefined)

  React.useEffect(() => {
    getUsersAsync().then(setUsers).catch(() => {})
  }, [])

  const myTentatives = useMemo(() => {
    return myTentativesRaw.filter(t => !t.modeEntrainement)
  }, [myTentativesRaw])

  const bestScore = myTentatives.length > 0
    ? Math.max(...myTentatives.map(t => t.score))
    : null



  // Cotes étudiant
  const totalSeances = mesPresences.length
  const nbPresent = mesPresences.filter(p => p.etudiants?.find((e: any) => e.etudiantId === user?.id)?.present).length
  const cotePresenceEtudiant = totalSeances > 0 ? parseFloat((5 * nbPresent / totalSeances).toFixed(2)) : null

  // Cote devoirs : 5 × (cumul notes obtenues / cumul notes max)
  const soumissionsNotees = mesSoumissions.filter(s => s.statut === 'note' && typeof s.note === 'number')
  const cumulNotesEtudiant = soumissionsNotees.reduce((acc, s) => acc + (s.note ?? 0), 0)
  const totalDevoirsNotesEtudiant = soumissionsNotees.length
  const coteDevoirsEtudiant = totalDevoirsNotesEtudiant > 0
    ? parseFloat((5 * cumulNotesEtudiant / (totalDevoirsNotesEtudiant * 10)).toFixed(2))
    : null

  const totalCoteEtudiant = (cotePresenceEtudiant !== null || coteDevoirsEtudiant !== null)
    ? parseFloat(((cotePresenceEtudiant ?? 0) + (coteDevoirsEtudiant ?? 0)).toFixed(2))
    : null
  const mentionEtudiant = totalCoteEtudiant !== null
    ? totalCoteEtudiant >= 8 ? 'Excellent' : totalCoteEtudiant >= 6 ? 'Bien' : totalCoteEtudiant >= 5 ? 'Satisfaisant' : 'Insuffisant'
    : null

  // Cours de l'étudiant : si aucun coursId, accès bloqué (s'il y a des cours créés)
  const allCours    = allCoursRaw.filter(c => c.actif)
  const userCoursIds: string[] = (user as any)?.coursIds || []
  const userCours   = allCours.filter(c => userCoursIds.includes(c.id))
  // Un étudiant sans coursIds assignés (mais qu'il existe des cours) est bloqué
  const coursBloque = isStudent && allCours.length > 0 && userCours.length === 0

  // Stats admin enrichies
  const mesEtudiants = users.filter(u => {
    if (u.role !== 'etudiant') return false
    const cb = (u as any).createdBy
    if (!cb) return false
    return cb === user?.id || cb === (user as any)?.username
  })
  const nbEtudiants    = mesEtudiants.filter(u => u.actif && (u as any).statutInscription !== 'en_attente').length
  const nbEnAttente    = mesEtudiants.filter(u => (u as any).statutInscription === 'en_attente').length
  const nbNonCorriges  = isAdmin ? toutesLesSoumissions.filter(s => s.statut === 'soumis').length : 0

  const stats = isStudent
    ? [
        { label: 'Devoirs',   value: allDevoirs.filter(d => {
          if (!userCoursIds.includes(d.coursId) || !d.actif) return false
          if (d.faculteId && (user as any)?.faculteId && d.faculteId !== (user as any)?.faculteId) return false
          const cours = allCours.find(c => c.id === d.coursId)
          if (cours?.promotion && (user as any)?.classe && cours.promotion !== (user as any)?.classe) return false
          return true
        }).length, icon: ClipboardList },
        { label: 'Exercices', value: allExercices.filter(e => e.actif).length, icon: GraduationCap },
        { label: 'Cours',     value: userCours.length,                          icon: BookOpen },
        { label: 'Messages',  value: 0,                                         icon: MessageSquare },
      ]
    : [
        { label: 'Étudiants actifs',  value: nbEtudiants,   icon: Users,          color: 'text-green-300' },
        { label: 'En attente',         value: nbEnAttente,   icon: Clock,          color: nbEnAttente > 0 ? 'text-amber-300' : 'text-blue-300/80' },
        { label: 'Non corrigés',       value: nbNonCorriges, icon: ClipboardList,  color: nbNonCorriges > 0 ? 'text-rose-300' : 'text-blue-300/80' },
        { label: 'Cours',             value: allCours.length, icon: BookOpen,      color: 'text-blue-300/80' },
      ]

  return (
    <div className="space-y-6 pb-8">

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5A4FF0] via-[#4338CA] to-[#241F6E] px-6 py-6 sm:px-8 sm:py-7 animate-scaleIn"
        style={{ animationDelay: '0ms' }}
      >
        {/* 2 orbes décoratifs */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-52 w-52 rounded-full bg-secondary/15 animate-heroOrb"
          style={{ animationDelay: '0s' }} />
        <div className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-secondary/10 animate-heroOrb"
          style={{ animationDelay: '2s' }} />

        {/* Contenu hero */}
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Logo + identité */}
          <div
            className="flex items-center gap-4 animate-slideRight"
            style={{ animationDelay: '100ms' }}
          >
            <div className="relative h-16 w-16 shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-secondary/30 animate-pulseGlow" />
              <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-white/10 ring-2 ring-white/25 flex items-center justify-center backdrop-blur-sm">
                <img src="/assets/campus-ohada-logo.svg" alt="Campus OHADA" className="h-13 w-13 animate-float" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                {greeting()}{isStudent
                  ? (user?.nom ? ` ${user.nom.toUpperCase()}` : '')
                  : (user?.prenom ? ` ${user.prenom.toUpperCase()}` : '')} !
              </h1>

              {/* Étudiant : nom complet → promotion → faculté → université */}
              {isStudent && (
                <div className="mt-1 space-y-0.5">
                  {/* Nom complet — toujours avec 1ère lettre majuscule */}
                  <p className="text-sm text-white font-semibold flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-secondary shrink-0" />
                    <span>{[user?.nom, user?.prenom].filter(Boolean).map(s => (s as string).charAt(0).toUpperCase() + (s as string).slice(1)).join(' ')}</span>
                  </p>
                  {/* Promotion */}
                  {(user as any).classe && (
                    <p className="text-sm text-white/75 flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-secondary shrink-0" />
                      <span>{(user as any).classe}</span>
                    </p>
                  )}
                  {/* Faculté — affiché uniquement si le nom est trouvé dans Firestore */}
                  {(() => {
                    const nom = allFacultes.find(f => f.id === (user as any).faculteId)?.nom
                    return nom ? (
                      <p className="text-sm text-white/75 flex items-center gap-1.5">
                        <BookMarked className="h-3.5 w-3.5 text-secondary shrink-0" />
                        <span>{nom}</span>
                      </p>
                    ) : null
                  })()}
                  {/* Université — affiché uniquement si le nom est trouvé dans Firestore */}
                  {(() => {
                    const nom = allUniversites.find(u => u.id === (user as any).universiteId)?.nom
                    return nom ? (
                      <p className="text-sm text-white/75 flex items-center gap-1.5">
                        <GraduationCap className="h-3.5 w-3.5 text-secondary shrink-0" />
                        <span>{nom}</span>
                      </p>
                    ) : null
                  })()}
                </div>
              )}

              {/* Prof / Assistant : faculté → université */}
              {!isStudent && user?.role !== 'admin' && (
                <div className="mt-1 space-y-0.5">
                  {(() => {
                    const fId = (user as any).faculteId
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
                    const uId = (user as any).universiteId
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
              {user?.role === 'admin' && (
                <p className="text-sm text-white/75 mt-1">
                  Assistant : <span className="text-secondary font-semibold">Manasse TANDU SAVA</span>
                </p>
              )}


            </div>
          </div>


        </div>

        {/* Barre de stats */}
        <div className="relative mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s, i) => {
            const Icon = s.icon
            const iconColor = (s as any).color || 'text-white/80'
            return (
              <div
                key={s.label}
                className="rounded-lg bg-white/10 backdrop-blur-sm px-3 py-3 flex items-center gap-2.5 border border-white/10 hover:bg-white/15 transition-colors duration-200 animate-slideUp"
                style={{ animationDelay: `${300 + i * 60}ms` }}
              >
                <div className="h-7 w-7 rounded-md bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                  <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
                </div>
                <div>
                  <p className="text-xl font-bold text-white leading-none tabular-nums">
                    {typeof s.value === 'number'
                      ? <AnimatedCount target={s.value} />
                      : s.value
                    }
                  </p>
                  <p className="text-xs text-white/70 mt-0.5 font-medium">{s.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ══ MODULES — grille de carreaux ════════════════════════════════════ */}
      <div className="animate-slideRight" style={{ animationDelay: '600ms' }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground">Modules</h2>
          <span className="text-xs text-muted-foreground">Accès rapide à tous les outils</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* Carreau Mes cours */}
          <button
            onClick={() => navigate('/mes-cours')}
            className={cn(
              'group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 text-left',
              'transition-all duration-200 hover:bg-muted/40 hover:border-primary/30 hover:shadow-sm',
              'animate-scaleIn'
            )}
            style={{ animationDelay: '650ms' }}
          >
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 flex items-center justify-center">
              <LibraryBig className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-foreground leading-tight">Mes cours</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{COURS_SYSTEME.filter(c => c.actif).length} cours actifs</p>
            </div>
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
          </button>

          {/* Carreau Bibliothèque */}
          <button
            onClick={() => navigate('/dictionnaire')}
            className={cn(
              'group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 text-left',
              'transition-all duration-200 hover:bg-muted/40 hover:border-violet-300/30 hover:shadow-sm',
              'animate-scaleIn'
            )}
            style={{ animationDelay: '700ms' }}
          >
            <div className="h-10 w-10 rounded-xl bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 flex items-center justify-center">
              <BookMarked className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-foreground leading-tight">Bibliothèque</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-tight">Lois, textes officiels PDF</p>
            </div>
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all duration-200" />
          </button>

          {/* Carreau Exercices */}
          <button
            onClick={() => navigate('/exercices')}
            className={cn(
              'group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 text-left',
              'transition-all duration-200 hover:bg-muted/40 hover:border-orange-300/30 hover:shadow-sm',
              'animate-scaleIn'
            )}
            style={{ animationDelay: '800ms' }}
          >
            <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 flex items-center justify-center">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-foreground leading-tight">Exercices</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-tight">Pratiquer & s&apos;évaluer</p>
            </div>
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all duration-200" />
          </button>

          {/* Carreau Documents */}
          <button
            onClick={() => navigate('/documents')}
            className={cn(
              'group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 text-left',
              'transition-all duration-200 hover:bg-muted/40 hover:border-teal-300/30 hover:shadow-sm',
              'animate-scaleIn'
            )}
            style={{ animationDelay: '850ms' }}
          >
            <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 flex items-center justify-center">
              <FolderOpen className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-foreground leading-tight">Documents</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-tight">Ressources pédagogiques</p>
            </div>
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all duration-200" />
          </button>


        </div>
      </div>

      {/* ══ MES DEVOIRS (section étudiant uniquement) ══════════════════ */}
      {isStudent && userCoursIds.length > 0 && (() => {
        const userFaculteId = (user as any)?.faculteId || ''
        const userPromotion = (user as any)?.classe || ''
        const mesDevoirs = allDevoirs.filter(d => {
          if (!userCoursIds.includes(d.coursId)) return false
          if (!d.actif) return false
          if (d.faculteId && userFaculteId && d.faculteId !== userFaculteId) return false
          // Filtre promotion via le cours : si le cours a une promotion, l'étudiant doit l'avoir aussi
          const cours = allCours.find(c => c.id === d.coursId)
          if (cours?.promotion && userPromotion && cours.promotion !== userPromotion) return false
          return true
        })
        if (mesDevoirs.length === 0) return null
        return (
          <div className="animate-slideUp" style={{ animationDelay: '1250ms' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-foreground">Mes devoirs</h2>
              <span className="text-xs text-muted-foreground">{mesDevoirs.length} devoir{mesDevoirs.length > 1 ? 's' : ''}</span>
            </div>
            <div className="space-y-2">
              {mesDevoirs.map((dev, i) => {
                const soum = mesSoumissions.find(s => s.devoirId === dev.id)
                const expire = isDevoirExpire(dev)
                const peutSoumettre = !expire && !soum
                const sessEtudiant = sessions.filter(s => s.userId === user!.id).sort((a,b) => b.annee - a.annee)[0]
                const cours = allCours.find(c => c.id === dev.coursId)

                let statutLabel = 'À faire'
                let statutColor = 'border-gray-400 text-gray-500'
                let StatutIcon = Clock
                if (soum?.statut === 'soumis') { statutLabel = 'Soumis'; statutColor = 'border-blue-400 text-blue-600'; StatutIcon = Lock }
                if (soum?.statut === 'note') { statutLabel = 'Noté'; statutColor = 'border-green-400 text-green-600'; StatutIcon = CheckCircle2 }
                if (expire && !soum) { statutLabel = 'Délai expiré'; statutColor = 'border-red-400 text-red-500'; StatutIcon = Clock }

                return (
                  <div
                    key={dev.id}
                    className="rounded-xl border border-border bg-card px-4 py-3 animate-slideUp"
                    style={{ animationDelay: `${1300 + i * 60}ms` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <LibraryBig className="h-4 w-4 text-primary shrink-0" />
                          <p className="font-semibold text-sm text-foreground">{dev.titre}</p>
                          <Badge variant="outline" className={`text-xs shrink-0 ${statutColor}`}>
                            <StatutIcon className="h-3 w-3 mr-1" />{statutLabel}
                          </Badge>
                        </div>
                        {cours && <p className="text-xs text-muted-foreground mt-0.5">{cours.nom}</p>}
                        {dev.consignes && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{dev.consignes}</p>}
                        <p className="text-xs text-muted-foreground mt-1">
                          Date limite : {new Date(dev.dateLimit).toLocaleDateString('fr-FR')}
                        </p>
                        {((dev as any).pdfUrl || (dev as any).pdfData) && (
                          <a
                            href={(dev as any).pdfUrl || (dev as any).pdfData}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:underline"
                          >
                            <FileDown className="h-3.5 w-3.5" />
                            Voir l’énoncé PDF
                          </a>
                        )}
                      </div>
                    </div>

                    {soum?.statut === 'note' && (
                      <div className="mt-3 bg-muted/40 rounded-md p-3">
                        <div className="flex items-center gap-3">
                          <p className={cn('text-2xl font-bold', soum.note! >= 5 ? 'text-green-600' : 'text-red-500')}>{soum.note}<span className="text-sm font-normal text-muted-foreground">/10</span></p>
                          {soum.commentaire && <p className="text-xs text-foreground flex-1 italic">{soum.commentaire}</p>}
                        </div>
                      </div>
                    )}

                    {/* Actions selon le type de devoir */}
                    {(() => {
                      const devType = (dev as any).type || 'pratique'
                      const sessionDevoir = sessions.find((s: any) => s.devoirId === dev.id && s.userId === user!.id)

                      if (soum?.statut === 'soumis') return (
                        <p className="mt-2 text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                          <Lock className="h-3 w-3" />Soumis : en attente de correction
                        </p>
                      )

                      if (!peutSoumettre && expire) return null

                      // Type théorique
                      if (devType === 'theorique') return (
                        <ReponseTheoriqueForm devoir={dev} etudiantId={user!.id} soumission={soum} />
                      )

                      // Type QCM
                      if (devType === 'qcm') {
                        return <QCMForm devoir={dev} etudiantId={user!.id} soumission={soum} />
                      }

                      // Type pratique ou mixte
                      if (devType === 'pratique' || devType === 'mixte') {
                        return (
                          <div className="mt-3 space-y-2">
                            {devType === 'mixte' && (
                              <ReponseTheoriqueForm devoir={dev} etudiantId={user!.id} soumission={soum} />
                            )}
                            {!sessionDevoir ? (
                              <CommencerDevoirButton
                                devoir={dev}
                                etudiantId={user!.id}
                                sessionExistante={null}
                                navigate={navigate}
                                module={module}
                                faculteId={(user as any)?.faculteId}
                                universiteId={(user as any)?.universiteId}
                              />
                            ) : (
                              <div className="space-y-2">
                                <p className="text-xs text-muted-foreground">
                                  Session en cours : <span className="font-medium">{sessionDevoir.nom}</span>
                                </p>
                                <div className="space-y-2">
                                  <CommencerDevoirButton
                                    devoir={dev}
                                    etudiantId={user!.id}
                                    sessionExistante={sessionDevoir}
                                    navigate={navigate}
                                    module={module}
                                    faculteId={(user as any)?.faculteId}
                                    universiteId={(user as any)?.universiteId}
                                  />
                                  <SoumettreButton
                                    devoirId={dev.id}
                                    etudiantId={user!.id}
                                    sessionId={sessionDevoir.id}
                                    navigate={navigate}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      }
                      return null
                    })()}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })()}

      {/* ══ MES DEVOIRS QCM-CHAPITRE (auto-corrigés) ═══════════════════ */}
      {isStudent && (() => {
        const userPromotion = (user as any)?.classe || ''
        const devoirsQCMChapitre = allDevoirs.filter(d => (d as any).type === 'qcm_chapitre')
        if (devoirsQCMChapitre.length === 0) return null
        return (
          <div className="animate-slideUp" style={{ animationDelay: '1260ms' }}>
            <DevoirChapitreEtudiant
              devoirs={devoirsQCMChapitre}
              soumissions={mesSoumissions}
              etudiantId={user!.id}
              promotionId={userPromotion || undefined}
            />
          </div>
        )
      })()}

      {/* ══ MES COTES (section étudiant uniquement) ══════════════════════════ */}
      {isStudent && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden animate-fadeIn" style={{ animationDelay: '1100ms' }}>
          {/* Header cotes */}
          <div className="px-5 py-4 bg-gradient-to-r from-primary/8 via-primary/4 to-transparent border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-foreground">Mes cotes</h2>
                <p className="text-xs text-muted-foreground">Performance académique</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {mentionEtudiant && (
                <span className={cn(
                  'text-xs px-2.5 py-1 rounded-full font-semibold border',
                  mentionEtudiant === 'Excellent' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700' :
                  mentionEtudiant === 'Bien' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700' :
                  mentionEtudiant === 'Satisfaisant' ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700' :
                  'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700'
                )}>{mentionEtudiant}</span>
              )}
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 text-xs h-7 px-2"
                onClick={() => {
                  import('jspdf').then(({ jsPDF }) => {
                    import('jspdf-autotable').then(() => {
                      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
                      const pageW = doc.internal.pageSize.getWidth()
                      // En-tête
                      doc.setFillColor(26, 50, 114)
                      doc.rect(0, 0, pageW, 40, 'F')
                      doc.setTextColor(255, 255, 255)
                      doc.setFontSize(18)
                      doc.setFont('helvetica', 'bold')
                      doc.text('CAMPUS OHADA', pageW / 2, 14, { align: 'center' })
                      doc.setFontSize(11)
                      doc.setFont('helvetica', 'normal')
                      doc.text('SYSCOHADA Révisé — Bulletin de Notes', pageW / 2, 22, { align: 'center' })
                      doc.setFontSize(9)
                      doc.text(`Édité le ${new Date().toLocaleDateString('fr-FR')}`, pageW / 2, 30, { align: 'center' })
                      // Infos étudiant
                      doc.setTextColor(30, 30, 30)
                      doc.setFontSize(11)
                      doc.setFont('helvetica', 'bold')
                      doc.text('Informations étudiant', 14, 52)
                      doc.setDrawColor(26, 50, 114)
                      doc.setLineWidth(0.5)
                      doc.line(14, 54, pageW - 14, 54)
                      const nomComplet = [user?.nom, (user as any)?.prenom].filter(Boolean).map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
                      const promotion = (user as any)?.classe || '—'
                      const faculteNom = allFacultes.find((f: any) => f.id === (user as any)?.faculteId)?.nom || '—'
                      const uniNom = allUniversites.find((u: any) => u.id === (user as any)?.universiteId)?.nom || '—'
                      doc.setFont('helvetica', 'normal')
                      doc.setFontSize(10)
                      const infos: [string, string][] = [['Nom complet', nomComplet], ['Promotion', promotion], ['Faculté', faculteNom], ['Université', uniNom]]
                      let y = 62
                      infos.forEach(([k, v]) => {
                        doc.setFont('helvetica', 'bold')
                        doc.text(`${k} :`, 14, y)
                        doc.setFont('helvetica', 'normal')
                        doc.text(v, 55, y)
                        y += 7
                      })
                      // Devoirs
                      y += 4
                      doc.setFont('helvetica', 'bold')
                      doc.setFontSize(11)
                      doc.text('Devoirs notés', 14, y)
                      doc.line(14, y + 2, pageW - 14, y + 2)
                      y += 6
                      const soumissionsNoteesPdf = mesSoumissions.filter(s => s.statut === 'note' && typeof s.note === 'number')
                      const rowsDevoirs = soumissionsNoteesPdf.map(s => {
                        const dev = allDevoirs.find(d => d.id === s.devoirId)
                        return [dev?.titre || '—', `${s.note}/10`, s.commentaire || '—', s.dateCorrection ? new Date(s.dateCorrection).toLocaleDateString('fr-FR') : '—']
                      })
                      if (rowsDevoirs.length > 0) {
                        ;(doc as any).autoTable({ startY: y, head: [['Devoir', 'Note', 'Commentaire', 'Date']], body: rowsDevoirs, theme: 'striped', headStyles: { fillColor: [26, 50, 114], textColor: 255, fontStyle: 'bold', fontSize: 9 }, bodyStyles: { fontSize: 9 }, columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 18, halign: 'center' }, 2: { cellWidth: 70 }, 3: { cellWidth: 30, halign: 'center' } }, margin: { left: 14, right: 14 } })
                        y = (doc as any).lastAutoTable.finalY + 8
                      } else {
                        doc.setFont('helvetica', 'italic'); doc.setFontSize(9); doc.setTextColor(150)
                        doc.text('Aucun devoir noté.', 14, y); doc.setTextColor(30, 30, 30); y += 10
                      }
                      // Présences
                      doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(30, 30, 30)
                      doc.text('Présences', 14, y); doc.line(14, y + 2, pageW - 14, y + 2); y += 6
                      if (mesPresences.length > 0) {
                        const rowsPres = [...mesPresences].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(p => {
                          const entry = p.etudiants?.find((e: any) => e.etudiantId === user?.id)
                          return [new Date(p.date).toLocaleDateString('fr-FR'), p.titre || '—', entry?.present ? 'Présent(e)' : entry ? 'Absent(e)' : '—']
                        })
                        ;(doc as any).autoTable({ startY: y, head: [['Date', 'Séance', 'Statut']], body: rowsPres, theme: 'striped', headStyles: { fillColor: [26, 50, 114], textColor: 255, fontStyle: 'bold', fontSize: 9 }, bodyStyles: { fontSize: 9 }, columnStyles: { 0: { cellWidth: 28, halign: 'center' }, 1: { cellWidth: 110 }, 2: { cellWidth: 30, halign: 'center' } }, margin: { left: 14, right: 14 } })
                        y = (doc as any).lastAutoTable.finalY + 8
                      } else {
                        doc.setFont('helvetica', 'italic'); doc.setFontSize(9); doc.setTextColor(150)
                        doc.text('Aucune séance enregistrée.', 14, y); doc.setTextColor(30, 30, 30); y += 10
                      }
                      // Récapitulatif
                      doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(30, 30, 30)
                      doc.text('Récapitulatif', 14, y); doc.line(14, y + 2, pageW - 14, y + 2); y += 6
                      ;(doc as any).autoTable({ startY: y, head: [['Composante', 'Cote', 'Sur']], body: [['Présences', cotePresenceEtudiant !== null ? String(cotePresenceEtudiant) : '—', '5'], ['Devoirs', coteDevoirsEtudiant !== null ? String(coteDevoirsEtudiant) : '—', '5'], ['TOTAL', totalCoteEtudiant !== null ? String(totalCoteEtudiant) : '—', '10']], theme: 'striped', headStyles: { fillColor: [26, 50, 114], textColor: 255, fontStyle: 'bold', fontSize: 9 }, bodyStyles: { fontSize: 10 }, columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 30, halign: 'center' }, 2: { cellWidth: 20, halign: 'center' } }, margin: { left: 14, right: 14 } })
                      if (mentionEtudiant) {
                        const fy = (doc as any).lastAutoTable.finalY + 6
                        doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(26, 50, 114)
                        doc.text(`Mention : ${mentionEtudiant}`, 14, fy)
                      }
                      // Pied de page
                      const pgH = doc.internal.pageSize.getHeight()
                      doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(150)
                      doc.text('CAMPUS OHADA © ' + new Date().getFullYear() + ' — Propriété de Manassé TANDU', pageW / 2, pgH - 8, { align: 'center' })
                      doc.save(`bulletin_${(user?.nom || 'etudiant').toLowerCase().replace(/\s+/g, '_')}_${new Date().getFullYear()}.pdf`)
                    })
                  })
                }}
              >
                <Download className="h-3 w-3" />
                Bulletin PDF
              </Button>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* Barres de progression cotes */}
            <div className="space-y-3">
              {/* Cote Présences */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">Présences</span>
                  <div className="flex items-center gap-2">
                    {totalSeances > 0 && <span className="text-xs text-muted-foreground">{nbPresent}/{totalSeances} séances</span>}
                    <span className={cn('text-sm font-bold tabular-nums',
                      cotePresenceEtudiant === null ? 'text-muted-foreground' :
                      cotePresenceEtudiant >= 4 ? 'text-green-600' :
                      cotePresenceEtudiant >= 2.5 ? 'text-yellow-600' : 'text-red-600'
                    )}>{cotePresenceEtudiant !== null ? `${cotePresenceEtudiant}/5` : '—'}</span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-1000',
                      cotePresenceEtudiant === null ? 'w-0' :
                      cotePresenceEtudiant >= 4 ? 'bg-green-500' :
                      cotePresenceEtudiant >= 2.5 ? 'bg-yellow-500' : 'bg-red-500'
                    )}
                    style={{ width: cotePresenceEtudiant !== null ? `${(cotePresenceEtudiant / 5) * 100}%` : '0%' }}
                  />
                </div>
              </div>

              {/* Cote Devoirs */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">Devoirs</span>
                  <div className="flex items-center gap-2">
                    {totalDevoirsNotesEtudiant > 0 && <span className="text-xs text-muted-foreground">{cumulNotesEtudiant}/{totalDevoirsNotesEtudiant * 10} pts</span>}
                    <span className={cn('text-sm font-bold tabular-nums',
                      coteDevoirsEtudiant === null ? 'text-muted-foreground' :
                      coteDevoirsEtudiant >= 4 ? 'text-green-600' :
                      coteDevoirsEtudiant >= 2.5 ? 'text-yellow-600' : 'text-red-600'
                    )}>{coteDevoirsEtudiant !== null ? `${coteDevoirsEtudiant}/5` : '—'}</span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-1000',
                      coteDevoirsEtudiant === null ? 'w-0' :
                      coteDevoirsEtudiant >= 4 ? 'bg-green-500' :
                      coteDevoirsEtudiant >= 2.5 ? 'bg-yellow-500' : 'bg-red-500'
                    )}
                    style={{ width: coteDevoirsEtudiant !== null ? `${(coteDevoirsEtudiant / 5) * 100}%` : '0%' }}
                  />
                </div>
              </div>

              {/* Total /10 */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Score total</p>
                  <p className={cn('text-2xl font-bold tabular-nums mt-0.5',
                    totalCoteEtudiant === null ? 'text-muted-foreground' :
                    totalCoteEtudiant >= 8 ? 'text-green-600' :
                    totalCoteEtudiant >= 5 ? 'text-yellow-600' : 'text-red-600'
                  )}>
                    {totalCoteEtudiant !== null ? totalCoteEtudiant : '—'}<span className="text-sm font-normal text-muted-foreground">/10</span>
                  </p>
                </div>
                <div className="h-14 w-14 rounded-full border-4 border-border flex items-center justify-center bg-background relative">
                  <svg className="absolute inset-0" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted/30" />
                    <circle cx="28" cy="28" r="24" fill="none" strokeWidth="4"
                      strokeDasharray={`${2 * Math.PI * 24}`}
                      strokeDashoffset={`${2 * Math.PI * 24 * (1 - (totalCoteEtudiant ?? 0) / 10)}`}
                      strokeLinecap="round"
                      className={totalCoteEtudiant !== null && totalCoteEtudiant >= 8 ? 'stroke-green-500' : totalCoteEtudiant !== null && totalCoteEtudiant >= 5 ? 'stroke-yellow-500' : 'stroke-red-500'}
                      style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1.2s ease' }}
                    />
                  </svg>
                  <span className={cn('text-xs font-bold relative z-10',
                    totalCoteEtudiant === null ? 'text-muted-foreground' :
                    totalCoteEtudiant >= 8 ? 'text-green-600' :
                    totalCoteEtudiant >= 5 ? 'text-yellow-600' : 'text-red-600'
                  )}>{totalCoteEtudiant !== null ? `${Math.round((totalCoteEtudiant / 10) * 100)}%` : '—'}</span>
                </div>
              </div>
            </div>

          {/* Historique des devoirs notés */}
          {soumissionsNotees.length > 0 && (() => {
            const devoirsNotes = soumissionsNotees.map(s => {
              const dev = allDevoirs.find(d => d.id === s.devoirId)
              return { soum: s, dev }
            }).filter(x => x.dev)
            return (
              <div className="space-y-2 px-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Historique des devoirs</p>
                  <span className="text-xs text-muted-foreground">{cumulNotesEtudiant}/{totalDevoirsNotesEtudiant * 10} pts cumulés</span>
                </div>
                <div className="rounded-lg border border-border overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-muted/40">
                      <tr>
                        <th className="text-left px-3 py-2 font-medium text-muted-foreground">Devoir</th>
                        <th className="text-center px-3 py-2 font-medium text-muted-foreground">Note</th>
                        <th className="text-left px-3 py-2 font-medium text-muted-foreground">Commentaire</th>
                      </tr>
                    </thead>
                    <tbody>
                      {devoirsNotes.map(({ soum: s, dev: d }) => (
                        <tr key={s.id} className="border-t border-border/50">
                          <td className="px-3 py-2 font-medium">{d!.titre}</td>
                          <td className="px-3 py-2 text-center">
                            <span className={cn('font-bold', s.note! >= 5 ? 'text-green-600' : 'text-red-500')}>
                              {s.note}<span className="font-normal text-muted-foreground">/10</span>
                            </span>
                          </td>
                          <td className="px-3 py-2 text-muted-foreground italic">{s.commentaire || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-muted/30 border-t border-border font-semibold">
                      <tr>
                        <td className="px-3 py-2 text-muted-foreground">Total cumulé</td>
                        <td className="px-3 py-2 text-center text-primary">{cumulNotesEtudiant}/{totalDevoirsNotesEtudiant * 10}</td>
                        <td className="px-3 py-2 text-primary">Cote devoirs : {coteDevoirsEtudiant}/5</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )
          })()}

          {mesPresences.length > 0 && (() => {
            const seancesTri = [...mesPresences].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            const nbP = seancesTri.filter(p => p.etudiants?.find((e: any) => e.etudiantId === user?.id)?.present).length
            const totalS = seancesTri.length
            const taux = totalS > 0 ? Math.round(nbP / totalS * 100) : 0
            return (
              <div className="space-y-2 px-5 pb-5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Détail des séances</p>
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-xs">
                    <thead className="bg-muted/40">
                      <tr>
                        {seancesTri.map(s => (
                          <th key={s.id} className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap">
                            {new Date(s.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                          </th>
                        ))}
                        <th className="text-center px-3 py-2 font-medium text-muted-foreground whitespace-nowrap">Présences</th>
                        <th className="text-center px-3 py-2 font-medium text-muted-foreground whitespace-nowrap">Taux</th>
                        <th className="text-center px-3 py-2 font-medium text-muted-foreground whitespace-nowrap">Cote /5</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {seancesTri.map(s => {
                          const entree = s.etudiants?.find((e: any) => e.etudiantId === user?.id)
                          const present = entree?.present ?? false
                          const inSeance = !!entree
                          return (
                            <td key={s.id} className="px-2 py-2 text-center">
                              {inSeance ? (
                                <span className={cn(
                                  'inline-flex items-center justify-center w-6 h-6 rounded-full font-bold',
                                  present ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                )}>
                                  {present ? '•' : '×'}
                                </span>
                              ) : <span className="opacity-30">—</span>}
                            </td>
                          )
                        })}
                        <td className="px-3 py-2 text-center font-semibold">{nbP}/{totalS}</td>
                        <td className="px-3 py-2 text-center">
                          <span className={cn('font-semibold',
                            taux >= 75 ? 'text-green-600' : taux >= 50 ? 'text-yellow-600' : 'text-red-600'
                          )}>{taux}%</span>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className={cn('font-bold',
                            cotePresenceEtudiant !== null && cotePresenceEtudiant >= 4 ? 'text-green-600' :
                            cotePresenceEtudiant !== null && cotePresenceEtudiant >= 2.5 ? 'text-yellow-600' : 'text-red-600'
                          )}>{cotePresenceEtudiant ?? '—'}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground">
                  Formule : 5 × ({nbP} présences ÷ {totalS} séances) = cote {cotePresenceEtudiant ?? '—'}/5
                </p>
              </div>
            )
          })()}
        </div>
        </div>
      )}

      {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
      <div
        className="flex items-center justify-center gap-2 pt-2 animate-fadeIn"
        style={{ animationDelay: '1400ms' }}
      >
        <div className="h-px flex-1 bg-border" />
        <div className="flex flex-col items-center px-3">
          <p className="text-xs text-muted-foreground">
            CAMPUS OHADA © {new Date().getFullYear()} : SYSCOHADA Révisé
          </p>
          <p className="text-xs text-muted-foreground/60 mt-0.5">
            Propriété de Manassé TANDU
          </p>
        </div>
        <div className="h-px flex-1 bg-border" />
      </div>
    </div>
  )
}
