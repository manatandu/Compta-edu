// Chapitre 2 du module UE5, Finances publiques : contenu pur.
// Migré depuis l'ancienne page dédiée UE5Chapitre2Page.tsx vers le moteur
// commun components/chapitre/ChapitreManuscrit.tsx, avec vérification sur
// les textes : LOFIP n° 11/011 du 13 juillet 2011 (art. 1-131 lus en
// intégralité) telle que modifiée par les lois n° 18/010 du 9 juillet 2018
// et n° 23/030 du 28 juin 2023 ; Constitution du 18 février 2006 (art. 122,
// 126-127, 134, 170-181) ; lois de finances 2025 (n° 24/011), rectificative
// n° 25/044 et 2026 (n° 25/060 du 29 décembre 2025). Corrections majeures :
// le tableau des « 5 titres de dépenses » était faux - l'art. 37 LOFIP en
// compte NEUF (dette publique en capital, frais financiers, personnel,
// biens et matériels, prestations, transferts et interventions, équipements,
// construction, prêts et avances) ; les citations prêtées aux art. 5, 6, 7,
// 9, 10 et 11 étaient des paraphrases présentées entre guillemets -
// remplacées par les textes exacts ; les « décrets d'avance » et « douzièmes
// provisoires de l'art. 87 » étaient fabriqués (l'art. 87 porte sur l'examen
// préalable de la reddition des comptes ; le mécanisme réel est la loi
// portant ouverture de crédits provisoires, art. 18, 31 et 83 LOFIP et
// art. 126 Constitution) ; la LFR relève des art. 26-27 (non « 76-87 ») ;
// les AE pluriannuelles relèvent des art. 3, 22, 42 et 52 (non « 43-44 ») ;
// les fonds de concours et attributions de produits relèvent des art. 69-72
// (non « 74-75 », qui portent sur la trésorerie) ; la fongibilité joue à
// l'intérieur du titre (art. 45), le virement entre titres d'un même
// programme par arrêté du Ministre du Budget (art. 47), les transferts
// entre programmes par décret du Premier ministre (art. 48-49, réd. 2023),
// et l'interdiction d'abonder le titre du personnel vient de l'art. 51.
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch2-q1', question: "Combien de principes budgétaires la LOFIP énonce-t-elle à l'article 4 ?",
    options: [
      { id: 'a', texte: '4' },
      { id: 'b', texte: '5' },
      { id: 'c', texte: '6' },
      { id: 'd', texte: '9' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 4 LOFIP',
    explication: "L'Art. 4 de la LOFIP énonce six principes : annualité (Art. 5), unité (Art. 6), universalité (Art. 7), spécialité (Art. 8), légalité des recettes et des dépenses (Art. 9-10) et sincérité (Art. 11). Ne pas confondre avec les neuf titres de dépenses de l'Art. 37 - autre chiffre, autre objet.",
  },
  {
    id: 'ch2-q2', question: "Le principe d'annualité signifie que l'exercice budgétaire va du :",
    options: [
      { id: 'a', texte: '1er juillet au 30 juin' },
      { id: 'b', texte: '1er janvier au 31 décembre' },
      { id: 'c', texte: '1er octobre au 30 septembre' },
      { id: 'd', texte: '1er avril au 31 mars' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 5 LOFIP · Art. 172 Constitution',
    explication: "L'Art. 5 de la LOFIP dispose : « L'exercice budgétaire s'étend sur une année civile allant du 1er janvier au 31 décembre. » La règle est aussi constitutionnelle : « L'exercice budgétaire commence le premier janvier et se termine le 31 décembre » (Art. 172 de la Constitution).",
  },
  {
    id: 'ch2-q3', question: 'Quel principe interdit la contraction (compensation) entre recettes et dépenses ?',
    options: [
      { id: 'a', texte: "Le principe d'unité" },
      { id: 'b', texte: "Le principe d'annualité" },
      { id: 'c', texte: "Le principe d'universalité" },
      { id: 'd', texte: 'Le principe de sincérité' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 7 LOFIP',
    explication: "L'Art. 7 de la LOFIP : « Le montant intégral des produits est enregistré sans contraction entre les recettes et les dépenses et, par conséquent, entre les dettes et les créances. » C'est la règle du produit brut. Le même article ajoute l'interdiction de l'affectation : l'ensemble des recettes assure l'exécution de l'ensemble des dépenses « sans aucune affectation de leur produit à des dépenses particulières ».",
  },
  {
    id: 'ch2-q4', question: 'Selon le principe de légalité (Art. 9 LOFIP), qui peut créer des impôts en RDC ?',
    options: [
      { id: 'a', texte: 'Le Gouverneur de province par arrêté' },
      { id: 'b', texte: "L'Assemblée provinciale par édit" },
      { id: 'c', texte: 'Le Parlement national, par la loi uniquement' },
      { id: 'd', texte: 'Le Ministre des Finances par arrêté' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 9 LOFIP · Art. 122 pt. 10 et 174 Constitution',
    explication: "L'Art. 9 de la LOFIP dispose : « Il ne peut être établi d'impôts que par la loi », en écho à l'Art. 174 de la Constitution. Les Assemblées provinciales et les organes délibérants des ETD « ne peuvent créer ni impôt, ni taxe, ni droit ou redevance » ; une loi d'habilitation peut seulement leur confier, sur le fondement de l'art. 205 al. 2 de la Constitution, la fixation du taux et/ou des modalités de recouvrement de certains impôts provinciaux et locaux.",
  },
  {
    id: 'ch2-q5', question: 'Les crédits spécialisés par titre et regroupés par programme ou par dotation correspondent à quel principe budgétaire ?',
    options: [
      { id: 'a', texte: "Le principe d'unité" },
      { id: 'b', texte: 'Le principe de spécialité' },
      { id: 'c', texte: 'Le principe de sincérité' },
      { id: 'd', texte: "Le principe d'universalité" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 8 LOFIP (réd. loi n° 23/030)',
    explication: "L'Art. 8 de la LOFIP, dans sa rédaction issue de la loi n° 23/030 du 28 juin 2023 : les crédits sont spécialisés par grande nature de dépenses ou titres - tels que précisés à l'Art. 37 - et par source de financement ; ils sont regroupés par programme ou par dotation, les programmes ou dotations pouvant être regroupés par fonction.",
  },
  {
    id: 'ch2-q6', question: "La fongibilité des crédits est qualifiée d'« asymétrique » car :",
    options: [
      { id: 'a', texte: "Elle ne s'applique qu'aux dépenses d'investissement" },
      { id: 'b', texte: "Les crédits de personnel peuvent servir à d'autres natures de dépenses, mais l'inverse est interdit" },
      { id: 'c', texte: 'Elle ne concerne que les budgets annexes' },
      { id: 'd', texte: "Elle permet de reporter des crédits d'un exercice à l'autre" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 3 pt. 28 et 51 LOFIP',
    explication: "L'Art. 3 point 28 de la LOFIP définit la fongibilité asymétrique : les crédits du personnel « peuvent être utilisés pour d'autres natures de dépenses, à savoir, le fonctionnement, l'intervention et l'investissement tandis que l'inverse est interdit ». L'interdiction opérationnelle est posée par l'Art. 51 : « Aucun virement ni transfert ne peut être effectué au profit du titre des dépenses de personnel à partir d'un autre titre. »",
  },
  {
    id: 'ch2-q7', question: 'Un budget annexe constitue une dérogation à quel(s) principe(s) budgétaire(s) ?',
    options: [
      { id: 'a', texte: "L'annualité uniquement" },
      { id: 'b', texte: "L'unité et l'universalité" },
      { id: 'c', texte: 'La légalité uniquement' },
      { id: 'd', texte: 'La sincérité uniquement' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 6, 7, 54 à 58 LOFIP',
    explication: "Le budget annexe déroge à l'unité (document budgétaire distinct du budget général) et à l'universalité (les redevances du service sont affectées à ses dépenses). L'Art. 54 pose le verrou : seules les lois de finances peuvent prévoir de telles affectations, sous forme de budgets annexes (Art. 55-58), de comptes spéciaux (Art. 59-68) ou de procédures comptables particulières (Art. 69-73).",
  },
  {
    id: 'ch2-q8', question: 'Quel article de la LOFIP consacre le principe de sincérité ?',
    options: [
      { id: 'a', texte: 'Art. 7' },
      { id: 'b', texte: 'Art. 9' },
      { id: 'c', texte: 'Art. 10' },
      { id: 'd', texte: 'Art. 11' },
    ],
    reponseCorrecte: 'd', articleRef: 'Art. 11 LOFIP',
    explication: "L'Art. 11 de la LOFIP : le budget « présente de façon sincère l'ensemble de leurs ressources et de leurs charges », la sincérité s'appréciant « compte tenu des informations disponibles et des prévisions qui en découlent » ; les comptes « doivent être réguliers, sincères et refléter une image fidèle de leur situation financière et patrimoniale ».",
  },
  {
    id: 'ch2-q9', question: 'Selon le principe de légalité des dépenses (Art. 10 LOFIP), une dépense ne peut être exécutée si :',
    options: [
      { id: 'a', texte: 'Elle dépasse 1 milliard FC' },
      { id: 'b', texte: "Elle n'a pas été approuvée individuellement par le Parlement" },
      { id: 'c', texte: 'Les crédits nécessaires ne sont pas disponibles au budget' },
      { id: 'd', texte: "Elle n'a pas reçu l'avis de la Banque centrale du Congo" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 10 LOFIP',
    explication: "L'Art. 10 pose quatre conditions cumulatives : la dépense doit relever des compétences du pouvoir central, des provinces ou des ETD ; être définie par un texte régulièrement adopté et publié ; disposer de crédits disponibles au budget ; et, pour les opérations sur ressources extérieures, la mobilisation des fonds doit être effective. L'absence de crédits disponibles rend la dépense irrégulière, même urgente et justifiée.",
  },
  {
    id: 'ch2-q10', question: 'Un ministre souhaite abonder le titre des dépenses de personnel avec des crédits de biens et matériels. Selon la LOFIP, cela est :',
    options: [
      { id: 'a', texte: 'Autorisé librement par le gestionnaire du programme' },
      { id: 'b', texte: 'Autorisé par arrêté du Ministre du Budget' },
      { id: 'c', texte: 'Interdit : aucun virement ni transfert ne peut abonder le titre du personnel' },
      { id: 'd', texte: 'Autorisé par décret du Premier ministre' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 51 LOFIP',
    explication: "L'Art. 51 est catégorique : « Aucun virement ni transfert ne peut être effectué au profit du titre des dépenses de personnel à partir d'un autre titre. » Les crédits de personnel sont en outre des plafonds assortis de plafonds d'autorisation d'emplois, et les créations d'emplois nouveaux sont décidées par une loi de finances. Le mouvement inverse - du personnel vers les autres titres - est en revanche permis par la fongibilité asymétrique (Art. 3 pt. 28).",
  },
  {
    id: 'ch2-q11', question: "Le cadre budgétaire à moyen terme (CBMT) est établi sur quel horizon, et quand doit-il être transmis à l'Assemblée nationale ?",
    options: [
      { id: 'a', texte: '5 ans, au plus tard le 15 septembre' },
      { id: 'b', texte: '3 ans, au plus tard le 1er juin' },
      { id: 'c', texte: '2 ans, au plus tard le 30 juin' },
      { id: 'd', texte: '3 ans, au plus tard le 15 décembre' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 5 et 13 LOFIP (réd. loi n° 23/030)',
    explication: "L'Art. 13 de la LOFIP charge le Ministre du Budget d'établir chaque année un CBMT à 3 ans, adopté en Conseil des ministres et - depuis la loi n° 23/030 de 2023 - transmis à l'Assemblée nationale au plus tard le 1er juin, pour un débat d'orientation budgétaire tenu au plus tard le 15 juin. L'Art. 5 rattache la budgétisation pluriannuelle sur trois années au principe d'annualité, qu'elle encadre sans le remplacer.",
  },
  {
    id: 'ch2-q12', question: "Quelle est la principale dérogation au principe d'annualité prévue pour les grands investissements publics ?",
    options: [
      { id: 'a', texte: 'La fongibilité des crédits (Art. 45)' },
      { id: 'b', texte: "Les autorisations d'engagement pluriannuelles (Art. 22, 42 et 52)" },
      { id: 'c', texte: 'Les comptes de concours financiers (Art. 66)' },
      { id: 'd', texte: 'Les fonds de concours (Art. 70)' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 3 pt. 2, 22, 42 et 52 LOFIP',
    explication: "L'autorisation d'engagement est définie par l'Art. 3 point 2 comme la permission de signer des marchés « dont l'exécution peut se réaliser sur plusieurs exercices budgétaires selon un échéancier des paiements ». La loi de finances fixe les autorisations d'engagement annuelles et pluriannuelles (Art. 22) ; les crédits de paiement restent la limite annuelle des paiements (Art. 42) et les AE pluriannuelles d'investissement peuvent être révisées (Art. 52).",
  },
  {
    id: 'ch2-q13', question: "Un étudiant affirme que le principe d'universalité exige que chaque service garde ses propres recettes pour financer ses propres dépenses. Cette affirmation est :",
    options: [
      { id: 'a', texte: 'Exacte' },
      { id: 'b', texte: 'Exacte uniquement pour les ETD' },
      { id: 'c', texte: "Fausse : c'est précisément l'inverse que ce principe impose" },
      { id: 'd', texte: 'Exacte pour les comptes spéciaux seulement' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 7 et 54 LOFIP',
    explication: "C'est l'exact contraire. L'Art. 7 interdit toute affectation du produit des recettes à des dépenses particulières, et l'Art. 54 le répète : « aucune recette ne peut être affectée à une dépense particulière, l'ensemble des recettes sert à la couverture de l'ensemble des dépenses ». Ce que décrit l'étudiant est l'exception - budget annexe, compte spécial - qui ne peut résulter que d'une loi de finances.",
  },
  {
    id: 'ch2-q14', question: 'Selon le principe de sincérité (Art. 11 LOFIP), tout projet de loi ayant une incidence financière doit être accompagné :',
    options: [
      { id: 'a', texte: "D'un avis de la Cour des comptes" },
      { id: 'b', texte: "D'une déclaration du Ministre des Finances" },
      { id: 'c', texte: "D'une annexe précisant ses conséquences pour le budget de l'année d'entrée en vigueur et de l'année suivante" },
      { id: 'd', texte: "D'un rapport de la Banque centrale du Congo" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 11 LOFIP',
    explication: "L'Art. 11 : « Tout projet de loi, d'édit, de décision, d'ordonnance ou de règlement ayant une incidence financière doit être accompagné d'une annexe précisant ses conséquences au titre du budget de l'année d'entrée en vigueur et de l'année suivante. » L'obligation couvre donc tous les actes normatifs, pas seulement les lois, et vise deux exercices précis.",
  },
  {
    id: 'ch2-q15', question: "L'engagement des dépenses autres que de personnel, sur autorisations d'engagement annuelles, ne peut intervenir après quelle date ?",
    options: [
      { id: 'a', texte: 'Le 30 septembre' },
      { id: 'b', texte: 'Le 31 octobre' },
      { id: 'c', texte: 'Le 30 novembre' },
      { id: 'd', texte: 'Le 31 décembre' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 92 LOFIP',
    explication: "L'Art. 92 al. 3 : « Les engagements de dépenses, autres que celles de personnel, se rapportant aux autorisations d'engagement annuelles ne peuvent intervenir après le 31 octobre de chaque année. » Cette date-butoir, corollaire de l'annualité, laisse novembre et décembre pour liquider, ordonnancer et payer avant la clôture.",
  },
  {
    id: 'ch2-q16', question: "Combien de titres (grandes natures de dépenses) l'Art. 37 de la LOFIP prévoit-il ?",
    options: [
      { id: 'a', texte: '5' },
      { id: 'b', texte: '6' },
      { id: 'c', texte: '8' },
      { id: 'd', texte: '9' },
    ],
    reponseCorrecte: 'd', articleRef: 'Art. 37 LOFIP',
    explication: "L'Art. 37 groupe les dépenses courantes sous six titres (I dette publique en capital, II frais financiers, III dépenses de personnel, IV biens et matériels, V dépenses de prestations, VI transferts et interventions), les dépenses en capital sous deux titres (VII équipements, VIII construction, réfection, réhabilitation, acquisition immobilière) et les prêts et avances sous un titre (IX) - soit neuf titres au total.",
  },
  {
    id: 'ch2-q17', question: "Dans la nomenclature de l'Art. 37 LOFIP, la construction d'une route relève de quel titre ?",
    options: [
      { id: 'a', texte: 'Titre IV - biens et matériels' },
      { id: 'b', texte: 'Titre VI - transferts et interventions' },
      { id: 'c', texte: 'Titre VII - équipements' },
      { id: 'd', texte: "Titre VIII - construction, réfection, réhabilitation, addition d'ouvrage et édifice, acquisition immobilière" },
    ],
    reponseCorrecte: 'd', articleRef: 'Art. 37 LOFIP',
    explication: "Les dépenses en capital forment deux titres : le titre VII (équipements) et le titre VIII (construction, réfection, réhabilitation, addition d'ouvrage et édifice, acquisition immobilière). Une route neuve relève du titre VIII. Dans la loi de finances 2026, ce titre pèse 5 208,3 milliards FC contre 10 804,2 milliards pour les équipements.",
  },
  {
    id: 'ch2-q18', question: "Un virement de crédits entre titres d'un même programme est autorisé par :",
    options: [
      { id: 'a', texte: 'Une simple décision du gestionnaire de programme' },
      { id: 'b', texte: 'Un arrêté du Ministre ayant le budget dans ses attributions' },
      { id: 'c', texte: 'Un décret du Premier ministre' },
      { id: 'd', texte: 'Une loi de finances rectificative obligatoirement préalable' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 47 LOFIP',
    explication: "L'Art. 47 : des virements de crédits peuvent être opérés entre les titres des dépenses, par source de financement d'un même programme, « par voie d'arrêté du ministre ayant le budget dans ses attributions sur proposition du ministre ou responsable d'institution concerné » - sans préjudice de l'Art. 51 (jamais vers le titre du personnel). Les transferts entre programmes, eux, exigent un décret du Premier ministre (Art. 48-49).",
  },
  {
    id: 'ch2-q19', question: "Si la loi de finances de l'année n'est pas votée avant l'ouverture de l'exercice, quel mécanisme la LOFIP prévoit-elle ?",
    options: [
      { id: 'a', texte: "Des « décrets d'avance » du Gouvernement" },
      { id: 'b', texte: "La loi portant ouverture de crédits provisoires, ou la mise en vigueur du projet par ordonnance-loi du Président de la République" },
      { id: 'c', texte: "La reconduction automatique du budget précédent pour un an" },
      { id: 'd', texte: "La suspension de toute dépense publique jusqu'au vote" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 18, 31 et 83 LOFIP · Art. 126 Constitution',
    explication: "La LOFIP range la loi portant ouverture de crédits provisoires parmi les lois de finances (Art. 18) : elle autorise le recouvrement des recettes et l'engagement des dépenses « nécessaires au fonctionnement minimum des services publics » (Art. 31). L'Art. 83 en règle le calendrier : dépôt avant le 15 décembre, mise en vigueur par ordonnance-loi du Président de la République à défaut de vote dans les 15 jours, et exécution jusqu'au 31 janvier - ou jusqu'au vote de la loi de finances si le Gouvernement est réputé démissionnaire. Les « décrets d'avance » n'existent pas dans la LOFIP.",
  },
  {
    id: 'ch2-q20', question: 'La période complémentaire pendant laquelle des recettes et dépenses budgétaires peuvent encore être comptabilisées après la clôture ne peut excéder :',
    options: [
      { id: 'a', texte: 'Le 15 janvier de l\'année suivante' },
      { id: 'b', texte: 'Le 31 janvier de l\'année suivante' },
      { id: 'c', texte: 'Le 31 mars de l\'année suivante' },
      { id: 'd', texte: 'Le 30 juin de l\'année suivante' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 97 LOFIP',
    explication: "L'Art. 97 : dans les conditions fixées par décret du Premier ministre, les recettes et dépenses budgétaires « peuvent être comptabilisées au cours d'une période complémentaire à l'année civile, dont la durée ne peut excéder le 31 janvier de l'année suivante ». Si une LFR est promulguée au cours du dernier mois de l'année, ses opérations peuvent aussi s'exécuter durant cette période. À ne pas confondre avec le 31 mars, date-limite des arrêtés de report de crédits (Art. 53).",
  },
  {
    id: 'ch2-q21', question: 'Les arrêtés de report des crédits de paiement non consommés doivent intervenir au plus tard le :',
    options: [
      { id: 'a', texte: "31 janvier de l'année suivante" },
      { id: 'b', texte: "28 février de l'année suivante" },
      { id: 'c', texte: "31 mars de l'année suivante" },
      { id: 'd', texte: "30 avril de l'année suivante" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 53 LOFIP',
    explication: "L'Art. 53 : les AE pluriannuelles et les crédits de paiement non consommés sont reportés sur l'exercice suivant, sur le même programme et le même titre, par arrêtés conjoints du Ministre du Budget et du ministre intéressé pris « au plus tard le 31 mars de l'année suivant celle à la fin de laquelle la disponibilité... a été constatée ». Les Art. 93-94 organisent en outre le report des crédits couvrant des obligations existant au 31 octobre non payées au 31 décembre.",
  },
  {
    id: 'ch2-q22', question: 'Depuis la loi n° 23/030 du 28 juin 2023, les crédits des institutions de la République non soumis à la démarche de performance sont regroupés en :',
    options: [
      { id: 'a', texte: 'Programmes' },
      { id: 'b', texte: 'Dotations budgétaires' },
      { id: 'c', texte: 'Budgets annexes' },
      { id: 'd', texte: "Comptes d'affectation spéciale" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 3 pt. 20, 8 et 42 LOFIP (réd. loi n° 23/030)',
    explication: "La loi n° 23/030 a introduit la « dotation budgétaire » : crédits alloués aux institutions de la République dont la gestion n'est pas soumise à la règle de la performance - sans objectifs ni indicateurs de résultat, mais sans préjudice des règles de comptabilité publique et de contrôle (Art. 3 pt. 20). L'Art. 8 réécrit précise que les crédits sont regroupés « par programme ou par dotation », et la loi de finances 2026 identifie par exemple la dotation de l'Opposition politique (300,4 millions FC).",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '2.1',
    titre: "Les six principes budgétaires : vue d'ensemble et fondement",
    navLabel: "Vue d'ensemble",
    blocs: [
      { type: 'paragraphe', texte: "L'article 4 de la LOFIP est l'article-clé du droit budgétaire congolais : il énonce les **six principes** sur lesquels repose le Budget de l'État et qui encadrent l'ensemble du cycle budgétaire, de l'élaboration à l'exécution et au contrôle. Ces principes ne sont pas de simples règles techniques : ils forment les garanties juridiques de la transparence, de la légalité et de l'honnêteté dans la gestion des deniers publics, et chacun est développé par un ou deux articles qui suivent immédiatement (art. 5 à 11)." },
      { type: 'filet', titre: 'Art. 4 LOFIP - texte exact', texte: "« Le Budget de l'État repose sur les principes ci-après : 1) principe de l'annualité ; 2) principe de l'unité ; 3) principe de l'universalité ; 4) principe de la spécialité ; 5) principe de la légalité des recettes et des dépenses ; 6) principe de la sincérité. »" },
      { type: 'carte', titre: 'Les six principes et leurs sièges', tableau: {
        entetes: ['Principe', 'Articles', 'Règle en une phrase'],
        lignes: [
          ['**Annualité**', 'Art. 5', "L'exercice budgétaire couvre l'année civile, du 1er janvier au 31 décembre"],
          ['**Unité**', 'Art. 6', 'Toutes les ressources et charges de chaque entité dans un document unique'],
          ['**Universalité**', 'Art. 7', 'Produit brut sans contraction ; aucune affectation de recette à une dépense'],
          ['**Spécialité**', 'Art. 8', 'Crédits spécialisés par titre et source de financement, regroupés par programme ou dotation'],
          ['**Légalité**', 'Art. 9-10', "Pas d'impôt ni d'exemption sans loi ; pas de dépense sans compétence, texte et crédits"],
          ['**Sincérité**', 'Art. 11', 'Prévisions honnêtes, comptes réguliers et fidèles'],
        ],
      } },
      { type: 'paragraphe', texte: "Ces six principes forment un système : l'*annualité* fixe le cadre temporel ; l'*unité* et l'*universalité* imposent la globalité et la transparence du document ; la *spécialité* rend l'autorisation précise et contraignante ; la *légalité* protège contre l'arbitraire ; la *sincérité* impose la bonne foi des prévisions et des comptes. Leur fondement commun est démocratique : c'est le Parlement, représentant du peuple, qui autorise les recettes et les dépenses. L'art. 3 de la LOFIP en donne d'ailleurs des définitions autonomes (points 33 à 37), qu'il faut savoir citer distinctement des articles 5 à 11." },
      { type: 'carte', titre: 'Le socle constitutionnel', liste: [
        "**Art. 122 pt. 3** : la loi fixe les règles concernant « les finances publiques » - c'est le fondement de la LOFIP elle-même (art. 1er LOFIP).",
        "**Art. 122 pt. 10** : la loi fixe « l'assiette, le taux et les modalités de recouvrement des impositions de toute nature » - socle de la légalité fiscale.",
        "**Art. 126** : les lois de finances déterminent les ressources et les charges de l'État ; dépôt du projet au plus tard le 15 septembre ; procédure des crédits provisoires ; Gouvernement réputé démissionnaire s'il n'a pas déposé son projet quinze jours avant la fin de la session budgétaire.",
        "**Art. 172** : l'exercice budgétaire commence le 1er janvier et se termine le 31 décembre - l'annualité est une règle constitutionnelle avant d'être légale.",
        "**Art. 174** : il ne peut être établi d'impôts que par la loi ; il ne peut être établi d'exemption ou d'allègement fiscal qu'en vertu de la loi.",
        "**Art. 175 al. 1** : le budget des recettes et des dépenses de l'État - pouvoir central et provinces - est arrêté chaque année par une loi.",
      ] },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
    ],
  },
  {
    numero: '2.2',
    titre: "Le principe d'annualité et ses aménagements",
    navLabel: 'Annualité',
    blocs: [
      { type: 'paragraphe', texte: "Le principe d'annualité est l'un des plus anciens du droit budgétaire : l'autorisation parlementaire est donnée pour une durée limitée à une année. Il remplit trois fonctions : encadrer l'exécutif, dont la liberté de dépenser expire avec l'autorisation annuelle ; permettre un contrôle démocratique régulier ; garantir l'adaptation du budget aux évolutions économiques. En RDC, la règle est à double détente : constitutionnelle (art. 172) et légale (art. 5 LOFIP), et l'art. 3 point 33 la définit comme « la règle budgétaire qui impose le vote annuel du budget par le pouvoir législatif »." },
      { type: 'filet', titre: 'Art. 5 LOFIP - texte exact', texte: "« L'exercice budgétaire s'étend sur une année civile allant du 1er janvier au 31 décembre. Toutefois, les crédits y afférents découlent d'une budgétisation pluriannuelle consistant à prévoir les recettes, les dépenses et le financement des opérations du pouvoir central, des provinces et des entités territoriales décentralisées sur un horizon de trois années. Ce cadrage budgétaire pluriannuel inclut le cadre des dépenses à moyen terme. »" },
      { type: 'paragraphe', texte: "L'annualité n'exclut donc pas la vision à moyen terme : elle s'y insère. Le **cadre budgétaire à moyen terme (CBMT)** - défini à l'art. 3 point 8 - est établi chaque année par le Ministre du Budget sur un horizon de trois ans, à partir des hypothèses macroéconomiques du ministère du Plan (art. 13). Depuis la loi n° 23/030 de 2023, ce CBMT, adopté en Conseil des ministres, est transmis à l'Assemblée nationale **au plus tard le 1er juin** et donne lieu à un **débat d'orientation budgétaire** au plus tard le 15 juin - un rendez-vous parlementaire nouveau, en amont de la session budgétaire. Le budget de l'année s'établit ensuite sur la base des hypothèses de la lettre d'orientation du Premier ministre." },
      { type: 'carte', titre: "Les aménagements légaux de l'annualité", tableau: {
        entetes: ['Aménagement', 'Mécanisme', 'Base légale'],
        lignes: [
          ['**Crédits provisoires**', "Loi de finances à part entière (art. 18) autorisant recettes et dépenses « nécessaires au fonctionnement minimum des services publics » quand la LF de l'année n'est pas promulguée à temps ; dépôt avant le 15 décembre, exécution jusqu'au 31 janvier - ou jusqu'au vote de la LF si le Gouvernement est réputé démissionnaire", 'Art. 18, 31 et 83 LOFIP · art. 126 Constitution'],
          ['**Loi de finances rectificative**', "Seule voie, sous réserve des exceptions des art. 48, 49, 53, 64, 70, 94 et 108, pour modifier en cours d'année les dispositions de la LF de l'année ; elle ratifie le cas échéant les modifications intervenues", 'Art. 26-27 LOFIP'],
          ["**Autorisations d'engagement pluriannuelles**", "L'engagement d'un marché peut s'exécuter sur plusieurs exercices selon un échéancier de paiements ; les crédits de paiement restent la limite annuelle", 'Art. 3 pt. 2, 22, 42 et 52 LOFIP'],
          ['**Reports de crédits**', "AE pluriannuelles et crédits de paiement non consommés reportés sur le même programme et le même titre, par arrêtés conjoints pris au plus tard le 31 mars ; report également des crédits couvrant des obligations nées au 31 octobre non payées au 31 décembre", 'Art. 53 et 93-94 LOFIP'],
          ['**Période complémentaire**', "Comptabilisation des recettes et dépenses budgétaires possible jusqu'au 31 janvier de l'année suivante, par décret du Premier ministre ; ouverte aussi aux opérations d'une LFR promulguée en décembre", 'Art. 97 LOFIP'],
        ],
      }, note: "Les « décrets d'avance » et « douzièmes provisoires » qu'on rencontre dans certains manuels appartiennent à d'autres droits budgétaires : la LOFIP congolaise ne les connaît pas - son mécanisme est la loi portant ouverture de crédits provisoires, relayée le cas échéant par l'ordonnance-loi du Président de la République (art. 83)." },
      { type: 'paragraphe', texte: "L'annualité gouverne aussi l'exécution : les recettes sont rattachées au budget de l'année de leur encaissement et les dépenses à celle de leur prise en charge par le comptable public (art. 92 al. 1-2) ; surtout, **les engagements de dépenses autres que de personnel, sur autorisations d'engagement annuelles, ne peuvent intervenir après le 31 octobre** (art. 92 al. 3) - discipline qui réserve la fin d'exercice à la liquidation, à l'ordonnancement et au paiement." },
      { type: 'filet', titre: 'Illustration - la LFR n° 25/044 du 28 juin 2025', texte: "La loi de finances rectificative n° 25/044 illustre l'art. 26 : en cours d'exercice 2025, le Gouvernement a révisé les hypothèses macroéconomiques (croissance ramenée de 5,7% à **5,3%**, taux de change moyen à **2 859,2 FC/USD**) et le budget est passé de 51 553,5 à **50 691,8 milliards FC**. La modification du budget initial a bien pris la forme d'une loi votée par le Parlement - jamais d'un simple acte réglementaire." },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[18] },
      { type: 'controle', question: QCM[14] },
    ],
  },
  {
    numero: '2.3',
    titre: "L'unité et l'universalité",
    navLabel: 'Unité · universalité',
    blocs: [
      { type: 'paragraphe', texte: "Le **principe d'unité** exige que toutes les ressources et toutes les charges d'une entité figurent dans un seul et même document : le Parlement - ou l'organe délibérant local - doit pouvoir embrasser d'un regard la totalité des finances qu'il autorise. L'art. 3 point 34 le définit comme « la règle budgétaire qui exige que les prévisions des recettes et des dépenses soient présentées dans un seul et même document »." },
      { type: 'filet', titre: 'Art. 6 LOFIP - texte exact', texte: "« Le pouvoir central, la province ou l'entité territoriale décentralisée présente, chacun en ce qui le concerne et dans un document unique, toutes les ressources et toutes les charges afférentes à une année. Le budget de l'entité territoriale décentralisée est intégré en recettes et en dépenses dans le budget de la province pour constituer le budget provincial. Les budgets provinciaux sont consolidés avec le budget du pouvoir central pour constituer le Budget de l'État. »" },
      { type: 'carte', titre: "L'unité en cascade : intégration puis consolidation", liste: [
        "**Niveau 1** - le budget de l'ETD (commune, secteur, chefferie) est *intégré* en recettes et en dépenses dans celui de la province : le résultat est le « budget provincial » (art. 3 pt. 5).",
        "**Niveau 2** - les budgets provinciaux sont *consolidés* avec le budget du pouvoir central : le résultat est le « Budget de l'État » (art. 3 pt. 4).",
        "**Niveau 3** - le budget du pouvoir central lui-même comprend le budget général, les budgets annexes et les comptes spéciaux (art. 20), tous retracés dans la loi de finances de l'année.",
      ], note: "La loi de finances 2026 (n° 25/060) donne la mesure de cette structure : budget du pouvoir central en équilibre à 54 335,8 milliards FC (art. 6), dont 48 969,3 milliards pour le budget général (art. 7), 962,3 milliards pour les budgets annexes et 4 404,2 milliards pour les comptes spéciaux." },
      { type: 'paragraphe', texte: "Le **principe d'universalité** complète l'unité : non seulement tout doit figurer dans le document, mais tout doit y figurer *en brut* et *sans fléchage*. L'art. 3 point 35 parle de « la règle budgétaire du produit brut qui interdit aux services la compensation, en amont, entre les recettes et les dépenses »." },
      { type: 'filet', titre: 'Art. 7 LOFIP - texte exact', texte: "« Le montant intégral des produits est enregistré sans contraction entre les recettes et les dépenses et, par conséquent, entre les dettes et les créances. L'ensemble de recettes assure l'exécution de l'ensemble de dépenses sans aucune affectation de leur produit à des dépenses particulières. »" },
      { type: 'carte', titre: 'Les deux règles jumelles de l\'universalité', liste: [
        "**Règle du produit brut (non-contraction)** : un service qui perçoit 10 millions FC de recettes et supporte 2 millions de frais verse 10 millions au Trésor - ses 2 millions de frais sont inscrits en dépenses budgétaires. Verser le solde net de 8 millions serait une contraction prohibée.",
        "**Règle de non-affectation** : aucune recette n'est réservée à une dépense déterminée ; l'ensemble des recettes couvre l'ensemble des dépenses. L'art. 54 le redit et n'admet d'exception que « prévue expressément » par la loi de finances.",
      ] },
      { type: 'carte', titre: "Les dérogations organisées par la LOFIP", tableau: {
        entetes: ['Dérogation', 'Mécanisme', 'Articles'],
        lignes: [
          ['**Budgets annexes**', "Services du pouvoir central non dotés de la personnalité juridique produisant des biens ou services contre redevances ; deux sections (opérations courantes, opérations en capital) ; excédent reversé au budget général, déficit couvert par subvention", 'Art. 55-58'],
          ['**Comptes d\'affectation spéciale**', 'Opérations budgétaires financées par des recettes particulières en relation directe avec les dépenses ; dépenses plafonnées aux recettes constatées (découvert limité aux trois premiers mois)', 'Art. 60, 62-65'],
          ['**Comptes de concours financiers**', "Prêts et avances consentis par le pouvoir central, un compte par débiteur ; crédits limitatifs, durée déterminée, taux d'intérêt encadré", 'Art. 66-68'],
          ['**Fonds de concours**', "Fonds à caractère non fiscal versés par des tiers pour des dépenses d'intérêt public, et produits de legs et donations ; crédits ouverts à due concurrence par arrêté du Ministre du Budget, emploi conforme à l'intention de la partie versante", 'Art. 69-71'],
          ['**Attributions de produits**', 'Recettes de prestations régulièrement fournies par un service, affectées à ce service par arrêté du Ministre du Budget', 'Art. 72'],
          ['**Rétablissement de crédits**', 'Restitution au Trésor de sommes payées indûment ou à titre provisoire, et recettes de cessions de biens et services', 'Art. 73'],
        ],
      }, note: "Toutes ces dérogations passent par la loi de finances ou par des actes qu'elle encadre : l'affectation reste un monopole du législateur financier (art. 54, 60). La LF 2026 en offre un exemple vivant avec le Fonds d'Investissement Stratégique de la RDC (FIS-RDC), créé comme compte d'affectation spéciale par son art. 51." },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[12] },
    ],
  },
  {
    numero: '2.4',
    titre: 'La spécialité, les neuf titres et les mouvements de crédits',
    navLabel: 'Spécialité · crédits',
    blocs: [
      { type: 'paragraphe', texte: "Le **principe de spécialité** donne à l'autorisation budgétaire son caractère précis et contraignant : les crédits ne sont pas votés en bloc mais libellés par destination et par nature. L'art. 3 point 36 le définit comme « la règle budgétaire qui prescrit de libeller, de façon détaillée, l'autorisation budgétaire des dépenses et des recettes ». Depuis la loi n° 23/030 du 28 juin 2023, l'art. 8 distingue deux réceptacles : le **programme** - assorti d'objectifs, de résultats attendus et d'indicateurs de performance (art. 43) - pour les ministères, et la **dotation budgétaire** - sans démarche de performance (art. 3 pt. 20) - pour les institutions de la République." },
      { type: 'filet', titre: 'Art. 8 LOFIP (réd. loi n° 23/030) - substance', texte: "Les crédits sont spécialisés par grande nature de dépenses ou titres, tels que précisés à l'art. 37, et par source de financement. Ils sont regroupés par programme ou par dotation ; les programmes ou les dotations peuvent être regroupés par fonction. La spécialité et le détail des crédits sont conformes à la nomenclature budgétaire en vigueur ; dans un budget-programme, la présentation par chapitre, article et littera est indicative." },
      { type: 'carte', titre: "Les neuf titres de l'art. 37 LOFIP", tableau: {
        entetes: ['Titre', 'Nature', 'Exemples (LF 2026, milliards FC)'],
        lignes: [
          ['**I**', 'Dette publique en capital', 'Remboursement du principal des dettes intérieure et extérieure - 2 060,0'],
          ['**II**', 'Frais financiers', 'Intérêts de la dette - 907,8'],
          ['**III**', 'Dépenses de personnel', 'Traitements de base et dépenses accessoires - 14 033,0'],
          ['**IV**', 'Biens et matériels', 'Fournitures, carburant, matériel de bureau - 804,7'],
          ['**V**', 'Dépenses de prestations', 'Services consommés par les administrations - 6 617,4'],
          ['**VI**', 'Transferts et interventions', 'Subventions, bourses, transferts aux provinces - 8 533,8'],
          ['**VII**', 'Équipements', 'Acquisitions d\'équipements lourds - 10 804,2'],
          ['**VIII**', "Construction, réfection, réhabilitation, addition d'ouvrage et édifice, acquisition immobilière", 'Routes, écoles, hôpitaux - 5 208,3'],
          ['**IX**', 'Prêts et avances', 'Concours financiers consentis par le pouvoir central'],
        ],
      }, note: "Les titres I à VI regroupent les dépenses courantes, les titres VII et VIII les dépenses en capital, le titre IX les prêts et avances. La présentation en « 5 titres » que l'on trouve dans certains supports ne correspond pas au texte congolais." },
      { type: 'paragraphe', texte: "La spécialité est tempérée par une souplesse graduée. D'abord la **fongibilité** : au sein d'un programme, les crédits sont fongibles *à l'intérieur du titre et de la source de financement* (art. 45) - le gestionnaire redéploie librement entre lignes d'un même titre, sous le suivi du Ministre du Budget. Ensuite le **virement** : entre titres d'un même programme, par arrêté du Ministre du Budget sur proposition du ministre concerné (art. 47). Enfin le **transfert** : entre programmes d'un même ministère ou entre dotations (art. 48, plafond annuel fixé par décret du Premier ministre) et entre programmes de ministères différents (art. 49, décret du Premier ministre après avis du Ministre du Budget) - avec ouverture de crédits à ratifier en LFR. Aucun virement ni transfert ne peut bénéficier à un programme non prévu par une loi de finances (art. 50)." },
      { type: 'filet', titre: "La fongibilité asymétrique et le verrou de l'art. 51", texte: "L'art. 3 point 28 définit la fongibilité asymétrique : les crédits du personnel « peuvent être utilisés pour d'autres natures de dépenses, à savoir, le fonctionnement, l'intervention et l'investissement tandis que l'inverse est interdit ». L'art. 51 pose le verrou opérationnel : les crédits de personnel sont des plafonds, assortis de plafonds d'autorisation d'emplois spécialisés par ministère, institution et budget annexe ; les créations d'emplois relèvent d'une loi de finances ; et « aucun virement ni transfert ne peut être effectué au profit du titre des dépenses de personnel à partir d'un autre titre ». La masse salariale ne peut donc croître que par décision du législateur financier - jamais par redéploiement administratif." },
      { type: 'carte', titre: 'La nature des crédits : trois régimes', liste: [
        "**Crédits limitatifs** (droit commun, art. 38) : les dépenses ne peuvent être engagées ni ordonnancées au-delà des dotations.",
        "**Crédits évaluatifs** (art. 39) : charges de la dette du pouvoir central - le dépassement est possible, avec information du Parlement et régularisation en LFR.",
        "**Crédits provisionnels** (art. 40) : dépenses accidentelles et imprévisibles (faits de guerre, catastrophes naturelles) - ordonnancement dans la limite des allocations, crédits supplémentaires demandés au Parlement en cas d'insuffisance, conformément à l'art. 129 de la Constitution.",
      ] },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[16] },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[17] },
      { type: 'controle', question: QCM[21] },
    ],
  },
  {
    numero: '2.5',
    titre: 'La légalité des recettes et des dépenses',
    navLabel: 'Légalité',
    blocs: [
      { type: 'paragraphe', texte: "Le **principe de légalité** est la traduction budgétaire de l'État de droit. Il se dédouble : légalité des recettes (art. 9) - nul prélèvement sans loi - et légalité des dépenses (art. 10) - nulle dépense hors des conditions légales. Son socle est constitutionnel : l'art. 174 dispose qu'« il ne peut être établi d'impôts que par la loi » et qu'« il ne peut être établi d'exemption ou d'allègement fiscal qu'en vertu de la loi », et l'art. 122 point 10 range l'assiette, le taux et le recouvrement des impositions de toute nature dans le domaine de la loi." },
      { type: 'filet', titre: 'Art. 9 LOFIP - substance exacte', texte: "« Il ne peut être établi d'impôts que par la loi. Il ne peut être établi d'exemption ou d'allégement fiscal qu'en vertu de la loi. » Les Assemblées provinciales et les organes délibérants des ETD « ne peuvent créer ni impôt, ni taxe, ni droit ou redevance ». Toutefois, conformément à l'art. 205 al. 2 de la Constitution, l'Assemblée nationale et le Sénat peuvent habiliter par une loi les Assemblées provinciales et les organes délibérants des ETD à fixer, par édit ou décision budgétaire, le taux et/ou les modalités de recouvrement de certains impôts provinciaux et locaux." },
      { type: 'paragraphe', texte: "La portée est considérable : seul le Parlement crée l'impôt, en fixe le taux et en règle le recouvrement ; les provinces et les ETD ne disposent d'aucun pouvoir fiscal créateur, seulement d'un pouvoir délégué et encadré sur le taux ou le recouvrement de certains impôts locaux. Tout prélèvement fondé sur un acte non législatif est illégal - et symétriquement, toute exonération accordée par simple arrêté est nulle. Les lois de finances annuelles le rappellent : la loi n° 25/060 pour 2026 réaffirme, dans ses dispositions générales (art. 2 à 4), la non-contraction de l'art. 7 LOFIP et le principe qu'aucune exonération ou allégement fiscal ne peut être établi qu'en vertu d'une loi, conformément à l'art. 9 al. 2 LOFIP." },
      { type: 'filet', titre: 'Art. 10 LOFIP - les quatre conditions cumulatives', texte: "« Aucune dépense ne peut être exécutée : si elle ne rentre pas dans les compétences du pouvoir central, des provinces ou des entités territoriales décentralisées telles que définies dans la Constitution et la loi ; si elle n'a pas été définie par un texte régulièrement adopté et publié par l'autorité compétente [...] ; si les crédits nécessaires ne sont pas disponibles au budget ; si elle correspond à des opérations financées en tout ou partie sur ressources extérieures pour lesquelles la mobilisation des fonds y relatifs n'est pas effective. »" },
      { type: 'carte', titre: 'Les quatre conditions décryptées', liste: [
        "**Compétence de l'entité** : la dépense doit relever des attributions constitutionnelles et légales du pouvoir central, de la province ou de l'ETD qui l'exécute - la condition vise l'entité publique, pas seulement l'ordonnateur.",
        "**Texte régulier** : les obligations financières créées par une loi, un édit, une décision, une ordonnance, un règlement ou un contrat « ne deviennent certaines et définitives qu'avec l'ouverture des crédits correspondants » - un engagement sans crédit n'oblige pas définitivement l'État.",
        "**Crédits disponibles** : condition la plus fréquemment violée ; engager sans crédits est une faute de gestion expressément visée à l'art. 129.",
        "**Mobilisation effective des fonds extérieurs** : une dépense sur financement extérieur ne s'exécute pas tant que les fonds du bailleur ne sont pas effectivement mobilisés.",
      ] },
      { type: 'paragraphe', texte: "La sanction de l'illégalité est organisée par le titre VII : les ordonnateurs répondent de leurs certifications, et toute personne qui engage des dépenses sans pouvoir, sans crédits disponibles, ou qui enfreint les règles d'exécution des recettes et des dépenses, commet une **faute de gestion** punie d'une amende pouvant atteindre le double du traitement brut annuel (art. 128-129). Qui manie des fonds publics sans titre est **comptable de fait** (art. 130). Ces fautes sont jugées par la **Cour des comptes** (art. 131), dont le contrôle sur les finances de l'État est lui-même constitutionnel (art. 178-180 de la Constitution)." },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[9] },
    ],
  },
  {
    numero: '2.6',
    titre: 'La sincérité et la synthèse des six principes',
    navLabel: 'Sincérité · synthèse',
    blocs: [
      { type: 'paragraphe', texte: "Le **principe de sincérité** est le plus récent des six, hérité des réformes modernes de la gestion publique. L'art. 3 point 37 le définit en creux : c'est « la règle budgétaire qui interdit à l'État de sous-estimer ou de surestimer les charges et les ressources qu'il présente dans la loi de finances, l'édit budgétaire et la décision budgétaire ». Il vise l'honnêteté des prévisions comme la fidélité des comptes." },
      { type: 'filet', titre: 'Art. 11 LOFIP - texte exact', texte: "« Le budget du pouvoir central, de la province ou de l'entité territoriale décentralisée présente de façon sincère l'ensemble de leurs ressources et de leurs charges. La sincérité s'apprécie compte tenu des informations disponibles et des prévisions qui en découlent. Tout projet de loi, d'édit, de décision, d'ordonnance ou de règlement ayant une incidence financière doit être accompagné d'une annexe précisant ses conséquences au titre du budget de l'année d'entrée en vigueur et de l'année suivante. Les comptes du pouvoir central, de la province et de l'entité territoriale décentralisée doivent être réguliers, sincères et refléter une image fidèle de leur situation financière et patrimoniale. »" },
      { type: 'carte', titre: 'Les trois dimensions de la sincérité', liste: [
        "**Sincérité des prévisions** : les hypothèses macroéconomiques (croissance, inflation, taux de change) qui fondent recettes et dépenses doivent être établies de bonne foi, « compte tenu des informations disponibles » - ni optimisme de façade, ni sous-estimation délibérée.",
        "**Sincérité des comptes** : réguliers, sincères, image fidèle de la situation financière et patrimoniale - une exigence parallèle à celle que le droit comptable OHADA impose aux entreprises, ici portée par la comptabilité générale de l'État en droits constatés (art. 99-100).",
        "**Étude d'impact financière** : tout acte normatif ayant une incidence financière - loi, édit, décision, ordonnance ou règlement - est accompagné d'une annexe chiffrant ses conséquences pour l'année d'entrée en vigueur et l'année suivante, afin que l'autorisation soit donnée en connaissance de cause.",
      ] },
      { type: 'filet', titre: 'La sincérité en actes : 2025-2026', texte: "La révision à la baisse du budget 2025 par la LFR n° 25/044 (de 51 553,5 à **50 691,8 milliards FC**, croissance ramenée à 5,3%) est une correction sincère de prévisions devenues irréalistes. Le budget 2026 (loi n° 25/060) affiche ensuite **54 335,8 milliards FC** en équilibre, bâti sur une croissance de 5,3%, une inflation moyenne de 4,4% et un taux de change de 2 467,0 FC/USD - des hypothèses que le Parlement a pu confronter aux réalisations de 2025 grâce aux documents annexés exigés par l'art. 79, enrichi en 2023 (projets annuels de performance, plan de trésorerie prévisionnel, rapport sur les dépenses fiscales, déclaration sur les risques budgétaires)." },
      { type: 'carte', titre: 'Synthèse - les six principes, leurs règles et leurs dérogations', tableau: {
        entetes: ['Principe', 'Articles', 'Règle', 'Aménagements'],
        lignes: [
          ['**Annualité**', 'Art. 5 · 172 Const.', '1er janvier - 31 décembre', 'Crédits provisoires, LFR, AE pluriannuelles, reports, période complémentaire'],
          ['**Unité**', 'Art. 6', 'Document unique par entité', 'Budgets annexes, comptes spéciaux (dans la LF elle-même)'],
          ['**Universalité**', 'Art. 7 et 54', 'Produit brut, non-affectation', "Budgets annexes, comptes spéciaux, fonds de concours, attributions de produits, rétablissement de crédits"],
          ['**Spécialité**', 'Art. 8 et 37', 'Crédits par titre, source, programme ou dotation', 'Fongibilité (art. 45), virements (art. 47), transferts (art. 48-49)'],
          ['**Légalité**', 'Art. 9-10 · 174 Const.', 'Impôt et exemption par la loi ; dépense sous quatre conditions', 'Habilitation des provinces sur taux et recouvrement (art. 205 al. 2 Const.)'],
          ['**Sincérité**', 'Art. 11', 'Prévisions honnêtes, comptes fidèles', 'Aucun - la sincérité s\'apprécie selon les informations disponibles'],
        ],
      } },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[19] },
      { type: 'controle', question: QCM[20] },
      { type: 'controle', question: QCM[11] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: "Le Ministère de la Santé face à l'épidémie de fin d'année",
    contexte: "En novembre 2025, une épidémie de choléra éclate dans trois provinces. Le Ministère de la Santé a épuisé les crédits de biens et matériels (titre IV) de son programme « lutte contre la maladie », mais des crédits de personnel (titre III) du même programme restent disponibles, plusieurs postes n'ayant pas été pourvus. Le Ministre envisage : (Option A) faire glisser 500 millions FC du titre III vers le titre IV pour acheter des médicaments ; (Option B) engager les achats d'urgence en dépassant les crédits disponibles ; (Option C) solliciter du Ministre du Budget la régularisation de l'opération. Le directeur administratif et financier vous consulte.",
    questions: [
      { num: 1, enonce: "L'Option A (mouvement du titre III - personnel vers le titre IV - biens et matériels) est-elle possible selon la LOFIP ? Qualifiez l'opération et sa procédure.", correction: "Oui, dans son principe et dans ce sens-là. La fongibilité asymétrique définie à l'art. 3 point 28 de la LOFIP permet précisément d'utiliser les crédits du personnel « pour d'autres natures de dépenses, à savoir, le fonctionnement, l'intervention et l'investissement tandis que l'inverse est interdit ». Mais attention à la qualification : la fongibilité de plein droit de l'art. 45 ne joue qu'à l'intérieur d'un même titre et d'une même source de financement au sein du programme. Ici, les crédits changent de titre (III vers IV) au sein d'un même programme : c'est un virement de crédits au sens de l'art. 47, opéré par arrêté du Ministre ayant le budget dans ses attributions, sur proposition du Ministre de la Santé. Le sens du mouvement est licite - c'est l'inverse (abonder le titre III) que l'art. 51 prohibe absolument. L'engagement des dépenses nouvelles devra en outre composer avec la date-butoir du 31 octobre de l'art. 92 al. 3 pour les AE annuelles : en novembre, l'opération suppose que les engagements s'inscrivent dans les cas que la loi permet encore d'exécuter." },
      { num: 2, enonce: "L'Option B (dépasser les crédits disponibles pour l'achat d'urgence) est-elle légale au regard de l'art. 10 LOFIP ? Quelles conséquences pour ses auteurs ?", correction: "Elle est illégale. L'art. 10 interdit d'exécuter toute dépense « si les crédits nécessaires ne sont pas disponibles au budget » - condition sine qua non, même en urgence sanitaire, sauf à relever des crédits provisionnels de l'art. 40 (dépenses accidentelles et imprévisibles) si la loi de finances en a ouverts, et dans la limite de leurs allocations. Celui qui passerait outre commettrait la faute de gestion de l'art. 129 (« qui aura engagé des dépenses sans disponibilité des crédits »), punie d'une amende pouvant atteindre le double de son traitement brut annuel, prononcée par la Cour des comptes (art. 131), sans préjudice des sanctions disciplinaires, civiles et pénales (art. 128). En amont, le contrôleur budgétaire doit refuser son visa (art. 112-113) et le comptable public refuser le paiement, son contrôle portant notamment sur l'existence des contrôles préalables (art. 119). La voie légale pour des besoins dépassant les crédits : virement (art. 47), crédits supplémentaires sur crédits provisionnels (art. 40), ou loi de finances rectificative (art. 26-27)." },
      { num: 3, enonce: "Distinguez précisément virement et transfert de crédits (art. 47 à 49 LOFIP) : périmètre, autorité, formalisation.", correction: "Le virement (art. 47) déplace des crédits entre les titres des dépenses, par source de financement, au sein d'un même programme ; il est opéré par arrêté du Ministre ayant le budget dans ses attributions, sur proposition du ministre ou responsable d'institution concerné. Le transfert change de programme : entre programmes d'un même ministère ou entre dotations (art. 48, réd. loi n° 23/030), le montant cumulé annuel est fixé par décret du Premier ministre délibéré en Conseil des ministres sur proposition du Ministre du Budget ; entre programmes de ministères différents (art. 49), il intervient par décret du Premier ministre après avis préalable du Ministre du Budget et sur proposition des ministres concernés. Dans les deux cas de transfert, les crédits ne portent que sur des titres de même nature et l'opération fait l'objet de propositions d'ouverture de crédits dans le projet de LFR. Deux verrous communs : aucun virement ni transfert au profit d'un programme non prévu par une loi de finances (art. 50), ni au profit du titre des dépenses de personnel (art. 51)." },
    ],
  },
  {
    id: 'cp2',
    titre: "L'Office national des routes et le principe de sincérité",
    contexte: "Lors de la préparation du budget 2026, le directeur général de l'Office national des routes soumet des prévisions de recettes de péage de 8 milliards FC, alors que la moyenne des trois derniers exercices est de 3,2 milliards, en invoquant la mise en service prévue de trois nouveaux tronçons. Il omet par ailleurs d'inscrire les rémunérations de 200 agents contractuels employés en dehors du tableau des effectifs autorisé. L'Inspection générale des finances saisit le Ministre du Budget.",
    questions: [
      { num: 1, enonce: "Analysez les deux irrégularités au regard du principe de sincérité (art. 11 LOFIP).", correction: "Deux violations distinctes. (1) La surestimation des recettes contredit l'art. 11 : « la sincérité s'apprécie compte tenu des informations disponibles et des prévisions qui en découlent ». Prévoir 8 milliards FC quand la moyenne historique est de 3,2 milliards - un multiple de 2,5 - sans étude crédible de l'apport des nouveaux tronçons n'est pas une prévision qui « découle » des informations disponibles : c'est l'excès d'optimisme que l'art. 3 point 37 interdit (« surestimer les ressources »). (2) L'omission des 200 agents est une sous-estimation des charges, également prohibée : elle fausse le titre des dépenses de personnel et dissimule un dépassement futur inévitable. Elle heurte de surcroît l'art. 51 : les crédits de personnel sont des plafonds assortis de plafonds d'autorisation d'emplois spécialisés, et employer hors du tableau des effectifs revient à contourner l'autorisation du législateur financier - les créations d'emplois relèvent d'une loi de finances." },
      { num: 2, enonce: "Quelles mesures correctrices l'administration peut-elle prendre pour rétablir la sincérité ?", correction: "D'abord corriger les prévisions : asseoir les recettes de péage sur la moyenne historique, corrigée d'un coefficient documenté pour les tronçons nouveaux, conformément à l'exigence de prévisions découlant des informations disponibles (art. 11). Ensuite régulariser le personnel : inscrire les 200 agents dans le titre des dépenses de personnel avec leurs rémunérations réelles ; si le plafond d'emplois autorisé est dépassé, seule une loi de finances - initiale ou rectificative - peut réviser le plafond et créer les emplois (art. 51 ; art. 22 pour les plafonds d'autorisations d'emplois). Enfin, le volet répressif : la présentation sciemment insincère peut constituer une faute de gestion (art. 129 - dissimulation permettant une fausse imputation, violation des règles d'exécution), jugée par la Cour des comptes (art. 131). L'Inspection générale des finances tient sa compétence générale de contrôle de l'art. 121 et veille à l'application des lois et règlements régissant les finances publiques (art. 122)." },
    ],
  },
  {
    id: 'cp3',
    titre: "Le « Fonds spécial des infrastructures » hors budget",
    contexte: "Lors du débat budgétaire, un projet gouvernemental propose de créer un « Fonds spécial pour les infrastructures » qui capterait directement 15% des recettes douanières - la LF 2026 (loi n° 25/060) prévoit 7 522,0 milliards FC de recettes de douanes et accises - et serait géré hors du budget général, sans texte dans la loi de finances. L'opposition parlementaire conteste le dispositif.",
    questions: [
      { num: 1, enonce: "Ce fonds viole-t-il le principe d'universalité (art. 7 LOFIP) ? Analysez ses deux règles.", correction: "Oui, doublement. (1) Règle du produit brut : l'art. 7 impose que « le montant intégral des produits » soit enregistré « sans contraction entre les recettes et les dépenses » ; capter 15% des recettes douanières avant leur versement au budget revient à ne présenter au Parlement qu'un produit net, en violation directe du texte. (2) Règle de non-affectation : « l'ensemble de recettes assure l'exécution de l'ensemble de dépenses sans aucune affectation de leur produit à des dépenses particulières » ; réserver une fraction des recettes DGDA aux seules infrastructures est une affectation prohibée. L'art. 54 enfonce le clou : aucune recette ne peut être affectée à une dépense particulière, sauf affectation « expressément » prévue par la loi de finances sous forme de budget annexe, de compte spécial ou de procédure comptable particulière. Un fonds géré hors budget, sans texte de loi de finances, viole aussi l'unité (art. 6) : il soustrait des ressources et des charges au document unique." },
      { num: 2, enonce: "Le dispositif pourrait-il être régularisé dans une des dérogations prévues par la LOFIP ?", correction: "Oui, en le transformant en compte d'affectation spéciale. Les comptes spéciaux ne peuvent être ouverts que par une loi de finances, et l'affectation d'une recette à un tel compte ne peut résulter que d'une disposition de loi de finances (art. 60). Le compte d'affectation spéciale retrace des opérations budgétaires financées par des recettes particulières « par nature, en relation directe avec les dépenses concernées » (art. 62) - il faudrait donc établir ce lien direct entre la ressource choisie et les dépenses d'infrastructures. Ses dépenses seraient plafonnées aux recettes constatées (art. 65), ses opérations prévues, autorisées et exécutées comme celles du budget (art. 61), et le tout resterait sous contrôle parlementaire. Le précédent existe : la LF 2026 (art. 51) a créé le Fonds d'Investissement Stratégique de la RDC comme compte d'affectation spéciale, alimenté par des quotités définies par la loi elle-même. Ce qui est illégal n'est pas l'idée d'un fonds - c'est le fonds hors budget, sans loi de finances." },
      { num: 3, enonce: "Quels contrôles s'exerceraient sur un tel fonds s'il était néanmoins mis en place ?", correction: "Trois étages. (1) Contrôle administratif : le contrôleur budgétaire viserait - ou refuserait de viser - les actes d'engagement (art. 112-113), et l'Inspection générale des finances, dotée d'une compétence générale sur les finances et biens publics, pourrait enquêter (art. 121-122). (2) Contrôle juridictionnel : la Cour des comptes, chargée par l'art. 180 de la Constitution de contrôler la gestion des finances de l'État et par les art. 123-126 LOFIP de vérifier a posteriori la régularité des opérations des ordonnateurs et comptables, jugerait les comptes ; quiconque manierait les fonds du dispositif sans titre serait comptable de fait (art. 130), et les fautes de gestion seraient sanctionnées (art. 129, 131). (3) Contrôle parlementaire : le Parlement veille à la bonne exécution de la loi de finances, ses demandes d'information et investigations ne peuvent lui être refusées, et le contrôle a posteriori s'exerce lors de l'examen de la loi portant reddition des comptes (art. 127), établie avec le rapport de la Cour des comptes (art. 82) et examinée avant le vote de la loi de finances suivante (art. 87)." },
    ],
  },
  {
    id: 'cp4',
    titre: "Virement ou transfert : le Ministère de l'Éducation nationale",
    contexte: "Le Ministère de l'Éducation nationale gère deux programmes : « enseignement primaire » (programme A) et « enseignement secondaire » (programme B). En août, le programme A a consommé 95% de ses crédits de prestations (titre V), tandis que le programme B présente un excédent de 1,2 milliard FC sur ce même titre. Une pénurie de manuels exige par ailleurs 800 millions FC supplémentaires. Le directeur du budget du ministère envisage : (Op. 1) déplacer 800 millions FC du titre V du programme B vers le programme A ; (Op. 2) redéployer, au sein du programme A, des crédits de personnel (titre III) non consommés vers le titre V.",
    questions: [
      { num: 1, enonce: "Qualifiez juridiquement l'Opération 1 : virement ou transfert ? Quelle autorité, quelle procédure ?", correction: "C'est un transfert de crédits au sens de l'art. 48 LOFIP (réd. loi n° 23/030) : les crédits passent d'un programme à un autre au sein d'un même ministère. Le transfert ne peut porter que sur des titres de même nature dans chacun des programmes - condition remplie ici (titre V vers titre V). Le montant cumulé des transferts de cette forme au cours de l'année est fixé par décret du Premier ministre délibéré en Conseil des ministres, sur proposition du Ministre ayant le budget dans ses attributions, et l'opération fait l'objet de propositions d'ouverture de crédits dans le projet de loi de finances rectificative. Ce n'est pas un virement : le virement de l'art. 47 joue entre titres d'un même programme, par simple arrêté du Ministre du Budget. La distinction commande donc l'autorité compétente : arrêté ministériel pour le virement, décret du Premier ministre pour le transfert." },
      { num: 2, enonce: "L'Opération 2 (titre III vers titre V au sein du programme A) est-elle conforme ? Dans quel sens joue l'asymétrie ?", correction: "Elle est conforme. Le mouvement se fait entre titres d'un même programme : c'est un virement de l'art. 47, par arrêté du Ministre du Budget sur proposition du ministre concerné. Son sens - du personnel vers une autre nature de dépense - est précisément celui que la fongibilité asymétrique autorise : l'art. 3 point 28 permet d'utiliser les crédits du personnel pour le fonctionnement, l'intervention et l'investissement, « tandis que l'inverse est interdit ». Le verrou de l'art. 51 ne joue que dans l'autre direction : aucun virement ni transfert ne peut abonder le titre des dépenses de personnel. En pratique, les crédits de postes non pourvus peuvent donc financer les manuels ; l'inverse - payer des salaires avec des crédits de prestations - serait radicalement impossible, quelle que soit l'autorité signataire." },
      { num: 3, enonce: "Si ni virement ni transfert ne suffisent, quels mécanismes permettent d'ouvrir des crédits supplémentaires en cours d'exercice ?", correction: "Trois voies, à choisir selon la situation. (1) La loi de finances rectificative (art. 26-27) : voie de principe - sous réserve des exceptions limitativement énumérées (art. 48, 49, 53, 64, 70, 94 et 108), seule la LFR peut modifier en cours d'année les dispositions de la loi de finances ; toute ouverture de crédits supplémentaires prévoit les voies et moyens nécessaires et s'accompagne d'un rapport du Premier ministre au Parlement (art. 41). (2) Les crédits provisionnels (art. 40) : si la loi de finances en a ouverts pour les dépenses accidentelles et imprévisibles, ils s'ordonnancent dans la limite de leurs allocations, des crédits supplémentaires étant demandés au Parlement en cas d'insuffisance, conformément à l'art. 129 de la Constitution. (3) Les recettes d'aubaine ciblées : un fonds de concours versé par un tiers pour cette dépense d'intérêt public ouvrirait des crédits de même montant par arrêté du Ministre du Budget (art. 70). En revanche, les « décrets d'avance » n'existent pas dans la LOFIP, et la loi portant ouverture de crédits provisoires (art. 31, 83) ne concerne que l'hypothèse d'une loi de finances non promulguée au début de l'exercice - elle est étrangère aux besoins nouveaux de milieu d'année." },
    ],
  },
  {
    id: 'cp5',
    titre: "L'exonération fiscale accordée par arrêté",
    contexte: "Par arrêté interministériel, les ministères du Commerce et des Finances accordent à une société importatrice de matériaux de construction une exonération totale de TVA (taux normal de 16%) et de droits d'accises pour trois ans, au motif de favoriser le logement social. Aucune loi ni aucune disposition de la loi de finances 2026 (n° 25/060 du 29 décembre 2025) ne prévoit cette exonération. La DGDA refuse d'appliquer l'arrêté et saisit l'Inspection générale des finances.",
    questions: [
      { num: 1, enonce: "L'arrêté est-il légal au regard de l'art. 9 LOFIP, de l'art. 174 de la Constitution et de la LF 2026 ?", correction: "Il est illégal à triple titre. (1) L'art. 9 al. 2 de la LOFIP dispose : « Il ne peut être établi d'exemption ou d'allégement fiscal qu'en vertu de la loi. » Une exonération de TVA et d'accises est un allégement fiscal : elle ne peut résulter que d'une loi, jamais d'un arrêté, fût-il interministériel. (2) La règle est constitutionnelle : l'art. 174 al. 3 de la Constitution reprend mot pour mot la même exigence, et l'art. 122 point 10 réserve à la loi l'assiette, le taux et les modalités de recouvrement des impositions de toute nature. (3) La loi de finances 2026 réaffirme elle-même, dans ses dispositions générales (art. 2 à 4), qu'aucune exonération ou allégement fiscal ne peut être établi qu'en vertu d'une loi, conformément à l'art. 9 al. 2 LOFIP. Le refus de la DGDA est donc juridiquement fondé : l'administration ne doit pas appliquer un acte réglementaire manifestement contraire à la loi et à la Constitution en matière fiscale." },
      { num: 2, enonce: "Quelles suites peuvent être données, et comment le Gouvernement pourrait-il légalement accorder cet avantage ?", correction: "Sur les suites : l'exonération accordée sans loi prive l'État de recettes ; ses auteurs s'exposent au régime des sanctions du titre VII de la LOFIP - la faute de gestion de l'art. 129 vise expressément celui « qui aura omis en méconnaissance de la loi fiscale, de remplir les obligations qu'elle impose aux fins d'avantager indûment les contribuables » et celui qui procure « à soi-même ou à autrui un avantage injustifié », l'amende pouvant atteindre le double du traitement brut annuel, prononcée par la Cour des comptes (art. 131), sans préjudice des responsabilités disciplinaire, civile et pénale (art. 128) et de la responsabilité politique des ministres devant le Parlement. Pour régulariser : déposer un projet de loi - typiquement une disposition de la prochaine loi de finances ou d'une LFR, qui sont le véhicule naturel des mesures fiscales - et le faire voter par le Parlement. L'annexe d'incidence financière de l'art. 11 LOFIP chiffrerait alors le coût de la dépense fiscale pour l'année d'entrée en vigueur et l'année suivante." },
      { num: 3, enonce: "En quoi la réserve de loi en matière d'exonérations protège-t-elle les recettes publiques ? Illustrez avec les masses de la LF 2026.", correction: "La réserve de loi transforme chaque avantage fiscal en décision publique, débattue et chiffrée. (1) Transparence : votée par le Parlement, l'exonération devient une dépense fiscale visible - la LOFIP modifiée en 2023 impose d'ailleurs, parmi les documents accompagnant le projet de loi de finances, un rapport sur les dépenses fiscales (art. 79). (2) Égalité et lutte contre le favoritisme : elle empêche l'exécutif d'accorder des avantages discrétionnaires à des intérêts particuliers. (3) Préservation de l'équilibre : le budget 2026 est arrêté en équilibre à 54 335,8 milliards FC (art. 6 de la loi n° 25/060), financé notamment par 19 033,6 milliards de recettes d'impôts et 7 522,0 milliards de douanes et accises ; toute érosion non votée de ces assiettes détruit l'équilibre que l'art. 14 LOFIP impose et que le Parlement a arrêté. C'est le même verrou qui protège les amendements parlementaires coûteux : irrecevables s'ils diminuent les recettes ou aggravent les charges sans compensation (art. 86 LOFIP ; art. 127 et 134 de la Constitution)." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue5',
  numero: 2,
  id: 'ue5-chapitre-2',
  titre: 'Les principes budgétaires',
  sousTitre: 'LOFIP n° 11/011 du 13 juillet 2011 (mod. 2018 et 2023), art. 4 à 11 · Constitution, art. 126, 172, 174-175',
  infoBulle: "Les six principes budgétaires de la LOFIP (art. 4 à 11) : annualité, unité, universalité, spécialité, légalité des recettes et des dépenses, sincérité - avec leurs aménagements (crédits provisoires, LFR, reports, fongibilité, virements et transferts) et les neuf titres de dépenses de l'art. 37.",
  loiRef: 'Art. 4-11 LOFIP',
  moduleLabel: 'UE 5 · Finances publiques',
  retourRoute: '/ue5-finances-publiques',
  coursId: 'ue5-finances-publiques',
  objectifs: [
    'Énoncer et expliquer les six principes budgétaires (art. 4 à 11 LOFIP) et leurs définitions légales (art. 3 pt. 33-37)',
    "Situer leur socle constitutionnel : art. 122, 126, 172, 174 et 175 de la Constitution",
    "Identifier les aménagements de l'annualité : crédits provisoires (art. 18, 31, 83), LFR (art. 26-27), AE pluriannuelles (art. 22, 42, 52), reports (art. 53, 93-94), période complémentaire (art. 97), butoir du 31 octobre (art. 92)",
    "Maîtriser la nomenclature des neuf titres de dépenses (art. 37) et les mouvements de crédits : fongibilité (art. 45), virements (art. 47), transferts (art. 48-49), verrou du personnel (art. 51)",
    "Distinguer les dérogations à l'unité et à l'universalité : budgets annexes, comptes spéciaux, fonds de concours, attributions de produits, rétablissement de crédits (art. 54-73)",
    "Appliquer les principes à des situations concrètes et à l'actualité : LFR n° 25/044 et loi de finances 2026 (n° 25/060)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "L'art. 4 LOFIP fonde le Budget de l'État sur six principes : annualité (art. 5), unité (art. 6), universalité (art. 7), spécialité (art. 8), légalité des recettes et des dépenses (art. 9-10) et sincérité (art. 11) - chacun également défini à l'art. 3 (pt. 33-37).",
    "Annualité : exercice du 1er janvier au 31 décembre (art. 5 LOFIP, art. 172 Constitution), dans un cadrage pluriannuel de trois ans (CBMT transmis à l'Assemblée nationale au plus tard le 1er juin, débat d'orientation budgétaire au 15 juin - art. 13 réd. 2023) ; aménagements : crédits provisoires (art. 18, 31, 83), LFR (art. 26-27), AE pluriannuelles (art. 22, 42, 52), reports (art. 53, 93-94), période complémentaire jusqu'au 31 janvier (art. 97), engagement des dépenses hors personnel impossible après le 31 octobre (art. 92).",
    "Unité : chaque entité présente toutes ses ressources et charges dans un document unique ; le budget de l'ETD est intégré dans le budget provincial, et les budgets provinciaux sont consolidés avec celui du pouvoir central pour former le Budget de l'État (art. 6).",
    "Universalité : produit brut sans contraction et interdiction d'affecter une recette à une dépense (art. 7 et 54) ; seules les lois de finances peuvent y déroger, par budgets annexes (art. 55-58), comptes spéciaux (art. 59-68) ou procédures particulières - fonds de concours, attributions de produits, rétablissement de crédits (art. 69-73).",
    "Spécialité : crédits spécialisés par titre et par source de financement, regroupés par programme ou - depuis la loi n° 23/030 - par dotation (art. 8) ; l'art. 37 compte NEUF titres : dette publique en capital, frais financiers, personnel, biens et matériels, prestations, transferts et interventions, équipements, construction, prêts et avances.",
    "Mouvements de crédits : fongibilité à l'intérieur du titre et de la source de financement (art. 45) ; virement entre titres d'un même programme par arrêté du Ministre du Budget (art. 47) ; transferts entre programmes par décret du Premier ministre (art. 48-49) ; jamais au profit d'un programme non prévu par une loi de finances (art. 50) ni du titre des dépenses de personnel (art. 51 - la fongibilité est asymétrique, art. 3 pt. 28).",
    "Légalité : pas d'impôt ni d'exemption sans loi (art. 9 LOFIP, art. 174 Constitution) - les provinces et ETD ne créent aucun prélèvement, une loi d'habilitation pouvant seulement leur confier taux et recouvrement de certains impôts locaux ; aucune dépense sans compétence, texte régulier, crédits disponibles et fonds extérieurs mobilisés (art. 10).",
    "Sincérité : prévisions établies de bonne foi selon les informations disponibles, annexe d'incidence financière pour tout texte à impact budgétaire (année d'entrée en vigueur et année suivante), comptes réguliers, sincères et fidèles (art. 11) ; les violations exposent à la faute de gestion (art. 129) jugée par la Cour des comptes (art. 131).",
    "Actualité : la LFR n° 25/044 du 28 juin 2025 (budget 2025 ramené à 50 691,8 milliards FC, croissance 5,3%) illustre l'annualité et la sincérité ; la LF 2026 (n° 25/060, budget en équilibre à 54 335,8 milliards FC) réaffirme la non-contraction et la réserve de loi en matière d'exonérations, et crée le FIS-RDC comme compte d'affectation spéciale (art. 51 LF 2026).",
  ],
  references: [
    {
      genre: 'texte',
      intitule: 'Loi n° 11/011 du 13 juillet 2011 relative aux finances publiques (LOFIP)',
      precision: 'telle que modifiée par la loi n° 18/010 du 9 juillet 2018 et par la loi n° 23/030 du 28 juin 2023 ; art. 3 à 11, 17-31, 36-54, 55-73, 76-97 et 111-131',
    },
    {
      genre: 'texte',
      intitule: 'Constitution de la République Démocratique du Congo du 18 février 2006',
      precision: 'telle que modifiée par la loi n° 11/002 du 20 janvier 2011 ; art. 122, 126-127, 129, 134, 172, 174-175 et 178-181',
    },
    {
      genre: 'texte',
      intitule: 'Loi de finances n° 25/044 du 28 juin 2025 rectificative pour l\'exercice 2025',
    },
    {
      genre: 'texte',
      intitule: 'Loi de finances n° 25/060 du 29 décembre 2025 pour l\'exercice 2026',
      precision: 'art. 2-9, 51 et annexes (cadrage macroéconomique, synthèse des dépenses par titre)',
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : LOFIP n° 11/011 du 13 juillet 2011 (mod. lois n° 18/010 et n° 23/030), art. 3-11, 17-97 et 111-131 · Constitution du 18 février 2006, art. 122, 126, 172-175 · LFR n° 25/044 du 28 juin 2025 · LF n° 25/060 du 29 décembre 2025',
}

export default chapitre
