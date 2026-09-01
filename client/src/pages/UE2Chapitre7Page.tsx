import { useState } from 'react'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import BackButton from '@/components/BackButton'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, BookOpen, ChevronRight,
  Scale, AlertTriangle, Info, CheckCircle,
  Star, FileText, ChevronDown, ChevronUp,
  UserX
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import { isStaffRole } from '@/lib/permissions'
import DevoirChapitreCreateur, { CasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
import QCMPageUnique from '@/components/QCMPageUnique'
import { QCMChapitre } from '@/lib/db'
import { InfoTooltip } from '@/components/InfoTooltip'

// ─── Types QCM ────────────────────────────────────────────────────────────────
type QCMOption = { id: string; texte: string }
type QCMQuestion = {
  type: 'qcm'; id: string; question: string
  options: QCMOption[]; reponseCorrecte: string
  explication: string; articleRef: string
}

// ─── Données QCM ──────────────────────────────────────────────────────────────
const qcmQuestions: QCMQuestion[] = [
  {
    type: 'qcm', id: 'ch7-q1',
    question: "Qui peut être nommé gérant d'une SARL selon l'AUSCGIE ?",
    options: [
      { id: 'a', texte: 'Uniquement un associé de la société' },
      { id: 'b', texte: 'Une personne physique, associée ou non' },
      { id: 'c', texte: 'Une personne morale ou physique' },
      { id: 'd', texte: 'Uniquement le fondateur majoritaire' },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 323 AUSCGIE dispose que la SARL est gérée par une ou plusieurs personnes physiques, associées ou non. Une personne morale ne peut pas être gérante.",
    articleRef: 'Art. 323 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch7-q2',
    question: "En l'absence de clause statutaire, quelle est la durée du mandat du gérant de SARL ?",
    options: [
      { id: 'a', texte: '2 ans renouvelables' },
      { id: 'b', texte: '3 ans renouvelables' },
      { id: 'c', texte: '4 ans renouvelables' },
      { id: 'd', texte: '6 ans renouvelables' },
    ],
    reponseCorrecte: 'c',
    explication: "L'Art. 324 AUSCGIE précise qu'en l'absence de dispositions statutaires, le ou les gérants sont nommés pour quatre (4) ans et sont rééligibles.",
    articleRef: 'Art. 324 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch7-q3',
    question: 'La nomination ou la cessation de fonctions du gérant doit être publiée :',
    options: [
      { id: 'a', texte: 'Au Journal officiel uniquement' },
      { id: 'b', texte: 'Au Registre du Commerce et du Crédit Mobilier (RCCM)' },
      { id: 'c', texte: "Dans un journal d'annonces légales" },
      { id: 'd', texte: "La publication n'est pas obligatoire" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 124 AUSCGIE impose la publication au RCCM de la désignation ou cessation des fonctions des dirigeants sociaux pour l'opposabilité aux tiers.",
    articleRef: 'Art. 124 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch7-q4',
    question: 'Dans les rapports avec les tiers, les clauses statutaires limitant les pouvoirs du gérant sont :',
    options: [
      { id: 'a', texte: 'Toujours opposables aux tiers' },
      { id: 'b', texte: 'Opposables aux tiers après publication au RCCM' },
      { id: 'c', texte: 'Inopposables aux tiers de bonne foi' },
      { id: 'd', texte: 'Opposables uniquement aux associés' },
    ],
    reponseCorrecte: 'c',
    explication: "L'Art. 329 AUSCGIE protège les tiers de bonne foi : les limitations statutaires des pouvoirs du gérant leur sont inopposables. La publication des statuts ne suffit pas à constituer la preuve que le tiers les connaissait (Art. 122).",
    articleRef: 'Art. 122, 329 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch7-q5',
    question: "Quelle majorité est requise pour révoquer le gérant d'une SARL ?",
    options: [
      { id: 'a', texte: 'Unanimité des associés' },
      { id: 'b', texte: 'Associés représentant plus de la moitié des parts sociales' },
      { id: 'c', texte: 'Majorité des deux tiers des parts' },
      { id: 'd', texte: 'Majorité simple des associés présents' },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 326 AUSCGIE exige une décision des associés représentant plus de la moitié des parts sociales. Toute délibération prise en violation de cette règle est nulle.",
    articleRef: 'Art. 326 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch7-q6',
    question: 'Si la révocation du gérant est prononcée sans juste motif, quelle est la conséquence ?',
    options: [
      { id: 'a', texte: 'La révocation est nulle' },
      { id: 'b', texte: 'La société doit verser des dommages et intérêts au gérant' },
      { id: 'c', texte: 'Le gérant garde ses fonctions' },
      { id: 'd', texte: 'Les associés sont responsables personnellement' },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 326 al. 2 AUSCGIE prévoit que si la révocation est décidée sans juste motif, elle peut donner lieu à dommages et intérêts au profit du gérant révoqué.",
    articleRef: 'Art. 326 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch7-q7',
    question: "Selon l'art. 338-1 AUSCGIE, la révocation du gérant peut-elle être décidée en dehors de l'ordre du jour ?",
    options: [
      { id: 'a', texte: "Non, elle doit absolument figurer à l'ordre du jour" },
      { id: 'b', texte: "Oui, l'assemblée peut toujours la décider même hors ordre du jour" },
      { id: 'c', texte: "Oui, mais seulement avec accord écrit de tous les associés" },
      { id: 'd', texte: "Non, sauf si le gérant est absent" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 338-1 AUSCGIE prévoit une exception expresse : l'assemblée peut décider la révocation du gérant et procéder à son remplacement même si ce point ne figure pas à l'ordre du jour.",
    articleRef: 'Art. 338-1 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch7-q8',
    question: 'Le gérant associé peut-il voter sur sa propre rémunération ?',
    options: [
      { id: 'a', texte: 'Oui, comme tout associé' },
      { id: 'b', texte: 'Oui, si les statuts le permettent' },
      { id: 'c', texte: 'Non, ses voix ne sont pas comptées et toute délibération contraire est nulle' },
      { id: 'd', texte: "Non, sauf s'il est le seul associé" },
    ],
    reponseCorrecte: 'c',
    explication: "L'Art. 325 al. 2 AUSCGIE dispose que le gérant associé ne prend pas part au vote relatif à sa rémunération et ses voix ne sont pas prises en compte. Toute délibération contraire est nulle.",
    articleRef: 'Art. 325 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch7-q9',
    question: "Quelles sont les 3 sources de responsabilité civile du gérant selon l'art. 330 AUSCGIE ?",
    options: [
      { id: 'a', texte: 'Fautes pénales, dettes fiscales, manquements contractuels' },
      { id: 'b', texte: 'Infractions législatives, violations des statuts, fautes de gestion' },
      { id: 'c', texte: "Absence aux assemblées, mauvaise comptabilité, conflits d'intérêts" },
      { id: 'd', texte: "Perte de capital, distribution de dividendes, dépassement d'objet social" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 330 AUSCGIE engage la responsabilité des gérants pour : (1) infractions législatives ou réglementaires, (2) violations des statuts, et (3) fautes commises dans leur gestion.",
    articleRef: 'Art. 330 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch7-q10',
    question: "Quel est le délai de prescription de l'action en responsabilité contre un gérant pour faute de gestion ordinaire ?",
    options: [
      { id: 'a', texte: '1 an' },
      { id: 'b', texte: '2 ans' },
      { id: 'c', texte: '3 ans' },
      { id: 'd', texte: '5 ans' },
    ],
    reponseCorrecte: 'c',
    explication: "L'Art. 332 AUSCGIE fixe le délai de prescription à 3 ans à compter du fait dommageable ou, s'il a été dissimulé, de sa révélation. Exception : 10 ans pour les crimes.",
    articleRef: 'Art. 332 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch7-q11',
    question: "L'action sociale ut singuli contre le gérant peut être intentée par :",
    options: [
      { id: 'a', texte: 'Tout associé individuellement' },
      { id: 'b', texte: 'Associés représentant au moins 1/4 des associés ET 1/4 des parts' },
      { id: 'c', texte: 'La moitié des associés seulement' },
      { id: 'd', texte: "L'assemblée générale uniquement" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 331 AUSCGIE dispose que les associés représentant le quart des associés ET le quart des parts sociales peuvent intenter l'action sociale en responsabilité contre le gérant.",
    articleRef: 'Art. 331 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch7-q12',
    question: 'Le dirigeant de fait est :',
    options: [
      { id: 'a', texte: 'Un associé majoritaire' },
      { id: 'b', texte: 'Une personne qui exerce réellement les pouvoirs de direction sans titre officiel' },
      { id: 'c', texte: "Un représentant légal mandaté par l'assemblée" },
      { id: 'd', texte: 'Un salarié à fonctions de direction' },
    ],
    reponseCorrecte: 'b',
    explication: "Le dirigeant de fait est celui qui, sans titre officiel, exerce en toute indépendance les pouvoirs de direction. La jurisprudence CCJA lui applique la même responsabilité qu'au dirigeant de droit (Art. 330 AUSCGIE).",
    articleRef: 'Art. 330 AUSCGIE - Jurisprudence CCJA',
  },
  {
    type: 'qcm', id: 'ch7-q13',
    question: "La société est-elle engagée par un acte du gérant dépassant l'objet social si le tiers ignorait ce dépassement ?",
    options: [
      { id: 'a', texte: "Non, jamais hors objet social" },
      { id: 'b', texte: "Oui, si le tiers était de bonne foi" },
      { id: 'c', texte: "Non, si les statuts ont été publiés au RCCM" },
      { id: 'd', texte: "Oui, uniquement si le CA a ratifié l'acte" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 329 AUSCGIE protège les tiers de bonne foi : la société est engagée même par les actes hors objet social, sauf si elle prouve que le tiers savait. La seule publication des statuts ne suffit pas.",
    articleRef: 'Art. 329 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch7-q14',
    question: "La révocation ad nutum (sans motif, sans indemnité) s'applique à :",
    options: [
      { id: 'a', texte: 'Gérants de SARL' },
      { id: 'b', texte: 'Administrateurs de SA' },
      { id: 'c', texte: 'Tous les dirigeants OHADA' },
      { id: 'd', texte: 'Présidents de SAS' },
    ],
    reponseCorrecte: 'b',
    explication: "La révocation ad nutum (à tout moment, sans motif, sans indemnité) s'applique aux administrateurs de SA. Les gérants de SARL bénéficient d'une protection : révocation sans juste motif = D&I.",
    articleRef: 'Art. 326 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch7-q15',
    question: 'La démission du gérant sans juste motif peut entraîner :',
    options: [
      { id: 'a', texte: 'La nullité de la démission' },
      { id: 'b', texte: 'Une action en réparation du préjudice par la société' },
      { id: 'c', texte: 'Une amende infligée par le tribunal' },
      { id: 'd', texte: 'La responsabilité pénale du gérant' },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 327 AUSCGIE prévoit que si la démission est faite sans juste motif, la société peut demander en justice réparation du préjudice qu'elle subit.",
    articleRef: 'Art. 327 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch7-q16',
    question: "L'abus de majorité selon l'art. 130 AUSCGIE est caractérisé par :",
    options: [
      { id: 'a', texte: 'Toute décision votée à plus de 75% du capital' },
      { id: 'b', texte: "Une décision dans le seul intérêt des majoritaires, contraire à l'intérêt des minoritaires et injustifiée par l'intérêt social" },
      { id: 'c', texte: 'Une décision prise sans quorum' },
      { id: 'd', texte: 'Un vote portant sur la rémunération des gérants' },
    ],
    reponseCorrecte: 'b',
    explication: "L'art. 130 AUSCGIE définit l'abus de majorité : décision dans le seul intérêt des majoritaires, contraire à l'intérêt des minoritaires et injustifiée par l'intérêt social. Conséquence : nullité de la délibération et responsabilité des majoritaires.",
    articleRef: 'Art. 130 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch7-q17',
    question: "En cas d'abus de minorité (art. 131), le tribunal peut :",
    options: [
      { id: 'a', texte: 'Exclure automatiquement les minoritaires' },
      { id: 'b', texte: "Désigner un mandataire ad hoc pour voter à leur place dans le sens de l'intérêt social" },
      { id: 'c', texte: 'Adopter la décision par la seule majorité simple' },
      { id: 'd', texte: 'Prononcer la dissolution de la société' },
    ],
    reponseCorrecte: 'b',
    explication: "L'art. 131 AUSCGIE permet au tribunal de désigner un mandataire ad hoc pour représenter à la prochaine assemblée les associés dont le comportement est jugé abusif et voter en leur nom dans le sens de l'intérêt social.",
    articleRef: 'Art. 131 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch7-q18',
    question: "Le bénéfice distribuable selon l'art. 143 AUSCGIE est :",
    options: [
      { id: 'a', texte: "Le résultat de l'exercice uniquement" },
      { id: 'b', texte: 'Résultat + report bénéficiaire, diminué des pertes antérieures, dividendes partiels et réserves obligatoires' },
      { id: 'c', texte: "Le chiffre d'affaires moins les charges" },
      { id: 'd', texte: "Le résultat diminué uniquement de l'IS" },
    ],
    reponseCorrecte: 'b',
    explication: "L'art. 143 al. 1 AUSCGIE : bénéfice distribuable = Résultat + report bénéficiaire - pertes antérieures - dividendes partiels - réserves. Tout dividende distribué en violation est fictif.",
    articleRef: 'Art. 143 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch7-q19',
    question: "Des associés représentant au moins 1/10 du capital peuvent demander :",
    options: [
      { id: 'a', texte: "La convocation d'une AGE" },
      { id: 'b', texte: "La désignation par le tribunal d'experts sur des opérations de gestion" },
      { id: 'c', texte: 'La dissolution judiciaire' },
      { id: 'd', texte: "La suspension du gérant en urgence" },
    ],
    reponseCorrecte: 'b',
    explication: "L'art. 159 AUSCGIE permet aux associés représentant >= 1/10 du capital de demander au tribunal la désignation d'experts sur des opérations de gestion. Honoraires à la charge de la société.",
    articleRef: 'Art. 159-160 AUSCGIE',
  },
  {
    type: 'qcm', id: 'ch7-q20',
    question: "Selon l'art. 175 AUSCGIE, une personne est présumée contrôler une société si :",
    options: [
      { id: 'a', texte: 'Elle détient plus de 25% du capital' },
      { id: 'b', texte: "Elle est membre du conseil d'administration" },
      { id: 'c', texte: 'Elle détient directement ou indirectement plus de la moitié des droits de vote, ou en dispose par accord' },
      { id: 'd', texte: 'Elle assure la présidence de la société' },
    ],
    reponseCorrecte: 'c',
    explication: "L'art. 175 AUSCGIE fixe deux cas de présomption : (1) détention directe/indirecte de plus de 1/2 des droits de vote ; (2) disposition de plus de 1/2 des droits de vote par accord avec d'autres associés.",
    articleRef: 'Art. 173-175 AUSCGIE',
  },
]

// ─── Leçons ───────────────────────────────────────────────────────────────────
const lecons = [
  { id: 'L1', titre: 'Notion et catégories de dirigeants sociaux' },
  { id: 'L2', titre: 'Nomination et durée des fonctions' },
  { id: 'L3', titre: 'Pouvoirs des dirigeants' },
  { id: 'L4', titre: 'Révocation et démission' },
  { id: 'L5', titre: 'Responsabilité des dirigeants' },
  { id: 'L6', titre: 'Abus de majorité, minorité et groupes de sociétés' },
  { id: 'L7', titre: 'Procédure d’alerte CAC et associés (Art. 150-158-1)' },
  { id: 'L8', titre: 'Expertise de gestion (Art. 159-160)' },
  { id: 'L9', titre: 'Administration provisoire (Art. 160-1 à 160-8)' },
]

// ─── Cas pratiques ────────────────────────────────────────────────────────────
const casPratiques = [
  {
    id: 'cp1',
    titre: 'CP1 : Révocation litigieuse',
    niveau: 'Fondamental',
    ref: 'Art. 326, 338-1 AUSCGIE',
    contexte: `L'AG de la SARL GOMA SERVICES réunit des associés représentant 60% du capital. Le point "Révocation du gérant M. Kamba" ne figurait pas à l'ordre du jour. L'assemblée vote quand même sa révocation (60% en faveur) sans lui reprocher de faute précise, puis nomme un remplaçant.`,
    questions: [
      "1. La révocation de M. Kamba est-elle juridiquement valide alors qu'elle n'était pas à l'ordre du jour ?",
      "2. M. Kamba peut-il obtenir des dommages et intérêts ?",
      "3. Dans quel cas la révocation peut-elle être prononcée par un tribunal ?"
    ],
    correction: `CORRECTION :

1. Oui. L'Art. 338-1 AUSCGIE prévoit une exception expresse : même si la révocation du gérant n'est pas inscrite à l'ordre du jour, l'assemblée peut toujours la décider et procéder à son remplacement. En l'espèce, les associés représentent 60% du capital, ce qui dépasse la majorité de plus de la moitié requise par l'Art. 326. La révocation est donc régulière.

2. Oui. L'Art. 326 al. 2 AUSCGIE prévoit que si la révocation est décidée sans juste motif, elle peut donner lieu à dommages et intérêts au profit du gérant révoqué. La révocation est un droit absolu des associés mais son exercice abusif peut être sanctionné financièrement. M. Kamba devra saisir la juridiction compétente et prouver l'absence de juste motif et le préjudice subi.

3. L'Art. 326 al. 3 AUSCGIE permet à tout associé de demander la révocation du gérant auprès de la juridiction compétente dans le ressort du siège social, pour juste motif. Contrairement à la révocation par l'AG (qui peut être sans motif avec D&I), la révocation judiciaire exige impérativement un juste motif (faute de gestion grave, conflit d'intérêts, inactivité). Tout associé, même minoritaire, peut en faire la demande.`
  },
  {
    id: 'cp2',
    titre: 'CP2 : Dépassement de pouvoirs',
    niveau: 'Intermédiaire',
    ref: 'Art. 122, 329 AUSCGIE',
    contexte: `Les statuts de la SARL KIVU IMPORT limitent les pouvoirs du gérant à 100 000 USD par engagement. Le gérant signe un contrat de 250 000 USD sans autorisation préalable. Le fournisseur étranger ignorait cette limitation. Les statuts sont déposés au RCCM.`,
    questions: [
      "1. La SARL est-elle engagée par ce contrat ?",
      "2. Que peuvent faire les associés contre le gérant ?"
    ],
    correction: `CORRECTION :

1. Oui. L'Art. 329 AUSCGIE protège les tiers de bonne foi : dans les rapports avec les tiers, le gérant a les pouvoirs les plus étendus. La société est engagée même par les actes dépassant les limitations statutaires, à moins qu'elle prouve que le tiers savait. Or, l'Art. 122 dispose que la seule publication des statuts au RCCM ne suffit pas à prouver la connaissance du tiers. La SARL reste donc engagée.

2. Si la société subit un préjudice, les associés disposent de deux actions : (1) Action individuelle (Art. 330 AUSCGIE) : tout associé peut agir en réparation du préjudice personnellement subi. (2) Action sociale ut singuli (Art. 331 AUSCGIE) : les associés représentant au moins 1/4 des associés ET 1/4 des parts peuvent agir contre le gérant pour violation des statuts. Le gérant engage sa responsabilité civile. La prescription est de 3 ans (Art. 332).`
  },
  {
    id: 'cp3',
    titre: 'CP3 : Rémunération contestée',
    niveau: 'Intermédiaire',
    ref: 'Art. 325 AUSCGIE',
    contexte: `M. Diallo est gérant et associé de la SARL BUKAVU TECH (40% du capital). Une AG réunit 55% du capital et vote la rémunération de M. Diallo. M. Diallo a participé au vote avec ses 40%. Sans ses voix, la résolution n'aurait obtenu que 15%.`,
    questions: [
      "1. La délibération est-elle valide ?",
      "2. Comment régulariser ?"
    ],
    correction: `CORRECTION :

1. Non. L'Art. 325 al. 2 AUSCGIE dispose expressément : "Le gérant, lorsqu'il est associé, ne prend pas part au vote de la délibération relative à sa rémunération et ses voix ne sont pas prises en compte pour le calcul de la majorité. Toute délibération prise en violation du présent alinéa est nulle." Sans les voix de M. Diallo (40%), la résolution n'obtient que 15%, bien en deçà de la majorité requise. La délibération est nulle de plein droit.

2. Une nouvelle AG doit être convoquée pour voter la rémunération de M. Diallo sans que celui-ci ne participe au vote ni au calcul de la majorité. Tout associé ayant un intérêt peut saisir la juridiction compétente pour demander l'annulation. La nullité étant expressément prévue par l'Art. 325, c'est une nullité textuelle. Les sommes versées sur la base de cette délibération nulle pourraient faire l'objet d'une action en répétition de l'indu.`
  },
  {
    id: 'cp4',
    titre: 'CP4 : Dirigeant de fait en liquidation',
    niveau: 'Avancé',
    ref: 'Art. 330 AUSCGIE - Jurisprudence CCJA',
    contexte: `M. Kabila n'est pas gérant officiel de la SARL MANIEMA TRADE, mais depuis 2 ans il signe tous les contrats, dirige le personnel, négocie avec les banques et prend toutes les décisions stratégiques. La société est en liquidation avec un passif important.`,
    questions: [
      "1. M. Kabila peut-il être qualifié de dirigeant de fait ?",
      "2. Quelles sont les conséquences en liquidation ?"
    ],
    correction: `CORRECTION :

1. Oui. Le dirigeant de fait est celui qui, sans titre officiel, exerce en toute indépendance les pouvoirs de direction normalement dévolus aux dirigeants de droit. Les critères jurisprudentiels sont réunis : signature de contrats, direction du personnel, négociation bancaire, décisions stratégiques, exercice en pleine indépendance. La jurisprudence CCJA est constante sur cette qualification.

2. La jurisprudence CCJA applique au dirigeant de fait le même régime de responsabilité qu'au dirigeant de droit (Art. 330 AUSCGIE). Dans le cadre de la liquidation avec insuffisance d'actif, M. Kabila peut être condamné à combler le passif insuffisant (action en comblement du passif) si ses fautes de gestion ont contribué à l'insuffisance d'actif. Les trois conditions doivent être réunies : (1) faute de gestion avérée, (2) insuffisance d'actif à la liquidation, (3) lien de causalité entre la faute et l'insuffisance.`
  },
]

// ─── CasPratiqueBlock ─────────────────────────────────────────────────────────
/* ── COMPOSANT QCM COMPRÉHENSION ── */
function QCMBlock({ q }: { q: QCMQuestion }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/30 p-4 space-y-3">
      <p className="text-xs font-semibold text-amber-700">{q.question}</p>
      <div className="space-y-1.5">
        {q.options.map(opt => {
          let cls = 'w-full text-left text-xs px-3 py-2 rounded-lg border transition-colors '
          if (!showResult) cls += selected === opt.id ? 'border-amber-500 bg-amber-100 text-amber-800' : 'border-border hover:border-amber-300 hover:bg-muted/40'
          else if (opt.id === q.reponseCorrecte) cls += 'border-green-500 bg-green-50 text-green-700'
          else if (opt.id === selected) cls += 'border-red-400 bg-red-50 text-red-600'
          else cls += 'border-border opacity-50'
          return <button key={opt.id} className={cls} onClick={() => { if (!showResult) setSelected(opt.id) }} disabled={showResult}><span className="font-bold mr-1.5">{opt.id.toUpperCase()}.</span>{opt.texte}</button>
        })}
      </div>
      {!showResult && <button onClick={() => { if (selected) setShowResult(true) }} disabled={!selected} className="text-xs bg-amber-600 text-white rounded-lg px-4 py-1.5 disabled:opacity-40 hover:bg-amber-700 transition-colors font-semibold">Vérifier</button>}
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

function CasPratiqueBlock({ cp, isProf }: { cp: typeof casPratiques[0]; isProf: boolean }) {
  const [open, setOpen] = useState(false)
  const [showCorrection, setShowCorrection] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full">{cp.niveau}</span>
          <span className="font-semibold text-gray-800">{cp.titre}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />}
      </button>
      {open && (
        <div className="p-4 space-y-4 border-t border-gray-100">
          <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-full">{cp.ref}</span>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
            <p className="font-semibold mb-1 flex items-center gap-2"><FileText className="w-4 h-4" /> Contexte</p>
            <p className="leading-relaxed">{cp.contexte}</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-gray-700 text-sm flex items-center gap-2"><ChevronRight className="w-4 h-4 text-amber-600" /> Questions</p>
            {cp.questions.map((q, i) => (
              <div key={i} className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-2 text-sm text-amber-900">{q}</div>
            ))}
          </div>
          {isProf ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-gray-800 whitespace-pre-line">
              <p className="font-semibold text-emerald-800 mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Correction (mode professeur)</p>
              {cp.correction}
            </div>
          ) : (
            <div>
              <button
                onClick={() => setShowCorrection(!showCorrection)}
                className="flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg px-4 py-2 transition-colors"
              >
                {showCorrection ? <><ChevronUp className="w-4 h-4" /> Masquer la correction</> : <><ChevronDown className="w-4 h-4" /> Voir la correction</>}
              </button>
              {showCorrection && (
                <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-gray-800 whitespace-pre-line">{cp.correction}</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function UE2Chapitre7Page() {
  const goBack = useGoBack('/ue2-droit-societes')
  const user = useUser()
  const isProf = isStaffRole(user)

  const [activeTab, setActiveTab] = useState<'lecons' | 'qcm' | 'cas' | 'devoir'>('lecons')
  const [activeLecon, setActiveLecon] = useState(0)

  // États QCM



  return (
    <div className="space-y-4 pb-10 animate-fadeIn">

      {/* ── Header ── */}
      <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 2 - Droit des sociétés', route: '/ue2-droit-societes' },
            { label: 'Chapitre 7' },
          ]}
          color="indigo"
        />
        <BackButton />
        <h1 className="text-xl font-display font-bold text-foreground mt-0.5">Les Dirigeants Sociaux</h1>
        <p className="text-sm text-muted-foreground">AUSCGIE - Articles 121 à 338 - Pouvoirs, Responsabilité et Révocation</p>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Leçons', value: '9', icon: BookOpen, color: 'text-amber-600' },
          { label: 'QCM', value: '20', icon: CheckCircle2, color: 'text-amber-600' },
          { label: 'Cas pratiques', value: '4', icon: FileText, color: 'text-amber-600' },
          { label: 'Durée', value: '3h', icon: Star, color: 'text-amber-600' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card border border-border rounded-xl p-3 text-center">
            <Icon className={cn('w-5 h-5 mx-auto mb-1', color)} />
            <div className="text-lg font-bold">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      {/* ── Objectifs ── */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Objectifs du chapitre
        </h3>
        <ul className="space-y-1 text-sm text-amber-700">
          {[
            'Distinguer dirigeant de droit et dirigeant de fait (Art. 121)',
            'Maîtriser les conditions de nomination, durée et rémunération du gérant (Art. 323-325)',
            'Analyser les pouvoirs du gérant dans les rapports internes et avec les tiers (Art. 328-329)',
            'Comprendre les règles de révocation et de démission (Art. 326-327, 338-1)',
            'Identifier les 3 sources de responsabilité civile et les délais de prescription (Art. 330-332)',
            'Maîtriser l\'abus de majorité, de minorité et le contrôle des groupes (Art. 130-131, 175)',
          ].map((obj, i) => (
            <li key={i} className="flex items-start gap-2">
              <ChevronRight className="w-3 h-3 mt-1 flex-shrink-0" />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Onglets ── */}
      <div className="bg-muted p-1 rounded-xl flex gap-1">
        {(isProf
          ? [{ key: 'lecons', label: 'Leçons' }, { key: 'qcm', label: 'QCM' }, { key: 'cas', label: 'Cas pratiques' }, { key: 'devoir', label: 'Devoir' }]
          : [{ key: 'lecons', label: 'Leçons' }, { key: 'devoir', label: 'Devoir' }]
        ).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as typeof activeTab)}
            className={cn(
              'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors',
              activeTab === key ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════ LEÇONS ══════════════════════════ */}
      {activeTab === 'lecons' && (
        <div className="space-y-4">
          {/* Sélecteur */}
          <div className="flex flex-wrap gap-2">
            {lecons.map((l, i) => (
              <button
                key={l.id}
                onClick={() => setActiveLecon(i)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  activeLecon === i ? 'bg-amber-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {l.id}
              </button>
            ))}
          </div>

          {/* Titre */}
          <div className="border-l-4 border-amber-500 bg-card rounded-r-xl p-4">
            <h2 className="font-display font-bold text-foreground">{lecons[activeLecon].id} - {lecons[activeLecon].titre}</h2>
          </div>

          {/* ── L1 ── */}
          {activeLecon === 0 && (
            <div className="bg-card border border-border rounded-xl p-4 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900 flex gap-2">
                <Scale className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                <div><strong>Art. 121 AUSCGIE :</strong> Le dirigeant social est toute personne physique investie du pouvoir de gérer, diriger et représenter une société commerciale. Il agit au nom et pour le compte de la société.</div>
              </div>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Dirigeants de droit vs dirigeants de fait
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm">
                  <p className="font-semibold text-emerald-800 mb-1">Dirigeant de droit</p>
                  <p className="text-emerald-700">Personne régulièrement désignée par les organes compétents de la société, dont le mandat est publié au RCCM. Pouvoir formel et officiel.</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm">
                  <p className="font-semibold text-orange-800 mb-1 flex items-center gap-1">
                    Dirigeant de fait <InfoTooltip texte="Personne qui, sans titre officiel, exerce en toute indépendance les pouvoirs de direction normalement réservés aux dirigeants de droit. La jurisprudence CCJA lui applique la même responsabilité qu'au dirigeant de droit." loi="Art. 330 AUSCGIE" />
                  </p>
                  <p className="text-orange-700">Critères : signature de contrats, direction du personnel, négociation bancaire, décisions stratégiques. Responsabilité identique au dirigeant de droit.</p>
                </div>
              </div>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Organes de direction par forme sociale
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-amber-50">
                      <th className="border border-amber-200 p-2 text-left text-amber-900">Forme sociale</th>
                      <th className="border border-amber-200 p-2 text-left text-amber-900">Organe de direction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['SARL', 'Gérant(s) - personne physique uniquement'],
                      ['SA avec Conseil d\'Administration', 'Administrateurs + Président-Directeur Général (PDG)'],
                      ['SA avec Administrateur Général', 'Administrateur Général (AG)'],
                      ['SAS', 'Président (statuts libres)'],
                      ['GIE', 'Administrateur désigné par le contrat'],
                    ].map(([forme, organe], i) => (
                      <tr key={i} className={i % 2 === 1 ? 'bg-muted/30' : ''}>
                        <td className="border border-border p-2 font-medium text-foreground">{forme}</td>
                        <td className="border border-border p-2 text-muted-foreground">{organe}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-900 flex gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div><strong>Publicité obligatoire - Art. 124 AUSCGIE :</strong> La nomination et la cessation des fonctions de tout dirigeant doivent être publiées au RCCM. Sans publication : inopposable aux tiers. Cette règle protège la sécurité juridique des transactions.</div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-900 flex gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div><strong>Actualité 2024-2025 :</strong> La digitalisation du RCCM est en cours dans plusieurs pays OHADA. Le dépôt des actes de nomination et de modification est progressivement possible en ligne, réduisant les délais de publication.</div>
              </div>
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                {[qcmQuestions[0], qcmQuestions[11]].map((q, i) => <QCMBlock key={i} q={q} />)}
              </div>
            </div>
          )}

          {/* ── L2 ── */}
          {activeLecon === 1 && (
            <div className="bg-card border border-border rounded-xl p-4 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900 flex gap-2">
                <Scale className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                <div><strong>Art. 323 AUSCGIE :</strong> La SARL est gérée par une ou plusieurs personnes physiques, associées ou non. Une personne morale ne peut pas être gérante de SARL.</div>
              </div>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Qui nomme le gérant ?
              </h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 mt-1 text-amber-500 flex-shrink-0" />Désignation dans les statuts lors de la constitution</li>
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 mt-1 text-amber-500 flex-shrink-0" />Acte postérieur : décision des associés à la majorité de plus de la moitié du capital social</li>
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 mt-1 text-amber-500 flex-shrink-0" />Pluralité possible : plusieurs gérants avec pouvoirs distincts ou identiques</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-900 flex gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div><strong>Art. 324 AUSCGIE :</strong> En l'absence de clause statutaire, le gérant est nommé pour 4 ans renouvelables. Les statuts peuvent prévoir une durée différente. Le gérant est rééligible sans limite de mandats.</div>
              </div>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Rémunération - Art. 325 <InfoTooltip texte="Règle anti-conflit d'intérêts : le gérant associé ne peut pas voter sur sa propre rémunération. Sa participation fausserait le vote. Toute délibération contraire est nulle de plein droit." loi="Art. 325 al. 2 AUSCGIE" />
              </h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 mt-1 text-amber-500 flex-shrink-0" />La rémunération est fixée par décision des associés</li>
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 mt-1 text-amber-500 flex-shrink-0" />Elle peut être prévue dans les statuts ou par acte séparé</li>
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 mt-1 text-amber-500 flex-shrink-0" />Cumul possible : rémunération de gérant + salaire si contrat de travail distinct antérieur</li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900 flex gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div><strong>Art. 325 al. 2 AUSCGIE :</strong> Le gérant associé ne prend pas part au vote de la délibération relative à sa rémunération et ses voix ne sont pas prises en compte pour le calcul de la majorité. Toute délibération contraire est nulle de plein droit.</div>
              </div>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Conditions d'éligibilité
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { ok: true, label: 'Personne physique uniquement' },
                  { ok: true, label: 'Capacité juridique pleine' },
                  { ok: true, label: 'Associé ou non-associé' },
                  { ok: false, label: 'Personne morale interdite' },
                  { ok: false, label: 'Interdiction de gérer (condamnation)' },
                  { ok: false, label: 'Incompatibilité professionnelle' },
                ].map((item, i) => (
                  <div key={i} className={cn('flex items-center gap-2 text-xs p-2 rounded-lg', item.ok ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800')}>
                    {item.ok ? <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" /> : <UserX className="w-3.5 h-3.5 flex-shrink-0" />}
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                {[qcmQuestions[1], qcmQuestions[2]].map((q, i) => <QCMBlock key={i} q={q} />)}
              </div>
            </div>
          )}

          {/* ── L3 ── */}
          {activeLecon === 2 && (
            <div className="bg-card border border-border rounded-xl p-4 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900 flex gap-2">
                <Scale className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                <div><strong>Art. 328 AUSCGIE :</strong> Le gérant peut faire tous les actes de gestion dans l'intérêt de la société. En cas de pluralité de gérants, chacun a les mêmes pouvoirs séparément mais peut s'opposer à un acte de l'autre avant sa conclusion. Cette opposition est inopposable aux tiers.</div>
              </div>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Pouvoirs dans les rapports avec les tiers - Art. 329
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dans les rapports avec les tiers, le gérant a les pouvoirs les plus étendus pour agir en toutes circonstances au nom de la société. Même les actes dépassant l'objet social <InfoTooltip texte="Principe ultra vires : acte dépassant l'objet social. En droit OHADA, la société reste engagée envers les tiers de bonne foi même pour les actes ultra vires, sauf preuve que le tiers savait." loi="Art. 329 AUSCGIE" /> engagent la société si le tiers était de bonne foi.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900 flex gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div><strong>Art. 122 in fine AUSCGIE :</strong> La seule publication des statuts au RCCM ne suffit pas à prouver que le tiers connaissait la limitation ou le dépassement de l'objet social. La société doit apporter une preuve positive de cette connaissance.</div>
              </div>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Engagement de la société - tableau récapitulatif
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-amber-50">
                      <th className="border border-amber-200 p-2 text-left text-amber-900">Situation</th>
                      <th className="border border-amber-200 p-2 text-center text-amber-900">Société engagée ?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Acte dans l'objet social", true],
                      ["Acte hors objet social, tiers de bonne foi", true],
                      ["Acte hors objet social, tiers savait", false],
                      ["Limitation statutaire, tiers de bonne foi", true],
                      ["Limitation statutaire, tiers informé (preuve positive)", false],
                    ].map(([situation, engaged], i) => (
                      <tr key={i} className={i % 2 === 1 ? 'bg-muted/30' : ''}>
                        <td className="border border-border p-2 text-muted-foreground">{situation as string}</td>
                        <td className={cn('border border-border p-2 text-center font-bold', engaged ? 'text-emerald-700' : 'text-red-600')}>{engaged ? 'Oui' : 'Non'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-900 flex gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div><strong>Limitations statutaires - Art. 123 AUSCGIE :</strong> Dans les rapports entre associés uniquement, les statuts peuvent limiter les pouvoirs du gérant (ex : seuil d'engagement nécessitant une autorisation préalable). Ces limitations sont inopposables aux tiers de bonne foi (Art. 122-123).</div>
              </div>
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                {[qcmQuestions[3], qcmQuestions[12]].map((q, i) => <QCMBlock key={i} q={q} />)}
              </div>
            </div>
          )}

          {/* ── L4 ── */}
          {activeLecon === 3 && (
            <div className="bg-card border border-border rounded-xl p-4 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900 flex gap-2">
                <Scale className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                <div><strong>Art. 326 AUSCGIE :</strong> Le gérant peut être révoqué par les associés représentant plus de la moitié des parts sociales.</div>
              </div>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Révocation par les associés
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 mt-1 text-amber-500 flex-shrink-0" /><span><strong className="text-foreground">Majorité requise :</strong> associés représentant plus de 1/2 des parts sociales</span></li>
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 mt-1 text-amber-500 flex-shrink-0" /><span><strong className="text-foreground">Art. 338-1</strong> <InfoTooltip texte="Exception importante : l'assemblée peut révoquer le gérant même si ce point ne figurait pas à l'ordre du jour. Ce droit ne peut être limité par les statuts." loi="Art. 338-1 AUSCGIE" /> : révocation possible même hors ordre du jour, droit absolu non limitable par les statuts</span></li>
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 mt-1 text-amber-500 flex-shrink-0" /><span><strong className="text-foreground">Sans juste motif :</strong> dommages et intérêts (D&I) dus au gérant révoqué</span></li>
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 mt-1 text-amber-500 flex-shrink-0" /><span><strong className="text-foreground">Avec juste motif</strong> (faute grave, conflit d'intérêts, inactivité) : aucun D&I</span></li>
              </ul>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Révocation judiciaire - Art. 326 al. 3
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tout associé peut saisir la juridiction compétente dans le ressort du siège social. Un juste motif est obligatoire (faute de gestion, conflit d'intérêts, inactivité). Outil privilégié pour les associés minoritaires qui ne peuvent pas atteindre la majorité requise en assemblée.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900 flex gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div><strong>Révocation ad nutum</strong> <InfoTooltip texte="Révocation à tout moment, sans motif, sans préavis, sans indemnité. Droit absolu du conseil d'administration ou de l'AG. NE S'APPLIQUE PAS aux gérants de SARL - uniquement aux administrateurs de SA." loi="Art. 432 AUSCGIE" /> : réservée aux SA uniquement (administrateurs). Les gérants de SARL sont protégés : révocation sans juste motif ouvre droit à D&I.</div>
              </div>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Démission - Art. 327
              </h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 mt-1 text-amber-500 flex-shrink-0" />Liberté de démissionner à tout moment</li>
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 mt-1 text-amber-500 flex-shrink-0" /><span>Démission intempestive <InfoTooltip texte="Démission sans juste motif causant un préjudice à la société (ex : abandon en plein projet stratégique, sans préavis). La société peut demander réparation en justice pour le préjudice subi." loi="Art. 327 AUSCGIE" /> : démission sans juste motif causant un préjudice à la société</span></li>
                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 mt-1 text-amber-500 flex-shrink-0" />Sans juste motif : la société peut demander réparation en justice</li>
              </ul>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Tableau comparatif : Révocation vs Démission
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-amber-50">
                      <th className="border border-amber-200 p-2 text-left text-amber-900">Aspect</th>
                      <th className="border border-amber-200 p-2 text-amber-900">Révocation</th>
                      <th className="border border-amber-200 p-2 text-amber-900">Démission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Initiateur', 'Associés ou tribunal', 'Gérant lui-même'],
                      ['Majorité requise', '> 1/2 des parts (AG)', 'Libre décision'],
                      ['Sans juste motif', 'D&I au gérant', 'D&I à la société possible'],
                      ['Avec juste motif', 'Aucun D&I', 'Aucun D&I'],
                      ['Ordre du jour', 'Non obligatoire (Art. 338-1)', 'Non applicable'],
                    ].map(([aspect, rev, dem], i) => (
                      <tr key={i} className={i % 2 === 1 ? 'bg-muted/30' : ''}>
                        <td className="border border-border p-2 font-medium text-foreground">{aspect}</td>
                        <td className="border border-border p-2 text-muted-foreground">{rev}</td>
                        <td className="border border-border p-2 text-muted-foreground">{dem}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                {[qcmQuestions[4], qcmQuestions[5], qcmQuestions[6]].map((q, i) => <QCMBlock key={i} q={q} />)}
              </div>
            </div>
          )}

          {/* ── L5 ── */}
          {activeLecon === 4 && (
            <div className="bg-card border border-border rounded-xl p-4 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900 flex gap-2">
                <Scale className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                <div><strong>Art. 330 AUSCGIE :</strong> Les dirigeants sont responsables envers la société et les tiers des fautes commises dans l'exercice de leurs fonctions. Cette responsabilité peut être civile et/ou pénale.</div>
              </div>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> 3 sources de responsabilité civile - Art. 330
              </h3>
              <div className="space-y-2">
                {[
                  { n: '1', titre: 'Infractions législatives ou réglementaires', desc: 'Non-respect des dispositions légales applicables aux sociétés (ex : absence de convocation, non-dépôt des comptes)' },
                  { n: '2', titre: 'Violations des statuts', desc: 'Dépassement des pouvoirs, convocation irrégulière, non-respect des clauses d\'agrément' },
                  { n: '3', titre: 'Fautes commises dans la gestion', desc: 'Toute décision ou omission écartant le comportement du dirigeant raisonnable et causant un préjudice', tooltip: true },
                ].map(item => (
                  <div key={item.n} className="flex items-start gap-3 bg-amber-50 rounded-lg p-3">
                    <span className="bg-amber-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">{item.n}</span>
                    <div>
                      <p className="font-semibold text-amber-900 text-sm flex items-center gap-1">
                        {item.titre}
                        {item.tooltip && <InfoTooltip texte="Faute de gestion : toute décision ou omission qui s'écarte du comportement d'un dirigeant raisonnable, causant un préjudice à la société ou aux tiers. Exemples : engagements inconsidérés, tenue irrégulière de la comptabilité, négligence grave, distribution de dividendes fictifs." loi="Art. 330 AUSCGIE" />}
                      </p>
                      <p className="text-amber-800 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Dirigeant de fait <InfoTooltip texte="Le dirigeant de fait - sans titre officiel mais exerçant réellement les pouvoirs - est soumis au même régime de responsabilité que le dirigeant de droit. La jurisprudence CCJA est constante sur ce point." loi="Art. 330 AUSCGIE : Jurisprudence CCJA" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Le dirigeant de fait encourt la même responsabilité civile et pénale que le dirigeant de droit, dès lors qu'il exerce en toute indépendance les fonctions de direction. La jurisprudence de la CCJA est constante sur ce point.</p>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Actions en responsabilité - Art. 331
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                  <p className="font-semibold text-blue-800 mb-1">Action individuelle</p>
                  <p className="text-blue-700 text-xs">Tout associé lésé peut agir en réparation du préjudice personnel subi. Les D&I lui reviennent directement.</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-sm">
                  <p className="font-semibold text-purple-800 mb-1 flex items-center gap-1">Action sociale ut singuli <InfoTooltip texte="Action exercée par des associés AU NOM de la société contre le gérant fautif. Les D&I obtenus reviennent à la société, pas aux associés demandeurs. Condition : représenter au moins 1/4 des associés ET 1/4 des parts sociales." loi="Art. 331 AUSCGIE" /></p>
                  <p className="text-purple-700 text-xs">Action au nom de la société par des associés représentant 1/4 des associés ET 1/4 des parts. D&I à la société.</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900 flex gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div><strong>Principe fondamental :</strong> Aucune décision d'assemblée générale ne peut éteindre l'action en responsabilité contre le gérant. La quittance accordée par l'AG est sans effet sur les droits des associés individuels.</div>
              </div>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Prescription des actions - Art. 332
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-amber-50">
                      <th className="border border-amber-200 p-2 text-left text-amber-900">Nature du fait</th>
                      <th className="border border-amber-200 p-2 text-amber-900">Délai</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Faute civile ordinaire', '3 ans à compter du fait dommageable'],
                      ['Fait dissimulé', '3 ans à compter de la révélation'],
                      ['Fait qualifié de crime', '10 ans'],
                    ].map(([nature, delai], i) => (
                      <tr key={i} className={i % 2 === 1 ? 'bg-muted/30' : ''}>
                        <td className="border border-border p-2 text-muted-foreground">{nature}</td>
                        <td className={cn('border border-border p-2 text-center font-medium', i === 2 ? 'text-red-600' : 'text-foreground')}>{delai}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Action en comblement du passif
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['Liquidation judiciaire', "Insuffisance d'actif", 'Faute de gestion', 'Lien de causalité'].map((cond, i) => (
                  <div key={i} className="bg-red-50 border border-red-200 rounded-lg p-2 text-center">
                    <span className="text-red-800 text-xs font-medium">{cond}</span>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900 flex gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div><strong>Responsabilité pénale :</strong> Les dirigeants peuvent engager leur responsabilité pénale notamment pour : faux bilan, distribution de dividendes fictifs, abus de biens sociaux (ABS), infractions comptables, banqueroute frauduleuse.</div>
              </div>
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                {[qcmQuestions[8], qcmQuestions[9]].map((q, i) => <QCMBlock key={i} q={q} />)}
              </div>
            </div>
          )}

          {/* ── L6 ── */}
          {activeLecon === 5 && (
            <div className="bg-card border border-border rounded-xl p-4 space-y-4">
              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Abus de majorité - Art. 130 <InfoTooltip texte="L'abus de majorité est une décision prise dans le seul intérêt des associés majoritaires, contraire à l'intérêt social et/ou aux droits des minoritaires, sans justification valable pour la société." loi="Art. 130 AUSCGIE" />
              </h3>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900">
                <p className="font-medium mb-2">Conditions de caractérisation (3 critères cumulatifs) :</p>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2"><span className="font-bold">1.</span>Décision prise dans le seul intérêt des majoritaires</li>
                  <li className="flex items-start gap-2"><span className="font-bold">2.</span>Contraire à l'intérêt des minoritaires</li>
                  <li className="flex items-start gap-2"><span className="font-bold">3.</span>Injustifiée par l'intérêt social de la société</li>
                </ul>
              </div>
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Conséquences :</strong> nullité de la délibération litigieuse + responsabilité civile des associés majoritaires vis-à-vis des minoritaires lésés.</p>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Abus de minorité et d'égalité - Art. 131
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Blocage abusif d'une décision indispensable à la survie ou au développement de la société, dans un but contraire à l'intérêt social. Ex : blocage de l'augmentation de capital nécessaire pour éviter la cessation de paiements.
              </p>
              <p className="text-sm text-muted-foreground">
                Sanction : le tribunal peut désigner un mandataire ad hoc <InfoTooltip texte="Le mandataire ad hoc est un représentant désigné par le tribunal pour exercer les droits de vote des associés bloquants, dans le seul sens de l'intérêt social, lors de la prochaine assemblée." loi="Art. 131 AUSCGIE" /> pour voter à la place des associés bloquants dans le sens de l'intérêt social.
              </p>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Expert de gestion - Art. 159-160
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {[
                  { titre: 'Condition', desc: 'Associés représentant >= 1/10 du capital' },
                  { titre: 'Droit', desc: "Désignation d'experts sur opérations de gestion" },
                  { titre: 'Honoraires', desc: 'À la charge de la société' },
                ].map((item, i) => (
                  <div key={i} className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-center">
                    <p className="text-blue-800 text-xs font-semibold">{item.titre}</p>
                    <p className="text-blue-700 text-xs mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Bénéfice distribuable - Art. 143
              </h3>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm font-mono text-emerald-800">
                Bénéfice distribuable = Résultat net + Report bénéficiaire antérieur - Pertes antérieures - Dividendes partiels versés - Réserves obligatoires
              </div>
              <p className="text-sm text-muted-foreground">Tout dividende distribué en violation de cette règle constitue un <strong className="text-foreground">dividende fictif</strong>, engageant la responsabilité pénale des dirigeants.</p>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Groupes de sociétés - Art. 173-175
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Présomption de contrôle (Art. 175) :</strong> une personne est présumée contrôler une société si elle détient directement ou indirectement plus de la moitié des droits de vote, OU si elle dispose de plus de la moitié des droits de vote par accord avec d'autres associés.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-900 flex gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>La notion de groupe implique un contrôle de fait ou de droit d'une société (société mère) sur une ou plusieurs autres (filiales). L'AUSCGIE organise la protection des sociétés filiales et de leurs associés minoritaires contre les abus de la mère.</div>
              </div>

              {/* Synthèse */}
              <h3 className="font-semibold text-amber-700 flex items-center gap-2 mt-2">
                <Star className="w-4 h-4" /> Points essentiels à retenir
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { titre: 'Art. 121 - Définition', contenu: 'Le dirigeant social est toute personne physique investie du pouvoir de gérer, diriger et représenter la société.' },
                  { titre: 'Art. 323-324 - SARL', contenu: 'Gérant = personne physique uniquement. Durée : 4 ans par défaut, renouvelable sans limite.' },
                  { titre: 'Art. 326-327 - Révocation/Démission', contenu: 'Les deux sont libres mais sans juste motif = D&I. Art. 338-1 : révocation possible même hors ordre du jour.' },
                  { titre: 'Art. 329 - Pouvoirs vs tiers', contenu: 'Pouvoirs les plus étendus. Société engagée même hors objet social si tiers de bonne foi. Publication des statuts seule insuffisante.' },
                  { titre: 'Art. 330-332 - Responsabilité', contenu: '3 sources civiles. Prescription 3 ans (10 ans si crime). Dirigeant de fait = même responsabilité.' },
                  { titre: 'Art. 130-131 - Abus', contenu: 'Abus de majorité = nullité + responsabilité. Abus de minorité = mandataire ad hoc désigné par le tribunal.' },
                ].map((item, i) => (
                  <div key={i} className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="font-semibold text-amber-800 text-xs mb-1">{item.titre}</p>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item.contenu}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                {[qcmQuestions[15], qcmQuestions[16]].map((q, i) => <QCMBlock key={i} q={q} />)}
              </div>
            </div>
          )}

          {/* ── L7 : PROCÉDURE D'ALERTE ── */}
          {activeLecon === 6 && (
            <div className="bg-card border border-border rounded-xl p-4 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                La <strong className="text-foreground">procédure d'alerte</strong> est un mécanisme préventif organisé par les Art. 150 à 158-1 de l'AUSCGIE. Elle permet au Commissaire aux comptes ou aux associés d'<strong className="text-foreground">attirer l'attention des dirigeants sur tout fait de nature à compromettre la continuité de l'exploitation</strong>, avant que la situation ne devienne irrémédiable.
              </p>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Alerte par le Commissaire aux comptes (Art. 150-154)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead><tr className="bg-amber-600 text-white">
                    <th className="border border-amber-700 p-2 text-left">Phase</th>
                    <th className="border border-amber-700 p-2 text-left">Action du CAC</th>
                    <th className="border border-amber-700 p-2 text-left">Délai de réponse</th>
                    <th className="border border-amber-700 p-2 text-left">Article</th>
                  </tr></thead>
                  <tbody>
                    {[
                      ["1e alerte", "Le CAC démande des explications aux dirigeants sur les faits alarmants constatés", "15 jours", "Art. 150"],
                      ["2e alerte", "Si réponse insuffisante ou absence de réponse, le CAC invite les dirigeants à réunir les actionnaires", "Non fixé", "Art. 151"],
                      ["3e alerte", "Si l'assemblée ne se prononce pas ou si les mesures sont insuffisantes, le CAC établit un rapport spécial", "Immédiat", "Art. 152"],
                      ["4e alerte", "Le CAC défère la situation au président de la juridiction compétente", "Immédiat", "Art. 153"],
                    ].map(([ph, act, dl, art], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-amber-50"}>
                        <td className="border border-amber-200 p-2 font-semibold text-amber-800">{ph}</td>
                        <td className="border border-amber-200 p-2 text-sm">{act}</td>
                        <td className="border border-amber-200 p-2 text-center">{dl}</td>
                        <td className="border border-amber-200 p-2">{art}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Alerte par les associés (Art. 155-158-1)
              </h3>
              <div className="space-y-2">
                {[
                  { titre: "Droit de poser des questions écrites (Art. 155)", contenu: "Tout associé non dirigeant peut, deux fois par exercice, poser par écrit des questions aux dirigeants sur tout fait susceptible de compromettre la continuité de l'exploitation. La réponse est communiquée au CAC." },
                  { titre: "Inscription à l'ordre du jour (Art. 156)", contenu: "Les associés représentant au moins 1/10 du capital peuvent demander l'inscription d'une question à l'ordre du jour de toute assemblée afin d'examiner les faits alarmants signalés." },
                  { titre: "Saisine du président de la juridiction (Art. 157)", contenu: "Lorsque les dirigeants ne prennent pas les mesures nécessaires, les associés représentant au moins 1/5 du capital peuvent saisir le président de la juridiction compétente." },
                  { titre: "Responsabilité du CAC (Art. 158-1)", contenu: "Le CAC qui, de mauvaise foi, n'engage pas la procédure d'alerte alors que les faits l'exigent engage sa responsabilité civile et pénale à l'égard de la société et des tiers." },
                ].map((item, i) => (
                  <div key={i} className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="font-semibold text-amber-800 text-xs mb-1">{item.titre}</p>
                    <p className="text-xs text-gray-700">{item.contenu}</p>
                  </div>
                ))}
              </div>

              <div className="bg-red-50 border-l-4 border-red-400 rounded-r-lg p-3">
                <p className="text-xs text-red-800 font-semibold mb-1">Point clé - Art. 154</p>
                <p className="text-xs text-red-700">Le CAC est <strong>délié du secret professionnel</strong> vis-à-vis du président de la juridiction saisie lors de la procédure d'alerte. Cette levée du secret est nécessaire pour permettre une intervention judiciaire efficace.</p>
              </div>
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                {[qcmQuestions[18], qcmQuestions[7]].map((q, i) => <QCMBlock key={i} q={q} />)}
              </div>
            </div>
          )}

          {/* ── L8 : EXPERTISE DE GESTION ── */}
          {activeLecon === 7 && (
            <div className="bg-card border border-border rounded-xl p-4 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                L'<strong className="text-foreground">expertise de gestion</strong>, régie par les Art. 159 et 160 de l'AUSCGIE, est un droit reconnu à certains associés de faire désigner par le juge un ou plusieurs experts chargés de présenter un rapport sur une ou plusieurs opérations de gestion. C'est un <strong className="text-foreground">outil de contrôle judiciaire</strong> des décisions de gestion.
              </p>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Conditions et modalités (Art. 159)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead><tr className="bg-amber-600 text-white">
                    <th className="border border-amber-700 p-2 text-left">Paramètre</th>
                    <th className="border border-amber-700 p-2 text-left">Règle</th>
                    <th className="border border-amber-700 p-2 text-left">Article</th>
                  </tr></thead>
                  <tbody>
                    {[
                      ["Qui peut demander ?", "Associés représentant au moins 1/10 du capital dans les SARL, 1/5 dans les SA", "Art. 159 al. 1 et 2"],
                      ["Objet de la demande", "Une ou plusieurs opérations de gestion spécifiquement identifiées", "Art. 159"],
                      ["Saisine", "Demande adressée au président de la juridiction compétente (référé)", "Art. 159"],
                      ["Désignation", "Le juge nomme un ou plusieurs experts selon l'objet et la complexité", "Art. 159"],
                      ["Frais", "Les honoraires sont à la charge de la société", "Art. 159"],
                    ].map(([par, regle, art], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-amber-50"}>
                        <td className="border border-amber-200 p-2 font-semibold text-amber-800">{par}</td>
                        <td className="border border-amber-200 p-2 text-sm">{regle}</td>
                        <td className="border border-amber-200 p-2">{art}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Rapport d'expertise et suite (Art. 160)
              </h3>
              <div className="space-y-2">
                {[
                  { titre: "Communication du rapport", contenu: "Le rapport de l'expert est communiqué aux demandeurs, aux dirigeants, au CAC (si existant) et, le cas échéant, au comité d'entreprise. Il est annexé au rapport de gestion présenté à la prochaine assemblée." },
                  { titre: "Portée du rapport", contenu: "Le rapport présente les conclusions de l'expert sur les opérations examinées, notamment quant à leur régularité, leur opportunité et leur conformité à l'intérêct social. Il n'a pas autorité de chose jugée mais constitue un élément de preuve pour une action judiciaire ultérieure." },
                  { titre: "Responsabilité des dirigeants", contenu: "Si le rapport d'expertise révèle des irrégularités, les associés demandeurs peuvent engager une action en responsabilité civile contre les dirigeants ou déposer une plainte pénale (abus de biens sociaux, etc.)." },
                ].map((item, i) => (
                  <div key={i} className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="font-semibold text-amber-800 text-xs mb-1">{item.titre}</p>
                    <p className="text-xs text-gray-700">{item.contenu}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-3 flex gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-700" />
                <div>
                  <p className="text-xs text-blue-800 font-semibold mb-1">Différence avec la procédure d'alerte</p>
                  <p className="text-xs text-blue-700">L'alerte (Art. 150) vise les <em>faits futurs</em> menaçant la continuité d'exploitation. L'expertise de gestion (Art. 159) porte sur des <em>opérations passées</em> dont la régularité est contestée.</p>
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                {[qcmQuestions[10], qcmQuestions[13]].map((q, i) => <QCMBlock key={i} q={q} />)}
              </div>
            </div>
          )}

          {/* ── L9 : ADMINISTRATION PROVISOIRE ── */}
          {activeLecon === 8 && (
            <div className="bg-card border border-border rounded-xl p-4 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                L'<strong className="text-foreground">administration provisoire</strong>, régie par les Art. 160-1 à 160-8 de l'AUSCGIE, est une mesure judiciaire exceptionnelle permettant de <strong className="text-foreground">substituer temporairement un administrateur désigné par le juge aux dirigeants</strong>, lorsque le fonctionnement normal de la société est impossible ou que ses intérêcts sont gravement mis en péril.
              </p>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Conditions d'ouverture (Art. 160-1)
              </h3>
              <div className="space-y-2">
                {[
                  { titre: "Carence ou empoisonnement des organes sociaux", contenu: "Impossibilité de réunir l'assemblée ou d'obtenir une décision valable en raison d'un conflit entre associés, d'un blocage systématique ou d'une vacance des fonctions de direction." },
                  { titre: "Atteinte grave à l'intérêt social", contenu: "Comportement des dirigeants ou des associés de nature à compromettre sérieusement l'intérêt de la société : gestion frauduleuse, détournements, paralysie décisionnelle." },
                  { titre: "Urgence démontrée", contenu: "La mesure est accordée en référé : le demandeur doit prouver l'urgence et l'absence de toute autre solution adéquate pour préserver la société." },
                ].map((item, i) => (
                  <div key={i} className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="font-semibold text-amber-800 text-xs mb-1">{item.titre}</p>
                    <p className="text-xs text-gray-700">{item.contenu}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold text-amber-700 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Régime de l'administration provisoire (Art. 160-2 à 160-8)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead><tr className="bg-amber-600 text-white">
                    <th className="border border-amber-700 p-2 text-left">Aspect</th>
                    <th className="border border-amber-700 p-2 text-left">Règle</th>
                    <th className="border border-amber-700 p-2 text-left">Article</th>
                  </tr></thead>
                  <tbody>
                    {[
                      ["Qui peut saisir ?", "Tout associé ou le ministère public", "Art. 160-1"],
                      ["Qui désigne ?", "Le président de la juridiction compétente, statuant en référé", "Art. 160-2"],
                      ["Pouvoirs de l'administrateur", "Définis strictement par l'ordonnance du juge ; ils peuvent être totaux ou partiels", "Art. 160-3"],
                      ["Durée", "Provisoire : fixée par le juge, renouvelable en cas de persistance du trouble", "Art. 160-4"],
                      ["Sort des dirigeants", "Les dirigeants sont suspendus (ou dessaisis partiellement) pendant la durée de la mesure", "Art. 160-5"],
                      ["Rémunération", "L'administrateur est rémunéré par la société selon les termes de l'ordonnance", "Art. 160-6"],
                      ["Fin de la mesure", "Cessation automatique à l'échéance fixée ou sur décision du juge si le trouble cesse", "Art. 160-7 et 160-8"],
                    ].map(([asp, regle, art], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-amber-50"}>
                        <td className="border border-amber-200 p-2 font-semibold text-amber-800">{asp}</td>
                        <td className="border border-amber-200 p-2 text-sm">{regle}</td>
                        <td className="border border-amber-200 p-2">{art}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-red-50 border-l-4 border-red-400 rounded-r-lg p-3">
                <p className="text-xs text-red-800 font-semibold mb-1">Caractère exceptionnel de la mesure</p>
                <p className="text-xs text-red-700">L'administration provisoire est une mesure de <strong>dernier recours</strong>. Elle ne peut être ordonnée que si aucune autre procédure (alerte, expertise, procédure d'urgence ordinaire) ne permet de remédier à la situation. Les juridictions OHADA l'accordent donc avec parcimonie.</p>
              </div>
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                {[qcmQuestions[19], qcmQuestions[17]].map((q, i) => <QCMBlock key={i} q={q} />)}
              </div>
            </div>
          )}

          {/* Navigation leçons */}
          <div className="flex justify-between">
            <button
              onClick={() => setActiveLecon(i => Math.max(0, i - 1))}
              disabled={activeLecon === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium disabled:opacity-40 hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Précédente
            </button>
            <button
              onClick={() => setActiveLecon(i => Math.min(lecons.length - 1, i + 1))}
              disabled={activeLecon === lecons.length - 1}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium disabled:opacity-40 hover:bg-muted transition-colors"
            >
              Suivante <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════ QCM ══════════════════════════ */}
      {activeTab === 'qcm' && isProf && (
        <div className="space-y-4">
          <QCMPageUnique questions={qcmQuestions as unknown as QCMChapitre[]} couleurAccent="amber" />
        </div>
      )}

      {/* ══════════════════════════ CAS PRATIQUES ══════════════════════════ */}
      {activeTab === 'cas' && (
        <div className="space-y-3">
          <div className="bg-card border border-border rounded-xl p-4">
            <h2 className="font-display font-bold text-foreground flex items-center gap-2 mb-1">
              <FileText className="w-5 h-5 text-amber-600" /> Cas Pratiques - Chapitre 7 : Les Dirigeants Sociaux
            </h2>
            <p className="text-sm text-muted-foreground">4 cas pratiques couvrant les articles fondamentaux du droit des dirigeants sociaux OHADA.</p>
            {isProf && (
              <span className="mt-2 inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> Mode professeur - corrections visibles
              </span>
            )}
          </div>
          {casPratiques.map(cp => (
            <CasPratiqueBlock key={cp.id} cp={cp} isProf={isProf} />
          ))}
        </div>
      )}

      {/* ══════════════════════════ DEVOIR ══════════════════════════ */}
      {activeTab === 'devoir' && (
        <div className="bg-card border border-border rounded-xl p-4">
          {isProf ? (
            <DevoirChapitreCreateur
              chapitreId="ue2-ch7"
              chapitreNom="Chapitre 7 - Les Dirigeants Sociaux"
              questions={qcmQuestions as unknown as import('@/lib/db').QCMChapitre[]}
              coursId="ue2-droit-societes"
              casPratiquesExistants={casPratiques.map(cp => ({
                id: cp.id,
                titre: cp.titre,
                enonce: cp.contexte + '\n' + (cp.questions as string[]).join('\n'),
                corrigeType: cp.correction,
              } as CasPratiqueExistant))}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium text-foreground">Devoir en attente</p>
              <p className="text-sm">Votre professeur vous enverra un devoir pour ce chapitre.</p>
            </div>
          )}
        </div>
      )}

      {/* ── Bouton Terminer ── */}
      <button onClick={goBack} className="w-full py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors">
        Terminer le chapitre 7
      </button>

      {/* ── Sources ── */}
      <p className="text-xs text-muted-foreground/60 text-center">
        Sources : AUSCGIE Art. 121-124, 130-131, 323-332, 338-1 - Jurisprudence CCJA
      </p>
    </div>
  )
}
