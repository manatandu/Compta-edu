// Chapitre 5 du module UE5, Finances publiques : contenu pur.
// Migré depuis l'ancienne page dédiée UE5Chapitre5Page.tsx (2 211 lignes)
// vers le moteur commun components/chapitre/ChapitreManuscrit.tsx, avec
// vérification sur les textes : LOFIP art. 13, 26-31, 42-53, 76-87 (réd.
// 2023 comprises) ; Constitution art. 126-127, 134 ; Guide d'élaboration
// des PAP et RAP (Ministères du Budget et des Finances/COREF, juillet
// 2021, texte intégral) ; décret n° 22/37 du 5 août 2022 portant
// gouvernance budgétaire (RPROG/RUOP, dialogue de gestion) ; décret
// n° 23/18 du 31 mai 2023 sur la gestion des investissements publics.
// Corrections majeures : l'art. 79 réd. 2023 liste ONZE documents, non
// « 13 » - le « Plan d'Engagement Budgétaire (pt 7) » et le « Plan de
// Passation des marchés (pt 9) » n'y figurent pas (points renumérotés :
// plan de trésorerie = pt 7, dépenses fiscales = pt 9, risques
// budgétaires = pt 11) ; les définitions AE/CP relèvent des art. 3 et 42
// (l'art. 52 porte sur la révision des AE, l'art. 53 sur les reports) ;
// le comité du PIP est le COPIP (décret 23/18, art. 36-38), non un
// « CISPIP » aux deux développements contradictoires ; la « reconduction
// fondée sur l'art. 43 » et la « transparence de l'art. 9 » étaient des
// rattachements fabriqués ; le scénario « LF 2026 promulguée le 5 janvier
// 2026 » contredisait la réalité (n° 25/060 du 29 décembre 2025) - les
// cas chronologiques sont désormais explicitement hypothétiques. La
// circulaire n° 004/ME/MIN.BUDGET/2025, non disponible dans nos
// référentiels, est conservée à titre de pratique administrative signalée
// comme telle ; ses règles convergent avec le Guide PAP/RAP vérifié
// (4 à 5 programmes par ministère, limitation des objectifs).
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch5-q1', question: "Selon l'Art. 13 LOFIP, le cadre budgétaire à moyen terme (CBMT) est adopté en Conseil des ministres et transmis à l'Assemblée nationale au plus tard le :",
    options: [
      { id: 'a', texte: '1er mars' },
      { id: 'b', texte: '1er juin' },
      { id: 'c', texte: '15 septembre' },
      { id: 'd', texte: '1er octobre' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 13 LOFIP (réd. loi n° 23/030)',
    explication: "L'Art. 13, dans sa rédaction de 2023, prévoit que le CBMT à trois ans, adopté en Conseil des ministres, est transmis à l'Assemblée nationale au plus tard le 1er juin et donne lieu à un débat d'orientation budgétaire - éventuellement suivi de recommandations - au plus tard le 15 juin. C'est la première pierre du calendrier budgétaire annuel.",
  },
  {
    id: 'ch5-q2', question: "Au plus tard à quelle date le projet de loi de finances de l'année doit-il être déposé au bureau de l'Assemblée nationale ?",
    options: [
      { id: 'a', texte: 'Le 1er juin' },
      { id: 'b', texte: 'Le 15 juillet' },
      { id: 'c', texte: 'Le 15 septembre' },
      { id: 'd', texte: 'Le 1er décembre' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 83 LOFIP · Art. 126 Constitution',
    explication: "L'Art. 83 : le projet de loi de finances de l'année, avec les états et documents des art. 78 et 79, « est déposé par le Gouvernement au bureau de l'Assemblée Nationale au plus tard le 15 septembre de chaque année » - délai également constitutionnel (art. 126 al. 2). La sanction du non-dépôt intervient plus tard : quinze jours avant la fin de la session budgétaire, soit le 1er décembre.",
  },
  {
    id: 'ch5-q3', question: "De combien de jours l'Assemblée nationale dispose-t-elle pour adopter le projet de loi de finances après son dépôt ?",
    options: [
      { id: 'a', texte: '20 jours' },
      { id: 'b', texte: '30 jours' },
      { id: 'c', texte: '40 jours' },
      { id: 'd', texte: '60 jours' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 83 LOFIP',
    explication: "L'Art. 83 : « Dans tous les cas, l'Assemblée Nationale dispose de 40 jours à compter de la date du dépôt pour adopter le projet de loi de finances de l'année. » À défaut de vote dans les 40 jours suivant l'ouverture de la session budgétaire, le projet est transmis au Sénat pour être adopté dans les 20 jours.",
  },
  {
    id: 'ch5-q4', question: "Si l'Assemblée nationale ne vote pas le PLF dans son délai, le Sénat dispose de :",
    options: [
      { id: 'a', texte: '10 jours' },
      { id: 'b', texte: '15 jours' },
      { id: 'c', texte: '20 jours' },
      { id: 'd', texte: '40 jours' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 83 LOFIP',
    explication: "L'Art. 83 : « Si le projet de loi de finances de l'année déposé dans le délai constitutionnel n'est pas voté dans les 40 jours suivant l'ouverture de la session budgétaire, ledit projet est transmis au Sénat pour être adopté dans les 20 jours. » Le bicamérisme budgétaire est ainsi borné : 40 jours pour la chambre basse, 20 pour la chambre haute.",
  },
  {
    id: 'ch5-q5', question: "Que se passe-t-il si le projet de loi de finances n'est pas voté avant l'ouverture du nouvel exercice ?",
    options: [
      { id: 'a', texte: "Le budget de l'année précédente est reconduit automatiquement" },
      { id: 'b', texte: 'Le Parlement est dissous' },
      { id: 'c', texte: "Les dispositions du projet sont mises en vigueur par ordonnance-loi du Président de la République, compte tenu des amendements votés" },
      { id: 'd', texte: 'Le Gouvernement est réputé démissionnaire' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 83 LOFIP · Art. 126 Constitution',
    explication: "L'Art. 83 : « Lorsque le projet de loi de finances n'est pas voté avant l'ouverture du nouvel exercice, les dispositions dudit projet sont mises en vigueur par ordonnance-loi du Président de la République délibérée en Conseil des ministres, en tenant compte des amendements votés par chacune des deux chambres. » La présomption de démission sanctionne, elle, le non-DÉPÔT du projet avant le 1er décembre - deux hypothèses à ne pas confondre.",
  },
  {
    id: 'ch5-q6', question: "Si, quinze jours avant la fin de la session budgétaire (le 1er décembre), le Gouvernement n'a pas déposé son projet de loi de finances, quelle est la conséquence ?",
    options: [
      { id: 'a', texte: "Le budget précédent est reconduit" },
      { id: 'b', texte: 'Le Gouvernement est réputé démissionnaire, conformément à l\'art. 126 de la Constitution' },
      { id: 'c', texte: "L'Assemblée nationale est dissoute" },
      { id: 'd', texte: 'Le Sénat vote le budget en urgence' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 83 LOFIP · Art. 126 Constitution',
    explication: "L'Art. 83 : « Si quinze (15) jours avant la fin de la session budgétaire, soit le 1er décembre, le Gouvernement n'a pas déposé son projet de loi de finances de l'année suivante, il est réputé démissionnaire conformément à l'article 126 de la Constitution. » C'est la sanction politique majeure du calendrier budgétaire. Le Gouvernement demande alors l'ouverture de crédits provisoires.",
  },
  {
    id: 'ch5-q7', question: "Le projet de loi portant ouverture de crédits provisoires n'est pas voté dans les quinze jours de son dépôt. Que prévoit l'Art. 83 LOFIP ?",
    options: [
      { id: 'a', texte: 'Le Sénat vote à sa place dans les dix jours' },
      { id: 'b', texte: "Il est mis en vigueur le premier jour de l'exercice par ordonnance-loi du Président de la République" },
      { id: 'c', texte: 'Toutes les dépenses publiques sont suspendues' },
      { id: 'd', texte: "La Cour constitutionnelle statue d'urgence" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 31 et 83 LOFIP',
    explication: "L'Art. 83 : le projet de loi portant ouverture de crédits provisoires est déposé avant le 15 décembre ; « à défaut de vote, dans les quinze (15) jours du dépôt, [il] est mis en vigueur le premier jour de l'exercice budgétaire par ordonnance-loi du Président de la République délibérée en Conseil des ministres ». Il autorise les recettes et dépenses « nécessaires au fonctionnement minimum des services publics » (art. 31) et s'exécute jusqu'au 31 janvier - ou jusqu'au vote de la LF si le Gouvernement est réputé démissionnaire.",
  },
  {
    id: 'ch5-q8', question: 'Le projet de loi portant reddition des comptes du dernier exercice clos est déposé au plus tard le :',
    options: [
      { id: 'a', texte: "31 mars de l'année suivante" },
      { id: 'b', texte: "15 mai de l'année suivante" },
      { id: 'c', texte: "30 juin de l'année suivante" },
      { id: 'd', texte: "15 septembre de l'année suivante" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 84 LOFIP',
    explication: "L'Art. 84 : dépôt à l'Assemblée nationale « au plus tard le 15 mai de l'année suivant celle de l'exécution du budget auquel il se rapporte » ; dans l'impossibilité de respecter ce délai, le projet et le rapport de la Cour des comptes sont déposés avant la fin de la session ordinaire de mars.",
  },
  {
    id: 'ch5-q9', question: "Selon l'Art. 87 LOFIP, l'approbation des comptes par la loi portant reddition des comptes vaut :",
    options: [
      { id: 'a', texte: 'Autorisation de contracter de nouveaux emprunts' },
      { id: 'b', texte: "Quitus de la gestion du Gouvernement pour l'exercice concerné" },
      { id: 'c', texte: "Validation automatique du PLF de l'année suivante" },
      { id: 'd', texte: 'Décharge de responsabilité de la Cour des comptes' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 87 LOFIP',
    explication: "L'Art. 87 : le projet de loi portant reddition des comptes « doit être examiné par le Parlement préalablement au vote du projet de la loi de finances de l'année », et « au regard des observations formulées par la Cour des comptes [...], l'approbation des comptes par cette loi vaut quitus de la gestion du Gouvernement pour l'exercice concerné ». On ne vote pas le budget de demain sans avoir jugé la gestion d'hier.",
  },
  {
    id: 'ch5-q10', question: "Sous l'autorité de qui le Ministre du Budget prépare-t-il le projet de loi de finances (Art. 77 LOFIP) ?",
    options: [
      { id: 'a', texte: 'Le Président de la République' },
      { id: 'b', texte: 'Le Ministre des Finances' },
      { id: 'c', texte: 'Le Premier ministre' },
      { id: 'd', texte: "Le Président de l'Assemblée nationale" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 77 LOFIP',
    explication: "L'Art. 77 : « Sous l'autorité du Premier ministre, le ministre ayant le budget dans ses attributions prépare [...] le projet de loi de finances de l'année qui est présenté au Gouvernement pour approbation avant sa transmission à l'Assemblée nationale. » Il élabore aussi, le cas échéant, les projets de loi de crédits provisoires et de LFR.",
  },
  {
    id: 'ch5-q11', question: 'Qui élabore et soumet au Conseil des ministres le projet de loi portant reddition des comptes ?',
    options: [
      { id: 'a', texte: 'Le Ministre du Budget' },
      { id: 'b', texte: 'Le Premier ministre' },
      { id: 'c', texte: 'Le Ministre ayant les finances dans ses attributions' },
      { id: 'd', texte: 'La Cour des comptes' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 28 et 77 LOFIP',
    explication: "L'Art. 77 in fine : « À la clôture de l'exercice, le ministre ayant les finances dans ses attributions élabore et soumet au Conseil des ministres le projet de loi portant reddition des comptes du pouvoir central » - et l'art. 28 précise que ce projet est supervisé par lui. Le Ministre du Budget prépare les lois de finances prévisionnelles ; le Ministre des Finances rend les comptes.",
  },
  {
    id: 'ch5-q12', question: "Selon l'Art. 85 LOFIP, comment les recettes et les dépenses sont-elles votées ?",
    options: [
      { id: 'a', texte: 'Recettes et dépenses en un vote global unique' },
      { id: 'b', texte: "Recettes par vote d'ensemble par titre (et par budget annexe et compte spécial) ; dépenses par ministère ou institution et par programme" },
      { id: 'c', texte: 'Recettes par régie financière ; dépenses par province' },
      { id: 'd', texte: 'Recettes et dépenses ligne par ligne' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 85 LOFIP',
    explication: "L'Art. 85 : « Les évaluations de recettes font l'objet d'un vote d'ensemble pour le titre sous lequel elles sont regroupées dans le budget général et d'un vote par budget annexe et par compte spécial. Les dépenses du budget du pouvoir central sont votées par ministère ou institution et par programme. » Le niveau de vote épouse la structure programmatique.",
  },
  {
    id: 'ch5-q13', question: "Combien d'états font partie intégrante du projet de loi de finances de l'année selon l'Art. 78 LOFIP ?",
    options: [
      { id: 'a', texte: '5' },
      { id: 'b', texte: '7' },
      { id: 'c', texte: '9' },
      { id: 'd', texte: '11' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 78 LOFIP',
    explication: "Neuf états font partie intégrante du PLF (art. 78) : recettes à caractère national ; répartition des recettes par province ; prévisions de dépenses par ministère, programme, titre et source ; équilibre budgétaire et financier ; CDMT à trois ans ; AE pluriannuelles ; subventions et dotations ; plafonds d'emplois rémunérés ; liste des budgets annexes et comptes spéciaux. Les onze documents de l'art. 79 (réd. 2023), eux, accompagnent le projet.",
  },
  {
    id: 'ch5-q14', question: "Lequel des documents suivants fait partie INTÉGRANTE du PLF (art. 78) et non des documents qui l'accompagnent (art. 79) ?",
    options: [
      { id: 'a', texte: "L'exposé général" },
      { id: 'b', texte: "Le rapport d'exécution du budget en cours au premier semestre" },
      { id: 'c', texte: "L'état des plafonds d'autorisations des emplois rémunérés par le pouvoir central" },
      { id: 'd', texte: 'La déclaration sur les risques budgétaires' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 78 et 79 LOFIP',
    explication: "L'état des plafonds d'emplois (art. 78 pt. 8) fait partie intégrante du projet : il est voté avec lui et conditionne la légalité des recrutements (art. 51). L'exposé général (art. 79 pt. 1), le rapport d'exécution du premier semestre (pt. 3) et la déclaration sur les risques budgétaires (pt. 11, réd. 2023) accompagnent le projet à titre d'information du Parlement.",
  },
  {
    id: 'ch5-q15', question: 'Le cadrage des dépenses à moyen terme (CDMT) joint au PLF porte sur :',
    options: [
      { id: 'a', texte: "L'exercice budgétaire seul" },
      { id: 'b', texte: 'Deux ans' },
      { id: 'c', texte: 'Trois années, actualisé par glissement' },
      { id: 'd', texte: 'Cinq ans' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 76 et 78 pt. 5 LOFIP',
    explication: "L'Art. 78 pt. 5 vise « le document du cadrage des dépenses à moyen terme pour les trois années à venir actualisé par glissement et détaillé par ministère ou institution et programme ». L'Art. 76 en donne le contenu : objectifs budgétaires pluriannuels de dépenses, allocation des ressources aux secteurs selon les priorités stratégiques, et indicateurs de performance pour le suivi et le contrôle de l'exécution.",
  },
  {
    id: 'ch5-q16', question: "Parmi les onze documents accompagnant le PLF (art. 79, réd. 2023), lequel évalue le coût budgétaire des exonérations et allégements fiscaux ?",
    options: [
      { id: 'a', texte: 'Le plan de trésorerie prévisionnel' },
      { id: 'b', texte: 'La déclaration sur les risques budgétaires' },
      { id: 'c', texte: 'Le rapport sur les dépenses fiscales' },
      { id: 'd', texte: "Le rapport consolidé des entreprises publiques" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 79 pt. 9 LOFIP (réd. loi n° 23/030)',
    explication: "Le rapport sur les dépenses fiscales (art. 79 pt. 9, réd. 2023) chiffre le manque à gagner des exonérations, réductions et exemptions - les « niches fiscales ». Il donne son plein sens à la réserve de loi de l'art. 9 : toute exonération étant votée, son coût doit être présenté au Parlement. La déclaration sur les risques budgétaires (pt. 11) porte, elle, sur les aléas macroéconomiques et les passifs éventuels.",
  },
  {
    id: 'ch5-q17', question: "Un député propose d'augmenter de 2 milliards FC les crédits du programme « Éducation » en supprimant une subvention équivalente. Cet amendement est-il recevable ?",
    options: [
      { id: 'a', texte: 'Non, seul le Gouvernement peut modifier les crédits' },
      { id: 'b', texte: 'Oui, car il est assorti d\'une proposition compensatoire' },
      { id: 'c', texte: "Non, car il accroît les dépenses d'un programme" },
      { id: 'd', texte: "Oui, si le Gouvernement ne s'y oppose pas en séance" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 86 LOFIP · Art. 127 Constitution',
    explication: "L'Art. 86, reprenant l'art. 127 de la Constitution : les amendements au PLF ne sont pas recevables lorsqu'ils entraînent une diminution des recettes ou un accroissement des dépenses, « à moins qu'ils ne soient assortis de propositions compensatoires ». Ici l'accroissement de 2 milliards est exactement compensé par la suppression d'une subvention : la recevabilité est acquise - le texte n'exige pas que la compensation vienne du même programme.",
  },
  {
    id: 'ch5-q18', question: "L'irrecevabilité financière s'applique-t-elle aux propositions de loi déposées en dehors de la session budgétaire ?",
    options: [
      { id: 'a', texte: 'Non, elle ne vaut que pour les amendements au PLF' },
      { id: 'b', texte: "Oui : toute proposition ou amendement diminuant les ressources publiques ou créant/aggravant une charge publique est irrecevable sans recettes ou économies correspondantes" },
      { id: 'c', texte: 'Uniquement pendant les sessions extraordinaires' },
      { id: 'd', texte: 'Uniquement si le Gouvernement soulève l\'irrecevabilité' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 86 LOFIP · Art. 134 Constitution',
    explication: "L'Art. 86 al. 2, conformément à l'art. 134 de la Constitution : « les propositions de loi et les amendements formulés par les membres de l'Assemblée nationale ou du Sénat ne sont pas recevables lorsque leur adoption aurait pour conséquence soit une diminution des ressources publiques, soit la création ou l'aggravation d'une charge publique, à moins qu'ils ne soient assortis de propositions dégageant les recettes ou les économies correspondantes. » Le verrou vaut toute l'année, pour toute initiative parlementaire.",
  },
  {
    id: 'ch5-q19', question: "Selon le Guide d'élaboration des PAP et RAP (juillet 2021), le nombre de programmes par ministère doit être :",
    options: [
      { id: 'a', texte: 'Illimité, selon les besoins sectoriels' },
      { id: 'b', texte: 'Limité - 4 à 5 en moyenne' },
      { id: 'c', texte: "D'au moins 10 pour couvrir toutes les politiques" },
      { id: 'd', texte: 'Fixé uniformément à 3 pour tous les ministères' },
    ],
    reponseCorrecte: 'b', articleRef: 'Guide PAP/RAP 2021, partie I · Art. 43 LOFIP',
    explication: "Le Guide PAP/RAP (Ministères du Budget et des Finances, sous l'encadrement du COREF, juillet 2021) prescrit : « Le nombre de programmes par ministère sera limité (4 à 5 en moyenne). » Trop de programmes pulvérise les responsabilités et rend le pilotage par les résultats impossible. La structuration comporte cinq étapes, de l'identification de la mission ministérielle à la désignation du responsable de programme.",
  },
  {
    id: 'ch5-q20', question: "Un PAP dont tous les indicateurs sont « nombre d'agents formés », « nombre de réunions tenues » et « crédits consommés » respecte-t-il la démarche de performance du Guide PAP/RAP ?",
    options: [
      { id: 'a', texte: 'Oui, tout indicateur chiffré est un indicateur de performance' },
      { id: 'b', texte: "Non : pris isolément, les indicateurs de moyens ne sont pas des indicateurs de performance stricto sensu" },
      { id: 'c', texte: 'Oui, si les cibles sont atteintes' },
      { id: 'd', texte: "Non, car un programme ne peut avoir que des indicateurs financiers" },
    ],
    reponseCorrecte: 'b', articleRef: 'Guide PAP/RAP 2021, partie I · Art. 43 LOFIP',
    explication: "Le Guide est explicite : « Pris isolément, les indicateurs de moyens ne sont pas des indicateurs de performance » stricto sensu - ils ne servent qu'en dénominateur d'un ratio d'efficience. La performance se mesure par les indicateurs de produits, de qualité de service et de résultats (efficacité socio-économique), l'efficience étant le rapport entre moyens et produits. Un PAP tout en moyens ne permet pas d'évaluer les résultats attendus exigés par l'art. 43 LOFIP.",
  },
  {
    id: 'ch5-q21', question: 'Selon le Guide PAP/RAP, les « conférences de performance et revue des dépenses » avec chaque ministère se tiennent :',
    options: [
      { id: 'a', texte: 'En janvier, avant les travaux préparatoires' },
      { id: 'b', texte: "Au cours de la deuxième quinzaine d'avril" },
      { id: 'c', texte: 'Le 15 septembre, au dépôt du PLF' },
      { id: 'd', texte: 'En décembre, après le vote du budget' },
    ],
    reponseCorrecte: 'b', articleRef: 'Guide PAP/RAP 2021, partie I',
    explication: "Le Guide organise le dialogue de gestion : les RAP des ministères, examinés fin mars-début avril par les groupes de travail internes, passent en « conférences de performance et revue des dépenses » au cours de la deuxième quinzaine d'avril, présidées par la direction compétente du Ministère du Budget - réexamen des priorités et identification des activités à maintenir, en amont du cadrage du PLF.",
  },
  {
    id: 'ch5-q22', question: 'Selon le décret n° 22/37 du 5 août 2022 portant gouvernance budgétaire, qui détermine les objectifs spécifiques, affecte les moyens et contrôle les résultats des services chargés de la mise en œuvre du programme ?',
    options: [
      { id: 'a', texte: "L'ordonnateur délégué" },
      { id: 'b', texte: 'Le Responsable de Programme (RPROG)' },
      { id: 'c', texte: 'Le contrôleur budgétaire' },
      { id: 'd', texte: 'Le comptable public' },
    ],
    reponseCorrecte: 'b', articleRef: 'Décret n° 22/37 du 5 août 2022, partie 4',
    explication: "Le décret n° 22/37 structure la chaîne managériale : sur la base des objectifs généraux fixés par l'ordonnateur, le RPROG « détermine les objectifs spécifiques, affecte les moyens et contrôle les résultats des services chargés de la mise en œuvre du programme sous sa responsabilité » ; il définit le périmètre des unités opérationnelles et organise le dialogue de gestion conformément à la charte de gestion. Le Responsable de l'Unité Opérationnelle du Programme (RUOP) lui propose la programmation des crédits et les mouvements de crédits de son unité.",
  },
  {
    id: 'ch5-q23', question: "Selon le décret n° 23/18 du 31 mai 2023, quelle instance supervise l'élaboration, la mise en œuvre, le suivi et l'évaluation du Programme d'Investissements Publics ?",
    options: [
      { id: 'a', texte: 'Le CISPIP' },
      { id: 'b', texte: "Le COPIP - Comité du Programme d'Investissement Public, présidé par le Ministre du Plan" },
      { id: 'c', texte: 'La Cour des comptes' },
      { id: 'd', texte: 'La Banque centrale du Congo' },
    ],
    reponseCorrecte: 'b', articleRef: 'Décret n° 23/18 du 31 mai 2023, art. 36-38',
    explication: "Le décret n° 23/18 institue le COPIP (art. 36-38) : présidé par le Ministre du Plan, avec les Ministres du Budget et des Finances aux vice-présidences, il supervise l'élaboration, la mise en œuvre, le suivi et l'évaluation du PIP à tous les niveaux. Le décret organise aussi la banque des projets (art. 14), le fonds de préinvestissement (5% du budget d'investissement) et le crédit de suivi-évaluation (2%).",
  },
  {
    id: 'ch5-q24', question: "Dans le canevas du RAP, que mesure le « reste à payer » sur les autorisations d'engagement ?",
    options: [
      { id: 'a', texte: "Les crédits de paiement annulés en fin d'exercice" },
      { id: 'b', texte: "Les AE consommées diminuées des CP payés : les engagements contractuels de l'État non encore décaissés" },
      { id: 'c', texte: 'La différence entre la LF initiale et la LFR' },
      { id: 'd', texte: 'Les projets inscrits au PIP non encore engagés' },
    ],
    reponseCorrecte: 'b', articleRef: 'Guide PAP/RAP 2021, partie III · Art. 3 et 42 LOFIP',
    explication: "Le Guide PAP/RAP : « Le RAP présente l'exécution des AE et le reste à payer sur les AE consommées. » Le reste à payer = AE consommées - CP payés : ce sont les marchés signés non encore décaissés, qui grèveront les crédits de paiement des exercices suivants. La dissociation AE/CP vient de l'art. 3 (pt. 2 et 17) et de l'art. 42 LOFIP : l'AE est la limite supérieure des dépenses pouvant être engagées, le CP celle des dépenses pouvant être ordonnancées ou payées pendant l'année.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '5.1',
    titre: 'Le calendrier budgétaire, du CBMT à la promulgation',
    navLabel: 'Calendrier',
    blocs: [
      { type: 'paragraphe', texte: "L'élaboration du budget est un cycle continu, cadencé par la LOFIP et la Constitution. En amont, le Ministre du Budget établit chaque année le **cadre budgétaire à moyen terme** à trois ans, sur les hypothèses macroéconomiques du ministère du Plan (art. 13) ; il en découle le cadre des dépenses à moyen terme et les prévisions par ministère (art. 76). Sous l'autorité du Premier ministre, le Ministre du Budget prépare le projet de loi de finances, approuvé par le Gouvernement avant transmission à l'Assemblée nationale (art. 77)." },
      { type: 'carte', titre: 'Le calendrier légal', tableau: {
        entetes: ['Échéance', 'Étape', 'Base'],
        lignes: [
          ['**Au plus tard le 1er juin**', "CBMT adopté en Conseil des ministres et transmis à l'Assemblée nationale", 'Art. 13 (réd. 2023)'],
          ['**Au plus tard le 15 juin**', "Débat d'orientation budgétaire en plénière, éventuellement suivi de recommandations", 'Art. 3 pt. 18 et 13 (réd. 2023)'],
          ['**Au plus tard le 15 septembre**', "Dépôt du PLF, avec les états de l'art. 78 et les documents de l'art. 79, au bureau de l'Assemblée nationale", 'Art. 83 · art. 126 Const.'],
          ['**40 jours**', "Délai d'adoption par l'Assemblée nationale, à compter du dépôt", 'Art. 83'],
          ['**20 jours**', 'Délai du Sénat si l\'Assemblée n\'a pas voté dans les 40 jours suivant l\'ouverture de la session', 'Art. 83'],
          ['**Non-vote avant le 1er janvier**', "Mise en vigueur du projet par ordonnance-loi du Président de la République, compte tenu des amendements votés", 'Art. 83 · art. 126 Const.'],
          ['**Non-dépôt au 1er décembre**', 'Gouvernement réputé démissionnaire ; dépôt du projet de crédits provisoires avant le 15 décembre ; à défaut de vote en 15 jours, ordonnance-loi', 'Art. 83 · art. 126 Const.'],
          ['**Au plus tard le 15 mai (N+1)**', "Dépôt du projet de loi portant reddition des comptes, examiné avant le vote de la LF suivante", 'Art. 84 et 87'],
        ],
      } },
      { type: 'filet', titre: 'La pratique et ses écarts', texte: "Le calendrier légal n'est pas toujours tenu : les dépôts tardifs du PLF sont récurrents - la presse budgétaire congolaise l'a documenté pour plusieurs exercices récents (données de pratique, extérieures aux textes). La LOFIP a précisément prévu les amortisseurs : ordonnance-loi de mise en vigueur, loi portant ouverture de crédits provisoires exécutable jusqu'au 31 janvier (art. 31, 83). La sanction ultime - le Gouvernement réputé démissionnaire - ne frappe que le non-dépôt au 1er décembre, non le retard de vote." },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[5] },
    ],
  },
  {
    numero: '5.2',
    titre: 'Les acteurs de la procédure budgétaire',
    navLabel: 'Acteurs',
    blocs: [
      { type: 'carte', titre: 'Qui fait quoi', tableau: {
        entetes: ['Acteur', 'Rôle', 'Base'],
        lignes: [
          ['**Premier ministre**', "Autorité sous laquelle le PLF est préparé ; lettre d'orientation adoptée en Conseil des ministres ; rapport au Parlement pour toute ouverture de crédits supplémentaires", 'Art. 13, 41, 77'],
          ['**Ministre du Budget**', 'Établit le CBMT ; prépare le PLF, le projet de crédits provisoires et la LFR ; met les crédits à disposition ; contrôleur général du budget par les contrôleurs budgétaires', 'Art. 13, 77, 88, 105'],
          ['**Ministre des Finances**', 'Élabore et soumet le projet de loi portant reddition des comptes ; ordonnateur général des recettes ; régulateur de la trésorerie ; désigne les comptables publics', 'Art. 28, 77, 106'],
          ['**Assemblée nationale et Sénat**', "Débat d'orientation budgétaire ; vote des recettes par titre et des dépenses par ministère et par programme ; amendements sous condition de compensation ; quitus à la reddition des comptes", 'Art. 13, 85-87 · art. 126-127, 134 Const.'],
          ['**Cour des comptes**', 'Son rapport accompagne le projet de reddition des comptes ; elle assiste l\'Assemblée nationale dans le contrôle de l\'exécution et évalue les rapports de performance', 'Art. 82 pt. 3, 124 · art. 180 Const.'],
        ],
      }, note: "L'initiative des lois de finances est gouvernementale : le Parlement amende, il ne substitue pas son propre budget (art. 126 de la Constitution ; art. 130 : le projet de loi de finances est impérativement déposé au bureau de l'Assemblée nationale)." },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[11] },
    ],
  },
  {
    numero: '5.3',
    titre: 'Les neuf états faisant partie intégrante du PLF (art. 78)',
    navLabel: 'États intégrants',
    blocs: [
      { type: 'paragraphe', texte: "L'art. 78 distingue soigneusement ce qui **fait partie intégrante** du projet de loi de finances - voté avec lui, avec force de loi - de ce qui l'**accompagne** (art. 79) à titre d'information. Neuf états sont intégrants :" },
      { type: 'carte', titre: 'Les neuf états (art. 78)', liste: [
        "1. L'état de la liste et de l'évaluation des prévisions de recettes à caractère national, accordant les autorisations nécessaires en matière d'impôts, taxes, redevances et droits - le consentement à l'impôt.",
        '2. L\'état de la répartition des recettes à caractère national allouées à chaque province - la traduction des 40% constitutionnels, province par province.',
        "3. L'état des prévisions de dépenses par ministère ou institution et par programme, titre et source de financement.",
        "4. L'état de l'équilibre budgétaire et financier - la démonstration chiffrée de l'équilibre imposé par l'art. 14 et l'autorisation du mode de financement.",
        '5. Le document du cadrage des dépenses à moyen terme pour les trois années à venir, actualisé par glissement, détaillé par ministère et programme.',
        "6. L'état des autorisations d'engagement pluriannuelles par ministère ou institution et par programme.",
        "7. L'état des subventions ou dotations inscrites au budget général.",
        "8. L'état des plafonds d'autorisations des emplois rémunérés par le pouvoir central, la création d'emplois nouveaux et la répartition des emplois autorisés - sans lui, aucun recrutement n'est légal (art. 51).",
        '9. La liste complète des budgets annexes et des comptes spéciaux, avec leurs recettes et dépenses prévues.',
      ], note: "Un PLF déposé sans l'un de ces états est incomplet au sens de l'art. 83, qui exige le dépôt du projet « y compris les états et documents prévus aux articles 78 et 79 »." },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[14] },
    ],
  },
  {
    numero: '5.4',
    titre: "Les documents d'accompagnement : PLF (art. 79) et reddition des comptes (art. 81-82)",
    navLabel: 'Documents joints',
    blocs: [
      { type: 'paragraphe', texte: "Le PLF est accompagné de **onze documents** depuis la loi n° 23/030 - la liste de 2011 en comptait cinq. Attention aux listes apocryphes : certains supports y ajoutent un « plan d'engagement budgétaire » ou un « plan de passation des marchés » qui, s'ils existent dans la pratique administrative, ne figurent pas dans l'énumération légale de l'art. 79." },
      { type: 'carte', titre: "Les onze documents accompagnant le PLF (art. 79, réd. 2023)", liste: [
        "1. L'exposé général - synthèse du budget, politique économique et financière, environnement, CBMT, niveau d'exécution du budget en cours.",
        "2. Le rapport d'évaluation de l'exécution du budget de l'année précédente.",
        "3. Le rapport d'exécution du budget en cours au premier semestre.",
        '4. Le projet de loi portant reddition des comptes du dernier exercice clos, s\'il n\'a pas encore été déposé - ou, le cas échéant, le rapport de la Cour des comptes.',
        "5. L'annexe explicative : analyse des prévisions de recettes, développement des crédits par titre, état des reports, encours et échéances de la dette, restes à payer, restes à recouvrer.",
        '6. Les projets annuels de performance (PAP).',
        '7. Le plan de trésorerie prévisionnel.',
        "8. Le programme d'investissements publics.",
        '9. Le rapport sur les dépenses fiscales.',
        '10. Le rapport consolidé de la situation financière des entreprises publiques et des établissements publics.',
        '11. La déclaration sur les risques budgétaires.',
      ] },
      { type: 'carte', titre: 'La reddition des comptes : intégrant (art. 81) et accompagnant (art. 82)', tableau: {
        entetes: ['Art. 81 - font partie intégrante', 'Art. 82 - accompagnent'],
        lignes: [
          ["Synthèse des recettes et dépenses de l'exercice clos", 'Rapport explicatif des dépassements et de la nature du résultat'],
          ['Compte général du Trésor (situation consolidée de financement)', "Rapport d'évaluation : conditions d'exécution et, par programme, degré d'atteinte des objectifs, résultats, écarts"],
          ['États comparatifs recettes prévues/réalisées et crédits/dépenses exécutées', "Rapport de la Cour des comptes prévu par l'art. 180 de la Constitution"],
          ['Opérations de chaque budget annexe et compte spécial ; situation de la dette ; état comparatif AE/dépenses engagées', 'Rapport annuel de performance par programme (RAP)'],
        ],
      } },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[7] },
    ],
  },
  {
    numero: '5.5',
    titre: "Amendements parlementaires et quitus : les deux verrous du cycle",
    navLabel: 'Amendements · quitus',
    blocs: [
      { type: 'filet', titre: "La règle d'or des amendements (art. 86 ; art. 127 et 134 Const.)", texte: "« Les amendements au projet de loi de finances ne sont pas recevables lorsque leur adoption a pour conséquence, soit une diminution des recettes, soit un accroissement des dépenses, à moins qu'ils ne soient assortis de propositions compensatoires. » Et au-delà du PLF, toute proposition de loi ou amendement parlementaire diminuant les ressources publiques ou créant/aggravant une charge publique est irrecevable sans « propositions dégageant les recettes ou les économies correspondantes » (art. 134 de la Constitution). Le Parlement peut réallouer - il ne peut pas déséquilibrer." },
      { type: 'carte', titre: 'Recevable ou non ?', liste: [
        "**Recevable** : augmenter un programme en réduisant d'autant un autre, ou en créant une recette équivalente ; supprimer une exonération (l'effet réel est un accroissement de recettes) ; un amendement purement rédactionnel sans impact financier.",
        "**Irrecevable** : accroître des crédits ou réduire une recette sans compensation ; créer un programme nouveau par amendement - la création d'un programme relève d'une disposition de loi de finances d'initiative gouvernementale (art. 43), et aucun mouvement de crédits ne peut bénéficier à un programme non prévu par une loi de finances (art. 50).",
      ] },
      { type: 'paragraphe', texte: "Le second verrou ferme le cycle : le projet de loi portant reddition des comptes du dernier exercice clos « doit être examiné par le Parlement préalablement au vote du projet de la loi de finances de l'année », et son approbation, au regard des observations de la Cour des comptes, « vaut quitus de la gestion du Gouvernement pour l'exercice concerné » (art. 87). Le refus d'approbation prive le Gouvernement du quitus - les responsabilités des ordonnateurs et comptables restent alors entières devant la Cour des comptes (art. 123-131), et le Parlement prononce, s'il échet, la décharge des ordonnateurs à cette même occasion (art. 127). C'est à ce moment que le RAP prend toute sa valeur : il documente, programme par programme, ce que le quitus couvre." },
      { type: 'controle', question: QCM[16] },
      { type: 'controle', question: QCM[17] },
      { type: 'controle', question: QCM[8] },
    ],
  },
  {
    numero: '5.6',
    titre: 'La fabrique de la performance : Guide PAP/RAP et gouvernance des programmes',
    navLabel: 'PAP · RAP en pratique',
    blocs: [
      { type: 'paragraphe', texte: "Comment un ministère construit-il concrètement son PAP ? Le référentiel opérationnel est le **Guide d'élaboration du Projet Annuel de Performance et du Rapport Annuel de Performance** (Ministères du Budget et des Finances, sous l'encadrement technique du COREF, juillet 2021) - guide méthodologique non normatif, mais référentiel unique en la matière -, adossé au **décret n° 22/37 du 5 août 2022 portant gouvernance budgétaire**, qui donne leur assise juridique aux acteurs de programme." },
      { type: 'carte', titre: 'La structuration du budget en programmes : cinq étapes (Guide, partie I)', liste: [
        '1. Identifier la mission ministérielle - la finalité politique du ministère.',
        '2. Recenser les politiques sectorielles conduites.',
        '3. Regrouper ces politiques en programmes cohérents - le nombre de programmes par ministère « sera limité (4 à 5 en moyenne) ».',
        "4. Définir les objectifs et les indicateurs de performance de chaque programme, en nombre restreint.",
        '5. Désigner le responsable de programme (RProg).',
      ] },
      { type: 'carte', titre: 'Les acteurs de la gestion de programme (décret n° 22/37)', liste: [
        "**Le Responsable de Programme (RPROG)** : sur la base des objectifs généraux fixés par l'ordonnateur, il « détermine les objectifs spécifiques, affecte les moyens et contrôle les résultats des services chargés de la mise en œuvre du programme » ; il définit le périmètre des unités opérationnelles, s'assure du contrôle interne et du contrôle de gestion, et organise le dialogue de gestion conformément à la charte de gestion.",
        "**Le Responsable de l'Unité Opérationnelle du Programme (RUOP)** : il propose au RPROG la programmation des crédits de son unité et les mouvements de crédits, dans les limites de la charte de gestion.",
        "**Le dialogue de gestion** rythme l'année : travaux préparatoires du RAP en janvier-février, examen interne fin mars-début avril, puis « conférences de performance et revue des dépenses » avec chaque ministère au cours de la deuxième quinzaine d'avril, avant le cadrage du PLF.",
      ] },
      { type: 'carte', titre: 'Les indicateurs de performance (Guide, partie I)', tableau: {
        entetes: ['Famille', 'Ce qu\'elle mesure', 'Exemple'],
        lignes: [
          ['**Moyens**', "Volume ou valeur des ressources mobilisées - « pris isolément, les indicateurs de moyens ne sont pas des indicateurs de performance »", 'Crédits consommés, effectifs'],
          ['**Produits (services rendus)**', "Les productions de l'administration", 'Kilomètres de routes bitumées, consultations effectuées'],
          ['**Qualité de service**', "La qualité du service rendu à l'usager", 'Délai de traitement, satisfaction des usagers'],
          ['**Résultats (efficacité socio-économique)**', 'L\'impact de la politique sur la société', 'Taux de scolarisation, mortalité infantile'],
          ["**Efficience**", 'Le rapport entre moyens et produits', 'Coût du kilomètre bitumé, coût par élève'],
        ],
      }, note: "Le canevas du guide est entièrement tabulé : tableaux P-I.x (présentation du ministère : crédits par programme, par titre, AE pluriannuelles, effectifs) et P-II.k.x (par programme : stratégie, objectifs et indicateurs, actions, crédits, investissements) pour le PAP ; tableaux R-I.x et R-II.k.x, miroirs des précédents, pour le RAP. Les projets d'un coût total supérieur à 10 millions de dollars y sont présentés individuellement, et le RAP fait ressortir le « reste à payer » sur les AE consommées." },
      { type: 'filet', titre: 'La circulaire budgétaire annuelle - pratique administrative', texte: "Chaque année, une circulaire du Ministre du Budget cadre l'élaboration des prévisions (la circulaire n° 004/ME/MIN.BUDGET/2025 pour l'exercice 2026, citée par les praticiens - document administratif que nos référentiels ne permettent pas de vérifier ligne à ligne). Selon cette pratique rapportée, elle plafonne le nombre de programmes par ministère, limite les objectifs et indicateurs par programme, impose une double présentation des prévisions (classique et en mode programme) pour les ministères disposant de PAP validés, et rappelle que la désignation du responsable de programme se fait parmi les hauts fonctionnaires existants, sans créer d'emploi. Ces règles convergent avec le Guide PAP/RAP vérifié (4 à 5 programmes en moyenne, indicateurs en nombre restreint) et avec l'art. 230 LOFIP (application progressive du budget-programme)." },
      { type: 'controle', question: QCM[18] },
      { type: 'controle', question: QCM[19] },
      { type: 'controle', question: QCM[20] },
      { type: 'controle', question: QCM[21] },
    ],
  },
  {
    numero: '5.7',
    titre: "Le programme d'investissements publics (PIP)",
    navLabel: 'PIP',
    blocs: [
      { type: 'paragraphe', texte: "Troisième instrument opérationnel : le **programme d'investissements publics**, document de programmation triennale glissante des investissements, dont la tranche annuelle s'intègre au PLF - il figure parmi les documents accompagnants (art. 79 pt. 8, réd. 2023). Son cadre juridique est le **décret n° 23/18 du 31 mai 2023** relatif à la gestion des investissements publics : cycle du projet en sept étapes (de l'identification à l'évaluation ex-post), banque des projets (art. 14), fonds de préinvestissement doté de 5% du budget d'investissement pour financer les études préparatoires (art. 17-18), crédit de suivi-évaluation de 2% (art. 76-77), et **COPIP** - Comité du Programme d'Investissement Public, présidé par le Ministre du Plan avec les Ministres du Budget et des Finances aux vice-présidences (art. 36-38)." },
      { type: 'carte', titre: 'AE et CP : la mécanique pluriannuelle', liste: [
        "**Autorisation d'engagement (AE)** : « la permission de signer sur l'année considérée un ou plusieurs marchés pour un montant total maximum mais dont l'exécution peut se réaliser sur plusieurs exercices budgétaires selon un échéancier des paiements » (art. 3 pt. 2) ; les AE constituent la limite supérieure des dépenses pouvant être engagées (art. 42).",
        "**Crédit de paiement (CP)** : la limite supérieure des dépenses pouvant être ordonnancées ou payées pendant l'année pour la couverture des engagements contractés dans le cadre des AE (art. 3 pt. 17, art. 42).",
        "**Exemple** : un marché routier de 30 millions USD signé en année N mobilise 30 millions d'AE en N, mais des CP de 10 millions par an sur N, N+1 et N+2 selon l'avancement - le « reste à payer » (AE consommées - CP payés) mesure la charge des exercices futurs.",
        "**Révision et report** : les AE pluriannuelles d'investissement sont révisables pour modifications techniques ou variations de coûts (art. 52) et reportées avec les CP non consommés par arrêtés conjoints avant le 31 mars (art. 53).",
      ] },
      { type: 'filet', titre: 'La fiche projet', texte: "Chaque projet d'investissement fait l'objet d'une fiche projet - le gabarit officiel de la Direction de la Programmation et Budgétisation des Investissements du Ministère du Plan structure l'identification, les résultats et bénéficiaires attendus, les activités et le planning, les aspects financiers, économiques et environnementaux. Sans fiche, pas d'inscription régulière à la banque des projets ni d'évaluation ex-ante - et le suivi de l'exécution comme le futur RAP en sont compromis. Dans le canevas PAP/RAP, les projets de plus de 10 millions de dollars sont en outre présentés individuellement, avec leur coût total, les tranches engagées et les besoins futurs de CP." },
      { type: 'controle', question: QCM[22] },
      { type: 'controle', question: QCM[23] },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[6] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: 'Le PLF fantôme du 20 novembre',
    contexte: "Scénario d'école. Au 20 novembre de l'année N, le Gouvernement n'a toujours pas déposé le projet de loi de finances de l'année N+1 à l'Assemblée nationale. Parallèlement, des députés déposent trois textes : augmenter de 5 milliards FC les crédits du programme « Santé » sans compensation ; réduire des taux de TVA sans compensation ; créer un « Fonds de développement rural » doté de 3 milliards FC prélevés sur le budget général.",
    questions: [
      { num: 1, enonce: "Analysez la situation du Gouvernement au regard de l'art. 83 LOFIP et de l'art. 126 de la Constitution.", correction: "Le PLF devait être déposé au plus tard le 15 septembre (art. 83 ; art. 126 al. 2 de la Constitution) : le retard est déjà de plus de deux mois. Le seuil critique est le 1er décembre : « Si quinze (15) jours avant la fin de la session budgétaire, soit le 1er décembre, le Gouvernement n'a pas déposé son projet de loi de finances de l'année suivante, il est réputé démissionnaire conformément à l'article 126 de la Constitution » (art. 83). Au 20 novembre, la présomption n'est pas encore acquise - il reste onze jours pour déposer. S'il ne le fait pas : Gouvernement réputé démissionnaire, et obligation de demander l'ouverture de crédits provisoires - dépôt du projet avant le 15 décembre, mise en vigueur par ordonnance-loi du Président de la République à défaut de vote dans les quinze jours, exécution jusqu'au vote de la loi de finances puisque le Gouvernement est réputé démissionnaire (art. 83). La continuité du fonctionnement minimum des services publics est ainsi garantie (art. 31), mais au prix d'une crise politique majeure." },
      { num: 2, enonce: 'Évaluez la recevabilité des trois initiatives parlementaires.', correction: "(1) L'augmentation de 5 milliards sans compensation est irrecevable : l'art. 86, conformément à l'art. 127 de la Constitution, écarte tout amendement dont l'adoption a pour conséquence un accroissement des dépenses « à moins qu'ils ne soient assortis de propositions compensatoires ». (2) La réduction de TVA sans compensation est irrecevable au même titre - diminution des recettes sans compensation - et, s'il s'agit d'une proposition de loi hors PLF, l'art. 86 al. 2 et l'art. 134 de la Constitution l'écartent également : aucune initiative parlementaire ne peut diminuer les ressources publiques sans dégager les recettes ou économies correspondantes. (3) La création du « Fonds de développement rural » est doublement impossible : un programme ne peut être créé que par une disposition de loi de finances d'initiative gouvernementale (art. 43), et aucun virement ni transfert ne peut bénéficier à un programme non prévu par une loi de finances (art. 50) ; si le « fonds » devait prendre la forme d'un compte spécial, seule une loi de finances pourrait l'ouvrir et lui affecter une recette (art. 60). Les trois textes doivent être déclarés irrecevables avant examen." },
    ],
  },
  {
    id: 'cp2',
    titre: 'Autopsie d\'un calendrier budgétaire déraillé',
    contexte: "Scénario d'école, données hypothétiques. Pour un exercice donné : le CBMT est adopté en Conseil des ministres le 25 juin et transmis ensuite ; le PLF est déposé le 28 octobre ; l'Assemblée nationale l'adopte le 12 décembre (45 jours après le dépôt) ; le Sénat l'adopte le 28 décembre ; la loi n'est pas encore promulguée au 1er janvier. Par ailleurs, la loi portant reddition des comptes de l'exercice N-1, déposée le 30 avril, n'a pas été examinée avant le vote du PLF.",
    questions: [
      { num: 1, enonce: 'Relevez et qualifiez les violations du calendrier légal.', correction: "(1) CBMT adopté le 25 juin : violation de l'art. 13 (réd. 2023), qui exige la transmission à l'Assemblée nationale au plus tard le 1er juin pour permettre le débat d'orientation budgétaire du 15 juin - le débat lui-même est donc compromis. (2) PLF déposé le 28 octobre : 43 jours de retard sur le 15 septembre (art. 83 ; art. 126 Const.) ; le dépôt étant antérieur au 1er décembre, la présomption de démission n'est pas déclenchée. (3) Adoption par l'Assemblée en 45 jours : dépassement du délai de 40 jours ; la conséquence légale est la transmission au Sénat pour adoption dans les 20 jours - ce qui s'est produit (vote du Sénat le 28 décembre, dans le délai). (4) La violation la plus grave est celle de l'art. 87 : le projet de loi portant reddition des comptes « doit être examiné par le Parlement préalablement au vote du projet de la loi de finances de l'année ». Voter le PLF sans avoir examiné la reddition déposée depuis avril rompt la séquence légale du cycle - le Parlement autorise l'avenir sans avoir jugé le passé, et le Gouvernement obtient des crédits sans quitus." },
      { num: 2, enonce: "La loi n'est pas promulguée au 1er janvier alors qu'elle a été votée. Quels mécanismes assurent la continuité de l'État ?", correction: "L'art. 83 distingue les hypothèses. Si le projet n'est pas VOTÉ avant l'ouverture de l'exercice, ses dispositions sont mises en vigueur par ordonnance-loi du Président de la République, compte tenu des amendements votés par chacune des chambres - c'est le filet principal. Ici le texte est voté par les deux chambres mais pas encore promulgué : la Constitution organise la suite - transmission pour promulgation, possibilité de renvoi par le Président de la République (auquel cas le Gouvernement demande l'ouverture de crédits provisoires, art. 83 et 126 in fine), et l'art. 126 prévoit qu'à défaut de mise en vigueur au premier février, le Président met en exécution le projet compte tenu des amendements votés. Dans l'intervalle, l'exécution des dépenses ne peut s'appuyer que sur un texte : loi portant ouverture de crédits provisoires (art. 18, 31) si elle a été votée ou mise en vigueur par ordonnance-loi, limitée au fonctionnement minimum des services publics et exécutable jusqu'au 31 janvier. En pratique, la LF 2026 réelle a été promulguée le 29 décembre 2025 (loi n° 25/060), avant l'ouverture de l'exercice - le scénario étudié est purement hypothétique." },
    ],
  },
  {
    id: 'cp3',
    titre: 'Quatre amendements au banc d\'essai',
    contexte: "Lors de l'examen d'un projet de loi de finances, quatre amendements sont déposés : (A) augmenter les crédits du programme « Santé » de 800 milliards FC, financés par la création d'une taxe additionnelle sur les bénéfices miniers ; (B) réduire de 500 milliards FC les crédits du programme « Infrastructure routière » au profit d'un programme « Électrification rurale » créé pour l'occasion ; (C) supprimer une exonération de TVA sur les véhicules de luxe ; (D) corriger une faute de syntaxe dans un intitulé d'article, sans impact financier.",
    questions: [
      { num: 1, enonce: 'Analysez la recevabilité de chaque amendement (art. 86 LOFIP ; art. 127 et 134 Constitution ; art. 43 et 50 LOFIP).', correction: "(A) Recevable dans son principe : l'accroissement de dépenses est assorti d'une proposition compensatoire - une recette nouvelle équivalente -, ce que l'art. 86 exige. Réserve : la création d'une imposition relève du domaine de la loi (art. 122 pt. 10 de la Constitution) et l'initiative parlementaire en matière fiscale reste possible tant qu'elle ne diminue pas les ressources ; la chambre appréciera la sincérité du chiffrage de la compensation - une recette surestimée ne compense rien. (B) Irrecevable : la réduction de crédits est en soi permise, mais leur affectation à un programme créé par l'amendement se heurte à l'art. 43 (« seule une disposition de loi de finances d'initiative gouvernementale peut créer ou supprimer un programme ») et à l'art. 50 (aucun mouvement au profit d'un programme non prévu par une loi de finances). (C) Recevable : supprimer une exonération ACCROÎT les recettes - c'est l'inverse d'une diminution ; l'argument selon lequel « la recette est à zéro » confond recette encaissée et dépense fiscale : l'exonération est un manque à gagner, précisément ce que le rapport sur les dépenses fiscales de l'art. 79 pt. 9 doit chiffrer ; et la suppression d'un allégement rejoint la réserve de loi de l'art. 9 LOFIP et de l'art. 174 de la Constitution. (D) Recevable : l'irrecevabilité de l'art. 86 ne vise que les amendements à conséquence financière ; une correction purement rédactionnelle y échappe." },
      { num: 2, enonce: "Expliquez la portée de l'art. 86 al. 2 LOFIP et de l'art. 134 de la Constitution au-delà de la session budgétaire.", correction: "L'art. 86 al. 2, conformément à l'art. 134 de la Constitution, étend l'irrecevabilité financière à toutes « les propositions de loi et les amendements formulés par les membres de l'Assemblée nationale ou du Sénat » : ils ne sont pas recevables lorsque leur adoption aurait pour conséquence une diminution des ressources publiques ou la création ou l'aggravation d'une charge publique, à moins d'être assortis de propositions dégageant les recettes ou les économies correspondantes. La portée est permanente : à tout moment de l'année, une proposition de loi créant une charge - par exemple une indemnité généralisée pour les agents publics - doit identifier son financement, faute de quoi elle est écartée avant examen. Le dispositif prolonge deux principes : l'équilibre budgétaire (art. 14) et la sincérité (art. 11, qui exige au surplus que tout projet de texte à incidence financière soit accompagné d'une annexe chiffrant ses conséquences pour l'année d'entrée en vigueur et l'année suivante). Il rappelle aussi que les obligations financières créées par toute loi « ne deviennent certaines et définitives qu'avec l'ouverture des crédits correspondants » (art. 10)." },
    ],
  },
  {
    id: 'cp4',
    titre: 'Le PLF incomplet : inventaire des pièces manquantes',
    contexte: "Au moment du dépôt d'un PLF, quatre anomalies sont constatées : (1) le CDMT à trois ans n'est joint qu'en « annexe informelle » ; (2) la déclaration sur les risques budgétaires n'a pas été élaborée, un conseiller la jugeant « recommandée mais non obligatoire » ; (3) l'état des plafonds d'emplois omet les emplois des cabinets politiques ; (4) le projet de loi portant reddition des comptes du dernier exercice clos n'a jamais été déposé, et l'on propose de joindre un rapport provisoire de la Cour des comptes « à titre de substitut ».",
    questions: [
      { num: 1, enonce: 'Qualifiez chaque anomalie et ses conséquences.', correction: "(1) Le CDMT fait partie INTÉGRANTE du PLF (art. 78 pt. 5) : le joindre en annexe informelle ne satisfait pas la loi - le dépôt exigé par l'art. 83 porte sur le projet « y compris les états et documents prévus aux articles 78 et 79 » ; le projet est incomplet et sa recevabilité contestable. (2) La déclaration sur les risques budgétaires est le onzième document de l'art. 79 (réd. 2023) : elle est obligatoire, non « recommandée » ; son absence viole l'art. 79, même si la sanction est moins radicale que pour un état intégrant - c'est une carence d'information du Parlement que la Cour des comptes peut relever. (3) L'état des plafonds d'emplois (art. 78 pt. 8) doit couvrir tous les emplois rémunérés par le pouvoir central ; l'omission des cabinets politiques rend irrégulière leur rémunération future, les crédits de personnel étant des plafonds assortis de plafonds d'emplois spécialisés et les créations d'emplois relevant d'une loi de finances (art. 51). (4) La reddition des comptes devait être déposée au plus tard le 15 mai (art. 84) ; un rapport provisoire de la Cour n'en tient pas lieu - l'art. 79 pt. 4 permet seulement de joindre au PLF le projet de reddition non encore déposé « ou, le cas échéant, le rapport de la Cour des comptes », mais l'art. 87 exige l'examen du projet de reddition AVANT le vote de la LF suivante : sans reddition, le vote du PLF est vicié dans sa procédure et le Gouvernement ne peut obtenir quitus." },
      { num: 2, enonce: "Pourquoi l'état de l'équilibre budgétaire et financier (art. 78 pt. 4) est-il un état intégrant et non un simple document d'information ?", correction: "Parce qu'il porte l'autorisation elle-même. Les états de l'art. 78 sont votés avec la loi : ils ont force de loi, quand les documents de l'art. 79 éclairent le vote sans être votés. L'état de l'équilibre démontre le respect de l'art. 14 - le budget « est présenté en équilibre », prévoit le montant des dons, fixe les plafonds des emprunts et détermine l'affectation des ressources en résultant - et l'art. 24 charge la loi de finances d'arrêter « les données générales de l'équilibre budgétaire ». C'est par son vote que le Parlement autorise le niveau et le mode de financement : sans lui, aucun emprunt n'est couvert par l'autorisation parlementaire (les opérations d'emprunt ne peuvent entrer en vigueur que si une loi les autorise, art. 108). À titre d'illustration réelle, la LF 2026 (n° 25/060) arrête l'équilibre à 54 335,8 milliards FC (art. 6) et autorise les émissions de bons et obligations du Trésor dans un plafond de 0,5% du PIB (art. 77 de ladite loi)." },
    ],
  },
  {
    id: 'cp5',
    titre: 'Le quitus refusé',
    contexte: "Scénario d'école. Le rapport de la Cour des comptes joint au projet de loi portant reddition des comptes d'un exercice révèle des dépassements de crédits non autorisés dans trois ministères, pour 1 256 milliards FC, et des recettes fiscales inférieures de 18% aux prévisions. Le Gouvernement demande au Parlement d'examiner le PLF de l'année suivante AVANT la reddition « pour gagner du temps » ; un groupe parlementaire annonce vouloir rejeter la reddition pour priver le Gouvernement du quitus.",
    questions: [
      { num: 1, enonce: "Le Parlement peut-il examiner le PLF avant la reddition des comptes ?", correction: "Non. L'art. 87 est impératif : le projet de loi portant reddition des comptes du dernier exercice clos « doit être examiné par le Parlement préalablement au vote du projet de la loi de finances de l'année ». Aucune dérogation n'est prévue. La séquence a une triple raison d'être : responsabilité (pas de nouveaux crédits sans compte rendu des précédents), apprentissage (les résultats de l'exécution - taux d'exécution, dépassements, RAP - éclairent le vote suivant, l'art. 82 pt. 2 exigeant un rapport d'évaluation précisant par programme le degré d'atteinte des objectifs et les écarts), et sanction politique (le quitus). Voter le PLF avant la reddition vicierait la procédure ; la Cour des comptes, qui assiste l'Assemblée nationale dans le contrôle de l'exécution (art. 124), serait fondée à le relever. Le calendrier légal rend d'ailleurs la demande inutile : la reddition, déposée au plus tard le 15 mai (art. 84), peut être examinée bien avant le dépôt du PLF du 15 septembre." },
      { num: 2, enonce: 'Quels sont les effets juridiques d\'un refus d\'approbation de la reddition des comptes ?', correction: "L'approbation « vaut quitus de la gestion du Gouvernement pour l'exercice concerné » (art. 87) : le refus prive le Gouvernement de cette décharge. Conséquences : les responsabilités restent entières - les dépassements non autorisés ne sont pas couverts, l'art. 29 ne permettant d'approuver par crédits complémentaires que les dépassements résultant de cas de force majeure ; les auteurs des engagements sans crédits relèvent de la faute de gestion (art. 129) jugée par la Cour des comptes (art. 131), et le Parlement peut refuser de prononcer la décharge des ordonnateurs (art. 127). Le refus ne paralyse pas pour autant l'État : l'art. 87 exige l'EXAMEN préalable de la reddition, non son approbation - une reddition examinée et rejetée satisfait la condition procédurale du vote du PLF suivant, tout en laissant les comptes de l'exercice non réglés et la responsabilité politique du Gouvernement exposée (les art. 146-147 de la Constitution ouvrant, le cas échéant, la voie de la motion de censure). Le contrôle parlementaire dispose en outre des moyens de l'art. 138 de la Constitution : questions, interpellation, commission d'enquête, auditions." },
    ],
  },
  {
    id: 'cp6',
    titre: 'Le ministère aux neuf programmes : audit de gouvernance',
    contexte: "Un ministère soumet son cadre de performance : 9 programmes déclarés, dont un « programme transversal » et deux programmes-soutien ; aucun responsable de programme désigné pour 4 programmes, et un même directeur désigné RPROG de 3 programmes ; les tableaux d'objectifs et indicateurs sont vides pour 6 programmes, et les 3 programmes documentés n'affichent que des indicateurs de moyens (agents formés, réunions tenues, crédits consommés) ; le programme d'investissements joint présente les crédits globalement, sans distinction AE/CP, et un projet de campus universitaire de 12 millions USD y figure sans fiche projet.",
    questions: [
      { num: 1, enonce: 'La structuration en 9 programmes est-elle conforme ? Analysez les programmes « transversal » et les deux programmes-soutien.', correction: "Non conforme au référentiel. Le Guide PAP/RAP limite le nombre de programmes par ministère à « 4 à 5 en moyenne » : neuf programmes pulvérisent les responsabilités et les crédits. Un « programme transversal » contredit la définition légale : l'art. 43 LOFIP exige « un ensemble cohérent d'actions relevant d'un même ministère » au service de finalités d'intérêt général - un intitulé transversal ne désigne aucune politique publique identifiable ; ses crédits doivent rejoindre les programmes opérationnels ou le programme « administration générale », seul programme d'accueil prévu par l'art. 43 pour les crédits non spécifiquement affectés. Deux programmes-soutien font double emploi avec ce programme unique d'administration générale : fusion requise. La correction passe par la maquette du PLF elle-même : la création et la suppression de programmes relèvent d'une disposition de loi de finances d'initiative gouvernementale (art. 43)." },
      { num: 2, enonce: 'Appréciez la situation des responsables de programme au regard du décret n° 22/37.', correction: "Le décret n° 22/37 du 5 août 2022 portant gouvernance budgétaire fait du RPROG la clef de voûte de la gestion : sur la base des objectifs généraux fixés par l'ordonnateur, il détermine les objectifs spécifiques, affecte les moyens et contrôle les résultats ; il définit le périmètre des unités opérationnelles, garantit contrôle interne et contrôle de gestion, et organise le dialogue de gestion conformément à la charte de gestion. Quatre programmes sans RPROG sont ingérables : personne pour arrêter les objectifs du PAP ni pour en répondre dans le RAP - le rapport d'évaluation de l'art. 82 pt. 2, qui doit préciser par programme le degré d'atteinte des objectifs, ne peut être renseigné. Le cumul de trois programmes par un même directeur dilue la responsabilité managériale que le dispositif veut précisément individualiser : si un seul répond de tout, nul ne répond de rien. La chaîne doit être complétée par les RUOP, qui proposent au RPROG la programmation et les mouvements de crédits de leurs unités dans les limites de la charte de gestion." },
      { num: 3, enonce: 'Les indicateurs exclusivement « de moyens » sont-ils admissibles ? Quelles conséquences pour le futur RAP ?', correction: "Non. Le Guide PAP/RAP l'énonce : « pris isolément, les indicateurs de moyens ne sont pas des indicateurs de performance » - ils ne valent qu'en dénominateur d'un ratio d'efficience. « Agents formés » et « réunions tenues » décrivent des ressources ou des activités ; « crédits consommés » mesure l'exécution financière, pas les résultats. La démarche exige de combiner indicateurs de produits, de qualité de service et de résultats (efficacité socio-économique), l'efficience rapportant les moyens aux produits - par exemple le coût du kilomètre bitumé. L'art. 43 LOFIP l'impose juridiquement : les résultats attendus font « l'objet d'une évaluation au moyen d'indicateurs de performance ». Conséquence en aval : un RAP construit sur ces seuls indicateurs de moyens ne peut pas comparer prévision et réalisation en termes de résultats - il se réduit à un compte d'exécution financière, quand l'art. 82 pt. 4 exige un « rapport annuel de performance par programme rendant compte de leur gestion et de leurs résultats »." },
      { num: 4, enonce: "Analysez les anomalies du volet investissement (absence de distinction AE/CP ; projet de 12 millions USD sans fiche).", correction: "(1) La présentation globale sans distinction AE/CP méconnaît la structure légale des crédits : ils « sont constitués d'autorisations d'engagement et de crédits de paiement », les AE plafonnant les engagements et les CP les paiements de l'année (art. 42 ; définitions art. 3 pt. 2 et 17), et la loi de finances fixe par programme les AE annuelles et pluriannuelles ainsi que les CP (art. 22). Sans cette dissociation, le Parlement ne voit ni le coût total des engagements pluriannuels ni la charge de trésorerie de l'exercice - et le « reste à payer », que le RAP doit faire ressortir, devient incalculable. (2) Le projet de 12 millions USD sans fiche projet contourne le cycle du décret n° 23/18 du 31 mai 2023 : identification, inscription à la banque des projets (art. 14), évaluation ex-ante, programmation - le gabarit officiel de fiche projet du Ministère du Plan structure ces informations minimales. Sans fiche, pas de validation par les instances du PIP - au premier chef le COPIP, présidé par le Ministre du Plan (art. 36-38) -, risque de double inscription, et impossibilité de suivi. Le canevas PAP/RAP exige au surplus une présentation individuelle des projets de plus de 10 millions de dollars, avec coût total, tranches engagées et besoins futurs de CP : le campus y échappe irrégulièrement." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue5',
  numero: 5,
  id: 'ue5-chapitre-5',
  titre: 'Élaboration et adoption du budget',
  sousTitre: 'LOFIP n° 11/011 du 13 juillet 2011 (mod. 2018 et 2023), art. 13, 76-87 · Guide PAP/RAP 2021 · décrets n° 22/37 et 23/18',
  infoBulle: "Le calendrier budgétaire (CBMT, dépôt du 15 septembre, délais de vote, crédits provisoires, reddition du 15 mai), les acteurs, les états intégrants (art. 78) et les onze documents accompagnants (art. 79 réd. 2023), la recevabilité des amendements (art. 86), le quitus (art. 87) et la fabrique de la performance : PAP/RAP, RPROG et PIP.",
  loiRef: 'Art. 13, 76-87 LOFIP',
  moduleLabel: 'UE 5 · Finances publiques',
  retourRoute: '/ue5-finances-publiques',
  coursId: 'ue5-finances-publiques',
  objectifs: [
    "Maîtriser le calendrier budgétaire : CBMT au 1er juin et débat d'orientation au 15 juin (art. 13 réd. 2023), dépôt du PLF au 15 septembre, délais de 40 et 20 jours, ordonnance-loi, crédits provisoires (art. 83), reddition au 15 mai (art. 84)",
    'Identifier les acteurs et leurs rôles : Premier ministre, Ministres du Budget et des Finances, Parlement, Cour des comptes (art. 77, 85-87)',
    "Distinguer les neuf états intégrants du PLF (art. 78) des onze documents accompagnants (art. 79, réd. loi n° 23/030)",
    "Appliquer les règles de recevabilité financière des amendements et propositions (art. 86 ; art. 127 et 134 Constitution)",
    'Comprendre la reddition des comptes et le quitus parlementaire (art. 81-82, 84, 87)',
    'Connaître la fabrique de la performance : Guide PAP/RAP 2021 (structuration en programmes, indicateurs, canevas, conférences de performance), RPROG et RUOP (décret n° 22/37), PIP et COPIP (décret n° 23/18)',
  ],
  sections: SECTIONS,
  aRetenir: [
    "Calendrier : CBMT transmis à l'Assemblée nationale au plus tard le 1er juin, débat d'orientation budgétaire au 15 juin (art. 13, réd. 2023) ; dépôt du PLF au plus tard le 15 septembre (art. 83 ; art. 126 Const.) ; 40 jours à l'Assemblée, 20 au Sénat ; à défaut de vote avant l'exercice, ordonnance-loi de mise en vigueur ; non-dépôt au 1er décembre = Gouvernement réputé démissionnaire, avec crédits provisoires (dépôt avant le 15 décembre, exécution jusqu'au 31 janvier ou jusqu'au vote de la LF).",
    "Le Ministre du Budget prépare, sous l'autorité du Premier ministre, le PLF, le projet de crédits provisoires et la LFR ; le Ministre des Finances élabore le projet de loi portant reddition des comptes (art. 77) ; les recettes sont votées par titre, les dépenses par ministère et par programme (art. 85).",
    "Neuf états font partie intégrante du PLF (art. 78) - dont l'équilibre budgétaire et financier, le CDMT à trois ans et les plafonds d'emplois ; onze documents l'accompagnent (art. 79, réd. 2023) - dont les PAP, le plan de trésorerie, le PIP, le rapport sur les dépenses fiscales et la déclaration sur les risques budgétaires.",
    "Aucun amendement diminuant les recettes ou accroissant les dépenses sans compensation (art. 86 ; art. 127 Const.) ; l'irrecevabilité vaut toute l'année pour toute initiative parlementaire (art. 134 Const.) ; on ne crée pas de programme par amendement (art. 43, 50).",
    "La reddition des comptes est déposée au plus tard le 15 mai (art. 84), accompagnée du rapport de la Cour des comptes et du RAP (art. 82) ; son examen précède obligatoirement le vote de la LF suivante et son approbation vaut quitus de la gestion du Gouvernement (art. 87).",
    "Le Guide PAP/RAP (juillet 2021, COREF) structure la performance : cinq étapes de structuration, 4 à 5 programmes par ministère en moyenne, indicateurs de moyens/produits/qualité/résultats avec l'efficience en ratio - les indicateurs de moyens seuls ne sont pas des indicateurs de performance ; conférences de performance et revue des dépenses en deuxième quinzaine d'avril ; canevas tabulés P-I/P-II.k (PAP) et R-I/R-II.k (RAP), avec présentation individuelle des projets de plus de 10 millions USD et calcul du reste à payer sur les AE.",
    "Le décret n° 22/37 du 5 août 2022 institue la chaîne managériale : le RPROG détermine les objectifs spécifiques, affecte les moyens et contrôle les résultats ; le RUOP propose la programmation et les mouvements de crédits de son unité ; le dialogue de gestion suit la charte de gestion.",
    "Le PIP, triennal glissant, accompagne le PLF (art. 79 pt. 8) ; le décret n° 23/18 du 31 mai 2023 organise le cycle des projets, la banque des projets, le fonds de préinvestissement (5%), le crédit de suivi (2%) et le COPIP présidé par le Ministre du Plan ; la mécanique AE/CP (art. 3, 22, 42) permet l'investissement pluriannuel sous contrôle annuel.",
  ],
  references: [
    {
      genre: 'texte',
      intitule: 'Loi n° 11/011 du 13 juillet 2011 relative aux finances publiques (LOFIP)',
      precision: 'telle que modifiée par la loi n° 18/010 du 9 juillet 2018 et par la loi n° 23/030 du 28 juin 2023 ; art. 13, 26-31, 42-53 et 76-87',
    },
    {
      genre: 'texte',
      intitule: 'Constitution de la République Démocratique du Congo du 18 février 2006',
      precision: 'telle que modifiée par la loi n° 11/002 du 20 janvier 2011 ; art. 126-127, 134, 138 et 180',
    },
    {
      genre: 'texte',
      intitule: "Guide d'élaboration du Projet Annuel de Performance et du Rapport Annuel de Performance (PAP/RAP)",
      precision: 'Ministère du Budget et Ministère des Finances, sous l\'encadrement technique du COREF, Kinshasa, juillet 2021',
    },
    {
      genre: 'texte',
      intitule: 'Décret n° 22/37 du 5 août 2022 portant gouvernance budgétaire',
      precision: 'partie 4 : acteurs de la gestion de programme (RPROG, RUOP), dialogue et charte de gestion',
    },
    {
      genre: 'texte',
      intitule: 'Décret n° 23/18 du 31 mai 2023 relatif à la gestion des investissements publics',
      precision: 'cycle des projets, banque des projets (art. 14), fonds de préinvestissement, COPIP (art. 36-38)',
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : LOFIP n° 11/011 du 13 juillet 2011 (mod. lois n° 18/010 et n° 23/030), art. 13, 26-31, 42-53, 76-87 · Constitution, art. 126-127, 134 · Guide PAP/RAP (COREF, juillet 2021) · décret n° 22/37 du 5 août 2022 · décret n° 23/18 du 31 mai 2023 · LF n° 25/060 (2026)',
}

export default chapitre
