import React, { useState } from 'react'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ChevronDown, ChevronUp, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react'
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
      question: "Selon l'article 111 LOFIP, qu'est-ce que le contrôle administratif ?",
      options: [
        { id: 'a', texte: 'Le contrôle exercé par la Cour des comptes sur les comptables publics' },
        { id: 'b', texte: "Le contrôle de l'administration sur ses services" },
        { id: 'c', texte: 'Le contrôle politique exercé par le Parlement sur le Gouvernement' },
        { id: 'd', texte: 'Le contrôle exercé par les juridictions administratives sur les actes budgétaires' },
        { id: 'e', texte: 'Le contrôle exercé par le Président de la République sur le Ministre des Finances' },
      ],
      reponse: 'b',
      explication: "L'article 111 LOFIP définit laconiquement le contrôle administratif comme « le contrôle de l'administration sur ses services. » Il s'agit d'un contrôle interne, exercé à l'intérieur de l'administration elle-même, par opposition au contrôle juridictionnel (Cour des comptes) et au contrôle politique (Parlement).",
    },
    {
      id: 'l1q2',
      question: "D'après l'article 112 LOFIP, quels actes sont soumis au visa préalable du contrôleur budgétaire ?",
      options: [
        { id: 'a', texte: "Uniquement les actes d'ordonnancement dépassant 10 millions FC" },
        { id: 'b', texte: 'Tous les actes portant engagement, liquidation et ordonnancement, notamment contrats, arrêtés, mesures ou décisions des ordonnateurs' },
        { id: 'c', texte: 'Seulement les contrats de marché public supérieurs au seuil de passation' },
        { id: 'd', texte: "Les actes d'ordonnancement uniquement, après engagement et liquidation" },
        { id: 'e', texte: 'Les actes de recettes uniquement, pour vérifier la légalité des titres de perception' },
      ],
      reponse: 'b',
      explication: "L'article 112 LOFIP dispose que « tous les actes portant engagement, liquidation et ordonnancement sont soumis à son visa préalable, notamment les contrats, arrêtés, mesures ou décisions émanant d'un responsable d'Institution, d'un ministre, d'un responsable de service déconcentré ou d'un fonctionnaire habilité. » Le visa couvre les trois premières phases de la chaîne de la dépense.",
    },
  ],
  L2: [
    {
      id: 'l2q1',
      question: "Conformément à l'article 113 LOFIP, que se passe-t-il si le contrôleur budgétaire estime que les actes de l'ordonnateur sont entachés d'irrégularités ?",
      options: [
        { id: 'a', texte: "Il saisit directement la Cour des comptes pour jugement de l'ordonnateur" },
        { id: 'b', texte: 'Il refuse le visa et ne peut en aucun cas être sanctionné pour ce refus' },
        { id: 'c', texte: 'Il transmet le dossier au Ministre des Finances pour décision finale' },
        { id: 'd', texte: 'Il accorde le visa conditionnel en attendant la régularisation' },
        { id: 'e', texte: "Il suspend l'opération pendant 30 jours avant de statuer définitivement" },
      ],
      reponse: 'b',
      explication: "L'article 113 LOFIP dispose que si les actes de l'ordonnateur lui paraissent entachés d'irrégularités, « le contrôleur refuse le visa. Pour ce faire, il ne peut en aucun cas être sanctionné. » Cette protection garantit l'indépendance fonctionnelle du contrôleur budgétaire dans l'exercice de sa mission.",
    },
    {
      id: 'l2q2',
      question: "L'article 114 LOFIP organise la procédure en cas de désaccord persistant entre le contrôleur budgétaire et l'ordonnateur. Qui peut autoriser de passer outre le refus de visa ?",
      options: [
        { id: 'a', texte: 'Le Président de la République, par ordonnance motivée' },
        { id: 'b', texte: 'Le ministre ayant le budget dans ses attributions ou le représentant du Pouvoir central en province, par autorisation motivée écrite' },
        { id: 'c', texte: "La Cour des comptes, après procédure contradictoire entre le contrôleur et l'ordonnateur" },
        { id: 'd', texte: 'Le Premier ministre, par instruction permanente adressée au contrôleur' },
        { id: 'e', texte: "L'Assemblée nationale, sur requête du Gouvernement en urgence" },
      ],
      reponse: 'b',
      explication: "L'article 114 LOFIP prévoit qu'en cas de désaccord persistant, le contrôleur budgétaire en réfère « au ministre ayant le budget dans ses attributions au niveau central ou au représentant du pouvoir central en province. Il ne peut être passé outre au refus de visa que sur autorisation motivée écrite dudit ministre ou représentant. »",
    },
  ],
  L3: [
    {
      id: 'l3q1',
      question: "Selon l'article 121 LOFIP, quelle est la compétence de l'Inspection Générale des Finances (IGF) ?",
      options: [
        { id: 'a', texte: 'Une compétence limitée aux ministères gestionnaires de recettes fiscales' },
        { id: 'b', texte: 'Une compétence générale en matière de contrôle des finances et des biens publics, couvrant toutes les opérations financières du Pouvoir central et des organismes bénéficiant de son concours financier' },
        { id: 'c', texte: 'Une compétence juridictionnelle pour juger les comptables publics en déficit' },
        { id: 'd', texte: 'Une compétence exclusive sur les opérations de dépenses, sans pouvoir inspecter les recettes' },
        { id: 'e', texte: 'Une compétence limitée aux entreprises publiques bénéficiant de participations en capital' },
      ],
      reponse: 'b',
      explication: "L'article 121 LOFIP confère à l'IGF « une compétence générale en matière de contrôle des finances et des biens publics ». Elle peut accomplir toute enquête ou mission de contrôle, vérification, contre-vérification et surveillance de toutes les opérations financières du Pouvoir central ainsi que des organismes bénéficiant de son concours financier sous forme de participation, subvention, prêt, avance ou garantie.",
    },
    {
      id: 'l3q2',
      question: "D'après l'article 122 LOFIP, par qui les missions de l'IGF sont-elles ordonnées ?",
      options: [
        { id: 'a', texte: "Par le Parlement national, après vote d'une résolution en séance plénière" },
        { id: 'b', texte: "Par l'inspecteur général des finances-chef de service, sur instruction du Premier ministre, sur réquisition des autorités politiques, administratives ou judiciaires, ou sur dénonciation de tiers" },
        { id: 'c', texte: 'Exclusivement par le Président de la République par ordonnance présidentielle' },
        { id: 'd', texte: 'Par le Ministre du Budget après accord du Conseil des ministres' },
        { id: 'e', texte: 'Par la Cour des comptes sur requête des justiciables' },
      ],
      reponse: 'b',
      explication: "L'article 122 LOFIP précise que les missions de l'IGF sont ordonnées par l'inspecteur général des finances-chef de service « soit sur instruction du Premier ministre, soit sur réquisition des autorités politiques, administratives et judiciaires ou sur dénonciation des tiers », selon un programme d'action annuel ou ponctuel approuvé par le ministre des Finances.",
    },
  ],
  L4: [
    {
      id: 'l4q1',
      question: "Conformément à l'article 123 LOFIP et à l'article 180 de la Constitution, quelle est la mission principale de la Cour des comptes ?",
      options: [
        { id: 'a', texte: 'Juger pénalement les ministres auteurs de détournements de fonds publics' },
        { id: 'b', texte: 'Contrôler les comptes de tous les services du Pouvoir central, vérifier a posteriori la régularité des opérations et publier un rapport annuel au Président, au Parlement et au Gouvernement' },
        { id: 'c', texte: 'Autoriser préalablement toutes les dépenses publiques avant leur engagement par les ordonnateurs' },
        { id: 'd', texte: "Recouvrer les impôts dus par les agents de l'État en situation d'irrégularité fiscale" },
        { id: 'e', texte: 'Examiner les projets de loi de finances avant leur dépôt au Parlement' },
      ],
      reponse: 'b',
      explication: "L'article 180 de la Constitution charge la Cour des comptes du « contrôle de la gestion des finances de l'État, des biens et du patrimoine publics. » L'article 123 LOFIP précise qu'elle vérifie « a posteriori, sur pièces et, en cas de besoin, sur place, la régularité des opérations » et publie chaque année un rapport remis au Président de la République, au Parlement et au Gouvernement.",
    },
    {
      id: 'l4q2',
      question: "Selon l'article 126 LOFIP, quels sont les deux types de décisions que la Cour des comptes peut prendre en jugeant les comptes des comptables publics ?",
      options: [
        { id: 'a', texte: 'Des arrêts de validation ou des arrêts de nullité' },
        { id: 'b', texte: 'Des arrêts de quitus ou des arrêts de débet' },
        { id: 'c', texte: "Des jugements de condamnation ou des jugements d'acquittement" },
        { id: 'd', texte: 'Des ordonnances de règlement ou des ordonnances de rejet' },
        { id: 'e', texte: "Des décisions d'approbation ou des décisions de suspension de paiement" },
      ],
      reponse: 'b',
      explication: "L'article 126 LOFIP dispose que « la Cour des comptes juge les comptes des comptables publics pour aboutir soit à des arrêts de quitus, soit à des arrêts de débet suivant les modalités prévues dans le règlement général sur la comptabilité publique. » Le débet engage la responsabilité personnelle et pécuniaire du comptable (Art. 131 LOFIP).",
    },
  ],
  L5: [
    {
      id: 'l5q1',
      question: "D'après l'article 127 LOFIP, quel est le caractère du contrôle parlementaire ?",
      options: [
        { id: 'a', texte: "Un contrôle juridictionnel exercé par les commissions spéciales de l'Assemblée" },
        { id: 'b', texte: 'Un contrôle politique, exercé au cours de la gestion annuelle et a posteriori lors du vote de la loi de reddition des comptes' },
        { id: 'c', texte: 'Un contrôle administratif a priori exercé avant le vote du budget' },
        { id: 'd', texte: "Un contrôle financier exercé exclusivement après clôture de l'exercice" },
        { id: 'e', texte: "Un contrôle consultatif sans effet juridique sur l'exécution budgétaire" },
      ],
      reponse: 'b',
      explication: "L'article 127 LOFIP qualifie expressément le contrôle parlementaire de « contrôle politique ». Il s'exerce d'une part au cours de la gestion annuelle (informations, investigations, auditions de ministres), et d'autre part a posteriori « lors de l'examen et du vote du projet de loi portant reddition des comptes », occasion à laquelle le Parlement prononce la décharge des ordonnateurs.",
    },
    {
      id: 'l5q2',
      question: "Selon l'article 28 LOFIP, quel est l'objet de la loi portant reddition des comptes ?",
      options: [
        { id: 'a', texte: "Autoriser les dépenses provisoires en cas d'absence de loi de finances votée avant le 1er janvier" },
        { id: 'b', texte: "Constater les résultats définitifs de l'exécution de la loi de finances et approuver les différences entre résultats et prévisions" },
        { id: 'c', texte: "Ouvrir des crédits supplémentaires en cours d'exercice pour faire face aux dépenses imprévues" },
        { id: 'd', texte: "Fixer les taux d'imposition pour l'exercice budgétaire suivant" },
        { id: 'e', texte: "Ratifier les accords internationaux conclus par le Gouvernement durant l'exercice" },
      ],
      reponse: 'b',
      explication: "L'article 28 LOFIP dispose que la loi portant reddition des comptes « constate les résultats définitifs de l'exécution de la loi de finances de l'année à laquelle elle se rapporte et approuve les différences entre les résultats et les prévisions de ladite loi complétée, le cas échéant, par les lois de finances rectificatives. »",
    },
  ],
}

// ============================================================
// QCM GLOBAUX (15)
// ============================================================
const QCM_GLOBAUX: QCMData[] = [
  {
    id: 'g1',
    question: "L'article 115 LOFIP précise que les contrôleurs budgétaires sont affectés :",
    options: [
      { id: 'a', texte: 'Uniquement auprès du Ministère des Finances et du Ministère du Budget' },
      { id: 'b', texte: "Auprès de chaque institution et ministère de dépenses et auprès des services déconcentrés de l'État" },
      { id: 'c', texte: 'Auprès de la Cour des comptes uniquement, pour assistance au contrôle juridictionnel' },
      { id: 'd', texte: 'Auprès des seuls ministères à dépenses supérieures à un seuil fixé par décret' },
      { id: 'e', texte: "Auprès de la Présidence de la République et de l'Assemblée nationale uniquement" },
    ],
    reponse: 'b',
    explication: "L'article 115 LOFIP dispose que « les contrôleurs budgétaires sont affectés auprès de chaque institution et ministère de dépenses et auprès des services déconcentrés de l'État. » Leur déploiement est donc universel dans l'administration centrale et déconcentrée.",
  },
  {
    id: 'g2',
    question: "Conformément à l'article 116 LOFIP, le contrôle effectué par l'ordonnateur porte notamment sur :",
    options: [
      { id: 'a', texte: 'La qualité des pièces justificatives des dépenses et la vérification des signatures' },
      { id: 'b', texte: "La régularité des opérations, l'exhaustivité de leur enregistrement, l'efficacité de la dépense et la maîtrise des coûts" },
      { id: 'c', texte: 'Exclusivement la disponibilité des crédits avant tout engagement de dépense' },
      { id: 'd', texte: "La conservation des droits, privilèges et hypothèques de l'État" },
      { id: 'e', texte: "L'exactitude des liquidations fiscales établies par la DGI" },
    ],
    reponse: 'b',
    explication: "L'article 116 LOFIP précise que le contrôle de l'ordonnateur porte sur « la régularité des opérations de recettes et de dépenses, l'exhaustivité de leur enregistrement, l'efficacité de la dépense en conformité avec le budget et le suivi et la maîtrise des coûts en relation avec la mise en œuvre des actions ou activités programmées. »",
  },
  {
    id: 'g3',
    question: "L'article 119 LOFIP impose que tout ordonnancement de dépense ne peut être transféré au comptable public que :",
    options: [
      { id: 'a', texte: 'Après approbation du Conseil des ministres et signature du Premier ministre' },
      { id: 'b', texte: 'Après avoir été revêtu du visa du contrôleur budgétaire' },
      { id: 'c', texte: "Après publication de l'acte d'ordonnancement au Journal officiel" },
      { id: 'd', texte: 'Après notification à la Cour des comptes et délai de 15 jours sans opposition' },
      { id: 'e', texte: "Après certification par l'Inspection Générale des Finances" },
    ],
    reponse: 'b',
    explication: "L'article 119 LOFIP est formel : « tout ordonnancement de dépense ne peut être transféré au comptable public qu'après avoir été revêtu du visa du contrôleur budgétaire. » Cette règle assure le lien entre le contrôle a priori (visa) et le paiement effectif par le comptable.",
  },
  {
    id: 'g4',
    question: "Selon l'article 117 LOFIP, le contrôle effectué par le comptable public porte sur :",
    options: [
      { id: 'a', texte: "L'efficacité des programmes et la performance des actions budgétaires" },
      { id: 'b', texte: "La réalisation des recettes, l'exécution des dépenses et la gestion du patrimoine" },
      { id: 'c', texte: "Uniquement la disponibilité des crédits et l'imputation budgétaire correcte" },
      { id: 'd', texte: 'Exclusivement la légalité des décisions prises par les ordonnateurs' },
      { id: 'e', texte: 'La régularité des procédures de passation des marchés publics' },
    ],
    reponse: 'b',
    explication: "L'article 117 LOFIP dispose que « le contrôle effectué par le comptable public porte sur la réalisation des recettes, l'exécution des dépenses ainsi que la gestion du patrimoine. » Ces trois domaines correspondent aux trois compétences du comptable public détaillées aux articles 118, 119 et 120.",
  },
  {
    id: 'g5',
    question: "L'article 120 LOFIP précise que, en matière de patrimoine, le comptable public contrôle exclusivement :",
    options: [
      { id: 'a', texte: "L'inventaire annuel des biens meubles et immeubles de l'État" },
      { id: 'b', texte: 'La conservation des droits, privilèges et hypothèques' },
      { id: 'c', texte: "La valorisation comptable des actifs immobilisés de l'État" },
      { id: 'd', texte: 'La cession des biens domaniaux selon les procédures légales' },
      { id: 'e', texte: "La régularité des contrats de location du patrimoine immobilier de l'État" },
    ],
    reponse: 'b',
    explication: "L'article 120 LOFIP est précis : en matière de patrimoine, le comptable public « contrôle exclusivement la conservation des droits, privilèges et hypothèques. » Cette compétence exclusive écarte toute ingérence dans les décisions de gestion patrimoniale relevant des ordonnateurs.",
  },
  {
    id: 'g6',
    question: "L'article 124 LOFIP confie à la Cour des comptes la mission d'assister l'Assemblée nationale. Dans quel cadre spécifique cette assistance s'exerce-t-elle ?",
    options: [
      { id: 'a', texte: "Dans le cadre de l'élaboration du projet de loi de finances pour l'année suivante" },
      { id: 'b', texte: "Dans le contrôle de l'exécution de la loi de finances, notamment par l'évaluation des rapports de performance" },
      { id: 'c', texte: 'Dans la procédure de mise en accusation des ministres devant la Haute Cour de justice' },
      { id: 'd', texte: "Dans l'examen préalable de la constitutionnalité des projets de loi de finances rectificative" },
      { id: 'e', texte: 'Dans la négociation des accords de prêts avec les partenaires internationaux' },
    ],
    reponse: 'b',
    explication: "L'article 124 LOFIP dispose que « la Cour des comptes assiste l'Assemblée nationale dans le contrôle de l'exécution de la loi de finances. Elle évalue notamment les rapports de performance. » Cette assistance technique renforce le contrôle parlementaire a posteriori.",
  },
  {
    id: 'g7',
    question: "L'article 125 LOFIP précise que le contrôle juridictionnel est effectué sur la gestion des ordonnateurs. Sur quoi porte-t-il exactement ?",
    options: [
      { id: 'a', texte: 'Sur la performance des programmes gérés par les ordonnateurs' },
      { id: 'b', texte: 'Sur la régularité de leurs actes, règlements ou décisions' },
      { id: 'c', texte: 'Sur la légalité des procédures de passation des marchés publics uniquement' },
      { id: 'd', texte: 'Sur la conformité des états financiers aux normes SYSCOHADA' },
      { id: 'e', texte: 'Sur les déclarations fiscales produites par les ordonnateurs en leur qualité de contribuables' },
    ],
    reponse: 'b',
    explication: "L'article 125 LOFIP dispose que « le contrôle juridictionnel est effectué sur la gestion des ordonnateurs, eu égard à la régularité de leurs actes, règlements ou décisions. » Il est distinct du contrôle sur les comptables publics (Art. 126), qui aboutit à des arrêts de quitus ou de débet.",
  },
  {
    id: 'g8',
    question: "Conformément à l'article 129 LOFIP, quelle est la sanction spécifique pour faute de gestion ?",
    options: [
      { id: 'a', texte: "Une peine d'emprisonnement de 1 à 5 ans selon la gravité du préjudice causé" },
      { id: 'b', texte: 'Une condamnation à une amende dont le montant ne peut atteindre le double du traitement ou salaire brut annuel, sans être inférieur au quart' },
      { id: 'c', texte: "Une révocation d'office prononcée par le Conseil des ministres" },
      { id: 'd', texte: "Un arrêt de débet prononcé par la Cour des comptes, sans possibilité d'appel" },
      { id: 'e', texte: 'Une suspension de fonctions pour une durée de 6 mois à 2 ans' },
    ],
    reponse: 'b',
    explication: "L'article 129 LOFIP précise que « la sanction pour faute de gestion réside dans la condamnation de la personne incrimée, à une amende dont le montant ne pourra atteindre le double du traitement ou salaire brut annuel alloué à la date de l'infraction sans être inférieur au quart. » Des sanctions disciplinaires, civiles et pénales peuvent s'ajouter.",
  },
  {
    id: 'g9',
    question: "Selon l'article 130 LOFIP, qu'est-ce qu'un comptable de fait ?",
    options: [
      { id: 'a', texte: 'Un comptable public nommé par intérim sans acte officiel de nomination' },
      { id: 'b', texte: "Toute personne qui s'ingère dans les opérations de recettes, de dépenses ou de maniement de valeurs sans avoir qualité ni titre de comptable public" },
      { id: 'c', texte: "Un agent comptable agissant sous la direction d'un comptable principal" },
      { id: 'd', texte: 'Un comptable public dont le compte de gestion est en déficit constaté par la Cour des comptes' },
      { id: 'e', texte: 'Un agent des finances nommé par décret sans prestation de serment préalable' },
    ],
    reponse: 'b',
    explication: "L'article 130 LOFIP définit le comptable de fait comme « toute personne qui s'ingère dans les opérations de recettes, de dépenses ou de maniement de valeurs sans avoir qualité pour le faire ou sans avoir le titre de comptable public. » Il est soumis aux mêmes obligations et responsabilités qu'un comptable public régulier, sans préjudice des sanctions pénales ou administratives.",
  },
  {
    id: 'g10',
    question: "L'article 131 LOFIP confie à la Cour des comptes le jugement des fautes de gestion. Quelle est la spécificité de la responsabilité du comptable public ?",
    options: [
      { id: 'a', texte: "Le comptable est responsable collectivement avec l'ordonnateur des déficits constatés" },
      { id: 'b', texte: "La responsabilité personnelle et pécuniaire du comptable est mise en cause au moyen d'une décision de débet prononcée par la Cour des comptes" },
      { id: 'c', texte: "Le comptable n'est responsable que des erreurs matérielles commises dans les écritures comptables" },
      { id: 'd', texte: 'La responsabilité du comptable est limitée aux défaillances constatées sur les dépenses, non sur les recettes' },
      { id: 'e', texte: "Le comptable bénéficie d'une immunité fonctionnelle pour les actes accomplis de bonne foi" },
    ],
    reponse: 'b',
    explication: "L'article 131 LOFIP dispose que « la responsabilité personnelle et pécuniaire du comptable est mise en cause au moyen d'une décision de débet prononcée par la Cour des comptes. » Le débet oblige le comptable à combler de ses propres deniers le déficit constaté dans sa gestion.",
  },
  {
    id: 'g11',
    question: "L'article 128 LOFIP établit la responsabilité des ordonnateurs. Les membres du Gouvernement en tant qu'ordonnateurs sont notamment responsables de :",
    options: [
      { id: 'a', texte: 'La certification personnelle de tous les mandats de paiement émis par leurs ministères' },
      { id: 'b', texte: "Les certifications qu'ils délivrent et des résultats atteints par rapport aux objectifs du budget de programmes exécuté sous leur autorité" },
      { id: 'c', texte: 'Exclusivement des dépassements de crédits autorisés par ordonnance-loi' },
      { id: 'd', texte: 'La présentation personnelle devant la Cour des comptes de tous les comptes de gestion annuels' },
      { id: 'e', texte: "Le versement immédiat à la Caisse du Trésor de tout solde positif de crédits en fin d'exercice" },
    ],
    reponse: 'b',
    explication: "L'article 128 LOFIP dispose que « les ordonnateurs sont responsables des certifications qu'ils délivrent » et que les membres du Gouvernement « sont également responsables des résultats atteints par rapport aux objectifs attachés au budget de programmes établi et exécuté sous leur autorité. »",
  },
  {
    id: 'g12',
    question: "L'article 29 LOFIP définit la loi portant reddition des comptes. Parmi ses attributions, laquelle concerne les crédits ouverts par Ordonnance-loi du Président de la République ?",
    options: [
      { id: 'a', texte: 'Elle les annule automatiquement sans possibilité de ratification' },
      { id: 'b', texte: 'Elle les ratifie, le cas échéant, et approuve par vote des crédits complémentaires les dépassements résultant de cas de force majeure' },
      { id: 'c', texte: "Elle les réaffecte d'office vers les programmes déficitaires de l'exercice" },
      { id: 'd', texte: "Elle les soumet à un audit obligatoire de l'IGF avant toute ratification" },
      { id: 'e', texte: 'Elle les exclut du champ de la loi de reddition, qui ne couvre que les crédits votés initialement' },
    ],
    reponse: 'b',
    explication: "L'article 29 LOFIP dispose que la loi portant reddition des comptes « ratifie, le cas échéant, les crédits ouverts par Ordonnance-loi du Président de la République et approuve, par le vote des crédits complémentaires, les dépassements de crédits résultant des cas de force majeure. »",
  },
  {
    id: 'g13',
    question: "L'article 30 LOFIP prévoit que la loi de reddition des comptes établit le compte de résultats. Quels éléments ce compte comprend-il ?",
    options: [
      { id: 'a', texte: 'Uniquement les recettes fiscales et les dépenses de fonctionnement du budget général' },
      { id: 'b', texte: "Le déficit ou l'excédent du budget général et des budgets annexes, les profits et pertes des comptes spéciaux, et les résultats des opérations de trésorerie" },
      { id: 'c', texte: "Exclusivement les soldes de trésorerie en fin d'exercice, sans intégrer les comptes spéciaux" },
      { id: 'd', texte: "Le bilan d'ouverture de l'exercice suivant, préparé par le Ministère des Finances" },
      { id: 'e', texte: 'Les recettes de la Caisse nationale de péréquation et la répartition provinciale' },
    ],
    reponse: 'b',
    explication: "L'article 30 LOFIP décrit le compte de résultats comme comprenant : « le déficit ou l'excédent résultant de la différence entre les recettes et les dépenses du budget général et des budgets annexes ; les profits et pertes constatés dans l'exécution des comptes spéciaux ; les profits et pertes résultant éventuellement de la gestion des opérations de trésorerie. »",
  },
  {
    id: 'g14',
    question: "L'article 118 LOFIP limite le contrôle du comptable public en matière de recettes. Il porte exclusivement sur :",
    options: [
      { id: 'a', texte: "La réalité des créances de l'État et la solvabilité des débiteurs" },
      { id: 'b', texte: "L'autorisation de la perception des recettes, l'exactitude de leur liquidation et mise en recouvrement, et la régularité des réductions et annulations de titres" },
      { id: 'c', texte: 'La conformité des recettes aux prévisions inscrites dans la loi de finances' },
      { id: 'd', texte: 'La comptabilisation immédiate des recettes dans les systèmes informatiques du Trésor' },
      { id: 'e', texte: "La transmission des recettes à la Cour des comptes dans les délais prévus à l'article 82 LOFIP" },
    ],
    reponse: 'b',
    explication: "L'article 118 LOFIP précise que « le comptable public contrôle exclusivement l'autorisation de leur perception, l'exactitude de leur liquidation et mise en recouvrement et de la régularité des réductions et des annulations de titres y afférents. » Le terme « exclusivement » est important : il délimite strictement la compétence du comptable.",
  },
  {
    id: 'g15',
    question: "L'article 127 LOFIP précise que lors du contrôle parlementaire, les informations demandées par le Parlement ou les investigations qu'il entend conduire :",
    options: [
      { id: 'a', texte: 'Peuvent lui être refusées si elles relèvent du secret défense ou du secret des affaires' },
      { id: 'b', texte: "Ne peuvent lui être refusées, et il procède à l'audition des ministres et des responsables des programmes" },
      { id: 'c', texte: 'Doivent être autorisées par le Président de la République avant transmission au Parlement' },
      { id: 'd', texte: 'Sont limitées aux cinq derniers exercices budgétaires clos' },
      { id: 'e', texte: 'Doivent être filtrées par la Cour des comptes avant leur communication aux parlementaires' },
    ],
    reponse: 'b',
    explication: "L'article 127 LOFIP est catégorique : « les informations qu'il demande ou les investigations sur pièces ou sur place qu'il entend conduire, ne peuvent lui être refusées. Il procède à l'audition des ministres et des responsables des programmes. » Ce droit absolu d'accès est le fondement du contrôle parlementaire effectif.",
  },
]

// ============================================================
// CAS PRATIQUES (5)
// ============================================================
const ETUDES_DE_CAS: EtudeCas[] = [
  {
    titre: "Cas pratique 1 : Engagement de dépense sans visa du contrôleur budgétaire — violation de l'article 112 LOFIP",
    contexte: "Le Directeur de l'administration du Ministère de l'Éducation nationale signe un contrat de marché public de 500 millions FC avec une entreprise de construction sans soumettre le contrat au visa préalable du contrôleur budgétaire. Il justifie cette omission par l'urgence des travaux devant commencer avant la rentrée scolaire. Le contrôleur budgétaire, informé après la signature, refuse de valider rétroactivement l'acte. Le comptable public reçoit les mandats de paiement pour exécuter la dépense.",
    questions: [
      {
        num: '1',
        enonce: 'Analysez la régularité du contrat signé sans visa du contrôleur budgétaire au regard des articles 112 et 119 LOFIP.',
        correction: "Le contrat est irrégulier. L'article 112 LOFIP impose que « tous les actes portant engagement, liquidation et ordonnancement sont soumis à son visa préalable. » Le visa est donc une condition de régularité de l'engagement, et non une simple formalité postérieure. L'article 119 LOFIP renforce cette exigence : aucun ordonnancement ne peut être transféré au comptable public sans le visa du contrôleur. L'urgence ne constitue pas une cause exonératoire prévue par la LOFIP.",
      },
      {
        num: '2',
        enonce: "Le comptable public peut-il procéder au paiement des mandats reçus, sachant que l'ordonnancement n'a pas été visé ? Fondez votre réponse sur l'article 119 LOFIP.",
        correction: "Non. L'article 119 LOFIP exige que « tout ordonnancement de dépense ne peut être transféré au comptable public qu'après avoir été revêtu du visa du contrôleur budgétaire. » Le même article ajoute que « le comptable public procède à un contrôle de régularité avant paiement sur toute dépense » et vérifie notamment « l'existence de l'intervention des contrôles préalables. » S'il paie sans visa, il engage sa responsabilité personnelle et pécuniaire (Art. 131 LOFIP).",
      },
      {
        num: '3',
        enonce: 'Quelles sont les sanctions encourues par le Directeur qui a engagé la dépense sans visa, conformément aux articles 128, 129 et 131 LOFIP ?',
        correction: "Le Directeur a commis une faute de gestion au sens de l'article 129 LOFIP qui vise notamment « qui n'aura pas respecté les règles d'engagement des dépenses » et « qui aura engagé des dépenses sans disponibilité des crédits » (si les crédits ne sont pas disponibles). L'article 128 LOFIP le rend responsable des certifications délivrées. L'article 131 LOFIP confère compétence à la Cour des comptes pour examiner et juger cette faute. La sanction est une amende (Art. 129), ainsi que des sanctions disciplinaires, civiles et pénales.",
      },
    ],
  },
  {
    titre: "Cas pratique 2 : Le contrôleur budgétaire révoqué après refus de visa — violation de l'article 113 LOFIP",
    contexte: "Le contrôleur budgétaire du Ministère des Infrastructures refuse de viser un contrat d'un milliard FC en raison d'une imputation budgétaire erronée et de l'absence de crédits disponibles. Le Ministre des Infrastructures, mécontent de ce refus, adresse au Ministre du Budget une demande de révocation immédiate du contrôleur pour « obstruction au fonctionnement des services. » Deux jours après, le contrôleur est remplacé et son successeur vise l'acte sans réserver.",
    questions: [
      {
        num: '1',
        enonce: "La révocation du contrôleur budgétaire est-elle légale au regard de l'article 113 LOFIP ? Analysez la protection légale du contrôleur.",
        correction: "La révocation est illicite. L'article 113 LOFIP dispose expressément que si le contrôleur refuse le visa parce que les actes lui paraissent entachés d'irrégularités, « il ne peut en aucun cas être sanctionné. » Cette protection est absolue et vise précisément à garantir l'indépendance fonctionnelle du contrôleur. Révoquer un contrôleur pour avoir refusé un visa irrégulier constitue une violation directe de l'article 113 LOFIP.",
      },
      {
        num: '2',
        enonce: "Quelle était la procédure légale que le Ministre des Infrastructures aurait dû suivre pour contester le refus de visa, conformément à l'article 114 LOFIP ?",
        correction: "L'article 114 LOFIP prévoit la procédure exacte : en cas de désaccord persistant avec l'ordonnateur auprès duquel il est rattaché, le contrôleur budgétaire en réfère au « ministre ayant le budget dans ses attributions. » Il ne peut être passé outre au refus de visa que sur « autorisation motivée écrite dudit ministre. » Le Ministre des Infrastructures aurait dû solliciter cette autorisation écrite du Ministre du Budget, et non exiger la révocation du contrôleur.",
      },
      {
        num: '3',
        enonce: 'Quel est le statut juridique du visa accordé par le successeur du contrôleur révoqué ? Le contrat est-il régularisable sur cette base ?',
        correction: "Le visa accordé par le successeur ne régularise pas l'irrégularité initiale si les conditions de fond (imputation correcte, crédits disponibles) ne sont toujours pas réunies. Le contrôle prévu à l'article 112 LOFIP porte sur la « régularité budgétaire, la disponibilité des crédits et les imputations correctes ». Si ces conditions sont encore absentes, le visa du successeur est lui-même irrégulier et expose son auteur aux sanctions de l'article 129 LOFIP pour avoir contribué à un engagement irrégulier.",
      },
    ],
  },
  {
    titre: "Cas pratique 3 : Comptable de fait — violation de l'article 130 LOFIP",
    contexte: "Un chef de service du Ministère de la Santé, sans titre de comptable public, perçoit directement des fonds de bailleurs internationaux destinés à un programme de vaccination. Il gère ces fonds de manière autonome, effectue des paiements aux prestataires et tient une comptabilité informelle. L'IGF, lors d'une mission de contrôle, découvre que 200 millions FC ne peuvent être justifiés par aucune pièce. Le chef de service soutient que sa gestion était « informelle mais efficace ».",
    questions: [
      {
        num: '1',
        enonce: "Qualifiez juridiquement la situation du chef de service au regard de l'article 130 LOFIP. Quelles sont les conséquences de cette qualification ?",
        correction: "Le chef de service est un comptable de fait au sens de l'article 130 LOFIP qui définit comme tel « toute personne qui s'ingère dans les opérations de recettes, de dépenses ou de maniement de valeurs sans avoir qualité pour le faire ou sans avoir le titre de comptable public. » La conséquence est immédiate : il « est soumis aux mêmes obligations et assume les mêmes responsabilités qu'un comptable public », sans préjudice des sanctions pénales ou administratives qu'il peut encourir.",
      },
      {
        num: '2',
        enonce: "L'argument de l'efficacité informelle avancé par le chef de service est-il recevable en droit des finances publiques ? Analysez-le à la lumière de la LOFIP.",
        correction: "L'argument est juridiquement irrecevable. Le droit des finances publiques repose sur le principe de la séparation des ordonnateurs et des comptables et sur l'exigence d'une habilitation légale pour manier des fonds publics. L'efficacité prétendue ne peut jamais légitimer une irrégularité de droit public. L'article 129 LOFIP vise expressément « qui aura engagé des dépenses sans en avoir le pouvoir ou reçu délégation » comme faute de gestion sanctionnable, indépendamment du résultat ob-tenu.",
      },
      {
        num: '3',
        enonce: 'Quelle juridiction est compétente pour juger le comptable de fait et sanctionner les 200 millions FC injustifiés ? Fondez votre réponse sur les articles 130 et 131 LOFIP.',
        correction: "La Cour des comptes est compétente. L'article 131 LOFIP dispose que « les fautes de gestion visées à l'article 129 LOFIP commises par les contrôleurs budgétaires, les comptables publics, les ordonnateurs autres que les membres du gouvernement et les responsables d'institution, sont examinées et jugées par la Cour des comptes. » Or le comptable de fait étant soumis aux mêmes règles qu'un comptable public (Art. 130), la Cour des comptes peut prononcer un arrêt de débet pour les 200 millions FC injustifiés, obligeant le chef de service à les combler de ses propres deniers.",
      },
    ],
  },
  {
    titre: "Cas pratique 4 : Refus de communication d'informations au Parlement — violation de l'article 127 LOFIP",
    contexte: "La commission des finances de l'Assemblée nationale demande au Ministre du Budget la communication de tous les rapports d'exécution budgétaire du premier semestre 2026, ainsi que les rapports de performance des ministres émetteurs de programmes. Le Ministre répond que « certains documents sont couverts par le secret de l'administration » et refuse de les transmettre. La commission invite également le Ministre des Finances à une audition qu'il décline.",
    questions: [
      {
        num: '1',
        enonce: "Le Ministre du Budget peut-il légalement invoquer le secret de l'administration pour refuser de communiquer les documents budgétaires demandés ? Analysez au regard de l'article 127 LOFIP.",
        correction: "Non. L'article 127 LOFIP est catégorique : « les informations qu'il [le Parlement] demande ou les investigations sur pièces ou sur place qu'il entend conduire, ne peuvent lui être refusées. » La LOFIP ne prévoit aucune exception basée sur le secret de l'administration pour les documents d'exécution budgétaire. Le refus du Ministre constitue une violation directe de l'article 127 LOFIP qui fonde l'intégralité du droit de contrôle parlementaire sur l'exécution des lois de finances.",
      },
      {
        num: '2',
        enonce: "Le déclinement de l'audition par le Ministre des Finances est-il conforme au droit ? Quelles sont les prérogatives du Parlement en matière d'audition conformément à l'article 127 LOFIP ?",
        correction: "Le déclinement n'est pas conforme au droit. L'article 127 LOFIP dispose expressément que « le Parlement procède à l'audition des ministres et des responsables des programmes. » Cette formulation est impérative. Par ailleurs, la Constitution (Art. 138) confère à l'Assemblée nationale des pouvoirs de contrôle sur le Gouvernement, incluant le droit d'audition. Un ministre ne peut refuser de comparaître devant une commission parlementaire compétente sans engager la responsabilité politique du Gouvernement.",
      },
      {
        num: '3',
        enonce: "Quels mécanismes constitutionnels et légaux l'Assemblée nationale peut-elle activer pour contraindre le Gouvernement à respecter ses obligations de communication budgétaire ?",
        correction: "L'Assemblée nationale dispose de plusieurs leviers : (1) Question orale avec débat (Art. 138 Constitution) pour contraindre le Gouvernement à s'expliquer publiquement. (2) Motion de censure (Art. 146 Constitution) si le Gouvernement refuse systématiquement le contrôle parlementaire — sanction ultime engageant la responsabilité du Gouvernement. (3) Saisine de la Cour des comptes pour qu'elle assiste le Parlement dans l'obtention des documents (Art. 124 LOFIP). (4) Résolution parlementaire enjoignant au Gouvernement de communiquer les documents sous un délai fixé. Le non-respect de ces procédures peut conduire à une crise institutionnelle relevant de la Cour constitutionnelle.",
      },
    ],
  },
  {
    titre: 'Cas pratique 5 : Loi de reddition des comptes non déposée — analyse des articles 28-31 LOFIP',
    contexte: "En juin 2026, le Gouvernement n'a pas encore déposé le projet de loi portant reddition des comptes de l'exercice 2024. La Cour des comptes a publié en mai 2026 son rapport sur l'exécution du budget 2024 (LF 2024), faisant état de dépassements de crédits de 450 milliards FC ouverts par Ordonnance-loi présidentielle et de 73 milliards FC de dépenses sans ordonnancement préalable. Le Gouvernement invoque des difficultés de centralisation des comptes de certaines provinces.",
    questions: [
      {
        num: '1',
        enonce: "Analysez l'objet et la portée juridique de la loi portant reddition des comptes à partir des articles 28, 29 et 30 LOFIP. Pourquoi son absence constitue-t-elle une violation des obligations légales ?",
        correction: "La loi de reddition des comptes a un triple objet légal : (1) Art. 28 : elle « constate les résultats définitifs de l'exécution de la loi de finances » et « approuve les différences entre résultats et prévisions ». (2) Art. 29 : elle « arrête le compte général du pouvoir central » et « règle définitivement le budget de l'exercice précédent ». (3) Art. 30 : elle établit le compte de résultats. Son absence prive le Parlement de son droit de prononcer la décharge des ordonnateurs (Art. 127 LOFIP) et laisse en suspens les résultats juridiques de l'exécution 2024.",
      },
      {
        num: '2',
        enonce: "Les 450 milliards FC de dépassements de crédits ouverts par Ordonnance-loi présidentielle peuvent-ils être régularisés sans loi de reddition des comptes ? Fondez votre réponse sur l'article 29 LOFIP.",
        correction: "Non. L'article 29 LOFIP dispose expressément que la loi portant reddition des comptes « ratifie, le cas échéant, les crédits ouverts par Ordonnance-loi du Président de la République. » La ratification est un acte juridique spécifique qui nécessite le vote d'une loi par le Parlement. Sans ce vote, les 450 milliards FC demeurent dans un vide juridique : autorisés provisoirement par ordonnance, mais non confirmés définitivement par le Parlement. Ils restent juridiquement fragiles et contestables.",
      },
      {
        num: '3',
        enonce: 'Quelle est la responsabilité du Gouvernement pour les 73 milliards FC de dépenses sans ordonnancement préalable, et quelle juridiction est compétente pour en connaître conformément aux articles 125, 126 et 131 LOFIP ?',
        correction: "Les dépenses sans ordonnancement préalable violent la chaîne réglementaire de la dépense (Art. 90 LOFIP). Les ordonnateurs qui ont validé ces paiements ont commis une faute de gestion au sens de l'article 129 LOFIP. La Cour des comptes, compétente en vertu de l'article 131 LOFIP, peut examiner et juger ces fautes. Pour les comptables publics qui ont payé sans ordonnancement visé, la Cour peut prononcer des arrêts de débet (Art. 126 LOFIP), mettant en cause leur responsabilité personnelle et pécuniaire. L'IGF peut également diligenter un rapport transmis aux autorités compétentes (Art. 122 LOFIP).",
      },
    ],
  },
]

// ============================================================
// QCM BLOCK
// ============================================================
function QCMBlock({ qcm }: { qcm: QCMData }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (id: string) => {
    if (showResult) return
    setSelected(id)
    setShowResult(true)
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <p className="font-semibold text-sm text-foreground leading-snug">{qcm.question}</p>
      <div className="space-y-2">
        {qcm.options.map(opt => {
          const isCorrect = opt.id === qcm.reponse
          const isSelected = opt.id === selected
          let cls = 'w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors '
          if (!showResult) cls += 'border-border bg-background hover:bg-muted'
          else if (isCorrect) cls += 'border-green-500 bg-green-50 text-green-800'
          else if (isSelected) cls += 'border-red-500 bg-red-50 text-red-800'
          else cls += 'border-border bg-background opacity-60'
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
            ? 'bg-green-50 text-green-800'
            : 'bg-red-50 text-red-800'
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
    <div className="rounded-xl border border-orange-200 bg-card overflow-hidden">
      <div className="bg-orange-50 px-4 py-3 border-b border-orange-200">
        <span className="text-xs font-bold text-orange-700 uppercase tracking-wide">Cas pratique {index + 1}</span>
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
                <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-xs text-orange-900 leading-relaxed">
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
export default function UE5Chapitre9Page() {
  const goBack = useGoBack('/ue5-finances-publiques')
  const user = useUser()
  const role = (user as any)?.role || 'etudiant'
  const isAdmin = role === 'admin' || role === 'professeur' || role === 'assistant'

  const [activeTab, setActiveTab] = useState<'lecons' | 'qcm' | 'cas' | 'devoir'>('lecons')
  const [activeLecon, setActiveLecon] = useState(0)

  const lecons = [
    {
      titre: "Leçon 1 — Vue d'ensemble des types de contrôle",
      source: 'LOFIP Art. 111, 127 · Constitution Art. 178-180',
      contenu: (
        <div className="space-y-4 text-sm text-foreground leading-relaxed">
          <div>
            <h4 className="font-bold text-foreground mb-2">Définition du contrôle administratif (Art. 111 LOFIP)</h4>
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-xs italic text-muted-foreground">Art. 111 LOFIP : « Le contrôle administratif est le contrôle de l'administration sur ses services. »</p>
            </div>
            <p className="mt-2">Il s'agit d'un contrôle interne, exercé à l'intérieur de l'administration elle-même, par opposition au contrôle juridictionnel (Cour des comptes) et au contrôle politique (Parlement). La LOFIP organise trois niveaux de contrôle des finances publiques, chacun avec ses organes, sa nature et ses effets juridiques.</p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Tableau synoptique des types de contrôle (Art. 111, 121, 123, 127 LOFIP)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-orange-100">
                    <th className="border border-orange-200 px-3 py-2 text-left font-bold">Type</th>
                    <th className="border border-orange-200 px-3 py-2 text-left font-bold">Nature</th>
                    <th className="border border-orange-200 px-3 py-2 text-left font-bold">Moment</th>
                    <th className="border border-orange-200 px-3 py-2 text-left font-bold">Organe</th>
                    <th className="border border-orange-200 px-3 py-2 text-left font-bold">Base légale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-muted/30">
                    <td className="border border-border px-3 py-2">Administratif a priori</td>
                    <td className="border border-border px-3 py-2">Interne, préventif</td>
                    <td className="border border-border px-3 py-2">Avant engagement</td>
                    <td className="border border-border px-3 py-2">Contrôleur budgétaire</td>
                    <td className="border border-border px-3 py-2">Art. 112-115 LOFIP</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="border border-border px-3 py-2">Administratif a posteriori</td>
                    <td className="border border-border px-3 py-2">Interne, répressif</td>
                    <td className="border border-border px-3 py-2">Après exécution</td>
                    <td className="border border-border px-3 py-2">IGF, ordonnateur, comptable</td>
                    <td className="border border-border px-3 py-2">Art. 116-122 LOFIP</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="border border-border px-3 py-2">Juridictionnel</td>
                    <td className="border border-border px-3 py-2">Externe, sanctionnateur</td>
                    <td className="border border-border px-3 py-2">Après clôture</td>
                    <td className="border border-border px-3 py-2">Cour des comptes</td>
                    <td className="border border-border px-3 py-2">Art. 123-126 LOFIP, Art. 180 Constitution</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="border border-border px-3 py-2">Parlementaire</td>
                    <td className="border border-border px-3 py-2">Politique, démocratique</td>
                    <td className="border border-border px-3 py-2">En cours + a posteriori</td>
                    <td className="border border-border px-3 py-2">Assemblée nationale, Sénat</td>
                    <td className="border border-border px-3 py-2">Art. 127 LOFIP, Art. 178 Constitution</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3">
            <p className="text-xs font-semibold text-orange-800">Constitution Art. 180</p>
            <p className="text-xs text-orange-700 mt-1 italic">
              « La Cour des comptes est chargée du contrôle de la gestion des finances de l'État, des biens et du patrimoine publics. »
            </p>
          </div>
          <div className="space-y-3">
            {QCM_LECONS.L1.map(q => <QCMBlock key={q.id} qcm={q} />)}
          </div>
        </div>
      ),
    },
    {
      titre: 'Leçon 2 — Le contrôleur budgétaire (Art. 112-115 LOFIP)',
      source: 'LOFIP Art. 112, 113, 114, 115',
      contenu: (
        <div className="space-y-4 text-sm text-foreground leading-relaxed">
          <div>
            <h4 className="font-bold text-foreground mb-2">Le visa préalable obligatoire (Art. 112 LOFIP)</h4>
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-xs italic text-muted-foreground">Art. 112 LOFIP : « Le contrôle administratif a priori des opérations budgétaires de dépenses du pouvoir central est assuré par le contrôleur budgétaire. Tous les actes portant engagement, liquidation et ordonnancement sont soumis à son visa préalable notamment, les contrats, arrêtés, mesures ou décisions émanant d'un responsable d'Institution, d'un ministre, d'un responsable de service déconcentré ou d'un fonctionnaire habilité. »</p>
            </div>
            <p className="mt-2">Le visa préalable couvre les trois premières phases de la chaîne de la dépense (Art. 90 LOFIP) : engagement, liquidation et ordonnancement. Il est obligatoire pour tous les actes, sans distinction de montant.</p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Protection du contrôleur contre les sanctions (Art. 113 LOFIP)</h4>
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-xs italic text-muted-foreground">Art. 113 LOFIP : « Si les actes de l'ordonnateur lui paraissent entachés d'irrégularités au regard des dispositions qui précèdent, le contrôleur refuse le visa. Pour ce faire, il ne peut en aucun cas être sanctionné. »</p>
            </div>
            <p className="mt-2">Cette protection absolue garantit l'indépendance fonctionnelle du contrôleur budgétaire. Aucune autorité, fût-elle hiérarchique, ne peut sanctionner un contrôleur pour avoir refusé un visa irrégulier.</p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Procédure de désaccord persistant (Art. 114 LOFIP)</h4>
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-xs italic text-muted-foreground">Art. 114 LOFIP : « En cas de désaccord persistant avec l'ordonnateur auprès duquel il est rattaché, le contrôleur budgétaire en réfère, selon le cas, au ministre ayant le budget dans ses attributions au niveau central ou au représentant du pouvoir central en province. Il ne peut être passé outre au refus de visa que sur autorisation motivée écrite dudit ministre ou représentant du pouvoir central. »</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Déploiement territorial (Art. 115 LOFIP)</h4>
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-xs italic text-muted-foreground">Art. 115 LOFIP : « Les contrôleurs budgétaires sont affectés auprès de chaque institution et ministère de dépenses et auprès des services déconcentrés de l'État. »</p>
            </div>
          </div>
          <div className="space-y-3">
            {QCM_LECONS.L2.map(q => <QCMBlock key={q.id} qcm={q} />)}
          </div>
        </div>
      ),
    },
    {
      titre: "Leçon 3 — L'Inspection Générale des Finances (Art. 121-122 LOFIP)",
      source: 'LOFIP Art. 116-122',
      contenu: (
        <div className="space-y-4 text-sm text-foreground leading-relaxed">
          <div>
            <h4 className="font-bold text-foreground mb-2">Contrôles de l'ordonnateur et du comptable (Art. 116-120 LOFIP)</h4>
            <div className="space-y-2">
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-xs text-foreground mb-1">Art. 116 — Contrôle de l'ordonnateur</p>
                <p className="text-xs text-muted-foreground">Porte sur : la régularité des opérations, l'exhaustivité de leur enregistrement, l'efficacité de la dépense en conformité avec le budget, le suivi et la maîtrise des coûts.</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-xs text-foreground mb-1">Art. 117-120 — Contrôle du comptable public</p>
                <p className="text-xs text-muted-foreground">
                  Porte sur trois domaines exclusifs :<br />
                  • Recettes (Art. 118) : autorisation de perception, exactitude liquidation, régularité des annulations<br />
                  • Dépenses (Art. 119) : qualité ordonnateur, assignation, validité créance, visa contrôleur, opposition, caractère libératoire, prescription<br />
                  • Patrimoine (Art. 120) : conservation des droits, privilèges et hypothèques
                </p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Compétence générale de l'IGF (Art. 121 LOFIP)</h4>
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-xs italic text-muted-foreground">Art. 121 LOFIP : « L'Inspection Générale des Finances dispose d'une compétence générale en matière de contrôle des finances et des biens publics. Elle peut accomplir toute enquête ou mission de contrôle, de vérification, de contre-vérification et de surveillance de toutes les opérations financières, en recettes et en dépenses, du Pouvoir central ainsi que des organismes ou entreprises de toute nature bénéficiant de son concours financier sous forme de participation en capital, de subvention, de prêt, d'avance ou de garantie. »</p>
            </div>
            <p className="mt-2">La compétence de l'IGF est universelle : elle couvre toutes les opérations du Pouvoir central, y compris les organismes privés bénéficiant de concours publics sous quelque forme que ce soit.</p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Déclenchement des missions (Art. 122 LOFIP)</h4>
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-xs italic text-muted-foreground">Art. 122 LOFIP : Les missions sont ordonnées par l'inspecteur général des finances-chef de service « soit sur instruction du Premier ministre, soit sur réquisition des autorités politiques, administratives et judiciaires ou sur dénonciation des tiers. » Elle a pour mission de veiller à l'application des lois et règlements régissant les finances publiques et à l'uniformisation des méthodes de travail.</p>
            </div>
          </div>
          <div className="space-y-3">
            {QCM_LECONS.L3.map(q => <QCMBlock key={q.id} qcm={q} />)}
          </div>
        </div>
      ),
    },
    {
      titre: 'Leçon 4 — La Cour des comptes (Art. 123-126 LOFIP + Art. 180 Constitution)',
      source: 'Constitution Art. 178-180 · LOFIP Art. 123-126, 131',
      contenu: (
        <div className="space-y-4 text-sm text-foreground leading-relaxed">
          <div>
            <h4 className="font-bold text-foreground mb-2">Fondement constitutionnel (Art. 180 Constitution)</h4>
            <div className="rounded-lg bg-orange-50 border border-orange-200 p-3">
              <p className="text-xs italic text-orange-800">Art. 180 Constitution : « La Cour des comptes est chargée du contrôle de la gestion des finances de l'État, des biens et du patrimoine publics. »</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Missions de la Cour des comptes (Art. 123-124 LOFIP)</h4>
            <div className="rounded-lg bg-muted/40 p-3 space-y-2">
              <p className="text-xs italic text-muted-foreground">Art. 123 LOFIP : La Cour « vérifie, a posteriori, sur pièces et, en cas de besoin, sur place, la régularité des opérations exécutées aussi bien par l'ordonnateur que par le comptable public, en matière de recettes, de dépenses et de trésorerie ». Elle « publie chaque année un rapport remis au Président de la République, au Parlement et au Gouvernement. »</p>
              <p className="text-xs italic text-muted-foreground">Art. 124 LOFIP : « La Cour des comptes assiste l'Assemblée nationale dans le contrôle de l'exécution de la loi de finances. Elle évalue notamment les rapports de performance. »</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Contrôle juridictionnel et décisions (Art. 125-126 LOFIP)</h4>
            <div className="space-y-2">
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-xs mb-1">Art. 125 — Contrôle sur les ordonnateurs</p>
                <p className="text-xs text-muted-foreground">Porte sur « la régularité de leurs actes, règlements ou décisions. »</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-xs mb-1">Art. 126 — Contrôle sur les comptables publics</p>
                <p className="text-xs text-muted-foreground">La Cour « juge les comptes des comptables publics pour aboutir soit à des arrêts de quitus, soit à des arrêts de débet. » Les comptables adressent leurs comptes à la Cour dans le délai de l'article 82 LOFIP.</p>
              </div>
            </div>
            <InfoTooltip texte="L'arrêt de débet oblige le comptable à combler de ses propres deniers le déficit constaté dans sa gestion. C'est la responsabilité personnelle et pécuniaire visée à l'article 131 LOFIP." loi="Art. 126, 131 LOFIP" />
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Responsabilité personnelle et pécuniaire du comptable (Art. 131 LOFIP)</h4>
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-xs italic text-muted-foreground">Art. 131 LOFIP : « La responsabilité personnelle et pécuniaire du comptable est mise en cause au moyen d'une décision de débet prononcée par la Cour des comptes. »</p>
            </div>
          </div>
          <div className="space-y-3">
            {QCM_LECONS.L4.map(q => <QCMBlock key={q.id} qcm={q} />)}
          </div>
        </div>
      ),
    },
    {
      titre: 'Leçon 5 — Le contrôle parlementaire et la loi de reddition des comptes (Art. 127-130, 28-31 LOFIP)',
      source: 'LOFIP Art. 28-31, 127-130 · Constitution Art. 178',
      contenu: (
        <div className="space-y-4 text-sm text-foreground leading-relaxed">
          <div>
            <h4 className="font-bold text-foreground mb-2">Nature et prérogatives du contrôle parlementaire (Art. 127 LOFIP)</h4>
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-xs italic text-muted-foreground">Art. 127 LOFIP : « Le contrôle parlementaire est un contrôle politique. Le Parlement veille, au cours de la gestion annuelle, à la bonne exécution de la loi de finances. Les informations qu'il demande ou les investigations sur pièces ou sur place qu'il entend conduire, ne peuvent lui être refusées. Il procède à l'audition des ministres et des responsables des programmes. Le contrôle parlementaire a posteriori de l'exécution des lois de finances du pouvoir central s'exerce lors de l'examen et du vote du projet de loi portant reddition des comptes. »</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">La loi de reddition des comptes (Art. 28-30 LOFIP)</h4>
            <div className="space-y-2">
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-xs mb-1">Art. 28 — Objet</p>
                <p className="text-xs text-muted-foreground">Constate les résultats définitifs de l'exécution de la LF et approuve les écarts résultats/prévisions.</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-xs mb-1">Art. 29 — Contenu</p>
                <p className="text-xs text-muted-foreground">Arrête le compte général du Pouvoir central, règle définitivement le budget, ratifie les crédits ouverts par Ordonnance-loi présidentielle, approuve les dépassements de force majeure, annule les crédits non utilisés au 31 décembre.</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-xs mb-1">Art. 30 — Compte de résultats</p>
                <p className="text-xs text-muted-foreground">Comprend : déficit/excédent budget général et budgets annexes, profits/pertes comptes spéciaux, profits/pertes opérations de trésorerie.</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Responsabilité des ordonnateurs et sanctions (Art. 128-129 LOFIP)</h4>
            <div className="rounded-lg bg-muted/40 p-3 space-y-2">
              <p className="text-xs italic text-muted-foreground">Art. 128 LOFIP : « Les ordonnateurs sont responsables des certifications qu'ils délivrent. Les membres du Gouvernement « sont également responsables des résultats atteints par rapport aux objectifs attachés au budget de programmes établi et exécuté sous leur autorité. »</p>
              <p className="text-xs italic text-muted-foreground">Art. 129 LOFIP : Fautes de gestion punies d'une amende « dont le montant ne pourra atteindre le double du traitement ou salaire brut annuel alloué à la date de l'infraction sans être inférieur au quart », plus sanctions disciplinaires, civiles et pénales.</p>
            </div>
            <InfoTooltip texte="La décharge des ordonnateurs est prononcée par le Parlement lors du vote de la loi de reddition des comptes (Art. 127 LOFIP). Elle libère l'ordonnateur de sa responsabilité politique pour la gestion de l'exercice concerné." loi="Art. 127 LOFIP" />
          </div>
          <div className="space-y-3">
            {QCM_LECONS.L5.map(q => <QCMBlock key={q.id} qcm={q} />)}
          </div>
        </div>
      ),
    },
  ]

  const qcmQuestions: QCMChapitre[] = QCM_GLOBAUX.map(q => ({
    id: q.id, question: q.question, options: q.options,
    reponseCorrecte: q.reponse, explication: q.explication, articleRef: '',
  }))

  const casPratiquesDevoir: CasPratiqueExistant[] = ETUDES_DE_CAS.map(versCasPratiqueExistant)

  const tabs = isAdmin
    ? [{ id: 'lecons', label: 'Leçons' }, { id: 'qcm', label: 'QCM' }, { id: 'cas', label: 'Cas pratiques' }, { id: 'devoir', label: 'Devoir' }]
    : [{ id: 'lecons', label: 'Leçons' }, { id: 'devoir', label: 'Devoir' }]

  return (
    <div className="space-y-4 pb-10 animate-fadeIn">
      {/* En-tête */}
      <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 5 — Finances publiques', route: '/ue5-finances-publiques' },
            { label: 'Chapitre 9' },
          ]}
          color="emerald"
        />
        <h1 className="text-lg font-bold text-foreground leading-tight">Contrôle des finances publiques</h1>
        <p className="text-xs text-muted-foreground">Constitution Art. 178-180 · LOFIP Art. 28-31, 111-132 · LF n° 25/060</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[{ label: 'Leçons', val: '5' }, { label: 'QCMs', val: '25' }, { label: 'Cas pratiques', val: '5' }].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
            <p className="text-lg font-bold text-orange-600">{s.val}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Onglets */}
      <div className="flex gap-1 rounded-xl bg-muted p-1">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn('flex-1 rounded-lg py-2 text-xs font-semibold transition-all',
              activeTab === tab.id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            )}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Leçons */}
      {activeTab === 'lecons' && (
        <div className="space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {lecons.map((l, i) => (
              <button key={i} onClick={() => setActiveLecon(i)}
                className={cn('shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold border transition-colors',
                  activeLecon === i ? 'bg-orange-600 text-white border-orange-600' : 'border-border bg-card text-muted-foreground hover:text-foreground'
                )}>
                L{i + 1}
              </button>
            ))}
          </div>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="bg-orange-50 px-4 py-3 border-b border-orange-200">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-orange-700 uppercase tracking-wide">Leçon {activeLecon + 1} sur {lecons.length}</span>
                  <h2 className="text-sm font-bold text-foreground mt-0.5 leading-snug">{lecons[activeLecon].titre}</h2>
                </div>
                <InfoTooltip texte={`Source : ${lecons[activeLecon].source}`} loi="LOFIP" />
              </div>
              <p className="text-xs text-orange-600 mt-1">{lecons[activeLecon].source}</p>
            </div>
            <div className="p-4">{lecons[activeLecon].contenu}</div>
          </div>
          <div className="flex gap-2">
            {activeLecon > 0 && (
              <button onClick={() => setActiveLecon(i => i - 1)}
                className="flex-1 py-2.5 rounded-xl border border-border bg-card text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                Leçon précédente
              </button>
            )}
            {activeLecon < lecons.length - 1 && (
              <button onClick={() => setActiveLecon(i => i + 1)}
                className="flex-1 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-semibold hover:bg-orange-700 transition-colors">
                Leçon suivante
              </button>
            )}
          </div>
        </div>
      )}

      {/* QCM */}
      {activeTab === 'qcm' && isAdmin && (
        <QCMPageUnique questions={qcmQuestions} couleurAccent="orange" />
      )}

      {/* Cas pratiques */}
      {activeTab === 'cas' && isAdmin && (
        <div className="space-y-4">
          <div className="rounded-xl border border-orange-200 bg-orange-50 p-3">
            <p className="text-xs text-orange-800 font-semibold">5 cas pratiques — Contrôle des finances publiques (LOFIP Art. 111-132 + Constitution Art. 178-180)</p>
            <p className="text-xs text-orange-700 mt-1">Tous les cas exigent une analyse juridique rigoureuse fondée sur les textes légaux.</p>
          </div>
          {ETUDES_DE_CAS.map((ec, i) => <CasPratiqueBlock key={i} ec={ec} index={i} />)}
        </div>
      )}

      {/* Devoir */}
      {activeTab === 'devoir' && (
        <DevoirChapitreCreateur
          chapitreId="ue5-ch9"
          chapitreNom="Chapitre 9 — Contrôle des finances publiques"
          questions={qcmQuestions}
          coursId="ue5-finances-publiques"
          casPratiquesExistants={casPratiquesDevoir}
        />
      )}
    </div>
  )
}
