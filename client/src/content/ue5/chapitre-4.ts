// Chapitre 4 du module UE5, Finances publiques : contenu pur.
// Migré depuis l'ancienne page dédiée UE5Chapitre4Page.tsx vers le moteur
// commun components/chapitre/ChapitreManuscrit.tsx, avec vérification sur
// les textes : LOFIP n° 11/011 du 13 juillet 2011 (art. 3, 8, 13, 22,
// 36-53, 76-87 et 230-234) telle que modifiée par les lois n° 18/010 du
// 9 juillet 2018 et n° 23/030 du 28 juin 2023 ; Constitution (art. 138,
// 178-180) ; LF 2026 (n° 25/060, art. 5). Corrections majeures : le
// basculement au budget-programme n'était pas fixé par un « art. 215 »
// au « 1er janvier 2019 » - les dispositions transitoires sont les
// art. 230 et 234 (application progressive endéans SEPT ans, prorogée de
// cinq ans par la loi 18/010 puis de cinq ans par la loi 23/030, avec
// rapport annuel du Ministre du Budget à l'Assemblée nationale) ; le PAP
// relève de l'art. 79 pt 6 dans sa rédaction de 2023 (le texte de 2011 ne
// le mentionnait pas) et le RAP de l'art. 82 pt 4 (non de l'art. 79) ;
// l'art. 79 réd. 2023 liste onze documents, non cinq ; le cas pratique
// « fongibilité » utilisait une numérotation des titres erronée (« Titre I
// personnel, Titre II fonctionnement, Titre IV investissement ») - la
// nomenclature de l'art. 37 est rétablie (III personnel, IV biens et
// matériels, VIII construction) ; le « contrôle parlementaire des art.
// 52-54 » relève en réalité de l'art. 127 ; la LFR relève des art. 26-27 ;
// les reports de l'art. 53 se font par arrêtés conjoints du Ministre du
// Budget et du ministre intéressé au plus tard le 31 mars (non « avant le
// 31 décembre » par arrêté Budget/Finances). Les statistiques d'exécution
// ODEP/UNIS sont conservées mais signalées comme données externes non
// vérifiables dans les textes.
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch4-q1', question: 'Le budget-programme introduit par la LOFIP repose sur quelle logique centrale ?',
    options: [
      { id: 'a', texte: 'La maîtrise des moyens alloués' },
      { id: 'b', texte: 'La gestion par les objectifs et la performance' },
      { id: 'c', texte: 'La réduction des dépenses publiques' },
      { id: 'd', texte: 'Le contrôle a priori de toutes les dépenses' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 43 LOFIP',
    explication: "La rupture introduite par la LOFIP est le passage du budget de moyens (combien dépense-t-on ?) au budget-programme (quels résultats obtient-on ?). Les crédits sont regroupés en programmes auxquels sont associés « des objectifs précis, définis en fonction des finalités d'intérêt général, ainsi que des résultats attendus et faisant l'objet d'une évaluation au moyen d'indicateurs de performance » (art. 43).",
  },
  {
    id: 'ch4-q2', question: "Selon l'Art. 43 LOFIP, les résultats attendus d'un programme sont évalués :",
    options: [
      { id: 'a', texte: 'Par la Cour des comptes uniquement' },
      { id: 'b', texte: 'Par le Parlement lors du vote du budget' },
      { id: 'c', texte: "Au moyen d'indicateurs de performance" },
      { id: 'd', texte: 'Par le Ministre du Budget par inspection' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 43 LOFIP',
    explication: "L'Art. 43 dispose que les résultats attendus font « l'objet d'une évaluation au moyen d'indicateurs de performance ». La doctrine budgétaire distingue trois familles d'indicateurs : efficacité (objectifs atteints), efficience (rapport coût/résultat) et qualité de service. Ils sont annoncés dans le projet annuel de performance et confrontés aux réalisations dans le rapport annuel de performance.",
  },
  {
    id: 'ch4-q3', question: "Selon l'Art. 44 LOFIP, les programmes peuvent être regroupés en :",
    options: [
      { id: 'a', texte: 'Chapitres' },
      { id: 'b', texte: 'Fonctions' },
      { id: 'c', texte: 'Titres' },
      { id: 'd', texte: 'Sections' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 44 LOFIP (réd. loi n° 23/030)',
    explication: "L'Art. 44 : « Les programmes peuvent être regroupés en fonctions. Les fonctions peuvent être institutionnelles, ministérielles ou interministérielles. » Depuis la loi n° 23/030, les dotations peuvent l'être aussi. La présentation en fonction interministérielle entraîne une coordination de l'exécution et une présentation conjointe des résultats dans la loi portant reddition des comptes.",
  },
  {
    id: 'ch4-q4', question: 'Le projet annuel de performance (PAP) accompagne :',
    options: [
      { id: 'a', texte: 'La loi portant reddition des comptes' },
      { id: 'b', texte: 'La loi de finances rectificative' },
      { id: 'c', texte: "Le projet de loi de finances de l'année" },
      { id: 'd', texte: "L'arrêté de mise à disposition des crédits" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 79 pt. 6 LOFIP (réd. loi n° 23/030) · Art. 82 pt. 4',
    explication: "Depuis la loi n° 23/030 du 28 juin 2023, les « projets annuels de performance » figurent parmi les onze documents accompagnant le projet de loi de finances de l'année (art. 79 pt. 6). Leur pendant, le « rapport annuel de performance par programme rendant compte de leur gestion et de leurs résultats », accompagne le projet de loi portant reddition des comptes (art. 82 pt. 4) - il figurait déjà dans le texte de 2011.",
  },
  {
    id: 'ch4-q5', question: "Quel délai initial la LOFIP de 2011 fixait-elle pour sa mise en application intégrale ?",
    options: [
      { id: 'a', texte: 'Trois ans' },
      { id: 'b', texte: 'Cinq ans' },
      { id: 'c', texte: 'Sept ans' },
      { id: 'd', texte: 'Dix ans' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 230 et 234 LOFIP · lois n° 18/010 et 23/030',
    explication: "Les dispositions transitoires de la LOFIP (art. 230) prévoyaient une mise en application progressive de ses innovations endéans une période de sept ans à dater de sa promulgation (13 juillet 2011). Ce délai s'étant révélé insuffisant, l'art. 234 a été modifié deux fois : la loi n° 18/010 du 9 juillet 2018 a prorogé le délai de cinq ans, puis la loi n° 23/030 du 28 juin 2023 de cinq ans encore - portant l'échéance théorique d'application intégrale aux alentours de 2028.",
  },
  {
    id: 'ch4-q6', question: "L'Art. 45 LOFIP dispose que les crédits ouverts au sein d'un programme sont fongibles :",
    options: [
      { id: 'a', texte: 'Entre tous les programmes du même ministère sans restriction' },
      { id: 'b', texte: "À l'intérieur du titre et de la source de financement" },
      { id: 'c', texte: 'Entre tous les titres du programme sauf le titre du personnel' },
      { id: 'd', texte: 'Uniquement entre les titres IV, V et VI' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 45 LOFIP',
    explication: "L'Art. 45 : « Les crédits ouverts au sein d'un programme sont fongibles à l'intérieur du titre et de la source de financement. Toutefois, les mouvements y relatifs font l'objet d'un suivi conformément aux procédures fixées par le ministre ayant le budget dans ses attributions. » Franchir la barrière d'un titre exige un virement (art. 47) ; franchir celle d'un programme, un transfert (art. 48-49).",
  },
  {
    id: 'ch4-q7', question: "Selon l'Art. 47 LOFIP, un virement de crédits entre titres d'un même programme est autorisé par :",
    options: [
      { id: 'a', texte: 'Décret du Premier ministre' },
      { id: 'b', texte: 'Ordonnance du Président de la République' },
      { id: 'c', texte: 'Arrêté du ministre ayant le budget dans ses attributions' },
      { id: 'd', texte: 'Résolution du Parlement' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 47 LOFIP',
    explication: "L'Art. 47 : les virements entre titres des dépenses, par source de financement d'un même programme, sont opérés « par voie d'arrêté du ministre ayant le budget dans ses attributions sur proposition du ministre ou responsable d'institution concerné » - sans préjudice de l'art. 51 (jamais au profit du titre du personnel). Les transferts entre programmes exigent, eux, un décret du Premier ministre (art. 48-49).",
  },
  {
    id: 'ch4-q8', question: "Selon l'Art. 50 LOFIP, aucun virement ni transfert ne peut être effectué :",
    options: [
      { id: 'a', texte: 'Entre le titre I (dette) et le titre II (frais financiers)' },
      { id: 'b', texte: "Au profit d'un programme non prévu par une loi de finances" },
      { id: 'c', texte: 'Au cours du second semestre de l\'exercice' },
      { id: 'd', texte: 'Sans avis de la Cour des comptes' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 50 LOFIP',
    explication: "L'Art. 50 : « Aucun virement ni transfert ne peut être effectué au profit d'un programme non prévu par une loi de finances. » Impossible, donc, de créer un programme de facto par mouvement de crédits : la création et la suppression d'un programme relèvent exclusivement d'une disposition de loi de finances d'initiative gouvernementale (art. 43).",
  },
  {
    id: 'ch4-q9', question: "Selon l'Art. 53 LOFIP, les crédits de paiement non consommés en fin d'exercice sur un programme sont :",
    options: [
      { id: 'a', texte: 'Automatiquement annulés' },
      { id: 'b', texte: 'Reversés au budget général' },
      { id: 'c', texte: "Reportés sur l'exercice suivant, sur le même programme et le même titre" },
      { id: 'd', texte: 'Transférés au fonds de réserve' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 53 LOFIP',
    explication: "L'Art. 53 : les autorisations d'engagement pluriannuelles et les crédits de paiement non consommés « sont reportés sur l'exercice suivant sur le même programme et le même titre » - ou, dans des cas exceptionnels dûment justifiés, sur le même titre d'un programme poursuivant les mêmes objectifs. Les arrêtés de report, pris conjointement par le Ministre du Budget et le ministre ou responsable de l'institution intéressé, interviennent au plus tard le 31 mars de l'année suivante.",
  },
  {
    id: 'ch4-q10', question: "Selon l'Art. 44 LOFIP, la présentation des programmes sous forme d'une fonction interministérielle entraîne :",
    options: [
      { id: 'a', texte: 'La fusion des budgets des ministères concernés' },
      { id: 'b', texte: "Une coordination dans l'exécution et une présentation conjointe des résultats dans la loi portant reddition des comptes" },
      { id: 'c', texte: 'La suppression des programmes ministériels individuels' },
      { id: 'd', texte: "Le transfert de l'autorité budgétaire au Premier ministre" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 44 LOFIP',
    explication: "L'Art. 44 : la présentation en fonction interministérielle « entraîne une coordination dans l'exécution des programmes et une présentation conjointe de l'exécution et des résultats dans la loi portant reddition des comptes du budget du pouvoir central ». Chaque ministère conserve ses programmes et ses crédits ; c'est la lecture de la politique publique qui devient transversale.",
  },
  {
    id: 'ch4-q11', question: "Un ministre souhaite renforcer le titre des dépenses de personnel de son programme en puisant dans les crédits de biens et matériels. Est-ce légal ?",
    options: [
      { id: 'a', texte: 'Oui, la fongibilité (art. 45) le permet' },
      { id: 'b', texte: 'Oui, avec un arrêté du Ministre du Budget (art. 47)' },
      { id: 'c', texte: "Non : l'art. 51 interdit tout virement ou transfert au profit du titre des dépenses de personnel" },
      { id: 'd', texte: "Oui, si le Premier ministre l'autorise par décret" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 51 LOFIP',
    explication: "L'Art. 51 : « Aucun virement ni transfert ne peut être effectué au profit du titre des dépenses de personnel à partir d'un autre titre. » L'interdiction vaut quel que soit le niveau d'autorité. Les crédits de personnel sont des plafonds, assortis de plafonds d'autorisation d'emplois, et les créations d'emplois relèvent d'une loi de finances. L'inverse - du personnel vers les autres natures - est permis : c'est la fongibilité asymétrique (art. 3 pt. 28).",
  },
  {
    id: 'ch4-q12', question: "Un directeur propose de créer un programme « Numérique » par un simple arrêté de virement depuis un programme existant. Cette procédure est :",
    options: [
      { id: 'a', texte: 'Légale si les crédits existent et que le Ministre du Budget signe' },
      { id: 'b', texte: 'Légale par décret du Premier ministre en Conseil des ministres' },
      { id: 'c', texte: "Illégale : l'art. 43 exige une loi de finances d'initiative gouvernementale et l'art. 50 interdit tout mouvement vers un programme non prévu par une loi de finances" },
      { id: 'd', texte: 'Légale si le programme figure au projet annuel de performance' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 43 et 50 LOFIP',
    explication: "Double verrou : « Seule une disposition de loi de finances d'initiative gouvernementale peut créer ou supprimer un programme » (art. 43) et « aucun virement ni transfert ne peut être effectué au profit d'un programme non prévu par une loi de finances » (art. 50). La voie légale : inscrire le programme au projet de loi de finances, avec ses objectifs et indicateurs, et le faire voter.",
  },
  {
    id: 'ch4-q13', question: "Selon l'Art. 52 LOFIP, les autorisations d'engagement pluriannuelles d'investissement peuvent être révisées pour tenir compte :",
    options: [
      { id: 'a', texte: 'Des nouvelles priorités politiques du Gouvernement' },
      { id: 'b', texte: 'Des modifications techniques ou des variations de coûts' },
      { id: 'c', texte: "Du taux d'inflation annuel officiel" },
      { id: 'd', texte: 'Des recommandations de la Cour des comptes' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 52 LOFIP',
    explication: "L'Art. 52 : « Les autorisations d'engagement pluriannuelles relatives aux crédits d'investissement peuvent être révisées pour tenir compte des modifications techniques ou des variations de coûts. » Les révisions s'imputent en priorité sur les AE ouvertes et non utilisées ou, à défaut, sur les nouvelles AE ouvertes en loi de finances ou en LFR.",
  },
  {
    id: 'ch4-q14', question: "Selon l'Art. 54 LOFIP, les affectations de recettes à des dépenses ne peuvent prendre que trois formes. Lesquelles ?",
    options: [
      { id: 'a', texte: 'Fonds fiduciaires, régies et caisses autonomes' },
      { id: 'b', texte: 'Budgets annexes, comptes spéciaux et procédures comptables particulières au sein du budget général' },
      { id: 'c', texte: 'Subventions, dotations et transferts' },
      { id: 'd', texte: 'Taxes affectées, redevances et parafiscalité' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 54 LOFIP',
    explication: "L'Art. 54 : aucune recette ne peut être affectée à une dépense particulière ; « toutefois, la loi de finances peut prévoir expressément l'affectation de certaines recettes à certaines dépenses. Ces affectations prennent la forme de budgets annexes, de comptes spéciaux ou de procédures comptables particulières au sein du budget général du pouvoir central. » Trois formes, toutes sous monopole de la loi de finances.",
  },
  {
    id: 'ch4-q15', question: "Dans l'architecture du budget-programme, quel niveau détient les crédits budgétaires ?",
    options: [
      { id: 'a', texte: "L'action (composante du programme)" },
      { id: 'b', texte: 'La fonction (regroupement analytique)' },
      { id: 'c', texte: 'Le programme (art. 43) - ou la dotation pour les institutions' },
      { id: 'd', texte: "L'indicateur de performance" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 3, 42-45 LOFIP',
    explication: "Les crédits sont inscrits dans des programmes attribués aux ministères et institutions (art. 42) - et, depuis la loi n° 23/030, dans des dotations pour les institutions non soumises à la performance. L'action « précise la destination de la dépense » au sein du programme (art. 3 pt. 1) mais n'a pas de crédits propres ; la fonction est un regroupement analytique (art. 44). Le montant des crédits du programme est limitatif (art. 3 pt. 38).",
  },
  {
    id: 'ch4-q16', question: "Le programme « administration générale » prévu à l'Art. 43 LOFIP est destiné à recevoir :",
    options: [
      { id: 'a', texte: 'Les crédits de fonctionnement courant du ministère' },
      { id: 'b', texte: 'Les crédits non spécifiquement affectés à un autre programme' },
      { id: 'c', texte: 'Les crédits de personnel uniquement' },
      { id: 'd', texte: "Les crédits d'investissement non programmés" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 43 LOFIP',
    explication: "L'Art. 43 : « Chaque ministère ou Institution peut créer un programme intitulé « administration générale » destinée à recevoir les crédits non spécifiquement affectés à un autre programme. » Ce programme d'accueil évite que des crédits restent sans rattachement programmatique.",
  },
  {
    id: 'ch4-q17', question: "Combien de documents accompagnent le projet de loi de finances de l'année selon l'art. 79 LOFIP dans sa rédaction de 2023 ?",
    options: [
      { id: 'a', texte: 'Cinq' },
      { id: 'b', texte: 'Sept' },
      { id: 'c', texte: 'Onze' },
      { id: 'd', texte: 'Trois' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 79 LOFIP (réd. loi n° 23/030)',
    explication: "La loi n° 23/030 a porté la liste de cinq à onze documents : exposé général ; rapport d'évaluation de l'exécution du budget précédent ; rapport d'exécution du budget en cours au premier semestre ; projet de loi de reddition des comptes du dernier exercice clos (si non déposé) ; annexe explicative ; projets annuels de performance ; plan de trésorerie prévisionnel ; programme d'investissements publics ; rapport sur les dépenses fiscales ; rapport consolidé de la situation financière des entreprises et établissements publics ; déclaration sur les risques budgétaires.",
  },
  {
    id: 'ch4-q18', question: "Depuis la loi n° 23/030, quel mécanisme de suivi politique de la réforme du budget-programme l'art. 234 LOFIP prévoit-il ?",
    options: [
      { id: 'a', texte: 'Un audit annuel de la Cour des comptes' },
      { id: 'b', texte: "Un rapport annuel du Ministre du Budget à l'Assemblée nationale, présenté au cours de la session budgétaire" },
      { id: 'c', texte: 'Un référendum quinquennal' },
      { id: 'd', texte: 'Une certification du FMI' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 234 LOFIP (réd. loi n° 23/030)',
    explication: "L'art. 234 réécrit en 2023 proroge le délai d'application intégrale de cinq ans et ajoute : « Chaque année, un rapport décrivant les progrès vers la mise en œuvre effective de la réforme du budget-programme est présenté à l'Assemblée nationale, au cours de la session budgétaire, par le Ministre ayant le Budget dans ses attributions. » C'est un mécanisme de reddition politique propre à la réforme, distinct du rapport d'évaluation budgétaire de l'art. 79.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '4.1',
    titre: 'Du budget de moyens au budget-programme',
    navLabel: 'La réforme',
    blocs: [
      { type: 'paragraphe', texte: "Avant la LOFIP, le budget congolais était un **budget de moyens** : chaque ministère recevait des dotations par nature de dépense, sans avoir à justifier des résultats obtenus. Deux défauts majeurs : aucun lien entre crédits et résultats, et aucun instrument pour évaluer l'efficacité de la dépense. La LOFIP de 2011 consacre à la place une **gestion budgétaire axée sur les résultats** : les crédits sont regroupés par *programmes* porteurs d'objectifs mesurables - l'exposé des motifs de la loi n° 23/030 de 2023 parle du « budget-programme, mode de gestion par lequel l'allocation des crédits budgétaires est opérée au profit d'actions à mener dans le cadre des politiques »." },
      { type: 'carte', titre: 'Budget de moyens et budget-programme comparés', tableau: {
        entetes: ['Critère', 'Budget de moyens (ancien)', 'Budget-programme (LOFIP)'],
        lignes: [
          ['Présentation', 'Par lignes de crédit et nature de dépense', 'Par programmes, avec objectifs et indicateurs'],
          ['Question centrale', '*Combien dépense-t-on ?*', '*Quels résultats obtient-on ?*'],
          ['Responsabilité', 'Comptable : respecter la dotation', 'Managériale : atteindre les objectifs'],
          ['Souplesse', 'Rigidité de la ligne', 'Fongibilité au sein du titre (art. 45)'],
          ['Contrôle du Parlement', 'Sur les moyens votés', 'Sur les résultats : PAP au vote, RAP à la reddition'],
        ],
      } },
      { type: 'paragraphe', texte: "La présentation par programme n'abolit pas la nomenclature : les crédits restent spécialisés par titre et par source de financement (art. 8), mais « dans le cadre d'un budget programme, la présentation des crédits par subdivision de la nomenclature budgétaire, chapitre, article et littera est indicative » (art. 8 in fine). Et depuis la loi n° 23/030, le système est double : les ministères gèrent des **programmes** soumis à la performance, les institutions de la République reçoivent des **dotations** - « crédits budgétaires alloués aux institutions de la République dont la gestion budgétaire n'est pas soumise à la règle de la performance » (art. 3 pt. 20), sans objectifs ni indicateurs, mais sans échapper à la comptabilité publique ni au contrôle." },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
    ],
  },
  {
    numero: '4.2',
    titre: "L'architecture : fonction, programme, action, dotation",
    navLabel: 'Architecture',
    blocs: [
      { type: 'filet', titre: 'Art. 43 LOFIP - texte exact', texte: "« Un programme regroupe les crédits destinés à mettre en œuvre une action ou un ensemble cohérent d'actions relevant d'un même ministère ou institution et auquel sont associés des objectifs précis, définis en fonction des finalités d'intérêt général, ainsi que des résultats attendus et faisant l'objet d'une évaluation au moyen d'indicateurs de performance. Chaque ministère ou Institution peut créer un programme intitulé « administration générale » destinée à recevoir les crédits non spécifiquement affectés à un autre programme. Seule une disposition de loi de finances d'initiative gouvernementale peut créer ou supprimer un programme. »" },
      { type: 'carte', titre: 'Les quatre étages de l\'architecture', tableau: {
        entetes: ['Niveau', 'Base', 'Rôle'],
        lignes: [
          ['**Fonction**', 'Art. 44 · art. 3 pt. 26', "Regroupement de programmes (et, depuis 2023, de dotations) concourant à une même politique publique ; institutionnelle, ministérielle ou interministérielle - l'interministérialité impose coordination et présentation conjointe des résultats à la reddition des comptes"],
          ['**Programme**', 'Art. 43 · art. 3 pt. 38', "Unité de gestion des crédits : rattaché à un seul ministère ou institution, crédits limitatifs, objectifs et indicateurs de performance ; création et suppression par loi de finances uniquement"],
          ['**Dotation**', 'Art. 3 pt. 20 (réd. 2023)', "Crédits des institutions de la République non soumis à la performance, de nature globalisée ou spécifique ; soumis à la comptabilité publique et au contrôle"],
          ['**Action**', 'Art. 3 pt. 1', "« Composante d'un programme créée pour la prestation de services et d'activités subordonnés. Elle précise la destination de la dépense » - pas de crédits propres : la mise à disposition des crédits est détaillée par titre et source correspondant aux dotations ouvertes pour chaque action (art. 88)"],
        ],
      } },
      { type: 'carte', titre: 'Exemple : un ministère de la santé structuré en programmes', liste: [
        "**Programme 1 - Soins de santé primaires** : actions « vaccination », « santé maternelle et infantile », « lutte contre le paludisme » ; objectif : couverture vaccinale, avec indicateur chiffré et cible annuelle.",
        "**Programme 2 - Hôpitaux généraux de référence** : actions « équipements hospitaliers », « formation du personnel soignant ».",
        "**Programme 3 - Administration générale** : crédits non affectés aux autres programmes (art. 43).",
        "Une **fonction « santé »** peut regrouper ces programmes et, si d'autres ministères y concourent, devenir interministérielle (art. 44).",
      ], note: "Exemple pédagogique. Dans les documents réels, l'annexe XXI de la LF 2026 présente pour la première fois les crédits de chaque section budgétaire par programme et par action." },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[14] },
    ],
  },
  {
    numero: '4.3',
    titre: 'La gestion des crédits du programme : fongibilité et mouvements',
    navLabel: 'Fongibilité · mouvements',
    blocs: [
      { type: 'paragraphe', texte: "Le gestionnaire de programme dispose d'une liberté graduée, étudiée en détail au chapitre 2 et rappelée ici du point de vue du pilotage. Premier degré, la **fongibilité** : « les crédits ouverts au sein d'un programme sont fongibles à l'intérieur du titre et de la source de financement », sous le suivi du Ministre du Budget (art. 45) - le gestionnaire réalloue librement entre actions et lignes d'un même titre. Deuxième degré, le **virement** entre titres d'un même programme : arrêté du Ministre du Budget sur proposition du ministre concerné (art. 47). Troisième degré, le **transfert** entre programmes : d'un même ministère ou entre dotations (art. 48, plafond annuel par décret du Premier ministre) ou de ministères différents (art. 49, décret du Premier ministre après avis du Ministre du Budget), avec ratification des ouvertures de crédits en LFR." },
      { type: 'carte', titre: 'Les verrous', liste: [
        "**Art. 50** : aucun virement ni transfert au profit d'un programme non prévu par une loi de finances - on ne crée pas un programme par mouvement de crédits.",
        "**Art. 51** : aucun virement ni transfert au profit du titre des dépenses de personnel ; les crédits de personnel sont des plafonds assortis de plafonds d'autorisation d'emplois spécialisés par ministère, institution et budget annexe, et les créations d'emplois relèvent d'une loi de finances.",
        "**Art. 3 pt. 28** : la fongibilité est asymétrique - les crédits du personnel peuvent être utilisés pour le fonctionnement, l'intervention et l'investissement, « tandis que l'inverse est interdit ».",
        "**Art. 58-59** : aucun mouvement entre un budget annexe ou un compte spécial et le budget général.",
      ] },
      { type: 'filet', titre: "L'investissement pluriannuel : AE, révisions et reports", texte: "Les autorisations d'engagement pluriannuelles permettent d'engager des marchés dont l'exécution s'étale sur plusieurs exercices (art. 3 pt. 2, 22, 42). Elles peuvent être révisées « pour tenir compte des modifications techniques ou des variations de coûts », en priorité sur les AE ouvertes et non utilisées (art. 52). Les AE pluriannuelles et les crédits de paiement non consommés sont reportés sur le même programme et le même titre par arrêtés conjoints du Ministre du Budget et du ministre intéressé, pris au plus tard le 31 mars de l'année suivante (art. 53). C'est l'outillage qui permet au budget-programme d'épouser le temps long des infrastructures sans briser l'annualité." },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[8] },
    ],
  },
  {
    numero: '4.4',
    titre: 'Les instruments de la performance : PAP, RAP et documents budgétaires',
    navLabel: 'PAP · RAP',
    blocs: [
      { type: 'paragraphe', texte: "La performance se joue dans deux documents symétriques. Le **projet annuel de performance (PAP)** accompagne le projet de loi de finances de l'année : introduit dans la liste de l'art. 79 par la loi n° 23/030 (point 6), il expose, programme par programme, la stratégie, les objectifs, les indicateurs chiffrés et les cibles - c'est l'engagement du responsable de programme devant le Parlement. Le **rapport annuel de performance (RAP)** accompagne le projet de loi portant reddition des comptes : l'art. 82 point 4 exige « le rapport annuel de performance par programme rendant compte de leur gestion et de leurs résultats » - c'est la reddition de comptes, où les réalisations sont confrontées aux cibles du PAP." },
      { type: 'carte', titre: 'PAP et RAP comparés', tableau: {
        entetes: ['Critère', 'PAP', 'RAP'],
        lignes: [
          ['Nature', 'Prévisionnel : cibles et moyens', 'Constaté : réalisations et écarts'],
          ['Joint à', "Projet de loi de finances de l'année (art. 79 pt. 6, réd. 2023)", 'Projet de loi portant reddition des comptes (art. 82 pt. 4)'],
          ['Moment', "Dépôt du PLF, au plus tard le 15 septembre (art. 83)", "Dépôt au plus tard le 15 mai de l'année suivante (art. 84)"],
          ['Portée', 'Engagement du responsable de programme', "Reddition de comptes - l'approbation de la loi vaut quitus du Gouvernement (art. 87)"],
        ],
      } },
      { type: 'carte', titre: "Les onze documents accompagnant le PLF (art. 79, réd. loi n° 23/030)", liste: [
        "1. L'exposé général (synthèse du budget, politique économique et financière, environnement, CBMT, exécution en cours).",
        "2. Le rapport d'évaluation de l'exécution du budget de l'année précédente.",
        '3. Le rapport d\'exécution du budget en cours au premier semestre.',
        '4. Le projet de loi portant reddition des comptes du dernier exercice clos, s\'il n\'a pas encore été déposé.',
        "5. L'annexe explicative (prévisions de recettes par nature, crédits par titre, reports, encours et échéances de la dette, restes à payer, restes à recouvrer).",
        '6. Les **projets annuels de performance**.',
        '7. Le **plan de trésorerie prévisionnel**.',
        "8. Le **programme d'investissements publics**.",
        '9. Le **rapport sur les dépenses fiscales**.',
        '10. Le **rapport consolidé de la situation financière des entreprises publiques et des établissements publics**.',
        '11. La **déclaration sur les risques budgétaires**.',
      ], note: 'Les points 6 à 11 sont les apports de la loi n° 23/030 : la version de 2011 s\'arrêtait aux cinq premiers. En amont du dépôt, le CBMT est transmis à l\'Assemblée nationale au plus tard le 1er juin pour le débat d\'orientation budgétaire (art. 13, réd. 2023).' },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[16] },
    ],
  },
  {
    numero: '4.5',
    titre: 'La réforme en marche : délais, acquis et défis',
    navLabel: 'État de la réforme',
    blocs: [
      { type: 'paragraphe', texte: "Le basculement intégral au budget-programme est une trajectoire, pas un événement. Les dispositions transitoires de la LOFIP (art. 230) prévoyaient une application progressive de ses innovations « endéans une période de sept ans » à dater de sa promulgation du 13 juillet 2011. Le délai s'est révélé insuffisant : la loi n° 18/010 du 9 juillet 2018 a prorogé de **cinq ans** le délai d'application intégrale et fait repartir la progressivité de sa propre promulgation (art. 230ter) ; la loi n° 23/030 du 28 juin 2023 a prorogé de **cinq ans encore** (art. 234), portant l'échéance théorique aux alentours de 2028 - et ajouté une obligation nouvelle : chaque année, le Ministre du Budget présente à l'Assemblée nationale, au cours de la session budgétaire, un rapport décrivant les progrès de la réforme." },
      { type: 'carte', titre: 'Les acquis (exposé des motifs de la loi n° 23/030 et textes récents)', liste: [
        "**Découpage des ministères en programmes budgétaires** : accompli selon l'exposé des motifs de 2023 ; l'annexe XXI de la LF 2026 présente pour la première fois les crédits par section, programme et action.",
        "**Instruments d'évaluation de la performance** et cadre juridique du budget-programme mis en place ; les PAP accompagnent désormais le PLF (art. 79 pt. 6).",
        "**Déconcentration de l'ordonnancement** : l'art. 5 de la LF 2026 (n° 25/060) accélère la déconcentration prévue à l'art. 103 LOFIP, avec neuf ministères sectoriels pilotes dès 2026 (Finances, Santé publique, Éducation, Développement rural, Infrastructures et Travaux publics, Agriculture, Défense nationale, Pêche et élevage, Enseignement supérieur et universitaire).",
        "**Dotations des institutions** : la loi n° 23/030 a clarifié le régime des crédits des institutions de la République, non soumis à la performance.",
      ] },
      { type: 'filet', titre: 'Les défis - données externes à manier avec prudence', texte: "L'exposé des motifs de 2023 reconnaît que la migration reste tributaire de réformes transversales : comptabilité publique, rationalisation des cadres organiques, déconcentration de l'ordonnancement, système d'information des finances publiques. Des observateurs de la société civile - dont l'Observatoire de la Dépense Publique (ODEP), qui rapportait pour le premier trimestre 2025 un taux d'exécution global de 17,1% et d'environ 4% pour les investissements - pointent la persistance d'une culture de moyens : ces chiffres, extérieurs aux textes officiels, illustrent l'écart entre la lettre de la réforme et sa pratique. La logique de performance ne produira ses effets que si l'exécution suit l'autorisation." },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[17] },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[13] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: "Construire le PAP du Ministère de l'Éducation nationale",
    contexte: "Le secrétaire général du Ministère de l'Éducation nationale prépare le projet annuel de performance de l'exercice à venir. Le ministère gère trois programmes : « Enseignement primaire » (crédits : 18 500 000 000 FC ; 45 000 enseignants ; taux de scolarisation brut constaté : 78% ; taux d'accès en 6e année : 62%) ; « Enseignement secondaire » (12 300 000 000 FC) ; « Administration générale » (2 200 000 000 FC de crédits non affectés aux deux premiers).",
    questions: [
      { num: 1, enonce: "Pour le programme « Enseignement primaire », proposez deux objectifs de performance - un d'efficacité, un de qualité - avec indicateurs et cibles, conformément à l'art. 43 LOFIP.", correction: "L'art. 43 exige des « objectifs précis, définis en fonction des finalités d'intérêt général » et des résultats attendus « faisant l'objet d'une évaluation au moyen d'indicateurs de performance ». Objectif 1 (efficacité) - accroître l'accès et la rétention au primaire : indicateur 1.1, taux de scolarisation brut (référence 78%, cible 83%) ; indicateur 1.2, taux d'achèvement du cycle mesuré par l'accès en 6e année (référence 62%, cible 68%). Objectif 2 (qualité de service) - améliorer les apprentissages : indicateur 2.1, proportion d'élèves maîtrisant les compétences de base en lecture (à établir par une évaluation nationale, la première cible étant la constitution d'une valeur de référence) ; indicateur 2.2, ratio élèves/enseignant qualifié, avec cible de réduction adossée à un plan de recrutement - en rappelant que les créations d'emplois et leurs plafonds relèvent d'une loi de finances (art. 22 et 51). Bonnes pratiques : peu d'objectifs par programme, indicateurs mesurables, renseignés sur plusieurs exercices pour permettre la comparaison PAP/RAP - le RAP de l'art. 82 pt. 4 rendra compte, programme par programme, de la gestion et des résultats." },
      { num: 2, enonce: "Le ministre veut utiliser 800 000 000 FC de crédits de personnel non consommés (titre III) du programme « Enseignement primaire » pour acheter des manuels scolaires (titre IV, même programme). Légal ? Quelle procédure ?", correction: "Légal, dans ce sens-là. L'art. 51 interdit les mouvements AU PROFIT du titre des dépenses de personnel - il ne dit rien du mouvement inverse, que la définition de la fongibilité asymétrique autorise expressément : les crédits du personnel « peuvent être utilisés pour d'autres natures de dépenses [...] tandis que l'inverse est interdit » (art. 3 pt. 28). Qualification : le mouvement franchit la barrière d'un titre (III vers IV) au sein d'un même programme - ce n'est donc pas la fongibilité de plein droit de l'art. 45, qui joue à l'intérieur du titre et de la source de financement, mais un virement de l'art. 47. Procédure : proposition du Ministre de l'Éducation, arrêté du Ministre ayant le budget dans ses attributions, suivi du mouvement selon les procédures fixées par ce dernier (art. 45 in fine). Limites : rester dans les crédits disponibles du titre III et ne viser que des dépenses relevant bien du titre IV de l'art. 37 (biens et matériels - les manuels s'y rattachent)." },
    ],
  },
  {
    id: 'cp2',
    titre: "Lire un RAP : le programme « Sécurité alimentaire »",
    contexte: "Le PAP du programme « Sécurité alimentaire » du Ministère de l'Agriculture annonçait : surface cultivée cible 9,5 millions d'hectares ; rendement moyen du maïs cible 1,8 T/ha ; 250 000 agriculteurs subventionnés ; taux de couverture en semences certifiées 35%. Crédits : 6 800 000 000 FC, dont 4 500 000 000 au titre VI (transferts et interventions - subventions aux intrants). Le RAP constate : surface cultivée 8,1 millions ha ; rendement 1,4 T/ha ; 85 000 agriculteurs subventionnés ; couverture semences 18% ; exécution globale des crédits 52%, dont 38% seulement pour le titre VI.",
    questions: [
      { num: 1, enonce: 'Calculez le taux de réalisation de chaque indicateur et diagnostiquez la performance du programme.', correction: "Surface cultivée : 8,1/9,5 = 85,3% de la cible. Rendement maïs : 1,4/1,8 = 77,8%. Agriculteurs subventionnés : 85 000/250 000 = 34,0%. Couverture en semences : 18/35 = 51,4%. Le programme sous-performe surtout sur l'accès aux intrants, et le RAP en livre la cause probable : le titre VI - qui porte les subventions aux intrants selon la nomenclature de l'art. 37 (transferts et interventions) - n'est exécuté qu'à 38%. Les subventions votées ne sont pas parvenues aux bénéficiaires : problème de trésorerie, de passation des marchés ou de distribution, à documenter. C'est exactement la fonction du rapport annuel de performance de l'art. 82 pt. 4 : « rendre compte de leur gestion et de leurs résultats », programme par programme, pour que le Parlement - qui examine la reddition des comptes avant de voter la loi de finances suivante (art. 87) - vote le budget suivant en connaissance de cause. Le responsable devra expliquer les écarts et proposer les mesures correctrices du prochain PAP." },
      { num: 2, enonce: "Le responsable propose de créer, pour l'exercice suivant, un programme « Irrigation agricole » en prélevant 2 000 000 000 FC sur le programme « Sécurité alimentaire » par simple transfert. Légal ?", correction: "Non, doublement. (1) « Seule une disposition de loi de finances d'initiative gouvernementale peut créer ou supprimer un programme » (art. 43) : ni une proposition administrative, ni un arrêté, ni même un décret ne peuvent créer le programme. (2) « Aucun virement ni transfert ne peut être effectué au profit d'un programme non prévu par une loi de finances » (art. 50) : le prélèvement de 2 milliards vers un programme inexistant est prohibé par construction. La voie légale : le Gouvernement inscrit le programme « Irrigation agricole » au projet de loi de finances, avec son PAP (objectifs, indicateurs, crédits par titre et source - art. 79 pt. 6), et le Parlement le vote (les dépenses sont votées par ministère et par programme, art. 85). Une fois le programme créé, les transferts depuis d'autres programmes deviennent possibles dans les formes de l'art. 48 (même ministère : décret du Premier ministre, plafond annuel, ratification en LFR)." },
    ],
  },
  {
    id: 'cp3',
    titre: 'Urgence et fongibilité : le programme « Enseignement primaire » face aux inondations',
    contexte: "Le gestionnaire du programme « Enseignement primaire » dispose des crédits suivants (données simplifiées) : titre III (dépenses de personnel) 18 000 milliards FC, consommé à 85% au 30 septembre ; titre IV (biens et matériels) 3 200 milliards FC, consommé à 97% ; titre VIII (construction et réhabilitation - salles de classe) 5 500 milliards FC, consommé à 12%. Des inondations imposent la réhabilitation urgente de 150 écoles. Trois options sont envisagées : (A) prélever 800 milliards sur le titre III (postes vacants) pour abonder le titre IV ; (B) prélever 800 milliards sur le titre VIII pour abonder le titre IV ; (C) financer directement les travaux urgents sur les crédits restants du titre VIII.",
    questions: [
      { num: 1, enonce: 'Analysez la légalité des trois options au regard des art. 37, 45, 47 et 51 LOFIP.', correction: "Option A - possible : le mouvement va du titre des dépenses de personnel vers un autre titre, direction que la fongibilité asymétrique autorise (art. 3 pt. 28) et que l'art. 51 ne prohibe pas (il n'interdit que le sens inverse). Le franchissement de titre au sein du programme est un virement de l'art. 47 : arrêté du Ministre du Budget sur proposition du ministre concerné. Option B - possible dans son principe mais pas de la main du gestionnaire : c'est également un virement entre titres du même programme (VIII vers IV), soumis au même arrêté ministériel ; la fongibilité de plein droit de l'art. 45 ne joue qu'à l'intérieur d'un titre et d'une source de financement, jamais entre titres. L'opportunité est en outre discutable : dépouiller la construction pour du fonctionnement contredit l'objet du programme. Option C - la plus directe : la réhabilitation de salles de classe relève précisément du titre VIII de l'art. 37 (« construction, réfection, réhabilitation, addition d'ouvrage et édifice, acquisition immobilière ») ; les crédits disponibles (88% de 5 500 milliards) peuvent financer les travaux sans aucun mouvement de crédits, dans le respect du butoir d'engagement du 31 octobre pour les AE annuelles (art. 92) et, pour les chantiers pluriannuels, via les AE pluriannuelles révisables (art. 52)." },
      { num: 2, enonce: 'Si les crédits du programme ne suffisent pas, quelles voies la LOFIP offre-t-elle ?', correction: "Trois voies. (1) Le transfert de crédits depuis un autre programme : au sein du même ministère, décret du Premier ministre délibéré en Conseil des ministres sur proposition du Ministre du Budget, titres de même nature, ouvertures ratifiées en LFR (art. 48) ; depuis un autre ministère, décret du Premier ministre après avis du Ministre du Budget (art. 49). (2) Les crédits provisionnels de l'art. 40, si la loi de finances en a ouverts : les inondations sont typiquement des dépenses accidentelles et imprévisibles ; en cas d'insuffisance, des crédits supplémentaires sont demandés au Parlement (art. 129 de la Constitution), toute ouverture devant prévoir ses voies et moyens avec rapport du Premier ministre (art. 41). (3) La loi de finances rectificative (art. 26-27) pour un besoin dépassant les mécanismes réglementaires. Dans tous les cas, deux interdits demeurent : rien vers le titre du personnel (art. 51) et rien vers un programme non prévu par une loi de finances (art. 50)." },
      { num: 3, enonce: 'Comment le couple PAP/RAP rendra-t-il compte de cet épisode, et quel est le rôle de la Cour des comptes ?', correction: "Le PAP de l'exercice suivant devra intégrer l'effort de réhabilitation - par exemple un indicateur « salles de classe réhabilitées » avec cible chiffrée - et les crédits correspondants par titre et source (art. 79 pt. 6). Le RAP de l'exercice en cours, joint au projet de loi portant reddition des comptes (art. 82 pt. 4), expliquera les mouvements de crédits opérés et l'écart entre cibles initiales et réalisations : les tableaux récapitulatifs des mouvements intervenus par voie réglementaire accompagnent d'ailleurs tout projet de LFR (art. 80 pt. 3). La Cour des comptes, chargée par l'art. 180 de la Constitution du contrôle de la gestion des finances de l'État, vérifie a posteriori la régularité des opérations des ordonnateurs et comptables (art. 123-126 LOFIP), évalue les rapports de performance en assistance de l'Assemblée nationale (art. 124) et son rapport accompagne le projet de reddition des comptes (art. 82 pt. 3). Un virement irrégulier - par exemple vers le titre du personnel - serait constitutif de faute de gestion (art. 129), jugée par la Cour (art. 131)." },
    ],
  },
  {
    id: 'cp4',
    titre: 'Le PAP mal construit : indicateurs manquants et cohérence du programme',
    contexte: "Le Ministère de la Santé publique soumet son projet de PAP avec trois programmes : « Soins de santé primaires » (12 500 milliards FC demandés), « Lutte contre les maladies endémiques » (4 200 milliards) et « Hôpitaux et infrastructures sanitaires » (8 800 milliards). Le directeur en charge au Ministère du Budget relève deux problèmes : le premier programme n'a aucun indicateur de performance chiffré ; le deuxième inclut 500 milliards FC pour de la « recherche fondamentale » sans lien direct avec la lutte contre les endémies.",
    questions: [
      { num: 1, enonce: "Le programme « Soins de santé primaires » sans indicateur chiffré respecte-t-il l'art. 43 LOFIP ?", correction: "Non. L'art. 43 fait de l'évaluation un élément constitutif du programme : les crédits sont associés à « des objectifs précis, définis en fonction des finalités d'intérêt général, ainsi que des résultats attendus et faisant l'objet d'une évaluation au moyen d'indicateurs de performance ». Un programme sans indicateurs chiffrés ne permet ni de fixer des cibles dans le PAP (art. 79 pt. 6) ni d'en rendre compte dans le RAP (art. 82 pt. 4) : il est vidé de sa substance performantielle. Le Ministère du Budget - qui prépare le projet de loi de finances sous l'autorité du Premier ministre (art. 77) - est fondé à renvoyer le document pour y intégrer des indicateurs mesurables, renseignés sur plusieurs exercices. Seule alternative légale à la performance : la dotation de l'art. 3 pt. 20 - mais elle est réservée aux institutions de la République, pas aux ministères." },
      { num: 2, enonce: "Les 500 milliards de « recherche fondamentale » peuvent-ils rester dans le programme « Lutte contre les maladies endémiques » ?", correction: "Tout dépend de la cohérence exigée par l'art. 43 : un programme regroupe les crédits d'« une action ou un ensemble cohérent d'actions ». Si la recherche est directement rattachée à la finalité du programme - par exemple la recherche appliquée sur le paludisme ou la trypanosomiase -, elle peut constituer une action du programme, l'action précisant la destination de la dépense (art. 3 pt. 1), avec justification dans le PAP. Si c'est de la recherche fondamentale sans lien avec la lutte contre les endémies, son maintien fausse la mesure de la performance du programme et contredit la cohérence légale : elle doit rejoindre un programme dont c'est la finalité - au sein du ministère, ou d'un autre ministère (recherche scientifique). Le reclassement se fait dans le projet de loi de finances lui-même : une fois la loi votée, déplacer ces crédits vers un autre programme exigerait un transfert par décret du Premier ministre (art. 48-49), et la création d'un programme nouveau ne pourrait venir que d'une loi de finances (art. 43, 50)." },
      { num: 3, enonce: "Les crédits des trois programmes obéissent-ils au même régime juridique ?", correction: "Oui : le régime de droit commun des crédits limitatifs (art. 38) - aucun des trois ne porte de charges de la dette, seul domaine des crédits évaluatifs (art. 39), ni de dépenses accidentelles et imprévisibles relevant des crédits provisionnels (art. 40). Dans chaque programme, la fongibilité joue à l'intérieur du titre et de la source de financement (art. 45), les virements entre titres passent par arrêté du Ministre du Budget (art. 47), et l'asymétrie protège identiquement le titre des dépenses de personnel : rien ne peut l'abonder (art. 51), tandis que ses crédits non consommés peuvent être redéployés - par exemple, dans le programme « Hôpitaux et infrastructures », des crédits de postes vacants peuvent accélérer les constructions du titre VIII, dans les plafonds fixés par la loi de finances." },
    ],
  },
  {
    id: 'cp5',
    titre: 'Le Parlement face à un programme hors des clous',
    contexte: "Lors de la session budgétaire, la commission des finances de l'Assemblée nationale contrôle l'exécution du budget en cours. Les rapports provisoires transmis révèlent trois faits : le taux d'exécution des dépenses en capital est très inférieur aux prévisions ; le programme « Infrastructure routière » a redéployé 1 200 milliards FC des titres d'investissement vers le titre des dépenses de personnel, sans texte ; les indicateurs de résultat ne sont renseignés que pour 3 programmes sur 15.",
    questions: [
      { num: 1, enonce: 'Le redéploiement vers le titre des dépenses de personnel est-il légal ? Quelles suites ?', correction: "Il est radicalement illégal. L'art. 51 dispose qu'« aucun virement ni transfert ne peut être effectué au profit du titre des dépenses de personnel à partir d'un autre titre » - l'interdiction est absolue, aucune autorité ne peut y déroger par arrêté ou décret ; seule une loi de finances peut accroître les crédits de personnel et les plafonds d'emplois. L'opération viole aussi la spécialité (art. 8) et la légalité des dépenses (art. 10). Suites : les auteurs ont enfreint les règles d'exécution des dépenses - faute de gestion de l'art. 129, amende pouvant atteindre le double du traitement brut annuel, prononcée par la Cour des comptes (art. 131), sans préjudice des sanctions disciplinaires, civiles et pénales (art. 128) ; le contrôleur budgétaire qui aurait visé ces actes s'expose au même régime (art. 131 vise expressément les contrôleurs budgétaires). Le paiement de dépenses de personnel non couvertes par des crédits réguliers aurait dû être bloqué en amont : visa préalable du contrôleur budgétaire (art. 112-113) et contrôle du comptable public avant paiement (art. 119)." },
      { num: 2, enonce: "Que deviennent les crédits d'investissement non consommés en fin d'exercice ? Le report est-il automatique ?", correction: "Le report n'est pas automatique. L'art. 53 permet de reporter les autorisations d'engagement pluriannuelles et les crédits de paiement non consommés « sur le même programme et le même titre » - exceptionnellement sur le même titre d'un programme poursuivant les mêmes objectifs -, mais par un acte exprès : les arrêtés de report, pris conjointement par le Ministre du Budget et le ministre ou responsable d'institution intéressé, au plus tard le 31 mars de l'année suivante. S'y ajoutent les reports de l'art. 93 pour les crédits couvrant des obligations existant au 31 octobre et non payées au 31 décembre, énumérés dans un état approuvé par ordonnance-loi puis ratifiés en loi de finances (art. 94). À défaut de report, la loi portant reddition des comptes annule la différence entre crédits ouverts et dépenses payées, augmentée des crédits reportés (art. 29). L'engagement des dépenses nouvelles sur AE annuelles étant clos au 31 octobre (art. 92), la fenêtre d'action de fin d'exercice est étroite - d'où l'importance d'exécuter tôt." },
      { num: 3, enonce: 'Des indicateurs renseignés pour 3 programmes sur 15 : violation ? Quels pouvoirs pour la commission des finances ?', correction: "C'est une méconnaissance de la logique performantielle de la LOFIP : l'art. 43 fait des indicateurs un élément constitutif du programme, l'art. 79 pt. 6 (réd. 2023) exige des projets annuels de performance au dépôt du PLF, et l'art. 82 pt. 4 un rapport annuel de performance par programme à la reddition des comptes ; le rapport d'évaluation de l'art. 82 pt. 2 doit préciser, pour chaque programme, « le degré d'atteinte des objectifs, les résultats obtenus et les explications relatives aux écarts ». Pouvoirs du Parlement : l'art. 127 LOFIP garantit que les informations demandées et les investigations sur pièces ou sur place « ne peuvent lui être refusées », avec audition des ministres et des responsables des programmes ; l'art. 138 de la Constitution arme les chambres de la question orale ou écrite, de la question d'actualité, de l'interpellation, de la commission d'enquête et de l'audition par les commissions - pouvant déboucher sur une motion de défiance ou de censure (art. 146-147). La commission peut aussi s'appuyer sur la Cour des comptes, qui assiste l'Assemblée nationale dans le contrôle de l'exécution de la loi de finances et évalue les rapports de performance (art. 124), et sanctionner politiquement lors de l'examen de la reddition des comptes, préalable au vote de la loi de finances suivante (art. 87, 127)." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue5',
  numero: 4,
  id: 'ue5-chapitre-4',
  titre: 'Budget-programme et gestion par la performance',
  sousTitre: 'LOFIP n° 11/011 du 13 juillet 2011 (mod. 2018 et 2023), art. 42-53, 79, 82, 230-234',
  infoBulle: "La réforme du budget-programme : définition du programme (art. 43), fonctions et dotations (art. 44, art. 3), fongibilité et mouvements de crédits (art. 45-53), projets et rapports annuels de performance (art. 79 et 82) et état d'avancement de la réforme (art. 230-234, lois de 2018 et 2023).",
  loiRef: 'Art. 42-53, 79, 82 LOFIP',
  moduleLabel: 'UE 5 · Finances publiques',
  retourRoute: '/ue5-finances-publiques',
  coursId: 'ue5-finances-publiques',
  objectifs: [
    'Expliquer le passage du budget de moyens à la gestion budgétaire axée sur les résultats (art. 43 ; exposés des motifs 2011 et 2023)',
    "Définir et articuler fonction, programme, dotation et action (art. 3, 43-44, réd. loi n° 23/030)",
    'Maîtriser la gestion des crédits du programme : fongibilité (art. 45), virements (art. 47), transferts (art. 48-49), verrous des art. 50-51, AE pluriannuelles et reports (art. 52-53)',
    "Connaître les instruments de la performance : PAP (art. 79 pt. 6, réd. 2023) et RAP (art. 82 pt. 4), et les onze documents accompagnant le PLF",
    "Situer la trajectoire de la réforme : art. 230 et 234, prorogations de 2018 et 2023, rapport annuel du Ministre du Budget, déconcentration de l'ordonnancement (art. 5 LF 2026)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Le budget-programme substitue à la question « combien dépense-t-on ? » la question « quels résultats obtient-on ? » : les crédits sont regroupés en programmes associés à des objectifs précis et évalués par indicateurs de performance (art. 43).",
    "Un programme relève d'un seul ministère ou institution ; chaque ministère peut créer un programme « administration générale » ; seule une disposition de loi de finances d'initiative gouvernementale peut créer ou supprimer un programme (art. 43), et aucun virement ni transfert ne peut bénéficier à un programme non prévu par une loi de finances (art. 50).",
    "Les programmes - et depuis 2023 les dotations - peuvent être regroupés en fonctions institutionnelles, ministérielles ou interministérielles ; l'interministérialité impose coordination d'exécution et présentation conjointe des résultats à la reddition des comptes (art. 44).",
    "Les institutions de la République reçoivent des dotations budgétaires, non soumises à la règle de la performance mais pleinement soumises à la comptabilité publique et au contrôle (art. 3 pt. 20, réd. loi n° 23/030).",
    "Gestion des crédits : fongibilité à l'intérieur du titre et de la source de financement (art. 45) ; virement entre titres d'un même programme par arrêté du Ministre du Budget (art. 47) ; transferts entre programmes par décret du Premier ministre (art. 48-49) ; jamais au profit du titre des dépenses de personnel (art. 51 ; asymétrie de l'art. 3 pt. 28).",
    "Les AE pluriannuelles d'investissement sont révisables pour modifications techniques ou variations de coûts (art. 52) ; AE et crédits de paiement non consommés sont reportés sur le même programme et le même titre par arrêtés conjoints pris au plus tard le 31 mars (art. 53) - le report n'est jamais automatique.",
    "Le PAP accompagne le projet de loi de finances (art. 79 pt. 6, réd. 2023 - l'un des onze documents exigés) ; le RAP accompagne le projet de loi portant reddition des comptes (art. 82 pt. 4), dont l'examen précède le vote de la LF suivante et dont l'approbation vaut quitus (art. 87).",
    "La mise en application intégrale de la LOFIP, prévue endéans sept ans (art. 230), a été prorogée de cinq ans en 2018 (loi n° 18/010) puis de cinq ans en 2023 (loi n° 23/030, art. 234), avec rapport annuel du Ministre du Budget à l'Assemblée nationale sur les progrès du budget-programme ; l'art. 5 de la LF 2026 accélère la déconcentration de l'ordonnancement avec neuf ministères pilotes.",
  ],
  references: [
    {
      genre: 'texte',
      intitule: 'Loi n° 11/011 du 13 juillet 2011 relative aux finances publiques (LOFIP)',
      precision: 'telle que modifiée par la loi n° 18/010 du 9 juillet 2018 et par la loi n° 23/030 du 28 juin 2023 ; art. 3, 8, 42-53, 76-87, 111-131 et 230-234',
    },
    {
      genre: 'texte',
      intitule: 'Constitution de la République Démocratique du Congo du 18 février 2006',
      precision: 'telle que modifiée par la loi n° 11/002 du 20 janvier 2011 ; art. 129, 138, 146-147 et 178-180',
    },
    {
      genre: 'texte',
      intitule: "Loi de finances n° 25/060 du 29 décembre 2025 pour l'exercice 2026",
      precision: "art. 5 (déconcentration de l'ordonnancement, neuf ministères pilotes) et annexe XXI (crédits par section, programme et action)",
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : LOFIP n° 11/011 du 13 juillet 2011 (mod. lois n° 18/010 et n° 23/030), art. 3, 42-53, 79-87, 111-131, 230-234 · Constitution du 18 février 2006, art. 138, 178-180 · LF n° 25/060 (2026), art. 5 et annexe XXI',
}

export default chapitre
