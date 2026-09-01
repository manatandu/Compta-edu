// Chapitre 3 du module UE5, Finances publiques : contenu pur.
// Migré depuis l'ancienne page dédiée UE5Chapitre3Page.tsx vers le moteur
// commun components/chapitre/ChapitreManuscrit.tsx, avec vérification sur
// les textes : LOFIP n° 11/011 du 13 juillet 2011 (art. 14-97 relus en
// intégralité) telle que modifiée par les lois n° 18/010 et n° 23/030 ;
// lois de finances 2025 (n° 24/011), rectificative n° 25/044 et 2026
// (n° 25/060). Corrections majeures : tous les chiffres présentés comme
// « budget 2025 » étaient faux (45 376,9 / 789,0 / 3 680,8 / total
// 49 846,8 Mds FC ; provinces 9 131,9 ; péréquation 2 283,0) - les
// montants réels de la LF 2025 sont 46 799,7 / 903,0 / 3 850,9 / total
// 51 553,5 Mds FC (art. 7), provinces 9 505,8 Mds (art. 9), péréquation
// 2 376,5 Mds (art. 10) ; le « dépôt de la reddition des comptes avant le
// 30 juin (art. 28 al. 1) » était fabriqué - l'art. 84 fixe le dépôt au
// plus tard le 15 mai, et le rapport de la Cour des comptes accompagne le
// projet en vertu de l'art. 82 pt 3 ; les « recettes fiscales / non
// fiscales » prêtées à l'art. 33 relèvent en réalité de l'art. 34
// (recettes courantes, en capital, exceptionnelles ; ressources internes
// et extérieures) ; la statistique d'exécution ODEP (17,1% / 4% au T1
// 2025) est conservée mais signalée comme donnée externe non vérifiable
// dans les textes.
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch3-q1', question: "Selon l'Art. 20 LOFIP, le budget du pouvoir central comprend :",
    options: [
      { id: 'a', texte: 'Uniquement le budget général' },
      { id: 'b', texte: 'Le budget général, les budgets annexes et les comptes spéciaux' },
      { id: 'c', texte: 'Le budget général et les budgets provinciaux' },
      { id: 'd', texte: 'Les budgets annexes et les comptes spéciaux uniquement' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 20 LOFIP',
    explication: "L'Art. 20 dispose que le budget du pouvoir central « comprend le budget général, les budgets annexes et les comptes spéciaux tels que définis aux articles 55 et 62 de la présente loi ». Trois composantes - les budgets provinciaux, eux, ne sont consolidés qu'au niveau du Budget de l'État (Art. 6).",
  },
  {
    id: 'ch3-q2', question: 'Quel est le montant du budget du pouvoir central arrêté par la loi de finances initiale pour 2025 (n° 24/011) ?',
    options: [
      { id: 'a', texte: '40 986,0 milliards FC' },
      { id: 'b', texte: '51 553,5 milliards FC' },
      { id: 'c', texte: '50 691,8 milliards FC' },
      { id: 'd', texte: '54 335,8 milliards FC' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 7 LF 2025 · LFR n° 25/044 · Art. 6 LF 2026',
    explication: "La LF initiale 2025 (art. 7) arrête le budget en équilibre à 51 553 541 670 141 FC : budget général 46 799,7 milliards, budgets annexes 903,0 milliards, comptes spéciaux 3 850,9 milliards. La LFR n° 25/044 du 28 juin 2025 l'a ramené à 50 691,8 milliards, et la LF 2026 (n° 25/060, art. 6) porte le budget 2026 à 54 335,8 milliards.",
  },
  {
    id: 'ch3-q3', question: "Selon l'Art. 38 LOFIP, quelle est la règle générale applicable aux crédits budgétaires ?",
    options: [
      { id: 'a', texte: 'Les crédits sont évaluatifs par défaut' },
      { id: 'b', texte: 'Les crédits sont limitatifs par défaut' },
      { id: 'c', texte: 'Les crédits sont provisionnels par défaut' },
      { id: 'd', texte: "Les crédits n'ont aucune limite fixée à l'avance" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 38 LOFIP',
    explication: "L'Art. 38 : « Sous réserve des dispositions des articles 39 et 40 de la présente loi, les crédits budgétaires sont limitatifs. Les dépenses sur crédits limitatifs ne peuvent être engagées ni ordonnancées au-delà des dotations budgétaires. » Les crédits évaluatifs (Art. 39) et provisionnels (Art. 40) sont les deux seules exceptions.",
  },
  {
    id: 'ch3-q4', question: "Combien de titres compte la nomenclature des charges budgétaires selon l'Art. 37 LOFIP ?",
    options: [
      { id: 'a', texte: '5 titres' },
      { id: 'b', texte: '6 titres' },
      { id: 'c', texte: '8 titres' },
      { id: 'd', texte: '9 titres' },
    ],
    reponseCorrecte: 'd', articleRef: 'Art. 37 LOFIP',
    explication: "Neuf titres : six pour les dépenses courantes (I dette publique en capital, II frais financiers, III personnel, IV biens et matériels, V prestations, VI transferts et interventions), deux pour les dépenses en capital (VII équipements, VIII construction/réfection/réhabilitation/acquisition immobilière) et un pour les prêts et avances (IX).",
  },
  {
    id: 'ch3-q5', question: "Selon l'Art. 16 LOFIP, qu'est-il interdit au pouvoir central, aux provinces et aux ETD ?",
    options: [
      { id: 'a', texte: "D'emprunter auprès des banques étrangères" },
      { id: 'b', texte: 'De recourir aux avances de la Banque centrale du Congo' },
      { id: 'c', texte: 'De voter un budget en déficit' },
      { id: 'd', texte: "D'accorder des subventions aux provinces" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 16 LOFIP',
    explication: "L'Art. 16 : « Le recours aux avances de la Banque Centrale du Congo est prohibé tant pour le pouvoir central que pour la province et l'entité territoriale décentralisée. » Le but est d'éviter le financement monétaire du déficit, source d'inflation, et de préserver l'indépendance de la politique monétaire (l'art. 176 de la Constitution garantit l'autonomie de la BCC).",
  },
  {
    id: 'ch3-q6', question: "Quelle condition un service doit-il remplir pour être doté d'un budget annexe (Art. 56 LOFIP) ?",
    options: [
      { id: 'a', texte: 'Être doté de la personnalité juridique et produire des services' },
      { id: 'b', texte: 'Être un service du pouvoir central sans personnalité juridique, produisant des biens ou services rémunérés par redevances' },
      { id: 'c', texte: 'Être une entreprise publique générant des bénéfices' },
      { id: 'd', texte: "Être un établissement public sous tutelle d'un ministère" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 56 LOFIP',
    explication: "Deux conditions cumulatives : être un service du pouvoir central non doté de la personnalité juridique, et s'adonner à titre principal à une activité de production de biens ou de prestations de services rémunérés sous forme de redevances. Un établissement public, doté de la personnalité juridique, ne peut pas relever d'un budget annexe. La LF 2025 en donne les exemples réels : enseignement supérieur et universitaire, santé publique, organismes reclassés.",
  },
  {
    id: 'ch3-q7', question: "Selon l'Art. 34 LOFIP, les recettes courantes du pouvoir central comprennent notamment :",
    options: [
      { id: 'a', texte: 'Les tirages sur emprunts extérieurs' },
      { id: 'b', texte: "Le produit des impôts et taxes, le revenu du domaine, les recettes administratives et judiciaires, le produit des amendes" },
      { id: 'c', texte: 'Les dons et legs intérieurs projets' },
      { id: 'd', texte: 'Le produit des cessions du domaine' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 34 LOFIP',
    explication: "L'Art. 34 classe les ressources budgétaires en ressources internes (recettes courantes, en capital, exceptionnelles) et ressources extérieures. Les recettes courantes regroupent le produit des impôts et taxes, le revenu du domaine et des participations financières, les recettes administratives et judiciaires, redevances et taxes rémunératoires, le produit des amendes et les produits divers. Les cessions du domaine sont des recettes en capital ; emprunts, dons et legs sont des recettes exceptionnelles.",
  },
  {
    id: 'ch3-q8', question: "Selon l'Art. 65 LOFIP, le total des dépenses d'un compte d'affectation spéciale ne peut excéder :",
    options: [
      { id: 'a', texte: 'Le plafond fixé par le Ministre du Budget' },
      { id: 'b', texte: 'Le total des recettes constatées (sauf pendant les trois mois suivant sa création)' },
      { id: 'c', texte: '80% des recettes prévues par la loi de finances' },
      { id: 'd', texte: 'Le montant autorisé par la Cour des comptes' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 65 LOFIP',
    explication: "L'Art. 65 : « Le total des dépenses engagées ou ordonnancées au titre d'un compte d'affectation spéciale ne peut excéder le total des recettes constatées, sauf pendant les trois mois suivant sa création. Durant cette période, le découvert ne peut être supérieur à un montant fixé par la loi de finances créant le compte. » Le critère est l'encaissement effectif, non la prévision.",
  },
  {
    id: 'ch3-q9', question: 'Quelle est la dotation constitutionnelle allouée aux provinces sur les recettes à caractère national, et son montant dans la LF 2025 ?',
    options: [
      { id: 'a', texte: '30% - soit 7 694,5 milliards FC' },
      { id: 'b', texte: '40% - soit 9 505,8 milliards FC' },
      { id: 'c', texte: '40% - soit 2 376,5 milliards FC' },
      { id: 'd', texte: '50% - soit 9 131,9 milliards FC' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 24 LOFIP · Art. 175 Constitution · Art. 9 LF 2025',
    explication: "L'Art. 24 LOFIP charge la loi de finances de fixer « globalement la dotation de 40% des recettes à caractère national allouées aux provinces conformément à la Constitution » (Art. 175 al. 2 : 40%, retenus à la source). La LF 2025 (art. 9) l'arrête à 9 505 807 311 963 FC ; la LF 2026 (art. 8) à 7 694,5 milliards. La Caisse nationale de péréquation reçoit en sus 2 376,5 milliards en 2025 (art. 10) et 744,6 milliards en 2026 (art. 9 LF 2026).",
  },
  {
    id: 'ch3-q10', question: "Selon l'Art. 57 LOFIP, les budgets annexes sont présentés en :",
    options: [
      { id: 'a', texte: '1 section (opérations globales)' },
      { id: 'b', texte: '2 sections : opérations courantes et opérations en capital' },
      { id: 'c', texte: '3 sections : recettes, dépenses, trésorerie' },
      { id: 'd', texte: '4 sections : personnel, fonctionnement, investissement, dette' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 57 LOFIP',
    explication: "L'Art. 57 : « Les budgets annexes sont présentés en deux sections. La section des opérations courantes et celle des opérations en capital. » La première retrace les recettes et dépenses d'exploitation, la seconde les dépenses d'investissement et les ressources qui leur sont affectées.",
  },
  {
    id: 'ch3-q11', question: "Un ministre veut affecter des crédits du budget annexe de son service au budget général pour financer une urgence. Cette décision est :",
    options: [
      { id: 'a', texte: "Légale si le Premier ministre l'autorise par décret" },
      { id: 'b', texte: "Légale si la Cour des comptes l'approuve" },
      { id: 'c', texte: "Illégale : l'Art. 58 LOFIP interdit tout mouvement de crédits entre un budget annexe et le budget général" },
      { id: 'd', texte: "Légale en cas d'urgence nationale déclarée" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 58 LOFIP',
    explication: "L'Art. 58 est catégorique : « Aucun des mouvements de crédits prévus aux articles 46 à 50 de la présente loi ne peut être effectué ni entre un budget annexe et le budget général auquel il est rattaché, ni entre budgets annexes. » L'Art. 59 pose la même étanchéité pour les comptes spéciaux dotés de crédits. Aucune exception, même en cas d'urgence.",
  },
  {
    id: 'ch3-q12', question: "Selon l'Art. 67 LOFIP, le taux d'intérêt des prêts et avances des comptes de concours financiers doit être :",
    options: [
      { id: 'a', texte: 'Égal au taux directeur de la BCC' },
      { id: 'b', texte: 'Au plus égal au taux interbancaire de même échéance' },
      { id: 'c', texte: 'Fixé à 0% (prêts sans intérêt)' },
      { id: 'd', texte: 'Fixé librement par le Ministre des Finances' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 67 LOFIP',
    explication: "L'Art. 67 : les prêts et avances sont accordés pour une durée déterminée et, excepté les avances sur dépenses de personnel, « assortis d'un taux d'intérêt qui doit être au plus égal au taux interbancaire de même échéance, ou, à défaut, d'échéance la plus proche, fixé par arrêté du ministre ayant les finances dans ses attributions ». Le plafond de référence est le taux interbancaire, non le taux directeur.",
  },
  {
    id: 'ch3-q13', question: "Un compte d'affectation spéciale vient d'être créé. Ses dépenses peuvent excéder ses recettes constatées pendant :",
    options: [
      { id: 'a', texte: 'Jamais, même à la création' },
      { id: 'b', texte: 'Les trois premiers mois suivant sa création, dans la limite du découvert fixé par la loi de finances créant le compte' },
      { id: 'c', texte: 'La première année budgétaire complète' },
      { id: 'd', texte: "Tant que le Parlement n'a pas voté de LFR" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 65 LOFIP',
    explication: "L'exception de l'Art. 65 est doublement bornée : dans le temps (les trois mois suivant la création du compte) et dans le montant (le découvert ne peut dépasser le plafond fixé par la loi de finances créant le compte - l'Art. 22 prévoit d'ailleurs que la loi de finances fixe, par compte spécial, les découverts exceptionnellement autorisés). Au-delà, les dépenses sont plafonnées aux recettes effectivement constatées.",
  },
  {
    id: 'ch3-q14', question: "En cas de non-remboursement d'un prêt ou d'une avance (Art. 68 LOFIP), quelles options s'offrent au pouvoir central ?",
    options: [
      { id: 'a', texte: 'Uniquement la saisie des biens du débiteur' },
      { id: 'b', texte: "Recouvrement immédiat (ou poursuites administratives dans les 6 mois), rééchelonnement, ou constatation d'une perte probable" },
      { id: 'c', texte: 'Annulation automatique de la dette après 5 ans' },
      { id: 'd', texte: 'Saisine exclusive de la Cour constitutionnelle' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 68 LOFIP',
    explication: "L'Art. 68 prévoit trois issues pour toute échéance non respectée : une décision de recouvrement immédiat ou, à défaut de paiement, des poursuites effectives par voie administrative engagées dans les six mois ; une décision de rééchelonnement ; ou la constatation d'une perte probable, objet d'une disposition particulière de la loi de finances et imputée au résultat de l'exercice - les remboursements ultérieurs étant portés en recettes au budget général.",
  },
  {
    id: 'ch3-q15', question: 'Selon l\'Art. 30 LOFIP, le compte de résultats établi par la loi portant reddition des comptes comprend :',
    options: [
      { id: 'a', texte: "Uniquement les recettes fiscales de l'exercice" },
      { id: 'b', texte: 'Le déficit ou excédent du budget général et des budgets annexes, les profits et pertes des comptes spéciaux et ceux des opérations de trésorerie' },
      { id: 'c', texte: "Uniquement les dépenses d'investissement réalisées" },
      { id: 'd', texte: "Le bilan patrimonial de l'État" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 30 LOFIP',
    explication: "L'Art. 30 : le compte de résultats comprend le déficit ou l'excédent résultant de la différence entre les recettes et les dépenses du budget général et des budgets annexes, les profits et pertes constatés dans l'exécution des comptes spéciaux, et ceux résultant éventuellement de la gestion des opérations de trésorerie. Les résultats définitifs sont inscrits au compte consolidé des soldes des gestions budgétaires.",
  },
  {
    id: 'ch3-q16', question: 'Combien de catégories de lois de finances l\'Art. 18 LOFIP reconnaît-il ?',
    options: [
      { id: 'a', texte: 'Deux : loi de finances de l\'année et LFR' },
      { id: 'b', texte: 'Trois : loi de finances de l\'année, LFR et loi portant reddition des comptes' },
      { id: 'c', texte: "Quatre : loi de finances de l'année, LFR, loi portant reddition des comptes et loi portant ouverture de crédits provisoires" },
      { id: 'd', texte: 'Une seule : la loi de finances de l\'année' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 18 LOFIP',
    explication: "L'Art. 18 : « Ont le caractère de loi de finances : la loi de finances de l'année ; les lois de finances rectificatives ; la loi portant reddition des comptes ; la loi portant ouverture de crédits provisoires. » Quatre espèces, toutes soumises au régime des lois de finances (élaboration par le Ministre du Budget - sauf la reddition des comptes, supervisée par le Ministre des Finances, art. 28 et 77 - et vote parlementaire).",
  },
  {
    id: 'ch3-q17', question: "À quelle date le projet de loi de finances de l'année doit-il être déposé au bureau de l'Assemblée nationale ?",
    options: [
      { id: 'a', texte: 'Au plus tard le 1er juin' },
      { id: 'b', texte: 'Au plus tard le 15 septembre' },
      { id: 'c', texte: 'Au plus tard le 15 décembre' },
      { id: 'd', texte: 'Au plus tard le 31 octobre' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 83 LOFIP · Art. 126 Constitution',
    explication: "L'Art. 83 LOFIP, en écho à l'art. 126 de la Constitution : dépôt au plus tard le 15 septembre de chaque année. L'Assemblée nationale dispose de 40 jours pour adopter le projet, puis le Sénat de 20 jours. À défaut de vote avant l'ouverture de l'exercice, le projet est mis en vigueur par ordonnance-loi du Président de la République, compte tenu des amendements votés. Le 1er juin est la date de transmission du CBMT (art. 13), le 15 décembre celle du dépôt du projet de crédits provisoires.",
  },
  {
    id: 'ch3-q18', question: 'À quelle date le projet de loi portant reddition des comptes du dernier exercice clos doit-il être déposé ?',
    options: [
      { id: 'a', texte: "Au plus tard le 31 mars de l'année suivante" },
      { id: 'b', texte: "Au plus tard le 15 mai de l'année suivante" },
      { id: 'c', texte: "Au plus tard le 30 juin de l'année suivante" },
      { id: 'd', texte: "Au plus tard le 15 septembre de l'année suivante" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 84 et 87 LOFIP',
    explication: "L'Art. 84 : dépôt à l'Assemblée nationale « au plus tard le 15 mai de l'année suivant celle de l'exécution du budget auquel il se rapporte » ; en cas d'impossibilité, le projet et le rapport de la Cour des comptes sont déposés avant la fin de la session ordinaire de mars. L'Art. 87 impose son examen préalable au vote de la loi de finances de l'année suivante - l'approbation des comptes vaut quitus de la gestion du Gouvernement.",
  },
  {
    id: 'ch3-q19', question: 'Selon l\'Art. 85 LOFIP, comment les dépenses du budget du pouvoir central sont-elles votées ?',
    options: [
      { id: 'a', texte: 'En un vote unique sur le montant global' },
      { id: 'b', texte: 'Par ministère ou institution et par programme' },
      { id: 'c', texte: 'Par province et par territoire' },
      { id: 'd', texte: 'Par titre de dépenses uniquement' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 85 LOFIP',
    explication: "L'Art. 85 : les évaluations de recettes font l'objet d'un vote d'ensemble pour le titre sous lequel elles sont regroupées, et d'un vote par budget annexe et par compte spécial ; « les dépenses du budget du pouvoir central sont votées par ministère ou institution et par programme ». Le niveau de vote épouse donc la structure programmatique du budget.",
  },
  {
    id: 'ch3-q20', question: 'Sauf disposition contraire d\'une loi de finances, le solde de chaque compte spécial est, en fin d\'exercice :',
    options: [
      { id: 'a', texte: 'Annulé, comme les crédits non consommés du budget général' },
      { id: 'b', texte: "Reporté sur l'année suivante" },
      { id: 'c', texte: 'Reversé automatiquement au budget général' },
      { id: 'd', texte: 'Transféré à la Caisse nationale de péréquation' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 61 LOFIP',
    explication: "L'Art. 61 : « Sauf dispositions contraires prévues par une loi de finances, le solde de chaque compte spécial est reporté sur l'année suivante. » Régime inverse de celui du budget général, où la loi portant reddition des comptes annule la différence entre crédits ouverts et dépenses payées au 31 décembre, augmentée des crédits reportés (Art. 29). Toutefois, les résultats des comptes - à l'exception des comptes d'affectation spéciale - sont imputés au résultat de l'année.",
  },
  {
    id: 'ch3-q21', question: "L'Art. 41 LOFIP exige que toute ouverture de crédits supplémentaires soit accompagnée de :",
    options: [
      { id: 'a', texte: 'Un décret du Président de la République' },
      { id: 'b', texte: "La prévision des voies et moyens nécessaires et d'un rapport adressé au Parlement par le Premier ministre" },
      { id: 'c', texte: 'Une simple note du Ministre du Budget' },
      { id: 'd', texte: "L'accord préalable de la Banque centrale du Congo" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 41 LOFIP',
    explication: "L'Art. 41 : « Toute ouverture de crédits supplémentaires prévoit les voies et moyens nécessaires à leur exécution et s'accompagne d'un rapport adressé au Parlement par le Premier ministre. » Aucun crédit supplémentaire sans financement identifié : c'est le prolongement du principe d'équilibre de l'Art. 14.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '3.1',
    titre: 'Les lois de finances : quatre espèces, un monopole',
    navLabel: 'Lois de finances',
    blocs: [
      { type: 'paragraphe', texte: "Avant d'entrer dans la structure du budget, il faut situer son véhicule juridique. Les lois de finances « déterminent, pour un exercice, la nature, le montant et l'affectation des ressources et des charges de l'État compte tenu d'un équilibre économique et financier qu'elles définissent » (art. 17). Elles tiennent compte des priorités du programme de développement économique et social du Gouvernement, et concernent les finances du pouvoir central (art. 19)." },
      { type: 'carte', titre: "Les quatre catégories de lois de finances (art. 18)", tableau: {
        entetes: ['Loi', 'Objet', 'Articles'],
        lignes: [
          ["**Loi de finances de l'année**", "Contient, pour une année civile, toutes les ressources et charges du pouvoir central - le budget - avec leur évaluation en objectifs et résultats attendus ; déposée au plus tard le 15 septembre", 'Art. 20-25, 83'],
          ['**Loi de finances rectificative**', "Seule voie, sous réserve des exceptions des art. 48, 49, 53, 64, 70, 94 et 108, pour modifier en cours d'année la loi de finances de l'année ; ratifie le cas échéant les modifications intervenues", 'Art. 26-27'],
          ['**Loi portant reddition des comptes**', "Constate les résultats définitifs de l'exécution, arrête le compte général, règle définitivement le budget, annule les crédits non consommés ; déposée au plus tard le 15 mai, examinée avant le vote de la LF suivante - son approbation vaut quitus du Gouvernement", 'Art. 28-30, 84, 87'],
          ['**Loi portant ouverture de crédits provisoires**', "Autorise recettes et dépenses « nécessaires au fonctionnement minimum des services publics » quand la LF de l'année ne peut être promulguée avant l'exercice ; déposée avant le 15 décembre, exécutée jusqu'au 31 janvier", 'Art. 31, 83'],
        ],
      } },
      { type: 'paragraphe', texte: "La loi de finances de l'année fixe, par ministère ou institution et par programme - ou par dotation depuis la loi n° 23/030 -, les autorisations d'engagement et les crédits de paiement, ainsi que les plafonds d'autorisations d'emplois rémunérés (art. 22). Elle autorise l'octroi des garanties de l'État et la prise en charge des dettes de tiers (art. 23), fixe les plafonds des charges de chaque composante du budget, arrête les données générales de l'équilibre et fixe globalement la dotation de 40% des recettes à caractère national allouées aux provinces (art. 24). Deux garde-fous encadrent l'ensemble : le budget est présenté **en équilibre** (art. 14) et **les avances de la Banque centrale du Congo sont prohibées** (art. 16) - pour tous les étages, pouvoir central, provinces et ETD." },
      { type: 'filet', titre: 'Recevabilité financière des amendements', texte: "L'art. 86 LOFIP, reprenant les art. 127 et 134 de la Constitution, déclare irrecevables les amendements dont l'adoption entraînerait une diminution des recettes ou un accroissement des dépenses, à moins d'être assortis de propositions compensatoires. Le Parlement autorise - il ne peut pas déséquilibrer ce qu'il autorise." },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[16] },
      { type: 'controle', question: QCM[17] },
    ],
  },
  {
    numero: '3.2',
    titre: 'La structure tripartite du budget du pouvoir central',
    navLabel: 'Structure tripartite',
    blocs: [
      { type: 'paragraphe', texte: "L'art. 20 de la LOFIP dispose que la loi de finances de l'année « contient, pour une année civile, toutes les ressources et toutes les charges du pouvoir central qui traduisent, à travers un document unique appelé budget du pouvoir central, le plan d'actions du Gouvernement, ainsi que son évaluation en termes d'objectifs et de résultats attendus », et que ce budget « comprend le budget général, les budgets annexes et les comptes spéciaux tels que définis aux articles 55 et 62 »." },
      { type: 'carte', titre: 'Les trois composantes', liste: [
        "**Le budget général** - la composante principale : il retrace l'ensemble des ressources et des charges ordinaires, présentées par ministère ou institution et par programme ou dotation (art. 22), votées par ministère ou institution et par programme (art. 85).",
        "**Les budgets annexes** - services du pouvoir central sans personnalité juridique produisant des biens ou services contre redevances (art. 55-58) ; chaque budget annexe constitue un programme.",
        "**Les comptes spéciaux** - comptes d'affectation spéciale et comptes de concours financiers, ouverts uniquement par une loi de finances (art. 59-68).",
      ] },
      { type: 'carte', titre: 'Le budget du pouvoir central en chiffres (milliards FC)', tableau: {
        entetes: ['Composante', 'LF 2025 (n° 24/011)', 'LFR 2025 (n° 25/044)', 'LF 2026 (n° 25/060)'],
        lignes: [
          ['Budget général', '46 799,7', '45 749,6', '48 969,3'],
          ['Budgets annexes', '903,0', '903,0', '962,3'],
          ['Comptes spéciaux', '3 850,9', '4 039,2', '4 404,2'],
          ['**Total en équilibre**', '**51 553,5**', '**50 691,8**', '**54 335,8**'],
        ],
      }, note: "Montants des art. 7 LF 2025, de la LFR n° 25/044 et des art. 6-7 LF 2026 et de leurs annexes I. Le budget général représente ainsi environ 90% du total, les comptes spéciaux 8% et les budgets annexes moins de 2%." },
      { type: 'filet', titre: "Étanchéité des composantes (art. 58 et 59)", texte: "Aucun des mouvements de crédits des art. 46 à 50 - virements et transferts - ne peut être effectué entre un budget annexe et le budget général, ni entre budgets annexes (art. 58) ; ni entre un compte spécial doté de crédits et le budget auquel il est rattaché, ni entre comptes spéciaux dotés de crédits (art. 59). Cette étanchéité garantit que l'affectation votée par le Parlement n'est pas défaite par l'administration." },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[10] },
    ],
  },
  {
    numero: '3.3',
    titre: 'Les ressources et les charges du pouvoir central',
    navLabel: 'Ressources · charges',
    blocs: [
      { type: 'paragraphe', texte: "L'art. 32 distingue deux masses : « Les ressources et les charges du pouvoir central comprennent les ressources et les charges budgétaires ainsi que les ressources et les charges de trésorerie. » Les ressources et charges budgétaires sont retracées dans le budget sous forme de recettes et de dépenses (art. 33) ; les opérations de trésorerie - mouvement des disponibilités, émission et remboursement des emprunts à court terme - relèvent des art. 74-75 et ne se confondent pas avec le budget." },
      { type: 'carte', titre: "La classification légale des ressources budgétaires (art. 34)", tableau: {
        entetes: ['Catégorie', 'Contenu'],
        lignes: [
          ['**Recettes courantes** (ressources internes)', "Produit des impôts et taxes (fiscalité directe et indirecte) ; revenu du domaine, des participations financières et autres actifs - dont la part de l'État dans le bénéfice des entreprises publiques ; recettes administratives et judiciaires, redevances et taxes rémunératoires ; produit des amendes ; produits divers"],
          ['**Recettes en capital** (ressources internes)', 'Produit des cessions du domaine ; produit des cessions de participations financières et autres actifs et droits'],
          ['**Recettes exceptionnelles** (ressources internes)', "Dons et legs intérieurs courants et projets ; remboursement des prêts et avances ; produit des emprunts intérieurs"],
          ['**Ressources extérieures**', 'Dons et legs extérieurs courants et projets ; tirages sur emprunts extérieurs'],
        ],
      }, note: "Le rendement des impôts, droits et taxes est évalué par les lois de finances, comme les amendes, rémunérations pour services rendus, revenus du domaine, emprunts et dons (art. 35). En pratique, trois régies mobilisent ces recettes : la DGI (impôts), la DGDA (douanes et accises) et la DGRAD (recettes administratives, judiciaires, domaniales et de participations) - la LF 2026 leur assigne respectivement 19 033,6, 7 522,0 et 5 474,6 milliards FC." },
      { type: 'paragraphe', texte: "Côté charges, l'art. 36 les classe « par programme ou dotation, administration, nature économique telles que définies par la nomenclature en vigueur ou suivant toute autre classification présentant un intérêt pour leur analyse, suivi et évaluation » ; elles comprennent les dépenses courantes, les dépenses en capital ainsi que les prêts et avances - la nomenclature détaillée étant l'affaire de l'art. 37 (section suivante)." },
      { type: 'filet', titre: 'La part des provinces et la péréquation', texte: "La loi de finances « fixe globalement la dotation de 40% des recettes à caractère national allouées aux provinces conformément à la Constitution » (art. 24 ; art. 175 al. 2 de la Constitution : 40%, retenus à la source) et établit leur répartition conformément aux art. 219 à 221. Dans la LF 2025 : **9 505,8 milliards FC** pour les provinces (art. 9) et **2 376,5 milliards** pour la Caisse nationale de péréquation (art. 10) ; dans la LF 2026 : **7 694,5 milliards** (art. 8) et **744,6 milliards** (art. 9)." },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[4] },
    ],
  },
  {
    numero: '3.4',
    titre: 'La nomenclature des dépenses : les neuf titres',
    navLabel: 'Neuf titres',
    blocs: [
      { type: 'paragraphe', texte: "L'art. 37 constitue la colonne vertébrale de la présentation des dépenses. Il groupe les **dépenses courantes** sous six titres, les **dépenses en capital** sous deux titres et les **prêts et avances** sous un titre - neuf grandes natures au total, auxquelles renvoie le principe de spécialité de l'art. 8." },
      { type: 'carte', titre: "Les neuf titres et leur poids dans la LF 2026 (budget général, milliards FC)", tableau: {
        entetes: ['Titre', 'Nature', 'Exemples', 'LF 2026'],
        lignes: [
          ['**I**', 'Dette publique en capital', 'Remboursement du principal des dettes intérieure et extérieure', '2 060,0'],
          ['**II**', 'Frais financiers', 'Intérêts de la dette, commissions', '907,8'],
          ['**III**', 'Dépenses de personnel', 'Traitements de base, dépenses accessoires de personnel', '14 033,0'],
          ['**IV**', 'Biens et matériels', 'Carburant, fournitures, matériels de bureau', '804,7'],
          ['**V**', 'Dépenses de prestations', 'Services externes, loyers, télécommunications, eau, électricité', '6 617,4'],
          ['**VI**', 'Transferts et interventions', 'Subventions aux établissements publics, transferts aux provinces, aides sociales', '8 533,8'],
          ['**VII**', 'Équipements', 'Véhicules, matériels médicaux, engins lourds', '10 804,2'],
          ['**VIII**', "Construction, réfection, réhabilitation, addition d'ouvrage et édifice, acquisition immobilière", 'Routes, bâtiments administratifs, hôpitaux, écoles', '5 208,3'],
          ['**IX**', 'Prêts et avances', 'Concours financiers retracés dans les comptes de concours financiers (art. 66)', '-'],
        ],
      }, note: "Titres I à VI : dépenses courantes. Titres VII-VIII : dépenses en capital. Titre IX : prêts et avances. Montants de l'annexe « synthèse des dépenses par titre » de la LF 2026 (total budget général : 48 969,3 milliards FC)." },
      { type: 'filet', titre: "L'exécution en pratique - donnée externe à manier avec prudence", texte: "Selon le rapport d'exécution budgétaire de l'Observatoire de la Dépense Publique (ODEP) portant sur le premier trimestre 2025, le taux d'exécution global du budget était de 17,1% des crédits votés, et les dépenses d'investissement (titres VII-VIII) n'auraient exécuté que 4% de leurs crédits. Cette statistique, issue d'une organisation de la société civile et non des textes officiels, illustre un déséquilibre récurrent : les dépenses de personnel s'exécutent presque intégralement quand les investissements restent largement inexécutés - au détriment des infrastructures que le budget affiche." },
      { type: 'controle', question: QCM[3] },
    ],
  },
  {
    numero: '3.5',
    titre: 'Les régimes juridiques des crédits : limitatifs, évaluatifs, provisionnels',
    navLabel: 'Régimes des crédits',
    blocs: [
      { type: 'paragraphe', texte: "L'autorisation parlementaire n'a pas partout la même rigidité. L'art. 38 pose la règle : « Sous réserve des dispositions des articles 39 et 40 de la présente loi, les crédits budgétaires sont limitatifs. Les dépenses sur crédits limitatifs ne peuvent être engagées ni ordonnancées au-delà des dotations budgétaires. » Deux exceptions seulement, chacune strictement délimitée." },
      { type: 'carte', titre: 'Les trois régimes comparés', tableau: {
        entetes: ['Critère', 'Limitatifs (art. 38)', 'Évaluatifs (art. 39)', 'Provisionnels (art. 40)'],
        lignes: [
          ['Nature', 'Plafond absolu', 'Simple évaluation', 'Provision pour dépenses accidentelles et imprévisibles'],
          ['Dépassement', '**Interdit**', "**Possible** - avec information du Parlement sur les motifs, et régularisation en LFR", "**Interdit** - en cas d'insuffisance, crédits supplémentaires demandés au Parlement (art. 129 Constitution)"],
          ['Domaine', 'Règle générale (personnel, fonctionnement, investissement...)', 'Charges de la dette du pouvoir central', 'Faits de guerre, catastrophes naturelles, dépenses non chiffrables au moment du vote'],
        ],
      } },
      { type: 'paragraphe', texte: "L'art. 3 complète ces régimes par ses définitions : les crédits provisionnels couvrent « les dépenses liées aux événements dont la survenance ne dépend pas de la volonté de l'administration » - catastrophes naturelles, réception de personnalités étrangères, élections, entretien des détenus (pt. 15) ; les crédits limitatifs sont « les montants plafonnés [...] que les administrations ne peuvent pas dépasser » (pt. 16). Et l'art. 41 verrouille l'ensemble : toute ouverture de crédits supplémentaires « prévoit les voies et moyens nécessaires à leur exécution et s'accompagne d'un rapport adressé au Parlement par le Premier ministre » - pas de crédit nouveau sans financement identifié." },
      { type: 'filet', titre: 'Conséquence pour le gestionnaire', texte: "Engager une dépense au-delà d'un crédit limitatif est une faute de gestion expressément visée par l'art. 129 (« qui aura engagé des dépenses sans disponibilité des crédits »), jugée par la Cour des comptes (art. 131) ; le contrôleur budgétaire doit refuser son visa (art. 112-113) et le comptable public refuser le paiement (art. 119). Seuls les crédits évaluatifs - la dette - échappent au plafond, parce que l'État ne peut pas suspendre le service de sa dette au motif que la dotation est épuisée." },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[20] },
    ],
  },
  {
    numero: '3.6',
    titre: 'Budgets annexes et comptes spéciaux',
    navLabel: 'Annexes · comptes spéciaux',
    blocs: [
      { type: 'paragraphe', texte: "Les budgets annexes (art. 55-58) et les comptes spéciaux (art. 59-68) sont les affectations organisées de l'art. 54 : des dérogations à l'universalité, entièrement sous le contrôle de la loi de finances - leur création, leur suppression et l'affectation d'une recette « ne peuvent résulter que d'une disposition de loi de finances » (art. 55 et 60)." },
      { type: 'carte', titre: 'Les budgets annexes (art. 55-58)', liste: [
        "**Éligibilité (art. 56)** : services du pouvoir central non dotés de la personnalité juridique, s'adonnant à titre principal à une activité de production de biens ou de prestations de services rémunérés sous forme de redevances.",
        "**Équilibre (art. 56)** : versement au budget général en cas d'excédent, subvention en cas de déficit dûment justifié par la situation bilantaire.",
        "**Présentation (art. 57)** : deux sections - opérations courantes (recettes et dépenses d'exploitation) et opérations en capital (investissements et ressources affectées).",
        "**Étanchéité (art. 58)** : aucun virement ni transfert entre un budget annexe et le budget général, ni entre budgets annexes.",
        "**Illustration LF 2025 (art. 87)** : 903,0 milliards FC de budgets annexes - enseignement supérieur et universitaire (425,8 milliards), santé publique (322,3 milliards), organismes reclassés (154,9 milliards).",
      ] },
      { type: 'carte', titre: 'Les comptes spéciaux (art. 59-68)', tableau: {
        entetes: ['Catégorie', 'Objet', 'Règles clés'],
        lignes: [
          ["**Comptes d'affectation spéciale** (art. 62-65)", "Opérations budgétaires financées par des recettes particulières « par nature, en relation directe avec les dépenses concernées »", "Dépenses plafonnées aux recettes constatées, sauf découvert borné pendant les trois mois suivant la création (art. 65) ; aucun versement vers le budget général sauf dérogation expresse (art. 63) ; excédent de recettes en cours d'année → crédits supplémentaires dans la limite de l'excédent, ratifiés en LFR (art. 64)"],
          ['**Comptes de concours financiers** (art. 66-68)', 'Prêts et avances consentis par le pouvoir central à une personne physique ou morale, un compte distinct par débiteur ou catégorie de débiteurs', "Crédits **limitatifs** ; durée déterminée ; taux d'intérêt au plus égal au taux interbancaire de même échéance, sauf avances sur dépenses de personnel (art. 67) ; échéance impayée → recouvrement immédiat (poursuites sous 6 mois), rééchelonnement ou constatation d'une perte imputée au résultat (art. 68)"],
        ],
      }, note: "Sauf dispositions contraires d'une loi de finances, le solde de chaque compte spécial est reporté sur l'année suivante (art. 61) - à la différence des crédits du budget général, que la loi portant reddition des comptes annule (art. 29). Exemple récent : le Fonds d'Investissement Stratégique de la RDC, créé comme compte d'affectation spéciale par l'art. 51 de la LF 2026." },
      { type: 'paragraphe', texte: "Trois **procédures particulières** complètent le dispositif au sein du budget général, d'un budget annexe ou d'un compte spécial (art. 69) : les *fonds de concours* - fonds non fiscaux versés par des tiers pour des dépenses d'intérêt public et produits de legs et donations, portés directement en recettes avec ouverture de crédits de même montant par arrêté du Ministre du Budget, l'emploi devant rester conforme à l'intention de la partie versante (art. 70-71) ; les *attributions de produits* - recettes de prestations régulièrement fournies par un service, affectées à ce service par arrêté (art. 72) ; et le *rétablissement de crédits* - restitution de sommes payées indûment ou à titre provisoire et recettes de cessions de biens et services (art. 73)." },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[19] },
      { type: 'controle', question: QCM[18] },
      { type: 'controle', question: QCM[14] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: 'Classification et exécution : le budget du Ministère de la Santé',
    contexte: "Le directeur de la planification du Ministère de la Santé examine l'exécution du budget de son ministère (données simplifiées, en FC) : titre III (personnel) 12 400 000 000 exécuté à 98% ; titre IV (biens et matériels) 3 200 000 000 exécuté à 45% ; titre V (prestations) 1 800 000 000 exécuté à 62% ; titre VI (transferts : subventions aux hôpitaux) 8 500 000 000 exécuté à 71% ; titre VII (équipements médicaux) 4 100 000 000 exécuté à 8% ; titre VIII (construction d'hôpitaux) 6 000 000 000 exécuté à 3%. En septembre, une épidémie de choléra éclate au Maniema : le ministère demande en urgence 500 000 000 FC pour des médicaments et des équipes mobiles, alors que les crédits du titre IV sont épuisés.",
    questions: [
      { num: 1, enonce: "Calculez les montants exécutés et les restes pour chaque titre. Quel constat structurel faites-vous ?", correction: "Titre III : exécuté 12 152 000 000 FC, reste 248 000 000. Titre IV : exécuté 1 440 000 000, reste 1 760 000 000. Titre V : exécuté 1 116 000 000, reste 684 000 000. Titre VI : exécuté 6 035 000 000, reste 2 465 000 000. Titre VII : exécuté 328 000 000, reste 3 772 000 000. Titre VIII : exécuté 180 000 000, reste 5 820 000 000. Total exécuté : 21 251 000 000 FC sur 36 000 000 000 votés, soit 59%. Le constat : exécution quasi intégrale des dépenses de personnel (98%) contre une sous-exécution dramatique des dépenses en capital (8% et 3% pour les titres VII et VIII de l'art. 37) - un profil que le rapport de l'ODEP sur le premier trimestre 2025 (donnée externe aux textes) retrouvait au niveau national avec 17,1% d'exécution globale et environ 4% pour les investissements. Les dépenses courantes incompressibles absorbent la trésorerie disponible ; les investissements, qui exigent passation de marchés et mobilisation de financements, restent en rade - alors même que le vote du Parlement portait précisément sur cette répartition (art. 85)." },
      { num: 2, enonce: "Le ministre peut-il engager les 500 000 000 FC sur le titre IV épuisé ? Quelles procédures la LOFIP offre-t-elle ?", correction: "Non. Les crédits du titre IV sont limitatifs : « les dépenses sur crédits limitatifs ne peuvent être engagées ni ordonnancées au-delà des dotations budgétaires » (art. 38), et l'art. 10 interdit d'exécuter une dépense sans crédits disponibles. L'engagement au-delà serait une faute de gestion (art. 129), jugée par la Cour des comptes (art. 131). Les voies légales : (1) les crédits provisionnels de l'art. 40 - une épidémie est typiquement une dépense « accidentelle et imprévisible » ; s'ils sont insuffisants, des crédits supplémentaires sont demandés au Parlement conformément à l'art. 129 de la Constitution, toute ouverture devant prévoir ses voies et moyens et s'accompagner d'un rapport du Premier ministre (art. 41) ; (2) un virement de crédits de l'art. 47, par arrêté du Ministre du Budget, depuis un autre titre du même programme - par exemple les crédits de personnel non consommés, le sens personnel → biens et matériels étant permis par la fongibilité asymétrique (art. 3 pt 28), l'inverse étant interdit (art. 51) ; (3) une loi de finances rectificative (art. 26-27) pour les besoins dépassant ces mécanismes - la LFR n° 25/044 du 28 juin 2025 a précisément réajusté les dotations de l'exercice en cours." },
    ],
  },
  {
    id: 'cp2',
    titre: "Le Fonds routier, compte d'affectation spéciale",
    contexte: "Le Fonds routier est financé par une fraction des taxes sur les carburants, retracée dans un compte d'affectation spéciale (données simplifiées) : recettes prévues par la loi de finances 850 milliards FC ; recettes effectivement encaissées à fin septembre 620 milliards ; dépenses engagées à fin septembre 580 milliards ; solde reporté de l'exercice précédent 45 milliards. Le directeur du Fonds passe des commandes supplémentaires de travaux pour 95 milliards, portant les engagements à 675 milliards, au motif que « les recettes prévisionnelles seront atteintes avant fin décembre ».",
    questions: [
      { num: 1, enonce: "Les engagements supplémentaires sont-ils légaux au regard de l'art. 65 LOFIP ?", correction: "Non, pour 10 milliards FC. L'art. 65 dispose que « le total des dépenses engagées ou ordonnancées au titre d'un compte d'affectation spéciale ne peut excéder le total des recettes constatées, sauf pendant les trois mois suivant sa création ». Ressources disponibles : 620 milliards de recettes constatées + 45 milliards de solde reporté en application de l'art. 61 = 665 milliards. Engagements totaux : 580 + 95 = 675 milliards. Dépassement : 10 milliards FC. L'argument des « recettes prévisionnelles » est inopérant : le critère légal est la recette **constatée** - effectivement encaissée -, non la prévision de la loi de finances. Le Fonds n'étant pas nouvellement créé, l'exception des trois mois ne s'applique pas. Si, en cours d'année, les recettes effectives dépassent les évaluations, la voie régulière est l'ouverture de crédits supplémentaires dans la limite de l'excédent constaté, ratifiée dans la prochaine LFR (art. 64) - jamais l'engagement anticipé sur des recettes espérées. Le directeur s'expose à la faute de gestion de l'art. 129 (engagement sans disponibilité des crédits), jugée par la Cour des comptes (art. 131)." },
      { num: 2, enonce: "Quel est le sort du solde du Fonds en fin d'exercice ? En quoi ce régime diffère-t-il de celui du budget général ?", correction: "L'art. 61 pose la règle : « Sauf dispositions contraires prévues par une loi de finances, le solde de chaque compte spécial est reporté sur l'année suivante » - c'est ce qui explique le report des 45 milliards. Le régime du budget général est inverse : la loi portant reddition des comptes « annule la différence entre le montant des crédits ouverts par le budget et le montant de dépenses payées au 31 décembre augmenté de celui des crédits reportés conformément aux articles 53 et 93 » (art. 29) - les crédits non consommés disparaissent, sauf les reports encadrés des art. 53 (AE pluriannuelles et CP, arrêtés conjoints avant le 31 mars) et 93-94 (obligations nées au 31 octobre non payées au 31 décembre). Nuance de l'art. 61 al. 2 : les résultats constatés sur les comptes spéciaux sont imputés au résultat de l'année - à l'exception, précisément, des comptes d'affectation spéciale, dont le report du solde permet de financer des projets pluriannuels comme des travaux routiers étalés sur plusieurs exercices. Enfin, aucun versement ne peut être effectué d'un compte d'affectation spéciale vers le budget général sans dérogation expresse d'une loi de finances (art. 63)." },
    ],
  },
  {
    id: 'cp3',
    titre: "Le compte d'affectation spéciale dépassé et le sous-compte clandestin",
    contexte: "Le directeur d'un fonds national de développement agricole, compte d'affectation spéciale alimenté par une fraction de recettes fiscales, a engagé 980 milliards FC de dépenses alors que les recettes constatées s'élèvent à 810 milliards. Il invoque les « perspectives favorables » de collecte d'ici la fin de l'année. Il a par ailleurs créé, sans aucune autorisation légale, un sous-compte destiné à recevoir des versements volontaires d'entreprises privées pour financer des « projets spéciaux ». L'Inspection générale des finances est saisie.",
    questions: [
      { num: 1, enonce: "Le dépassement de 170 milliards FC est-il légal ? L'argument des « perspectives favorables » tient-il ?", correction: "Le dépassement est illégal. L'art. 65 plafonne les dépenses engagées ou ordonnancées d'un compte d'affectation spéciale au « total des recettes constatées » - un critère objectif d'encaissement effectif, non une anticipation. La seule exception est le découvert des trois mois suivant la création du compte, borné par la loi de finances créant le compte, inapplicable à un fonds existant. Si les recettes effectives venaient à dépasser les évaluations, l'art. 64 permettrait d'ouvrir des crédits supplémentaires dans la limite de l'excédent **constaté**, avec ratification en LFR - mais jamais d'engager par avance sur des recettes espérées. Le directeur a donc engagé 170 milliards sans disponibilité de crédits : faute de gestion de l'art. 129, passible d'une amende pouvant atteindre le double de son traitement brut annuel, prononcée par la Cour des comptes (art. 131), sans préjudice des sanctions disciplinaires, civiles et pénales (art. 128)." },
      { num: 2, enonce: "La création du sous-compte alimenté par des entreprises privées est-elle légale ?", correction: "Non, à un double titre. (1) Compétence : les comptes spéciaux « ne peuvent être ouverts que par une loi de finances » et « l'affectation d'une recette à un compte spécial ne peut résulter que d'une disposition de loi de finances » (art. 60) ; aucune autorité administrative ne peut créer un compte ou un sous-compte par simple décision. (2) Fond : recevoir des versements privés affectés à des « projets spéciaux » hors de toute prévision budgétaire viole l'universalité (art. 7 : aucune affectation du produit des recettes à des dépenses particulières) et l'unité (art. 6). Le canal légal existe pourtant : les fonds de concours de l'art. 70 - fonds à caractère non fiscal versés par des personnes morales ou physiques pour concourir à des dépenses d'intérêt public - qui sont portés directement en recettes au budget concerné, avec ouverture de crédits de même montant par arrêté du Ministre du Budget et emploi conforme à l'intention de la partie versante (art. 71). En les recevant hors de ce cadre, le directeur a de surcroît manié des deniers publics hors de tout titre : il s'expose à la qualification de comptable de fait (art. 130), avec les obligations et responsabilités d'un comptable public." },
      { num: 3, enonce: "Quelles conséquences juridiques pour le directeur ?", correction: "Quatre registres. (1) Faute de gestion (art. 129) : engagement de dépenses sans disponibilité de crédits, violation des règles d'exécution des recettes et des dépenses, avantage injustifié le cas échéant - amende jusqu'au double du traitement ou salaire brut annuel (plancher : le quart), prononcée par la Cour des comptes (art. 131). (2) Gestion de fait (art. 130) : pour les fonds privés maniés sans titre, il est réputé comptable de fait et assume les obligations et responsabilités d'un comptable public, sans préjudice des sanctions pénales - la responsabilité personnelle et pécuniaire d'un comptable se dénoue par une décision de débet de la Cour des comptes (art. 131). (3) Sanctions disciplinaire, civile et/ou pénale (art. 128), le détournement éventuel relevant du droit pénal commun. (4) Régularisation budgétaire : le dépassement doit être traité dans une LFR et apparaîtra dans la loi portant reddition des comptes, dont l'art. 29 approuve, par vote de crédits complémentaires, les seuls dépassements résultant de cas de force majeure - ce qui n'est pas le cas ici. L'IGF, compétente sur toutes les opérations financières du pouvoir central et des organismes bénéficiant de son concours (art. 121-122), instruira le dossier." },
    ],
  },
  {
    id: 'cp4',
    titre: 'La reddition des comptes et le sort des crédits non consommés',
    contexte: "À la clôture d'un exercice, le Ministère des Finances prépare le projet de loi portant reddition des comptes (données simplifiées, en milliards FC) : crédits ouverts au budget général 50 000 ; dépenses payées au 31 décembre 42 000 ; crédits régulièrement reportés (art. 53 et 93) 1 500 ; recettes encaissées 39 800. Par ailleurs, deux comptes d'affectation spéciale présentent des soldes excédentaires qu'un fonctionnaire propose de « rapatrier automatiquement au budget général ».",
    questions: [
      { num: 1, enonce: "Établissez le résultat du budget général et le sort des crédits non consommés selon les art. 29-30 LOFIP.", correction: "Résultat : recettes encaissées 39 800 - dépenses payées 42 000 = déficit de 2 200 milliards FC. L'art. 30 organise le compte de résultats : déficit ou excédent du budget général et des budgets annexes, profits et pertes des comptes spéciaux, profits et pertes éventuels des opérations de trésorerie ; les résultats définitifs sont inscrits au compte consolidé des soldes des gestions budgétaires. Sort des crédits : l'art. 29 dispose que la loi portant reddition des comptes « annule la différence entre le montant des crédits ouverts par le budget et le montant de dépenses payées au 31 décembre augmenté de celui des crédits reportés conformément aux articles 53 et 93 » - soit 50 000 - (42 000 + 1 500) = 6 500 milliards annulés. Elle arrête le compte général du pouvoir central, règle définitivement le budget, ratifie le cas échéant les crédits ouverts par ordonnance-loi du Président de la République et approuve, par le vote de crédits complémentaires, les dépassements résultant de cas de force majeure." },
      { num: 2, enonce: "Le « rapatriement automatique » des soldes des comptes d'affectation spéciale est-il fondé ?", correction: "Non. L'art. 61 pose la règle inverse : « Sauf dispositions contraires prévues par une loi de finances, le solde de chaque compte spécial est reporté sur l'année suivante. » Et l'art. 63 verrouille : « Sauf dérogation expresse prévue par une loi de finances, aucun versement ne peut être effectué à partir d'un compte d'affectation spéciale, au profit du budget général auquel il est rattaché, d'un budget annexe ou d'un autre compte spécial. » Le rapatriement n'est donc jamais automatique : il exige une disposition expresse d'une loi de finances. Sans elle, le fonctionnaire ne peut rien ordonnancer - et un versement opéré malgré tout constituerait une violation des règles d'exécution sanctionnée au titre de la faute de gestion (art. 129)." },
      { num: 3, enonce: "Quels sont le calendrier de dépôt et la place de la Cour des comptes dans la procédure de reddition ?", correction: "Le projet de loi portant reddition des comptes du dernier exercice clos, avec les documents des art. 81 et 82 points 1 et 2, est déposé à l'Assemblée nationale « au plus tard le 15 mai de l'année suivant celle de l'exécution du budget auquel il se rapporte » ; en cas d'impossibilité, le projet et le rapport de la Cour des comptes sont déposés avant la fin de la session ordinaire de mars (art. 84). Il est supervisé par le Ministre des Finances (art. 28, 77). La Cour des comptes intervient à deux titres : son rapport prévu par l'art. 180 de la Constitution accompagne le projet (art. 82 pt 3), et elle assiste l'Assemblée nationale dans le contrôle de l'exécution de la loi de finances (art. 124). L'art. 87 donne à la procédure sa portée politique : le projet « doit être examiné par le Parlement préalablement au vote du projet de la loi de finances de l'année », et l'approbation des comptes « vaut quitus de la gestion du Gouvernement pour l'exercice concerné » - c'est à cette occasion que le Parlement prononce, s'il échet, la décharge des ordonnateurs (art. 127)." },
    ],
  },
  {
    id: 'cp5',
    titre: 'Budget 2026 : la part des provinces et la tentation de la caisse parallèle',
    contexte: "La loi de finances 2026 (n° 25/060 du 29 décembre 2025) arrête le budget du pouvoir central en équilibre à 54 335,8 milliards FC (art. 6), dont 48 969,3 milliards de recettes du budget général (art. 7) ; l'art. 8 fixe la part des recettes à caractère national allouée aux provinces à 7 694,5 milliards FC et l'art. 9 dote la Caisse nationale de péréquation de 744,6 milliards. Un gouverneur affirme en conférence de presse que « le pouvoir central ne verse que 30% de nos droits constitutionnels ». Un conseiller ministériel suggère par ailleurs de créer, par simple arrêté interministériel, une « caisse provinciale supplémentaire » hors budget, alimentée par 5% des recettes minières de la province.",
    questions: [
      { num: 1, enonce: "L'affirmation du gouverneur peut-elle être vérifiée en rapportant 7 694,5 milliards aux 48 969,3 milliards de recettes du budget général ?", correction: "Non - ce serait une erreur d'assiette. Les 40% de l'art. 175 al. 2 de la Constitution et de l'art. 24 LOFIP portent sur les « recettes à caractère national », pas sur le total des recettes du budget général : celui-ci inclut des ressources extérieures (14 390,3 milliards en 2026 - dons et emprunts), des recettes exceptionnelles et des recettes qui ne sont pas à caractère national au sens des art. 219-221 LOFIP, lesquels définissent les catégories de recettes concernées et leur mode de répartition entre les provinces. Le ratio 7 694,5 / 48 969,3 ≈ 15,7% ne mesure donc rien de constitutionnel. La vérification exacte suppose l'état, annexé à la loi de finances, de « la liste et de l'évaluation des prévisions de recettes à caractère national » et de leur répartition par province (art. 78 pts 1-2). Le gouverneur qui s'estime lésé dispose de voies de droit - contester la loi ou son exécution -, non du pouvoir de modifier unilatéralement la répartition, que la loi de finances fixe globalement (art. 24)." },
      { num: 2, enonce: "La « caisse provinciale supplémentaire » créée par arrêté est-elle légale ?", correction: "Doublement illégale. (1) Légalité : aucune affectation de recettes ne peut être créée par arrêté - les affectations prennent la forme de budgets annexes, de comptes spéciaux ou de procédures comptables particulières prévus par la loi de finances (art. 54), et les comptes spéciaux ne peuvent être ouverts que par une loi de finances (art. 60). Capter 5% de recettes minières supposerait en outre de toucher au régime des recettes, domaine de la loi (art. 9 LOFIP ; art. 122 pt 10 et 174 de la Constitution). (2) Universalité : réserver une fraction des recettes minières à une caisse hors budget viole l'art. 7 - enregistrement du produit intégral, aucune affectation à des dépenses particulières - et l'unité de l'art. 6. La LF 2026 rappelle elle-même ces principes dans ses dispositions générales (art. 2-4). La voie légale : proposer au Parlement, dans une loi de finances ou une LFR, la création d'un compte d'affectation spéciale dont les recettes seraient « par nature, en relation directe avec les dépenses concernées » (art. 62) - à l'image du FIS-RDC créé par l'art. 51 de la LF 2026." },
      { num: 3, enonce: "Distinguez la part des 40% et la Caisse nationale de péréquation : fondements, logiques, montants 2026.", correction: "Deux mécanismes complémentaires. (1) La part de 40% (art. 175 al. 2 de la Constitution ; art. 24 LOFIP ; art. 8 LF 2026 : 7 694,5 milliards FC) est un droit des provinces sur les recettes à caractère national, « retenue à la source » : l'art. 3 de la LOFIP la définit comme l'opération bancaire créditant le compte de la province génératrice de 40% du montant recouvré lors du nivellement vers le Compte général du Trésor, et les art. 219-221 organisent la répartition par catégories de recettes. Sa logique est de rattacher la ressource au territoire qui la génère. (2) La Caisse nationale de péréquation (art. 181 de la Constitution ; art. 9 LF 2026 : 744,6 milliards) est une institution dotée de la personnalité juridique, sous tutelle du Gouvernement, dont le budget est alimenté par le Trésor à concurrence de 10% de la totalité des recettes à caractère national ; elle finance des projets et programmes d'investissement public « en vue d'assurer la solidarité nationale et de corriger le déséquilibre de développement entre les provinces et entre les autres entités territoriales décentralisées ». Sa logique est redistributive : corriger ce que la retenue à la source, mécaniquement favorable aux provinces riches, accentue. La première est un droit de chaque province sur ses recettes ; la seconde, une solidarité nationale arbitrée par la loi de finances." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue5',
  numero: 3,
  id: 'ue5-chapitre-3',
  titre: "Structure et présentation du budget de l'État",
  sousTitre: 'LOFIP n° 11/011 du 13 juillet 2011 (mod. 2018 et 2023), art. 14-41 et 54-73 · LF 2025 et 2026',
  infoBulle: "Les quatre espèces de lois de finances, la structure tripartite du budget du pouvoir central (budget général, budgets annexes, comptes spéciaux), la classification des ressources et les neuf titres de dépenses, les régimes des crédits (limitatifs, évaluatifs, provisionnels) et les chiffres réels des budgets 2025-2026.",
  loiRef: 'Art. 17-41, 54-73 LOFIP',
  moduleLabel: 'UE 5 · Finances publiques',
  retourRoute: '/ue5-finances-publiques',
  coursId: 'ue5-finances-publiques',
  objectifs: [
    "Distinguer les quatre catégories de lois de finances (art. 18) et leur calendrier : dépôt le 15 septembre (art. 83), reddition des comptes le 15 mai (art. 84, 87)",
    'Décrire la structure tripartite du budget du pouvoir central : budget général, budgets annexes, comptes spéciaux (art. 20)',
    "Classer les ressources budgétaires selon l'art. 34 (courantes, en capital, exceptionnelles, extérieures) et situer la part des 40% des provinces (art. 24, art. 175 Constitution)",
    'Maîtriser la nomenclature des neuf titres de dépenses (art. 37) et les régimes des crédits : limitatifs, évaluatifs, provisionnels (art. 38-41)',
    "Distinguer budgets annexes (art. 55-58), comptes d'affectation spéciale (art. 62-65), comptes de concours financiers (art. 66-68) et procédures particulières (art. 69-73)",
    'Lire les chiffres réels : LF 2025 (51 553,5 Mds FC), LFR n° 25/044 (50 691,8 Mds) et LF 2026 (54 335,8 Mds)',
  ],
  sections: SECTIONS,
  aRetenir: [
    "Quatre espèces de lois de finances (art. 18) : loi de finances de l'année (déposée au plus tard le 15 septembre, art. 83), lois rectificatives (art. 26-27), loi portant reddition des comptes (déposée au plus tard le 15 mai, examinée avant le vote de la LF suivante, quitus du Gouvernement - art. 28-30, 84, 87) et loi portant ouverture de crédits provisoires (art. 31, 83).",
    "Le budget du pouvoir central comprend trois composantes (art. 20) : budget général, budgets annexes et comptes spéciaux - en 2025 : 46 799,7 + 903,0 + 3 850,9 = 51 553,5 milliards FC (art. 7 LF 2025) ; en 2026 : 48 969,3 + 962,3 + 4 404,2 = 54 335,8 milliards (art. 6-7 LF 2026).",
    "Le budget est présenté en équilibre (art. 14) et les avances de la Banque centrale du Congo sont prohibées pour les trois étages (art. 16) ; les amendements parlementaires coûteux sont irrecevables sans compensation (art. 86 ; art. 127 et 134 Constitution).",
    "Les ressources budgétaires (art. 34) se classent en recettes courantes (impôts, revenus du domaine, recettes administratives, amendes), recettes en capital (cessions), recettes exceptionnelles (dons, emprunts, remboursements) et ressources extérieures ; la loi de finances fixe globalement les 40% des recettes à caractère national alloués aux provinces (art. 24 ; 9 505,8 Mds en 2025, 7 694,5 Mds en 2026) et la dotation de péréquation (2 376,5 puis 744,6 Mds).",
    "L'art. 37 compte NEUF titres de dépenses : I dette publique en capital, II frais financiers, III personnel, IV biens et matériels, V prestations, VI transferts et interventions (dépenses courantes) ; VII équipements, VIII construction (dépenses en capital) ; IX prêts et avances.",
    "Trois régimes de crédits : limitatifs par défaut (art. 38, dépassement interdit), évaluatifs pour les seules charges de la dette (art. 39, dépassement possible avec information du Parlement et régularisation en LFR), provisionnels pour les dépenses accidentelles et imprévisibles (art. 40, crédits supplémentaires demandés au Parlement en cas d'insuffisance) ; toute ouverture de crédits supplémentaires exige voies et moyens et rapport du Premier ministre (art. 41).",
    "Budgets annexes (art. 55-58) : services sans personnalité juridique rémunérés par redevances, deux sections, étanchéité absolue avec le budget général ; en 2025, 903,0 Mds FC (enseignement supérieur, santé publique, organismes reclassés).",
    "Comptes spéciaux (art. 59-68) : comptes d'affectation spéciale (recettes en relation directe avec les dépenses, plafond des recettes constatées sauf découvert des trois premiers mois, pas de versement au budget général sans dérogation expresse) et comptes de concours financiers (prêts et avances, crédits limitatifs, taux plafonné au taux interbancaire, traitement des impayés art. 68) ; sauf disposition contraire, le solde est reporté (art. 61), alors que la reddition des comptes annule les crédits non consommés du budget général (art. 29).",
    "Procédures particulières d'affectation (art. 69-73) : fonds de concours (emploi conforme à l'intention de la partie versante), attributions de produits et rétablissement de crédits - toutes par arrêté du Ministre du Budget, dans le cadre fixé par la loi de finances.",
  ],
  references: [
    {
      genre: 'texte',
      intitule: 'Loi n° 11/011 du 13 juillet 2011 relative aux finances publiques (LOFIP)',
      precision: 'telle que modifiée par la loi n° 18/010 du 9 juillet 2018 et par la loi n° 23/030 du 28 juin 2023 ; art. 14-41, 54-97 et 111-131',
    },
    {
      genre: 'texte',
      intitule: 'Constitution de la République Démocratique du Congo du 18 février 2006',
      precision: 'telle que modifiée par la loi n° 11/002 du 20 janvier 2011 ; art. 122, 126-127, 134, 175, 180-181',
    },
    {
      genre: 'texte',
      intitule: "Loi de finances n° 24/011 pour l'exercice 2025 et loi de finances rectificative n° 25/044 du 28 juin 2025",
      precision: 'art. 7, 9, 10 et 87 LF 2025 ; annexe I',
    },
    {
      genre: 'texte',
      intitule: "Loi de finances n° 25/060 du 29 décembre 2025 pour l'exercice 2026",
      precision: 'art. 2-9 et 51 ; annexes I-II et synthèse des dépenses par titre',
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : LOFIP n° 11/011 du 13 juillet 2011 (mod. lois n° 18/010 et n° 23/030), art. 14-41, 54-97, 111-131 · Constitution du 18 février 2006, art. 175, 180-181 · LF n° 24/011 (2025), LFR n° 25/044, LF n° 25/060 (2026)',
}

export default chapitre
