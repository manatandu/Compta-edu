import { useState } from 'react'
import { useGoBack } from '@/lib/navContext'
import {
  ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Scale, Shield, Info,
  AlertTriangle, ChevronDown, ChevronUp, FileText, Star
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import { isStudentRole } from '@/lib/permissions'
import DevoirChapitreCreateur, { CasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
import QCMPageUnique from '@/components/QCMPageUnique'
import { QCMChapitre } from '@/lib/db'
import { InfoTooltip } from '@/components/InfoTooltip'
import { Breadcrumb } from '@/components/Breadcrumb'
import BackButton from '@/components/BackButton'

// ─── Types QCM (identiques Ch1) ──────────────────────────────────────────────
type QCMOption = { id: string; texte: string }
type QCMQuestion = {
  type: 'qcm'; id: string; question: string
  options: QCMOption[]; reponseCorrecte: string
  explication: string; articleRef: string
}

// ─── Données QCM ──────────────────────────────────────────────────────────────
const qcmQuestions: QCMQuestion[] = [
  {
    type: 'qcm', id: 'ch10-q1',
    question: "Selon l'art. 200 AUSCGIE, combien de causes légales peuvent entraîner la fin d'une société ?",
    options: [
      { id: 'a', texte: '4 causes' },
      { id: 'b', texte: '5 causes' },
      { id: 'c', texte: '7 causes' },
      { id: 'd', texte: '10 causes' },
    ],
    reponseCorrecte: 'c',
    explication: "L'Art. 200 AUSCGIE énumère 7 causes de dissolution : expiration du temps, réalisation ou extinction de l'objet, annulation du contrat, décision des associés, dissolution judiciaire anticipée, effet d'un jugement de liquidation, et toute autre cause statutaire.",
    articleRef: 'Art. 200 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q2',
    question: "La dissolution d'une société a effet à l'égard des tiers :",
    options: [
      { id: 'a', texte: "Le jour de la décision de dissolution" },
      { id: 'b', texte: "A compter de sa publication dans un journal d'annonces légales" },
      { id: 'c', texte: "A compter du dépôt au RCCM" },
      { id: 'd', texte: "Immédiatement sans formalité" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 201 AUSCGIE précise que la dissolution n'a d'effet à l'égard des tiers qu'à compter de sa publication par avis inséré dans un journal habilité à recevoir les annonces légales dans l'État partie du siège social.",
    articleRef: 'Art. 201 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q3',
    question: "Lors de la dissolution d'une société, la personnalité morale :",
    options: [
      { id: 'a', texte: "Disparaît immédiatement" },
      { id: 'b', texte: "Subsiste pour les besoins de la liquidation jusqu'à sa clôture" },
      { id: 'c', texte: "Est suspendue pendant 6 mois" },
      { id: 'd', texte: "Est transférée aux liquidateurs" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 205 AUSCGIE dispose que la personnalité morale de la société subsiste pour les besoins de la liquidation et jusqu'à la publication de la clôture de celle-ci.",
    articleRef: 'Art. 205 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q4',
    question: "Dans une SARL, comment est nommé le liquidateur lors d'une liquidation décidée par les associés ?",
    options: [
      { id: 'a', texte: "A l'unanimité des associés" },
      { id: 'b', texte: "A la majorité en capital des associés" },
      { id: 'c', texte: "Aux conditions de l'AGE" },
      { id: 'd', texte: "Par le tribunal uniquement" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 206, 3° AUSCGIE : dans les SARL, le liquidateur est nommé à la majorité en capital des associés. Dans les SA, c'est aux conditions de quorum et majorité prévues pour les AGE.",
    articleRef: 'Art. 206 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q5',
    question: "Le liquidateur peut-il continuer les affaires en cours sans autorisation judiciaire ?",
    options: [
      { id: 'a', texte: "Oui, toujours, dans le cadre de la liquidation" },
      { id: 'b', texte: "Non, il ne peut continuer les affaires que s'il y a été autorisé par décision de justice" },
      { id: 'c', texte: "Oui, si les associés l'ont autorisé dans l'acte de nomination" },
      { id: 'd', texte: "Non, le liquidateur ne peut jamais continuer des affaires" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 231 AUSCGIE : le liquidateur est habilité à payer les créanciers et répartir le solde. Il ne peut continuer les affaires en cours ou en engager de nouvelles, pour les besoins de la liquidation, QUE s'il y a été autorisé par décision de justice.",
    articleRef: 'Art. 231 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q6',
    question: "La cession de l'actif de la société en liquidation au liquidateur lui-même est :",
    options: [
      { id: 'a', texte: "Autorisée avec l'accord de l'assemblée générale" },
      { id: 'b', texte: "Interdite" },
      { id: 'c', texte: "Autorisée avec l'accord des 2/3 des associés" },
      { id: 'd', texte: "Autorisée avec l'accord du tribunal" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 214 AUSCGIE interdit formellement la cession de tout ou partie de l'actif au liquidateur lui-même, à ses employés ou à leurs conjoints, ascendants ou descendants. Cette interdiction est absolue et toute violation est nulle (Art. 215-1).",
    articleRef: 'Art. 214 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q7',
    question: "Dans quel délai la clôture de la liquidation doit-elle intervenir après la dissolution ?",
    options: [
      { id: 'a', texte: "1 an" },
      { id: 'b', texte: "2 ans" },
      { id: 'c', texte: "3 ans" },
      { id: 'd', texte: "5 ans" },
    ],
    reponseCorrecte: 'c',
    explication: "L'Art. 216 AUSCGIE impose que la clôture de la liquidation intervienne dans un délai de 3 ans à compter de la dissolution. A défaut, le ministère public ou tout intéressé peut saisir la juridiction compétente.",
    articleRef: 'Art. 216 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q8',
    question: "Après la clôture de la liquidation, dans quel délai le liquidateur doit-il demander la radiation au RCCM ?",
    options: [
      { id: 'a', texte: "15 jours" },
      { id: 'b', texte: "1 mois à compter de la publication de la clôture" },
      { id: 'c', texte: "3 mois" },
      { id: 'd', texte: "6 mois" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 220 AUSCGIE : sur justification des formalités de dépôt des comptes définitifs, le liquidateur demande la radiation de la société au RCCM dans le délai d'un mois à compter de la publication de la clôture de la liquidation.",
    articleRef: 'Art. 220 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q9',
    question: "Le boni de liquidation (après remboursement du nominal) est réparti entre les associés :",
    options: [
      { id: 'a', texte: "A parts égales entre tous les associés" },
      { id: 'b', texte: "En proportion de leur participation au capital, sauf clause contraire des statuts" },
      { id: 'c', texte: "Uniquement aux associés fondateurs" },
      { id: 'd', texte: "Selon décision du liquidateur" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 237 AUSCGIE : sauf clause contraire des statuts, le partage des capitaux propres subsistant après remboursement du nominal est effectué entre les associés dans les mêmes proportions que leur participation au capital social.",
    articleRef: 'Art. 237 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q10',
    question: "L'action en responsabilité contre le liquidateur se prescrit par :",
    options: [
      { id: 'a', texte: "1 an" },
      { id: 'b', texte: "2 ans" },
      { id: 'c', texte: "3 ans à compter du fait dommageable ou de sa révélation" },
      { id: 'd', texte: "5 ans" },
    ],
    reponseCorrecte: 'c',
    explication: "L'Art. 221 al. 2 AUSCGIE : l'action sociale ou individuelle en responsabilité contre le liquidateur se prescrit par 3 ans à compter du fait dommageable ou, s'il a été dissimulé, de sa révélation.",
    articleRef: 'Art. 221 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q11',
    question: "Toute action contre les associés non liquidateurs après dissolution se prescrit par :",
    options: [
      { id: 'a', texte: "3 ans à compter de la dissolution" },
      { id: 'b', texte: "5 ans à compter de la publication de la dissolution au RCCM" },
      { id: 'c', texte: "10 ans à compter de la clôture de la liquidation" },
      { id: 'd', texte: "1 an à compter du partage du boni" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 222 AUSCGIE : toute action contre les associés non liquidateurs ou leurs conjoints survivants, héritiers ou ayants-cause, se prescrit par 5 ans à compter de la publication de la dissolution de la société au RCCM.",
    articleRef: 'Art. 222 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q12',
    question: "La mention obligatoire sur les actes pendant la liquidation est :",
    options: [
      { id: 'a', texte: '"société dissoute"' },
      { id: 'b', texte: '"société en liquidation" + nom du ou des liquidateurs' },
      { id: 'c', texte: '"société en faillite"' },
      { id: 'd', texte: '"société en cessation d\'activité"' },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 204 AUSCGIE impose que la mention \"société en liquidation\" ainsi que le nom du ou des liquidateurs figurent sur TOUS les actes et documents émanant de la société et destinés aux tiers : lettres, factures, annonces, publications.",
    articleRef: 'Art. 204 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q13',
    question: "La dissolution d'une société entraîne-t-elle la fin des fonctions du commissaire aux comptes ?",
    options: [
      { id: 'a', texte: "Oui, immédiatement" },
      { id: 'b', texte: "Non, ses fonctions subsistent" },
      { id: 'c', texte: "Oui, sauf accord des associés" },
      { id: 'd', texte: "Oui, mais il reste 6 mois pour rendre ses comptes" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 225 AUSCGIE dispose expressément que la dissolution de la société ne met pas fin aux fonctions du commissaire aux comptes. Il continue à exercer ses missions pendant la liquidation.",
    articleRef: 'Art. 225 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q14',
    question: "La nullité d'une société entraîne :",
    options: [
      { id: 'a', texte: "Sa dissolution avec effet rétroactif" },
      { id: 'b', texte: "Sa dissolution sans rétroactivité, suivie de sa liquidation" },
      { id: 'c', texte: "La responsabilité pénale automatique des fondateurs" },
      { id: 'd', texte: "Le remboursement immédiat de tous les apports" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 253 AUSCGIE : lorsque la nullité de la société est prononcée, elle met fin, SANS rétroactivité, à l'exécution du contrat. Il est procédé à sa dissolution et à sa liquidation.",
    articleRef: 'Art. 253 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q15',
    question: "L'action en nullité d'une fusion ou scission se prescrit par :",
    options: [
      { id: 'a', texte: "3 ans" },
      { id: 'b', texte: "6 mois à compter de la dernière inscription au RCCM" },
      { id: 'c', texte: "1 an à compter de la fusion" },
      { id: 'd', texte: "2 ans à compter de l'AG d'approbation" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 251 AUSCGIE prévoit un délai spécial pour la fusion/scission : l'action en nullité se prescrit par 6 mois à compter de la date de la dernière inscription au RCCM rendue nécessaire par l'opération. (Délai général pour les actes : 3 ans.)",
    articleRef: 'Art. 251 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q16',
    question: "Dans une SARL en liquidation, la cession globale de l'actif à une autre société requiert :",
    options: [
      { id: 'a', texte: "L'unanimité des associés" },
      { id: 'b', texte: "La majorité exigée pour la modification des statuts" },
      { id: 'c', texte: "La majorité en capital" },
      { id: 'd', texte: "La décision judiciaire" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 215, 3° AUSCGIE : dans les SARL, la cession globale de l'actif est autorisée à la majorité exigée pour la modification des statuts. Dans les SA, c'est aux conditions de l'AGE.",
    articleRef: 'Art. 215 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q17',
    question: "Dans quelle situation la dissolution d'une société n'entraîne-t-elle PAS de liquidation ?",
    options: [
      { id: 'a', texte: "Lorsque les associés y renoncent" },
      { id: 'b', texte: "Lorsque tous les titres sont détenus par une seule personne MORALE associée unique" },
      { id: 'c', texte: "Lorsque la société est déficitaire" },
      { id: 'd', texte: "Lorsque le liquidateur désigné y renonce" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 201 al. 4 AUSCGIE : la dissolution d'une société dont tous les titres sont détenus par un seul associé (personne morale) entraîne la transmission universelle du patrimoine à cet associé, sans liquidation. Cette exception ne s'applique pas si l'associé unique est une personne physique.",
    articleRef: 'Art. 201 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q18',
    question: "Les pouvoirs des dirigeants sociaux prennent fin lors d'une liquidation judiciaire :",
    options: [
      { id: 'a', texte: "30 jours après la décision de justice" },
      { id: 'b', texte: "A dater de la décision de justice qui ordonne la liquidation" },
      { id: 'c', texte: "A la date de nomination du liquidateur" },
      { id: 'd', texte: "A la clôture de la liquidation" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 224 AUSCGIE : les pouvoirs du conseil d'administration ou des dirigeants sociaux prennent fin à dater de la décision de justice qui ordonne la liquidation de la société.",
    articleRef: 'Art. 224 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q19',
    question: "L'action en nullité d'une société se prescrit par :",
    options: [
      { id: 'a', texte: "1 an à compter de la constitution" },
      { id: 'b', texte: "3 ans à compter de l'immatriculation" },
      { id: 'c', texte: "5 ans à compter de la première AG" },
      { id: 'd', texte: "10 ans si fraude" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 251 AUSCGIE : les actions en nullité de la société se prescrivent par 3 ans à compter de l'immatriculation de la société ou de la publication de l'acte modifiant les statuts, sauf si la nullité est fondée sur l'illicéité de l'objet social.",
    articleRef: 'Art. 251 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch10-q20',
    question: "Les sommes non distribuées aux associés ou créanciers doivent être déposées sur compte séquestre auprès du Trésor Public après :",
    options: [
      { id: 'a', texte: "6 mois après la clôture" },
      { id: 'b', texte: "1 an après la clôture de la liquidation" },
      { id: 'c', texte: "3 ans après la dissolution" },
      { id: 'd', texte: "Immédiatement après la décision de répartition" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 240 AUSCGIE : les sommes attribuées à des créanciers ou associés qui n'ont pu leur être versées sont déposées, à l'expiration du délai d'un an à compter de la clôture de la liquidation, sur un compte séquestre auprès du Trésor Public.",
    articleRef: 'Art. 240 AUSCGIE',
  },
]

// ─── Leçons ──────────────────────────────────────────────────────────────────
const lecons = [
  { id: 'L1', titre: 'Les causes de dissolution', ref: 'Art. 200-202 AUSCGIE' },
  { id: 'L2', titre: 'Le liquidateur : nomination et pouvoirs', ref: 'Art. 206-214 AUSCGIE' },
  { id: 'L3', titre: 'Opérations de liquidation', ref: 'Art. 215-241 AUSCGIE' },
  { id: 'L4', titre: 'Responsabilité du liquidateur', ref: 'Art. 221-222 AUSCGIE' },
  { id: 'L5', titre: 'Nullités des sociétés et des actes', ref: 'Art. 242-256 AUSCGIE' },
  { id: 'L6', titre: 'Liquidation judiciaire ordonnée par justice', ref: 'Art. 223-229 AUSCGIE' },
]

// ─── Cas pratiques ────────────────────────────────────────────────────────────
const casPratiques = [
  {
    id: 'cas1',
    titre: 'Cas 1 : Dissolution pour mésentente',
    niveau: 'Art. 200, 5° AUSCGIE',
    contexte: "La SARL KINSHASA TECH est paralysée depuis 8 mois. Les associés MBOTE (60%) et NZUZI (40%) s'opposent systématiquement sur toutes les décisions importantes. Aucune AG valide ne peut être tenue. L'entreprise perd des marchés. NZUZI veut la dissolution.",
    questions: [
      'Question 1 : NZUZI peut-il obtenir la dissolution de la société en justice ?',
      'Question 2 : Quels effets la dissolution entraîne-t-elle pour la société ?',
    ],
    correction: "Q1 : Oui. L'Art. 200, 5° AUSCGIE prévoit la dissolution anticipée prononcée par la juridiction compétente à la demande d'un associé pour justes motifs, notamment la mésentente empêchant le fonctionnement normal. La paralysie de 8 mois avec perte de marchés est un juste motif caractérisé.\n\nQ2 : La dissolution entraîne de plein droit la mise en liquidation (Art. 201 al. 2). La personnalité morale subsiste jusqu'à la clôture (Art. 205). Elle n'a d'effet envers les tiers qu'après publication (Art. 201 al. 1). La société doit mentionner \"en liquidation\" sur tous ses actes (Art. 204).",
  },
  {
    id: 'cas2',
    titre: "Cas 2 : Irrégularité dans la cession d'actifs",
    niveau: 'Art. 213-214 AUSCGIE',
    contexte: "Lors de la liquidation de la SARL GOMA BATIMENT, le liquidateur KIBAMBE vend des équipements à son cousin, également salarié de la société en liquidation. Les associés n'ont pas donné d'accord unanime.",
    questions: [
      'Question 1 : Cette cession est-elle valide ?',
      'Question 2 : Quelle est la sanction applicable et qui peut l\'invoquer ?',
    ],
    correction: "Q1 : Non. L'Art. 214 AUSCGIE interdit la cession au liquidateur, à ses employés, ou à leurs parents. L'acheteur est cousin ET salarié : double interdiction. La nullité s'impose sans possibilité d'accord (Art. 215-1).\n\nQ2 : Les opérations en violation de l'Art. 214 sont nulles (Art. 215-1). Tout intéressé peut demander l'annulation. Le liquidateur engage sa responsabilité (Art. 221) et peut être révoqué (Art. 211).",
  },
  {
    id: 'cas3',
    titre: "Cas 3 : Nullité d'une délibération",
    niveau: 'Art. 243, 251 AUSCGIE',
    contexte: "L'AG de la SA BUKAVU MINING vote une modification des statuts en violation d'une clause essentielle des statuts. Un actionnaire minoritaire découvre l'irrégularité 2 ans et 8 mois après la délibération.",
    questions: [
      'Question 1 : La délibération peut-elle être annulée ?',
      "Question 2 : L'action en nullité est-elle encore recevable ?",
    ],
    correction: "Q1 : Oui. L'Art. 243 AUSCGIE prévoit la nullité de tout acte modifiant les statuts en violation d'une clause jugée essentielle par la juridiction compétente. La clause étant essentielle par les statuts eux-mêmes, la nullité est prononcéable.\n\nQ2 : Oui. L'Art. 251 fixe la prescription à 3 ans. L'actionnaire agit 2 ans et 8 mois après la délibération, soit dans le délai. L'action est recevable. (Rappel : pour fusion/scission, le délai est de 6 mois seulement, Art. 251 al. 3.)",
  },
  {
    id: 'cas4',
    titre: 'Cas 4 : Clôture de liquidation et radiation',
    niveau: 'Art. 216-220 AUSCGIE',
    contexte: "La SARL MANIEMA COMMERCE est en liquidation depuis 4 ans. Le liquidateur n'a pas encore convoqué l'assemblée de clôture ni déposé les comptes définitifs.",
    questions: [
      'Question 1 : Le délai légal est-il dépassé ?',
      'Question 2 : Quelles sont les étapes formelles pour clore la liquidation ?',
    ],
    correction: "Q1 : Oui. L'Art. 216 AUSCGIE impose la clôture dans un délai de 3 ans à compter de la dissolution. Avec 4 ans, le délai est dépassé d'un an. Le ministère public ou tout intéressé peut saisir la juridiction compétente pour imposer l'achèvement.\n\nQ2 : Etapes (Art. 217-220) : (1) Le liquidateur convoque l'assemblée pour approuver les comptes définitifs et donner quitus. (2) Les comptes sont déposés au RCCM (Art. 219). (3) Le liquidateur demande la radiation dans le mois suivant la publication de la clôture (Art. 220).",
  },
]

// ─── Composant CasPratiqueBlock ───────────────────────────────────────────────
function CasPratiqueBlock({ cp }: { cp: typeof casPratiques[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-red-200 rounded-xl overflow-hidden">
      <div className="bg-red-700 px-5 py-4 text-white flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base">{cp.titre}</h3>
          <span className="text-xs text-red-200">{cp.niveau}</span>
        </div>
      </div>
      <div className="p-5 space-y-4 bg-white">
        {/* Contexte */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Contexte</p>
          <p className="text-sm text-amber-900 leading-relaxed">{cp.contexte}</p>
        </div>
        {/* Questions */}
        <div className="space-y-2">
          {cp.questions.map((q, idx) => (
            <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-900 font-medium">
              {q}
            </div>
          ))}
        </div>
        {/* Correction */}
        <div>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-sm font-medium text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg px-4 py-2 transition-colors"
          >
            {open ? <><ChevronUp className="w-4 h-4" />Masquer la correction</> : <><ChevronDown className="w-4 h-4" />Voir la correction</>}
          </button>
          {open && (
            <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-gray-800 whitespace-pre-line">
              {cp.correction}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function UE2Chapitre10Page() {
  const goBack = useGoBack('/ue2-droit-societes')
  const user = useUser()

  // Onglets
  const [activeTab, setActiveTab] = useState<'lecons' | 'qcm' | 'cas' | 'devoir'>('lecons')
  // Leçon active
  const [activeLecon, setActiveLecon] = useState(0)
  // QCM états

  const lecon = lecons[activeLecon]




  return (
    <div className="space-y-4 pb-10 animate-fadeIn">

      {/* ─── HEADER ─── */}
      <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 2 - Droit des sociétés', route: '/ue2-droit-societes' },
            { label: 'Chapitre 10' },
          ]}
          color="indigo"
        />
        <BackButton />
        <h1 className="text-xl font-display font-bold text-gray-900 leading-tight mt-0.5">Dissolution et Liquidation des Sociétés</h1>
        <p className="text-sm text-gray-500">AUSCGIE - Articles 200 à 256 - OHADA</p>
      </div>

      {/* ─── STATS ─── */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Leçons', value: '6', icon: BookOpen },
          { label: 'QCM', value: '20', icon: CheckCircle2 },
          { label: 'Cas pratiques', value: '4', icon: FileText },
          { label: 'Durée', value: '3h', icon: Star },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white border border-red-100 rounded-xl p-3 text-center shadow-sm">
            <Icon className="w-4 h-4 text-red-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-red-700">{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      {/* ─── OBJECTIFS ─── */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">Objectifs du chapitre</p>
        <ul className="space-y-1">
          {[
            'Identifier les 7 causes légales de dissolution (Art. 200 AUSCGIE)',
            'Comprendre les pouvoirs et obligations du liquidateur (Art. 206-231)',
            'Maîtriser les opérations de liquidation et les délais légaux',
            'Distinguer la responsabilité du liquidateur et des associés',
            'Connaître le régime des nullités des sociétés et des actes (Art. 242-256)',
          ].map((obj, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-red-900">
              <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              {obj}
            </li>
          ))}
        </ul>
      </div>

      {/* ─── ONGLETS ─── */}
      <div className="bg-muted p-1 rounded-xl flex gap-1">
        {(isStudentRole(user)
          ? [{ key: 'lecons', label: 'Leçons' }, { key: 'devoir', label: 'Devoir' }]
          : [{ key: 'lecons', label: 'Leçons' }, { key: 'qcm', label: 'QCM' }, { key: 'cas', label: 'Cas pratiques' }, { key: 'devoir', label: 'Devoir' }]
        ).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as typeof activeTab)}
            className={cn(
              'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all',
              activeTab === key
                ? 'bg-white text-red-700 shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          ONGLET LEÇONS
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'lecons' && (
        <div className="space-y-4">
          {/* Boutons leçons */}
          <div className="flex flex-wrap gap-2">
            {lecons.map((l, idx) => (
              <button
                key={l.id}
                onClick={() => setActiveLecon(idx)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
                  activeLecon === idx
                    ? 'bg-red-600 text-white border-red-600 shadow'
                    : 'bg-white text-red-700 border-red-200 hover:bg-red-50'
                )}
              >
                {l.id}
              </button>
            ))}
          </div>

          {/* Carte leçon */}
          <div className="bg-white border-l-4 border-red-500 rounded-xl shadow-sm p-5 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-full px-3 py-0.5">{lecon.ref}</span>
              </div>
              <h2 className="text-lg font-display font-bold text-gray-900">{lecon.id} - {lecon.titre}</h2>
            </div>

            {/* ── LEÇON 1 ── */}
            {activeLecon === 0 && (
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-2">
                  <Scale className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-900">
                    <strong>Art. 200 AUSCGIE :</strong> La société prend fin par l'une des causes suivantes.
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Les 7 causes légales de dissolution (Art. 200)</h4>
                  <ol className="space-y-2">
                    {[
                      "Expiration du temps pour lequel elle a été constituée",
                      "Réalisation ou extinction de son objet",
                      "Annulation du contrat de société",
                      "Décision des associés aux conditions de modification des statuts",
                      "Dissolution anticipée prononcée par la juridiction compétente (justes motifs : inexécution d'obligations par un associé, mésentente entre associés)",
                      "Effet d'un jugement ordonnant la liquidation des biens",
                      "Toute autre cause prévue par les statuts",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700">
                        <span className="bg-red-100 text-red-800 font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                        {i === 4 ? (
                          <span>
                            Dissolution anticipée prononcée par la juridiction compétente
                            {' '}<InfoTooltip texte="La dissolution judiciaire anticipée peut être demandée par un associé pour justes motifs : inexécution de ses obligations par un associé, ou mésentente entre associés empêchant le fonctionnement normal de la société. La juridiction compétente statue." loi="Art. 200, 5° AUSCGIE" />
                            {' '}(justes motifs : inexécution d'obligations, mésentente entre associés)
                          </span>
                        ) : item}
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Effets de la dissolution (Art. 201)
                    {' '}<InfoTooltip texte="La personnalité morale de la société subsiste pour les besoins de la liquidation et jusqu'à la clôture de celle-ci (Art. 205). La société conserve sa capacité d'ester en justice et de contracter pendant cette période." loi="Art. 201, 205 AUSCGIE" />
                  </h4>
                  <ul className="space-y-1.5">
                    {[
                      "Effet à l'égard des tiers : à compter de la publication (journal d'annonces légales)",
                      "La dissolution pluripersonnelle entraîne de plein droit la mise en liquidation",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Exception :</strong> société unipersonnelle (personnes morales) : transmission universelle du patrimoine SANS liquidation, sous réserve d'opposition des créanciers (30 jours)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Exception :</strong> société unipersonnelle (personne physique associée unique) : mise en liquidation quand même</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Formalités de publicité (Art. 202)</h4>
                  <ul className="space-y-1.5">
                    {[
                      "Avis dans journal d'annonces légales",
                      "Dépôt au RCCM des actes et PV",
                      "Modification de l'inscription au RCCM",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-amber-900"><strong>Opposition des créanciers (Art. 201) :</strong> lors de la dissolution d'une société dont tous les titres sont détenus par une personne morale unique, les créanciers peuvent faire opposition dans les 30 jours. La transmission du patrimoine n'est réalisée et la société ne disparaît qu'à l'issue de ce délai ou après rejet de l'opposition.</div>
                </div>
              </div>
            )}

            {/* ── LEÇON 2 ── */}
            {activeLecon === 1 && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Nomination du liquidateur (Art. 206)</h4>
                  <div className="overflow-x-auto rounded-lg border border-red-200">
                    <table className="w-full text-sm">
                      <thead className="bg-red-100">
                        <tr>
                          <th className="text-left p-3 font-semibold text-red-900">Forme sociale</th>
                          <th className="text-left p-3 font-semibold text-red-900">Majorité requise</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-red-100">
                        <tr className="bg-red-50">
                          <td className="p-3 font-medium text-gray-800">SNC</td>
                          <td className="p-3 text-gray-700">Unanimité des associés</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="p-3 font-medium text-gray-800">SCS</td>
                          <td className="p-3 text-gray-700">Unanimité des commandités + majorité en capital des commanditaires</td>
                        </tr>
                        <tr className="bg-red-50">
                          <td className="p-3 font-medium text-gray-800">SARL</td>
                          <td className="p-3 text-gray-700">Majorité en capital des associés</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="p-3 font-medium text-gray-800">SA</td>
                          <td className="p-3 text-gray-700">Conditions de l'AGE (quorum et majorité)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2 text-sm">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-blue-900"><strong>Art. 207 :</strong> Le liquidateur peut être choisi parmi les associés ou parmi des tiers. Il peut être une personne morale. <strong>Art. 208 :</strong> Si les associés n'ont pu nommer un liquidateur, il est désigné par décision de justice.</div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Pouvoirs du liquidateur (Art. 230-231)
                    {' '}<InfoTooltip texte="Le liquidateur a les pouvoirs les plus étendus pour réaliser l'actif, même à l'amiable. Les restrictions résultant des statuts ou de l'acte de nomination ne sont PAS opposables aux tiers. Il engage la société pour tous les actes de liquidation." loi="Art. 230 AUSCGIE" />
                  </h4>
                  <ul className="space-y-1.5">
                    {[
                      "Représente la société et l'engage pour tous les actes de liquidation",
                      "Pouvoirs les plus étendus pour réaliser l'actif (même à l'amiable)",
                      "Restrictions statutaires inopposables aux tiers",
                      "Paiement des créanciers et répartition du solde aux associés (Art. 231)",
                      "Ne peut continuer les affaires ou en engager de nouvelles qu'avec autorisation judiciaire",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Rémunération (Art. 210)</h4>
                  <p className="text-sm text-gray-700">Fixée par les associés ou, à défaut, par la juridiction compétente.</p>
                </div>

                <div className="space-y-2">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-amber-900"><strong>Art. 213 :</strong> La cession de tout ou partie de l'actif à un ancien dirigeant, associé ou commissaire aux comptes ne peut avoir lieu qu'avec l'autorisation de la juridiction compétente (sauf consentement unanime des associés). Toute violation est nulle (Art. 215-1).</div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-amber-900"><strong>Art. 214 :</strong> La cession de tout ou partie de l'actif au liquidateur lui-même, à ses employés ou à leurs conjoints/ascendants/descendants est INTERDITE. Violation sanctionnée par la nullité.</div>
                  </div>
                </div>
              </div>
            )}

            {/* ── LEÇON 3 ── */}
            {activeLecon === 2 && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Cession globale de l'actif (Art. 215)</h4>
                  <div className="overflow-x-auto rounded-lg border border-red-200">
                    <table className="w-full text-sm">
                      <thead className="bg-red-100">
                        <tr>
                          <th className="text-left p-3 font-semibold text-red-900">Forme sociale</th>
                          <th className="text-left p-3 font-semibold text-red-900">Majorité requise</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-red-100">
                        <tr className="bg-red-50"><td className="p-3 font-medium text-gray-800">SNC</td><td className="p-3 text-gray-700">Unanimité des associés</td></tr>
                        <tr className="bg-white"><td className="p-3 font-medium text-gray-800">SCS</td><td className="p-3 text-gray-700">Unanimité des commandités + majorité en capital des commanditaires</td></tr>
                        <tr className="bg-red-50"><td className="p-3 font-medium text-gray-800">SARL</td><td className="p-3 text-gray-700">Majorité exigée pour la modification des statuts</td></tr>
                        <tr className="bg-white"><td className="p-3 font-medium text-gray-800">SA</td><td className="p-3 text-gray-700">Conditions de l'AGE</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Délai de clôture
                    {' '}<InfoTooltip texte="La clôture doit intervenir dans un délai de 3 ans à compter de la dissolution. A défaut, le ministère public ou tout intéressé peut saisir la juridiction compétente pour faire procéder à la liquidation ou à son achèvement." loi="Art. 216 AUSCGIE" />
                  </h4>
                  <p className="text-sm text-gray-700">La clôture doit intervenir dans un délai de <strong>3 ans</strong> à compter de la dissolution. A défaut, le ministère public ou tout intéressé peut saisir la juridiction compétente.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Rapport annuel du liquidateur (Art. 232-233)</h4>
                  <ul className="space-y-1.5">
                    {[
                      "Dans les 3 mois de la clôture de chaque exercice : états financiers + rapport de gestion",
                      "Convocation annuelle de l'assemblée (au moins 1 fois par an, dans les 6 mois de la clôture)",
                      "Rapport initial (Art. 228) : dans les 6 mois de la nomination, rapport sur situation actif/passif",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Clôture de la liquidation (Art. 217-220)</h4>
                  <ol className="space-y-1.5">
                    {[
                      "Convocation des associés pour statuer sur comptes définitifs + quitus du liquidateur + clôture",
                      "Dépôt des comptes définitifs au RCCM (Art. 219)",
                      "Radiation de la société au RCCM dans le mois suivant la publication de la clôture (Art. 220)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-4 h-4 bg-red-200 text-red-800 text-xs rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Répartition du boni de liquidation
                    {' '}<InfoTooltip texte="Après remboursement du nominal des actions/parts, le solde disponible (boni de liquidation) est réparti entre les associés dans les mêmes proportions que leur participation au capital social, sauf clause contraire des statuts." loi="Art. 237 AUSCGIE" />
                  </h4>
                  <p className="text-sm text-gray-700">Après remboursement du nominal, le solde disponible est réparti proportionnellement au capital social, sauf clause contraire des statuts.</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2 text-sm">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-blue-900"><strong>Art. 240 :</strong> Les sommes non distribuées sont déposées sur compte séquestre auprès du Trésor Public à l'expiration d'un délai d'un an après la clôture.</div>
                </div>
              </div>
            )}

            {/* ── LEÇON 4 ── */}
            {activeLecon === 3 && (
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-2">
                  <Scale className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-900">
                    <strong>Art. 221 AUSCGIE :</strong> Le liquidateur est responsable, à l'égard tant de la société que des tiers, des conséquences dommageables des fautes par lui commises dans l'exercice de ses fonctions.
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Action en responsabilité contre le liquidateur</h4>
                  <ul className="space-y-1.5">
                    {[
                      "Action sociale ET action individuelle possibles",
                      "Prescription : 3 ans à compter du fait dommageable ou de sa révélation (Art. 221 al. 2)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Responsabilité des associés
                    {' '}<InfoTooltip texte="Après la dissolution, les actions contre les associés non liquidateurs (y compris leurs conjoints survivants, héritiers et ayants-cause) se prescrivent par 5 ans à compter de la publication de la dissolution au RCCM." loi="Art. 222 AUSCGIE" />
                  </h4>
                  <p className="text-sm text-gray-700">Toute action contre les associés non liquidateurs se prescrit par <strong>5 ans</strong> à compter de la publication de la dissolution au RCCM (y compris leurs conjoints survivants, héritiers et ayants-cause).</p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-amber-900"><strong>Mention obligatoire (Art. 204) :</strong> La mention "société en liquidation" ainsi que le nom du ou des liquidateurs doivent figurer sur TOUS les actes et documents émanant de la société et destinés aux tiers (lettres, factures, annonces, publications). Cette obligation court dès la dissolution.</div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2 text-sm">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-blue-900"><strong>Maintien du commissaire aux comptes (Art. 225) :</strong> La dissolution ne met pas fin aux fonctions du commissaire aux comptes (contrairement au cas de transformation où cela dépend de la nouvelle forme).</div>
                </div>
              </div>
            )}

            {/* ── LEÇON 5 ── */}
            {activeLecon === 4 && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Causes de nullité (Art. 242-244)</h4>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-2">
                    <Scale className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-900">
                      <strong>Art. 242 :</strong> La nullité d'une société ne peut résulter que d'une disposition de l'AUSCGIE la prévoyant expressément ou des textes régissant la nullité des contrats. Conséquence : dissolution suivie de liquidation.
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2 text-sm mt-2">
                    <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-blue-900"><strong>Art. 242 al. 3 :</strong> Dans les SARL et sociétés par actions, la nullité ne peut résulter ni d'un vice de consentement ni de l'incapacité d'un associé, sauf si cela atteint TOUS les associés fondateurs.</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { titre: "Nullité des actes modifiant les statuts (Art. 243)", texte: "disposition AUSCGIE expresse, nullité des contrats en général, ou violation d'une clause essentielle des statuts" },
                    { titre: "Nullité des actes ne modifiant pas les statuts (Art. 244)", texte: "disposition AUSCGIE expresse, violation d'une disposition impérative de l'AUSCGIE, des textes sur les contrats, ou d'une clause essentielle des statuts" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Shield className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span><strong>{item.titre} :</strong> {item.texte}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Régularisation
                    {' '}<InfoTooltip texte="La juridiction saisie d'une action en nullité peut, même d'office, fixer un délai pour couvrir la nullité. Elle ne peut pas prononcer la nullité moins de 2 mois après l'exploit introductif d'instance. La nullité est éteinte si la cause cesse avant le jugement au fond (sauf illicéité de l'objet)." loi="Art. 246-247 AUSCGIE" />
                  </h4>
                  <p className="text-sm text-gray-700">La juridiction peut fixer un délai pour couvrir la nullité. Elle ne peut prononcer la nullité moins de 2 mois après l'exploit introductif. La nullité est éteinte si la cause cesse avant le jugement au fond (sauf illicéité de l'objet social).</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Prescriptions (Art. 251)</h4>
                  <div className="overflow-x-auto rounded-lg border border-red-200">
                    <table className="w-full text-sm">
                      <thead className="bg-red-100">
                        <tr>
                          <th className="text-left p-3 font-semibold text-red-900">Type d'action</th>
                          <th className="text-left p-3 font-semibold text-red-900">Délai</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-red-100">
                        <tr className="bg-red-50">
                          <td className="p-3 text-gray-800">Action en nullité de la société</td>
                          <td className="p-3 font-semibold text-red-800">3 ans à compter de l'immatriculation</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="p-3 text-gray-800">Action en nullité des actes/décisions</td>
                          <td className="p-3 font-semibold text-red-800">3 ans à compter du jour où la nullité est encourue</td>
                        </tr>
                        <tr className="bg-red-50">
                          <td className="p-3 text-gray-800">Action en nullité d'une fusion/scission</td>
                          <td className="p-3 font-semibold text-red-800">6 mois à compter de la dernière inscription au RCCM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2 text-sm">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-blue-900"><strong>Protection des tiers (Art. 255) :</strong> Ni la société, ni les associés ne peuvent se prévaloir d'une nullité à l'égard des tiers de bonne foi. Exception : la nullité pour vice de consentement ou incapacité est opposable même aux tiers de bonne foi par l'incapable ou son représentant.</div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-700">
                  <strong>Responsabilité en cas de nullité (Art. 256) :</strong> Les associés et dirigeants auxquels la nullité est imputable peuvent être déclarés solidairement responsables du dommage causé aux tiers. Prescription : 3 ans à compter de la décision d'annulation passée en force de chose jugée.
                </div>
              </div>
            )}

            {/* ── LEÇON 6 ── */}
            {activeLecon === 5 && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Cas d'application (Art. 223)</h4>
                  <p className="text-sm text-gray-700 mb-2">Liquidation à l'amiable (à défaut de clauses statutaires/conventionnelles) ou sur décision judiciaire à bref délai à la demande de :</p>
                  <ul className="space-y-1.5">
                    {[
                      "La majorité des associés (SNC)",
                      "Des associés représentant au moins 1/10 du capital (autres formes)",
                      "Des créanciers sociaux",
                      "Du représentant de la masse des obligataires",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-amber-900"><strong>Art. 224 :</strong> Les pouvoirs du conseil d'administration ou des dirigeants sociaux prennent fin à dater de la décision de justice qui ordonne la liquidation de la société. Le liquidateur se substitue entièrement aux dirigeants.</div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Nomination judiciaire du liquidateur (Art. 226-227)</h4>
                  <ul className="space-y-1.5">
                    {[
                      "Désigné par la décision de justice",
                      "Durée du mandat : max 3 ans renouvelables par décision de justice",
                      "En cas de renouvellement : le liquidateur doit indiquer les raisons du délai et les mesures envisagées",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Rapport initial (Art. 228)</h4>
                  <ul className="space-y-1.5">
                    {[
                      "Dans les 6 mois de la nomination",
                      "Rapport sur situation actif/passif + plan de liquidation + délai nécessaire",
                      "L'assemblée statue en conditions de modification des statuts",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>
                        Si délai insuffisant : report à 12 mois sur demande, avec désignation d'un{' '}
                        <InfoTooltip texte="Désigné par le tribunal quand la réunion de l'assemblée est impossible ou que le liquidateur n'agit pas. Il est chargé d'accomplir une mission précise et limitée (convocation d'AG, formalité spécifique) puis son mandat prend fin." loi="Art. 217, 228 AUSCGIE" />
                        {' '}mandataire ad hoc si besoin
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Précédente / Suivante */}
            <div className="flex justify-between pt-2 border-t border-red-100">
              <button
                onClick={() => setActiveLecon(Math.max(0, activeLecon - 1))}
                disabled={activeLecon === 0}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  activeLecon === 0
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-red-700 hover:bg-red-50 border border-red-200'
                )}
              >
                <ArrowLeft className="w-4 h-4" />
                Précédente
              </button>
              <button
                onClick={() => setActiveLecon(Math.min(lecons.length - 1, activeLecon + 1))}
                disabled={activeLecon === lecons.length - 1}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  activeLecon === lecons.length - 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                )}
              >
                Suivante
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sources */}
          <p className="text-xs text-muted-foreground/60 text-center">
            Sources : AUSCGIE (Acte Uniforme relatif aux Sociétés Commerciales et GIE) - Articles 200 à 256 - OHADA
          </p>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          ONGLET QCM
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'qcm' && user?.role !== 'etudiant' && (
        <div className="space-y-4">
          <QCMPageUnique questions={qcmQuestions as unknown as QCMChapitre[]} couleurAccent="red" />
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          ONGLET CAS PRATIQUES
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'cas' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-red-100 shadow-sm p-4">
            <h2 className="font-display font-bold text-red-800 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Cas Pratiques - Dissolution et Liquidation des Sociétés
            </h2>
            <p className="text-sm text-gray-500 mt-1">4 cas pratiques basés sur les Art. 200-256 de l'AUSCGIE.</p>
          </div>
          {casPratiques.map((cp) => (
            <CasPratiqueBlock key={cp.id} cp={cp} />
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          ONGLET DEVOIR
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'devoir' && (
        <div className="bg-white rounded-xl border border-red-100 shadow-sm p-5">
          {user?.role !== 'etudiant' ? (
            <DevoirChapitreCreateur
              chapitreId="ue2-chapitre10"
              chapitreNom="Chapitre 10 - Dissolution et Liquidation des Societes"
              questions={qcmQuestions as unknown as QCMChapitre[]}
              coursId="ue2-droit-societes"
              casPratiquesExistants={casPratiques.map(cp => ({
                id: cp.id,
                titre: cp.titre,
                enonce: cp.contexte + '\n' + (cp.questions as string[]).join('\n'),
                corrigeType: cp.correction,
              } as CasPratiqueExistant))}
            />
          ) : (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-10 h-10 mx-auto mb-3 text-red-200" />
              <p className="font-medium text-gray-700">Devoir en attente</p>
              <p className="text-sm mt-1">Votre professeur vous enverra un devoir pour ce chapitre.</p>
            </div>
          )}
        </div>
      )}

      {/* ─── BOUTON TERMINER ─── */}
      <button
        onClick={goBack}
        className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
      >
        <CheckCircle2 className="w-5 h-5" />
        Terminer le chapitre 10
      </button>

      {/* ─── SOURCES ─── */}
      <p className="text-xs text-muted-foreground/60 text-center">
        Sources : AUSCGIE - Acte Uniforme OHADA relatif aux Sociétés Commerciales et GIE | Articles 200 à 256 - Dissolution, Liquidation et Nullités
      </p>
    </div>
  )
}
