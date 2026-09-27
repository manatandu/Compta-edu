/**
 * DevoirChapitreEtudiant.tsx
 * Affiché dans le Dashboard étudiant - onglet "Mes devoirs"
 * Gère deux types de devoirs depuis les chapitres UE :
 *   - qcm_chapitre : N QCM (sélection libre) × 1pt → note ramenée /20
 *   - qcm_cas      : N QCM (10 pts) + cas pratiques évalués par Gemini (10 pts) = /20
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
import { soumettreQCM, messageErreurEnvoi } from '@/lib/correctionServeur'
import { estNotee, estACorriger } from '@/lib/cotes'
import { promotionCorrespond } from '@/lib/promotion'

// ─── Calculs ──────────────────────────────────────────────────────────────────

/** Convertit un score brut en note /20 selon le nombre total de questions */
export function scoreEnNoteSur20(score: number, total: number = 10): number {
  if (total === 0) return 0
  return parseFloat(((score / total) * 20).toFixed(2))
}


// ─── Correction ───────────────────────────────────────────────────────────────
// La note est calculée par le serveur (fonction soumettreQCM), qui écrit la
// copie et fait évaluer les cas pratiques par Gemini : le navigateur ne fait
// qu'envoyer les réponses et afficher le résultat renvoyé.

// ─── Composant : Passer un devoir qcm_chapitre ────────────────────────────────

interface PasserQCMChapitreProps {
  devoir: Devoir
  onSoumis: (soumission: Soumission) => void
}

function PasserQCMChapitre({ devoir, onSoumis }: PasserQCMChapitreProps) {
  const questions: QCMChapitre[] = devoir.questionsChapitre || []
  const [reponses, setReponses] = useState<Record<string, string>>({})
  const [soumis, setSoumis] = useState(false)
  const [resultat, setResultat] = useState<{
    score: number
    details: { qId: string; choix: string; correct: boolean }[]
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')

  const totalRepondues = Object.keys(reponses).length
  const peutSoumettre = totalRepondues === questions.length

  const handleSoumettre = async () => {
    if (!peutSoumettre) return
    setLoading(true)
    setErreur('')
    try {
      const { soumission } = await soumettreQCM({ devoirId: devoir.id, reponses })
      setResultat({ score: soumission.scoreQCMChapitre ?? 0, details: soumission.detailsQCMChapitre ?? [] })
      setSoumis(true)
      onSoumis(soumission)
    } catch (e) {
      console.error(e)
      setErreur(messageErreurEnvoi(e))
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
    <div className="space-y-2">
      <QCMForm
        questions={questions}
        reponses={reponses}
        onReponse={(qId, optId) => setReponses(r => ({ ...r, [qId]: optId }))}
        onSoumettre={handleSoumettre}
        loading={loading}
        label="Soumettre et voir ma note"
      />
      {erreur && <p className="text-xs text-destructive text-center">{erreur}</p>}
    </div>
  )
}

// ─── Composant : Passer un devoir qcm_cas ─────────────────────────────────────

interface PasserQCMCasProps {
  devoir: Devoir
  onSoumis: (soumission: Soumission) => void
}

type EtapeQCMCas = 'qcm' | 'cas' | 'correction'

function PasserQCMCas({ devoir, onSoumis }: PasserQCMCasProps) {
  const questions: QCMChapitre[] = devoir.questionsChapitre || []
  const casPratiques: CasPratique[] = devoir.casPratiques || []

  const [etape, setEtape] = useState<EtapeQCMCas>('qcm')
  const [reponsesQCM, setReponsesQCM] = useState<Record<string, string>>({})
  const [reponsesCas, setReponsesCas] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')
  const [resultat, setResultat] = useState<{
    scoreQCM: number
    detailsQCM: { qId: string; choix: string; correct: boolean }[]
    evaluations: { casId: string; score: number; commentaire: string; coherente: boolean }[]
    scoreCas: number
    noteFinale: number
    geminiEchoue: boolean
  } | null>(null)

  const totalQCMRepondues = Object.keys(reponsesQCM).length
  const peutPasserCas = totalQCMRepondues === questions.length
  const totalCasRemplies = casPratiques.filter(c => (reponsesCas[c.id] || '').trim()).length
  const peutSoumettreCas = totalCasRemplies === casPratiques.length

  const handleValiderQCM = () => {
    if (peutPasserCas) setEtape('cas')
  }

  const handleSoumettreCas = async () => {
    if (!peutSoumettreCas) return
    setLoading(true)
    setErreur('')
    try {
      const { soumission } = await soumettreQCM({ devoirId: devoir.id, reponses: reponsesQCM, reponsesCas })
      const noteFinale = typeof soumission.note === 'number' ? soumission.note : null
      setResultat({
        scoreQCM: soumission.scoreQCMCas ?? 0,
        detailsQCM: soumission.detailsQCMChapitre ?? [],
        evaluations: soumission.evaluationsCasPratiques ?? [],
        scoreCas: soumission.scoreCasPratiques ?? 0,
        noteFinale: noteFinale ?? 0,
        // Sans note, le correcteur automatique n'a pas pu évaluer les cas :
        // la copie attend la correction du professeur.
        geminiEchoue: noteFinale === null,
      })
      setEtape('correction')
      onSoumis(soumission)
    } catch (e) {
      console.error(e)
      setErreur(messageErreurEnvoi(e))
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
          <p>Partie 2 : {casPratiques.length} cas pratique{casPratiques.length > 1 ? 's' : ''} = 10 pts (corrigé par IA)</p>
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
          <p className="mt-0.5 text-amber-600">La correction est effectuée par IA - répondez avec vos mots, la logique est évaluée.</p>
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
            ? <><Loader2 className="h-4 w-4 animate-spin" /> Correction IA en cours...</>
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
    if (resultat.geminiEchoue) {
      return (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-center space-y-2">
          <FileText className="h-8 w-8 mx-auto text-amber-600" />
          <p className="text-sm font-semibold text-foreground">Devoir soumis</p>
          <p className="text-xs text-amber-700">
            La correction automatique des cas pratiques a rencontré un problème. Votre devoir a été transmis à votre professeur pour correction manuelle.
          </p>
          <div className="text-xs text-muted-foreground mt-2">
            <p>QCM : {resultat.scoreQCM}/10 pts validés</p>
            <p>Cas pratiques : en attente de correction</p>
          </div>
        </div>
      )
    }

    return (
      <ResultatQCMCasDisplay
        scoreQCM={resultat.scoreQCM}
        scoreCas={resultat.scoreCas}
        noteFinale={resultat.noteFinale}
        questions={questions}
        detailsQCM={resultat.detailsQCM}
        casPratiques={casPratiques}
        evaluations={resultat.evaluations}
      />
    )
  }

  return null
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

// ─── Affichage résultat QCM + Cas ─────────────────────────────────────────────

interface ResultatQCMCasDisplayProps {
  scoreQCM: number
  scoreCas: number
  noteFinale: number
  questions: QCMChapitre[]
  detailsQCM: { qId: string; choix: string; correct: boolean }[]
  casPratiques: CasPratique[]
  evaluations: { casId: string; score: number; commentaire: string; coherente: boolean }[]
}

function ResultatQCMCasDisplay({
  scoreQCM, scoreCas, noteFinale,
  questions, detailsQCM, casPratiques, evaluations
}: ResultatQCMCasDisplayProps) {
  const [voirDetailQCM, setVoirDetailQCM] = useState(false)

  return (
    <div className="space-y-4">
      {/* Score global */}
      <div className={cn(
        'rounded-xl border p-4 text-center space-y-2',
        noteFinale >= 14
          ? 'border-emerald-300 bg-emerald-50'
          : noteFinale >= 10
            ? 'border-yellow-300 bg-yellow-50'
            : 'border-red-300 bg-red-50'
      )}>
        <Award className={cn('h-8 w-8 mx-auto',
          noteFinale >= 14 ? 'text-emerald-600' :
          noteFinale >= 10 ? 'text-yellow-600' : 'text-red-500'
        )} />
        <p className="text-2xl font-bold text-foreground">
          {noteFinale}<span className="text-base font-normal text-muted-foreground">/20</span>
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>QCM : {scoreQCM}/10</span>
          <span className="text-border">|</span>
          <span>Cas : {scoreCas}/10</span>
        </div>
        <p className="text-xs font-medium text-foreground">
          {noteFinale >= 14 ? '🎉 Excellent !' : noteFinale >= 10 ? '👍 Satisfaisant' : '📚 Continuez à réviser'}
        </p>
      </div>

      {/* Résultats cas pratiques */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground px-1">Correction des cas pratiques</p>
        {casPratiques.map((cas) => {
          const ev = evaluations.find(e => e.casId === cas.id)
          if (!ev) return null
          const ratio = ev.score / cas.pointsMax
          return (
            <div key={cas.id} className={cn(
              'rounded-lg border p-3 space-y-2',
              ev.coherente
                ? 'border-emerald-200 bg-emerald-50'
                : ratio >= 0.5
                  ? 'border-yellow-200 bg-yellow-50'
                  : 'border-red-200 bg-red-50'
            )}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-foreground">{cas.titre}</p>
                <span className={cn(
                  'text-xs font-bold px-2 py-0.5 rounded-full',
                  ev.coherente
                    ? 'bg-emerald-100 text-emerald-700'
                    : ratio >= 0.5
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                )}>
                  {ev.score}/{cas.pointsMax} pts
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                {ev.coherente
                  ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  : <XCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />
                }
                <span className={ev.coherente ? 'text-emerald-700' : 'text-red-600'}>
                  {ev.coherente ? 'Réponse logiquement correcte' : 'Réponse incohérente ou incorrecte'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed pl-5 italic">
                {ev.commentaire}
              </p>
            </div>
          )
        })}
      </div>

      {/* Détail QCM (accordéon) */}
      <div>
        <button
          onClick={() => setVoirDetailQCM(v => !v)}
          className="w-full text-left text-xs text-indigo-600 font-medium hover:underline flex items-center gap-1 py-1"
        >
          {voirDetailQCM
            ? <><ChevronUp className="h-3.5 w-3.5" /> Masquer le détail QCM</>
            : <><ChevronDown className="h-3.5 w-3.5" /> Voir le détail QCM ({questions.length} questions)</>
          }
        </button>
        {voirDetailQCM && (
          <QCMDetailsDisplay questions={questions} details={detailsQCM} />
        )}
      </div>
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
  onSoumis: (s: Soumission) => void
}

function DevoirCarte({ devoir, soumission, onSoumis }: DevoirCarteProps) {
  const [ouvert, setOuvert] = useState(false)
  const expire = new Date() > new Date(devoir.dateLimit)

  // La note enregistrée est déjà sur 20 pour les deux types de devoir de
  // chapitre. Elle était encore doublée ici pour un QCM (16/20 affiché 32/20).
  const noteSur20 = soumission && estNotee(soumission) ? soumission.note as number : null

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
          ) : devoir.type === 'qcm_cas' ? (
            <PasserQCMCas
              devoir={devoir}
              onSoumis={onSoumis}
            />
          ) : (
            <PasserQCMChapitre
              devoir={devoir}
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

  // Devoir noté - qcm_chapitre classique
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

  // Devoirs des chapitres UE (qcm_chapitre + qcm_cas) ciblant cette
  // promotion, comparée par son code (« L1 Comptabilité » vaut L1).
  const devoirsFiltres = devoirs.filter(d =>
    (d.type === 'qcm_chapitre' || d.type === 'qcm_cas') &&
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
              onSoumis={handleSoumis}
            />
          ))}
        </div>
      )}
    </div>
  )
}
