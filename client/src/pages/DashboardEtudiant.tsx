import React from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import {
  BookMarked, ClipboardList, GraduationCap, BookOpen,
  ChevronRight, Award, LibraryBig, Lock, CheckCircle2, Clock, FileDown, User, Download,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { isDevoirExpire, QuestionQCM } from '@/lib/db'
import DevoirChapitreEtudiant from '@/components/DevoirChapitreEtudiant'
import {
  useSessions, useAllCours, useAllDevoirs, useSoumissionsEtudiant,
  useUniversites, useFacultes, useExercices, usePresencesEtudiant,
  useCoursStatuts,
} from '@/lib/useFirestore'
import { createSoumissionAsync, createSessionAsync } from '@/lib/db-firebase'
import { useUser } from '@/lib/userContext'
import { useModule } from '@/lib/moduleContext'
import { cn } from '@/lib/utils'
import { prefetchRoute } from '@/lib/prefetch'
import { DashboardHero, greeting, type DashboardStat } from '@/components/DashboardHero'
import { DashboardModulesGrid } from '@/components/DashboardModulesGrid'
import { DashboardFooter } from '@/components/DashboardFooter'

// ─── Composants devoir (usage étudiant uniquement) ─────────────────────────────

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

// QCMForm : interface étudiant pour répondre à un QCM + correction automatique
function QCMForm({ devoir, etudiantId, soumission }: { devoir: any; etudiantId: string; soumission: any }) {
  const questions: QuestionQCM[] = devoir.questions || []
  const [reponses, setReponses] = React.useState<Record<number, number>>({})
  const [soumis, setSoumis] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [resultat, setResultat] = React.useState<{ score: number; total: number; details: boolean[] } | null>(null)

  if (soumission?.statut === 'note') {
    return (
      <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 space-y-1">
        <p className="text-sm font-semibold text-green-700">✓ QCM corrigé automatiquement</p>
        <p className="text-sm text-green-700">Note : <strong>{soumission.note}/10</strong></p>
        {soumission.commentaire && <p className="text-xs text-muted-foreground">{soumission.commentaire}</p>}
      </div>
    )
  }

  if (soumission?.statut === 'soumis') {
    return (
      <p className="mt-2 text-xs text-blue-600 flex items-center gap-1">
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
        statut: 'note',
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

  if (soumis && resultat) {
    const note = Math.round((resultat.score / resultat.total) * 10 * 10) / 10
    const mention = note >= 8 ? 'Excellent' : note >= 6 ? 'Bien' : note >= 5 ? 'Satisfaisant' : 'Insuffisant'
    const mentionColor = note >= 8 ? 'text-green-600' : note >= 6 ? 'text-blue-600' : note >= 5 ? 'text-amber-600' : 'text-destructive'
    return (
      <div className="mt-3 space-y-3">
        <div className="bg-muted rounded-lg p-4 text-center space-y-1">
          <p className="text-2xl font-mono font-bold text-foreground">{note}<span className="text-sm font-normal text-muted-foreground">/10</span></p>
          <p className={`text-sm font-semibold ${mentionColor}`}>{mention}</p>
          <p className="text-xs text-muted-foreground">{resultat.score}/{resultat.total} bonne{resultat.score > 1 ? 's' : ''} réponse{resultat.score > 1 ? 's' : ''}</p>
        </div>
        {questions.map((q, i) => (
          <div key={i} className={`rounded-lg border p-3 space-y-1.5 ${ resultat.details[i] ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50' }`}>
            <p className="text-xs font-medium text-foreground">{i + 1}. {q.texte}</p>
            <p className="text-xs">
              {resultat.details[i]
                ? <span className="text-green-600">✓ Bonne réponse : {q.choix[q.bonneReponse]}</span>
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

// Bouton "Commencer le devoir" : crée une session dédiée et redirige vers le journal
function CommencerDevoirButton({ devoir, etudiantId, sessionExistante, navigate, module, faculteId, universiteId }: {
  devoir: any; etudiantId: string; sessionExistante: any | null; navigate: (p: string) => void; module: string; faculteId?: string; universiteId?: string
}) {
  const [loading, setLoading] = React.useState(false)
  const handleCommencer = async () => {
    setLoading(true)
    try {
      let session = sessionExistante
      if (!session) {
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

  if (soumission) return null

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

  return (
    <div className="mt-3 rounded-md border border-border bg-muted/40 p-3 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-foreground">Vos réponses</p>
        <button onClick={() => setEtape('redaction')} className="text-xs text-muted-foreground hover:text-foreground">× Modifier</button>
      </div>
      <div className="rounded-md bg-background border border-border px-3 py-2 text-sm text-foreground whitespace-pre-wrap max-h-40 overflow-y-auto">
        {reponse}
      </div>
      <div className="rounded-md bg-amber-50 border border-amber-200 px-3 py-2">
        <p className="text-xs text-amber-800">
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

// ─────────────────────────────────────────────────────────────────────────────
// TABLEAU DE BORD — ÉTUDIANT
//
// Toute la richesse pédagogique (cours inscrits, devoirs, cotes) est propre à
// l'étudiant : le staff n'a pas d'équivalent ici, son suivi se fait dans
// l'Espace pédagogique (/professeurs). Ce composant ne partage donc plus son
// arbre de rendu avec le staff — seuls le bandeau hero, la grille de modules
// et le pied de page sont des composants communs importés.
// ─────────────────────────────────────────────────────────────────────────────
export default function DashboardEtudiant() {
  const [, navigate] = useHashLocation()
  const user = useUser()
  const module = useModule()

  const { sessions } = useSessions(user?.id)
  const { cours: allCoursRaw } = useAllCours()
  const { devoirs: allDevoirs } = useAllDevoirs()
  const { universites: allUniversites } = useUniversites()
  const { facultes: allFacultes } = useFacultes()
  const { soumissions: mesSoumissions } = useSoumissionsEtudiant(user?.id)
  const { exercices: allExercices } = useExercices()
  const { presences: mesPresences } = usePresencesEtudiant(user?.id)
  const { statuts: coursStatuts } = useCoursStatuts(user?.id)

  // Cotes étudiant
  const totalSeances = mesPresences.length
  const nbPresent = mesPresences.filter(p => p.etudiants?.find((e: any) => e.etudiantId === user?.id)?.present).length
  const cotePresenceEtudiant = totalSeances > 0 ? parseFloat((5 * nbPresent / totalSeances).toFixed(2)) : null

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

  const allCours = allCoursRaw.filter(c => c.actif)
  const userCoursIds: string[] = (user as any)?.coursIds || []
  const userCours = allCours.filter(c => userCoursIds.includes(c.id))

  const stats: DashboardStat[] = [
    { label: 'Devoirs',   value: allDevoirs.filter(d => {
      if (!userCoursIds.includes(d.coursId) || !d.actif) return false
      if (d.faculteId && (user as any)?.faculteId && d.faculteId !== (user as any)?.faculteId) return false
      const cours = allCours.find(c => c.id === d.coursId)
      if (cours?.promotion && (user as any)?.classe && cours.promotion !== (user as any)?.classe) return false
      return true
    }).length, icon: ClipboardList },
    { label: 'Exercices', value: allExercices.filter(e => e.actif).length, icon: GraduationCap },
    { label: 'Cours',     value: userCours.length,                          icon: BookOpen },
    // Anciennement « Messages », dont la valeur était écrite en dur à 0 : jamais
    // calculée, donc toujours fausse. Un vrai compteur de non-lus n'est pas
    // possible en l'état — les messages portent bien un champ `lu`, mis à false
    // à l'envoi, mais aucun code ne le repasse jamais à true : le compteur ne
    // ferait que croître sans jamais redescendre. Remplacé par la cote, qui est
    // une donnée réelle et déjà calculée plus haut.
    { label: 'Ma cote',   value: totalCoteEtudiant !== null ? `${totalCoteEtudiant}/10` : '—', icon: Award },
  ]

  const identity = (
    <div className="mt-1 space-y-0.5">
      <p className="text-sm text-white font-semibold flex items-center gap-1.5">
        <User className="h-3.5 w-3.5 text-secondary shrink-0" />
        <span>{[user?.nom, user?.prenom].filter(Boolean).map(s => (s as string).charAt(0).toUpperCase() + (s as string).slice(1)).join(' ')}</span>
      </p>
      {(user as any)?.classe && (
        <p className="text-sm text-white/75 flex items-center gap-1.5">
          <Award className="h-3.5 w-3.5 text-secondary shrink-0" />
          <span>{(user as any).classe}</span>
        </p>
      )}
      {(() => {
        const nom = allFacultes.find(f => f.id === (user as any)?.faculteId)?.nom
        return nom ? (
          <p className="text-sm text-white/75 flex items-center gap-1.5">
            <BookMarked className="h-3.5 w-3.5 text-secondary shrink-0" />
            <span>{nom}</span>
          </p>
        ) : null
      })()}
      {(() => {
        const nom = allUniversites.find(u => u.id === (user as any)?.universiteId)?.nom
        return nom ? (
          <p className="text-sm text-white/75 flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5 text-secondary shrink-0" />
            <span>{nom}</span>
          </p>
        ) : null
      })()}
    </div>
  )

  return (
    <div className="space-y-6 pb-8">
      <DashboardHero
        greeting={`${greeting()}${user?.nom ? ` ${user.nom.toUpperCase()}` : ''} !`}
        identity={identity}
        stats={stats}
      />

      {/* ══ MES COURS — registre par cours, pas de progression globale ═════════
           La progression n'a de sens que par cours : deux promotions n'ont pas
           forcément les mêmes cours, donc pas de moyenne unique entre étudiants. ══ */}
      {userCours.length > 0 && (
        <div className="animate-slideRight" style={{ animationDelay: '550ms' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-display font-semibold text-foreground">Mes cours ce semestre</h2>
            <span className="text-xs text-muted-foreground">{userCours.length} cours inscrit{userCours.length > 1 ? 's' : ''}</span>
          </div>
          <div className="rounded-lg border border-border bg-card overflow-hidden table-scroll">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left font-medium text-xs uppercase tracking-wide text-muted-foreground py-2.5 px-4">Cours</th>
                  <th className="text-left font-medium text-xs uppercase tracking-wide text-muted-foreground py-2.5 px-4">Statut</th>
                  <th className="text-left font-medium text-xs uppercase tracking-wide text-muted-foreground py-2.5 px-4">Prochaine échéance</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {userCours.map((cours, i) => {
                  const statutInfo = coursStatuts.find(s => s.coursId === cours.id)?.statut || 'non_commence'
                  const statutMap: Record<string, { label: string; className: string }> = {
                    complete:      { label: 'Terminé',   className: 'border-green-400/50 text-green-700 bg-green-50' },
                    en_cours:      { label: 'En cours',  className: 'border-secondary/50 text-secondary bg-secondary/10' },
                    non_commence:  { label: 'À commencer', className: 'border-border text-muted-foreground' },
                  }
                  const s = statutMap[statutInfo] || statutMap.non_commence

                  const prochainDevoir = allDevoirs
                    .filter(d => d.coursId === cours.id && d.actif && !isDevoirExpire(d))
                    .sort((a, b) => new Date(a.dateLimit).getTime() - new Date(b.dateLimit).getTime())[0]

                  const moduleKey = (cours as any).moduleKey || cours.id
                  const path = `/${moduleKey}`

                  return (
                    <tr
                      key={cours.id}
                      onClick={() => navigate(path)}
                      onMouseEnter={() => prefetchRoute(path)}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer animate-fadeIn"
                      style={{ animationDelay: `${600 + i * 40}ms` }}
                    >
                      <td className="py-3 px-4">
                        <p className="font-display font-semibold text-foreground leading-tight">{cours.nom}</p>
                        {(cours as any).promotion && (
                          <p className="text-xs text-muted-foreground mt-0.5">{(cours as any).promotion}</p>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={cn("text-xs font-normal", s.className)}>{s.label}</Badge>
                      </td>
                      <td className="py-3 px-4 text-xs">
                        {prochainDevoir ? (
                          <span className="text-foreground/80">
                            {prochainDevoir.titre} — <span className="font-mono">{new Date(prochainDevoir.dateLimit).toLocaleDateString('fr-FR')}</span>
                          </span>
                        ) : (
                          <span className="text-muted-foreground/60">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <ChevronRight className="h-4 w-4 text-muted-foreground/40 inline-block" />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* La tuile « Mes cours » est masquée quand le tableau ci-dessus est là :
          elle mènerait au même endroit tout en annonçant un autre nombre. */}
      <DashboardModulesGrid navigate={navigate} afficherMesCours={userCours.length === 0} />

      {/* ══ MES DEVOIRS ══════════════════════════════════════════════════════ */}
      {userCoursIds.length > 0 && (() => {
        const userFaculteId = (user as any)?.faculteId || ''
        const userPromotion = (user as any)?.classe || ''
        const mesDevoirs = allDevoirs.filter(d => {
          if (!userCoursIds.includes(d.coursId)) return false
          if (!d.actif) return false
          if (d.faculteId && userFaculteId && d.faculteId !== userFaculteId) return false
          const cours = allCours.find(c => c.id === d.coursId)
          if (cours?.promotion && userPromotion && cours.promotion !== userPromotion) return false
          return true
        })
        if (mesDevoirs.length === 0) return null
        return (
          <div className="animate-slideUp" style={{ animationDelay: '1250ms' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-display font-semibold text-foreground">Mes devoirs</h2>
              <span className="text-xs text-muted-foreground">{mesDevoirs.length} devoir{mesDevoirs.length > 1 ? 's' : ''}</span>
            </div>
            <div className="space-y-2">
              {mesDevoirs.map((dev, i) => {
                const soum = mesSoumissions.find(s => s.devoirId === dev.id)
                const expire = isDevoirExpire(dev)
                const peutSoumettre = !expire && !soum
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
                            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:underline"
                          >
                            <FileDown className="h-3.5 w-3.5" />
                            Voir l'énoncé PDF
                          </a>
                        )}
                      </div>
                    </div>

                    {soum?.statut === 'note' && (
                      <div className="mt-3 bg-muted/40 rounded-md p-3">
                        <div className="flex items-center gap-3">
                          <p className={cn('text-2xl font-mono font-bold', soum.note! >= 5 ? 'text-green-600' : 'text-red-500')}>{soum.note}<span className="text-sm font-normal text-muted-foreground">/10</span></p>
                          {soum.commentaire && <p className="text-xs text-foreground flex-1 italic">{soum.commentaire}</p>}
                        </div>
                      </div>
                    )}

                    {(() => {
                      const devType = (dev as any).type || 'pratique'
                      const sessionDevoir = sessions.find((s: any) => s.devoirId === dev.id && s.userId === user!.id)

                      if (soum?.statut === 'soumis') return (
                        <p className="mt-2 text-xs text-blue-600 flex items-center gap-1">
                          <Lock className="h-3 w-3" />Soumis : en attente de correction
                        </p>
                      )

                      if (!peutSoumettre && expire) return null

                      if (devType === 'theorique') return (
                        <ReponseTheoriqueForm devoir={dev} etudiantId={user!.id} soumission={soum} />
                      )

                      if (devType === 'qcm') {
                        return <QCMForm devoir={dev} etudiantId={user!.id} soumission={soum} />
                      }

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
      {(() => {
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

      {/* ══ MES COTES ══════════════════════════════════════════════════════ */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden animate-fadeIn" style={{ animationDelay: '1100ms' }}>
        <div className="px-5 py-4 bg-gradient-to-r from-primary/8 via-primary/4 to-transparent border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Award className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-display font-semibold text-foreground">Mes cotes</h2>
              <p className="text-xs text-muted-foreground">Performance académique</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {mentionEtudiant && (
              <span className={cn(
                'text-xs px-2.5 py-1 rounded-full font-semibold border',
                mentionEtudiant === 'Excellent' ? 'bg-green-100 text-green-700 border-green-200' :
                mentionEtudiant === 'Bien' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                mentionEtudiant === 'Satisfaisant' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                'bg-red-100 text-red-700 border-red-200'
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
                    doc.setFillColor(26, 50, 114)
                    doc.rect(0, 0, pageW, 40, 'F')
                    doc.setTextColor(255, 255, 255)
                    doc.setFontSize(18)
                    doc.setFont('helvetica', 'bold')
                    doc.text('ORBIT', pageW / 2, 14, { align: 'center' })
                    doc.setFontSize(11)
                    doc.setFont('helvetica', 'normal')
                    doc.text('SYSCOHADA Révisé — Bulletin de Notes', pageW / 2, 22, { align: 'center' })
                    doc.setFontSize(9)
                    doc.text(`Édité le ${new Date().toLocaleDateString('fr-FR')}`, pageW / 2, 30, { align: 'center' })
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
                    doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(30, 30, 30)
                    doc.text('Récapitulatif', 14, y); doc.line(14, y + 2, pageW - 14, y + 2); y += 6
                    ;(doc as any).autoTable({ startY: y, head: [['Composante', 'Cote', 'Sur']], body: [['Présences', cotePresenceEtudiant !== null ? String(cotePresenceEtudiant) : '—', '5'], ['Devoirs', coteDevoirsEtudiant !== null ? String(coteDevoirsEtudiant) : '—', '5'], ['TOTAL', totalCoteEtudiant !== null ? String(totalCoteEtudiant) : '—', '10']], theme: 'striped', headStyles: { fillColor: [26, 50, 114], textColor: 255, fontStyle: 'bold', fontSize: 9 }, bodyStyles: { fontSize: 10 }, columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 30, halign: 'center' }, 2: { cellWidth: 20, halign: 'center' } }, margin: { left: 14, right: 14 } })
                    if (mentionEtudiant) {
                      const fy = (doc as any).lastAutoTable.finalY + 6
                      doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(26, 50, 114)
                      doc.text(`Mention : ${mentionEtudiant}`, 14, fy)
                    }
                    const pgH = doc.internal.pageSize.getHeight()
                    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(150)
                    doc.text('ORBIT © ' + new Date().getFullYear() + ' — Propriété de Manassé TANDU', pageW / 2, pgH - 8, { align: 'center' })
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
          <div className="space-y-3">
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

            <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Score total</p>
                <p className={cn('text-2xl font-mono font-bold tabular-nums mt-0.5',
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

      <DashboardFooter />
    </div>
  )
}
