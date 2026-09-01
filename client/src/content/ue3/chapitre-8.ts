import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 3 — CHAPITRE 8 : LES FUSIONS ET OPÉRATIONS ASSIMILÉES
// AUSCGIE art. 189-199 (fusion, scission, apport partiel d'actif, projet,
// publicité, décision). SYSCOHADA : chapitre 38 du Guide, Applications 116
// (fusion simple), 117 (fusion-renonciation), 118 (absorbée détenant
// l'absorbante), 119 (participations réciproques) et 120 (apport partiel).
// Les anomalies du texte officiel signalées dans la source (numérotation des
// étapes de l'App. 116, ventilation de l'App. 118, compte « 10523 » de
// l'App. 119) sont respectées : rien n'est corrigé silencieusement.
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1',
    question: "Selon l'article 189 de l'AUSCGIE, la fusion est l'opération par laquelle :",
    options: [
      { id: 'a', texte: "Une société vend son fonds de commerce à une autre" },
      { id: 'b', texte: "Deux ou plusieurs sociétés se réunissent pour n'en former qu'une seule, soit par création d'une société nouvelle, soit par absorption par l'une d'entre elles" },
      { id: 'c', texte: "Une société prend une participation majoritaire dans une autre" },
      { id: 'd', texte: "Deux sociétés mettent en commun une branche d'activité" },
      { id: 'e', texte: "Une société change de forme juridique" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 189 distingue la fusion-réunion (création d'une société nouvelle) et la fusion-absorption. Même une société en liquidation peut être absorbée ou participer à une fusion. Effet cardinal : la transmission à titre universel du patrimoine des sociétés qui disparaissent à la société absorbante ou nouvelle.",
    articleRef: "AUSCGIE, art. 189",
  },
  {
    id: 'q2',
    question: "Quels sont les effets d'une fusion sur les sociétés qui disparaissent et sur leurs associés ?",
    options: [
      { id: 'a', texte: "Dissolution suivie d'une liquidation classique" },
      { id: 'b', texte: "Dissolution sans liquidation, transmission universelle du patrimoine, et acquisition simultanée par leurs associés de la qualité d'associés des sociétés bénéficiaires" },
      { id: 'c', texte: "Simple mise en sommeil" },
      { id: 'd', texte: "Les associés sont remboursés en numéraire obligatoirement" },
      { id: 'e', texte: "Les associés perdent tous leurs droits" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 191 : la fusion ou la scission entraîne la dissolution **sans liquidation** des sociétés qui disparaissent et la transmission universelle de leur patrimoine aux sociétés bénéficiaires, dans l'état où il se trouve à la date de réalisation définitive ; simultanément, les associés des sociétés qui disparaissent deviennent associés des bénéficiaires dans les conditions du contrat de fusion.",
    articleRef: "AUSCGIE, art. 191",
  },
  {
    id: 'q3',
    question: "Quelle est la limite de la soulte en cas de fusion ou de scission ?",
    options: [
      { id: 'a', texte: "Aucune limite" },
      { id: 'b', texte: "Elle ne peut dépasser dix pour cent de la valeur d'échange des parts ou actions attribuées" },
      { id: 'c', texte: "Elle est interdite" },
      { id: 'd', texte: "Elle est plafonnée à la moitié de l'apport" },
      { id: 'e', texte: "Elle est plafonnée au montant de la prime de fusion" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 191, alinéa 2 : les associés peuvent recevoir, en échange de leurs apports, une soulte dont le montant ne peut dépasser dix pour cent (10 %) de la valeur d'échange des parts ou actions attribuées. Au-delà, l'opération perdrait sa nature d'échange de titres. Par ailleurs, il n'est pas procédé à l'échange pour les titres détenus par la société bénéficiaire ou par la société qui disparaît (art. 191, al. 3) — fondement des fusions-renonciations.",
    articleRef: "AUSCGIE, art. 191",
  },
  {
    id: 'q4',
    question: "Quand la fusion prend-elle effet ?",
    options: [
      { id: 'a', texte: "Toujours au 1er janvier suivant" },
      { id: 'b', texte: "En cas de création de sociétés nouvelles, à la date d'immatriculation au RCCM ; dans les autres cas, à la date de la dernière assemblée ayant approuvé l'opération, sauf clause contraire dans les bornes fixées par l'article 192" },
      { id: 'c', texte: "À la signature du projet de fusion" },
      { id: 'd', texte: "À la date de l'avis dans le journal d'annonces légales" },
      { id: 'e', texte: "À la clôture de l'exercice, sans exception" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 192 : effet à la date d'immatriculation de la société nouvelle (ou de la dernière d'entre elles), et, dans les autres cas, à la date de la dernière assemblée générale ayant approuvé l'opération — sauf si le contrat prévoit une autre date, qui ne peut être ni postérieure à la clôture de l'exercice en cours des bénéficiaires ni antérieure à la clôture du dernier exercice clos des sociétés qui transmettent leur patrimoine. C'est le fondement des effets rétroactifs conventionnels bornés.",
    articleRef: "AUSCGIE, art. 192",
  },
  {
    id: 'q5',
    question: "Que doit contenir le projet de fusion (art. 193) ?",
    options: [
      { id: 'a', texte: "Une simple lettre d'intention" },
      { id: 'b', texte: "Notamment : identification des sociétés, motifs et conditions, désignation et évaluation de l'actif et du passif transmis, modalités de remise des titres, dates comptables, rapport d'échange et soulte éventuelle, montant prévu de la prime de fusion, droits particuliers" },
      { id: 'c', texte: "Uniquement le rapport d'échange" },
      { id: 'd', texte: "Le seul montant de la prime" },
      { id: 'e', texte: "Les statuts complets de l'absorbante" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 193 impose un projet arrêté par les organes de gestion de chaque société, avec huit séries de mentions — dont la désignation et l'évaluation de l'actif et du passif transmis, le rapport d'échange des titres et le montant de la soulte éventuelle, le montant prévu de la prime de fusion, et la date d'effet comptable. Le projet est déposé au RCCM et publié dans un journal d'annonces légales au moins un mois avant la première assemblée appelée à statuer (art. 194).",
    articleRef: "AUSCGIE, art. 193-194",
  },
  {
    id: 'q6',
    question: "Comment la fusion est-elle décidée dans chaque société participante ?",
    options: [
      { id: 'a', texte: "Par les conseils d'administration seuls" },
      { id: 'b', texte: "Dans les conditions requises pour la modification des statuts — et à l'unanimité si l'opération augmente les engagements des associés" },
      { id: 'c', texte: "À la majorité simple des présents" },
      { id: 'd', texte: "Par le président du tribunal" },
      { id: 'e', texte: "Par référendum des salariés" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 197 : les opérations de fusion, scission et apport partiel d'actif sont décidées, pour chacune des sociétés, dans les conditions requises pour la modification de ses statuts et selon les procédures suivies en matière d'augmentation de capital et de dissolution. Si l'opération augmente les engagements des associés, l'unanimité est requise — à peine de nullité. À peine de nullité également, les sociétés déposent au greffe une déclaration de conformité relatant tous les actes effectués (art. 198).",
    articleRef: "AUSCGIE, art. 197-198",
  },
  {
    id: 'q7',
    question: "Qu'est-ce que l'apport partiel d'actif (art. 195) ?",
    options: [
      { id: 'a', texte: "La vente d'un immeuble isolé" },
      { id: 'b', texte: "L'apport par une société d'une branche autonome d'activité à une société préexistante ou à créer, sans disparition de l'apporteuse ; il est soumis au régime de la scission" },
      { id: 'c', texte: "Une distribution de dividendes en nature" },
      { id: 'd', texte: "Un prêt d'actifs entre sociétés du même groupe" },
      { id: 'e', texte: "Une location-gérance" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 195 : l'apport partiel d'actif est l'opération par laquelle une société fait apport d'une **branche autonome d'activité** à une société préexistante ou à créer ; la société apporteuse ne disparaît pas et reçoit des titres de la bénéficiaire. L'opération est soumise au régime de la scission. La scission elle-même (art. 190) partage le patrimoine d'une société — qui disparaît — entre plusieurs sociétés existantes ou nouvelles.",
    articleRef: "AUSCGIE, art. 190 et 195",
  },
  {
    id: 'q8',
    question: "À quelle valeur les apports d'une fusion sont-ils évalués selon le Guide SYSCOHADA ?",
    options: [
      { id: 'a', texte: "Toujours à la valeur comptable" },
      { id: 'b', texte: "À la valeur réelle si la fusion emporte une prise de contrôle ; à la valeur comptable pour l'absorption d'une filiale détenue en permanence à 100 % — le choix étant imposé par les règles comptables, non laissé aux entités" },
      { id: 'c', texte: "Toujours à la valeur réelle" },
      { id: 'd', texte: "Au choix discrétionnaire des parties" },
      { id: 'e', texte: "À la valeur boursière exclusivement" },
    ],
    reponseCorrecte: 'b',
    explication: "Principe du chapitre 38 du Guide : prise de contrôle → valeur réelle (logique d'acquisition des comptes consolidés) ; absorption d'une filiale détenue en permanence à 100 % → valeur comptable. « Ce choix n'appartient pas aux entités : il est imposé par les règles comptables. » Les incorporels non inscrits au bilan de l'absorbée (droit au bail, marques...) apportés à la valeur réelle sont inscrits au débit du compte 215 Fonds commercial chez l'absorbante.",
    articleRef: "SYSCOHADA — Guide d'application, chapitre 38 (principes)",
  },
  {
    id: 'q9',
    question: "Dans l'Application 116 (actif net apporté 90 000 000, augmentation de capital 50 000 000), la prime de fusion est :",
    options: [
      { id: 'a', texte: "50 000 000" },
      { id: 'b', texte: "40 000 000, créditée au compte 1053 — l'écart entre la valeur de l'apport et le nominal des titres émis" },
      { id: 'c', texte: "90 000 000" },
      { id: 'd', texte: "10 000 000" },
      { id: 'e', texte: "Nulle : il n'y a jamais de prime en fusion" },
    ],
    reponseCorrecte: 'b',
    explication: "Prime de fusion = valeur de l'apport net (90 000 000) − augmentation de capital au nominal (10 000 titres × 5 000 = 50 000 000) = 40 000 000, au crédit de 1053 Primes de fusion. L'écriture chez l'absorbante : débit 4614 Apporteurs, entité absorbée, compte d'apports 90 000 000 / crédit 1013 pour 50 000 000 et crédit 1053 pour 40 000 000, puis réalisation des apports par le débit des comptes d'actifs (aux valeurs d'apport), le crédit des dettes transmises et le solde de 4614.",
    articleRef: "SYSCOHADA — Application 116",
  },
  {
    id: 'q10',
    question: "Comment la parité d'échange de l'Application 116 est-elle obtenue (part B évaluée 15 000, action A évaluée 9 000) ?",
    options: [
      { id: 'a', texte: "Par négociation libre sans calcul" },
      { id: 'b', texte: "Parité = valeur du titre de l'absorbée / valeur du titre de l'absorbante = 15 000 / 9 000, soit 5 actions A contre 3 actions B — d'où 10 000 titres A émis pour 6 000 titres B" },
      { id: 'c', texte: "3 actions A contre 5 actions B" },
      { id: 'd', texte: "1 action A contre 1 action B" },
      { id: 'e', texte: "Par référence aux seules valeurs nominales" },
    ],
    reponseCorrecte: 'b',
    explication: "Le rapport d'échange rapporte la valeur du titre absorbé à celle du titre absorbant : 15 000 / 9 000 = 5/3 → 5 actions A pour 3 actions B. Titres à émettre : 6 000 × 5/3 = 10 000. La valeur du titre B (15 000) provient de l'actif net réel : actifs en valeurs réelles (130 000 000) − emprunts (40 000 000) = 90 000 000 / 6 000 parts.",
    articleRef: "SYSCOHADA — Application 116",
  },
  {
    id: 'q11',
    question: "Chez l'absorbée, le résultat de fusion (compte 1381) représente :",
    options: [
      { id: 'a', texte: "La prime de fusion" },
      { id: 'b', texte: "L'écart entre la valeur d'apport des éléments transmis et leur valeur nette comptable — +17 500 000 dans l'Application 116 (plus-values sur terrains et bâtiments)" },
      { id: 'c', texte: "Le boni de liquidation" },
      { id: 'd', texte: "Les frais de fusion" },
      { id: 'e', texte: "Le montant de la soulte" },
    ],
    reponseCorrecte: 'b',
    explication: "Chez l'absorbée, la sortie du patrimoine à la valeur d'apport dégage un résultat de fusion (1381) égal aux plus ou moins-values constatées : +7 500 000 sur les terrains et +10 000 000 sur les bâtiments dans l'Application 116. Le cycle de l'absorbée : réalisation des apports (4718 au débit, actifs crédités, 1381), rémunération (502 Actions / 4718), constatation des droits des associés (capital, réserves et 1381 virés à 4618), désintéressement (4618 / 502).",
    articleRef: "SYSCOHADA — Application 116",
  },
  {
    id: 'q12',
    question: "Les frais externes de fusion (honoraires, commissions) peuvent être :",
    options: [
      { id: 'a', texte: "Uniquement immobilisés" },
      { id: 'b', texte: "Soit passés en charges de l'exercice (6324, 6318...), soit imputés sur la prime de fusion (débit 1053)" },
      { id: 'c', texte: "Uniquement imputés sur le capital" },
      { id: 'd', texte: "Répartis sur cinq ans obligatoirement" },
      { id: 'e', texte: "Mis à la charge des actionnaires de l'absorbée" },
    ],
    reponseCorrecte: 'b',
    explication: "Le Guide les qualifie de frais d'émission de titres et offre l'option (Application 116, étape 3) : option 1 — charges de l'exercice (débit 6324 Honoraires 15 000 000 et 6318 Autres frais bancaires 1 000 000 / crédit 521) ; option 2 — imputation sur la prime de fusion (débit 1053 / crédit 521 pour 16 000 000).",
    articleRef: "SYSCOHADA — Application 116",
  },
  {
    id: 'q13',
    question: "En fusion-renonciation (l'absorbante détient une fraction de l'absorbée), l'augmentation de capital :",
    options: [
      { id: 'a', texte: "Rémunère tous les titres de l'absorbée, y compris ceux détenus par l'absorbante" },
      { id: 'b', texte: "Ne rémunère que les actionnaires extérieurs ; les titres de l'absorbée détenus par l'absorbante sont annulés, l'écart entre leur quote-part d'apport et leur valeur comptable étant un boni (ou mali) de fusion logé en 1053" },
      { id: 'c', texte: "Est purement et simplement interdite" },
      { id: 'd', texte: "Est doublée pour compenser l'annulation" },
      { id: 'e', texte: "Se fait sans prime" },
    ],
    reponseCorrecte: 'b',
    explication: "Application 117 : A détient 40 % de B — il n'est pas procédé à l'échange pour ces titres (art. 191, al. 3). L'augmentation ne rémunère que les 60 % extérieurs (2 000 titres A émis, 20 000 000 de capital, prime 40 000 000) ; les titres B détenus (coût 10 000 000) sont annulés contre leur quote-part d'apport (40 000 000), dégageant un boni de fusion de 30 000 000 crédité en 1053 avec la prime — d'où l'écriture unique : débit 4614 100 000 000 / crédit 1013 20 000 000, crédit 1053 70 000 000, crédit 26 10 000 000.",
    articleRef: "SYSCOHADA — Application 117 ; AUSCGIE, art. 191",
  },
  {
    id: 'q14',
    question: "Lorsque l'absorbée détient des titres de l'absorbante (Application 118), que fait l'absorbante des actions propres reçues dans l'apport ?",
    options: [
      { id: 'a', texte: "Elle les conserve indéfiniment en portefeuille" },
      { id: 'b', texte: "Elle les reçoit au compte 5021 Actions propres, puis les annule par réduction de capital (au nominal), l'excédent étant imputé sur la prime de fusion" },
      { id: 'c', texte: "Elle les revend obligatoirement en bourse" },
      { id: 'd', texte: "Elle les distribue à ses salariés" },
      { id: 'e', texte: "Elle les transfère à la masse des obligataires" },
    ],
    reponseCorrecte: 'b',
    explication: "Application 118 : B détient 20 % de A ; l'apport comprend donc 2 000 actions A, reçues chez A au débit de 5021 Actions propres (24 000 000 à la valeur réelle). A les annule par réduction de capital : débit 101 pour le nominal (20 000 000) et débit 1053 pour l'excédent (4 000 000) / crédit 5021 pour 24 000 000 — la prime de fusion finale passant de 15 000 000 à 11 000 000.",
    articleRef: "SYSCOHADA — Application 118",
  },
  {
    id: 'q15',
    question: "En cas de participations réciproques (Application 119), comment les valeurs d'échange des titres sont-elles déterminées ?",
    options: [
      { id: 'a', texte: "Chaque société est évaluée sans tenir compte de sa participation dans l'autre" },
      { id: 'b', texte: "Par un système de deux équations à deux inconnues, chaque actif net incluant la participation dans l'autre société à sa valeur d'échange (10 000 A = 500 B + 185 000 000 ; 5 000 B = 500 A + 140 000 000 → A = 20 000, B = 30 000)" },
      { id: 'c', texte: "Par la moyenne des valeurs nominales" },
      { id: 'd', texte: "Par le dernier cours de bourse" },
      { id: 'e', texte: "Par décision de la juridiction compétente exclusivement" },
    ],
    reponseCorrecte: 'b',
    explication: "Chaque valeur dépend de l'autre : l'actif net de A comprend ses 500 titres B, celui de B ses 500 titres A. Le Guide pose le système : 10 000 A = 500 B + 185 000 000 et 5 000 B = 500 A + 140 000 000, dont la solution donne A = 20 000 et B = 30 000, soit une parité de 3 actions A contre 2 actions B. La suite combine les mécanismes des Applications 117 (renonciation, boni) et 118 (annulation d'actions propres par réduction de capital).",
    articleRef: "SYSCOHADA — Application 119",
  },
  {
    id: 'q16',
    question: "Dans l'apport partiel d'actif de l'Application 120, l'écart entre l'apport net (123 000 000) et l'augmentation de capital (82 000 000) est crédité :",
    options: [
      { id: 'a', texte: "Au compte 1053 — Primes de fusion" },
      { id: 'b', texte: "Au compte 1052 — Primes d'apport (41 000 000)" },
      { id: 'c', texte: "Au compte 1381 — Résultat de fusion" },
      { id: 'd', texte: "Au compte 121 — Report à nouveau" },
      { id: 'e', texte: "Au compte 777" },
    ],
    reponseCorrecte: 'b',
    explication: "Pour le bénéficiaire d'un apport partiel d'actif, l'opération s'analyse comme une augmentation de capital : les éléments sont repris à la valeur de l'acte d'apport et l'écart entre l'apport net et le nominal émis va au compte 1052 Primes d'apport — 8 200 actions à 15 000 contre un nominal de 10 000, soit 41 000 000. À noter la reprise des créances douteuses en brut (4162 : 7 200 000) avec leur dépréciation (4912 : 5 760 000).",
    articleRef: "SYSCOHADA — Application 120",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '8.1',
    titre: "Fusion, scission, apport partiel d'actif : les notions (art. 189-192, 195-196)",
    navLabel: "Notions",
    blocs: [
      {
        type: 'carte',
        titre: "Trois opérations, un régime commun",
        tableau: {
          entetes: ["Opération", "Définition", "Sort de la société d'origine"],
          lignes: [
            ["Fusion (art. 189)", "Deux ou plusieurs sociétés se réunissent pour n'en former qu'une seule — par création d'une société nouvelle (fusion-réunion) ou par absorption (fusion-absorption). Une société même en liquidation peut y participer.", "Les sociétés absorbées disparaissent : dissolution **sans liquidation**"],
            ["Scission (art. 190)", "Le patrimoine d'une société est partagé entre plusieurs sociétés existantes ou nouvelles.", "La société scindée disparaît"],
            ["Apport partiel d'actif (art. 195)", "Apport d'une **branche autonome d'activité** à une société préexistante ou à créer ; soumis au régime de la scission.", "La société apporteuse **ne disparaît pas** et reçoit des titres"],
          ],
        },
        note: "Les opérations peuvent intervenir entre sociétés de forme différente (art. 196), et entre sociétés d'États parties différents — chacune restant soumise à l'Acte uniforme dans l'État de son siège (art. 199).",
      },
      {
        type: 'filet',
        titre: "Les effets (art. 191) et la date d'effet (art. 192)",
        texte: "La fusion ou la scission entraîne la **dissolution sans liquidation** des sociétés qui disparaissent et la **transmission universelle** de leur patrimoine aux bénéficiaires, dans l'état où il se trouve à la date de réalisation définitive ; simultanément, leurs associés deviennent associés des bénéficiaires. Une **soulte** est possible, plafonnée à **10 %** de la valeur d'échange des titres attribués. Il n'est pas procédé à l'échange pour les titres détenus par la société bénéficiaire ou par la société qui disparaît — la clef des fusions-renonciations. Date d'effet : immatriculation au RCCM pour les sociétés nouvelles ; sinon, dernière assemblée d'approbation, sauf clause contraire bornée — ni après la clôture de l'exercice en cours des bénéficiaires, ni avant la clôture du dernier exercice clos des sociétés apporteuses.",
      },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[6] },
    ],
  },
  {
    numero: '8.2',
    titre: "Le processus : projet, publicité, décision (art. 193-198)",
    navLabel: "Processus",
    blocs: [
      {
        type: 'carte',
        titre: "De la négociation à la déclaration de conformité",
        tableau: {
          entetes: ["Étape", "Règle"],
          lignes: [
            ["Projet de fusion ou de scission", "Arrêté par les organes de gestion de chaque société ; huit séries de mentions : identification des sociétés, motifs et conditions, **désignation et évaluation de l'actif et du passif transmis**, modalités de remise des titres et date d'effet comptable, dates des comptes de référence, **rapport d'échange et soulte**, **montant prévu de la prime de fusion**, droits particuliers (art. 193)."],
            ["Publicité", "Dépôt au RCCM et avis dans un journal d'annonces légales par chaque société, **un mois au moins** avant la première assemblée appelée à statuer (art. 194)."],
            ["Décision", "Pour chaque société : conditions requises pour la **modification des statuts**, selon les procédures d'augmentation de capital et de dissolution ; **unanimité** si l'opération augmente les engagements des associés — nullités à la clé (art. 197)."],
            ["Déclaration de conformité", "À peine de nullité, dépôt au greffe d'une déclaration relatant tous les actes effectués et affirmant la conformité de l'opération à l'Acte uniforme (art. 198)."],
          ],
        },
      },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[5] },
    ],
  },
  {
    numero: '8.3',
    titre: "Évaluer les apports et calculer la parité",
    navLabel: "Parité et prime",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le Guide fixe la règle d'évaluation — qui **n'appartient pas aux entités** : si la fusion emporte une **prise de contrôle**, les apports sont évalués à la **valeur réelle** (logique d'acquisition des comptes consolidés) ; s'il s'agit de l'absorption d'une **filiale détenue en permanence à 100 %**, les apports restent à la **valeur comptable**. Les actifs incorporels absents du bilan de l'absorbée (droit au bail, procédés, marques) apportés à la valeur réelle s'inscrivent au débit du compte 215 Fonds commercial chez l'absorbante. La **parité d'échange** rapporte la valeur d'échange du titre de l'absorbée à celle du titre de l'absorbante.",
      },
      {
        type: 'carte',
        titre: "Application 116 — Le calcul en cascade",
        liste: [
          "**Actif net apporté** de B (valeurs réelles) : actifs 130 000 000 − emprunts 40 000 000 = **90 000 000** — vérifié par l'autre chemin : capitaux propres 72 500 000 + plus-values (7 500 000 + 10 000 000) = 90 000 000. Valeur de la part B : 90 000 000 / 6 000 = **15 000**.",
          "**Parité** : 15 000 / 9 000 → **5 actions A contre 3 parts B** ; titres A à émettre : 6 000 × 5/3 = **10 000**.",
          "**Augmentation de capital** : 10 000 × 5 000 = **50 000 000** ; **prime de fusion** : 90 000 000 − 50 000 000 = **40 000 000** (1053).",
        ],
        note: "Le texte officiel du Guide numérote les étapes 3, 5 et 6 sans étape 4 apparente — anomalie signalée dans la source et conservée telle quelle.",
      },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[9] },
    ],
  },
  {
    numero: '8.4',
    titre: "Comptabilisation de la fusion simple (Application 116)",
    navLabel: "Fusion simple",
    blocs: [
      {
        type: 'carte',
        titre: "Chez l'absorbante A : promesse, réalisation, frais",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["4614", "", "Apporteurs, entité absorbée B, compte d'apports", "90 000 000", ""],
            ["", "1013", "Capital souscrit, appelé, versé, non amorti", "", "50 000 000"],
            ["", "1053", "Primes de fusion", "", "40 000 000"],
            ["211 à 521", "", "Réalisation : actifs aux valeurs d'apport (frais de développement 3 000 000, terrains 37 500 000, bâtiments 50 000 000, matériels 9 500 000, stocks 15 000 000, clients 5 000 000, banques 10 000 000)", "130 000 000", ""],
            ["", "162", "Emprunts transmis", "", "40 000 000"],
            ["", "4614", "Apporteurs, entité absorbée B, compte d'apports", "", "90 000 000"],
          ],
        },
        note: "Frais externes de fusion (16 000 000) : option 1 — charges (6324 honoraires 15 000 000, 6318 frais bancaires 1 000 000) ; option 2 — imputation sur la prime (débit 1053 / crédit 521).",
      },
      {
        type: 'carte',
        titre: "Chez l'absorbée B : le cycle de dissolution sans liquidation",
        tableau: {
          entetes: ["Étape", "Écriture"],
          lignes: [
            ["1. Réalisation des apports", "Débit 4718 Apport, compte de fusion 90 000 000, débit des amortissements (2811, 2831, 2841) et des emprunts transmis / crédit des actifs en valeurs brutes et crédit 1381 Résultat de fusion 17 500 000 (plus-values d'apport : terrains +7 500 000, bâtiments +10 000 000)"],
            ["2. Rémunération des apports", "Débit 502 Actions 90 000 000 / crédit 4718 — B reçoit les 10 000 titres A"],
            ["3. Constatation des droits des associés", "Débit 1013 60 000 000, débit 11 Réserves 12 500 000, débit 1381 17 500 000 / crédit 4618 Apporteurs, titres à échanger 90 000 000"],
            ["4. Désintéressement", "Débit 4618 / crédit 502 pour 90 000 000 — les titres A sont remis aux associés de B, tous les comptes sont soldés"],
          ],
        },
      },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[8] },
    ],
  },
  {
    numero: '8.5',
    titre: "Participations préexistantes : renonciation, actions propres, réciprocité",
    navLabel: "Participations croisées",
    blocs: [
      {
        type: 'carte',
        titre: "Application 117 — L'absorbante détient l'absorbée (fusion-renonciation)",
        texte: "A détient 40 % de B (coût 10 000 000). L'article 191 interdit d'échanger les titres que la bénéficiaire détient dans la société qui disparaît : l'augmentation de capital ne rémunère que les 60 % extérieurs. Valeurs d'échange : B = 20 000, A = 30 000 → 2 actions A contre 3 actions B ; 3 000 titres B échangés → 2 000 titres A émis (capital 20 000 000, prime 40 000 000). Les titres B détenus sont annulés contre leur quote-part d'apport (40 000 000) : l'écart avec leur coût (10 000 000) est un **boni de fusion de 30 000 000**, logé en 1053.",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["4614", "", "Apporteurs, entité absorbée B", "100 000 000", ""],
            ["", "1013", "Capital", "", "20 000 000"],
            ["", "1053", "Prime de fusion (40 000 000) + boni (30 000 000)", "", "70 000 000"],
            ["", "26", "Titres de participation B (annulation au coût)", "", "10 000 000"],
          ],
        },
      },
      {
        type: 'carte',
        titre: "Application 118 — L'absorbée détient l'absorbante ; Application 119 — participations réciproques",
        liste: [
          "**L'absorbée détient l'absorbante** : l'apport comprend des actions de l'absorbante, reçues au débit de **5021 Actions propres** (2 000 actions A à 12 000 = 24 000 000), puis annulées par **réduction de capital** — débit 101 pour le nominal (20 000 000) et débit 1053 pour l'excédent (4 000 000) / crédit 5021. Prime finale : 15 000 000 − 4 000 000 = 11 000 000.",
          "**Participations réciproques** : les valeurs d'échange se déterminent par un **système de deux équations à deux inconnues** — 10 000 A = 500 B + 185 000 000 et 5 000 B = 500 A + 140 000 000, d'où A = 20 000 et B = 30 000 (3 A contre 2 B). L'opération cumule ensuite renonciation (boni de 10 000 000 sur les titres B détenus par A) et annulation d'actions propres par réduction de capital (5 000 000 au nominal, 5 000 000 sur la prime). Prime finale : 72 500 000.",
        ],
        note: "Deux anomalies du texte officiel sont conservées et signalées dans la source : la ventilation des comptes crédités de l'étape 1 chez B (App. 118) ne correspond pas aux valeurs du bilan, et l'App. 119 mentionne un compte « 10523 » inexistant au plan — lu 1053 par cohérence.",
      },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[14] },
    ],
  },
  {
    numero: '8.6',
    titre: "L'apport partiel d'actif (Application 120)",
    navLabel: "Apport partiel",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Y apporte à X une branche autonome : fonds commercial évalué 25 000 000 (absent de son bilan), matériels 45 000 000, stocks 36 000 000, créances brutes 35 580 000 — dont une créance compromise de 7 200 000 dépréciée à 80 % — et dettes fournisseurs 12 820 000. **Apport net : 123 000 000.** Rémunération en actions X de nominal 10 000, émises à 15 000 : 123 000 000 / 15 000 = **8 200 actions**. Pour la bénéficiaire, tout se passe comme une augmentation de capital : l'écart entre l'apport net et le nominal émis va au compte **1052 Primes d'apport**.",
      },
      {
        type: 'carte',
        titre: "Écritures chez la bénéficiaire X",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["4614", "", "Apporteurs, entité Y, compte d'apports", "123 000 000", ""],
            ["", "1013", "Capital souscrit, appelé, versé, non amorti (8 200 × 10 000)", "", "82 000 000"],
            ["", "1052", "Primes d'apport (8 200 × 5 000)", "", "41 000 000"],
            ["215", "", "Fonds commercial", "25 000 000", ""],
            ["2411", "", "Matériels industriels", "45 000 000", ""],
            ["311", "", "Stocks", "36 000 000", ""],
            ["411", "", "Clients (35 580 000 − 7 200 000)", "28 380 000", ""],
            ["4162", "", "Créances douteuses", "7 200 000", ""],
            ["", "401", "Fournisseurs", "", "12 820 000"],
            ["", "4912", "Dépréciations des créances douteuses (80 %)", "", "5 760 000"],
            ["", "4614", "Apporteurs, entité Y (liquidation des apports)", "", "123 000 000"],
          ],
        },
        note: "Deux traits distinctifs : le fonds commercial, sans valeur au bilan de l'apporteuse, entre à sa valeur d'apport (215) ; les créances douteuses sont reprises **en brut** avec leur dépréciation, préservant l'information sur le risque. Chez l'apporteuse Y — qui survit —, les titres X reçus rejoignent son portefeuille (participation ou titres immobilisés selon l'intention, chapitre 7).",
      },
      { type: 'controle', question: QCM[15] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas-1',
    titre: "Cas 1 — MOERO BOISSONS absorbe LUAPULA EAUX : fusion simple",
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
    id: 'cas-2',
    titre: "Cas 2 — TSHUAPA PALM absorbe sa participation : fusion-renonciation",
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
    id: 'cas-3',
    titre: "Cas 3 — ARUWIMI AGRO filialise sa branche transport : apport partiel d'actif",
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
        correction: "ARUWIMI survit et reçoit 4 800 actions LINDI (60 000 000) : sortie des éléments de la branche à leur VNC, constatation du résultat d'apport (plus-value de 9 000 000 sur les camions) et entrée des titres — classés selon l'intention : titres de participation (26) si l'apport lui confère contrôle ou influence sur LINDI, sinon titres immobilisés (chapitre 7). L'opération filialise la branche : l'activité continue, mais dans un patrimoine distinct.",
      },
    ],
  },
  {
    id: 'cas-4',
    titre: "Cas 4 — Questions transversales de régularité",
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
]

const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 8,
  id: 'ue3-chapitre-8',
  titre: "Les fusions et opérations assimilées",
  sousTitre: "AUSCGIE, art. 189-199 · SYSCOHADA, Applications 116-120",
  infoBulle: "Fusion, scission et apport partiel d'actif : transmission universelle, soulte plafonnée à 10 %, projet et publicité, décision aux conditions de modification des statuts — et la comptabilisation complète : parité, prime de fusion (1053), cycle de l'absorbée (4718, 1381, 4618), fusion-renonciation et boni, actions propres, participations réciproques, prime d'apport (1052).",
  loiRef: "AUSCGIE (30 janvier 2014) · SYSCOHADA révisé (AUDCIF)",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Définir fusion, scission et apport partiel d'actif et leurs effets : transmission universelle, dissolution sans liquidation, soulte de 10 % (art. 189-192, 195)",
    "Suivre le processus : projet de fusion, publicité un mois avant, décision, unanimité en cas d'augmentation des engagements, déclaration de conformité (art. 193-198)",
    "Évaluer les apports (valeur réelle ou comptable selon le contrôle), calculer parité, augmentation de capital et prime de fusion",
    "Comptabiliser la fusion chez l'absorbante (4614, 1013, 1053) et chez l'absorbée (4718, 1381, 4618, 502) — Application 116",
    "Traiter les participations préexistantes : renonciation et boni, actions propres et réduction de capital, système à deux inconnues, et l'apport partiel d'actif (1052)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Fusion : réunion par création d'une société nouvelle ou par absorption ; transmission universelle du patrimoine et dissolution sans liquidation ; les associés des sociétés qui disparaissent deviennent associés des bénéficiaires (art. 189, 191).",
    "Soulte plafonnée à 10 % de la valeur d'échange ; pas d'échange pour les titres détenus par la bénéficiaire ou par la société qui disparaît (art. 191).",
    "Projet de fusion complet (art. 193), déposé et publié un mois avant la première assemblée (art. 194) ; décision aux conditions de modification des statuts, unanimité si les engagements augmentent ; déclaration de conformité à peine de nullité (art. 197-198).",
    "Évaluation imposée : valeur réelle en cas de prise de contrôle, valeur comptable pour la filiale à 100 % ; parité = valeur du titre absorbé / valeur du titre absorbant.",
    "Chez l'absorbante : 4614 → 1013 (nominal) + 1053 (prime de fusion) ; frais externes en charges ou imputés sur la prime.",
    "Chez l'absorbée : 4718 (apport), 1381 (résultat de fusion = plus-values d'apport), 502 (titres reçus), 4618 (droits des associés), désintéressement final.",
    "Renonciation : l'augmentation ne rémunère que les associés extérieurs ; l'annulation des titres détenus dégage un boni (ou mali) logé en 1053. Actions propres reçues (5021) : annulation par réduction de capital, excédent sur la prime. Participations réciproques : système à deux inconnues.",
    "Apport partiel d'actif : régime de la scission, l'apporteuse survit et reçoit des titres ; chez la bénéficiaire, augmentation de capital avec prime d'apport (1052), créances douteuses reprises en brut avec leur dépréciation.",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du GIE (AUSCGIE)", precision: "art. 189-192 (fusion, scission, effets, dates), 193-194 (projet et publicité), 195-196 (apport partiel d'actif, formes différentes), 197-199 (décision, déclaration de conformité, opérations transfrontalières)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Guide d'application, chapitre 38", precision: "principes d'évaluation des apports ; Applications 116 (fusion simple), 117 (fusion-renonciation et boni), 118 (absorbée détenant l'absorbante, actions propres), 119 (participations réciproques) et 120 (apport partiel d'actif)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Plan de comptes", precision: "comptes 1013, 1052, 1053, 1381, 215, 26, 4614, 4618, 4718, 5021, 502" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE (Acte uniforme révisé du 30 janvier 2014) · SYSCOHADA révisé — Guide d'application et plan de comptes (AUDCIF)",
}

export default chapitre
