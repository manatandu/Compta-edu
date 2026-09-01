// Chapitre 8 du module UE2, Droit des sociétés : contenu pur.
// Migré depuis l'ancienne page dédiée UE2Chapitre8Page.tsx vers le moteur
// commun components/chapitre/ChapitreManuscrit.tsx, avec vérification
// article par article sur le texte de l'AUSCGIE révisé (art. 51-66,
// 125-136, 519-557-1, 562-595 - tous lus). Corrections apportées : le
// délai minimal d'exercice du droit préférentiel de souscription relève
// de l'art. 577 (20 jours), non de l'art. 573 ; la feuille de présence
// relève des art. 532-534 ; l'exception d'unanimité de l'AGE vise le
// transfert du siège « sur le territoire d'un autre État » (art. 554) ;
// le vote double survit à la donation entre vifs au profit d'un conjoint
// ou d'un parent au degré successible (art. 545) ; la majoration du
// nominal des actions exige le consentement unanime sauf incorporation
// (art. 562 al. 3, ajouté). Les citations de jurisprudence invérifiables
// (CCJA, Cour de cassation française, études doctrinales) ont été
// retirées au profit du fondement textuel.
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch8-q1', question: "Selon l'Art. 51 AUSCGIE, qu'est-ce qu'un titre social ?",
    options: [
      { id: 'a', texte: 'Un emprunt obligataire émis par la société' },
      { id: 'b', texte: "Une action ou part sociale émise en contrepartie d'un apport" },
      { id: 'c', texte: 'Un certificat de dépôt bancaire' },
      { id: 'd', texte: 'Un titre nominatif non transmissible' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 51 AUSCGIE',
    explication: "L'Art. 51 AUSCGIE dispose que la société émet des titres sociaux en contrepartie des apports faits par les associés ; ils représentent les droits des associés et sont dénommés actions dans les sociétés par actions et parts sociales dans les autres sociétés.",
  },
  {
    id: 'ch8-q2', question: "Quelle est la nature juridique des titres sociaux selon l'Art. 52 AUSCGIE ?",
    options: [
      { id: 'a', texte: 'Biens immeubles par nature' },
      { id: 'b', texte: 'Biens meubles' },
      { id: 'c', texte: 'Biens immeubles par destination' },
      { id: 'd', texte: 'Créances chirographaires' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 52 AUSCGIE',
    explication: "L'Art. 52 AUSCGIE qualifie les titres sociaux de biens meubles. Cette qualification emporte des conséquences sur leur régime de cession, de nantissement et de transmission successorale.",
  },
  {
    id: 'ch8-q3', question: "Selon l'Art. 53 AUSCGIE, quels droits et obligation les titres sociaux confèrent-ils à leur titulaire ?",
    options: [
      { id: 'a', texte: '2 droits : vote et dividendes' },
      { id: 'b', texte: '3 droits : vote, dividendes, information' },
      { id: 'c', texte: "4 éléments : droit aux bénéfices distribués, droit sur les actifs nets, obligation de contribuer aux pertes, droit de vote" },
      { id: 'd', texte: '5 droits dont un droit de veto' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 53 AUSCGIE',
    explication: "L'Art. 53 AUSCGIE énumère : 1°) un droit sur les bénéfices réalisés lorsque leur distribution a été décidée ; 2°) un droit sur les actifs nets lors de leur répartition, à la dissolution ou en cas de réduction du capital ; 3°) le cas échéant, l'obligation de contribuer aux pertes dans les conditions propres à chaque forme ; 4°) le droit de participer aux votes des décisions collectives.",
  },
  {
    id: 'ch8-q4', question: "Qu'est-ce qu'une clause léonine selon l'Art. 54 AUSCGIE et quelle est sa sanction ?",
    options: [
      { id: 'a', texte: "Une clause avantageant le gérant, validée par l'assemblée" },
      { id: 'b', texte: "Une clause attribuant à un associé la totalité du profit ou l'exonérant de la totalité des pertes (ou l'excluant de tout profit, ou mettant à sa charge la totalité des pertes) : réputée non écrite" },
      { id: 'c', texte: 'Une clause limitant le droit de vote, valable si approuvée en AGE' },
      { id: 'd', texte: 'Une clause de non-concurrence, réputée non écrite' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 54 AUSCGIE',
    explication: "L'Art. 54 AUSCGIE pose la proportionnalité des droits et de l'obligation aux apports, sauf clause contraire, et répute non écrites les clauses attribuant à un associé la totalité du profit ou l'exonérant de la totalité des pertes, ainsi que celles excluant un associé totalement du profit ou mettant à sa charge la totalité des pertes. Sanction chirurgicale : la clause disparaît, les statuts demeurent.",
  },
  {
    id: 'ch8-q5', question: "Quelle est la différence entre titres cessibles et titres négociables (Art. 57-58) ?",
    options: [
      { id: 'a', texte: 'Ce sont deux termes identiques' },
      { id: 'b', texte: "Les parts sociales sont cessibles ; les actions sont cessibles ou négociables. L'émission de titres négociables hors sociétés par actions est nulle" },
      { id: 'c', texte: 'Les actions sont cessibles et les parts sociales négociables' },
      { id: 'd', texte: 'Les deux catégories sont toujours librement transmissibles' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 57-58 AUSCGIE',
    explication: "L'Art. 57 dispose que les parts sociales sont cessibles et que les actions sont cessibles ou négociables. L'Art. 58 réserve l'émission de titres négociables aux sociétés par actions, interdit aux autres sociétés d'en émettre ou d'en garantir l'émission, et frappe de nullité les contrats, titres et garanties contraires.",
  },
  {
    id: 'ch8-q6', question: "Selon l'Art. 60 AUSCGIE, que se passe-t-il si tous les titres sont réunis dans une seule main ?",
    options: [
      { id: 'a', texte: 'La société est automatiquement dissoute' },
      { id: 'b', texte: "Pas de dissolution de plein droit : tout intéressé peut demander la dissolution si la situation n'est pas régularisée dans le délai d'un an" },
      { id: 'c', texte: 'La société est transformée automatiquement en entreprise individuelle' },
      { id: 'd', texte: "Le seul associé doit revendre 50% des titres sous 3 mois" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 60 AUSCGIE',
    explication: "Dans les sociétés dont la forme unipersonnelle n'est pas autorisée, la détention de tous les titres par un seul associé n'entraîne pas la dissolution de plein droit. Tout intéressé peut demander la dissolution en justice si la situation n'a pas été régularisée dans le délai d'un an ; la juridiction peut accorder un délai maximal de 6 mois pour régulariser, et ne peut prononcer la dissolution si la régularisation a eu lieu au jour où elle statue sur le fond.",
  },
  {
    id: 'ch8-q7', question: "En cas d'indivision sur des parts ou actions (Art. 127 AUSCGIE), comment le droit de vote est-il exercé ?",
    options: [
      { id: 'a', texte: 'Chaque indivisaire vote proportionnellement à sa quote-part' },
      { id: 'b', texte: 'Un mandataire unique, choisi parmi les indivisaires, les représente ; en cas de désaccord, le mandataire est désigné par la juridiction compétente' },
      { id: 'c', texte: 'Aucun des indivisaires ne peut voter' },
      { id: 'd', texte: "Le droit de vote est suspendu jusqu'au partage" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 127 AUSCGIE',
    explication: "L'Art. 127 AUSCGIE dispose qu'à défaut de clause contraire des statuts, les copropriétaires d'une action ou part indivise sont représentés par un mandataire unique choisi parmi les indivisaires ; en cas de désaccord, le mandataire est désigné par la juridiction compétente du siège social, à la demande de l'indivisaire le plus diligent.",
  },
  {
    id: 'ch8-q8', question: "En cas d'usufruit sur un titre social, qui vote selon l'Art. 128 AUSCGIE ?",
    options: [
      { id: 'a', texte: "Toujours l'usufruitier, car il perçoit les fruits" },
      { id: 'b', texte: 'Toujours le nu-propriétaire' },
      { id: 'c', texte: "Le nu-propriétaire en principe, sauf pour les décisions concernant l'affectation des bénéfices, réservées à l'usufruitier" },
      { id: 'd', texte: "Ni l'un ni l'autre" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 128 AUSCGIE',
    explication: "L'Art. 128 AUSCGIE dispose qu'à défaut de clause contraire des statuts, le droit de vote appartient au nu-propriétaire, sauf pour les décisions concernant l'affectation des bénéfices, où il est réservé à l'usufruitier - qui a vocation à percevoir les fruits.",
  },
  {
    id: 'ch8-q9', question: "Selon l'Art. 130 AUSCGIE, quelles sont les conditions cumulatives de l'abus de majorité ?",
    options: [
      { id: 'a', texte: 'Vote à plus de 75%, absence de CAC, préjudice prouvé' },
      { id: 'b', texte: "Décision votée dans le seul intérêt des majoritaires + contrairement aux intérêts des minoritaires + sans justification par l'intérêt de la société" },
      { id: 'c', texte: 'Violation des statuts + majorité absolue + intention malveillante' },
      { id: 'd', texte: 'Quorum non atteint + vote sans ordre du jour + absence de PV' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 130 AUSCGIE',
    explication: "L'Art. 130 AUSCGIE dispose que les décisions collectives constitutives d'un abus de majorité sont nulles, et définit l'abus : les majoritaires ont voté une décision dans leur seul intérêt, contrairement aux intérêts des minoritaires, sans que la décision puisse être justifiée par l'intérêt de la société. Les minoritaires peuvent en outre engager la responsabilité des associés ayant voté la décision.",
  },
  {
    id: 'ch8-q10', question: "Comment les décisions collectives peuvent-elles être prises à distance (Art. 133-1 et 133-2) ?",
    options: [
      { id: 'a', texte: 'Par simple email entre associés, sans formalité' },
      { id: 'b', texte: "Par vote par correspondance (si les statuts le prévoient : information 3 jours avant l'assemblée, bulletin reçu 24h avant) ou par participation à distance par visioconférence (si les statuts le prévoient, vote oral)" },
      { id: 'c', texte: 'Uniquement par procuration notariée' },
      { id: 'd', texte: 'Impossible : toute décision exige une assemblée physique' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 133-1, 133-2 AUSCGIE',
    explication: "Si les statuts le prévoient, sont réputés présents pour le quorum et la majorité les associés votant par correspondance - qui informent le dirigeant désigné au moins 3 jours avant l'assemblée, les votes étant réceptionnés au moins 24 heures avant (Art. 133-1) - et ceux participant à distance par visioconférence ou tout moyen de télécommunication permettant leur identification, votant oralement, les incidents techniques étant mentionnés au procès-verbal (Art. 133-2, 134).",
  },
  {
    id: 'ch8-q11', question: "Quelles mentions obligatoires doit contenir le procès-verbal d'assemblée selon l'Art. 134 AUSCGIE ?",
    options: [
      { id: 'a', texte: 'Uniquement la date et la liste des présents' },
      { id: 'b', texte: 'Date et lieu, associés présents, ordre du jour, documents et rapports soumis, résumé des débats, texte des résolutions et résultat des votes' },
      { id: 'c', texte: 'Uniquement les résolutions adoptées' },
      { id: 'd', texte: 'La liste des majoritaires et leurs déclarations' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 134 AUSCGIE',
    explication: "L'Art. 134 AUSCGIE impose : date et lieu de la réunion, noms et prénoms des associés présents, ordre du jour, documents et rapports soumis à discussion, résumé des débats, texte des résolutions mises aux voix et résultat des votes - avec mention des votes par correspondance et à distance. Les PV sont établis sur un registre spécial coté et paraphé, tenu au siège (Art. 135).",
  },
  {
    id: 'ch8-q12', question: "Selon l'Art. 549 AUSCGIE, quel est le quorum de l'AGO de SA en première et en deuxième convocation ?",
    options: [
      { id: 'a', texte: '1ère : 1/2 ; 2ème : 1/4' },
      { id: 'b', texte: '1ère : 1/4 des actions ayant droit de vote ; 2ème : aucun quorum' },
      { id: 'c', texte: '1ère : 2/3 ; 2ème : 1/2' },
      { id: 'd', texte: '1ère : 1/3 ; 2ème : 1/4' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 549-550 AUSCGIE',
    explication: "L'Art. 549 AUSCGIE fixe le quorum de l'AGO au quart des actions ayant droit de vote sur première convocation ; sur deuxième convocation, aucun quorum n'est requis. L'AGO statue à la majorité des voix exprimées, bulletins blancs non comptés (Art. 550).",
  },
  {
    id: 'ch8-q13', question: "Quelle est la majorité requise en AGE de SA selon l'Art. 554 AUSCGIE ?",
    options: [
      { id: 'a', texte: 'Majorité simple des voix exprimées' },
      { id: 'b', texte: '3/4 des voix exprimées' },
      { id: 'c', texte: '2/3 des voix exprimées' },
      { id: 'd', texte: 'Unanimité des actionnaires' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 554 AUSCGIE',
    explication: "L'Art. 554 AUSCGIE fixe la majorité de l'AGE aux deux tiers des voix exprimées, bulletins blancs non comptés. Exception : le transfert du siège de la société sur le territoire d'un autre État est décidé à l'unanimité des membres présents ou représentés.",
  },
  {
    id: 'ch8-q14', question: "Qui peut faire inscrire des projets de résolution à l'ordre du jour d'une AG de SA (Art. 520) ?",
    options: [
      { id: 'a', texte: "Uniquement le PDG, qui fixe l'ordre du jour" },
      { id: 'b', texte: 'Des actionnaires représentant 5% du capital (capital < 1 milliard FCFA), 3% (entre 1 et 2 milliards) ou 0,50% (> 2 milliards)' },
      { id: 'c', texte: "Tout actionnaire, quel que soit son nombre d'actions" },
      { id: 'd', texte: 'Le commissaire aux comptes uniquement' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 520-521 AUSCGIE',
    explication: "L'Art. 520 AUSCGIE accorde le droit de requérir l'inscription d'un projet de résolution aux actionnaires représentant 5% du capital si celui-ci est inférieur à 1 milliard FCFA, 3% entre 1 et 2 milliards, 0,50% au-delà. Le projet est adressé au siège 10 jours au moins avant l'assemblée, et les délibérations sont nulles s'il n'est pas soumis au vote (Art. 521).",
  },
  {
    id: 'ch8-q15', question: 'Le droit de vote double peut-il être attribué dans une SA ? À quelles conditions (Art. 544) ?',
    options: [
      { id: 'a', texte: 'Non, chaque action donne toujours une seule voix' },
      { id: 'b', texte: 'Oui : par les statuts ou une AGE, aux actions nominatives entièrement libérées inscrites depuis au moins 2 ans au nom du même actionnaire' },
      { id: 'c', texte: 'Oui, mais uniquement pour les actions au porteur' },
      { id: 'd', texte: 'Oui, pour tout actionnaire détenant plus de 10% du capital' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 544-545 AUSCGIE',
    explication: "L'Art. 544 AUSCGIE permet d'attribuer, par les statuts ou par une AGE ultérieure, un droit de vote double aux actions nominatives entièrement libérées inscrites depuis deux ans au moins au nom d'un même actionnaire. Le droit se perd par conversion au porteur ou transfert de propriété (Art. 545) - sauf transfert par succession, liquidation de communauté entre époux ou donation entre vifs au profit d'un conjoint ou d'un parent au degré successible.",
  },
  {
    id: 'ch8-q16', question: "L'AGE peut-elle augmenter les engagements des actionnaires au-delà de leurs apports sans leur accord individuel (Art. 551) ?",
    options: [
      { id: 'a', texte: 'Oui, à la majorité des 2/3' },
      { id: 'b', texte: "Oui, à l'unanimité des présents" },
      { id: 'c', texte: "Non : elle ne peut le faire qu'avec l'accord de chaque actionnaire" },
      { id: 'd', texte: 'Oui, si le quorum est atteint' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 551 AUSCGIE',
    explication: "L'Art. 551 AUSCGIE, après avoir donné à l'AGE le monopole de la modification des statuts, pose une limite absolue : l'assemblée générale extraordinaire ne peut augmenter les engagements des actionnaires au-delà de leurs apports qu'avec l'accord de chaque actionnaire. C'est l'écho, pour la SA, de la règle générale de l'Art. 72.",
  },
  {
    id: 'ch8-q17', question: 'En quoi consiste le droit préférentiel de souscription (DPS) ?',
    options: [
      { id: 'a', texte: "Le droit de vendre ses actions en priorité lors d'une cession" },
      { id: 'b', texte: "Le droit irréductible de souscrire, proportionnellement à ses actions et en priorité, aux actions de numéraire émises lors d'une augmentation de capital, pendant un délai d'au moins 20 jours" },
      { id: 'c', texte: "Le droit d'obtenir un dividende prioritaire" },
      { id: 'd', texte: "Le droit de participer aux AGE sans être actionnaire" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 573, 577 AUSCGIE',
    explication: "L'Art. 573 AUSCGIE attache aux actions un droit préférentiel de souscription aux augmentations de capital : les actionnaires ont, proportionnellement au montant de leurs actions, un droit de préférence irréductible à la souscription des actions de numéraire. Le délai d'exercice ne peut être inférieur à vingt (20) jours à compter de l'ouverture de la souscription (Art. 577), clos par anticipation dès que tous les droits sont exercés (Art. 578). Le droit est négociable quand il est détaché d'actions négociables, sinon cessible comme l'action (Art. 574).",
  },
  {
    id: 'ch8-q18', question: "Selon l'Art. 572 AUSCGIE, quelle condition préalable s'impose avant d'émettre de nouvelles actions en numéraire ?",
    options: [
      { id: 'a', texte: "L'accord du commissaire aux comptes" },
      { id: 'b', texte: 'Le capital existant doit être intégralement libéré' },
      { id: 'c', texte: "L'approbation de l'administration fiscale" },
      { id: 'd', texte: "L'unanimité des fondateurs" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 572 AUSCGIE',
    explication: "L'Art. 572 AUSCGIE dispose que le capital doit être intégralement libéré avant toute émission d'actions nouvelles à libérer en numéraire. L'augmentation doit en outre être réalisée dans les trois (3) ans de l'assemblée qui l'a décidée ou autorisée, et elle est réputée réalisée au jour de l'établissement de la déclaration notariée de souscription et de versement (Art. 571).",
  },
  {
    id: 'ch8-q19', question: "Qu'est-ce qu'une assemblée spéciale selon les Art. 555-557 AUSCGIE ?",
    options: [
      { id: 'a', texte: 'Une assemblée convoquée en urgence par le tribunal' },
      { id: 'b', texte: "L'assemblée des titulaires d'actions d'une catégorie déterminée, qui approuve ou désapprouve les décisions des assemblées générales modifiant les droits de ses membres" },
      { id: 'c', texte: 'Une assemblée réservée aux administrateurs' },
      { id: 'd', texte: 'Une assemblée tenue hors du siège social' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 555-557 AUSCGIE',
    explication: "L'Art. 555 AUSCGIE définit l'assemblée spéciale : elle réunit les titulaires d'actions d'une catégorie déterminée, et la décision d'une assemblée générale de modifier les droits relatifs à une catégorie d'actions n'est définitive qu'après son approbation par l'assemblée spéciale de cette catégorie. Quorum : moitié des actions puis quart (Art. 556) ; majorité : deux tiers des voix exprimées (Art. 557).",
  },
  {
    id: 'ch8-q20', question: "En vertu de l'Art. 557-1 AUSCGIE, quelles violations entraînent la nullité des délibérations ?",
    options: [
      { id: 'a', texte: 'Toute irrégularité, même mineure, dans la convocation' },
      { id: 'b', texte: 'Les violations des Art. 546, 549, 550, 551, 552, 553, 554, 555, 556 et 557 (compétences, quorums, majorités des AGO, AGE et assemblées spéciales)' },
      { id: 'c', texte: "Uniquement l'absence de commissaire aux comptes" },
      { id: 'd', texte: "Seule la violation du quorum de l'AGE" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 557-1 AUSCGIE',
    explication: "L'Art. 557-1 AUSCGIE dispose que les délibérations prises en violation des articles 546, 549, 550, 551, 552, 553, 554, 555, 556 et 557 sont nulles : compétences de l'AGO et de l'AGE, quorums et majorités des trois types d'assemblées.",
  },
  {
    id: 'ch8-n1', question: "L'augmentation de capital par majoration du montant nominal des actions existantes exige :",
    options: [
      { id: 'a', texte: 'La majorité des 2/3 en AGE dans tous les cas' },
      { id: 'b', texte: "Le consentement unanime des actionnaires, sauf si elle est réalisée par incorporation de réserves, bénéfices ou primes (Art. 562 al. 3)" },
      { id: 'c', texte: 'La majorité simple en AGO' },
      { id: 'd', texte: "L'autorisation du commissaire aux comptes" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 562 AUSCGIE',
    explication: "L'Art. 562 al. 3 AUSCGIE exige le consentement unanime des actionnaires pour l'augmentation par majoration du nominal des actions - car elle oblige chacun à un versement complémentaire -, à moins qu'elle ne soit réalisée par incorporation de réserves, bénéfices ou primes d'apports, d'émission ou de fusion, qui ne coûte rien aux actionnaires.",
  },
  {
    id: 'ch8-n2', question: "Le bénéficiaire de la suppression du DPS, lorsqu'il est actionnaire, peut-il voter sur cette résolution ?",
    options: [
      { id: 'a', texte: 'Oui, comme tout actionnaire' },
      { id: 'b', texte: "Non : il ne prend pas part au vote, ni pour lui-même ni comme mandataire, et ses actions ne comptent ni pour le quorum ni pour la majorité (Art. 587)" },
      { id: 'c', texte: "Oui, mais ses voix comptent pour moitié" },
      { id: 'd', texte: "Non, et il perd définitivement son droit de vote" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 586-587 AUSCGIE',
    explication: "L'AGE peut supprimer le DPS en faveur de bénéficiaires nommément désignés, pour tout ou partie de l'augmentation (Art. 586). L'Art. 587 écarte alors les bénéficiaires actionnaires du vote : ils n'y prennent part ni pour eux-mêmes ni comme mandataires, et leurs actions sont exclues du calcul du quorum et de la majorité.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '8.1',
    titre: 'Titres sociaux et droits fondamentaux des associés (Art. 51-66)',
    navLabel: '8.1 Titres et droits',
    blocs: [
      { type: 'paragraphe', texte: "Les **titres sociaux** représentent les droits des associés : **actions** dans les sociétés par actions, **parts sociales** dans les autres sociétés (Art. 51). Ce sont des **biens meubles** (Art. 52), émis en contrepartie des apports. Les titres de même catégorie ont la **même valeur nominale** (Art. 56)." },
      { type: 'carte', titre: 'Les droits et l\'obligation attachés aux titres (Art. 53-55)', liste: [
        "**1° Droit aux bénéfices** réalisés par la société, lorsque leur distribution a été décidée - pas de dividende sans décision collective.",
        "**2° Droit sur les actifs nets** lors de leur répartition, à la dissolution ou à l'occasion d'une réduction du capital.",
        "**3° Obligation de contribuer aux pertes**, le cas échéant, dans les conditions prévues pour chaque forme de société - limitée aux apports en SA et SARL, indéfinie et solidaire en SNC.",
        "**4° Droit de participer aux votes** des décisions collectives, sauf disposition contraire de l'Acte uniforme pour certaines catégories de titres.",
        "Ces droits ne peuvent être suspendus ou supprimés que par des dispositions expresses de l'Acte uniforme (Art. 55).",
      ] },
      { type: 'filet', titre: 'Proportionnalité et clause léonine (Art. 54)', texte: "Sauf clause contraire des statuts ou disposition contraire de l'Acte uniforme, les droits et l'obligation de chaque associé sont **proportionnels à ses apports**. Sont toutefois **réputées non écrites** les clauses attribuant à un associé la totalité du profit procuré par la société ou l'exonérant de la totalité des pertes, ainsi que celles excluant un associé totalement du profit ou mettant à sa charge la totalité des pertes. Une répartition inégalitaire reste donc possible - c'est la privation *totale* qui est léonine." },
      { type: 'paragraphe', texte: "**Cessibilité et négociabilité (Art. 57-59).** Les parts sociales sont cessibles ; les actions sont cessibles **ou négociables**. Seules les sociétés par actions émettent des titres négociables : toute émission - ou garantie d'émission - par une autre société est frappée de **nullité** (Art. 58). Dans tous les cas où l'Acte uniforme prévoit la cession ou le rachat de titres, leur valeur est fixée, à défaut d'accord amiable, par **expert** désigné par les parties ou par la juridiction compétente statuant à bref délai (Art. 59). Enfin, la réunion de tous les titres en une seule main dans une société dont la forme unipersonnelle n'est pas admise n'entraîne pas la dissolution de plein droit : tout intéressé peut la demander en justice si la situation n'est pas régularisée dans **un an**, le juge pouvant accorder six mois supplémentaires (Art. 60)." },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[5] },
    ],
  },
  {
    numero: '8.2',
    titre: 'Droit de vote, représentation, indivision et usufruit (Art. 125-129, 538-545)',
    navLabel: '8.2 Le droit de vote',
    blocs: [
      { type: 'paragraphe', texte: "**Tout associé a le droit de participer aux votes** des décisions collectives, sauf disposition contraire de l'Acte uniforme (Art. 125), et ses droits de vote sont **proportionnels à sa participation au capital** (Art. 129) - toute délibération violant les droits de vote étant nulle (Art. 129-1). Tout associé peut se faire représenter par un **mandataire** ; à défaut de disposition contraire, le mandat ne peut être donné qu'à un autre associé (Art. 126). Dans la SA, le mandataire est librement choisi, la procuration porte la mention « Bon pour pouvoir » et vaut pour une assemblée - ou pour deux assemblées, l'une ordinaire et l'autre extraordinaire, tenues le même jour ou dans un délai de sept jours (Art. 538)." },
      { type: 'carte', titre: 'Situations particulières', tableau: { entetes: ['Situation', 'Qui vote ?', 'Article'], lignes: [
        ['Indivision', "Un mandataire unique choisi parmi les indivisaires ; en cas de désaccord, désigné par la juridiction compétente à la demande de l'indivisaire le plus diligent", 'Art. 127'],
        ['Usufruit', "Le nu-propriétaire, sauf pour les décisions concernant l'affectation des bénéfices, réservées à l'usufruitier - les statuts pouvant en disposer autrement", 'Art. 128'],
        ['Action nantie', 'Le droit de vote appartient au propriétaire', 'Art. 540'],
        ['Actions rachetées par la société', 'Dépourvues de droit de vote, exclues du quorum', 'Art. 542'],
        ["Participation à l'assemblée", "Subordonnée à l'inscription en compte au jour de l'assemblée (ou au 3ème jour ouvré précédent si les statuts le prévoient)", 'Art. 541'],
      ] } },
      { type: 'filet', titre: 'Plafonnement et vote double (Art. 543-545, 552)', texte: "Le droit de vote est proportionnel à la quotité de capital et chaque action donne droit à **une voix au moins** ; les statuts peuvent limiter le nombre de voix de chaque actionnaire, à condition d'imposer cette limitation à **toutes** les actions (Art. 543). En AGE, tout actionnaire participe **sans qu'une limitation de voix puisse lui être opposée** (Art. 552). Un **droit de vote double** peut être attribué, par les statuts ou une AGE, aux actions nominatives entièrement libérées inscrites depuis au moins **deux (2) ans** au nom du même actionnaire (Art. 544) ; il se perd par conversion au porteur ou transfert de propriété, sauf succession, liquidation de communauté entre époux, ou donation entre vifs au profit d'un conjoint ou d'un parent au degré successible (Art. 545)." },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[14] },
    ],
  },
  {
    numero: '8.3',
    titre: 'Décisions collectives, abus du droit de vote et procès-verbaux (Art. 130-136)',
    navLabel: '8.3 Décisions et abus',
    blocs: [
      { type: 'paragraphe', texte: "Il existe deux sortes de décisions collectives - **ordinaires** et **extraordinaires** -, prises selon les conditions de forme et de fond propres à chaque forme de société (Art. 132), en assemblée générale ou par consultation écrite (Art. 133). Si les statuts le prévoient, sont réputés présents les associés votant **par correspondance** - information du dirigeant au moins 3 jours avant l'assemblée, votes réceptionnés au moins 24 heures avant (Art. 133-1) - et ceux participant **à distance** par visioconférence ou tout moyen de télécommunication permettant leur identification, avec vote oral (Art. 133-2)." },
      { type: 'carte', titre: "L'abus du droit de vote", tableau: { entetes: ['', 'Abus de majorité (Art. 130)', "Abus de minorité ou d'égalité (Art. 131)"], lignes: [
        ['Définition', "Décision votée par les majoritaires dans leur seul intérêt, contrairement aux intérêts des minoritaires, sans justification par l'intérêt de la société", "Opposition, par le vote, à des décisions nécessitées par l'intérêt de la société, sans intérêt légitime"],
        ['Sanctions', '**Nullité** de la décision + responsabilité des associés ayant voté la décision envers les minoritaires', "Responsabilité des minoritaires + **mandataire ad hoc** désigné par le juge pour les représenter à une prochaine assemblée et voter dans le sens conforme à l'intérêt social"],
      ] } },
      { type: 'paragraphe', texte: "**Le procès-verbal (Art. 134-136).** Toute délibération est constatée par un procès-verbal indiquant la date et le lieu de la réunion, les noms des associés présents, l'ordre du jour, les documents et rapports soumis à discussion, un résumé des débats, le texte des résolutions mises aux voix et le résultat des votes - avec mention des votes par correspondance, des participations à distance et des incidents techniques. Les PV sont établis sur un **registre spécial coté et paraphé** tenu au siège social (ou sur feuilles mobiles numérotées sans discontinuité), archivés au siège, et leurs copies sont certifiées conformes par le représentant légal (Art. 135-136)." },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[10] },
    ],
  },
  {
    numero: '8.4',
    titre: 'Les assemblées de la SA : AGO, AGE, assemblée spéciale (Art. 516-557-1)',
    navLabel: '8.4 Assemblées de SA',
    blocs: [
      { type: 'paragraphe', texte: "L'avis de convocation mentionne la dénomination, la forme, le capital, le siège, le numéro RCCM, les jour, heure et lieu, la **nature de l'assemblée** (ordinaire, extraordinaire ou spéciale) et son ordre du jour (Art. 519). Une assemblée irrégulièrement convoquée peut être annulée - sauf si tous les actionnaires étaient présents ou représentés. L'assemblée ne délibère que sur son ordre du jour, avec une exception : elle peut, **en toutes circonstances, révoquer et remplacer** des administrateurs ou l'administrateur général (Art. 522). Des actionnaires peuvent faire inscrire des projets de résolution selon les seuils dégressifs de l'Art. 520 (5% / 3% / 0,50% du capital), adressés 10 jours au moins avant l'assemblée (Art. 521). La **feuille de présence**, émargée à l'entrée en séance et certifiée par les scrutateurs, conditionne la validité des délibérations (Art. 532-534)." },
      { type: 'carte', titre: 'AGO, AGE, assemblée spéciale : le tableau de bord', tableau: { entetes: ['Critère', 'AGO', 'AGE', 'Assemblée spéciale'], lignes: [
        ['Compétences', "États financiers et affectation du résultat (réserve légale : 1/10 du bénéfice jusqu'à 1/5 du capital), nomination des administrateurs et du CAC, conventions réglementées, émission d'obligations (Art. 546)", "Modification des statuts, fusions, scissions, transformations, apports partiels d'actif, transfert du siège, dissolution anticipée ou prorogation (Art. 551)", "Approbation des décisions modifiant les droits d'une catégorie d'actions (Art. 555)"],
        ['Quorum 1ère convocation', '1/4 des actions ayant droit de vote (Art. 549)', '1/2 des actions (Art. 553)', '1/2 des actions (Art. 556)'],
        ['Quorum 2ème convocation', 'Aucun', '1/4 ; 3ème convocation possible dans les 2 mois, quorum maintenu à 1/4', '1/4, mêmes règles'],
        ['Majorité', 'Voix exprimées, blancs non comptés (Art. 550)', '2/3 des voix exprimées (Art. 554)', '2/3 des voix exprimées (Art. 557)'],
        ['Limitation de voix', 'Possible si uniforme (Art. 543)', 'Inopposable (Art. 552)', '-'],
        ['Périodicité', 'Au moins une fois par an, dans les 6 mois de la clôture (Art. 548)', 'Selon les besoins', 'Si les droits de la catégorie sont modifiés'],
      ] }, note: "Deux verrous : l'AGE ne peut augmenter les engagements des actionnaires au-delà de leurs apports qu'avec l'accord de chacun (Art. 551), et le transfert du siège sur le territoire d'un autre État exige l'unanimité des présents ou représentés (Art. 554). Les délibérations violant les Art. 546 à 557 sont nulles (Art. 557-1)." },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[18] },
      { type: 'controle', question: QCM[19] },
    ],
  },
  {
    numero: '8.5',
    titre: "L'augmentation de capital et le droit préférentiel de souscription (Art. 562-595)",
    navLabel: '8.5 Augmentation de capital',
    blocs: [
      { type: 'carte', titre: "Les modes d'augmentation (Art. 562-563)", tableau: { entetes: ['Mode', 'Libération', 'Particularité'], lignes: [
        ["Émission d'actions nouvelles (ordinaires ou de préférence)", 'En espèces, par compensation avec des créances certaines, liquides et exigibles, par incorporation de réserves, bénéfices ou primes, ou par apport en nature', "Émises au nominal, éventuellement majoré d'une prime d'émission (Art. 563)"],
        ['Majoration du nominal des actions existantes', '-', "**Consentement unanime** des actionnaires, sauf incorporation de réserves, bénéfices ou primes (Art. 562 al. 3)"],
        ["Exercice de droits attachés à des valeurs mobilières donnant accès au capital", '-', 'Régime des Art. 822-1 et suivants'],
      ] } },
      { type: 'paragraphe', texte: "**Compétence et délégation (Art. 564-569).** L'AGE est **seule compétente** pour décider ou autoriser l'augmentation, sur les rapports du conseil d'administration (ou de l'administrateur général) et du commissaire aux comptes ; toute clause donnant ce pouvoir de décision au conseil est réputée non écrite (Art. 569). L'incorporation de réserves, bénéfices ou primes se décide toutefois aux conditions de quorum et de majorité de l'**AGO** (Art. 565). L'assemblée peut **déléguer la compétence** de décider l'augmentation au conseil ou à l'administrateur général, pour une durée maximale de **vingt-quatre (24) mois** et dans la limite d'un plafond global (Art. 567-1), ou lui déléguer les pouvoirs de réaliser l'opération (Art. 568). **Deux verrous** : l'augmentation doit être réalisée dans les **trois (3) ans** de l'assemblée (Art. 571), et le capital doit être **intégralement libéré** avant toute émission d'actions nouvelles à libérer en numéraire (Art. 572)." },
      { type: 'filet', titre: 'Le droit préférentiel de souscription (Art. 573-578)', texte: "Les actions comportent un DPS aux augmentations de capital : les actionnaires ont, **proportionnellement au montant de leurs actions**, un droit de préférence **irréductible** à la souscription des actions de numéraire (Art. 573). Le droit est négociable lorsqu'il est détaché d'actions elles-mêmes négociables, sinon cessible comme l'action (Art. 574). Le délai d'exercice ne peut être inférieur à **vingt (20) jours** à compter de l'ouverture de la souscription (Art. 577), et il se clôt par anticipation dès que tous les droits ont été exercés ou que l'augmentation est intégralement souscrite après renonciations individuelles (Art. 578)." },
      { type: 'paragraphe', texte: "**Suppression et renonciation (Art. 586-595).** L'assemblée qui décide ou autorise l'augmentation peut **supprimer le DPS** en faveur de bénéficiaires nommément désignés, pour la totalité ou pour des tranches de l'opération (Art. 586) - les bénéficiaires actionnaires **ne votant pas**, ni pour eux-mêmes ni comme mandataires, leurs actions étant exclues du quorum et de la majorité (Art. 587). La décision suppose le rapport du conseil - montant maximal et motifs de l'augmentation, motifs de la suppression, nom des attributaires, nombre de titres et prix d'émission justifié (Art. 589) - et l'avis du commissaire aux comptes sur la suppression, le choix des éléments de calcul du prix et son montant (Art. 591) ; les délibérations prises sans ces rapports sont **nulles**. Chaque actionnaire peut aussi **renoncer individuellement** à son DPS, au profit de personnes dénommées (avec leur acceptation) ou sans indication de bénéficiaires, en avisant la société avant l'expiration du délai de souscription (Art. 593-595)." },
      { type: 'controle', question: QCM[16] },
      { type: 'controle', question: QCM[17] },
      { type: 'controle', question: QCM[20] },
      { type: 'controle', question: QCM[21] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas1',
    titre: 'Clause léonine contestée',
    contexte: "Les statuts de la SARL KINSHASA TECH prévoient que M. Banza, associé fondateur, recevra 80% des bénéfices distribués, bien qu'il ne détienne que 40% des parts sociales. Les trois autres associés, qui détiennent collectivement 60% des parts (20% chacun), se partagent uniquement 20% des bénéfices. Après 3 exercices bénéficiaires, les minoritaires contestent cette clause. Capital : 10 000 000 CDF.",
    questions: [
      { num: 1, enonce: "La clause répartissant 80% des bénéfices à M. Banza (40% des parts) est-elle valide ?", correction: "La clause n'est pas léonine au sens strict de l'Art. 54 al. 2 AUSCGIE, qui répute non écrites les clauses attribuant à un associé la totalité du profit, l'exonérant de la totalité des pertes, excluant un associé de tout profit ou mettant à sa charge la totalité des pertes. Or l'Art. 54 al. 1 autorise expressément les clauses statutaires dérogeant à la proportionnalité : une répartition 80/20 laisse à chaque associé une part du profit. Elle est donc en principe valable en tant que telle - mais elle reste exposée à la contestation sur d'autres terrains : les minoritaires peuvent notamment démontrer, selon les circonstances de son adoption, un abus de majorité (Art. 130) si la clause a été votée par les majoritaires dans leur seul intérêt, contrairement aux intérêts des minoritaires et sans justification par l'intérêt social." },
      { num: 2, enonce: "Où passe la frontière entre dérogation licite et clause léonine ?", correction: "La proportionnalité aux apports est la règle supplétive (Art. 54 al. 1) : les statuts peuvent avantager un associé - pour rémunérer un rôle particulier, un savoir-faire, un apport en industrie. La limite est la privation totale : serait réputée non écrite la clause donnant à M. Banza la totalité des bénéfices, ou celle privant l'un des associés de tout bénéfice, ou l'exonérant de toute contribution aux pertes (Art. 54 al. 2). La sanction est la nullité partielle : la clause est réputée non écrite et la répartition redevient proportionnelle (40/20/20/20), sans que la validité de la société ni du reste des statuts en soit affectée." },
    ],
  },
  {
    id: 'cas2',
    titre: 'Abus de majorité',
    contexte: "Depuis 5 ans, les associés majoritaires de la SA LUBUMBASHI MINING (65% du capital) votent systématiquement la mise en réserve intégrale des bénéfices, sans verser de dividendes. Par ailleurs, ils se font attribuer des rémunérations élevées en tant qu'administrateurs. Les minoritaires (35%) saisissent le tribunal pour abus de majorité. Bénéfices cumulés non distribués : 200 millions FCFA ; rémunérations annuelles des administrateurs majoritaires : 80 millions.",
    questions: [
      { num: 1, enonce: "L'abus de majorité est-il constitué ? Analysez les conditions de l'Art. 130.", correction: "L'Art. 130 AUSCGIE exige trois éléments : une décision votée par les majoritaires dans leur seul intérêt, contrairement aux intérêts des minoritaires, sans justification par l'intérêt de la société. (1) Seul intérêt des majoritaires : la thésaurisation systématique combinée à des rémunérations élevées versées aux seuls majoritaires-administrateurs leur assure un revenu que les minoritaires n'ont pas. (2) Contrariété aux intérêts des minoritaires : privés de tout dividende depuis 5 ans, ils ne retirent aucun fruit de leurs titres. (3) Absence de justification sociale : une mise en réserve peut servir l'intérêt social (investissements, prudence) - c'est à la société de justifier l'affectation ; en l'absence de tout projet identifiable absorbant 200 millions de réserves, la justification fait défaut. Le cumul réserve intégrale + rémunérations exclusives caractérise l'abus." },
      { num: 2, enonce: "Quelles sanctions le tribunal peut-il prononcer ? Et si les minoritaires bloquaient à leur tour les décisions ?", correction: "Deux sanctions (Art. 130) : la nullité des décisions collectives constitutives de l'abus - les délibérations de mise en réserve peuvent être annulées - et la responsabilité des associés ayant voté la décision, engagée par les minoritaires pour la réparation du préjudice qui en résulte à leur égard. En sens inverse, si les minoritaires s'opposaient par leur vote à des décisions nécessitées par l'intérêt de la société sans justifier d'un intérêt légitime (abus de minorité, Art. 131), leur responsabilité pourrait être engagée et la juridiction pourrait désigner un mandataire ad hoc chargé de les représenter à une prochaine assemblée et de voter en leur nom dans le sens conforme à l'intérêt social." },
    ],
  },
  {
    id: 'cas3',
    titre: 'Quorum AGE non atteint',
    contexte: "La SA GOMA TRADE convoque une AGE pour modifier son objet social et augmenter le capital. Lors de la 1ère convocation, seuls 30% des actions avec droit de vote sont représentés. Le PDG propose quand même de voter la résolution. Lors de la 2ème convocation (un mois plus tard), 28% des actions sont représentés et la résolution est adoptée à 70% des voix exprimées. Aucune 3ème convocation n'a été organisée.",
    questions: [
      { num: 1, enonce: "La délibération adoptée lors de la 1ère convocation est-elle valide ?", correction: "Non. L'Art. 553 AUSCGIE exige, sur première convocation de l'AGE, que les actionnaires présents ou représentés possèdent au moins la moitié des actions. Avec 30% < 50%, le quorum n'est pas atteint, et l'Art. 557-1 frappe de nullité les délibérations prises en violation de l'Art. 553 : la délibération de la première convocation est nulle, sans qu'il soit besoin de prouver un préjudice." },
      { num: 2, enonce: "La délibération de la 2ème convocation (28% présents, 70% favorables) est-elle valide ?", correction: "Oui. Sur deuxième convocation, le quorum de l'AGE est abaissé au quart des actions (Art. 553) : 28% ≥ 25%, le quorum est atteint. La majorité des deux tiers des voix exprimées (Art. 554) est également satisfaite avec 70%. La résolution est donc régulière. Si le quorum du quart n'avait pas été réuni, une troisième convocation aurait pu être tenue dans un délai maximal de deux mois à compter de la deuxième, le quorum restant fixé au quart (Art. 553 al. 2) - mécanisme qui évite la paralysie en cas d'absentéisme." },
    ],
  },
  {
    id: 'cas4',
    titre: 'Suppression du DPS',
    contexte: "La SA KINSHASA INVEST décide une augmentation de capital par émission de 1 000 nouvelles actions à 10 000 CDF l'une. L'AGE vote la suppression du droit préférentiel de souscription (DPS) au profit de M. Diallo, investisseur extérieur. M. Diallo détient déjà 5% des actions de la SA et participe à l'AGE. La résolution est adoptée à 67% des voix exprimées, voix de M. Diallo comprises.",
    questions: [
      { num: 1, enonce: "M. Diallo pouvait-il voter sur la résolution supprimant le DPS à son profit ?", correction: "Non. L'Art. 587 AUSCGIE dispose que les bénéficiaires de la suppression du DPS, lorsqu'ils sont actionnaires, ne prennent pas part au vote, ni pour eux-mêmes ni comme mandataires, et que leurs actions ne sont pas prises en compte pour le calcul du quorum et de la majorité. Il faut donc recompter : si, déduction faite des voix de M. Diallo, la majorité des deux tiers des voix exprimées (Art. 554) n'est plus atteinte, la délibération est nulle (Art. 557-1). Avec 67% incluant ses 5%, le résultat recalculé est vraisemblablement inférieur au seuil requis." },
      { num: 2, enonce: "Quelles conditions de fond et de forme la suppression du DPS suppose-t-elle ?", correction: "D'abord, les conditions générales de l'augmentation : compétence exclusive de l'AGE sur rapports du conseil d'administration et du commissaire aux comptes (Art. 564), capital intégralement libéré avant toute émission en numéraire (Art. 572), réalisation dans les trois ans (Art. 571). Ensuite, les conditions propres à la suppression (Art. 586-591) : rapport du conseil indiquant le montant maximal et les motifs de l'augmentation, les motifs de la suppression, le nom des attributaires, le nombre de titres attribués et le prix d'émission justifié ; avis du commissaire aux comptes sur la suppression, les éléments de calcul du prix et son montant. Les délibérations prises sans ces rapports sont nulles. Enfin, chaque actionnaire reste libre de renoncer individuellement à son DPS, avec ou sans indication de bénéficiaire (Art. 593-595)." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue2',
  numero: 8,
  id: 'ue2-chapitre-8',
  titre: 'Les associés et les assemblées',
  sousTitre: 'Art. 51-66, 125-136, 516-557-1 et 562-595 AUSCGIE révisé du 30 janvier 2014',
  infoBulle: "Titres sociaux, droits de vote et leurs aménagements, assemblées de la SA (AGO, AGE, spéciale), abus du droit de vote et augmentation de capital avec droit préférentiel de souscription.",
  loiRef: 'Art. 51-66, 125-136, 516-595 AUSCGIE',
  moduleLabel: 'UE 2 · Droit des sociétés',
  retourRoute: '/ue2-droit-societes',
  coursId: 'ue2-droit-societes',
  objectifs: [
    "Qualifier les titres sociaux et les droits qu'ils confèrent, jusqu'à la clause léonine (Art. 51-60)",
    "Maîtriser le droit de vote et ses situations particulières : mandat, indivision, usufruit, nantissement, vote double (Art. 125-129, 538-545)",
    "Identifier l'abus de majorité et l'abus de minorité et leurs sanctions (Art. 130-131)",
    'Appliquer les règles de convocation, de quorum et de majorité des assemblées de SA (Art. 516-557-1)',
    "Comprendre l'augmentation de capital, le DPS, sa suppression et sa renonciation (Art. 562-595)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Les titres sociaux - actions ou parts sociales - sont des biens meubles conférant droit aux bénéfices distribués, droit sur les actifs nets, obligation de contribuer aux pertes et droit de vote (Art. 51-53) ; les clauses léonines (totalité du profit ou des pertes, exclusion totale) sont réputées non écrites (Art. 54).",
    "Seules les sociétés par actions émettent des titres négociables, à peine de nullité (Art. 58) ; la réunion de tous les titres en une main ouvre un délai d'un an de régularisation avant toute dissolution judiciaire (Art. 60).",
    "Tout associé vote, proportionnellement à sa part du capital (Art. 125, 129) ; en indivision vote un mandataire unique, en usufruit le nu-propriétaire sauf l'affectation des bénéfices (Art. 127-128) ; le vote double récompense deux ans d'inscription nominative (Art. 544) et les limitations de voix sont inopérantes en AGE (Art. 552).",
    "L'abus de majorité rend la décision nulle et engage ses auteurs ; l'abus de minorité expose à un mandataire ad hoc votant dans le sens de l'intérêt social (Art. 130-131).",
    "AGO : quorum du quart puis aucun, majorité des voix exprimées ; AGE : moitié puis quart (et troisième convocation dans les deux mois), majorité des deux tiers ; assemblée spéciale : approbation des modifications des droits d'une catégorie ; les violations de ces règles sont nulles de plein droit (Art. 549-557-1).",
    "L'AGE ne peut augmenter les engagements des actionnaires au-delà de leurs apports qu'avec l'accord de chacun (Art. 551), et le transfert du siège dans un autre État exige l'unanimité (Art. 554).",
    "L'augmentation de capital relève de la seule AGE (délégation possible de 24 mois au conseil), doit être réalisée dans les trois ans et suppose un capital intégralement libéré pour toute émission en numéraire (Art. 564-572) ; la majoration du nominal exige l'unanimité sauf incorporation (Art. 562).",
    "Le DPS est irréductible et proportionnel, s'exerce pendant au moins 20 jours (Art. 573, 577) ; sa suppression au profit de bénéficiaires nommés exclut ceux-ci du vote et exige les rapports du conseil et du CAC à peine de nullité (Art. 586-591) ; la renonciation individuelle reste libre (Art. 593-595).",
  ],
  references: [
    {
      genre: 'texte',
      intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)",
      precision: 'adopté le 30 janvier 2014 à Ouagadougou, art. 51 à 66, 125 à 136, 516 à 557-1 et 562 à 595',
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : AUSCGIE révisé du 30 janvier 2014, art. 51-66, 125-136, 516-557-1, 562-595',
}

export default chapitre
