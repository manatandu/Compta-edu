import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, BookOpen, ChevronRight,
  Building2, FileText, Scale, Shield, Star, Award, Briefcase,
  TrendingUp, Globe, Layers, Key, Users, Info, AlertTriangle, CheckCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import DevoirChapitreCreateur, { CasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
import QCMPageUnique from '@/components/QCMPageUnique'
import { QCMChapitre } from '@/lib/db'
import { InfoTooltip } from '@/components/InfoTooltip'

/* ── TYPES QCM ── */
type QCMOption = { id: string; texte: string }
type QCMQuestion = {
  type: 'qcm'; id: string; question: string
  options: QCMOption[]; reponseCorrecte: string
  explication: string; articleRef: string
}

/* ── DONNÉES QCM ── */
const qcmQuestions: QCMQuestion[] = [
  {
    type: 'qcm', id: 'q1',
    question: "Quel est le capital minimum requis pour constituer une SA faisant appel public à l'épargne (APE) ?",
    options: [
      { id: 'a', texte: '10 000 000 FCFA' },
      { id: 'b', texte: '50 000 000 FCFA' },
      { id: 'c', texte: '100 000 000 FCFA' },
      { id: 'd', texte: '1 000 000 FCFA' },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 387 de l'AUSCGIE fixe le capital minimum à 100 000 000 FCFA pour les SA faisant APE, et à 10 000 000 FCFA pour les autres SA.",
    articleRef: 'Art. 387 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q2',
    question: "Quel est le nombre minimum d'actionnaires requis pour constituer une SA selon la révision de 2014 ?",
    options: [
      { id: 'a', texte: '7 actionnaires' },
      { id: 'b', texte: '5 actionnaires' },
      { id: 'c', texte: '3 actionnaires' },
      { id: 'd', texte: '2 actionnaires' },
    ],
    reponseCorrecte: 'd',
    explication: "Depuis la révision de l'AUSCGIE du 30 janvier 2014, le minimum est passé de 7 à 2 actionnaires (Art. 385), alignant l'OHADA sur les standards internationaux.",
    articleRef: 'Art. 385 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q3',
    question: "Dans quelle proportion les actions de numéraire doivent-elles être libérées à la souscription lors de la constitution d'une SA ?",
    options: [
      { id: 'a', texte: 'La totalité' },
      { id: 'b', texte: 'La moitié au minimum' },
      { id: 'c', texte: 'Le quart au minimum' },
      { id: 'd', texte: 'Un dixième au minimum' },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 389 impose une libération d'au moins un quart (1/4) du nominal à la souscription. Le solde doit être appelé dans un délai maximum de 3 ans.",
    articleRef: 'Art. 389 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q4',
    question: "Quelle est la valeur nominale minimale d'une action de SA selon l'AUSCGIE ?",
    options: [
      { id: 'a', texte: '5 000 FCFA' },
      { id: 'b', texte: '10 000 FCFA' },
      { id: 'c', texte: '20 000 FCFA' },
      { id: 'd', texte: '50 000 FCFA' },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 745 fixe la valeur nominale minimale d'une action à 10 000 FCFA, afin d'éviter une fragmentation excessive du capital.",
    articleRef: 'Art. 745 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q5',
    question: "Quelle est la proportion maximale du capital que peuvent représenter les actions à dividende prioritaire sans droit de vote (ADP) ?",
    options: [
      { id: 'a', texte: 'La moitié du capital (1/2)' },
      { id: 'b', texte: 'Le tiers du capital (1/3)' },
      { id: 'c', texte: 'Le quart du capital (1/4)' },
      { id: 'd', texte: 'Le dixième du capital (1/10)' },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 750 limite les actions de préférence sans droit de vote (ADP) au quart (1/4) du capital social total de la société.",
    articleRef: 'Art. 750 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q6',
    question: "Dans la structure SA avec Conseil d'Administration, combien d'administrateurs peut-on avoir au maximum en dehors d'une fusion ?",
    options: [
      { id: 'a', texte: '6 administrateurs' },
      { id: 'b', texte: '9 administrateurs' },
      { id: 'c', texte: '12 administrateurs' },
      { id: 'd', texte: '15 administrateurs' },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 416 fixe le maximum à 12 administrateurs. En cas de fusion, ce plafond peut être porté temporairement à 15 pour intégrer les administrateurs des sociétés fusionnées.",
    articleRef: 'Art. 416 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q7',
    question: "Quelle structure de gouvernance de SA exige strictement au maximum 3 actionnaires ?",
    options: [
      { id: 'a', texte: 'SA avec CA et PDG' },
      { id: 'b', texte: 'SA avec Directoire et Conseil de Surveillance' },
      { id: 'c', texte: 'SA avec Administrateur Général' },
      { id: 'd', texte: 'SA avec CA et Président distinct du DG' },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 467-1 réserve la structure 'Administrateur Général' aux SA ayant au maximum 3 actionnaires. C'est une forme simplifiée proche de la gérance SARL.",
    articleRef: 'Art. 467-1 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q8',
    question: "Quel est le quorum requis en première convocation pour une Assemblée Générale Extraordinaire (AGE) ?",
    options: [
      { id: 'a', texte: 'Aucun quorum requis' },
      { id: 'b', texte: 'Le quart du capital' },
      { id: 'c', texte: 'La moitié du capital' },
      { id: 'd', texte: 'Les deux tiers du capital' },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 553 exige en AGE, en 1ère convocation, la présence ou représentation d'au moins la moitié (1/2) du capital. En 2ème convocation, ce seuil tombe à 1/4.",
    articleRef: 'Art. 553 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q9',
    question: "Quelle majorité est requise pour voter une résolution en Assemblée Générale Extraordinaire (AGE) ?",
    options: [
      { id: 'a', texte: 'Majorité simple (50%+1)' },
      { id: 'b', texte: 'Majorité absolue (plus de la moitié)' },
      { id: 'c', texte: 'Majorité des deux tiers (2/3)' },
      { id: 'd', texte: 'Unanimité obligatoire' },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 555 exige une majorité des deux tiers (2/3) des voix exprimées en AGE. Seule exception : la transformation en SNC requiert l'unanimité (Art. 559).",
    articleRef: 'Art. 555 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q10',
    question: "Pour combien d'exercices comptables le Commissaire aux Comptes (CAC) est-il nommé dans une SA ?",
    options: [
      { id: 'a', texte: '2 exercices' },
      { id: 'b', texte: '3 exercices' },
      { id: 'c', texte: '5 exercices' },
      { id: 'd', texte: '6 exercices' },
    ],
    reponseCorrecte: 'd',
    explication: "L'article 694 dispose que le CAC est nommé par l'AGO pour 6 exercices comptables. Sa mission est d'auditer les comptes et d'informer les actionnaires et les tiers.",
    articleRef: 'Art. 694 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q11',
    question: "La SAS peut-elle faire appel public à l'épargne (APE) ?",
    options: [
      { id: 'a', texte: 'Oui, sans restriction' },
      { id: 'b', texte: 'Oui, avec autorisation de la BVMAC' },
      { id: 'c', texte: "Non, l'APE est strictement interdite" },
      { id: 'd', texte: 'Oui, si le capital dépasse 100 millions FCFA' },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 853-4 interdit absolument à la SAS de faire appel public à l'épargne. C'est une restriction fondamentale qui distingue la SAS de la SA.",
    articleRef: 'Art. 853-4 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q12',
    question: "Quel est le seul organe obligatoire dans une SAS selon l'AUSCGIE ?",
    options: [
      { id: 'a', texte: "Le Conseil d'Administration" },
      { id: 'b', texte: 'Le Directoire' },
      { id: 'c', texte: 'Le Président' },
      { id: 'd', texte: 'Le Commissaire aux Comptes' },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 853-6 impose uniquement un Président (personne physique ou morale) comme organe obligatoire. La SAS a une grande liberté statutaire pour les autres organes.",
    articleRef: 'Art. 853-6 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q13',
    question: "Un actionnaire peut-il consulter les comptes annuels avant l'AGO ? Si oui, à partir de quand ?",
    options: [
      { id: 'a', texte: "Non, uniquement pendant l'AGO" },
      { id: 'b', texte: "Oui, à partir du 30e jour avant l'AGO" },
      { id: 'c', texte: "Oui, à partir du 15e jour avant l'AGO" },
      { id: 'd', texte: "Oui, à partir du 8e jour avant l'AGO" },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 525 accorde aux actionnaires le droit de consulter les documents sociaux (comptes annuels, rapport de gestion, rapport du CAC) à partir du 15e jour précédant l'AGO.",
    articleRef: 'Art. 525 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q14',
    question: "Quel pourcentage du capital faut-il détenir pour demander une expertise de gestion au juge dans une SA ?",
    options: [
      { id: 'a', texte: '5% du capital' },
      { id: 'b', texte: '10% du capital' },
      { id: 'c', texte: '20% du capital (1/5)' },
      { id: 'd', texte: '25% du capital (1/4)' },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 159 al. 2 permet aux actionnaires détenant au moins 1/5 (20%) du capital de demander en justice la désignation d'un expert pour examiner des opérations de gestion suspectes.",
    articleRef: 'Art. 159 al. 2 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q15',
    question: "Quel est le délai de prescription pour l'action en nullité d'une décision d'Assemblée Générale dans une SA ?",
    options: [
      { id: 'a', texte: '1 an' },
      { id: 'b', texte: '2 ans' },
      { id: 'c', texte: '3 ans' },
      { id: 'd', texte: '5 ans' },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 247 fixe à 3 ans le délai de prescription de l'action en nullité des décisions prises par les organes sociaux, y compris les assemblées générales.",
    articleRef: 'Art. 247 AUSCGIE',
  },
]

/* ── CAS PRATIQUES ── */
const casPratiques = [
  {
    id: 'cp1',
    titre: "Cas 1 — Constitution d'une SA au Cameroun",
    contexte: "La famille MBEKI souhaite constituer une Société Anonyme pour exploiter une chaîne de supermarchés au Cameroun. Ils sont 4 associés et envisagent un capital de 50 000 000 FCFA, dont 20 000 000 FCFA d'apports en nature (véhicules et mobilier). Les apports en numéraire seront libérés à hauteur du minimum légal à la constitution. La société ne fera pas appel public à l'épargne.",
    questions: [
      {
        q: "1. La SA peut-elle être valablement constituée avec 4 associés et ce capital ?",
        r: "Oui. Depuis la révision de 2014, le minimum d'actionnaires est de 2 (Art. 385). Le capital de 50 000 000 FCFA dépasse le minimum légal de 10 000 000 FCFA pour une SA sans APE (Art. 387). La constitution est donc valide sur ces deux points.",
      },
      {
        q: "2. Calculer le montant minimum à libérer en numéraire à la constitution.",
        r: "Apports en numéraire = 50 000 000 - 20 000 000 = 30 000 000 FCFA. Le quart (1/4) doit être libéré à la souscription (Art. 389) : 30 000 000 x 1/4 = 7 500 000 FCFA. Le solde de 22 500 000 FCFA devra être appelé dans les 3 ans suivant l'immatriculation.",
      },
      {
        q: "3. Les apports en nature sont-ils soumis à une procédure particulière ?",
        r: "Oui. L'article 400 impose que les apports en nature soient intégralement libérés dès la souscription (pas d'appel progressif). De plus, un Commissaire aux Apports (souvent un CAC) doit être désigné pour évaluer leur valeur. Son rapport est déposé au greffe avant la constitution définitive.",
      },
      {
        q: "4. Quelles sont les formalités de constitution obligatoires ?",
        r: "Les fondateurs doivent : (1) rédiger les statuts notariés, (2) déposer les fonds au nom de la société en formation, (3) faire évaluer les apports en nature par un CAC, (4) signer l'acte de souscription, (5) tenir une AGC pour approuver les statuts et nommer les premiers dirigeants et CAC, (6) immatriculer la société au RCCM.",
      },
    ],
  },
  {
    id: 'cp2',
    titre: "Cas 2 — Actions et cessions dans une SA",
    contexte: "La SA COTON-EXPORT a un capital de 200 000 000 FCFA divisé en 20 000 actions de 10 000 FCFA chacune. Les statuts prévoient une clause d'agrément et une clause de préemption. M. DIALLO, actionnaire détenant 3 000 actions, souhaite céder 1 000 actions à un tiers extérieur. Par ailleurs, le conseil d'administration envisage de créer 2 000 actions à dividende prioritaire sans droit de vote (ADP).",
    questions: [
      {
        q: "1. La cession de M. DIALLO est-elle libre ou soumise à des restrictions ?",
        r: "La cession à un tiers extérieur est soumise aux clauses statutaires (Art. 764-765). La clause d'agrément signifie que la cession doit être préalablement approuvée par le Conseil d'Administration ou l'AGO. La clause de préemption donne aux autres actionnaires le droit de racheter les actions prioritairement avant tout cession à un tiers.",
      },
      {
        q: "2. La création de 2 000 ADP est-elle possible ? Dans quelle limite ?",
        r: "Oui, les ADP sont autorisées (Art. 750). Mais elles ne peuvent représenter plus du quart (1/4) du capital total. Capital actuel = 200 000 000 FCFA. Plafond ADP = 200 000 000 / 4 = 50 000 000 FCFA = 5 000 actions maximum. La création de 2 000 ADP (= 20 000 000 FCFA) est en dessous du plafond : c'est valide.",
      },
      {
        q: "3. Quels sont les droits des porteurs d'ADP ?",
        r: "Les porteurs d'ADP bénéficient d'un dividende prioritaire (versé avant tout dividende aux actions ordinaires), mais ils n'ont pas de droit de vote en Assemblée Générale (Art. 750). Ils conservent toutefois leurs droits financiers (droit au boni de liquidation, droit de souscription préférentiel en cas d'augmentation de capital).",
      },
    ],
  },
  {
    id: 'cp3',
    titre: "Cas 3 — Choix du mode de gouvernance",
    contexte: "Trois entrepreneurs (A, B, C) veulent créer une SA au Sénégal. A souhaite une structure légère car ils ne sont que 3. B préfère une structure avec séparation stricte entre direction et contrôle. C propose un modèle classique avec un PDG unique à la tête d'un Conseil d'Administration. Analysez les options disponibles.",
    questions: [
      {
        q: "1. Quelle structure correspond au choix de A ?",
        r: "La structure avec Administrateur Général (Art. 467-1) convient parfaitement. Elle est réservée aux SA avec au maximum 3 actionnaires. Un seul organe dirige : l'Administrateur Général cumule les pouvoirs du CA et du PDG. C'est une structure simplifiée, proche du gérant de SARL, idéale pour les petites SA fermées.",
      },
      {
        q: "2. Quelle structure correspond au choix de B ?",
        r: "La structure Directoire + Conseil de Surveillance (Art. 469-490). Le Directoire assure la direction opérationnelle (1 à 5 membres), le Conseil de Surveillance exerce le contrôle permanent (3 à 12 membres). La règle d'incompatibilité stricte interdit d'appartenir aux deux organes simultanément, garantissant une séparation totale entre gestion et contrôle.",
      },
      {
        q: "3. Quelle structure correspond au choix de C ?",
        r: "La structure classique SA avec CA et PDG. Le PDG cumule la présidence du CA et la direction générale. Le CA comprend entre 3 et 12 administrateurs, nommés pour une durée fixée par les statuts (maximum 6 ans). Le CA se réunit au moins une fois par trimestre. C'est la structure la plus répandue en zone OHADA.",
      },
    ],
  },
  {
    id: 'cp4',
    titre: "Cas 4 — Assemblées Générales d'une SA",
    contexte: "La SA AGRO-IVOIRE doit tenir deux assemblées : une AGO pour approuver les comptes de l'exercice N et distribuer des dividendes, et une AGE pour modifier l'objet social et augmenter le capital. Le capital est réparti entre 50 actionnaires. Lors de la 1ère convocation de l'AGO, des actionnaires représentant seulement 40% du capital sont présents. A l'AGE (1ère convocation), des actionnaires représentant 48% du capital sont présents.",
    questions: [
      {
        q: "1. L'AGO peut-elle valablement délibérer en 1ère convocation ?",
        r: "Oui. L'article 549 exige en AGO, en 1ère convocation, la présence ou représentation d'actionnaires possédant au moins le quart (1/4) des actions ayant le droit de vote. Avec 40%, le quorum est pourtant atteint (40% > 25%). L'AGO peut donc valablement délibérer. En 2ème convocation, il n'y a aucun quorum requis.",
      },
      {
        q: "2. L'AGE peut-elle valablement délibérer en 1ère convocation ?",
        r: "Non. L'article 553 exige en AGE, en 1ère convocation, la présence ou représentation d'actionnaires possédant au moins la moitié (1/2) des actions. Avec 48%, le quorum n'est pas atteint. En 2ème convocation, l'AGE délibère valablement avec au moins le quart (1/4) des actions représentées. Si ce quorum n'est pas atteint non plus, une 3ème convocation peut être tenue avec le même quorum de 1/4.",
      },
      {
        q: "3. Quelle majorité est requise pour voter la modification de l'objet social en AGE ?",
        r: "La majorité des deux tiers (2/3) des voix exprimées (Art. 555). Par exemple, si 60 votes sont exprimés, il faut au moins 40 votes favorables pour que la résolution soit adoptée. Les abstentions et les votes blancs ne sont pas comptabilisés dans les voix exprimées.",
      },
    ],
  },
  {
    id: 'cp5',
    titre: "Cas 5 — La SAS et ses caractéristiques",
    contexte: "M. KAMARA, entrepreneur ivoirien, veut créer seul une société pour son activité de conseil en stratégie. Il souhaite une grande liberté dans l'organisation de la gouvernance, ne pas avoir de capital minimum imposé, mais ne pas faire appel à des investisseurs publics. Son avocat lui propose la SAS.",
    questions: [
      {
        q: "1. M. KAMARA peut-il créer seul une SAS ?",
        r: "Oui. L'article 853-1 admet la SAS avec un associé unique (SASU). Dans ce cas, toutes les décisions normalement réservées aux associés sont prises par l'associé unique seul, consignées dans un registre spécial et non soumises aux formalités d'assemblée.",
      },
      {
        q: "2. Quel est le capital minimum requis pour la SAS ?",
        r: "Il n'y a pas de capital minimum légal dans la SAS (Art. 853-2). Le capital est librement fixé par les statuts. C'est l'un des avantages majeurs de cette forme par rapport à la SA. Cela permet à des startups ou entreprises de conseil de se constituer avec un capital symbolique.",
      },
      {
        q: "3. Quels sont les risques si les statuts de la SAS limitent trop les pouvoirs du Président ?",
        r: "Les limitations statutaires des pouvoirs du Président sont inopposables aux tiers de bonne foi (Art. 853-7). Cela signifie que même si les statuts exigent l'accord des associés pour certains actes, si le Président agit seul, la société est quand même engagée vis-à-vis des tiers qui ne connaissaient pas ces restrictions. C'est une protection plus forte pour les tiers que dans la SA.",
      },
      {
        q: "4. Quand la SAS est-elle obligée de nommer un CAC ?",
        r: "La SAS doit nommer un CAC si elle dépasse l'un des seuils suivants (Art. 853-19) : total bilan > 125 000 000 FCFA OU chiffre d'affaires > 250 000 000 FCFA OU effectif > 50 salariés. Il suffit d'un seul seuil dépassé pour déclencher l'obligation. Si aucun seuil n'est atteint, la désignation reste facultative.",
      },
    ],
  },
  {
    id: 'cp6',
    titre: "Cas 6 — Droits des actionnaires et protection minoritaire",
    contexte: "Dans la SA MINES-AFRIQUE, M. OUEDRAOGO détient 22% du capital. Il suspecte que le Directeur Général a signé des contrats désavantageux pour la société au bénéfice d'entreprises liées. M. OUEDRAOGO souhaite agir. Par ailleurs, une décision d'AGO lui semble irrégulière car les formalités de convocation n'ont pas été respectées.",
    questions: [
      {
        q: "1. M. OUEDRAOGO peut-il demander une expertise de gestion ? Sur quel fondement ?",
        r: "Oui. L'article 159 al. 2 permet aux actionnaires représentant au moins 1/5 (20%) du capital de saisir le juge pour désigner un expert chargé d'examiner une ou plusieurs opérations de gestion suspectes. M. OUEDRAOGO détient 22% > 20% : il remplit la condition. L'expert rend un rapport accessible aux actionnaires et au Ministère public.",
      },
      {
        q: "2. Sous quel délai M. OUEDRAOGO peut-il contester la décision d'AGO irrégulière ?",
        r: "Le délai de prescription de l'action en nullité est de 3 ans à compter de la date de l'assemblée (Art. 247). M. OUEDRAOGO doit agir en justice dans ce délai. Passé ce délai, la décision devient inattaquable même si elle était irrégulière.",
      },
      {
        q: "3. M. OUEDRAOGO a-t-il le droit de consulter les comptes avant l'AGO ?",
        r: "Oui. Tout actionnaire, quel que soit le nombre d'actions détenues, a le droit de consulter les documents sociaux (comptes annuels, rapport de gestion, rapport du CAC, inventaire) à partir du 15e jour précédant la tenue de l'AGO (Art. 525). Ce droit ne peut pas être supprimé par les statuts.",
      },
    ],
  },
  {
    id: 'cp7',
    titre: "Cas 7 — SA avec Directoire et Conseil de Surveillance",
    contexte: "La SA PETROLE-CONGO veut adopter une structure de gouvernance duale avec Directoire et Conseil de Surveillance. Elle compte 8 membres fondateurs souhaitant participer à la gouvernance. Le projet prévoit : un Directoire de 6 membres et un Conseil de Surveillance de 8 membres. Deux fondateurs souhaitent siéger dans les deux organes simultanément.",
    questions: [
      {
        q: "1. La composition du Directoire (6 membres) est-elle conforme à l'AUSCGIE ?",
        r: "Non. L'article 469 limite le Directoire à 5 membres maximum. Le projet de 6 membres est irrégulier. Il faudra réduire à 5 membres au maximum ou opter pour une autre structure de gouvernance.",
      },
      {
        q: "2. La composition du Conseil de Surveillance (8 membres) est-elle conforme ?",
        r: "Oui. L'article 474 prévoit que le Conseil de Surveillance est composé de 3 à 12 membres. 8 membres est parfaitement dans les limites légales.",
      },
      {
        q: "3. Les deux fondateurs peuvent-ils siéger simultanément dans le Directoire et le Conseil de Surveillance ?",
        r: "Non. L'article 469 et suivants établissent une incompatibilité stricte entre les deux organes : nul ne peut être membre du Directoire et du Conseil de Surveillance en même temps. Cette règle garantit l'indépendance du contrôle exercé par le Conseil de Surveillance. Les deux fondateurs devront choisir leur organe d'appartenance.",
      },
    ],
  },
  {
    id: 'cp8',
    titre: "Cas 8 — Transformation SA et rôle du CAC",
    contexte: "La SA TRANSIT-MALI, dont les affaires déclinent, souhaite se transformer en Société en Nom Collectif (SNC) pour bénéficier d'une gouvernance plus souple. L'assemblée extraordinaire réunit des actionnaires représentant 70% du capital. Par ailleurs, le mandat du CAC arrive à expiration et il faut le renouveler.",
    questions: [
      {
        q: "1. La transformation en SNC peut-elle être votée à la majorité des 2/3 ?",
        r: "Non. L'article 559 prévoit une exception fondamentale : la transformation d'une SA en SNC requiert l'unanimité de tous les actionnaires (100% des voix). La raison est que la transformation augmente l'engagement des associés (passage d'une responsabilité limitée à une responsabilité illimitée et solidaire). Cette règle protège les actionnaires minoritaires.",
      },
      {
        q: "2. Par qui et pour quelle durée le CAC doit-il être renouvelé ?",
        r: "Le CAC est nommé ou renouvelé par l'Assemblée Générale Ordinaire (AGO) pour une durée de 6 exercices comptables (Art. 694). Sa nomination ne peut pas être réduite à moins de 6 exercices. La mission du CAC dans une SA est obligatoire : toute SA doit avoir au moins un CAC, quelle que soit sa taille.",
      },
      {
        q: "3. Quelles sont les principales missions du CAC dans une SA ?",
        r: "Le CAC a pour missions (Art. 695-697) : (1) certifier la régularité et la sincérité des comptes annuels, (2) vérifier la concordance entre le rapport de gestion et les comptes, (3) signaler les irrégularités et inexactitudes constatées, (4) révéler au Ministère public les faits délictueux (obligation de révélation), (5) établir un rapport spécial sur les conventions réglementées. Sa responsabilité est civile et pénale.",
      },
    ],
  },
]

/* ── COMPOSANT QCM COMPRÉHENSION ── */
function QCMBlock({ q }: { q: QCMQuestion }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  return (
    <div className="rounded-xl border border-cyan-200 bg-cyan-50/30 p-4 space-y-3">
      <p className="text-xs font-semibold text-cyan-700">{q.question}</p>
      <div className="space-y-1.5">
        {q.options.map(opt => {
          let cls = 'w-full text-left text-xs px-3 py-2 rounded-lg border transition-colors '
          if (!showResult) cls += selected === opt.id ? 'border-cyan-500 bg-cyan-100 text-cyan-800' : 'border-border hover:border-cyan-300 hover:bg-muted/40'
          else if (opt.id === q.reponseCorrecte) cls += 'border-green-500 bg-green-50 text-green-700'
          else if (opt.id === selected) cls += 'border-red-400 bg-red-50 text-red-600'
          else cls += 'border-border opacity-50'
          return <button key={opt.id} className={cls} onClick={() => { if (!showResult) setSelected(opt.id) }} disabled={showResult}><span className="font-bold mr-1.5">{opt.id.toUpperCase()}.</span>{opt.texte}</button>
        })}
      </div>
      {!showResult && <button onClick={() => { if (selected) setShowResult(true) }} disabled={!selected} className="text-xs bg-cyan-600 text-white rounded-lg px-4 py-1.5 disabled:opacity-40 hover:bg-cyan-700 transition-colors font-semibold">Vérifier</button>}
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

/* ── COMPOSANT CAS PRATIQUE ── */
function CasPratiqueBlock({ cas, index }: { cas: typeof casPratiques[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const [showCorr, setShowCorr] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="bg-cyan-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
            {index + 1}
          </span>
          <span className="font-semibold text-gray-800 text-sm">{cas.titre}</span>
        </div>
        <ChevronRight className={cn("w-5 h-5 text-gray-400 transition-transform", open && "rotate-90")} />
      </button>
      {open && (
        <div className="border-t border-gray-100 p-4 space-y-4 bg-white">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-xs font-semibold text-amber-800 mb-1 uppercase tracking-wide">Contexte</p>
            <p className="text-sm text-gray-700 leading-relaxed">{cas.contexte}</p>
          </div>
          <div className="space-y-3">
            {cas.questions.map((q, i) => (
              <div key={i} className="border border-gray-100 rounded-lg p-3">
                <p className="font-semibold text-gray-800 text-sm mb-2">{q.q}</p>
                {showCorr ? (
                  <div className="bg-emerald-50 border-l-4 border-emerald-400 rounded-r p-3">
                    <p className="text-xs text-gray-700 leading-relaxed">{q.r}</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-dashed border-gray-200 rounded p-3">
                    <p className="text-xs text-gray-400 italic">Répondez à la question avant de voir la correction.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowCorr(!showCorr)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-cyan-600 hover:bg-cyan-700 text-white transition-colors"
          >
            {showCorr ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
            {showCorr ? 'Masquer les corrections' : 'Voir les corrections'}
          </button>
        </div>
      )}
    </div>
  )
}

/* ── COMPOSANT PRINCIPAL ── */
export default function UE2Chapitre4Page() {
  const [, navigate] = useHashLocation()
  const goBack = useGoBack('/ue2-droit-societes')
  const user = useUser()

  const isEtudiant = user?.role === 'etudiant'

  /* ── ONGLETS ── */
  const [activeTab, setActiveTab] = useState<'lessons' | 'qcm' | 'cas' | 'devoir'>('lessons')

  /* ── LEÇONS ── */
  const lecons = [
    "Définition et Constitution de la SA (Art. 385-412)",
    "Les Actions de la SA (Art. 744-778-1)",
    "Les 4 Modes de Gouvernance de la SA (Art. 414-490)",
    "Assemblées Générales et CAC (Art. 516-562)",
    "La Société par Actions Simplifiée — SAS (Art. 853-1 à 853-23)",
    "Droits des Actionnaires de la SA (Art. 525-545)",
    "Les Actions de Préférence (Art. 778-1 à 778-15)",
  ]
  const [activeLecon, setActiveLecon] = useState(0)

  /* ── QCM INLINE ── */
  const [qcmIdx, setQcmIdx] = useState(0)
  const [qcmSelected, setQcmSelected] = useState<string | null>(null)
  const [qcmShowResult, setQcmShowResult] = useState(false)
  const [qcmScore, setQcmScore] = useState(0)
  const [qcmDone, setQcmDone] = useState(false)

  const currentQ = qcmQuestions[qcmIdx]
  const handleQcmVerif = () => {
    if (!qcmSelected) return
    if (qcmSelected === currentQ.reponseCorrecte) setQcmScore(s => s + 1)
    setQcmShowResult(true)
  }
  const handleQcmNext = () => {
    if (qcmIdx + 1 >= qcmQuestions.length) { setQcmDone(true); return }
    setQcmIdx(i => i + 1)
    setQcmSelected(null)
    setQcmShowResult(false)
  }
  const resetQcm = () => { setQcmIdx(0); setQcmSelected(null); setQcmShowResult(false); setQcmScore(0); setQcmDone(false) }

  return (
    <div className="space-y-4 pb-10 animate-fadeIn">
      {/* ── HEADER ── */}
      <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 2 — Droit des sociétés', route: '/ue2-droit-societes' },
            { label: 'Chapitre 4' },
          ]}
          color="indigo"
        />
        <h1 className="text-xl font-display font-bold mt-0.5">Société Anonyme (SA) et SAS</h1>
        <p className="text-sm text-muted-foreground">
          La grande société de capitaux OHADA : gouvernance, actions, assemblées et société par actions simplifiée
        </p>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Leçons', value: '7', icon: <BookOpen className="w-4 h-4 text-cyan-600" /> },
          { label: 'QCM', value: '15', icon: <CheckCircle2 className="w-4 h-4 text-cyan-600" /> },
          { label: 'Cas pratiques', value: '8', icon: <Briefcase className="w-4 h-4 text-cyan-600" /> },
          { label: 'Durée', value: '3h', icon: <TrendingUp className="w-4 h-4 text-cyan-600" /> },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-3 text-center shadow-sm">
            <div className="flex justify-center mb-1">{s.icon}</div>
            <p className="text-lg font-bold text-cyan-700">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── OBJECTIFS ── */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
        <p className="text-sm font-semibold text-cyan-800 mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Objectifs du chapitre
        </p>
        <ul className="space-y-1">
          {[
            "Maîtriser les conditions de constitution de la SA et ses capitaux minimums",
            "Distinguer les 4 structures de gouvernance et leurs règles de composition",
            "Analyser les droits attachés aux différentes catégories d'actions",
            "Calculer les quorums et majorités applicables en AGO et AGE",
            "Comparer la SA et la SAS sur les points fondamentaux",
            "Identifier les droits des actionnaires minoritaires et les mécanismes de protection",
          ].map((obj, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-cyan-900">
              <ChevronRight className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
              {obj}
            </li>
          ))}
        </ul>
      </div>

      {/* ── ONGLETS ── */}
      <div className="bg-muted p-1 rounded-xl flex gap-1">
        {(isEtudiant
          ? [{ id: 'lessons' as const, label: 'Leçons' }, { id: 'devoir' as const, label: 'Devoir' }]
          : [{ id: 'lessons' as const, label: 'Leçons' }, { id: 'qcm' as const, label: 'QCM' }, { id: 'cas' as const, label: 'Cas pratiques' }, { id: 'devoir' as const, label: 'Devoir' }]
        ).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "bg-white text-cyan-700 shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════ */}
      {/* ── ONGLET LEÇONS ── */}
      {/* ══════════════════════════════════════ */}
      {activeTab === 'lessons' && (
        <div className="space-y-4">
          {/* Sélecteur de leçon */}
          <div className="flex flex-wrap gap-2">
            {lecons.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveLecon(i)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border",
                  activeLecon === i
                    ? "bg-cyan-600 text-white border-cyan-600"
                    : "bg-white text-cyan-700 border-cyan-200 hover:border-cyan-400"
                )}
              >
                L{i + 1}
              </button>
            ))}
          </div>

          {/* Carte leçon */}
          <div className="bg-white rounded-xl border-l-4 border-cyan-500 shadow-sm p-5">
            <h2 className="text-base font-display font-bold text-cyan-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Leçon {activeLecon + 1} — {lecons[activeLecon]}
            </h2>

            {/* ── LEÇON 1 ── */}
            {activeLecon === 0 && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  La <strong>Société Anonyme (SA)</strong> est définie par l'article 385 de l'AUSCGIE comme la société dans laquelle les obligations des actionnaires sont limitées à leurs apports et dont les droits des actionnaires sont représentés par des <strong>actions</strong>. C'est la seule forme sociale qui permet l'<strong>Appel Public à l'Epargne (APE)</strong>, c'est-à-dire l'offre de titres au public via une bourse de valeurs.
                </p>
                <p>
                  La réforme de l'AUSCGIE du <strong>30 janvier 2014</strong> a modernisé profondément la SA en réduisant le nombre minimum d'actionnaires de 7 à 2, en introduisant de nouveaux modes de gouvernance, et en créant la <strong>Société par Actions Simplifiée (SAS)</strong>.
                </p>

                <div className="bg-slate-50 border-l-4 border-slate-400 rounded-r-lg p-4">
                  <div className="flex gap-3 text-slate-800">
                    <Scale className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Note spécifique RDC</p>
                      <p className="text-sm">En République Démocratique du Congo, la SA OHADA est l'équivalent fonctionnel de l'ancienne SARL de droit belge de 1926 qui prévalait avant l'adhésion au Traité OHADA.</p>
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-cyan-800 flex items-center gap-2"><Key className="w-4 h-4" /> Conditions de validité</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-cyan-600 text-white">
                        <th className="border border-cyan-700 p-2 text-left">Critère</th>
                        <th className="border border-cyan-700 p-2 text-left">SA sans APE</th>
                        <th className="border border-cyan-700 p-2 text-left">SA avec APE</th>
                        <th className="border border-cyan-700 p-2 text-left">Article</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Nombre d'actionnaires", "Minimum 2", "Minimum 2", "Art. 385"],
                        ["Capital minimum", "10 000 000 FCFA", "100 000 000 FCFA", "Art. 387"],
                        ["Libération numéraire à la souscription", "1/4 minimum", "1/4 minimum", "Art. 389"],
                        ["Délai libération solde", "3 ans maximum", "3 ans maximum", "Art. 389"],
                        ["Apports en nature", "Libération intégrale + CAC", "Libération intégrale + CAC", "Art. 400"],
                        ["Responsabilité actionnaires", "Limitée aux apports", "Limitée aux apports", "Art. 385"],
                      ].map(([c, s, a, art], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-cyan-50"}>
                          <td className="border border-cyan-200 p-2 font-medium">{c}</td>
                          <td className="border border-cyan-200 p-2">{s}</td>
                          <td className="border border-cyan-200 p-2">{a}</td>
                          <td className="border border-cyan-200 p-2">{art}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4">
                  <div className="flex gap-3 text-amber-800">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Apports en nature — Règle fondamentale</p>
                      <p className="text-sm">Contrairement aux apports en numéraire qui peuvent être libérés progressivement, les <strong>apports en nature doivent être intégralement libérés dès la souscription</strong> (Art. 400). Un <strong>Commissaire aux Apports</strong> doit être désigné pour évaluer leur valeur réelle.</p>
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-cyan-800">Etapes de constitution d'une SA</h3>
                <div className="space-y-2">
                  {[
                    { step: '1', title: 'Rédaction des statuts notariés', detail: 'Les statuts doivent mentionner : dénomination, siège, objet, capital, durée, répartition des actions, forme de direction (Art. 398).' },
                    { step: '2', title: "Evaluation des apports en nature", detail: "Désignation d'un Commissaire aux Apports (CAC). Son rapport est annexé aux statuts et déposé au greffe." },
                    { step: '3', title: 'Dépôt des fonds', detail: 'Les fonds correspondant au quart minimum des apports en numéraire sont bloqués sur un compte bancaire au nom de la "SA en formation".' },
                    { step: '4', title: 'Assemblée Générale Constitutive (AGC)', detail: 'Les actionnaires fondateurs adoptent les statuts définitifs, nomment les premiers administrateurs/dirigeants et le CAC.' },
                    { step: '5', title: 'Immatriculation au RCCM', detail: "Enregistrement au Registre du Commerce et du Crédit Mobilier. La personnalité morale naît à compter de cette immatriculation (Art. 98)." },
                  ].map(item => (
                    <div key={item.step} className="flex gap-3 bg-cyan-50 rounded-lg p-3">
                      <span className="bg-cyan-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {item.step}
                      </span>
                      <div>
                        <p className="font-semibold text-cyan-900 text-sm">{item.title}</p>
                        <p className="text-gray-600 text-xs mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* QCM de compréhension */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-cyan-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                  {[qcmQuestions[0], qcmQuestions[1], qcmQuestions[2]].map((q, i) => <QCMBlock key={i} q={q} />)}
                </div>
              </div>
            )}

            {/* ── LEÇON 2 ── */}
            {activeLecon === 1 && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  L'<strong>action</strong> est le titre représentatif d'une fraction du capital de la SA. C'est un titre <strong>négociable</strong>, c'est-à-dire qu'il peut être librement transmis par voie boursière ou de gré à gré. Cette négociabilité est l'une des caractéristiques fondamentales qui distingue la SA des sociétés de personnes.
                </p>

                <h3 className="font-semibold text-cyan-800">Caractéristiques générales des actions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-cyan-600 text-white">
                        <th className="border border-cyan-700 p-2 text-left">Caractéristique</th>
                        <th className="border border-cyan-700 p-2 text-left">Règle légale</th>
                        <th className="border border-cyan-700 p-2 text-left">Article</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Valeur nominale minimale", "10 000 FCFA par action", "Art. 745"],
                        ["Principe de cession", "Libre négociabilité (principe)", "Art. 764"],
                        ["Restrictions possibles", "Agrément, préemption, inaliénabilité", "Art. 764-765"],
                        ["Inaliénabilité maximale", "10 ans maximum", "Art. 765"],
                        ["Plafond ADP (sans droit de vote)", "Maximum 1/4 du capital", "Art. 750"],
                      ].map(([c, r, art], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-cyan-50"}>
                          <td className="border border-cyan-200 p-2 font-medium">{c}</td>
                          <td className="border border-cyan-200 p-2">{r}</td>
                          <td className="border border-cyan-200 p-2">{art}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 className="font-semibold text-cyan-800">Catégories d'actions</h3>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-white border border-cyan-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-cyan-600" />
                      <span className="font-semibold text-cyan-800 text-sm">Actions ordinaires</span>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      La catégorie de base. Chaque action donne un droit de vote (1 action = 1 voix en principe) et un droit proportionnel au dividende et au boni de liquidation.
                    </p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-amber-600" />
                      <span className="font-semibold text-amber-800 text-sm">Actions ADP</span>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      Actions à dividende prioritaire sans droit de vote (Art. 750). Avantage : dividende versé en priorité. Inconvénient : aucun droit de vote en AG. Plafond : 1/4 du capital total.
                    </p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-purple-800 text-sm">Actions de préférence</span>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      Introduites par la révision 2014 (Art. 778-1). Permettent des droits particuliers : vote double, dividende majoré, priorité de remboursement.
                    </p>
                  </div>
                </div>

                <h3 className="font-semibold text-cyan-800">Clauses de restriction à la cession</h3>
                <div className="space-y-2">
                  <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-cyan-400">
                    <p className="font-semibold text-gray-800 text-sm">Clause d'agrément (Art. 764)</p>
                    <p className="text-gray-600 text-xs mt-1">Toute cession à un tiers extérieur doit être préalablement approuvée par le CA ou l'AGO. Si l'agrément est refusé, la société ou les actionnaires doivent racheter les actions dans un délai fixé.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-teal-400">
                    <p className="font-semibold text-gray-800 text-sm">Clause de préemption (Art. 764)</p>
                    <p className="text-gray-600 text-xs mt-1">Avant de céder à un tiers, l'actionnaire doit d'abord proposer ses actions aux autres actionnaires (droit de préemption). Ce n'est qu'en cas de refus de tous les actionnaires que la cession au tiers peut intervenir.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-red-400">
                    <p className="font-semibold text-gray-800 text-sm">Clause d'inaliénabilité (Art. 765)</p>
                    <p className="text-gray-600 text-xs mt-1">Interdit temporairement à un actionnaire de céder ses actions. Durée maximale : 10 ans. Au-delà, la clause est réputée non écrite.</p>
                  </div>
                </div>
                {/* QCM de compréhension */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-cyan-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                  {[qcmQuestions[3], qcmQuestions[4]].map((q, i) => <QCMBlock key={i} q={q} />)}
                </div>
              </div>
            )}

            {/* ── LEÇON 3 ── */}
            {activeLecon === 2 && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  L'AUSCGIE offre aux fondateurs de SA un choix entre <strong>quatre structures de gouvernance</strong> distinctes, adaptées à des configurations d'actionnaires et des philosophies de gestion différentes.
                </p>

                <div className="bg-cyan-50 border-l-4 border-cyan-400 rounded-r-lg p-4">
                  <div className="flex gap-3 text-cyan-800">
                    <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Principe de liberté de gouvernance</p>
                      <p className="text-sm">Le droit OHADA laisse aux fondateurs de SA une liberté de choisir leur mode de gouvernance parmi les quatre structures prévues. Ce choix est structurant car il détermine l'organisation des pouvoirs.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-cyan-200 rounded-lg p-4 bg-cyan-50">
                  <h4 className="font-bold text-cyan-800 mb-2 flex items-center gap-2">
                    <span className="bg-cyan-600 text-white text-xs font-bold rounded px-2 py-0.5">Structure 1</span>
                    SA avec Conseil d'Administration (CA) et PDG
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    C'est la structure <strong>classique et la plus répandue</strong> en zone OHADA. Le PDG cumule la présidence du CA et la direction exécutive de la société.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead><tr className="bg-cyan-600 text-white">
                        <th className="border border-cyan-700 p-2 text-left">Paramètre</th>
                        <th className="border border-cyan-700 p-2 text-left">Règle</th>
                        <th className="border border-cyan-700 p-2 text-left">Article</th>
                      </tr></thead>
                      <tbody>
                        {[
                          ["Nombre d'administrateurs", "3 à 12 (15 en cas de fusion)", "Art. 416"],
                          ["Mandat", "Maximum 6 ans (statuts) / 2 ans (nommés en cours de vie)", "Art. 421"],
                          ["Réunion CA", "Au minimum 1 fois par trimestre", "Art. 442"],
                          ["Personne morale administrateur", "Admise, avec désignation d'un représentant permanent", "Art. 417"],
                        ].map(([p, r, art], i) => (
                          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-cyan-50"}>
                            <td className="border border-cyan-200 p-2 font-medium">{p}</td>
                            <td className="border border-cyan-200 p-2">{r}</td>
                            <td className="border border-cyan-200 p-2">{art}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <span className="bg-blue-600 text-white text-xs font-bold rounded px-2 py-0.5">Structure 2</span>
                    SA avec CA + Président distinct du DG (Art. 487-490)
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Variante de la structure classique où les fonctions de <strong>Président du CA</strong> et de <strong>Directeur Général</strong> sont dissociées. Le Président anime le CA et représente les actionnaires. Le DG assure la direction opérationnelle quotidienne.
                  </p>
                </div>

                <div className="border border-indigo-200 rounded-lg p-4 bg-indigo-50">
                  <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
                    <span className="bg-indigo-600 text-white text-xs font-bold rounded px-2 py-0.5">Structure 3</span>
                    SA avec Directoire et Conseil de Surveillance (Art. 469-490)
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    Inspirée du modèle allemand, cette structure sépare radicalement la <strong>direction</strong> (Directoire) du <strong>contrôle</strong> (Conseil de Surveillance).
                  </p>
                  <div className="overflow-x-auto mb-2">
                    <table className="w-full text-xs border-collapse">
                      <thead><tr className="bg-indigo-600 text-white">
                        <th className="border border-indigo-700 p-2 text-left">Organe</th>
                        <th className="border border-indigo-700 p-2 text-left">Composition</th>
                        <th className="border border-indigo-700 p-2 text-left">Mission</th>
                      </tr></thead>
                      <tbody>
                        <tr className="bg-white">
                          <td className="border border-indigo-200 p-2 font-medium">Directoire</td>
                          <td className="border border-indigo-200 p-2">1 à 5 membres (max)</td>
                          <td className="border border-indigo-200 p-2">Direction exécutive</td>
                        </tr>
                        <tr className="bg-indigo-50">
                          <td className="border border-indigo-200 p-2 font-medium">Conseil de Surveillance</td>
                          <td className="border border-indigo-200 p-2">3 à 12 membres</td>
                          <td className="border border-indigo-200 p-2">Contrôle permanent du Directoire</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-3">
                    <div className="flex gap-3 text-amber-800">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm mb-1">Incompatibilité stricte</p>
                        <p className="text-xs">L'article 469 : <strong>nul ne peut appartenir simultanément au Directoire et au Conseil de Surveillance</strong>. Toute violation entraîne la nullité de la nomination.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                    <span className="bg-green-600 text-white text-xs font-bold rounded px-2 py-0.5">Structure 4</span>
                    SA avec Administrateur Général (Art. 467-1)
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Cette structure <strong>simplifiée</strong> est réservée aux SA comptant au <strong>maximum 3 actionnaires</strong>. L'Administrateur Général unique cumule tous les pouvoirs de direction et d'administration. Fonctionnellement proche du gérant dans une SARL.
                  </p>
                </div>

                <h3 className="font-semibold text-cyan-800">Tableau comparatif des 4 structures</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-cyan-700 text-white">
                      <th className="border border-cyan-800 p-2 text-left">Structure</th>
                      <th className="border border-cyan-800 p-2 text-left">Organes</th>
                      <th className="border border-cyan-800 p-2 text-left">Actionnaires max</th>
                      <th className="border border-cyan-800 p-2 text-left">Profil idéal</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ["CA + PDG", "CA (3-12) + PDG", "Illimité", "SA classique, gestion unifiée"],
                        ["CA + Pdt + DG", "CA + 2 dirigeants distincts", "Illimité", "Bonne gouvernance, séparation"],
                        ["Directoire + CS", "Directoire (1-5) + CS (3-12)", "Illimité", "Grande SA, investisseurs institutionnels"],
                        ["Administrateur Général", "Un seul dirigeant", "3 max", "Petite SA familiale/fermée"],
                      ].map(([s, o, a, p], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-cyan-50"}>
                          <td className="border border-cyan-200 p-2 font-medium">{s}</td>
                          <td className="border border-cyan-200 p-2">{o}</td>
                          <td className="border border-cyan-200 p-2">{a}</td>
                          <td className="border border-cyan-200 p-2">{p}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* QCM de compréhension */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-cyan-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                  {[qcmQuestions[5], qcmQuestions[6]].map((q, i) => <QCMBlock key={i} q={q} />)}
                </div>
              </div>
            )}

            {/* ── LEÇON 4 ── */}
            {activeLecon === 3 && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  Les assemblées générales sont les organes souverains de la SA. L'AUSCGIE distingue deux types d'assemblées : l'<strong>AGO</strong> pour les décisions ordinaires et l'<strong>AGE</strong> pour les décisions extraordinaires modificatives des statuts.
                </p>

                <h3 className="font-semibold text-cyan-800">AGO vs AGE — Comparaison des règles</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-cyan-600 text-white">
                      <th className="border border-cyan-700 p-2 text-left">Critère</th>
                      <th className="border border-cyan-700 p-2 text-center">AGO</th>
                      <th className="border border-cyan-700 p-2 text-center">AGE</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ["Objet principal", "Approbation comptes, dividendes, nomination dirigeants/CAC", "Modification statuts, augmentation/réduction capital, fusion, dissolution"],
                        ["Quorum 1ère convocation", "1/4 des actions (Art. 549)", "1/2 des actions (Art. 553)"],
                        ["Quorum 2ème convocation", "Aucun quorum", "1/4 du capital"],
                        ["Majorité requise", "50% + 1 voix", "2/3 des voix exprimées"],
                        ["Article AUSCGIE", "Art. 546-551", "Art. 552-562"],
                      ].map(([c, ago, age], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-cyan-50"}>
                          <td className="border border-cyan-200 p-2 font-medium">{c}</td>
                          <td className="border border-cyan-200 p-2 text-center">{ago}</td>
                          <td className="border border-cyan-200 p-2 text-center">{age}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4">
                  <div className="flex gap-3 text-amber-800">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Exception à l'unanimité — Transformation en SNC</p>
                      <p className="text-sm">L'article 559 : la <strong>transformation d'une SA en SNC requiert l'unanimité absolue</strong> de tous les actionnaires. La transformation aggrave la responsabilité des associés (de limitée à illimitée et solidaire). Cette règle protège les actionnaires minoritaires.</p>
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-cyan-800">Le Commissaire aux Comptes (CAC) dans la SA</h3>
                <p>
                  Le CAC est une institution <strong>obligatoire dans toute SA</strong>, quelle que soit sa taille (Art. 694). Il garantit la fiabilité et la transparence des informations financières communiquées aux actionnaires et aux tiers.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-gray-600 text-white">
                      <th className="border border-gray-700 p-2 text-left">Paramètre</th>
                      <th className="border border-gray-700 p-2 text-left">Règle</th>
                      <th className="border border-gray-700 p-2 text-left">Article</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ["Obligatoire dans toute SA", "Oui, sans exception", "Art. 694"],
                        ["Organe de nomination", "Assemblée Générale Ordinaire (AGO)", "Art. 694"],
                        ["Durée du mandat", "6 exercices comptables", "Art. 694"],
                        ["Missions principales", "Certification des comptes, rapport spécial, révélation délits", "Art. 695-697"],
                      ].map(([p, r, art], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-200 p-2 font-medium">{p}</td>
                          <td className="border border-gray-200 p-2">{r}</td>
                          <td className="border border-gray-200 p-2">{art}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* QCM de compréhension */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-cyan-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                  {[qcmQuestions[7], qcmQuestions[8], qcmQuestions[9]].map((q, i) => <QCMBlock key={i} q={q} />)}
                </div>
              </div>
            )}

            {/* ── LEÇON 5 ── */}
            {activeLecon === 4 && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  La <strong>SAS</strong> est une innovation majeure introduite dans l'AUSCGIE par la révision du <strong>30 janvier 2014</strong>. Elle combine la responsabilité limitée des associés avec une <strong>liberté statutaire quasi totale</strong> dans l'organisation de la gouvernance.
                </p>

                <h3 className="font-semibold text-cyan-800">Caractéristiques fondamentales de la SAS</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-teal-600 text-white">
                      <th className="border border-teal-700 p-2 text-left">Caractéristique</th>
                      <th className="border border-teal-700 p-2 text-left">Règle SAS</th>
                      <th className="border border-teal-700 p-2 text-left">Différence avec SA</th>
                      <th className="border border-teal-700 p-2 text-left">Article</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ["Capital minimum", "Aucun", "SA : 10M FCFA (sans APE)", "Art. 853-2"],
                        ["Nombre d'associés", "Minimum 1 (SASU admise)", "SA : minimum 2", "Art. 853-1"],
                        ["APE", "Strictement interdite", "SA : autorisée (APE)", "Art. 853-4"],
                        ["Organe obligatoire", "Président uniquement", "SA : CA ou structure choisie", "Art. 853-6"],
                        ["Liberté statutaire", "Très étendue", "SA : encadrée par la loi", "Art. 853-1"],
                      ].map(([c, r, d, art], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-teal-50"}>
                          <td className="border border-teal-200 p-2 font-medium">{c}</td>
                          <td className="border border-teal-200 p-2">{r}</td>
                          <td className="border border-teal-200 p-2">{d}</td>
                          <td className="border border-teal-200 p-2">{art}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 rounded-r-lg p-4">
                  <div className="flex gap-3 text-green-800">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Protection renforcée des tiers (Art. 853-7)</p>
                      <p className="text-sm">Les limitations statutaires des pouvoirs du Président de la SAS sont <strong>inopposables aux tiers de bonne foi</strong>. Un tiers qui contracte avec le Président sans connaître ces restrictions est protégé.</p>
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-cyan-800">Seuils d'obligation du CAC dans la SAS</h3>
                <p>Le CAC est facultatif dans la SAS, sauf si la société dépasse <strong>au moins un</strong> des trois seuils suivants (Art. 853-19) :</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-teal-600 text-white">
                      <th className="border border-teal-700 p-2 text-left">Seuil</th>
                      <th className="border border-teal-700 p-2 text-left">Valeur</th>
                      <th className="border border-teal-700 p-2 text-left">Conséquence</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ["Total du bilan", "plus de 125 000 000 FCFA", "Obligation CAC"],
                        ["Chiffre d'affaires", "plus de 250 000 000 FCFA", "Obligation CAC"],
                        ["Effectif salarié", "plus de 50 salariés", "Obligation CAC"],
                      ].map(([s, v, c], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-teal-50"}>
                          <td className="border border-teal-200 p-2">{s}</td>
                          <td className="border border-teal-200 p-2 font-semibold">{v}</td>
                          <td className="border border-teal-200 p-2 text-red-700">{c}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 className="font-semibold text-cyan-800">Décisions réservées aux associés</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['Modification du capital', 'Fusion', 'Dissolution', 'Transformation', 'Approbation des comptes', 'Nomination du CAC (si requis)'].map(item => (
                    <div key={item} className="bg-teal-50 border border-teal-200 rounded p-2 text-xs text-center font-medium text-teal-800">
                      {item}
                    </div>
                  ))}
                </div>

                <h3 className="font-semibold text-cyan-800">La SASU — SAS Unipersonnelle</h3>
                <p>
                  La <strong>SASU</strong> est la SAS avec un seul associé. Elle permet à un entrepreneur individuel de bénéficier de la responsabilité limitée tout en conservant une totale liberté d'organisation. Dans la SASU, les décisions normalement réservées aux associés sont prises <strong>seul par l'associé unique</strong>, simplement constatées par écrit dans un registre spécial. Aucune formalité d'assemblée n'est requise.
                </p>

                <h3 className="font-semibold text-cyan-800">Clauses statutaires de protection — SAS (Art. 853-17 à 853-22)</h3>
                <p>
                  L'AUSCGIE autorise les statuts de la SAS à insérer des <strong>clauses restrictives de la cession ou de l'acquisition d'actions</strong>. Ces clauses sont des mécanismes contractuels destinés à protéger la cohésion des associés et à contrôler la composition de l'actionnariat.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-teal-600 text-white">
                      <th className="border border-teal-700 p-2 text-left">Clause</th>
                      <th className="border border-teal-700 p-2 text-left">Définition légale</th>
                      <th className="border border-teal-700 p-2 text-left">Durée max</th>
                      <th className="border border-teal-700 p-2 text-left">Article</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ["Inaliénabilité", "Interdit à un associé de céder ses actions pendant une durée limitée", "10 ans", "Art. 853-17"],
                        ["Agrément", "Soumet la cession d'actions à l'accord préalable des autres associés ou de la société", "Durée statutaire", "Art. 853-18"],
                        ["Préemption", "Oblige le cédant à proposer en priorité ses actions aux autres associés avant tout tiers", "Durée statutaire", "Art. 853-19"],
                        ["Exclusion", "Permet à la société de racheter les actions d'un associé dans les cas prévus par les statuts", "Durée statutaire", "Art. 853-20 à 853-22"],
                      ].map(([cl, def, dur, art], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-teal-50"}>
                          <td className="border border-teal-200 p-2 font-semibold text-teal-800">{cl}</td>
                          <td className="border border-teal-200 p-2">{def}</td>
                          <td className="border border-teal-200 p-2 text-center">{dur}</td>
                          <td className="border border-teal-200 p-2">{art}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4">
                  <div className="flex gap-3 text-amber-800">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Clause d'exclusion — conditions requises (Art. 853-20 à 853-22)</p>
                      <p className="text-sm">La clause d'exclusion doit obligatoirement : (1) prévoir les <strong>cas précis</strong> justifiant l'exclusion dans les statuts, (2) fixer les <strong>modalités de rachat</strong> des actions (prix, délai), (3) respecter le <strong>droit à la défense</strong> de l'associé visé avant toute décision. L'exclusion prononcée sans respecter ces conditions est nulle.</p>
                    </div>
                  </div>
                </div>
                {/* QCM de compréhension */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-cyan-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                  {[qcmQuestions[10], qcmQuestions[11]].map((q, i) => <QCMBlock key={i} q={q} />)}
                </div>
              </div>
            )}

            {/* ── LEÇON 6 ── */}
            {activeLecon === 5 && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  Etre actionnaire d'une SA, c'est détenir un titre qui confère un ensemble de <strong>droits légaux et conventionnels</strong>. Ces droits sont de deux ordres : les <strong>droits financiers</strong> et les <strong>droits politiques</strong>.
                </p>

                <h3 className="font-semibold text-cyan-800">Classification des droits des actionnaires</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-cyan-600 text-white">
                      <th className="border border-cyan-700 p-2 text-left">Catégorie</th>
                      <th className="border border-cyan-700 p-2 text-left">Droit</th>
                      <th className="border border-cyan-700 p-2 text-left">Modalité</th>
                      <th className="border border-cyan-700 p-2 text-left">Article</th>
                    </tr></thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="border border-cyan-200 p-2 font-medium" rowSpan={3}>Droits financiers</td>
                        <td className="border border-cyan-200 p-2">Droit au dividende</td>
                        <td className="border border-cyan-200 p-2">Proportionnel aux actions détenues, décidé par AGO</td>
                        <td className="border border-cyan-200 p-2">Art. 143-146</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border border-cyan-200 p-2">Droit au boni de liquidation</td>
                        <td className="border border-cyan-200 p-2">Partage de l'actif net après remboursement des créanciers</td>
                        <td className="border border-cyan-200 p-2">Art. 204</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border border-cyan-200 p-2">Droit préférentiel de souscription</td>
                        <td className="border border-cyan-200 p-2">Priorité à souscrire lors d'une augmentation de capital</td>
                        <td className="border border-cyan-200 p-2">Art. 573</td>
                      </tr>
                      <tr className="bg-cyan-50">
                        <td className="border border-cyan-200 p-2 font-medium" rowSpan={3}>Droits politiques</td>
                        <td className="border border-cyan-200 p-2">Droit de vote</td>
                        <td className="border border-cyan-200 p-2">1 action = 1 voix (sauf ADP)</td>
                        <td className="border border-cyan-200 p-2">Art. 539</td>
                      </tr>
                      <tr className="bg-cyan-50">
                        <td className="border border-cyan-200 p-2">Droit de participation aux AG</td>
                        <td className="border border-cyan-200 p-2">Tout actionnaire peut assister et prendre la parole</td>
                        <td className="border border-cyan-200 p-2">Art. 535</td>
                      </tr>
                      <tr className="bg-cyan-50">
                        <td className="border border-cyan-200 p-2">Droit d'information</td>
                        <td className="border border-cyan-200 p-2">Consultation des documents sociaux dès le 15e jour avant AGO</td>
                        <td className="border border-cyan-200 p-2">Art. 525</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border border-cyan-200 p-2 font-medium" rowSpan={2}>Droits de protection</td>
                        <td className="border border-cyan-200 p-2">Expertise de gestion</td>
                        <td className="border border-cyan-200 p-2">Actionnaires détenant au moins 1/5 du capital peuvent demander au juge</td>
                        <td className="border border-cyan-200 p-2">Art. 159 al.2</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border border-cyan-200 p-2">Action en nullité</td>
                        <td className="border border-cyan-200 p-2">Prescription de 3 ans à compter de la décision attaquée</td>
                        <td className="border border-cyan-200 p-2">Art. 247</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-cyan-50 border-l-4 border-cyan-400 rounded-r-lg p-4">
                  <div className="flex gap-3 text-cyan-800">
                    <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Expertise de gestion — mécanisme de protection (Art. 159 al. 2)</p>
                      <p className="text-sm">Les actionnaires représentant au moins <strong>1/5 (20%) du capital</strong> peuvent saisir le président du tribunal pour demander la désignation d'un ou plusieurs experts chargés d'examiner une ou plusieurs opérations de gestion. Le simple doute sur des opérations suspectes suffit.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border-l-4 border-slate-400 rounded-r-lg p-4">
                  <div className="flex gap-3 text-slate-800">
                    <Scale className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Prescription de l'action en nullité (Art. 247)</p>
                      <p className="text-sm">L'action en nullité des décisions prises par les organes de la SA se prescrit par <strong>3 ans</strong> à compter de la date à laquelle la décision est opposable à celui qui en poursuit la nullité. Passé ce délai, la décision est consolidée.</p>
                    </div>
                  </div>
                </div>
                {/* QCM de compréhension */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-cyan-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                  {[qcmQuestions[12], qcmQuestions[13], qcmQuestions[14]].map((q, i) => <QCMBlock key={i} q={q} />)}
                </div>
              </div>
            )}

            {/* ── LEÇON 7 : ACTIONS DE PRÉFÉRENCE ── */}
            {activeLecon === 6 && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  Les <strong>actions de préférence (ADP)</strong> sont définies par l'article 778-1 de l'AUSCGIE comme des actions auxquelles sont attachés des droits particuliers de toute nature, à titre temporaire ou permanent. Elles permettent d'adapter la structure du capital aux besoins de financement et de gouvernance de la SA.
                </p>

                <h3 className="font-semibold text-cyan-800">Droits pouvant être attachés aux actions de préférence</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-cyan-600 text-white">
                      <th className="border border-cyan-700 p-2 text-left">Type de droit</th>
                      <th className="border border-cyan-700 p-2 text-left">Contenu</th>
                      <th className="border border-cyan-700 p-2 text-left">Article</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ["Droit financier renforcé", "Dividende prioritaire ou cumulatif supérieur aux actions ordinaires", "Art. 778-1"],
                        ["Droit de vote multiple", "Plusieurs voix par action (ex. 2 voix, 3 voix par action ADP)", "Art. 778-1"],
                        ["Droit de vote suspendu", "Actions sans droit de vote en contrepartie d'avantages financiers", "Art. 778-3"],
                        ["Droit de liquidation prioritaire", "Priorité de remboursement sur le boni de liquidation", "Art. 778-1"],
                        ["Droit de conversion", "Possibilité de conversion en actions ordinaires selon des conditions fixées", "Art. 778-5"],
                        ["Droit de rachat", "Droit d'exiger le rachat de ses actions par la société dans certains cas", "Art. 778-8"],
                      ].map(([typ, cont, art], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-cyan-50"}>
                          <td className="border border-cyan-200 p-2 font-semibold text-cyan-800">{typ}</td>
                          <td className="border border-cyan-200 p-2">{cont}</td>
                          <td className="border border-cyan-200 p-2">{art}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 className="font-semibold text-cyan-800">Règles de création des actions de préférence (Art. 778-2 à 778-6)</h3>
                <div className="space-y-2">
                  {[
                    { titre: "Compétence de l'AGE", contenu: "La création des actions de préférence relève exclusivement de l'Assemblée Générale Extraordinaire. Elle modifie les statuts et la répartition des droits entre actionnaires.", art: "Art. 778-2" },
                    { titre: "Rapport du CAC", contenu: "L'AGE statue sur la création après le dépôt d'un rapport spécial du Commissaire aux comptes attestant que les avantages accordés ne portent pas une atteinte injustifiée aux droits des actionnaires ordinaires.", art: "Art. 778-4" },
                    { titre: "Actions existantes ou nouvelles", contenu: "Les ADP peuvent être créées par émission d'actions nouvelles ou par conversion d'actions ordinaires existantes, sous réserve de l'accord des actionnaires concernés.", art: "Art. 778-5" },
                    { titre: "Catégorie d'actions", contenu: "Les ADP constituent une catégorie distincte. Toute modification des droits attachés à une catégorie nécessite l'accord de l'AGE et de l'assemblée spéciale des porteurs d'ADP concernés.", art: "Art. 778-6" },
                  ].map((item, i) => (
                    <div key={i} className="bg-cyan-50 border border-cyan-200 rounded-lg p-3">
                      <p className="font-semibold text-cyan-800 text-xs mb-1">{item.titre} — <span className="font-normal text-cyan-600">{item.art}</span></p>
                      <p className="text-xs text-gray-700">{item.contenu}</p>
                    </div>
                  ))}
                </div>

                <h3 className="font-semibold text-cyan-800">Rachat et annulation des actions de préférence (Art. 778-8 à 778-15)</h3>
                <p>
                  Les statuts peuvent prévoir que la société ou l'actionnaire dispose d'un <strong>droit de rachat</strong> des ADP. Ce rachat peut être :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { label: "Rachat à l'initiative de la société", desc: "La société rachète les ADP aux conditions statutaires. Ces actions sont alors annulées (réduction de capital) ou conservées à titre d'autocontrôle dans la limite légale.", art: "Art. 778-8" },
                    { label: "Rachat à l'initiative du porteur", desc: "L'actionnaire porteur d'ADP peut exiger le rachat de ses titres par la société dans les conditions et délais fixés par les statuts.", art: "Art. 778-9" },
                    { label: "Prix de rachat", desc: "Le prix de rachat est déterminé par les statuts ou, à défaut d'accord, par un expert désigné par le président du tribunal.", art: "Art. 778-10" },
                    { label: "Annulation après rachat", desc: "Les ADP rachetées par la société peuvent être annulées par l'AGE dans le cadre d'une réduction de capital, ou converties en actions ordinaires.", art: "Art. 778-15" },
                  ].map((item, i) => (
                    <div key={i} className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                      <p className="font-semibold text-teal-800 text-xs mb-1">{item.label} <span className="font-normal text-teal-600">({item.art})</span></p>
                      <p className="text-xs text-gray-700">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4">
                  <div className="flex gap-3 text-amber-800">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Point clé — ADP sans droit de vote (Art. 778-3)</p>
                      <p className="text-sm">Les actions de préférence sans droit de vote ne peuvent représenter <strong>plus de la moitié du capital social</strong> dans les SA non cotées, ni plus d'un quart dans les SA cotées. Si ce seuil est dépassé, les ADP sans droit de vote retrouvent automatiquement le droit de vote jusqu'au retour sous le seuil.</p>
                    </div>
                  </div>
                </div>
                {/* QCM de compréhension */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-cyan-700 uppercase tracking-wide">Vérifiez votre compréhension</p>
                  {[qcmQuestions[4], qcmQuestions[3]].map((q, i) => <QCMBlock key={i} q={q} />)}
                </div>
              </div>
            )}

            {/* Navigation leçons */}
            <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => setActiveLecon(l => Math.max(0, l - 1))}
                disabled={activeLecon === 0}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeLecon === 0
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-cyan-700 hover:bg-cyan-50"
                )}
              >
                <ArrowLeft className="w-4 h-4" /> Précédente
              </button>
              <button
                onClick={() => setActiveLecon(l => Math.min(lecons.length - 1, l + 1))}
                disabled={activeLecon === lecons.length - 1}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeLecon === lecons.length - 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "bg-cyan-600 text-white hover:bg-cyan-700"
                )}
              >
                Suivante <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════ */}
      {/* ── ONGLET QCM ── */}
      {/* ══════════════════════════════════════ */}
      {activeTab === 'qcm' && !isEtudiant && (
        <div className="space-y-4">
          <QCMPageUnique questions={qcmQuestions as unknown as QCMChapitre[]} couleurAccent="cyan" />
        </div>
      )}

      {/* ══════════════════════════════════════ */}
      {/* ── ONGLET CAS PRATIQUES ── */}
      {/* ══════════════════════════════════════ */}
      {activeTab === 'cas' && (
        <div className="space-y-3">
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <h2 className="font-display font-bold text-gray-800 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-cyan-600" />
              Cas Pratiques — SA et SAS (8 cas)
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Exercices d'application sur la constitution, les actions, la gouvernance, les assemblées et la SAS.
            </p>
          </div>
          {casPratiques.map((cas, i) => (
            <CasPratiqueBlock key={cas.id} cas={cas} index={i} />
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════ */}
      {/* ── ONGLET DEVOIR ── */}
      {/* ══════════════════════════════════════ */}
      {activeTab === 'devoir' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          {!isEtudiant ? (
            <DevoirChapitreCreateur
              chapitreId="ue2-ch4"
              chapitreNom="Chapitre 4 - Societe Anonyme (SA) et SAS"
              questions={qcmQuestions as unknown as import('@/lib/db').QCMChapitre[]}
              coursId="ue2-droit-societes"
              casPratiquesExistants={casPratiques.map(cp => ({
                id: cp.id,
                titre: cp.titre,
                enonce: cp.contexte + '\n' + cp.questions.map((q: { q: string; r: string }) => q.q).join('\n'),
                corrigeType: cp.questions.map((q: { q: string; r: string }) => q.r).join('\n'),
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
        className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
      >
        <CheckCircle2 className="w-5 h-5" />
        Terminer le chapitre 4
      </button>

      {/* Sources */}
      <p className="text-xs text-muted-foreground/60 text-center">
        Sources : AUSCGIE révisé 30 janvier 2014 — Art. 385-412, 414-490, 516-562, 694-697, 744-778-1, 853-1 à 853-23
      </p>
    </div>
  )
}
