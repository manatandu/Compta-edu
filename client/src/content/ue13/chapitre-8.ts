import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 13 — Chapitre 8 : Présentation des états financiers et méthodes
// comptables (IAS 1, IFRS 18, IAS 7, IAS 8, IAS 10)
//
// Le chapitre 1 a exposé les caractéristiques générales des états financiers
// (IAS 1, § 15-38) et la hiérarchie des sources en l'absence de norme
// (IAS 8, § 7-14). Le présent chapitre traite de la structure et du contenu
// de chaque état, de la future norme IFRS 18, du tableau des flux de
// trésorerie, des changements de méthodes et d'estimations, des corrections
// d'erreurs et des événements postérieurs à la clôture.
//
// Sources lues sur texte pendant la rédaction :
// - IAS 1 (texte français intégral) : §§ 9 à 11, 54 à 76B, 81A à 82A, 88 à
//   90, 96 à 106A, 112 à 125, 134 à 136.
// - IFRS 18 (texte anglais, avril 2024) : § 47-48, 52-53, 59-60, 69-73,
//   117-118, C1-C3 ; les passages cités sont des traductions de travail.
// - IAS 7 (texte français intégral) : §§ 6, 10, 18 à 20, 31 à 35, 39 à 44E.
// - IAS 8 (texte français intégral) : §§ 5, 14 à 53.
// - IAS 10 (texte français intégral) : §§ 1 à 22.
// - SYSCOHADA révisé, Titre V (cadre conceptuel) : permanence des méthodes,
//   changements de méthodes et d'estimations, événements postérieurs,
//   tableau des flux de trésorerie.
// Aucun module du support d'origine n'étant consacré à ces normes, les
// exemples et cas sont construits pour ce chapitre.
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'ue13c8-q1',
    question: "Lequel de ces éléments ne fait PAS partie d'un jeu complet d'états financiers selon IAS 1 ?",
    options: [
      { id: 'a', texte: "L'état des variations des capitaux propres" },
      { id: 'b', texte: "Le tableau des flux de trésorerie" },
      { id: 'c', texte: "Le rapport de gestion de la direction" },
      { id: 'd', texte: "Les notes, y compris les informations significatives sur les méthodes comptables" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 1.10 énumère l'état de la situation financière, l'état du résultat net et des autres éléments du résultat global, l'état des variations des capitaux propres, le tableau des flux de trésorerie, les notes, les informations comparatives et, dans certains cas, un état de la situation financière au début de la période précédente. Le rapport de gestion n'en fait pas partie.",
    articleRef: "IAS 1.10",
  },
  {
    id: 'ue13c8-q2',
    question: "Quand l'entité doit-elle présenter un troisième état de la situation financière, au début de la période précédente ?",
    options: [
      { id: 'a', texte: "Chaque année" },
      { id: 'b', texte: "Lorsqu'elle applique une méthode de façon rétrospective, effectue un retraitement rétrospectif ou reclasse des éléments" },
      { id: 'c', texte: "Lorsque son résultat est déficitaire" },
      { id: 'd', texte: "Uniquement lors d'une introduction en bourse" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.10(f) : un état de la situation financière au début de la période précédente est présenté lorsque l'entité applique une méthode comptable de façon rétrospective, effectue un retraitement rétrospectif ou procède à un reclassement, conformément aux § 40A à 40D.",
    articleRef: "IAS 1.10(f)",
  },
  {
    id: 'ue13c8-q3',
    question: "Selon IAS 1, les actifs et passifs d'impôt différé peuvent-ils être classés en éléments courants ?",
    options: [
      { id: 'a', texte: "Oui, pour la part qui se résorbera dans les douze mois" },
      { id: 'b', texte: "Non, lorsque l'entité distingue éléments courants et non courants" },
      { id: 'c', texte: "Oui, au choix de l'entité" },
      { id: 'd', texte: "Seulement les passifs" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.56 : lorsque l'entité présente séparément les éléments courants et non courants, « elle ne doit pas classer les actifs (passifs) d'impôt différé comme actifs (passifs) courants ».",
    articleRef: "IAS 1.56",
  },
  {
    id: 'ue13c8-q4',
    question: "Un stock de pièces détachées qu'une entreprise industrielle s'attend à consommer sur dix-huit mois, dans son cycle d'exploitation normal, est classé :",
    options: [
      { id: 'a', texte: "en actif non courant pour la part consommée au-delà de douze mois" },
      { id: 'b', texte: "en actif courant, les actifs du cycle d'exploitation étant courants même s'ils sont réalisés au-delà de douze mois" },
      { id: 'c', texte: "en immobilisations corporelles" },
      { id: 'd', texte: "au choix de l'entité" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.66(a) et 68 : un actif que l'entité s'attend à consommer dans son cycle d'exploitation normal est courant, « même lorsqu'on ne compte pas les réaliser dans les douze mois ». L'entité indique toutefois le montant qu'elle s'attend à recouvrer au-delà de douze mois (§ 61 et 65).",
    articleRef: "IAS 1.61, 66 et 68",
  },
  {
    id: 'ue13c8-q5',
    question: "Une entité manque, au 31 décembre, à une clause restrictive de son emprunt à long terme, ce qui le rend exigible à vue. Le prêteur renonce à l'exiger le 20 février, avant l'autorisation de publication. Comment classer l'emprunt au 31 décembre ?",
    options: [
      { id: 'a', texte: "Non courant, la renonciation couvrant le manquement" },
      { id: 'b', texte: "Courant, l'entité n'ayant pas à la clôture le droit de différer le règlement d'au moins douze mois" },
      { id: 'c', texte: "Pour moitié courant et non courant" },
      { id: 'd', texte: "Hors bilan" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.74 : le passif est courant même si le prêteur a accepté, après la clôture mais avant l'autorisation de publication, de ne pas exiger le paiement. La renonciation postérieure est un événement ne donnant pas lieu à ajustement (§ 76(b)). Il serait non courant si, à la clôture, le prêteur avait accordé un délai de grâce d'au moins douze mois (§ 75).",
    articleRef: "IAS 1.69(d), 74-76",
  },
  {
    id: 'ue13c8-q6',
    question: "Une clause restrictive ne doit être respectée qu'au 30 juin N+1, six mois après la clôture. Affecte-t-elle le classement de l'emprunt au 31 décembre N ?",
    options: [
      { id: 'a', texte: "Oui, il devient courant" },
      { id: 'b', texte: "Non, mais l'entité fournit des informations sur le risque que le passif devienne remboursable dans les douze mois" },
      { id: 'c', texte: "Oui, s'il est probable que la clause ne sera pas respectée" },
      { id: 'd', texte: "Non, et aucune information n'est requise" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.72B(b) : une clause à respecter seulement après la clôture n'affecte pas l'existence du droit de différer le règlement à la clôture. Le § 76ZA impose alors des informations sur ces clauses, la valeur comptable des passifs concernés et les faits indiquant une difficulté éventuelle à les respecter. La probabilité d'exercice du droit est sans effet sur le classement (§ 75A).",
    articleRef: "IAS 1.72B, 75A et 76ZA",
  },
  {
    id: 'ue13c8-q7',
    question: "Lequel de ces éléments des autres éléments du résultat global sera reclassé ultérieurement en résultat net ?",
    options: [
      { id: 'a', texte: "Un écart de réévaluation d'immobilisations corporelles (IAS 16)" },
      { id: 'b', texte: "Les réévaluations d'un régime à prestations définies (IAS 19)" },
      { id: 'c', texte: "Les écarts de conversion d'un établissement à l'étranger (IAS 21), lors de sa sortie" },
      { id: 'd', texte: "Les variations de juste valeur d'actions désignées à la juste valeur par les autres éléments du résultat global" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 1.82A impose de distinguer les éléments recyclables et non recyclables. Les écarts de conversion sont reclassés en résultat lors de la sortie de l'établissement (IAS 21.48). Les écarts de réévaluation IAS 16 et les réévaluations IAS 19 ne donnent pas lieu à reclassement (IAS 1.96), pas plus que les instruments de capitaux propres désignés (IFRS 9, § 5.7.5-5.7.6).",
    articleRef: "IAS 1.82A et 96 ; IAS 21.48",
  },
  {
    id: 'ue13c8-q8',
    question: "L'entité qui présente ses charges par fonction doit en outre fournir :",
    options: [
      { id: 'a', texte: "une analyse de ses produits par client" },
      { id: 'b', texte: "des informations sur la nature des charges, dont les dotations aux amortissements et les charges liées aux avantages du personnel" },
      { id: 'c', texte: "un second compte de résultat complet par nature" },
      { id: 'd', texte: "aucune information supplémentaire" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.104 : l'entité qui classe les charges par fonction doit fournir des informations supplémentaires sur leur nature, y compris les dotations aux amortissements et les charges liées aux avantages du personnel, ces informations étant utiles pour prévoir les flux de trésorerie futurs (§ 105).",
    articleRef: "IAS 1.99-105",
  },
  {
    id: 'ue13c8-q9',
    question: "Où l'entité présente-t-elle le montant d'impôt relatif à chaque autre élément du résultat global ?",
    options: [
      { id: 'a', texte: "Uniquement dans l'état du résultat global" },
      { id: 'b', texte: "Dans l'état du résultat global ou dans les notes" },
      { id: 'c', texte: "Il n'est jamais présenté" },
      { id: 'd', texte: "Dans le tableau des flux de trésorerie" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.90 : l'entité présente le montant d'impôt relatif à chaque autre élément du résultat global, y compris les ajustements de reclassement, soit dans l'état du résultat net et des autres éléments du résultat global, soit dans les notes.",
    articleRef: "IAS 1.90",
  },
  {
    id: 'ue13c8-q10',
    question: "Que doit présenter l'état des variations des capitaux propres, pour chaque composante ?",
    options: [
      { id: 'a', texte: "Uniquement le solde de clôture" },
      { id: 'b', texte: "Un rapprochement entre l'ouverture et la clôture, distinguant résultat net, autres éléments du résultat global et transactions avec les propriétaires" },
      { id: 'c', texte: "Les flux de trésorerie correspondants" },
      { id: 'd', texte: "Les seules distributions de dividendes" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.106(d) : pour chaque composante, un rapprochement de la valeur comptable au début et à la fin de la période, indiquant séparément les variations issues du résultat net, des autres éléments du résultat global et des transactions avec les propriétaires ; le § 106(b) y ajoute les effets des applications et retraitements rétrospectifs.",
    articleRef: "IAS 1.106",
  },
  {
    id: 'ue13c8-q11',
    question: "Selon IAS 1, quelles informations sur les méthodes comptables l'entité doit-elle fournir ?",
    options: [
      { id: 'a', texte: "Un résumé de toutes les méthodes, même non significatives" },
      { id: 'b', texte: "Les informations significatives sur ses méthodes comptables" },
      { id: 'c', texte: "La reproduction des normes appliquées" },
      { id: 'd', texte: "Aucune, les normes étant publiques" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.117 : l'entité fournit des informations significatives sur ses méthodes comptables. Les informations propres à l'entité sont plus utiles que des formules toutes faites reproduisant les normes (§ 117C), et les informations non significatives ne doivent pas obscurcir les informations significatives (§ 117D).",
    articleRef: "IAS 1.117-117E",
  },
  {
    id: 'ue13c8-q12',
    question: "Sur quelles incertitudes relatives aux estimations IAS 1.125 impose-t-il de fournir des informations ?",
    options: [
      { id: 'a', texte: "Sur toutes les estimations" },
      { id: 'b', texte: "Sur celles qui présentent un risque important d'entraîner un ajustement significatif des valeurs comptables au cours de l'exercice suivant" },
      { id: 'c', texte: "Sur les seules estimations fiscales" },
      { id: 'd', texte: "Sur les estimations des cinq exercices à venir" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.125 : l'entité fournit des informations sur les hypothèses et autres sources majeures d'incertitude qui présentent un risque important d'entraîner un ajustement significatif de la valeur comptable des actifs et passifs au cours de l'exercice suivant, avec leur nature et leur valeur comptable. Les jugements autres que les estimations relèvent du § 122.",
    articleRef: "IAS 1.122-125",
  },
  {
    id: 'ue13c8-q13',
    question: "À compter de quand IFRS 18 s'applique-t-elle ?",
    options: [
      { id: 'a', texte: "Aux exercices ouverts à compter du 1er janvier 2025" },
      { id: 'b', texte: "Aux exercices ouverts à compter du 1er janvier 2027, application anticipée permise" },
      { id: 'c', texte: "Aux exercices ouverts à compter du 1er janvier 2030" },
      { id: 'd', texte: "Elle est facultative" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 18, C1 (traduction de travail) : l'entité applique la norme aux exercices ouverts à compter du 1er janvier 2027 ; l'application anticipée est permise et doit être indiquée. La norme s'applique de manière rétrospective selon IAS 8 (C2).",
    articleRef: "IFRS 18, C1-C2",
  },
  {
    id: 'ue13c8-q14',
    question: "Combien de catégories IFRS 18 prévoit-elle pour classer les produits et charges du compte de résultat ?",
    options: [
      { id: 'a', texte: "Deux : ordinaire et hors activités ordinaires" },
      { id: 'b', texte: "Trois : exploitation, investissement, financement" },
      { id: 'c', texte: "Cinq : exploitation, investissement, financement, impôts sur le résultat, activités abandonnées" },
      { id: 'd', texte: "Quatre : exploitation, financière, exceptionnelle, fiscale" },
    ],
    reponseCorrecte: 'c',
    explication: "IFRS 18.47 (traduction de travail) : l'entité classe les produits et charges du compte de résultat dans l'une des cinq catégories : exploitation, investissement, financement, impôts sur le résultat et activités abandonnées. La catégorie exploitation est résiduelle : elle comprend tous les éléments non classés ailleurs (§ 52).",
    articleRef: "IFRS 18.47 et 52",
  },
  {
    id: 'ue13c8-q15',
    question: "Selon IFRS 18, dans quelle catégorie une entreprise industrielle classe-t-elle sa quote-part du résultat d'une entreprise associée mise en équivalence ?",
    options: [
      { id: 'a', texte: "Exploitation" },
      { id: 'b', texte: "Investissement" },
      { id: 'c', texte: "Financement" },
      { id: 'd', texte: "Impôts sur le résultat" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 18.53(a) (traduction de travail) : sauf activité principale particulière, les produits et charges des participations dans des entreprises associées, coentreprises et filiales non consolidées sont classés dans la catégorie investissement, de même que ceux de la trésorerie et des équivalents de trésorerie (§ 53(b)).",
    articleRef: "IFRS 18.53",
  },
  {
    id: 'ue13c8-q16',
    question: "Quels totaux et sous-totaux IFRS 18 impose-t-elle dans le compte de résultat ?",
    options: [
      { id: 'a', texte: "Marge brute et EBITDA" },
      { id: 'b', texte: "Résultat d'exploitation, résultat avant financement et impôts sur le résultat, et résultat net" },
      { id: 'c', texte: "Valeur ajoutée et excédent brut d'exploitation" },
      { id: 'd', texte: "Aucun sous-total obligatoire" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 18.69 (traduction de travail) : résultat d'exploitation, résultat avant financement et impôts sur le résultat (sous réserve du § 73) et résultat net. Le résultat d'exploitation comprend tous les éléments de la catégorie exploitation (§ 70) ; le résultat avant financement et impôts y ajoute la catégorie investissement (§ 71).",
    articleRef: "IFRS 18.69-73",
  },
  {
    id: 'ue13c8-q17',
    question: "Qu'est-ce qu'une mesure de la performance définie par la direction au sens d'IFRS 18 ?",
    options: [
      { id: 'a', texte: "Tout ratio financier publié par l'entité" },
      { id: 'b', texte: "Un sous-total de produits et de charges utilisé dans la communication publique hors états financiers pour exprimer la vision de la direction, et qui n'est pas imposé par les IFRS" },
      { id: 'c', texte: "La marge brute" },
      { id: 'd', texte: "Le résultat par action" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 18.117 (traduction de travail) : sous-total de produits et de charges que l'entité utilise dans ses communications publiques en dehors des états financiers, pour communiquer la vision de la direction sur un aspect de sa performance d'ensemble, et qui n'est ni énuméré au § 118 ni imposé par les IFRS. La marge brute figure parmi les sous-totaux exclus (§ 118(a)).",
    articleRef: "IFRS 18.117-118",
  },
  {
    id: 'ue13c8-q18',
    question: "Selon IAS 7, qu'est-ce qu'un équivalent de trésorerie ?",
    options: [
      { id: 'a', texte: "Tout placement financier" },
      { id: 'b', texte: "Un placement à court terme, très liquide, facilement convertible en un montant connu de trésorerie et soumis à un risque négligeable de changement de valeur" },
      { id: 'c', texte: "Une créance client à moins d'un an" },
      { id: 'd', texte: "Une action cotée" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 7.6 définit les équivalents de trésorerie comme des « placements à court terme, très liquides qui sont facilement convertibles en un montant connu de trésorerie et qui sont soumis à un risque négligeable de changement de valeur ». Le SYSCOHADA révisé retient une définition proche, en citant l'exemple d'une échéance d'au plus trois mois.",
    articleRef: "IAS 7.6 ; SYSCOHADA, Titre V",
  },
  {
    id: 'ue13c8-q19',
    question: "Quelle méthode de présentation des flux d'exploitation IAS 7 encourage-t-elle, et laquelle le SYSCOHADA révisé impose-t-il ?",
    options: [
      { id: 'a', texte: "Les deux imposent la méthode directe" },
      { id: 'b', texte: "IAS 7 encourage la méthode directe ; le SYSCOHADA révisé impose la méthode indirecte" },
      { id: 'c', texte: "IAS 7 impose la méthode indirecte ; le SYSCOHADA laisse le choix" },
      { id: 'd', texte: "Les deux laissent un choix libre sans préférence" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 7.18-19 admet les deux méthodes et encourage la méthode directe, qui fournit des informations utiles à l'estimation des flux futurs. Le cadre conceptuel du SYSCOHADA révisé indique que la méthode indirecte est imposée pour le tableau des flux de trésorerie.",
    articleRef: "IAS 7.18-19 ; SYSCOHADA, Titre V",
  },
  {
    id: 'ue13c8-q20',
    question: "Selon IAS 7 dans sa version actuelle, une entreprise industrielle peut-elle classer ses intérêts versés en activités de financement ?",
    options: [
      { id: 'a', texte: "Non, ils sont toujours opérationnels" },
      { id: 'b', texte: "Oui : les intérêts versés peuvent être classés en exploitation ou en financement, le classement devant être permanent" },
      { id: 'c', texte: "Seulement s'ils sont capitalisés" },
      { id: 'd', texte: "Non, ils sont toujours d'investissement" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 7.31 et 33 : pour les entités autres que les institutions financières, il n'y a pas de consensus ; les intérêts versés peuvent être classés en exploitation ou en financement, et le classement doit être permanent d'une période à l'autre. Le montant total des intérêts versés est indiqué, qu'ils aient été passés en charges ou incorporés à un actif (§ 32).",
    articleRef: "IAS 7.31-33",
  },
  {
    id: 'ue13c8-q21',
    question: "L'acquisition d'un équipement financée directement par un contrat de location, sans décaissement, figure-t-elle dans le tableau des flux de trésorerie ?",
    options: [
      { id: 'a', texte: "Oui, en investissement et en financement" },
      { id: 'b', texte: "Non : les transactions sans effet sur la trésorerie en sont exclues et font l'objet d'une information ailleurs" },
      { id: 'c', texte: "Oui, en exploitation" },
      { id: 'd', texte: "Seulement si son montant est significatif" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 7.43 : les transactions d'investissement et de financement qui ne requièrent pas de trésorerie sont exclues du tableau et indiquées ailleurs dans les états financiers. Les variations des passifs de financement sans contrepartie de trésorerie sont en outre présentées selon les § 44A à 44E.",
    articleRef: "IAS 7.43-44E",
  },
  {
    id: 'ue13c8-q22',
    question: "À quelles conditions une entité peut-elle changer volontairement de méthode comptable ?",
    options: [
      { id: 'a', texte: "Dès que le changement améliore le résultat" },
      { id: 'b', texte: "Si le changement a pour résultat des informations fiables et plus pertinentes" },
      { id: 'c', texte: "Tous les cinq ans" },
      { id: 'd', texte: "Avec l'accord de l'administration fiscale" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 8.14 : un changement de méthode n'est admis que s'il est imposé par une IFRS ou s'il a pour résultat des informations fiables et plus pertinentes. L'entité doit en indiquer les raisons (§ 29(b)).",
    articleRef: "IAS 8.14 et 29",
  },
  {
    id: 'ue13c8-q23',
    question: "Comment un changement volontaire de méthode comptable est-il comptabilisé ?",
    options: [
      { id: 'a', texte: "De manière prospective, en résultat de l'exercice" },
      { id: 'b', texte: "De manière rétrospective : ajustement des capitaux propres d'ouverture de la première période présentée et des comparatifs, comme si la méthode avait toujours été appliquée" },
      { id: 'c', texte: "En autres éléments du résultat global" },
      { id: 'd', texte: "En annexe seulement" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 8.19(b) et 22 : application rétrospective, en ajustant le solde d'ouverture de chaque composante affectée des capitaux propres pour la première période antérieure présentée et les autres montants comparatifs, sauf impraticabilité (§ 23-27).",
    articleRef: "IAS 8.19-27",
  },
  {
    id: 'ue13c8-q24',
    question: "La première application du modèle de la réévaluation à des immobilisations corporelles est traitée :",
    options: [
      { id: 'a', texte: "comme un changement de méthode rétrospectif selon IAS 8" },
      { id: 'b', texte: "comme une réévaluation selon IAS 16, et non selon les règles d'IAS 8 sur l'application rétrospective" },
      { id: 'c', texte: "comme une correction d'erreur" },
      { id: 'd', texte: "comme un changement d'estimation" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 8.17-18 : la première application d'une méthode de réévaluation selon IAS 16 ou IAS 38 est un changement de méthode, mais elle est traitée comme une réévaluation selon ces normes ; les § 19 à 31 ne s'y appliquent pas.",
    articleRef: "IAS 8.17-18",
  },
  {
    id: 'ue13c8-q25',
    question: "Une entité réduit de 10 à 7 ans la durée d'utilité totale d'une machine. Comment traiter ce changement ?",
    options: [
      { id: 'a', texte: "Rétrospectivement, en retraitant les amortissements passés" },
      { id: 'b', texte: "Prospectivement, comme un changement d'estimation, en répartissant la valeur nette restante sur la durée résiduelle" },
      { id: 'c', texte: "Comme une correction d'erreur" },
      { id: 'd', texte: "En capitaux propres" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 8.36 et 38 : un changement de durée d'utilité est un changement d'estimation comptable, comptabilisé de manière prospective ; il affecte la charge d'amortissement de la période et des périodes ultérieures. Il ne concerne pas les périodes antérieures et ne constitue pas une correction d'erreur (§ 34).",
    articleRef: "IAS 8.32-38",
  },
  {
    id: 'ue13c8-q26',
    question: "Lorsqu'il est difficile de distinguer un changement de méthode d'un changement d'estimation, l'entité :",
    options: [
      { id: 'a', texte: "le traite comme un changement de méthode" },
      { id: 'b', texte: "le traite comme un changement d'estimation" },
      { id: 'c', texte: "le traite comme une correction d'erreur" },
      { id: 'd', texte: "choisit librement" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 8.35 : « Lorsqu'il est difficile d'opérer la distinction entre changement de méthode comptable et changement d'estimation comptable, le changement est traité comme un changement d'estimation comptable. » Un changement de la base d'évaluation est, lui, un changement de méthode.",
    articleRef: "IAS 8.35",
  },
  {
    id: 'ue13c8-q27',
    question: "Comment une erreur significative d'une période antérieure est-elle corrigée selon IAS 8 ?",
    options: [
      { id: 'a', texte: "En résultat de la période de découverte" },
      { id: 'b', texte: "Rétrospectivement, par retraitement des comparatifs ou des soldes d'ouverture de la première période présentée" },
      { id: 'c', texte: "En annexe seulement" },
      { id: 'd', texte: "De manière prospective" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 8.42 : correction rétrospective dans le premier jeu d'états financiers autorisé après la découverte, par retraitement des comparatifs de la période de l'erreur ou, si celle-ci est antérieure, des soldes d'ouverture de la première période présentée. La correction est exclue du résultat de la période de découverte (§ 46). Le SYSCOHADA révisé comptabilise en revanche une charge omise dans le résultat ordinaire de l'exercice de rectification.",
    articleRef: "IAS 8.42-46 ; SYSCOHADA, Titre V",
  },
  {
    id: 'ue13c8-q28',
    question: "En corrigeant une erreur d'une période antérieure, l'entité peut-elle utiliser des informations devenues disponibles après l'autorisation de publication des états de cette période ?",
    options: [
      { id: 'a', texte: "Oui, pour améliorer l'estimation" },
      { id: 'b', texte: "Non : les connaissances a posteriori ne doivent pas être utilisées" },
      { id: 'c', texte: "Oui, si elles sont favorables" },
      { id: 'd', texte: "Oui, avec l'accord de l'auditeur" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 8.53 : les connaissances a posteriori ne doivent pas être utilisées, ni pour formuler des hypothèses sur les intentions passées de la direction, ni pour estimer les montants de la période antérieure. La norme donne l'exemple d'une épidémie de grippe survenue la période suivante, à ignorer pour corriger une provision pour congés maladie.",
    articleRef: "IAS 8.50-53",
  },
  {
    id: 'ue13c8-q29',
    question: "Le 10 février, un client important déclaré en faillite ; sa situation était déjà dégradée au 31 décembre. Les états sont autorisés le 15 mars. Quel traitement ?",
    options: [
      { id: 'a', texte: "Aucun ajustement ; information en annexe" },
      { id: 'b', texte: "Ajustement de la dépréciation de la créance au 31 décembre" },
      { id: 'c', texte: "Comptabilisation dans l'exercice suivant" },
      { id: 'd', texte: "Correction d'erreur" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 10.9(b)(i) : la faillite d'un client après la date de clôture confirme généralement que son crédit s'était détérioré à la clôture ; c'est un événement donnant lieu à ajustement (§ 8). Le SYSCOHADA révisé retient le même principe (exemple d'une créance devenue douteuse).",
    articleRef: "IAS 10.3, 8 et 9",
  },
  {
    id: 'ue13c8-q30',
    question: "Des dividendes sont déclarés le 20 février au titre de l'exercice clos le 31 décembre, avant l'autorisation de publication. Comment les traiter au 31 décembre ?",
    options: [
      { id: 'a', texte: "En passif" },
      { id: 'b', texte: "Ils ne sont pas comptabilisés en passif, aucune obligation n'existant à la clôture ; ils sont mentionnés dans les notes" },
      { id: 'c', texte: "En diminution des capitaux propres et en passif" },
      { id: 'd', texte: "En charges" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 10.12-13 : les dividendes déclarés après la date de clôture ne sont pas comptabilisés comme des passifs à la clôture, car aucune obligation n'existe à ce moment ; ils sont mentionnés dans les notes conformément à IAS 1.",
    articleRef: "IAS 10.12-13",
  },
  {
    id: 'ue13c8-q31',
    question: "Qu'est-ce que la date de l'autorisation de publication des états financiers, lorsque le conseil d'administration arrête les comptes le 18 mars et que l'assemblée les approuve le 15 mai ?",
    options: [
      { id: 'a', texte: "Le 15 mai" },
      { id: 'b', texte: "Le 18 mars" },
      { id: 'c', texte: "Le 31 décembre" },
      { id: 'd', texte: "La date du dépôt au registre" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 10.5 et son exemple : lorsque les états financiers sont soumis à l'approbation des actionnaires après leur publication, la date d'autorisation est celle de l'autorisation de publication par le conseil d'administration (18 mars), et non celle de l'approbation par l'assemblée. L'entité l'indique en annexe (§ 17).",
    articleRef: "IAS 10.4-7 et 17",
  },
  {
    id: 'ue13c8-q32',
    question: "Si, après la clôture, la direction décide de liquider l'entité, les états financiers :",
    options: [
      { id: 'a', texte: "restent établis sur la base de la continuité d'exploitation, avec une information en annexe" },
      { id: 'b', texte: "ne doivent pas être établis sur la base de la continuité de l'exploitation" },
      { id: 'c', texte: "sont ajustés uniquement pour les provisions de restructuration" },
      { id: 'd', texte: "ne sont pas publiés" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 10.14-15 : l'entité ne doit pas établir ses états financiers sur la base de la continuité de l'exploitation si la direction détermine, après la clôture, qu'elle a l'intention ou n'a pas d'autre solution réaliste que de liquider l'entité ou de cesser son activité ; il en résulte une modification fondamentale de la convention comptable.",
    articleRef: "IAS 10.14-16",
  },
  {
    id: 'ue13c8-q33',
    question: "Une entreprise établissant des états IFRS à partir de comptes SYSCOHADA fait apparaître un « résultat hors activités ordinaires ». Selon IAS 1 :",
    options: [
      { id: 'a', texte: "Ce résultat peut être maintenu sous l'intitulé « éléments extraordinaires »" },
      { id: 'b', texte: "Aucun élément ne peut être présenté comme extraordinaire, ni dans les états ni dans les notes ; les éléments significatifs sont présentés séparément avec leur nature et leur montant" },
      { id: 'c', texte: "Ce résultat est porté en autres éléments du résultat global" },
      { id: 'd', texte: "Ce résultat est porté directement en capitaux propres" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.87 interdit de présenter des éléments de produits ou de charges en tant qu'éléments extraordinaires, dans les états comme dans les notes. Les éléments significatifs font l'objet d'une information distincte sur leur nature et leur montant (§ 97-98). Le SYSCOHADA révisé définit au contraire les charges et produits HAO comme des flux non récurrents, ayant un caractère accidentel ou extraordinaire (Titre IX, ch. 4).",
    articleRef: "IAS 1.87, 97-98 ; SYSCOHADA révisé, Titre IX, ch. 4",
  },
  {
    id: 'ue13c8-q34',
    question: "Une entreprise cède un camion pour 900 ; sa valeur comptable est de 650. Comment la cession est-elle présentée ?",
    options: [
      { id: 'a', texte: "Selon IAS 1 comme selon le SYSCOHADA, en brut : produit de 900 et charge de 650" },
      { id: 'b', texte: "Selon IAS 1, en net (profit de 250), la compensation traduisant la nature de l'opération ; selon le SYSCOHADA, en brut dans la partie HAO (postes TN et RO)" },
      { id: 'c', texte: "Selon IAS 1, en produits des activités ordinaires pour 900" },
      { id: 'd', texte: "Selon les deux référentiels, en autres éléments du résultat global" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.34(a) : les profits et pertes sur la sortie d'actifs non courants sont présentés après déduction, du prix reçu, de la valeur comptable et des frais de vente. Le compte de résultat du SYSCOHADA révisé présente séparément les produits des cessions d'immobilisations (TN) et leurs valeurs comptables (RO), dans le résultat HAO.",
    articleRef: "IAS 1.32-34 ; SYSCOHADA révisé, Titre IX, ch. 4",
  },
  {
    id: 'ue13c8-q35',
    question: "Un emprunt de 3 000, dont 800 remboursables dans les douze mois, figure au bilan SYSCOHADA. Comment est-il présenté selon IAS 1 ?",
    options: [
      { id: 'a', texte: "Pour 3 000 en passifs non courants, comme dans les ressources stables du SYSCOHADA" },
      { id: 'b', texte: "Pour 3 000 en passifs courants" },
      { id: 'c', texte: "Pour 2 200 en passifs non courants et 800 en passifs courants" },
      { id: 'd', texte: "En trésorerie-passif" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 1.69 : un passif dont le règlement est dû dans les douze mois est courant. Le bilan fonctionnel du SYSCOHADA range la totalité des emprunts dans les ressources stables et renvoie l'échéancier à la note 16A. Le reclassement réduit les actifs courants nets par rapport au fonds de roulement fonctionnel.",
    articleRef: "IAS 1.60, 69 ; SYSCOHADA révisé, Titre IX, ch. 3 et note 16A",
  },
  {
    id: 'ue13c8-q36',
    question: "Selon IFRS 18, lequel de ces sous-totaux, utilisé dans la communication publique d'une entité, est une mesure de la performance définie par la direction ?",
    options: [
      { id: 'a', texte: "La marge brute" },
      { id: 'b', texte: "Le résultat d'exploitation avant amortissements et pertes de valeur relevant d'IAS 36" },
      { id: 'c', texte: "Le résultat avant impôt" },
      { id: 'd', texte: "Un « EBITDA ajusté » qui exclut en outre les coûts de restructuration" },
    ],
    reponseCorrecte: 'd',
    explication: "IFRS 18.118 exclut de la définition la marge brute, le résultat d'exploitation avant amortissements et pertes de valeur, le résultat avant impôt, notamment. Un sous-total ajusté d'éléments supplémentaires, utilisé dans la communication publique, est présumé traduire la vision de la direction (§ 117 et 119) : il fait l'objet d'une note unique comportant un rapprochement, avec les effets d'impôt et sur les participations ne donnant pas le contrôle (§ 122-123). Traduction de travail.",
    articleRef: "IFRS 18.117-123",
  },
  {
    id: 'ue13c8-q37',
    question: "Une entité qui présente ses charges d'exploitation par fonction selon IFRS 18 doit en outre :",
    options: [
      { id: 'a', texte: "Présenter aussi l'intégralité de ses charges par nature dans le compte de résultat" },
      { id: 'b', texte: "Indiquer dans une note unique le total des amortissements, des avantages du personnel, des pertes de valeur et des dépréciations de stocks, et leur répartition entre les lignes de la catégorie exploitation" },
      { id: 'c', texte: "Ne fournir aucune information par nature" },
      { id: 'd', texte: "Présenter un tableau des soldes intermédiaires de gestion" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 18.83 (traduction de travail). L'entité présente aussi séparément le coût des ventes et décrit qualitativement la nature des charges de chaque ligne par fonction (§ 82). La présentation peut combiner nature et fonction, chaque ligne ne reposant que sur l'une des deux caractéristiques (§ 78).",
    articleRef: "IFRS 18.78, 82-83",
  },
  {
    id: 'ue13c8-q38',
    question: "Quelles variations des passifs issus des activités de financement IAS 7 demande-t-elle d'expliquer ?",
    options: [
      { id: 'a', texte: "Uniquement les flux de trésorerie de financement" },
      { id: 'b', texte: "Les flux de trésorerie, mais aussi les changements sans contrepartie de trésorerie : nouveaux contrats de location, effets de change, variations de juste valeur, variations de périmètre" },
      { id: 'c', texte: "Uniquement les variations de change" },
      { id: 'd', texte: "Aucune : le tableau des flux suffit" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 7.44A-44B : l'entité fournit des informations permettant d'évaluer les variations des passifs issus des activités de financement, y compris les changements sans contrepartie de trésorerie, par exemple au moyen d'un rapprochement entre les soldes d'ouverture et de clôture.",
    articleRef: "IAS 7.44A-44E",
  },
  {
    id: 'ue13c8-q39',
    question: "Dans ses états de l'exercice 2026, une entité n'applique pas encore IFRS 18, obligatoire à compter de 2027. Que doit-elle indiquer ?",
    options: [
      { id: 'a', texte: "Rien, la norme n'étant pas encore en vigueur" },
      { id: 'b', texte: "Ce fait, et les informations connues ou raisonnablement estimables sur l'impact possible de sa première application" },
      { id: 'c', texte: "Un retraitement des comparatifs selon IFRS 18" },
      { id: 'd', texte: "Uniquement le titre de la norme" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 8.30. Le § 31 précise les informations à envisager : titre de la norme, nature des changements imminents, date d'application obligatoire, date prévue de première application, impact prévu ou déclaration selon laquelle il n'est pas connu.",
    articleRef: "IAS 8.30-31",
  },
  {
    id: 'ue13c8-q40',
    question: "Dans quel cas IAS 1 impose-t-elle un troisième état de la situation financière, arrêté au début de la période précédente ?",
    options: [
      { id: 'a', texte: "Chaque année" },
      { id: 'b', texte: "Lorsque l'entité applique une méthode rétrospectivement, effectue un retraitement rétrospectif ou un reclassement ayant une incidence significative sur ce bilan d'ouverture" },
      { id: 'c', texte: "Uniquement lors d'un changement d'estimation" },
      { id: 'd', texte: "Uniquement en cas de regroupement d'entreprises" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.40A-40B. Les notes relatives à ce troisième bilan ne sont pas exigées (§ 40C). Un changement d'estimation, appliqué prospectivement, n'entraîne pas cette obligation.",
    articleRef: "IAS 1.40A-40C",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '8.1',
    titre: "Les états financiers selon IAS 1 : objectif et composantes",
    navLabel: 'IAS 1 : composantes',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les chapitres précédents ont porté sur la comptabilisation et l'évaluation des éléments des états financiers. Ce dernier chapitre traite de leur présentation et de la stabilité des règles qui les produisent. IAS 1 fixe la structure et le contenu minimal des états ; IFRS 18 la remplacera pour les exercices ouverts à compter du 1er janvier 2027 ; IAS 7 régit le tableau des flux de trésorerie ; IAS 8 encadre les changements de méthodes, les changements d'estimations et les corrections d'erreurs ; IAS 10 détermine l'incidence des événements survenus entre la clôture et la publication. Les caractéristiques générales des états financiers et la hiérarchie des sources en l'absence de norme ont été étudiées au chapitre 1 (sections 1.7 et 1.8).",
      },
      { type: 'intertitre', texte: "8.1.1 Objectif des états financiers" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 1, § 9",
        texte: "« Les états financiers sont une représentation structurée de la situation financière et de la performance financière de l'entité. L'objectif des états financiers est de fournir des informations sur la situation financière, la performance financière et les flux de trésorerie de l'entité qui soient utiles à un large éventail d'utilisateurs pour la prise de décisions économiques. Les états financiers montrent également les résultats de la gestion, par la direction, des ressources qui lui sont confiées. »",
      },
      {
        type: 'paragraphe',
        texte: "Les états renseignent sur les actifs, les passifs, les capitaux propres, les produits et charges, les apports et distributions des propriétaires et les flux de trésorerie ; accompagnées des notes, ces informations aident les utilisateurs à prévoir les flux de trésorerie futurs, leurs échéances et leur degré de certitude (§ 9). L'objectif associe ainsi deux fonctions : l'aide à la décision des investisseurs et prêteurs, et la reddition de comptes de la direction sur les ressources qui lui sont confiées.",
      },
      { type: 'intertitre', texte: "8.1.2 Le jeu complet d'états financiers" },
      {
        type: 'carte',
        titre: "Tableau 8.1 — Composantes d'un jeu complet d'états financiers (IAS 1, § 10) et correspondances SYSCOHADA",
        tableau: {
          entetes: ['État selon IAS 1', 'Fonction', 'Équivalent SYSCOHADA révisé (AUDCIF, art. 8)'],
          lignes: [
            ["État de la situation financière", "Actifs, passifs et capitaux propres à la clôture", 'Bilan'],
            ["État du résultat net et des autres éléments du résultat global", "Performance de la période, y compris les produits et charges hors résultat net", 'Compte de résultat (sans autres éléments du résultat global)'],
            ['État des variations des capitaux propres', "Rapprochement des composantes des capitaux propres", "Pas d'état distinct"],
            ['Tableau des flux de trésorerie', "Variation de la trésorerie par activités", 'Tableau des flux de trésorerie'],
            ['Notes', "Méthodes comptables significatives et informations explicatives", 'Notes annexes'],
            ['Informations comparatives ; bilan d\'ouverture de la période précédente en cas de retraitement', "Comparabilité", 'Comparatifs de l\'exercice précédent'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Tous les états sont présentés avec la même importance (§ 11). Le résultat net et les autres éléments du résultat global peuvent figurer dans un état unique, en deux sections successives, ou dans deux états distincts, l'état du résultat net précédant immédiatement celui du résultat global (§ 10A). Les intitulés de la norme ne sont pas imposés : l'entité peut, par exemple, parler d'« état du résultat global » (§ 10).",
      },
      { type: 'intertitre', texte: "8.1.3 Les principes transversaux : regroupement, importance relative et compensation" },
      {
        type: 'paragraphe',
        texte: "Un état financier est le produit d'un regroupement : des milliers de transactions sont agrégées en quelques dizaines de postes. IAS 1 encadre ce regroupement par trois règles. L'entité présente séparément chaque catégorie significative d'éléments similaires, ainsi que les éléments de nature ou de fonction dissemblables, sauf s'ils sont non significatifs (§ 29) ; un élément qui ne justifie pas une ligne dans les états peut justifier une mention dans les notes (§ 30). Elle ne doit pas « diminuer la compréhensibilité des états financiers en obscurcissant les informations significatives par la communication d'informations non significatives » (§ 30A). Enfin, une information exigée par une norme n'a pas à être fournie si elle est non significative, même lorsque la norme en dresse une liste minimale ; à l'inverse, le simple respect des dispositions particulières ne suffit pas si les utilisateurs ne peuvent comprendre l'incidence d'une transaction, et l'entité fournit alors des informations supplémentaires (§ 31). L'importance relative joue donc dans les deux sens : elle autorise à omettre et elle oblige à ajouter.",
      },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 1, § 32",
        texte: "« L'entité ne doit pas compenser les actifs et les passifs ou les produits et les charges, sauf si cette compensation est imposée ou autorisée par une IFRS. »",
      },
      {
        type: 'paragraphe',
        texte: "La justification de l'interdiction est donnée au § 33 : sauf lorsqu'elle correspond à la substance de l'opération, la compensation réduit la capacité des utilisateurs de comprendre les transactions et d'évaluer les flux futurs. Deux précisions en délimitent la portée. L'évaluation d'un actif net de ses dépréciations, par exemple des stocks obsolètes ou des créances douteuses, n'est pas une compensation (§ 33). Inversement, certaines opérations qui ne génèrent pas de produits des activités ordinaires sont présentées en net lorsque cette présentation traduit leur nature : ainsi, l'entité présente les profits et pertes sur la sortie d'actifs non courants après déduction, du prix reçu, de la valeur comptable de l'actif et des frais de vente (§ 34(a)). Le compte de résultat du SYSCOHADA révisé procède à l'inverse : il présente en brut les produits des cessions d'immobilisations (poste TN) et leurs valeurs comptables (poste RO), dans la partie hors activités ordinaires.",
      },
      { type: 'intertitre', texte: "8.1.4 Les états financiers du SYSCOHADA révisé : une autre conception" },
      {
        type: 'paragraphe',
        texte: "L'article 8 de l'AUDCIF dispose qu'« Un jeu complet d'états financiers annuels comprend le Bilan, le Compte de résultat, le Tableau des flux de trésorerie ainsi que les Notes annexes. » L'exercice coïncide avec l'année civile (art. 7), les états sont arrêtés au plus tard dans les quatre mois qui suivent la clôture et la date d'arrêté est mentionnée dans toute transmission (art. 23). La présentation varie selon la taille de l'entité : le Système normal est la règle, le Système minimal de trésorerie étant réservé aux petites entités (art. 11 et 13). Ces états servent plusieurs destinataires à la fois : associés, créanciers, administration fiscale, statistique nationale. De là leur conception : un bilan fonctionnel construit pour l'analyse de l'équilibre financier, un compte de résultat en liste qui fait apparaître en cascade les soldes intermédiaires de gestion, une distinction entre activités ordinaires et hors activités ordinaires. IAS 1 est orientée vers un destinataire privilégié, l'investisseur et le prêteur qui apprécient les flux futurs, et laisse une large liberté de forme sous réserve d'un contenu minimal.",
      },
      {
        type: 'carte',
        titre: "Tableau 8.2 — IAS 1 et SYSCOHADA révisé : différences de conception",
        tableau: {
          entetes: ['Point', 'IAS 1', 'SYSCOHADA révisé'],
          lignes: [
            ['Forme des états', "Contenu minimal, forme libre (§ 54, 57, 82)", "Modèles normalisés, postes codifiés (Titre IX)"],
            ['Bilan', "Distinction courant / non courant ou ordre de liquidité (§ 60)", "Bilan fonctionnel en six masses, avant répartition"],
            ['Performance', "Résultat net et autres éléments du résultat global ; aucun élément extraordinaire (§ 87)", "Compte de résultat en liste ; soldes intermédiaires de gestion ; résultat HAO"],
            ['Variations des capitaux propres', 'État distinct (§ 106)', "Pas d'état distinct"],
            ['Compensation', 'Interdite sauf disposition contraire ; cessions présentées en net (§ 32-34)', 'Cessions présentées en brut (postes TN et RO)'],
            ['Exercice', "Période de présentation de l'entité (§ 36)", "Année civile (art. 7)"],
            ['Date de référence des événements postérieurs', "Date d'autorisation de publication (IAS 10.3)", "Date d'arrêté, au plus tard quatre mois après la clôture (art. 23)"],
          ],
        },
      },
    ],
  },
  {
    numero: '8.2',
    titre: "L'état de la situation financière",
    navLabel: 'Situation financière',
    blocs: [
      { type: 'intertitre', texte: "8.2.1 Contenu minimal et présentation" },
      {
        type: 'paragraphe',
        texte: "IAS 1 énumère les postes que l'état de la situation financière doit au minimum comporter (§ 54) : immobilisations corporelles et incorporelles, immeubles de placement, actifs financiers, participations mises en équivalence, actifs biologiques, stocks, clients, trésorerie, actifs détenus en vue de la vente, fournisseurs, provisions, passifs financiers, actifs et passifs d'impôt exigible et différé, participations ne donnant pas le contrôle, capital et réserves. La norme ne prescrit aucun ordre ni format (§ 57) : l'entité ajoute des postes, rubriques et sous-totaux lorsque cela est utile à la compréhension (§ 55), en fonction de la nature et de la liquidité des actifs, de leur fonction et du montant, de la nature et de l'échéance des passifs (§ 58). Des bases d'évaluation différentes justifient des postes distincts (§ 59). Les sous-totaux ajoutés doivent être composés de montants IFRS, clairement identifiés, cohérents dans le temps et ne pas être mis en évidence davantage que les totaux exigés (§ 55A).",
      },
      { type: 'intertitre', texte: "8.2.2 La distinction entre éléments courants et non courants" },
      {
        type: 'paragraphe',
        texte: "L'entité présente séparément actifs et passifs courants et non courants, sauf si une présentation par ordre de liquidité apporte des informations fiables et plus pertinentes (§ 60), ce qui est le cas d'entités ne fournissant pas de biens ou services dans un cycle d'exploitation identifiable (§ 63). Quelle que soit la présentation, elle indique pour chaque poste le montant recouvrable ou réglable au-delà de douze mois (§ 61). La distinction isole les actifs nets circulants qui répondent au besoin en fonds de roulement des actifs utilisés pour l'activité à long terme (§ 62). Le cycle d'exploitation est la période entre l'acquisition d'actifs en vue de leur transformation et leur réalisation en trésorerie ; à défaut d'être identifiable, il est présumé de douze mois (§ 68). Les actifs et passifs d'impôt différé ne sont jamais classés en éléments courants (§ 56).",
      },
      {
        type: 'carte',
        titre: "Tableau 8.3 — Critères de classement en éléments courants (IAS 1, § 66 et 69)",
        tableau: {
          entetes: ['Actif courant (§ 66)', 'Passif courant (§ 69)'],
          lignes: [
            ["(a) Réalisé, vendu ou consommé dans le cycle d'exploitation normal", "(a) Réglé au cours du cycle d'exploitation normal"],
            ['(b) Détenu principalement à des fins de transaction', '(b) Détenu principalement à des fins de transaction'],
            ['(c) Réalisation attendue dans les douze mois suivant la clôture', '(c) Règlement dû dans les douze mois suivant la clôture'],
            ["(d) Trésorerie ou équivalents, sauf restriction d'au moins douze mois", "(d) Absence, à la clôture, du droit de différer le règlement d'au moins douze mois"],
            ['Tous les autres actifs sont non courants', 'Tous les autres passifs sont non courants'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Le critère (d) des passifs a été précisé par des modifications récentes. Le droit de différer le règlement doit être substantiel et exister à la date de clôture (§ 72A) ; la probabilité que l'entité l'exerce est sans incidence (§ 75A). Une dette financière exigible dans les douze mois reste courante même si un refinancement est conclu après la clôture (§ 72), sauf si, à la clôture, l'entité a le droit de la renouveler en vertu d'une facilité existante (§ 73). Lorsque ce droit dépend du respect de clauses restrictives (*covenants*), seules comptent les clauses à respecter au plus tard à la date de clôture (§ 72B) ; pour les clauses à respecter dans les douze mois suivants, l'entité fournit des informations sur le risque que le passif devienne remboursable (§ 76ZA).",
      },
      {
        type: 'carte',
        titre: "Exemple 8.1 — Classement d'un emprunt assorti d'une clause restrictive",
        texte: "Une entreprise de logistique a souscrit un emprunt de 5 000 000 USD remboursable in fine en N+4. Le contrat stipule que l'emprunt devient exigible à vue si le rapport entre l'endettement et l'excédent brut d'exploitation excède 3, rapport calculé sur les comptes du 31 décembre. Au 31 décembre N, il s'établit à 3,4. Les états financiers sont autorisés le 20 mars N+1.",
        tableau: {
          entetes: ['Hypothèse', 'Classement au 31/12/N', 'Référence'],
          lignes: [
            ["Le prêteur renonce le 15 février N+1 à exiger le remboursement", '**Courant** ; la renonciation est un événement postérieur ne donnant pas lieu à ajustement, mentionné en annexe', '§ 74 et 76(b)'],
            ["Le prêteur a accordé avant le 31 décembre N un délai de grâce jusqu'au 31 mars N+2 pour régulariser", '**Non courant**', '§ 75'],
            ["La clause porte sur les comptes du 30 juin N+1 et non du 31 décembre N", "**Non courant**, avec information sur la clause, la valeur comptable de l'emprunt et les difficultés éventuelles", '§ 72B(b) et 76ZA'],
          ],
        },
        note: "Le reclassement de 5 000 000 USD en passif courant modifie sensiblement le fonds de roulement et les ratios de liquidité présentés. La vérification du respect des clauses restrictives à la clôture est donc un point d'attention de l'arrêté des comptes, et de l'audit.",
      },
      { type: 'intertitre', texte: "8.2.3 Du bilan fonctionnel SYSCOHADA à l'état de la situation financière" },
      {
        type: 'paragraphe',
        texte: "Le bilan du SYSCOHADA révisé opte pour « un classement fonctionnel des postes du bilan » en six grandes masses : actif immobilisé et ressources stables, actif et passif circulants, trésorerie-actif et trésorerie-passif (Titre IX, ch. 3). Sa logique est celle de l'analyse de l'équilibre financier : les ressources stables financent les emplois stables, et le fonds de roulement qui en résulte couvre le besoin de financement du cycle d'exploitation. Il s'ensuit que les emprunts et les dettes de location-acquisition figurent dans les ressources stables pour leur totalité, quelle que soit la part remboursable dans l'année ; l'échéancier est renvoyé à la note 16A, qui ventile les dettes à un an au plus, entre un et deux ans et à plus de deux ans. IAS 1 raisonne en termes de liquidité : la part d'une dette remboursable dans les douze mois est un passif courant, parce qu'elle mobilisera la trésorerie de l'exercice suivant. Le passage de l'un à l'autre n'est donc pas une simple mise en forme : il modifie les indicateurs d'équilibre.",
      },
      {
        type: 'carte',
        titre: "Exemple 8.2 — Reclassement d'un bilan SYSCOHADA selon IAS 1 (en milliers de USD)",
        texte: "Une société cimentière présente au 31 décembre N le bilan SYSCOHADA suivant ; les évaluations sont supposées déjà conformes aux IFRS, seul le classement est étudié. Actif : immobilisations incorporelles 200 ; corporelles 6 000 ; financières 300, dont un prêt au personnel de 50 remboursable dans l'année ; actif circulant HAO (créance sur cession d'immobilisation) 120 ; stocks 1 500 ; clients 1 800 ; autres créances 400 ; trésorerie-actif 600 ; total 10 920. Passif : capitaux propres 4 800 ; emprunts 3 000, dont 800 à moins d'un an ; dettes de location-acquisition 400, dont 100 à moins d'un an ; provisions pour risques et charges 350, dont un litige de 150 dont le dénouement est attendu dans l'année ; dettes circulantes HAO (fournisseur d'immobilisation) 250 ; fournisseurs 1 200 ; dettes fiscales et sociales 500 ; autres dettes 120 ; trésorerie-passif (découvert) 300 ; total 10 920.",
        tableau: {
          entetes: ['État de la situation financière (IAS 1)', 'Montant', 'Origine SYSCOHADA'],
          lignes: [
            ['Immobilisations incorporelles et corporelles', '6 200', 'Actif immobilisé'],
            ['Autres actifs financiers non courants', '250', 'Immobilisations financières, hors part à moins d\'un an'],
            ['**Actifs non courants**', '**6 450**', ''],
            ['Stocks', '1 500', 'Stocks'],
            ['Clients', '1 800', 'Clients'],
            ['Autres actifs courants', '570', 'Autres créances 400 + actif circulant HAO 120 + prêt à moins d\'un an 50'],
            ['Trésorerie et équivalents de trésorerie', '600', 'Trésorerie-actif'],
            ['**Actifs courants**', '**4 470**', ''],
            ['**Capitaux propres**', '**4 800**', ''],
            ['Emprunts non courants', '2 200', 'Emprunts, hors part à moins d\'un an'],
            ['Obligations locatives non courantes', '300', 'Location-acquisition, hors part à moins d\'un an'],
            ['Provisions non courantes', '200', 'Provisions pour risques et charges, hors litige'],
            ['**Passifs non courants**', '**2 700**', ''],
            ['Fournisseurs et autres créditeurs', '1 570', 'Fournisseurs 1 200 + dettes HAO 250 + autres dettes 120'],
            ['Dettes fiscales et sociales', '500', 'Dettes fiscales et sociales'],
            ['Emprunts courants et découverts', '1 100', "Part à moins d'un an des emprunts 800 + trésorerie-passif 300"],
            ['Obligations locatives courantes', '100', "Part à moins d'un an"],
            ['Provisions courantes', '150', 'Litige'],
            ['**Passifs courants**', '**3 420**', ''],
          ],
        },
        note: "Le fonds de roulement SYSCOHADA s'élève à 8 550 − 6 500 = **2 050** (ressources stables : 4 800 + 3 000 + 400 + 350 ; actif immobilisé : 200 + 6 000 + 300). Les actifs courants nets selon IAS 1 ne sont que de 4 470 − 3 420 = **1 050**. L'écart de 1 000 correspond aux parts à moins d'un an des emprunts (800), des obligations locatives (100) et des provisions (150), diminuées du prêt au personnel à moins d'un an (50). Un prêteur qui lit les états IFRS voit une liquidité sensiblement plus tendue que celle que suggère le bilan fonctionnel. Le découvert est un passif courant au bilan ; dans le tableau des flux, il peut toutefois être une composante de la trésorerie lorsqu'il fait partie intégrante de la gestion de trésorerie (IAS 7.8).",
      },
      {
        type: 'paragraphe',
        texte: "Au-delà des postes, IAS 1 exige des informations sur le capital : pour chaque catégorie d'actions, le nombre d'actions autorisées, émises et entièrement libérées ou non, la valeur nominale, le rapprochement du nombre d'actions en circulation entre l'ouverture et la clôture, les droits et restrictions attachés, les actions détenues par l'entité ou ses filiales, ainsi que la nature et l'objet de chaque réserve (§ 79). Le SYSCOHADA révisé traite ces informations dans les notes 13 (capital) et 14 (primes et réserves).",
      },
    ],
  },
  {
    numero: '8.3',
    titre: "L'état du résultat net et des autres éléments du résultat global et l'état des variations des capitaux propres",
    navLabel: 'Résultat global',
    blocs: [
      { type: 'intertitre', texte: "8.3.1 Structure de l'état du résultat global" },
      {
        type: 'paragraphe',
        texte: "L'état présente le résultat net, le total des autres éléments du résultat global et le résultat global de la période (§ 81A), ainsi que leur répartition entre les propriétaires de la société mère et les participations ne donnant pas le contrôle (§ 81B). La section résultat net comporte au minimum les produits des activités ordinaires, avec les produits d'intérêts calculés selon la méthode du taux d'intérêt effectif, les charges financières, les pertes de valeur établies selon IFRS 9, la quote-part des entreprises mises en équivalence, la charge d'impôt et un montant unique pour les activités abandonnées (§ 82). Tous les produits et charges sont comptabilisés en résultat net, sauf si une norme impose ou autorise un autre traitement (§ 88).",
      },
      {
        type: 'paragraphe',
        texte: "La section autres éléments du résultat global classe ces éléments par nature et distingue ceux qui ne seront pas reclassés ultérieurement en résultat net de ceux qui le seront lorsque certaines conditions seront remplies (§ 82A). Le montant d'impôt afférent à chaque élément est présenté dans l'état ou dans les notes (§ 90).",
      },
      {
        type: 'carte',
        titre: "Tableau 8.4 — Autres éléments du résultat global étudiés dans le module",
        tableau: {
          entetes: ['Élément', 'Reclassement en résultat net', 'Référence'],
          lignes: [
            ["Écarts de réévaluation d'immobilisations corporelles et incorporelles", 'Non ; virement possible aux résultats non distribués', 'IAS 1.96 ; IAS 16 ; chapitre 2'],
            ['Réévaluations des régimes à prestations définies', 'Non', 'IAS 1.96 ; IAS 19.122 ; chapitre 6'],
            ["Instruments de capitaux propres désignés à la juste valeur par les autres éléments du résultat global", 'Non', 'IFRS 9, § 5.7.5-5.7.6 ; chapitre 4'],
            ["Instruments de dette à la juste valeur par les autres éléments du résultat global", 'Oui', 'IFRS 9 ; chapitre 4'],
            ["Écarts de conversion d'un établissement à l'étranger", 'Oui, lors de la sortie', 'IAS 21.48 ; chapitre 6'],
          ],
        },
      },
      { type: 'intertitre', texte: "8.3.2 L'analyse des charges par nature ou par fonction" },
      {
        type: 'paragraphe',
        texte: "L'entité présente une analyse des charges comptabilisées en résultat net selon leur nature ou selon leur fonction, en retenant celle qui fournit les informations fiables les plus pertinentes (§ 99). La méthode par nature regroupe les charges sans les affecter aux fonctions ; elle est simple d'application (§ 102). La méthode par fonction, ou du coût des ventes, présente au moins le coût des ventes séparément ; elle peut être plus pertinente, mais implique des affectations comportant une part d'arbitraire et de jugement (§ 103). L'entité qui la retient fournit des informations sur la nature des charges, notamment les amortissements et les charges de personnel (§ 104). Les éléments de produits et charges significatifs sont présentés séparément (§ 97).",
      },
      {
        type: 'carte',
        titre: "Exemple 8.3 — Présentation des charges par nature et par fonction (en milliers de USD)",
        texte: "Une entreprise de transformation alimentaire réalise un chiffre d'affaires de 10 000. Ses charges de l'exercice sont les suivantes : matières consommées 4 000 ; personnel 2 500 (production 1 500, commercial 600, administration 400) ; amortissements 1 000 (production 700, commercial 100, administration 200) ; autres charges 800 (production 300, commercial 300, administration 200). Le stock de produits finis a augmenté de 200.",
        tableau: {
          entetes: ['Présentation par nature', 'Montant', 'Présentation par fonction', 'Montant'],
          lignes: [
            ["Produits des activités ordinaires", '10 000', "Produits des activités ordinaires", '10 000'],
            ['Variation des stocks de produits finis', '200', 'Coût des ventes (4 000 + 1 500 + 700 + 300 − 200)', '(6 300)'],
            ['Matières consommées', '(4 000)', '**Marge brute**', '**3 700**'],
            ['Charges de personnel', '(2 500)', 'Coûts commerciaux (600 + 100 + 300)', '(1 000)'],
            ['Dotations aux amortissements', '(1 000)', 'Charges administratives (400 + 200 + 200)', '(800)'],
            ['Autres charges', '(800)', '', ''],
            ['**Résultat avant charges financières et impôt**', '**1 900**', '**Résultat avant charges financières et impôt**', '**1 900**'],
          ],
        },
        note: "Le résultat est identique ; l'information diffère. La présentation par fonction fait apparaître la marge brute et le poids des fonctions commerciale et administrative ; elle impose de publier en annexe les amortissements (1 000) et les charges de personnel (2 500). La présentation par nature, retenue par le compte de résultat du SYSCOHADA révisé, permet le calcul direct des soldes intermédiaires de gestion.",
      },
      { type: 'intertitre', texte: "8.3.3 Les éléments hors activités ordinaires face à l'interdiction des éléments extraordinaires" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 1, § 87",
        texte: "« L'entité ne doit pas présenter des éléments de produits ou de charges en tant qu'éléments extraordinaires, que ce soit dans l'état ou les états du résultat net et des autres éléments du résultat global ou dans les notes. »",
      },
      {
        type: 'paragraphe',
        texte: "Le SYSCOHADA révisé distingue au contraire, dans son compte de résultat, l'activité ordinaire et l'activité hors activités ordinaires (HAO), dont les charges et produits « correspondent à des flux non récurrents, ayant un caractère accidentel ou extraordinaire » (Titre IX, ch. 4). Le résultat des activités ordinaires y est présenté comme le résultat courant, et le résultat HAO comme celui des opérations peu fréquentes et non récurrentes. L'IASB a supprimé la notion d'élément extraordinaire parce que la frontière entre l'ordinaire et l'extraordinaire dépend largement du jugement de la direction, qui peut être tentée de ranger les charges défavorables dans la seconde catégorie pour flatter un résultat « courant ». IAS 1 ne renonce pas pour autant à l'information sur les éléments inhabituels : lorsque des produits et charges sont significatifs, l'entité en indique séparément la nature et le montant (§ 97), notamment pour les dépréciations de stocks ou d'immobilisations, les restructurations, les sorties d'immobilisations et de placements, les activités abandonnées, le règlement de litiges et les reprises de provisions (§ 98). La différence tient donc au lieu et au statut de l'information : une ligne distincte dans la performance de l'entité, et non un résultat séparé qui échapperait à la mesure de la performance.",
      },
      {
        type: 'carte',
        titre: "Exemple 8.4 — Reclassement du résultat HAO (en milliers de USD)",
        texte: "Le compte de résultat SYSCOHADA d'une entreprise de transport fait apparaître un résultat des activités ordinaires de 1 500 et un résultat HAO de 180, composé des éléments suivants : produit de cession d'un camion 900 (poste TN) et valeur comptable du camion cédé 650 (poste RO) ; pénalités fiscales 40 et don à une œuvre sociale 30 (autres charges HAO, poste RP).",
        tableau: {
          entetes: ['Élément HAO', 'Présentation IFRS (IAS 1)', 'Montant'],
          lignes: [
            ['Cession du camion', "Profit de sortie présenté en net (§ 34(a)), avec les autres produits et charges ; mention séparée s'il est significatif (§ 98(c))", '+250'],
            ['Pénalités fiscales', "Charge de la période ; information distincte si significative (§ 97)", '−40'],
            ['Don', 'Autres charges', '−30'],
            ['**Incidence sur le résultat avant impôt**', '', '**+180**'],
          ],
        },
        note: "Le résultat net est inchangé ; ce qui change, c'est que les 180 font désormais partie de la performance présentée, au lieu d'être isolés sous un résultat distinct. Selon IFRS 18, ces éléments relèveraient de la catégorie exploitation, résiduelle, et seraient donc inclus dans le résultat d'exploitation (section 8.5).",
      },
      { type: 'intertitre', texte: "8.3.4 Le reclassement des autres éléments du résultat global" },
      {
        type: 'paragraphe',
        texte: "La distinction entre autres éléments du résultat global recyclables et non recyclables (§ 82A) a une portée pratique. Un élément recyclable transite deux fois par l'état du résultat global : une première fois en autres éléments du résultat global lors de sa naissance, une seconde fois lors de son reclassement en résultat net, avec un montant de sens opposé dans les autres éléments du résultat global, pour que le résultat global total ne le compte qu'une fois. Les ajustements de reclassement sont indiqués pour chaque composante (§ 92).",
      },
      {
        type: 'carte',
        titre: "Exemple 8.5 — Reclassement d'une réserve de conversion lors de la cession d'une filiale",
        texte: "Un groupe congolais consolide une filiale zambienne dont la réserve de conversion cumulée, portée en autres éléments du résultat global, s'élève à un gain de 120 au 1er janvier N. La filiale est cédée le 30 juin N ; aucun autre écart de conversion n'est né au cours de N. Le profit de cession calculé sur l'actif net consolidé est de 300.",
        tableau: {
          entetes: ['Élément', 'Résultat net', 'Autres éléments du résultat global', 'Résultat global'],
          lignes: [
            ['Profit de cession sur l\'actif net', '300', '', '300'],
            ['Reclassement de la réserve de conversion (IAS 21.48)', '120', '(120)', '0'],
            ['**Total N**', '**420**', '**(120)**', '**300**'],
          ],
        },
        note: "Le gain de change de 120, déjà compris dans le résultat global des exercices antérieurs, n'augmente pas une seconde fois le résultat global de N ; il est simplement transféré en résultat net. La norme IFRS pour les PME ne prévoit pas ce reclassement (chapitre 7).",
      },
      { type: 'intertitre', texte: "8.3.5 L'état des variations des capitaux propres" },
      {
        type: 'paragraphe',
        texte: "L'état des variations des capitaux propres présente le résultat global total, réparti entre propriétaires de la société mère et participations ne donnant pas le contrôle, les effets des applications et retraitements rétrospectifs selon IAS 8 pour chaque composante, et, pour chaque composante, un rapprochement entre l'ouverture et la clôture distinguant le résultat net, les autres éléments du résultat global et les transactions avec les propriétaires : apports, distributions et variations de pourcentage d'intérêt sans perte de contrôle (§ 106). L'analyse des autres éléments du résultat global par élément est présentée dans l'état ou dans les notes (§ 106A). Cet état n'a pas d'équivalent distinct dans le SYSCOHADA révisé ; il est pourtant le lieu où apparaissent les effets de la première adoption et des corrections d'erreurs.",
      },
      {
        type: 'carte',
        titre: "Exemple 8.6 — État des variations des capitaux propres (en milliers de USD)",
        texte: "Une société présente au 1er janvier N un capital de 2 000, une réserve de réévaluation de 300 et des résultats non distribués de 1 500. Au cours de N, elle corrige une erreur de N-1 qui réduit de 60 les résultats non distribués d'ouverture, réalise un résultat net de 400, comptabilise une perte actuarielle nette d'impôt de 30 et une réévaluation d'immobilisations nette d'impôt de 90, vire aux résultats non distribués 20 de réserve de réévaluation au titre de l'amortissement de l'écart, distribue un dividende de 150 et augmente son capital de 500.",
        tableau: {
          entetes: ['', 'Capital', 'Réserve de réévaluation', 'Résultats non distribués', 'Total'],
          lignes: [
            ['Solde publié au 1er janvier N', '2 000', '300', '1 500', '3 800'],
            ["Correction d'erreur (IAS 8)", '', '', '(60)', '(60)'],
            ['**Solde retraité au 1er janvier N**', '**2 000**', '**300**', '**1 440**', '**3 740**'],
            ['Résultat net', '', '', '400', '400'],
            ['Autres éléments du résultat global', '', '90', '(30)', '60'],
            ['**Résultat global de N**', '', '**90**', '**370**', '**460**'],
            ['Virement de la réserve de réévaluation', '', '(20)', '20', '0'],
            ['Dividendes', '', '', '(150)', '(150)'],
            ['Augmentation de capital', '500', '', '', '500'],
            ['**Solde au 31 décembre N**', '**2 500**', '**370**', '**1 680**', '**4 550**'],
          ],
        },
        note: "La perte actuarielle, non recyclable, est présentée ici directement en résultats non distribués ; IAS 19 permet de la transférer dans les capitaux propres, sans l'imposer, et une entité peut aussi la cumuler dans une réserve distincte. L'état distingue les trois sources de variation que le § 106 impose de séparer : les retraitements rétrospectifs, le résultat global et les transactions avec les propriétaires.",
      },
    ],
  },
  {
    numero: '8.4',
    titre: "Les notes aux états financiers",
    navLabel: 'Notes',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les notes présentent la base d'établissement des états financiers et les méthodes comptables, fournissent les informations exigées par les IFRS qui ne figurent pas ailleurs et celles qui sont utiles à la compréhension (§ 112). Elles sont organisées de manière systématique, avec des références croisées depuis chaque poste des états (§ 113). L'ordre peut suivre celui des postes, regrouper les éléments évalués de manière similaire ou mettre en évidence les activités les plus pertinentes (§ 114).",
      },
      { type: 'intertitre', texte: "8.4.1 Les informations sur les méthodes comptables" },
      {
        type: 'paragraphe',
        texte: "L'entité fournit les informations significatives sur ses méthodes comptables (§ 117). Une information sur une méthode est significative si l'on peut raisonnablement s'attendre à ce qu'elle influence les décisions des principaux utilisateurs. Elle l'est probablement lorsque la méthode a changé, résulte d'un choix entre options, a été élaborée selon IAS 8 en l'absence de norme, repose sur des jugements ou hypothèses importants, ou porte sur un traitement complexe (§ 117B). Les informations propres à l'entité sont plus utiles que la reproduction des normes (§ 117C), et les informations non significatives ne doivent pas obscurcir les autres (§ 117D).",
      },
      { type: 'intertitre', texte: "8.4.2 Jugements, incertitudes et gestion du capital" },
      {
        type: 'carte',
        titre: "Tableau 8.5 — Informations des notes relatives au jugement et au capital",
        tableau: {
          entetes: ['Information', 'Contenu', 'Référence'],
          lignes: [
            ['Jugements de la direction', "Jugements, autres que les estimations, ayant le plus d'incidence sur les montants comptabilisés : transfert des risques et avantages, ventes constituant en substance un financement, caractéristiques des flux contractuels d'un actif financier", '§ 122-124'],
            ["Sources d'incertitude relative aux estimations", "Hypothèses présentant un risque important d'ajustement significatif des actifs et passifs au cours de l'exercice suivant, avec leur nature et leur valeur comptable", '§ 125'],
            ['Gestion du capital', "Objectifs, procédures et processus ; données quantitatives ; respect des exigences externes et conséquences d'un manquement", '§ 134-136'],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Observation — Les estimations sensibles dans les entreprises congolaises",
        texte: "Les chapitres précédents permettent d'identifier les sources d'incertitude qui relèvent le plus souvent du § 125 dans une entreprise commerciale ou industrielle congolaise : les pertes de crédit attendues sur des créances exposées à la conjoncture minière et au change ; la valeur recouvrable d'actifs miniers ou industriels dépendant des cours des matières premières ; les passifs de démantèlement et de remise en état ; les obligations au titre des indemnités de départ, sensibles au taux d'actualisation ; la recouvrabilité des actifs d'impôt différé. Pour chacune, l'information utile porte sur la valeur comptable exposée et sur la sensibilité aux hypothèses, et non sur une description générale de la méthode.",
      },
      {
        type: 'paragraphe',
        texte: "L'information requise par le § 125 porte sur la nature des hypothèses et sur la valeur comptable des actifs et passifs concernés. Elle est présentée de manière à aider les utilisateurs à comprendre les jugements de la direction, par exemple par la sensibilité des valeurs comptables aux méthodes, hypothèses et estimations, ou par l'intervalle des résultats raisonnablement possibles au cours de l'exercice suivant (§ 129). La norme n'impose pas de fournir des budgets ou des prévisions (§ 130).",
      },
      { type: 'intertitre', texte: "8.4.3 Des informations propres à l'entité" },
      {
        type: 'carte',
        titre: "Exemple 8.7 — Information sur une source d'incertitude : l'obligation au titre des indemnités de départ",
        texte: "Une entreprise industrielle évalue son obligation au titre des indemnités de fin de carrière à 2 400 (milliers de USD) avec un taux d'actualisation de 9 % et une progression annuelle des salaires de 6 %. Son actuaire estime qu'une baisse d'un point du taux d'actualisation porterait l'obligation à 2 640, et une hausse d'un point des salaires à 2 590.",
        tableau: {
          entetes: ['Information générique, peu utile', 'Information propre à l\'entité (IAS 1.125 et 129)'],
          lignes: [
            ["« Les engagements sociaux sont évalués selon IAS 19 à partir d'hypothèses actuarielles. »", "Obligation de 2 400 au 31 décembre N ; hypothèses : actualisation 9 %, progression des salaires 6 %"],
            ["« Les hypothèses sont revues chaque année. »", "Une baisse d'un point du taux d'actualisation augmenterait l'obligation de 240 ; une hausse d'un point de la progression salariale, de 190"],
            ["« Le taux d'actualisation est déterminé par référence au marché. »", "Base de détermination du taux retenue par l'entité et justification du choix"],
          ],
        },
        note: "La colonne de gauche reproduit les normes ; celle de droite permet à un prêteur d'apprécier le risque d'ajustement de l'exercice suivant. Le SYSCOHADA révisé demande lui aussi, dans la note 16A, la valeur retenue pour les principales hypothèses actuarielles et leur base de détermination.",
      },
      {
        type: 'paragraphe',
        texte: "Les notes du SYSCOHADA révisé suivent une maquette normalisée de 36 notes, de la note 1 (dettes garanties par des sûretés réelles) à la note 36 (tables des codes). Elles comportent obligatoirement une déclaration explicite de conformité au SYSCOHADA, et chaque élément des états fait l'objet d'une référence croisée vers la note correspondante (Titre IX, ch. 6). L'approche est prescriptive : les tableaux sont prédéfinis, et les modèles non documentés ne sont pas joints. IAS 1 et, plus encore, IFRS 18 privilégient une approche par objectifs et par importance relative : l'entité détermine ce qui est significatif pour ses utilisateurs, ce qui suppose un jugement documenté mais évite la production mécanique de tableaux sans objet.",
      },
      { type: 'intertitre', texte: "8.4.4 La gestion du capital et les exigences externes" },
      {
        type: 'paragraphe',
        texte: "L'entité fournit les informations permettant d'évaluer ses objectifs, procédures et processus de gestion du capital (§ 134) : description de ce qu'elle gère comme capital, nature des exigences en matière de capital imposées de l'extérieur et manière dont elles sont intégrées à sa gestion, résumé des données quantitatives, variations par rapport à la période précédente, respect de ces exigences et, en cas de manquement, ses conséquences (§ 135). Ces informations reposent sur celles qui sont fournies en interne aux principaux dirigeants (§ 135). La notion d'exigence imposée de l'extérieur ne se limite pas aux réglementations prudentielles : pour une entreprise commerciale ou industrielle de l'espace OHADA, elle recouvre les clauses restrictives des contrats d'emprunt, mais aussi les règles de l'AUSCGIE relatives aux capitaux propres.",
      },
      {
        type: 'carte',
        titre: "Exemple 8.8 — Information sur la gestion du capital d'une société anonyme congolaise",
        texte: "Une société anonyme au capital social de 10 000 (milliers de USD) gère comme capital ses capitaux propres et son endettement net. Deux exigences externes s'imposent à elle : un emprunt bancaire exige un rapport entre endettement net et capitaux propres inférieur à 1,5 ; l'article 664 de l'AUSCGIE impose de convoquer l'assemblée générale extraordinaire, dans les quatre mois de l'approbation des comptes, si les capitaux propres deviennent inférieurs à la moitié du capital social du fait des pertes. Au 31 décembre N, les capitaux propres sont de 8 200 et l'endettement net de 9 800.",
        tableau: {
          entetes: ['Information (IAS 1.135)', 'Contenu'],
          lignes: [
            ['(a)(i) Ce qui est géré comme capital', "Capitaux propres (8 200) et endettement net (9 800)"],
            ['(a)(ii) Exigences externes', "Clause restrictive bancaire (ratio inférieur à 1,5) ; seuil de la moitié du capital social (AUSCGIE, art. 664)"],
            ['(b) Données quantitatives', "Ratio endettement net / capitaux propres : 9 800 / 8 200 = 1,20 ; capitaux propres à 82 % du capital social"],
            ['(d) Respect des exigences', "Les deux exigences sont respectées au 31 décembre N"],
            ['(e) Conséquences d\'un manquement', "Sans objet pour N ; l'entité peut décrire la marge disponible avant franchissement des seuils"],
          ],
        },
        note: "Le seuil de l'article 664 s'apprécie sur les capitaux propres des comptes légaux SYSCOHADA, et non sur ceux des états IFRS, qui ne peuvent servir de base aux effets juridiques des comptes (AUDCIF, art. 8 ; chapitre 7). L'entité qui publie en IFRS doit donc, pour informer correctement sur cette exigence, se référer aux capitaux propres de ses comptes légaux, en indiquant l'écart éventuel avec les capitaux propres IFRS.",
      },
    ],
  },
  {
    numero: '8.5',
    titre: "IFRS 18 : la présentation des états financiers à compter de 2027",
    navLabel: 'IFRS 18',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Publiée en avril 2024, IFRS 18 *Presentation and Disclosure in Financial Statements* remplace IAS 1 pour les exercices ouverts à compter du 1er janvier 2027, l'application anticipée étant permise (C1). Elle reprend nombre de dispositions d'IAS 1, notamment sur le classement courant et non courant et sur la définition de l'information significative, mais modifie profondément la structure du compte de résultat. La norme s'applique de manière rétrospective selon IAS 8 (C2), et l'entité présente pour l'exercice comparatif un rapprochement, poste par poste, entre les montants retraités et ceux antérieurement présentés selon IAS 1 (C3). Les passages cités ci-après sont des traductions de travail du texte anglais.",
      },
      { type: 'intertitre', texte: "8.5.1 Les cinq catégories du compte de résultat" },
      {
        type: 'paragraphe',
        texte: "L'entité classe les produits et charges du compte de résultat dans l'une de cinq catégories : exploitation, investissement, financement, impôts sur le résultat et activités abandonnées (§ 47). La catégorie investissement comprend, pour une entité dont l'activité principale n'est ni l'investissement ni le financement de clients, les produits et charges des participations dans des entreprises associées, coentreprises et filiales non consolidées, de la trésorerie et des équivalents de trésorerie, et des autres actifs générant un rendement de manière largement indépendante des autres ressources de l'entité (§ 53). La catégorie financement comprend notamment les produits et charges des passifs issus de transactions consistant uniquement à obtenir un financement, ainsi que les charges d'intérêts identifiées sur d'autres passifs (§ 59-61). La catégorie exploitation est résiduelle : elle comprend tout ce qui n'est pas classé dans les autres catégories (§ 52).",
      },
      {
        type: 'carte',
        titre: "Tableau 8.6 — Totaux et sous-totaux imposés par IFRS 18 (§ 69-72, traduction de travail)",
        tableau: {
          entetes: ['Total ou sous-total', 'Composition'],
          lignes: [
            ["Résultat d'exploitation", "Tous les produits et charges de la catégorie exploitation (§ 70)"],
            ['Résultat avant financement et impôts sur le résultat', "Résultat d'exploitation et produits et charges de la catégorie investissement (§ 71), sous réserve du § 73"],
            ['Résultat net', "Total des produits diminués des charges de toutes les catégories (§ 72)"],
          ],
        },
      },
      {
        type: 'carte',
        titre: "Exemple 8.9 — Reclassement d'un compte de résultat selon IFRS 18 (en milliers de USD)",
        texte: "Reprise de l'exemple 8.3 (résultat avant charges financières et impôt : 1 900), complété par : produits des placements de trésorerie 150 ; quote-part du résultat d'une entreprise associée 100 ; charges d'intérêts sur emprunt bancaire 400 ; impôt sur le résultat 500.",
        tableau: {
          entetes: ['Catégorie', 'Éléments', 'Montant'],
          lignes: [
            ['Exploitation', "Produits et charges de l'exemple 8.3", '1 900'],
            ['**Résultat d\'exploitation**', '', '**1 900**'],
            ['Investissement', 'Produits de trésorerie 150 ; quote-part de l\'entreprise associée 100', '250'],
            ['**Résultat avant financement et impôts sur le résultat**', '', '**2 150**'],
            ['Financement', "Charges d'intérêts sur l'emprunt", '(400)'],
            ['Impôts sur le résultat', '', '(500)'],
            ['**Résultat net**', '', '**1 250**'],
          ],
        },
        note: "Selon IAS 1, la quote-part des entreprises associées et les produits de trésorerie n'avaient pas de place imposée, et le « résultat opérationnel » publié par les entités était défini librement. IFRS 18 impose une définition commune du résultat d'exploitation, ce qui améliore la comparabilité entre entités.",
      },
      { type: 'intertitre', texte: "8.5.2 Regroupement et analyse des charges" },
      {
        type: 'paragraphe',
        texte: "IFRS 18 érige en principes le regroupement et la ventilation des informations. L'entité classe et regroupe les éléments d'après leurs caractéristiques communes, ventile ceux qui présentent des caractéristiques différentes, et veille à ce que le regroupement n'obscurcisse pas une information significative (§ 41) ; elle ventile un élément chaque fois que l'information qui en résulte est significative, dans les états ou, à défaut, dans les notes (§ 42). Pour les charges de la catégorie exploitation, elle retient la présentation qui fournit le résumé structuré le plus utile, selon la nature des charges, leur fonction, ou les deux, chaque ligne ne regroupant toutefois que des charges d'une seule de ces caractéristiques (§ 78). L'entité qui présente au moins une ligne par fonction présente séparément le coût des ventes et décrit qualitativement la nature des charges comprises dans chaque ligne (§ 82). Elle indique en outre, dans une note unique, le total des amortissements des immobilisations corporelles et incorporelles, des avantages du personnel, des pertes de valeur et des dépréciations de stocks, ainsi que leur répartition entre les lignes de la catégorie exploitation (§ 83).",
      },
      {
        type: 'carte',
        titre: "Exemple 8.10 — Note sur les charges spécifiées (IFRS 18, § 83), à partir de l'exemple 8.3",
        tableau: {
          entetes: ['Charge', 'Coût des ventes', 'Coûts commerciaux', 'Charges administratives', 'Total'],
          lignes: [
            ['Amortissements des immobilisations corporelles', '700', '100', '200', '1 000'],
            ['Avantages du personnel', '1 500', '600', '400', '2 500'],
          ],
        },
        note: "L'entité qui présente ses charges par fonction ne perd pas l'information par nature : IFRS 18 la rend obligatoire pour les charges les plus utiles à l'analyse. Ce tableau permet par exemple de reconstituer un excédent brut d'exploitation au sens du SYSCOHADA à partir d'un compte de résultat IFRS présenté par fonction.",
      },
      { type: 'intertitre', texte: "8.5.3 Les mesures de la performance définies par la direction" },
      {
        type: 'paragraphe',
        texte: "Une mesure de la performance définie par la direction est un sous-total de produits et de charges que l'entité utilise dans ses communications publiques en dehors des états financiers, pour communiquer la vision de la direction sur un aspect de sa performance d'ensemble, et qui n'est ni imposé par les IFRS ni énuméré au § 118 (§ 117). Sont notamment exclus la marge brute et les sous-totaux similaires, ainsi que le résultat d'exploitation avant amortissements et pertes de valeur (§ 118). Un « résultat opérationnel courant » ou un « EBITDA ajusté » communiqué aux investisseurs en relève typiquement : l'entité doit alors présenter, dans une note unique, ce que la mesure communique selon la direction, son mode de calcul et un rapprochement avec le total ou sous-total IFRS le plus directement comparable (§ 122-123). Ces mesures cessent ainsi d'échapper au contrôle des états financiers audités.",
      },
      {
        type: 'paragraphe',
        texte: "Le § 118 énumère les sous-totaux qui ne sont pas des mesures de la performance définies par la direction : marge brute, résultat d'exploitation avant amortissements et pertes de valeur relevant d'IAS 36, résultat d'exploitation augmenté des résultats des participations mises en équivalence, résultat avant impôt, résultat des activités poursuivies. Un excédent brut d'exploitation calculé sans ajustement n'est donc pas une telle mesure ; un « EBITDA ajusté » qui exclut les coûts de restructuration en est une. Tout sous-total utilisé dans la communication publique est présumé traduire la vision de la direction, sauf preuve contraire fondée sur des informations raisonnables et justifiables (§ 119-120). Pour chaque mesure, la note indique ce qu'elle communique et pourquoi elle est utile, son mode de calcul, le rapprochement avec le sous-total IFRS le plus directement comparable et, pour chaque élément de rapprochement, l'effet d'impôt et l'effet sur les participations ne donnant pas le contrôle (§ 123).",
      },
      {
        type: 'carte',
        titre: "Exemple 8.11 — Rapprochement d'une mesure de la performance définie par la direction (en milliers de USD)",
        texte: "Une société minière communique à ses investisseurs un « résultat opérationnel courant » qui exclut les coûts de restructuration et les pertes de valeur. Son résultat d'exploitation IFRS 18 est de 4 000 ; les coûts de restructuration s'élèvent à 300 et la perte de valeur d'une concession à 500. Le taux d'impôt applicable est de 30 % ; une participation ne donnant pas le contrôle de 20 % existe dans la filiale qui a supporté la perte de valeur, la restructuration concernant la société mère.",
        tableau: {
          entetes: ['Rapprochement (§ 123(c)-(d))', 'Montant', "Effet d'impôt", 'Effet sur les participations ne donnant pas le contrôle'],
          lignes: [
            ["Résultat d'exploitation (sous-total IFRS 18)", '4 000', '', ''],
            ['Coûts de restructuration', '+300', '(90)', '—'],
            ['Perte de valeur de la concession', '+500', '(150)', '(70)'],
            ['**Résultat opérationnel courant (mesure de la direction)**', '**4 800**', '', ''],
          ],
        },
        note: "L'effet sur les participations ne donnant pas le contrôle est calculé sur le montant net d'impôt : (500 − 150) × 20 % = 70. La note précise que la mesure traduit la vision de la direction et n'est pas nécessairement comparable aux mesures portant un intitulé semblable publiées par d'autres entités (§ 122).",
      },
    ],
  },
  {
    numero: '8.6',
    titre: "Le tableau des flux de trésorerie selon IAS 7",
    navLabel: 'Flux de trésorerie',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le tableau des flux de trésorerie présente les flux de la période classés en activités d'exploitation, d'investissement et de financement (§ 10). Il complète l'information fondée sur la comptabilité d'engagement en montrant la capacité de l'entité à générer de la trésorerie et l'emploi qui en est fait.",
      },
      {
        type: 'carte',
        titre: "Tableau 8.7 — Définitions d'IAS 7 (§ 6)",
        tableau: {
          entetes: ['Terme', 'Définition'],
          lignes: [
            ['Trésorerie', 'Fonds en caisse et dépôts à vue'],
            ['Équivalents de trésorerie', "Placements à court terme, très liquides, facilement convertibles en un montant connu de trésorerie et soumis à un risque négligeable de changement de valeur"],
            ["Activités d'exploitation", "Principales activités génératrices de produits et autres activités qui ne sont ni d'investissement ni de financement"],
            ["Activités d'investissement", "Acquisition et sortie d'actifs à long terme et d'autres placements non inclus dans les équivalents de trésorerie"],
            ['Activités de financement', "Activités entraînant des changements dans le montant et la composition du capital apporté et des emprunts"],
          ],
        },
      },
      { type: 'intertitre', texte: "8.6.1 Méthode directe et méthode indirecte" },
      {
        type: 'paragraphe',
        texte: "Les flux d'exploitation sont présentés selon la méthode directe, qui présente les principales catégories d'entrées et de sorties brutes, ou selon la méthode indirecte, qui ajuste le résultat net des éléments sans effet sur la trésorerie, des variations du besoin en fonds de roulement et des éléments relevant de l'investissement ou du financement (§ 18 et 20). IAS 7 encourage la méthode directe, qui fournit des informations utiles à l'estimation des flux futurs (§ 19). Le SYSCOHADA révisé retient une méthode indirecte particulière : le point de départ n'est pas le résultat net mais l'excédent brut d'exploitation, dont on déduit la capacité d'autofinancement globale, corrigée ensuite de la variation du besoin de financement lié aux activités opérationnelles (Titre IX, ch. 5 ; exemple 8.13).",
      },
      {
        type: 'carte',
        titre: "Exemple 8.12 — Flux de trésorerie d'exploitation selon la méthode indirecte (en milliers de USD)",
        texte: "Reprise de l'exemple 8.9 (résultat net 1 250). Au cours de l'exercice, les stocks ont augmenté de 200, les créances clients de 300 et les dettes fournisseurs de 150. L'entité classe les intérêts payés et l'impôt payé en exploitation, les produits de trésorerie encaissés en investissement ; l'entreprise associée n'a pas distribué de dividende.",
        tableau: {
          entetes: ['Élément', 'Montant'],
          lignes: [
            ['Résultat net', '1 250'],
            ['Dotations aux amortissements', '+1 000'],
            ["Quote-part du résultat de l'entreprise associée, sans encaissement", '−100'],
            ["Produits de trésorerie, présentés en investissement", '−150'],
            ['Augmentation des stocks', '−200'],
            ['Augmentation des créances clients', '−300'],
            ['Augmentation des dettes fournisseurs', '+150'],
            ["**Flux net de trésorerie lié aux activités d'exploitation**", '**1 650**'],
          ],
        },
        note: "Le résultat net de 1 250 ne s'est traduit que partiellement en trésorerie : l'augmentation du besoin en fonds de roulement (350) et la quote-part non distribuée de l'entreprise associée (100) l'expliquent. Les produits de trésorerie de 150 apparaissent dans les flux d'investissement, conformément au classement retenu, qui doit être permanent (§ 31).",
      },
      {
        type: 'carte',
        titre: "Exemple 8.13 — Flux d'exploitation selon la méthode directe et par la CAFG du SYSCOHADA (suite de l'exemple 8.12)",
        texte: "Données complémentaires : les encaissements clients s'élèvent à 9 700 (chiffre d'affaires 10 000 moins l'augmentation des créances de 300). Les matières consommées de 4 000 correspondent à des achats consommés sans variation des stocks de matières ; l'augmentation de 200 des stocks porte sur les produits finis. Les décaissements aux fournisseurs de matières et autres charges externes sont de 4 650, les charges de personnel sont payées pour 2 500, les intérêts de 400 et l'impôt de 500 sont payés dans l'exercice.",
        tableau: {
          entetes: ['Méthode directe (IAS 7.18(a))', 'Montant', 'CAFG du SYSCOHADA (Titre IX, ch. 5)', 'Montant'],
          lignes: [
            ['Encaissements reçus des clients', '9 700', "Excédent brut d'exploitation (10 000 + 200 − 4 000 − 800 − 2 500)", '2 900'],
            ['Paiements aux fournisseurs', '(4 650)', '+ Revenus financiers', '+150'],
            ['Paiements au personnel', '(2 500)', '− Frais financiers', '−400'],
            ['Intérêts payés', '(400)', "− Impôt sur le résultat", '−500'],
            ['Impôt sur le résultat payé', '(500)', '**= CAFG**', '**2 150**'],
            ['', '', "− Variation du besoin de financement (stocks +200, créances +300, dettes +150)", '−350'],
            ['', '', "= Flux des activités opérationnelles, produits de trésorerie compris", '1 800'],
            ["**Flux net lié aux activités d'exploitation**", '**1 650**', "**Flux hors produits de trésorerie (1 800 − 150)**", '**1 650**'],
          ],
        },
        note: "Les trois voies aboutissent au même montant. La méthode indirecte d'IAS 7 part du résultat net ; la CAFG du SYSCOHADA part de l'excédent brut d'exploitation, sans passer par les dotations aux amortissements ; la méthode directe présente les flux bruts. Le SYSCOHADA classe les produits financiers en activités opérationnelles : pour comparer avec la présentation IFRS retenue ici, qui les range en investissement, il faut les retrancher. Contrôle des paiements aux fournisseurs : matières 4 000 + autres charges 800 − augmentation des dettes 150 = 4 650.",
      },
      { type: 'intertitre', texte: "8.6.2 Classements particuliers et informations" },
      {
        type: 'paragraphe',
        texte: "Les intérêts et dividendes perçus ou versés sont présentés séparément et classés de manière permanente (§ 31). Pour les entités autres que les institutions financières, les intérêts versés et les intérêts et dividendes reçus peuvent être classés en exploitation, ou respectivement en financement et en investissement (§ 33) ; les dividendes versés, en financement ou en exploitation (§ 34). Les impôts sur le résultat sont classés en exploitation, sauf rattachement spécifique (§ 35). Les flux liés à l'obtention ou à la perte du contrôle de filiales relèvent de l'investissement (§ 39), ceux liés aux variations de pourcentage sans perte de contrôle, du financement (§ 42A). Les transactions sans effet sur la trésorerie, telle l'acquisition d'un actif financée par un contrat de location, sont exclues du tableau et décrites ailleurs (§ 43). Enfin, l'entité explique les variations des passifs issus des activités de financement, y compris celles sans contrepartie de trésorerie, par exemple par un rapprochement entre soldes d'ouverture et de clôture (§ 44A-44E).",
      },
      {
        type: 'carte',
        titre: "Exemple 8.14 — Rapprochement des passifs issus des activités de financement (IAS 7, § 44A-44E, en milliers de USD)",
        texte: "Emprunts bancaires en dollars et obligations locatives d'une entreprise de télécommunications. Au cours de N, elle a emprunté 1 500, remboursé 900 d'emprunts et 250 d'obligations locatives, pris en location de nouveaux pylônes pour 400 (transaction sans effet sur la trésorerie, IAS 7.43) et constaté un écart de change latent de 60 sur un emprunt en euros.",
        tableau: {
          entetes: ['', 'Emprunts', 'Obligations locatives', 'Total'],
          lignes: [
            ['Solde au 1er janvier N', '3 000', '1 200', '4 200'],
            ['Flux de trésorerie de financement', '+600', '(250)', '+350'],
            ['Nouveaux contrats de location', '', '+400', '+400'],
            ['Effet des variations de change', '+60', '', '+60'],
            ['**Solde au 31 décembre N**', '**3 660**', '**1 350**', '**5 010**'],
          ],
        },
        note: "Seuls les 350 de flux nets apparaissent dans le tableau des flux de trésorerie ; les 460 de variations sans contrepartie de trésorerie n'y figurent pas, mais le rapprochement les rend visibles. Sans lui, un lecteur ne pourrait pas expliquer l'augmentation de 810 de l'endettement à partir du seul tableau des flux. L'entité indique en outre, avec un commentaire de la direction, le montant des soldes de trésorerie importants qui ne sont pas disponibles pour le groupe, par exemple en raison de restrictions de change dans le pays d'une filiale (§ 48-49).",
      },
      {
        type: 'filet',
        titre: "Rapprochement avec le SYSCOHADA révisé",
        texte: "Le tableau des flux de trésorerie du SYSCOHADA révisé, état de synthèse à part entière, retient les mêmes trois catégories et une définition voisine des équivalents de trésorerie, en citant l'exemple d'une échéance d'au plus trois mois ; les découverts bancaires remboursables à vue y sont une composante de la trésorerie. Il impose la méthode indirecte et classe les produits et charges financiers et l'impôt sur le résultat dans les activités opérationnelles (Titre V). IAS 7, qui laisse le choix de la méthode et un choix de classement pour les intérêts et dividendes, admet donc la présentation SYSCOHADA, mais l'inverse n'est pas vrai : une entité qui publie en IFRS peut retenir des classements que le modèle SYSCOHADA ne prévoit pas.",
      },
    ],
  },
  {
    numero: '8.7',
    titre: "IAS 8 : changements de méthodes comptables et changements d'estimations",
    navLabel: 'Méthodes et estimations',
    blocs: [
      {
        type: 'paragraphe',
        texte: "IAS 8 distingue trois situations dont les traitements diffèrent : le changement de méthode comptable, appliqué rétrospectivement ; le changement d'estimation comptable, appliqué prospectivement ; la correction d'erreur, effectuée rétrospectivement. La qualification est donc déterminante pour le résultat de la période.",
      },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 8, § 5",
        texte: "« Les méthodes comptables sont les principes, bases, conventions, règles et pratiques spécifiques appliqués par une entité lors de l'établissement et de la présentation de ses états financiers. » « Les estimations comptables sont des montants des états financiers qui comportent une incertitude d'évaluation. » « L'application rétrospective consiste à appliquer une nouvelle méthode comptable à des transactions, d'autres événements et conditions comme si cette méthode avait toujours été appliquée. »",
      },
      { type: 'intertitre', texte: "8.7.1 Les changements de méthodes comptables" },
      {
        type: 'paragraphe',
        texte: "Une entité ne change de méthode que si le changement est imposé par une IFRS ou s'il a pour résultat des informations fiables et plus pertinentes (§ 14). L'application d'une méthode à des transactions différentes en substance ou nouvelles n'est pas un changement de méthode (§ 16). La première application du modèle de la réévaluation relève d'IAS 16 ou d'IAS 38 (§ 17-18). Le changement résultant de la première application d'une norme suit ses dispositions transitoires ; à défaut, et pour tout changement volontaire, il est appliqué rétrospectivement (§ 19), en ajustant les capitaux propres d'ouverture de la première période présentée et les montants comparatifs (§ 22). L'application rétrospective cède en cas d'impraticabilité, l'entité appliquant alors la méthode à partir de la première période ou de la première date praticable (§ 23-27).",
      },
      {
        type: 'carte',
        titre: "Exemple 8.15 — Passage du coût moyen pondéré au premier entré, premier sorti",
        texte: "En N, une entreprise de distribution de matériaux adopte la méthode PEPS pour ses stocks, jugée plus représentative de la rotation physique de ses produits. Ses états de N présentent N-1 en comparatif. Valeurs des stocks, hors effet d'impôt : 1er janvier N-1 : CMP 700, PEPS 740 ; 31 décembre N-1 : CMP 800, PEPS 860 ; 31 décembre N : CMP 900, PEPS 990.",
        tableau: {
          entetes: ['Élément', 'Calcul', 'Effet'],
          lignes: [
            ['Capitaux propres au 1er janvier N-1 (première période présentée)', '740 − 700', '**+40** en résultats non distribués d\'ouverture'],
            ['Résultat comparatif de N-1', '(860 − 800) − (740 − 700)', '**+20**'],
            ['Résultat de N', '(990 − 900) − (860 − 800)', '**+30**'],
            ['Stock au bilan comparatif du 31 décembre N-1', '', '860 au lieu de 800'],
          ],
        },
        note: "Les états de N présentent trois états de la situation financière (IAS 1.10(f)) et indiquent la nature du changement, ses raisons et le montant de l'ajustement pour chaque poste affecté (IAS 8.29). Le SYSCOHADA révisé calcule lui aussi l'effet de façon rétrospective et l'impute en report à nouveau, mais sans retraiter les comptes de l'exercice précédent : il prévoit des informations pro forma (Titre V).",
      },
      { type: 'intertitre', texte: "8.7.2 Les changements d'estimations comptables" },
      {
        type: 'paragraphe',
        texte: "L'établissement d'estimations raisonnables est une part essentielle de la préparation des états financiers et ne met pas en cause leur fiabilité (§ 33). IAS 8 en donne pour exemples la correction de valeur pour pertes de crédit attendues, la valeur nette de réalisation des stocks, la juste valeur, la charge d'amortissement et la provision pour garanties (§ 32). Un changement d'estimation résulte de nouvelles informations, de nouveaux développements ou d'un surcroît d'expérience ; il ne concerne pas les périodes antérieures (§ 34). Les effets d'un changement de données d'entrée ou de technique d'évaluation sont des changements d'estimation (§ 34A) ; un changement de base d'évaluation est en revanche un changement de méthode, et en cas de doute le changement est traité comme un changement d'estimation (§ 35). L'effet est comptabilisé de manière prospective, en résultat de la période du changement et, le cas échéant, des périodes ultérieures (§ 36-38).",
      },
      {
        type: 'carte',
        titre: "Exemple 8.16 — Révision de la durée d'utilité d'une machine",
        texte: "Une machine acquise 1 000 000 USD est amortie linéairement sur 10 ans. Au début de la cinquième année, l'entreprise constate que l'usure accélérée liée à un travail en trois équipes réduit la durée d'utilité totale à 7 ans.",
        tableau: {
          entetes: ['Élément', 'Calcul', 'Montant'],
          lignes: [
            ['Valeur nette au début de l\'année 5', '1 000 000 − 4 × 100 000', '600 000'],
            ['Durée résiduelle révisée', '7 − 4', '3 ans'],
            ['Dotation annuelle des années 5 à 7', '600 000 / 3', '**200 000**'],
            ['Amortissements des années 1 à 4', '', 'Inchangés'],
          ],
        },
        note: "Le changement est prospectif : il affecte la charge des années 5 à 7 et n'appelle aucun retraitement des exercices antérieurs, dont l'estimation reposait sur les informations alors disponibles. L'entité indique la nature et le montant du changement (§ 39).",
      },
      {
        type: 'carte',
        titre: "Tableau 8.8 — Méthode ou estimation : cas de qualification",
        tableau: {
          entetes: ['Situation', 'Qualification', 'Traitement'],
          lignes: [
            ["Passage du coût moyen pondéré au premier entré, premier sorti", 'Changement de méthode', 'Rétrospectif (IAS 8.19, 22)'],
            ["Révision de la durée d'utilité ou du mode d'amortissement", "Changement d'estimation", 'Prospectif (IAS 8.36 ; IAS 16.61)'],
            ["Modification des paramètres de la matrice de pertes de crédit attendues", "Changement d'estimation (données d'entrée)", 'Prospectif (IAS 8.34A)'],
            ["Passage du modèle du coût au modèle de la juste valeur pour les immeubles de placement", 'Changement de méthode', 'Rétrospectif (IAS 8 ; IAS 40)'],
            ["Première application du modèle de la réévaluation à des immobilisations corporelles", 'Changement de méthode', "Traité selon IAS 16 comme une réévaluation, sans retraitement (IAS 8.17)"],
            ["Nouvelle catégorie de transactions sans précédent dans l'entité", "Ni l'un ni l'autre : nouvelle méthode", 'Application à compter de la première transaction (IAS 8.16(b))'],
            ["Doute sur la qualification", "Changement d'estimation", 'Prospectif (IAS 8.35)'],
          ],
        },
      },
      { type: 'intertitre', texte: "8.7.3 Les normes publiées mais non encore en vigueur" },
      {
        type: 'paragraphe',
        texte: "Une entité qui n'a pas appliqué une nouvelle norme publiée mais non encore entrée en vigueur indique ce fait, ainsi que les informations connues ou raisonnablement estimables sur l'impact possible de sa première application (§ 30). Elle envisage d'indiquer le titre de la norme, la nature des changements imminents, la date d'application obligatoire, la date prévue de première application et une description de l'impact prévu, ou une déclaration selon laquelle cet impact n'est pas connu (§ 31). Pour les exercices clos en 2025 et 2026, IFRS 18 est l'exemple type : l'entité devrait indiquer qu'elle remplacera IAS 1 pour les exercices ouverts à compter du 1er janvier 2027, décrire les changements attendus sur la structure de son compte de résultat, par exemple le reclassement de la quote-part des entreprises associées hors du résultat d'exploitation, et signaler les mesures de la performance qu'elle communique et qui devront faire l'objet d'une note.",
      },
    ],
  },
  {
    numero: '8.8',
    titre: "IAS 8 et IAS 10 : corrections d'erreurs et événements postérieurs à la clôture",
    navLabel: 'Erreurs et événements postérieurs',
    blocs: [
      { type: 'intertitre', texte: "8.8.1 La correction des erreurs d'une période antérieure" },
      {
        type: 'paragraphe',
        texte: "Une erreur d'une période antérieure est une omission ou une inexactitude résultant de la non-utilisation ou de l'utilisation inappropriée d'informations fiables qui étaient disponibles lors de l'autorisation de publication des états de ces périodes et dont on pouvait raisonnablement s'attendre qu'elles soient prises en considération ; elle inclut erreurs de calcul, mauvaises applications de méthodes, négligences, mauvaises interprétations des faits et fraudes (§ 5). Les états ne sont pas conformes aux IFRS s'ils contiennent des erreurs significatives, ou des erreurs non significatives commises intentionnellement pour parvenir à une présentation particulière (§ 41).",
      },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 8, § 42",
        texte: "« Sous réserve du paragraphe 43, l'entité doit corriger de manière rétrospective les erreurs significatives d'une période antérieure dans le premier jeu d'états financiers dont la publication est autorisée après leur découverte, comme suit : (a) par retraitement des montants comparatifs de la ou des périodes antérieures présentées au cours desquelles l'erreur est intervenue ; ou (b) si l'erreur est intervenue avant la première période antérieure présentée, par retraitement des soldes d'ouverture des actifs, passifs et capitaux propres de la première période antérieure présentée. »",
      },
      {
        type: 'paragraphe',
        texte: "La correction est exclue du résultat de la période de découverte (§ 46). Elle se distingue d'un changement d'estimation : une estimation qui se révèle inexacte à la lumière d'informations nouvelles n'est pas une erreur (§ 48). Lorsque le retraitement est impraticable, l'entité corrige à partir de la première période ou de la première date praticable (§ 43-47), sans recourir aux connaissances a posteriori (§ 53). Elle indique la nature de l'erreur, le montant de la correction pour chaque poste et chaque période présentée, et le montant au début de la première période présentée (§ 49).",
      },
      {
        type: 'carte',
        titre: "Exemple 8.17 — Omission d'une charge dans les états publiés de l'exercice précédent",
        texte: "En préparant les états de N, une société cimentière découvre qu'une facture de maintenance de 50 000 USD, relative à des travaux achevés en novembre N-1, n'a pas été comptabilisée dans les états de N-1, déjà publiés. Le montant est significatif. L'effet d'impôt est ignoré pour simplifier.",
        tableau: {
          entetes: ['Élément', 'Selon IAS 8', 'Selon le SYSCOHADA révisé'],
          lignes: [
            ['Comptabilisation', 'Retraitement des comparatifs de N-1 : charges +50 000, dettes fournisseurs +50 000', "Charge comptabilisée dans le résultat ordinaire de N, exercice de rectification"],
            ['Résultat de N', 'Non affecté (§ 46)', 'Diminué de 50 000'],
            ['Résultat comparatif de N-1', 'Diminué de 50 000', 'Inchangé'],
            ['Informations', "Nature de l'erreur et montants corrigés (§ 49) ; état de la situation financière au début de N-1 (IAS 1.10(f))", 'Mention dans les Notes annexes'],
          ],
        },
        note: "Selon le cadre conceptuel du SYSCOHADA révisé, une charge ou un produit d'exploitation omis au cours d'un exercice antérieur est comptabilisé dans les activités ordinaires de l'exercice de rectification (Titre V). L'écart de traitement avec IAS 8 est l'un des retraitements courants lors de l'établissement d'états IFRS à partir de comptes SYSCOHADA : il déplace l'effet d'une erreur de l'exercice de découverte vers l'exercice où elle a été commise.",
      },
      {
        type: 'carte',
        titre: "Exemple 8.18 — Erreur remontant avant la période comparative, avec effet d'impôt",
        texte: "En N, une entreprise découvre que des stocks de pièces détachées obsolètes auraient dû être dépréciés de 100 000 USD dès le 31 décembre N-2 ; l'information sur leur obsolescence était disponible à cette date. L'erreur est significative. La dépréciation aurait été fiscalement déductible ; taux d'impôt 30 %. Les états de N présentent N-1 en comparatif.",
        tableau: {
          entetes: ['Élément', 'Correction', 'Référence'],
          lignes: [
            ['Soldes d\'ouverture de N-1 (première période présentée)', 'Stocks −100 000 ; impôt exigible à récupérer ou impôt différé +30 000 ; résultats non distribués −70 000', 'IAS 8.42(b)'],
            ['Résultat de N-1 et de N', 'Non affectés, les stocks dépréciés restant en stock', 'IAS 8.42, 46'],
            ['État de la situation financière au 1er janvier N-1', "Présenté en plus des deux bilans habituels, l'incidence étant significative", 'IAS 1.40A-40B'],
            ['Informations', "Nature de l'erreur ; montant de la correction pour chaque poste et chaque période ; montant au début de N-1", 'IAS 8.49'],
          ],
        },
        note: "L'état des variations des capitaux propres présente la correction sur une ligne distincte, entre le solde publié et le solde retraité au 1er janvier N-1 (IAS 1.106(b)). Le traitement de l'effet d'impôt dépend du droit fiscal : si la dépréciation peut encore être déduite sur une déclaration rectificative, un impôt exigible à récupérer est comptabilisé ; si elle ne sera déduite qu'à la sortie des stocks, il s'agit d'un actif d'impôt différé.",
      },
      { type: 'intertitre', texte: "8.8.2 Les événements postérieurs à la date de clôture" },
      {
        type: 'paragraphe',
        texte: "Les événements postérieurs à la date de clôture sont les événements, favorables ou défavorables, qui se produisent entre la date de clôture et la date d'autorisation de publication des états financiers (IAS 10.3). Cette dernière est, lorsque les états sont soumis à l'approbation des actionnaires après leur publication, la date à laquelle l'organe compétent autorise la publication, et non celle de l'approbation (§ 5). Pour une société anonyme de l'espace OHADA, il s'agit en pratique de la date d'arrêté des comptes par le conseil d'administration, antérieure à l'assemblée générale. Les événements qui confirment des situations existant à la clôture donnent lieu à ajustement (§ 8) ; ceux qui indiquent des situations apparues après la clôture n'y donnent pas lieu (§ 10), mais font l'objet d'une information s'ils sont significatifs (§ 21).",
      },
      {
        type: 'carte',
        titre: "Tableau 8.9 — Qualification des événements postérieurs à la clôture (IAS 10, § 9 à 22)",
        tableau: {
          entetes: ['Événement', 'Traitement', 'Référence'],
          lignes: [
            ["Jugement confirmant une obligation existant à la clôture", 'Ajustement de la provision', '§ 9(a)'],
            ["Faillite d'un client dont le crédit était déjà dégradé à la clôture ; vente de stocks révélant leur valeur nette de réalisation", 'Ajustement', '§ 9(b)'],
            ["Détermination du coût d'actifs achetés ou du prix d'actifs vendus avant la clôture", 'Ajustement', '§ 9(c)'],
            ['Découverte de fraudes ou d\'erreurs', 'Ajustement', '§ 9(e)'],
            ['Baisse de la juste valeur de placements après la clôture', 'Pas d\'ajustement ; information si significatif', '§ 11 et 21'],
            ['Dividendes déclarés après la clôture', 'Pas de passif ; mention dans les notes', '§ 12-13'],
            ["Regroupement d'entreprises, incendie, expropriation, annonce d'un plan d'abandon d'activité", "Pas d'ajustement ; nature et effet financier estimé", '§ 21-22'],
            ["Décision de liquider l'entité ou absence d'autre solution réaliste", "Abandon de la base de continuité d'exploitation", '§ 14-15'],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Rapprochement avec le SYSCOHADA révisé",
        texte: "Le cadre conceptuel du SYSCOHADA révisé, au titre de la spécialisation des exercices, retient la même distinction : les événements postérieurs à la clôture mais antérieurs à la date d'arrêté des comptes donnent lieu à ajustement s'ils confirment des situations existant à la clôture, par exemple une créance devenue douteuse, et non s'ils révèlent une situation apparue postérieurement, par exemple un sinistre ne remettant pas en cause la continuité de l'exploitation (Titre V). Pour les changements de méthodes, il prévoit un calcul rétrospectif de l'effet après impôt exigible, imputé en report à nouveau, avec informations pro forma ; pour les changements d'estimation, une application à l'exercice en cours et aux exercices futurs. Les divergences avec IAS 8 portent sur le retraitement des comparatifs et sur la correction des erreurs, traitée dans le résultat de l'exercice de rectification.",
      },
      { type: 'intertitre', texte: "8.8.3 La continuité d'exploitation après la clôture et le calendrier OHADA" },
      {
        type: 'paragraphe',
        texte: "La continuité d'exploitation fait exception à la règle selon laquelle les événements survenus après la clôture qui révèlent une situation nouvelle ne donnent pas lieu à ajustement. Une entité ne doit pas établir ses états sur la base de la continuité si la direction a l'intention de la liquider ou de cesser son activité, ou n'a pas d'autre solution réaliste, même si cette situation est apparue après la clôture (IAS 10.14). La détérioration du résultat et de la situation financière après la clôture peut imposer de réexaminer l'hypothèse ; si elle n'est plus appropriée, l'effet est si étendu qu'il impose un changement fondamental de la base de comptabilisation, et non un simple ajustement des montants (IAS 10.15). Le chapitre 31 du Titre VIII du SYSCOHADA révisé, qui s'inspire expressément d'IAS 10, retient la même solution : les états ne sont alors plus établis sur une base de continuité d'exploitation, « mais en valeurs liquidatives ».",
      },
      {
        type: 'paragraphe',
        texte: "Le calendrier OHADA donne à ces règles un cadre précis. Les événements postérieurs se situent entre la clôture, fixée au 31 décembre, et la date d'arrêté des états financiers, qui intervient au plus tard quatre mois après (AUDCIF, art. 23) ; l'approbation par les associés doit intervenir dans les six mois de la clôture. IAS 10 impose de mentionner la date d'autorisation de publication et l'organe qui l'a donnée (§ 17), et de mettre à jour les informations sur les situations existant à la clôture lorsque de nouvelles informations sont reçues (§ 19). Le SYSCOHADA prévoit en outre que, si des informations susceptibles de remettre profondément en cause les états ne sont connues qu'après l'arrêté, les dirigeants procèdent à un nouvel arrêté des comptes, dans le délai légal de quatre mois ; les événements importants survenus après l'arrêté font par ailleurs l'objet du rapport de gestion.",
      },
      {
        type: 'carte',
        titre: "Exemple 8.19 — Chronologie d'événements postérieurs pour une clôture au 31 décembre N",
        tableau: {
          entetes: ['Date', 'Événement', 'Traitement'],
          lignes: [
            ['15 janvier N+1', "Jugement condamnant l'entité pour un litige né en N", "Ajustement de la provision (IAS 10.9(a))"],
            ['10 février N+1', "Incendie d'un entrepôt, sans remise en cause de la continuité", "Pas d'ajustement ; nature et estimation de l'effet financier en note (IAS 10.21-22)"],
            ['1er mars N+1', "Adoption d'une loi de finances modifiant le taux de l'impôt sur les sociétés", "Pas d'ajustement si la modification n'était pas adoptée ou quasi adoptée à la clôture ; information en note (IAS 10.22(h))"],
            ['25 mars N+1', "Arrêté des comptes par le conseil d'administration", "Date d'autorisation de publication (IAS 10.5-6) ; au plus tard le 30 avril N+1 (AUDCIF, art. 23)"],
            ['20 avril N+1', "Faillite d'un client important dont la situation était déjà dégradée au 31 décembre N", "Après l'arrêté : hors champ d'IAS 10 ; nouvel arrêté si l'information remet profondément en cause les états (SYSCOHADA, Titre VIII, ch. 31)"],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Synthèse du chapitre et du module",
        texte: "La présentation des états financiers n'est pas une formalité qui suivrait l'évaluation : elle détermine la manière dont l'information est lue. IAS 1 impose une structure minimale et une distinction rigoureuse entre éléments courants et non courants ; IFRS 18 définira à partir de 2027 un résultat d'exploitation commun et encadrera les indicateurs de la direction ; IAS 7 explique la conversion du résultat en trésorerie ; IAS 8 garantit la comparabilité dans le temps en distinguant méthodes, estimations et erreurs ; IAS 10 fixe la frontière entre ce qui appartient à l'exercice clos et ce qui relève du suivant. L'ensemble du module montre que les IFRS et le SYSCOHADA révisé partagent de nombreux principes, mais divergent sur des points précis que l'établissement d'états IFRS par une entreprise congolaise oblige à identifier et à retraiter : impôts différés, écarts de change latents, pertes de crédit attendues, subventions, engagements sociaux, corrections d'erreurs.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ue13c8-cp1',
    titre: "Classement des actifs et passifs d'une entreprise de BTP (TSHOPO BÂTIMENT SA, société fictive)",
    contexte: "Au 31 décembre N, TSHOPO BÂTIMENT SA, dont le cycle d'exploitation est de dix-huit mois pour ses chantiers, présente notamment : (a) des travaux en cours et actifs sur contrat de 2 400 000 USD, dont 900 000 recouvrables au-delà de douze mois ; (b) des retenues de garantie clients de 300 000 USD, libérables à 24 mois ; (c) des dettes fournisseurs de chantier de 1 100 000 USD, dont 200 000 payables à 14 mois selon les usages du chantier ; (d) un emprunt bancaire de 3 000 000 USD, dont 600 000 remboursables en N+1 ; (e) un actif d'impôt différé de 180 000 USD, dont la moitié se résorbera en N+1 ; (f) un découvert bancaire de 250 000 USD remboursable à vue ; (g) un crédit de trésorerie de 800 000 USD échéant le 31 mars N+1, que la banque, par une facilité confirmée existant au 31 décembre, s'est engagée à renouveler jusqu'en juin N+2 à la demande de l'entreprise.",
    questions: [
      {
        num: 1,
        enonce: "Classez les éléments (a), (b), (c) et (e).",
        correction: "(a) Actif courant en totalité : il est réalisé dans le cycle d'exploitation normal, même au-delà de douze mois (IAS 1.66(a) et 68) ; l'entité indique les 900 000 recouvrables à plus de douze mois (§ 61). (b) Les retenues de garantie liées aux contrats du cycle sont également courantes si elles sont réalisées dans le cycle normal ; à défaut, non courantes ; le montant à plus de douze mois est indiqué. (c) Passif courant en totalité : dettes d'exploitation réglées dans le cycle normal, même à 14 mois (§ 69(a) et 70). (e) Non courant en totalité : un actif d'impôt différé n'est jamais classé en courant (§ 56).",
      },
      {
        num: 2,
        enonce: "Classez les éléments (d), (f) et (g).",
        correction: "(d) 600 000 en passif courant (part exigible dans les douze mois, § 69(c) et 71) ; 2 400 000 en passif non courant. (f) Passif courant : exigible à vue (§ 71 cite les découverts bancaires). Au tableau des flux, un découvert remboursable à vue peut constituer une composante de la trésorerie. (g) Non courant : à la clôture, l'entité a le droit, en vertu d'une facilité existante, de renouveler l'obligation pour plus de douze mois (§ 73) ; la probabilité qu'elle l'exerce est sans incidence (§ 75A).",
      },
      {
        num: 3,
        enonce: "La facilité (g) est subordonnée au maintien d'un ratio de fonds propres, calculé sur les comptes du 31 décembre N, qui n'est pas respecté. Qu'en résulte-t-il ?",
        correction: "La clause devait être respectée à la date de clôture ; son non-respect prive l'entité, à cette date, du droit de différer le règlement (§ 72B(a)). Le crédit de 800 000 devient un passif courant, même si la banque renonce à s'en prévaloir après la clôture (§ 74 et 76(b)), sauf délai de grâce d'au moins douze mois accordé avant la clôture (§ 75).",
      },
    ],
  },
  {
    id: 'ue13c8-cp2',
    titre: "Présentation du compte de résultat selon IAS 1 et selon IFRS 18",
    contexte: "Une société de négoce de produits pétroliers établie à Matadi présente les données suivantes pour N, en milliers de USD : chiffre d'affaires 25 000 ; achats de marchandises consommés 18 000 ; personnel 2 200 (dont 1 400 commercial, 800 administration) ; amortissements 900 (dont 600 dépôts de stockage rattachés au coût des ventes, 300 administration) ; autres charges 1 100 (dont 700 commerciales, 400 administratives) ; quote-part du résultat d'une entreprise associée mise en équivalence : 250 ; intérêts sur dépôts à terme classés en équivalents de trésorerie 80 ; charges d'intérêts sur emprunt bancaire 600 ; différences de change sur dettes fournisseurs en devises : perte de 150 ; impôt sur le résultat 600. La direction communique aux investisseurs un « résultat opérationnel ajusté » excluant les pertes de change.",
    questions: [
      {
        num: 1,
        enonce: "Présentez le compte de résultat avec une analyse des charges par fonction selon IAS 1.",
        correction: "Coût des ventes : 18 000 + 600 = 18 600 ; marge brute : 25 000 − 18 600 = 6 400. Coûts commerciaux : 1 400 + 700 = 2 100. Charges administratives : 800 + 300 + 400 = 1 500. Perte de change : 150. Résultat avant éléments financiers : 6 400 − 2 100 − 1 500 − 150 = 2 650. Quote-part de l'entreprise associée : 250 ; produits de trésorerie : 80 ; charges financières : 600. Résultat avant impôt : 2 380 ; impôt : 600 ; **résultat net : 1 780**. Informations supplémentaires en annexe : amortissements 900 et charges de personnel 2 200 (§ 104).",
      },
      {
        num: 2,
        enonce: "Présentez le même compte de résultat selon les catégories et sous-totaux d'IFRS 18.",
        correction: "Exploitation : 25 000 − 18 600 − 2 100 − 1 500 − 150 = **résultat d'exploitation 2 650** (les différences de change sont classées dans la même catégorie que les produits et charges de l'élément qui les a générées, ici les dettes fournisseurs d'exploitation, IFRS 18.B65). Investissement : quote-part 250 + produits de trésorerie 80 = 330 ; **résultat avant financement et impôts sur le résultat 2 980**. Financement : −600. Impôts sur le résultat : −600. **Résultat net : 1 780**.",
      },
      {
        num: 3,
        enonce: "Quelles obligations IFRS 18 crée-t-elle à l'égard du « résultat opérationnel ajusté » ?",
        correction: "Il s'agit d'un sous-total de produits et de charges utilisé dans la communication publique hors états financiers pour exprimer la vision de la direction, non imposé par les IFRS et non énuméré au § 118 : c'est une mesure de la performance définie par la direction (§ 117). L'entité doit, dans une note unique, expliquer ce que la mesure communique, comment elle est calculée, et la rapprocher du sous-total le plus directement comparable, ici le résultat d'exploitation de 2 650 (§ 122-123) (le rapprochement fait apparaître l'exclusion de la perte de change de 150, soit une mesure de 2 800).",
      },
    ],
  },
  {
    id: 'ue13c8-cp3',
    titre: "Qualification et traitement de modifications comptables",
    contexte: "Lors de l'arrêté des comptes de N d'une société de brasserie, le directeur financier relève les situations suivantes. (a) La société a décidé de passer, pour ses immeubles de placement, du modèle du coût au modèle de la juste valeur, jugé plus pertinent pour ses investisseurs. (b) Les pertes de crédit attendues ont été recalculées avec des taux de défaillance mis à jour ; la correction de valeur augmente de 120 000 USD. (c) La durée d'utilité des bouteilles consignées a été réduite de cinq à trois ans à la suite d'une hausse de la casse. (d) Une erreur de formule dans le calcul des stocks de N-1 avait surévalué le stock de clôture de N-1 de 300 000 USD. (e) La société réévalue pour la première fois ses terrains selon IAS 16.",
    questions: [
      {
        num: 1,
        enonce: "Qualifiez chacune des situations au regard d'IAS 8.",
        correction: "(a) Changement volontaire de méthode (changement de base d'évaluation, § 35), admis s'il fournit des informations fiables et plus pertinentes (§ 14(b)). (b) Changement d'estimation : effet d'un changement de données d'entrée (§ 34A). (c) Changement d'estimation (§ 38). (d) Correction d'une erreur d'une période antérieure (§ 5 et 41). (e) Changement de méthode traité comme une réévaluation selon IAS 16, hors des règles rétrospectives d'IAS 8 (§ 17-18).",
      },
      {
        num: 2,
        enonce: "Précisez le traitement comptable de chacune.",
        correction: "(a) Application rétrospective : ajustement des capitaux propres d'ouverture de la première période présentée et des comparatifs, et présentation d'un troisième état de la situation financière (IAS 8.19 et 22 ; IAS 1.10(f)). (b) et (c) Application prospective : l'augmentation de 120 000 et la dotation accrue affectent le résultat de N, et pour (c) celui des exercices suivants (§ 36-38). (d) Retraitement rétrospectif : le stock comparatif et le résultat de N-1 sont diminués de 300 000 ; le résultat de N n'est pas affecté (§ 42 et 46). (e) Écart de réévaluation en autres éléments du résultat global à la date de la réévaluation, sans retraitement des comparatifs.",
      },
      {
        num: 3,
        enonce: "Comment la situation (d) aurait-elle été traitée dans les seuls comptes SYSCOHADA ?",
        correction: "Le SYSCOHADA révisé ne retraite pas les comptes de l'exercice précédent : l'incidence de l'erreur est comptabilisée dans les comptes de l'exercice de rectification, en activités ordinaires s'il s'agit d'un élément d'exploitation (Titre V), avec mention dans les Notes annexes. Le résultat SYSCOHADA de N supporte donc une charge de 300 000 que les états IFRS rattachent à N-1.",
      },
    ],
  },
  {
    id: 'ue13c8-cp4',
    titre: "Événements postérieurs à la clôture d'une société minière",
    contexte: "Une société minière clôt son exercice le 31 décembre N ; son conseil d'administration arrête les comptes le 25 mars N+1 et l'assemblée générale les approuve le 30 mai N+1. Entre ces dates : (a) le 12 janvier, un tribunal de commerce la condamne à verser 400 000 USD à un sous-traitant pour des travaux de N, alors que la provision n'était que de 250 000 ; (b) le 3 février, un éboulement détruit une galerie en exploitation, pour une valeur comptable de 2 000 000 USD ; (c) le 15 février, un client acheteur de concentrés est déclaré en faillite, sa situation étant déjà obérée en décembre ; (d) le 10 mars, le conseil propose un dividende de 1 500 000 USD ; (e) le 20 avril, le cours du cobalt chute de 30 % ; (f) le 5 mars, un audit interne révèle que des ventes de décembre N ont été enregistrées deux fois.",
    questions: [
      {
        num: 1,
        enonce: "Déterminez la date d'autorisation de publication et la période à considérer.",
        correction: "La date d'autorisation est le 25 mars N+1, date à laquelle le conseil d'administration arrête les comptes et autorise leur publication, et non le 30 mai, date d'approbation par l'assemblée (IAS 10.5). Seuls les événements survenus entre le 31 décembre N et le 25 mars N+1 sont des événements postérieurs au sens de la norme ; l'événement (e), survenu le 20 avril, n'en fait pas partie. La date d'autorisation et l'organe qui l'a donnée sont indiqués en annexe (§ 17).",
      },
      {
        num: 2,
        enonce: "Traitez les événements (a), (c) et (f).",
        correction: "Tous donnent lieu à ajustement. (a) Le jugement confirme une obligation existant à la clôture : la provision est portée à 400 000 (§ 9(a)). (c) La faillite confirme la détérioration du crédit du client à la clôture : la créance est dépréciée en conséquence (§ 9(b)(i)). (f) La découverte d'une erreur montre que les états sont incorrects : les ventes enregistrées deux fois sont annulées dans les comptes de N (§ 9(e)).",
      },
      {
        num: 3,
        enonce: "Traitez les événements (b) et (d), et dites si la continuité d'exploitation est en cause.",
        correction: "(b) L'éboulement révèle une situation apparue après la clôture : pas d'ajustement de la valeur de la galerie au 31 décembre N ; information sur la nature de l'événement et une estimation de son effet financier (§ 10, 21 et 22). (d) Le dividende proposé après la clôture n'est pas un passif au 31 décembre N ; il est mentionné dans les notes (§ 12-13). La continuité d'exploitation ne serait en cause que si l'éboulement conduisait la direction à envisager la cessation de l'activité, sans autre solution réaliste (§ 14-15) ; à défaut, des incertitudes significatives éventuelles sont décrites (§ 16).",
      },
    ],
  },
  {
    id: 'ue13c8-cp5',
    titre: "Du compte de résultat SYSCOHADA à la présentation IFRS 18 (LUALABA TRANSPORTS SA, société fictive)",
    contexte: "LUALABA TRANSPORTS SA prépare ses premiers états selon IFRS 18 pour l'exercice N (en milliers de USD). Son compte de résultat SYSCOHADA fait apparaître : excédent brut d'exploitation 3 500 ; dotations aux amortissements 1 200 ; résultat d'exploitation 2 300 ; résultat financier −300, constitué d'intérêts sur emprunts bancaires ; résultat des activités ordinaires 2 000 ; résultat HAO 150, composé d'un produit de cession de camions de 600, de leur valeur comptable de 380 et d'amendes de 70 ; impôt sur le résultat 540 ; résultat net 1 610. Au bilan, les emprunts s'élèvent à 4 000, dont 1 000 remboursables dans l'année, et la banque accorde un découvert de 200, utilisé de façon fluctuante dans la gestion courante de la trésorerie. Dans sa communication aux investisseurs, la société publie un « EBE » de 3 500. Taux d'impôt : 30 % ; les amendes ne sont pas fiscalement déductibles.",
    questions: [
      {
        num: 1,
        enonce: "Présentez le compte de résultat selon les catégories et sous-totaux d'IFRS 18.",
        correction: "Catégorie exploitation : excédent brut 3 500, amortissements −1 200, profit de cession présenté en net (600 − 380) +220 (IAS 1.34(a)), amendes −70 ; **résultat d'exploitation 2 450**. Aucun élément ne relève de la catégorie investissement : **résultat avant financement et impôts sur le résultat 2 450**. Financement : intérêts −300. Impôts sur le résultat : −540. **Résultat net 1 610**, identique au résultat SYSCOHADA. Les éléments HAO disparaissent comme catégorie : ils sont intégrés à la catégorie exploitation, qui est résiduelle (IFRS 18.52), et aucun élément ne peut être qualifié d'extraordinaire.",
      },
      {
        num: 2,
        enonce: "Comment les emprunts et le découvert sont-ils présentés dans l'état de la situation financière et dans le tableau des flux de trésorerie ?",
        correction: "État de la situation financière : emprunts non courants **3 000** ; part courante **1 000** en passifs courants (IAS 1.69) ; découvert de **200** en passifs courants. Tableau des flux : le découvert, remboursable à vue et faisant partie intégrante de la gestion de trésorerie, peut être traité comme une composante de la trésorerie et des équivalents de trésorerie (IAS 7.8), comme dans la trésorerie-passif du SYSCOHADA. Les variations des emprunts figurent dans le rapprochement des passifs issus des activités de financement (IAS 7.44A).",
      },
      {
        num: 3,
        enonce: "L'« EBE » publié par la société est-il une mesure de la performance définie par la direction au sens d'IFRS 18 ?",
        correction: "Le sous-total exclu par IFRS 18.118(b), résultat d'exploitation avant amortissements et pertes de valeur, s'élève ici à 2 450 + 1 200 = 3 650. L'« EBE » publié, de 3 500, exclut en outre le profit de cession (220) et les amendes (70) : c'est un sous-total ajusté, utilisé dans la communication publique, donc présumé être une mesure de la performance définie par la direction (§ 117 et 119). La société doit le décrire, expliquer son calcul et le rapprocher du sous-total IFRS le plus directement comparable, dans une note unique (§ 122-123).",
      },
      {
        num: 4,
        enonce: "Établissez le rapprochement exigé par IFRS 18.123(c)-(d), avec l'effet d'impôt de chaque élément.",
        correction: "Résultat d'exploitation (IFRS 18) **2 450** ; + amortissements 1 200, effet d'impôt −360 ; − profit de cession 220, effet d'impôt +66 ; + amendes 70, effet d'impôt nul, les amendes n'étant pas déductibles ; = « EBE » publié **3 500**. Aucune participation ne donnant pas le contrôle n'est concernée. La note indique en outre que la mesure traduit la vision de la direction et n'est pas nécessairement comparable aux mesures d'intitulé semblable d'autres entités, et décrit la méthode de calcul des effets d'impôt (§ 122-123(e)).",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue13',
  numero: 8,
  id: 'ue13-chapitre-8',
  titre: 'Présentation des états financiers et méthodes comptables',
  sousTitre: "IAS 1, IFRS 18, IAS 7, IAS 8 et IAS 10 : structure des états, flux de trésorerie, changements comptables et événements postérieurs",
  infoBulle: "Chapitre 8 du module IFRS/IAS : composantes des états financiers (IAS 1) ; état de la situation financière et classement courant/non courant, clauses restrictives ; état du résultat global, charges par nature ou par fonction, état des variations des capitaux propres ; regroupement et compensation ; éléments HAO et interdiction des éléments extraordinaires ; passage du bilan fonctionnel SYSCOHADA à l'état de la situation financière ; notes et gestion du capital ; IFRS 18 (catégories, sous-totaux, charges spécifiées, mesures définies par la direction) ; tableau des flux de trésorerie (IAS 7, méthode directe, indirecte et CAFG du SYSCOHADA) ; changements de méthodes et d'estimations, corrections d'erreurs (IAS 8) ; événements postérieurs à la clôture (IAS 10) ; rapprochements avec le SYSCOHADA révisé.",
  loiRef: "IAS 1 · IFRS 18 · IAS 7 · IAS 8 · IAS 10 · AUDCIF art. 7, 8, 23 · SYSCOHADA révisé, Titres V, VIII (ch. 31) et IX",
  moduleLabel: 'UE 13 · IFRS / IAS',
  retourRoute: '/ue13-ifrs-ias',
  coursId: 'ue13-ifrs-ias',
  objectifs: [
    "Identifier les composantes d'un jeu complet d'états financiers, les principes de regroupement et de compensation, et les différences de conception avec les états du SYSCOHADA révisé.",
    "Présenter l'état de la situation financière, classer actifs et passifs en éléments courants et non courants, y compris en présence de clauses restrictives, et reclasser un bilan fonctionnel SYSCOHADA.",
    "Présenter l'état du résultat global et l'état des variations des capitaux propres, traiter les reclassements d'autres éléments du résultat global, reclasser les éléments HAO et analyser les charges par nature ou par fonction.",
    "Déterminer les informations significatives et propres à l'entité à fournir sur les méthodes, les jugements, les incertitudes et la gestion du capital.",
    "Appliquer les catégories et sous-totaux d'IFRS 18, établir la note sur les charges spécifiées, et identifier et rapprocher une mesure de la performance définie par la direction.",
    "Établir les flux de trésorerie d'exploitation selon les méthodes directe et indirecte et par la CAFG du SYSCOHADA, classer les flux particuliers et rapprocher les passifs de financement.",
    "Distinguer changement de méthode, changement d'estimation et correction d'erreur, et appliquer le traitement correspondant.",
    "Qualifier les événements postérieurs à la clôture dans le calendrier OHADA et en déterminer les conséquences, y compris sur la continuité d'exploitation.",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Un jeu complet d'états financiers comprend l'état de la situation financière, l'état du résultat global, l'état des variations des capitaux propres, le tableau des flux de trésorerie, les notes et les comparatifs, avec un troisième bilan en cas de retraitement rétrospectif significatif (IAS 1.10, 40A). La compensation est interdite sauf disposition contraire ; les profits de cession d'actifs non courants sont présentés en net (IAS 1.32-34).",
    "Le bilan fonctionnel du SYSCOHADA range la totalité des emprunts dans les ressources stables ; IAS 1 en isole la part à moins d'un an, ce qui réduit les actifs courants nets par rapport au fonds de roulement fonctionnel.",
    "Les éléments du cycle d'exploitation sont courants même au-delà de douze mois ; un passif est courant si l'entité n'a pas, à la clôture, le droit de différer son règlement d'au moins douze mois. Les impôts différés sont toujours non courants (IAS 1.56, 66-76ZA).",
    "Les autres éléments du résultat global distinguent éléments recyclables et non recyclables, le reclassement étant neutre sur le résultat global ; les charges sont analysées par nature ou par fonction, cette dernière imposant une information sur la nature des charges (IAS 1.82A, 92, 99-104). Aucun élément ne peut être présenté comme extraordinaire (IAS 1.87) : le résultat HAO du SYSCOHADA est réintégré dans la performance, les éléments significatifs étant présentés séparément (§ 97-98).",
    "Les notes fournissent les informations significatives sur les méthodes, les jugements et les sources d'incertitude à risque d'ajustement significatif dans l'exercice suivant (IAS 1.117-125).",
    "IFRS 18 remplace IAS 1 à compter de 2027 : cinq catégories, résultat d'exploitation et résultat avant financement et impôts obligatoires, principes de regroupement, note sur les charges spécifiées en cas de présentation par fonction, et note unique sur les mesures de la performance définies par la direction avec rapprochement, effets d'impôt et sur les participations ne donnant pas le contrôle.",
    "IAS 7 classe les flux en exploitation, investissement et financement, encourage la méthode directe et laisse un choix permanent pour les intérêts et dividendes ; le SYSCOHADA part de l'EBE et de la CAFG. Les variations des passifs de financement, y compris sans contrepartie de trésorerie, sont rapprochées (IAS 7.44A).",
    "Changement de méthode : rétrospectif ; changement d'estimation : prospectif ; en cas de doute, estimation (IAS 8.19-38). Erreur significative d'une période antérieure : retraitement rétrospectif, hors résultat de la période de découverte (IAS 8.42-46), alors que le SYSCOHADA la corrige dans l'exercice de rectification.",
    "Les événements postérieurs qui confirment des situations existant à la clôture donnent lieu à ajustement ; les autres, à information s'ils sont significatifs. Les dividendes déclarés après la clôture ne sont pas des passifs (IAS 10.8-13). La remise en cause de la continuité impose un changement de base (IAS 10.14-15). Dans l'espace OHADA, les comptes sont arrêtés au plus tard quatre mois après la clôture (AUDCIF, art. 23).",
  ],
  references: [
    { genre: 'texte', intitule: "IAS 1 — Présentation des états financiers", precision: "§§ 9 à 11, 29 à 34, 40A à 40C, 54 à 79, 81A à 106A, 112 à 136 (texte français intégral)" },
    { genre: 'texte', intitule: "IFRS 18 — Presentation and Disclosure in Financial Statements (avril 2024)", precision: "§ 41-42, 47-73, 78-83, 117-124, C1-C3 (texte anglais ; traductions de travail)" },
    { genre: 'texte', intitule: "IAS 7 — Tableau des flux de trésorerie", precision: "§§ 6, 10, 18 à 20, 31 à 35, 39 à 44E (texte français intégral)" },
    { genre: 'texte', intitule: "IAS 8 — Méthodes comptables, changements d'estimations comptables et erreurs", precision: "§§ 5, 14 à 53 (texte français intégral)" },
    { genre: 'texte', intitule: "IAS 10 — Événements postérieurs à la date de clôture", precision: "§§ 1 à 22 (texte français intégral)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, Titre V (cadre conceptuel)", precision: "permanence des méthodes, changements, événements postérieurs, tableau des flux de trésorerie" },
    { genre: 'texte', intitule: "AUDCIF et SYSCOHADA révisé, Titres VIII et IX", precision: "art. 7, 8, 11, 13 et 23 ; Titre VIII, ch. 31 (événements postérieurs) ; Titre IX, ch. 3 à 6 (bilan, compte de résultat, tableau des flux, notes annexes)" },
    { genre: 'texte', intitule: "AUSCGIE", precision: "art. 664 (capitaux propres inférieurs à la moitié du capital social)" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "IAS 1, IAS 7, IAS 8 et IAS 10 (texte français intégral) ; IFRS 18 (texte anglais, traductions de travail) ; AUDCIF et SYSCOHADA révisé, Titres V, VIII et IX ; AUSCGIE.",
}

export default chapitre
