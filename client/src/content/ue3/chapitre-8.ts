// Chapitre 8 du module UE3, Comptabilité des sociétés : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
//
// Réécriture approfondie (septembre 2026). Sources lues pendant la rédaction :
// - AUSCGIE révisé du 30 janvier 2014 : art. 177, 189-199 (fusion,
//   scission, apport partiel d'actif), 382-383 (SARL), 639, 670-689 (SA :
//   rapports, commissaire à la fusion, documents, filiale à 100 %,
//   obligataires, créanciers, scission), 809-810 (obligataires), skill
//   auscgie-acte-uniforme. Anomalies signalées : coquille de l'art. 195,
//   renvoi de l'art. 670 à des alinéas inexistants, renvoi de l'art. 682
//   à l'art. 265 (qui vise la transformation).
// - AUDCIF, Titre VIII, chapitre 38 (fusions et opérations assimilées :
//   principes, évaluation, parité, rompus, fusion, renonciation,
//   allotissement, apport partiel d'actif, scission, Notes annexes) ;
//   SYSCOHADA révisé, Applications 116 à 120 ; plan de comptes. Anomalies
//   signalées : plafond de la soulte exprimé en valeur nominale au § 2.3.2,
//   compte 2231 dans l'Application 117, ventilation de l'étape 1 de
//   l'Application 118, compte « 10523 » de l'Application 119, calcul de la
//   prime d'apport de l'Application 120, libellé du compte 4718.
// - Loi n° 23/053 du 30 novembre 2023, art. 54 ; décret n° 03/012 et
//   mesures d'exécution (retrait du Numéro Impôt en cas de fusion), skill
//   fiscalite-rdc.
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch8-q1', question: "Selon l'article 189 de l'AUSCGIE, la fusion est :",
    options: [
      { id: 'a', texte: "L'achat de la totalité des actions d'une société par une autre" },
      { id: 'b', texte: "L'opération par laquelle deux ou plusieurs sociétés se réunissent pour n'en former qu'une seule, par création d'une société nouvelle ou par absorption" },
      { id: 'c', texte: "La mise en commun de moyens dans un GIE" },
      { id: 'd', texte: "L'apport d'une branche d'activité" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 189 AUSCGIE',
    explication: "La fusion transmet à titre universel le patrimoine des sociétés qui disparaissent à l'absorbante ou à la société nouvelle. Une société même en liquidation peut être absorbée ou participer à une fusion-réunion. L'achat de 100 % des actions, lui, laisse subsister la société acquise.",
  },
  {
    id: 'ch8-q2', question: "Quel est le sort de la société absorbée ?",
    options: [
      { id: 'a', texte: "Elle est liquidée : ses actifs sont vendus et ses dettes payées" },
      { id: 'b', texte: "Elle est dissoute sans liquidation, son patrimoine étant transmis universellement" },
      { id: 'c', texte: "Elle devient filiale de l'absorbante" },
      { id: 'd', texte: "Elle survit sous une nouvelle dénomination" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 191 AUSCGIE',
    explication: "La dissolution sans liquidation et la transmission universelle se produisent dans l'état où se trouve le patrimoine à la date de réalisation définitive. Simultanément, les associés de l'absorbée deviennent associés de la bénéficiaire.",
  },
  {
    id: 'ch8-q3', question: "Dans quelle limite une soulte peut-elle compléter l'échange des titres ?",
    options: [
      { id: 'a', texte: "Sans limite" },
      { id: 'b', texte: "10 % de la valeur d'échange des parts ou actions attribuées" },
      { id: 'c', texte: "25 % de l'actif net apporté" },
      { id: 'd', texte: "5 % du capital de l'absorbante" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 191 AUSCGIE',
    explication: "L'art. 191 retient la valeur d'échange. Le § 2.3.2 du chapitre 38 de l'AUDCIF, qui cite pourtant l'art. 191, parle de « 10 % de la valeur nominale » : c'est le texte de l'Acte uniforme qui prévaut.",
  },
  {
    id: 'ch8-q4', question: "En quoi l'apport partiel d'actif diffère-t-il de la scission ?",
    options: [
      { id: 'a', texte: "Il porte sur tout le patrimoine" },
      { id: 'b', texte: "La société apporteuse ne disparaît pas ; elle apporte une branche autonome d'activité et reçoit des titres, sous le régime de la scission" },
      { id: 'c', texte: "Il n'est pas rémunéré" },
      { id: 'd', texte: "Il est réservé aux SARL" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 190 et 195 AUSCGIE',
    explication: "Dans la scission, le patrimoine est partagé et la société scindée disparaît. Dans l'apport partiel d'actif, l'apporteuse survit et détient des titres de la bénéficiaire, mais l'opération suit le régime juridique de la scission.",
  },
  {
    id: 'ch8-q5', question: "Sans clause particulière, quand une fusion-absorption prend-elle effet ?",
    options: [
      { id: 'a', texte: "À la signature du projet" },
      { id: 'b', texte: "À la date de la dernière assemblée générale ayant approuvé l'opération" },
      { id: 'c', texte: "Au 1er janvier suivant" },
      { id: 'd', texte: "À la publication de l'avis" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 192 AUSCGIE',
    explication: "Le contrat peut prévoir une autre date, ni postérieure à la clôture de l'exercice en cours des bénéficiaires, ni antérieure à la clôture du dernier exercice clos des sociétés qui transmettent leur patrimoine. En cas de création de sociétés nouvelles, l'effet se produit à l'immatriculation de la dernière d'entre elles.",
  },
  {
    id: 'ch8-q6', question: "Combien de temps avant la première assemblée le projet de fusion doit-il être déposé et publié ?",
    options: [
      { id: 'a', texte: "Quinze jours" },
      { id: 'b', texte: "Un mois au moins" },
      { id: 'c', texte: "Trois mois" },
      { id: 'd', texte: "Aucun délai" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 194 AUSCGIE',
    explication: "Dépôt au RCCM et avis dans un journal d'annonces légales par chaque société, un mois au moins avant la première assemblée. L'avis indique notamment l'évaluation de l'actif et du passif transmis, le rapport d'échange et la prime prévue.",
  },
  {
    id: 'ch8-q7', question: "Une fusion augmente les engagements des associés d'une des sociétés. Comment doit-elle être décidée dans cette société ?",
    options: [
      { id: 'a', texte: "À la majorité des deux tiers" },
      { id: 'b', texte: "À l'unanimité des associés concernés" },
      { id: 'c', texte: "Par le gérant" },
      { id: 'd', texte: "À la majorité simple" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 197 AUSCGIE',
    explication: "En principe, la décision suit les conditions de modification des statuts. L'unanimité est exigée si les engagements augmentent, par exemple quand les associés d'une SARL deviennent associés d'une SNC. Les délibérations contraires sont nulles.",
  },
  {
    id: 'ch8-q8', question: "Dans une fusion entre SA, qui vérifie que le rapport d'échange est équitable ?",
    options: [
      { id: 'a', texte: "Le commissaire aux comptes de l'absorbante" },
      { id: 'b', texte: "Un ou plusieurs commissaires à la fusion désignés par la juridiction compétente, qui ne peuvent être les commissaires aux comptes des sociétés participantes" },
      { id: 'c', texte: "Le greffier" },
      { id: 'd', texte: "L'assemblée des obligataires" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 672-673 AUSCGIE',
    explication: "Le commissaire à la fusion indique les méthodes suivies, leur adéquation, les valeurs obtenues et les difficultés d'évaluation. Sans son rapport, les délibérations sont nulles.",
  },
  {
    id: 'ch8-q9', question: "Combien de temps avant l'assemblée une SA doit-elle tenir les documents de la fusion à la disposition des actionnaires ?",
    options: [
      { id: 'a', texte: "Huit jours" },
      { id: 'b', texte: "Quinze jours au moins" },
      { id: 'c', texte: "Un mois" },
      { id: 'd', texte: "Deux mois" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 674 AUSCGIE',
    explication: "Projet, rapports du conseil et des commissaires à la fusion, états financiers et rapports de gestion des trois derniers exercices, et un état comptable récent si les derniers comptes ont plus de six mois à la date du projet. L'assemblée peut être annulée en cas de manquement.",
  },
  {
    id: 'ch8-q10', question: "Une SA absorbe sa filiale qu'elle détient en permanence à 100 % depuis le dépôt du projet. Quelle simplification s'applique ?",
    options: [
      { id: 'a', texte: "Aucune" },
      { id: 'b', texte: "Pas d'approbation par l'AGE de l'absorbée ni de rapports du conseil et du commissaire à la fusion" },
      { id: 'c', texte: "Pas de publicité" },
      { id: 'd', texte: "Pas de déclaration de conformité" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 676 AUSCGIE',
    explication: "C'est la fusion simplifiée. Sur le plan comptable, l'AUDCIF en fait le cas type d'évaluation à la valeur comptable, puisque le contrôle existe déjà avant l'opération.",
  },
  {
    id: 'ch8-q11', question: "Un créancier non obligataire de l'absorbée, dont la créance est antérieure à la publicité, s'inquiète de la fusion. Que peut-il faire ?",
    options: [
      { id: 'a', texte: "Bloquer la fusion par une simple lettre" },
      { id: 'b', texte: "Former opposition devant la juridiction compétente dans les trente jours de la publicité ; le juge rejette l'opposition ou ordonne remboursement ou garanties" },
      { id: 'c', texte: "Exiger le vote en assemblée" },
      { id: 'd', texte: "Rien, la créance s'éteint" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 679 AUSCGIE',
    explication: "L'absorbante devient débitrice sans novation. L'opposition n'interdit pas la poursuite de l'opération, mais à défaut du remboursement ou des garanties ordonnés, la fusion est inopposable au créancier.",
  },
  {
    id: 'ch8-q12', question: "Le projet de fusion doit-il être soumis aux obligataires de la société absorbée ?",
    options: [
      { id: 'a', texte: "Jamais" },
      { id: 'b', texte: "Oui, sauf si le remboursement des titres sur simple demande leur est offert" },
      { id: 'c', texte: "Seulement si l'absorbante est cotée" },
      { id: 'd', texte: "Oui, et leur refus empêche toujours la fusion" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 678 et 810 AUSCGIE',
    explication: "Faute de l'une ou l'autre voie, la fusion est nulle. Si l'assemblée des obligataires refuse, la société peut passer outre, et les obligataires deviennent créanciers de l'absorbante, la masse pouvant faire opposition (art. 810). Les obligataires de l'absorbante ne votent pas, mais leur masse peut former opposition (art. 681).",
  },
  {
    id: 'ch8-q13', question: "Selon l'AUDCIF, quand les apports doivent-ils être évalués à la valeur comptable ?",
    options: [
      { id: 'a', texte: "Au choix des sociétés" },
      { id: 'b', texte: "Lorsque l'absorbante détient en permanence 100 % des titres de l'absorbée avant l'opération" },
      { id: 'c', texte: "Lorsque la fusion est réalisée entre SARL" },
      { id: 'd', texte: "Toujours" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 38, § 2.2.1',
    explication: "Le choix n'appartient pas aux entités. Une prise de contrôle se traite comme une acquisition à la valeur réelle ; l'absorption d'une filiale à 100 % est un maintien de contrôle, traité à la valeur comptable.",
  },
  {
    id: 'ch8-q14', question: "Titre B valant 15 000, titre A valant 9 000. Quelle parité retenir ?",
    options: [
      { id: 'a', texte: "3 actions A contre 5 actions B" },
      { id: 'b', texte: "5 actions A contre 3 actions B" },
      { id: 'c', texte: "1 action A contre 1 action B" },
      { id: 'd', texte: "9 actions A contre 15 actions B" },
    ],
    reponseCorrecte: 'b', articleRef: 'Guide SYSCOHADA, Application 116',
    explication: "Parité = valeur du titre absorbé / valeur du titre absorbant = 15 000 / 9 000 = 5/3 : chaque groupe de 3 actions B reçoit 5 actions A.",
  },
  {
    id: 'ch8-q15', question: "Que sont les « rompus » dans une fusion ?",
    options: [
      { id: 'a', texte: "Les titres de l'absorbante annulés" },
      { id: 'b', texte: "Les titres de l'absorbée qui ne permettent pas d'obtenir un nombre entier de titres de l'absorbante" },
      { id: 'c', texte: "Les dettes non transmises" },
      { id: 'd', texte: "Les actions propres" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 38, § 2.3.2',
    explication: "Solutions : ne rien faire (perte pour l'actionnaire), verser une soulte dans la limite légale, obtenir la renonciation d'un actionnaire sur quelques titres, ou racheter des actions propres suivi d'une réduction de capital.",
  },
  {
    id: 'ch8-q16', question: "Application 116 : apport net 90 000 000, 10 000 actions A émises de nominal 5 000. Quelle est la prime de fusion ?",
    options: [
      { id: 'a', texte: "50 000 000" },
      { id: 'b', texte: "40 000 000" },
      { id: 'c', texte: "90 000 000" },
      { id: 'd', texte: "17 500 000" },
    ],
    reponseCorrecte: 'b', articleRef: 'Guide SYSCOHADA, Application 116',
    explication: "Augmentation de capital : 10 000 × 5 000 = 50 000 000 ; prime de fusion (1053) : 90 000 000 − 50 000 000 = 40 000 000. Elle représente les droits d'entrée des nouveaux actionnaires.",
  },
  {
    id: 'ch8-q17', question: "Chez l'absorbante, comment traiter les frais externes de fusion (honoraires, commissions) ?",
    options: [
      { id: 'a', texte: "Obligatoirement à l'actif" },
      { id: 'b', texte: "En charges de l'exercice ou imputés sur la prime de fusion ; les coûts internes restent en charges" },
      { id: 'c', texte: "Au débit du 4614" },
      { id: 'd', texte: "Chez l'absorbée" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 38, § 3.4.1.3 ; Application 116',
    explication: "Les coûts externes directement liés sont des frais d'émission de titres : option charges (6324, 6318) ou option imputation (débit 1053). Les coûts internes (temps passé, déplacements) sont toujours des charges.",
  },
  {
    id: 'ch8-q18', question: "Chez l'absorbée, où va l'écart entre la valeur d'apport et la valeur comptable de l'actif net ?",
    options: [
      { id: 'a', texte: "Au 1053" },
      { id: 'b', texte: "Au 1381 Résultat de fusion, ensuite soldé lors de la constatation des droits des associés" },
      { id: 'c', texte: "Au 826" },
      { id: 'd', texte: "Au 4618" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 38, § 3.4.2 ; Application 116',
    explication: "Le 1381 enregistre la plus ou moins-value d'apport. Avec le capital et les réserves, il forme les droits des associés de l'absorbée, virés au 4618 puis désintéressés par la remise des titres (502).",
  },
  {
    id: 'ch8-q19', question: "Quel compte utilise l'absorbée pour constater sa créance sur l'absorbante ?",
    options: [
      { id: 'a', texte: "4614" },
      { id: 'b', texte: "4718 Apport, compte de fusion" },
      { id: 'c', texte: "485" },
      { id: 'd', texte: "4618" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 38, § 3.4.2',
    explication: "Le 4718 est débité de la valeur réelle de l'actif net apporté, puis soldé par l'entrée des titres reçus (502). Le 4614 est le compte miroir chez l'absorbante. L'AUDCIF signale lui-même que le libellé du 4718 diverge selon les passages.",
  },
  {
    id: 'ch8-q20', question: "Pourquoi l'absorbante ne peut-elle pas échanger les titres de l'absorbée qu'elle détient déjà ?",
    options: [
      { id: 'a', texte: "Parce qu'ils sont dépréciés" },
      { id: 'b', texte: "Parce qu'elle se remettrait ses propres actions, ce que l'art. 191 exclut et l'art. 639 interdit" },
      { id: 'c', texte: "Parce qu'ils sont nominatifs" },
      { id: 'd', texte: "Parce que la soulte serait trop élevée" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 191 et 639 AUSCGIE',
    explication: "L'art. 191 écarte l'échange pour les titres détenus par la bénéficiaire. D'où la fusion-renonciation : l'augmentation de capital ne rémunère que les associés extérieurs.",
  },
  {
    id: 'ch8-q21', question: "Application 117 : A détient 40 % de B (coût 10 000 000), et la quote-part d'apport correspondante vaut 40 000 000. Quel est le boni de fusion ?",
    options: [
      { id: 'a', texte: "40 000 000" },
      { id: 'b', texte: "30 000 000, inscrit au 1053" },
      { id: 'c', texte: "10 000 000" },
      { id: 'd', texte: "70 000 000" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 38, § 3.5.1.1 ; Application 117',
    explication: "Boni = quote-part d'apport des titres annulés − leur valeur nette comptable = 40 000 000 − 10 000 000. L'AUDCIF le considère comme une prime de fusion (1053).",
  },
  {
    id: 'ch8-q22', question: "L'absorbée détient des actions de l'absorbante. Que devient ce paquet chez l'absorbante ?",
    options: [
      { id: 'a', texte: "Il est conservé au 26" },
      { id: 'b', texte: "Il entre en actions propres (5021) puis est annulé par réduction de capital, l'excédent sur le nominal étant imputé sur la prime" },
      { id: 'c', texte: "Il est vendu en bourse" },
      { id: 'd', texte: "Il est distribué aux salariés" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 38, § 3.6.1 ; Application 118',
    explication: "L'art. 639 interdit à la société de détenir ses propres actions. Dans l'Application 118, 24 000 000 d'actions propres sont annulées : 20 000 000 au capital et 4 000 000 sur la prime, qui tombe à 11 000 000.",
  },
  {
    id: 'ch8-q23', question: "En cas de participations réciproques, comment détermine-t-on la valeur des titres ?",
    options: [
      { id: 'a', texte: "Par la valeur nominale" },
      { id: 'b', texte: "Par un système de deux équations à deux inconnues, la valeur de chaque société dépendant de celle de l'autre" },
      { id: 'c', texte: "Par le cours de bourse" },
      { id: 'd', texte: "Par tirage au sort" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 38, § 3.7 ; Application 119',
    explication: "Application 119 : 10 000 A = 500 B + 185 000 000 et 5 000 B = 500 A + 140 000 000, d'où A = 20 000 et B = 30 000, soit 3 actions A contre 2 actions B.",
  },
  {
    id: 'ch8-q24', question: "Qu'est-ce que la fusion-allotissement ?",
    options: [
      { id: 'a', texte: "Une fusion sans augmentation de capital" },
      { id: 'b', texte: "Le partage du patrimoine de l'absorbée en deux lots : liquidation partielle au profit de l'absorbante pour ses titres, puis fusion pour la fraction extérieure" },
      { id: 'c', texte: "Une scission" },
      { id: 'd', texte: "Une fusion à la valeur comptable" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 38, § 3.5.1.2',
    explication: "La plus-value dégagée sur le lot alloti est économiquement une plus-value de liquidation, mais le SYSCOHADA préconise de l'inscrire au 1053, compte tenu de la nature de l'opération.",
  },
  {
    id: 'ch8-q25', question: "Dans une fusion à la valeur comptable, comment les actifs sont-ils repris par l'absorbante ?",
    options: [
      { id: 'a', texte: "Pour leur valeur nette, en un seul montant" },
      { id: 'b', texte: "En ventilant la valeur nette entre valeur d'origine, amortissements et dépréciations" },
      { id: 'c', texte: "À la valeur réelle" },
      { id: 'd', texte: "Au nominal" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 38, § 3.1 et 3.5.3',
    explication: "La restructuration interne ne doit pas effacer l'historique : l'absorbante reprend les valeurs brutes, les amortissements et les dépréciations tels qu'ils figuraient chez l'absorbée.",
  },
  {
    id: 'ch8-q26', question: "Application 120 : 8 200 actions X de nominal 10 000 émises à 15 000. Quelle est la prime d'apport ?",
    options: [
      { id: 'a', texte: "82 000 000" },
      { id: 'b', texte: "41 000 000, au 1052" },
      { id: 'c', texte: "123 000 000" },
      { id: 'd', texte: "25 000 000" },
    ],
    reponseCorrecte: 'b', articleRef: 'Guide SYSCOHADA, Application 120',
    explication: "8 200 × (15 000 − 10 000) = 41 000 000. Le Guide libelle le calcul « 8 200 × (10 000 − 5 000) » : le résultat est juste, mais le libellé est erroné.",
  },
  {
    id: 'ch8-q27', question: "Chez la société apporteuse d'une branche d'activité, où comptabilise-t-on les titres reçus ?",
    options: [
      { id: 'a', texte: "Au 502" },
      { id: 'b', texte: "Au 26 Titres de participation, pour la valeur retenue dans le traité, avec sortie des immobilisations par 81 / 82 et traitement des stocks par 843, 833 et 781" },
      { id: 'c', texte: "Au 4718" },
      { id: 'd', texte: "Au 1052" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 38, § 4.1',
    explication: "Valeur réelle : les titres entrent à la valeur réelle des apports et les plus-values sont dégagées. Valeur comptable : les titres entrent pour la valeur comptable des apports.",
  },
  {
    id: 'ch8-q28', question: "Un apport d'un seul camion en échange d'actions relève-t-il des règles de l'apport partiel d'actif ?",
    options: [
      { id: 'a', texte: "Oui" },
      { id: 'b', texte: "Non : un actif isolé n'est pas une branche autonome ; l'opération se comptabilise comme un échange, à la valeur actuelle du bien acquis si les deux lots sont évaluables de façon fiable" },
      { id: 'c', texte: "Oui, s'il vaut plus de 10 % de l'actif" },
      { id: 'd', texte: "Non, c'est une scission" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 38, § 4.1.2.3',
    explication: "L'apport partiel d'actif suppose une branche autonome d'activité (art. 195). L'apport d'actifs isolés relève des règles générales, comme un apport en nature ordinaire (chapitres 1 et 4).",
  },
  {
    id: 'ch8-q29', question: "En RDC, les plus-values résultant de l'attribution d'actions à la suite d'une fusion de SA, SAS ou SARL sont-elles imposables ?",
    options: [
      { id: 'a', texte: "Oui, toujours" },
      { id: 'b', texte: "Non : elles sont exonérées (hors marchandises) si la bénéficiaire a son siège en RDC, avec reprise des valeurs fiscales de l'apporteuse" },
      { id: 'c', texte: "Seulement pour les SARL" },
      { id: 'd', texte: "Seulement si la fusion est transfrontalière" },
    ],
    reponseCorrecte: 'b', articleRef: 'Loi n° 23/053, art. 54',
    explication: "L'exonération s'étend à l'apport partiel d'actif et à la scission. L'acte doit prévoir que les amortissements et plus-values ultérieurs seront calculés sur le prix de revient chez l'apporteuse, et que les provisions pour renouvellement du matériel sont reprises au passif.",
  },
  {
    id: 'ch8-q30', question: "Quelles informations l'absorbante doit-elle donner dans les Notes annexes de l'exercice de la fusion ?",
    options: [
      { id: 'a', texte: "Aucune" },
      { id: 'b', texte: "Le contexte de l'opération, les modalités d'évaluation des apports et la composante de la moins-value globale de fusion correspondant aux plus-values latentes sur la quote-part détenue" },
      { id: 'c', texte: "La liste des actionnaires de l'absorbée" },
      { id: 'd', texte: "Le rapport du commissaire aux comptes" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 38, section 6',
    explication: "L'annexe doit permettre de comprendre pourquoi l'absorbante a changé de dimension et comment les apports ont été évalués.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '8.1',
    titre: "Fusion, scission, apport partiel d'actif : notions et effets",
    navLabel: "Notions",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Une société qui veut grandir peut acheter des actifs un par un, racheter les actions d'une autre société, ou **fusionner** avec elle. La fusion est la voie la plus radicale : deux entreprises n'en forment plus qu'une, avec un seul patrimoine, un seul bilan et un seul groupe d'associés. L'Acte uniforme la définit comme l'opération par laquelle deux ou plusieurs sociétés se réunissent pour n'en former qu'une seule, **soit par création d'une société nouvelle** (fusion-réunion), **soit par absorption** par l'une d'entre elles (fusion-absorption) (art. 189). Une société même **en liquidation** peut être absorbée ou participer à la constitution d'une société nouvelle : la fusion peut ainsi servir de sortie à une société qui ne veut pas vendre ses actifs un à un.",
      },
      {
        type: 'carte',
        titre: "Trois opérations, un régime commun",
        tableau: {
          entetes: ["Opération", "Définition", "Sort de la société d'origine", "Rémunération"],
          lignes: [
            ["Fusion (art. 189)", "Réunion de deux ou plusieurs sociétés en une seule, par absorption ou par création d'une société nouvelle", "Les sociétés absorbées ou fusionnées disparaissent : dissolution sans liquidation", "Titres de l'absorbante ou de la société nouvelle remis aux associés des sociétés qui disparaissent"],
            ["Scission (art. 190)", "Partage du patrimoine d'une société entre plusieurs sociétés existantes ou nouvelles", "La société scindée disparaît", "Titres des sociétés bénéficiaires remis aux associés de la scindée"],
            ["Apport partiel d'actif (art. 195)", "Apport d'une **branche autonome d'activité** à une société préexistante ou à créer, soumis au régime de la scission", "La société apporteuse **ne disparaît pas**", "Titres de la bénéficiaire remis à la **société apporteuse** elle-même"],
          ],
        },
        note: "[texte officiel] L'article 195 est imprimé « L'apport partie d'd'actif est soumis au régime de la scission » : coquille évidente, le sens étant « l'apport partiel d'actif ». Les trois opérations peuvent intervenir entre sociétés de formes différentes, sauf disposition contraire (art. 196), et entre sociétés d'États parties différents, chacune restant soumise à l'Acte uniforme dans l'État de son siège (art. 199).",
      },
      { type: 'controle', question: QCM[0] },
      {
        type: 'paragraphe',
        texte: "La fusion et la scission produisent trois effets simultanés (art. 191). D'abord, la **dissolution sans liquidation** des sociétés qui disparaissent : pas de vente des actifs ni de paiement des dettes, pas de liquidateur. Ensuite, la **transmission universelle** de leur patrimoine aux bénéficiaires, « dans l'état où il se trouve à la date de réalisation définitive » : actifs, dettes, contrats et litiges passent en bloc, sans qu'il faille céder chaque élément séparément. Enfin, l'**échange des titres** : les associés des sociétés qui disparaissent deviennent associés des bénéficiaires, dans les conditions du contrat de fusion. C'est ce qui distingue la fusion d'une cession de fonds de commerce : le prix n'est pas payé en argent à la société, mais en titres aux associés.",
      },
      { type: 'controle', question: QCM[1] },
      {
        type: 'filet',
        titre: "La soulte et les titres non échangés (art. 191)",
        texte: "Les associés peuvent recevoir, en plus des titres, une **soulte** en argent, plafonnée à **10 % de la valeur d'échange** des parts ou actions attribuées. Au-delà, l'opération cesserait d'être un échange de titres pour devenir en partie une vente. Par ailleurs, il n'est pas procédé à l'échange des titres de la société qui disparaît lorsqu'ils sont détenus par la société bénéficiaire, ou par la société qui disparaît elle-même (directement ou par personne interposée). Cette règle, qui évite qu'une société se remette ses propres titres, commande la technique de la fusion-renonciation (section 8.7).",
      },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[3] },
      {
        type: 'paragraphe',
        texte: "La **date d'effet** est essentielle pour le comptable, car elle détermine à partir de quand les opérations de l'absorbée sont réputées faites pour le compte de l'absorbante. En cas de création de sociétés nouvelles, la fusion ou la scission prend effet à l'**immatriculation** au RCCM de la nouvelle société ou de la dernière d'entre elles. Dans les autres cas, elle prend effet à la date de la **dernière assemblée générale** ayant approuvé l'opération, sauf si le contrat prévoit une autre date. Celle-ci ne doit être ni postérieure à la clôture de l'exercice en cours des bénéficiaires, ni antérieure à la clôture du dernier exercice clos des sociétés qui transmettent leur patrimoine (art. 192). Une **rétroactivité** est donc possible, mais bornée : une fusion approuvée le 30 septembre N peut remonter au 1er janvier N si l'absorbée a clos son dernier exercice au 31 décembre N−1.",
      },
      { type: 'controle', question: QCM[4] },
    ],
  },
  {
    numero: '8.2',
    titre: "La procédure commune : projet, publicité, décision, conformité",
    navLabel: "Procédure",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Toute fusion commence par une négociation entre dirigeants, qui aboutit à un **projet de fusion ou de scission**. Chaque société participante l'arrête par son organe de gestion : conseil d'administration, administrateur général ou gérant (art. 193). Le projet est le document pivot de l'opération. Il fixe les valeurs, la parité, la prime et la date d'effet comptable, et c'est sur lui que les associés, les commissaires, les créanciers et le greffe raisonnent. L'AUDCIF en tire une conséquence comptable directe : les apports sont inscrits chez la bénéficiaire pour les valeurs figurant dans le traité, qui sert de support de base à la comptabilisation (ch. 38, § 2.1).",
      },
      {
        type: 'carte',
        titre: "Les huit mentions du projet (art. 193)",
        liste: [
          "1° Forme, dénomination, numéro RCCM et siège de toutes les sociétés participantes.",
          "2° Motifs et conditions de l'opération.",
          "3° Désignation et **évaluation de l'actif et du passif** transmis.",
          "4° Modalités de remise des titres, date de jouissance des titres nouveaux, et **date d'effet comptable** : celle à partir de laquelle les opérations de l'absorbée sont réputées accomplies par la bénéficiaire.",
          "5° Dates auxquelles ont été arrêtés les comptes utilisés pour établir les conditions de l'opération.",
          "6° **Rapport d'échange** des titres et, le cas échéant, montant de la **soulte**.",
          "7° Montant prévu de la **prime de fusion** ou de scission.",
          "8° Droits accordés aux associés ayant des droits spéciaux et aux porteurs de titres autres que des actions, et avantages particuliers.",
        ],
      },
      {
        type: 'paragraphe',
        texte: "Le projet est ensuite **déposé au RCCM** du siège de chaque société et fait l'objet d'un **avis** dans un journal d'annonces légales. L'avis reprend l'identification des sociétés, l'évaluation de l'actif et du passif transmis, le rapport d'échange et la prime prévue. Dépôt et publicité doivent intervenir **un mois au moins** avant la première assemblée appelée à statuer (art. 194). L'opération est ensuite **décidée**, dans chaque société, aux conditions requises pour la **modification de ses statuts**, selon les procédures d'augmentation de capital (pour la bénéficiaire) et de dissolution (pour la société qui disparaît). Si elle **augmente les engagements** des associés, par exemple quand des associés d'une SARL deviennent associés d'une SNC indéfiniment responsables, l'**unanimité** est requise, à peine de nullité (art. 197). Enfin, à peine de nullité, les sociétés déposent au greffe une **déclaration de conformité** relatant tous les actes accomplis et affirmant la régularité de l'opération (art. 198).",
      },
      {
        type: 'paragraphe',
        texte: "Pourquoi un délai d'un mois entre la publicité et l'assemblée ? Parce que plusieurs catégories de personnes doivent pouvoir réagir avant que la décision ne soit prise. Les associés doivent avoir le temps d'étudier la parité et, dans les SA, les rapports. Les créanciers doivent pouvoir préparer une éventuelle opposition, dont le délai de trente jours court à compter de la publicité (art. 679). Les obligataires doivent pouvoir être convoqués en assemblée. Le comptable doit construire un calendrier à rebours : date de l'assemblée, date limite de publicité un mois plus tôt, date d'arrêté des comptes de référence (mention 5° du projet), et date de l'état comptable intermédiaire si les derniers comptes ont plus de six mois (art. 674). Un calendrier mal construit peut obliger à reporter l'assemblée, voire exposer l'opération à la nullité.",
      },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[6] },
      {
        type: 'filet',
        titre: "Les fusions de SARL (art. 382-383)",
        texte: "Pour les fusions ou scissions de SARL au profit de SARL, l'Acte uniforme rend applicables plusieurs règles de la SA : le commissaire à la fusion (art. 672), la fusion simplifiée d'une filiale à 100 % (art. 676), la protection des créanciers (art. 679) et la solidarité en cas de scission (art. 688 et 689). Une SARL nouvelle peut être constituée sans autre apport que celui des sociétés qui fusionnent. Dans une scission au profit de SARL nouvelles dont les parts sont attribuées proportionnellement aux droits des associés, le rapport du commissaire à la fusion n'est pas nécessaire.",
      },
    ],
  },
  {
    numero: '8.3',
    titre: "Les règles propres aux sociétés anonymes",
    navLabel: "Fusions de SA",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Lorsque l'opération réunit uniquement des sociétés anonymes, les articles 670 et suivants renforcent l'information des actionnaires. La fusion est décidée par l'**assemblée générale extraordinaire** de chaque société, et, le cas échéant, ratifiée par les assemblées spéciales de catégories d'actions (art. 671). Le conseil d'administration ou l'administrateur général de chaque société établit un **rapport** qui explique et justifie le projet du point de vue juridique et économique, notamment le rapport d'échange et les méthodes d'évaluation. Ces méthodes doivent être **concordantes** pour les sociétés concernées. À défaut de ce rapport, les délibérations sont nulles. [texte officiel] L'article 670 frappe de nullité « toute délibération prise en violation des alinéas premier et deuxième du présent article », alors qu'il ne comporte qu'un alinéa de fond.",
      },
      {
        type: 'carte',
        titre: "Le commissaire à la fusion (art. 672-673)",
        liste: [
          "Un ou plusieurs commissaires à la fusion sont **désignés par la juridiction compétente** et établissent, sous leur responsabilité, un rapport écrit sur les modalités de la fusion.",
          "Ils vérifient que les **valeurs relatives** attribuées aux actions sont pertinentes et que le **rapport d'échange est équitable**.",
          "Leur rapport indique les méthodes suivies, leur adéquation et les valeurs auxquelles chacune conduit, avec un avis sur leur importance relative, et les difficultés particulières d'évaluation.",
          "Ils ne peuvent être choisis parmi les **commissaires aux comptes** des sociétés participantes et sont soumis aux incompatibilités de l'art. 698.",
          "À défaut de leur rapport, les délibérations sont **nulles** ; elles peuvent être annulées si le rapport est incomplet.",
        ],
        note: "Le commissaire à la fusion se distingue du commissaire aux apports : l'AGE de l'absorbante statue en outre sur l'approbation des apports en nature selon les art. 619 et suivants (art. 675). Les deux contrôles répondent à deux questions différentes : l'échange est-il équitable entre les deux groupes d'actionnaires, et les apports sont-ils correctement évalués ?",
      },
      {
        type: 'paragraphe',
        texte: "Le rapport du conseil d'administration et celui du commissaire à la fusion ne font pas double emploi. Le conseil, qui a négocié l'opération, **explique et justifie** son projet : pourquoi fusionner, avec qui, à quelle parité, selon quelles méthodes. Le commissaire à la fusion, désigné par le juge et indépendant des deux sociétés, **contrôle** ce travail : il vérifie que les méthodes sont adaptées et concordantes, et que la parité qui en résulte est équitable pour les deux groupes d'actionnaires. Une fusion n'est en effet jamais neutre entre eux : une parité trop favorable aux actionnaires de l'absorbée dilue ceux de l'absorbante, et inversement. Le commissaire aux comptes de l'une des sociétés ne peut pas remplir cette mission (art. 673), car il n'aurait pas l'indépendance voulue à l'égard des deux parties.",
      },
      { type: 'controle', question: QCM[7] },
      {
        type: 'paragraphe',
        texte: "Quinze jours au moins avant l'assemblée, chaque SA tient à la disposition de ses actionnaires, au siège social ou par voie électronique, le projet de fusion, les rapports du conseil et des commissaires à la fusion, les **états financiers et rapports de gestion des trois derniers exercices** des sociétés participantes, et un **état comptable intermédiaire**. Cet état est obligatoire si les derniers comptes se rapportent à un exercice clos plus de six mois avant la date du projet ; il doit alors être arrêté moins de trois mois avant cette date, selon les mêmes méthodes et la même présentation que le dernier bilan (art. 674). C'est souvent au comptable qu'il revient de préparer cet état, qui sert de base à l'évaluation des apports.",
      },
      { type: 'controle', question: QCM[8] },
      {
        type: 'paragraphe',
        texte: "Deux cas allègent la procédure. Le premier est la **fusion simplifiée**. Si l'absorbante détient en permanence la totalité du capital des absorbées, depuis le dépôt du projet au RCCM jusqu'à la réalisation de l'opération, il n'y a lieu ni à approbation par l'AGE des absorbées, ni aux rapports du conseil et du commissaire à la fusion (art. 676). Il n'y a en effet aucun actionnaire minoritaire à protéger ni aucune parité à négocier. Le second est la **fusion-réunion**. La société nouvelle peut être constituée sans autres apports que ceux des sociétés qui fusionnent ; son projet de statuts est approuvé par l'AGE de chacune des sociétés qui disparaissent, sans approbation par l'assemblée de la société nouvelle (art. 677). Pour la scission de SA, les mêmes règles s'appliquent (art. 684). Si des SA nouvelles sont constituées par le seul apport de la scindée et que leurs actions sont attribuées proportionnellement, le rapport du commissaire à la fusion n'est pas requis (art. 685).",
      },
      {
        type: 'paragraphe',
        texte: "La fusion simplifiée se comprend aisément. Si l'absorbante détient toutes les actions de l'absorbée, l'échange de titres n'a pas d'objet : elle ne peut pas se remettre ses propres actions (art. 191). Il n'y a donc ni parité à négocier ni actionnaire minoritaire à informer, et les rapports du conseil et du commissaire à la fusion perdent leur raison d'être. La condition est stricte : la détention doit être **permanente**, depuis le dépôt du projet au RCCM jusqu'à la réalisation. Une seule action cédée à un tiers entre-temps fait tomber le régime. En pratique, les groupes utilisent souvent ce mécanisme pour simplifier leur organigramme, par exemple en absorbant des sociétés devenues de simples coquilles ou en regroupant des filiales qui exercent la même activité dans plusieurs provinces.",
      },
      { type: 'controle', question: QCM[9] },
    ],
  },
  {
    numero: '8.4',
    titre: "Créanciers et obligataires face à la fusion",
    navLabel: "Créanciers",
    blocs: [
      {
        type: 'paragraphe',
        texte: "La fusion change le débiteur des créanciers de l'absorbée : ils avaient traité avec une société, ils se retrouvent face à une autre, peut-être plus endettée. L'Acte uniforme organise leur protection sans leur donner de droit de veto. L'absorbante devient débitrice des créanciers non obligataires de l'absorbée **aux lieu et place** de celle-ci, **sans novation** (art. 679). Les créanciers non obligataires des sociétés participantes, y compris les bailleurs des locaux, dont la créance est antérieure à la publicité du projet, peuvent former **opposition** devant la juridiction compétente dans un délai de **trente jours** à compter de cette publicité. Le juge rejette l'opposition ou ordonne le remboursement des créances ou la constitution de garanties. À défaut, la fusion est **inopposable** au créancier. L'opposition n'empêche pas la poursuite de l'opération. Les clauses d'exigibilité anticipée en cas de fusion restent applicables (art. 680).",
      },
      {
        type: 'carte',
        titre: "Le sort des obligataires",
        tableau: {
          entetes: ["Obligataires de…", "Règle", "Articles"],
          lignes: [
            ["La société absorbée (SA)", "Le projet est soumis à leur assemblée, sauf si le remboursement sur simple demande leur est offert, à peine de nullité ; en cas de remboursement, l'absorbante devient leur débitrice ; ceux qui ne demandent rien restent obligataires de l'absorbante", "678"],
            ["La société absorbante (SA)", "Pas de vote, mais leur assemblée peut mandater les représentants de la masse pour former opposition dans les trente jours", "681, 683"],
            ["Toute société émettrice", "Si l'assemblée des obligataires refuse, la société peut passer outre ; les obligataires deviennent créanciers de l'absorbante, et la masse peut former opposition", "810 (chapitre 6)"],
            ["La société scindée (SA)", "Même règle de consultation ou de remboursement ; bénéficiaires débitrices solidaires, sauf stipulation contraire ouvrant l'opposition des créanciers", "686, 688, 689"],
          ],
        },
        note: "[texte officiel] L'article 682 fait courir le délai d'opposition de trente jours à compter de « l'insertion prescrite par l'article 265 », qui traite des formalités de la transformation et non de la fusion. Le délai se calcule en pratique à compter de la publicité du projet de fusion (art. 194 et 679).",
      },
      { type: 'controle', question: QCM[10] },
      {
        type: 'paragraphe',
        texte: "Pour le comptable, ces règles ont trois conséquences. Les dettes de l'absorbée passent **telles quelles** au passif de l'absorbante, avec leurs échéances et leurs garanties : la reprise se fait au montant dû, sans novation. Un emprunt obligataire de l'absorbée devient un emprunt de l'absorbante (compte 161), avec la prime de remboursement restant à étaler (chapitre 6). Enfin, une opposition accueillie peut obliger à rembourser par anticipation ou à constituer des garanties, qui doivent être mentionnées dans les Notes annexes parmi les engagements donnés. Dans une **scission**, la solidarité des bénéficiaires envers les créanciers de la scindée (art. 688) est un engagement hors bilan pour chacune, sauf clause la limitant au passif mis à sa charge (art. 689).",
      },
      {
        type: 'paragraphe',
        texte: "L'opposition d'un créancier n'est pas une menace théorique. Un fournisseur de l'absorbée qui voit sa créance transférée à une absorbante très endettée peut demander au juge une garantie ou un remboursement anticipé. Un banquier qui a prêté à l'absorbée avec une clause d'exigibilité en cas de fusion peut exiger le remboursement immédiat, puisque l'article 680 réserve l'application de ces conventions. Avant de lancer une fusion, le directeur financier recense donc les contrats de prêt, les baux et les contrats commerciaux importants, et leurs clauses de changement de contrôle ou de fusion. Il négocie les accords nécessaires, et le comptable prévoit les conséquences : reclassement d'une dette à court terme si elle devient exigible, engagements hors bilan pour les garanties données.",
      },
      { type: 'controle', question: QCM[11] },
    ],
  },
  {
    numero: '8.5',
    titre: "Évaluer les apports et fixer la parité d'échange",
    navLabel: "Évaluation et parité",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'AUDCIF fonde le traitement comptable des fusions sur quatre principes : la **référence obligatoire au traité** d'apport, l'**application d'une seule méthode** d'évaluation pour une situation donnée, une méthodologie inspirée des **comptes consolidés** pour apprécier le contrôle, et la recherche de la **neutralité** des regroupements entre entités sous contrôle exclusif sur le résultat et les capitaux propres de l'absorbante (ch. 38, § 1.2.2). Il en déduit une règle simple, qui **n'est pas au choix des sociétés** (§ 3.1). Si l'opération emporte une **prise de contrôle**, elle est traitée comme une acquisition, et les apports sont évalués à la **valeur réelle**. S'il s'agit de l'absorption d'une filiale détenue **en permanence à 100 %**, c'est une restructuration interne, un maintien de contrôle, et les apports sont évalués à la **valeur comptable** (§ 2.2.1).",
      },
      {
        type: 'carte',
        titre: "Valeur réelle ou valeur comptable ?",
        tableau: {
          entetes: ["", "Valeur réelle", "Valeur comptable"],
          lignes: [
            ["Situation", "Prise de contrôle : sociétés indépendantes, ou absorbante minoritaire dans l'absorbée", "Absorbante détenant en permanence 100 % de l'absorbée"],
            ["Éléments repris", "Valeurs réelles du traité pour chaque élément, figurant ou non au bilan de l'absorbée (marques, impôts différés, provisions pour retraite…)", "Valeurs de chaque actif et passif dans les comptes de l'absorbée à la date d'effet, sans modification"],
            ["Présentation", "Actifs incorporels non inscrits chez l'absorbée : débit du 215 Fonds commercial ; écart résiduel éventuel : 215", "Ventilation de la valeur nette entre valeur d'origine, amortissements et dépréciations"],
            ["Justification", "Logique d'acquisition, comme en consolidation", "Neutralité d'une restructuration interne"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "La prise de contrôle justifie la valeur réelle, parce que l'opération ressemble à un achat. L'absorbante « paie » les actifs de l'absorbée avec ses propres actions, et elle doit inscrire ce qu'elle a acquis pour ce qu'elle l'a payé, comme pour tout achat. Dans une restructuration interne, rien n'est acheté : la mère possédait déjà, à travers sa filiale, les actifs qu'elle reprend. Réévaluer ces actifs créerait des plus-values fictives, simplement parce que le groupe a changé son organigramme. D'où la valeur comptable, qui garantit la **neutralité** de l'opération sur le résultat et les capitaux propres de l'absorbante (AUDCIF, ch. 38, § 1.2.2). Entre ces deux cas extrêmes, l'AUDCIF demande d'apprécier la substance de l'opération en termes de prise de contrôle (§ 3.5.3).",
      },
      { type: 'controle', question: QCM[12] },
      {
        type: 'paragraphe',
        texte: "La **parité d'échange** est le rapport entre la valeur d'un titre de l'absorbée et la valeur d'un titre de l'absorbante : (valeur de l'absorbée / nombre de ses titres) / (valeur de l'absorbante / nombre de ses titres). Elle indique combien de titres de l'absorbante chaque associé de l'absorbée reçoit pour un titre ancien. L'AUDCIF recommande des méthodes **multicritères**, **homogènes** entre les sociétés, et une **base arrêtée à la même date** (§ 2.3.1). Il cite les méthodes patrimoniales, les méthodes fondées sur les flux, les approches mixtes, les multiples comparables et les méthodes de création de valeur (§ 3.1). La cohérence est décisive : évaluer l'absorbée à sa valeur de rendement et l'absorbante à son actif net fausserait l'échange au détriment de l'un des deux groupes d'associés. C'est précisément ce que contrôle le commissaire à la fusion.",
      },
      {
        type: 'carte',
        titre: "Application 116 : du bilan de B à la parité",
        liste: [
          "Actif réel de B : frais de développement 3 000 000 + terrains 37 500 000 + bâtiments 50 000 000 + matériels 9 500 000 + stocks 15 000 000 + clients 5 000 000 + banque 10 000 000 = 130 000 000.",
          "Actif net apporté : 130 000 000 − emprunts 40 000 000 = **90 000 000**. Vérification : capitaux propres 72 500 000 + plus-values (terrains 7 500 000, bâtiments 10 000 000) = 90 000 000.",
          "Valeur d'une part B : 90 000 000 / 6 000 = **15 000** ; valeur d'une action A : **9 000**.",
          "Parité : 15 000 / 9 000 = 5/3, soit **5 actions A pour 3 parts B** ; titres A à émettre : 6 000 × 5/3 = **10 000**.",
          "Augmentation de capital : 10 000 × 5 000 = **50 000 000** ; prime de fusion : 90 000 000 − 50 000 000 = **40 000 000**.",
        ],
        note: "[texte officiel] Le Guide numérote les étapes « 3 », « 5 » et « 6 » sans étape 4 visible.",
      },
      { type: 'controle', question: QCM[13] },
      {
        type: 'paragraphe',
        texte: "La parité tombe rarement juste. L'AUDCIF propose de chercher un nombre entier par approches successives ou par le plus grand commun diviseur. Restent les **rompus** : un associé qui détient 5 parts B, avec une parité de 5 A pour 3 B, a droit à 8,33 actions A. Quatre solutions existent (§ 2.3.2). On peut ne rien faire, et l'associé perd la fraction. On peut verser une **soulte**. On peut obtenir d'un actionnaire qu'il renonce à ses droits sur quelques titres pour arrondir. On peut enfin racheter des actions propres, suivi d'une réduction de capital. [texte officiel] Pour la soulte, le § 2.3.2 de l'AUDCIF parle de « 10 % de la valeur nominale des parts ou actions attribuées », alors que l'article 191 qu'il cite retient la **valeur d'échange** : c'est la règle de l'Acte uniforme qu'il faut appliquer.",
      },
      {
        type: 'paragraphe',
        texte: "Les méthodes d'évaluation doivent être appliquées de la même manière aux deux sociétés. Supposons que l'on évalue l'absorbée par son actif net réévalué (15 000 par titre) et l'absorbante par sa valeur de rendement (9 000 par titre). Si la valeur de rendement de l'absorbée n'est en réalité que de 11 000, la parité de 5 pour 3 favorise ses actionnaires. Avec des méthodes concordantes, elle aurait plutôt été proche de 11 000 / 9 000. En pratique, l'évaluateur combine plusieurs méthodes pour chaque société, avec les mêmes pondérations, et il arrête les deux évaluations à la même date. Le commissaire à la fusion, dans les SA, rend compte de ces choix (art. 672).",
      },
      { type: 'controle', question: QCM[14] },
    ],
  },
  {
    numero: '8.6',
    titre: "La fusion simple : écritures chez l'absorbante et chez l'absorbée (Application 116)",
    navLabel: "Fusion simple",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Dans une fusion simple, les deux sociétés sont **indépendantes** : aucune ne détient de titres de l'autre. L'opération est une prise de contrôle, évaluée à la valeur réelle. Pour l'absorbante, tout se passe comme une **augmentation de capital par apport en nature** (chapitre 4), avec une égalité fondamentale : **apports nets = augmentation de capital + prime de fusion**. L'augmentation de capital est le nombre de titres créés multiplié par leur nominal. La prime de fusion est la différence entre la valeur des apports et cette augmentation, et elle représente le **droit d'entrée** des nouveaux actionnaires dans une société dont les réserves et les plus-values latentes appartenaient jusque-là aux anciens. L'AUDCIF décrit trois phases chez l'absorbante : promesse des apports, réalisation des apports, constatation des frais.",
      },
      {
        type: 'carte',
        titre: "Chez l'absorbante A",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["4614", "", "Promesse : apporteurs, entité absorbée B, compte d'apports", "90 000 000", ""],
            ["", "1013", "Capital souscrit, appelé, versé, non amorti : 10 000 × 5 000", "", "50 000 000"],
            ["", "1053", "Primes de fusion", "", "40 000 000"],
            ["211", "", "Réalisation : frais de développement", "3 000 000", ""],
            ["2232", "", "Terrains bâtis (valeur réelle)", "37 500 000", ""],
            ["2323", "", "Bâtiments administratifs et commerciaux (valeur réelle)", "50 000 000", ""],
            ["2411", "", "Matériels industriels", "9 500 000", ""],
            ["311", "", "Stocks de marchandises", "15 000 000", ""],
            ["411", "", "Clients", "5 000 000", ""],
            ["521", "", "Banques", "10 000 000", ""],
            ["", "162", "Emprunts et dettes auprès des établissements de crédit", "", "40 000 000"],
            ["", "4614", "Apporteurs, entité absorbée B", "", "90 000 000"],
          ],
        },
        note: "Les actifs entrent chez l'absorbante pour leur **valeur d'apport**, comme des biens neufs : pas d'amortissements repris, puisque la valeur réelle remplace la valeur brute. Frais externes de 16 000 000 : option 1, en charges (6324 honoraires 15 000 000, 6318 frais bancaires 1 000 000) ; option 2, imputés sur la prime (débit 1053, crédit 521). Si un écart subsiste entre les actifs identifiés et l'apport net, il est porté au débit du 215 Fonds commercial.",
      },
      {
        type: 'paragraphe',
        texte: "Chaque actif est repris à sa **valeur réelle individuelle** : l'Application 116 réévalue les terrains (+7 500 000) et les bâtiments (+10 000 000), et laisse les autres éléments à leur valeur comptable, jugée proche de leur valeur réelle. Si le traité mentionne des éléments absents du bilan de l'absorbée, comme une marque, une clientèle ou un droit au bail, ils sont inscrits au 215 Fonds commercial. S'il reste un écart entre l'apport net et la somme des éléments identifiés, c'est également au 215 qu'il est porté (ch. 38, § 3.4.1.4). Cet écart représente ce que l'absorbante « paie » au-delà des actifs identifiables : réputation, savoir-faire, synergies attendues. Il fait ensuite l'objet des tests de dépréciation applicables au fonds commercial.",
      },
      { type: 'controle', question: QCM[15] },
      {
        type: 'paragraphe',
        texte: "Le choix entre les deux options pour les frais externes n'est pas indifférent. En charges, les frais réduisent le résultat de l'exercice de la fusion, et donc le bénéfice distribuable. Imputés sur la prime, ils réduisent les capitaux propres sans passer par le résultat : l'opération est présentée comme un coût d'émission des titres nouveaux, supporté par l'ensemble des actionnaires. L'AUDCIF considère ces coûts externes comme des **frais d'émission de titres**, ce qui justifie l'imputation. Les coûts internes (temps passé par le personnel, déplacements, frais administratifs) restent toujours en charges, car ils ne sont pas directement liés à l'émission (ch. 38, § 3.4.1.3). L'option retenue doit être décrite dans les Notes annexes.",
      },
      { type: 'controle', question: QCM[16] },
      {
        type: 'paragraphe',
        texte: "Chez l'**absorbée**, la fusion est une dissolution. Il faut faire disparaître tous ses comptes en quatre étapes. **(1) Transfert du patrimoine** : l'absorbée constate sa créance sur l'absorbante au 4718 pour la valeur réelle de l'actif net apporté, débite ses dettes et ses amortissements, crédite ses actifs en valeur brute, et inscrit la plus-value d'apport au **1381 Résultat de fusion**. **(2) Rémunération** : elle reçoit les titres de l'absorbante (502) en paiement de sa créance. **(3) Droits des associés** : capital, réserves et résultat de fusion sont virés au 4618 Apporteurs, titres à échanger. **(4) Désintéressement** : les titres reçus sont remis aux associés, et le 4618 et le 502 sont soldés. À la fin, le bilan de l'absorbée est vide.",
      },
      {
        type: 'carte',
        titre: "Chez l'absorbée B",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["4718", "", "(1) Apport, compte de fusion, entité A", "90 000 000", ""],
            ["2811 / 2831 / 2841", "", "Amortissements (3 000 000 + 20 000 000 + 10 500 000)", "33 500 000", ""],
            ["162", "", "Emprunts transmis", "40 000 000", ""],
            ["", "211 à 521", "Actifs en valeur brute (6 000 000 + 30 000 000 + 60 000 000 + 20 000 000 + 15 000 000 + 5 000 000 + 10 000 000)", "", "146 000 000"],
            ["", "1381", "Résultat de fusion (terrains + 7 500 000, bâtiments + 10 000 000)", "", "17 500 000"],
            ["502", "", "(2) Actions A reçues", "90 000 000", ""],
            ["", "4718", "Apport, compte de fusion", "", "90 000 000"],
            ["1013 / 11 / 1381", "", "(3) Capital 60 000 000, réserves 12 500 000, résultat de fusion 17 500 000", "90 000 000", ""],
            ["", "4618", "Apporteurs, titres à échanger", "", "90 000 000"],
            ["4618", "", "(4) Remise des 10 000 actions A aux associés", "90 000 000", ""],
            ["", "502", "Actions", "", "90 000 000"],
          ],
        },
        note: "Contrôle de l'étape 1 : débits 90 000 000 + 33 500 000 + 40 000 000 = 163 500 000 ; crédits 146 000 000 + 17 500 000 = 163 500 000. Le plan de comptes intitule le 4718 « Apport, compte de fusion et opérations assimilées ». [texte officiel] L'AUDCIF relève lui-même que le Titre VII et le chapitre 32 du Titre VIII emploient ce compte comme « Autres débiteurs divers ».",
      },
      { type: 'controle', question: QCM[17] },
      {
        type: 'paragraphe',
        texte: "Pourquoi l'absorbée enregistre-t-elle une plus-value alors qu'elle disparaît ? Parce que ses associés ne reçoivent pas la valeur comptable de leur société, mais sa valeur réelle, sous forme d'actions de l'absorbante. Le 1381 fait apparaître cet enrichissement, puis il est viré avec le capital et les réserves au 4618 : il fait partie des droits des associés. Le résultat de fusion ne transite pas par le compte de résultat, puisque l'absorbée ne publie plus de comptes après sa dissolution. Pour l'absorbante, les actifs repris à la valeur réelle serviront de nouvelle base d'amortissement comptable. Fiscalement, l'article 54 de la loi n° 23/053 impose de conserver la base de l'apporteuse (section 8.10).",
      },
      { type: 'controle', question: QCM[18] },
    ],
  },
  {
    numero: '8.7',
    titre: "Participations préexistantes : renonciation, allotissement, actions propres, réciprocité",
    navLabel: "Participations",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les fusions entre sociétés liées sont fréquentes : on absorbe plus volontiers une société dont on est déjà actionnaire. Trois situations se présentent (AUDCIF, ch. 38, § 3.3) : l'absorbante détient des titres de l'absorbée, l'absorbée détient des titres de l'absorbante, ou les participations sont réciproques. Dans chaque cas, le problème est le même : à l'issue de l'échange, une société se retrouverait propriétaire de ses propres actions, ce que l'article 639 interdit (chapitre 5) et ce que l'article 191 écarte. La technique comptable consiste à **neutraliser** ces titres.",
      },
      {
        type: 'carte',
        titre: "Application 117 : A détient 40 % de B (fusion-renonciation)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["4614", "", "Apporteurs, entité absorbée B : actif net apporté", "100 000 000", ""],
            ["", "1013", "Capital : 2 000 actions A × 10 000", "", "20 000 000"],
            ["", "1053", "Prime de fusion 40 000 000 + boni 30 000 000", "", "70 000 000"],
            ["", "26", "Titres de participation B annulés (coût)", "", "10 000 000"],
            ["2411", "", "Réalisation : matériels industriels (valeur réelle)", "85 000 000", ""],
            ["411", "", "Clients", "18 000 000", ""],
            ["", "162", "Emprunts", "", "3 000 000"],
            ["", "4614", "Apporteurs, entité absorbée B", "", "100 000 000"],
          ],
        },
        note: "Valeurs : B = 100 000 000 / 5 000 = 20 000 ; A = (230 000 000 + 40 % × 100 000 000 + 60 000 000 − 30 000 000) / 10 000 = 30 000 ; parité 2 A pour 3 B. Seuls les 3 000 titres B des tiers sont échangés, contre 2 000 titres A. Chez B, le 4718 (100 000 000) n'est soldé qu'à hauteur de 60 000 000 par les titres reçus ; le solde de 40 000 000, quote-part de A, est soldé à l'étape 3 contre les capitaux propres. [texte officiel] À l'étape 1 chez B, le Guide crédite un compte 2231 intitulé « Matériels industriels » : 2231 est un compte de terrains, et les matériels industriels relèvent du 2411.",
      },
      { type: 'controle', question: QCM[19] },
      {
        type: 'paragraphe',
        texte: "La renonciation peut aussi être **partielle** : l'absorbante renonce à certains titres seulement, par exemple pour ajuster les rompus. Elle peut enfin conduire à un **mali**. Imaginons que A ait payé 50 000 000 pour ses 40 % de B, soit plus que la quote-part d'apport correspondante (40 000 000). Le mali de 10 000 000 est une moins-value de fusion. Il traduit souvent des plus-values latentes sur les actifs de B que le prix d'acquisition avait déjà payées, ou un surpaiement. L'AUDCIF demande d'en indiquer dans les Notes annexes la composante qui correspond aux plus-values latentes sur la quote-part détenue par l'absorbante (ch. 38, section 6). Le lecteur des comptes peut ainsi distinguer un mali qui reflète une valeur réelle d'un mali qui révèle une mauvaise acquisition.",
      },
      { type: 'controle', question: QCM[20] },
      {
        type: 'paragraphe',
        texte: "Le **boni de fusion** (ici 30 000 000) est la différence entre la quote-part d'apport représentée par les titres annulés (40 % de 100 000 000) et leur valeur nette comptable chez l'absorbante (10 000 000). Il traduit l'enrichissement de B depuis que A a acquis sa participation : réserves accumulées et plus-values latentes. L'AUDCIF le traite comme une prime de fusion, au 1053. Il ne passe donc pas en résultat. Si la quote-part était inférieure à la valeur des titres, il s'agirait d'un **mali**, qui viendrait en diminution de la prime. L'AUDCIF décrit une variante, la **fusion-allotissement** : le patrimoine de l'absorbée est partagé en deux lots. L'un revient à l'absorbante pour ses titres, comme dans une liquidation partielle ; l'autre est apporté contre titres pour la fraction extérieure. La plus-value sur le lot alloti est économiquement une plus-value de liquidation, mais le SYSCOHADA préconise de l'inscrire au 1053 (§ 3.5.1.2).",
      },
      {
        type: 'carte',
        titre: "Application 118 : B détient 20 % de A (actions propres puis réduction de capital)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["4614", "", "Apporteurs, entité B : actif net 90 000 000", "90 000 000", ""],
            ["", "1013", "Capital : 7 500 actions × 10 000", "", "75 000 000"],
            ["", "1053", "Prime de fusion", "", "15 000 000"],
            ["2411 / 411", "", "Réalisation : matériels 60 000 000, clients 21 000 000", "81 000 000", ""],
            ["5021", "", "Actions propres reçues : 2 000 actions A × 12 000", "24 000 000", ""],
            ["", "162 / 4614", "Emprunts 15 000 000 ; apporteurs 90 000 000", "", "105 000 000"],
            ["101", "", "Réduction de capital : 2 000 × 10 000", "20 000 000", ""],
            ["1053", "", "Excédent imputé sur la prime", "4 000 000", ""],
            ["", "5021", "Actions propres annulées", "", "24 000 000"],
          ],
        },
        note: "Prime finale : 15 000 000 − 4 000 000 = 11 000 000. [texte officiel] Chez B, l'étape 1 du Guide crédite le 2411 pour 30 000 000 et le 263 pour 15 000 000, alors que le bilan de B porte les matériels à 40 000 000 et les titres A à 5 000 000 ; les totaux (66 000 000) et le résultat de fusion (39 000 000) coïncident, mais la ventilation ne correspond pas au bilan.",
      },
      { type: 'controle', question: QCM[21] },
      {
        type: 'paragraphe',
        texte: "Quand les participations sont **réciproques**, la valeur de chaque société dépend de celle de l'autre. Dans l'Application 119, A détient 500 titres B et B détient 500 titres A. L'actif net de A hors titres B est de 185 000 000, et celui de B hors titres A de 140 000 000. D'où le système : 10 000 A = 500 B + 185 000 000 et 5 000 B = 500 A + 140 000 000. On le résout par substitution : B = (500 A + 140 000 000) / 5 000 = 0,1 A + 28 000 ; donc 10 000 A = 50 A + 14 000 000 + 185 000 000, soit 9 950 A = 199 000 000, A = **20 000** et B = **30 000**. La parité est de 3 A pour 2 B. L'opération combine ensuite les deux techniques précédentes. A renonce à se rémunérer pour ses 500 titres B, avec un boni de 10 000 000. Elle reçoit 500 actions propres, qu'elle annule par une réduction de capital de 5 000 000 au nominal et une imputation de 5 000 000 sur la prime. La prime finale est de 72 500 000. [texte officiel] Le Guide note cette imputation au compte « 10523 », qui n'existe pas au plan de comptes : il faut lire 1053.",
      },
      { type: 'controle', question: QCM[22] },
      {
        type: 'paragraphe',
        texte: "Ces situations croisées ne sont pas des curiosités d'examen. Dans les groupes familiaux ou issus de rapprochements successifs, il est fréquent que deux sociétés sœurs se détiennent mutuellement quelques pour cent de leur capital, héritage d'échanges de titres anciens. L'article 177 plafonne ces participations réciproques à 10 % (chapitre 7), mais rien n'interdit qu'elles existent en dessous de ce seuil. Au moment de la fusion, elles compliquent le calcul des valeurs, qui deviennent interdépendantes, et elles imposent à la fois une renonciation et une réduction de capital. Le comptable doit vérifier que le résultat est cohérent : la somme des capitaux propres après fusion doit correspondre aux actifs nets réellement apportés par les tiers, sans double comptage des titres réciproques.",
      },
      { type: 'controle', question: QCM[23] },
    ],
  },
  {
    numero: '8.8',
    titre: "Filiale à 100 %, fusion-réunion et scission",
    navLabel: "Autres formes",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'absorption d'une filiale détenue **en permanence à 100 %** est la forme la plus courante de restructuration interne. Juridiquement, c'est la fusion simplifiée de l'article 676 : ni AGE de l'absorbée, ni rapports. Comptablement, les apports sont évalués à la **valeur comptable**, et l'absorbante reprend chaque élément tel qu'il figurait chez l'absorbée, en ventilant la valeur nette entre valeur d'origine, amortissements et dépréciations. Aucune augmentation de capital n'est nécessaire, puisque l'absorbante ne peut pas se remettre ses propres titres (art. 191) : les titres de la filiale sont annulés. L'écart entre l'actif net comptable repris et le coût des titres annulés est un **boni ou mali** de fusion, traité selon la logique du § 3.5.1.1, c'est-à-dire en 1053 pour le boni.",
      },
      {
        type: 'carte',
        titre: "Exemple : absorption de la filiale à 100 % SANKURU BOIS SARL",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["2411", "", "Matériels industriels : valeur d'origine", "80 000 000", ""],
            ["", "2841", "Amortissements repris", "", "30 000 000"],
            ["311 / 411 / 521", "", "Stocks 12 000 000, clients 9 000 000, banque 4 000 000", "25 000 000", ""],
            ["", "401", "Fournisseurs", "", "15 000 000"],
            ["", "261", "Titres de participation SANKURU annulés (coût)", "", "45 000 000"],
            ["", "1053", "Boni de fusion : 60 000 000 − 45 000 000", "", "15 000 000"],
          ],
        },
        note: "Exemple pédagogique : actif net comptable repris 80 000 000 − 30 000 000 + 25 000 000 − 15 000 000 = 60 000 000. Les amortissements sont repris distinctement (AUDCIF, ch. 38, § 3.1 et 4.2.1), si bien que le plan d'amortissement continue sans rupture chez l'absorbante.",
      },
      {
        type: 'paragraphe',
        texte: "Dans une absorption à la valeur comptable, l'égalité fondamentale change de forme : apports nets = titres annulés + boni (ou − mali). Il n'y a ni capital nouveau ni prime de fusion au sens strict. L'opération ne crée pas non plus de résultat chez l'absorbante : le boni est porté en capitaux propres (1053). Pour l'analyste, les comptes de l'absorbante après fusion ressemblent aux comptes consolidés du groupe avant fusion, puisque les actifs de la filiale y figurent désormais directement, à leurs valeurs historiques. C'est exactement l'objectif de neutralité recherché par l'AUDCIF pour les regroupements entre entités sous contrôle exclusif.",
      },
      { type: 'controle', question: QCM[24] },
      {
        type: 'paragraphe',
        texte: "Dans la **fusion-réunion**, toutes les sociétés participantes disparaissent au profit d'une société nouvelle créée à cet effet. Celle-ci peut être constituée sans autres apports que ceux des sociétés qui fusionnent, sur approbation de ses statuts par l'AGE de chacune d'elles (art. 677). Ses écritures sont celles d'une **constitution** avec apports en nature (chapitre 1) : promesse des apports au 4614, capital et prime de fusion, puis réalisation. Chaque société qui disparaît passe les écritures de dissolution de l'absorbée. La **scission** obéit à la même logique, avec plusieurs bénéficiaires (ch. 38, section 5). La société scindée passe les écritures de l'absorbée, mais elle reçoit des titres de plusieurs sociétés et les remet à ses associés. Chaque bénéficiaire enregistre la fraction de patrimoine qui lui revient, à la valeur réelle ou comptable retenue dans le projet de scission. Une bénéficiaire nouvelle comptabilise l'apport comme une constitution de société.",
      },
    ],
  },
  {
    numero: '8.9',
    titre: "L'apport partiel d'actif (Application 120)",
    navLabel: "Apport partiel",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'apport partiel d'actif sert souvent à **filialiser** une activité : une société transfère une branche à une filiale, existante ou créée pour l'occasion, et reçoit en échange des titres de cette filiale. La branche doit être **autonome**, c'est-à-dire capable de fonctionner par ses propres moyens (art. 195). L'apport d'actifs **isolés** (un immeuble, quelques machines) n'est pas un apport partiel d'actif. Il se comptabilise comme un échange ordinaire, à la valeur actuelle du bien acquis lorsque les deux lots sont évaluables de façon fiable (AUDCIF, ch. 38, § 4.1.2.3).",
      },
      {
        type: 'carte',
        titre: "Application 120 : Y apporte une branche à X, rémunérée en actions de 10 000 émises à 15 000",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["4614", "", "Apporteurs, entité Y, compte d'apports", "123 000 000", ""],
            ["", "1013", "Capital : 8 200 × 10 000", "", "82 000 000"],
            ["", "1052", "Primes d'apport : 8 200 × (15 000 − 10 000)", "", "41 000 000"],
            ["215", "", "Fonds commercial (absent du bilan de Y)", "25 000 000", ""],
            ["2411", "", "Matériels industriels", "45 000 000", ""],
            ["311", "", "Stocks", "36 000 000", ""],
            ["411", "", "Clients sains : 35 580 000 − 7 200 000", "28 380 000", ""],
            ["4162", "", "Créances douteuses (brut)", "7 200 000", ""],
            ["", "401", "Fournisseurs", "", "12 820 000"],
            ["", "4912", "Dépréciations des créances douteuses (80 %)", "", "5 760 000"],
            ["", "4614", "Apporteurs, entité Y", "", "123 000 000"],
          ],
        },
        note: "Apport net : 25 000 000 + 45 000 000 + 36 000 000 + 29 820 000 − 12 820 000 = 123 000 000 ; 123 000 000 / 15 000 = 8 200 actions. [texte officiel] Le Guide libelle la prime « 8 200 × (10 000 − 5 000) » : le montant (41 000 000) est juste, mais le libellé du calcul ne l'est pas.",
      },
      { type: 'controle', question: QCM[25] },
      {
        type: 'paragraphe',
        texte: "Chez la société **apporteuse**, qui survit, les titres reçus sont inscrits au **26 Titres de participation** pour la valeur retenue dans le traité : valeur réelle des apports si l'opération est à la valeur réelle, valeur comptable sinon (AUDCIF, ch. 38, § 4.1). La contrepartie dépend de la nature des éléments apportés. Les **immobilisations** sont traitées comme cédées : crédit du 82 pour la valeur d'apport, puis sortie de la valeur nette par le 81. Les **stocks** sont crédités au 843 Produits liés aux opérations de restructuration ; pour ne pas fausser le résultat d'exploitation, la sortie du stock constatée par le 603 est neutralisée par un débit du 833 Charges liées aux opérations de restructuration et un crédit du 781 Transferts de charges d'exploitation. Les **autres éléments** sont crédités à leur compte, les écarts éventuels passant au 843 ou au 833.",
      },
      {
        type: 'paragraphe',
        texte: "Chez la société bénéficiaire, l'apport partiel d'actif ressemble en tout point à une augmentation de capital par apport en nature (chapitre 4) : commissaire aux apports si la bénéficiaire est une société par actions, approbation par l'AGE, et prime d'apport au 1052. Deux points méritent l'attention. Les éléments incorporels non inscrits au bilan de l'apporteuse, comme le fonds commercial de l'Application 120, entrent pour leur valeur d'apport. Les créances douteuses sont reprises en brut avec leur dépréciation, ce qui préserve l'information sur le risque et permet de suivre leur recouvrement. Si l'apport est fait à la valeur comptable, les amortissements et les dépréciations sont repris distinctement, comme dans une fusion à la valeur comptable (ch. 38, § 4.2.1).",
      },
      { type: 'controle', question: QCM[26] },
      {
        type: 'paragraphe',
        texte: "Pour le groupe, l'apport partiel d'actif est un outil d'organisation. Une société qui exerce deux métiers, par exemple la production agricole et le transport, peut isoler chacun dans une filiale : elle clarifie la gestion, peut accueillir un partenaire dans une seule des activités, ou préparer la cession de l'une sans toucher à l'autre. Comme l'apporteuse reçoit des titres et non de l'argent, l'opération ne dégage pas de trésorerie. Sa plus-value d'apport, si elle est comptabilisée à la valeur réelle, peut bénéficier de l'exonération de l'article 54 de la loi n° 23/053, lorsque les titres reçus sont attribués dans les conditions prévues et que la bénéficiaire, SA, SAS ou SARL, a son siège en RDC.",
      },
      { type: 'controle', question: QCM[27] },
    ],
  },
  {
    numero: '8.10',
    titre: "Fiscalité, Notes annexes et contexte congolais",
    navLabel: "Fiscalité et annexe",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Une fusion dégage des plus-values chez l'absorbée : la différence entre la valeur d'apport et la valeur comptable des actifs transmis (compte 1381). Sans régime particulier, ces plus-values seraient imposables, et beaucoup de restructurations deviendraient trop coûteuses. La loi n° 23/053 organise donc un **régime de faveur** (art. 54). Sont exonérées les plus-values, **autres que celles réalisées sur les marchandises**, résultant de l'attribution d'actions ou de parts à la suite de la **fusion** de SA, SAS ou SARL. Il en va de même des plus-values résultant de l'attribution gratuite d'actions ou de parts à la suite d'un **apport partiel d'actif** à une société de l'une de ces formes. Deux conditions s'appliquent : la bénéficiaire a son **siège social en RDC**, et l'apport prend la forme d'une fusion, d'un apport partiel ou d'une scission.",
      },
      {
        type: 'carte',
        titre: "Les deux obligations du régime de faveur (loi n° 23/053, art. 54)",
        liste: [
          "**Continuité des valeurs fiscales** : les amortissements et les plus-values ultérieures sur les éléments autres que les marchandises sont calculés d'après le **prix de revient chez la société apporteuse**, déduction faite des amortissements déjà pratiqués.",
          "**Reprise des provisions** : les provisions pour renouvellement de l'outillage et du matériel qui figuraient chez l'apporteuse sont immédiatement inscrites au passif de la bénéficiaire.",
          "Ces obligations doivent être **constatées dans l'acte** de fusion ou d'apport.",
        ],
        note: "Conséquence pratique : dans une fusion à la valeur réelle, l'absorbante tient deux jeux de valeurs pour les actifs repris, la valeur d'apport en comptabilité et le prix de revient de l'apporteuse en fiscalité. La base fiscale restant le prix de revient chez l'apporteuse, la part des amortissements calculée sur la plus-value d'apport doit être suivie à part, jusqu'à la sortie des biens. La plus-value sur les marchandises reste imposable, puisque l'exonération ne les vise pas.",
      },
      { type: 'controle', question: QCM[28] },
      {
        type: 'paragraphe',
        texte: "Sur le plan déclaratif, la fusion par absorption ou par création d'une société nouvelle figure parmi les cas de **retrait du Numéro Impôt** de la société qui disparaît. Le numéro retiré est définitivement désactivé et ne peut être réattribué (décret n° 03/012 et mesures d'exécution de la loi n° 004/2003). La société absorbée doit donc régulariser ses obligations fiscales jusqu'à la date d'effet, et l'absorbante, qui reprend son passif à titre universel, hérite de ses dettes fiscales comme de toutes ses autres dettes. Dans les **Notes annexes** de l'exercice de l'opération, l'absorbante ou la bénéficiaire mentionne le contexte de l'opération, les modalités d'évaluation des apports, et la composante de la moins-value globale de fusion qui correspond aux plus-values latentes sur la quote-part qu'elle détenait (AUDCIF, ch. 38, section 6).",
      },
      {
        type: 'paragraphe',
        texte: "En RDC, les fusions servent aussi à répondre aux exigences réglementaires de certains secteurs. Au chapitre 4, on a vu que les banques doivent détenir un capital minimum élevé. Un rapprochement entre deux établissements peut être une voie pour l'atteindre, sous réserve des autorisations de l'autorité de supervision bancaire, qui s'ajoutent alors aux règles de l'AUSCGIE. Plus largement, toute fusion dans un secteur réglementé (banque, assurance, mines, télécommunications) suppose de vérifier le cadre sectoriel avant de fixer le calendrier. La loi relative aux marchés boursiers de 2026 (chapitre 6) pourrait enfin rendre plus fréquentes les opérations sur sociétés cotées, pour lesquelles l'information du marché s'ajoutera à celle des actionnaires.",
      },
      { type: 'controle', question: QCM[29] },
      {
        type: 'filet',
        titre: "Les contrôles de l'auditeur sur une fusion",
        texte: "Projet complet et publié un mois avant l'assemblée (art. 193-194) ; documents mis à disposition quinze jours avant pour les SA (art. 674) ; rapports du conseil et du commissaire à la fusion (art. 671-672) ; majorités et unanimité éventuelle (art. 197) ; déclaration de conformité (art. 198). Côté comptes : méthode d'évaluation imposée (valeur réelle ou comptable), cohérence de la parité, soulte sous le plafond de 10 %, écritures chez les deux sociétés, traitement des titres réciproques, date d'effet et rétroactivité dans les bornes de l'art. 192, reprise des obligations fiscales et Notes annexes.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas1',
    titre: "MOERO BOISSONS absorbe LUAPULA EAUX : fusion simple",
    contexte: "MOERO BOISSONS SA (capital : 20 000 actions de 5 000 ; action évaluée à 12 000) absorbe LUAPULA EAUX SA (8 000 actions de 10 000). Bilan de LUAPULA : immobilisations nettes 95 000 000 (valeur réelle 119 000 000), stocks 21 000 000, clients 14 000 000, banques 10 000 000 ; capital 80 000 000, réserves 36 000 000, emprunts 24 000 000. Frais externes de fusion : 9 000 000, payés par chèque, imputés sur la prime.",
    questions: [
      {
        num: 1,
        enonce: "Calculez l'actif net apporté et la valeur d'échange de l'action LUAPULA.",
        correction: "Actif réel : 119 000 000 + 21 000 000 + 14 000 000 + 10 000 000 = 164 000 000 ; moins emprunts 24 000 000 = actif net 140 000 000. Vérification : capitaux propres (116 000 000) + plus-value (24 000 000) = 140 000 000. Valeur de l'action LUAPULA : 140 000 000 / 8 000 = 17 500.",
      },
      {
        num: 2,
        enonce: "Déterminez la parité, le nombre de titres à émettre, l'augmentation de capital et la prime de fusion.",
        correction: "Parité = 17 500 / 12 000 = 35/24 : rapport peu maniable — les praticiens retiendraient des valeurs arrondies négociées ; conservons le calcul exact : titres MOERO à émettre = 8 000 × 17 500 / 12 000 = 11 666,67, arrondi par le traité à 11 667 titres avec soulte marginale, ou parité négociée de 3 actions MOERO contre 2 actions LUAPULA (12 000 titres émis) si les parties ajustent les valeurs. Retenons la parité négociée 3/2 : 12 000 titres émis, augmentation de capital 12 000 × 5 000 = 60 000 000, prime de fusion = 140 000 000 − 60 000 000 = 80 000 000. La soulte éventuelle resterait plafonnée à 10 % de la valeur d'échange des titres attribués (art. 191).",
      },
      {
        num: 3,
        enonce: "Passez les écritures chez MOERO BOISSONS (parité 3/2 retenue).",
        correction: "Promesse : débit 4614 Apporteurs, entité absorbée LUAPULA 140 000 000 / crédit 1013 pour 60 000 000 et crédit 1053 Primes de fusion 80 000 000. Réalisation : débit immobilisations 119 000 000, stocks 21 000 000, clients 14 000 000, banques 10 000 000 / crédit 162 Emprunts 24 000 000 et crédit 4614 pour 140 000 000. Frais imputés sur la prime : débit 1053 9 000 000 / crédit 521 pour 9 000 000 (option 2 de l'Application 116). Prime finale : 71 000 000.",
      },
      {
        num: 4,
        enonce: "Passez les écritures chez LUAPULA EAUX.",
        correction: "Résultat de fusion : valeur d'apport des actifs − VNC = 24 000 000 (plus-value sur immobilisations). (1) Réalisation : débit 4718 140 000 000, débit des amortissements et débit 162 pour 24 000 000 / crédit des actifs en brut et crédit 1381 Résultat de fusion 24 000 000. (2) Rémunération : débit 502 Actions 140 000 000 / crédit 4718. (3) Droits des associés : débit 1013 80 000 000, débit 11 Réserves 36 000 000, débit 1381 24 000 000 / crédit 4618 pour 140 000 000. (4) Désintéressement : débit 4618 / crédit 502 pour 140 000 000 — les associés de LUAPULA reçoivent 12 000 actions MOERO.",
      },
      {
        num: 5,
        enonce: "Rappelez les formalités qui conditionnent la régularité de l'opération.",
        correction: "Projet de fusion arrêté par les organes de gestion, avec les mentions de l'article 193 (dont l'évaluation de l'actif et du passif, la parité, la prime prévue) ; dépôt au RCCM et avis dans un journal d'annonces légales un mois au moins avant la première assemblée (art. 194) ; approbation dans chaque société aux conditions de modification des statuts, unanimité si les engagements des associés augmentent (art. 197) ; déclaration de conformité au greffe à peine de nullité (art. 198). Effet : dernière assemblée d'approbation, sauf date conventionnelle dans les bornes de l'article 192.",
      },
    ],
  },
  {
    id: 'cas2',
    titre: "TSHUAPA PALM absorbe sa participation : fusion-renonciation",
    contexte: "TSHUAPA PALM SA (12 000 actions de 10 000) absorbe BUSIRA SAVON SA (4 000 actions de 10 000), dont elle détient 25 % (1 000 actions, coût d'acquisition 12 000 000). Après évaluation, l'action BUSIRA vaut 24 000 et l'action TSHUAPA 16 000. Actif net apporté par BUSIRA : 96 000 000.",
    questions: [
      {
        num: 1,
        enonce: "Pourquoi TSHUAPA ne peut-elle pas échanger les 1 000 actions BUSIRA qu'elle détient ?",
        correction: "L'article 191, alinéa 3, exclut l'échange lorsque les titres de la société qui disparaît sont détenus par la société bénéficiaire : TSHUAPA ne peut pas se rémunérer elle-même en ses propres actions. Elle renonce à émettre les titres correspondant à sa quote-part : c'est la fusion-renonciation (Application 117).",
      },
      {
        num: 2,
        enonce: "Calculez la parité, les titres à émettre, l'augmentation de capital, la prime et le boni de fusion.",
        correction: "Parité : 24 000 / 16 000 = 3/2 → 3 actions TSHUAPA contre 2 actions BUSIRA. Part extérieure : 75 % × 4 000 = 3 000 actions BUSIRA → 3 000 × 3/2 = 4 500 titres TSHUAPA émis ; augmentation de capital 45 000 000 ; part d'apport échangée : 75 % × 96 000 000 = 72 000 000 → prime de fusion 72 000 000 − 45 000 000 = 27 000 000. Quote-part revenant à TSHUAPA : 25 % × 96 000 000 = 24 000 000, contre un coût de 12 000 000 → boni de fusion 12 000 000, logé en 1053 avec la prime.",
      },
      {
        num: 3,
        enonce: "Passez l'écriture de rémunération des apports chez TSHUAPA.",
        correction: "Débit 4614 Apporteurs, entité absorbée BUSIRA 96 000 000 / crédit 1013 pour 45 000 000, crédit 1053 Prime de fusion 39 000 000 (prime 27 000 000 + boni 12 000 000), crédit 26 Titres de participation BUSIRA 12 000 000 (annulation au coût d'acquisition) — schéma de l'Application 117. Suit la réalisation des apports : débit des actifs aux valeurs d'apport / crédit des dettes transmises et de 4614 pour 96 000 000.",
      },
      {
        num: 4,
        enonce: "Chez BUSIRA, quel montant le compte 4718 conserve-t-il après la rémunération, et comment est-il soldé ?",
        correction: "BUSIRA ne reçoit des titres que pour la part échangée : 4 500 actions TSHUAPA à 16 000 = 72 000 000 (débit 502 / crédit 4718). Le compte 4718 conserve 96 000 000 − 72 000 000 = 24 000 000, correspondant à la quote-part de l'absorbante. À la constatation des droits, le crédit se partage : 4618 pour 72 000 000 (associés extérieurs) et 4718 pour 24 000 000, soldé — TSHUAPA ne se désintéresse pas elle-même (schéma de l'étape 3 de l'Application 117).",
      },
    ],
  },
  {
    id: 'cas3',
    titre: "ARUWIMI AGRO filialise sa branche transport : apport partiel d'actif",
    contexte: "ARUWIMI AGRO SARL apporte sa branche autonome « transport » à LINDI LOGISTIQUE SA (capital 50 000 000, actions de 10 000, action évaluée 12 500) : camions VNC 38 000 000 (valeur d'apport 47 000 000), pièces détachées en stock 8 000 000, créances brutes 12 500 000 dont 2 500 000 douteuses dépréciées à 60 %, dettes fournisseurs de la branche 6 000 000. L'apport est fait aux valeurs de l'acte.",
    questions: [
      {
        num: 1,
        enonce: "Qualifiez l'opération et son régime juridique.",
        correction: "Apport d'une branche autonome d'activité à une société préexistante, sans disparition de l'apporteuse : apport partiel d'actif (art. 195), soumis au régime de la scission — donc projet (art. 193), publicité un mois avant (art. 194), décision aux conditions de modification des statuts dans chaque société (art. 197) et déclaration de conformité (art. 198). Il peut intervenir entre sociétés de forme différente (art. 196) : SARL apporteuse, SA bénéficiaire.",
      },
      {
        num: 2,
        enonce: "Calculez l'apport net et le nombre d'actions à émettre par LINDI LOGISTIQUE.",
        correction: "Créances nettes : 12 500 000 − (2 500 000 × 60 % = 1 500 000) = 11 000 000. Apport net = 47 000 000 + 8 000 000 + 11 000 000 − 6 000 000 = 60 000 000. Actions à émettre : 60 000 000 / 12 500 = 4 800 actions.",
      },
      {
        num: 3,
        enonce: "Passez les écritures chez LINDI LOGISTIQUE.",
        correction: "Promesse : débit 4614 Apporteurs, entité ARUWIMI 60 000 000 / crédit 1013 pour 48 000 000 (4 800 × 10 000) et crédit 1052 Primes d'apport 12 000 000 (4 800 × 2 500). Réalisation : débit 245 (ou 2451) Matériel de transport 47 000 000, débit 31/32 Stocks 8 000 000, débit 411 Clients 10 000 000 (créances saines), débit 4162 Créances douteuses 2 500 000 / crédit 401 Fournisseurs 6 000 000, crédit 4912 Dépréciations des créances douteuses 1 500 000, crédit 4614 pour 60 000 000 — reprise des douteuses en brut avec leur dépréciation, comme dans l'Application 120.",
      },
      {
        num: 4,
        enonce: "Quel est le sort de l'apport chez ARUWIMI AGRO ?",
        correction: "ARUWIMI survit et reçoit 4 800 actions LINDI pour 60 000 000. Selon l'AUDCIF (ch. 38, § 4.1), les titres reçus sont inscrits au 26 Titres de participation pour la valeur retenue dans le traité, ici la valeur réelle. Avec 4 800 actions sur 9 800 après l'augmentation de capital (environ 49 %), ARUWIMI exerce au moins une influence notable sur LINDI (263), et un contrôle exclusif présumé si aucun autre associé ne détient davantage (commentaire du compte 26, chapitre 7). Contreparties : camions, crédit 82 pour 47 000 000 puis sortie de la VNC par débit 81 / crédit des comptes de matériel et d'amortissements (38 000 000), soit une plus-value de 9 000 000 ; pièces en stock, crédit 843 Produits liés aux opérations de restructuration 8 000 000, la sortie du stock constatée par le 603 étant neutralisée par débit 833 / crédit 781 ; créances et dettes de la branche, soldées à leur compte (411, 4162 et 4912, 401). L'activité de transport continue, mais dans le patrimoine distinct de LINDI, dont ARUWIMI devient l'un des principaux associés.",
      },
    ],
  },
  {
    id: 'cas4',
    titre: "Questions transversales de régularité",
    contexte: "Situations indépendantes : (a) le traité de fusion de deux SA prévoit une soulte de 15 % de la valeur d'échange des actions attribuées ; (b) une SNC doit être absorbée par une SA, et le traité met à la charge des associés de la SNC une obligation de garantie nouvelle étendant leurs engagements ; (c) l'avis de fusion est publié quinze jours seulement avant l'assemblée d'approbation ; (d) une société souhaite donner à la fusion un effet comptable rétroactif au 1er janvier N, alors que le dernier exercice clos des deux sociétés est le 31/12/N−1 et que l'assemblée approuve l'opération le 30/09/N.",
    questions: [
      {
        num: 1,
        enonce: "La soulte de 15 % est-elle licite ?",
        correction: "Non : l'article 191, alinéa 2, plafonne la soulte à dix pour cent de la valeur d'échange des parts ou actions attribuées. À 15 %, l'opération excède le cadre de la fusion — le traité doit être ramené sous le plafond.",
      },
      {
        num: 2,
        enonce: "Quelle majorité pour l'absorption de la SNC avec extension des engagements ?",
        correction: "La fusion entre sociétés de forme différente est permise (art. 196) et se décide, dans chaque société, aux conditions de modification des statuts (art. 197, al. 1er). Mais l'opération augmentant les engagements des associés de la SNC, elle ne peut être décidée qu'à l'unanimité de ceux-ci — les délibérations contraires sont nulles (art. 197, al. 2).",
      },
      {
        num: 3,
        enonce: "La publicité à quinze jours est-elle suffisante ?",
        correction: "Non : le dépôt au RCCM et l'avis dans un journal d'annonces légales doivent avoir lieu un mois au moins avant la date de la première assemblée générale appelée à statuer sur l'opération (art. 194, dernier alinéa). Le calendrier doit être repris.",
      },
      {
        num: 4,
        enonce: "L'effet rétroactif au 1er janvier N est-il possible ?",
        correction: "Oui : le contrat peut fixer une date d'effet différente de celle de la dernière assemblée, à condition qu'elle ne soit ni postérieure à la clôture de l'exercice en cours de la société bénéficiaire, ni antérieure à la clôture du dernier exercice clos des sociétés qui transmettent leur patrimoine (art. 192, 2°). Le 1er janvier N est postérieur au 31/12/N−1 (dernier exercice clos de l'apporteuse) et antérieur au 31/12/N : la rétroactivité conventionnelle est régulière — les opérations de l'absorbée depuis le 1er janvier N seront réputées accomplies pour le compte de l'absorbante, comme le prévoit la mention 4° du projet de fusion (art. 193).",
      },
    ],
  },
  {
    id: 'cas5',
    titre: "KWILU BRASSERIES SA absorbe sa filiale à 100 % KIKWIT MALT SA",
    contexte: "KWILU BRASSERIES SA détient depuis N−4 la totalité des 3 000 actions de KIKWIT MALT SA, inscrites au 261 pour 30 000 000. Le projet de fusion est déposé au RCCM le 15/04/N ; les AGE statuent le 30/06/N, avec effet rétroactif au 01/01/N ; les deux sociétés clôturent au 31 décembre. Bilan de KIKWIT MALT au 01/01/N : bâtiment industriel brut 50 000 000, amortissements 20 000 000 ; matériel brut 24 000 000, amortissements 14 000 000 ; stocks de marchandises 8 000 000 ; clients 6 000 000 ; banque 3 000 000 ; capital 30 000 000 ; réserves 10 000 000 ; fournisseurs 7 000 000 ; emprunt bancaire 10 000 000. Valeur réelle du bâtiment : 45 000 000.",
    questions: [
      {
        num: 1,
        enonce: "Quelles simplifications de procédure s'appliquent, et à quelle condition ?",
        correction: "Fusion entre SA : les art. 670 et suivants s'appliquent. KWILU détient en permanence la totalité du capital de KIKWIT depuis le dépôt du projet jusqu'à la réalisation : il n'y a lieu ni à approbation par l'AGE de l'absorbée, ni aux rapports du conseil et du commissaire à la fusion (art. 676). Restent le projet (art. 193), sa publicité un mois avant l'assemblée de l'absorbante (art. 194), la décision de celle-ci, l'information des créanciers et leur droit d'opposition (art. 679), et la déclaration de conformité (art. 198). Si KWILU cédait une seule action avant la réalisation, la condition de détention permanente tomberait.",
      },
      {
        num: 2,
        enonce: "À quelle valeur les apports sont-ils évalués ? La valeur réelle du bâtiment compte-t-elle ?",
        correction: "L'absorbante détient en permanence 100 % de l'absorbée : c'est un maintien de contrôle, évalué à la valeur comptable (AUDCIF, ch. 38, § 2.2.1). Le choix n'appartient pas aux sociétés (§ 3.1). La valeur réelle du bâtiment (45 000 000) est ignorée : il est repris pour 50 000 000 brut et 20 000 000 d'amortissements.",
      },
      {
        num: 3,
        enonce: "Calculez l'actif net comptable apporté et le boni de fusion.",
        correction: "Actifs nets : bâtiment 30 000 000 + matériel 10 000 000 + stocks 8 000 000 + clients 6 000 000 + banque 3 000 000 = 57 000 000 ; moins fournisseurs 7 000 000 et emprunt 10 000 000 : actif net comptable 40 000 000 (vérification : capital 30 000 000 + réserves 10 000 000). Titres annulés : 30 000 000. Boni de fusion : 10 000 000, inscrit au 1053 (logique de l'AUDCIF, ch. 38, § 3.5.1.1). Aucune augmentation de capital : KWILU ne peut pas se remettre ses propres titres (art. 191).",
      },
      {
        num: 4,
        enonce: "Passez l'écriture chez KWILU BRASSERIES.",
        correction: "Débit 2311 Bâtiments industriels 50 000 000, 2411 Matériel industriel 24 000 000, 311 Stocks 8 000 000, 411 Clients 6 000 000, 521 Banque 3 000 000 / crédit 2831 Amortissements des bâtiments 20 000 000, 2841 Amortissements du matériel 14 000 000, 401 Fournisseurs 7 000 000, 162 Emprunts 10 000 000, 261 Titres de participation KIKWIT 30 000 000, 1053 Primes de fusion (boni) 10 000 000. Total des débits : 91 000 000 = total des crédits. Les amortissements sont repris distinctement, et le plan d'amortissement se poursuit chez KWILU.",
      },
      {
        num: 5,
        enonce: "La rétroactivité au 01/01/N est-elle régulière ? Quelles conséquences fiscales et déclaratives ?",
        correction: "Oui : la date conventionnelle n'est ni postérieure à la clôture de l'exercice en cours de KWILU (31/12/N), ni antérieure à la clôture du dernier exercice clos de KIKWIT (31/12/N−1) (art. 192). Les opérations de KIKWIT depuis le 01/01/N sont réputées faites pour le compte de KWILU (art. 193, 4°). Fiscalement, l'opération à la valeur comptable ne dégage pas de plus-value, et le régime de l'art. 54 de la loi n° 23/053 (fusion de SA, bénéficiaire en RDC) assure la continuité des valeurs fiscales. Le Numéro Impôt de KIKWIT est retiré, et KWILU reprend toutes ses dettes, y compris fiscales, à titre universel.",
      },
    ],
  },
  {
    id: 'cas6',
    titre: "MONGALA CAFÉ SA et ÉQUATEUR CACAO SA : fusion-réunion en CONGO AGRO SA",
    contexte: "MONGALA CAFÉ SA (4 000 actions de 10 000) et ÉQUATEUR CACAO SA (6 000 actions de 10 000), indépendantes, décident de fusionner en créant CONGO AGRO SA, dont les actions auront un nominal de 10 000 et une valeur d'émission de 15 000. Actifs nets réels : MONGALA 120 000 000 ; ÉQUATEUR 90 000 000. Capitaux propres comptables d'ÉQUATEUR : capital 60 000 000 et réserves 15 000 000 ; l'écart avec sa valeur réelle provient d'une plantation (valeur nette comptable 40 000 000, valeur réelle 55 000 000). MONGALA a émis en N−2 un emprunt obligataire toujours en cours.",
    questions: [
      {
        num: 1,
        enonce: "Déterminez le nombre d'actions CONGO AGRO revenant à chaque société, les parités et le capital de la société nouvelle.",
        correction: "MONGALA : 120 000 000 / 15 000 = 8 000 actions, soit 2 actions nouvelles pour 1 action MONGALA (valeur 30 000). ÉQUATEUR : 90 000 000 / 15 000 = 6 000 actions, soit 1 pour 1 (valeur 15 000). Capital de CONGO AGRO : 14 000 × 10 000 = 140 000 000 ; prime de fusion : 210 000 000 − 140 000 000 = 70 000 000.",
      },
      {
        num: 2,
        enonce: "Quelles décisions faut-il réunir, et quel est le sort des obligataires de MONGALA ?",
        correction: "CONGO AGRO peut être constituée sans autres apports que ceux des deux sociétés ; son projet de statuts est approuvé par l'AGE de chacune d'elles, sans approbation par l'assemblée de la société nouvelle (art. 677). S'y ajoutent le projet commun, sa publicité un mois avant les assemblées, les rapports du conseil et des commissaires à la fusion, et la mise à disposition des documents quinze jours avant (art. 671-674). La fusion prend effet à l'immatriculation de CONGO AGRO (art. 192, 1°). Obligataires de MONGALA : le projet est soumis à leur assemblée, sauf si le remboursement sur simple demande leur est offert, à peine de nullité (art. 678). En cas de refus de leur assemblée, la société peut passer outre, et la masse peut former opposition (art. 810).",
      },
      {
        num: 3,
        enonce: "Passez les écritures de constitution chez CONGO AGRO (promesse des apports).",
        correction: "Débit 4614 Apporteurs, MONGALA CAFÉ 120 000 000 et 4614 Apporteurs, ÉQUATEUR CACAO 90 000 000 / crédit 1013 Capital 140 000 000 et 1053 Primes de fusion 70 000 000. La réalisation suit : débit des actifs à leur valeur réelle et crédit des dettes reprises et des 4614 pour solde. Les frais externes de l'opération sont portés en charges ou imputés sur la prime de fusion.",
      },
      {
        num: 4,
        enonce: "Chez ÉQUATEUR CACAO, calculez le résultat de fusion et décrivez le cycle des écritures.",
        correction: "Résultat de fusion : 55 000 000 − 40 000 000 = 15 000 000 (1381) ; vérification : 60 000 000 + 15 000 000 + 15 000 000 = 90 000 000. (1) Débit 4718 90 000 000, amortissements et dettes / crédit actifs en brut et 1381 15 000 000. (2) Débit 502 Actions CONGO AGRO 90 000 000 / crédit 4718. (3) Débit 1013 60 000 000, 11 Réserves 15 000 000, 1381 15 000 000 / crédit 4618 90 000 000. (4) Débit 4618 / crédit 502 : remise des 6 000 actions nouvelles aux actionnaires d'ÉQUATEUR.",
      },
      {
        num: 5,
        enonce: "Pour arrondir les droits d'un actionnaire de MONGALA, le traité prévoit une soulte de 4 000 par action MONGALA. Est-ce possible ?",
        correction: "Non. La soulte ne peut dépasser 10 % de la valeur d'échange des actions attribuées (art. 191). Pour une action MONGALA, les titres attribués valent 2 × 15 000 = 30 000 : la soulte maximale est de 3 000. Une soulte de 4 000 excède le plafond. Il faut réduire la soulte ou recourir à une autre solution pour les rompus : renonciation d'un actionnaire sur quelques titres, ou ajustement du prix d'émission des actions nouvelles. À noter que le § 2.3.2 de l'AUDCIF, qui exprime le plafond en valeur nominale, conduirait à 2 000 : c'est la valeur d'échange de l'art. 191 qui fait foi.",
      },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 8,
  id: 'ue3-chapitre-8',
  titre: "Les fusions et opérations assimilées",
  sousTitre: "AUSCGIE révisé, art. 189-199, 382-383 et 670-689 · AUDCIF, Titre VIII, ch. 38 · SYSCOHADA, Applications 116 à 120 · loi n° 23/053, art. 54",
  infoBulle: "Fusion, scission et apport partiel d'actif : transmission universelle, soulte plafonnée à 10 %, projet, publicité, décision, rapports et commissaire à la fusion, fusion simplifiée, protection des créanciers et des obligataires, évaluation imposée (valeur réelle ou comptable), parité et rompus, écritures chez l'absorbante et chez l'absorbée, renonciation et boni, actions propres, participations réciproques, filiale à 100 %, fusion-réunion, scission, apport partiel d'actif, régime fiscal de faveur et Notes annexes.",
  loiRef: "Art. 177, 189-199, 382-383, 639, 670-689, 809-810 AUSCGIE · AUDCIF, Titre VIII, ch. 38 · App. 116-120 · loi n° 23/053, art. 54",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Définir fusion, scission et apport partiel d'actif et en mesurer les effets : dissolution sans liquidation, transmission universelle, échange des titres, soulte (art. 189-192, 195-196, 199)",
    "Conduire la procédure commune et celle des SA : projet, publicité, décision, rapports, commissaire à la fusion, documents, fusion simplifiée, déclaration de conformité (art. 193-198, 670-677)",
    "Protéger créanciers et obligataires : substitution sans novation, opposition, consultation ou remboursement des obligataires (art. 678-689, 810)",
    "Appliquer la règle d'évaluation imposée et calculer parité, augmentation de capital, prime de fusion et rompus (AUDCIF, ch. 38)",
    "Comptabiliser une fusion simple chez l'absorbante (4614, 1013, 1053) et chez l'absorbée (4718, 1381, 502, 4618) (Application 116)",
    "Traiter les participations préexistantes : renonciation et boni, allotissement, actions propres, participations réciproques (Applications 117-119)",
    "Comptabiliser l'absorption d'une filiale à 100 %, la fusion-réunion, la scission et l'apport partiel d'actif chez la bénéficiaire et chez l'apporteuse (Application 120)",
    "Appliquer le régime fiscal de faveur congolais et renseigner les Notes annexes (loi n° 23/053, art. 54 ; AUDCIF, ch. 38, section 6)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Fusion : réunion par absorption ou par création d'une société nouvelle ; scission : partage du patrimoine ; apport partiel d'actif : apport d'une branche autonome sans disparition de l'apporteuse, sous le régime de la scission (art. 189, 190, 195).",
    "Effets : dissolution sans liquidation, transmission universelle, associés des sociétés qui disparaissent devenant associés des bénéficiaires ; soulte plafonnée à 10 % de la valeur d'échange ; pas d'échange des titres détenus par la bénéficiaire ou par la société qui disparaît (art. 191).",
    "Date d'effet : immatriculation de la société nouvelle, ou dernière assemblée, sauf date conventionnelle bornée (art. 192).",
    "Procédure : projet à huit mentions, dépôt et publicité un mois avant, décision aux conditions de modification des statuts, unanimité si les engagements augmentent, déclaration de conformité (art. 193-198).",
    "SA : AGE, rapport du conseil, commissaire à la fusion désigné par le juge, documents quinze jours avant ; fusion simplifiée pour la filiale à 100 % (art. 671-676).",
    "Créanciers : substitution sans novation, opposition dans les trente jours ; obligataires de l'absorbée consultés sauf offre de remboursement (art. 678-683, 810).",
    "Évaluation imposée : valeur réelle en cas de prise de contrôle, valeur comptable pour la filiale à 100 % ; parité = valeur du titre absorbé / valeur du titre absorbant ; apports nets = augmentation de capital + prime de fusion.",
    "Absorbante : 4614 → 1013 + 1053, réalisation des apports, frais en charges ou sur la prime. Absorbée : 4718, 1381, 502, 4618, désintéressement.",
    "Titres préexistants : renonciation et boni (ou mali) en 1053 ; actions propres reçues (5021) annulées par réduction de capital ; participations réciproques résolues par deux équations.",
    "Apport partiel d'actif : prime d'apport (1052) chez la bénéficiaire ; titres au 26 chez l'apporteuse, avec 82/81 pour les immobilisations et 843/833/781 pour les stocks. Régime fiscal de faveur : exonération des plus-values hors marchandises et continuité des valeurs fiscales (loi n° 23/053, art. 54).",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)", precision: "30 janvier 2014 ; art. 177, 189 à 199, 382-383, 639, 670 à 689, 809-810" },
    { genre: 'texte', intitule: "Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF)", precision: "Titre VIII, chapitre 38 (fusions et opérations assimilées), sections 1 à 6" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, Guide d'application", precision: "Applications 116 (fusion simple), 117 (fusion-renonciation), 118 (participation de l'absorbée dans l'absorbante), 119 (participations réciproques) et 120 (apport partiel d'actif)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, plan de comptes", precision: "comptes 1013, 101, 1052, 1053, 1381, 215, 26, 4614, 4618, 4718, 502, 5021, 81, 82, 833, 843, 781" },
    { genre: 'texte', intitule: "Loi n° 23/053 du 30 novembre 2023 relative à l'impôt sur les sociétés et à l'impôt sur le revenu des personnes physiques", precision: "art. 54 (fusions, scissions et apports partiels d'actifs)" },
    { genre: 'texte', intitule: "Décret n° 03/012 du 18 juillet 2003 et mesures d'exécution de la loi n° 004/2003 relatives au Numéro Impôt", precision: "retrait du Numéro Impôt en cas de fusion" },
    { genre: 'ouvrage', auteur: "Mapapa Mbangala A., Nkoy Mbangala C. et Mensah Freitas C.", titre: "Comptabilité des sociétés OHADA", editeur: "Droit Afrique", lieu: "s.l.", annee: "2026" },
    { genre: 'ouvrage', auteur: "Dobill M.", titre: "Comptabilité OHADA, tome 3 : comptabilité des sociétés", editeur: "Karthala", lieu: "Paris", annee: "2013" },
    { genre: 'ouvrage', auteur: "Nzoimbengene Luyindula B. D.", titre: "Comptabilité des sociétés suivant le système comptable OHADA révisé", editeur: "2e éd., à compte d'auteur", lieu: "s.l.", annee: "2025" },
    { genre: 'ouvrage', auteur: "Pougoué P.-G. (dir.)", titre: "Encyclopédie du droit OHADA", editeur: "Lamy", lieu: "Paris", annee: "2011" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE révisé du 30 janvier 2014 · AUDCIF, Titre VIII, chapitre 38, et SYSCOHADA révisé (Applications 116 à 120) · loi n° 23/053 du 30 novembre 2023 · réglementation du Numéro Impôt.",
}

export default chapitre
