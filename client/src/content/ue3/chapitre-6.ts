import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 3 — CHAPITRE 6 : L'EMPRUNT OBLIGATAIRE
// AUSCGIE art. 779-794 (définition, conditions d'émission, masse des
// obligataires). Comptabilisation : Applications 78 (amortissements
// constants), 79 (in fine) et 80 (convertible) du Guide SYSCOHADA —
// comptes 1611, 1612, 1661, 47131/47132, 6316, 6711, 6714, 1054.
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1',
    question: "Selon l'article 779 de l'AUSCGIE, les obligations sont :",
    options: [
      { id: 'a', texte: "Des parts sociales à revenu variable" },
      { id: 'b', texte: "Des titres négociables qui, dans une même émission, confèrent les mêmes droits de créance pour une même valeur nominale" },
      { id: 'c', texte: "Des actions de préférence sans droit de vote" },
      { id: 'd', texte: "Des créances individuelles librement différenciées" },
      { id: 'e', texte: "Des titres de capital" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 779 : les obligations sont des titres négociables qui, dans une même émission, confèrent les mêmes droits de créance pour une même valeur nominale. L'obligataire est un créancier — non un associé : il perçoit un intérêt et a droit au remboursement, mais ne participe ni aux bénéfices ni au vote des assemblées d'actionnaires.",
    articleRef: "AUSCGIE, art. 779",
  },
  {
    id: 'q2',
    question: "Qui peut émettre des obligations ?",
    options: [
      { id: 'a', texte: "Toute société commerciale" },
      { id: 'b', texte: "Les sociétés anonymes — et les GIE constitués de sociétés anonymes — ayant deux années d'existence et deux bilans régulièrement approuvés" },
      { id: 'c', texte: "Les SARL de plus de cinq ans" },
      { id: 'd', texte: "Les seules sociétés cotées" },
      { id: 'e', texte: "Toute société sur autorisation du greffe" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 780 réserve l'émission d'obligations aux sociétés anonymes et aux GIE constitués de sociétés anonymes, ayant deux années d'existence et deux bilans régulièrement approuvés par les actionnaires. S'y ajoutent deux interdictions : émission interdite aux sociétés dont le capital n'est pas entièrement libéré (art. 781) et émission d'obligations à lots interdite (art. 782). Toute émission contraire aux articles 780 à 783 est nulle (art. 783-1).",
    articleRef: "AUSCGIE, art. 780-783-1",
  },
  {
    id: 'q3',
    question: "Quel organe décide l'émission d'obligations ?",
    options: [
      { id: 'a', texte: "Le conseil d'administration, souverainement" },
      { id: 'b', texte: "L'assemblée générale des actionnaires, seule, qui peut déléguer au conseil ou à l'administrateur général les pouvoirs pour procéder à l'émission en une ou plusieurs fois dans un délai de deux ans" },
      { id: 'c', texte: "Le commissaire aux comptes" },
      { id: 'd', texte: "La masse des obligataires" },
      { id: 'e', texte: "Le président-directeur général seul" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 783 : l'assemblée générale des actionnaires a seule qualité pour décider ou autoriser l'émission ; elle peut déléguer au conseil d'administration ou à l'administrateur général les pouvoirs nécessaires pour procéder à l'émission en une ou plusieurs fois dans le délai de deux ans et en arrêter les modalités. L'article 546, 5°, range d'ailleurs l'émission d'obligations parmi les compétences de l'assemblée générale ordinaire.",
    articleRef: "AUSCGIE, art. 783 et 546",
  },
  {
    id: 'q4',
    question: "Que deviennent les obligations rachetées par la société émettrice et remboursées ?",
    options: [
      { id: 'a', texte: "Elles peuvent être remises en circulation" },
      { id: 'b', texte: "Elles sont annulées et ne peuvent être remises en circulation" },
      { id: 'c', texte: "Elles sont converties en actions d'office" },
      { id: 'd', texte: "Elles sont conservées en portefeuille dix ans" },
      { id: 'e', texte: "Elles sont transférées à la masse" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 784 : les obligations rachetées par la société émettrice et remboursées sont annulées et ne peuvent être remises en circulation — la dette est définitivement éteinte à leur égard.",
    articleRef: "AUSCGIE, art. 784",
  },
  {
    id: 'q5',
    question: "Comment les porteurs d'obligations d'une même émission sont-ils organisés ?",
    options: [
      { id: 'a', texte: "Chacun agit isolément, sans organisation collective" },
      { id: 'b', texte: "Ils sont groupés de plein droit, pour la défense de leurs intérêts, dans une masse dotée de la personnalité juridique" },
      { id: 'c', texte: "Ils élisent un administrateur au conseil de la société" },
      { id: 'd', texte: "Ils forment un syndicat professionnel" },
      { id: 'e', texte: "Ils sont représentés par le commissaire aux comptes" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 785 : les porteurs d'obligations d'une même émission sont groupés de plein droit dans une masse qui jouit de la personnalité juridique ; en cas d'émissions successives, la société peut — si chaque contrat d'émission le prévoit — réunir en un groupement unique les porteurs d'obligations ayant des droits identiques. Le groupement est représenté par un à trois mandataires élus par l'assemblée générale des obligataires (art. 786).",
    articleRef: "AUSCGIE, art. 785-786",
  },
  {
    id: 'q6',
    question: "Le représentant de la masse peut-il être un dirigeant de la société débitrice ?",
    options: [
      { id: 'a', texte: "Oui, c'est même l'usage" },
      { id: 'b', texte: "Non : l'article 787 exclut notamment la société débitrice, ses garants, ses dirigeants et administrateurs, leurs proches, leurs employés et le commissaire aux comptes" },
      { id: 'c', texte: "Oui, avec l'accord de la majorité des obligataires" },
      { id: 'd', texte: "Oui, s'il détient lui-même des obligations" },
      { id: 'e', texte: "La question n'est pas réglée par le texte" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 787 dresse la liste des incompatibilités : la société débitrice, les sociétés ayant une participation dans celle-ci, ses garants, ses dirigeants sociaux ou administrateurs (et ceux des sociétés participantes) ainsi que leurs ascendants, descendants et conjoints, leurs employés, le commissaire aux comptes de ces sociétés, et les personnes déchues ou interdites. Le mandat est réservé à des résidents de l'État partie du siège. En cas d'urgence, la juridiction compétente peut désigner les représentants (art. 788), que l'assemblée des obligataires peut révoquer (art. 789).",
    articleRef: "AUSCGIE, art. 787-789",
  },
  {
    id: 'q7',
    question: "Quels sont les pouvoirs des représentants de la masse ?",
    options: [
      { id: 'a', texte: "Ils gèrent la société aux côtés du conseil d'administration" },
      { id: 'b', texte: "Ils accomplissent, sauf restriction de l'assemblée des obligataires, tous les actes de gestion pour la défense des intérêts communs — sans s'immiscer dans la gestion de la société ; ils assistent aux assemblées d'actionnaires sans voix délibérative" },
      { id: 'c', texte: "Ils votent aux assemblées d'actionnaires" },
      { id: 'd', texte: "Ils peuvent bloquer toute distribution de dividendes" },
      { id: 'e', texte: "Ils n'ont aucun pouvoir" },
    ],
    reponseCorrecte: 'b',
    explication: "Articles 790-791 : pouvoir d'accomplir, au nom du groupement, tous les actes de gestion pour la défense des intérêts communs (sauf restriction de l'assemblée des obligataires), mais interdiction de s'immiscer dans la gestion sociale ; participation aux assemblées d'actionnaires sans voix délibérative, avec communication des mêmes documents que les actionnaires. En cas de liquidation des biens ou de redressement judiciaire, ils déclarent les créances au passif pour tous les obligataires (art. 792).",
    articleRef: "AUSCGIE, art. 790-792",
  },
  {
    id: 'q8',
    question: "Dans l'Application 78 (10 000 obligations, nominal 5 000, émises à 4 900, remboursables à 5 100), la dette constatée à l'émission au crédit du compte 1611 est :",
    options: [
      { id: 'a', texte: "50 000 000, le nominal" },
      { id: 'b', texte: "49 000 000, le prix d'émission (10 000 × 4 900)" },
      { id: 'c', texte: "51 000 000, le prix de remboursement" },
      { id: 'd', texte: "2 000 000, la prime totale" },
      { id: 'e', texte: "Aucun montant avant la première échéance" },
    ],
    reponseCorrecte: 'b',
    explication: "Principe du Guide : à l'émission, la dette constatée est égale au prix d'émission — ici 49 000 000, au crédit de 1611 Emprunts obligataires ordinaires, via les comptes transitoires 47131 (obligations à placer) et 47132 (compte de souscription), soldés à l'encaissement. La prime de remboursement (prix de remboursement − prix d'émission = 2 000 000) n'est pas comptabilisée à l'émission : elle est étalée sur la durée par le compte 6714.",
    articleRef: "SYSCOHADA — Guide d'application, Application 78",
  },
  {
    id: 'q9',
    question: "Comment la prime de remboursement est-elle étalée dans un emprunt à amortissements constants (Application 78) ?",
    options: [
      { id: 'a', texte: "En une seule fois à l'émission" },
      { id: 'b', texte: "Au prorata du nombre d'obligations échues : 2 000 000 sur 4 ans à raison de 2 500 obligations par an, soit 500 000 par an au débit du 6714" },
      { id: 'c', texte: "Au prorata du chiffre d'affaires" },
      { id: 'd', texte: "En totalité à la dernière échéance" },
      { id: 'e', texte: "Elle n'est jamais comptabilisée" },
    ],
    reponseCorrecte: 'b',
    explication: "Pour les remboursements par amortissements constants, dégressifs ou annuités constantes, la prime est étalée au prorata du nombre d'obligations échues : chaque année, 2 500 obligations sur 10 000 sont remboursées, soit un quart de la prime totale (2 000 000 / 4 = 500 000), porté au débit de 6714 Primes de remboursement des obligations dans l'écriture d'annuité. Pour un remboursement in fine, l'étalement se fait au prorata des intérêts courus, via 6714 · 1661 (Application 79).",
    articleRef: "SYSCOHADA — Applications 78 et 79",
  },
  {
    id: 'q10',
    question: "L'écriture de la première annuité de l'Application 78 (31/12/N) est :",
    options: [
      { id: 'a', texte: "Débit 1611 12 750 000 / crédit 521 12 750 000" },
      { id: 'b', texte: "Débit 1611 12 250 000, débit 6711 Charges d'intérêts 5 000 000, débit 6714 Prime 500 000 / crédit 521 Banques 17 750 000" },
      { id: 'c', texte: "Débit 6711 17 750 000 / crédit 521 17 750 000" },
      { id: 'd', texte: "Débit 521 17 750 000 / crédit 1611 17 750 000" },
      { id: 'e', texte: "Débit 1611 12 750 000, débit 6711 5 000 000 / crédit 521 17 750 000" },
    ],
    reponseCorrecte: 'b',
    explication: "L'annuité de 17 750 000 se décompose : remboursement de 2 500 obligations à 5 100 = 12 750 000, dont 12 250 000 éteignent la dette au prix d'émission (débit 1611 : 12 750 000 − 500 000) et 500 000 représentent la quote-part de prime (débit 6714) ; intérêts de l'année : 10 000 × 5 % × 5 000 = 5 000 000 (débit 6711). Les frais d'émission (750 000) avaient été passés en charges à l'engagement : débit 6316 / crédit 521.",
    articleRef: "SYSCOHADA — Application 78",
  },
  {
    id: 'q11',
    question: "Dans un emprunt remboursable in fine (Application 79), comment la prime est-elle rattachée à chaque exercice ?",
    options: [
      { id: 'a', texte: "Elle n'est constatée qu'au remboursement final" },
      { id: 'b', texte: "Au prorata des intérêts courus : débit 6714 / crédit 1661 Intérêts courus sur emprunts obligataires, soit 1 000 000 par an pour une prime de 5 000 000 sur cinq exercices d'intérêts égaux" },
      { id: 'c', texte: "Par cinquième au débit du compte 1611" },
      { id: 'd', texte: "Par dotation aux amortissements (681)" },
      { id: 'e', texte: "En capitaux propres" },
    ],
    reponseCorrecte: 'b',
    explication: "Application 79 : les 5 000 obligations sont toutes vivantes jusqu'au terme — l'étalement au prorata des obligations échues est impossible. La prime (5 000 × 1 000 = 5 000 000) est rattachée au prorata des intérêts courus : chaque exercice porte 3 000 000 d'intérêts sur un total de 15 000 000, soit un cinquième de la prime (1 000 000), par l'écriture débit 6714 / crédit 1661.",
    articleRef: "SYSCOHADA — Application 79",
  },
  {
    id: 'q12',
    question: "Pour un emprunt obligataire convertible (Application 80), comment la prime de remboursement est-elle traitée ?",
    options: [
      { id: 'a', texte: "Étalée par 6714 dès l'émission, comme un emprunt ordinaire" },
      { id: 'b', texte: "Non comptabilisée ni étalée : une provision pour le risque d'avoir à payer la prime (en cas de remboursement en numéraire) est dotée, puis reprise à mesure des conversions" },
      { id: 'c', texte: "Portée immédiatement en capitaux propres" },
      { id: 'd', texte: "Déduite du capital" },
      { id: 'e', texte: "Inscrite à l'actif en charges à répartir" },
    ],
    reponseCorrecte: 'b',
    explication: "Principe de l'Application 80 : seul le prix d'émission est constaté (compte 1612 Emprunts obligataires convertibles) ; la prime n'est ni comptabilisée ni étalée, car elle ne sera due que si l'obligataire choisit le remboursement en numéraire. Une provision pour ce risque est dotée à la clôture de l'exercice d'émission (6971 / 1988 : 50 000 000 pour 25 000 × 2 000) et reprise pour la quote-part des obligations converties (1988 / 7971) ; pour les obligations effectivement remboursées, la prime est portée au débit du 6714 avec reprise de la provision correspondante.",
    articleRef: "SYSCOHADA — Application 80",
  },
  {
    id: 'q13',
    question: "Dans l'Application 80, la conversion de 4 000 obligations (émises à 13 000) contre 3 000 actions de nominal 10 000 s'enregistre :",
    options: [
      { id: 'a', texte: "Débit 1612 52 000 000 / crédit 1013 30 000 000 et crédit 1054 Prime de conversion 22 000 000" },
      { id: 'b', texte: "Débit 1612 52 000 000 / crédit 521 52 000 000" },
      { id: 'c', texte: "Débit 1013 30 000 000 / crédit 1612 30 000 000" },
      { id: 'd', texte: "Débit 1612 60 000 000 / crédit 1013 60 000 000" },
      { id: 'e', texte: "Débit 6714 22 000 000 / crédit 1054 22 000 000" },
    ],
    reponseCorrecte: 'a',
    explication: "La dette convertie (4 000 × 13 000 = 52 000 000, au prix d'émission) se transforme en capitaux propres : capital pour le nominal émis (3 000 × 10 000 = 30 000 000, crédit 1013) et prime de conversion pour le solde (22 000 000, crédit 1054 — l'une des primes liées au capital du compte 105). La provision constituée pour ces 4 000 obligations (4 000 × 2 000 = 8 000 000) est reprise par 1988 / 7971.",
    articleRef: "SYSCOHADA — Application 80 ; plan de comptes, compte 1054",
  },
  {
    id: 'q14',
    question: "Une SA constituée il y a dix-huit mois, au capital intégralement libéré, veut émettre des obligations. Le peut-elle ?",
    options: [
      { id: 'a', texte: "Oui : la libération intégrale du capital suffit" },
      { id: 'b', texte: "Non : il lui manque la condition d'ancienneté — deux années d'existence et deux bilans régulièrement approuvés (art. 780) — et l'émission serait nulle" },
      { id: 'c', texte: "Oui, avec l'accord unanime des actionnaires" },
      { id: 'd', texte: "Oui, si une banque prend l'émission ferme" },
      { id: 'e', texte: "Non : seule une société cotée le peut" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 780 exige deux années d'existence et deux bilans régulièrement approuvés par les actionnaires. À dix-huit mois, la société ne remplit pas cette condition : l'émission serait nulle (art. 783-1). La libération intégrale du capital (art. 781) est une condition nécessaire mais non suffisante.",
    articleRef: "AUSCGIE, art. 780-781 et 783-1",
  },
  {
    id: 'q15',
    question: "Les frais d'émission d'un emprunt obligataire sont, dans le SYSCOHADA révisé :",
    options: [
      { id: 'a', texte: "Immobilisés en charges à répartir et amortis sur la durée de l'emprunt" },
      { id: 'b', texte: "Passés en charges de l'exercice d'engagement, au compte 6316 Frais d'émission d'emprunts" },
      { id: 'c', texte: "Déduits du compte 1611" },
      { id: 'd', texte: "Imputés sur la prime de remboursement" },
      { id: 'e', texte: "Inscrits en capitaux propres négatifs" },
    ],
    reponseCorrecte: 'b',
    explication: "Le Guide le pose en principe : les frais d'émission passent en charges de l'exercice d'engagement, au compte 6316 Frais d'émission d'emprunts (Application 78 : 750 000 par 6316 / 521). C'est le pendant, pour les emprunts, de la suppression des charges immobilisées déjà rencontrée pour les frais de constitution.",
    articleRef: "SYSCOHADA — Application 78",
  },
  {
    id: 'q16',
    question: "En cas de prise ferme de l'émission par une banque, l'écriture de souscription se réduit à :",
    options: [
      { id: 'a', texte: "Débit 47131 / crédit 1611, sans encaissement" },
      { id: 'b', texte: "Une écriture unique : débit 521 Banques / crédit 1611 Emprunts obligataires ordinaires, pour le prix d'émission" },
      { id: 'c', texte: "Débit 521 / crédit 47132 uniquement" },
      { id: 'd', texte: "Débit 1611 / crédit 521" },
      { id: 'e', texte: "Aucune écriture avant la première annuité" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Application 78 le précise en note : lorsque l'émission fait l'objet d'une prise ferme par une banque — qui garantit et verse immédiatement les fonds —, les comptes transitoires 47131 (obligations à placer) et 47132 (compte de souscription) deviennent inutiles : écriture unique débit 521 / crédit 1611 pour le prix d'émission. C'est aussi le schéma de l'Application 80 (émission convertible prise ferme : 521 / 1612 pour 325 000 000).",
    articleRef: "SYSCOHADA — Applications 78 et 80",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '6.1',
    titre: "Définition et conditions d'émission (art. 779-784)",
    navLabel: "Conditions d'émission",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les **obligations** sont des titres négociables qui, dans une même émission, confèrent **les mêmes droits de créance pour une même valeur nominale** (art. 779). L'obligataire est un prêteur : il perçoit un intérêt contractuel et a droit au remboursement — il ne participe ni aux bénéfices, ni aux pertes, ni au vote des assemblées d'actionnaires. C'est l'instrument de l'endettement de marché, par opposition au financement en capital des chapitres précédents.",
      },
      {
        type: 'carte',
        titre: "Les verrous de l'émission",
        tableau: {
          entetes: ["Condition", "Règle"],
          lignes: [
            ["Émetteurs qualifiés", "Sociétés anonymes et GIE constitués de sociétés anonymes, ayant **deux années d'existence** et **deux bilans régulièrement approuvés** (art. 780)."],
            ["Capital libéré", "Émission **interdite** aux sociétés dont le capital n'est pas entièrement libéré (art. 781) — écho de l'article 389."],
            ["Obligations à lots", "**Interdites** (art. 782)."],
            ["Organe compétent", "L'assemblée générale des actionnaires a **seule qualité** pour décider ou autoriser l'émission ; délégation possible au conseil ou à l'administrateur général pour émettre en une ou plusieurs fois dans un délai de **deux ans** et en arrêter les modalités (art. 783 ; compétence de l'AGO, art. 546, 5°)."],
            ["Sanction", "Toute émission réalisée en violation des articles 780 à 783 est **nulle** (art. 783-1)."],
            ["Rachat", "Les obligations rachetées par l'émettrice et remboursées sont **annulées** et ne peuvent être remises en circulation (art. 784)."],
          ],
        },
      },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[13] },
    ],
  },
  {
    numero: '6.2',
    titre: "La masse des obligataires (art. 785-794)",
    navLabel: "La masse",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les porteurs d'obligations d'une même émission sont groupés **de plein droit**, pour la défense de leurs intérêts, dans une **masse** qui jouit de la **personnalité juridique** (art. 785) ; en cas d'émissions successives, la société peut — si chaque contrat d'émission le prévoit — réunir en un groupement unique les porteurs de droits identiques. Le groupement est représenté par **un à trois mandataires** élus par l'assemblée générale des obligataires (art. 786), révocables par elle (art. 789), et désignables par la juridiction compétente en cas d'urgence (art. 788).",
      },
      {
        type: 'carte',
        titre: "Représentants de la masse : incompatibilités et pouvoirs",
        liste: [
          "**Incompatibilités** (art. 787) : ne peuvent être représentants — la société débitrice ; les sociétés participant à son capital ; ses garants ; ses dirigeants et administrateurs (et ceux des participantes), leurs ascendants, descendants et conjoints ; leurs employés ; le commissaire aux comptes de ces sociétés ; les interdits et déchus. Le mandat est réservé aux résidents de l'État partie du siège.",
          "**Pouvoirs** (art. 790) : accomplir, au nom du groupement et de tous les obligataires, tous les actes de gestion pour la défense des intérêts communs — sauf restriction décidée par l'assemblée des obligataires.",
          "**Limites** (art. 791) : aucune immixtion dans la gestion sociale ; participation aux assemblées d'actionnaires **sans voix délibérative** ; droit de communication des mêmes documents que les actionnaires.",
          "**Procédures collectives** (art. 792-793) : les représentants déclarent au passif, pour tous les obligataires, capital et intérêts dus — sans avoir à produire les titres ; les frais de représentation incombent à la société comme frais d'administration judiciaire.",
          "**Rémunération** (art. 794) : fixée par l'assemblée des obligataires ou le contrat d'émission, à la charge de la société débitrice ; à défaut ou en cas de contestation, par la juridiction compétente.",
        ],
      },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[6] },
    ],
  },
  {
    numero: '6.3',
    titre: "L'analyse financière de l'emprunt : vocabulaire et tableau de service",
    navLabel: "Tableau de service",
    blocs: [
      {
        type: 'carte',
        titre: "Le vocabulaire de l'emprunt obligataire",
        tableau: {
          entetes: ["Terme", "Définition", "Application 78"],
          lignes: [
            ["Valeur nominale", "Base de calcul des intérêts (coupon)", "5 000"],
            ["Prix d'émission", "Somme versée par le souscripteur ; dette comptabilisée à l'émission", "4 900 (émission « au-dessous du pair »)"],
            ["Prix de remboursement", "Somme restituée à l'obligataire", "5 100"],
            ["Prime de remboursement", "Prix de remboursement − prix d'émission", "200 par obligation, 2 000 000 au total"],
            ["Coupon", "Taux × nominal", "5 % × 5 000 = 250... par semestre ou 500 par an selon le contrat — ici 500 par an"],
            ["Modes d'amortissement", "Amortissements constants (séries égales), annuités constantes, ou remboursement in fine", "Amortissements constants : 2 500 obligations par an sur 4 ans"],
          ],
        },
      },
      {
        type: 'carte',
        titre: "Le tableau de service de l'Application 78",
        tableau: {
          entetes: ["Exercice", "Obligations vivantes", "Intérêts", "Obligations amorties", "Valeur de remboursement", "Annuité"],
          lignes: [
            ["N", "10 000", "5 000 000", "2 500", "12 750 000", "17 750 000"],
            ["N+1", "7 500", "3 750 000", "2 500", "12 750 000", "16 500 000"],
            ["N+2", "5 000", "2 500 000", "2 500", "12 750 000", "15 250 000"],
            ["N+3", "2 500", "1 250 000", "2 500", "12 750 000", "14 000 000"],
            ["Total", "—", "12 500 000", "10 000", "51 000 000", "63 500 000"],
          ],
        },
        note: "Intérêts de l'exercice = obligations vivantes × 5 % × 5 000. Valeur amortie = 2 500 × 5 100 (prix de remboursement). L'annuité décroît : c'est la signature des amortissements constants.",
      },
      { type: 'controle', question: QCM[7] },
    ],
  },
  {
    numero: '6.4',
    titre: "Comptabilisation : émission et service de l'emprunt (Application 78)",
    navLabel: "Écritures ordinaires",
    blocs: [
      {
        type: 'carte',
        titre: "Souscription et réception des fonds (10 000 × 4 900 = 49 000 000)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["47131", "", "01/01/N — Obligataires, obligations à placer", "49 000 000", ""],
            ["", "1611", "Emprunts obligataires ordinaires", "", "49 000 000"],
            ["47132", "", "Obligataires, compte de souscription", "49 000 000", ""],
            ["", "47131", "Obligataires, obligations à placer", "", "49 000 000"],
            ["521", "", "Banques", "49 000 000", ""],
            ["", "47132", "Obligataires, compte de souscription", "", "49 000 000"],
            ["6316", "", "Frais d'émission d'emprunts", "750 000", ""],
            ["", "521", "Banques", "", "750 000"],
          ],
        },
        note: "La dette est constatée au **prix d'émission** ; la prime de remboursement n'apparaît pas à l'émission. En cas de prise ferme par une banque : écriture unique 521 / 1611. Les frais d'émission sont des charges de l'exercice d'engagement (6316).",
      },
      {
        type: 'carte',
        titre: "Règlement de la première annuité (31/12/N)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["1611", "", "Emprunts obligataires ordinaires (12 750 000 − 500 000)", "12 250 000", ""],
            ["6711", "", "Charges d'intérêts", "5 000 000", ""],
            ["6714", "", "Primes de remboursement des obligations (2 000 000 / 4)", "500 000", ""],
            ["", "521", "Banques", "", "17 750 000"],
          ],
        },
        note: "La prime est étalée **au prorata du nombre d'obligations échues** : chaque année remboursant 2 500 obligations sur 10 000, un quart de la prime (500 000) est pris en charge par 6714. Les obligations sont remboursées au prix de remboursement (5 100), mais la dette n'a été inscrite qu'au prix d'émission (4 900) : le 6714 comble l'écart.",
      },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[15] },
    ],
  },
  {
    numero: '6.5',
    titre: "Le remboursement in fine (Application 79)",
    navLabel: "In fine",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'Application 79 : 5 000 obligations de nominal 10 000, émises à 9 500, remboursables **in fine** le 31/12/N+4 à 10 500, intérêts de 6 % à terme échu. Toutes les obligations vivent jusqu'au terme : l'étalement de la prime au prorata des obligations échues est impossible. Le Guide la rattache alors **au prorata des intérêts courus** : chaque exercice supporte 3 000 000 d'intérêts sur un total de 15 000 000 — soit un cinquième de la prime de 5 000 000 (5 000 × 1 000), c'est-à-dire 1 000 000 par an.",
      },
      {
        type: 'carte',
        titre: "Écritures annuelles (31/12/N à N+3), puis dénouement",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["6711", "", "31/12/N — Charges d'intérêts (5 000 × 6 % × 10 000)", "3 000 000", ""],
            ["", "521", "Banques", "", "3 000 000"],
            ["6714", "", "Primes de remboursement des obligations (5 000 000 × 3/15)", "1 000 000", ""],
            ["", "1661", "Intérêts courus sur emprunts obligataires", "", "1 000 000"],
          ],
        },
        note: "Le compte 1661 accumule la prime rattachée exercice après exercice ; au terme (31/12/N+4), le remboursement de 52 500 000 (5 000 × 10 500) solde la dette au prix d'émission (1611 : 47 500 000) et le cumul du 1661 (5 000 000), avec les intérêts de la dernière année.",
      },
      { type: 'controle', question: QCM[10] },
    ],
  },
  {
    numero: '6.6',
    titre: "L'emprunt obligataire convertible en actions (Application 80)",
    navLabel: "Convertible",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'obligation **convertible** offre à son porteur une option : être remboursé en numéraire, ou convertir sa créance en actions. L'Application 80 : 25 000 obligations de nominal 15 000, émises à 13 000 avec prise ferme, convertibles à chaque date anniversaire à partir de deux ans (4 obligations contre 3 actions de nominal 10 000), ou remboursables au terme de six ans. Le traitement diffère de l'emprunt ordinaire : **seul le prix d'émission est constaté**, au compte **1612 — Emprunts obligataires convertibles**, et la prime n'est ni comptabilisée ni étalée — elle ne sera due que si le porteur choisit le numéraire. Ce risque est **provisionné**.",
      },
      {
        type: 'carte',
        titre: "Émission, provision, conversion",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["521", "", "01/01/N — Banques (25 000 × 13 000, prise ferme)", "325 000 000", ""],
            ["", "1612", "Emprunts obligataires convertibles", "", "325 000 000"],
            ["6971", "", "31/12/N — Dotations aux provisions financières pour risques (25 000 × 2 000)", "50 000 000", ""],
            ["", "1988", "Autres provisions pour divers risques et charges", "", "50 000 000"],
            ["1612", "", "01/01/N+2 — Conversion de 4 000 obligations (4 000 × 13 000)", "52 000 000", ""],
            ["", "1013", "Capital souscrit, appelé, versé, non amorti (3 000 × 10 000)", "", "30 000 000"],
            ["", "1054", "Primes de conversion", "", "22 000 000"],
            ["1988", "", "Reprise de la provision (4 000 × 2 000)", "8 000 000", ""],
            ["", "7971", "Reprises de provisions financières pour risques et charges", "", "8 000 000"],
          ],
        },
        note: "La conversion transforme la dette en capitaux propres sans trésorerie : capital pour le nominal émis, **prime de conversion** (1054) pour le solde. La provision est reprise pour les obligations converties ; pour celles qui seront remboursées en numéraire, la prime sera portée au débit du 6714 avec reprise de la quote-part de provision. Rappel du chapitre 4 : la décision d'émettre des valeurs mobilières donnant accès au capital emporte renonciation des actionnaires à leur DPS sur les titres à provenir de la conversion (art. 587-2).",
      },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[12] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas-1',
    titre: "Cas 1 — ÉQUATEUR PALMIER SA : emprunt à amortissements constants",
    contexte: "ÉQUATEUR PALMIER SA (constituée depuis six ans, capital intégralement libéré) émet le 01/01/N, sur décision de son assemblée générale, 8 000 obligations de nominal 10 000, au prix d'émission de 9 800, remboursables à 10 200 par amortissements constants sur 4 ans (2 000 obligations par an), au taux de 6 % l'an à terme échu. Frais d'émission : 1 200 000. Les fonds sont reçus directement (prise ferme bancaire).",
    questions: [
      {
        num: 1,
        enonce: "Vérifiez la validité juridique de l'émission.",
        correction: "Émetteur qualifié : SA (art. 780) ayant plus de deux ans d'existence — donc au moins deux bilans approuvés à vérifier, condition remplie à six ans d'activité normale ; capital entièrement libéré (art. 781) ; pas d'obligations à lots (art. 782) ; décision de l'assemblée générale des actionnaires, seule compétente (art. 783 ; art. 546, 5°). Toute émission contraire serait nulle (art. 783-1).",
      },
      {
        num: 2,
        enonce: "Passez les écritures d'émission.",
        correction: "Prise ferme : écriture unique — débit 521 Banques 78 400 000 (8 000 × 9 800) / crédit 1611 Emprunts obligataires ordinaires 78 400 000. Frais d'émission en charges : débit 6316 Frais d'émission d'emprunts 1 200 000 / crédit 521 pour 1 200 000. La prime totale (8 000 × 400 = 3 200 000) n'est pas comptabilisée à l'émission.",
      },
      {
        num: 3,
        enonce: "Dressez le tableau de service de l'emprunt.",
        correction: "Intérêt par obligation : 6 % × 10 000 = 600. N : 8 000 vivantes, intérêts 4 800 000, 2 000 amorties à 10 200 = 20 400 000, annuité 25 200 000. N+1 : 6 000 vivantes, intérêts 3 600 000, amortissement 20 400 000, annuité 24 000 000. N+2 : 4 000 vivantes, intérêts 2 400 000, annuité 22 800 000. N+3 : 2 000 vivantes, intérêts 1 200 000, annuité 21 600 000. Totaux : intérêts 12 000 000 ; remboursements 81 600 000 ; annuités 93 600 000.",
      },
      {
        num: 4,
        enonce: "Passez l'écriture de la première annuité (31/12/N).",
        correction: "Prime étalée au prorata des obligations échues : 3 200 000 / 4 = 800 000 par an. Écriture : débit 1611 pour 19 600 000 (20 400 000 − 800 000, soit 2 000 × 9 800), débit 6711 Charges d'intérêts 4 800 000, débit 6714 Primes de remboursement des obligations 800 000 / crédit 521 Banques 25 200 000 (schéma de l'Application 78).",
      },
      {
        num: 5,
        enonce: "La société rachète en bourse, en N+2, 500 de ses obligations et les rembourse. Peut-elle les replacer ultérieurement ?",
        correction: "Non : les obligations rachetées par la société émettrice et remboursées sont annulées et ne peuvent être remises en circulation (art. 784). Le rachat-annulation éteint définitivement la fraction correspondante de la dette.",
      },
    ],
  },
  {
    id: 'cas-2',
    titre: "Cas 2 — CONGO CENTRAL CIMENTS SA : emprunt in fine",
    contexte: "CONGO CENTRAL CIMENTS SA émet le 01/01/N 10 000 obligations de nominal 8 000, au prix d'émission de 7 600, remboursables in fine le 31/12/N+3 à 8 300, au taux de 7 % l'an à terme échu (prise ferme).",
    questions: [
      {
        num: 1,
        enonce: "Passez l'écriture d'émission et calculez la prime totale.",
        correction: "Débit 521 Banques 76 000 000 (10 000 × 7 600) / crédit 1611 pour 76 000 000. Prime de remboursement : 10 000 × (8 300 − 7 600) = 7 000 000, non comptabilisée à l'émission.",
      },
      {
        num: 2,
        enonce: "Comment la prime est-elle rattachée aux exercices ? Passez l'écriture du 31/12/N.",
        correction: "Remboursement in fine : toutes les obligations vivent jusqu'au terme, l'étalement se fait au prorata des intérêts courus (Application 79). Intérêts annuels : 10 000 × 7 % × 8 000 = 5 600 000, identiques sur 4 exercices (total 22 400 000) : chaque exercice porte un quart de la prime, soit 1 750 000. Écritures du 31/12/N : débit 6711 5 600 000 / crédit 521 pour 5 600 000 (paiement du coupon) ; débit 6714 1 750 000 / crédit 1661 Intérêts courus sur emprunts obligataires 1 750 000 (rattachement de la prime).",
      },
      {
        num: 3,
        enonce: "Passez les écritures du dénouement au 31/12/N+3.",
        correction: "Dernier coupon : débit 6711 5 600 000 / crédit 521. Dernière quote-part de prime : débit 6714 1 750 000 / crédit 1661 (le 1661 cumule alors 7 000 000). Remboursement : 10 000 × 8 300 = 83 000 000 — débit 1611 76 000 000 et débit 1661 7 000 000 / crédit 521 Banques 83 000 000. La dette au prix d'émission et la prime accumulée sont soldées ensemble.",
      },
      {
        num: 4,
        enonce: "Comparez la charge financière totale de l'emprunt pour la société et son taux de revient apparent.",
        correction: "Charges totales : intérêts 22 400 000 + prime 7 000 000 = 29 400 000 (hors frais d'émission éventuels), pour 76 000 000 effectivement reçus sur 4 ans. Le coût effectif excède donc le taux facial de 7 % : la décote d'émission (400 par titre) et la prime de remboursement (300 par titre) renchérissent la ressource — c'est tout l'objet de l'étalement du 6714, qui rattache ce surcoût aux exercices qui bénéficient du financement plutôt qu'au seul exercice du remboursement.",
      },
    ],
  },
  {
    id: 'cas-3',
    titre: "Cas 3 — KINSHASA DIGITAL SA : obligations convertibles",
    contexte: "KINSHASA DIGITAL SA émet le 01/01/N, avec prise ferme, 10 000 obligations convertibles de nominal 12 000, au prix d'émission de 10 800, convertibles à partir du deuxième anniversaire à raison de 2 obligations contre 1 action de nominal 20 000, ou remboursables au terme de 5 ans à 12 000. Au 01/01/N+3, 6 000 obligations sont converties.",
    questions: [
      {
        num: 1,
        enonce: "Passez les écritures d'émission et de clôture N.",
        correction: "Émission : débit 521 Banques 108 000 000 (10 000 × 10 800) / crédit 1612 Emprunts obligataires convertibles 108 000 000 — seul le prix d'émission est constaté, la prime n'est ni comptabilisée ni étalée (Application 80). Provision du risque de prime au 31/12/N : 10 000 × (12 000 − 10 800) = 12 000 000 — débit 6971 Dotations aux provisions financières pour risques et charges / crédit 1988 Autres provisions pour divers risques et charges 12 000 000.",
      },
      {
        num: 2,
        enonce: "Passez l'écriture de conversion du 01/01/N+3.",
        correction: "6 000 obligations converties → 6 000 / 2 = 3 000 actions de nominal 20 000, soit 60 000 000 de capital. Dette convertie : 6 000 × 10 800 = 64 800 000. Écriture : débit 1612 64 800 000 / crédit 1013 pour 60 000 000 et crédit 1054 Primes de conversion 4 800 000. Aucun flux de trésorerie : la dette devient des capitaux propres.",
      },
      {
        num: 3,
        enonce: "Quel sort pour la provision après la conversion ?",
        correction: "La quote-part de provision afférente aux 6 000 obligations converties est reprise : 6 000 × 1 200 = 7 200 000 — débit 1988 / crédit 7971 Reprises de provisions financières pour risques et charges 7 200 000. La provision résiduelle (4 800 000) couvre les 4 000 obligations restantes ; si elles sont remboursées en numéraire au terme, la prime (4 000 × 1 200 = 4 800 000) sera portée au débit du 6714 et la provision reprise en conséquence.",
      },
      {
        num: 4,
        enonce: "Pourquoi les actionnaires n'ont-ils pas eu à exercer de droit préférentiel de souscription lors de la conversion ?",
        correction: "Parce que la décision d'émission de valeurs mobilières donnant accès au capital emporte, de plein droit, renonciation des actionnaires à leur droit préférentiel de souscription aux titres de capital auxquels ces valeurs donnent droit (art. 587-2, vu au chapitre 4). Le consentement des actionnaires a été donné en amont, lors du vote de l'émission des convertibles.",
      },
    ],
  },
  {
    id: 'cas-4',
    titre: "Cas 4 — LULUA FINANCE : questions de régularité et de masse",
    contexte: "Plusieurs situations indépendantes : (a) MBUJI TRANS SARL, prospère depuis dix ans, veut émettre des obligations pour financer sa flotte ; (b) LOMAMI STEEL SA, constituée depuis quatre ans, a un capital libéré aux trois quarts ; (c) KAMINA AGRI SA, éligible, a émis en N−1 des obligations ; son directeur général propose que le directeur financier de la société soit désigné représentant de la masse « pour faciliter la coordination » ; (d) les obligataires de KAMINA AGRI, inquiets d'un projet de fusion, veulent faire entendre leur voix à l'assemblée des actionnaires.",
    questions: [
      {
        num: 1,
        enonce: "MBUJI TRANS SARL peut-elle émettre des obligations ?",
        correction: "Non. L'article 780 réserve l'émission aux sociétés anonymes et aux GIE constitués de SA ; la SARL en est exclue — et l'article 58 lui interdisait déjà d'émettre des titres négociables ou d'en garantir l'émission, à peine de nullité. Son financement de marché passe par une transformation en société par actions, ou par l'emprunt bancaire classique.",
      },
      {
        num: 2,
        enonce: "LOMAMI STEEL SA peut-elle émettre ?",
        correction: "Non, pas en l'état : l'émission d'obligations est interdite aux sociétés dont le capital n'est pas entièrement libéré (art. 781 ; déjà l'art. 389, avant-dernier alinéa). La société remplit la condition d'ancienneté (quatre ans, deux bilans approuvés), mais doit d'abord appeler et obtenir la libération du dernier quart. Une émission passée outre serait nulle (art. 783-1).",
      },
      {
        num: 3,
        enonce: "Le directeur financier de KAMINA AGRI peut-il représenter la masse ?",
        correction: "Non. L'article 787 exclut du mandat de représentant, entre autres, les dirigeants sociaux de la société débitrice et ses employés — le directeur financier cumule les deux qualités. Le représentant est élu par l'assemblée générale des obligataires (un à trois mandataires, art. 786), parmi des personnes indépendantes de la débitrice, résidentes de l'État partie du siège ; en cas d'urgence, désignation judiciaire (art. 788).",
      },
      {
        num: 4,
        enonce: "Comment les obligataires peuvent-ils peser sur le projet de fusion ?",
        correction: "La masse, dotée de la personnalité juridique (art. 785), agit par ses représentants : ceux-ci accomplissent tous les actes de gestion pour la défense des intérêts communs (art. 790) et peuvent participer aux assemblées d'actionnaires — mais sans voix délibérative (art. 791) : les obligataires ne votent pas la fusion. Leur assemblée générale peut être réunie à toute époque (art. 795), notamment sur convocation demandée par des obligataires représentant au moins le trentième des titres (art. 796), pour arrêter la position du groupement.",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 6,
  id: 'ue3-chapitre-6',
  titre: "L'emprunt obligataire",
  sousTitre: "AUSCGIE, art. 779-794 · SYSCOHADA, Applications 78-80",
  infoBulle: "Conditions d'émission (SA de deux ans, capital libéré, assemblée seule compétente), masse des obligataires, et comptabilisation : émission au prix d'émission (1611/1612), étalement de la prime de remboursement (6714, au prorata des obligations échues ou des intérêts courus), obligations convertibles (provision du risque de prime, prime de conversion 1054).",
  loiRef: "AUSCGIE (30 janvier 2014) · SYSCOHADA révisé (AUDCIF)",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Connaître les conditions d'émission des obligations et leurs sanctions (art. 779-784)",
    "Comprendre l'organisation de la masse des obligataires : personnalité juridique, représentants, incompatibilités, pouvoirs (art. 785-794)",
    "Construire le tableau de service d'un emprunt (amortissements constants, in fine) et calculer la prime de remboursement",
    "Comptabiliser l'émission et le service : 1611, 47131/47132, 6316, 6711, 6714, 1661 (Applications 78-79)",
    "Traiter l'emprunt convertible : 1612, provision du risque de prime, conversion en capital avec prime de conversion 1054 (Application 80)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Obligations : titres négociables conférant, dans une même émission, les mêmes droits de créance pour une même valeur nominale (art. 779).",
    "Émetteurs : SA et GIE de SA avec deux ans d'existence et deux bilans approuvés ; capital entièrement libéré ; obligations à lots interdites ; assemblée seule compétente (délégation de deux ans possible) — nullité des émissions contraires (art. 780-783-1).",
    "Obligations rachetées et remboursées : annulées, jamais remises en circulation (art. 784).",
    "Masse des obligataires de plein droit, personnalité juridique, un à trois représentants élus, incompatibilités strictes, pas d'immixtion dans la gestion, présence aux assemblées d'actionnaires sans vote (art. 785-791).",
    "À l'émission, la dette est constatée au prix d'émission (1611) ; les frais d'émission sont des charges (6316) ; la prime de remboursement n'apparaît pas encore.",
    "Étalement de la prime : au prorata des obligations échues (amortissements constants et assimilés, 6714 dans l'annuité) ; au prorata des intérêts courus (in fine, 6714 à 1661).",
    "Convertibles : seul le prix d'émission est constaté (1612) ; le risque de prime est provisionné (6971/1988) puis repris au fil des conversions (7971).",
    "Conversion : dette (au prix d'émission) → capital pour le nominal émis + prime de conversion (1054), sans trésorerie ; les actionnaires ont renoncé à leur DPS dès l'émission (art. 587-2).",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du GIE (AUSCGIE)", precision: "art. 779-784 (définition, conditions d'émission, rachat), 785-794 (masse des obligataires, représentants, incompatibilités, pouvoirs, rémunération), 795-800 (assemblée des obligataires), 546, 5° et 587-2 (renvois)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Guide d'application", precision: "Applications 78 (amortissements constants avec prime), 79 (remboursement in fine) et 80 (emprunt convertible en actions)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Plan de comptes", precision: "comptes 1611, 1612, 1661, 1988, 47131/47132, 6316, 6711, 6714, 6971, 7971, 1054" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE (Acte uniforme révisé du 30 janvier 2014) · SYSCOHADA révisé — Guide d'application et plan de comptes (AUDCIF)",
}

export default chapitre
