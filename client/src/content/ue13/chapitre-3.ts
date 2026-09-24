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
// - Support de cours d'origine : J.-B. Tshimanga Mulumba (CPCC), « IFRS -
//   Dépréciation des actifs », module 3 ; ses illustrations INDUSTRIA,
//   TRANSLOG et IMMO PLUS sont reprises et approfondies. Deux points du
//   support sont rectifiés sur texte : la variation de juste valeur d'un
//   immeuble de placement passe directement en résultat (IAS 40.35), sans
//   écart de réévaluation ; un changement du taux d'actualisation peut
//   justifier une reprise (IAS 36.115(b)), seule la désactualisation est
//   exclue (§ 116). Public visé : entreprises commerciales et industrielles.
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
    explication: "Pour un actif réévalué, la perte est traitée comme une réévaluation négative : en autres éléments du résultat global à hauteur de l'écart de réévaluation de cet actif, le solde en résultat net (IAS 36.60-61 ; IAS 16.40). Le SYSCOHADA révisé traite le même cas dans son exemple officiel (Titre VIII, ch. 12, § 2.5) : débit de l'écart de réévaluation pour 6 000 000 et d'une dotation pour 9 000 000. Sur ce point précis, les deux référentiels convergent.",
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
    explication: "Fin N+2, la valeur comptable est de 20 000 000 − 2 × 2 500 000 = 15 000 000. Sans perte, elle aurait été de 30 000 000 − 4 × 3 000 000 = 18 000 000. La reprise est plafonnée à ce montant (IAS 36.117) : 18 000 000 − 15 000 000 = 3 000 000, même si la valeur recouvrable atteint 19 000 000. Le SYSCOHADA révisé retient ce même exemple, et le même plafond.",
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
    explication: "IAS 40.10 : si les parties peuvent être vendues (ou louées en location-financement) séparément, l'entité les comptabilise séparément. Sinon, le bien n'est un immeuble de placement que si la partie occupée est non significative. Exemple officiel du SYSCOHADA révisé (Titre VIII, ch. 10) : un quart, soit 50 000 000 F, en immobilisations corporelles, trois quarts, soit 150 000 000 F, en immeubles de placement.",
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
    explication: "IAS 40.35 : le profit ou la perte résultant d'une variation de juste valeur est comptabilisé en résultat net de la période où il se produit. Tout l'écart avec le modèle de la réévaluation d'IAS 16 est là, où la hausse passe en autres éléments du résultat global (IAS 16.39). Au modèle de la juste valeur, l'immeuble n'est d'ailleurs pas amorti ni soumis à IAS 36.",
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
    explication: "IAS 40.32 : toutes les entités évaluent la juste valeur de leurs immeubles de placement, soit pour les évaluer, soit pour la fournir en notes (§ 79(e)) ; le recours à un évaluateur indépendant est encouragé, sans être obligatoire. Au modèle du coût, cette juste valeur sert aussi de repère pour le test de dépréciation d'IAS 36.",
    articleRef: "IAS 40.32 et 40.79",
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
    titre: "Objectif, champ d'application et indices de perte de valeur",
    navLabel: 'Objectif et indices',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Un actif est une ressource dont l'entité attend des avantages économiques. Lorsque ces avantages ne permettent plus de recouvrer sa valeur comptable, le bilan présente une ressource surévaluée. IAS 36 a pour objectif de s'assurer que les actifs ne sont pas comptabilisés pour une valeur excédant leur valeur recouvrable, c'est-à-dire le montant qui sera recouvré par leur utilisation ou leur vente (§ 1). La norme complète ainsi IAS 16 et IAS 38 : l'amortissement répartit le coût de l'actif sur sa durée d'utilité, le test de dépréciation vérifie que la valeur comptable qui en résulte demeure recouvrable. Il convient de distinguer deux mécanismes : la réévaluation, qui relève d'un choix de méthode ouvert par IAS 16 et IAS 40, et la dépréciation, qui constitue une obligation.",
      },
      { type: 'intertitre', texte: "3.1.1 Champ d'application" },
      {
        type: 'paragraphe',
        texte: "IAS 36 s'applique aux immobilisations corporelles et incorporelles, au goodwill, aux immeubles de placement évalués au coût, aux droits d'utilisation et aux participations dans des filiales, coentreprises et entreprises associées (§ 2-4). Elle exclut les actifs qu'une autre norme évalue déjà selon ses propres règles : stocks (IAS 2), actifs sur contrat (IFRS 15), actifs d'impôt différé (IAS 12), actifs liés aux avantages du personnel (IAS 19), actifs financiers relevant d'IFRS 9, immeubles de placement évalués à la juste valeur (IAS 40), actifs biologiques évalués à la juste valeur diminuée des coûts de la vente (IAS 41), contrats d'assurance (IFRS 17) et actifs détenus en vue de la vente (IFRS 5) (§ 2). Pour les actifs réévalués, la dépréciation est improbable lorsque les coûts de sortie sont négligeables ; dans le cas contraire, le test s'applique lorsque la valeur d'utilité est inférieure au montant réévalué (§ 5).",
      },
      { type: 'intertitre', texte: "3.1.2 Test conditionnel et tests annuels obligatoires" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 36, § 9 et 10",
        texte: "« Une entité doit déterminer à la fin de chaque période de présentation de l'information financière s'il existe un quelconque indice qu'un actif a pu se déprécier. S'il existe un tel indice, l'entité doit estimer la valeur recouvrable de l'actif. » (§ 9). « Qu'il y ait un indice de dépréciation ou non, une entité doit aussi » tester chaque année les immobilisations incorporelles à durée d'utilité indéterminée et celles qui ne sont pas encore prêtes à être utilisées, ainsi que le goodwill acquis dans un regroupement d'entreprises (§ 10).",
      },
      {
        type: 'paragraphe',
        texte: "La norme n'exige donc pas d'estimer chaque année la valeur recouvrable de tous les actifs. Elle impose une recherche d'indices à chaque clôture, et ne rend le calcul obligatoire qu'en présence d'un indice. Les trois catégories visées au § 10 font exception, parce qu'elles ne sont pas amorties ou que leur recouvrabilité est plus incertaine (§ 11) : elles sont testées chaque année, à la même date, indépendamment de tout indice.",
      },
      {
        type: 'carte',
        titre: "Tableau 3.1 — Indices de perte de valeur (IAS 36, § 12 et 14)",
        tableau: {
          entetes: ['Sources externes (§ 12(a)-(d))', 'Sources internes (§ 12(e)-(h) et § 14)'],
          lignes: [
            ["Baisse de la valeur de l'actif sensiblement supérieure à l'effet attendu du temps ou de l'utilisation normale", "Obsolescence ou dégradation physique de l'actif"],
            ["Changements importants défavorables dans l'environnement technologique, économique, juridique ou de marché", "Mise hors service, abandon ou restructuration de l'activité, sortie anticipée, durée d'utilité devenue déterminée"],
            ["Hausse des taux de marché affectant le taux d'actualisation de la valeur d'utilité", "Performance économique inférieure aux prévisions : flux, résultat ou budget dégradés"],
            ["Valeur comptable de l'actif net supérieure à la capitalisation boursière", "Participations : dividende comptabilisé alors que la valeur de la participation excède les actifs nets consolidés de l'entité détenue, goodwill compris, ou que le dividende excède son résultat global de la période (§ 12(h))"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Cette liste constitue un minimum (§ 13). Dans l'environnement congolais, plusieurs faits appellent un examen particulier : une crise sécuritaire interrompant l'accès à un site, notamment dans l'est du pays ; une modification du régime fiscal ou minier réduisant la rentabilité d'un projet ; une hausse importante des taux directeurs ; une dépréciation rapide du franc congolais renchérissant les intrants importés. Aucun de ces faits n'emporte automatiquement une perte de valeur, mais chacun impose un examen documenté. Le principe d'importance relative s'applique à cette appréciation (§ 15), et la présence d'un indice peut conduire à réviser la durée d'utilité, le mode d'amortissement ou la valeur résiduelle de l'actif, même en l'absence de perte de valeur (§ 17).",
      },
    ],
  },
  {
    numero: '3.2',
    titre: "La détermination de la valeur recouvrable",
    navLabel: 'Valeur recouvrable',
    blocs: [
      {
        type: 'paragraphe',
        texte: "La valeur recouvrable d'un actif est « la valeur la plus élevée entre sa juste valeur diminuée des coûts de sortie et sa valeur d'utilité » (§ 6 ; § 18). La juste valeur diminuée des coûts de sortie correspond au prix que retiendraient des intervenants du marché, déterminé selon IFRS 13, diminué des coûts marginaux directement attribuables à la sortie, tels que les frais d'actes, les droits, les coûts d'enlèvement et de mise en état de vente ; les charges financières, l'impôt sur le résultat, les indemnités de fin de contrat de travail et les coûts de restructuration en sont exclus (§ 6 et 28). La valeur d'utilité est la valeur actualisée des flux de trésorerie que l'entité attend de l'utilisation continue de l'actif et de sa sortie à la fin de sa durée d'utilité (§ 30-31). Lorsque l'une de ces deux valeurs excède la valeur comptable, l'actif n'est pas déprécié et il n'est pas nécessaire d'estimer l'autre (§ 19).",
      },
      { type: 'intertitre', texte: "3.2.1 Juste valeur et valeur d'utilité" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 36, § 53A",
        texte: "« La juste valeur diffère de la valeur d'utilité. La juste valeur reflète les hypothèses que les intervenants du marché utiliseraient pour fixer le prix de l'actif. Par contre, la valeur d'utilité reflète les effets des facteurs qui peuvent être spécifiques à l'entité et ne pas s'appliquer aux entités en général. »",
      },
      {
        type: 'paragraphe',
        texte: "La juste valeur ne reflète pas, dans la mesure où ils ne seraient pas accessibles aux intervenants du marché, la valeur supplémentaire tirée d'un regroupement d'actifs, les synergies entre l'actif et d'autres actifs, les droits ou restrictions juridiques propres au propriétaire actuel et les avantages ou charges fiscaux qui lui sont spécifiques (§ 53A). Le Cadre conceptuel de 2018 établit la même distinction entre valeurs de marché et valeurs spécifiques à l'entité (§ 6.12 et 6.17-6.19). Lorsque la juste valeur ne peut être évaluée faute de base fiable, l'entité peut retenir la valeur d'utilité comme valeur recouvrable ; lorsqu'il n'existe aucune raison de penser que la valeur d'utilité excède significativement la juste valeur diminuée des coûts de sortie, situation fréquente pour un actif détenu en vue d'être sorti, elle peut retenir cette dernière (§ 20-21).",
      },
      {
        type: 'carte',
        titre: "Exemple 3.1 — Baisse de la juste valeur sans dépréciation (INDUSTRIA SA)",
        liste: [
          "Au 31 décembre N, la ligne de production spécialisée d'INDUSTRIA SA a une valeur brute de 1 200 000 USD, des amortissements cumulés de 500 000 et une valeur nette comptable de 700 000.",
          "Deux indices sont relevés : la baisse du prix de marché des équipements similaires et l'arrivée d'une technologie concurrente (§ 12(a) et (b)). Le test est donc obligatoire (§ 9).",
          "La juste valeur diminuée des coûts de sortie est estimée à 690 000 et la valeur d'utilité, fondée sur des prévisions de flux validées, à 760 000.",
          "La valeur recouvrable s'établit à max (690 000 ; 760 000) = 760 000. Supérieure à la valeur nette comptable, elle ne conduit à constater aucune dépréciation.",
        ],
        note: "Une baisse de la juste valeur ne suffit pas à justifier une dépréciation tant que la valeur d'utilité demeure supérieure à la valeur comptable ; la norme retient une approche économique d'ensemble plutôt qu'une lecture du seul marché. L'arrivée d'une technologie concurrente peut néanmoins conduire à réduire la durée d'utilité restante de la ligne (§ 17).",
      },
      { type: 'intertitre', texte: "3.2.2 Les règles d'estimation de la valeur d'utilité" },
      {
        type: 'carte',
        titre: "Tableau 3.2 — Construction de la valeur d'utilité (IAS 36, § 33-57)",
        tableau: {
          entetes: ['Paramètre', 'Règle', 'Fondement'],
          lignes: [
            ['Hypothèses', "Raisonnables et justifiables, un poids plus important étant accordé aux éléments probants externes ; réalisme vérifié par l'analyse des écarts passés entre prévisions et réalisations", '§ 33(a) et 34'],
            ['Horizon', "Budgets les plus récents approuvés par la direction, sur cinq ans au plus sauf justification ; au-delà, extrapolation à un taux de croissance stable ou décroissant, n'excédant pas le taux moyen à long terme du secteur ou du pays", '§ 33(b)-(c), 35-37'],
            ["État de l'actif", "Actif dans son état actuel, à l'exclusion des restructurations non engagées et des améliorations de performance ; dépenses de maintien incluses", '§ 44-49'],
            ['Flux inclus', "Encaissements liés à l'utilisation continue, décaissements nécessaires directement attribuables ou affectables, flux nets de sortie en fin de durée d'utilité", '§ 39, 41 et 52-53'],
            ['Flux exclus', "Flux de financement et d'impôt sur le résultat ; flux liés à des passifs déjà comptabilisés", '§ 43 et 50'],
            ["Taux d'actualisation", "Taux avant impôt reflétant la valeur temps de l'argent et les risques spécifiques de l'actif non intégrés aux flux, estimé par exemple à partir du coût moyen pondéré du capital d'une entité comparable, ajusté", '§ 55-57 ; annexe A'],
          ],
        },
      },
      {
        type: 'carte',
        titre: "Exemple 3.2 — Calcul de la valeur d'utilité d'une ligne d'embouteillage (en milliers de USD)",
        texte: "Flux nets de trésorerie avant impôt et hors financement, issus du budget approuvé : 120 en année 1, 130 en année 2, 125 en année 3, 110 en année 4 et 100 en année 5, auxquels s'ajoute un produit net de sortie de 40 en fin de durée d'utilité. Taux d'actualisation avant impôt : 14 %. Valeur comptable : 480. Juste valeur diminuée des coûts de sortie : 380.",
        tableau: {
          entetes: ['Année', 'Flux', "Facteur d'actualisation (14 %)", 'Valeur actualisée'],
          lignes: [
            ['1', '120', '0,8772', '105,3'],
            ['2', '130', '0,7695', '100,0'],
            ['3', '125', '0,6750', '84,4'],
            ['4', '110', '0,5921', '65,1'],
            ['5', '100 + 40 = 140', '0,5194', '72,7'],
            ["Valeur d'utilité", '', '', '427,5'],
          ],
        },
        note: "La valeur recouvrable s'établit à max (380 ; 427,5) = 427,5 ; la perte de valeur, soit 480 − 427,5 = 52,5, est comptabilisée en résultat net, et l'amortissement ultérieur est calculé sur 427,5 (§ 63).",
      },
      {
        type: 'paragraphe',
        texte: "De nombreux actifs exploités en RDC génèrent des flux en dollars alors que la comptabilité est tenue en francs congolais. Selon le § 54, les flux futurs sont estimés dans la monnaie dans laquelle ils seront générés et actualisés à un taux approprié à cette monnaie, la valeur actualisée étant ensuite convertie au cours au comptant de la date du calcul. Le § 40 impose en outre la cohérence entre les flux et le taux au regard de l'inflation : un taux nominal s'applique à des flux nominaux, un taux réel à des flux réels. L'actualisation de flux en dollars au taux d'un emprunt en francs congolais, qui intègre l'inflation locale, prendrait en compte un risque monétaire que les flux ne supportent pas.",
      },
    ],
  },
  {
    numero: '3.3',
    titre: "Comptabilisation et reprise des pertes de valeur",
    navLabel: 'Perte et reprise',
    blocs: [
      { type: 'intertitre', texte: "3.3.1 Comptabilisation de la perte de valeur" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 36, § 59",
        texte: "« Si, et seulement si, la valeur recouvrable d'un actif est inférieure à sa valeur comptable, la valeur comptable de l'actif doit être ramenée à sa valeur recouvrable. Cette réduction est une perte de valeur. »",
      },
      {
        type: 'paragraphe',
        texte: "La perte de valeur est comptabilisée immédiatement en résultat net (§ 60), par le débit d'un compte de charges de dépréciation et le crédit d'un compte de cumul des dépréciations. Lorsque l'actif est comptabilisé à son montant réévalué, la perte est traitée comme une réévaluation négative : elle est imputée en autres éléments du résultat global dans la limite de l'écart de réévaluation relatif à cet actif, le surplus étant comptabilisé en résultat net (§ 61). Cette articulation entre IAS 16 et IAS 36 procède d'une hiérarchie logique : la plus-value antérieurement constatée est annulée avant que la perte économique ne soit portée en charge. L'amortissement des périodes ultérieures est calculé sur la valeur comptable révisée (§ 63), et les impôts différés sont déterminés à nouveau selon IAS 12 (§ 64).",
      },
      {
        type: 'carte',
        titre: "Exemple 3.3 — Perte de valeur d'un actif réévalué (TRANSLOG SA)",
        texte: "TRANSLOG SA utilise pour son exploitation un immeuble industriel évalué selon le modèle de la réévaluation d'IAS 16. L'écart de réévaluation s'élève à 12 000 USD au 1er janvier N. Au 31 décembre N, la valeur nette comptable est de 180 000 et la valeur recouvrable de 160 000.",
        tableau: {
          entetes: ['Étape', 'Fondement', 'Montant', 'Écriture'],
          lignes: [
            ['Perte de valeur totale', 'IAS 36.59', '180 000 − 160 000 = 20 000', '—'],
            ["Imputation sur l'écart de réévaluation", 'IAS 36.60-61 ; IAS 16.40', '12 000', "Débit Écart de réévaluation ; crédit Dépréciations de l'immeuble"],
            ['Solde en résultat net', 'IAS 36.60-61', '20 000 − 12 000 = 8 000', "Débit Charges pour dépréciation ; crédit Dépréciations de l'immeuble"],
            ['Amortissement ultérieur', 'IAS 36.63', 'Calculé sur 160 000', '—'],
          ],
        },
        note: "Le SYSCOHADA révisé retient la même imputation sur l'écart de réévaluation (Titre VIII, ch. 12, § 2.5).",
      },
      { type: 'intertitre', texte: "3.3.2 Reprise de la perte de valeur" },
      {
        type: 'paragraphe',
        texte: "À chaque clôture, l'entité recherche également s'il existe un indice qu'une perte de valeur antérieure a diminué ou n'existe plus, les indices étant symétriques de ceux qui signalent une perte (§ 110-111). La perte comptabilisée pour un actif autre que le goodwill « doit être reprise si, et seulement si, il y a eu un changement dans les estimations utilisées pour déterminer la valeur recouvrable de l'actif depuis la dernière comptabilisation d'une perte de valeur » (§ 114). La reprise reflète une augmentation du potentiel de service estimé de l'actif (§ 115). La norme cite parmi les changements d'estimation, pour une valeur recouvrable fondée sur la valeur d'utilité, « un changement du montant ou de l'échéancier des flux de trésorerie futurs estimés ou du taux d'actualisation » (§ 115(b)) : une baisse du taux d'actualisation peut donc justifier une reprise. Est en revanche exclue la seule augmentation de la valeur actualisée due au rapprochement des flux, puisqu'« une perte de valeur n'est pas reprise du simple fait du passage du temps (parfois nommé « désactualisation ») même si la valeur recouvrable de l'actif devient supérieure à sa valeur comptable » (§ 116). Le changement d'estimation qui fonde la reprise est indiqué dans les notes (§ 130).",
      },
      {
        type: 'paragraphe',
        texte: "La reprise est plafonnée : la valeur comptable augmentée « ne doit pas être supérieure à la valeur comptable qui aurait été déterminée (nette des amortissements) si aucune perte de valeur n'avait été comptabilisée » (§ 117). Toute augmentation au-delà constituerait une réévaluation, soumise à la norme applicable à l'actif (§ 118). La reprise est comptabilisée en résultat net, par le débit du compte de cumul des dépréciations et le crédit d'un compte de reprises, sauf pour un actif réévalué, pour lequel elle est traitée comme une réévaluation positive (§ 119). Aucune reprise n'est admise pour le goodwill (§ 124).",
      },
      {
        type: 'carte',
        titre: "Exemple 3.4 — Perte de valeur puis reprise plafonnée",
        liste: [
          "Un matériel acquis au début de N−1 pour 30 000 000 F est amorti sur dix ans, soit 3 000 000 F par an ; sa valeur nette s'élève à 24 000 000 F à la fin de N.",
          "Fin N : la valeur recouvrable étant de 20 000 000 F, une perte de 4 000 000 F est comptabilisée. L'amortissement ultérieur s'établit à 20 000 000 / 8 = 2 500 000 F par an.",
          "Fin N+2 : la valeur comptable s'élève à 20 000 000 − 2 × 2 500 000 = 15 000 000 F. En l'absence de perte, elle aurait été de 30 000 000 − 4 × 3 000 000 = 18 000 000 F, montant qui constitue le plafond de la reprise (§ 117).",
          "Si la valeur recouvrable remonte à 17 000 000 F, la reprise s'élève à 2 000 000 F et est comptabilisée en résultat net (§ 119). Si elle remonte à 19 000 000 F, la reprise est limitée à 3 000 000 F ; une augmentation supplémentaire relèverait du modèle de la réévaluation (§ 118).",
        ],
        note: "Le SYSCOHADA révisé (Titre VIII, ch. 12, § 2.4.2) retient le même plafond sur le même exemple. La différence entre les deux référentiels tient à la valeur à laquelle est comparée la valeur nette comptable (section 3.7).",
      },
    ],
  },
  {
    numero: '3.4',
    titre: "Les unités génératrices de trésorerie",
    navLabel: 'UGT',
    blocs: [
      { type: 'intertitre', texte: "3.4.1 Définition et identification" },
      {
        type: 'paragraphe',
        texte: "La plupart des actifs ne génèrent pas de flux de trésorerie de manière isolée : un four de cimenterie ne produit aucune recette sans le broyeur et l'ensacheuse. IAS 36 impose alors de tester l'unité génératrice de trésorerie (UGT), définie comme « le plus petit groupe identifiable d'actifs qui génère des entrées de trésorerie largement indépendantes des entrées de trésorerie générées par d'autres actifs ou groupes d'actifs » (§ 6). La valeur recouvrable est estimée pour l'actif pris individuellement lorsque cela est possible et, à défaut, pour l'UGT à laquelle il appartient (§ 66-67). L'identification des UGT relève du jugement et tient compte de la manière dont la direction suit les activités et décide de les poursuivre ou de les arrêter (§ 68-69). Les UGT sont identifiées de manière cohérente d'une période à l'autre, tout changement devant être justifié et indiqué dans les notes (§ 72-73 et 130).",
      },
      {
        type: 'paragraphe',
        texte: "La norme illustre ces principes par plusieurs exemples. La desserte ferroviaire privée d'une mine « ne pourrait être vendue que pour sa valeur à la casse » et ne génère pas d'entrées largement indépendantes ; sa valeur d'utilité ne pouvant être déterminée, l'entité estime la valeur recouvrable de l'UGT, « c'est-à-dire la mine dans son ensemble » (§ 67). Une société de transport liée par un contrat municipal qui lui impose de desservir cinq itinéraires, sans possibilité d'en abandonner un, constitue une seule UGT regroupant les cinq itinéraires (§ 68). Enfin, lorsqu'il existe un marché actif pour la production d'un actif ou d'un groupe d'actifs, celui-ci constitue une UGT, même si sa production est utilisée en interne ; ses entrées de trésorerie sont alors estimées aux prix de pleine concurrence, et non aux prix de cession interne (§ 70-71).",
      },
      { type: 'intertitre', texte: "3.4.2 La valeur comptable de l'UGT" },
      {
        type: 'paragraphe',
        texte: "La valeur comptable de l'UGT est déterminée de manière cohérente avec sa valeur recouvrable (§ 75). Elle comprend les seuls actifs directement attribuables ou affectables à l'UGT sur une base raisonnable et cohérente, et exclut en principe les passifs comptabilisés (§ 76). Lorsque la cession de l'UGT imposerait à l'acquéreur de reprendre un passif, tel qu'une obligation de remise en état d'un site minier, la juste valeur de l'UGT en tient compte ; pour que la comparaison porte sur des grandeurs homogènes, la valeur comptable du passif est alors déduite à la fois de la valeur comptable et de la valeur d'utilité de l'UGT (§ 78-79).",
      },
      {
        type: 'carte',
        titre: "Exemple 3.5 — Test d'une UGT minière comportant une obligation de remise en état (en millions de USD)",
        liste: [
          "L'UGT regroupe 900 d'actifs. La provision pour remise en état comptabilisée s'élève à 300 et serait reprise par tout acquéreur. La juste valeur de la mine, obligation de remise en état comprise, diminuée des coûts de sortie, est de 550. La valeur d'utilité des flux d'exploitation, hors décaissements de remise en état, est de 800.",
          "Valeur comptable retenue pour la comparaison : 900 − 300 = 600.",
          "Valeur d'utilité retenue pour la comparaison : 800 − 300 = 500.",
          "Valeur recouvrable : max (550 ; 500) = 550.",
          "Perte de valeur : 600 − 550 = 50, répartie entre les actifs de l'UGT.",
        ],
        note: "La comparaison de 900 à 800, qui ferait apparaître une perte de 100, ou de 600 à 800, qui n'en ferait apparaître aucune, repose sur des grandeurs hétérogènes et conduit à un résultat erroné.",
      },
    ],
  },
  {
    numero: '3.5',
    titre: "Le goodwill, les actifs communs et l'imputation de la perte",
    navLabel: 'Goodwill',
    blocs: [
      { type: 'intertitre', texte: "3.5.1 Affectation et test du goodwill" },
      {
        type: 'paragraphe',
        texte: "Le goodwill ne génère pas de flux de trésorerie indépendamment des autres actifs (§ 81). Il est affecté, dès la date d'acquisition, aux UGT ou groupes d'UGT qui doivent bénéficier des synergies du regroupement, au niveau le plus bas auquel il fait l'objet d'un suivi pour les besoins de la gestion interne, sans dépasser la taille d'un secteur opérationnel au sens d'IFRS 8 (§ 80). Si l'affectation initiale ne peut être achevée au cours de l'exercice du regroupement, elle doit l'être « avant la fin du premier exercice commençant après la date d'acquisition » (§ 84). Lorsque l'entité cède une activité d'une UGT, le goodwill lié à cette activité est inclus dans sa valeur comptable pour déterminer le résultat de cession et évalué, en principe, sur la base des valeurs relatives de l'activité cédée et de la partie conservée (§ 86) ; une réorganisation des UGT entraîne une réaffectation selon la même méthode (§ 87).",
      },
      {
        type: 'paragraphe',
        texte: "L'UGT à laquelle un goodwill est affecté est testée chaque année, à la même date, ainsi qu'à chaque indice de perte de valeur ; si le goodwill a été acquis au cours de l'exercice, le test intervient avant la clôture (§ 90 et 96). Lorsque des actifs de l'UGT présentent un indice, ils sont testés en premier, puis l'UGT, puis le groupe d'UGT portant le goodwill (§ 97-98). Le calcul détaillé le plus récent peut être réutilisé si la composition de l'unité n'a pas sensiblement varié, si ce calcul faisait apparaître un excédent substantiel et s'il est très peu probable que cet excédent ait disparu (§ 99). Les actifs communs, tels que l'immeuble du siège, les équipements informatiques ou un centre de recherche, ne génèrent pas d'entrées indépendantes ; leur valeur comptable est affectée aux UGT sur une base raisonnable et cohérente, ou, à défaut, l'UGT est testée sans eux, puis le plus petit groupe d'UGT auquel ils peuvent être affectés est testé (§ 100-102).",
      },
      { type: 'intertitre', texte: "3.5.2 Imputation de la perte de valeur d'une UGT" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 36, § 104 et 105",
        texte: "La perte de valeur « doit être répartie, en réduction de la valeur comptable des actifs de l'unité (du groupe d'unités) dans l'ordre suivant : (a) tout d'abord, réduction de la valeur comptable de tout goodwill affecté à l'unité génératrice de trésorerie (au groupe d'unités) ; et (b) ensuite, réduction des autres actifs de l'unité (du groupe d'unités) au prorata de la valeur comptable de chaque actif dans l'unité (le groupe d'unités). » (§ 104). L'entité « ne doit pas réduire la valeur comptable d'un actif en dessous du plus élevé de : (a) sa juste valeur diminuée des coûts de sortie (si on peut l'évaluer) ; (b) sa valeur d'utilité (si on peut la déterminer) ; et (c) zéro. » (§ 105).",
      },
      {
        type: 'carte',
        titre: "Exemple 3.6 — Imputation d'une perte de valeur sur une UGT portant un goodwill (BRASSERIE DU FLEUVE, société fictive)",
        texte: "L'UGT comprend un goodwill de 300, une usine de 1 200, du matériel pour 600 et une marque acquise de 300, soit une valeur comptable totale de 2 400. Sa valeur recouvrable s'élève à 1 500. La juste valeur diminuée des coûts de sortie de l'usine est de 1 000.",
        tableau: {
          entetes: ['Actif', 'Valeur comptable', 'Imputation au prorata', 'Imputation après plancher (§ 105)', 'Valeur après test'],
          lignes: [
            ['Goodwill', '300', '300', '300', '0'],
            ['Usine', '1 200', '342,9', '200 (plancher de 1 000)', '1 000'],
            ['Matériel', '600', '171,4', '171,4 + 95,2 = 266,7', '333,3'],
            ['Marque', '300', '85,7', '85,7 + 47,6 = 133,3', '166,7'],
            ['Total', '2 400', '900', '900', '1 500'],
          ],
        },
        note: "La fraction de perte que l'usine ne peut absorber, soit 142,9, est répartie entre le matériel et la marque au prorata de leurs valeurs comptables (600 et 300). Une reprise ultérieure serait répartie entre l'usine, le matériel et la marque, dans la limite de leur valeur en l'absence de perte, mais jamais sur le goodwill (§ 122-124).",
      },
      {
        type: 'paragraphe',
        texte: "L'interdiction de reprendre une perte de valeur du goodwill (§ 124) repose sur une justification précise : une augmentation ultérieure de la valeur recouvrable correspondrait vraisemblablement à un goodwill généré en interne, dont IAS 38 interdit la comptabilisation, plutôt qu'à une reprise de la perte constatée sur le goodwill acquis (§ 125). Lorsque les participations ne donnant pas le contrôle ont été évaluées à leur quote-part de l'actif net identifiable, le goodwill comptabilisé ne représente que la part du groupe, alors que la valeur recouvrable de l'UGT reflète la totalité de ses flux ; la valeur comptable du goodwill est donc majorée, pour les besoins du test, du goodwill attribuable aux participations ne donnant pas le contrôle (annexe C, § C4), et seule la perte afférente au goodwill de la société mère est comptabilisée (§ C8). Ce point est repris avec les regroupements d'entreprises.",
      },
    ],
  },
  {
    numero: '3.6',
    titre: "Informations à fournir et revue d'un test de dépréciation",
    navLabel: 'Informations',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Un test de dépréciation repose sur des prévisions, des taux et des choix d'agrégation que le lecteur des états financiers ne peut reproduire. IAS 36 compense cette asymétrie d'information par des obligations de publication étendues. L'entité indique, par catégorie d'actifs, les pertes de valeur et les reprises comptabilisées en résultat net et en autres éléments du résultat global (§ 126), ainsi que leur ventilation par secteur (§ 129). Pour chaque perte ou reprise significative, elle décrit les événements qui l'ont provoquée, son montant, la nature de l'actif ou la composition de l'UGT et la base de la valeur recouvrable, avec, selon le cas, le niveau de la hiérarchie de juste valeur, la technique d'évaluation et les hypothèses clés, ou le taux d'actualisation (§ 130).",
      },
      {
        type: 'paragraphe',
        texte: "Pour chaque UGT portant un goodwill ou des immobilisations incorporelles à durée d'utilité indéterminée d'un montant important, l'entité indique en outre les hypothèses clés, la période de projection, le taux de croissance utilisé pour l'extrapolation et le taux d'actualisation (§ 134(a)-(e)). Le § 134(f) vise le cas où un changement raisonnablement possible d'une hypothèse clé ramènerait la valeur recouvrable en deçà de la valeur comptable : l'entité indique alors « le montant de l'excédent de la valeur recouvrable de l'unité (du groupe d'unités) sur sa valeur comptable », « la valeur attribuée à l'hypothèse clé » et le montant du changement qui rendrait la valeur recouvrable égale à la valeur comptable. Cette information permet au lecteur d'apprécier la marge dont dispose l'entité avant une nouvelle dépréciation.",
      },
      {
        type: 'carte',
        titre: "Tableau 3.3 — Points de contrôle d'un test de dépréciation",
        tableau: {
          entetes: ['Domaine', 'Point de contrôle', 'Fondement'],
          lignes: [
            ['Budgets', "Approbation par la direction, horizon limité à cinq ans, analyse des écarts passés entre prévisions et réalisations", '§ 33-34'],
            ['Croissance terminale', "Taux n'excédant pas le taux moyen à long terme du pays et du secteur", '§ 33(c)'],
            ['Périmètre des flux', "Exclusion des restructurations non engagées, des améliorations de performance, des flux de financement et d'impôt", '§ 44-50'],
            ["Taux d'actualisation", "Taux avant impôt, cohérent avec la monnaie des flux et le traitement de l'inflation, sans double prise en compte du risque", '§ 40 et 54-56'],
            ['Valeur comptable', "Périmètre identique à celui de la valeur recouvrable, y compris les passifs repris par l'acquéreur", '§ 75-79'],
            ['Imputation', "Goodwill en premier, puis prorata, respect du plancher", '§ 104-105'],
          ],
        },
      },
    ],
  },
  {
    numero: '3.7',
    titre: "La dépréciation des immobilisations dans le SYSCOHADA révisé",
    navLabel: 'Rapprochement SYSCOHADA',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le SYSCOHADA révisé déclare s'inspirer d'IAS 36 (Titre VIII, ch. 12) et en reprend l'essentiel de la mécanique : recherche d'indices à chaque clôture, selon une liste très proche ; dépréciation obligatoire même en l'absence de bénéfice (AUDCIF, art. 46) ; établissement d'un nouveau plan d'amortissement après dépréciation ; reprise plafonnée à la valeur nette qu'aurait eue l'actif en l'absence de dépréciation ; imputation prioritaire sur le goodwill au sein d'un groupe d'actifs, sans reprise possible ; imputation sur l'écart de réévaluation pour un actif réévalué. Il s'en écarte toutefois sur la valeur de comparaison.",
      },
      {
        type: 'carte',
        titre: "Tableau 3.4 — IAS 36 et SYSCOHADA révisé",
        tableau: {
          entetes: ['', 'IAS 36', 'SYSCOHADA révisé'],
          lignes: [
            ['Valeur de comparaison', "Valeur recouvrable : max (juste valeur diminuée des coûts de sortie ; valeur d'utilité)", "Valeur actuelle (AUDCIF, art. 42), assimilée au coût actuel"],
            ['Nature de la valeur', "Valeur de sortie ou valeur d'usage", "Valeur d'entrée : prix actuel d'acquisition d'un bien équivalent, corrigé de l'âge"],
            ['Point de vue', "Intervenants du marché ou entité elle-même", "Acquéreur de l'entité, dans l'hypothèse de la continuité d'exploitation"],
            ['Prix de revente du bien isolé', "Composante possible, par la juste valeur", "Retenu seulement en cas de non-continuité ou de marché très actif"],
            ['Seuil', "Toute perte, sous réserve de l'importance relative", "Écart significatif entre valeur nette comptable et valeur actuelle"],
            ['Niveau du test', "UGT, définie par l'indépendance des entrées de trésorerie", "Groupe d'actifs suivi par ligne de produits, secteur ou implantation"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Le SYSCOHADA illustre sa démarche par l'exemple d'un pont roulant de 30 tonnes acquis 300 000 000 F et mis en service le 31 décembre : un acquéreur de l'entité ne l'évaluerait pas à moins de 300 000 000 F, montant nécessaire pour disposer d'un matériel neuf équivalent, alors que sa revente n'en procurerait « peut-être à peine la moitié ». Aucune dépréciation n'est donc constatée. IAS 36 conduirait au même résultat par un autre raisonnement : si l'usine est rentable, la valeur d'utilité de l'UGT à laquelle appartient le pont couvre sa valeur comptable. Les deux référentiels divergent en revanche lorsque le prix du neuf baisse sans que les flux diminuent, cas dans lequel le SYSCOHADA conduit à déprécier et IAS 36 non, et lorsque les flux diminuent alors que le prix du neuf se maintient, cas inverse.",
      },
    ],
  },
  {
    numero: '3.8',
    titre: "Les immeubles de placement : définition et classement",
    navLabel: 'IAS 40 : classement',
    blocs: [
      { type: 'intertitre', texte: "3.8.1 Définition" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 40, § 5 et 7",
        texte: "Un immeuble de placement est « un bien immobilier (terrain ou bâtiment — ou partie d'un bâtiment — ou les deux) détenu (par le propriétaire ou, en tant qu'actif au titre du droit d'utilisation, par le preneur) pour en retirer des loyers ou pour réaliser une plus-value en capital ou les deux, plutôt que pour : (a) l'utiliser dans la production ou la fourniture de biens ou de services ou à des fins administratives ; ou (b) le vendre dans le cadre de l'activité ordinaire » (§ 5). Par conséquent, « un immeuble de placement génère des flux de trésorerie largement indépendants des autres actifs détenus par l'entité » (§ 7).",
      },
      {
        type: 'paragraphe',
        texte: "Le critère distinctif est d'ordre économique. Un immeuble de bureaux loué à des tiers produit des loyers par lui-même, alors que le siège d'une brasserie ne produit aucun flux indépendamment de l'activité de production et de vente. La norme dresse une liste d'exemples dans chaque sens.",
      },
      {
        type: 'carte',
        titre: "Tableau 3.5 — Exemples de qualification (IAS 40, § 8 et 9)",
        tableau: {
          entetes: ['Immeubles de placement (§ 8)', 'Biens exclus de la catégorie (§ 9)'],
          lignes: [
            ['Terrain détenu pour valoriser le capital à long terme', "Bien détenu en vue de la vente dans le cadre de l'activité ordinaire, ou en construction en vue d'une telle vente (IAS 2)"],
            ["Terrain dont l'utilisation future est indéterminée", "Bien occupé par son propriétaire, y compris par des membres du personnel, que ceux-ci paient ou non un loyer (IAS 16)"],
            ['Bâtiment donné en location simple', "Bien occupé par son propriétaire en attendant d'être vendu"],
            ['Bâtiment vacant détenu en vue d\'être loué', 'Bien donné en location-financement à une autre entité'],
            ["Bien en construction en vue d'une utilisation ultérieure comme immeuble de placement", '—'],
          ],
        },
      },
      { type: 'intertitre', texte: "3.8.2 Démarche de classement" },
      {
        type: 'paragraphe',
        texte: "Le classement d'un bien immobilier peut suivre une démarche en plusieurs étapes. Un bien détenu en vue de sa vente dans le cadre de l'activité ordinaire, ou aménagé en vue de cette vente, relève d'IAS 2 ; un bien dont la vente est hautement probable dans les douze mois, dans son état actuel, doit être examiné au regard d'IFRS 5 ; un bien occupé par l'entité ou par son personnel relève d'IAS 16, ou d'IFRS 16 s'il est détenu en location ; un bien loué avec des services significatifs, tel qu'un hôtel exploité par son propriétaire, relève également d'IAS 16 (§ 11-13). Lorsqu'un bien comporte une partie louée et une partie occupée, les deux parties sont comptabilisées séparément si elles peuvent être vendues ou louées séparément ; à défaut, le bien n'est un immeuble de placement que si la partie occupée est non significative (§ 10). Lorsque le classement est délicat, l'entité définit des critères qu'elle applique de manière cohérente et qu'elle indique dans les notes (§ 14 et 75(c)). Le SYSCOHADA révisé propose un schéma de qualification très proche (Titre VIII, ch. 10).",
      },
      {
        type: 'paragraphe',
        texte: "Trois situations fréquentes dans les entreprises congolaises illustrent ces règles. Les cités de travailleurs d'une société minière ou sucrière ne sont pas des immeubles de placement, même lorsque les salariés acquittent un loyer, en vertu du § 9(c), et relèvent d'IAS 16. Un terrain de réserve acquis sans décision quant à son utilisation est un immeuble de placement, puisque, lorsque l'entité n'a pas déterminé qu'elle l'occupera ou le vendra à court terme, « le terrain est considéré comme étant détenu pour réaliser une plus-value en capital » (§ 8(b)). Un entrepôt loué à une filiale est un immeuble de placement dans les états individuels du bailleur, mais un bien occupé par son propriétaire dans les états consolidés du groupe (§ 15).",
      },
    ],
  },
  {
    numero: '3.9',
    titre: "Les immeubles de placement : évaluation initiale et postérieure",
    navLabel: 'IAS 40 : évaluation',
    blocs: [
      { type: 'intertitre', texte: "3.9.1 Évaluation initiale et choix du modèle" },
      {
        type: 'paragraphe',
        texte: "Un immeuble de placement détenu en propre est comptabilisé lorsqu'il est probable que les avantages économiques futurs iront à l'entité et que son coût peut être évalué de façon fiable (§ 16). Il est évalué initialement à son coût, coûts de transaction compris, tels que les honoraires juridiques et les droits de mutation (§ 20-21). Les coûts de démarrage non nécessaires, les pertes d'exploitation subies avant que l'immeuble n'atteigne le niveau d'occupation prévu et les gaspillages anormaux en sont exclus (§ 23). Après la comptabilisation initiale, l'entité applique à l'ensemble de ses immeubles de placement une méthode unique, le modèle de la juste valeur ou le modèle du coût (§ 30), sous réserve de l'option du § 32A, qui permet un choix distinct pour les immeubles adossés à des passifs dont le rendement est directement lié à leur juste valeur ou au rendement qu'ils procurent.",
      },
      {
        type: 'carte',
        titre: "Tableau 3.6 — Modèle de la juste valeur et modèle du coût",
        tableau: {
          entetes: ['', 'Modèle de la juste valeur (§ 33-55)', 'Modèle du coût (§ 56 et 79)'],
          lignes: [
            ['Valeur au bilan', 'Juste valeur à la clôture (IFRS 13)', 'Coût diminué des amortissements et des pertes de valeur (IAS 16)'],
            ['Amortissement', 'Aucun', 'Oui, par composants'],
            ['Variations de valeur', 'En résultat net (§ 35)', 'Pertes de valeur selon IAS 36'],
            ['Juste valeur', 'Au bilan', 'Indiquée dans les notes (§ 32 et 79(e))'],
            ['Test de dépréciation', 'Non applicable (IAS 36.2(f))', 'Applicable'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Le modèle de la juste valeur obéit à trois règles techniques. Les équipements intégrés à l'immeuble, tels que les ascenseurs ou la climatisation, et le mobilier d'un bureau loué meublé sont compris dans sa juste valeur et ne sont pas comptabilisés séparément, tandis que les loyers payés d'avance ou à recevoir constituent des actifs ou passifs distincts (§ 50). La norme pose une présomption réfutable selon laquelle la juste valeur peut être évaluée de façon fiable et continue ; lorsque, exceptionnellement, tel n'est pas le cas, faute de marché actif et d'autre méthode fiable, l'immeuble est évalué au coût, et un immeuble en construction est évalué au coût jusqu'à ce que sa juste valeur devienne fiable ou jusqu'à son achèvement (§ 53-53B). Enfin, un immeuble évalué à la juste valeur continue de l'être jusqu'à sa sortie, même si les transactions comparables se raréfient (§ 55). La norme ajoute qu'« il est hautement improbable que l'abandon du modèle de la juste valeur pour le modèle du coût permette une présentation plus appropriée » (§ 31).",
      },
      { type: 'intertitre', texte: "3.9.2 Applications chiffrées" },
      {
        type: 'carte',
        titre: "Exemple 3.7 — Immeuble de bureaux évalué selon les deux modèles (en milliers de USD)",
        texte: "Un immeuble de bureaux situé à Lubumbashi est acquis au début de N pour 2 000, frais d'acquisition compris : terrain 500, bâtiment 1 500 amorti sur 30 ans. Sa juste valeur s'élève à 2 300 à la fin de N. Les loyers de N s'élèvent à 180.",
        tableau: {
          entetes: ['', 'Modèle de la juste valeur', 'Modèle du coût'],
          lignes: [
            ['Valeur au bilan fin N', '2 300', '2 000 − 50 = 1 950'],
            ['Amortissement de N', '0', '1 500 / 30 = 50'],
            ['Variation de juste valeur en résultat', '+ 300', '0'],
            ['Effet sur le résultat de N (hors autres charges)', '180 + 300 = 480', '180 − 50 = 130'],
            ['Information en notes', 'Rapprochement des justes valeurs (§ 76)', 'Juste valeur de 2 300 (§ 79(e))'],
          ],
        },
        note: "Le modèle de la juste valeur rend le résultat sensible à l'évolution du marché immobilier : une baisse de 15 % de la juste valeur en N+1 se traduirait par une perte de 345.",
      },
      {
        type: 'carte',
        titre: "Exemple 3.8 — Immeuble loué évalué à la juste valeur ou au coût (IMMO PLUS SA)",
        liste: [
          "IMMO PLUS SA détient un immeuble loué à des tiers, acquis au début de N−5 pour 5 000 000 USD ; la durée d'amortissement retenue selon le modèle du coût est de 25 ans. Au 31 décembre N, un expert indépendant l'évalue à 4 300 000.",
          "Selon le modèle du coût, la valeur nette s'établit à 5 000 000 − 6 × 200 000 = 3 800 000, après six exercices d'amortissement. La valeur recouvrable, proche de la valeur de marché, excède cette valeur nette : aucune dépréciation n'est constatée. L'amortissement se poursuit et la juste valeur de 4 300 000 est indiquée dans les notes (§ 79(e)).",
          "Selon le modèle de la juste valeur, appliqué depuis l'acquisition, l'immeuble n'est pas amorti et figurait à la fin de N−1 pour sa juste valeur à cette date, soit par hypothèse 4 150 000. La variation de N, 4 300 000 − 4 150 000 = 150 000, est comptabilisée en résultat net (§ 35), par le débit du compte d'immeuble de placement et le crédit d'un compte de produit.",
        ],
        note: "La variation de juste valeur se mesure par rapport à la juste valeur de la clôture précédente, et non par rapport à la valeur nette qu'aurait donnée le modèle du coût. Elle ne transite par aucun écart de réévaluation, ce qui distingue le modèle de la juste valeur d'IAS 40 du modèle de la réévaluation d'IAS 16.",
      },
      {
        type: 'carte',
        titre: "Tableau 3.7 — IAS 36 et IAS 40 (modèle de la juste valeur) : synthèse",
        tableau: {
          entetes: ['Élément', 'IAS 36', 'IAS 40, modèle de la juste valeur'],
          lignes: [
            ['Nature', 'Norme de prudence', "Norme d'évaluation"],
            ['Dépréciation', 'Oui', 'Non : la baisse de valeur est une variation de juste valeur'],
            ['Incidence', "Résultat net, ou capitaux propres pour un actif réévalué", 'Résultat net'],
            ['Logique', "Correction d'une surévaluation", 'Mise à jour de la valeur dans les deux sens'],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Rapprochement avec le SYSCOHADA révisé",
        texte: "Le SYSCOHADA révisé reprend la définition, les exemples et les cas particuliers d'IAS 40, et crée des comptes dédiés (2281 Terrains immeubles de placement, 2315 et 2325 Bâtiments immeubles de placement). Il n'en reprend pas le modèle de la juste valeur : à la clôture, les immeubles de placement sont amortis sur leur durée d'utilité, et les transferts entre catégories sont sans incidence sur leur valeur comptable. Il évalue l'immeuble acquis par échange à la valeur comptable de l'actif remis, alors qu'IAS 40.27 retient la juste valeur lorsque l'échange a une substance commerciale. Son texte annonce enfin un cas qu'il ne développe pas, le « droit sur un bien immobilier » [texte officiel].",
      },
    ],
  },
  {
    numero: '3.10',
    titre: "Les immeubles de placement : transferts et sorties",
    navLabel: 'IAS 40 : transferts',
    blocs: [
      { type: 'intertitre', texte: "3.10.1 Les transferts" },
      {
        type: 'paragraphe',
        texte: "L'entité transfère un bien vers la catégorie des immeubles de placement, ou depuis celle-ci, « si, et seulement si, il y a changement d'utilisation » ; la norme précise qu'« un changement dans les intentions de la direction quant à l'utilisation d'un bien immobilier ne constitue pas en soi une indication d'un changement d'utilisation » (§ 57). Les indications d'un changement d'utilisation sont le commencement d'une occupation par le propriétaire, le commencement d'un aménagement en vue de la vente, la fin de l'occupation par le propriétaire et la conclusion d'un contrat de location simple portant sur un bien jusque-là classé en stocks. La décision de vendre un immeuble de placement sans aménagement ne le fait pas sortir de la catégorie, pas plus que son réaménagement en vue de continuer à le louer (§ 58).",
      },
      {
        type: 'carte',
        titre: "Tableau 3.8 — Traitement des transferts",
        tableau: {
          entetes: ['Transfert', 'Traitement', 'Fondement'],
          lignes: [
            ['Immeuble de placement évalué à la juste valeur vers bien occupé ou stocks', 'La juste valeur à la date du changement devient le coût présumé', '§ 60'],
            ['Bien occupé vers immeuble de placement évalué à la juste valeur', "Application d'IAS 16 jusqu'au changement, puis traitement de l'écart comme une réévaluation selon IAS 16", '§ 61-62'],
            ['Stocks vers immeuble de placement évalué à la juste valeur', 'Écart entre juste valeur et valeur comptable en résultat net', '§ 63-64'],
            ['Immeuble construit pour soi-même, achevé', 'Écart entre juste valeur et valeur comptable en résultat net', '§ 65'],
            ['Entité appliquant le modèle du coût', 'Les transferts ne modifient ni la valeur comptable ni le coût', '§ 59'],
          ],
        },
      },
      {
        type: 'carte',
        titre: "Exemple 3.9 — Transfert d'un bâtiment administratif en immeuble de placement",
        liste: [
          "Un bâtiment administratif d'un coût de 1 000, amorti à hauteur de 200 (valeur nette 800), est libéré le 30 juin N et loué à des tiers. L'entité évalue ses immeubles de placement selon le modèle de la juste valeur. La juste valeur s'élève à 1 100 au 30 juin et à 1 050 au 31 décembre.",
          "Jusqu'au 30 juin, le bâtiment est amorti et soumis à IAS 36 selon IAS 16 (§ 62).",
          "Au 30 juin, l'écart de 1 100 − 800 = 300 est traité comme une réévaluation selon IAS 16 et comptabilisé en autres éléments du résultat global, aucune perte de valeur antérieure n'étant à reprendre (§ 62(b)).",
          "Au 31 décembre, la baisse de 50 est comptabilisée en résultat net selon IAS 40.35, l'immeuble relevant désormais du modèle de la juste valeur.",
          "Lors de la sortie ultérieure de l'immeuble, l'écart de réévaluation de 300 pourra être transféré en résultats non distribués, sans transiter par le résultat net (§ 62(b)(ii)).",
        ],
      },
      { type: 'intertitre', texte: "3.10.2 Les sorties" },
      {
        type: 'paragraphe',
        texte: "Un immeuble de placement est décomptabilisé lors de sa sortie, par vente ou par conclusion d'un contrat de location-financement, ou lorsque son utilisation est arrêtée de manière permanente et qu'aucun avantage économique futur n'est attendu de sa sortie (§ 66-67). Le profit ou la perte, égal à la différence entre le produit net de la sortie et la valeur comptable, est comptabilisé en résultat net (§ 69). Les indemnisations reçues de tiers au titre d'immeubles dépréciés, perdus ou abandonnés sont comptabilisées en résultat net lorsqu'elles deviennent exigibles (§ 72). Les obligations conservées par le vendeur après la sortie, telles qu'une garantie contre les impayés de loyers ou un passif environnemental, relèvent d'IAS 37 (§ 71).",
      },
      {
        type: 'paragraphe',
        texte: "La confrontation d'IAS 36, d'IAS 16 et d'IAS 40 éclaire l'importance des critères de classement. IAS 36 part du coût et ne corrige la valeur qu'à la baisse, sous condition d'indice et avec une reprise plafonnée. IAS 40, selon le modèle de la juste valeur, suit l'évolution du marché dans les deux sens, en résultat net. IAS 16 offre, avec le modèle de la réévaluation, une troisième voie, la variation de valeur étant portée en capitaux propres. Un même immeuble peut ainsi produire des résultats différents selon qu'il est occupé, loué ou réévalué.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ue13c3-cp1',
    titre: "Perte de valeur et reprise sur un actif isolé (TRANSLOG SA)",
    contexte: "TRANSLOG SA évalue son immeuble d'exploitation selon le modèle de la réévaluation d'IAS 16. Au 1er janvier N, l'écart de réévaluation créditeur s'élève à 12 000 USD. Au 31 décembre N, la valeur nette comptable est de 180 000 et la valeur recouvrable de 160 000 ; la durée d'utilité restante est de 16 ans, sans valeur résiduelle. Au 31 décembre N+1, TRANSLOG signe un contrat logistique de longue durée avec une société minière : les flux attendus de l'immeuble augmentent et sa valeur recouvrable est estimée à 175 000. Aucune nouvelle réévaluation n'est pratiquée.",
    questions: [
      {
        num: 1,
        enonce: "Comptabilisez la perte de valeur au 31 décembre N.",
        correction: "Perte : 180 000 − 160 000 = 20 000 (IAS 36.59). Pour un actif réévalué, elle est traitée comme une réévaluation négative (§ 60) : 12 000 en autres éléments du résultat global, dans la limite de l'écart de réévaluation créditeur (IAS 16.40), et 8 000 en résultat net. Écritures : débit Écart de réévaluation 12 000 et débit Charges pour dépréciation 8 000, par le crédit des Dépréciations de l'immeuble pour 20 000.",
      },
      {
        num: 2,
        enonce: "Quel amortissement pour N+1, et quelle valeur nette fin N+1 ?",
        correction: "L'amortissement est recalculé sur la valeur comptable révisée (§ 63) : 160 000 / 16 = **10 000**. Valeur nette fin N+1 : 160 000 − 10 000 = **150 000**.",
      },
      {
        num: 3,
        enonce: "La valeur recouvrable remonte à 175 000. La reprise est-elle possible, et pour quel montant ?",
        correction: "Oui : la hausse provient d'un changement dans les estimations des flux futurs (§ 114 et 115(b)), non du seul passage du temps. Plafond (§ 117) : la valeur nette qu'aurait eue l'immeuble sans perte, soit 180 000 − 180 000 / 16 = 168 750. La valeur est donc portée à 168 750, et non à 175 000 : **reprise de 18 750**. Au-delà, ce serait une réévaluation, qui supposerait une nouvelle réévaluation selon IAS 16 (§ 118).",
      },
      {
        num: 4,
        enonce: "Où comptabiliser cette reprise ?",
        correction: "Pour un actif réévalué, la reprise est traitée comme une réévaluation positive selon IAS 16 (IAS 36.119). IAS 16.39 : l'augmentation va en autres éléments du résultat global, mais « doit être comptabilisée en résultat net dans la mesure où elle compense une diminution de réévaluation du même actif, précédemment comptabilisée en résultat net ». D'où **8 000 en résultat net**, qui compensent la charge de N, et **10 750 en autres éléments du résultat global**, qui reconstituent en partie l'écart de réévaluation. Les notes indiquent l'événement qui a provoqué la reprise, ici le contrat logistique (§ 130).",
      },
    ],
  },
  {
    id: 'ue13c3-cp2',
    titre: "Revue d'un test de dépréciation",
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
    titre: "Perte de valeur et reprise sur une unité génératrice de trésorerie portant un goodwill",
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
        correction: "Parce qu'IAS 36.125 considère que toute hausse ultérieure de la valeur recouvrable attribuable au goodwill serait, en substance, un goodwill généré en interne, que IAS 38.48 interdit de comptabiliser. La perte sur goodwill est donc irréversible, en IFRS comme en SYSCOHADA révisé. L'asymétrie est assumée : qui incite à ne pas surévaluer le goodwill lors du regroupement initial.",
      },
    ],
  },
  {
    id: 'ue13c3-cp4',
    titre: "Classement et évaluation d'un patrimoine immobilier (GOMBE TOWERS SA)",
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
  sousTitre: "IAS 36 et IAS 40 : dépréciation des actifs, unités génératrices de trésorerie et immeubles de placement",
  infoBulle: "Chapitre 3 du module IFRS/IAS : champ et indices de perte de valeur, valeur recouvrable (juste valeur diminuée des coûts de sortie, valeur d'utilité), perte et reprise, unités génératrices de trésorerie, goodwill et cascade d'imputation, informations à fournir ; immeubles de placement (définition, classement, modèles du coût et de la juste valeur, transferts, sorties) ; passerelles avec le SYSCOHADA révisé, illustrées par des entreprises commerciales et industrielles.",
  loiRef: "IAS 36 · IAS 40 · IFRS 5 · IFRS 13 · AUDCIF art. 42, 43 et 46 · SYSCOHADA, Titre VIII, ch. 10 et 12",
  moduleLabel: 'UE 13 · IFRS / IAS',
  retourRoute: '/ue13-ifrs-ias',
  coursId: 'ue13-ifrs-ias',
  objectifs: [
    "Délimiter le champ d'application d'IAS 36 et identifier les circonstances qui imposent un test de dépréciation.",
    "Déterminer une valeur recouvrable : juste valeur diminuée des coûts de sortie et valeur d'utilité, avec ses règles de construction (flux, horizon, taux, devises).",
    "Comptabiliser une perte de valeur et sa reprise, y compris sur un actif réévalué, en respectant le plafond de reprise.",
    "Identifier une UGT et construire une valeur comptable homogène, y compris en présence d'un passif de remise en état.",
    "Affecter et tester le goodwill, imputer une perte en cascade avec le plancher du § 105, traiter les actifs communs.",
    "Apprécier la pertinence des hypothèses d'un test de dépréciation et des informations fournies en annexe.",
    "Comparer la dépréciation IAS 36 avec celle du SYSCOHADA révisé.",
    "Classer un bien immobilier (IAS 40, IAS 16, IAS 2, IFRS 5) et l'évaluer selon le modèle du coût ou de la juste valeur.",
    "Comptabiliser les transferts et les sorties d'immeubles de placement.",
  ],
  sections: SECTIONS,
  aRetenir: [
    "IAS 36 plafonne la valeur comptable d'un actif à sa valeur recouvrable. Le test est réalisé dès qu'un indice de perte de valeur existe ; il est annuel et obligatoire pour le goodwill et les incorporelles à durée indéterminée ou non encore prêtes à l'emploi (§ 9-11).",
    "Valeur recouvrable = max (juste valeur − coûts de sortie ; valeur d'utilité) (§ 18). La valeur d'utilité repose sur des budgets de cinq ans au plus, une croissance terminale prudente, l'actif dans son état actuel, sans flux de financement ni d'impôt, et un taux avant impôt cohérent avec la monnaie des flux (§ 33-57).",
    "La perte va en résultat, ou d'abord en réduction de l'écart de réévaluation pour un actif réévalué (§ 59-61). La reprise exige un changement d'estimation, jamais le seul passage du temps, et elle est plafonnée à la valeur nette qu'aurait eue l'actif sans perte (§ 114-117).",
    "L'UGT est le plus petit groupe d'actifs générant des entrées largement indépendantes (§ 6, 66-73). Sa valeur comptable est homogène avec sa valeur recouvrable, passif repris par l'acheteur compris (§ 75-79).",
    "Le goodwill est affecté aux UGT bénéficiant des synergies (§ 80). La perte est imputée d'abord sur le goodwill, puis au prorata des autres actifs, sans descendre sous leur valeur recouvrable propre (§ 104-105). La perte sur goodwill n'est jamais reprise (§ 124).",
    "Le SYSCOHADA révisé partage la mécanique d'IAS 36, mais compare la VNC à la valeur actuelle, c'est-à-dire au coût actuel corrigé de l'âge, du point de vue d'un acquéreur de l'entité.",
    "Un immeuble de placement est détenu pour ses loyers ou sa valorisation et génère des flux largement indépendants (IAS 40.5-7) ; hôtels exploités, biens occupés par le personnel et biens à vendre dans l'activité ordinaire en sont exclus.",
    "L'entité applique un modèle unique à l'ensemble de ses immeubles de placement : le modèle de la juste valeur, avec variations en résultat et sans amortissement, ou le modèle du coût, assorti de la juste valeur en annexe (§ 30-56, 79). Le SYSCOHADA révisé ne connaît que le coût.",
    "Un transfert n'intervient qu'en cas de changement d'utilisation (§ 57) : juste valeur comme coût présumé en sortie de catégorie ; réévaluation IAS 16 à l'entrée depuis un bien occupé ; résultat net à l'entrée depuis les stocks (§ 60-65).",
  ],
  references: [
    { genre: 'texte', intitule: "IAS 36 — Dépréciation d'actifs", precision: "§§ 1 à 137, annexes A et C (texte français intégral)" },
    { genre: 'texte', intitule: "IAS 40 — Immeubles de placement", precision: "§§ 1 à 79 (texte français intégral)" },
    { genre: 'texte', intitule: "IFRS 5 — Actifs non courants détenus en vue de la vente et activités abandonnées", precision: "§§ 6 à 9 et 15" },
    { genre: 'texte', intitule: "AUDCIF et SYSCOHADA révisé", precision: "art. 42, 43 et 46 ; Titre VIII, ch. 10 (immeubles de placement) et ch. 12 (dépréciation des immobilisations)" },
    { genre: 'texte', intitule: "J.-B. Tshimanga Mulumba (CPCC), IFRS - Dépréciation des actifs", precision: "support de cours, module 3 : illustrations INDUSTRIA, TRANSLOG et IMMO PLUS" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "IAS 36, IAS 40 et IFRS 5 (texte français intégral) ; IFRS 13, IAS 16 ; Cadre conceptuel 2018 (texte anglais) ; AUDCIF et SYSCOHADA révisé ; support de cours du module 3 (J.-B. Tshimanga Mulumba, CPCC).",
}

export default chapitre
