import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 3 — CHAPITRE 9 : LA DISSOLUTION ET LA LIQUIDATION
// AUSCGIE art. 200-222 (causes de dissolution, effets, liquidation amiable,
// liquidateur, clôture, prescriptions). SYSCOHADA : Application 122 du Guide
// (deux méthodes : compte 1384 direct ou passage par 837/847), avec l'anomalie
// du texte officiel (1374 défini, 1384 utilisé) signalée telle quelle.
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1',
    question: "Parmi les causes de dissolution énumérées par l'article 200 de l'AUSCGIE figure notamment :",
    options: [
      { id: 'a', texte: "Le départ à la retraite du gérant" },
      { id: 'b', texte: "La dissolution anticipée prononcée par la juridiction compétente à la demande d'un associé pour justes motifs — inexécution de ses obligations par un associé, mésentente empêchant le fonctionnement normal de la société" },
      { id: 'c', texte: "La baisse du chiffre d'affaires de plus de 20 %" },
      { id: 'd', texte: "Le refus d'un dividende par l'assemblée" },
      { id: 'e', texte: "Le changement de commissaire aux comptes" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 200 énumère sept causes : expiration du terme, réalisation ou extinction de l'objet, annulation du contrat de société, décision des associés aux conditions de modification des statuts, dissolution anticipée judiciaire pour justes motifs (inexécution par un associé, mésentente paralysante), jugement de liquidation des biens, et toute autre cause prévue par les statuts.",
    articleRef: "AUSCGIE, art. 200",
  },
  {
    id: 'q2',
    question: "À partir de quand la dissolution produit-elle effet à l'égard des tiers ?",
    options: [
      { id: 'a', texte: "Dès la décision des associés" },
      { id: 'b', texte: "À compter de sa publication par avis dans un journal d'annonces légales de l'État partie du siège social" },
      { id: 'c', texte: "Dès la nomination du liquidateur" },
      { id: 'd', texte: "À la clôture de la liquidation" },
      { id: 'e', texte: "Dès la cessation des paiements" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 201, alinéa 1er : la dissolution n'a d'effet à l'égard des tiers qu'à compter de sa publication par avis inséré dans un journal habilité à recevoir les annonces légales de l'État partie du siège. L'article 202 complète la publicité : dépôt des actes ou procès-verbaux et modification de l'inscription au RCCM.",
    articleRef: "AUSCGIE, art. 201-202",
  },
  {
    id: 'q3',
    question: "Que devient la personnalité morale de la société dissoute ?",
    options: [
      { id: 'a', texte: "Elle disparaît immédiatement" },
      { id: 'b', texte: "Elle subsiste pour les besoins de la liquidation et jusqu'à la publication de la clôture de celle-ci" },
      { id: 'c', texte: "Elle est transférée au liquidateur" },
      { id: 'd', texte: "Elle est suspendue pendant trois ans" },
      { id: 'e', texte: "Elle subsiste indéfiniment" },
    ],
    reponseCorrecte: 'b',
    explication: "Articles 201, alinéa 3, et 205 : la personnalité morale subsiste pour les besoins de la liquidation et jusqu'à la publication de sa clôture. C'est ce qui permet à la société de continuer d'agir — réaliser l'actif, payer les dettes — sous la signature du liquidateur, la mention « société en liquidation » et le nom du liquidateur devant figurer sur tous les actes et documents destinés aux tiers (art. 204).",
    articleRef: "AUSCGIE, art. 201, 204 et 205",
  },
  {
    id: 'q4',
    question: "Quel est le sort du patrimoine d'une société unipersonnelle dissoute dont l'associé unique est une personne morale ?",
    options: [
      { id: 'a', texte: "Liquidation obligatoire comme pour toute société" },
      { id: 'b', texte: "Transmission universelle du patrimoine à l'associé unique, sans liquidation — les créanciers pouvant faire opposition dans les trente jours de la publication" },
      { id: 'c', texte: "Attribution au ministère public" },
      { id: 'd', texte: "Partage entre les salariés" },
      { id: 'e', texte: "Mise sous séquestre pendant un an" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 201, alinéa 4 : la dissolution d'une société dont tous les titres sont détenus par un seul associé entraîne la transmission universelle du patrimoine à cet associé, sans liquidation ; les créanciers peuvent former opposition dans les trente jours de la publication, la juridiction pouvant rejeter l'opposition ou ordonner le remboursement ou la constitution de garanties. La transmission n'est réalisée qu'à l'issue de ce délai ou du règlement de l'opposition. Exception (al. 5) : si l'associé unique est une **personne physique**, la dissolution entraîne de plein droit la mise en liquidation.",
    articleRef: "AUSCGIE, art. 201",
  },
  {
    id: 'q5',
    question: "Comment le liquidateur est-il nommé lorsque la liquidation est décidée par les associés ?",
    options: [
      { id: 'a', texte: "Toujours par la juridiction compétente" },
      { id: 'b', texte: "Selon la forme sociale : unanimité en SNC ; unanimité des commandités et majorité en capital des commanditaires en SCS ; majorité en capital en SARL ; conditions des AGE dans les sociétés par actions" },
      { id: 'c', texte: "Par le commissaire aux comptes" },
      { id: 'd', texte: "Par le greffier du RCCM" },
      { id: 'e', texte: "À la majorité simple dans toutes les formes" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 206 décline la nomination par forme sociale. Le liquidateur peut être choisi parmi les associés ou les tiers, et être une personne morale (art. 207) ; à défaut de nomination par les associés, il est désigné par décision de justice à la demande de tout intéressé (art. 208). Sa rémunération est fixée par la décision qui le nomme (art. 210) et il est révocable selon les mêmes formes — tout associé pouvant en demander la révocation judiciaire pour motifs légitimes (art. 211).",
    articleRef: "AUSCGIE, art. 206-211",
  },
  {
    id: 'q6',
    question: "La cession d'un actif de la société en liquidation au liquidateur lui-même est :",
    options: [
      { id: 'a', texte: "Libre" },
      { id: 'b', texte: "Interdite — comme la cession à ses employés ou à leurs conjoints, ascendants ou descendants" },
      { id: 'c', texte: "Possible avec l'accord du commissaire aux comptes" },
      { id: 'd', texte: "Possible sur autorisation judiciaire" },
      { id: 'e', texte: "Possible si le prix est supérieur à la valeur comptable" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 214 pose une interdiction absolue : la cession de tout ou partie de l'actif au liquidateur, à ses employés ou à leurs conjoints, ascendants ou descendants est interdite. L'article 213 soumet par ailleurs la cession à un ancien dirigeant, associé en nom, commandité ou commissaire aux comptes à l'autorisation de la juridiction compétente, sauf consentement unanime des associés. Les opérations réalisées en violation des articles 206, 211 al. 1er, 213, 214 et 215 sont nulles (art. 215-1).",
    articleRef: "AUSCGIE, art. 213-215-1",
  },
  {
    id: 'q7',
    question: "Dans quel délai la clôture de la liquidation doit-elle intervenir ?",
    options: [
      { id: 'a', texte: "Un an" },
      { id: 'b', texte: "Trois ans à compter de la dissolution ; à défaut, le ministère public ou tout intéressé peut saisir la juridiction compétente pour qu'il soit procédé à la liquidation ou à son achèvement" },
      { id: 'c', texte: "Cinq ans" },
      { id: 'd', texte: "Dix ans" },
      { id: 'e', texte: "Aucun délai n'est fixé" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 216 : la clôture doit intervenir dans un délai de trois ans à compter de la dissolution ; à défaut, le ministère public ou tout intéressé peut saisir la juridiction du siège afin qu'il soit procédé à la liquidation ou, si elle a commencé, à son achèvement.",
    articleRef: "AUSCGIE, art. 216",
  },
  {
    id: 'q8',
    question: "Comment se clôture la liquidation ?",
    options: [
      { id: 'a', texte: "Par simple lettre du liquidateur au greffe" },
      { id: 'b', texte: "Les associés sont convoqués pour statuer sur les comptes définitifs, donner quitus au liquidateur et constater la clôture ; les comptes sont déposés au RCCM et la radiation demandée dans le mois de la publication de la clôture" },
      { id: 'c', texte: "Par décision du commissaire aux comptes" },
      { id: 'd', texte: "Automatiquement après trois ans" },
      { id: 'e', texte: "Par la seule publication d'un avis" },
    ],
    reponseCorrecte: 'b',
    explication: "Article 217 : convocation des associés en fin de liquidation pour statuer sur les comptes définitifs, le quitus de gestion et la décharge du mandat du liquidateur, et constater la clôture — à défaut, désignation judiciaire d'un mandataire ad hoc. Si l'assemblée ne peut délibérer ou refuse d'approuver, la juridiction statue en ses lieu et place (art. 218). Les comptes définitifs sont déposés au RCCM avec la décision (art. 219), et le liquidateur demande la radiation dans le mois de la publication de la clôture (art. 220).",
    articleRef: "AUSCGIE, art. 217-220",
  },
  {
    id: 'q9',
    question: "Quelle est la prescription de l'action en responsabilité contre le liquidateur ?",
    options: [
      { id: 'a', texte: "Un an" },
      { id: 'b', texte: "Trois ans à compter du fait dommageable ou, s'il a été dissimulé, de sa révélation — dix ans si le fait est qualifié crime" },
      { id: 'c', texte: "Cinq ans dans tous les cas" },
      { id: 'd', texte: "Trente ans" },
      { id: 'e', texte: "Le liquidateur n'est pas responsable" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 221 : le liquidateur est responsable envers la société comme envers les tiers des conséquences dommageables de ses fautes ; l'action sociale ou individuelle se prescrit par trois ans à compter du fait dommageable ou de sa révélation en cas de dissimulation, et par dix ans si le fait est qualifié crime. À distinguer de l'action contre les associés non liquidateurs, qui se prescrit par cinq ans à compter de la publication de la dissolution au RCCM (art. 222).",
    articleRef: "AUSCGIE, art. 221-222",
  },
  {
    id: 'q10',
    question: "Quels comptes le SYSCOHADA prévoit-il pour les opérations de liquidation ?",
    options: [
      { id: 'a', texte: "601 et 701" },
      { id: 'b', texte: "837 Charges liées aux opérations de liquidation, 847 Produits liés aux opérations de liquidation, et un compte de résultat de liquidation" },
      { id: 'c', texte: "681 et 781" },
      { id: 'd', texte: "1013 et 4619 uniquement" },
      { id: 'e', texte: "Aucun compte spécifique" },
    ],
    reponseCorrecte: 'b',
    explication: "Le Guide (chapitre 40) désigne les comptes 837 (charges) et 847 (produits) liés aux opérations de liquidation, et un compte de résultat de liquidation. Anomalie du texte officiel signalée dans la source : la définition initiale vise le compte 1374, mais toutes les écritures utilisent le compte 1384 — incohérence non corrigée, les écritures reproduites retenant 1384. Le Guide admet aussi de mouvementer directement le résultat de liquidation, sans transiter par 837/847.",
    articleRef: "SYSCOHADA — Guide d'application, chapitre 40 (Application 122)",
  },
  {
    id: 'q11',
    question: "Dans l'Application 122, la cession du bâtiment industriel (VNC 13 500 000, prix 25 000 000) se traduit, en première méthode, par :",
    options: [
      { id: 'a', texte: "Un seul crédit de 11 500 000 au compte de résultat de liquidation" },
      { id: 'b', texte: "Deux écritures : encaissement (débit 521 25 000 000 / crédit résultat de liquidation) puis sortie du bien (débit résultat de liquidation 13 500 000 et débit 2831 Amortissements 26 500 000 / crédit 231 Bâtiments 40 000 000)" },
      { id: 'c', texte: "Un débit 816 et un crédit 826" },
      { id: 'd', texte: "Un crédit 777 de 11 500 000" },
      { id: 'e', texte: "Aucune écriture avant la clôture" },
    ],
    reponseCorrecte: 'b',
    explication: "En liquidation, le compte de résultat de liquidation reçoit brut les produits de réalisation et les valeurs comptables sorties : le prix (25 000 000) au crédit, la valeur nette (13 500 000) au débit avec reprise des amortissements (2831 : 26 500 000) pour solder le compte d'immobilisation à sa valeur brute (40 000 000). La plus-value (11 500 000) apparaît par différence dans le compte de résultat de liquidation.",
    articleRef: "SYSCOHADA — Application 122",
  },
  {
    id: 'q12',
    question: "Dans l'Application 122, le solde du compte de résultat de liquidation s'établit à :",
    options: [
      { id: 'a', texte: "Une perte de 7 100 000" },
      { id: 'b', texte: "Un boni de 7 100 000 (produits 37 150 000 − charges 30 050 000), la banque présentant un solde débiteur de 41 100 000" },
      { id: 'c', texte: "Zéro" },
      { id: 'd', texte: "Un boni de 34 000 000" },
      { id: 'e', texte: "Un boni de 41 100 000" },
    ],
    reponseCorrecte: 'b',
    explication: "Produits de réalisation : 25 000 000 (bâtiment) + 4 500 000 (matériel) + 3 750 000 (stocks) + 3 900 000 (reprise de dépréciation des créances) = 37 150 000. Charges : 13 500 000 + 5 000 000 + 4 050 000 + 3 000 000 (perte sur créances douteuses) + 1 500 000 (escomptes) + 3 000 000 (frais de liquidation) = 30 050 000. Boni : 7 100 000. Bilan de clôture : banques 41 100 000 / capital 20 000 000, réserves 14 000 000, boni 7 100 000.",
    articleRef: "SYSCOHADA — Application 122",
  },
  {
    id: 'q13',
    question: "Comment s'enregistre le partage final entre associés (Application 122) ?",
    options: [
      { id: 'a', texte: "Débit 521 / crédit 101 pour 41 100 000" },
      { id: 'b', texte: "Débit 101 Capital 20 000 000, débit 11 Réserves 14 000 000, débit résultat de liquidation 7 100 000 / crédit 4619 Apporteurs, capital à rembourser 41 100 000 ; puis débit 4619 / crédit 521 Banques" },
      { id: 'c', texte: "Débit 465 / crédit 521 pour 41 100 000" },
      { id: 'd', texte: "Débit 1013 / crédit 1291" },
      { id: 'e', texte: "Aucune écriture : le solde reste en banque" },
    ],
    reponseCorrecte: 'b',
    explication: "Le partage solde les capitaux propres par la dette envers les associés (4619 — Apporteurs, capital à rembourser, déjà rencontré au chapitre 5), puis éteint cette dette par la trésorerie disponible. Le boni de liquidation (7 100 000) revient aux associés en sus de leurs apports et réserves — traduction du droit sur l'actif net de l'article 53, 2°.",
    articleRef: "SYSCOHADA — Application 122 ; AUSCGIE, art. 53",
  },
  {
    id: 'q14',
    question: "Quelle est la seconde méthode d'enregistrement de la liquidation admise par le Guide ?",
    options: [
      { id: 'a', texte: "L'enregistrement extra-comptable" },
      { id: 'b', texte: "L'inscription préalable des opérations en charges (837) et produits (847) liés à la liquidation, regroupés en fin d'opérations dans le résultat de liquidation — pour le même solde de 7 100 000" },
      { id: 'c', texte: "L'imputation directe sur le capital" },
      { id: 'd', texte: "Le passage par les comptes 601/701" },
      { id: 'e', texte: "L'utilisation du compte 1301" },
    ],
    reponseCorrecte: 'b',
    explication: "Deuxième méthode de l'Application 122 : chaque contrepartie du résultat de liquidation devient 837 (débit) ou 847 (crédit) ; en fin d'opérations, l'écriture de regroupement débite 847 pour 37 150 000 et crédite 837 pour 30 050 000 et le résultat de liquidation pour 7 100 000. Le résultat est identique — la seconde méthode conserve la traçabilité des charges et produits de la période de liquidation.",
    articleRef: "SYSCOHADA — Application 122",
  },
  {
    id: 'q15',
    question: "Les règles de liquidation des articles 203 et suivants s'appliquent-elles à une liquidation ouverte dans le cadre d'une procédure collective ?",
    options: [
      { id: 'a', texte: "Oui, dans tous les cas" },
      { id: 'b', texte: "Non : elles ne s'appliquent pas lorsque la liquidation intervient dans le cadre de l'Acte uniforme portant organisation des procédures collectives d'apurement du passif" },
      { id: 'c', texte: "Oui, mais avec l'accord du juge" },
      { id: 'd', texte: "Uniquement pour les sociétés par actions" },
      { id: 'e', texte: "Uniquement en l'absence de créanciers" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 203 délimite le champ : les dispositions s'appliquent à toute liquidation de société commerciale organisée à l'amiable (statuts ou accord des associés) ou ordonnée par décision de justice au sens de l'article 223, 2° — mais **pas** lorsque la liquidation intervient dans le cadre de l'Acte uniforme portant organisation des procédures collectives d'apurement du passif, qui a ses règles propres.",
    articleRef: "AUSCGIE, art. 203",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '9.1',
    titre: "Les causes de dissolution et leurs effets (art. 200-205)",
    navLabel: "Dissolution",
    blocs: [
      {
        type: 'carte',
        titre: "Les sept causes de dissolution (art. 200)",
        liste: [
          "L'**expiration du temps** pour lequel la société a été constituée.",
          "La **réalisation ou l'extinction de son objet**.",
          "L'**annulation** du contrat de société.",
          "La **décision des associés**, aux conditions prévues pour modifier les statuts.",
          "La **dissolution anticipée judiciaire**, à la demande d'un associé pour justes motifs — notamment inexécution de ses obligations par un associé ou mésentente empêchant le fonctionnement normal de la société.",
          "L'effet d'un **jugement ordonnant la liquidation des biens**.",
          "Toute autre cause prévue par les **statuts**.",
        ],
        note: "S'y ajoutent les dissolutions sanctions déjà rencontrées : capital sous le minimum légal non rétabli (art. 66), capitaux propres inférieurs à la moitié du capital non régularisés (art. 667-668 et 373, chapitre 5), réunion de tous les titres en une seule main non régularisée dans les formes qui l'excluent (art. 60).",
      },
      {
        type: 'filet',
        titre: "Effets : publicité, liquidation de plein droit, survie de la personnalité morale (art. 201-205)",
        texte: "La dissolution n'a d'effet **à l'égard des tiers** qu'à compter de sa publication par avis dans un journal d'annonces légales de l'État partie du siège (art. 201) ; s'y ajoutent le dépôt des actes et la modification de l'inscription au RCCM (art. 202). La dissolution d'une société **pluripersonnelle** entraîne de plein droit sa mise en liquidation, et la **personnalité morale subsiste** pour les besoins de la liquidation jusqu'à la publication de sa clôture (art. 201 et 205). La société est en liquidation dès l'instant de sa dissolution, et la mention « société en liquidation » ainsi que le nom du ou des liquidateurs doivent figurer sur tous les actes et documents destinés aux tiers (art. 204).",
      },
      {
        type: 'carte',
        titre: "Le cas unipersonnel (art. 201, al. 4-5)",
        texte: "La dissolution d'une société dont tous les titres sont détenus par un **seul associé** entraîne la **transmission universelle du patrimoine** à cet associé, **sans liquidation**. Les créanciers peuvent former opposition devant la juridiction compétente dans les **trente jours** de la publication ; celle-ci rejette l'opposition ou ordonne le remboursement des créances ou la constitution de garanties suffisantes. La transmission n'est réalisée — et la société ne disparaît — qu'à l'issue du délai d'opposition ou du règlement de celle-ci.",
        note: "Exception essentielle : ce mécanisme **ne s'applique pas** lorsque l'associé unique est une **personne physique** ; la dissolution entraîne alors de plein droit la mise en liquidation.",
      },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[3] },
    ],
  },
  {
    numero: '9.2',
    titre: "Le liquidateur : nomination, pouvoirs encadrés, responsabilité",
    navLabel: "Le liquidateur",
    blocs: [
      {
        type: 'carte',
        titre: "Nomination et statut (art. 206-212)",
        tableau: {
          entetes: ["Forme sociale", "Majorité de nomination (art. 206)"],
          lignes: [
            ["Société en nom collectif", "Unanimité des associés"],
            ["Société en commandite simple", "Unanimité des commandités et majorité en capital des commanditaires"],
            ["Société à responsabilité limitée", "Majorité en capital des associés"],
            ["Sociétés par actions", "Conditions de quorum et de majorité des assemblées générales extraordinaires"],
          ],
        },
        note: "Le liquidateur peut être un associé ou un tiers, personne physique ou morale (art. 207) ; à défaut de nomination par les associés, il est désigné par décision de justice à la demande de tout intéressé (art. 208). Plusieurs liquidateurs peuvent exercer séparément mais présentent un rapport commun (art. 209). Rémunération fixée par la décision de nomination (art. 210) ; révocation dans les mêmes formes, ou judiciaire pour motifs légitimes à la demande de tout associé (art. 211). L'acte de nomination est publié : nomination et révocation ne sont opposables aux tiers qu'à compter de cette publication (art. 212).",
      },
      {
        type: 'filet',
        titre: "Les garde-fous des cessions d'actifs (art. 213-215-1)",
        texte: "**Interdiction absolue** (art. 214) : la cession de tout ou partie de l'actif au **liquidateur**, à ses employés ou à leurs conjoints, ascendants ou descendants. **Autorisation judiciaire requise** (art. 213), sauf consentement unanime des associés : la cession à une personne ayant eu dans la société la qualité d'associé en nom, de commandité, de gérant, d'administrateur, d'administrateur général, de directeur général, d'autre dirigeant social ou de commissaire aux comptes — le liquidateur et le commissaire aux comptes entendus. **Cession globale de l'actif ou apport à une autre société** (art. 215) : autorisée aux majorités propres à chaque forme (unanimité en SNC, etc.). Les délibérations et opérations prises en violation des articles 206, 211 al. 1er, 213, 214 et 215 sont **nulles** (art. 215-1).",
      },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[14] },
    ],
  },
  {
    numero: '9.3',
    titre: "La clôture de la liquidation et les prescriptions (art. 216-222)",
    navLabel: "Clôture",
    blocs: [
      {
        type: 'carte',
        titre: "Le calendrier et les formalités de clôture",
        tableau: {
          entetes: ["Étape", "Règle"],
          lignes: [
            ["Délai de clôture", "Trois ans à compter de la dissolution ; à défaut, le ministère public ou tout intéressé saisit la juridiction du siège pour qu'il soit procédé à la liquidation ou à son achèvement (art. 216)."],
            ["Assemblée de clôture", "Les associés statuent sur les comptes définitifs, le quitus de gestion du liquidateur et la décharge de son mandat, et constatent la clôture ; à défaut de convocation, mandataire ad hoc désigné en justice (art. 217)."],
            ["Blocage de l'assemblée", "Si elle ne peut délibérer ou refuse d'approuver les comptes, la juridiction statue en ses lieu et place, le liquidateur déposant ses comptes au RCCM (art. 218)."],
            ["Dépôt et radiation", "Comptes définitifs déposés au RCCM avec la décision d'approbation ou la décision de justice (art. 219) ; radiation demandée par le liquidateur dans le mois de la publication de la clôture (art. 220)."],
          ],
        },
      },
      {
        type: 'carte',
        titre: "Responsabilités et prescriptions",
        liste: [
          "**Liquidateur** : responsable envers la société et les tiers des conséquences dommageables de ses fautes ; action sociale ou individuelle prescrite par **trois ans** à compter du fait dommageable ou de sa révélation s'il a été dissimulé — **dix ans** si le fait est qualifié crime (art. 221).",
          "**Associés non liquidateurs** (et leurs conjoints survivants, héritiers, ayants cause) : toute action contre eux se prescrit par **cinq ans** à compter de la publication de la dissolution au RCCM (art. 222).",
          "**Champ d'application** : les règles de liquidation ne s'appliquent pas lorsque la liquidation intervient dans le cadre de l'Acte uniforme portant organisation des procédures collectives d'apurement du passif (art. 203).",
        ],
      },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
    ],
  },
  {
    numero: '9.4',
    titre: "Comptabilisation de la liquidation : la méthode directe (Application 122)",
    navLabel: "Écritures",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le Guide met à disposition trois comptes : **837 — Charges liées aux opérations de liquidation**, **847 — Produits liés aux opérations de liquidation** et un **compte de résultat de liquidation**. Anomalie du texte officiel, signalée telle quelle : la définition initiale du Guide vise le compte 1374, tandis que toutes les écritures utilisent le compte **1384** — les schémas ci-dessous reprennent 1384, conformément aux écritures effectivement passées. Par simplification, le compte de résultat de liquidation peut être mouvementé directement, sans transiter par 837/847 : c'est la première méthode.",
      },
      {
        type: 'carte',
        titre: "Application 122 — Situation de départ",
        texte: "Entité arrêtant son activité au 25/01/N. Bilan : bâtiments industriels 40 000 000 / amortissements 26 500 000 → 13 500 000 net ; matériel industriel 20 000 000 / 15 000 000 → 5 000 000 ; stocks 7 500 000 / dépréciation 3 450 000 → 4 050 000 ; créances clients 22 500 000 / dépréciation 3 900 000 → 18 600 000 ; banques 9 850 000. Total 51 000 000. Passif : capital 20 000 000, réserves 14 000 000, fournisseurs 17 000 000.",
        liste: [
          "Bâtiments cédés **25 000 000** ; matériel cédé **4 500 000** ; stocks cédés **3 750 000**.",
          "Créances douteuses (nominal 11 500 000) réglées **8 500 000** ; autres clients (11 000 000) réglés sous déduction d'un escompte de **1 500 000**.",
          "Frais de liquidation : **3 000 000**.",
        ],
      },
      {
        type: 'carte',
        titre: "Les écritures de réalisation (méthode directe, compte 1384)",
        tableau: {
          entetes: ["Opération", "Écriture"],
          lignes: [
            ["Cession du bâtiment", "Débit 521 25 000 000 / crédit 1384 ; puis débit 1384 13 500 000 et débit 2831 Amortissements 26 500 000 / crédit 231 Bâtiments 40 000 000"],
            ["Cession du matériel", "Débit 521 4 500 000 / crédit 1384 ; puis débit 1384 5 000 000 et débit 2841 15 000 000 / crédit 2411 20 000 000"],
            ["Cession des stocks", "Débit 521 3 750 000 / crédit 1384 ; puis débit 1384 4 050 000 et débit 391 Dépréciation 3 450 000 / crédit 311 Stocks 7 500 000"],
            ["Créances douteuses", "Débit 521 8 500 000 / crédit 4162 ; débit 4912 Dépréciation 3 900 000 / crédit 1384 ; débit 1384 3 000 000 (perte) / crédit 4162 pour 3 000 000"],
            ["Autres clients (escompte)", "Débit 521 9 500 000 et débit 1384 1 500 000 (escomptes accordés) / crédit 411 Clients 11 000 000"],
            ["Fournisseurs et frais", "Débit 401 17 000 000 / crédit 521 ; débit 1384 3 000 000 (frais de liquidation) / crédit 521"],
          ],
        },
        note: "Solde du compte 1384 : produits 37 150 000 − charges 30 050 000 = **boni de liquidation 7 100 000**. Banques : **41 100 000**. Bilan de clôture : banques 41 100 000 / capital 20 000 000, réserves 14 000 000, boni 7 100 000.",
      },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[11] },
    ],
  },
  {
    numero: '9.5',
    titre: "La méthode par les comptes 837/847 et le partage final",
    navLabel: "Partage",
    blocs: [
      {
        type: 'carte',
        titre: "Seconde méthode — traçabilité par 837 et 847",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["847", "", "Produits liés aux opérations de liquidation (25 000 000 + 4 500 000 + 3 750 000 + 3 900 000)", "37 150 000", ""],
            ["", "1384", "Résultat de liquidation", "", "7 100 000"],
            ["", "837", "Charges liées aux opérations de liquidation (13 500 000 + 5 000 000 + 4 050 000 + 3 000 000 + 1 500 000 + 3 000 000)", "", "30 050 000"],
          ],
        },
        note: "Les opérations sont d'abord enregistrées en 837/847 au lieu du 1384, puis regroupées en fin d'opérations : le résultat (7 100 000) est identique à celui de la méthode directe, mais la ventilation charges/produits de la période de liquidation reste lisible.",
      },
      {
        type: 'carte',
        titre: "Le partage entre associés",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["101", "", "Capital social", "20 000 000", ""],
            ["11", "", "Réserves", "14 000 000", ""],
            ["1384", "", "Résultat de liquidation (boni)", "7 100 000", ""],
            ["", "4619", "Apporteurs, capital à rembourser", "", "41 100 000"],
            ["4619", "", "Apporteurs, capital à rembourser", "41 100 000", ""],
            ["", "521", "Banques", "", "41 100 000"],
          ],
        },
        note: "Le partage éteint les capitaux propres par une dette envers les associés (4619, déjà rencontré en réduction et en amortissement du capital), soldée par la trésorerie. Le **boni de liquidation** revient aux associés en sus de leurs apports et réserves : c'est la concrétisation du droit sur l'actif net lors de sa répartition (art. 53, 2°). Un **mali** — solde débiteur — signifierait au contraire que les associés ne récupèrent pas l'intégralité de leurs apports.",
      },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[13] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas-1',
    titre: "Cas 1 — SANGHA MENUISERIE SA : liquidation complète",
    contexte: "SANGHA MENUISERIE SA cesse son activité le 31/03/N. Bilan : matériel industriel 30 000 000 / amortissements 21 000 000 → 9 000 000 net ; stocks 12 000 000 / dépréciation 2 000 000 → 10 000 000 ; clients 18 000 000 / dépréciation 4 000 000 → 14 000 000 ; banques 6 000 000. Total 39 000 000. Passif : capital 15 000 000 (3 000 actions de 5 000), réserves 9 000 000, fournisseurs 15 000 000. Réalisations : matériel cédé 12 500 000 ; stocks cédés 7 000 000 ; créances encaissées 15 500 000 (le solde étant irrécouvrable) ; frais de liquidation 2 200 000. Les fournisseurs sont intégralement réglés.",
    questions: [
      {
        num: 1,
        enonce: "Passez les écritures de réalisation de l'actif (méthode directe, compte de résultat de liquidation 1384).",
        correction: "Matériel : débit 521 12 500 000 / crédit 1384 ; puis débit 1384 9 000 000 et débit 2841 Amortissements 21 000 000 / crédit 2411 pour 30 000 000. Stocks : débit 521 7 000 000 / crédit 1384 ; puis débit 1384 10 000 000 et débit 39 Dépréciation 2 000 000 / crédit 31 Stocks 12 000 000. Créances : débit 521 15 500 000 / crédit 411-4162 pour 15 500 000 ; débit 49 Dépréciation 4 000 000 / crédit 1384 pour 4 000 000 ; perte sur le solde irrécouvrable (18 000 000 − 15 500 000 = 2 500 000) : débit 1384 2 500 000 / crédit 411-4162 pour 2 500 000.",
      },
      {
        num: 2,
        enonce: "Passez les écritures de règlement du passif et des frais, puis déterminez le résultat de liquidation.",
        correction: "Fournisseurs : débit 401 15 000 000 / crédit 521. Frais : débit 1384 2 200 000 / crédit 521. Produits portés au 1384 : 12 500 000 + 7 000 000 + 4 000 000 = 23 500 000. Charges : 9 000 000 + 10 000 000 + 2 500 000 + 2 200 000 = 23 700 000. Solde : mali de liquidation de 200 000 (compte 1384 débiteur).",
      },
      {
        num: 3,
        enonce: "Établissez le bilan de clôture avant partage.",
        correction: "Trésorerie : 6 000 000 + 12 500 000 + 7 000 000 + 15 500 000 − 15 000 000 − 2 200 000 = 23 800 000. Bilan : banques 23 800 000 à l'actif ; au passif, capital 15 000 000 + réserves 9 000 000 − mali de liquidation 200 000 = 23 800 000. L'équilibre confirme les écritures.",
      },
      {
        num: 4,
        enonce: "Passez les écritures de partage et calculez le remboursement par action.",
        correction: "Débit 101 Capital 15 000 000 et débit 11 Réserves 9 000 000 / crédit 1384 pour 200 000 (apurement du mali) et crédit 4619 Apporteurs, capital à rembourser 23 800 000 ; puis débit 4619 23 800 000 / crédit 521 pour 23 800 000. Par action : 23 800 000 / 3 000 = 7 933,33 — soit plus que le nominal de 5 000 grâce aux réserves, malgré le mali de liquidation.",
      },
      {
        num: 5,
        enonce: "Quelles formalités juridiques encadrent la fin de cette liquidation ?",
        correction: "Clôture dans les trois ans de la dissolution (art. 216) ; convocation des associés pour statuer sur les comptes définitifs, donner quitus au liquidateur et décharge de son mandat, et constater la clôture (art. 217) — à défaut, désignation judiciaire d'un mandataire ad hoc, ou décision de justice en lieu et place de l'assemblée (art. 218) ; dépôt des comptes définitifs au RCCM avec la décision (art. 219) ; demande de radiation par le liquidateur dans le mois de la publication de la clôture (art. 220). La personnalité morale a subsisté jusqu'à cette publication (art. 205).",
      },
    ],
  },
  {
    id: 'cas-2',
    titre: "Cas 2 — LOMELA TRADING SARLU : dissolution sans liquidation",
    contexte: "LOMELA TRADING SARLU a pour associée unique la société KATANGA HOLDING SA. L'associée unique décide, le 15/02/N, la dissolution de sa filiale, publiée le 20/02/N. Un fournisseur, créancier depuis N−1 pour 8 000 000, s'inquiète du sort de sa créance.",
    questions: [
      {
        num: 1,
        enonce: "Y aura-t-il liquidation de LOMELA TRADING ?",
        correction: "Non. L'associé unique étant une personne morale, l'article 201, alinéa 4, s'applique : la dissolution entraîne la transmission universelle du patrimoine de la société à cet associé, sans qu'il y ait lieu à liquidation. L'exception de l'alinéa 5 — mise en liquidation de plein droit — ne vise que les sociétés dont l'associé unique est une personne physique.",
      },
      {
        num: 2,
        enonce: "Quels sont les droits du fournisseur créancier ?",
        correction: "Il peut faire opposition à la dissolution devant la juridiction compétente dans le délai de trente jours à compter de la publication (soit jusqu'au 22/03/N). La juridiction rejette l'opposition ou ordonne soit le remboursement des créances, soit la constitution de garanties si la société en offre et si elles sont jugées suffisantes (art. 201, al. 4).",
      },
      {
        num: 3,
        enonce: "Quand la transmission du patrimoine est-elle réalisée ?",
        correction: "À l'issue du délai d'opposition de trente jours ou, en cas d'opposition, lorsque celle-ci a été rejetée, que le remboursement des créances a été effectué ou que les garanties ont été constituées (art. 201, al. 4). C'est à ce moment que la société disparaît — la dissolution n'ayant, en tout état de cause, d'effet à l'égard des tiers qu'à compter de sa publication (al. 1er).",
      },
      {
        num: 4,
        enonce: "En quoi ce mécanisme diffère-t-il, dans ses effets patrimoniaux, d'une fusion-absorption de la filiale par sa mère ?",
        correction: "Les deux produisent une transmission universelle du patrimoine à l'associé unique ou à l'absorbante, sans liquidation. Mais la fusion suppose un projet, une publicité un mois avant, des assemblées dans chaque société, une déclaration de conformité (art. 193-198) et, le plus souvent, une augmentation de capital rémunérant les associés extérieurs — inexistants ici. La dissolution de l'unipersonnelle est plus légère : décision de l'associé unique, publicité, délai d'opposition de trente jours. Comptablement, la mère n'a pas d'apports à rémunérer : elle reprend actifs et passifs et annule les titres de la filiale, l'écart constituant un boni ou un mali.",
      },
    ],
  },
  {
    id: 'cas-3',
    titre: "Cas 3 — KASONGO TEXTILE SA : irrégularités de la liquidation",
    contexte: "KASONGO TEXTILE SA est dissoute le 10/01/N par décision de l'assemblée. Plusieurs événements : (a) le liquidateur, M. N., ancien directeur général, se porte acquéreur du principal entrepôt de la société ; (b) le liquidateur souhaite céder l'entrepôt secondaire à son fils ; (c) un actionnaire minoritaire estime que le liquidateur mène la liquidation avec négligence et veut le faire remplacer ; (d) au 15/03/N+3, la liquidation n'est toujours pas close.",
    questions: [
      {
        num: 1,
        enonce: "M. N. peut-il acquérir l'entrepôt principal ?",
        correction: "Deux fondements se cumulent contre lui. En tant que liquidateur, l'article 214 lui interdit purement et simplement d'acquérir tout ou partie de l'actif de la société en liquidation. En tant qu'ancien directeur général, l'article 213 aurait de toute façon exigé, sauf consentement unanime des associés, l'autorisation de la juridiction compétente, le liquidateur et le commissaire aux comptes entendus. L'opération réalisée serait nulle (art. 215-1).",
      },
      {
        num: 2,
        enonce: "La cession au fils du liquidateur est-elle possible ?",
        correction: "Non : l'article 214 étend l'interdiction aux employés du liquidateur et à leurs conjoints, ascendants ou descendants. Le fils du liquidateur est un descendant : la cession est interdite, et l'opération serait nulle (art. 215-1).",
      },
      {
        num: 3,
        enonce: "Comment l'actionnaire minoritaire peut-il agir contre le liquidateur ?",
        correction: "Deux voies. Révocation : le liquidateur peut être révoqué selon les formes prévues pour sa nomination — ici les conditions des AGE (art. 206, 4° et 211, al. 1er) — mais tout associé, même minoritaire, peut en demander la révocation en justice si la demande est fondée sur des motifs légitimes (art. 211, al. 2). Responsabilité : le liquidateur répond envers la société et les tiers des conséquences dommageables de ses fautes, l'action se prescrivant par trois ans à compter du fait dommageable ou de sa révélation (art. 221).",
      },
      {
        num: 4,
        enonce: "Que peut-il advenir de la liquidation non close au 15/03/N+3 ?",
        correction: "Le délai de trois ans à compter de la dissolution (10/01/N) est dépassé : le ministère public ou tout intéressé peut saisir la juridiction compétente du ressort du siège afin qu'il soit procédé à la liquidation ou, celle-ci ayant commencé, à son achèvement (art. 216). L'inaction du liquidateur ne fait donc pas obstacle à la clôture : la voie judiciaire prend le relais.",
      },
    ],
  },
  {
    id: 'cas-4',
    titre: "Cas 4 — MAYUMBE BOIS SA : les deux méthodes comptables",
    contexte: "MAYUMBE BOIS SA est en liquidation. Les opérations de la période sont : cessions d'immobilisations 18 000 000 (VNC 11 000 000, amortissements cumulés 24 000 000 sur une valeur brute de 35 000 000) ; cession des stocks 5 000 000 (valeur nette 6 500 000) ; reprise de dépréciations sur créances 1 200 000 ; frais de liquidation 1 800 000 ; escomptes accordés aux clients pour règlement anticipé 700 000.",
    questions: [
      {
        num: 1,
        enonce: "Enregistrez les opérations par la méthode directe (compte de résultat de liquidation).",
        correction: "Immobilisations : débit 521 18 000 000 / crédit 1384 ; puis débit 1384 11 000 000 et débit des amortissements 24 000 000 / crédit du compte d'immobilisation 35 000 000. Stocks : débit 521 5 000 000 / crédit 1384 ; puis débit 1384 6 500 000 (et débit de la dépréciation existante s'il y en a une) / crédit du compte de stocks pour sa valeur brute. Reprise de dépréciation sur créances : débit 49 1 200 000 / crédit 1384. Escomptes : débit 1384 700 000. Frais : débit 1384 1 800 000 / crédit 521.",
      },
      {
        num: 2,
        enonce: "Déterminez le résultat de liquidation.",
        correction: "Produits portés au résultat de liquidation : 18 000 000 + 5 000 000 + 1 200 000 = 24 200 000. Charges : 11 000 000 (VNC des immobilisations) + 6 500 000 (valeur des stocks) + 700 000 (escomptes) + 1 800 000 (frais) = 20 000 000. Résultat : boni de liquidation de 4 200 000.",
      },
      {
        num: 3,
        enonce: "Présentez l'écriture de regroupement si la seconde méthode avait été retenue.",
        correction: "Les mêmes opérations auraient été portées en 847 (produits liés aux opérations de liquidation) et 837 (charges liées aux opérations de liquidation). Regroupement final : débit 847 24 200 000 / crédit 837 pour 20 000 000 et crédit 1384 Résultat de liquidation 4 200 000. Le résultat est identique ; la seconde méthode conserve la ventilation charges/produits de la période de liquidation.",
      },
      {
        num: 4,
        enonce: "Quel est l'intérêt de faire transiter les opérations par 837 et 847 ?",
        correction: "La traçabilité : le compte de résultat de liquidation ne livre qu'un solde, tandis que les comptes 837 et 847 conservent le détail des charges et des produits engendrés par les opérations de liquidation — utile pour rendre compte aux associés lors de l'assemblée de clôture (art. 217), pour justifier les comptes définitifs déposés au RCCM (art. 219), et pour apprécier la diligence du liquidateur, dont la responsabilité peut être recherchée pendant trois ans (art. 221). Le Guide admet les deux méthodes, la voie directe n'étant qu'une simplification.",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 9,
  id: 'ue3-chapitre-9',
  titre: "La dissolution et la liquidation",
  sousTitre: "AUSCGIE, art. 200-222 · SYSCOHADA, Application 122",
  infoBulle: "Causes de dissolution et effets (publicité, survie de la personnalité morale, transmission universelle dans l'unipersonnelle), statut et pouvoirs encadrés du liquidateur, clôture dans les trois ans et prescriptions — puis la comptabilisation de la liquidation par les comptes 837/847 et le résultat de liquidation, jusqu'au partage par le compte 4619.",
  loiRef: "AUSCGIE (30 janvier 2014) · SYSCOHADA révisé (AUDCIF)",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Identifier les causes de dissolution et leurs effets, dont la transmission universelle sans liquidation dans l'unipersonnelle (art. 200-205)",
    "Connaître le statut du liquidateur : nomination par forme sociale, publicité, révocation, interdictions de cession, nullités (art. 206-215-1)",
    "Maîtriser la clôture : délai de trois ans, assemblée de clôture et quitus, dépôt des comptes, radiation, prescriptions (art. 216-222)",
    "Comptabiliser la réalisation de l'actif et l'apurement du passif par la méthode directe (résultat de liquidation) — Application 122",
    "Appliquer la méthode alternative par les comptes 837/847 et passer les écritures de partage (4619), boni ou mali",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Sept causes de dissolution (art. 200), auxquelles s'ajoutent les dissolutions sanctions déjà vues (capital sous le minimum, capitaux propres sous la moitié du capital, unipersonnalité irrégulière).",
    "Effet à l'égard des tiers à compter de la publication ; mise en liquidation de plein droit pour la société pluripersonnelle ; personnalité morale maintenue jusqu'à la publication de la clôture (art. 201, 205).",
    "Unipersonnelle à associé personne morale : transmission universelle du patrimoine sans liquidation, opposition des créanciers dans les trente jours ; l'associé unique personne physique n'en bénéficie pas (art. 201).",
    "Nomination du liquidateur selon la forme sociale (art. 206) ; opposabilité aux tiers dès publication (art. 212) ; révocation dans les mêmes formes ou en justice pour motifs légitimes (art. 211).",
    "Cession d'actif au liquidateur, à ses employés et à leurs proches : interdite (art. 214) ; à un ancien dirigeant : autorisation judiciaire sauf unanimité (art. 213) ; violations sanctionnées de nullité (art. 215-1).",
    "Clôture dans les trois ans (art. 216) ; assemblée de clôture, quitus, dépôt des comptes au RCCM, radiation dans le mois (art. 217-220).",
    "Prescriptions : trois ans contre le liquidateur (dix ans si crime, art. 221) ; cinq ans contre les associés non liquidateurs à compter de la publication de la dissolution (art. 222).",
    "Comptabilité : réalisation de l'actif et apurement du passif par le résultat de liquidation (1384 dans les écritures du Guide) ou via 837/847 ; solde = boni ou mali ; partage par 4619, soldé par la trésorerie.",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du GIE (AUSCGIE)", precision: "art. 200-202 (causes et effets de la dissolution, unipersonnelle), 203-215-1 (liquidation amiable, liquidateur, interdictions de cession), 216-222 (clôture, radiation, responsabilité et prescriptions)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Guide d'application, chapitre 40", precision: "Application 122 (liquidation : méthode directe par le résultat de liquidation et méthode par les comptes 837/847, écritures de partage) — l'incohérence du texte officiel entre le compte 1374 défini et le compte 1384 utilisé est signalée telle quelle" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Plan de comptes", precision: "comptes 101, 11, 391, 4162, 4619, 4912, 521, 837, 847 et comptes d'amortissements des immobilisations cédées" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE (Acte uniforme révisé du 30 janvier 2014) · SYSCOHADA révisé — Guide d'application et plan de comptes (AUDCIF)",
}

export default chapitre
