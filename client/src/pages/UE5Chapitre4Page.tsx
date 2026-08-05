import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle,
  BookOpen, Target, BarChart2, FileText, Layers, TrendingUp,
  ChevronRight, RotateCcw, AlertTriangle, GitBranch
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import DevoirChapitreCreateur, { versCasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
import QCMPageUnique from '@/components/QCMPageUnique'
import { QCMChapitre } from '@/lib/db'
import { InfoTooltip } from '@/components/InfoTooltip'

type QCMOption = { id: string; texte: string }
type QCMQuestion = {
  type: 'qcm'
  id: string
  question: string
  options: QCMOption[]
  reponseCorrecte: string
  explication: string
  articleRef: string
}
type Question = QCMQuestion

type Lecon = {
  id: string
  icone: React.ReactNode
  titre: string
  soustitre: string
  contenu: React.ReactNode
}

// ─── QCMBlock ─────────────────────────────────────────────────────────────────
function QCMBlock({ questions }: { questions: QCMQuestion[] }) {
  const [reponses, setReponses] = useState<Record<string, string>>({})
  const [vérifie, setVerifie] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  const handleSelect = (qId: string, optId: string) => {
    if (vérifie) return
    setReponses(prev => ({ ...prev, [qId]: optId }))
  }
  const handleVerifier = () => {
    let c = 0
    questions.forEach(q => { if (reponses[q.id] === q.reponseCorrecte) c++ })
    setScore(c); setVerifie(true)
  }
  const handleReset = () => { setReponses({}); setVerifie(false); setScore(null) }

  return (
    <div className="space-y-4 mt-4">
      {questions.map((q, qi) => {
        const isCorrect = reponses[q.id] === q.reponseCorrecte
        return (
          <div key={q.id} className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-card p-4">
            <p className="text-sm font-semibold text-foreground mb-1">Q{qi + 1}. {q.question}</p>
            <p className="text-xs text-muted-foreground mb-3 italic">{q.articleRef}</p>
            <div className="space-y-2">
              {q.options.map(opt => {
                const selected = reponses[q.id] === opt.id
                const isRight = opt.id === q.reponseCorrecte
                let cls = 'flex items-center gap-2 rounded-lg border px-3 py-2 text-xs cursor-pointer transition-colors '
                if (!vérifie) cls += selected ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200' : 'border-border hover:border-emerald-300 hover:bg-muted'
                else if (isRight) cls += 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                else if (selected && !isRight) cls += 'border-red-400 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                else cls += 'border-border text-muted-foreground'
                return (
                  <div key={opt.id} className={cls} onClick={() => handleSelect(q.id, opt.id)}>
                    {vérifie && isRight && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-500" />}
                    {vérifie && selected && !isRight && <XCircle className="h-3.5 w-3.5 shrink-0 text-red-500" />}
                    <span>{opt.texte}</span>
                  </div>
                )
              })}
            </div>
            {vérifie && (
              <div className={cn('mt-3 rounded-lg p-3 text-xs', isCorrect ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200')}>
                <strong>{isCorrect ? 'Correct !' : 'Incorrect.'}</strong> {q.explication}
              </div>
            )}
          </div>
        )
      })}
      <div className="flex gap-2">
        {!vérifie ? (
          <button onClick={handleVerifier} disabled={Object.keys(reponses).length < questions.length} className="flex-1 rounded-lg bg-emerald-600 text-white text-sm py-2.5 font-semibold hover:bg-emerald-700 disabled:opacity-40 transition-colors">
            Verifier mes reponses
          </button>
        ) : (
          <>
            <div className="flex-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-4 py-2.5 text-center">
              <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Score : {score}/{questions.length}</span>
            </div>
            <button onClick={handleReset} className="rounded-lg border border-border px-4 py-2.5 text-sm hover:bg-muted transition-colors flex items-center gap-1">
              <RotateCcw className="h-3.5 w-3.5" /> Recommencer
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ─── CasPratiqueBlock ─────────────────────────────────────────────────────────
function CasPratiqueBlock({ cas }: { cas: { titre: string; contexte: string; questions: { num: string; enonce: string; correction: string }[] } }) {
  const [open, setOpen] = useState<Record<string, boolean>>({})
  return (
    <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-card p-4 space-y-3">
      <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
        <FileText className="h-4 w-4" /> {cas.titre}
      </h3>
      <div className="rounded-lg bg-emerald-50/60 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-3">
        <p className="text-xs text-foreground leading-relaxed">{cas.contexte}</p>
      </div>
      <div className="space-y-3">
        {cas.questions.map(q => (
          <div key={q.num} className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="text-xs font-semibold text-foreground mb-2">Question {q.num} : {q.enonce}</p>
            <button onClick={() => setOpen(prev => ({ ...prev, [q.num]: !prev[q.num] }))} className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 hover:underline">
              <ChevronRight className={cn('h-3.5 w-3.5 transition-transform', open[q.num] && 'rotate-90')} />
              {open[q.num] ? 'Masquer la correction' : 'Voir la correction'}
            </button>
            {open[q.num] && (
              <div className="mt-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-3 text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed whitespace-pre-line">
                {q.correction}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── LECONS ──────────────────────────────────────────────────────────────────
const LECONS: Lecon[] = [
  {
    id: 'l1',
    icone: <GitBranch className="h-5 w-5" />,
    titre: 'Du budget de moyens au budget-programme',
    soustitre: 'LOFIP Expose des motifs, Art. 43-44 - Fondements de la reforme',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 p-4">
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2">Pourquoi une reforme budgétaire ?</h3>
          <p className="text-xs text-foreground leading-relaxed mb-2">
            Avant l\'adoption de la LOFIP en 2011, le budget de la RDC etait présenté par <strong>lignes de crédit</strong> — ce que l\'on appelle le budget de moyens. Chaque ministère recevait des dotations par nature de dépense (personnel, fonctionnement, investissement) sans avoir a justifier des résultats obtenus en contrepartie. Cette approche presentait deux defauts majeurs :
          </p>
          <ul className="space-y-1 ml-3 text-xs text-foreground">
            <li className="flex items-start gap-2"><span className="text-red-500 font-bold mt-0.5">x</span><span><strong>Absence de lien entre crédits et résultats :</strong> les ministères recevaient des fonds sans obligation de rendre compte des politiques publiques financees.</span></li>
            <li className="flex items-start gap-2"><span className="text-red-500 font-bold mt-0.5">x</span><span><strong>Pilotage impossible :</strong> le Parlement et le Gouvernement ne pouvaient pas evaluer l\'efficacite des dépenses, ni comparer le cout d\'une politique a ses effets concrets.</span></li>
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-emerald-600" /> La rupture introduite par la LOFIP
          </h3>
          <p className="text-xs text-foreground leading-relaxed mb-3">
            La LOFIP de 2011 introduit la <strong>budgetisation par objectifs de programmes (BOP)</strong> : les crédits ne sont plus alloues par nature de dépense, mais regroupes par <em>programmes</em> auxquels sont associes des objectifs mesurables et des indicateurs de performance. Cette approche est inspiree des meilleures pratiques internationales (France, OCDE, UEMOA).
          </p>

          <div className="rounded-lg border border-border bg-muted/30 p-3 mb-3">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-emerald-600 text-white">
                  <th className="border border-emerald-400 px-2 py-1.5 text-left">Critere</th>
                  <th className="border border-emerald-400 px-2 py-1.5 text-center">Budget de moyens (ancien)</th>
                  <th className="border border-emerald-400 px-2 py-1.5 text-center">Budget-programme (LOFIP)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Presentation', 'Par lignes de crédit et nature', 'Par programmes et objectifs'],
                  ['Question centrale', 'Combien dépense-t-on ?', 'Quels résultats obtient-on ?'],
                  ['Responsabilite', 'Comptable (respect dotation)', 'Manageriale (atteinte objectifs)'],
                  ['Flexibilite', 'Rigide (dotation par ligne)', 'Fongibilite des crédits (Art. 45)'],
                  ['Controle parlement', 'Sur les moyens votes', 'Sur les objectifs et la performance'],
                  ['Instrument cle', 'Budget chapitres/articles', 'Programme + PAP + RAP'],
                ].map(([c, a, b]) => (
                  <tr key={c} className="even:bg-muted/30">
                    <td className="border border-border px-2 py-1.5 font-medium">{c}</td>
                    <td className="border border-border px-2 py-1.5 text-center text-red-600 dark:text-red-400">{a}</td>
                    <td className="border border-border px-2 py-1.5 text-center text-emerald-600 dark:text-emerald-400">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-emerald-600" /> Definition legale du programme (Art. 43 LOFIP){' '}
            <InfoTooltip texte="L\'Art. 43 LOFIP donne la definition officielle et obligatoire du programme budgétaire. C\'est la brique de base du budget-programme. Chaque ministère peut creer autant de programmes que necessaire, plus un programme 'administration générale' pour les crédits non affectes." loi="Art. 43 LOFIP" />
          </h3>
          <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3 mb-3">
            <p className="text-xs text-foreground leading-relaxed italic">
              « Un programme regroupe les crédits destines a mettre en oeuvre une action ou un ensemble coherent d\'actions relevant d\'un meme ministère ou institution et auquel sont associes des objectifs precis, definis en fonction des finalites d\'intérêt général, ainsi que des résultats attendus et faisant l\'objet d\'une evaluation au moyen d\'indicateurs de performance. »
            </p>
            <p className="text-xs text-muted-foreground mt-1">Art. 43 al. 1 LOFIP</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-foreground">Trois elements constitutifs d\'un programme :</p>
            <div className="grid grid-cols-1 gap-2">
              {[
                { num: '1', titre: 'Coherence des actions', desc: 'Les actions doivent relever d\'un meme ministère ou institution et former un ensemble coherent au service d\'une finalite d\'intérêt général.' },
                { num: '2', titre: 'Objectifs precis', desc: 'Des objectifs mesurables, definis en fonction de finalites d\'intérêt général, sont associes a chaque programme. Ils constituent l\'engagement du responsable de programme envers le Parlement.' },
                { num: '3', titre: 'Indicateurs de performance', desc: 'Les résultats attendus font l\'objet d\'une evaluation au moyen d\'indicateurs de performance. Ces indicateurs permettent de mesurer l\'ecart entre objectifs et realisations.' },
              ].map(e => (
                <div key={e.num} className="flex gap-3 rounded-lg border border-border p-3">
                  <span className="text-xs font-bold text-white bg-emerald-600 rounded-full h-5 w-5 flex items-center justify-center shrink-0 mt-0.5">{e.num}</span>
                  <div>
                    <p className="text-xs font-bold text-foreground">{e.titre}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3">
            <p className="text-xs font-bold text-amber-800 dark:text-amber-200 mb-1">Programme "Administration générale" (Art. 43 al. 2)</p>
            <p className="text-xs text-amber-700 dark:text-amber-300">L\'Art. 43 al. 2 prevoit que chaque ministère ou institution peut creer un programme intitule <em>« administration générale »</em> destine a recevoir les crédits non specifiquement affectes a un autre programme. Ce programme "chapeau" evite que des crédits restent sans rattachement programmatique.</p>
          </div>

          <div className="mt-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
            <p className="text-xs font-bold text-red-800 dark:text-red-200 mb-1 flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5" /> Regle imperieuse (Art. 43 al. 3)</p>
            <p className="text-xs text-red-700 dark:text-red-300"><em>« Seule une disposition de loi de finances d\'initiative gouvernementale peut creer ou supprimer un programme. »</em> Un programme ne peut donc etre cree ni supprime par un simple arrete ministeriel ou une resolution parlementaire.</p>
          </div>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l1q1',
            question: 'Selon l\'Art. 43 LOFIP, qu\'est-ce qu\'un programme budgétaire ?',
            options: [
              { id: 'a', texte: 'Un tableau de repartition des crédits par nature de dépense' },
              { id: 'b', texte: 'Un regroupement de crédits pour une action coherente d\'un meme ministère, avec objectifs et indicateurs de performance' },
              { id: 'c', texte: 'Un document joint au projet de loi de finances expliquant les priorites' },
              { id: 'd', texte: 'Une ligne budgétaire autorisant une dépense specifique' },
            ],
            reponseCorrecte: 'b',
            explication: 'L\'Art. 43 al. 1 LOFIP definit le programme comme un regroupement de crédits pour « une action ou un ensemble coherent d\'actions relevant d\'un meme ministère ou institution » auquel sont associes des objectifs precis et des indicateurs de performance. Il ne s\'agit pas d\'une simple ligne de crédit mais d\'un outil de pilotage par la performance.',
            articleRef: 'Art. 43 LOFIP'
          },
          {
            type: 'qcm', id: 'l1q2',
            question: 'Qui peut creer ou supprimer un programme budgétaire selon l\'Art. 43 al. 3 LOFIP ?',
            options: [
              { id: 'a', texte: 'Le Ministre du Budget par arrete ministeriel' },
              { id: 'b', texte: 'Le Parlement par resolution' },
              { id: 'c', texte: 'Seule une loi de finances d\'initiative gouvernementale' },
              { id: 'd', texte: 'Le Premier ministre par ordonnance' },
            ],
            reponseCorrecte: 'c',
            explication: 'L\'Art. 43 al. 3 LOFIP est explicite : « Seule une disposition de loi de finances d\'initiative gouvernementale peut creer ou supprimer un programme. » Cette reserve garantit que la structure programmatique du budget releve du domaine de la loi de finances et ne peut pas etre modifiee par voie reglementaire.',
            articleRef: 'Art. 43 LOFIP'
          },
        ]} />
      </div>
    )
  },
  {
    id: 'l2',
    icone: <Layers className="h-5 w-5" />,
    titre: 'Architecture de la performance : fonctions, programmes, actions',
    soustitre: 'LOFIP Art. 43-44 - Hierarchie et regroupements budgétaires',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 p-4">
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-3">La hierarchie budgétaire selon la LOFIP</h3>
          <p className="text-xs text-foreground leading-relaxed">
            La LOFIP organise les crédits du budget-programme selon une architecture a plusieurs niveaux, chacun ayant une fonction precise dans le pilotage de la performance publique.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-4 w-4 text-emerald-600" /> Schema hierarchique (Art. 43-44 LOFIP)
          </h3>

          <div className="space-y-2">
            {[
              {
                niveau: 'FONCTION', art: 'Art. 44', couleur: 'bg-violet-600', bg: 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800',
                texte: 'Art. 44 al. 1 : « Les programmes peuvent etre regroupes en fonctions. Les fonctions peuvent etre institutionnelles, ministerielles ou interministerielles. »',
                explication: 'La fonction est le niveau le plus eleve. Elle regroupe plusieurs programmes concourant a une meme politique publique (ex : la fonction "Education" regroupe les programmes Enseignement primaire, Enseignement secondaire, Enseignement superieur). Une fonction peut etre portee par un seul ministère (ministerielle) ou par plusieurs (interministerielle).',
                tooltip: 'La fonction est une categorie transversale qui regroupe des programmes concourant a une meme politique publique. Ex : Sante, Education, Infrastructure, Defense. Elle permet une vision consolidee d\'un secteur au-dela des structures ministerielles.',
                loi: 'Art. 44 LOFIP'
              },
              {
                niveau: 'PROGRAMME', art: 'Art. 43', couleur: 'bg-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
                texte: 'Art. 43 al. 1 : « Un programme regroupe les crédits destines a mettre en oeuvre une action ou un ensemble coherent d\'actions relevant d\'un meme ministère ou institution. »',
                explication: 'Le programme est l\'unite fondamentale du budget-programme. Il est rattache a un ministère, dote de crédits limitatifs, et confie a un responsable de programme (RAMO). Chaque programme est associe a des objectifs et des indicateurs de performance presentes dans le PAP.',
                tooltip: 'Le programme est l\'unite centrale du budget-programme (Art. 43). Il est necessairement rattache a un seul ministère. Les crédits d\'un programme sont limitatifs. Le responsable du programme (RAMO) engage sa responsabilite sur les résultats obtenus.',
                loi: 'Art. 43 LOFIP'
              },
              {
                niveau: 'ACTION', art: 'Art. 43', couleur: 'bg-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800',
                texte: 'Art. 43 : Les actions constituent les composantes d\'un programme. Elles decomposent le programme en activités concretes et mesurables.',
                explication: 'L\'action est la composante operationnelle du programme. Elle correspond a un sous-ensemble homogene d\'activités du programme. Ex : dans le programme "Sante de base", les actions pourraient etre : Vaccination, Sante maternelle, Lutte contre le paludisme. Les actions ne sont pas des unites de crédits : les crédits restent au niveau du programme.',
                tooltip: 'L\'action est la composante d\'un programme. Elle permet de decomposer le programme en activités specifiques et d\'en mesurer les résultats separement. Les actions n\'ont pas de crédits propres : les crédits sont gérés au niveau du programme.',
                loi: 'Art. 43 LOFIP'
              },
              {
                niveau: 'OBJECTIFS + INDICATEURS', art: 'Art. 43', couleur: 'bg-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
                texte: 'Art. 43 : Les résultats attendus « faisant l\'objet d\'une evaluation au moyen d\'indicateurs de performance ».',
                explication: 'A chaque programme (et donc a chaque action) sont associes des objectifs precis et des indicateurs de performance. Les indicateurs mesurent l\'efficacite (résultats obtenus vs objectifs), l\'efficience (résultats obtenus vs ressources utilisees) et la qualite de service (satisfaction des usagers). Ces indicateurs sont presentes dans le PAP et evalues dans le RAP.',
                tooltip: 'Les indicateurs de performance mesurent les résultats du programme sur trois dimensions : efficacite (objectifs atteints), efficience (rapport cout/résultat) et qualite de service. Ils constituent l\'outil de reddition de comptes du responsable de programme.',
                loi: 'Art. 43 LOFIP'
              },
            ].map((n, i) => (
              <div key={n.niveau} className={cn('rounded-xl border p-3 ml-' + (i * 3), n.bg)}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn('text-xs font-bold text-white rounded-full px-2 py-0.5', n.couleur)}>{n.niveau}</span>
                  <span className="text-xs text-muted-foreground">{n.art}</span>
                  <InfoTooltip texte={n.tooltip} loi={n.loi} />
                </div>
                <p className="text-xs text-foreground italic mb-1">{n.texte}</p>
                <p className="text-xs text-muted-foreground">{n.explication}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">Les fonctions interministerielles (Art. 44 al. 2)</h3>
          <p className="text-xs text-foreground leading-relaxed mb-3">
            L\'Art. 44 al. 2 dispose : <em>« La presentation des programmes sous forme d\'une fonction interministerielle entraine une coordination dans l\'exécution des programmes et une presentation conjointe de l\'exécution et des résultats dans la loi portant reddition des comptes du budget du pouvoir central. »</em>
          </p>
          <p className="text-xs text-foreground leading-relaxed mb-3">
            Concretement, quand plusieurs ministères contribuent a une meme politique publique (ex : lutte contre la pauvrete impliquant les ministères des Affaires sociales, de la Sante, de l\'Agriculture), leurs programmes respectifs peuvent etre regroupes sous une fonction interministerielle commune. Cela impose :
          </p>
          <ul className="space-y-1 ml-3 text-xs text-foreground">
            <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500 mt-0.5" /><span>Une coordination dans l\'exécution des programmes entre ministères</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500 mt-0.5" /><span>Une presentation conjointe des résultats dans la loi de reddition des comptes</span></li>
          </ul>
        </div>

        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">Exemple concret : Ministere de la Sante (RDC)</h3>
          <div className="font-mono text-xs space-y-0.5 bg-muted/50 rounded-lg p-3">
            <p className="text-violet-600 dark:text-violet-400 font-bold">FONCTION : Sante (interministerielle avec Finances pour budget sante)</p>
            <p className="ml-4 text-emerald-600 dark:text-emerald-400 font-bold">PROGRAMME 1 : Sante de base</p>
            <p className="ml-8 text-cyan-600 dark:text-cyan-400">ACTION 1.1 : Vaccination nationale</p>
            <p className="ml-8 text-cyan-600 dark:text-cyan-400">ACTION 1.2 : Sante maternelle et infantile</p>
            <p className="ml-8 text-cyan-600 dark:text-cyan-400">ACTION 1.3 : Lutte contre le paludisme</p>
            <p className="ml-4 text-emerald-600 dark:text-emerald-400 font-bold">PROGRAMME 2 : Hopitaux généraux de reference</p>
            <p className="ml-8 text-cyan-600 dark:text-cyan-400">ACTION 2.1 : Equipements hospitaliers</p>
            <p className="ml-8 text-cyan-600 dark:text-cyan-400">ACTION 2.2 : Formation du personnel soignant</p>
            <p className="ml-4 text-emerald-600 dark:text-emerald-400 font-bold">PROGRAMME 3 : Administration générale</p>
            <p className="ml-8 text-muted-foreground">Credits non affectes aux autres programmes (Art. 43 al. 2)</p>
          </div>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l2q1',
            question: 'Selon l\'Art. 44 LOFIP, une fonction peut etre :',
            options: [
              { id: 'a', texte: 'Uniquement ministerielle (rattachee a un seul ministère)' },
              { id: 'b', texte: 'Institutionnelle, ministerielle ou interministerielle' },
              { id: 'c', texte: 'Uniquement interministerielle (plusieurs ministères obligatoires)' },
              { id: 'd', texte: 'Definie librement par le responsable de programme' },
            ],
            reponseCorrecte: 'b',
            explication: 'L\'Art. 44 al. 1 LOFIP dispose : « Les fonctions peuvent etre institutionnelles, ministerielles ou interministerielles. » Il existe donc trois types de fonctions selon l\'etendue de la politique publique couverte : institutionnelle (une institution), ministerielle (un ministère), ou interministerielle (plusieurs ministères).',
            articleRef: 'Art. 44 LOFIP'
          },
          {
            type: 'qcm', id: 'l2q2',
            question: 'Le programme "Administration générale" prevu a l\'Art. 43 al. 2 LOFIP est destine a recevoir :',
            options: [
              { id: 'a', texte: 'Les crédits de fonctionnement courant du ministère' },
              { id: 'b', texte: 'Les crédits non specifiquement affectes a un autre programme' },
              { id: 'c', texte: 'Les crédits de personnel uniquement' },
              { id: 'd', texte: 'Les crédits d\'investissement non programmes' },
            ],
            reponseCorrecte: 'b',
            explication: 'L\'Art. 43 al. 2 LOFIP dispose que chaque ministère « peut creer un programme intitule administration générale destine a recevoir les crédits non specifiquement affectes a un autre programme ». Ce programme "fourre-tout" evite que des crédits restent sans rattachement programmatique.',
            articleRef: 'Art. 43 LOFIP'
          },
        ]} />
      </div>
    )
  },
  {
    id: 'l3',
    icone: <BarChart2 className="h-5 w-5" />,
    titre: 'La fongibilite des crédits (Art. 45) et les mouvements de crédits',
    soustitre: 'LOFIP Art. 45-51 - Flexibilite dans la gestion des programmes',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 p-4">
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2">Art. 45 LOFIP : La fongibilite</h3>
          <p className="text-xs text-foreground leading-relaxed italic mb-2">
            « Les crédits ouverts au sein d\'un programme sont fongibles a l\'interieur du titre et de la source de financement. Toutefois, les mouvements y relatifs font l\'objet d\'un suivi conformement aux procédures fixees par le ministre ayant le budget dans ses attributions. »
          </p>
          <p className="text-xs text-foreground leading-relaxed">
            La <strong>fongibilite</strong> signifie que le responsable d\'un programme peut, au sein d\'un meme titre et d\'une meme source de financement, reallouer librement les crédits entre les differentes actions du programme, sans avoir a obtenir d\'autorisation exterieure. C\'est un outil de flexibilite manageriale au service de la performance.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-emerald-600" /> Fongibilite : ce qui est permis et ce qui est interdit
            <InfoTooltip texte="La fongibilite (Art. 45) est limitee : elle s\'exerce a l\'interieur d\'un titre et d\'une source de financement. On ne peut pas transferer des crédits du Titre III (Personnel) vers d\'autres titres (Art. 51). La fongibilite asymetrique signifie qu\'on peut utiliser des crédits de personnel pour du fonctionnement, mais jamais l\'inverse." loi="Art. 45, 51 LOFIP" />
          </h3>

          <div className="space-y-2">
            <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3">
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-200 mb-1">CE QUI EST PERMIS (Art. 45)</p>
              <ul className="space-y-1 text-xs text-emerald-700 dark:text-emerald-300">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-500" /><span>Reallouer des crédits entre actions d\'un meme programme, a l\'interieur d\'un meme titre</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-500" /><span>Ajuster les dotations des actions en cours d\'année selon les besoins reels</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-500" /><span>Faire des virements entre titres d\'un meme programme par arrete ministeriel (Art. 47)</span></li>
              </ul>
            </div>
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
              <p className="text-xs font-bold text-red-800 dark:text-red-200 mb-1">CE QUI EST INTERDIT (Art. 51)</p>
              <ul className="space-y-1 text-xs text-red-700 dark:text-red-300">
                <li className="flex items-start gap-2"><XCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-red-500" /><span>Tout virement ou transfert au profit du Titre III (Personnel) a partir d\'un autre titre</span></li>
                <li className="flex items-start gap-2"><XCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-red-500" /><span>Creer des emplois nouveaux sans autorisation par loi de finances</span></li>
                <li className="flex items-start gap-2"><XCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-red-500" /><span>Depasser le plafond d\'autorisation des emplois remuneres (Art. 51 al. 3)</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">Virements et transferts de crédits (Art. 46-50)</h3>
          <div className="space-y-2">
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs font-bold text-foreground mb-1">Virements (Art. 47) — entre titres d\'un meme programme</p>
              <p className="text-xs text-foreground">Operes entre les titres des dépenses d\'un meme programme, par <strong>arrete du ministre ayant le budget dans ses attributions</strong>, sur proposition du ministre ou responsable d\'institution concerne. Ex : virer des crédits du Titre IV (Biens) vers le Titre V (Prestations) au sein du meme programme.</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs font-bold text-foreground mb-1">Transferts (Art. 48) — entre programmes d\'un meme ministère</p>
              <p className="text-xs text-foreground">Operees entre programmes d\'un meme ministère, pour les titres de meme nature. Autorises par <strong>décret du Premier ministre</strong> delibere en Conseil des ministres. Font l\'objet de propositions d\'ouverture en LFR. Ex : transferer des crédits du programme Sante de base vers Hopitaux généraux.</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs font-bold text-foreground mb-1">Transferts (Art. 49) — entre programmes de ministères differents</p>
              <p className="text-xs text-foreground">Operees entre programmes de differents ministères. Interviennent par <strong>décret du Premier ministre apres avis prealable du Ministre du Budget</strong>, sur proposition des ministres concernes. Font l\'objet de propositions en LFR. Ex : transferer des crédits du Ministere de la Sante vers le Ministere de l\'Education pour un programme commun.</p>
            </div>
          </div>
          <div className="mt-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3">
            <p className="text-xs font-bold text-amber-800 dark:text-amber-200 mb-1 flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5" /> Art. 50 LOFIP</p>
            <p className="text-xs text-amber-700 dark:text-amber-300"><em>« Aucun virement ni transfert ne peut etre effectue au profit d\'un programme non prevu par une loi de finances. »</em> Il est impossible de creer un nouveau programme par voie de virement ou de transfert.</p>
          </div>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l3q1',
            question: 'L\'Art. 51 LOFIP interdit absolument :',
            options: [
              { id: 'a', texte: 'Tout virement entre actions d\'un meme programme' },
              { id: 'b', texte: 'Tout virement ou transfert AU PROFIT du titre des dépenses de personnel (Titre III) a partir d\'un autre titre' },
              { id: 'c', texte: 'Tout transfert entre ministères differents' },
              { id: 'd', texte: 'Tout report de crédits de paiement non consommes' },
            ],
            reponseCorrecte: 'b',
            explication: 'L\'Art. 51 al. 4 LOFIP dispose : « Aucun virement ni transfert ne peut etre effectue au profit du titre des dépenses de personnel a partir d\'un autre titre. » Cette interdiction absolue protege l\'enveloppe salariale contre des abondements non autorises. En revanche, des virements peuvent sortir du titre Personnel vers d\'autres titres (fongibilite asymetrique).',
            articleRef: 'Art. 51 LOFIP'
          },
          {
            type: 'qcm', id: 'l3q2',
            question: 'Un transfert de crédits entre programmes de deux ministères differents (Art. 49 LOFIP) est autorise par :',
            options: [
              { id: 'a', texte: 'Arrete du Ministre du Budget' },
              { id: 'b', texte: 'Ordonnance du President de la Republique' },
              { id: 'c', texte: 'Resolution du Parlement' },
              { id: 'd', texte: 'Decret du Premier ministre apres avis du Ministre du Budget' },
            ],
            reponseCorrecte: 'd',
            explication: 'L\'Art. 49 LOFIP dispose que les transferts entre programmes de differents ministères « interviennent par décret du Premier ministre apres avis prealable du ministre ayant le budget dans ses attributions et sur proposition des ministres ou responsables d\'institutions concernes ». Le niveau de décision est plus eleve (décret PM) que pour les virements intra-programme (arrete ministeriel).',
            articleRef: 'Art. 49 LOFIP'
          },
        ]} />
      </div>
    )
  },
  {
    id: 'l4',
    icone: <FileText className="h-5 w-5" />,
    titre: 'Le Projet Annuel de Performance (PAP) et le RAP',
    soustitre: 'LOFIP Art. 79 pt. 6 - Instruments de la gestion par la performance',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 p-4">
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2">Fondement legal : Art. 79 LOFIP</h3>
          <p className="text-xs text-foreground leading-relaxed">
            L\'Art. 79 LOFIP enumere les documents qui accompagnent le projet de loi de finances. Le PAP figure parmi ces documents obligatoires. L\'Art. 79 pt. 5 cite dans l\'annexe explicative : « le developpement par titre de l\'estimation des crédits » et « l\'état recapitulatif des crédits a reporter ». Le PAP est le document de mise en oeuvre de la gestion par la performance.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-emerald-600" /> Le Projet Annuel de Performance (PAP){' '}
            <InfoTooltip texte="Le PAP est le document de performance joint au projet de loi de finances. Il présenté pour chaque programme : la strategie, les objectifs, les indicateurs de performance, les moyens alloues et les résultats attendus. Il engage le responsable de programme devant le Parlement." loi="Art. 79 LOFIP" />
          </h3>
          <p className="text-xs text-foreground leading-relaxed mb-3">
            Le Projet Annuel de Performance accompagne obligatoirement le projet de loi de finances. Il est produit par chaque ministère pour chacun de ses programmes. Il constitue le contrat de performance entre le responsable de programme et le Parlement.
          </p>

          <div className="space-y-2">
            <p className="text-xs font-bold text-foreground">Contenu du PAP pour chaque programme :</p>
            {[
              { num: '1', label: 'La strategie du programme', desc: 'La justification des choix strategiques, les priorites retenues, le contexte sectoriel et les enjeux.' },
              { num: '2', label: 'Les objectifs et indicateurs', desc: 'Les objectifs precis (max 3 par programme selon les bonnes pratiques), les indicateurs de performance chiffres et les cibles pour l\'année et a moyen terme.' },
              { num: '3', label: 'Les moyens alloues', desc: 'Le detail des crédits par titre et par action, les autorisations d\'engagement et les crédits de paiement, les plafonds d\'emplois.' },
              { num: '4', label: 'Les résultats attendus', desc: 'Les valeurs cibles des indicateurs pour l\'année N, les résultats de l\'année N-1 et les prévisions pour N+1 et N+2.' },
            ].map(e => (
              <div key={e.num} className="flex gap-3 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-900/10 p-3">
                <span className="text-xs font-bold text-white bg-emerald-600 rounded-full h-5 w-5 flex items-center justify-center shrink-0 mt-0.5">{e.num}</span>
                <div>
                  <p className="text-xs font-bold text-foreground">{e.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" /> Le Rapport Annuel de Performance (RAP){' '}
            <InfoTooltip texte="Le RAP est le pendant du PAP. Il est joint a la loi portant reddition des comptes. Il rend compte des résultats obtenus par chaque programme en comparant les realisations aux objectifs fixes dans le PAP. C\'est l\'outil de la reddition de comptes sur la performance." loi="Art. 79 LOFIP" />
          </h3>
          <p className="text-xs text-foreground leading-relaxed mb-3">
            Le Rapport Annuel de Performance (RAP) est le document de bilan joint a la <strong>loi portant reddition des comptes</strong>. Il analyse programme par programme les résultats obtenus et les compare aux objectifs fixes dans le PAP de l\'année concernee.
          </p>

          <div className="rounded-lg border border-border bg-muted/30 p-3 mb-3">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-emerald-600 text-white">
                  <th className="border border-emerald-400 px-2 py-1.5 text-left">Critere</th>
                  <th className="border border-emerald-400 px-2 py-1.5 text-center">PAP</th>
                  <th className="border border-emerald-400 px-2 py-1.5 text-center">RAP</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Nature', 'Previsionnel (engage)', 'Realisations (constate)'],
                  ['Document joint a', 'Projet de loi de finances', 'Loi portant reddition des comptes'],
                  ['Moment', 'En debut d\'exercice (octobre N-1)', 'Apres clôture de l\'exercice (N+1)'],
                  ['Objectif', 'Fixer les cibles de performance', 'Mesurer l\'atteinte des cibles'],
                  ['Responsabilite', 'Engagement du RAMO', 'Reddition de comptes du RAMO'],
                ].map(([c, p, r]) => (
                  <tr key={c} className="even:bg-muted/30">
                    <td className="border border-border px-2 py-1.5 font-medium">{c}</td>
                    <td className="border border-border px-2 py-1.5 text-center text-emerald-700 dark:text-emerald-300">{p}</td>
                    <td className="border border-border px-2 py-1.5 text-center text-blue-700 dark:text-blue-300">{r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">Autres documents annexes (Art. 79 LOFIP)</h3>
          <p className="text-xs text-foreground mb-3">L\'Art. 79 LOFIP liste l\'ensemble des documents obligatoirement joints au projet de loi de finances :</p>
          <div className="space-y-2">
            {[
              { num: '1', label: 'Expose général', desc: 'Synthese du budget, objectifs de politique economique, contexte international et national, perspectives CBMT, exécution du budget en cours.' },
              { num: '2', label: 'Rapport d\'evaluation de l\'exécution du budget precedent', desc: 'Conditions d\'exécution du budget de l\'exercice anterieur et analyse des ecarts avec le CDMT precedent.' },
              { num: '3', label: 'Rapport d\'exécution du budget en cours au 1er semestre', desc: 'Point d\'avancement de l\'exécution budgétaire a la date du dépôt du PLF.' },
              { num: '4', label: 'Projet de loi de reddition des comptes du dernier exercice clos', desc: 'Si non encore depose, ou le rapport de la Cour des comptes.' },
              { num: '5', label: 'Annexe explicative', desc: 'Analyse des prévisions de recettes, detail des crédits par titre, état des reports, encours de la dette, restes a payer et restes a recouvrer.' },
            ].map(e => (
              <div key={e.num} className="flex gap-3 rounded-lg border border-border p-2.5">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 w-4 shrink-0">({e.num})</span>
                <div>
                  <p className="text-xs font-bold text-foreground">{e.label}</p>
                  <p className="text-xs text-muted-foreground">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l4q1',
            question: 'Le Rapport Annuel de Performance (RAP) est joint a :',
            options: [
              { id: 'a', texte: 'Le projet de loi de finances de l\'année suivante' },
              { id: 'b', texte: 'La loi portant reddition des comptes' },
              { id: 'c', texte: 'Le rapport semestriel d\'exécution budgétaire' },
              { id: 'd', texte: 'La loi de finances rectificative' },
            ],
            reponseCorrecte: 'b',
            explication: 'Le RAP est joint a la loi portant reddition des comptes (loi de reglement). Il rend compte des résultats obtenus par chaque programme de l\'année ecoulee et les compare aux objectifs du PAP. Le PAP, lui, accompagne le projet de loi de finances (PLF) en debut d\'exercice.',
            articleRef: 'Art. 79 LOFIP'
          },
          {
            type: 'qcm', id: 'l4q2',
            question: 'Selon l\'Art. 79 LOFIP, lequel des documents suivants N\'est PAS joint au projet de loi de finances ?',
            options: [
              { id: 'a', texte: 'L\'expose général synthetisant le budget et la politique economique' },
              { id: 'b', texte: 'Le rapport d\'exécution du budget du 1er semestre de l\'année en cours' },
              { id: 'c', texte: 'Le bilan patrimonial de l\'Etat certifie par la Cour des comptes' },
              { id: 'd', texte: 'L\'annexe explicative avec l\'analyse des recettes et le detail des crédits' },
            ],
            reponseCorrecte: 'c',
            explication: 'L\'Art. 79 LOFIP liste 5 categories de documents annexes au PLF : expose général, rapport d\'evaluation exécution precedente, rapport exécution 1er semestre, projet loi reddition des comptes, et annexe explicative. Le « bilan patrimonial certifie par la Cour des comptes » n\'y figure pas — il n\'existe pas sous cette forme dans la LOFIP.',
            articleRef: 'Art. 79 LOFIP'
          },
        ]} />
      </div>
    )
  },
  {
    id: 'l5',
    icone: <TrendingUp className="h-5 w-5" />,
    titre: 'Etat d\'avancement de la reforme budget-programme en RDC',
    soustitre: 'LOFIP Art. 43-45 · Actualite 2024-2026 · Rapport UNIS 2025',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 p-4">
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2">Le calendrier prevu et les prorogations</h3>
          <p className="text-xs text-foreground leading-relaxed mb-3">
            La LOFIP de 2011 prevoyait le basculement vers le budget-programme au <strong>1er janvier 2019</strong> (Art. 215 LOFIP, dispositions transitoires). Ce delai a ete proroге a deux reprises :
          </p>
          <div className="space-y-2">
            {[
              { année: '2011', label: 'Adoption LOFIP', desc: 'La loi prevoit le basculement au budget-programme au 1er janvier 2019 (8 ans de transition).', couleur: 'bg-emerald-600' },
              { année: '2018', label: 'Loi 18/010 : 1ere prorogation', desc: 'Le Parlement vote une prorogation de 5 ans. Nouveau delai : 1er janvier 2024.', couleur: 'bg-amber-500' },
              { année: '2023', label: '2eme prorogation : + 5 ans', desc: 'Nouveau projet de loi modificatif pour une prorogation supplementaire de 5 ans. Nouveau delai cible : 1er janvier 2029.', couleur: 'bg-orange-500' },
              { année: '2024-2026', label: 'Experimentation en cours', desc: 'Deconcentration de l\'ordonnancement en experimentation. Conferences budgétaires 2026 integrent la logique de programme.', couleur: 'bg-blue-500' },
            ].map(e => (
              <div key={e.année} className="flex gap-3 items-start">
                <span className={cn('text-xs font-bold text-white rounded-lg px-2 py-1 shrink-0 text-center min-w-12', e.couleur)}>{e.année}</span>
                <div className="flex-1 rounded-lg border border-border p-2.5">
                  <p className="text-xs font-bold text-foreground">{e.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">Realisations constatees a ce jour</h3>
          <div className="space-y-2">
            {[
              { ok: true, titre: 'Decoupage des ministères en programmes budgétaires', desc: 'Les 39 ministères de l\'Etat ont ete decoupes en programmes. Chaque ministère dispose d\'un repertoire de programmes identifie.' },
              { ok: true, titre: 'Production des Projets Annuels de Performance (PAP)', desc: 'Les ministères produisent des PAP joints au PLF depuis plusieurs exercices, meme si leur qualite est encore perfectible.' },
              { ok: true, titre: 'Formation des acteurs de la chaine manageriale', desc: 'Des formations ont ete dispensees aux responsables de programmes (RAMO) et aux ordonnateurs delegues (partiellement). L\'ENA RDC a anime des sessions en juin 2024.' },
              { ok: true, titre: 'Deconcentration de l\'ordonnancement (experimentation 2024)', desc: 'L\'experience de deconcentration de l\'ordonnancement permet aux ministères d\'engager directement certaines dépenses sans passer par le Ministere du Budget en phase pilote.' },
              { ok: false, titre: 'Execution des crédits d\'investissement', desc: 'Seulement 4% des crédits d\'investissement executes a fin mars 2025 (ODEP). La logique de programme n\'a pas encore amélioré l\'exécution des dépenses en capital.' },
              { ok: false, titre: 'Systeme intègre de gestion des finances publiques (SIGFIP)', desc: 'L\'informatisation complete de la chaine de la dépense publique reste incomplète. Le SIGFIP couvre imparfaitement toutes les administrations.' },
            ].map(e => (
              <div key={e.titre} className={cn('flex gap-3 rounded-lg border p-3', e.ok ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10' : 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10')}>
                {e.ok
                  ? <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-green-500" />
                  : <XCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />}
                <div>
                  <p className="text-xs font-bold text-foreground">{e.titre}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10 p-4">
          <h3 className="text-sm font-bold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" /> Rapport UNIS - fevrier 2025 : les defis persistants
          </h3>
          <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed mb-2">
            Un rapport de l\'organisation UNIS (fevrier 2025) souligne que <strong>80% des ressources budgétaires devraient etre orientees vers des projets d\'intérêt public</strong>, mais l\'exécution reste faible. Les principaux defis identifies sont :
          </p>
          <ul className="space-y-1 text-xs text-amber-700 dark:text-amber-300">
            <li className="flex items-start gap-2"><ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5" /><span><strong>Faible taux d\'exécution global :</strong> 17,1% a fin mars 2025 pour le budget général</span></li>
            <li className="flex items-start gap-2"><ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5" /><span><strong>Sous-exécution de l\'investissement :</strong> 4% seulement des crédits d\'investissement (Titres VII et VIII)</span></li>
            <li className="flex items-start gap-2"><ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5" /><span><strong>Culture du résultat insuffisante :</strong> les gestionnaires publics ne sont pas encore formes a la logique de la performance et de l\'evaluation</span></li>
            <li className="flex items-start gap-2"><ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5" /><span><strong>Horizon 2028 pour le budget-programme :</strong> les conferences budgétaires de juillet 2025 (pour le budget 2026) ont confirme l\'objectif de finalisation de la transition</span></li>
          </ul>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l5q1',
            question: 'La LOFIP de 2011 prevoyait initialement le basculement vers le budget-programme a quelle date ?',
            options: [
              { id: 'a', texte: '1er janvier 2015' },
              { id: 'b', texte: '1er janvier 2019' },
              { id: 'c', texte: '1er janvier 2024' },
              { id: 'd', texte: '1er janvier 2029' },
            ],
            reponseCorrecte: 'b',
            explication: 'La LOFIP de 2011 prevoyait dans ses dispositions transitoires le basculement vers le budget-programme au 1er janvier 2019 (8 ans de transition). Ce delai a ete proroге en 2018 par la loi 18/010 de 5 ans supplementaires (nouveau delai : janvier 2024), puis proroге a nouveau en 2023 pour 5 ans (cible : janvier 2029).',
            articleRef: 'Art. 215 LOFIP (dispositions transitoires)'
          },
          {
            type: 'qcm', id: 'l5q2',
            question: 'Quel est le taux d\'exécution des dépenses d\'investissement enregistre a fin mars 2025 selon le rapport ODEP ?',
            options: [
              { id: 'a', texte: '17,1%' },
              { id: 'b', texte: '10%' },
              { id: 'c', texte: '4%' },
              { id: 'd', texte: '25%' },
            ],
            reponseCorrecte: 'c',
            explication: 'Selon le rapport d\'exécution budgétaire de l\'Observatoire de la Depense Publique (ODEP, mars 2025), le taux d\'exécution global est de 17,1% mais les dépenses d\'investissement (Titres VII et VIII) n\'ont exécuté que 4% des crédits votes. Ce faible taux illustre le defi persistant de la sous-exécution des investissements publics en RDC, en contradiction avec la logique de performance que le budget-programme devrait induire.',
            articleRef: 'Rapport ODEP mars 2025'
          },
        ]} />
      </div>
    )
  },
]

// ─── QCM GLOBAL 15 QUESTIONS ─────────────────────────────────────────────────
const QCM_GLOBAL: QCMQuestion[] = [
  // FACILE (Q1-Q5)
  {
    type: 'qcm', id: 'g1',
    question: 'Le budget-programme introduit par la LOFIP repose sur quelle logique centrale ?',
    options: [
      { id: 'a', texte: 'La maitrise des moyens alloues' },
      { id: 'b', texte: 'La gestion par les objectifs et la performance' },
      { id: 'c', texte: 'La reduction des dépenses publiques' },
      { id: 'd', texte: 'Le contrôle a priori de toutes les dépenses' },
    ],
    reponseCorrecte: 'b',
    explication: 'La rupture fondamentale introduite par la LOFIP est le passage du budget de moyens (combien dépense-t-on ?) au budget-programme (quels résultats obtient-on ?). Les crédits sont regroupes en programmes associes a des objectifs precis et des indicateurs de performance (Art. 43). La question centrale devient : l\'argent public produit-il les effets attendus pour l\'intérêt général ?',
    articleRef: 'Art. 43 LOFIP'
  },
  {
    type: 'qcm', id: 'g2',
    question: 'Selon l\'Art. 43 LOFIP, les résultats d\'un programme sont evalues par :',
    options: [
      { id: 'a', texte: 'La Cour des comptes uniquement' },
      { id: 'b', texte: 'Le Parlement lors du vote du budget' },
      { id: 'c', texte: 'Des indicateurs de performance' },
      { id: 'd', texte: 'Le Ministre du Budget par inspection' },
    ],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 43 al. 1 LOFIP dispose que les résultats attendus font l\'objet « d\'une evaluation au moyen d\'indicateurs de performance ». Ces indicateurs mesurent l\'efficacite (objectifs atteints), l\'efficience (rapport cout/résultat) et la qualite de service. Ils figurent dans le PAP et sont evalues dans le RAP.',
    articleRef: 'Art. 43 LOFIP'
  },
  {
    type: 'qcm', id: 'g3',
    question: 'Selon l\'Art. 44 LOFIP, les programmes peuvent etre regroupes en :',
    options: [
      { id: 'a', texte: 'Chapitres' },
      { id: 'b', texte: 'Fonctions' },
      { id: 'c', texte: 'Titres' },
      { id: 'd', texte: 'Sections' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 44 al. 1 LOFIP dispose : « Les programmes peuvent etre regroupes en fonctions. Les fonctions peuvent etre institutionnelles, ministerielles ou interministerielles. » La fonction est le niveau de regroupement superieur au programme dans la hierarchie du budget-programme.',
    articleRef: 'Art. 44 LOFIP'
  },
  {
    type: 'qcm', id: 'g4',
    question: 'Le Projet Annuel de Performance (PAP) est joint a :',
    options: [
      { id: 'a', texte: 'La loi portant reddition des comptes' },
      { id: 'b', texte: 'La loi de finances rectificative' },
      { id: 'c', texte: 'Le projet de loi de finances de l\'année' },
      { id: 'd', texte: 'L\'arrete de repartition des crédits' },
    ],
    reponseCorrecte: 'c',
    explication: 'Le PAP est le document previsionnel de performance joint au projet de loi de finances (PLF). Il présenté pour chaque programme la strategie, les objectifs, les indicateurs et les cibles de performance. Son pendant, le Rapport Annuel de Performance (RAP), est joint a la loi portant reddition des comptes apres clôture de l\'exercice.',
    articleRef: 'Art. 79 LOFIP'
  },
  {
    type: 'qcm', id: 'g5',
    question: 'La LOFIP prevoyait initialement combien d\'années de transition avant le basculement complet vers le budget-programme ?',
    options: [
      { id: 'a', texte: '3 ans' },
      { id: 'b', texte: '5 ans' },
      { id: 'c', texte: '8 ans' },
      { id: 'd', texte: '10 ans' },
    ],
    reponseCorrecte: 'c',
    explication: 'Adoptee en juillet 2011, la LOFIP prevoyait le basculement vers le budget-programme au 1er janvier 2019, soit une periode de transition de 8 ans. Ce delai ambitieux s\'est revele insuffisant, conduisant a deux prorogations successives (2018 : +5 ans, 2023 : +5 ans supplementaires).',
    articleRef: 'Art. 215 LOFIP'
  },
  // MOYEN (Q6-Q10)
  {
    type: 'qcm', id: 'g6',
    question: 'L\'Art. 45 LOFIP dispose que les crédits d\'un programme sont fongibles :',
    options: [
      { id: 'a', texte: 'Entre tous les programmes du meme ministère sans restriction' },
      { id: 'b', texte: 'A l\'interieur du titre et de la source de financement du programme' },
      { id: 'c', texte: 'Entre tous les titres du programme sauf le Titre III (Personnel)' },
      { id: 'd', texte: 'Uniquement entre les Titres IV, V et VI' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 45 LOFIP dispose : « Les crédits ouverts au sein d\'un programme sont fongibles a l\'interieur du titre et de la source de financement. » La fongibilite est donc limitee : elle s\'exerce au sein du meme titre et de la meme source de financement. On ne peut pas utiliser la fongibilite pour franchir les barrieres entre titres ou entre sources de financement differentes.',
    articleRef: 'Art. 45 LOFIP'
  },
  {
    type: 'qcm', id: 'g7',
    question: 'Selon l\'Art. 47 LOFIP, un virement de crédits entre titres d\'un meme programme est autorise par :',
    options: [
      { id: 'a', texte: 'Decret du Premier ministre' },
      { id: 'b', texte: 'Ordonnance du President de la Republique' },
      { id: 'c', texte: 'Arrete du ministre ayant le budget dans ses attributions' },
      { id: 'd', texte: 'Resolution du Parlement' },
    ],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 47 LOFIP dispose : « des virements de crédits peuvent etre operes entre les titres des dépenses, par source de financement d\'un meme programme par voie d\'arrete du ministre ayant le budget dans ses attributions sur proposition du ministre ou responsable d\'institution concerne. » Il s\'agit donc d\'un arrete ministeriel (niveau le plus bas) pour les virements intra-programme.',
    articleRef: 'Art. 47 LOFIP'
  },
  {
    type: 'qcm', id: 'g8',
    question: 'Selon l\'Art. 50 LOFIP, aucun virement ni transfert ne peut etre effectue :',
    options: [
      { id: 'a', texte: 'Entre le Titre I (Dette) et le Titre III (Personnel)' },
      { id: 'b', texte: 'Au profit d\'un programme non prevu par une loi de finances' },
      { id: 'c', texte: 'Entre programmes de ministères differents sans décret PM' },
      { id: 'd', texte: 'En cours du deuxieme semestre de l\'exercice' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 50 LOFIP dispose : « Aucun virement ni transfert ne peut etre effectue au profit d\'un programme non prevu par une loi de finances. » Cette règle empeche de creer de facto un nouveau programme par la voie de virements ou transferts budgétaires. La creation d\'un programme releve exclusivement de la loi de finances (Art. 43 al. 3).',
    articleRef: 'Art. 50 LOFIP'
  },
  {
    type: 'qcm', id: 'g9',
    question: 'Selon l\'Art. 53 LOFIP, les crédits de paiement non consommes en fin d\'exercice sur un programme sont :',
    options: [
      { id: 'a', texte: 'Automatiquement annules' },
      { id: 'b', texte: 'Reverses au budget général' },
      { id: 'c', texte: 'Reports sur l\'exercice suivant sur le meme programme et le meme titre' },
      { id: 'd', texte: 'Transferes au fonds de reserve' },
    ],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 53 LOFIP dispose : « Les autorisations d\'engagement pluriannuelles ainsi que les crédits de paiement non consommes a la fin de l\'exercice sur un programme et un titre determines sont reportes sur l\'exercice suivant sur le meme programme et le meme titre. » Les arretés de report interviennent au plus tard le 31 mars de l\'année suivante.',
    articleRef: 'Art. 53 LOFIP'
  },
  {
    type: 'qcm', id: 'g10',
    question: 'Selon l\'Art. 44 al. 2 LOFIP, la presentation d\'une fonction interministerielle entraine :',
    options: [
      { id: 'a', texte: 'La fusion des budgets des ministères concernes' },
      { id: 'b', texte: 'Une coordination dans l\'exécution des programmes et une presentation conjointe dans la loi de reddition des comptes' },
      { id: 'c', texte: 'La suppression des programmes ministeriels individuels' },
      { id: 'd', texte: 'Un transfert de l\'autorité budgétaire au Premier ministre' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 44 al. 2 LOFIP dispose : « La presentation des programmes sous forme d\'une fonction interministerielle entraine une coordination dans l\'exécution des programmes et une presentation conjointe de l\'exécution et des résultats dans la loi portant reddition des comptes. » Les ministères gardent leurs programmes propres mais coordonnent leur exécution et rendent compte ensemble.',
    articleRef: 'Art. 44 LOFIP'
  },
  // DIFFICILE (Q11-Q15)
  {
    type: 'qcm', id: 'g11',
    question: 'Un Ministre de la Sante souhaite renforcer les crédits de personnel (Titre III) de son programme en puisant dans les crédits de fonctionnement (Titre IV). Est-ce legal selon l\'Art. 51 LOFIP ?',
    options: [
      { id: 'a', texte: 'Oui, la fongibilite (Art. 45) le permet entre titres' },
      { id: 'b', texte: 'Oui, avec un arrete du Ministre du Budget (Art. 47)' },
      { id: 'c', texte: 'Non, l\'Art. 51 interdit tout virement ou transfert au profit du Titre III a partir d\'un autre titre' },
      { id: 'd', texte: 'Oui, si le Premier ministre l\'autorise par décret' },
    ],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 51 al. 4 LOFIP est categorique : « Aucun virement ni transfert ne peut etre effectue au profit du titre des dépenses de personnel a partir d\'un autre titre. » Cette interdiction absolue vaut quel que soit le niveau d\'autorité (arrete ministeriel, décret PM ou autre). Les crédits de personnel constituent un plafond infranchissable a la hausse par voie de virement. C\'est la règle de la fongibilite asymetrique.',
    articleRef: 'Art. 51 LOFIP'
  },
  {
    type: 'qcm', id: 'g12',
    question: 'Un Directeur du Budget propose de creer un nouveau programme "Numerique" par un arrete de virement depuis les crédits d\'un programme existant. Cette procédure est-elle legale ?',
    options: [
      { id: 'a', texte: 'Oui, si les crédits existent et que le Ministre du Budget signe' },
      { id: 'b', texte: 'Oui, par décret du Premier ministre en Conseil des ministres' },
      { id: 'c', texte: 'Non, l\'Art. 43 exige une loi de finances, et l\'Art. 50 interdit tout virement vers un programme non prevu par loi de finances' },
      { id: 'd', texte: 'Oui, si le programme est inscrit dans le Projet Annuel de Performance' },
    ],
    reponseCorrecte: 'c',
    explication: 'Deux dispositions LOFIP s\'opposent a cette procédure : (1) Art. 43 al. 3 : « Seule une disposition de loi de finances d\'initiative gouvernementale peut creer ou supprimer un programme. » Un arrete ou décret ne peut pas creer un programme. (2) Art. 50 : « Aucun virement ni transfert ne peut etre effectue au profit d\'un programme non prevu par une loi de finances. » Creer un programme par virement est doublement illegal.',
    articleRef: 'Art. 43 et 50 LOFIP'
  },
  {
    type: 'qcm', id: 'g13',
    question: 'Selon l\'Art. 52 LOFIP, les autorisations d\'engagement pluriannuelles relatives aux crédits d\'investissement peuvent etre revisees pour tenir compte :',
    options: [
      { id: 'a', texte: 'Des nouvelles priorites politiques du Gouvernement' },
      { id: 'b', texte: 'Des modifications techniques ou des variations de couts' },
      { id: 'c', texte: 'Du taux d\'inflation annuel officiel' },
      { id: 'd', texte: 'Des recommandations de la Cour des comptes' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 52 LOFIP dispose : « Les autorisations d\'engagement pluriannuelles relatives aux crédits d\'investissement peuvent etre revisees pour tenir compte des modifications techniques ou des variations de couts. » Ces deux motifs sont limitativement enumeres : modification technique (changement de specification d\'un projet) ou variation de cout (inflation des materiaux, evolution du marche).',
    articleRef: 'Art. 52 LOFIP'
  },
  {
    type: 'qcm', id: 'g14',
    question: 'Selon l\'Art. 54 LOFIP, le principe général est qu\'aucune recette ne peut etre affectee a une dépense particuliere. Quelles sont les exceptions expressement prevues ?',
    options: [
      { id: 'a', texte: 'Uniquement les recettes minieres et petrolieres' },
      { id: 'b', texte: 'Les budgets annexes, les comptes speciaux et les procédures comptables particulieres au sein du budget général' },
      { id: 'c', texte: 'Uniquement les recettes des entreprises publiques' },
      { id: 'd', texte: 'Les recettes des taxes affectees aux provinces' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 54 LOFIP dispose : « Aucune recette ne peut etre affectee a une dépense particuliere, l\'ensemble des recettes sert a la couverture de l\'ensemble des dépenses. Toutefois, la loi de finances peut prevoir expressement l\'affectation de certaines recettes a certaines dépenses. Ces affectations prennent la forme de budgets annexes, de comptes speciaux ou de procédures comptables particulieres au sein du budget général. » Ce sont les trois seules exceptions legales au principe de non-affectation.',
    articleRef: 'Art. 54 LOFIP'
  },
  {
    type: 'qcm', id: 'g15',
    question: 'Dans l\'architecture du budget-programme, quel niveau detient les crédits budgétaires selon la LOFIP ?',
    options: [
      { id: 'a', texte: 'L\'action (composante du programme)' },
      { id: 'b', texte: 'La fonction (regroupement interministeriel)' },
      { id: 'c', texte: 'Le programme (Art. 43)' },
      { id: 'd', texte: 'L\'indicateur de performance' },
    ],
    reponseCorrecte: 'c',
    explication: 'Dans le budget-programme, les crédits sont ouverts et gérés au niveau du programme (Art. 43-45). La fonction (Art. 44) est un regroupement analytique sans crédits propres. L\'action est une composante operationnelle du programme mais ne detient pas de crédits autonomes. Le programme est l\'unite de gestion des crédits : c\'est a ce niveau que s\'applique la fongibilite (Art. 45) et que sont fixes les plafonds de crédits limitatifs.',
    articleRef: 'Art. 43-45 LOFIP'
  },
]

// ─── CAS PRATIQUES ────────────────────────────────────────────────────────────
const ETUDES_DE_CAS = [
  {
    titre: 'Cas pratique 1 : Construction d\'un PAP pour le Ministere de l\'Education nationale',
    contexte: `Le Secretaire général du Ministere de l\'Education nationale est charge de préparer le Projet Annuel de Performance (PAP) pour l\'exercice 2026. Son ministère gère trois programmes :

PROGRAMME 1 : Enseignement primaire
- Credits votes : 18 500 000 000 FC
- Effectifs : 45 000 enseignants
- Taux de scolarisation brut 2024 : 78%
- Taux d\'acces en 6eme année : 62%

PROGRAMME 2 : Enseignement secondaire
- Credits votes : 12 300 000 000 FC
- Effectifs : 28 000 enseignants
- Taux de scolarisation brut 2024 : 45%
- Taux de reussite au TENAFEP : 68%

PROGRAMME 3 : Administration générale
- Credits votes : 2 200 000 000 FC
- Credits non affectes aux programmes 1 et 2`,
    questions: [
      {
        num: '1',
        enonce: 'Pour le Programme 1 "Enseignement primaire", proposez deux objectifs de performance (un d\'efficacite, un de qualite) avec leurs indicateurs et cibles pour 2026, conformement a l\'Art. 43 LOFIP.',
        correction: `OBJECTIFS DE PERFORMANCE - PROGRAMME 1 : ENSEIGNEMENT PRIMAIRE

L\'Art. 43 LOFIP exige que les objectifs soient "definis en fonction des finalites d\'intérêt général" et evalues "au moyen d\'indicateurs de performance".

OBJECTIF 1 - EFFICACITE : Augmenter l\'acces et la retention dans l\'enseignement primaire
Indicateur 1.1 : Taux de scolarisation brut au primaire
- Valeur 2024 (reference) : 78%
- Cible 2026 : 83%
- Source : Annuaire statistique MEPSP

Indicateur 1.2 : Taux d\'achevement du cycle primaire (acces en 6eme année)
- Valeur 2024 (reference) : 62%
- Cible 2026 : 68%
- Source : Enquetes ecole MEPSP

OBJECTIF 2 - QUALITE DE SERVICE : Ameliorer la qualite des apprentissages
Indicateur 2.1 : Taux d\'eleves maitrisant les competences de base en lecture (classe 4)
- Valeur 2024 : non disponible (a mesurer)
- Cible 2026 : etablir une valeur de reference via evaluation nationale
- Source : Evaluation nationale des apprentissages (ENA)

Indicateur 2.2 : Ratio eleves/enseignant qualifie
- Valeur 2024 (reference) : 45 000 enseignants pour ~7 millions d\'eleves = 156 eleves/enseignant
- Cible 2026 : 130 eleves/enseignant (recrutement 5 000 enseignants supplementaires)
- Source : Etat des effectifs MEPSP

NOTA BENE : Les indicateurs doivent etre renseignes sur 3 ans (N-1, N, N+1) dans le PAP pour permettre le suivi dans le RAP.`
      },
      {
        num: '2',
        enonce: 'Le Ministre de l\'Education souhaite utiliser 800 000 000 FC des crédits de personnel non utilises (Titre III) du Programme 1 pour financer l\'achat de manuels scolaires (Titre IV, Programme 1). Est-ce legal au regard des Art. 45 et 51 LOFIP ? Quelle procédure doit-il suivre ?',
        correction: `ANALYSE JURIDIQUE :

La question porte sur la fongibilite des crédits (Art. 45) et l\'interdiction de virement au profit du Titre III (Art. 51).

ICI : Le mouvement va DU Titre III (Personnel) VERS le Titre IV (Biens et materiels). Ce n\'est pas un virement au PROFIT du Titre III - c\'est un virement QUI PART du Titre III.

CONCLUSION : Ce mouvement est LEGAL.

RAISONNEMENT :
- Art. 51 al. 4 LOFIP : « Aucun virement ni transfert ne peut etre effectue AU PROFIT du titre des dépenses de personnel a partir d\'un autre titre. »
- La prohibition vise les virements entrant dans le Titre III depuis un autre titre.
- Le mouvement inverse (du Titre III vers un autre titre) n\'est pas interdit par l\'Art. 51.
- La fongibilite asymetrique signifie : on peut sortir des crédits du Personnel vers d\'autres titres, mais pas y faire entrer des crédits venant d\'ailleurs.

PROCEDURE LEGALE (Art. 47 LOFIP) :
Puisqu\'il s\'agit d\'un virement entre titres d\'un meme programme (Programme 1) :
1. Le Ministre de l\'Education formule une proposition de virement
2. Il la soumet au Ministre ayant le Budget dans ses attributions
3. Le Ministre du Budget prend un arrete autorisant le virement de 800 000 000 FC du Titre III vers le Titre IV du Programme 1
4. Ce mouvement est suivi conformement aux procédures fixees par le Ministre du Budget (Art. 45 al. 2)

VERIFICATION : Le virement ne doit pas depasser les crédits disponibles du Titre III et doit rester dans les limites fixees par la loi de finances.`
      },
    ]
  },
  {
    titre: 'Cas pratique 2 : Analyse de l\'exécution d\'un programme et du PAP/RAP',
    contexte: `Le Ministere de l\'Agriculture de la RDC a présenté dans son PAP 2025 les elements suivants pour son programme "Securite alimentaire" :

PAP 2025 - PROGRAMME SECURITE ALIMENTAIRE :
Objectif 1 : Augmenter la production agricole vivriere
- Indicateur 1.1 : Surface cultivee (millions ha) - Cible 2025 : 9,5 millions ha
- Indicateur 1.2 : Rendement moyen maïs (T/ha) - Cible 2025 : 1,8 T/ha

Objectif 2 : Ameliorer l\'acces aux intrants agricoles
- Indicateur 2.1 : Nombre d\'agriculteurs subventionnes - Cible 2025 : 250 000
- Indicateur 2.2 : Taux de couverture en semences certifiees - Cible 2025 : 35%

CREDITS PAP 2025 : 6 800 000 000 FC (dont Titre III : 1 200 000 000 FC, Titre VI : 4 500 000 000 FC subventions intrants, Titre IV : 1 100 000 000 FC)

EXECUTION REELLE 2025 (donnees RAP) :
- Surface cultivee realisee : 8,1 millions ha (cible : 9,5)
- Rendement moyen maïs : 1,4 T/ha (cible : 1,8)
- Agriculteurs subventionnes : 85 000 (cible : 250 000)
- Taux couverture semences : 18% (cible : 35%)
- Taux d\'exécution crédits : 52% global (Titre VI : 38% seulement)`,
    questions: [
      {
        num: '1',
        enonce: 'Calculez le taux de realisation de chaque indicateur et evaluez la performance du programme "Securite alimentaire" 2025. Identifiez les ecarts les plus preoccupants.',
        correction: `CALCUL DES TAUX DE REALISATION :

Indicateur 1.1 (Surface cultivee) : 8,1 / 9,5 = 85,3% de la cible atteinte
Indicateur 1.2 (Rendement maïs) : 1,4 / 1,8 = 77,8% de la cible atteinte
Indicateur 2.1 (Agriculteurs subventionnes) : 85 000 / 250 000 = 34,0% de la cible atteinte
Indicateur 2.2 (Couverture semences) : 18% / 35% = 51,4% de la cible atteinte

EVALUATION GLOBALE :
Le programme est en situation de sous-performance severe sur l\'objectif 2 (acces aux intrants) :
- L\'indicateur 2.1 est le plus preoccupant : seulement 34% de la cible - 165 000 agriculteurs n\'ont pas ete subventionnes comme prevu.
- L\'indicateur 2.2 : 51,4% - plus de la moitie des agriculteurs cibles n\'ont pas acces aux semences certifiees.

CAUSES PROBABLES (a identifier dans le RAP) :
- Taux d\'exécution du Titre VI (Transferts/subventions intrants) : seulement 38% - ce faible taux explique directement les sous-performances des indicateurs 2.1 et 2.2.
- Les subventions votees n\'ont pas ete versees aux agriculteurs, probablement en raison de problemes de tresorerie (crédits disponibles mais non debloques), de problemes de passation de marches (fournisseurs d\'intrants), ou de problemes de distribution logistique.

CONSEQUENCE POUR LE RAP :
Le responsable du programme devra expliquer dans le RAP les raisons des ecarts et proposer des mesures correctrices pour le programme 2026, conformement a la logique de la gestion par la performance.`
      },
      {
        num: '2',
        enonce: 'Le responsable du programme propose, pour le budget 2026, de creer un nouveau programme "Irrigation agricole" en prelevant 2 000 000 000 FC sur les crédits du programme "Securite alimentaire". Evaluez la legalite de cette demarche au regard de la LOFIP.',
        correction: `ANALYSE JURIDIQUE - CREATION D\'UN NOUVEAU PROGRAMME :

CONCLUSION : La procédure proposee est ILLEGALE a double titre.

PREMIER MOTIF D\'ILLEGALITE - Art. 43 al. 3 LOFIP :
« Seule une disposition de loi de finances d\'initiative gouvernementale peut creer ou supprimer un programme. »
La creation du programme "Irrigation agricole" ne peut pas resulter d\'une simple proposition administrative du responsable de programme ou d\'un arrete ministeriel. Elle doit figurer dans le texte meme de la loi de finances (PLF) soumis au Parlement.

SECOND MOTIF D\'ILLEGALITE - Art. 50 LOFIP :
« Aucun virement ni transfert ne peut etre effectue au profit d\'un programme non prevu par une loi de finances. »
Meme si le programme existait (ce qui n\'est pas le cas ici), prelevement de 2 milliards FC par voie de simple transfert sur un programme existant serait contraire a l\'Art. 50 si le programme cible n\'est pas prevu par la loi de finances.

PROCEDURE LEGALE CORRECTE :
Pour creer le programme "Irrigation agricole", le Gouvernement doit :
1. Inscrire ce nouveau programme dans le Projet de Loi de Finances 2026 (initiative gouvernementale)
2. L\'assortir d\'un PAP avec objectifs et indicateurs de performance
3. Le Parlement vote le PLF incluant ce programme avec ses crédits
4. Une fois le programme legalement cree par la LF 2026, les transferts depuis d\'autres programmes (Art. 48-49) deviennent possibles dans les conditions fixees par la LOFIP.`
      },
    ]
  },
  {
    titre: 'Cas pratique 3 : Fongibilité asymétrique et gestion par programme — Art. 45-50 LOFIP',
    contexte: `Le gestionnaire du programme «Enseignement primaire» du Ministère de l\'Education nationale (MEN) dispose, pour l\'exercice 2026 (LF 2026, Loi n° 25/060), des crédits suivants :

- Titre I (Personnel) : 18.000 milliards FC — consommé à 85% au 30 septembre
- Titre II (Fonctionnement) : 3.200 milliards FC — consommé à 97% au 30 septembre
- Titre IV (Investissement — construction salles de classe) : 5.500 milliards FC — consommé à 12%

Face à une urgence de réhabilitation de 150 écoles suite aux inondations de septembre 2026, le gestionnaire envisage les options suivantes :
- Option A : Prélever 800 milliards FC sur le Titre I (postes vacants non pourvus) pour abonder le Titre II
- Option B : Prélever 800 milliards FC sur le Titre IV (investissement) pour abonder le Titre II
- Option C : Utiliser les crédits d\'investissement restants (Titre IV) pour financer directement les travaux urgents`,
    questions: [
      {
        num: '1',
        enonce: 'Analysez la légalité de chaque option (A, B, C) au regard de la fongibilité asymétrique (Art. 45 LOFIP) et du principe de spécialité (Art. 8 LOFIP). Quelle(s) option(s) sont légales ?',
        correction: `OPTION A — LÉGALE (Art. 45 LOFIP) : La fongibilité asymétrique autorise expresseement le redéploiement des crédits du Titre I (personnel) vers les autres titres lorsque des postes sont vacants. Prélever sur les crédits de personnel non consommés (15% de 18.000 = 2.700 milliards FC disponibles) pour abonder le Titre II est la direction autorisée par la loi. Procédure : arrêté du Ministre du Budget dans les plafonds fixés par la LF 2026.

OPTION B — ILLÉGALE (Art. 45 LOFIP) : La fongibilité est dite «asymétrique» précisément parce que les mouvements VERS le Titre I sont interdits, mais aussi parce que les mouvements entre titres autres que depuis le Titre I nécessitent une procédure de virement (Art. 46-48) ou de transfert (Art. 49-50). Prélever sur le Titre IV pour le Titre II constitue un virement inter-titres hors Titre I, qui nécessite un arrêté du Ministre du Budget — ce n\'est pas une simple décision du gestionnaire.

OPTION C — LÉGALE dans les limites du programme : Les crédits d\'investissement restants (Titre IV, 88% non consommés = 4.840 milliards FC) peuvent financer les travaux de réhabilitation urgents si ceux-ci relèvent bien du Titre IV (construction/réhabilitation). La réhabilitation de salles de classe entre dans le Titre IV conformément à Art. 37 LOFIP.`
      },
      {
        num: '2',
        enonce: 'Si les crédits disponibles sont insuffisants pour couvrir les 800 milliards FC nécessaires, quelles procédures la LOFIP prévoit-elle pour ouvrir des crédits supplémentaires en cours d\'exercice ? Citez les articles et les autorités compétentes.',
        correction: `La LOFIP prévoit trois mécanismes complémentaires en cas d\'insuffisance de crédits : (1) Virement de crédits au sein d\'un même programme (Art. 46-48 LOFIP) : le gestionnaire peut déplacer des crédits entre titres du même programme «Enseignement primaire», autorisé par arrêté du Ministre du Budget dans les plafonds de la LF 2026. (2) Transfert de crédits entre programmes (Art. 49-50 LOFIP) : si d\'autres programmes du MEN disposent d\'excédents, un transfert peut être opéré par décret du Premier Ministre sur proposition du Ministre du Budget. (3) Loi de finances rectificative (Art. 76-87 LOFIP) : en cas de besoin supérieur aux mécanismes internes, le Gouvernement dépose un projet de LFR au Parlement pour ouvrir des crédits supplémentaires. Pour les inondations de septembre 2026, la LFR serait la voie appropriée si les dommages dépassent les capacités de redéploiement interne.`
      },
      {
        num: '3',
        enonce: 'Comment le Projet Annuel de Performance (PAP) 2026 et le Rapport Annuel de Performance (RAP) permettent-ils de rendre compte de l\'utilisation des crédits lors de la réhabilitation des écoles ? Quel est le rôle de la Cour des comptes ?',
        correction: `Le PAP 2026 (Art. 43-44 LOFIP) fixe pour chaque programme : les objectifs stratégiques, les indicateurs de performance et les crédits alloués par titre. Pour le programme «Enseignement primaire», le PAP 2026 devrait inclure un indicateur de type «nombre de salles de classe réhabilitées» avec une cible quantitative. Si la réhabilitation d\'urgence n\'était pas prévue au PAP initial, une révision du PAP accompagne la LFR (Art. 43 al. 2 LOFIP). Le RAP (Rapport Annuel de Performance) est établi à la clôture de l\'exercice : il compare les résultats obtenus aux objectifs du PAP et justifie les écarts. Il accompagne le projet de loi de règlements (Art. 28-29 LOFIP). La Cour des comptes (Art. 178-180 Constitution) contrôle ex post la régularité des opérations, certifie les comptes et évalue l\'atteinte des objectifs de performance. Elle peut émettre des réserves sur l\'emploi des crédits si le gestionnaire n\'a pas respecté les procédures de la LOFIP.`
      },
    ]
  },
  {
    titre: 'Cas pratique 4 : Mission, programme et objectifs de performance — Art. 43-54 LOFIP',
    contexte: `Dans le cadre de la préparation du budget 2026, le Ministère de la Santé publique (MSP) soumet au Ministère du Budget le projet de PAP pour sa mission «Santé publique». La mission comprend trois programmes :

- Programme 1 : «Soins de santé primaires» — crédits demandés : 12.500 milliards FC
- Programme 2 : «Lutte contre les maladies endémiques» — crédits demandés : 4.200 milliards FC  
- Programme 3 : «Hôpitaux et infrastructures sanitaires» — crédits demandés : 8.800 milliards FC

Le Directeur du Budget du Ministère du Budget soulève deux problèmes : (1) le Programme 1 n\'a aucun indicateur de performance chiffré ; (2) le Programme 2 inclut une dotation de 500 milliards FC pour «recherche fondamentale» sans lien direct avec les soins.`,
    questions: [
      {
        num: '1',
        enonce: 'Selon l\'Art. 43 LOFIP, qu\'est-ce qu\'un «programme» budgétaire ? Le Programme 1 «Soins de santé primaires» sans indicateur chiffré respecte-t-il la définition légale ?',
        correction: `L\'Art. 43 al. 1 LOFIP définit le programme comme «un regroupement de crédits destinés à mettre en œuvre une action ou un ensemble cohérent d\'actions relevant d\'un même ministère et auquel sont associés des objectifs précis, définis en fonction de finalités d\'intérêt général, ainsi que des résultats attendus et faisant l\'objet d\'une évaluation». La définition légale exige donc : (a) un regroupement de crédits d\'un même ministère ; (b) des objectifs précis définis en fonction de l\'intérêt général ; (c) des résultats attendus mesurables ; (d) une évaluation prévue. Le Programme 1 sans indicateur chiffré ne respecte PAS la définition légale. L\'absence d\'indicateurs chiffrés empêche toute évaluation des résultats attendus, ce qui vide le programme de sa substance au regard de l\'Art. 43. Le Directeur du Budget est fondé à rejeter ce PAP et à exiger des indicateurs SMART (Spécifiques, Mesurables, Atteignables, Réalistes, Temporellement définis).`
      },
      {
        num: '2',
        enonce: 'La dotation «recherche fondamentale» du Programme 2 (500 milliards FC) est-elle compatible avec l\'Art. 43 LOFIP qui exige un «ensemble cohérent d\'actions» ? Peut-on la maintenir dans le Programme 2 ou doit-elle être réallouée ?',
        correction: `La dotation «recherche fondamentale» du Programme 2 pose un problème de cohérence au sens de l\'Art. 43 LOFIP. L\'Art. 43 exige que les crédits d\'un programme constituent «un ensemble cohérent d\'actions» relevant d\'un même ministère et d\'une même finalité d\'intérêt général. Le Programme 2 «Lutte contre les maladies endémiques» a une finalité opérationnelle (traitement et prévention des maladies). La recherche fondamentale — sans lien direct avec les soins — ne constitue pas une action «cohérente» avec cette finalité. SOLUTION : (1) Si la recherche est directement liée à la lutte contre les endémies (ex. : recherche sur le paludisme), elle peut être maintenue dans le Programme 2 avec une justification détaillée dans le PAP. (2) Si c\'est de la recherche fondamentale pure, elle devrait constituer un programme distinct (ex. : Programme 4 «Recherche et innovation sanitaire») ou être réallouée au Ministère de la Recherche scientifique, conformément au principe de cohérence de l\'Art. 43.`
      },
      {
        num: '3',
        enonce: 'Les crédits du Programme 3 «Hôpitaux et infrastructures» sont-ils soumis au même régime juridique (limitatif/évaluatif) que les crédits du Programme 1 ? Selon quels articles de la LOFIP ? Quel est l\'impact sur la fongibilité asymétrique ?',
        correction: `Oui, les crédits des trois programmes sont en principe soumis au régime des crédits LIMITATIFS (Art. 38 LOFIP), qui constitue la règle générale. Exception pour les crédits évaluatifs (Art. 39 LOFIP) qui s\'appliquent uniquement aux charges de la dette du Pouvoir central — non applicable ici. La fongibilité asymétrique (Art. 45 LOFIP) s\'applique identiquement aux trois programmes : dans chaque programme, les crédits de personnel (Titre I) peuvent être redéployés vers les autres titres, mais les transferts vers le Titre I sont interdits. La particularité du Programme 3 (infrastructures) est que ses crédits de Titre IV (investissement) ne peuvent être réduits au profit du Titre I — c\'est l\'asymétrie protectrice. En revanche, si le Programme 3 dispose d\'excédents de Titre I (postes vacants), ceux-ci peuvent abonder le Titre IV pour accélérer les constructions d\'hôpitaux, dans les plafonds fixés par la LF 2026 (Loi n° 25/060).`
      },
    ]
  },
  {
    titre: 'Cas pratique 5 : Contrôle parlementaire de la performance — Art. 52-54 LOFIP et LF 2026',
    contexte: `Lors de la session budgétaire d\'octobre 2026, l\'Assemblée nationale examine le projet de Loi de Finances 2027. Un groupe de députés mandate la Commission des finances pour contrôler l\'exécution du budget 2026 (LF 2026 — Loi n° 25/060 du 29 décembre 2025). Les RAP provisoires transmis par le Ministère du Budget révèlent :

- Le taux d\'exécution des crédits d\'investissement (Titre IV) est de 9% à fin septembre 2026, contre un objectif PAP de 60%
- Le Programme «Infrastructure routière» a redéployé 1.200 milliards FC de Titre IV (investissement) vers le Titre I (personnel) sans aucune autorisation
- Les indicateurs de résultat du PAP 2026 ne sont renseignés que pour 3 programmes sur 15`,
    questions: [
      {
        num: '1',
        enonce: 'Le redéploiement de 1.200 milliards FC du Titre IV vers le Titre I est-il légal selon l\'Art. 45 LOFIP ? Quelles sont les sanctions encourues par l\'ordonnateur responsable ?',
        correction: `Ce redéploiement est ILLÉGAL et constitue une violation flagrante de la fongibilité asymétrique (Art. 45 LOFIP). L\'Art. 45 interdit expresseement tout mouvement de crédits VERS le Titre I (personnel) depuis les autres titres. Le sens autorisé est uniquement Titre I → autres titres. Redéployer 1.200 milliards FC du Titre IV (investissement) vers le Titre I viole : (1) Art. 45 LOFIP (fongibilité asymétrique) ; (2) Art. 8 LOFIP (principe de spécialité — les crédits d\'investissement ne peuvent financer du personnel) ; (3) Art. 10 LOFIP (légalité des dépenses — toute dépense doit être conforme à un texte régulier). Sanctions : la Cour des comptes peut condamner l\'ordonnateur à reverser personnellement les sommes irrégulièrement engagées. L\'ordonnateur peut aussi faire l\'objet de poursuites pénales pour détournement de crédits publics.`
      },
      {
        num: '2',
        enonce: 'Face au taux d\'exécution des investissements de seulement 9% à fin septembre 2026, quels mécanismes la LOFIP prévoit-elle pour éviter la perte des crédits non consommés en fin d\'exercice ? Ces reports sont-ils automatiques ?',
        correction: `La LOFIP prévoit les reports de crédits (Art. 53) qui permettent, sous conditions strictes, de reporter sur l\'exercice suivant les crédits d\'investissement non consommés. L\'Art. 53 dispose que «les crédits disponibles sur les programmes à la fin de l\'exercice peuvent être reportés sur le même programme par arrêté conjoint du Ministre du Budget et du Ministre ayant les Finances dans ses attributions». Les reports ne sont PAS automatiques : ils requièrent un arrêté conjoint et ne concernent que les crédits de programmes d\'investissement (Titre IV), pas les crédits de fonctionnement. Pour les 91% de crédits d\'investissement non consommés (soit ~5.000 milliards FC environ), la procédure de report doit être engagée avant le 31 décembre 2026, sous peine d\'annulation automatique conformément à l\'Art. 29 al. 4 LOFIP.`
      },
      {
        num: '3',
        enonce: 'Le fait que seuls 3 programmes sur 15 ont des indicateurs de résultat renseignés constitue-t-il une violation de la LOFIP ? Quels pouvoirs la Commission des finances de l\'Assemblée nationale a-t-elle pour sanctionner cette situation ?',
        correction: `Oui, l\'absence de renseignement des indicateurs de performance pour 12 programmes sur 15 constitue une violation de l\'Art. 43 LOFIP (qui exige des «résultats attendus faisant l\'objet d\'une évaluation») et de l\'Art. 54 LOFIP (qui impose que le RAP rende compte des résultats obtenus par programme). La Commission des finances de l\'Assemblée nationale dispose de plusieurs pouvoirs : (1) Mission d\'information et d\'enquête (Art. 138 Constitution) : elle peut convoquer les ordonnateurs et gestionnaires de programmes pour obtenir des explications et les documents budgétaires. (2) Contrôle sur pièces et sur place : la Commission peut diligenter des missions de contrôle dans les ministères défaillants. (3) Résolution parlementaire : elle peut adopter une résolution demandant au Gouvernement de renseigner les indicateurs manquants sous 30 jours. (4) Saisine de la Cour des comptes : elle peut demander à la Cour d\'audit les programmes défaillants. Ces mécanismes constituent le contrôle démocratique de la performance budgétaire prévu aux Art. 52-54 LOFIP.`
      },
    ]
  },
]

// ─── PAGE PRINCIPALE ─────────────────────────────────────────────────────────
export default function UE5Chapitre4Page() {
  const [, navigate] = useHashLocation()
  const goBack = useGoBack('/ue5-finances-publiques')
  const currentUser = useUser()
  const isStudent = currentUser?.role === 'etudiant'

  const [activeTab, setActiveTab] = useState<'lecons' | 'qcm' | 'cas' | 'devoir'>('lecons')
  const [leconIdx, setLeconIdx] = useState(0)
  const lecon = LECONS[leconIdx]
  const isFirst = leconIdx === 0
  const isLast = leconIdx === LECONS.length - 1

  return (
    <div className="space-y-4 pb-10 animate-fadeIn">
            <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 5 — Finances publiques', route: '/ue5-finances-publiques' },
            { label: 'Chapitre 4' },
          ]}
          color="emerald"
        />
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-lg font-bold text-foreground leading-tight">Budget-programme et gestion par la performance</h1>
          <InfoTooltip texte="Ce chapitre analyse la reforme du budget-programme introduite par la LOFIP : definition du programme (Art. 43), fonctions (Art. 44), fongibilite des crédits (Art. 45), mouvements de crédits (Art. 46-53), PAP/RAP (Art. 79) et état d\'avancement de la reforme en RDC." loi="Art. 43-54, 79 LOFIP" />
        </div>
        <p className="text-xs text-muted-foreground">LOFIP Art. 43-54, 79 · Programme, PAP, RAP · Reforme RDC 2011-2026</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Lecons', value: String(LECONS.length) },
          { label: 'QCM', value: String(QCM_GLOBAL.length) },
          { label: 'Cas pratiques', value: String(ETUDES_DE_CAS.length) },
          { label: 'Duree', value: '4h00' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 p-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Objectifs du chapitre</span>
        </div>
        <ul className="space-y-1">
          <li className="flex items-start gap-2 text-xs text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Comprendre le passage du budget de moyens au budget-programme et la logique de la gestion par la performance (Art. 43 LOFIP)</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Definir et distinguer programme, action, fonction, objectif et indicateur de performance (Art. 43-44)</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Maitriser la fongibilite des crédits et les règles de virements/transferts (Art. 45-51)</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Connaitre les instruments de la performance : PAP (joint au PLF) et RAP (joint a la loi de reddition des comptes) (Art. 79)</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Situer l\'état d\'avancement de la reforme en RDC : deux prorogations, realisations et defis persistants (actualite 2024-2026)</span></li>
        </ul>
      </div>

      <div className="flex gap-1 rounded-xl bg-muted p-1">
        {(isStudent
          ? [['lecons', 'Lecons'], ['devoir', 'Devoir']] as [typeof activeTab, string][]
          : [['lecons', 'Lecons'], ['qcm', 'QCM'], ['cas', 'Cas pratiques'], ['devoir', 'Devoir']] as [typeof activeTab, string][]
        ).map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn('flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors', activeTab === tab ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'lecons' && (
        <div className="space-y-4">
          <div className="flex gap-1 flex-wrap">
            {LECONS.map((l, i) => (
              <button key={l.id} onClick={() => setLeconIdx(i)} className={cn('flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors', leconIdx === i ? 'bg-emerald-600 text-white border-emerald-600' : 'border-border hover:border-emerald-300 hover:bg-muted')}>
                {l.icone && React.cloneElement(l.icone as React.ReactElement, { className: 'h-3.5 w-3.5' })}
                L{i + 1}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="rounded-lg bg-emerald-100 dark:bg-emerald-900/30 p-2 text-emerald-600 dark:text-emerald-400 shrink-0">
                {lecon.icone}
              </div>
              <div>
                <h2 className="text-sm font-bold text-foreground">{lecon.titre}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{lecon.soustitre}</p>
              </div>
            </div>
            {lecon.contenu}
          </div>

          <div className="flex gap-2">
            <button onClick={() => setLeconIdx(i => Math.max(0, i - 1))} disabled={isFirst} className="flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted disabled:opacity-40 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Precedente
            </button>
            <div className="flex-1 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Lecon {leconIdx + 1} / {LECONS.length}</span>
            </div>
            <button onClick={() => setLeconIdx(i => Math.min(LECONS.length - 1, i + 1))} disabled={isLast} className="flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted disabled:opacity-40 transition-colors">
              Suivante <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'qcm' && !isStudent && (
        <div className="space-y-2">
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 p-3">
            <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">15 questions · 5 faciles · 5 moyennes · 5 difficiles · Sources : LOFIP Art. 43-54, 79 · Actualite 2025</p>
          </div>
          <QCMPageUnique questions={QCM_GLOBAL as unknown as QCMChapitre[]} couleurAccent="emerald" />
        </div>
      )}

      {activeTab === 'cas' && !isStudent && (
        <div className="space-y-4">
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 p-3">
            <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">2 cas pratiques enrichis · Application Art. 43-53 LOFIP · PAP/RAP · Fongibilite et mouvements de crédits</p>
          </div>
          {ETUDES_DE_CAS.map(cas => (
            <CasPratiqueBlock key={cas.titre} cas={cas} />
          ))}
        </div>
      )}

      {activeTab === 'devoir' && (
        <DevoirChapitreCreateur
          chapitreId="ue5-chapitre-4"
          chapitreNom="Chapitre 4 - Budget-programme et gestion par la performance"
          questions={QCM_GLOBAL as unknown as QCMChapitre[]}
          coursId="ue5-finances-publiques"
          casPratiquesExistants={ETUDES_DE_CAS.map(versCasPratiqueExistant)}
        />
      )}

      <button onClick={goBack} className="w-full rounded-xl bg-emerald-600 text-white py-3 font-semibold text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
        <ArrowLeft className="h-4 w-4" /> Retour aux chapitres UE 5
      </button>
    </div>
  )
}
