import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 3 — CHAPITRE 7 : ÉVALUATION DES TITRES SOCIAUX ET PORTEFEUILLE-TITRES
// SYSCOHADA : Applications 48 à 51 du Guide (acquisition et classement des
// titres, titres non libérés, cessions de participation et de placement,
// PEPS/CMP, dépréciations). AUSCGIE : art. 59 (expertise de la valeur des
// droits sociaux). Les « valeurs » de l'action (mathématique, de rendement)
// sont présentées comme techniques d'évaluation de la pratique.
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1',
    question: "Une entité achète 5 000 actions cotées dans l'espoir d'une hausse à court terme. Dans quel compte les inscrire ?",
    options: [
      { id: 'a', texte: "261 — Titres de participation" },
      { id: 'b', texte: "50 — Titres de placement (5022 pour des actions cotées)" },
      { id: 'c', texte: "2746 — Titres immobilisés" },
      { id: 'd', texte: "2741 — TIAP" },
      { id: 'e', texte: "521 — Banques" },
    ],
    reponseCorrecte: 'b',
    explication: "Le classement suit l'intention : détention de courte durée en vue d'un gain → titres de placement (classe 5 ; 5022 actions cotées dans l'Application 48). La détention durable pour exercer influence ou contrôle relève de 26 (titres de participation) ; la détention durable de portefeuille sans influence relève de 2741 (TIAP) ; les autres titres conservés durablement, de 2746 (titres immobilisés).",
    articleRef: "SYSCOHADA — Guide d'application, Application 48",
  },
  {
    id: 'q2',
    question: "Comment les frais d'acquisition des titres sont-ils traités ?",
    options: [
      { id: 'a', texte: "Toujours en charges" },
      { id: 'b', texte: "Incorporés au coût pour les titres de participation et immobilisés ; enregistrés séparément (sous-comptes 501x/502x en 6, comme 5026) pour les titres de placement cotés à court terme" },
      { id: 'c', texte: "Toujours incorporés au coût" },
      { id: 'd', texte: "Imputés sur la prime d'émission" },
      { id: 'e', texte: "Portés en charges à répartir" },
    ],
    reponseCorrecte: 'b',
    explication: "Règle de l'Application 48 : pour les titres de participation, les TIAP et les titres immobilisés, les frais sont incorporés au coût d'entrée (261 : 40 600 000 = 2 500 × 16 000 + 1,5 % ; 2741 : 30 450 000 ; 2746 : 18 270 000). Pour les titres de placement cotés à court terme, les frais sont enregistrés séparément dans un sous-compte dédié (5026 Frais d'acquisition des actions, 5016 pour les titres du Trésor).",
    articleRef: "SYSCOHADA — Application 48",
  },
  {
    id: 'q3',
    question: "Une entité souscrit des titres immobilisés libérés de moitié. Comment la fraction non libérée est-elle comptabilisée chez le souscripteur ?",
    options: [
      { id: 'a', texte: "Elle n'est pas comptabilisée avant l'appel" },
      { id: 'b', texte: "Le titre entre pour son coût total au débit de 2746, la fraction restant due étant créditée au compte 472 — Versement restant à effectuer sur titres non libérés" },
      { id: 'c', texte: "Elle est portée au compte 109" },
      { id: 'd', texte: "Elle est inscrite en engagement hors bilan uniquement" },
      { id: 'e', texte: "Le titre n'entre que pour la fraction libérée" },
    ],
    reponseCorrecte: 'b',
    explication: "Application 49 : le titre entre à l'actif pour son coût complet (nominal + prime + frais : 241 000 000), la banque n'étant créditée que du montant libéré (141 000 000) et le solde (100 000 000) figurant au crédit du 472 — Versement restant à effectuer sur titres non libérés. À l'appel, le paiement solde le 472 (débit 472 / crédit 521). Symétrie avec le chapitre 1 : chez l'émetteur, c'est le couple 109/4613 qui joue.",
    articleRef: "SYSCOHADA — Application 49 ; plan de comptes, compte 472",
  },
  {
    id: 'q4',
    question: "La cession de titres de participation s'enregistre :",
    options: [
      { id: 'a', texte: "Par le seul compte 777, en produits financiers" },
      { id: 'b', texte: "En deux temps HAO : sortie de la valeur d'origine par 816 (valeurs comptables des cessions d'immobilisations financières) et constatation du prix par 826, avec reprise de la dépréciation existante (2974 / 7972)" },
      { id: 'c', texte: "Par compensation directe du prix et de la valeur comptable" },
      { id: 'd', texte: "Comme une vente de marchandises (701)" },
      { id: 'e', texte: "Par le compte 6771 exclusivement" },
    ],
    reponseCorrecte: 'b',
    explication: "Application 50 : débit 816 / crédit 274 pour la valeur d'origine (50 000 000) ; débit 4856 (créance sur cession) / crédit 826 pour le prix (48 000 000) ; et reprise de la dépréciation existante — débit 2974 / crédit 7972 (6 000 000). L'incidence globale sur le résultat est de +4 000 000 : +6 000 000 en financier (reprise) et −2 000 000 en HAO (prix − valeur d'origine).",
    articleRef: "SYSCOHADA — Application 50",
  },
  {
    id: 'q5',
    question: "La cession de titres de placement s'enregistre :",
    options: [
      { id: 'a', texte: "Par les comptes HAO 816/826, comme une participation" },
      { id: 'b', texte: "En net : le portefeuille (50) est crédité de la valeur d'entrée des titres cédés, la différence avec le prix étant portée en 777 (gain) ou 6771 (perte)" },
      { id: 'c', texte: "Uniquement au bilan, sans effet sur le résultat" },
      { id: 'd', texte: "Par le compte 826 seulement" },
      { id: 'e', texte: "En capitaux propres" },
    ],
    reponseCorrecte: 'b',
    explication: "Application 51 : débit 4721 (créance sur cession de titres de placement) pour le prix, crédit 50 pour la valeur d'entrée des titres sortis, la différence allant en 777 — Gains sur cessions de titres de placement ou 6771 — Perte sur cessions des titres de placement. Résultat financier, et non HAO : les titres de placement relèvent de la gestion courante de trésorerie.",
    articleRef: "SYSCOHADA — Application 51",
  },
  {
    id: 'q6',
    question: "Par quelles méthodes la valeur d'entrée des titres de placement cédés est-elle déterminée ?",
    options: [
      { id: 'a', texte: "Uniquement au dernier cours de bourse" },
      { id: 'b', texte: "PEPS (premier entré, premier sorti) ou coût moyen pondéré — avec permanence des méthodes, le choix influant sur le résultat et sur l'évaluation du portefeuille restant" },
      { id: 'c', texte: "DEPS obligatoirement" },
      { id: 'd', texte: "À la valeur nominale" },
      { id: 'e', texte: "Au choix libre à chaque cession" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Application 51 traite la même cession sous les deux méthodes : PEPS — les titres les plus anciens sortent d'abord (valeur sortie 29 250 000, perte 250 000) — et coût moyen pondéré (CMP = 11 483,33 ; valeur sortie 28 708 333, gain 291 667). Le Guide conclut : le choix influe sur le résultat et l'évaluation des titres restants, d'où l'exigence de permanence des méthodes.",
    articleRef: "SYSCOHADA — Application 51",
  },
  {
    id: 'q7',
    question: "Comment la dépréciation d'un portefeuille de titres de placement est-elle constatée à la clôture ?",
    options: [
      { id: 'a', texte: "Débit 590 / crédit 6795" },
      { id: 'b', texte: "Débit 6795 — Charges pour dépréciations sur titres de placement / crédit 590 — Dépréciations de titres de placement, lorsque la valeur actuelle (par exemple le cours moyen) est inférieure à la valeur d'entrée" },
      { id: 'c', texte: "Débit 6811 / crédit 2974" },
      { id: 'd', texte: "Par réduction directe du compte 50" },
      { id: 'e', texte: "Aucune dépréciation n'est admise sur les titres" },
    ],
    reponseCorrecte: 'b',
    explication: "Application 51 : au 31/12/N−1, la valeur d'entrée des 1 500 titres détenus (18 250 000) excède leur valeur au cours moyen de décembre (1 500 × 12 050 = 18 075 000) — dépréciation de 175 000 par débit 6795 / crédit 590. Pour les titres immobilisés et de participation, la dépréciation passe par 297x (2974 dans l'Application 50), reprise par 7972.",
    articleRef: "SYSCOHADA — Applications 50 et 51",
  },
  {
    id: 'q8',
    question: "La « valeur mathématique comptable » d'une action est, selon la pratique de l'évaluation :",
    options: [
      { id: 'a', texte: "Sa valeur nominale" },
      { id: 'b', texte: "L'actif net comptable divisé par le nombre de titres — capitaux propres rapportés aux actions" },
      { id: 'c', texte: "Son dernier cours de bourse" },
      { id: 'd', texte: "Le dividende annuel multiplié par dix" },
      { id: 'e', texte: "Le total du bilan divisé par le nombre d'actions" },
    ],
    reponseCorrecte: 'b',
    explication: "Technique de la pratique (non définie par l'Acte uniforme) : la valeur mathématique comptable = actif net comptable (capitaux propres) / nombre de titres. Corrigée des plus ou moins-values latentes sur les éléments d'actif et de passif, elle devient la valeur mathématique intrinsèque. Ces valeurs patrimoniales se combinent avec les valeurs de flux (valeur financière fondée sur le dividende, valeur de rendement fondée sur le bénéfice) pour approcher la valeur d'un titre non coté.",
    articleRef: "Technique d'évaluation — pratique financière",
  },
  {
    id: 'q9',
    question: "En cas de cession ou de rachat de titres prévu par l'Acte uniforme, comment leur valeur est-elle fixée à défaut d'accord entre les parties ?",
    options: [
      { id: 'a', texte: "Par le gérant" },
      { id: 'b', texte: "Par expert désigné par les parties ou, à défaut d'accord, par la juridiction compétente statuant à bref délai" },
      { id: 'c', texte: "Par le commissaire aux comptes de la société" },
      { id: 'd', texte: "Par référence à la seule valeur nominale" },
      { id: 'e', texte: "Par tirage au sort entre les évaluations" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 59 de l'AUSCGIE : dans tous les cas où l'Acte uniforme prévoit la cession des titres sociaux d'un associé ou leur rachat par la société, la valeur de ces droits est déterminée, à défaut d'accord amiable, par expert désigné soit par les parties, soit, à défaut d'accord entre elles, par décision de la juridiction compétente statuant à bref délai. C'est là que les techniques d'évaluation (valeurs patrimoniales et de flux) trouvent leur usage contentieux.",
    articleRef: "AUSCGIE, art. 59",
  },
  {
    id: 'q10',
    question: "Une entité acquiert 80 % d'une société non cotée pour la contrôler durablement. Le classement correct est :",
    options: [
      { id: 'a', texte: "5022 — Actions cotées" },
      { id: 'b', texte: "261 — Titres de participation (sociétés sous contrôle exclusif), frais d'acquisition incorporés au coût" },
      { id: 'c', texte: "2741 — TIAP" },
      { id: 'd', texte: "2746 — Titres immobilisés" },
      { id: 'e', texte: "472 — Versements restant à effectuer" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Application 48 classe la participation de 80 % d'une entité non cotée en 261 — Titres de participation, sociétés sous contrôle exclusif, pour 40 600 000 (prix + commission de 1,5 % incorporée). L'intention — détention durable pour exercer le contrôle — commande le classement, indépendamment de la cotation.",
    articleRef: "SYSCOHADA — Application 48",
  },
  {
    id: 'q11',
    question: "Des obligations acquises pour être conservées durablement dans le cadre d'une activité de gestion de portefeuille relèvent du compte :",
    options: [
      { id: 'a', texte: "5011" },
      { id: 'b', texte: "2741 — Titres immobilisés de l'activité de portefeuille (TIAP)" },
      { id: 'c', texte: "261" },
      { id: 'd', texte: "1611" },
      { id: 'e', texte: "50" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Application 48 : 1 500 obligations à 20 000 conservées durablement en gestion de portefeuille → 2741 TIAP pour 30 450 000 (frais incorporés). Le TIAP se distingue de la participation (pas de volonté d'influence ni de contrôle) et du placement (détention durable, non spéculative à court terme).",
    articleRef: "SYSCOHADA — Application 48",
  },
  {
    id: 'q12',
    question: "Dans l'Application 51 (variante CMP), le coût moyen pondéré du portefeuille de 3 000 titres valant au total 34 450 000 est :",
    options: [
      { id: 'a', texte: "12 050" },
      { id: 'b', texte: "11 483,33 — et la sortie de 2 500 titres vaut 28 708 333, dégageant un gain de 291 667 sur un prix de 29 000 000" },
      { id: 'c', texte: "11 000" },
      { id: 'd', texte: "12 000" },
      { id: 'e', texte: "10 000" },
    ],
    reponseCorrecte: 'b',
    explication: "CMP = 34 450 000 / 3 000 = 11 483,3333. Valeur des 2 500 titres sortis : 28 708 333 ; prix de cession 29 000 000 → gain de 291 667 (crédit 777). Sous PEPS, la même cession dégageait une perte de 250 000 : l'écart illustre l'impact du choix de méthode et justifie l'exigence de permanence.",
    articleRef: "SYSCOHADA — Application 51",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '7.1',
    titre: "Le classement des titres : une affaire d'intention",
    navLabel: "Classement",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le même titre — action, obligation, bon — peut occuper quatre places différentes au bilan de son détenteur : tout dépend de l'**intention** qui préside à l'acquisition. L'Application 48 du Guide balaie le spectre en cinq opérations, toutes assorties d'une commission de 1,5 %.",
      },
      {
        type: 'carte',
        titre: "La grille de classement (Application 48)",
        tableau: {
          entetes: ["Intention", "Compte", "Exemple de l'Application 48", "Frais d'acquisition"],
          lignes: [
            ["Gain à court terme (spéculation, trésorerie)", "50 — Titres de placement (5011 titres du Trésor, 5022 actions cotées)", "5 000 actions SICAV à 12 000 ; bons du Trésor 3 000 000", "Enregistrés séparément (5016, 5026)"],
            ["Contrôle ou influence durable", "26 — Titres de participation (261 : contrôle exclusif)", "80 % d'une entité non cotée, 2 500 actions à 16 000", "Incorporés au coût (40 600 000)"],
            ["Détention durable de portefeuille, sans influence", "2741 — TIAP", "1 500 obligations à 20 000 en gestion de portefeuille", "Incorporés au coût (30 450 000)"],
            ["Autres titres conservés durablement", "2746 — Titres immobilisés", "1 000 actions cotées (2 % du capital) conservées durablement", "Incorporés au coût (18 270 000)"],
          ],
        },
      },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[10] },
    ],
  },
  {
    numero: '7.2',
    titre: "Les titres non libérés chez le souscripteur (Application 49)",
    navLabel: "Titres non libérés",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Miroir du chapitre 1 : quand l'émetteur suit sa créance d'appel en 109 et 4613, le **souscripteur** inscrit le titre à l'actif pour son **coût total** et constate sa dette de libération au compte **472 — Versement restant à effectuer sur titres non libérés**. Application 49 : souscription de 20 000 actions (nominal 10 000, prime d'émission 2 000) libérées de moitié — la prime, elle, étant intégralement exigible à la souscription — avec 1 000 000 de frais incorporés (titres immobilisés).",
      },
      {
        type: 'carte',
        titre: "Écritures du souscripteur",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["2746", "", "01/05/N — Titres immobilisés — actions (20 000 × 12 000 + 1 000 000)", "241 000 000", ""],
            ["", "472", "Versement restant à effectuer sur titres non libérés (20 000 × 5 000)", "", "100 000 000"],
            ["", "521", "Banques (20 000 × 7 000 + 1 000 000)", "", "141 000 000"],
            ["472", "", "08/11/N — Libération de la seconde moitié", "100 000 000", ""],
            ["", "521", "Banques", "", "100 000 000"],
          ],
        },
        note: "Le montant libéré à la souscription comprend la moitié du nominal (5 000) et la totalité de la prime (2 000) par titre, plus les frais — cohérent avec l'article 604 de l'AUSCGIE vu au chapitre 4.",
      },
      { type: 'controle', question: QCM[2] },
    ],
  },
  {
    numero: '7.3',
    titre: "Cessions : participation (HAO) contre placement (financier)",
    navLabel: "Cessions",
    blocs: [
      {
        type: 'carte',
        titre: "Application 50 — Cession de titres de participation (valeur d'origine 50 000 000, dépréciation 6 000 000, prix 48 000 000)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["816", "", "15/08/N — Valeurs comptables des cessions d'immobilisations financières", "50 000 000", ""],
            ["", "274", "Titres immobilisés", "", "50 000 000"],
            ["4856", "", "Créances sur cessions d'immobilisations financières", "48 000 000", ""],
            ["", "826", "Produits des cessions d'immobilisations financières", "", "48 000 000"],
            ["2974", "", "Dépréciations des titres immobilisés", "6 000 000", ""],
            ["", "7972", "Reprises de dépréciations des immobilisations financières", "", "6 000 000"],
          ],
        },
        note: "Incidence globale : +4 000 000 — une moins-value HAO de 2 000 000 (826 − 816) plus une reprise financière de 6 000 000. La cession d'immobilisations financières passe par les comptes HAO 816/826 ; jamais par compensation directe.",
      },
      {
        type: 'carte',
        titre: "Application 51 — Cession de titres de placement : PEPS contre CMP",
        tableau: {
          entetes: ["Méthode", "Valeur de sortie des 2 500 titres", "Prix", "Résultat", "Écriture"],
          lignes: [
            ["PEPS (premier entré, premier sorti)", "29 250 000 (1 000 à 12 000 + 500 à 12 500 + 1 000 à 11 000)", "29 000 000", "Perte 250 000", "Débit 4721 29 000 000 et 6771 250 000 / crédit 50 pour 29 250 000"],
            ["Coût moyen pondéré (34 450 000 / 3 000 = 11 483,33)", "28 708 333", "29 000 000", "Gain 291 667", "Débit 4721 29 000 000 / crédit 50 pour 28 708 333 et 777 pour 291 667"],
          ],
        },
        note: "Le choix de méthode influe sur le résultat et sur la valeur du portefeuille restant (5 200 000 en PEPS ; 5 741 667 en CMP) : la permanence des méthodes s'impose. À la clôture, la dépréciation éventuelle se constate par 6795 / 590 (175 000 au 31/12/N−1 dans l'Application, sur la base du cours moyen de décembre).",
      },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[11] },
    ],
  },
  {
    numero: '7.4',
    titre: "L'évaluation des droits sociaux : de la valeur nominale à l'expertise",
    navLabel: "Évaluation des titres",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Combien vaut une action non cotée ? La question se pose à chaque cession de gré à gré, à chaque agrément refusé, à chaque retrait — et l'Acte uniforme y répond d'abord par une règle de procédure : à défaut d'accord amiable entre les parties, la valeur des droits sociaux est déterminée **par expert**, désigné par les parties ou, à défaut, par la juridiction compétente statuant à bref délai (art. 59). Les méthodes que l'expert mobilise relèvent, elles, de la pratique financière.",
      },
      {
        type: 'carte',
        titre: "Les valeurs de la pratique",
        tableau: {
          entetes: ["Valeur", "Formule", "Lecture"],
          lignes: [
            ["Valeur nominale", "Capital / nombre de titres", "Référence juridique (art. 56 : même valeur nominale par catégorie) — sans lien avec la valeur économique"],
            ["Valeur mathématique comptable", "Actif net comptable (capitaux propres) / nombre de titres", "Photographie patrimoniale au bilan"],
            ["Valeur mathématique intrinsèque", "Actif net corrigé des plus et moins-values latentes / nombre de titres", "Patrimoine en valeurs réelles"],
            ["Valeur financière", "Dividende / taux de capitalisation", "Ce que « rapporte » le titre à son porteur"],
            ["Valeur de rendement", "Bénéfice par titre / taux de capitalisation", "Capacité bénéficiaire, distribuée ou non"],
          ],
        },
        note: "Ces définitions et pondérations sont des conventions de la pratique — l'Acte uniforme n'impose aucune formule. L'expert combine généralement valeurs patrimoniales et valeurs de flux selon la nature de la société (patrimoniale, d'exploitation) et l'objet de l'évaluation.",
      },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas-1',
    titre: "Cas 1 — LIKASI CAPITAL : constitution d'un portefeuille",
    contexte: "Au cours du mois de mars N, LIKASI CAPITAL réalise, avec une commission d'intermédiaire de 2 % sur chaque transaction : (a) achat de 2 000 actions cotées BRALIMA à 15 000, pour revente espérée sous six mois ; (b) prise de participation de 65 % dans KOLWEZI LOGISTICS (non cotée) : 13 000 actions à 8 000 ; (c) achat de 800 obligations d'État à 25 000, à conserver durablement en gestion de portefeuille ; (d) achat de 500 actions cotées (0,8 % du capital de l'émettrice) à 30 000, à conserver durablement sans influence.",
    questions: [
      {
        num: 1,
        enonce: "Classez chaque acquisition et justifiez.",
        correction: "(a) Titres de placement — 5022 actions cotées : détention courte en vue d'un gain. (b) Titres de participation — 261 (contrôle exclusif à 65 %) : détention durable pour contrôler. (c) TIAP — 2741 : obligations conservées durablement en activité de portefeuille, sans influence. (d) Titres immobilisés — 2746 : conservation durable, participation trop faible (0,8 %) pour caractériser une participation. Le classement suit l'intention (Application 48).",
      },
      {
        num: 2,
        enonce: "Passez les écritures d'acquisition.",
        correction: "(a) Débit 5022 30 000 000 (2 000 × 15 000) et débit 5026 Frais d'acquisition 600 000 / crédit 521 pour 30 600 000 — frais séparés pour les placements. (b) Débit 261 106 080 000 (13 000 × 8 000 = 104 000 000 + 2 % = 2 080 000) / crédit 521 — frais incorporés. (c) Débit 2741 20 400 000 (800 × 25 000 + 2 %) / crédit 521. (d) Débit 2746 15 300 000 (500 × 30 000 + 2 %) / crédit 521.",
      },
      {
        num: 3,
        enonce: "Au 31/12/N, le cours moyen de décembre des actions BRALIMA est de 14 200. Que constatez-vous ?",
        correction: "Valeur d'entrée : 2 000 × 15 000 = 30 000 000 ; valeur actuelle : 2 000 × 14 200 = 28 400 000 → dépréciation de 1 600 000. Écriture : débit 6795 Charges pour dépréciations sur titres de placement 1 600 000 / crédit 590 Dépréciations de titres de placement 1 600 000 (schéma de l'Application 51). Les frais (5026) déjà en sous-compte de charge ne participent pas à la valeur d'entrée comparée.",
      },
      {
        num: 4,
        enonce: "KOLWEZI LOGISTICS traverse une crise durable ramenant la valeur d'usage de la participation à 95 000 000. Que faire ?",
        correction: "La valeur d'entrée (106 080 000) excède la valeur actuelle (95 000 000) : dépréciation de 11 080 000 par débit du compte de dotation aux dépréciations concerné / crédit 2961 (dépréciations des titres de participation — la famille 296/297 des immobilisations financières, comme le 2974 de l'Application 50). En cas de cession ultérieure, la dépréciation serait reprise par 7972 dans le schéma HAO 816/826.",
      },
    ],
  },
  {
    id: 'cas-2',
    titre: "Cas 2 — GOMA INVEST : cessions de titres de placement, PEPS et CMP",
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
        correction: "Non : la cession de titres de placement relève du résultat financier (777/6771), la gestion d'un portefeuille de placement étant une activité ordinaire de trésorerie. Le circuit HAO (816/826, avec 4856 et reprise 7972) est réservé aux cessions d'immobilisations financières — participations, titres immobilisés (Application 50).",
      },
    ],
  },
  {
    id: 'cas-3',
    titre: "Cas 3 — BUKAVU HOLDING : cession d'une participation dépréciée",
    contexte: "BUKAVU HOLDING cède le 20/09/N sa participation dans RUZIZI THÉ (valeur d'origine 72 000 000 en compte 261, dépréciation constituée 9 000 000) au prix de 66 000 000, payable à 90 jours.",
    questions: [
      {
        num: 1,
        enonce: "Passez les écritures de cession.",
        correction: "Sortie de la valeur d'origine : débit 816 Valeurs comptables des cessions d'immobilisations financières 72 000 000 / crédit 261 pour 72 000 000. Prix : débit 4856 Créances sur cessions d'immobilisations financières 66 000 000 / crédit 826 Produits des cessions d'immobilisations financières 66 000 000. Reprise de la dépréciation : débit 296x (dépréciation des titres de participation) 9 000 000 / crédit 7972 Reprises de dépréciations des immobilisations financières 9 000 000 (schéma de l'Application 50).",
      },
      {
        num: 2,
        enonce: "Calculez l'incidence de l'opération sur le résultat de l'exercice, en distinguant ses composantes.",
        correction: "Composante HAO : 826 − 816 = 66 000 000 − 72 000 000 = −6 000 000 (moins-value de cession). Composante financière : reprise de dépréciation +9 000 000. Incidence globale : +3 000 000. La dépréciation antérieure avait déjà pris en charge l'essentiel de la perte de valeur : l'exercice de cession n'enregistre que l'écart résiduel.",
      },
      {
        num: 3,
        enonce: "Le comptable propose de passer une écriture unique « débit 521 66 000 000, débit 6771 6 000 000 / crédit 261 72 000 000 ». Qu'en pensez-vous ?",
        correction: "Triplement inexact : (1) la cession est à 90 jours — c'est le 4856 qui porte la créance, pas la banque ; (2) les cessions d'immobilisations financières passent par le circuit HAO 816/826, non par le net 6771/777 réservé aux titres de placement ; (3) l'écriture omet la reprise de la dépréciation existante (9 000 000), qui doit être soldée par 7972. La présentation brute (valeur d'origine d'un côté, prix de l'autre) est aussi ce qui alimente correctement les rubriques HAO des états financiers.",
      },
    ],
  },
  {
    id: 'cas-4',
    titre: "Cas 4 — Succession KABEYA : évaluer des parts non cotées",
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
]

const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 7,
  id: 'ue3-chapitre-7',
  titre: "L'évaluation des titres sociaux et le portefeuille-titres",
  sousTitre: "SYSCOHADA, Applications 48-51 · AUSCGIE, art. 59",
  infoBulle: "Classement des titres selon l'intention (participation 261, TIAP 2741, titres immobilisés 2746, placement 50), titres non libérés (472), cessions — circuit HAO pour les immobilisations financières, résultat financier pour les placements, PEPS/CMP — dépréciations, et évaluation des droits sociaux jusqu'à l'expertise de l'article 59.",
  loiRef: "SYSCOHADA révisé (AUDCIF) · AUSCGIE (30 janvier 2014)",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Classer les titres selon l'intention de détention : placement, participation, TIAP, titres immobilisés (Application 48)",
    "Traiter les frais d'acquisition (incorporés ou séparés) et les titres non libérés chez le souscripteur (472, Application 49)",
    "Comptabiliser les cessions : circuit HAO 816/826 avec reprise de dépréciation pour les participations ; net 777/6771 pour les placements",
    "Appliquer PEPS et coût moyen pondéré aux sorties de titres de placement et mesurer leur incidence (Application 51)",
    "Évaluer des droits sociaux non cotés : valeurs patrimoniales et de flux, et recours à l'expert de l'article 59",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Le classement suit l'intention : gain à court terme → 50 ; contrôle ou influence durable → 26 ; portefeuille durable sans influence → 2741 (TIAP) ; autre détention durable → 2746.",
    "Frais d'acquisition : incorporés au coût pour participations, TIAP et titres immobilisés ; enregistrés séparément (5016/5026) pour les placements cotés à court terme.",
    "Titres souscrits non libérés : entrée au coût total, dette de libération au crédit du 472, soldée aux appels (Application 49).",
    "Cession de participation : débit 816 / crédit 26-274 pour la valeur d'origine, débit 4856 / crédit 826 pour le prix, reprise de la dépréciation par 7972 — résultat en deux composantes, HAO et financière (Application 50).",
    "Cession de placement : crédit 50 pour la valeur d'entrée, différence en 777 ou 6771 — résultat financier, jamais HAO (Application 51).",
    "Sorties de placements : PEPS ou coût moyen pondéré, avec permanence des méthodes — le choix déplace le résultat entre exercices.",
    "Dépréciations : 6795/590 pour les placements ; 296x-297x avec reprise 7972 pour les immobilisations financières.",
    "Évaluation des droits sociaux : valeur nominale, mathématique comptable, intrinsèque, financière, de rendement — conventions de la pratique ; à défaut d'accord, expert désigné par les parties ou par la juridiction compétente (art. 59).",
  ],
  references: [
    { genre: 'texte', intitule: "SYSCOHADA révisé — Guide d'application", precision: "Applications 48 (acquisition et classement), 49 (titres non libérés), 50 (cession de titres de participation) et 51 (cession de titres de placement, PEPS/CMP, dépréciation)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Plan de comptes", precision: "comptes 261, 2741, 2746, 296x/2974, 4721, 4856, 472, 50 (5011, 5016, 5022, 5026), 590, 6771, 6795, 777, 7972, 816, 826" },
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du GIE (AUSCGIE)", precision: "art. 56 (valeur nominale) et 59 (détermination de la valeur des droits sociaux par expert à défaut d'accord)" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : SYSCOHADA révisé — Guide d'application et plan de comptes (AUDCIF) · AUSCGIE (Acte uniforme révisé du 30 janvier 2014)",
}

export default chapitre
