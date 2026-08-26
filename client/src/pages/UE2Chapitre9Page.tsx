import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import BackButton from '@/components/BackButton'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, BookOpen, ChevronRight,
  RefreshCw, Scale, Shield, Gavel, TrendingDown, LifeBuoy, Info,
  AlertTriangle, CheckCircle, ChevronDown, ChevronUp, FileText, Star
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import { isStudentRole } from '@/lib/permissions'
import DevoirChapitreCreateur, { CasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
import QCMPageUnique from '@/components/QCMPageUnique'
import { QCMChapitre } from '@/lib/db'
import { InfoTooltip } from '@/components/InfoTooltip'

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
    type: 'qcm', id: 'ch9-q1',
    question: "Selon l'art. 181 AUSCGIE, la transformation régulière d'une société entraîne-t-elle la création d'une personne morale nouvelle ?",
    options: [
      { id: 'a', texte: 'Oui, toujours' },
      { id: 'b', texte: "Non, elle ne constitue qu'une modification des statuts" },
      { id: 'c', texte: 'Oui, sauf si les associés en décident autrement' },
      { id: 'd', texte: 'Seulement pour la transformation en SA' },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 181 al. 2 AUSCGIE dispose expressément que la transformation régulière d'une société n'entraîne pas la création d'une personne morale nouvelle. Elle ne constitue qu'une modification des statuts.",
    articleRef: 'Art. 181 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch9-q2',
    question: "La transformation d'une société à responsabilité limitée en société à responsabilité illimitée requiert :",
    options: [
      { id: 'a', texte: 'La majorité simple des associés' },
      { id: 'b', texte: 'Les 2/3 des associés' },
      { id: 'c', texte: "L'unanimité des associés" },
      { id: 'd', texte: 'La majorité des 3/4 du capital' },
    ],
    reponseCorrecte: 'c',
    explication: "L'Art. 181 al. 3 AUSCGIE impose l'unanimité des associés lorsque la transformation conduit à augmenter la responsabilité (de limitée à illimitée). Toute délibération en violation est nulle.",
    articleRef: 'Art. 181 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch9-q3',
    question: "À quelle date la transformation d'une société prend-elle effet ?",
    options: [
      { id: 'a', texte: 'A la date de publication au RCCM' },
      { id: 'b', texte: 'A la date de la prochaine assemblée générale' },
      { id: 'c', texte: 'A compter du jour où la décision la constatant est prise' },
      { id: 'd', texte: 'A la date de la signature des nouveaux statuts' },
    ],
    reponseCorrecte: 'c',
    explication: "L'Art. 182 AUSCGIE précise que la transformation prend effet à compter du jour où la décision la constatant est prise. Mais elle ne devient opposable aux tiers qu'après accomplissement des formalités de publicité (Art. 265).",
    articleRef: 'Art. 182 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch9-q4',
    question: "Lors d'une transformation, que devient le commissaire aux comptes de la société ?",
    options: [
      { id: 'a', texte: 'Sa mission cesse automatiquement' },
      { id: 'b', texte: 'Il continue si la nouvelle forme requiert un commissaire aux comptes' },
      { id: 'c', texte: 'Il doit être renommé par la nouvelle assemblée' },
      { id: 'd', texte: 'Sa mission est suspendue 6 mois' },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 187 AUSCGIE : la transformation ne met pas fin aux fonctions du commissaire aux comptes si la nouvelle forme sociale requiert la nomination d'un commissaire aux comptes. Sinon, sa mission cesse.",
    articleRef: 'Art. 187 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch9-q5',
    question: "La fusion entraîne-t-elle la liquidation de la société absorbée ?",
    options: [
      { id: 'a', texte: "Oui, avec liquidation complète de l'actif" },
      { id: 'b', texte: 'Non, elle entraîne la dissolution sans liquidation et transmission universelle du patrimoine' },
      { id: 'c', texte: "Oui, avec partage de l'actif entre les associés" },
      { id: 'd', texte: "Non, la société absorbée continue d'exister" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 191 AUSCGIE dispose que la fusion entraîne la dissolution SANS liquidation des sociétés qui disparaissent et la transmission universelle de leur patrimoine aux sociétés bénéficiaires.",
    articleRef: 'Art. 191 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch9-q6',
    question: "Quelle est la soulte maximale pouvant être versée lors d'une fusion selon l'AUSCGIE ?",
    options: [
      { id: 'a', texte: "5% de la valeur d'échange des parts" },
      { id: 'b', texte: "10% de la valeur d'échange des parts ou actions" },
      { id: 'c', texte: '15% du capital de la société absorbante' },
      { id: 'd', texte: 'Pas de limite fixée par la loi' },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 191 AUSCGIE prévoit que les associés peuvent recevoir une soulte dont le montant ne peut dépasser dix pour cent (10%) de la valeur d'échange des parts ou actions attribuées.",
    articleRef: 'Art. 191 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch9-q7',
    question: "Le projet de fusion doit être publié avant la première AG au moins :",
    options: [
      { id: 'a', texte: '15 jours avant' },
      { id: 'b', texte: '1 mois avant' },
      { id: 'c', texte: '2 mois avant' },
      { id: 'd', texte: '3 mois avant' },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 194 AUSCGIE impose que le dépôt au RCCM et la publicité dans un journal d'annonces légales aient lieu au moins un (1) mois avant la date de la première assemblée générale appelée à statuer sur l'opération.",
    articleRef: 'Art. 194 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch9-q8',
    question: "L'apport partiel d'actif est soumis au régime de :",
    options: [
      { id: 'a', texte: 'La fusion' },
      { id: 'b', texte: 'La scission' },
      { id: 'c', texte: 'La dissolution' },
      { id: 'd', texte: 'La liquidation' },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 195 AUSCGIE dispose expressément que l'apport partiel d'actif est soumis au régime de la scission. La société apporteuse ne disparaît pas, contrairement à la scission totale.",
    articleRef: 'Art. 195 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch9-q9',
    question: "La cessation des paiements est définie comme :",
    options: [
      { id: 'a', texte: "L'incapacité à payer une dette précise à son échéance" },
      { id: 'b', texte: "L'impossibilité de faire face au passif exigible avec l'actif disponible" },
      { id: 'c', texte: "Le fait d'avoir plus de dettes que d'actifs au bilan" },
      { id: 'd', texte: 'Un retard de paiement supérieur à 90 jours' },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 1-3 AUPCAP définit la cessation des paiements comme l'état où le débiteur se trouve dans l'impossibilité de faire face à son passif exigible avec son actif disponible. Les réserves de crédit accordées par les créanciers sont exclues de cette appréciation.",
    articleRef: 'Art. 1-3 AUPCAP 2015',
  },
  {
    type: 'qcm', id: 'ch9-q10',
    question: "La conciliation AUPCAP est ouverte à l'entreprise qui :",
    options: [
      { id: 'a', texte: "Est en cessation des paiements depuis moins d'un mois" },
      { id: 'b', texte: "Connaît des difficultés avérées ou prévisibles mais n'est pas en cessation des paiements" },
      { id: 'c', texte: 'A un passif supérieur à son actif' },
      { id: 'd', texte: 'Est en redressement judiciaire depuis moins de 6 mois' },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 5-1 AUPCAP : la conciliation est ouverte aux personnes qui connaissent des difficultés avérées ou prévisibles mais qui ne sont PAS encore en état de cessation des paiements.",
    articleRef: 'Art. 5-1 AUPCAP 2015',
  },
  {
    type: 'qcm', id: 'ch9-q11',
    question: "Combien de temps dure maximum la procédure de conciliation (hors prorogation) ?",
    options: [
      { id: 'a', texte: '1 mois' },
      { id: 'b', texte: '2 mois' },
      { id: 'c', texte: '3 mois' },
      { id: 'd', texte: '6 mois' },
    ],
    reponseCorrecte: 'c',
    explication: "La procédure de conciliation peut être ouverte pour une durée n'excédant pas 3 mois, avec une prorogation possible d'1 mois sur décision spécialement motivée du conciliateur.",
    articleRef: 'Art. 5-2 AUPCAP 2015',
  },
  {
    type: 'qcm', id: 'ch9-q12',
    question: "La conciliation AUPCAP est une procédure :",
    options: [
      { id: 'a', texte: 'Publique et contradictoire' },
      { id: 'b', texte: 'Préventive, consensuelle et confidentielle' },
      { id: 'c', texte: 'Judiciaire et obligatoire avant tout redressement' },
      { id: 'd', texte: 'Réservée aux grandes entreprises' },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 2 AUPCAP définit la conciliation comme une procédure préventive, consensuelle ET confidentielle. Toute personne qui a connaissance de la conciliation est tenue à la confidentialité (Art. 5-1).",
    articleRef: 'Art. 2, 5-1 AUPCAP 2015',
  },
  {
    type: 'qcm', id: 'ch9-q13',
    question: "Le règlement préventif aboutit à l'adoption d'un :",
    options: [
      { id: 'a', texte: 'Accord de conciliation' },
      { id: 'b', texte: 'Concordat préventif' },
      { id: 'c', texte: 'Concordat de redressement' },
      { id: 'd', texte: 'Plan de liquidation' },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 2 AUPCAP : le règlement préventif vise à permettre l'apurement du passif au moyen d'un concordat préventif. Une fois homologué, le concordat s'impose à tous les créanciers antérieurs à la décision d'ouverture (Art. 18 AUPCAP).",
    articleRef: 'Art. 2, 18 AUPCAP 2015',
  },
  {
    type: 'qcm', id: 'ch9-q14',
    question: "Le redressement judiciaire est applicable quand :",
    options: [
      { id: 'a', texte: "L'entreprise a des difficultés prévisibles" },
      { id: 'b', texte: "L'entreprise est en cessation des paiements mais sa situation n'est pas irrémédiablement compromise" },
      { id: 'c', texte: "L'entreprise est en cessation des paiements et sa situation est irrémédiablement compromise" },
      { id: 'd', texte: "L'entreprise a un passif supérieur à 50% de son actif" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 2 AUPCAP : le redressement judiciaire est une procédure destinée au sauvetage de l'entreprise en cessation des paiements MAIS dont la situation n'est PAS irrémédiablement compromise. Si la situation est irrémédiablement compromise, c'est la liquidation des biens.",
    articleRef: 'Art. 2 AUPCAP 2015',
  },
  {
    type: 'qcm', id: 'ch9-q15',
    question: "La liquidation des biens a pour but :",
    options: [
      { id: 'a', texte: "De sauver l'entreprise grâce à un concordat" },
      { id: 'b', texte: "De réaliser l'actif pour apurer le passif d'une entreprise irrémédiablement compromise" },
      { id: 'c', texte: "De restructurer financièrement l'entreprise" },
      { id: 'd', texte: "De négocier des délais de paiement avec les créanciers" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 2 AUPCAP : la liquidation des biens est destinée à la réalisation de l'actif de l'entreprise débitrice en cessation des paiements dont la situation est irrémédiablement compromise pour apurer son passif.",
    articleRef: 'Art. 2 AUPCAP 2015',
  },
  {
    type: 'qcm', id: 'ch9-q16',
    question: "Quelle est la règle d'unanimité en matière de transformation de société AUSCGIE ?",
    options: [
      { id: 'a', texte: "L'unanimité est toujours requise pour toute transformation" },
      { id: 'b', texte: "L'unanimité est requise uniquement si la transformation augmente la responsabilité des associés (limitée vers illimitée)" },
      { id: 'c', texte: "L'unanimité est requise seulement pour la transformation d'une SARL en SA" },
      { id: 'd', texte: "L'unanimité n'est jamais requise pour les transformations" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 181 al. 3 AUSCGIE : l'unanimité est requise uniquement quand la transformation conduit d'une forme à responsabilité limitée vers une forme à responsabilité illimitée. Pour les autres transformations, ce sont les règles ordinaires de modification des statuts qui s'appliquent.",
    articleRef: 'Art. 181 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch9-q17',
    question: "Une fusion peut-elle intervenir entre des sociétés de formes juridiques différentes (SARL et SA) ?",
    options: [
      { id: 'a', texte: "Non, les sociétés doivent être de même forme" },
      { id: 'b', texte: "Oui, sauf disposition contraire de l'AUSCGIE" },
      { id: 'c', texte: "Oui, mais uniquement si les deux ont le même capital" },
      { id: 'd', texte: "Non, sauf autorisation du tribunal" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 196 AUSCGIE : sauf disposition contraire du présent Acte uniforme, les opérations de fusion, scission et apport partiel d'actifs peuvent intervenir entre des sociétés de forme différente.",
    articleRef: 'Art. 196 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch9-q18',
    question: "La déclaration de conformité (Art. 198 AUSCGIE) doit être déposée :",
    options: [
      { id: 'a', texte: "Auprès du Ministère des finances" },
      { id: 'b', texte: "Au greffe de la juridiction compétente, à peine de nullité de l'opération" },
      { id: 'c', texte: "Au RCCM, dans les 30 jours" },
      { id: 'd', texte: "Auprès du notaire rédacteur des actes" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 198 AUSCGIE : à peine de nullité, les sociétés participant à une opération de fusion, scission ou apport partiel d'actifs sont tenues de déposer au greffe une déclaration relatant tous les actes effectués et affirmant la conformité de l'opération à l'AUSCGIE.",
    articleRef: 'Art. 198 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch9-q19',
    question: "Une petite entreprise selon l'AUPCAP est une entreprise dont le nombre de travailleurs est inférieur ou égal à :",
    options: [
      { id: 'a', texte: "10 travailleurs" },
      { id: 'b', texte: "20 travailleurs et CA inférieur ou égal à 50 millions FCFA HT" },
      { id: 'c', texte: "50 travailleurs" },
      { id: 'd', texte: "100 travailleurs et CA inférieur ou égal à 100 millions FCFA HT" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 1-3 AUPCAP : petite entreprise = effectif inférieur ou égal à 20 travailleurs ET chiffre d'affaires inférieur ou égal à 50 000 000 FCFA HT sur les 12 mois précédant la saisine. Elle peut bénéficier d'une procédure simplifiée.",
    articleRef: 'Art. 1-3 AUPCAP 2015',
  },
  {
    type: 'qcm', id: 'ch9-q20',
    question: "L'AUPCAP révisé de 2015 a été adopté à :",
    options: [
      { id: 'a', texte: "Libreville, Gabon" },
      { id: 'b', texte: "Dakar, Sénégal" },
      { id: 'c', texte: "Grand-Bassam, Côte d'Ivoire" },
      { id: 'd', texte: "Yaoundé, Cameroun" },
    ],
    reponseCorrecte: 'c',
    explication: "L'AUPCAP révisé a été adopté le 10 septembre 2015 à Grand-Bassam (Côte d'Ivoire) lors du 40ème Conseil des Ministres de l'OHADA. Il est entré en vigueur le 24 décembre 2015.",
    articleRef: 'AUPCAP 2015 - Préambule',
  },
]

// ─── Leçons ──────────────────────────────────────────────────────────────────
const lecons = [
  {
    id: 'L1',
    titre: 'La transformation des sociétés',
    ref: 'Art. 181-188 AUSCGIE',
  },
  {
    id: 'L2',
    titre: 'Fusion, scission et apport partiel d\'actifs',
    ref: 'Art. 189-199 AUSCGIE',
  },
  {
    id: 'L3',
    titre: 'Difficultés d\'entreprise et procédures préventives',
    ref: 'AUPCAP Art. 1-5',
  },
  {
    id: 'L4',
    titre: 'La conciliation',
    ref: 'AUPCAP Art. 5-1 à 5-9',
  },
  {
    id: 'L5',
    titre: 'Le règlement préventif',
    ref: 'AUPCAP Art. 6-23',
  },
  {
    id: 'L6',
    titre: 'Redressement judiciaire et liquidation des biens',
    ref: 'AUPCAP Art. 2, 25-140',
  },
  {
    id: 'L7',
    titre: 'Liens de droit entre sociétés - Filiales, participations et contrôle',
    ref: 'AUSCGIE Art. 173-180',
  },
]

// ─── Cas pratiques ────────────────────────────────────────────────────────────
const casPratiques = [
  {
    id: 'cas1',
    titre: 'Cas 1 : Transformation contestée',
    niveau: 'Art. 181 AUSCGIE',
    contexte: 'La SARL KINDU TRADE (4 associés, responsabilité limitée) décide de se transformer en SNC (responsabilité illimitée). 3 associés représentant 75% du capital votent pour. L\'associé MWAMBA (25%) vote contre.',
    questions: [
      'Question 1 : La transformation est-elle valide ?',
      'Question 2 : Quels sont les effets de la transformation sur le gérant en place ?',
    ],
    correction: "Q1 : Non. L'Art. 181 al. 3 AUSCGIE dispose que la transformation d'une société à responsabilité limitée en société à responsabilité illimitée est décidée à l'unanimité des associés. L'unanimité n'étant pas atteinte, la délibération est nulle de plein droit (Art. 181 al. 4).\n\nQ2 : L'Art. 184 AUSCGIE dispose que la décision de transformation met fin aux pouvoirs des organes de gestion. Le gérant ne peut demander des D&I que si la transformation a été décidée dans le seul but de porter atteinte à ses droits.",
  },
  {
    id: 'cas2',
    titre: 'Cas 2 : Fusion absorption',
    niveau: 'Art. 189-198 AUSCGIE',
    contexte: 'La SA GOMA HOLDING veut absorber la SARL BUKAVU SERVICES. Le projet de fusion est établi mais n\'a été déposé au RCCM et publié que 3 semaines avant l\'AG d\'approbation.',
    questions: [
      'Question 1 : Cette opération respecte-t-elle le délai légal de publicité ?',
      'Question 2 : Que se passe-t-il si les sociétés omettent de déposer la déclaration de conformité ?',
    ],
    correction: "Q1 : Non. L'Art. 194 AUSCGIE impose un délai minimum d'un (1) mois avant la première AG. Le délai de 3 semaines est insuffisant et l'opération peut être contestée.\n\nQ2 : L'Art. 198 AUSCGIE prévoit la nullité de la fusion à défaut de dépôt au greffe d'une déclaration relatant tous les actes effectués et affirmant la conformité à l'AUSCGIE.",
  },
  {
    id: 'cas3',
    titre: 'Cas 3 : Entreprise en difficulté',
    niveau: 'AUPCAP Art. 2, 5-1',
    contexte: 'La SARL MANIEMA COMMERCE connaît des difficultés de trésorerie depuis 3 mois. Elle n\'est pas encore en cessation des paiements mais ses dettes fournisseurs s\'accumulent. Le gérant hésite entre conciliation et règlement préventif.',
    questions: [
      'Question 1 : Quelle procédure est la plus adaptée et pourquoi ?',
      'Question 2 : Que se passe-t-il si la conciliation échoue et que l\'entreprise atteint la cessation des paiements ?',
    ],
    correction: "Q1 : La conciliation (Art. 2 et 5-1 AUPCAP) est la plus adaptée : elle est ouverte avant cessation des paiements, confidentielle, et consensuelle. La société ne doit pas attendre la cessation des paiements.\n\nQ2 : Si la conciliation échoue et que la cessation des paiements est atteinte : (1) Redressement judiciaire si la situation n'est pas irrémédiablement compromise (concordat de redressement). (2) Liquidation des biens si la situation est irrémédiablement compromise (apurement du passif).",
  },
  {
    id: 'cas4',
    titre: "Cas 4 : Apport partiel d'actifs",
    niveau: 'Art. 195 AUSCGIE',
    contexte: "La SA KIVU INDUSTRY veut céder sa branche d'activité \"distribution alimentaire\" à une nouvelle SARL qu'elle vient de créer, tout en conservant sa branche \"production industrielle\".",
    questions: [
      'Question 1 : Quelle opération juridique convient à cette situation ?',
      'Question 2 : Quelles formalités s\'appliquent à cette opération ?',
    ],
    correction: "Q1 : L'apport partiel d'actifs (Art. 195 AUSCGIE) est l'opération idéale : la société apporteuse NE DISPARAIT PAS, elle fait apport d'une branche autonome à une société préexistante ou à créer. Il est soumis au régime de la scission.\n\nQ2 : Formalités à respecter : (1) Projet d'apport avec mentions obligatoires (Art. 193). (2) Dépôt RCCM et publication au moins 1 mois avant l'AG (Art. 194). (3) Décision des associés dans les conditions de modification des statuts (Art. 197). (4) Déclaration de conformité au greffe à peine de nullité (Art. 198).",
  },
]

// ─── Composant CasPratiqueBlock ───────────────────────────────────────────────
/* ── COMPOSANT QCM COMPRÉHENSION ── */
function QCMBlock({ q }: { q: QCMQuestion }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  return (
    <div className="rounded-xl border border-orange-200 bg-orange-50/30 p-4 space-y-3">
      <p className="text-xs font-semibold text-orange-700">{q.question}</p>
      <div className="space-y-1.5">
        {q.options.map(opt => {
          let cls = 'w-full text-left text-xs px-3 py-2 rounded-lg border transition-colors '
          if (!showResult) cls += selected === opt.id ? 'border-orange-500 bg-orange-100 text-orange-800' : 'border-border hover:border-orange-300 hover:bg-muted/40'
          else if (opt.id === q.reponseCorrecte) cls += 'border-green-500 bg-green-50 text-green-700'
          else if (opt.id === selected) cls += 'border-red-400 bg-red-50 text-red-600'
          else cls += 'border-border opacity-50'
          return <button key={opt.id} className={cls} onClick={() => { if (!showResult) setSelected(opt.id) }} disabled={showResult}><span className="font-bold mr-1.5">{opt.id.toUpperCase()}.</span>{opt.texte}</button>
        })}
      </div>
      {!showResult && <button onClick={() => { if (selected) setShowResult(true) }} disabled={!selected} className="text-xs bg-orange-600 text-white rounded-lg px-4 py-1.5 disabled:opacity-40 hover:bg-orange-700 transition-colors font-semibold">Vérifier</button>}
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

function CasPratiqueBlock({
  cp, isEtudiant,
}: {
  cp: typeof casPratiques[0]
  isEtudiant: boolean
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-orange-200 rounded-xl overflow-hidden">
      <div className="bg-orange-700 px-5 py-4 text-white flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base">{cp.titre}</h3>
          <span className="text-xs text-orange-200">{cp.niveau}</span>
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
            <div key={idx} className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-900 font-medium">
              {q}
            </div>
          ))}
        </div>
        {/* Correction */}
        <div>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-sm font-medium text-orange-700 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg px-4 py-2 transition-colors"
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
export default function UE2Chapitre9Page() {
  const goBack = useGoBack('/ue2-droit-societes')
  const user = useUser()

  // Onglets
  const [activeTab, setActiveTab] = useState<'lecons' | 'qcm' | 'cas' | 'devoir'>('lecons')
  // Leçon active
  const [activeLecon, setActiveLecon] = useState(0)
  // QCM états
  const [qcmIdx, setQcmIdx] = useState(0)
  const [qcmSelected, setQcmSelected] = useState<string | null>(null)
  const [qcmShowResult, setQcmShowResult] = useState(false)
  const [qcmScore, setQcmScore] = useState(0)
  const [qcmDone, setQcmDone] = useState(false)

  const lecon = lecons[activeLecon]
  const currentQ = qcmQuestions[qcmIdx]
  const totalQ = qcmQuestions.length

  function handleQcmVerifier() {
    if (!qcmSelected) return
    setQcmShowResult(true)
    if (qcmSelected === currentQ.reponseCorrecte) {
      setQcmScore(s => s + 1)
    }
  }

  function handleQcmSuivant() {
    if (qcmIdx + 1 >= totalQ) {
      setQcmDone(true)
    } else {
      setQcmIdx(i => i + 1)
      setQcmSelected(null)
      setQcmShowResult(false)
    }
  }

  function handleQcmRestart() {
    setQcmIdx(0)
    setQcmSelected(null)
    setQcmShowResult(false)
    setQcmScore(0)
    setQcmDone(false)
  }

  return (
    <div className="space-y-4 pb-10 animate-fadeIn">

      {/* ─── HEADER ─── */}
      <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 2 - Droit des sociétés', route: '/ue2-droit-societes' },
            { label: 'Chapitre 9' },
          ]}
          color="indigo"
        />
        <BackButton />
        <h1 className="text-xl font-display font-bold text-gray-900 leading-tight mt-0.5">Transformation des Sociétés et Difficultés d'Entreprise</h1>
        <p className="text-sm text-gray-500">AUSCGIE Art. 181-199 et AUPCAP révisé 2015 - OHADA</p>
      </div>

      {/* ─── STATS ─── */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Leçons', value: '7', icon: BookOpen },
          { label: 'QCM', value: '20', icon: CheckCircle2 },
          { label: 'Cas pratiques', value: '4', icon: FileText },
          { label: 'Durée', value: '3h', icon: Star },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white border border-orange-100 rounded-xl p-3 text-center shadow-sm">
            <Icon className="w-4 h-4 text-orange-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-orange-700">{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      {/* ─── OBJECTIFS ─── */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
        <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide mb-2">Objectifs du chapitre</p>
        <ul className="space-y-1">
          {[
            'Maîtriser le régime juridique de la transformation (Art. 181-188 AUSCGIE)',
            'Distinguer fusion, scission et apport partiel d\'actifs',
            'Identifier les 4 procédures AUPCAP et leurs conditions',
            'Connaître la procédure de conciliation (innovation 2015)',
            'Différencier redressement judiciaire et liquidation des biens',
          ].map((obj, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-orange-900">
              <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
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
                ? 'bg-white text-orange-700 shadow-sm'
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
                    ? 'bg-orange-600 text-white border-orange-600 shadow'
                    : 'bg-white text-orange-700 border-orange-200 hover:bg-orange-50'
                )}
              >
                {l.id}
              </button>
            ))}
          </div>

          {/* Carte leçon */}
          <div className="bg-white border-l-4 border-orange-500 rounded-xl shadow-sm p-5 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-3 py-0.5">{lecon.ref}</span>
              </div>
              <h2 className="text-lg font-display font-bold text-gray-900">{lecon.id} - {lecon.titre}</h2>
            </div>

            {/* ── LEÇON 1 ── */}
            {activeLecon === 0 && (
              <div className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-2">
                  <Scale className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-orange-900">
                    <strong>Art. 181 AUSCGIE :</strong> La transformation de la société est l'opération par laquelle une société change de forme juridique par décision des associés. La transformation régulière n'entraîne pas la création d'une personne morale nouvelle. Elle ne constitue qu'une modification des statuts.
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-orange-500" />
                    Principe de continuité
                  </h4>
                  <ul className="space-y-1.5">
                    {[
                      "Pas de création de nouvelle personne morale (Art. 181 al. 2)",
                      "Pas d'arrêté des comptes sauf décision contraire des associés (Art. 183)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Règles de majorité selon la transformation</h4>
                  <div className="overflow-x-auto rounded-lg border border-orange-200">
                    <table className="w-full text-sm">
                      <thead className="bg-orange-100">
                        <tr>
                          <th className="text-left p-3 font-semibold text-orange-900">Type de transformation</th>
                          <th className="text-left p-3 font-semibold text-orange-900">Majorité requise</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-orange-100">
                        <tr className="bg-orange-50">
                          <td className="p-3 text-gray-800">Responsabilité limitée vers responsabilité illimitée</td>
                          <td className="p-3 font-semibold text-orange-800">Unanimité des associés (Art. 181 al. 3)</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="p-3 text-gray-800">Autres transformations</td>
                          <td className="p-3 text-gray-700">Conditions de modification des statuts</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-orange-600 mt-1 italic">Toute délibération prise en violation de la règle d'unanimité est nulle (Art. 181 al. 4)</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Effets de la transformation</h4>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Prise d'effet :</strong> jour de la décision (Art. 182)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Opposabilité aux tiers :</strong> après accomplissement des formalités de publicité (Art. 265 AUSCGIE)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Fin des pouvoirs des anciens organes</strong> (Art. 184)
                        {' '}<InfoTooltip texte="Les dirigeants dont les pouvoirs cessent du fait de la transformation ne peuvent demander des D&I que si la transformation a été décidée dans le seul but de porter atteinte à leurs droits (Art. 184 al. 2)." loi="Art. 184 AUSCGIE" />
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Rapport de gestion :</strong> établi par les anciens ET les nouveaux organes pour leurs périodes respectives (Art. 185)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Continuité des obligations (Art. 186)</h4>
                  <ul className="space-y-1.5 mb-3">
                    {[
                      "Droits et obligations sous l'ancienne forme subsistent",
                      "Sûretés maintenues sauf clause contraire",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-amber-900"><strong>Protection des créanciers (Art. 186 al. 2) :</strong> en cas de transformation d'une société à responsabilité illimitée en société à responsabilité limitée, les créanciers antérieurs conservent leurs droits contre la société ET contre les associés.</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Commissaires à la transformation (Art. 187-1)
                    {' '}<InfoTooltip texte="Lorsqu'une société sans commissaire aux comptes se transforme en société par actions, des commissaires à la transformation sont désignés pour apprécier la valeur des biens composant l'actif social. Désignation par accord unanime des associés ou par le tribunal." loi="Art. 187-1 AUSCGIE" />
                  </h4>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-amber-900"><strong>Art. 187-1 :</strong> À défaut d'approbation expresse des associés sur l'évaluation des biens, mentionnée au procès-verbal, la transformation est nulle.</div>
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                  {[qcmQuestions[0], qcmQuestions[1], qcmQuestions[3]].map((q, i) => <QCMBlock key={i} q={q} />)}
                </div>
              </div>
            )}

            {/* ── LEÇON 2 ── */}
            {activeLecon === 1 && (
              <div className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-2">
                  <Scale className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-orange-900">
                    <strong>Art. 189 AUSCGIE :</strong> La fusion est l'opération par laquelle deux ou plusieurs sociétés se réunissent pour n'en former qu'une seule soit par création d'une société nouvelle soit par absorption par l'une d'entre elles. La fusion entraîne transmission à titre universel du patrimoine.
                  </div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-2">
                  <Scale className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-orange-900">
                    <strong>Art. 190 AUSCGIE :</strong> La scission est l'opération par laquelle le patrimoine d'une société est partagé entre plusieurs sociétés existantes ou nouvelles.
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-2">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <strong>Art. 195 AUSCGIE :</strong> L'apport partiel d'actif est l'opération par laquelle une société fait apport d'une branche autonome d'activité à une société préexistante ou à créer. La société apporteuse ne disparaît pas. Il est soumis au régime de la scission.
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Effets de la fusion/scission (Art. 191)</h4>
                  <ul className="space-y-1.5">
                    {[
                      "Dissolution SANS liquidation des sociétés qui disparaissent",
                      "Transmission universelle du patrimoine à l'état où il se trouve",
                      "Les associés des sociétés disparues deviennent associés des sociétés bénéficiaires",
                      "Soulte possible : max 10% de la valeur d'échange des parts/actions",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Date de prise d'effet (Art. 192)</h4>
                  <div className="overflow-x-auto rounded-lg border border-orange-200">
                    <table className="w-full text-sm">
                      <thead className="bg-orange-100">
                        <tr>
                          <th className="text-left p-3 font-semibold text-orange-900">Opération</th>
                          <th className="text-left p-3 font-semibold text-orange-900">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-orange-100">
                        <tr className="bg-orange-50">
                          <td className="p-3 text-gray-800">Création d'une société nouvelle</td>
                          <td className="p-3 font-semibold text-orange-800">Date d'immatriculation au RCCM</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="p-3 text-gray-800">Absorption ou autres cas</td>
                          <td className="p-3 font-semibold text-orange-800">Date de la dernière AG ayant approuvé l'opération</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Projet de fusion/scission (Art. 193-194)
                    {' '}<InfoTooltip texte="Le projet de fusion est un document obligatoire établi par les dirigeants, contenant les mentions légales prévues à l'art. 193. Il doit être déposé au RCCM et publié dans un journal d'annonces légales au moins 1 mois avant la première AG." loi="Art. 193-194 AUSCGIE" />
                  </h4>
                  <p className="text-sm font-medium text-gray-700 mb-2">Mentions obligatoires du projet (Art. 193) :</p>
                  <ul className="space-y-1.5">
                    {[
                      "Forme, dénomination et siège des sociétés concernées",
                      "Motifs et conditions de la fusion/scission",
                      "Evaluation de l'actif et du passif transmis",
                      "Modalités de remise des parts sociales ou actions",
                      "Dates des comptes utilisés pour établir les conditions",
                      "Rapport d'échange des droits sociaux",
                      "Montant de la prime de fusion/scission",
                      "Droits accordés aux porteurs de titres spéciaux",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-4 h-4 bg-orange-200 text-orange-800 text-xs rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-amber-900"><strong>Délai de publicité (Art. 194) :</strong> le dépôt au RCCM et la publicité doivent avoir lieu au moins 1 mois avant la date de la première AG appelée à statuer sur l'opération.</div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Gavel className="w-4 h-4 text-orange-500" />
                    Déclaration de conformité (Art. 198)
                  </h4>
                  <p className="text-sm text-gray-700">A peine de nullité, dépôt au greffe d'une déclaration affirmant la conformité de l'opération à l'AUSCGIE.</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2 text-sm">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-blue-900"><strong>Art. 196 :</strong> Sauf disposition contraire de l'AUSCGIE, les opérations de fusion, scission et apport partiel d'actifs peuvent intervenir entre des sociétés de forme différente. <strong>Art. 199 :</strong> Ces opérations peuvent concerner des sociétés de sièges dans des États parties différents.</div>
                </div>
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                  {[qcmQuestions[4], qcmQuestions[5], qcmQuestions[6], qcmQuestions[7]].map((q, i) => <QCMBlock key={i} q={q} />)}
                </div>
              </div>
            )}

            {/* ── LEÇON 3 ── */}
            {activeLecon === 2 && (
              <div className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-2">
                  <Scale className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-orange-900">
                    <strong>Art. 1er AUPCAP :</strong> L'AUPCAP organise les procédures préventives de conciliation et de règlement préventif ainsi que les procédures curatives de redressement judiciaire et de liquidation des biens, afin de préserver les activités économiques et les niveaux d'emplois.
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Champ d'application (Art. 1-1)</h4>
                  <p className="text-sm text-gray-700">Toute personne physique (activité indépendante, civile, commerciale, artisanale, agricole) et toute personne morale de droit privé.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Définition : cessation des paiements (Art. 1-3)
                    {' '}<InfoTooltip texte="État où le débiteur se trouve dans l'impossibilité de faire face à son passif exigible avec son actif disponible. EXCEPTION : les réserves de crédit ou délais de paiement accordés par les créanciers permettant de faire face au passif exigible ne constituent pas une cessation des paiements." loi="Art. 1-3 AUPCAP 2015" />
                  </h4>
                  <p className="text-sm text-gray-700">Impossibilité de faire face au passif exigible avec l'actif disponible. Les réserves de crédit ou délais de paiement accordés par les créanciers sont exclus de cette appréciation.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Les 4 procédures AUPCAP (Art. 2)</h4>
                  <div className="overflow-x-auto rounded-lg border border-orange-200">
                    <table className="w-full text-sm">
                      <thead className="bg-orange-100">
                        <tr>
                          <th className="text-left p-3 font-semibold text-orange-900">Procédure</th>
                          <th className="text-left p-3 font-semibold text-orange-900">Nature</th>
                          <th className="text-left p-3 font-semibold text-orange-900">Conditions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-orange-100">
                        <tr className="bg-green-50">
                          <td className="p-3 font-semibold text-green-800">Conciliation</td>
                          <td className="p-3 text-green-700">Préventive, amiable, confidentielle</td>
                          <td className="p-3 text-green-700">Difficultés avérées ou prévisibles, PAS de cessation des paiements</td>
                        </tr>
                        <tr className="bg-orange-50">
                          <td className="p-3 font-semibold text-orange-800">Règlement préventif</td>
                          <td className="p-3 text-orange-700">Préventive, judiciaire</td>
                          <td className="p-3 text-orange-700">Difficultés sérieuses, PAS de cessation des paiements</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="p-3 font-semibold text-yellow-800">Redressement judiciaire</td>
                          <td className="p-3 text-yellow-700">Curative</td>
                          <td className="p-3 text-yellow-700">Cessation des paiements, situation NON irrémédiablement compromise</td>
                        </tr>
                        <tr className="bg-red-50">
                          <td className="p-3 font-semibold text-red-800">Liquidation des biens</td>
                          <td className="p-3 text-red-700">Curative</td>
                          <td className="p-3 text-red-700">Cessation des paiements, situation irrémédiablement compromise</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Petite entreprise (Art. 1-3)
                    {' '}<InfoTooltip texte="Bénéficie d'une procédure simplifiée. Critères cumulatifs : effectif inférieur ou égal à 20 travailleurs ET chiffre d'affaires inférieur ou égal à 50 000 000 FCFA HT sur les 12 mois précédant la saisine." loi="Art. 1-3 AUPCAP 2015" />
                  </h4>
                  <p className="text-sm text-gray-700">Critères cumulatifs : effectif 20 travailleurs ou moins ET chiffre d'affaires inférieur ou égal à 50 000 000 FCFA HT sur les 12 mois précédant la saisine. Peut bénéficier d'une procédure simplifiée.</p>
                </div>
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                  {[qcmQuestions[8], qcmQuestions[9], qcmQuestions[19]].map((q, i) => <QCMBlock key={i} q={q} />)}
                </div>
              </div>
            )}

            {/* ── LEÇON 4 ── */}
            {activeLecon === 3 && (
              <div className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-2">
                  <Scale className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-orange-900">
                    <strong>Art. 2 AUPCAP :</strong> La conciliation est une procédure préventive, consensuelle et confidentielle, destinée à éviter la cessation des paiements de l'entreprise débitrice afin d'effectuer sa restructuration financière ou opérationnelle pour la sauvegarder.
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Conditions d'ouverture (Art. 5-1)</h4>
                  <ul className="space-y-1.5">
                    {[
                      "Difficultés avérées ou prévisibles",
                      "PAS en état de cessation des paiements",
                      "Objectif : accord amiable avec les principaux créanciers",
                      "Confidentialité obligatoire (toute personne informée)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Procédure (Art. 5-2)</h4>
                  <ul className="space-y-1.5">
                    {[
                      "Requête du débiteur seul ou conjointe avec créanciers",
                      "Documents à joindre (moins de 30 jours) : attestation d'immatriculation, états financiers 3 derniers exercices, état de trésorerie et créances/dettes, nombre de travailleurs",
                      "Durée : max 3 mois + prorogation 1 mois",
                      "Conciliateur : proposé par le débiteur ou désigné par le tribunal",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Accord de conciliation
                    {' '}<InfoTooltip texte="L'homologation est la validation de l'accord de conciliation par le président du tribunal. Elle le rend opposable aux tiers et interrompt les poursuites individuelles des créanciers signataires pendant l'exécution." loi="AUPCAP 2015" />
                  </h4>
                  <ul className="space-y-1.5">
                    {[
                      "Options : dépôt au rang des minutes d'un notaire, homologation, ou soumission à exéquatur du président",
                      "Effet pendant l'accord : les créanciers parties ne peuvent plus exercer de poursuites individuelles",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="text-emerald-900"><strong>Innovation AUPCAP 2015 :</strong> La conciliation est une nouveauté introduite par la réforme du 10 septembre 2015 à Grand-Bassam (Côte d'Ivoire). Elle complète le règlement préventif en offrant une solution plus souple, plus rapide et entièrement confidentielle.</div>
                </div>
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                  {[qcmQuestions[10], qcmQuestions[11], qcmQuestions[2]].map((q, i) => <QCMBlock key={i} q={q} />)}
                </div>
              </div>
            )}

            {/* ── LEÇON 5 ── */}
            {activeLecon === 4 && (
              <div className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-2">
                  <Scale className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-orange-900">
                    <strong>Art. 2 AUPCAP :</strong> Le règlement préventif est une procédure collective préventive destinée à éviter la cessation des paiements de l'entreprise débitrice et à permettre l'apurement de son passif au moyen d'un concordat préventif.
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2 text-sm">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-blue-900"><strong>Différence avec la conciliation :</strong> le règlement préventif est une procédure judiciaire (non confidentielle), destinée aux difficultés plus sérieuses.</div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Le concordat préventif
                    {' '}<InfoTooltip texte="Accord approuvé par le tribunal entre le débiteur et ses créanciers sur les modalités d'apurement du passif (délais de paiement, remises de dettes, apports nouveaux). Une fois homologué, il s'impose à tous les créanciers antérieurs à la décision d'ouverture, qu'ils l'aient accepté ou non." loi="Art. 15, 18 AUPCAP 2015" />
                  </h4>
                  <ul className="space-y-1.5">
                    {[
                      "L'accord de tous les créanciers n'est pas requis pour le concordat",
                      "Après homologation (Art. 18) : obligatoire pour TOUS les créanciers antérieurs (chirographaires et garantis)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Expert au règlement préventif</h4>
                  <p className="text-sm text-gray-700 mb-2">Mandataire judiciaire inscrit sur la liste nationale (Art. 4-1, 4-2). Conditions d'inscription :</p>
                  <ul className="space-y-1.5">
                    {[
                      "Exercice plein des droits civils",
                      "Pas de condamnation incompatible",
                      "Expert comptable ou habilité",
                      "Domicile fiscal dans l'État partie",
                      "Moralité suffisante",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-amber-900"><strong>Résolution et nullité du concordat :</strong> Le concordat préventif peut être modifié, annulé ou résolu. L'action en résolution peut être exercée par un créancier ou les contrôleurs. L'action en nullité ne peut être intentée que par le Ministère Public.</div>
                </div>
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                  {[qcmQuestions[12], qcmQuestions[13]].map((q, i) => <QCMBlock key={i} q={q} />)}
                </div>
              </div>
            )}

            {/* ── LEÇON 6 ── */}
            {activeLecon === 5 && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Tableau comparatif : Redressement vs Liquidation</h4>
                  <div className="overflow-x-auto rounded-lg border border-orange-200">
                    <table className="w-full text-sm">
                      <thead className="bg-orange-100">
                        <tr>
                          <th className="text-left p-3 font-semibold text-orange-900">Critère</th>
                          <th className="text-left p-3 font-semibold text-orange-900">Redressement judiciaire</th>
                          <th className="text-left p-3 font-semibold text-orange-900">Liquidation des biens</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-orange-100">
                        <tr className="bg-orange-50">
                          <td className="p-3 font-medium text-gray-800">Condition</td>
                          <td className="p-3 text-gray-700">Cessation des paiements</td>
                          <td className="p-3 text-gray-700">Cessation des paiements</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="p-3 font-medium text-gray-800">Situation</td>
                          <td className="p-3 text-yellow-700 font-semibold">NON irrémédiablement compromise</td>
                          <td className="p-3 text-red-700 font-semibold">Irrémédiablement compromise</td>
                        </tr>
                        <tr className="bg-orange-50">
                          <td className="p-3 font-medium text-gray-800">Objectif</td>
                          <td className="p-3 text-gray-700">Sauvetage + concordat de redressement</td>
                          <td className="p-3 text-gray-700">Réalisation de l'actif + apurement du passif</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="p-3 font-medium text-gray-800">Issue</td>
                          <td className="p-3 text-gray-700">Continuation ou cession de l'entreprise</td>
                          <td className="p-3 text-gray-700">Disparition de l'entreprise</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Cessation des paiements
                    {' '}<InfoTooltip texte="L'impossibilité de faire face au passif exigible avec l'actif disponible. La date de cessation des paiements fixée par le tribunal est cruciale : elle détermine la 'période suspecte' pendant laquelle certains actes peuvent être annulés." loi="Art. 1-3 AUPCAP 2015" />
                  </h4>
                  <p className="text-sm text-gray-700">Impossibilité de faire face au passif exigible avec l'actif disponible. La date fixée par le tribunal détermine la période suspecte pendant laquelle certains actes peuvent être annulés.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Procédure de redressement</h4>
                  <ul className="space-y-1.5">
                    {[
                      "Ouverture : par la juridiction compétente, saisie par le débiteur, un créancier ou d'office",
                      "Syndic : mandataire judiciaire chargé de l'administration de la procédure",
                      "Concordat de redressement : plan d'apurement approuvé par les créanciers et homologué",
                      "Echec du redressement : prononcé de la liquidation des biens",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Procédure de liquidation</h4>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      Réalisation des actifs sous contrôle du syndic
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      Ordre de paiement des créanciers (salaires super-privilégiés en tête)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Salaires super-privilégiés</strong>
                        {' '}<InfoTooltip texte="Rémunérations dues aux travailleurs et apprentis, dans la limite de la fraction insaisissable, au titre des 12 mois précédant la décision d'ouverture. Ils bénéficient d'un privilège de rang supérieur à toutes les autres créances." loi="Art. 1-3 AUPCAP 2015" />
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Sanctions</h4>
                  <p className="text-sm text-gray-700">Faillite personnelle, comblement du passif pour les dirigeants fautifs.</p>
                </div>
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                  {[qcmQuestions[14], qcmQuestions[15], qcmQuestions[16]].map((q, i) => <QCMBlock key={i} q={q} />)}
                </div>
              </div>
            )}

            {/* ── LEÇON 7 : LIENS DE DROIT ENTRE SOCIÉTÉS ── */}
            {activeLecon === 6 && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  Les Art. 173 à 180 de l'AUSCGIE organisent les <strong>liens de droit entre sociétés</strong> : la notion de participation, de filiale et de contrôle. Ces dispositions permettent de qualifier les relations capitalistiques et déterminent des <strong>obligations légales spécifiques</strong> (information, consolidation, restrictions).
                </p>

                <h3 className="font-semibold text-orange-700">Définitions légales (Art. 173-175)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-orange-600 text-white">
                      <th className="border border-orange-700 p-2 text-left">Notion</th>
                      <th className="border border-orange-700 p-2 text-left">Définition légale</th>
                      <th className="border border-orange-700 p-2 text-left">Seuil</th>
                      <th className="border border-orange-700 p-2 text-left">Article</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ["Participation", "Société qui possède dans une autre société une fraction du capital comprise entre 10% et 50%", "10% < part. <= 50%", "Art. 173"],
                        ["Filiale", "Société dans laquelle une autre société (mère) possède plus de la moitié du capital", "Plus de 50%", "Art. 174"],
                        ["Contrôle de droit", "Société qui détient directement ou indirectement la majorité des droits de vote", "Majorité droits de vote", "Art. 175 al. 1"],
                        ["Contrôle de fait", "Société qui désigne en fait par ses votes la majorité des membres des organes de gouvernance lors de deux exercices successifs", "2 exercices consécutifs", "Art. 175 al. 2"],
                        ["Présomption de contrôle", "Toute société est présumée exercer le contrôle lorsqu'elle dispose directement ou indirectement d'une fraction > 50% des droits de vote", "Plus de 50% droits de vote", "Art. 175 al. 3"],
                      ].map(([n, def, s, art], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-orange-50"}>
                          <td className="border border-orange-200 p-2 font-semibold text-orange-800">{n}</td>
                          <td className="border border-orange-200 p-2">{def}</td>
                          <td className="border border-orange-200 p-2 text-center">{s}</td>
                          <td className="border border-orange-200 p-2">{art}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 className="font-semibold text-orange-700">Obligations de déclaration réciproque (Art. 176-177)</h3>
                <div className="space-y-2">
                  {[
                    { titre: "Obligation d'information (Art. 176)", contenu: "Toute société qui vient à posséder plus de 10%, 20%, 1/3, 50% ou 2/3 du capital ou des droits de vote d'une société faisant appel public à l'épargne doit en informer cette dernière dans un délai fixé par la législation nationale." },
                    { titre: "Obligation de déclaration réciproque (Art. 177)", contenu: "Lorsqu'une société (A) possède plus de 10% du capital d'une autre société (B), et que B détient elle-même des actions dans A, B ne peut pas détenir plus de 10% du capital de A. En cas de dépassement, B doit céder le surplus dans un délai raisonnable." },
                  ].map((item, i) => (
                    <div key={i} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <p className="font-semibold text-orange-800 text-xs mb-1">{item.titre}</p>
                      <p className="text-xs text-gray-700">{item.contenu}</p>
                    </div>
                  ))}
                </div>

                <h3 className="font-semibold text-orange-700">Restrictions aux participations réciproques (Art. 178-180)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-orange-600 text-white">
                      <th className="border border-orange-700 p-2 text-left">Règle</th>
                      <th className="border border-orange-700 p-2 text-left">Contenu</th>
                      <th className="border border-orange-700 p-2 text-left">Article</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ["Interdiction de prise de participation réciproque", "Une société (A) ne peut pas posséder d'actions dans une société (B) si B possède déjà plus de 10% du capital de A. Elle doit céder ses actions détenues dans B dans un délai de 1 an.", "Art. 178"],
                        ["Suspension des droits de vote", "En cas de participation réciproque prohibée, les droits de vote attachés aux actions irrrégulièrement détenues sont suspendus jusqu'à régularisation.", "Art. 179"],
                        ["Régularisation forcée", "Si la société ne cède pas les actions dans le délai imparti, le juge peut ordonner la cession forcée à la requête de tout intéressé.", "Art. 180"],
                      ].map(([r, cont, art], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-orange-50"}>
                          <td className="border border-orange-200 p-2 font-semibold text-orange-800">{r}</td>
                          <td className="border border-orange-200 p-2">{cont}</td>
                          <td className="border border-orange-200 p-2">{art}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-3">
                  <p className="text-xs text-amber-800 font-semibold mb-1">Schéma récapitulatif des seuils</p>
                  <div className="space-y-1 text-xs text-amber-700">
                    <p><strong>0% à 10% :</strong> simple détenteur, aucune qualification légale spéciale</p>
                    <p><strong>10% à 50% :</strong> <em>participation</em> (Art. 173) - obligations d'information</p>
                    <p><strong>Plus de 50% :</strong> <em>filiale</em> (Art. 174) - obligations de consolidation, restrictions participations réciproques</p>
                    <p><strong>Contrôle de fait :</strong> mêmes conséquences juridiques que la filiale (Art. 175)</p>
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                  {[qcmQuestions[17], qcmQuestions[18]].map((q, i) => <QCMBlock key={i} q={q} />)}
                </div>
              </div>
            )}

            {/* Navigation Précédente / Suivante */}
            <div className="flex justify-between pt-2 border-t border-orange-100">
              <button
                onClick={() => setActiveLecon(Math.max(0, activeLecon - 1))}
                disabled={activeLecon === 0}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  activeLecon === 0
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-orange-700 hover:bg-orange-50 border border-orange-200'
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
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                )}
              >
                Suivante
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sources */}
          <p className="text-xs text-muted-foreground/60 text-center">
            Sources : AUSCGIE (Acte Uniforme relatif aux Sociétés Commerciales et GIE) - AUPCAP révisé 2015 (Grand-Bassam) - OHADA
          </p>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          ONGLET QCM
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'qcm' && user?.role !== 'etudiant' && (
        <div className="space-y-4">
          <QCMPageUnique questions={qcmQuestions as unknown as QCMChapitre[]} couleurAccent="orange" />
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          ONGLET CAS PRATIQUES
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'cas' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-4">
            <h2 className="font-display font-bold text-orange-800 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Cas Pratiques - Transformation et Difficultés d'Entreprise
            </h2>
            <p className="text-sm text-gray-500 mt-1">4 cas pratiques basés sur les Art. 181-199 AUSCGIE et l'AUPCAP révisé 2015.</p>
          </div>
          {casPratiques.map((cp) => (
            <CasPratiqueBlock key={cp.id} cp={cp} isEtudiant={isStudentRole(user)} />
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          ONGLET DEVOIR
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'devoir' && (
        <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-5">
          {user?.role !== 'etudiant' ? (
            <DevoirChapitreCreateur
              chapitreId="ue2-chapitre9"
              chapitreNom="Chapitre 9 - Transformation des Societes et Difficultes d'Entreprise"
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
              <BookOpen className="w-10 h-10 mx-auto mb-3 text-orange-200" />
              <p className="font-medium text-gray-700">Devoir en attente</p>
              <p className="text-sm mt-1">Votre professeur vous enverra un devoir pour ce chapitre.</p>
            </div>
          )}
        </div>
      )}

      {/* ─── BOUTON TERMINER ─── */}
      <button
        onClick={goBack}
        className="w-full py-3 rounded-xl bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
      >
        <CheckCircle2 className="w-5 h-5" />
        Terminer le chapitre 9
      </button>

      {/* ─── SOURCES ─── */}
      <p className="text-xs text-muted-foreground/60 text-center">
        Sources : AUSCGIE - Acte Uniforme OHADA relatif aux Sociétés Commerciales et GIE | AUPCAP révisé 2015, adopté à Grand-Bassam (Côte d'Ivoire) le 10 septembre 2015
      </p>
    </div>
  )
}
