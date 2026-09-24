import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 13 — Chapitre 2 : Immobilisations corporelles et incorporelles
// (IAS 16, IAS 38, IAS 23, IFRIC 1, IFRIC 20)
//
// Sources lues sur texte pendant la rédaction :
// - IAS 16 (texte français intégral) : §§ 1 à 79.
// - IAS 38 (transcription française condensée du corpus : les paragraphes
//   sont cités par numéro et paraphrasés, sans guillemets, sauf mention).
// - IAS 23 (texte français intégral) : §§ 1 à 26.
// - IFRIC 1 et IFRIC 20 (texte anglais intégral) ; IFRS 6 (condensé).
// - Cadre conceptuel 2018 (texte anglais) : SP1.2, 4.3-4.4, 5.6-5.17.
// - AUDCIF : art. 62 à 65 ; Titre VIII, ch. 1, 4, 6 et 7 (R&D, composants,
//   démantèlement, coûts d'emprunt) ; ch. 28 (réévaluation des bilans).
// - Ordonnance-loi n° 89-017 du 18 février 1989 (réévaluation de l'actif
//   immobilisé), telle qu'encodée au skill fiscalité RDC (état au 10 juillet
//   2023) ; arrêtés n° 013 et 014/CAB/MIN/FINANCES/2025 (taux
//   d'amortissement ; seuil du petit matériel).
// - Code minier (loi 007/2002 modifiée) : art. 204 et 258.
// - BOA RDC, états IFRS 2018, note 3.12 (immobilisations corporelles).
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
    explication: "IAS 16.16(c) inclut dans le coût l'estimation initiale des coûts de démantèlement, évaluée selon IAS 37, c'est-à-dire actualisée : 10 000 000 × 1,12⁻¹⁰ = 3 219 732 F. Coût d'entrée : 203 219 732 F, avec une provision de même montant. C'est l'exemple officiel du SYSCOHADA révisé (Titre VIII, ch. 6), qui retient ici la même solution qu'IAS 16.",
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
    explication: "IAS 16.36 : lorsqu'une immobilisation est réévaluée, « toute la catégorie d'immobilisations corporelles dont fait partie cet actif doit être réévaluée » ; le § 37 donne des exemples de catégories (terrains, machines, véhicules…). L'article 62 de l'AUDCIF vise les immobilisations corporelles et financières et dispose que « toute réévaluation partielle est interdite ». L'ordonnance-loi 89-017 exige elle aussi une réévaluation globale.",
    articleRef: "IAS 16.36-37 ; AUDCIF art. 62 ; O.-L. 89-017, art. 2",
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
    question: "Des frais de développement de 180 000 ont été passés en charges au premier semestre, avant que les critères du § 57 soient remplis le 1er juillet. Peut-on les activer au second semestre ?",
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
    question: "La note 3.12 des états IFRS 2018 de BOA RDC indique avoir décomposé ses ensembles immobiliers en « trois composants majeurs » : bâtiments, terrains et agencements. Que relevez-vous ?",
    options: [
      { id: 'a', texte: "Rien : c'est exactement ce que prévoit IAS 16" },
      { id: 'b', texte: "Le terrain n'est pas un composant du bâtiment, mais un actif distinct (IAS 16.58) ; la séparation est juste dans son effet, imprécise dans son vocabulaire" },
      { id: 'c', texte: "Les agencements ne peuvent jamais être séparés" },
      { id: 'd', texte: "La décomposition est interdite pour les banques" },
    ],
    reponseCorrecte: 'b',
    explication: "Séparer le terrain du bâtiment est indispensable, puisque le terrain n'est en principe pas amorti. Mais IAS 16.58 en fait deux actifs distincts, et non deux composants d'un même actif ; le SYSCOHADA révisé le dit expressément. Les agencements, eux, peuvent constituer un composant du bâtiment s'ils ont une durée d'utilité différente (IAS 16.43-45) : la note leur attribue 10 ans, contre 25 à 40 ans pour les immeubles.",
    articleRef: "IAS 16.43-45 et 16.58 ; BOA RDC, note 3.12",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '2.1',
    titre: "Reconnaître une immobilisation corporelle",
    navLabel: 'Reconnaître',
    blocs: [
      {
        type: 'paragraphe',
        texte: "IAS 16 s'ouvre sur son objectif : permettre aux utilisateurs de distinguer les informations relatives aux investissements d'une entité dans ses immobilisations corporelles et celles relatives aux variations de ces investissements (§ 1). Tout le reste en découle : quand un bien entre au bilan, pour quel montant, comment il s'use, comment il en sort. Les **immobilisations corporelles** sont des actifs corporels détenus pour être utilisés dans la production ou la fourniture de biens ou de services, pour être loués à des tiers ou à des fins administratives, et dont on s'attend à ce qu'ils soient utilisés sur plus d'une période (§ 6). Pas de seuil de valeur, pas d'exigence de propriété juridique : un bien pris en location entre dans le champ d'IFRS 16, et c'est l'usage attendu qui fait l'immobilisation.",
      },
      {
        type: 'filet',
        titre: "Ce que dit la norme : le champ d'IAS 16 (§ 3)",
        texte: "La norme ne s'applique pas aux immobilisations détenues en vue de la vente (IFRS 5), aux actifs biologiques autres que les plantes productrices (IAS 41), aux actifs de prospection et d'évaluation (IFRS 6), ni « aux droits miniers et aux réserves minérales telles que le pétrole, le gaz naturel et autres ressources similaires non renouvelables ». Mais elle s'applique « aux immobilisations corporelles utilisées pour développer ou maintenir » ces actifs. Pour une économie minière comme celle de la RDC, cette frontière est décisive : le gisement de Kolwezi échappe à IAS 16, les pelles, les camions et l'usine de traitement y sont soumis.",
      },
      { type: 'controle', question: QCM[0] },
      {
        type: 'paragraphe',
        texte: "Le coût d'une immobilisation est comptabilisé en tant qu'actif « si, et seulement si : (a) il est probable que les avantages économiques futurs associés à cet élément iront à l'entité ; et (b) le coût de cet élément peut être évalué de façon fiable » (§ 7). Ce critère de probabilité date de l'époque où le Cadre conceptuel le posait lui-même. Le Cadre de 2018 l'a abandonné au profit d'un jugement sur la pertinence et la fidélité de l'information (§ 5.6-5.17), mais la norme n'a pas été modifiée. C'est donc elle qui s'applique.",
      },
      { type: 'controle', question: QCM[1] },
      {
        type: 'carte',
        titre: "Trois questions de périmètre que la norme laisse au jugement",
        liste: [
          "**L'unité de comptabilisation** (§ 9) : la norme ne dit pas ce qui compose une immobilisation. Il peut être approprié de regrouper des éléments de faible valeur individuelle, comme les moules, outils et matrices, et d'appliquer les critères à leur valeur globale.",
          "**Les pièces de rechange** (§ 8) : pièces de rechange, pièces de sécurité et matériel d'entretien sont des immobilisations s'ils répondent à la définition, notamment une utilisation sur plus d'une période ; sinon, ce sont des stocks.",
          "**Les actifs de sécurité et d'environnement** (§ 11) : ils n'augmentent pas directement les avantages d'un actif donné, mais sont nécessaires pour obtenir ceux des autres actifs. Ils sont donc immobilisés, puis examinés, avec les actifs liés, pour dépréciation selon IAS 36.",
        ],
      },
      { type: 'controle', question: QCM[2] },
      {
        type: 'paragraphe',
        texte: "Le même principe de comptabilisation s'applique aux **coûts ultérieurs** (§ 10). L'entretien courant, c'est-à-dire la main-d'œuvre, les consommables et les petites pièces, va en résultat net au fil de l'eau (§ 12). Le remplacement d'une partie, comme le revêtement d'un four ou les sièges d'un avion, est immobilisé si les critères sont remplis, et la valeur comptable de la partie remplacée est sortie du bilan (§ 13, § 70). Les **inspections majeures**, enfin, sont traitées comme un remplacement (§ 14), point que la section 2.5 approfondit.",
      },
      {
        type: 'filet',
        titre: "Passerelle SYSCOHADA : le seuil du petit matériel",
        texte: "La norme ne fixe aucun seuil, mais la pratique en adopte un au nom de l'importance relative. En RDC, l'arrêté n° 014/CAB/MIN/FINANCES/2025, applicable depuis le 1er janvier 2026, admet en déduction dès leur acquisition le petit matériel, l'outillage et le matériel de bureau de valeur unitaire inférieure à l'équivalent de **500 USD**. C'est une règle fiscale, pas une règle IFRS. Une entité peut s'en inspirer comme seuil de significativité comptable, à condition de le justifier au regard d'IAS 8.8 : un écart non significatif est admis, un écart destiné à produire une présentation particulière ne l'est pas.",
      },
    ],
  },
  {
    numero: '2.2',
    titre: "Le coût d'entrée : ce qui s'incorpore, ce qui ne s'incorpore pas",
    navLabel: "Coût d'entrée",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Une immobilisation qui remplit les conditions de comptabilisation « doit être évaluée à son coût » (§ 15). Le coût comprend trois blocs (§ 16) : (a) le **prix d'achat**, droits de douane et taxes non remboursables compris, après remises et rabais ; (b) tout **coût directement attribuable** au transfert de l'actif jusqu'à son lieu d'exploitation et à sa mise en état de fonctionner comme prévu par la direction ; (c) l'**estimation initiale des coûts de démantèlement**, d'enlèvement et de remise en état du site. Le mot clé est *directement attribuable* : le coût s'arrête là où commence l'exploitation.",
      },
      {
        type: 'tableau',
        tableau: {
          entetes: ['Incorporé au coût', 'Exclu du coût'],
          lignes: [
            ["Avantages du personnel résultant directement de la construction (§ 17(a))", "Coûts d'ouverture d'une nouvelle installation (§ 19(a))"],
            ["Préparation du site ; livraison et manutention initiales (§ 17(b)-(c))", "Lancement d'un produit, publicité et promotion (§ 19(b))"],
            ["Installation et montage (§ 17(d))", "Exploitation dans un nouveau lieu ou pour de nouveaux clients, formation comprise (§ 19(c))"],
            ["Tests de bon fonctionnement (§ 17(e))", "Frais administratifs et frais généraux (§ 19(d))"],
            ["Honoraires de professionnels (§ 17(f))", "Pertes d'exploitation initiales ; sous-activité de démarrage ; relocalisation (§ 20)"],
            ["Droits de douane et taxes non remboursables (§ 16(a))", "TVA récupérable (§ 16(a), a contrario) ; montants anormaux de matières ou de main-d'œuvre gaspillées (§ 22)"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Deux précisions techniques ont changé la pratique. Le **§ 20A** impose de comptabiliser en résultat net le produit de la vente des éléments produits pendant les tests, par exemple les premières tonnes de ciment sorties d'un four en rodage, ainsi que leur coût évalué selon IAS 2. On ne les déduit plus du coût de l'usine. Le **§ 21** traite les opérations accessoires, comme un terrain loué en parking avant le début des travaux : leurs produits et charges vont en résultat, car elles ne sont pas nécessaires pour amener l'actif en état de fonctionner.",
      },
      { type: 'controle', question: QCM[3] },
      {
        type: 'carte',
        titre: "Pas à pas : le paiement différé (§ 23)",
        liste: [
          "**Donnée.** Machine payable 560 000 USD dans deux ans ; prix comptant 500 000 USD. Le délai excède les conditions habituelles de crédit.",
          "**Coût d'entrée** : le prix comptant équivalent, **500 000 USD**.",
          "**Taux implicite** : 500 000 × (1 + r)² = 560 000, d'où r = √1,12 − 1 ≈ **5,83 %**.",
          "**Charges financières** : année 1, 500 000 × 5,83 % ≈ 29 150 ; année 2, 60 000 − 29 150 ≈ 30 850. Elles vont en résultat, sauf incorporation selon IAS 23 si la machine est un actif qualifié.",
        ],
      },
      { type: 'controle', question: QCM[4] },
      {
        type: 'paragraphe',
        texte: "Lorsqu'une immobilisation est acquise par **échange**, son coût est évalué à la juste valeur, sauf si l'échange n'a pas de substance commerciale ou si aucune des deux justes valeurs n'est évaluable de façon fiable (§ 24). L'échange a une substance commerciale si la configuration des flux de trésorerie (risque, calendrier, montant) de l'actif reçu diffère de celle de l'actif cédé, ou si la valeur spécifique à l'entité de la partie concernée de ses activités varie, et si cette différence est significative (§ 25). C'est une règle anti-abus : deux entités qui s'échangeraient des actifs identiques pour faire apparaître des plus-values en seraient pour leurs frais.",
      },
      { type: 'controle', question: QCM[5] },
    ],
  },
  {
    numero: '2.3',
    titre: "Les coûts d'emprunt : quand l'intérêt devient un coût d'actif (IAS 23)",
    navLabel: "Coûts d'emprunt",
    blocs: [
      {
        type: 'filet',
        titre: "Ce que dit la norme : IAS 23.1 et 23.8",
        texte: "« Les coûts d'emprunt qui sont directement attribuables à l'acquisition, la construction ou la production d'un actif qualifié font partie du coût de cet actif. Les autres coûts d'emprunt sont comptabilisés en charges. » Le § 8 en fait une obligation : les entités « doivent inscrire à l'actif » ces coûts. Il n'y a pas d'option. Un **actif qualifié** est « un actif qui exige une longue période de préparation avant de pouvoir être utilisé ou vendu » (§ 5) : usine, centrale électrique, immeuble de placement, immobilisation incorporelle, voire stocks selon les circonstances (§ 7).",
      },
      { type: 'controle', question: QCM[6] },
      {
        type: 'paragraphe',
        texte: "La logique est celle du coût évitable : les coûts incorporables sont ceux « qui auraient pu être évités si la dépense relative à l'actif qualifié n'avait pas été faite » (§ 10). Deux cas se présentent. Pour un **emprunt spécifique**, on incorpore les coûts réels de la période, diminués des produits de placement temporaire des fonds non encore dépensés (§ 12-13). Pour des **emprunts généraux**, on applique aux dépenses un **taux de capitalisation** égal à la moyenne pondérée des coûts des emprunts en cours, hors emprunts spécifiques tant que l'actif qu'ils financent n'est pas pratiquement achevé, et sans jamais incorporer plus que le total des coûts d'emprunt de la période (§ 14).",
      },
      {
        type: 'carte',
        titre: "Pas à pas : la cimenterie de MBANZA CIMENT SA (société fictive)",
        texte: "Construction d'une ligne de cuisson pendant tout l'exercice N. Emprunt spécifique : 4 000 000 USD à 9 %, tiré le 1er janvier ; placement temporaire des fonds non encore dépensés : 150 000 USD de produits. Emprunts généraux : 10 000 000 USD à 8 % et 5 000 000 USD à 11 %. Dépenses financées par les fonds généraux : 2 000 000 USD le 1er avril, 3 000 000 USD le 1er octobre.",
        tableau: {
          entetes: ['Étape', 'Calcul', 'Montant (USD)'],
          lignes: [
            ['Emprunt spécifique (§ 12)', '4 000 000 × 9 % − 150 000', '**210 000**'],
            ['Taux de capitalisation (§ 14)', '(800 000 + 550 000) / 15 000 000', '9 %'],
            ['Dépenses moyennes sur fonds généraux', '2 000 000 × 9/12 + 3 000 000 × 3/12', '2 250 000'],
            ['Coûts incorporés au titre des emprunts généraux', '2 250 000 × 9 %', '**202 500**'],
            ['Total incorporé au coût de la ligne', '210 000 + 202 500', '**412 500**'],
            ['Plafond (§ 14) : coûts d\'emprunt totaux de N', '360 000 + 800 000 + 550 000', '1 710 000'],
          ],
        },
        note: "Le reste des intérêts, soit 1 710 000 − 360 000 (intérêts de l'emprunt spécifique) − 202 500 = 1 147 500 USD, va en charges financières. Les 150 000 de produits de placement viennent en déduction du coût incorporé et ne figurent pas en produits financiers.",
      },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
      {
        type: 'carte',
        titre: "Le calendrier de l'incorporation",
        liste: [
          "**Début** (§ 17) : à la date où l'entité remplit pour la première fois les trois conditions, engager des dépenses pour l'actif, engager des coûts d'emprunt, entreprendre les activités de préparation. Ces activités comprennent les travaux techniques et administratifs préalables, comme l'obtention des autorisations (§ 19). Détenir un terrain sans l'aménager n'en fait pas partie.",
          "**Suspension** (§ 20-21) : pendant les longues périodes d'interruption du développement actif, sauf travaux techniques ou administratifs importants, et sauf délai temporaire qui est une étape nécessaire du processus.",
          "**Arrêt** (§ 22-25) : lorsque les activités indispensables sont pratiquement toutes terminées. Si l'actif est livré par parties utilisables séparément, comme les immeubles d'un complexe, l'incorporation cesse partie par partie ; pour une aciérie dont les processus s'enchaînent sur le même site, elle ne cesse qu'à l'achèvement de l'ensemble.",
        ],
      },
      { type: 'controle', question: QCM[9] },
      {
        type: 'filet',
        titre: "Jugement professionnel : les coûts d'emprunt en économie inflationniste",
        texte: "IAS 23.6(e) inclut dans les coûts d'emprunt les différences de change sur emprunts en devises « dans la mesure où elles sont assimilées à un ajustement des coûts d'intérêt ». Pour une entité congolaise empruntant en dollars, il faut donc démêler, dans la perte de change, la part qui compense un taux d'intérêt en dollars plus bas que le taux en francs congolais. Et si l'économie devait être qualifiée d'hyperinflationniste, IAS 23.9 impose de passer en charges la partie des coûts d'emprunt qui compense l'inflation (renvoi à IAS 29.21). Ces deux dispositions montrent bien qu'on ne peut pas appliquer une norme sans tenir compte de son environnement macroéconomique.",
      },
    ],
  },
  {
    numero: '2.4',
    titre: "Démantèlement et remise en état : l'actif qui naît d'un passif",
    navLabel: 'Démantèlement',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le coût d'une immobilisation inclut « l'estimation initiale des coûts relatifs au démantèlement et à l'enlèvement de l'immobilisation et à la remise en état du site », lorsque l'entité contracte cette obligation du fait de l'acquisition, ou du fait de l'utilisation de l'actif à des fins autres que la production de stocks (§ 16(c)). L'obligation elle-même est évaluée selon IAS 37 (§ 18), c'est-à-dire actualisée. Si en revanche la dégradation naît de la **production de stocks** au cours de la période, le coût relève d'IAS 2 : il entre dans le coût des stocks, pas dans celui de l'immobilisation (§ 18). La frontière passe entre une obligation liée à l'existence de l'installation et une obligation liée à l'extraction.",
      },
      {
        type: 'carte',
        titre: "Pas à pas : l'exemple officiel du SYSCOHADA, lu en IFRS",
        texte: "Matériel industriel lourd acquis le 2 janvier N pour 200 000 000 F, durée d'utilité 10 ans ; démantèlement estimé à 10 000 000 F au terme ; taux d'actualisation 12 %.",
        tableau: {
          entetes: ['Étape', 'Calcul', 'Montant (F)'],
          lignes: [
            ['Provision initiale', '10 000 000 × 1,12⁻¹⁰', '3 219 732'],
            ["Coût d'entrée", '200 000 000 + 3 219 732', '**203 219 732**'],
            ['Désactualisation N (charge financière)', '3 219 732 × 12 %', '386 368'],
            ['Provision au 31/12/N', '10 000 000 × 1,12⁻⁹', '3 606 100'],
            ['Amortissement N', '203 219 732 / 10', '20 321 973'],
          ],
        },
        note: "Le SYSCOHADA révisé (Titre VIII, ch. 6) retient la même mécanique pour la dégradation immédiate, avec un sous-compte « actif de démantèlement » amorti sur la durée d'exploitation.",
      },
      { type: 'controle', question: QCM[10] },
      {
        type: 'paragraphe',
        texte: "Que se passe-t-il quand l'estimation change ? **IFRIC 1** distingue trois événements (§ 3) : un changement des sorties de ressources estimées, un changement du taux d'actualisation, et l'augmentation qui reflète l'écoulement du temps. Cette dernière, la désactualisation, est une charge financière, sans incorporation possible selon IAS 23 (§ 8). Les deux premiers, au modèle du coût, sont ajoutés au coût de l'actif ou déduits de celui-ci dans la période du changement (§ 5(a)). Une augmentation doit faire se demander si l'actif reste recouvrable (§ 5(c)). Une diminution ne peut pas réduire l'actif en dessous de zéro : l'excédent va immédiatement en résultat (§ 5(b)). Le montant amortissable ajusté est amorti sur la durée d'utilité restante (§ 7).",
      },
      {
        type: 'carte',
        titre: "Pas à pas : révision de l'estimation au 1er janvier N+2",
        liste: [
          "**Situation au 31/12/N+1** : provision 10 000 000 × 1,12⁻⁸ ≈ 4 038 832 ; valeur nette de l'actif de démantèlement 3 219 732 × 8/10 ≈ 2 575 786.",
          "**Nouvelle estimation** : 14 000 000 F au terme, à 12 %. Nouvelle provision : 14 000 000 × 1,12⁻⁸ ≈ 5 654 365, soit une hausse de **1 615 533**.",
          "**Écriture** (IFRIC 1.5(a)) : débit de l'actif de démantèlement, crédit de la provision, pour 1 615 533. Aucune charge immédiate.",
          "**Suite** : valeur nette 2 575 786 + 1 615 533 = 4 191 319, amortie sur les 8 ans restants, soit ≈ 523 915 par an ; désactualisation N+2 : 5 654 365 × 12 % ≈ 678 524, en charges financières.",
          "**Vigilance** (§ 5(c)) : la hausse est un indice possible de perte de valeur de l'actif, qu'il faut tester selon IAS 36.",
        ],
      },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[12] },
      {
        type: 'filet',
        titre: "Passerelle SYSCOHADA et droit minier : trois « provisions » qui ne se confondent pas",
        texte: "Le SYSCOHADA révisé distingue la **dégradation immédiate** (provision actualisée, avec un actif en contrepartie) et la **dégradation progressive**, propre aux mines et carrières, provisionnée au fur et à mesure « sans actif en contrepartie ». Il traite aussi une baisse de provision par voie de dépréciation, alors qu'IFRIC 1 la déduit du coût. Le Code minier ajoute deux mécanismes d'une autre nature. L'article 204 exige une **sûreté** garantissant les obligations environnementales, qui est une garantie et non une provision. L'article 258 permet une **provision pour réhabilitation** en franchise d'impôt, plafonnée à 0,5 % du chiffre d'affaires et à réintégrer si elle n'est pas utilisée en dix ans : c'est un avantage fiscal. Seule l'obligation actualisée d'IAS 37 mesure le passif au sens des IFRS.",
      },
      { type: 'controle', question: QCM[13] },
    ],
  },
  {
    numero: '2.5',
    titre: "Amortir : composants, durées, modes et révisions",
    navLabel: 'Amortir',
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'amortissement est « la répartition systématique du montant amortissable d'un actif sur sa durée d'utilité » (§ 6). Chacun des termes de cette définition suppose une estimation. Le **montant amortissable** est le coût diminué de la valeur résiduelle, montant que l'entité obtiendrait *actuellement* de la sortie de l'actif s'il avait déjà l'âge et l'état prévus en fin de durée d'utilité. La **durée d'utilité** est la durée d'usage attendue par l'entité, qui peut être plus courte que la vie économique du bien (§ 57). Le **mode** doit refléter le rythme de consommation des avantages (§ 60). Les trois sont révisés au moins à chaque clôture, et leurs changements sont des changements d'estimation traités de manière prospective selon IAS 8 (§ 51, § 61).",
      },
      {
        type: 'filet',
        titre: "Ce que dit la norme : l'approche par composants (§ 43-47)",
        texte: "« Chaque partie d'une immobilisation corporelle ayant un coût significatif par rapport au coût total de l'élément doit être amortie séparément » (§ 43), par exemple la cellule et les réacteurs d'un avion (§ 44). Des parties de même durée et de même mode peuvent être regroupées (§ 45). Si l'on amortit certaines parties séparément, le **reliquat**, fait des parties non significatives, est lui aussi amorti séparément, au besoin par approximation (§ 46). Et l'entité peut séparer des parties non significatives si elle le souhaite (§ 47).",
      },
      {
        type: 'carte',
        titre: "Pas à pas : un camion de roulage minier à Kolwezi",
        texte: "Coût 1 200 000 USD : moteur 300 000 (remplacé tous les 4 ans), jeu de pneus 120 000 (remplacé tous les 18 mois), structure 780 000 (12 ans, valeur résiduelle 60 000). Mode linéaire.",
        tableau: {
          entetes: ['Partie', 'Base amortissable', 'Durée', 'Dotation annuelle'],
          lignes: [
            ['Moteur', '300 000', '4 ans', '75 000'],
            ['Pneus', '120 000', '1,5 an', '80 000'],
            ['Structure', '780 000 − 60 000 = 720 000', '12 ans', '60 000'],
            ['**Total par composants**', '', '', '**215 000**'],
            ['Pour comparaison : bien unique', '1 200 000 − 60 000', '12 ans', '95 000'],
            ['Pour comparaison : amortissement fiscal (arrêté 013/2025, gros engins)', '1 200 000', '10 ans (10 %)', '120 000'],
          ],
        },
        note: "L'approche globale sous-amortirait le camion de 120 000 USD par an, puis ferait apparaître en charges d'entretien le remplacement du moteur et des pneus, qui sont de véritables consommations d'actif. L'écart entre 215 000 (comptable) et 120 000 (fiscal) est une différence temporelle, traitée au chapitre 6 (IAS 12).",
      },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[15] },
      {
        type: 'carte',
        titre: "Choisir le mode d'amortissement",
        liste: [
          "**Linéaire** : charge constante, si la valeur résiduelle ne change pas. C'est le mode par défaut pour une consommation régulière.",
          "**Dégressif** : charge décroissante, pour les actifs dont l'essentiel des avantages est consommé tôt.",
          "**Unités d'œuvre** : charge fonction de l'utilisation ou de la production prévue. C'est souvent le mode le plus fidèle pour une usine de concentration ou un matériel de mine lié au rythme d'extraction ; il peut donner une dotation nulle en l'absence de production (§ 55).",
          "**Interdit** : un mode fonction des produits tirés de l'activité (§ 62A). Les produits reflètent les prix, les volumes vendus et l'inflation, qui ne mesurent pas la consommation de l'actif. Dans une économie où les prix en francs congolais varient fortement, l'argument est particulièrement fort.",
        ],
      },
      {
        type: 'paragraphe',
        texte: "Trois règles pratiques complètent le dispositif. Les **terrains** et les **constructions** sont des actifs distincts, même acquis ensemble ; le terrain n'est en principe pas amorti, sauf carrières et décharges, et la part de coût de remise en état qui lui est incorporée s'amortit sur la durée des avantages procurés (§ 58-59). L'amortissement commence quand l'actif est **prêt à être mis en service**, et non quand il l'est effectivement ; il ne cesse pas quand l'actif est laissé **inutilisé** (§ 55). Enfin, un bien continue d'être amorti même si sa juste valeur dépasse sa valeur comptable, tant que la valeur résiduelle ne l'excède pas (§ 52, § 54).",
      },
      { type: 'controle', question: QCM[21] },
      { type: 'controle', question: QCM[22] },
      {
        type: 'filet',
        titre: "Dans les comptes publiés : la note 3.12 de BOA RDC (2018)",
        texte: "La banque indique avoir décomposé « tous les ensembles immobiliers en Bâtiments, Terrains et Agencements », présentés comme « les trois composants majeurs », et publie ses durées : aménagements et installations 10 ans, matériel informatique 3 ans, immeubles 25/40 ans, matériel roulant 5 ans, matériel et mobilier 10 ans, terrains non amortis. Les amortissements sont linéaires, « après détermination de la valeur résiduelle ». Le fond est conforme à IAS 16 ; le vocabulaire ne l'est pas tout à fait, puisque le terrain est un actif distinct et non un composant (§ 58). Lire une note, c'est aussi repérer ces glissements.",
      },
      { type: 'controle', question: QCM[27] },
    ],
  },
  {
    numero: '2.6',
    titre: "Le modèle de la réévaluation : la juste valeur au bilan, l'écart en capitaux propres",
    navLabel: 'Réévaluation',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Après la comptabilisation initiale, l'entité choisit, pour chaque **catégorie** d'immobilisations, entre le modèle du coût et le modèle de la réévaluation (§ 29). Au modèle du coût, l'actif est porté à son coût diminué des amortissements et pertes de valeur cumulés (§ 30). Au modèle de la réévaluation, il est porté à sa **juste valeur** à la date de réévaluation, diminuée des amortissements et pertes de valeur ultérieurs, et les réévaluations sont assez régulières pour que la valeur comptable ne s'écarte pas significativement de la juste valeur à la clôture (§ 31). La fréquence dépend de la volatilité : une réévaluation annuelle pour des valeurs qui fluctuent fortement, tous les trois à cinq ans pour des valeurs stables (§ 34).",
      },
      {
        type: 'carte',
        titre: "Les quatre règles de discipline du modèle",
        liste: [
          "**Toute la catégorie** (§ 36-37) : terrains, terrains et constructions, machines, navires, avions, véhicules, mobilier, matériel de bureau, plantes productrices. On ne réévalue pas l'immeuble qui a pris de la valeur en laissant au coût celui qui en a perdu.",
          "**Simultanément** (§ 38) : pour éviter de mélanger des valeurs à des dates différentes. Une réévaluation par roulement est admise si elle est achevée dans un court délai.",
          "**Juste valeur au sens d'IFRS 13**, avec les informations du § 77 : date de la réévaluation, recours ou non à un évaluateur indépendant, valeur comptable qu'on aurait obtenue au modèle du coût, variations de l'écart et restrictions à sa distribution.",
          "**Effets d'impôt** selon IAS 12 (§ 42) : l'écart de réévaluation crée presque toujours un impôt différé, lui aussi comptabilisé en autres éléments du résultat global.",
        ],
      },
      {
        type: 'carte',
        titre: "Pas à pas : un immeuble de bureaux à la Gombe (en milliers de USD)",
        texte: "Coût 2 000, amorti sur 25 ans ; au bout de 5 ans, amortissements cumulés 400, valeur nette 1 600. Juste valeur établie par un expert : 2 400.",
        tableau: {
          entetes: ['', 'Méthode (a) : retraitement proportionnel', 'Méthode (b) : élimination'],
          lignes: [
            ['Coefficient', '2 400 / 1 600 = 1,5', '—'],
            ['Valeur brute après réévaluation', '2 000 × 1,5 = 3 000', '2 400'],
            ['Amortissements cumulés', '400 × 1,5 = 600', '0 (400 éliminés contre le brut)'],
            ['Valeur nette', '2 400', '2 400'],
            ['Écart de réévaluation (autres éléments du résultat global)', '800', '800'],
            ['Amortissement annuel ensuite (20 ans restants)', '120', '120'],
          ],
        },
        note: "Les deux méthodes du § 35 donnent la même valeur nette et le même écart ; elles diffèrent par la présentation du brut et des amortissements. La méthode (a) convient lorsque le brut peut être retraité par référence à des données de marché observables.",
      },
      { type: 'controle', question: QCM[17] },
      {
        type: 'paragraphe',
        texte: "Le traitement des écarts est **asymétrique par actif** (§ 39-40). Une hausse va en autres éléments du résultat global et s'accumule en capitaux propres, sauf si elle compense une baisse du même actif antérieurement passée en résultat net. Une baisse va en résultat net, sauf à hauteur de l'écart de réévaluation créditeur du même actif, qu'elle vient réduire. Sur l'immeuble de la Gombe, l'amortissement réévalué (120) dépasse l'amortissement historique (80) de 40 par an. Le § 41 permet de virer chaque année ces 40 de l'écart de réévaluation aux résultats non distribués, directement en capitaux propres, sans passer par le résultat net. Au bout de trois ans, l'écart n'est plus que de 800 − 3 × 40 = 680.",
      },
      {
        type: 'tableau',
        tableau: {
          entetes: ['Juste valeur à la fin de N+3', 'Valeur comptable avant réévaluation', 'Baisse', 'En autres éléments du résultat global', 'En résultat net'],
          lignes: [
            ['1 700', '2 400 − 3 × 120 = 2 040', '340', '340 (l\'écart passe de 680 à 340)', '0'],
            ['1 200', '2 040', '840', '680 (l\'écart est soldé)', '**160**'],
          ],
        },
      },
      { type: 'controle', question: QCM[18] },
      {
        type: 'filet',
        titre: "Passerelle SYSCOHADA et droit congolais : trois réévaluations, trois logiques",
        texte: "**IAS 16** réévalue par catégorie, à la juste valeur, périodiquement, et l'écart peut rejoindre les résultats non distribués. **L'AUDCIF** (art. 62 à 65) exige une réévaluation de l'ensemble des immobilisations corporelles et financières, interdit toute réévaluation partielle, plafonne la valeur réévaluée à la valeur actuelle, calcule les amortissements suivants sur la valeur réévaluée et déclare l'écart « non distribuable », seulement incorporable au capital. L'ordonnance-loi congolaise n° 89-017 du 18 février 1989, enfin, organise une **réévaluation légale** par coefficients, obligatoire hors régime forfaitaire (art. 2), dont l'écart est fiscalement neutre (art. 6), et dont l'article 9 neutralise le supplément d'amortissement par une réintégration annuelle dans les bénéfices comptable et fiscal. Sous IAS 16, ce même supplément est une charge du résultat, et seul le virement du § 41 intervient, directement en capitaux propres.",
      },
      { type: 'controle', question: QCM[19] },
      { type: 'controle', question: QCM[20] },
      {
        type: 'filet',
        titre: "Dans les comptes publiés : le choix de BOA RDC au passage aux IFRS",
        texte: "La note 3.12 rappelle que les comptes statutaires de la banque « avaient été impactés par la réévaluation légale conformément aux dispositions de l'ordonnance-loi n°89/017 ». Au passage aux IFRS, la direction n'a pas retenu la valeur réévaluée comme coût présumé, faculté qu'offre IFRS 1 (chapitre 7) : ces valeurs « ont été décomptabilisées », au profit du modèle du coût, établi à partir de rapports d'expertise. La même note évoque ensuite une « réévaluation libre à la juste valeur » à la clôture 2018 suivie d'un test de dépréciation. Un lecteur attentif demandera donc quel modèle, du coût ou de la réévaluation, s'applique réellement à chaque catégorie. C'est la question que le § 73(a) impose de trancher dans les notes.",
      },
    ],
  },
  {
    numero: '2.7',
    titre: "Sorties, indemnisations et informations à fournir",
    navLabel: 'Sorties',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Une immobilisation est décomptabilisée lors de sa sortie, ou lorsqu'aucun avantage économique futur n'est plus attendu de son utilisation ou de sa sortie (§ 67). Le profit ou la perte, égal à la différence entre le produit net de sortie et la valeur comptable (§ 71), va en résultat net, et **les profits ne sont pas classés en produits des activités ordinaires** (§ 68). Exception : l'entité qui vend habituellement des biens qu'elle louait transfère ces biens en stocks à la fin de la location, et leur vente devient un revenu au sens d'IFRS 15 (§ 68A). La date de sortie est celle du transfert du contrôle au sens d'IFRS 15 (§ 69), et la contrepartie est mesurée selon les règles de prix de transaction de cette norme (§ 72).",
      },
      {
        type: 'filet',
        titre: "Jugement professionnel : sinistre, indemnité et reconstruction sont trois événements",
        texte: "Un entrepôt de Goma est détruit par un incendie ; l'assureur accepte d'indemniser ; l'entreprise reconstruit. IAS 16.66 impose de traiter ces événements séparément : la perte de l'actif (dépréciation selon IAS 36 ou décomptabilisation selon IAS 16), l'indemnité, portée en résultat net « lorsqu'elle devient exigible » (§ 65), et le coût du nouvel entrepôt, déterminé selon IAS 16. On ne compense pas la perte par l'indemnité attendue, et on ne constate pas l'indemnité tant qu'elle n'est pas exigible, même si la perte est déjà comptabilisée.",
      },
      {
        type: 'carte',
        titre: "Ce que les notes doivent montrer (§ 73-79)",
        liste: [
          "**Par catégorie** : bases d'évaluation du brut, modes et durées ou taux d'amortissement, brut et cumul des amortissements à l'ouverture et à la clôture, et un **rapprochement** complet des valeurs comptables (entrées, sorties, regroupements, réévaluations, pertes de valeur et reprises, amortissements, écarts de conversion, autres).",
          "**Engagements et restrictions** : actifs donnés en nantissement, dépenses sur immobilisations en cours, engagements d'acquisition (§ 74).",
          "**Estimations** : nature et effet des changements de valeur résiduelle, de coût de démantèlement, de durée et de mode (§ 76).",
          "**Encouragé** : actifs temporairement inutilisés, actifs entièrement amortis toujours en service, juste valeur des actifs au coût lorsqu'elle diffère significativement (§ 79).",
        ],
      },
    ],
  },
  {
    numero: '2.8',
    titre: "IAS 38 : définir et faire entrer l'immatériel",
    navLabel: 'IAS 38 : entrer',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Une **immobilisation incorporelle** est un actif non monétaire identifiable sans substance physique (IAS 38.8). La définition repose sur trois conditions : l'identifiabilité, le contrôle et des avantages économiques futurs. Si l'une manque, la dépense est une charge, ou, dans un regroupement d'entreprises, une partie du goodwill (§ 10). L'enjeu est considérable dans l'économie d'aujourd'hui : logiciels, licences de télécommunication, bases de clients, marques, droits de diffusion. Beaucoup de ces ressources créent de la valeur sans pouvoir entrer au bilan.",
      },
      {
        type: 'carte',
        titre: "Les trois conditions de la définition",
        liste: [
          "**Identifiable** (§ 11-12) : l'actif est *séparable*, c'est-à-dire qu'il peut être vendu, cédé, concédé, loué ou échangé, seul ou avec un élément lié, ou bien il résulte de *droits contractuels ou légaux*, cessibles ou non. C'est ce qui le distingue du goodwill.",
          "**Contrôlé** (§ 13-16) : l'entité a le pouvoir d'obtenir les avantages et d'en restreindre l'accès aux tiers, ce qui passe normalement par des droits juridiquement protégés. Une équipe bien formée ou une clientèle fidèle ne sont en général pas contrôlées, faute de droits établis ; des échanges de relations clients hors regroupement prouvent toutefois le contrôle (§ 16).",
          "**Porteur d'avantages** (§ 17) : produits de ventes, mais aussi économies de coûts.",
        ],
      },
      {
        type: 'tableau',
        tableau: {
          entetes: ["Voie d'entrée", 'Probabilité des avantages (§ 21(a))', 'Mesure initiale'],
          lignes: [
            ['Acquisition séparée (§ 25-32)', 'Toujours réputée satisfaite', 'Coût : prix, droits et taxes non remboursables, coûts directement attribuables'],
            ["Regroupement d'entreprises (§ 33-37)", 'Toujours réputée satisfaite', 'Juste valeur à la date d\'acquisition (IFRS 3), y compris un projet de R&D en cours'],
            ['Subvention publique (§ 44)', '—', 'Juste valeur, ou valeur symbolique majorée des coûts directement attribuables (IAS 20)'],
            ["Échange d'actifs (§ 45-47)", '—', "Juste valeur, sauf absence de substance commerciale"],
            ['Génération interne (§ 51-67)', 'À démontrer : six critères du § 57', 'Dépenses engagées à compter de la date où les critères sont remplis'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "La génération interne est le terrain le plus délicat. La norme impose de séparer une **phase de recherche** et une **phase de développement** (§ 52), et, si l'on ne peut pas les distinguer, de tout traiter comme de la recherche (§ 53). La recherche est toujours une charge (§ 54). Le développement donne naissance à une immobilisation si, et seulement si, l'entité démontre six éléments (§ 57) : (a) la faisabilité technique de l'achèvement ; (b) l'intention d'achever et d'utiliser ou de vendre ; (c) la capacité à utiliser ou à vendre ; (d) la façon dont l'actif générera des avantages probables, par l'existence d'un marché ou, en usage interne, par son utilité ; (e) la disponibilité des ressources techniques et financières, démontrable par un plan d'affaires ou l'accord d'un prêteur (§ 61) ; (f) la capacité d'évaluer de façon fiable les dépenses attribuables.",
      },
      {
        type: 'carte',
        titre: "Pas à pas : l'application de paiement mobile de KASAI BANQUE (société fictive)",
        texte: "Dépenses de l'exercice N : études exploratoires de janvier à mars, 120 000 USD ; développement, 480 000 USD, dont 180 000 avant le 1er juillet, date à laquelle les six critères sont démontrés, et 300 000 ensuite ; formation des agents, 40 000 ; campagne publicitaire de lancement, 60 000. Mise en service le 1er janvier N+1, durée d'utilité estimée à 4 ans.",
        tableau: {
          entetes: ['Dépense', 'Traitement', 'Fondement'],
          lignes: [
            ['Études exploratoires 120 000', 'Charge', 'IAS 38.54-56 (recherche)'],
            ['Développement avant le 1er juillet 180 000', 'Charge, définitivement', 'IAS 38.65 et 38.71'],
            ['Développement après le 1er juillet 300 000', '**Immobilisation**', 'IAS 38.57 et 38.66'],
            ['Formation 40 000', 'Charge', 'IAS 38.67(c) et 38.69(b)'],
            ['Publicité de lancement 60 000', 'Charge', 'IAS 38.69(c)'],
            ['Amortissement à partir de N+1', '300 000 / 4 = **75 000 par an**', 'IAS 38.97'],
          ],
        },
        note: "Côté fiscal, l'arrêté n° 013/2025 amortit « brevets, licences et logiciels » sur 5 ans (20 %) : 60 000 par an, contre 75 000 en comptabilité. La différence de 15 000 par an est une différence temporelle (chapitre 6).",
      },
      { type: 'controle', question: QCM[23] },
      { type: 'controle', question: QCM[24] },
      {
        type: 'filet',
        titre: "Ce que dit la norme : ce qui n'entre jamais au bilan",
        texte: "Ne sont jamais comptabilisés en immobilisations incorporelles : le goodwill généré en interne (§ 48) ; les marques, cartouches de titre, titres de publication, listes de clients et éléments similaires générés en interne (§ 63), parce que leurs dépenses ne se distinguent pas du développement de l'entreprise dans son ensemble (§ 64) ; les coûts de démarrage, de formation, de publicité et de promotion, de relocalisation ou de réorganisation (§ 69). Et une dépense passée en charges ne peut jamais être incorporée plus tard (§ 71). Le SYSCOHADA révisé reprend les six critères et la même interdiction de réincorporation (Titre VIII, ch. 1), avec un compte 211 dédié aux frais de développement.",
      },
    ],
  },
  {
    numero: '2.9',
    titre: "IAS 38 : évaluer, amortir, tester",
    navLabel: 'IAS 38 : évaluer',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Comme pour les immobilisations corporelles, l'entité choisit entre le modèle du coût et le modèle de la réévaluation (§ 72). Mais la réévaluation d'une incorporelle exige une juste valeur déterminée **par référence à un marché actif** (§ 75), ce qui est exceptionnel : la norme cite des licences de taxis ou de pêche et des quotas de production librement cessibles, et exclut expressément les marques, les droits d'édition, les brevets, qui sont chacun uniques (§ 78). En pratique, l'immense majorité des incorporelles est évaluée au coût.",
      },
      {
        type: 'paragraphe',
        texte: "La question décisive est celle de la **durée d'utilité**, déterminée ou indéterminée (§ 88). Elle est indéterminée lorsque, compte tenu de tous les facteurs pertinents (§ 90 : usage, cycles de vie, obsolescence, stabilité du secteur, concurrence, maintenance, limites juridiques, dépendance à d'autres actifs), il n'existe pas de limite prévisible à la période de génération de flux. « Indéterminé » ne veut pas dire « infini » (§ 91). Une incorporelle à durée déterminée est amortie ; une incorporelle à durée indéterminée ne l'est pas, mais elle est testée pour dépréciation chaque année et à chaque indice (§ 107-108), et sa durée est réexaminée à chaque période (§ 109).",
      },
      {
        type: 'carte',
        titre: "Licences et droits renouvelables : la règle des §§ 94 à 96",
        liste: [
          "La durée issue de droits contractuels ou légaux **ne doit pas excéder** leur période, mais peut être plus courte.",
          "Les périodes de **renouvellement** ne sont incluses que si des éléments probants montrent qu'il sera obtenu **sans coût important** : expérience passée, conditions remplies, coût faible au regard des avantages (§ 96).",
          "Si le renouvellement coûte cher, il s'analyse en l'**acquisition d'un nouvel actif** : la licence en cours s'amortit sur sa durée restante.",
          "**Valeur résiduelle** : réputée nulle, sauf engagement d'un tiers de racheter l'actif ou marché actif probable en fin de durée (§ 100).",
        ],
      },
      { type: 'controle', question: QCM[25] },
      {
        type: 'paragraphe',
        texte: "Le mode d'amortissement obéit aux mêmes principes qu'en IAS 16, avec une nuance importante. Un mode fondé sur les produits est présumé inapproprié, mais la présomption est **réfutable** (§ 98A) dans deux cas seulement : lorsque l'incorporelle est exprimée selon une mesure des produits, ou lorsque produits et consommation sont fortement corrélés. Le § 98C en donne l'illustration : un droit d'exploiter une concession ou une autoroute à péage jusqu'à ce qu'un montant total de produits, fixé par contrat, soit atteint. Le point de départ est d'identifier le **facteur limitatif prédominant** (§ 98B) : le temps, un nombre d'unités ou un montant de produits.",
      },
      { type: 'controle', question: QCM[16] },
      {
        type: 'filet',
        titre: "Jugement professionnel : l'exemple officiel du § 65, ou le coût qui dépasse la valeur",
        texte: "En 20X5, une entité développe un procédé pour 1 000 : 900 avant le 1er décembre, date où les critères sont remplis, et 100 ensuite. Fin 20X5, l'immobilisation vaut 100 ; les 900 restent en charges, pour toujours. En 20X6, elle dépense 2 000 de plus : le coût atteint 2 100, mais la valeur recouvrable n'est que de 1 900. Il faut donc comptabiliser une perte de valeur de 200 selon IAS 36. Activer un coût ne garantit pas qu'il sera recouvré : le test de dépréciation surveille en permanence ce qui a été activé.",
      },
    ],
  },
  {
    numero: '2.10',
    titre: "Les mines : IFRS 6, IAS 16 et IFRIC 20",
    navLabel: 'Mines',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le cycle de vie d'une mine traverse trois territoires normatifs. En amont, la **prospection et l'évaluation**, après l'obtention des droits de prospecter et avant la démonstration de la faisabilité technique et de la viabilité commerciale de l'extraction, relèvent d'IFRS 6 : l'entité définit sa méthode de capitalisation (§ 9), bénéficie d'une exemption temporaire des §§ 11-12 d'IAS 8 (§ 7), classe ses actifs en corporels ou incorporels selon leur nature (§ 15-16), et teste la dépréciation avant tout reclassement (§ 17). Au milieu, les dépenses de **développement** de la mine relèvent du Cadre et d'IAS 38 (IFRS 6.10), et les équipements d'IAS 16. En production, enfin, une dépense propre aux mines à ciel ouvert appelle une interprétation spécifique.",
      },
      {
        type: 'filet',
        titre: "Ce que dit l'interprétation : IFRIC 20 et la découverture",
        texte: "Pour accéder au minerai, une mine à ciel ouvert enlève des stériles : c'est la **découverture** (*stripping*). En phase de production, cette activité peut procurer deux avantages : du minerai utilisable pour produire des stocks de la période, et un meilleur accès à des quantités qui seront extraites plus tard (§ 4). IFRIC 20 impose de les séparer (§ 8). La part qui produit des stocks relève d'IAS 2. La part qui améliore l'accès devient un « stripping activity asset » si trois conditions sont réunies (§ 9) : avantage probable, **composante identifiée** du gisement, coûts évaluables de façon fiable. Cet actif est une partie d'un actif existant, dont il prend la nature (§ 10-11), et il est amorti sur la durée d'utilité de la composante qu'il rend accessible, par unités de production sauf méthode plus appropriée (§ 15).",
      },
      {
        type: 'carte',
        titre: "Pas à pas : la répartition du coût de découverture (§ 13)",
        texte: "Mine de cuivre à ciel ouvert, composante A du gisement. Ratio stériles/minerai attendu pour la composante : 3 pour 1. Exercice N : 400 000 t de minerai extraites, 2 000 000 t de stériles enlevées (ratio réel 5 pour 1). Coût total de découverture : 10 000 000 USD, soit 5 USD par tonne de stériles.",
        tableau: {
          entetes: ['Étape', 'Calcul', 'Montant'],
          lignes: [
            ['Stériles attendus pour la production de N', '400 000 × 3', '1 200 000 t'],
            ['Stériles excédentaires, qui améliorent l\'accès', '2 000 000 − 1 200 000', '800 000 t'],
            ['Coût affecté aux stocks (IAS 2)', '1 200 000 × 5', '**6 000 000 USD**'],
            ['Actif de découverture (IFRIC 20)', '800 000 × 5', '**4 000 000 USD**'],
            ['Amortissement N+1, si la composante A contient 2 000 000 t de minerai et que 500 000 t sont extraites', '4 000 000 × 500 000 / 2 000 000', '1 000 000 USD'],
          ],
        },
        note: "La mesure retenue compare le volume de stériles extrait au volume attendu pour une production donnée (§ 13(b)). On aurait pu retenir le coût des stocks produits par rapport au coût attendu (§ 13(a)), ou la teneur du minerai extrait par rapport à la teneur attendue (§ 13(c)).",
      },
      { type: 'controle', question: QCM[26] },
      {
        type: 'paragraphe',
        texte: "Sans IFRIC 20, deux dérives étaient possibles : tout passer en charges, ce qui pénalise la période où l'on ouvre l'accès à de futurs volumes, ou tout activer, ce qui gonfle le bilan de coûts qui ont déjà produit du minerai vendu. L'interprétation tranche par une clé physique, vérifiable par un géologue autant que par un auditeur. C'est une leçon qui dépasse la mine : une bonne règle comptable s'appuie sur une grandeur que l'on peut observer. Le SYSCOHADA révisé consacre de son côté un chapitre aux frais de prospection et d'exploitation des ressources minérales (Titre VIII, ch. 3), qu'il faut lire en parallèle pour les entités qui établissent les deux jeux d'états.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ue13c2-cp1',
    titre: "Dossier réel : lire la note « Immobilisations corporelles » de BOA RDC (2018)",
    contexte: "Extraits de la note 3.12 des états IFRS 2018 de BOA RDC SA. « Selon la norme IAS 16 [...], les immobilisations sont comptabilisées, à l'entrée, au coût complet et elles sont évaluées postérieurement selon le modèle du coût, de la juste valeur ou du coût présumé. » « Les comptes statutaires de la Banque avaient été impactés par la réévaluation légale conformément aux dispositions de l'ordonnance-loi n°89/017 [...]. La Direction de la Banque, n'ayant pas opté pour la méthode de coûts présumés, ces valeurs réévaluées ont été décomptabilisées. La Banque a plutôt opté pour la méthode du coût en utilisant les valeurs réévaluées des immobilisations, conformément aux rapports d'expertise. » « La Banque a effectué un travail visant à décomposer tous les ensembles immobiliers en Bâtiments, Terrains et Agencements. [...] Les valeurs obtenues après décompositions ont été ensuite corrigées par un test de dépréciation effectué consécutivement à la réévaluation libre à la juste valeur effectuée à la clôture de l'exercice 2018. » Durées publiées : aménagements et installations 10 ans ; terrains non amortis ; matériel informatique 3 ans ; immeubles 25/40 ans ; matériel roulant 5 ans ; matériel et mobilier 10 ans.",
    questions: [
      {
        num: 1,
        enonce: "La première phrase annonce trois modèles d'évaluation postérieure. Qu'en dit IAS 16 ?",
        correction: "IAS 16.29 ne connaît que deux modèles, le coût (§ 30) et la réévaluation (§ 31), à choisir comme méthode comptable et à appliquer à l'ensemble d'une catégorie. La « juste valeur » n'est pas un troisième modèle : c'est la base du modèle de la réévaluation. Le « coût présumé » n'est pas un modèle d'évaluation postérieure, mais une facilité de première adoption offerte par IFRS 1 : une valeur substituée au coût à la date de transition, après quoi l'entité applique le modèle du coût. Une note conforme indiquerait, catégorie par catégorie, le modèle retenu (§ 73(a)).",
      },
      {
        num: 2,
        enonce: "La banque dit ne pas retenir la réévaluation légale comme coût présumé, mais appliquer « la méthode du coût en utilisant les valeurs réévaluées [...] conformément aux rapports d'expertise ». Quelle tension relevez-vous, et quelles informations demanderiez-vous ?",
        correction: "Il y a une tension apparente. Si les valeurs issues d'expertises servent de base à un modèle « du coût », c'est en substance soit un coût présumé à la juste valeur (IFRS 1), soit une réévaluation au sens d'IAS 16.31. Le lecteur ne peut pas savoir lequel. Et la mention d'une « réévaluation libre à la juste valeur » à la clôture 2018 suggère le modèle de la réévaluation, au moins pour les terrains et bâtiments. Il faudrait donc demander : le modèle retenu par catégorie (§ 73(a)) ; si c'est la réévaluation, la date, le recours à un évaluateur indépendant, la valeur au modèle du coût et l'écart de réévaluation avec ses restrictions (§ 77) ; le niveau de la hiérarchie de juste valeur et les données utilisées (IFRS 13.93) ; enfin le traitement des plus et moins-values constatées, en autres éléments du résultat global ou en résultat (§ 39-40).",
      },
      {
        num: 3,
        enonce: "Commentez la décomposition en « Bâtiments, Terrains et Agencements » et les durées publiées.",
        correction: "Sur le fond, la séparation est nécessaire : le terrain n'est pas amorti, le bâtiment l'est (§ 58), et les agencements, avec une durée de 10 ans contre 25 à 40 ans pour les immeubles, sont bien des parties significatives à amortir séparément (§ 43-44). Sur la forme, le terrain n'est pas un « composant » du bâtiment, mais un actif distinct (§ 58 ; le SYSCOHADA révisé le dit aussi). La fourchette de 25 à 40 ans pour les immeubles doit correspondre à des catégories identifiables, faute de quoi elle ne renseigne pas le lecteur. Ces durées doivent être revues au moins à chaque clôture (§ 51), et tout changement indiqué avec son effet (§ 76).",
      },
      {
        num: 4,
        enonce: "Pourquoi IAS 16 interdit-elle de laisser en IFRS les valeurs de la réévaluation légale de 1989 sans autre justification ?",
        correction: "La réévaluation de l'ordonnance-loi 89-017 est indiciaire : elle applique des coefficients officiels d'érosion monétaire, sous plafond de valeur actuelle. IAS 16 ne connaît pas de réévaluation indiciaire : le modèle de la réévaluation exige une juste valeur au sens d'IFRS 13, régulièrement mise à jour (§ 31, § 34), sur une catégorie entière (§ 36). Une valeur légale ancienne ne répond à aucune de ces exigences. À la transition, seule IFRS 1 permet de l'utiliser comme coût présumé, et sous conditions ; c'est justement l'option que la banque dit avoir écartée.",
      },
    ],
  },
  {
    id: 'ue13c2-cp2',
    titre: "Calcul : le coût complet d'une ligne de cimenterie",
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
    titre: "Mine à ciel ouvert : découverture, démantèlement et fiscalité minière",
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
    titre: "Vrai ou faux : huit affirmations sur les immobilisations",
    contexte: "Un comité d'audit examine le projet d'états IFRS d'une société congolaise. Pour chaque affirmation relevée dans le procès-verbal, dites si elle est vraie ou fausse, et justifiez.",
    questions: [
      {
        num: 1,
        enonce: "« Nous avons réévalué l'immeuble du siège, dont la valeur a doublé, mais gardé au coût les entrepôts de province, qui ont perdu de la valeur. »",
        correction: "Faux. Si un actif est réévalué, toute la catégorie à laquelle il appartient doit l'être (IAS 16.36), et simultanément (§ 38). C'est précisément la réévaluation sélective que la norme veut empêcher.",
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
  sousTitre: "Du coût d'entrée à la sortie : IAS 16, IAS 38, IAS 23, IFRIC 1 et IFRIC 20",
  infoBulle: "Chapitre 2 du module IFRS/IAS : reconnaissance et coût d'entrée des immobilisations corporelles, coûts d'emprunt, démantèlement, approche par composants, amortissement, réévaluation, sorties ; immobilisations incorporelles (définition, R&D, durée d'utilité, amortissement) ; découverture minière ; passerelles avec le SYSCOHADA révisé, la fiscalité et le droit minier congolais.",
  loiRef: "IAS 16 · IAS 38 · IAS 23 · IFRIC 1 · IFRIC 20 · IFRS 6 · AUDCIF art. 62-65 · O.-L. 89-017 · Code minier art. 204 et 258",
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
    "Lire de façon critique une note annexe sur les immobilisations dans des états publiés.",
  ],
  sections: SECTIONS,
  aRetenir: [
    "IAS 16 exclut les droits miniers et réserves minérales, mais s'applique aux équipements qui servent à les exploiter (§ 3). Critères : avantages probables et coût fiable (§ 7) ; le Cadre de 2018 ne modifie pas la norme (SP1.2).",
    "Coût d'entrée : prix net de remises, droits et taxes non remboursables, coûts directement attribuables et démantèlement actualisé (§ 16-17). Sont exclus l'ouverture, la publicité, la formation, les frais généraux et les pertes de démarrage (§ 19-20). Les produits des tests vont en résultat (§ 20A). Le paiement différé est pris au prix comptant (§ 23) ; l'échange à la juste valeur s'il a une substance commerciale (§ 24-26).",
    "IAS 23 : incorporation obligatoire des coûts d'emprunt d'un actif qualifié, coûts réels nets de placement pour un emprunt spécifique, taux moyen pondéré pour les emprunts généraux, sous plafond ; début, suspension et arrêt encadrés (§ 17-25).",
    "Démantèlement : actif et provision actualisée à l'origine ; désactualisation en charges financières ; révisions portées sur le coût de l'actif, dans la limite de sa valeur comptable (IFRIC 1). À ne pas confondre avec la provision fiscale de l'article 258 du Code minier ni avec la sûreté de l'article 204.",
    "Amortissement : composants significatifs amortis séparément (§ 43), révision annuelle de la durée, de la valeur résiduelle et du mode (§ 51, 61), mode fondé sur les produits interdit (§ 62A), pas d'arrêt pour inutilisation (§ 55), terrains non amortis (§ 58).",
    "Réévaluation : par catégorie entière, à la juste valeur, régulièrement ; hausse en autres éléments du résultat global, baisse en résultat au-delà de l'écart du même actif ; transfert possible de l'écart en résultats non distribués, hors résultat (§ 29-42). L'AUDCIF et l'O.-L. 89-017 suivent d'autres logiques : réévaluation globale, écart non distribuable, neutralité fiscale.",
    "IAS 38 : identifiabilité, contrôle, avantages. La recherche est toujours une charge ; le développement est activé si les six critères du § 57 sont démontrés, sans réincorporation des charges antérieures (§ 71). Marques et listes clients générées en interne, goodwill interne, formation et publicité ne sont jamais activés.",
    "Durée d'une incorporelle déterminée (amortie) ou indéterminée (non amortie, testée chaque année) ; renouvellements pris en compte s'ils se font sans coût important (§ 94-96) ; mode fondé sur les produits présumé inapproprié, sauf les exceptions des § 98A-98C.",
    "Mines : IFRS 6 en prospection, IAS 16 ou IAS 38 ensuite ; IFRIC 20 sépare, dans la découverture, la part qui produit des stocks et la part qui améliore l'accès à une composante identifiée, amortie par unités de production.",
  ],
  references: [
    { genre: 'texte', intitule: "IAS 16 — Immobilisations corporelles", precision: "§§ 1 à 79" },
    { genre: 'texte', intitule: "IAS 38 — Immobilisations incorporelles", precision: "§§ 1 à 128 (transcription condensée du corpus)" },
    { genre: 'texte', intitule: "IAS 23 — Coûts d'emprunt", precision: "§§ 1 à 26" },
    { genre: 'texte', intitule: "IFRIC 1 — Changes in Existing Decommissioning, Restoration and Similar Liabilities", precision: "§§ 1 à 8" },
    { genre: 'texte', intitule: "IFRIC 20 — Stripping Costs in the Production Phase of a Surface Mine", precision: "§§ 1 à 16" },
    { genre: 'texte', intitule: "IFRS 6 — Prospection et évaluation de ressources minérales", precision: "§§ 1 à 25" },
    { genre: 'texte', intitule: "AUDCIF et SYSCOHADA révisé", precision: "art. 62 à 65 ; Titre VIII, ch. 1, 3, 4, 6, 7 et 28" },
    { genre: 'texte', intitule: "Ordonnance-loi n° 89-017 du 18 février 1989 portant réévaluation de l'actif immobilisé des entreprises", precision: "art. 2, 6 et 9 (état au 10 juillet 2023)" },
    { genre: 'texte', intitule: "Arrêtés n° 013 et 014/CAB/MIN/FINANCES/2025 du 19 février 2025", precision: "taux d'amortissement linéaire ; seuil du petit matériel (500 USD)" },
    { genre: 'texte', intitule: "Loi n° 007/2002 portant Code minier, modifiée par la loi n° 18/001", precision: "art. 204 et 258" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "IAS 16, IAS 23 (texte français intégral) ; IAS 38, IFRS 6 (transcriptions françaises condensées) ; IFRIC 1, IFRIC 20 et Cadre conceptuel 2018 (texte anglais) ; AUDCIF et SYSCOHADA révisé ; O.-L. 89-017 ; arrêtés 013 et 014/2025 ; Code minier ; BOA RDC, états IFRS 2018.",
}

export default chapitre
