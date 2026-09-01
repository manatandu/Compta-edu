import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 5 — Chapitre 10 : Réformes et actualité des finances publiques
//
// Sources vérifiées article par article :
// - Constitution du 18 février 2006 (art. 122, 126, 174, 175) ;
// - LOFIP, loi n° 11/011 du 13 juillet 2011 (art. 1-2, 8, 18, 22, 26-31, 43-44,
//   79, 82-84, 107, 230-235) et ses lois modificatives n° 18/010 du 09 juillet
//   2018 (art. 230ter, 234) et n° 23/030 du 28 juin 2023 (art. 3, 8, 13, 22,
//   43, 44, 79, 234) ;
// - Loi de finances n° 25/060 du 29 décembre 2025 pour 2026 (art. 5 à 9, 77,
//   84, annexes I et cadrage macroéconomique) ; chiffres LF 2025 et LFR 2025
//   tirés des tableaux comparatifs annexés à la LF 2026.
// La circulaire n° 004/ME/MIN.BUDGET/2025, citée par l'ancienne version du
// chapitre, n'a pas pu être vérifiée sur texte : elle est présentée ici comme
// pratique administrative, signalée comme telle.
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch10-q1',
    question: "Quel texte a expressément abrogé la loi financière n° 83-003 du 23 février 1983 ?",
    options: [
      { id: 'a', texte: "Le décret portant Règlement général sur la comptabilité publique" },
      { id: 'b', texte: "L'ordonnance-loi n° 87-004 du 10 janvier 1987" },
      { id: 'c', texte: "La loi n° 11/011 du 13 juillet 2011 relative aux finances publiques (LOFIP), par son article 233" },
      { id: 'd', texte: "La loi n° 18/010 du 9 juillet 2018" },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 233 de la LOFIP dispose : « La présente loi abroge toutes les dispositions antérieures contraires, notamment celles contenues dans la loi financière n° 83-003 du 23 février 1983, telle que modifiée et complétée par l'ordonnance-loi n° 87-004 du 10 janvier 1987. » Attention toutefois : les lois modificatives de 2018 et 2023 ont différé l'abrogation effective de la loi de 1983 à l'échéance prorogée d'application intégrale — jusque-là, l'ancien régime reste applicable aux entités non identifiées par la loi de finances de l'année (art. 230).",
    articleRef: 'Art. 233 LOFIP',
  },
  {
    id: 'ch10-q2',
    question: "Selon l'article 234 de la LOFIP dans sa rédaction de 2011, à quelle date la loi devait-elle entrer en vigueur dans l'intégralité de ses dispositions ?",
    options: [
      { id: 'a', texte: "Le 13 juillet 2011, date de sa promulgation" },
      { id: 'b', texte: "Le 1er janvier de la huitième année suivant celle de sa promulgation, soit le 1er janvier 2019" },
      { id: 'c', texte: "Le 1er janvier 2015" },
      { id: 'd', texte: "À la date fixée par décret du Premier ministre" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 234 (rédaction de 2011) dispose : « Sans préjudice des dispositions de l'article 232 ci-dessus, la présente loi entre en vigueur dans l'intégralité de ses dispositions, au premier janvier de la huitième année suivant celle de sa promulgation, date à laquelle toutes dispositions contraires seront abrogées. » Promulguée le 13 juillet 2011, la LOFIP devait donc s'appliquer intégralement au 1er janvier 2019 — échéance deux fois prorogée depuis.",
    articleRef: 'Art. 234 LOFIP (réd. 2011)',
  },
  {
    id: 'ch10-q3',
    question: "Selon l'article 230 de la LOFIP, comment s'organise la mise en application progressive de la loi ?",
    options: [
      { id: 'a', texte: "Par décret du Premier ministre fixant chaque année la liste des entités concernées" },
      { id: 'b', texte: "Applicables de façon progressive endéans sept années ; la loi de finances de chaque année identifie les ministères, institutions, provinces et ETD éligibles à la gestion de budgets de résultats" },
      { id: 'c', texte: "Application immédiate et uniforme à toutes les administrations" },
      { id: 'd', texte: "Application limitée aux seuls ministères des Finances et du Budget" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 230 de la LOFIP dispose que ses dispositions « sont applicables de façon progressive endéans sept années à dater de sa promulgation », les modalités étant définies par une loi de finances : « la loi de finances de chaque année identifie les ministères, institutions, provinces et entités territoriales décentralisées éligibles à la gestion de budgets de résultats », les dispositions de la loi financière en vigueur restant applicables aux entités non identifiées. La loi n° 18/010 de 2018 a ajouté un article 230ter faisant repartir cette progressivité de sa propre promulgation.",
    articleRef: 'Art. 230 LOFIP ; art. 230ter (loi n° 18/010)',
  },
  {
    id: 'ch10-q4',
    question: "Qu'a fait la loi n° 18/010 du 9 juillet 2018 à l'égard du calendrier d'application de la LOFIP ?",
    options: [
      { id: 'a', texte: "Elle a avancé l'entrée en vigueur intégrale au 1er janvier 2017" },
      { id: 'b', texte: "Elle a prorogé de cinq ans le délai d'application intégrale et fait repartir la progressivité de la gestion axée sur les résultats de sa propre promulgation (art. 230ter)" },
      { id: 'c', texte: "Elle a abrogé définitivement le budget-programme" },
      { id: 'd', texte: "Elle a transféré le pilotage de la réforme à la Cour des comptes" },
    ],
    reponseCorrecte: 'b',
    explication: "La loi n° 18/010 du 9 juillet 2018 a réécrit l'article 234 : « Le délai de mise en application, dans l'intégralité de ses dispositions, de [la] loi 11-011 du 13 juillet 2011 relative aux finances publiques est prorogé de cinq ans » — reportant l'échéance de 2019 à 2024 — et a inséré un article 230ter : les dispositions relatives à la gestion budgétaire axée sur les résultats « sont applicables de façon progressive à dater de la promulgation de la présente loi ». L'abrogation de la loi financière de 1983 est différée à cette échéance prorogée.",
    articleRef: 'Loi n° 18/010, art. 230ter et 234',
  },
  {
    id: 'ch10-q5',
    question: "Quelles sont les deux composantes de l'article 234 dans sa rédaction issue de la loi n° 23/030 du 28 juin 2023 ?",
    options: [
      { id: 'a', texte: "Une prorogation de dix ans et la suppression du rapport annuel" },
      { id: 'b', texte: "Une nouvelle prorogation de cinq ans du délai d'application intégrale, et l'obligation pour le ministre du Budget de présenter chaque année à l'Assemblée nationale, en session budgétaire, un rapport sur les progrès de la réforme du budget-programme" },
      { id: 'c', texte: "Le basculement immédiat au budget-programme et la création des dotations" },
      { id: 'd', texte: "L'abrogation immédiate de la loi de 1983 et la création du débat d'orientation budgétaire" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 234 (rédaction 2023) dispose : « Le délai de mise en application dans l'intégralité de ses dispositions, de la loi n°18/010 du 09 juillet 2018 [...] est prorogé de cinq ans. Chaque année, un rapport décrivant les progrès vers la mise en œuvre effective de la réforme du budget-programme est présenté à l'Assemblée nationale, au cours de la session budgétaire, par le Ministre ayant le Budget dans ses attributions. » L'abrogation de la loi financière de 1983 reste différée à cette échéance. Le rapport annuel est un mécanisme de reddition politique de la progression de la réforme, nouveauté de 2023.",
    articleRef: 'Art. 234 LOFIP (réd. loi n° 23/030)',
  },
  {
    id: 'ch10-q6',
    question: "Sur quel fondement constitutionnel la LOFIP a-t-elle été adoptée, selon son article 1er ?",
    options: [
      { id: 'a', texte: "L'article 174 de la Constitution" },
      { id: 'b', texte: "L'article 122 point 3 de la Constitution, qui range les finances publiques dans le domaine de la loi" },
      { id: 'c', texte: "L'article 180 de la Constitution" },
      { id: 'd', texte: "L'article 126 de la Constitution" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 1er de la LOFIP dispose : « La présente loi fixe, conformément à l'article 122 point 3 de la Constitution, les règles concernant les finances publiques. » Elle fixe aussi les règles d'élaboration, de présentation, d'adoption et d'exécution des lois de finances, des édits et décisions budgétaires, celles du contrôle, des responsabilités et sanctions, et les rapports entre pouvoir central, provinces et ETD.",
    articleRef: 'Art. 1er LOFIP ; art. 122 pt 3 Constitution',
  },
  {
    id: 'ch10-q7',
    question: "Selon l'article 2 de la LOFIP, à quelles finances la loi s'applique-t-elle ?",
    options: [
      { id: 'a', texte: "Aux seules finances du pouvoir central" },
      { id: 'b', texte: "Aux seules finances des provinces et des ETD" },
      { id: 'c', texte: "Aux finances de l'État : pouvoir central, provinces, ETD et leurs organismes auxiliaires" },
      { id: 'd', texte: "Aux entreprises publiques et sociétés d'économie mixte" },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 2 de la LOFIP dispose : « La présente loi s'applique aux finances de l'État, à savoir les finances du pouvoir central, celles des provinces, ainsi que celles des entités territoriales décentralisées et de leurs organismes auxiliaires. »",
    articleRef: 'Art. 2 LOFIP',
  },
  {
    id: 'ch10-q8',
    question: "Selon l'article 8 de la LOFIP, quelle est la valeur de la présentation des crédits par chapitre, article et littera dans le cadre d'un budget-programme ?",
    options: [
      { id: 'a', texte: "Elle est obligatoire et limitative" },
      { id: 'b', texte: "Elle est indicative" },
      { id: 'c', texte: "Elle est supprimée" },
      { id: 'd', texte: "Elle est réservée aux dépenses de personnel" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 8 de la LOFIP dispose que les crédits sont spécialisés par titre et par source de financement et regroupés par programme, et que « dans le cadre d'un budget programme, la présentation des crédits par subdivision de la nomenclature budgétaire, chapitre, article et littera est indicative ». La rédaction issue de la loi n° 23/030 de 2023 ajoute la dotation : les crédits « sont regroupés par programme ou par dotation », les programmes ou dotations pouvant être regroupés par fonction.",
    articleRef: 'Art. 8 LOFIP (réd. 2011 et 2023)',
  },
  {
    id: 'ch10-q9',
    question: "Selon l'article 43 de la LOFIP (rédaction 2023), qui peut créer ou supprimer un programme budgétaire ?",
    options: [
      { id: 'a', texte: "Le ministre du Budget, par arrêté" },
      { id: 'b', texte: "Le Conseil des ministres, par décret" },
      { id: 'c', texte: "Seule une disposition de loi de finances d'initiative gouvernementale" },
      { id: 'd', texte: "Le responsable de programme, par décision administrative" },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 43 (miroir provincial : art. 156) définit le programme comme un ensemble cohérent d'actions d'un même ministère ou institution, assorti d'objectifs précis, de résultats attendus et d'une évaluation par indicateurs de performance ; chaque ministère ou institution peut créer un programme « administration générale ». Dans sa rédaction issue de la loi n° 23/030, seule une loi de finances d'initiative gouvernementale (un édit ou une décision budgétaire au niveau provincial et local) peut créer ou supprimer un programme.",
    articleRef: 'Art. 43 LOFIP (réd. 2023)',
  },
  {
    id: 'ch10-q10',
    question: "Quelle conséquence l'article 44 de la LOFIP attache-t-il à la présentation de programmes sous forme de fonction interministérielle ?",
    options: [
      { id: 'a', texte: "Le transfert automatique des crédits entre ministères" },
      { id: 'b', texte: "Une coordination dans l'exécution et une présentation conjointe des résultats dans la loi de reddition des comptes" },
      { id: 'c', texte: "La suppression du contrôle budgétaire préalable" },
      { id: 'd', texte: "La fusion des programmes en un budget sectoriel unique" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 44 de la LOFIP (rédaction 2023 : « les programmes et les dotations peuvent être regroupés en fonctions », institutionnelles, ministérielles ou interministérielles) prévoit que la présentation en fonction interministérielle « entraîne une coordination dans l'exécution des programmes et une présentation conjointe de l'exécution et des résultats » dans la loi de reddition des comptes.",
    articleRef: 'Art. 44 LOFIP',
  },
  {
    id: 'ch10-q11',
    question: "Selon l'article 22 de la LOFIP, comment la loi de finances de l'année présente-t-elle les crédits en mode budget-programme ?",
    options: [
      { id: 'a', texte: "Par nature de dépense uniquement, sans référence aux programmes" },
      { id: 'b', texte: "Par ministère ou institution et par programme (ou dotation, depuis 2023), avec autorisations d'engagement et crédits de paiement, et plafonds d'autorisations d'emplois rémunérés" },
      { id: 'c', texte: "Par province et par ETD" },
      { id: 'd', texte: "Par un montant global unique voté en bloc" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 22 de la LOFIP (dans sa rédaction issue de la loi n° 23/030) fixe, par ministère ou institution et par programme ou dotation, les autorisations d'engagement et les crédits de paiement, ainsi que les plafonds d'autorisations d'emplois rémunérés par budget annexe. L'autorisation d'engagement est la permission de signer sur l'année un ou plusieurs marchés pour un montant maximum, dont l'exécution peut s'étaler sur plusieurs exercices ; le crédit de paiement est la limite supérieure des dépenses pouvant être ordonnancées ou payées pendant l'année (art. 3 pts 2 et 17).",
    articleRef: 'Art. 22 LOFIP (réd. 2023) ; art. 3 pts 2 et 17',
  },
  {
    id: 'ch10-q12',
    question: "Sur quels fondements de la LOFIP reposent le projet annuel de performance (PAP) et le rapport annuel de performance (RAP) ?",
    options: [
      { id: 'a', texte: "Les articles 47 à 49, relatifs aux mouvements de crédits" },
      { id: 'b', texte: "Le PAP figure parmi les documents joints au projet de loi de finances de l'année (art. 79 point 6, rédaction 2023) et le RAP parmi les documents accompagnant le projet de loi portant reddition des comptes (art. 82 point 4)" },
      { id: 'c', texte: "Aucun texte : ce sont de simples usages administratifs" },
      { id: 'd', texte: "L'article 110, relatif à l'unité de trésorerie" },
    ],
    reponseCorrecte: 'b',
    explication: "Dans la rédaction issue de la loi n° 23/030, l'article 79 énumère onze documents joints au projet de loi de finances de l'année, dont les « projets annuels de performance » (point 6) — aux côtés du plan de trésorerie prévisionnel, du programme d'investissements publics, du rapport sur les dépenses fiscales, du rapport consolidé sur les entreprises et établissements publics et de la déclaration sur les risques budgétaires. L'article 82 point 4 impose, avec le projet de loi portant reddition des comptes, « le rapport annuel de performance par programme rendant compte de leur gestion et de leurs résultats ». Les articles 47 à 49 concernent, eux, les virements et transferts de crédits.",
    articleRef: 'Art. 79 pt 6 (réd. 2023) et art. 82 pt 4 LOFIP',
  },
  {
    id: 'ch10-q13',
    question: "Quelles définitions la loi n° 23/030 du 28 juin 2023 a-t-elle notamment ajoutées à l'article 3 de la LOFIP ?",
    options: [
      { id: 'a', texte: "« Contrôleur budgétaire » et « responsable de programme »" },
      { id: 'b', texte: "« Débat d'orientation budgétaire » et « dotation budgétaire »" },
      { id: 'c', texte: "« Caisse nationale de péréquation » et « retenue à la source »" },
      { id: 'd', texte: "« Loi de reddition des comptes » et « compte spécial »" },
    ],
    reponseCorrecte: 'b',
    explication: "La loi n° 23/030 porte la liste des définitions de l'article 3 à 43 points, avec deux ajouts principaux : le « débat d'orientation budgétaire » — débat en séance plénière de l'Assemblée nationale autour du cadre budgétaire à moyen terme — et la « dotation budgétaire » — crédits alloués aux institutions de la République dont la gestion n'est pas soumise à la règle de la performance, sans objectifs ni indicateurs de résultat, sans préjudice des règles de la comptabilité publique et du contrôle sur l'utilisation des crédits.",
    articleRef: "Art. 3 LOFIP (réd. 2023), pts 18 et 20",
  },
  {
    id: 'ch10-q14',
    question: "Comment le débat d'orientation budgétaire s'articule-t-il avec le cadre budgétaire à moyen terme, selon l'article 13 de la LOFIP (rédaction 2023) ?",
    options: [
      { id: 'a', texte: "Il se tient après le vote de la loi de finances, en janvier" },
      { id: 'b', texte: "Le CBMT à trois ans, adopté en Conseil des ministres, est transmis à l'Assemblée nationale au plus tard le 1er juin et donne lieu à un débat d'orientation budgétaire, suivi éventuellement de recommandations, au plus tard le 15 juin" },
      { id: 'c', texte: "Il remplace le vote de la loi de finances" },
      { id: 'd', texte: "Il est organisé par la Cour des comptes" },
    ],
    reponseCorrecte: 'b',
    explication: "Dans sa rédaction issue de la loi n° 23/030, l'article 13 prévoit que le cadre budgétaire à moyen terme à trois ans, adopté en Conseil des ministres, est transmis à l'Assemblée nationale au plus tard le 1er juin et donne lieu à un débat d'orientation budgétaire, suivi éventuellement de recommandations, au plus tard le 15 juin. Ce débat renforce l'information du Parlement sur la trajectoire des finances publiques en amont de la discussion du projet de loi de finances ; il ne lie pas juridiquement le Gouvernement.",
    articleRef: 'Art. 13 LOFIP (réd. 2023)',
  },
  {
    id: 'ch10-q15',
    question: "Selon l'article 231 de la LOFIP, que deviennent les organismes auxiliaires précédemment intégrés dans les budgets ?",
    options: [
      { id: 'a', texte: "Ils sont supprimés" },
      { id: 'b', texte: "Ils sont traités et reclassés suivant les critères soit de services de dépenses, soit de budgets annexes, soit d'établissements publics" },
      { id: 'c', texte: "Ils sont transférés aux provinces" },
      { id: 'd', texte: "Ils sont maintenus sans modification jusqu'en 2029" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 231 de la LOFIP dispose : « Dès la promulgation de la présente loi, les organismes auxiliaires précédemment intégrés dans le budget du pouvoir central, des provinces et des entités territoriales décentralisées sont traités et reclassés suivant les critères soit de services de dépenses, soit de budgets annexes, soit enfin d'établissements publics. »",
    articleRef: 'Art. 231 LOFIP',
  },
  {
    id: 'ch10-q16',
    question: "Selon l'article 232 de la LOFIP, les articles 218 à 222 et 225 à 226 (répartition des recettes aux provinces, aux ETD et à la Caisse nationale de péréquation) sont-ils soumis au régime transitoire ?",
    options: [
      { id: 'a', texte: "Oui, ils ne s'appliqueront qu'au basculement intégral vers le budget-programme" },
      { id: 'b', texte: "Non, ils sont d'application immédiate depuis la promulgation de la LOFIP" },
      { id: 'c', texte: "Oui, sauf pour les provinces à statut particulier" },
      { id: 'd', texte: "Ils ont été abrogés par la loi n° 23/030" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 232 de la LOFIP énumère les dispositions « d'application immédiate », dont « les articles 218 à 222 et 225 à 226 relatifs à la répartition des recettes aux provinces, aux entités territoriales décentralisées, et à la caisse nationale de péréquation ». La retenue de 40 % et la péréquation ne relèvent donc pas du régime transitoire du budget-programme : elles sont exigibles depuis 2011.",
    articleRef: 'Art. 232 LOFIP',
  },
  {
    id: 'ch10-q17',
    question: "Toujours selon l'article 232 de la LOFIP, quel est le statut des articles 110 et 209 relatifs à la gestion de la trésorerie ?",
    options: [
      { id: 'a', texte: "Ils sont différés jusqu'à l'application intégrale de la loi" },
      { id: 'b', texte: "Ils sont d'application immédiate" },
      { id: 'c', texte: "Ils sont abrogés" },
      { id: 'd', texte: "Ils ne s'appliquent qu'aux provinces" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 232 range expressément « les articles 110 et 209 relatifs à la gestion de la trésorerie » parmi les dispositions d'application immédiate : l'unité de caisse — dépôt de toutes les disponibilités sur un compte unique auprès du caissier de l'État, sauf disposition expresse d'une loi de finances (art. 110), d'un édit ou d'une décision budgétaire (art. 209) — s'impose depuis 2011. Sont aussi d'application immédiate les articles 32 à 37, 74, 75 et 145 à 150 (ressources et charges), 83, 84 et 182 à 185 (dépôt des lois de finances, édits et décisions) et 186, 227, 228 (intégration des budgets).",
    articleRef: 'Art. 232 LOFIP',
  },
  {
    id: 'ch10-q18',
    question: "Outre l'abrogation de la loi financière de 1983, quel texte l'article 233 de la LOFIP modifie-t-il ou ampute-t-il ?",
    options: [
      { id: 'a', texte: "La Constitution, en son article 122" },
      { id: 'b', texte: "La loi n° 08/012 du 31 juillet 2008 sur la libre administration des provinces : modification de l'article 16 (calendrier des sessions des Assemblées provinciales) et abrogation des articles 54 al. 2 et 3, 55 et 58 al. 1er" },
      { id: 'c', texte: "Le Code des impôts en son intégralité" },
      { id: 'd', texte: "La loi organique sur la Cour des comptes" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 233 de la LOFIP modifie l'article 16 de la loi n° 08/012 du 31 juillet 2008 portant principes fondamentaux relatifs à la libre administration des provinces (calendrier des sessions ordinaires des Assemblées provinciales) et abroge ses articles 54 alinéas 2 et 3 (retenue à la source), 55 (définition des recettes à caractère national) et 58 alinéa 1er (emprunts de la province) — matières désormais régies par la LOFIP elle-même.",
    articleRef: 'Art. 233 LOFIP',
  },
  {
    id: 'ch10-q19',
    question: "Selon l'article 107 de la LOFIP, quels actes sont soumis à l'avis préalable du ministre ayant le budget dans ses attributions ?",
    options: [
      { id: 'a', texte: "Uniquement les exonérations fiscales" },
      { id: 'b', texte: "Tout projet de loi, décision ou convention pouvant avoir une répercussion immédiate ou future sur les recettes ou les dépenses, ainsi que tout acte d'administration portant création d'emploi, extension des cadres organiques ou modification du statut pécuniaire des agents" },
      { id: 'c', texte: "Les seuls marchés publics supérieurs à un seuil" },
      { id: 'd', texte: "Les nominations des comptables publics" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 107 de la LOFIP dispose que « tout projet de loi, toute décision ou convention quelconque pouvant avoir une répercussion immédiate ou future, tant sur les recettes que sur les dépenses ainsi que tout acte d'administration portant création d'emploi, extension des cadres organiques, ou modification du statut pécuniaire des agents de carrière des services publics du pouvoir central, doivent être soumis à l'avis préalable du ministre ayant le budget dans ses attributions et, le cas échéant, du ministre ayant les finances dans ses attributions ». C'est le verrou budgétaire préventif contre les charges non budgétisées — une exonération, qui ampute les recettes, entre dans son champ.",
    articleRef: 'Art. 107 LOFIP',
  },
  {
    id: 'ch10-q20',
    question: "Quel est le calendrier d'adoption de la loi de finances de l'année selon l'article 83 de la LOFIP ?",
    options: [
      { id: 'a', texte: "Dépôt au 1er octobre ; vote dans les 90 jours" },
      { id: 'b', texte: "Dépôt au plus tard le 15 septembre ; l'Assemblée nationale dispose de 40 jours pour adopter, puis le Sénat de 20 jours ; à défaut de vote avant l'ouverture de l'exercice, mise en vigueur par ordonnance-loi du Président de la République" },
      { id: 'c', texte: "Dépôt au 31 mai ; vote avant le 15 juin" },
      { id: 'd', texte: "Aucun délai n'est fixé" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 83 de la LOFIP impose le dépôt du projet de loi de finances de l'année, avec les documents des articles 78 et 79, au plus tard le 15 septembre — échéance également constitutionnelle (art. 126 de la Constitution). L'Assemblée nationale dispose de 40 jours à compter du dépôt, puis le Sénat de 20 jours. Si le projet n'est pas voté avant l'ouverture de l'exercice, il est mis en vigueur par ordonnance-loi du Président de la République, délibérée en Conseil des ministres, compte tenu des amendements votés. Si le Gouvernement n'a pas déposé son projet le 1er décembre (quinze jours avant la fin de la session budgétaire), il est réputé démissionnaire, et une loi de crédits provisoires prend le relais.",
    articleRef: 'Art. 83 LOFIP ; art. 126 Constitution',
  },
  {
    id: 'ch10-q21',
    question: "Quels montants la loi de finances n° 25/060 du 29 décembre 2025 fixe-t-elle pour l'exercice 2026 ?",
    options: [
      { id: 'a', texte: "Budget du pouvoir central en équilibre à 59 020,5 milliards de FC" },
      { id: 'b', texte: "Budget du pouvoir central en équilibre à 54 335,8 milliards de FC (art. 6), dont 48 969,3 milliards pour le budget général (art. 7), 962,3 milliards de budgets annexes et 4 404,2 milliards de comptes spéciaux" },
      { id: 'c', texte: "Budget de 50 691,8 milliards de FC, en baisse de 1,7 %" },
      { id: 'd', texte: "Budget de 40 986 milliards de FC" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 6 de la LF n° 25/060 arrête le budget du pouvoir central 2026 en équilibre à 54 335 751 192 461 FC ; l'article 7 arrête les recettes du budget général à 48 969 279 573 100 FC, auxquelles s'ajoutent 962 258 869 270 FC de budgets annexes et 4 404 212 750 090 FC de comptes spéciaux (annexe I). Par rapport à la LFR 2025 (50 691,8 milliards), le budget 2026 progresse d'environ 7,2 %. Le chiffre de « 59 020,5 milliards » parfois avancé ne correspond à aucun article de la loi promulguée.",
    articleRef: 'Art. 6-7 et annexe I, LF n° 25/060 (2026)',
  },
  {
    id: 'ch10-q22',
    question: "Quelle réforme l'article 5 de la loi de finances n° 25/060 pour 2026 accélère-t-il ?",
    options: [
      { id: 'a', texte: "La suppression du contrôle budgétaire préalable" },
      { id: 'b', texte: "La déconcentration de l'ordonnancement (art. 103 LOFIP), avec neuf ministères sectoriels pilotes dès 2026" },
      { id: 'c', texte: "Le transfert intégral des recettes fiscales aux provinces" },
      { id: 'd', texte: "La fusion de l'IGF et de la Cour des comptes" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 5 de la LF n° 25/060 accélère la déconcentration de l'ordonnancement prévue par l'article 103 de la LOFIP, avec neuf ministères sectoriels pilotes dès 2026 : Finances ; Santé publique, Hygiène et Prévoyance sociale ; Éducation et Nouvelle citoyenneté ; Développement rural ; Infrastructures et Travaux publics ; Agriculture et Sécurité alimentaire ; Défense nationale et Anciens combattants ; Pêche et Élevage ; Enseignement supérieur et universitaire. L'article 84 organise en parallèle le régime transitoire : le ministre du Budget liquide par visa préalable, le ministre des Finances ordonnance.",
    articleRef: 'Art. 5 et 84, LF n° 25/060 (2026)',
  },
  {
    id: 'ch10-q23',
    question: "Comment le budget 2025 a-t-il évolué entre la loi de finances initiale et la loi de finances rectificative ?",
    options: [
      { id: 'a', texte: "Il est passé de 51 553,5 à 50 691,8 milliards de FC, soit une révision à la baisse d'environ 1,7 %" },
      { id: 'b', texte: "Il est passé de 40 986 à 54 335,8 milliards de FC" },
      { id: 'c', texte: "Il a été doublé" },
      { id: 'd', texte: "Il est resté inchangé" },
    ],
    reponseCorrecte: 'a',
    explication: "Les tableaux comparatifs annexés à la LF 2026 donnent les totaux : LF initiale 2025 : 51 553 541 670 141 FC ; LFR 2025 (loi n° 25/044) : 50 691 794 155 622 FC — une révision à la baisse d'environ 1,7 %, portant notamment sur les recettes internes (de 33 141,9 à 30 647,9 milliards de FC). Seule la loi de finances rectificative peut, en cours d'année, modifier certaines dispositions de la loi de finances de l'année (art. 26 LOFIP), et elle est présentée dans les mêmes formes que celle-ci (art. 27).",
    articleRef: 'Annexe I, LF n° 25/060 ; art. 26-27 LOFIP',
  },
  {
    id: 'ch10-q24',
    question: "Quelles sont les hypothèses macroéconomiques de la loi de finances 2026 (cadrage annexé) ?",
    options: [
      { id: 'a', texte: "Croissance 5,3 %, inflation moyenne 4,4 %, taux de change moyen 2 467,0 FC/USD, pression fiscale projetée 12,3 %" },
      { id: 'b', texte: "Croissance 8,8 %, inflation 17,1 %, change 2 954,4 FC/USD" },
      { id: 'c', texte: "Croissance 2 %, inflation 20 %, change 1 500 FC/USD" },
      { id: 'd', texte: "La loi de finances ne comporte aucun cadrage macroéconomique" },
    ],
    reponseCorrecte: 'a',
    explication: "Le cadrage macroéconomique annexé à la LF 2026 retient, en projections 2026 : un taux de croissance du PIB de 5,3 %, une inflation moyenne de 4,4 % (6,1 % en fin de période), un taux de change moyen de 2 467,0 FC/USD (2 634,1 en fin de période), un PIB nominal de 269 291,9 milliards de FC et une pression fiscale projetée à 12,3 %. À titre de comparaison, la colonne LFR 2025 affichait une croissance de 5,3 %, une inflation moyenne de 8,8 % et un change moyen de 2 859,2 FC/USD.",
    articleRef: 'Cadrage macroéconomique, LF n° 25/060 (2026)',
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '10.1',
    titre: 'Quarante ans de réformes : de la loi de 1983 à la LOFIP',
    navLabel: 'Chronologie',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les finances publiques congolaises ont longtemps été régies par la **loi financière n° 83-003 du 23 février 1983**, modifiée par l'ordonnance-loi n° 87-004 du 10 janvier 1987 — un cadre de *budget de moyens*, où les crédits étaient alloués par nature de dépenses sans lien avec des résultats attendus. La **loi n° 11/011 du 13 juillet 2011 relative aux finances publiques (LOFIP)**, prise sur le fondement de l'article 122 point 3 de la Constitution, opère la bascule vers une gestion axée sur les résultats : budget-programme, décentralisation financière (40 % aux provinces, péréquation), unité de trésorerie, contrôles rénovés, régime des responsabilités et sanctions.",
      },
      {
        type: 'tableau',
        tableau: {
          entetes: ['Année', 'Texte', 'Apport principal'],
          lignes: [
            ['1983', 'Loi financière n° 83-003', 'Premier cadre unifié — budget de moyens'],
            ['1987', 'Ordonnance-loi n° 87-004', 'Modification de la loi de 1983'],
            ['2011', 'LOFIP n° 11/011 (13 juillet)', "Budget-programme, décentralisation financière, unité de trésorerie, contrôles ; application intégrale prévue au 1er janvier 2019 (art. 234)"],
            ['2018', 'Loi n° 18/010 (9 juillet)', "Prorogation de cinq ans du délai d'application intégrale ; art. 230ter : la progressivité repart de 2018"],
            ['2023', 'Loi n° 23/030 (28 juin)', "Seconde prorogation de cinq ans ; dotations budgétaires, débat d'orientation budgétaire, art. 79 enrichi (11 documents), rapport annuel sur la réforme"],
            ['2025', 'LF n° 24/011 puis LFR n° 25/044', 'Budget 2025 : 51 553,5 Mds FC, révisé à 50 691,8 Mds FC'],
            ['2025', 'LF n° 25/060 (29 décembre)', "Budget 2026 : 54 335,8 Mds FC en équilibre ; déconcentration de l'ordonnancement (9 ministères pilotes)"],
          ],
        },
      },
      { type: 'controle', question: QCM[0] },
      {
        type: 'carte',
        titre: "Les deux prorogations du budget-programme",
        liste: [
          "**Rédaction 2011** (art. 234) : entrée en vigueur intégrale « au premier janvier de la huitième année suivant celle de sa promulgation », soit le 1er janvier 2019, date d'abrogation de toutes dispositions contraires.",
          "**Loi n° 18/010 de 2018** : le délai est « prorogé de cinq ans » (échéance portée à 2024) et l'article 230ter fait repartir la progressivité de la gestion axée sur les résultats à dater de la promulgation de la loi de 2018. L'abrogation de la loi financière de 1983 est différée « à dater de cette échéance ».",
          "**Loi n° 23/030 de 2023** (art. 234 nouveau) : le délai de mise en application de la loi de 2018 « est prorogé de cinq ans », et le ministre du Budget présente chaque année à l'Assemblée nationale, en session budgétaire, « un rapport décrivant les progrès vers la mise en œuvre effective de la réforme du budget-programme ».",
        ],
        note: "L'échéance d'application intégrale se situe donc vers la fin de la décennie (aux alentours de 2028-2029 selon le point de départ retenu pour la seconde prorogation). Jusqu'à cette échéance, la loi de finances de chaque année identifie les entités éligibles à la gestion de budgets de résultats, l'ancien régime restant applicable aux autres (art. 230).",
      },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[4] },
    ],
  },
  {
    numero: '10.2',
    titre: 'Le budget-programme : architecture juridique',
    navLabel: 'Budget-programme',
    blocs: [
      {
        type: 'paragraphe',
        texte: "La LOFIP s'applique aux finances de l'État — pouvoir central, provinces, ETD et leurs organismes auxiliaires (art. 2). Le cœur de la réforme est la **spécialisation des crédits par programme** : l'article 8 spécialise les crédits par titre et par source de financement et les regroupe par programme ; dans le cadre d'un budget-programme, la présentation par chapitre, article et littera devient *indicative*. La loi n° 23/030 a ajouté la **dotation budgétaire** pour les institutions de la République dont la gestion n'est pas soumise à la règle de la performance : les crédits sont désormais regroupés « par programme ou par dotation ».",
      },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[7] },
      {
        type: 'carte',
        titre: "Le programme et sa discipline (art. 43-44, 22 LOFIP)",
        liste: [
          "**Programme** (art. 43) : ensemble cohérent d'actions d'un même ministère ou institution, avec objectifs précis définis en fonction de finalités d'intérêt général, résultats attendus et évaluation par **indicateurs de performance** ; possibilité d'un programme « administration générale » ; création et suppression réservées à une loi de finances d'initiative gouvernementale.",
          "**Fonctions** (art. 44) : les programmes — et, depuis 2023, les dotations — peuvent être regroupés en fonctions institutionnelles, ministérielles ou interministérielles ; la fonction interministérielle impose une coordination d'exécution et une présentation conjointe des résultats.",
          "**Présentation des crédits** (art. 22) : par ministère ou institution et par programme ou dotation, en autorisations d'engagement (AE) et crédits de paiement (CP), avec plafonds d'autorisations d'emplois rémunérés.",
          "**Documents de performance** : les projets annuels de performance accompagnent le projet de loi de finances (art. 79 point 6, rédaction 2023, parmi onze documents) et le rapport annuel de performance par programme accompagne le projet de loi portant reddition des comptes (art. 82 point 4).",
        ],
      },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[11] },
      {
        type: 'filet',
        titre: "Le débat d'orientation budgétaire",
        texte: "Institutionnalisé par la loi n° 23/030, le débat d'orientation budgétaire (art. 3 point 18, rédaction 2023) est organisé en séance plénière par l'Assemblée nationale autour du cadre budgétaire à moyen terme. L'article 13 (rédaction 2023) en fixe le tempo : le CBMT à trois ans, adopté en Conseil des ministres, est transmis à l'Assemblée nationale au plus tard le 1er juin ; le débat, suivi éventuellement de recommandations, se tient au plus tard le 15 juin. Il éclaire le Parlement en amont du projet de loi de finances sans lier juridiquement le Gouvernement.",
      },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[13] },
    ],
  },
  {
    numero: '10.3',
    titre: "Le régime transitoire : ce qui s'applique déjà, ce qui attend",
    navLabel: 'Régime transitoire',
    blocs: [
      {
        type: 'paragraphe',
        texte: "La cinquième partie de la LOFIP (art. 230 à 235) organise la transition. L'article 230 pose la **progressivité** : la loi de finances de chaque année identifie les ministères, institutions, provinces et ETD éligibles à la gestion de budgets de résultats, la loi financière de 1983 restant applicable aux entités non identifiées. L'article 231 impose, dès la promulgation, le **reclassement des organismes auxiliaires** en services de dépenses, budgets annexes ou établissements publics.",
      },
      { type: 'controle', question: QCM[2] },
      {
        type: 'carte',
        titre: "Les dispositions d'application immédiate (art. 232 LOFIP)",
        liste: [
          "Articles 32 à 37, 74, 75 et 145 à 150 : détermination des ressources et charges budgétaires et de trésorerie.",
          "Articles 83, 84 et 182 à 185 : dépôt des lois de finances, des édits et des décisions budgétaires.",
          "Articles 186, 227 et 228 : intégration des différents budgets.",
          "Articles 218 à 222 et 225 à 226 : répartition des recettes aux provinces, aux ETD et à la Caisse nationale de péréquation — la retenue de 40 % est exigible depuis 2011, sans attendre le budget-programme.",
          "Articles 110 et 209 : gestion de la trésorerie — l'unité de caisse s'impose depuis 2011.",
        ],
      },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[16] },
      {
        type: 'filet',
        titre: "L'article 233 : abrogations et coordinations",
        texte: "Outre l'abrogation de la loi financière n° 83-003 de 1983 (différée à l'échéance prorogée par les lois de 2018 et 2023), l'article 233 modifie l'article 16 de la loi n° 08/012 du 31 juillet 2008 sur la libre administration des provinces (calendrier des sessions des Assemblées provinciales) et abroge ses articles 54 alinéas 2 et 3 (retenue à la source), 55 (recettes à caractère national) et 58 alinéa 1er (emprunts provinciaux) — ces matières relevant désormais de la LOFIP.",
      },
      { type: 'controle', question: QCM[17] },
    ],
  },
  {
    numero: '10.4',
    titre: "Le verrou budgétaire préventif et le calendrier d'adoption",
    navLabel: 'Verrou préventif',
    blocs: [
      {
        type: 'paragraphe',
        texte: "En amont de l'exécution, la LOFIP verrouille la création de charges non budgétisées. L'article 107 soumet à l'**avis préalable du ministre ayant le budget dans ses attributions** — et, le cas échéant, du ministre des Finances — tout projet de loi, toute décision ou convention pouvant avoir une répercussion immédiate ou future sur les recettes ou les dépenses, ainsi que tout acte d'administration portant création d'emploi, extension des cadres organiques ou modification du statut pécuniaire des agents. Une exonération fiscale, qui ampute les recettes, comme la création d'une structure nouvelle, qui crée des charges, entrent dans ce champ ; l'article 9 rappelle en outre qu'aucune exemption ni aucun allégement fiscal ne peut être établi qu'en vertu de la loi.",
      },
      { type: 'controle', question: QCM[18] },
      {
        type: 'carte',
        titre: "Le calendrier d'adoption de la loi de finances (art. 83 LOFIP ; art. 126 Constitution)",
        tableau: {
          entetes: ['Étape', 'Échéance', 'Base'],
          lignes: [
            ["Transmission du CBMT et débat d'orientation budgétaire", "1er juin / au plus tard le 15 juin", 'Art. 13 LOFIP (réd. 2023)'],
            ["Dépôt du projet de loi de finances à l'Assemblée nationale", 'Au plus tard le 15 septembre', 'Art. 83 LOFIP ; art. 126 Constitution'],
            ["Adoption par l'Assemblée nationale", '40 jours à compter du dépôt', 'Art. 83 LOFIP'],
            ['Adoption par le Sénat', '20 jours', 'Art. 83 LOFIP'],
            ["Non-vote avant l'ouverture de l'exercice", "Mise en vigueur par ordonnance-loi du Président de la République, délibérée en Conseil des ministres, compte tenu des amendements votés", 'Art. 83 LOFIP ; art. 126 Constitution'],
            ['Non-dépôt du projet au 1er décembre', "Gouvernement réputé démissionnaire ; loi de crédits provisoires (dépôt avant le 15 décembre)", 'Art. 83 LOFIP ; art. 126 Constitution'],
          ],
        },
        note: "Les délais de 40 et 20 jours figurent à l'article 83 de la LOFIP ; l'article 126 de la Constitution fixe le dépôt au 15 septembre et organise les crédits provisoires. En pratique, l'élaboration est encadrée chaque année par une circulaire du ministre du Budget contenant les instructions relatives à la préparation du budget (calendrier interne des prévisions sectorielles, conférences budgétaires et fiscales) — pratique administrative dont les prescriptions détaillées ne se substituent jamais aux textes cités ici.",
      },
      { type: 'controle', question: QCM[19] },
    ],
  },
  {
    numero: '10.5',
    titre: "L'actualité budgétaire : LFR 2025 et loi de finances 2026",
    navLabel: 'LFR 2025 et LF 2026',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Seule une **loi de finances rectificative** peut, en cours d'année, modifier certaines dispositions de la loi de finances de l'année (art. 26), dans les mêmes formes que celle-ci (art. 27) — c'est l'une des quatre espèces de lois de finances énumérées à l'article 18, avec la loi de finances de l'année, la loi portant reddition des comptes et la loi portant ouverture de crédits provisoires. L'exercice 2025 en offre une illustration : le budget initial de **51 553,5 milliards de FC** (loi n° 24/011) a été révisé à la baisse à **50 691,8 milliards** par la LFR n° 25/044, soit environ −1,7 %, la contraction portant surtout sur les recettes internes (de 33 141,9 à 30 647,9 milliards de FC).",
      },
      { type: 'controle', question: QCM[22] },
      {
        type: 'carte',
        titre: 'La loi de finances n° 25/060 du 29 décembre 2025 pour 2026 — chiffres vérifiés',
        tableau: {
          entetes: ['Poste', 'LF 2025', 'LFR 2025', 'LF 2026'],
          lignes: [
            ['Budget général (recettes)', '46 799,7 Mds FC', '45 749,6 Mds FC', '48 969,3 Mds FC (art. 7)'],
            ['Budgets annexes', '903,0 Mds FC', '903,0 Mds FC', '962,3 Mds FC'],
            ['Comptes spéciaux', '3 850,9 Mds FC', '4 039,2 Mds FC', '4 404,2 Mds FC'],
            ['Total en équilibre', '51 553,5 Mds FC', '50 691,8 Mds FC', '54 335,8 Mds FC (art. 6)'],
            ['Part des provinces (40 %)', '—', '—', '7 694,5 Mds FC (art. 8)'],
            ['Caisse nationale de péréquation', '—', '—', '744,6 Mds FC (art. 9)'],
          ],
        },
        note: "Le budget 2026 progresse d'environ 7,2 % par rapport à la LFR 2025. Cadrage macroéconomique 2026 : croissance du PIB 5,3 %, inflation moyenne 4,4 %, taux de change moyen 2 467,0 FC/USD, PIB nominal 269 291,9 Mds FC, pression fiscale projetée 12,3 %.",
      },
      { type: 'controle', question: QCM[20] },
      {
        type: 'paragraphe',
        texte: "Au-delà des masses, la LF 2026 porte plusieurs réformes d'exécution : l'article 5 accélère la **déconcentration de l'ordonnancement** (art. 103 LOFIP) avec neuf ministères sectoriels pilotes ; l'article 84 organise le régime transitoire de la chaîne de la dépense (liquidation par visa préalable du ministre du Budget, ordonnancement par le ministre des Finances) ; l'article 85 impose la transmission journalière de la situation des encaissements et décaissements du ministre des Finances au ministre du Budget ; l'article 77 autorise la levée de fonds par bons et obligations du Trésor plafonnée à 0,5 % du PIB.",
      },
      { type: 'controle', question: QCM[21] },
      { type: 'controle', question: QCM[23] },
      {
        type: 'filet',
        titre: "L'actualité non normative, à manier avec précaution",
        texte: "Le contexte de ces exercices — conflit armé dans l'est du pays pesant sur les recettes et les dépenses de sécurité, programme conclu avec le FMI (facilité élargie de crédit et facilité pour la résilience et la durabilité), rapports d'organisations de la société civile sur les taux d'exécution — relève de l'actualité économique et non des textes : ces éléments, utiles à la compréhension, doivent toujours être vérifiés sur les documents officiels du moment (Journal officiel, communiqués du FMI, rapports publiés) avant d'être cités dans un travail académique.",
      },
    ],
  },
  {
    numero: '10.6',
    titre: 'Bilan et perspectives de la réforme',
    navLabel: 'Perspectives',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Quinze ans après la promulgation de la LOFIP, le bilan est contrasté. D'un côté, un socle appliqué : les dispositions d'application immédiate de l'article 232 — répartition des recettes aux provinces et aux ETD, unité de trésorerie, calendriers de dépôt — sont en vigueur depuis 2011, et le cadre du budget-programme s'est enrichi en 2023 (dotations, débat d'orientation budgétaire, documents de performance portés à onze). De l'autre, un basculement intégral deux fois prorogé, dont l'exposé des motifs de la loi n° 23/030 reconnaît lui-même les préalables inachevés : découpage des ministères en programmes, instruments d'évaluation de la performance, réforme de la comptabilité publique, rationalisation des cadres organiques, déconcentration de l'ordonnancement et adaptation du système d'information des finances publiques.",
      },
      { type: 'controle', question: QCM[5] },
      {
        type: 'carte',
        titre: "Les chantiers ouverts à l'échéance de la seconde prorogation",
        liste: [
          "**Basculement au budget-programme** : généraliser la gestion par programmes au-delà des entités identifiées chaque année par la loi de finances (art. 230), en s'appuyant sur le rapport annuel de progression présenté à l'Assemblée nationale (art. 234, réd. 2023).",
          "**Déconcentration de l'ordonnancement** : étendre l'expérimentation des neuf ministères pilotes (art. 5 LF 2026) et sortir du régime transitoire de l'article 84 de la LF 2026 vers le droit commun des articles 103 et suivants de la LOFIP.",
          "**Mobilisation des recettes** : la pression fiscale projetée à 12,3 % du PIB en 2026 laisse une marge substantielle ; la modernisation des administrations fiscales et l'élargissement de l'assiette en sont les leviers.",
          "**Effectivité de la décentralisation financière** : garantir la réalité des mécanismes d'application immédiate — retenue de 40 % lors du nivellement (art. 220), Caisse nationale de péréquation (art. 222) — dotés en 2026 de 7 694,5 et 744,6 milliards de FC.",
          "**Transparence et reddition des comptes** : respecter le calendrier de la loi portant reddition des comptes (dépôt au 15 mai, art. 84 LOFIP), produire les rapports annuels de performance (art. 82 pt 4) et s'appuyer sur la Cour des comptes et ses chambres déconcentrées (loi organique n° 18/024).",
        ],
      },
      { type: 'controle', question: QCM[9] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ch10-cp1',
    titre: 'La seconde prorogation du budget-programme contestée',
    contexte: "En 2023, le Gouvernement dépose un projet de loi modifiant la LOFIP pour proroger une seconde fois le délai de basculement vers le budget-programme. Des députés contestent : selon eux, le Gouvernement ne peut pas repousser indéfiniment une réforme consacrée par la loi.",
    questions: [
      {
        num: 1,
        enonce: "La loi de prorogation n° 23/030 du 28 juin 2023 est-elle juridiquement valide ?",
        correction: "Oui. L'article 122 point 3 de la Constitution range les finances publiques dans le domaine de la loi : le délai de l'article 234 de la LOFIP est une disposition législative, qu'une loi postérieure de même nature peut modifier. La loi n° 23/030, adoptée par l'Assemblée nationale et le Sénat et promulguée le 28 juin 2023, proroge valablement de cinq ans le délai fixé par la loi n° 18/010 — laquelle avait déjà prorogé de cinq ans l'échéance initiale du 1er janvier 2019 (art. 234, réd. 2011 : « au premier janvier de la huitième année suivant celle de sa promulgation »). Il n'existe pas de hiérarchie entre lois ordinaires : le grief des députés est politiquement recevable, juridiquement inopérant.",
      },
      {
        num: 2,
        enonce: "Quels préalables du basculement le Gouvernement pouvait-il invoquer ?",
        correction: "L'exposé des motifs de la loi n° 23/030 les énumère lui-même : douze ans après la LOFIP, le passage intégral au budget-programme restait tributaire du découpage des ministères en programmes budgétaires, des instruments d'évaluation de la performance, de la réforme de la comptabilité publique, de la rationalisation des cadres organiques, de la déconcentration de l'ordonnancement et de l'adaptation du système d'information des finances publiques. Le régime de l'article 230 est précisément conçu pour cela : la loi de finances de chaque année identifie les entités éligibles à la gestion de budgets de résultats, l'ancien régime restant applicable aux autres. La prorogation prend acte de cette progressivité inachevée.",
      },
      {
        num: 3,
        enonce: "Quelles contreparties de contrôle la loi n° 23/030 apporte-t-elle ?",
        correction: "Deux mécanismes. D'une part, le rapport annuel de progression : l'article 234 (rédaction 2023) impose que « chaque année, un rapport décrivant les progrès vers la mise en œuvre effective de la réforme du budget-programme est présenté à l'Assemblée nationale, au cours de la session budgétaire, par le Ministre ayant le Budget dans ses attributions » — une reddition politique périodique qui empêche la prorogation de devenir un blanc-seing. D'autre part, le débat d'orientation budgétaire (art. 3 pt 18 et art. 13, réd. 2023) : le CBMT est transmis à l'Assemblée nationale au plus tard le 1er juin et débattu au plus tard le 15 juin, renforçant le contrôle parlementaire en amont du projet de loi de finances.",
      },
    ],
  },
  {
    id: 'ch10-cp2',
    titre: "Déconcentration de l'ordonnancement et visa du contrôleur budgétaire",
    contexte: "Le ministère de la Santé publique figure parmi les neuf ministères pilotes de la déconcentration de l'ordonnancement (art. 5 de la LF n° 25/060). Son secrétaire général, ordonnateur délégué, engage 50 millions de FC pour l'acquisition de médicaments sans visa préalable du contrôleur budgétaire, en invoquant l'urgence sanitaire et sa nouvelle compétence.",
    questions: [
      {
        num: 1,
        enonce: "La déconcentration de l'ordonnancement supprime-t-elle le contrôle budgétaire préalable ?",
        correction: "Non. L'article 5 de la LF 2026 accélère la déconcentration de l'ordonnancement prévue par l'article 103 de la LOFIP : il déplace la compétence d'ordonnancer vers les ministères sectoriels pilotes, mais ne touche pas au circuit de contrôle. L'article 112 de la LOFIP soumet au visa préalable du contrôleur budgétaire tous les actes portant engagement, liquidation et ordonnancement, et l'article 119 interdit de transférer au comptable public un ordonnancement non revêtu de ce visa. Une loi de finances ne saurait au demeurant déroger implicitement à ces règles : l'article 84 de la LF 2026 organise d'ailleurs expressément le régime transitoire de liquidation (visa préalable) et d'ordonnancement. L'engagement sans visa est irrégulier.",
      },
      {
        num: 2,
        enonce: "L'urgence sanitaire exonère-t-elle le secrétaire général de sa responsabilité ?",
        correction: "Non. L'urgence n'est pas une cause exonératoire prévue par la LOFIP. La voie légale face à un refus ou à une impossibilité de visa est celle de l'article 114 : en référer au ministre du Budget, qui seul peut autoriser, par écrit motivé, de passer outre. En engageant sans visa, le secrétaire général commet une faute de gestion au sens de l'article 129 (« qui n'aura pas respecté les règles d'engagement des dépenses »), justiciable de la Cour des comptes (art. 131 ; art. 32 de la loi organique n° 18/024), passible d'une amende du quart au double de son traitement brut annuel. Il ne pourrait s'exonérer qu'en établissant un ordre écrit non manifestement illégal de sa hiérarchie, auquel cas la responsabilité du donneur d'ordre se substituerait à la sienne (art. 32 de la loi organique).",
      },
      {
        num: 3,
        enonce: "Expliquez l'intérêt de la distinction AE/CP pour un marché pluriannuel de fourniture de médicaments.",
        correction: "L'autorisation d'engagement est « la permission de signer sur l'année considérée un ou plusieurs marchés pour un montant total maximum mais dont l'exécution peut se réaliser sur plusieurs exercices budgétaires selon un échéancier des paiements » (art. 3 point 2) ; le crédit de paiement est la limite supérieure des dépenses pouvant être ordonnancées ou payées pendant l'année pour la couverture des engagements contractés (art. 3 point 17). Pour un marché pluriannuel de médicaments, l'AE couvre dès la première année le montant total du contrat, tandis que les CP sont échelonnés sur les exercices de livraison. Cette double présentation, imposée par l'article 22, permet de distinguer paiements au titre d'engagements antérieurs et engagements nouveaux et d'améliorer la gestion des restes à payer, qui ne sont plus réengagés chaque année.",
      },
    ],
  },
  {
    id: 'ch10-cp3',
    titre: "La loi de finances rectificative de 2025 et l'équilibre budgétaire",
    contexte: "En 2025, le Gouvernement soumet au Parlement un projet de loi de finances rectificative révisant le budget à la baisse, de 51 553,5 à 50 691,8 milliards de FC. Des parlementaires objectent qu'une réduction du budget violerait le principe d'équilibre budgétaire.",
    questions: [
      {
        num: 1,
        enonce: "Une révision à la baisse du budget viole-t-elle le principe d'équilibre ?",
        correction: "Non. L'équilibre budgétaire est « un état de budget dont les recettes sont égales aux dépenses » (art. 3 point 21 de la LOFIP) : il porte sur l'égalité entre recettes et dépenses, non sur le niveau du budget. La LFR n° 25/044 a ajusté simultanément recettes et dépenses — le total révisé de 50 691,8 milliards de FC reste présenté en équilibre, comme le montrent les tableaux comparatifs annexés à la LF 2026 (recettes totales = dépenses totales à chaque exercice). Réviser à la baisse un budget dont les recettes internes prévues chutent (de 33 141,9 à 30 647,9 milliards) est même une exigence de sincérité : l'article 11 interdit de surestimer les ressources présentées.",
      },
      {
        num: 2,
        enonce: "Quel est le cadre procédural de la loi de finances rectificative ?",
        correction: "La loi de finances rectificative est l'une des quatre espèces de lois de finances (art. 18). Sous réserve des exceptions limitativement prévues (art. 48, 49, 53, 64, 70, 94 et 108), « seule la loi de finances rectificative peut, en cours d'année, modifier certaines dispositions de la loi de finances de l'année » (art. 26). Elle ratifie, le cas échéant, les modifications intervenues conformément à l'article 129 de la Constitution et contient les modifications « présentée[s] en partie ou en totalité dans les mêmes formes que la loi de finances de l'année » (art. 27) : mêmes exigences documentaires, même circuit parlementaire, même équilibre.",
      },
      {
        num: 3,
        enonce: "Comment la sincérité encadre-t-elle l'exercice ?",
        correction: "L'article 11 de la LOFIP impose que le budget présente « de façon sincère l'ensemble de [ses] ressources et de [ses] charges », la sincérité s'appréciant « compte tenu des informations disponibles et des prévisions qui en découlent ». Lorsque des événements — ici la dégradation du contexte sécuritaire et économique — rendent les prévisions initiales irréalistes, maintenir le budget inchangé reviendrait à exécuter des prévisions insincères ; la LFR est l'instrument de leur mise à jour transparente. En bout de chaîne, la loi portant reddition des comptes constatera les résultats définitifs et approuvera les écarts entre résultats et prévisions « de ladite loi complétée, le cas échéant, par les lois de finances rectificatives » (art. 28).",
      },
    ],
  },
  {
    id: 'ch10-cp4',
    titre: 'La retenue de 40 % suspendue au motif du régime transitoire',
    contexte: "Le pouvoir central cesse pendant trois mois de créditer la quote-part de 40 % d'une province, au motif que « la LOFIP n'est pas encore intégralement en vigueur » du fait des prorogations du budget-programme.",
    questions: [
      {
        num: 1,
        enonce: "Le moratoire du budget-programme couvre-t-il la retenue de 40 % ?",
        correction: "Non. L'article 232 de la LOFIP répute « d'application immédiate » les articles 218 à 222 et 225 à 226 relatifs à la répartition des recettes aux provinces, aux ETD et à la Caisse nationale de péréquation. Les prorogations de 2018 et 2023 portent sur le délai d'application intégrale de l'article 234, « sans préjudice des dispositions de l'article 232 » : elles ne touchent pas aux dispositions d'application immédiate. La retenue de 40 % — fondée au surplus sur l'article 175 de la Constitution — est exigible depuis 2011 ; l'argument tiré du régime transitoire est inopérant.",
      },
      {
        num: 2,
        enonce: "La province peut-elle riposter en retenant ses propres versements au Trésor ?",
        correction: "Non. L'unité de trésorerie est elle aussi d'application immédiate (art. 232, visant les articles 110 et 209) : sauf disposition expresse d'une loi de finances, toutes les disponibilités sont déposées au compte général du Trésor. Une rétention unilatérale des recettes par la province violerait ces dispositions et exposerait ses auteurs au régime des sanctions (art. 213 à 216 pour le niveau provincial). Les voies régulières sont juridictionnelles et politiques : recours devant le Conseil d'État contre le refus des autorités centrales (art. 155 de la Constitution), saisine de la Cour constitutionnelle — notamment au titre des conflits entre l'État et les provinces (art. 161 al. 3) —, et interpellation du Gouvernement par la voie parlementaire (art. 138 de la Constitution ; art. 127 LOFIP).",
      },
      {
        num: 3,
        enonce: "La seule retenue licite sur la quote-part provinciale : laquelle et à quelles conditions ?",
        correction: "Celle de l'article 218 alinéa final de la LOFIP : l'allocation des recettes aux provinces tient compte du transfert effectif des compétences et responsabilités en matière de dépenses, et le pouvoir central « peut retenir de la quote-part provinciale le coût des compétences et responsabilités non transférées, dans les conditions définies par une loi de finances ». Deux conditions cumulatives : un motif unique (le coût des compétences non transférées) et un véhicule unique (une loi de finances). Une suspension par simple décision administrative, ou pour un autre motif (tensions de trésorerie), ne remplit ni l'une ni l'autre.",
      },
    ],
  },
  {
    id: 'ch10-cp5',
    titre: "Une exonération et une agence créées sans avis du ministre du Budget",
    contexte: "Un ministère sectoriel propose d'insérer dans le projet de loi de finances une exonération de TVA sur des équipements importés, sans aucune évaluation d'impact ; un autre crée par arrêté une nouvelle agence publique générant des charges de personnel et de fonctionnement, sans saisir le ministre du Budget.",
    questions: [
      {
        num: 1,
        enonce: "Ces deux initiatives respectent-elles la LOFIP ?",
        correction: "Non. L'article 107 soumet à l'avis préalable du ministre ayant le budget dans ses attributions — et, le cas échéant, du ministre des Finances — tout projet de loi, décision ou convention ayant une répercussion immédiate ou future sur les recettes ou les dépenses, ainsi que tout acte d'administration portant création d'emploi ou extension des cadres organiques. L'exonération ampute les recettes futures ; l'agence crée des emplois et des charges : les deux relèvent de l'article 107. S'y ajoute, pour l'exonération, l'exigence de légalité de l'article 9 : « il ne peut être établi d'exemption ou d'allégement fiscal qu'en vertu de la loi » (également art. 174 de la Constitution) — un arrêté ou une simple inscription non évaluée n'y suffit pas.",
      },
      {
        num: 2,
        enonce: "Quelle documentation la loi impose-t-elle pour les exonérations dans le projet de loi de finances ?",
        correction: "La rédaction 2023 de l'article 79 impose, parmi les onze documents joints au projet de loi de finances de l'année, un « rapport sur les dépenses fiscales » : les exonérations et allégements doivent y être recensés et chiffrés, ce qui donne au Parlement la mesure des recettes auxquelles l'État renonce. L'article 11 (sincérité) impose en outre que tout projet de loi, d'édit, de décision, d'ordonnance ou de règlement ayant une incidence financière soit accompagné d'une annexe précisant ses conséquences au titre du budget de l'année d'entrée en vigueur et de l'année suivante. Une mesure fiscale nouvelle non documentée fragilise la sincérité de l'ensemble du projet.",
      },
      {
        num: 3,
        enonce: "Quels leviers le ministre du Budget et les organes de contrôle peuvent-ils actionner contre l'agence créée sans avis ?",
        correction: "L'acte créant l'agence sans l'avis préalable requis viole l'article 107 : le ministre du Budget peut refuser d'inscrire les crédits correspondants au projet de loi de finances — sans crédits ouverts, les obligations financières de l'agence ne deviennent ni certaines ni définitives (art. 10) — et exiger la régularisation du dossier avec évaluation des charges. Un recours pour violation de la loi contre l'arrêté est ouvert devant le Conseil d'État (art. 155 de la Constitution). Enfin, ceux qui engageraient des dépenses pour l'agence sans crédits disponibles ou sans en avoir le pouvoir commettraient des fautes de gestion (art. 129), justiciables de la Cour des comptes (art. 131), l'IGF pouvant être saisie de toute enquête sur ces opérations (art. 121-122). Les circulaires budgétaires annuelles organisent en pratique la discipline de préparation (calendriers internes, conférences budgétaires et fiscales) : elles précisent la procédure, mais c'est bien la LOFIP qui fonde l'irrégularité.",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue5',
  numero: 10,
  id: 'ue5-chapitre-10',
  titre: 'Réformes et actualité des finances publiques',
  sousTitre: "Du budget de moyens au budget-programme : chantiers et chiffres 2025-2026",
  infoBulle: "Chapitre 10 du module Finances publiques : la trajectoire de la réforme — loi financière de 1983, LOFIP de 2011, prorogations de 2018 et 2023 —, le régime transitoire, le verrou budgétaire préventif et l'actualité des lois de finances 2025-2026.",
  loiRef: "LOFIP, art. 1-2, 8, 18, 22, 26-31, 43-44, 79, 82-84, 107, 230-235 · Lois n° 18/010 et n° 23/030 · LF n° 25/060",
  moduleLabel: 'UE 5 · Finances publiques',
  retourRoute: '/ue5-finances-publiques',
  coursId: 'ue5-finances-publiques',
  objectifs: [
    "Retracer la chronologie des réformes : loi financière de 1983, LOFIP de 2011, lois modificatives de 2018 et 2023.",
    "Maîtriser l'architecture du budget-programme : programmes, dotations, fonctions, AE/CP, documents de performance (art. 79 pt 6 et 82 pt 4).",
    "Distinguer les dispositions d'application immédiate (art. 232) du régime transitoire du basculement intégral (art. 230, 234).",
    "Expliquer le verrou budgétaire préventif de l'article 107 et le calendrier d'adoption de la loi de finances (art. 83 ; art. 126 de la Constitution).",
    "Situer et chiffrer l'actualité budgétaire : LFR 2025 (50 691,8 Mds FC), LF 2026 (54 335,8 Mds FC), déconcentration de l'ordonnancement.",
    "Porter un regard critique sur l'état d'avancement de la réforme et ses chantiers à l'échéance de la seconde prorogation.",
  ],
  sections: SECTIONS,
  aRetenir: [
    "La LOFIP (loi n° 11/011 du 13 juillet 2011), prise sur le fondement de l'article 122 point 3 de la Constitution, abroge la loi financière n° 83-003 de 1983 (art. 233) — abrogation différée à l'échéance prorogée d'application intégrale par les lois de 2018 et 2023.",
    "Échéance initiale d'application intégrale : 1er janvier 2019 (art. 234, réd. 2011) ; prorogée de cinq ans par la loi n° 18/010 (avec l'art. 230ter relançant la progressivité en 2018), puis de cinq ans encore par la loi n° 23/030, qui impose au ministre du Budget un rapport annuel de progression devant l'Assemblée nationale.",
    "Budget-programme : crédits spécialisés par titre, regroupés par programme ou par dotation (art. 8, réd. 2023) ; le programme associe objectifs, résultats attendus et indicateurs de performance, et seule une loi de finances d'initiative gouvernementale peut le créer ou le supprimer (art. 43) ; présentation par ministère et par programme en AE et CP (art. 22).",
    "Les projets annuels de performance accompagnent le projet de loi de finances (art. 79 pt 6, réd. 2023, parmi onze documents) ; le rapport annuel de performance accompagne la loi portant reddition des comptes (art. 82 pt 4).",
    "Sont d'application immédiate depuis 2011 (art. 232) : la répartition des recettes aux provinces, aux ETD et à la péréquation (art. 218-222, 225-226), la gestion de la trésorerie (art. 110, 209), les calendriers de dépôt (art. 83-84, 182-185) et les ressources et charges (art. 32-37, 74-75, 145-150).",
    "L'article 107 soumet à l'avis préalable du ministre du Budget tout projet ayant une répercussion sur les recettes ou les dépenses et tout acte créant des emplois ou étendant les cadres organiques ; l'article 9 réserve à la loi toute exemption ou allégement fiscal.",
    "Calendrier de la loi de finances : dépôt au 15 septembre, 40 jours à l'Assemblée nationale puis 20 jours au Sénat ; à défaut de vote avant l'exercice, ordonnance-loi présidentielle ; non-dépôt au 1er décembre : Gouvernement réputé démissionnaire (art. 83 LOFIP ; art. 126 Constitution).",
    "Chiffres vérifiés : LF 2025 : 51 553,5 Mds FC ; LFR 2025 (n° 25/044) : 50 691,8 Mds FC ; LF 2026 (n° 25/060) : 54 335,8 Mds FC en équilibre (art. 6), dont 48 969,3 Mds pour le budget général (art. 7), 7 694,5 Mds pour les provinces (art. 8) et 744,6 Mds pour la péréquation (art. 9) ; neuf ministères pilotes pour la déconcentration de l'ordonnancement (art. 5).",
  ],
  references: [
    { genre: 'texte', intitule: "Loi n° 11/011 du 13 juillet 2011 relative aux finances publiques, telle que modifiée par la loi n° 18/010 du 09 juillet 2018 et par la loi n° 23/030 du 28 juin 2023", precision: "art. 1-2, 8, 18, 22, 26-31, 43-44, 79, 82-84, 107, 230 à 235 ; art. 230ter et 234 issus des lois modificatives" },
    { genre: 'texte', intitule: "Constitution de la République Démocratique du Congo du 18 février 2006, telle que modifiée par la loi n° 11/002 du 20 janvier 2011", precision: "art. 122 pt 3 (domaine de la loi), 126 (procédure budgétaire), 174-175 (impôts et budget de l'État)" },
    { genre: 'texte', intitule: "Loi de finances n° 25/060 du 29 décembre 2025 pour l'exercice 2026", precision: "art. 5 à 9, 77, 84-85, annexe I et cadrage macroéconomique ; totaux LF 2025 et LFR 2025 (loi n° 25/044) tirés des tableaux comparatifs annexés" },
    { genre: 'texte', intitule: "Loi n° 08/012 du 31 juillet 2008 portant principes fondamentaux relatifs à la libre administration des provinces", precision: "art. 16, 54, 55 et 58, modifiés ou abrogés par l'art. 233 LOFIP" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "LOFIP (loi n° 11/011 du 13 juillet 2011), lois modificatives n° 18/010 (2018) et n° 23/030 (2023) ; Constitution de la RDC ; loi de finances n° 25/060 du 29 décembre 2025 pour 2026 et ses annexes.",
}

export default chapitre
