// Chapitre 7 du module UE3, Comptabilité des sociétés : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
//
// Réécriture approfondie (septembre 2026). Sources lues pendant la rédaction :
// - AUSCGIE révisé du 30 janvier 2014 : art. 56-59 (valeur nominale,
//   négociabilité, expertise de la valeur des droits sociaux), 173-180
//   (groupe, contrôle, participation, participations croisées, société mère
//   et filiale), skill auscgie-acte-uniforme.
// - AUDCIF : art. 42-44 et 46 (valeur actuelle, valeur d'inventaire, PEPS
//   et CMP, dépréciation) ; Titre VII, commentaires des comptes 26, 27, 29,
//   47, 50 et 59 ; Titre VIII, chapitre 13 (portefeuille-titres) ; Titre IX,
//   Notes 4 et 9. SYSCOHADA révisé, Applications 48 à 51 ; plan de comptes ;
//   maquette (AR, AS, BQ, TK, TL, RN, TN, RO) ; logique du tableau des flux.
//   Divergences signalées dans le texte : compte 2746 (actions propres au
//   plan de comptes, titres immobilisés dans le Guide), compte 4856 absent du
//   plan, compte 472 employé pour des titres immobilisés (4813 au plan),
//   Application 50 intitulée « participation » mais passée en 274, frais
//   d'acquisition des participations (AUDCIF, ch. 13, § 2.1.2), seuil de
//   10 % (art. 176 AUSCGIE et AUDCIF, ch. 13), comptes 4714 et 7747.
// - Loi n° 23/053 du 30 novembre 2023, art. 9, 50, 72, 76 et 120 ; skill
//   fiscalite-rdc (paramètres 2026 : régime mère-fille).
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch7-q1', question: "Selon l'AUDCIF, qu'est-ce qu'une valeur mobilière ?",
    options: [
      { id: 'a', texte: "Tout bien meuble inscrit à l'actif" },
      { id: 'b', texte: "Un titre émis par une personne morale, donnant droit à une quotité de capital (action) ou à un droit de créance (obligation)" },
      { id: 'c', texte: "Un effet de commerce endossable" },
      { id: 'd', texte: "Une part d'intérêt de SNC" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, Titre VIII, ch. 13, § 1.1',
    explication: "L'AUDCIF cite les actions, obligations, titres de créances négociables, parts d'OPCVM (SICAV, FCP), bons de souscription, certificats d'investissement et options. Les fonds d'investissement sont eux-mêmes des valeurs mobilières.",
  },
  {
    id: 'ch7-q2', question: "Qu'est-ce qui détermine le compte où l'on inscrit un titre acheté ?",
    options: [
      { id: 'a', texte: "La nature juridique du titre (action ou obligation) seulement" },
      { id: 'b', texte: "Le prix payé" },
      { id: 'c', texte: "L'intention et la durée de détention, et l'influence recherchée sur l'émetteur" },
      { id: 'd', texte: "Le fait que le titre soit coté ou non" },
    ],
    reponseCorrecte: 'c', articleRef: 'AUDCIF, ch. 13, § 1.2 et 2 ; Application 48',
    explication: "Une même action peut être un titre de participation (26), un titre immobilisé (274) ou un titre de placement (50) selon que l'entité cherche l'influence, une détention durable sans influence, ou un revenu ou une plus-value à brève échéance.",
  },
  {
    id: 'ch7-q3', question: "Une société détient 12 % du capital d'une autre, acquis hors OPA. Comment ces titres sont-ils présumés ?",
    options: [
      { id: 'a', texte: "Titres de placement" },
      { id: 'b', texte: "Titres de participation, sauf preuve contraire mentionnée dans les Notes annexes" },
      { id: 'c', texte: "Titres de contrôle exclusif (261)" },
      { id: 'd', texte: "Actions propres" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 176 AUSCGIE ; AUDCIF, commentaire du compte 26',
    explication: "L'art. 176 considère qu'une société qui possède au moins 10 % du capital d'une autre y a une participation. L'AUDCIF en tire une présomption de titres de participation, que l'entité peut renverser en le justifiant dans les Notes annexes.",
  },
  {
    id: 'ch7-q4', question: "Quand une personne est-elle présumée contrôler une société au sens de l'AUSCGIE ?",
    options: [
      { id: 'a', texte: "Dès qu'elle détient 10 % des droits de vote" },
      { id: 'b', texte: "Lorsqu'elle détient plus de la moitié des droits de vote, directement, indirectement ou par accord avec d'autres associés" },
      { id: 'c', texte: "Lorsqu'elle est administrateur" },
      { id: 'd', texte: "Lorsqu'elle détient 20 % du capital" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 174-175 AUSCGIE',
    explication: "Le contrôle est la détention effective du pouvoir de décision (art. 174), présumé au-delà de la moitié des droits de vote, y compris par accord (art. 175). Le commentaire du compte 26 ajoute une présomption comptable dès plus de 40 % lorsqu'aucun autre associé ne détient davantage.",
  },
  {
    id: 'ch7-q5', question: "Dans quel compte inscrire une participation de 30 % conférant une influence notable ?",
    options: [
      { id: 'a', texte: "261" },
      { id: 'b', texte: "262" },
      { id: 'c', texte: "263" },
      { id: 'd', texte: "2741" },
    ],
    reponseCorrecte: 'c', articleRef: 'AUDCIF, commentaire du compte 26',
    explication: "L'influence notable est présumée à partir de 20 % des droits de vote : compte 263. Le 261 vise le contrôle exclusif, le 262 le contrôle conjoint, le 268 les autres titres de participation.",
  },
  {
    id: 'ch7-q6', question: "La SA ALPHA détient 15 % de la SARL BETA. BETA peut-elle acquérir des parts d'ALPHA ?",
    options: [
      { id: 'a', texte: "Oui, sans limite" },
      { id: 'b', texte: "Oui, jusqu'à 15 %" },
      { id: 'c', texte: "Non : une société par actions ou une SARL ne peut posséder de titres d'une autre société si celle-ci détient plus de 10 % de son capital" },
      { id: 'd', texte: "Oui, si l'assemblée de BETA l'autorise" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 177 AUSCGIE',
    explication: "L'art. 177 interdit les participations croisées au-delà de 10 %. À défaut d'accord, celle qui détient la fraction la plus faible cède ; jusqu'à la cession, les titres sont privés de vote et de dividende.",
  },
  {
    id: 'ch7-q7', question: "Dans le plan de comptes SYSCOHADA révisé, que désigne le compte 2746 ?",
    options: [
      { id: 'a', texte: "Titres immobilisés, actions" },
      { id: 'b', texte: "Actions ou parts propres" },
      { id: 'c', texte: "Obligations" },
      { id: 'd', texte: "Parts de FCP" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, Titre VII, compte 274',
    explication: "Le plan de comptes range sous 274 : 2741 TIAP, 2742 titres participatifs, 2743 certificats d'investissement, 2744 FCP, 2745 obligations, 2746 actions ou parts propres, 2748 autres titres immobilisés. Les Applications 48 et 49 du Guide emploient le 2746 pour des actions d'autres sociétés : ce cours retient le 2748.",
  },
  {
    id: 'ch7-q8', question: "Des titres de placement ne seront finalement pas revendus dans les 12 mois suivant la clôture. Que faire ?",
    options: [
      { id: 'a', texte: "Les laisser au compte 50" },
      { id: 'b', texte: "Les reclasser au compte 2748 Autres titres immobilisés par virement de compte à compte" },
      { id: 'c', texte: "Les céder obligatoirement" },
      { id: 'd', texte: "Les déprécier intégralement" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 13, § 2.6',
    explication: "Le compte d'origine est crédité pour solde par le débit du compte adapté à la nouvelle intention. Le transfert ne crée aucun résultat.",
  },
  {
    id: 'ch7-q9', question: "Comment traiter les frais d'acquisition de 5 000 actions cotées achetées pour une revente à court terme ?",
    options: [
      { id: 'a', texte: "En charges, compte 632" },
      { id: 'b', texte: "Dans un sous-compte du compte 50, par exemple 5026 Frais d'acquisition des actions" },
      { id: 'c', texte: "En immobilisation incorporelle" },
      { id: 'd', texte: "En diminution du prix d'achat" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 13, § 2.3.2 ; Application 48',
    explication: "Les titres de placement sont évalués au coût d'acquisition, et les frais sont enregistrés dans un sous-compte du compte 50 (5016 pour les titres du Trésor, 5026 pour les actions). Ils font partie de la valeur d'achat comparée au cours pour apprécier une dépréciation.",
  },
  {
    id: 'ch7-q10', question: "Application 48 : 2 500 actions à 16 000 (participation de 80 %) avec une commission de 1,5 %. Pour quel montant le 261 est-il débité ?",
    options: [
      { id: 'a', texte: "40 000 000" },
      { id: 'b', texte: "40 600 000" },
      { id: 'c', texte: "39 400 000" },
      { id: 'd', texte: "600 000" },
    ],
    reponseCorrecte: 'b', articleRef: 'Guide SYSCOHADA, Application 48',
    explication: "Le Guide incorpore la commission au coût : 40 000 000 + 1,5 % = 40 600 000. C'est aussi la règle du commentaire du compte 26 (prix majoré des frais accessoires). Le § 2.1.2 du chapitre 13, qui dit les frais « enregistrés par nature », diverge.",
  },
  {
    id: 'ch7-q11', question: "Pour acquérir des actions nouvelles, un investisseur achète des droits préférentiels de souscription. Comment traiter leur coût ?",
    options: [
      { id: 'a', texte: "En charges financières" },
      { id: 'b', texte: "Il est ajouté au prix d'acquisition des actions, au débit du compte de titres" },
      { id: 'c', texte: "Au compte 4719" },
      { id: 'd', texte: "En prime d'émission" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 13, § 2.4.2',
    explication: "Les DPS (ou droits d'attribution) achetés aux anciens actionnaires font partie du coût des actions obtenues. C'est le pendant, chez l'investisseur, du chapitre 4 sur l'augmentation de capital.",
  },
  {
    id: 'ch7-q12', question: "Une obligation cotée est achetée en bourse entre deux échéances. Comment traiter les intérêts courus inclus dans le prix ?",
    options: [
      { id: 'a', texte: "Dans le coût de l'obligation" },
      { id: 'b', texte: "Séparément, au compte d'intérêts courus (5063 pour un placement, 2768 selon l'AUDCIF pour une obligation immobilisée)" },
      { id: 'c', texte: "En charges financières" },
      { id: 'd', texte: "En produit immédiat" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 13, § 2.4.3.2',
    explication: "Le coupon couru racheté au vendeur n'est pas un élément du coût du titre : il sera récupéré à la prochaine échéance. L'isoler évite de gonfler le coût d'entrée et de surestimer le produit du coupon.",
  },
  {
    id: 'ch7-q13', question: "Application 49 : 20 000 actions (nominal 10 000, prime 2 000) libérées de moitié, frais 1 000 000. Quel montant reste dû à l'émetteur ?",
    options: [
      { id: 'a', texte: "140 000 000" },
      { id: 'b', texte: "120 000 000" },
      { id: 'c', texte: "100 000 000" },
      { id: 'd', texte: "241 000 000" },
    ],
    reponseCorrecte: 'c', articleRef: 'Guide SYSCOHADA, Application 49',
    explication: "La prime est intégralement exigible à la souscription : seule la moitié du nominal reste due, soit 20 000 × 5 000 = 100 000 000. Les titres entrent pour leur coût total (241 000 000).",
  },
  {
    id: 'ch7-q14', question: "Selon le plan de comptes, où inscrire la dette de libération sur des titres de participation non entièrement libérés ?",
    options: [
      { id: 'a', texte: "4726" },
      { id: 'b', texte: "4813 Versements restant à effectuer sur titres de participation et titres immobilisés non libérés" },
      { id: 'c', texte: "109" },
      { id: 'd', texte: "4613" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, commentaires des comptes 26 et 27',
    explication: "Le 4813 sert aux titres de participation et aux titres immobilisés, le 4726 aux titres de placement. Le Guide (Application 49) emploie le 472 pour des titres immobilisés, en divergence avec le plan de comptes. Lors de l'appel, l'AUDCIF vire le 4813 au 484.",
  },
  {
    id: 'ch7-q15', question: "Quel est le fait générateur de la comptabilisation d'un dividende à recevoir ?",
    options: [
      { id: 'a', texte: "L'encaissement" },
      { id: 'b', texte: "La clôture de l'exercice de la filiale" },
      { id: 'c', texte: "La décision de distribution de l'assemblée des associés de la société émettrice" },
      { id: 'd', texte: "L'arrêté des comptes par le conseil" },
    ],
    reponseCorrecte: 'c', articleRef: 'AUDCIF, ch. 13, § 2.5.1',
    explication: "Le dividende naît de la décision de l'assemblée. Titres de participation : 7721 ; autres titres immobilisés : 7722 ; titres de placement : 7746. Le chapitre 13 cite un compte 7747 que le plan de comptes ne contient pas.",
  },
  {
    id: 'ch7-q16', question: "Une filiale congolaise décide un dividende brut de 10 000 000 à sa mère congolaise. Que reçoit la mère, et que comptabilise-t-elle en produit ?",
    options: [
      { id: 'a', texte: "Elle reçoit 10 000 000 et comptabilise 10 000 000" },
      { id: 'b', texte: "Elle reçoit 8 000 000 (retenue de 20 %) et comptabilise le produit brut de 10 000 000" },
      { id: 'c', texte: "Elle reçoit 8 000 000 et comptabilise 8 000 000" },
      { id: 'd', texte: "Elle ne reçoit rien avant deux ans" },
    ],
    reponseCorrecte: 'b', articleRef: 'Loi n° 23/053, art. 72 et 120',
    explication: "La distribuante opère la retenue de 20 % sur les produits d'actions (art. 120). Chez la mère, le produit est le dividende brut, la retenue étant un impôt prélevé sur ce revenu. Si les conditions du régime mère-fille sont remplies, l'impôt payé sur les produits distribués s'impute sur celui dont la mère est redevable (art. 76).",
  },
  {
    id: 'ch7-q17', question: "Quelles conditions le régime mère-fille congolais (art. 76) pose-t-il notamment ?",
    options: [
      { id: 'a', texte: "Une participation d'au moins 10 % pendant un an" },
      { id: 'b', texte: "Une participation d'au moins 25 %, des sièges en RDC et la conservation des titres nominatifs pendant au moins deux années consécutives" },
      { id: 'c', texte: "La cotation en bourse de la filiale" },
      { id: 'd', texte: "Aucune condition" },
    ],
    reponseCorrecte: 'b', articleRef: 'Loi n° 23/053, art. 76',
    explication: "Le régime exige une société par actions ou une SARL mère, une participation d'au moins 25 %, des sièges sociaux en RDC, l'égalité de l'impôt supporté et la conservation nominative pendant au moins deux années consécutives. La rupture de l'engagement de conservation entraîne l'imposition des revenus indûment exonérés.",
  },
  {
    id: 'ch7-q18', question: "À l'inventaire, comment évalue-t-on des titres de participation ?",
    options: [
      { id: 'a', texte: "Au dernier cours de bourse" },
      { id: 'b', texte: "À leur valeur actuelle pour l'entité, estimée selon le marché et l'utilité (rentabilité, perspectives, actif net, liens stratégiques…)" },
      { id: 'c', texte: "À leur valeur nominale" },
      { id: 'd', texte: "Au coût d'acquisition réévalué" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 42 AUDCIF ; ch. 13, § 3.1',
    explication: "Les plus-values latentes ne sont pas comptabilisées ; les moins-values sont dépréciées titre par titre, sans compensation avec les titres en hausse.",
  },
  {
    id: 'ch7-q19', question: "Pour des titres de placement cotés, quelle valeur retenir à l'inventaire ?",
    options: [
      { id: 'a', texte: "Le cours du dernier jour de bourse" },
      { id: 'b', texte: "Le cours moyen du dernier mois avant la clôture" },
      { id: 'c', texte: "Le cours le plus haut de l'exercice" },
      { id: 'd', texte: "Le coût d'acquisition" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 13, § 3.2',
    explication: "Le cours moyen du dernier mois évite une variation journalière peu caractéristique. Pour les titres non cotés, on retient la valeur probable de négociation.",
  },
  {
    id: 'ch7-q20', question: "Un portefeuille de placement comprend des titres A en baisse de 800 000 et des titres B en hausse de 1 200 000. Quelle dépréciation constater ?",
    options: [
      { id: 'a', texte: "Aucune, le portefeuille est globalement en hausse" },
      { id: 'b', texte: "800 000, sans compensation avec la plus-value latente sur B" },
      { id: 'c', texte: "400 000" },
      { id: 'd', texte: "2 000 000" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 13, § 3.2 ; art. 43',
    explication: "La prudence interdit la compensation : la moins-value sur A est dépréciée (6795 / 590), la plus-value sur B n'est pas comptabilisée (art. 43).",
  },
  {
    id: 'ch7-q21', question: "Quelle écriture constate la dépréciation d'une participation sous contrôle exclusif ?",
    options: [
      { id: 'a', texte: "Débit 6795 / crédit 590" },
      { id: 'b', texte: "Débit 6972 Dotations aux dépréciations des immobilisations financières / crédit 2961" },
      { id: 'c', texte: "Débit 816 / crédit 261" },
      { id: 'd', texte: "Débit 261 / crédit 7972" },
    ],
    reponseCorrecte: 'b', articleRef: 'Plan de comptes : 6972, 2961',
    explication: "Les dépréciations des immobilisations financières passent par le 6972 et les comptes 296 (titres de participation) ou 297 (autres immobilisations financières, 2974 pour les titres immobilisés). Les titres de placement relèvent du 6795 et du 590.",
  },
  {
    id: 'ch7-q22', question: "Dans quels cas le SYSCOHADA exclut-il toute dépréciation malgré une baisse de cours ?",
    options: [
      { id: 'a', texte: "Titres de participation dans les filiales" },
      { id: 'b', texte: "Titres faisant l'objet d'opérations de couverture et actions propres destinées à être attribuées gratuitement aux salariés et dirigeants" },
      { id: 'c', texte: "Titres non cotés" },
      { id: 'd', texte: "Obligations d'État" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 13, § 3.3',
    explication: "Dans le premier cas, la perte est compensée par l'instrument de couverture. Dans le second, la perte sera constatée au travers de l'attribution gratuite elle-même.",
  },
  {
    id: 'ch7-q23', question: "Cession de titres de participation : quel circuit comptable utiliser ?",
    options: [
      { id: 'a', texte: "Débit trésorerie / crédit 26 et 777 ou 6771" },
      { id: 'b', texte: "Débit 816 / crédit 26 pour la valeur d'entrée ; débit trésorerie ou 485 / crédit 826 pour le prix ; reprise de la dépréciation par 7972" },
      { id: 'c', texte: "Débit 812 / crédit 26" },
      { id: 'd', texte: "Débit 26 / crédit 7721" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 13, § 4.1 ; Application 50',
    explication: "La cession d'une immobilisation financière est une opération HAO. La valeur d'entrée (non diminuée de la dépréciation) passe au 816, le prix au 826, et la dépréciation antérieure est reprise en résultat financier (7972).",
  },
  {
    id: 'ch7-q24', question: "Application 50 : valeur d'origine 50 000 000, dépréciation 6 000 000, prix 48 000 000. Quelle est l'incidence globale sur le résultat de l'exercice ?",
    options: [
      { id: 'a', texte: "−2 000 000" },
      { id: 'b', texte: "+4 000 000 (−2 000 000 HAO et +6 000 000 financier)" },
      { id: 'c', texte: "+6 000 000" },
      { id: 'd', texte: "−8 000 000" },
    ],
    reponseCorrecte: 'b', articleRef: 'Guide SYSCOHADA, Application 50',
    explication: "Moins-value HAO : 48 000 000 − 50 000 000 = −2 000 000. Reprise financière : +6 000 000. La dépréciation dotée antérieurement avait déjà pris en charge la perte ; l'exercice de cession enregistre le rattrapage.",
  },
  {
    id: 'ch7-q25', question: "Comment se mesure le prix de cession d'un titre ?",
    options: [
      { id: 'a', texte: "Le prix stipulé, frais de cession compris" },
      { id: 'b', texte: "Le prix stipulé dans l'acte, diminué des frais de cession strictement nécessaires (commission, courtage)" },
      { id: 'c', texte: "Le cours moyen du mois" },
      { id: 'd', texte: "La valeur nominale" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 13, section 4',
    explication: "La valeur comptable sortie est le coût d'acquisition, non diminué de la dépréciation, et le prix de cession est net des frais strictement nécessaires.",
  },
  {
    id: 'ch7-q26', question: "Application 51 : quelle méthode donne un gain de 291 667 sur la cession de 2 500 titres au prix de 29 000 000 ?",
    options: [
      { id: 'a', texte: "PEPS" },
      { id: 'b', texte: "Coût moyen pondéré (34 450 000 / 3 000 = 11 483,33)" },
      { id: 'c', texte: "Dernier entré, premier sorti" },
      { id: 'd', texte: "Valeur nominale" },
    ],
    reponseCorrecte: 'b', articleRef: 'Guide SYSCOHADA, Application 51',
    explication: "CMP : 2 500 × 11 483,33 = 28 708 333, gain de 291 667. En PEPS, la valeur de sortie est de 29 250 000, soit une perte de 250 000. Le chapitre 13 admet les deux méthodes ; le commentaire du compte 50 ne cite que le PEPS ; la permanence des méthodes s'impose.",
  },
  {
    id: 'ch7-q27', question: "Où comptabiliser la perte sur cession de titres de placement ?",
    options: [
      { id: 'a', texte: "816 (HAO)" },
      { id: 'b', texte: "6771 Pertes sur cessions de titres de placement (résultat financier)" },
      { id: 'c', texte: "6972" },
      { id: 'd', texte: "658" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, commentaire du compte 50 ; ch. 13, § 4.2',
    explication: "La gestion d'un portefeuille de placement est une activité financière ordinaire : gains au 777, pertes au 6771, et reprise de la dépréciation existante au 7795.",
  },
  {
    id: 'ch7-q28', question: "À défaut d'accord sur le prix des titres d'un associé que les statuts obligent à céder, qui fixe la valeur ?",
    options: [
      { id: 'a', texte: "Le gérant" },
      { id: 'b', texte: "Le commissaire aux comptes" },
      { id: 'c', texte: "Un expert désigné par les parties ou, à défaut, par la juridiction compétente statuant à bref délai" },
      { id: 'd', texte: "L'administration fiscale" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 59 AUSCGIE',
    explication: "L'art. 59 s'applique dans tous les cas où l'Acte uniforme prévoit la cession des titres d'un associé ou leur rachat par la société. Les méthodes d'évaluation relèvent de la pratique de l'expert.",
  },
  {
    id: 'ch7-q29', question: "Capitaux propres 150 000 000, plus-value latente sur terrain 15 000 000, 10 000 titres. Quelle est la valeur mathématique intrinsèque ?",
    options: [
      { id: 'a', texte: "15 000" },
      { id: 'b', texte: "16 500" },
      { id: 'c', texte: "10 000" },
      { id: 'd', texte: "13 500" },
    ],
    reponseCorrecte: 'b', articleRef: 'Pratique de l\'évaluation',
    explication: "Actif net corrigé : 150 000 000 + 15 000 000 = 165 000 000, soit 16 500 par titre (avant incidence fiscale éventuelle, que l'expert apprécie). La valeur mathématique comptable serait de 15 000.",
  },
  {
    id: 'ch7-q30', question: "Dans le bilan SYSCOHADA, où figurent les titres de placement ?",
    options: [
      { id: 'a', texte: "En AR avec les titres de participation" },
      { id: 'b', texte: "En BQ Titres de placement, net du 590, dans la trésorerie-actif" },
      { id: 'c', texte: "En AS Autres immobilisations financières" },
      { id: 'd', texte: "En capitaux propres" },
    ],
    reponseCorrecte: 'b', articleRef: 'Maquette du bilan, rubriques AR, AS et BQ',
    explication: "AR : titres de participation (26, nets du 296) ; AS : autres immobilisations financières (27, nets du 297) ; BQ : titres de placement (50, nets du 590), dans la trésorerie-actif, d'où leur place dans la trésorerie du tableau des flux.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '7.1',
    titre: "Les valeurs mobilières et la logique du classement",
    navLabel: "Typologie",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Kinshasa, quartier de la Gombe. **KINSHASA AGRO HOLDING SA** (KAH) gère les participations d'un groupe agro-industriel. Cette année, elle souscrit 45 % du capital d'une huilerie de la Tshopo, acquiert 12 % d'une cimenterie de Matadi et encaisse le dividende d'une société de transport de Kolwezi dont elle détient 25 %. Sa trésorerie excédentaire est placée en actions cotées et en bons du Trésor. Chaque titre pose les mêmes questions : où l'inscrire, pour quelle valeur, comment en constater les revenus, et comment l'évaluer à la clôture ? Ce chapitre répond à ces questions à partir du portefeuille de KAH.",
      },
      {
        type: 'paragraphe',
        texte: "Les chapitres précédents regardaient les titres du côté de la société qui les **émet** : capital, primes, emprunt obligataire. Ce chapitre se place du côté de celui qui les **détient**. Une société commerciale achète des actions ou des obligations pour des raisons très différentes : prendre le contrôle d'un fournisseur, s'associer durablement à un partenaire, placer une trésorerie disponible, ou simplement faire fructifier un excédent de fonds en attendant un investissement. La comptabilité doit rendre ces intentions visibles, car elles n'ont pas la même signification pour le lecteur des états financiers. Une participation dans une filiale est un outil de l'activité ; un placement est une réserve de liquidité.",
      },
      {
        type: 'paragraphe',
        texte: "L'AUDCIF (Titre VIII, chapitre 13) définit les **valeurs mobilières** comme des titres émis par des personnes morales, qui donnent droit soit à une quotité de capital (les actions), soit à un droit de créance (les obligations). Il en cite les principales formes : actions, obligations, titres de créances négociables, parts d'OPCVM (SICAV et FCP), bons de souscription, certificats d'investissement et options. Les fonds d'investissement qui détiennent des actions, des obligations ou des créances à court terme sont eux-mêmes des valeurs mobilières. Du côté du droit des sociétés, l'AUSCGIE rappelle que les titres d'une même catégorie ont la même valeur nominale (art. 56), que les parts sociales sont cessibles alors que les actions sont cessibles ou négociables (art. 57), et que seules les sociétés par actions émettent des titres négociables (art. 58).",
      },
      {
        type: 'carte',
        titre: "Deux grandes familles, quatre destinations",
        tableau: {
          entetes: ["Famille", "Compte", "Intention de l'entité", "Rubrique du bilan"],
          lignes: [
            ["Titres immobilisés au sens large", "26 Titres de participation", "Lien durable, influence ou contrôle, contribution à l'activité", "AR Titres de participation (nets du 296)"],
            ["", "274 Titres immobilisés (2741 TIAP, 2745 obligations, 2748 autres…)", "Conservation durable sans influence, placement à long terme", "AS Autres immobilisations financières (nets du 297)"],
            ["Titres de placement", "50 Titres de placement (501 à 508)", "Revenu direct ou plus-value à brève échéance, titres cessibles", "BQ Titres de placement (nets du 590), dans la trésorerie-actif"],
          ],
        },
        note: "La nature juridique du titre ne décide de rien : une action peut aller au 261, au 2748 ou au 5022. C'est l'intention, et la durée de détention qu'elle implique, qui commande le classement. Le Guide illustre cette logique par cinq acquisitions dans l'Application 48.",
      },
      {
        type: 'paragraphe',
        texte: "Il ne faut pas confondre les **titres** avec les **créances** que l'entité détient sur les mêmes sociétés. Une mère qui prête de l'argent à sa filiale ne lui achète pas de titres : elle constate un prêt au compte 27, et plus précisément une **créance rattachée à une participation** (2771 pour le groupe, 2772 hors groupe) si le prêt accompagne une participation. Les avances à un GIE vont au 2774, alors que les parts du GIE vont au 266. De même, les sommes laissées en compte courant par un associé sont, chez la société qui les reçoit, une dette envers l'associé, et chez l'associé une créance. La frontière compte, car un titre donne des droits d'associé (vote, dividende, boni de liquidation), alors qu'une créance donne un droit au remboursement et, le cas échéant, à un intérêt.",
      },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      {
        type: 'paragraphe',
        texte: "Le classement n'est pas une formalité. Il détermine la **méthode d'évaluation à l'inventaire** : valeur d'utilité pour une participation, cours moyen du dernier mois pour des titres cotés détenus en placement. Il détermine aussi le **traitement de la cession**, en résultat hors activités ordinaires pour une immobilisation financière, en résultat financier pour un placement. Il se reflète enfin dans le **tableau des flux** : l'achat d'une participation est un investissement, alors que les titres de placement font partie de la trésorerie. Un mauvais classement fausse donc à la fois le bilan, le compte de résultat et le tableau des flux.",
      },
    ],
  },
  {
    numero: '7.2',
    titre: "Les titres de participation : contrôle, influence et groupe",
    navLabel: "Participations",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les titres de participation sont les droits dans le capital d'autres entités qui, en créant un **lien durable** avec celles-ci, sont destinés à contribuer à l'activité de la société détentrice (AUDCIF, commentaire du compte 26). Un titre est qualifié de participation lorsque sa détention permet d'exercer une **certaine influence** sur l'émetteur, de la simple relation commerciale privilégiée à la véritable prise de contrôle. Pour éviter les discussions sans fin sur l'intention, le référentiel pose des **présomptions** : sont présumés être des titres de participation ceux acquis par offre publique d'achat ou d'échange, et ceux qui représentent une fraction significative du capital de l'émetteur.",
      },
      {
        type: 'filet',
        titre: "Le seuil de 10 % : trois rédactions",
        texte: "L'article 176 de l'AUSCGIE considère qu'une société qui possède dans une autre une fraction du capital « égale ou supérieure à dix pour cent » y a une participation. Le commentaire du compte 26 reprend la même idée (« au moins 10 % »). Le chapitre 13 de l'AUDCIF, en citant pourtant l'article 176, écrit « plus de 10 % » [texte officiel]. La lecture conforme à l'Acte uniforme est celle de l'article 176 : 10 % tout rond suffit. Dans tous les cas, la présomption est simple : l'entité peut classer ces titres ailleurs en apportant la preuve contraire, avec une mention dans les Notes annexes.",
      },
      {
        type: 'carte',
        titre: "Les subdivisions du compte 26 et leurs critères",
        tableau: {
          entetes: ["Compte", "Situation", "Critère"],
          lignes: [
            ["261", "Contrôle exclusif", "Plus de la moitié des droits de vote, directement, indirectement ou par accord avec d'autres associés (art. 175 AUSCGIE) ; présomption comptable dès plus de 40 % si aucun autre associé ne détient davantage (commentaire du compte 26)"],
            ["262", "Contrôle conjoint", "Contrôle partagé par un nombre limité d'associés, décisions prises d'un commun accord"],
            ["263", "Influence notable", "Pouvoir de participer aux décisions financières et opérationnelles sans les contrôler ; présumée à partir de 20 % des droits de vote"],
            ["265", "Organismes professionnels", "Participations dans des organismes professionnels"],
            ["266", "Parts de GIE", "Droits des membres dans un groupement d'intérêt économique (les avances vont au 2774)"],
            ["268", "Autres titres de participation", "Aucun contrôle déterminant aujourd'hui, mais une influence notable ou un contrôle possibles après d'autres acquisitions"],
          ],
        },
        note: "Lorsque le type de contrôle change (par exemple de 263 à 261 après un rachat de titres), les transferts sont opérés entre ces comptes. La ventilation prépare la consolidation, qui traite différemment les filiales contrôlées, les entités sous contrôle conjoint et celles sous influence notable.",
      },
      { type: 'controle', question: QCM[2] },
      {
        type: 'paragraphe',
        texte: "Le contrôle peut être **indirect**. Supposons que la société A détienne 60 % des droits de vote de B, et que B détienne 30 % de ceux de C. A contrôle B, et, à travers B, dispose de 30 % des voix de C. Son **intérêt** économique dans C n'est pourtant que de 60 % × 30 % = 18 %. Les deux notions servent à des fins différentes. Le **pourcentage de contrôle** (ici 30 %) sert à qualifier le lien et donc le compte ou la méthode de consolidation. Le **pourcentage d'intérêt** (18 %) mesure la part des résultats et de l'actif net de C qui revient finalement aux actionnaires de A. Dans les comptes individuels de A, seule la participation directe dans B apparaît, au 261. La participation de B dans C figure dans les comptes de B, au 263 si elle y confère une influence notable.",
      },
      { type: 'controle', question: QCM[3] },
      {
        type: 'paragraphe',
        texte: "Le droit des sociétés organise les mêmes notions. Un **groupe de sociétés** est l'ensemble formé par des sociétés unies par des liens qui permettent à l'une d'elles de contrôler les autres (art. 173). Le **contrôle** est la détention effective du pouvoir de décision (art. 174). Une société est **société mère** d'une autre lorsqu'elle possède plus de la moitié de son capital (art. 179), et une **filiale commune** est détenue par plusieurs mères qui, chacune, disposent d'une participation suffisante pour bloquer toute décision extraordinaire et participent à sa gestion (art. 180). Remarquez la nuance : l'article 179 raisonne en **capital**, l'article 175 en **droits de vote**. Avec des actions à droit de vote double ou des actions de préférence sans droit de vote, les deux peuvent diverger.",
      },
      { type: 'controle', question: QCM[4] },
      {
        type: 'carte',
        titre: "Les participations croisées sont plafonnées (art. 177-178)",
        liste: [
          "Une société par actions ou une SARL **ne peut posséder** d'actions ou de parts d'une autre société si celle-ci détient **plus de 10 %** de son capital (art. 177).",
          "À défaut d'accord pour régulariser, la société qui détient la fraction **la plus faible** cède ses titres ; à égalité, chacune réduit sa participation à 10 % au plus.",
          "Jusqu'à leur cession effective, les titres à céder sont **privés du droit de vote et du dividende**.",
          "Si l'une des sociétés n'est ni une société par actions ni une SARL (une SNC, par exemple), l'article 178 lui interdit de détenir des titres de la société par actions ou de la SARL qui a plus de 10 % de son capital, et la limite à 10 % dans le cas contraire.",
        ],
        note: "Pour le comptable, ces règles ont un effet direct : des titres privés de dividende ne produisent pas de revenu, et leur cession forcée peut imposer une dépréciation si le prix de régularisation est inférieur au coût d'entrée.",
      },
      {
        type: 'paragraphe',
        texte: "Ces règles ont une raison d'être financière. Lorsque deux sociétés se détiennent mutuellement, une partie du capital de chacune n'est qu'un reflet du capital de l'autre : l'argent circule en rond sans qu'aucun apport réel ne vienne des tiers. Une augmentation de capital souscrite par une société détenue par l'émettrice revient en partie à s'autofinancer. Les dirigeants peuvent aussi s'assurer le contrôle des assemblées grâce à des voix qui, au fond, appartiennent à la société elle-même. En plafonnant les participations croisées à 10 % et en privant de vote et de dividende les titres à céder, l'Acte uniforme protège les créanciers, qui comptent sur un capital réel, et les minoritaires, qui ne doivent pas être neutralisés par des votes circulaires. L'auditeur qui découvre une participation croisée au-delà du seuil doit donc la signaler, en plus d'en tirer les conséquences comptables.",
      },
      {
        type: 'filet',
        titre: "Et si KAH gardait ses parts de MATADI CIMENT ?",
        texte: "KINSHASA AGRO HOLDING (KAH) a acquis 12 % de MATADI CIMENT, qui détient elle-même 18 % de KAH. L'article 177 l'interdit : une société par actions ne peut posséder de titres d'une société qui détient plus de 10 % de son propre capital. À défaut d'accord, c'est KAH, qui détient la fraction la plus faible, qui doit céder. Si elle tarde, ses parts restent privées de vote et de dividende jusqu'à leur cession. Comptablement, KAH ne constate aucun revenu sur ces parts et doit apprécier, à la clôture, si le prix de cession attendu impose une dépréciation.",
      },
      { type: 'controle', question: QCM[5] },
    ],
  },
  {
    numero: '7.3',
    titre: "Titres immobilisés et titres de placement",
    navLabel: "Immobilisés et placement",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les **titres immobilisés** (compte 274) sont des titres que l'entité a décidé de **conserver durablement** sans qu'ils répondent à la définition des titres de participation : ce sont des placements à long terme. Le plus caractéristique est le **TIAP** (2741, titre immobilisé de l'activité de portefeuille). L'entité investit une partie de ses actifs dans un portefeuille pour en retirer, à plus ou moins longue échéance, une rentabilité satisfaisante, **sans intervenir dans la gestion** des sociétés dont elle détient les titres. Les autres subdivisions suivent la nature du titre : titres participatifs (2742), certificats d'investissement (2743, droits pécuniaires sans droit de vote), parts de FCP (2744), obligations (2745), autres titres immobilisés (2748).",
      },
      {
        type: 'filet',
        titre: "Le compte 2746 : attention au piège du Guide",
        texte: "Dans le plan de comptes du SYSCOHADA révisé, le compte **2746** est intitulé « **Actions ou parts propres** » : il sert aux actions de la société elle-même détenues durablement. Or les Applications 48 et 49 du Guide inscrivent au 2746 des actions d'**autres** sociétés, qualifiées de « titres immobilisés, actions » [texte officiel]. Dans ce cours, les actions d'autres sociétés conservées durablement sans influence sont inscrites au **2748 Autres titres immobilisés**, conformément au plan de comptes, et les montants des Applications sont repris tels quels.",
      },
      { type: 'controle', question: QCM[6] },
      {
        type: 'paragraphe',
        texte: "Les **titres de placement** (compte 50) sont des titres **cessibles**, acquis en vue d'en retirer un **revenu direct ou une plus-value à brève échéance**. Ils sont ventilés selon l'émetteur, le type de titre et le lieu de négociation : 501 titres du Trésor et bons de caisse à court terme, 502 actions (5021 actions propres, 5022 cotées, 5023 non cotées), 503 obligations (dont 5031, les obligations rachetées par la société émettrice étudiées au chapitre 6), 504 bons de souscription, 505 titres négociables hors Région, 508 autres. Ils sont réalisables immédiatement en cas de besoin, et c'est pourquoi la maquette les range dans la **trésorerie-actif** (rubrique BQ).",
      },
      {
        type: 'paragraphe',
        texte: "L'intention peut changer. Si la direction n'a plus l'intention ou la possibilité de revendre des titres de placement dans les **12 mois** qui suivent la clôture, ils doivent être reclassés au **2748 Autres titres immobilisés** (AUDCIF, ch. 13, § 2.6). Le transfert se fait par virement de compte à compte : le compte d'origine est crédité pour solde par le débit du compte adapté. Il ne dégage aucun résultat, mais il déplace les titres de la trésorerie vers l'actif immobilisé. C'est une décision que l'auditeur examine avec soin, car elle peut servir à éviter une dépréciation au cours de bourse en invoquant une valeur d'utilité à long terme.",
      },
      {
        type: 'paragraphe',
        texte: "La frontière entre les catégories n'est pas toujours évidente. Des parts de SICAV monétaire, rachetables à tout moment et acquises pour placer une trésorerie de quelques mois, sont des titres de placement. Les mêmes parts, achetées pour constituer une réserve de long terme qu'on n'entend pas mobiliser, relèveraient plutôt des titres immobilisés (2744 pour les FCP, 2748 pour les autres). Des obligations de l'État achetées à l'émission pour être gardées jusqu'à l'échéance sont des obligations immobilisées (2745). Si la société compte les revendre au premier besoin de trésorerie, elles restent au 503. Des certificats d'investissement (2743), qui ne confèrent que des droits pécuniaires sans droit de vote, ne peuvent pas être des titres de participation, puisqu'ils ne donnent aucune influence. La règle est toujours la même : se demander ce que l'entité veut faire du titre, puis vérifier que les faits ne contredisent pas l'intention affichée.",
      },
      { type: 'controle', question: QCM[7] },
    ],
  },
  {
    numero: '7.4',
    titre: "Le coût d'entrée : prix, frais, droits et coupons courus",
    navLabel: "Coût d'entrée",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Toutes les catégories de titres sont évaluées à leur entrée au **coût d'acquisition**. La question délicate est celle des **frais** : commissions d'intermédiaire, courtages, honoraires, impôts sur l'opération. Pour les **titres de placement**, l'AUDCIF les enregistre dans un **sous-compte du compte 50** : 5016 pour les titres du Trésor, 5026 pour les actions, 5036 pour les obligations. Ils restent ainsi identifiables tout en faisant partie de la valeur d'achat, et le commentaire du compte 50 précise que c'est cette valeur, **frais inclus**, que l'on compare au cours pour apprécier une perte. Pour les **titres immobilisés**, le commentaire du compte 27 est net : les frais accessoires (impôts, courtages, commissions, honoraires) sont **inclus dans le prix d'achat**.",
      },
      {
        type: 'filet',
        titre: "Les frais d'acquisition des participations : un texte qui se contredit",
        texte: "Le commentaire du compte 26 fixe la valeur d'entrée des titres de participation au « prix d'acquisition **majoré des frais accessoires d'achat** », et l'Application 48 du Guide incorpore la commission au coût du 261. Le chapitre 13 de l'AUDCIF (§ 2.1.2) écrit au contraire que les frais d'acquisition des titres de participation « sont enregistrés par nature », c'est-à-dire en charges [texte officiel]. Ce cours suit la solution majoritaire, celle du plan de comptes et du Guide : les frais sont incorporés au coût. Quelle que soit l'option retenue, elle doit être appliquée de façon permanente et décrite dans les Notes annexes. Les **coûts d'emprunt**, eux, sont toujours exclus du coût des titres et restent en charges, les titres n'étant pas des actifs éligibles.",
      },
      {
        type: 'carte',
        titre: "Application 48 : cinq acquisitions, commission de 1,5 %",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["5022", "", "05/06/N : 5 000 actions SICAV cotées à 12 000 (placement)", "60 000 000", ""],
            ["5026", "", "Frais d'acquisition des actions (1,5 %)", "900 000", ""],
            ["", "521", "Banques", "", "60 900 000"],
            ["261", "", "09/06/N : participation de 80 %, 2 500 actions à 16 000, frais inclus", "40 600 000", ""],
            ["", "521", "Banques", "", "40 600 000"],
            ["2741", "", "16/06/N : 1 500 obligations à 20 000 en gestion de portefeuille (TIAP), frais inclus", "30 450 000", ""],
            ["", "521", "Banques", "", "30 450 000"],
            ["5011", "", "24/06/N : bons du Trésor à court terme", "3 000 000", ""],
            ["5016", "", "Frais d'acquisition des titres du Trésor", "45 000", ""],
            ["", "521", "Banques", "", "3 045 000"],
            ["2748", "", "30/06/N : 1 000 actions cotées à 18 000 (2 % du capital), conservées durablement, frais inclus", "18 270 000", ""],
            ["", "521", "Banques", "", "18 270 000"],
          ],
        },
        note: "Le Guide passe la dernière acquisition au 2746 ; le plan de comptes réserve ce compte aux actions propres, d'où le 2748 retenu ici (voir section 7.3). Le Guide range la SICAV au 5022 Actions cotées ; une part de SICAV est une action de société d'investissement à capital variable.",
      },
      { type: 'controle', question: QCM[8] },
      {
        type: 'paragraphe',
        texte: "Un exemple montre le traitement des droits préférentiels de souscription. Une société émet des actions nouvelles à 12 000, à raison d'une action nouvelle pour trois anciennes. Un investisseur qui ne possède aucune action ancienne achète en bourse 300 droits à 1 500 pour souscrire 100 actions nouvelles. Il paie 300 × 1 500 = 450 000 pour les droits et 100 × 12 000 = 1 200 000 pour la souscription, soit 1 650 000 au total, à quoi s'ajoutent les frais. Si les titres sont des placements, le coût des actions est de 1 650 000 (16 500 par action), et les frais vont au 5026. Chez l'ancien actionnaire qui a vendu ses droits, le produit de la vente vient au contraire diminuer le coût de ses anciennes actions ou constitue un gain, selon la méthode que l'entité retient et applique de façon permanente.",
      },
      { type: 'controle', question: QCM[9] },
      {
        type: 'paragraphe',
        texte: "Deux situations particulières reviennent souvent. La première est l'**achat de droits**. Lors d'une augmentation de capital en numéraire (chapitre 4), un nouvel investisseur doit acheter aux anciens actionnaires assez de **droits préférentiels de souscription** pour souscrire des actions nouvelles. Lors d'une incorporation de réserves, ce sont des **droits d'attribution** qu'il achète pour recevoir des actions gratuites. Le coût de ces droits est **ajouté au prix d'acquisition** des actions obtenues (AUDCIF, ch. 13, § 2.4.2). La seconde est l'**achat d'une obligation cotée entre deux échéances**. Le prix payé comprend le capital et les **intérêts courus** depuis le dernier coupon, que l'acheteur rembourse au vendeur. Ces intérêts courus sont isolés : 5063 pour une obligation de placement, et, selon l'AUDCIF, 2768 pour une obligation immobilisée (le plan de comptes offre aussi le 2764 Intérêts courus sur titres immobilisés). Le compte d'obligations (503 ou 2745) ne reçoit que le coût du capital.",
      },
      {
        type: 'carte',
        titre: "Exemple : achat d'une obligation cotée avec coupon couru",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["503", "", "01/10/N : 1 000 obligations d'État de placement, cours pied de coupon 9 800", "9 800 000", ""],
            ["5063", "", "Intérêts courus sur obligations : 1 000 × 10 000 × 8 % × 9/12", "600 000", ""],
            ["", "521", "Banques", "", "10 400 000"],
            ["521", "", "31/12/N : encaissement du coupon annuel", "800 000", ""],
            ["", "5063", "Intérêts courus sur obligations (rachetés au vendeur)", "", "600 000"],
            ["", "7745", "Revenus des obligations (trois mois de détention)", "", "200 000"],
          ],
        },
        note: "Montants pédagogiques : coupon annuel de 8 % payable le 31/12 sur un nominal de 10 000. Des obligations d'État ont été choisies parce que leurs intérêts sont exonérés de la retenue à la source (loi n° 23/053, art. 80) : le coupon est encaissé brut. Sans l'isolement des 600 000 d'intérêts courus, le coût du titre serait surévalué et le produit de l'exercice aussi.",
      },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[11] },
    ],
  },
  {
    numero: '7.5',
    titre: "Les titres souscrits mais non libérés",
    navLabel: "Titres non libérés",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Au chapitre 1, la société émettrice suivait la fraction non appelée de son capital au compte 109 et la fraction appelée non versée au 4613. Ce chapitre montre l'autre face. Le **souscripteur** qui ne libère qu'une partie de ses actions lors d'une constitution ou d'une augmentation de capital en numéraire inscrit néanmoins les titres à l'actif pour leur **coût d'acquisition total**. La partie non versée devient une **dette** envers l'émetteur. Il ne s'agit pas d'une dette fournisseur ordinaire, et le plan de comptes lui donne des comptes spécifiques selon la catégorie de titres.",
      },
      {
        type: 'carte',
        titre: "Quel compte pour la dette de libération ?",
        tableau: {
          entetes: ["Titres souscrits", "Dette de libération (plan de comptes)", "À l'appel des fonds (AUDCIF)"],
          lignes: [
            ["Titres de participation (26)", "4813 Versements restant à effectuer sur titres de participation et titres immobilisés non libérés", "4813 viré au 484 Autres dettes HAO"],
            ["Titres immobilisés (274)", "4813 (même compte)", "4813 viré au 484"],
            ["Titres de placement (50)", "4726 Versements restant à effectuer sur titres de placement non libérés", "Débit du 472 par le crédit du 4712 Créditeurs divers"],
          ],
        },
        note: "La dette de libération sur titres immobilisés est une dette HAO, parce qu'elle naît d'une opération d'investissement. Elle est mentionnée distinctement dans les Notes annexes. Au tableau des flux, la trésorerie de début d'exercice est corrigée de la variation du 472 (versements restant à effectuer sur titres de placement).",
      },
      {
        type: 'carte',
        titre: "Application 49 : 20 000 actions (nominal 10 000, prime 2 000) libérées de moitié, frais 1 000 000",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["2748", "", "01/05/N : titres immobilisés, 20 000 × 12 000 + 1 000 000", "241 000 000", ""],
            ["", "4813", "Versements restant à effectuer sur titres non libérés : 20 000 × 5 000", "", "100 000 000"],
            ["", "521", "Banques : 20 000 × 7 000 + 1 000 000", "", "141 000 000"],
            ["4813", "", "08/11/N : libération de la seconde moitié", "100 000 000", ""],
            ["", "521", "Banques", "", "100 000 000"],
          ],
        },
        note: "[texte officiel] Le Guide passe cette opération au 2746 et au 472. Le plan de comptes réserve le 2746 aux actions propres et le 4726 (sous-compte du 472) aux titres de placement : pour des titres immobilisés, les comptes cohérents sont le 2748 et le 4813. Les montants sont ceux du Guide. La prime d'émission est intégralement versée à la souscription, comme l'exige le droit des sociétés (chapitre 4) : seule la moitié du nominal reste due.",
      },
      { type: 'controle', question: QCM[12] },
      {
        type: 'paragraphe',
        texte: "Pourquoi inscrire les titres pour leur coût total alors que la moitié n'est pas payée ? Parce que le souscripteur est **propriétaire** de toutes les actions souscrites dès la souscription, avec les droits qui s'y attachent (vote, dividende), et qu'il est **engagé** à verser le solde à première demande. L'actif et la dette naissent ensemble. Si la société émettrice se révèle en difficulté avant l'appel du solde, le souscripteur ne peut pas se soustraire à son engagement : il doit apprécier la valeur actuelle de ses titres **pour leur coût total** et, le cas échéant, déprécier en tenant compte de ce qu'il devra encore verser. L'auditeur du souscripteur rapproche d'ailleurs la dette de libération de la situation de l'émetteur, telle qu'elle ressort de ses comptes 109 et 4613.",
      },
      {
        type: 'paragraphe',
        texte: "Que se passe-t-il si le souscripteur ne verse pas le solde appelé ? Du côté de l'émetteur, le chapitre 2 a montré la procédure contre l'actionnaire défaillant : mise en demeure, vente des actions, et poursuites pour la différence. Du côté du souscripteur, le risque est double. Il peut perdre des titres qu'il a déjà en partie payés, pour un prix de vente peut-être inférieur à ce qu'il a versé, et rester débiteur de la différence. Tant que la situation n'est pas réglée, il doit aussi apprécier la valeur actuelle de ses titres en tenant compte de ce risque, et constater une dépréciation si nécessaire. Dans les Notes annexes, la dette de libération est présentée distinctement, avec l'échéance probable de l'appel quand elle est connue, pour que le lecteur mesure l'engagement de trésorerie qui reste à honorer.",
      },
      {
        type: 'filet',
        titre: "Erreur fréquente",
        texte: "N'inscrire à l'actif que la partie versée des titres souscrits. KAH a souscrit 4 500 actions de TSHOPO HUILERIE pour un coût total de 113 625 000 FC, frais compris, mais n'en a versé que 46 125 000 FC à la souscription. Le compte 261 doit recevoir le coût total, et la partie non versée (67 500 000 FC) devient une dette au 4813. Réduire l'actif à la partie payée masquerait à la fois la participation réelle de KAH et son engagement de verser le solde à la première demande de TSHOPO.",
      },
      { type: 'controle', question: QCM[13] },
    ],
  },
  {
    numero: '7.6',
    titre: "Les revenus du portefeuille : dividendes et intérêts",
    navLabel: "Revenus",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Un portefeuille-titres produit deux sortes de revenus : les **dividendes** des actions et parts sociales, et les **intérêts** des obligations. Leur comptabilisation obéit à deux faits générateurs différents. Pour le dividende, c'est la **décision de distribution** prise par l'assemblée des associés de la société émettrice (AUDCIF, ch. 13, § 2.5.1). Avant cette décision, le détenteur n'a aucun droit acquis, même si la filiale a réalisé des bénéfices ; après elle, il a une créance, même si le paiement intervient plus tard. Pour l'obligation, c'est l'écoulement du temps : les intérêts courent jour après jour, et ceux de l'exercice doivent être rattachés à la clôture, même s'ils ne sont encaissés qu'à l'échéance suivante.",
      },
      {
        type: 'carte',
        titre: "Les comptes de produits selon la catégorie de titres",
        tableau: {
          entetes: ["Titres", "Créance", "Produit"],
          lignes: [
            ["Titres de participation (26)", "4711 Débiteurs divers", "7721 Revenus des titres de participation"],
            ["Titres immobilisés (274)", "4711 Débiteurs divers", "7722 Revenus autres titres immobilisés"],
            ["Titres de placement (50), actions", "4711 Débiteurs divers", "7746 Revenus des titres de placement"],
            ["Obligations", "Intérêts courus : 5063 (placement) ou 2764 / 2768 (immobilisées)", "7745 Revenus des obligations"],
          ],
        },
        note: "[texte officiel] Le chapitre 13 de l'AUDCIF écrit « compte 47 » pour les dividendes des participations et « 4711 » pour les autres titres, et il crédite un compte 7747 que le plan de comptes ne contient pas. Le plan range les revenus des titres de participation et des autres titres immobilisés sous le 772 (7721 et 7722). Ce cours suit le plan de comptes.",
      },
      { type: 'controle', question: QCM[14] },
      {
        type: 'paragraphe',
        texte: "En RDC, la société qui distribue opère une **retenue à la source de 20 %** sur les produits d'actions et de parts sociales (loi n° 23/053, art. 72 et 120), comme on l'a vu au chapitre 3 du côté de la distribuante. Le détenteur encaisse donc le dividende net, mais le **produit** qu'il comptabilise est le dividende **brut** décidé par l'assemblée : la retenue est un impôt prélevé sur ce revenu. Supposons que la filiale KASAI BOIS SA décide un dividende de 10 000 000 revenant à sa mère. La mère constate une créance et un produit de 10 000 000 au 7721. À l'encaissement, elle reçoit 8 000 000, et la retenue de 2 000 000 est traitée selon le régime fiscal applicable. Si ses conditions sont remplies, le **régime mère-fille** de l'article 76 permet d'imputer l'impôt payé sur les produits distribués sur celui dont la société mère est redevable.",
      },
      {
        type: 'carte',
        titre: "Le régime mère-fille congolais (loi n° 23/053, art. 76)",
        liste: [
          "Une **société par actions ou une SARL** détient des titres d'une autre société.",
          "Participation d'au moins **25 %** du capital de la filiale (paramètres 2026).",
          "**Sièges sociaux en RDC** pour la mère et la filiale.",
          "L'impôt supporté par la filiale doit être égal à celui qu'elle aurait supporté dans l'État d'imposition de la mère.",
          "**Conservation des titres sous forme nominative** pendant au moins **deux années consécutives**. La rupture de cet engagement entraîne l'imposition des revenus indûment exonérés.",
        ],
        note: "Le seuil fiscal de 25 % ne coïncide ni avec le seuil de participation de l'AUSCGIE (10 %, art. 176) ni avec la définition de la société mère (plus de la moitié du capital, art. 179). Une même participation peut donc être une « participation » au sens comptable sans ouvrir droit au régime fiscal.",
      },
      {
        type: 'paragraphe',
        texte: "Pour les obligations immobilisées, le rattachement des intérêts à la clôture se fait comme pour l'émetteur au chapitre 6, mais en sens inverse. Une société détient 2 000 obligations de 10 000 au taux de 9 %, coupon annuel payable le 30 juin. Au 31 décembre, six mois ont couru : 2 000 × 10 000 × 9 % × 6/12 = 900 000. Écriture : débit 2764 Intérêts courus sur titres immobilisés / crédit 7745 Revenus des obligations, 900 000. L'écriture est contrepassée à l'ouverture, et le coupon entier est comptabilisé en produit à son encaissement du 30 juin. Si les obligations sont des placements, le compte d'intérêts courus est le 5063. Si la retenue à la source s'applique à ces intérêts, le produit reste le montant brut ; les obligations de l'État, des Provinces et des ETD en sont exonérées (loi n° 23/053, art. 80).",
      },
      { type: 'controle', question: QCM[15] },
      {
        type: 'filet',
        titre: "Question d'étudiant : produit de 6 000 000 ou de 4 800 000 ?",
        texte: "LUALABA TRANSPORT a décidé un dividende de 6 000 000 FC revenant à KAH. La société distributrice retient 20 % à la source, si bien que KAH n'encaisse que 4 800 000 FC. Le produit inscrit au 7721, lui, reste le montant brut de 6 000 000 FC : la retenue est un impôt prélevé sur ce revenu, et non une réduction du revenu. Comme KAH détient 25 % de LUALABA TRANSPORT sous forme nominative depuis plus de deux ans, avec deux sièges en RDC, le régime mère-fille de l'article 76 peut lui permettre d'imputer cet impôt sur le sien.",
      },
      { type: 'controle', question: QCM[16] },
      {
        type: 'paragraphe',
        texte: "Les **dividendes versés en actions** méritent une remarque. Si l'assemblée de la filiale propose le paiement du dividende en actions (chapitre 3), l'associé qui choisit cette option ne reçoit pas de trésorerie. Il comptabilise le dividende en produit et augmente d'autant le coût de ses titres. Le tableau des flux n'en retient aucun encaissement. À l'inverse, l'**attribution gratuite d'actions** par incorporation de réserves (chapitre 4) ne crée pas de produit chez le détenteur : il possède plus de titres pour le même coût global, et son coût unitaire baisse en conséquence. Ce coût unitaire compte pour le calcul des sorties en PEPS ou au coût moyen pondéré.",
      },
    ],
  },
  {
    numero: '7.7',
    titre: "L'évaluation à l'inventaire et les dépréciations",
    navLabel: "Inventaire",
    blocs: [
      {
        type: 'paragraphe',
        texte: "À chaque clôture, l'entité recense ses biens et les évalue à leur **valeur actuelle**, valeur d'estimation du moment appréciée en fonction du marché et de l'utilité de l'élément pour l'entité (art. 42 AUDCIF). Cette valeur d'inventaire est comparée à la valeur d'entrée. Si elle est **supérieure**, la valeur d'entrée est maintenue. Si elle est **inférieure**, la perte est constatée par une dépréciation (art. 43). Pour les titres, le principe est donc asymétrique : les moins-values latentes sont constatées, les plus-values latentes ne le sont jamais. Les dépréciations sont obligatoires même en l'absence ou en cas d'insuffisance de bénéfice (art. 46).",
      },
      {
        type: 'carte',
        titre: "Quelle valeur actuelle selon la catégorie de titres ?",
        tableau: {
          entetes: ["Titres", "Valeur actuelle retenue", "Dépréciation"],
          lignes: [
            ["Titres de participation", "Valeur d'utilité pour l'entité : rentabilité et perspectives, cours de bourse, actif net, réalisation possible, conjoncture, liens stratégiques (ch. 13, § 3.1)", "Débit 6972 / crédit 296x"],
            ["Titres immobilisés cotés", "Cours moyen du dernier mois avant la clôture", "Débit 6972 / crédit 2974"],
            ["Titres immobilisés non cotés", "Valeur probable de négociation", "Débit 6972 / crédit 2974"],
            ["Titres de placement cotés", "Cours moyen du dernier mois avant la clôture", "Débit 6795 / crédit 590"],
            ["Titres de placement non cotés", "Valeur probable de négociation", "Débit 6795 / crédit 590"],
          ],
        },
        note: "Le cours moyen du dernier mois évite de retenir une variation journalière peu caractéristique. Les dépréciations se calculent ligne par ligne, **sans compensation** entre titres en baisse et titres en hausse. Les dotations sur immobilisations financières sont des charges financières (rubrique RN) ; les charges pour dépréciation des titres de placement (6795) relèvent aussi du résultat financier.",
      },
      { type: 'controle', question: QCM[17] },
      {
        type: 'paragraphe',
        texte: "Prenons une participation de 70 % dans UVIRA SUCRE SA, acquise pour 60 000 000. À la clôture, les capitaux propres de la filiale s'élèvent à 80 000 000 : la quote-part d'actif net de la mère est de 56 000 000. Faut-il déprécier de 4 000 000 ? Pas forcément. Si le prix payé intégrait un savoir-faire, une clientèle ou des perspectives de résultats qui restent crédibles, la valeur d'utilité peut dépasser la quote-part d'actif net. L'entité peut par exemple actualiser les dividendes attendus, ou apprécier la rentabilité prévisionnelle. Si en revanche la filiale accumule les pertes sans plan de redressement crédible, la quote-part d'actif net, voire une valeur de liquidation, devient la référence. L'AUDCIF cite d'ailleurs la « réalisation possible » parmi les éléments de la valeur actuelle. La conclusion doit être documentée et reprise chaque année.",
      },
      { type: 'controle', question: QCM[18] },
      {
        type: 'paragraphe',
        texte: "La valeur d'utilité d'une participation est affaire de jugement. Une filiale qui perd de l'argent peut rester précieuse si elle assure l'approvisionnement du groupe ou lui ouvre un marché. À l'inverse, une filiale bénéficiaire peut valoir moins que son coût si le prix payé intégrait des espoirs déçus. L'entité doit documenter son estimation : prévisions de résultats, quote-part d'actif net, comparaison avec des transactions récentes. Le commissaire aux comptes vérifie la cohérence de ces hypothèses. Une dépréciation antérieure est **ajustée** chaque année : complétée si la valeur baisse encore, reprise en tout ou partie si elle remonte (7972 pour les immobilisations financières, 7795 pour les titres de placement), sans jamais porter les titres au-dessus de leur coût d'entrée.",
      },
      {
        type: 'carte',
        titre: "Application 51 : dépréciation au 31/12/N−1",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["6795", "", "31/12/N−1 : charges pour dépréciations sur titres de placement", "175 000", ""],
            ["", "590", "Dépréciations des titres de placement", "", "175 000"],
          ],
        },
        note: "1 500 titres détenus : valeur d'entrée 1 000 × 12 000 + 500 × 12 500 = 18 250 000 ; valeur au cours moyen de décembre (12 050) = 18 075 000 ; dépréciation 175 000. Le Guide ne montre pas la reprise de cette dépréciation lors de la cession de N ; selon l'AUDCIF (ch. 13, § 4.2), elle est reprise au crédit du 7795.",
      },
      { type: 'controle', question: QCM[19] },
      {
        type: 'paragraphe',
        texte: "La dépréciation des titres de placement se calcule à chaque clôture sur la situation du moment. Supposons qu'un portefeuille déprécié de 175 000 au 31/12/N−1 soit encore détenu au 31/12/N, avec une moins-value latente ramenée à 60 000. La dépréciation nécessaire n'est plus que de 60 000 : l'entité reprend 115 000 par le débit du 590 et le crédit du 7795. Si la moins-value s'est au contraire creusée à 300 000, elle complète la dépréciation de 125 000 par le débit du 6795. L'ajustement se fait **titre par titre** : une ligne dont la perte se résorbe ne peut pas absorber la perte nouvelle d'une autre ligne. Cette mécanique vaut aussi pour les titres immobilisés et les participations, avec les comptes 6972, 296 ou 297 et 7972.",
      },
      { type: 'controle', question: QCM[20] },
      {
        type: 'filet',
        titre: "Deux cas sans dépréciation (ch. 13, § 3.3)",
        texte: "Aucune dépréciation n'est constatée en cas de baisse du cours pour les titres qui font l'objet d'**opérations de couverture**, puisque la perte est compensée par le gain sur l'instrument de couverture, ni pour les **actions ou parts propres destinées à être attribuées gratuitement** aux salariés et dirigeants, dont le coût sera constaté lors de l'attribution. Hors de ces deux cas, la règle de non-compensation s'applique sans exception.",
      },
      {
        type: 'paragraphe',
        texte: "Les titres ne s'amortissent pas. L'article 43 de l'AUDCIF distingue l'amortissement, qui constate une perte de valeur jugée définitive, et la dépréciation, qui constate une perte jugée non définitive. Un titre n'est pas consommé par l'usage : sa valeur peut baisser puis remonter avec la santé de l'émetteur ou le marché. C'est pourquoi l'amoindrissement de valeur d'un titre passe toujours par une dépréciation, réversible, et jamais par un amortissement. Même quand l'émetteur est en liquidation, la dépréciation peut aller jusqu'à 100 % du coût. Les titres ne sortent du bilan qu'à la clôture de la liquidation ou lors de leur cession, par le circuit de la section 7.8.",
      },
      { type: 'controle', question: QCM[21] },
    ],
  },
  {
    numero: '7.8',
    titre: "Les cessions : circuit HAO ou résultat financier",
    navLabel: "Cessions",
    blocs: [
      {
        type: 'paragraphe',
        texte: "La sortie d'un titre obéit à deux règles communes. La **valeur comptable sortie** est le coût d'acquisition, **non diminué** de la dépréciation éventuelle, qui est reprise séparément. Le **prix de cession** est le prix stipulé dans l'acte, **diminué des frais de cession** strictement nécessaires (commissions, courtages). Pour le reste, tout dépend de la catégorie. La cession d'un titre de participation ou d'un titre immobilisé est la sortie d'une **immobilisation** : c'est une opération **hors activités ordinaires**, qui passe par les comptes 81 et 82. La cession d'un titre de placement est une opération **financière ordinaire**, qui passe par le 777 ou le 6771 (AUDCIF, ch. 13, section 4).",
      },
      {
        type: 'carte',
        titre: "Application 50 : valeur d'origine 50 000 000, dépréciation 6 000 000, prix 48 000 000 à crédit",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["816", "", "15/08/N : valeurs comptables des cessions d'immobilisations financières", "50 000 000", ""],
            ["", "274", "Titres immobilisés", "", "50 000 000"],
            ["485", "", "Créances sur cessions d'immobilisations (4856 dans le Guide)", "48 000 000", ""],
            ["", "826", "Produits des cessions d'immobilisations financières", "", "48 000 000"],
            ["2974", "", "Dépréciations des titres immobilisés", "6 000 000", ""],
            ["", "7972", "Reprises de dépréciations des immobilisations financières", "", "6 000 000"],
          ],
        },
        note: "[texte officiel] L'Application 50 est intitulée « cession de titres de participation », mais elle solde le 274 et le 2974 (titres immobilisés). Pour une participation, on créditerait le 26 et on reprendrait le 296. Le Guide débite par ailleurs un compte 4856 que le plan de comptes ne contient pas : le compte générique est le 485 Créances sur cessions d'immobilisations. Incidence : −2 000 000 en HAO (826 − 816) et +6 000 000 en financier, soit +4 000 000.",
      },
      { type: 'controle', question: QCM[22] },
      {
        type: 'paragraphe',
        texte: "La cession peut être **partielle**. Une société qui détient 70 % d'une filiale au 261 en cède 30 % : elle passe à 40 %. Deux questions se posent. D'abord, quelle valeur sortir ? Si les titres ont été achetés en plusieurs fois à des prix différents, le chapitre 13 admet ici aussi le PEPS ou le coût moyen pondéré. Ensuite, dans quel compte laisser les titres restants ? Avec 40 %, la société peut encore exercer un contrôle exclusif présumé si aucun autre associé ne détient davantage. Sinon, elle exerce au moins une influence notable. Les titres restants sont alors virés du 261 au 263, et la dépréciation éventuelle du 2961 au 2963. Si la cession ramène la participation sous 10 % et que la société n'entend plus exercer d'influence, les titres restants peuvent devenir des titres immobilisés (2748), voire des placements (50) si elle compte les revendre rapidement.",
      },
      { type: 'controle', question: QCM[23] },
      {
        type: 'paragraphe',
        texte: "Pourquoi ne pas simplement créditer le compte de titres et constater la différence ? Parce que la présentation brute (valeur sortie en 81, prix en 82) alimente les rubriques RO et TN du compte de résultat, et que le lecteur doit voir le volume des cessions et non seulement leur solde. La reprise de la dépréciation, elle, passe par le résultat financier (TL). Une même cession produit donc deux effets dans deux soldes différents : une moins-value HAO et une reprise financière, qui se compensent en partie. L'analyste qui ne lit que le résultat HAO croit à une perte, alors que l'essentiel de celle-ci avait été constaté les années précédentes par les dotations.",
      },
      {
        type: 'filet',
        titre: "Le regard de l'auditeur",
        texte: "Si KAH cède un jour sa participation dans TSHOPO HUILERIE, l'auditeur vérifiera que la cession a été traitée comme une opération hors activités ordinaires : valeur d'entrée au débit du 816, prix au crédit du 826, et reprise séparée de la dépréciation éventuelle au 7972. Une écriture nette, qui ne ferait apparaître que la plus-value ou la moins-value, fausserait les rubriques RO et TN du compte de résultat. Il vérifiera aussi que le prix de cession est bien diminué des frais strictement nécessaires.",
      },
      { type: 'controle', question: QCM[24] },
      {
        type: 'paragraphe',
        texte: "Pour les titres de placement, les achats successifs d'un même titre se font à des prix différents, et il faut choisir quels titres sortent. Le chapitre 13 de l'AUDCIF admet au choix le **premier entré, premier sorti** (PEPS) ou le **coût moyen pondéré** (CUMP), par analogie avec l'article 44 applicable aux stocks. Le commentaire du compte 50 ne mentionne que le PEPS [texte officiel]. L'Application 51 montre que le choix n'est pas neutre. Sur un portefeuille de 3 000 titres, acquis 1 000 à 12 000, 500 à 12 500, 1 200 à 11 000 et 300 à 10 000, la cession de 2 500 titres pour 29 000 000 donne une perte de 250 000 en PEPS et un gain de 291 667 au coût moyen pondéré.",
      },
      {
        type: 'carte',
        titre: "Application 51 : cession de 2 500 titres le 01/09/N, prix 29 000 000 à crédit",
        tableau: {
          entetes: ["Méthode", "Valeur de sortie", "Résultat", "Écriture", "Portefeuille restant"],
          lignes: [
            ["PEPS", "1 000 × 12 000 + 500 × 12 500 + 1 000 × 11 000 = 29 250 000", "Perte de 250 000", "Débit 4721 29 000 000 et 6771 250 000 / crédit 50 29 250 000", "200 × 11 000 + 300 × 10 000 = 5 200 000"],
            ["CUMP (34 450 000 / 3 000 = 11 483,33)", "2 500 × 11 483,33 = 28 708 333", "Gain de 291 667", "Débit 4721 29 000 000 / crédit 50 28 708 333 et 777 291 667", "500 × 11 483,33 = 5 741 667"],
          ],
        },
        note: "Le total « résultat + portefeuille restant » est identique dans les deux méthodes : le choix déplace du résultat d'un exercice à l'autre, d'où l'exigence de permanence des méthodes. La créance sur cession va au 4721 (le chapitre 13 cite un 4714, absent du plan de comptes révisé). La dépréciation de 175 000 constituée en N−1 sur les titres cédés est reprise par le 7795.",
      },
      { type: 'controle', question: QCM[25] },
      {
        type: 'paragraphe',
        texte: "La cession d'une participation soulève souvent des questions juridiques préalables que le comptable doit connaître. Les statuts peuvent soumettre la cession à un **agrément** ou à un **droit de préemption** des autres associés. Dans une SARL, à défaut de clause statutaire, la cession de parts à des tiers exige le consentement de la majorité des associés non cédants représentant les trois quarts des parts, déduction faite de celles du cédant. En cas de refus, les autres associés doivent acquérir les parts dans les trois mois, à un prix fixé à défaut d'accord par un expert nommé par la juridiction compétente (art. 319). La cession n'est opposable à la société qu'après signification, acceptation authentique ou dépôt de l'acte au siège (art. 317). Le comptable ne peut constater la cession qu'au **transfert de propriété**, c'est-à-dire lorsque les conditions suspensives (agrément, autorisations réglementaires) sont levées. Entre la signature d'une promesse et le transfert, les titres restent à l'actif, et un prix convenu inférieur au coût peut déjà justifier une dépréciation à la clôture.",
      },
      { type: 'controle', question: QCM[26] },
    ],
  },
  {
    numero: '7.9',
    titre: "Évaluer des droits sociaux : de la valeur nominale à l'expertise",
    navLabel: "Évaluation des titres",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Combien vaut une action ou une part sociale non cotée ? La question se pose à chaque cession de gré à gré, à chaque refus d'agrément suivi d'un rachat, à chaque exclusion ou retrait d'un associé, à chaque succession. L'Acte uniforme y répond d'abord par une règle de **procédure**. Dans tous les cas où il prévoit la cession des titres d'un associé ou leur rachat par la société, la valeur des droits est déterminée, à défaut d'accord amiable, **par expert**, désigné par les parties ou, à défaut d'accord entre elles, par la juridiction compétente **statuant à bref délai** (art. 59). L'Acte uniforme ne fixe **aucune méthode** : celles que l'expert mobilise relèvent de la pratique financière.",
      },
      {
        type: 'carte',
        titre: "Les valeurs de la pratique",
        tableau: {
          entetes: ["Valeur", "Formule", "Ce qu'elle mesure"],
          lignes: [
            ["Valeur nominale", "Capital / nombre de titres", "Une référence juridique (art. 56), sans lien avec la valeur économique"],
            ["Valeur mathématique comptable", "Capitaux propres / nombre de titres", "Le patrimoine tel que le bilan le montre"],
            ["Valeur mathématique intrinsèque", "Actif net corrigé des plus et moins-values latentes / nombre de titres", "Le patrimoine en valeurs réelles (avant impôt latent éventuel)"],
            ["Valeur financière", "Dividende par titre / taux de capitalisation", "Ce que le titre rapporte à son porteur"],
            ["Valeur de rendement", "Bénéfice par titre / taux de capitalisation", "La capacité bénéficiaire, distribuée ou non"],
            ["Valeur de marché", "Cours de bourse ou prix de transactions comparables", "Ce que des acheteurs paient effectivement"],
          ],
        },
        note: "Ces formules sont des conventions de la pratique : l'expert combine souvent une valeur patrimoniale et une valeur de flux, avec des pondérations qui dépendent de la nature de la société (patrimoniale ou d'exploitation) et de l'objet de l'évaluation.",
      },
      {
        type: 'paragraphe',
        texte: "L'expert ne s'arrête pas toujours aux formules du tableau. Pour une société d'exploitation, il actualise souvent les **flux de trésorerie futurs** qu'elle dégagera, ou il applique aux résultats un multiple observé sur des transactions comparables. Pour une société patrimoniale (holding, société immobilière), l'**actif net réévalué** domine. Deux corrections reviennent souvent. La première est la **fiscalité latente** : une plus-value sur un terrain ne vaut pas son montant brut si sa réalisation doit supporter l'impôt. La seconde est la **décote de minorité** ou la **prime de contrôle** : un bloc de 15 % sans pouvoir ne vaut pas 15 % d'une société achetée en totalité. L'expert désigné en application de l'article 59 doit expliquer ses choix, car les parties peuvent les contester.",
      },
      { type: 'controle', question: QCM[27] },
      {
        type: 'paragraphe',
        texte: "Prenons une SARL au capital de 100 000 000 divisé en 10 000 parts, avec 46 000 000 de réserves et un report à nouveau créditeur de 4 000 000. La valeur mathématique comptable est de 150 000 000 / 10 000 = **15 000** par part, contre un nominal de 10 000. Si un terrain inscrit pour 20 000 000 vaut 35 000 000, l'actif net corrigé passe à 165 000 000, soit une valeur intrinsèque de **16 500**. Si la société distribue 900 par part et gagne 1 500 par part, avec un taux de capitalisation de 10 %, la valeur financière est de **9 000** et la valeur de rendement de **15 000**. L'écart entre 9 000 et 16 500 n'a rien d'anormal : il montre qu'un associé minoritaire, qui ne touche que les dividendes, ne valorise pas la société comme un acquéreur qui en prendrait le contrôle. C'est précisément ce débat que tranche l'expert de l'article 59.",
      },
      { type: 'controle', question: QCM[28] },
      {
        type: 'filet',
        titre: "Évaluer pour l'inventaire ou évaluer pour une cession",
        texte: "Les mêmes méthodes servent à l'inventaire d'une participation (section 7.7), mais la question n'est pas la même. À l'inventaire, l'entité se demande ce que vaut **pour elle** la participation qu'elle garde : valeur d'utilité. Lors d'une cession, les parties cherchent un **prix** entre un vendeur et un acheteur : valeur de marché ou valeur négociée. Une participation peut ainsi être maintenue à son coût dans les comptes de la mère, parce qu'elle garde une forte utilité stratégique, alors qu'un tiers n'en offrirait pas ce montant.",
      },
    ],
  },
  {
    numero: '7.10',
    titre: "Fiscalité, présentation et contexte congolais",
    navLabel: "Fiscalité et présentation",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Sur le plan fiscal, le bénéfice imposable à l'IS est déterminé d'après le résultat de l'ensemble des activités de l'entreprise, **cessions d'éléments d'actif comprises** (loi n° 23/053, art. 9). Les plus-values de cession de titres, qu'elles soient HAO ou financières, entrent donc dans la base de l'IS. Une exonération particulière vise les plus-values résultant de l'attribution d'actions ou de parts à la suite d'une fusion de SA, SAS ou SARL, ou d'un apport partiel d'actif (art. 54, chapitre 8). Pour les dépréciations, l'article 50 exclut des charges déductibles les **provisions**, sauf quatre exceptions qui ne visent pas les portefeuilles-titres des sociétés commerciales ordinaires : reconstitution de gisements miniers, créances des établissements de crédit et de microfinance, engagements réglementés des assurances. La déductibilité d'une dépréciation de titres doit donc être examinée avec prudence, et la dotation réintégrée si elle tombe sous cette exclusion.",
      },
      {
        type: 'carte',
        titre: "Où retrouver le portefeuille dans les états financiers",
        tableau: {
          entetes: ["État", "Rubrique", "Contenu"],
          lignes: [
            ["Bilan, actif immobilisé", "AR Titres de participation", "Compte 26, net du 296"],
            ["Bilan, actif immobilisé", "AS Autres immobilisations financières", "Compte 27 (dont 274), net du 297"],
            ["Bilan, trésorerie-actif", "BQ Titres de placement", "Compte 50, net du 590"],
            ["Compte de résultat", "TK Revenus financiers et assimilés", "772 dividendes des participations et titres immobilisés, 7745 et 7746, 777 gains de cession de placements"],
            ["Compte de résultat", "RM / RN Frais financiers, dotations financières", "6771 pertes de cession de placements, 6795, 6972"],
            ["Compte de résultat", "TL Reprises financières", "7972, 7795"],
            ["Compte de résultat", "TN / RO Cessions d'immobilisations (HAO)", "826 prix, 816 valeur sortie"],
            ["Notes annexes", "Note 4 Immobilisations financières ; Note 9 Titres de placement", "Détail, dépréciations, échéancier ; dette de libération (4813) mentionnée distinctement"],
          ],
        },
        note: "Au tableau des flux, l'achat et la cession de titres de participation ou immobilisés sont des flux d'investissement, l'encaissement étant corrigé des créances sur cessions (485). Les titres de placement faisant partie de la trésorerie-actif, leurs achats et ventes ne sont pas des flux d'investissement.",
      },
      {
        type: 'paragraphe',
        texte: "Au tableau des flux, une acquisition de titres non entièrement libérés illustre la logique des flux réels. Reprenons le cas de TSHOPO HUILERIE : titres inscrits au 261 pour 113 625 000, dont 46 125 000 payés à la souscription et 22 500 000 au second quart. Le décaissement lié à l'investissement de l'exercice est de 68 625 000, et non de 113 625 000 : la dette de libération qui reste au 4813 (45 000 000) n'a encore donné lieu à aucun flux. Les versements des quarts suivants seront des décaissements d'investissement des exercices où ils interviendront. De la même manière, une cession à crédit (485) ne produit un encaissement que lors du règlement. Et la reprise d'une dépréciation, écriture purement comptable, n'apparaît jamais dans les flux.",
      },
      {
        type: 'paragraphe',
        texte: "Retour à KINSHASA AGRO HOLDING, dont le cas 5 détaille les écritures. En une seule année, KAH a mobilisé presque tout ce chapitre. La participation dans TSHOPO HUILERIE va au 261, avec une dette de libération au 4813 : KAH en détient 45 % et aucun autre associé ne la dépasse. La participation croisée dans MATADI CIMENT tombe sous le coup de l'article 177. Enfin, le dividende de LUALABA TRANSPORT est constaté au brut, dans le cadre du régime mère-fille. À la clôture, KAH évaluera chaque participation à sa valeur d'utilité, ligne par ligne, et dépréciera sans compenser les plus-values des unes avec les moins-values des autres.",
      },
      { type: 'controle', question: QCM[29] },
      {
        type: 'paragraphe',
        texte: "Le contexte congolais donne à ce chapitre une portée pratique particulière. Faute de bourse des valeurs en activité, la plupart des titres détenus par les sociétés congolaises sont **non cotés**. Leur valeur d'inventaire est donc la **valeur probable de négociation**, et leur évaluation repose sur les méthodes de la section 7.9 plutôt que sur un cours. La loi relative aux marchés boursiers, promulguée le 20 août 2026 et publiée au Journal officiel le 2 septembre 2026, prépare l'ouverture de la **Kinshasa Stock Exchange**, dont les premières cotations sont annoncées entre juin et décembre 2027 (RFI, 6 septembre 2026 ; voir le chapitre 6). Lorsque des titres congolais seront cotés, le **cours moyen du dernier mois** deviendra la référence d'inventaire pour les titres immobilisés et de placement cotés, avec la volatilité qu'un marché naissant et peu liquide peut comporter. Pour les participations, la valeur d'utilité restera la règle, et un cours de bourse ne sera qu'un indice parmi d'autres.",
      },
      {
        type: 'filet',
        titre: "Les contrôles de l'auditeur sur un portefeuille-titres",
        texte: "Existence et propriété (relevés du dépositaire ou registre des titres de l'émetteur), classement conforme à l'intention (avec les présomptions de 10 %, 20 % et 40 % ou plus de la moitié), coût d'entrée (frais, droits, coupons courus isolés), dettes de libération rapprochées des appels de l'émetteur, revenus rattachés à la bonne date (décision d'assemblée, intérêts courus), dépréciations ligne par ligne sans compensation, cessions présentées en brut, et Notes annexes complètes. Le respect de l'article 177 (participations croisées) fait aussi partie des vérifications juridiques.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas1',
    titre: "LIKASI CAPITAL : constitution d'un portefeuille",
    contexte: "Au cours du mois de mars N, LIKASI CAPITAL réalise, avec une commission d'intermédiaire de 2 % sur chaque transaction : (a) achat de 2 000 actions cotées BRALIMA à 15 000, pour revente espérée sous six mois ; (b) prise de participation de 65 % dans KOLWEZI LOGISTICS (non cotée) : 13 000 actions à 8 000 ; (c) achat de 800 obligations d'État à 25 000, à conserver durablement en gestion de portefeuille ; (d) achat de 500 actions cotées (0,8 % du capital de l'émettrice) à 30 000, à conserver durablement sans influence.",
    questions: [
      {
        num: 1,
        enonce: "Classez chaque acquisition et justifiez.",
        correction: "(a) Titres de placement — 5022 actions cotées : détention courte en vue d'un gain. (b) Titres de participation — 261 (contrôle exclusif à 65 %) : détention durable pour contrôler. (c) TIAP — 2741 : obligations conservées durablement en activité de portefeuille, sans influence. (d) Autres titres immobilisés — 2748 : conservation durable, participation trop faible (0,8 %) pour caractériser une participation. Le classement suit l'intention (Application 48).",
      },
      {
        num: 2,
        enonce: "Passez les écritures d'acquisition.",
        correction: "(a) Débit 5022 30 000 000 (2 000 × 15 000) et débit 5026 Frais d'acquisition 600 000 / crédit 521 pour 30 600 000 — frais séparés pour les placements. (b) Débit 261 106 080 000 (13 000 × 8 000 = 104 000 000 + 2 % = 2 080 000) / crédit 521 — frais incorporés. (c) Débit 2741 20 400 000 (800 × 25 000 + 2 %) / crédit 521. (d) Débit 2748 15 300 000 (500 × 30 000 + 2 %) / crédit 521.",
      },
      {
        num: 3,
        enonce: "Au 31/12/N, le cours moyen de décembre des actions BRALIMA est de 14 200. Que constatez-vous ?",
        correction: "Valeur d'entrée, frais d'acquisition inclus (commentaire du compte 50) : 30 000 000 + 600 000 = 30 600 000 ; valeur actuelle au cours moyen de décembre : 2 000 × 14 200 = 28 400 000. Dépréciation : 2 200 000. Écriture : débit 6795 Charges pour dépréciations sur titres de placement / crédit 590 Dépréciations des titres de placement, 2 200 000. Le 5026 est un sous-compte du compte 50, pas un compte de charges : les frais font partie de la valeur d'achat comparée au cours.",
      },
      {
        num: 4,
        enonce: "KOLWEZI LOGISTICS traverse une crise durable ramenant la valeur d'usage de la participation à 95 000 000. Que faire ?",
        correction: "La valeur d'entrée (106 080 000) excède la valeur actuelle (95 000 000) : dépréciation de 11 080 000 : débit 6972 Dotations aux dépréciations des immobilisations financières / crédit 2961 Dépréciations des titres de participation dans des sociétés sous contrôle exclusif (valeur d'utilité, art. 42 AUDCIF). En cas de cession ultérieure, la dépréciation serait reprise par 7972 dans le schéma HAO 816/826.",
      },
    ],
  },
  {
    id: 'cas2',
    titre: "GOMA INVEST : cessions de titres de placement, PEPS et CMP",
    contexte: "GOMA INVEST détient 2 400 titres VIRUNGA acquis ainsi : 800 à 9 000 (février N−1) ; 600 à 9 500 (octobre N−1) ; 1 000 à 10 200 (mai N). Le 01/10/N, elle cède 1 800 titres au prix global de 17 500 000 (à crédit). Aucune dépréciation n'existe.",
    questions: [
      {
        num: 1,
        enonce: "Calculez la valeur de sortie et le résultat de cession sous PEPS, puis passez l'écriture.",
        correction: "PEPS : sortent les 800 à 9 000 (7 200 000), les 600 à 9 500 (5 700 000) et 400 des 1 000 à 10 200 (4 080 000) : valeur de sortie 16 980 000. Prix 17 500 000 → gain 520 000. Écriture : débit 4721 Créances sur cession de titres de placement 17 500 000 / crédit 50 pour 16 980 000 et crédit 777 Gains sur cessions de titres de placement 520 000. Portefeuille restant : 600 × 10 200 = 6 120 000.",
      },
      {
        num: 2,
        enonce: "Refaites le calcul sous coût moyen pondéré.",
        correction: "Valeur totale : 7 200 000 + 5 700 000 + 10 200 000 = 23 100 000 pour 2 400 titres → CMP = 9 625. Valeur de sortie : 1 800 × 9 625 = 17 325 000. Gain : 17 500 000 − 17 325 000 = 175 000. Écriture : débit 4721 17 500 000 / crédit 50 pour 17 325 000 et crédit 777 pour 175 000. Portefeuille restant : 600 × 9 625 = 5 775 000.",
      },
      {
        num: 3,
        enonce: "Comparez les deux méthodes et concluez.",
        correction: "PEPS : gain 520 000, portefeuille restant 6 120 000. CMP : gain 175 000, portefeuille restant 5 775 000. L'écart de 345 000 sur le résultat se retrouve, inversé, dans la valeur du stock de titres : le total (résultat + portefeuille) est identique. Le choix de méthode déplace le résultat entre exercices — d'où l'exigence de permanence des méthodes rappelée par le Guide (Application 51).",
      },
      {
        num: 4,
        enonce: "S'agissait-il d'une opération HAO ?",
        correction: "Non : la cession de titres de placement relève du résultat financier (777/6771), la gestion d'un portefeuille de placement étant une activité ordinaire de trésorerie. Le circuit HAO (816/826, avec 485 et reprise 7972) est réservé aux cessions d'immobilisations financières — participations, titres immobilisés (Application 50).",
      },
    ],
  },
  {
    id: 'cas3',
    titre: "BUKAVU HOLDING : cession d'une participation dépréciée",
    contexte: "BUKAVU HOLDING cède le 20/09/N sa participation dans RUZIZI THÉ (valeur d'origine 72 000 000 en compte 261, dépréciation constituée 9 000 000) au prix de 66 000 000, payable à 90 jours.",
    questions: [
      {
        num: 1,
        enonce: "Passez les écritures de cession.",
        correction: "Sortie de la valeur d'origine : débit 816 Valeurs comptables des cessions d'immobilisations financières 72 000 000 / crédit 261 pour 72 000 000. Prix : débit 485 Créances sur cessions d'immobilisations 66 000 000 (le Guide emploie un 4856 absent du plan de comptes) / crédit 826 Produits des cessions d'immobilisations financières 66 000 000. Reprise de la dépréciation : débit 2961 Dépréciations des titres de participation dans des sociétés sous contrôle exclusif 9 000 000 / crédit 7972 Reprises de dépréciations des immobilisations financières 9 000 000 (schéma de l'Application 50).",
      },
      {
        num: 2,
        enonce: "Calculez l'incidence de l'opération sur le résultat de l'exercice, en distinguant ses composantes.",
        correction: "Composante HAO : 826 − 816 = 66 000 000 − 72 000 000 = −6 000 000 (moins-value de cession). Composante financière : reprise de dépréciation +9 000 000. Incidence globale : +3 000 000. La dépréciation antérieure avait déjà pris en charge l'essentiel de la perte de valeur : l'exercice de cession n'enregistre que l'écart résiduel.",
      },
      {
        num: 3,
        enonce: "Le comptable propose de passer une écriture unique « débit 521 66 000 000, débit 6771 6 000 000 / crédit 261 72 000 000 ». Qu'en pensez-vous ?",
        correction: "Triplement inexact : (1) la cession est à 90 jours — c'est le 485 qui porte la créance, pas la banque ; (2) les cessions d'immobilisations financières passent par le circuit HAO 816/826, non par le net 6771/777 réservé aux titres de placement ; (3) l'écriture omet la reprise de la dépréciation existante (9 000 000), qui doit être soldée par 7972. La présentation brute (valeur d'origine d'un côté, prix de l'autre) est aussi ce qui alimente correctement les rubriques HAO des états financiers.",
      },
    ],
  },
  {
    id: 'cas4',
    titre: "Succession KABEYA : évaluer des parts non cotées",
    contexte: "À la suite du décès de M. Kabeya, ses héritiers doivent céder ses 1 500 parts (15 %) de MBANDAKA RIZ SARL aux associés survivants, qui invoquent une clause statutaire de rachat. Bilan simplifié : capital 100 000 000 (10 000 parts), réserves 46 000 000, report à nouveau créditeur 4 000 000 ; un terrain inscrit pour 20 000 000 vaut 35 000 000 ; une provision pour litige de 3 000 000 est jugée sans objet. Dividende habituel : 900 par part ; bénéfice moyen : 1 500 par part ; taux de capitalisation retenu : 10 %. Les parties ne s'entendent pas sur le prix.",
    questions: [
      {
        num: 1,
        enonce: "Calculez la valeur mathématique comptable de la part.",
        correction: "Actif net comptable = capitaux propres = 100 000 000 + 46 000 000 + 4 000 000 = 150 000 000. Valeur mathématique comptable = 150 000 000 / 10 000 = 15 000 par part — contre une valeur nominale de 10 000.",
      },
      {
        num: 2,
        enonce: "Calculez la valeur mathématique intrinsèque.",
        correction: "Corrections : plus-value latente sur le terrain +15 000 000 ; provision sans objet +3 000 000. Actif net corrigé = 150 000 000 + 18 000 000 = 168 000 000 (avant toute incidence fiscale, que l'expert apprécierait). Valeur intrinsèque = 168 000 000 / 10 000 = 16 800 par part.",
      },
      {
        num: 3,
        enonce: "Calculez la valeur financière et la valeur de rendement, puis proposez une fourchette.",
        correction: "Valeur financière = dividende / taux = 900 / 0,10 = 9 000. Valeur de rendement = bénéfice / taux = 1 500 / 0,10 = 15 000. Fourchette : 9 000 (flux distribués) à 16 800 (patrimoine corrigé) ; une moyenne pondérée — par exemple (intrinsèque + rendement) / 2 = 15 900 — est une convention de négociation courante. Ces formules et pondérations sont des techniques de la pratique, non des règles de l'Acte uniforme.",
      },
      {
        num: 4,
        enonce: "Faute d'accord, comment le prix sera-t-il fixé ?",
        correction: "Par expert : l'article 59 de l'AUSCGIE dispose que, dans tous les cas où l'Acte uniforme prévoit la cession des titres d'un associé ou leur rachat par la société, la valeur des droits est déterminée, à défaut d'accord amiable, par expert désigné par les parties ou, à défaut d'accord entre elles, par décision de la juridiction compétente statuant à bref délai. L'expert s'appuiera précisément sur les méthodes patrimoniales et de flux calculées ci-dessus.",
      },
    ],
  },
  {
    id: 'cas5',
    titre: "KINSHASA AGRO HOLDING SA : classer, souscrire, encaisser",
    contexte: "KINSHASA AGRO HOLDING SA (KAH), dont le siège est à Kinshasa, réalise les opérations suivantes en N. (a) Le 01/03/N, elle souscrit à l'augmentation de capital de TSHOPO HUILERIE SA 4 500 actions de nominal 20 000, émises avec une prime de 5 000, libérées du quart du nominal et de la totalité de la prime ; frais de 1 125 000. Elle détient ainsi 45 % des droits de vote, aucun autre actionnaire ne dépassant 20 %. Le second quart est appelé le 01/09/N et versé le 15/09/N. (b) Elle acquiert 12 % du capital de MATADI CIMENT SARL, qui détient elle-même 18 % du capital de KAH. (c) Elle détient depuis N−3, sous forme nominative, 25 % de LUALABA TRANSPORT SARL, dont le siège est à Kolwezi. Le 20/05/N, l'assemblée de LUALABA TRANSPORT décide un dividende revenant à KAH de 6 000 000 brut.",
    questions: [
      {
        num: 1,
        enonce: "Classez les trois participations et indiquez le compte de chacune.",
        correction: "(a) TSHOPO HUILERIE : 45 % des droits de vote sans qu'aucun autre associé ne détienne davantage, donc contrôle exclusif présumé au sens du commentaire du compte 26 (plus de 40 %). Compte 261. L'art. 175 AUSCGIE, qui exige plus de la moitié des droits de vote, n'est pas rempli : c'est la présomption comptable qui joue. (b) MATADI CIMENT : 12 %, soit au moins 10 % du capital, d'où une participation présumée (art. 176) au compte 268 ou 263 selon l'influence réelle ; mais voir la question 4. (c) LUALABA TRANSPORT : 25 %, influence notable présumée (au moins 20 %), compte 263.",
      },
      {
        num: 2,
        enonce: "Passez l'écriture de souscription du 01/03/N (a).",
        correction: "Coût total : 4 500 × (20 000 + 5 000) + 1 125 000 = 113 625 000. Versé : 4 500 × (5 000 + 5 000) + 1 125 000 = 46 125 000. Restant dû : 4 500 × 15 000 = 67 500 000. Écriture : débit 261 113 625 000 / crédit 4813 Versements restant à effectuer sur titres de participation et titres immobilisés non libérés 67 500 000 et crédit 521 46 125 000. Les frais sont incorporés au coût (commentaire du compte 26 ; Application 48).",
      },
      {
        num: 3,
        enonce: "Passez les écritures de l'appel et du versement du second quart.",
        correction: "Second quart : 4 500 × 5 000 = 22 500 000. À l'appel du 01/09/N (AUDCIF, ch. 13, § 2.1.2) : débit 4813 / crédit 484 Autres dettes HAO, 22 500 000. Au versement du 15/09/N : débit 484 / crédit 521, 22 500 000. Au 31/12/N, le 4813 présente encore 45 000 000 (deux quarts non appelés), à mentionner distinctement dans les Notes annexes.",
      },
      {
        num: 4,
        enonce: "L'acquisition de 12 % de MATADI CIMENT est-elle régulière ?",
        correction: "Non. Une société par actions ou une SARL ne peut posséder d'actions ou de parts d'une autre société si celle-ci détient plus de 10 % de son capital (art. 177). MATADI CIMENT détient 18 % de KAH : KAH ne peut pas détenir de parts de MATADI CIMENT. À défaut d'accord, la société qui détient la fraction la plus faible, ici KAH (12 % contre 18 %), doit céder. Jusqu'à la cession effective, les parts sont privées du droit de vote et du dividende. En comptabilité, KAH ne comptabilisera aucun dividende sur ces parts et devra apprécier à la clôture si le prix de cession attendu impose une dépréciation.",
      },
      {
        num: 5,
        enonce: "Comptabilisez le dividende de LUALABA TRANSPORT et indiquez le montant encaissé. KAH peut-elle bénéficier du régime mère-fille ?",
        correction: "Fait générateur : la décision d'assemblée du 20/05/N. Débit 4711 Débiteurs divers / crédit 7721 Revenus des titres de participation, 6 000 000 (produit brut). La distribuante opère la retenue de 20 % (loi n° 23/053, art. 120) : KAH encaisse 4 800 000. Régime mère-fille (art. 76) : KAH est une société par actions, détient 25 % (le minimum requis), les deux sièges sont en RDC, les titres sont nominatifs et conservés depuis plus de deux années consécutives. Sous réserve de la condition d'égalité d'imposition, l'impôt payé sur les produits distribués s'impute sur celui dont KAH est redevable. Si KAH cédait une partie des titres et passait sous 25 %, elle sortirait du régime.",
      },
    ],
  },
  {
    id: 'cas6',
    titre: "BUTEMBO FINANCES SA : inventaire et cession d'un portefeuille",
    contexte: "Au 31/12/N, BUTEMBO FINANCES SA détient : (1) en placement, 1 000 actions cotées X acquises 12 000 l'une, avec 120 000 de frais (5026) ; cours moyen de décembre : 11 000 ; (2) en placement, 500 actions cotées Y acquises pour 8 000 000 frais inclus ; cours moyen de décembre : 18 000 ; (3) en placement, des actions non cotées Z acquises 2 000 000, que la direction décide désormais de conserver au-delà de 12 mois, sans influence ; (4) une participation de 70 % dans UVIRA SUCRE SA (261), coût 60 000 000, dépréciée de 10 000 000 au 31/12/N−1 ; sa valeur d'utilité est estimée à 56 000 000 au 31/12/N. Le 10/03/N+1, les 1 000 actions X sont cédées au comptant à 11 500, avec 100 000 de frais de courtage.",
    questions: [
      {
        num: 1,
        enonce: "Quelles dépréciations constater au 31/12/N sur les actions X et Y ?",
        correction: "X : valeur d'entrée, frais inclus, 12 000 000 + 120 000 = 12 120 000 ; valeur actuelle 1 000 × 11 000 = 11 000 000 ; dépréciation 1 120 000 : débit 6795 / crédit 590. Y : valeur actuelle 500 × 18 000 = 9 000 000 > 8 000 000 : plus-value latente de 1 000 000, non comptabilisée (art. 43 AUDCIF). Pas de compensation : la dépréciation de X reste de 1 120 000 même si le portefeuille est globalement stable.",
      },
      {
        num: 2,
        enonce: "Traitez la décision relative aux actions Z.",
        correction: "La direction n'a plus l'intention de les revendre dans les 12 mois : reclassement en 2748 Autres titres immobilisés (AUDCIF, ch. 13, § 2.6). Écriture : débit 2748 / crédit 5023 Actions non cotées, 2 000 000. Aucun résultat. À l'avenir, la valeur d'inventaire sera la valeur probable de négociation, et toute dépréciation passera par 6972 / 2974.",
      },
      {
        num: 3,
        enonce: "Ajustez la dépréciation de la participation UVIRA SUCRE.",
        correction: "Dépréciation nécessaire au 31/12/N : 60 000 000 − 56 000 000 = 4 000 000. Dépréciation existante : 10 000 000. Reprise de 6 000 000 : débit 2961 / crédit 7972 Reprises de dépréciations des immobilisations financières. La participation ne peut pas être portée au-dessus de son coût de 60 000 000, même si la valeur d'utilité dépassait ce montant.",
      },
      {
        num: 4,
        enonce: "Présentez ces éléments au bilan du 31/12/N et indiquez la position fiscale à examiner.",
        correction: "AR Titres de participation : 60 000 000 brut, 4 000 000 de dépréciation, 56 000 000 net. AS Autres immobilisations financières : 2 000 000 (actions Z). BQ Titres de placement : brut 12 120 000 + 8 000 000 = 20 120 000, dépréciation 1 120 000, net 19 000 000. Fiscalement, l'art. 50 de la loi n° 23/053 exclut les provisions des charges déductibles, hors quatre exceptions qui ne visent pas ce portefeuille : la déductibilité de la dotation de 1 120 000 doit être examinée, avec réintégration si elle tombe sous cette exclusion, et le traitement fiscal de la reprise de 6 000 000 doit suivre celui de la dotation d'origine.",
      },
      {
        num: 5,
        enonce: "Passez les écritures de la cession des actions X le 10/03/N+1 et mesurez son incidence sur le résultat de N+1.",
        correction: "Prix net de frais : 1 000 × 11 500 − 100 000 = 11 400 000. Valeur de sortie : 12 120 000. Perte : 720 000. Écriture : débit 521 11 400 000 et débit 6771 Pertes sur cessions de titres de placement 720 000 / crédit 5022 12 000 000 et crédit 5026 120 000. Reprise de la dépréciation : débit 590 / crédit 7795, 1 120 000. Incidence nette sur N+1 : +400 000, puisque l'essentiel de la perte avait été constaté en N.",
      },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 7,
  id: 'ue3-chapitre-7',
  titre: "L'évaluation des titres sociaux et le portefeuille-titres",
  sousTitre: "AUSCGIE révisé, art. 56-59 et 173-180 · AUDCIF, art. 42-46 et Titre VIII, ch. 13 · SYSCOHADA, Applications 48 à 51 · loi n° 23/053, art. 9, 50, 76 et 120",
  infoBulle: "Classement des titres selon l'intention (participation 26, titres immobilisés 274, placement 50), présomptions de 10 %, 20 % et 40 %, participations croisées, coût d'entrée et frais, titres non libérés (4813, 4726), dividendes et intérêts, régime mère-fille, évaluation à l'inventaire et dépréciations sans compensation, cessions en HAO ou en résultat financier, PEPS et coût moyen pondéré, évaluation des droits sociaux et expertise de l'article 59.",
  loiRef: "Art. 56-59, 173-180 AUSCGIE · art. 42-46 AUDCIF, Titre VII (comptes 26, 27, 29, 47, 50, 59), Titre VIII ch. 13 · App. 48-51 · loi n° 23/053, art. 9, 50, 54, 72, 76, 80, 120",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Définir les valeurs mobilières et classer un titre selon l'intention de détention (AUDCIF, ch. 13 ; Application 48)",
    "Appliquer les notions de participation, de contrôle, de société mère et de participations croisées (art. 173-180 AUSCGIE ; commentaire du compte 26)",
    "Déterminer le coût d'entrée des titres : frais, droits de souscription, coupons courus",
    "Comptabiliser des titres souscrits non libérés (4813, 4726, 484 ; Application 49)",
    "Comptabiliser dividendes et intérêts et apprécier la retenue à la source et le régime mère-fille congolais",
    "Évaluer le portefeuille à l'inventaire et constater les dépréciations sans compensation (art. 42-46 AUDCIF)",
    "Comptabiliser les cessions en HAO ou en résultat financier et comparer PEPS et coût moyen pondéré (Applications 50-51)",
    "Évaluer des droits sociaux non cotés et situer le recours à l'expert de l'article 59",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Le classement suit l'intention : lien durable et influence → 26 ; détention durable sans influence → 274 (2741 TIAP, 2745 obligations, 2748 autres) ; revenu ou plus-value à brève échéance → 50.",
    "Présomptions : participation dès 10 % du capital (art. 176) ; influence notable dès 20 % ; contrôle exclusif au-delà de la moitié des droits de vote (art. 175) ou, en comptabilité, dès plus de 40 % si personne ne détient davantage ; société mère au-delà de la moitié du capital (art. 179).",
    "Participations croisées : interdiction au-delà de 10 % (art. 177-178) ; les titres à céder sont privés de vote et de dividende.",
    "Coût d'entrée : frais incorporés pour participations et titres immobilisés, sous-compte du 50 pour les placements ; droits de souscription ajoutés au coût ; coupons courus isolés (5063, 2764 ou 2768).",
    "Titres non libérés : coût total à l'actif, dette au 4813 (participations, titres immobilisés) ou au 4726 (placements). Le Guide emploie le 472 et le 2746, à corriger selon le plan de comptes.",
    "Dividende constaté à la décision d'assemblée (7721, 7722, 7746), pour son montant brut ; retenue de 20 % en RDC ; régime mère-fille : 25 %, sièges en RDC, titres nominatifs conservés deux ans (loi n° 23/053, art. 76).",
    "Inventaire : valeur d'utilité pour les participations, cours moyen du dernier mois pour les titres cotés, valeur probable de négociation pour les non cotés ; dépréciation ligne par ligne sans compensation (6972 / 296-297 ; 6795 / 590).",
    "Cession d'immobilisations financières : 816 / 826, reprise 7972 (HAO + financier) ; cession de placements : 777 ou 6771, reprise 7795 ; valeur sortie au coût non déprécié, prix net des frais.",
    "PEPS ou coût moyen pondéré pour les sorties de placements, avec permanence des méthodes (Application 51).",
    "Droits sociaux non cotés : valeurs patrimoniales et de flux, conventions de la pratique ; à défaut d'accord, expert désigné par les parties ou par le juge statuant à bref délai (art. 59).",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)", precision: "30 janvier 2014 ; art. 56 à 59 et 173 à 180" },
    { genre: 'texte', intitule: "Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF)", precision: "art. 42 à 46 ; Titre VII, commentaires des comptes 26, 27, 29, 47, 50 et 59 ; Titre VIII, chapitre 13 (portefeuille-titres) ; Titre IX, Notes 4 et 9" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, Guide d'application", precision: "Applications 48 (acquisition de titres), 49 (titres non libérés), 50 (cession de titres de participation) et 51 (cession de titres de placement, PEPS et CMP, dépréciation)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, plan de comptes et maquette des états financiers", precision: "comptes 26, 274, 2961, 2974, 4711, 4721, 4726, 4813, 484, 485, 50, 590, 6771, 6795, 6972, 772, 7745, 7746, 777, 7795, 7972, 816, 826 ; rubriques AR, AS, BQ, TK, TL, RN, TN et RO" },
    { genre: 'texte', intitule: "Loi n° 23/053 du 30 novembre 2023 relative à l'impôt sur les sociétés et à l'impôt sur le revenu des personnes physiques", precision: "art. 9, 50, 54, 72, 76, 80 et 120" },
    { genre: 'article', auteur: "RFI", titre: "RDC : une loi ouvre la voie à la création d'une Bourse de Kinshasa, le marché reste à construire", support: "rfi.fr", precision: "6 septembre 2026, consulté le 24 septembre 2026" },
    { genre: 'ouvrage', auteur: "Mapapa Mbangala A., Nkoy Mbangala C. et Mensah Freitas C.", titre: "Comptabilité des sociétés OHADA", editeur: "Droit Afrique", lieu: "s.l.", annee: "2026" },
    { genre: 'ouvrage', auteur: "Dobill M.", titre: "Comptabilité OHADA, tome 3 : comptabilité des sociétés", editeur: "Karthala", lieu: "Paris", annee: "2013" },
    { genre: 'ouvrage', auteur: "Nzoimbengene Luyindula B. D.", titre: "Comptabilité des sociétés suivant le système comptable OHADA révisé", editeur: "2e éd., à compte d'auteur", lieu: "s.l.", annee: "2025" },
    { genre: 'ouvrage', auteur: "Pougoué P.-G. (dir.)", titre: "Encyclopédie du droit OHADA", editeur: "Lamy", lieu: "Paris", annee: "2011" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE révisé du 30 janvier 2014 · AUDCIF et SYSCOHADA révisé (Applications 48, 49, 50, 51) · loi n° 23/053 du 30 novembre 2023 · RFI (6 septembre 2026).",
}

export default chapitre
