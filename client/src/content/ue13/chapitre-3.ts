import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 13 — Chapitre 3 : Dépréciation des actifs et immeubles de placement
// (IAS 36, IAS 40)
//
// Sources lues sur texte pendant la rédaction :
// - IAS 36 et IAS 40 : texte intégral de la traduction française officielle
//   (IFRS Foundation), lu dans le corpus ; les passages entre guillemets le
//   reproduisent à l'identique, le reste le paraphrase avec renvoi au §.
// - IFRS 13 (§ 9, hiérarchie), IAS 16 (§ 31-41), IAS 23, IFRS 5 (renvois).
// - AUDCIF : art. 42, 43 et 46 ; SYSCOHADA révisé, Titre VIII, ch. 10
//   (immeubles de placement) et ch. 12 (dépréciation des immobilisations).
// - BOA RDC, états IFRS 2018 (note 3.13) ; BCDC, annexe au rapport annuel
//   2018 (immeubles de placement, durées d'utilité, note 3.8).
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'ue13c3-q1',
    question: "Parmi ces actifs, lequel N'ENTRE PAS dans le champ d'IAS 36 ?",
    options: [
      { id: 'a', texte: "Une usine évaluée au modèle du coût" },
      { id: 'b', texte: "Une licence de télécommunications" },
      { id: 'c', texte: "Un immeuble de placement évalué au modèle de la juste valeur" },
      { id: 'd', texte: "Une participation dans une filiale, dans les états individuels" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 36.2 exclut notamment les stocks, les actifs d'impôt différé, les actifs financiers d'IFRS 9, les immeubles de placement évalués à la juste valeur, les actifs biologiques à la juste valeur diminuée des coûts de vente et les actifs détenus en vue de la vente. Un immeuble à la juste valeur n'a pas besoin de test : toute baisse de valeur passe déjà en résultat (IAS 40.35). La participation dans une filiale reste dans le champ (IAS 36.4).",
    articleRef: "IAS 36.2-4 ; IAS 40.35",
  },
  {
    id: 'ue13c3-q2',
    question: "Quels actifs doivent être testés chaque année, qu'il existe ou non un indice de perte de valeur ?",
    options: [
      { id: 'a', texte: "Toutes les immobilisations corporelles" },
      { id: 'b', texte: "Le goodwill, les immobilisations incorporelles à durée d'utilité indéterminée et celles qui ne sont pas encore prêtes à être mises en service" },
      { id: 'c', texte: "Les seuls actifs réévalués" },
      { id: 'd', texte: "Les actifs de plus de dix ans" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36.9 impose de rechercher à chaque clôture s'il existe un indice ; le test n'est alors requis qu'en présence d'un indice. Le § 10 prévoit trois exceptions testées chaque année, indice ou non : les incorporelles à durée indéterminée, les incorporelles pas encore prêtes à l'emploi, dont la recouvrabilité est plus incertaine (§ 11), et le goodwill acquis dans un regroupement.",
    articleRef: "IAS 36.9-11",
  },
  {
    id: 'ue13c3-q3',
    question: "Parmi ces faits, lequel N'EST PAS cité par IAS 36.12 comme indice de perte de valeur ?",
    options: [
      { id: 'a', texte: "La valeur comptable de l'actif net de l'entité dépasse sa capitalisation boursière" },
      { id: 'b', texte: "Une hausse des taux d'intérêt de marché susceptible d'augmenter le taux d'actualisation" },
      { id: 'c', texte: "Une filiale verse un dividende supérieur à son résultat global total de la période" },
      { id: 'd', texte: "Une baisse du cours de l'action de l'entité inférieure à celle de l'indice boursier" },
    ],
    reponseCorrecte: 'd',
    explication: "IAS 36.12 cite, parmi les sources externes, la baisse de valeur de l'actif, les changements défavorables d'environnement, la hausse des taux de marché (c) et l'excédent de l'actif net comptable sur la capitalisation boursière (d). Parmi les sources internes : obsolescence, changement d'utilisation, performance inférieure aux prévisions. Pour les participations, le dividende supérieur au résultat global de la période (h)(ii). Une moindre baisse que l'indice n'est pas, en soi, un indice.",
    articleRef: "IAS 36.12-14",
  },
  {
    id: 'ue13c3-q4',
    question: "La valeur recouvrable d'un actif est…",
    options: [
      { id: 'a', texte: "la moyenne entre sa juste valeur et sa valeur d'utilité" },
      { id: 'b', texte: "la plus faible de sa juste valeur diminuée des coûts de sortie et de sa valeur d'utilité" },
      { id: 'c', texte: "la plus élevée de sa juste valeur diminuée des coûts de sortie et de sa valeur d'utilité" },
      { id: 'd', texte: "son coût de remplacement à neuf corrigé de son âge" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 36.18 : la valeur recouvrable est la plus élevée des deux. La logique est celle d'une direction rationnelle, qui garde l'actif s'il vaut plus en usage et le vend s'il vaut plus sur le marché. La réponse d est la « valeur actuelle » du SYSCOHADA révisé (Titre VIII, ch. 12), qui est une valeur d'entrée ; IAS 36 raisonne en valeurs de sortie ou d'usage. Il suffit d'ailleurs que l'une des deux dépasse la valeur comptable pour conclure qu'il n'y a pas de perte (§ 19).",
    articleRef: "IAS 36.18-19",
  },
  {
    id: 'ue13c3-q5',
    question: "Lequel de ces flux doit être EXCLU du calcul de la valeur d'utilité ?",
    options: [
      { id: 'a', texte: "Les frais d'entretien courant de l'actif" },
      { id: 'b', texte: "Les frais généraux directement affectables à l'utilisation de l'actif" },
      { id: 'c', texte: "Les intérêts de l'emprunt qui a financé l'actif et l'impôt sur le résultat" },
      { id: 'd', texte: "Le produit net attendu de la sortie de l'actif en fin de vie" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 36.50 exclut les flux de financement et les flux d'impôt sur le résultat : le coût du financement est déjà reflété par l'actualisation, et le taux est un taux avant impôt (§ 51, § 55). Les frais d'entretien, les frais généraux directement affectables et le flux net de sortie en fin de vie sont au contraire inclus (§ 39, § 41, § 52).",
    articleRef: "IAS 36.39-52",
  },
  {
    id: 'ue13c3-q6',
    question: "La direction prévoit une restructuration l'an prochain, qui réduirait les coûts d'une usine de 20 %. Elle ne s'y est pas encore engagée. Peut-elle intégrer ces économies dans la valeur d'utilité ?",
    options: [
      { id: 'a', texte: "Oui, puisque la décision est probable" },
      { id: 'b', texte: "Non : les flux sont estimés pour l'actif dans son état actuel, hors restructurations futures non engagées ; les économies ne sont prises en compte qu'une fois l'entité engagée" },
      { id: 'c', texte: "Oui, à hauteur de 50 %" },
      { id: 'd', texte: "Oui, si l'auditeur l'accepte" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36.44-48 : les flux sont estimés pour l'actif dans son état actuel ; on exclut les entrées et sorties d'une restructuration future à laquelle l'entité n'est pas encore engagée, ainsi que celles d'une amélioration de performance. Une fois l'entité engagée dans la restructuration, les économies attendues sont reflétées (§ 47). Le budget retenu est aussi plafonné à cinq ans, sauf justification (§ 33).",
    articleRef: "IAS 36.33 et 36.44-48",
  },
  {
    id: 'ue13c3-q7',
    question: "Une filiale congolaise tient ses comptes en francs congolais, mais un actif génère ses flux en dollars. Comment calculer sa valeur d'utilité ?",
    options: [
      { id: 'a', texte: "Convertir chaque flux futur au cours prévisionnel, puis actualiser au taux en CDF" },
      { id: 'b', texte: "Estimer les flux en USD, les actualiser à un taux approprié à l'USD, puis convertir la valeur actualisée au cours au comptant à la date du calcul" },
      { id: 'c', texte: "Actualiser les flux en USD au taux en CDF" },
      { id: 'd', texte: "Retenir la valeur comptable en USD" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36.54 : les flux futurs sont estimés dans la monnaie dans laquelle ils seront générés, actualisés au taux approprié à cette monnaie, puis la valeur actualisée est convertie au cours au comptant à la date du calcul. Mêler des flux en USD et un taux en CDF, qui intègre l'inflation congolaise, fausserait l'évaluation (cohérence flux-taux, § 40).",
    articleRef: "IAS 36.40 et 36.54",
  },
  {
    id: 'ue13c3-q8',
    question: "Un actif a une valeur comptable de 480, une juste valeur diminuée des coûts de sortie de 380 et une valeur d'utilité de 427,5. Quelle perte de valeur comptabiliser ?",
    options: [
      { id: 'a', texte: "100" },
      { id: 'b', texte: "52,5" },
      { id: 'c', texte: "0" },
      { id: 'd', texte: "47,5" },
    ],
    reponseCorrecte: 'b',
    explication: "Valeur recouvrable = max (380 ; 427,5) = 427,5 (IAS 36.18). Perte = 480 − 427,5 = 52,5, comptabilisée immédiatement en résultat net, sauf actif réévalué (§ 59-60). La réponse a oublie que l'entité garderait l'actif plutôt que de le vendre à 380. L'amortissement futur est ensuite calculé sur la nouvelle valeur comptable (§ 63).",
    articleRef: "IAS 36.18 et 36.59-63",
  },
  {
    id: 'ue13c3-q9',
    question: "Un bâtiment réévalué porte un écart de réévaluation de 6 000 000. Il subit une perte de valeur de 15 000 000. Comment la comptabiliser ?",
    options: [
      { id: 'a', texte: "15 000 000 en résultat net" },
      { id: 'b', texte: "6 000 000 en autres éléments du résultat global, en diminution de l'écart, et 9 000 000 en résultat net" },
      { id: 'c', texte: "15 000 000 en autres éléments du résultat global" },
      { id: 'd', texte: "9 000 000 en OCI et 6 000 000 en résultat" },
    ],
    reponseCorrecte: 'b',
    explication: "Pour un actif réévalué, la perte est traitée comme une réévaluation négative : en autres éléments du résultat global à hauteur de l'écart de réévaluation de cet actif, le solde en résultat net (IAS 36.60-61 ; IAS 16.40). C'est l'exemple officiel du SYSCOHADA révisé (Titre VIII, ch. 12, § 2.5) : débit de l'écart de réévaluation pour 6 000 000 et d'une dotation pour 9 000 000. Sur ce point précis, les deux référentiels convergent.",
    articleRef: "IAS 36.60-61 ; SYSCOHADA, Titre VIII, ch. 12",
  },
  {
    id: 'ue13c3-q10',
    question: "La valeur d'utilité d'un actif augmente d'une année sur l'autre uniquement parce que les flux futurs se sont rapprochés (effet de désactualisation). Peut-on reprendre la perte antérieure ?",
    options: [
      { id: 'a', texte: "Oui, dans la limite de la perte" },
      { id: 'b', texte: "Non : une perte de valeur n'est pas reprise du seul fait du passage du temps ; il faut un changement dans les estimations" },
      { id: 'c', texte: "Oui, sans limite" },
      { id: 'd', texte: "Oui, mais en autres éléments du résultat global" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36.114 : reprise si, et seulement si, les estimations utilisées pour déterminer la valeur recouvrable ont changé depuis la dernière perte. Le § 116 écarte expressément la hausse due au seul passage du temps, la désactualisation. La reprise reflète une augmentation du potentiel de service de l'actif (§ 115), pas une mécanique financière.",
    articleRef: "IAS 36.114-116",
  },
  {
    id: 'ue13c3-q11',
    question: "Machine de 30 000 000 amortie sur 10 ans ; perte de 4 000 000 fin N (valeur ramenée à 20 000 000, amortie ensuite sur 8 ans). Fin N+2, la valeur recouvrable remonte à 19 000 000. Quelle reprise ?",
    options: [
      { id: 'a', texte: "4 000 000, toute la perte" },
      { id: 'b', texte: "3 000 000, pour ramener la valeur comptable à 18 000 000, valeur nette qu'elle aurait eue sans dépréciation" },
      { id: 'c', texte: "4 000 000 − 1 000 000 d'amortissements, soit 3 500 000" },
      { id: 'd', texte: "0" },
    ],
    reponseCorrecte: 'b',
    explication: "Fin N+2, la valeur comptable est de 20 000 000 − 2 × 2 500 000 = 15 000 000. Sans perte, elle aurait été de 30 000 000 − 4 × 3 000 000 = 18 000 000. La reprise est plafonnée à ce montant (IAS 36.117) : 18 000 000 − 15 000 000 = 3 000 000, même si la valeur recouvrable atteint 19 000 000. C'est l'exemple officiel du SYSCOHADA révisé, qui retient le même plafond.",
    articleRef: "IAS 36.117 ; SYSCOHADA, Titre VIII, ch. 12, § 2.4.2",
  },
  {
    id: 'ue13c3-q12',
    question: "Une mine exploite une voie ferrée privée qui ne pourrait être vendue que pour sa valeur à la casse et ne génère aucune entrée de trésorerie indépendante. À quel niveau teste-t-on la voie ferrée ?",
    options: [
      { id: 'a', texte: "Au niveau de la voie ferrée seule, à sa valeur à la casse" },
      { id: 'b', texte: "Au niveau de l'unité génératrice de trésorerie à laquelle elle appartient, ici la mine dans son ensemble" },
      { id: 'c', texte: "Au niveau du groupe entier" },
      { id: 'd', texte: "Elle n'est jamais testée" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36.67 prend précisément l'exemple d'une desserte ferroviaire privée d'une mine : sa valeur recouvrable ne peut pas être déterminée isolément, parce qu'elle ne génère pas d'entrées de trésorerie largement indépendantes et que sa valeur d'utilité n'est pas proche de sa juste valeur diminuée des coûts de sortie. On teste donc l'unité génératrice de trésorerie, c'est-à-dire le plus petit groupe d'actifs générant des entrées largement indépendantes (§ 6, § 68) : la mine.",
    articleRef: "IAS 36.66-68",
  },
  {
    id: 'ue13c3-q13',
    question: "Une usine de concentration livre tout son concentré à la fonderie du groupe, mais ce concentré se vend aussi sur un marché actif. L'usine est-elle une UGT distincte ?",
    options: [
      { id: 'a', texte: "Non, puisqu'elle ne vend rien à des tiers" },
      { id: 'b', texte: "Oui : si un marché actif existe pour sa production, elle constitue une UGT, même si la production est utilisée en interne ; on retient les meilleures estimations de prix de pleine concurrence" },
      { id: 'c', texte: "Oui, mais au prix de cession interne" },
      { id: 'd', texte: "Seulement si le groupe le décide" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36.70-71 : s'il existe un marché actif pour la production d'un actif ou d'un groupe d'actifs, cet actif ou ce groupe est une UGT même si la production est utilisée en interne. Les flux sont estimés sur la base des meilleures estimations de prix futurs dans des conditions de concurrence normale, et non des prix de cession internes.",
    articleRef: "IAS 36.70-71",
  },
  {
    id: 'ue13c3-q14',
    question: "Une UGT porte une provision pour remise en état de site que tout acquéreur devrait reprendre. Comment la traiter dans le test ?",
    options: [
      { id: 'a', texte: "On l'ignore : les passifs sont toujours exclus" },
      { id: 'b', texte: "On la déduit à la fois de la valeur comptable de l'UGT et de sa valeur d'utilité, pour comparer des grandeurs homogènes avec la juste valeur, qui en tient compte" },
      { id: 'c', texte: "On la déduit seulement de la valeur d'utilité" },
      { id: 'd', texte: "On l'ajoute à la valeur recouvrable" },
    ],
    reponseCorrecte: 'b',
    explication: "En principe, la valeur comptable d'une UGT exclut les passifs comptabilisés (§ 76(b)). Mais si la sortie de l'UGT oblige l'acheteur à assumer un passif, comme une obligation de remise en état d'une mine, sa juste valeur en tient compte. Pour comparer des grandeurs homogènes, on déduit alors ce passif de la valeur comptable et de la valeur d'utilité (§ 78-79).",
    articleRef: "IAS 36.76 et 36.78-79",
  },
  {
    id: 'ue13c3-q15',
    question: "À quel niveau affecte-t-on le goodwill pour le tester ?",
    options: [
      { id: 'a', texte: "À l'entité juridique acquise, toujours" },
      { id: 'b', texte: "Aux UGT ou groupes d'UGT qui bénéficient des synergies, au niveau le plus bas de suivi interne du goodwill, sans dépasser un secteur opérationnel au sens d'IFRS 8" },
      { id: 'c', texte: "Au groupe consolidé dans son ensemble" },
      { id: 'd', texte: "À l'actif le plus important de l'entité acquise" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36.80 : le goodwill est affecté, dès la date d'acquisition, à chacune des UGT ou groupes d'UGT censés bénéficier des synergies. Chaque unité représente le niveau le plus bas auquel le goodwill est suivi pour la gestion interne, et n'est pas plus grande qu'un secteur opérationnel. Si elle ne peut être achevée pendant l'exercice du regroupement, l'affectation initiale doit l'être « avant la fin du premier exercice commençant après la date d'acquisition » (§ 84).",
    articleRef: "IAS 36.80-84",
  },
  {
    id: 'ue13c3-q16',
    question: "Une UGT (goodwill 300 ; usine 1 200 ; matériel 600 ; marque 300) a une valeur recouvrable de 1 500. Comment répartir la perte de 900, sans plancher particulier ?",
    options: [
      { id: 'a', texte: "Au prorata des quatre actifs, goodwill compris" },
      { id: 'b', texte: "300 au goodwill, puis 600 au prorata des autres actifs : usine 342,9 ; matériel 171,4 ; marque 85,7" },
      { id: 'c', texte: "900 au goodwill, qui devient négatif" },
      { id: 'd', texte: "Tout sur l'usine, l'actif le plus important" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36.104 : la perte réduit d'abord le goodwill affecté à l'UGT, puis les autres actifs au prorata de leur valeur comptable. Ici, 300 sur le goodwill, puis 600 × 1 200 / 2 100 ≈ 342,9 sur l'usine, 600 × 600 / 2 100 ≈ 171,4 sur le matériel, 600 × 300 / 2 100 ≈ 85,7 sur la marque. Le § 105 ajoute un plancher, étudié en section 3.5.",
    articleRef: "IAS 36.104",
  },
  {
    id: 'ue13c3-q17',
    question: "Dans l'UGT précédente, la juste valeur diminuée des coûts de sortie de l'usine est de 1 000. Que change le § 105 ?",
    options: [
      { id: 'a', texte: "Rien" },
      { id: 'b', texte: "L'usine ne peut pas descendre sous 1 000 : sa perte est limitée à 200, et les 142,9 restants sont répartis entre le matériel et la marque au prorata" },
      { id: 'c', texte: "La perte totale est réduite de 142,9" },
      { id: 'd', texte: "L'excédent est porté en goodwill" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36.105 : on ne réduit pas un actif en dessous du plus élevé de sa juste valeur diminuée des coûts de sortie, de sa valeur d'utilité et de zéro ; le montant qui ne peut être imputé est réparti au prorata entre les autres actifs de l'UGT. L'usine supporte 200 ; les 142,9 excédentaires vont pour 95,2 au matériel et pour 47,6 à la marque. La perte totale reste de 900.",
    articleRef: "IAS 36.105",
  },
  {
    id: 'ue13c3-q18',
    question: "Une perte de valeur imputée sur un goodwill en N peut-elle être reprise en N+2, si la valeur de l'UGT remonte ?",
    options: [
      { id: 'a', texte: "Oui, dans la limite de la perte initiale" },
      { id: 'b', texte: "Non, jamais : toute hausse ultérieure correspondrait à un goodwill généré en interne, dont la comptabilisation est interdite" },
      { id: 'c', texte: "Oui, après trois ans" },
      { id: 'd', texte: "Oui, en autres éléments du résultat global" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36.124 : une perte de valeur comptabilisée pour un goodwill ne doit pas être reprise. Le § 125 en donne la raison : la hausse ultérieure de la valeur recouvrable serait vraisemblablement un goodwill généré en interne, que IAS 38 interdit de comptabiliser. La reprise d'une UGT se répartit donc entre ses autres actifs, hors goodwill (§ 122). Le SYSCOHADA révisé pose la même interdiction.",
    articleRef: "IAS 36.122-125",
  },
  {
    id: 'ue13c3-q19',
    question: "Pour une UGT portant un goodwill important, laquelle de ces informations IAS 36.134 exige-t-il ?",
    options: [
      { id: 'a', texte: "Le nom de l'évaluateur" },
      { id: 'b', texte: "Les hypothèses clés, la période de projection, le taux de croissance d'extrapolation, le taux d'actualisation et, si un changement raisonnablement possible d'une hypothèse clé effaçait la marge, une analyse de sensibilité" },
      { id: 'c', texte: "Le détail de tous les flux annuels" },
      { id: 'd', texte: "Aucune information, le test restant interne" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36.134 exige, pour chaque UGT dont le goodwill ou les incorporelles à durée indéterminée sont importants : les valeurs comptables, la base de la valeur recouvrable, les hypothèses clés et l'approche de la direction, la période de projection (justifiée au-delà de 5 ans), le taux de croissance, le taux d'actualisation, et une information de sensibilité si un changement raisonnablement possible d'une hypothèse clé ramenait la valeur recouvrable sous la valeur comptable (§ 134(f)).",
    articleRef: "IAS 36.134",
  },
  {
    id: 'ue13c3-q20',
    question: "Pour le SYSCOHADA révisé, quelle valeur compare-t-on à la VNC lors d'un test de dépréciation d'une immobilisation, en continuité d'exploitation ?",
    options: [
      { id: 'a', texte: "La valeur recouvrable au sens d'IAS 36" },
      { id: 'b', texte: "La valeur actuelle, égale au coût actuel : prix actuel d'achat d'un bien équivalent, corrigé en baisse en fonction de l'âge de l'immobilisation" },
      { id: 'c', texte: "Le prix de revente du bien isolé, dans tous les cas" },
      { id: 'd', texte: "La valeur fiscale" },
    ],
    reponseCorrecte: 'b',
    explication: "Le SYSCOHADA révisé (Titre VIII, ch. 12) retient la valeur actuelle au sens de l'art. 42 de l'AUDCIF, qui y représente le coût actuel, c'est-à-dire le prix actuel d'achat corrigé de l'âge du bien, du point de vue d'un acquéreur de l'entité. Le prix de revente du bien isolé n'est retenu qu'en cas de non-continuité ou de marché très actif. IAS 36 raisonne à l'inverse en valeur de sortie (juste valeur diminuée des coûts de sortie) ou en valeur d'usage (valeur d'utilité).",
    articleRef: "AUDCIF art. 42 et 46 ; SYSCOHADA, Titre VIII, ch. 12",
  },
  {
    id: 'ue13c3-q21',
    question: "Qu'est-ce qui distingue un immeuble de placement d'un bien immobilier occupé par son propriétaire ?",
    options: [
      { id: 'a', texte: "Sa valeur" },
      { id: 'b', texte: "Il est détenu pour en retirer des loyers ou valoriser le capital, et génère des flux de trésorerie largement indépendants des autres actifs de l'entité" },
      { id: 'c', texte: "Il est situé dans une autre ville que le siège" },
      { id: 'd', texte: "Il est financé par emprunt" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 40.5 définit l'immeuble de placement comme un bien immobilier détenu pour en retirer des loyers ou valoriser le capital, plutôt que pour l'utiliser dans la production, à des fins administratives, ou pour le vendre dans l'activité ordinaire. Le § 7 en tire le critère opérationnel : il génère des flux largement indépendants des autres actifs, à la différence d'un bien occupé, dont les flux se confondent avec ceux de l'activité.",
    articleRef: "IAS 40.5 et 40.7",
  },
  {
    id: 'ue13c3-q22',
    question: "Un hôtel appartenant à l'entité est exploité par elle, avec restauration, ménage et réception. Comment le classer ?",
    options: [
      { id: 'a', texte: "En immeuble de placement, puisqu'il génère des loyers" },
      { id: 'b', texte: "En immobilisation corporelle (IAS 16) : les services fournis sont une composante significative de l'activité" },
      { id: 'c', texte: "En stocks" },
      { id: 'd', texte: "En actif détenu en vue de la vente" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 40.11-12 : un bien est un immeuble de placement si les services accessoires sont non significatifs, comme la sécurité ou la maintenance d'un immeuble de bureaux. Lorsque les services sont une composante significative, comme dans un hôtel exploité par son propriétaire, le bien est occupé par son propriétaire et relève d'IAS 16. Le SYSCOHADA révisé cite lui aussi l'hôtel dans son schéma officiel de qualification.",
    articleRef: "IAS 40.11-12 ; SYSCOHADA, Titre VIII, ch. 10",
  },
  {
    id: 'ue13c3-q23',
    question: "Un immeuble de quatre étages vendables séparément est acheté 200 000 000 F ; l'entité occupe un étage et loue les trois autres. Comment le comptabiliser ?",
    options: [
      { id: 'a', texte: "200 000 000 en immeuble de placement" },
      { id: 'b', texte: "50 000 000 en immobilisation corporelle et 150 000 000 en immeuble de placement" },
      { id: 'c', texte: "200 000 000 en immobilisation corporelle" },
      { id: 'd', texte: "Au choix de la direction" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 40.10 : si les parties peuvent être vendues (ou louées en location-financement) séparément, l'entité les comptabilise séparément. Sinon, le bien n'est un immeuble de placement que si la partie occupée est non significative. C'est l'exemple officiel du SYSCOHADA révisé (Titre VIII, ch. 10) : un quart, soit 50 000 000 F, en immobilisations corporelles, trois quarts, soit 150 000 000 F, en immeubles de placement.",
    articleRef: "IAS 40.10 ; SYSCOHADA, Titre VIII, ch. 10",
  },
  {
    id: 'ue13c3-q24',
    question: "Au modèle de la juste valeur, où va la hausse de juste valeur d'un immeuble de placement ?",
    options: [
      { id: 'a', texte: "En autres éléments du résultat global, comme sous IAS 16" },
      { id: 'b', texte: "En résultat net de la période" },
      { id: 'c', texte: "En réserve non distribuable" },
      { id: 'd', texte: "Nulle part : elle est seulement indiquée en notes" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 40.35 : le profit ou la perte résultant d'une variation de juste valeur est comptabilisé en résultat net de la période où il se produit. C'est la grande différence avec le modèle de la réévaluation d'IAS 16, où la hausse passe en autres éléments du résultat global (IAS 16.39). Au modèle de la juste valeur, l'immeuble n'est d'ailleurs pas amorti ni soumis à IAS 36.",
    articleRef: "IAS 40.33-35 ; IAS 16.39",
  },
  {
    id: 'ue13c3-q25',
    question: "Une entité a choisi le modèle du coût pour ses immeubles de placement. Doit-elle déterminer leur juste valeur ?",
    options: [
      { id: 'a', texte: "Non, le modèle du coût l'en dispense" },
      { id: 'b', texte: "Oui : toutes les entités évaluent la juste valeur de leurs immeubles de placement, pour l'évaluation ou pour l'information en notes" },
      { id: 'c', texte: "Seulement si elle est cotée" },
      { id: 'd', texte: "Seulement si la juste valeur est inférieure au coût" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 40.32 : toutes les entités évaluent la juste valeur de leurs immeubles de placement, soit pour les évaluer, soit pour la fournir en notes (§ 79(e)) ; le recours à un évaluateur indépendant est encouragé, sans être obligatoire. La BCDC le rappelait dans son annexe 2018 : « une estimation de la juste valeur des immeubles de placement reste obligatoire, pour la comptabilisation au bilan ou pour la présentation en annexes ».",
    articleRef: "IAS 40.32 et 40.79 ; BCDC, annexe 2018",
  },
  {
    id: 'ue13c3-q26',
    question: "Un bâtiment occupé (valeur nette 800) devient un immeuble de placement évalué à la juste valeur, qui est de 1 100 à cette date. Où va l'écart de 300 ?",
    options: [
      { id: 'a', texte: "En résultat net" },
      { id: 'b', texte: "Il est traité comme une réévaluation IAS 16 : en autres éléments du résultat global, sauf à hauteur d'une perte antérieure du même actif passée en résultat" },
      { id: 'c', texte: "Il n'est pas comptabilisé" },
      { id: 'd', texte: "En diminution du coût" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 40.61-62 : jusqu'à la date du changement d'utilisation, l'entité applique IAS 16 (amortissement, dépréciation) ; à cette date, la différence entre valeur comptable et juste valeur est traitée comme une réévaluation IAS 16. Une hausse va en autres éléments du résultat global, sauf reprise d'une perte antérieure en résultat. À l'inverse, un transfert depuis les stocks passe par le résultat net (§ 63). Les variations ultérieures de juste valeur iront en résultat (§ 35).",
    articleRef: "IAS 40.61-63",
  },
  {
    id: 'ue13c3-q27',
    question: "La direction décide de vendre un immeuble de placement tel quel, sans travaux. Faut-il le reclasser en stocks ?",
    options: [
      { id: 'a', texte: "Oui, dès la décision" },
      { id: 'b', texte: "Non : il reste un immeuble de placement jusqu'à sa décomptabilisation ; seul un changement d'utilisation, comme le début d'un aménagement en vue de la vente, justifie un transfert en stocks" },
      { id: 'c', texte: "Oui, s'il est vendu dans l'année" },
      { id: 'd', texte: "Oui, en immobilisation corporelle" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 40.57 : un transfert n'est possible qu'en cas de changement d'utilisation, et « un changement dans les intentions de la direction quant à l'utilisation d'un bien immobilier ne constitue pas en soi une indication d'un changement d'utilisation ». Le § 58 vise précisément ce cas : la décision de vendre sans aménagement laisse le bien en immeuble de placement jusqu'à sa sortie. Le début d'un aménagement en vue de la vente, en revanche, justifie le transfert en stocks (§ 57(b)). Si les critères d'IFRS 5 sont remplis, un classement en actif détenu en vue de la vente reste à examiner.",
    articleRef: "IAS 40.57-58",
  },
  {
    id: 'ue13c3-q28',
    question: "Sur l'évaluation postérieure des immeubles de placement, qu'est-ce qui distingue le SYSCOHADA révisé d'IAS 40 ?",
    options: [
      { id: 'a', texte: "Rien, les deux offrent le choix entre coût et juste valeur" },
      { id: 'b', texte: "Le SYSCOHADA ne retient que le modèle du coût : les immeubles de placement sont amortis sur leur durée d'utilité, et les transferts n'ont pas d'incidence sur la valeur comptable" },
      { id: 'c', texte: "Le SYSCOHADA impose la juste valeur" },
      { id: 'd', texte: "Le SYSCOHADA interdit la notion d'immeuble de placement" },
    ],
    reponseCorrecte: 'b',
    explication: "Le SYSCOHADA révisé reprend la définition et les critères de classement d'IAS 40 (Titre VIII, ch. 10), avec des comptes dédiés (2281, 2315, 2325). Mais à la clôture, les immeubles de placement « font l'objet d'un amortissement sur leur durée d'utilité », et, « étant donné qu'ils sont évalués selon le modèle du coût historique », les transferts n'ont pas d'incidence sur leur valeur comptable. Le modèle de la juste valeur d'IAS 40.33-35 n'a pas d'équivalent.",
    articleRef: "SYSCOHADA, Titre VIII, ch. 10, § 2.3-2.4 ; IAS 40.30",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '3.1',
    titre: "Pourquoi et quand tester : le plafond de la valeur recouvrable",
    navLabel: 'Pourquoi tester',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Un actif est une ressource dont on attend des avantages. Si ces avantages ne suffisent plus à recouvrer sa valeur comptable, le bilan ment : il affiche une ressource plus grande qu'elle n'est. IAS 36 a un objectif unique : s'assurer que les actifs ne sont pas comptabilisés pour une valeur excédant leur **valeur recouvrable**, c'est-à-dire le montant à recouvrer par leur utilisation ou leur vente (§ 1). Là où IAS 16 et IAS 38 répartissent un coût dans le temps, IAS 36 vérifie que ce coût n'excède pas ce que l'actif peut encore rapporter. L'amortissement consomme la valeur de l'actif ; le test de dépréciation vérifie qu'elle reste recouvrable.",
      },
      {
        type: 'carte',
        titre: "Le champ : une norme générale, définie par ses exclusions (§ 2-5)",
        liste: [
          "**Dans le champ** : immobilisations corporelles et incorporelles, goodwill, immeubles de placement au modèle du coût, droits d'utilisation, participations dans les filiales, coentreprises et entreprises associées.",
          "**Hors champ**, parce qu'une autre norme les évalue déjà à une valeur de sortie ou d'usage : stocks (IAS 2), actifs sur contrats (IFRS 15), actifs d'impôt différé (IAS 12), actifs d'avantages du personnel (IAS 19), actifs financiers (IFRS 9), immeubles de placement à la juste valeur (IAS 40), actifs biologiques à la juste valeur (IAS 41), actifs d'assurance (IFRS 17), actifs détenus en vue de la vente (IFRS 5).",
          "**Actifs réévalués** (§ 5) : si les coûts de sortie sont négligeables, une dépréciation est improbable ; sinon, le test s'applique lorsque la valeur d'utilité est inférieure au montant réévalué.",
        ],
      },
      { type: 'controle', question: QCM[0] },
      {
        type: 'paragraphe',
        texte: "IAS 36 ne demande pas d'estimer chaque année la valeur recouvrable de tous les actifs, ce qui serait coûteux et inutile. À chaque clôture, l'entité recherche s'il existe un **indice** de perte de valeur ; si oui, elle estime la valeur recouvrable (§ 9). Trois catégories échappent à ce filtre et sont testées **chaque année**, au même moment, qu'il y ait un indice ou non : les incorporelles à durée d'utilité indéterminée, les incorporelles pas encore prêtes à être mises en service, et le goodwill (§ 10-11). Ce sont les actifs les plus difficiles à apprécier et ceux qui ne sont pas amortis.",
      },
      {
        type: 'filet',
        titre: "Ce que dit la norme : une obligation de recherche, pas de calcul (§ 9)",
        texte: "« Une entité doit déterminer à la fin de chaque période de présentation de l'information financière s'il existe un quelconque indice qu'un actif a pu se déprécier. S'il existe un tel indice, l'entité doit estimer la valeur recouvrable de l'actif. » Le § 10 ouvre par la formule inverse : « Qu'il y ait un indice de dépréciation ou non, une entité doit aussi » tester chaque année les incorporelles à durée d'utilité indéterminée ou pas encore prêtes à être utilisées, ainsi que le goodwill. La première phrase du § 9 impose une diligence ; seule la seconde impose un calcul.",
      },
      { type: 'controle', question: QCM[1] },
      {
        type: 'tableau',
        tableau: {
          entetes: ['Indices externes (§ 12(a)-(d))', 'Indices internes (§ 12(e)-(g) et § 14)'],
          lignes: [
            ["Baisse de la valeur de l'actif plus forte que l'usure normale", "Obsolescence ou dégradation physique"],
            ["Changements défavorables de l'environnement technologique, économique, juridique ou du marché", "Mise hors service, abandon, restructuration, sortie anticipée, durée d'utilité devenue déterminée"],
            ["Hausse des taux de marché qui augmente le taux d'actualisation", "Performance économique inférieure aux prévisions : flux, résultat ou budget dégradés"],
            ["Actif net comptable supérieur à la capitalisation boursière", "Participations : un dividende est comptabilisé alors que la valeur de la participation dépasse les actifs nets consolidés de l'entité détenue, goodwill compris, ou que le dividende dépasse son résultat global de la période (§ 12(h))"],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Jugement professionnel : les indices dans le contexte congolais",
        texte: "La liste du § 12 est un minimum (§ 13). Dans la pratique congolaise, plusieurs faits méritent d'être examinés comme des indices possibles : une crise sécuritaire qui interrompt l'accès à un site, comme celle que Rawbank décrit pour l'est du pays dans ses états 2025 ; un changement du régime fiscal ou minier qui réduit la rentabilité d'un projet ; une hausse forte des taux directeurs ; une dépréciation rapide du franc congolais qui renchérit des intrants importés. Aucun de ces faits n'impose automatiquement une perte. Chacun impose de se poser la question, et de documenter la réponse. Le principe d'importance relative s'applique (§ 15), et un indice peut aussi conduire à revoir la durée d'utilité, le mode ou la valeur résiduelle de l'actif (§ 17).",
      },
      { type: 'controle', question: QCM[2] },
    ],
  },
  {
    numero: '3.2',
    titre: "La valeur recouvrable : juste valeur de sortie ou valeur d'usage",
    navLabel: 'Valeur recouvrable',
    blocs: [
      {
        type: 'paragraphe',
        texte: "IAS 36 définit la valeur recouvrable comme « la valeur la plus élevée entre sa juste valeur diminuée des coûts de sortie et sa valeur d'utilité » (§ 6 ; même formule au § 18). La **juste valeur diminuée des coûts de sortie** est le prix qu'obtiendraient des intervenants du marché (IFRS 13), net des coûts marginaux directement attribuables à la sortie : frais d'actes, droits, enlèvement, mise en état de vente, mais pas les charges financières, l'impôt, les indemnités de rupture ou les coûts de restructuration (§ 28). La **valeur d'utilité** est la valeur actualisée des flux que l'entité attend de l'utilisation continue de l'actif et de sa sortie en fin de vie (§ 30-31). Si l'une des deux dépasse la valeur comptable, inutile de calculer l'autre (§ 19).",
      },
      { type: 'controle', question: QCM[3] },
      {
        type: 'filet',
        titre: "Ce que dit la norme : juste valeur et valeur d'utilité ne sont pas la même chose (§ 53A)",
        texte: "« La juste valeur diffère de la valeur d'utilité. La juste valeur reflète les hypothèses que les intervenants du marché utiliseraient pour fixer le prix de l'actif. Par contre, la valeur d'utilité reflète les effets des facteurs qui peuvent être spécifiques à l'entité et ne pas s'appliquer aux entités en général. » La norme énumère ensuite ce que la juste valeur ne reflète pas : la valeur supplémentaire tirée d'un regroupement d'actifs, les synergies avec d'autres actifs, les droits ou restrictions juridiques propres au propriétaire actuel, ses avantages ou charges fiscaux spécifiques. Le Cadre de 2018 fait la même distinction entre valeurs de marché et valeurs spécifiques à l'entité (§ 6.12, 6.17-6.19). Si la juste valeur ne peut pas être évaluée faute de base fiable, l'entité peut retenir la valeur d'utilité ; s'il n'existe aucune raison de penser que la valeur d'utilité excède de façon significative la juste valeur diminuée des coûts de sortie, ce qui sera souvent le cas d'un actif détenu en vue d'être sorti, on peut retenir cette dernière (§ 20-21).",
      },
      {
        type: 'carte',
        titre: "Les règles de construction de la valeur d'utilité",
        liste: [
          "**Des hypothèses raisonnables et justifiables**, privilégiant les éléments externes (§ 33(a)), dont la direction vérifie le réalisme en examinant les écarts passés entre prévisions et réalisations (§ 34).",
          "**Des budgets approuvés, sur cinq ans au plus**, sauf justification (§ 33(b), § 35) ; au-delà, une extrapolation à un taux de croissance stable ou décroissant, qui ne dépasse pas le taux moyen à long terme du secteur, du pays ou du marché (§ 33(c), § 36-37).",
          "**L'actif dans son état actuel** : ni restructuration future non engagée, ni amélioration de performance (§ 44-48) ; mais les dépenses nécessaires au maintien du niveau d'avantages sont incluses (§ 49).",
          "**Ce qui entre** : encaissements de l'utilisation, décaissements nécessaires (entretien, frais généraux directement affectables), flux nets de sortie en fin de vie (§ 39, 41, 52-53).",
          "**Ce qui sort** : flux de financement et d'impôt sur le résultat (§ 50) ; flux d'actifs qui génèrent des entrées indépendantes, comme des créances ; sorties liées à des passifs déjà comptabilisés (§ 43).",
          "**Un taux avant impôt**, qui reflète la valeur temps de l'argent et les risques spécifiques à l'actif non déjà intégrés aux flux (§ 55-57), estimé par exemple à partir du coût moyen pondéré du capital d'une entité cotée comparable, ajusté (annexe A15-A21).",
        ],
      },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[5] },
      {
        type: 'carte',
        titre: "Pas à pas : la valeur d'utilité d'une ligne d'embouteillage (en milliers de USD)",
        texte: "Flux nets de trésorerie avant impôt et hors financement, tirés du budget approuvé : année 1, 120 ; année 2, 130 ; année 3, 125 ; année 4, 110 ; année 5, 100, plus 40 de produit net de sortie en fin de vie. Taux d'actualisation avant impôt : 14 %. Valeur comptable : 480. Juste valeur diminuée des coûts de sortie : 380.",
        tableau: {
          entetes: ['Année', 'Flux', "Facteur d'actualisation (14 %)", 'Valeur actualisée'],
          lignes: [
            ['1', '120', '0,8772', '105,3'],
            ['2', '130', '0,7695', '100,0'],
            ['3', '125', '0,6750', '84,4'],
            ['4', '110', '0,5921', '65,1'],
            ['5', '100 + 40 = 140', '0,5194', '72,7'],
            ['**Valeur d\'utilité**', '', '', '**427,5**'],
          ],
        },
        note: "Valeur recouvrable = max (380 ; 427,5) = 427,5. Perte de valeur = 480 − 427,5 = 52,5, en résultat net. L'amortissement futur est recalculé sur 427,5 (§ 63).",
      },
      { type: 'controle', question: QCM[7] },
      {
        type: 'filet',
        titre: "Jugement professionnel : dollars, francs congolais et cohérence flux-taux",
        texte: "Beaucoup d'actifs congolais génèrent des flux en dollars alors que la comptabilité est tenue en francs congolais. IAS 36.54 tranche : on estime les flux dans leur monnaie d'origine, on les actualise à un taux approprié à cette monnaie, puis on convertit la valeur actualisée au cours au comptant de la date du calcul. Le § 40 ajoute une règle de cohérence : un taux nominal s'applique à des flux nominaux, un taux réel à des flux réels. Actualiser des flux en dollars au taux d'un emprunt en francs, qui intègre l'inflation locale, compterait deux fois un risque monétaire que les flux ne portent pas.",
      },
      { type: 'controle', question: QCM[6] },
    ],
  },
  {
    numero: '3.3',
    titre: "Comptabiliser la perte, puis la reprendre",
    navLabel: 'Perte et reprise',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Si la valeur recouvrable est inférieure à la valeur comptable, celle-ci est ramenée à la valeur recouvrable ; la différence est une perte de valeur (§ 59), comptabilisée immédiatement en résultat net (§ 60). Pour un actif réévalué, la perte est traitée comme une réévaluation négative : elle réduit d'abord l'écart de réévaluation de cet actif, en autres éléments du résultat global, et le solde va en résultat net (§ 61). L'amortissement des périodes suivantes est calculé sur la nouvelle valeur comptable (§ 63), et les impôts différés sont ajustés (§ 64).",
      },
      { type: 'controle', question: QCM[8] },
      {
        type: 'paragraphe',
        texte: "À chaque clôture, l'entité recherche aussi les indices qu'une perte antérieure a diminué ou disparu, en miroir des indices de perte (§ 110-111). Une reprise n'est admise que si les **estimations** qui ont servi à déterminer la valeur recouvrable ont changé (§ 114), ce qui traduit un accroissement du potentiel de service de l'actif (§ 115). Le seul passage du temps, qui rapproche les flux et augmente mécaniquement leur valeur actualisée, ne suffit pas (§ 116).",
      },
      {
        type: 'filet',
        titre: "Ce que dit la norme : « si, et seulement si » (§ 59, § 114, § 116)",
        texte: "La perte : « Si, et seulement si, la valeur recouvrable d'un actif est inférieure à sa valeur comptable, la valeur comptable de l'actif doit être ramenée à sa valeur recouvrable. Cette réduction est une perte de valeur. » (§ 59). La reprise : la perte d'un actif autre qu'un goodwill « doit être reprise si, et seulement si, il y a eu un changement dans les estimations utilisées pour déterminer la valeur recouvrable de l'actif depuis la dernière comptabilisation d'une perte de valeur » (§ 114). Et la limite : « une perte de valeur n'est pas reprise du simple fait du passage du temps (parfois nommé « désactualisation ») même si la valeur recouvrable de l'actif devient supérieure à sa valeur comptable » (§ 116). La même tournure encadre les deux mouvements : la norme ne laisse pas de choix, ni pour constater la perte, ni pour la reprendre.",
      },
      { type: 'controle', question: QCM[9] },
      {
        type: 'carte',
        titre: "Pas à pas : perte puis reprise plafonnée (exemple officiel du SYSCOHADA, lu en IFRS)",
        liste: [
          "**Donnée.** Matériel de 30 000 000 F acquis début N-1, amorti sur 10 ans, soit 3 000 000 F par an ; valeur nette fin N : 24 000 000 F.",
          "**Fin N.** Valeur recouvrable 20 000 000 F : perte de **4 000 000 F**. Nouvel amortissement : 20 000 000 / 8 = 2 500 000 F par an.",
          "**Fin N+2.** Valeur comptable : 20 000 000 − 2 × 2 500 000 = 15 000 000 F. Valeur qu'elle aurait eue sans perte : 30 000 000 − 4 × 3 000 000 = **18 000 000 F**, qui constitue le plafond (§ 117).",
          "**Si la valeur recouvrable remonte à 17 000 000 F** : reprise de 2 000 000 F, en résultat net (§ 119).",
          "**Si elle remonte à 19 000 000 F** : reprise limitée à 3 000 000 F. Au-delà, ce serait une réévaluation, qui ne peut intervenir que dans le cadre du modèle de la réévaluation d'IAS 16 (§ 118).",
        ],
        note: "Le SYSCOHADA révisé (Titre VIII, ch. 12, § 2.4.2) retient le même plafond et les mêmes chiffres. La différence entre les deux référentiels ne porte pas sur la mécanique, mais sur la valeur à laquelle on compare la VNC (section 3.7).",
      },
      { type: 'controle', question: QCM[10] },
    ],
  },
  {
    numero: '3.4',
    titre: "Les unités génératrices de trésorerie",
    navLabel: 'UGT',
    blocs: [
      {
        type: 'paragraphe',
        texte: "La plupart des actifs ne génèrent pas de flux à eux seuls. Un four ne vend rien sans le broyeur, le broyeur sans l'ensacheuse. IAS 36 impose alors de tester l'**unité génératrice de trésorerie** (UGT), définie comme « le plus petit groupe identifiable d'actifs qui génère des entrées de trésorerie largement indépendantes des entrées de trésorerie générées par d'autres actifs ou groupes d'actifs » (§ 6). On teste l'actif isolé si possible ; à défaut, son UGT (§ 66-67). Identifier l'UGT est une affaire de jugement, qui tient compte de la manière dont la direction suit les activités et décide de les poursuivre ou de les arrêter (§ 68-69).",
      },
      {
        type: 'carte',
        titre: "Trois repères de la norme pour délimiter une UGT",
        liste: [
          "**La desserte ferroviaire d'une mine** (§ 67) : elle « ne pourrait être vendue que pour sa valeur à la casse » et ne génère pas d'entrées largement indépendantes ; sa valeur d'utilité ne pouvant être déterminée, l'entité teste l'UGT, « c'est-à-dire la mine dans son ensemble ».",
          "**Le transporteur sous contrat municipal** (§ 68) : cinq itinéraires, mais un contrat qui interdit d'en abandonner un ; l'UGT est l'ensemble des cinq.",
          "**Le marché actif** (§ 70-71) : un groupe d'actifs dont la production a un marché actif est une UGT, même si la production est entièrement consommée en interne ; on raisonne alors aux prix de pleine concurrence, pas aux prix de cession interne.",
        ],
        note: "Les UGT sont identifiées de façon cohérente d'une période à l'autre ; tout changement doit être justifié et expliqué dans les notes (§ 72-73, § 130).",
      },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[12] },
      {
        type: 'paragraphe',
        texte: "La valeur comptable de l'UGT doit être construite de manière cohérente avec sa valeur recouvrable (§ 75). Elle comprend les seuls actifs directement attribuables ou affectables à l'UGT et exclut en principe les passifs comptabilisés (§ 76). Exception importante pour le secteur extractif : si la sortie de l'UGT impose à l'acheteur de reprendre un passif, comme une obligation de remise en état, la juste valeur de l'UGT en tient compte. Pour comparer des grandeurs homogènes, on déduit alors ce passif de la valeur comptable **et** de la valeur d'utilité (§ 78-79).",
      },
      {
        type: 'carte',
        titre: "Pas à pas : une mine avec provision de remise en état (en millions de USD)",
        liste: [
          "**Donnée.** Actifs de l'UGT : 900. Provision de remise en état comptabilisée : 300, que tout acquéreur reprendrait. Juste valeur de la mine, obligation de remise en état comprise, diminuée des coûts de sortie : 550. Valeur d'utilité des flux d'exploitation, hors décaissements de remise en état : 800.",
          "**Valeur comptable comparable** : 900 − 300 = 600.",
          "**Valeur d'utilité comparable** : 800 − 300 = 500.",
          "**Valeur recouvrable** : max (550 ; 500) = **550**.",
          "**Perte de valeur** : 600 − 550 = **50**, répartie entre les actifs de l'UGT.",
          "**Erreur à éviter** : comparer 900 à 800 (perte de 100), ou 600 à 800 (aucune perte). Seule la comparaison homogène donne la bonne réponse.",
        ],
      },
      { type: 'controle', question: QCM[13] },
    ],
  },
  {
    numero: '3.5',
    titre: "Goodwill, actifs communs et cascade d'imputation",
    navLabel: 'Goodwill',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le goodwill ne génère aucun flux à lui seul (§ 81). Il est donc affecté, dès l'acquisition, aux UGT ou groupes d'UGT censés bénéficier des synergies du regroupement, au niveau le plus bas où il est suivi par la gestion interne, sans dépasser un secteur opérationnel au sens d'IFRS 8 (§ 80). Si l'affectation initiale ne peut être achevée pendant l'exercice du regroupement, elle doit l'être « avant la fin du premier exercice commençant après la date d'acquisition » (§ 84). En cas de cession d'une activité de l'UGT, une quote-part du goodwill part avec elle, en principe selon les valeurs relatives de la partie cédée et de la partie conservée (§ 86) ; en cas de réorganisation des UGT, il est réaffecté selon la même logique (§ 87).",
      },
      { type: 'controle', question: QCM[14] },
      {
        type: 'carte',
        titre: "L'ordre des tests (§ 96-99) et les actifs communs (§ 100-103)",
        liste: [
          "**Quand** : chaque année, à la même date, et à chaque indice ; le goodwill acquis dans l'exercice est testé avant la clôture (§ 90, § 96).",
          "**Dans quel ordre** : d'abord les actifs de l'UGT présentant un indice, puis l'UGT, puis le groupe d'UGT qui porte le goodwill (§ 97-98).",
          "**Actifs communs** (siège, système informatique, centre de recherche) : ils ne génèrent pas d'entrées indépendantes. On affecte leur valeur comptable aux UGT sur une base raisonnable et cohérente ; si c'est impossible, on teste l'UGT sans eux, puis le plus petit groupe d'UGT auquel ils peuvent être affectés (§ 102).",
          "**Calcul reporté** : un calcul détaillé antérieur peut être réutilisé si la composition de l'unité n'a pas changé, si la marge était substantielle et s'il est très improbable qu'elle ait disparu (§ 99).",
        ],
      },
      {
        type: 'paragraphe',
        texte: "Lorsque la valeur recouvrable de l'UGT est inférieure à sa valeur comptable, la perte est imputée **dans un ordre imposé** (§ 104) : d'abord le goodwill affecté à l'UGT, puis les autres actifs au prorata de leur valeur comptable. Un plancher protège chaque actif : on ne le réduit pas en dessous du plus élevé de sa juste valeur diminuée des coûts de sortie, de sa valeur d'utilité, si elle est déterminable, et de zéro. Ce qui ne peut pas lui être imputé est réparti entre les autres actifs (§ 105).",
      },
      {
        type: 'filet',
        titre: "Ce que dit la norme : l'ordre et le plancher (§ 104-105, § 124)",
        texte: "La perte d'une UGT « doit être répartie, en réduction de la valeur comptable des actifs de l'unité (du groupe d'unités) dans l'ordre suivant : (a) tout d'abord, réduction de la valeur comptable de tout goodwill affecté à l'unité génératrice de trésorerie (au groupe d'unités) ; et (b) ensuite, réduction des autres actifs de l'unité (du groupe d'unités) au prorata de la valeur comptable de chaque actif dans l'unité (le groupe d'unités). » (§ 104). Le plancher : l'entité « ne doit pas réduire la valeur comptable d'un actif en dessous du plus élevé de : (a) sa juste valeur diminuée des coûts de sortie (si on peut l'évaluer) ; (b) sa valeur d'utilité (si on peut la déterminer) ; et (c) zéro. » (§ 105). Et le sens unique : « Une perte de valeur comptabilisée pour un goodwill ne doit pas être reprise lors d'une période ultérieure. » (§ 124).",
      },
      {
        type: 'carte',
        titre: "Pas à pas : la cascade de BRASSERIE DU FLEUVE (société fictive)",
        texte: "UGT : goodwill 300 ; usine 1 200 ; matériel 600 ; marque acquise 300 ; valeur comptable totale 2 400. Valeur recouvrable de l'UGT : 1 500. Juste valeur diminuée des coûts de sortie de l'usine : 1 000.",
        tableau: {
          entetes: ['Actif', 'Valeur comptable', 'Imputation sans plancher', 'Imputation avec plancher (§ 105)', 'Valeur après test'],
          lignes: [
            ['Goodwill', '300', '300', '300', '0'],
            ['Usine', '1 200', '342,9', '200 (plancher 1 000)', '1 000'],
            ['Matériel', '600', '171,4', '171,4 + 95,2 = 266,7', '333,3'],
            ['Marque', '300', '85,7', '85,7 + 47,6 = 133,3', '166,7'],
            ['**Total**', '**2 400**', '**900**', '**900**', '**1 500**'],
          ],
        },
        note: "Les 142,9 que l'usine ne peut pas absorber sont répartis entre le matériel et la marque au prorata de leurs valeurs comptables (600 et 300). Si la valeur de l'UGT remonte plus tard, la reprise se répartit entre l'usine, le matériel et la marque, dans la limite de ce qu'aurait été leur valeur sans perte ; jamais sur le goodwill (§ 122-125).",
      },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[16] },
      { type: 'controle', question: QCM[17] },
      {
        type: 'filet',
        titre: "Pour aller plus loin : les participations ne donnant pas le contrôle (annexe C)",
        texte: "Si les participations ne donnant pas le contrôle ont été évaluées à leur quote-part de l'actif net identifiable, le goodwill comptabilisé ne représente que la part du groupe. Or la valeur recouvrable de l'UGT reflète 100 % de ses flux. Pour comparer des grandeurs homogènes, on majore donc, pour les besoins du test, la valeur comptable du goodwill de la part théorique des minoritaires (C4). La perte qui en résulte est répartie entre la mère et les minoritaires selon la clé d'affectation du résultat, et la part afférente au goodwill non comptabilisé des minoritaires n'est pas comptabilisée (C8). Ce point sera repris avec les regroupements d'entreprises.",
      },
    ],
  },
  {
    numero: '3.6',
    titre: "Informer : ce que le lecteur doit pouvoir vérifier",
    navLabel: 'Informations',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Un test de dépréciation repose sur des prévisions, des taux et des choix d'agrégation que le lecteur ne peut pas refaire. IAS 36 compense cette asymétrie par des informations nombreuses. Par catégorie d'actifs : pertes et reprises en résultat net et en autres éléments du résultat global (§ 126), et par secteur (§ 129). Pour chaque perte ou reprise significative : les événements qui l'ont provoquée, le montant, la nature de l'actif ou la description de l'UGT, la base de la valeur recouvrable et, selon le cas, le niveau de la hiérarchie de juste valeur, la technique et les hypothèses clés, ou le taux d'actualisation (§ 130).",
      },
      {
        type: 'filet',
        titre: "Ce que dit la norme : la sensibilité (§ 134(f))",
        texte: "Pour chaque UGT portant un goodwill ou une incorporelle à durée d'utilité indéterminée importants, l'entité indique les hypothèses clés, la période de projection, le taux de croissance d'extrapolation et le taux d'actualisation (§ 134(a)-(e)). Le point (f) vise le cas où, « lorsqu'un changement raisonnablement possible d'une hypothèse clé sur laquelle la direction a fondé sa détermination de la valeur recouvrable de l'unité (du groupe d'unités) ferait en sorte que la valeur comptable de l'unité (du groupe d'unités) excède sa valeur recouvrable ». L'entité fournit alors « le montant de l'excédent de la valeur recouvrable de l'unité (du groupe d'unités) sur sa valeur comptable », « la valeur attribuée à l'hypothèse clé », et le montant du changement qui ramènerait la valeur recouvrable au niveau de la valeur comptable. C'est l'information la plus utile au lecteur : elle dit à quelle distance se trouve la prochaine dépréciation.",
      },
      { type: 'controle', question: QCM[18] },
      {
        type: 'carte',
        titre: "Grille de revue d'un test de dépréciation",
        liste: [
          "**Budgets** : approuvés par la direction ? Limités à cinq ans ? Écarts passés entre prévisions et réalisations analysés (§ 33-34) ?",
          "**Croissance terminale** : inférieure ou égale au taux moyen à long terme du pays et du secteur (§ 33(c)) ?",
          "**Périmètre des flux** : restructurations non engagées, investissements d'amélioration, financement et impôt exclus (§ 44-50) ?",
          "**Taux** : avant impôt, cohérent avec la monnaie et avec le traitement de l'inflation, sans double comptage du risque (§ 40, § 54-56) ?",
          "**Valeur comptable** : construite sur le même périmètre que la valeur recouvrable, passifs repris par l'acheteur compris le cas échéant (§ 75-79) ?",
          "**Imputation** : goodwill d'abord, puis prorata, plancher du § 105 respecté ?",
        ],
      },
    ],
  },
  {
    numero: '3.7',
    titre: "Passerelle SYSCOHADA : la même mécanique, une autre valeur",
    navLabel: 'Passerelle SYSCOHADA',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le SYSCOHADA révisé déclare s'inspirer d'IAS 36 (Titre VIII, ch. 12). Il en reprend l'essentiel de la mécanique : recherche d'indices à chaque clôture, avec une liste presque identique ; dépréciation obligatoire même en l'absence de bénéfice (art. 46) ; nouveau plan d'amortissement après dépréciation ; reprise plafonnée à la valeur nette qu'aurait eue l'actif sans dépréciation ; imputation d'abord sur le goodwill au sein d'un groupe d'actifs, sans reprise possible ; imputation sur l'écart de réévaluation pour un actif réévalué. Mais il compare la VNC à une autre valeur.",
      },
      {
        type: 'tableau',
        tableau: {
          entetes: ['', 'IAS 36', 'SYSCOHADA révisé'],
          lignes: [
            ['Valeur de comparaison', 'Valeur recouvrable : max (juste valeur − coûts de sortie ; valeur d\'utilité)', 'Valeur actuelle (art. 42), égale au coût actuel'],
            ['Nature', 'Valeur de sortie ou valeur d\'usage', "Valeur d'entrée : prix actuel d'achat d'un bien équivalent, corrigé de l'âge"],
            ['Point de vue', 'Intervenants du marché, ou entité elle-même', "Un acquéreur de l'entité, en continuité d'exploitation"],
            ['Prix de revente du bien isolé', 'Composante possible, via la juste valeur', 'Retenu seulement en non-continuité ou si le marché est très actif'],
            ['Seuil', 'Toute perte, sous réserve de l\'importance relative', 'Écart « significatif » entre VNC et valeur actuelle'],
            ['Niveau du test', 'UGT, définie par l\'indépendance des entrées', "Groupe d'actifs suivi par ligne de produits, secteur ou implantation"],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Jugement professionnel : le pont roulant du SYSCOHADA",
        texte: "Le SYSCOHADA illustre sa logique par un pont roulant de 30 tonnes acquis 300 000 000 F et mis en service le 31 décembre : un acquéreur de l'entité ne l'estimerait pas moins de 300 000 000 F, puisque c'est ce qu'il faudrait payer pour disposer du même matériel neuf, alors qu'à la revente on en tirerait « peut-être à peine la moitié ». Pas de dépréciation, donc. IAS 36 aboutirait au même résultat, mais par un autre chemin : si l'usine est rentable, la valeur d'utilité de l'UGT à laquelle appartient le pont couvre sa valeur comptable. Les deux référentiels divergent en revanche lorsque le prix du neuf baisse sans que les flux baissent (le SYSCOHADA déprécie, IAS 36 non), ou lorsque les flux s'effondrent alors que le prix du neuf tient (IAS 36 déprécie, le SYSCOHADA peut ne rien voir).",
      },
      { type: 'controle', question: QCM[19] },
    ],
  },
  {
    numero: '3.8',
    titre: "IAS 40 : qu'est-ce qu'un immeuble de placement ?",
    navLabel: 'IAS 40 : classer',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Un **immeuble de placement** est « un bien immobilier (terrain ou bâtiment — ou partie d'un bâtiment — ou les deux) détenu (par le propriétaire ou, en tant qu'actif au titre du droit d'utilisation, par le preneur) pour en retirer des loyers ou pour réaliser une plus-value en capital ou les deux, plutôt que pour : (a) l'utiliser dans la production ou la fourniture de biens ou de services ou à des fins administratives ; ou (b) le vendre dans le cadre de l'activité ordinaire » (IAS 40.5). Son critère distinctif est économique : « un immeuble de placement génère des flux de trésorerie largement indépendants des autres actifs détenus par l'entité » (§ 7). Un immeuble de bureaux loué rapporte des loyers par lui-même ; le siège d'une banque ne rapporte rien sans l'activité bancaire.",
      },
      {
        type: 'tableau',
        tableau: {
          entetes: ['Immeuble de placement (§ 8)', 'Pas un immeuble de placement (§ 9)'],
          lignes: [
            ['Terrain détenu pour une plus-value à long terme', 'Bien destiné à la vente dans l\'activité ordinaire, ou en construction pour une telle vente (IAS 2)'],
            ['Terrain dont l\'utilisation future est indéterminée', 'Bien occupé par son propriétaire, y compris par son personnel, même contre loyer (IAS 16)'],
            ['Bâtiment donné en location simple', 'Bien occupé en attendant d\'être vendu'],
            ['Bâtiment vacant, détenu pour être loué', 'Bien donné en location-financement à une autre entité'],
            ['Bien en construction pour un usage futur d\'immeuble de placement', 'Bien en construction pour compte de tiers'],
          ],
        },
      },
      { type: 'controle', question: QCM[20] },
      {
        type: 'carte',
        titre: "Arbre de décision : classer un bien immobilier",
        liste: [
          "**1.** Est-il détenu pour être vendu dans le cours normal de l'activité, ou aménagé en vue de cette vente ? Oui : **stocks** (IAS 2).",
          "**2.** Sa vente est-elle hautement probable dans les douze mois, dans son état actuel ? Oui : examiner **IFRS 5**.",
          "**3.** Est-il occupé par l'entité, ou par son personnel ? Oui : **IAS 16** (ou IFRS 16 s'il est détenu en location).",
          "**4.** Est-il loué avec des services significatifs, comme un hôtel exploité par son propriétaire ? Oui : **IAS 16** (§ 11-13).",
          "**5.** Est-il mixte ? Si les parties sont vendables ou louables séparément, les comptabiliser séparément ; sinon, immeuble de placement seulement si la partie occupée est non significative (§ 10).",
          "**6.** Sinon : **immeuble de placement** (IAS 40). Dans les comptes consolidés, un bien loué à une autre entité du groupe est un bien occupé par le groupe (§ 15).",
        ],
        note: "Quand le classement est délicat, l'entité fixe des critères cohérents et les indique dans les notes (§ 14, § 75(c)). Le SYSCOHADA révisé propose un schéma officiel très proche : stock, puis occupation, puis services accessoires significatifs (Titre VIII, ch. 10).",
      },
      { type: 'controle', question: QCM[21] },
      { type: 'controle', question: QCM[22] },
      {
        type: 'filet',
        titre: "Dans les comptes publiés : les immeubles saisis par les banques",
        texte: "Une banque congolaise récupère souvent des immeubles en règlement de créances impayées. Où les classer ? BOA RDC (note 3.13, 2018) les présente en « actifs disponibles à la vente », « dans la mesure où leur valeur comptable sera recouvrée en les cédant plutôt qu'en les utilisant », évalués selon IFRS 5 au plus faible de la valeur nette comptable et de la « valeur réalisable nette ». Deux remarques. IFRS 5 retient la juste valeur diminuée des coûts de la vente, et non la valeur réalisable nette, notion d'IAS 2. Et le classement en IFRS 5 suppose que la vente soit hautement probable, en principe dans les douze mois. Un immeuble saisi, conservé plusieurs années en attente d'un acheteur et loué entre-temps, relève plutôt d'IAS 40.",
      },
    ],
  },
  {
    numero: '3.9',
    titre: "IAS 40 : évaluer au coût ou à la juste valeur",
    navLabel: 'IAS 40 : évaluer',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Un immeuble de placement détenu en propre est comptabilisé selon les critères habituels de probabilité et de fiabilité (§ 16), et évalué initialement **au coût**, coûts de transaction compris : prix d'achat, honoraires juridiques, droits de mutation (§ 20-21). Sont exclus les coûts de démarrage non nécessaires, les pertes d'exploitation avant le niveau d'occupation prévu et les gaspillages anormaux (§ 23). Les règles du paiement différé et des échanges sont celles d'IAS 16 (§ 24-29). Ensuite, l'entité choisit une méthode comptable unique pour **tous** ses immeubles de placement : le modèle de la juste valeur ou le modèle du coût (§ 30), sauf l'option du § 32A, qui permet un choix distinct pour les immeubles adossés à des passifs dont le rendement est directement lié à leur juste valeur ou au rendement qu'ils procurent.",
      },
      {
        type: 'tableau',
        tableau: {
          entetes: ['', 'Modèle de la juste valeur (§ 33-55)', 'Modèle du coût (§ 56, 79)'],
          lignes: [
            ['Valeur au bilan', 'Juste valeur à la clôture (IFRS 13)', 'Coût − amortissements − pertes de valeur (IAS 16)'],
            ['Amortissement', 'Aucun', 'Oui, par composants'],
            ['Variations de valeur', '**En résultat net** (§ 35)', 'Pertes de valeur selon IAS 36'],
            ['Juste valeur', 'Au bilan', 'Obligatoirement fournie en notes (§ 32, § 79(e))'],
            ['Test IAS 36', 'Non (hors champ)', 'Oui'],
          ],
        },
      },
      { type: 'controle', question: QCM[23] },
      {
        type: 'carte',
        titre: "Pas à pas : un immeuble de bureaux à Lubumbashi, sous les deux modèles (en milliers de USD)",
        texte: "Acquis début N pour 2 000, frais d'acquisition compris : terrain 500, bâtiment 1 500 amorti sur 30 ans. Juste valeur fin N : 2 300. Loyers de N : 180.",
        tableau: {
          entetes: ['', 'Modèle de la juste valeur', 'Modèle du coût'],
          lignes: [
            ['Valeur au bilan fin N', '2 300', '2 000 − 50 = 1 950'],
            ['Amortissement de N', '0', '1 500 / 30 = 50'],
            ['Variation de juste valeur en résultat', '+ 300', '0'],
            ['Effet sur le résultat de N (hors charges)', '180 + 300 = 480', '180 − 50 = 130'],
            ['Information en notes', 'Rapprochement des justes valeurs (§ 76)', 'Juste valeur : 2 300 (§ 79(e))'],
          ],
        },
        note: "Le modèle de la juste valeur rend le résultat sensible au marché immobilier : un recul de 15 % de la juste valeur en N+1 ferait passer 345 en perte. Le § 31 avertit : « Il est hautement improbable que l'abandon du modèle de la juste valeur pour le modèle du coût permette une présentation plus appropriée. »",
      },
      {
        type: 'carte',
        titre: "Trois règles techniques du modèle de la juste valeur",
        liste: [
          "**Pas de double comptage** (§ 50) : ascenseurs, climatisation ou mobilier compris dans la juste valeur de l'immeuble ne sont pas comptabilisés séparément ; les loyers payés d'avance ou à recevoir sont des actifs ou passifs distincts.",
          "**Une présomption réfutable de fiabilité** (§ 53-55) : si, exceptionnellement, la juste valeur ne peut être déterminée de façon fiable et continue, faute de marché actif et d'autre méthode fiable, l'immeuble est évalué au coût, avec une valeur résiduelle présumée nulle. Un immeuble en construction est évalué au coût jusqu'à ce que sa juste valeur devienne fiable ou jusqu'à son achèvement (§ 53A-53B).",
          "**Une fois à la juste valeur, toujours à la juste valeur** (§ 55) : même si les transactions comparables se raréfient.",
        ],
      },
      { type: 'controle', question: QCM[24] },
      {
        type: 'filet',
        titre: "Dans les comptes publiés : les immeubles de placement de la BCDC",
        texte: "Dans son annexe 2018, la BCDC indique qu'à la date de première adoption, elle avait « opté pour la réévaluation de ses immeubles de placement par référence à leur valeur d'expertise au 31/12/2012 » et que, « pour les évaluations ultérieures, le modèle retenu est celui du coût amorti basé sur l'approche par composants ». C'est l'usage classique du coût présumé d'IFRS 1 (chapitre 7), suivi du modèle du coût. La même annexe publie un tableau instructif, qui compare pour chaque catégorie la durée « en social » et la durée « IFRS » ; d'après la mise en page reproduite, 4 ans contre 5 ans pour le matériel roulant, 10 ans contre 5 à 10 ans pour le matériel monétique. Deux jeux d'états, deux durées pour le même bien.",
      },
      {
        type: 'filet',
        titre: "Passerelle SYSCOHADA : la définition sans la juste valeur",
        texte: "Le SYSCOHADA révisé reprend la définition, les exemples et les cas particuliers d'IAS 40, avec des comptes dédiés (2281 Terrains immeubles de placement, 2315 et 2325 Bâtiments immeubles de placement). Mais il n'en reprend pas le modèle de la juste valeur : à la clôture, les immeubles de placement sont amortis sur leur durée d'utilité, et les transferts entre catégories n'ont pas d'incidence sur leur valeur comptable. Il évalue aussi l'immeuble acquis par échange à la valeur comptable de l'actif remis, là où IAS 40.27 retient la juste valeur si l'échange a une substance commerciale. Il signale enfin, dans son propre texte, un cas annoncé mais non développé, le « droit sur un bien immobilier » [texte officiel].",
      },
      { type: 'controle', question: QCM[27] },
    ],
  },
  {
    numero: '3.10',
    titre: "IAS 40 : transferts et sorties",
    navLabel: 'IAS 40 : transferts',
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'entité transfère un bien vers la catégorie des immeubles de placement, ou depuis celle-ci, « si, et seulement si, il y a changement d'utilisation », et la norme précise : « Un changement dans les intentions de la direction quant à l'utilisation d'un bien immobilier ne constitue pas en soi une indication d'un changement d'utilisation. » (§ 57). Les indices sont concrets : début d'occupation par le propriétaire, début d'aménagement en vue de la vente, fin d'occupation par le propriétaire, location simple à un tiers d'un bien jusque-là en stock. La décision de vendre un immeuble sans le réaménager ne le fait pas sortir de la catégorie ; son réaménagement pour continuer à le louer non plus (§ 58).",
      },
      { type: 'controle', question: QCM[26] },
      {
        type: 'tableau',
        tableau: {
          entetes: ['Transfert (modèle de la juste valeur)', 'Traitement', 'Paragraphe'],
          lignes: [
            ['Immeuble de placement → bien occupé ou stocks', 'La juste valeur à la date du changement devient le coût présumé', '§ 60'],
            ['Bien occupé → immeuble de placement', "IAS 16 jusqu'au changement, puis écart traité comme une réévaluation IAS 16 : hausse en OCI (sauf reprise d'une perte), baisse en résultat (sauf écart existant)", '§ 61-62'],
            ['Stocks → immeuble de placement', 'Écart entre juste valeur et valeur comptable en résultat net', '§ 63-64'],
            ['Immeuble construit pour soi-même, achevé', 'Écart entre juste valeur et valeur comptable en résultat net', '§ 65'],
            ['Au modèle du coût', 'Les transferts ne modifient ni la valeur comptable ni le coût', '§ 59'],
          ],
        },
      },
      {
        type: 'carte',
        titre: "Pas à pas : le siège devenu immeuble locatif",
        liste: [
          "**Donnée.** Un bâtiment administratif (coût 1 000, amortissements cumulés 200, valeur nette 800) est libéré le 30 juin N et loué à des tiers ; l'entité applique le modèle de la juste valeur à ses immeubles de placement. Juste valeur au 30 juin : 1 100 ; au 31 décembre : 1 050.",
          "**Jusqu'au 30 juin** : amortissement et test IAS 36 selon IAS 16 (§ 62).",
          "**Au 30 juin** : écart de 1 100 − 800 = 300, traité comme une réévaluation IAS 16, donc en autres éléments du résultat global (écart de réévaluation), puisqu'aucune perte antérieure n'est à reprendre (§ 62(b)).",
          "**Au 31 décembre** : baisse de 50, en résultat net, selon IAS 40.35 : l'immeuble est désormais au modèle de la juste valeur.",
          "**À la sortie** : l'écart de réévaluation de 300 pourra être viré directement en résultats non distribués, sans passer par le résultat (§ 62(b)(ii)).",
        ],
      },
      { type: 'controle', question: QCM[25] },
      {
        type: 'paragraphe',
        texte: "Un immeuble de placement est décomptabilisé lors de sa sortie, par vente ou location-financement, ou lorsqu'il est définitivement retiré de l'usage sans avantage futur attendu (§ 66-67). Le profit ou la perte, égal au produit net de sortie diminué de la valeur comptable, va en résultat net (§ 69). Comme pour IAS 16, sinistre, indemnité et remplacement sont trois événements distincts : l'indemnité d'assurance est comptabilisée en résultat quand elle devient exigible (§ 72-73). Et si le vendeur conserve des obligations après la vente, par exemple une garantie contre les impayés de loyers ou un passif environnemental, elles relèvent d'IAS 37 (§ 71).",
      },
      {
        type: 'filet',
        titre: "Jugement professionnel : ce que révèlent deux normes lues ensemble",
        texte: "IAS 36 et IAS 40 répondent à la même question, celle de la valeur économique d'un actif, par deux méthodes opposées. IAS 36 part du coût et ne corrige qu'à la baisse, sous condition d'indice et avec reprise plafonnée. IAS 40, au modèle de la juste valeur, suit le marché dans les deux sens, en résultat. Entre les deux, IAS 16 ouvre une troisième voie : la réévaluation en capitaux propres. Un même immeuble peut donc produire trois résultats différents selon qu'il est occupé, loué ou réévalué. C'est la raison pour laquelle les critères de classement, qui paraissent techniques, sont en réalité décisifs.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ue13c3-cp1',
    titre: "Dossier réel : immeubles saisis et immeubles de placement dans deux banques congolaises",
    contexte: "BOA RDC, note 3.13 des états IFRS 2018 : « La Banque détient certains actifs consécutivement au recouvrement des créances impayées. Il s'agit notamment des immeubles. [...] Ces actifs sont considérés comme des actifs immobilisés détenus dans un but de transaction dans la mesure où leur valeur comptable sera recouvrée en les cédant plutôt qu'en les utilisant. Conformément à IFRS 5, ils sont évalués au plus faible entre la valeur nette comptable et la valeur réalisable nette. » BCDC, annexe 2018 : « En date de FTA, la BCDC avait opté pour la réévaluation de ses immeubles de placement par référence à leur valeur d'expertise au 31/12/2012. Pour les évaluations ultérieures, le modèle retenu est celui du coût amorti basé sur l'approche par composants. [...] une estimation de la juste valeur des immeubles de placement reste obligatoire, pour la comptabilisation au bilan ou pour la présentation en annexes. »",
    questions: [
      {
        num: 1,
        enonce: "À quelles conditions les immeubles saisis de BOA RDC peuvent-ils relever d'IFRS 5 ?",
        correction: "IFRS 5.6-8 exige que la valeur comptable soit recouvrée principalement par une vente, que l'actif soit disponible à la vente immédiate dans son état actuel, et que la vente soit hautement probable : engagement de la direction, recherche active d'acheteur, prix raisonnable, conclusion attendue dans l'année, sauf prolongation due à des circonstances hors du contrôle de l'entité (§ 9). La note affirme le premier point mais ne dit rien des autres. Pour des immeubles saisis sur un marché peu liquide, la condition d'une vente dans l'année est rarement évidente et doit être documentée.",
      },
      {
        num: 2,
        enonce: "La note évalue ces actifs « au plus faible entre la valeur nette comptable et la valeur réalisable nette ». Est-ce conforme à IFRS 5 ?",
        correction: "Pas dans les termes. IFRS 5.15 retient le plus faible de la valeur comptable et de la **juste valeur diminuée des coûts de la vente**. La valeur réalisable nette est la notion d'IAS 2 (stocks). Les deux mesures peuvent être proches, mais elles ne sont pas identiques : la juste valeur est une mesure de marché selon IFRS 13, la valeur réalisable nette est une mesure propre à l'entité dans le cours normal de son activité. Une note conforme utiliserait le vocabulaire de la norme revendiquée.",
      },
      {
        num: 3,
        enonce: "Si la banque conserve ces immeubles plusieurs années et les loue en attendant un acheteur, quel classement retenir ?",
        correction: "Les conditions d'IFRS 5 ne sont alors plus remplies. Un immeuble loué à des tiers et détenu pour ses loyers ou sa valorisation est un immeuble de placement (IAS 40.5 et 8(c)-(d)), évalué selon le modèle choisi par la banque pour tous ses immeubles de placement (§ 30). Il ne peut pas être classé en stocks, puisque la vente d'immeubles n'est pas l'activité ordinaire d'une banque (IAS 40.9(a)). Et un simple projet de vente sans aménagement ne suffit pas à le sortir d'IAS 40 (§ 58).",
      },
      {
        num: 4,
        enonce: "Analysez le choix de la BCDC et dites quelles informations le lecteur doit trouver dans ses notes.",
        correction: "La BCDC a retenu, à la transition, la valeur d'expertise au 31 décembre 2012 comme coût présumé (faculté d'IFRS 1), puis le modèle du coût, avec approche par composants. C'est un choix admis (IAS 40.30 et 56). Il impose de fournir, en plus des informations du § 75 (modèle appliqué, recours à un évaluateur indépendant, loyers et charges directes), celles du § 79 : modes et durées d'amortissement, brut et amortissements cumulés, rapprochement des valeurs comptables et, surtout, la **juste valeur** des immeubles (§ 79(e)). La banque le rappelle elle-même : l'estimation de la juste valeur « reste obligatoire ». Au modèle du coût, les immeubles restent en outre soumis à IAS 36.",
      },
    ],
  },
  {
    id: 'ue13c3-cp2',
    titre: "Revue critique : six erreurs dans un test de dépréciation",
    contexte: "Le contrôleur de gestion de BRASSERIE DU FLEUVE (société fictive) soumet au comité d'audit le test de l'UGT « Brasserie de Mbandaka », qui porte un goodwill de 300. Extraits de son mémo : (1) « Nous avons retenu le plan stratégique à huit ans, plus représentatif du cycle de la bière. » (2) « Au-delà, nous extrapolons au taux de croissance de 12 % observé ces trois dernières années. » (3) « Les flux incluent les économies de la réorganisation logistique que nous envisageons pour l'an prochain. » (4) « Les flux sont nets des intérêts de l'emprunt bancaire et de l'impôt sur les sociétés. » (5) « Nous les actualisons au coût moyen pondéré du capital après impôt du groupe. » (6) « La valeur recouvrable ainsi obtenue, 2 100, est comparée à la valeur comptable des actifs corporels et incorporels de l'UGT, soit 2 100 : aucune dépréciation. »",
    questions: [
      {
        num: 1,
        enonce: "Relevez et corrigez les erreurs des points (1) et (2).",
        correction: "(1) IAS 36.33(b) et 35 limitent les projections fondées sur des budgets à cinq ans au plus, sauf si l'entité démontre sa capacité à prévoir avec précision sur une période plus longue. Un plan à huit ans exige une justification, que le mémo ne donne pas. (2) Au-delà, l'extrapolation se fait à un taux stable ou décroissant, qui ne doit pas dépasser le taux moyen de croissance à long terme des produits, du secteur ou du pays, sauf justification (§ 33(c), 36-37). Un taux de 12 % tiré de trois années récentes ne répond pas à cette exigence.",
      },
      {
        num: 2,
        enonce: "Relevez et corrigez les erreurs des points (3), (4) et (5).",
        correction: "(3) Les flux sont estimés pour l'actif dans son état actuel : les économies d'une restructuration à laquelle l'entité n'est pas encore engagée sont exclues (§ 44-47). (4) Les flux de financement et d'impôt sur le résultat sont exclus (§ 50) : les intérêts, parce que le coût de l'argent est pris en compte par l'actualisation ; l'impôt, parce que le taux est avant impôt. (5) Le taux doit être un taux **avant impôt** (§ 55), cohérent avec des flux avant impôt (§ 51). Le coût moyen pondéré du capital du groupe est un point de départ acceptable, à condition d'être converti en taux avant impôt et ajusté des risques propres à l'UGT (annexe A).",
      },
      {
        num: 3,
        enonce: "Relevez l'erreur du point (6) et chiffrez-en l'effet.",
        correction: "La valeur comptable de l'UGT doit inclure le goodwill qui lui est affecté (§ 90). Elle est donc de 2 100 + 300 = 2 400, et non de 2 100. Même en supposant que la valeur recouvrable de 2 100 soit exacte, ce que les points (1) à (5) rendent douteux, il manque une perte de valeur de **300**, imputée intégralement sur le goodwill (§ 104), et définitivement (§ 124). Une valeur recouvrable corrigée des erreurs précédentes serait vraisemblablement plus faible encore, et la perte déborderait alors sur les autres actifs, au prorata, dans le respect du plancher du § 105.",
      },
      {
        num: 4,
        enonce: "Quelles informations le comité d'audit doit-il exiger dans les notes ?",
        correction: "Pour une UGT portant un goodwill important (§ 134) : valeur comptable du goodwill ; base de la valeur recouvrable ; hypothèses clés et manière dont la direction les a déterminées ; période de projection, justifiée si elle dépasse cinq ans ; taux de croissance d'extrapolation, justifié s'il dépasse le taux moyen à long terme ; taux d'actualisation ; et, si un changement raisonnablement possible d'une hypothèse clé effaçait la marge, l'analyse de sensibilité du § 134(f). Si une perte est comptabilisée : les informations du § 130.",
      },
    ],
  },
  {
    id: 'ue13c3-cp3',
    titre: "Calcul : perte puis reprise sur une UGT de télécommunications",
    contexte: "KIVU TÉLÉCOM SA (société fictive) teste fin N son UGT « réseau de Goma », à la suite de la destruction de plusieurs sites par des violences armées. Valeurs comptables : goodwill 200 ; antennes et équipements 800 ; licence d'exploitation 400 ; bâtiments techniques 600 ; total 2 000. Valeur recouvrable de l'UGT (valeur d'utilité) : 1 300. Juste valeur des bâtiments diminuée des coûts de sortie : 550. Fin N+1, après le retour de la sécurité et la réouverture des sites, la valeur recouvrable de l'UGT est réestimée à 1 600. Pour simplifier, on ignore les amortissements de N+1 : les valeurs comptables qu'auraient eues les actifs sans dépréciation sont donc celles de fin N avant le test.",
    questions: [
      {
        num: 1,
        enonce: "Calculez et imputez la perte de valeur de fin N.",
        correction: "Perte : 2 000 − 1 300 = 700. D'abord le goodwill : 200 (§ 104(a)). Reste 500, au prorata des autres valeurs comptables (1 800) : antennes 222,2 ; licence 111,1 ; bâtiments 166,7. Mais les bâtiments ne peuvent descendre sous 550 (§ 105) : leur perte est limitée à 50. Les 116,7 excédentaires sont répartis entre antennes et licence (800 : 400), soit 77,8 et 38,9. Pertes finales : goodwill 200 ; antennes 300 ; licence 150 ; bâtiments 50 ; total 700. Valeurs après test : 0 ; 500 ; 250 ; 550 ; total 1 300.",
      },
      {
        num: 2,
        enonce: "Fin N+1, peut-on reprendre une partie de la perte ? Pourquoi ?",
        correction: "Oui, à deux conditions : l'existence d'un indice que la perte a diminué, ici la réouverture des sites, et un changement dans les estimations qui ont servi à déterminer la valeur recouvrable (§ 110-115). La hausse ne résulte pas du seul passage du temps (§ 116). La reprise possible est de 1 600 − 1 300 = 300. Elle ne peut concerner le goodwill, dont la dépréciation est définitive (§ 124).",
      },
      {
        num: 3,
        enonce: "Répartissez la reprise de 300.",
        correction: "La reprise se répartit entre les actifs autres que le goodwill, au prorata de leurs valeurs comptables (§ 122) : 500, 250 et 550, soit 1 300. Antennes 115,4 ; licence 57,7 ; bâtiments 126,9. Mais aucun actif ne peut dépasser le plus faible de sa valeur recouvrable et de la valeur qu'il aurait eue sans dépréciation (§ 123). Les bâtiments sont plafonnés à 600 : leur reprise est limitée à 50. Les 76,9 restants vont aux antennes et à la licence (500 : 250), soit 51,3 et 25,6. Reprises finales : antennes 166,7 (valeur 666,7, sous le plafond de 800) ; licence 83,3 (valeur 333,3, sous 400) ; bâtiments 50 (valeur 600). Total 300, en résultat net (§ 119).",
      },
      {
        num: 4,
        enonce: "Pourquoi le goodwill reste-t-il à zéro alors que l'UGT a retrouvé une bonne partie de sa valeur ?",
        correction: "Parce qu'IAS 36.125 considère que toute hausse ultérieure de la valeur recouvrable attribuable au goodwill serait, en substance, un goodwill généré en interne, que IAS 38.48 interdit de comptabiliser. La perte sur goodwill est donc irréversible, en IFRS comme en SYSCOHADA révisé. C'est une asymétrie assumée, qui incite à ne pas surévaluer le goodwill lors du regroupement initial.",
      },
    ],
  },
  {
    id: 'ue13c3-cp4',
    titre: "Classer et évaluer : le patrimoine immobilier de GOMBE TOWERS SA",
    contexte: "GOMBE TOWERS SA (société fictive), qui applique le modèle de la juste valeur à ses immeubles de placement, détient au 31 décembre N : (A) une tour de bureaux louée à des ambassades et à des sociétés, avec gardiennage et entretien des parties communes ; (B) un hôtel qu'elle exploite elle-même, avec restaurant et conciergerie ; (C) un terrain à Kinshasa-Est acheté il y a trois ans, sans projet arrêté ; (D) un immeuble de dix logements occupés par ses propres cadres, qui paient un loyer de marché ; (E) des villas construites pour être vendues à des particuliers ; (F) un entrepôt jusqu'ici utilisé pour sa logistique, libéré le 1er octobre N et loué depuis à un tiers. Données pour F : coût 900, amortissements cumulés 300 au 1er octobre N ; juste valeur 820 au 1er octobre et 800 au 31 décembre. Aucune perte de valeur ni réévaluation antérieure.",
    questions: [
      {
        num: 1,
        enonce: "Classez les biens A à E, en justifiant.",
        correction: "(A) Immeuble de placement : les services de gardiennage et d'entretien sont accessoires et non significatifs (IAS 40.11). (B) Immobilisation corporelle (IAS 16) : les services hôteliers sont une composante significative, le bien est occupé par son propriétaire (§ 12). (C) Immeuble de placement : terrain dont l'utilisation future n'est pas déterminée (§ 8(b)). (D) Immobilisation corporelle : un bien occupé par le personnel est un bien occupé par le propriétaire, que les occupants paient ou non un loyer de marché (§ 9(c)) ; le SYSCOHADA révisé le précise aussi. (E) Stocks (IAS 2) : biens construits pour être vendus dans le cours normal de l'activité (§ 9(a)).",
      },
      {
        num: 2,
        enonce: "Comptabilisez le transfert de l'entrepôt F au 1er octobre N.",
        correction: "Jusqu'au 1er octobre, l'entrepôt relève d'IAS 16 : amortissement et, s'il y a un indice, test de dépréciation (IAS 40.62). Au 1er octobre, sa valeur nette est de 900 − 300 = 600 et sa juste valeur de 820. L'écart de 220 est traité comme une réévaluation IAS 16 (§ 61-62) : en l'absence de perte antérieure à reprendre, il est porté en autres éléments du résultat global, dans un écart de réévaluation. L'entrepôt entre alors en immeubles de placement pour 820.",
      },
      {
        num: 3,
        enonce: "Que se passe-t-il au 31 décembre N pour l'entrepôt F ?",
        correction: "L'entrepôt est désormais évalué au modèle de la juste valeur : la baisse de 820 à 800, soit 20, est comptabilisée en **résultat net** (IAS 40.35), et non en diminution de l'écart de réévaluation de 220, qui reste en capitaux propres. Celui-ci pourra être viré en résultats non distribués lors de la sortie de l'immeuble, sans passer par le résultat (§ 62(b)(ii)). L'immeuble n'est plus amorti ni soumis à IAS 36.",
      },
      {
        num: 4,
        enonce: "En N+1, la direction décide de vendre la tour A « dès qu'un acheteur se présentera », sans travaux. Et elle lance la rénovation lourde de l'hôtel B pour le transformer en immeuble de bureaux à louer. Quelles conséquences ?",
        correction: "Tour A : un changement d'intention ne suffit pas ; la tour reste un immeuble de placement jusqu'à sa sortie (§ 57-58). Si, plus tard, la vente devient hautement probable dans l'année et que la tour est disponible dans son état actuel, IFRS 5 pourra s'appliquer ; au modèle de la juste valeur, les immeubles de placement restent de toute façon évalués à la juste valeur. Hôtel B : le début des travaux en vue d'une utilisation comme immeuble de placement matérialise la fin de l'occupation par le propriétaire. L'hôtel est transféré en immeuble de placement, avec le traitement du § 61-62 : l'écart entre valeur nette IAS 16 et juste valeur est traité comme une réévaluation.",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue13',
  numero: 3,
  id: 'ue13-chapitre-3',
  titre: 'Dépréciation des actifs et immeubles de placement',
  sousTitre: "Valeur recouvrable, UGT et goodwill (IAS 36) ; classer, évaluer et transférer les immeubles (IAS 40)",
  infoBulle: "Chapitre 3 du module IFRS/IAS : champ et indices de perte de valeur, valeur recouvrable (juste valeur diminuée des coûts de sortie, valeur d'utilité), perte et reprise, unités génératrices de trésorerie, goodwill et cascade d'imputation, informations à fournir ; immeubles de placement (définition, classement, modèles du coût et de la juste valeur, transferts, sorties) ; passerelles avec le SYSCOHADA révisé et lecture de comptes bancaires congolais.",
  loiRef: "IAS 36 · IAS 40 · IFRS 5 · IFRS 13 · AUDCIF art. 42, 43 et 46 · SYSCOHADA, Titre VIII, ch. 10 et 12",
  moduleLabel: 'UE 13 · IFRS / IAS',
  retourRoute: '/ue13-ifrs-ias',
  coursId: 'ue13-ifrs-ias',
  objectifs: [
    "Délimiter le champ d'IAS 36 et savoir quand un test est requis : indices, tests annuels obligatoires.",
    "Déterminer une valeur recouvrable : juste valeur diminuée des coûts de sortie et valeur d'utilité, avec ses règles de construction (flux, horizon, taux, devises).",
    "Comptabiliser une perte de valeur et sa reprise, y compris sur un actif réévalué, en respectant le plafond de reprise.",
    "Identifier une UGT et construire une valeur comptable homogène, y compris en présence d'un passif de remise en état.",
    "Affecter et tester le goodwill, imputer une perte en cascade avec le plancher du § 105, traiter les actifs communs.",
    "Relire de façon critique un test de dépréciation et les informations fournies.",
    "Comparer la dépréciation IAS 36 avec celle du SYSCOHADA révisé.",
    "Classer un bien immobilier (IAS 40, IAS 16, IAS 2, IFRS 5) et l'évaluer selon le modèle du coût ou de la juste valeur.",
    "Comptabiliser les transferts et les sorties d'immeubles de placement.",
  ],
  sections: SECTIONS,
  aRetenir: [
    "IAS 36 plafonne la valeur comptable d'un actif à sa valeur recouvrable. Test à chaque indice ; test annuel obligatoire pour le goodwill et les incorporelles à durée indéterminée ou non encore prêtes à l'emploi (§ 9-11).",
    "Valeur recouvrable = max (juste valeur − coûts de sortie ; valeur d'utilité) (§ 18). La valeur d'utilité repose sur des budgets de cinq ans au plus, une croissance terminale prudente, l'actif dans son état actuel, sans flux de financement ni d'impôt, et un taux avant impôt cohérent avec la monnaie des flux (§ 33-57).",
    "La perte va en résultat, ou d'abord en réduction de l'écart de réévaluation pour un actif réévalué (§ 59-61). La reprise exige un changement d'estimation, jamais le seul passage du temps, et elle est plafonnée à la valeur nette qu'aurait eue l'actif sans perte (§ 114-117).",
    "L'UGT est le plus petit groupe d'actifs générant des entrées largement indépendantes (§ 6, 66-73). Sa valeur comptable est homogène avec sa valeur recouvrable, passif repris par l'acheteur compris (§ 75-79).",
    "Le goodwill est affecté aux UGT bénéficiant des synergies (§ 80). La perte est imputée d'abord sur le goodwill, puis au prorata des autres actifs, sans descendre sous leur valeur recouvrable propre (§ 104-105). La perte sur goodwill n'est jamais reprise (§ 124).",
    "Le SYSCOHADA révisé partage la mécanique d'IAS 36, mais compare la VNC à la valeur actuelle, c'est-à-dire au coût actuel corrigé de l'âge, du point de vue d'un acquéreur de l'entité.",
    "Un immeuble de placement est détenu pour ses loyers ou sa valorisation et génère des flux largement indépendants (IAS 40.5-7) ; hôtels exploités, biens occupés par le personnel et biens à vendre dans l'activité ordinaire en sont exclus.",
    "Un seul modèle pour tous les immeubles de placement : la juste valeur, avec variations en résultat et sans amortissement, ou le coût, avec juste valeur obligatoire en notes (§ 30-56, 79). Le SYSCOHADA révisé ne connaît que le coût.",
    "Transferts sur changement d'utilisation seulement (§ 57) : juste valeur comme coût présumé en sortie de catégorie ; réévaluation IAS 16 à l'entrée depuis un bien occupé ; résultat net à l'entrée depuis les stocks (§ 60-65).",
  ],
  references: [
    { genre: 'texte', intitule: "IAS 36 — Dépréciation d'actifs", precision: "§§ 1 à 137, annexes A et C (transcription condensée du corpus)" },
    { genre: 'texte', intitule: "IAS 40 — Immeubles de placement", precision: "§§ 1 à 79 (transcription condensée du corpus)" },
    { genre: 'texte', intitule: "IFRS 5 — Actifs non courants détenus en vue de la vente et activités abandonnées", precision: "§§ 6 à 9 et 15" },
    { genre: 'texte', intitule: "AUDCIF et SYSCOHADA révisé", precision: "art. 42, 43 et 46 ; Titre VIII, ch. 10 (immeubles de placement) et ch. 12 (dépréciation des immobilisations)" },
    { genre: 'texte', intitule: "BOA RDC, états financiers IFRS 2018", precision: "note 3.13 (actifs disponibles à la vente)" },
    { genre: 'texte', intitule: "BCDC, annexe au rapport annuel 2018", precision: "immeubles de placement, durées d'utilité, note 3.8" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "IAS 36, IAS 40 et IFRS 5 (transcriptions françaises condensées) ; IFRS 13, IAS 16 ; Cadre conceptuel 2018 (texte anglais) ; AUDCIF et SYSCOHADA révisé ; BOA RDC (2018) et BCDC (2018).",
}

export default chapitre
