// Chapitre 3 du module UE3, Comptabilité des sociétés : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
//
// Réécriture approfondie (septembre 2026). Sources lues pendant la rédaction :
// - AUSCGIE révisé du 30 janvier 2014 : art. 137 à 146 (états financiers,
//   réserves, dividendes), 269 (dépôt des états financiers), 346 à 349
//   (SARL), 430 à 432 (rémunération des administrateurs), 546 et 558-559
//   (SA), 754, 756 et 778-13 (droit au dividende), 853-11 (SAS), 889 à
//   890-1 (infractions), skill auscgie-acte-uniforme ;
// - AUDCIF : Titre VII, comptes 11, 12 et 13 ; SYSCOHADA révisé,
//   Application 65, plan de comptes (111 à 1188, 121, 129, 130, 441, 447,
//   465, 6581, 891) et logique du tableau des flux (dividendes versés),
//   skills audcif-acte-uniforme et syscohada ;
// - loi n° 23/053 du 30 novembre 2023 (IS et IRPP) : art. 56 et 57 (taux
//   et impôt minimum), 72 à 76 et 81 (revenus des capitaux mobiliers), 120
//   (retenue de 20 %) ; arrêté ministériel n° 008/CAB/MIN/FINANCES/2025 du
//   19 février 2025 ; LPF, art. 18 bis et 57 bis modifié par la loi de
//   finances n° 25/060 ; conventions RDC-Afrique du Sud et RDC-Belgique,
//   art. 10 ; skill fiscalite-rdc (socle 2026).
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch3-q1', question: "Qui établit et arrête les états financiers de synthèse à la clôture de l'exercice ?",
    options: [
      { id: 'a', texte: "L'assemblée générale" },
      { id: 'b', texte: "Le gérant, le conseil d'administration ou l'administrateur général, selon le cas" },
      { id: 'c', texte: "Le commissaire aux comptes" },
      { id: 'd', texte: "L'administration fiscale" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 137 AUSCGIE',
    explication: "« À la clôture de chaque exercice, le gérant ou le conseil d'administration ou l'administrateur général, selon le cas, établit et arrête les états financiers de synthèse » (art. 137). L'assemblée les approuve ensuite ; le commissaire aux comptes les certifie.",
  },
  {
    id: 'ch3-q2', question: "Dans quel délai l'assemblée statuant sur les états financiers doit-elle se tenir ?",
    options: [
      { id: 'a', texte: "Trois mois après la clôture" },
      { id: 'b', texte: "Six mois après la clôture" },
      { id: 'c', texte: "Neuf mois après la clôture" },
      { id: 'd', texte: "Douze mois après la clôture" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 140 AUSCGIE',
    explication: "L'assemblée statuant sur les états financiers « doit obligatoirement se tenir dans les six (6) mois de la clôture de l'exercice » ; les documents sont adressés aux commissaires aux comptes quarante-cinq jours au moins avant (art. 140). Dans la SARL, les gérants peuvent demander une prorogation au juge (art. 348).",
  },
  {
    id: 'ch3-q3', question: "Dans quel délai les états financiers approuvés doivent-ils être déposés au RCCM ?",
    options: [
      { id: 'a', texte: "Dans le mois qui suit leur approbation" },
      { id: 'b', texte: "Dans les six mois de la clôture" },
      { id: 'c', texte: "Avant le 30 avril" },
      { id: 'd', texte: "Aucun dépôt n'est requis" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 269 et 890-1 AUSCGIE',
    explication: "Les sociétés commerciales déposent au RCCM, « dans le mois qui suit leur approbation par l'organe compétent », le bilan, le compte de résultat, le tableau financier et l'état annexé (art. 269). Le défaut de dépôt par les dirigeants est pénalement visé (art. 890-1).",
  },
  {
    id: 'ch3-q4', question: "Quel est le taux de l'impôt sur les sociétés en RDC pour l'exercice 2026 ?",
    options: [
      { id: 'a', texte: "25 %" },
      { id: 'b', texte: "30 % du bénéfice net imposable, avec un impôt minimum de 1 % du chiffre d'affaires déclaré" },
      { id: 'c', texte: "35 %" },
      { id: 'd', texte: "20 %" },
    ],
    reponseCorrecte: 'b', articleRef: 'Loi n° 23/053, art. 56 et 57',
    explication: "Le taux de l'IS est de 30 % du bénéfice net imposable (art. 56) ; l'impôt minimum de 1 % du chiffre d'affaires déclaré s'applique lorsque les résultats sont déficitaires ou que l'impôt serait inférieur (art. 57). La loi de finances 2026 ne modifie ni l'un ni l'autre.",
  },
  {
    id: 'ch3-q5', question: "Quel compte enregistre la charge d'impôt sur les bénéfices de l'exercice ?",
    options: [
      { id: 'a', texte: "641 Impôts et taxes directs" },
      { id: 'b', texte: "891 Impôts sur les bénéfices de l'exercice, par le crédit du 441" },
      { id: 'c', texte: "465 Associés, dividendes à payer" },
      { id: 'd', texte: "1301 Résultat en instance d'affectation" },
    ],
    reponseCorrecte: 'b', articleRef: 'Plan de comptes, comptes 891 et 441',
    explication: "L'impôt sur les bénéfices est une charge de la classe 8 (891), constatée par le crédit du 441 État, impôt sur les bénéfices. Le résultat net du compte 13 s'entend après cet impôt : c'est lui que l'assemblée affecte.",
  },
  {
    id: 'ch3-q6', question: "Selon le plan de comptes, où loge le résultat de l'exercice précédent en attendant la décision de l'assemblée ?",
    options: [
      { id: 'a', texte: "Au compte 121" },
      { id: 'b', texte: "Au compte 130 Résultat en instance d'affectation (1301 bénéfice, 1309 perte)" },
      { id: 'c', texte: "Au compte 465" },
      { id: 'd', texte: "Au compte 1181" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, Titre VII, compte 13',
    explication: "À la réouverture des comptes, les entités ont la possibilité d'utiliser un compte spécial « Résultat en instance d'affectation » (130), subdivisé en 1301 (bénéfice) et 1309 (perte) ; il est soldé par l'écriture d'affectation.",
  },
  {
    id: 'ch3-q7', question: "Qui décide de l'affectation du résultat ?",
    options: [
      { id: 'a', texte: "Le conseil d'administration seul" },
      { id: 'b', texte: "L'assemblée générale, dans le respect des dispositions légales et statutaires" },
      { id: 'c', texte: "Le commissaire aux comptes" },
      { id: 'd', texte: "Le gérant, par décision unilatérale" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 142 et 546 AUSCGIE',
    explication: "« L'assemblée générale décide de l'affectation du résultat dans le respect des dispositions légales et statutaires. Elle constitue les dotations nécessaires à la réserve légale et aux réserves statutaires » (art. 142). Pour la SA, l'art. 546, 2°, range l'affectation dans la compétence de l'AGO.",
  },
  {
    id: 'ch3-q8', question: "Dans une SARL, quelle majorité s'applique en première consultation pour approuver les comptes ?",
    options: [
      { id: 'a', texte: "Les deux tiers des parts" },
      { id: 'b', texte: "Plus de la moitié du capital ; à défaut, sur seconde consultation, la majorité des votes émis" },
      { id: 'c', texte: "L'unanimité" },
      { id: 'd', texte: "Le quart du capital" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 347 et 349 AUSCGIE',
    explication: "Statuer sur les états financiers est une décision collective ordinaire (art. 347). Elle est adoptée par des associés représentant plus de la moitié du capital ; à défaut, et sauf clause contraire, la seconde consultation décide à la majorité des votes émis (art. 349).",
  },
  {
    id: 'ch3-q9', question: "Dans une SASU dont l'associé unique personne physique est président, comment les comptes sont-ils approuvés ?",
    options: [
      { id: 'a', texte: "Par une assemblée de trois personnes" },
      { id: 'b', texte: "Le dépôt au RCCM, dans le délai de six mois, de l'inventaire et des comptes dûment signés vaut approbation" },
      { id: 'c', texte: "Par le commissaire aux comptes" },
      { id: 'd', texte: "Ils n'ont pas à être approuvés" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 853-11 AUSCGIE',
    explication: "Dans la SAS unipersonnelle, l'associé unique approuve les comptes dans les six mois ; lorsqu'il est une personne physique qui assume la présidence, « le dépôt, dans le même délai au registre du commerce et du crédit mobilier de l'inventaire et des comptes annuels dûment signés vaut approbation des comptes » (art. 853-11).",
  },
  {
    id: 'ch3-q10', question: "Comment l'article 143 définit-il le bénéfice distribuable ?",
    options: [
      { id: 'a', texte: "Le résultat de l'exercice, sans ajustement" },
      { id: 'b', texte: "Le résultat de l'exercice, augmenté du report bénéficiaire et diminué des pertes antérieures, des dividendes partiels régulièrement distribués et des sommes portées en réserve en application de la loi ou des statuts" },
      { id: 'c', texte: "Le chiffre d'affaires moins les charges décaissées" },
      { id: 'd', texte: "La trésorerie disponible à la clôture" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 143 AUSCGIE',
    explication: "C'est la formule de l'article 143, al. 1er. L'assemblée répartit ensuite cette masse entre réserves facultatives, dividendes et report à nouveau (art. 144).",
  },
  {
    id: 'ch3-q11', question: "L'assemblée peut-elle distribuer des réserves ?",
    options: [
      { id: 'a', texte: "Jamais" },
      { id: 'b', texte: "Oui, sauf réserves indisponibles, en indiquant expressément les postes prélevés" },
      { id: 'c', texte: "Oui, y compris la réserve légale" },
      { id: 'd', texte: "Uniquement en liquidation" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 143 AUSCGIE',
    explication: "L'assemblée peut distribuer tout ou partie des réserves à condition qu'il ne s'agisse pas de réserves indisponibles au regard de la loi ou des statuts, toute délibération contraire étant nulle, et elle indique expressément les postes de réserve prélevés (art. 143, al. 2 et 3).",
  },
  {
    id: 'ch3-q12', question: "Quel butoir l'article 143 impose-t-il à toute distribution ?",
    options: [
      { id: 'a', texte: "La moitié du résultat" },
      { id: 'b', texte: "Sauf réduction de capital, les capitaux propres ne peuvent être ou devenir inférieurs au capital augmenté des réserves indisponibles, à peine de nullité" },
      { id: 'c', texte: "Le montant de la trésorerie" },
      { id: 'd', texte: "Aucun butoir" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 143 AUSCGIE',
    explication: "« Sauf en cas de réduction de capital, aucune distribution ne peut être faite aux associés lorsque les capitaux propres sont ou deviendraient, à la suite de cette distribution, inférieurs au montant du capital augmenté des réserves que la loi ou les statuts ne permettent pas de distribuer. » La délibération contraire est nulle (art. 143, al. 4).",
  },
  {
    id: 'ch3-q13', question: "Comment calcule-t-on la dotation à la réserve légale ?",
    options: [
      { id: 'a', texte: "5 % du chiffre d'affaires" },
      { id: 'b', texte: "Un dixième au moins du bénéfice diminué des pertes antérieures, jusqu'à ce que la réserve atteigne le cinquième du capital" },
      { id: 'c', texte: "Un vingtième du bénéfice sans plafond" },
      { id: 'd', texte: "Librement, selon l'assemblée" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 346 et 546 AUSCGIE',
    explication: "Il est obligatoirement constitué, sur le bénéfice de l'exercice diminué des pertes antérieures, une dotation d'un dixième au moins ; elle cesse d'être obligatoire lorsque la réserve atteint le cinquième du capital. Toute délibération contraire est nulle (art. 346 SARL, 546, 2° SA).",
  },
  {
    id: 'ch3-q14', question: "Capital 50 000 000 ; réserve légale existante 9 500 000 ; bénéfice 8 000 000 sans perte antérieure. Quelle dotation minimale ?",
    options: [
      { id: 'a', texte: "800 000" },
      { id: 'b', texte: "500 000" },
      { id: 'c', texte: "0" },
      { id: 'd', texte: "1 600 000" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 346 et 546 AUSCGIE',
    explication: "Un dixième du bénéfice donnerait 800 000, mais le plafond est de 1/5 × 50 000 000 = 10 000 000 ; il ne manque que 500 000 pour l'atteindre. La dotation obligatoire est donc limitée à 500 000.",
  },
  {
    id: 'ch3-q15', question: "Qu'est-ce qu'un dividende fictif ?",
    options: [
      { id: 'a', texte: "Un dividende versé en actions" },
      { id: 'b', texte: "Un dividende distribué en violation des règles de l'article 144 (approbation des comptes et sommes distribuables)" },
      { id: 'c', texte: "Un dividende non encore payé" },
      { id: 'd', texte: "Un acompte sur dividende" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 144 AUSCGIE',
    explication: "La distribution suppose l'approbation des états financiers et la constatation de sommes distribuables ; « tout dividende distribué en violation des règles énoncées au présent article est un dividende fictif » (art. 144).",
  },
  {
    id: 'ch3-q16', question: "Dans quel délai se prescrit l'action en répétition d'un dividende ne correspondant pas à des bénéfices réellement acquis (SARL) ?",
    options: [
      { id: 'a', texte: "Un an" },
      { id: 'b', texte: "Trois ans à compter de la mise en distribution" },
      { id: 'c', texte: "Cinq ans" },
      { id: 'd', texte: "Dix ans" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 346 AUSCGIE',
    explication: "La répétition des dividendes ne correspondant pas à des bénéfices réellement acquis peut être exigée des associés qui les ont reçus ; l'action se prescrit par trois ans à compter de la date de mise en distribution (art. 346, al. 3 et 4).",
  },
  {
    id: 'ch3-q17', question: "Les dirigeants qui répartissent des dividendes fictifs en l'absence d'inventaire ou au moyen d'un inventaire frauduleux :",
    options: [
      { id: 'a', texte: "Ne risquent rien si l'assemblée a voté" },
      { id: 'b', texte: "Encourent une sanction pénale (art. 889)" },
      { id: 'c', texte: "Doivent seulement rembourser la société" },
      { id: 'd', texte: "Sont révoqués d'office" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 889 AUSCGIE',
    explication: "Encourent une sanction pénale les dirigeants qui, en l'absence d'inventaire ou au moyen d'inventaire frauduleux, ont sciemment opéré entre les associés la répartition de dividendes fictifs (art. 889). Le quantum de la peine relève du droit national.",
  },
  {
    id: 'ch3-q18', question: "Sur quelle base se calcule le premier dividende statutaire ?",
    options: [
      { id: 'a', texte: "Sur la valeur nominale, que l'action soit libérée ou non" },
      { id: 'b', texte: "Comme un intérêt sur le montant libéré des actions" },
      { id: 'c', texte: "Sur la valeur boursière" },
      { id: 'd', texte: "Sur le bénéfice total" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 145 AUSCGIE',
    explication: "Le premier dividende est versé si les bénéfices distribuables le permettent ; il « est calculé comme un intérêt sur le montant libéré des actions » (art. 145).",
  },
  {
    id: 'ch3-q19', question: "Actions de 10 000 libérées de moitié ; premier dividende statutaire de 6 %. Quel premier dividende par action ?",
    options: [
      { id: 'a', texte: "600" },
      { id: 'b', texte: "300" },
      { id: 'c', texte: "150" },
      { id: 'd', texte: "1 200" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 145 AUSCGIE',
    explication: "Assiette : le montant libéré, soit 5 000. Premier dividende : 6 % × 5 000 = 300 par action. Le superdividende éventuel, lui, est réparti également entre toutes les actions.",
  },
  {
    id: 'ch3-q20', question: "Dans quel délai maximal les dividendes votés doivent-ils être mis en paiement ?",
    options: [
      { id: 'a', texte: "Trois mois après l'assemblée" },
      { id: 'b', texte: "Neuf mois après la clôture de l'exercice, sauf prolongation par la juridiction compétente" },
      { id: 'c', texte: "Un an après la clôture" },
      { id: 'd', texte: "Sans délai légal" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 146 AUSCGIE',
    explication: "Les modalités sont fixées par la collectivité des associés ou, à défaut, par les organes de gestion ; « dans tous les cas, la mise en paiement des dividendes doit avoir lieu dans un délai maximum de neuf (9) mois après la clôture de l'exercice », prorogeable par le juge (art. 146).",
  },
  {
    id: 'ch3-q21', question: "Dans l'Application 65, quel compte est crédité du montant des dividendes votés ?",
    options: [
      { id: 'a', texte: "521 Banques" },
      { id: 'b', texte: "465 Associés, dividendes à payer" },
      { id: 'c', texte: "462 Associés, comptes courants" },
      { id: 'd', texte: "1181 Réserves facultatives" },
    ],
    reponseCorrecte: 'b', articleRef: 'App. 65',
    explication: "L'écriture d'affectation débite 1301 et crédite 111, 112, 1181, 465 (dividendes) et 121 (report). Le paiement débite ensuite 465 par le crédit de 521.",
  },
  {
    id: 'ch3-q22', question: "Où vont les sommes issues des arrondis des dividendes distribués ?",
    options: [
      { id: 'a', texte: "En produits divers" },
      { id: 'b', texte: "Au report à nouveau" },
      { id: 'c', texte: "À la réserve légale" },
      { id: 'd', texte: "Au capital" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, Titre VII, compte 12',
    explication: "Le report à nouveau est constitué par les sommes non affectées laissées à la disposition de l'entité, les pertes non compensées, et « les sommes venant des arrondis des dividendes distribués » (commentaires du compte 12).",
  },
  {
    id: 'ch3-q23', question: "Une perte de l'exercice est reportée à nouveau. Quelle écriture ?",
    options: [
      { id: 'a', texte: "Débit 1309 / crédit 1291" },
      { id: 'b', texte: "Débit 1291 Perte nette à reporter / crédit 1309" },
      { id: 'c', texte: "Débit 111 / crédit 1309" },
      { id: 'd', texte: "Débit 465 / crédit 1309" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, comptes 12 et 13',
    explication: "La perte en instance d'affectation (1309, débiteur) est soldée par son crédit et portée au débit du report à nouveau débiteur (129, 1291). Elle diminuera le bénéfice distribuable des exercices suivants (art. 143).",
  },
  {
    id: 'ch3-q24', question: "Par quels comptes une perte peut-elle être apurée, selon le fonctionnement du compte 13 ?",
    options: [
      { id: 'a', texte: "Uniquement par le report à nouveau" },
      { id: 'b', texte: "Par le report à nouveau (12), les réserves (11) ou le capital social (101)" },
      { id: 'c', texte: "Par les comptes de tiers" },
      { id: 'd', texte: "Par un produit exceptionnel" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, Titre VII, compte 13',
    explication: "Le compte 13 est crédité, après décision d'imputation des pertes, par le débit des comptes 12 (report à nouveau), 11 (réserves), 101 (capital social) ou 103. L'imputation sur le capital est une réduction de capital (chapitre 5).",
  },
  {
    id: 'ch3-q25', question: "Quel est le taux de la retenue à la source sur les revenus de capitaux mobiliers (dividendes) en RDC ?",
    options: [
      { id: 'a', texte: "10 %" },
      { id: 'b', texte: "20 %" },
      { id: 'c', texte: "30 %" },
      { id: 'd', texte: "Aucune retenue" },
    ],
    reponseCorrecte: 'b', articleRef: 'Loi n° 23/053, art. 120 ; AM n° 008/2025',
    explication: "La retenue sur revenus de capitaux mobiliers est de 20 % (art. 120 de la loi n° 23/053). L'arrêté n° 008/2025 fixe les modalités : le débiteur du revenu calcule, retient et reverse au plus tard le 15 du mois qui suit le versement ou la mise à disposition.",
  },
  {
    id: 'ch3-q26', question: "Qui doit opérer la retenue sur les dividendes ?",
    options: [
      { id: 'a', texte: "L'associé bénéficiaire, dans sa déclaration annuelle" },
      { id: 'b', texte: "La société qui verse les dividendes, débitrice du revenu" },
      { id: 'c', texte: "La banque de l'associé" },
      { id: 'd', texte: "Le commissaire aux comptes" },
    ],
    reponseCorrecte: 'b', articleRef: 'AM n° 008/2025, art. 2',
    explication: "Tout débiteur de revenus des capitaux mobiliers, la personne qui verse le revenu et non son bénéficiaire, doit calculer, retenir à la source et reverser l'IRPP de cette catégorie (arrêté n° 008/2025, art. 2).",
  },
  {
    id: 'ch3-q27', question: "Une SARL verse un dividende brut de 10 000 000 à ses associés personnes physiques résidents. Quelle écriture de paiement ?",
    options: [
      { id: 'a', texte: "Débit 465 10 000 000 / crédit 521 10 000 000" },
      { id: 'b', texte: "Débit 465 10 000 000 / crédit 521 8 000 000 et crédit 447 État, impôts retenus à la source 2 000 000" },
      { id: 'c', texte: "Débit 891 2 000 000 / crédit 441 2 000 000" },
      { id: 'd', texte: "Débit 6581 10 000 000 / crédit 521" },
    ],
    reponseCorrecte: 'b', articleRef: 'Loi n° 23/053, art. 81 et 120 ; comptes 465 et 447',
    explication: "Base : le montant brut des dividendes (art. 81). La société verse le net (8 000 000) et constate sa dette envers l'État pour la retenue de 20 % (2 000 000) au compte 447 État, impôts retenus à la source, soldé lors du reversement. La retenue n'est pas une charge de la société.",
  },
  {
    id: 'ch3-q28', question: "Quelles conditions le régime mère-fille (art. 76 de la loi n° 23/053) exige-t-il ?",
    options: [
      { id: 'a', texte: "Une participation d'au moins 10 % détenue un an" },
      { id: 'b', texte: "Une participation d'au moins 25 %, sièges sociaux en RDC, titres nominatifs conservés au moins deux années consécutives" },
      { id: 'c', texte: "Une cotation en bourse" },
      { id: 'd', texte: "Aucune condition" },
    ],
    reponseCorrecte: 'b', articleRef: 'Loi n° 23/053, art. 76 ; socle 2026',
    explication: "L'impôt payé sur les produits distribués par la filiale s'impute sur celui de la mère lorsque celle-ci détient au moins 25 % du capital, que les deux sièges sont en RDC, que l'imposition de la filiale est équivalente et que les titres restent nominatifs au moins deux années consécutives.",
  },
  {
    id: 'ch3-q29', question: "Selon la loi n° 23/053, lequel de ces éléments est assimilé à un produit d'actions (revenu distribué) ?",
    options: [
      { id: 'a', texte: "Le remboursement d'un prêt régulier" },
      { id: 'b', texte: "Les indemnités de fonction allouées aux membres des conseils d'administration" },
      { id: 'c', texte: "Le salaire d'un employé non associé" },
      { id: 'd', texte: "L'achat de marchandises" },
    ],
    reponseCorrecte: 'b', articleRef: 'Loi n° 23/053, art. 73',
    explication: "L'article 73 assimile aux produits d'actions notamment les bénéfices non investis, les avances aux associés sauf preuve contraire, les rémunérations occultes et « les indemnités de fonction et de session allouées aux membres des conseils d'administration ».",
  },
  {
    id: 'ch3-q30', question: "Dans le tableau des flux de trésorerie, comment mesure-t-on les dividendes versés ?",
    options: [
      { id: 'a', texte: "Par le montant voté par l'assemblée" },
      { id: 'b', texte: "Par le mouvement débit du compte 465, hors mouvements sans flux réel (paiement en actions)" },
      { id: 'c', texte: "Par la variation de la réserve légale" },
      { id: 'd', texte: "Ils n'y figurent pas" },
    ],
    reponseCorrecte: 'b', articleRef: 'Guide d\'application, logique du TFT',
    explication: "Les dividendes versés se mesurent par le « mouvement débit du compte 465, à l'exclusion des mouvements ne traduisant pas un flux réel (paiement de dividendes en actions, par exemple) ». Un dividende voté mais non payé n'est pas un flux de trésorerie.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '3.1',
    titre: "L'arrêté des comptes et le rapport de gestion",
    navLabel: "Arrêté des comptes",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Chaque année, la société rend compte à ses associés. Le cycle commence à la clôture : « le gérant ou le conseil d'administration ou l'administrateur général, selon le cas, établit et arrête les états financiers de synthèse » conformément au droit comptable (art. 137). *Arrêter* les comptes, c'est les fixer sous la responsabilité des organes de gestion, avant tout contrôle ou vote. Les mêmes organes établissent un **rapport de gestion** exposant la situation de la société durant l'exercice écoulé, son évolution prévisible, les événements importants survenus entre la clôture et la date du rapport, et en particulier les perspectives de continuation de l'activité, l'évolution de la trésorerie et le plan de financement (art. 138).",
      },
      {
        type: 'paragraphe',
        texte: "Le contenu des états financiers est fixé par l'AUDCIF : bilan, compte de résultat, tableau des flux de trésorerie et Notes annexes pour le système normal. L'AUSCGIE y ajoute deux exigences propres au droit des sociétés : l'état annexé comprend un **état des cautionnements, avals et garanties** donnés par la société et un **état des sûretés réelles** qu'elle a consenties (art. 139). Toute modification dans la présentation des états financiers ou dans les méthodes d'évaluation, d'amortissement ou de provisions doit être signalée dans le rapport de gestion et, le cas échéant, dans celui du commissaire aux comptes (art. 141). Le principe est la permanence ; le changement est possible, mais il doit être visible pour ceux qui votent.",
      },
      {
        type: 'carte',
        titre: "Le calendrier de l'approbation",
        tableau: {
          entetes: ["Étape", "Délai", "Source"],
          lignes: [
            ["Transmission des états financiers et du rapport de gestion aux commissaires aux comptes (SA, SAS et, le cas échéant, SARL)", "45 jours au moins avant l'assemblée", "Art. 140"],
            ["Assemblée statuant sur les états financiers", "Dans les 6 mois de la clôture ; en SARL, prorogation possible sur requête des gérants", "Art. 140, 348"],
            ["Dépôt des états financiers au RCCM", "Dans le mois qui suit l'approbation", "Art. 269"],
            ["Mise en paiement des dividendes votés", "9 mois au plus après la clôture, sauf prolongation judiciaire", "Art. 146"],
          ],
        },
        note: "Pour une clôture au 31 décembre N : documents au commissaire aux comptes au plus tard 45 jours avant l'assemblée, assemblée au plus tard le 30 juin N+1, dépôt au RCCM dans le mois suivant, dividendes payés au plus tard le 30 septembre N+1.",
      },
      {
        type: 'paragraphe',
        texte: "Ces délais ne sont pas des formalités. Si l'assemblée annuelle de la SARL n'est pas réunie dans les six mois, le ministère public ou tout associé peut saisir le juge statuant à bref délai pour enjoindre aux gérants, le cas échéant sous astreinte, de la convoquer, ou faire désigner un mandataire ad hoc (art. 348). Les dirigeants qui ne déposent pas les états financiers au RCCM dans le mois de leur approbation encourent une sanction pénale (art. 890-1), comme ceux qui, sciemment, présentent aux associés des états financiers ne donnant pas une image fidèle en vue de dissimuler la véritable situation de la société (art. 890). Le comptable qui prépare le dossier de clôture doit donc raisonner à rebours : fixer la date de l'assemblée, puis celle de la transmission au commissaire aux comptes, puis celle de l'arrêté des comptes.",
      },
      {
        type: 'paragraphe',
        texte: "Pour le comptable, l'arrêté des comptes est un moment de vérité. C'est à cette date que toutes les écritures d'inventaire doivent être passées : amortissements, dépréciations des stocks et des créances, provisions pour risques et charges, charges à payer et produits à recevoir, charges et produits constatés d'avance. Le résultat qui en sort est celui sur lequel l'assemblée votera ; il ne peut plus être modifié ensuite que par une nouvelle délibération des organes de gestion, avant l'envoi au commissaire aux comptes. Le rapport de gestion, lui, n'est pas un document comptable, mais il doit être cohérent avec les états financiers : un rapport qui annonce une trésorerie confortable alors que le tableau des flux révèle un découvert grandissant alerterait légitimement les associés et le commissaire aux comptes.",
      },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[2] },
    ],
  },
  {
    numero: '3.2',
    titre: "Du résultat comptable au résultat à affecter : l'impôt sur les sociétés",
    navLabel: "Résultat et IS",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'assemblée n'affecte pas n'importe quel résultat : elle affecte le **résultat net**, après impôt. Le compte 13 de l'AUDCIF permet de calculer, à la clôture, « le résultat net à affecter, après déduction de l'impôt sur les bénéfices et autres prélèvements obligatoires ». En RDC, depuis la réforme de la loi n° 23/053 du 30 novembre 2023, applicable aux revenus de 2026, les sociétés de capitaux sont soumises à l'**impôt sur les sociétés** au taux de **30 %** du bénéfice net imposable (art. 56), avec un **impôt minimum** de **1 %** du chiffre d'affaires déclaré lorsque les résultats sont déficitaires ou que l'impôt calculé serait inférieur à ce montant (art. 57). La loi de finances n° 25/060 pour 2026 n'a modifié ni le taux ni l'impôt minimum.",
      },
      {
        type: 'paragraphe',
        texte: "Comptablement, l'impôt de l'exercice est une charge de la classe 8 : débit **891 Impôts sur les bénéfices de l'exercice**, par le crédit du **441 État, impôt sur les bénéfices**. L'impôt minimum dispose de son propre compte, 895. Les acomptes versés en cours d'année sont portés au débit du 441 ; le solde de ce compte à la clôture représente ce que la société doit encore, ou ce qu'elle a versé en trop. La loi de finances 2026 a fixé les échéances des trois acomptes provisionnels au plus tard le 25 juillet, le 25 septembre et le 25 novembre, pour 30 %, 30 % et 20 % de l'impôt de l'exercice précédent (art. 57 bis de la loi relative aux procédures fiscales, modifié) ; la déclaration de l'IS est déposée au plus tard le 30 avril de l'année suivante.",
      },
      {
        type: 'carte',
        titre: "Exemple : de la base imposable au résultat à affecter",
        tableau: {
          entetes: ["Élément", "Montant (FC)"],
          lignes: [
            ["Résultat comptable avant impôt", "180 000 000"],
            ["Réintégrations fiscales (charges non déductibles)", "+ 20 000 000"],
            ["Bénéfice net imposable", "200 000 000"],
            ["IS à 30 % (compte 891)", "60 000 000"],
            ["Comparaison : impôt minimum, 1 % d'un chiffre d'affaires de 2 000 000 000", "20 000 000 (inférieur : l'IS s'applique)"],
            ["Résultat net comptable (compte 13) = 180 000 000 − 60 000 000", "**120 000 000**"],
          ],
        },
        note: "L'impôt se calcule sur le bénéfice fiscal, mais il se retranche du résultat comptable. C'est ce résultat net de 120 000 000 que l'assemblée affecte.",
      },
      {
        type: 'paragraphe',
        texte: "Le résultat net n'est pas une somme d'argent disponible. Une société peut dégager un bénéfice important et manquer de trésorerie, parce que ses clients ne l'ont pas encore payée, qu'elle a reconstitué ses stocks ou remboursé un emprunt. C'est pourquoi l'article 138 demande au rapport de gestion d'exposer l'évolution de la trésorerie et le plan de financement : l'assemblée doit savoir, avant de voter un dividende, si la société peut le payer sans se mettre en difficulté. Le droit fixe ce qui est *distribuable* ; la gestion dit ce qui est *raisonnablement distribuable*.",
      },
      {
        type: 'paragraphe',
        texte: "À la réouverture des comptes de l'exercice suivant, le résultat attend la décision de l'assemblée. L'AUDCIF donne aux entités « la possibilité d'utiliser un compte spécial Résultat en instance d'affectation (130) », subdivisé en **1301** pour un bénéfice et **1309** pour une perte. Le compte 13 est ensuite soldé lors de la comptabilisation de l'affectation, et le résultat non affecté à une réserve ni distribué est viré au report à nouveau. Le plan de comptes réserve par ailleurs les comptes 131 à 139 à la présentation des soldes intermédiaires : marge commerciale, valeur ajoutée, excédent brut d'exploitation, résultats d'exploitation, financier, des activités ordinaires et hors activités ordinaires.",
      },
      {
        type: 'paragraphe',
        texte: "Deux situations particulières méritent l'attention. Une société **déficitaire** ne paie pas d'IS au taux de 30 %, mais elle reste redevable de l'impôt minimum de 1 % de son chiffre d'affaires (art. 57) : ce montant est une charge de l'exercice au compte 895, qui aggrave la perte comptable. Une société **bénéficiaire** qui a versé des acomptes supérieurs à l'impôt finalement dû dispose d'une créance sur l'État : le solde débiteur du 441 figure alors à l'actif. En cours d'exercice, chaque acompte se comptabilise au débit du 441 par le crédit de la banque ; à la clôture, l'impôt de l'exercice est porté au crédit du 441 par le débit du 891, et le solde du compte donne le reliquat à payer ou à récupérer. Comme les acomptes de l'exercice N+1 sont calculés sur l'impôt de N, une forte hausse du bénéfice pèse aussi sur la trésorerie de l'année suivante.",
      },
      { type: 'controle', question: QCM[3] },
      {
        type: 'paragraphe',
        texte: "La différence entre le résultat comptable et le bénéfice imposable mérite d'être comprise. Certaines charges comptabilisées ne sont pas déductibles fiscalement : l'IS lui-même, les amendes et pénalités, certaines provisions, la fraction exagérée des rémunérations d'associés dirigeants. Elles sont réintégrées dans la déclaration fiscale, sans modifier la comptabilité. L'impôt est donc calculé sur une base différente du résultat comptable, mais il est enregistré dans les comptes pour son montant réel. Le résultat net qui en résulte est le seul que l'assemblée puisse affecter : distribuer le résultat avant impôt reviendrait à partager une somme que la société doit à l'État.",
      },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[5] },
    ],
  },
  {
    numero: '3.3',
    titre: "L'approbation des comptes selon la forme sociale",
    navLabel: "Approbation",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'organe qui approuve les comptes et affecte le résultat dépend de la forme. « L'assemblée générale décide de l'affectation du résultat dans le respect des dispositions légales et statutaires. Elle constitue les dotations nécessaires à la réserve légale et aux réserves statutaires » (art. 142). Dans la **SA**, l'assemblée générale ordinaire est compétente pour « statuer sur les états financiers de synthèse de l'exercice » et « décider de l'affectation du résultat » (art. 546, 1° et 2°). Lorsque la SA n'a qu'un actionnaire, c'est lui qui prend, dans les six mois de la clôture, toutes les décisions de l'assemblée ordinaire annuelle, au vu des rapports de l'administrateur général et du commissaire aux comptes (art. 558 et 559).",
      },
      {
        type: 'paragraphe',
        texte: "Dans la **SARL**, statuer sur les états financiers est une décision collective ordinaire (art. 347). L'assemblée annuelle se réunit dans les six mois de la clôture, les gérants pouvant demander une prorogation au juge (art. 348). Les décisions sont adoptées par des associés représentant plus de la moitié du capital ; à défaut, sauf clause contraire, les associés sont consultés une seconde fois et décident à la majorité des votes émis, quelle que soit la part du capital représentée (art. 349). Dans la SARL unipersonnelle, l'article 347 renvoie aux règles de la SA à actionnaire unique.",
      },
      {
        type: 'paragraphe',
        texte: "Dans la **SAS**, les statuts organisent les décisions collectives, mais les attributions des assemblées de SA en matière « de comptes annuels et de bénéfices » doivent être exercées collectivement par les associés, à peine de nullité (art. 853-11, al. 2). Dans la SASU, le président arrête les comptes et l'associé unique les approuve dans les six mois ; lorsque l'associé unique, personne physique, est lui-même président, « le dépôt, dans le même délai au registre du commerce et du crédit mobilier de l'inventaire et des comptes annuels dûment signés vaut approbation des comptes » (art. 853-11, al. 4 et 5). C'est une simplification notable pour les entrepreneurs individuels qui ont choisi la SASU.",
      },
      {
        type: 'carte',
        titre: "Qui approuve, et comment ?",
        tableau: {
          entetes: ["Forme", "Organe", "Majorité ou modalité"],
          lignes: [
            ["SA", "Assemblée générale ordinaire (art. 546)", "Règles de quorum et de majorité de l'AGO (UE2)"],
            ["SA unipersonnelle", "Actionnaire unique (art. 558-559)", "Décision dans les 6 mois, au vu des rapports"],
            ["SARL", "Associés, décision collective ordinaire (art. 347)", "Plus de la moitié du capital ; sinon majorité des votes émis en seconde consultation (art. 349)"],
            ["SAS", "Collectivité des associés (art. 853-11)", "Selon les statuts, mais décision collective obligatoire"],
            ["SASU dont l'associé personne physique est président", "Associé unique (art. 853-11)", "Le dépôt au RCCM des comptes signés vaut approbation"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Le procès-verbal de la décision d'approbation est la pièce justificative de l'écriture d'affectation. Il reproduit la résolution, qui suit en général un modèle constant : l'assemblée approuve les états financiers de l'exercice clos le 31 décembre N faisant apparaître un bénéfice de tel montant ; elle décide de l'affecter comme suit : réserve légale, réserves statutaires, réserves facultatives, dividendes, report à nouveau ; elle fixe le dividende par titre et sa date de mise en paiement. Le comptable n'a pas à interpréter : il transcrit. Mais il doit vérifier, avant la réunion, que le projet de résolution respecte les règles de ce chapitre, car une délibération contraire à la réserve légale ou au butoir des capitaux propres est nulle (art. 143, 346, 546).",
      },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
    ],
  },
  {
    numero: '3.4',
    titre: "Réserves et bénéfice distribuable (art. 142-143)",
    navLabel: "Bénéfice distribuable",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'article 143 définit la masse que l'assemblée peut partager. Le **bénéfice distribuable** est « le résultat de l'exercice, augmenté du report bénéficiaire et diminué des pertes antérieures, des dividendes partiels régulièrement distribués ainsi que des sommes portées en réserve en application de la loi ou des statuts ». La formule se lit comme une opération en quatre temps : partir du résultat net ; y ajouter les bénéfices anciens laissés en report à nouveau ; retrancher les pertes anciennes non encore apurées ; retrancher enfin ce que la loi (réserve légale) et les statuts (réserves statutaires) imposent de mettre de côté. Ce qui reste peut être distribué, mis en réserves facultatives ou reporté à nouveau (art. 144).",
      },
      {
        type: 'carte',
        titre: "La hiérarchie des réserves",
        tableau: {
          entetes: ["Réserve", "Source", "Compte", "Régime"],
          lignes: [
            ["Réserve légale", "Art. 346 (SARL) et 546, 2° (SA)", "111", "Dotation obligatoire d'un dixième au moins du bénéfice diminué des pertes antérieures, jusqu'au cinquième du capital ; indisponible"],
            ["Réserves statutaires ou contractuelles", "Statuts", "112", "Dotation imposée par les statuts avant toute distribution"],
            ["Réserves réglementées", "Textes particuliers", "113", "Régime fixé par le texte qui les institue (plus-values, attribution gratuite d'actions, subventions...)"],
            ["Réserves facultatives et diverses", "Décision de l'assemblée (art. 144)", "1181, 1188", "Librement constituées et, en principe, librement distribuables"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Les **réserves** sont des bénéfices laissés à la disposition de l'entité et non incorporés au capital (AUDCIF, compte 11). Elles renforcent les capitaux propres et donc la solidité de la société, sans en changer le capital. Certaines sont imposées : la réserve légale par la loi, les réserves statutaires par les statuts. D'autres sont décidées librement par l'assemblée pour financer un investissement ou se prémunir contre les aléas. Les réserves réglementées (compte 113) suivent le régime du texte qui les crée ; le plan de comptes en cite plusieurs, dont les réserves consécutives à l'attribution gratuite d'actions au personnel et aux dirigeants (1132), étudiées au chapitre 4.",
      },
      {
        type: 'filet',
        titre: "Distribuer des réserves : possible, sous deux verrous (art. 143, al. 2 à 4)",
        texte: "L'assemblée peut décider la distribution de tout ou partie des réserves, à la double condition qu'il ne s'agisse pas de réserves **indisponibles** au regard de la loi ou des statuts, toute délibération contraire étant **nulle**, et qu'elle indique **expressément les postes de réserve** sur lesquels les prélèvements sont effectués. S'y ajoute le butoir général : sauf réduction de capital, aucune distribution ne peut être faite lorsque les capitaux propres sont, ou deviendraient de ce fait, inférieurs au montant du capital augmenté des réserves que la loi ou les statuts ne permettent pas de distribuer, là encore à peine de nullité.",
      },
      {
        type: 'paragraphe',
        texte: "Le butoir de l'article 143 est l'outil de contrôle le plus puissant de ce chapitre, car il raisonne sur les capitaux propres et non sur le seul résultat. Prenons une société au capital de 100 000 000, avec une réserve légale de 15 000 000, des réserves facultatives de 30 000 000 et un report à nouveau débiteur de 40 000 000 : ses capitaux propres s'élèvent à 105 000 000. Le seuil protégé est de 100 000 000 + 15 000 000 = 115 000 000. Les capitaux propres sont déjà en dessous : aucune distribution n'est possible, même par prélèvement sur les réserves facultatives, qui existent en comptabilité mais sont économiquement absorbées par les pertes. Le comptable qui présente un projet de distribution doit toujours faire ce calcul.",
      },
      {
        type: 'paragraphe',
        texte: "Appliquons la formule. Une SA au capital de 80 000 000 a une réserve légale de 12 000 000, un report à nouveau créditeur de 3 000 000 et un résultat net de 40 000 000 ; ses statuts imposent une réserve statutaire de 5 % du résultat. Réserve légale : un dixième de 40 000 000 donne 4 000 000, mais le plafond est de 16 000 000 − 12 000 000 = 4 000 000 : la dotation est de 4 000 000. Réserve statutaire : 2 000 000. Bénéfice distribuable : 40 000 000 + 3 000 000 − 4 000 000 − 2 000 000 = 37 000 000. L'assemblée peut distribuer jusqu'à ce montant, sous réserve du butoir, ou en mettre une partie en réserves facultatives, ou la reporter. Si, l'année suivante, le capital est porté à 120 000 000, le plafond de la réserve légale passe à 24 000 000, et la dotation redevient obligatoire.",
      },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[11] },
    ],
  },
  {
    numero: '3.5',
    titre: "La réserve légale et la sanction du dividende fictif",
    navLabel: "Réserve légale",
    blocs: [
      {
        type: 'paragraphe',
        texte: "SARL et SA obéissent à la même discipline, énoncée par l'article 346 pour la première et l'article 546, 2°, pour la seconde : il est obligatoirement constitué, sur le bénéfice de l'exercice diminué le cas échéant des pertes antérieures, une dotation égale à **un dixième au moins**, affectée à la **réserve légale** ; cette dotation cesse d'être obligatoire lorsque la réserve atteint **le cinquième du montant du capital social**. Toute délibération prise en violation de cette règle est **nulle**. Le calcul appelle deux réflexes : l'assiette est le bénéfice *net des pertes antérieures*, et la dotation de l'exercice est plafonnée par la distance restant à parcourir jusqu'au cinquième du capital.",
      },
      {
        type: 'carte',
        titre: "Méthode de calcul de la dotation",
        liste: [
          "1. Assiette = bénéfice de l'exercice − pertes antérieures (report à nouveau débiteur).",
          "2. Dotation minimale = 1/10 × assiette.",
          "3. Plafond = 1/5 × capital social − réserve légale existante.",
          "4. Dotation obligatoire = le plus petit des montants 2 et 3 ; si la réserve a déjà atteint le cinquième, aucune dotation n'est due.",
          "5. L'assemblée peut toujours doter davantage : le dixième est un minimum.",
        ],
        note: "Le plafond est calculé sur le capital, pas sur les capitaux propres. Après une augmentation de capital, le plafond monte, et la dotation redevient obligatoire.",
      },
      {
        type: 'paragraphe',
        texte: "La réserve légale est **indisponible** : elle ne peut pas être distribuée (art. 143, al. 2), et elle entre dans le seuil protégé par le butoir. Elle peut en revanche absorber des pertes, sur décision de l'assemblée, puisque le compte 13 peut être crédité, pour apurer une perte, par le débit du compte 11 Réserves (AUDCIF). Elle peut aussi être incorporée au capital lors d'une augmentation de capital par incorporation de réserves (art. 62 et 68, chapitre 4). Dans ce dernier cas, le capital augmente et le plafond du cinquième aussi : la société devra de nouveau doter la réserve légale sur ses bénéfices futurs.",
      },
      {
        type: 'carte',
        titre: "Le dividende fictif et sa répétition",
        liste: [
          "**Définition** : l'article 144 subordonne toute distribution à l'approbation des états financiers et à la constatation de sommes distribuables ; « tout dividende distribué en violation des règles énoncées au présent article est un dividende fictif ».",
          "**Répétition** : la répétition des dividendes ne correspondant pas à des bénéfices réellement acquis peut être exigée des associés qui les ont reçus (art. 346, al. 3, SARL).",
          "**Prescription** : l'action en répétition se prescrit par **trois ans** à compter de la mise en distribution (art. 346, al. 4).",
          "**Sanction pénale** : les dirigeants qui, en l'absence d'inventaire ou au moyen d'un inventaire frauduleux, ont sciemment réparti des dividendes fictifs encourent une sanction pénale (art. 889), dont le quantum relève du droit national ; en RDC, les peines n'ont pas été fixées par la loi selon les sources consultées (chapitre 2).",
        ],
      },
      {
        type: 'paragraphe',
        texte: "Le dividende fictif naît le plus souvent d'un résultat surévalué : stocks gonflés, créances douteuses non dépréciées, charges à payer oubliées, provisions insuffisantes. C'est pourquoi l'article 889 vise l'absence d'inventaire ou l'inventaire frauduleux : sans inventaire sincère, il n'y a pas de résultat fiable, donc pas de bénéfice distribuable certain. Le comptable est ici en première ligne. Chaque écriture d'inventaire (dépréciations, provisions, charges constatées) diminue le résultat, donc le distribuable ; la tentation de les « oublier » pour permettre un dividende est la source classique du délit. Lorsque le dividende fictif est découvert, la société enregistre sa créance de répétition sur les associés (compte d'associés concerné) et corrige ses comptes.",
      },
      {
        type: 'paragraphe',
        texte: "Trois erreurs reviennent sans cesse dans les copies et dans la pratique. La première consiste à calculer la dotation sur le bénéfice brut sans retrancher les pertes antérieures : c'est l'assiette nette qui compte. La deuxième consiste à oublier le plafond et à doter le dixième alors que la réserve a presque atteint le cinquième du capital : l'excédent n'est pas interdit, mais il n'est plus obligatoire, et l'assemblée doit le décider comme une réserve facultative. La troisième consiste à calculer le plafond sur les capitaux propres ou sur le capital libéré : l'Acte uniforme vise « le cinquième du montant du capital social », c'est-à-dire le capital souscrit inscrit dans les statuts, qu'il soit ou non entièrement libéré.",
      },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[16] },
    ],
  },
  {
    numero: '3.6',
    titre: "Le dividende : premier dividende, superdividende, mise en paiement",
    navLabel: "Dividendes",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Après approbation des états financiers et constatation de sommes distribuables, l'assemblée détermine : les dotations éventuelles à des **réserves facultatives**, la **part de bénéfices à distribuer** aux actions ou parts sociales, et le montant du **report à nouveau** éventuel ; la part de bénéfice revenant à chaque titre est appelée **dividende** (art. 144). Dans la SA, à chaque action est attaché un droit au dividende proportionnel à la quotité du capital qu'elle représente (art. 754), sauf actions de préférence jouissant d'avantages (art. 755 et 778-1 s.). Les statuts peuvent prévoir un **premier dividende**, que la pratique appelle aussi intérêt statutaire, versé si l'assemblée constate des bénéfices distribuables suffisants : il est « calculé comme un intérêt sur le montant libéré des actions » (art. 145).",
      },
      {
        type: 'carte',
        titre: "Décomposer un dividende",
        tableau: {
          entetes: ["Élément", "Assiette", "Fondement"],
          lignes: [
            ["Premier dividende (intérêt statutaire)", "Taux statutaire × montant **libéré** de chaque action", "Art. 145"],
            ["Superdividende", "Montant uniforme par titre, décidé par l'assemblée au-delà du premier dividende", "Art. 144 (vocabulaire de la pratique)"],
            ["Dividende total", "Premier dividende + superdividende", "—"],
          ],
        },
        note: "Une action libérée du quart ne perçoit le premier dividende que sur ce quart. Le superdividende, lui, est réparti également entre tous les titres de même catégorie.",
      },
      {
        type: 'paragraphe',
        texte: "Le **tableau de répartition** est l'outil qui articule ces règles. Il part du résultat net, ajoute le report bénéficiaire, retranche les pertes antérieures, puis impute dans l'ordre : la réserve légale, les réserves statutaires, le premier dividende, les réserves facultatives éventuellement décidées, le superdividende, et enfin le reliquat reporté à nouveau. Le superdividende se fixe souvent en montant rond par titre, pour faciliter le paiement ; les arrondis qui en résultent alimentent le report à nouveau, que l'AUDCIF définit notamment par « les sommes venant des arrondis des dividendes distribués » (compte 12). À chaque étape, le comptable vérifie que le total distribué reste inférieur au bénéfice distribuable et respecte le butoir des capitaux propres.",
      },
      {
        type: 'paragraphe',
        texte: "Les modalités de mise en paiement sont fixées par la collectivité des associés ou, à défaut, par le conseil d'administration, l'administrateur général ou les gérants ; « dans tous les cas, la mise en paiement des dividendes doit avoir lieu dans un délai maximum de neuf (9) mois après la clôture de l'exercice », prorogeable par la juridiction compétente (art. 146). Dans la SA, les dates de paiement des dividendes sont fixées par l'assemblée générale ou, à défaut, par le conseil d'administration ou l'administrateur général (art. 756). Pour les actions de préférence, le dividende peut être accordé en titres de capital, selon les modalités fixées par l'assemblée extraordinaire ou les statuts (art. 778-13) : dans ce cas, aucun flux de trésorerie ne sort de la société.",
      },
      {
        type: 'paragraphe',
        texte: "L'article 143 mentionne les « dividendes partiels régulièrement distribués » parmi les éléments qui viennent en diminution du bénéfice distribuable. Il vise les sommes déjà versées sur le bénéfice de la période : elles ne peuvent être distribuées une seconde fois. L'Acte uniforme ne consacre pas de régime détaillé à ces versements en cours d'exercice ; ils ne peuvent en tout état de cause être réguliers que s'ils respectent les conditions de l'article 144, et tout versement en violation de ces règles est un dividende fictif. Sur le plan fiscal, la loi n° 23/053 assimile d'ailleurs aux revenus distribués les sommes mises à la disposition des associés à titre d'avances, de prêts ou d'acomptes, sauf preuve contraire (art. 73).",
      },
      {
        type: 'paragraphe',
        texte: "Un exemple montre l'effet du premier dividende sur des actions inégalement libérées. Une SA de 10 000 actions de 10 000 compte 6 000 actions entièrement libérées et 4 000 libérées du quart ; ses statuts prévoient un premier dividende de 6 %. Les actions libérées reçoivent 6 % × 10 000 = 600 ; les actions libérées du quart, 6 % × 2 500 = 150. Premier dividende total : 6 000 × 600 + 4 000 × 150 = 3 600 000 + 600 000 = 4 200 000. Si l'assemblée ajoute un superdividende de 1 000 par action, uniforme, il coûte 10 000 000. Le dividende total par action est donc de 1 600 pour une action libérée et de 1 150 pour une action libérée du quart. L'écart rémunère exactement l'argent que les premiers actionnaires ont déjà mis à la disposition de la société.",
      },
      { type: 'controle', question: QCM[17] },
      { type: 'controle', question: QCM[18] },
      { type: 'controle', question: QCM[19] },
    ],
  },
  {
    numero: '3.7',
    titre: "Comptabilisation de l'affectation d'un bénéfice (Application 65)",
    navLabel: "Écritures d'affectation",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'Application 65 du Guide d'application comptabilise l'affectation d'un bénéfice de 150 000 000 décidée par l'assemblée générale ordinaire du 10/06/N : réserve légale 15 000 000, réserve statutaire 20 000 000, réserves facultatives 25 000 000, dividendes 89 000 000, report à nouveau 1 000 000. Les dividendes sont versés le 30/06/N.",
      },
      {
        type: 'carte',
        titre: "L'écriture d'affectation du bénéfice (10/06/N)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["1301", "", "Résultat en instance d'affectation : bénéfice", "150 000 000", ""],
            ["", "111", "Réserve légale", "", "15 000 000"],
            ["", "112", "Réserve statutaire", "", "20 000 000"],
            ["", "1181", "Réserves facultatives", "", "25 000 000"],
            ["", "465", "Associés, dividendes à payer", "", "89 000 000"],
            ["", "121", "Report à nouveau créditeur", "", "1 000 000"],
          ],
        },
      },
      {
        type: 'carte',
        titre: "Le paiement des dividendes (30/06/N)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["465", "", "Associés, dividendes à payer", "89 000 000", ""],
            ["", "521", "Banques", "", "89 000 000"],
          ],
        },
        note: "L'Application 65 présente l'écriture sans retenue fiscale. En RDC, lorsque les bénéficiaires sont soumis à la retenue de 20 %, le paiement se décompose entre la banque (net versé) et le compte 447 État, impôts retenus à la source (section 3.9).",
      },
      {
        type: 'paragraphe',
        texte: "L'écriture d'affectation se lit comme la traduction exacte de la résolution de l'assemblée : chaque montant voté devient un crédit, le résultat en instance d'affectation est soldé au débit. Trois cas particuliers enrichissent le schéma. Si l'assemblée distribue aussi un **report à nouveau créditeur antérieur**, le compte 121 est débité aux côtés du 1301 : l'AUDCIF prévoit expressément que le compte 12 est débité « par le crédit du 465 (Associés, dividendes à payer), pour le report à nouveau mis en distribution ». Si elle distribue des **réserves facultatives**, le compte 1181 est débité par le crédit du 465, la résolution indiquant le poste prélevé (art. 143, al. 3). Si le résultat comprend un **report à nouveau débiteur** à apurer, le 1301 est d'abord imputé sur ce report, par le crédit du 1291.",
      },
      {
        type: 'paragraphe',
        texte: "Entre le vote et le paiement, les dividendes votés sont une **dette** de la société envers ses associés, au passif circulant (rubrique DM Autres dettes, par les soldes créditeurs du compte 46). Les capitaux propres ont donc diminué dès le vote, avant même tout décaissement. À la clôture, un dividende voté mais non encore payé figure au passif, pas dans les capitaux propres. Inversement, une société qui clôture son exercice N avant la réunion de l'assemblée présente au bilan de N l'intégralité du résultat de N dans ses capitaux propres ; c'est au bilan de N+1 que l'affectation apparaîtra. Le lecteur des états financiers doit garder cette chronologie en tête.",
      },
      {
        type: 'paragraphe',
        texte: "Il arrive qu'un associé laisse son dividende à la disposition de la société au lieu de l'encaisser. Le dividende est alors « payé » par inscription en compte courant : l'AUDCIF prévoit que le compte 46 est débité des sommes réglées au titre des dividendes « par le crédit des comptes de trésorerie (ou des comptes courants) ». L'écriture devient : débit 465, crédit 4621 Associés, comptes courants. Le dividende n'est plus une dette de répartition mais une avance de l'associé, remboursable selon les conditions convenues. Sur le plan fiscal, la retenue reste due au moment de la mise à disposition du revenu, puisque l'arrêté n° 008/2025 vise aussi bien le versement que la « mise à disposition des bénéficiaires ». Et sur le plan du tableau des flux, aucune trésorerie ne sort : ce n'est pas un dividende versé.",
      },
      { type: 'controle', question: QCM[20] },
      { type: 'controle', question: QCM[21] },
    ],
  },
  {
    numero: '3.8',
    titre: "L'affectation d'une perte et l'apurement des pertes antérieures",
    navLabel: "Affectation d'une perte",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Lorsque l'exercice se solde par une perte, l'assemblée n'a rien à partager, mais elle doit décider du sort de cette perte. Le compte 13 est alors débiteur ; à la réouverture, il est porté au **1309 Résultat en instance d'affectation : perte**. L'AUDCIF indique que le compte 13 est « crédité, après la clôture de l'exercice et décision d'imputation des pertes, du montant du résultat déficitaire, par le débit des comptes 12 (Report à nouveau), 11 (Réserves), 101 (Capital social) ». Trois voies s'offrent donc à l'assemblée : reporter la perte à nouveau, l'imputer sur des réserves, ou réduire le capital.",
      },
      {
        type: 'carte',
        titre: "Les trois traitements d'une perte",
        tableau: {
          entetes: ["Décision", "Écriture", "Effet"],
          lignes: [
            ["Report à nouveau", "Débit 1291 Perte nette à reporter / crédit 1309", "La perte reste au passif en négatif et réduit le bénéfice distribuable futur (art. 143)"],
            ["Imputation sur réserves", "Débit 1181 (ou 112, 111) / crédit 1309", "Les réserves absorbent la perte ; aucune incidence sur le capital"],
            ["Réduction du capital", "Débit 1013 / crédit 1309 ou 1291", "Réduction motivée par des pertes, soumise à la procédure du chapitre 5 (Application 62)"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Le report à nouveau débiteur est inscrit au passif « en moins si son solde est débiteur » ; il constitue un élément des capitaux propres (AUDCIF, compte 12). Il n'est pas neutre : tant qu'il subsiste, il diminue le bénéfice distribuable des exercices suivants, puisque l'article 143 retranche les pertes antérieures, et il réduit l'assiette de la réserve légale, calculée sur le bénéfice diminué des pertes antérieures. Une société qui a accumulé des pertes doit donc d'abord les apurer avant de pouvoir distribuer. C'est une protection des créanciers : on ne partage pas les bénéfices d'une année tant que les pertes des années précédentes n'ont pas été compensées.",
      },
      {
        type: 'paragraphe',
        texte: "Lorsque les pertes deviennent importantes, le droit des sociétés impose une réaction. Si les capitaux propres deviennent inférieurs à la moitié du capital, les dirigeants doivent consulter les associés sur l'éventuelle dissolution anticipée ; à défaut de dissolution, la société doit reconstituer ses capitaux propres ou réduire son capital dans un délai déterminé. Ces règles, propres à chaque forme, sont étudiées au chapitre 5. Le comptable doit les anticiper : c'est à la lecture du report à nouveau débiteur et du total des capitaux propres, dès l'arrêté des comptes, que le seuil de la moitié se franchit.",
      },
      {
        type: 'paragraphe',
        texte: "L'AUDCIF prévoit aussi, lorsque la législation fiscale traite les amortissements différés différemment des pertes ordinaires, la substitution des sous-comptes **1291 Perte nette à reporter** et **1292 Perte, amortissements réputés différés** au compte 129. Il s'agit d'un suivi à finalité fiscale : la partie de la perte correspondant à des amortissements peut, selon la législation applicable, bénéficier d'un régime de report différent. La décision d'affectation ne change pas, mais la ventilation du report à nouveau débiteur doit être tenue avec soin pour que la déclaration fiscale puisse en tirer les conséquences.",
      },
      {
        type: 'paragraphe',
        texte: "Suivons une société sur trois exercices. En N, elle subit une perte de 30 000 000, que l'assemblée reporte à nouveau : débit 1291, crédit 1309. En N+1, elle réalise un bénéfice de 18 000 000 : la réserve légale se calcule sur 18 000 000 − 30 000 000, soit une assiette négative ; aucune dotation n'est due, et le bénéfice distribuable est nul. L'assemblée impute le bénéfice sur le report débiteur : débit 1301, crédit 1291 pour 18 000 000, qui ramène le report débiteur à 12 000 000. En N+2, elle réalise un bénéfice de 25 000 000 : l'assiette de la réserve légale est de 13 000 000, la dotation minimale de 1 300 000, et le bénéfice distribuable de 25 000 000 − 12 000 000 − 1 300 000 = 11 700 000. Trois années auront été nécessaires pour revenir à une situation où les associés peuvent être rémunérés.",
      },
      { type: 'controle', question: QCM[22] },
      { type: 'controle', question: QCM[23] },
    ],
  },
  {
    numero: '3.9',
    titre: "La fiscalité des distributions en RDC",
    navLabel: "Fiscalité des dividendes",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Depuis le 1er janvier 2026, les dividendes versés à des personnes physiques relèvent de l'**impôt sur le revenu des personnes physiques** (IRPP), dans la catégorie des **revenus des capitaux mobiliers** créée par la loi n° 23/053. Cette catégorie comprend quatre sous-catégories : produits des actions, parts sociales et revenus assimilés ; revenus des obligations ; revenus des créances, dépôts, cautionnements et comptes courants ; revenus des bons de caisse (art. 72). Pour les actions et parts sociales, la base d'imposition est « le montant brut des dividendes versés » (art. 81), et ces revenus font l'objet d'une **retenue à la source** de **20 %** (art. 120).",
      },
      {
        type: 'filet',
        titre: "Qui retient, et quand ? (arrêté ministériel n° 008/2025 du 19 février 2025)",
        texte: "Tout débiteur de revenus des capitaux mobiliers, c'est-à-dire la société qui verse le dividende et non l'associé qui le reçoit, doit calculer, retenir à la source et reverser l'IRPP de cette catégorie. Le reversement s'effectue auprès du service gestionnaire de l'Administration des impôts dont relève le débiteur, au plus tard le 15 du mois qui suit celui du versement des revenus ou de leur mise à disposition (art. 2 ; art. 18 bis de la loi relative aux procédures fiscales). L'arrêté précise que la retenue est opérée sur « le montant net du revenu imposable » (art. 3) ; pour les dividendes, la loi définit ce revenu imposable par le montant brut distribué (art. 81), si bien que la retenue porte en pratique sur le dividende brut.",
      },
      {
        type: 'carte',
        titre: "Comptabiliser un dividende soumis à la retenue",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["1301", "", "Affectation : dividende brut voté", "10 000 000", ""],
            ["", "465", "Associés, dividendes à payer", "", "10 000 000"],
            ["465", "", "Paiement aux associés", "10 000 000", ""],
            ["", "521", "Banques (net versé)", "", "8 000 000"],
            ["", "447", "État, impôts retenus à la source (20 %)", "", "2 000 000"],
            ["447", "", "Reversement au plus tard le 15 du mois suivant", "2 000 000", ""],
            ["", "521", "Banques", "", "2 000 000"],
          ],
        },
        note: "La retenue n'est pas une charge de la société : elle est prélevée sur le revenu de l'associé, que la société collecte pour le compte de l'État. Le dividende voté (brut) reste la mesure de la distribution.",
      },
      {
        type: 'paragraphe',
        texte: "La loi fiscale a une conception large de la distribution. Sont assimilés à des produits d'actions (art. 73) tous les bénéfices qui ne demeurent pas investis dans l'entreprise, notamment les sommes mises à la disposition des associés à titre d'avances, de prêts ou d'acomptes, sauf preuve contraire, les rémunérations et avantages occultes, la fraction non déductible des rémunérations des associés, les **indemnités de fonction et de session allouées aux membres des conseils d'administration**, et les recettes non déclarées. À l'inverse, ne sont pas des revenus distribués les remboursements d'apports ou de primes d'émission, à condition que tous les bénéfices et réserves autres que la réserve légale aient été auparavant répartis (art. 74). Un remboursement de capital n'échappe donc à l'impôt que si la société n'a plus de réserves distribuables.",
      },
      {
        type: 'paragraphe',
        texte: "Les indemnités de fonction des administrateurs illustrent l'écart entre le droit des sociétés et la fiscalité. En droit des sociétés, l'assemblée ordinaire peut allouer aux administrateurs une somme fixe annuelle à titre d'indemnité de fonction, répartie par le conseil (art. 431) ; hors contrat de travail, ils ne peuvent recevoir d'autres rémunérations que celles des articles 431 et 432, les dividendes régulièrement répartis restant évidemment permis (art. 430). En comptabilité, ces indemnités sont une charge de l'exercice, au compte **6581 Indemnités de fonction et autres rémunérations d'administrateurs**. Mais la loi fiscale les assimile à des revenus distribués (art. 73) : elles relèvent donc, chez leurs bénéficiaires, du régime des revenus de capitaux mobiliers.",
      },
      {
        type: 'paragraphe',
        texte: "Lorsque le dividende est versé à une **société mère**, la loi organise l'élimination de la double imposition : l'impôt payé sur les produits distribués s'impute sur celui dont la mère est redevable, si elle détient au moins 25 % du capital de la filiale, que les deux sièges sociaux sont en RDC, que l'imposition de la filiale est équivalente, et que les titres restent nominatifs au moins deux années consécutives (art. 76 et socle 2026) ; la rupture de l'engagement de conservation entraîne l'imposition des revenus indûment exonérés. Pour un associé résident d'un État lié à la RDC par une convention fiscale, le taux prélevé en RDC est plafonné par la convention : 5 % ou 15 % selon le seuil de détention de 25 % avec l'Afrique du Sud ; 10 % dans le cas général, ou 15 % pour certains dividendes de sociétés bénéficiant du Code des investissements, avec la Belgique (art. 10 des deux conventions).",
      },
      {
        type: 'paragraphe',
        texte: "La société peut elle-même être associée d'une autre et **recevoir** des dividendes. Ils constituent pour elle un produit financier, au compte 772 Revenus de participations et autres titres immobilisés (7721 pour les titres de participation), et entrent dans son résultat imposable : la loi n° 23/053 range les revenus bruts des capitaux mobiliers parmi les produits imposables à l'IS (art. 14). Pour éviter qu'un même bénéfice soit taxé deux fois, d'abord chez la filiale puis chez la mère, l'article 76 organise le régime mère-fille décrit plus haut. Le chapitre 7 reviendra sur la comptabilisation des titres et de leurs revenus chez la société qui les détient.",
      },
      { type: 'controle', question: QCM[24] },
      {
        type: 'paragraphe',
        texte: "La retenue s'inscrit dans un calendrier précis. Pour un dividende voté le 20 mai et payé le 28 juin, la société doit reverser la retenue au plus tard le 15 juillet, au moyen du formulaire de déclaration fourni par l'Administration des impôts (AM n° 008/2025, art. 2). Si le dividende voté n'est payé qu'en partie, la retenue suit chaque versement ou chaque mise à disposition, et non le vote lui-même. Le compte 447 doit être soldé à chaque échéance ; un solde ancien au crédit de ce compte à la clôture révèle une retenue collectée mais non reversée, ce qui expose la société aux pénalités de la loi relative aux procédures fiscales. Le comptable rapproche donc, mois par mois, les paiements portés au débit du 465 et les reversements portés au débit du 447.",
      },
      { type: 'controle', question: QCM[25] },
      { type: 'controle', question: QCM[26] },
      { type: 'controle', question: QCM[27] },
      { type: 'controle', question: QCM[28] },
    ],
  },
  {
    numero: '3.10',
    titre: "Présentation, flux de trésorerie et contrôle de la distribution",
    navLabel: "Présentation et contrôle",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'affectation du résultat laisse des traces dans chacun des états financiers de l'exercice suivant. Au **bilan**, les réserves (111 à 118) et le report à nouveau (121 ou 129) apparaissent dans les capitaux propres, les dividendes votés et non payés au passif circulant (465). Au **tableau des flux de trésorerie**, seuls les dividendes effectivement payés constituent un flux de financement : le Guide d'application les mesure par le « mouvement débit du compte 465, à l'exclusion des mouvements ne traduisant pas un flux réel (paiement de dividendes en actions, par exemple) ». Un dividende voté en juin et payé en juillet figure dans le TFT de l'exercice du paiement ; un dividende payé en actions n'y figure pas.",
      },
      {
        type: 'carte',
        titre: "Les contrôles avant toute distribution",
        liste: [
          "**Approbation** : les états financiers de l'exercice ont-ils été approuvés par l'organe compétent, dans les six mois (art. 140, 144) ?",
          "**Bénéfice distribuable** : calcul de l'article 143 refait, pertes antérieures et réserves obligatoires comprises.",
          "**Réserve légale** : dotation d'un dixième, plafond du cinquième du capital (art. 346, 546).",
          "**Butoir** : capitaux propres après distribution au moins égaux au capital augmenté des réserves indisponibles (art. 143, al. 4).",
          "**Réserves distribuées** : non indisponibles, postes prélevés indiqués dans la résolution (art. 143, al. 2 et 3).",
          "**Premier dividende** : calculé sur le montant libéré (art. 145).",
          "**Paiement** : dans les neuf mois de la clôture (art. 146), avec retenue de 20 % sur les revenus de capitaux mobiliers et reversement au plus tard le 15 du mois suivant (loi n° 23/053, art. 120 ; AM n° 008/2025).",
          "**Trésorerie** : capacité effective de payer sans compromettre la continuité de l'exploitation (art. 138).",
        ],
      },
      {
        type: 'paragraphe',
        texte: "Le commissaire aux comptes, lorsqu'il existe, vérifie la régularité et la sincérité des états financiers sur lesquels l'assemblée statue ; il reçoit les documents quarante-cinq jours avant l'assemblée (art. 140). Il n'est pas juge de l'opportunité d'un dividende, mais il doit s'assurer que le projet d'affectation présenté aux associés respecte la loi et les statuts, et que les comptes qui fondent le bénéfice distribuable sont fiables. Une distribution fondée sur des comptes erronés expose les associés à la répétition (art. 346), les dirigeants à la sanction de l'article 889, et la société à un redressement fiscal si des distributions déguisées sont découvertes (art. 73 de la loi n° 23/053).",
      },
      {
        type: 'paragraphe',
        texte: "Ce chapitre prépare les suivants. L'**incorporation de réserves au capital** (chapitre 4) utilise les réserves constituées par l'affectation ; la **réduction de capital pour pertes** (chapitre 5) traite le report à nouveau débiteur que l'affectation n'a pas pu apurer ; l'**amortissement du capital** (chapitre 5) rembourse le nominal sur des bénéfices ou réserves distribuables. Dans chaque cas, le comptable part de la même question : quelle masse de capitaux propres la loi permet-elle de mobiliser, et au profit de qui ? La réponse commence toujours par l'article 143.",
      },
      {
        type: 'paragraphe',
        texte: "Enfin, la distribution doit rester cohérente avec la politique financière de la société. Une entreprise qui distribue chaque année l'intégralité de son bénéfice distribuable ne constitue aucune réserve facultative : elle finance sa croissance par l'endettement, et ses capitaux propres stagnent. À l'inverse, une société qui ne distribue jamais rien peut décevoir ses associés et, fiscalement, la loi congolaise veille aux bénéfices qui sortent de l'entreprise sous d'autres formes que le dividende (art. 73). Les banques congolaises examinent la politique de distribution avant d'accorder un crédit, et les contrats de prêt comportent parfois des clauses qui limitent les dividendes tant que l'emprunt n'est pas remboursé. Le comptable, en présentant le tableau de répartition, éclaire ce choix qui appartient aux associés.",
      },
      { type: 'controle', question: QCM[29] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas1',
    titre: "KASAI CIMENT SA : tableau de répartition complet",
    contexte: "KASAI CIMENT SA a un capital de 100 000 000 FC (10 000 actions de 10 000 FC, libérées des trois quarts). Réserve légale existante : 16 000 000. Report à nouveau créditeur : 2 000 000. Le bénéfice net de l'exercice N est de 36 000 000 (aucune perte antérieure). Les statuts prévoient : dotation à une réserve statutaire de 5 000 000 ; premier dividende de 6 % l'an sur le montant libéré des actions. L'assemblée du 15/05/N+1 décide en outre un superdividende de 2 000 par action, le solde étant reporté à nouveau. Les dividendes sont payés le 30/06/N+1.",
    questions: [
      {
        num: 1,
        enonce: "Calculez la dotation à la réserve légale.",
        correction: "Dotation minimale : 1/10 × 36 000 000 = 3 600 000 (bénéfice non diminué de pertes antérieures, il n'y en a pas). Plafond : la dotation cesse d'être obligatoire lorsque la réserve atteint 1/5 × 100 000 000 = 20 000 000 ; la réserve passera de 16 000 000 à 19 600 000, sous le plafond : la dotation de 3 600 000 est due en entier (art. 546, 2°).",
      },
      {
        num: 2,
        enonce: "Calculez le bénéfice distribuable au sens de l'article 143.",
        correction: "Bénéfice distribuable = résultat de l'exercice (36 000 000) + report bénéficiaire (2 000 000) − pertes antérieures (0) − sommes portées en réserve en application de la loi ou des statuts (réserve légale 3 600 000 + réserve statutaire 5 000 000) = 29 400 000.",
      },
      {
        num: 3,
        enonce: "Calculez le premier dividende, le superdividende et le dividende total par action.",
        correction: "Premier dividende : 6 % du montant libéré, soit 6 % × 7 500 = 450 par action, donc 4 500 000 au total (art. 145 : intérêt sur le montant libéré). Superdividende : 2 000 par action, soit 20 000 000. Dividende total : 2 450 par action, soit 24 500 000 — inférieur au bénéfice distribuable (29 400 000), la distribution est régulière. Report à nouveau : 29 400 000 − 24 500 000 = 4 900 000.",
      },
      {
        num: 4,
        enonce: "Passez l'écriture d'affectation du 15/05/N+1 et celle du paiement du 30/06/N+1.",
        correction: "Affectation : débit 1301 Résultat en instance d'affectation : bénéfice 36 000 000 et débit 121 Report à nouveau créditeur 2 000 000 / crédit 111 Réserve légale 3 600 000, crédit 112 Réserve statutaire 5 000 000, crédit 465 Associés — Dividendes à payer 24 500 000, crédit 121 Report à nouveau créditeur 4 900 000 (schéma de l'Application 65). Contrôle : débits 38 000 000 = crédits 38 000 000. Paiement : débit 465 24 500 000 / crédit 521 Banques 24 500 000 — dans le délai de neuf mois après la clôture (art. 146).",
      },
      {
        num: 5,
        enonce: "L'assemblée pouvait-elle se tenir le 15/05/N+1 et payer le 30/06/N+1 ?",
        correction: "Oui. L'assemblée statuant sur les états financiers doit se tenir dans les six mois de la clôture (art. 140) : le 15/05/N+1 respecte le délai pour une clôture au 31/12/N. La mise en paiement doit intervenir au plus tard neuf mois après la clôture, soit le 30/09/N+1 (art. 146) : le 30/06/N+1 est régulier. Les états financiers et le rapport de gestion devaient être adressés au commissaire aux comptes au moins quarante-cinq jours avant l'assemblée, soit au plus tard le 31/03/N+1 (art. 140).",
      },
    ],
  },
  {
    id: 'cas2',
    titre: "LOMAMI SARL : pertes antérieures et plafond de la réserve légale",
    contexte: "LOMAMI SARL (capital 20 000 000 FC) présente : réserve légale existante 3 700 000 ; report à nouveau débiteur 2 000 000 (perte N−1) ; bénéfice net de l'exercice N : 12 000 000. L'assemblée souhaite distribuer le maximum possible.",
    questions: [
      {
        num: 1,
        enonce: "Calculez la dotation obligatoire à la réserve légale.",
        correction: "L'assiette est le bénéfice de l'exercice diminué des pertes antérieures : 12 000 000 − 2 000 000 = 10 000 000 (art. 346, al. 2). Dotation d'un dixième : 1 000 000. Plafond : 1/5 × 20 000 000 = 4 000 000 ; la réserve existante est de 3 700 000, il ne manque que 300 000. La dotation obligatoire est donc limitée à 300 000.",
      },
      {
        num: 2,
        enonce: "Calculez le bénéfice distribuable maximal.",
        correction: "Bénéfice distribuable = 12 000 000 (résultat) − 2 000 000 (pertes antérieures) − 300 000 (réserve légale) = 9 700 000 (art. 143 : pas de report bénéficiaire, pas de réserve statutaire en l'espèce).",
      },
      {
        num: 3,
        enonce: "Passez l'écriture d'affectation si l'assemblée distribue la totalité du distribuable.",
        correction: "Débit 1301 Résultat en instance d'affectation : bénéfice 12 000 000 / crédit 1291 Perte nette à reporter 2 000 000 (apurement du report débiteur), crédit 111 Réserve légale 300 000, crédit 465 Associés — Dividendes à payer 9 700 000.",
      },
      {
        num: 4,
        enonce: "Un associé propose de distribuer en outre 1 000 000 prélevés sur la réserve légale « puisqu'elle est presque pleine ». Analysez.",
        correction: "Impossible. La réserve légale est une réserve que la loi ne permet pas de distribuer : l'article 143, alinéa 2, n'autorise la distribution que des réserves non indisponibles, et frappe de nullité toute délibération contraire. En outre, le butoir de l'article 143, dernier alinéa, interdit toute distribution qui rendrait les capitaux propres inférieurs au capital augmenté des réserves indisponibles.",
      },
      {
        num: 5,
        enonce: "Deux ans plus tard, il apparaît que le bénéfice N avait été surévalué par une écriture fictive et que le dividende ne correspondait pas à des bénéfices réellement acquis. La société peut-elle récupérer les sommes ?",
        correction: "Oui : la répétition des dividendes ne correspondant pas à des bénéfices réellement acquis peut être exigée des associés qui les ont reçus (art. 346, al. 3). L'action en répétition se prescrit par trois ans à compter de la date de mise en distribution (art. 346, al. 4) : intentée deux ans après, elle est recevable. Le dividende irrégulièrement distribué est par ailleurs un dividende fictif au sens de l'article 144.",
      },
    ],
  },
  {
    id: 'cas3',
    titre: "HAUT-LOMAMI SA : distribution de réserves et butoir des capitaux propres",
    contexte: "HAUT-LOMAMI SA présente au 31/12/N, après une perte de l'exercice de 8 000 000 déjà virée en report à nouveau débiteur : capital 50 000 000 ; réserve légale 10 000 000 ; réserves facultatives 15 000 000 ; report à nouveau débiteur 8 000 000. Capitaux propres : 67 000 000. Sans bénéfice à distribuer, l'assemblée envisage de verser aux actionnaires 10 000 000 par prélèvement « sur les réserves ».",
    questions: [
      {
        num: 1,
        enonce: "Une distribution est-elle en principe possible sans bénéfice de l'exercice ?",
        correction: "Oui : l'article 143, alinéa 2, permet à l'assemblée de décider la distribution de tout ou partie des réserves, à condition qu'il ne s'agisse pas de réserves indisponibles (loi ou statuts) et qu'elle indique expressément les postes de réserve prélevés (al. 3). Seules les réserves facultatives (15 000 000) sont ici éligibles — jamais la réserve légale.",
      },
      {
        num: 2,
        enonce: "Vérifiez la distribution projetée de 10 000 000 au regard du butoir de l'article 143, dernier alinéa.",
        correction: "Le butoir : après distribution, les capitaux propres ne peuvent être inférieurs au capital augmenté des réserves indisponibles, soit 50 000 000 + 10 000 000 (réserve légale) = 60 000 000. Capitaux propres après distribution : 67 000 000 − 10 000 000 = 57 000 000 < 60 000 000 : la distribution serait nulle. Le maximum distribuable est 67 000 000 − 60 000 000 = 7 000 000 — économiquement, les réserves facultatives (15 000 000) sont partiellement absorbées par le report à nouveau débiteur (8 000 000).",
      },
      {
        num: 3,
        enonce: "L'assemblée décide finalement de distribuer 7 000 000 prélevés sur les réserves facultatives. Passez l'écriture.",
        correction: "Débit 1181 Réserves facultatives 7 000 000 / crédit 465 Associés — Dividendes à payer 7 000 000, la résolution indiquant expressément le poste prélevé (art. 143, al. 3). Paiement : débit 465 / crédit 521 pour 7 000 000.",
      },
      {
        num: 4,
        enonce: "Que deviendrait une délibération votant malgré tout les 10 000 000 ?",
        correction: "Elle serait nulle : l'article 143, dernier alinéa, frappe de nullité toute délibération de distribution faite alors que les capitaux propres sont ou deviendraient inférieurs au capital augmenté des réserves indisponibles. Les sommes versées ne correspondraient pas à des bénéfices réellement acquis : la répétition pourrait en être exigée des associés dans les trois ans de la mise en distribution.",
      },
    ],
  },
  {
    id: 'cas4',
    titre: "SANKURU TEXTILE SA : affectation d'une perte et retour au bénéfice",
    contexte: "SANKURU TEXTILE SA (capital 40 000 000, réserve légale 5 000 000) clôt l'exercice N sur une perte de 6 000 000. L'exercice N+1 dégage un bénéfice de 9 000 000. Aucune réserve statutaire n'est prévue.",
    questions: [
      {
        num: 1,
        enonce: "Passez l'écriture d'affectation de la perte N décidée par l'assemblée de N+1 (report à nouveau).",
        correction: "La perte en instance d'affectation loge au 1309. Affectation au report débiteur : débit 1291 Perte nette à reporter 6 000 000 / crédit 1309 Résultat en instance d'affectation : perte 6 000 000. L'assemblée aurait aussi pu l'imputer sur des réserves (débit du compte 11) ou réduire le capital (chapitre 5), selon le fonctionnement du compte 13 décrit par l'AUDCIF.",
      },
      {
        num: 2,
        enonce: "Pour l'exercice N+1, calculez la dotation à la réserve légale.",
        correction: "Assiette : bénéfice de l'exercice diminué des pertes antérieures = 9 000 000 − 6 000 000 = 3 000 000 (art. 546, 2°). Dotation d'un dixième : 300 000. Plafond : 1/5 × 40 000 000 = 8 000 000, non atteint (5 000 000 + 300 000 = 5 300 000) : la dotation de 300 000 est due.",
      },
      {
        num: 3,
        enonce: "Calculez le bénéfice distribuable de N+1.",
        correction: "Bénéfice distribuable = 9 000 000 − 6 000 000 (pertes antérieures) − 300 000 (réserve légale) = 2 700 000 (art. 143).",
      },
      {
        num: 4,
        enonce: "L'assemblée distribue 2 500 000 et reporte le solde. Passez l'écriture d'affectation complète de N+1.",
        correction: "Débit 1301 Résultat en instance d'affectation : bénéfice 9 000 000 / crédit 1291 Perte nette à reporter 6 000 000 (apurement du report débiteur), crédit 111 Réserve légale 300 000, crédit 465 Associés — Dividendes à payer 2 500 000, crédit 121 Report à nouveau créditeur 200 000. Le paiement interviendra au plus tard neuf mois après la clôture de N+1 (art. 146).",
      },
    ],
  },
  {
    id: 'cas5',
    titre: "BANDAL MOTORS SA : de l'impôt au paiement du dividende",
    contexte: "BANDAL MOTORS SA, établie à Kinshasa, a un capital de 200 000 000 FC (20 000 actions de 10 000 FC) : 15 000 actions sont entièrement libérées, 5 000 ne le sont que de moitié (compte 109 : 25 000 000). Au 31/12/N : réserve légale 36 000 000, réserves facultatives existantes 60 000 000, report à nouveau créditeur 1 250 000. Le résultat comptable avant impôt est de 150 000 000 ; les réintégrations fiscales s'élèvent à 10 000 000 ; le chiffre d'affaires déclaré est de 3 000 000 000. Les statuts prévoient une réserve statutaire annuelle de 4 000 000 et un premier dividende de 5 % du montant libéré. L'assemblée décide en outre de doter 20 000 000 aux réserves facultatives, de verser un superdividende arrondi à la centaine de francs inférieure et de reporter le solde. Tous les actionnaires sont des personnes physiques résidentes.",
    questions: [
      { num: 1, enonce: "Calculez l'impôt sur les sociétés et le résultat net à affecter.", correction: "Bénéfice imposable : 150 000 000 + 10 000 000 = 160 000 000. IS à 30 % (loi n° 23/053, art. 56) : 48 000 000. Impôt minimum : 1 % × 3 000 000 000 = 30 000 000 (art. 57), inférieur : l'IS de 48 000 000 est dû. Écriture : débit 891 / crédit 441 48 000 000. Résultat net : 150 000 000 − 48 000 000 = 102 000 000." },
      { num: 2, enonce: "Calculez la dotation à la réserve légale et le bénéfice distribuable.", correction: "Dotation minimale : 1/10 × 102 000 000 = 10 200 000 ; plafond : 1/5 × 200 000 000 − 36 000 000 = 4 000 000. Dotation obligatoire : 4 000 000 (art. 546, 2°). Bénéfice distribuable (art. 143) : 102 000 000 + 1 250 000 (report bénéficiaire) − 4 000 000 (réserve légale) − 4 000 000 (réserve statutaire) = 95 250 000." },
      { num: 3, enonce: "Établissez la répartition : premier dividende, réserves facultatives, superdividende, report à nouveau.", correction: "Montant libéré : 15 000 × 10 000 + 5 000 × 5 000 = 175 000 000. Premier dividende : 5 % × 175 000 000 = 8 750 000 (500 par action libérée, 250 par action libérée de moitié, art. 145). Réserves facultatives : 20 000 000. Solde : 95 250 000 − 8 750 000 − 20 000 000 = 66 500 000, soit 3 325 par action ; superdividende arrondi à 3 300, soit 66 000 000. Report à nouveau : 500 000. Dividende total : 74 750 000, soit 3 800 par action entièrement libérée et 3 550 par action libérée de moitié." },
      { num: 4, enonce: "Vérifiez le butoir des capitaux propres (art. 143, al. 4).", correction: "Capitaux propres avant distribution : capital 200 000 000 − capital non appelé 25 000 000 + réserve légale 36 000 000 + réserves facultatives 60 000 000 + report 1 250 000 + résultat 102 000 000 = 374 250 000. Après distribution de 74 750 000 : 299 500 000. Seuil protégé : capital 200 000 000 + réserve légale après dotation 40 000 000 + réserve statutaire 4 000 000 (supposée indisponible) = 244 000 000. 299 500 000 ≥ 244 000 000 : la distribution est régulière." },
      { num: 5, enonce: "Passez l'écriture d'affectation.", correction: "Débit 1301 Résultat en instance d'affectation : bénéfice 102 000 000 ; débit 121 Report à nouveau créditeur 1 250 000 ; crédit 111 Réserve légale 4 000 000 ; crédit 112 Réserves statutaires 4 000 000 ; crédit 1181 Réserves facultatives 20 000 000 ; crédit 465 Associés, dividendes à payer 74 750 000 ; crédit 121 Report à nouveau créditeur 500 000. Total débits = total crédits = 103 250 000." },
      { num: 6, enonce: "Passez les écritures de paiement et de reversement de la retenue, et fixez le calendrier.", correction: "Retenue de 20 % (loi n° 23/053, art. 120) : 14 950 000. Paiement : débit 465 74 750 000 / crédit 521 59 800 000 et crédit 447 État, impôts retenus à la source 14 950 000. Reversement au plus tard le 15 du mois suivant le paiement (AM n° 008/2025, art. 2) : débit 447 / crédit 521 14 950 000. Calendrier : documents au commissaire aux comptes 45 jours avant l'assemblée, assemblée au plus tard le 30/06/N+1, dépôt au RCCM dans le mois de l'approbation, paiement au plus tard le 30/09/N+1 (art. 140, 146, 269)." },
    ],
  },
  {
    id: 'cas6',
    titre: "LUKUGA HOLDING : distributions déguisées, étrangers et société mère",
    contexte: "Mission de conseil fiscal pour trois sociétés congolaises. (a) KALEMIE PORT SARL a versé en cours d'année à son associé principal, M. T., 15 000 000 FC d'« avances » sans convention, et verse 8 000 000 d'indemnités à ses deux administrateurs d'une filiale SA. (b) KALEMIE PORT distribue 20 000 000 de dividendes, dont 40 % à Mme B., résidente de Belgique, et 60 % à M. T., résident congolais ; la société n'est pas placée sous le Code des investissements. (c) LUKUGA HOLDING SA, siège à Lubumbashi, détient depuis trois ans, sous forme nominative, 30 % du capital de KALEMIE PORT SARL.",
    questions: [
      { num: 1, enonce: "Quel est le traitement fiscal des « avances » versées à M. T. ?", correction: "La loi n° 23/053 assimile aux produits d'actions les sommes mises à la disposition des associés à titre d'avances, de prêts ou d'acomptes, sauf preuve contraire (art. 73). Faute de convention et de remboursement démontrés, les 15 000 000 risquent d'être requalifiés en revenus distribués, soumis à la retenue de 20 % (art. 120). En comptabilité, ces sommes figurent au débit du 462 Associés, comptes courants ; la société a intérêt à formaliser une convention écrite et un échéancier de remboursement." },
      { num: 2, enonce: "Comment traiter les indemnités des administrateurs de la filiale SA, en comptabilité et en fiscalité ?", correction: "En droit des sociétés, l'assemblée ordinaire peut allouer aux administrateurs une indemnité de fonction fixe annuelle, que le conseil répartit (art. 431 AUSCGIE). En comptabilité, c'est une charge au compte 6581 Indemnités de fonction et autres rémunérations d'administrateurs. En fiscalité, la loi n° 23/053 assimile les indemnités de fonction et de session des membres des conseils d'administration à des produits d'actions (art. 73) : elles relèvent chez les bénéficiaires des revenus de capitaux mobiliers." },
      { num: 3, enonce: "Calculez l'impôt prélevé en RDC sur le dividende de M. T. et sur celui de Mme B.", correction: "M. T. : 60 % × 20 000 000 = 12 000 000 ; retenue de 20 % = 2 400 000 (art. 120). Mme B. : 40 % × 20 000 000 = 8 000 000. La convention RDC-Belgique limite l'impôt prélevé en RDC à 10 % dans le cas général, le taux de 15 % visant les dividendes de sociétés dont les bénéfices sont exemptés en vertu du Code des investissements (art. 10) : 10 % × 8 000 000 = 800 000, sous réserve que Mme B. justifie de sa résidence belge et qu'elle soit bénéficiaire effective." },
      { num: 4, enonce: "Passez l'écriture de paiement des dividendes et du reversement.", correction: "Retenues : 2 400 000 + 800 000 = 3 200 000. Paiement : débit 465 20 000 000 / crédit 521 16 800 000 et crédit 447 État, impôts retenus à la source 3 200 000. Reversement au plus tard le 15 du mois suivant (AM n° 008/2025, art. 2 ; LPF, art. 18 bis) : débit 447 / crédit 521 3 200 000." },
      { num: 5, enonce: "LUKUGA HOLDING peut-elle bénéficier du régime mère-fille sur les dividendes reçus de KALEMIE PORT ?", correction: "Les conditions de l'article 76 de la loi n° 23/053 sont une participation d'au moins 25 % (30 % en l'espèce), des sièges sociaux en RDC (Lubumbashi et Kalemie), une imposition équivalente de la filiale, et la conservation des titres sous forme nominative pendant au moins deux années consécutives (trois ans en l'espèce). Elles paraissent réunies : l'impôt payé sur les produits distribués s'impute sur celui dont la mère est redevable. Si LUKUGA cédait ses titres avant le terme de l'engagement, les revenus indûment exonérés seraient imposés. Le régime vise les sociétés par actions ou à responsabilité limitée détenant des titres d'une autre (art. 76) : LUKUGA, SA, est concernée." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 3,
  id: 'ue3-chapitre-3',
  titre: "L'affectation du résultat et la distribution des dividendes",
  sousTitre: "AUSCGIE révisé, art. 137-146, 269, 346-349, 430-431, 546, 754-756, 853-11, 889-890-1 · AUDCIF, comptes 11 à 13 · SYSCOHADA, Application 65 · loi n° 23/053 et AM n° 008/2025",
  infoBulle: "De l'arrêté des comptes au paiement des dividendes : rapport de gestion et calendrier, impôt sur les sociétés et résultat net, approbation selon la forme, bénéfice distribuable et butoir des capitaux propres, réserve légale, dividende fictif, premier dividende et superdividende, écritures de l'Application 65, affectation d'une perte, retenue de 20 % sur les dividendes en RDC, régime mère-fille, et contrôle de la distribution.",
  loiRef: "Art. 137-146, 269, 346-349, 430-432, 546, 558-559, 754-756, 778-13, 853-11, 889-890-1 AUSCGIE · loi n° 23/053, art. 56-57, 72-76, 81, 120 · AM n° 008/2025",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Situer l'arrêté et l'approbation des comptes et en respecter le calendrier (art. 137-141, 146, 269)",
    "Passer du résultat comptable au résultat net à affecter en appliquant l'IS congolais (loi n° 23/053, art. 56-57)",
    "Identifier l'organe qui approuve les comptes selon la forme sociale (art. 546, 347-349, 853-11)",
    "Calculer le bénéfice distribuable et appliquer le butoir des capitaux propres (art. 143)",
    "Doter la réserve légale et reconnaître un dividende fictif et ses sanctions (art. 144, 346, 546, 889)",
    "Décomposer et comptabiliser un dividende : premier dividende, superdividende, report à nouveau (art. 145 ; Application 65)",
    "Comptabiliser l'affectation d'une perte et en mesurer les effets sur les distributions futures",
    "Appliquer la retenue de 20 % sur les dividendes en RDC, le régime mère-fille et les conventions fiscales (loi n° 23/053 ; AM n° 008/2025)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Les organes de gestion arrêtent les états financiers et établissent le rapport de gestion (art. 137-138) ; documents au commissaire aux comptes 45 jours avant l'assemblée, assemblée dans les six mois, dépôt au RCCM dans le mois de l'approbation, paiement des dividendes dans les neuf mois de la clôture (art. 140, 146, 269).",
    "L'assemblée affecte le résultat net, après IS : en RDC, 30 % du bénéfice imposable, avec un impôt minimum de 1 % du chiffre d'affaires (loi n° 23/053, art. 56-57) ; charge au 891, dette au 441.",
    "Approbation : AGO dans la SA (art. 546), décision collective ordinaire à plus de la moitié du capital dans la SARL (art. 347-349), décision collective obligatoire dans la SAS ; dans la SASU dont l'associé personne physique est président, le dépôt des comptes signés vaut approbation (art. 853-11).",
    "Bénéfice distribuable = résultat + report bénéficiaire − pertes antérieures − dividendes partiels réguliers − réserves légales et statutaires (art. 143).",
    "Réserve légale : un dixième au moins du bénéfice diminué des pertes antérieures, jusqu'au cinquième du capital ; indisponible ; délibération contraire nulle (art. 346, 546).",
    "Distribution de réserves possible, sauf réserves indisponibles, postes prélevés indiqués ; butoir : les capitaux propres ne peuvent devenir inférieurs au capital augmenté des réserves indisponibles (art. 143).",
    "Dividende fictif : distribué en violation de l'article 144 ; répétition dans les trois ans (art. 346) ; sanction pénale des dirigeants en cas d'inventaire absent ou frauduleux (art. 889).",
    "Premier dividende calculé sur le montant libéré (art. 145) ; superdividende uniforme par titre ; arrondis au report à nouveau (AUDCIF, compte 12).",
    "Application 65 : débit 1301 (et 121 pour un report distribué) / crédit 111, 112, 1181, 465, 121 ; paiement : débit 465 / crédit 521. Une perte est reportée (1291), imputée sur les réserves ou sur le capital.",
    "En RDC, les dividendes versés aux personnes physiques subissent une retenue de 20 % (art. 120), calculée, retenue et reversée par la société au plus tard le 15 du mois suivant (AM n° 008/2025) : débit 465 / crédit 521 (net) et 447 (retenue). Régime mère-fille : 25 %, sièges en RDC, titres nominatifs deux ans (art. 76).",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)", precision: "30 janvier 2014 ; art. 137 à 146, 269, 346 à 349, 430 à 432, 546, 558-559, 754 à 756, 778-13, 853-11, 889 à 890-1" },
    { genre: 'texte', intitule: "Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF)", precision: "Titre VII, comptes 11 (réserves), 12 (report à nouveau) et 13 (résultat net)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, Guide d'application", precision: "Application 65 (affectation du résultat et paiement des dividendes) ; logique du tableau des flux de trésorerie (dividendes versés)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, plan de comptes", precision: "comptes 111 à 1188, 121, 129 (1291, 1292), 130 (1301, 1309), 441, 447, 465, 6581, 891, 895" },
    { genre: 'texte', intitule: "Loi n° 23/053 du 30 novembre 2023 relative à l'impôt sur les sociétés et à l'impôt sur le revenu des personnes physiques", precision: "art. 56 et 57 (IS), 72 à 76 et 81 (revenus des capitaux mobiliers, régime mère-fille), 120 (retenue de 20 %)" },
    { genre: 'texte', intitule: "Arrêté ministériel n° 008/CAB/MIN/FINANCES/2025 du 19 février 2025 fixant les modalités de perception et de reversement de la retenue de l'IRPP dans la catégorie des revenus des capitaux mobiliers", precision: "art. 1 à 4 ; entrée en vigueur le 1er janvier 2026" },
    { genre: 'texte', intitule: "Loi n° 004/2003 du 13 mars 2003 portant réforme des procédures fiscales, modifiée par la loi n° 23/052 et par la loi de finances n° 25/060 pour l'exercice 2026", precision: "art. 18 bis (reversement de la retenue) et 57 bis (acomptes provisionnels)" },
    { genre: 'texte', intitule: "Conventions fiscales RDC-Afrique du Sud et RDC-Belgique", precision: "art. 10 (dividendes)" },
    { genre: 'ouvrage', auteur: "Mapapa Mbangala A., Nkoy Mbangala C. et Mensah Freitas C.", titre: "Comptabilité des sociétés OHADA", editeur: "Droit Afrique", lieu: "s.l.", annee: "2026" },
    { genre: 'ouvrage', auteur: "Nzoimbengene Luyindula B. D.", titre: "Comptabilité des sociétés suivant le système comptable OHADA révisé", editeur: "2e éd., à compte d'auteur", lieu: "s.l.", annee: "2025" },
    { genre: 'ouvrage', auteur: "Dobill M.", titre: "Comptabilité OHADA, tome 3 : comptabilité des sociétés", editeur: "Karthala", lieu: "Paris", annee: "2013" },
    { genre: 'ouvrage', auteur: "Pougoué P.-G. (dir.)", titre: "Encyclopédie du droit OHADA", editeur: "Lamy", lieu: "Paris", annee: "2011" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE révisé du 30 janvier 2014 · AUDCIF et SYSCOHADA révisé (Application 65) · loi n° 23/053 du 30 novembre 2023 · arrêté ministériel n° 008/2025 · loi de finances n° 25/060 pour 2026 · conventions fiscales RDC-Afrique du Sud et RDC-Belgique.",
}

export default chapitre
