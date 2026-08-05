/**
 * QCMPageUnique.tsx
 * Affiche TOUS les QCM sur une seule page.
 * Correction immédiate après chaque réponse.
 * Bouton réinitialiser par question.
 * Compatible avec le type QCMChapitre de db.ts
 */
import React, { useState } from 'react'
import { CheckCircle2, XCircle, RotateCcw, ChevronDown, ChevronUp, Award } from 'lucide-react'
import { cn } from '@/lib/utils'
import { QCMChapitre } from '@/lib/db'

interface QCMPageUniqueProps {
  questions: QCMChapitre[]
  couleurAccent?: string   // ex: 'cyan' | 'purple' | 'teal'
}

export default function QCMPageUnique({ questions, couleurAccent = 'indigo' }: QCMPageUniqueProps) {
  // reponses[id] = id de l'option choisie
  const [reponses, setReponses] = useState<Record<string, string>>({})
  // explication visible par question
  const [explVisible, setExplVisible] = useState<Record<string, boolean>>({})

  const totalQ = questions.length
  const totalRepondu = Object.keys(reponses).length

  // Score en temps réel
  const score = questions.filter(q => reponses[q.id] === q.reponseCorrecte).length
  const pct = totalRepondu > 0 ? Math.round((score / totalRepondu) * 100) : 0

  const scoreCouleur = pct >= 80 ? 'text-green-600' : pct >= 60 ? 'text-amber-600' : 'text-red-600'
  const scoreMsg = totalRepondu === totalQ
    ? pct >= 80
      ? 'Excellent ! Vous maîtrisez ce chapitre.'
      : pct >= 60
      ? 'Bon niveau. Relisez les points à revoir.'
      : 'Relisez les leçons avant de recommencer.'
    : `${totalRepondu} / ${totalQ} questions répondues`

  const resetQuestion = (id: string) => {
    setReponses(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    setExplVisible(prev => ({ ...prev, [id]: false }))
  }

  const resetAll = () => {
    setReponses({})
    setExplVisible({})
  }

  const toggleExpl = (id: string) => {
    setExplVisible(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="space-y-4">
      {/* Bandeau score global */}
      <div className={cn(
        'rounded-xl border p-3 flex items-center justify-between',
        `border-${couleurAccent}-200 dark:border-${couleurAccent}-800 bg-${couleurAccent}-50/50 dark:bg-${couleurAccent}-900/10`
      )}>
        <div className="flex items-center gap-3">
          <Award className={cn('h-5 w-5', totalRepondu > 0 ? scoreCouleur : `text-${couleurAccent}-500`)} />
          <div>
            <p className={cn('text-sm font-bold', totalRepondu > 0 ? scoreCouleur : 'text-foreground')}>
              {totalRepondu > 0 ? `${score} / ${totalRepondu}` : `0 / ${totalQ}`}
            </p>
            <p className="text-xs text-muted-foreground">{scoreMsg}</p>
          </div>
        </div>
        {totalRepondu > 0 && (
          <button
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Tout réinitialiser
          </button>
        )}
      </div>

      {/* Liste des questions */}
      <div className="space-y-3">
        {questions.map((q, idx) => {
          const rep = reponses[q.id]
          const repondu = rep !== undefined
          const estCorrecte = rep === q.reponseCorrecte
          const voirExpl = explVisible[q.id] || false

          return (
            <div
              key={q.id}
              className={cn(
                'rounded-xl border bg-card p-4 space-y-3 transition-colors',
                repondu
                  ? estCorrecte
                    ? 'border-green-300 dark:border-green-700'
                    : 'border-red-300 dark:border-red-700'
                  : 'border-border'
              )}
            >
              {/* Enoncé */}
              <div className="flex items-start gap-2">
                <span className={cn(
                  'shrink-0 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center',
                  repondu
                    ? estCorrecte
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    : 'bg-primary/10 text-primary'
                )}>
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-relaxed">{q.question}</p>
                  {q.articleRef && (
                    <p className="text-[11px] text-muted-foreground/70 mt-0.5">{q.articleRef}</p>
                  )}
                </div>
                {/* Bouton réinitialiser par question */}
                {repondu && (
                  <button
                    onClick={() => resetQuestion(q.id)}
                    title="Réinitialiser cette question"
                    className="shrink-0 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Options */}
              <div className="space-y-1.5">
                {q.options.map(opt => {
                  let cls = 'w-full text-left rounded-lg border px-3 py-2 text-sm transition-colors '
                  if (!repondu) {
                    cls += `border-border hover:border-${couleurAccent}-400 hover:bg-${couleurAccent}-50/50 dark:hover:bg-${couleurAccent}-900/10`
                  } else {
                    if (opt.id === q.reponseCorrecte) {
                      cls += 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                    } else if (opt.id === rep) {
                      cls += 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                    } else {
                      cls += 'border-border opacity-50'
                    }
                  }
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        if (!repondu) setReponses(r => ({ ...r, [q.id]: opt.id }))
                      }}
                      disabled={repondu}
                      className={cls}
                    >
                      <span className="font-semibold mr-2 text-muted-foreground">{opt.id.toUpperCase()}.</span>
                      {opt.texte}
                    </button>
                  )
                })}
              </div>

              {/* Résultat immédiat après réponse */}
              {repondu && (
                <div className="space-y-1.5">
                  <div className={cn('flex items-center gap-1.5 text-xs font-semibold',
                    estCorrecte ? 'text-green-600' : 'text-red-600'
                  )}>
                    {estCorrecte
                      ? <><CheckCircle2 className="h-3.5 w-3.5" /> Bonne réponse</>
                      : <><XCircle className="h-3.5 w-3.5" /> Incorrect</>
                    }
                  </div>
                  <button
                    onClick={() => toggleExpl(q.id)}
                    className="flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    {voirExpl
                      ? <><ChevronUp className="h-3 w-3" /> Masquer l'explication</>
                      : <><ChevronDown className="h-3 w-3" /> Voir l'explication</>
                    }
                  </button>
                  {voirExpl && (
                    <div className="rounded-lg bg-muted/50 p-3 text-xs space-y-1">
                      <p className="leading-relaxed">{q.explication}</p>
                      {q.articleRef && (
                        <p className="font-semibold text-primary">{q.articleRef}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
