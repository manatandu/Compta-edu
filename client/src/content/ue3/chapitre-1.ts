import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 3 — CHAPITRE 1 : LA CONSTITUTION DES SOCIÉTÉS
// Cadre juridique des apports (AUSCGIE révisé, art. 4-9 et 37-70) et
// comptabilisation de la constitution (SYSCOHADA révisé, Guide d'application,
// Applications 58, 59 et 123 ; plan de comptes : 101x, 105, 109, 461x).
// Tout article et toute écriture ont été vérifiés sur les textes encodés.
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1',
    question: "Selon l'article 4 de l'AUSCGIE, la société commerciale est créée par deux ou plusieurs personnes qui conviennent, par un contrat, d'affecter à une activité :",
    options: [
      { id: 'a', texte: "Uniquement des sommes d'argent" },
      { id: 'b', texte: "Des biens en numéraire ou en nature, ou de l'industrie" },
      { id: 'c', texte: "Uniquement des biens immobiliers" },
      { id: 'd', texte: "Des créances sur des tiers exclusivement" },
      { id: 'e', texte: "Leur seule réputation commerciale" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 4 définit la société commerciale comme le contrat par lequel deux ou plusieurs personnes conviennent d'affecter à une activité des biens en numéraire ou en nature, ou de l'industrie, dans le but de partager le bénéfice ou de profiter de l'économie qui peut en résulter — les associés s'engageant à contribuer aux pertes. L'article 5 admet en outre la création par une seule personne, l'« associé unique », dans les cas prévus par l'Acte uniforme.",
    articleRef: "AUSCGIE, art. 4 et 5",
  },
  {
    id: 'q2',
    question: "Quels sont les trois types d'apports admis par l'article 40 de l'AUSCGIE ?",
    options: [
      { id: 'a', texte: "Numéraire, nature et industrie — tout autre apport étant interdit" },
      { id: 'b', texte: "Numéraire, crédit et caution" },
      { id: 'c', texte: "Nature, industrie et clientèle politique" },
      { id: 'd', texte: "Numéraire, nature et garanties personnelles" },
      { id: 'e', texte: "La liste est ouverte : les statuts peuvent créer d'autres apports" },
    ],
    reponseCorrecte: 'a',
    explication: "L'article 40 énumère limitativement : 1°) l'argent, par apport en numéraire ; 2°) des droits portant sur des biens en nature, mobiliers ou immobiliers, corporels ou incorporels, par apport en nature ; 3°) des connaissances techniques ou professionnelles ou des services, par apport en industrie. Il conclut : « Tout autre apport est interdit. »",
    articleRef: "AUSCGIE, art. 40",
  },
  {
    id: 'q3',
    question: "En cas de retard dans le versement d'un apport en numéraire, l'article 43 de l'AUSCGIE prévoit que les sommes restant dues :",
    options: [
      { id: 'a', texte: "Ne produisent aucun intérêt tant que la société n'a pas mis l'associé en demeure" },
      { id: 'b', texte: "Portent de plein droit intérêt au taux légal à compter du jour où le versement devait être effectué, sans préjudice de dommages et intérêts" },
      { id: 'c', texte: "Sont automatiquement annulées après six mois" },
      { id: 'd', texte: "Portent intérêt au taux fixé librement par le gérant" },
      { id: 'e', texte: "Entraînent l'exclusion immédiate et de plein droit de l'associé" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 43 dispose que les sommes restant dues portent de plein droit intérêt au taux légal à compter du jour où le versement devait être effectué, sans préjudice de dommages et intérêts s'il y a lieu. Aucune mise en demeure n'est requise : l'intérêt court de plein droit.",
    articleRef: "AUSCGIE, art. 43",
  },
  {
    id: 'q4',
    question: "L'apport en industrie est-il possible dans une société anonyme ?",
    options: [
      { id: 'a', texte: "Oui, sans restriction" },
      { id: 'b', texte: "Oui, mais limité à 10 % du capital" },
      { id: 'c', texte: "Non : l'article 50-1 interdit les apports en industrie dans les sociétés anonymes" },
      { id: 'd', texte: "Oui, si un commissaire aux apports l'évalue" },
      { id: 'e', texte: "Non, sauf autorisation de la juridiction compétente" },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 50-1, alinéa 2, est formel : « Les apports en industrie sont interdits dans les sociétés anonymes ». Dans les formes où ils sont admis, ils sont réalisés par la mise à disposition effective de connaissances techniques ou professionnelles ou de services (al. 1er).",
    articleRef: "AUSCGIE, art. 50-1",
  },
  {
    id: 'q5',
    question: "Selon l'article 50-3 de l'AUSCGIE, les apports en industrie :",
    options: [
      { id: 'a', texte: "Concourent à la formation du capital social à hauteur de leur évaluation" },
      { id: 'b', texte: "Ne concourent pas à la formation du capital social, mais donnent lieu à des titres ouvrant droit au vote et au partage des bénéfices, dans la double limite de 25 %" },
      { id: 'c', texte: "Ne donnent droit à aucun titre social" },
      { id: 'd', texte: "Donnent droit à des titres librement cessibles" },
      { id: 'e', texte: "Sont inscrits à l'actif du bilan en immobilisations incorporelles" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 50-3 pose que les apports en industrie ne concourent pas à la formation du capital social mais donnent lieu à l'attribution de titres sociaux ouvrant droit au vote et au partage des bénéfices et de l'actif net, à charge de contribuer aux pertes — avec deux plafonds de 25 % : les droits de vote attachés à ces titres ne peuvent excéder 25 % de l'ensemble des droits de vote, et la part totale attachée à ces titres ne peut excéder 25 % des bénéfices, de l'actif net et des pertes. L'article 50-4 ajoute que ces titres sont incessibles, intransmissibles et sans valeur nominale.",
    articleRef: "AUSCGIE, art. 50-3 et 50-4",
  },
  {
    id: 'q6',
    question: "Qui évalue les apports en nature lors de la constitution ?",
    options: [
      { id: 'a', texte: "Le greffe du tribunal de commerce" },
      { id: 'b', texte: "Les associés — l'évaluation étant, dans les cas prévus par l'Acte uniforme, contrôlée par un commissaire aux apports" },
      { id: 'c', texte: "Toujours et uniquement un commissaire aux apports" },
      { id: 'd', texte: "L'administration fiscale" },
      { id: 'e', texte: "Le notaire rédacteur des statuts" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 49 dispose que les associés évaluent les apports en nature et que, dans les cas prévus par l'Acte uniforme, cette évaluation est contrôlée par un commissaire aux apports. L'article 50 impose que les statuts contiennent l'évaluation des apports en nature.",
    articleRef: "AUSCGIE, art. 49 et 50",
  },
  {
    id: 'q7',
    question: "Selon l'article 54 de l'AUSCGIE, quelle clause statutaire est réputée non écrite ?",
    options: [
      { id: 'a', texte: "La clause rendant les droits proportionnels aux apports" },
      { id: 'b', texte: "La clause attribuant à un associé la totalité du profit, l'exonérant de la totalité des pertes, l'excluant totalement du profit ou mettant à sa charge la totalité des pertes" },
      { id: 'c', texte: "La clause prévoyant des dividendes prioritaires" },
      { id: 'd', texte: "La clause d'agrément des cessions de parts" },
      { id: 'e', texte: "La clause de variabilité du capital" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 54 pose le principe de proportionnalité des droits et obligations aux apports, sauf clause contraire, mais répute non écrites les clauses dites léonines : attribuer à un associé la totalité du profit, l'exonérer de la totalité des pertes, l'exclure totalement du profit ou mettre à sa charge la totalité des pertes.",
    articleRef: "AUSCGIE, art. 54",
  },
  {
    id: 'q8',
    question: "Selon l'article 62 de l'AUSCGIE, le capital social représente :",
    options: [
      { id: 'a', texte: "La valeur de marché de l'entreprise" },
      { id: 'b', texte: "Le montant des apports en capital faits par les associés, augmenté le cas échéant des incorporations de réserves, de bénéfices ou de primes" },
      { id: 'c', texte: "Le total de l'actif du bilan" },
      { id: 'd', texte: "La trésorerie disponible à la constitution" },
      { id: 'e', texte: "Le montant des seuls apports en numéraire" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 62 définit le capital social comme le montant des apports en capital faits par les associés à la société, augmenté, le cas échéant, des incorporations de réserves, de bénéfices ou de primes d'apports, d'émission ou de fusion. L'article 61 impose à toute société d'avoir un capital social indiqué dans ses statuts.",
    articleRef: "AUSCGIE, art. 61 et 62",
  },
  {
    id: 'q9',
    question: "Le montant du capital social est-il libre dans l'espace OHADA ?",
    options: [
      { id: 'a', texte: "Non : un minimum uniforme s'applique à toutes les formes" },
      { id: 'b', texte: "Oui : il est librement déterminé par les associés, mais l'Acte uniforme peut fixer un minimum en raison de la forme ou de l'objet de la société" },
      { id: 'c', texte: "Oui, sans aucune exception" },
      { id: 'd', texte: "Non : chaque État fixe librement tous les minima" },
      { id: 'e', texte: "Le capital est fixé par l'administration lors de l'immatriculation" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 65 pose que le montant du capital social est librement déterminé par les associés, tout en réservant la possibilité pour l'Acte uniforme de fixer un capital minimum en raison de la forme ou de l'objet. L'article 66 en tire les conséquences : une société en formation dont le capital n'atteint pas le minimum ne peut être valablement constituée, et la réduction ultérieure sous le minimum impose la dissolution à moins d'un rétablissement du capital.",
    articleRef: "AUSCGIE, art. 65 et 66",
  },
  {
    id: 'q10',
    question: "Dans le plan de comptes SYSCOHADA, la souscription du capital lors de la constitution est d'abord créditée au compte :",
    options: [
      { id: 'a', texte: "1013 — Capital souscrit, appelé, versé, non amorti" },
      { id: 'b', texte: "1011 — Capital souscrit, non appelé" },
      { id: 'c', texte: "109 — Apporteurs, capital souscrit, non appelé" },
      { id: 'd', texte: "4611 — Apporteurs, apports en nature" },
      { id: 'e', texte: "521 — Banques" },
    ],
    reponseCorrecte: 'b',
    explication: "Le cycle du capital suit trois subdivisions du compte 101 : 1011 Capital souscrit, non appelé (à la promesse d'apport), 1012 Capital souscrit, appelé, non versé (à l'appel), puis 1013 Capital souscrit, appelé, versé, non amorti (à la libération). Le compte 109 est le compte soustractif d'actif du capital souscrit non appelé, et les comptes 4611/4612 enregistrent les promesses des apporteurs.",
    articleRef: "Plan de comptes SYSCOHADA — comptes 1011, 1012, 1013, 109",
  },
  {
    id: 'q11',
    question: "Lors de la promesse d'apport, quels comptes d'apporteurs sont débités en contrepartie du crédit du compte 1011 ?",
    options: [
      { id: 'a', texte: "4613 pour tous les apports" },
      { id: 'b', texte: "4611 — Apporteurs, apports en nature, et 4612 — Apporteurs, apports en numéraire" },
      { id: 'c', texte: "467 — Apporteurs, restant dû sur capital appelé" },
      { id: 'd', texte: "4617 — Apporteurs défaillants" },
      { id: 'e', texte: "462 — Associés, comptes courants" },
    ],
    reponseCorrecte: 'b',
    explication: "À la souscription, les promesses sont constatées au débit de 4611 (apports en nature) et 4612 (apports en numéraire), par le crédit de 1011. À l'appel, le compte 4613 — Apporteurs, capital appelé, non versé est débité par le crédit de 4611 et 4612, et 1011 est viré à 1012. À la libération, 4613 est soldé et 1012 viré à 1013 (Application 58 du Guide).",
    articleRef: "SYSCOHADA — Guide d'application, Application 58 ; comptes 4611, 4612, 4613",
  },
  {
    id: 'q12',
    question: "Dans l'Application 58 du Guide (constitution avec apport en nature grevé d'un emprunt de 50 000 000), l'actif net apporté par l'apporteur en nature est de :",
    options: [
      { id: 'a', texte: "290 000 000 : le passif pris en charge est sans incidence" },
      { id: 'b', texte: "240 000 000 : la valeur brute des biens (290 000 000) diminuée de l'emprunt transmis (50 000 000)" },
      { id: 'c', texte: "300 000 000, montant du capital" },
      { id: 'd', texte: "50 000 000" },
      { id: 'e', texte: "340 000 000" },
    ],
    reponseCorrecte: 'b',
    explication: "L'apport est rémunéré pour sa valeur nette : biens apportés 290 000 000 (licences 30 M, terrain 20 M, bâtiment 150 M, matériel 50 M, créances 40 M) moins l'emprunt bancaire transmis 50 000 000, soit 240 000 000. À la réalisation, les comptes d'actif sont débités, le compte 162 est crédité de l'emprunt et 4613 est crédité de 240 000 000 — conformément à l'article 63 de l'AUSCGIE, la société rémunère l'apporteur par des titres « pour une valeur égale à celle des apports ».",
    articleRef: "SYSCOHADA — Guide d'application, Application 58 ; AUSCGIE, art. 63",
  },
  {
    id: 'q13',
    question: "Quel est le rôle du compte 109 — Apporteurs, capital souscrit, non appelé ?",
    options: [
      { id: 'a', texte: "Enregistrer les dividendes à payer aux apporteurs" },
      { id: 'b', texte: "Constater, au débit, la fraction du capital souscrit que la société n'a pas encore appelée, en contrepartie du crédit de 1011" },
      { id: 'c', texte: "Enregistrer les apports en industrie" },
      { id: 'd', texte: "Comptabiliser les frais de constitution" },
      { id: 'e', texte: "Suivre les comptes courants d'associés" },
    ],
    reponseCorrecte: 'b',
    explication: "En cas de libération fractionnée (Application 59), la fraction non appelée du capital est portée au débit du compte 109 par le crédit de 1011. Lors de l'appel ultérieur, l'écriture 4613 à 109 constate la créance devenue exigible sur les apporteurs, et 1011 est viré à 1012, puis à 1013 lors du versement.",
    articleRef: "SYSCOHADA — Guide d'application, Application 59 ; compte 109",
  },
  {
    id: 'q14',
    question: "Comment les frais de constitution (honoraires du notaire, frais d'actes) sont-ils traités dans le SYSCOHADA révisé ?",
    options: [
      { id: 'a', texte: "Immobilisés au compte 2011 et amortis sur 4 ans" },
      { id: 'b', texte: "Comptabilisés en charges de l'exercice (6324 Honoraires des professions réglementées, 6325 Frais d'actes et de contentieux)" },
      { id: 'c', texte: "Imputés sur la prime d'émission" },
      { id: 'd', texte: "Inscrits en report à nouveau débiteur" },
      { id: 'e', texte: "Déduits du capital social" },
    ],
    reponseCorrecte: 'b',
    explication: "Le SYSCOHADA révisé a supprimé les charges immobilisées : dans l'Application 58, les honoraires du notaire (5 000 000) sont débités au compte 6324 et les frais d'actes (500 000) au compte 6325 — des charges de l'exercice. L'ancien compte 2011 Frais de constitution n'existe plus dans le plan de comptes révisé ; l'Application 123 organise la transition : les soldes antérieurs sont virés au compte 4751 puis repris en charges sur l'exercice ou étalés sur la durée résiduelle (5 ans maximum).",
    articleRef: "SYSCOHADA — Guide d'application, Applications 58 et 123",
  },
  {
    id: 'q15',
    question: "Selon l'article 41 de l'AUSCGIE, les apports en numéraire sont, sauf disposition contraire de l'Acte uniforme :",
    options: [
      { id: 'a', texte: "Libérés intégralement lors de la constitution de la société" },
      { id: 'b', texte: "Libérés de moitié à la constitution dans tous les cas" },
      { id: 'c', texte: "Libérés du quart à la constitution dans tous les cas" },
      { id: 'd', texte: "Libérables à tout moment au choix de l'associé" },
      { id: 'e', texte: "Libérés dans les trois ans de l'immatriculation" },
    ],
    reponseCorrecte: 'a',
    explication: "L'article 41, alinéa 2, pose le principe : sauf disposition contraire de l'Acte uniforme, les apports en numéraire sont libérés intégralement lors de la constitution. Ce sont les règles propres à chaque forme (SARL, SA) qui organisent, par dérogation, la libération fractionnée — objet du chapitre 2. L'article 42 précise que ne sont considérés comme libérés que les apports correspondant à des sommes dont la société est devenue propriétaire et qu'elle a intégralement et définitivement encaissées.",
    articleRef: "AUSCGIE, art. 41 et 42",
  },
  {
    id: 'q16',
    question: "L'apport en numéraire par compensation avec une créance sur la société est-il possible ?",
    options: [
      { id: 'a', texte: "Jamais" },
      { id: 'b', texte: "Oui, lors d'une augmentation de capital, avec une créance certaine, liquide et exigible, à moins que les statuts ne l'interdisent" },
      { id: 'c', texte: "Oui, y compris lors de la constitution" },
      { id: 'd', texte: "Oui, avec n'importe quelle créance même litigieuse" },
      { id: 'e', texte: "Seulement avec l'accord unanime des créanciers sociaux" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 44 réserve cette faculté aux apports en numéraire réalisés à l'occasion d'une augmentation de capital : ils peuvent être réalisés par compensation avec une créance certaine, liquide et exigible sur la société, à moins que les statuts ne l'interdisent. À la constitution, la société n'existe pas encore : aucune créance sur elle ne peut servir de compensation.",
    articleRef: "AUSCGIE, art. 44",
  },
  {
    id: 'q17',
    question: "Quelle garantie l'apporteur en propriété doit-il à la société selon l'article 46 de l'AUSCGIE ?",
    options: [
      { id: 'a', texte: "Aucune : l'apport est fait aux risques de la société" },
      { id: 'b', texte: "Il est garant envers la société comme un vendeur envers son acheteur" },
      { id: 'c', texte: "Il est garant comme un bailleur envers son preneur" },
      { id: 'd', texte: "Il garantit uniquement l'existence du bien, non les vices cachés" },
      { id: 'e', texte: "Il doit fournir une caution bancaire" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 46 dispose que lorsque l'apport est en propriété, l'apporteur est garant envers la société comme un vendeur envers son acheteur. Pour l'apport en jouissance, l'article 47 le rend garant comme un bailleur envers son preneur — sauf pour les choses de genre appelées à être renouvelées, dont la propriété est transférée à la société à charge d'en rendre pareille quantité, qualité et valeur.",
    articleRef: "AUSCGIE, art. 46 et 47",
  },
  {
    id: 'q18',
    question: "Selon l'article 53 de l'AUSCGIE, les titres sociaux confèrent notamment à leur titulaire :",
    options: [
      { id: 'a', texte: "Un droit inconditionnel à un dividende annuel" },
      { id: 'b', texte: "Un droit sur les bénéfices lorsque leur distribution a été décidée, un droit sur l'actif net lors de sa répartition, l'obligation le cas échéant de contribuer aux pertes et le droit de participer aux votes" },
      { id: 'c', texte: "Le droit de gérer directement la société" },
      { id: 'd', texte: "Un droit de propriété directe sur chaque actif social" },
      { id: 'e', texte: "Une créance de restitution immédiate de l'apport" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 53 énumère quatre prérogatives : 1°) un droit sur les bénéfices réalisés lorsque leur distribution a été décidée ; 2°) un droit sur les actifs nets lors de leur répartition, à la dissolution ou à l'occasion d'une réduction de capital ; 3°) le cas échéant, l'obligation de contribuer aux pertes sociales ; 4°) le droit de participer aux votes des décisions collectives, sauf disposition contraire de l'Acte uniforme pour certaines catégories de titres. Le dividende n'est donc un droit de créance qu'une fois la distribution décidée.",
    articleRef: "AUSCGIE, art. 53",
  },
  {
    id: 'q19',
    question: "Le capital social est-il fixe dans l'espace OHADA ?",
    options: [
      { id: 'a', texte: "Oui, absolument : aucune variation n'est possible" },
      { id: 'b', texte: "Oui par principe (art. 67), mais il peut être augmenté ou réduit dans les conditions prévues pour la modification des statuts, et il peut être variable dans les conditions des articles 269-1 et suivants" },
      { id: 'c', texte: "Non : il varie automatiquement avec les résultats" },
      { id: 'd', texte: "Non : chaque assemblée ordinaire peut le modifier librement" },
      { id: 'e', texte: "Oui, sauf pour les sociétés de personnes" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 67 pose la fixité du capital, qui ne peut être augmenté ou réduit que dans les conditions prévues pour la modification des statuts — et, par dérogation, admet le capital variable dans les conditions des articles 269-1 et suivants (réservé aux SA ne faisant pas appel public à l'épargne et aux SAS). Les articles 68 à 70 précisent les procédés : augmentation par nouveaux apports ou incorporation de réserves, bénéfices ou primes ; réduction par remboursement d'une partie des apports (en numéraire ou par attribution d'actifs) ou par imputation des pertes.",
    articleRef: "AUSCGIE, art. 67 à 70",
  },
  {
    id: 'q20',
    question: "Dans l'Application 58, les fonds sont versés à la société par le notaire sous déduction des frais. Quelle est l'écriture chez la société ?",
    options: [
      { id: 'a', texte: "Débit 521 Banques 60 000 000 / Crédit 4732 Mandataires-Notaire 60 000 000" },
      { id: 'b', texte: "Débit 521 Banques 54 500 000, débit 6324 Honoraires 5 000 000, débit 6325 Frais d'actes 500 000 / Crédit 4732 Mandataires-Notaire 60 000 000" },
      { id: 'c', texte: "Débit 521 Banques 54 500 000 / Crédit 1013 Capital 54 500 000" },
      { id: 'd', texte: "Débit 2011 Frais de constitution 5 500 000 / Crédit 521 Banques 5 500 000" },
      { id: 'e', texte: "Débit 4732 Mandataires-Notaire 60 000 000 / Crédit 521 Banques 60 000 000" },
    ],
    reponseCorrecte: 'b',
    explication: "Le notaire, mandataire de la société, a encaissé 60 000 000 (compte 4732 débité lors de la réalisation des apports en numéraire). Il reverse les fonds nets de ses honoraires (5 000 000) et des frais d'actes (500 000) : la société débite 521 pour 54 500 000 et constate les deux charges (6324 et 6325), en soldant 4732 pour 60 000 000.",
    articleRef: "SYSCOHADA — Guide d'application, Application 58",
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
        texte: "La comptabilité des sociétés commence là où commence la société elle-même : au contrat. L'article 4 de l'AUSCGIE définit la société commerciale comme celle créée par deux ou plusieurs personnes « qui conviennent, par un contrat, d'affecter à une activité des biens en numéraire ou en nature, ou de l'industrie, dans le but de partager le bénéfice ou de profiter de l'économie qui peut en résulter » — les associés s'engageant à contribuer aux pertes dans les conditions prévues par l'Acte uniforme, la société étant créée « dans l'intérêt commun des associés ». L'article 5 y ajoute la voie unipersonnelle : dans les cas prévus par l'Acte uniforme, la société peut être créée par une seule personne, l'**associé unique**, par un acte écrit.",
      },
      {
        type: 'filet',
        titre: "Commercialité par la forme (art. 6)",
        texte: "Le caractère commercial d'une société est déterminé par sa forme ou par son objet. Sont commerciales à raison de leur forme, et quel que soit leur objet : la société en nom collectif, la société en commandite simple, la société à responsabilité limitée, la société anonyme et la société par actions simplifiée.",
      },
      {
        type: 'paragraphe',
        texte: "Le pivot du dispositif est l'**obligation d'apport** : « Chaque associé doit faire un apport à la société. Chaque associé est débiteur envers la société de tout ce qu'il s'est obligé à lui apporter en numéraire, en nature ou en industrie » (art. 37). En contrepartie, les associés reçoivent des titres émis par la société (art. 38). Et l'article 39 étend l'ensemble du régime des apports aux apports réalisés en cours de vie sociale, à l'occasion d'une augmentation de capital — le présent chapitre fonde donc aussi le chapitre consacré aux augmentations de capital.",
      },
      {
        type: 'carte',
        titre: "Les trois types d'apports (art. 40) — liste limitative",
        tableau: {
          entetes: ["Type", "Objet", "Concourt au capital ?"],
          lignes: [
            ["Apport en **numéraire**", "De l'argent", "Oui"],
            ["Apport en **nature**", "Des droits portant sur des biens mobiliers ou immobiliers, corporels ou incorporels", "Oui"],
            ["Apport en **industrie**", "Des connaissances techniques ou professionnelles ou des services", "Non (art. 50-3)"],
          ],
        },
        note: "« Tout autre apport est interdit » (art. 40 in fine). Le prétendu apport en crédit ou en simple caution ne rémunère aucun titre social.",
      },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
    ],
  },
  {
    numero: '1.2',
    titre: "La réalisation des apports : numéraire, nature, industrie",
    navLabel: "Réalisation des apports",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'apport en **numéraire** est réalisé par le transfert à la société de la propriété des sommes que l'associé s'est engagé à apporter ; sauf disposition contraire de l'Acte uniforme, il est **libéré intégralement lors de la constitution** (art. 41). La libération est entendue strictement : ne sont considérés comme libérés que les apports correspondant à des sommes dont la société est devenue propriétaire et qu'elle a **intégralement et définitivement encaissées** (art. 42) — une simple promesse ou un chèque non encaissé ne libèrent rien. En cas de retard, les sommes restant dues portent **de plein droit** intérêt au taux légal à compter du jour où le versement devait être effectué, sans préjudice de dommages et intérêts (art. 43). Enfin, à l'occasion d'une augmentation de capital — et à ce moment seulement — l'apport en numéraire peut être réalisé par **compensation** avec une créance certaine, liquide et exigible sur la société, à moins que les statuts ne l'interdisent (art. 44).",
      },
      { type: 'controle', question: QCM[2] },
      {
        type: 'carte',
        titre: "L'apport en nature (art. 45-50)",
        liste: [
          "**Réalisation** : transfert des droits réels ou personnels correspondant aux biens apportés et mise à la disposition effective de la société ; libération **intégrale** dès la constitution (art. 45).",
          "**Garanties** : l'apporteur en propriété est garant envers la société *comme un vendeur envers son acheteur* (art. 46) ; l'apporteur en jouissance, *comme un bailleur envers son preneur* — sauf choses de genre appelées à être renouvelées, dont la propriété passe à la société à charge d'en rendre pareille quantité, qualité et valeur (art. 47).",
          "**Publicité** : l'apport d'un bien soumis à publicité peut être publié avant l'immatriculation, la formalité ne produisant effet rétroactif qu'à compter de celle-ci (art. 48).",
          "**Évaluation** : les associés évaluent les apports en nature ; dans les cas prévus par l'Acte uniforme, l'évaluation est contrôlée par un **commissaire aux apports**, et les statuts contiennent l'évaluation (art. 49-50).",
        ],
      },
      { type: 'controle', question: QCM[5] },
      {
        type: 'carte',
        titre: "L'apport en industrie (art. 50-1 à 50-4)",
        liste: [
          "Réalisé par la mise à disposition effective de connaissances techniques ou professionnelles ou de services ; **interdit dans les sociétés anonymes** (art. 50-1).",
          "L'apporteur doit rendre la contribution promise et compte de tous les gains réalisés par l'activité apportée ; les statuts décrivent l'apport, ses modalités de libération, la durée des prestations, le nombre de titres attribués et leurs droits (art. 50-2).",
          "Il **ne concourt pas à la formation du capital social**, mais donne lieu à des titres ouvrant droit au vote et au partage des bénéfices et de l'actif net, à charge de contribuer aux pertes — dans une **double limite de 25 %** : des droits de vote de l'ensemble, et des bénéfices, de l'actif net et des pertes (art. 50-3).",
          "Les titres d'industrie ne sont **ni cessibles ni transmissibles** et n'ont **pas de valeur nominale** (art. 50-4).",
        ],
        note: "Conséquence comptable directe : l'apport en industrie ne figure ni au capital ni à l'actif du bilan — aucun compte d'immobilisation n'est mouvementé. Sa rémunération transite par le partage des bénéfices.",
      },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[4] },
    ],
  },
  {
    numero: '1.3',
    titre: "Titres sociaux et capital social",
    navLabel: "Titres et capital",
    blocs: [
      {
        type: 'paragraphe',
        texte: "En contrepartie des apports, la société émet des **titres sociaux** qui représentent les droits des associés : **actions** dans les sociétés par actions, **parts sociales** dans les autres (art. 51). Ce sont des biens meubles (art. 52). L'article 53 énumère les prérogatives qu'ils confèrent : un droit sur les bénéfices *lorsque leur distribution a été décidée*, un droit sur les actifs nets lors de leur répartition — à la dissolution ou à l'occasion d'une réduction de capital —, le cas échéant l'obligation de contribuer aux pertes, et le droit de participer aux votes des décisions collectives. Sauf clause ou disposition contraire, droits et obligations sont **proportionnels aux apports** (art. 54, al. 1er) — mais sont réputées non écrites les **clauses léonines** : attribuer à un associé la totalité du profit, l'exonérer de la totalité des pertes, l'exclure totalement du profit ou mettre à sa charge la totalité des pertes (art. 54, al. 2).",
      },
      { type: 'controle', question: QCM[17] },
      { type: 'controle', question: QCM[6] },
      {
        type: 'carte',
        titre: "Valeur nominale et circulation des titres (art. 56-59)",
        liste: [
          "Les titres de même catégorie émis par une société doivent avoir la **même valeur nominale** (art. 56).",
          "Les parts sociales sont **cessibles** ; les actions sont **cessibles ou négociables** (art. 57). Seules les sociétés par actions émettent des titres négociables — l'émission ou la garantie de titres négociables par les autres formes est nulle (art. 58).",
          "En cas de cession ou de rachat prévu par l'Acte uniforme, la valeur des droits est déterminée, à défaut d'accord amiable, par **expert** désigné par les parties ou par la juridiction compétente statuant à bref délai (art. 59).",
        ],
      },
      {
        type: 'paragraphe',
        texte: "Le **capital social**, que toute société doit avoir et indiquer dans ses statuts (art. 61), « représente le montant des apports en capital faits par les associés à la société et augmente, le cas échéant, des incorporations de réserves, de bénéfices ou de primes d'apports, d'émission ou de fusion » (art. 62). La société rémunère l'apporteur par des titres « pour une valeur égale à celle des apports » ; en cas d'incorporation, elle émet des titres nouveaux ou élève le nominal des titres existants, les deux procédés pouvant être combinés (art. 63). Le capital est divisé en parts sociales ou en actions selon la forme (art. 64).",
      },
      {
        type: 'carte',
        titre: "Montant, fixité, variations (art. 65-70)",
        tableau: {
          entetes: ["Règle", "Contenu"],
          lignes: [
            ["Liberté du montant (art. 65)", "Le montant du capital est librement déterminé par les associés ; l'Acte uniforme peut toutefois fixer un minimum en raison de la forme ou de l'objet."],
            ["Sanction du minimum (art. 66)", "Sous le minimum, la société en formation ne peut être valablement constituée ; si le capital est réduit ultérieurement sous le minimum, la société doit être dissoute, à moins d'être recapitalisée au moins au minimum."],
            ["Fixité de principe (art. 67)", "Le capital est fixe ; il peut être augmenté ou réduit dans les conditions prévues pour la modification des statuts. Par dérogation, il peut être variable dans les conditions des articles 269-1 et suivants."],
            ["Augmentation (art. 68)", "Par nouveaux apports ou par incorporation de réserves, de bénéfices ou de primes d'apports, d'émission ou de fusion."],
            ["Réduction (art. 69-70)", "Par remboursement aux associés d'une partie de leurs apports — en numéraire ou par attribution d'actifs — ou par imputation des pertes."],
          ],
        },
      },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[18] },
    ],
  },
  {
    numero: '1.4',
    titre: "Le dispositif comptable : les comptes du capital et des apporteurs",
    navLabel: "Comptes du capital",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le plan de comptes SYSCOHADA traduit fidèlement la chronologie juridique de la constitution : promesse, appel, libération. Le compte **101 — Capital social** se subdivise pour suivre l'état d'avancement de la libération, le compte **109** isole la fraction souscrite mais non appelée, et le compte **461 — Apporteurs, opérations sur le capital** détaille la relation avec chaque apporteur.",
      },
      {
        type: 'carte',
        titre: "Les comptes du cycle du capital",
        tableau: {
          entetes: ["Compte", "Intitulé", "Rôle"],
          lignes: [
            ["1011", "Capital souscrit, non appelé", "Crédité à la souscription (promesses d'apport)"],
            ["1012", "Capital souscrit, appelé, non versé", "Reçoit 1011 au moment de l'appel"],
            ["1013", "Capital souscrit, appelé, versé, non amorti", "Reçoit 1012 lors de la libération effective"],
            ["1014", "Capital souscrit, appelé, versé, amorti", "Fraction du capital amortie (chapitre 5)"],
            ["109", "Apporteurs, capital souscrit, non appelé", "Débité de la fraction non appelée (libération fractionnée)"],
            ["105", "Primes liées au capital social (1051 émission, 1052 apport, 1053 fusion, 1054 conversion)", "Excédent du prix d'émission sur le nominal (chapitre 4)"],
          ],
        },
      },
      {
        type: 'carte',
        titre: "Les comptes d'apporteurs (461)",
        tableau: {
          entetes: ["Compte", "Intitulé", "Rôle"],
          lignes: [
            ["4611", "Apporteurs, apports en nature", "Promesse d'apport en nature"],
            ["4612", "Apporteurs, apports en numéraire", "Promesse d'apport en numéraire"],
            ["4613", "Apporteurs, capital appelé, non versé", "Créance exigible sur les apporteurs après appel"],
            ["4616", "Apporteurs, versements anticipés", "Fonds reçus avant l'appel"],
            ["4617", "Apporteurs défaillants", "Associé n'ayant pas répondu à l'appel (chapitre 2)"],
            ["4619", "Apporteurs, capital à rembourser", "Réduction ou amortissement du capital (chapitre 5)"],
            ["467", "Apporteurs, restant dû sur capital appelé", "Solde restant dû sur le capital appelé"],
          ],
        },
        note: "Ne pas confondre 461 (opérations sur le capital) avec 462 — Associés, comptes courants (avances des associés à la société, qui sont des dettes financières ordinaires) ni avec 465 — Associés, dividendes à payer.",
      },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[12] },
    ],
  },
  {
    numero: '1.5',
    titre: "Comptabilisation de la constitution : libération intégrale",
    navLabel: "Libération intégrale",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'Application 58 du Guide d'application déroule le schéma complet. Une entité est constituée le 19/09/N au capital de **300 000 000** (30 000 actions de 10 000). L'apporteur en nature X apporte : licences 30 000 000, terrain bâti 20 000 000, bâtiment 150 000 000, matériel 50 000 000, créances clients 40 000 000, la société prenant en charge un emprunt bancaire de 50 000 000. Son actif net apporté est donc de 290 000 000 − 50 000 000 = **240 000 000**. Les autres associés souscrivent le solde en numéraire : 300 000 000 − 240 000 000 = **60 000 000**. Le notaire perçoit 5 000 000 d'honoraires et 500 000 de frais d'actes.",
      },
      {
        type: 'carte',
        titre: "1re étape — Promesses d'apport et appel (19/09/N)",
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
        titre: "2e étape — Réalisation des apports (20/09/N)",
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
            ["4732", "", "Mandataires — Notaire (fonds numéraire)", "60 000 000", ""],
            ["", "4613", "Apporteurs, capital appelé, non versé", "", "60 000 000"],
            ["1012", "", "Capital souscrit, appelé, non versé", "300 000 000", ""],
            ["", "1013", "Capital souscrit, appelé, versé, non amorti", "", "300 000 000"],
          ],
        },
        note: "L'apport en nature entre pour sa valeur nette : les biens sont débités à leur valeur d'apport, le passif transmis (162) est crédité, la différence soldant la créance 4613 de l'apporteur en nature. Les fonds des apporteurs en numéraire sont d'abord entre les mains du notaire, mandataire (4732).",
      },
      {
        type: 'carte',
        titre: "3e étape — Versement des fonds par le notaire, sous déduction des frais (30/09/N)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["521", "", "Banques", "54 500 000", ""],
            ["6324", "", "Honoraires des professions réglementées", "5 000 000", ""],
            ["6325", "", "Frais d'actes et de contentieux", "500 000", ""],
            ["", "4732", "Mandataires — Notaire", "", "60 000 000"],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Les frais de constitution ne s'immobilisent plus",
        texte: "Le SYSCOHADA révisé a **supprimé les charges immobilisées** : les frais de constitution sont des charges de l'exercice, comptabilisées par nature (6324, 6325). L'ancien compte 2011 — Frais de constitution n'existe plus dans le plan de comptes révisé. Pour les entités qui avaient immobilisé de tels frais avant la révision, l'Application 123 organise la transition : virement du solde au compte 4751, puis reprise en charges sur l'exercice ou étalement sur la durée résiduelle, cinq ans au maximum.",
      },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[19] },
      { type: 'controle', question: QCM[13] },
    ],
  },
  {
    numero: '1.6',
    titre: "Comptabilisation de la constitution : libération fractionnée",
    navLabel: "Libération fractionnée",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Lorsque l'Acte uniforme le permet pour la forme sociale considérée — par dérogation au principe de libération intégrale de l'article 41 —, le capital en numéraire peut n'être libéré que partiellement à la souscription, le solde étant appelé ultérieurement par les organes sociaux. Le compte **109 — Apporteurs, capital souscrit, non appelé** entre alors en scène : il isole, au débit, la fraction promise mais non encore exigible, en regard du crédit de 1011. L'Application 59 du Guide en donne le schéma : constitution le 15/11/N, 2 500 actions de numéraire de 10 000 libérées **de moitié** à la souscription ; la seconde moitié est appelée le 10/03/N+1 et versée le 15/04/N+1.",
      },
      {
        type: 'carte',
        titre: "Souscription et appel de la 1re moitié (15/11/N)",
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
        titre: "Le cycle complet en quatre temps (Application 59)",
        tableau: {
          entetes: ["Date", "Écriture", "Montant"],
          lignes: [
            ["30/11/N — libération de la 1re moitié", "Débit 521 Banques / Crédit 4613 ; puis débit 1012 / crédit 1013", "12 500 000"],
            ["10/03/N+1 — appel de la 2e moitié", "Débit 4613 / Crédit 109 ; puis débit 1011 / crédit 1012", "12 500 000"],
            ["15/04/N+1 — versement de la 2e moitié", "Débit 521 Banques / Crédit 4613 ; puis débit 1012 / crédit 1013", "12 500 000"],
            ["Situation finale", "Capital entièrement libéré : 1013 = 25 000 000 ; 109, 1011, 1012 et 4613 soldés", "—"],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Lecture du bilan en cours de libération",
        texte: "Tant que la seconde moitié n'est pas appelée, le capital social figure au passif pour son montant total souscrit (1011 + 1012 + 1013), tandis que le compte 109 — de sens débiteur — vient en retranchement : il matérialise la créance conditionnelle de la société sur ses apporteurs. Après l'appel, la créance devenue exigible migre de 109 vers 4613 ; après le versement, elle s'éteint. Les versements reçus par anticipation, avant tout appel, se logent quant à eux au crédit du compte 4616 — Apporteurs, versements anticipés.",
      },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[16] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas-1',
    titre: "Cas 1 — KIVU AGRO SA : constitution avec apports mixtes",
    contexte: "KIVU AGRO SA est constituée le 01/03/N au capital de 500 000 000 FC (50 000 actions de 10 000 FC), intégralement appelé à la constitution. L'associé fondateur M. K. apporte une unité de transformation : bâtiment industriel 220 000 000, matériel 130 000 000, stock de matières premières 30 000 000, et la société prend en charge un emprunt bancaire de 80 000 000 attaché à l'unité. Les autres actionnaires souscrivent le solde en numéraire, versé entre les mains du notaire. Celui-ci reverse les fonds le 15/03/N sous déduction de ses honoraires (7 000 000) et des frais d'actes (1 000 000).",
    questions: [
      {
        num: 1,
        enonce: "Calculez l'actif net apporté par M. K. et le montant à souscrire en numéraire par les autres actionnaires.",
        correction: "Biens apportés : 220 000 000 + 130 000 000 + 30 000 000 = 380 000 000. Passif transmis : 80 000 000. Actif net apporté = 380 000 000 − 80 000 000 = 300 000 000 — c'est pour cette valeur que M. K. est rémunéré en actions (AUSCGIE, art. 63 : titres émis « pour une valeur égale à celle des apports »). Numéraire à souscrire = 500 000 000 − 300 000 000 = 200 000 000, soit 20 000 actions.",
      },
      {
        num: 2,
        enonce: "Passez les écritures de promesse d'apport et d'appel au 01/03/N.",
        correction: "Promesses : débit 4611 Apporteurs, apports en nature 300 000 000 ; débit 4612 Apporteurs, apports en numéraire 200 000 000 ; crédit 1011 Capital souscrit, non appelé 500 000 000. Appel immédiat de la totalité : débit 4613 Apporteurs, capital appelé, non versé 500 000 000 / crédit 4611 pour 300 000 000 et crédit 4612 pour 200 000 000 ; puis virement débit 1011 / crédit 1012 Capital souscrit, appelé, non versé pour 500 000 000 (schéma de l'Application 58).",
      },
      {
        num: 3,
        enonce: "Passez l'écriture de réalisation de l'apport en nature.",
        correction: "Débit 2311 Bâtiment industriel 220 000 000 ; débit 2411 Matériel industriel 130 000 000 ; débit 31 Stocks de matières premières 30 000 000 ; crédit 162 Emprunts auprès des établissements de crédit 80 000 000 ; crédit 4613 Apporteurs, capital appelé, non versé 300 000 000. La créance de la société sur M. K. est soldée par la remise des biens, nette du passif pris en charge.",
      },
      {
        num: 4,
        enonce: "Passez les écritures relatives au numéraire : réception par le notaire, puis reversement du 15/03/N, et le virement de capital correspondant.",
        correction: "Réception par le mandataire : débit 4732 Mandataires — Notaire 200 000 000 / crédit 4613 pour 200 000 000. La totalité du capital étant alors libérée, virement débit 1012 / crédit 1013 Capital souscrit, appelé, versé, non amorti 500 000 000. Reversement du 15/03/N : débit 521 Banques 192 000 000 ; débit 6324 Honoraires des professions réglementées 7 000 000 ; débit 6325 Frais d'actes et de contentieux 1 000 000 ; crédit 4732 Mandataires — Notaire 200 000 000. Les frais de constitution sont des charges de l'exercice — le SYSCOHADA révisé a supprimé leur immobilisation.",
      },
      {
        num: 5,
        enonce: "L'évaluation de l'apport de M. K. figure-t-elle nécessairement dans les statuts ? Qui l'établit et qui la contrôle ?",
        correction: "Oui : l'article 50 de l'AUSCGIE impose que les statuts contiennent l'évaluation des apports en nature. Ce sont les associés qui évaluent (art. 49, al. 1er) ; dans les cas prévus par l'Acte uniforme — notamment selon la forme sociale et les seuils qu'il fixe —, cette évaluation est contrôlée par un commissaire aux apports (art. 49, al. 2). L'apporteur en propriété est en outre garant envers la société comme un vendeur envers son acheteur (art. 46).",
      },
    ],
  },
  {
    id: 'cas-2',
    titre: "Cas 2 — SANKURU DISTRIBUTION : libération fractionnée",
    contexte: "SANKURU DISTRIBUTION est constituée le 01/06/N avec un capital de 60 000 000 FC (6 000 titres de numéraire de 10 000 FC), libéré de moitié à la souscription, les fonds étant versés directement en banque. Le solde est appelé le 01/02/N+1 et versé le 01/03/N+1. Un associé, Mme T. (500 titres), verse la totalité de son apport dès la souscription.",
    questions: [
      {
        num: 1,
        enonce: "Passez les écritures de souscription et d'appel de la première moitié au 01/06/N (hors versement anticipé de Mme T.).",
        correction: "Fraction appelée : 30 000 000 ; fraction non appelée : 30 000 000. Écritures (schéma de l'Application 59) : débit 109 Apporteurs, capital souscrit, non appelé 30 000 000 ; débit 4613 Apporteurs, capital appelé, non versé 30 000 000 ; crédit 1011 Capital souscrit, non appelé 30 000 000 ; crédit 1012 Capital souscrit, appelé, non versé 30 000 000.",
      },
      {
        num: 2,
        enonce: "Comment traiter le versement de Mme T., qui libère la totalité de ses 500 titres (5 000 000) alors que seule la moitié est appelée ?",
        correction: "La moitié appelée (2 500 000) éteint sa part de la créance 4613. La moitié non appelée mais versée (2 500 000) est un versement anticipé : elle est portée au crédit du compte 4616 — Apporteurs, versements anticipés, qui restera au passif jusqu'à l'appel du solde. Écriture globale à l'encaissement : débit 521 Banques 5 000 000 / crédit 4613 pour 2 500 000 et crédit 4616 pour 2 500 000.",
      },
      {
        num: 3,
        enonce: "Passez les écritures de libération de la première moitié pour l'ensemble des associés (le versement de Mme T. étant compris) et le virement de capital.",
        correction: "Encaissement des autres associés : débit 521 Banques 27 500 000 / crédit 4613 pour 27 500 000 (leur moitié appelée : 30 000 000 − 2 500 000 déjà versés par Mme T.). Le compte 4613 est ainsi soldé (30 000 000). Virement de capital pour la fraction appelée et versée : débit 1012 / crédit 1013 Capital souscrit, appelé, versé, non amorti 30 000 000.",
      },
      {
        num: 4,
        enonce: "Passez les écritures de l'appel du solde (01/02/N+1) et de son versement (01/03/N+1), en tenant compte du versement anticipé.",
        correction: "Appel : débit 4613 30 000 000 / crédit 109 30 000 000, et virement débit 1011 / crédit 1012 pour 30 000 000. Imputation du versement anticipé : débit 4616 2 500 000 / crédit 4613 2 500 000. Versement des autres associés : débit 521 Banques 27 500 000 / crédit 4613 27 500 000. Enfin, virement débit 1012 / crédit 1013 pour 30 000 000 : le capital de 60 000 000 est entièrement libéré, les comptes 109, 1011, 1012, 4613 et 4616 sont soldés.",
      },
      {
        num: 5,
        enonce: "Au 31/12/N, comment le capital de SANKURU DISTRIBUTION se présente-t-il au bilan ?",
        correction: "Au passif, le capital souscrit figure pour 60 000 000, ventilé entre 1013 (30 000 000, appelé, versé) et 1011 (30 000 000, non appelé) ; le compte 109 — Apporteurs, capital souscrit, non appelé (30 000 000, débiteur) vient en retranchement et matérialise la créance de la société sur ses apporteurs pour la fraction non appelée ; le compte 4616 (2 500 000, créditeur) constate la dette de la société au titre du versement anticipé de Mme T. jusqu'à l'appel du solde.",
      },
    ],
  },
  {
    id: 'cas-3',
    titre: "Cas 3 — Cabinet MWEHU & Associés : l'apport en industrie",
    contexte: "Trois personnes projettent une société de conseil : Mme M. apporte 40 000 000 en numéraire, M. W. apporte du matériel informatique évalué à 20 000 000, et M. H., ingénieur réputé, souhaite apporter uniquement son savoir-faire technique et s'engager à animer les missions pendant cinq ans. Les fondateurs hésitent entre la société anonyme et une forme admettant l'apport en industrie ; ils envisagent d'attribuer à M. H. 30 % des droits de vote et 35 % des bénéfices.",
    questions: [
      {
        num: 1,
        enonce: "L'apport de M. H. est-il un apport au sens de l'AUSCGIE ? La société anonyme est-elle possible ?",
        correction: "Oui : l'apport de connaissances techniques ou professionnelles ou de services est l'apport en industrie, troisième type admis par l'article 40. Mais la société anonyme est exclue pour ce projet tel quel : l'article 50-1, alinéa 2, interdit les apports en industrie dans les SA. Les fondateurs devront retenir une forme qui l'admet, ou faire entrer M. H. autrement (contrat de travail, contrat de prestation).",
      },
      {
        num: 2,
        enonce: "Le projet d'attribuer à M. H. 30 % des droits de vote et 35 % des bénéfices est-il conforme ?",
        correction: "Non, sur les deux points. L'article 50-3 plafonne les droits de vote attachés aux titres d'industrie à 25 % de l'ensemble des droits de vote, et la part totale attachée à ces titres à 25 % des bénéfices, de l'actif net et des pertes. Les 30 % de droits de vote et les 35 % de bénéfices excèdent ces plafonds : les stipulations devront être ramenées à 25 % au plus.",
      },
      {
        num: 3,
        enonce: "Quel est le capital social de la société, et comment l'apport de M. H. y participe-t-il ?",
        correction: "Capital = apports en numéraire et en nature : 40 000 000 + 20 000 000 = 60 000 000. L'apport en industrie ne concourt pas à la formation du capital social (art. 50-3, al. 1er) : M. H. reçoit des titres sociaux ouvrant droit au vote et au partage des bénéfices et de l'actif net, à charge de contribuer aux pertes, mais son apport n'est inscrit ni au capital ni à l'actif — aucune écriture d'immobilisation n'est passée.",
      },
      {
        num: 4,
        enonce: "Que doivent prévoir les statuts au sujet de l'apport de M. H., et quels sont les caractères de ses titres ?",
        correction: "L'article 50-2 impose que les statuts décrivent l'apport en industrie et déterminent les modalités de sa libération, y compris la durée des prestations (ici cinq ans), le nombre de titres attribués en rémunération et les droits attachés à ces titres dans le partage des bénéfices et de l'actif net, ainsi que les modalités de liquidation de ces titres en cas de cessation de l'activité apportée. M. H. devra en outre rendre compte de tous les gains réalisés par l'activité faisant l'objet de son apport. Ses titres sont incessibles, intransmissibles et sans valeur nominale (art. 50-4).",
      },
      {
        num: 5,
        enonce: "Une clause du projet de statuts stipule que Mme M., principale bailleresse de fonds, sera « exonérée de toute contribution aux pertes ». Qu'en pensez-vous ?",
        correction: "Cette clause est léonine : l'article 54, alinéa 2, répute non écrites les clauses exonérant un associé de la totalité des pertes (comme celles lui attribuant la totalité du profit, l'excluant totalement du profit ou mettant à sa charge la totalité des pertes). La clause serait réputée non écrite — la société resterait valable, mais la répartition redeviendrait proportionnelle aux apports conformément à l'article 54, alinéa 1er, sauf autre clause licite.",
      },
    ],
  },
  {
    id: 'cas-4',
    titre: "Cas 4 — TSHOPO SARLU : retard de versement et frais de constitution",
    contexte: "TSHOPO SARLU, société unipersonnelle, est constituée le 10/01/N par M. B., qui souscrit 15 000 000 en numéraire, intégralement appelés. Il ne verse que 10 000 000 le jour de la constitution ; le solde de 5 000 000, exigible le 10/01/N, n'est versé que le 10/07/N. Le taux d'intérêt légal est de 8 % l'an (hypothèse). Par ailleurs, la société a payé le 31/01/N par chèque : honoraires du conseil juridique 1 200 000 et droits et frais d'actes 300 000.",
    questions: [
      {
        num: 1,
        enonce: "La constitution d'une société par une seule personne est-elle possible ? Sur quel fondement ?",
        correction: "Oui : l'article 5 de l'AUSCGIE prévoit que la société peut être créée, dans les cas prévus par l'Acte uniforme, par une seule personne dénommée « associé unique », par un acte écrit. La SARL unipersonnelle en est l'illustration classique.",
      },
      {
        num: 2,
        enonce: "Quelles sont les conséquences juridiques du retard de versement des 5 000 000 ?",
        correction: "L'article 43 s'applique de plein droit : les sommes restant dues portent intérêt au taux légal à compter du jour où le versement devait être effectué — sans mise en demeure — sans préjudice de dommages et intérêts s'il y a lieu. Intérêts dus : 5 000 000 × 8 % × 6/12 = 200 000 pour les six mois de retard. Par ailleurs, l'article 42 rappelle que seuls les fonds intégralement et définitivement encaissés sont réputés libérés : jusqu'au 10/07/N, le capital n'est libéré qu'à hauteur de 10 000 000.",
      },
      {
        num: 3,
        enonce: "Passez les écritures de constitution du 10/01/N (souscription, appel, versement partiel).",
        correction: "Souscription et appel intégral : débit 4612 Apporteurs, apports en numéraire 15 000 000 / crédit 1011 pour 15 000 000 ; débit 4613 / crédit 4612 pour 15 000 000 ; débit 1011 / crédit 1012 pour 15 000 000. Versement partiel : débit 521 Banques 10 000 000 / crédit 4613 pour 10 000 000. Le compte 4613 conserve un solde débiteur de 5 000 000 — la créance exigible de la société sur l'associé (le compte 467 — Apporteurs, restant dû sur capital appelé peut en assurer le suivi). Le virement 1012 → 1013 n'intervient qu'à hauteur des sommes effectivement versées.",
      },
      {
        num: 4,
        enonce: "Passez les écritures du 10/07/N (versement du solde et intérêts de retard).",
        correction: "Versement du solde : débit 521 Banques 5 000 000 / crédit 4613 pour 5 000 000, puis virement débit 1012 / crédit 1013 pour le solde, portant 1013 à 15 000 000 (capital entièrement libéré). Intérêts de retard dus de plein droit (art. 43) : 200 000, encaissés au débit de 521 par le crédit d'un compte de revenus financiers (77) — ils rémunèrent l'immobilisation des fonds dus à la société et ne touchent pas le capital.",
      },
      {
        num: 5,
        enonce: "Comptabilisez les frais du 31/01/N et justifiez leur traitement dans le SYSCOHADA révisé.",
        correction: "Débit 6324 Honoraires des professions réglementées 1 200 000 ; débit 6325 Frais d'actes et de contentieux 300 000 ; crédit 521 Banques 1 500 000. Ce sont des charges de l'exercice : le SYSCOHADA révisé a supprimé les charges immobilisées, donc plus d'inscription à l'ancien compte 2011 Frais de constitution. Une entité qui détiendrait encore de tels soldes hérités d'avant la révision les traite selon l'Application 123 : virement au compte transitoire 4751, puis reprise en charges ou étalement sur la durée résiduelle, cinq ans au maximum.",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 1,
  id: 'ue3-chapitre-1',
  titre: "La constitution des sociétés : apports et comptabilisation",
  sousTitre: "AUSCGIE, art. 4-9 et 37-70 · SYSCOHADA révisé, Applications 58-59",
  infoBulle: "Le contrat de société et l'obligation d'apport (AUSCGIE art. 4, 37-40), la réalisation des apports en numéraire, en nature et en industrie (art. 41-50-4), les titres sociaux et le capital (art. 51-70), et la traduction comptable de la constitution dans le SYSCOHADA révisé : comptes 101x, 109, 461x, libération intégrale et fractionnée.",
  loiRef: "AUSCGIE (30 janvier 2014) · SYSCOHADA révisé (AUDCIF)",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Définir la société commerciale et l'obligation d'apport (AUSCGIE art. 4-6, 37-40) et distinguer les trois types d'apports",
    "Maîtriser le régime de réalisation des apports : libération, retard, compensation, garanties, évaluation, apport en industrie et ses plafonds de 25 %",
    "Connaître les droits attachés aux titres sociaux (art. 53-54) et le régime du capital social (art. 61-70)",
    "Manier le dispositif comptable de la constitution : cycle 1011 → 1012 → 1013, comptes 109 et 461x",
    "Comptabiliser une constitution en libération intégrale (Application 58) et fractionnée (Application 59), frais de constitution compris",
  ],
  sections: SECTIONS,
  aRetenir: [
    "La société commerciale naît d'un contrat d'affectation de biens ou d'industrie en vue de partager le bénéfice ou de profiter de l'économie, avec engagement de contribuer aux pertes (art. 4) ; l'associé unique est admis dans les cas prévus (art. 5).",
    "Trois apports seulement : numéraire, nature, industrie — tout autre apport est interdit (art. 40).",
    "Apports en numéraire et en nature : libération intégrale à la constitution, sauf dérogation de l'Acte uniforme (art. 41, 45) ; le retard fait courir l'intérêt légal de plein droit (art. 43).",
    "L'apport en industrie est interdit dans les SA, ne concourt pas au capital et est doublement plafonné à 25 % (droits de vote ; bénéfices, actif net et pertes) ; ses titres sont incessibles et sans valeur nominale (art. 50-1 à 50-4).",
    "Les clauses léonines sont réputées non écrites (art. 54).",
    "Le capital représente les apports en capital, augmentés le cas échéant des incorporations de réserves, bénéfices ou primes (art. 62) ; il est fixe par principe, librement déterminé sous réserve des minima (art. 65-67).",
    "Cycle comptable du capital : 1011 (souscrit non appelé) → 1012 (appelé non versé) → 1013 (appelé versé) ; promesses en 4611/4612, créance d'appel en 4613, fraction non appelée en 109, versements anticipés en 4616.",
    "L'apport en nature entre pour sa valeur nette du passif transmis (Application 58 : 290 000 000 − 50 000 000 = 240 000 000).",
    "Les frais de constitution sont des charges (6324, 6325) : le SYSCOHADA révisé a supprimé les charges immobilisées ; la transition des anciens soldes passe par le compte 4751 (Application 123).",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du GIE (AUSCGIE)", precision: "adopté le 30 janvier 2014 à Ouagadougou, J.O. OHADA n° spécial du 4 février 2014 — art. 4-9 (création, associé unique, commercialité), 37-50-4 (apports), 51-60 (titres sociaux), 61-70 (capital social)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Guide d'application", precision: "Applications 58 (libération intégrale des apports), 59 (libération fractionnée) et 123 (première application : sort des frais d'établissement)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Plan de comptes", precision: "comptes 101 (1011-1014), 105, 109, 111-118, 461 (4611-4619), 467, 4732" },
    { genre: 'texte', intitule: "Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF)", precision: "cadre comptable de référence du SYSCOHADA révisé" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE (Acte uniforme révisé du 30 janvier 2014) · SYSCOHADA révisé — Guide d'application et plan de comptes (AUDCIF)",
}

export default chapitre
