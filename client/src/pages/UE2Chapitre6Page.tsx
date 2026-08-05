import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, BookOpen, ChevronRight,
  Scale, Shield, Briefcase, Globe, AlertTriangle, Info, CheckCircle,
  Building2, Star, FileText, Users, ChevronDown, ChevronUp
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
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
    type: 'qcm', id: 'gie-q1',
    question: "Selon l'article 869 de l'AUSCGIE, quel est le but exclusif du GIE ?",
    options: [
      { id: 'a', texte: "Réaliser et partager des bénéfices entre ses membres" },
      { id: 'b', texte: "Faciliter ou développer l'activité économique de ses membres" },
      { id: 'c', texte: "Créer une entreprise commune indépendante de ses membres" },
      { id: 'd', texte: "Gérer le patrimoine collectif de ses membres" }
    ],
    reponseCorrecte: 'b',
    explication: "L'article 869 dispose que le GIE a pour but exclusif de mettre en oeuvre tous les moyens propres à faciliter ou à développer l'activité économique de ses membres, à améliorer ou à accroître les résultats de cette activité. Son activité doit avoir un caractère auxiliaire par rapport à celle de ses membres.",
    articleRef: 'Art. 869 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q2',
    question: "Selon l'article 870 de l'AUSCGIE, le GIE peut-il donner lieu à réalisation et partage de bénéfices ?",
    options: [
      { id: 'a', texte: "Oui, si le contrat de groupement le prévoit" },
      { id: 'b', texte: "Oui, si l'assemblée générale l'autorise à la majorité" },
      { id: 'c', texte: "Non, le GIE ne donne pas lieu par lui-même à réalisation et à partage de bénéfices" },
      { id: 'd', texte: "Oui, uniquement pour les membres personnes morales" }
    ],
    reponseCorrecte: 'c',
    explication: "L'article 870 est formel : le GIE ne donne pas lieu par lui-même à réalisation et à partage de bénéfices. C'est l'une des différences fondamentales entre le GIE et les sociétés commerciales.",
    articleRef: 'Art. 870 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q3',
    question: "Combien de personnes minimum sont nécessaires pour constituer un GIE selon l'article 871 ?",
    options: [
      { id: 'a', texte: "Une (1) personne physique ou morale" },
      { id: 'b', texte: "Trois (3) personnes physiques ou morales" },
      { id: 'c', texte: "Deux (2) personnes physiques ou morales" },
      { id: 'd', texte: "Cinq (5) personnes physiques ou morales" }
    ],
    reponseCorrecte: 'c',
    explication: "Selon l'article 871 de l'AUSCGIE, deux (2) ou plusieurs personnes physiques ou morales peuvent constituer entre elles un GIE, y compris les personnes exerçant une profession libérale soumise à un statut législatif ou réglementaire ou dont le titre est protégé.",
    articleRef: 'Art. 871 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q4',
    question: "Selon l'article 871, les droits des membres du GIE peuvent-ils être représentés par des titres négociables ?",
    options: [
      { id: 'a', texte: "Oui, si le contrat de groupement le prévoit" },
      { id: 'b', texte: "Non, les droits des membres ne peuvent être représentés par des titres négociables" },
      { id: 'c', texte: "Oui, mais uniquement sous forme d'obligations" },
      { id: 'd', texte: "Oui, avec l'accord de l'assemblée générale à l'unanimité" }
    ],
    reponseCorrecte: 'b',
    explication: "L'article 871 dispose expressément que les droits des membres NE PEUVENT ÊTRE REPRÉSENTÉS PAR DES TITRES NÉGOCIABLES. Cette règle est absolue et ne souffre d'aucune exception contractuelle.",
    articleRef: 'Art. 871 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q5',
    question: "À quel moment le GIE acquiert-il la personnalité morale selon l'article 872 ?",
    options: [
      { id: 'a', texte: "À la signature du contrat de groupement" },
      { id: 'b', texte: "À la date de la première assemblée générale" },
      { id: 'c', texte: "À compter de son immatriculation au RCCM" },
      { id: 'd', texte: "À la date de publication dans le journal d'annonces légales" }
    ],
    reponseCorrecte: 'c',
    explication: "L'article 872 dispose que le GIE jouit de la personnalité morale et de la pleine capacité à compter de son immatriculation au RCCM (Registre du Commerce et du Crédit Mobilier). Sans immatriculation, pas de personnalité morale.",
    articleRef: 'Art. 872 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q6',
    question: "Selon l'article 873, sur quoi les membres du GIE sont-ils tenus des dettes du groupement ?",
    options: [
      { id: 'a', texte: "Dans la limite de leurs apports uniquement" },
      { id: 'b', texte: "Sur leur patrimoine propre (responsabilité indéfinie)" },
      { id: 'c', texte: "Dans la limite d'un plafond fixé par le contrat" },
      { id: 'd', texte: "Uniquement si le GIE est insolvable depuis plus de 6 mois" }
    ],
    reponseCorrecte: 'b',
    explication: "L'article 873 al. 1 dispose que les membres du GIE sont tenus des dettes du groupement sur leur patrimoine propre. Il s'agit d'une responsabilité indéfinie, comparable à celle des associés d'une SNC.",
    articleRef: 'Art. 873 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q7',
    question: "Selon l'article 874, avant de poursuivre un membre du GIE pour le paiement d'une dette, que doit faire le créancier ?",
    options: [
      { id: 'a', texte: "Obtenir un jugement contre le GIE" },
      { id: 'b', texte: "Attendre 3 ans après la naissance de la dette" },
      { id: 'c', texte: "Avoir vainement mis en demeure le groupement" },
      { id: 'd', texte: "Obtenir l'accord de l'assemblée générale des membres" }
    ],
    reponseCorrecte: 'c',
    explication: "L'article 874 dispose que les créanciers du groupement ne peuvent poursuivre le paiement des dettes contre un associé qu'après avoir vainement mis en demeure le groupement. Cette mise en demeure préalable est une condition obligatoire.",
    articleRef: 'Art. 874 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q8',
    question: "Selon l'article 875, dans quelle condition le GIE peut-il émettre des obligations ?",
    options: [
      { id: 'a', texte: "Toujours, sans condition particulière" },
      { id: 'b', texte: "S'il est composé exclusivement de sociétés autorisées à émettre des obligations" },
      { id: 'c', texte: "Si au moins la moitié des membres sont des sociétés anonymes" },
      { id: 'd', texte: "Avec l'autorisation de la juridiction compétente" }
    ],
    reponseCorrecte: 'b',
    explication: "L'article 875 permet au GIE d'émettre des obligations uniquement s'il est composé EXCLUSIVEMENT de sociétés autorisées à émettre des obligations. La condition est donc strictement liée à la composition des membres.",
    articleRef: 'Art. 875 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q9',
    question: "Selon l'article 876, quand le contrat de groupement ne précise pas la contribution aux dettes, quelle règle s'applique ?",
    options: [
      { id: 'a', texte: "Chaque membre supporte une part proportionnelle à ses apports" },
      { id: 'b', texte: "Le membre le plus important supporte la totalité des dettes" },
      { id: 'c', texte: "Chaque membre supporte une part égale" },
      { id: 'd', texte: "Les dettes sont réparties selon l'ancienneté des membres" }
    ],
    reponseCorrecte: 'c',
    explication: "L'article 876 dispose qu'à défaut de disposition contractuelle, chaque membre supporte une part ÉGALE des dettes. Le contrat peut librement fixer une répartition différente, mais à défaut, la règle d'égalité s'applique.",
    articleRef: 'Art. 876 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q10',
    question: "Parmi les mentions obligatoires du contrat de groupement (Art. 876), laquelle figure dans la liste légale ?",
    options: [
      { id: 'a', texte: "Le montant du capital social du GIE" },
      { id: 'b', texte: "La liste des biens apportés par chaque membre" },
      { id: 'c', texte: "La durée pour laquelle le GIE est constitué" },
      { id: 'd', texte: "Le nombre minimum de salariés du GIE" }
    ],
    reponseCorrecte: 'c',
    explication: "L'article 876 liste 5 mentions obligatoires du contrat : 1) la dénomination ; 2) les noms, adresses et numéros RCCM des membres ; 3) la durée du GIE ; 4) l'objet ; 5) l'adresse du siège. Le capital social n'est pas une mention obligatoire car le GIE n'a pas de capital minimum.",
    articleRef: 'Art. 876 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q11',
    question: "Selon l'article 877, dans le silence du contrat, comment les décisions de l'assemblée générale sont-elles prises ?",
    options: [
      { id: 'a', texte: "À la majorité simple des membres présents" },
      { id: 'b', texte: "À la majorité des deux tiers" },
      { id: 'c', texte: "À l'unanimité" },
      { id: 'd', texte: "À la majorité absolue de tous les membres" }
    ],
    reponseCorrecte: 'c',
    explication: "L'article 877 al. 2 dispose que dans le silence du contrat, les décisions sont prises à L'UNANIMITÉ. Le contrat peut prévoir des conditions de quorum et de majorité différentes, mais sans clause contractuelle, l'unanimité est requise.",
    articleRef: 'Art. 877 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q12',
    question: "Selon l'article 878, qui peut exiger la convocation obligatoire de l'assemblée générale du GIE ?",
    options: [
      { id: 'a', texte: "Un seul membre du GIE" },
      { id: 'b', texte: "Un tiers au moins des membres en nombre" },
      { id: 'c', texte: "Un quart au moins des membres en nombre" },
      { id: 'd', texte: "La moitié au moins des membres en nombre" }
    ],
    reponseCorrecte: 'c',
    explication: "L'article 878 dispose que l'assemblée est obligatoirement réunie à la demande d'UN QUART au moins des membres du GIE en nombre. Cette règle est impérative et protège les membres minoritaires.",
    articleRef: 'Art. 878 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q13',
    question: "Selon l'article 879, les limitations de pouvoirs imposées à un administrateur du GIE sont-elles opposables aux tiers ?",
    options: [
      { id: 'a', texte: "Oui, si elles sont publiées au RCCM" },
      { id: 'b', texte: "Oui, si le tiers en avait connaissance" },
      { id: 'c', texte: "Non, toute limitation de pouvoirs est inopposable aux tiers" },
      { id: 'd', texte: "Oui, si elles figurent dans le contrat de groupement" }
    ],
    reponseCorrecte: 'c',
    explication: "L'article 879 dispose expressément que TOUTE LIMITATION DE POUVOIRS EST INOPPOSABLE AUX TIERS. Cette règle protège la sécurité des tiers contractants avec le GIE, même si les limitations sont publiées.",
    articleRef: 'Art. 879 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q14',
    question: "Selon l'article 880, lorsque le GIE émet des obligations, quelle est la durée du mandat du commissaire aux comptes ?",
    options: [
      { id: 'a', texte: "Trois (3) exercices" },
      { id: 'b', texte: "Cinq (5) exercices" },
      { id: 'c', texte: "Six (6) exercices" },
      { id: 'd', texte: "Quatre (4) exercices" }
    ],
    reponseCorrecte: 'c',
    explication: "L'article 880 dispose que lorsque le GIE émet des obligations, le contrôle des états financiers est exercé par un ou plusieurs commissaires aux comptes nommés par l'assemblée pour un mandat de SIX (6) EXERCICES.",
    articleRef: 'Art. 880 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q15',
    question: "Selon l'article 882, la transformation d'une société en GIE entraîne-t-elle la dissolution de la société ?",
    options: [
      { id: 'a', texte: "Oui, avec création d'une nouvelle personne morale" },
      { id: 'b', texte: "Non, la transformation se fait sans dissolution ni création d'une personne morale nouvelle" },
      { id: 'c', texte: "Oui, mais la nouvelle personne morale reprend toutes les obligations" },
      { id: 'd', texte: "Non, mais elle entraîne la création d'une nouvelle personne morale" }
    ],
    reponseCorrecte: 'b',
    explication: "L'article 882 al. 1 dispose que toute société dont l'objet correspond à la définition du GIE peut être transformée en GIE SANS DISSOLUTION ni création d'une personne morale nouvelle. La continuité juridique est totale.",
    articleRef: 'Art. 882 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q16',
    question: "Selon l'article 882, un GIE peut être transformé en quelle(s) forme(s) de société sans dissolution ?",
    options: [
      { id: 'a', texte: "En SA ou en SAS uniquement" },
      { id: 'b', texte: "En SNC ou en SARL" },
      { id: 'c', texte: "En SA, SNC ou SARL au choix" },
      { id: 'd', texte: "En coopérative uniquement" }
    ],
    reponseCorrecte: 'b',
    explication: "L'article 882 al. 2 prévoit qu'un GIE peut être transformé en SNC ou en SARL sans dissolution ni création d'une personne morale nouvelle. La transformation en SA n'est pas prévue par ce texte.",
    articleRef: 'Art. 882 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q17',
    question: "Parmi les causes de dissolution du GIE listées à l'article 883, laquelle est correcte ?",
    options: [
      { id: 'a', texte: "La perte de la moitié du capital social" },
      { id: 'b', texte: "L'arrivée du terme pour lequel le GIE a été constitué" },
      { id: 'c', texte: "La réduction du nombre de membres en dessous de cinq" },
      { id: 'd', texte: "Le refus d'un exercice par le commissaire aux comptes" }
    ],
    reponseCorrecte: 'b',
    explication: "L'article 883 liste 5 causes de dissolution du GIE : 1) l'arrivée du terme ; 2) la réalisation ou l'extinction de son objet ; 3) la décision de ses membres ; 4) la décision judiciaire pour justes motifs ; 5) le décès d'une personne physique ou dissolution d'une personne morale membre, sauf clause contraire.",
    articleRef: 'Art. 883 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q18',
    question: "Selon l'article 884, si un membre du GIE est frappé d'incapacité, que se passe-t-il par défaut ?",
    options: [
      { id: 'a', texte: "Le GIE continue automatiquement avec les membres restants" },
      { id: 'b', texte: "Le GIE est dissout, à moins que sa continuation soit prévue par le contrat ou décidée à l'unanimité" },
      { id: 'c', texte: "Le membre incapable est remplacé par son héritier" },
      { id: 'd', texte: "Le GIE est suspendu pendant 6 mois avant dissolution" }
    ],
    reponseCorrecte: 'b',
    explication: "L'article 884 dispose que si l'un des membres est frappé d'incapacité, de faillite personnelle ou d'interdiction de diriger, le GIE est dissout, à moins que sa continuation ne soit prévue par le contrat ou que les autres membres ne le décident à L'UNANIMITÉ.",
    articleRef: 'Art. 884 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q19',
    question: "Selon l'article 885, que se passe-t-il après dissolution du GIE si le contrat ne prévoit pas les modalités de répartition de l'excédent d'actif ?",
    options: [
      { id: 'a', texte: "L'excédent est partagé proportionnellement aux apports" },
      { id: 'b', texte: "L'excédent est versé à l'État" },
      { id: 'c', texte: "L'excédent est réparti par parts égales entre les membres" },
      { id: 'd', texte: "L'excédent revient aux membres selon leur ancienneté" }
    ],
    reponseCorrecte: 'c',
    explication: "L'article 885 dispose qu'après paiement des dettes, l'excédent d'actif est réparti entre les membres dans les conditions prévues par le contrat. À défaut de clause contractuelle, la répartition est faite PAR PARTS ÉGALES.",
    articleRef: 'Art. 885 AUSCGIE'
  },
  {
    type: 'qcm', id: 'gie-q20',
    question: "Que confirme l'arrêt CCJA n°48/2015 du 27 avril 2015 concernant la prise de décision dans le GIE ?",
    options: [
      { id: 'a', texte: "Le comité de gestion peut prendre toutes les décisions si le contrat le prévoit" },
      { id: 'b', texte: "Toutes les décisions sont toujours prises par l'assemblée générale des membres - aucun autre organe ne peut se substituer à elle" },
      { id: 'c', texte: "La majorité des membres peut décider sans réunir l'assemblée" },
      { id: 'd', texte: "L'administrateur peut exclure un membre sans consulter l'assemblée" }
    ],
    reponseCorrecte: 'b',
    explication: "La CCJA, Assemblée plénière, n°48/2015 du 27 avril 2015 a jugé que toutes les décisions sont TOUJOURS prises par l'AG des membres. Le contrat ne peut jamais permettre à un autre organe (ex: comité de gestion) de décider du fonctionnement du GIE (Art. 877). Toute décision d'exclusion prise par un comité de gestion seul est inopérante.",
    articleRef: 'Art. 877 AUSCGIE - CCJA n°48/2015'
  },
]

// ─── Leçons ───────────────────────────────────────────────────────────────────
const lecons = [
  { id: 'L1', titre: 'Définition, nature et caractères juridiques du GIE' },
  { id: 'L2', titre: 'Constitution et organisation du GIE' },
  { id: 'L3', titre: 'Responsabilité des membres du GIE' },
  { id: 'L4', titre: 'Administration, assemblée générale et contrôle' },
  { id: 'L5', titre: 'Transformation du GIE' },
  { id: 'L6', titre: 'Dissolution et liquidation du GIE' },
]

// ─── Cas pratiques ────────────────────────────────────────────────────────────
const casPratiques = [
  {
    id: 'cp1',
    titre: 'CP1 : Médecins et création d\'un GIE',
    niveau: 'Fondamental',
    contexte: `M. DIALLO est médecin généraliste installé en ville. Il souhaite créer, avec cinq autres médecins spécialistes, un groupement d'intérêt économique afin de partager un laboratoire d'analyses médicales et d'optimiser les coûts de fonctionnement de leurs cabinets respectifs. Ces médecins exercent une profession libérale soumise à un statut législatif. Ils se demandent si la loi leur permet de constituer un GIE et selon quelles conditions.`,
    questions: [
      "1. Les médecins exerçant une profession libérale réglementée peuvent-ils constituer un GIE ?",
      "2. Quel article de l'AUSCGIE fonde votre réponse et quelles en sont les conditions ?",
      "3. Les médecins doivent-ils disposer d'un capital minimum pour créer ce GIE ?",
      "4. La création du GIE suffit-elle à lui conférer la personnalité morale ?"
    ],
    correction: `CORRECTION :

1. Oui. L'article 871 de l'AUSCGIE dispose expressément que deux (2) ou plusieurs personnes physiques ou morales peuvent constituer entre elles un GIE, y compris les personnes exerçant une profession libérale soumise à un statut législatif ou réglementaire ou dont le titre est protégé. Les médecins, dont la profession est réglementée par la loi, entrent parfaitement dans cette catégorie.

2. L'article 871 AUSCGIE est le fondement légal. Les conditions sont : (a) être au minimum deux personnes ; (b) avoir une activité économique propre à laquelle le GIE sera auxiliaire (Art. 869) ; (c) rédiger un contrat de groupement écrit comportant les 5 mentions obligatoires de l'article 876 ; (d) immatriculer le GIE au RCCM.

3. Non. L'AUSCGIE ne prévoit aucun capital minimum pour la création d'un GIE. C'est une caractéristique fondamentale du GIE : il peut fonctionner par cotisations des membres ou par mise en commun de moyens, sans capital social obligatoire. C'est ce qui distingue le GIE des sociétés commerciales.

4. Non, la seule création (signature du contrat) ne suffit pas. L'article 872 dispose que le GIE jouit de la personnalité morale et de la pleine capacité à compter de son IMMATRICULATION au RCCM. Sans cette immatriculation, le GIE n'a pas la personnalité morale et ne peut pas ester en justice (confirmé par Tribunal de Commerce de Ouagadougou, n°55 du 10 fév. 2021).`
  },
  {
    id: 'cp2',
    titre: 'CP2 : Prise de décision et exclusion d\'un membre',
    niveau: 'Intermédiaire',
    contexte: `Le GIE TRANSPORT-AFRIQUE regroupe sept transporteurs. Son contrat de groupement ne contient aucune clause sur les modalités de prise de décision. Une assemblée est réunie et cinq membres sur sept votent pour exclure le membre M. KONÉ, qui perturberait le fonctionnement du groupement selon eux. M. KONÉ conteste cette décision. Par ailleurs, le contrat prévoit qu'un comité de gestion de trois membres peut prendre les décisions courantes de fonctionnement. Ce comité a décidé seul, sans convoquer l'assemblée, de suspendre les droits de vote de M. KONÉ pendant six mois.`,
    questions: [
      "1. La décision d'exclusion prise à la majorité de 5/7 est-elle valable ?",
      "2. Quelle règle s'applique dans le silence du contrat pour les décisions de l'assemblée ?",
      "3. La décision du comité de gestion de suspendre les droits de vote est-elle valable ?",
      "4. Quel arrêt de la CCJA éclaire cette situation ?"
    ],
    correction: `CORRECTION :

1. Non, la décision d'exclusion prise à la majorité de 5/7 n'est pas valable. L'article 877 al. 2 AUSCGIE dispose que dans le silence du contrat, les décisions sont prises à L'UNANIMITÉ. Le contrat de TRANSPORT-AFRIQUE ne contenant aucune clause sur les modalités de décision, la règle de l'unanimité s'impose. Or, deux membres ont voté contre : la décision est donc nulle.

2. Dans le silence du contrat, toutes les décisions sont prises à l'unanimité (Art. 877 al. 2 AUSCGIE). Cette règle est supplétive : le contrat peut y déroger en fixant des conditions de quorum et de majorité spécifiques. En l'absence de toute clause contractuelle, aucune décision ne peut être adoptée sans l'accord de tous les membres.

3. Non. La décision du comité de gestion est inopérante. La CCJA, Assemblée plénière, n°48/2015 du 27 avril 2015 a jugé que toutes les décisions sont TOUJOURS prises par l'assemblée générale des membres. Le contrat ne peut jamais permettre à un autre organe, tel qu'un comité de gestion, de décider du fonctionnement du GIE. Toute décision d'exclusion ou de sanction prise par un comité de gestion seul, sans réunion de l'assemblée générale, est inopérante.

4. L'arrêt CCJA, Assemblée plénière, n°48/2015 du 27 avril 2015 est directement applicable. Il confirme que l'assemblée générale des membres est le seul et unique organe décisionnel du GIE, conformément à l'article 877 AUSCGIE, et qu'aucune délégation à un comité interne ne peut déposséder l'assemblée de cette compétence exclusive.`
  },
  {
    id: 'cp3',
    titre: 'CP3 : Responsabilité des membres et mise en demeure préalable',
    niveau: 'Intermédiaire',
    contexte: `Le GIE AGRO-NORD a commandé pour 15 000 000 FCFA de matériel agricole à la société EQUIPAG-SA. Le GIE n'ayant pas payé sa dette, EQUIPAG-SA décide de poursuivre directement M. OUÉDRAOGO, membre du GIE, sans avoir au préalable mis en demeure le GIE lui-même. M. OUÉDRAOGO est entré dans le GIE après la commande et fait valoir qu'il ne devrait pas être tenu de cette dette. Par ailleurs, M. OUÉDRAOGO argue que le contrat de groupement prévoit une convention avec EQUIPAG-SA excluant la solidarité entre membres.`,
    questions: [
      "1. La poursuite directe de M. OUÉDRAOGO par EQUIPAG-SA sans mise en demeure préalable du GIE est-elle valable ?",
      "2. M. OUÉDRAOGO peut-il être exonéré de la dette née avant son entrée dans le GIE ?",
      "3. La solidarité entre membres est-elle une règle absolue ? Quelle exception existe ?",
      "4. Quelle est l'étendue de la responsabilité de M. OUÉDRAOGO s'il est tenu de la dette ?"
    ],
    correction: `CORRECTION :

1. Non. La poursuite directe est irrégulière. L'article 874 AUSCGIE dispose expressément que les créanciers du groupement ne peuvent poursuivre le paiement des dettes contre un associé qu'APRÈS AVOIR VAINEMENT MIS EN DEMEURE LE GROUPEMENT. EQUIPAG-SA doit d'abord mettre en demeure le GIE AGRO-NORD lui-même. Ce n'est que si cette mise en demeure reste sans effet qu'elle pourra se retourner contre les membres.

2. Oui, potentiellement. L'article 873 al. 1 prévoit qu'un nouveau membre peut être exonéré des dettes nées antérieurement à son entrée si le contrat de groupement le permet. Il faut donc vérifier si le contrat du GIE AGRO-NORD contient une telle clause d'exonération. Si oui, M. OUÉDRAOGO est exonéré de la dette née avant son adhésion.

3. Non, la solidarité n'est pas absolue. L'article 873 al. 2 dispose que les membres sont solidaires du paiement des dettes, SAUF convention contraire avec le tiers cocontractant. En l'espèce, si le contrat de groupement prévoit une convention avec EQUIPAG-SA excluant la solidarité entre membres, cette convention est opposable à EQUIPAG-SA. Chaque membre ne serait alors tenu que de sa part, sans bénéficier de la solidarité passive des autres.

4. Si M. OUÉDRAOGO est tenu de la dette (absence de clause d'exonération et après mise en demeure vaine du GIE), sa responsabilité est indéfinie : il répond sur l'ensemble de son patrimoine propre (Art. 873 al. 1). Il n'y a pas de plafond comme dans une SA. C'est le même régime que les associés d'une SNC.`
  },
  {
    id: 'cp4',
    titre: 'CP4 : Transformation du GIE en SARL',
    niveau: 'Avancé',
    contexte: `Le GIE AGRO-SAHEL, constitué de quatre exploitants agricoles, a développé une activité très rentable de commercialisation de produits agricoles. Ses membres souhaitent désormais lui donner une forme sociétaire permettant le partage de bénéfices. Ils envisagent de transformer le GIE en SARL. M. BAMBA, fournisseur du GIE depuis deux ans, détient une créance impayée de 8 000 000 FCFA sur le GIE AGRO-SAHEL et s'inquiète de perdre son droit de poursuite contre les anciens membres du GIE après la transformation.`,
    questions: [
      "1. La transformation du GIE AGRO-SAHEL en SARL est-elle juridiquement possible ?",
      "2. Cette transformation donne-t-elle lieu à dissolution du GIE ou création d'une nouvelle personne morale ?",
      "3. M. BAMBA conserve-t-il ses droits contre le GIE et ses anciens membres après la transformation ?",
      "4. Si les membres avaient voulu une responsabilité indéfinie dans la nouvelle structure, quelle autre forme de transformation aurait été possible ?"
    ],
    correction: `CORRECTION :

1. Oui. L'article 882 al. 2 de l'AUSCGIE prévoit expressément qu'un GIE peut être transformé en SARL sans dissolution ni création d'une personne morale nouvelle. Cette transformation est donc juridiquement possible pour le GIE AGRO-SAHEL, sous réserve que les membres respectent les conditions de constitution d'une SARL (notamment la rédaction de statuts conformes).

2. La transformation ne donne lieu ni à dissolution ni à création d'une nouvelle personne morale. L'article 882 al. 2 est explicite : la transformation se fait SANS DISSOLUTION ni création d'une personne morale nouvelle. Il y a continuité de la même personne morale, qui change simplement de forme juridique. Les droits et obligations subsistent intacts.

3. Oui. M. BAMBA conserve intégralement ses droits. L'article 882 prévoit spécifiquement qu'en cas de transformation d'un GIE en SARL, les créanciers antérieurs conservent leurs droits contre le GIE et ses associés. M. BAMBA pourra donc poursuivre le recouvrement de ses 8 000 000 FCFA contre la SARL (continuité du GIE) et contre les anciens membres du GIE (à titre personnel, selon les règles de l'Art. 873).

4. Si les membres souhaitaient conserver une responsabilité indéfinie et solidaire (comme dans le GIE), ils auraient pu opter pour la transformation en SNC (Société en Nom Collectif) plutôt qu'en SARL. L'article 882 al. 2 prévoit également cette possibilité : un GIE peut être transformé en SNC sans dissolution ni création d'une personne morale nouvelle. Dans une SNC, les associés sont aussi tenus indéfiniment et solidairement des dettes sociales, ce qui présente une structure de responsabilité comparable à celle du GIE.`
  },
]

// ─── Composant CasPratiqueBlock ───────────────────────────────────────────────
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
          <span className="bg-teal-100 text-teal-700 text-xs font-bold px-2 py-1 rounded-full">{cp.niveau}</span>
          <span className="font-semibold text-gray-800">{cp.titre}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />}
      </button>
      {open && (
        <div className="p-4 space-y-4 border-t border-gray-100">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
            <p className="font-semibold mb-1 flex items-center gap-2"><FileText className="w-4 h-4" /> Contexte</p>
            <p className="leading-relaxed">{cp.contexte}</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-gray-700 text-sm flex items-center gap-2"><ChevronRight className="w-4 h-4 text-teal-600" /> Questions</p>
            {cp.questions.map((q, i) => (
              <div key={i} className="bg-teal-50 border border-teal-100 rounded-lg px-4 py-2 text-sm text-teal-900">{q}</div>
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
                className="flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg px-4 py-2 transition-colors"
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
export default function UE2Chapitre6Page() {
  const [, navigate] = useHashLocation()
  const goBack = useGoBack('/ue2-droit-societes')
  const user = useUser()
  const isProf = user?.role === 'professeur' || user?.role === 'admin' || user?.role === 'assistant'

  const [activeTab, setActiveTab] = useState<'lecons' | 'qcm' | 'cas' | 'devoir'>('lecons')
  const [activeLecon, setActiveLecon] = useState(0)

  // États QCM
  const [qcmIdx, setQcmIdx] = useState(0)
  const [qcmSelected, setQcmSelected] = useState<string | null>(null)
  const [qcmShowResult, setQcmShowResult] = useState(false)
  const [qcmScore, setQcmScore] = useState(0)
  const [qcmDone, setQcmDone] = useState(false)

  const currentQ = qcmQuestions[qcmIdx]
  const isCorrect = qcmSelected === currentQ?.reponseCorrecte

  function handleVerifier() {
    if (!qcmSelected) return
    setQcmShowResult(true)
    if (qcmSelected === currentQ.reponseCorrecte) setQcmScore(s => s + 1)
  }
  function handleSuivant() {
    if (qcmIdx + 1 >= qcmQuestions.length) { setQcmDone(true); return }
    setQcmIdx(i => i + 1)
    setQcmSelected(null)
    setQcmShowResult(false)
  }
  function resetQcm() {
    setQcmIdx(0); setQcmSelected(null); setQcmShowResult(false); setQcmScore(0); setQcmDone(false)
  }

  return (
    <div className="space-y-4 pb-10 animate-fadeIn">

      {/* ── Header ── */}
      <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 2 — Droit des sociétés', route: '/ue2-droit-societes' },
            { label: 'Chapitre 6' },
          ]}
          color="indigo"
        />
        <h1 className="text-xl font-bold text-foreground mt-0.5">Le Groupement d'Intérêt Économique (GIE)</h1>
        <p className="text-sm text-muted-foreground">AUSCGIE — Articles 869 à 885 — OHADA</p>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Leçons', value: '6', icon: BookOpen, color: 'text-teal-600' },
          { label: 'QCM', value: '20', icon: CheckCircle2, color: 'text-teal-600' },
          { label: 'Cas pratiques', value: '4', icon: FileText, color: 'text-teal-600' },
          { label: 'Durée', value: '3h', icon: Star, color: 'text-teal-600' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card border border-border rounded-xl p-3 text-center">
            <Icon className={cn('w-5 h-5 mx-auto mb-1', color)} />
            <div className="text-lg font-bold">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      {/* ── Objectifs ── */}
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
        <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Objectifs du chapitre
        </h3>
        <ul className="space-y-1 text-sm text-teal-700">
          {[
            'Définir le GIE et comprendre son caractère auxiliaire (Art. 869-870)',
            'Maîtriser les conditions de constitution et les mentions obligatoires (Art. 871-872-876)',
            'Analyser le régime de responsabilité indéfinie des membres (Art. 873-874)',
            'Comprendre la gouvernance : assemblée générale souveraine, règle d\'unanimité (Art. 877-879)',
            'Distinguer les modes de transformation sans dissolution (Art. 882)',
            'Identifier les causes de dissolution et les règles de liquidation (Art. 883-885)',
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
          {/* Sélecteur de leçons */}
          <div className="flex flex-wrap gap-2">
            {lecons.map((l, i) => (
              <button
                key={l.id}
                onClick={() => setActiveLecon(i)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  activeLecon === i ? 'bg-teal-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {l.id}
              </button>
            ))}
          </div>

          {/* Titre leçon active */}
          <div className="border-l-4 border-teal-500 bg-card rounded-r-xl p-4">
            <h2 className="font-bold text-foreground">{lecons[activeLecon].id} — {lecons[activeLecon].titre}</h2>
          </div>

          {/* ── Contenu L1 ── */}
          {activeLecon === 0 && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-4 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Le Groupement d'Intérêt Économique (GIE) est une structure juridique originale créée par l'AUSCGIE. Il se distingue radicalement des sociétés commerciales classiques par son objet, son fonctionnement et l'absence de capital minimum obligatoire.
                </p>

                <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-sm text-teal-900 flex gap-2">
                  <Scale className="w-4 h-4 flex-shrink-0 mt-0.5 text-teal-600" />
                  <div>
                    <strong>Art. 869 AUSCGIE :</strong> Le GIE a pour but exclusif de mettre en oeuvre pour une durée déterminée, tous les moyens propres à faciliter ou à développer l'activité économique de ses membres, à améliorer ou à accroître les résultats de cette activité. Son activité doit se rattacher à l'activité économique de ses membres et ne peut avoir qu'un caractère AUXILIAIRE par rapport à celle-ci.
                  </div>
                </div>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Analyse du but exclusif
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  L'expression "but exclusif" est fondamentale : le GIE ne peut pas avoir d'objectif autre que celui de servir l'activité économique de ses membres. Il ne peut pas, par exemple, s'engager dans des activités lucratives propres, indépendantes de l'intérêt de ses membres. Chaque membre doit avoir une activité économique préexistante, à laquelle le GIE apportera un soutien auxiliaire.
                </p>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Le caractère auxiliaire : condition fondamentale
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Le caractère auxiliaire signifie que le GIE est un accessoire de l'activité de ses membres, jamais une fin en soi. L'activité du GIE doit se rattacher à l'activité économique de ses membres. Si le GIE développait une activité autonome et principale, déconnectée de l'activité de ses membres, il serait requalifié en société commerciale. Ce caractère auxiliaire est la condition sine qua non de la qualification GIE.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900 flex gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>Si le GIE développe une activité autonome, indépendante de celle de ses membres, il risque la requalification en société de fait avec toutes les conséquences fiscales et juridiques qui en découlent.</div>
                </div>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Absence de partage de bénéfices (Art. 870)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  L'article 870 pose une règle absolue : le GIE ne donne pas lieu par lui-même à réalisation et à partage de bénéfices. Les profits éventuels générés par les économies d'échelle ou la mise en commun de ressources reviennent indirectement aux membres sous forme de prestations à coût réduit, non sous forme de dividendes. C'est ce qui distingue fondamentalement le GIE d'une société commerciale dont l'objet est précisément de réaliser et partager des bénéfices.
                </p>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> La durée déterminée : caractère obligatoire
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  L'article 869 exige que le GIE soit constitué pour une durée déterminée. Cette durée doit figurer parmi les mentions obligatoires du contrat (Art. 876). Un GIE à durée indéterminée serait contraire à la loi. La durée peut être prorogée par décision de l'assemblée générale dans les conditions du contrat (Art. 877).
                </p>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Tableau comparatif : GIE, SARL, SNC, Association
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-teal-50">
                        <th className="border border-teal-200 p-2 text-left text-teal-900">Critère</th>
                        <th className="border border-teal-200 p-2 text-teal-900">GIE</th>
                        <th className="border border-teal-200 p-2 text-teal-900">SARL</th>
                        <th className="border border-teal-200 p-2 text-teal-900">SNC</th>
                        <th className="border border-teal-200 p-2 text-teal-900">Association</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      {[
                        ['But', 'Auxiliaire : faciliter l\'activité des membres', 'Réaliser des bénéfices', 'Réaliser des bénéfices', 'But non lucratif'],
                        ['Capital minimum', 'Aucun', '1 000 000 FCFA (OHADA)', 'Aucun', 'Aucun'],
                        ['Partage de bénéfices', 'Non (Art. 870)', 'Oui', 'Oui', 'Non'],
                        ['Responsabilité membres', 'Indéfinie sur patrimoine propre', 'Limitée aux apports', 'Indéfinie et solidaire', 'Variable selon statuts'],
                        ['Durée', 'Déterminée obligatoire', '99 ans max', '99 ans max', 'Libre'],
                        ['Titres négociables', 'Interdits (Art. 871)', 'Non (parts sociales)', 'Non (parts sociales)', 'Non applicable'],
                      ].map(([crit, ...vals], i) => (
                        <tr key={i} className={i % 2 === 1 ? 'bg-muted/30' : ''}>
                          <td className="border border-border p-2 font-medium text-foreground">{crit}</td>
                          {vals.map((v, j) => <td key={j} className="border border-border p-2 text-center">{v}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── Contenu L2 ── */}
          {activeLecon === 1 && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-4 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  La constitution d'un GIE est soumise à des conditions de fond et de forme précises. La liberté contractuelle y occupe une place centrale : le contrat de groupement est la véritable "constitution" du GIE, encadrée par les dispositions impératives de l'AUSCGIE.
                </p>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Conditions de fond — Qui peut constituer un GIE ? (Art. 871)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  L'article 871 ouvre largement la constitution du GIE. Peuvent être membres : toutes personnes physiques (commerçants, artisans, agriculteurs, professions libérales), toutes personnes morales (sociétés commerciales, associations, autres GIE). L'article 871 mentionne expressément les personnes exerçant une profession libérale soumise à un statut législatif ou réglementaire ou dont le titre est protégé (médecins, avocats, experts-comptables, architectes, etc.).
                </p>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-900 flex gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div><strong>Avantage clé :</strong> Les professions libérales réglementées (médecins, avocats, experts-comptables) peuvent constituer un GIE pour mutualiser leurs moyens, ce qui leur est souvent interdit dans d'autres formes sociétaires.</div>
                </div>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Absence de capital minimum
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Contrairement aux sociétés commerciales, l'AUSCGIE ne prévoit aucun capital minimum pour le GIE. Cette liberté totale de financement est caractéristique du GIE : les membres peuvent financer le groupement par des cotisations périodiques, des apports en nature (locaux, équipements), des mises à disposition de personnel, sans jamais être obligés de constituer un capital social. Cette souplesse financière est l'un des principaux attraits du GIE.
                </p>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Le contrat de groupement (Art. 876) : mentions obligatoires
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  L'article 876 impose que le contrat soit rédigé par écrit. Il doit obligatoirement contenir cinq mentions :
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-teal-50">
                        <th className="border border-teal-200 p-2 text-center text-teal-900">#</th>
                        <th className="border border-teal-200 p-2 text-left text-teal-900">Mention obligatoire</th>
                        <th className="border border-teal-200 p-2 text-left text-teal-900">Précisions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['1', 'La dénomination du GIE', 'Suivie des mots "groupement d\'intérêt économique" ou sigle "G.I.E." sur tous les actes'],
                        ['2', 'Identité des membres', 'Nom, raison sociale, forme juridique, adresse de chaque membre et numéro RCCM'],
                        ['3', 'La durée', 'Durée déterminée obligatoire pour laquelle le GIE est constitué (Art. 869)'],
                        ['4', "L'objet du GIE", 'Doit être auxiliaire à l\'activité des membres (Art. 869)'],
                        ['5', "L'adresse du siège", 'Siège social du GIE'],
                      ].map(([num, mention, precision], i) => (
                        <tr key={i} className={i % 2 === 1 ? 'bg-muted/30' : ''}>
                          <td className="border border-border p-2 text-center font-bold text-teal-600">{num}</td>
                          <td className="border border-border p-2 font-medium text-foreground">{mention}</td>
                          <td className="border border-border p-2 text-muted-foreground">{precision}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Personnalité morale — Naissance à l'immatriculation (Art. 872)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  L'article 872 conditionne la personnalité morale et la pleine capacité juridique du GIE à son immatriculation au RCCM (Registre du Commerce et du Crédit Mobilier). Avant l'immatriculation, le GIE n'a pas d'existence juridique propre : il ne peut pas contracter, ester en justice, ni posséder de patrimoine.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900 flex gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div><strong>Jurisprudence :</strong> Le Tribunal de Commerce de Ouagadougou, n°55 du 10 février 2021, a confirmé qu'un GIE non immatriculé au RCCM ne jouit pas de la personnalité morale et ne peut pas ester en justice. L'immatriculation est une formalité constitutive, non déclarative.</div>
                </div>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Liberté d'organisation : le contrat comme constitution
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  L'article 876 affirme que sous réserve des dispositions de l'AUSCGIE, le contrat détermine l'organisation du GIE librement. Les membres ont toute latitude pour organiser la gouvernance, la répartition des charges, les modalités de prise de décision et les règles de fonctionnement interne. Le contrat de groupement est ainsi la véritable "constitution" du GIE, à l'image des statuts pour une société.
                </p>
              </div>
            </div>
          )}

          {/* ── Contenu L3 ── */}
          {activeLecon === 2 && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-4 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  La responsabilité des membres du GIE est l'un des aspects les plus importants et les plus risqués du régime juridique du GIE. Contrairement aux associés d'une SARL ou d'une SA, les membres du GIE sont exposés sur leur patrimoine personnel.
                </p>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Responsabilité indéfinie sur le patrimoine propre (Art. 873 al. 1)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  L'article 873 al. 1 est sans ambiguïté : les membres du GIE sont tenus des dettes du groupement sur leur patrimoine propre. Il s'agit d'une responsabilité indéfinie, c'est-à-dire sans plafond, portant sur l'ensemble du patrimoine personnel du membre (biens immobiliers, comptes bancaires, etc.). Cette caractéristique est comparable à la responsabilité des associés d'une SNC.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900 flex gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>La responsabilité indéfinie est un risque majeur : tout créancier du GIE peut, après mise en demeure vaine du groupement, poursuivre chaque membre sur l'ensemble de ses biens personnels. Ce risque doit être évalué avant d'adhérer à un GIE.</div>
                </div>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Solidarité des membres : règle et exception (Art. 873 al. 2)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Par principe, les membres sont solidaires du paiement des dettes. La solidarité passive signifie que chaque membre peut être poursuivi pour la totalité de la dette du GIE. Il peut alors exercer un recours contre les autres membres pour leur quote-part. Cependant, l'article 873 prévoit une exception importante : la solidarité peut être écartée par convention contraire avec le tiers cocontractant. Si le contrat avec le fournisseur ou le créancier exclut la solidarité, chaque membre n'est tenu que de sa part.
                </p>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Exonération des dettes antérieures pour le nouveau membre (Art. 873 al. 1)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Un nouveau membre entrant dans le GIE peut être exonéré des dettes nées antérieurement à son entrée, à condition que le contrat de groupement le prévoit expressément. Cette protection contractuelle est essentielle : un nouveau membre doit impérativement vérifier le contrat avant d'adhérer, pour ne pas hériter des dettes passées du groupement.
                </p>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Procédure de mise en demeure préalable obligatoire (Art. 874)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  L'article 874 établit une procédure impérative de protection des membres : les créanciers du groupement ne peuvent poursuivre le paiement des dettes contre un associé qu'après avoir vainement mis en demeure le groupement. Cette mise en demeure préalable est une condition de recevabilité de toute action contre un membre. Le créancier doit d'abord interpeller le GIE, attendre que cette mise en demeure reste sans effet, puis seulement se retourner contre les membres.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-900 flex gap-2">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>La mise en demeure préalable du groupement (Art. 874) est un bénéfice de discussion : le membre peut se prévaloir de ce droit pour paralyser les poursuites directes contre lui tant que le créancier n'a pas épuisé ses recours contre le GIE.</div>
                </div>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Tableau comparatif des régimes de responsabilité
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-teal-50">
                        <th className="border border-teal-200 p-2 text-left text-teal-900">Forme juridique</th>
                        <th className="border border-teal-200 p-2 text-teal-900">Étendue responsabilité</th>
                        <th className="border border-teal-200 p-2 text-teal-900">Solidarité</th>
                        <th className="border border-teal-200 p-2 text-teal-900">Recours préalable obligatoire</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['GIE', 'Indéfinie (patrimoine propre)', 'Oui (sauf convention contraire)', 'Oui (mise en demeure GIE d\'abord)'],
                        ['SNC', 'Indéfinie (patrimoine propre)', 'Oui', 'Oui (mise en demeure société)'],
                        ['SARL', 'Limitée aux apports', 'Non', 'Non applicable'],
                        ['SA', 'Limitée aux apports', 'Non', 'Non applicable'],
                      ].map(([forme, ...vals], i) => (
                        <tr key={i} className={i % 2 === 1 ? 'bg-muted/30' : ''}>
                          <td className="border border-border p-2 font-medium text-teal-700">{forme}</td>
                          {vals.map((v, j) => <td key={j} className="border border-border p-2 text-center text-muted-foreground">{v}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── Contenu L4 ── */}
          {activeLecon === 3 && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-4 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  La gouvernance du GIE repose sur deux piliers : l'administration (exécutif) et l'assemblée générale des membres (organe souverain). La loi accorde une grande liberté d'organisation tout en posant des règles impératives protectrices des tiers et des membres minoritaires.
                </p>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Administration du GIE (Art. 879)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  L'article 879 dispose que le GIE est administré par une (1) ou plusieurs personnes physiques ou morales. Lorsqu'une personne morale est nommée administrateur, elle doit désigner un représentant permanent (personne physique), qui encourt les mêmes responsabilités civiles et pénales que s'il était administrateur en son nom propre. Le contrat ou, à défaut, l'assemblée générale organise librement l'administration du GIE.
                </p>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Pouvoirs de l'administrateur et protection des tiers
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dans les rapports avec les tiers, un administrateur engage le GIE pour tout acte entrant dans l'objet de celui-ci. La règle la plus importante est énoncée à l'article 879 in fine : TOUTE LIMITATION DE POUVOIRS EST INOPPOSABLE AUX TIERS. Même si le contrat ou l'assemblée a restreint les pouvoirs d'un administrateur (montant maximum des contrats, interdiction de certaines opérations), ces limitations ne peuvent pas être invoquées contre un tiers de bonne foi. Cette règle garantit la sécurité des transactions avec le GIE.
                </p>

                <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-sm text-teal-900 flex gap-2">
                  <Scale className="w-4 h-4 flex-shrink-0 mt-0.5 text-teal-600" />
                  <div><strong>Art. 879 al. 3 :</strong> Dans les rapports avec les tiers, un administrateur engage le GIE pour tout acte entrant dans l'objet de celui-ci. TOUTE LIMITATION DE POUVOIRS EST INOPPOSABLE AUX TIERS.</div>
                </div>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> L'assemblée générale : organe souverain (Art. 877)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  L'assemblée générale des membres est l'organe souverain du GIE. L'article 877 al. 1 lui confère une compétence universelle : elle est habilitée à prendre TOUTE DÉCISION, y compris de dissolution anticipée ou de prorogation dans les conditions déterminées par le contrat. Aucune décision de nature à modifier le fonctionnement du GIE ne peut être prise hors de l'assemblée générale.
                </p>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Règle d'unanimité dans le silence du contrat
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  L'article 877 al. 2 prévoit que lorsque le contrat ne précise pas les conditions de quorum et de majorité, les décisions sont prises à L'UNANIMITÉ. Cette règle supplétive est protectrice de chaque membre : tant que le contrat n'organise pas la majorité, chaque membre dispose d'un droit de veto. Le contrat peut prévoir des conditions différentes (majorité simple, majorité des deux tiers, etc.) mais uniquement de manière expresse.
                </p>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Convocation obligatoire de l'assemblée (Art. 878)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  L'article 878 protège les membres minoritaires en imposant une convocation obligatoire de l'assemblée à la demande d'UN QUART au moins des membres en nombre. Cette règle est impérative : l'organe d'administration ne peut pas s'opposer à cette convocation. Elle permet à un groupe minoritaire (au moins 25% des membres) de forcer la réunion de l'assemblée, notamment pour remettre en cause une décision contestée.
                </p>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Contrôle des comptes (Art. 880)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  En principe, le contrôle des états financiers est exercé dans les conditions prévues par le contrat. Cependant, lorsque le GIE émet des obligations, la loi impose un double contrôle obligatoire : (1) un contrôle de gestion par une ou plusieurs personnes physiques nommées par l'assemblée ; (2) un contrôle des états financiers par un ou plusieurs commissaires aux comptes inscrits sur la liste officielle, nommés par l'assemblée pour un mandat de SIX (6) EXERCICES.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-900 flex gap-2">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div><strong>Art. 880 :</strong> Lorsque le GIE émet des obligations, le commissaire aux comptes est nommé pour un mandat de SIX (6) exercices — durée identique à celle des CAC dans les SA.</div>
                </div>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Jurisprudences importantes
                </h3>
                <div className="space-y-3">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm space-y-1">
                    <p className="font-semibold text-amber-900">CCJA, Assemblée plénière, n°48/2015 du 27 avril 2015</p>
                    <p className="text-amber-800">Toutes les décisions sont TOUJOURS prises par l'AG des membres. Le contrat ne peut jamais permettre à un autre organe (ex: comité de gestion) de décider du fonctionnement du GIE (Art. 877). Toute décision d'exclusion prise par un comité de gestion seul est inopérante. L'assemblée générale est l'unique organe décisionnel, et cette compétence est indéléguable.</p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm space-y-1">
                    <p className="font-semibold text-amber-900">CCJA, 3e Ch., n°95/2024 du 28 mars 2024</p>
                    <p className="text-amber-800">Les fonds mis à la disposition d'un GIE pour l'exécution d'un marché lui appartiennent. Le créancier d'un MEMBRE dudit groupement ne peut les saisir. Cette décision consacre l'étanchéité patrimoniale entre le GIE (personne morale distincte) et ses membres : les dettes personnelles d'un membre ne peuvent pas être recouvrées sur les fonds du GIE.</p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm space-y-1">
                    <p className="font-semibold text-amber-900">Cass. com., 17 sept. 2025 (France)</p>
                    <p className="text-amber-800">En matière de GIE, le contrat de groupement ne prime pas nécessairement le règlement intérieur. En cas de contradiction entre les deux documents, les juges peuvent faire prévaloir le règlement intérieur (principe de libre adhésion individuelle aux projets). Importance pour les GIE OHADA : vérifier la cohérence entre le contrat et tout document interne.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Contenu L5 ── */}
          {activeLecon === 4 && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-4 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  L'article 882 de l'AUSCGIE organise les transformations du GIE selon deux directions : la transformation d'une société en GIE, et la transformation d'un GIE en société. Dans tous les cas, la loi consacre le principe de continuité juridique : aucune transformation n'entraîne dissolution ou création d'une nouvelle personne morale.
                </p>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Transformation d'une société en GIE (Art. 882 al. 1)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Toute société dont l'objet correspond à la définition du GIE (activité auxiliaire à l'activité de ses membres) peut être transformée en GIE. Cette transformation se fait SANS DISSOLUTION et SANS CRÉATION D'UNE PERSONNE MORALE NOUVELLE. La même personne morale continue d'exister, mais sous une forme juridique différente. Les droits des tiers, les contrats en cours, le personnel, les dettes et les créances sont automatiquement transférés au GIE sans aucune formalité de cession.
                </p>

                <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-sm text-teal-900 flex gap-2">
                  <Scale className="w-4 h-4 flex-shrink-0 mt-0.5 text-teal-600" />
                  <div><strong>Art. 882 al. 1 :</strong> Toute société dont l'objet correspond à la définition du GIE peut être transformée en GIE SANS DISSOLUTION ni création d'une personne morale nouvelle.</div>
                </div>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Transformation d'un GIE en SNC (Art. 882 al. 2)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Un GIE peut être transformé en Société en Nom Collectif (SNC) sans dissolution ni création d'une personne morale nouvelle. Cette transformation est logique car les deux structures partagent le même régime de responsabilité indéfinie des membres/associés. Le GIE qui développe des activités lucratives peut ainsi se transformer en SNC pour adopter une forme sociétaire permettant le partage de bénéfices, sans rompre la continuité juridique.
                </p>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Transformation d'un GIE en SARL (Art. 882 al. 2) et protection des créanciers
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Un GIE peut également être transformé en SARL sans dissolution ni création d'une personne morale nouvelle. Cette transformation est particulière car elle entraîne un changement important du régime de responsabilité : dans la SARL, les associés ne sont responsables qu'à hauteur de leurs apports, alors que dans le GIE, les membres étaient tenus sur leur patrimoine propre. Pour protéger les créanciers du GIE qui ont accordé leur confiance en comptant sur la responsabilité indéfinie des membres, l'article 882 prévoit une règle spéciale : les créanciers antérieurs conservent leurs droits contre le GIE (personne morale continuée) et contre ses anciens membres à titre personnel.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900 flex gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div><strong>Protection des créanciers antérieurs :</strong> En cas de transformation d'un GIE en SARL, les créanciers antérieurs à la transformation conservent leurs droits de poursuite contre le GIE ET contre les anciens membres à titre personnel. La transformation ne peut pas leur être opposée pour limiter leurs recours.</div>
                </div>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Tableau récapitulatif des transformations
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-teal-50">
                        <th className="border border-teal-200 p-2 text-left text-teal-900">Transformation</th>
                        <th className="border border-teal-200 p-2 text-teal-900">Dissolution ?</th>
                        <th className="border border-teal-200 p-2 text-teal-900">Nouvelle PM ?</th>
                        <th className="border border-teal-200 p-2 text-teal-900">Protection créanciers antérieurs</th>
                        <th className="border border-teal-200 p-2 text-teal-900">Article</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Société vers GIE', 'Non', 'Non', 'Droits maintenus (continuité)', '882 al. 1'],
                        ['GIE vers SNC', 'Non', 'Non', 'Droits maintenus (continuité)', '882 al. 2'],
                        ['GIE vers SARL', 'Non', 'Non', 'Protection renforcée : droits conservés contre GIE ET contre anciens membres', '882 al. 2'],
                      ].map(([transfo, diss, pm, protect, art], i) => (
                        <tr key={i} className={i % 2 === 1 ? 'bg-muted/30' : ''}>
                          <td className="border border-border p-2 font-medium text-foreground">{transfo}</td>
                          <td className="border border-border p-2 text-center text-emerald-700 font-medium">{diss}</td>
                          <td className="border border-border p-2 text-center text-emerald-700 font-medium">{pm}</td>
                          <td className="border border-border p-2 text-muted-foreground">{protect}</td>
                          <td className="border border-border p-2 text-center text-muted-foreground">{art}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-900 flex gap-2">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>La transformation GIE vers SARL bénéficie d'une protection spéciale des créanciers antérieurs car elle change radicalement le régime de responsabilité (de indéfinie à limitée). Sans cette protection, les créanciers se retrouveraient avec une garantie amoindrie qu'ils n'avaient pas acceptée lors de la conclusion du contrat.</div>
                </div>
              </div>
            </div>
          )}

          {/* ── Contenu L6 ── */}
          {activeLecon === 5 && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-4 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  La dissolution du GIE peut intervenir pour de nombreuses causes, légales ou contractuelles. La loi distingue les causes normales (arrivée du terme, extinction de l'objet), les causes volontaires (décision des membres) et les causes accidentelles (décès, incapacité, faillite d'un membre). La liquidation qui s'ensuit est organisée par le contrat ou, à défaut, par la loi.
                </p>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Les 5 causes de dissolution (Art. 883)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-teal-50">
                        <th className="border border-teal-200 p-2 text-center text-teal-900">#</th>
                        <th className="border border-teal-200 p-2 text-left text-teal-900">Cause de dissolution</th>
                        <th className="border border-teal-200 p-2 text-left text-teal-900">Commentaire</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['1', 'Arrivée du terme', 'Le GIE étant constitué pour une durée déterminée (Art. 869), l\'arrivée de cette date entraîne dissolution automatique sauf prorogation'],
                        ['2', 'Réalisation ou extinction de l\'objet', 'Si l\'objet du GIE est accompli (réalisation) ou devient impossible (extinction), la raison d\'être du GIE disparaît'],
                        ['3', 'Décision des membres', 'Dissolution volontaire dans les conditions de l\'Art. 877 (unanimité dans le silence du contrat, ou majorité contractuelle)'],
                        ['4', 'Décision judiciaire pour justes motifs', 'La juridiction compétente peut prononcer la dissolution pour justes motifs (mésentente grave, inexécution des obligations, etc.)'],
                        ['5', 'Décès ou dissolution d\'un membre', 'Le décès d\'un membre personne physique ou la dissolution d\'un membre personne morale entraîne dissolution du GIE, SAUF CLAUSE CONTRAIRE DU CONTRAT'],
                      ].map(([num, cause, comment], i) => (
                        <tr key={i} className={i % 2 === 1 ? 'bg-muted/30' : ''}>
                          <td className="border border-border p-2 text-center font-bold text-teal-600">{num}</td>
                          <td className="border border-border p-2 font-medium text-foreground">{cause}</td>
                          <td className="border border-border p-2 text-muted-foreground">{comment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Incapacité ou faillite d'un membre (Art. 884)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  L'article 884 traite d'une situation particulière : si l'un des membres est frappé d'incapacité, de faillite personnelle ou d'interdiction de diriger, gérer, administrer ou contrôler une entreprise, le GIE est dissout par principe. Deux exceptions permettent d'éviter cette dissolution : soit le contrat de groupement prévoit expressément la continuation en cas d'incapacité ou faillite d'un membre ; soit les autres membres décident à L'UNANIMITÉ de poursuivre le groupement sans le membre défaillant.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900 flex gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>L'article 884 requiert l'unanimité des AUTRES membres (hors le membre défaillant) pour décider la continuation du GIE. Cette règle supplétive est stricte : une simple majorité ne suffit pas en l'absence de clause contractuelle.</div>
                </div>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Liquidation du GIE (Art. 885)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  L'article 885 organise la liquidation en plusieurs temps. D'abord, la dissolution entraîne la liquidation : le GIE ne disparaît pas immédiatement, mais sa personnalité morale subsiste pour les besoins de la liquidation. Ensuite, la liquidation s'opère conformément aux dispositions du contrat. À défaut de clauses contractuelles, un liquidateur est nommé par l'assemblée générale. Si l'assemblée ne peut pas procéder à cette nomination, la juridiction compétente désigne le liquidateur. Enfin, après paiement de toutes les dettes, l'excédent d'actif est réparti entre les membres dans les conditions prévues par le contrat. À défaut de clause, la répartition est faite PAR PARTS ÉGALES.
                </p>

                <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-sm text-teal-900 flex gap-2">
                  <Scale className="w-4 h-4 flex-shrink-0 mt-0.5 text-teal-600" />
                  <div><strong>Art. 885 :</strong> Après paiement des dettes, l'excédent d'actif est réparti entre les membres dans les conditions prévues par le contrat. À défaut, la répartition est faite PAR PARTS ÉGALES.</div>
                </div>

                <h3 className="font-semibold text-teal-700 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Actualités jurisprudentielles 2024-2025
                </h3>
                <div className="space-y-3">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm space-y-1">
                    <p className="font-semibold text-amber-900">CCJA, 3e Ch., n°95/2024 du 28 mars 2024</p>
                    <p className="text-amber-800">Les fonds mis à la disposition d'un GIE pour l'exécution d'un marché lui appartiennent. Le créancier d'un MEMBRE dudit groupement ne peut les saisir. Cette décision protège le patrimoine du GIE (personne morale distincte) contre les créanciers personnels de ses membres.</p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm space-y-1">
                    <p className="font-semibold text-amber-900">Cass. com., 17 sept. 2025 (France)</p>
                    <p className="text-amber-800">En cas de contradiction entre le contrat de groupement et le règlement intérieur, les juges peuvent faire prévaloir le règlement intérieur selon le principe de libre adhésion individuelle aux projets. Importance pour les GIE OHADA : il convient de s'assurer de la cohérence entre le contrat de groupement et tout document interne (règlement intérieur, charte, protocole).</p>
                  </div>
                </div>
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
          <QCMPageUnique questions={qcmQuestions as unknown as QCMChapitre[]} couleurAccent="teal" />
        </div>
      )}

      {/* ══════════════════════════ CAS PRATIQUES ══════════════════════════ */}
      {activeTab === 'cas' && (
        <div className="space-y-3">
          <div className="bg-card border border-border rounded-xl p-4">
            <h2 className="font-bold text-foreground flex items-center gap-2 mb-1">
              <FileText className="w-5 h-5 text-teal-600" /> Cas Pratiques — Chapitre 6 : Le GIE
            </h2>
            <p className="text-sm text-muted-foreground">4 cas pratiques basés sur les articles 869 à 885 de l'AUSCGIE et la jurisprudence CCJA.</p>
            {isProf && (
              <span className="mt-2 inline-flex items-center gap-1 bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> Mode professeur — corrections visibles
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
              chapitreId="ue2-ch6"
              chapitreNom="Chapitre 6 - Le GIE"
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
      <button
        onClick={goBack}
        className="w-full py-3 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors"
      >
        Terminer le chapitre 6
      </button>

      {/* ── Sources ── */}
      <p className="text-xs text-muted-foreground/60 text-center">
        Sources : AUSCGIE Art. 869-885 — CCJA n°48/2015 — CCJA n°95/2024 — TC Ouagadougou n°55/2021
      </p>
    </div>
  )
}
