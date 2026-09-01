// Chapitre 7 du module UE5, Finances publiques : contenu pur.
// Migré depuis l'ancienne page dédiée UE5Chapitre7Page.tsx vers le moteur
// commun components/chapitre/ChapitreManuscrit.tsx. Ancienne page largement
// fidèle à la LOFIP (art. 88-115 cités au texte exact) - migration
// vérifiée article par article et enrichie du RGCP (décret n° 24/10 du
// 14 octobre 2024, art. 80-92 : phases administrative et comptable de la
// dépense, service fait, paiement sans ordonnancement préalable, refus de
// payer et réquisition, prescription quadriennale). Corrections : le
// contrôle de la gestion des finances de l'État par la Cour des comptes
// relève de l'art. 180 de la Constitution (l'art. 178 institue la Cour et
// organise la nomination de ses membres) et le jugement des comptes des
// comptables publics de l'art. 126 LOFIP (arrêts de quitus ou de débet) -
// l'« art. 121 » cité vise l'Inspection générale des finances ; le refus
// de paiement sur ordre téléphonique est désormais adossé à la procédure
// réelle de réquisition de l'art. 91 RGCP (ordre écrit du Ministre des
// finances, subrogation de responsabilité, quatre motifs de refus
// insurmontables) ; l'affirmation spéculative sur l'opposabilité du
// contrat au cocontractant est réassise sur l'art. 10 LOFIP (les
// obligations ne deviennent certaines et définitives qu'avec l'ouverture
// des crédits correspondants).
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch7-q1', question: "Selon l'art. 90 LOFIP, qu'est-ce que l'engagement en matière de dépenses ?",
    options: [
      { id: 'a', texte: "L'acte par lequel le pouvoir central se libère de sa dette" },
      { id: 'b', texte: "L'acte par lequel le pouvoir central crée ou constate à son encontre une obligation de laquelle résultera une charge" },
      { id: 'c', texte: "L'ordre donné au caissier de payer" },
      { id: 'd', texte: "La vérification de la réalité de la dette" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 90 LOFIP · Art. 81 RGCP',
    explication: "L'art. 90 LOFIP : « l'engagement est l'acte par lequel le pouvoir central crée ou constate à son encontre une obligation de laquelle résultera une charge ». Le RGCP précise que cet engagement juridique « est consécutif ou concomitant à l'engagement comptable qui consiste à réserver les crédits » (art. 81) et que les engagements sont soumis au visa préalable des contrôleurs budgétaires (art. 82).",
  },
  {
    id: 'ch7-q2', question: 'Quelle est la définition légale de la liquidation en matière de dépenses ?',
    options: [
      { id: 'a', texte: "L'acte créant une obligation à la charge de l'État" },
      { id: 'b', texte: "L'ordre de payer donné au comptable" },
      { id: 'c', texte: "Vérifier la réalité de la dette et arrêter le montant exact de la dépense" },
      { id: 'd', texte: "L'acte de libération de la dette" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 90 LOFIP · Art. 83 RGCP',
    explication: "L'art. 90 LOFIP : la liquidation « a pour objet de vérifier la réalité de la dette et d'arrêter le montant exact de la dépense ». L'art. 83 du RGCP y attache la règle du service fait : sauf avances ou paiements préalables autorisés, « les ordonnateurs ne peuvent fixer les droits des créanciers... qu'après constatation du service fait ».",
  },
  {
    id: 'ch7-q3', question: 'Quelle phase de la chaîne de la dépense est exécutée par le comptable public ?',
    options: [
      { id: 'a', texte: "L'engagement" },
      { id: 'b', texte: 'La liquidation' },
      { id: 'c', texte: "L'ordonnancement" },
      { id: 'd', texte: 'Le paiement' },
    ],
    reponseCorrecte: 'd', articleRef: 'Art. 90 LOFIP · Art. 80 RGCP',
    explication: "Le paiement - « l'acte par lequel le pouvoir central se libère de sa dette » (art. 90) - constitue la phase comptable de la dépense (art. 80 RGCP), seule confiée au comptable public. Les trois phases administratives (engagement, liquidation, ordonnancement) relèvent de l'ordonnateur : c'est la traduction opérationnelle de la séparation de l'art. 102 LOFIP et de l'incompatibilité de l'art. 4 RGCP.",
  },
  {
    id: 'ch7-q4', question: "Selon l'art. 91 LOFIP, toute dépense régulièrement engagée et liquidée fait l'objet d'un ordonnancement :",
    options: [
      { id: 'a', texte: 'Après son paiement, pour régularisation' },
      { id: 'b', texte: 'Préalablement à son paiement' },
      { id: 'c', texte: 'Uniquement si le montant dépasse un seuil' },
      { id: 'd', texte: "À la demande du créancier" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 91 LOFIP · Art. 80 RGCP',
    explication: "L'art. 91 : « Toute dépense, régulièrement engagée et liquidée par l'ordonnateur fait l'objet, préalablement à son paiement, d'un ordonnancement. » Le RGCP admet une exception cadrée : « certaines dépenses limitativement énumérées peuvent, dans les conditions prévues par les textes en vigueur, être payées sans ordonnancement préalable et faire l'objet d'un engagement, d'une liquidation et d'un ordonnancement de régularisation » (art. 80 in fine).",
  },
  {
    id: 'ch7-q5', question: 'Après quelle date les engagements de dépenses autres que de personnel ne peuvent-ils plus intervenir ?',
    options: [
      { id: 'a', texte: 'Le 30 septembre' },
      { id: 'b', texte: 'Le 31 octobre' },
      { id: 'c', texte: 'Le 30 novembre' },
      { id: 'd', texte: 'Le 31 décembre' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 92 LOFIP',
    explication: "L'art. 92 : « Les engagements de dépenses, autres que celles de personnel, se rapportant aux autorisations d'engagement annuelles ne peuvent intervenir après le 31 octobre de chaque année. » Le même article rattache les dépenses au budget de l'année de leur prise en charge par le comptable public - novembre et décembre servent à liquider, ordonnancer et payer.",
  },
  {
    id: 'ch7-q6', question: "Selon l'art. 102 LOFIP, qui est compétent en matière d'exécution du budget ?",
    options: [
      { id: 'a', texte: 'Le Ministre du Budget et le Ministre des Finances' },
      { id: 'b', texte: "L'ordonnateur et le contrôleur budgétaire" },
      { id: 'c', texte: "L'ordonnateur et le comptable public" },
      { id: 'd', texte: 'La Cour des comptes et le Parlement' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 102 LOFIP · Art. 3-4 RGCP',
    explication: "L'art. 102 : « Sont compétents en matière d'exécution du budget, l'ordonnateur et le comptable public. » Le RGCP ajoute l'incompatibilité absolue des deux fonctions (art. 4) - jusqu'aux conjoints, ascendants et descendants d'un ordonnateur, qui ne peuvent être comptables des organismes où il exerce - et la nullité des actes des personnes qui s'ingèrent sans qualité dans la chaîne (art. 58).",
  },
  {
    id: 'ch7-q7', question: "Selon l'art. 103 LOFIP, qui est ordonnateur ?",
    options: [
      { id: 'a', texte: "L'agent du Trésor chargé du paiement" },
      { id: 'b', texte: 'Le contrôleur budgétaire' },
      { id: 'c', texte: "Le responsable d'institution, le ministre, le responsable de budget annexe ou la personne déléguée par lui" },
      { id: 'd', texte: 'Le Président de la République' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 103 LOFIP · Art. 8-12 RGCP',
    explication: "L'art. 103 : « Est ordonnateur, le responsable d'institution, le ministre, le responsable de budget annexe ou la personne déléguée par lui au niveau central et au niveau déconcentré. » Il engage, liquide et ordonnance dans la limite des crédits, sous réserve du pouvoir de régulation du Ministre du Budget et du pouvoir de gestion de la trésorerie du Ministre des Finances. Le RGCP organise les délégations : ordonnateurs délégués au niveau central, ordonnateurs secondaires dans les services déconcentrés, suppléance en cas d'empêchement (art. 12).",
  },
  {
    id: 'ch7-q8', question: 'Quelle est la double qualité du Ministre du Budget selon l\'art. 105 LOFIP ?',
    options: [
      { id: 'a', texte: 'Ordonnateur général des recettes et régulateur de la trésorerie' },
      { id: 'b', texte: 'Ordonnateur des charges communes et contrôleur général du budget du pouvoir central' },
      { id: 'c', texte: 'Comptable public principal et caissier de l\'État' },
      { id: 'd', texte: "Ordonnateur exclusif des dépenses de personnel" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 105 LOFIP',
    explication: "L'art. 105 : le Ministre du Budget est, « en sus de sa qualité d'ordonnateur du budget de son ministère, ordonnateur des charges communes et contrôleur général du budget du pouvoir central par le truchement des contrôleurs budgétaires qui relèvent de son autorité ». Le Ministre des Finances est, lui, ordonnateur général des recettes, régulateur de la trésorerie, et il désigne les comptables publics (art. 106).",
  },
  {
    id: 'ch7-q9', question: "Selon l'art. 107 LOFIP, quels actes doivent être soumis à l'avis préalable du Ministre du Budget ?",
    options: [
      { id: 'a', texte: 'Uniquement les marchés publics de plus de 1 milliard FC' },
      { id: 'b', texte: "Tout projet de loi, décision ou convention à répercussion sur les recettes ou les dépenses, et tout acte portant création d'emploi, extension des cadres organiques ou modification du statut pécuniaire des agents" },
      { id: 'c', texte: 'Les seuls actes de la présidence' },
      { id: 'd', texte: 'Les actes de gestion de la dette uniquement' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 107 LOFIP',
    explication: "L'art. 107 soumet à l'avis préalable du Ministre du Budget - et le cas échéant du Ministre des Finances - tout projet de loi, décision ou convention « pouvant avoir une répercussion immédiate ou future, tant sur les recettes que sur les dépenses », ainsi que tout acte d'administration portant création d'emploi, extension des cadres organiques ou modification du statut pécuniaire des agents de carrière. L'autorité budgétaire précède ainsi toute décision à incidence financière.",
  },
  {
    id: 'ch7-q10', question: "Les opérations financières du pouvoir central (emprunts, prêts, garanties, prises de participations) ne peuvent entrer en vigueur que :",
    options: [
      { id: 'a', texte: 'Après décision du Ministre des Finances' },
      { id: 'b', texte: 'Si une loi les autorise' },
      { id: 'c', texte: 'Après avis de la Cour des comptes' },
      { id: 'd', texte: "Après accord des bailleurs internationaux" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 108 LOFIP',
    explication: "L'art. 108 : elles sont conclues par le Ministre des Finances après avis du Ministre du Budget et « ne peuvent entrer en vigueur que si une loi les autorise ». Exception étroite : en cas de vacances parlementaires, les conventions financières de prêts ou d'emprunts peuvent être approuvées par ordonnance-loi du Président de la République, un projet de loi de ratification étant déposé immédiatement au Parlement.",
  },
  {
    id: 'ch7-q11', question: 'De qui le comptable public relève-t-il ?',
    options: [
      { id: 'a', texte: 'Du Ministre du Budget' },
      { id: 'b', texte: 'Du Ministre ayant les finances dans ses attributions' },
      { id: 'c', texte: "De l'ordonnateur auprès duquel il est accrédité" },
      { id: 'd', texte: 'De la Cour des comptes' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 106 et 109 LOFIP · Art. 17 RGCP',
    explication: "L'art. 109 LOFIP : le comptable public « relève de la responsabilité du ministre ayant les finances dans ses attributions », qui le désigne (art. 106 ; art. 17 RGCP). Cette rupture hiérarchique avec l'ordonnateur est la garantie de son indépendance : il veille au respect des principes et règles de gestion des finances publiques et s'assure de la sincérité des enregistrements et du respect des procédures.",
  },
  {
    id: 'ch7-q12', question: 'Quelles comptabilités le comptable public tient-il selon l\'art. 101 LOFIP ?',
    options: [
      { id: 'a', texte: 'La comptabilité administrative uniquement' },
      { id: 'b', texte: 'La comptabilité budgétaire, la comptabilité générale et la comptabilité des matières' },
      { id: 'c', texte: 'La comptabilité analytique des programmes' },
      { id: 'd', texte: 'Aucune : il ne fait que payer' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 101 LOFIP',
    explication: "L'art. 101 répartit les plumes : l'ordonnateur tient la comptabilité administrative (de l'engagement à l'ordonnancement, et de la constatation des recettes) ; le comptable public tient la comptabilité budgétaire (recouvrements et paiements), la comptabilité générale de l'ensemble des opérations et la comptabilité des matières.",
  },
  {
    id: 'ch7-q13', question: 'Combien de comptabilités sont tenues au sein des administrations selon l\'art. 95 LOFIP ?',
    options: [
      { id: 'a', texte: 'Deux' },
      { id: 'b', texte: 'Trois' },
      { id: 'c', texte: 'Quatre : administrative, budgétaire, des matières et générale' },
      { id: 'd', texte: 'Cinq, dont la comptabilité analytique' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 95-101 LOFIP',
    explication: "L'art. 95 : « Il est tenu, au sein des administrations, une comptabilité administrative, une comptabilité budgétaire, une comptabilité des matières et une comptabilité générale. » L'administrative suit la consommation des crédits (art. 96, règles fixées par le RGCP) ; la budgétaire retrace recouvrements et paiements et détermine la situation de caisse (art. 97) ; celle des matières décrit biens, stocks, titres et valeurs (art. 98) ; la générale, en partie double et droits constatés, donne l'image patrimoniale (art. 99-100).",
  },
  {
    id: 'ch7-q14', question: 'La comptabilité générale du pouvoir central est une comptabilité :',
    options: [
      { id: 'a', texte: "De caisse, enregistrant aux dates d'encaissement et de paiement" },
      { id: 'b', texte: "D'exercice, en droits constatés : les opérations sont rattachées à l'exercice indépendamment de leur date d'encaissement ou de paiement" },
      { id: 'c', texte: 'Analytique par action' },
      { id: 'd', texte: 'Simplifiée en partie simple' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 99-100 LOFIP',
    explication: "L'art. 99 : « Il s'agit d'une comptabilité d'exercice ou comptabilité en droits constatés dans laquelle les opérations sont prises en compte au titre de l'exercice auquel elles se rattachent, indépendamment de leur date d'encaissement ou de paiement » ; son plan comptable, fixé par décret du Premier ministre, s'inspire du plan comptable national. Elle est tenue en partie double (art. 100) - à la différence de la comptabilité budgétaire, tenue en logique de caisse.",
  },
  {
    id: 'ch7-q15', question: 'Quels actes sont soumis au visa préalable du contrôleur budgétaire ?',
    options: [
      { id: 'a', texte: 'Les seuls actes de paiement' },
      { id: 'b', texte: 'Tous les actes portant engagement, liquidation et ordonnancement' },
      { id: 'c', texte: 'Les engagements supérieurs à un seuil réglementaire' },
      { id: 'd', texte: 'Les actes de recettes' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 112 LOFIP · Art. 82 RGCP',
    explication: "L'art. 112 : le contrôle administratif a priori des dépenses est assuré par le contrôleur budgétaire, et « tous les actes portant engagement, liquidation et ordonnancement sont soumis à son visa préalable notamment, les contrats, arrêtés, mesures ou décisions » des ordonnateurs. Un contrôleur budgétaire est affecté auprès de chaque ordonnateur (art. 104), de chaque institution, ministère et service déconcentré (art. 115).",
  },
  {
    id: 'ch7-q16', question: "Que peut faire le contrôleur budgétaire si les actes de l'ordonnateur lui paraissent irréguliers ?",
    options: [
      { id: 'a', texte: "Annuler lui-même l'acte" },
      { id: 'b', texte: 'Refuser le visa - sans pouvoir en aucun cas être sanctionné pour ce refus' },
      { id: 'c', texte: 'Saisir directement la justice pénale' },
      { id: 'd', texte: 'Suspendre l\'ordonnateur' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 113 LOFIP',
    explication: "L'art. 113 : le contrôleur obtient communication de toutes les pièces propres à justifier les engagements et liquidations ; si les actes lui paraissent entachés d'irrégularités, « le contrôleur refuse le visa. Pour ce faire, il ne peut en aucun cas être sanctionné. » Cette immunité est la clef de voûte du contrôle a priori : un contrôleur sanctionnable ne contrôlerait rien.",
  },
  {
    id: 'ch7-q17', question: "En cas de désaccord persistant entre le contrôleur budgétaire et l'ordonnateur :",
    options: [
      { id: 'a', texte: "L'ordonnateur passe outre de plein droit" },
      { id: 'b', texte: 'Le contrôleur en réfère au Ministre du Budget, et il ne peut être passé outre au refus de visa que sur autorisation motivée écrite dudit ministre' },
      { id: 'c', texte: 'Le comptable public arbitre' },
      { id: 'd', texte: 'La Cour constitutionnelle est saisie' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 114 LOFIP',
    explication: "L'art. 114 : en cas de désaccord persistant, le contrôleur en réfère au Ministre du Budget (ou au représentant du pouvoir central en province) et « il ne peut être passé outre au refus de visa que sur autorisation motivée écrite dudit ministre ou représentant ». L'écrit motivé déplace la responsabilité sur l'autorité qui autorise - aucune voie orale ou hiérarchique parallèle n'existe.",
  },
  {
    id: 'ch7-q18', question: "Le comptable public reçoit l'ordre téléphonique de l'ordonnateur de payer « d'urgence » une facture sans ordonnancement. Que doit-il faire ?",
    options: [
      { id: 'a', texte: "Payer : l'ordonnateur est son supérieur" },
      { id: 'b', texte: "Refuser : seule une réquisition écrite du Ministre des finances peut le contraindre, et encore pas en l'absence d'ordonnancement régulier" },
      { id: 'c', texte: 'Payer la moitié par prudence' },
      { id: 'd', texte: "Consigner la somme chez un notaire" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 91 LOFIP · Art. 88 et 91 RGCP',
    explication: "Sans ordonnancement préalable, le paiement est interdit (art. 91 LOFIP) et le comptable doit vérifier la régularité de l'engagement, de la liquidation et de l'ordonnancement au moyen des pièces justificatives (art. 88 RGCP). En cas d'irrégularité, « il est tenu de refuser de payer » et d'adresser à l'ordonnateur une déclaration écrite et motivée de refus (art. 91 RGCP). Seul un ordre écrit de réquisition du Ministre des finances peut le faire passer outre - sa responsabilité étant alors subrogée par celle du ministre - mais la réquisition elle-même est inopérante si le rejet est motivé par l'absence de crédits disponibles, le défaut de service fait, l'absence de visa préalable du contrôleur budgétaire ou l'omission ou l'irrégularité des pièces.",
  },
  {
    id: 'ch7-q19', question: "Une facture régulière n'est ni payée ni réclamée par son bénéficiaire pendant plus de quatre ans. Que devient la créance ?",
    options: [
      { id: 'a', texte: 'Elle reste due indéfiniment' },
      { id: 'b', texte: "Elle est prescrite au profit de l'État, sauf suspension ou interruption" },
      { id: 'c', texte: 'Elle est transmise à la Cour des comptes' },
      { id: 'd', texte: 'Elle est convertie en bon du Trésor' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 92 RGCP',
    explication: "L'art. 92 du RGCP : « toute créance non payée et non réclamée par le bénéficiaire dans le délai de quatre ans à partir du premier jour de l'année suivant celle au cours de laquelle les droits ont été acquis, est prescrite au profit de l'État. » La prescription est interrompue par la demande de paiement ou réclamation écrite, le recours juridictionnel ou une communication écrite de l'administration ; elle est suspendue par l'incapacité du créancier, la force majeure ou l'opposition d'un tiers.",
  },
  {
    id: 'ch7-q20', question: 'Quelles sont les conditions du report de crédits prévu par l\'art. 93 LOFIP ?',
    options: [
      { id: 'a', texte: 'Tout crédit non consommé est reporté automatiquement' },
      { id: 'b', texte: "Seuls les crédits couvrant des dépenses résultant d'obligations existant au 31 octobre et non ordonnancées et payées au 31 décembre peuvent être reportés" },
      { id: 'c', texte: 'Seuls les crédits de personnel se reportent' },
      { id: 'd', texte: 'Le report exige un vote du Parlement avant le 31 décembre' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 93-94 LOFIP',
    explication: "L'art. 93 : peuvent être reportées les parties des crédits disponibles « destinées à couvrir des dépenses résultant d'obligations existant à charge du pouvoir central à la date du 31 octobre et qui n'ont pu être ordonnancées et payées au 31 décembre » ; elles s'ajoutent aux crédits de paiement de l'année suivante. Procédure (art. 94) : état approuvé par ordonnance-loi du Président de la République sur proposition conjointe des Ministres des Finances et du Budget dans les deux mois suivant la fin de l'année, arrêté du Ministre du Budget, ratification dans la prochaine loi de finances.",
  },
  {
    id: 'ch7-q21', question: 'Par quel acte les crédits sont-ils mis à disposition des ordonnateurs ?',
    options: [
      { id: 'a', texte: 'Par décret du Premier ministre' },
      { id: 'b', texte: 'Par arrêté du Ministre ayant le budget dans ses attributions' },
      { id: 'c', texte: 'Par ordonnance du Président de la République' },
      { id: 'd', texte: 'Par lettre du Ministre des Finances' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 88 LOFIP',
    explication: "L'art. 88 : les crédits ouverts par les lois de finances sont mis à disposition des ordonnateurs par programme, détaillés par titre et par source de financement correspondant aux dotations ouvertes pour chaque action, conformément à la répartition votée par le Parlement - et « les crédits sont mis à disposition par arrêté du ministre ayant le Budget dans ses attributions ».",
  },
  {
    id: 'ch7-q22', question: 'Qui juge les comptes des comptables publics, et par quels types d\'arrêts ?',
    options: [
      { id: 'a', texte: 'Le Conseil d\'État, par jugements de conformité' },
      { id: 'b', texte: 'La Cour des comptes, par des arrêts de quitus ou des arrêts de débet' },
      { id: 'c', texte: "L'Inspection générale des finances, par rapports" },
      { id: 'd', texte: 'Le Ministre des Finances, par arrêtés' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 126 LOFIP · Art. 180 Constitution',
    explication: "L'art. 126 LOFIP : le contrôle juridictionnel est exercé par la Cour des comptes sur la gestion des comptables publics - « la Cour des comptes juge les comptes des comptables publics pour aboutir soit à des arrêts de quitus, soit à des arrêts de débet ». Son assise constitutionnelle est l'art. 180 (contrôle de la gestion des finances de l'État, des biens publics, des comptes des provinces, des ETD et des organismes publics) ; l'art. 178 institue la Cour et organise la nomination de ses membres.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '7.1',
    titre: 'La chaîne de la dépense : quatre phases immuables',
    navLabel: 'Les 4 phases',
    blocs: [
      { type: 'filet', titre: 'Art. 90 LOFIP - texte exact', texte: "« En matière de dépenses, l'engagement est l'acte par lequel le pouvoir central crée ou constate à son encontre une obligation de laquelle résultera une charge. La liquidation a pour objet de vérifier la réalité de la dette et d'arrêter le montant exact de la dépense. L'ordonnancement est l'acte administratif par lequel, conformément aux résultats des calculs de la liquidation, l'ordre est donné au caissier concerné de payer la dette du pouvoir central. Le paiement est l'acte par lequel le pouvoir central se libère de sa dette. »" },
      { type: 'carte', titre: 'Les quatre phases (art. 90-91 LOFIP ; art. 80-87 RGCP)', tableau: {
        entetes: ['Phase', 'Contenu', 'Acteur'],
        lignes: [
          ['**1. Engagement**', "Création ou constatation de l'obligation (contrat, marché, décision) ; l'engagement juridique est consécutif ou concomitant à l'engagement comptable, qui réserve les crédits (art. 81 RGCP) ; visa préalable du contrôleur budgétaire (art. 82 RGCP ; art. 112 LOFIP)", 'Ordonnateur'],
          ['**2. Liquidation**', "Vérifier la réalité de la dette, arrêter le montant exact - après constatation du **service fait**, sauf avances ou paiements préalables autorisés (art. 83 RGCP)", 'Ordonnateur'],
          ['**3. Ordonnancement**', "Ordre de payer donné au comptable assignataire, matérialisé par un titre de paiement transmis avec les pièces justificatives (art. 84 RGCP ; art. 15 RGCP)", 'Ordonnateur'],
          ['**4. Paiement**', "Libération de la dette - la phase comptable : mise en règlement du titre, décaissement par espèces, chèque, virement ou autre instrument autorisé, libératoire s'il intervient au profit du créancier attitré (art. 86-87 RGCP)", 'Comptable public'],
        ],
      }, note: "« Toute dépense, régulièrement engagée et liquidée par l'ordonnateur fait l'objet, préalablement à son paiement, d'un ordonnancement » (art. 91 LOFIP). Exception cadrée : certaines dépenses limitativement énumérées peuvent être payées sans ordonnancement préalable, avec engagement, liquidation et ordonnancement de régularisation (art. 80 RGCP)." },
      { type: 'paragraphe', texte: "Le calendrier discipline la chaîne : les dépenses sont prises en compte au titre du budget de l'année de leur prise en charge par le comptable public et imputées sur les crédits de cette même année, et **les engagements de dépenses autres que de personnel, sur autorisations d'engagement annuelles, ne peuvent intervenir après le 31 octobre** (art. 92 LOFIP). Le paiement, lui, ne peut précéder l'échéance de la dette, l'exécution du service ou la décision individuelle d'attribution des subventions - sous réserve des acomptes et avances consentis conformément aux textes (art. 86 RGCP)." },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[4] },
    ],
  },
  {
    numero: '7.2',
    titre: "L'ordonnateur et les deux ministres financiers",
    navLabel: 'Ordonnateur',
    blocs: [
      { type: 'filet', titre: 'Art. 103 LOFIP - texte exact', texte: "« Est ordonnateur, le responsable d'institution, le ministre, le responsable de budget annexe ou la personne déléguée par lui au niveau central et au niveau déconcentré. L'ordonnateur a le pouvoir, dans la limite des crédits budgétaires qui lui sont accordés par les lois de finances, d'engager, de liquider et d'ordonnancer les dépenses nécessaires au fonctionnement de son institution ou ministère, ou service déconcentré, ou budget annexe rattaché. Il le fait dans le respect des lois, règlements et instructions qui régissent la matière, et sous réserve du pouvoir de régulation des crédits budgétaires du ministre ayant le budget dans ses attributions et du pouvoir de gestion de la trésorerie du ministre ayant les finances dans ses attributions. »" },
      { type: 'carte', titre: 'Les deux ministres financiers', tableau: {
        entetes: ['', 'Ministre du Budget (art. 105)', 'Ministre des Finances (art. 106)'],
        lignes: [
          ['Qualité propre', 'Ordonnateur des **charges communes** et **contrôleur général du budget** par le truchement des contrôleurs budgétaires', "**Ordonnateur général de toutes les recettes** : il les constate, liquide et ordonnance"],
          ['Pouvoirs transversaux', "Met les crédits à disposition par arrêté (art. 88) ; pouvoir de régulation des crédits (art. 103) ; avis préalable sur tout acte à incidence financière et toute création d'emploi (art. 107)", 'Régulateur de la trésorerie ; désigne les comptables publics ; conclut les opérations financières (emprunts, prêts, garanties, participations) après avis du Ministre du Budget (art. 108)'],
        ],
      }, note: "Les opérations financières « ne peuvent entrer en vigueur que si une loi les autorise » (art. 108) ; en cas de vacances parlementaires seulement, une ordonnance-loi peut approuver les conventions de prêts ou d'emprunts, avec projet de loi de ratification déposé immédiatement. La déconcentration de l'ordonnancement prévue à l'art. 103 est accélérée par l'art. 5 de la LF 2026, avec neuf ministères sectoriels pilotes." },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[20] },
    ],
  },
  {
    numero: '7.3',
    titre: 'Le comptable public payeur : contrôles, refus et réquisition',
    navLabel: 'Comptable payeur',
    blocs: [
      { type: 'paragraphe', texte: "Avant de payer, le comptable public assignataire **contrôle** : la qualité de l'ordonnateur ou de son délégué, l'assignation de la dépense, la validité de la créance au regard des pièces justificatives, l'existence des contrôles préalables, l'existence d'oppositions, le caractère libératoire du règlement et les règles de prescription (art. 119 LOFIP) ; il vérifie la régularité de l'engagement, de la liquidation et de l'ordonnancement au moyen des pièces prévues par les textes (art. 88 RGCP). Aucun ordonnancement ne lui parvient d'ailleurs sans le visa du contrôleur budgétaire (art. 119 LOFIP). Les oppositions au paiement lui sont adressées (art. 89 RGCP) et, si le créancier refuse le paiement, la somme est consignée dans sa comptabilité en attendant la solution du litige (art. 90 RGCP)." },
      { type: 'filet', titre: 'Le refus de payer et la réquisition (art. 91 RGCP)', texte: "Constatant une irrégularité, le comptable « est tenu de refuser de payer la dépense » et adresse à l'ordonnateur une déclaration écrite et motivée de refus, pièces rejetées jointes, copie au Ministre des finances. L'ordonnateur peut saisir le Ministre des finances, qui peut donner **par écrit** l'ordre d'exécuter le paiement : le comptable annexe alors au titre la déclaration de rejet et l'original de la réquisition, en adresse copies à la Cour des comptes, et la responsabilité du ministre **subroge** la sienne. Mais quatre motifs de rejet sont insurmontables - aucune réquisition ne peut les vaincre : l'absence de crédits disponibles, le défaut de service fait, l'absence de visa préalable du contrôleur budgétaire, l'omission ou l'irrégularité des pièces. Un ordre téléphonique n'est donc jamais un titre : le droit organise la pression hiérarchique elle-même, par écrit, tracée et transmise au juge des comptes." },
      { type: 'paragraphe', texte: "Dernier verrou temporel : la **prescription quadriennale** - toute créance sur l'État non payée et non réclamée dans les quatre ans à partir du premier jour de l'année suivant celle de l'acquisition des droits est prescrite au profit de l'État, sous réserve des causes d'interruption (réclamation écrite, recours juridictionnel, communication de l'administration) et de suspension (incapacité, force majeure, opposition d'un tiers) - art. 92 RGCP." },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[17] },
      { type: 'controle', question: QCM[18] },
    ],
  },
  {
    numero: '7.4',
    titre: 'Le contrôleur budgétaire : le visa qui précède tout',
    navLabel: 'Contrôleur budgétaire',
    blocs: [
      { type: 'paragraphe', texte: "Le **contrôle administratif a priori** des dépenses est assuré par le contrôleur budgétaire : « tous les actes portant engagement, liquidation et ordonnancement sont soumis à son visa préalable notamment, les contrats, arrêtés, mesures ou décisions » des responsables d'institutions, ministres, responsables de services déconcentrés ou fonctionnaires habilités (art. 112). Un contrôleur est affecté auprès de chaque ordonnateur (art. 104), de chaque institution, ministère de dépenses et service déconcentré (art. 115), et il relève de l'autorité du Ministre du Budget (art. 105) - non de l'ordonnateur qu'il contrôle." },
      { type: 'carte', titre: 'Le régime du visa (art. 113-114)', liste: [
        "**Instruction** : le contrôleur obtient communication de toutes les pièces propres à justifier les engagements et liquidations et à éclairer sa décision (art. 113).",
        "**Refus protégé** : si les actes lui paraissent entachés d'irrégularités, il refuse le visa - « pour ce faire, il ne peut en aucun cas être sanctionné » (art. 113). Toute mesure de rétorsion (mutation-sanction, mise en disponibilité) est illégale, et son auteur serait de surcroît incompétent : le contrôleur ne relève pas de l'ordonnateur.",
        "**Désaccord persistant** : le contrôleur en réfère au Ministre du Budget - ou au représentant du pouvoir central en province - et il ne peut être passé outre au refus « que sur autorisation motivée écrite » dudit ministre ou représentant (art. 114). L'écrit et la motivation déplacent la responsabilité sur qui autorise.",
      ] },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[16] },
    ],
  },
  {
    numero: '7.5',
    titre: 'Les quatre comptabilités et les reports de crédits',
    navLabel: 'Comptabilités · reports',
    blocs: [
      { type: 'carte', titre: 'Les quatre comptabilités (art. 95-101 LOFIP)', tableau: {
        entetes: ['Comptabilité', 'Tenue par', 'Objet'],
        lignes: [
          ['**Administrative** (art. 96)', 'Ordonnateur', "Établissement et mise en recouvrement des recettes ; engagement et ordonnancement des dépenses ; suivi de la consommation des crédits - règles fixées par le RGCP"],
          ['**Budgétaire** (art. 97)', 'Comptable public', "Recouvrements et paiements ; situation de caisse ; tenue par année civile, avec période complémentaire possible jusqu'au 31 janvier ; rapprochée de la comptabilité administrative"],
          ['**Des matières** (art. 98)', 'Comptable public', 'Existants et mouvements des biens meubles et immeubles, stocks, titres et valeurs'],
          ['**Générale** (art. 99-100)', 'Comptable public', "Toutes les opérations - recettes, dépenses, trésorerie, patrimoine ; partie double, droits constatés ; plan comptable fixé par décret du Premier ministre, inspiré du plan comptable national ; dégage états financiers, restes à payer et à recouvrer, résultat"],
        ],
      } },
      { type: 'filet', titre: 'Les reports de crédits (art. 93-94)', texte: "Par dérogation à l'annualité, peuvent être reportées « les parties des crédits disponibles à la fin de l'année budgétaire, destinées à couvrir des dépenses résultant d'obligations existant à charge du pouvoir central à la date du 31 octobre et qui n'ont pu être ordonnancées et payées au 31 décembre » ; elles s'ajoutent aux crédits de paiement correspondants du budget suivant (art. 93). L'état des articles et montants concernés est approuvé par ordonnance-loi du Président de la République, sur proposition conjointe des Ministres des Finances et du Budget, dans les deux mois suivant la fin de l'année, puis fait l'objet d'un arrêté du Ministre du Budget et d'une ratification en loi de finances (art. 94). À ne pas confondre avec les reports d'AE pluriannuelles et de CP de l'art. 53, par arrêtés conjoints avant le 31 mars." },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[19] },
    ],
  },
  {
    numero: '7.6',
    titre: 'Les responsabilités au bout de la chaîne',
    navLabel: 'Responsabilités',
    blocs: [
      { type: 'paragraphe', texte: "Chaque maillon répond de ses actes. L'**ordonnateur** est responsable des certifications qu'il délivre (art. 128 LOFIP) ; engager sans pouvoir, sans crédits disponibles ou en violation des règles d'exécution est une **faute de gestion** (art. 129), passible d'une amende pouvant atteindre le double du traitement brut annuel, prononcée par la Cour des comptes (art. 131) - les membres du Gouvernement relevant, eux, des sanctions prévues par la Constitution et les lois (art. 128 ; art. 57 RGCP). Le **comptable public** est personnellement et pécuniairement responsable (art. 131 LOFIP ; art. 32-35 RGCP) : paiement irrégulier en manquement à ses contrôles = débet. Le **contrôleur budgétaire** répond devant la Cour des comptes des fautes de gestion commises dans l'exercice de ses fonctions (art. 131). Et l'intrus - quiconque s'ingère sans qualité dans les opérations - voit ses actes frappés de nullité (art. 58 RGCP) et peut être déclaré comptable de fait (art. 130 LOFIP ; art. 17 et 36 RGCP)." },
      { type: 'carte', titre: 'Le juge des comptes', liste: [
        "**Assise constitutionnelle** : l'art. 178 de la Constitution institue la Cour des comptes, qui relève de l'Assemblée nationale ; l'art. 180 la charge de contrôler « la gestion des finances de l'État, des biens publics ainsi que les comptes des provinces, des entités territoriales décentralisées ainsi que des organismes publics », avec rapport annuel publié au Journal officiel.",
        "**Contrôle juridictionnel (art. 123-126 LOFIP)** : la Cour vérifie a posteriori, sur pièces et sur place, la régularité des opérations des ordonnateurs et des comptables ; elle « juge les comptes des comptables publics pour aboutir soit à des arrêts de quitus, soit à des arrêts de débet » (art. 126) ; les comptes de gestion lui sont soumis au plus tard le 31 mars (art. 30 RGCP).",
        "**Ne pas confondre** : l'Inspection générale des finances exerce un contrôle administratif à compétence générale (art. 121-122 LOFIP) - enquêtes et vérifications - mais ne juge pas ; le contrôle parlementaire (art. 127) sanctionne politiquement, lors de la reddition des comptes.",
      ] },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[21] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: 'La dépense engagée sans visa ni crédits',
    contexte: "Un secrétaire général signe un contrat de prestation de 450 millions FC pour une étude d'impact environnemental, sans visa préalable du contrôleur budgétaire. Deux semaines plus tard, le contrôleur découvre l'engagement et constate que les crédits disponibles du programme ne sont que de 200 millions FC.",
    questions: [
      { num: 1, enonce: "Analysez la régularité de l'engagement.", correction: "Double irrégularité. (1) Absence de visa préalable : « tous les actes portant engagement, liquidation et ordonnancement sont soumis à son visa préalable notamment, les contrats » (art. 112 LOFIP) ; le RGCP le répète pour les engagements (art. 82). Aucune dérogation n'existe. (2) Insuffisance de crédits : aucune dépense ne peut être exécutée « si les crédits nécessaires ne sont pas disponibles au budget » (art. 10 LOFIP), et les engagements sont limités au montant des autorisations d'engagement inscrites (art. 82 RGCP) - engager 450 millions sur 200 disponibles est la faute de gestion type de l'art. 129 (« qui aura engagé des dépenses sans disponibilité des crédits »). Conséquences : responsabilité de l'ordonnateur devant la Cour des comptes (art. 131) ; et vis-à-vis du cocontractant, l'art. 10 LOFIP rappelle que les obligations financières créées par tout contrat « ne deviennent certaines et définitives qu'avec l'ouverture des crédits correspondants » - l'État n'est pas définitivement obligé au-delà des crédits ouverts, ce qui fragilise la position du prestataire." },
      { num: 2, enonce: "Le contrôleur peut-il refuser son visa a posteriori ? Peut-il être sanctionné ?", correction: "Oui, il doit refuser : l'art. 113 lui donne communication de toutes les pièces et lui commande de refuser le visa si les actes sont entachés d'irrégularités - ici l'absence de visa préalable et le dépassement des crédits. « Pour ce faire, il ne peut en aucun cas être sanctionné » (art. 113) : l'immunité est absolue et couvre toute forme de rétorsion. Si l'ordonnateur conteste, une seule voie : le désaccord persistant de l'art. 114 - saisine du Ministre du Budget, qui seul peut autoriser le passage outre « sur autorisation motivée écrite ». Même autorisée, l'opération butera en aval sur le comptable public : ses quatre motifs de rejet insurmontables (art. 91 RGCP) incluent précisément l'absence de crédits disponibles et l'absence de visa préalable du contrôleur budgétaire - aucune réquisition ne peut les vaincre." },
      { num: 3, enonce: 'Une régularisation par mouvement de crédits est-elle envisageable ?', correction: "Partiellement. Pour couvrir les 250 millions manquants : virement entre titres du même programme par arrêté du Ministre du Budget (art. 47), jamais au profit du titre du personnel (art. 51) ; ou transfert depuis un autre programme par décret du Premier ministre (art. 48-49), avec ratification en LFR ; ou crédits provisionnels de l'art. 40 si la nature de la dépense s'y prête. Obstacle temporel : si l'engagement intervient après le 31 octobre, il est interdit pour les dépenses hors personnel sur AE annuelles (art. 92) - la régularisation devra alors attendre l'exercice suivant, au besoin via les reports des art. 93-94 si une obligation régulière existait au 31 octobre, ce qui n'est pas le cas d'un engagement irrégulier. Surtout, la régularisation financière n'efface pas la faute : l'engagement sans visa et sans crédits reste une faute de gestion consommée (art. 129), justiciable de la Cour des comptes (art. 131)." },
    ],
  },
  {
    id: 'cp2',
    titre: "Le paiement « d'urgence » sans ordonnancement",
    contexte: "Un comptable public reçoit directement d'un sous-traitant une demande de paiement de 800 millions FC, facture et procès-verbal de réception à l'appui. L'ordonnateur n'a émis aucun ordonnancement mais téléphone au comptable pour lui « ordonner de payer d'urgence ». Le comptable s'exécute. La Cour des comptes découvre l'opération.",
    questions: [
      { num: 1, enonce: 'Quelles règles le paiement viole-t-il ?', correction: "Trois. (1) L'art. 91 LOFIP : « toute dépense, régulièrement engagée et liquidée par l'ordonnateur fait l'objet, préalablement à son paiement, d'un ordonnancement » - et l'ordonnancement est un acte administratif matérialisé par un titre de paiement transmis au comptable avec les pièces (art. 84 RGCP ; art. 15 RGCP) : un appel téléphonique n'est pas un titre. (2) Les contrôles du payeur : avant tout paiement, le comptable vérifie la qualité de l'ordonnateur, la validité de la créance, l'existence des contrôles préalables (art. 119 LOFIP) et la régularité de l'engagement, de la liquidation et de l'ordonnancement au moyen des pièces (art. 88 RGCP) - contrôles ici impossibles faute d'ordonnancement. (3) Le circuit du visa : aucun ordonnancement ne peut être transféré au comptable sans le visa du contrôleur budgétaire (art. 119 LOFIP) - court-circuité. La séparation de l'art. 102 LOFIP est précisément conçue pour que l'ordonnateur ne puisse pas obtenir un décaissement par simple injonction." },
      { num: 2, enonce: "L'ordre du supérieur exonère-t-il le comptable ? Existe-t-il une procédure légale de contrainte ?", correction: "Non, l'ordre oral n'exonère pas : le comptable « n'est pas tenu de déférer aux ordres contraires aux lois, règlements et instructions régissant la fonction de comptable public qui engageraient sa responsabilité personnelle et pécuniaire » (art. 37 RGCP), et l'ordonnateur n'est pas son supérieur - il relève du Ministre des finances (art. 109 LOFIP ; art. 17 RGCP). La procédure légale existe pourtant : face à une irrégularité, le comptable est TENU de refuser, par déclaration écrite et motivée à l'ordonnateur avec copie au Ministre des finances (art. 91 RGCP) ; l'ordonnateur peut saisir ce ministre, qui peut ordonner PAR ÉCRIT le paiement - le comptable annexe alors le rejet et l'original de la réquisition au titre, en adresse copies à la Cour des comptes, et la responsabilité du ministre subroge la sienne. Mais la réquisition est impuissante contre quatre motifs : absence de crédits, défaut de service fait, absence de visa du contrôleur, omission ou irrégularité des pièces. En payant sur simple appel, le comptable a renoncé à toutes ses protections." },
      { num: 3, enonce: 'Que risque le comptable devant la Cour des comptes ?', correction: "Le débet. Sa responsabilité personnelle et pécuniaire (art. 131 LOFIP ; art. 32 RGCP) est engagée dès lors qu'« une dépense a été irrégulièrement payée en manquement aux obligations de contrôles » (art. 34 RGCP) : il doit verser de ses deniers personnels une somme égale à la dépense payée à tort (art. 35), sans préjudice de l'amende pour faute de gestion. La mise en jeu peut être administrative - ordre de versement du Ministre des finances, sursis, puis arrêté de débet exécutoire avec saisie du cautionnement et intérêts au taux légal, recours ouvert devant le Conseil d'État (art. 38-42 RGCP) - ou juridictionnelle : la Cour des comptes, qui contrôle la gestion des finances de l'État (art. 180 de la Constitution), juge son compte de gestion « pour aboutir soit à des arrêts de quitus, soit à des arrêts de débet » (art. 126 LOFIP ; art. 45 RGCP). L'ordre irrégulier de l'ordonnateur pourra fonder des poursuites contre ce dernier (art. 129, 131 LOFIP), mais ne décharge pas le payeur." },
    ],
  },
  {
    id: 'cp3',
    titre: 'Le contrôleur budgétaire sanctionné pour avoir refusé',
    contexte: "Un contrôleur budgétaire refuse de viser un engagement de 2,3 milliards FC pour l'achat de médicaments : crédits insuffisants et procédure de marché public non respectée. En réaction, le ministre sectoriel (ordonnateur) prend un arrêté le mettant en disponibilité d'office pour « obstruction au bon fonctionnement du service public ». Le contrôleur saisit le Ministre du Budget.",
    questions: [
      { num: 1, enonce: "L'arrêté de mise en disponibilité est-il légal ?", correction: "Non, doublement. (1) Au fond : l'art. 113 LOFIP protège absolument le refus de visa - « il ne peut en aucun cas être sanctionné ». La mise en disponibilité d'office est une sanction déguisée frappant l'exercice même de la fonction de contrôle : elle est directement contraire au texte. (2) En compétence : le contrôleur budgétaire relève de l'autorité du Ministre du Budget (art. 105 LOFIP), qui l'affecte auprès de chaque ordonnateur (art. 104, 115) ; le ministre sectoriel n'a aucun pouvoir hiérarchique ni disciplinaire sur lui. L'acte cumule violation de la loi et incompétence de son auteur ; il doit être retiré, et le contrôleur peut en poursuivre l'annulation devant le juge administratif." },
      { num: 2, enonce: 'Quelle était la voie légale pour l\'ordonnateur en désaccord ?', correction: "L'art. 114, exclusivement : en cas de désaccord persistant, c'est le contrôleur qui en réfère au Ministre du Budget (au niveau central) ou au représentant du pouvoir central en province, et « il ne peut être passé outre au refus de visa que sur autorisation motivée écrite dudit ministre ou représentant ». L'ordonnateur qui conteste le refus doit donc porter le différend devant le Ministre du Budget - pas sanctionner le contrôleur ni passer outre de sa propre autorité. Et même une autorisation écrite du Ministre du Budget ne lèverait pas tous les obstacles : en aval, le comptable public devrait encore refuser le paiement pour absence de crédits disponibles - motif de rejet que même la réquisition du Ministre des finances ne peut vaincre (art. 91 RGCP). Sur le fond, le refus du contrôleur paraît ici fondé : crédits insuffisants (art. 10 LOFIP) et irrégularité de la procédure de marché." },
      { num: 3, enonce: 'Que peut faire le Ministre du Budget saisi par le contrôleur ?', correction: "Trois registres. (1) Protéger son agent : les contrôleurs relèvent de son autorité (art. 105) - il exige le retrait de l'arrêté illégal, au besoin par arbitrage du Premier ministre, sous l'autorité duquel le budget s'exécute (art. 77). (2) Trancher le fond : instruit du dossier au titre de l'art. 114, il ne peut délivrer d'autorisation motivée écrite de passer outre que si le refus est infondé - ce qui n'est pas le cas face à une insuffisance de crédits ; il ne peut en aucun cas contraindre le contrôleur à viser. (3) Tirer les conséquences : l'achat de médicaments, s'il est réellement urgent, se finance par les voies régulières - virement de l'art. 47, crédits provisionnels de l'art. 40, LFR (art. 26-27) - et la tentative de sanction du contrôleur peut être signalée à la Cour des comptes, les entraves aux règles d'exécution relevant de la faute de gestion (art. 129, 131 LOFIP). Le contrôleur conserve, à titre personnel, le recours pour excès de pouvoir contre l'arrêté." },
    ],
  },
  {
    id: 'cp4',
    titre: "L'emprunt signé sans loi",
    contexte: "Scénario d'école. Confronté à un besoin urgent de 500 millions USD, le Gouvernement négocie et signe un emprunt obligataire avec un consortium de banques étrangères. L'emprunt est signé par le Ministre des Finances après avis du Ministre du Budget, mais le Parlement - en session ordinaire - n'a été ni consulté ni informé. Le Ministre soutient que la loi de finances de l'année « autorise généralement les emprunts de l'État ».",
    questions: [
      { num: 1, enonce: "L'emprunt est-il conforme à l'art. 108 LOFIP ? L'argument de l'« autorisation générale » tient-il ?", correction: "L'art. 108 pose deux conditions cumulatives : conclusion par le Ministre des Finances après avis du Ministre du Budget - remplie - et autorisation par une loi, sans laquelle l'opération « ne peut entrer en vigueur ». L'argument de l'autorisation générale ne vaut que ce que dit la loi de finances : celle-ci fixe le ou les plafonds des emprunts et détermine l'affectation des ressources (art. 14), autorise l'octroi des garanties et la prise en charge des dettes de tiers (art. 23), et le placement comme l'émission des emprunts s'effectuent « dans le cadre des autorisations données par la loi de finances » (art. 74-75) - la LF 2026 autorise par exemple les émissions de bons et obligations du Trésor dans la limite de 0,5% du PIB (art. 77 de ladite loi). Si l'emprunt de 500 millions USD s'inscrit dans le plafond et les conditions votés, il est couvert ; s'il les excède ou s'en écarte (emprunt extérieur non prévu, affectation différente), il n'est pas entré en vigueur faute de loi - et il ne suffit pas d'invoquer une « autorisation générale » qui n'existe qu'à travers des plafonds chiffrés." },
      { num: 2, enonce: "L'exception des « vacances parlementaires » était-elle mobilisable ?", correction: "Non. L'art. 108 in fine ne permet l'approbation des conventions financières de prêts ou d'emprunts par ordonnance-loi du Président de la République qu'« en cas des vacances parlementaires », avec dépôt immédiat d'un projet de loi de ratification. Le Parlement siégeait en session ordinaire : la condition fait défaut, et l'exception - dérogatoire - est d'interprétation stricte. La voie régulière était le dépôt d'un projet de loi d'autorisation (ou d'une LFR ajustant les plafonds, art. 26-27), le Parlement étant précisément l'organe auquel l'art. 122 de la Constitution réserve les finances publiques (pt. 3) et « les emprunts et engagements financiers de l'État » (pt. 11)." },
      { num: 3, enonce: 'Quelles suites le Parlement et les organes de contrôle peuvent-ils donner ?', correction: "(1) Contrôle politique : moyens de l'art. 138 de la Constitution - questions, interpellation, commission d'enquête, audition - pouvant déboucher sur une motion de défiance ou de censure (art. 146-147) ; le contrôle parlementaire de l'exécution est permanent et « les informations qu'il demande... ne peuvent lui être refusées » (art. 127 LOFIP). (2) Régularisation : seul le vote d'une loi - loi d'autorisation spécifique ou LFR relevant les plafonds - peut donner effet à l'opération ; à défaut, elle ne peut entrer en vigueur, et les décaissements opérés sur son fondement seraient irréguliers. (3) Contrôles financiers : l'IGF peut enquêter sur toutes les opérations financières du pouvoir central (art. 121) ; la Cour des comptes, chargée du contrôle de la gestion des finances de l'État (art. 180 de la Constitution), relèvera l'irrégularité dans son rapport et lors de l'examen de la reddition des comptes - la situation de la dette figurant obligatoirement parmi les documents de la reddition (art. 81 pt. 6) ; les responsables s'exposent au régime des sanctions du titre VII (art. 128-129)." },
    ],
  },
  {
    id: 'cp5',
    titre: 'Les 12 milliards de la mi-novembre',
    contexte: "Le 15 novembre, le gestionnaire d'un programme « Réhabilitation des routes nationales » constate 12 milliards FC de crédits de paiement non consommés. Il envisage : (1) engager 8 milliards pour un nouveau marché de travaux ; (2) demander le report des 12 milliards sur l'exercice suivant ; (3) utiliser 3 milliards pour financer une étude non prévue au programme, « puisque les fonds sont disponibles ».",
    questions: [
      { num: 1, enonce: "L'engagement d'un nouveau marché le 15 novembre est-il possible ?", correction: "Non. L'art. 92 LOFIP interdit les engagements de dépenses autres que de personnel, sur autorisations d'engagement annuelles, après le 31 octobre. Un marché de travaux engagé le 15 novembre est hors délai : le contrôleur budgétaire doit refuser son visa (art. 112-113), et le comptable refuserait le paiement d'une dépense irrégulièrement engagée (art. 88 et 91 RGCP). Seule une opération adossée à des autorisations d'engagement pluriannuelles régulièrement ouvertes (art. 22, 42) échapperait au butoir - ce que l'énoncé n'indique pas. Passer outre exposerait l'ordonnateur à la faute de gestion (art. 129) devant la Cour des comptes (art. 131)." },
      { num: 2, enonce: 'Le report des 12 milliards est-il possible ?', correction: "Seulement sous conditions strictes. L'art. 93 ne permet de reporter que les parties de crédits « destinées à couvrir des dépenses résultant d'obligations existant à charge du pouvoir central à la date du 31 octobre et qui n'ont pu être ordonnancées et payées au 31 décembre » : il faut des marchés signés, des contrats notifiés - des obligations juridiques nées au plus tard le 31 octobre. Les crédits simplement « disponibles », sans obligation sous-jacente, ne se reportent pas par cette voie : ils seront annulés par la loi portant reddition des comptes (art. 29). Procédure : état approuvé par ordonnance-loi du Président de la République sur proposition conjointe des Ministres des Finances et du Budget dans les deux mois suivant la fin de l'année, arrêté du Ministre du Budget, ratification en loi de finances (art. 94). Voie parallèle pour l'investissement : le report des AE pluriannuelles et des CP non consommés sur le même programme et le même titre, par arrêtés conjoints pris au plus tard le 31 mars (art. 53)." },
      { num: 3, enonce: "Le financement d'une étude non prévue « parce que les fonds sont disponibles » est-il régulier ?", correction: "Non en l'état. La disponibilité de crédits ne crée aucun droit de les dépenser à autre chose : les crédits « ne peuvent être utilisés que pour l'objet pour lequel ils ont été prévus, sauf dans les cas visés aux articles 45 à 50 » (art. 42), en vertu de la spécialité (art. 8). Trois hypothèses : si l'étude relève du même programme et du même titre que des crédits disponibles, la fongibilité de l'art. 45 joue à l'intérieur du titre et de la source de financement, sous le suivi du Ministre du Budget ; si elle relève d'un autre titre du même programme, il faut un virement par arrêté du Ministre du Budget (art. 47) ; si elle relève d'un autre programme, un transfert par décret du Premier ministre (art. 48-49). Et dans tous les cas, l'engagement de l'étude après le 31 octobre bute sur l'art. 92, et la chaîne complète s'impose : visa du contrôleur (art. 112), service fait avant liquidation (art. 83 RGCP), ordonnancement avant paiement (art. 91 LOFIP)." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue5',
  numero: 7,
  id: 'ue5-chapitre-7',
  titre: 'Exécution des dépenses : la chaîne de la dépense',
  sousTitre: 'LOFIP, art. 88-115 · RGCP (décret n° 24/10 du 14 octobre 2024), art. 80-92',
  infoBulle: "Les quatre phases de la dépense (engagement, liquidation, ordonnancement, paiement), les acteurs (ordonnateur, comptable public, contrôleur budgétaire), le service fait, le refus de payer et la réquisition, les quatre comptabilités publiques, les reports de crédits et les responsabilités devant la Cour des comptes.",
  loiRef: 'Art. 88-115 LOFIP · RGCP 2024',
  moduleLabel: 'UE 5 · Finances publiques',
  retourRoute: '/ue5-finances-publiques',
  coursId: 'ue5-finances-publiques',
  objectifs: [
    'Maîtriser les quatre phases de la chaîne de la dépense (art. 90-91 LOFIP ; art. 80-87 RGCP), le service fait et le butoir du 31 octobre (art. 92)',
    "Identifier les acteurs : ordonnateur (art. 103), Ministres du Budget et des Finances (art. 105-108), comptable public (art. 109 ; RGCP), contrôleur budgétaire (art. 104, 111-115)",
    'Connaître les contrôles du payeur, le refus de payer et la procédure de réquisition avec ses quatre motifs insurmontables (art. 119 LOFIP ; art. 88-91 RGCP)',
    'Distinguer les quatre comptabilités publiques (art. 95-101) et les régimes de reports de crédits (art. 93-94 ; art. 53)',
    "Appliquer le régime des responsabilités : faute de gestion, débet, gestion de fait, arrêts de quitus et de débet de la Cour des comptes (art. 126, 128-131 LOFIP ; art. 32-46, 56-58 RGCP)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Quatre phases immuables (art. 90 LOFIP) : engagement (création de l'obligation, avec engagement comptable réservant les crédits - art. 81 RGCP), liquidation (réalité de la dette et montant exact, après service fait - art. 83 RGCP), ordonnancement (ordre de payer, titre de paiement), paiement (phase comptable) ; tout paiement exige un ordonnancement préalable (art. 91), sauf dépenses limitativement énumérées payées avec régularisation (art. 80 RGCP).",
    "Les engagements hors personnel sur AE annuelles sont clos au 31 octobre (art. 92) ; les crédits sont mis à disposition par arrêté du Ministre du Budget, par programme, titre et source (art. 88).",
    "Seuls l'ordonnateur et le comptable public exécutent le budget (art. 102), fonctions incompatibles (art. 4 RGCP) ; le Ministre du Budget est ordonnateur des charges communes et contrôleur général du budget (art. 105) ; le Ministre des Finances, ordonnateur général des recettes, régulateur de la trésorerie, désigne les comptables (art. 106) ; avis budgétaire préalable sur tout acte à incidence financière (art. 107) ; les opérations financières n'entrent en vigueur que si une loi les autorise (art. 108).",
    "Avant de payer, le comptable contrôle qualité de l'ordonnateur, validité de la créance, contrôles préalables, oppositions et prescription (art. 119 LOFIP ; art. 88 RGCP) ; face à une irrégularité il est TENU de refuser, par écrit motivé ; seule la réquisition écrite du Ministre des finances le fait passer outre - en le subrogeant - sauf quatre motifs insurmontables : absence de crédits, défaut de service fait, absence de visa du contrôleur, pièces irrégulières (art. 91 RGCP).",
    "Le contrôleur budgétaire vise préalablement tous les actes d'engagement, de liquidation et d'ordonnancement (art. 112) ; son refus ne peut « en aucun cas » être sanctionné (art. 113) ; on ne passe outre que sur autorisation motivée écrite du Ministre du Budget (art. 114).",
    "Quatre comptabilités (art. 95) : administrative (ordonnateur), budgétaire (caisse, comptable), des matières, générale (partie double, droits constatés, plan comptable par décret) - art. 96-101.",
    "Reports (art. 93-94) : uniquement les crédits couvrant des obligations existant au 31 octobre non payées au 31 décembre ; état approuvé par ordonnance-loi présidentielle dans les deux mois, ratifié en loi de finances ; à distinguer des reports d'AE/CP de l'art. 53 (arrêtés conjoints avant le 31 mars).",
    "Créances sur l'État : prescription quadriennale au profit de l'État, avec causes d'interruption et de suspension (art. 92 RGCP).",
    "Responsabilités : faute de gestion de l'ordonnateur et du contrôleur (art. 129, 131), débet du comptable (art. 32-46 RGCP), nullité des actes des intrus et gestion de fait (art. 58 et 17 RGCP ; art. 130 LOFIP) ; la Cour des comptes - art. 178 et 180 de la Constitution - juge les comptes « pour aboutir soit à des arrêts de quitus, soit à des arrêts de débet » (art. 126 LOFIP).",
  ],
  references: [
    {
      genre: 'texte',
      intitule: 'Loi n° 11/011 du 13 juillet 2011 relative aux finances publiques (LOFIP)',
      precision: 'telle que modifiée par les lois n° 18/010 et n° 23/030 ; art. 10, 42-53 et 88-131',
    },
    {
      genre: 'texte',
      intitule: 'Décret n° 24/10 du 14 octobre 2024 portant Règlement général sur la comptabilité publique (RGCP)',
      precision: 'art. 3-58 (acteurs et responsabilités) et 80-92 (opérations de dépenses, réquisition, prescription)',
    },
    {
      genre: 'texte',
      intitule: 'Constitution de la République Démocratique du Congo du 18 février 2006',
      precision: 'art. 122, 138, 146-147 et 178-180',
    },
    {
      genre: 'texte',
      intitule: "Loi de finances n° 25/060 du 29 décembre 2025 pour l'exercice 2026",
      precision: "art. 5 (déconcentration de l'ordonnancement) et 77 (émissions de titres publics, plafond de 0,5% du PIB)",
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : LOFIP n° 11/011 du 13 juillet 2011 (mod. lois n° 18/010 et n° 23/030), art. 88-131 · RGCP, décret n° 24/10 du 14 octobre 2024, art. 3-58 et 80-92 · Constitution, art. 178-180 · LF n° 25/060 (2026)',
}

export default chapitre
