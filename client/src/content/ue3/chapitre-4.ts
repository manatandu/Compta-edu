import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 3 — CHAPITRE 4 : L'AUGMENTATION DE CAPITAL
// SA : AUSCGIE art. 562-615 (procédés, AGE, DPS, prime, libération, DNSV).
// SARL : art. 360-363. Comptabilisation : Applications 60 (numéraire avec
// prime 1051) et 61 (incorporation de réserves) du Guide SYSCOHADA.
// La valeur théorique du droit de souscription est présentée comme technique
// financière de la pratique, non comme règle légale.
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1',
    question: "Selon l'article 562 de l'AUSCGIE, le capital d'une SA est augmenté :",
    options: [
      { id: 'a', texte: "Uniquement par émission d'actions nouvelles" },
      { id: 'b', texte: "Soit par émission d'actions ordinaires ou de préférence, soit par majoration du montant nominal des actions existantes" },
      { id: 'c', texte: "Uniquement par incorporation de réserves" },
      { id: 'd', texte: "Par simple décision du conseil d'administration" },
      { id: 'e', texte: "Par réévaluation des actifs" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 562 distingue deux procédés : émission d'actions (ordinaires ou de préférence) ou majoration du nominal des actions existantes. La majoration du nominal exige le consentement unanime des actionnaires — sauf lorsqu'elle est réalisée par incorporation de réserves, bénéfices ou primes. Les actions nouvelles sont libérées en espèces, par compensation de créances certaines, liquides et exigibles, par incorporation de réserves, bénéfices ou primes, ou par apport en nature.",
    articleRef: "AUSCGIE, art. 562",
  },
  {
    id: 'q2',
    question: "Quel organe est compétent pour décider une augmentation de capital de SA ?",
    options: [
      { id: 'a', texte: "Le conseil d'administration, librement" },
      { id: 'b', texte: "L'assemblée générale extraordinaire, seule, sur les rapports du conseil d'administration (ou de l'administrateur général) et du commissaire aux comptes" },
      { id: 'c', texte: "L'assemblée générale ordinaire dans tous les cas" },
      { id: 'd', texte: "Le président-directeur général" },
      { id: 'e', texte: "La juridiction compétente" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 564 réserve à l'assemblée générale extraordinaire la compétence pour décider ou autoriser l'augmentation, sur le rapport du conseil d'administration ou de l'administrateur général et sur celui du commissaire aux comptes. Exception de procédure : l'augmentation par incorporation de réserves, bénéfices ou primes est votée aux conditions de quorum et de majorité des assemblées ordinaires (art. 565). Toute clause conférant au conseil le pouvoir de décider l'augmentation est réputée non écrite (art. 569).",
    articleRef: "AUSCGIE, art. 564, 565 et 569",
  },
  {
    id: 'q3',
    question: "L'assemblée peut-elle déléguer l'augmentation de capital au conseil d'administration ?",
    options: [
      { id: 'a', texte: "Non, jamais" },
      { id: 'b', texte: "Oui : déléguer la compétence de décider (durée maximale de 24 mois et plafond global fixés par l'assemblée, art. 567-1) ou les pouvoirs de réaliser une augmentation qu'elle a décidée (art. 568)" },
      { id: 'c', texte: "Oui, sans limite de durée ni de montant" },
      { id: 'd', texte: "Uniquement pour les sociétés cotées" },
      { id: 'e', texte: "Oui, mais seulement au commissaire aux comptes" },
    ],
    reponseCorrecte: 'b',
    explication: "Deux délégations distinctes : la délégation de compétence (art. 567-1) — l'assemblée autorise l'augmentation et délègue au conseil ou à l'administrateur général la décision, en fixant la durée d'utilisation (24 mois au plus) et le plafond global — et la délégation de pouvoirs (art. 568) — l'assemblée décide elle-même et délègue la réalisation, la fixation des modalités et la constatation. En dehors de ces cadres, toute clause donnant au conseil le pouvoir de décider est réputée non écrite (art. 569).",
    articleRef: "AUSCGIE, art. 567-1, 568 et 569",
  },
  {
    id: 'q4',
    question: "Dans quel délai l'augmentation de capital décidée doit-elle être réalisée ?",
    options: [
      { id: 'a', texte: "Six mois" },
      { id: 'b', texte: "Trois ans à compter de l'assemblée générale qui l'a décidée ou autorisée ; elle est réputée réalisée au jour de l'établissement de la déclaration notariée de souscription et de versement" },
      { id: 'c', texte: "Un an, sans exception" },
      { id: 'd', texte: "Cinq ans" },
      { id: 'e', texte: "Aucun délai n'est prévu" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 571 : réalisation dans les trois ans de l'assemblée qui a décidé ou autorisé l'opération ; l'augmentation est réputée réalisée à compter du jour de l'établissement de la DNSV. Autre préalable impératif : le capital ancien doit être intégralement libéré avant toute émission d'actions nouvelles à libérer en numéraire (art. 572) — cohérent avec l'interdiction déjà rencontrée à l'article 389.",
    articleRef: "AUSCGIE, art. 571 et 572",
  },
  {
    id: 'q5',
    question: "Le droit préférentiel de souscription (DPS) est :",
    options: [
      { id: 'a', texte: "Un droit facultatif que les statuts peuvent supprimer par avance" },
      { id: 'b', texte: "Un droit de préférence irréductible, proportionnel au montant des actions détenues, à la souscription des actions de numéraire nouvelles" },
      { id: 'c', texte: "Un droit réservé aux administrateurs" },
      { id: 'd', texte: "Un droit de percevoir le premier dividende" },
      { id: 'e', texte: "Un droit incessible et non négociable" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 573 : les actions comportent un droit préférentiel de souscription ; les actionnaires ont, proportionnellement au montant de leurs actions, un droit de préférence irréductible à la souscription des actions de numéraire émises. Pendant la souscription, le DPS est négociable lorsqu'il est détaché d'actions négociables, sinon cessible dans les mêmes conditions que l'action (art. 574). L'assemblée peut en outre instituer expressément un droit de souscription à titre réductible (art. 575-576).",
    articleRef: "AUSCGIE, art. 573-576",
  },
  {
    id: 'q6',
    question: "Quel délai minimal est accordé aux actionnaires pour exercer leur DPS ?",
    options: [
      { id: 'a', texte: "Dix jours" },
      { id: 'b', texte: "Vingt jours à compter de l'ouverture de la souscription — avec clôture anticipée possible si tous les droits sont exercés ou l'augmentation intégralement souscrite après renonciations" },
      { id: 'c', texte: "Trente jours incompressibles" },
      { id: 'd', texte: "Trois mois" },
      { id: 'e', texte: "Aucun délai minimal" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 577 : le délai d'exercice ne peut être inférieur à vingt jours à compter de l'ouverture de la souscription. L'article 578 permet la clôture par anticipation dès que tous les droits à titre irréductible — et, le cas échéant, réductible — ont été exercés, ou que l'augmentation a été intégralement souscrite après renonciation individuelle des actionnaires non souscripteurs.",
    articleRef: "AUSCGIE, art. 577 et 578",
  },
  {
    id: 'q7',
    question: "Les souscriptions n'absorbent pas la totalité de l'augmentation. Que permet l'article 579 ?",
    options: [
      { id: 'a', texte: "L'opération est automatiquement annulée dans tous les cas" },
      { id: 'b', texte: "Limiter l'augmentation au montant souscrit (si ≥ trois quarts du montant prévu et si l'assemblée l'a prévu), répartir librement les actions non souscrites, ou les offrir au public si l'assemblée l'a admis" },
      { id: 'c', texte: "Contraindre les actionnaires à souscrire le solde" },
      { id: 'd', texte: "Faire souscrire la société elle-même" },
      { id: 'e', texte: "Reporter l'opération de dix ans" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 579 offre trois facultés, que le conseil utilise dans l'ordre qu'il détermine (art. 580) : limitation au montant souscrit sous double condition (au moins les trois quarts de l'augmentation prévue et faculté expressément prévue par l'assemblée), libre répartition des actions non souscrites, ou offre au public si l'assemblée l'a admis. À défaut, l'augmentation n'est pas réalisée — sauf la faculté d'office du conseil de limiter au montant atteint lorsque les souscriptions représentent 97 % de l'augmentation (art. 580, dernier al.).",
    articleRef: "AUSCGIE, art. 579 et 580",
  },
  {
    id: 'q8',
    question: "La suppression du droit préférentiel de souscription en faveur de bénéficiaires dénommés obéit à quelle règle de vote ?",
    options: [
      { id: 'a', texte: "Les bénéficiaires actionnaires votent normalement" },
      { id: 'b', texte: "Les bénéficiaires actionnaires ne prennent pas part au vote, ni pour eux-mêmes ni comme mandataires, et leurs actions sont exclues du quorum et de la majorité" },
      { id: 'c', texte: "Le vote requiert l'unanimité, bénéficiaires compris" },
      { id: 'd', texte: "Seul le conseil d'administration se prononce" },
      { id: 'e', texte: "La suppression du DPS est interdite" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 586 permet à l'assemblée qui décide ou autorise l'augmentation de supprimer le DPS en faveur d'un ou plusieurs bénéficiaires nommément désignés, pour tout ou partie de l'augmentation. L'article 587 neutralise le conflit d'intérêts : les bénéficiaires actionnaires ne votent pas et leurs actions sont exclues du quorum et de la majorité. Les articles 593-597 organisent par ailleurs la renonciation individuelle de chaque actionnaire, avec ou sans indication de bénéficiaire.",
    articleRef: "AUSCGIE, art. 586-587 et 593-597",
  },
  {
    id: 'q9',
    question: "Quelle sanction frappe une augmentation votée sans le rapport du conseil d'administration ou sans celui du commissaire aux comptes sur le prix d'émission ?",
    options: [
      { id: 'a', texte: "Aucune : les rapports sont facultatifs" },
      { id: 'b', texte: "La nullité des délibérations prises en l'absence de ces rapports ; l'annulabilité si les rapports sont incomplets" },
      { id: 'c', texte: "Une simple amende civile" },
      { id: 'd', texte: "La dissolution de la société" },
      { id: 'e', texte: "La révocation automatique du conseil" },
    ],
    reponseCorrecte: 'b',
    explication: "Les articles 588 à 591 organisent l'information : rapport du conseil (montant maximal, motifs, motifs de la suppression du DPS, attributaires, prix d'émission justifié — art. 589 ; incidence sur la quote-part des capitaux propres — art. 590) et avis du commissaire aux comptes (suppression du DPS, éléments de calcul et montant du prix, incidence — art. 591). Les délibérations prises en l'absence de ces rapports sont nulles ; elles peuvent être annulées si les rapports ne contiennent pas toutes les indications requises (art. 590-591).",
    articleRef: "AUSCGIE, art. 588-591",
  },
  {
    id: 'q10',
    question: "Comment les actions de numéraire souscrites lors d'une augmentation de capital de SA sont-elles libérées ?",
    options: [
      { id: 'a', texte: "De moitié au moins, prime comprise" },
      { id: 'b', texte: "D'un quart au moins de leur valeur nominale et, le cas échéant, de la totalité de la prime d'émission — le surplus dans les trois ans sur appel du conseil" },
      { id: 'c', texte: "Intégralement, nominal et prime, dans tous les cas" },
      { id: 'd', texte: "Librement, selon les statuts" },
      { id: 'e', texte: "D'un dixième au moins" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 604 : libération obligatoire, à la souscription, d'un quart au moins du nominal et de la **totalité de la prime d'émission**. Le surplus est appelé par le conseil ou l'administrateur général dans les trois ans de la réalisation (art. 605). Cas particulier : les actions libérées pour partie en espèces et pour partie par incorporation de réserves, bénéfices ou primes doivent être intégralement libérées à la souscription (art. 606).",
    articleRef: "AUSCGIE, art. 604-606",
  },
  {
    id: 'q11',
    question: "La libération d'actions par compensation avec des créances sur la société suppose :",
    options: [
      { id: 'a', texte: "Une simple déclaration du souscripteur" },
      { id: 'b', texte: "Des créances certaines, liquides et exigibles, constatées par un arrêté des comptes établi par le conseil (ou l'administrateur général) et certifié exact par le commissaire aux comptes" },
      { id: 'c', texte: "L'accord unanime des autres actionnaires" },
      { id: 'd', texte: "Une décision de justice" },
      { id: 'e', texte: "Elle est interdite en toute hypothèse" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 562 admet la libération par compensation avec des créances certaines, liquides et exigibles (déjà l'article 44 pour le principe). L'article 611 exige un arrêté des comptes de ces créances, établi par le conseil d'administration ou l'administrateur général et certifié exact par le commissaire aux comptes ; le notaire constate alors la libération au vu de cet arrêté, annexé à la DNSV (art. 614).",
    articleRef: "AUSCGIE, art. 562, 611 et 614",
  },
  {
    id: 'q12',
    question: "Dans l'Application 60 du Guide (5 000 actions de nominal 10 000 émises à 15 000, fonds appelés à la souscription), l'écriture de réalisation de l'augmentation est :",
    options: [
      { id: 'a', texte: "Débit 4615 75 000 000 / crédit 1013 pour 75 000 000" },
      { id: 'b', texte: "Débit 4615 75 000 000 / crédit 1013 pour 50 000 000 et crédit 1051 Primes d'émission pour 25 000 000" },
      { id: 'c', texte: "Débit 521 75 000 000 / crédit 1011 pour 75 000 000" },
      { id: 'd', texte: "Débit 1051 25 000 000 / crédit 1013 pour 25 000 000" },
      { id: 'e', texte: "Débit 4615 50 000 000 / crédit 1013 pour 50 000 000, la prime restant hors comptabilité" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Application 60 : les fonds reçus par le notaire sont constatés au crédit de 4615 — Apporteurs, versements reçus sur augmentation de capital (75 000 000) ; à la réalisation, 4615 est soldé par le crédit de 1013 pour le nominal (5 000 × 10 000 = 50 000 000) et de 1051 — Primes d'émission pour l'excédent (5 000 × 5 000 = 25 000 000) ; le virement bancaire solde ensuite 4732.",
    articleRef: "SYSCOHADA — Guide d'application, Application 60",
  },
  {
    id: 'q13',
    question: "L'augmentation par incorporation de réserves facultatives (Application 61 : 2 000 actions gratuites de 10 000) s'enregistre :",
    options: [
      { id: 'a', texte: "Débit 1013 / crédit 1181 pour 20 000 000" },
      { id: 'b', texte: "Débit 1181 Réserves facultatives 20 000 000 / crédit 1013 Capital souscrit, appelé, versé, non amorti 20 000 000" },
      { id: 'c', texte: "Débit 521 / crédit 1013 pour 20 000 000" },
      { id: 'd', texte: "Débit 1181 / crédit 465 pour 20 000 000" },
      { id: 'e', texte: "Aucune écriture : l'attribution gratuite est extra-comptable" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Application 61 : simple virement interne aux capitaux propres — débit 1181 Réserves facultatives / crédit 1013 pour 20 000 000. Aucun flux de trésorerie : la structure des capitaux propres change (des réserves deviennent du capital), leur total est inchangé. Les actionnaires reçoivent des actions gratuites au prorata de leurs droits, via un droit d'attribution négociable et cessible (art. 566).",
    articleRef: "SYSCOHADA — Application 61 ; AUSCGIE, art. 566",
  },
  {
    id: 'q14',
    question: "Les droits formant rompus lors d'une attribution d'actions gratuites sont :",
    options: [
      { id: 'a', texte: "Perdus par les actionnaires" },
      { id: 'b', texte: "Négociables et cessibles ; l'assemblée peut toutefois décider expressément qu'ils ne sont pas négociables et que les actions correspondantes sont vendues, les sommes revenant aux titulaires sous trente jours" },
      { id: 'c', texte: "Toujours rachetés par la société" },
      { id: 'd', texte: "Convertis d'office en obligations" },
      { id: 'e', texte: "Attribués au conseil d'administration" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 566 : le droit à l'attribution d'actions gratuites, comme les droits formant rompus, sont négociables et cessibles. L'assemblée générale extraordinaire peut cependant décider expressément que les rompus ne sont pas négociables et que les actions correspondantes doivent être vendues — les sommes provenant de la vente étant allouées aux titulaires au plus tard trente jours après l'inscription en compte du nombre entier d'actions attribuées.",
    articleRef: "AUSCGIE, art. 566-567",
  },
  {
    id: 'q15',
    question: "En SARL, comment le numéraire d'une augmentation de capital est-il libéré ?",
    options: [
      { id: 'a', texte: "Du quart, avec surplus sous trois ans" },
      { id: 'b', texte: "De la moitié au moins à la souscription, le surplus dans les deux ans du jour où l'augmentation est devenue définitive" },
      { id: 'c', texte: "Intégralement, sans exception" },
      { id: 'd', texte: "Librement" },
      { id: 'e', texte: "D'un dixième" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 361-1 transpose à l'augmentation la règle de la constitution : libération de la moitié au moins du nominal à la souscription, surplus en une ou plusieurs fois dans les deux ans à compter du jour où l'augmentation est devenue définitive. L'augmentation est réputée réalisée dès sa constatation dans un procès-verbal d'assemblée (art. 361-2), et les fonds peuvent être restitués si elle n'est pas réalisée dans les six mois du premier dépôt (art. 362).",
    articleRef: "AUSCGIE, art. 361-1, 361-2 et 362",
  },
  {
    id: 'q16',
    question: "En SARL, l'augmentation par incorporation de bénéfices, réserves ou primes est décidée :",
    options: [
      { id: 'a', texte: "À l'unanimité" },
      { id: 'b', texte: "Par les associés représentant au moins la moitié des parts sociales — par dérogation à la majorité qualifiée des modifications statutaires" },
      { id: 'c', texte: "Par le gérant seul" },
      { id: 'd', texte: "Par les trois quarts des parts" },
      { id: 'e', texte: "Par le commissaire aux comptes" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 360 : par dérogation à l'article 358 (majorité des modifications statutaires), la décision d'augmenter le capital par incorporation de bénéfices, de réserves ou de primes est prise par les associés représentant au moins la moitié des parts sociales — l'opération ne leur demande aucun versement. Toute délibération contraire aux articles 358 à 360 est nulle (art. 360-1). Symétrie en SA : conditions d'AGO pour l'incorporation (art. 565).",
    articleRef: "AUSCGIE, art. 360 et 360-1",
  },
  {
    id: 'q17',
    question: "Une SA dont les capitaux propres par action valent 16 000 émet des actions nouvelles à 12 000. Quelle est la fonction économique de la prime d'émission et du DPS ?",
    options: [
      { id: 'a', texte: "Ils augmentent le bénéfice distribuable" },
      { id: 'b', texte: "La prime fait payer aux entrants un droit sur les réserves accumulées ; le DPS compense la dilution des anciens, qui peuvent souscrire ou vendre leur droit" },
      { id: 'c', texte: "Ils garantissent le paiement du premier dividende" },
      { id: 'd', texte: "Ils évitent l'intervention du commissaire aux comptes" },
      { id: 'e', texte: "Ils sont sans effet : seule la valeur nominale compte" },
    ],
    reponseCorrecte: 'b',
    explication: "Le prix d'émission (nominal + prime, art. 563) rapproche le prix payé par les souscripteurs de la valeur réelle du titre : la prime rémunère le droit acquis sur les réserves et plus-values accumulées. Quand le prix d'émission reste inférieur à la valeur du titre, la perte de valeur subie par l'action ancienne est compensée par le droit préférentiel de souscription (art. 573), que l'ancien actionnaire exerce ou cède. La valeur théorique du droit se calcule comme la différence entre la valeur de l'action avant et après l'opération.",
    articleRef: "AUSCGIE, art. 563 et 573 (analyse financière : pratique)",
  },
  {
    id: 'q18',
    question: "Le retrait des fonds d'une augmentation de capital en numéraire de SA peut intervenir :",
    options: [
      { id: 'a', texte: "Dès le dépôt des fonds" },
      { id: 'b', texte: "Une fois l'augmentation de capital réalisée — c'est-à-dire après la déclaration notariée de souscription et de versement" },
      { id: 'c', texte: "Après la clôture de l'exercice" },
      { id: 'd', texte: "Après un délai fixe de six mois" },
      { id: 'e', texte: "Sur autorisation du greffe uniquement" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 615 : le retrait des fonds provenant des souscriptions en numéraire ne peut avoir lieu qu'une fois l'augmentation réalisée — et l'article 571 répute l'augmentation réalisée au jour de l'établissement de la DNSV (art. 612-613). En amont, les fonds sont déposés dans les huit jours de leur réception chez un notaire ou dans un établissement agréé (art. 607), contre certificat du dépositaire (art. 610).",
    articleRef: "AUSCGIE, art. 607-615",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '4.1',
    titre: "Les procédés d'augmentation et la compétence de l'assemblée",
    navLabel: "Procédés et compétence",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'article 68 l'annonçait : le capital peut être augmenté par de **nouveaux apports** ou par l'**incorporation** de réserves, de bénéfices ou de primes. Pour la SA, l'article 562 précise les deux procédés — émission d'actions ordinaires ou de préférence, ou **majoration du montant nominal** des actions existantes, cette dernière exigeant le consentement unanime des actionnaires sauf incorporation — et les modes de libération des actions nouvelles : espèces, **compensation** avec des créances certaines, liquides et exigibles, incorporation de réserves, bénéfices ou primes, ou apport en nature. Les actions nouvelles sont émises à leur montant nominal, ou à ce montant majoré d'une **prime d'émission** (art. 563).",
      },
      {
        type: 'carte',
        titre: "Qui décide ? (art. 564-569)",
        tableau: {
          entetes: ["Situation", "Règle"],
          lignes: [
            ["Principe", "L'assemblée générale **extraordinaire** est seule compétente pour décider ou autoriser l'augmentation, sur les rapports du conseil d'administration (ou de l'administrateur général) et du commissaire aux comptes (art. 564)."],
            ["Incorporation de réserves, bénéfices ou primes", "L'assemblée statue aux conditions de quorum et de majorité des assemblées générales **ordinaires** (art. 565)."],
            ["Délégation de compétence", "L'assemblée qui autorise peut déléguer au conseil (ou à l'administrateur général) la **décision**, pour une durée maximale de **24 mois** et dans la limite d'un plafond global (art. 567-1)."],
            ["Délégation de pouvoirs", "L'assemblée qui décide peut déléguer la **réalisation** : fixer les modalités, constater l'opération, modifier les statuts (art. 568)."],
            ["Verrou", "Toute clause conférant au conseil le pouvoir de décider l'augmentation est **réputée non écrite** (art. 569)."],
          ],
        },
        note: "Deux contraintes de calendrier : l'augmentation doit être réalisée dans les **trois ans** de l'assemblée (réputée réalisée au jour de la DNSV, art. 571), et le capital ancien doit être **intégralement libéré** avant toute émission d'actions de numéraire (art. 572).",
      },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[3] },
    ],
  },
  {
    numero: '4.2',
    titre: "Le droit préférentiel de souscription",
    navLabel: "Le DPS",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les actions comportent un **droit préférentiel de souscription** aux augmentations de capital : les actionnaires ont, proportionnellement au montant de leurs actions, un droit de préférence — **irréductible** — à la souscription des actions de numéraire émises (art. 573). Pendant la durée de la souscription, ce droit est **négociable** lorsqu'il est détaché d'actions elles-mêmes négociables ; sinon, il est cessible dans les mêmes conditions que l'action (art. 574). Si l'assemblée le décide expressément, les actionnaires bénéficient en outre d'un droit de souscription **à titre réductible** : les actions non souscrites à titre irréductible sont attribuées à ceux qui en ont demandé davantage, dans la limite de leur demande (art. 575-576).",
      },
      {
        type: 'carte',
        titre: "Le déroulement de la souscription",
        liste: [
          "**Délai** : vingt jours au moins à compter de l'ouverture de la souscription (art. 577), avec clôture anticipée dès que tous les droits sont exercés ou que l'augmentation est intégralement souscrite après renonciations (art. 578).",
          "**Souscriptions insuffisantes** (art. 579-580) : le conseil peut, dans l'ordre qu'il détermine, limiter l'augmentation au montant souscrit — s'il atteint les trois quarts du montant prévu et si l'assemblée l'a expressément permis —, répartir librement les actions non souscrites, ou les offrir au public si l'assemblée l'a admis ; à défaut, l'opération n'est pas réalisée. Faculté d'office : limiter au montant atteint dès que les souscriptions représentent **97 %** de l'augmentation.",
          "**Usufruit** (art. 581-585) : sauf accord contraire, le DPS appartient au **nu-propriétaire** ; s'il néglige de l'exercer — ni souscription ni vente huit jours au moins avant l'expiration du délai —, l'usufruitier peut se substituer à lui ; les sommes ou biens issus de la cession sont soumis à l'usufruit, et les actions nouvelles appartiennent au nu-propriétaire pour la nue-propriété et à l'usufruitier pour l'usufruit.",
        ],
      },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[6] },
    ],
  },
  {
    numero: '4.3',
    titre: "Suppression du DPS, prix d'émission et rapports obligatoires",
    navLabel: "Suppression du DPS",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'assemblée qui décide ou autorise l'augmentation peut **supprimer le DPS** en faveur d'un ou plusieurs bénéficiaires nommément désignés, pour la totalité de l'augmentation ou pour certaines tranches (art. 586) ; les bénéficiaires actionnaires ne prennent pas part au vote — ni pour eux-mêmes ni comme mandataires — et leurs actions sont exclues du quorum et de la majorité (art. 587). Chaque actionnaire peut par ailleurs **renoncer individuellement** à son droit, au profit de personnes dénommées — la renonciation devant être accompagnée de leur acceptation — ou sans indication de bénéficiaire, en avisant la société avant l'expiration du délai de souscription (art. 593-595).",
      },
      {
        type: 'filet',
        titre: "L'information sanctionnée par la nullité (art. 588-591)",
        texte: "Le prix d'émission — ou ses conditions de fixation — est déterminé par l'assemblée générale extraordinaire sur le rapport du conseil (ou de l'administrateur général) et sur celui du commissaire aux comptes (art. 588). Le rapport du conseil indique le montant maximal et les motifs de l'augmentation, les motifs de la suppression du DPS, le nom des attributaires, le nombre de titres et le prix d'émission justifié (art. 589), ainsi que l'incidence de l'émission sur la quote-part de capitaux propres de chaque actionnaire (art. 590). Le commissaire aux comptes donne son avis sur la suppression du DPS, les éléments de calcul et le montant du prix, et l'incidence de l'opération (art. 591). **Les délibérations prises en l'absence de ces rapports sont nulles** ; des rapports incomplets rendent les délibérations annulables.",
      },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
    ],
  },
  {
    numero: '4.4',
    titre: "Libération, dépôt des fonds et réalisation",
    navLabel: "Libération et DNSV",
    blocs: [
      {
        type: 'carte',
        titre: "La libération des actions nouvelles (art. 604-606, 611)",
        tableau: {
          entetes: ["Situation", "Règle"],
          lignes: [
            ["Numéraire", "Un **quart au moins du nominal** à la souscription et la **totalité de la prime d'émission** ; surplus appelé par le conseil dans les **trois ans** de la réalisation (art. 604-605)."],
            ["Libération mixte (espèces + incorporation)", "Libération **intégrale** dès la souscription (art. 606)."],
            ["Compensation de créances", "Créances certaines, liquides et exigibles, constatées par un **arrêté des comptes** du conseil certifié exact par le commissaire aux comptes (art. 611) ; le notaire constate la libération au vu de cet arrêté, annexé à la DNSV (art. 614)."],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Les fonds sont déposés par les dirigeants sociaux, dans les **huit jours** de leur réception, dans un établissement de crédit ou de microfinance agréé de l'État partie du siège ou chez un notaire, avec la liste des souscripteurs et de leurs versements (art. 607-608) ; le dépositaire délivre un certificat (art. 610) et communique la liste à tout souscripteur qui la demande (art. 609). Les souscriptions et versements sont constatés par la **déclaration notariée de souscription et de versement** (art. 612-613), et le **retrait des fonds** ne peut intervenir qu'une fois l'augmentation réalisée (art. 615). En SARL, les règles miroir : dépôt comme à la constitution avec disposition des fonds sur certificat d'inscription modificative au RCCM (art. 361), libération de moitié avec surplus sous deux ans (art. 361-1), réalisation constatée par procès-verbal (art. 361-2), restitution possible à défaut de réalisation dans les six mois (art. 362), commissaire aux apports au-delà de 5 000 000 pour les apports en nature avec nullité des délibérations prises sans lui (art. 363), et majorité allégée — la moitié des parts — pour l'incorporation (art. 360).",
      },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[17] },
    ],
  },
  {
    numero: '4.5',
    titre: "Comptabilisation : numéraire avec prime, incorporation, apport en nature",
    navLabel: "Écritures",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'Application 60 du Guide comptabilise une augmentation en numéraire : 5 000 actions de nominal 10 000 émises à **15 000**, fonds appelés dès la souscription et reçus par le notaire. Le compte pivot est **4615 — Apporteurs, versements reçus sur augmentation de capital**, et la prime loge au compte **1051 — Primes d'émission**.",
      },
      {
        type: 'carte',
        titre: "Application 60 — Augmentation en numéraire avec prime",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["4732", "", "08/05/N — Mandataires — Notaire (fonds reçus)", "75 000 000", ""],
            ["", "4615", "Apporteurs, versements reçus sur augmentation de capital", "", "75 000 000"],
            ["4615", "", "09/05/N — Réalisation de l'augmentation", "75 000 000", ""],
            ["", "1013", "Capital souscrit, appelé, versé, non amorti (5 000 × 10 000)", "", "50 000 000"],
            ["", "1051", "Primes d'émission (5 000 × 5 000)", "", "25 000 000"],
            ["521", "", "10/05/N — Banques (reversement)", "75 000 000", ""],
            ["", "4732", "Mandataires — Notaire", "", "75 000 000"],
          ],
        },
      },
      {
        type: 'carte',
        titre: "Application 61 — Incorporation de réserves (2 000 actions gratuites de 10 000)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["1181", "", "01/04/N — Réserves facultatives", "20 000 000", ""],
            ["", "1013", "Capital souscrit, appelé, versé, non amorti", "", "20 000 000"],
          ],
        },
        note: "Virement interne aux capitaux propres : aucun flux de trésorerie, total des capitaux propres inchangé. Les primes liées au capital (105) se déclinent en 1051 Primes d'émission, 1052 Primes d'apport (augmentation par apport en nature : excédent de la valeur de l'apport sur le nominal émis), 1053 Primes de fusion et 1054 Primes de conversion. Une augmentation par apport en nature suit la mécanique de la constitution : promesse en 4611, réalisation par le débit des comptes d'actifs, crédit de 1013 pour le nominal et de 1052 pour la prime d'apport.",
      },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[13] },
    ],
  },
  {
    numero: '4.6',
    titre: "La valeur théorique du droit de souscription et du droit d'attribution",
    navLabel: "Valeur du droit",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le DPS a une valeur économique : il compense la **dilution** subie par l'action ancienne lorsque le prix d'émission est inférieur à sa valeur. La pratique financière — il ne s'agit pas d'une règle de l'Acte uniforme, qui se borne à rendre le droit négociable ou cessible (art. 574) — en calcule la valeur théorique en comparant la valeur de l'action avant et après l'opération.",
      },
      {
        type: 'carte',
        titre: "Formules de la pratique",
        liste: [
          "**Valeur de l'action après l'opération** = (N × V + n × E) / (N + n), où N = actions anciennes, V = valeur de l'action avant, n = actions nouvelles, E = prix d'émission.",
          "**Droit de souscription (ds)** = V − valeur après = n × (V − E) / (N + n).",
          "**Droit d'attribution (da)** — actions gratuites, E = 0 : da = n × V / (N + n).",
          "Vérification systématique : pour souscrire une action nouvelle, il faut N/n droits ; le coût pour un non-actionnaire (E + (N/n) × ds) doit égaler la valeur de l'action après l'opération.",
        ],
        note: "Exemple : N = 10 000 actions valant V = 16 000 ; émission de n = 2 500 actions à E = 12 000. Valeur après = (10 000 × 16 000 + 2 500 × 12 000) / 12 500 = 15 200. ds = 16 000 − 15 200 = 800. Contrôle : 4 droits par action nouvelle ; 12 000 + 4 × 800 = 15 200. L'ancien actionnaire qui vend ses droits est indemnisé de la dilution ; celui qui souscrit maintient sa quote-part.",
      },
      { type: 'controle', question: QCM[16] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas-1',
    titre: "Cas 1 — MONGALA ENERGIE SA : augmentation en numéraire avec prime et DPS",
    contexte: "MONGALA ENERGIE SA (capital 120 000 000, 12 000 actions de 10 000 intégralement libérées, valeur de l'action estimée à 18 000) décide en assemblée générale extraordinaire d'émettre 3 000 actions nouvelles de numéraire au prix de 14 000, fonds intégralement appelés à la souscription et versés chez le notaire. La souscription est ouverte 25 jours ; l'augmentation est intégralement souscrite.",
    questions: [
      {
        num: 1,
        enonce: "Vérifiez la régularité de l'opération : organe compétent, rapports, préalables, délai de souscription.",
        correction: "AGE seule compétente, sur les rapports du conseil d'administration et du commissaire aux comptes (art. 564, 588-591 — leur absence rendrait les délibérations nulles). Préalable : le capital ancien est intégralement libéré (art. 572). Le prix d'émission (14 000) excède le nominal : la différence est une prime d'émission (art. 563). Le délai de souscription (25 jours) respecte le minimum de vingt jours (art. 577). L'opération devra être réalisée dans les trois ans (art. 571).",
      },
      {
        num: 2,
        enonce: "Calculez la valeur théorique du droit de souscription et vérifiez-la du point de vue d'un non-actionnaire.",
        correction: "Valeur après l'opération = (12 000 × 18 000 + 3 000 × 14 000) / 15 000 = (216 000 000 + 42 000 000) / 15 000 = 17 200. ds = 18 000 − 17 200 = 800. Il faut 12 000 / 3 000 = 4 droits par action nouvelle : un non-actionnaire paie 14 000 + 4 × 800 = 17 200, soit exactement la valeur de l'action après l'opération — le DPS neutralise la dilution (technique de la pratique ; le texte rend simplement le droit négociable, art. 574).",
      },
      {
        num: 3,
        enonce: "Passez les écritures : réception des fonds, réalisation, reversement par le notaire.",
        correction: "Réception : débit 4732 Mandataires — Notaire 42 000 000 / crédit 4615 Apporteurs, versements reçus sur augmentation de capital 42 000 000. Réalisation (au jour de la DNSV, art. 571) : débit 4615 42 000 000 / crédit 1013 pour 30 000 000 (3 000 × 10 000) et crédit 1051 Primes d'émission 12 000 000 (3 000 × 4 000). Reversement : débit 521 / crédit 4732 pour 42 000 000 — le retrait ne pouvant intervenir qu'une fois l'augmentation réalisée (art. 615). Schéma de l'Application 60.",
      },
      {
        num: 4,
        enonce: "Un actionnaire détenant 800 actions ne souhaite pas souscrire. Que peut-il faire de ses droits, et que percevrait-il en théorie ?",
        correction: "Son DPS est négociable pendant la durée de la souscription (art. 574) : il peut vendre ses 800 droits, pour une valeur théorique de 800 × 800 = 640 000, qui compense la baisse de valeur de ses actions (800 × (18 000 − 17 200) = 640 000). Il peut aussi renoncer individuellement, au profit de personnes dénommées (avec leur acceptation) ou sans indication de bénéficiaire, en avisant la société avant la clôture de la souscription (art. 593-595).",
      },
      {
        num: 5,
        enonce: "Si la souscription n'avait atteint que 2 400 actions (80 %), l'opération aurait-elle pu aboutir ?",
        correction: "Oui, à conditions : 2 400/3 000 = 80 % ≥ trois quarts, donc le conseil aurait pu limiter l'augmentation au montant souscrit si l'assemblée avait expressément prévu cette faculté (art. 579, 1°) ; il aurait aussi pu répartir librement les actions non souscrites ou les offrir au public si l'assemblée l'avait admis (art. 579, 2° et 3°), dans l'ordre de son choix (art. 580). À défaut de ces facultés, l'augmentation n'aurait pas été réalisée — le seuil de limitation d'office (97 %) n'étant pas atteint.",
      },
    ],
  },
  {
    id: 'cas-2',
    titre: "Cas 2 — UBANGI BRASSERIES SA : incorporation de réserves et rompus",
    contexte: "UBANGI BRASSERIES SA (capital 60 000 000, 6 000 actions de 10 000, réserves facultatives 35 000 000, valeur de l'action 22 000) décide d'incorporer 15 000 000 de réserves facultatives par émission de 1 500 actions gratuites (une action nouvelle pour quatre anciennes).",
    questions: [
      {
        num: 1,
        enonce: "Quelles conditions de vote s'appliquent à cette décision ?",
        correction: "L'augmentation par incorporation de réserves est votée par l'assemblée aux conditions de quorum et de majorité des assemblées générales ordinaires (art. 565) — dérogation à la compétence de droit commun de l'AGE statuant aux conditions extraordinaires. Si la société avait choisi la majoration du nominal plutôt que l'émission d'actions, la voie de l'incorporation aurait également dispensé de l'unanimité exigée en principe pour la majoration (art. 562, al. 3).",
      },
      {
        num: 2,
        enonce: "Passez l'écriture et décrivez son effet sur les capitaux propres.",
        correction: "Débit 1181 Réserves facultatives 15 000 000 / crédit 1013 Capital souscrit, appelé, versé, non amorti 15 000 000 (Application 61). Aucun flux : le total des capitaux propres est inchangé, leur structure se déplace des réserves vers le capital — qui devient indisponible à due concurrence, renforçant le gage des créanciers.",
      },
      {
        num: 3,
        enonce: "Calculez la valeur théorique du droit d'attribution.",
        correction: "Valeur après = (6 000 × 22 000) / 7 500 = 17 600. da = 22 000 − 17 600 = 4 400. Vérification : 4 droits pour une action gratuite, 4 × 4 400 = 17 600 = valeur de l'action reçue. L'actionnaire qui vend ses droits est indemnisé de la dilution ; celui qui les exerce conserve sa quote-part.",
      },
      {
        num: 4,
        enonce: "Un actionnaire détient 130 actions. Combien d'actions gratuites reçoit-il, et que deviennent ses rompus ?",
        correction: "130 / 4 = 32 actions gratuites, avec un rompu de 2 droits. Les droits formant rompus sont négociables et cessibles (art. 566) : il peut acheter 2 droits pour obtenir une 33e action, ou vendre ses 2 droits. L'assemblée peut toutefois décider expressément que les rompus ne sont pas négociables et que les actions correspondantes sont vendues, les sommes étant allouées aux titulaires dans les trente jours de l'inscription en compte des actions entières (art. 566, al. 2-3, et 567).",
      },
    ],
  },
  {
    id: 'cas-3',
    titre: "Cas 3 — TANGANYIKA AGRO SARL : augmentation par apports en nature et en numéraire",
    contexte: "TANGANYIKA AGRO SARL (capital 15 000 000, parts de 5 000) augmente son capital : M. K. apporte un matériel agricole évalué à 7 200 000, rémunéré par 1 200 parts nouvelles de 5 000 (valeur d'apport supérieure au nominal émis : 7 200 000 pour 6 000 000 de nominal) ; Mme L. souscrit 400 parts de numéraire au nominal, libérées de moitié.",
    questions: [
      {
        num: 1,
        enonce: "Un commissaire aux apports est-il requis, et quelle est la sanction de son absence ?",
        correction: "Oui : en cas d'augmentation réalisée totalement ou partiellement par apports en nature, un commissaire aux apports doit être désigné dès que la valeur de chaque apport considéré ou de l'ensemble excède 5 000 000 (art. 363) — le matériel (7 200 000) dépasse le seuil. Il peut aussi être nommé par la juridiction compétente à la demande de tout associé. Sanction : les délibérations prises en l'absence du commissaire aux apports sont nulles ; un rapport incomplet rend les délibérations annulables (art. 363, avant-dernier al.).",
      },
      {
        num: 2,
        enonce: "Vérifiez la régularité de la libération de Mme L. et le calendrier de l'opération.",
        correction: "Les parts de numéraire sont obligatoirement libérées de la moitié au moins à la souscription (art. 361-1) : 400 × 5 000 × 1/2 = 1 000 000 versés, régulier. Le surplus (1 000 000) doit être libéré dans les deux ans du jour où l'augmentation est devenue définitive — celle-ci étant réputée réalisée dès sa constatation dans un procès-verbal d'assemblée (art. 361-2). Les fonds sont déposés comme à la constitution, et le gérant en dispose en remettant au dépositaire un certificat du RCCM attestant l'inscription modificative (art. 361). Si l'augmentation n'est pas réalisée dans les six mois du premier dépôt, restitution possible sur autorisation judiciaire (art. 362).",
      },
      {
        num: 3,
        enonce: "Passez les écritures de l'apport en nature de M. K.",
        correction: "Promesse : débit 4611 Apporteurs, apports en nature 7 200 000 / crédit 1011 pour 7 200 000 (ou directement le schéma d'appel). Réalisation : débit 2411 Matériel (agricole) 7 200 000 / crédit 4613 pour 7 200 000 ; et virement de capital : débit 1011/1012 / crédit 1013 pour 6 000 000 de nominal et crédit 1052 Primes d'apport pour 1 200 000 — l'excédent de la valeur de l'apport sur le nominal émis constitue la prime d'apport. L'apport en nature est intégralement libéré dès la souscription.",
      },
      {
        num: 4,
        enonce: "Passez les écritures du numéraire de Mme L.",
        correction: "Souscription : débit 4615 (fraction appelée reçue) et 109 pour la fraction non appelée : débit 109 1 000 000 ; débit 521 Banques 1 000 000 / crédit 1011 pour 1 000 000 et crédit 1012 puis 1013 pour la fraction versée — en pratique : débit 109 1 000 000, débit 4613 1 000 000 / crédit 1011 1 000 000, crédit 1012 1 000 000 ; puis débit 521 / crédit 4613 1 000 000 et débit 1012 / crédit 1013 1 000 000. L'appel du solde interviendra dans les deux ans (art. 361-1), selon le cycle 4613 à 109, 1011 à 1012, puis 521 à 4613 et 1012 à 1013.",
      },
    ],
  },
  {
    id: 'cas-4',
    titre: "Cas 4 — ITURI MINES SA : suppression du DPS et libération par compensation",
    contexte: "ITURI MINES SA doit renforcer ses fonds propres. Son principal fournisseur, la société KIBALI SUPPLY (déjà actionnaire à 15 %), détient une créance commerciale échue de 25 000 000 sur la société. L'AGE envisage : (1) de supprimer le droit préférentiel de souscription au profit de KIBALI SUPPLY ; (2) de lui émettre 2 000 actions de nominal 10 000 au prix de 12 500, libérées par compensation avec sa créance.",
    questions: [
      {
        num: 1,
        enonce: "KIBALI SUPPLY peut-elle voter la suppression du DPS dont elle bénéficie ?",
        correction: "Non. L'article 587 : les bénéficiaires de la suppression, lorsqu'ils sont actionnaires, ne prennent pas part au vote, ni pour eux-mêmes ni comme mandataires, et leurs actions ne sont pas prises en compte pour le calcul du quorum et de la majorité. L'assemblée statue sur le rapport du conseil — indiquant les motifs de la suppression, le nom de l'attributaire, le nombre de titres et le prix justifié (art. 589) — et sur l'avis du commissaire aux comptes (art. 591), à peine de nullité.",
      },
      {
        num: 2,
        enonce: "La libération par compensation est-elle possible, et à quelles conditions ?",
        correction: "Oui : l'article 562 admet la libération par compensation avec des créances certaines, liquides et exigibles sur la société — la créance commerciale échue de KIBALI SUPPLY l'est. Formalités : arrêté des comptes des créances établi par le conseil d'administration et certifié exact par le commissaire aux comptes (art. 611) ; le notaire constate la libération au vu de cet arrêté, annexé à la DNSV (art. 614). Rappel : le capital ancien doit être intégralement libéré (art. 572).",
      },
      {
        num: 3,
        enonce: "Passez l'écriture de réalisation de l'augmentation.",
        correction: "Prix total : 2 000 × 12 500 = 25 000 000, égal à la créance compensée. Écriture : débit 401 Fournisseurs (créance de KIBALI SUPPLY éteinte) 25 000 000 / crédit 1013 pour 20 000 000 (nominal) et crédit 1051 Primes d'émission 5 000 000. La dette fournisseur se transforme en capitaux propres — sans mouvement de trésorerie. La prime, exigible en totalité à la souscription (art. 604), est ici couverte par la compensation.",
      },
      {
        num: 4,
        enonce: "Quel est l'intérêt et quel est le risque de cette opération pour les autres actionnaires ?",
        correction: "Intérêt : désendettement immédiat (25 000 000 de dettes en moins), amélioration de la structure financière sans sortie de trésorerie, consolidation d'un partenaire stratégique. Risque : dilution — la participation de KIBALI SUPPLY augmente et la quote-part des autres actionnaires diminue, sans qu'ils aient pu souscrire. C'est précisément pourquoi le législateur encadre la suppression du DPS : rapports justifiant le prix (art. 589-591, à peine de nullité), exclusion du bénéficiaire du vote (art. 587), et information sur l'incidence de l'émission sur la quote-part des capitaux propres de chaque actionnaire (art. 590).",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 4,
  id: 'ue3-chapitre-4',
  titre: "L'augmentation de capital",
  sousTitre: "AUSCGIE, art. 562-615 (SA) et 360-363 (SARL) · SYSCOHADA, Applications 60-61",
  infoBulle: "Procédés d'augmentation, compétence de l'AGE et délégations, droit préférentiel de souscription et sa suppression, prime d'émission, libération et déclaration notariée — avec les écritures du SYSCOHADA (4615, 1051-1052) et le calcul des droits de souscription et d'attribution.",
  loiRef: "AUSCGIE (30 janvier 2014) · SYSCOHADA révisé (AUDCIF)",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Distinguer les procédés d'augmentation (émission, majoration du nominal, incorporation) et leurs règles de vote (art. 562-565)",
    "Maîtriser le DPS : caractère irréductible, négociabilité, titre réductible, délai de vingt jours, souscriptions insuffisantes (art. 573-580)",
    "Encadrer la suppression du DPS et le prix d'émission : rapports obligatoires à peine de nullité (art. 586-591)",
    "Appliquer les règles de libération : quart + prime intégrale en SA (art. 604), moitié en SARL (art. 361-1), compensation certifiée (art. 611)",
    "Comptabiliser les augmentations (Applications 60-61 : 4615, 1013, 1051, 1181) et calculer la valeur théorique des droits (ds, da)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "AGE seule compétente (rapports du conseil et du CAC) ; incorporation votée aux conditions d'AGO ; délégation de compétence limitée à 24 mois et plafonnée ; clause donnant la décision au conseil réputée non écrite (art. 564-569).",
    "Réalisation dans les trois ans, réputée acquise au jour de la DNSV ; capital ancien intégralement libéré avant toute émission de numéraire (art. 571-572).",
    "DPS irréductible et proportionnel, négociable ou cessible ; délai de souscription ≥ 20 jours ; à titre réductible sur décision expresse (art. 573-577).",
    "Souscriptions insuffisantes : limitation aux trois quarts si prévue, libre répartition, offre au public — et limitation d'office à 97 % (art. 579-580).",
    "Suppression du DPS au profit de bénéficiaires dénommés : ceux-ci ne votent pas ; rapports du conseil et du CAC à peine de nullité (art. 586-591).",
    "Libération SA : quart du nominal + totalité de la prime, surplus sous trois ans ; libération intégrale si mixte ; compensation sur arrêté certifié (art. 604-606, 611).",
    "SARL : incorporation votée à la moitié des parts (art. 360) ; numéraire libéré de moitié, surplus sous deux ans (art. 361-1) ; commissaire aux apports au-delà de 5 000 000, à peine de nullité (art. 363).",
    "Écritures : numéraire avec prime — 4732/4615 puis 4615 → 1013 + 1051 (App. 60) ; incorporation — 1181 → 1013 (App. 61) ; apport en nature — prime d'apport en 1052.",
    "Valeur théorique : ds = n(V − E)/(N + n) ; da = nV/(N + n) — outils de la pratique financière, le texte se bornant à rendre les droits négociables.",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du GIE (AUSCGIE)", precision: "art. 562-572 (procédés, compétence, délégations, délais), 573-585 (DPS, usufruit), 586-597 (suppression et renonciations), 588-591 (prix d'émission et rapports), 604-615 (libération, dépôt, DNSV, retrait), 360-363 (SARL)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Guide d'application", precision: "Applications 60 (augmentation en numéraire avec prime d'émission) et 61 (incorporation de réserves)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Plan de comptes", precision: "comptes 105 (1051 primes d'émission, 1052 primes d'apport, 1053 primes de fusion, 1054 primes de conversion), 4615, 1013, 1181" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE (Acte uniforme révisé du 30 janvier 2014) · SYSCOHADA révisé — Guide d'application et plan de comptes (AUDCIF)",
}

export default chapitre
