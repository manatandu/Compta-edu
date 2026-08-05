import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle,
  BookOpen, Calendar, FileText, Users, Clock,
  ChevronRight, RotateCcw, AlertTriangle, Scale, Building2,
  TrendingUp, Target, Award
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import DevoirChapitreCreateur, { CasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
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
    icone: <Calendar className="h-5 w-5" />,
    titre: 'Le calendrier budgétaire (Art. 13, 76-77, 83-84 LOFIP)',
    soustitre: 'Etapes d\'élaboration, de dépôt et de vote du budget du Pouvoir central',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 p-4">
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2">Fondement : Art. 13 et 76-77 LOFIP</h3>
          <p className="text-xs text-foreground leading-relaxed mb-2">
            L\'Art. 13 LOFIP dispose que le Ministre du Budget établit chaque année un <strong>Cadre Budgetaire a Moyen Terme (CBMT)</strong> sur 3 ans, adopté en Conseil des ministres au plus tard le 1er juin et transmis au Parlement. L\'Art. 76 precise que ce CBMT donne naissance au <strong>Cadre des Depenses a Moyen Terme (CDMT)</strong> détaillant les prévisions de dépenses des ministères pour 3 ans.
          </p>
          <p className="text-xs text-foreground leading-relaxed">
            L\'Art. 77 confie sous l\'autorité du Premier ministre au Ministre du Budget la préparation du projet de loi de finances (PLF) et, en debut ou en cours d\'année, du projet de loi de finances rectificative (PLFR). A la clôture de l\'exercice, le Ministre des Finances élaboré et soumet en Conseil des ministres le projet de loi portant reddition des comptes.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-emerald-600" /> Calendrier budgétaire officiel (Art. 13, 83, 84, 87 LOFIP)
          </h3>
          <div className="space-y-2">
            {[
              {
                date: 'Avant le 1er juin',
                étape: 'CBMT adopté en Conseil des ministres + transmis au Parlement',
                art: 'Art. 13',
                couleur: 'bg-violet-600',
                detail: 'Le Cadre Budgetaire a Moyen Terme (CBMT) sur 3 ans est la premiere pierre du processus budgétaire. Il fixe les hypotheses macro-economiques (croissance, inflation, taux de change) et les plafonds de dépenses pluriannuels. Le Parlement en debat sans vote lors de la session budgétaire.'
              },
              {
                date: 'Avant le 15 juin',
                étape: 'Debat d\'orientation budgétaire au Parlement (sans vote)',
                art: 'Art. 13',
                couleur: 'bg-blue-600',
                detail: 'Le Parlement debat du CBMT et des grandes orientations budgétaires pour l\'année suivante. Ce debat est informatif : il n\'aboutit pas a un vote. Il permet au Parlement d\'exprimer ses priorites avant l\'élaboration du PLF definitif.'
              },
              {
                date: 'Avant le 15 septembre',
                étape: 'Depot du PLF a l\'Assemblee nationale (Art. 83)',
                art: 'Art. 83',
                couleur: 'bg-emerald-600',
                detail: 'L\'Art. 83 al. 1 LOFIP dispose : « le projet de loi de finances de l\'année, y compris les etats et documents prevus aux articles 78 et 79 de la présente loi, est depose par le Gouvernement au bureau de l\'Assemblee Nationale au plus tard le 15 septembre de chaque année. » Si ce delai n\'est pas respecte, le Gouvernement est repute demissionnaire (Art. 126 Constitution).'
              },
              {
                date: '40 jours apres dépôt',
                étape: 'Adoption par l\'Assemblee nationale',
                art: 'Art. 83',
                couleur: 'bg-emerald-500',
                detail: 'L\'Art. 83 al. 3 dispose : « Dans tous les cas, l\'Assemblee Nationale dispose de 40 jours a compter de la date du dépôt pour adopter le projet de loi de finances de l\'année. » Ce delai est constitutionnel (Art. 126 Constitution). Les debats portent sur les recettes (vote d\'ensemble par titre), puis sur les dépenses (vote par ministère/institution et par programme, Art. 85).'
              },
              {
                date: '20 jours apres (si AN en retard)',
                étape: 'Transmission et vote au Senat',
                art: 'Art. 83',
                couleur: 'bg-cyan-600',
                detail: 'Si l\'Assemblee Nationale ne vote pas dans les 40 jours, le PLF est transmis au Senat pour adoption dans les 20 jours. Cette disposition constitutionnelle garantit le fonctionnement du calendrier budgétaire meme en cas de blocage a l\'Assemblee.'
              },
              {
                date: 'Si non vote avant le 1er janvier',
                étape: 'Ordonnance-loi du President de la Republique',
                art: 'Art. 83',
                couleur: 'bg-amber-600',
                detail: 'L\'Art. 83 al. 5 dispose que si le PLF n\'est pas vote avant l\'ouverture du nouvel exercice, « les dispositions dudit projet sont mises en vigueur par ordonnance-loi du President de la Republique deliberee en Conseil des ministres, en tenant compte des amendements votes par chacune des deux chambres. » Cette disposition evite le blocage du fonctionnement de l\'Etat.'
              },
              {
                date: '15 jours avant fin session (1er dec.)',
                étape: 'Si PLF non depose : Gouvernement repute demissionnaire (Art. 126 Constitution)',
                art: 'Art. 83',
                couleur: 'bg-red-600',
                detail: 'L\'Art. 83 al. 6 est sans ambiguite : « Si quinze (15) jours avant la fin de la session budgétaire, soit le 1er decembre, le Gouvernement n\'a pas depose son projet de loi de finances de l\'année suivante, il est repute demissionnaire conformement a l\'article 126 de la Constitution. » C\'est la sanction politique majeure du non-respect du calendrier budgétaire.'
              },
              {
                date: 'Avant le 15 mai de l\'année N+1',
                étape: 'Depot du projet de loi de reddition des comptes',
                art: 'Art. 84',
                couleur: 'bg-slate-600',
                detail: 'L\'Art. 84 dispose : « le projet de loi portant reddition des comptes du dernier exercice clos [...] est depose a l\'Assemblee nationale, au plus tard le 15 mai de l\'année suivant celle de l\'exécution du budget auquel il se rapporte. » L\'Art. 87 impose que cette loi soit examinee par le Parlement AVANT le vote du PLF de l\'année suivante.'
              },
            ].map((e, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className={cn('text-xs font-bold text-white rounded-lg px-2 py-1.5 shrink-0 text-center min-w-28', e.couleur)}>
                  {e.date}
                </div>
                <div className="flex-1 rounded-lg border border-border p-2.5">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-bold text-foreground">{e.étape}</p>
                    <span className="text-xs text-muted-foreground shrink-0">{e.art}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{e.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10 p-4">
          <h3 className="text-sm font-bold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" /> Actualite 2025-2026 : depots hors delai
          </h3>
          <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed mb-2">
            En pratique, la RDC connait régulièrement des depots tardifs du PLF. Pour le budget 2026, le PLF a ete depose a l\'Assemblee nationale le <strong>28 octobre 2025</strong>, soit au-dela du 15 septembre. Le discours d\'ouverture de la conference budgétaire 2026 du Ministere du Budget (juillet 2025) a formule la nouvelle priorite de <strong>mobilisation des recettes internes</strong> pour reduire la dependance aux financements exterieurs et atteindre un budget de 60 milliards USD a l\'horizon 2028.
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
            Source : Discours d\'ouverture conference budgétaire 2026, Ministere du Budget RDC, 28 juillet 2025.
          </p>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l1q1',
            question: 'Selon l\'Art. 83 LOFIP, au plus tard a quelle date le Gouvernement doit-il deposer le PLF a l\'Assemblee nationale ?',
            options: [
              { id: 'a', texte: 'Le 1er juin' },
              { id: 'b', texte: 'Le 15 juillet' },
              { id: 'c', texte: 'Le 15 septembre' },
              { id: 'd', texte: 'Le 1er octobre' },
              { id: 'e', texte: 'Le 1er decembre' },
            ],
            reponseCorrecte: 'c',
            explication: 'L\'Art. 83 al. 1 LOFIP est explicite : « le projet de loi de finances de l\'année [...] est depose par le Gouvernement au bureau de l\'Assemblee Nationale au plus tard le 15 septembre de chaque année. » Si ce delai n\'est pas respecte 15 jours avant la fin de la session budgétaire (1er decembre), le Gouvernement est repute demissionnaire (Art. 126 Constitution).',
            articleRef: 'Art. 83 LOFIP'
          },
          {
            type: 'qcm', id: 'l1q2',
            question: 'Que se passe-t-il si le PLF n\'est pas vote avant le 1er janvier selon l\'Art. 83 LOFIP ?',
            options: [
              { id: 'a', texte: 'Le budget de l\'année precedente est reconduit automatiquement' },
              { id: 'b', texte: 'Le Parlement est dissous' },
              { id: 'c', texte: 'Les dispositions du PLF sont mises en vigueur par ordonnance-loi du President de la Republique' },
              { id: 'd', texte: 'Le Gouvernement est repute demissionnaire' },
              { id: 'e', texte: 'Le Senat vote le PLF dans les 15 jours' },
            ],
            reponseCorrecte: 'c',
            explication: 'L\'Art. 83 al. 5 LOFIP dispose : « Lorsque le projet de loi de finances n\'est pas vote avant l\'ouverture du nouvel exercice, les dispositions dudit projet sont mises en vigueur par ordonnance-loi du President de la Republique deliberee en Conseil des ministres, en tenant compte des amendements votes par chacune des deux chambres. » Le Gouvernement est repute demissionnaire uniquement s\'il n\'a pas DEPOSE le PLF avant le 1er decembre (non si le PLF n\'est pas vote).',
            articleRef: 'Art. 83 LOFIP'
          },
        ]} />
      </div>
    )
  },
  {
    id: 'l2',
    icone: <Users className="h-5 w-5" />,
    titre: 'Les acteurs de la procédure budgétaire',
    soustitre: 'LOFIP Art. 13, 77 - Roles du Gouvernement, Parlement et institutions de contrôle',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 p-4">
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2">Principe constitutionnel : initiative budgétaire gouvernementale</h3>
          <p className="text-xs text-foreground leading-relaxed">
            En RDC, l\'initiative de la loi de finances appartient exclusivement au <strong>Gouvernement</strong>. Cette règle constitutionnelle (Art. 126 Constitution) signifie que le Parlement ne peut pas deposer un projet de loi de finances alternatif : il peut uniquement amender le PLF gouvernemental, dans les limites fixees par l\'Art. 86 LOFIP.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              titre: 'Le Premier ministre', couleur: 'emerald', icone: <Building2 className="h-4 w-4" />,
              roles: [
                { label: 'Autorite superieure', desc: 'Art. 77 : « Sous l\'autorité du Premier ministre, le ministre ayant le budget dans ses attributions préparé [...] le projet de loi de finances. » Le Premier ministre signe la lettre d\'orientation qui cadre l\'élaboration du budget.' },
                { label: 'Adoption du CBMT', desc: 'Art. 13 : Le CBMT est « adopté en Conseil des ministres au plus tard le 1er juin » sur proposition du Ministre du Budget. Le Premier ministre preside le Conseil des ministres.' },
                { label: 'Sanction du non-dépôt', desc: 'Art. 83 : Si le PLF n\'est pas depose avant le 1er decembre, le Gouvernement (dont le Premier ministre) est repute demissionnaire conformement a l\'Art. 126 Constitution.' },
              ]
            },
            {
              titre: 'Le Ministre du Budget', couleur: 'blue', icone: <FileText className="h-4 w-4" />,
              roles: [
                { label: 'Elaboration du CBMT et CDMT', desc: 'Art. 13 et 76 : établit chaque année le Cadre Budgetaire a Moyen Terme (CBMT) a 3 ans et le Cadre des Depenses a Moyen Terme (CDMT) détaillé par ministère.' },
                { label: 'Preparation du PLF', desc: 'Art. 77 : préparé le projet de loi de finances de l\'année, le projet de loi de finances rectificative et le projet de loi portant ouverture de crédits provisoires.' },
                { label: 'Pouvoir de regulation budgétaire', desc: 'Art. 103 : exerce le pouvoir de regulation des dépenses vis-a-vis des ordonnateurs. Peut bloquer ou geler des crédits pour maintenir l\'équilibre budgétaire.' },
              ]
            },
            {
              titre: 'Le Ministre des Finances', couleur: 'violet', icone: <Scale className="h-4 w-4" />,
              roles: [
                { label: 'Elaboration de la loi de reddition des comptes', desc: 'Art. 77 al. 3 : « A la clôture de l\'exercice, le ministre ayant les finances dans ses attributions élaboré et soumet au Conseil des ministres le projet de loi portant reddition des comptes. »' },
                { label: 'Gestion de la tresorerie', desc: 'Exerce le pouvoir de gestion de tresorerie : autorise ou differe les decaissements selon la situation du Compte général du Tresor.' },
                { label: 'Ordonnateur principal des recettes', desc: 'Supervise le recouvrement des recettes via les regies financieres (DGI, DGDA, DGRAD). Responsable de la politique de la dette publique.' },
              ]
            },
            {
              titre: 'L\'Assemblee nationale et le Senat', couleur: 'amber', icone: <Users className="h-4 w-4" />,
              roles: [
                { label: 'Vote du budget (Art. 85)', desc: 'Art. 85 : « Les evaluations de recettes font l\'objet d\'un vote d\'ensemble pour le titre [...]. Les dépenses du budget du Pouvoir central sont votees par ministère ou institution et par programme. » L\'Assemblee nationale vote en 40 jours, le Senat en 20 jours si necesssaire.' },
                { label: 'Droit d\'amendement limite (Art. 86)', desc: 'Art. 86 LOFIP / Art. 127 Constitution : les amendements parlementaires ne sont recevables que s\'ils n\'entrainent ni diminution des recettes, ni accroissement des dépenses, a moins d\'etre assortis de propositions compensatoires.' },
                { label: 'Debat d\'orientation budgétaire', desc: 'Art. 13 : le Parlement debat du CBMT avant le 15 juin sans le voter. Ce debat lui permet d\'exprimer ses priorites et d\'influencer les orientations du PLF.' },
              ]
            },
            {
              titre: 'La Cour des comptes', couleur: 'red', icone: <Scale className="h-4 w-4" />,
              roles: [
                { label: 'Rapport annuel (Art. 180 Constitution)', desc: 'Art. 82 pt. 3 et 87 : la Cour des comptes produit un rapport joint au projet de loi de reddition des comptes. L\'approbation de cette loi par le Parlement vaut quitus de la gestion du Gouvernement.' },
                { label: 'Controle des comptes publics', desc: 'La Cour vérifie la régularité des comptes des comptables publics, contrôle la bonne exécution du budget et sanctionne les irrégularites dans la gestion des deniers publics.' },
              ]
            },
          ].map(acteur => (
            <div key={acteur.titre} className={cn('rounded-xl border bg-card p-4', `border-${acteur.couleur}-200 dark:border-${acteur.couleur}-800`)}>
              <div className="flex items-center gap-2 mb-3">
                <div className={cn('rounded-lg p-1.5 text-white', `bg-${acteur.couleur}-600`)}>
                  {acteur.icone}
                </div>
                <h3 className="text-sm font-bold text-foreground">{acteur.titre}</h3>
              </div>
              <div className="space-y-2">
                {acteur.roles.map(r => (
                  <div key={r.label} className="flex gap-2 rounded-lg bg-muted/30 border border-border p-2.5">
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-500" />
                    <div>
                      <p className="text-xs font-bold text-foreground">{r.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l2q1',
            question: 'Selon l\'Art. 77 LOFIP, qui élaboré et soumet le projet de loi portant reddition des comptes ?',
            options: [
              { id: 'a', texte: 'Le Ministre du Budget' },
              { id: 'b', texte: 'Le Premier ministre' },
              { id: 'c', texte: 'Le Ministre ayant les Finances dans ses attributions' },
              { id: 'd', texte: 'La Cour des comptes' },
              { id: 'e', texte: 'Le President de la Republique' },
            ],
            reponseCorrecte: 'c',
            explication: 'L\'Art. 77 al. 3 LOFIP dispose : « A la clôture de l\'exercice, le ministre ayant les finances dans ses attributions élaboré et soumet au Conseil des ministres le projet de loi portant reddition des comptes du pouvoir central. » C\'est le Ministre des Finances (et non du Budget) qui est responsable de ce document de clôture d\'exercice.',
            articleRef: 'Art. 77 LOFIP'
          },
          {
            type: 'qcm', id: 'l2q2',
            question: 'Selon l\'Art. 85 LOFIP, comment les dépenses du budget sont-elles votees au Parlement ?',
            options: [
              { id: 'a', texte: 'Par titre de dépense (Titres I a IX) et source de financement' },
              { id: 'b', texte: 'Par ministère ou institution et par programme' },
              { id: 'c', texte: 'En un vote global unique pour l\'ensemble du budget' },
              { id: 'd', texte: 'Par nature de dépense (personnel, fonctionnement, investissement)' },
              { id: 'e', texte: 'Par region et par province beneficiaire' },
            ],
            reponseCorrecte: 'b',
            explication: 'L\'Art. 85 LOFIP dispose : « Les dépenses du budget du pouvoir central sont votees par ministère ou institution et par programme. » C\'est la traduction du budget-programme dans la procédure parlementaire : le Parlement vote les crédits programme par programme, et non plus par ligne budgétaire comme dans l\'ancien budget de moyens.',
            articleRef: 'Art. 85 LOFIP'
          },
        ]} />
      </div>
    )
  },
  {
    id: 'l3',
    icone: <FileText className="h-5 w-5" />,
    titre: 'Documents faisant partie integrale du PLF (Art. 78 LOFIP)',
    soustitre: 'Les 9 etats obligatoires joints au projet de loi de finances',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 p-4">
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2">Art. 78 LOFIP : Documents integrants</h3>
          <p className="text-xs text-foreground leading-relaxed">
            L\'Art. 78 LOFIP liste les documents qui <strong>font partie integrante</strong> du projet de loi de finances. Ils ont donc la meme force juridique que le corps de la loi. Leur absence rendrait le PLF incomplet et potentiellement irrecevable. Ces documents sont distincts des documents <em>accompagnant</em> le PLF (Art. 79) qui ont un caractere plus informatif.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">Les 9 etats faisant partie integrante (Art. 78)</h3>
          <div className="space-y-2">
            {[
              { num: '1', titre: 'Etat des recettes a caractere national', desc: 'Liste et evaluation des prévisions de recettes nationales avec les autorisations necessaires en matiere d\'impots, taxes, redevances et droits. C\'est l\'autorisation parlementaire de percevoir les recettes.', tooltip: 'L\'état des recettes est le fondement du consentement parlementaire a l\'impot. Sans cet état, aucune recette fiscale ne peut etre legalement percue.', loi: 'Art. 78 pt. 1 LOFIP' },
              { num: '2', titre: 'Etat de repartition des recettes par province', desc: 'Repartition des recettes a caractere national allouees a chaque province (les 40% constitutionnels, Art. 175 Constitution et Art. 24 LOFIP). Province par province.', tooltip: 'Cet état traduit concretement la retrocession de 40% des recettes nationales aux 26 provinces. Il permet de vérifier que chaque province recoit sa part constitutionnelle.', loi: 'Art. 78 pt. 2 LOFIP' },
              { num: '3', titre: 'Etat des prévisions de dépenses', desc: 'Detail des dépenses par ministère/institution, par programme, par titre et par source de financement pour l\'exercice. C\'est le coeur du budget en dépenses.', tooltip: 'Cet état détaillé est la traduction operationnelle du budget-programme. Il montre pour chaque programme les crédits par titre (I a IX) et par source (propres, dons, emprunts).', loi: 'Art. 78 pt. 3 LOFIP' },
              { num: '4', titre: 'Etat de l\'équilibre budgétaire et financier', desc: 'L\'état qui présente l\'équilibre global du budget (recettes = dépenses). Traduit la conformite au principe d\'équilibre budgétaire (Art. 14 LOFIP) et présente le solde global et le mode de financement du déficit eventuel.', tooltip: 'L\'équilibre budgétaire est un principe cardinal (Art. 14). Cet état demontre que le budget est équilibre en ressources et en charges, avec identification de toutes les sources de financement.', loi: 'Art. 78 pt. 4 LOFIP' },
              { num: '5', titre: 'CDMT actualise sur 3 ans', desc: 'Le Cadre des Depenses a Moyen Terme (CDMT) portant sur 3 ans, actualise par glissement annuel, détaillé par ministère/institution et programme. Traduit la pluriannualite budgétaire.', tooltip: 'Le CDMT (Art. 76) est l\'outil de programmation pluriannuelle des dépenses. Il montre les trajectoires de dépenses sur 3 ans par programme, permettant d\'identifier la soutenabilite budgétaire.', loi: 'Art. 78 pt. 5 LOFIP' },
              { num: '6', titre: 'Etat des autorisations d\'engagement pluriannuelles', desc: 'Les autorisations d\'engagement (AE) qui s\'etendent sur plusieurs exercices, par ministère/institution et par programme. Permet le suivi des engagements multi-annuels (investissements).', tooltip: 'Les autorisations d\'engagement pluriannuelles permettent de contractualiser des projets d\'investissement sur plusieurs années (ex: construction d\'un barrage) sans que toute la dépense soit dans un seul budget annuel.', loi: 'Art. 78 pt. 6 LOFIP' },
              { num: '7', titre: 'Etat des subventions et dotations', desc: 'Liste des subventions et dotations inscrites au budget général : établissements publics, entreprises publiques sous perfusion budgétaire, organismes prives d\'intérêt public.', tooltip: 'L\'état des subventions permet au Parlement de controler les transferts de l\'Etat vers ses satellites (entreprises publiques, établissements publics). Toute subvention doit figurer explicitement dans cet état.', loi: 'Art. 78 pt. 7 LOFIP' },
              { num: '8', titre: 'Plafonds d\'emplois remuneres', desc: 'Etat des plafonds d\'autorisations des emplois remuneres par le Pouvoir central, creation d\'emplois nouveaux et repartition des emplois autorises. C\'est l\'autorisation parlementaire des effectifs de la fonction publique.', tooltip: 'Le plafond d\'emplois est le nombre maximum d\'agents que chaque ministère peut employer. Sans cette autorisation parlementaire, aucun recrutement nouveau n\'est legal (Art. 51 LOFIP).', loi: 'Art. 78 pt. 8 LOFIP' },
              { num: '9', titre: 'Liste des budgets annexes et comptes speciaux', desc: 'Liste complete des budgets annexes et comptes speciaux avec les montants de recettes et dépenses prevus pour chacun. Traduit l\'obligation de transparence sur ces mecanismes derogatoires.', tooltip: 'Cette liste oblige le Gouvernement a presenter exhaustivement tous les mecanismes budgétaires derogatoires (budgets annexes Art. 55, comptes speciaux Art. 60). Aucun compte special ne peut exister sans figurer dans cette liste.', loi: 'Art. 78 pt. 9 LOFIP' },
            ].map(e => (
              <div key={e.num} className="flex gap-3 rounded-lg border border-border p-3 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                <span className="text-xs font-bold text-white bg-emerald-600 rounded-full h-5 w-5 flex items-center justify-center shrink-0 mt-0.5">{e.num}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-0.5">
                    <p className="text-xs font-bold text-foreground">{e.titre}</p>
                    <InfoTooltip texte={e.tooltip} loi={e.loi} />
                  </div>
                  <p className="text-xs text-muted-foreground">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l3q1',
            question: 'Selon l\'Art. 85 LOFIP, comment les evaluations de recettes sont-elles votees au Parlement ?',
            options: [
              { id: 'a', texte: 'Une par une, recette par recette' },
              { id: 'b', texte: 'Par vote d\'ensemble pour le titre sous lequel elles sont regroupees' },
              { id: 'c', texte: 'Par province beneficiaire des recettes' },
              { id: 'd', texte: 'Par nature de recette (fiscale, non fiscale, exterieure)' },
              { id: 'e', texte: 'Par regie financiere (DGI, DGDA, DGRAD)' },
            ],
            reponseCorrecte: 'b',
            explication: 'L\'Art. 85 al. 1 LOFIP dispose : « Les evaluations de recettes font l\'objet d\'un vote d\'ensemble pour le titre sous lequel elles sont regroupees dans le budget général et d\'un vote par budget annexe et par compte special. » Les recettes du budget général sont donc votees globalement par titre (ex : toutes les recettes fiscales ensemble), puis chaque budget annexe et compte special separement.',
            articleRef: 'Art. 85 LOFIP'
          },
          {
            type: 'qcm', id: 'l3q2',
            question: 'Parmi les documents suivants, lequel fait partie INTEGRANTE du PLF selon l\'Art. 78 (et non Art. 79) ?',
            options: [
              { id: 'a', texte: 'L\'expose général synthetisant le budget et la politique economique' },
              { id: 'b', texte: 'Le rapport d\'exécution du budget au premier semestre' },
              { id: 'c', texte: 'Le CDMT actualise sur 3 ans par ministère et programme' },
              { id: 'd', texte: 'Le rapport d\'evaluation de l\'exécution de l\'année precedente' },
              { id: 'e', texte: 'La declaration sur les risques budgétaires' },
            ],
            reponseCorrecte: 'c',
            explication: 'L\'Art. 78 pt. 5 LOFIP liste le CDMT (Cadre des Depenses a Moyen Terme) comme faisant PARTIE INTEGRANTE du PLF. L\'expose général (pt. 1), le rapport d\'exécution 1er semestre (pt. 3) et le rapport d\'evaluation de l\'année precedente (pt. 2) sont des documents ACCOMPAGNANT le PLF (Art. 79), sans la meme force juridique.',
            articleRef: 'Art. 78 et 79 LOFIP'
          },
        ]} />
      </div>
    )
  },
  {
    id: 'l4',
    icone: <Clock className="h-5 w-5" />,
    titre: 'Documents accompagnant le PLF (Art. 79 LOFIP)',
    soustitre: 'Les 13 documents informatifs joints au projet de loi de finances',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 p-4">
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2">Art. 79 LOFIP (modifie en 2023) : Documents accompagnants</h3>
          <p className="text-xs text-foreground leading-relaxed mb-2">
            Contrairement aux documents de l\'Art. 78 qui <em>font partie integrante</em> du PLF, les documents de l\'Art. 79 <em>accompagnent</em> le PLF. Ils ont un caractere principalement informatif et analytique. Leur absence n\'invalide pas juridiquement la loi de finances, mais constitue une violation de la LOFIP.
          </p>
          <p className="text-xs text-foreground leading-relaxed">
            La LOFIP modificative de 2023 a enrichi considerablement cette liste en ajoutant 8 nouveaux documents, passant de 5 a 13 documents accompagnants, refletant les exigences croissantes de transparence et de gouvernance des finances publiques.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">Documents originels de la LOFIP 2011 (Art. 79 pts. 1-5)</h3>
          <div className="space-y-2">
            {[
              { num: '1', titre: 'Expose général', desc: 'Synthese du budget, objectifs de politique economique et financiere, priorites, environnement economique international et national, perspectives CBMT et niveau d\'exécution du budget en cours.' },
              { num: '2', titre: 'Rapport d\'evaluation de l\'exécution N-1', desc: 'Rend compte des changements apportes a l\'orientation financiere du CDMT anterieur et analyse les conditions dans lesquelles a ete exécuté le budget de l\'exercice anterieur. Base du diagnostic budgétaire.' },
              { num: '3', titre: 'Rapport d\'exécution du budget au 1er semestre', desc: 'Point d\'avancement de l\'exécution budgétaire (recettes et dépenses) a la date du dépôt du PLF. Donne une visibilite sur la tendance annuelle. Utilise par le Parlement pour evaluer la credibilite des prévisions.' },
              { num: '4', titre: 'Projet de loi de reddition des comptes N-1 (si non encore depose)', desc: 'Si le projet de loi de reddition des comptes du dernier exercice clos n\'a pas encore ete depose (avant le 15 mai), il doit etre joint au PLF. Sinon : le rapport de la Cour des comptes le remplace.' },
              { num: '5', titre: 'Annexe explicative', desc: 'Analyse des prévisions de recettes, detail des crédits par titre, état des crédits a reporter, encours et echeances de la dette, restes a payer, restes a recouvrer.' },
            ].map(e => (
              <div key={e.num} className="flex gap-3 rounded-lg border border-border p-2.5">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 w-5 shrink-0 text-center">({e.num})</span>
                <div>
                  <p className="text-xs font-bold text-foreground">{e.titre}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10 p-4">
          <h3 className="text-sm font-bold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-500" /> Nouveaux documents ajoutes par la LOFIP mod. 2023 (pts. 6-13)
            <InfoTooltip texte="La LOFIP modificative de 2023 a ajouté 8 nouveaux documents obligatoires au PLF, renforçant les exigences de transparence budgétaire et alignant la RDC sur les normes internationales (FMI, Banque mondiale, OCDE). Ces nouveaux documents reflètent les engagements de la RDC dans le cadre du programme FMI 2021-2024." loi="LOFIP mod. 2023" />
          </h3>
          <div className="space-y-2">
            {[
              { num: '6', titre: 'Projets Annuels de Performance (PAP)', desc: 'Un PAP par programme, presentant la strategie, les objectifs, les indicateurs de performance et les cibles. Instrument central du budget-programme (Art. 43). Ajoute en 2023 pour institutionnaliser la gestion par la performance.' },
              { num: '7', titre: 'Plan d\'Engagement Budgetaire (PEB)', desc: 'Calendrier previsionnel des engagements de dépenses par programme et par trimestre. Permet de planifier les decaissements et d\'eviter les pics de fin d\'année caracteristiques des budgets mal programmes.' },
              { num: '8', titre: 'Plan de Tresorerie previsionnel', desc: 'Prevision mensuelle des encaissements et decaissements du Tresor. Essentiel pour la gestion de la liquidite de l\'Etat et l\'anticipation des tensions de tresorerie.' },
              { num: '9', titre: 'Plan de Passation des marches publics', desc: 'Programme previsionnel des marches publics a passer dans l\'année. Traduit les dépenses d\'investissement en commandes concretes, avec calendrier de passation.' },
              { num: '10', titre: 'Programme d\'Investissements Publics (PIP)', desc: 'Liste detaillee des projets d\'investissement public finances par le budget, avec leur stade d\'avancement, leur financement (propres, dons, emprunts) et leur impact attendu.' },
              { num: '11', titre: 'Rapport sur les dépenses fiscales', desc: 'Evalue le cout budgétaire des exonerations, reductions et exemptions fiscales accordees. Permet de mesurer l\'impact des niches fiscales sur les recettes de l\'Etat.' },
              { num: '12', titre: 'Rapport consolide des entreprises publiques', desc: 'Situation financiere consolidee des entreprises publiques : performances, subventions percues, dividendes verses, dettes garanties par l\'Etat.' },
              { num: '13', titre: 'Declaration sur les risques budgétaires', desc: 'Identification et quantification des risques pouvant affecter l\'exécution du budget : risques macro-economiques (taux de change, cours des matieres premieres), risques de passifs eventuels (garanties, litiges).' },
            ].map(e => (
              <div key={e.num} className="flex gap-3 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/10 p-2.5">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300 w-5 shrink-0 text-center">({e.num})</span>
                <div>
                  <p className="text-xs font-bold text-foreground">{e.titre}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l4q1',
            question: 'Combien de documents accompagnant le PLF la LOFIP mod. 2023 a-t-elle ajoutes a la liste initiale de l\'Art. 79 ?',
            options: [
              { id: 'a', texte: '3 documents supplementaires' },
              { id: 'b', texte: '5 documents supplementaires' },
              { id: 'c', texte: '8 documents supplementaires (de 5 a 13)' },
              { id: 'd', texte: '10 documents supplementaires' },
              { id: 'e', texte: '12 documents supplementaires (de 1 a 13)' },
            ],
            reponseCorrecte: 'c',
            explication: 'La LOFIP originelle de 2011 prevoyait 5 documents accompagnant le PLF (Art. 79 pts. 1-5). La LOFIP modificative de 2023 en a ajouté 8 : PAP (6), Plan d\'Engagement Budgetaire (7), Plan de Tresorerie (8), Plan de Passation des marches (9), Programme d\'Investissements Publics (10), Rapport dépenses fiscales (11), Rapport entreprises publiques (12) et Declaration risques budgétaires (13). Le total passe de 5 a 13 documents.',
            articleRef: 'Art. 79 LOFIP mod. 2023'
          },
          {
            type: 'qcm', id: 'l4q2',
            question: 'Le Plan de Tresorerie previsionnel (Art. 79 pt. 8, LOFIP mod. 2023) sert principalement a :',
            options: [
              { id: 'a', texte: 'Lister les marches publics a passer dans l\'année' },
              { id: 'b', texte: 'Prevoir mensuellement les encaissements et decaissements du Tresor pour gérer la liquidite de l\'Etat' },
              { id: 'c', texte: 'Etablir le bilan patrimonial de l\'Etat' },
              { id: 'd', texte: 'Evaluer le cout des exonerations fiscales' },
              { id: 'e', texte: 'Fixer les plafonds d\'emplois remuneres par le Pouvoir central' },
            ],
            reponseCorrecte: 'b',
            explication: 'Le Plan de Tresorerie previsionnel (Art. 79 pt. 8) est un outil de gestion de la liquidite de l\'Etat. Il prevoit mois par mois les entrees (recettes encaissees) et les sorties (dépenses decaissees) du Compte général du Tresor, permettant d\'anticiper les tensions de tresorerie et d\'eviter les defauts de paiement en cours d\'année. Il ne faut pas le confondre avec le Plan de Passation des marches (pt. 9) ou le Rapport sur les dépenses fiscales (pt. 11).',
            articleRef: 'Art. 79 pt. 8 LOFIP mod. 2023'
          },
        ]} />
      </div>
    )
  },
  {
    id: 'l5',
    icone: <TrendingUp className="h-5 w-5" />,
    titre: 'Budget-programme et demarche de performance (Art. 43, 230 LOFIP)',
    soustitre: 'PAP, RAP, programmes, gouvernance — Circulaire N° 004/ME/MIN.BUDGET/2025',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 p-4">
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2">
            Art. 43 et 230 LOFIP : Le basculement vers le budget-programme
            <InfoTooltip texte="L'Art. 43 LOFIP dispose que les dépenses du budget général sont regroupées par programme. L'Art. 230 LOFIP (modifié) organise la progressivité du basculement. La Circulaire N° 004/ME/MIN.BUDGET/2025 du Ministère du Budget précise les modalités pratiques pour l'exercice 2026." loi="Art. 43, 230 LOFIP ; Circulaire N° 004/ME/MIN.BUDGET/2025" />
          </h3>
          <p className="text-xs text-foreground leading-relaxed mb-2">
            L'Art. 43 LOFIP dispose que les crédits du budget général sont regroupés par <strong>programme</strong>, subdivisés en <strong>actions</strong>, elles-mêmes subdivisées en <strong>activités</strong>. Chaque programme représente un ensemble cohérent d'actions relevant d'un même ministère ou institution et concourant à la réalisation d'objectifs définis en termes de résultats.
          </p>
          <p className="text-xs text-foreground leading-relaxed mb-2">
            La Circulaire N° 004/ME/MIN.BUDGET/2025 (§ 234) précise : <em>« Le Gouvernement de la République entend concrétiser sa ferme volonté de basculer au budget en mode programme, conformément à la Loi relative aux Finances Publiques telle que modifiée à ce jour. »</em>
          </p>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3">
            <p className="text-xs font-bold text-blue-800 dark:text-blue-200 mb-1">Double présentation obligatoire en 2026 (§ 235 Circulaire)</p>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Pour l'exercice 2026, les ministères disposant de PAP validés doivent présenter leurs prévisions budgétaires en <strong>deux versions simultanées</strong> :
            </p>
            <ul className="mt-2 space-y-1 text-xs text-blue-700 dark:text-blue-300">
              <li className="flex items-start gap-2"><ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-blue-500" /><span><strong>Version classique :</strong> crédits par section, chapitre et nature budgétaire</span></li>
              <li className="flex items-start gap-2"><ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-blue-500" /><span><strong>Version en mode programme :</strong> crédits regroupés par section, programme, action et nature budgétaire</span></li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-emerald-600" /> Ministères pilotes 2026 (§ 236 Circulaire)
            <InfoTooltip texte="En application de l'Art. 230 LOFIP et de l'Art. 5 de la LF 2023, une nouvelle vague de ministères pilotes bascule au budget-programme en 2026. Ceux déjà en mode programme depuis la première vague conservent leur statut." loi="Art. 230 LOFIP ; § 236 Circulaire N° 004/ME/MIN.BUDGET/2025" />
          </h3>
          <div className="space-y-3">
            <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 p-3">
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2">Première vague (déjà en mode programme)</p>
              <div className="flex flex-wrap gap-1">
                {['Santé publique', 'Enseignement primaire, secondaire et technique', 'Agriculture', 'Pêche et Elevage', 'Développement rural', 'Défense nationale', 'Anciens combattants', 'Infrastructures et Travaux publics', 'Reconstruction', 'Enseignement supérieur et universitaire'].map(m => (
                  <span key={m} className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">{m}</span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/30 p-3">
              <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">Nouvelle vague 2026 (à titre expérimental)</p>
              <div className="flex flex-wrap gap-1">
                {['Recherche scientifique', 'Innovation technologique', 'Industrie', 'Transport et voies de communication', 'Environnement et développement durable', 'Energie (Ressource hydraulique et Electricité)', 'Urbanisme et Habitat', 'Genre, Famille et Enfant', 'Droits humains', 'Commerce extérieur', 'Affaires foncières', 'Formation professionnelle et métiers', 'Tourisme'].map(m => (
                  <span key={m} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Award className="h-4 w-4 text-emerald-600" /> Le Projet Annuel de Performance (PAP) — §§ 227-233 Circulaire
            <InfoTooltip texte="Le PAP est l'instrument central du budget-programme. Il est prévu à l'Art. 79 pt. 6 LOFIP (mod. 2023) comme document accompagnant obligatoire du PLF. La Circulaire § 228 précise sa nature juridique." loi="Art. 79 pt. 6 LOFIP ; §§ 227-233 Circulaire N° 004/ME/MIN.BUDGET/2025" />
          </h3>
          <div className="space-y-2">
            <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3">
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-200 mb-1">Définition juridique (§ 228 Circulaire)</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 italic">
                « La préparation du Projet Annuel de Performance (PAP) comme référentiel de prévisions budgétaires devra refléter le caractère d'un contrat écrit, non juridique, passé entre les intervenants de la chaine managériale budgétaire. Il constitue un engagement managérial portant sur un certain niveau de performance en échange de la mise à disposition de ressources, dans le respect de règles préétablies. »
              </p>
            </div>
            <div className="space-y-2">
              {[
                {
                  label: 'Structure du PAP', couleur: 'emerald',
                  items: [
                    'Stratégie du programme et objectifs généraux',
                    'Objectifs spécifiques (max 3 par programme — § 229)',
                    'Indicateurs de performance (max 3 par objectif)',
                    'Cibles à atteindre par exercice',
                    'Coûts associés et crédits alloués'
                  ]
                },
                {
                  label: 'Documents annexés au PAP (§ 232)', couleur: 'blue',
                  items: [
                    'Fiche de documentation des indicateurs',
                    'Plan de passation des marchés (historique N-3 à N-1 et projections N+1 à N+3)',
                    'Marchés en cours de l\'exercice N',
                    'Toute autre information pertinente'
                  ]
                }
              ].map(s => (
                <div key={s.label} className={`rounded-lg border border-${s.couleur}-200 dark:border-${s.couleur}-800 bg-${s.couleur}-50/30 dark:bg-${s.couleur}-900/10 p-3`}>
                  <p className={`text-xs font-bold text-${s.couleur}-700 dark:text-${s.couleur}-300 mb-2`}>{s.label}</p>
                  <ul className="space-y-1">
                    {s.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-xs text-foreground">
                        <ChevronRight className={`h-3.5 w-3.5 shrink-0 mt-0.5 text-${s.couleur}-500`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-emerald-600" /> Gouvernance des programmes — §§ 239-254 Circulaire
          </h3>
          <div className="space-y-2">
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs font-bold text-foreground mb-2">Structure des programmes (§ 239-240)</p>
              <ul className="space-y-1 text-xs text-foreground">
                {[
                  'Maximum 5 programmes par ministère ou institution (§ 239)',
                  'Programmes opérationnels : mettent en oeuvre les politiques publiques',
                  'Programme d\'administration générale : activités transversales de pilotage (Cabinet) et de support (Secrétariat général)',
                  'Cartographie administrative par programme obligatoire (§ 241)'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-500" /><span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs font-bold text-foreground mb-2">Le Responsable de Programme (§§ 246-254)</p>
              <ul className="space-y-1 text-xs text-foreground">
                {[
                  'Désigné parmi les hauts fonctionnaires des structures organiques existantes (§ 254 : ne crée pas d\'emploi nouveau)',
                  'En principe : le Secrétaire général est Responsable du programme Administration générale (§ 251)',
                  'Missions : piloter le programme, déterminer les objectifs spécifiques, affecter les moyens, contrôler les résultats (§ 253)',
                  'Exerce une autorité managériale sur tous les intervenants du programme, y compris les opérateurs de l\'Etat',
                  'Organise le dialogue de gestion du programme'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-500" /><span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs font-bold text-foreground mb-2">Evaluation du coût d'un programme — 6 étapes (§ 243)</p>
              <div className="space-y-1">
                {[
                  { num: '1', label: 'Inventaire des activités et tâches' },
                  { num: '2', label: 'Identification des moyens nécessaires' },
                  { num: '3', label: 'Evaluation quantitative et financière' },
                  { num: '4', label: 'Calcul du coût total de chaque activité (somme des coûts des tâches)' },
                  { num: '5', label: 'Calcul du coût total de chaque action (somme des coûts des activités)' },
                  { num: '6', label: 'Calcul du coût total du programme (somme des coûts des actions)' },
                ].map(e => (
                  <div key={e.num} className="flex gap-2 items-start">
                    <span className="text-xs font-bold text-white bg-emerald-600 rounded-full h-5 w-5 flex items-center justify-center shrink-0 mt-0.5">{e.num}</span>
                    <p className="text-xs text-foreground">{e.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10 p-3">
              <p className="text-xs font-bold text-amber-800 dark:text-amber-200 mb-1 flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5" /> Règle de discipline budgétaire (§ 244)</p>
              <p className="text-xs text-amber-700 dark:text-amber-300">
                « Aucune prévision budgétaire ne doit être présentée avec des besoins supplémentaires non couverts par les plafonds des dépenses. Cette discipline devra demeurer de rigueur tout au long du processus jusqu'à l'adoption du projet de loi de finances au Parlement. »
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">PAP vs RAP : l'aller-retour de la performance</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 p-3">
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2">PAP — Art. 79 pt. 6 LOFIP</p>
              <p className="text-xs text-muted-foreground mb-1">Joint au PLF au début de l'exercice</p>
              <ul className="space-y-1 text-xs text-foreground">
                <li className="flex gap-1"><ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-500" /><span>Prévisionnel : objectifs et cibles à atteindre</span></li>
                <li className="flex gap-1"><ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-500" /><span>Contrat managérial non juridique</span></li>
                <li className="flex gap-1"><ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-500" /><span>Engagement de performance en échange de ressources</span></li>
              </ul>
            </div>
            <div className="rounded-lg border border-violet-200 dark:border-violet-800 bg-violet-50/30 p-3">
              <p className="text-xs font-bold text-violet-700 dark:text-violet-300 mb-2">RAP — Art. 82 pt. 4 LOFIP</p>
              <p className="text-xs text-muted-foreground mb-1">Joint à la loi de reddition des comptes</p>
              <ul className="space-y-1 text-xs text-foreground">
                <li className="flex gap-1"><ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-violet-500" /><span>Rétrospectif : résultats réellement atteints</span></li>
                <li className="flex gap-1"><ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-violet-500" /><span>Compare objectifs PAP vs réalisations</span></li>
                <li className="flex gap-1"><ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-violet-500" /><span>Base du jugement parlementaire sur la performance</span></li>
              </ul>
            </div>
          </div>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l5bq1',
            question: 'Selon la Circulaire N° 004/ME/MIN.BUDGET/2025 (§ 228), quelle est la nature juridique du Projet Annuel de Performance (PAP) ?',
            options: [
              { id: 'a', texte: 'Un acte administratif unilatéral de portée réglementaire' },
              { id: 'b', texte: 'Un contrat synallagmatique entre le ministère et le Parlement' },
              { id: 'c', texte: 'Un engagement managérial non juridique passé entre les intervenants de la chaîne managériale budgétaire' },
              { id: 'd', texte: 'Une ordonnance-loi fixant les objectifs de performance par programme' },
              { id: 'e', texte: 'Une annexe informative sans portée normative ni managériale' },
            ],
            reponseCorrecte: 'c',
            explication: 'Le § 228 de la Circulaire N° 004/ME/MIN.BUDGET/2025 est explicite : le PAP « devra refléter le caractère d\'un contrat écrit, non juridique, passé entre les intervenants de la chaine managériale budgétaire. Il constitue un engagement managérial portant sur un certain niveau de performance en échange de la mise à disposition de ressources. » Il s\'agit donc d\'un outil de management interne, non d\'un acte juridique opposable devant les tribunaux.',
            articleRef: '§ 228 Circulaire N° 004/ME/MIN.BUDGET/2025 ; Art. 79 pt. 6 LOFIP'
          },
          {
            type: 'qcm', id: 'l5bq2',
            question: 'Selon la Circulaire N° 004/ME/MIN.BUDGET/2025 (§ 239), quel est le nombre maximum de programmes par ministère ou institution ?',
            options: [
              { id: 'a', texte: '3 programmes' },
              { id: 'b', texte: '4 programmes' },
              { id: 'c', texte: '5 programmes' },
              { id: 'd', texte: '7 programmes' },
              { id: 'e', texte: 'Aucune limite, selon les besoins sectoriels' },
            ],
            reponseCorrecte: 'c',
            explication: 'Le § 239 de la Circulaire N° 004/ME/MIN.BUDGET/2025 dispose : « Pour une gestion budgétaire ordonnée, la structure du budget en programmes doit être stable dans le temps. Pour éviter une gestion lourde et une trop grande dispersion des responsabilités, le nombre de programme est limité à un maximum de 5 (cinq) par Ministère ou Institution. » Cette limite vise à maintenir la lisibilité et la responsabilité dans la gestion budgétaire.',
            articleRef: '§ 239 Circulaire N° 004/ME/MIN.BUDGET/2025'
          },
        ]} />
      </div>
    )
  },
  {
    id: 'l6',
    icone: <Scale className="h-5 w-5" />,
    titre: 'Recevabilite des amendements et loi de reddition des comptes',
    soustitre: 'LOFIP Art. 86-87 - Limites du droit d\'amendement et quitus parlementaire',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 p-4">
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2">Art. 86 LOFIP : La règle d\'or des amendements budgétaires</h3>
          <p className="text-xs text-foreground leading-relaxed mb-2">
            L\'Art. 86 LOFIP traduit l\'Art. 127 de la Constitution. Il pose une règle d\'or : le Parlement peut amender le budget, mais ne peut pas le desequilibrer sans proposer de compensation.
          </p>
          <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3">
            <p className="text-xs text-foreground italic leading-relaxed">
              « Conformement a l\'article 127 de la Constitution, les amendements au projet de loi de finances ne sont pas recevables lorsque leur adoption a pour consequence, soit une diminution des recettes, soit un accroissement des dépenses, a moins qu\'ils ne soient assortis de propositions compensatoires. »
            </p>
            <p className="text-xs text-muted-foreground mt-1">Art. 86 al. 1 LOFIP</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Scale className="h-4 w-4 text-emerald-600" /> Amendements recevables et irrecevables
          </h3>
          <div className="space-y-2">
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
              <p className="text-xs font-bold text-red-800 dark:text-red-200 mb-2">AMENDEMENTS IRRECEVABLES (Art. 86)</p>
              <ul className="space-y-1 text-xs text-red-700 dark:text-red-300">
                <li className="flex items-start gap-2"><XCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-red-500" /><span>Tout amendement qui diminue les recettes SANS proposition compensatoire (ex : supprimer une taxe sans creer une autre recette equivalente)</span></li>
                <li className="flex items-start gap-2"><XCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-red-500" /><span>Tout amendement qui accroit les dépenses SANS proposition compensatoire (ex : augmenter les crédits d\'un programme sans reduire un autre ou identifier une nouvelle recette)</span></li>
                <li className="flex items-start gap-2"><XCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-red-500" /><span>Toute proposition de loi ou amendement parlementaire (hors PLF) qui cree ou aggrave une charge publique sans degager recettes ou economies correspondantes (Art. 86 al. 2 / Art. 134 Constitution)</span></li>
              </ul>
            </div>
            <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3">
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-200 mb-2">AMENDEMENTS RECEVABLES</p>
              <ul className="space-y-1 text-xs text-emerald-700 dark:text-emerald-300">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-500" /><span>Amendement diminuant une recette ET augmentant une autre recette d\'un montant equivalent ou superieur</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-500" /><span>Amendement accroissant les dépenses d\'un programme ET reduisant d\'autant les crédits d\'un autre programme</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-500" /><span>Amendement purement redactionnel (correction orthographique, precision d\'un libelle) sans impact financier</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3">
            <p className="text-xs font-bold text-amber-800 dark:text-amber-200 mb-1 flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5" /> Qui apprecie la recevabilité ?</p>
            <p className="text-xs text-amber-700 dark:text-amber-300">C\'est le President de l\'Assemblee nationale (ou du Senat) qui prononce l\'irrecevabilite d\'un amendement avant son examen en séance. En France (systeme similaire), le Gouvernement peut aussi opposer l\'irrecevabilite directement.</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> La loi portant reddition des comptes (Art. 81-82, 84, 87)
            <InfoTooltip texte="La loi portant reddition des comptes est l\'acte parlementaire par lequel le Parlement approuve ou desapprouve la maniere dont le Gouvernement a exécuté le budget de l\'exercice ecoule. Son approbation vaut 'quitus de la gestion' (Art. 87), soit un decharge formelle de responsabilite pour le Gouvernement." loi="Art. 87 LOFIP" />
          </h3>

          <div className="space-y-3">
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs font-bold text-foreground mb-2">Documents integrants de la loi de reddition (Art. 81)</p>
              <ul className="space-y-1 text-xs text-foreground">
                {[
                  'Synthese des recettes et dépenses de l\'exercice clos',
                  'Compte général du Tresor (situation consolidee de financement)',
                  'Etat comparatif recettes previsionnelles vs reelles',
                  'Etat comparatif crédits budgétaires vs dépenses reelles (engagement, liquidation, paiement)',
                  'Etat des operations de chaque budget annexe et compte special',
                  'Situation de la dette publique interne et externe',
                  'Etat comparatif autorisations d\'engagement vs dépenses engagees',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><span className="text-emerald-500 font-bold shrink-0">{i + 1}.</span><span>{item}</span></li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs font-bold text-foreground mb-2">Documents accompagnant la loi de reddition (Art. 82)</p>
              <ul className="space-y-1 text-xs text-foreground">
                {[
                  'Rapport explicatif des depassements et de la nature du résultat d\'exécution',
                  'Rapport d\'evaluation des conditions d\'exécution + degre d\'atteinte des objectifs par programme',
                  'Rapport de la Cour des comptes (Art. 180 Constitution)',
                  'Rapport Annuel de Performance (RAP) par programme',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><span className="text-blue-500 font-bold shrink-0">{i + 1}.</span><span>{item}</span></li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3">
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-200 mb-1">Art. 87 LOFIP : Le quitus parlementaire</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 italic mb-2">
                « Le projet de loi portant reddition des comptes du dernier exercice clos doit etre examine par le Parlement prealablement au vote du projet de la loi de finances de l\'année. Au regard des observations formulees par la Cour des comptes [...], l\'approbation des comptes par cette loi vaut quitus de la gestion du Gouvernement pour l\'exercice concerne. »
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">
                Le <strong>quitus</strong> est une decharge formelle de responsabilite : en approuvant la loi de reddition, le Parlement atteste que le Gouvernement a gère les finances publiques conformement aux autorisations parlementaires. Ce mecanisme est une condition du cycle budgétaire : on ne peut voter le budget de l\'année N+1 sans avoir approuve la gestion de l\'année N.
              </p>
            </div>
          </div>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l5q1',
            question: 'Selon l\'Art. 87 LOFIP, quand le Parlement doit-il examiner la loi portant reddition des comptes ?',
            options: [
              { id: 'a', texte: 'Apres le vote du projet de loi de finances de l\'année suivante' },
              { id: 'b', texte: 'Prealablement au vote du projet de loi de finances de l\'année suivante' },
              { id: 'c', texte: 'Simultanement au vote du PLF de l\'année suivante' },
              { id: 'd', texte: 'Au plus tard le 31 decembre de l\'année de l\'exercice clos' },
              { id: 'e', texte: 'Uniquement si la Cour des comptes en fait la demande' },
            ],
            reponseCorrecte: 'b',
            explication: 'L\'Art. 87 LOFIP est explicite : « Le projet de loi portant reddition des comptes du dernier exercice clos doit etre examine par le Parlement PREALABLEMENT au vote du projet de la loi de finances de l\'année. » Cette sequentialite garantit que le Parlement connait les résultats de la gestion passee avant d\'autoriser la gestion future. C\'est une condition du cycle budgétaire vertueux.',
            articleRef: 'Art. 87 LOFIP'
          },
          {
            type: 'qcm', id: 'l5q2',
            question: 'Selon l\'Art. 86 LOFIP, un amendement parlementaire qui propose d\'augmenter les crédits d\'un programme de 500 millions FC EST recevable si :',
            options: [
              { id: 'a', texte: 'Il est depose par au moins 10 deputes' },
              { id: 'b', texte: 'Il est accompagne d\'une reduction equivalente des crédits d\'un autre programme ou d\'une proposition de recette compensatoire' },
              { id: 'c', texte: 'Le ministère concerne a donne son accord ecrit' },
              { id: 'd', texte: 'Il est soutenu par le Gouvernement en séance' },
              { id: 'e', texte: 'Il est depose avant l\'ouverture des debats budgétaires' },
            ],
            reponseCorrecte: 'b',
            explication: 'L\'Art. 86 al. 1 LOFIP dispose que les amendements accroissant les dépenses ne sont pas recevables « a moins qu\'ils ne soient assortis de propositions compensatoires ». Un amendement augmentant les crédits d\'un programme de 500 millions FC doit donc simultanement proposer soit la reduction de 500 millions FC sur un autre programme, soit la creation d\'une recette equivalente. Le nombre de signataires, l\'accord du ministère ou le soutien gouvernemental ne rendent pas un amendement irrecevable recevable.',
            articleRef: 'Art. 86 LOFIP'
          },
        ]} />
      </div>
    )
  },
  {
    id: 'l7',
    icone: <Target className="h-5 w-5" />,
    titre: 'Les instruments opérationnels du budget-programme : PAP, RAP et PIP (Art. 43, 52, 53, 79 pt.6, 82 pt.4 LOFIP)',
    soustitre: 'Méthode d\'élaboration, canevas réglementaire et place dans la procédure budgétaire',
    contenu: (
      <div className="space-y-4">

        {/* INTRODUCTION */}
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 p-4">
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2">Fondements juridiques</h3>
          <p className="text-xs text-foreground leading-relaxed mb-2">
            Trois instruments opérationnels structurent le budget-programme en RDC :
          </p>
          <ul className="space-y-1 text-xs text-foreground">
            <li className="flex items-start gap-2"><ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-600" /><span><strong>PAP (Projet Annuel de Performance)</strong> : document annexé au PLF, fondé sur l\'Art. 79 pt. 6 LOFIP. Il traduit les programmes en objectifs mesurables et en crédits prévisionnels.</span></li>
            <li className="flex items-start gap-2"><ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-600" /><span><strong>RAP (Rapport Annuel de Performance)</strong> : document annexé à la loi de reddition des comptes, fondé sur l\'Art. 82 pt. 4 LOFIP. Il rend compte des résultats réellement atteints par rapport aux prévisions du PAP.</span></li>
            <li className="flex items-start gap-2"><ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-600" /><span><strong>PIP (Programme d\'Investissements Publics)</strong> : document triennal glissant annexé au PLF, fondé sur les Art. 52-53 LOFIP (AE/CP) et le Décret n° 23/18 du 31 mai 2023. Il programme les investissements de l\'État sur 3 ans.</span></li>
          </ul>
          <p className="text-xs text-muted-foreground mt-2 italic">Sources : Guide d\'élaboration des PAP et RAP (Ministère du Budget + Ministère des Finances, sous encadrement COREF, juillet 2021) ; PIP 2024-2026 (Ministère du Plan + Ministère du Budget, septembre 2023)</p>
        </div>

        {/* PARTIE I : STRUCTURATION EN PROGRAMMES */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-emerald-600" /> I. La structuration du budget en programmes : 5 étapes méthodologiques
            <InfoTooltip texte="Le Guide PAP/RAP (§5) impose de respecter 5 étapes avant de rédiger le premier PAP. Cette phase préparatoire est indispensable : un mauvais découpage en programmes invalide l'ensemble du PAP et du RAP." loi="Guide PAP/RAP, §5 ; Art. 43 LOFIP" />
          </h3>
          <p className="text-xs text-foreground leading-relaxed mb-3">
            Avant de rédiger le PAP, chaque ministère doit structurer son budget en programmes. Le Guide PAP/RAP (§5) prescrit 5 étapes séquentielles :
          </p>
          <div className="space-y-2">
            {[
              { num: '1', titre: 'Identification de la mission ministérielle', desc: 'Définir la finalité politique du ministère : quelle politique publique est-il chargé de mettre en œuvre ? Cette identification découle directement des attributions conférées par décret de nomination et de la lettre de cadrage gouvernemental.' },
              { num: '2', titre: 'Recensement des politiques sectorielles', desc: 'Lister toutes les politiques sectorielles du ministère (ex : pour le Ministère de la Santé : politique de santé primaire, politique hospitalière, politique du médicament, politique de santé au travail...). Chaque politique sectorielle constitue un candidat potentiel à un programme.' },
              { num: '3', titre: 'Regroupement en programmes', desc: 'Regrouper les politiques sectorielles en programmes cohérents. La règle est de 4 à 5 programmes maximum par ministère (§5 du Guide). Un programme a une durée de vie permanente (il ne change pas chaque année). Deux types coexistent : programmes opérationnels (qui produisent des biens ou services publics) et programme d\'administration générale (PAG, qui couvre les fonctions support transversales du ministère).' },
              { num: '4', titre: 'Définition des objectifs et indicateurs', desc: 'Pour chaque programme, définir 2 à 3 objectifs stratégiques maximum. À chaque objectif, rattacher 3 indicateurs de performance maximum. La règle est stricte (§229 Circulaire N° 004/ME/MIN.BUDGET/2025) : dépasser ces plafonds dilue la performance et rend impossible le suivi sérieux.' },
              { num: '5', titre: 'Désignation du Responsable de Programme (RProg)', desc: 'Nommer pour chaque programme un Responsable de Programme (RProg) de rang supérieur (directeur général ou équivalent). Le RProg est responsable de l\'atteinte des objectifs, de la gestion des crédits et de la préparation du PAP et du RAP de son programme. Un RProg ne peut cumuler la responsabilité de plusieurs programmes.' },
            ].map(e => (
              <div key={e.num} className="flex gap-3 rounded-lg border border-emerald-100 dark:border-emerald-900 bg-emerald-50/30 dark:bg-emerald-900/10 p-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">{e.num}</div>
                <div>
                  <p className="text-xs font-bold text-foreground mb-0.5">Étape {e.num} : {e.titre}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PARTIE II : LE RPROG */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-600" /> II. Le Responsable de Programme (RProg) : rôle et responsabilités
            <InfoTooltip texte="Le RProg est la clef de voûte du budget-programme. Sans RProg clairement identifié, ni le PAP ni le RAP ne peuvent être valablement signés. Le Guide PAP/RAP (§§249-254 Circulaire) décrit sa lettre de mission." loi="Circulaire N° 004/ME/MIN.BUDGET/2025, §§249-254" />
          </h3>
          <div className="rounded-lg border border-border bg-muted/30 p-3 mb-3">
            <p className="text-xs font-bold text-foreground mb-2">Qui est le RProg ?</p>
            <p className="text-xs text-foreground leading-relaxed">Le RProg est le haut fonctionnaire désigné par le ministre pour piloter un programme budgétaire. Il est responsable, devant le ministre, de l\'atteinte des objectifs de performance, de la bonne utilisation des crédits et de la production des documents réglementaires (PAP et RAP). Le Guide PAP/RAP indique que la désignation doit être formalisée par une <strong>lettre de mission</strong> définissant ses attributions, ses objectifs et ses moyens.</p>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {[
              { titre: 'Responsabilité de performance', desc: 'Le RProg s\'engage sur les objectifs et les indicateurs inscrits dans le PAP. En fin d\'exercice, il rend compte des résultats dans le RAP sous sa signature.' },
              { titre: 'Responsabilité financière', desc: 'Le RProg est l\'ordonnateur délégué des crédits de son programme. Il répartit les crédits entre les actions et les unités budgétaires sous sa responsabilité.' },
              { titre: 'Production des documents PAP et RAP', desc: 'Il assure la rédaction du PAP (prévisionnel) et du RAP (rendu compte) de son programme, en respectant strictement le canevas fixé par le Guide PAP/RAP.' },
              { titre: 'Dialogue de gestion interne', desc: 'Il organise les conférences de performance internes au ministère, en préparation des conférences de performance de la DGPPB (2ème quinzaine d\'avril).' },
            ].map((r, i) => (
              <div key={i} className="rounded-lg border border-border p-3">
                <p className="text-xs font-bold text-foreground mb-1">{r.titre}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PARTIE III : LES 4 TYPES D'INDICATEURS */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" /> III. Les 4 types d\'indicateurs de performance
            <InfoTooltip texte="Le Guide PAP/RAP distingue 4 types d'indicateurs selon ce qu'ils mesurent. Cette classification n'est pas décorative : chaque type d'indicateur répond à une question différente posée au programme." loi="Guide PAP/RAP, Partie I" />
          </h3>
          <p className="text-xs text-foreground leading-relaxed mb-3">Le Guide PAP/RAP distingue 4 catégories d\'indicateurs, chacune mesurant une dimension différente de la performance publique :</p>
          <div className="space-y-2">
            {[
              {
                type: 'Indicateurs d\'efficacité socioéconomique',
                question: 'Le programme change-t-il réellement la situation de la société ?',
                exemple: 'Taux de mortalité infantile (pour un programme Santé), Taux de scolarisation brut (pour un programme Éducation), Taux d\'accès à l\'eau potable (pour un programme Eau et Assainissement)',
                couleur: 'emerald'
              },
              {
                type: 'Indicateurs de qualité de service',
                question: 'Les usagers sont-ils bien servis ?',
                exemple: 'Délai moyen de traitement d\'un dossier, Taux de satisfaction des usagers, Pourcentage de services délivrés dans les délais réglementaires',
                couleur: 'blue'
              },
              {
                type: 'Indicateurs d\'efficience',
                question: 'L\'administration produit-elle ses résultats au meilleur coût ?',
                exemple: 'Coût unitaire d\'un vaccin administré, Coût moyen de construction d\'une salle de classe, Ratio dépenses d\'investissement / dépenses totales du programme',
                couleur: 'violet'
              },
              {
                type: 'Indicateurs de moyens (ou de produits)',
                question: 'Quels volumes d\'activité sont produits ?',
                exemple: 'Nombre de consultations médicales effectuées, Nombre de kilomètres de routes construites, Nombre de manuels scolaires distribués',
                couleur: 'amber'
              },
            ].map((ind, i) => (
              <div key={i} className={`rounded-lg border border-${ind.couleur}-200 dark:border-${ind.couleur}-800 bg-${ind.couleur}-50/30 dark:bg-${ind.couleur}-900/10 p-3`}>
                <p className={`text-xs font-bold text-${ind.couleur}-800 dark:text-${ind.couleur}-300 mb-1`}>{ind.type}</p>
                <p className="text-xs text-muted-foreground mb-1 italic">Question : {ind.question}</p>
                <p className="text-xs text-foreground"><strong>Exemples :</strong> {ind.exemple}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3">
            <p className="text-xs font-bold text-amber-800 dark:text-amber-200 mb-1 flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5" /> Règles de construction des indicateurs (Annexe I du Guide PAP/RAP)</p>
            <p className="text-xs text-amber-700 dark:text-amber-300">Pour chaque indicateur, une fiche doit être établie en interne, précisant : la définition de l\'indicateur, la méthode de calcul (numérateur et dénominateur si taux), l\'unité de mesure, la périodicité de collecte, le service responsable de la collecte des données, le mode de collecte (administrative ou enquête), le délai de disponibilité, l\'interprétation et les limites connues de l\'indicateur. Cette fiche est indispensable pour garantir la comparabilité des données dans le temps.</p>
          </div>
        </div>

        {/* PARTIE IV : CANEVAS DU PAP */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-emerald-600" /> IV. Canevas du PAP : comment rédiger chaque section
            <InfoTooltip texte="Le Guide PAP/RAP (Partie II) fournit un canevas détaillé qui est OBLIGATOIRE. Tout PAP produit hors de ce canevas est rejeté par la DGPPB lors des conférences de performance d'avril." loi="Guide PAP/RAP, Partie II, §§85-111" />
          </h3>
          <p className="text-xs text-foreground leading-relaxed mb-3">Le PAP se compose de deux grandes parties : la présentation du ministère dans son ensemble (Partie I) et le PAP de chaque programme (Partie II). Voici comment élaborer chaque section.</p>

          <div className="space-y-3">
            <div className="rounded-lg border border-emerald-100 dark:border-emerald-900 bg-emerald-50/20 dark:bg-emerald-900/5 p-3">
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-2">PARTIE I : Présentation globale du ministère</p>
              <div className="space-y-2">
                {[
                  { sec: 'I.1 - Présentation du ministère et de sa stratégie', desc: 'Décrire en 2 à 4 pages : la mission du ministère (sa finalité politique telle que définie par ses textes d\'organisation), les principales politiques sectorielles, les priorités inscrites dans le Programme National Stratégique de Développement (PNSD) qui relèvent du ministère, et les réformes en cours.' },
                  { sec: 'I.2 - Objectifs et indicateurs les plus représentatifs', desc: 'Présenter les 3 à 5 indicateurs phares du ministère (transversaux, d\'impact macro, non imputables à un seul programme). Ces indicateurs sont repris tels quels dans le RAP pour comparer prévision et réalisation. Tableau P-I.2 : pour chaque indicateur, renseigner les réalisations n-2 et n-1, la prévision n, et les cibles n+1, n+2, n+3.' },
                  { sec: 'I.3 - Crédits de paiement (CP) par programme : Tableau P-I.3', desc: 'Un tableau récapitule les crédits de paiement demandés dans le PLF pour chaque programme. Colonnes : année n-2 (réalisation), n-1 (LFI et LFR), année n (PLF), année n+1 et n+2 (prévisions). Ce tableau permet au Parlement de comparer la part relative de chaque programme dans le budget total du ministère.' },
                  { sec: 'I.4 - Crédits par titres : Tableaux P-I.4.1, P-I.4.2, P-I.4.3', desc: 'Trois tableaux décomposent les crédits : P-I.4.1 récapitule les autorisations d\'engagement (AE) par programme ; P-I.4.2 récapitule les crédits de paiement (CP) par programme avec distinction AE/CP ; P-I.4.3 récapitule les crédits de paiement par titres économiques (Titre III Personnel, Titre IV Biens, Titre V Prestations, Titre VI Transferts, Titre VII Équipements sur fin. int. et ext., Titre VIII Construction sur fin. int. et ext.).' },
                  { sec: 'I.5 - AE pluriannuelles : Tableau P-I.5', desc: 'Ce tableau présente, pour chaque programme, les AE ouvertes dans le PLF (année n+1) et leurs besoins futurs en CP pour les années n+2 et n+3 et au-delà. Une AE est une autorisation d\'engagement pluriannuelle : elle autorise l\'État à s\'engager contractuellement au-delà de l\'année en cours (Art. 52-53 LOFIP). Ce tableau est essentiel pour évaluer la soutenabilité budgétaire à moyen terme.' },
                  { sec: 'I.6 - Prévisions des effectifs : Tableau P-I.6', desc: 'Ventilation des emplois par grade (Hauts Fonctionnaires, Cadres Supérieurs, Agents de Collaboration, Agents d\'exécution) avec : emplois année n, départs en retraite, actions nouvelles (recrutements), projection emplois n+1. Colonnes financières : barème/base, glissement vieillesse techniçité (GVT), revalorisation indicaire, total masse salariale. Le GVT désigne l\'effet combiné de l\'ancienneté et des avancements.' },
                ].map((s, i) => (
                  <div key={i} className="rounded-lg border border-border p-2.5">
                    <p className="text-xs font-semibold text-foreground mb-1">{s.sec}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-blue-100 dark:border-blue-900 bg-blue-50/20 dark:bg-blue-900/5 p-3">
              <p className="text-xs font-bold text-blue-800 dark:text-blue-300 mb-2">PARTIE II : PAP par programme (une section par programme)</p>
              <p className="text-xs text-muted-foreground mb-2">Pour chaque programme k, le PAP comprend les sous-sections suivantes :</p>
              <div className="space-y-2">
                {[
                  { sec: 'II.2.1.1 - Périmètre du programme k', desc: 'Lister toutes les unités administratives (directions, services, établissements publics, sociétés commerciales) qui concourent aux objectifs du programme et dont les crédits sont inscrits dans le budget du programme. Mentionner tout changement de périmètre par rapport à l\'année précédente (réorganisation gouvernementale).' },
                  { sec: 'II.2.1.2 - Stratégie du programme k', desc: 'Rédiger en 2 à 3 pages la réflexion stratégique qui justifie les objectifs retenus. Analyser : la finalité de la politique publique concernée, l\'environnement de mise en oeuvre, les attentes des citoyens et des usagers, les ressources disponibles, les marges de manœuvre, les réformes planifiées. Cette section articule les objectifs et identifie leurs priorités.' },
                  { sec: 'II.2.1.3 - Objectifs et indicateurs : Tableau P-II.k.3.m', desc: 'Un tableau par objectif du programme. Format : Objectif m / Indicateur N° / Libellé / Unité de mesure / Réalisations n-2 et n-1 / Prévision n / Cibles n+1, n+2, n+3 / Source de données. Sous le tableau : précisions méthodologiques pour chaque indicateur (définition, méthode de calcul, commentaires). Le Guide précise que si l\'indicateur est un taux, il faut indiquer le numérateur et le dénominateur.' },
                  { sec: 'II.2.1.4 - Description des principales actions', desc: 'Pour chaque action du programme, expliquer : les moyens mis en oeuvre, les principales activités, le lien entre moyens-activités-produits-résultats. Cette section permet de comprendre comment le programme fonctionne concrètement. Elle présente également des données sur les produits prévus.' },
                  { sec: 'II.2.1.5 - Crédits de paiement par titres et actions : Tableaux P-II.k.5.1 et P-II.k.5.2', desc: 'P-II.k.5.1 : Évolution des CP du programme par titres sur 6 ans (n-2 réalisation, n-1 exécution, n LF, n+1 PLF, n+2 et n+3 prévisions). P-II.k.5.2 (facultatif) : même décomposition par action. Les commentaires expliquent les changements de structure par titre et par action, en distinguant effets d\'inflation, effets des décisions antérieures et changements de priorités.' },
                  { sec: 'II.2.1.6 - Investissements et AE du programme : Tableau P-II.k.6', desc: 'Pour les projets d\'un coût total supérieur à 10 millions de dollars, le PAP présente projet par projet : le coût total, la tranche engagée avant l\'année n, les AE de l\'année n, les AE du PLF n+1, et les engagements ultérieurs non encore effectués. Ce tableau évalue l\'impact financier des AE sur les années futures et permet d\'apprécier la soutenabilité des investissements.' },
                  { sec: 'II.2.1.7 à II.2.1.9 - Effectifs, opérateurs publics, recettes propres', desc: 'Évolution des effectifs du programme par grade pour l\'année du PLF. Pour les établissements publics sous tutelle : présentation succincte et tableau ressources/dépenses sur 6 ans. Pour les entreprises publiques en mission de service public : nature de la mission et coût financé par le budget de l\'État. Enfin, recettes propres des services (budgets annexes) non inscrites dans le budget général.' },
                ].map((s, i) => (
                  <div key={i} className="rounded-lg border border-border p-2.5">
                    <p className="text-xs font-semibold text-foreground mb-1">{s.sec}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PARTIE V : CANEVAS DU RAP */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Award className="h-4 w-4 text-emerald-600" /> V. Canevas du RAP : comment rendre compte des résultats
            <InfoTooltip texte="Le RAP est le pendant du PAP. Il utilise exactement les mêmes indicateurs, les mêmes tableaux, mais avec les réalisations effectives. La comparaison prévision/réalisation est au cœur du RAP (Art. 82 pt. 4 LOFIP)." loi="Art. 82 pt. 4 LOFIP ; Guide PAP/RAP, Partie III, §§112-129" />
          </h3>
          <p className="text-xs text-foreground leading-relaxed mb-3">
            Le RAP est annexé à la loi portant reddition des comptes (Art. 82 pt. 4 LOFIP). Il présente les résultats réellement atteints par chaque programme par rapport aux prévisions du PAP. Sa structure suit exactement celle du PAP, en substituant les prévisions par les réalisations.
          </p>

          <div className="space-y-2">
            <div className="rounded-lg border border-emerald-100 dark:border-emerald-900 bg-emerald-50/20 p-3">
              <p className="text-xs font-bold text-foreground mb-2">Partie III.1 : Présentation globale du ministère (pendant de la Partie I du PAP)</p>
              <div className="space-y-2">
                {[
                  { sec: 'III.1.1 - Aspects majeurs de l\'activité du ministère', desc: 'Bilan de 2 à 4 pages mettant en évidence les faits marquants de l\'année : principales actions du ministère, événements extérieurs ayant influencé les résultats (conflits, épidémies, catastrophes naturelles, variations de prix...), décisions politiques majeures affectant le programme. Ce bilan éclaire le lecteur sur le contexte d\'exécution.' },
                  { sec: 'III.1.2 - Indicateurs les plus représentatifs : résultats atteints (Tableau R-I.2)', desc: 'Reprendre les indicateurs phares du PAP (les mêmes que le tableau P-I.2) et renseigner les colonnes « Réalisation n-1 ». Commenter les écarts entre la prévision (PAP) et la réalisation : identifier les facteurs explicatifs (politiques, économiques, administratifs, climatiques). Ce tableau est le miroir exact du PAP correspondant.' },
                  { sec: 'III.1.3 - Exécution des crédits de paiement (Tableaux R-I.3.1 et R-I.3.2)', desc: 'R-I.3.1 : exécution des CP par programme sur 3 ans (n-3, n-2, n-1), avec pour chaque année : LFI, LFR, exécution, taux d\'exécution (Exécution/LFI). R-I.3.2 : même décomposition par titres économiques. Les commentaires expliquent les écarts entre budget initial (LFI) et réalisations. Un taux d\'exécution faible sur le Titre VII (équipements) ou VIII (construction) indique des problèmes d\'exécution du programme d\'investissement.' },
                  { sec: 'III.1.4 - Exécution des AE (Tableau R-I.4)', desc: 'Tableau présentant pour chaque programme : AE (LFI, LFR, réalisations), CP (LFI, LFR, réalisations), et Reste à payer = AE réalisées moins CP réalisés. Le Reste à payer représente les engagements contractuels de l\'État non encore payés : c\'est une information cruciale pour évaluer les besoins futurs de trésorerie.' },
                  { sec: 'III.1.5 - Évolution des effectifs (Tableau R-I.5)', desc: 'Comparer les emplois prévus (LFI) aux emplois réels par grade, pour chaque année n-3, n-2, n-1. Le ratio Réalisations/LFI mesure le degré de maîtrise des effectifs. Un écart important peut indiquer des recrutements non autorisés ou des départs non remplacés.' },
                ].map((s, i) => (
                  <div key={i} className="rounded-lg border border-border p-2.5">
                    <p className="text-xs font-semibold text-foreground mb-1">{s.sec}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-violet-100 dark:border-violet-900 bg-violet-50/20 dark:bg-violet-900/5 p-3">
              <p className="text-xs font-bold text-violet-800 dark:text-violet-300 mb-2">Partie III.2 : RAP par programme (pendant de la Partie II du PAP)</p>
              <div className="space-y-2">
                {[
                  { sec: 'III.2.1.1 - Bilan de la stratégie du programme k', desc: 'Cette section est le pendant de la section « Stratégie du programme » du PAP. Elle explique comment les activités du programme se sont déroulées par rapport aux axes stratégiques prévus. Elle identifie les écarts et leurs causes.' },
                  { sec: 'III.2.1.2 - Évolution des indicateurs (Tableau R-II.k.2)', desc: 'Tableau par objectif et par indicateur : Objectif k.1 / Indicateur k.1.1, k.1.2 / Unité de mesure / Réalisations n-3, n-2, n-1 / Prévision n-1 (issue du PAP) / Réalisation n-1. Les commentaires analysent les résultats indicateur par indicateur : comparer à la cible, mais aller au-delà (comparaisons régionales, internationales si pertinent, analyse des anomalies de performance).' },
                  { sec: 'III.2.1.3 - Actions du programme k', desc: 'Compte rendu des réalisations par actions : ce qui a été fait, les indicateurs de produits (ex : nombre de centrales électriques mises en service), les difficultés rencontrées et leurs causes. Référence aux tableaux d\'exécution des CP et des AE.' },
                  { sec: 'III.2.1.4 - Exécution financière : Tableaux R-II.k.4.1 et R-II.k.4.2', desc: 'R-II.k.4.1 (facultatif) : exécution des CP par action. R-II.k.4.2 : exécution des CP par titre sur 3 ans. Colonnes : n-3 exécution, n-2 exécution, n-1 (LFI, LFR, exécution, taux exécution/LFI). Les écarts action par action sont expliqués.' },
                  { sec: 'III.2.1.5 - Exécution des AE et grands projets (Tableaux R-II.k.5.1 et R-II.k.5.2)', desc: 'R-II.k.5.1 : exécution des AE par programme (AE et CP : LFI, LFR, réalisations, reste à payer). Pour les projets supérieurs à 10 millions de dollars : présentation projet par projet. R-II.k.5.2 : situation des grands projets en cours (coût total, engagements contractés avant n-1 et en n-1, paiements, reste à payer sur engagé, reste à engager).' },
                ].map((s, i) => (
                  <div key={i} className="rounded-lg border border-border p-2.5">
                    <p className="text-xs font-semibold text-foreground mb-1">{s.sec}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PARTIE VI : LE PIP */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" /> VI. Le Programme d\'Investissements Publics (PIP) : logique et élaboration
            <InfoTooltip texte="Le PIP est le troisième instrument opérationnel du budget-programme. Il programme les investissements de l'État sur 3 ans selon une logique de tranche annuelle (Budget d'Investissement) inscrite dans le PLF." loi="Art. 52-53 LOFIP ; Décret n° 23/18 du 31 mai 2023" />
          </h3>

          <div className="space-y-3">
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs font-bold text-foreground mb-2">Définition juridique et logique du PIP</p>
              <p className="text-xs text-foreground leading-relaxed mb-2">
                Le PIP est un document de programmation triennale glissante des investissements publics. Il est régi par le Décret n° 23/18 du 31 mai 2023 et s\'appuie sur les Art. 52-53 LOFIP (régime des autorisations d\'engagement et crédits de paiement). Chaque année, une tranche annuelle du PIP constitue le <strong>Budget d\'Investissement (BI)</strong>, qui est intégré dans le PLF comme partie de la loi de finances.
              </p>
              <p className="text-xs text-foreground leading-relaxed">
                Le PIP s\'articule avec le <strong>PPBSE (Programme de Planification Budgétisation Suivi et Évaluation)</strong>, cadre national de programmation des dépenses publiques qui lie les investissements aux priorités du Plan National Stratégique de Développement (PNSD) à travers ses 5 piliers.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs font-bold text-foreground mb-2">AE et CP dans le PIP (Art. 52-53 LOFIP)</p>
              <div className="space-y-2">
                <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-2.5">
                  <p className="text-xs font-bold text-blue-800 dark:text-blue-300 mb-1">Autorisation d\'Engagement (AE) - Art. 52 LOFIP</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">L\'AE est la limite supérieure des dépenses pouvant être juridiquement engagées par l\'État pendant l\'année pour couvrir les obligations pluriannuelles résultant de marchés ou de conventions. Elle autorise la signature du marché ou du contrat mais ne couvre pas nécessairement le paiement de la totalité dans l\'année.</p>
                </div>
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-2.5">
                  <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-1">Crédit de Paiement (CP) - Art. 53 LOFIP</p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">Le CP est la limite supérieure des dépenses pouvant être effectivement payées dans l\'année au titre des engagements contractés. Un projet peut être engagé (AE) en année n mais payé (CP) sur plusieurs années n, n+1, n+2.</p>
                </div>
                <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-2.5">
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-200 mb-1">Exemple de dissociation AE/CP dans le PIP</p>
                  <p className="text-xs text-amber-700 dark:text-amber-300">Un projet routier d\'un coût total de 30 M USD signé en 2026 : AE 2026 = 30 M USD (autorisation totale d\'engager le marché) ; CP 2026 = 10 M USD, CP 2027 = 10 M USD, CP 2028 = 10 M USD (paiements échelonnés selon l\'avancement des travaux). Cette dissociation permet de planifier les besoins de trésorerie annuels.</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs font-bold text-foreground mb-2">Nomenclature budgétaire des dépenses d\'investissement</p>
              <p className="text-xs text-foreground leading-relaxed mb-2">Le PIP distingue deux catégories de dépenses d\'investissement selon la nomenclature budgétaire de 2015 :</p>
              <div className="grid grid-cols-1 gap-2">
                <div className="rounded-lg border border-border p-2.5">
                  <p className="text-xs font-bold text-foreground">Titre VII : Equipements</p>
                  <p className="text-xs text-muted-foreground">Acquisitions de biens meubles durables : véhicules, matériels informatiques, équipements médicaux, mobiliers, outillage... Ces biens ont une durée de vie supérieure à un an et sont inscrits à l\'actif de l\'État. Se financent sur financement intérieur (FININT) et financement extérieur (FINEXT).</p>
                </div>
                <div className="rounded-lg border border-border p-2.5">
                  <p className="text-xs font-bold text-foreground">Titre VIII : Construction, réfection, réhabilitation, addition d\'ouvrages et acquisition immobilière</p>
                  <p className="text-xs text-muted-foreground">Travaux sur le patrimoine immobilier de l\'État : construction de bâtiments, routes, ponts, barrages, réseaux d\'eau ; réhabilitation d\'infrastructures existantes ; acquisition de terrains et immeubles. Se financent aussi sur FININT et FINEXT.</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs font-bold text-foreground mb-2">Le CISPIP et les instances de gouvernance du PIP</p>
              <p className="text-xs text-foreground leading-relaxed">Le <strong>CISPIP (Comité Interministériel de Supervision et de Pilotage de l\'Investissement Public)</strong> est l\'instance supérieure de gouvernance du PIP. Il veille à la cohérence des investissements avec les priorités nationales (PNSD), arbitre les priorités interministérielles et valide les inscriptions au PIP. Le Ministère du Plan assure le secrétariat technique du CISPIP. Les projets doivent être codifiés de manière unique dans le système de gestion des investissements publics pour éviter les doubles inscriptions.</p>
            </div>
          </div>
        </div>

        {/* PARTIE VII : CALENDRIER */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-600" /> VII. Calendrier de préparation des PAP, RAP et PIP (janvier à août)
            <InfoTooltip texte="Ce calendrier est extrait du Guide PAP/RAP (Partie I, §§39-55). Il montre que la préparation du PAP et du RAP est un processus continu sur 8 mois, qui se chevauche avec la préparation du PLF." loi="Guide PAP/RAP, Partie I ; Art. 13 et 76-77 LOFIP" />
          </h3>
          <div className="space-y-2">
            {[
              { mois: 'Janvier - Février', action: 'Travaux préparatoires du RAP', detail: 'Les RProg collectent les données d\'exécution de l\'exercice n-1 (bilans financiers, statistiques de performance, rapports d\'activité). La DGPPB établit les tableaux d\'exécution financière (CP, AE, taux d\'exécution par programme). Les rapports intermédiaires de performance sont consolidés.' },
              { mois: 'Mars', action: 'Élaboration simultanée PAP et RAP', detail: 'Les RProg travaillent en même temps sur le RAP n-1 (à finaliser) et sur les premières étapes du PAP n+1 (identification des priorités). La DGPPB tient les conférences bilatérales avec chaque ministère pour valider les résultats du RAP avant leur publication.' },
              { mois: '2ème quinzaine d\'avril', action: 'Conférences de performance (DGPPB)', detail: 'La DGPPB organise les conférences de performance avec chaque ministère. Ces conférences examinent : les résultats PAP de l\'année écoulée (qui alimenteront le RAP), les projections stratégiques pour le PAP n+1, la pertinence des indicateurs et la qualité des données. C\'est le moment où la DGPPB valide ou rejette les canevas.' },
              { mois: '1er juin', action: 'CBMT adopté en Conseil des ministres', detail: 'Conformément à l\'Art. 13 LOFIP, le CBMT est adopté en Conseil des ministres. Il fixe les plafonds de dépenses totaux par ministère pour les 3 années à venir. Le CBMT est transmis au Parlement pour information avant le vote du budget.' },
              { mois: 'Début juin', action: 'Notification des plafonds aux ministères', detail: 'Le Ministre du Budget notifie à chaque ministère son plafond de crédits pour le PLF n+1. Ce plafond est la contrainte financière centrale : le PAP doit être construit dans ce plafond. Si les besoins dépassent le plafond, le RProg doit prioriser ses objectifs.' },
              { mois: 'Fin juin', action: 'Conférence de gestion', detail: 'Conférence organisée par le Ministère du Budget avec chaque ministère pour arbitrer les demandes de crédits au-delà des plafonds. Les arbitrages portent sur les actions nouvelles (programmes non existants dans le budget courant) et les extensions de programmes existants.' },
              { mois: 'Mi-juillet', action: 'Examen des PAP par la DGPPB', detail: 'La DGPPB examine les premiers projets de PAP soumis par les ministères. Elle vérifie la conformité au canevas, la cohérence objectifs-indicateurs-crédits, et le respect des règles (4-5 programmes max, 3 objectifs max par programme, 3 indicateurs max par objectif). Les PAP non conformes sont retournés.' },
              { mois: 'Août', action: 'Conférences budgétaires et finalisation PAP', detail: 'Dernier round de négociations budgétaires. Les PAP sont finalisés et intégrés dans le dossier PLF. Le dépôt du PLF à l\'Assemblée nationale est fixé au 15 octobre au plus tard (Art. 77 LOFIP). Le PAP finalisé est joint comme document accompagnant obligatoire (Art. 79 pt. 6).' },
            ].map((e, i) => (
              <div key={i} className="flex gap-3 rounded-lg border border-border p-3">
                <div className="flex-shrink-0">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-1 rounded-lg block text-center min-w-[80px]">{e.mois}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground mb-0.5">{e.action}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{e.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SYNTHESE */}
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 p-4">
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-3">Synthèse : PAP, RAP, PIP - trois instruments, une logique</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-emerald-100 dark:bg-emerald-900/40">
                  <th className="border border-emerald-200 dark:border-emerald-800 px-2 py-1.5 text-left font-bold text-emerald-800 dark:text-emerald-300">Instrument</th>
                  <th className="border border-emerald-200 dark:border-emerald-800 px-2 py-1.5 text-left font-bold text-emerald-800 dark:text-emerald-300">Fondement</th>
                  <th className="border border-emerald-200 dark:border-emerald-800 px-2 py-1.5 text-left font-bold text-emerald-800 dark:text-emerald-300">Moment</th>
                  <th className="border border-emerald-200 dark:border-emerald-800 px-2 py-1.5 text-left font-bold text-emerald-800 dark:text-emerald-300">Contenu central</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['PAP', 'Art. 79 pt. 6 LOFIP', 'Annexé au PLF (avant vote)', 'Objectifs, indicateurs cibles, crédits prévisionnels par programme'],
                  ['RAP', 'Art. 82 pt. 4 LOFIP', 'Annexé à la loi de reddition', 'Résultats réels, écart prévision/réalisation, commentaires'],
                  ['PIP', 'Art. 52-53 LOFIP + Décret 23/18', 'Triennal glissant, intégré au PLF', 'Programmation des investissements AE/CP sur 3 ans'],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? '' : 'bg-emerald-50/30 dark:bg-emerald-900/5'}>
                    {row.map((cell, j) => (
                      <td key={j} className="border border-emerald-200 dark:border-emerald-800 px-2 py-1.5 text-foreground">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    )
  },
]

// ─── QCM GLOBAL 20 QUESTIONS ─────────────────────────────────────────────────
const QCM_GLOBAL: QCMQuestion[] = [
  {
    type: 'qcm', id: 'g1',
    question: 'Selon l\'Art. 13 LOFIP, le CBMT (Cadre Budgetaire a Moyen Terme) est adopté en Conseil des ministres au plus tard :',
    options: [{ id: 'a', texte: 'Le 1er mars' }, { id: 'b', texte: 'Le 1er juin' }, { id: 'c', texte: 'Le 15 septembre' }, { id: 'd', texte: 'Le 1er octobre' }, { id: 'e', texte: 'Le 15 novembre' }],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 13 al. 3 LOFIP dispose : « Adopte en Conseil des ministres au plus tard le 1er juin, ce document est transmis au Parlement au cours de la session budgétaire qui en debat avant le vote du budget du pouvoir central. » Le CBMT est la premiere étape du calendrier budgétaire annuel.',
    articleRef: 'Art. 13 LOFIP'
  },
  {
    type: 'qcm', id: 'g2',
    question: 'Selon l\'Art. 84 LOFIP, au plus tard quand le projet de loi de reddition des comptes doit-il etre depose a l\'Assemblee nationale ?',
    options: [{ id: 'a', texte: 'Le 31 mars de l\'année N+1' }, { id: 'b', texte: 'Le 15 mai de l\'année N+1' }, { id: 'c', texte: 'Le 30 juin de l\'année N+1' }, { id: 'd', texte: 'Le 15 septembre de l\'année N+1' }, { id: 'e', texte: 'Le 31 decembre de l\'année N' }],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 84 LOFIP dispose : « Le projet de loi portant reddition des comptes du dernier exercice clos [...] est depose a l\'Assemblee nationale, au plus tard le 15 mai de l\'année suivant celle de l\'exécution du budget auquel il se rapporte. » En cas d\'impossibilite, il peut etre depose avant la fin de la session ordinaire de mars.',
    articleRef: 'Art. 84 LOFIP'
  },
  {
    type: 'qcm', id: 'g3',
    question: 'L\'Assemblee nationale dispose de combien de jours pour adopter le PLF apres son dépôt (Art. 83 LOFIP) ?',
    options: [{ id: 'a', texte: '20 jours' }, { id: 'b', texte: '30 jours' }, { id: 'c', texte: '40 jours' }, { id: 'd', texte: '60 jours' }, { id: 'e', texte: '15 jours' }],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 83 al. 3 LOFIP dispose : « Dans tous les cas, l\'Assemblee Nationale dispose de 40 jours a compter de la date du dépôt pour adopter le projet de loi de finances de l\'année. » Si ce delai n\'est pas respecte, le PLF est transmis au Senat pour adoption dans les 20 jours (Art. 83 al. 4).',
    articleRef: 'Art. 83 LOFIP'
  },
  {
    type: 'qcm', id: 'g4',
    question: 'Selon l\'Art. 87 LOFIP, l\'approbation de la loi de reddition des comptes par le Parlement vaut :',
    options: [{ id: 'a', texte: 'Autorisation de contracter de nouveaux emprunts' }, { id: 'b', texte: 'Quitus de la gestion du Gouvernement pour l\'exercice concerne' }, { id: 'c', texte: 'Validation automatique du PLF de l\'année suivante' }, { id: 'd', texte: 'Decharge de responsabilite de la Cour des comptes' }, { id: 'e', texte: 'Dissolution du Parlement a l\'issue de la session budgétaire' }],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 87 al. 2 LOFIP dispose : « l\'approbation des comptes par cette loi vaut quitus de la gestion du Gouvernement pour l\'exercice concerne. » Le quitus est une decharge formelle de responsabilite : le Parlement atteste que le Gouvernement a gère les finances publiques conformement aux autorisations budgétaires.',
    articleRef: 'Art. 87 LOFIP'
  },
  {
    type: 'qcm', id: 'g5',
    question: 'Selon l\'Art. 78 LOFIP, combien de documents font partie INTEGRANTE du PLF ?',
    options: [{ id: 'a', texte: '5 documents' }, { id: 'b', texte: '7 documents' }, { id: 'c', texte: '9 documents' }, { id: 'd', texte: '13 documents' }, { id: 'e', texte: '11 documents' }],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 78 LOFIP liste 9 documents faisant partie integrante du PLF : état des recettes nationales (1), repartition recettes par province (2), prévisions dépenses (3), équilibre budgétaire et financier (4), CDMT 3 ans (5), autorisations d\'engagement pluriannuelles (6), subventions et dotations (7), plafonds d\'emplois (8), liste budgets annexes et comptes speciaux (9). Les 13 documents de l\'Art. 79 sont des documents ACCOMPAGNANTS (apres mod. 2023).',
    articleRef: 'Art. 78 LOFIP'
  },
  {
    type: 'qcm', id: 'g6',
    question: 'Lequel des elements suivants fait partie integrante du PLF (Art. 78) et NON des documents accompagnants (Art. 79) ?',
    options: [{ id: 'a', texte: 'L\'expose général' }, { id: 'b', texte: 'Le rapport d\'exécution du 1er semestre' }, { id: 'c', texte: 'L\'état des plafonds d\'emplois remuneres par le Pouvoir central' }, { id: 'd', texte: 'La declaration sur les risques budgétaires' }, { id: 'e', texte: 'Le rapport consolide des entreprises publiques' }],
    reponseCorrecte: 'c',
    explication: 'L\'état des plafonds d\'emplois remuneres (Art. 78 pt. 8) fait partie INTEGRANTE du PLF. L\'expose général (Art. 79 pt. 1), le rapport d\'exécution du 1er semestre (Art. 79 pt. 3) et la declaration sur les risques budgétaires (Art. 79 pt. 13 apres mod. 2023) sont des documents ACCOMPAGNANTS. La distinction est importante : les documents integrants ont la force juridique de la loi.',
    articleRef: 'Art. 78 et 79 LOFIP'
  },
  {
    type: 'qcm', id: 'g7',
    question: 'Un depute propose d\'augmenter de 2 milliards FC les crédits du programme Education en supprimant une subvention equivalente a une entreprise publique. Cet amendement est-il recevable selon l\'Art. 86 LOFIP ?',
    options: [{ id: 'a', texte: 'Non, seul le Gouvernement peut modifier les crédits des programmes' }, { id: 'b', texte: 'Oui, car il comporte une proposition compensatoire (reduction subvention)' }, { id: 'c', texte: 'Non, car il accroit les dépenses d\'un programme' }, { id: 'd', texte: 'Non, car la suppression de subventions n\'est pas une compensation valable' }, { id: 'e', texte: 'Oui, si le Gouvernement ne s\'y oppose pas en séance' }],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 86 al. 1 LOFIP dispose que les amendements accroissant les dépenses sont irrecevables « a moins qu\'ils ne soient assortis de propositions compensatoires. » Ici, l\'augmentation des crédits Education (+2 Mds FC) est compensee par la suppression d\'une subvention equivalente. La compensation est bien présente : l\'amendement est recevable. L\'Art. 86 n\'exige pas que la compensation soit dans le meme programme.',
    articleRef: 'Art. 86 LOFIP'
  },
  {
    type: 'qcm', id: 'g8',
    question: 'Selon l\'Art. 77 LOFIP, sous l\'autorité de qui le Ministre du Budget préparé-t-il le PLF ?',
    options: [{ id: 'a', texte: 'Le President de la Republique' }, { id: 'b', texte: 'Le Ministre des Finances' }, { id: 'c', texte: 'Le Premier ministre' }, { id: 'd', texte: 'Le President de l\'Assemblee nationale' }, { id: 'e', texte: 'Le Gouverneur de la Banque centrale' }],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 77 al. 1 LOFIP est explicite : « Sous l\'autorité du Premier ministre, le ministre ayant le budget dans ses attributions préparé [...] le projet de loi de finances de l\'année qui est présente au Gouvernement pour approbation avant sa transmission a l\'Assemblee nationale. » La préparation est une prerogative du Ministre du Budget, mais sous l\'autorité politique du Premier ministre.',
    articleRef: 'Art. 77 LOFIP'
  },
  {
    type: 'qcm', id: 'g9',
    question: 'Le Senat dispose de combien de jours pour voter le PLF si l\'Assemblee nationale n\'a pas vote dans le delai imparti (Art. 83) ?',
    options: [{ id: 'a', texte: '10 jours' }, { id: 'b', texte: '15 jours' }, { id: 'c', texte: '20 jours' }, { id: 'd', texte: '30 jours' }, { id: 'e', texte: '40 jours' }],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 83 al. 4 LOFIP dispose : « Si le projet de loi de finances de l\'année depose dans le delai constitutionnel n\'est pas vote dans les 40 jours suivant l\'ouverture de la session budgétaire, ledit projet est transmis au Senat pour etre adopté dans les 20 jours. » Le Senat dispose donc de 20 jours (contre 40 pour l\'Assemblee nationale).',
    articleRef: 'Art. 83 LOFIP'
  },
  {
    type: 'qcm', id: 'g10',
    question: 'Quel document, ajouté par la LOFIP mod. 2023, permet de quantifier le cout budgétaire des exonerations et exemptions fiscales accordees ?',
    options: [{ id: 'a', texte: 'Le Plan d\'Engagement Budgetaire' }, { id: 'b', texte: 'La Declaration sur les risques budgétaires' }, { id: 'c', texte: 'Le Rapport sur les dépenses fiscales' }, { id: 'd', texte: 'Le Rapport consolide des entreprises publiques' }, { id: 'e', texte: 'Le Programme d\'Investissements Publics' }],
    reponseCorrecte: 'c',
    explication: 'Le Rapport sur les dépenses fiscales (Art. 79 pt. 11, ajouté par la LOFIP mod. 2023) evalue le cout budgétaire des exonerations, reductions et exemptions fiscales accordees. Il permet de mesurer l\'impact des niches fiscales sur les recettes de l\'Etat. Il ne faut pas le confondre avec la Declaration sur les risques budgétaires (pt. 13) qui porte sur les risques macro-economiques et les passifs eventuels.',
    articleRef: 'Art. 79 pt. 11 LOFIP mod. 2023'
  },
  {
    type: 'qcm', id: 'g11',
    question: 'Selon l\'Art. 81 LOFIP, lequel des documents suivants fait partie INTEGRANTE de la loi portant reddition des comptes ?',
    options: [{ id: 'a', texte: 'Le rapport de la Cour des comptes' }, { id: 'b', texte: 'Le Rapport Annuel de Performance (RAP)' }, { id: 'c', texte: 'L\'état comparatif des crédits budgétaires et des dépenses reellement executees' }, { id: 'd', texte: 'Le rapport explicatif des depassements' }, { id: 'e', texte: 'La declaration d\'approbation de l\'exécutif' }],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 81 LOFIP liste les documents faisant partie INTEGRANTE de la loi de reddition, parmi lesquels l\'état comparatif des crédits budgétaires et des dépenses reellement executees (pt. 4). Le rapport de la Cour des comptes (Art. 82 pt. 3), le RAP (Art. 82 pt. 4) et le rapport explicatif des depassements (Art. 82 pt. 1) sont des documents ACCOMPAGNANT la loi de reddition (Art. 82), non des documents integrants.',
    articleRef: 'Art. 81 et 82 LOFIP'
  },
  {
    type: 'qcm', id: 'g12',
    question: 'Selon l\'Art. 83 LOFIP, si le Gouvernement n\'a pas depose le PLF 15 jours avant la fin de la session budgétaire (1er dec.), quelle est la consequence juridique ?',
    options: [{ id: 'a', texte: 'Le budget de l\'année precedente est reconduit' }, { id: 'b', texte: 'Le Premier ministre est mis en cause devant l\'Assemblee nationale' }, { id: 'c', texte: 'Le Gouvernement est repute demissionnaire (Art. 126 Constitution)' }, { id: 'd', texte: 'L\'Assemblee nationale est dissoute' }, { id: 'e', texte: 'Le Senat prend le relais pour voter le PLF en urgence' }],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 83 al. 6 LOFIP dispose : « Si quinze (15) jours avant la fin de la session budgétaire, soit le 1er decembre, le Gouvernement n\'a pas depose son projet de loi de finances de l\'année suivante, il est repute demissionnaire conformement a l\'article 126 de la Constitution. » Cette sanction constitutionnelle extreme vise a obliger le Gouvernement a respecter ses obligations budgétaires.',
    articleRef: 'Art. 83 LOFIP, Art. 126 Constitution'
  },
  {
    type: 'qcm', id: 'g13',
    question: 'Le document du CDMT (Art. 78 pt. 5) joint au PLF porte sur une periode de :',
    options: [{ id: 'a', texte: '1 an (exercice budgétaire)' }, { id: 'b', texte: '2 ans' }, { id: 'c', texte: '3 ans par glissement' }, { id: 'd', texte: '5 ans (plan quinquennal)' }, { id: 'e', texte: '7 ans (vision strategique)' }],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 78 pt. 5 LOFIP vise « le document du cadrage des dépenses a moyen terme pour les trois années a venir actualise par glissement et détaillé par ministère ou institution et programme. » Le CDMT porte donc sur 3 ans, actualise chaque année par glissement (l\'année N est retiree, l\'année N+3 est ajoutée). L\'Art. 76 confirme cette duree de 3 ans.',
    articleRef: 'Art. 78 pt. 5, Art. 76 LOFIP'
  },
  {
    type: 'qcm', id: 'g14',
    question: 'Selon l\'Art. 76 LOFIP, le Cadre des Depenses a Moyen Terme (CDMT) comprend trois elements. Lequel des suivants N\'en fait PAS partie ?',
    options: [{ id: 'a', texte: 'La determination des objectifs budgétaires pluriannuels en matiere de dépenses' }, { id: 'b', texte: 'L\'allocation des ressources aux secteurs selon les priorites strategies sectorielles' }, { id: 'c', texte: 'La liste des marches publics a passer dans l\'année' }, { id: 'd', texte: 'La mise en place d\'indicateurs de performance pour le suivi et le contrôle de l\'exécution' }, { id: 'e', texte: 'L\'evaluation du cout des exonerations fiscales accordees' }],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 76 LOFIP liste precisement les 3 elements du CDMT : (1) objectifs budgétaires pluriannuels en dépenses ; (2) allocation des ressources aux secteurs selon les priorites strategiques ; (3) indicateurs de performance pour le suivi et contrôle. La « liste des marches publics a passer dans l\'année » releve du Plan de Passation des Marches (Art. 79 pt. 9, LOFIP mod. 2023), non du CDMT.',
    articleRef: 'Art. 76 LOFIP'
  },
  {
    type: 'qcm', id: 'g15',
    question: 'Selon l\'Art. 83 LOFIP, si le PLF portant ouverture de crédits provisoires n\'est pas vote dans les 15 jours de son dépôt par l\'Assemblee nationale, que se passe-t-il ?',
    options: [{ id: 'a', texte: 'Le Senat vote a sa place dans les 10 jours' }, { id: 'b', texte: 'Il est mis en vigueur le 1er jour de l\'exercice par ordonnance-loi du President de la Republique' }, { id: 'c', texte: 'Le Gouvernement est repute demissionnaire' }, { id: 'd', texte: 'Les dépenses sont suspendues jusqu\'au vote' }, { id: 'e', texte: 'La Cour constitutionnelle statue d\'urgence sur sa validite' }],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 83 al. 8 LOFIP dispose : « A defaut de vote, dans les quinze (15) jours du dépôt, le projet de loi portant ouverture de crédits provisoires est mis en vigueur le premier jour de l\'exercice budgétaire par ordonnance-loi du President de la Republique deliberee en Conseil des ministres. » Ce mecanisme garantit la continuite du service de l\'Etat meme en l\'absence de vote parlementaire.',
    articleRef: 'Art. 83 LOFIP'
  },
  {
    type: 'qcm', id: 'g16',
    question: 'Selon la Circulaire N° 004/ME/MIN.BUDGET/2025 (§ 235), comment les ministères disposant d\'un PAP valide doivent-ils presenter leurs prévisions budgétaires pour l\'exercice 2026 ?',
    options: [{ id: 'a', texte: 'Uniquement en version classique (section, chapitre, nature)' }, { id: 'b', texte: 'Uniquement en version mode programme (programme, action, nature)' }, { id: 'c', texte: 'En deux versions simultanees : classique et mode programme' }, { id: 'd', texte: 'En version simplifie, avec seulement les grandes lignes par ministere' }, { id: 'e', texte: 'Par nature economique uniquement, selon l\'ancienne nomenclature' }],
    reponseCorrecte: 'c',
    explication: 'Le § 235 de la Circulaire N° 004/ME/MIN.BUDGET/2025 dispose que pour l\'exercice 2026, les ministères disposant de PAP validés en conférences de performance doivent présenter leurs prévisions en deux versions : la version classique (crédits par section, chapitre et nature budgétaire) et la version en mode programme (crédits regroupés par section, programme, action et nature budgétaire). Cette dualité est transitoire : elle permet le basculement progressif vers le budget-programme.',
    articleRef: '§ 235 Circulaire N° 004/ME/MIN.BUDGET/2025 ; Art. 230 LOFIP'
  },
  {
    type: 'qcm', id: 'g17',
    question: 'Selon la Circulaire N° 004/ME/MIN.BUDGET/2025 (§ 229), combien d\'objectifs spécifiques maximum un programme peut-il comporter ?',
    options: [{ id: 'a', texte: '1 objectif maximum' }, { id: 'b', texte: '2 objectifs maximum' }, { id: 'c', texte: '3 objectifs maximum' }, { id: 'd', texte: '5 objectifs maximum' }, { id: 'e', texte: 'Autant que nécessaire selon la politique sectorielle' }],
    reponseCorrecte: 'c',
    explication: 'Le § 229 de la Circulaire N° 004/ME/MIN.BUDGET/2025 dispose : « Les sectoriels, sous l\'accompagnement de la DGDSP, sont tenus d\'actualiser leurs cadres de performance et leurs PAP pour raison d\'efficacité. Les objectifs par programme doivent se limiter à trois (3) avec trois indicateurs au maximum par objectif. » La limite de 3 objectifs et 3 indicateurs garantit la lisibilité et la faisabilité de l\'évaluation de la performance.',
    articleRef: '§ 229 Circulaire N° 004/ME/MIN.BUDGET/2025'
  },
  {
    type: 'qcm', id: 'g18',
    question: 'Selon la Circulaire N° 004/ME/MIN.BUDGET/2025 (§ 254), la désignation d\'un Responsable de Programme a-t-elle pour effet de créer un emploi nouveau dans l\'administration ?',
    options: [{ id: 'a', texte: 'Oui, systématiquement : un poste de Responsable de Programme est créé dans l\'organigramme' }, { id: 'b', texte: 'Oui, mais uniquement pour les ministères pilotes de la première vague' }, { id: 'c', texte: 'Non : la désignation s\'effectue parmi les responsables qualifiés des structures organiques existantes' }, { id: 'd', texte: 'Non : le Responsable de Programme est obligatoirement le Ministre lui-même' }, { id: 'e', texte: 'Oui, car la LOFIP impose la création d\'une unité d\'exécution de programme' }],
    reponseCorrecte: 'c',
    explication: 'Le § 254 de la Circulaire N° 004/ME/MIN.BUDGET/2025 est explicite : « La désignation du Responsable de Programme ne crée pas d\'emploi nouveau. Elle doit s\'effectuer parmi les responsables qualifiés (Haut fonctionnaire) des structures organiques existantes. » Le § 251 précise que dans chaque ministère, le Secrétaire général est désigné Responsable du programme Administration générale.',
    articleRef: '§ 254 Circulaire N° 004/ME/MIN.BUDGET/2025'
  },
  {
    type: 'qcm', id: 'g19',
    question: 'Selon la Circulaire N° 004/ME/MIN.BUDGET/2025 (§ 243), quelle est la 4ème étape de l\'evaluation du coût d\'un programme ?',
    options: [{ id: 'a', texte: 'Calcul du coût total du programme (somme des coûts des actions)' }, { id: 'b', texte: 'Identification des moyens nécessaires' }, { id: 'c', texte: 'Calcul du coût total de chaque action (somme des coûts des activités)' }, { id: 'd', texte: 'Calcul du coût total de chaque activité (somme des coûts des tâches)' }, { id: 'e', texte: 'Evaluation quantitative et financière des moyens' }],
    reponseCorrecte: 'd',
    explication: 'Le § 243 de la Circulaire N° 004/ME/MIN.BUDGET/2025 liste 6 étapes : (1) Inventaire des activités et tâches ; (2) Identification des moyens ; (3) Evaluation quantitative et financière ; (4) Calcul du coût total de chaque activité (somme des coûts des tâches) ; (5) Calcul du coût total de chaque action (somme des coûts des activités) ; (6) Calcul du coût total du programme (somme des coûts des actions). La 4ème étape est donc le calcul du coût de chaque activité.',
    articleRef: '§ 243 Circulaire N° 004/ME/MIN.BUDGET/2025'
  },
  {
    type: 'qcm', id: 'g20',
    question: 'Selon l\'Art. 43 LOFIP, les crédits du budget général sont regroupés par programmes, eux-mêmes subdivisés en actions, puis en activités. Selon la Circulaire N° 004/ME/MIN.BUDGET/2025 (§ 230), les objectifs d\'impact ou d\'effet sont alignés à quel niveau ?',
    options: [{ id: 'a', texte: 'Au niveau des activités' }, { id: 'b', texte: 'Au niveau des actions' }, { id: 'c', texte: 'Au niveau du programme' }, { id: 'd', texte: 'Au niveau du ministère' }, { id: 'e', texte: 'Au niveau de la loi de finances dans son ensemble' }],
    reponseCorrecte: 'c',
    explication: 'Le § 230 de la Circulaire N° 004/ME/MIN.BUDGET/2025 dispose : « Seuls les objectifs d\'impact ou d\'effet seront alignés au niveau du programme, tandis que les objectifs des produits doivent être rattachés aux actions ou aux activités. » La hiérarchie des objectifs suit ainsi la hiérarchie budgétaire : impact/effet au programme, produits aux actions/activités.',
    articleRef: '§ 230 Circulaire N° 004/ME/MIN.BUDGET/2025 ; Art. 43 LOFIP'
  },
  {
    type: 'qcm', id: 'g21',
    question: 'Selon le Guide d\'élaboration des PAP et RAP (Ministère du Budget, juillet 2021), quelle est la limite maximale de programmes par ministère prescrite par ce guide ?',
    options: [
      { id: 'a', texte: '2 à 3 programmes maximum' },
      { id: 'b', texte: '4 à 5 programmes maximum' },
      { id: 'c', texte: '6 à 8 programmes maximum' },
      { id: 'd', texte: '10 programmes maximum' },
      { id: 'e', texte: 'Aucune limite : le ministere decide librement' },
    ],
    reponseCorrecte: 'b',
    explication: 'Le Guide d\'élaboration des PAP et RAP (§5) prescrit de 4 à 5 programmes maximum par ministère. Cette limite n\'est pas arbitraire : trop de programmes pulvérise les responsabilités, rend impossible un suivi sérieux de la performance et dilue les crédits. Chaque programme doit correspondre à une politique publique cohérente et permanente. La durée de vie d\'un programme est permanente : il ne change pas d\'une année à l\'autre sauf réorganisation gouvernementale majeure.',
    articleRef: 'Guide PAP/RAP, §5 (Ministère du Budget + Ministère des Finances, COREF, juillet 2021)'
  },
  {
    type: 'qcm', id: 'g22',
    question: 'Selon le Guide d\'élaboration des PAP et RAP, lequel des éléments suivants fait partie INTÉGRANTE du canevas obligatoire du PAP par programme (Partie II), et non de la Partie I (présentation du ministère) ?',
    options: [
      { id: 'a', texte: 'Le tableau P-I.3 (credits de paiement par programme)' },
      { id: 'b', texte: 'Le tableau P-I.6 (ventilation des effectifs globaux du ministere)' },
      { id: 'c', texte: 'La section II.2.1.2 (stratégie du programme k)' },
      { id: 'd', texte: 'Les indicateurs les plus représentatifs de la politique ministérielle' },
      { id: 'e', texte: 'Le tableau P-I.5 (AE pluriannuelles de l\'année n+1)' },
    ],
    reponseCorrecte: 'c',
    explication: 'La section II.2.1.2 (stratégie du programme k) relève de la Partie II du PAP, c\'est-à-dire du PAP par programme. Elle explique la réflexion stratégique qui a présidé au choix des objectifs du programme k. Les tableaux P-I.3, P-I.5, P-I.6 et les indicateurs représentatifs de la politique ministérielle relèvent tous de la Partie I (présentation globale du ministère), qui concerne le ministère dans son ensemble et non un programme spécifique.',
    articleRef: 'Guide PAP/RAP, Partie I (§§85-94) et Partie II (§§95-111)'
  },
  {
    type: 'qcm', id: 'g23',
    question: 'Selon le Guide PAP/RAP, le Rapport Annuel de Performance (RAP) présente l\'exécution des autorisations d\'engagement (Tableau R-I.4). Que mesure le « Reste à payer » dans ce tableau ?',
    options: [
      { id: 'a', texte: 'Les crédits de paiement non consommés et annulés en fin d\'exercice' },
      { id: 'b', texte: 'Les AE réalisées diminuées des CP réellement payés, représentant les engagements contractuels non encore décaissés' },
      { id: 'c', texte: 'Les AE reportées de l\'exercice précédent non encore utilisées' },
      { id: 'd', texte: 'La différence entre le budget initial (LFI) et le budget rectifié (LFR)' },
      { id: 'e', texte: 'Le montant des projets inscrits au PIP mais non encore engagés contractuellement' },
    ],
    reponseCorrecte: 'b',
    explication: 'Le Reste à payer = AE réalisées MOINS CP réalisés (colonne (3) MOINS colonne (6) du Tableau R-I.4). Il représente les engagements contractuels de l\'État (marchés signés, conventions conclues) pour lesquels le paiement effectif n\'a pas encore été opéré. C\'est une dette de l\'État envers ses contractants : elle grève les crédits futurs (CP) des exercices n+1, n+2, n+3. Ce concept est fondé sur la dissociation AE/CP instaurée par les Art. 52-53 LOFIP.',
    articleRef: 'Art. 52-53 LOFIP ; Guide PAP/RAP, §115 (Tableau R-I.4)'
  },
  {
    type: 'qcm', id: 'g24',
    question: 'Le Guide PAP/RAP distingue 4 types d\'indicateurs de performance. Parmi les indicateurs suivants, lequel relève de la catégorie des « indicateurs d\'efficience » ?',
    options: [
      { id: 'a', texte: 'Taux de mortalite infantile pour 1 000 naissances' },
      { id: 'b', texte: 'Nombre de consultations médicales effectuées dans l\'année' },
      { id: 'c', texte: 'Taux de satisfaction des usagers dans les hopitaux publics' },
      { id: 'd', texte: 'Coût unitaire par consultation médicale effectuée en hôpital de référence' },
      { id: 'e', texte: 'Nombre de personnels de santé recrutés dans l\'année' },
    ],
    reponseCorrecte: 'd',
    explication: 'Le Guide PAP/RAP classe les indicateurs en 4 types : (1) efficacité socioéconomique (impact sur la société, ex : taux de mortalité infantile) ; (2) qualité de service (satisfaction usager, délais) ; (3) efficience (rapport coût/production, ex : coût unitaire par consultation) ; (4) moyens ou produits (volumes d\'activité, ex : nombre de consultations, nombre de personnels recrutés). L\'indicateur « coût unitaire par consultation » mesure si l\'hôpital produit ses consultations au meilleur coût : c\'est un indicateur d\'efficience.',
    articleRef: 'Guide PAP/RAP, Partie I (classification des indicateurs)'
  },
  {
    type: 'qcm', id: 'g25',
    question: 'Selon le Decret n° 23/18 du 31 mai 2023 et les Art. 52-53 LOFIP, le Programme d\'Investissements Publics (PIP) est qualifie de « triennal glissant ». Que signifie cette qualification ?',
    options: [
      { id: 'a', texte: 'Le PIP est adopté tous les 3 ans par la loi de finances et ne peut être modifié pendant cette période' },
      { id: 'b', texte: 'Le PIP couvre toujours les 3 prochaines années et est actualisé chaque année : l\'année écoulée en sort et une nouvelle année y entre' },
      { id: 'c', texte: 'Le PIP est divisé en trois tranches égales de crédits qui glissent d\'un programme à l\'autre selon les besoins' },
      { id: 'd', texte: 'Seul le tiers des projets du PIP peut être exécuté chaque année budgétaire' },
      { id: 'e', texte: 'Le PIP est rédigé par 3 ministères en rotation annuelle sous la supervision du CISPIP' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'adjectif « triennal glissant » signifie que le PIP programme toujours les 3 prochaines années, mais est actualisé chaque année. Concrètement : le PIP 2024-2026 couvre 2024, 2025 et 2026. L\'année suivante, il devient le PIP 2025-2027 (2024 est exécutée et sort du cadre, 2027 entre). La tranche annuelle du PIP (Budget d\'Investissement = BI) est intégrée dans le PLF comme partie de la loi de finances de l\'année. Ce mécanisme permet de maintenir une vision pluriannuelle tout en actualisant les priorités chaque année. Source : PIP 2024-2026 (Ministère du Plan + Ministère du Budget, septembre 2023).',
    articleRef: 'Art. 52-53 LOFIP ; Decret n° 23/18 du 31 mai 2023 ; PIP 2024-2026'
  },
]

// ─── CAS PRATIQUES ────────────────────────────────────────────────────────────
const ETUDES_DE_CAS = [
  {
    titre: 'Cas pratique 1 : Analyse d\'une procédure budgétaire irreguliere',
    contexte: `Le 20 novembre 2025, le Gouvernement de la RDC n\'a toujours pas depose le projet de loi de finances 2026 a l\'Assemblee nationale. La session budgétaire ordinaire se clôture le 15 decembre.

Par ailleurs, l\'Assemblee nationale a examine un projet de loi ordinaire propose par un groupe de deputes, visant a :
- Augmenter de 5 milliards FC les crédits du programme Sante (sans mesure compensatoire)
- Reduire de 20% les taux de TVA sur les produits alimentaires de base (sans compensation)
- Creer un nouveau Fonds de Developpement Rural (FDR) et lui affecter 3 milliards FC de crédits preleves sur le budget général

Parallelement, le Parlement n\'a pas encore examine la loi de reddition des comptes 2024, bien qu\'elle ait ete deposee le 30 avril 2025.`,
    questions: [
      {
        num: '1',
        enonce: 'Analysez la situation du Gouvernement au 20 novembre 2025 par rapport a ses obligations constitutionnelles et legales. Quelles sont les consequences juridiques du non-dépôt du PLF 2026 ?',
        correction: `ANALYSE JURIDIQUE DE LA SITUATION :

DATE DE REFERENCE : 20 novembre 2025

OBLIGATION LOFIP (Art. 83 al. 1) : Le PLF devait etre depose au plus tard le 15 septembre 2025.
RETARD CONSTATE : 66 jours de retard au 20 novembre.

SEUIL CRITIQUE ATTEINT ? : 
La sanction du Gouvernement repute demissionnaire s\'applique si le PLF n\'est pas depose « 15 jours avant la fin de la session budgétaire, soit le 1er decembre » (Art. 83 al. 6).
- Au 20 novembre : 11 jours avant le 1er decembre. LE SEUIL EST ATTEINT.

CONSEQUENCE JURIDIQUE (Art. 83 al. 6 + Art. 126 Constitution) :
Le Gouvernement EST REPUTE DEMISSIONNAIRE depuis le 1er decembre (ou le 20 novembre si la session se clôture avant).

PROCEDURE D\'URGENCE :
Le Gouvernement doit deposer avant le 15 decembre un projet de loi portant ouverture de crédits provisoires (Art. 83 al. 7). Si ce projet n\'est pas vote dans les 15 jours, il est mis en vigueur par ordonnance-loi du President (Art. 83 al. 8). Les crédits provisoires sont executes jusqu\'au 31 janvier si le PLF avait ete depose avant le 1er decembre, ou jusqu\'au vote de la LF si le Gouvernement est demissionnaire.

CONCLUSION : La situation est une violation grave de la Constitution (Art. 126) et de la LOFIP (Art. 83). Le Gouvernement est expose a la presomption de demission.`
      },
      {
        num: '2',
        enonce: 'Evaluez la recevabilité de chacune des trois propositions de l\'Assemblee nationale au regard de l\'Art. 86 LOFIP et de l\'Art. 127 de la Constitution.',
        correction: `ANALYSE DE RECEVABILITE - ART. 86 LOFIP / ART. 127 CONSTITUTION :

PROPOSITION 1 : Augmentation de 5 milliards FC des crédits du programme Sante (sans mesure compensatoire)
VERDICT : IRRECEVABLE
MOTIF : Art. 86 al. 1 LOFIP : les amendements ne sont pas recevables s\'ils entrainent « un accroissement des dépenses [...] a moins qu\'ils ne soient assortis de propositions compensatoires. » Ici, aucune compensation n\'est proposee. Le President de l\'Assemblee doit rejeter cet amendement avant son examen en séance.

PROPOSITION 2 : Reduction de 20% des taux de TVA sans compensation
VERDICT : IRRECEVABLE
MOTIF : Art. 86 al. 1 LOFIP : les amendements ne sont pas recevables s\'ils entrainent « une diminution des recettes [...] a moins qu\'ils ne soient assortis de propositions compensatoires. » La reduction de TVA diminue les recettes de l\'Etat. Sans compensation (autre recette ou reduction de dépense equivalente), elle est irrecevable. De plus, l\'Art. 86 al. 2 (Art. 134 Constitution) precise que les propositions de loi des membres du Parlement « ne sont pas recevables lorsque leur adoption aurait pour consequence [...] une diminution des ressources publiques [...] a moins qu\'ils ne soient assortis de propositions degageant les recettes ou les economies correspondantes. »

PROPOSITION 3 : Creation d\'un FDR et affectation de 3 milliards FC
VERDICT : DOUBLEMENT IRRECEVABLE
MOTIF 1 (Art. 43 al. 3 LOFIP) : La creation d\'un nouveau programme budgétaire « ne peut resulter que d\'une loi de finances d\'initiative gouvernementale. » L\'Assemblee ne peut pas creer un programme par voie d\'amendement parlementaire.
MOTIF 2 (Art. 50 LOFIP) : « Aucun virement ni transfert ne peut etre effectue au profit d\'un programme non prevu par une loi de finances. » Meme si le FDR existait, le prelevemennt de 3 Mds sur le budget général sans habilitation legale prealable violerait l\'Art. 50.

SYNTHESE : Les trois propositions sont irrecevables. Le President de l\'Assemblee nationale doit les rejeter d\'office.`
      },
    ]
  },
  {
    titre: 'Cas pratique 2 : Construction et analyse du calendrier budgetaire 2026',
    contexte: `Pour la preparation du budget 2026 de la RDC, les informations suivantes sont disponibles :

- Le CBMT 2026-2028 a ete adopte en Conseil des ministres le 25 juin 2025
- Le debat d\'orientation budgetaire s\'est tenu a l\'Assemblee nationale le 10 juillet 2025
- Le PLF 2026 a ete depose a l\'Assemblee nationale le 28 octobre 2025
- L\'Assemblee nationale a adopte le PLF le 12 decembre 2025 (44 jours apres le depot)
- Le Senat a adopte le PLF le 28 decembre 2025
- La loi de finances 2026 a ete promulguee le 5 janvier 2026
- Le projet de loi de reddition des comptes 2024 a ete depose le 30 avril 2025
- Le Parlement n\'avait pas encore examine la loi de reddition 2024 au moment du vote du PLF 2026`,
    questions: [
      {
        num: '1',
        enonce: 'Identifiez les violations des delais legaux dans le calendrier budgétaire 2026 et qualifiez-les juridiquement.',
        correction: `ANALYSE DES VIOLATIONS DES DELAIS LEGAUX :

VIOLATION 1 : Adoption tardive du CBMT
Delai legal (Art. 13) : au plus tard le 1er juin
Date reelle : 25 juin 2025
Retard : 24 jours
Qualification : Violation de l\'Art. 13 LOFIP. Gravite : moderee (le CBMT a ete depose, juste en retard).

VIOLATION 2 : Depot tardif du PLF
Delai legal (Art. 83 al. 1) : au plus tard le 15 septembre
Date reelle : 28 octobre 2025
Retard : 43 jours
Qualification : Violation grave de l\'Art. 83 LOFIP. Le Gouvernement expose a la presomption de demission (Art. 83 al. 6) si le dépôt est posterieur au 1er decembre.

VIOLATION 3 : Depassement du delai de vote de l\'Assemblee nationale
Delai legal (Art. 83 al. 3) : 40 jours apres dépôt (soit avant le 7 decembre)
Date reelle : 12 decembre 2025 = 44 jours
Retard : 4 jours
Consequence : Transmission au Senat selon Art. 83 al. 4 (le Senat disposait de 20 jours).

VIOLATION 4 : Vote du PLF 2026 sans examen prealable de la loi de reddition 2024
Obligation legale (Art. 87) : la loi de reddition des comptes DOIT etre examinee prealablement au vote du PLF
Situation reelle : Parlement n\'avait pas examine la reddition 2024 avant de voter le PLF 2026
Qualification : Violation de l\'Art. 87 LOFIP. C\'est une violation de procédure : le vote du PLF 2026 est potentiellement entache d\'irregularite.

BILAN : 4 violations dont une particulierement grave (Art. 87) qui remet en cause la régularité procedurales du vote du PLF 2026.`
      },
      {
        num: '2',
        enonce: 'La loi de finances 2026 a ete promulguee le 5 janvier 2026. Pour la periode du 1er au 5 janvier, quelles dispositions juridiques permettaient a l\'Etat de continuer a fonctionner ?',
        correction: `ANALYSE JURIDIQUE : FONCTIONNEMENT DE L\'ETAT DU 1ER AU 5 JANVIER 2026

PROBLEME : La LF 2026 n\'etait pas encore promulguee au 1er janvier 2026. Comment l\'Etat peut-il fonctionner sans budget vote ?

SOLUTION LEGALE 1 - Ordonnance-loi (Art. 83 al. 5 LOFIP) :
L\'Art. 83 al. 5 prevoit que lorsque le projet de loi de finances n\'est pas vote avant l\'ouverture du nouvel exercice, les dispositions dudit projet sont mises en vigueur par ordonnance-loi du President de la Republique deliberee en Conseil des ministres, en tenant compte des amendements votes par chacune des deux chambres.
Dans notre cas : le PLF avait bien ete vote par les deux chambres (AN le 12/12, Senat le 28/12) mais pas encore promulgue. Les dispositions pouvaient donc etre mises en vigueur par ordonnance-loi presidentielle.

SOLUTION LEGALE 2 - Credits provisoires (Art. 18 et 31 LOFIP) :
Si l\'ordonnance n\'avait pas ete prise, l\'Art. 18 permet l\'ouverture de credits provisoires autorisant le Gouvernement a percevoir les recettes et a engager des depenses urgentes dans la limite des credits du budget precedent, avant la promulgation definitive.

EN PRATIQUE 2026 :
La promulgation le 5 janvier 2026 etant rapide (5 jours seulement), l\'Etat a tres probablement fonctionne sur la base des credits de l\'ordonnance-loi ou d\'autorisations provisoires, les services essentiels (fonctionnaires, services publics de base) n\'etant pas interrompus.`
      },
    ]
  },
  {
    titre: 'Cas pratique 3 : Recevabilite des amendements et droit d\'amendement (Art. 86 LOFIP)',
    contexte: `Lors de la session budgetaire d\'octobre 2025 relative au PLF 2026 (LF n° 25/060 du 29 decembre 2025, budget de 54.335,8 milliards FC), quatre amendements ont ete deposes par des parlementaires a l\'Assemblee nationale :

Amendement A : Un groupe de deputes propose d\'augmenter les credits du programme Sante de 800 milliards FC, finances par la creation d\'une taxe additionnelle de 2% sur les benefices des entreprises minieres, en sus de l\'IS. Aucune reduction de credits n\'est proposee.

Amendement B : Un senateur propose de reduire de 500 milliards FC les credits du programme Infrastructure routiere au profit d\'un programme d\'electrification rurale cree pour l\'occasion.

Amendement C : Un depute propose de supprimer l\'exoneration de TVA accordee aux importateurs de vehicules de luxe (pertes de recettes estimees a zero puisque la TVA n\'est pas percue), arguant que cela ne diminue pas les recettes effectivement encaissees.

Amendement D : Un groupe de deputes propose de corriger une faute de syntaxe dans l\'intitule de l\'article 12 de la loi de finances (remplacement de "du" par "des"), sans aucun impact financier.`,
    questions: [
      {
        num: '1',
        enonce: 'Analysez la recevabilite de chacun des quatre amendements au regard de l\'Art. 86 LOFIP et de l\'Art. 127 de la Constitution. Justifiez precisement votre reponse pour chaque amendement.',
        correction: `ANALYSE DE RECEVABILITE - ART. 86 LOFIP / ART. 127 CONSTITUTION :

AMENDEMENT A : Augmentation credits Sante (+800 Mds FC) financee par taxe additionnelle sur miniers
VERDICT : RECEVABLE sous conditions
RAISONNEMENT : L\'Art. 86 al. 1 LOFIP dispose que les amendements accroissant les depenses ne sont pas recevables "a moins qu\'ils ne soient assortis de propositions compensatoires." Ici, l\'augmentation des credits Sante (+800 Mds FC) est compensee par la creation d\'une taxe additionnelle generant des recettes equivalentes. La compensation est presente : l\'amendement est techniquement recevable sur la forme.
NUANCE IMPORTANTE : La creation d\'un nouvel impot releve en principe d\'une loi de finances d\'initiative gouvernementale (Art. 122 Constitution). Si la taxe additionnelle constitue une disposition fiscale nouvelle substantielle, elle pourrait depasser le droit d\'amendement parlementaire. Le President de l\'AN devra trancher ce point.

AMENDEMENT B : Reduction credits Infrastructure (-500 Mds FC) pour un programme Electrification rurale cree pour l\'occasion
VERDICT : IRRECEVABLE sur le fond
RAISONNEMENT : L\'Art. 43 al. 3 LOFIP dispose que la creation d\'un programme budgetaire "ne peut resulter que d\'une loi de finances d\'initiative gouvernementale." Un parlementaire ne peut pas creer un nouveau programme par voie d\'amendement. La reduction des credits Infrastructure est recevable en elle-meme, mais l\'affectation a un programme inexistant cree par l\'amendement est irrecevable. L\'amendement doit etre rejete dans sa formulation actuelle.

AMENDEMENT C : Suppression exoneration TVA vehicules de luxe ("recettes a zero")
VERDICT : IRRECEVABLE - Argumentation du depute erronee
RAISONNEMENT : L\'Art. 86 al. 1 vise toute diminution des recettes, qu\'elles soient effectivement encaissees ou non. Supprimer une exoneration revient en realite a CREER des recettes (les importateurs de vehicules de luxe deviendraient imposables a la TVA), non a les diminuer. Paradoxalement, cet amendement ACCROIT les recettes. Il est donc recevable dans son effet reel, mais l\'argumentation du depute est totalement erronee en droit : aucune recette n\'est "a zero" du fait d\'une exoneration, c\'est une depense fiscale au sens de l\'Art. 79 pt. 11 LOFIP.

AMENDEMENT D : Correction syntaxique sans impact financier
VERDICT : RECEVABLE
RAISONNEMENT : L\'Art. 86 al. 1 LOFIP ne vise que les amendements ayant un impact financier (diminution recettes ou accroissement depenses). Un amendement purement redactionnel, corrigeant une faute de syntaxe sans aucune consequence financiere, est parfaitement recevable. C\'est une correction formelle qui ameliore la qualite legistique de la loi sans en modifier la substance budgetaire.`
      },
      {
        num: '2',
        enonce: 'L\'Art. 86 al. 2 LOFIP etend les regles de recevabilite aux propositions de loi deposees en dehors de la session budgetaire. Expliquez la portee de cette disposition et son lien avec l\'Art. 134 de la Constitution. Donnez un exemple concret.',
        correction: `PORTEE DE L\'ART. 86 AL. 2 LOFIP ET LIEN AVEC L\'ART. 134 CONSTITUTION :

TEXTE DE REFERENCE :
Art. 86 al. 2 LOFIP : etend l\'irrecevabilite aux propositions de loi et aux amendements de toute nature (pas seulement les amendements au PLF) dont l\'adoption aurait pour consequence soit une diminution des ressources publiques, soit la creation ou l\'aggravation d\'une charge publique, a moins qu\'ils ne soient assortis de propositions degageant les recettes ou les economies correspondantes.
Art. 134 Constitution RDC : pose le meme principe au niveau constitutionnel pour toutes les propositions et amendments parlementaires.

PORTEE JURIDIQUE :
Cette disposition signifie que le droit d\'amendement parlementaire est limite en permanence, pas seulement lors de la session budgetaire. A tout moment de l\'annee, un parlementaire qui depose une proposition de loi (exemple : loi portant statut des enseignants, loi sur la protection sociale) doit s\'assurer que celle-ci ne cree pas de charge budgetaire nouvelle sans degager en meme temps les ressources ou economies correspondantes.

EXEMPLE CONCRET (illustratif) :
Un depute depose en mars 2026 une proposition de loi visant a creer une indemnite de transport de 50.000 FC/mois pour tous les agents de l\'Etat. Cout estime : 2.400 milliards FC/an. Sans indiquer comment cette charge sera financee (nouvelle recette, reduction d\'une autre depense), la proposition est irrecevable au sens de l\'Art. 86 al. 2 LOFIP et de l\'Art. 134 Constitution. Le President de l\'AN doit la rejeter d\'office avant son inscription a l\'ordre du jour.

SYNTHESE :
L\'Art. 86 al. 2 institue un controle permanent de la soutenabilite budgetaire de toute initiative parlementaire. Il protege l\'equilibre budgétaire (Art. 14 LOFIP) contre les depenses non financees quel que soit le moment de l\'annee.`
      },
    ]
  },
  {
    titre: 'Cas pratique 4 : Documents integrants et accompagnants du PLF 2026 (Art. 78-79 LOFIP)',
    contexte: `A l\'occasion du depot du PLF 2026 (LF n° 25/060 du 29 decembre 2025), le secretaire general du Ministere du Budget dresse un inventaire des documents joints. Il constate les situations suivantes :

Situation 1 : Le CDMT 2026-2028 detaille par ministere et programme a ete elabore mais n\'a pas encore ete finalise. Le secretaire general decide de le joindre uniquement en annexe informelle sans le soumettre comme document officiel.

Situation 2 : La Declaration sur les risques budgetaires (prevue par la LOFIP mod. 2023) n\'a pas ete elaboree. Le directeur juridique estime qu\'il s\'agit d\'un document "recommande" et non obligatoire.

Situation 3 : L\'etat des plafonds d\'emplois remuneres par le Pouvoir central (Titre I) est joint au dossier, mais il ne mentionne pas les emplois crees dans les cabinets politiques au cours de l\'exercice precedent.

Situation 4 : Le projet de loi de reddition des comptes 2024, qui devait etre depose au plus tard le 15 mai 2025, n\'a pas ete elabore. Le directeur du budget propose de joindre le rapport provisoire de la Cour des comptes a titre de substitut.

Budget 2026 LF n° 25/060 : equilibre a 54.335,8 milliards FC (Art. 6), recettes DGI 19.033,6 milliards FC, DGDA 7.522,0 milliards FC.`,
    questions: [
      {
        num: '1',
        enonce: 'Pour chacune des 4 situations, identifiez la base legale applicable, qualifiez la violation eventuellement commise et precisez les consequences juridiques selon la LOFIP.',
        correction: `ANALYSE JURIDIQUE DES 4 SITUATIONS :

SITUATION 1 : CDMT joint en annexe informelle
BASE LEGALE : Art. 78 pt. 5 LOFIP - Le CDMT actualise sur 3 ans fait partie INTEGRANTE du PLF.
VIOLATION : Grave. Le CDMT n\'est pas un document facultatif ni un document accompagnant. Il fait partie integrante du PLF selon l\'Art. 78. Le joindre uniquement en annexe informelle ne satisfait pas l\'exigence legale.
CONSEQUENCES : Le PLF est incomplet au sens de l\'Art. 78. Le Parlement est fonde a contester la recevabilite formelle du PLF. En pratique, le President de l\'Assemblee nationale peut refuser de l\'inscrire a l\'ordre du jour jusqu\'a regularisation. Violation de l\'Art. 83 al. 1 (depot incomplet equivalent a non-depot).

SITUATION 2 : Declaration risques budgetaires absente
BASE LEGALE : Art. 79 pt. 13 LOFIP mod. 2023 - La Declaration sur les risques budgetaires est obligatoire.
VIOLATION : Le directeur juridique se trompe : ce document est obligatoire, non recommande. La LOFIP mod. 2023 a liste exhaustivement les 13 documents accompagnants du PLF. Tous sont obligatoires.
CONSEQUENCES : Violation de l\'Art. 79 LOFIP mod. 2023. Moins grave que la Situation 1 car il s\'agit d\'un document accompagnant (non integrant), mais constitue tout de meme une violation formelle de la LOFIP que la Cour des comptes peut relever dans son rapport annuel.

SITUATION 3 : Plafonds emplois incomplets (cabinets politiques omis)
BASE LEGALE : Art. 78 pt. 8 LOFIP - Etat des plafonds d\'emplois remuneres PAR LE POUVOIR CENTRAL.
VIOLATION : L\'omission des emplois des cabinets politiques est une violation de l\'exhaustivite requise. Les emplois crees dans les cabinets politiques sont remuneres sur le budget du Pouvoir central (Titre I). Leur absence de l\'etat des plafonds constitue une irregularite.
CONSEQUENCES : Violation de l\'Art. 78 pt. 8 et de l\'Art. 51 LOFIP qui dispose qu\'aucun recrutement ne peut exceder les plafonds autorises. Si les emplois des cabinets ne figurent pas dans l\'etat, leur remuneration devient juridiquement irreguliere faute d\'autorisation parlementaire.

SITUATION 4 : Reddition 2024 absente - rapport Cour des comptes propose en substitut
BASE LEGALE : Art. 84 LOFIP (depot au plus tard le 15 mai) et Art. 87 (examen prealable au PLF suivant).
VIOLATION : Double violation. (1) Non-respect du delai de depot (Art. 84). (2) Violation de la condition prealable de l\'Art. 87 : le PLF 2026 ne peut etre vote si la reddition 2024 n\'a pas ete examinee. Le rapport provisoire de la Cour n\'est pas un substitut legal.
CONSEQUENCES : Le vote du PLF 2026 sans examen prealable de la reddition 2024 est une violation de procedure qui entache potentiellement la regularite de la loi de finances 2026. Cette irregularite est soulignee par la Cour des comptes dans son rapport annuel.`
      },
      {
        num: '2',
        enonce: 'Sur la base du budget 2026 (LF n° 25/060 - 54.335,8 milliards FC), expliquez pourquoi l\'etat de l\'equilibre budgetaire (Art. 78 pt. 4) est qualifie de document integrant du PLF et non de simple document accompagnant. Quels sont les enjeux juridiques de cette distinction ?',
        correction: `ANALYSE : STATUT JURIDIQUE DE L\'ETAT DE L\'EQUILIBRE BUDGETAIRE

DISTINCTION FONDAMENTALE (Art. 78 vs Art. 79 LOFIP) :
Les documents integrants (Art. 78) ont la meme force juridique que le corps de la loi de finances : ils sont votes par le Parlement et font l\'objet d\'une autorisation legale. Les documents accompagnants (Art. 79) sont informatifs et ne font pas l\'objet d\'un vote.

POURQUOI L\'ETAT D\'EQUILIBRE EST UN DOCUMENT INTEGRANT :
1. Il traduit le principe cardinal d\'equilibre budgetaire (Art. 14 LOFIP) qui impose que le budget soit equilibre en ressources et en charges. Sans cet etat, le Parlement ne peut pas verifier la conformite du PLF a ce principe.
2. Il recapitule le solde global du budget (recettes minus depenses) et identifie les sources de financement du deficit eventuel (emprunts interieurs, exterieurs, autres). C\'est la demonstration chiffree de l\'equilibre.
3. L\'autorisation parlementaire de recourir au deficit et a l\'emprunt passe par le vote de cet etat. Sans lui, le Gouvernement n\'a pas l\'autorisation legale de contracter des emprunts.

APPLICATION AU BUDGET 2026 (LF n° 25/060) :
L\'Art. 6 LF 2026 fixe l\'equilibre a 54.335,8 milliards FC. L\'etat d\'equilibre (Art. 78 pt. 4) detaille : Recettes Budget general = 48.969,3 Mds FC + retrocessions provinces (Art. 8 : 7.694,5 Mds FC) + caisse de perequation (Art. 9 : 744,6 Mds FC) + financement deficit eventuel. Son vote par le Parlement est l\'acte par lequel celui-ci autorise formellement le niveau d\'endettement prevu.

ENJEU JURIDIQUE MAJEUR :
Si cet etat n\'etait pas joint ou etait joint comme document accompagnant, le Parlement voterait un budget sans avoir autorise son mode de financement. Toute emission d\'obligations par l\'Etat, tout recours a l\'emprunt non couvert par cet etat serait illegale. La distinction Art. 78/Art. 79 n\'est donc pas formelle : elle determine quelles dispositions du PLF ont valeur de loi et quelles dispositions ont valeur d\'information.`
      },
    ]
  },
  {
    titre: 'Cas pratique 5 : Quitus parlementaire et cycle budgetaire (Art. 81-82, 84, 87 LOFIP)',
    contexte: `En mars 2026, le Parlement de la RDC est en session ordinaire. L\'agenda legislatif comprend les points suivants :

Point 1 : Examen du projet de loi portant reddition des comptes de l\'exercice 2024 (depose le 30 avril 2025). Le rapport de la Cour des comptes releve des anomalies dans l\'execution du budget 2024 : depassements non autorises dans 3 ministeres (Mines, Travaux publics, Defense) pour un total de 1.256 milliards FC, et des recettes DGI inferieures aux previsions de 18% (recettes reelles 16.398,8 Mds FC vs prevision 20.000 Mds FC).

Point 2 : Le Gouvernement souhaite deposer le PLF 2027 en avance pour respecter le delai du 15 septembre 2026. Il demande au Parlement d\'inscrire l\'examen du PLF 2027 avant l\'examen de la reddition 2024 pour gagner du temps.

Point 3 : Un groupe de parlementaires propose de rejeter la loi de reddition 2024 en raison des depassements constates, ce qui priverait le Gouvernement du quitus.

Point 4 : Le rapport Annuel de Performance (RAP) joint a la reddition 2024 indique que le taux de realisation des objectifs par programme est de 61% en moyenne.`,
    questions: [
      {
        num: '1',
        enonce: 'Analysez la demande du Gouvernement (Point 2) au regard de l\'Art. 87 LOFIP. Le Parlement peut-il acceder a cette demande ? Quelles en seraient les consequences juridiques si le PLF 2027 etait vote avant la reddition 2024 ?',
        correction: `ANALYSE - ART. 87 LOFIP : OBLIGATION D\'EXAMEN PREALABLE DE LA REDDITION

TEXTE FONDATEUR :
Art. 87 LOFIP : « Le projet de loi portant reddition des comptes du dernier exercice clos doit etre examine par le Parlement prealablement au vote du projet de la loi de finances de l\'annee. »

REPONSE JURIDIQUE CATEGORIQUE :
Le Parlement NE PEUT PAS acceder a la demande du Gouvernement. L\'Art. 87 est une disposition imperative (le mot "doit" n\'est pas facultatif). La sequentialite est obligatoire : examen reddition 2024 PUIS vote PLF 2027. Il n\'existe aucune derogation prevue par la LOFIP a cette regle.

RAISON D\'ETRE DE CETTE REGLE :
Le cycle budgetaire vertueux impose que le Parlement approuve les comptes de l\'annee N avant d\'autoriser les depenses de l\'annee N+2. Cette sequentialite garantit :
1. La responsabilite financiere : le Gouvernement ne peut pas obtenir de nouveaux credits sans avoir rendu compte des credits anterieurs.
2. L\'apprentissage budgetaire : les informations de la reddition (taux d\'execution, depassements) eclairent les choix du PLF suivant.
3. La transparence democratique : le Parlement dispose d\'une vision complete du cycle avant de voter de nouveaux credits.

CONSEQUENCES SI LE PLF 2027 EST VOTE AVANT LA REDDITION 2024 :
- Violation grave de l\'Art. 87 LOFIP
- La loi de finances 2027 est potentiellement entachee d\'irregularite de procedure
- La Cour des comptes est fondee a le signaler dans son rapport
- Le Gouvernement s\'expose a une mise en cause politique devant le Parlement
- En theorie, une exception d\'irregularite pourrait etre soulevee devant la Cour constitutionnelle

CONCLUSION : Le Gouvernement doit attendre que le Parlement examine la reddition 2024. C\'est une condition non negociable du droit budgetaire congolais.`
      },
      {
        num: '2',
        enonce: 'Le groupe parlementaire refuse d\'approuver la reddition 2024 en raison des depassements (Point 3). Quels sont les effets juridiques du refus d\'approbation sur le quitus du Gouvernement ? Le Parlement peut-il bloquer indefiniment le cycle budgetaire par ce refus ?',
        correction: `ANALYSE - EFFETS JURIDIQUES DU REFUS D\'APPROBATION DE LA REDDITION

LE QUITUS PARLEMENTAIRE - DEFINITION (Art. 87 al. 2 LOFIP) :
Art. 87 al. 2 LOFIP : « l\'approbation des comptes par cette loi vaut quitus de la gestion du Gouvernement pour l\'exercice concerne. »
Le quitus est une decharge formelle de responsabilite : en approuvant la reddition, le Parlement certifie que le Gouvernement a gere les finances publiques conformement aux autorisations. C\'est l\'equivalent parlementaire du rapport de certification de la Cour des comptes.

EFFETS DU REFUS D\'APPROBATION :
1. ABSENCE DE QUITUS : Le Gouvernement ne beneficie pas de la decharge de responsabilite pour l\'exercice 2024. Les ministres responsables des depassements (Mines, Travaux publics, Defense) demeurent exposes a des poursuites devant la Cour des comptes pour faute de gestion.
2. MAINTIEN DES RESPONSABILITES FINANCIERES : Sans quitus, la Cour des comptes peut engager des procedures de mise en debet contre les ordonnateurs et comptables responsables des irregularites (1.256 milliards FC de depassements non autorises).
3. BLOCAGE POTENTIEL DU CYCLE : Si le Parlement refuse la reddition, il bloque techniquement le vote du PLF 2027 (Art. 87 : examen prealable obligatoire). Mais ce blocage est limite.

LE PARLEMENT PEUT-IL BLOQUER INDEFINIMENT ?
Non. Le refus persistant de la reddition constitue lui-meme un manquement aux obligations parlementaires. L\'Art. 87 dit que la reddition "doit etre examinee" - l\'examen est obligatoire, meme si l\'approbation ne l\'est pas. En pratique :
- La Cour constitutionnelle peut etre saisie en cas de blocage institutionnel
- Le Gouvernement peut invoquer les dispositions d\'urgence (Art. 83 al. 7) si le blocage compromet le depot du PLF 2027
- Un refus sans motif suffisant expose les parlementaires a la critique politique

SYNTHESE :
Le refus d\'approuver la reddition 2024 est un acte de controle parlementaire legitime qui prive le Gouvernement du quitus mais ne suspend pas indefiniment le fonctionnement de l\'Etat. Les depassements constates (1.256 Mds FC) doivent faire l\'objet de poursuites devant la Cour des comptes independamment du vote parlementaire.`
      },
    ]
  },
  {
    titre: 'Cas pratique 6 : Gouvernance du budget-programme et PAP (Art. 43, 230 LOFIP ; Circulaire N° 004/ME/MIN.BUDGET/2025)',
    contexte: `Dans le cadre de la preparation du budget 2026, le Secretaire general du Ministere de l'Enseignement superieur soumet au Ministere du Budget le cadre de performance de son departement. L'audit interne revele les situations suivantes :

SITUATION A : Le Ministere a declare 8 programmes distincts : (1) Formation initiale superieure, (2) Recherche universitaire, (3) Bourses nationales, (4) Infrastructure universitaire, (5) Cooperation academique, (6) Numerique universitaire, (7) Gouvernance interne, (8) Fonds special d'urgence.

SITUATION B : Le Programme 'Recherche universitaire' comporte 5 objectifs specifiques, chacun assorti de 4 indicateurs de performance. Le PAP est elabore sans associer les ressources aux activites specifiques.

SITUATION C : Le Responsable de Programme (RP) nommement designe par le Ministre est un chef de division de niveau 5. Il gere en meme temps 3 autres programmes du Ministere. Aucune fiche de couts unitaires n'a ete renseignee pour les activites prevues.

SITUATION D : Le budget-programme du Ministere n'a jamais ete adopte par le Conseil des ministres et n'est pas encore transmis au Ministere du Budget dans le delai fixe par la Circulaire (22 juillet 2025 pour les previsions sectorielles). Le Ministere argue que la double presentation budgetaire imposee par le §235 de la Circulaire est trop lourde a realiser en si peu de temps.

BASE LEGALE : Art. 43 et 230 LOFIP ; Circulaire N° 004/ME/MIN.BUDGET/2025, §§ 34, 225-254 ; LF n° 25/060 du 29 decembre 2025, Art. 5.`,
    questions: [
      {
        num: '1',
        enonce: 'Analysez la Situation A au regard des regles de gouvernance des programmes. Le Ministere respecte-t-il le cadre juridique applicable ? Quelles corrections s\'imposent selon la Circulaire N° 004/ME/MIN.BUDGET/2025 ?',
        correction: `ANALYSE - SITUATION A : NOMBRE DE PROGRAMMES EXCESSIF

REGLE JURIDIQUE APPLICABLE (§§239-241 Circulaire N° 004/ME/MIN.BUDGET/2025) :
La Circulaire dispose expressement que le nombre de programmes par ministere est plafonne a CINQ (5). Ce plafond resulte du principe de cohesion programmatique : chaque programme doit representer un ensemble coherent d'actions relevant d'un meme ministere et concourant a un objectif strategique identifiable (Art. 43 LOFIP). La multiplication des programmes fragmenterait la logique de performance et rendrait impossible le pilotage par les resultats.

DIAGNOSTIC : Le Ministere a declare 8 programmes, soit 3 de plus que le plafond legal. Plusieurs programmes sont redondants : 'Gouvernance interne' et 'Numerique universitaire' sont des moyens transversaux, pas des politiques publiques au sens de l'Art. 43 LOFIP. 'Fonds special d'urgence' n'est pas un programme budgetaire : c'est une reserve qui devrait figurer dans les comptes speciaux (Art. 60 LOFIP). 'Cooperation academique' peut etre integree en action du programme 'Recherche universitaire'.

CORRECTIONS REQUISES :
1. Ramener le nombre de programmes a 5 maximum en regroupant les activites connexes
2. Supprimer 'Gouvernance interne' comme programme autonome (integrer en action du programme principal)
3. Reclasser le 'Fonds special d'urgence' selon sa nature juridique (reserve ou compte special)
4. Soumettre la maquette corrigee a la DGDSP pour validation avant inscription au PLF 2026

CONSEQUENCE : Un PLF comportant plus de 5 programmes par ministere ne sera pas accepte par le Ministere du Budget lors de la conference budgetaire (Circulaire N° 004/ME/MIN.BUDGET/2025).`
      },
      {
        num: '2',
        enonce: 'Evaluez la Situation B. Le cadre de performance du Programme est-il conforme aux exigences du §229 de la Circulaire ? Quelles sont les consequences d\'un PAP mal structure sur la gestion budgetaire ?',
        correction: `ANALYSE - SITUATION B : CADRE DE PERFORMANCE NON CONFORME

REGLE JURIDIQUE APPLICABLE (§229 Circulaire N° 004/ME/MIN.BUDGET/2025) :
Les objectifs par programme doivent se limiter a trois (3) avec trois indicateurs au maximum par objectif. Le §230 precise que seuls les objectifs d'impact ou d'effet s'alignent au niveau du programme ; les objectifs des produits se rattachent aux actions ou activites. Un PAP sans association ressources-activites est juridiquement incomplet (Art. 43 LOFIP).

VIOLATIONS CONSTATEES :
1. VIOLATION DU §229 : 5 objectifs specifiques au lieu de 3 maximum
2. VIOLATION DU §229 : 4 indicateurs par objectif au lieu de 3 maximum
3. VIOLATION DE L'ART. 43 LOFIP : absence d'association ressources-activites

CONSEQUENCES :
1. REJET PAR LE MINISTERE DU BUDGET : La DGDSP retournera le PAP pour correction avant la conference budgetaire (§228 Circulaire)
2. CYCLE PAP-RAP INTERROMPU : Sans indicateurs conformes, le Rapport Annuel de Performance ne pourra pas mesurer les realisations
3. EXECUTION DESORDONNEE : Sans ressources associees aux activites, les ordonnateurs ne savent pas quels credits affecter
4. FRAGILITE AU CONTROLE : La Cour des comptes peut relever la non-conformite a l'Art. 43 LOFIP comme irregularite de gestion`
      },
      {
        num: '3',
        enonce: 'Analysez la Situation C concernant le Responsable de Programme. La designation et les conditions d\'exercice du RP sont-elles conformes aux §§249-254 de la Circulaire ? Que risque le programme en cas de non-conformite ?',
        correction: `ANALYSE - SITUATION C : RESPONSABLE DE PROGRAMME NON CONFORME

REGLE JURIDIQUE APPLICABLE (§§249-254 Circulaire N° 004/ME/MIN.BUDGET/2025) :
Le Responsable de Programme pilote le programme, determine les objectifs specifiques, affecte les moyens et controle les resultats (§253). Ces missions exigent une autorite reelle sur les ressources et les agents du programme.

VIOLATIONS CONSTATEES :
1. RANG INSUFFISANT : Un chef de division de niveau 5 ne dispose pas de l'autorite hierarchique pour piloter un programme ministeriel. Un RP doit etre de rang directeur general ou equivalent.
2. CUMUL DE 4 PROGRAMMES : La Circulaire impose un RP unique par programme. Gerer 4 programmes simultanement rend le pilotage fictif.
3. ABSENCE DE FICHES DE COUTS : La Circulaire impose de calculer le cout des activites selon 6 etapes reglementaires (§§242-248). L'absence de fiches unitaires signifie que le PAP ne peut pas etre valorise en credits.

RISQUES :
1. Le programme ne peut pas etre inscrit au PLF 2026 sans RP credible et couts valides
2. Les decisions du RP peuvent etre contestees pour defaut d'autorite hierarchique
3. La Cour des comptes peut relever l'absence de responsable identifiable comme defaillance de gouvernance`
      },
      {
        num: '4',
        enonce: 'Sur la Situation D : le Ministere invoque la charge de la double presentation budgetaire (§235 Circulaire) pour justifier le retard. Cette justification est-elle juridiquement recevable ? Quelles obligations et sanctions s\'appliquent ?',
        correction: `ANALYSE - SITUATION D : RETARD ET DOUBLE PRESENTATION

OBLIGATION DE DEPOT (§34 Circulaire N° 004/ME/MIN.BUDGET/2025) :
La date limite de depot des previsions sectorielles est le 22 JUILLET 2025. Cette date est imperative : elle conditionne les conferences budgetaires et le depot du PLF au 15 septembre (Art. 126 Constitution / Art. 83 al. 1 LOFIP).

DOUBLE PRESENTATION OBLIGATOIRE (§235 Circulaire) :
Pour le budget 2026, la double presentation (par nature et par programme) est obligatoire pour tous les ministeres pilotes et la nouvelle vague. Cette obligation decoule de l'Art. 230 LOFIP. La justification du Ministere est IRRECEVABLE :
1. La difficulte technique n'est pas une cause d'exoneration : la DGDSP est mandatee pour accompagner les ministeres (§228 Circulaire)
2. Le delai du 22 juillet integre la charge de preparation

SANCTIONS :
1. SUBSTITUTION D'OFFICE : Le Ministere du Budget peut inscrire les credits en reconduction des annees anterieures
2. EXCLUSION DES ARBITRAGES : Un ministere absent des conferences budgetaires ne peut pas defendre ses priorites
3. RESPONSABILITE HIERARCHIQUE : Le Secretaire general peut etre mis en cause pour manquement a la coordination (Art. 77 LOFIP)`
      },
      {
        num: '5',
        enonce: 'Question de synthese : Proposez un diagnostic global de la gouvernance budgetaire du Ministere et les mesures correctives que la DGDSP devrait imposer avant l\'inscription du budget 2026, en fondant votre analyse sur les textes legaux.',
        correction: `DIAGNOSTIC GLOBAL - GOUVERNANCE BUDGETAIRE DU MINISTERE

I. BILAN DES VIOLATIONS

Le Ministere presente une non-conformite systematique sur 4 plans :
1. STRUCTURE : 8 programmes au lieu de 5 maximum (violation §§239-241 Circulaire)
2. PERFORMANCE : 5 objectifs et 4 indicateurs au lieu de 3 max chacun, absence de valorisation (violation §229, Art. 43 LOFIP)
3. GOUVERNANCE : RP de rang insuffisant, cumul de fonctions, absence de fiches de couts (violation §§249-254 Circulaire)
4. CALENDRIER : retard de depot et non-respect de la double presentation (violation §34 Circulaire, Art. 230 LOFIP)

II. ANALYSE JURIDIQUE

Ces violations remettent en cause la capacite du Ministere a gerer un budget-programme au sens de l'Art. 43 LOFIP. Le budget-programme repose sur un triptyque : OBJECTIFS, RESSOURCES, RESULTATS. Les defaillances constatees affectent les trois dimensions.

III. MESURES CORRECTIVES DGDSP

STRUCTURELLES :
1. Ramenager la maquette programmique a 5 programmes maximum avec justification strategique (Art. 43 LOFIP)
2. Supprimer ou integrer les programmes non conformes a la notion de politique publique

PERFORMANCE :
3. Limiter strictement a 3 objectifs et 3 indicateurs par programme (§229 Circulaire)
4. Renseigner les fiches de couts unitaires par activite selon les 6 etapes reglementaires (§§242-248)

GOUVERNANCE :
5. Nommer un RP de rang superieur (directeur general ou equivalent) sans cumul inter-programmes
6. Formaliser la lettre de mission du RP (§§249-254 Circulaire)

CALENDAIRES :
7. Deposer immediatement les previsions avec double presentation nature/programme (§§34 et 235 Circulaire)
8. Inscrire le budget-programme revisite au prochain Conseil des ministres pour validation formelle

IV. CONSEQUENCE DU NON-RESPECT

Si le Ministere ne se conforme pas, le Ministere du Budget est fonde a inscrire ses credits en reconduction (maintien des dotations anterieures sans actualisation), ce qui prive le Ministere de toute augmentation de credits pour 2026 et efface ses priorites sectorielles du PLF.

FONDEMENT : Art. 43 et 230 LOFIP + Circulaire N° 004/ME/MIN.BUDGET/2025, §§34, 228-254 + LF n° 25/060 du 29 decembre 2025, Art. 5.`
      }
    ]
  },
  {
    titre: 'Cas pratique 7 : PAP non conforme et RAP defaillant. Analyse juridique des violations du canevas reglementaire',
    contexte: `Le Ministere de l'Enseignement Superieur et Universitaire (MESU) depose, avant le 15 octobre 2025, son Projet Annuel de Performances (PAP) pour l'exercice 2026, accompagne du Rapport Annuel de Performances (RAP) de l'exercice 2024.

A l'examen de ces documents par le Ministere du Budget, les anomalies suivantes sont constatees :

1. ANOMALIE PAP, PARTIE I (PRESENTATION STRATEGIQUE) :
Le PAP comporte 9 programmes (sur 1 seul ministere). Parmi eux, 2 programmes sont intitules "Programme transversal Formation" et "Programme Appui institutionnel". Aucun responsable de programme (RProg) n'est nomme pour 4 de ces 9 programmes. Pour les 5 programmes restants, le meme directeur est designe RProg pour 3 d'entre eux simultanement.

2. ANOMALIE PAP, PARTIE II (PRESENTATION OPERATIONNELLE) :
Les tableaux P-II.k.3 relatifs aux objectifs et indicateurs de performance sont vides pour 6 programmes sur 9. Pour les 3 programmes documentes, les indicateurs cites sont exclusivement des indicateurs de moyens (nombre d'agents formes, nombre de reunions tenues, montant des credits consommes). Aucun indicateur d'efficacite socioeconomique ni d'efficience n'est renseigne.

3. ANOMALIE PIP :
Dans le PIP consolide joint au PAP, les credits sont presentes de maniere globale sans distinction entre Autorisations d'Engagement (AE) et Credits de Paiement (CP). Le projet de construction d'un campus universitaire de 12 millions USD y figure sans fiche de projet individualisee.

4. ANOMALIE RAP :
Le RAP 2024 ne comporte que 4 pages. Il se limite a un tableau de consommation des credits en nature (personnel, biens, services), sans aucune rubrique sur la realisation des objectifs, la mesure des indicateurs, ni l'analyse des ecarts. Il ne contient aucun tableau R-II.k.3 (taux de realisation des indicateurs).

5. CONSEQUENCE PROJETEE :
Fort de ces constats, le Ministere du Budget envisage de reconduire les credits du MESU pour 2026 au niveau de 2024, sans aucune revision a la hausse, et de retourner le PAP au ministere pour mise en conformite avant examen par l'Assemblee nationale.`,
    questions: [
      {
        num: '1',
        enonce: 'La structuration du budget du MESU en 9 programmes est-elle juridiquement valide au regard du Guide PAP/RAP et de la Circulaire budgetaire ? Analysez separement le cas des programmes "transversal Formation" et "Appui institutionnel" et precisez les criteres qui les rendent non conformes.',
        correction: `ANALYSE JURIDIQUE :

I. LE NOMBRE DE PROGRAMMES : VIOLATION DU PRINCIPE DE MODERERATION

Le Guide PAP/RAP (§5, p. 11) fixe une limite de 4 a 5 programmes operationnels par ministere, auxquels peuvent s'ajouter 1 programme-soutien et, exceptionnellement, 1 programme-intervention. Un total de 9 programmes excede donc largement le plafond raisonnable, ce qui constitue une violation du principe de structuration en budget-programme.

II. IRREGULARITE DU PROGRAMME "TRANSVERSAL FORMATION"

Un programme transversal est par definition contraire a la logique du budget-programme (Guide PAP/RAP §5). La Circulaire N° 004/ME/MIN.BUDGET/2025 (§228) rappelle que chaque programme doit correspondre a une politique publique sectorielle cohesive et disposer d'une unicite d'objet. Un intitule generique de type "transversal" ne definit aucune politique publique identifiable ; il repond en realite a une logique de regroupement de depenses de nature, non de finalite. Ce programme doit etre supprime ou integre dans un programme operationnel existant.

III. IRREGULARITE DU PROGRAMME "APPUI INSTITUTIONNEL"

Seul 1 programme-soutien est tolere par ministere (Guide PAP/RAP §5 ; Circulaire §229). Il a vocation a regrouper les fonctions de pilotage administratif (DRH, DAF, SG). L'intitule "Appui institutionnel" est admissible s'il s'agit du programme-soutien unique. En revanche, si un autre programme-soutien existe deja au sein du meme ministere, ce doublon est interdit. Le Ministere du Budget est fonde a exiger la fusion ou la suppression du programme excedentaire.

FONDEMENT : Guide PAP/RAP, §5, pp. 11-12 ; Circulaire N° 004/ME/MIN.BUDGET/2025, §§228-229 ; Art. 79 pt. 6 LOFIP (le PAP doit presenter la programmation par programme coherente avec le budget).`
      },
      {
        num: '2',
        enonce: 'Appréciez la legalite de la situation de cumul de responsabilite de programme (RProg) constatee. Quelles sont les obligations juridiques du RProg telles que definies par la Circulaire budgetaire, et quelles consequences juridiques le cumul de fonctions produit-il sur la validite du PAP ?',
        correction: `ANALYSE JURIDIQUE :

I. LE STATUT DU RPROG ET L'INTERDICTION DE CUMUL

La Circulaire N° 004/ME/MIN.BUDGET/2025 (§§249-254) definit le Responsable de Programme (RProg) comme le gestionnaire public designe nommement, disposant de la delegation de credits et rendu personnellement responsable de l'atteinte des objectifs fixes dans le PAP. Trois regles essentielles decoulent de ce statut :

1. Le RProg doit etre de rang suffisant pour assurer une autorite effective sur les entites qui composent son programme (generalement directeur general ou directeur central).
2. La lettre de mission signee par le ministre est obligatoire : elle formalise la delegation de gestion et les objectifs assigns.
3. Un meme agent ne peut pas etre RProg de plusieurs programmes simultanement : le Guide PAP/RAP (§5) precise que le RProg exerce une responsabilite exclusive sur son programme, incompatible avec la gestion paralele de plusieurs programmes aux finalites distinctes.

II. CONSEQUENCE DU CUMUL SUR LA VALIDITE DU PAP

L'absence de RProg designe pour 4 programmes constitue une violation directe de l'Art. 79 pt. 6 LOFIP, qui exige que le PAP soit structure par programme avec identification des responsables. Un programme sans RProg ne peut pas faire l'objet d'une evaluation de performance, ce qui prive le Parlement des informations auxquelles il a droit.

Le cumul pour 3 programmes entre les mains d'un seul directeur cree une confusion de responsabilites qui vide de son sens le principe de gestion axee sur les resultats : si un seul agent est responsable de tout, aucun agent n'est veritablement responsable de rien. Le Ministere du Budget est fonde a rejeter les parties du PAP correspondant aux programmes sans RProg regulier, en application du pouvoir de controle budgetaire (Art. 43 LOFIP).

FONDEMENT : Circulaire N° 004/ME/MIN.BUDGET/2025, §§249-254 ; Guide PAP/RAP §5 ; Art. 79 pt. 6 et Art. 43 LOFIP.`
      },
      {
        num: '3',
        enonce: 'Les indicateurs de performance retenus dans le PAP (nombre d\'agents formes, nombre de reunions tenues, montant des credits consommes) sont-ils conformes aux categories d\'indicateurs exiges par le Guide PAP/RAP ? Identifiez pour chacun sa categorie reelle et expliquez pourquoi leur usage exclusif contrevient aux exigences reglementaires.',
        correction: `ANALYSE JURIDIQUE :

I. CLASSIFICATION DES INDICATEURS CONTESTES

Le Guide PAP/RAP (pp. 30-35) distingue 4 categories d'indicateurs de performance :
- Indicateurs d'efficacite socioeconomique : mesurent l'impact de la politique sur la societe (ex. taux de scolarisation, taux de diplomation).
- Indicateurs de qualite de service : mesurent la satisfaction des usagers (ex. taux de couverture geographique, delai d'obtention d'un diplome).
- Indicateurs d'efficience : rapportent les resultats aux moyens engages (ex. cout par etudiant diplome, taux d'occupation des salles).
- Indicateurs de moyens : mesurent les ressources mobilisees (credits, personnels, reunions), sans lien avec un resultat.

Application aux indicateurs contestes :
- "Nombre d'agents formes" : indicateur de moyens (ressource humaine formee), non un indicateur de resultat.
- "Nombre de reunions tenues" : indicateur d'activite, sous-categorie des indicateurs de moyens ; ne mesure aucun impact ou qualite.
- "Montant des credits consommes" : purement financier, indicateur de moyens en execution budgetaire ; ne dit rien de l'efficacite de la depense.

II. VIOLATION DU PRINCIPE D'EQUILIBRE DES INDICATEURS

Le Guide PAP/RAP (p. 35) exige que chaque programme combine au minimum un indicateur d'efficacite socioeconomique, un indicateur de qualite de service et un indicateur d'efficience. L'usage exclusif d'indicateurs de moyens constitue une violation de cette exigence et vide le PAP de sa fonction de responsabilisation sur les resultats. Le Parlement ne peut pas evaluer si la politique d'enseignement superieur produit des effets benefiques pour la societe ; il ne voit que la consommation des credits.

Cette pratique prive egalement le RAP futur de toute base de comparaison prevision/realisation sur des donnees utiles, puisque des indicateurs de moyens peuvent etre atteints sans que la politique publique ait produit le moindre effet.

FONDEMENT : Guide PAP/RAP, pp. 30-35 ; Art. 79 pt. 6 LOFIP ; Circulaire N° 004/ME/MIN.BUDGET/2025, §229.`
      },
      {
        num: '4',
        enonce: 'Analysez la violation relative a la presentation globale des credits du PIP sans distinction AE/CP. Quelle est la portee juridique de cette distinction selon la LOFIP, et quelles consequences pratiques l\'absence de fiche de projet individualisee pour le campus universitaire de 12 millions USD produit-elle sur la legalite de cette inscription budgetaire ?',
        correction: `ANALYSE JURIDIQUE :

I. LA DISTINCTION AE/CP : FONDEMENT JURIDIQUE ET PORTEE

La LOFIP (Art. 52 et 53) distingue deux categories de credits d'investissement :
- Les Autorisations d'Engagement (AE) : plafond des engagements juridiques que l'Etat peut contracter durant l'exercice. Elles couvrent la totalite du cout d'un projet pluriannuel des la premiere annee.
- Les Credits de Paiement (CP) : limite des decaissements effectifs pouvant etre ordonnes durant l'exercice pour honorer les engagements anterieurement contractes.

Cette distinction est obligatoire pour les projets du PIP. La presentation globale des credits du PIP sans cette dissociation viole l'Art. 52 LOFIP et empeche le Parlement d'apprehender :
(a) le cout total sur la duree de vie du projet (AE) ;
(b) la charge reelle de tresorerie pour l'exercice en cours (CP).

II. L'ABSENCE DE FICHE DE PROJET INDIVIDUALISEE

Le Decret n°23/18 du 31 mai 2023 portant organisation du PIP et la Circulaire budgetaire (§235) exigent qu'a partir d'un certain seuil (generalement les projets importants du Titre VII ou VIII), chaque projet fasse l'objet d'une fiche de projet individualisee dans le CISPIP (Cadre d'Information Simplifie sur les Projets d'Investissement Public), contenant : identification du projet, objectifs, couts par phase, source de financement (interne/externe), indicateurs de suivi physique et financier.

L'absence de fiche pour le projet a 12 millions USD cree plusieurs irregularites :
1. Impossibilite pour le Comite de Pilotage du PIP de valider le projet (absence d'informations minimales).
2. Risque de double financement non detecte (le meme projet pourrait figurer dans un autre document).
3. Violation du principe de transparence budgetaire (Art. 9 LOFIP) : les citoyens et le Parlement ne peuvent pas identifier ce a quoi les 12 millions sont destines avec precision.
4. Sans fiche de projet, l'engagement ne peut pas etre correctement retrace dans le systeme de suivi de l'execution (PPBSE), ce qui compromet le futur RAP.

FONDEMENT : Art. 52-53 LOFIP ; Decret n°23/18 du 31 mai 2023 ; Circulaire N° 004/ME/MIN.BUDGET/2025, §235 ; Guide PAP/RAP pp. 37-42.`
      },
      {
        num: '5',
        enonce: 'Le RAP 2024 du MESU, reduit a 4 pages sans tableaux de performance, constitue-t-il un document juridiquement valide au sens de la LOFIP et du Guide PAP/RAP ? Evaluez le fondement juridique de la decision du Ministere du Budget de reconduire les credits en reconduction, et determinez si cette sanction est proportionnee et legalement fondee.',
        correction: `ANALYSE JURIDIQUE :

I. LA VALIDITE JURIDIQUE DU RAP : UNE EXIGENCE FORMELLE ET SUBSTANTIELLE

Le RAP est un document d'obligation legale : l'Art. 82 pt. 4 LOFIP impose que la loi de reddition des comptes soit accompagnee d'un rapport de performance par programme. Le Guide PAP/RAP (Partie III, pp. 53-79) fixe le canevas precis que doit respecter chaque RAP :

- Partie III.1 (tableaux R-I.x) : bilan de la programmation strategique du programme (R-I.2 : cadre de coherence strategique ; R-I.3 : analyse du contexte ; R-I.4 : donnees socioeconomiques ; R-I.5 : synthese des resultats).
- Partie III.2 (tableaux R-II.k.x) : bilan operationnel par programme, dont R-II.k.3 (taux de realisation des indicateurs) et R-II.k.4 (analyse des ecarts entre previsions PAP et realisations).

Un RAP de 4 pages sans ces tableaux ne remplit pas les conditions formelles et substantielles de l'Art. 82 LOFIP. Il ne constitue pas un RAP valide ; il s'apparente a un simple rapport d'execution financiere (qui releve du compte administratif), non a un rapport de performance.

II. LA RECONDUCTION DES CREDITS : BASE LEGALE ET PROPORTIONNALITE

Fondement legal de la reconduction : L'Art. 43 LOFIP autorise le Ministere du Budget a inscrire en reconduction les credits d'un ministere qui n'a pas respecte ses obligations de performance. La Circulaire N° 004/ME/MIN.BUDGET/2025 (§34) precise que la non-production d'un PAP ou d'un RAP conforme prive le ministere du droit a une revision a la hausse de ses credits.

Proportionnalite de la sanction : La reconduction est la sanction reglementaire ordinaire ; elle n'est pas excessive. Elle est proportionnee aux violations constatees car :
1. Elle ne supprime pas les credits ; elle les maintient au niveau N-1, preservant la continuite du service public.
2. Elle est reversible : si le ministere produit un PAP et un RAP conformes en cours d'annee, le Ministere du Budget peut ouvrir des credits supplementaires en loi de finances rectificative.
3. Elle est la sanction explicitement prevue (Art. 43 LOFIP) pour ce type de defaillance, ce qui exclut tout caractere arbitraire.

Conclusion : Le Ministere du Budget agit sur base legale solide. La decision de reconduction est juridiquement fondee, proportionnee et conforme au principe de bonne gestion des finances publiques (Art. 9 et 43 LOFIP).

FONDEMENT : Art. 82 pt. 4, Art. 43, Art. 9 LOFIP ; Guide PAP/RAP Partie III, pp. 53-79 ; Circulaire N° 004/ME/MIN.BUDGET/2025, §34.`
      }
    ]
  }
]

// ─── PAGE PRINCIPALE ─────────────────────────────────────────────────────────
export default function UE5Chapitre5Page() {
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
            { label: 'Chapitre 5' },
          ]}
          color="emerald"
        />
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-lg font-bold text-foreground leading-tight">Elaboration et adoption du budget</h1>
          <InfoTooltip texte="Ce chapitre analyse la procédure budgétaire en RDC : calendrier (Art. 13, 83-84), acteurs (Art. 77), documents integrants PLF (Art. 78), documents accompagnants (Art. 79 mod. 2023), recevabilité des amendements (Art. 86) et loi de reddition des comptes (Art. 81-82, 87)." loi="Art. 13, 77-87 LOFIP" />
        </div>
        <p className="text-xs text-muted-foreground">LOFIP Art. 13, 76-87 · CBMT · PLF · Reddition des comptes · Quitus</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Lecons', value: String(LECONS.length) },
          { label: 'QCM', value: String(QCM_GLOBAL.length) },
          { label: 'Cas pratiques', value: String(ETUDES_DE_CAS.length) },
          { label: 'Duree', value: '5h00' },
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
          <li className="flex items-start gap-2 text-xs text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Maitriser le calendrier budgétaire complet de la RDC : CBMT, dépôt PLF, vote AN/Senat, ordonnance-loi, reddition des comptes (Art. 13, 83-84)</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Identifier les acteurs et leurs roles : Premier ministre, Ministre du Budget, Ministre des Finances, Parlement, Cour des comptes (Art. 77)</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Distinguer les 9 documents integrants du PLF (Art. 78) des 13 documents accompagnants (Art. 79 mod. 2023)</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Appliquer les règles de recevabilité des amendements parlementaires au budget (Art. 86 LOFIP / Art. 127 Constitution)</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Comprendre le mecanisme de la loi de reddition des comptes, du quitus parlementaire et du RAP (Art. 81-82, 87)</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Analyser la gouvernance du budget-programme : PAP, Responsable de Programme, plafond de 5 programmes, fiches de couts et double presentation 2026 (Art. 43, 230 LOFIP ; Circulaire N° 004/ME/MIN.BUDGET/2025, §§225-254)</span></li>
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
            <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">25 questions · Sources : LOFIP Art. 13, 43, 52-53, 76-87, 230 · Constitution Art. 126-127 · Circulaire N° 004/ME/MIN.BUDGET/2025 · Guide PAP/RAP · Decret n°23/18</p>
          </div>
          <QCMPageUnique questions={QCM_GLOBAL as unknown as QCMChapitre[]} couleurAccent="emerald" />
        </div>
      )}

      {activeTab === 'cas' && !isStudent && (
        <div className="space-y-4">
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 p-3">
            <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">7 cas pratiques de reflexion · Procedure budgetaire 2026 · Recevabilite amendements · Documents PLF · Quitus parlementaire · Budget-programme et PAP · PAP/RAP non conformes</p>
          </div>
          {ETUDES_DE_CAS.map(cas => (
            <CasPratiqueBlock key={cas.titre} cas={cas} />
          ))}
        </div>
      )}

      {activeTab === 'devoir' && (
        <DevoirChapitreCreateur
          chapitreId="ue5-chapitre-5"
          chapitreNom="Chapitre 5 - Elaboration et adoption du budget"
          questions={QCM_GLOBAL as unknown as QCMChapitre[]}
          coursId="ue5-finances-publiques"
          casPratiquesExistants={ETUDES_DE_CAS.map((c, i) => ({
            id: `cp${i + 1}`,
            titre: c.titre,
            contexte: c.contexte,
            questions: c.questions.map(q => ({ num: q.num, enonce: q.enonce, correction: q.correction })),
          } as CasPratiqueExistant))}
        />
      )}

      <button onClick={goBack} className="w-full rounded-xl bg-emerald-600 text-white py-3 font-semibold text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
        <ArrowLeft className="h-4 w-4" /> Retour aux chapitres UE 5
      </button>
    </div>
  )
}
