/**
 * DevoirChapitreEtudiant.tsx
 * Affiché dans le Dashboard étudiant - onglet "Mes devoirs"
 * Gère trois types de devoirs depuis les chapitres UE :
 *   - qcm_chapitre : N QCM (sélection libre) × 1pt → note ramenée /20
 *   - qcm_cas      : N QCM (10 pts) + cas pratiques corrigés par l'enseignant (10 pts) = /20
 *   - redaction    : questions à réponse rédigée, corrigées par l'enseignant = /20
 *
 * Barème : toujours /20. Note stockée = note finale sur 20 (voir
 * baremeDevoir, lib/cotes.ts, qui lit chaque note avec son barème).
 */
import { useState } from 'react'
import {
  CheckCircle2, XCircle, Clock, BookOpen,
  ChevronDown, ChevronUp, Award, FileText, Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Devoir, Soumission, QCMChapitre, CasPratique } from '@/lib/db'
import { createSoumissionAsync } from '@/lib/db-firebase'
import { estACorriger, estDevoirChapitre, formaterNombre, noteDeCopie } from '@/lib/cotes'
import { corrigerQCMChapitre, partieQCMSur10 } from '@/lib/correctionQCM'
import { promotionCorrespond } from '@/lib/promotion'

// ─── Calculs ──────────────────────────────────────────────────────────────────

/** Convertit un score brut en note /20 selon le nombre total de questions */
export function scoreEnNoteSur20(score: number, total: number = 10): number {
  if (total === 0) return 0
  return parseFloat(((score / total) * 20).toFixed(2))
}


// ─── Composant : Passer un devoir qcm_chapitre ────────────────────────────────

interface PasserQCMChapitreProps {
  devoir: Devoir
  etudiantId: string
  onSoumis: (soumission: Soumission) => void
}

function PasserQCMChapitre({ devoir, etudiantId, onSoumis }: PasserQCMChapitreProps) {
  const questions: QCMChapitre[] = devoir.questionsChapitre || []
  const [reponses, setReponses] = useState<Record<string, string>>({})
  const [soumis, setSoumis] = useState(false)
  const [resultat, setResultat] = useState<{
    score: number
    details: { qId: string; choix: string; correct: boolean }[]
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const totalRepondues = Object.keys(reponses).length
  const peutSoumettre = totalRepondues === questions.length

  const handleSoumettre = async () => {
    if (!peutSoumettre) return
    setLoading(true)
    try {
      const details = questions.map(q => ({
        qId: q.id,
        choix: reponses[q.id] || '',
        correct: reponses[q.id] === q.reponseCorrecte,
      }))
      const nbCorrectes = details.filter(d => d.correct).length
      const nbTotal = questions.length
      // Note finale sur 20 : (bonnes / total) * 20
      const noteSur20 = parseFloat(((nbCorrectes / nbTotal) * 20).toFixed(2))

      const soumission = await createSoumissionAsync({
        devoirId: devoir.id,
        etudiantId,
        reponsesQCMChapitre: reponses,
        scoreQCMChapitre: nbCorrectes,
        detailsQCMChapitre: details,
        note: noteSur20,
        statut: 'note' as const,
        dateCorrection: new Date().toISOString(),
      } as any)

      setResultat({ score: nbCorrectes, details })
      setSoumis(true)
      onSoumis(soumission)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (soumis && resultat) {
    const noteSur20 = scoreEnNoteSur20(resultat.score, questions.length)
    return (
      <div className="space-y-4">
        <ResultatQCMDisplay
          score={resultat.score}
          total={questions.length}
          noteSur20={noteSur20}
          questions={questions}
          details={resultat.details}
        />
      </div>
    )
  }

  return (
    <QCMForm
      questions={questions}
      reponses={reponses}
      onReponse={(qId, optId) => setReponses(r => ({ ...r, [qId]: optId }))}
      onSoumettre={handleSoumettre}
      loading={loading}
      label="Soumettre et voir ma note"
    />
  )
}

// ─── Composant : Passer un devoir qcm_cas ─────────────────────────────────────

interface PasserQCMCasProps {
  devoir: Devoir
  etudiantId: string
  onSoumis: (soumission: Soumission) => void
}

type EtapeQCMCas = 'qcm' | 'cas' | 'correction'

function PasserQCMCas({ devoir, etudiantId, onSoumis }: PasserQCMCasProps) {
  const questions: QCMChapitre[] = devoir.questionsChapitre || []
  const casPratiques: CasPratique[] = devoir.casPratiques || []

  const [etape, setEtape] = useState<EtapeQCMCas>('qcm')
  const [reponsesQCM, setReponsesQCM] = useState<Record<string, string>>({})
  const [reponsesCas, setReponsesCas] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')
  // Partie QCM obtenue, affichée après l'envoi.
  const [resultat, setResultat] = useState<{ scoreQCM: number } | null>(null)

  const totalQCMRepondues = Object.keys(reponsesQCM).length
  const peutPasserCas = totalQCMRepondues === questions.length
  const totalCasRemplies = casPratiques.filter(c => (reponsesCas[c.id] || '').trim()).length
  const peutSoumettreCas = totalCasRemplies === casPratiques.length

  const handleValiderQCM = () => {
    if (peutPasserCas) setEtape('cas')
  }

  // La partie QCM est corrigée tout de suite ; les cas pratiques partent en
  // correction chez l'enseignant, qui peut s'aider d'une proposition de
  // l'IA (fenêtre de correction). Aucun appel à l'IA depuis ce navigateur.
  const handleSoumettreCas = async () => {
    if (!peutSoumettreCas) return
    setLoading(true)
    setErreur('')
    try {
      const { details: detailsQCM, nbCorrectes } = corrigerQCMChapitre(questions, reponsesQCM)
      const scoreQCM = partieQCMSur10(nbCorrectes, questions.length)
      const soumission = await createSoumissionAsync({
        devoirId: devoir.id,
        etudiantId,
        reponsesQCMChapitre: reponsesQCM,
        scoreQCMChapitre: nbCorrectes,
        detailsQCMChapitre: detailsQCM,
        reponsesCasPratiques: reponsesCas,
        scoreQCMCas: scoreQCM,
      } as any)
      setResultat({ scoreQCM })
      setEtape('correction')
      onSoumis(soumission)
    } catch (e) {
      console.error(e)
      setErreur("Envoi impossible pour le moment. Vérifiez votre connexion, puis réessayez.")
    } finally {
      setLoading(false)
    }
  }

  // ── Étape QCM ──
  if (etape === 'qcm') {
    return (
      <div className="space-y-3">
        {/* Bandeau info */}
        <div className="rounded-lg bg-indigo-50 border border-indigo-200 p-3 text-xs text-indigo-800">
          <p className="font-semibold mb-1">Devoir QCM + Cas pratiques - /20</p>
          <p>Partie 1 : {questions.length} QCM × 2 pts = 10 pts</p>
          <p>Partie 2 : {casPratiques.length} cas pratique{casPratiques.length > 1 ? 's' : ''} = 10 pts (corrigé par votre professeur)</p>
        </div>
        <p className="text-xs font-semibold text-foreground px-1">Partie 1 - QCM ({questions.length} questions)</p>
        <QCMForm
          questions={questions}
          reponses={reponsesQCM}
          onReponse={(qId, optId) => setReponsesQCM(r => ({ ...r, [qId]: optId }))}
          onSoumettre={handleValiderQCM}
          loading={false}
          label="Valider le QCM → Passer aux cas pratiques"
          disabled={!peutPasserCas}
        />
      </div>
    )
  }

  // ── Étape Cas pratiques ──
  if (etape === 'cas') {
    return (
      <div className="space-y-3">
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
          <p className="font-semibold">Partie 2 - Cas pratiques</p>
          <p className="mt-0.5">QCM validé ({Object.values(reponsesQCM).length}/{questions.length}). Répondez maintenant aux cas pratiques.</p>
          <p className="mt-0.5 text-amber-600">Répondez avec vos mots : c'est la logique comptable qui est évaluée.</p>
        </div>

        {casPratiques.map((cas, i) => (
          <div key={cas.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
            <div className="flex items-start gap-2">
              <span className="h-6 w-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{cas.titre}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {cas.pointsMax} point{cas.pointsMax > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            {/* Énoncé */}
            <div className="rounded-lg bg-muted/40 p-3 text-xs text-foreground leading-relaxed whitespace-pre-wrap border border-border">
              {cas.enonce}
            </div>
            {/* Zone de réponse */}
            <div>
              <label className="text-xs text-muted-foreground block mb-1">
                Votre réponse :
              </label>
              <textarea
                rows={5}
                className="w-full rounded-lg border border-border bg-background text-xs text-foreground p-2.5 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-muted-foreground/50"
                placeholder="Rédigez votre réponse ici..."
                value={reponsesCas[cas.id] || ''}
                onChange={e => setReponsesCas(r => ({ ...r, [cas.id]: e.target.value }))}
              />
              <p className="text-xs text-muted-foreground mt-0.5 text-right">
                {(reponsesCas[cas.id] || '').length} caractère{(reponsesCas[cas.id] || '').length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        ))}

        <button
          onClick={handleSoumettreCas}
          disabled={!peutSoumettreCas || loading}
          className={cn(
            'w-full flex items-center justify-center gap-2 text-xs font-semibold rounded-xl py-3 transition-colors',
            peutSoumettreCas && !loading
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          )}
        >
          {loading
            ? <><Loader2 className="h-4 w-4 animate-spin" /> Envoi en cours...</>
            : <><CheckCircle2 className="h-4 w-4" /> Soumettre et voir ma note</>
          }
        </button>
        {erreur && <p className="text-xs text-destructive text-center">{erreur}</p>}
        <p className="text-xs text-muted-foreground text-center">
          Une fois soumis, vous ne pourrez plus modifier vos réponses.
        </p>
      </div>
    )
  }

  // ── Étape Correction ──
  if (etape === 'correction' && resultat) {
    return (
      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-center space-y-2">
        <FileText className="h-8 w-8 mx-auto text-indigo-600" />
        <p className="text-sm font-semibold text-foreground">Devoir soumis</p>
        <p className="text-xs text-indigo-800">
          Vos cas pratiques ont été transmis à votre professeur. La note finale s'affichera ici après sa correction.
        </p>
        <div className="text-xs text-muted-foreground mt-2">
          <p>QCM : {formaterNombre(resultat.scoreQCM)}/10</p>
          <p>Cas pratiques : en attente de correction</p>
        </div>
      </div>
    )
  }

  return null
}

// ─── Composant : Passer un devoir à questions rédigées ────────────────────────

// Les réponses partent en correction chez l'enseignant, qui peut s'aider
// d'une proposition de l'IA. Les réponses attendues ne sont pas dans le
// devoir : l'étudiant ne peut pas les lire.
function PasserRedaction({ devoir, etudiantId, onSoumis }: PasserQCMCasProps) {
  const questionsRedigees: CasPratique[] = devoir.casPratiques || []
  const [reponses, setReponses] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')
  const [envoye, setEnvoye] = useState(false)
  const toutesRemplies = questionsRedigees.every(q => (reponses[q.id] || '').trim())

  const handleSoumettre = async () => {
    if (!toutesRemplies) return
    setLoading(true)
    setErreur('')
    try {
      const soumission = await createSoumissionAsync({
        devoirId: devoir.id,
        etudiantId,
        reponsesCasPratiques: Object.fromEntries(questionsRedigees.map(q => [q.id, reponses[q.id].trim()])),
      } as any)
      setEnvoye(true)
      onSoumis(soumission)
    } catch (e) {
      console.error(e)
      setErreur('Envoi impossible pour le moment. Vérifiez votre connexion, puis réessayez.')
    } finally {
      setLoading(false)
    }
  }

  if (envoye) {
    return (
      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-center space-y-2">
        <FileText className="h-8 w-8 mx-auto text-indigo-600" />
        <p className="text-sm font-semibold text-foreground">Devoir soumis</p>
        <p className="text-xs text-indigo-800">
          Vos réponses ont été transmises à votre professeur. La note s'affichera ici après sa correction.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-indigo-50 border border-indigo-200 p-3 text-xs text-indigo-800">
        <p className="font-semibold mb-1">Questions à réponse rédigée - /20</p>
        <p>Répondez avec vos mots : c'est l'exactitude et la logique comptable qui sont évaluées.</p>
      </div>
      {questionsRedigees.map((q, i) => (
        <div key={q.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
          <div className="flex items-start gap-2">
            <span className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground">{q.titre}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{q.pointsMax} point{q.pointsMax > 1 ? 's' : ''}</p>
            </div>
          </div>
          {q.enonce && q.enonce !== q.titre && (
            <div className="rounded-lg bg-muted/40 p-3 text-xs text-foreground leading-relaxed whitespace-pre-wrap border border-border">{q.enonce}</div>
          )}
          <textarea
            rows={5}
            className="w-full rounded-lg border border-border bg-background text-xs text-foreground p-2.5 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-muted-foreground/50"
            placeholder="Rédigez votre réponse ici..."
            aria-label={`Réponse à la question ${i + 1}`}
            value={reponses[q.id] || ''}
            onChange={e => setReponses(r => ({ ...r, [q.id]: e.target.value }))}
          />
        </div>
      ))}
      <button
        onClick={handleSoumettre}
        disabled={!toutesRemplies || loading}
        className={cn(
          'w-full flex items-center justify-center gap-2 text-xs font-semibold rounded-xl py-3 transition-colors',
          toutesRemplies && !loading ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-muted text-muted-foreground cursor-not-allowed'
        )}
      >
        {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Envoi en cours...</> : <><CheckCircle2 className="h-4 w-4" /> Soumettre mes réponses</>}
      </button>
      {erreur && <p className="text-xs text-destructive text-center">{erreur}</p>}
      <p className="text-xs text-muted-foreground text-center">Une fois soumis, vous ne pourrez plus modifier vos réponses.</p>
    </div>
  )
}

// ─── Affichage résultat QCM chapitre ──────────────────────────────────────────

interface ResultatQCMDisplayProps {
  score: number
  total: number
  noteSur20: number
  questions: QCMChapitre[]
  details: { qId: string; choix: string; correct: boolean }[]
}

function ResultatQCMDisplay({ score, total, noteSur20, questions, details }: ResultatQCMDisplayProps) {
  return (
    <div className="space-y-4">
      <div className={cn(
        'rounded-xl border p-4 text-center space-y-1',
        score >= Math.ceil(total * 0.7)
          ? 'border-emerald-300 bg-emerald-50'
          : score >= Math.ceil(total * 0.5)
            ? 'border-yellow-300 bg-yellow-50'
            : 'border-red-300 bg-red-50'
      )}>
        <Award className={cn('h-8 w-8 mx-auto',
          score >= Math.ceil(total * 0.7) ? 'text-emerald-600' :
          score >= Math.ceil(total * 0.5) ? 'text-yellow-600' : 'text-red-500'
        )} />
        <p className="text-2xl font-bold text-foreground">
          {noteSur20}<span className="text-base font-normal text-muted-foreground">/20</span>
        </p>
        <p className="text-xs text-muted-foreground">
          {score}/{total} bonnes réponses
        </p>
        <p className="text-xs font-medium text-foreground">
          {score >= Math.ceil(total * 0.7) ? '🎉 Excellent travail !' : score >= Math.ceil(total * 0.5) ? '👍 Satisfaisant' : '📚 Continuez à réviser'}
        </p>
      </div>
      <QCMDetailsDisplay questions={questions} details={details} />
    </div>
  )
}

// ─── Détail des réponses QCM ──────────────────────────────────────────────────

interface QCMDetailsDisplayProps {
  questions: QCMChapitre[]
  details: { qId: string; choix: string; correct: boolean }[]
}

function QCMDetailsDisplay({ questions, details }: QCMDetailsDisplayProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-foreground px-1">Détail des réponses</p>
      {questions.map((q, i) => {
        const det = details.find(d => d.qId === q.id)
        const correct = det?.correct ?? false
        const choixEtu = q.options.find(o => o.id === det?.choix)
        const bonneOpt = q.options.find(o => o.id === q.reponseCorrecte)
        return (
          <div key={q.id} className={cn(
            'rounded-lg border p-3 text-xs space-y-1.5',
            correct
              ? 'border-emerald-200 bg-emerald-50'
              : 'border-red-200 bg-red-50'
          )}>
            <div className="flex items-start gap-2">
              {correct
                ? <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                : <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
              }
              <p className="font-medium text-foreground leading-snug">
                Q{i + 1}. {q.question}
              </p>
            </div>
            {!correct && (
              <p className="text-red-600 pl-6">
                Votre réponse : {choixEtu?.texte || '-'}
              </p>
            )}
            <p className="text-emerald-700 pl-6">
              ✓ Bonne réponse : {bonneOpt?.texte}
            </p>
            <p className="pl-6 text-muted-foreground italic">{q.explication}</p>
            <p className="pl-6 text-indigo-600 font-medium">📖 {q.articleRef}</p>
          </div>
        )
      })}
    </div>
  )
}

// ─── Formulaire QCM réutilisable ───────────────────────────────────────────────

interface QCMFormProps {
  questions: QCMChapitre[]
  reponses: Record<string, string>
  onReponse: (qId: string, optId: string) => void
  onSoumettre: () => void
  loading: boolean
  label: string
  disabled?: boolean
}

function QCMForm({ questions, reponses, onReponse, onSoumettre, loading, label, disabled }: QCMFormProps) {
  const totalRepondues = Object.keys(reponses).length
  const peutSoumettre = totalRepondues === questions.length && !disabled

  return (
    <div className="space-y-3">
      {/* Progression */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>{totalRepondues}/{questions.length} questions répondues</span>
        <span className={cn('font-semibold', peutSoumettre ? 'text-emerald-600' : 'text-amber-600')}>
          {peutSoumettre ? 'Prêt à continuer' : `${questions.length - totalRepondues} restante(s)`}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all"
          style={{ width: `${(totalRepondues / questions.length) * 100}%` }}
        />
      </div>

      {/* Questions */}
      {questions.map((q, i) => (
        <div key={q.id} className={cn(
          'rounded-xl border p-3.5 space-y-2.5 transition-colors',
          reponses[q.id] ? 'border-indigo-300 bg-indigo-50/50' : 'border-border bg-card'
        )}>
          <div className="flex items-start gap-2">
            <span className="h-5 w-5 rounded-full bg-muted text-muted-foreground text-xs font-bold flex items-center justify-center shrink-0">
              {i + 1}
            </span>
            <p className="text-xs font-medium text-foreground leading-snug">{q.question}</p>
          </div>
          <div className="space-y-1.5 pl-7">
            {q.options.map(opt => (
              <button
                key={opt.id}
                onClick={() => onReponse(q.id, opt.id)}
                className={cn(
                  'w-full text-left text-xs rounded-lg border px-3 py-2 transition-colors',
                  reponses[q.id] === opt.id
                    ? 'border-indigo-500 bg-indigo-100 text-indigo-800 font-medium'
                    : 'border-border bg-card hover:bg-muted/40 text-foreground'
                )}
              >
                <span className="font-bold mr-1.5">{opt.id.toUpperCase()}.</span>{opt.texte}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Bouton */}
      <button
        onClick={onSoumettre}
        disabled={!peutSoumettre || loading}
        className={cn(
          'w-full flex items-center justify-center gap-2 text-xs font-semibold rounded-xl py-3 transition-colors',
          peutSoumettre && !loading
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        )}
      >
        <CheckCircle2 className="h-4 w-4" />
        {loading ? 'Correction en cours...' : label}
      </button>
      <p className="text-xs text-muted-foreground text-center">
        Une fois soumis, vous ne pourrez plus modifier vos réponses.
      </p>
    </div>
  )
}

// ─── Carte d'un devoir ────────────────────────────────────────────────────────

interface DevoirCarteProps {
  devoir: Devoir
  soumission: Soumission | null
  etudiantId: string
  onSoumis: (s: Soumission) => void
}

function DevoirCarte({ devoir, soumission, etudiantId, onSoumis }: DevoirCarteProps) {
  const [ouvert, setOuvert] = useState(false)
  const expire = new Date() > new Date(devoir.dateLimit)

  // La note enregistrée est déjà sur 20 pour les deux types de devoir de
  // chapitre. Elle était encore doublée ici pour un QCM (16/20 affiché 32/20).
  const noteSur20 = noteDeCopie(soumission, devoir)

  // Copie rendue sans note : évaluation automatique des cas pratiques
  // indisponible, l'enseignant corrige. Le statut « soumis » ne suffit pas à
  // le dire : les copies notées automatiquement l'ont aussi porté.
  const estEnAttenteCorrectionManuelle = !!soumission && estACorriger(soumission)

  const getBadgeNote = () => {
    if (!soumission && expire) {
      return (
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">0/20</span>
      )
    }
    if (estEnAttenteCorrectionManuelle) {
      return (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
          En correction
        </span>
      )
    }
    if (noteSur20 !== null) {
      return (
        <span className={cn(
          'text-xs font-bold px-2 py-0.5 rounded-full',
          noteSur20 >= 14 ? 'bg-emerald-100 text-emerald-700' :
          noteSur20 >= 10 ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        )}>
          {noteSur20}/20
        </span>
      )
    }
    return null
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        onClick={() => setOuvert(o => !o)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-start gap-3 text-left">
          <div className={cn(
            'h-9 w-9 rounded-xl flex items-center justify-center shrink-0',
            soumission ? 'bg-emerald-100' :
            expire ? 'bg-red-100' :
            'bg-indigo-100'
          )}>
            {soumission
              ? <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
              : expire
                ? <XCircle className="h-4.5 w-4.5 text-red-500" />
                : <Clock className="h-4.5 w-4.5 text-indigo-600" />
            }
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-foreground truncate">{devoir.titre}</p>
              {devoir.type === 'qcm_cas' && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-medium shrink-0">
                  QCM+Cas
                </span>
              )}
              {devoir.type === 'redaction' && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 font-medium shrink-0">
                  Rédaction
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <span className="text-xs text-muted-foreground">{devoir.chapitreNom}</span>
              {getBadgeNote()}
              {!soumission && !expire && (
                <span className="text-xs text-amber-600">
                  Limite : {new Date(devoir.dateLimit).toLocaleDateString('fr-FR')}
                </span>
              )}
              {expire && !soumission && (
                <span className="text-xs text-red-500">Délai dépassé</span>
              )}
            </div>
          </div>
        </div>
        {ouvert
          ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
          : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
        }
      </button>

      {ouvert && (
        <div className="border-t border-border px-4 pb-4 pt-4">
          {soumission ? (
            <ResultatSoumis devoir={devoir} soumission={soumission} noteSur20={noteSur20} />
          ) : expire ? (
            <div className="text-center py-4 text-xs text-muted-foreground">
              <XCircle className="h-8 w-8 mx-auto text-red-400 mb-2" />
              La date limite est dépassée. Ce devoir ne peut plus être soumis.
            </div>
          ) : devoir.type === 'redaction' ? (
            <PasserRedaction
              devoir={devoir}
              etudiantId={etudiantId}
              onSoumis={onSoumis}
            />
          ) : devoir.type === 'qcm_cas' ? (
            <PasserQCMCas
              devoir={devoir}
              etudiantId={etudiantId}
              onSoumis={onSoumis}
            />
          ) : (
            <PasserQCMChapitre
              devoir={devoir}
              etudiantId={etudiantId}
              onSoumis={onSoumis}
            />
          )}
        </div>
      )}
    </div>
  )
}

// ─── Affichage devoir déjà soumis ─────────────────────────────────────────────

interface ResultatSoumisProps {
  devoir: Devoir
  soumission: Soumission
  noteSur20: number | null
}

function ResultatSoumis({ devoir, soumission, noteSur20 }: ResultatSoumisProps) {
  // Devoir en attente de correction manuelle
  if (estACorriger(soumission)) {
    return (
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-center space-y-2">
        <FileText className="h-8 w-8 mx-auto text-amber-600" />
        <p className="text-sm font-semibold text-foreground">En attente de correction</p>
        <p className="text-xs text-muted-foreground">
          Votre devoir a été soumis le {new Date(soumission.dateSoumission).toLocaleDateString('fr-FR')}.
          Votre professeur procédera à la correction.
        </p>
        {typeof soumission.scoreQCMCas === 'number' && (
          <p className="text-xs text-muted-foreground">
            Partie QCM : {soumission.scoreQCMCas}/10 pts déjà calculés
          </p>
        )}
      </div>
    )
  }

  // Devoir noté - qcm_cas avec évaluations Gemini
  if (devoir.type === 'qcm_cas' && soumission.evaluationsCasPratiques && devoir.casPratiques) {
    return (
      <div className="space-y-3">
        <div className={cn(
          'rounded-xl border p-4 text-center space-y-2',
          noteSur20! >= 14 ? 'border-emerald-300 bg-emerald-50' :
          noteSur20! >= 10 ? 'border-yellow-300 bg-yellow-50' :
          'border-red-300 bg-red-50'
        )}>
          <p className="text-3xl font-bold text-foreground">
            {noteSur20}<span className="text-sm font-normal text-muted-foreground">/20</span>
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span>QCM : {soumission.scoreQCMCas ?? '-'}/10</span>
            <span className="text-border">|</span>
            <span>Cas : {soumission.scoreCasPratiques ?? '-'}/10</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Soumis le {new Date(soumission.dateSoumission).toLocaleDateString('fr-FR')}
          </p>
        </div>
        {/* Évaluations Gemini */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground px-1">Détail des cas pratiques</p>
          {devoir.casPratiques.map(cas => {
            const ev = soumission.evaluationsCasPratiques!.find(e => e.casId === cas.id)
            if (!ev) return null
            return (
              <div key={cas.id} className={cn(
                'rounded-lg border p-3 text-xs space-y-1.5',
                ev.coherente
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-red-200 bg-red-50'
              )}>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">{cas.titre}</p>
                  <span className={cn(
                    'font-bold px-2 py-0.5 rounded-full',
                    ev.coherente ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  )}>
                    {ev.score}/{cas.pointsMax} pts
                  </span>
                </div>
                <p className="text-muted-foreground italic leading-relaxed">{ev.commentaire}</p>
              </div>
            )
          })}
        </div>
        {/* Détail QCM si disponible */}
        {soumission.detailsQCMChapitre && devoir.questionsChapitre && (
          <details className="text-xs">
            <summary className="cursor-pointer text-indigo-600 font-medium hover:underline py-1">
              Voir le détail QCM
            </summary>
            <div className="mt-2">
              <QCMDetailsDisplay
                questions={devoir.questionsChapitre}
                details={soumission.detailsQCMChapitre}
              />
            </div>
          </details>
        )}
      </div>
    )
  }

  // Devoir noté par l'enseignant (questions rédigées, QCM + cas) ou QCM de
  // chapitre : note, commentaire de l'enseignant et réponses rendues.
  return (
    <div className="space-y-3">
      <div className={cn(
        'rounded-xl border p-4 text-center space-y-1',
        noteSur20! >= 14 ? 'border-emerald-300 bg-emerald-50' :
        noteSur20! >= 10 ? 'border-yellow-300 bg-yellow-50' :
        'border-red-300 bg-red-50'
      )}>
        <p className="text-3xl font-bold text-foreground">
          {noteSur20}<span className="text-sm font-normal text-muted-foreground">/20</span>
        </p>
        {typeof soumission.scoreQCMChapitre === 'number' && (
          <p className="text-xs text-muted-foreground">
            {soumission.scoreQCMChapitre}/{devoir.questionsChapitre?.length ?? '?'} bonnes réponses
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Soumis le {new Date(soumission.dateSoumission).toLocaleDateString('fr-FR')}
        </p>
      </div>
      {soumission.commentaire && (
        <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs">
          <p className="font-semibold text-foreground mb-1">Commentaire du professeur</p>
          <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{soumission.commentaire}</p>
        </div>
      )}
      {soumission.reponsesCasPratiques && !!devoir.casPratiques?.length && (
        <details className="text-xs">
          <summary className="cursor-pointer text-indigo-600 font-medium hover:underline py-1">
            Voir mes réponses rédigées
          </summary>
          <div className="space-y-2 mt-2">
            {devoir.casPratiques.map(q => (
              <div key={q.id} className="rounded-lg border border-border p-3 space-y-1">
                <p className="font-semibold text-foreground">{q.titre}</p>
                <p className="whitespace-pre-wrap text-muted-foreground">{soumission.reponsesCasPratiques?.[q.id] || '(aucune réponse)'}</p>
              </div>
            ))}
          </div>
        </details>
      )}
      {soumission.detailsQCMChapitre && devoir.questionsChapitre && (
        <details className="text-xs">
          <summary className="cursor-pointer text-indigo-600 font-medium hover:underline py-1">
            Voir le détail des réponses
          </summary>
          <div className="space-y-2 mt-2">
            <QCMDetailsDisplay
              questions={devoir.questionsChapitre}
              details={soumission.detailsQCMChapitre}
            />
          </div>
        </details>
      )}
    </div>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────

interface Props {
  devoirs: Devoir[]
  soumissions: Soumission[]
  etudiantId: string
  promotionId?: string
}

export default function DevoirChapitreEtudiant({ devoirs, soumissions, etudiantId, promotionId }: Props) {
  const [soumissionsLocales, setSoumissionsLocales] = useState<Soumission[]>([])

  const toutesLesSoumissions = [...soumissions, ...soumissionsLocales]

  // Devoirs des chapitres UE (QCM, QCM + cas, questions rédigées) ciblant
  // cette promotion, comparée par son code (« L1 Comptabilité » vaut L1).
  const devoirsFiltres = devoirs.filter(d =>
    estDevoirChapitre(d) &&
    promotionCorrespond(d.promotionId, promotionId)
  )

  const maintenant = new Date()
  const soumissionDe = (d: Devoir) => toutesLesSoumissions.find(s => s.devoirId === d.id && s.etudiantId === etudiantId)
  const enAttente = devoirsFiltres.filter(d => !soumissionDe(d) && maintenant <= new Date(d.dateLimit))
  // Délai échu sans copie : compté zéro dans la cote, donc montré.
  const nonRendus = devoirsFiltres.filter(d => !soumissionDe(d) && maintenant > new Date(d.dateLimit))
  const termines = devoirsFiltres.filter(d => !!soumissionDe(d))

  const handleSoumis = (s: Soumission) => {
    setSoumissionsLocales(prev => [...prev, s])
  }

  if (devoirsFiltres.length === 0) {
    return (
      <div className="text-center py-8 text-xs text-muted-foreground">
        <BookOpen className="h-8 w-8 mx-auto text-muted-foreground/40 mb-2" />
        Aucun devoir de chapitre pour le moment.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* La cote n'est plus recalculée ici : elle figure dans « Mes cotes »,
          calculée une seule fois pour tous les devoirs (lib/cotes.ts). */}
      <p className="text-xs text-muted-foreground px-1">
        {termines.length} rendu{termines.length > 1 ? 's' : ''} · {enAttente.length} à faire
        {nonRendus.length > 0 && <span className="text-red-500"> · {nonRendus.length} non rendu{nonRendus.length > 1 ? 's' : ''} (comptés zéro)</span>}
      </p>

      {/* Devoirs en attente */}
      {enAttente.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide px-1">
            À faire ({enAttente.length})
          </p>
          {enAttente.map(d => (
            <DevoirCarte
              key={d.id}
              devoir={d}
              soumission={soumissionDe(d) || null}
              etudiantId={etudiantId}
              onSoumis={handleSoumis}
            />
          ))}
        </div>
      )}

      {/* Non rendus */}
      {nonRendus.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-red-500 uppercase tracking-wide px-1">
            Non rendus ({nonRendus.length})
          </p>
          {nonRendus.map(d => (
            <DevoirCarte
              key={d.id}
              devoir={d}
              soumission={null}
              etudiantId={etudiantId}
              onSoumis={handleSoumis}
            />
          ))}
        </div>
      )}

      {/* Historique */}
      {termines.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-1">
            Historique ({termines.length})
          </p>
          {termines.map(d => (
            <DevoirCarte
              key={d.id}
              devoir={d}
              soumission={soumissionDe(d) || null}
              etudiantId={etudiantId}
              onSoumis={handleSoumis}
            />
          ))}
        </div>
      )}
    </div>
  )
}
