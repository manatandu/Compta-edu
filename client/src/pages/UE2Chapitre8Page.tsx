import React, { useState } from 'react'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  ArrowLeft, ArrowRight, ChevronRight, CheckCircle2, XCircle,
  BookOpen, Users, Vote, Gavel, Scale, RotateCcw, PlusCircle, ShieldAlert
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import DevoirChapitreCreateur, { CasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
import { QCMChapitre } from '@/lib/db'
import { InfoTooltip } from '@/components/InfoTooltip'

// ─── Types ────────────────────────────────────────────────────────────────────
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
  badge?: string
  contenu: React.ReactNode
  questions: QCMQuestion[]
}

type EtapeCasPratique = {
  id: string
  question: string
  correctionDetaillee: string
  articleRef: string
}

type CasPratique = {
  id: string
  titre: string
  badge: string
  enonce: string
  contexte?: string
  etapes: EtapeCasPratique[]
  couleur: string
  accentCouleur: string
}

// ─── Composant InfoBox ─────────────────────────────────────────────────────────
function InfoBox({ couleur, titre, children }: { couleur: string; titre: React.ReactNode; children: React.ReactNode }) {
  const styles: Record<string, string> = {
    blue: 'border-blue-200 bg-blue-50',
    amber: 'border-amber-200 bg-amber-50',
    emerald: 'border-emerald-200 bg-emerald-50',
    red: 'border-red-200 bg-red-50',
    violet: 'border-violet-200 bg-violet-50',
    slate: 'border-slate-200 bg-slate-50',
    sky: 'border-sky-200 bg-sky-50',
    orange: 'border-orange-200 bg-orange-50',
  }
  const titreStyles: Record<string, string> = {
    blue: 'text-blue-700',
    amber: 'text-amber-700',
    emerald: 'text-emerald-700',
    red: 'text-red-700',
    violet: 'text-violet-700',
    slate: 'text-slate-700',
    sky: 'text-sky-700',
    orange: 'text-orange-700',
  }
  return (
    <div className={`rounded-xl border p-3 space-y-1 ${styles[couleur] || styles.slate}`}>
      <p className={`text-xs font-bold uppercase ${titreStyles[couleur] || titreStyles.slate}`}>{titre}</p>
      <div className={`text-sm ${titreStyles[couleur] || titreStyles.slate} space-y-1`}>{children}</div>
    </div>
  )
}

// ─── Composant QCMBlock (dans les leçons) ────────────────────────────────────
function QCMBlock({ q }: { q: QCMQuestion }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  return (
    <div className="rounded-xl border border-sky-200 bg-sky-50/30 p-4 space-y-3">
      <p className="text-xs font-semibold text-sky-700">{q.question}</p>
      <div className="space-y-1.5">
        {q.options.map(opt => {
          let cls = 'w-full text-left text-xs px-3 py-2 rounded-lg border transition-colors '
          if (!showResult) cls += selected === opt.id ? 'border-sky-500 bg-sky-100 text-sky-800' : 'border-border hover:border-sky-300 hover:bg-muted/40'
          else if (opt.id === q.reponseCorrecte) cls += 'border-green-500 bg-green-50 text-green-700'
          else if (opt.id === selected) cls += 'border-red-400 bg-red-50 text-red-600'
          else cls += 'border-border opacity-50'
          return <button key={opt.id} className={cls} onClick={() => { if (!showResult) setSelected(opt.id) }} disabled={showResult}><span className="font-bold mr-1.5">{opt.id.toUpperCase()}.</span>{opt.texte}</button>
        })}
      </div>
      {!showResult && <button onClick={() => { if (selected) setShowResult(true) }} disabled={!selected} className="text-xs bg-sky-600 text-white rounded-lg px-4 py-1.5 disabled:opacity-40 hover:bg-sky-700 transition-colors font-semibold">Vérifier</button>}
      {showResult && (
        <div className={cn('rounded-lg p-2.5 text-xs', selected === q.reponseCorrecte ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600')}>
          <div className="flex items-center gap-1 font-semibold mb-0.5">{selected === q.reponseCorrecte ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}{selected === q.reponseCorrecte ? 'Correct !' : 'Incorrect'}</div>
          <p>{q.explication}</p>
          <button onClick={() => { setSelected(null); setShowResult(false) }} className="mt-1.5 text-xs underline opacity-70 hover:opacity-100">Réessayer</button>
        </div>
      )}
    </div>
  )
}

// ─── Composant Cas Pratique ────────────────────────────────────────────────────
function CasPratiqueBlock({ cp }: { cp: CasPratique }) {
  const [open, setOpen] = useState(false)
  const [corrVisible, setCorrVisible] = useState<Set<string>>(new Set())
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-3 text-left">
          <span className="inline-flex items-center justify-center h-6 px-2 rounded-full text-xs font-bold border border-sky-300 text-sky-700 bg-sky-50">{cp.badge}</span>
          <div>
            <p className="text-sm font-semibold text-foreground">{cp.titre}</p>
            <p className="text-xs text-muted-foreground">{cp.enonce.slice(0, 60)}…</p>
          </div>
        </div>
        <ChevronRight className={cn('h-4 w-4 text-muted-foreground shrink-0 transition-transform', open && 'rotate-90')} />
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
          <div className="rounded-lg bg-sky-50 border border-sky-200 p-3">
            <p className="text-xs font-semibold text-sky-800 mb-1">Énoncé</p>
            <p className="text-xs text-sky-900 leading-relaxed">{cp.enonce}</p>
            {cp.contexte && <p className="text-xs text-sky-800 leading-relaxed mt-1 italic">{cp.contexte}</p>}
          </div>
          <div className="space-y-3">
            {cp.etapes.map((e, ei) => (
              <div key={e.id} className="space-y-2">
                <p className="text-xs font-semibold text-foreground">Question {ei + 1} : {e.question}</p>
                {corrVisible.has(e.id) ? (
                  <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                    <p className="text-xs font-semibold text-emerald-700 mb-1">Correction</p>
                    <p className="text-xs text-emerald-900 leading-relaxed whitespace-pre-line">{e.correctionDetaillee}</p>
                    <p className="text-xs text-sky-600 font-medium mt-1">{e.articleRef}</p>
                  </div>
                ) : (
                  <button onClick={() => setCorrVisible(s => new Set([...s, e.id]))} className="text-xs text-sky-600 hover:underline font-medium">Voir la correction</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── QCM : 20 questions ───────────────────────────────────────────────────────
const TOUTES_QCM: QCMQuestion[] = [
  {
    type: 'qcm', id: 'ch8-q1',
    question: 'Selon l’Art. 51 AUSCGIE, qu’est-ce qu’un titre social ?',
    options: [
      { id: 'a', texte: 'Un emprunt obligataire émis par la société' },
      { id: 'b', texte: 'Une action ou part sociale émise en contrepartie d’un apport' },
      { id: 'c', texte: 'Un certificat de dépôt bancaire' },
      { id: 'd', texte: 'Un titre nominatif non transmissible' },
    ],
    reponseCorrecte: 'b',
    explication: 'L’Art. 51 AUSCGIE dispose que les titres sociaux (actions dans les SA ou parts sociales dans les autres sociétés) sont émis en contrepartie des apports des associés. Ils représentent la quote-part de l’associé dans le capital.',
    articleRef: 'Art. 51 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q2',
    question: 'Quelle est la nature juridique des titres sociaux selon l’Art. 52 AUSCGIE ?',
    options: [
      { id: 'a', texte: 'Biens immeubles par nature' },
      { id: 'b', texte: 'Biens meubles incorporels' },
      { id: 'c', texte: 'Biens immeubles par destination' },
      { id: 'd', texte: 'Biens meubles corporels' },
    ],
    reponseCorrecte: 'b',
    explication: 'L’Art. 52 AUSCGIE qualifie les titres sociaux de biens meubles, quelle que soit la nature des biens composant le patrimoine social. Cette qualification emporte des conséquences sur leur régime de cession et de nantissement.',
    articleRef: 'Art. 52 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q3',
    question: 'Selon l’Art. 53 AUSCGIE, combien de droits fondamentaux les titulaires de titres sociaux possèdent-ils ?',
    options: [
      { id: 'a', texte: '2 droits : vote et dividendes' },
      { id: 'b', texte: '3 droits : vote, dividendes, information' },
      { id: 'c', texte: '4 droits : bénéfices, actifs nets, obligation aux pertes, vote' },
      { id: 'd', texte: '5 droits dont le droit de véto' },
    ],
    reponseCorrecte: 'c',
    explication: 'L’Art. 53 AUSCGIE énumère quatre droits : (1) droit aux bénéfices si distribution décidée ; (2) droit sur les actifs nets en cas de dissolution ou réduction de capital ; (3) obligation de contribuer aux pertes ; (4) droit de vote dans les décisions collectives.',
    articleRef: 'Art. 53 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q4',
    question: 'Qu’est-ce qu’une clause léonine selon l’Art. 54 AUSCGIE et quelle est sa sanction ?',
    options: [
      { id: 'a', texte: 'Une clause avantageant le gérant, validée par l’assemblée' },
      { id: 'b', texte: 'Une clause attribuant à un associé la totalité des bénéfices ou l’exonérant de toute perte : réputée non écrite' },
      { id: 'c', texte: 'Une clause limitant le droit de vote : valable si approuvée en AGE' },
      { id: 'd', texte: 'Une clause de non-concurrence : réputée non écrite' },
    ],
    reponseCorrecte: 'b',
    explication: 'L’Art. 54 AUSCGIE pose le principe de proportionnalité des droits aux apports et interdit les clauses léonines : toute stipulation attribuant à un associé la totalité des bénéfices, l’exonérant de toute contribution aux pertes ou privant les autres de tout bénéfice est réputée non écrite.',
    articleRef: 'Art. 54 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q5',
    question: 'Quelle est la différence entre titres cessibles et titres négociables selon l’AUSCGIE (Art. 57-58) ?',
    options: [
      { id: 'a', texte: 'Ce sont deux termes identiques désignant la même opération' },
      { id: 'b', texte: 'Les parts sociales sont cessibles ; seules les actions (SA) sont négociables. L’émission de titres négociables par une SARL est nulle' },
      { id: 'c', texte: 'Les actions sont cessibles et les parts sociales sont négociables' },
      { id: 'd', texte: 'Les deux catégories sont toujours librement transmissibles' },
    ],
    reponseCorrecte: 'b',
    explication: 'L’Art. 57 distingue : parts sociales = cessibles (formalités civiles) ; actions = cessibles ou négociables. L’Art. 58 réserve l’émission de titres négociables aux seules sociétés par actions (SA, SAS). Toute émission par une SARL ou SNC est frappée de nullité.',
    articleRef: 'Art. 57-58 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q6',
    question: 'Selon l’Art. 60 AUSCGIE, que se passe-t-il si tous les titres sont réunis dans une seule main ?',
    options: [
      { id: 'a', texte: 'La société est automatiquement dissoute' },
      { id: 'b', texte: 'La société n’est pas dissoute automatiquement mais doit régulariser dans un délai d’un an' },
      { id: 'c', texte: 'La société est transformée automatiquement en entreprise individuelle' },
      { id: 'd', texte: 'Le seul associé doit racheter une partie des parts' },
    ],
    reponseCorrecte: 'b',
    explication: 'L’Art. 60 AUSCGIE prévoit que la réunion de tous les titres dans une seule main n’entraîne pas la dissolution automatique de la société. Un délai d’un an est accordé pour régulariser la situation (trouver de nouveaux associés ou se transformer). Passé ce délai, tout intéressé peut demander la dissolution en justice.',
    articleRef: 'Art. 60 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q7',
    question: 'En cas d’indivision sur des parts ou actions (Art. 127 AUSCGIE), comment le droit de vote est-il exercé ?',
    options: [
      { id: 'a', texte: 'Chaque indivisaire vote proportionnellement à sa quote-part' },
      { id: 'b', texte: 'Un mandataire unique représente les indivisaires ; en cas de désaccord, le juge désigne le représentant' },
      { id: 'c', texte: 'Aucun des indivisaires ne peut voter' },
      { id: 'd', texte: 'Le droit de vote est suspendu jusqu’au règlement de l’indivision' },
    ],
    reponseCorrecte: 'b',
    explication: 'L’Art. 127 AUSCGIE organise l’exercice du droit de vote en cas d’indivision : les titres indivis sont représentés par un mandataire unique. Si les indivisaires ne s’accordent pas sur le choix du mandataire, il appartient au juge compétent de désigner un représentant parmi eux.',
    articleRef: 'Art. 127 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q8',
    question: 'En cas d’usufruit sur un titre social, qui vote selon l’Art. 128 AUSCGIE ?',
    options: [
      { id: 'a', texte: 'Toujours l’usufruitier, car il perçoit les fruits' },
      { id: 'b', texte: 'Toujours le nu-propriétaire, car il est propriétaire du titre' },
      { id: 'c', texte: 'En principe le nu-propriétaire vote, sauf pour les décisions sur l’affectation des bénéfices où l’usufruitier vote' },
      { id: 'd', texte: 'Ni l’un ni l’autre ; le vote est neutralisé' },
    ],
    reponseCorrecte: 'c',
    explication: 'L’Art. 128 AUSCGIE régit l’usufruit : le nu-propriétaire vote en principe, SAUF pour les décisions portant sur l’affectation des bénéfices (vote sur la distribution des dividendes), où l’usufruitier a le droit de vote car il a vocation à percevoir les fruits.',
    articleRef: 'Art. 128 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q9',
    question: 'Selon l’Art. 130 AUSCGIE, quelles sont les trois conditions cumulatives de l’abus de majorité ?',
    options: [
      { id: 'a', texte: 'Vote à plus de 75%, absence de CAC, préjudice prouvé' },
      { id: 'b', texte: 'Décision dans le seul intérêt des majoritaires + contraire à l’intérêt des minoritaires + injustifiable par l’intérêt social' },
      { id: 'c', texte: 'Violation des statuts + majorité absolue + intention malveillante' },
      { id: 'd', texte: 'Quorum non atteint + vote sans ordre du jour + absence de PV' },
    ],
    reponseCorrecte: 'b',
    explication: 'L’Art. 130 AUSCGIE définit l’abus de majorité par trois conditions cumulatives : (1) décision votée dans le seul intérêt des majoritaires, (2) contraire à l’intérêt des minoritaires, (3) injustifiable par l’intérêt social. La CCJA a précisé que la mise en réserve systématique sans préjudice prouvé ne constitue pas un abus.',
    articleRef: 'Art. 130 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q10',
    question: 'Comment les décisions collectives peuvent-elles être prises en dehors d’une assemblée physique (Art. 133-1 et 133-2 AUSCGIE) ?',
    options: [
      { id: 'a', texte: 'Par simple émail ou SMS entre associés, sans formalité' },
      { id: 'b', texte: 'Par vote par correspondance (statuts requis : préavis 3 j, reçu 24h avant) ou par visioconférence (statuts requis, vote oral, incidents techniques dans PV)' },
      { id: 'c', texte: 'Uniquement par délégation signée devant notaire' },
      { id: 'd', texte: 'Impossible : toute décision exige une assemblée physique' },
    ],
    reponseCorrecte: 'b',
    explication: 'L’AUSCGIE révisé consacre deux modes alternatifs : Art. 133-1 autorise le vote par correspondance si les statuts le prévoient, avec un préavis de 3 jours et réception du bulletin 24h avant le scrutin. Art. 133-2 autorise la visioconférence également sur prévision statutaire, le vote y est oral et tout incident technique doit être mentionné dans le PV.',
    articleRef: 'Art. 133-1, 133-2 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q11',
    question: 'Quelles mentions obligatoires doit contenir le procès-verbal d’assemblée selon l’Art. 134 AUSCGIE ?',
    options: [
      { id: 'a', texte: 'Uniquement la date et la liste des associés présents' },
      { id: 'b', texte: 'Date, lieu, associés présents/représentés, ordre du jour, documents communiqués, résumé des débats, texte des résolutions, résultats des votes' },
      { id: 'c', texte: 'Uniquement les résolutions adoptées et le résultat du vote' },
      { id: 'd', texte: 'La liste des actionnaires majoritaires et leurs déclarations' },
    ],
    reponseCorrecte: 'b',
    explication: 'L’Art. 134 AUSCGIE impose un contenu précis pour les PV : date et lieu de la réunion, identité des associés présents ou représentés, ordre du jour, documents et rapports soumis, résumé des débats, texte des résolutions soumises au vote, et résultats des votes pour chaque résolution.',
    articleRef: 'Art. 134 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q12',
    question: 'Selon l’Art. 549 AUSCGIE, quel est le quorum de l’AGO lors de la première convocation et de la deuxième ?',
    options: [
      { id: 'a', texte: '1ere : 1/2 ; 2e : 1/4' },
      { id: 'b', texte: '1ere : 1/4 des actions avec droit de vote ; 2e : aucun quorum' },
      { id: 'c', texte: '1ere : 2/3 ; 2e : 1/2' },
      { id: 'd', texte: '1ere : 1/3 ; 2e : 1/4' },
    ],
    reponseCorrecte: 'b',
    explication: 'L’Art. 549 AUSCGIE fixe le quorum de l’AGO de SA à 1/4 des actions ayant droit de vote lors de la 1re convocation. Lors de la 2e convocation, aucun quorum n’est requis. La majorité est celle des voix exprimées (bulletins blancs non comptés) selon Art. 550.',
    articleRef: 'Art. 549-550 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q13',
    question: 'Quelle est la majorité requise en AGE de SA selon l’Art. 554 AUSCGIE ?',
    options: [
      { id: 'a', texte: 'Majorité simple des voix exprimées' },
      { id: 'b', texte: '3/4 des voix exprimées' },
      { id: 'c', texte: '2/3 des voix exprimées' },
      { id: 'd', texte: 'Unanimité des actionnaires' },
    ],
    reponseCorrecte: 'c',
    explication: 'L’Art. 554 AUSCGIE fixe la majorité en AGE à 2/3 des voix exprimées. Exception : le transfert du siège dans un autre État partie exige l’unanimité des actionnaires présents ou représentés. Les bulletins blancs ne sont pas pris en compte.',
    articleRef: 'Art. 554 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q14',
    question: 'Qui peut faire inscrire des résolutions à l’ordre du jour d’une AG de SA et à quelle condition (Art. 520 AUSCGIE) ?',
    options: [
      { id: 'a', texte: 'Uniquement le PDG, car il fixe l’ordre du jour' },
      { id: 'b', texte: 'Les actionnaires selon leur participation : 5% si capital &lt; 1 Md FCFA ; 3% si 1-2 Mds ; 0,50% si > 2 Mds' },
      { id: 'c', texte: 'Tout actionnaire, quel que soit son nombre d’actions' },
      { id: 'd', texte: 'Le commissaire aux comptes uniquement' },
    ],
    reponseCorrecte: 'b',
    explication: 'L’Art. 520 AUSCGIE accorde le droit de faire inscrire des résolutions aux actionnaires selon des seuils dégressifs : 5% du capital si capital &lt; 1 milliard FCFA, 3% si entre 1 et 2 milliards, 0,50% si > 2 milliards. Le projet de résolution doit être adressé 10 jours avant l’assemblée.',
    articleRef: 'Art. 520-521 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q15',
    question: 'Le droit de vote double peut-il être attribué dans une SA ? À quelles conditions (Art. 544) ?',
    options: [
      { id: 'a', texte: 'Non, chaque action donne toujours une voix, sans exception' },
      { id: 'b', texte: 'Oui : actions nominatives intégralement libérées inscrites depuis au moins 2 ans, par disposition statutaire ou AGE' },
      { id: 'c', texte: 'Oui, mais uniquement pour les actions au porteur' },
      { id: 'd', texte: 'Oui, pour tout actionnaire détenant plus de 10% du capital' },
    ],
    reponseCorrecte: 'b',
    explication: 'L’Art. 544 AUSCGIE autorise le droit de vote double pour les actions nominatives, intégralement libérées, inscrites au nom du même actionnaire depuis au moins 2 ans. Ce droit doit être prévu par les statuts ou accordé par une AGE. Il est perdu en cas de conversion au porteur ou de transfert de propriété (sauf succession, donation, liquidation de communauté).',
    articleRef: 'Art. 544-545 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q16',
    question: 'L’AGE peut-elle augmenter les engagements des actionnaires sans leur accord individuel (Art. 551 AUSCGIE) ?',
    options: [
      { id: 'a', texte: 'Oui, à la majorité des 2/3 en AGE' },
      { id: 'b', texte: 'Oui, à l’unanimité des actionnaires présents' },
      { id: 'c', texte: 'Non : l’AGE ne peut augmenter les engagements des actionnaires sans leur accord individuel' },
      { id: 'd', texte: 'Oui, si le quorum est atteint et la majorité simple obtenue' },
    ],
    reponseCorrecte: 'c',
    explication: 'L’Art. 551 al. 2 AUSCGIE pose une limite absolue à la compétence de l’AGE : elle ne peut augmenter les engagements des actionnaires sans leur accord individuel. Cette règle protège les actionnaires contre toute décision collective qui alourdirait leurs obligations au-delà de leur apport initial.',
    articleRef: 'Art. 551 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q17',
    question: 'En quoi consiste le droit préférentiel de souscription (DPS) selon l’Art. 573 AUSCGIE ?',
    options: [
      { id: 'a', texte: 'Le droit de vendre ses actions en priorité lors d’une cession' },
      { id: 'b', texte: 'Le droit de souscrire en priorité, proportionnellement, aux nouvelles actions émises lors d’une augmentation de capital, pendant au moins 20 jours' },
      { id: 'c', texte: 'Le droit d’obtenir un dividende prioritaire avant distribution générale' },
      { id: 'd', texte: 'Le droit de participer aux AGE sans être actionnaire inscrit' },
    ],
    reponseCorrecte: 'b',
    explication: 'L’Art. 573 AUSCGIE confere aux anciens actionnaires un droit préférentiel de souscription (DPS) irréductible et proportionnel à leurs actions lors de toute augmentation de capital en numéraire. Le délai minimum pour exercer ce droit est de 20 jours. Ce droit peut être supprimé par l’AGE (Art. 586) mais le bénéficiaire ne vote alors pas sur la résolution (CCJA 7 juin 2018).',
    articleRef: 'Art. 573, 586 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q18',
    question: 'Selon l’Art. 572 AUSCGIE, quelle condition préalable s’impose avant d’émettre de nouvelles actions en numéraire ?',
    options: [
      { id: 'a', texte: 'L’accord du commissaire aux comptes' },
      { id: 'b', texte: 'Le capital existant doit être intégralement libéré' },
      { id: 'c', texte: 'L’approbation préalable de l’administration fiscale' },
      { id: 'd', texte: 'L’unanimité des actionnaires fondateurs' },
    ],
    reponseCorrecte: 'b',
    explication: 'L’Art. 572 AUSCGIE impose une condition absolue : le capital social doit être intégralement libéré avant toute émission de nouvelles actions en numéraire. Cette règle protège les futurs souscripteurs en garantissant que la société a déjà entièrement encaissé ses apports antérieurs.',
    articleRef: 'Art. 572 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q19',
    question: 'Qu’est-ce qu’une assemblée spéciale selon les Art. 555-557 AUSCGIE ?',
    options: [
      { id: 'a', texte: 'Une assemblée convoquée en urgence par le tribunal' },
      { id: 'b', texte: 'Une assemblée réunissant les titulaires d’une catégorie d’actions pour approuver ou désapprouver les décisions qui modifient leurs droits particuliers' },
      { id: 'c', texte: 'Une assemblée réservée aux administrateurs de la SA' },
      { id: 'd', texte: 'Une assemblée extraordinaire tenue hors du siège social' },
    ],
    reponseCorrecte: 'b',
    explication: 'L’Art. 555 AUSCGIE définit l’assemblée spéciale comme celle qui réunit les titulaires d’une catégorie d’actions (ex : actions privilégiées, actions à dividende prioritaire). Elle est requise pour approuver ou désapprouver toute décision de l’assemblée générale modifiant les droits particuliers de cette catégorie. Quorum : 1/2 (1re conv.), 1/4 (2e) ; majorité : 2/3.',
    articleRef: 'Art. 555-557 AUSCGIE'
  },
  {
    type: 'qcm', id: 'ch8-q20',
    question: 'En vertu de l’Art. 557-1 AUSCGIE, quelles violations entraînent la nullité de plein droit des délibérations ?',
    options: [
      { id: 'a', texte: 'Toute irrégularité, même mineure, dans la convocation' },
      { id: 'b', texte: 'La violation des Art. 546, 549, 550, 551, 552, 553, 554, 555, 556 ou 557 (quorum, majorité, compétence)' },
      { id: 'c', texte: 'Uniquement l’absence de commissaire aux comptes' },
      { id: 'd', texte: 'Seule la violation du quorum de l’AGE entraîne la nullité' },
    ],
    reponseCorrecte: 'b',
    explication: 'L’Art. 557-1 AUSCGIE établit une liste limitative des nullités de plein droit : les violations des art. 546 (compétences AGO), 549-550 (quorum/majorité AGO), 551-554 (AGE) et 555-557 (assemblée spéciale) entraînent la nullité de la délibération sans qu’il soit besoin de prouver un préjudice.',
    articleRef: 'Art. 557-1 AUSCGIE'
  },
]

// ─── Études de cas : 4 cas ─────────────────────────────────────────────────────
const CAS_PRATIQUES: CasPratique[] = [
  {
    id: 'cas1',
    titre: 'Cas 1 : Clause léonine contestée',
    badge: 'Titres & Droits',
    couleur: 'bg-sky-600',
    accentCouleur: 'bg-sky-500',
    enonce: 'Les statuts de la SARL KINSHASA TECH prévoient que M. Banza, associé fondateur, recevra 80% des bénéfices distribués, bien qu’il ne détienne que 40% des parts sociales. Les autres associés, qui détiennent collectivement 60% des parts, se partagent uniquement 20% des bénéfices. Après 3 exercices bénéficiaires, les minoritaires contestent cette clause.',
    contexte: 'Capital : 10 000 000 CDF. 4 associés. M. Banza : 40% des parts. 3 autres : 20% chacun.',
    etapes: [
      {
        id: 'e1',
        question: 'La clause répartissant 80% des bénéfices à M. Banza (40% des parts) est-elle valide ? Fondement légal.',
        correctionDetaillee: 'Non, cette clause est réputée non écrite.\n\nL’Art. 54 AUSCGIE pose deux règles fondamentales :\n1. Les droits de chaque associé sont, en principe, proportionnels à ses apports.\n2. Sont réputées non écrites toutes clauses dites "léonines" qui attribuent à un associé la totalité des bénéfices, l’exonèrent de toute contribution aux pertes, ou privent les autres associés de tout bénéfice.\n\nEn l’espèce, attribuer 80% des bénéfices à un associé ne détenant que 40% du capital est disproportionné et prive les autres associés (60% du capital) de leurs droits proportionnels. La clause est frappée de nullité partielle : elle est réputée non écrite, sans affecter la validité du reste des statuts.',
        articleRef: 'Art. 54 AUSCGIE'
      },
      {
        id: 'e2',
        question: 'Comment les bénéfices auraient-ils dû être répartis ? Peut-on déroger à la proportionnalité ?',
        correctionDetaillee: 'En l’absence de clause valide, la répartition se fait proportionnellement aux apports (Art. 54 al. 1) :\n- M. Banza (40%) : 40% des bénéfices distribués\n- Les 3 autres (20% chacun) : 20% chacun\n\nDérogation autorisée : Les statuts PEUVENT valablement déroger à la stricte proportionnalité, à condition de ne pas tomber dans la clause léonine. Ainsi, attribuer 50% à M. Banza (au lieu de 40%) pourrait être validé si justifié par un rôle particulier, un savoir-faire ou un apport en industrie. Ce qui est interdit : priver un associé de TOUT bénéfice ou lui attribuer la totalité.',
        articleRef: 'Art. 54 AUSCGIE'
      }
    ]
  },
  {
    id: 'cas2',
    titre: 'Cas 2 : Abus de majorité',
    badge: 'Vote & Abus',
    couleur: 'bg-violet-600',
    accentCouleur: 'bg-violet-500',
    enonce: 'Depuis 5 ans, les associés majoritaires de la SA LUBUMBASHI MINING (détenant 65% du capital) votent systématiquement la mise en réserve intégrale des bénéfices, sans verser de dividendes. Par ailleurs, ils se font attribuer des rémunérations élevées en tant qu’administrateurs. Les minoritaires (35%) saisissent le tribunal pour abus de majorité.',
    contexte: 'Capitalisation : 500 millions FCFA. Bénéfices cumulés non distribués : 200 millions. Rémunérations annuelles des administrateurs majoritaires : 80 millions.',
    etapes: [
      {
        id: 'e1',
        question: 'L’abus de majorité est-il constitué ? Analysez les trois conditions cumulatives de l’Art. 130.',
        correctionDetaillee: 'L’Art. 130 AUSCGIE exige trois conditions cumulatives pour caractériser l’abus de majorité :\n\n1. Décision dans le seul intérêt des majoritaires : La mise en réserve systématique, combinée avec des rémunérations élevées versées AUX SEULS majoritaires (administrateurs), semble bénéficier exclusivement à ces derniers.\n\n2. Contraire à l’intérêt des minoritaires : Les minoritaires sont privés de dividendes depuis 5 ans tout en ne percevant aucune rémunération de la société.\n\n3. Injustifiable par l’intérêt social : Sur 5 ans, une mise en réserve systématique SANS qu’aucun investissement ou projet nécessitant ces réserves ne soit identifié paraît difficilement justifiable. La CCJA (arrêt de principe) précise que la mise en réserve systématique SANS préjudice prouvé ne constitue pas toujours un abus, mais le cumul réserves + rémunérations élevées change l’analyse.\n\nConclusion : L’abus paraît caractérisé, notamment par le cumul de la privation de dividendes et des rémunérations exclusives.',
        articleRef: 'Art. 130 AUSCGIE ; CCJA Jurisprudence'
      },
      {
        id: 'e2',
        question: 'Quelles sanctions le tribunal peut-il prononcer ? Et si les minoritaires bloquaient à leur tour les décisions ?',
        correctionDetaillee: 'Sanctions pour abus de majorité (Art. 130) :\n1. Nullité de la délibération abusée : les décisions de mise en réserve peuvent être annulées.\n2. Responsabilité civile des majoritaires : ils peuvent être condamnés à verser des dommages et intérêts aux minoritaires pour le préjudice subi.\n3. Cass. com. 9 juillet 2025 (n° 23-23.484) : l’action en nullité peut être dirigée contre la seule société, sans mise en cause des majoritaires.\n\nSi les minoritaires bloquent à leur tour (abus de minorité, Art. 131) :\nLe tribunal peut désigner un mandataire ad hoc pour voter à la place des minoritaires dans le sens de l’intérêt social. Ce mécanisme empêche les minoritaires de paraélyser la société.',
        articleRef: 'Art. 130-131 AUSCGIE ; Cass. com. 9 juillet 2025'
      }
    ]
  },
  {
    id: 'cas3',
    titre: 'Cas 3 : Quorum AGE non atteint',
    badge: 'Assemblées SA',
    couleur: 'bg-emerald-600',
    accentCouleur: 'bg-emerald-500',
    enonce: 'La SA GOMA TRADE convoque une AGE pour modifier son objet social et augmenter le capital. Lors de la 1re convocation, seuls 30% des actions avec droit de vote sont représentées. Le PDG propose quand même de voter la résolution. Lors de la 2e convocation (un mois plus tard), 28% des actions sont représentées. La résolution est adoptée à 70% des voix exprimées.',
    contexte: 'La SA a un capital de 200 millions FCFA. Aucune 3e convocation n’a été organisée.',
    etapes: [
      {
        id: 'e1',
        question: 'La délibération adoptée lors de la 1re convocation est-elle valide ? Pourquoi ?',
        correctionDetaillee: 'Non, la délibération de la 1re convocation est nulle.\n\nL’Art. 553 AUSCGIE exige pour l’AGE un quorum de la MOITIÉ (1/2) des actions ayant droit de vote lors de la 1re convocation. Or, seuls 30% des actions étaient représentés, ce qui est inférieur au quorum requis.\n\nConforment à l’Art. 557-1, la violation des règles de quorum de l’AGE entraîne la NULLITÉ DE PLEIN DROIT de la délibération. La CCJA (arrêt 033-2024 du 1er février 2024) a confirmé cette règle : un gérant nommé lors d’une AGE irrégulière n’a pas qualité pour agir en justice au nom de la société.',
        articleRef: 'Art. 553, 557-1 AUSCGIE ; CCJA arrêt 033-2024'
      },
      {
        id: 'e2',
        question: 'La délibération de la 2e convocation (28% présents, 70% favorables) est-elle valide ? Expliquez le mécanisme de la 3e convocation.',
        correctionDetaillee: 'La délibération de la 2e convocation est valide en ce qui concerne le QUORUM : l’Art. 553 al. 2 réduit le quorum à 1/4 (25%) des actions avec droit de vote. Avec 28%, le quorum est atteint.\n\nCependant, la MAJORITÉ est également satisfaite : 70% des voix exprimées > 2/3 requis par l’Art. 554. La résolution est donc validée.\n\nMécanisme de la 3e convocation (Art. 553 al. 3) :\nSi le quorum de 1/4 n’est pas atteint lors de la 2e convocation, une 3e convocation peut être tenue dans un délai maximum de 2 mois. Le quorum reste à 1/4. Ce mécanisme évite la paralysie de la société en cas d’absténtionisme des actionnaires.',
        articleRef: 'Art. 553-554 AUSCGIE'
      }
    ]
  },
  {
    id: 'cas4',
    titre: 'Cas 4 : Suppression du DPS',
    badge: 'Augmentation capital',
    couleur: 'bg-orange-600',
    accentCouleur: 'bg-orange-500',
    enonce: 'La SA KINSHASA INVEST décide une augmentation de capital par émission de 1 000 nouvelles actions à 10 000 CDF l’une. L’AGE vote la suppression du droit préférentiel de souscription (DPS) au profit de M. Diallo, investisseur extérieur. M. Diallo détient déjà 5% des actions de la SA et participe à l’AGE. La résolution est adoptée à 67% des voix exprimées.',
    contexte: 'Capital avant augmentation : 50 millions CDF. Actionnaires actuels : 6. M. Diallo vote pour la suppression de son propre DPS.',
    etapes: [
      {
        id: 'e1',
        question: 'M. Diallo pouvait-il voter sur la résolution de suppression du DPS dont il est bénéficiaire ? Quel est l’impact sur le calcul de la majorité ?',
        correctionDetaillee: 'Non. L’Art. 586-587 AUSCGIE dispose expressément que le bénéficiaire de la suppression du DPS ne prend pas part au vote sur cette résolution et ses actions ne sont pas prises en compte pour le calcul du quorum et de la majorité.\n\nLa CCJA (arrêt 7 juin 2018) a confirmé ce principe : la suppression du DPS est valide si, en excluant les voix du bénéficiaire, les 2/3 restants l’approuvent. Dans notre cas, si les voix de M. Diallo représentent une part significative du capital, l’exclusion pourrait faire tomber la majorité en dessous des 2/3 requis.\n\nToute délibération violée cette règle est nulle (Art. 557-1).',
        articleRef: 'Art. 586-587 AUSCGIE ; CCJA 7 juin 2018'
      },
      {
        id: 'e2',
        question: 'Quelles conditions de fond l’AGE doit-elle remplir avant de supprimer le DPS ? Quel rapport est exigé ?',
        correctionDetaillee: 'L’Art. 564 AUSCGIE exige que la décision d’augmentation de capital relève exclusivement de l’AGE, sur rapport du Conseil d’Administration (ou de l’Administrateur Général) ET du Commissaire aux Comptes.\n\nPour la suppression du DPS (Art. 586), le rapport du CA doit notamment :\n1. Indiquer les motifs de la suppression\n2. Préciser le prix d’émission et les bases de sa détermination\n3. Démontrer que la suppression est dans l’intérêt social\n\nPar ailleurs, l’Art. 572 impose que le capital existant soit intégralement libéré avant l’émission de nouvelles actions en numéraire. Si cette condition n’est pas remplie, l’augmentation est irrégulière.\n\nEnfin, les anciens actionnaires peuvent individuellement renoncer à leur DPS sans en indiquer les bénéficiaires (Art. 593).',
        articleRef: 'Art. 564, 572, 586, 593 AUSCGIE'
      }
    ]
  },
]

// ─── Leçons ────────────────────────────────────────────────────────────────────
const LECONS: Lecon[] = [
  {
    id: 'l1',
    icone: <Users className="h-5 w-5" />,
    titre: 'Titres sociaux et droits fondamentaux des associés',
    badge: 'Art. 51–66 AUSCGIE',
    questions: TOUTES_QCM.slice(0, 4),
    contenu: (
      <div className="space-y-4">
        <InfoBox couleur="sky" titre="Définition et nature des titres sociaux (Art. 51-52)">
          <p>Les <strong>titres sociaux</strong> sont les droits représentant la participation d’un associé dans une société commerciale. Ils prennent deux formes selon la structure sociale :</p>
          <ul className="list-disc list-inside mt-1.5 space-y-0.5 ml-1">
            <li><strong>Actions</strong> : dans les SA et SAS uniquement. Elles peuvent être cessibles ou négociables.</li>
            <li><strong>Parts sociales</strong> : dans les SARL, SNC et SCS. Elles sont uniquement cessibles (formalités civiles requises).</li>
          </ul>
          <p className="mt-1.5">Conformément à l’<strong>Art. 52</strong>, les titres sociaux sont des <strong>biens meubles incorporels</strong>, quelle que soit la nature des biens composant le patrimoine de la société. Cette qualification emporte des conséquences pratiques importantes : ils peuvent être nanis, cédés selon les règles des biens meubles, et entrent dans la masse à partager en cas de succession ou de liquidation de communauté.</p>
          <p className="mt-1.5">Les titres sont émis en contrepartie des <strong>apports</strong> des associés : apports en numéraire (argent), en nature (biens) ou en industrie (savoir-faire). Chaque titre correspond à une quote-part du capital social.</p>
        </InfoBox>

        <InfoBox couleur="blue" titre="Les quatre droits fondamentaux des associés (Art. 53)">
          <p>Tout titulaire de titres sociaux dispose de <strong>quatre droits irréductibles</strong>, sauf disposition expresse contraire de l’AUSCGIE :</p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-blue-300">
                  <th className="text-left py-1.5 pr-3 font-semibold">Droit</th>
                  <th className="text-left py-1.5 font-semibold">Contenu et conditions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-200">
                {[
                  { droit: '1. Droit aux bénéfices', contenu: 'Partager les bénéfices si l’assemblée décide une distribution. Aucun dividende sans décision collective.' },
                  { droit: '2. Droit aux actifs nets', contenu: 'Recevoir une quote-part des actifs nets en cas de dissolution ou de réduction de capital. Proportionnel aux titres détenus.' },
                  { droit: '3. Obligation aux pertes', contenu: 'Supporter sa part des pertes sociales. Dans les SA/SARL : limité aux apports. Dans les SNC : solidaire et indéfini.' },
                  { droit: '4. Droit de vote', contenu: 'Participer aux décisions collectives. Peut être aménagé par les statuts mais ne peut être totalement supprimé que par l’AUSCGIE lui-même.' },
                ].map(r => (
                  <tr key={r.droit}>
                    <td className="py-1.5 pr-3 font-semibold">{r.droit}</td>
                    <td className="py-1.5">{r.contenu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-1.5">L’<strong>Art. 55</strong> précise qu’aucun de ces droits ne peut être suspendu ou supprimé que par une disposition expresse de l’AUSCGIE. Tout pacte contraire serait nul.</p>
        </InfoBox>

        <InfoBox couleur="amber" titre="Principe de proportionnalité et clause léonine (Art. 54)">
          <p>Les droits de chaque associé sont, en principe, <strong>proportionnels à ses apports</strong>. Les statuts peuvent y déroger, mais dans certaines limites strictes.</p>
          <p className="mt-1.5"><strong>Clause léonine</strong><InfoTooltip texte="Expression tirée de la fable du lion d'Esope : tout profiter à l'un. Une clause léonine est celle qui attribue à un associé la totalité des bénéfices, l'exonère de toute contribution aux pertes, ou prive les autres associés de tout bénéfice. Sanction : réputée non écrite (nullité partielle : la clause est effaçée, les statuts restent valides)." loi="Art. 54 AUSCGIE" /> : est réputée non écrite toute stipulation qui :</p>
          <ul className="list-disc list-inside mt-1 space-y-0.5 ml-1">
            <li>Attribue à un associé la <strong>totalité des bénéfices</strong></li>
            <li>L’exonère de <strong>toute contribution aux pertes</strong></li>
            <li>Prive les autres associés de <strong>tout bénéfice</strong></li>
          </ul>
          <p className="mt-1.5">La sanction est la <strong>nullité partielle</strong> : la clause est réputée non écrite, mais cela n’affecte pas la validité du reste des statuts.</p>
        </InfoBox>

        <InfoBox couleur="violet" titre="Cessibilité et négociabilité des titres (Art. 57-58-59)">
          <p>L’AUSCGIE distingue soigneusement deux modes de transmission :</p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-violet-300">
                  <th className="text-left py-1.5 pr-3">Type de titre</th>
                  <th className="text-left py-1.5 pr-3">Mode de transmission</th>
                  <th className="text-left py-1.5">Formalités</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-200">
                {[
                  { type: 'Parts sociales (SARL, SNC)', mode: 'Cession', formalites: 'Acte écrit, signification à la société, accord des associés selon statuts' },
                  { type: 'Actions (SA, SAS)', mode: 'Cession ou négociation', formalites: 'Cession : acte ; Négociation : virement de compte à compte (Bourse ou gré à gré)' },
                ].map(r => (
                  <tr key={r.type}>
                    <td className="py-1.5 pr-3 font-semibold">{r.type}</td>
                    <td className="py-1.5 pr-3">{r.mode}</td>
                    <td className="py-1.5">{r.formalites}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-1.5">L’<strong>Art. 58</strong> réserve l’émission de titres <em>négociables</em> aux seules sociétés par actions (SA, SAS). Toute émission de titres négociables par une SARL ou une SNC est frappée de <strong>nullité absolue</strong>.</p>
          <p className="mt-1.5">En cas de désaccord sur la valeur des titres lors d’une cession, l’<strong>Art. 59</strong> prévoit la désignation d’un <strong>expert indépendant</strong> pour fixer le prix.</p>
        </InfoBox>

        <InfoBox couleur="emerald" titre="Capital social et réunion de tous les titres dans une seule main (Art. 60-66)">
          <p>Le <strong>capital social</strong> figure obligatoirement dans les statuts. Il représente la valeur totale des apports plus les incorporations de réserves. Il est librement fixé par les associés, sous réserve d’un minimum légal selon la forme sociale.</p>
          <p className="mt-1.5">L’<strong>Art. 56</strong> impose l’égalité de valeur nominale entre titres de même catégorie : toutes les actions ordinaires d’une SA ont la même valeur nominale.</p>
          <p className="mt-1.5">Situation particulière (\u00art. 60) : si tous les titres se retrouvent réunis dans <strong>une seule main</strong> (rachat progressif, succession...), la société <strong>n’est pas automatiquement dissoute</strong>. Un délai d’un an est accordé pour régulariser la situation en trouvant de nouveaux associés ou en procédant à une transformation. Passé ce délai sans régularisation, tout intéressé peut saisir le tribunal pour obtenir la dissolution.</p>
        </InfoBox>
      </div>
    )
  },
  {
    id: 'l2',
    icone: <Vote className="h-5 w-5" />,
    titre: 'Droit de vote, représentation et usufruit',
    badge: 'Art. 125–133 AUSCGIE',
    questions: TOUTES_QCM.slice(4, 8),
    contenu: (
      <div className="space-y-4">
        <InfoBox couleur="sky" titre="Principe général : droit de vote de tout associé (Art. 125-129)">
          <p>L’<strong>Art. 125</strong> pose la règle fondamentale : <strong>tout associé a le droit de voter</strong> dans les décisions collectives. Ce droit est inhent à la qualité d’associé et ne peut être supprimé que par l’AUSCGIE lui-même.</p>
          <p className="mt-1.5">L’<strong>Art. 129</strong> précise que les droits de vote sont, en principe, <strong>proportionnels au capital détenu</strong>. Les statuts peuvent toutefois aménager cette proportionnalité (ex : vote double, plafonnement des voix). L’<strong>Art. 129-1</strong> dispose que toute délibération violé les règles de vote est <strong>nulle</strong>.</p>
          <p className="mt-1.5">Le droit de vote ne peut pas être conué de manière permanente à un tiers. Toutefois, l’associé peut se faire représenter ponctuellement par un <strong>mandataire</strong>.</p>
        </InfoBox>

        <InfoBox couleur="violet" titre="Représentation par mandataire (Art. 126, 538-541 SA)">
          <p>Tout associé peut se faire représenter par un mandataire. Dans les sociétés autres que la SA, le mandataire doit en principe être un autre associé, sauf disposition statutaire contraire.</p>
          <p className="mt-1.5">Dans les <strong>SA</strong> (Art. 538), le mandataire peut être toute personne de son choix (associé ou non). La <strong>procuration</strong> doit obligatoirement mentionner :</p>
          <ul className="list-disc list-inside mt-1 space-y-0.5 ml-1">
            <li>L’identité du mandant et du mandataire</li>
            <li>La nature de l’assemblée (AGO, AGE, spéciale)</li>
            <li>La mention <em>"Bon pour pouvoir"</em></li>
            <li>La date</li>
          </ul>
          <p className="mt-1.5">La procuration vaut pour les deux assemblées (ordinaire et extraordinaire) convoquées le même jour ou dans un délai de <strong>7 jours</strong>.</p>
          <p className="mt-1.5">L’<strong>Art. 541</strong> impose que l’actionnaire soit inscrit au nom de la société au jour de l’assemblée (ou J-3 si les statuts le prévoient) pour avoir le droit de voter.</p>
          <p className="mt-1.5">Les actions rachetées par la société elle-même (Art. 542) sont privées du droit de vote et exclues du calcul du quorum.</p>
        </InfoBox>

        <InfoBox couleur="blue" titre="Titres en indivision et usufruit (Art. 127-128)">
          <p><strong>Indivision (Art. 127) :</strong> Lorsque des parts ou actions appartiennent à plusieurs personnes en indivision (héritiers non encore partagés, achat collectif...), elles doivent désigner <strong>un mandataire unique</strong> pour représenter l’ensemble des indivisaires lors des assemblées. En cas de désaccord sur le choix de ce mandataire, le <strong>juge compétent</strong> en désigne un parmi les indivisaires.</p>
          <p className="mt-2"><strong>Usufruit (Art. 128) :</strong> La situation est plus complexe. L’usufruit dissocie la <em>propriété</em> du titre (nu-propriétaire) de son <em>usage et de ses fruits</em> (usufruitier). L’AUSCGIE a réglé le conflit de la manière suivante :</p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-blue-300">
                  <th className="text-left py-1.5 pr-3">Type de décision</th>
                  <th className="text-left py-1.5">Qui vote ?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-200">
                {[
                  { type: 'Décisions ordinaires (AGO)', qui: 'Le nu-propriétaire en principe' },
                  { type: 'Affectation des bénéfices (dividendes)', qui: 'L’usufruitier (il perçoit les fruits)' },
                  { type: 'Modifications statutaires (AGE)', qui: 'Le nu-propriétaire en principe' },
                  { type: 'Aménagements statutaires possibles', qui: 'Les statuts peuvent inverser la règle' },
                ].map(r => (
                  <tr key={r.type}>
                    <td className="py-1.5 pr-3 font-semibold">{r.type}</td>
                    <td className="py-1.5">{r.qui}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </InfoBox>

        <InfoBox couleur="sky" titre="Droit de vote double dans les SA (Art. 544-545)">
          <p>L’AUSCGIE permet l’attribution d’un <strong>droit de vote double</strong> aux actionnaires fidèles, sous conditions cumulatives :</p>
          <ul className="list-disc list-inside mt-1.5 space-y-0.5 ml-1">
            <li>Actions <strong>nominatives</strong> (inscrites en compte au nom de l’actionnaire)</li>
            <li>Intégralement <strong>libérées</strong></li>
            <li>Inscrites depuis au moins <strong>2 ans</strong> au nom du même actionnaire</li>
            <li>Prévu par les <strong>statuts initiaux</strong> ou accordé par une <strong>AGE ultérieure</strong></li>
          </ul>
          <p className="mt-1.5"><strong>Perte du vote double (Art. 545) :</strong> Le droit de vote double est perdu en cas de :</p>
          <ul className="list-disc list-inside mt-1 space-y-0.5 ml-1">
            <li>Conversion de l’action nominative en action <strong>au porteur</strong></li>
            <li>Transfert de <strong>propriété</strong> (vente, donation entre vifs, échange)</li>
          </ul>
          <p className="mt-1.5">Exceptions où le vote double est conservé malgré le transfert : <strong>succession</strong>, <strong>donation en ligne directe</strong>, <strong>liquidation de communauté de biens entre époux</strong>.</p>
        </InfoBox>

        <InfoBox couleur="emerald" titre="Actions nantiées et plafonnement des voix (Art. 540-543)">
          <p><strong>Nantissement (Art. 540) :</strong> Lorsqu’une action est nantie (donnée en garantie d’un emprunt), le <strong>droit de vote appartient au propriétaire</strong> de l’action (le débiteur), et non au créancier nanti. Le nanti n’est pas actionnaire et ne vote pas.</p>
          <p className="mt-1.5"><strong>Minimum de voix (Art. 543) :</strong> Chaque action donne droit à au minimum une voix. Les statuts peuvent toutefois <strong>plafonner le nombre de voix</strong> par actionnaire, à condition que ce plafonnement s’applique de manière identique à tous les actionnaires. Ce mécanisme protège les minoritaires contre une domination excessive des majoritaires.</p>
          <p className="mt-1.5">Important : en <strong>AGE</strong>, aucune limitation de voix <strong>ne peut être opposée</strong> aux actionnaires (Art. 552). Les plafonnements statutaires sont inefficaces en assemblée extraordinaire.</p>
        </InfoBox>
      </div>
    )
  },
  {
    id: 'l3',
    icone: <Gavel className="h-5 w-5" />,
    titre: 'Décisions collectives, abus et procès-verbal',
    badge: 'Art. 130–136 AUSCGIE',
    questions: TOUTES_QCM.slice(8, 12),
    contenu: (
      <div className="space-y-4">
        <InfoBox couleur="sky" titre="Types de décisions collectives (Art. 132-133)">
          <p>L’Art. 132 distingue deux grandes catégories de décisions :</p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-sky-300">
                  <th className="text-left py-1.5 pr-3">Catégorie</th>
                  <th className="text-left py-1.5 pr-3">Objet</th>
                  <th className="text-left py-1.5">Majorité générale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-200">
                {[
                  { cat: 'Décisions ordinaires', objet: 'Gestion courante : comptes annuels, rémunérations, nominations', majorite: 'Majorité des voix exprimées (variable selon forme)' },
                  { cat: 'Décisions extraordinaires', objet: 'Modification des statuts, fusions, augmentation de capital', majorite: '2/3 ou unanimité selon les cas' },
                ].map(r => (
                  <tr key={r.cat}>
                    <td className="py-1.5 pr-3 font-semibold">{r.cat}</td>
                    <td className="py-1.5 pr-3">{r.objet}</td>
                    <td className="py-1.5">{r.majorite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-1.5">L’Art. 133 offre deux modes de consultation : l’<strong>assemblée générale</strong> (réunion physique) ou la <strong>consultation écrite</strong> (envoi de bulletins de vote par courrier), selon les modalités prévues dans les statuts.</p>
        </InfoBox>

        <InfoBox couleur="blue" titre="Vote à distance : correspondance et visioconférence (Art. 133-1 et 133-2)">
          <p>L’AUSCGIE révisé de 2014 a consacré deux modes alternatifs de vote, confirés par la pratique et la jurisprudence (Ndoumga 2025) :</p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-blue-300">
                  <th className="text-left py-1.5 pr-3">Mode</th>
                  <th className="text-left py-1.5">Conditions et modalités</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-200">
                {[
                  { mode: 'Vote par correspondance (Art. 133-1)', conditions: 'Prévu par les statuts. Préavis de 3 jours avant le scrutin. Bulletin de vote reçu 24h avant. Votes comptabilisés comme présents.' },
                  { mode: 'Visioconférence (Art. 133-2)', conditions: 'Prévu par les statuts. Vote oral à distance validé. Incidents techniques (coupure, déconnexion) doivent être mentionnés dans le PV. L’associé déconnecté est réputé absent à partir de la coupure.' },
                ].map(r => (
                  <tr key={r.mode}>
                    <td className="py-1.5 pr-3 font-semibold">{r.mode}</td>
                    <td className="py-1.5">{r.conditions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-1.5 text-xs italic">Actualité : l’étude Ndoumga 2025 (Scribd) confirm que ces dispositions sont désormais effectives dans l’espace OHADA. La digitalisation du RCCM en cours facilite également le dépôt des PV en ligne.</p>
        </InfoBox>

        <InfoBox couleur="red" titre="Abus de majorité (Art. 130) : conditions et sanctions">
          <p>L’<strong>abus de majorité</strong> est un mécanisme fondamental de protection des associés minoritaires. Il suppose la réunion cumulative de <strong>trois conditions</strong> :</p>
          <ol className="list-decimal list-inside mt-1.5 space-y-1 ml-1">
            <li><strong>Décision dans le seul intérêt des majoritaires</strong> : la majorité vote pour son propre avantage, sans considération de l’intérêt commun.</li>
            <li><strong>Contraire à l’intérêt des minoritaires</strong> : la décision pénalise effectivement les associés minoritaires (ex : privation de dividendes au profit de rémunérations des majoritaires).</li>
            <li><strong>Injustifiable par l’intérêt social</strong> : la décision ne peut être justifiée par une raison objective liée au développement ou à la survie de la société.</li>
          </ol>
          <p className="mt-1.5"><strong>Jurisprudence CCJA :</strong> La mise en réserve systématique des bénéfices, sans préjudice prouvé pour les minoritaires, ne constitue pas nécessairement un abus. Il faut analyser l’ensemble du contexte.</p>
          <p className="mt-1.5"><strong>Actualité France (applicable par analogie) :</strong> Cass. com. 9 juillet 2025 (n° 23-23.484) : l’action en nullité pour abus de majorité peut être dirigée contre la seule société, sans obligation de mettre en cause les actionnaires majoritaires, sauf si une demande indemnitaire est formulée.</p>
          <p className="mt-1.5"><strong>Sanctions :</strong></p>
          <ul className="list-disc list-inside mt-1 space-y-0.5 ml-1">
            <li><strong>Nullité</strong> de la délibération abusée</li>
            <li><strong>Dommages et intérêts</strong> en faveur des minoritaires lésés</li>
          </ul>
        </InfoBox>

        <InfoBox couleur="amber" titre="Abus de minorité et d’égalité (Art. 131)">
          <p>L’abus peut aussi être le fait des <strong>minoritaires ou égalitaires</strong> qui paralysent la société. L’Art. 131 vise les situations où des associés bloquent systématiquement des décisions indispensables à la vie sociale, sans intérêt légitime.</p>
          <p className="mt-1.5"><strong>Mécanisme de correction :</strong> Le juge peut désigner un <strong>mandataire ad hoc</strong> pour voter à la place des associés dont le comportement est qualifié d’abusif. Ce mandataire vote dans le sens de l’intérêt social lors de la prochaine assemblée. Cela évite la paralysie de la société sans exclure les minoritaires de manière définitive.</p>
          <p className="mt-1.5"><strong>Actualité :</strong> Cass. com. 7 mai 2025 (n° 23-21.508) précise que la charge de la preuve de l’abus incombe à celui qui l’invoque, et que la seule violation des statuts ne suffit pas à constituer un abus si elle ne porte pas atteinte à une règle impérative.</p>
        </InfoBox>

        <InfoBox couleur="emerald" titre="Procès-verbal des assemblées (Art. 134-136)">
          <p>Le <strong>procès-verbal (PV)</strong> est l’acte juridique qui consacre les décisions de l’assemblée. L’Art. 134 en fixe le contenu obligatoire :</p>
          <ul className="list-disc list-inside mt-1.5 space-y-0.5 ml-1">
            <li><strong>Date, heure et lieu</strong> de la réunion</li>
            <li><strong>Identité des associés</strong> présents, représentés ou votant à distance</li>
            <li><strong>Ordre du jour</strong> de la séance</li>
            <li><strong>Documents et rapports</strong> soumis à la discussion</li>
            <li><strong>Résumé des débats</strong></li>
            <li><strong>Texte intégral des résolutions</strong> soumises au vote</li>
            <li><strong>Résultats des votes</strong> pour chaque résolution (pour, contre, abstentions)</li>
          </ul>
          <p className="mt-1.5"><strong>Conservation (Art. 135-136) :</strong> Les PV sont inscrits sur un <strong>registre spécial coté et paraphé</strong> par une autorité judiciaire. L’utilisation de feuilles mobiles est possible sous conditions. Les PV originaux sont conservés au <strong>siège social</strong>. Les copies certifiées sont délivrées par le représentant légal de la société.</p>
        </InfoBox>
      </div>
    )
  },
  {
    id: 'l4',
    icone: <Scale className="h-5 w-5" />,
    titre: 'Assemblées de SA : AGO et AGE',
    badge: 'Art. 519–557 AUSCGIE',
    questions: TOUTES_QCM.slice(12, 16),
    contenu: (
      <div className="space-y-4">
        <InfoBox couleur="sky" titre="Convocation des assemblées de SA (Art. 519-524)">
          <p>L’<strong>avis de convocation</strong> (Art. 519) est un acte formel qui doit obligatoirement mentionner : la dénomination et la forme de la société, le montant du capital, le siège social, le numéro RCCM, la date, l’heure, le lieu de réunion, la nature de l’assemblée (AGO, AGE ou spéciale), et l’ordre du jour. Une assemblée irrégulièrement convoquée peut être annulée, <strong>sauf si tous les actionnaires sont présents ou représentés</strong>.</p>
          <p className="mt-1.5"><strong>Ordre du jour (Art. 520-522) :</strong> L’OJ est fixé par l’auteur de la convocation. Les actionnaires peuvent faire inscrire des résolutions selon des seuils dégressifs (Art. 520) : 5% du capital si &lt; 1 milliard FCFA, 3% si entre 1 et 2 milliards, 0,50% si \&gt; 2 milliards. L’assemblée ne délibère que sur les points inscrits à l’OJ, <strong>sauf exception</strong> : la révocation d’un administrateur peut être décidée en toutes circonstances, même en dehors de l’OJ (Art. 522).</p>
          <p className="mt-1.5"><strong>Accès aux documents (Art. 525-528) :</strong> Dans les 15 jours précédant l’assemblée, tout actionnaire peut consulter au siège : l’inventaire, les états financiers, les rapports du CAC, la liste des actionnaires et les rémunérations des 10 dirigeants les mieux rémunérés. Le droit de copie est accordé, sauf pour l’inventaire. En cas de refus, le tribunal peut ordonner la communication sous astreinte.</p>
        </InfoBox>

        <InfoBox couleur="blue" titre="Bureau de l’assemblée et feuille de présence (Art. 529-536)">
          <p>Chaque assemblée de SA est présidée par le PDG, le PCA ou, à défaut, par l’actionnaire présent ou représenté possédant ou représentant le plus grand nombre d’actions.</p>
          <p className="mt-1.5">Le bureau est composé de :</p>
          <ul className="list-disc list-inside mt-1 space-y-0.5 ml-1">
            <li><strong>Le président</strong> de séance (PDG ou désigné par l’assemblée)</li>
            <li><strong>Deux scrutateurs</strong> (actionnaires présents représentant le plus grand nombre d’actions)</li>
            <li><strong>Un secrétaire</strong> (peut être non actionnaire)</li>
          </ul>
          <p className="mt-1.5"><strong>Feuille de présence (Art. 531) :</strong> Elle est obligatoire et doit être émargement signée par tous les actionnaires présents ou représentés, puis certifiée par les scrutateurs. Sa violation entraîne la nullité de la délibération.</p>
        </InfoBox>

        <InfoBox couleur="emerald" titre="Assemblée Générale Ordinaire (AGO) : compétences, quorum, majorité (Art. 546-550)">
          <p>L’<strong>AGO</strong> est compétente pour toutes les décisions qui ne sont pas de la compétence exclusive de l’AGE. Ses principales attributions :</p>
          <ul className="list-disc list-inside mt-1.5 space-y-0.5 ml-1">
            <li><strong>Approbation des états financiers annuels</strong> et affectation du résultat (la réserve légale est de 1/10 du bénéfice jusqu’à 1/5 du capital)</li>
            <li>Nomination et révocation des administrateurs, directeurs généraux et commissaires aux comptes</li>
            <li>Approbation des <strong>conventions réglementées</strong> (contrats entre la société et ses dirigeants)</li>
            <li>Émission d’<strong>obligations</strong> (titre de créance)</li>
          </ul>
          <p className="mt-1.5">L’AGO doit se tenir au moins <strong>une fois par an</strong> dans les <strong>6 mois</strong> suivant la clôture de l’exercice (Art. 548).</p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-emerald-300">
                  <th className="text-left py-1.5 pr-3">Convocation</th>
                  <th className="text-left py-1.5 pr-3">Quorum</th>
                  <th className="text-left py-1.5">Majorité</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-200">
                {[
                  { conv: '1re convocation', quorum: '1/4 des actions avec droit de vote', majorite: 'Majorité des voix exprimées' },
                  { conv: '2e convocation', quorum: 'Aucun quorum', majorite: 'Majorité des voix exprimées' },
                ].map(r => (
                  <tr key={r.conv}>
                    <td className="py-1.5 pr-3 font-semibold">{r.conv}</td>
                    <td className="py-1.5 pr-3">{r.quorum}</td>
                    <td className="py-1.5">{r.majorite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-1.5">Note : les bulletins blancs ne sont <strong>pas comptés</strong> dans les voix exprimées (Art. 550).</p>
        </InfoBox>

        <InfoBox couleur="amber" titre="Assemblée Générale Extraordinaire (AGE) : compétences, quorum, majorité (Art. 551-554)">
          <p>L’<strong>AGE</strong> est seule habilitité à modifier les statuts. Elle décide notamment :</p>
          <ul className="list-disc list-inside mt-1.5 space-y-0.5 ml-1">
            <li><strong>Modification de l’objet social, de la forme sociale</strong> (transformation en SA, SARL...)</li>
            <li><strong>Fusion, scission, apport partiel d’actif</strong></li>
            <li><strong>Transfert du siège social</strong> (unanimité si dans un autre État)</li>
            <li><strong>Augmentation ou réduction de capital</strong></li>
            <li><strong>Prolongation ou dissolution anticipée</strong> de la société</li>
          </ul>
          <p className="mt-1.5"><strong>Limite absolue :</strong> L’AGE ne peut pas augmenter les engagements des actionnaires sans leur accord individuel (Art. 551 al. 2).</p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-amber-300">
                  <th className="text-left py-1.5 pr-3">Convocation</th>
                  <th className="text-left py-1.5 pr-3">Quorum</th>
                  <th className="text-left py-1.5">Majorité</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-200">
                {[
                  { conv: '1re', quorum: '1/2 des actions avec droit de vote', majorite: '2/3 voix exprimées' },
                  { conv: '2e', quorum: '1/4 des actions avec droit de vote', majorite: '2/3 voix exprimées' },
                  { conv: '3e (dans 2 mois max)', quorum: '1/4 des actions avec droit de vote', majorite: '2/3 voix exprimées' },
                  { conv: 'Transfert siège autre État', quorum: '—', majorite: 'Unanimité présents/représentés' },
                ].map(r => (
                  <tr key={r.conv}>
                    <td className="py-1.5 pr-3 font-semibold">{r.conv}</td>
                    <td className="py-1.5 pr-3">{r.quorum}</td>
                    <td className="py-1.5">{r.majorite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-1.5">En AGE, <strong>aucune limitation de voix</strong> ne peut être opposée à un actionnaire (Art. 552).</p>
        </InfoBox>

        <InfoBox couleur="violet" titre="Assemblée spéciale et nullités de plein droit (Art. 555-557-1)">
          <p>L’<strong>assemblée spéciale</strong> réunit les titulaires d’une <strong>catégorie particulière d’actions</strong> (actions à dividende prioritaire, actions à vote plural, obligations convertibles...) pour approuver ou désapprouver les décisions qui modifient leurs droits spécifiques.</p>
          <p className="mt-1.5">Sans l’accord de l’assemblée spéciale concernée, la décision de l’AGE modifiant les droits de cette catégorie est inopposable aux titulaires. Quorum : 1/2 (1re conv.), 1/4 (2e et 3e). Majorité : 2/3 des voix exprimées.</p>
          <p className="mt-1.5"><strong>Nullités de plein droit (Art. 557-1) :</strong> La loi établit une liste limitative des violations qui entraînent la nullité automatique des délibérations. Ces violations portent sur les règles de compétence, de quorum et de majorité des Art. 546, 549, 550, 551, 552, 553, 554, 555, 556 et 557. Contrairement aux nullités relatives, ces nullités <strong>ne nécessitent pas la preuve d’un préjudice</strong>.</p>
        </InfoBox>
      </div>
    )
  },
  {
    id: 'l5',
    icone: <PlusCircle className="h-5 w-5" />,
    titre: 'Augmentation de capital et droit préférentiel de souscription',
    badge: 'Art. 562–600 AUSCGIE',
    questions: TOUTES_QCM.slice(16, 20),
    contenu: (
      <div className="space-y-4">
        <InfoBox couleur="sky" titre="Formes d’augmentation de capital (Art. 562-565)">
          <p>La société peut augmenter son capital de quatre manières distinctes :</p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-sky-300">
                  <th className="text-left py-1.5 pr-3">Mode</th>
                  <th className="text-left py-1.5 pr-3">Description</th>
                  <th className="text-left py-1.5">Règles applicables</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-200">
                {[
                  { mode: 'Émission d’actions nouvelles en numéraire', desc: 'Apport d’argent frais par les actionnaires ou de nouveaux investisseurs', regles: 'Capital DOIT être intégralement libéré (Art. 572) ; DPS obligatoire (Art. 573)' },
                  { mode: 'Majoration de la valeur nominale', desc: 'Augmentation de la valeur de chaque action existante', regles: 'Libération intégrale du capital existant requise' },
                  { mode: 'Compensation de créance', desc: 'Un créancier convertit sa créance en capital', regles: 'Créance liquide et exigible' },
                  { mode: 'Incorporation de réserves/bénéfices', desc: 'Les réserves ou le report à nouveau sont incorporés au capital', regles: 'Conditions d’AGO suffisent (Art. 565)' },
                ].map(r => (
                  <tr key={r.mode}>
                    <td className="py-1.5 pr-3 font-semibold">{r.mode}</td>
                    <td className="py-1.5 pr-3">{r.desc}</td>
                    <td className="py-1.5">{r.regles}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-1.5"><strong>Compétence :</strong> L’AGE est seule compétente pour décider l’augmentation de capital (Art. 564), sauf pour l’incorporation de réserves qui peut relèver des conditions d’AGO (Art. 565). L’AGE peut déléguer ce pouvoir au CA ou à l’AG pour une durée maximale de <strong>24 mois</strong> (Art. 567-1).</p>
        </InfoBox>

        <InfoBox couleur="blue" titre="Condition préalable : libération intégrale du capital (Art. 572)">
          <p>Avant toute émission de nouvelles actions en numéraire, la loi impose une condition absolue et irréfragilable : le <strong>capital social existant doit être intégralement libéré</strong>.</p>
          <p className="mt-1.5">Cette règle signifie que tous les apports promis lors des émissions précédentes doivent avoir été effectivement versés à la société. Si une partie des anciennes actions n’est pas encore libérée, aucune nouvelle émission en numéraire n’est permise.</p>
          <p className="mt-1.5">La justification est la <strong>protection des futurs souscripteurs</strong> : ils doivent pouvoir s’assurer que la société a bien encaissé l’intégralité de ses capitaux propres avant d’émettre de nouveaux titres.</p>
          <p className="mt-1.5">Délai de réalisation (Art. 571) : la réalisation de l’augmentation doit intervenir dans un délai de <strong>3 ans</strong>. Elle est réputée réalisée à la date de la déclaration notariée de souscription et de versement.</p>
        </InfoBox>

        <InfoBox couleur="emerald" titre="Droit Préférentiel de Souscription (DPS) : exercice et durée (Art. 573-593)">
          <p>Le <strong>DPS</strong> est le droit reconnu à tout actionnaire de souscrire, en priorité et en proportion de ses actions, aux nouvelles actions émises lors d’une augmentation de capital en numéraire.</p>
          <p className="mt-1.5"><strong>Caractères du DPS :</strong></p>
          <ul className="list-disc list-inside mt-1 space-y-0.5 ml-1">
            <li><strong>Irréductible</strong> : chaque actionnaire peut souscrire au minimum proportionnellement à ses droits</li>
            <li><strong>Proportionnel</strong> : le nombre d’actions nouvelles offertes est proportionnel aux actions déjà détenues</li>
            <li><strong>Durée minimale</strong> : 20 jours pour exercer le DPS (Art. 573)</li>
            <li><strong>Cessible</strong> : l’actionnaire peut céder son DPS à un tiers si les actions auxquelles ils se rattachent sont elles-mêmes négociables</li>
          </ul>
          <p className="mt-1.5"><strong>Renonciation individuelle (Art. 593-595) :</strong> Un actionnaire peut, à titre individuel, renoncer à l’exercice de son DPS. Cette renonciation peut être faite avec ou sans indication du bénéficiaire. Elle ne vaut pas suppression générale du DPS.</p>
          <p className="mt-1.5"><strong>Exception : émission pour apports en nature</strong> : le DPS ne s’applique pas aux augmentations de capital par apports en nature (immeubles, matériel, créances). Dans ce cas, un commissaire aux apports doit évaluer la valeur des biens apportés.</p>
        </InfoBox>

        <InfoBox couleur="red" titre="Suppression du DPS (Art. 586-587) : procédure et actualité">
          <p>L’AGE peut décider de <strong>supprimer le DPS</strong> au profit d’une ou plusieurs personnes désignées (investisseurs extérieurs, salariés, partenaires stratégiques). Cette décision est encadrée par des règles strictes :</p>
          <p className="mt-1.5"><strong>Rapport obligatoire :</strong> Le CA (ou l’AG) et le Commissaire aux Comptes doivent présenter des rapports expliquant les motifs de la suppression, le prix d’émission et sa justification.</p>
          <p className="mt-1.5"><strong>Règle fondamentale (Art. 586-587) :</strong> Le bénéficiaire de la suppression du DPS ne prend <strong>pas part au vote</strong> sur cette résolution. Ses actions ne sont pas prises en compte pour le calcul du <strong>quorum ni de la majorité</strong>.</p>
          <p className="mt-1.5"><strong>Jurisprudence CCJA (arrêt 7 juin 2018) :</strong> La suppression du DPS est valide dès lors que, en excluant les voix du bénéficiaire, les 2/3 requis sont atteints. En cas de violation, la délibération est nulle de plein droit (Art. 557-1).</p>
          <p className="mt-1.5"><strong>Nouveau règlement arbitrage CCJA (en vigueur 1er juillet 2025) :</strong> Les litiges liés aux augmentations de capital peuvent désormais être soumis à l’arbitrage CCJA dans des conditions procédurales renforcées.</p>
        </InfoBox>

        <InfoBox couleur="slate" titre="Tableau de synthèse : AGO vs AGE vs Assemblée spéciale">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-300">
                  <th className="text-left py-1.5 pr-3">Critère</th>
                  <th className="text-left py-1.5 pr-3">AGO</th>
                  <th className="text-left py-1.5 pr-3">AGE</th>
                  <th className="text-left py-1.5">Spéciale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { crit: 'Objet', ago: 'Gestion courante', age: 'Modification statuts', spec: 'Droits d’une catégorie' },
                  { crit: 'Quorum 1re conv.', ago: '1/4', age: '1/2', spec: '1/2' },
                  { crit: 'Quorum 2e conv.', ago: 'Aucun', age: '1/4', spec: '1/4' },
                  { crit: 'Majorité', ago: 'Simple', age: '2/3', spec: '2/3' },
                  { crit: 'Limitation voix', ago: 'Possible', age: 'Interdite (Art. 552)', spec: 'Possible' },
                  { crit: 'Fréquence', ago: '1 fois/an minimum', age: 'Selon besoins', spec: 'Si droits modifiés' },
                ].map(r => (
                  <tr key={r.crit}>
                    <td className="py-1.5 pr-3 font-semibold">{r.crit}</td>
                    <td className="py-1.5 pr-3">{r.ago}</td>
                    <td className="py-1.5 pr-3">{r.age}</td>
                    <td className="py-1.5">{r.spec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </InfoBox>
      </div>
    )
  }
]

// ─── Conversion QCMQuestion → QCMChapitre ────────────────────────────────────
function toQCMChapitre(q: QCMQuestion): QCMChapitre {
  return {
    id: q.id,
    question: q.question,
    options: q.options,
    reponseCorrecte: q.reponseCorrecte,
    explication: q.explication,
    articleRef: q.articleRef,
  }
}

// ─── Page principale ───────────────────────────────────────────────────────────
export default function UE2Chapitre8Page() {
  const goBack = useGoBack('/ue2-droit-societes')
  const currentUser = useUser()
  const isStudent = currentUser?.role === 'etudiant'

  const [activeTab, setActiveTab] = useState<'lecons' | 'qcm' | 'cas' | 'devoir'>('lecons')
  const [leconIdx, setLeconIdx] = useState(0)
  const lecon = LECONS[leconIdx]
  const isFirst = leconIdx === 0
  const isLast = leconIdx === LECONS.length - 1

  const [qcmIdx, setQcmIdx] = useState(0)
  const [qcmSelected, setQcmSelected] = useState<string | null>(null)
  const [qcmShowResult, setQcmShowResult] = useState(false)
  const [qcmScore, setQcmScore] = useState(0)
  const [qcmDone, setQcmDone] = useState(false)
  const currentQ = TOUTES_QCM[qcmIdx]

  function nextQcm() {
    if (!qcmSelected) return
    const correct = qcmSelected === currentQ.reponseCorrecte
    const newScore = qcmScore + (correct ? 1 : 0)
    setQcmScore(newScore)
    if (qcmIdx + 1 >= TOUTES_QCM.length) { setQcmDone(true) }
    else { setQcmIdx(qcmIdx + 1); setQcmSelected(null); setQcmShowResult(false) }
  }

  function resetQcm() {
    setQcmIdx(0); setQcmSelected(null); setQcmShowResult(false); setQcmScore(0); setQcmDone(false)
  }

  return (
    <div className="space-y-4 pb-10 animate-fadeIn">
      {/* En-tête */}
            <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 2 — Droit des sociétés', route: '/ue2-droit-societes' },
            { label: 'Chapitre 8' },
          ]}
          color="indigo"
        />
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-lg font-bold text-foreground leading-tight">Les associés et les assemblées</h1>
          <InfoTooltip texte="Les associés et les assemblées : titres sociaux, droits de vote, assemblées de SA, augmentation de capital" loi="Art. 51–600 AUSCGIE" />
        </div>
        <p className="text-xs text-muted-foreground">Art. 51–600 AUSCGIE : Titres, Vote, Assemblées SA, Augmentation de capital</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Leçons', value: String(LECONS.length) },
          { label: 'QCM', value: String(TOUTES_QCM.length) },
          { label: 'Cas pratiques', value: String(CAS_PRATIQUES.length) },
          { label: 'Durée', value: '4h' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Objectifs */}
      <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-sky-600" />
          <span className="text-sm font-semibold text-sky-800">Objectifs</span>
        </div>
        <ul className="space-y-1">
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Identifier les titres sociaux et les quatre droits fondamentaux des associés (Art. 51–55)</span></li>
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Maîtriser les règles de vote, de représentation, d’usufruit et de vote double (Art. 125–133)</span></li>
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Analyser l’abus de majorité et de minorité avec la jurisprudence CCJA et française 2025</span></li>
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Distinguer les compétences, quorums et majorités de l’AGO, l’AGE et l’assemblée spéciale (Art. 546–557)</span></li>
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Comprendre les modalités d’augmentation de capital et le droit préférentiel de souscription (Art. 562–600)</span></li>
        </ul>
      </div>

      {/* Onglets */}
      <div className="flex gap-1 rounded-xl bg-muted p-1">
        {([['lecons', 'Leçons'], ['qcm', 'QCM'], ['cas', 'Cas pratiques'], ['devoir', 'Devoir']] as [typeof activeTab, string][]).map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn('flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors', activeTab === tab ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
            {label}
          </button>
        ))}
      </div>

      {/* === LEÇONS === */}
      {activeTab === 'lecons' && (
        <div className="space-y-4">
          <div className="flex gap-1 flex-wrap">
            {LECONS.map((l, i) => (
              <button key={l.id} onClick={() => setLeconIdx(i)} className={cn('text-xs px-3 py-1.5 rounded-lg border transition-colors', leconIdx === i ? 'bg-sky-600 text-white border-sky-600' : 'border-border hover:border-sky-400')}>
                L{i + 1}
              </button>
            ))}
          </div>
          <div className="rounded-xl border-l-4 border-l-sky-500 bg-card border border-border p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-sky-600">Leçon {leconIdx + 1} / {LECONS.length}</span>
              <span className="text-xs text-muted-foreground">{lecon.badge ?? ''}</span>
            </div>
            <h2 className="text-base font-bold text-foreground">{lecon.titre}</h2>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4 space-y-2">
              {lecon.contenu}
            </div>
            {lecon.questions.filter(q => q.type === 'qcm').map((q, idx) => (
              <QCMBlock key={idx} q={q as QCMQuestion} />
            ))}
          </div>
          <div className="flex items-center justify-between pt-2">
            <button onClick={() => { if (!isFirst) setLeconIdx(leconIdx - 1) }} disabled={isFirst} className={cn('flex items-center gap-1 text-sm px-4 py-2 rounded-xl border transition-colors', isFirst ? 'opacity-40 cursor-not-allowed border-border' : 'border-border hover:border-sky-500')}>
              <ArrowLeft className="h-4 w-4" /> Précédente
            </button>
            <span className="text-xs text-muted-foreground">{leconIdx + 1} / {LECONS.length}</span>
            {!isLast ? (
              <button onClick={() => setLeconIdx(leconIdx + 1)} className="flex items-center gap-1 text-sm px-4 py-2 rounded-xl border border-border hover:border-sky-500 transition-colors">
                Suivante <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={() => setActiveTab('qcm')} className="flex items-center gap-1 text-sm px-4 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-700 transition-colors">
                Aller aux QCM <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* === QCM === */}
      {activeTab === 'qcm' && (
        <div className="space-y-4">
          {!qcmDone ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Question {qcmIdx + 1} / {TOUTES_QCM.length}</span>
                <span className="text-xs text-muted-foreground">{currentQ.articleRef}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-sky-500 h-1.5 rounded-full transition-all" style={{ width: `${((qcmIdx) / TOUTES_QCM.length) * 100}%` }} /></div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-semibold text-foreground mb-4">{currentQ.question}</p>
                <div className="space-y-2">
                  {currentQ.options.map(opt => {
                    let cls = 'w-full text-left text-sm px-3 py-2.5 rounded-lg border transition-colors '
                    if (!qcmShowResult) cls += qcmSelected === opt.id ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-border hover:border-sky-400 hover:bg-muted/50'
                    else if (opt.id === currentQ.reponseCorrecte) cls += 'border-green-500 bg-green-50 text-green-700'
                    else if (opt.id === qcmSelected) cls += 'border-red-500 bg-red-50 text-red-700'
                    else cls += 'border-border opacity-50'
                    return (
                      <button key={opt.id} className={cls} onClick={() => { if (!qcmShowResult) setQcmSelected(opt.id) }} disabled={qcmShowResult}>
                        <span className="font-semibold mr-2">{opt.id.toUpperCase()}.</span>{opt.texte}
                      </button>
                    )
                  })}
                </div>
                {qcmShowResult && (
                  <div className={cn('mt-3 rounded-lg p-3 text-xs', qcmSelected === currentQ.reponseCorrecte ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')}>
                    <div className="flex items-center gap-1 font-semibold mb-1">{qcmSelected === currentQ.reponseCorrecte ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}{qcmSelected === currentQ.reponseCorrecte ? 'Correct !' : 'Incorrect'}</div>
                    <p>{currentQ.explication}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {!qcmShowResult ? (
                  <button onClick={() => { if (qcmSelected) setQcmShowResult(true) }} disabled={!qcmSelected} className="flex-1 py-2 rounded-xl text-sm font-semibold bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-40 transition-colors">Vérifier</button>
                ) : (
                  <button onClick={nextQcm} className="flex-1 py-2 rounded-xl text-sm font-semibold bg-sky-600 text-white hover:bg-sky-700 transition-colors">{qcmIdx + 1 >= TOUTES_QCM.length ? 'Voir résultat' : 'Suivant →'}</button>
                )}
                <button onClick={resetQcm} className="px-4 py-2 rounded-xl text-sm border border-border hover:bg-muted transition-colors">Réinitialiser</button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-6 text-center space-y-3">
              <CheckCircle2 className="h-10 w-10 text-sky-500 mx-auto" />
              <p className="text-lg font-bold text-foreground">{qcmScore} / {TOUTES_QCM.length}</p>
              <p className="text-sm text-muted-foreground">{qcmScore >= 16 ? 'Excellent ! Vous maîtrisez parfaitement les associés et les assemblées.' : qcmScore >= 12 ? 'Bon niveau. Relisez les leçons sur les assemblées de SA.' : 'Relisez les leçons, notamment sur les quorums et majorités.'}</p>
              <button onClick={resetQcm} className="px-6 py-2 rounded-xl text-sm font-semibold bg-sky-600 text-white hover:bg-sky-700 transition-colors">Recommencer</button>
            </div>
          )}
        </div>
      )}

      {/* === CAS PRATIQUES === */}
      {activeTab === 'cas' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-foreground px-1">Cas pratiques : {CAS_PRATIQUES.length} exercices</h2>
          {CAS_PRATIQUES.map(cp => <CasPratiqueBlock key={cp.id} cp={cp} />)}
        </div>
      )}

      {/* === DEVOIR === */}
      {activeTab === 'devoir' && (
        <div className="space-y-4">
          {isStudent ? (
            <DevoirChapitreCreateur
              chapitreId="ue2-chapitre-8"
              chapitreNom="Chapitre 8 : Les associes et les assemblees"
              questions={TOUTES_QCM.map(toQCMChapitre)}
              coursId="ue2-droit-societes"
              casPratiquesExistants={CAS_PRATIQUES.map(cp => ({
                id: cp.id,
                titre: cp.titre,
                enonce: cp.enonce,
                corrigeType: cp.etapes.map(e => `${e.question}\n${e.correctionDetaillee}`).join('\n\n'),
              } as CasPratiqueExistant))}
            />
          ) : (
            <div className="rounded-xl border border-border bg-card p-6 text-center space-y-2">
              <BookOpen className="h-8 w-8 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground">Le devoir est réservé aux étudiants inscrits.</p>
            </div>
          )}
        </div>
      )}

      {/* Terminer */}
      <button onClick={goBack} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition-colors">
        <CheckCircle2 className="h-4 w-4" /> Terminer le chapitre 8
      </button>

      <p className="text-xs text-center text-muted-foreground/60 pb-2">
        Sources : AUSCGIE révisé 30/01/2014 Art. 51–600 · Jurisprudence CCJA 2018-2024 · Cass. com. 2025 · Code pratique OHADA 2026-2027
      </p>
    </div>
  )
}
