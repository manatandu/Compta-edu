import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, BookOpen, FileText,
  ChevronRight, Briefcase, AlertTriangle, Info, Scale, Users
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import { isStudentRole } from '@/lib/permissions'
import DevoirChapitreCreateur, { CasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
import QCMPageUnique from '@/components/QCMPageUnique'
import { QCMChapitre } from '@/lib/db'
import { InfoTooltip } from '@/components/InfoTooltip'

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
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
type CasPratique = {
  id: string
  titre: string
  niveau: string
  contexte: string
  questions: string[]
  correction: string
}

/* ─────────────────────────────────────────────────────────────
   DONNÉES QCM
───────────────────────────────────────────────────────────── */
const qcmQuestions: QCMQuestion[] = [
  {
    type: 'qcm',
    id: 'q1',
    question: "Comment la société en participation est-elle définie par l'AUSCGIE ?",
    options: [
      { id: 'a', texte: "Une société immatriculée au RCCM mais sans personnalité morale" },
      { id: 'b', texte: "Une société que les associés ont convenu de ne pas immatriculer et qui n'est pas destinée à être connue des tiers" },
      { id: 'c', texte: "Une société qui ne peut exercer qu'une seule opération commerciale" },
      { id: 'd', texte: "Une société constituée entre époux uniquement" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 854 AUSCGIE définit la société en participation comme celle que les associés ont convenu de ne pas immatriculer et qui n'est pas destinée à être connue des tiers.",
    articleRef: 'Art. 854 AUSCGIE',
  },
  {
    type: 'qcm',
    id: 'q2',
    question: "La société en participation a-t-elle la personnalité morale ?",
    options: [
      { id: 'a', texte: "Oui, comme toute société commerciale OHADA" },
      { id: 'b', texte: "Oui, mais seulement à compter de l'immatriculation" },
      { id: 'c', texte: "Non, elle est dépourvue de personnalité morale (Art. 854 al. 2)" },
      { id: 'd', texte: "Seulement si les statuts le prévoient expressément" },
    ],
    reponseCorrecte: 'c',
    explication: "L'Art. 854 al. 2 AUSCGIE dispose expressément que la société en participation est dépourvue de personnalité morale. Elle n'est pas immatriculée.",
    articleRef: 'Art. 854 al. 2 AUSCGIE',
  },
  {
    type: 'qcm',
    id: 'q3',
    question: "Les apports dans une société en participation sont-ils soumis aux règles de la copropriété ?",
    options: [
      { id: 'a', texte: "Non, chaque associé reste propriétaire de ses apports" },
      { id: 'b', texte: "Oui, chaque associé est propriétaire de ses apports en nature ou en numéraire ; les autres associés n'ont de droits que sur les bénéfices" },
      { id: 'c', texte: "Oui, les apports deviennent propriété de la société" },
      { id: 'd', texte: "Non, les apports sont mis en indivision automatiquement" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 856 AUSCGIE dispose que chaque associé est propriétaire de ses apports. Il ne les transfère pas à la société. Les autres associés ont des droits sur les bénéfices, non sur les apports.",
    articleRef: 'Art. 856 AUSCGIE',
  },
  {
    type: 'qcm',
    id: 'q4',
    question: "Quel est l'associé qui s'engage vis-à-vis des tiers dans une société en participation à caractère commercial ?",
    options: [
      { id: 'a', texte: "Tous les associés solidairement" },
      { id: 'b', texte: "L'associé désigné comme gérant dans les statuts uniquement" },
      { id: 'c', texte: "L'associé qui agit pour son propre compte, en son nom personnel" },
      { id: 'd', texte: "La société en participation en tant que personne morale" },
    ],
    reponseCorrecte: 'c',
    explication: "L'Art. 858 AUSCGIE prévoit que chaque associé contracte en son nom personnel et est seul engagé envers les tiers avec lesquels il traite. Les tiers n'ont d'action que contre l'associé avec qui ils ont contracté.",
    articleRef: 'Art. 858 AUSCGIE',
  },
  {
    type: 'qcm',
    id: 'q5',
    question: "Comment la société de fait est-elle définie par l'AUSCGIE ?",
    options: [
      { id: 'a', texte: "Une société dont l'acte constitutif est entaché de nullité" },
      { id: 'b', texte: "Une société immatriculée mais dont les activités sont contraires à la loi" },
      { id: 'c', texte: "La situation de deux ou plusieurs personnes qui se comportent comme des associés sans avoir constitué une société reconnue par l'AUSCGIE" },
      { id: 'd', texte: "Une société en nom collectif non immatriculée" },
    ],
    reponseCorrecte: 'c',
    explication: "L'Art. 864 AUSCGIE définit la société de fait comme la situation de deux ou plusieurs personnes physiques ou morales qui, sans avoir constitué entre elles une société reconnue par l'AUSCGIE, se comportent comme des associés.",
    articleRef: 'Art. 864 AUSCGIE',
  },
  {
    type: 'qcm',
    id: 'q6',
    question: "Quelle forme sociale s'applique à la société de fait lorsqu'elle existe entre plusieurs personnes ?",
    options: [
      { id: 'a', texte: "Les règles de la SARL lui sont appliquées par défaut" },
      { id: 'b', texte: "Les règles de la société en nom collectif (SNC) lui sont appliquées" },
      { id: 'c', texte: "Elle est soumise aux règles de la société civile" },
      { id: 'd', texte: "Aucune règle spécifique ne lui est applicable" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 865 AUSCGIE dispose que les règles de la société en nom collectif (SNC) sont applicables à la société de fait entre plusieurs personnes, notamment la responsabilité illimitée et solidaire de tous les associés.",
    articleRef: 'Art. 865 AUSCGIE',
  },
  {
    type: 'qcm',
    id: 'q7',
    question: "Un tiers peut-il invoquer l'existence d'une société de fait ?",
    options: [
      { id: 'a', texte: "Non, seuls les associés peuvent invoquer la société de fait" },
      { id: 'b', texte: "Oui, les associés et les tiers peuvent se prévaloir de l'existence d'une société de fait" },
      { id: 'c', texte: "Oui, mais uniquement si la société de fait a été immatriculée" },
      { id: 'd', texte: "Non, la société de fait est réservée aux seuls associés" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 866 AUSCGIE précise que l'existence d'une société de fait peut être invoquée par les associés eux-mêmes et par les tiers. Cela permet aux créanciers de poursuivre les associés.",
    articleRef: 'Art. 866 AUSCGIE',
  },
  {
    type: 'qcm',
    id: 'q8',
    question: "Comment prend fin la société en participation à durée indéterminée ?",
    options: [
      { id: 'a', texte: "Elle ne peut jamais prendre fin" },
      { id: 'b', texte: "Par une décision unanime de tous les associés uniquement" },
      { id: 'c', texte: "Par la dissolution judiciaire uniquement" },
      { id: 'd', texte: "Par la notification de la décision de dissolution aux autres associés, sans qu'il soit nécessaire de justifier cette décision" },
    ],
    reponseCorrecte: 'd',
    explication: "L'Art. 862 AUSCGIE dispose que la société en participation à durée indéterminée prend fin par la notification de la décision de dissolution à tous les associés, à condition que cette décision ne soit pas de mauvaise foi ni intempestive.",
    articleRef: 'Art. 862 AUSCGIE',
  },
  {
    type: 'qcm',
    id: 'q9',
    question: "Quel est le régime applicable aux associés dans une société en participation à caractère civil ?",
    options: [
      { id: 'a', texte: "Responsabilité solidaire et illimitée" },
      { id: 'b', texte: "Responsabilité limitée à leurs apports" },
      { id: 'c', texte: "Chaque associé ne supporte les pertes que proportionnellement à sa part et les tiers n'ont d'action que contre l'associé avec qui ils ont traité" },
      { id: 'd', texte: "Aucune responsabilité envers les tiers" },
    ],
    reponseCorrecte: 'c',
    explication: "L'Art. 859 AUSCGIE prévoit que dans la société en participation à caractère civil, chaque associé ne supporte les pertes que proportionnellement à sa part. Les créanciers ne peuvent agir que contre l'associé contractant.",
    articleRef: 'Art. 859 AUSCGIE',
  },
  {
    type: 'qcm',
    id: 'q10',
    question: "La société en participation peut-elle être prouvée par tous moyens ?",
    options: [
      { id: 'a', texte: "Non, elle doit être prouvée par écrit uniquement" },
      { id: 'b', texte: "Non, elle doit être notariée" },
      { id: 'c', texte: "Oui, entre associés et par les tiers, par tous moyens" },
      { id: 'd', texte: "Seulement par témoignage" },
    ],
    reponseCorrecte: 'c',
    explication: "L'Art. 857 AUSCGIE dispose que l'existence et le contenu de la société en participation peuvent être prouvés par tous moyens entre les associés et par les tiers.",
    articleRef: 'Art. 857 AUSCGIE',
  },
]

/* ─────────────────────────────────────────────────────────────
   CAS PRATIQUES
───────────────────────────────────────────────────────────── */
const casPratiques: CasPratique[] = [
  {
    id: 'cp1',
    titre: 'CP1 : Qualification de société de fait',
    niveau: 'Art. 864-866 AUSCGIE',
    contexte: "KABAMBA et NZINGA exploitent ensemble un restaurant depuis 2 ans. Ils partagent les bénéfices et les pertes, prennent les décisions ensemble, mais n'ont jamais signé de statuts ni demandé d'immatriculation. Un fournisseur MATADI FOODS réclame le paiement de factures impayées et poursuit les deux.",
    questions: [
      "Question 1 : Peut-on qualifier cette situation de société de fait ?",
      "Question 2 : Quel régime de responsabilité s'applique à KABAMBA et NZINGA vis-à-vis de MATADI FOODS ?",
    ],
    correction: "Q1 : Oui. L'Art. 864 AUSCGIE définit la société de fait comme la situation de deux ou plusieurs personnes qui se comportent comme des associés sans avoir constitué une société reconnue par l'AUSCGIE. En l'espèce, les 3 éléments constitutifs sont réunis : apports (participation à l'exploitation), vocation aux résultats (partage bénéfices/pertes), affectio societatis (décisions conjointes).\n\nQ2 : En vertu de l'Art. 865 AUSCGIE, la société de fait entre plusieurs personnes est soumise aux règles de la SNC. Les associés de fait sont donc responsables indéfiniment et solidairement des dettes sociales. MATADI FOODS peut donc poursuivre KABAMBA et NZINGA solidairement pour le tout, sans avoir à diviser sa demande.",
  },
  {
    id: 'cp2',
    titre: 'CP2 : Société en participation et responsabilité',
    niveau: 'Art. 854-862 AUSCGIE',
    contexte: "MBUYI et TSHIBANDA créent une société en participation pour réaliser un seul chantier de construction. Ils décident expressément de ne pas l'immatriculer. MBUYI signe un contrat de fourniture de matériaux avec GOMA SUPPLIES au nom de la SEP. Le chantier ne génère pas suffisamment de revenus. GOMA SUPPLIES réclame le paiement à MBUYI et TSHIBANDA solidairement.",
    questions: [
      "Question 1 : La société en participation a-t-elle la personnalité morale ? Peut-elle ester en justice ?",
      "Question 2 : GOMA SUPPLIES peut-il poursuivre TSHIBANDA pour les dettes contractées par MBUYI ?",
    ],
    correction: "Q1 : Non. L'Art. 854 al. 2 AUSCGIE dispose expressément que la société en participation est dépourvue de personnalité morale. Elle ne peut donc pas ester en justice, acquérir des biens, ni être immatriculée.\n\nQ2 : En principe, non. L'Art. 858 AUSCGIE prévoit que dans la SEP à caractère commercial, chaque associé contracte en son nom personnel et est seul engagé envers les tiers. MBUYI ayant signé seul le contrat avec GOMA SUPPLIES, c'est lui seul qui est engagé. GOMA SUPPLIES ne peut pas poursuivre TSHIBANDA, sauf si TSHIBANDA a révélé sa participation à GOMA SUPPLIES et accepté d'être engagé (Art. 860).",
  },
]

/* ─────────────────────────────────────────────────────────────
   COMPOSANTS UTILITAIRES
───────────────────────────────────────────────────────────── */
/* ── COMPOSANT QCM COMPRÉHENSION ── */
function QCMBlock({ q }: { q: QCMQuestion }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-4 space-y-3">
      <p className="text-xs font-semibold text-emerald-700">{q.question}</p>
      <div className="space-y-1.5">
        {q.options.map(opt => {
          let cls = 'w-full text-left text-xs px-3 py-2 rounded-lg border transition-colors '
          if (!showResult) cls += selected === opt.id ? 'border-emerald-500 bg-emerald-100 text-emerald-800' : 'border-border hover:border-emerald-300 hover:bg-muted/40'
          else if (opt.id === q.reponseCorrecte) cls += 'border-green-500 bg-green-50 text-green-700'
          else if (opt.id === selected) cls += 'border-red-400 bg-red-50 text-red-600'
          else cls += 'border-border opacity-50'
          return <button key={opt.id} className={cls} onClick={() => { if (!showResult) setSelected(opt.id) }} disabled={showResult}><span className="font-bold mr-1.5">{opt.id.toUpperCase()}.</span>{opt.texte}</button>
        })}
      </div>
      {!showResult && <button onClick={() => { if (selected) setShowResult(true) }} disabled={!selected} className="text-xs bg-emerald-600 text-white rounded-lg px-4 py-1.5 disabled:opacity-40 hover:bg-emerald-700 transition-colors font-semibold">Vérifier</button>}
      {showResult && (
        <div className={`rounded-lg p-2.5 text-xs ${selected === q.reponseCorrecte ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
          <div className="flex items-center gap-1 font-semibold mb-0.5">{selected === q.reponseCorrecte ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}{selected === q.reponseCorrecte ? 'Correct !' : 'Incorrect'}</div>
          <p>{q.explication}</p>
          <button onClick={() => { setSelected(null); setShowResult(false) }} className="mt-1.5 text-xs underline opacity-70 hover:opacity-100">Réessayer</button>
        </div>
      )}
    </div>
  )
}

function CasPratiqueBlock({ cas }: { cas: CasPratique }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        className="w-full flex items-start gap-3 p-4 text-left"
        onClick={() => setOpen(o => !o)}
      >
        <Briefcase className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
        <div className="flex-1">
          <p className="font-semibold text-sm text-gray-800">{cas.titre}</p>
          <p className="text-xs text-emerald-600 mt-0.5">{cas.niveau}</p>
        </div>
        <ChevronRight className={cn("w-4 h-4 text-gray-400 shrink-0 transition-transform", open && "rotate-90")} />
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900">
            <p className="font-semibold mb-1">Contexte</p>
            <p>{cas.contexte}</p>
          </div>
          <div className="space-y-1">
            {cas.questions.map((q, i) => (
              <p key={i} className="text-xs text-gray-700 font-medium">{q}</p>
            ))}
          </div>
          <details className="group">
            <summary className="cursor-pointer text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <ChevronRight className="w-3 h-3 group-open:rotate-90 transition-transform" /> Voir la correction
            </summary>
            <div className="mt-2 bg-gray-50 rounded-lg p-3 text-xs text-gray-700 whitespace-pre-line">{cas.correction}</div>
          </details>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   CONTENU DES LEÇONS
───────────────────────────────────────────────────────────── */
const lecons = [
  "La société en participation (SEP) - Définition et constitution (Art. 854-856)",
  "Régime juridique de la SEP - Preuve, gestion, responsabilité (Art. 857-861)",
  "Dissolution de la SEP (Art. 862-863)",
  "La société de fait - Définition et qualification (Art. 864-866)",
  "Régime juridique de la société de fait (Art. 865-868)",
]

/* ─────────────────────────────────────────────────────────────
   PAGE PRINCIPALE
───────────────────────────────────────────────────────────── */
export default function UE2Chapitre11Page() {
  const [, navigate] = useHashLocation()
  const goBack = useGoBack('/ue2-droit-societes')
  const user = useUser()
  const isEtudiant = isStudentRole(user)

  const [activeTab, setActiveTab] = useState<'lessons' | 'qcm' | 'cas' | 'devoir'>('lessons')
  const [activeLecon, setActiveLecon] = useState(0)

  return (
    <div className="space-y-4 pb-10 animate-fadeIn">

      {/* ── HEADER ── */}
            <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 2 - Droit des sociétés', route: '/ue2-droit-societes' },
            { label: 'Chapitre 11' },
          ]}
          color="indigo"
        />
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-lg font-display font-bold text-foreground leading-tight">Société en Participation et Société de Fait</h1>
          <InfoTooltip texte="Sociétés sans personnalité morale en droit OHADA" loi="Art. 854-868 AUSCGIE" />
        </div>
        <p className="text-xs text-muted-foreground">Art. 854 à 868 AUSCGIE révisé 30 janvier 2014</p>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Leçons', value: String(lecons.length) },
          { label: 'QCM', value: String(qcmQuestions.length) },
          { label: 'Cas pratiques', value: String(casPratiques.length) },
          { label: 'Durée', value: '2h00' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── OBJECTIFS ── */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-800">Objectifs du chapitre</span>
        </div>
        <ul className="space-y-1">
          {[
            "Distinguer la société en participation de la société de fait selon l'AUSCGIE",
            "Identifier les caractéristiques essentielles de la SEP : absence de personnalité morale, non-immatriculation (Art. 854)",
            "Appliquer les règles de responsabilité des associés de la SEP selon son caractère civil ou commercial (Art. 858-859)",
            "Qualifier une situation de société de fait et appliquer le régime de la SNC (Art. 864-865)",
            "Maîtriser les modes de preuve et de dissolution de ces deux formes (Art. 857, 862-863)",
          ].map((obj, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── ONGLETS ── */}
      <div className="flex gap-1 rounded-xl bg-muted p-1">
        {(isEtudiant
          ? [['lessons', 'Leçons'], ['devoir', 'Devoir']] as [typeof activeTab, string][]
          : [['lessons', 'Leçons'], ['qcm', 'QCM'], ['cas', 'Cas pratiques'], ['devoir', 'Devoir']] as [typeof activeTab, string][]
        ).map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors',
              activeTab === tab
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── ONGLET LEÇONS ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      {activeTab === 'lessons' && (
        <div className="space-y-4">
          {/* Sélecteur de leçon */}
          <div className="flex gap-1 flex-wrap">
            {lecons.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveLecon(i)}
                className={cn(
                  'text-xs px-3 py-1.5 rounded-lg border transition-colors',
                  activeLecon === i
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'border-border hover:border-emerald-400'
                )}
              >
                L{i + 1}
              </button>
            ))}
          </div>

          {/* Carte leçon */}
          <div className="rounded-xl border-l-4 border-l-emerald-500 bg-card border border-border p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-emerald-600">Leçon {activeLecon + 1} / {lecons.length}</span>
            </div>
            <h2 className="text-base font-display font-bold text-foreground">{lecons[activeLecon]}</h2>
          </div>

          {/* ── LEÇON 1 ── */}
          {activeLecon === 0 && (
            <div className="rounded-xl border border-border bg-card p-4 space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                La <strong>société en participation (SEP)</strong> est définie par l'Art. 854 de l'AUSCGIE comme la société que les associés ont convenu de ne pas immatriculer. Elle n'est pas destinée à être connue des tiers et est <strong>dépourvue de personnalité morale</strong>.
              </p>

              <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Caractéristiques essentielles (Art. 854)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead><tr className="bg-emerald-600 text-white">
                    <th className="border border-emerald-700 p-2 text-left">Caractéristique</th>
                    <th className="border border-emerald-700 p-2 text-left">Règle</th>
                    <th className="border border-emerald-700 p-2 text-left">Article</th>
                  </tr></thead>
                  <tbody>
                    {[
                      ["Personnalité morale", "Aucune - la SEP est dépourvue de personnalité morale", "Art. 854 al. 2"],
                      ["Immatriculation", "Aucune - les associés ont convenu de ne pas l'immatriculer", "Art. 854 al. 1"],
                      ["Connaissance des tiers", "Non destinée à être connue des tiers (principe)", "Art. 854 al. 1"],
                      ["Objet", "Peut être civile ou commerciale", "Art. 854"],
                      ["Durée", "Déterminée ou indéterminée selon les statuts", "Art. 854"],
                    ].map(([car, regle, art], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-emerald-50"}>
                        <td className="border border-emerald-200 p-2 font-semibold text-emerald-800">{car}</td>
                        <td className="border border-emerald-200 p-2">{regle}</td>
                        <td className="border border-emerald-200 p-2">{art}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Régime des apports (Art. 856)
              </h3>
              <p>
                Contrairement aux sociétés à personnalité morale, les apports dans la SEP ne sont pas transférés à une entité juridique. L'Art. 856 AUSCGIE dispose que <strong>chaque associé reste propriétaire de ses apports</strong> en numéraire ou en nature, sauf convention contraire entre les associés.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="font-semibold text-emerald-800 mb-1">Apports en numéraire</p>
                  <p className="text-gray-700">Chaque associé conserve la propriété des fonds qu'il met à disposition. Ils ne forment pas un capital social.</p>
                </div>
                <div>
                  <p className="font-semibold text-emerald-800 mb-1">Apports en nature</p>
                  <p className="text-gray-700">L'associé reste propriétaire du bien. Il en permet seulement la jouissance ou l'utilisation par la SEP.</p>
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-3">
                <p className="text-xs text-amber-800 font-semibold mb-1">Constitution</p>
                <p className="text-xs text-amber-700">La SEP peut être constituée verbalement ou par écrit. Aucune forme solennelle n'est imposée. Elle peut résulter de la simple volonté des parties de collaborer sans créer une structure immatriculée (Art. 854).</p>
              </div>
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                {[qcmQuestions[0], qcmQuestions[1]].map((q, i) => <QCMBlock key={i} q={q} />)}
              </div>
            </div>
          )}

          {/* ── LEÇON 2 ── */}
          {activeLecon === 1 && (
            <div className="rounded-xl border border-border bg-card p-4 space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                La SEP fonctionne selon des règles propres organisant la <strong>preuve de son existence</strong>, la <strong>gestion interne</strong> et la <strong>responsabilité des associés vis-à-vis des tiers</strong>.
              </p>

              <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Preuve de l'existence de la SEP (Art. 857)
              </h3>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900">
                <p>L'Art. 857 AUSCGIE prévoit que l'existence et le contenu de la société en participation peuvent être prouvés <strong>par tous moyens</strong>, tant entre les associés qu'à l'égard des tiers. Ce principe de liberté de preuve est une dérogation importante aux formalités des sociétés classiques.</p>
              </div>

              <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Responsabilité selon la nature de la SEP (Art. 858-860)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead><tr className="bg-emerald-600 text-white">
                    <th className="border border-emerald-700 p-2 text-left">Nature</th>
                    <th className="border border-emerald-700 p-2 text-left">Régime de responsabilité</th>
                    <th className="border border-emerald-700 p-2 text-left">Article</th>
                  </tr></thead>
                  <tbody>
                    {[
                      ["SEP commerciale", "Chaque associé contracte en son nom personnel et est seul engagé envers les tiers avec qui il a traité. Les autres associés ne sont pas engagés.", "Art. 858"],
                      ["SEP civile", "Chaque associé ne supporte les pertes que proportionnellement à sa part. Les tiers n'ont d'action que contre l'associé avec qui ils ont contracté.", "Art. 859"],
                      ["SEP avec révélation aux tiers", "Si un associé révèle sa participation à un tiers et que ce tiers l'accepte, cet associé est alors engagé vis-à-vis du tiers même s'il n'a pas personnellement contracté.", "Art. 860"],
                    ].map(([nat, reg, art], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-emerald-50"}>
                        <td className="border border-emerald-200 p-2 font-semibold text-emerald-800">{nat}</td>
                        <td className="border border-emerald-200 p-2">{reg}</td>
                        <td className="border border-emerald-200 p-2">{art}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Gestion interne (Art. 861)
              </h3>
              <p>
                L'Art. 861 AUSCGIE prévoit que les associés peuvent librement organiser la gestion de la SEP dans leurs statuts. <strong>En l'absence de statuts</strong>, les rapports entre associés sont régis par les règles de la société en nom collectif (SNC), notamment la règle de la gestion par l'un quelconque des associés.
              </p>

              <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-3">
                <p className="text-xs text-amber-800 font-semibold mb-1">Conséquence pratique</p>
                <p className="text-xs text-amber-700">La SEP est très utilisée dans les opérations de co-promotion immobilière, les coentreprises ponctuelles et les groupements d'entreprises pour la réalisation d'un projet unique, car elle évite les formalités et les coûts de constitution d'une société immatriculée.</p>
              </div>
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                {[qcmQuestions[2], qcmQuestions[3]].map((q, i) => <QCMBlock key={i} q={q} />)}
              </div>
            </div>
          )}

          {/* ── LEÇON 3 ── */}
          {activeLecon === 2 && (
            <div className="rounded-xl border border-border bg-card p-4 space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                La dissolution de la SEP est régie par les Art. 862 et 863 de l'AUSCGIE. Son régime varie selon que la société a été constituée pour une durée déterminée ou indéterminée.
              </p>

              <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Modes de dissolution (Art. 862)
              </h3>
              <div className="space-y-2">
                {[
                  { titre: "SEP à durée déterminée", contenu: "Elle prend fin à l'expiration du terme prévu. Elle peut aussi être dissoute avant ce terme par décision unanime des associés, ou par la survenance des événements prévus dans les statuts comme causes de dissolution (décès d'un associé, réalisation de l'objet social, etc.).", art: "Art. 862 al. 1" },
                  { titre: "SEP à durée indéterminée", contenu: "Chaque associé peut demander la dissolution à tout moment en notifiant sa décision à tous les autres associés. Cette décision ne doit pas être intempestive (prise à un moment inopportun causant un préjudice aux coassociés) ni de mauvaise foi.", art: "Art. 862 al. 2" },
                  { titre: "Dissolution judiciaire", contenu: "Tout associé peut demander au tribunal la dissolution anticipée pour juste motif (mésentente grave paralysant le fonctionnement, inexécution des obligations par un associé, etc.).", art: "Art. 862 al. 3" },
                ].map((item, i) => (
                  <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                    <p className="font-semibold text-emerald-800 text-xs mb-1">{item.titre} <span className="font-normal text-emerald-600">({item.art})</span></p>
                    <p className="text-xs text-gray-700">{item.contenu}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Liquidation (Art. 863)
              </h3>
              <p>
                L'Art. 863 AUSCGIE prévoit qu'à la dissolution de la SEP, chaque associé <strong>reprend ses apports</strong>. S'il y a des biens mis en commun au cours de l'exploitation, les associés procèdent à leur partage ou les reprennent selon les modalités convenues dans les statuts ou à défaut par accord entre eux.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-3 flex gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-700" />
                <div>
                  <p className="text-xs text-blue-800 font-semibold mb-1">Absence de liquidateur</p>
                  <p className="text-xs text-blue-700">Contrairement aux sociétés immatriculées, la SEP ne passe pas par une procédure formelle de liquidation avec un liquidateur. Les associés règlent directement entre eux les conséquences de la dissolution.</p>
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                {[qcmQuestions[4], qcmQuestions[5]].map((q, i) => <QCMBlock key={i} q={q} />)}
              </div>
            </div>
          )}

          {/* ── LEÇON 4 ── */}
          {activeLecon === 3 && (
            <div className="rounded-xl border border-border bg-card p-4 space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                La <strong>société de fait</strong> est définie par l'Art. 864 AUSCGIE comme la situation de deux ou plusieurs personnes physiques ou morales qui, <strong>sans avoir constitué entre elles une société reconnue par l'AUSCGIE</strong>, se comportent en fait comme des associés.
              </p>

              <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Éléments constitutifs de la société de fait (Art. 864)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { label: "Apports réciproques", desc: "Chaque personne contribue à une activité commune (argent, biens, travail, compétences)." },
                  { label: "Vocation aux résultats", desc: "Les personnes partagent les bénéfices ou supportent les pertes ensemble." },
                  { label: "Affectio societatis", desc: "Intention de collaborer sur un pied d'égalité, dans l'intérêt commun, sans lien de subordination." },
                ].map((item, i) => (
                  <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
                    <p className="font-semibold text-emerald-800 text-xs mb-1">{item.label}</p>
                    <p className="text-xs text-gray-700">{item.desc}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Différence SEP / Société de fait
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead><tr className="bg-emerald-600 text-white">
                    <th className="border border-emerald-700 p-2 text-left">Critère</th>
                    <th className="border border-emerald-700 p-2 text-center">SEP (Art. 854)</th>
                    <th className="border border-emerald-700 p-2 text-center">Société de fait (Art. 864)</th>
                  </tr></thead>
                  <tbody>
                    {[
                      ["Volonté des parties", "Volonté délibérée de créer une société sans l'immatriculer", "Comportement de fait sans volonté consciente de créer une société"],
                      ["Statuts", "Peuvent exister (écrits ou verbaux)", "Absents le plus souvent"],
                      ["Origine", "Contractuelle (accord conscient)", "Comportementale (résultat d'une situation de fait)"],
                      ["Régime applicable", "Règles propres à la SEP (Art. 854 à 863)", "Règles de la SNC appliquées (Art. 865)"],
                    ].map(([crit, sep, sdFait], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-emerald-50"}>
                        <td className="border border-emerald-200 p-2 font-semibold text-emerald-800">{crit}</td>
                        <td className="border border-emerald-200 p-2 text-center">{sep}</td>
                        <td className="border border-emerald-200 p-2 text-center">{sdFait}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Qui peut invoquer la société de fait ? (Art. 866)
              </h3>
              <p>
                L'Art. 866 AUSCGIE précise que l'existence d'une société de fait peut être invoquée par <strong>les associés eux-mêmes</strong> (pour réclamer le partage des bénéfices par exemple) et par <strong>les tiers</strong> (pour engager la responsabilité de tous les associés de fait). Cette double faculté d'invocation distingue la société de fait d'une simple société nulle.
              </p>
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                {[qcmQuestions[6], qcmQuestions[7]].map((q, i) => <QCMBlock key={i} q={q} />)}
              </div>
            </div>
          )}

          {/* ── LEÇON 5 ── */}
          {activeLecon === 4 && (
            <div className="rounded-xl border border-border bg-card p-4 space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                La société de fait est soumise à un régime juridique résultant de l'application des règles de la SNC, avec des spécificités liées à son origine informelle.
              </p>

              <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Application des règles de la SNC (Art. 865)
              </h3>
              <p>
                L'Art. 865 AUSCGIE dispose que <strong>les règles de la SNC s'appliquent à la société de fait entre plusieurs personnes</strong>. Cette application emporte des conséquences importantes, notamment :
              </p>
              <div className="space-y-2">
                {[
                  { titre: "Responsabilité indéfinie et solidaire", contenu: "Tous les associés de fait sont responsables indéfiniment et solidairement des dettes nées de l'activité commune. Un créancier peut poursuivre n'importe lequel d'entre eux pour la totalité de la dette." },
                  { titre: "Qualité de commerçant", contenu: "Si l'activité est commerciale, tous les associés de fait acquièrent la qualité de commerçant, avec toutes les obligations qui y sont attachées (immatriculation au RCCM à titre personnel, respect des obligations comptables, etc.)." },
                  { titre: "Interdiction d'associés", contenu: "Les personnes frappées d'une interdiction de commercer ou d'incapacité légale ne peuvent pas être associés de fait dans une activité commerciale sans engager leur responsabilité pénale." },
                ].map((item, i) => (
                  <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                    <p className="font-semibold text-emerald-800 text-xs mb-1">{item.titre}</p>
                    <p className="text-xs text-gray-700">{item.contenu}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Dissolution de la société de fait (Art. 867-868)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead><tr className="bg-emerald-600 text-white">
                    <th className="border border-emerald-700 p-2 text-left">Mode de dissolution</th>
                    <th className="border border-emerald-700 p-2 text-left">Règle</th>
                    <th className="border border-emerald-700 p-2 text-left">Article</th>
                  </tr></thead>
                  <tbody>
                    {[
                      ["Cessation d'activité commune", "La dissolution intervient lorsque les personnes cessent de se comporter comme des associés", "Art. 867"],
                      ["Dissolution judiciaire", "Tout associé de fait peut saisir le tribunal pour faire constater et liquider la société de fait", "Art. 867"],
                      ["Partage des biens communs", "Les biens acquis ou générés dans le cadre de l'activité commune sont partagés en proportion des apports de chacun, selon les règles de l'indivision", "Art. 868"],
                    ].map(([mode, regle, art], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-emerald-50"}>
                        <td className="border border-emerald-200 p-2 font-semibold text-emerald-800">{mode}</td>
                        <td className="border border-emerald-200 p-2">{regle}</td>
                        <td className="border border-emerald-200 p-2">{art}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-3">
                <div className="flex gap-3 text-amber-800">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1 text-xs">Points essentiels à retenir</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {[
                        { titre: "Art. 854 - SEP", contenu: "Pas de personnalité morale, pas d'immatriculation, connue des seuls associés." },
                        { titre: "Art. 856 - Apports SEP", contenu: "Chaque associé reste propriétaire de ses apports (pas de transfert à une personne morale)." },
                        { titre: "Art. 858 - Responsabilité commerciale", contenu: "Seul l'associé contractant est engagé envers les tiers dans la SEP commerciale." },
                        { titre: "Art. 864 - Société de fait", contenu: "Comportement de facto d'associés sans constitution formelle d'une société OHADA." },
                        { titre: "Art. 865 - Régime SdF", contenu: "Règles SNC applicables : responsabilité indéfinie et solidaire de tous les associés de fait." },
                        { titre: "Art. 866 - Invocabilité", contenu: "Associés ET tiers peuvent invoquer l'existence de la société de fait." },
                      ].map((item, i) => (
                        <div key={i} className="bg-amber-100 rounded p-2">
                          <p className="font-semibold text-amber-900 text-xs mb-0.5">{item.titre}</p>
                          <p className="text-amber-800 text-xs">{item.contenu}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                {[qcmQuestions[8], qcmQuestions[9]].map((q, i) => <QCMBlock key={i} q={q} />)}
              </div>
            </div>
          )}

          {/* Navigation leçons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => { if (activeLecon > 0) setActiveLecon(activeLecon - 1) }}
              disabled={activeLecon === 0}
              className={cn(
                'flex items-center gap-1 text-sm px-4 py-2 rounded-xl border transition-colors',
                activeLecon === 0 ? 'opacity-40 cursor-not-allowed border-border' : 'border-border hover:border-emerald-500'
              )}
            >
              <ArrowLeft className="h-4 w-4" /> Précédente
            </button>
            <span className="text-xs text-muted-foreground">{activeLecon + 1} / {lecons.length}</span>
            {activeLecon < lecons.length - 1 ? (
              <button
                onClick={() => setActiveLecon(activeLecon + 1)}
                className="flex items-center gap-1 text-sm px-4 py-2 rounded-xl border border-border hover:border-emerald-500 transition-colors"
              >
                Suivante <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('qcm')}
                className="flex items-center gap-1 text-sm px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                Aller aux QCM <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── ONGLET QCM ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      {activeTab === 'qcm' && !isEtudiant && (
        <div className="space-y-4">
          <QCMPageUnique questions={qcmQuestions as unknown as QCMChapitre[]} couleurAccent="emerald" />
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── ONGLET CAS PRATIQUES ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      {activeTab === 'cas' && (
        <div className="space-y-3">
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <h2 className="font-display font-bold text-gray-800 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600" />
              Cas Pratiques - SEP et Société de fait ({casPratiques.length} cas)
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Exercices d'application sur la qualification et le régime des sociétés sans personnalité morale.
            </p>
          </div>
          {casPratiques.map(cas => (
            <CasPratiqueBlock key={cas.id} cas={cas} />
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── ONGLET DEVOIR ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      {activeTab === 'devoir' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          {!isEtudiant ? (
            <DevoirChapitreCreateur
              chapitreId="ue2-ch11"
              chapitreNom="Chapitre 11 - Societe en participation et Societe de fait"
              questions={qcmQuestions as unknown as import('@/lib/db').QCMChapitre[]}
              coursId="ue2-droit-societes"
              casPratiquesExistants={casPratiques.map(cp => ({
                id: cp.id,
                titre: cp.titre,
                enonce: cp.contexte + '\n' + cp.questions.join('\n'),
                corrigeType: cp.correction,
              } as CasPratiqueExistant))}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium text-foreground">Devoir en attente</p>
              <p className="text-sm">Votre professeur vous enverra un devoir pour ce chapitre.</p>
            </div>
          )}
        </div>
      )}

      {/* ── BOUTON TERMINER ── */}
      <button
        onClick={goBack}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
      >
        <CheckCircle2 className="h-4 w-4" /> Terminer le chapitre 11
      </button>

      <p className="text-xs text-center text-muted-foreground/60 pb-2">
        Sources : AUSCGIE révisé 30 janvier 2014 - Art. 854 à 868
      </p>
    </div>
  )
}
