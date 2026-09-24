import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 13 — Chapitre 2 : Immobilisations corporelles et incorporelles
// (IAS 16, IAS 38, IAS 23, IFRIC 1, IFRIC 20)
//
// Sources lues sur texte pendant la rédaction :
// - IAS 16 (texte français intégral) : §§ 1 à 79.
// - IAS 38 et IFRS 6 (texte intégral de la traduction française officielle,
//   IFRS Foundation) : les passages entre guillemets le reproduisent à
//   l'identique, le reste le paraphrase avec renvoi au §.
// - IAS 23 (texte français intégral) : §§ 1 à 26.
// - IFRIC 1 et IFRIC 20 (texte anglais intégral).
// - Cadre conceptuel 2018 (texte anglais) : SP1.2, 4.3-4.4, 5.6-5.17.
// - AUDCIF : art. 62 à 65 ; Titre VIII, ch. 1, 4, 6 et 7 (R&D, composants,
//   démantèlement, coûts d'emprunt) ; ch. 28 (réévaluation des bilans).
// - Loi n° 23/053 du 30 novembre 2023, art. 129 à 133 et 152 (réévaluation ;
//   abrogation, au 1er janvier 2026, de l'Ordonnance-loi n° 89-017 du
//   18 février 1989, citée pour mémoire) ; arrêtés n° 013 et 014/CAB/MIN/FINANCES/2025 (taux
//   d'amortissement ; seuil du petit matériel).
// - Code minier (loi 007/2002 modifiée) : art. 204 et 258.
// - Support de cours d'origine : J.-B. Tshimanga Mulumba (CPCC), « Traitement
//   des immobilisations », modules IAS 16 et IAS 38 ; illustrations reprises
//   et approfondies (avion ALPHA, composant réévalué, laboratoire MI,
//   exercice des trois machines, réévaluation d'une machine et d'un terrain).
//   Le total de l'exercice des trois machines est recalculé sur texte (255,
//   les coûts annexes immobilisables étant de 2 + 3). Public visé :
//   entreprises commerciales et industrielles.
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'ue13c2-q1',
    question: "Une société minière acquiert des droits miniers sur un gisement de cuivre et des camions de roulage. Quelle norme s'applique à chacun ?",
    options: [
      { id: 'a', texte: "IAS 16 aux deux" },
      { id: 'b', texte: "IAS 16 exclut les droits miniers et les réserves minérales, mais s'applique aux camions, même utilisés pour exploiter ces réserves" },
      { id: 'c', texte: "IAS 38 aux deux" },
      { id: 'd', texte: "IFRS 6 aux deux" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 16.3(d) exclut « les droits miniers et les réserves minérales telles que le pétrole, le gaz naturel et autres ressources similaires non renouvelables ». La phrase finale du § 3 précise toutefois que la norme « s'applique aux immobilisations corporelles utilisées pour développer ou maintenir » ces actifs. Les camions relèvent donc d'IAS 16. IAS 38.2 exclut de même les dépenses de mise en valeur et d'extraction de minerais.",
    articleRef: "IAS 16.3 ; IAS 38.2",
  },
  {
    id: 'ue13c2-q2',
    question: "Les critères de comptabilisation d'IAS 16.7 exigent un avantage « probable ». Le Cadre de 2018 admet pourtant qu'un actif peut exister même si cette probabilité est faible. Qui l'emporte ?",
    options: [
      { id: 'a', texte: "Le Cadre, parce qu'il est plus récent" },
      { id: 'b', texte: "IAS 16 : le Cadre n'est pas une norme et ne l'emporte sur aucune disposition d'une norme" },
      { id: 'c', texte: "Le choix est laissé à la direction" },
      { id: 'd', texte: "L'auditeur tranche au cas par cas" },
    ],
    reponseCorrecte: 'b',
    explication: "Le Cadre le dit de lui-même : « Nothing in the Conceptual Framework overrides any Standard or any requirement in a Standard » (§ SP1.2), et sa révision « will not automatically lead to changes to the Standards » (§ SP1.4). IAS 16.7 conserve donc ses deux critères : avantages économiques futurs probables et coût évaluable de façon fiable. Le Cadre de 2018 n'est qu'une source de jugement quand aucune norme ne s'applique.",
    articleRef: "IAS 16.7 ; Cadre, § SP1.2 et SP1.4",
  },
  {
    id: 'ue13c2-q3',
    question: "Une cimenterie installe des filtres à poussières imposés par son plan de gestion environnementale. Ils n'augmentent pas la production. Sont-ils des immobilisations ?",
    options: [
      { id: 'a', texte: "Non, puisqu'ils ne génèrent aucun avantage direct" },
      { id: 'b', texte: "Oui : ils permettent d'obtenir les avantages des autres actifs, que l'entité ne pourrait pas obtenir sans eux ; leur valeur comptable reste soumise à IAS 36" },
      { id: 'c', texte: "Oui, mais en charges constatées d'avance" },
      { id: 'd', texte: "Seulement si l'administration les subventionne" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 16.11 vise précisément les immobilisations acquises « pour des raisons de sécurité ou pour des raisons liées à l'environnement » : elles sont comptabilisées en actifs parce qu'elles permettent à l'entité d'obtenir des autres actifs des avantages supérieurs à ceux qu'elle obtiendrait sans elles. La norme ajoute que la valeur comptable de ces actifs et des actifs liés est examinée pour dépréciation selon IAS 36.",
    articleRef: "IAS 16.11",
  },
  {
    id: 'ue13c2-q4',
    question: "Lequel de ces coûts entre dans le coût d'entrée d'une usine selon IAS 16 ?",
    options: [
      { id: 'a', texte: "La campagne publicitaire annonçant l'ouverture" },
      { id: 'b', texte: "La formation des ouvriers à la nouvelle ligne" },
      { id: 'c', texte: "Les tests de bon fonctionnement de la ligne de production" },
      { id: 'd', texte: "Les pertes d'exploitation des trois premiers mois, faute de demande" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 16.17(e) cite les coûts des tests de bon fonctionnement parmi les coûts directement attribuables. La publicité et la formation sont exclues par IAS 16.19(b) et (c) ; les pertes d'exploitation initiales par IAS 16.20(b). Depuis l'ajout du § 20A, le produit de la vente des échantillons obtenus pendant les tests est comptabilisé en résultat net, et non plus déduit du coût.",
    articleRef: "IAS 16.17, 16.19, 16.20 et 16.20A",
  },
  {
    id: 'ue13c2-q5',
    question: "Une machine est achetée 560 000 USD payables dans deux ans ; son prix comptant est de 500 000 USD. Comment est-elle comptabilisée ?",
    options: [
      { id: 'a', texte: "560 000 à l'actif" },
      { id: 'b', texte: "500 000 à l'actif ; 60 000 comptabilisés en charges financières sur la période de crédit, sauf incorporation selon IAS 23" },
      { id: 'c', texte: "500 000 à l'actif ; 60 000 en charge immédiate" },
      { id: 'd', texte: "560 000 à l'actif, amortis sur deux ans" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 16.23 : le coût est « le prix comptant équivalent à la date de comptabilisation ». Si le règlement est différé au-delà des conditions habituelles de crédit, la différence est comptabilisée en charges financières sur la période de crédit, à moins d'être incorporée selon IAS 23. Au taux implicite de 5,83 %, la charge est d'environ 29 150 USD la première année et 30 850 USD la seconde.",
    articleRef: "IAS 16.23",
  },
  {
    id: 'ue13c2-q6',
    question: "Une entité échange un vieux groupe électrogène (valeur comptable 40, juste valeur 55) contre un compresseur de configuration de flux très différente. À quel montant comptabilise-t-elle le compresseur ?",
    options: [
      { id: 'a', texte: "40, valeur comptable du bien cédé" },
      { id: 'b', texte: "55, juste valeur du bien cédé, sauf si celle du bien reçu est plus clairement évidente ; un profit de 15 est constaté" },
      { id: 'c', texte: "0, faute de décaissement" },
      { id: 'd', texte: "La moyenne de 40 et 55" },
    ],
    reponseCorrecte: 'b',
    explication: "L'échange a une substance commerciale, puisque la configuration des flux de l'actif reçu diffère de celle de l'actif transféré (IAS 16.25). Le coût est donc évalué à la juste valeur (§ 24), celle de l'actif cédé sauf si celle de l'actif reçu est plus clairement évidente (§ 26). La valeur comptable de l'actif cédé ne sert que si l'échange n'a pas de substance commerciale ou si aucune juste valeur n'est évaluable de façon fiable.",
    articleRef: "IAS 16.24-26",
  },
  {
    id: 'ue13c2-q7',
    question: "Selon IAS 23.5, qu'est-ce qu'un actif qualifié ?",
    options: [
      { id: 'a', texte: "Tout actif financé par emprunt" },
      { id: 'b', texte: "Un actif qui exige une longue période de préparation avant de pouvoir être utilisé ou vendu" },
      { id: 'c', texte: "Tout actif d'une valeur supérieure à un million de dollars" },
      { id: 'd', texte: "Un actif prêt à l'emploi dès son acquisition" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 23.5 définit l'actif qualifié comme « un actif qui exige une longue période de préparation avant de pouvoir être utilisé ou vendu ». Le § 7 précise que les actifs prêts à l'emploi ou à la vente dès leur acquisition n'en sont pas, pas plus que les actifs financiers. La norme ne fixe pas de durée ; le SYSCOHADA révisé indique qu'une période de préparation d'au moins un an devrait en principe suffire, tout en laissant place au jugement.",
    articleRef: "IAS 23.5 et 23.7 ; SYSCOHADA, Titre VIII, ch. 7",
  },
  {
    id: 'ue13c2-q8',
    question: "Un emprunt de 4 000 000 à 9 % finance spécifiquement une usine en construction toute l'année ; les fonds non encore dépensés ont rapporté 150 000 de placement. Quel montant d'intérêts de cet emprunt est incorporé ?",
    options: [
      { id: 'a', texte: "360 000" },
      { id: 'b', texte: "210 000" },
      { id: 'c', texte: "510 000" },
      { id: 'd', texte: "0, les intérêts sont toujours des charges" },
    ],
    reponseCorrecte: 'b',
    explication: "Pour un emprunt spécifique, IAS 23.12 incorpore les coûts réels de la période, « diminués de tout produit obtenu du placement temporaire de ces fonds empruntés » : 4 000 000 × 9 % − 150 000 = 210 000.",
    articleRef: "IAS 23.12-13",
  },
  {
    id: 'ue13c2-q9',
    question: "Les emprunts généraux d'une entité sont de 10 000 000 à 8 % et 5 000 000 à 11 %. Quel est le taux de capitalisation d'IAS 23.14 ?",
    options: [
      { id: 'a', texte: "9,5 %" },
      { id: 'b', texte: "9 %" },
      { id: 'c', texte: "8 %" },
      { id: 'd', texte: "11 %" },
    ],
    reponseCorrecte: 'b',
    explication: "Le taux de capitalisation est « la moyenne pondérée des coûts d'emprunt applicables à tous les emprunts de l'entité en cours au titre de la période » (IAS 23.14), à l'exclusion des emprunts spécifiques tant que l'actif qu'ils financent n'est pas pratiquement achevé : (800 000 + 550 000) / 15 000 000 = 9 %. La moyenne simple (9,5 %) ignore la pondération.",
    articleRef: "IAS 23.14",
  },
  {
    id: 'ue13c2-q10',
    question: "Les travaux d'un pont sont interrompus quatre mois par les hautes eaux, habituelles dans la région en cette saison. Que devient l'incorporation des coûts d'emprunt ?",
    options: [
      { id: 'a', texte: "Elle est suspendue, comme pour toute interruption" },
      { id: 'b', texte: "Elle se poursuit : un délai temporaire qui est une étape nécessaire du processus ne suspend pas l'incorporation" },
      { id: 'c', texte: "Elle cesse définitivement" },
      { id: 'd', texte: "Elle est doublée pour rattraper le retard" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 23.20 impose de suspendre l'incorporation pendant les longues périodes d'interruption du développement actif. Mais le § 21 prend cet exemple exact : l'incorporation se poursuit pendant la longue période où le niveau élevé des eaux retarde la construction d'un pont, « si ce niveau élevé est habituel pendant la période de construction dans la région géographique concernée ».",
    articleRef: "IAS 23.20-21",
  },
  {
    id: 'ue13c2-q11',
    question: "Un matériel de 200 000 000 F, amortissable sur 10 ans, devra être démantelé pour 10 000 000 F au terme ; taux d'actualisation 12 %. Quel est son coût d'entrée ?",
    options: [
      { id: 'a', texte: "200 000 000 F" },
      { id: 'b', texte: "210 000 000 F" },
      { id: 'c', texte: "203 219 732 F" },
      { id: 'd', texte: "196 780 268 F" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 16.16(c) inclut dans le coût l'estimation initiale des coûts de démantèlement, évaluée selon IAS 37, c'est-à-dire actualisée : 10 000 000 × 1,12⁻¹⁰ = 3 219 732 F. Coût d'entrée : 203 219 732 F, avec une provision de même montant. L'exemple vient du SYSCOHADA révisé (Titre VIII, ch. 6), dont la solution rejoint ici celle d'IAS 16.",
    articleRef: "IAS 16.16(c) et 16.18 ; SYSCOHADA, Titre VIII, ch. 6",
  },
  {
    id: 'ue13c2-q12',
    question: "Selon IFRIC 1, comment est comptabilisée la désactualisation annuelle d'une provision pour démantèlement ?",
    options: [
      { id: 'a', texte: "En augmentation du coût de l'actif" },
      { id: 'b', texte: "En charge financière en résultat, sans incorporation possible selon IAS 23" },
      { id: 'c', texte: "En autres éléments du résultat global" },
      { id: 'd', texte: "Elle n'est pas comptabilisée" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRIC 1.8 : « The periodic unwinding of the discount shall be recognised in profit or loss as a finance cost as it occurs. Capitalisation under IAS 23 is not permitted. » Seuls les changements d'estimation des flux ou du taux sont ajoutés au coût de l'actif, ou déduits de celui-ci, selon les §§ 5 à 7.",
    articleRef: "IFRIC 1.8",
  },
  {
    id: 'ue13c2-q13',
    question: "Au modèle du coût, la provision pour démantèlement diminue de 900 alors que la valeur comptable de l'actif n'est plus que de 600. Selon IFRIC 1, que fait-on ?",
    options: [
      { id: 'a', texte: "On déduit 900 du coût, l'actif devenant négatif" },
      { id: 'b', texte: "On déduit 600 du coût et on comptabilise immédiatement les 300 excédentaires en résultat" },
      { id: 'c', texte: "On comptabilise 900 en autres éléments du résultat global" },
      { id: 'd', texte: "On ne comptabilise rien avant le démantèlement" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRIC 1.5(b) : le montant déduit du coût de l'actif « shall not exceed its carrying amount. If a decrease in the liability exceeds the carrying amount of the asset, the excess shall be recognised immediately in profit or loss ». Le SYSCOHADA révisé raisonne autrement : la diminution de la provision passe par une dépréciation, imputée d'abord sur l'actif de démantèlement, puis sur l'actif sous-jacent.",
    articleRef: "IFRIC 1.5 ; SYSCOHADA, Titre VIII, ch. 6, § 2.4",
  },
  {
    id: 'ue13c2-q14',
    question: "Le Code minier permet de constituer en franchise d'impôt une provision pour réhabilitation du site plafonnée à 0,5 % du chiffre d'affaires (art. 258). Cette provision fiscale est-elle la provision de démantèlement d'IAS 37 ?",
    options: [
      { id: 'a', texte: "Oui, c'est la même" },
      { id: 'b', texte: "Non : la provision IFRS mesure l'obligation actuelle, actualisée, quel que soit le chiffre d'affaires ; la provision fiscale est un avantage fiscal plafonné, dont l'écart avec la provision comptable relève d'IAS 12" },
      { id: 'c', texte: "Oui, si le plafond n'est pas atteint" },
      { id: 'd', texte: "Non, car IAS 37 interdit toute provision environnementale" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 258 du Code minier organise un mécanisme fiscal : constitution en franchise d'impôt, plafond de 0,5 % du chiffre d'affaires, utilisation dans les dix ans, réintégration du solde non utilisé. IAS 16.16(c) et IAS 37 mesurent autre chose : la valeur actualisée de l'obligation de remise en état, sans lien avec le chiffre d'affaires. Les deux montants divergent presque toujours ; l'écart entre base fiscale et valeur comptable relève des impôts différés (chapitre 6).",
    articleRef: "Code minier, art. 204 et 258 ; IAS 16.16(c)",
  },
  {
    id: 'ue13c2-q15',
    question: "IAS 16.43 et le SYSCOHADA révisé traitent-ils l'approche par composants de la même façon ?",
    options: [
      { id: 'a', texte: "Oui, les deux la rendent facultative" },
      { id: 'b', texte: "Non : IAS 16.43 impose d'amortir séparément chaque partie d'un coût significatif ; le SYSCOHADA dit que chaque élément « peut » être comptabilisé séparément et élimine les éléments remplacés à moins de douze mois" },
      { id: 'c', texte: "Oui, les deux l'interdisent pour les bâtiments" },
      { id: 'd', texte: "Non : le SYSCOHADA l'impose, IAS 16 l'interdit" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 16.43 : « Chaque partie d'une immobilisation corporelle ayant un coût significatif par rapport au coût total de l'élément doit être amortie séparément. » Le SYSCOHADA révisé (Titre VIII, ch. 4) formule le principe de manière permissive (« peut être comptabilisé séparément ») et élimine systématiquement les éléments dont la fréquence de remplacement est inférieure à douze mois, dont le coût de remplacement est une charge de l'exercice.",
    articleRef: "IAS 16.43 ; SYSCOHADA, Titre VIII, ch. 4",
  },
  {
    id: 'ue13c2-q16',
    question: "Une compagnie aérienne réalise une inspection majeure de 90 000 sur un avion ; la précédente, non identifiée séparément à l'achat, aurait coûté environ 80 000. Selon IAS 16.14, que fait-elle ?",
    options: [
      { id: 'a', texte: "Elle passe les 90 000 en charges d'entretien" },
      { id: 'b', texte: "Elle immobilise les 90 000 si les critères sont remplis et décomptabilise la valeur comptable résiduelle de l'inspection précédente, estimée au besoin à partir du coût d'une inspection similaire" },
      { id: 'c', texte: "Elle immobilise les 90 000 sans rien décomptabiliser" },
      { id: 'd', texte: "Elle provisionne l'inspection suivante" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 16.14 : le coût d'une inspection majeure est comptabilisé dans la valeur comptable « à titre de remplacement, si les critères de comptabilisation sont satisfaits », et toute valeur comptable résiduelle du coût de la précédente inspection est décomptabilisée, « que le coût de l'inspection précédente ait ou non été identifié ». Le coût estimé d'une inspection similaire future peut servir d'indication.",
    articleRef: "IAS 16.14",
  },
  {
    id: 'ue13c2-q17',
    question: "Une concession de péage routier plafonne les recettes cumulées à 300 millions ; atteint ce montant, le droit expire. Peut-on amortir le droit en fonction des produits ?",
    options: [
      { id: 'a', texte: "Jamais : IAS 38 l'interdit dans tous les cas" },
      { id: 'b', texte: "Oui : la présomption de caractère inapproprié d'IAS 38.98A est réfutable lorsque le facteur limitatif prédominant est l'atteinte d'un montant total de produits fixé par le contrat" },
      { id: 'c', texte: "Oui, pour toute immobilisation, corporelle ou incorporelle" },
      { id: 'd', texte: "Seulement avec l'accord de l'administration fiscale" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 38.98A pose une présomption réfutable : un mode fondé sur les produits n'est pas approprié. Elle peut être réfutée si l'incorporelle est exprimée selon une mesure des produits, ou si produits et consommation sont fortement corrélés. IAS 38.98C cite l'exemple d'une concession limitée à un montant total de produits. Pour les immobilisations corporelles, IAS 16.62A ne prévoit aucune exception de ce type.",
    articleRef: "IAS 38.98A-98C ; IAS 16.62A",
  },
  {
    id: 'ue13c2-q18',
    question: "Un immeuble (coût 2 000, amortissements cumulés 400) est réévalué à 2 400. Selon la méthode du retraitement proportionnel d'IAS 16.35(a), quels sont le brut et le cumul des amortissements après réévaluation ?",
    options: [
      { id: 'a', texte: "Brut 2 400, amortissements 0" },
      { id: 'b', texte: "Brut 3 000, amortissements 600" },
      { id: 'c', texte: "Brut 2 800, amortissements 400" },
      { id: 'd', texte: "Brut 2 000, amortissements −400" },
    ],
    reponseCorrecte: 'b',
    explication: "La valeur comptable passe de 1 600 à 2 400, soit un coefficient de 1,5. Au prorata (§ 35(a)) : brut 2 000 × 1,5 = 3 000 ; amortissements 400 × 1,5 = 600 ; net 2 400. La méthode de l'élimination (§ 35(b)) donnerait brut 2 400 et amortissements 0. Dans les deux cas, l'écart de réévaluation est de 800, porté en autres éléments du résultat global (§ 39).",
    articleRef: "IAS 16.35 et 16.39",
  },
  {
    id: 'ue13c2-q19',
    question: "Un actif réévalué porte un écart de réévaluation créditeur de 680. Une nouvelle réévaluation fait baisser sa valeur de 840. Comment la baisse est-elle comptabilisée ?",
    options: [
      { id: 'a', texte: "840 en résultat net" },
      { id: 'b', texte: "840 en autres éléments du résultat global" },
      { id: 'c', texte: "680 en autres éléments du résultat global, 160 en résultat net" },
      { id: 'd', texte: "680 en résultat net, 160 en capitaux propres" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 16.40 : la diminution est comptabilisée en résultat net, mais dans les autres éléments du résultat global « dans la limite de l'écart de réévaluation créditeur pour ce même actif ». 680 réduisent l'écart de réévaluation ; les 160 restants vont en résultat net. Symétriquement, une hausse ultérieure irait d'abord en résultat net pour 160 (§ 39).",
    articleRef: "IAS 16.39-40",
  },
  {
    id: 'ue13c2-q20',
    question: "Sur quel périmètre porte une réévaluation, selon IAS 16 d'une part, selon l'AUDCIF d'autre part ?",
    options: [
      { id: 'a', texte: "Sur l'actif choisi par la direction, dans les deux cas" },
      { id: 'b', texte: "IAS 16 : toute la catégorie dont fait partie l'actif ; AUDCIF : l'ensemble des immobilisations corporelles et financières, toute réévaluation partielle étant interdite" },
      { id: 'c', texte: "Sur l'ensemble du bilan, dans les deux cas" },
      { id: 'd', texte: "IAS 16 : l'ensemble du bilan ; AUDCIF : l'actif choisi" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 16.36 : lorsqu'une immobilisation est réévaluée, « toute la catégorie d'immobilisations corporelles dont fait partie cet actif doit être réévaluée » ; le § 37 donne des exemples de catégories (terrains, machines, véhicules…). L'article 62 de l'AUDCIF vise les immobilisations corporelles et financières et dispose que « toute réévaluation partielle est interdite ». En droit fiscal congolais, la loi n° 23/053, qui a abrogé l'ordonnance-loi 89-017 au 1er janvier 2026, exige elle aussi une réévaluation globale (art. 130).",
    articleRef: "IAS 16.36-37 ; AUDCIF art. 62 ; loi n° 23/053, art. 130",
  },
  {
    id: 'ue13c2-q21',
    question: "Qu'est-ce qui distingue le sort de l'écart de réévaluation sous IAS 16.41 et sous l'AUDCIF ?",
    options: [
      { id: 'a', texte: "Rien : les deux l'inscrivent en résultat lors de la cession" },
      { id: 'b', texte: "IAS 16.41 permet de le transférer directement en résultats non distribués, sans passer par le résultat net ; l'AUDCIF le déclare non distribuable et incorporable au capital" },
      { id: 'c', texte: "IAS 16.41 impose de le recycler en résultat net" },
      { id: 'd', texte: "L'AUDCIF impose de le distribuer" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 16.41 : l'écart « peut être transféré directement dans les résultats non distribués » lors de la décomptabilisation, ou au fur et à mesure de l'utilisation pour la différence entre amortissement réévalué et amortissement historique ; ces transferts « ne se font pas par le biais du résultat net ». L'article 65 de l'AUDCIF : l'écart ne peut être incorporé au résultat de l'exercice de réévaluation, « il n'est pas distribuable » et peut être incorporé au capital.",
    articleRef: "IAS 16.41 ; AUDCIF art. 65",
  },
  {
    id: 'ue13c2-q22',
    question: "Selon IAS 16.58, un terrain et le bâtiment qui y est édifié sont…",
    options: [
      { id: 'a', texte: "deux composants d'un même actif" },
      { id: 'b', texte: "deux actifs distincts, traités séparément même lorsqu'ils sont acquis ensemble ; le terrain n'est en principe pas amorti" },
      { id: 'c', texte: "un seul actif amorti sur la durée du bâtiment" },
      { id: 'd', texte: "un seul actif non amortissable" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 16.58 : « Les terrains et les constructions sont des actifs distincts, traités séparément en comptabilité même lorsqu'ils sont acquis ensemble. » Sauf exceptions (carrières, sites de décharge), les terrains ont une durée d'utilité illimitée et ne sont pas amortis. Le SYSCOHADA révisé dit la même chose : la ventilation entre terrain et construction est une ventilation entre deux actifs distincts, « et non la détermination d'un composant ».",
    articleRef: "IAS 16.58 ; SYSCOHADA, Titre VIII, ch. 4",
  },
  {
    id: 'ue13c2-q23',
    question: "Un matériel est laissé inutilisé six mois, faute de commandes. Son amortissement linéaire…",
    options: [
      { id: 'a', texte: "est suspendu pendant l'inactivité" },
      { id: 'b', texte: "continue : l'amortissement ne cesse pas lorsque l'actif est inutilisé, sauf s'il est entièrement amorti ou classé comme détenu en vue de la vente" },
      { id: 'c', texte: "est doublé pour tenir compte de l'obsolescence" },
      { id: 'd', texte: "est remplacé par une provision" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 16.55 : l'amortissement cesse à la plus rapprochée des dates de classement comme détenu en vue de la vente (IFRS 5) ou de décomptabilisation ; il ne cesse pas lorsque l'actif est laissé inutilisé ou mis hors service, sauf s'il est entièrement amorti. Seul un mode fondé sur l'utilisation, comme les unités d'œuvre, peut aboutir à une dotation nulle quand il n'y a aucune production.",
    articleRef: "IAS 16.55",
  },
  {
    id: 'ue13c2-q24',
    question: "Parmi ces éléments générés en interne, lequel peut être comptabilisé en immobilisation incorporelle selon IAS 38 ?",
    options: [
      { id: 'a', texte: "Une marque créée par l'entreprise" },
      { id: 'b', texte: "Un fichier clients constitué au fil des années" },
      { id: 'c', texte: "Un logiciel en phase de développement remplissant les six critères du § 57" },
      { id: 'd', texte: "Le goodwill généré en interne" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 38.63 interdit de comptabiliser en immobilisations incorporelles les marques, cartouches de titre, titres de publication, listes de clients et éléments similaires générés en interne ; IAS 38.48 interdit de comptabiliser le goodwill généré en interne. Seule une dépense de développement satisfaisant aux six critères du § 57 peut être activée : faisabilité technique, intention, capacité, avantages probables, ressources, évaluation fiable.",
    articleRef: "IAS 38.48, 38.57 et 38.63",
  },
  {
    id: 'ue13c2-q25',
    question: "Le laboratoire MI a passé en charges 35 000 de frais de développement engagés avant le 15 septembre, date à laquelle les critères du § 57 ont été remplis. Peut-on les activer en fin d'exercice ?",
    options: [
      { id: 'a', texte: "Oui, rétroactivement, puisque le projet est désormais viable" },
      { id: 'b', texte: "Non : les dépenses initialement comptabilisées en charges ne peuvent pas être incorporées ultérieurement dans le coût d'une incorporelle" },
      { id: 'c', texte: "Oui, par voie de correction d'erreur" },
      { id: 'd', texte: "Oui, pour moitié" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 38.65 : le coût d'une incorporelle générée en interne est la somme des dépenses engagées à partir de la date où les critères sont satisfaits pour la première fois. IAS 38.71 : les dépenses initialement comptabilisées en charges ne doivent pas être incorporées ultérieurement. Il n'y a pas d'erreur à corriger : le traitement initial était le bon. Le SYSCOHADA révisé retient la même règle (Titre VIII, ch. 1, § 3.1).",
    articleRef: "IAS 38.65 et 38.71",
  },
  {
    id: 'ue13c2-q26',
    question: "Une licence d'exploitation de fréquences est accordée pour 10 ans, renouvelable. L'entité a toujours obtenu le renouvellement, pour un coût non significatif. Quelle durée d'utilité retenir ?",
    options: [
      { id: 'a', texte: "10 ans, jamais davantage" },
      { id: 'b', texte: "La période contractuelle, prolongée des périodes de renouvellement si des éléments probants justifient un renouvellement sans coût important ; le cas échéant, une durée indéterminée, sans amortissement mais avec un test annuel" },
      { id: 'c', texte: "Une durée infinie, sans test" },
      { id: 'd', texte: "La durée d'amortissement fiscal de 5 ans" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 38.94 : la durée d'utilité issue de droits contractuels ne doit pas excéder leur période, mais les périodes de renouvellement sont incluses s'il existe des éléments probants justifiant le renouvellement sans coût important (§ 96). Si aucune limite prévisible n'existe, la durée est indéterminée (§ 88) : pas d'amortissement (§ 107), mais un test de dépréciation annuel (§ 108). Et « indéterminé » ne veut pas dire « infini » (§ 91).",
    articleRef: "IAS 38.88-96 et 38.107-108",
  },
  {
    id: 'ue13c2-q27',
    question: "Dans une mine à ciel ouvert en phase de production, l'enlèvement des stériles améliore l'accès à une partie identifiée du gisement. Selon IFRIC 20, comment traiter ce coût ?",
    options: [
      { id: 'a', texte: "Entièrement en stocks" },
      { id: 'b', texte: "Entièrement en charges" },
      { id: 'c', texte: "En stocks pour la part qui produit du minerai de la période (IAS 2) ; en actif non courant (« stripping activity asset ») pour la part qui améliore l'accès, si les trois critères du § 9 sont remplis" },
      { id: 'd', texte: "En immobilisation incorporelle distincte de la mine" },
    ],
    reponseCorrecte: 'c',
    explication: "IFRIC 20.8 : dans la mesure où l'avantage prend la forme de stocks produits, les coûts relèvent d'IAS 2 ; dans la mesure où il consiste en un meilleur accès au minerai, ils sont comptabilisés en actif non courant si le § 9 est satisfait (avantage probable, composante identifiée du gisement, coûts évaluables de façon fiable). Cet actif est comptabilisé comme une partie d'un actif existant (§ 10), dont il prend la nature corporelle ou incorporelle (§ 11).",
    articleRef: "IFRIC 20.8-11",
  },
  {
    id: 'ue13c2-q28',
    question: "Une société pratique pour la première fois le modèle de la réévaluation. Machine industrielle : valeur comptable 30, juste valeur 10. Terrain : coût 100, juste valeur 150. Quel montant passe en charges ?",
    options: [
      { id: 'a', texte: "0 : la plus-value du terrain compense la moins-value de la machine" },
      { id: 'b', texte: "20" },
      { id: 'c', texte: "30" },
      { id: 'd', texte: "50" },
    ],
    reponseCorrecte: 'b',
    explication: "Machines et terrains sont des catégories distinctes (IAS 16.37), et la réévaluation s'apprécie actif par actif. La diminution de la machine (30 − 10 = 20) va en résultat net, faute d'écart de réévaluation antérieur sur ce même actif (§ 40). La hausse du terrain (150 − 100 = 50) va en autres éléments du résultat global, dans l'écart de réévaluation (§ 39). On ne compense pas la moins-value d'un actif avec la plus-value d'un autre : 20 en charges, 50 en capitaux propres.",
    articleRef: "IAS 16.36-37 et 16.39-40",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '2.1',
    titre: "Définition, champ d'application et comptabilisation des immobilisations corporelles",
    navLabel: 'Comptabilisation',
    blocs: [
      {
        type: 'paragraphe',
        texte: "IAS 16 a pour objectif de permettre aux utilisateurs des états financiers de distinguer l'information relative aux investissements de l'entité dans ses immobilisations corporelles et celle relative aux variations de ces investissements (§ 1). La norme traite à cette fin de la comptabilisation des actifs, de la détermination de leur valeur comptable, de leur amortissement et de leur sortie. Les immobilisations corporelles sont des actifs corporels détenus pour être utilisés dans la production ou la fourniture de biens ou de services, pour être loués à des tiers ou à des fins administratives, et dont l'entité s'attend à ce qu'ils soient utilisés sur plus d'une période (§ 6). La définition ne comporte ni seuil de valeur ni condition de propriété juridique : c'est l'utilisation attendue du bien qui fonde sa qualification. Les biens pris en location relèvent quant à eux d'IFRS 16, qui fait comptabiliser par le preneur un droit d'utilisation.",
      },
      { type: 'intertitre', texte: "2.1.1 Champ d'application" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 16, § 3",
        texte: "La norme ne s'applique pas aux immobilisations corporelles classées comme détenues en vue de la vente (IFRS 5), aux actifs biologiques autres que les plantes productrices (IAS 41), à la comptabilisation et à l'évaluation des actifs de prospection et d'évaluation (IFRS 6), ni « aux droits miniers et aux réserves minérales telles que le pétrole, le gaz naturel et autres ressources similaires non renouvelables ». Elle s'applique toutefois « aux immobilisations corporelles utilisées pour développer ou maintenir » ces actifs.",
      },
      {
        type: 'paragraphe',
        texte: "Cette délimitation revêt une importance particulière dans l'économie minière congolaise : le gisement exploité à Kolwezi échappe à IAS 16, tandis que les engins de chantier, les camions de roulage et l'usine de traitement y sont soumis.",
      },
      { type: 'intertitre', texte: "2.1.2 Critères de comptabilisation" },
      {
        type: 'paragraphe',
        texte: "Le coût d'une immobilisation corporelle est comptabilisé en tant qu'actif « si, et seulement si : (a) il est probable que les avantages économiques futurs associés à cet élément iront à l'entité ; et (b) le coût de cet élément peut être évalué de façon fiable » (§ 7). Ce critère de probabilité reprend une formulation antérieure au Cadre conceptuel de 2018, qui l'a remplacé par une appréciation de la pertinence et de la fidélité de l'information (§ 5.6-5.17) ; la norme n'ayant pas été modifiée sur ce point, son critère demeure applicable. La norme laisse au jugement de l'entité la définition de l'unité de comptabilisation, et admet de regrouper des éléments de faible valeur individuelle, tels que les moules, outils et matrices, pour leur appliquer les critères de manière globale (§ 9). Les pièces de rechange, pièces de sécurité et matériels d'entretien sont des immobilisations corporelles lorsqu'ils répondent à la définition, et des stocks dans le cas contraire (§ 8). Les équipements acquis pour des raisons de sécurité ou d'environnement sont comptabilisés en immobilisations, bien qu'ils n'augmentent pas directement les avantages procurés par un actif déterminé, parce qu'ils conditionnent l'obtention des avantages des autres actifs (§ 11).",
      },
      { type: 'intertitre', texte: "2.1.3 Coûts ultérieurs" },
      {
        type: 'paragraphe',
        texte: "Le même principe de comptabilisation s'applique aux coûts engagés postérieurement à l'acquisition (§ 10). Les coûts d'entretien courant, constitués principalement de main-d'œuvre, de consommables et de petites pièces, sont comptabilisés en charges (§ 12). Le remplacement d'une partie d'une immobilisation, comme le revêtement intérieur d'un four ou les sièges d'un avion, est comptabilisé en immobilisation lorsque les critères sont remplis, la valeur comptable de la partie remplacée étant décomptabilisée (§ 13 et 70). Les inspections majeures reçoivent le même traitement qu'un remplacement (§ 14) ; la section 2.5 y revient à propos de l'approche par composants.",
      },
      {
        type: 'filet',
        titre: "Observation — Seuil de significativité et règle fiscale",
        texte: "IAS 16 ne fixe aucun seuil de valeur, mais la pratique en retient un au titre de l'importance relative. En RDC, l'arrêté n° 014/CAB/MIN/FINANCES/2025, applicable depuis le 1er janvier 2026, admet en déduction dès leur acquisition le petit matériel, l'outillage et le matériel de bureau d'une valeur unitaire inférieure à l'équivalent de 500 USD. Cette règle est d'ordre fiscal. Une entité peut s'en inspirer pour fixer son seuil comptable, à condition de le justifier au regard d'IAS 8.8, qui admet les écarts non significatifs mais proscrit ceux qui visent une présentation particulière.",
      },
    ],
  },
  {
    numero: '2.2',
    titre: "Évaluation initiale : la détermination du coût d'entrée",
    navLabel: "Coût d'entrée",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Une immobilisation corporelle qui remplit les conditions de comptabilisation « doit être évaluée à son coût » (§ 15). Ce coût comprend trois composantes (§ 16) : le prix d'achat, y compris les droits de douane et les taxes non remboursables, après déduction des remises et rabais commerciaux ; les coûts directement attribuables au transfert de l'actif jusqu'à son lieu d'exploitation et à sa mise en état de fonctionner de la manière prévue par la direction ; l'estimation initiale des coûts de démantèlement, d'enlèvement et de remise en état du site. Le critère central est celui du lien direct : l'incorporation cesse lorsque l'actif se trouve en état de fonctionner comme prévu.",
      },
      { type: 'intertitre', texte: "2.2.1 Coûts incorporables et coûts exclus" },
      {
        type: 'carte',
        titre: "Tableau 2.1 — Composantes du coût d'entrée (IAS 16, § 16-22)",
        tableau: {
          entetes: ['Incorporé au coût', 'Exclu du coût'],
          lignes: [
            ["Avantages du personnel résultant directement de la construction ou de l'acquisition (§ 17(a))", "Coûts d'ouverture d'une nouvelle installation (§ 19(a))"],
            ["Préparation du site ; livraison et manutention initiales (§ 17(b)-(c))", "Coûts de lancement d'un produit, de publicité et de promotion (§ 19(b))"],
            ["Installation et montage (§ 17(d))", "Coûts liés à l'exploitation dans un nouveau lieu ou pour une nouvelle clientèle, y compris la formation (§ 19(c))"],
            ["Tests de bon fonctionnement (§ 17(e))", "Frais administratifs et frais généraux (§ 19(d))"],
            ["Honoraires de professionnels (§ 17(f))", "Pertes d'exploitation initiales, sous-activité de démarrage, coûts de relocalisation (§ 20)"],
            ["Droits de douane et taxes non remboursables (§ 16(a))", "Taxes récupérables ; montants anormaux de matières ou de main-d'œuvre gaspillées (§ 22)"],
          ],
        },
      },
      {
        type: 'carte',
        titre: "Exemple 2.1 — Analyse des coûts d'acquisition d'une ligne de mise en bouteilles",
        texte: "Une brasserie acquiert une ligne de mise en bouteilles. Les dépenses suivantes sont analysées au regard des § 16 à 22 d'IAS 16.",
        tableau: {
          entetes: ['Dépense', 'Traitement', 'Justification'],
          lignes: [
            ['Livraison de la ligne par le fabricant', 'Incorporée', 'Frais de livraison initiaux (§ 17(c))'],
            ["Convoyage, par l'acquéreur, d'une partie de la ligne non livrée par le fabricant", 'Incorporé', 'Coût directement attribuable au transfert de l\'actif'],
            ['Réalisation d\'une dalle en béton destinée à recevoir le moteur principal', 'Incorporée', 'Frais de préparation du site (§ 17(b))'],
            ['Honoraires du service des mines pour la certification de la machine', 'Incorporés', 'Honoraires de professionnels (§ 17(f))'],
            ['Remise exceptionnelle obtenue deux mois après la mise en service', 'Déduite du coût', 'Le prix d\'achat s\'entend après remises et rabais (§ 16(a))'],
            ['Huile du moteur principal ; consommables livrés pour la machine', 'Charges', 'Consommables d\'exploitation, sans lien avec la mise en état de fonctionnement'],
            ['Frais de déplacement pour visiter une ligne identique chez un concurrent ; heures de négociation du directeur des achats', 'Charges', 'Frais administratifs et frais généraux (§ 19(d))'],
            ['Frais de démarrage ; pertes opérationnelles liées à la mise en route', 'Charges', '§ 19 et 20'],
            ['Peinture des tapis roulants pour harmoniser la ligne avec les installations existantes', 'Charge', 'Dépense non nécessaire à la mise en état de fonctionnement'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Deux dispositions précisent le traitement des produits perçus pendant la mise en place de l'actif. Le § 20A prescrit de comptabiliser en résultat net le produit de la vente des éléments fabriqués pendant les tests, par exemple les premières tonnes de ciment produites par un four en rodage, ainsi que leur coût évalué selon IAS 2 ; ce produit ne vient plus en déduction du coût de l'installation. Le § 21 traite les opérations accessoires, telles que la location d'un terrain en parking avant le début des travaux : leurs produits et leurs charges sont comptabilisés en résultat, car ces opérations ne sont pas nécessaires à la mise en état de l'actif.",
      },
      { type: 'intertitre', texte: "2.2.2 Paiement différé et échange d'actifs" },
      {
        type: 'paragraphe',
        texte: "Le coût d'une immobilisation corporelle est le prix comptant équivalent à la date de comptabilisation. Lorsque le règlement est différé au-delà des conditions habituelles de crédit, « la différence entre le prix comptant équivalent et le total des paiements est comptabilisée en charges financières sur la période de crédit, à moins que ces charges ne soient incorporées dans le coût de l'actif selon IAS 23 » (§ 23). L'actualisation neutralise ainsi l'effet du crédit fournisseur dans l'évaluation de l'actif.",
      },
      {
        type: 'carte',
        titre: "Exemple 2.2 — Acquisition d'une machine avec paiement échelonné",
        texte: "Une machine est acquise au début de l'exercice N. Elle est payée 100 comptant, 110 à la fin de N et 121 à la fin de N+1 (montants en milliers de USD). Le taux d'actualisation retenu est de 10 %.",
        tableau: {
          entetes: ['Élément', 'Calcul', 'Montant'],
          lignes: [
            ['Paiement comptant', '100', '100'],
            ['Valeur actuelle du paiement de fin N', '110 / 1,10', '100'],
            ['Valeur actuelle du paiement de fin N+1', '121 / 1,10²', '100'],
            ['Coût de la machine (prix comptant équivalent)', '', '300'],
            ['Charge financière de N', '200 × 10 %', '20'],
            ['Charge financière de N+1', '(220 − 110) × 10 %', '11'],
          ],
        },
        note: "Écritures à l'acquisition : débit Immobilisations 300, crédit Banque 100 et Fournisseurs d'immobilisations 200. Fin N : débit Charges financières 20, crédit Fournisseurs d'immobilisations 20, puis règlement de 110. Fin N+1 : débit Charges financières 11, crédit Fournisseurs d'immobilisations 11, puis règlement de 121. Le total des charges financières (31) correspond à l'écart entre les paiements (331) et le prix comptant équivalent (300).",
      },
      {
        type: 'paragraphe',
        texte: "Lorsqu'une immobilisation est acquise en échange d'un ou plusieurs actifs non monétaires, son coût est évalué à la juste valeur, sauf si l'échange n'a pas de substance commerciale ou si ni la juste valeur de l'actif reçu ni celle de l'actif cédé ne peuvent être évaluées de façon fiable ; dans ces cas, le coût est la valeur comptable de l'actif cédé (§ 24). L'échange a une substance commerciale lorsque la configuration des flux de trésorerie de l'actif reçu diffère de celle de l'actif cédé, ou lorsque la valeur spécifique à l'entité de la partie de ses activités concernée est modifiée, et que cette différence est significative (§ 25). Cette condition empêche deux entités de faire apparaître des plus-values par l'échange d'actifs identiques. Les immobilisations produites par l'entité pour elle-même sont évaluées selon les mêmes principes que les immobilisations acquises.",
      },
    ],
  },
  {
    numero: '2.3',
    titre: "L'incorporation des coûts d'emprunt selon IAS 23",
    navLabel: "Coûts d'emprunt",
    blocs: [
      { type: 'intertitre', texte: "2.3.1 Principe et notion d'actif qualifié" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 23, § 1 et 8",
        texte: "« Les coûts d'emprunt qui sont directement attribuables à l'acquisition, la construction ou la production d'un actif qualifié font partie du coût de cet actif. Les autres coûts d'emprunt sont comptabilisés en charges. » Les entités « doivent inscrire à l'actif » ces coûts (§ 8).",
      },
      {
        type: 'paragraphe',
        texte: "L'incorporation est donc obligatoire. Un actif qualifié est « un actif qui exige une longue période de préparation avant de pouvoir être utilisé ou vendu » (§ 5) : usine, centrale électrique, immeuble de placement, immobilisation incorporelle, voire stocks selon les circonstances (§ 7). Le fondement de la règle est la notion de coût évitable : sont incorporables les coûts d'emprunt « qui auraient pu être évités si la dépense relative à l'actif qualifié n'avait pas été faite » (§ 10). Pour un emprunt contracté spécifiquement, l'entité incorpore les coûts réels de la période, diminués des produits du placement temporaire des fonds non encore utilisés (§ 12-13). Pour des fonds empruntés de manière générale, elle applique aux dépenses un taux de capitalisation égal à la moyenne pondérée des coûts des emprunts en cours, à l'exclusion des emprunts spécifiques tant que l'actif qu'ils financent n'est pas pratiquement achevé, sans pouvoir incorporer plus que le total des coûts d'emprunt de la période (§ 14).",
      },
      {
        type: 'carte',
        titre: "Exemple 2.3 — Coûts d'emprunt incorporés à une ligne de cuisson (MBANZA CIMENT SA, société fictive)",
        texte: "La société construit une ligne de cuisson pendant tout l'exercice N. Emprunt spécifique : 4 000 000 USD à 9 %, tiré le 1er janvier ; produits du placement temporaire des fonds non encore dépensés : 150 000 USD. Emprunts généraux : 10 000 000 USD à 8 % et 5 000 000 USD à 11 %. Dépenses financées par les fonds généraux : 2 000 000 USD le 1er avril et 3 000 000 USD le 1er octobre.",
        tableau: {
          entetes: ['Étape', 'Calcul', 'Montant (USD)'],
          lignes: [
            ['Emprunt spécifique (§ 12)', '4 000 000 × 9 % − 150 000', '210 000'],
            ['Taux de capitalisation (§ 14)', '(800 000 + 550 000) / 15 000 000', '9 %'],
            ['Dépenses moyennes financées par les fonds généraux', '2 000 000 × 9/12 + 3 000 000 × 3/12', '2 250 000'],
            ['Coûts incorporés au titre des emprunts généraux', '2 250 000 × 9 %', '202 500'],
            ['Total incorporé au coût de la ligne', '210 000 + 202 500', '412 500'],
            ['Plafond : coûts d\'emprunt totaux de N (§ 14)', '360 000 + 800 000 + 550 000', '1 710 000'],
          ],
        },
        note: "Le solde des intérêts, soit 1 710 000 − 360 000 − 202 500 = 1 147 500 USD, est comptabilisé en charges financières. Les 150 000 de produits de placement viennent en déduction du coût incorporé et ne sont pas présentés en produits financiers.",
      },
      { type: 'intertitre', texte: "2.3.2 Période d'incorporation" },
      {
        type: 'paragraphe',
        texte: "L'incorporation commence à la date à laquelle l'entité remplit pour la première fois trois conditions : elle engage des dépenses relatives à l'actif, elle engage des coûts d'emprunt et elle entreprend les activités indispensables à la préparation de l'actif (§ 17). Ces activités comprennent les travaux techniques et administratifs préalables, tels que l'obtention des autorisations, mais non la simple détention d'un terrain sans travaux d'aménagement (§ 19). L'incorporation est suspendue pendant les longues périodes d'interruption des activités de développement, sauf si des travaux techniques ou administratifs importants sont réalisés ou si le délai constitue une étape nécessaire du processus (§ 20-21). Elle cesse lorsque la quasi-totalité des activités indispensables est achevée ; lorsque l'actif est livré par parties utilisables séparément, comme les immeubles d'un complexe, elle cesse partie par partie, alors qu'elle se poursuit jusqu'à l'achèvement de l'ensemble pour une installation dont les processus s'enchaînent (§ 22-25).",
      },
      {
        type: 'filet',
        titre: "Observation — Emprunts en devises et environnement inflationniste",
        texte: "IAS 23.6(e) inclut dans les coûts d'emprunt les différences de change sur emprunts en monnaie étrangère « dans la mesure où elles sont assimilées à un ajustement des coûts d'intérêt ». Une entité congolaise empruntant en dollars doit donc isoler, dans la perte de change, la part qui compense l'écart entre le taux d'intérêt en dollars et le taux en francs congolais. Si l'économie était qualifiée d'hyperinflationniste, IAS 23.9 imposerait en outre de comptabiliser en charges la part des coûts d'emprunt qui compense l'inflation (renvoi à IAS 29.21). L'application de la norme suppose ainsi une analyse de l'environnement monétaire de l'entité.",
      },
    ],
  },
  {
    numero: '2.4',
    titre: "Obligations de démantèlement et de remise en état",
    navLabel: 'Démantèlement',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le coût d'une immobilisation inclut « l'estimation initiale des coûts relatifs au démantèlement et à l'enlèvement de l'immobilisation et à la remise en état du site », lorsque l'entité contracte cette obligation du fait de l'acquisition de l'actif ou de son utilisation à des fins autres que la production de stocks (§ 16(c)). L'obligation est évaluée selon IAS 37, c'est-à-dire pour sa valeur actualisée (§ 18). Lorsque la dégradation résulte de la production de stocks au cours de la période, le coût correspondant relève d'IAS 2 et entre dans le coût des stocks (§ 18). La distinction oppose ainsi l'obligation née de l'existence de l'installation à celle qui naît de l'extraction.",
      },
      {
        type: 'carte',
        titre: "Exemple 2.4 — Comptabilisation initiale d'un coût de démantèlement",
        texte: "Un matériel industriel lourd est acquis le 2 janvier N pour 200 000 000 F ; sa durée d'utilité est de 10 ans. Le coût de démantèlement est estimé à 10 000 000 F au terme, et le taux d'actualisation à 12 %. L'exemple est repris du SYSCOHADA révisé (Titre VIII, ch. 6) et traité selon les IFRS.",
        tableau: {
          entetes: ['Étape', 'Calcul', 'Montant (F)'],
          lignes: [
            ['Provision initiale', '10 000 000 × 1,12⁻¹⁰', '3 219 732'],
            ["Coût d'entrée", '200 000 000 + 3 219 732', '203 219 732'],
            ['Désactualisation de N (charge financière)', '3 219 732 × 12 %', '386 368'],
            ['Provision au 31 décembre N', '10 000 000 × 1,12⁻⁹', '3 606 100'],
            ['Amortissement de N', '203 219 732 / 10', '20 321 973'],
          ],
        },
        note: "Le SYSCOHADA révisé retient la même mécanique pour la dégradation immédiate, avec un sous-compte « actif de démantèlement » amorti sur la durée d'exploitation.",
      },
      {
        type: 'paragraphe',
        texte: "La révision de l'estimation est régie par IFRIC 1, qui distingue trois causes de variation du passif (§ 3) : une modification des sorties de ressources estimées, une modification du taux d'actualisation et l'augmentation liée à l'écoulement du temps. Cette dernière, la désactualisation, constitue une charge financière qui ne peut être incorporée selon IAS 23 (§ 8). Les deux premières, lorsque l'actif est évalué au coût, sont ajoutées au coût de l'actif ou déduites de celui-ci au cours de la période où elles surviennent (§ 5(a)). Une augmentation constitue un indice possible de perte de valeur au sens d'IAS 36 (§ 5(c)). Une diminution ne peut réduire la valeur de l'actif en deçà de zéro, l'excédent étant comptabilisé immédiatement en résultat (§ 5(b)). Le montant amortissable ajusté est amorti sur la durée d'utilité restante (§ 7).",
      },
      {
        type: 'carte',
        titre: "Exemple 2.5 — Révision de l'estimation du coût de démantèlement (IFRIC 1)",
        liste: [
          "Situation au 31 décembre N+1 : provision 10 000 000 × 1,12⁻⁸, soit environ 4 038 832 ; valeur nette de l'actif de démantèlement 3 219 732 × 8/10, soit environ 2 575 786.",
          "Nouvelle estimation : 14 000 000 F au terme, au taux de 12 %. La provision s'établit à 14 000 000 × 1,12⁻⁸, soit environ 5 654 365, en hausse de 1 615 533.",
          "Écriture (IFRIC 1, § 5(a)) : débit de l'actif de démantèlement et crédit de la provision pour 1 615 533, sans charge immédiate.",
          "Suite : la valeur nette, portée à 2 575 786 + 1 615 533 = 4 191 319, est amortie sur les 8 années restantes, soit environ 523 915 par an ; la désactualisation de N+2, 5 654 365 × 12 %, soit environ 678 524, est comptabilisée en charges financières.",
          "La hausse de l'estimation constitue un indice de perte de valeur qui impose de tester l'actif selon IAS 36 (§ 5(c)).",
        ],
      },
      {
        type: 'filet',
        titre: "Rapprochement avec le SYSCOHADA révisé et le Code minier",
        texte: "Le SYSCOHADA révisé distingue la dégradation immédiate, provisionnée pour sa valeur actualisée avec un actif en contrepartie, et la dégradation progressive, propre aux mines et carrières, provisionnée au fur et à mesure « sans actif en contrepartie ». Il traite par ailleurs une diminution de la provision par voie de dépréciation, alors qu'IFRIC 1 la déduit du coût de l'actif. Le Code minier prévoit deux mécanismes de nature différente : l'article 204 exige une sûreté garantissant les obligations environnementales, qui constitue une garantie et non une provision ; l'article 258 admet une provision pour réhabilitation en franchise d'impôt, plafonnée à 0,5 % du chiffre d'affaires et réintégrée si elle n'est pas utilisée dans un délai de dix ans, qui constitue un avantage fiscal. Seule l'obligation actualisée selon IAS 37 mesure le passif au sens des IFRS.",
      },
    ],
  },
  {
    numero: '2.5',
    titre: "L'amortissement : composants, durée d'utilité et mode",
    navLabel: 'Amortissement',
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'amortissement est « la répartition systématique du montant amortissable d'un actif sur sa durée d'utilité » (§ 6). Chacun des termes de cette définition repose sur une estimation. Le montant amortissable est le coût diminué de la valeur résiduelle, c'est-à-dire du montant que l'entité obtiendrait actuellement de la sortie de l'actif, après déduction des coûts de sortie, si celui-ci avait déjà l'âge et l'état prévus à la fin de sa durée d'utilité. La durée d'utilité est la période pendant laquelle l'entité s'attend à utiliser l'actif ; elle peut être plus courte que sa durée de vie économique (§ 57). Le mode d'amortissement doit refléter le rythme de consommation des avantages économiques (§ 60). Ces trois paramètres sont révisés au moins à chaque clôture, et leurs modifications constituent des changements d'estimation traités de manière prospective selon IAS 8 (§ 51 et 61).",
      },
      { type: 'intertitre', texte: "2.5.1 L'approche par composants" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 16, § 43",
        texte: "« Chaque partie d'une immobilisation corporelle ayant un coût significatif par rapport au coût total de l'élément doit être amortie séparément. »",
      },
      {
        type: 'paragraphe',
        texte: "La norme cite l'exemple de la cellule et des réacteurs d'un avion (§ 44). Les parties dont la durée d'utilité et le mode d'amortissement sont identiques peuvent être regroupées (§ 45). Lorsque certaines parties sont amorties séparément, le reliquat, composé des parties non significatives, est également amorti séparément, au besoin par approximation (§ 46). L'approche par composants concerne aussi les inspections et révisions majeures : leur coût est comptabilisé comme un composant, amorti sur la période séparant deux révisions, ce qui exclut la constitution de provisions pour grosses réparations. Ainsi, pour une machine de 30 dont le contrat d'acquisition prévoit une révision tous les deux ans pour un coût de 4, l'entité amortit 26 sur la durée d'utilité de la machine et 4 sur deux ans.",
      },
      {
        type: 'carte',
        titre: "Exemple 2.6 — Amortissement par composants d'un camion de roulage minier",
        texte: "Un camion de roulage exploité à Kolwezi a coûté 1 200 000 USD : moteur 300 000, remplacé tous les 4 ans ; jeu de pneus 120 000, remplacé tous les 18 mois ; structure 780 000, durée d'utilité 12 ans, valeur résiduelle 60 000. Le mode linéaire est retenu.",
        tableau: {
          entetes: ['Composant', 'Base amortissable', 'Durée', 'Dotation annuelle'],
          lignes: [
            ['Moteur', '300 000', '4 ans', '75 000'],
            ['Pneus', '120 000', '1,5 an', '80 000'],
            ['Structure', '780 000 − 60 000 = 720 000', '12 ans', '60 000'],
            ['Total par composants', '', '', '215 000'],
            ['Pour comparaison : bien considéré comme un tout', '1 200 000 − 60 000', '12 ans', '95 000'],
            ['Pour comparaison : amortissement fiscal (arrêté 013/2025, gros engins)', '1 200 000', '10 ans (10 %)', '120 000'],
          ],
        },
        note: "L'approche globale sous-estimerait la dotation de 120 000 USD par an et ferait apparaître en charges d'entretien le remplacement du moteur et des pneus, qui constitue une consommation d'actif. L'écart entre l'amortissement comptable (215 000) et l'amortissement fiscal (120 000) est une différence temporelle, étudiée au chapitre 6 (IAS 12).",
      },
      { type: 'intertitre', texte: "2.5.2 Le choix du mode d'amortissement" },
      {
        type: 'paragraphe',
        texte: "La norme cite trois modes (§ 62). Le mode linéaire produit une charge constante lorsque la valeur résiduelle ne varie pas et convient à une consommation régulière. Le mode dégressif produit une charge décroissante et convient aux actifs dont l'essentiel des avantages est consommé au début de la période d'utilisation. Le mode des unités d'œuvre produit une charge « basée sur l'utilisation ou la production prévue de l'actif » ; il traduit souvent le mieux l'usure d'une usine de concentration ou d'un matériel minier lié au rythme d'extraction, et peut conduire à une dotation nulle en l'absence de production (§ 55). Un mode fondé sur les produits tirés de l'activité est en revanche exclu (§ 62A), car ces produits reflètent aussi les prix, les volumes vendus et l'inflation, qui ne mesurent pas la consommation de l'actif. L'argument prend un relief particulier dans une économie où les prix en francs congolais varient fortement.",
      },
      {
        type: 'paragraphe',
        texte: "Trois règles complètent le dispositif. Les terrains et les constructions sont des actifs distincts, même lorsqu'ils sont acquis ensemble ; le terrain n'est en principe pas amorti, sauf dans le cas des carrières et des sites d'enfouissement, et la part du coût de remise en état qui lui est incorporée est amortie sur la période des avantages procurés (§ 58-59). L'amortissement commence lorsque l'actif est prêt à être mis en service et ne cesse pas lorsque l'actif est temporairement inutilisé (§ 55). Enfin, un actif continue d'être amorti même si sa juste valeur excède sa valeur comptable, tant que sa valeur résiduelle n'excède pas cette valeur comptable (§ 52 et 54).",
      },
      {
        type: 'carte',
        titre: "Exemple 2.7 — Amortissement en unités d'œuvre et révision des estimations (avion ALPHA)",
        liste: [
          "Le 1er janvier N, une compagnie aérienne privée acquiert l'avion ALPHA pour 10 000 000 USD. Sa durée de vie physique est d'environ 20 ans, mais la compagnie revend habituellement ses avions après cinq à dix ans d'utilisation ; elle prévoit de conserver celui-ci cinq ans et de le revendre 8 000 000. La consommation des avantages est proportionnelle au kilométrage, estimé à 3 000 000 km sur cinq ans. Par hypothèse, l'avion n'est pas décomposé.",
          "La durée d'utilité retenue est de cinq ans, et non la durée de vie physique ; la valeur résiduelle est de 8 000 000 (IAS 16.6). Le montant amortissable s'élève à 2 000 000.",
          "Exercice N : 450 000 km parcourus. Amortissement : 2 000 000 × 450 000 / 3 000 000 = 300 000.",
          "Exercice N+1 : la compagnie révise ses hypothèses : conservation pendant sept ans, valeur résiduelle 6 500 000, kilométrage total 4 000 000 km ; 550 000 km sont parcourus. Le changement d'estimation est traité de manière prospective (§ 51 ; IAS 8) : le montant amortissable restant, 10 000 000 − 6 500 000 − 300 000 = 3 200 000, est réparti sur les kilomètres restant à parcourir, 4 000 000 − 450 000 = 3 550 000. Amortissement : 3 200 000 × 550 000 / 3 550 000, soit environ 495 775.",
        ],
        note: "L'amortissement de N n'est pas recalculé : la révision d'une estimation raisonnable produit ses effets pour l'avenir. L'exemple montre également pourquoi une entreprise qui revend ses actifs tôt n'amortit pas sur leur durée de vie physique, l'essentiel de la valeur étant récupéré lors de la revente.",
      },
    ],
  },
  {
    numero: '2.6',
    titre: "Évaluation postérieure : modèle du coût et modèle de la réévaluation",
    navLabel: 'Réévaluation',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Après sa comptabilisation initiale, une immobilisation corporelle est évaluée selon le modèle du coût ou selon le modèle de la réévaluation, le choix s'opérant par catégorie d'immobilisations (§ 29). Selon le modèle du coût, l'actif est comptabilisé à son coût diminué du cumul des amortissements et des pertes de valeur (§ 30). Selon le modèle de la réévaluation, il est comptabilisé à sa juste valeur à la date de réévaluation, diminuée des amortissements et pertes de valeur ultérieurs, les réévaluations devant être suffisamment régulières pour que la valeur comptable ne diffère pas significativement de la juste valeur à la clôture (§ 31). La fréquence dépend de la volatilité des justes valeurs : annuelle lorsque celles-ci varient fortement, tous les trois à cinq ans lorsqu'elles sont stables (§ 34). Le modèle de la réévaluation fait apparaître les plus-values latentes dans les capitaux propres, et non dans le résultat, parce que ces plus-values ne sont généralement pas réalisables sans remettre en cause l'activité.",
      },
      { type: 'intertitre', texte: "2.6.1 Conditions d'application du modèle" },
      {
        type: 'paragraphe',
        texte: "Le modèle obéit à quatre règles. La réévaluation porte sur l'ensemble de la catégorie à laquelle appartient l'actif (§ 36), la norme citant comme catégories distinctes les terrains, les terrains et constructions, les machines, les navires, les avions, les véhicules à moteur, le mobilier et les agencements, le matériel de bureau et les plantes productrices (§ 37). Les éléments d'une même catégorie sont réévalués simultanément, une réévaluation par roulement étant admise si elle est achevée dans un court délai (§ 38). La juste valeur est déterminée selon IFRS 13, et les notes indiquent notamment la date de la réévaluation, le recours ou non à un évaluateur indépendant et la valeur comptable qui aurait été obtenue selon le modèle du coût (§ 77). Enfin, les effets d'impôt de la réévaluation sont déterminés selon IAS 12 (§ 42).",
      },
      { type: 'intertitre', texte: "2.6.2 Techniques de réévaluation et traitement des écarts" },
      {
        type: 'paragraphe',
        texte: "À la date de réévaluation, l'actif peut être traité de deux manières (§ 35) : la valeur comptable brute est ajustée de manière cohérente avec la réévaluation de la valeur comptable, les amortissements cumulés étant ajustés en conséquence ; ou les amortissements cumulés sont éliminés contre la valeur comptable brute. Le traitement des écarts est asymétrique et s'apprécie actif par actif (§ 39-40). Une augmentation est comptabilisée en autres éléments du résultat global et cumulée en capitaux propres sous la rubrique écart de réévaluation, sauf si elle compense une diminution du même actif antérieurement comptabilisée en résultat net. Une diminution est comptabilisée en résultat net, sauf dans la limite de l'écart de réévaluation créditeur existant pour le même actif, qu'elle réduit. L'écart de réévaluation peut être transféré directement en résultats non distribués, soit lors de la décomptabilisation de l'actif, soit au fur et à mesure de son utilisation, pour un montant égal à la différence entre l'amortissement calculé sur la valeur réévaluée et l'amortissement calculé sur le coût initial ; ce transfert ne transite pas par le résultat net (§ 41).",
      },
      {
        type: 'carte',
        titre: "Exemple 2.8 — Réévaluation d'un immeuble de bureaux (en milliers de USD)",
        texte: "Un immeuble de bureaux situé à la Gombe a coûté 2 000 et est amorti sur 25 ans. Au bout de cinq ans, les amortissements cumulés s'élèvent à 400 et la valeur nette à 1 600. Un expert en estime la juste valeur à 2 400.",
        tableau: {
          entetes: ['', 'Méthode (a) : retraitement proportionnel', 'Méthode (b) : élimination'],
          lignes: [
            ['Coefficient', '2 400 / 1 600 = 1,5', '—'],
            ['Valeur brute après réévaluation', '2 000 × 1,5 = 3 000', '2 400'],
            ['Amortissements cumulés', '400 × 1,5 = 600', '0'],
            ['Valeur nette', '2 400', '2 400'],
            ['Écart de réévaluation', '800', '800'],
            ['Amortissement annuel ultérieur (20 ans)', '120', '120'],
          ],
        },
        note: "L'amortissement calculé sur la valeur réévaluée (120) excède l'amortissement historique (80) de 40 par an ; l'entité peut transférer chaque année ces 40 de l'écart de réévaluation aux résultats non distribués (§ 41), de sorte qu'au bout de trois ans l'écart s'établit à 680. Si la juste valeur tombait à 1 700 à la fin de la troisième année, pour une valeur comptable de 2 040, la diminution de 340 serait intégralement imputée sur l'écart ; si elle tombait à 1 200, la diminution de 840 serait imputée à hauteur de 680 sur l'écart, qui serait soldé, et de 160 en résultat net.",
      },
      {
        type: 'carte',
        titre: "Exemple 2.9 — Réévaluations successives d'un composant",
        texte: "Un composant acquis le 2 janvier N pour 100 000 USD HT, amorti linéairement sur 20 ans, appartient à une catégorie évaluée selon le modèle de la réévaluation. Justes valeurs : 95 500 fin N ; 108 000 fin N+1 ; 93 500 fin N+2 ; 72 000 fin N+3.",
        tableau: {
          entetes: ['Clôture', 'Amortissement', 'Valeur comptable avant réévaluation', 'Juste valeur', 'Traitement'],
          lignes: [
            ['N', '100 000 / 20 = 5 000', '95 000', '95 500', "Écart non significatif : pas de réévaluation (§ 34)"],
            ['N+1', '5 000', '90 000', '108 000', "Réévaluation de 18 000 en autres éléments du résultat global (§ 39)"],
            ['N+2', '108 000 / 18 = 6 000', '102 000', '93 500', "Diminution de 8 500 imputée sur l'écart de réévaluation, ramené à 9 500 (§ 40)"],
            ['N+3', '93 500 / 17 = 5 500', '88 000', '72 000', "Diminution de 16 000 : 9 500 imputés sur l'écart, qui est soldé, et 6 500 en charges (§ 40)"],
          ],
        },
        note: "En N+1, selon la méthode (a), la valeur brute et les amortissements sont majorés de 20 % (108 000 / 90 000), la valeur brute passant à 120 000 et les amortissements à 12 000 ; selon la méthode (b), les amortissements cumulés de 10 000 sont éliminés contre la valeur brute, puis la valeur nette est portée à 108 000. L'écart de réévaluation s'élève à 18 000 dans les deux cas.",
      },
      {
        type: 'filet',
        titre: "Rapprochement avec le SYSCOHADA révisé et le droit congolais",
        texte: "IAS 16 réévalue par catégorie, à la juste valeur et de manière périodique, et l'écart peut être transféré aux résultats non distribués. L'AUDCIF (art. 62 à 65) exige que la réévaluation porte sur l'ensemble des immobilisations corporelles et financières, interdit toute réévaluation partielle, plafonne la valeur réévaluée à la valeur actuelle, calcule les amortissements ultérieurs sur la valeur réévaluée et déclare l'écart non distribuable, seulement incorporable au capital. En RDC, l'ordonnance-loi n° 89-017 du 18 février 1989 organisait une réévaluation légale par coefficients, obligatoire hors régime forfaitaire (art. 2). Elle a été abrogée par la loi n° 23/053 du 30 novembre 2023 (art. 152), entrée en vigueur au 1er janvier 2026. Désormais, la réévaluation « est libre » et s'effectue conformément aux articles 62 à 65 de l'AUDCIF ; elle peut être légale lorsque la situation économique le justifie, un arrêté fixant alors les coefficients (art. 129). Elle reste globale (art. 130), l'écart est sans influence sur le résultat comptable et fiscal (art. 132), et l'article 133 neutralise le supplément d'amortissement par une réintégration annuelle dans les bénéfices comptable et fiscal. Selon IAS 16, ce supplément constitue une charge du résultat, et seul le transfert prévu au § 41 intervient, directement en capitaux propres.",
      },
    ],
  },
  {
    numero: '2.7',
    titre: "Décomptabilisation et informations à fournir",
    navLabel: 'Sorties',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Une immobilisation corporelle est décomptabilisée lors de sa sortie ou lorsqu'aucun avantage économique futur n'est attendu de son utilisation ou de sa sortie (§ 67). Le profit ou la perte, égal à la différence entre le produit net de la sortie et la valeur comptable de l'actif (§ 71), est comptabilisé en résultat net ; les profits ne sont pas classés en produits des activités ordinaires (§ 68). Par exception, l'entité qui vend habituellement des biens qu'elle a donnés en location les transfère en stocks à la fin de la location, et leur vente relève alors d'IFRS 15 (§ 68A). La date de sortie est celle du transfert du contrôle au sens d'IFRS 15 (§ 69), et la contrepartie est évaluée selon les dispositions de cette norme relatives au prix de transaction (§ 72).",
      },
      {
        type: 'paragraphe',
        texte: "La perte d'un actif et son indemnisation constituent des événements distincts. Lorsqu'un entrepôt est détruit par un incendie, que l'assureur accepte d'indemniser le sinistre et que l'entreprise reconstruit, IAS 16.66 impose de traiter séparément la perte de l'actif, par dépréciation selon IAS 36 ou par décomptabilisation selon IAS 16, l'indemnité, comptabilisée en résultat net « lorsqu'elle devient exigible » (§ 65), et le coût du nouvel entrepôt, déterminé selon IAS 16. La perte n'est pas compensée par l'indemnité attendue, et celle-ci n'est pas comptabilisée tant qu'elle n'est pas exigible.",
      },
      {
        type: 'carte',
        titre: "Tableau 2.2 — Informations à fournir (IAS 16, § 73-79)",
        tableau: {
          entetes: ['Rubrique', 'Contenu'],
          lignes: [
            ['Par catégorie', "Bases d'évaluation de la valeur brute ; modes et durées ou taux d'amortissement ; valeur brute et cumul des amortissements à l'ouverture et à la clôture ; rapprochement des valeurs comptables (entrées, sorties, regroupements, réévaluations, pertes de valeur et reprises, amortissements, écarts de conversion)"],
            ['Engagements et restrictions (§ 74)', "Actifs donnés en garantie, dépenses relatives aux immobilisations en cours, engagements d'acquisition"],
            ['Estimations (§ 76)', "Nature et effet des changements de valeur résiduelle, de coût de démantèlement, de durée d'utilité et de mode d'amortissement"],
            ['Informations encouragées (§ 79)', "Actifs temporairement inutilisés, actifs entièrement amortis encore en service, juste valeur des actifs évalués au coût lorsqu'elle en diffère significativement"],
          ],
        },
      },
    ],
  },
  {
    numero: '2.8',
    titre: "Les immobilisations incorporelles : définition et comptabilisation initiale",
    navLabel: 'IAS 38 : définition',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Une immobilisation incorporelle est « un actif non monétaire identifiable sans substance physique » (IAS 38.8). Logiciels, licences, brevets, droits de reproduction, franchises et quotas en constituent les exemples usuels. La définition repose sur trois conditions : l'identifiabilité, le contrôle et l'existence d'avantages économiques futurs. Lorsqu'une de ces conditions fait défaut, la dépense est comptabilisée en charges ou, si l'élément est acquis dans un regroupement d'entreprises, elle fait partie du goodwill (§ 10). Une part importante des ressources immatérielles qui créent de la valeur dans l'économie contemporaine ne peut, pour cette raison, figurer au bilan.",
      },
      { type: 'intertitre', texte: "2.8.1 Les conditions de la définition" },
      {
        type: 'paragraphe',
        texte: "Un actif est identifiable s'il est séparable, c'est-à-dire susceptible d'être vendu, cédé, concédé par licence, loué ou échangé, isolément ou avec un élément lié, ou s'il résulte de droits contractuels ou d'autres droits établis, que ces droits soient ou non cessibles (§ 12). Cette condition distingue l'immobilisation incorporelle du goodwill. L'entité contrôle un actif lorsqu'elle a le pouvoir d'obtenir les avantages économiques futurs de la ressource et de restreindre l'accès des tiers à ces avantages, ce qui résulte normalement de droits dont elle peut obtenir l'exécution en justice (§ 13). Une équipe de personnel qualifié ou une clientèle fidèle ne sont donc généralement pas contrôlées ; toutefois, des transactions d'échange portant sur des relations clients non contractuelles, hors regroupement, démontrent que l'entité en contrôle les avantages (§ 16). Les avantages économiques futurs peuvent consister en produits de ventes ou en économies de coûts (§ 17).",
      },
      { type: 'intertitre', texte: "2.8.2 Les modes d'entrée et leur évaluation" },
      {
        type: 'carte',
        titre: "Tableau 2.3 — Comptabilisation initiale selon le mode d'entrée",
        tableau: {
          entetes: ["Mode d'entrée", 'Probabilité des avantages (§ 21(a))', 'Évaluation initiale'],
          lignes: [
            ['Acquisition séparée (§ 25-32)', 'Toujours réputée satisfaite', 'Coût : prix, droits et taxes non remboursables, coûts directement attribuables'],
            ["Regroupement d'entreprises (§ 33-37)", 'Toujours réputée satisfaite', "Juste valeur à la date d'acquisition (IFRS 3), y compris un projet de recherche et développement en cours"],
            ['Subvention publique (§ 44)', '—', 'Juste valeur, ou valeur symbolique majorée des coûts directement attribuables (IAS 20)'],
            ["Échange d'actifs (§ 45-47)", '—', "Juste valeur, sauf absence de substance commerciale ou impossibilité d'une évaluation fiable"],
            ['Génération interne (§ 51-67)', 'À démontrer selon les six critères du § 57', 'Dépenses engagées à compter de la date à laquelle les critères sont remplis'],
          ],
        },
        note: "Illustration d'un échange : une société cède une licence informatique d'une valeur comptable de 100 000 contre un droit de diffusion d'une juste valeur de 60 000 et une soulte de 40 000. Le droit reçu est comptabilisé à sa juste valeur, 60 000, sauf absence de substance commerciale ou impossibilité d'évaluer les justes valeurs de manière fiable (§ 45).",
      },
      { type: 'intertitre', texte: "2.8.3 Les immobilisations générées en interne" },
      {
        type: 'paragraphe',
        texte: "La génération interne soulève les difficultés les plus importantes. La norme impose de distinguer une phase de recherche et une phase de développement (§ 52), et de traiter l'ensemble des dépenses comme relevant de la recherche lorsque cette distinction n'est pas possible (§ 53). Les dépenses de recherche sont toujours comptabilisées en charges, l'existence d'avantages économiques futurs ne pouvant être démontrée (§ 54). Une immobilisation incorporelle résultant du développement « doit être comptabilisée si, et seulement si, une entité peut démontrer tout ce qui suit » (§ 57) : la faisabilité technique de l'achèvement de l'actif ; l'intention de l'achever et de l'utiliser ou de le vendre ; la capacité à l'utiliser ou à le vendre ; la façon dont il générera des avantages économiques futurs probables, par l'existence d'un marché ou, en cas d'utilisation interne, par son utilité ; la disponibilité des ressources techniques, financières et autres nécessaires, qui peut être démontrée par un plan d'activité ou par l'accord d'un prêteur (§ 61) ; la capacité à évaluer de façon fiable les dépenses attribuables à l'actif au cours de son développement. Le coût de l'actif comprend les dépenses engagées à compter de la date à laquelle ces critères sont remplis pour la première fois (§ 65), incluant les coûts directement attribuables tels que les honoraires d'enregistrement d'un droit établi (§ 66).",
      },
      {
        type: 'carte',
        titre: "Exemple 2.10 — Coût d'un brevet généré en interne (laboratoire MI SA)",
        texte: "Le laboratoire pharmaceutique MI engage le 1er janvier N le projet A, destiné à produire en interne le brevet d'un médicament contre le rhume, prêt à la fin de N. Entre le 1er janvier et le 1er avril N−1, des frais de recherche de 30 000 USD, non affectés à un projet précis, ont conduit à la découverte d'une molécule utilisée dans le projet A. Dépenses de N : recherche 50 000 ; développement 192 000, dont 157 000 engagés à compter du 15 septembre, date à laquelle les critères du § 57 sont remplis ; obtention de l'agrément de commercialisation 16 000. Le brevet est utilisé à compter du 1er janvier N+1, pendant trois ans, selon le mode linéaire.",
        tableau: {
          entetes: ['Dépense', 'Traitement', 'Fondement'],
          lignes: [
            ['Recherche de N−1 (30 000)', "Charge de N−1, sans réincorporation possible", 'IAS 38.54 et 71'],
            ['Recherche de N (50 000)', 'Charge', 'IAS 38.54'],
            ['Développement antérieur au 15 septembre (35 000)', 'Charge', 'IAS 38.65'],
            ['Développement à compter du 15 septembre (157 000)', 'Immobilisation', 'IAS 38.57 et 65'],
            ["Agrément de commercialisation (16 000)", 'Immobilisation (coût directement attribuable)', 'IAS 38.66'],
            ['Coût du brevet', '157 000 + 16 000 = 173 000', ''],
            ['Amortissement annuel à compter de N+1', '173 000 / 3, soit environ 57 667', 'IAS 38.97'],
          ],
        },
        note: "Sur le plan fiscal, l'arrêté n° 013/2025 amortit les brevets, licences et logiciels sur cinq ans (20 %), soit 34 600 par an. L'écart annuel d'environ 23 067 avec l'amortissement comptable constitue une différence temporelle (chapitre 6).",
      },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 38, § 48, 63, 64 et 71",
        texte: "« Le goodwill généré en interne ne doit pas être comptabilisé en tant qu'actif. » (§ 48). « Lorsqu'ils sont générés en interne, les marques, cartouches de titre, titres de publication, listes de clients et autres éléments similaires en substance ne doivent pas être comptabilisés en tant qu'immobilisations incorporelles. » (§ 63), leurs dépenses « ne peuvent pas être distinguées du coût de développement de l'entreprise dans son ensemble » (§ 64). « Les dépenses relatives à un élément incorporel qui ont été initialement comptabilisées en charges ne doivent pas être incorporées dans le coût d'une immobilisation incorporelle à une date ultérieure. » (§ 71).",
      },
      {
        type: 'paragraphe',
        texte: "Les coûts de démarrage, de formation, de publicité et de promotion, ainsi que les coûts de relocalisation ou de réorganisation, sont également comptabilisés en charges (§ 69). Le SYSCOHADA révisé retient les six critères d'activation des frais de développement et la même interdiction de réincorporation (Titre VIII, ch. 1), et dédie le compte 211 aux frais de développement.",
      },
    ],
  },
  {
    numero: '2.9',
    titre: "Les immobilisations incorporelles : évaluation postérieure et amortissement",
    navLabel: 'IAS 38 : évaluation',
    blocs: [
      { type: 'intertitre', texte: "2.9.1 Modèle du coût et modèle de la réévaluation" },
      {
        type: 'paragraphe',
        texte: "L'entité choisit entre le modèle du coût et le modèle de la réévaluation, le second s'appliquant alors à tous les actifs de la même catégorie, sauf absence de marché actif pour ces actifs (§ 72). La réévaluation d'une immobilisation incorporelle exige une juste valeur déterminée par référence à un marché actif (§ 75). Une telle situation est exceptionnelle : la norme cite les licences de taxi, les licences de pêche et les quotas de production librement cessibles, et exclut les marques, les titres de journaux, les droits d'édition et les brevets, chacun de ces actifs étant unique (§ 78). La très grande majorité des immobilisations incorporelles est donc évaluée au coût.",
      },
      { type: 'intertitre', texte: "2.9.2 Durée d'utilité déterminée ou indéterminée" },
      {
        type: 'paragraphe',
        texte: "La durée d'utilité est déterminée ou indéterminée (§ 88). Elle est indéterminée lorsque, sur la base d'une analyse de tous les facteurs pertinents, il n'existe pas de limite prévisible à la période au cours de laquelle l'actif générera des entrées nettes de trésorerie. Le § 90 énumère ces facteurs : utilisation attendue, cycles de vie des produits, obsolescence, stabilité du secteur, actions des concurrents, niveau des dépenses de maintenance, durée du contrôle et limites juridiques, dépendance à l'égard d'autres actifs. La norme précise que « le terme « indéterminé » ne signifie pas « infini » » (§ 91). Une immobilisation à durée d'utilité déterminée est amortie ; une immobilisation à durée d'utilité indéterminée ne l'est pas (§ 107), mais elle fait l'objet d'un test de dépréciation annuel et à chaque indice de perte de valeur (§ 108), et sa durée d'utilité est réexaminée à chaque période (§ 109).",
      },
      {
        type: 'paragraphe',
        texte: "La durée d'utilité d'un actif issu de droits contractuels ou légaux ne peut excéder la période de ces droits, mais peut être plus courte (§ 94). Les périodes de renouvellement ne sont prises en compte que si des éléments probants établissent que le renouvellement sera obtenu sans coût important : expérience passée, conditions nécessaires remplies, coût du renouvellement faible au regard des avantages attendus (§ 96). Un renouvellement coûteux s'analyse en l'acquisition d'un nouvel actif. La valeur résiduelle d'une immobilisation incorporelle est réputée nulle, sauf engagement d'un tiers de racheter l'actif ou existence probable d'un marché actif à la fin de sa durée d'utilité (§ 100).",
      },
      { type: 'intertitre', texte: "2.9.3 Le mode d'amortissement" },
      {
        type: 'paragraphe',
        texte: "Le mode d'amortissement reflète le rythme de consommation des avantages, le mode linéaire étant retenu lorsque ce rythme ne peut être déterminé de façon fiable (§ 97). Un mode fondé sur les produits est présumé inapproprié, mais la présomption est réfutable dans deux cas : lorsque l'immobilisation est exprimée selon une mesure des produits, ou lorsqu'il est démontré que les produits et la consommation des avantages sont fortement corrélés (§ 98A). Le § 98C donne deux illustrations du premier cas : une concession aurifère dont le contrat autorise l'extraction jusqu'à ce que le cumul des produits de la vente de l'or atteigne un montant déterminé, et le droit d'exploiter une autoroute à péage jusqu'à un montant total déterminé de produits. L'identification du facteur limitatif prédominant, qu'il s'agisse du temps, d'un nombre d'unités ou d'un montant de produits, constitue le point de départ de l'analyse (§ 98B).",
      },
      {
        type: 'filet',
        titre: "Observation — Activation et dépréciation (IAS 38, exemple illustrant le § 65)",
        texte: "En 20X5, une entité engage 1 000 de dépenses pour développer un procédé, dont 900 avant le 1er décembre, date à laquelle les critères sont remplis, et 100 ensuite. L'immobilisation est comptabilisée pour 100 à la fin de 20X5, les 900 demeurant définitivement en charges. En 20X6, l'entité engage 2 000 supplémentaires : le coût atteint 2 100, alors que la valeur recouvrable est estimée à 1 900. Une perte de valeur de 200 est comptabilisée selon IAS 36. L'activation d'une dépense ne garantit pas sa recouvrabilité, qui demeure soumise au test de dépréciation.",
      },
    ],
  },
  {
    numero: '2.10',
    titre: "Les activités minières : IFRS 6, IAS 16 et IFRIC 20",
    navLabel: 'Activités minières',
    blocs: [
      { type: 'intertitre', texte: "2.10.1 Prospection, évaluation et développement" },
      {
        type: 'paragraphe',
        texte: "Le cycle de vie d'une mine relève successivement de plusieurs textes. La prospection et l'évaluation, qui se situent entre l'obtention des droits de prospecter et la démonstration de la faisabilité technique et de la viabilité commerciale de l'extraction, relèvent d'IFRS 6 : l'entité définit la méthode de capitalisation des dépenses (§ 9), bénéficie d'une exemption temporaire des § 11 et 12 d'IAS 8 (§ 7) et classe ses actifs en immobilisations corporelles ou incorporelles selon leur nature (§ 15). La norme précise que « les dépenses liées au développement des ressources minérales ne doivent pas être comptabilisées en tant qu'actifs de prospection et d'évaluation », le Cadre conceptuel et IAS 38 guidant leur comptabilisation (§ 10) ; les équipements relèvent d'IAS 16. La transition est fixée par le § 17 : un actif de prospection et d'évaluation « ne doit plus être classé comme tel lorsque la faisabilité technique et la viabilité commerciale de l'extraction d'une ressource minérale sont démontrables », et la perte de valeur éventuelle est comptabilisée « avant le reclassement ».",
      },
      { type: 'intertitre', texte: "2.10.2 Les frais de découverture en phase de production" },
      {
        type: 'paragraphe',
        texte: "Pour accéder au minerai, une mine à ciel ouvert enlève des stériles : cette activité est dite de découverture. En phase de production, elle peut procurer deux avantages, du minerai utilisable pour produire des stocks de la période et un meilleur accès à des quantités qui seront extraites ultérieurement (IFRIC 20, § 4). L'interprétation impose de distinguer ces deux avantages (§ 8). La part qui produit des stocks relève d'IAS 2. La part qui améliore l'accès au gisement est comptabilisée comme un actif lié à l'activité de découverture si trois conditions sont réunies : les avantages sont probables, la composante du gisement dont l'accès est amélioré est identifiée, et les coûts peuvent être évalués de façon fiable (§ 9). Cet actif est comptabilisé comme une partie d'un actif existant, dont il prend la nature (§ 10-11), et il est amorti sur la durée d'utilité de la composante qu'il rend accessible, selon le mode des unités de production sauf si une autre méthode est plus appropriée (§ 15).",
      },
      {
        type: 'carte',
        titre: "Exemple 2.11 — Répartition du coût de découverture (IFRIC 20, § 13)",
        texte: "Mine de cuivre à ciel ouvert, composante A du gisement. Le ratio stériles/minerai attendu pour la composante est de 3 pour 1. Au cours de l'exercice N, 400 000 t de minerai sont extraites et 2 000 000 t de stériles enlevées, soit un ratio réel de 5 pour 1. Le coût total de découverture s'élève à 10 000 000 USD, soit 5 USD par tonne de stériles.",
        tableau: {
          entetes: ['Étape', 'Calcul', 'Montant'],
          lignes: [
            ['Stériles attendus pour la production de N', '400 000 × 3', '1 200 000 t'],
            ["Stériles excédentaires améliorant l'accès", '2 000 000 − 1 200 000', '800 000 t'],
            ['Coût affecté aux stocks (IAS 2)', '1 200 000 × 5', '6 000 000 USD'],
            ['Actif lié à la découverture (IFRIC 20)', '800 000 × 5', '4 000 000 USD'],
            ['Amortissement de N+1, pour une composante de 2 000 000 t dont 500 000 t sont extraites', '4 000 000 × 500 000 / 2 000 000', '1 000 000 USD'],
          ],
        },
        note: "La mesure retenue compare le volume de stériles extrait au volume attendu pour la production réalisée (§ 13(b)). L'interprétation admet aussi la comparaison du coût des stocks produits au coût attendu (§ 13(a)) ou de la teneur du minerai extrait à la teneur attendue (§ 13(c)).",
      },
      {
        type: 'paragraphe',
        texte: "En l'absence d'IFRIC 20, deux pratiques divergentes étaient possibles : comptabiliser la totalité des coûts en charges, ce qui pénalise la période au cours de laquelle l'accès à des volumes futurs est ouvert, ou les activer en totalité, ce qui porte au bilan des coûts ayant déjà contribué à produire du minerai vendu. L'interprétation retient une clé de répartition physique, vérifiable par le géologue comme par l'auditeur. Le SYSCOHADA révisé consacre de son côté un chapitre aux frais de prospection et d'exploitation des ressources minérales (Titre VIII, ch. 3), dont la lecture s'impose aux entités qui établissent les deux jeux d'états.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ue13c2-cp1',
    titre: "Coût d'entrée et amortissement de trois équipements industriels",
    contexte: "Le 1er janvier N, une société industrielle de Lubumbashi met en service trois machines de production (montants en milliers de USD) : la machine A, payée comptant 100 ; la machine B, facturée 121 et payable dans deux ans, fin N+1, au-delà des conditions habituelles de crédit ; la machine C, prise en location pour quatre ans, la valeur actualisée des loyers étant de 50. S'y ajoutent : l'aménagement du site de réception des machines (dalle de béton, lignes électriques), 2 ; les honoraires du service des mines pour l'homologation de la machine A, 3 ; la livraison de consommables pour les machines, 12. Durée d'utilisation : 4 ans, sans valeur résiduelle. Taux d'actualisation : 10 %.",
    questions: [
      {
        num: 1,
        enonce: "Quel montant total immobiliser au 1er janvier N en IFRS ?",
        correction: "Machine A : 100. Machine B : le paiement différé au-delà des conditions habituelles de crédit est actualisé (IAS 16.23) : 121 / 1,10² = **100**. Machine C : droit d'utilisation, IFRS 16 imposant au preneur de comptabiliser « un actif au titre du droit d'utilisation et une obligation locative » (IFRS 16.22) : 50. Coûts annexes : les frais de préparation du site (2) et les honoraires de professionnels (3) sont des coûts directement attribuables (IAS 16.17(b) et (f)) ; les consommables (12) ne le sont pas : ils sont des charges, ou des stocks s'ils ne sont pas encore consommés. Total : 100 + 100 + 50 + 2 + 3 = **255**.",
      },
      {
        num: 2,
        enonce: "Comment traiter la différence entre les 121 facturés et les 100 immobilisés pour la machine B ?",
        correction: "La différence relève du financement : si le règlement est différé au-delà des conditions habituelles de crédit, « la différence entre le prix comptant équivalent et le total des paiements est comptabilisée en charges financières sur la période de crédit, à moins que ces charges ne soient incorporées dans le coût de l'actif selon IAS 23 » (IAS 16.23). La dette fournisseur d'immobilisation s'accroît de 100 × 10 % = 10 en N, puis de 110 × 10 % = 11 en N+1, soit 121 au paiement. Écritures de N : débit Charges financières 10 par le crédit du Fournisseur d'immobilisation.",
      },
      {
        num: 3,
        enonce: "Quel amortissement annuel ?",
        correction: "Base amortissable : 255, sur 4 ans en linéaire, soit **63,75** par an, dont 12,5 pour le droit d'utilisation de la machine C (50 / 4, la durée du contrat coïncidant ici avec la durée d'utilisation). Si les 2 de préparation du site servent aux trois machines, ils se répartissent entre elles ; la charge totale ne change pas, puisque les trois ont la même durée.",
      },
      {
        num: 4,
        enonce: "La machine C serait-elle aussi inscrite à l'actif dans les comptes SYSCOHADA de la société ?",
        correction: "Cela dépend du contrat. Le SYSCOHADA révisé comptabilise chez le preneur le contrat de location acquisition, c'est-à-dire le crédit-bail, la location-vente ou la location assortie d'une option d'achat que le preneur est raisonnablement certain de lever, « comme une acquisition d'immobilisation financée par un emprunt » (Titre VIII, ch. 8, § 1.5.1 et 2.1.1). Une location sans option d'achat est une location simple, dont les loyers restent des charges (§ 1.5.2). IFRS 16 va plus loin : le preneur inscrit un droit d'utilisation pour tous ses contrats de location, sauf s'il choisit d'exempter ceux de courte durée ou portant sur des biens de faible valeur (IFRS 16.5 et 22).",
      },
    ],
  },
  {
    id: 'ue13c2-cp2',
    titre: "Détermination du coût d'une ligne de production de ciment",
    contexte: "MBANZA CIMENT SA (société fictive) met en service, au 1er janvier N+1, une ligne de cuisson construite en N. Dépenses (en USD) : prix du four et des équipements 18 000 000 ; droits de douane 900 000 ; TVA à l'importation, récupérable, 2 880 000 ; transport et assurance jusqu'au site 450 000 ; génie civil, installation et montage 1 300 000 ; tests de bon fonctionnement 220 000 ; les échantillons de ciment produits pendant les tests, qui ont coûté 60 000 à produire, ont été vendus 80 000 ; formation des opérateurs 150 000 ; campagne publicitaire annonçant la nouvelle capacité 90 000 ; quote-part de frais de siège 200 000. Le permis environnemental impose de démanteler l'installation et de remettre le site en état au terme de 25 ans, pour un coût estimé à 3 000 000 ; taux d'actualisation 10 %. Les coûts d'emprunt incorporables calculés selon IAS 23 s'élèvent à 412 500 (voir section 2.3).",
    questions: [
      {
        num: 1,
        enonce: "Déterminez le coût d'entrée de la ligne selon IAS 16 et IAS 23.",
        correction: "Éléments retenus : prix 18 000 000 (§ 16(a)) ; droits de douane 900 000 (§ 16(a)) ; transport et assurance 450 000 (§ 17(c)) ; génie civil et montage 1 300 000 (§ 17(b) et (d)) ; tests 220 000 (§ 17(e)) ; démantèlement actualisé 3 000 000 × 1,10⁻²⁵ ≈ 276 888 (§ 16(c)) ; coûts d'emprunt 412 500 (IAS 23.8). Total : **21 559 388 USD**. Exclus : la TVA récupérable (seules les taxes non remboursables entrent au coût) ; la formation (§ 19(c)) ; la publicité (§ 19(b)) ; les frais de siège (§ 19(d)).",
      },
      {
        num: 2,
        enonce: "Comment traiter la vente des échantillons produits pendant les tests ?",
        correction: "Selon le § 20A, le produit de la vente (80 000) et le coût de ces éléments (60 000, évalué selon IAS 2) sont comptabilisés en résultat net. On ne déduit plus le produit net du coût de la ligne, comme on le faisait avant la modification de la norme. Le § 74A(b) impose d'indiquer ces montants et les postes du résultat qui les incluent, s'ils ne sont pas présentés séparément.",
      },
      {
        num: 3,
        enonce: "La ligne comprend un revêtement réfractaire (1 500 000 USD, remplacé tous les 3 ans) et une structure (le reste, 25 ans, sans valeur résiduelle). Calculez la dotation N+1 selon l'approche par composants, en affectant le coût de démantèlement et les coûts d'emprunt à la structure.",
        correction: "Revêtement : 1 500 000 / 3 = 500 000. Structure : 21 559 388 − 1 500 000 = 20 059 388, sur 25 ans : 802 376. Dotation N+1 : **1 302 376 USD**. S'y ajoute la désactualisation de la provision, 276 888 × 10 % ≈ 27 689, en charges financières (IFRIC 1.8). Le SYSCOHADA révisé autorise, à titre de simplification, à affecter les frais accessoires et coûts d'emprunt au prorata de la valeur de chaque élément ; IAS 16 ne l'interdit pas si l'effet est non significatif, mais l'affectation directe est préférable quand elle est possible.",
      },
      {
        num: 4,
        enonce: "Dans trois ans, le revêtement est remplacé pour 1 650 000 USD. Passez l'analyse.",
        correction: "Le coût du nouveau revêtement est immobilisé, puisque les critères sont remplis (§ 13), et la valeur comptable de l'ancien est décomptabilisée (§ 70). L'ancien revêtement, amorti sur 3 ans, est entièrement amorti : sa sortie n'a pas d'effet sur le résultat. S'il avait été remplacé plus tôt, sa valeur nette résiduelle serait passée en perte de décomptabilisation (§ 71). Le nouveau revêtement est amorti sur 3 ans, soit 550 000 par an.",
      },
    ],
  },
  {
    id: 'ue13c2-cp3',
    titre: "Exploitation à ciel ouvert : frais de découverture, démantèlement et régime fiscal minier",
    contexte: "LUILU COPPER SA (société fictive) exploite une mine de cuivre à ciel ouvert dans le Lualaba. Exercice N+1, composante B du gisement : ratio stériles/minerai attendu 4 pour 1 ; 300 000 t de minerai extraites ; 1 800 000 t de stériles enlevées ; coût de découverture 12 600 000 USD. La composante B contient 1 500 000 t de minerai. Par ailleurs, la provision pour remise en état du site (valeur actualisée) est ramenée de 7 000 000 à 6 100 000 USD après un nouveau plan de fermeture approuvé ; la valeur comptable de l'usine de concentration à laquelle elle se rattache est de 45 000 000 USD, au modèle du coût. La direction fiscale propose de « faire coïncider » la provision comptable avec la provision de l'article 258 du Code minier, soit 0,5 % du chiffre d'affaires de 180 000 000 USD.",
    questions: [
      {
        num: 1,
        enonce: "Répartissez le coût de découverture de N+1 entre stocks et actif de découverture.",
        correction: "Coût unitaire : 12 600 000 / 1 800 000 = 7 USD par tonne de stériles. Stériles attendus : 300 000 × 4 = 1 200 000 t, soit 8 400 000 USD affectés aux stocks (IAS 2, IFRIC 20.8). Stériles excédentaires : 600 000 t, soit **4 200 000 USD** d'actif de découverture, si les critères du § 9 sont remplis : l'avantage d'accès est probable, la composante B est identifiée, et le coût est mesuré de façon fiable.",
      },
      {
        num: 2,
        enonce: "Quel est l'amortissement de cet actif en N+2, si 450 000 t de minerai de la composante B sont extraites ?",
        correction: "IFRIC 20.15 : amortissement sur la durée d'utilité de la composante rendue accessible, par unités de production sauf méthode plus appropriée. 4 200 000 × 450 000 / 1 500 000 = **1 260 000 USD**. Cette durée est propre à la composante B et diffère de celle de la mine dans son ensemble (§ 16). Si les réserves de B sont révisées, c'est un changement d'estimation, traité prospectivement (IAS 8).",
      },
      {
        num: 3,
        enonce: "Comment comptabiliser la baisse de la provision de remise en état ?",
        correction: "Au modèle du coût, IFRIC 1.5(a) : la diminution de 900 000 est déduite du coût de l'actif auquel elle se rattache, dans la limite de sa valeur comptable (§ 5(b)). Ici, 900 000 est très inférieur à 45 000 000 : écriture au débit de la provision et au crédit de l'usine pour 900 000, sans effet immédiat sur le résultat, puis amortissement du montant ajusté sur la durée restante (§ 7). Si l'usine était entièrement amortie, la totalité de la baisse irait en résultat (§ 7), tout comme l'excédent si elle dépassait la valeur comptable (§ 5(b)). Le SYSCOHADA révisé ferait passer cette baisse par une dépréciation, imputée d'abord sur l'actif de démantèlement.",
      },
      {
        num: 4,
        enonce: "Que répondez-vous à la direction fiscale ?",
        correction: "Que les deux montants mesurent des choses différentes et ne peuvent pas être alignés. La provision comptable est l'obligation actualisée de remise en état au sens d'IAS 37, soit 6 100 000 USD, quel que soit le chiffre d'affaires. La provision de l'article 258 est un avantage fiscal : 0,5 % × 180 000 000 = 900 000 USD au plus par exercice, constituée en franchise d'impôt, à utiliser dans les dix ans sous peine de réintégration. Aligner la provision comptable sur ce plafond sous-évaluerait le passif, et la déclaration de conformité aux IFRS deviendrait impossible (IAS 1.16). L'écart entre valeurs comptables et bases fiscales relève des impôts différés (IAS 12, chapitre 6). La sûreté de l'article 204 est encore une autre chose : une garantie, pas une provision.",
      },
    ],
  },
  {
    id: 'ue13c2-cp4',
    titre: "Analyse critique d'affirmations relatives aux immobilisations",
    contexte: "Un comité d'audit examine le projet d'états IFRS d'une société congolaise. Pour chaque affirmation relevée dans le procès-verbal, dites si elle est vraie ou fausse, et justifiez.",
    questions: [
      {
        num: 1,
        enonce: "« Nous avons réévalué l'immeuble du siège, dont la valeur a doublé, mais gardé au coût les entrepôts de province, qui ont perdu de la valeur. »",
        correction: "Faux. Si un actif est réévalué, toute la catégorie à laquelle il appartient doit l'être (IAS 16.36), et simultanément (§ 38). La norme veut justement empêcher cette réévaluation sélective.",
      },
      {
        num: 2,
        enonce: "« Le terrain acquis 500 000 USD avec l'usine est amorti avec elle sur 25 ans. »",
        correction: "Faux. Terrains et constructions sont des actifs distincts, même acquis ensemble ; les terrains ont en principe une durée d'utilité illimitée et ne sont pas amortis (IAS 16.58), sauf exceptions comme les carrières et les décharges.",
      },
      {
        num: 3,
        enonce: "« Les frais de formation des opérateurs de la nouvelle ligne font partie de son coût, puisqu'elle ne tournerait pas sans eux. »",
        correction: "Faux. IAS 16.19(c) exclut expressément les coûts d'exploitation d'une activité dans un nouveau lieu ou avec une nouvelle catégorie de clients, y compris les coûts de formation du personnel. IAS 38.67(c) les exclut aussi du coût des incorporelles.",
      },
      {
        num: 4,
        enonce: "« Notre marque, créée il y a vingt ans et reconnue dans tout le pays, doit être inscrite à l'actif à sa juste valeur. »",
        correction: "Faux. Une marque générée en interne ne peut pas être comptabilisée en immobilisation incorporelle (IAS 38.63). Le modèle de la réévaluation ne permet pas davantage de faire entrer au bilan une incorporelle qui n'y a jamais été comptabilisée (IAS 38.76(a)). Seule une marque acquise, séparément ou dans un regroupement, entre au bilan.",
      },
      {
        num: 5,
        enonce: "« Nous amortissons la licence de télécommunications au prorata du chiffre d'affaires qu'elle génère, c'est plus juste. »",
        correction: "Faux en principe. Un mode fondé sur les produits est présumé inapproprié (IAS 38.98A). La présomption ne tombe que si la licence est exprimée selon une mesure des produits, par exemple un plafond contractuel de recettes (§ 98C), ou si produits et consommation sont fortement corrélés. Une licence de durée fixe s'amortit en fonction du temps.",
      },
      {
        num: 6,
        enonce: "« La désactualisation de la provision de démantèlement de la cimenterie en construction est incorporée au coût de l'actif, comme les autres coûts financiers. »",
        correction: "Faux. IFRIC 1.8 : la désactualisation est une charge financière, et « Capitalisation under IAS 23 is not permitted ».",
      },
      {
        num: 7,
        enonce: "« Le matériel à l'arrêt depuis six mois n'est plus amorti. »",
        correction: "Faux, sauf mode fondé sur l'utilisation. L'amortissement ne cesse pas lorsque l'actif est inutilisé (IAS 16.55) ; seul un mode par unités d'œuvre peut donner une dotation nulle en l'absence de production. L'inactivité prolongée est en revanche un indice de perte de valeur à examiner selon IAS 36.",
      },
      {
        num: 8,
        enonce: "« L'écart de réévaluation de l'immeuble cédé cette année a été viré en résultat, ce qui augmente la plus-value de cession. »",
        correction: "Faux. IAS 16.41 permet de transférer l'écart directement dans les résultats non distribués lors de la sortie, et précise que ces transferts « ne se font pas par le biais du résultat net ». La plus-value de cession se calcule sur la valeur comptable réévaluée (§ 71).",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue13',
  numero: 2,
  id: 'ue13-chapitre-2',
  titre: 'Immobilisations corporelles et incorporelles',
  sousTitre: "IAS 16, IAS 38, IAS 23, IFRS 6, IFRIC 1 et IFRIC 20",
  infoBulle: "Chapitre 2 du module IFRS/IAS : reconnaissance et coût d'entrée des immobilisations corporelles, coûts d'emprunt, démantèlement, approche par composants, amortissement, réévaluation, sorties ; immobilisations incorporelles (définition, R&D, durée d'utilité, amortissement) ; découverture minière ; passerelles avec le SYSCOHADA révisé, la fiscalité et le droit minier congolais.",
  loiRef: "IAS 16 · IAS 38 · IAS 23 · IFRIC 1 · IFRIC 20 · IFRS 6 · AUDCIF art. 62-65 · loi n° 23/053, art. 129-133 · Code minier art. 204 et 258",
  moduleLabel: 'UE 13 · IFRS / IAS',
  retourRoute: '/ue13-ifrs-ias',
  coursId: 'ue13-ifrs-ias',
  objectifs: [
    "Délimiter le champ d'IAS 16 et d'IAS 38, notamment face aux droits miniers et à IFRS 6.",
    "Déterminer le coût d'entrée d'une immobilisation : éléments incorporés et exclus, paiement différé, échange, produits des tests.",
    "Calculer les coûts d'emprunt incorporables selon IAS 23, pour un emprunt spécifique et des emprunts généraux.",
    "Comptabiliser un démantèlement et ses révisions selon IAS 16, IAS 37 et IFRIC 1, et le distinguer des mécanismes fiscaux et miniers congolais.",
    "Appliquer l'approche par composants et choisir un mode d'amortissement, en mesurant l'écart avec les taux fiscaux.",
    "Mettre en œuvre le modèle de la réévaluation et le comparer à la réévaluation OHADA et à la réévaluation légale congolaise.",
    "Qualifier une immobilisation incorporelle, distinguer recherche et développement, fixer une durée d'utilité et un mode d'amortissement.",
    "Répartir un coût de découverture minière selon IFRIC 20.",
    "Rapprocher les traitements IFRS de ceux du SYSCOHADA révisé et de la réglementation fiscale et minière congolaise.",
  ],
  sections: SECTIONS,
  aRetenir: [
    "IAS 16 exclut les droits miniers et les réserves minérales, mais s'applique aux équipements qui servent à les exploiter (§ 3). Une immobilisation est comptabilisée si les avantages futurs sont probables et si son coût est évaluable de façon fiable (§ 7) ; le Cadre de 2018 ne modifie pas ce critère (SP1.2).",
    "Coût d'entrée : prix net de remises, droits et taxes non remboursables, coûts directement attribuables et démantèlement actualisé (§ 16-17). Sont exclus l'ouverture, la publicité, la formation, les frais généraux et les pertes de démarrage (§ 19-20). Les produits des tests vont en résultat (§ 20A). Le paiement différé est pris au prix comptant (§ 23) ; l'échange à la juste valeur s'il a une substance commerciale (§ 24-26).",
    "IAS 23 : incorporation obligatoire des coûts d'emprunt d'un actif qualifié, coûts réels nets de placement pour un emprunt spécifique, taux moyen pondéré pour les emprunts généraux, sous plafond ; début, suspension et arrêt encadrés (§ 17-25).",
    "Démantèlement : actif et provision actualisée à l'origine ; désactualisation en charges financières ; révisions portées sur le coût de l'actif, dans la limite de sa valeur comptable (IFRIC 1). Ce passif se distingue de la provision fiscale de l'article 258 du Code minier et de la sûreté exigée par son article 204.",
    "Amortissement : composants significatifs amortis séparément (§ 43), révision annuelle de la durée, de la valeur résiduelle et du mode (§ 51, 61), mode fondé sur les produits interdit (§ 62A), pas d'arrêt pour inutilisation (§ 55), terrains non amortis (§ 58).",
    "Réévaluation : par catégorie entière, à la juste valeur, régulièrement ; hausse en autres éléments du résultat global, baisse en résultat au-delà de l'écart du même actif ; transfert possible de l'écart en résultats non distribués, hors résultat (§ 29-42). L'AUDCIF et le droit fiscal congolais (loi n° 23/053, art. 129 à 133, qui a remplacé l'O.-L. 89-017 au 1er janvier 2026) suivent d'autres logiques : réévaluation globale, écart non distribuable, neutralité fiscale.",
    "IAS 38 : identifiabilité, contrôle, avantages. La recherche est toujours une charge ; le développement est activé si les six critères du § 57 sont démontrés, sans réincorporation des charges antérieures (§ 71). Marques et listes clients générées en interne, goodwill interne, formation et publicité ne sont jamais activés.",
    "Durée d'une incorporelle déterminée (amortie) ou indéterminée (non amortie, testée chaque année) ; renouvellements pris en compte s'ils se font sans coût important (§ 94-96) ; mode fondé sur les produits présumé inapproprié, sauf les exceptions des § 98A-98C.",
    "Mines : IFRS 6 en prospection, IAS 16 ou IAS 38 ensuite ; IFRIC 20 sépare, dans la découverture, la part qui produit des stocks et la part qui améliore l'accès à une composante identifiée, amortie par unités de production.",
  ],
  references: [
    { genre: 'texte', intitule: "IAS 16 — Immobilisations corporelles", precision: "§§ 1 à 79" },
    { genre: 'texte', intitule: "IAS 38 — Immobilisations incorporelles", precision: "§§ 1 à 128 (texte français intégral)" },
    { genre: 'texte', intitule: "IAS 23 — Coûts d'emprunt", precision: "§§ 1 à 26" },
    { genre: 'texte', intitule: "IFRIC 1 — Changes in Existing Decommissioning, Restoration and Similar Liabilities", precision: "§§ 1 à 8" },
    { genre: 'texte', intitule: "IFRIC 20 — Stripping Costs in the Production Phase of a Surface Mine", precision: "§§ 1 à 16" },
    { genre: 'texte', intitule: "IFRS 6 — Prospection et évaluation de ressources minérales", precision: "§§ 1 à 25" },
    { genre: 'texte', intitule: "AUDCIF et SYSCOHADA révisé", precision: "art. 62 à 65 ; Titre VIII, ch. 1, 3, 4, 6, 7 et 28" },
    { genre: 'texte', intitule: "Loi n° 23/053 du 30 novembre 2023 (RDC)", precision: "art. 129 à 133 (réévaluation de l'actif immobilisé) et 152 (abrogation de l'O.-L. 89-017)" },
    { genre: 'texte', intitule: "Ordonnance-loi n° 89-017 du 18 février 1989 portant réévaluation de l'actif immobilisé des entreprises", precision: "art. 2, 6 et 9 ; abrogée au 1er janvier 2026" },
    { genre: 'texte', intitule: "Arrêtés n° 013 et 014/CAB/MIN/FINANCES/2025 du 19 février 2025", precision: "taux d'amortissement linéaire ; seuil du petit matériel (500 USD)" },
    { genre: 'texte', intitule: "Loi n° 007/2002 portant Code minier, modifiée par la loi n° 18/001", precision: "art. 204 et 258" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "IAS 16, IAS 23 (texte français intégral) ; IAS 38, IFRS 6 (texte français intégral) ; IFRIC 1, IFRIC 20 et Cadre conceptuel 2018 (texte anglais) ; AUDCIF et SYSCOHADA révisé ; loi n° 23/053 et O.-L. 89-017 (abrogée) ; arrêtés 013 et 014/2025 ; Code minier ; support de cours d'origine, modules IAS 16 et IAS 38 (J.-B. Tshimanga Mulumba, CPCC).",
}

export default chapitre
