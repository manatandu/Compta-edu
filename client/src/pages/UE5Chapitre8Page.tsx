import React, { useState } from 'react'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import { BookOpen, ChevronDown, ChevronUp, CheckCircle2, XCircle, ArrowLeft, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { InfoTooltip } from '@/components/InfoTooltip'
import DevoirChapitreCreateur, { CasPratiqueExistant, versCasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
import QCMPageUnique from '@/components/QCMPageUnique'
import { QCMChapitre } from '@/lib/db'
import { useUser } from '@/lib/userContext'

// ============================================================
// TYPES
// ============================================================
interface Option { id: 'a' | 'b' | 'c' | 'd' | 'e'; texte: string }
interface QCMData {
  id: string; question: string; options: Option[]
  reponse: 'a' | 'b' | 'c' | 'd' | 'e'; explication: string
}
interface EtudeCas {
  titre: string; contexte: string
  questions: { num: string; enonce: string; correction: string }[]
}

// ============================================================
// QCM PAR LEÇON (2 par leçon)
// ============================================================
const QCM_LECONS: Record<string, QCMData[]> = {
  L1: [
    {
      id: 'l1q1',
      question: "Selon l'article 3 point 19 de la LOFIP, qu'est-ce que l'édit budgétaire ?",
      options: [
        { id: 'a', texte: "Un acte du Gouvernement provincial fixant les recettes et dépenses sans vote de l'Assemblée" },
        { id: 'b', texte: "L'acte par lequel sont prévues et autorisées, par l'Assemblée provinciale, les ressources et charges provinciales d'un exercice budgétaire" },
        { id: 'c', texte: 'Un acte par lequel les organes délibérants des ETD autorisent les charges locales' },
        { id: 'd', texte: 'Une loi de finances adoptée par le Parlement national pour les provinces' },
        { id: 'e', texte: 'Un arrêté ministériel fixant les dotations des provinces' },
      ],
      reponse: 'b',
      explication: "L'article 3 point 19 LOFIP définit l'édit budgétaire comme « l'acte par lequel sont prévues et autorisées, par l'Assemblée provinciale, les ressources et les charges provinciales d'un exercice budgétaire. Il est la traduction financière annuelle du programme d'action de développement de la province. »",
    },
    {
      id: 'l1q2',
      question: "Selon l'article 3 point 5 LOFIP, qu'est-ce que le budget provincial ?",
      options: [
        { id: 'a', texte: "Le budget voté par l'Assemblée nationale pour les provinces" },
        { id: 'b', texte: 'Un document distinct intégrant exclusivement les recettes fiscales de la province' },
        { id: 'c', texte: 'Un document contenant les prévisions des recettes et dépenses des ETD intégrées dans celles de la province' },
        { id: 'd', texte: 'La consolidation des budgets des 26 provinces au niveau national' },
        { id: 'e', texte: "Le plan triennal d'investissement de la province" },
      ],
      reponse: 'c',
      explication: "L'article 3 point 5 LOFIP définit le budget provincial comme « un document contenant les prévisions des recettes et des dépenses des entités territoriales décentralisées intégrées dans celles de la province. »",
    },
  ],
  L2: [
    {
      id: 'l2q1',
      question: "Conformément à l'article 175 de la Constitution et à l'article 218 LOFIP, quelle est la quote-part des provinces dans les recettes à caractère national ?",
      options: [
        { id: 'a', texte: '30% des recettes à caractère national' },
        { id: 'b', texte: '50% des recettes à caractère national' },
        { id: 'c', texte: '10% des recettes à caractère national' },
        { id: 'd', texte: '40% des recettes à caractère national retenus à la source' },
        { id: 'e', texte: '60% des recettes à caractère national' },
      ],
      reponse: 'd',
      explication: "L'article 175 de la Constitution et l'article 218 LOFIP disposent que les provinces ont droit à quarante pour cent (40%) des recettes à caractère national retenus à la source. Dans le LF 2026 (Loi n° 25/060), cette rétrocession s'élève à 7.694,5 milliards FC.",
    },
    {
      id: 'l2q2',
      question: "Selon l'article 3 point 39 LOFIP, qu'est-ce que la « retenue à la source » ?",
      options: [
        { id: 'a', texte: 'La retenue fiscale oprée par la DGI sur les salaires des agents provinciaux' },
        { id: 'b', texte: "L'opération bancaire qui consiste à créditer le compte d'une province génératrice des recettes d'une quotité de 40% lors du nivellement au profit du Compte général du Trésor" },
        { id: 'c', texte: 'Un mécanisme de compensation entre provinces déficitaires et provinces excédentaires' },
        { id: 'd', texte: 'La retenue effectuée par le Ministre des Finances sur les recettes douanières' },
        { id: 'e', texte: 'Un transfert mensuel du Trésor central vers les provinces' },
      ],
      reponse: 'b',
      explication: "L'article 3 point 39 LOFIP définit la retenue à la source comme « l'opération bancaire qui consiste à créditer le compte d'une province génératrice des recettes, d'une quotité de 40% sur le montant total recouvré au titre des recettes à caractère national lors du nivellement au profit du compte général du Trésor. »",
    },
  ],
  L3: [
    {
      id: 'l3q1',
      question: "Conformément à l'article 181 de la Constitution et à l'article 222 LOFIP, quel est le taux d'alimentation de la Caisse nationale de péréquation ?",
      options: [
        { id: 'a', texte: '5% des recettes à caractère national' },
        { id: 'b', texte: '40% des recettes des provinces' },
        { id: 'c', texte: '10% de la totalité des recettes de catégories A et B' },
        { id: 'd', texte: '15% des recettes de la DGI uniquement' },
        { id: 'e', texte: '20% des recettes douanières' },
      ],
      reponse: 'c',
      explication: "L'article 222 LOFIP dispose que « conformément à l'article 181 de la Constitution, les provinces bénéficient des ressources provenant de la Caisse nationale de péréquation dont le budget est alimenté à concurrence de dix pour cent de la totalité des recettes de catégorie A et B. » Dans le LF 2026, ce montant est de 744,6 milliards FC.",
    },
    {
      id: 'l3q2',
      question: "Selon l'article 219 LOFIP, quelles recettes constituent la catégorie A des recettes à caractère national ?",
      options: [
        { id: 'a', texte: "Les recettes de douanes et d'accises, et les impôts sur les grandes entreprises" },
        { id: 'b', texte: 'Les recettes administratives, judiciaires et domaniales collectées au niveau du Pouvoir central' },
        { id: 'c', texte: 'Les recettes des pétroliers producteurs et des participations' },
        { id: 'd', texte: 'Les recettes administratives, judiciaires et domaniales collectées en province et les impôts perçus à leur lieu de réalisation' },
        { id: 'e', texte: 'Uniquement les recettes fiscales gérées par la DGI' },
      ],
      reponse: 'd',
      explication: "L'article 219 LOFIP classe dans la catégorie A : les recettes administratives, judiciaires et domaniales collectées en province, et les recettes des impôts perçus à leur lieu de réalisation. La catégorie B comprend les recettes douanières, les impôts sur les grandes entreprises et les recettes des pétroliers.",
    },
  ],
  L4: [
    {
      id: 'l4q1',
      question: "Selon l'article 3 point 18 LOFIP, qu'est-ce que la décision budgétaire ?",
      options: [
        { id: 'a', texte: "L'acte par lequel le Gouvernement national alloue des fonds aux ETD" },
        { id: 'b', texte: "L'acte par lequel sont prévues et autorisées, par les organes délibérants des ETD, les ressources et charges locales d'un exercice budgétaire" },
        { id: 'c', texte: 'Un arrêté du Gouverneur de province fixant les budgets des communes' },
        { id: 'd', texte: 'La décision du Ministre des Finances attribuant des crédits aux chefferies' },
        { id: 'e', texte: 'Un acte réglementaire du Premier ministre autorisant les dépenses locales' },
      ],
      reponse: 'b',
      explication: "L'article 3 point 18 LOFIP définit la décision budgétaire comme « l'acte par lequel sont prévues et autorisées, par les organes délibérants des entités territoriales décentralisées, les ressources et les charges locales d'un exercice budgétaire. Il est la traduction financière annuelle du programme d'action de développement de l'entité concernée. »",
    },
    {
      id: 'l4q2',
      question: "L'article 135 LOFIP impose que l'édit budgétaire ou la décision budgétaire de l'année contienne :",
      options: [
        { id: 'a', texte: "Uniquement les recettes fiscales et les dépenses d'investissement" },
        { id: 'b', texte: "Toutes les ressources et toutes les charges, traduisant les programmes d'action du Gouvernement provincial ou du Collège exécutif de l'ETD, avec évaluation des objectifs et résultats attendus" },
        { id: 'c', texte: 'Seulement les transferts reçus du Pouvoir central' },
        { id: 'd', texte: 'Les crédits alloués par la loi de finances nationale aux provinces' },
        { id: 'e', texte: "Exclusivement les dépenses de fonctionnement de l'administration provinciale" },
      ],
      reponse: 'b',
      explication: "L'article 135 LOFIP impose que l'édit budgétaire ou la décision budgétaire contienne, pour une année civile, toutes les ressources et toutes les charges qui « traduisent à travers un document unique les programmes d'actions du Gouvernement provincial ou du Collège exécutif de l'ETD, ainsi que leurs évaluations en termes d'objectifs et de résultats attendus. »",
    },
  ],
  L5: [
    {
      id: 'l5q1',
      question: "Selon l'article 223 LOFIP et l'article 175 de la Constitution, la consolidation du budget de l'État avec les budgets provinciaux s'effectue :",
      options: [
        { id: 'a', texte: 'Par arrêté ministériel, publié au Journal officiel, chaque trimestre' },
        { id: 'b', texte: "Par une loi annuelle, à déposer au plus tard le 31 mai de l'année suivante et à voter avant le 15 juin" },
        { id: 'c', texte: "Par ordonnance-loi du Président de la République en fin d'exercice" },
        { id: 'd', texte: "Par la loi de finances rectificative de l'année en cours" },
        { id: 'e', texte: 'Par un rapport annuel du Ministre du Budget publié avant le 30 juin' },
      ],
      reponse: 'b',
      explication: "L'article 223 LOFIP dispose que le Budget du Pouvoir central et ceux des provinces sont « consolidés chaque année par une loi ». L'article 224 précise que le projet de loi de consolidation doit être déposé au plus tard le 31 mai de l'année suivante, pour un vote avant le 15 juin.",
    },
    {
      id: 'l5q2',
      question: "Conformément à l'article 221 LOFIP, pour les recettes de la catégorie B, le 40% de retenue au profit des provinces est réparti selon :",
      options: [
        { id: 'a', texte: 'La superficie géographique et le niveau de développement de chaque province' },
        { id: 'b', texte: "La capacité contributive et le poids démographique, selon les modalités d'un arrêté conjoint des ministres des Finances et du Budget" },
        { id: 'c', texte: 'Exclusivement la production pétrolière de chaque province' },
        { id: 'd', texte: 'Également entre les 26 provinces, indépendamment de leur taille' },
        { id: 'e', texte: "Le volume des dépenses inscrites dans l'édit budgétaire de chaque province" },
      ],
      reponse: 'b',
      explication: "L'article 221 LOFIP dispose que la retenue de 40% sur les recettes de catégorie B s'effectue « au profit des provinces, suivant leur capacité contributive et leur poids démographique au regard des modalités déterminées, conformément à un arrêté conjoint des ministres du Pouvoir central ayant les finances et le budget dans leurs attributions respectives. »",
    },
  ],
}

// ============================================================
// QCM GLOBAUX (15)
// ============================================================
const QCM_GLOBAUX: QCMData[] = [
  {
    id: 'g1',
    question: "L'article 217 LOFIP dispose que les rapports entre le Pouvoir central et les provinces sont fixés suivant les principes de base édictés par :",
    options: [
      { id: 'a', texte: 'Les articles 1er, 2 et 3 de la LOFIP uniquement' },
      { id: 'b', texte: 'Les articles 171, 175, 202, 203 et 204 de la Constitution' },
      { id: 'c', texte: 'Les articles 88 à 115 de la LOFIP' },
      { id: 'd', texte: 'Le Protocole de Lusaka de 1999' },
      { id: 'e', texte: 'La loi organique sur les ETD de 2008' },
    ],
    reponse: 'b',
    explication: "L'article 217 LOFIP renvoie expressément aux « articles 171, 175, 202, 203 et 204 de la Constitution » comme fondements constitutionnels des rapports financiers entre le Pouvoir central et les provinces.",
  },
  {
    id: 'g2',
    question: "Selon l'article 220 LOFIP, pour les recettes de catégorie A, la retenue de 40% est portée au compte de la province :",
    options: [
      { id: 'a', texte: 'Par décision du Gouverneur de province, après approbation du Ministre du Budget' },
      { id: 'b', texte: 'Trimestriellement, après audit de la Cour des comptes' },
      { id: 'c', texte: 'Lors du nivellement au profit du Compte général du Trésor, sur instruction permanente du Ministre des Finances' },
      { id: 'd', texte: "Annuellement, lors de la clôture de l'exercice budgétaire" },
      { id: 'e', texte: "Sur demande de l'Assemblée provinciale après vote de l'édit budgétaire" },
    ],
    reponse: 'c',
    explication: "L'article 220 LOFIP précise que pour les recettes de catégorie A, la retenue de 40% est portée au compte de la province génératrice de la recette « lors du nivellement au profit du Compte général du Trésor, sur instruction permanente du ministre ayant les finances dans ses attributions. »",
  },
  {
    id: 'g3',
    question: "L'article 221 LOFIP accorde à la province productrice de pétrole, à titre compensatoire, une allocation spéciale de :",
    options: [
      { id: 'a', texte: '40% des recettes pétrolières de la catégorie B' },
      { id: 'b', texte: "5% de la part revenant à l'ensemble des provinces" },
      { id: 'c', texte: '10% de la part revenant aux provinces sur les recettes pétrolières incluses dans la catégorie B' },
      { id: 'd', texte: '20% des recettes pétrolières, affectés à la réparation des dommages environnementaux' },
      { id: 'e', texte: '15% alloués par la loi de finances annuelle' },
    ],
    reponse: 'c',
    explication: "L'article 221 al. 2 LOFIP dispose : « S'agissant des recettes pétrolières inclues dans la catégorie B, une allocation de 10% de la part revenant aux provinces est attribuée à la province productrice à titre compensatoire pour réparer notamment les dommages d'environnement résultant de l'extraction. »",
  },
  {
    id: 'g4',
    question: "L'article 137 LOFIP exige que l'édit budgétaire fixe, par programme :",
    options: [
      { id: 'a', texte: 'Uniquement le plafond des emplois rémunérés, sans indication de crédits' },
      { id: 'b', texte: "Le montant des autorisations d'engagement et des crédits de paiement, ainsi que les plafonds des autorisations d'emplois par ministère et Institution provinciaux" },
      { id: 'c', texte: 'Seulement les dépenses de fonctionnement sans les investissements' },
      { id: 'd', texte: 'Le seul montant global des dépenses sans détail par programme' },
      { id: 'e', texte: 'Les crédits alloués par le Gouverneur après consultation du Parlement provincial' },
    ],
    reponse: 'b',
    explication: "L'article 137 LOFIP dispose que l'édit budgétaire « fixe pour le budget de la province, par programme, le montant des autorisations d'engagement et des crédits de paiement. Il fixe, par ministère et Institution au niveau provincial et par budget annexe, les plafonds des autorisations d'emplois rémunérés, le montant des autorisations d'engagement et des crédits de paiement ouverts. »",
  },
  {
    id: 'g5',
    question: "Selon l'article 136 LOFIP, l'édit budgétaire doit comporter :",
    options: [
      { id: 'a', texte: 'Uniquement les dispositions relatives à la perception des recettes fiscales' },
      { id: 'b', texte: "Les dispositions relatives à la perception des recettes de toute nature, les ressources affectant l'équilibre budgétaire, les affectations de recettes, et l'évaluation de chaque nature de recettes" },
      { id: 'c', texte: 'Seulement les recettes douanières et les taxes provinciales' },
      { id: 'd', texte: 'Les crédits de fonctionnement sans les opérations financières' },
      { id: 'e', texte: 'Un résumé des recettes sans détail par nature de recette' },
    ],
    reponse: 'b',
    explication: "L'article 136 LOFIP impose que l'édit budgétaire comporte des dispositions relatives à la perception des recettes de toute nature, celles relatives aux ressources affectant l'équilibre budgétaire, toutes les dispositions relatives aux affectations de recettes, et l'évaluation de chaque nature de recettes budgétaires de la province.",
  },
  {
    id: 'g6',
    question: "L'article 132 LOFIP définit l'édit budgétaire et la décision budgétaire comme :",
    options: [
      { id: 'a', texte: 'Des actes administratifs du Gouverneur et du Maire, soumis à tutelle du Ministre des Finances' },
      { id: 'b', texte: "Des actes par lesquels sont prévus et autorisés, par les organes délibérants respectifs, les ressources et charges provinciales et locales d'un exercice budgétaire" },
      { id: 'c', texte: 'Des décrets provinciaux pris en Conseil des ministres provincial' },
      { id: 'd', texte: "Des lois organiques adoptées par l'Assemblée nationale pour les provinces" },
      { id: 'e', texte: 'Des ordonnances-lois du Président de la République déléguées aux provinces' },
    ],
    reponse: 'b',
    explication: "L'article 132 LOFIP dispose que l'édit budgétaire et la décision budgétaire sont « des actes par lesquels sont prévus et autorisés, par les organes délibérants respectifs, les ressources et les charges provinciales et locales d'un exercice budgétaire. »",
  },
  {
    id: 'g7',
    question: "Conformément à l'article 175 de la Constitution RDC, comment le budget du Pouvoir central et ceux des provinces sont-ils consolidés ?",
    options: [
      { id: 'a', texte: 'Par une ordonnance présidentielle signée avant le 31 décembre de chaque année' },
      { id: 'b', texte: "Par une loi annuelle de consolidation, conformément à la Constitution et à l'article 223 LOFIP" },
      { id: 'c', texte: 'Par un arrêté conjoint du Ministre des Finances et du Ministre du Budget' },
      { id: 'd', texte: 'Par un rapport de la Cour des comptes déposé au Sénat' },
      { id: 'e', texte: "Par un acte de l'Assemblée provinciale avant le 30 avril de l'année suivante" },
    ],
    reponse: 'b',
    explication: "L'article 175 de la Constitution dispose que le budget est consolidé par une loi. L'article 223 LOFIP précise que « le Budget du Pouvoir central et ceux des provinces sont consolidés chaque année par une loi. » L'article 224 LOFIP fixe le délai de dépôt au 31 mai et de vote au 15 juin.",
  },
  {
    id: 'g8',
    question: 'Dans le LF 2026 (Loi n° 25/060 du 29 décembre 2025), quel est le montant de la rétrocession aux provinces au titre du 40% constitutionnel ?',
    options: [
      { id: 'a', texte: '3.500 milliards FC' },
      { id: 'b', texte: '10.000 milliards FC' },
      { id: 'c', texte: '7.694,5 milliards FC' },
      { id: 'd', texte: '5.200 milliards FC' },
      { id: 'e', texte: '9.800 milliards FC' },
    ],
    reponse: 'c',
    explication: "L'article 8 de la Loi de Finances 2026 (n° 25/060 du 29 décembre 2025) fixe la rétrocession aux provinces au titre des 40% constitutionnels à 7.694,5 milliards FC, conformément à l'article 175 de la Constitution et aux articles 218-221 LOFIP.",
  },
  {
    id: 'g9',
    question: "Quel montant le LF 2026 (Loi n° 25/060) affecte-t-il à la Caisse nationale de péréquation, conformément à l'article 222 LOFIP ?",
    options: [
      { id: 'a', texte: '1.500 milliards FC' },
      { id: 'b', texte: '744,6 milliards FC' },
      { id: 'c', texte: '2.000 milliards FC' },
      { id: 'd', texte: '500 milliards FC' },
      { id: 'e', texte: '300 milliards FC' },
    ],
    reponse: 'b',
    explication: "L'article 9 du LF 2026 (n° 25/060 du 29 décembre 2025) fixe la dotation de la Caisse nationale de péréquation à 744,6 milliards FC, conformément à l'article 181 de la Constitution et à l'article 222 LOFIP.",
  },
  {
    id: 'g10',
    question: "L'article 218 al. 2 LOFIP prévoit que le Pouvoir central peut retenir de la quote-part provinciale le coût des compétences non transférées. Dans quelles conditions cette retenue peut-elle s'exercer ?",
    options: [
      { id: 'a', texte: 'Par simple arrêté du Ministre des Finances, sans condition particulière' },
      { id: 'b', texte: "Dans les conditions définies par une loi de finances, conformément à l'article 218 al. 2 LOFIP" },
      { id: 'c', texte: 'Par ordonnance-loi après avis du Sénat' },
      { id: 'd', texte: "Par décision de la Cour constitutionnelle sur requête d'une province" },
      { id: 'e', texte: 'Par arrêté conjoint des 26 Gouverneurs de province' },
    ],
    reponse: 'b',
    explication: "L'article 218 al. 2 LOFIP précise que le Pouvoir central peut retenir de la quote-part provinciale le coût des compétences et responsabilités non transférées « dans les conditions définies par une loi de finances ». Cette retenue ne peut donc pas être effectuée par simple acte réglementaire.",
  },
  {
    id: 'g11',
    question: "L'article 175 de la Constitution RDC consacre le principe de la décentralisation financière. Ce principe implique notamment que :",
    options: [
      { id: 'a', texte: 'Les provinces dépendent entièrement des transferts du Pouvoir central sans ressources propres' },
      { id: 'b', texte: 'Le budget du Pouvoir central et ceux des provinces sont consolidés chaque année par une loi, et les provinces reçoivent 40% des recettes à caractère national' },
      { id: 'c', texte: 'Les provinces adoptent librement leur budget sans contrôle de la Cour des comptes' },
      { id: 'd', texte: 'Le Parlement national vote le budget de chaque province en session extraordinaire' },
      { id: 'e', texte: "Les ETD sont financées directement par l'Union européenne et les bailleurs internationaux" },
    ],
    reponse: 'b',
    explication: "L'article 175 de la Constitution consacre deux volets : d'abord la consolidation annuelle des budgets « du Pouvoir central et ceux des provinces » par une loi, et ensuite le droit des provinces à 40% des recettes à caractère national, retenu à la source conformément à l'article 218 LOFIP.",
  },
  {
    id: 'g12',
    question: "Selon l'article 224 LOFIP, le projet de loi de consolidation du budget du Pouvoir central avec ceux des provinces doit être déposé sur le bureau de l'Assemblée nationale :",
    options: [
      { id: 'a', texte: "Au plus tard le 15 janvier de l'année en cours" },
      { id: 'b', texte: "Au plus tard le 30 septembre de l'année en cours" },
      { id: 'c', texte: "Au plus tard le 31 mai de l'année suivante, pour vote avant le 15 juin" },
      { id: 'd', texte: "Au plus tard le 31 mars de l'année suivante, pour vote avant le 30 avril" },
      { id: 'e', texte: "Au plus tard le 31 décembre de l'année en cours" },
    ],
    reponse: 'c',
    explication: "L'article 224 LOFIP précise que « un projet de loi de consolidation du budget du Pouvoir central avec ceux des provinces est déposé au plus tard le 31 mai de l'année suivante sur le bureau de l'Assemblée nationale pour être voté au plus tard le 15 juin. »",
  },
  {
    id: 'g13',
    question: "Les types d'ETD (Entités Territoriales Décentralisées) en RDC, dont les décisions budgétaires sont visées par l'article 3 pt. 18 LOFIP, sont :",
    options: [
      { id: 'a', texte: 'Les ministères provinciaux, les services déconcentrés et les établissements publics' },
      { id: 'b', texte: 'Les communes, les secteurs et les chefferies' },
      { id: 'c', texte: 'Les provinces, les districts et les territoires' },
      { id: 'd', texte: 'Les établissements publics, les universités et les hôpitaux provinciaux' },
      { id: 'e', texte: 'Les directions provinciales de la DGI, DGDA et DGRAD' },
    ],
    reponse: 'b',
    explication: "Les ETD en droit constitutionnel congolais sont les communes, les secteurs et les chefferies. Leurs organes délibérants (Conseil communal, Conseil de secteur, Conseil de chefferie) votent la décision budgétaire visée à l'article 3 pt. 18 LOFIP.",
  },
  {
    id: 'g14',
    question: "L'article 181 de la Constitution consacre le principe de la péréquation. Quel est son objet selon la LOFIP ?",
    options: [
      { id: 'a', texte: "Financer exclusivement les provinces de l'Ouest du pays plus développées" },
      { id: 'b', texte: 'Corriger les déséquilibres de développement entre provinces, notamment par la Caisse nationale de péréquation alimentée à hauteur de 10% des recettes nationales (Art. 222 LOFIP)' },
      { id: 'c', texte: "Assurer le financement des salaires des agents de l'État dans les provinces" },
      { id: 'd', texte: 'Compenser la dette extérieure des provinces endettées' },
      { id: 'e', texte: "Financer les projets d'infrastructure de la capitale nationale uniquement" },
    ],
    reponse: 'b',
    explication: "L'article 181 de la Constitution institue la Caisse nationale de péréquation comme instrument de solidarité nationale pour corriger les déséquilibres entre provinces. L'article 222 LOFIP précise son mode d'alimentation : 10% de la totalité des recettes de catégories A et B.",
  },
  {
    id: 'g15',
    question: "Quelle disposition constitutionnelle fonde l'obligation de la Province du Katanga de réserver une allocation spéciale à la Province du Maniema au titre de la péréquation ?",
    options: [
      { id: 'a', texte: "L'article 91 de la Constitution sur le Parlement" },
      { id: 'b', texte: "L'article 181 de la Constitution, qui fonde la Caisse nationale de péréquation, mise en œuvre par l'article 222 LOFIP" },
      { id: 'c', texte: "L'article 90 de la Constitution sur le Gouvernement" },
      { id: 'd', texte: "L'article 220 LOFIP sur les recettes de catégorie A uniquement" },
      { id: 'e', texte: "L'article 3 LOFIP sur les définitions" },
    ],
    reponse: 'b',
    explication: "L'article 181 de la Constitution fonde la péréquation en instituant la Caisse nationale de péréquation comme instrument de solidarité nationale. Ce n'est pas la province du Katanga qui paye directement le Maniema : c'est la Caisse centrale, alimentée à 10% des recettes nationales (Art. 222 LOFIP), qui redistribue selon les besoins de développement.",
  },
]

// ============================================================
// CAS PRATIQUES (5)
// ============================================================
const ETUDES_DE_CAS: EtudeCas[] = [
  {
    titre: "Cas pratique 1 : L'édit budgétaire adopté par le Gouverneur sans vote de l'Assemblée provinciale",
    contexte: "Le Gouverneur de la Province du Kongo-Central promulgue, le 15 décembre 2025, un édit budgétaire pour l'exercice 2026 sans le soumettre au préalable au vote de l'Assemblée provinciale. Il justifie cet acte par l'urgence et l'absence de quorum à l'Assemblée. L'article 3 point 19 LOFIP définit l'édit budgétaire comme l'acte par lequel sont « prévues et autorisées, par l'Assemblée provinciale » les ressources et charges provinciales. L'article 132 LOFIP précise que l'édit budgétaire est adopté « par les organes délibérants respectifs ».",
    questions: [
      {
        num: '1',
        enonce: "Analysez la légalité de l'édit budgétaire promulgué par le Gouverneur sans vote de l'Assemblée provinciale au regard des articles 3 pt. 19 et 132 de la LOFIP.",
        correction: "L'édit budgétaire est illicite. L'article 3 point 19 LOFIP définit l'édit comme l'acte par lequel sont « prévues et autorisées, par l'Assemblée provinciale, les ressources et les charges provinciales. » L'article 132 LOFIP confirme que cet acte est adopté par « les organes délibérants respectifs ». Le Gouverneur est un organe exécutif, non délibérant. L'incompétence est manifeste : aucune urgence ni absence de quorum ne peut substituer le pouvoir exécutif au pouvoir délibérant pour l'autorisation budgétaire.",
      },
      {
        num: '2',
        enonce: "La LOFIP prévoit-elle un mécanisme d'exception permettant au Gouverneur d'engager des dépenses en l'absence d'édit budgétaire voté ? Analysez les conséquences juridiques de l'absence d'édit budgétaire sur les dépenses provinciales.",
        correction: "Par analogie avec l'article 72 LOFIP applicable au niveau national (douzieme provisoire), un mécanisme similaire peut être invoqué au niveau provincial pour autoriser provisoirement des dépenses mensuelles à hauteur d'un douzième du budget précédent. Cependant, l'édit adopté unilatéralement par le Gouverneur reste nul et de nul effet. Les dépenses engagées sur son fondement sont irrégulières et exposent l'ordonnateur à une mise en jeu de sa responsabilité personnelle et pécuniaire conformément aux principes généraux du droit budgétaire.",
      },
      {
        num: '3',
        enonce: 'Quelle est la voie de droit permettant de contester la légalité de cet acte, et quel organe est compétent ?',
        correction: "L'édit budgétaire est un acte législatif provincial. Sa contestation soulève une question de conformité constitutionnelle (violation de l'article 175 de la Constitution et des articles 3 pt. 19 et 132 LOFIP). La Cour constitutionnelle est compétente pour contrôler la constitutionnalité des édits provinciaux (Art. 162 al. 2 Constitution). Tout justiciable ou l'Assemblée provinciale peut saisir la Cour constitutionnelle pour obtenir l'annulation de cet édit illégal.",
      },
    ],
  },
  {
    titre: "Cas pratique 2 : Retenue à la source non effectuée — violation de l'article 220 LOFIP",
    contexte: "Le Ministre des Finances, en raison d'un déficit global du Trésor national, suspend pendant trois mois la retenue à la source de 40% sur les recettes de catégorie A au profit de la Province du Sud-Kivu. Il invoque à cet effet un arrêté ministériel suspendant temporairement l'instruction permanente visée à l'article 220 LOFIP. La province estime que ses droits constitutionnels et légaux sont violés.",
    questions: [
      {
        num: '1',
        enonce: "Analysez la légalité de l'arrêté du Ministre des Finances suspendant la retenue à la source au regard des articles 175 de la Constitution et 218-220 de la LOFIP.",
        correction: "L'arrêté est illicite. L'article 175 de la Constitution consacre directement le droit des provinces à 40% des recettes à caractère national retenus à la source. Ce droit constitutionnel ne peut être suspendu par un simple arrêté ministériel. L'article 218 LOFIP le réaffirme et l'article 220 LOFIP en précise le mécanisme par « instruction permanente » du Ministre des Finances. La suspension de cette instruction par arrêté contrevient directement à une obligation constitutionnelle et légale impérative.",
      },
      {
        num: '2',
        enonce: "L'article 218 al. 2 LOFIP permet-il au Pouvoir central de retenir la quote-part provinciale ? Évaluez si cette disposition justifie l'action du Ministre des Finances.",
        correction: "L'article 218 al. 2 LOFIP permet au Pouvoir central de retenir de la quote-part provinciale le coût des compétences et responsabilités non transférées, mais uniquement « dans les conditions définies par une loi de finances. » La cause invoquée ici (déficit du Trésor) ne correspond pas à une compétence non transférée. De plus, cette retenue exceptionnelle exige une loi de finances, pas un simple arrêté. L'action du Ministre est doublement irrégulière : quant au motif et quant à la forme.",
      },
      {
        num: '3',
        enonce: 'La Province du Sud-Kivu souhaite engager une procédure juridictionnelle. Quels recours sont ouverts et devant quelle juridiction, en vous fondant sur la Constitution et la LOFIP ?',
        correction: "La Province dispose de deux voies de recours : (1) Recours en inconstitutionnalité devant la Cour constitutionnelle (Art. 162 al. 2 Constitution), pour violation de l'article 175 de la Constitution. (2) Recours juridictionnel devant le Conseil d'État (Art. 155 Constitution) pour excès de pouvoir de l'arrêté ministériel contraire à la LOFIP. La Province peut également saisir la Conférence des gouverneurs pour médiation politique. En tout état de cause, le Gouverneur peut mettre le Gouvernement national en demeure de rétablir l'instruction permanente sous astreinte.",
      },
    ],
  },
  {
    titre: 'Cas pratique 3 : Allocation de la Caisse nationale de péréquation contestée — article 222 LOFIP',
    contexte: "La Province du Lualaba, grande productrice de cobalt, conteste l'affectation de 10% de la Caisse nationale de péréquation à des provinces qu'elle qualifie de moins productives. Elle soutient que la répartition de cette caisse pénalise les provinces contributrices nettes et demande que la Caisse soit réservée aux provinces productrices de ressources ministères. Elle invoque également l'article 221 LOFIP pour réclamer une part plus grande au titre de la province productrice.",
    questions: [
      {
        num: '1',
        enonce: "Analysez le fondement constitutionnel et légal de la Caisse nationale de péréquation en vous appuyant sur l'article 181 de la Constitution et l'article 222 de la LOFIP. La thèse de la Province du Lualaba est-elle juridiquement fondée ?",
        correction: "La thèse de la Province du Lualaba est juridiquement infondée. L'article 181 de la Constitution institue la Caisse nationale de péréquation comme instrument de « solidarité nationale » pour corriger les déséquilibres entre provinces. L'article 222 LOFIP confirme que cette Caisse bénéficie « aux provinces » et non aux seules provinces productrices. La vocation de la péréquation est redistributive, par définition opposée à une logique productiviste. La réclamation de la Province du Lualaba contredit le principe constitutionnel de solidarité nationale.",
      },
      {
        num: '2',
        enonce: "La Province du Lualaba invoque l'article 221 LOFIP pour réclamer une part supplémentaire au titre de la province productrice. Analysez si cette disposition lui est applicable pour les recettes minères.",
        correction: "L'article 221 al. 2 LOFIP prévoit une allocation compensatoire de 10% de la part provinciale « pour la province productrice », mais uniquement pour « les recettes pétrolières inclues dans la catégorie B ». La disposition est limitée au secteur pétrolier. Les recettes minières (cobalt, cuivre) ne sont pas expressément visées par cet alinéa. La Province du Lualaba ne peut donc pas invoquer l'article 221 LOFIP pour les recettes minères. Une extension à d'autres ressources extractives nécessiterait une modification législative expresse.",
      },
      {
        num: '3',
        enonce: 'Sur le plan de la hiérarchie des normes, quelle valeur juridique la Province du Lualaba peut-elle invoquer pour contester la répartition de la Caisse ? Peut-elle obtenir gain de cause devant la Cour constitutionnelle ?',
        correction: "La Province du Lualaba ne peut pas obtenir gain de cause devant la Cour constitutionnelle sur ce fondement. La Caisse nationale de péréquation est une institution constitutionnelle (Art. 181 Constitution) dont la vocation redistributive est expressément inscrite dans la loi fondamentale. La LOFIP (Art. 222) ne fait qu'en préciser les modalités d'alimentation (10% des recettes A et B). Une requête en inconstitutionnalité contre ce mécanisme serait dirigée contre la Constitution elle-même, ce qui est juridiquement irrecevable. La seule voie ouverte est la révision constitutionnelle (Art. 218 Constitution), soumise à des conditions strictes.",
      },
    ],
  },
  {
    titre: 'Cas pratique 4 : Consolidation budgétaire non effectuée — violation des articles 223-224 LOFIP',
    contexte: "En juin 2026, le Gouvernement national n'a pas encore déposé le projet de loi de consolidation du budget du Pouvoir central avec les budgets provinciaux pour l'exercice 2025, contrairement aux articles 223 et 224 LOFIP qui exigent ce dépôt au plus tard le 31 mai. Le Ministère du Budget invoque des difficultés techniques pour obtenir les édits budgétaires de toutes les provinces et justifie ainsi le retard.",
    questions: [
      {
        num: '1',
        enonce: "Analysez le cadre juridique de l'obligation de consolidation budgétaire au regard des articles 175 de la Constitution, 223 et 224 de la LOFIP.",
        correction: "L'obligation de consolidation est d'origine constitutionnelle. L'article 175 al. 3 de la Constitution dispose que le budget du Pouvoir central et ceux des provinces sont « consolidés chaque année par une loi. » L'article 223 LOFIP réaffirme cette obligation et l'article 224 LOFIP en fixe les délais impératifs : dépôt au 31 mai et vote avant le 15 juin. Le dépassement de ces délais constitue une violation d'une obligation légale express. Les difficultés techniques avancées par le Ministère ne constituent pas une cause exonératoire en droit budgétaire.",
      },
      {
        num: '2',
        enonce: "La consolidation budgétaire est-elle une simple formalité comptable ou répond-elle à un objectif juridique précis ? En vous appuyant sur l'article 223 LOFIP, évaluez les conséquences juridiques de l'absence de consolidation.",
        correction: "L'article 223 al. 2 LOFIP précise que la consolidation s'effectue « pour des raisons statistiques et informatives ». Elle n'a pas d'effet normatif direct sur l'exécution budgétaire mais remplit une fonction de transparence et de contrôle démocratique. Son absence prive le Parlement national d'une vision globale des finances publiques (central + provinces). Sur le plan de la responsabilité, le non-respect des délais légaux engage la responsabilité politique du Gouvernement devant l'Assemblée nationale qui peut mettre en cause sa responsabilité (Art. 100 Constitution).",
      },
      {
        num: '3',
        enonce: 'Le Parlement peut-il contraindre le Gouvernement à déposer le projet de loi de consolidation ? Analysez les mécanismes constitutionnels et légaux disponibles.',
        correction: "Oui. L'Assemblée nationale dispose de plusieurs leviers : (1) Question orale avec débat (Art. 138 Constitution) pour interroger le Gouvernement sur le respect des délais légaux. (2) Commission d'enquête (Art. 138 Constitution) pour analyser les causes du retard. (3) Motion de censure (Art. 146 Constitution) en cas de faute grave du Gouvernement. (4) Injonction législative : l'Assemblée peut adopter une résolution invitant le Gouvernement à présenter le projet dans un délai fixé. La saisine du Conseil d'État pour carence de l'administration est également envisageable sur requête de toute partie intéressée.",
      },
    ],
  },
  {
    titre: 'Cas pratique 5 : Décision budgétaire de la Commune de Ngaliema — analyse de la régularité budgétaire',
    contexte: "Le Conseil communal de Ngaliema adopte, en janvier 2026, une décision budgétaire pour l'exercice 2026 prévoyant des recettes de 2,5 milliards FC, composées pour 90% de transferts attendus du Gouvernement provincial et pour 10% de taxes locales. Les dépenses prévues s'élèvent à 3,1 milliards FC. Le Ministère de la Décentralisation conteste la régularité de cette décision budgétaire.",
    questions: [
      {
        num: '1',
        enonce: "Analysez la régularité de la décision budgétaire de la Commune de Ngaliema au regard des articles 3 pt. 18, 132 et 135 LOFIP, en examinant notamment le principe d'équilibre budgétaire.",
        correction: "La décision budgétaire présente un déséquilibre structurel : les recettes (2,5 Mds FC) sont inférieures aux dépenses prévues (3,1 Mds FC). L'article 3 pt. 18 LOFIP exige que la décision budgétaire soit élaborée « dans le respect de l'équilibre budgétaire et financier. » L'article 135 LOFIP impose que le document unique contienne « toutes les ressources et toutes les charges. » Un écart de 600 millions FC non financé constitue une violation flagrante du principe d'équilibre et rend la décision budgétaire irrégulière.",
      },
      {
        num: '2',
        enonce: 'Le fait que 90% des recettes proviennent de transferts incertains (non encore versés par la province) est-il juridiquement problématique au regard des principes budgétaires ? Analysez ce risque à la lumière de la LOFIP.',
        correction: "Oui, c'est problématique. L'article 136 LOFIP exige que l'édit ou la décision budgétaire comporte une évaluation sincere de chaque nature de recette. Inscrire 90% de recettes sous forme de transferts « attendus » sans garantie légale de leur versement soulève un problème de sincérité budgétaire (principe posé par l'article 16 LOFIP pour le niveau national, applicable par analogie). Si ces transferts ne se matérialisent pas, la commune sera contrainte d'interrompre des dépenses engagées, ce qui peut entraîner une défaillance dans l'exécution des services publics locaux.",
      },
      {
        num: '3',
        enonce: 'La LOFIP prévoit-elle un mécanisme de tutelle ou de contrôle des décisions budgétaires des ETD ? Qui est compétent pour corriger cette décision budgétaire irrégulière et selon quelle procédure ?',
        correction: "La LOFIP et la loi organique sur les ETD prévoient un mécanisme de tutelle administrative du Gouverneur de province sur les décisions des ETD. Le Gouverneur peut déférer la décision budgétaire irrégulière au Ministère de la Décentralisation pour contrôle de légalité. Si l'irrégularité est confirmée, le Gouverneur peut annuler ou suspendre la décision et inviter le Conseil communal à adopter un budget rectificatif équilibré. En dernier recours, le Conseil d'État peut être saisi d'un recours pour excès de pouvoir si l'irrégularité n'est pas corrigée.",
      },
    ],
  },
]

// ============================================================
// QCM BLOCK
// ============================================================
function QCMBlock({ qcm, onScore }: { qcm: QCMData; onScore?: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (id: string) => {
    if (showResult) return
    setSelected(id)
    setShowResult(true)
    onScore?.(id === qcm.reponse)
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <p className="font-semibold text-sm text-foreground leading-snug">{qcm.question}</p>
      <div className="space-y-2">
        {qcm.options.map(opt => {
          const isCorrect = opt.id === qcm.reponse
          const isSelected = opt.id === selected
          let cls = 'w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors '
          if (!showResult) {
            cls += 'border-border bg-background hover:bg-muted'
          } else if (isCorrect) {
            cls += 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
          } else if (isSelected) {
            cls += 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
          } else {
            cls += 'border-border bg-background opacity-60'
          }
          return (
            <button key={opt.id} className={cls} onClick={() => handleAnswer(opt.id)}>
              <span className="font-semibold mr-2 uppercase">{opt.id}.</span>{opt.texte}
            </button>
          )
        })}
      </div>
      {showResult && (
        <div className={cn('flex items-start gap-2 rounded-lg p-3 text-xs',
          selected === qcm.reponse
            ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
            : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
        )}>
          {selected === qcm.reponse
            ? <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
            : <XCircle className="h-4 w-4 shrink-0 mt-0.5" />}
          <span>{qcm.explication}</span>
        </div>
      )}
    </div>
  )
}

// ============================================================
// CAS PRATIQUE BLOCK
// ============================================================
function CasPratiqueBlock({ ec, index }: { ec: EtudeCas; index: number }) {
  const [open, setOpen] = useState<Record<string, boolean>>({})

  return (
    <div className="rounded-xl border border-violet-200 dark:border-violet-800 bg-card overflow-hidden">
      <div className="bg-violet-50 dark:bg-violet-900/20 px-4 py-3 border-b border-violet-200 dark:border-violet-800">
        <span className="text-xs font-bold text-violet-700 dark:text-violet-300 uppercase tracking-wide">
          Cas pratique {index + 1}
        </span>
        <h3 className="text-sm font-bold text-foreground mt-1 leading-snug">{ec.titre}</h3>
      </div>
      <div className="p-4 space-y-4">
        <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Contexte :</strong> {ec.contexte}
        </div>
        <div className="space-y-3">
          {ec.questions.map(q => (
            <div key={q.num} className="border border-border rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/40 transition-colors"
                onClick={() => setOpen(prev => ({ ...prev, [q.num]: !prev[q.num] }))}
              >
                <span className="text-sm font-semibold text-foreground">Question {q.num}</span>
                {open[q.num] ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </button>
              <div className={cn('px-4 text-sm text-foreground leading-relaxed', open[q.num] ? 'pb-4' : 'hidden')}>
                <p className="mb-3 font-medium text-foreground/90">{q.enonce}</p>
                <div className="rounded-lg bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 p-3 text-xs text-violet-900 dark:text-violet-200 leading-relaxed">
                  <strong>Correction :</strong> {q.correction}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// PAGE PRINCIPALE
// ============================================================
export default function UE5Chapitre8Page() {
  const goBack = useGoBack('/ue5-finances-publiques')
  const user = useUser()
  const role = (user as any)?.role || 'etudiant'
  const isAdmin = role === 'admin' || role === 'professeur' || role === 'assistant'

  const [activeTab, setActiveTab] = useState<'lecons' | 'qcm' | 'cas' | 'devoir'>(
    isAdmin ? 'lecons' : 'lecons'
  )
  const [activeLecon, setActiveLecon] = useState(0)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const toggle = (key: string) =>
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))

  const lecons = [
    {
      titre: 'Leçon 1 — Architecture de la décentralisation financière',
      source: 'Constitution Art. 175, LOFIP Art. 3 pt. 5, 19 et 218',
      contenu: (
        <div className="space-y-4 text-sm text-foreground leading-relaxed">
          <div className="rounded-lg bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 p-4">
            <h4 className="font-bold text-violet-800 dark:text-violet-200 mb-2">Définitions légales fondamentales</h4>
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Édit budgétaire</span>
                <InfoTooltip texte="Article 3 point 19 LOFIP : acte par lequel l'Assemblee provinciale prevoit et autorise les ressources et charges provinciales." loi="Art. 3 pt. 19 LOFIP" />
                <p className="text-xs text-muted-foreground mt-1">
                  Art. 3 pt. 19 LOFIP : « L'acte par lequel sont prévues et autorisées, par l'Assemblée provinciale, les ressources et les charges provinciales d'un exercice budgétaire. Il est la traduction financière annuelle du programme d'action de développement de la province. »
                </p>
              </div>
              <div>
                <span className="font-semibold">Budget provincial</span>
                <InfoTooltip texte="Article 3 point 5 LOFIP : contient les previsions des recettes et depenses des ETD integrees dans celles de la province." loi="Art. 3 pt. 5 LOFIP" />
                <p className="text-xs text-muted-foreground mt-1">
                  Art. 3 pt. 5 LOFIP : « Un document contenant les prévisions des recettes et des dépenses des entités territoriales décentralisées intégrées dans celles de la province. »
                </p>
              </div>
              <div>
                <span className="font-semibold">Décision budgétaire</span>
                <InfoTooltip texte="Article 3 point 18 LOFIP : acte par lequel les organes deliberants des ETD prevoient et autorisent les ressources et charges locales." loi="Art. 3 pt. 18 LOFIP" />
                <p className="text-xs text-muted-foreground mt-1">
                  Art. 3 pt. 18 LOFIP : « L'acte par lequel sont prévues et autorisées, par les organes délibérants des entités territoriales décentralisées, les ressources et les charges locales d'un exercice budgétaire. Il est la traduction financière annuelle du programme d'action de développement de l'entité concernée. »
                </p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Architecture constitutionnelle de la décentralisation (Art. 175 Constitution)</h4>
            <p>
              L'article 175 de la Constitution de la RDC consacre la décentralisation financière à deux égards : d'une part, il établit que le budget du Pouvoir central et ceux des provinces sont « consolidés chaque année par une loi » ; d'autre part, il garantit aux provinces un droit constitutionnel de recevoir « quarante pour cent des recettes à caractère national retenus à la source ».
            </p>
            <p className="mt-2">
              Ce système implique trois niveaux de gouvernance budgétaire : le Pouvoir central (60% des recettes nationales, loi de finances), les Provinces (édit budgétaire voté par l'Assemblée provinciale), et les Entités Territoriales Décentralisées ou ETD (décision budgétaire votée par l'organe délibérant local : Conseil communal, Conseil de secteur, Conseil de chefferie).
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-violet-100 dark:bg-violet-900/30">
                  <th className="border border-violet-200 dark:border-violet-700 px-3 py-2 text-left font-bold">Niveau</th>
                  <th className="border border-violet-200 dark:border-violet-700 px-3 py-2 text-left font-bold">Acte budgétaire</th>
                  <th className="border border-violet-200 dark:border-violet-700 px-3 py-2 text-left font-bold">Organe votant</th>
                  <th className="border border-violet-200 dark:border-violet-700 px-3 py-2 text-left font-bold">Référence LOFIP</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-muted/30">
                  <td className="border border-border px-3 py-2">Pouvoir central</td>
                  <td className="border border-border px-3 py-2">Loi de finances</td>
                  <td className="border border-border px-3 py-2">Parlement national</td>
                  <td className="border border-border px-3 py-2">Art. 1er-3 LOFIP</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="border border-border px-3 py-2">Province</td>
                  <td className="border border-border px-3 py-2">Édit budgétaire (Art. 3 pt. 19)</td>
                  <td className="border border-border px-3 py-2">Assemblée provinciale</td>
                  <td className="border border-border px-3 py-2">Art. 132, 135-138 LOFIP</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="border border-border px-3 py-2">ETD (commune, secteur, chefferie)</td>
                  <td className="border border-border px-3 py-2">Décision budgétaire (Art. 3 pt. 18)</td>
                  <td className="border border-border px-3 py-2">Organe délibérant local</td>
                  <td className="border border-border px-3 py-2">Art. 132, 135 LOFIP</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="space-y-3">
            {QCM_LECONS.L1.map(q => <QCMBlock key={q.id} qcm={q} />)}
          </div>
        </div>
      ),
    },
    {
      titre: 'Leçon 2 — La répartition des recettes à caractère national',
      source: 'Constitution Art. 175, LOFIP Art. 218-221',
      contenu: (
        <div className="space-y-4 text-sm text-foreground leading-relaxed">
          <div>
            <h4 className="font-bold text-foreground mb-2">Le principe constitutionnel de la rétrocession (Art. 175 Constitution + Art. 218 LOFIP)</h4>
            <p>
              L'article 175 de la Constitution consacre le droit des provinces à quarante pour cent (40%) des recettes à caractère national. L'article 218 LOFIP en précise les modalités : « Les provinces ont droit à quarante pour cent des recettes à caractère national retenues à la source. »
            </p>
            <p className="mt-2">
              L'article 218 al. 2 LOFIP intègre cependant une réserve : « Le pouvoir central peut retenir de la quote-part provinciale le coût des compétences et responsabilités non transférées, dans les conditions définies par une loi de finances. » Cette retenue est donc encadrée et ne peut jamais résulter d'un simple acte réglementaire.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Catégorisation des recettes à caractère national (Art. 219 LOFIP)</h4>
            <p>L'article 219 LOFIP distingue deux catégories de recettes nationales dont la répartition obéit à des mécanismes différents :</p>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-violet-100 dark:bg-violet-900/30">
                    <th className="border border-violet-200 dark:border-violet-700 px-3 py-2 text-left font-bold">Catégorie A</th>
                    <th className="border border-violet-200 dark:border-violet-700 px-3 py-2 text-left font-bold">Catégorie B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-muted/30">
                    <td className="border border-border px-3 py-2 align-top">
                      Recettes administratives, judiciaires et domaniales collectées en province<br />
                      Impôts perçus à leur lieu de réalisation
                    </td>
                    <td className="border border-border px-3 py-2 align-top">
                      Recettes collectées au niveau du Pouvoir central<br />
                      Recettes de douanes et d'accises<br />
                      Impôts sur les grandes entreprises<br />
                      Recettes des pétroliers producteurs
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Mécanismes de répartition (Art. 220-221 LOFIP)</h4>
            <div className="space-y-3">
              <div className="rounded-lg bg-muted/40 p-3">
                <p className="font-semibold text-foreground text-xs mb-1">Art. 220 LOFIP — Catégorie A (retenue automatique)</p>
                <p className="text-xs text-muted-foreground">
                  « Pour les recettes de la catégorie A, la retenue de 40% est portée au compte de la province génératrice de la recette, lors du nivellement au profit du Compte général du Trésor, sur instruction permanente du ministre ayant les finances dans ses attributions conformément aux prescrits du Règlement général sur la comptabilité publique. »
                </p>
              </div>
              <div className="rounded-lg bg-muted/40 p-3">
                <p className="font-semibold text-foreground text-xs mb-1">Art. 221 LOFIP — Catégorie B (répartition selon capacité contributive)</p>
                <p className="text-xs text-muted-foreground">
                  La retenue de 40% sur la catégorie B s'effectue « suivant la capacité contributive et le poids démographique » des provinces, selon un arrêté conjoint des ministres des Finances et du Budget. Une allocation compensatoire de 10% de la part provinciale est attribuée à la province productrice de pétrole.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 p-3">
            <p className="text-xs font-semibold text-violet-800 dark:text-violet-200">
              LF 2026 (Loi n° 25/060 du 29 décembre 2025) — Application chiffrée (Art. 8)
            </p>
            <p className="text-xs text-violet-700 dark:text-violet-300 mt-1">
              Rétrocession aux provinces au titre du 40% constitutionnel : <strong>7.694,5 milliards FC</strong>
            </p>
          </div>
          <div className="space-y-3">
            {QCM_LECONS.L2.map(q => <QCMBlock key={q.id} qcm={q} />)}
          </div>
        </div>
      ),
    },
    {
      titre: 'Leçon 3 — La Caisse nationale de péréquation',
      source: 'Constitution Art. 181, LOFIP Art. 222',
      contenu: (
        <div className="space-y-4 text-sm text-foreground leading-relaxed">
          <div>
            <h4 className="font-bold text-foreground mb-2">Fondement constitutionnel (Art. 181 Constitution)</h4>
            <p>
              L'article 181 de la Constitution institue la Caisse nationale de péréquation comme instrument de solidarité nationale. Cette caisse est destinée à financer des projets et programmes de développement dans les entités territoriales provinciales et locales les moins nantis, afin de corriger les déséquilibres de développement entre provinces et à l'intérieur des provinces.
            </p>
            <p className="mt-2">
              La péréquation repose sur la logique de solidarité : les provinces à fort potentiel fiscal contribuent, via le mécanisme national, au financement des provinces structurellement sous-développées.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Modalités d'alimentation (Art. 222 LOFIP)</h4>
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground italic">
                Art. 222 LOFIP : « Conformément à l'article 181 de la Constitution, les provinces bénéficient des ressources provenant de la Caisse nationale de péréquation dont le budget est alimenté à concurrence de dix pour cent de la totalité des recettes de catégorie A et B telle que définies à l'article 219 de la présente loi. »
              </p>
            </div>
            <p className="mt-2">
              Le taux d'alimentation est donc fixé à 10% de la totalité des recettes de catégories A et B. Ce prélèvement est distinct du 40% de retenue à la source prévu à l'article 218 LOFIP. Il est calculé sur la base de toutes les recettes nationales, y compris celles qui alimentent le budget du Pouvoir central.
            </p>
          </div>
          <div className="rounded-lg bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 p-3">
            <p className="text-xs font-semibold text-violet-800 dark:text-violet-200">
              LF 2026 (Loi n° 25/060) — Dotation Caisse nationale de péréquation (Art. 9)
            </p>
            <p className="text-xs text-violet-700 dark:text-violet-300 mt-1">
              Montant inscrit : <strong>744,6 milliards FC</strong>
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Distinction retenue à la source vs. péréquation</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-violet-100 dark:bg-violet-900/30">
                    <th className="border border-violet-200 dark:border-violet-700 px-3 py-2 text-left font-bold">Mécanisme</th>
                    <th className="border border-violet-200 dark:border-violet-700 px-3 py-2 text-left font-bold">Base constitutionnelle</th>
                    <th className="border border-violet-200 dark:border-violet-700 px-3 py-2 text-left font-bold">Article LOFIP</th>
                    <th className="border border-violet-200 dark:border-violet-700 px-3 py-2 text-left font-bold">Taux</th>
                    <th className="border border-violet-200 dark:border-violet-700 px-3 py-2 text-left font-bold">LF 2026</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-muted/30">
                    <td className="border border-border px-3 py-2">Retenue à la source</td>
                    <td className="border border-border px-3 py-2">Art. 175 Constitution</td>
                    <td className="border border-border px-3 py-2">Art. 218-221</td>
                    <td className="border border-border px-3 py-2">40% recettes nationales</td>
                    <td className="border border-border px-3 py-2">7.694,5 Mds FC</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="border border-border px-3 py-2">Caisse de péréquation</td>
                    <td className="border border-border px-3 py-2">Art. 181 Constitution</td>
                    <td className="border border-border px-3 py-2">Art. 222</td>
                    <td className="border border-border px-3 py-2">10% recettes cat. A + B</td>
                    <td className="border border-border px-3 py-2">744,6 Mds FC</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="space-y-3">
            {QCM_LECONS.L3.map(q => <QCMBlock key={q.id} qcm={q} />)}
          </div>
        </div>
      ),
    },
    {
      titre: "Leçon 4 — L'édit budgétaire et la décision budgétaire : contenu légal",
      source: 'LOFIP Art. 132, 135-138',
      contenu: (
        <div className="space-y-4 text-sm text-foreground leading-relaxed">
          <div>
            <h4 className="font-bold text-foreground mb-2">Définition légale (Art. 132 LOFIP)</h4>
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground italic">
                Art. 132 LOFIP : « L'édit budgétaire et la décision budgétaire sont des actes par lesquels sont prévus et autorisés, par les organes délibérants respectifs, les ressources et les charges provinciales et locales d'un exercice budgétaire. Ils en déterminent, dans le respect de l'équilibre budgétaire et financier, la nature, le montant et l'affectation. »
              </p>
            </div>
            <p className="mt-2">
              Deux éléments essentiels ressortent de cet article : d'une part, l'exclusivité de la compétence des organes délibérants (Assemblée provinciale pour l'édit, organes délibérants des ETD pour la décision) ; d'autre part, l'obligation de respecter l'équilibre budgétaire et financier.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Contenu obligatoire de l'édit budgétaire (Art. 135-138 LOFIP)</h4>
            <div className="space-y-3">
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-xs text-foreground mb-1">Art. 135 LOFIP — Principe d'unité budgétaire</p>
                <p className="text-xs text-muted-foreground">
                  L'édit contient, pour une année civile, « toutes les ressources et toutes les charges » de la province qui traduisent, à travers un document unique, les programmes d'actions du Gouvernement provincial ou du Collège exécutif de l'ETD, avec évaluation des objectifs et résultats attendus.
                </p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-xs text-foreground mb-1">Art. 136 LOFIP — Prévision des recettes</p>
                <p className="text-xs text-muted-foreground">
                  L'édit comporte les dispositions relatives à la perception des recettes de toute nature, les ressources affectant l'équilibre budgétaire, les affectations de recettes, et l'évaluation de chaque nature de recettes budgétaires de la province.
                </p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-xs text-foreground mb-1">Art. 137 LOFIP — Détails des crédits</p>
                <p className="text-xs text-muted-foreground">
                  L'édit fixe, par programme, le montant des autorisations d'engagement et des crédits de paiement, et par ministère ou Institution provinciale, les plafonds des autorisations d'emplois rémunérés.
                </p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-xs text-foreground mb-1">Art. 138 LOFIP — Autorisations d'emprunt</p>
                <p className="text-xs text-muted-foreground">
                  L'édit fixe le plafond des emprunts que le Gouvernement provincial peut être autorisé à contracter au cours de l'exercice.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {QCM_LECONS.L4.map(q => <QCMBlock key={q.id} qcm={q} />)}
          </div>
        </div>
      ),
    },
    {
      titre: 'Leçon 5 — Consolidation et rapports entre le Pouvoir central et les provinces',
      source: 'Constitution Art. 175, LOFIP Art. 217, 223-224',
      contenu: (
        <div className="space-y-4 text-sm text-foreground leading-relaxed">
          <div>
            <h4 className="font-bold text-foreground mb-2">Les principes de base des rapports financiers (Art. 217 LOFIP)</h4>
            <p>
              L'article 217 LOFIP pose le cadre constitutionnel des rapports financiers entre le Pouvoir central et les provinces : ces rapports sont fixés « suivant les principes de base édictés par les articles 171, 175, 202, 203 et 204 de la Constitution. » Ces dispositions constitutionnelles établissent la souveraineté financière partielle des provinces et leurs droits imprescriptibles sur une fraction des recettes nationales.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">La consolidation budgétaire annuelle (Art. 223-224 LOFIP)</h4>
            <div className="rounded-lg bg-muted/40 p-3 space-y-2">
              <p className="text-xs text-muted-foreground italic">
                Art. 223 LOFIP : « Conformément aux dispositions de l'article 175 de la Constitution, le Budget du pouvoir central et ceux des provinces sont consolidés chaque année par une loi. Cette consolidation s'effectue pour des raisons statistiques et informatives. »
              </p>
              <p className="text-xs text-muted-foreground italic">
                Art. 224 LOFIP : « Après le vote et la promulgation de la loi de finances de l'année, un projet de loi de consolidation du budget du pouvoir central avec ceux des provinces est déposé au plus tard le 31 mai de l'année suivante sur le bureau de l'Assemblée nationale pour être voté au plus tard le 15 juin. »
              </p>
            </div>
            <p className="mt-2">
              La consolidation est obligatoire mais revêt une finalité exclusivement statistique et informative (Art. 223 al. 2). Elle ne modifie pas les crédits déjà votés. Sa fonction principale est d'offrir au Parlement national et aux citoyens une vision globale des finances publiques de l'ensemble du territoire national.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-violet-100 dark:bg-violet-900/30">
                  <th className="border border-violet-200 dark:border-violet-700 px-3 py-2 text-left font-bold">Étape</th>
                  <th className="border border-violet-200 dark:border-violet-700 px-3 py-2 text-left font-bold">Délai</th>
                  <th className="border border-violet-200 dark:border-violet-700 px-3 py-2 text-left font-bold">Acte</th>
                  <th className="border border-violet-200 dark:border-violet-700 px-3 py-2 text-left font-bold">Base légale</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-muted/30">
                  <td className="border border-border px-3 py-2">Vote LF annuelle</td>
                  <td className="border border-border px-3 py-2">15 novembre (Art. 126 LOFIP)</td>
                  <td className="border border-border px-3 py-2">Loi de finances</td>
                  <td className="border border-border px-3 py-2">Art. 126 LOFIP</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="border border-border px-3 py-2">Dépôt projet consolidation</td>
                  <td className="border border-border px-3 py-2">Au plus tard 31 mai (N+1)</td>
                  <td className="border border-border px-3 py-2">Projet loi consolidation</td>
                  <td className="border border-border px-3 py-2">Art. 224 LOFIP</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="border border-border px-3 py-2">Vote loi consolidation</td>
                  <td className="border border-border px-3 py-2">Au plus tard 15 juin (N+1)</td>
                  <td className="border border-border px-3 py-2">Loi de consolidation</td>
                  <td className="border border-border px-3 py-2">Art. 224 LOFIP</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="space-y-3">
            {QCM_LECONS.L5.map(q => <QCMBlock key={q.id} qcm={q} />)}
          </div>
        </div>
      ),
    },
  ]

  const qcmQuestions: QCMChapitre[] = QCM_GLOBAUX.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    reponseCorrecte: q.reponse,
    explication: q.explication,
    articleRef: '',
  }))

  const casPratiquesDevoir: CasPratiqueExistant[] = ETUDES_DE_CAS.map(versCasPratiqueExistant)

  const tabs = isAdmin
    ? [
        { id: 'lecons', label: 'Leçons' },
        { id: 'qcm', label: 'QCM' },
        { id: 'cas', label: 'Cas pratiques' },
        { id: 'devoir', label: 'Devoir' },
      ]
    : [
        { id: 'lecons', label: 'Leçons' },
        { id: 'devoir', label: 'Devoir' },
      ]

  return (
    <div className="space-y-4 pb-10 animate-fadeIn">
      {/* En-tête */}
      <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 5 — Finances publiques', route: '/ue5-finances-publiques' },
            { label: 'Chapitre 8' },
          ]}
          color="emerald"
        />
        <h1 className="text-lg font-bold text-foreground leading-tight">Décentralisation budgétaire</h1>
        <p className="text-xs text-muted-foreground">Constitution Art. 175, 181 · LOFIP Art. 3, 132-138, 217-224 · LF n° 25/060</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Leçons', val: '5' },
          { label: 'QCMs', val: '25' },
          { label: 'Cas pratiques', val: '5' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
            <p className="text-lg font-bold text-violet-600 dark:text-violet-400">{s.val}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Onglets */}
      <div className="flex gap-1 rounded-xl bg-muted p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              'flex-1 rounded-lg py-2 text-xs font-semibold transition-all',
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu Leçons */}
      {activeTab === 'lecons' && (
        <div className="space-y-3">
          {/* Nav leçons */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {lecons.map((l, i) => (
              <button
                key={i}
                onClick={() => setActiveLecon(i)}
                className={cn(
                  'shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold border transition-colors',
                  activeLecon === i
                    ? 'bg-violet-600 text-white border-violet-600'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground'
                )}
              >
                L{i + 1}
              </button>
            ))}
          </div>
          {/* Leçon active */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="bg-violet-50 dark:bg-violet-900/20 px-4 py-3 border-b border-violet-200 dark:border-violet-800">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-violet-700 dark:text-violet-300 uppercase tracking-wide">
                    Leçon {activeLecon + 1} sur {lecons.length}
                  </span>
                  <h2 className="text-sm font-bold text-foreground mt-0.5 leading-snug">
                    {lecons[activeLecon].titre}
                  </h2>
                </div>
                <InfoTooltip texte={`Source : ${lecons[activeLecon].source}`} loi="LOFIP" />
              </div>
              <p className="text-xs text-violet-600 dark:text-violet-400 mt-1">{lecons[activeLecon].source}</p>
            </div>
            <div className="p-4">
              {lecons[activeLecon].contenu}
            </div>
          </div>
          {/* Navigation prev/next */}
          <div className="flex gap-2">
            {activeLecon > 0 && (
              <button
                onClick={() => setActiveLecon(i => i - 1)}
                className="flex-1 py-2.5 rounded-xl border border-border bg-card text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                Leçon précédente
              </button>
            )}
            {activeLecon < lecons.length - 1 && (
              <button
                onClick={() => setActiveLecon(i => i + 1)}
                className="flex-1 py-2.5 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-colors"
              >
                Leçon suivante
              </button>
            )}
          </div>
        </div>
      )}

      {/* Onglet QCM (admin/prof/assistant) */}
      {activeTab === 'qcm' && isAdmin && (
        <QCMPageUnique questions={qcmQuestions} couleurAccent="violet" />
      )}

      {/* Onglet Cas pratiques (admin/prof/assistant) */}
      {activeTab === 'cas' && isAdmin && (
        <div className="space-y-4">
          <div className="rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-900/20 p-3">
            <p className="text-xs text-violet-800 dark:text-violet-200 font-semibold">
              5 cas pratiques — Décentralisation budgétaire (Art. 132-138, 217-224 LOFIP + Constitution Art. 175, 181)
            </p>
            <p className="text-xs text-violet-700 dark:text-violet-300 mt-1">
              Tous les cas exigent une analyse juridique rigoureuse fondée sur les textes légaux.
            </p>
          </div>
          {ETUDES_DE_CAS.map((ec, i) => (
            <CasPratiqueBlock key={i} ec={ec} index={i} />
          ))}
        </div>
      )}

      {/* Onglet Devoir */}
      {activeTab === 'devoir' && (
        <DevoirChapitreCreateur
          chapitreId="ue5-ch8"
          chapitreNom="Chapitre 8 — Décentralisation budgétaire"
          questions={qcmQuestions}
          coursId="ue5-finances-publiques"
          casPratiquesExistants={casPratiquesDevoir}
        />
      )}
    </div>
  )
}
