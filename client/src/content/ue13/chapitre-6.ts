import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 13 — Chapitre 6 : Impôts différés, monnaies étrangères et avantages du
// personnel (IAS 12, IAS 21, IAS 19)
//
// Sources lues sur texte pendant la rédaction :
// - IAS 12 (texte français intégral) : objectif, §§ 1 à 36, 46 à 61A, 71, 74,
//   80 et 81, avec les exemples des §§ 7, 8, 16, 22, 25, 51A et 51C.
// - IAS 21 (texte français intégral) : §§ 1 à 52.
// - IAS 19 (texte français intégral) : §§ 1 à 20, 26 à 30, 43 à 45, 50 à 58,
//   63, 64, 66 à 76, 83 à 87, 120 à 128, 153 à 165.
// - AUDCIF : art. 17 et règles d'évaluation en devises ; SYSCOHADA révisé,
//   Titre VII (compte 195), Titre VIII, ch. 21 (engagements de retraite) et
//   ch. 22 (opérations en devises) ; Titres VI et XII-XIII (impôts différés
//   en consolidation).
// - Loi n° 23/053 du 30 novembre 2023 (IS, art. 56 et 57), via le skill
//   fiscalité RDC ; décret n° 18/041 du 24 novembre 2018 (taux CNSS).
// - Support de cours d'origine : J.-B. Tshimanga Mulumba (CPCC), « Impôts
//   différés, monnaies étrangères & avantages du personnel », module 6 ; ses
//   illustrations sont reprises et, lorsqu'elles contiennent une erreur,
//   rectifiées dans le texte (illustration 2 d'IAS 12 ; illustrations 1 et 2
//   d'IAS 19 ; référence à l'IBP, abrogé depuis le 1er janvier 2026).
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'ue13c6-q1',
    question: "Selon IAS 12, une différence temporaire est :",
    options: [
      { id: 'a', texte: "l'écart entre le bénéfice comptable et le bénéfice imposable d'une période" },
      { id: 'b', texte: "la différence entre la valeur comptable d'un actif ou d'un passif et sa base fiscale" },
      { id: 'c', texte: "une charge non déductible" },
      { id: 'd', texte: "l'écart entre l'impôt exigible et l'impôt payé" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 12.5 définit les différences temporaires comme « les différences entre la valeur comptable d'un actif ou d'un passif dans l'état de la situation financière et sa base fiscale ». L'approche est bilantielle : l'écart entre résultats comptable et fiscal d'une période (différence temporelle) n'en est qu'une des sources (§ 17).",
    articleRef: "IAS 12.5 et 17",
  },
  {
    id: 'ue13c6-q2',
    question: "Des intérêts courus à recevoir de 100 ne seront imposés qu'à l'encaissement. Quelle est leur base fiscale ?",
    options: [
      { id: 'a', texte: "100" },
      { id: 'b', texte: "Nulle" },
      { id: 'c', texte: "70, après impôt de 30 %" },
      { id: 'd', texte: "Indéterminable" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 12.7, exemple 2 : « Des intérêts à recevoir ont une valeur comptable de 100. Ces produits d'intérêt seront imposés lors de leur encaissement. La base fiscale des intérêts à recevoir est nulle. » La différence temporaire imposable de 100 génère un passif d'impôt différé.",
    articleRef: "IAS 12.7",
  },
  {
    id: 'ue13c6-q3',
    question: "Une provision pour garantie de 100 n'est déductible fiscalement qu'au paiement. Quelle est sa base fiscale et quelle différence en résulte ?",
    options: [
      { id: 'a', texte: "Base fiscale 100 ; aucune différence" },
      { id: 'b', texte: "Base fiscale nulle ; différence temporaire déductible de 100, source d'un actif d'impôt différé" },
      { id: 'c', texte: "Base fiscale nulle ; différence temporaire imposable de 100, source d'un passif d'impôt différé" },
      { id: 'd', texte: "Base fiscale 100 ; différence permanente" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 12.8 : la base fiscale d'un passif est sa valeur comptable moins tout montant fiscalement déductible dans le futur, soit 100 − 100 = 0. L'exemple du § 25 conclut à une différence temporaire déductible de 100 et à un actif d'impôt différé, sous réserve de bénéfices imposables futurs suffisants.",
    articleRef: "IAS 12.8 et 25",
  },
  {
    id: 'ue13c6-q4',
    question: "Une amende de 100, non déductible fiscalement, figure au passif. Quel impôt différé comptabiliser ?",
    options: [
      { id: 'a', texte: "Un actif d'impôt différé de 30 (taux 30 %)" },
      { id: 'b', texte: "Aucun : la base fiscale est de 100 et il n'y a pas de différence temporaire" },
      { id: 'c', texte: "Un passif d'impôt différé de 30" },
      { id: 'd', texte: "Un actif d'impôt différé, sous condition de probabilité" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 12.8, exemple 4 : les amendes non déductibles ont une base fiscale égale à leur valeur comptable ; il n'y a pas de différence temporaire, donc pas d'actif d'impôt différé. Elles expliquent en revanche un écart dans la preuve d'impôt (§ 81(c)).",
    articleRef: "IAS 12.8",
  },
  {
    id: 'ue13c6-q5',
    question: "Pour lequel de ces éléments IAS 12 interdit-elle de comptabiliser un passif d'impôt différé ?",
    options: [
      { id: 'a', texte: "Une immobilisation amortie plus vite fiscalement que comptablement" },
      { id: 'b', texte: "La comptabilisation initiale d'un goodwill" },
      { id: 'c', texte: "Des intérêts courus imposables à l'encaissement" },
      { id: 'd', texte: "Des frais de développement déjà déduits fiscalement" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 12.15(a) : pas de passif d'impôt différé sur la comptabilisation initiale du goodwill, car celui-ci est un montant résiduel que le passif augmenterait (§ 21). Les trois autres situations sont des exemples de différences temporaires imposables donnant lieu à passif d'impôt différé (§ 17).",
    articleRef: "IAS 12.15 et 21",
  },
  {
    id: 'ue13c6-q6',
    question: "À quelle condition un actif d'impôt différé sur différences temporaires déductibles est-il comptabilisé ?",
    options: [
      { id: 'a', texte: "Toujours" },
      { id: 'b', texte: "S'il est probable que l'entité dégagera un bénéfice imposable auquel imputer ces différences" },
      { id: 'c', texte: "Seulement si l'administration fiscale l'a validé" },
      { id: 'd', texte: "Seulement dans les comptes consolidés" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 12.24 : l'actif d'impôt différé est comptabilisé « dans la mesure où il est probable que l'on dégagera un bénéfice imposable auquel imputer ces différences temporaires déductibles ». Les § 28-29 précisent les sources de ce bénéfice ; la valeur comptable est revue à chaque clôture (§ 56).",
    articleRef: "IAS 12.24, 28-29 et 56",
  },
  {
    id: 'ue13c6-q7',
    question: "Une entité présente un historique de pertes fiscales récentes. Que requiert IAS 12 pour comptabiliser un actif d'impôt différé sur ces pertes ?",
    options: [
      { id: 'a', texte: "Un simple budget prévoyant un retour aux bénéfices" },
      { id: 'b', texte: "Des différences temporaires imposables suffisantes ou d'autres indications convaincantes de bénéfices imposables futurs" },
      { id: 'c', texte: "Rien de particulier : les pertes sont toujours reportables" },
      { id: 'd', texte: "L'accord des actionnaires" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 12.35 : l'existence de pertes fiscales non utilisées est « une indication forte que des bénéfices imposables futurs risquent de ne pas être disponibles ». L'actif n'est comptabilisé que si l'entité dispose de différences temporaires imposables suffisantes ou d'autres indications convaincantes ; le § 82 impose alors d'indiquer les éléments probants.",
    articleRef: "IAS 12.34-36",
  },
  {
    id: 'ue13c6-q8',
    question: "Quel taux utilise-t-on pour évaluer les impôts différés ?",
    options: [
      { id: 'a', texte: "Le taux en vigueur lors de la naissance de la différence" },
      { id: 'b', texte: "Le taux dont l'application est attendue lors de la réalisation de l'actif ou du règlement du passif, sur la base des lois adoptées ou quasi adoptées à la clôture" },
      { id: 'c', texte: "Le taux moyen des cinq derniers exercices" },
      { id: 'd', texte: "Le taux projeté par la direction, même non adopté" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 12.47 : les actifs et passifs d'impôt différé sont évalués aux taux dont l'application est attendue sur la période de réalisation ou de règlement, sur la base des taux et lois adoptés ou quasi adoptés à la clôture. Une modification de taux ajuste les soldes existants (§ 60(a)).",
    articleRef: "IAS 12.47 et 60",
  },
  {
    id: 'ue13c6-q9',
    question: "Les actifs et passifs d'impôt différé sont-ils actualisés ?",
    options: [
      { id: 'a', texte: "Oui, au taux sans risque" },
      { id: 'b', texte: "Oui, si leur résorption dépasse un an" },
      { id: 'c', texte: "Non : IAS 12 n'impose ni n'autorise l'actualisation" },
      { id: 'd', texte: "Au choix de l'entité" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 12.53 : « Les actifs et passifs d'impôt différé ne doivent pas être actualisés. » Le § 54 justifie la règle par l'impossibilité fréquente d'établir le calendrier de résorption et par la comparabilité.",
    articleRef: "IAS 12.53-54",
  },
  {
    id: 'ue13c6-q10',
    question: "Une entité réévalue un terrain selon IAS 16, l'écart de réévaluation étant comptabilisé en autres éléments du résultat global. Où comptabilise-t-elle l'impôt différé correspondant ?",
    options: [
      { id: 'a', texte: "En résultat net" },
      { id: 'b', texte: "Dans les autres éléments du résultat global" },
      { id: 'c', texte: "En diminution du coût du terrain" },
      { id: 'd', texte: "Il n'y a pas d'impôt différé sur un terrain" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 12.61A : l'impôt afférent à des éléments comptabilisés hors résultat net suit le même traitement ; pour la réévaluation, il est comptabilisé dans les autres éléments du résultat global. Pour un actif non amortissable réévalué, l'évaluation reflète les conséquences fiscales d'un recouvrement par voie de vente (§ 51B).",
    articleRef: "IAS 12.51B et 61A",
  },
  {
    id: 'ue13c6-q11',
    question: "Dans les comptes individuels établis selon le SYSCOHADA révisé, les impôts différés :",
    options: [
      { id: 'a', texte: "sont comptabilisés comme en IFRS" },
      { id: 'b', texte: "ne sont pas mis en évidence, le principe étant celui de l'impôt exigible ; ils sont comptabilisés en consolidation" },
      { id: 'c', texte: "sont limités aux impôts différés actifs" },
      { id: 'd', texte: "sont inscrits au compte 131" },
    ],
    reponseCorrecte: 'b',
    explication: "Titre VII, compte 195 : « le principe de base étant la méthode de l'impôt exigible, les impôts différés ne sont pas mis en évidence dans les comptes », une provision pour impôts pouvant être dotée en cas d'imposition fractionnée significative. Les impôts différés sont comptabilisés dans les comptes consolidés (Titre VI ; D4C).",
    articleRef: "SYSCOHADA, Titre VII, compte 195 ; Titre VI",
  },
  {
    id: 'ue13c6-q12',
    question: "Qu'est-ce que la monnaie fonctionnelle selon IAS 21 ?",
    options: [
      { id: 'a', texte: "La monnaie ayant cours légal dans le pays du siège" },
      { id: 'b', texte: "La monnaie de l'environnement économique principal dans lequel l'entité exerce ses activités" },
      { id: 'c', texte: "La monnaie choisie par l'actionnaire principal" },
      { id: 'd', texte: "La monnaie de publication des états financiers" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 21.8 : la monnaie fonctionnelle est « la monnaie de l'environnement économique principal dans lequel l'entité exerce ses activités ». Elle se détermine d'après les § 9 à 12 (monnaie des prix de vente et des coûts, puis indicateurs complémentaires). La monnaie de publication est la monnaie de présentation, choisie librement (§ 38).",
    articleRef: "IAS 21.8-12 et 38",
  },
  {
    id: 'ue13c6-q13',
    question: "Quels indicateurs IAS 21 place-t-elle au premier rang pour déterminer la monnaie fonctionnelle ?",
    options: [
      { id: 'a', texte: "La monnaie de financement et celle de conservation de la trésorerie" },
      { id: 'b', texte: "La monnaie qui influence le plus les prix de vente et celle qui influence le plus les coûts" },
      { id: 'c', texte: "La monnaie de la société mère" },
      { id: 'd', texte: "La monnaie de tenue des comptes légaux" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 21.9 retient d'abord la monnaie qui influence le plus les prix de vente et la monnaie qui influence le plus les coûts de main-d'œuvre, de matériaux et autres ; le § 10 (financement, conservation des encaissements) et le § 11 (établissements à l'étranger) fournissent des indications complémentaires. La direction donne la priorité aux indicateurs du § 9 (§ 12).",
    articleRef: "IAS 21.9-12",
  },
  {
    id: 'ue13c6-q14',
    question: "Lequel de ces éléments est un élément monétaire au sens d'IAS 21 ?",
    options: [
      { id: 'a', texte: "Une avance versée à un fournisseur pour des marchandises" },
      { id: 'b', texte: "Un stock de pièces détachées" },
      { id: 'c', texte: "Une provision pour indemnités de départ à la retraite réglées en numéraire" },
      { id: 'd', texte: "Un goodwill" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 21.16 cite comme éléments monétaires les retraites et autres avantages du personnel réglés en numéraire et les provisions qui se dénouent en numéraire. Les montants payés d'avance pour des biens et services, les stocks et le goodwill sont des éléments non monétaires.",
    articleRef: "IAS 21.8 et 16",
  },
  {
    id: 'ue13c6-q15',
    question: "À la clôture, une dette fournisseur en USD et un stock acheté en USD au coût historique sont convertis respectivement :",
    options: [
      { id: 'a', texte: "au cours de clôture et au cours de clôture" },
      { id: 'b', texte: "au cours de clôture et au cours de la date de la transaction" },
      { id: 'c', texte: "au cours historique et au cours de clôture" },
      { id: 'd', texte: "au cours moyen et au cours historique" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 21.23 : les éléments monétaires sont convertis au cours de clôture ; les éléments non monétaires évalués au coût historique, au cours de la date de la transaction ; ceux évalués à la juste valeur, au cours de la date d'évaluation de cette juste valeur.",
    articleRef: "IAS 21.23",
  },
  {
    id: 'ue13c6-q16',
    question: "KASA SARL (monnaie fonctionnelle CDF) doit 14 000 USD comptabilisés à 2 500 CDF/USD. Le cours de clôture est de 2 700. Quel écart comptabilise-t-elle en N selon IAS 21 ?",
    options: [
      { id: 'a', texte: "Aucun, l'écart est latent" },
      { id: 'b', texte: "Une perte de change de 2 800 000 CDF en résultat net" },
      { id: 'c', texte: "Une perte de 2 800 000 CDF en autres éléments du résultat global" },
      { id: 'd', texte: "Un gain de 2 800 000 CDF" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 21.23(a) et 28 : la dette monétaire est convertie au cours de clôture (14 000 × 2 700 = 37 800 000) et l'écart avec sa valeur antérieure (35 000 000), soit 2 800 000, est une perte comptabilisée en résultat net de la période. IAS 21 ne distingue pas écarts réalisés et latents.",
    articleRef: "IAS 21.23 et 28",
  },
  {
    id: 'ue13c6-q17',
    question: "Selon le SYSCOHADA révisé, un gain de change latent sur une dette en devises à la clôture :",
    options: [
      { id: 'a', texte: "est comptabilisé en produit financier" },
      { id: 'b', texte: "est inscrit au compte 479 Écarts de conversion-Passif et n'intervient pas dans le résultat" },
      { id: 'c', texte: "est porté en capitaux propres" },
      { id: 'd', texte: "n'est pas enregistré" },
    ],
    reponseCorrecte: 'b',
    explication: "Titre VIII, ch. 22, § 2.2 et 2.2.3 (article 54 de l'AUDCIF) : les gains latents sont inscrits au compte 479 et n'interviennent pas dans la formation du résultat ; les pertes probables sont inscrites au compte 478 et provisionnées. IAS 21.28 comptabilise au contraire gains et pertes en résultat net.",
    articleRef: "SYSCOHADA, Titre VIII, ch. 22, § 2.2 ; IAS 21.28",
  },
  {
    id: 'ue13c6-q18',
    question: "Lors de la conversion d'états financiers dans une monnaie de présentation (économie non hyperinflationniste), les actifs et passifs sont convertis :",
    options: [
      { id: 'a', texte: "au cours historique" },
      { id: 'b', texte: "au cours de clôture" },
      { id: 'c', texte: "au cours moyen" },
      { id: 'd', texte: "au cours de la date de constitution" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 21.39(a) : les actifs et passifs sont convertis au cours de clôture ; les produits et charges aux cours des dates des transactions (§ 39(b)), un cours moyen étant admis si les cours ne fluctuent pas fortement (§ 40) ; les écarts qui en résultent sont comptabilisés dans les autres éléments du résultat global (§ 39(c)).",
    articleRef: "IAS 21.39-40",
  },
  {
    id: 'ue13c6-q19',
    question: "Pourquoi les écarts de conversion d'un établissement à l'étranger ne sont-ils pas comptabilisés en résultat net ?",
    options: [
      { id: 'a', texte: "Parce qu'ils sont toujours non significatifs" },
      { id: 'b', texte: "Parce que les variations de change n'ont que peu ou pas d'effet direct sur les flux de trésorerie actuels et futurs liés à l'activité" },
      { id: 'c', texte: "Parce qu'ils sont fiscalement non déductibles" },
      { id: 'd', texte: "Parce qu'ils sont compensés par des couvertures" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 21.41 : ces écarts « ne sont pas comptabilisés en résultat net parce que les variations des cours de change n'ont que peu ou pas d'effet direct sur les flux de trésorerie actuels et futurs liés à l'activité ». Ils sont cumulés dans une composante distincte des capitaux propres et reclassés en résultat lors de la sortie de l'établissement (§ 48).",
    articleRef: "IAS 21.41 et 48",
  },
  {
    id: 'ue13c6-q20',
    question: "Une entité peut-elle échapper au retraitement d'IAS 29 en retenant comme monnaie fonctionnelle celle de sa société mère ?",
    options: [
      { id: 'a', texte: "Oui, si la société mère l'impose" },
      { id: 'b', texte: "Non : la monnaie fonctionnelle se détermine selon IAS 21 et ne peut être choisie pour éviter IAS 29" },
      { id: 'c', texte: "Oui, avec l'accord du commissaire aux comptes" },
      { id: 'd', texte: "Oui, pour les filiales détenues à 100 %" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 21.14 : une entité ne peut éviter un retraitement selon IAS 29 « en adoptant comme monnaie fonctionnelle une monnaie autre que la monnaie fonctionnelle déterminée selon la présente norme (telle que la monnaie fonctionnelle de sa société mère) ». La monnaie fonctionnelle est un constat, non un choix, et ne change qu'avec les conditions sous-jacentes (§ 13).",
    articleRef: "IAS 21.13-14",
  },
  {
    id: 'ue13c6-q21',
    question: "Lesquels de ces avantages sont des avantages à court terme au sens d'IAS 19 ?",
    options: [
      { id: 'a', texte: "Les indemnités de départ à la retraite" },
      { id: 'b', texte: "Les salaires, cotisations sociales et congés payés dont le règlement intégral est attendu dans les douze mois suivant la clôture" },
      { id: 'c', texte: "Les primes d'ancienneté versées après vingt ans de service" },
      { id: 'd', texte: "Les indemnités de licenciement" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 19.5(a) et 9 : salaires, cotisations de sécurité sociale, congés payés, intéressement et avantages non pécuniaires, si leur règlement intégral est attendu dans les douze mois. Ils sont comptabilisés pour leur montant non actualisé (§ 11). Les indemnités de retraite sont des avantages postérieurs à l'emploi, les primes d'ancienneté d'autres avantages à long terme, les indemnités de licenciement des indemnités de cessation d'emploi.",
    articleRef: "IAS 19.5, 9 et 11",
  },
  {
    id: 'ue13c6-q22',
    question: "Quand l'entité comptabilise-t-elle le coût des absences rémunérées cumulables ?",
    options: [
      { id: 'a', texte: "Lorsque les absences se produisent" },
      { id: 'b', texte: "Lorsque les membres du personnel rendent les services qui leur donnent droit à de nouvelles absences" },
      { id: 'c', texte: "Lors du départ du salarié" },
      { id: 'd', texte: "Jamais, s'agissant de droits non acquis" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 19.13(a) : pour les droits cumulables, le coût est comptabilisé à mesure que le personnel rend les services qui génèrent les droits ; l'obligation existe même si les droits ne sont pas acquis (§ 15). Pour les droits non cumulables, il l'est lorsque les absences se produisent (§ 13(b), 18).",
    articleRef: "IAS 19.13-18",
  },
  {
    id: 'ue13c6-q23',
    question: "Comment une entreprise congolaise comptabilise-t-elle ses cotisations patronales à la branche des pensions de la CNSS ?",
    options: [
      { id: 'a', texte: "Comme un régime à prestations définies, avec évaluation actuarielle" },
      { id: 'b', texte: "Comme un régime à cotisations définies : charge des cotisations dues pour la période, passif pour les cotisations impayées" },
      { id: 'c', texte: "En capitaux propres" },
      { id: 'd', texte: "Uniquement en annexe" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 19.43-45 : un régime général et obligatoire est traité comme un régime multi-employeurs ; lorsque la seule obligation de l'entité est d'acquitter les cotisations exigibles, sans obligation de payer les prestations futures, c'est un régime à cotisations définies. L'entité comptabilise alors la charge et le passif des cotisations dues (§ 51).",
    articleRef: "IAS 19.43-45 et 51",
  },
  {
    id: 'ue13c6-q24',
    question: "Dans un régime à prestations définies, qui supporte en substance le risque actuariel et le risque de placement ?",
    options: [
      { id: 'a', texte: "Le membre du personnel" },
      { id: 'b', texte: "L'entité" },
      { id: 'c', texte: "La caisse de sécurité sociale" },
      { id: 'd', texte: "L'assureur, dans tous les cas" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 19.30(b) : dans un régime à prestations définies, l'entité supporte en substance le risque actuariel et le risque de placement. Dans un régime à cotisations définies, ces risques pèsent sur le membre du personnel (§ 28).",
    articleRef: "IAS 19.28-30",
  },
  {
    id: 'ue13c6-q25',
    question: "Quelle méthode IAS 19 impose-t-elle pour évaluer l'obligation au titre d'un régime à prestations définies ?",
    options: [
      { id: 'a', texte: "La méthode des droits acquis à la date de clôture, sans projection de salaires" },
      { id: 'b', texte: "La méthode des unités de crédit projetées" },
      { id: 'c', texte: "La valeur actualisée de la totalité de la prestation de fin de carrière" },
      { id: 'd', texte: "Le montant des cotisations versées" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 19.67 impose la méthode des unités de crédit projetées : chaque période de service donne lieu à une unité de droits additionnelle, évaluée séparément (§ 68). La prestation projetée est rattachée aux périodes de service (§ 70) ; actualiser la totalité de la prestation de fin de carrière sans rattachement surévalue l'obligation.",
    articleRef: "IAS 19.67-70",
  },
  {
    id: 'ue13c6-q26',
    question: "Par référence à quel taux l'obligation au titre des avantages postérieurs à l'emploi est-elle actualisée ?",
    options: [
      { id: 'a', texte: "Le coût moyen du capital de l'entité" },
      { id: 'b', texte: "Le rendement du marché des obligations d'entreprise de haute qualité ou, à défaut de marché large, des obligations d'État, dans la monnaie et pour la durée de l'obligation" },
      { id: 'c', texte: "Le taux d'inflation" },
      { id: 'd', texte: "Le taux d'emprunt marginal de l'entité" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 19.83 : référence aux taux de rendement des obligations d'entreprise de haute qualité ou, à défaut d'un marché large dans la monnaie considérée, des obligations d'État, en concordance de monnaie et de durée. Le taux ne reflète ni le risque actuariel, ni le risque de placement, ni le risque de crédit propre à l'entité (§ 84).",
    articleRef: "IAS 19.83-84",
  },
  {
    id: 'ue13c6-q27',
    question: "Où sont comptabilisés les écarts actuariels d'un régime postérieur à l'emploi à prestations définies selon IAS 19 ?",
    options: [
      { id: 'a', texte: "En résultat net" },
      { id: 'b', texte: "Dans les autres éléments du résultat global, sans reclassement ultérieur en résultat" },
      { id: 'c', texte: "En autres éléments du résultat global, puis reclassés en résultat sur la durée de service" },
      { id: 'd', texte: "En ajustement du goodwill" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 19.120(c) et 122 : les réévaluations, dont les écarts actuariels, sont comptabilisées dans les autres éléments du résultat global et ne sont pas reclassées en résultat net ; elles peuvent être virées à une autre composante des capitaux propres. Le coût des services et les intérêts nets vont en résultat net (§ 120(a)-(b)). Le SYSCOHADA révisé les comptabilise, lui, en résultat.",
    articleRef: "IAS 19.120 et 122 ; SYSCOHADA, ch. 21, § 3.4.2",
  },
  {
    id: 'ue13c6-q28',
    question: "Comment sont comptabilisés les écarts actuariels relatifs aux autres avantages à long terme, tels qu'une prime d'ancienneté ?",
    options: [
      { id: 'a', texte: "Dans les autres éléments du résultat global" },
      { id: 'b', texte: "En résultat net, avec le coût des services et les intérêts nets" },
      { id: 'c', texte: "En capitaux propres" },
      { id: 'd', texte: "Ils ne sont pas comptabilisés" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 19.154 et 156 : pour les autres avantages à long terme, la méthode est simplifiée, les réévaluations n'étant pas comptabilisées dans les autres éléments du résultat global ; le total net du coût des services, des intérêts nets et des réévaluations est comptabilisé en résultat net.",
    articleRef: "IAS 19.153-156",
  },
  {
    id: 'ue13c6-q29',
    question: "Une indemnité prévue par la convention collective et versée à tout salarié qui part à la retraite, quelle que soit la cause de la fin du contrat, est :",
    options: [
      { id: 'a', texte: "une indemnité de cessation d'emploi" },
      { id: 'b', texte: "un avantage postérieur à l'emploi" },
      { id: 'c', texte: "un avantage à court terme" },
      { id: 'd', texte: "hors du champ d'IAS 19" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 19.160 : les prestations découlant de dispositions relatives à la retraite obligatoire ou d'un départ à la demande du salarié sont des avantages postérieurs à l'emploi. Le § 164 précise que des prestations dont le paiement est certain mais la date incertaine sont des avantages postérieurs à l'emploi, même si elles sont appelées indemnités de licenciement.",
    articleRef: "IAS 19.159-164",
  },
  {
    id: 'ue13c6-q30',
    question: "À quelle date une entité comptabilise-t-elle des indemnités de cessation d'emploi offertes dans le cadre d'un plan de départs volontaires ?",
    options: [
      { id: 'a', texte: "À la date de paiement" },
      { id: 'b', texte: "À la première des deux dates : celle où elle ne peut plus retirer son offre, ou celle où elle comptabilise les coûts d'une restructuration prévoyant ces indemnités" },
      { id: 'c', texte: "À la clôture de l'exercice de l'annonce, sans autre condition" },
      { id: 'd', texte: "À l'acceptation par le dernier salarié" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 19.165 : passif et charge au titre des indemnités de cessation d'emploi à la première des dates suivantes : (a) la date où l'entité ne peut plus retirer son offre ; (b) la date où elle comptabilise les coûts d'une restructuration entrant dans le champ d'IAS 37 et prévoyant le paiement de telles indemnités.",
    articleRef: "IAS 19.165",
  },
  {
    id: 'ue13c6-q31',
    question: "Quelle différence le SYSCOHADA révisé admet-il par rapport à IAS 19 pour l'évaluation des indemnités de fin de carrière d'une entité ne faisant pas appel public à l'épargne ?",
    options: [
      { id: 'a', texte: "Aucune" },
      { id: 'b', texte: "Elle peut opter pour une méthode simplifiée faisant abstraction de certaines hypothèses démographiques ou financières" },
      { id: 'c', texte: "Elle n'est pas tenue de provisionner" },
      { id: 'd', texte: "Elle doit utiliser les cotisations versées" },
    ],
    reponseCorrecte: 'b',
    explication: "Titre VIII, ch. 21, § 1.2 : les entités faisant appel public à l'épargne doivent appliquer la méthode actuarielle ; les autres peuvent opter pour des méthodes simplifiées, qui ignorent la probabilité de départ ou de décès avant la retraite ou la croissance des rémunérations (à condition d'en tenir compte dans le taux d'actualisation). Le texte recommande la méthode actuarielle aux entités d'un groupe publiant en IFRS.",
    articleRef: "SYSCOHADA, Titre VIII, ch. 21, § 1.2",
  },
  {
    id: 'ue13c6-q32',
    question: "Selon l'AUDCIF, dans quelle monnaie la comptabilité légale d'une entité établie en RDC doit-elle être tenue ?",
    options: [
      { id: 'a', texte: "Dans sa monnaie fonctionnelle IFRS" },
      { id: 'b', texte: "Dans l'unité monétaire ayant cours légal dans l'État partie" },
      { id: 'c', texte: "En dollars américains" },
      { id: 'd', texte: "Au choix de l'entité" },
    ],
    reponseCorrecte: 'b',
    explication: "AUDCIF, art. 17 : l'organisation comptable doit respecter « la tenue de la comptabilité dans la langue officielle et dans l'unité monétaire ayant cours légal dans l'État partie ». Une entité congolaise dont la monnaie fonctionnelle IFRS est le dollar tient donc sa comptabilité légale en francs congolais et établit ses états IFRS par conversion.",
    articleRef: "AUDCIF, art. 17 ; IAS 21.34",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '6.1',
    titre: "IAS 12 : objectif, définitions et notion de base fiscale",
    navLabel: 'IAS 12 : définitions',
    blocs: [
      {
        type: 'paragraphe',
        texte: "IAS 12, IAS 21 et IAS 19 traitent de trois sources de décalage entre la réalité économique d'une période et ses flux de trésorerie : la fiscalité, dont le règlement suit des règles propres ; les variations de change, qui modifient la valeur des créances, des dettes et des états financiers exprimés dans une autre monnaie ; les engagements envers le personnel, dont le coût naît des services rendus et se règle parfois des décennies plus tard. Les trois normes partagent une même exigence : comptabiliser dès la période concernée les conséquences économiques de décisions et de droits dont l'incidence financière se manifestera ultérieurement.",
      },
      { type: 'intertitre', texte: "6.1.1 Objectif et champ d'application" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 12, Objectif",
        texte: "« La question principale en matière de comptabilisation des impôts sur le résultat est de déterminer comment comptabiliser les conséquences fiscales actuelles et futures : (a) du recouvrement (ou du règlement) futur de la valeur comptable des actifs (ou des passifs) qui sont comptabilisés dans l'état de la situation financière d'une entité ; et (b) des transactions et autres événements de la période qui sont comptabilisés dans les états financiers d'une entité. » La norme impose à l'entité « de comptabiliser les conséquences fiscales des transactions et autres événements de la même façon qu'elle comptabilise les transactions et autres événements eux-mêmes ».",
      },
      {
        type: 'paragraphe',
        texte: "Les impôts sur le résultat incluent tous les impôts nationaux et étrangers dus sur la base des bénéfices imposables, ainsi que les retenues à la source payables par une filiale, une entreprise associée ou un partenariat sur ses distributions à l'entité (§ 2). La norme ne traite pas de la comptabilisation des subventions publiques ni des crédits d'impôt à l'investissement, mais indique comment traiter les différences temporaires qui en résultent (§ 4). L'impôt n'est donc pas envisagé comme la seule somme à verser à l'administration pour l'exercice : il constitue une charge attachée à la formation du résultat comptable, que celle-ci soit imposée pendant la période ou au cours de périodes ultérieures.",
      },
      { type: 'intertitre', texte: "6.1.2 Les définitions fondamentales" },
      {
        type: 'carte',
        titre: "Tableau 6.1 — Définitions d'IAS 12 (§ 5)",
        tableau: {
          entetes: ['Terme', 'Définition'],
          lignes: [
            ['Bénéfice comptable', "Résultat net d'une période avant déduction de la charge d'impôt"],
            ['Bénéfice imposable (perte fiscale)', "Bénéfice (perte) d'une période déterminé selon les règles établies par les administrations fiscales"],
            ["Charge (produit) d'impôt", "Montant total de l'impôt exigible et de l'impôt différé inclus dans la détermination du résultat net"],
            ['Impôt exigible', "Impôts sur le résultat payables (recouvrables) au titre du bénéfice imposable (perte fiscale) d'une période"],
            ["Passifs d'impôt différé", "Impôts sur le résultat payables au cours de périodes futures au titre de différences temporaires imposables"],
            ["Actifs d'impôt différé", "Impôts sur le résultat recouvrables au cours de périodes futures au titre de différences temporaires déductibles, de pertes fiscales et de crédits d'impôt non utilisés reportés en avant"],
            ['Différences temporaires', "Différences entre la valeur comptable d'un actif ou d'un passif et sa base fiscale ; imposables ou déductibles"],
            ['Base fiscale', "Montant attribué à un actif ou à un passif à des fins fiscales"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "L'approche retenue est bilantielle. L'impôt différé ne se déduit pas de l'écart entre résultat comptable et résultat fiscal d'une période, mais de la comparaison, à la clôture, de la valeur comptable de chaque actif et de chaque passif avec sa base fiscale. Les écarts entre résultats d'une période, que la norme appelle différences temporelles, ne sont qu'une des sources de différences temporaires (§ 17) ; la réévaluation d'un actif, un regroupement d'entreprises ou une base fiscale initiale différente de la valeur comptable en sont d'autres (§ 18). Les différences dites permanentes, telles qu'une charge définitivement non déductible, ne produisent aucune différence temporaire.",
      },
      { type: 'intertitre', texte: "6.1.3 La détermination de la base fiscale" },
      {
        type: 'paragraphe',
        texte: "La base fiscale d'un actif est le montant qui sera fiscalement déductible des avantages économiques imposables que l'entité obtiendra en recouvrant la valeur comptable de cet actif ; si ces avantages ne sont pas imposables, elle est égale à la valeur comptable (§ 7). La base fiscale d'un passif est sa valeur comptable diminuée de tout montant fiscalement déductible au titre de ce passif au cours des périodes futures ; pour des produits perçus d'avance, elle est la valeur comptable diminuée des produits qui ne seront pas imposables à l'avenir (§ 8). Lorsque la base fiscale est difficile à déterminer, l'entité revient au principe fondamental : un passif (actif) d'impôt différé est comptabilisé chaque fois que le recouvrement ou le règlement d'une valeur comptable augmente (diminue) les paiements futurs d'impôt (§ 10).",
      },
      {
        type: 'carte',
        titre: "Tableau 6.2 — Détermination de la base fiscale : exemples de la norme (§ 7 et 8)",
        tableau: {
          entetes: ['Élément', 'Valeur comptable', 'Base fiscale', 'Différence temporaire'],
          lignes: [
            ["Machine de coût 100, amortissement fiscal déjà déduit 30", '—', '**70**', 'Selon la valeur comptable'],
            ["Intérêts à recevoir, imposables à l'encaissement", '100', '**0**', 'Imposable : 100'],
            ["Créances clients dont le produit a déjà été imposé", '100', '**100**', 'Aucune'],
            ["Charges à payer déductibles lors de leur règlement", '100', '**0**', 'Déductible : 100'],
            ['Amendes et pénalités non déductibles', '100', '**100**', 'Aucune'],
            ['Emprunt dont le remboursement est sans conséquence fiscale', '100', '**100**', 'Aucune'],
          ],
        },
      },
    ],
  },
  {
    numero: '6.2',
    titre: "IAS 12 : comptabilisation des passifs et actifs d'impôt différé",
    navLabel: 'IAS 12 : comptabilisation',
    blocs: [
      { type: 'intertitre', texte: "6.2.1 L'impôt exigible" },
      {
        type: 'paragraphe',
        texte: "L'impôt exigible de la période et des périodes précédentes est comptabilisé en passif dans la mesure où il n'est pas payé ; un excédent de versement est un actif (§ 12). L'avantage lié à une perte fiscale reportable en arrière est un actif de la période au cours de laquelle la perte se produit (§ 13-14).",
      },
      {
        type: 'filet',
        titre: "Observation — L'impôt sur les sociétés en RDC depuis 2026",
        texte: "La loi n° 23/053 du 30 novembre 2023 a institué l'impôt sur les sociétés, applicable depuis le 1er janvier 2026 ; l'impôt sur les bénéfices et profits (IBP), auquel se réfère encore le support d'origine du module, est abrogé depuis cette date. Le taux de l'impôt sur les sociétés est de 30 % du bénéfice net imposable (art. 56) ; un impôt minimum de 1 % du chiffre d'affaires déclaré s'applique lorsque le résultat est déficitaire ou lorsque l'impôt calculé lui serait inférieur (art. 57). Les exemples du chapitre retiennent le taux de 30 %. La qualification de l'impôt minimum au regard d'IAS 12, qui vise les impôts « dus sur la base des bénéfices imposables » (§ 2), relève du jugement de l'entité et doit être documentée.",
      },
      { type: 'intertitre', texte: "6.2.2 Les différences temporaires imposables" },
      {
        type: 'paragraphe',
        texte: "Un passif d'impôt différé est comptabilisé pour toutes les différences temporaires imposables (§ 15). Lorsque la valeur comptable d'un actif excède sa base fiscale, le recouvrement de cette valeur générera des avantages imposables supérieurs aux déductions admises : l'impôt futur qui en résulte est un passif dès la clôture (§ 16). Trois exceptions sont prévues : la comptabilisation initiale d'un goodwill, qui est un montant résiduel que le passif d'impôt augmenterait (§ 15(a) et 21) ; la comptabilisation initiale d'un actif ou d'un passif dans une transaction qui n'est pas un regroupement d'entreprises, n'affecte ni le bénéfice comptable ni le bénéfice imposable et ne fait pas naître des différences imposable et déductible d'un même montant (§ 15(b) et 22) ; certaines participations dans des filiales, entreprises associées et partenariats (§ 39).",
      },
      {
        type: 'carte',
        titre: "Exemple 6.1 — Subvention à recevoir imposable l'exercice suivant",
        texte: "Illustration du support d'origine. Le résultat comptable de N s'élève à 4 000 000. Il comprend une subvention de 600 000, comptabilisée en N mais imposable en N+1. Taux d'impôt : 30 %.",
        tableau: {
          entetes: ['Élément', 'Calcul', 'Montant'],
          lignes: [
            ['Bénéfice imposable de N', '4 000 000 − 600 000', '3 400 000'],
            ['Impôt exigible de N', '3 400 000 × 30 %', '**1 020 000**'],
            ['Différence temporaire imposable', 'Créance de 600 000, base fiscale nulle', '600 000'],
            ["Passif d'impôt différé", '600 000 × 30 %', '**180 000**'],
            ["Charge d'impôt totale de N", '1 020 000 + 180 000', '**1 200 000**, soit 30 % de 4 000 000'],
          ],
        },
        note: "Écritures de N : débit Charge d'impôt exigible 1 020 000, crédit État, impôt sur les sociétés 1 020 000 ; débit Charge d'impôt différé 180 000, crédit Passif d'impôt différé 180 000. En N+1, lorsque la subvention est imposée, le passif est repris : débit Passif d'impôt différé 180 000, crédit Produit d'impôt différé 180 000, ce qui neutralise l'impôt exigible supplémentaire. Le support intitule « impôt courant » le compte de charge utilisé pour l'impôt différé ; les deux composantes doivent au contraire être distinguées, car IAS 12 impose de les présenter séparément (§ 80).",
      },
      {
        type: 'carte',
        titre: "Exemple 6.2 — Amortissement fiscal accéléré d'un équipement",
        texte: "Un équipement de 1 000 000 est amorti linéairement sur 5 ans en comptabilité. Dans un régime fiscal supposé pour les besoins de l'exemple, il est déductible linéairement sur 3 ans. Taux d'impôt : 30 %.",
        tableau: {
          entetes: ['Fin de l\'année', 'Valeur comptable', 'Base fiscale', 'Différence imposable', "Passif d'impôt différé", 'Variation (charge + / produit −)'],
          lignes: [
            ['1', '800 000', '666 667', '133 333', '40 000', '+40 000'],
            ['2', '600 000', '333 333', '266 667', '80 000', '+40 000'],
            ['3', '400 000', '0', '400 000', '120 000', '+40 000'],
            ['4', '200 000', '0', '200 000', '60 000', '−60 000'],
            ['5', '0', '0', '0', '0', '−60 000'],
          ],
        },
        note: "L'avantage de trésorerie procuré par l'amortissement fiscal accéléré n'est pas un gain : il sera restitué lorsque la différence se résorbera. Le passif d'impôt différé exprime cet impôt dû à terme, et la charge d'impôt totale de chaque exercice reste égale à 30 % du résultat comptable avant impôt.",
      },
      { type: 'intertitre', texte: "6.2.3 Les différences temporaires déductibles et les pertes fiscales" },
      {
        type: 'paragraphe',
        texte: "Un actif d'impôt différé est comptabilisé pour toutes les différences temporaires déductibles, « dans la mesure où il est probable que l'on dégagera un bénéfice imposable auquel imputer ces différences temporaires déductibles » (§ 24), sous réserve de l'exception de comptabilisation initiale. Cette probabilité est établie lorsque des différences temporaires imposables suffisantes, relevant de la même administration fiscale et de la même entité, se résorberont sur les mêmes périodes (§ 28) ; à défaut, lorsque des bénéfices imposables futurs suffisants sont probables ou que des opportunités de planification fiscale existent (§ 29-30). Les pertes fiscales et crédits d'impôt reportables obéissent aux mêmes critères (§ 34), mais « l'existence de pertes fiscales non utilisées constitue une indication forte que des bénéfices imposables futurs risquent de ne pas être disponibles » : une entité ayant un historique de pertes récentes doit disposer de différences imposables suffisantes ou d'autres indications convaincantes (§ 35-36). La valeur comptable des actifs d'impôt différé est revue à chaque clôture (§ 56).",
      },
      {
        type: 'carte',
        titre: "Exemple 6.3 — Provision pour litige social (MBOKA INDUSTRIES SA)",
        texte: "Illustration du support d'origine, rectifiée. Résultat comptable avant impôt de N : 1 500 000 CDF. Il comprend une provision pour litige social de 80 000 CDF, non déductible tant qu'elle n'est pas payée et déductible l'année du paiement. Aucun impôt différé à l'ouverture. Taux : 30 %.",
        tableau: {
          entetes: ['Élément', 'Calcul', 'Montant (CDF)'],
          lignes: [
            ['Bénéfice imposable de N', '1 500 000 + 80 000', '1 580 000'],
            ['Impôt exigible de N', '1 580 000 × 30 %', '**474 000**'],
            ['Base fiscale de la provision', '80 000 − 80 000 déductibles dans le futur (§ 8)', '0'],
            ['Différence temporaire **déductible**', '80 000 − 0', '80 000'],
            ["Actif d'impôt différé, si des bénéfices imposables futurs sont probables", '80 000 × 30 %', '**24 000**'],
            ["Charge d'impôt totale de N", '474 000 − 24 000', '**450 000**, soit 30 % de 1 500 000'],
          ],
        },
        note: "Le support qualifie la différence de « temporaire taxable » puis conclut, à juste titre, à un actif d'impôt différé : une provision non encore déductible fait naître une différence temporaire déductible (§ 5 et exemple du § 25), et l'actif n'est comptabilisé que si des bénéfices imposables futurs sont probables (§ 24). En N+1, lors du paiement, c'est l'actif d'impôt différé, et non un passif, qui est repris : débit Charge d'impôt différé 24 000, crédit Actif d'impôt différé 24 000.",
      },
      {
        type: 'paragraphe',
        texte: "L'exception de comptabilisation initiale trouve une application directe aux subventions publiques. Lorsqu'une subvention non imposable liée à un actif est déduite de la valeur comptable de celui-ci sans l'être de sa base fiscale, ou présentée en produits différés dont la base fiscale est nulle, la différence temporaire déductible qui en résulte ne donne pas lieu à comptabilisation d'un actif d'impôt différé (§ 33). À l'inverse, les transactions qui font naître simultanément des différences imposable et déductible d'un même montant, comme la comptabilisation initiale d'un contrat de location chez le preneur, ne bénéficient pas de l'exemption (§ 22A).",
      },
    ],
  },
  {
    numero: '6.3',
    titre: "IAS 12 : évaluation, présentation et preuve d'impôt",
    navLabel: 'IAS 12 : évaluation',
    blocs: [
      { type: 'intertitre', texte: "6.3.1 Les règles d'évaluation" },
      {
        type: 'carte',
        titre: "Tableau 6.3 — Règles d'évaluation des impôts différés",
        tableau: {
          entetes: ['Règle', 'Contenu', 'Référence'],
          lignes: [
            ['Taux applicable', "Taux attendu sur la période de réalisation ou de règlement, d'après les lois adoptées ou quasi adoptées à la clôture", '§ 47-48'],
            ['Barème progressif', "Taux moyen attendu sur les périodes de résorption", '§ 49'],
            ['Mode de recouvrement', "Taux et base fiscale cohérents avec le recouvrement attendu (utilisation ou vente)", '§ 51-51A'],
            ['Actif non amortissable réévalué', 'Conséquences fiscales d\'un recouvrement par voie de vente', '§ 51B'],
            ['Immeuble de placement à la juste valeur', 'Présomption réfutable de recouvrement par voie de vente', '§ 51C'],
            ['Actualisation', "Interdite : « Les actifs et passifs d'impôt différé ne doivent pas être actualisés. »", '§ 53'],
            ["Revue des actifs d'impôt différé", "À chaque clôture ; réduction si le bénéfice imposable n'est plus probable, reprise s'il le redevient", '§ 56'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "L'interdiction de l'actualisation se justifie par la difficulté d'établir avec précision le calendrier de résorption de chaque différence et par le souci de comparabilité : autoriser sans imposer aurait produit des montants hétérogènes (§ 54). Le mode de recouvrement attendu peut en revanche modifier le montant de l'impôt différé : dans l'exemple A du § 51A, un actif de valeur comptable 100 et de base fiscale 60 donne lieu à un passif de 8 s'il doit être vendu (taux de 20 %) et de 12 s'il doit être utilisé (taux de 30 %).",
      },
      { type: 'intertitre', texte: "6.3.2 Le rattachement de l'impôt : résultat net ou hors résultat net" },
      {
        type: 'paragraphe',
        texte: "L'impôt exigible et l'impôt différé sont comptabilisés en résultat net, sauf lorsqu'ils résultent d'une transaction ou d'un événement comptabilisé hors résultat net ou d'un regroupement d'entreprises (§ 58). La plupart des impôts différés naissent de produits ou de charges pris en compte dans le bénéfice comptable et dans le bénéfice imposable de périodes différentes : ils sont comptabilisés en résultat net (§ 59). L'impôt afférent à des éléments comptabilisés dans les autres éléments du résultat global ou directement en capitaux propres suit ces éléments (§ 61A). Une variation d'impôt différé due à un changement de taux ou à une nouvelle appréciation de la recouvrabilité est comptabilisée en résultat net, sauf si elle se rapporte à des éléments antérieurement comptabilisés hors résultat net (§ 60).",
      },
      {
        type: 'carte',
        titre: "Exemple 6.4 — Réévaluation d'un terrain",
        texte: "Un terrain acquis 500 000 est réévalué à 800 000 selon IAS 16. La base fiscale demeure de 500 000 et la plus-value ne serait imposée qu'en cas de cession, au taux de 30 %.",
        tableau: {
          entetes: ['Élément', 'Montant', 'Comptabilisation'],
          lignes: [
            ['Écart de réévaluation brut', '300 000', 'Autres éléments du résultat global (IAS 16)'],
            ["Passif d'impôt différé (300 000 × 30 %, recouvrement par voie de vente, § 51B)", '90 000', 'Autres éléments du résultat global (§ 61A)'],
            ['Écart de réévaluation net en capitaux propres', '**210 000**', ''],
          ],
        },
      },
      { type: 'intertitre', texte: "6.3.3 Présentation et informations à fournir" },
      {
        type: 'paragraphe',
        texte: "Les actifs et passifs d'impôt exigible ne sont compensés que si l'entité a un droit juridiquement exécutoire de compenser et l'intention de régler le net ou de réaliser l'actif et régler le passif simultanément (§ 71) ; les actifs et passifs d'impôt différé, que s'ils relèvent en outre de la même administration fiscale et de la même entité imposable, ou d'entités qui entendent régler sur une base nette (§ 74). Les composantes de la charge d'impôt sont détaillées (§ 80), et l'entité explique la relation entre la charge d'impôt et le bénéfice comptable par un rapprochement chiffré, communément appelé preuve d'impôt (§ 81(c)).",
      },
      {
        type: 'carte',
        titre: "Exemple 6.5 — Charge d'impôt et preuve d'impôt",
        texte: "Bénéfice comptable avant impôt : 2 000 000. Il comprend une amende non déductible de 100 000, une provision pour litige de 80 000 déductible au paiement, et un amortissement comptable inférieur de 133 333 à l'amortissement fiscal (première année de l'exemple 6.2). Taux : 30 %.",
        tableau: {
          entetes: ['Élément', 'Montant'],
          lignes: [
            ['Bénéfice imposable : 2 000 000 + 100 000 + 80 000 − 133 333', '2 046 667'],
            ['Impôt exigible (× 30 %)', '614 000'],
            ["Charge d'impôt différé : passif 40 000 − actif 24 000", '16 000'],
            ["Charge d'impôt totale", '**630 000**'],
            ['Charge théorique : 2 000 000 × 30 %', '600 000'],
            ['Effet de la charge non déductible : 100 000 × 30 %', '30 000'],
            ["Charge d'impôt effective", '**630 000**, soit un taux effectif de 31,5 %'],
          ],
        },
        note: "Les différences temporaires n'apparaissent pas dans la preuve d'impôt : leur effet sur l'impôt exigible est exactement compensé par l'impôt différé. Seules les différences permanentes, les écarts de taux et les actifs d'impôt différé non comptabilisés expliquent l'écart entre charge théorique et charge effective.",
      },
      {
        type: 'filet',
        titre: "Rapprochement avec le SYSCOHADA révisé",
        texte: "Dans les comptes individuels, le SYSCOHADA révisé retient la méthode de l'impôt exigible : « les impôts différés ne sont pas mis en évidence dans les comptes », une provision pour impôts (compte 195) pouvant toutefois être dotée en cas d'imposition fractionnée portant sur des montants significatifs (Titre VII, compte 195). Les impôts différés sont comptabilisés dans les comptes consolidés et combinés (Titre VI ; Titres XII et XIII), selon une approche proche d'IAS 12 : impôt différé passif lorsque la valeur comptable d'un actif excède sa base fiscale, pas d'impôt différé sur l'écart d'acquisition, actif d'impôt différé subordonné à une probabilité de bénéfices imposables, preuve d'impôt dans les Notes annexes. Pour une entité congolaise qui établit des états IFRS, l'impôt différé constitue ainsi l'un des principaux retraitements, puisqu'il enregistre l'effet fiscal de tous les autres.",
      },
    ],
  },
  {
    numero: '6.4',
    titre: "IAS 21 : monnaie fonctionnelle et transactions en monnaie étrangère",
    navLabel: 'IAS 21 : transactions',
    blocs: [
      {
        type: 'paragraphe',
        texte: "IAS 21 prescrit la manière d'intégrer dans les états financiers les transactions en monnaie étrangère et les établissements à l'étranger, et de convertir des états financiers dans une monnaie de présentation (§ 1). Elle s'applique aux transactions et soldes en monnaie étrangère, à l'exception des dérivés et soldes relevant d'IFRS 9, à la conversion des établissements à l'étranger et à la conversion dans une monnaie de présentation (§ 3) ; la comptabilité de couverture relève d'IFRS 9 (§ 5). Les questions essentielles portent sur le cours de change à utiliser et sur la présentation des effets des variations de change (§ 2).",
      },
      { type: 'intertitre', texte: "6.4.1 La monnaie fonctionnelle" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 21, § 8 et 9",
        texte: "« La monnaie fonctionnelle est la monnaie de l'environnement économique principal dans lequel l'entité exerce ses activités. » (§ 8). Cet environnement « est normalement celui dans lequel est principalement générée et dépensée sa trésorerie » ; l'entité considère la monnaie qui influence le plus les prix de vente de ses biens et services, celle du pays dont les forces concurrentielles et la réglementation déterminent le plus ces prix, et celle qui influence le plus ses coûts (§ 9).",
      },
      {
        type: 'paragraphe',
        texte: "Les indicateurs du § 9 priment ; la monnaie de financement et celle dans laquelle les encaissements d'exploitation sont conservés fournissent des éléments complémentaires (§ 10 et 12). Pour un établissement à l'étranger, l'entité examine en outre son degré d'autonomie par rapport à l'entité présentant l'information financière (§ 11). La monnaie fonctionnelle est un constat et non un choix : elle ne change qu'en cas de modification des transactions, événements et conditions sous-jacents (§ 13), le changement étant appliqué de manière prospective (§ 35-37). Une entité ne peut pas éviter le retraitement prévu par IAS 29 pour une économie hyperinflationniste en adoptant une autre monnaie, telle que celle de sa société mère (§ 14).",
      },
      {
        type: 'filet',
        titre: "Observation — Monnaie fonctionnelle et monnaie de tenue des comptes en RDC",
        texte: "L'économie congolaise est largement dollarisée : dans de nombreux secteurs (mines, télécommunications, importation, grande distribution), les prix de vente sont fixés et réglés en dollars, et une part importante des coûts l'est également. Pour ces entités, l'application des § 9 à 12 peut conduire à retenir le dollar comme monnaie fonctionnelle. L'AUDCIF impose pourtant « la tenue de la comptabilité dans la langue officielle et dans l'unité monétaire ayant cours légal dans l'État partie » (art. 17). La comptabilité légale est donc tenue en francs congolais, et les états IFRS sont établis par conversion de tous les montants dans la monnaie fonctionnelle, avec des résultats identiques à ceux qu'aurait produits une comptabilisation initiale dans cette monnaie (IAS 21.34). À l'inverse, une entité dont les prix et les coûts sont principalement déterminés en francs congolais, comme dans l'illustration KASA SARL ci-après, a le franc congolais pour monnaie fonctionnelle.",
      },
      { type: 'intertitre', texte: "6.4.2 Comptabilisation initiale et évaluation à la clôture" },
      {
        type: 'paragraphe',
        texte: "Une transaction en monnaie étrangère est enregistrée en appliquant le cours au comptant de la date de la transaction (§ 21) ; un cours moyen hebdomadaire ou mensuel peut être utilisé, sauf en cas de fluctuations importantes (§ 22). À chaque clôture, le traitement dépend de la nature de l'élément (§ 23). La distinction décisive est celle des éléments monétaires, qui confèrent le droit de recevoir ou imposent de livrer un nombre déterminé ou déterminable d'unités monétaires, et des éléments non monétaires, qui n'emportent pas un tel droit ou une telle obligation (§ 16).",
      },
      {
        type: 'carte',
        titre: "Tableau 6.4 — Conversion à la clôture dans la monnaie fonctionnelle (IAS 21, § 16 et 23)",
        tableau: {
          entetes: ['Catégorie', 'Exemples', 'Cours de conversion'],
          lignes: [
            ['Éléments monétaires', "Trésorerie, créances et dettes, emprunts, provisions réglées en numéraire, avantages du personnel réglés en numéraire, obligations locatives", '**Cours de clôture**'],
            ['Éléments non monétaires au coût historique', "Stocks, immobilisations corporelles et incorporelles, goodwill, avances versées pour des biens et services", '**Cours de la date de la transaction**'],
            ['Éléments non monétaires à la juste valeur', 'Immeuble de placement à la juste valeur, actifs réévalués', '**Cours de la date d\'évaluation de la juste valeur**'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Les écarts de change sur le règlement ou la conversion des éléments monétaires sont comptabilisés en résultat net de la période où ils surviennent (§ 28), qu'ils soient réalisés ou latents : lorsque la transaction est réglée au cours d'une période ultérieure, chaque période enregistre l'écart correspondant à l'évolution des cours au cours de cette période (§ 29). La composante de change d'un profit ou d'une perte sur un élément non monétaire suit ce profit ou cette perte, en résultat net ou en autres éléments du résultat global (§ 30). Les écarts sur un élément monétaire faisant partie de l'investissement net dans un établissement à l'étranger vont en résultat dans les comptes individuels, mais en autres éléments du résultat global dans les états consolidés (§ 32).",
      },
      {
        type: 'carte',
        titre: "Exemple 6.6 — Achat de marchandises en dollars (KASA SARL, monnaie fonctionnelle CDF)",
        texte: "Illustration du support d'origine, dont les écritures sont établies ici. Le 10 novembre N, KASA SARL achète à crédit des marchandises pour 20 000 USD (1 USD = 2 500 CDF). Le 20 décembre N, elle règle 6 000 USD au cours de 2 650. Le 31 décembre N, le cours est de 2 700. Le 15 janvier N+1, elle règle le solde au cours de 2 350.",
        tableau: {
          entetes: ['Date', 'Opération', 'Calcul', 'Écart (CDF)'],
          lignes: [
            ['10/11/N', 'Achat : débit Achats (stocks), crédit Fournisseurs', '20 000 × 2 500 = 50 000 000', '—'],
            ['20/12/N', 'Règlement de 6 000 USD', '6 000 × 2 650 = 15 900 000 contre 6 000 × 2 500 = 15 000 000', 'Perte **900 000**'],
            ['31/12/N', 'Conversion du solde de 14 000 USD au cours de clôture', '14 000 × 2 700 = 37 800 000 contre 35 000 000', 'Perte **2 800 000**'],
            ['31/12/N', 'Stocks (non monétaires, au coût)', 'Maintenus au cours historique de 2 500', 'Aucun'],
            ['15/01/N+1', 'Règlement du solde', '14 000 × 2 350 = 32 900 000 contre 37 800 000', 'Gain **4 900 000**'],
          ],
        },
        note: "Résultat de change selon IAS 21 : perte de 3 700 000 en N, gain de 4 900 000 en N+1, soit un gain net de 1 200 000 sur l'ensemble de l'opération (paiement total de 48 800 000 pour une dette initiale de 50 000 000). Selon le SYSCOHADA révisé, la perte latente de 2 800 000 est inscrite au compte 478 et provisionnée (débit 6591, crédit 4991) : l'effet sur le résultat de N est identique. En N+1, le gain réalisé est mesuré par rapport à la valeur d'origine (35 000 000 − 32 900 000 = 2 100 000) et la provision de 2 800 000 est reprise, soit également 4 900 000. Les deux référentiels divergent en revanche lorsque l'écart latent est un gain : si le cours de clôture avait été de 2 400, IAS 21 aurait comptabilisé en N un gain de 1 400 000, que le SYSCOHADA porte au compte 479 sans l'inclure dans le résultat.",
      },
      {
        type: 'filet',
        titre: "Rapprochement avec le SYSCOHADA révisé",
        texte: "L'AUDCIF et le chapitre 22 du Titre VIII convertissent également les créances et dettes en devises au dernier cours de clôture, mais selon une logique de prudence : les pertes probables sont portées au compte 478 Écarts de conversion-Actif et entraînent une provision d'un montant équivalent, tandis que les gains latents, inscrits au compte 479 Écarts de conversion-Passif, n'interviennent pas dans la formation du résultat (art. 54). Deux exceptions atténuent cette asymétrie : l'étalement des écarts sur emprunts et prêts pluriannuels (art. 56) et la compensation, devise par devise, dans une position globale de change (art. 57). IAS 21 ne connaît aucune de ces règles : tous les écarts sur éléments monétaires affectent le résultat de la période.",
      },
    ],
  },
  {
    numero: '6.5',
    titre: "IAS 21 : conversion dans une monnaie de présentation",
    navLabel: 'IAS 21 : conversion',
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'entité peut présenter ses états financiers dans la monnaie de son choix (§ 38). Lorsque la monnaie de présentation diffère de la monnaie fonctionnelle, les résultats et la situation financière sont convertis selon une procédure qui ne modifie pas les relations entre les montants de la monnaie fonctionnelle. C'est le cas d'une filiale congolaise dont le groupe publie en dollars ou en euros, ou d'une entité qui publie en dollars à l'intention d'investisseurs étrangers.",
      },
      { type: 'intertitre', texte: "6.5.1 La méthode de conversion" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 21, § 39",
        texte: "Les résultats et la situation financière d'une entité dont la monnaie fonctionnelle n'est pas celle d'une économie hyperinflationniste sont convertis selon les procédures suivantes : « (a) les actifs et les passifs de chaque état de la situation financière présenté (y compris à titre comparatif) doivent être convertis au cours de clôture à la date de chacun de ces états de la situation financière ; (b) les produits et les charges de chaque état présentant le résultat net et les autres éléments du résultat global (y compris ceux présentés à titre comparatif) doivent être convertis au cours de change en vigueur aux dates des transactions ; et (c) tous les écarts de change en résultant doivent être comptabilisés dans les autres éléments du résultat global. »",
      },
      {
        type: 'paragraphe',
        texte: "Un cours moyen de la période peut être utilisé pour les produits et les charges si les cours ne fluctuent pas fortement (§ 40). Les écarts de conversion proviennent de la conversion des produits et charges à des cours différents du cours de clôture, et de la conversion de l'actif net d'ouverture à un cours de clôture différent du précédent (§ 41). Ils sont cumulés dans une composante distincte des capitaux propres jusqu'à la sortie de l'établissement à l'étranger, puis reclassés en résultat net (§ 48). La norme ne fixe pas de cours pour les éléments de capitaux propres autres que le résultat ; l'usage, retenu dans l'exemple suivant, consiste à maintenir le capital et les réserves aux cours historiques, l'écart de conversion assurant l'équilibre.",
      },
      {
        type: 'carte',
        titre: "Exemple 6.7 — Conversion d'un bilan de CDF en USD (JBM SARL)",
        texte: "Illustration du support d'origine. JBM SARL a le franc congolais pour monnaie fonctionnelle ; ses investisseurs demandent des états en dollars. Cours de clôture : 2 700 ; cours moyen de N : 2 600 ; cours à la date d'apport du capital : 2 400 ; cours moyen de constitution des réserves : 2 500.",
        tableau: {
          entetes: ['Poste', 'CDF', 'Cours', 'USD'],
          lignes: [
            ['Immobilisations nettes', '270 000 000', '2 700', '100 000,00'],
            ['Stocks', '135 000 000', '2 700', '50 000,00'],
            ['Clients', '81 000 000', '2 700', '30 000,00'],
            ['Banque', '54 000 000', '2 700', '20 000,00'],
            ['**Total actif**', '**540 000 000**', '', '**200 000,00**'],
            ['Capital', '240 000 000', '2 400', '100 000,00'],
            ['Réserves', '60 000 000', '2 500', '24 000,00'],
            ['Résultat de N', '30 000 000', '2 600', '11 538,46'],
            ['Écart de conversion (autres éléments du résultat global)', '—', '', '**−13 316,24**'],
            ['Fournisseurs', '135 000 000', '2 700', '50 000,00'],
            ['Emprunt', '75 000 000', '2 700', '27 777,78'],
            ['**Total passif**', '**540 000 000**', '', '**200 000,00**'],
          ],
        },
        note: "L'écart de conversion négatif traduit la dépréciation du franc congolais : l'actif net, converti au cours de clôture, vaut 122 222,22 USD, alors que les capitaux propres convertis aux cours historiques et moyens s'élèveraient à 135 538,46 USD. L'écart de 13 316,24 USD n'est pas une perte de l'exercice : il est présenté dans les autres éléments du résultat global (§ 39(c)). Le support d'origine présente dans l'énoncé le bilan « de KASA » alors que l'exercice porte sur JBM SARL ; il s'agit d'une coquille sans incidence sur le calcul.",
      },
      { type: 'intertitre', texte: "6.5.2 Établissements à l'étranger et informations à fournir" },
      {
        type: 'paragraphe',
        texte: "Pour intégrer un établissement à l'étranger par consolidation ou mise en équivalence, les procédures de consolidation normales s'appliquent, mais un élément monétaire intragroupe ne peut être éliminé sans que soit présenté l'effet des fluctuations de change (§ 45). Le goodwill et les ajustements de juste valeur issus de l'acquisition sont des actifs et passifs de l'établissement à l'étranger, libellés dans sa monnaie fonctionnelle et convertis au cours de clôture (§ 47). Lors de la sortie, le cumul des écarts de conversion est reclassé en résultat net (§ 48), une réduction de valeur ne constituant pas une sortie partielle (§ 49). Les conséquences fiscales des écarts de change relèvent d'IAS 12 (§ 50). L'entité indique le montant des écarts de change comptabilisés en résultat net et le rapprochement des écarts cumulés en capitaux propres (§ 52).",
      },
    ],
  },
  {
    numero: '6.6',
    titre: "IAS 19 : typologie des avantages, avantages à court terme et régimes à cotisations définies",
    navLabel: 'IAS 19 : typologie',
    blocs: [
      {
        type: 'paragraphe',
        texte: "IAS 19 impose de comptabiliser un passif lorsqu'un membre du personnel a rendu des services en échange d'avantages qui lui seront versés dans l'avenir, et une charge lorsque l'entité consomme l'avantage économique résultant de ces services (§ 1). Elle s'applique à tous les avantages du personnel, sauf les paiements fondés sur des actions (§ 2), qu'ils résultent d'accords formels, de dispositions légales ou d'usages créant une obligation implicite (§ 4). Les administrateurs et autres dirigeants sont des membres du personnel (§ 7).",
      },
      { type: 'intertitre', texte: "6.6.1 Les quatre catégories d'avantages" },
      {
        type: 'carte',
        titre: "Tableau 6.5 — Catégories d'avantages du personnel (IAS 19, § 5 et 8)",
        tableau: {
          entetes: ['Catégorie', 'Exemples', 'Traitement'],
          lignes: [
            ['Avantages à court terme', "Salaires, cotisations sociales, congés payés, primes, avantages en nature, réglés dans les douze mois", 'Montant non actualisé, en charges et passif (§ 11)'],
            ["Avantages postérieurs à l'emploi", "Pensions, indemnités de départ à la retraite, assistance médicale après l'emploi", 'Cotisations définies (§ 51) ou prestations définies (§ 55-130)'],
            ['Autres avantages à long terme', "Congés d'ancienneté, primes d'ancienneté, invalidité de longue durée", 'Méthode actuarielle, réévaluations en résultat (§ 153-156)'],
            ["Indemnités de cessation d'emploi", "Indemnités de licenciement, plans de départs volontaires", 'Passif à la première des dates du § 165'],
          ],
        },
      },
      { type: 'intertitre', texte: "6.6.2 Les avantages à court terme" },
      {
        type: 'paragraphe',
        texte: "Les avantages à court terme sont comptabilisés pour leur montant non actualisé, en passif après déduction des sommes déjà versées, et en charges sauf incorporation dans le coût d'un actif (§ 11). Les absences rémunérées cumulables, reportables sur des périodes futures, sont comptabilisées à mesure que le personnel rend les services qui génèrent les droits, même si ceux-ci ne sont pas acquis ; les absences non cumulables le sont lorsqu'elles se produisent (§ 13-18). Les primes et l'intéressement ne sont comptabilisés que si l'entité a une obligation actuelle, juridique ou implicite, et si une estimation fiable est possible (§ 19) ; l'évaluation tient compte des départs attendus (§ 20).",
      },
      { type: 'intertitre', texte: "6.6.3 Régimes à cotisations définies et régimes à prestations définies" },
      {
        type: 'paragraphe',
        texte: "Les régimes postérieurs à l'emploi sont classés selon leur réalité économique (§ 27). Dans un régime à cotisations définies, l'obligation de l'entité se limite aux cotisations qu'elle s'engage à verser à une entité distincte, sans obligation de compléter les prestations ; le membre du personnel supporte le risque actuariel et le risque de placement (§ 8 et 28). Tout autre régime est à prestations définies : l'entité s'engage sur le montant des prestations et supporte ces risques (§ 30). Une garantie de rendement ou un usage de revalorisation des pensions suffit à faire naître une obligation au-delà des cotisations (§ 29). Un régime général et obligatoire est traité comme un régime multi-employeurs ; lorsque la seule obligation de l'entité est d'acquitter les cotisations exigibles, c'est normalement un régime à cotisations définies (§ 43-45).",
      },
      {
        type: 'carte',
        titre: "Exemple 6.8 — Cotisations patronales à la CNSS",
        texte: "Le décret n° 18/041 du 24 novembre 2018 fixe les taux des cotisations dues à la Caisse nationale de sécurité sociale : branche des prestations aux familles, 6,5 % à charge exclusive de l'employeur ; branche des pensions, 10 %, dont 5 % à charge de l'employeur ; branche des risques professionnels, 1,5 % à charge exclusive de l'employeur (art. 2 à 4), sous réserve d'une révision ultérieure de ces taux. Une entreprise dont la masse salariale de décembre N s'élève à 100 000 000 CDF règle ses cotisations en janvier N+1.",
        tableau: {
          entetes: ['Branche', 'Taux employeur', 'Charge de décembre (CDF)'],
          lignes: [
            ['Prestations aux familles', '6,5 %', '6 500 000'],
            ['Pensions', '5 %', '5 000 000'],
            ['Risques professionnels', '1,5 %', '1 500 000'],
            ['**Total**', '**13 %**', '**13 000 000**'],
          ],
        },
        note: "L'entreprise n'a aucune obligation de payer les pensions futures : elle comptabilise la charge des cotisations de la période et un passif de 13 000 000 au titre des cotisations exigibles non réglées à la clôture (IAS 19.51). Aucune hypothèse actuarielle n'est nécessaire (§ 50). La part salariale des cotisations de pension, retenue sur les salaires, est une dette envers la CNSS et non une charge de l'employeur.",
      },
    ],
  },
  {
    numero: '6.7',
    titre: "IAS 19 : les régimes à prestations définies",
    navLabel: 'IAS 19 : prestations définies',
    blocs: [
      {
        type: 'paragraphe',
        texte: "La comptabilisation d'un régime à prestations définies est complexe : l'obligation dépend d'hypothèses actuarielles, elle est actualisée parce qu'elle peut être réglée de nombreuses années après les services, et des écarts actuariels apparaissent (§ 55). Les indemnités de départ à la retraite prévues par une convention collective ou par un accord d'entreprise, versées au salarié qui part à la retraite, en sont l'exemple le plus répandu dans les entreprises congolaises ; ce sont des avantages postérieurs à l'emploi (§ 160 et 164).",
      },
      { type: 'intertitre', texte: "6.7.1 La méthode des unités de crédit projetées" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 19, § 67, 68 et 70",
        texte: "« L'entité doit utiliser la méthode des unités de crédit projetées pour déterminer la valeur actualisée de ses obligations au titre des prestations définies, le coût correspondant des services rendus au cours de la période et, le cas échéant, le coût des services passés. » (§ 67). Selon cette méthode, « chaque période de service donne lieu à une unité de droits à prestations additionnelle […] et chacune de ces unités est évaluée séparément pour obtenir l'obligation finale » (§ 68). L'entité « doit rattacher les droits à prestations aux périodes de service selon la formule de calcul des prestations établie par le régime », une répartition linéaire s'imposant si les services des années les plus tardives aboutissent à des droits significativement supérieurs (§ 70).",
      },
      {
        type: 'paragraphe',
        texte: "La méthode combine trois opérations : la projection de la prestation à la date de paiement, avec les salaires futurs estimés (§ 87(b)) ; le rattachement de cette prestation aux années de service, de sorte que l'obligation à la clôture ne porte que sur les droits correspondant aux services déjà rendus ; l'actualisation de ce montant. Le rattachement cesse à la date à partir de laquelle la poursuite de l'activité ne génère plus de droits additionnels significatifs (§ 73) ; les augmentations de salaire ne constituent pas de tels droits (§ 74). Ainsi, pour un régime accordant un mois de salaire par année de service plafonné à seize années, aucun droit n'est rattaché aux années de service postérieures à la seizième.",
      },
      {
        type: 'carte',
        titre: "Tableau 6.6 — Hypothèses actuarielles (IAS 19, § 75 à 87)",
        tableau: {
          entetes: ['Nature', 'Hypothèses', 'Exigence'],
          lignes: [
            ['Démographiques', 'Mortalité, rotation du personnel, invalidité, retraite anticipée', "Exemptes de parti pris et mutuellement compatibles (§ 75-76)"],
            ["Taux d'actualisation", "Rendement des obligations d'entreprise de haute qualité ou, à défaut de marché large, des obligations d'État, dans la monnaie et pour la durée de l'obligation", "Ne reflète ni le risque actuariel, ni le risque de placement, ni le risque de crédit propre (§ 83-84)"],
            ['Salaires futurs', "Augmentations estimées influant sur les prestations", 'Inclus dans la projection (§ 87(b))'],
          ],
        },
      },
      {
        type: 'carte',
        titre: "Exemple 6.9 — Indemnité de départ à la retraite (agent B)",
        texte: "Illustration du support d'origine, rectifiée. Au 31 décembre N, l'agent B a 55 ans et 20 ans d'ancienneté ; il partira à la retraite à 65 ans, dans 10 ans, avec 30 ans d'ancienneté. Salaire mensuel actuel : 1 200 USD ; augmentation annuelle estimée : 3 %. Règle conventionnelle retenue par l'énoncé : un mois de salaire par tranche de cinq années d'ancienneté. Taux d'actualisation : 8 %. Pour simplifier, les probabilités de départ anticipé et de décès sont ignorées.",
        tableau: {
          entetes: ['Étape', 'Calcul', 'Montant (USD)'],
          lignes: [
            ['Salaire estimé à la retraite', '1 200 × 1,03¹⁰', '1 612,70'],
            ['Prestation projetée (30 / 5 = 6 mois)', '6 × 1 612,70', '9 676,20'],
            ['Valeur actualisée de la prestation totale', '9 676,20 / 1,08¹⁰', '4 481,95'],
            ['Rattachement aux services rendus (§ 70)', '20 / 30', '× 0,6667'],
            ['**Obligation au 31/12/N**', '4 481,95 × 20 / 30', '**2 987,97**'],
            ['Coût financier de N+1', '2 987,97 × 8 %', '239,04'],
            ['Coût des services rendus de N+1', '9 676,20 / 30 / 1,08⁹', '161,35'],
            ['Obligation au 31/12/N+1, hypothèses inchangées', '9 676,20 × 21 / 30 / 1,08⁹', '3 388,36'],
          ],
        },
        note: "Le support actualise la totalité de la prestation de fin de carrière et obtient une provision d'environ 4 480 USD. Ce montant correspond à des droits qui ne seront acquis qu'au terme de 30 années de service ; au 31 décembre N, seules 20 années ont été rendues. La méthode des unités de crédit projetées impose de n'en retenir que les 20/30, soit 2 987,97 USD (§ 67-70). Le SYSCOHADA révisé retient la même logique : sa formule officielle de l'engagement comporte le rapport ancienneté actuelle sur ancienneté totale (Titre VIII, ch. 21, § 2.1). Chaque année, l'obligation augmente du coût des services rendus et du coût financier ; les écarts dus aux changements d'hypothèses sont des écarts actuariels.",
      },
      { type: 'intertitre', texte: "6.7.2 Comptabilisation et présentation" },
      {
        type: 'paragraphe',
        texte: "L'entité comptabilise au bilan le passif (l'actif) net au titre des prestations définies, égal à la valeur actualisée de l'obligation diminuée de la juste valeur des actifs du régime, un excédent étant limité au plafond de l'actif (§ 63-64). Le coût des prestations définies comporte trois composantes, dont le traitement diffère (§ 120). Les réévaluations comptabilisées dans les autres éléments du résultat global ne sont jamais reclassées en résultat net ; elles peuvent être virées à une autre composante des capitaux propres (§ 122).",
      },
      {
        type: 'carte',
        titre: "Tableau 6.7 — Composantes du coût des prestations définies (IAS 19, § 120 à 128)",
        tableau: {
          entetes: ['Composante', 'Contenu', 'Comptabilisation'],
          lignes: [
            ['Coût des services', "Coût des services rendus au cours de la période, coût des services passés, profit ou perte de liquidation", 'Résultat net'],
            ['Intérêts nets', "Passif (actif) net × taux d'actualisation, déterminés au début de l'exercice (§ 123-123A)", 'Résultat net'],
            ['Réévaluations', "Écarts actuariels, rendement des actifs hors intérêts, variation de l'effet du plafond de l'actif", 'Autres éléments du résultat global, sans reclassement'],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Rapprochement avec le SYSCOHADA révisé",
        texte: "Le chapitre 21 du Titre VIII s'inspire expressément d'IAS 19. Les indemnités de fin de carrière concernent toutes les entités et sont provisionnées au compte 196 Provisions pour pensions et obligations similaires, le coût des services rendus étant porté au compte 6911 et le coût financier au compte 6971. L'évaluation selon la méthode des unités de crédit projetées est obligatoire pour les entités faisant appel public à l'épargne ; les autres peuvent opter pour une méthode simplifiée faisant abstraction de certaines hypothèses démographiques ou financières, le texte recommandant la méthode actuarielle aux entités appartenant à un groupe qui publie en IFRS. La divergence principale porte sur les écarts actuariels : le SYSCOHADA les qualifie de changements d'estimation et les comptabilise en résultat d'exploitation ou financier (§ 3.4.2), alors qu'IAS 19 les inscrit dans les autres éléments du résultat global. Le texte officiel relève lui-même une incohérence entre son § 3.3, qui loge certaines différences en report à nouveau, et son § 3.4.2 [texte officiel].",
      },
    ],
  },
  {
    numero: '6.8',
    titre: "IAS 19 : autres avantages à long terme et indemnités de cessation d'emploi",
    navLabel: 'IAS 19 : autres avantages',
    blocs: [
      { type: 'intertitre', texte: "6.8.1 Les autres avantages à long terme" },
      {
        type: 'paragraphe',
        texte: "Les autres avantages à long terme comprennent notamment les congés liés à l'ancienneté, les primes d'ancienneté, les prestations d'invalidité de longue durée et la rémunération différée, lorsque leur règlement intégral n'est pas attendu dans les douze mois (§ 153). Leur évaluation étant habituellement moins incertaine que celle des avantages postérieurs à l'emploi, la norme prévoit une méthode simplifiée : l'obligation est évaluée selon la méthode des unités de crédit projetées, mais le total net du coût des services, des intérêts nets et des réévaluations est comptabilisé en résultat net (§ 154-156). Une médaille du travail ou une prime versée après vingt ans de service relève de cette catégorie.",
      },
      { type: 'intertitre', texte: "6.8.2 Les indemnités de cessation d'emploi" },
      {
        type: 'paragraphe',
        texte: "Pour les indemnités de cessation d'emploi, l'événement qui génère l'obligation n'est pas le service rendu, mais la cessation d'emploi résultant de la décision de l'entité ou de l'acceptation par le salarié d'une offre d'indemnités (§ 159). Les prestations dues en cas de départ à l'initiative du salarié ou de retraite obligatoire sont des avantages postérieurs à l'emploi ; seule la différence entre l'indemnité versée à l'initiative de l'entité et celle due à l'initiative du salarié constitue une indemnité de cessation d'emploi (§ 160). Des prestations dont le paiement est certain mais la date incertaine sont des avantages postérieurs à l'emploi, même si elles sont appelées indemnités de licenciement (§ 164).",
      },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 19, § 165",
        texte: "« L'entité doit comptabiliser un passif et une charge au titre des indemnités de cessation d'emploi à la première des dates suivantes : (a) la date où elle ne peut plus retirer son offre d'indemnités ; (b) la date où elle comptabilise les coûts d'une restructuration entrant dans le champ d'application d'IAS 37 et prévoyant le paiement de telles indemnités. »",
      },
      {
        type: 'carte',
        titre: "Exemple 6.10 — Départ immédiat à la retraite (agent A)",
        texte: "Illustration du support d'origine, rectifiée. L'agent A part à la retraite à 65 ans avec 25 ans d'ancienneté ; son dernier salaire mensuel est de 1 000 USD. Règle conventionnelle retenue par l'énoncé : un mois de salaire par tranche de cinq ans.",
        tableau: {
          entetes: ['Élément', 'Calcul', 'Montant (USD)'],
          lignes: [
            ['Nombre de mois dus', '25 / 5', '5'],
            ['Indemnité de départ', '5 × 1 000', '**5 000**'],
            ["Traitement si l'obligation a été constituée pendant la carrière", "Débit Provision pour avantages du personnel / Crédit Rémunérations dues", '5 000'],
          ],
        },
        note: "Le support passe l'écriture pour 180 000, montant sans rapport avec l'indemnité calculée de 5 000 USD : il s'agit d'une erreur de report. Surtout, l'indemnité de départ à la retraite est un avantage postérieur à l'emploi (IAS 19.160) : si l'entité a appliqué la méthode des unités de crédit projetées pendant la carrière de l'agent, le versement solde une obligation déjà comptabilisée et n'affecte pas le résultat de l'exercice de départ, sauf écart actuariel résiduel. Une charge de 5 000 USD l'année du départ révèle que l'obligation n'avait pas été constituée, ce qui constitue une erreur au regard d'IAS 19 et, pour les comptes SYSCOHADA, du chapitre 21 du Titre VIII.",
      },
      {
        type: 'filet',
        titre: "Synthèse du chapitre",
        texte: "IAS 12, IAS 21 et IAS 19 reposent sur une même démarche : identifier, à la date de clôture, un droit ou une obligation dont le dénouement financier est différé, l'évaluer, puis rattacher sa variation au résultat net ou aux autres éléments du résultat global selon la nature de l'événement qui l'a produite. L'impôt différé traduit l'impôt attaché aux écarts entre valeurs comptables et bases fiscales ; la conversion au cours de clôture traduit l'exposition des éléments monétaires au change ; la méthode des unités de crédit projetées traduit le coût des droits acquis par le personnel. Dans les trois cas, le SYSCOHADA révisé adopte une position plus prudente ou plus simple : impôt exigible dans les comptes individuels, non-comptabilisation des gains de change latents, méthodes simplifiées et écarts actuariels en résultat.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ue13c6-cp1',
    titre: "Impôts différés d'une société industrielle (LUALABA PACKAGING SA, société fictive)",
    contexte: "LUALABA PACKAGING SA établit des états IFRS pour son groupe. Au 31 décembre N, taux d'impôt sur les sociétés de 30 %, les informations suivantes sont réunies : (1) une ligne d'emballage a une valeur comptable de 2 400 000 USD et une base fiscale de 1 800 000 USD ; (2) une provision pour indemnités de départ à la retraite de 300 000 USD, déductible lors du paiement ; (3) des intérêts courus sur un prêt consenti à un fournisseur, 50 000 USD, imposables à l'encaissement ; (4) une amende douanière de 40 000 USD, non déductible ; (5) des pertes fiscales reportables de 500 000 USD, issues d'un incendie de l'usine en N-1, l'entité étant bénéficiaire avant cet événement et prévoyant des bénéfices imposables suffisants. Le bénéfice comptable avant impôt de N s'élève à 1 000 000 USD. Aucun impôt différé n'était comptabilisé à l'ouverture, sauf sur la ligne d'emballage (passif de 150 000 USD).",
    questions: [
      {
        num: 1,
        enonce: "Déterminez les différences temporaires et leur nature.",
        correction: "(1) Imposable : 2 400 000 − 1 800 000 = **600 000**. (2) Déductible : 300 000 − 0 = **300 000** (base fiscale nulle, § 8). (3) Imposable : 50 000 (base fiscale nulle, § 7 ex. 2). (4) Aucune : base fiscale égale à la valeur comptable (§ 8 ex. 4) ; différence permanente. (5) Report en avant de pertes fiscales : 500 000, source potentielle d'actif d'impôt différé (§ 34).",
      },
      {
        num: 2,
        enonce: "Calculez les impôts différés au 31 décembre N et justifiez la comptabilisation de l'actif sur les pertes fiscales.",
        correction: "Passifs : (600 000 + 50 000) × 30 % = **195 000**. Actifs : 300 000 × 30 % = 90 000 ; pertes fiscales 500 000 × 30 % = 150 000. L'historique de pertes étant limité à un événement identifiable qui ne se reproduira vraisemblablement pas (§ 36(c)) et des bénéfices imposables étant attendus, l'actif de 150 000 peut être comptabilisé, sous réserve d'éléments probants indiqués en annexe (§ 35 et 82). Total des actifs : **240 000**. Présentation nette possible si les conditions du § 74 sont réunies (même administration, même entité).",
      },
      {
        num: 3,
        enonce: "Quelle est la charge d'impôt différé de N, sachant que la provision de retraite et les intérêts courus sont nés en N et que l'actif sur pertes n'avait pas été comptabilisé en N-1 ?",
        correction: "Variation du passif sur la ligne d'emballage : 180 000 − 150 000 = +30 000 ; passif sur intérêts : +15 000 ; actif sur provision : −90 000 ; actif sur pertes : −150 000. Produit d'impôt différé net : 30 000 + 15 000 − 90 000 − 150 000 = **−195 000**. La comptabilisation de l'actif sur des pertes antérieures non comptabilisées est une composante distincte de la charge d'impôt (§ 80(f)).",
      },
      {
        num: 4,
        enonce: "Dans les comptes individuels SYSCOHADA de la société, lesquels de ces impôts différés apparaissent-ils ?",
        correction: "Aucun : le SYSCOHADA révisé retient la méthode de l'impôt exigible dans les comptes individuels (Titre VII, compte 195). Les impôts différés sont comptabilisés lors de l'établissement des comptes consolidés ou des états IFRS du groupe. Une provision pour impôts n'est envisageable qu'en cas d'imposition fractionnée significative.",
      },
    ],
  },
  {
    id: 'ue13c6-cp2',
    titre: "Monnaie fonctionnelle et opérations en devises d'un distributeur de matériel minier",
    contexte: "EQUIPMINES SARL, établie à Kolwezi, importe d'Afrique du Sud des pièces d'usure qu'elle revend à des sociétés minières. Ses prix de vente sont fixés et facturés en dollars ; ses achats sont libellés en dollars ; ses salaires sont fixés en dollars et payés en francs congolais au cours du jour ; son emprunt bancaire est en dollars ; ses impôts et taxes sont payés en francs congolais. Au cours de N : le 1er octobre, vente de pièces pour 200 000 USD, payable le 15 janvier N+1 ; le 1er décembre, emprunt de 500 000 000 CDF auprès d'un fournisseur local, remboursable en CDF en N+1. Cours : 1er octobre, 1 USD = 2 800 CDF ; 1er décembre, 1 USD = 2 850 CDF ; 31 décembre, 1 USD = 2 900 CDF.",
    questions: [
      {
        num: 1,
        enonce: "Déterminez la monnaie fonctionnelle d'EQUIPMINES SARL.",
        correction: "Selon IAS 21.9, la monnaie qui influence le plus les prix de vente (dollar, prix fixés et facturés en USD, sur un marché minier régi par des cours internationaux) et celle qui influence le plus les coûts (dollar : achats et salaires fixés en USD) désignent le **dollar**. Le financement en dollars le confirme (§ 10). Le paiement des impôts en francs congolais ne suffit pas à renverser ces indicateurs. La comptabilité légale reste tenue en francs congolais (AUDCIF, art. 17) ; les états IFRS sont établis par conversion en dollars (IAS 21.34).",
      },
      {
        num: 2,
        enonce: "Dans les états IFRS (monnaie fonctionnelle USD), quels écarts de change sont comptabilisés en N ?",
        correction: "La créance de 200 000 USD est libellée dans la monnaie fonctionnelle : aucun écart. La dette de 500 000 000 CDF est en monnaie étrangère : 500 000 000 / 2 850 = 175 438,60 USD au 1er décembre ; 500 000 000 / 2 900 = 172 413,79 USD au 31 décembre ; **gain de change de 3 024,81 USD** en résultat net (§ 28). Ce résultat montre que, pour une entité à monnaie fonctionnelle USD, le risque de change porte sur les éléments en francs congolais.",
      },
      {
        num: 3,
        enonce: "Dans la comptabilité légale SYSCOHADA tenue en CDF, quel traitement reçoit la créance de 200 000 USD au 31 décembre N ?",
        correction: "Valeur d'origine : 200 000 × 2 800 = 560 000 000 CDF. Valeur à la clôture : 200 000 × 2 900 = 580 000 000 CDF. L'augmentation de la créance, gain latent de 20 000 000 CDF, est inscrite au compte 479 Écarts de conversion-Passif et n'intervient pas dans le résultat (art. 54 ; Titre VIII, ch. 22, § 2.2.3). En IFRS, établis en dollars, cette variation n'existe pas.",
      },
      {
        num: 4,
        enonce: "Si le cours du 15 janvier N+1 est de 2 750 CDF, quel résultat de change la comptabilité SYSCOHADA enregistre-t-elle en N+1 ?",
        correction: "Encaissement : 200 000 × 2 750 = 550 000 000 CDF, pour une valeur d'origine de 560 000 000 : **perte de change de 10 000 000 CDF** (compte 656, créance commerciale). L'écart de conversion-passif de N est contrepassé. En IFRS (monnaie fonctionnelle USD), l'encaissement de 200 000 USD solde la créance sans écart.",
      },
    ],
  },
  {
    id: 'ue13c6-cp3',
    titre: "Indemnités de départ à la retraite : IAS 19 et SYSCOHADA révisé",
    contexte: "Une société agro-industrielle accorde, en vertu de sa convention collective, une indemnité de départ à la retraite égale à un mois de dernier salaire par année d'ancienneté, plafonnée à 16 mois, versée à 60 ans. Au 31 décembre N, un chef de quai de 50 ans compte 12 ans d'ancienneté ; son salaire mensuel est de 1 500 USD, avec une progression estimée à 4 % par an. Taux d'actualisation retenu : 7 %. La probabilité de présence à 60 ans est estimée à 80 %. Les autres hypothèses sont ignorées.",
    questions: [
      {
        num: 1,
        enonce: "Déterminez la prestation projetée et la période de rattachement des droits.",
        correction: "Ancienneté à 60 ans : 12 + 10 = 22 ans ; droits plafonnés à 16 mois. Salaire à 60 ans : 1 500 × 1,04¹⁰ = 2 220,37 USD. Prestation projetée : 16 × 2 220,37 = **35 525,92 USD**. Les droits s'accroissent d'un mois par année jusqu'à la 16e année de service, puis cessent : selon IAS 19.70 et 73, la prestation est rattachée aux 16 premières années ; aucun droit n'est rattaché aux années 17 à 22.",
      },
      {
        num: 2,
        enonce: "Calculez l'obligation au 31 décembre N selon IAS 19.",
        correction: "Valeur actualisée pondérée : 35 525,92 × 80 % / 1,07¹⁰ = 28 420,74 / 1,967151 = 14 447,67 USD. Droits rattachés aux services rendus : 12 / 16. Obligation : 14 447,67 × 12 / 16 = **10 835,75 USD**.",
      },
      {
        num: 3,
        enonce: "Le SYSCOHADA révisé conduit-il au même montant ?",
        correction: "La formule officielle du chapitre 21 (Engagement = S × N × Aa/At × Pp × Ps × actualisation × (1 + taux de charges)) retient également le rapport ancienneté actuelle sur ancienneté totale. Avec la variante « prospective » (droits totaux répartis sur toute la carrière, Aa/At = 12/22), l'engagement serait de 14 447,67 × 12/22 = 7 880,55 USD ; avec la variante générale, qui calcule les droits d'après l'ancienneté actuelle (12 mois sur les 16 de la prestation), on retrouve 10 835,75 USD. Le texte recommande la variante la plus favorable au salarié, ici la seconde, qui coïncide avec IAS 19. Il faudrait en outre, selon cette formule, majorer le montant des charges sociales et fiscales liées à l'indemnité.",
      },
      {
        num: 4,
        enonce: "En N+1, le taux d'actualisation passe à 6 %. Où l'effet de ce changement est-il comptabilisé dans chaque référentiel ?",
        correction: "Il s'agit d'un écart actuariel dû à un changement d'hypothèse financière (IAS 19.128(d)). En IFRS, il est comptabilisé dans les autres éléments du résultat global, sans reclassement ultérieur (§ 120(c) et 122). En SYSCOHADA révisé, il constitue un changement d'estimation comptabilisé en résultat d'exploitation ou financier (ch. 21, § 3.4.2), par une dotation au compte 196.",
      },
    ],
  },
  {
    id: 'ue13c6-cp4',
    titre: "Conversion des états d'une filiale et consolidation en dollars",
    contexte: "Un groupe publiant en dollars détient 100 % d'une filiale de distribution établie à Kinshasa, dont la monnaie fonctionnelle est le franc congolais. Au 31 décembre N : actif net de la filiale 1 350 000 000 CDF, dont un résultat de N de 104 000 000 CDF. À l'ouverture, l'actif net s'élevait à 1 246 000 000 CDF. Cours : 31 décembre N-1, 2 500 ; moyen de N, 2 600 ; 31 décembre N, 2 700. La filiale doit en outre à la mère 100 000 USD au titre d'un prêt dont le remboursement n'est ni planifié ni probable.",
    questions: [
      {
        num: 1,
        enonce: "Convertissez l'actif net et le résultat de la filiale en dollars.",
        correction: "Résultat au cours moyen (§ 39(b) et 40) : 104 000 000 / 2 600 = **40 000 USD**. Actif net au cours de clôture (§ 39(a)) : 1 350 000 000 / 2 700 = **500 000 USD**. Actif net d'ouverture au cours de clôture précédent : 1 246 000 000 / 2 500 = 498 400 USD.",
      },
      {
        num: 2,
        enonce: "Calculez et analysez l'écart de conversion de l'exercice.",
        correction: "Actif net d'ouverture + résultat = 498 400 + 40 000 = 538 400 USD ; actif net de clôture : 500 000 USD ; écart : **−38 400 USD**. Décomposition (§ 41) : actif net d'ouverture reconverti au nouveau cours : 1 246 000 000 / 2 700 = 461 481,48, soit −36 918,52 ; résultat reconverti du cours moyen au cours de clôture : 104 000 000 / 2 700 − 40 000 = −1 481,48. Total −38 400. L'écart est comptabilisé dans les autres éléments du résultat global (§ 39(c)).",
      },
      {
        num: 3,
        enonce: "Comment traiter l'écart de change sur le prêt de 100 000 USD dans les comptes de la filiale et dans les comptes consolidés ?",
        correction: "Le prêt, dont le règlement n'est ni planifié ni probable, fait partie de l'investissement net de la mère dans la filiale (§ 15). Dans les comptes individuels de la filiale (monnaie fonctionnelle CDF), la dette en USD est convertie au cours de clôture et l'écart va en résultat net (§ 28 et 32). Dans les comptes consolidés, cet écart est reclassé dans les autres éléments du résultat global, puis reclassé en résultat lors de la sortie de la filiale (§ 32 et 48).",
      },
      {
        num: 4,
        enonce: "Le groupe cède la filiale en N+3. Quel traitement reçoivent les écarts de conversion cumulés ?",
        correction: "Le cumul des écarts de conversion comptabilisés dans les autres éléments du résultat global est reclassé des capitaux propres en résultat net, à titre d'ajustement de reclassement, lors de la comptabilisation du profit ou de la perte de cession (§ 48). Une dépréciation de la participation avant la cession n'aurait pas constitué une sortie partielle et n'aurait entraîné aucun reclassement (§ 49).",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue13',
  numero: 6,
  id: 'ue13-chapitre-6',
  titre: 'Impôts différés, monnaies étrangères et avantages du personnel',
  sousTitre: "IAS 12, IAS 21 et IAS 19 : fiscalité différée, conversion des devises et engagements sociaux",
  infoBulle: "Chapitre 6 du module IFRS/IAS : impôts sur le résultat selon IAS 12 (base fiscale, différences temporaires, exceptions, pertes fiscales, évaluation, rattachement, preuve d'impôt) ; effets des variations des cours des monnaies étrangères selon IAS 21 (monnaie fonctionnelle, transactions, éléments monétaires et non monétaires, conversion dans une monnaie de présentation) ; avantages du personnel selon IAS 19 (avantages à court terme, cotisations et prestations définies, unités de crédit projetées, réévaluations, cessation d'emploi) ; rapprochement avec le SYSCOHADA révisé et le contexte congolais (impôt sur les sociétés, CNSS, dollarisation).",
  loiRef: "IAS 12 · IAS 21 · IAS 19 · AUDCIF art. 17 et 54 à 57 · SYSCOHADA, Titre VIII, ch. 21 et 22 · Loi n° 23/053 (IS) · Décret n° 18/041 (CNSS)",
  moduleLabel: 'UE 13 · IFRS / IAS',
  retourRoute: '/ue13-ifrs-ias',
  coursId: 'ue13-ifrs-ias',
  objectifs: [
    "Déterminer la base fiscale d'un actif ou d'un passif et qualifier les différences temporaires.",
    "Comptabiliser les passifs et actifs d'impôt différé, en appliquant les exceptions et le critère de probabilité des bénéfices imposables futurs.",
    "Évaluer les impôts différés, les rattacher au résultat net ou aux autres éléments du résultat global, et établir une preuve d'impôt.",
    "Déterminer la monnaie fonctionnelle d'une entité et comptabiliser les transactions en monnaie étrangère.",
    "Convertir des états financiers dans une monnaie de présentation et analyser l'écart de conversion.",
    "Classer les avantages du personnel et distinguer régimes à cotisations définies et à prestations définies.",
    "Évaluer une obligation de retraite selon la méthode des unités de crédit projetées et en comptabiliser les composantes.",
    "Traiter les autres avantages à long terme et les indemnités de cessation d'emploi.",
    "Comparer ces traitements avec ceux du SYSCOHADA révisé et du droit congolais applicable.",
  ],
  sections: SECTIONS,
  aRetenir: [
    "IAS 12 retient une approche bilantielle : une différence temporaire est l'écart entre la valeur comptable d'un actif ou d'un passif et sa base fiscale (§ 5). Les différences permanentes n'en créent pas.",
    "Un passif d'impôt différé est comptabilisé pour toutes les différences temporaires imposables, sauf comptabilisation initiale du goodwill ou d'un actif hors regroupement sans effet sur les résultats (§ 15). Un actif d'impôt différé ne l'est que si un bénéfice imposable futur est probable ; un historique de pertes impose des indications convaincantes (§ 24 et 35).",
    "Les impôts différés sont évalués au taux attendu lors de la résorption, d'après les lois adoptées ou quasi adoptées, et ne sont jamais actualisés (§ 47 et 53). Ils suivent l'élément qui les a générés : résultat net ou autres éléments du résultat global (§ 58 et 61A).",
    "Le SYSCOHADA révisé applique la méthode de l'impôt exigible dans les comptes individuels et ne comptabilise les impôts différés qu'en consolidation.",
    "La monnaie fonctionnelle est celle de l'environnement économique principal, déterminée d'abord par la monnaie des prix de vente et des coûts (IAS 21.8-9). La comptabilité légale reste tenue dans la monnaie ayant cours légal (AUDCIF, art. 17).",
    "À la clôture, les éléments monétaires sont convertis au cours de clôture, les éléments non monétaires au coût au cours historique ; les écarts sur éléments monétaires vont en résultat net (IAS 21.23 et 28). Le SYSCOHADA provisionne les pertes latentes et diffère les gains latents (comptes 478 et 479).",
    "La conversion dans une monnaie de présentation applique le cours de clôture aux actifs et passifs et le cours des transactions aux produits et charges ; l'écart va dans les autres éléments du résultat global (IAS 21.39).",
    "Les cotisations à un régime général et obligatoire tel que celui de la CNSS relèvent normalement des cotisations définies (IAS 19.43-45). Un régime à prestations définies s'évalue selon la méthode des unités de crédit projetées, qui rattache la prestation projetée aux seules années de service rendues (§ 67-70).",
    "Coût des services et intérêts nets vont en résultat net, réévaluations en autres éléments du résultat global sans reclassement (IAS 19.120-122) ; le SYSCOHADA comptabilise les écarts actuariels en résultat. Les indemnités de cessation d'emploi sont comptabilisées lorsque l'offre ne peut plus être retirée ou lors de la restructuration (§ 165).",
  ],
  references: [
    { genre: 'texte', intitule: "IAS 12 — Impôts sur le résultat", precision: "objectif, §§ 1 à 36, 46 à 61A, 71 à 81 (texte français intégral)" },
    { genre: 'texte', intitule: "IAS 21 — Effets des variations des cours des monnaies étrangères", precision: "§§ 1 à 52 (texte français intégral)" },
    { genre: 'texte', intitule: "IAS 19 — Avantages du personnel", precision: "§§ 1 à 30, 43 à 58, 63 à 87, 120 à 128, 153 à 165 (texte français intégral)" },
    { genre: 'texte', intitule: "AUDCIF et SYSCOHADA révisé", precision: "art. 17 et 54 à 57 ; Titre VII, compte 195 ; Titre VIII, ch. 21 (engagements de retraite) et ch. 22 (opérations en devises) ; Titres VI, XII et XIII (impôts différés en consolidation)" },
    { genre: 'texte', intitule: "Loi n° 23/053 du 30 novembre 2023 relative à l'impôt sur les sociétés et à l'impôt sur le revenu des personnes physiques", precision: "art. 56 (taux de l'IS) et 57 (impôt minimum)" },
    { genre: 'texte', intitule: "Décret n° 18/041 du 24 novembre 2018 fixant les taux des cotisations dues à la CNSS", precision: "art. 2 à 4" },
    { genre: 'texte', intitule: "J.-B. Tshimanga Mulumba (CPCC), Impôts différés, monnaies étrangères & avantages du personnel", precision: "support de cours, module 6 : illustrations MBOKA INDUSTRIES, KASA SARL, JBM SARL et agents A et B" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "IAS 12, IAS 21 et IAS 19 (texte français intégral) ; AUDCIF et SYSCOHADA révisé ; loi n° 23/053 (IS) ; décret n° 18/041 (CNSS) ; support de cours du module 6 (J.-B. Tshimanga Mulumba, CPCC).",
}

export default chapitre
