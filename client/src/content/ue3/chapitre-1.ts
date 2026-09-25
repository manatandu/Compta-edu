// Chapitre 1 du module UE3, Comptabilité des sociétés : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
//
// Réécriture approfondie (septembre 2026). Sources lues pendant la rédaction :
// - AUSCGIE révisé du 30 janvier 2014 : art. 1, 4 à 6, 37 à 70 (apports,
//   titres sociaux, capital), 97 à 113 (immatriculation, société en
//   formation, reprise des engagements), 269-1 à 269-7 (capital variable),
//   311, 311-1, 312, 313 (SARL), 387 à 389 et 400 (SA), 853-5 (SAS), 906
//   (monnaie de référence), skill auscgie-acte-uniforme ;
// - AUDCIF du 26 janvier 2017 : art. 7, 17, 36, 37, 51 et 52 ; Titre VII,
//   comptes 101, 105, 109 et 46 ; skill audcif-acte-uniforme ;
// - SYSCOHADA révisé, Guide d'application, Applications 58, 59, 60, 63 et
//   123 ; maquette du bilan (rubriques CA et CB) ; skill syscohada ;
// - arrêté interministériel du 30 décembre 2014 (capital de la SARL) et
//   décret n° 14/014 du 8 mai 2014 (GUCE), déjà vérifiés pour l'UE2 ;
// - page « Procédures » de l'ANAPI (mise à jour du 14 juillet 2026),
//   consultée le 24 septembre 2026.
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch1-q1', question: "Selon l'article 4 de l'AUSCGIE, à quoi s'engagent les associés d'une société commerciale ?",
    options: [
      { id: 'a', texte: "À affecter des biens ou de l'industrie à une activité, en vue de partager le bénéfice ou de profiter de l'économie, et à contribuer aux pertes" },
      { id: 'b', texte: "À verser un capital minimum de dix millions de francs CFA" },
      { id: 'c', texte: "À travailler personnellement pour la société" },
      { id: 'd', texte: "À garantir sur leur patrimoine toutes les dettes sociales" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 4 AUSCGIE',
    explication: "Les associés « conviennent, par un contrat, d'affecter à une activité des biens en numéraire ou en nature, ou de l'industrie, dans le but de partager le bénéfice ou de profiter de l'économie qui peut en résulter », et « s'engagent à contribuer aux pertes » (art. 4). La responsabilité indéfinie pour les dettes sociales n'existe que dans certaines formes (SNC, commandités).",
  },
  {
    id: 'ch1-q2', question: "Un associé propose d'apporter sa caution personnelle en garantie des emprunts de la société, en échange de parts. Est-ce un apport ?",
    options: [
      { id: 'a', texte: "Oui, c'est un apport en nature" },
      { id: 'b', texte: "Oui, c'est un apport en industrie" },
      { id: 'c', texte: "Non : seuls les apports en numéraire, en nature et en industrie sont admis, tout autre apport est interdit" },
      { id: 'd', texte: "Oui, si les statuts le prévoient" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 40 AUSCGIE',
    explication: "L'article 40 énumère trois apports, numéraire, nature et industrie, et ajoute : « Tout autre apport est interdit. » Un engagement de caution n'est ni de l'argent, ni un droit sur un bien, ni une activité mise à disposition : il ne peut rémunérer aucun titre.",
  },
  {
    id: 'ch1-q3', question: "Un associé remet à la société un chèque de 10 000 000 FC qui n'est encaissé que le mois suivant. Quand son apport en numéraire est-il libéré ?",
    options: [
      { id: 'a', texte: "Le jour de la remise du chèque" },
      { id: 'b', texte: "Le jour de la signature des statuts" },
      { id: 'c', texte: "Lorsque les sommes ont été intégralement et définitivement encaissées par la société" },
      { id: 'd', texte: "Le jour de l'immatriculation" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 42 AUSCGIE',
    explication: "Ne sont considérés comme libérés que les apports correspondant à des sommes dont la société est devenue propriétaire et qu'elle a intégralement et définitivement encaissées (art. 42). La remise d'un chèque ne libère rien tant qu'il n'est pas encaissé.",
  },
  {
    id: 'ch1-q4', question: "Dans quelle forme sociale l'apport en industrie est-il interdit ?",
    options: [
      { id: 'a', texte: "La SARL" },
      { id: 'b', texte: "La société anonyme" },
      { id: 'c', texte: "La SAS" },
      { id: 'd', texte: "La SNC" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 50-1 et 389 AUSCGIE',
    explication: "L'article 50-1 interdit les apports en industrie dans les sociétés anonymes, et l'article 389 rappelle que les actions de SA « ne peuvent représenter des apports en industrie ». La SAS, au contraire, peut émettre des actions inaliénables résultant d'apports en industrie (art. 853-5).",
  },
  {
    id: 'ch1-q5', question: "Quelle limite l'article 50-3 fixe-t-il aux titres rémunérant un apport en industrie ?",
    options: [
      { id: 'a', texte: "10 % du capital social" },
      { id: 'b', texte: "25 % de l'ensemble des droits de vote, et 25 % des bénéfices, de l'actif net et des pertes" },
      { id: 'c', texte: "50 % des droits de vote" },
      { id: 'd', texte: "Aucune limite si les associés sont d'accord" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 50-3 AUSCGIE',
    explication: "Les apports en industrie ne concourent pas à la formation du capital, mais donnent des titres ouvrant droit au vote et au partage. Les droits de vote qui y sont attachés ne peuvent dépasser 25 % de l'ensemble, et leur part dans les bénéfices, l'actif net et les pertes est plafonnée au même taux (art. 50-3).",
  },
  {
    id: 'ch1-q6', question: "Envers la société, comment l'associé qui apporte un bien en propriété est-il garant ?",
    options: [
      { id: 'a', texte: "Comme un bailleur envers son preneur" },
      { id: 'b', texte: "Comme un vendeur envers son acheteur" },
      { id: 'c', texte: "Comme un prêteur envers son emprunteur" },
      { id: 'd', texte: "Il n'est tenu d'aucune garantie" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 46 et 47 AUSCGIE',
    explication: "L'apporteur en propriété est garant envers la société comme un vendeur envers son acheteur (art. 46) : garantie d'éviction et des vices cachés. L'apporteur en jouissance l'est comme un bailleur envers son preneur (art. 47).",
  },
  {
    id: 'ch1-q7', question: "Une clause des statuts exonère un associé de toute contribution aux pertes. Quel est son sort ?",
    options: [
      { id: 'a', texte: "Elle est valable si tous les associés l'ont signée" },
      { id: 'b', texte: "Elle entraîne la nullité de la société" },
      { id: 'c', texte: "Elle est réputée non écrite" },
      { id: 'd', texte: "Elle doit être validée par un commissaire aux apports" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 54 AUSCGIE',
    explication: "L'article 54, alinéa 2, répute non écrites les clauses léonines : attribuer à un associé la totalité du profit, l'exonérer de la totalité des pertes, l'exclure totalement du profit ou mettre à sa charge la totalité des pertes. La société subsiste ; seule la clause tombe.",
  },
  {
    id: 'ch1-q8', question: "Que représente le capital social selon l'article 62 ?",
    options: [
      { id: 'a', texte: "La trésorerie disponible de la société" },
      { id: 'b', texte: "Le total des capitaux propres" },
      { id: 'c', texte: "Le montant des apports en capital, augmenté le cas échéant des incorporations de réserves, de bénéfices ou de primes" },
      { id: 'd', texte: "La valeur de marché des titres" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 62 AUSCGIE',
    explication: "Le capital « représente le montant des apports en capital faits par les associés à la société et augmente, le cas échéant, des incorporations de réserves, de bénéfices ou de primes d'apports, d'émission ou de fusion » (art. 62). C'est un chiffre juridique, pas une somme d'argent en caisse.",
  },
  {
    id: 'ch1-q9', question: "Le capital d'une société est réduit sous le minimum légal. Que prévoit l'article 66 ?",
    options: [
      { id: 'a', texte: "Rien : le minimum ne s'apprécie qu'à la constitution" },
      { id: 'b', texte: "La société doit être dissoute, à moins d'être recapitalisée au moins au minimum" },
      { id: 'c', texte: "Les dirigeants paient une amende forfaitaire" },
      { id: 'd', texte: "La société est transformée d'office en SNC" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 66 AUSCGIE',
    explication: "Sous le minimum, la société en formation ne peut être valablement constituée ; si le capital est ultérieurement réduit sous le minimum, la société doit être dissoute, à moins d'être recapitalisée au moins au minimum (art. 66).",
  },
  {
    id: 'ch1-q10', question: "À la souscription, quel compte enregistre à son crédit les promesses d'apport ?",
    options: [
      { id: 'a', texte: "1013 Capital souscrit, appelé, versé, non amorti" },
      { id: 'b', texte: "1011 Capital souscrit, non appelé" },
      { id: 'c', texte: "4613 Apporteurs, capital appelé, non versé" },
      { id: 'd', texte: "462 Associés, comptes courants" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, Titre VII, compte 101 ; App. 58',
    explication: "« Le compte 1011 (Capital souscrit, non appelé) enregistre à son crédit les promesses d'apport en espèces ou en nature. » Au moment de l'appel, il est viré au 1012, puis au 1013 lors de la libération effective (commentaires du compte 101 ; Application 58).",
  },
  {
    id: 'ch1-q11', question: "Où le compte 109 Apporteurs, capital souscrit, non appelé figure-t-il dans les états financiers ?",
    options: [
      { id: 'a', texte: "À l'actif, parmi les créances clients" },
      { id: 'b', texte: "Au passif, en moins parmi les capitaux propres (rubrique CB)" },
      { id: 'c', texte: "Au compte de résultat, en charges financières" },
      { id: 'd', texte: "Uniquement dans les engagements hors bilan" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, Titre VII, compte 109 ; maquette du bilan',
    explication: "« Le compte 109 figure en seconde ligne au passif du bilan, en moins parmi les capitaux propres. » La maquette du bilan lui réserve la rubrique CB, Apporteurs, capital non appelé, portée en négatif sous la rubrique CA, Capital.",
  },
  {
    id: 'ch1-q12', question: "Un associé verse la totalité de son apport alors que seule la moitié du capital est appelée. Où loge-t-on la fraction versée par anticipation ?",
    options: [
      { id: 'a', texte: "Au crédit du 4616 Apporteurs, versements anticipés" },
      { id: 'b', texte: "Au crédit du 1013" },
      { id: 'c', texte: "Au crédit du 758 Produits divers" },
      { id: 'd', texte: "Au débit du 109" },
    ],
    reponseCorrecte: 'a', articleRef: 'Plan de comptes, compte 4616',
    explication: "Le compte 4616 Apporteurs, versements anticipés reçoit les fonds versés avant l'appel. Il reste au passif jusqu'à l'appel de la fraction correspondante, puis il est imputé sur la créance d'appel 4613.",
  },
  {
    id: 'ch1-q13', question: "Dans l'Application 58, l'apporteur en nature remet des biens pour 290 000 000 et la société reprend un emprunt de 50 000 000. Pour quelle valeur reçoit-il des actions ?",
    options: [
      { id: 'a', texte: "290 000 000" },
      { id: 'b', texte: "340 000 000" },
      { id: 'c', texte: "240 000 000" },
      { id: 'd', texte: "50 000 000" },
    ],
    reponseCorrecte: 'c', articleRef: 'App. 58 ; art. 63 AUSCGIE',
    explication: "L'apport est rémunéré pour sa valeur nette : 290 000 000 − 50 000 000 = 240 000 000. Les biens sont débités à leur valeur d'apport, l'emprunt repris est crédité au 162, et le solde éteint la créance 4613 sur l'apporteur.",
  },
  {
    id: 'ch1-q14', question: "Comment comptabilise-t-on les honoraires du notaire et les frais d'actes payés lors de la constitution ?",
    options: [
      { id: 'a', texte: "À l'actif, au compte 2011 Frais de constitution" },
      { id: 'b', texte: "En charges de l'exercice (6324 et 6325)" },
      { id: 'c', texte: "En diminution du capital social" },
      { id: 'd', texte: "En créance sur les associés" },
    ],
    reponseCorrecte: 'b', articleRef: 'App. 58 ; AUDCIF, compte 21 (exclusions)',
    explication: "Le SYSCOHADA révisé a supprimé les charges immobilisées : les frais d'établissement sont des charges de la classe 6 (exclusions du compte 21). L'Application 58 débite 6324 Honoraires des professions réglementées et 6325 Frais d'actes et de contentieux.",
  },
  {
    id: 'ch1-q15', question: "Lors de l'appel de la seconde moitié du capital (Application 59), quelle écriture constate la créance devenue exigible ?",
    options: [
      { id: 'a', texte: "Débit 109 / crédit 4613" },
      { id: 'b', texte: "Débit 4613 / crédit 109, puis débit 1011 / crédit 1012" },
      { id: 'c', texte: "Débit 521 / crédit 1013" },
      { id: 'd', texte: "Débit 1013 / crédit 1011" },
    ],
    reponseCorrecte: 'b', articleRef: 'App. 59',
    explication: "La créance conditionnelle (109) devient exigible : débit 4613 / crédit 109. En parallèle, le capital passe de « non appelé » à « appelé, non versé » : débit 1011 / crédit 1012. Le versement fera ensuite passer 1012 en 1013.",
  },
  {
    id: 'ch1-q16', question: "Dans une société anonyme, quelle fraction des actions de numéraire doit être libérée à la souscription ?",
    options: [
      { id: 'a', texte: "La totalité" },
      { id: 'b', texte: "La moitié au moins" },
      { id: 'c', texte: "Le quart au moins, le surplus dans les trois ans de l'immatriculation" },
      { id: 'd', texte: "Aucune fraction minimale" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 389 AUSCGIE',
    explication: "Les actions de numéraire sont libérées d'un quart au moins de leur valeur nominale lors de la souscription ; le surplus doit l'être dans un délai qui ne peut excéder trois ans à compter de l'immatriculation (art. 389).",
  },
  {
    id: 'ch1-q17', question: "Dans une SARL, quelle fraction des parts de numéraire doit être libérée à la souscription ?",
    options: [
      { id: 'a', texte: "Le quart au moins" },
      { id: 'b', texte: "La moitié au moins, le surplus dans les deux ans de l'immatriculation" },
      { id: 'c', texte: "La totalité, sans exception" },
      { id: 'd', texte: "Les trois quarts" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 311-1 AUSCGIE',
    explication: "Les parts représentant des apports en numéraire sont libérées de la moitié au moins de leur valeur nominale à la souscription ; le surplus l'est en une ou plusieurs fois dans les deux ans de l'immatriculation. Les parts d'apports en nature sont intégralement libérées (art. 311-1).",
  },
  {
    id: 'ch1-q18', question: "D'après l'article 53, quand l'associé a-t-il un droit sur les bénéfices ?",
    options: [
      { id: 'a', texte: "À chaque clôture d'exercice bénéficiaire, de plein droit" },
      { id: 'b', texte: "Lorsque leur distribution a été décidée" },
      { id: 'c', texte: "Seulement à la dissolution" },
      { id: 'd', texte: "Uniquement s'il est dirigeant" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 53 AUSCGIE',
    explication: "Les titres sociaux confèrent un droit sur les bénéfices réalisés par la société « lorsque leur distribution a été décidée » (art. 53). Tant que l'assemblée n'a pas voté la distribution, le bénéfice appartient à la société : c'est l'objet du chapitre 3.",
  },
  {
    id: 'ch1-q19', question: "Quel est le principe posé par l'article 67 quant au montant du capital ?",
    options: [
      { id: 'a', texte: "Le capital varie librement avec les apports et retraits" },
      { id: 'b', texte: "Le capital est fixe ; il ne change que selon les règles de modification des statuts, sauf capital variable (art. 269-1 et s.)" },
      { id: 'c', texte: "Le capital est révisé chaque année par l'assemblée" },
      { id: 'd', texte: "Le capital suit la valeur des actifs" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 67 AUSCGIE',
    explication: "Le capital est fixe ; il peut être augmenté ou réduit dans les conditions prévues pour la modification des statuts. Par dérogation, il peut être variable dans les conditions des articles 269-1 et suivants (art. 67).",
  },
  {
    id: 'ch1-q20', question: "Un associé verse son apport avec quatre mois de retard. Que doit-il en plus ?",
    options: [
      { id: 'a', texte: "Rien, sauf mise en demeure préalable" },
      { id: 'b', texte: "Les intérêts au taux légal, de plein droit, depuis la date où le versement était dû, sans préjudice de dommages et intérêts" },
      { id: 'c', texte: "Une pénalité forfaitaire de 10 %" },
      { id: 'd', texte: "Il perd automatiquement ses droits d'associé" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 43 AUSCGIE',
    explication: "« En cas de retard dans le versement, les sommes restant dues à la société portent de plein droit intérêt au taux légal à compter du jour où le versement devait être effectué, sans préjudice de dommages et intérêts, s'il y a lieu » (art. 43). Pour la société, ces intérêts sont un produit financier.",
  },
  {
    id: 'ch1-q21', question: "Un fournisseur, créancier de la société en formation, veut libérer ses parts par compensation avec sa créance lors de la constitution. Est-ce possible ?",
    options: [
      { id: 'a', texte: "Oui, toujours" },
      { id: 'b', texte: "Non : la compensation n'est prévue que pour les apports en numéraire réalisés à l'occasion d'une augmentation de capital" },
      { id: 'c', texte: "Oui, si la créance est inférieure à 5 000 000 FCFA" },
      { id: 'd', texte: "Oui, sur autorisation du greffe" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 44 AUSCGIE',
    explication: "L'article 44 n'ouvre la compensation avec une créance certaine, liquide et exigible qu'aux apports en numéraire « réalisés à l'occasion d'une augmentation de capital », et à moins que les statuts ne l'interdisent. À la constitution, la société n'a pas encore de dettes régulières envers un souscripteur.",
  },
  {
    id: 'ch1-q22', question: "Selon l'AUDCIF, à quelle valeur un bien apporté par un associé est-il inscrit à l'actif ?",
    options: [
      { id: 'a', texte: "À sa valeur d'apport" },
      { id: 'b', texte: "À sa valeur nette comptable chez l'apporteur, obligatoirement" },
      { id: 'c', texte: "À zéro, puisqu'il n'a rien coûté à la société" },
      { id: 'd', texte: "À son coût de remplacement à neuf" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 36 AUDCIF',
    explication: "Le coût historique des biens est constitué par le coût réel d'acquisition pour ceux achetés à des tiers, et par « la valeur d'apport pour ceux apportés par les actionnaires/associés/membres » (art. 36 AUDCIF). Le cadre conceptuel précise : valeur d'apport contrôlée dans le contrat.",
  },
  {
    id: 'ch1-q23', question: "Dans une SARL, à partir de quel montant l'évaluation des apports en nature doit-elle être contrôlée par un commissaire aux apports ?",
    options: [
      { id: 'a', texte: "Toujours, quel que soit le montant" },
      { id: 'b', texte: "Dès que la valeur de l'apport, ou de l'ensemble des apports en nature, dépasse 5 000 000 FCFA" },
      { id: 'c', texte: "Au-delà de 10 000 000 FCFA" },
      { id: 'd', texte: "Jamais dans une SARL" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 312 AUSCGIE',
    explication: "Le contrôle est obligatoire « dès lors que la valeur de l'apport en nature considéré, ou que la valeur de l'ensemble des apports en nature considérés, est supérieure à cinq millions (5.000.000) de francs CFA » ; il l'est toujours pour les avantages particuliers (art. 312). En SA, il l'est toujours (art. 400).",
  },
  {
    id: 'ch1-q24', question: "Sans commissaire aux apports, ou lorsque la valeur retenue diffère de la sienne, quelle est la sanction dans la SARL ?",
    options: [
      { id: 'a', texte: "La nullité de la société" },
      { id: 'b', texte: "Les associés sont solidairement responsables, pendant cinq ans, à l'égard des tiers, de la valeur attribuée aux apports en nature" },
      { id: 'c', texte: "Une amende fiscale" },
      { id: 'd', texte: "Aucune sanction" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 312 AUSCGIE',
    explication: "L'article 312 rend les associés solidairement responsables pendant cinq ans, à l'égard des tiers, de la valeur attribuée aux apports en nature. La garantie ne vise que la valeur au moment de la constitution, pas le maintien de cette valeur.",
  },
  {
    id: 'ch1-q25', question: "Une société établie à Kinshasa reçoit un apport de 20 000 dollars américains. Comment l'enregistre-t-elle ?",
    options: [
      { id: 'a', texte: "En dollars, puisque c'est la monnaie de l'apport" },
      { id: 'b', texte: "En francs CFA, monnaie de référence de l'OHADA" },
      { id: 'c', texte: "En francs congolais, par conversion au cours de change du jour de l'opération" },
      { id: 'd', texte: "Au cours moyen de l'année" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 17 et 51-52 AUDCIF',
    explication: "La comptabilité est tenue « dans l'unité monétaire ayant cours légal dans l'État partie » (art. 17 AUDCIF), le franc congolais en RDC. Les biens et créances en devises sont convertis au cours du jour de l'acquisition ou de la mise à disposition des devises (art. 51 et 52).",
  },
  {
    id: 'ch1-q26', question: "Quel est le capital minimum d'une SARL constituée en RDC ?",
    options: [
      { id: 'a', texte: "1 000 000 FCFA, comme le prévoit l'article 311" },
      { id: 'b', texte: "Aucun minimum : le capital est librement fixé par les associés en tenant compte de l'objet social" },
      { id: 'c', texte: "10 000 000 FCFA" },
      { id: 'd', texte: "100 000 dollars" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 311 AUSCGIE ; arrêté du 30 décembre 2014, art. 2',
    explication: "L'article 311 fixe un million de FCFA « sauf dispositions nationales contraires ». La RDC a usé de cette réserve : le capital de la SARL « est librement fixé par les associés en tenant compte de l'objet social de la société » (arrêté interministériel du 30 décembre 2014, art. 2).",
  },
  {
    id: 'ch1-q27', question: "Quel est l'effet de la reprise, par la société immatriculée, d'un engagement pris pour son compte pendant sa formation ?",
    options: [
      { id: 'a', texte: "L'engagement reste à la charge personnelle du fondateur" },
      { id: 'b', texte: "L'engagement est réputé avoir été contracté par la société dès l'origine" },
      { id: 'c', texte: "L'engagement est annulé" },
      { id: 'd', texte: "L'engagement devient une dette des associés au prorata" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 110 AUSCGIE',
    explication: "« Les actes et engagements repris par la société régulièrement constituée et immatriculée sont réputés avoir été contractés par celle-ci dès l'origine » (art. 110). Faute de reprise, ils lui sont inopposables et leurs auteurs en répondent solidairement et indéfiniment.",
  },
  {
    id: 'ch1-q28', question: "Un fondateur a payé de sa poche des frais d'études pour le compte de la société, qui les reprend. Quelle écriture passe la société ?",
    options: [
      { id: 'a', texte: "Débit du compte de charges concerné / crédit 462 Associés, comptes courants" },
      { id: 'b', texte: "Débit 1013 / crédit 521" },
      { id: 'c', texte: "Débit 2011 / crédit 4611" },
      { id: 'd', texte: "Aucune : la dépense a été payée par le fondateur" },
    ],
    reponseCorrecte: 'a', articleRef: 'AUDCIF, Titre VII, compte 46',
    explication: "Le compte 46 est crédité des fonds mis à la disposition de la société « par le débit des comptes de trésorerie (ou de charges, s'il s'agit de frais réglés pour le compte de l'entité) ». La société constate la charge et sa dette envers le fondateur au 462.",
  },
  {
    id: 'ch1-q29', question: "Une société immatriculée le 1er septembre N clôture ses comptes au 31 décembre. Quelle peut être la durée de son premier exercice ?",
    options: [
      { id: 'a', texte: "Exactement douze mois, sans exception" },
      { id: 'b', texte: "Elle peut dépasser douze mois, le premier exercice ayant commencé au second semestre" },
      { id: 'c', texte: "Au plus six mois" },
      { id: 'd', texte: "Elle est fixée par le greffe" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 7 AUDCIF',
    explication: "L'exercice coïncide avec l'année civile. Il est exceptionnellement inférieur à douze mois pour le premier exercice débutant au premier semestre, et « peut être supérieure à douze mois pour le premier exercice commencé au cours du deuxième semestre » (art. 7 AUDCIF).",
  },
  {
    id: 'ch1-q30', question: "Dans une SAS à capital variable, les statuts fixent un plancher de capital. Quelle limite ce plancher doit-il respecter ?",
    options: [
      { id: 'a', texte: "Aucune : les statuts le fixent librement" },
      { id: 'b', texte: "Il ne peut être inférieur ni au dixième du capital stipulé dans les statuts, ni au minimum légal de la forme" },
      { id: 'c', texte: "Il doit être égal à la moitié du capital initial" },
      { id: 'd', texte: "Il doit être autorisé par le tribunal de commerce" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 269-5 AUSCGIE',
    explication: "Les statuts déterminent une somme au-dessous de laquelle le capital ne peut être réduit par les reprises d'apports ; elle « ne peut être inférieure ni au dixième du capital social stipulé dans les statuts ni au montant minimal du capital exigé pour la forme de la société ». Toute réduction au-delà est nulle (art. 269-5).",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '1.1',
    titre: "La société commerciale et l'obligation d'apport",
    navLabel: "Le contrat de société",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Août N, Kalemie, au bord du lac Tanganyika. Mme A. et M. N. veulent créer **KALEMIE LOGISTIQUE SARL** pour stocker et acheminer les marchandises débarquées au port. Avant même la signature des statuts, Mme A. loue un entrepôt, achète deux ordinateurs et règle les frais du Guichet unique de création d'entreprise. De son côté, M. N. commande un véhicule d'occasion. Le capital est fixé à 20 000 000 FC, entièrement libéré et déposé en banque. Ce chapitre suit leur projet pas à pas, de l'obligation d'apport à la clôture du premier exercice, et montre à chaque étape ce que le droit exige et ce que le comptable enregistre.",
      },
      { type: 'intertitre', texte: "1.1.1 Le contrat de société et sa traduction comptable" },
      {
        type: 'paragraphe',
        texte: "La comptabilité des sociétés commence avec la société elle-même, c'est-à-dire avec le contrat. L'article 4 de l'AUSCGIE définit la société commerciale comme celle que créent deux ou plusieurs personnes « qui conviennent, par un contrat, d'affecter à une activité des biens en numéraire ou en nature, ou de l'industrie, dans le but de partager le bénéfice ou de profiter de l'économie qui peut en résulter ». Les associés s'engagent à contribuer aux pertes dans les conditions prévues par l'Acte uniforme, et la société est créée « dans l'intérêt commun des associés ». L'article 5 admet la société unipersonnelle : dans les cas prévus par l'Acte uniforme, une seule personne, l'**associé unique**, peut créer une société par un acte écrit.",
      },
      {
        type: 'paragraphe',
        texte: "Chacun des éléments de cette définition a une traduction comptable. L'*affectation de biens* fait naître l'actif de la société : sa trésorerie de départ et ses premières immobilisations. La *contrepartie* de cette affectation, ce que la société « doit » à ses associés sans devoir le leur rembourser tant qu'elle vit, c'est le capital social, première ligne du passif. Le *partage du bénéfice* renvoie à l'affectation du résultat, et la *contribution aux pertes* aux réserves, au report à nouveau et, à la limite, à la réduction du capital. Toute la comptabilité des sociétés, de la constitution à la liquidation, se lit dans cette phrase.",
      },
      {
        type: 'filet',
        titre: "Commercialité par la forme (art. 6)",
        texte: "Le caractère commercial d'une société est déterminé par sa forme ou par son objet. Sont commerciales à raison de leur forme, et quel que soit leur objet : la société en nom collectif, la société en commandite simple, la société à responsabilité limitée, la société anonyme et la société par actions simplifiée.",
      },
      { type: 'intertitre', texte: "1.1.2 Le champ de l'Acte uniforme" },
      {
        type: 'paragraphe',
        texte: "Le champ de l'Acte uniforme est large : il s'applique à toute société commerciale dont le siège est situé sur le territoire d'un État partie, « y compris celle dans laquelle un État ou une personne morale de droit public est associé », ainsi qu'à tout groupement d'intérêt économique (art. 1er). Une société d'économie mixte de Kinshasa ou une société commerciale dont l'État congolais détient toutes les actions tient donc sa comptabilité de constitution exactement comme une société privée. L'article 1er réserve toutefois l'application des lois nationales non contraires à l'Acte uniforme : c'est par cette porte qu'entrent les textes congolais étudiés à la section 1.4.",
      },
      { type: 'intertitre', texte: "1.1.3 L'obligation d'apport" },
      {
        type: 'paragraphe',
        texte: "Le pivot du dispositif est l'**obligation d'apport** : « Chaque associé doit faire un apport à la société. Chaque associé est débiteur envers la société de tout ce qu'il s'est obligé à lui apporter en numéraire, en nature ou en industrie » (art. 37). En contrepartie, les associés reçoivent des titres émis par la société (art. 38). L'article 39 étend tout le régime des apports à ceux réalisés en cours de vie sociale, lors d'une augmentation de capital : le présent chapitre prépare donc aussi le chapitre 4. Retenez le mot *débiteur* : dès la signature des statuts, l'associé a une dette envers la société. C'est cette dette que les comptes 4611, 4612, 4613 et 109 vont suivre, jusqu'à son extinction par la libération.",
      },
      {
        type: 'carte',
        titre: "Tableau 1.1 — Les trois types d'apports, liste limitative (art. 40)",
        tableau: {
          entetes: ["Type", "Objet", "Concourt au capital ?"],
          lignes: [
            ["Apport en **numéraire**", "De l'argent", "Oui"],
            ["Apport en **nature**", "Des droits portant sur des biens mobiliers ou immobiliers, corporels ou incorporels", "Oui"],
            ["Apport en **industrie**", "Des connaissances techniques ou professionnelles ou des services", "Non (art. 50-3)"],
          ],
        },
        note: "« Tout autre apport est interdit » (art. 40 in fine). Une caution personnelle, une simple promesse de crédit ou une « influence » dans les affaires ne peuvent rémunérer aucun titre social.",
      },
      { type: 'intertitre', texte: "1.1.4 L'apport et les opérations voisines" },
      {
        type: 'paragraphe',
        texte: "L'apport se distingue enfin de deux opérations voisines, que le plan de comptes sépare avec soin. Le **prêt d'un associé** à sa société, ou les fonds qu'il lui laisse temporairement, ne sont pas des apports : ils ne donnent aucun titre, restent remboursables et s'inscrivent au compte 462 Associés, comptes courants. Les **dividendes** votés et non encore payés sont une dette ordinaire de la société envers l'associé, au compte 465. L'apport, lui, est définitif tant que dure la société et ne se retrouve qu'au passage des comptes 461 (opérations sur le capital) vers le compte 101. L'AUDCIF le dit en excluant du compte 101 « les versements et/ou retraits temporaires de fonds des associés », qui relèvent du compte 46 (Titre VII, compte 101, exclusions).",
      },
      { type: 'intertitre', texte: "1.1.5 Souscrire, appeler, libérer" },
      {
        type: 'paragraphe',
        texte: "Trois verbes doivent être employés avec précision. **Souscrire**, c'est s'engager à apporter : l'associé qui signe les statuts ou un bulletin de souscription devient débiteur de la société pour le montant souscrit. **Appeler**, c'est, pour la société, rendre exigible tout ou partie de cette dette : à la constitution, la loi fixe la fraction minimale appelée d'office, et les organes sociaux appellent ensuite le solde. **Libérer**, c'est exécuter la promesse : verser l'argent, remettre le bien, commencer les prestations. Le capital *souscrit* peut donc être plus élevé que le capital *appelé*, lui-même plus élevé que le capital *libéré*. Les subdivisions du compte 101 reproduisent exactement ces trois étages.",
      },
    ],
  },
  {
    numero: '1.2',
    titre: "La réalisation des apports : numéraire, nature, industrie",
    navLabel: "Réalisation des apports",
    blocs: [
      { type: 'intertitre', texte: "1.2.1 L'apport en numéraire et sa libération" },
      {
        type: 'paragraphe',
        texte: "L'apport en **numéraire** est réalisé par le transfert à la société de la propriété des sommes que l'associé s'est engagé à apporter ; sauf disposition contraire de l'Acte uniforme, il est **libéré intégralement lors de la constitution** (art. 41). La libération s'entend strictement : ne sont considérés comme libérés que les apports correspondant à des sommes dont la société est devenue propriétaire et qu'elle a **intégralement et définitivement encaissées** (art. 42). Une promesse, un chèque non encore encaissé ou un virement annoncé ne libèrent rien. En cas de retard, les sommes restant dues portent **de plein droit** intérêt au taux légal à compter du jour où le versement devait être effectué, sans préjudice de dommages et intérêts (art. 43). Enfin, à l'occasion d'une augmentation de capital, et à ce moment seulement, l'apport en numéraire peut être réalisé par **compensation** avec une créance certaine, liquide et exigible sur la société, à moins que les statuts ne l'interdisent (art. 44).",
      },
      {
        type: 'paragraphe',
        texte: "Le principe de libération intégrale de l'article 41 réserve les « dispositions contraires ». Ce sont elles qui ouvrent la **libération fractionnée** des sociétés de capitaux : dans la SA, les actions de numéraire sont libérées d'un quart au moins à la souscription, le surplus dans les trois ans de l'immatriculation (art. 389) ; dans la SARL, les parts de numéraire le sont de la moitié au moins, le surplus dans les deux ans (art. 311-1). Les formes pour lesquelles l'Acte uniforme ne prévoit rien, comme la SNC, restent sous la règle de principe. Comptablement, c'est cette faculté qui donne son rôle au compte 109 (section 1.8).",
      },
      { type: 'intertitre', texte: "1.2.2 L'apport en nature : propriété ou jouissance" },
      {
        type: 'carte',
        titre: "Encadré 1.1 — L'apport en nature (art. 45 à 50)",
        liste: [
          "**Réalisation** : transfert des droits réels ou personnels correspondant aux biens apportés et mise à la disposition effective de la société ; libération **intégrale** dès la constitution (art. 45).",
          "**Garanties** : l'apporteur en propriété est garant envers la société *comme un vendeur envers son acheteur* (art. 46) ; l'apporteur en jouissance, *comme un bailleur envers son preneur*. Pour les choses de genre et les biens appelés à être renouvelés, la propriété passe à la société à charge d'en rendre pareille quantité, qualité et valeur (art. 47).",
          "**Publicité** : l'apport d'un bien soumis à publicité peut être publié avant l'immatriculation, la formalité ne produisant effet rétroactif qu'à compter de celle-ci (art. 48).",
          "**Évaluation** : les associés évaluent les apports en nature ; dans les cas prévus par l'Acte uniforme, l'évaluation est contrôlée par un **commissaire aux apports**, et les statuts contiennent l'évaluation (art. 49-50).",
        ],
      },
      {
        type: 'paragraphe',
        texte: "La distinction entre apport en **propriété** et apport en **jouissance** a une conséquence comptable directe. Le bien apporté en propriété entre dans le patrimoine de la société : il est inscrit à l'actif et amorti. Le bien apporté en simple jouissance reste la propriété de l'associé, qui en retrouvera la libre disposition à la dissolution : la société n'en a que l'usage, et l'inscription d'un bien à l'actif suppose un contrôle que la simple jouissance ne lui donne pas sur ce bien. Quand un associé « apporte » un terrain, le premier réflexe du comptable est donc de lire les statuts pour savoir ce qui a été apporté : le terrain lui-même, ou seulement son usage.",
      },
      {
        type: 'paragraphe',
        texte: "Pour l'apport en jouissance d'un bien durable, la société ne comptabilise donc aucune immobilisation. Elle supporte les charges d'entretien que les statuts mettent à sa charge, et il est prudent de décrire l'usage de ce bien dans les Notes annexes, puisque le lecteur du bilan ne le verra nulle part ailleurs. Pour l'apport de choses de genre, au contraire, l'article 47 opère un transfert de propriété : un stock de ciment apporté « en jouissance » devient la propriété de la société, qui l'inscrit en stock et le consomme, à charge d'en restituer une pareille quantité, qualité et valeur à la fin de la société. Dans les deux cas, le premier travail du comptable est juridique : lire la clause d'apport et qualifier ce que la société a réellement reçu.",
      },
      {
        type: 'filet',
        titre: "L'apport en jouissance ne crée pas d'immobilisation",
        texte: "Le bien qu'un associé apporte en jouissance ne s'inscrit pas en immobilisation. L'apporteur en reste propriétaire : la société n'a qu'un droit d'usage, et elle ne comptabilise aucune immobilisation. Elle supporte seulement les charges d'entretien que les statuts mettent à sa charge. Le bien apporté en propriété, lui, entre dans son patrimoine, à l'actif, et il est amorti. La même question se pose chez KALEMIE LOGISTIQUE : si M. N. avait mis son propre camion à disposition au lieu d'en commander un, la société ne l'aurait pas inscrit à son bilan.",
      },
      { type: 'intertitre', texte: "1.2.3 L'apport en industrie" },
      {
        type: 'carte',
        titre: "Encadré 1.2 — L'apport en industrie (art. 50-1 à 50-4)",
        liste: [
          "Réalisé par la mise à disposition effective de connaissances techniques ou professionnelles ou de services ; **interdit dans les sociétés anonymes** (art. 50-1).",
          "L'apporteur doit rendre la contribution promise et compte de tous les gains réalisés par l'activité apportée ; les statuts décrivent l'apport, ses modalités de libération, la durée des prestations, le nombre de titres attribués et leurs droits (art. 50-2).",
          "Il **ne concourt pas à la formation du capital social**, mais donne lieu à des titres ouvrant droit au vote et au partage des bénéfices et de l'actif net, à charge de contribuer aux pertes, dans une **double limite de 25 %** : des droits de vote de l'ensemble, et des bénéfices, de l'actif net et des pertes (art. 50-3).",
          "Les titres d'industrie ne sont **ni cessibles ni transmissibles** et n'ont **pas de valeur nominale** (art. 50-4).",
        ],
        note: "Conséquence comptable : l'apport en industrie ne figure ni au capital ni à l'actif du bilan. Aucun compte d'immobilisation n'est mouvementé ; la rémunération de l'apporteur passe par le partage des bénéfices.",
      },
      {
        type: 'paragraphe',
        texte: "La SAS occupe une place à part : l'article 853-5 lui permet d'émettre des **actions inaliénables résultant d'apports en industrie**, les statuts déterminant leurs modalités de souscription et de répartition. C'est la forme retenue par nombre de jeunes entreprises technologiques, où un fondateur apporte son savoir-faire et les autres leur argent. Pour le comptable, la règle ne change pas : ces actions ne correspondent à aucune valeur inscrite au capital, et le capital de la SAS ne comprend que les apports en numéraire et en nature.",
      },
      { type: 'intertitre', texte: "1.2.4 Les intérêts dus par l'associé en retard" },
      {
        type: 'paragraphe',
        texte: "L'article 43 a lui aussi une traduction comptable. Les intérêts dus par l'associé en retard ne sont pas un complément d'apport : ils indemnisent la société de n'avoir pas disposé des fonds à la date convenue. Ils constituent donc un produit financier de la société, que le plan de comptes range au compte 7713 Intérêts sur créances diverses, et non une augmentation du capital ni une prime. Symétriquement, l'associé qui a versé en retard ne reçoit aucun titre supplémentaire : le nombre de titres dépend du montant souscrit, pas de la date du versement.",
      },
    ],
  },
  {
    numero: '1.3',
    titre: "Titres sociaux et capital social",
    navLabel: "Titres et capital",
    blocs: [
      { type: 'intertitre', texte: "1.3.1 Les titres sociaux" },
      {
        type: 'paragraphe',
        texte: "En contrepartie des apports, la société émet des **titres sociaux** qui représentent les droits des associés : **actions** dans les sociétés par actions, **parts sociales** dans les autres (art. 51). Ce sont des biens meubles (art. 52). L'article 53 énumère ce qu'ils confèrent : un droit sur les bénéfices *lorsque leur distribution a été décidée*, un droit sur les actifs nets lors de leur répartition, à la dissolution ou à l'occasion d'une réduction de capital, le cas échéant l'obligation de contribuer aux pertes, et le droit de participer aux votes des décisions collectives. Sauf clause ou disposition contraire, droits et obligations sont **proportionnels aux apports** (art. 54, al. 1er). Sont en revanche réputées non écrites les **clauses léonines** : attribuer à un associé la totalité du profit, l'exonérer de la totalité des pertes, l'exclure totalement du profit ou mettre à sa charge la totalité des pertes (art. 54, al. 2).",
      },
      {
        type: 'carte',
        titre: "Encadré 1.3 — Valeur nominale et circulation des titres (art. 56 à 59)",
        liste: [
          "Les titres de même catégorie émis par une société doivent avoir la **même valeur nominale** (art. 56).",
          "Les parts sociales sont **cessibles** ; les actions sont **cessibles ou négociables** (art. 57). Seules les sociétés par actions émettent des titres négociables ; l'émission ou la garantie de titres négociables par les autres formes est nulle (art. 58).",
          "En cas de cession ou de rachat prévu par l'Acte uniforme, la valeur des droits est déterminée, à défaut d'accord amiable, par **expert** désigné par les parties ou par la juridiction compétente statuant à bref délai (art. 59).",
        ],
      },
      { type: 'intertitre', texte: "1.3.2 Le capital social" },
      {
        type: 'paragraphe',
        texte: "Le **capital social**, que toute société doit avoir et indiquer dans ses statuts (art. 61), « représente le montant des apports en capital faits par les associés à la société et augmente, le cas échéant, des incorporations de réserves, de bénéfices ou de primes d'apports, d'émission ou de fusion » (art. 62). La société rémunère l'apporteur par des titres « pour une valeur égale à celle des apports ». En cas d'incorporation, elle émet des titres nouveaux ou élève le nominal des titres existants, les deux procédés pouvant être combinés (art. 63). Le capital est divisé en parts sociales ou en actions selon la forme (art. 64).",
      },
      {
        type: 'paragraphe',
        texte: "Le capital n'est pas une somme d'argent. C'est un **chiffre de référence**, inscrit dans les statuts, qui mesure l'engagement des associés et sert de gage aux créanciers dans les sociétés à risque limité. Au jour de la constitution, capital et actif net se confondent : si les associés apportent 50 000 000 FC, la société possède 50 000 000 FC de biens et doit 50 000 000 FC de capital. Dès le premier achat, le premier salaire, la première vente, l'actif se transforme et l'égalité se rompt, tandis que le capital reste figé. La différence entre les capitaux propres et le capital raconte ensuite l'histoire de la société : réserves accumulées si elle prospère, pertes reportées si elle s'appauvrit. Le chapitre 5 montrera que la loi réagit lorsque les capitaux propres tombent sous la moitié du capital.",
      },
      {
        type: 'carte',
        titre: "Tableau 1.2 — Le montant, la fixité et les variations du capital (art. 65 à 70)",
        tableau: {
          entetes: ["Règle", "Contenu"],
          lignes: [
            ["Liberté du montant (art. 65)", "Le montant du capital est librement déterminé par les associés ; l'Acte uniforme peut toutefois fixer un minimum en raison de la forme ou de l'objet."],
            ["Sanction du minimum (art. 66)", "Sous le minimum, la société en formation ne peut être valablement constituée ; si le capital est réduit ultérieurement sous le minimum, la société doit être dissoute, à moins d'être recapitalisée au moins au minimum."],
            ["Fixité de principe (art. 67)", "Le capital est fixe ; il peut être augmenté ou réduit dans les conditions prévues pour la modification des statuts. Par dérogation, il peut être variable dans les conditions des articles 269-1 et suivants."],
            ["Augmentation (art. 68)", "Par nouveaux apports ou par incorporation de réserves, de bénéfices ou de primes d'apports, d'émission ou de fusion."],
            ["Réduction (art. 69-70)", "Par remboursement aux associés d'une partie de leurs apports, en numéraire ou par attribution d'actifs, ou par imputation des pertes."],
          ],
        },
      },
      { type: 'intertitre', texte: "1.3.3 Actions et parts sociales en comptabilité" },
      {
        type: 'paragraphe',
        texte: "Pour le comptable, actions et parts sociales se traitent exactement de la même manière à la constitution : mêmes comptes 101, 109 et 461, mêmes écritures. Les différences tiennent à la circulation des titres et à l'organisation de la société, qui relèvent du droit des sociétés (UE2). La **valeur nominale**, en revanche, obéit à des règles précises. Elle est la fraction du capital que représente chaque titre : 4 000 actions pour un capital de 40 000 000 FC donnent un nominal de 10 000 FC. Elle ne dit rien de la valeur réelle du titre, qui dépendra ensuite des résultats et des perspectives de la société. Dès la première augmentation de capital, un titre de nominal 10 000 FC pourra valoir 15 000 FC, et le nouvel associé paiera la différence sous forme de prime (chapitre 4). Dans la SA, le nominal est « librement fixé par les statuts » et « exprimé en nombre entier » (art. 387).",
      },
      {
        type: 'filet',
        titre: "Capital social et trésorerie",
        texte: "Le capital ne se confond pas avec les fonds déposés en banque. Celui de KALEMIE LOGISTIQUE est de 20 000 000 FC, et ce chiffre restera inscrit dans les statuts et au passif du bilan tant qu'il ne sera pas modifié. L'argent déposé en banque le jour de la constitution sera dépensé dès les premières semaines : loyer, ordinateurs, carburant. Le capital n'est pas une somme d'argent : c'est un chiffre de référence, qui mesure l'engagement des associés et sert de gage aux créanciers. Au jour de la constitution, il correspond à la valeur des apports ; ensuite, il vit sa propre vie, indépendamment de la trésorerie.",
      },
    ],
  },
  {
    numero: '1.4',
    titre: "Le capital social en RDC : monnaie, minima et formalités",
    navLabel: "Le capital en RDC",
    blocs: [
      { type: 'intertitre', texte: "1.4.1 La monnaie du capital" },
      {
        type: 'paragraphe',
        texte: "Les montants de l'AUSCGIE sont exprimés en francs CFA. L'article 906 règle le cas des États qui, comme la RDC, n'ont pas cette monnaie : « Le franc CFA, au sens du présent Acte uniforme, constitue la monnaie de référence. Pour les États parties qui n'ont pas comme unité monétaire le franc CFA, la contre-valeur en monnaie nationale est initialement celle qui est déterminée par application de la parité en vigueur entre le franc CFA et la monnaie nationale desdits États parties le jour de l'adoption du présent Acte uniforme. » Cette contre-valeur est arrondie à l'unité supérieure, et le Conseil des ministres de l'OHADA peut réviser les montants en fonction de l'évolution économique et monétaire (art. 906, al. 2). Un seuil comme les 10 000 000 FCFA du capital minimum de la SA (art. 387) doit donc se lire, en RDC, comme sa contre-valeur en francs congolais.",
      },
      {
        type: 'paragraphe',
        texte: "La comptabilité, elle, ne connaît qu'une monnaie. L'article 17 de l'AUDCIF impose « la tenue de la comptabilité dans la langue officielle et dans l'unité monétaire ayant cours légal dans l'État partie » : en RDC, le français et le franc congolais. L'économie congolaise est pourtant largement dollarisée, et il est fréquent qu'un associé libère son apport en dollars américains. Les règles de conversion de l'AUDCIF s'appliquent alors : les biens acquis en devises sont comptabilisés en monnaie légale au cours de change du jour de l'acquisition (art. 51), et les créances et dettes en devises au cours de la date de formalisation de l'accord ou de mise à disposition des devises (art. 52). Si la créance sur l'apporteur naît au cours d'un jour et s'éteint au cours d'un autre, l'écart éventuel est une perte ou un gain de change de l'exercice (art. 53), jamais une variation du capital.",
      },
      { type: 'intertitre', texte: "1.4.2 Les minima de capital" },
      {
        type: 'carte',
        titre: "Tableau 1.3 — Les minima de capital applicables en RDC",
        tableau: {
          entetes: ["Forme", "Capital minimum", "Libération du numéraire à la souscription", "Source"],
          lignes: [
            ["SA sans appel public à l'épargne", "10 000 000 FCFA (contre-valeur en FC)", "Un quart au moins ; surplus dans les 3 ans de l'immatriculation", "Art. 387, 389"],
            ["SA faisant appel public à l'épargne", "100 000 000 FCFA (contre-valeur en FC)", "Idem", "Art. 824"],
            ["SARL", "Librement fixé par les associés, en tenant compte de l'objet social", "La moitié au moins ; surplus dans les 2 ans", "Art. 311, 311-1 ; arrêté du 30 décembre 2014, art. 2"],
            ["SAS", "Fixé par les statuts", "Selon les règles de la SA, par renvoi", "Art. 853-5"],
            ["SNC, SCS", "Aucun minimum", "Intégrale (principe de l'art. 41)", "Art. 41, 65"],
          ],
        },
        note: "L'article 311 fixe un million de FCFA pour la SARL « sauf dispositions nationales contraires ». L'arrêté interministériel du 30 décembre 2014 use de cette réserve : en RDC, le capital de la SARL « est librement fixé par les associés en tenant compte de l'objet social de la société » (art. 2).",
      },
      { type: 'intertitre', texte: "1.4.3 Le dépôt des fonds" },
      {
        type: 'paragraphe',
        texte: "Les fonds libérés ne restent pas entre les mains des fondateurs. Dans la SARL, ils font l'objet d'un dépôt immédiat, contre récépissé, en banque ou dans un établissement de crédit ou de microfinance agréé, dans un compte ouvert au nom de la société en formation, ou en l'étude d'un notaire (art. 313). En RDC, l'arrêté du 30 décembre 2014 prévoit que le bordereau de versement acquitté vaut preuve de la libération et du dépôt (art. 3). Dans la SA, le dépôt et la déclaration notariée de souscription et de versement sont étudiés au chapitre 2. Comptablement, tant que les fonds sont chez le notaire, ils ne sont pas encore à la banque de la société : c'est pourquoi l'Application 58 les fait transiter par le compte 4732 Mandataires.",
      },
      {
        type: 'paragraphe',
        texte: "Un exemple montre comment ces règles s'articulent. Les statuts d'une SARL de Lubumbashi fixent le capital à 57 000 000 FC ; un associé doit en libérer 11 400 000 FC et propose de payer 4 000 USD. Si, le jour de l'encaissement, le dollar vaut 2 850 FC (hypothèse), la banque crédite le compte de la société de 11 400 000 FC et la dette de l'associé est éteinte. Si le dollar ne vaut plus que 2 800 FC, les 4 000 USD ne produisent que 11 200 000 FC : l'associé reste débiteur de 200 000 FC, car seules sont libérées les sommes « intégralement et définitivement encaissées » (art. 42), et c'est en francs congolais que sa dette est exprimée. Le capital statutaire ne bouge pas : c'est la dette de l'apporteur, et non le capital, qui supporte le risque de change jusqu'à la libération complète.",
      },
      { type: 'intertitre', texte: "1.4.4 Les formalités de création et leur coût" },
      {
        type: 'filet',
        titre: "Le Guichet unique de création d'entreprise",
        texte: "Le décret n° 14/014 du 8 mai 2014 a créé le Guichet unique de création d'entreprise (GUCE), qui réunit notamment l'office notarial, le greffe du RCCM et l'administration des recettes non fiscales, et fixe un délai maximum de trois jours ouvrables à partir du dossier complet (art. 18). Selon la page « Procédures » de l'Agence nationale pour la promotion des investissements (mise à jour le 14 juillet 2026), le dossier d'une société comprend notamment les statuts, la déclaration de souscription et de versement du capital et la preuve de la libération du capital, et le coût de création d'une personne morale est de 110 USD avec statuts notariés, 70 USD avec statuts sous seing privé. Le détail juridique de la procédure est étudié en UE2, chapitre 1.",
      },
      {
        type: 'paragraphe',
        texte: "Ces frais de création, payés en dollars mais comptabilisés en francs congolais, sont des charges du premier exercice. Il en va de même des honoraires du notaire (6324), des frais d'actes (6325), des droits d'enregistrement (646) et du coût des annonces légales (6271 Annonces, insertions) : aucun d'eux n'augmente la valeur d'un bien de la société, et le SYSCOHADA révisé interdit désormais de les porter à l'actif (section 1.9). Pour un étudiant habitué aux anciens manuels, qui ouvraient un compte 201 Frais d'établissement, c'est le changement le plus visible de la réforme de 2017 pour la constitution des sociétés.",
      },
    ],
  },
  {
    numero: '1.5',
    titre: "L'évaluation comptable des apports",
    navLabel: "Évaluer les apports",
    blocs: [
      { type: 'intertitre', texte: "1.5.1 La valeur d'apport" },
      {
        type: 'paragraphe',
        texte: "Un apport en numéraire ne pose aucun problème d'évaluation : 1 000 000 FC apportés valent 1 000 000 FC. L'apport en nature, lui, doit être chiffré, et ce chiffre commande à la fois le nombre de titres remis à l'apporteur et la valeur d'entrée du bien dans la comptabilité de la société. L'AUDCIF tranche le second point : le coût historique des biens inscrits à l'actif est constitué par « le coût réel d'acquisition pour ceux achetés à des tiers, la **valeur d'apport** pour ceux apportés par les actionnaires/associés/membres » (art. 36). Le cadre conceptuel précise que les apports des associés ou de l'État sont retenus pour leur « valeur d'apport contrôlée dans le contrat ». La comptabilité ne réévalue donc pas l'apport : elle reprend la valeur que les statuts ont fixée, sous le contrôle prévu par l'Acte uniforme.",
      },
      {
        type: 'paragraphe',
        texte: "Cette valeur d'apport n'a aucun lien obligé avec la valeur comptable du bien chez l'apporteur. Un commerçant qui apporte à sa nouvelle SARL un camion acheté 60 000 000 FC il y a quatre ans, amorti pour moitié dans ses livres, peut l'apporter pour 35 000 000 FC si c'est sa valeur réelle au jour de l'apport. La SARL inscrit le camion à 35 000 000 FC au compte 2451 et l'amortit sur sa durée d'utilisation restante, sans tenir compte de l'historique de l'apporteur. Les amortissements antérieurs ne la suivent pas. C'est la conséquence logique de l'article 36 : pour la société, l'apport est une acquisition, dont le « prix » est payé en titres au lieu de l'être en argent.",
      },
      {
        type: 'paragraphe',
        texte: "Poursuivons l'exemple du camion apporté pour 35 000 000 FC. Si la SARL estime pouvoir l'utiliser encore cinq ans, elle l'amortit sur cette durée, soit 7 000 000 FC par an en linéaire, dotations au compte 6813 par le crédit du compte 2845, quelle que soit la durée d'amortissement que pratiquait l'apporteur. L'apporteur, lui, constate dans ses propres livres la sortie du camion pour sa valeur nette comptable de 30 000 000 FC et l'entrée de parts sociales pour 35 000 000 FC : la différence de 5 000 000 FC est pour lui un résultat de cession. Les deux comptabilités ne se regardent pas : chacune applique ses propres règles à sa propre opération, l'une comme un achat payé en titres, l'autre comme une vente payée en titres. Le chapitre 7 étudiera l'entrée des titres dans le portefeuille de l'apporteur.",
      },
      { type: 'intertitre', texte: "1.5.2 Le contrôle de la valeur d'apport" },
      {
        type: 'carte',
        titre: "Tableau 1.4 — Le contrôle de la valeur d'apport selon la forme sociale",
        tableau: {
          entetes: ["Forme", "Contrôle par un commissaire aux apports", "Sanction d'une évaluation non contrôlée ou modifiée"],
          lignes: [
            ["SARL", "Obligatoire si la valeur de l'apport, ou de l'ensemble des apports en nature, dépasse 5 000 000 FCFA ; toujours pour les avantages particuliers (art. 312)", "Associés solidairement responsables pendant 5 ans, à l'égard des tiers, de la valeur attribuée (art. 312)"],
            ["SA", "Toujours obligatoire pour les apports en nature et les avantages particuliers (art. 400)", "Étudiée au chapitre 2 (art. 401 et s.)"],
            ["Règle générale", "Dans les cas prévus par l'Acte uniforme (art. 49)", "Les statuts contiennent toujours l'évaluation (art. 50)"],
          ],
        },
        note: "Le commissaire aux apports est choisi sur la liste des commissaires aux comptes (art. 312 et 400). Son rapport « atteste que la valeur des apports correspond au moins à la valeur du nominal des parts à émettre » (art. 312, SARL). La garantie des associés ne vise que la valeur au moment de la constitution, pas son maintien.",
      },
      { type: 'intertitre', texte: "1.5.3 L'apport d'un ensemble de biens" },
      {
        type: 'paragraphe',
        texte: "Lorsque l'associé apporte non un bien isolé mais un **ensemble** (une unité de production, un fonds de commerce, une branche d'activité), l'apport comprend souvent des dettes, que la société prend en charge. L'apport est alors rémunéré pour sa **valeur nette** : biens apportés moins passif pris en charge. Dans l'Application 58, l'apporteur remet 290 000 000 de biens et la société reprend un emprunt de 50 000 000 : il reçoit des actions pour 240 000 000. Chaque bien entre à sa propre valeur d'apport (licences au 2122, terrain au 2231, bâtiment au 2311, matériel au 2411, créances au 4111), et le passif repris est crédité au compte correspondant (162 pour l'emprunt). C'est le solde de ces débits et crédits qui éteint la créance de la société sur l'apporteur.",
      },
      {
        type: 'paragraphe',
        texte: "Deux précautions complètent l'analyse. D'abord, les **créances clients apportées** ne valent que ce que la société en encaissera : si certaines sont douteuses, l'évaluation doit en tenir compte au jour de l'apport, car la garantie de l'article 46 joue comme en matière de vente. Ensuite, les frais que la société supporte pour réaliser l'apport, droits de mutation, honoraires, sont des frais d'acquisition au sens de l'article 37 de l'AUDCIF lorsqu'ils se rattachent directement à l'entrée d'une immobilisation déterminée. L'article 37 inclut en effet dans le coût d'acquisition d'une immobilisation « les frais d'acquisition, notamment les droits d'enregistrement, les honoraires, les commissions, les frais d'actes ». Les frais de constitution de la société elle-même, qui ne se rattachent à aucun bien, restent des charges.",
      },
      {
        type: 'filet',
        titre: "La prime d'apport à la constitution",
        texte: "Le compte 1052 Primes d'apport enregistre « la différence entre la valeur du/des bien(s) apporté(s) et la valeur nominale des actions ou parts rémunérant l'apport » (AUDCIF, compte 105). À la constitution, les titres sont en principe émis pour une valeur égale à celle des apports (art. 63) et le nominal est fixé en conséquence : la prime apparaît surtout lors des augmentations de capital en nature, lorsque les titres existants valent plus que leur nominal. Elle est étudiée au chapitre 4.",
      },
    ],
  },
  {
    numero: '1.6',
    titre: "Le dispositif comptable : les comptes du capital et des apporteurs",
    navLabel: "Comptes du capital",
    blocs: [
      { type: 'intertitre', texte: "1.6.1 Les comptes du capital et des apporteurs" },
      {
        type: 'paragraphe',
        texte: "Le plan de comptes SYSCOHADA suit pas à pas la chronologie juridique de la constitution : promesse, appel, libération. Le compte **101 Capital social** se subdivise pour suivre l'avancement de la libération, le compte **109** isole la fraction souscrite mais non appelée, et le compte **461 Apporteurs, opérations sur le capital** suit la relation avec chaque apporteur. Selon l'AUDCIF, le capital social « traduit le montant des valeurs apportées par les associés » ; dans les sociétés, le capital initial correspond à la valeur des apports effectués à la création, « tels qu'ils figurent dans les statuts », et il « représente la valeur nominale des actions ou parts sociales » (Titre VII, compte 101).",
      },
      {
        type: 'carte',
        titre: "Tableau 1.5 — Les comptes du cycle du capital",
        tableau: {
          entetes: ["Compte", "Intitulé", "Rôle"],
          lignes: [
            ["1011", "Capital souscrit, non appelé", "Crédité à la souscription (promesses d'apport)"],
            ["1012", "Capital souscrit, appelé, non versé", "Reçoit 1011 au moment de l'appel"],
            ["1013", "Capital souscrit, appelé, versé, non amorti", "Reçoit 1012 lors de la libération effective"],
            ["1014", "Capital souscrit, appelé, versé, amorti", "Fraction du capital amortie (chapitre 5)"],
            ["1018", "Capital souscrit, soumis à des conditions particulières", "Actions de préférence, certificats d'investissement, incorporations particulières"],
            ["109", "Apporteurs, capital souscrit, non appelé", "Débité de la fraction non appelée (libération fractionnée)"],
            ["105", "Primes liées au capital social (1051 émission, 1052 apport, 1053 fusion, 1054 conversion)", "Excédent du prix d'émission ou de la valeur d'apport sur le nominal (chapitre 4)"],
          ],
        },
      },
      {
        type: 'carte',
        titre: "Tableau 1.6 — Les comptes d'apporteurs (461 et 467)",
        tableau: {
          entetes: ["Compte", "Intitulé", "Rôle"],
          lignes: [
            ["4611", "Apporteurs, apports en nature", "Promesse d'apport en nature"],
            ["4612", "Apporteurs, apports en numéraire", "Promesse d'apport en numéraire"],
            ["4613", "Apporteurs, capital appelé, non versé", "Créance exigible sur les apporteurs après appel"],
            ["4615", "Apporteurs, versements reçus sur augmentation de capital", "Fonds reçus lors d'une augmentation (chapitre 4)"],
            ["4616", "Apporteurs, versements anticipés", "Fonds reçus avant l'appel"],
            ["4617", "Apporteurs défaillants", "Associé n'ayant pas répondu à l'appel (chapitre 2)"],
            ["4619", "Apporteurs, capital à rembourser", "Réduction ou amortissement du capital (chapitre 5)"],
            ["467", "Apporteurs, restant dû sur capital appelé", "Créance personnalisée par apporteur lors des appels"],
          ],
        },
        note: "Ne pas confondre 461 (opérations sur le capital) avec 462 Associés, comptes courants (fonds laissés ou mis temporairement à la disposition de la société) ni avec 465 Associés, dividendes à payer.",
      },
      { type: 'intertitre', texte: "1.6.2 Le fonctionnement du compte 101" },
      {
        type: 'paragraphe',
        texte: "Deux textes décrivent le mécanisme, avec une nuance qu'il faut connaître. Le commentaire du compte 101 dans l'AUDCIF indique que le 1011 est crédité des promesses « par le débit du compte 109 » et qu'au moment de l'appel, « le compte 467 (Apporteurs, restant dû sur capital appelé) est débité du même montant par le crédit du 109 » ; le compte 109 représente « la créance globale de la société sur les apporteurs », personnalisée pour chacun au moment des appels. Les Applications 58 et 59 du Guide d'application, elles, font transiter la créance d'appel par le compte **4613**. Les deux lectures décrivent la même réalité : une créance non exigible (109) qui devient exigible à l'appel. Ce cours suit les Applications du Guide, dont les écritures sont chiffrées ; en entreprise, on peut ouvrir des sous-comptes par associé du 4613 ou du 467 pour suivre chaque apporteur.",
      },
      {
        type: 'paragraphe',
        texte: "Le fonctionnement du compte 101 distingue aussi selon la forme sociale. Il est crédité des apports « par le débit du 46 (Apporteurs, Associés et Groupe) pour les apports en espèces ou nature, pour les sociétés de personnes et GIE », et « par le débit du 109 (Apporteurs, capital souscrit, non appelé) pour les sociétés de capitaux » (AUDCIF, compte 101). La raison est juridique : dans une SNC, les apports en numéraire sont libérés intégralement à la constitution (art. 41), si bien qu'il n'existe jamais de capital non appelé à isoler. Le compte 109 n'a de raison d'être que là où l'Acte uniforme autorise une libération fractionnée, c'est-à-dire dans les SA, les SAS et les SARL.",
      },
      { type: 'intertitre', texte: "1.6.3 La présentation au bilan et les sous-comptes" },
      {
        type: 'filet',
        titre: "Le capital et le capital non appelé au bilan",
        texte: "La maquette du bilan réserve au passif la rubrique **CA Capital** (comptes 101 à 104) et, juste en dessous, la rubrique **CB Apporteurs, capital non appelé** (compte 109), « portée en négatif ». Le capital figure donc pour son montant souscrit, diminué de la fraction que la société n'a pas encore appelée. Le compte 4613 ou 467, créance exigible, relève en revanche de l'actif circulant : les soldes débiteurs du compte 46 alimentent la rubrique BJ Autres créances, et ses soldes créditeurs, comme les versements anticipés du 4616, la rubrique DM Autres dettes.",
      },
      {
        type: 'paragraphe',
        texte: "En pratique, les logiciels comptables ouvrent des sous-comptes par apporteur : 46131 pour le premier associé, 46132 pour le deuxième, et ainsi de suite. Ce découpage n'est pas une coquetterie. Il permet de savoir à tout moment qui a libéré quoi, de calculer les intérêts de retard de l'article 43 pour le seul associé défaillant, de justifier la Note 13 des Notes annexes, qui présente le capital associé par associé, et de préparer le calcul du premier dividende, qui dépend du montant libéré de chaque titre (art. 145). La balance des comptes 4613 doit à tout moment correspondre à l'état des versements tenu par la société ou par le notaire.",
      },
      {
        type: 'filet',
        titre: "Les avances d'associés ne sont pas des apports",
        texte: "Les sommes qu'un associé prête à la société ou lui laisse temporairement ne se créditent pas au compte 101. Ces fonds ne sont pas des apports : ils ne donnent aucun titre, restent remboursables et s'inscrivent au compte 462 Associés, comptes courants. L'AUDCIF exclut expressément du compte 101 « les versements et/ou retraits temporaires de fonds des associés ». Les dépenses que Mme A. a réglées de ses deniers pour KALEMIE LOGISTIQUE suivent la même logique : la société lui doit ces sommes, au 4621, et non un supplément de capital.",
      },
    ],
  },
  {
    numero: '1.7',
    titre: "Comptabilisation de la constitution : libération intégrale",
    navLabel: "Libération intégrale",
    blocs: [
      { type: 'intertitre', texte: "1.7.1 Le schéma de l'Application 58" },
      {
        type: 'paragraphe',
        texte: "L'Application 58 du Guide d'application déroule le schéma complet. Une entité est constituée le 19/09/N au capital de **300 000 000** (30 000 actions de 10 000). L'apporteur en nature X apporte : licences 30 000 000, terrain bâti 20 000 000, bâtiment 150 000 000, matériel 50 000 000, créances clients 40 000 000, la société prenant en charge un emprunt bancaire de 50 000 000. Son actif net apporté est de 290 000 000 − 50 000 000 = **240 000 000**. Les autres associés souscrivent le solde en numéraire : 300 000 000 − 240 000 000 = **60 000 000**. Le notaire perçoit 5 000 000 d'honoraires et 500 000 de frais d'actes.",
      },
      {
        type: 'carte',
        titre: "Exemple 1.1 — Libération intégrale, 1re étape : promesses d'apport et appel (19/09/N)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["4611", "", "Apporteurs, apports en nature", "240 000 000", ""],
            ["4612", "", "Apporteurs, apports en numéraire", "60 000 000", ""],
            ["", "1011", "Capital souscrit, non appelé", "", "300 000 000"],
            ["4613", "", "Apporteurs, capital appelé, non versé", "300 000 000", ""],
            ["", "4611", "Apporteurs, apports en nature", "", "240 000 000"],
            ["", "4612", "Apporteurs, apports en numéraire", "", "60 000 000"],
            ["1011", "", "Capital souscrit, non appelé", "300 000 000", ""],
            ["", "1012", "Capital souscrit, appelé, non versé", "", "300 000 000"],
          ],
        },
        note: "La totalité du capital étant appelée d'emblée, les comptes 4611 et 4612 sont aussitôt soldés par 4613, et 1011 est viré à 1012.",
      },
      {
        type: 'carte',
        titre: "Exemple 1.2 — Libération intégrale, 2e étape : réalisation des apports (20/09/N)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["2122", "", "Licences", "30 000 000", ""],
            ["2231", "", "Terrains bâtis", "20 000 000", ""],
            ["2311", "", "Bâtiment industriel", "150 000 000", ""],
            ["2411", "", "Matériel industriel", "50 000 000", ""],
            ["4111", "", "Clients", "40 000 000", ""],
            ["", "162", "Emprunts auprès des établissements de crédit", "", "50 000 000"],
            ["", "4613", "Apporteurs, capital appelé, non versé", "", "240 000 000"],
            ["4732", "", "Mandataires : notaire (fonds numéraire)", "60 000 000", ""],
            ["", "4613", "Apporteurs, capital appelé, non versé", "", "60 000 000"],
            ["1012", "", "Capital souscrit, appelé, non versé", "300 000 000", ""],
            ["", "1013", "Capital souscrit, appelé, versé, non amorti", "", "300 000 000"],
          ],
        },
        note: "L'apport en nature entre pour sa valeur nette : les biens sont débités à leur valeur d'apport, le passif transmis (162) est crédité, la différence soldant la créance 4613 de l'apporteur en nature. Les fonds des apporteurs en numéraire sont d'abord entre les mains du notaire, mandataire (4732).",
      },
      {
        type: 'carte',
        titre: "Exemple 1.3 — Libération intégrale, 3e étape : versement des fonds par le notaire, sous déduction des frais (30/09/N)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["521", "", "Banques", "54 500 000", ""],
            ["6324", "", "Honoraires des professions réglementées", "5 000 000", ""],
            ["6325", "", "Frais d'actes et de contentieux", "500 000", ""],
            ["", "4732", "Mandataires : notaire", "", "60 000 000"],
          ],
        },
      },
      { type: 'intertitre', texte: "1.7.2 L'analyse du schéma" },
      {
        type: 'paragraphe',
        texte: "Trois observations éclairent ce schéma. D'abord, chaque étape juridique a son écriture : la signature des statuts crée la créance (4611, 4612 contre 1011), l'appel la rend exigible (4613 et virement 1011 vers 1012), la réalisation l'éteint (biens ou fonds contre 4613, et virement 1012 vers 1013). Ensuite, les comptes de capital ne changent jamais de montant : 300 000 000 passent seulement de 1011 à 1012 puis à 1013, comme une marchandise qui change d'étagère sans changer de valeur. Enfin, le notaire ne verse que 54 500 000 : la société ne « perd » pas 5 500 000 de capital, elle a payé des frais avec une partie de ses fonds, et ces frais sont des charges.",
      },
      {
        type: 'paragraphe',
        texte: "Après ces écritures, le bilan de départ de l'entité est simple à dresser. À l'actif : immobilisations incorporelles 30 000 000 (licences), corporelles 220 000 000 (terrain, bâtiment, matériel), créances clients 40 000 000 et banque 54 500 000, soit 344 500 000. Au passif : capital 300 000 000, emprunt 50 000 000, et un résultat provisoire négatif de 5 500 000 correspondant aux frais, soit 344 500 000. L'égalité entre capital et actif net est déjà rompue le jour même de la constitution, par l'effet des seuls frais.",
      },
      { type: 'intertitre', texte: "1.7.3 Les frais de constitution et les pièces justificatives" },
      {
        type: 'filet',
        titre: "Les frais de constitution ne s'immobilisent plus",
        texte: "Le SYSCOHADA révisé a **supprimé les charges immobilisées** : l'AUDCIF exclut du compte 21 « les frais d'établissement, les frais de recherche, les frais de pré-exploitation », qui vont en charges de la classe 6. Pour les entités qui avaient immobilisé de tels frais avant la révision, l'Application 123 organise la transition : virement du solde au compte 4751 Compte actif, puis reprise en charges sur l'exercice ou étalement sur la durée résiduelle, cinq ans au maximum.",
      },
      {
        type: 'paragraphe',
        texte: "Chaque écriture de constitution s'appuie sur une pièce justificative, comme l'exige l'article 17 de l'AUDCIF. L'AUDCIF énumère, pour le compte 101, les « éléments de contrôle » : statuts de la société, déclaration notariée de souscription et de versement, virements bancaires et relevés de banque, procès-verbal de l'assemblée des associés. Pour les apports en nature, s'ajoutent le rapport du commissaire aux apports et les actes de transfert : titre foncier pour un terrain, carte grise pour un véhicule, acte de cession de créances. Un dossier de constitution complet, classé et référencé, est le premier dossier permanent que l'auditeur ouvrira, et il servira pendant toute la vie de la société.",
      },
      {
        type: 'filet',
        titre: "Les pièces justificatives de la constitution",
        texte: "Chaque écriture de constitution doit reposer sur une pièce justificative, comme l'exige l'article 17 de l'AUDCIF. Face au dossier de KALEMIE LOGISTIQUE, l'auditeur demande les statuts signés, l'état des actes et engagements annexé, le récépissé de dépôt des fonds, l'extrait d'immatriculation et, pour chaque dépense reprise, la facture ou le reçu. Il rapproche le montant du capital inscrit au 101 de celui des statuts, et le solde de la banque du récépissé de dépôt. Une écriture sans pièce, dans une constitution, est le premier signal d'alerte.",
      },
    ],
  },
  {
    numero: '1.8',
    titre: "Comptabilisation de la constitution : libération fractionnée",
    navLabel: "Libération fractionnée",
    blocs: [
      { type: 'intertitre', texte: "1.8.1 Le schéma de l'Application 59" },
      {
        type: 'paragraphe',
        texte: "Lorsque l'Acte uniforme le permet pour la forme sociale considérée, par dérogation au principe de libération intégrale de l'article 41, le capital en numéraire peut n'être libéré que partiellement à la souscription, le solde étant appelé plus tard par les organes sociaux. Le compte **109 Apporteurs, capital souscrit, non appelé** entre alors en scène : il isole, au débit, la fraction promise mais pas encore exigible, en regard du crédit de 1011. L'Application 59 du Guide en donne le schéma : constitution le 15/11/N, 2 500 actions de numéraire de 10 000 libérées **de moitié** à la souscription ; la seconde moitié est appelée le 10/03/N+1 et versée le 15/04/N+1.",
      },
      {
        type: 'carte',
        titre: "Exemple 1.4 — Libération fractionnée : souscription et appel de la première moitié (15/11/N)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["109", "", "Apporteurs, capital souscrit, non appelé", "12 500 000", ""],
            ["4613", "", "Apporteurs, capital appelé, non versé", "12 500 000", ""],
            ["", "1011", "Capital souscrit, non appelé", "", "12 500 000"],
            ["", "1012", "Capital souscrit, appelé, non versé", "", "12 500 000"],
          ],
        },
        note: "Capital total : 2 500 × 10 000 = 25 000 000, dont moitié appelée (12 500 000, en 4613) et moitié non appelée (12 500 000, en 109). Le compte 101 est crédité en deux fractions : 1011 pour le non-appelé, 1012 pour l'appelé.",
      },
      {
        type: 'carte',
        titre: "Exemple 1.5 — Libération fractionnée : le cycle complet en quatre temps (Application 59)",
        tableau: {
          entetes: ["Date", "Écriture", "Montant"],
          lignes: [
            ["30/11/N : libération de la 1re moitié", "Débit 521 Banques / crédit 4613 ; puis débit 1012 / crédit 1013", "12 500 000"],
            ["10/03/N+1 : appel de la 2e moitié", "Débit 4613 / crédit 109 ; puis débit 1011 / crédit 1012", "12 500 000"],
            ["15/04/N+1 : versement de la 2e moitié", "Débit 521 Banques / crédit 4613 ; puis débit 1012 / crédit 1013", "12 500 000"],
            ["Situation finale", "Capital entièrement libéré : 1013 = 25 000 000 ; 109, 1011, 1012 et 4613 soldés", "—"],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Lecture du bilan en cours de libération",
        texte: "Tant que la seconde moitié n'est pas appelée, le capital social figure au passif pour son montant total souscrit (1011 + 1012 + 1013), et le compte 109, de sens débiteur, vient en retranchement (rubrique CB) : il matérialise la créance conditionnelle de la société sur ses apporteurs. Après l'appel, la créance devenue exigible migre de 109 vers 4613 ; après le versement, elle s'éteint. Les versements reçus par anticipation, avant tout appel, se logent au crédit du compte 4616 Apporteurs, versements anticipés.",
      },
      { type: 'intertitre', texte: "1.8.2 Les conséquences juridiques de la libération fractionnée" },
      {
        type: 'paragraphe',
        texte: "La libération fractionnée a des conséquences juridiques que le comptable doit signaler. Dans la SA, tant que le capital n'est pas entièrement libéré, la société ne peut ni augmenter son capital, sauf par apports en nature, ni émettre des obligations, et les actions non intégralement libérées doivent rester nominatives (art. 389). Les délais légaux, trois ans pour la SA et deux ans pour la SARL, courent à compter de l'immatriculation : un solde débiteur ancien au compte 109 doit alerter l'auditeur. Enfin, l'associé qui ne répond pas à l'appel devient un « apporteur défaillant » (compte 4617), dont le régime propre à la SA est étudié au chapitre 2.",
      },
      {
        type: 'paragraphe',
        texte: "Le premier dividende, s'il est prévu par les statuts, « est calculé comme un intérêt sur le montant libéré des actions » (art. 145, étudié au chapitre 3). Une action de 10 000 libérée de moitié ne reçoit donc que l'intérêt statutaire de 5 000 tant que le solde n'est pas versé. Le suivi exact de la libération, action par action et apporteur par apporteur, conditionne ainsi le calcul des dividendes : c'est une raison supplémentaire de tenir des sous-comptes par apporteur.",
      },
      { type: 'intertitre', texte: "1.8.3 La situation à la clôture" },
      {
        type: 'paragraphe',
        texte: "Reprenons l'Application 59 au 31/12/N, date de clôture située entre la libération de la première moitié et l'appel de la seconde. Le compte 1013 présente un solde créditeur de 12 500 000 et le compte 1011 un solde créditeur de 12 500 000 : la rubrique CA Capital affiche 25 000 000. Le compte 109, débiteur de 12 500 000, figure juste en dessous, en négatif, dans la rubrique CB. Les capitaux propres ne comprennent donc que 12 500 000 de capital effectivement appelé, ce qui correspond à la banque encaissée. Le 4613 est soldé, puisque la fraction appelée a été versée le 30/11/N. Le lecteur du bilan voit d'un coup d'œil que la moitié des promesses reste à appeler, et la Note 13 lui en donne le délai.",
      },
    ],
  },
  {
    numero: '1.9',
    titre: "La société en formation et le premier exercice",
    navLabel: "Société en formation",
    blocs: [
      { type: 'intertitre', texte: "1.9.1 La société en formation et la reprise des engagements" },
      {
        type: 'paragraphe',
        texte: "Entre l'idée de créer une société et son immatriculation, il se passe des semaines, parfois des mois. Pendant ce temps, les fondateurs agissent : ils louent un local, commandent du matériel, paient un géomètre ou un conseil. Or la société n'a pas encore d'existence juridique : elle ne jouit de la personnalité qu'à compter de son immatriculation au RCCM (art. 98). L'Acte uniforme distingue deux périodes. La société est **en formation** tant qu'elle n'est pas constituée (art. 100) ; elle est **constituée** à compter de la signature des statuts ou de leur adoption par l'assemblée générale constitutive (art. 101), mais son existence n'est opposable aux tiers qu'après l'immatriculation.",
      },
      {
        type: 'carte',
        titre: "Tableau 1.7 — La reprise des engagements (art. 106 à 113)",
        tableau: {
          entetes: ["Situation", "Condition de la reprise", "Article"],
          lignes: [
            ["Engagements pris pendant la formation, société sans assemblée constitutive", "État des actes et engagements annexé aux statuts ; la signature emporte reprise dès l'immatriculation", "Art. 106, 107"],
            ["Engagements pris pendant la formation, reprise après la constitution", "Approbation par l'assemblée générale ordinaire, les auteurs des actes ne votant pas", "Art. 108"],
            ["Société avec assemblée constitutive", "Résolution spéciale de l'assemblée constitutive", "Art. 109"],
            ["Engagements des dirigeants entre constitution et immatriculation", "Mandat déterminé dans les statuts, par acte séparé ou en assemblée constitutive ; l'immatriculation emporte reprise", "Art. 111"],
            ["Actes excédant le mandat ou étrangers à lui", "Approbation par l'assemblée générale ordinaire", "Art. 112, 113"],
          ],
        },
        note: "Effet de la reprise : les actes repris « sont réputés avoir été contractés par celle-ci dès l'origine ». À défaut, ils sont inopposables à la société et leurs auteurs « sont tenus solidairement et indéfiniment par les obligations qu'ils comportent » (art. 110).",
      },
      { type: 'intertitre', texte: "1.9.2 La traduction comptable de la reprise" },
      {
        type: 'paragraphe',
        texte: "La règle de l'article 110 a une conséquence comptable nette. Puisque les engagements repris sont réputés contractés par la société dès l'origine, c'est la société, et non le fondateur, qui les enregistre dans sa comptabilité, en principe à leur date et pour leur montant. Un loyer payé par un fondateur avant l'immatriculation devient une charge de loyer de la société (622) ; un ordinateur acheté par lui pour la société entre à l'actif de celle-ci (2441) ; une facture de conseil non encore payée devient une dette fournisseur (401). À l'inverse, un engagement qui n'a pas été repris ne concerne pas la société : il reste l'affaire personnelle de ses auteurs et ne doit laisser aucune trace dans ses comptes.",
      },
      {
        type: 'paragraphe',
        texte: "Il reste à identifier qui a payé. Lorsqu'un fondateur a avancé les fonds de sa poche, la société lui doit ces sommes : c'est une dette envers un associé, qui se loge au compte **462 Associés, comptes courants**. L'AUDCIF le prévoit expressément : le compte 46 est « crédité des fonds mis ou laissés temporairement à la disposition de la société, par le débit des comptes de trésorerie (ou de charges, s'il s'agit de frais réglés pour le compte de l'entité) ». Si le fondateur accepte ensuite de convertir sa créance en capital lors d'une augmentation, il libérera ses titres par compensation (art. 44, chapitre 4) ; s'il en demande le remboursement, la société débitera le 462 par le crédit de la banque.",
      },
      {
        type: 'carte',
        titre: "Exemple 1.6 — La reprise des engagements dans les comptes de la société",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["622", "", "Locations, charges locatives (loyer payé par le fondateur)", "1 800 000", ""],
            ["2441", "", "Matériel de bureau (ordinateurs achetés par le fondateur)", "4 500 000", ""],
            ["6324", "", "Honoraires (conseil juridique, non encore payé)", "900 000", ""],
            ["", "4621", "Associés, comptes courants : principal (fondateur)", "", "6 300 000"],
            ["", "401", "Fournisseurs (conseil juridique)", "", "900 000"],
          ],
        },
        note: "Écriture passée à la date de l'immatriculation, pour des engagements figurant dans l'état annexé aux statuts (art. 107). Les montants sont illustratifs.",
      },
      { type: 'intertitre', texte: "1.9.3 Le premier exercice" },
      {
        type: 'paragraphe',
        texte: "Les opérations de la période de formation tombent dans le **premier exercice**. L'AUDCIF fixe l'exercice à douze mois, coïncidant avec l'année civile, mais prévoit deux assouplissements pour le premier : sa durée est « exceptionnellement inférieure à douze mois pour le premier exercice débutant au cours du premier semestre de l'année civile », et elle « peut être supérieure à douze mois pour le premier exercice commencé au cours du deuxième semestre de l'année » (art. 7). Une société immatriculée en mars N clôt donc son premier exercice le 31 décembre N, après dix mois ; une société immatriculée en septembre N peut le clore le 31 décembre N+1, après seize mois, ce qui évite de dresser des comptes pour quelques semaines d'activité.",
      },
      {
        type: 'paragraphe',
        texte: "Le premier compte de résultat porte ainsi toutes les charges de démarrage : frais de constitution, loyers et honoraires de la période de formation repris par la société, charges des premiers mois d'activité. Il est fréquent qu'il soit déficitaire. Ce n'est pas un signe de mauvaise gestion : c'est la conséquence normale de la suppression des charges immobilisées par le SYSCOHADA révisé, qui fait apparaître dans le résultat du premier exercice des dépenses que l'ancien système étalait sur plusieurs années. Le lecteur des états financiers en tiendra compte avant de juger la rentabilité d'une jeune société.",
      },
      {
        type: 'paragraphe',
        texte: "Les fonds libérés pendant la formation suivent un chemin particulier. Dans la SARL, ils sont déposés, dès leur libération, sur un compte ouvert au nom de la société en formation, ou chez un notaire (art. 313) ; dans la SA, le chapitre 2 montrera que leur retrait n'est possible qu'après l'immatriculation. La société n'en a donc la libre disposition qu'une fois née. En comptabilité, on enregistre toutefois la constitution à la date où les statuts sont signés, puisque c'est à cette date que naissent les créances sur les apporteurs, et l'on constate ensuite les versements au fur et à mesure.",
      },
      {
        type: 'filet',
        titre: "L'engagement non repris : la commande de M. N.",
        texte: "La commande du véhicule par M. N., non mentionnée dans l'état des actes annexé aux statuts, n'est pas reprise à l'immatriculation. Elle reste son affaire personnelle : faute de reprise, l'engagement est inopposable à la société, et M. N. en répond personnellement (art. 110). La société peut encore le reprendre après sa constitution, si l'assemblée ordinaire l'approuve en connaissance de cause, M. N. ne prenant pas part au vote (art. 108). Tant que cette approbation n'existe pas, le comptable n'enregistre rien. Le jour où elle intervient, l'engagement est réputé contracté par la société dès l'origine.",
      },
    ],
  },
  {
    numero: '1.10',
    titre: "Le capital variable et la présentation du capital",
    navLabel: "Capital variable et bilan",
    blocs: [
      { type: 'intertitre', texte: "1.10.1 Le capital variable" },
      {
        type: 'paragraphe',
        texte: "Le capital est fixe par principe, mais l'article 67 renvoie à une dérogation : le **capital variable** des articles 269-1 à 269-7. Il peut être stipulé dans les statuts des SA ne faisant pas appel public à l'épargne et des SAS « que le capital social est susceptible soit d'augmentation par des versements successifs des associés ou l'admission d'associés nouveaux, soit de diminution par la reprise totale ou partielle des apports effectués » (art. 269-1). La mention « à capital variable » s'ajoute alors à la forme sociale dans tous les actes et documents destinés aux tiers (art. 269-2), et les statuts organisent eux-mêmes les modalités de souscription, de libération et de reprise des apports (art. 269-2-1).",
      },
      {
        type: 'carte',
        titre: "Encadré 1.4 — Les règles du capital variable (art. 269-3 à 269-7)",
        liste: [
          "Les actes constatant les augmentations ou diminutions opérées dans ce cadre ne sont assujettis ni au dépôt ni à la publication ; le droit d'opposition des créanciers en cas de réduction non motivée par des pertes est écarté (art. 269-3).",
          "Les statuts peuvent donner aux dirigeants ou à l'assemblée le droit de s'opposer au transfert des titres ; tout transfert réalisé en violation est nul (art. 269-4).",
          "Les statuts fixent un **plancher** au-dessous duquel le capital ne peut être réduit par les reprises d'apports ; il ne peut être inférieur ni au dixième du capital stipulé dans les statuts, ni au minimum légal de la forme. Toute réduction au-delà est nulle (art. 269-5).",
          "Chaque associé peut se retirer à tout moment, sauf convention contraire ; l'exclusion peut être décidée à la majorité statutaire. L'associé sortant reste tenu pendant cinq ans des obligations existant à son retrait, dans la limite des sommes qui lui ont été restituées (art. 269-6).",
          "La société n'est dissoute ni par la mort, ni par le retrait, ni par l'incapacité d'un associé ; elle continue de plein droit entre les autres (art. 269-7).",
        ],
      },
      {
        type: 'paragraphe',
        texte: "Comptablement, le capital variable ne crée pas de comptes nouveaux : il rend seulement plus fréquentes des écritures que les chapitres 4 et 5 étudient en détail. L'admission d'un nouvel associé qui verse 5 000 000 FC se traduit, pour la part nominale, par un débit de la banque et un crédit du 1013, éventuellement complété d'une prime au 1051 si les statuts fixent un prix d'entrée supérieur au nominal, selon le schéma de l'Application 60. Le retrait d'un associé suit le schéma de la réduction par remboursement de l'Application 63 : débit 1013 par le crédit du 4619 Apporteurs, capital à rembourser à la date du retrait, puis débit 4619 par le crédit de la banque au paiement. Le contrôle essentiel porte sur le plancher de l'article 269-5 : avant chaque remboursement, le comptable vérifie que le capital restant ne descend pas sous le seuil statutaire.",
      },
      {
        type: 'paragraphe',
        texte: "Le capital variable répond à des besoins concrets : sociétés dont les associés entrent et sortent souvent, groupements de producteurs organisés en SAS, jeunes entreprises qui accueillent des investisseurs par tranches successives. Il évite de réunir une assemblée extraordinaire et d'accomplir des formalités de publicité à chaque mouvement. Mais la souplesse a un prix pour les tiers : le capital qu'ils lisent dans les statuts n'est plus une garantie figée. C'est pourquoi l'Acte uniforme compense l'absence d'opposition par deux protections, le plancher statutaire et la responsabilité quinquennale de l'associé sortant dans la limite de ce qui lui a été restitué. Pour le comptable, le capital du bilan est alors celui qui résulte des mouvements réellement enregistrés, et il peut différer du chiffre inscrit dans les statuts.",
      },
      { type: 'intertitre', texte: "1.10.2 Application : la constitution de KALEMIE LOGISTIQUE" },
      {
        type: 'paragraphe',
        texte: "Retour à KALEMIE LOGISTIQUE, dont le cas 5 détaille les écritures. Le 25 août N, la société est immatriculée : le capital de 20 000 000 FC est entièrement libéré et déposé en banque, les dépenses de formation avancées par Mme A. sont reprises dans ses comptes avec une dette de 6 199 500 FC au 4621, et la commande du véhicule attend l'approbation de l'assemblée. Immatriculée au second semestre, la société peut prolonger son premier exercice jusqu'au 31 décembre N+1 (art. 7 AUDCIF). En quelques écritures, elle a parcouru tout ce chapitre : l'obligation d'apport, la libération, le dépôt des fonds, la reprise des engagements de la période de formation et le premier exercice. Les chapitres suivants la verront grandir, emprunter, distribuer ses premiers dividendes, et peut-être un jour fusionner ou se dissoudre.",
      },
      { type: 'intertitre', texte: "1.10.3 La présentation du capital dans les états financiers" },
      {
        type: 'carte',
        titre: "Tableau 1.8 — Le capital dans les états financiers",
        tableau: {
          entetes: ["Élément", "Comptes", "Présentation"],
          lignes: [
            ["Capital", "101 à 104", "Passif, rubrique CA"],
            ["Apporteurs, capital non appelé", "109", "Passif, rubrique CB, en négatif"],
            ["Primes liées au capital", "105", "Passif, rubrique CD"],
            ["Capital appelé, non versé", "4613, 467 (soldes débiteurs du 46)", "Actif circulant, rubrique BJ Autres créances"],
            ["Versements anticipés", "4616 (solde créditeur du 46)", "Passif circulant, rubrique DM Autres dettes"],
            ["Tableau des flux de trésorerie", "Variation des comptes 10 (hors 106 et 109), du 467 et du 4581", "Ligne « Augmentation de capital par apport nouveau », flux de financement"],
          ],
        },
        note: "Rubriques CA, CB, CD, BJ et DM : maquette du bilan du SYSCOHADA révisé. Ligne du TFT : logique des postes et masses, Troisième partie du Guide d'application.",
      },
      {
        type: 'paragraphe',
        texte: "La constitution est la première opération que les états financiers d'une société décriront. La Note 13 des Notes annexes, consacrée au capital, présente pour chaque associé la nature, le nombre et le montant de ses actions ou parts, puis une ligne « Apporteurs, capital non appelé » ; ses commentaires officiels demandent d'indiquer si possible le montant du capital à la constitution et, pour le capital non appelé, le délai restant pour l'appeler. Les contrôleurs vérifient la concordance entre le capital inscrit au bilan, les statuts et les pièces de souscription. Les « éléments de contrôle » que l'AUDCIF énumère pour le compte 101 en fournissent la liste : « statuts de la société ; déclaration notariée de souscription et de versement ; virements bancaires et relevés de banque ; procès-verbal de l'assemblée des associés ». Pour le compte 109, il ajoute que le compte 1011 doit présenter un « solde opposé et de montant identique ». Un comptable rigoureux fait ces rapprochements dès la première clôture.",
      },
      {
        type: 'paragraphe',
        texte: "Les outils présentés dans ce chapitre servent dans tout le module. Les comptes 101, 109 et 461 reviendront dans chaque opération sur le capital : au chapitre 2 pour les incidents de libération propres à la SARL et à la SA, au chapitre 4 pour les augmentations, au chapitre 5 pour les réductions et l'amortissement, au chapitre 8 pour les fusions, qui ne sont rien d'autre qu'un apport en nature d'un patrimoine entier. La méthode ne change pas : identifier l'étape juridique (promesse, appel, libération, remboursement), en déduire la créance ou la dette entre la société et ses associés, et faire passer le capital d'une subdivision à l'autre sans jamais en modifier le montant sans décision régulière.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas1',
    titre: "KIVU AGRO SA : constitution avec apports mixtes",
    contexte: "KIVU AGRO SA est constituée le 01/03/N au capital de 500 000 000 FC (50 000 actions de 10 000 FC), intégralement appelé à la constitution. L'associé fondateur M. K. apporte une unité de transformation : bâtiment industriel 220 000 000, matériel 130 000 000, stock de matières premières 30 000 000, et la société prend en charge un emprunt bancaire de 80 000 000 attaché à l'unité. Les autres actionnaires souscrivent le solde en numéraire, versé entre les mains du notaire. Celui-ci reverse les fonds le 15/03/N sous déduction de ses honoraires (7 000 000) et des frais d'actes (1 000 000).",
    questions: [
      { num: 1, enonce: "Calculez l'actif net apporté par M. K. et le montant à souscrire en numéraire par les autres actionnaires.", correction: "Biens apportés : 220 000 000 + 130 000 000 + 30 000 000 = 380 000 000. Passif transmis : 80 000 000. Actif net apporté = 300 000 000 : c'est pour cette valeur que M. K. est rémunéré en actions (art. 63 : titres émis « pour une valeur égale à celle des apports »), soit 30 000 actions. Numéraire à souscrire = 500 000 000 − 300 000 000 = 200 000 000, soit 20 000 actions." },
      { num: 2, enonce: "Passez les écritures de promesse d'apport et d'appel au 01/03/N.", correction: "Promesses : débit 4611 Apporteurs, apports en nature 300 000 000 ; débit 4612 Apporteurs, apports en numéraire 200 000 000 ; crédit 1011 Capital souscrit, non appelé 500 000 000. Appel immédiat de la totalité : débit 4613 Apporteurs, capital appelé, non versé 500 000 000 / crédit 4611 300 000 000 et crédit 4612 200 000 000 ; puis virement débit 1011 / crédit 1012 Capital souscrit, appelé, non versé 500 000 000 (schéma de l'Application 58)." },
      { num: 3, enonce: "Passez l'écriture de réalisation de l'apport en nature.", correction: "Débit 2311 Bâtiments industriels 220 000 000 ; débit 2411 Matériel industriel 130 000 000 ; débit 321 Matières A (matières premières) 30 000 000 ; crédit 162 Emprunts auprès des établissements de crédit 80 000 000 ; crédit 4613 300 000 000. La créance de la société sur M. K. est soldée par la remise des biens, nette du passif pris en charge. Chaque bien entre à sa valeur d'apport (art. 36 AUDCIF), quel que soit son coût d'origine chez M. K." },
      { num: 4, enonce: "Passez les écritures relatives au numéraire : réception par le notaire, virement de capital, puis reversement du 15/03/N.", correction: "Réception par le mandataire : débit 4732 Mandataires 200 000 000 / crédit 4613 200 000 000. Le capital étant alors entièrement libéré, virement débit 1012 / crédit 1013 Capital souscrit, appelé, versé, non amorti 500 000 000. Reversement du 15/03/N : débit 521 Banques 192 000 000 ; débit 6324 Honoraires des professions réglementées 7 000 000 ; débit 6325 Frais d'actes et de contentieux 1 000 000 ; crédit 4732 200 000 000." },
      { num: 5, enonce: "L'évaluation de l'apport de M. K. doit-elle être contrôlée ? Qui répond de sa valeur ?", correction: "Oui. Dans une SA, la valeur des apports en nature doit toujours être contrôlée par un commissaire aux apports, choisi sur la liste des commissaires aux comptes et désigné à l'unanimité des futurs associés ou, à défaut, par la juridiction compétente (art. 400) ; les statuts contiennent l'évaluation (art. 50). M. K. est en outre garant envers la société comme un vendeur envers son acheteur (art. 46) : si le matériel se révélait affecté d'un vice caché, la société pourrait agir contre lui." },
    ],
  },
  {
    id: 'cas2',
    titre: "SANKURU DISTRIBUTION SARL : libération fractionnée",
    contexte: "SANKURU DISTRIBUTION SARL est constituée le 01/06/N avec un capital de 60 000 000 FC (6 000 parts de numéraire de 10 000 FC), libéré de moitié à la souscription, les fonds étant versés directement en banque. Le solde est appelé le 01/02/N+1 et versé le 01/03/N+1. Un associé, Mme T. (500 parts), verse la totalité de son apport dès la souscription.",
    questions: [
      { num: 1, enonce: "La libération de moitié est-elle régulière dans une SARL ? Jusqu'à quand le solde peut-il être appelé ?", correction: "Oui : les parts de numéraire sont libérées, lors de la souscription, de la moitié au moins de leur valeur nominale, et le surplus en une ou plusieurs fois dans un délai de deux ans à compter de l'immatriculation (art. 311-1). L'appel du 01/02/N+1 respecte ce délai, quelle que soit la date exacte de l'immatriculation, postérieure au 01/06/N." },
      { num: 2, enonce: "Passez les écritures de souscription et d'appel de la première moitié au 01/06/N.", correction: "Fraction appelée : 30 000 000 ; fraction non appelée : 30 000 000. Écritures (schéma de l'Application 59) : débit 109 Apporteurs, capital souscrit, non appelé 30 000 000 ; débit 4613 Apporteurs, capital appelé, non versé 30 000 000 ; crédit 1011 Capital souscrit, non appelé 30 000 000 ; crédit 1012 Capital souscrit, appelé, non versé 30 000 000." },
      { num: 3, enonce: "Comment traiter le versement de Mme T., qui libère la totalité de ses 500 parts (5 000 000) alors que seule la moitié est appelée ?", correction: "La moitié appelée (2 500 000) éteint sa part de la créance 4613. La moitié non appelée mais versée (2 500 000) est un versement anticipé, porté au crédit du 4616 Apporteurs, versements anticipés jusqu'à l'appel du solde. Écriture : débit 521 Banques 5 000 000 / crédit 4613 2 500 000 et crédit 4616 2 500 000. Les autres associés versent 27 500 000 : débit 521 / crédit 4613 ; puis virement débit 1012 / crédit 1013 30 000 000." },
      { num: 4, enonce: "Passez les écritures de l'appel du solde (01/02/N+1) et de son versement (01/03/N+1).", correction: "Appel : débit 4613 30 000 000 / crédit 109 30 000 000, et virement débit 1011 / crédit 1012 30 000 000. Imputation du versement anticipé : débit 4616 2 500 000 / crédit 4613 2 500 000. Versement des autres associés : débit 521 27 500 000 / crédit 4613 27 500 000. Enfin, virement débit 1012 / crédit 1013 30 000 000 : le capital de 60 000 000 est entièrement libéré ; 109, 1011, 1012, 4613 et 4616 sont soldés." },
      { num: 5, enonce: "Au 31/12/N, comment le capital se présente-t-il au bilan ?", correction: "Rubrique CA Capital : 60 000 000 (1013 pour 30 000 000 et 1011 pour 30 000 000). Rubrique CB Apporteurs, capital non appelé : − 30 000 000 (compte 109, porté en négatif). Le versement anticipé de Mme T. (4616, 2 500 000, solde créditeur) figure en rubrique DM Autres dettes. La Note 13 indiquera le délai restant pour appeler le capital non appelé." },
    ],
  },
  {
    id: 'cas3',
    titre: "Cabinet MWEHU & Associés : l'apport en industrie",
    contexte: "Trois personnes projettent une société de conseil : Mme M. apporte 40 000 000 FC en numéraire, M. W. apporte du matériel informatique évalué à 20 000 000 FC, et M. H., ingénieur réputé, souhaite apporter uniquement son savoir-faire et s'engager à animer les missions pendant cinq ans. Les fondateurs hésitent entre la SA, la SARL et la SAS ; ils envisagent d'attribuer à M. H. 30 % des droits de vote et 35 % des bénéfices.",
    questions: [
      { num: 1, enonce: "L'apport de M. H. est-il un apport au sens de l'AUSCGIE ? Quelles formes l'admettent ?", correction: "Oui : l'apport de connaissances techniques ou professionnelles ou de services est l'apport en industrie, troisième type admis par l'article 40. La SA est exclue : l'article 50-1 interdit les apports en industrie dans les sociétés anonymes, et les actions de SA ne peuvent en représenter (art. 389). La SAS les admet expressément, sous forme d'actions inaliénables (art. 853-5). Les fondateurs peuvent aussi faire entrer M. H. autrement, par un contrat de travail ou de prestation." },
      { num: 2, enonce: "Le projet d'attribuer à M. H. 30 % des droits de vote et 35 % des bénéfices est-il conforme ?", correction: "Non, sur les deux points. L'article 50-3 plafonne les droits de vote attachés aux titres d'industrie à 25 % de l'ensemble, et la part totale attachée à ces titres à 25 % des bénéfices, de l'actif net et des pertes. Les stipulations devront être ramenées à 25 % au plus." },
      { num: 3, enonce: "Quel est le capital social, et comment l'apport de M. H. y participe-t-il ?", correction: "Capital = apports en numéraire et en nature : 40 000 000 + 20 000 000 = 60 000 000. L'apport en industrie ne concourt pas à la formation du capital (art. 50-3, al. 1er) : M. H. reçoit des titres ouvrant droit au vote et au partage, mais son apport n'est inscrit ni au capital ni à l'actif. Aucune écriture d'immobilisation n'est passée." },
      { num: 4, enonce: "Passez l'écriture de réalisation de l'apport de M. W. et dites à quelle valeur le matériel entre en comptabilité.", correction: "Débit 2441 Matériel de bureau 20 000 000 / crédit 4613 (ou directement le compte d'apporteur ouvert à la souscription) 20 000 000. Le matériel entre à sa valeur d'apport (art. 36 AUDCIF), fixée par les statuts, même si M. W. l'avait acheté plus cher ou l'avait déjà amorti dans ses propres livres. Si la forme retenue est une SARL, un commissaire aux apports est obligatoire, la valeur de l'apport dépassant l'équivalent de 5 000 000 FCFA (art. 312)." },
      { num: 5, enonce: "Une clause du projet de statuts stipule que Mme M. sera « exonérée de toute contribution aux pertes ». Qu'en pensez-vous ?", correction: "Clause léonine : l'article 54, alinéa 2, répute non écrites les clauses exonérant un associé de la totalité des pertes. La société resterait valable, mais la clause tomberait, et la répartition redeviendrait proportionnelle aux apports (art. 54, al. 1er), sauf autre clause licite." },
    ],
  },
  {
    id: 'cas4',
    titre: "TSHOPO SARLU : retard de versement et frais de constitution",
    contexte: "TSHOPO SARLU est constituée le 10/01/N par M. B., associé unique, qui souscrit 15 000 000 FC en numéraire, intégralement appelés et exigibles le jour même. Il ne verse que 10 000 000 ce jour-là ; le solde de 5 000 000 n'est versé que le 10/07/N. On retient un taux d'intérêt légal de 8 % l'an (hypothèse). La société a payé le 31/01/N par chèque : honoraires du conseil juridique 1 200 000, frais d'actes 300 000 et une annonce légale 150 000.",
    questions: [
      { num: 1, enonce: "La constitution d'une société par une seule personne est-elle possible ?", correction: "Oui : l'article 5 prévoit que la société peut être créée, dans les cas prévus par l'Acte uniforme, par une seule personne dénommée « associé unique », par un acte écrit. La SARL unipersonnelle en est l'illustration classique, et son capital est librement fixé en RDC (arrêté du 30 décembre 2014, art. 2)." },
      { num: 2, enonce: "Quelles sont les conséquences juridiques du retard de versement des 5 000 000 ?", correction: "L'article 43 s'applique de plein droit : les sommes restant dues portent intérêt au taux légal depuis le jour où le versement devait être effectué, sans mise en demeure, sans préjudice de dommages et intérêts. Intérêts dus : 5 000 000 × 8 % × 6/12 = 200 000. Jusqu'au 10/07/N, le capital n'est libéré qu'à hauteur de 10 000 000 (art. 42)." },
      { num: 3, enonce: "Passez les écritures du 10/01/N.", correction: "Souscription et appel intégral : débit 4612 / crédit 1011 15 000 000 ; débit 4613 / crédit 4612 15 000 000 ; débit 1011 / crédit 1012 15 000 000. Versement partiel : débit 521 Banques 10 000 000 / crédit 4613 10 000 000, puis virement débit 1012 / crédit 1013 10 000 000, à hauteur des seules sommes versées. Le 4613 conserve un solde débiteur de 5 000 000, créance exigible sur l'associé." },
      { num: 4, enonce: "Passez les écritures du 10/07/N (versement du solde et intérêts de retard).", correction: "Versement : débit 521 5 000 000 / crédit 4613 5 000 000, puis débit 1012 / crédit 1013 5 000 000 : 1013 atteint 15 000 000. Intérêts de retard encaissés : débit 521 200 000 / crédit 7713 Intérêts sur créances diverses 200 000. Ils rémunèrent le retard dans la mise à disposition des fonds et ne touchent pas le capital." },
      { num: 5, enonce: "Comptabilisez les frais du 31/01/N et justifiez leur traitement.", correction: "Débit 6324 Honoraires des professions réglementées 1 200 000 ; débit 6325 Frais d'actes et de contentieux 300 000 ; débit 6271 Annonces, insertions 150 000 ; crédit 521 1 650 000. Ce sont des charges de l'exercice : le SYSCOHADA révisé a supprimé les charges immobilisées, et l'AUDCIF exclut les frais d'établissement du compte 21. Une entité qui détiendrait encore d'anciens frais immobilisés les traite selon l'Application 123 (compte 4751, reprise ou étalement sur cinq ans au plus)." },
    ],
  },
  {
    id: 'cas5',
    titre: "KALEMIE LOGISTIQUE SARL : la société en formation",
    contexte: "Mme A. et M. N. créent KALEMIE LOGISTIQUE SARL. Pendant la formation, Mme A. paie de ses deniers : trois mois de loyer d'un entrepôt (2 400 000 FC), deux ordinateurs (3 600 000 FC) et les frais du GUCE, 70 USD pour des statuts sous seing privé, au cours de 2 850 FC le dollar (hypothèse). M. N. commande de son côté, sans en parler à Mme A., un véhicule d'occasion pour 45 000 000 FC, payable à la livraison. Les statuts, signés le 20/08/N, ont en annexe un état des actes et engagements qui mentionne le loyer, les ordinateurs et les frais du GUCE, mais pas le véhicule. La société est immatriculée le 25/08/N ; son capital de 20 000 000 FC est entièrement libéré et déposé en banque.",
    questions: [
      { num: 1, enonce: "Quels engagements la société reprend-elle, et par quel mécanisme ?", correction: "La SARL est constituée sans assemblée constitutive : l'état des actes et engagements est annexé aux statuts, et la signature des statuts et de cet état emporte reprise, dès l'immatriculation, des actes qui y sont indiqués (art. 106 et 107). Le loyer, les ordinateurs et les frais du GUCE sont donc repris au 25/08/N. Le véhicule n'y figure pas : il n'est pas repris." },
      { num: 2, enonce: "Passez l'écriture de reprise dans les comptes de la société.", correction: "Frais du GUCE : 70 × 2 850 = 199 500 FC. Débit 622 Locations, charges locatives 2 400 000 ; débit 2441 Matériel de bureau 3 600 000 ; débit 6325 Frais d'actes et de contentieux 199 500 ; crédit 4621 Associés, comptes courants : Mme A. 6 199 500. Mme A. ayant payé de ses deniers, la société lui doit ces sommes : le compte 46 est crédité, selon l'AUDCIF, « par le débit des comptes de charges, s'il s'agit de frais réglés pour le compte de l'entité »." },
      { num: 3, enonce: "Quel est le sort de la commande du véhicule ? La société peut-elle encore la reprendre ?", correction: "Faute de reprise, l'engagement est inopposable à la société, et M. N. en est tenu personnellement, solidairement et indéfiniment avec les autres auteurs éventuels (art. 110). La société peut encore le reprendre postérieurement à sa constitution, à condition qu'il soit approuvé par l'assemblée générale ordinaire, pleinement informée, M. N. ne prenant pas part au vote et ses voix n'étant pas comptées (art. 108). Tant que cette approbation n'est pas intervenue, aucune écriture ne doit figurer dans les comptes de la société." },
      { num: 4, enonce: "L'assemblée approuve la reprise le 10/10/N ; le véhicule est livré et payé par la société le 15/10/N. Comptabilisez.", correction: "Repris, l'engagement est réputé contracté par la société dès l'origine (art. 110). À la livraison : débit 2451 Matériel automobile 45 000 000 / crédit 521 Banques 45 000 000 (ou crédit 481 Fournisseurs d'investissements si le paiement était différé). Le véhicule entre à son coût d'acquisition (art. 36 et 37 AUDCIF) et sera amorti à compter de sa mise en service." },
      { num: 5, enonce: "La société clôt au 31 décembre. Quelle sera la durée de son premier exercice, et que devient la créance de Mme A. ?", correction: "Le premier exercice commençant au second semestre (immatriculation le 25/08/N), sa durée « peut être supérieure à douze mois » (art. 7 AUDCIF) : les associés peuvent le clore au 31/12/N+1, soit environ seize mois, ou dès le 31/12/N. La créance de Mme A. (6 199 500) reste au 4621 jusqu'à son remboursement (débit 4621 / crédit 521) ; elle pourrait aussi servir à libérer des titres lors d'une future augmentation de capital, par compensation (art. 44)." },
    ],
  },
  {
    id: 'cas6',
    titre: "MBANDAKA SOLAIRE SAS à capital variable",
    contexte: "Les statuts de MBANDAKA SOLAIRE SAS stipulent un capital variable. Le capital figurant dans les statuts est de 40 000 000 FC (4 000 actions de 10 000 FC), entièrement libéré ; les statuts fixent le plancher à 30 000 000 FC et prévoient que les nouveaux associés entrent au prix de 12 000 FC par action. Au cours de l'exercice N : le 01/04/N, un nouvel associé, M. E., souscrit et libère 500 actions en numéraire ; le 01/09/N, l'associée Mme F., qui détient 1 200 actions, demande son retrait et le remboursement de ses apports à leur valeur nominale ; le remboursement est payé le 30/09/N.",
    questions: [
      { num: 1, enonce: "La SAS pouvait-elle adopter un capital variable ? Quelles mentions et quelles limites s'imposent ?", correction: "Oui : le capital variable peut être stipulé dans les statuts des SA ne faisant pas appel public à l'épargne et des SAS (art. 269-1). Les actes et documents destinés aux tiers doivent ajouter à la forme sociale la mention « à capital variable » (art. 269-2). Le plancher de 30 000 000 respecte l'article 269-5 : il n'est pas inférieur au dixième du capital statutaire (4 000 000), et la SAS n'a pas de minimum légal propre, son capital étant fixé par les statuts (art. 853-5, 853-3 écartant l'art. 387 al. 1er)." },
      { num: 2, enonce: "Comptabilisez l'entrée de M. E. le 01/04/N.", correction: "Prix : 500 × 12 000 = 6 000 000, dont nominal 5 000 000 et prime 1 000 000. Selon le schéma de l'Application 60, en encaissement direct : débit 521 Banques 6 000 000 / crédit 1013 Capital souscrit, appelé, versé, non amorti 5 000 000 et crédit 1051 Primes d'émission 1 000 000. Le capital passe à 45 000 000. Cette augmentation n'est assujettie ni au dépôt ni à la publication (art. 269-3)." },
      { num: 3, enonce: "Le retrait de Mme F. est-il possible au regard du plancher ?", correction: "Remboursement au nominal : 1 200 × 10 000 = 12 000 000. Capital après retrait : 45 000 000 − 12 000 000 = 33 000 000, supérieur au plancher de 30 000 000 : le retrait est possible (art. 269-5 et 269-6). Si le capital avait été de 40 000 000 (sans l'entrée de M. E.), il serait tombé à 28 000 000, sous le plancher : la réduction aurait été nulle au-delà de la limite statutaire (art. 269-5, al. 3), et le retrait n'aurait pu être que partiel." },
      { num: 4, enonce: "Comptabilisez le retrait et le remboursement.", correction: "Selon le schéma de l'Application 63 : le 01/09/N, débit 1013 12 000 000 / crédit 4619 Apporteurs, capital à rembourser 12 000 000 ; le 30/09/N, débit 4619 12 000 000 / crédit 521 Banques 12 000 000. Le droit d'opposition des créanciers prévu en cas de réduction non motivée par des pertes ne s'applique pas (art. 269-3)." },
      { num: 5, enonce: "Mme F. peut-elle encore être poursuivie par un créancier de la société après son départ ? Comment le capital apparaît-il au bilan du 31/12/N ?", correction: "Oui : l'associé qui se retire reste tenu, pendant cinq ans, envers les associés et envers les tiers, de toutes les obligations existant au moment de son retrait, mais seulement dans la limite des sommes qui lui ont été restituées (art. 269-6), soit 12 000 000 au plus. Au bilan du 31/12/N : rubrique CA Capital 33 000 000 ; rubrique CD Primes liées au capital 1 000 000 ; aucune rubrique CB, le capital étant entièrement libéré. La Note 13 retrace les entrées et les remboursements de l'exercice." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 1,
  id: 'ue3-chapitre-1',
  titre: "La constitution des sociétés : apports et comptabilisation",
  sousTitre: "AUSCGIE révisé, art. 4-6, 37-70, 97-113 et 269-1 à 269-7 · AUDCIF, art. 7, 17, 36-37 · SYSCOHADA révisé, Applications 58, 59 et 123",
  infoBulle: "Le contrat de société et l'obligation d'apport, la réalisation des apports en numéraire, en nature et en industrie, les titres sociaux et le capital, le capital en RDC (monnaie, minima, GUCE), l'évaluation comptable des apports, les comptes 101, 109 et 461, la libération intégrale et fractionnée, la société en formation et le premier exercice, le capital variable et la présentation du capital dans les états financiers.",
  loiRef: "Art. 4-6, 37-70, 97-113, 269-1 à 269-7, 311-313, 387-389, 400, 853-5 et 906 AUSCGIE · art. 7, 17, 36, 37, 51, 52 AUDCIF · arrêté du 30 décembre 2014 · décret n° 14/014",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Définir la société commerciale et l'obligation d'apport, et distinguer les trois types d'apports (art. 4-6, 37-40 AUSCGIE)",
    "Maîtriser le régime de réalisation des apports : libération, retard, compensation, garanties, apport en industrie et ses plafonds (art. 41-50-4)",
    "Situer les règles congolaises : monnaie de référence et de tenue des comptes, minima de capital, dépôt des fonds et GUCE",
    "Évaluer comptablement un apport en nature à sa valeur d'apport et identifier le contrôle requis (art. 36 AUDCIF ; art. 312 et 400 AUSCGIE)",
    "Manier le dispositif comptable de la constitution : cycle 1011 → 1012 → 1013, comptes 109, 461x et 467",
    "Comptabiliser une constitution en libération intégrale (Application 58) et fractionnée (Application 59)",
    "Traiter les engagements de la société en formation et le premier exercice (art. 106-113 AUSCGIE ; art. 7 AUDCIF)",
    "Appliquer le régime du capital variable et présenter le capital dans le bilan et les Notes annexes",
  ],
  sections: SECTIONS,
  aRetenir: [
    "La société commerciale naît d'un contrat d'affectation de biens ou d'industrie en vue de partager le bénéfice ou de profiter de l'économie, avec engagement de contribuer aux pertes (art. 4) ; l'associé unique est admis dans les cas prévus (art. 5). Chaque associé est débiteur de son apport (art. 37).",
    "Trois apports seulement : numéraire, nature, industrie ; tout autre apport est interdit (art. 40). Numéraire et nature sont libérés intégralement à la constitution, sauf dérogation (art. 41, 45) ; seul l'encaissement définitif libère (art. 42), et le retard fait courir l'intérêt légal de plein droit (art. 43).",
    "L'apport en industrie est interdit dans la SA, admis dans la SAS en actions inaliénables ; il ne concourt pas au capital et est plafonné à 25 % des droits de vote et à 25 % des bénéfices, de l'actif net et des pertes (art. 50-1 à 50-4, 853-5).",
    "Le capital représente les apports en capital, augmentés le cas échéant des incorporations (art. 62) ; il est fixe par principe, sauf capital variable (art. 67), et les clauses léonines sont réputées non écrites (art. 54).",
    "En RDC, le franc CFA est la monnaie de référence des seuils de l'AUSCGIE, convertis en francs congolais (art. 906) ; la comptabilité est tenue en francs congolais (art. 17 AUDCIF), les apports en devises étant convertis au cours du jour (art. 51-52). Le capital de la SARL est librement fixé (arrêté du 30 décembre 2014, art. 2).",
    "Un bien apporté entre à l'actif pour sa valeur d'apport (art. 36 AUDCIF), contrôlée par un commissaire aux apports toujours dans la SA (art. 400), au-delà de 5 000 000 FCFA dans la SARL (art. 312) ; un apport d'ensemble est rémunéré pour sa valeur nette du passif repris.",
    "Cycle comptable : 1011 (souscrit non appelé) → 1012 (appelé non versé) → 1013 (appelé versé) ; promesses en 4611/4612, créance d'appel en 4613 (ou 467), fraction non appelée en 109, présentée en négatif sous le capital (rubrique CB), versements anticipés en 4616.",
    "Libération : un quart au moins dans la SA (solde sous trois ans), la moitié au moins dans la SARL (solde sous deux ans), à compter de l'immatriculation (art. 389, 311-1).",
    "Les frais de constitution sont des charges (6324, 6325, 6271, 646) : le SYSCOHADA révisé a supprimé les charges immobilisées ; les anciens soldes transitent par le compte 4751 (Application 123).",
    "Les engagements repris par la société sont réputés contractés par elle dès l'origine (art. 110) et entrent dans ses comptes, la dette envers le fondateur qui a payé allant au 462 ; le premier exercice peut dépasser douze mois s'il commence au second semestre (art. 7 AUDCIF).",
    "Le capital variable, ouvert aux SA sans appel public à l'épargne et aux SAS, dispense de publicité les variations, écarte l'opposition des créanciers, mais impose un plancher statutaire d'au moins un dixième du capital et du minimum légal (art. 269-1 à 269-7).",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)", precision: "30 janvier 2014, J.O. OHADA n° spécial du 4 février 2014 ; art. 1, 4-6, 37-70, 97-113, 145, 269-1 à 269-7, 311-313, 387-389, 400, 824, 853-3, 853-5 et 906" },
    { genre: 'texte', intitule: "Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF)", precision: "26 janvier 2017 ; art. 7, 17, 36, 37, 51 à 53 ; Titre V (cadre conceptuel) ; Titre VII, comptes 101, 105, 109, 21 et 46 ; Titre IX, Note annexe 13" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, Guide d'application", precision: "Applications 58 (libération intégrale), 59 (libération fractionnée), 60 (augmentation en numéraire), 63 (réduction par remboursement) et 123 (première application : frais d'établissement)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, plan de comptes et maquette des états financiers", precision: "comptes 101, 105, 109, 461, 462, 467, 4732, 4751 ; rubriques CA, CB, CD, BJ et DM du bilan" },
    { genre: 'texte', intitule: "Arrêté interministériel n° 002/CAB/MIN/JGS&DH/014 et n° 243/CAB/MIN/FINANCES/2014 du 30 décembre 2014 déterminant la forme des statuts et le capital social de la société à responsabilité limitée", precision: "art. 2 et 3" },
    { genre: 'texte', intitule: "Décret n° 14/014 du 8 mai 2014 portant création, organisation et fonctionnement du Guichet unique de création d'entreprise", precision: "art. 18" },
    { genre: 'article', auteur: "Agence nationale pour la promotion des investissements (ANAPI)", titre: "Créer une entreprise en RDC : procédures, exigences et opportunités", support: "anapi.cd, page « Procédures »", precision: "mise à jour du 14 juillet 2026, consultée le 24 septembre 2026" },
    { genre: 'ouvrage', auteur: "Mapapa Mbangala A., Nkoy Mbangala C. et Mensah Freitas C.", titre: "Comptabilité des sociétés OHADA", editeur: "Droit Afrique", lieu: "s.l.", annee: "2026" },
    { genre: 'ouvrage', auteur: "Nzoimbengene Luyindula B. D.", titre: "Comptabilité des sociétés suivant le système comptable OHADA révisé", editeur: "2e éd., à compte d'auteur", lieu: "s.l.", annee: "2025" },
    { genre: 'ouvrage', auteur: "Dobill M.", titre: "Comptabilité OHADA, tome 3 : comptabilité des sociétés", editeur: "Karthala", lieu: "Paris", annee: "2013" },
    { genre: 'ouvrage', auteur: "Pougoué P.-G. (dir.)", titre: "Encyclopédie du droit OHADA", editeur: "Lamy", lieu: "Paris", annee: "2011" },
    { genre: 'ouvrage', auteur: "Diouf N., Masamba Makela R., Pougoué P.-G. et Sawadogo F. M. (coord.)", titre: "Code vert OHADA 2025. Traité et actes uniformes commentés et annotés", editeur: "Juriscope", lieu: "Poitiers", annee: "2025" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE révisé du 30 janvier 2014 · AUDCIF du 26 janvier 2017 · SYSCOHADA révisé, Guide d'application et plan de comptes · arrêté interministériel du 30 décembre 2014 · décret n° 14/014 du 8 mai 2014 · ANAPI (2026).",
}

export default chapitre
