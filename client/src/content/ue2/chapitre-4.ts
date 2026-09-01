// Chapitre 4 du module UE2, Droit des sociétés : contenu pur.
// Migré depuis l'ancienne page dédiée UE2Chapitre4Page.tsx vers le moteur
// commun components/chapitre/ChapitreManuscrit.tsx, avec vérification
// article par article sur le texte de l'AUSCGIE révisé (art. 385-410,
// 414-461, 462-515, 516-561, 690-693, 694-734, 744-778-15, 824,
// 853-1 à 853-23, plus art. 142-146, 157-159 et 251).
// Corrections majeures apportées à cette occasion : l'AUSCGIE ne connaît
// que DEUX modes d'administration de la SA (art. 414 : conseil
// d'administration / administrateur général) - la structure « Directoire +
// Conseil de surveillance » de l'ancienne page n'existe pas en droit
// OHADA ; la SA peut ne comprendre qu'un seul actionnaire (art. 385) ; le
// nominal des actions est librement fixé (art. 750) ; les actions de
// préférence sans droit de vote sont plafonnées à la moitié du capital,
// au quart pour les sociétés cotées (art. 778-1) ; l'expertise de gestion
// s'ouvre à un dixième du capital (art. 159) ; la transformation en SNC
// exige l'unanimité en vertu de l'art. 692 ; la prescription de l'action
// en nullité relève de l'art. 251 ; le capital minimum avec appel public
// à l'épargne relève de l'art. 824 ; le CAC de la SAS suppose deux des
// trois seuils de l'art. 853-13.
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1', question: "Quel est le capital minimum requis pour une SA dont les titres sont cotés en bourse ou qui fait publiquement appel à l'épargne ?",
    options: [
      { id: 'a', texte: '10 000 000 FCFA' },
      { id: 'b', texte: '50 000 000 FCFA' },
      { id: 'c', texte: '100 000 000 FCFA' },
      { id: 'd', texte: '1 000 000 FCFA' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 824 AUSCGIE',
    explication: "L'Art. 387 fixe le capital minimum de la SA à 10 000 000 FCFA. Pour la société dont les titres sont inscrits à la bourse des valeurs d'un ou plusieurs États parties ou qui fait publiquement appel à l'épargne, l'Art. 824 le porte à 100 000 000 FCFA ; en cas d'inobservation, tout intéressé peut demander en justice la dissolution, qui ne peut être prononcée si la régularisation est intervenue au jour où le juge statue.",
  },
  {
    id: 'q2', question: "Combien d'actionnaires une SA doit-elle compter au minimum ?",
    options: [
      { id: 'a', texte: '7 actionnaires' },
      { id: 'b', texte: '2 actionnaires' },
      { id: 'c', texte: "1 seul : la SA peut ne comprendre qu'un seul actionnaire (Art. 385)" },
      { id: 'd', texte: '3 actionnaires' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 385 AUSCGIE',
    explication: "L'Art. 385 al. 2 AUSCGIE dispose expressément que « la société anonyme peut ne comprendre qu'un seul actionnaire ». La SA unipersonnelle est donc admise : les décisions relevant des assemblées y sont prises par l'actionnaire unique (Art. 558).",
  },
  {
    id: 'q3', question: "Dans quelle proportion les actions de numéraire doivent-elles être libérées à la souscription lors de la constitution d'une SA ?",
    options: [
      { id: 'a', texte: 'La totalité' },
      { id: 'b', texte: 'La moitié au minimum' },
      { id: 'c', texte: 'Le quart au minimum' },
      { id: 'd', texte: 'Un dixième au minimum' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 389 AUSCGIE',
    explication: "L'Art. 389 impose une libération d'au moins un quart (1/4) de la valeur nominale à la souscription. Le solde est libéré dans un délai maximum de 3 ans à compter de l'immatriculation. Tant que le capital n'est pas entièrement libéré, la société ne peut ni augmenter son capital en numéraire ni émettre d'obligations.",
  },
  {
    id: 'q4', question: "Comment le montant nominal des actions d'une SA est-il fixé ?",
    options: [
      { id: 'a', texte: 'Minimum légal de 10 000 FCFA par action' },
      { id: 'b', texte: 'Minimum légal de 5 000 FCFA par action' },
      { id: 'c', texte: 'Librement par les statuts, exprimé en nombre entier (Art. 750)' },
      { id: 'd', texte: 'Par le greffe lors de l\'immatriculation' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 750 AUSCGIE',
    explication: "Depuis la révision de 2014, le montant nominal des actions est librement fixé par les statuts et simplement exprimé en nombre entier (Art. 750, règle énoncée aussi à l'Art. 387 al. 2). Il n'existe plus de valeur nominale minimale imposée.",
  },
  {
    id: 'q5', question: "Quelle proportion maximale du capital les actions de préférence SANS droit de vote peuvent-elles représenter ?",
    options: [
      { id: 'a', texte: 'La moitié du capital ; le quart dans les sociétés cotées (Art. 778-1)' },
      { id: 'b', texte: 'Le tiers du capital dans tous les cas' },
      { id: 'c', texte: 'Le quart du capital dans tous les cas' },
      { id: 'd', texte: 'Le dixième du capital' },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 778-1 AUSCGIE',
    explication: "L'Art. 778-1 AUSCGIE plafonne les actions de préférence sans droit de vote à la moitié du capital social et, dans les sociétés dont les actions sont admises aux négociations sur une bourse des valeurs, au quart du capital. Toute émission portant la proportion au-delà de cette limite peut être annulée.",
  },
  {
    id: 'q6', question: "Combien d'administrateurs le conseil d'administration d'une SA peut-il compter au maximum, hors fusion ?",
    options: [
      { id: 'a', texte: '6 administrateurs' },
      { id: 'b', texte: '9 administrateurs' },
      { id: 'c', texte: '12 administrateurs' },
      { id: 'd', texte: '15 administrateurs' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 416 AUSCGIE',
    explication: "L'Art. 416 fixe le conseil d'administration entre 3 et 12 membres, actionnaires ou non. En cas de fusion, l'Art. 418 permet un dépassement provisoire jusqu'à concurrence du nombre total des administrateurs en fonction depuis plus de six mois dans les sociétés fusionnées, sans pouvoir être supérieur à 24 - aucune nouvelle nomination n'étant possible tant que l'effectif n'est pas revenu à 12.",
  },
  {
    id: 'q7', question: "Quelle structure de gouvernance est réservée aux SA comptant au plus 3 actionnaires ?",
    options: [
      { id: 'a', texte: 'SA avec conseil d\'administration et PDG' },
      { id: 'b', texte: 'SA avec directoire' },
      { id: 'c', texte: "SA avec administrateur général (Art. 494)" },
      { id: 'd', texte: 'SA avec président distinct du DG' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 494 AUSCGIE',
    explication: "L'Art. 494 AUSCGIE permet aux SA comprenant un nombre d'actionnaires égal ou inférieur à trois de ne pas constituer de conseil d'administration et de désigner un administrateur général qui assume, sous sa responsabilité, les fonctions d'administration et de direction. C'est la forme simplifiée de la SA fermée.",
  },
  {
    id: 'q8', question: "Quel est le quorum requis en première convocation pour une assemblée générale extraordinaire (AGE) ?",
    options: [
      { id: 'a', texte: 'Aucun quorum requis' },
      { id: 'b', texte: 'Le quart des actions' },
      { id: 'c', texte: 'La moitié des actions' },
      { id: 'd', texte: 'Les deux tiers des actions' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 553 AUSCGIE',
    explication: "L'Art. 553 exige en AGE, sur première convocation, que les actionnaires présents ou représentés possèdent au moins la moitié des actions ; sur deuxième convocation, le quart. À défaut, une troisième convocation est possible dans les deux mois, le quorum restant fixé au quart.",
  },
  {
    id: 'q9', question: "Quelle majorité est requise pour voter une résolution en AGE ?",
    options: [
      { id: 'a', texte: 'Majorité simple (50% + 1)' },
      { id: 'b', texte: 'Majorité absolue' },
      { id: 'c', texte: 'Majorité des deux tiers des voix exprimées (Art. 554)' },
      { id: 'd', texte: 'Unanimité obligatoire' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 554 AUSCGIE',
    explication: "L'Art. 554 exige la majorité des deux tiers des voix exprimées, sans tenir compte des bulletins blancs. Deux exceptions notables : le transfert du siège sur le territoire d'un autre État se décide à l'unanimité des membres présents ou représentés (Art. 554 al. 3), et la transformation de la SA en SNC exige l'unanimité des actionnaires (Art. 692).",
  },
  {
    id: 'q10', question: "Pour combien d'exercices le commissaire aux comptes nommé par l'AGO exerce-t-il ses fonctions dans une SA ?",
    options: [
      { id: 'a', texte: '2 exercices' },
      { id: 'b', texte: '3 exercices' },
      { id: 'c', texte: '5 exercices' },
      { id: 'd', texte: '6 exercices' },
    ],
    reponseCorrecte: 'd', articleRef: 'Art. 704 AUSCGIE',
    explication: "L'Art. 704 distingue : le commissaire aux comptes désigné dans les statuts ou par l'assemblée générale constitutive exerce pendant 2 exercices sociaux ; celui désigné par l'assemblée générale ordinaire exerce durant 6 exercices sociaux. Toute SA sans appel public à l'épargne doit avoir un titulaire et un suppléant ; avec appel public à l'épargne, au moins deux de chaque (Art. 702).",
  },
  {
    id: 'q11', question: "La SAS peut-elle faire appel public à l'épargne (APE) ?",
    options: [
      { id: 'a', texte: 'Oui, sans restriction' },
      { id: 'b', texte: 'Oui, avec autorisation de la bourse régionale' },
      { id: 'c', texte: "Non, l'APE lui est interdit (Art. 853-4)" },
      { id: 'd', texte: 'Oui, si le capital dépasse 100 millions FCFA' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 853-4 AUSCGIE',
    explication: "L'Art. 853-4 AUSCGIE dispose que la société par actions simplifiée ne peut faire publiquement appel à l'épargne. C'est une restriction fondamentale qui la distingue de la SA.",
  },
  {
    id: 'q12', question: "Quel est le seul organe que la SAS doit obligatoirement avoir ?",
    options: [
      { id: 'a', texte: "Le conseil d'administration" },
      { id: 'b', texte: 'Le directoire' },
      { id: 'c', texte: 'Le président (Art. 853-8)' },
      { id: 'd', texte: 'Le commissaire aux comptes' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 853-8 AUSCGIE',
    explication: "L'Art. 853-8 AUSCGIE dispose que la société est représentée à l'égard des tiers par un président désigné dans les conditions prévues par les statuts, investi des pouvoirs les plus étendus dans la limite de l'objet social. Les statuts fixent librement les conditions dans lesquelles la société est dirigée (Art. 853-7) et peuvent instituer des directeurs généraux ou directeurs généraux adjoints.",
  },
  {
    id: 'q13', question: "Un actionnaire peut-il consulter les documents soumis à l'AGO annuelle avant sa tenue ? Si oui, quand ?",
    options: [
      { id: 'a', texte: "Non, uniquement pendant l'assemblée" },
      { id: 'b', texte: "Oui, durant les 30 jours qui précèdent" },
      { id: 'c', texte: "Oui, durant les 15 jours qui précèdent l'assemblée (Art. 525)" },
      { id: 'd', texte: "Oui, durant les 8 jours qui précèdent" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 525 AUSCGIE',
    explication: "L'Art. 525 donne à tout actionnaire le droit de prendre connaissance au siège social, durant les quinze jours précédant l'AGO annuelle, de l'inventaire, des états financiers de synthèse, des rapports du CAC et du conseil ou de l'administrateur général, de la liste des actionnaires et du montant global certifié des rémunérations des 10 (ou 5) dirigeants et salariés les mieux rémunérés. Sauf pour l'inventaire, il peut en prendre copie à ses frais.",
  },
  {
    id: 'q14', question: "Quelle fraction du capital faut-il détenir pour demander en justice une expertise de gestion ?",
    options: [
      { id: 'a', texte: 'Le dixième du capital social (Art. 159)' },
      { id: 'b', texte: 'Le cinquième du capital (20%)' },
      { id: 'c', texte: 'Le quart du capital (25%)' },
      { id: 'd', texte: 'La moitié du capital' },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 159 AUSCGIE',
    explication: "L'Art. 159 AUSCGIE permet à un ou plusieurs associés représentant au moins le dixième du capital social, individuellement ou en se groupant, de demander à la juridiction compétente du siège social, statuant à bref délai, la désignation d'un ou plusieurs experts chargés de présenter un rapport sur une ou plusieurs opérations de gestion.",
  },
  {
    id: 'q15', question: "Quel est le délai de prescription de l'action en nullité d'une délibération d'assemblée générale ?",
    options: [
      { id: 'a', texte: '1 an' },
      { id: 'b', texte: '2 ans' },
      { id: 'c', texte: '3 ans à compter du jour où la nullité est encourue (Art. 251)' },
      { id: 'd', texte: '5 ans' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 251 AUSCGIE',
    explication: "L'Art. 251 AUSCGIE dispose que les actions en nullité des actes, décisions ou délibérations de la société se prescrivent par trois ans à compter du jour où la nullité est encourue, sauf si la nullité est fondée sur l'illicéité de l'objet social. L'action en nullité d'une fusion ou d'une scission se prescrit, elle, par six mois.",
  },
  {
    id: 'n1', question: "Quelle dotation l'AGO doit-elle obligatoirement prélever sur le bénéfice au titre de la réserve légale ?",
    options: [
      { id: 'a', texte: "Un dixième au moins du bénéfice, jusqu'à ce que la réserve atteigne le cinquième du capital social (Art. 546)" },
      { id: 'b', texte: 'Le quart du bénéfice, sans limite' },
      { id: 'c', texte: 'Aucune : la réserve légale est facultative en droit OHADA' },
      { id: 'd', texte: 'La moitié du bénéfice pendant les cinq premiers exercices' },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 546 AUSCGIE',
    explication: "L'Art. 546 2°) AUSCGIE impose, à peine de nullité de toute délibération contraire, une dotation égale à un dixième au moins du bénéfice de l'exercice (diminué, le cas échéant, des pertes antérieures) affectée à la réserve légale. Cette dotation cesse d'être obligatoire lorsque la réserve atteint le cinquième du montant du capital social.",
  },
  {
    id: 'n2', question: "Quelle fraction du capital permet à des actionnaires de faire inscrire un projet de résolution à l'ordre du jour d'une assemblée générale ?",
    options: [
      { id: 'a', texte: "5% si le capital est inférieur à 1 milliard FCFA ; 3% entre 1 et 2 milliards ; 0,50% au-delà (Art. 520)" },
      { id: 'b', texte: '25% du capital dans tous les cas' },
      { id: 'c', texte: 'La majorité du capital' },
      { id: 'd', texte: "Aucune : seul l'auteur de la convocation fixe l'ordre du jour, sans exception" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 520 AUSCGIE',
    explication: "L'Art. 520 AUSCGIE permet à un ou plusieurs actionnaires de requérir l'inscription d'un projet de résolution à l'ordre du jour lorsqu'ils représentent 5% du capital (capital < 1 milliard FCFA), 3% (capital entre 1 et 2 milliards) ou 0,50% (capital > 2 milliards). Le projet doit parvenir au siège 10 jours au moins avant l'assemblée, et les délibérations sont nulles s'il n'est pas soumis au vote (Art. 521).",
  },
  {
    id: 'n3', question: "Quand la SAS est-elle tenue de désigner un commissaire aux comptes ?",
    options: [
      { id: 'a', texte: "Dès qu'un seul des trois seuils légaux est dépassé" },
      { id: 'b', texte: "Lorsqu'elle remplit, à la clôture, DEUX des trois conditions : bilan > 125 M FCFA, CA > 250 M FCFA, effectif > 50 (Art. 853-13), ou lorsqu'elle contrôle ou est contrôlée par une autre société" },
      { id: 'c', texte: 'Jamais : le CAC est interdit dans la SAS' },
      { id: 'd', texte: 'Toujours, comme dans la SA' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 853-13 AUSCGIE',
    explication: "L'Art. 853-13 AUSCGIE impose au moins un commissaire aux comptes aux SAS qui remplissent, à la clôture de l'exercice, deux des trois conditions suivantes : total du bilan supérieur à 125 000 000 FCFA, chiffre d'affaires annuel supérieur à 250 000 000 FCFA, effectif permanent supérieur à 50 personnes - ainsi qu'aux SAS qui contrôlent ou sont contrôlées par une ou plusieurs sociétés. Même sous les seuils, la nomination peut être demandée en justice par des associés représentant au moins le dixième du capital.",
  },
  {
    id: 'n4', question: "À quelles conditions une clause d'inaliénabilité des actions d'une SA est-elle valable ?",
    options: [
      { id: 'a', texte: "Durée inférieure ou égale à 10 ans ET justification par un motif sérieux et légitime (Art. 765-1)" },
      { id: 'b', texte: 'Durée maximale de 5 ans, sans autre condition' },
      { id: 'c', texte: "Elle est toujours interdite dans la SA" },
      { id: 'd', texte: 'Elle est valable sans limite de durée si tous les actionnaires l\'acceptent' },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 765-1 AUSCGIE',
    explication: "L'Art. 765-1 AUSCGIE ne valide les clauses d'inaliénabilité que si elles prévoient une interdiction d'une durée inférieure ou égale à dix ans ET si elles sont justifiées par un motif sérieux et légitime. Toute cession réalisée en violation d'une clause statutaire d'inaliénabilité est nulle (Art. 765-2). Aucune limitation ne peut jouer en cas de succession, de liquidation de communauté entre époux ou de cession au conjoint, à un ascendant ou à un descendant (Art. 765 al. 2).",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '4.1',
    titre: 'Définition et constitution de la SA (Art. 385-410)',
    navLabel: '4.1 Définition et constitution',
    blocs: [
      { type: 'paragraphe', texte: "La **société anonyme (SA)** est celle dans laquelle les actionnaires ne sont responsables des dettes sociales qu'à concurrence de leurs apports et dont les droits sont représentés par des **actions** (Art. 385). Deux traits la singularisent : elle **peut ne comprendre qu'un seul actionnaire** (Art. 385 al. 2), et elle est la seule forme sociale autorisée à faire **appel public à l'épargne**. Sa dénomination est précédée ou suivie des mots *« société anonyme »* ou du sigle *« S.A. »* et du mode d'administration choisi (Art. 386)." },
      { type: 'carte', titre: 'Conditions de constitution', tableau: { entetes: ['Critère', 'Règle', 'Article'], lignes: [
        ["Nombre d'actionnaires", '1 ou plusieurs - la SA unipersonnelle est admise', 'Art. 385'],
        ['Capital minimum', '10 000 000 FCFA ; 100 000 000 FCFA si les titres sont cotés ou placés dans le public', 'Art. 387, 824'],
        ['Nominal des actions', 'Librement fixé par les statuts, exprimé en nombre entier', 'Art. 387, 750'],
        ['Souscription', 'Le capital doit être entièrement souscrit avant la signature des statuts', 'Art. 388'],
        ['Libération du numéraire', 'Quart au moins à la souscription ; solde dans les 3 ans de l\'immatriculation', 'Art. 389'],
        ['Actions non intégralement libérées', "Restent nominatives ; tant que le capital n'est pas libéré : ni augmentation en numéraire, ni émission d'obligations", 'Art. 389'],
        ['Apports en industrie', '**Interdits** - les actions ne peuvent les représenter', 'Art. 50-1, 389'],
      ] } },
      { type: 'filet', titre: 'Apports en nature et avantages particuliers (Art. 399-400, 408-409)', texte: "Les apports en nature sont libérés intégralement lors de la constitution (Art. 45). En SA, leur valeur et les avantages particuliers stipulés **doivent toujours être contrôlés par un commissaire aux apports**, choisi sur la liste des commissaires aux comptes et désigné à l'unanimité des futurs associés ou, à défaut, par la juridiction compétente (Art. 400). Chaque apport en nature fait l'objet d'un **vote spécial** de l'assemblée générale constitutive, l'apporteur ne prenant pas part au vote (Art. 408) ; l'assemblée ne peut réduire la valeur des apports qu'à l'unanimité des souscripteurs avec le consentement exprès de l'apporteur, et si la valeur retenue diffère de celle du commissaire aux apports, actionnaires et dirigeants sont **solidairement responsables de cette valeur à l'égard des tiers pendant cinq (5) ans** (Art. 409)." },
      { type: 'carte', titre: "L'assemblée générale constitutive (Art. 404-410)", liste: [
        "**Convocation** par les fondateurs après l'établissement de la déclaration notariée de souscription et de versement, adressée à chaque souscripteur 15 jours au moins avant l'assemblée (Art. 404).",
        "**Quorum** : moitié des actions sur première convocation, quart sur deuxième ; à défaut, l'assemblée se tient dans les deux mois avec le même quorum du quart (Art. 405).",
        "**Majorité** : deux tiers des voix des souscripteurs présents ou représentés, sans compter les bulletins blancs (Art. 406).",
        "**Missions** : constater la souscription intégrale et la libération régulière du capital, adopter les statuts (qu'elle ne peut modifier qu'à l'unanimité), nommer les premiers administrateurs ou l'administrateur général et le premier commissaire aux comptes, statuer sur les actes accomplis pour le compte de la société en formation, donner mandat pour les engagements antérieurs à l'immatriculation (Art. 410).",
      ], note: "Les fonds provenant des souscriptions en numéraire ne peuvent être retirés qu'après l'immatriculation au RCCM, sur présentation du certificat du greffier (Art. 398). Six mois après le versement, tout souscripteur peut demander en référé la nomination d'un administrateur chargé de restituer les fonds si la société n'est pas immatriculée." },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[2] },
    ],
  },
  {
    numero: '4.2',
    titre: 'Les actions : droits, négociabilité et limitations (Art. 744-778)',
    navLabel: '4.2 Les actions',
    blocs: [
      { type: 'paragraphe', texte: "L'**action** est le titre de capital émis par la SA. Les valeurs mobilières revêtent la forme de titres au porteur ou de titres nominatifs (Art. 745) et doivent être inscrites en compte au nom de leur propriétaire, leur propriété se transmettant par virement de compte à compte (Art. 744-1). L'action de numéraire reste **nominative jusqu'à son entière libération** (Art. 749), et le **montant nominal est librement fixé par les statuts**, en nombre entier (Art. 750). L'émission de parts bénéficiaires ou de parts de fondateur est interdite (Art. 744)." },
      { type: 'carte', titre: "Droits attachés à l'action", tableau: { entetes: ['Droit', 'Règle', 'Article'], lignes: [
        ['Droit de vote', "Proportionnel à la quotité de capital représentée ; chaque action donne droit à une voix au moins", 'Art. 751'],
        ['Vote double', "Possible, par les statuts ou une AGE, pour les actions nominatives entièrement libérées inscrites depuis au moins 2 ans au nom du même actionnaire", 'Art. 752'],
        ['Dividende', 'Proportionnel à la quotité de capital ; les statuts peuvent prévoir un premier dividende calculé comme un intérêt sur le montant libéré', 'Art. 754, 145'],
        ['Droit préférentiel de souscription', "Préférence proportionnelle à la souscription des augmentations de capital en numéraire ; négociable comme l'action ; ne peut être écarté que par l'AGE sur rapport motivé", 'Art. 757-758'],
        ['Mise en paiement des dividendes', "Dans un délai maximum de 9 mois après la clôture, sauf prorogation judiciaire ; tout dividende distribué hors bénéfice distribuable est fictif", 'Art. 144, 146'],
      ] } },
      { type: 'paragraphe', texte: "**Négociabilité.** Les actions ne sont négociables qu'après l'immatriculation de la société ou l'inscription modificative consécutive à une augmentation de capital (Art. 759) ; les actions de numéraire, qu'après leur entière libération (Art. 761). Elles demeurent négociables après la dissolution, jusqu'à la clôture de la liquidation (Art. 762). Lorsqu'elles ne sont pas négociables, elles restent **cessibles** selon les formalités classiques : écrit, puis signification, acceptation authentique ou dépôt au siège, et publicité au RCCM (Art. 763-1)." },
      { type: 'filet', titre: 'Limitations à la libre transmissibilité (Art. 764-771-3)', texte: "Le principe est la **libre transmissibilité** (Art. 764), mais les statuts ou les conventions extra-statutaires de l'Art. 2-1 peuvent l'aménager - jamais toutefois en cas de succession, de liquidation de communauté entre époux, ou de cession au conjoint, à un ascendant ou à un descendant (Art. 765). **Inaliénabilité** : durée ≤ 10 ans et motif sérieux et légitime exigés (Art. 765-1), la cession contraire étant nulle (Art. 765-2). **Agrément** (sociétés non cotées, cessions à des tiers) : conféré par le conseil d'administration ou l'AGO, il résulte aussi du silence gardé 3 mois (Art. 765-3, 768) ; en cas de refus, la société doit faire acquérir les actions dans les 3 mois - actionnaire, tiers ou rachat par elle-même - faute de quoi l'agrément est réputé donné (Art. 769-771). **Préemption** : le cédant notifie son projet aux bénéficiaires, qui peuvent se porter acquéreurs aux prix et conditions notifiés (Art. 771-2) ; la cession violant le droit de préemption statutaire est nulle (Art. 771-3)." },
      { type: 'paragraphe', texte: "**Défaut de libération (Art. 774-777).** Le solde non libéré est appelé par le conseil d'administration ou l'administrateur général dans la limite de 3 ans. À défaut de paiement, la société adresse une mise en demeure ; un mois après, restée sans effet, les actions cessent de donner droit au vote et sont déduites du quorum, le droit au dividende et le droit préférentiel de souscription sont suspendus, et la société poursuit la vente des titres. L'actionnaire défaillant, les cessionnaires successifs et les souscripteurs sont tenus **solidairement** du montant non libéré." },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[18] },
    ],
  },
  {
    numero: '4.3',
    titre: 'Les actions de préférence (Art. 778-1 à 778-15)',
    navLabel: '4.3 Actions de préférence',
    blocs: [
      { type: 'paragraphe', texte: "Introduites par la révision de 2014, les **actions de préférence** peuvent être créées lors de la constitution ou en cours de vie sociale, **avec ou sans droit de vote**, assorties de droits particuliers de toute nature, à titre temporaire ou permanent (Art. 778-1). Un droit de vote double peut leur être conféré ; le droit de vote peut aussi être aménagé pour un délai déterminé, suspendu ou supprimé. Elles servent à adapter le capital aux besoins de financement : dividende prioritaire, priorité de remboursement, droits renforcés d'information." },
      { type: 'filet', titre: 'Le double plafond des actions sans droit de vote (Art. 778-1)', texte: "Les actions de préférence **sans droit de vote** ne peuvent représenter **plus de la moitié du capital social** et, dans les sociétés dont les actions sont admises aux négociations sur une bourse des valeurs, **plus du quart du capital**. Toute émission ayant pour effet de porter la proportion au-delà de cette limite peut être annulée. Par ailleurs, les actions de préférence sans droit de vote à l'émission dotées d'un droit limité de participation aux dividendes, aux réserves ou au partage sont privées de droit préférentiel de souscription pour toute augmentation de capital en numéraire, sauf clause contraire des statuts." },
      { type: 'carte', titre: 'Création, conversion et rachat', liste: [
        "**Compétence exclusive de l'AGE** pour décider l'émission, le rachat et la conversion, au vu d'un rapport du conseil d'administration ou de l'administrateur général et d'un rapport spécial du commissaire aux comptes - toute délibération contraire est nulle (Art. 778-2).",
        "**Le rachat doit être expressément prévu dans les statuts avant l'émission** ; à défaut, la décision de rachat est nulle (Art. 778-2 al. 2).",
        "Les actions de préférence peuvent être **converties** en actions ordinaires ou en actions de préférence d'une autre catégorie (Art. 778-6) ; les créanciers peuvent former opposition si la conversion aboutit à une réduction de capital non motivée par des pertes.",
        "Lorsqu'elles sont émises au profit d'actionnaires nommément désignés, la procédure des **avantages particuliers** s'applique, avec commissaire aux apports (Art. 778-10).",
        "En cas de fusion ou de scission, elles sont échangées contre des actions comportant des droits particuliers équivalents ; à défaut, l'opération est soumise à l'approbation de l'**assemblée spéciale** de leurs porteurs (Art. 778-12, 555).",
        "Les porteurs, constitués en assemblée spéciale, peuvent charger un commissaire aux comptes d'un rapport spécial sur le respect de leurs droits particuliers, aux frais de la société (Art. 778-15).",
      ] },
      { type: 'controle', question: QCM[4] },
    ],
  },
  {
    numero: '4.4',
    titre: "L'administration de la SA : deux modes, trois formules (Art. 414-515)",
    navLabel: '4.4 Gouvernance',
    blocs: [
      { type: 'paragraphe', texte: "L'Art. 414 AUSCGIE impose aux statuts de choisir, de manière non équivoque, entre **deux modes d'administration** : la SA **avec conseil d'administration** et la SA **avec administrateur général**. La société peut changer de mode à tout moment par décision de l'AGE. Au sein du premier mode, la direction est assurée soit par un **président-directeur général**, soit par un **président du conseil d'administration et un directeur général** dissociés (Art. 415) - ce qui donne en pratique trois formules de gouvernance. Le droit OHADA ne connaît pas de structure « directoire et conseil de surveillance »." },
      { type: 'carte', titre: "Le conseil d'administration", tableau: { entetes: ['Paramètre', 'Règle', 'Article'], lignes: [
        ['Composition', '3 à 12 membres, actionnaires ou non ; en cas de fusion, dépassement provisoire possible jusqu\'à 24', 'Art. 416, 418'],
        ['Mandat', "6 ans au plus (nomination en cours de vie sociale), 2 ans au plus (désignation par les statuts ou l'AG constitutive) ; rééligibles sauf clause contraire", 'Art. 420, 424'],
        ['Personne morale administrateur', 'Admise, avec désignation d\'un représentant permanent soumis aux mêmes responsabilités', 'Art. 421'],
        ['Cumul', "Au plus 5 conseils d'administration de SA dans un même État partie ; démission d'un mandat sous 3 mois en cas d'infraction", 'Art. 425'],
        ['Attributions', "Détermine les orientations de l'activité et veille à leur mise en œuvre ; arrête les états financiers et le rapport de gestion ; clauses limitatives inopposables aux tiers de bonne foi", 'Art. 435, 452'],
        ['Réunions', "Aussi souvent que nécessaire ; le tiers des administrateurs peut convoquer le conseil s'il ne s'est pas réuni depuis plus de 2 mois", 'Art. 453'],
        ['Quorum et majorité', 'Moitié des membres présents ; majorité des présents ou représentés, voix du président de séance prépondérante sauf clause contraire ; visioconférence possible si les statuts le prévoient', 'Art. 454, 454-1'],
        ['Rémunération', "Indemnité de fonction fixée par l'AGO, répartie librement par le conseil ; rémunérations exceptionnelles pour missions avec rapport spécial du CAC", 'Art. 431-432'],
      ] } },
      { type: 'paragraphe', texte: "**Formule 1 - le PDG (Art. 462-469).** Nommé par le conseil parmi ses membres, obligatoirement personne physique, il préside le conseil et les assemblées, assure la direction générale et représente la société. Il est révocable à tout moment par le conseil. Un ou plusieurs **directeurs généraux adjoints** peuvent l'assister. **Formule 2 - président et directeur général dissociés (Art. 477-493).** Le président, personne physique choisie parmi les administrateurs, préside conseil et assemblées et veille à ce que le conseil assume le contrôle de la gestion confiée au **directeur général** - lequel peut être choisi hors du conseil, assure la direction générale et représente la société ; sa révocation sans juste motif peut donner lieu à dommages et intérêts (Art. 492). **Formule 3 - l'administrateur général (Art. 494-515).** Les SA d'au plus **3 actionnaires** peuvent ne pas constituer de conseil : un administrateur général cumule administration, direction générale et représentation ; il convoque et préside les assemblées ; l'AGO fixe sa rémunération et peut le révoquer à tout moment." },
      { type: 'filet', titre: 'Conventions réglementées et interdites (Art. 438-450)', texte: "Sont soumises à l'**autorisation préalable du conseil** les conventions entre la société et l'un de ses administrateurs, directeurs généraux ou DGA, ou un actionnaire détenant **10% ou plus** du capital, directement, indirectement ou par personne interposée (Art. 438) - hors opérations courantes conclues à des conditions normales (Art. 439). L'intéressé ne vote pas ; le commissaire aux comptes présente un rapport spécial à l'AGO, qui approuve ou désapprouve (Art. 440). Les cautionnements, avals et garanties donnés pour les engagements de tiers exigent l'autorisation préalable du conseil, valable un an au plus (Art. 449). Enfin, il est **interdit** aux administrateurs, DG et DGA (et à leurs conjoints, ascendants, descendants et personnes interposées) de contracter des emprunts auprès de la société, de s'y faire consentir un découvert ou de faire cautionner leurs engagements par elle, à peine de nullité (Art. 450)." },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[6] },
    ],
  },
  {
    numero: '4.5',
    titre: 'Assemblées générales et commissaire aux comptes (Art. 516-561, 694-734)',
    navLabel: '4.5 Assemblées et CAC',
    blocs: [
      { type: 'paragraphe', texte: "L'assemblée est convoquée par le conseil d'administration ou l'administrateur général ; à défaut, par le commissaire aux comptes, par un mandataire désigné en justice à la demande de tout intéressé en cas d'urgence ou d'actionnaires représentant **le dixième du capital**, ou par le liquidateur (Art. 516). L'avis de convocation parvient aux actionnaires **15 jours au moins** avant l'assemblée sur première convocation, 6 jours pour les suivantes (Art. 518). L'assemblée ne peut délibérer sur une question hors de l'ordre du jour - sauf pour révoquer et remplacer, en toutes circonstances, des administrateurs ou l'administrateur général (Art. 522). Des actionnaires représentant **5%, 3% ou 0,50% du capital** (selon que celui-ci est inférieur à 1 milliard, compris entre 1 et 2 milliards, ou supérieur à 2 milliards de FCFA) peuvent requérir l'inscription d'un projet de résolution (Art. 520)." },
      { type: 'carte', titre: 'AGO et AGE : compétences, quorums, majorités', tableau: { entetes: ['Critère', 'AGO', 'AGE'], lignes: [
        ['Compétences', "États financiers et affectation du résultat (réserve légale : 1/10 du bénéfice jusqu'à 1/5 du capital), nomination des administrateurs, de l'administrateur général et du CAC, conventions réglementées, émission d'obligations (Art. 546)", 'Modification des statuts, fusions, scissions, transformations, apports partiels d\'actif, transfert du siège, dissolution anticipée ou prorogation (Art. 551)'],
        ['Tenue', 'Au moins une fois par an, dans les 6 mois de la clôture (Art. 548)', 'Selon les besoins'],
        ['Quorum 1ère convocation', 'Quart des actions ayant droit de vote (Art. 549)', 'Moitié des actions (Art. 553)'],
        ['Quorum 2ème convocation', 'Aucun (Art. 549)', 'Quart des actions ; 3ème convocation possible dans les 2 mois, quorum maintenu au quart (Art. 553)'],
        ['Majorité', 'Majorité des voix exprimées, bulletins blancs non comptés (Art. 550)', 'Deux tiers des voix exprimées (Art. 554)'],
        ['Exceptions', '-', "Transfert du siège dans un autre État : unanimité des présents ou représentés (Art. 554) ; transformation en SNC : unanimité des actionnaires (Art. 692) ; nul engagement d'un actionnaire ne peut être augmenté au-delà de ses apports sans son accord (Art. 551)"],
      ] }, note: "Les délibérations prises en violation des règles de compétence, de quorum et de majorité des Art. 546 à 557 sont nulles (Art. 557-1). L'action en nullité des actes, décisions ou délibérations se prescrit par trois ans à compter du jour où la nullité est encourue (Art. 251)." },
      { type: 'paragraphe', texte: "**L'information de l'actionnaire.** Durant les **15 jours** précédant l'AGO annuelle, tout actionnaire prend connaissance au siège de l'inventaire, des états financiers, des rapports du CAC et du conseil, de la liste des actionnaires et du montant global certifié des rémunérations des 10 (ou 5) dirigeants et salariés les mieux rémunérés (Art. 525). **À toute époque**, il peut consulter et copier les documents sociaux des trois derniers exercices, les procès-verbaux des assemblées et les conventions réglementées (Art. 526). Deux fois par exercice, il peut poser des **questions écrites** sur tout fait de nature à compromettre la continuité de l'exploitation, auxquelles il est répondu par écrit dans les 15 jours, copie au CAC (Art. 158, 526). En cas de refus de communication, la juridiction compétente statue à bref délai et peut ordonner la communication **sous astreinte** (Art. 528). Enfin, des associés représentant au moins **le dixième du capital** peuvent demander en justice une **expertise de gestion** sur une ou plusieurs opérations (Art. 159)." },
      { type: 'filet', titre: 'Le commissaire aux comptes de la SA (Art. 694-734)', texte: "Le contrôle est exercé dans **chaque** SA par un ou plusieurs commissaires aux comptes, experts-comptables inscrits (Art. 694-695). Les SA sans appel public à l'épargne désignent **un titulaire et un suppléant** ; celles faisant appel public à l'épargne, **deux titulaires et deux suppléants au moins** (Art. 702). Durée : **2 exercices** pour le premier CAC statutaire, **6 exercices** en cas de nomination par l'AGO (Art. 704). Sa mission permanente exclut toute immixtion dans la gestion : il certifie que les états financiers sont réguliers et sincères et donnent une image fidèle (Art. 710-712), vérifie la concordance du rapport de gestion (Art. 713), s'assure du respect de l'égalité entre actionnaires (Art. 714), signale les irrégularités à l'assemblée et **révèle au ministère public les faits délictueux** dont il a connaissance, sans engager sa responsabilité par cette révélation (Art. 716). Des actionnaires représentant le dixième du capital peuvent demander en justice sa **récusation** (dans les 30 jours de sa désignation) ou sa **révocation** pour faute ou empêchement (Art. 730-731)." },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[16] },
    ],
  },
  {
    numero: '4.6',
    titre: 'La société par actions simplifiée - SAS (Art. 853-1 à 853-23)',
    navLabel: '4.6 La SAS',
    blocs: [
      { type: 'paragraphe', texte: "Créée par la révision de 2014, la **SAS** est instituée par **un ou plusieurs associés** - la forme unipersonnelle prend le nom de **SASU** (Art. 853-1, 853-2). Ses statuts prévoient **librement l'organisation et le fonctionnement** de la société, sous réserve des règles impératives du livre qui lui est consacré ; les associés n'y répondent des dettes qu'à concurrence de leurs apports. Les règles de la SA lui sont applicables par renvoi, dans la mesure de leur compatibilité, **à l'exception** des articles 387 alinéa 1er (capital minimum), 414 à 561 (administration et assemblées), 690 et 751 à 753 (Art. 853-3)." },
      { type: 'carte', titre: 'Traits distinctifs de la SAS', tableau: { entetes: ['Caractéristique', 'Règle SAS', 'Article'], lignes: [
        ['Capital et nominal', 'Fixés librement par les statuts - aucun minimum légal', 'Art. 853-5'],
        ["Nombre d'associés", '1 ou plusieurs (SASU admise)', 'Art. 853-1'],
        ['Appel public à l\'épargne', '**Interdit**', 'Art. 853-4'],
        ['Organe obligatoire', "Un président, qui représente la société à l'égard des tiers, investi des pouvoirs les plus étendus ; les clauses limitant ses pouvoirs sont inopposables aux tiers", 'Art. 853-8'],
        ['Direction', 'Les statuts fixent librement les conditions de direction ; directeurs généraux et DGA possibles', 'Art. 853-7, 853-8'],
        ["Apports en industrie", "Possibles : actions inaliénables dont les statuts fixent les modalités de souscription et de répartition", 'Art. 853-5'],
        ['Transformation en SAS / fusion-absorption par une SAS', "Décidées à l'**unanimité** des associés, à peine de nullité", 'Art. 853-6'],
        ['Droit de vote', 'Chaque action donne droit à une voix au moins', 'Art. 853-12'],
      ] } },
      { type: 'paragraphe', texte: "**Décisions collectives (Art. 853-11).** Les statuts déterminent les décisions à prendre collectivement et leurs formes. Sont toutefois obligatoirement exercées collectivement, à peine de nullité, les attributions relevant en SA des assemblées : augmentation, amortissement ou réduction du capital, fusion, scission, apport partiel d'actif, dissolution, transformation, nomination des commissaires aux comptes, comptes annuels et bénéfices. Dans la SASU, l'associé unique approuve les comptes dans les six mois de la clôture, ses décisions étant répertoriées dans un registre spécial. **Conventions réglementées (Art. 853-14 à 853-16)** : rapport du CAC (ou du président) sur les conventions avec le président, un dirigeant, un associé à plus de 10% des droits de vote ou la société contrôlante ; conventions d'emprunt, découvert et cautionnement **interdites** au président et aux dirigeants personnes physiques." },
      { type: 'filet', titre: "Le commissaire aux comptes de la SAS (Art. 853-13)", texte: "La désignation d'au moins un commissaire aux comptes s'impose aux SAS qui remplissent, à la clôture de l'exercice, **deux des trois conditions** suivantes : total du bilan supérieur à **125 000 000 FCFA**, chiffre d'affaires annuel supérieur à **250 000 000 FCFA**, effectif permanent supérieur à **50 personnes** - l'obligation cessant après deux exercices sous les seuils. Elle s'impose aussi aux SAS qui **contrôlent ou sont contrôlées** par une ou plusieurs sociétés. Même sous les seuils, la nomination peut être demandée en justice par un ou plusieurs associés représentant au moins **le dixième du capital**." },
      { type: 'carte', titre: 'Clauses statutaires d\'actionnariat (Art. 853-17 à 853-23)', tableau: { entetes: ['Clause', 'Règle', 'Article'], lignes: [
        ['Inaliénabilité', "Interdiction de céder les actions pour une durée n'excédant pas 10 ans", 'Art. 853-17'],
        ['Agrément et préemption', "Toute cession peut être soumise à l'agrément préalable de la société et à un droit de préemption, dans les conditions statutaires", 'Art. 853-18'],
        ['Exclusion', "Un associé peut être tenu de céder ses actions ; ses droits non pécuniaires peuvent être suspendus tant qu'il n'y a pas procédé", 'Art. 853-19'],
        ['Changement de contrôle d\'une société associée', "Obligation d'information ; suspension des droits non pécuniaires et exclusion possibles", 'Art. 853-20'],
        ['Sanction', 'Toute cession en violation de ces clauses est **nulle**', 'Art. 853-19-1'],
        ['Prix', "À défaut de modalités statutaires : accord des parties ou expert ; les actions rachetées par la société sont cédées dans les 6 mois ou annulées", 'Art. 853-21'],
        ['Adoption et modification', "À l'**unanimité** des associés, à peine de nullité ; clauses inapplicables aux SAS unipersonnelles", 'Art. 853-22, 853-23'],
      ] } },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[17] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: "Constitution d'une SA au Cameroun",
    contexte: "La famille MBEKI souhaite constituer une Société Anonyme pour exploiter une chaîne de supermarchés au Cameroun. Ils sont 4 associés et envisagent un capital de 50 000 000 FCFA, dont 20 000 000 FCFA d'apports en nature (véhicules et mobilier). Les apports en numéraire seront libérés à hauteur du minimum légal à la constitution. La société ne fera pas appel public à l'épargne.",
    questions: [
      { num: 1, enonce: "La SA peut-elle être valablement constituée avec 4 associés et ce capital ?", correction: "Oui. La SA peut être constituée par un ou plusieurs actionnaires - elle peut même ne comprendre qu'un seul actionnaire (Art. 385 al. 2) - donc 4 associés conviennent. Le capital de 50 000 000 FCFA dépasse le minimum de 10 000 000 FCFA applicable aux SA ne faisant pas appel public à l'épargne (Art. 387), et il devra être entièrement souscrit avant la signature des statuts (Art. 388)." },
      { num: 2, enonce: "Calculer le montant minimum à libérer en numéraire à la constitution.", correction: "Apports en numéraire = 50 000 000 − 20 000 000 = 30 000 000 FCFA. L'Art. 389 exige la libération d'un quart au moins de la valeur nominale à la souscription : 30 000 000 × 1/4 = 7 500 000 FCFA. Le solde de 22 500 000 FCFA sera appelé par le conseil d'administration ou l'administrateur général dans un délai maximum de 3 ans à compter de l'immatriculation. Tant que le capital n'est pas entièrement libéré, la société ne pourra ni augmenter son capital en numéraire ni émettre d'obligations (Art. 389)." },
      { num: 3, enonce: "Les apports en nature sont-ils soumis à une procédure particulière ?", correction: "Oui. Les apports en nature sont libérés intégralement dès la constitution (Art. 45) et, en SA, leur valeur doit toujours être contrôlée par un commissaire aux apports, choisi sur la liste des commissaires aux comptes et désigné à l'unanimité des futurs associés ou, à défaut, par la juridiction compétente (Art. 400). Chaque apport en nature fait ensuite l'objet d'un vote spécial de l'assemblée générale constitutive, l'apporteur ne votant pas et ses actions n'étant pas comptées pour le quorum ni la majorité (Art. 408)." },
      { num: 4, enonce: "Quelles sont les formalités de constitution obligatoires ?", correction: "(1) Établissement des statuts et souscription intégrale du capital (Art. 388) ; (2) dépôt des fonds et déclaration notariée de souscription et de versement ; (3) rapport du commissaire aux apports pour les apports en nature (Art. 400) ; (4) assemblée générale constitutive - convoquée 15 jours à l'avance, quorum de la moitié puis du quart des actions, majorité des deux tiers - qui constate la souscription et la libération, statue sur chaque apport en nature, adopte les statuts et nomme les premiers dirigeants et le premier commissaire aux comptes (Art. 404-410) ; (5) immatriculation au RCCM, qui confère la personnalité juridique (Art. 98). Les fonds ne peuvent être retirés qu'après l'immatriculation, sur certificat du greffier (Art. 398)." },
    ],
  },
  {
    id: 'cp2',
    titre: 'Actions et cessions dans une SA',
    contexte: "La SA COTON-EXPORT, non cotée, a un capital de 200 000 000 FCFA divisé en 20 000 actions de 10 000 FCFA chacune. Les statuts prévoient une clause d'agrément et une clause de préemption. M. DIALLO, actionnaire détenant 3 000 actions, souhaite céder 1 000 actions à un tiers extérieur. Par ailleurs, l'AGE envisage de créer 2 000 actions de préférence sans droit de vote.",
    questions: [
      { num: 1, enonce: "La cession de M. DIALLO est-elle libre ou soumise à des restrictions ?", correction: "Les actions sont en principe librement transmissibles (Art. 764), mais les statuts peuvent limiter la transmission (Art. 765). La clause d'agrément - permise dans les sociétés non cotées pour les transmissions à des tiers (Art. 765-3) - oblige M. DIALLO à adresser une demande d'agrément indiquant l'identité du cessionnaire, le nombre d'actions et le prix offert (Art. 767) ; l'agrément résulte d'une notification ou du silence gardé trois mois (Art. 768), et en cas de refus, la société doit faire acquérir les actions dans les trois mois par un actionnaire, un tiers ou elle-même, faute de quoi l'agrément est réputé donné (Art. 769-771). La clause de préemption oblige en outre à notifier le projet aux bénéficiaires, qui peuvent se porter acquéreurs aux prix et conditions notifiés (Art. 771-2) ; toute cession violant le droit de préemption statutaire est nulle (Art. 771-3)." },
      { num: 2, enonce: "La création de 2 000 actions de préférence sans droit de vote est-elle possible ? Dans quelle limite ?", correction: "Oui. Les actions de préférence sans droit de vote ne peuvent représenter plus de la moitié du capital social - le quart seulement dans les sociétés cotées (Art. 778-1). COTON-EXPORT n'étant pas cotée, le plafond est de 10 000 actions (la moitié de 20 000) : la création de 2 000 actions (10% du capital) est largement en dessous. La décision relève de la seule AGE, au vu d'un rapport du conseil d'administration et d'un rapport spécial du commissaire aux comptes (Art. 778-2)." },
      { num: 3, enonce: "Quels sont les droits des porteurs de ces actions de préférence ?", correction: "Les droits particuliers - par exemple un dividende prioritaire - sont définis par les statuts (Art. 778-1). En contrepartie de l'absence de droit de vote, la loi prévoit que celles de ces actions qui n'ont qu'un droit limité de participation aux dividendes, aux réserves ou au partage sont privées de droit préférentiel de souscription pour les augmentations de capital en numéraire, sauf clause contraire des statuts (Art. 778-1 dernier al.). Réunis en assemblée spéciale, les porteurs approuvent toute modification des droits de leur catégorie (Art. 555) et peuvent charger un commissaire aux comptes d'un rapport spécial sur le respect de leurs droits, aux frais de la société (Art. 778-15)." },
    ],
  },
  {
    id: 'cp3',
    titre: 'Choix du mode de gouvernance',
    contexte: "Trois entrepreneurs (A, B, C) veulent créer une SA au Sénégal. A souhaite une structure légère car ils ne sont que 3. B préfère une séparation nette entre la présidence du conseil et la direction opérationnelle. C propose un modèle classique avec un dirigeant unique à la tête du conseil d'administration. Analysez les options offertes par l'AUSCGIE.",
    questions: [
      { num: 1, enonce: "Quelle structure correspond au choix de A ?", correction: "La SA avec administrateur général (Art. 494) : les SA comprenant un nombre d'actionnaires égal ou inférieur à trois ont la faculté de ne pas constituer de conseil d'administration et de désigner un administrateur général qui assume, sous sa responsabilité, l'administration et la direction de la société, convoque et préside les assemblées (Art. 498). Avec exactement 3 actionnaires, la condition est remplie. Un administrateur général adjoint peut l'assister (Art. 510)." },
      { num: 2, enonce: "Quelle structure correspond au choix de B ?", correction: "La SA avec conseil d'administration dirigée par un président du conseil d'administration et un directeur général distincts (Art. 415, 477-493). Le président - personne physique choisie parmi les administrateurs - préside conseil et assemblées et veille à ce que le conseil assume le contrôle de la gestion confiée au directeur général (Art. 480) ; le directeur général, qui peut être choisi hors du conseil, assure la direction générale et représente la société (Art. 485, 487). À noter : l'AUSCGIE ne connaît pas la structure « directoire et conseil de surveillance » - la dissociation président/DG est la formule OHADA de séparation des fonctions." },
      { num: 3, enonce: "Quelle structure correspond au choix de C ?", correction: "La SA avec conseil d'administration dirigée par un président-directeur général (Art. 415, 462) : le PDG, nommé par le conseil parmi ses membres et obligatoirement personne physique, cumule la présidence du conseil et des assemblées, la direction générale et la représentation de la société (Art. 465). Le conseil compte 3 à 12 administrateurs (Art. 416), le mandat du PDG ne pouvant excéder son mandat d'administrateur (Art. 463). C'est la structure la plus répandue en zone OHADA." },
    ],
  },
  {
    id: 'cp4',
    titre: "Assemblées générales d'une SA",
    contexte: "La SA AGRO-IVOIRE doit tenir deux assemblées : une AGO pour approuver les comptes de l'exercice N et distribuer des dividendes, et une AGE pour modifier l'objet social et augmenter le capital. Le capital est réparti entre 50 actionnaires. Lors de la 1ère convocation de l'AGO, des actionnaires représentant seulement 40% du capital sont présents. À l'AGE (1ère convocation), des actionnaires représentant 48% du capital sont présents.",
    questions: [
      { num: 1, enonce: "L'AGO peut-elle valablement délibérer en 1ère convocation ?", correction: "Oui. L'Art. 549 exige, sur première convocation, que les actionnaires présents ou représentés possèdent au moins le quart des actions ayant droit de vote. Avec 40% > 25%, le quorum est atteint : l'AGO délibère valablement, à la majorité des voix exprimées, bulletins blancs non comptés (Art. 550). Sur deuxième convocation, aucun quorum n'aurait été requis." },
      { num: 2, enonce: "L'AGE peut-elle valablement délibérer en 1ère convocation ?", correction: "Non. L'Art. 553 exige, sur première convocation, la moitié au moins des actions : 48% < 50%, le quorum n'est pas atteint. Sur deuxième convocation, l'AGE délibère avec le quart des actions ; si ce quorum n'est pas davantage réuni, une troisième convocation est possible dans un délai maximal de deux mois à compter de la deuxième, le quorum restant fixé au quart." },
      { num: 3, enonce: "Quelle majorité est requise pour voter la modification de l'objet social en AGE ?", correction: "La majorité des deux tiers des voix exprimées (Art. 554), les bulletins blancs n'étant pas comptés. Par exemple, sur 60 voix exprimées, il faut au moins 40 voix favorables. Les délibérations prises en violation des règles de quorum et de majorité sont nulles (Art. 557-1)." },
    ],
  },
  {
    id: 'cp5',
    titre: 'La SAS et ses caractéristiques',
    contexte: "M. KAMARA, entrepreneur ivoirien, veut créer seul une société pour son activité de conseil en stratégie. Il souhaite une grande liberté dans l'organisation de la gouvernance, ne pas avoir de capital minimum imposé, mais ne pas faire appel à des investisseurs publics. Son avocat lui propose la SAS.",
    questions: [
      { num: 1, enonce: "M. KAMARA peut-il créer seul une SAS ?", correction: "Oui. L'Art. 853-1 institue la SAS par un ou plusieurs associés : lorsqu'elle ne comporte qu'une seule personne, celle-ci est dénommée « associé unique » et la société prend la dénomination de société par actions simplifiée unipersonnelle - SASU (Art. 853-2). L'associé unique exerce seul les pouvoirs dévolus aux associés ; ses décisions sont répertoriées dans un registre spécial, et celles qui donneraient lieu à publicité si elles étaient prises par une assemblée sont publiées dans les mêmes formes (Art. 853-1, 853-11)." },
      { num: 2, enonce: "Quel est le capital minimum requis pour la SAS ?", correction: "Aucun. L'Art. 853-5 dispose que le montant du capital social ainsi que celui du nominal des actions sont fixés par les statuts, et l'Art. 853-3 écarte expressément l'article 387 alinéa 1er (capital minimum de la SA) du renvoi général aux règles de la SA. Une SAS de conseil peut donc se constituer avec un capital symbolique." },
      { num: 3, enonce: "Quels sont les risques si les statuts de la SAS limitent trop les pouvoirs du Président ?", correction: "Les limitations seront sans effet à l'égard des tiers : l'Art. 853-8 dispose que les clauses des statuts et les décisions des organes sociaux limitant les pouvoirs du président, du directeur général ou du directeur général adjoint sont inopposables aux tiers. Même si les statuts exigent l'accord des associés pour certains actes, la société est engagée par les actes du président - y compris ceux qui ne relèvent pas de l'objet social, dans les conditions de l'article 122." },
      { num: 4, enonce: "Quand la SAS est-elle obligée de nommer un CAC ?", correction: "Lorsqu'elle remplit, à la clôture de l'exercice, deux des trois conditions de l'Art. 853-13 : total du bilan supérieur à 125 000 000 FCFA, chiffre d'affaires annuel supérieur à 250 000 000 FCFA, effectif permanent supérieur à 50 personnes - et non un seul seuil. L'obligation vaut aussi pour les SAS qui contrôlent ou sont contrôlées par d'autres sociétés. Sous les seuils, la nomination reste facultative, mais peut être demandée en justice par un ou plusieurs associés représentant au moins le dixième du capital." },
    ],
  },
  {
    id: 'cp6',
    titre: 'Droits des actionnaires et protection minoritaire',
    contexte: "Dans la SA MINES-AFRIQUE, M. OUEDRAOGO détient 22% du capital. Il suspecte que le Directeur Général a signé des contrats désavantageux pour la société au bénéfice d'entreprises liées. M. OUEDRAOGO souhaite agir. Par ailleurs, une décision d'AGO lui semble irrégulière car les formalités de convocation n'ont pas été respectées.",
    questions: [
      { num: 1, enonce: "M. OUEDRAOGO peut-il demander une expertise de gestion ? Sur quel fondement ?", correction: "Oui. L'Art. 159 AUSCGIE permet à un ou plusieurs associés représentant au moins le dixième du capital social de demander à la juridiction compétente du siège social, statuant à bref délai, la désignation d'un ou plusieurs experts chargés de présenter un rapport sur une ou plusieurs opérations de gestion. Avec 22% > 10%, M. OUEDRAOGO remplit largement la condition. Si les contrats ont été conclus avec des entreprises liées au DG, la procédure des conventions réglementées (autorisation préalable du conseil, rapport spécial du CAC, vote de l'AGO - Art. 438-440) a pu être violée, ce qui expose ces conventions à l'annulation si elles ont eu des conséquences dommageables (Art. 444)." },
      { num: 2, enonce: "Sous quel délai M. OUEDRAOGO peut-il contester la décision d'AGO irrégulière ?", correction: "L'action en nullité des actes, décisions ou délibérations se prescrit par trois ans à compter du jour où la nullité est encourue (Art. 251). À noter : une assemblée irrégulièrement convoquée peut être annulée, mais l'action en nullité n'est pas recevable lorsque tous les actionnaires étaient présents ou représentés (Art. 519)." },
      { num: 3, enonce: "M. OUEDRAOGO a-t-il le droit de consulter les comptes avant l'AGO ?", correction: "Oui. Tout actionnaire, quel que soit le nombre d'actions détenues, peut prendre connaissance au siège social, durant les quinze jours précédant l'AGO annuelle, de l'inventaire, des états financiers de synthèse, des rapports du CAC et du conseil, de la liste des actionnaires et du montant global certifié des rémunérations des dirigeants les mieux rémunérés (Art. 525) - avec copie à ses frais, sauf pour l'inventaire. À toute époque, il peut aussi consulter les documents des trois derniers exercices et les conventions réglementées (Art. 526) ; en cas de refus, le juge peut ordonner la communication sous astreinte (Art. 528)." },
    ],
  },
  {
    id: 'cp7',
    titre: "Composition et cumuls au conseil d'administration",
    contexte: "La SA PETROLE-CONGO, qui compte 8 actionnaires fondateurs, met en place sa gouvernance. Le projet prévoit : (1) un conseil d'administration de 14 membres pour représenter toutes les familles d'actionnaires ; (2) un mandat statutaire de 8 ans pour les premiers administrateurs ; (3) la nomination de Mme OKEMBA, qui siège déjà dans 5 conseils d'administration de SA ayant leur siège dans le même État partie.",
    questions: [
      { num: 1, enonce: "Le conseil de 14 membres est-il conforme à l'AUSCGIE ?", correction: "Non. L'Art. 416 limite le conseil d'administration à 12 membres au plus (3 au moins), actionnaires ou non. Le seul dépassement admis est provisoire, en cas de fusion, jusqu'à concurrence du nombre total des administrateurs en fonction depuis plus de six mois dans les sociétés fusionnées, sans dépasser 24 (Art. 418) - hypothèse étrangère au cas. Le projet devra être ramené à 12 membres au maximum ; les délibérations d'un conseil irrégulièrement constitué sont nulles (Art. 428)." },
      { num: 2, enonce: "Le mandat statutaire de 8 ans est-il valable ?", correction: "Non. L'Art. 420 fixe la durée du mandat librement dans les statuts, sans pouvoir excéder six ans en cas de nomination en cours de vie sociale et deux ans en cas de désignation par les statuts ou par l'assemblée générale constitutive. Les premiers administrateurs, désignés par les statuts, ne peuvent donc recevoir qu'un mandat de deux ans au plus - renouvelable, les administrateurs étant rééligibles sauf clause contraire (Art. 424)." },
      { num: 3, enonce: "Mme OKEMBA peut-elle accepter ce sixième mandat d'administrateur ?", correction: "Non, pas sans en abandonner un. L'Art. 425 interdit à une personne physique d'appartenir simultanément à plus de cinq conseils d'administration de SA ayant leur siège sur le territoire d'un même État partie (hors mandats dans les sociétés contrôlées). En infraction lors de l'accès à un nouveau mandat, elle doit se démettre de l'un de ses mandats dans les trois mois ; à défaut, elle est réputée s'être démise du nouveau mandat et doit restituer les rémunérations perçues, sans que la validité des délibérations auxquelles elle a pris part soit remise en cause." },
    ],
  },
  {
    id: 'cp8',
    titre: 'Transformation de la SA et rôle du CAC',
    contexte: "La SA TRANSIT-MALI, dont les affaires déclinent, souhaite se transformer en Société en Nom Collectif (SNC) pour bénéficier d'une gouvernance plus souple. L'assemblée extraordinaire réunit des actionnaires représentant 70% du capital. Par ailleurs, le mandat du CAC arrive à expiration et il faut le renouveler.",
    questions: [
      { num: 1, enonce: "La transformation en SNC peut-elle être votée à la majorité des 2/3 ?", correction: "Non. L'Art. 692 AUSCGIE exige que la transformation d'une société anonyme en société en nom collectif soit décidée à l'unanimité des actionnaires - et dans ce cas, les conditions des articles 690 (deux ans d'existence et bilans des deux premiers exercices approuvés) et 691 (rapport du CAC attestant que l'actif net est au moins égal au capital) ne s'appliquent pas. La raison de l'unanimité : la transformation fait passer les associés d'une responsabilité limitée aux apports à une responsabilité indéfinie et solidaire, or aucun engagement d'un actionnaire ne peut être augmenté sans son consentement (Art. 72, 551)." },
      { num: 2, enonce: "Par qui et pour quelle durée le CAC doit-il être renouvelé ?", correction: "Par l'assemblée générale ordinaire, pour une durée de six exercices sociaux (Art. 703-704) - seule la désignation du premier CAC, dans les statuts ou par l'assemblée générale constitutive, est limitée à deux exercices. Toute SA doit avoir au moins un commissaire aux comptes titulaire et un suppléant ; deux de chaque si elle fait appel public à l'épargne (Art. 702). Si l'assemblée omet le renouvellement, la mission du CAC est prorogée jusqu'à la plus prochaine AGO, sauf refus exprès de sa part (Art. 709)." },
      { num: 3, enonce: "Quelles sont les principales missions du CAC dans une SA ?", correction: "Le CAC certifie que les états financiers de synthèse sont réguliers et sincères et donnent une image fidèle du résultat, de la situation financière et du patrimoine (Art. 710-711) ; il vérifie en permanence les valeurs et documents comptables, à l'exclusion de toute immixtion dans la gestion (Art. 712) ; il contrôle la concordance du rapport de gestion avec les états financiers (Art. 713) ; il s'assure du respect de l'égalité entre actionnaires (Art. 714) ; il signale les irrégularités et inexactitudes à la plus prochaine assemblée et révèle au ministère public les faits délictueux dont il a connaissance, sans que sa responsabilité puisse être engagée par cette révélation (Art. 716) ; il établit enfin le rapport spécial sur les conventions réglementées (Art. 440). Il est civilement responsable des fautes et négligences commises dans ses fonctions (Art. 725)." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue2',
  numero: 4,
  id: 'ue2-ch4',
  titre: 'Société anonyme (SA) et SAS',
  sousTitre: 'Art. 385 à 853-23 AUSCGIE révisé du 30 janvier 2014',
  infoBulle: "Les sociétés de capitaux du droit OHADA : la société anonyme (constitution, actions, gouvernance, assemblées, commissaire aux comptes) et la société par actions simplifiée.",
  loiRef: 'Art. 385-853-23 AUSCGIE',
  moduleLabel: 'UE 2 · Droit des sociétés',
  retourRoute: '/ue2-droit-societes',
  coursId: 'ue2-droit-societes',
  objectifs: [
    'Maîtriser les conditions de constitution de la SA et ses capitaux minimums (Art. 385-410, 824)',
    "Distinguer les deux modes d'administration et les trois formules de direction de la SA (Art. 414-515)",
    "Analyser les droits attachés aux actions ordinaires et aux actions de préférence (Art. 744-778-15)",
    'Calculer les quorums et majorités applicables en AGO et en AGE (Art. 549-557)',
    'Comparer la SA et la SAS sur les points fondamentaux (Art. 853-1 à 853-23)',
    'Identifier les droits des actionnaires minoritaires et les mécanismes de protection (Art. 159, 520, 525-528)',
  ],
  sections: SECTIONS,
  aRetenir: [
    "La SA peut ne comprendre qu'un seul actionnaire (Art. 385) ; capital minimum de 10 000 000 FCFA, porté à 100 000 000 FCFA lorsque les titres sont cotés ou placés dans le public (Art. 387, 824) ; numéraire libéré du quart à la souscription, solde dans les 3 ans (Art. 389).",
    "L'AUSCGIE ne connaît que deux modes d'administration (Art. 414) : le conseil d'administration (3 à 12 membres, Art. 416) dirigé par un PDG ou par un président et un directeur général dissociés (Art. 415), et l'administrateur général, réservé aux SA d'au plus 3 actionnaires (Art. 494).",
    "Le nominal des actions est librement fixé par les statuts (Art. 750) ; les actions sont en principe librement transmissibles (Art. 764), sous réserve des clauses d'inaliénabilité (≤ 10 ans, motif sérieux et légitime), d'agrément et de préemption (Art. 765-1 à 771-3).",
    "Les actions de préférence sans droit de vote ne peuvent dépasser la moitié du capital - le quart dans les sociétés cotées (Art. 778-1) ; leur émission, rachat et conversion relèvent de la seule AGE, sur rapports du conseil et du CAC (Art. 778-2).",
    "AGO : quorum du quart puis néant, majorité des voix exprimées, réserve légale d'un dixième du bénéfice jusqu'au cinquième du capital (Art. 546, 549, 550). AGE : quorum de la moitié puis du quart, majorité des deux tiers (Art. 553, 554) ; la transformation en SNC exige l'unanimité (Art. 692).",
    "Tout actionnaire consulte les documents sociaux durant les 15 jours précédant l'AGO (Art. 525) et à toute époque pour les trois derniers exercices (Art. 526) ; le dixième du capital ouvre l'expertise de gestion (Art. 159), la récusation du CAC (Art. 730) et la convocation judiciaire de l'assemblée (Art. 516).",
    "Le CAC, obligatoire dans toute SA (un titulaire et un suppléant ; deux et deux avec appel public à l'épargne, Art. 702), exerce 2 exercices (nomination statutaire) ou 6 exercices (nomination par l'AGO, Art. 704) ; il certifie les comptes sans s'immiscer dans la gestion et révèle au ministère public les faits délictueux (Art. 710-716).",
    "La SAS (un ou plusieurs associés, capital et organisation statutairement libres, appel public à l'épargne interdit) n'a qu'un organe obligatoire, le président, dont les limitations de pouvoirs sont inopposables aux tiers (Art. 853-1 à 853-8) ; son CAC ne devient obligatoire qu'au franchissement de deux des trois seuils de l'Art. 853-13.",
  ],
  references: [
    {
      genre: 'texte',
      intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)",
      precision: 'adopté le 30 janvier 2014 à Ouagadougou, art. 385 à 410, 414 à 515, 516 à 561, 690 à 692, 694 à 734, 744 à 778-15, 824 et 853-1 à 853-23',
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : AUSCGIE révisé du 30 janvier 2014, art. 385-410, 414-561, 690-692, 694-734, 744-778-15, 824, 853-1 à 853-23 · art. 142-146, 157-159 et 251',
}

export default chapitre
