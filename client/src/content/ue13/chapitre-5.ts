import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 13 — Chapitre 5 : Produits des contrats conclus avec des clients et
// subventions publiques (IFRS 15, IAS 20)
//
// Sources lues sur texte pendant la rédaction :
// - IFRS 15 (traduction française officielle, IFRS Foundation) : §§ 1 à 110,
//   annexe A ; annexe B : B14 à B51, B56 à B61, B77 à B86 ; C1 et C10.
// - IAS 20 (texte français intégral) : §§ 1 à 39.
// - IAS 37, § 66 à 69 (contrat déficitaire).
// - AUDCIF et SYSCOHADA révisé : Titre VII, introduction de la classe 7,
//   comptes 14 et 71 ; Titre VIII, ch. 17 (subventions et aides publiques)
//   et ch. 23 (contrats pluri-exercices).
// - Support de cours d'origine : J.-B. Tshimanga Mulumba (CPCC), « IFRS -
//   Produits, contrats & subventions (IFRS 15 & IAS 20) », module 5 ; ses
//   deux illustrations (logiciel et maintenance ; machine subventionnée) sont
//   reprises et approfondies. Deux points du support sont rectifiés dans le
//   texte : la terminologie officielle française est « obligation de
//   prestation » (et non « obligation de performance ») ; le remboursement
//   d'une subvention suit des règles distinctes selon qu'elle est liée au
//   résultat ou à un actif (IAS 20.32).
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'ue13c5-q1',
    question: "Quelles normes IFRS 15 a-t-elle annulées et remplacées ?",
    options: [
      { id: 'a', texte: "IAS 18 seulement" },
      { id: 'b', texte: "IAS 11, IAS 18, IFRIC 13, IFRIC 15, IFRIC 18 et SIC-31" },
      { id: 'c', texte: "IAS 11 et IAS 20" },
      { id: 'd', texte: "IAS 18 et IFRS 16" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.C10 énumère les textes annulés : IAS 11 Contrats de construction, IAS 18 Produits des activités ordinaires, IFRIC 13 (programmes de fidélisation), IFRIC 15 (construction de biens immobiliers), IFRIC 18 (transferts d'actifs provenant de clients) et SIC-31 (troc de services de publicité). IAS 20 demeure en vigueur ; IFRS 16 est une norme distincte, postérieure.",
    articleRef: "IFRS 15.C10",
  },
  {
    id: 'ue13c5-q2',
    question: "Lequel de ces contrats entre dans le champ d'application d'IFRS 15 ?",
    options: [
      { id: 'a', texte: "Un contrat de location d'entrepôt relevant d'IFRS 16" },
      { id: 'b', texte: "Un échange de carburant entre deux distributeurs pétroliers pour servir leurs clients respectifs en d'autres lieux" },
      { id: 'c', texte: "La vente de sacs de ciment à un quincaillier" },
      { id: 'd', texte: "Un accord de collaboration pour développer en commun un actif, risques et avantages partagés" },
    ],
    reponseCorrecte: 'c',
    explication: "La vente de ciment à un client, extrant des activités ordinaires, relève d'IFRS 15. Les contrats de location (§ 5(a)) et les échanges non monétaires entre entités de la même branche destinés à faciliter les ventes (§ 5(d), exemple des sociétés pétrolières) sont exclus. Le partenaire d'un accord de collaboration dont les risques et avantages sont partagés n'est pas un client (§ 6).",
    articleRef: "IFRS 15.5-6",
  },
  {
    id: 'ue13c5-q3',
    question: "Selon le principe fondamental d'IFRS 15, le produit des activités ordinaires est comptabilisé :",
    options: [
      { id: 'a', texte: "à l'émission de la facture" },
      { id: 'b', texte: "à l'encaissement du prix" },
      { id: 'c', texte: "de manière à montrer quand les biens ou services promis sont fournis et à quel montant de contrepartie l'entité s'attend à avoir droit" },
      { id: 'd', texte: "à la signature du contrat, pour le prix stipulé" },
    ],
    reponseCorrecte: 'c',
    explication: "IFRS 15.2 : l'entité doit comptabiliser les produits des activités ordinaires « de manière à montrer quand les biens ou les services promis aux clients sont fournis, et à quel montant de contrepartie l'entité s'attend à avoir droit en échange de ces biens ou services ». Ni la facturation ni l'encaissement ne constituent le fait générateur : c'est le transfert du contrôle (§ 31).",
    articleRef: "IFRS 15.2 et 31",
  },
  {
    id: 'ue13c5-q4',
    question: "Parmi les conditions d'existence d'un contrat au sens du § 9, laquelle est exacte ?",
    options: [
      { id: 'a', texte: "Le contrat doit obligatoirement être écrit" },
      { id: 'b', texte: "Il doit être probable que l'entité recouvre la contrepartie, en tenant compte de la capacité et de l'intention du client de payer" },
      { id: 'c', texte: "Le prix doit avoir été encaissé au moins partiellement" },
      { id: 'd', texte: "Le contrat doit avoir une durée d'au moins un an" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.9(e) exige qu'il soit probable que l'entité recouvre la contrepartie, en ne tenant compte que de la capacité et de l'intention du client de payer. Le contrat peut être approuvé « par écrit, verbalement ou selon d'autres pratiques commerciales habituelles » (§ 9(a)). Ni encaissement préalable ni durée minimale ne sont requis.",
    articleRef: "IFRS 15.9-10",
  },
  {
    id: 'ue13c5-q5',
    question: "Une entité reçoit un acompte non remboursable d'un client dont la solvabilité rend le recouvrement du solde improbable. Le contrat ne remplit donc pas le § 9. Comment traite-t-elle l'acompte ?",
    options: [
      { id: 'a', texte: "En produit immédiat, puisqu'il est encaissé" },
      { id: 'b', texte: "En passif, jusqu'à ce que les conditions du § 9 soient remplies ou que survienne l'une des situations du § 15" },
      { id: 'c', texte: "En capitaux propres" },
      { id: 'd', texte: "En diminution des stocks" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.15-16 : lorsque le contrat ne remplit pas le § 9, la contrepartie reçue est comptabilisée comme un passif jusqu'à ce que l'entité n'ait plus d'obligation et ait reçu la quasi-totalité d'une contrepartie non remboursable, ou que le contrat soit résilié avec une contrepartie non remboursable, ou que le § 9 soit ultérieurement rempli.",
    articleRef: "IFRS 15.15-16",
  },
  {
    id: 'ue13c5-q6',
    question: "Une modification de contrat ajoute des biens distincts à un prix reflétant leur prix de vente spécifique. Comment est-elle comptabilisée ?",
    options: [
      { id: 'a', texte: "Comme un contrat distinct" },
      { id: 'b', texte: "Par un ajustement cumulatif des produits à la date de modification" },
      { id: 'c', texte: "Comme une résiliation du contrat existant et la création d'un nouveau contrat" },
      { id: 'd', texte: "Elle n'est pas comptabilisée tant que le prix n'est pas encaissé" },
    ],
    reponseCorrecte: 'a',
    explication: "IFRS 15.20 : la modification est un contrat distinct lorsque l'étendue du contrat s'élargit par l'ajout de biens ou services distincts et que le prix augmente d'un montant reflétant leur prix de vente spécifique, ajusté le cas échéant pour les circonstances du contrat. À défaut, le § 21 s'applique : traitement prospectif (résiliation et nouveau contrat) si les biens restants sont distincts, ajustement cumulatif sinon.",
    articleRef: "IFRS 15.20-21",
  },
  {
    id: 'ue13c5-q7',
    question: "Un bien ou service promis est distinct lorsque :",
    options: [
      { id: 'a', texte: "il fait l'objet d'une ligne séparée sur la facture" },
      { id: 'b', texte: "le client peut en tirer parti isolément ou avec d'autres ressources aisément disponibles, et la promesse peut être identifiée séparément des autres promesses du contrat" },
      { id: 'c', texte: "son prix est fixé séparément dans le contrat" },
      { id: 'd', texte: "il est livré à une date différente des autres éléments" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.27 pose deux conditions cumulatives : le bien ou service peut exister de façon distincte (le client peut en tirer parti isolément ou avec d'autres ressources aisément disponibles) et il est distinct à l'intérieur du contrat. La présentation de la facture, la fixation séparée d'un prix ou le calendrier de livraison ne suffisent pas.",
    articleRef: "IFRS 15.27",
  },
  {
    id: 'ue13c5-q8',
    question: "Lequel de ces éléments indique que deux promesses ne peuvent PAS être identifiées séparément ?",
    options: [
      { id: 'a', texte: "L'entité vend régulièrement chacun des éléments séparément" },
      { id: 'b', texte: "L'entité réalise un important travail d'intégration des éléments pour produire l'extrant prévu au contrat" },
      { id: 'c', texte: "Les deux éléments sont livrés le même jour" },
      { id: 'd', texte: "Le client pourrait acheter l'installation auprès d'un autre prestataire" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.29 cite trois indices : un important travail d'intégration, une modification ou personnalisation considérable d'un élément par un autre, et une forte dépendance réciproque. La vente séparée courante (§ 28) et la disponibilité d'un autre prestataire plaident au contraire pour le caractère distinct.",
    articleRef: "IFRS 15.29",
  },
  {
    id: 'ue13c5-q9',
    question: "Un fabricant accorde la garantie légale de conformité d'un an, que le client ne peut pas acheter séparément et qui ne procure aucun service supplémentaire. Comment la traiter ?",
    options: [
      { id: 'a', texte: "Comme une obligation de prestation distincte, avec affectation d'une partie du prix" },
      { id: 'b', texte: "Selon IAS 37, par une provision pour garantie" },
      { id: 'c', texte: "Elle n'a aucun traitement comptable" },
      { id: 'd', texte: "En réduction du prix de transaction" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.B30 : si le client n'a pas l'option d'acheter la garantie séparément, elle est comptabilisée selon IAS 37, sauf si elle procure un service en plus de l'assurance de conformité. Le caractère légal de la garantie indique qu'elle ne constitue pas une obligation de prestation (B31(a)). Une garantie vendue séparément serait, elle, une obligation de prestation (B29).",
    articleRef: "IFRS 15.B29-B31",
  },
  {
    id: 'ue13c5-q10',
    question: "Une option d'achat de biens supplémentaires ne donne naissance à une obligation de prestation que si :",
    options: [
      { id: 'a', texte: "elle est gratuite" },
      { id: 'b', texte: "elle confère au client un droit significatif qu'il n'obtiendrait pas sans conclure le contrat" },
      { id: 'c', texte: "elle est exercée dans l'année" },
      { id: 'd', texte: "son prix d'exercice égale le prix de vente spécifique" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.B40 : l'option est une obligation de prestation seulement si elle confère un droit significatif, par exemple une remise s'ajoutant aux réductions habituelles. Une option d'achat au prix de vente spécifique ne confère pas de droit significatif : c'est une offre promotionnelle, comptabilisée seulement lors de son exercice (B41).",
    articleRef: "IFRS 15.B40-B41",
  },
  {
    id: 'ue13c5-q11',
    question: "Le prix de transaction d'une vente soumise à TVA comprend-il la TVA facturée ?",
    options: [
      { id: 'a', texte: "Oui, c'est un élément du prix payé par le client" },
      { id: 'b', texte: "Non, les sommes perçues pour le compte de tiers en sont exclues" },
      { id: 'c', texte: "Seulement si la TVA n'est pas récupérable par le client" },
      { id: 'd', texte: "Seulement pour les ventes au comptant" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.47 : le prix de transaction s'entend « à l'exclusion des sommes perçues pour le compte de tiers (par exemple les taxes de vente) ». La TVA collectée est une dette envers l'administration fiscale, non un produit de l'entité.",
    articleRef: "IFRS 15.47",
  },
  {
    id: 'ue13c5-q12',
    question: "Un contrat prévoit une prime de 200 000 si l'ouvrage est livré avant une date donnée ; il n'y a que deux issues possibles. Quelle méthode d'estimation convient le mieux ?",
    options: [
      { id: 'a', texte: "L'espérance mathématique" },
      { id: 'b', texte: "Le montant le plus probable" },
      { id: 'c', texte: "La moyenne arithmétique des deux issues" },
      { id: 'd', texte: "Aucune : une prime n'est jamais comptabilisée avant son encaissement" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.53(b) : le montant le plus probable peut constituer une estimation appropriée si le contrat n'a que deux résultats possibles, l'entité obtenant la prime ou ne l'obtenant pas. L'espérance mathématique convient plutôt à un grand nombre de contrats similaires (§ 53(a)). L'estimation reste ensuite soumise à la limitation du § 56.",
    articleRef: "IFRS 15.53",
  },
  {
    id: 'ue13c5-q13',
    question: "Quel critère conditionne l'inclusion d'une contrepartie variable estimée dans le prix de transaction ?",
    options: [
      { id: 'a', texte: "Qu'elle soit plus probable qu'improbable" },
      { id: 'b', texte: "Qu'il soit hautement probable que le dénouement de l'incertitude ne donnera pas lieu à un ajustement à la baisse important du montant cumulatif des produits comptabilisé" },
      { id: 'c', texte: "Qu'elle ait été facturée" },
      { id: 'd', texte: "Que le client l'ait acceptée par écrit" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.56 : la contrepartie variable n'est incluse que « dans la seule mesure où il est hautement probable que le dénouement ultérieur de l'incertitude relative à la contrepartie variable ne donnera pas lieu à un ajustement à la baisse important du montant cumulatif des produits des activités ordinaires comptabilisé ». Le § 57 énumère les facteurs qui augmentent le risque d'un tel ajustement.",
    articleRef: "IFRS 15.56-57",
  },
  {
    id: 'ue13c5-q14',
    question: "Un distributeur vend 1 000 ventilateurs à 50 USD, coût unitaire 30, avec droit de retour ; il prévoit 50 retours. Quel produit comptabilise-t-il à la livraison ?",
    options: [
      { id: 'a', texte: "50 000" },
      { id: 'b', texte: "47 500" },
      { id: 'c', texte: "28 500" },
      { id: 'd', texte: "Aucun produit avant la fin de la période de retour" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.B21 : le produit est comptabilisé pour le montant auquel l'entité s'attend à avoir droit, soit 950 × 50 = 47 500 ; les 2 500 restants forment un passif au titre des remboursements futurs. Le coût des ventes est de 950 × 30 = 28 500, et un actif de 1 500 représente le droit de récupérer les produits retournés (B25), sous réserve des coûts de récupération.",
    articleRef: "IFRS 15.B21-B25",
  },
  {
    id: 'ue13c5-q15',
    question: "Une entité livre un équipement le 1er janvier N et sera payée 121 000 deux ans plus tard ; le prix au comptant est de 100 000. Quel produit des activités ordinaires comptabilise-t-elle à la livraison ?",
    options: [
      { id: 'a', texte: "121 000" },
      { id: 'b', texte: "100 000, puis des produits d'intérêts présentés séparément" },
      { id: 'c', texte: "110 000" },
      { id: 'd', texte: "Aucun, jusqu'à l'encaissement" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.60-61 : le prix est ajusté pour une composante financement importante, de sorte que le produit reflète le prix de vente au comptant, soit 100 000. L'écart (taux implicite de 10 %) est constaté en produits d'intérêts : 10 000 en N et 11 000 en N+1, présentés séparément des produits des activités ordinaires (§ 65). La simplification du § 63 ne joue pas, l'intervalle excédant un an.",
    articleRef: "IFRS 15.60-65",
  },
  {
    id: 'ue13c5-q16',
    question: "Une entité verse à un client grossiste une participation à ses frais de référencement, sans recevoir de bien ou service distinct en échange. Comment la traite-t-elle ?",
    options: [
      { id: 'a', texte: "En charges commerciales" },
      { id: 'b', texte: "En réduction du prix de transaction, donc des produits des activités ordinaires" },
      { id: 'c', texte: "En immobilisation incorporelle" },
      { id: 'd', texte: "En charges financières" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.70 : une contrepartie payable au client est comptabilisée en réduction du prix de transaction, à moins qu'elle ne soit versée en échange d'un bien ou service distinct que le client fournit à l'entité. Si l'entité reçoit un service distinct dont la juste valeur est inférieure au paiement, l'excédent réduit le prix (§ 71).",
    articleRef: "IFRS 15.70-72",
  },
  {
    id: 'ue13c5-q17',
    question: "Sur quelle base le prix de transaction est-il réparti entre plusieurs obligations de prestation ?",
    options: [
      { id: 'a', texte: "À parts égales" },
      { id: 'b', texte: "Au prorata des coûts de chaque élément" },
      { id: 'c', texte: "En proportion des prix de vente spécifiques déterminés à la passation du contrat" },
      { id: 'd', texte: "Selon les prix figurant au contrat, sans autre analyse" },
    ],
    reponseCorrecte: 'c',
    explication: "IFRS 15.74 et 76 : répartition en proportion des prix de vente spécifiques à la passation du contrat. Le prix contractuel ou de catalogue « peut être son prix de vente spécifique (mais on ne doit pas présumer qu'il l'est) » (§ 77). À défaut de prix observable, l'entité l'estime (§ 78-79).",
    articleRef: "IFRS 15.74-77",
  },
  {
    id: 'ue13c5-q18',
    question: "Dans quelles conditions la méthode résiduelle peut-elle être utilisée pour estimer un prix de vente spécifique ?",
    options: [
      { id: 'a', texte: "Toujours, c'est la méthode de référence" },
      { id: 'b', texte: "Lorsque le prix de vente est très variable ou incertain" },
      { id: 'c', texte: "Seulement pour les services" },
      { id: 'd', texte: "Jamais sous IFRS 15" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.79(c) : la méthode résiduelle n'est admise que si le prix de vente est très variable (fourchette large, sans prix représentatif) ou incertain (bien ou service jamais vendu séparément et dont le prix n'est pas encore établi). Les méthodes de l'évaluation du marché avec ajustement et du coût attendu plus marge sont les autres méthodes citées.",
    articleRef: "IFRS 15.79",
  },
  {
    id: 'ue13c5-q19',
    question: "Lequel de ces critères permet de conclure qu'une obligation de prestation est remplie progressivement ?",
    options: [
      { id: 'a', texte: "Le contrat dure plus d'un an" },
      { id: 'b', texte: "Le client reçoit et consomme simultanément les avantages de la prestation au fur et à mesure qu'elle a lieu" },
      { id: 'c', texte: "Le client a versé un acompte" },
      { id: 'd', texte: "L'entité facture mensuellement" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.35 retient trois critères alternatifs : (a) réception et consommation simultanées des avantages ; (b) création ou valorisation d'un actif contrôlé par le client au fur et à mesure ; (c) actif sans autre utilisation pour l'entité et droit exécutoire à paiement pour la prestation effectuée. La durée du contrat, un acompte ou le rythme de facturation ne sont pas des critères.",
    articleRef: "IFRS 15.35",
  },
  {
    id: 'ue13c5-q20',
    question: "Une entreprise de construction bâtit un entrepôt sur le terrain de son client. Quel critère du § 35 est le plus directement rempli ?",
    options: [
      { id: 'a', texte: "35(a) : réception et consommation simultanées" },
      { id: 'b', texte: "35(b) : le client obtient le contrôle de l'actif au fur et à mesure de sa création" },
      { id: 'c', texte: "Aucun : un ouvrage est toujours livré à un moment précis" },
      { id: 'd', texte: "Le critère de l'acceptation par le client" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.35(b) vise la prestation qui crée ou valorise un actif (par exemple des travaux en cours) dont le client obtient le contrôle au fur et à mesure. Un ouvrage édifié sur le terrain du client est l'illustration typique. L'acceptation par le client est un indicateur du § 38(e), propre aux obligations remplies à un moment précis.",
    articleRef: "IFRS 15.35(b), 38(e)",
  },
  {
    id: 'ue13c5-q21',
    question: "Selon une méthode fondée sur les coûts, comment traiter les coûts résultant d'un gaspillage important de matières non prévu dans le prix ?",
    options: [
      { id: 'a', texte: "Ils sont inclus dans la mesure de l'avancement" },
      { id: 'b', texte: "Ils sont exclus de la mesure de l'avancement et comptabilisés en charges" },
      { id: 'c', texte: "Ils sont portés en actif sur contrat" },
      { id: 'd', texte: "Ils sont refacturés au client" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.B19(a) : l'entité ne comptabilise pas de produits sur la base de coûts engagés du fait d'inefficiences importantes non reflétées dans le prix. Ces coûts sont des charges lorsqu'ils sont engagés (§ 98(b)). Le SYSCOHADA révisé retient la même exclusion (Titre VIII, ch. 23, § 3.3.2).",
    articleRef: "IFRS 15.B19(a), 98(b)",
  },
  {
    id: 'ue13c5-q22',
    question: "Au début d'un contrat, l'entité ne peut pas évaluer raisonnablement le résultat d'une obligation remplie progressivement, mais elle s'attend à recouvrer ses coûts. Que comptabilise-t-elle ?",
    options: [
      { id: 'a', texte: "Aucun produit" },
      { id: 'b', texte: "Des produits à hauteur des coûts engagés" },
      { id: 'c', texte: "Des produits selon la marge budgétée" },
      { id: 'd', texte: "L'intégralité du prix" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.45 : l'entité ne comptabilise des produits qu'à hauteur des coûts engagés, jusqu'à ce qu'elle puisse faire une évaluation raisonnable du résultat. Le SYSCOHADA révisé décrit le même mécanisme sous le nom de méthode à l'achèvement, qu'il qualifie de modalité particulière de la méthode à l'avancement (Titre VIII, ch. 23, § 4.1).",
    articleRef: "IFRS 15.44-45",
  },
  {
    id: 'ue13c5-q23',
    question: "Un fabricant livre des marchandises à un distributeur qui peut les lui retourner sans condition et ne doit les payer qu'après les avoir revendues. À la livraison :",
    options: [
      { id: 'a', texte: "le fabricant comptabilise le produit" },
      { id: 'b', texte: "le fabricant ne comptabilise pas de produit, l'accord étant un accord de consignation" },
      { id: 'c', texte: "le fabricant comptabilise le produit et une provision pour retours" },
      { id: 'd', texte: "le distributeur comptabilise les marchandises en stock" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.B77-B78 : absence d'obligation inconditionnelle de payer, faculté pour l'entité d'exiger le retour du produit, contrôle conservé jusqu'à la revente : ce sont des indicateurs d'un accord de consignation. Le produit est comptabilisé lors de la vente au client final. Le stock reste chez le fabricant.",
    articleRef: "IFRS 15.B77-B78",
  },
  {
    id: 'ue13c5-q24',
    question: "Une entité qui organise la fourniture de billets d'avion par une compagnie aérienne, sans jamais contrôler ces billets, comptabilise en produit :",
    options: [
      { id: 'a', texte: "le prix total du billet" },
      { id: 'b', texte: "sa commission" },
      { id: 'c', texte: "rien, faute de contrôle" },
      { id: 'd', texte: "le prix du billet diminué de la TVA" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.B36 : l'entité qui agit comme mandataire n'a pas le contrôle du bien ou service spécifié avant sa fourniture au client ; elle comptabilise en produit le montant des honoraires ou de la commission. L'entité agissant pour son propre compte comptabilise le montant brut (B35B). Les indicateurs du B37 (responsabilité première, risque sur stocks, latitude sur le prix) guident l'analyse.",
    articleRef: "IFRS 15.B34-B37",
  },
  {
    id: 'ue13c5-q25',
    question: "Une commission de 9 000 est versée à un commercial pour l'obtention d'un contrat de maintenance de trois ans, que l'entité s'attend à recouvrer. Comment la traiter ?",
    options: [
      { id: 'a', texte: "En charges de l'exercice" },
      { id: 'b', texte: "En actif, amorti sur la durée de fourniture des services, soit 3 000 par an" },
      { id: 'c', texte: "En réduction du prix de transaction" },
      { id: 'd', texte: "En stock" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.91-92 : les coûts marginaux d'obtention d'un contrat, comme une commission de vente, sont comptabilisés en actif si l'entité s'attend à les recouvrer ; l'actif est amorti de façon systématique au rythme de la fourniture des services (§ 99). La simplification du § 94 (charges immédiates) n'est ouverte que si la période d'amortissement n'excède pas un an.",
    articleRef: "IFRS 15.91-94, 99",
  },
  {
    id: 'ue13c5-q26',
    question: "Qu'est-ce qui distingue un actif sur contrat d'une créance ?",
    options: [
      { id: 'a', texte: "Rien, ce sont deux noms du même poste" },
      { id: 'b', texte: "La créance est un droit inconditionnel, qui ne dépend que de l'écoulement du temps ; l'actif sur contrat dépend d'autre chose, par exemple de la prestation future de l'entité" },
      { id: 'c', texte: "L'actif sur contrat est toujours à long terme" },
      { id: 'd', texte: "La créance n'est pas soumise à IFRS 9" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.107-108 et annexe A : l'actif sur contrat est un droit à contrepartie qui dépend d'autre chose que de l'écoulement du temps ; la créance est un droit inconditionnel. Les deux sont soumis au modèle de dépréciation d'IFRS 9 (§ 107-108).",
    articleRef: "IFRS 15.105-108 ; annexe A",
  },
  {
    id: 'ue13c5-q27',
    question: "Quand une subvention publique peut-elle être comptabilisée selon IAS 20 ?",
    options: [
      { id: 'a', texte: "Dès l'annonce officielle du programme d'aide" },
      { id: 'b', texte: "Lorsqu'il existe une assurance raisonnable que l'entité se conformera aux conditions et que la subvention sera reçue" },
      { id: 'c', texte: "Uniquement à l'encaissement" },
      { id: 'd', texte: "À l'inscription de la dépense au budget de l'État" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 20.7 : la subvention n'est pas comptabilisée tant qu'il n'existe pas une assurance raisonnable que (a) l'entité se conformera aux conditions et (b) la subvention sera reçue. L'obtention d'une subvention ne prouve pas à elle seule que les conditions ont été ou seront remplies (§ 8). Le mode de réception est sans influence sur le traitement (§ 9).",
    articleRef: "IAS 20.7-9",
  },
  {
    id: 'ue13c5-q28',
    question: "Lequel de ces avantages relève d'IAS 20 ?",
    options: [
      { id: 'a', texte: "Une exonération temporaire d'impôt sur le résultat" },
      { id: 'b', texte: "Une prise de participation de l'État au capital" },
      { id: 'c', texte: "L'avantage d'un prêt public à taux inférieur à celui du marché" },
      { id: 'd', texte: "La construction d'une route publique desservant la zone industrielle" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 20.10A traite l'avantage d'un prêt public à taux inférieur au marché comme une subvention, mesurée par la différence entre la valeur initiale du prêt selon IFRS 9 et le produit perçu. Les avantages fiscaux déterminés sur le bénéfice imposable (§ 2(b)) et la participation de l'État (§ 2(c)) sont exclus ; les infrastructures générales ne constituent pas une aide publique au sens de la norme (§ 3 et 38).",
    articleRef: "IAS 20.2, 3, 10A et 38",
  },
  {
    id: 'ue13c5-q29',
    question: "Une subvention de 20 000 finance une machine de 60 000 amortie sur 10 ans. Selon la méthode de déduction de l'actif, quelle est la charge annuelle d'amortissement ?",
    options: [
      { id: 'a', texte: "6 000" },
      { id: 'b', texte: "4 000" },
      { id: 'c', texte: "2 000" },
      { id: 'd', texte: "8 000" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 20.27 : la subvention est déduite de la valeur comptable de l'actif (60 000 − 20 000 = 40 000) et comptabilisée en résultat par réduction de la charge d'amortissement : 40 000 / 10 = 4 000. Selon la méthode des produits différés (§ 26), l'amortissement serait de 6 000 et le produit de subvention de 2 000 : l'effet net sur le résultat est identique.",
    articleRef: "IAS 20.24-27",
  },
  {
    id: 'ue13c5-q30',
    question: "Selon IAS 20, une subvention d'investissement peut-elle être inscrite directement en capitaux propres, comme le prévoit le compte 14 du SYSCOHADA révisé ?",
    options: [
      { id: 'a', texte: "Oui, c'est l'une des deux méthodes admises" },
      { id: 'b', texte: "Non : IAS 20 retient l'approche par le résultat ; la subvention est présentée en produits différés ou en déduction de l'actif" },
      { id: 'c', texte: "Oui, si la subvention n'est pas remboursable" },
      { id: 'd', texte: "Oui, pour les subventions d'organismes internationaux" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 20.12 exige la comptabilisation en résultat net sur une base systématique ; le § 15(a) écarte l'inscription directe en capitaux propres, les subventions provenant d'une autre source que les actionnaires. Les seules présentations admises sont les produits différés et la déduction de l'actif (§ 24). Le SYSCOHADA révisé classe au contraire le compte 14 parmi les « autres capitaux propres » : le passage aux IFRS impose un reclassement.",
    articleRef: "IAS 20.12, 15 et 24 ; SYSCOHADA, compte 14",
  },
  {
    id: 'ue13c5-q31',
    question: "Une subvention liée à un actif, présentée en produits différés, devient remboursable. Comment comptabiliser le remboursement ?",
    options: [
      { id: 'a', texte: "Par correction d'erreur rétrospective" },
      { id: 'b', texte: "En réduisant le solde du produit différé du montant remboursable, l'excédent éventuel allant en résultat" },
      { id: 'c', texte: "En capitaux propres" },
      { id: 'd', texte: "En augmentant le goodwill" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 20.32 : une subvention devenue remboursable est un changement d'estimation comptable. Pour une subvention liée à un actif, le remboursement est comptabilisé en augmentant la valeur comptable de l'actif ou en réduisant le produit différé ; le cumul de l'amortissement supplémentaire qui aurait été comptabilisé sans la subvention va immédiatement en résultat. Le § 33 impose en outre d'envisager une dépréciation de l'actif.",
    articleRef: "IAS 20.32-33",
  },
  {
    id: 'ue13c5-q32',
    question: "Selon le SYSCOHADA révisé, quel montant de subvention d'équipement est repris en résultat chaque année pour un bien amortissable ?",
    options: [
      { id: 'a', texte: "Le dixième de la subvention" },
      { id: 'b', texte: "La dotation aux amortissements du bien multipliée par le rapport entre la subvention et la valeur d'entrée" },
      { id: 'c', texte: "La totalité de la subvention l'année de l'octroi" },
      { id: 'd', texte: "Rien avant la cession du bien" },
    ],
    reponseCorrecte: 'b',
    explication: "Titre VIII, ch. 17, § 3.2 : la reprise annuelle, au crédit du compte 799, est égale à la dotation aux amortissements multipliée par le rapport entre la subvention et la valeur d'entrée de l'immobilisation. Le dixième ne s'applique qu'aux immobilisations non amortissables en l'absence de clause d'inaliénabilité.",
    articleRef: "SYSCOHADA, Titre VIII, ch. 17, § 3.2 ; compte 14",
  },
  {
    id: 'ue13c5-q33',
    question: "Un commissionnaire en douane facture 50 000 USD à son client, dont 42 000 de droits et taxes acquittés pour son compte et 8 000 d'honoraires. Quel produit comptabilise-t-il ?",
    options: [
      { id: 'a', texte: "50 000" },
      { id: 'b', texte: "8 000, les droits et taxes étant des débours pour lesquels il agit comme mandataire" },
      { id: 'c', texte: "42 000" },
      { id: 'd', texte: "Aucun, l'opération étant neutre" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.B34-B36 : le commissionnaire ne contrôle pas le service rendu par l'administration et n'a aucune latitude sur le montant des droits ; pour ces montants, il agit comme mandataire. Seuls ses honoraires, rémunération de sa propre prestation, constituent un produit.",
    articleRef: "IFRS 15.B34-B37",
  },
  {
    id: 'ue13c5-q34',
    question: "Dans quel cas une remise accordée sur un contrat groupé est-elle affectée à certaines obligations de prestation seulement ?",
    options: [
      { id: 'a', texte: "Toujours, au choix de l'entité" },
      { id: 'b', texte: "Lorsque l'entité vend couramment chaque élément séparément, vend aussi couramment un groupe de certains éléments avec une remise essentiellement identique, ce qui indique à quelles obligations la remise se rapporte" },
      { id: 'c', texte: "Jamais : la remise est toujours répartie proportionnellement" },
      { id: 'd', texte: "Lorsque le client le demande" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.82 : les trois conditions sont cumulatives. À défaut, la remise est répartie proportionnellement entre toutes les obligations (§ 81). L'affectation ciblée précède, le cas échéant, l'utilisation de la méthode résiduelle (§ 83).",
    articleRef: "IFRS 15.81-83",
  },
  {
    id: 'ue13c5-q35',
    question: "À la clôture, une entreprise a exécuté 60 % d'un contrat de 1 000 et reçu une avance de 300 ; le solde n'est facturable qu'après la réception de l'ouvrage. Comment présente-t-elle le contrat ?",
    options: [
      { id: 'a', texte: "Créance de 300" },
      { id: 'b', texte: "Actif sur contrat de 300, droit conditionné par la réception" },
      { id: 'c', texte: "Passif sur contrat de 300" },
      { id: 'd', texte: "Créance de 700" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 15.105-108 : produit comptabilisé 600, paiements reçus 300 ; la différence est un actif sur contrat, car le droit à la contrepartie dépend d'autre chose que l'écoulement du temps, la réception. Il deviendra une créance lors de la facturation du solde.",
    articleRef: "IFRS 15.105-108",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '5.1',
    titre: "Objectif, champ d'application et architecture d'IFRS 15",
    navLabel: 'IFRS 15 : principe',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le chiffre d'affaires est l'indicateur le plus suivi par les utilisateurs des états financiers et l'un des plus exposés aux erreurs et aux manipulations : anticipation de ventes, reconnaissance intégrale d'un contrat pluriannuel, confusion entre montant facturé et montant acquis. IFRS 15, applicable aux exercices ouverts à compter du 1er janvier 2018 (C1), a remplacé un ensemble de textes hétérogènes : IAS 11 pour les contrats de construction, IAS 18 pour les autres produits, ainsi que quatre interprétations (C10). À une juxtaposition de règles par type de transaction, elle substitue un modèle unique fondé sur le transfert du contrôle.",
      },
      { type: 'intertitre', texte: "5.1.1 Objectif et principe fondamental" },
      {
        type: 'filet',
        titre: "Texte de référence — IFRS 15, § 1 et 2",
        texte: "La norme établit les principes permettant de présenter des informations utiles « concernant la nature, le montant, le calendrier et le degré d'incertitude des produits des activités ordinaires et des flux de trésorerie provenant d'un contrat conclu avec un client » (§ 1). Elle pose comme principe fondamental « que l'entité doit comptabiliser les produits des activités ordinaires de manière à montrer quand les biens ou les services promis aux clients sont fournis, et à quel montant de contrepartie l'entité s'attend à avoir droit en échange de ces biens ou services » (§ 2).",
      },
      {
        type: 'paragraphe',
        texte: "Le principe comporte deux volets, qui répondent à deux questions distinctes. Le premier concerne le moment de la comptabilisation : le produit naît de l'exécution de la prestation promise, et non de la facturation ou de l'encaissement. Le second concerne le montant : l'entité comptabilise ce à quoi elle s'attend à avoir droit, et non nécessairement le prix stipulé. Les produits des activités ordinaires sont par ailleurs une sous-catégorie des produits, définis comme des accroissements d'avantages économiques qui augmentent les capitaux propres autrement que par des apports (annexe A) ; ils se limitent aux produits générés dans le cours des activités ordinaires.",
      },
      { type: 'intertitre', texte: "5.1.2 Champ d'application" },
      {
        type: 'paragraphe',
        texte: "IFRS 15 s'applique à tous les contrats conclus avec des clients (§ 5). Un client est une partie ayant conclu un contrat avec l'entité en vue d'obtenir, en échange d'une contrepartie, des biens ou des services qui sont un extrant de ses activités ordinaires (§ 6). Le partenaire d'un accord de collaboration dont les risques et les avantages sont partagés n'est donc pas un client. Lorsqu'un contrat relève partiellement d'une autre norme, les dispositions de séparation et d'évaluation de cette autre norme s'appliquent en premier (§ 7).",
      },
      {
        type: 'carte',
        titre: "Tableau 5.1 — Contrats exclus du champ d'IFRS 15 (§ 5)",
        tableau: {
          entetes: ['Contrat exclu', 'Norme applicable'],
          lignes: [
            ['Contrats de location', 'IFRS 16'],
            ["Contrats d'assurance (sauf option pour certains contrats de services à prix forfaitaire)", 'IFRS 17'],
            ["Instruments financiers et autres droits ou obligations contractuels", 'IFRS 9, IFRS 10, IFRS 11, IAS 27 et IAS 28'],
            ["Échanges non monétaires entre entités de la même branche destinés à faciliter les ventes à des clients", 'Aucune comptabilisation de produit (exemple des sociétés pétrolières qui échangent du pétrole)'],
          ],
        },
      },
      { type: 'intertitre', texte: "5.1.3 Le modèle en cinq étapes" },
      {
        type: 'paragraphe',
        texte: "La norme organise l'analyse d'un contrat selon une séquence de cinq étapes. Les quatre premières ne donnent lieu à aucune écriture : elles relèvent d'une analyse juridique et économique qui prépare la comptabilisation. Seule la cinquième, la satisfaction des obligations de prestation, déclenche la comptabilisation du produit. Les sections 5.2 à 5.6 examinent successivement chacune de ces étapes.",
      },
      {
        type: 'carte',
        titre: "Tableau 5.2 — Les cinq étapes de la comptabilisation des produits",
        tableau: {
          entetes: ['Étape', 'Question', 'Paragraphes'],
          lignes: [
            ['1. Identification du contrat', "Existe-t-il un accord créant des droits et obligations exécutoires ?", '§ 9-21'],
            ['2. Identification des obligations de prestation', "Quels biens ou services distincts l'entité a-t-elle promis ?", '§ 22-30'],
            ['3. Détermination du prix de transaction', "À quel montant l'entité s'attend-elle à avoir droit ?", '§ 47-72'],
            ['4. Répartition du prix', "Quelle part du prix revient à chaque obligation de prestation ?", '§ 73-90'],
            ['5. Comptabilisation du produit', "Quand et à quel rythme le contrôle est-il transféré ?", '§ 31-45'],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Observation — Terminologie",
        texte: "La traduction française officielle d'IFRS 15 emploie l'expression « obligation de prestation », définie comme la promesse de fournir au client un bien ou un service distinct, ou une série de biens ou services distincts essentiellement les mêmes et fournis au même rythme (annexe A). L'expression « obligation de performance », fréquente dans la pratique et dans certains supports de formation, est un calque de l'anglais *performance obligation* ; elle désigne la même notion mais ne figure pas dans le texte officiel, qui sera suivi dans ce chapitre.",
      },
    ],
  },
  {
    numero: '5.2',
    titre: "Première étape : l'identification du contrat",
    navLabel: 'Étape 1 : contrat',
    blocs: [
      { type: 'intertitre', texte: "5.2.1 Les critères d'existence du contrat" },
      {
        type: 'paragraphe',
        texte: "Un contrat est « un accord entre deux parties ou plus, qui crée des droits et des obligations exécutoires » (§ 10). Son caractère exécutoire est affaire de droit : un contrat peut être écrit, verbal ou découler implicitement des pratiques commerciales habituelles de l'entité. Dans une économie où de nombreuses transactions reposent sur des bons de commande sommaires ou sur des accords verbaux, ce point a une portée pratique : l'absence de contrat écrit n'empêche pas l'application de la norme, mais impose de documenter les droits et obligations effectivement exécutoires.",
      },
      {
        type: 'carte',
        titre: "Tableau 5.3 — Critères cumulatifs d'identification d'un contrat (IFRS 15, § 9)",
        tableau: {
          entetes: ['Critère', 'Contenu'],
          lignes: [
            ['(a) Approbation', "Les parties ont approuvé le contrat, par écrit, verbalement ou selon d'autres pratiques commerciales habituelles, et se sont engagées à remplir leurs obligations"],
            ['(b) Droits identifiables', "L'entité peut identifier les droits de chaque partie sur les biens ou services à fournir"],
            ['(c) Conditions de paiement', "L'entité peut identifier les conditions de paiement"],
            ['(d) Substance commerciale', "Le contrat est de nature à modifier le calendrier, le montant ou le risque des flux de trésorerie futurs de l'entité"],
            ['(e) Recouvrabilité probable', "Il est probable que l'entité recouvre la contrepartie, compte tenu de la seule capacité et de la seule intention du client de payer"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Il n'existe pas de contrat si chacune des parties a unilatéralement le droit exécutoire de mettre fin à un contrat totalement inexécuté sans indemniser l'autre (§ 12). Une fois les critères remplis à la passation, l'entité ne les réexamine qu'en cas de changement important des faits et circonstances, par exemple une détérioration importante de la capacité de paiement du client (§ 13).",
      },
      { type: 'intertitre', texte: "5.2.2 Contrepartie reçue en l'absence de contrat" },
      {
        type: 'paragraphe',
        texte: "Lorsque les critères du § 9 ne sont pas remplis, notamment lorsque le recouvrement n'est pas probable, la contrepartie reçue du client est comptabilisée comme un passif (§ 16). Elle ne devient un produit que si l'entité n'a plus d'obligation de fournir des biens ou des services et a reçu la totalité ou la quasi-totalité d'une contrepartie non remboursable, ou si le contrat a été résilié et la contrepartie reçue n'est pas remboursable (§ 15). La règle interdit ainsi de comptabiliser un chiffre d'affaires sur un client dont la solvabilité est compromise dès l'origine, même si des acomptes ont été encaissés.",
      },
      {
        type: 'carte',
        titre: "Exemple 5.1 — Livraison à un client dont la capacité de paiement est douteuse",
        texte: "En N, une cimenterie livre 100 000 USD de ciment à une entreprise de construction dont les chantiers sont arrêtés et qui a déjà accumulé des impayés auprès de plusieurs fournisseurs. Elle reçoit 30 000 USD à la livraison ; le solde est payable à 90 jours, et la direction juge improbable son recouvrement. Le ciment ne peut être repris.",
        tableau: {
          entetes: ['Analyse', 'Conséquence', 'Fondement'],
          lignes: [
            ['Le recouvrement de la contrepartie n\'est pas probable', "Le contrat ne remplit pas la condition du § 9(e) ; aucun produit n'est comptabilisé sur le fondement du contrat", '§ 9(e)'],
            ['30 000 reçus, alors que la totalité de la contrepartie n\'a pas été reçue', 'Passif de 30 000', '§ 15-16'],
            ['Résiliation ultérieure du contrat, montant reçu non remboursable', 'Le passif de 30 000 devient un produit', '§ 15(b)'],
            ['Amélioration de la situation du client, recouvrement devenu probable', "Réexamen des critères ; comptabilisation du contrat selon le modèle général", '§ 14'],
          ],
        },
        note: "L'appréciation porte sur la capacité et l'intention du client de payer lorsque le montant devient exigible (§ 9(e)). Elle se distingue de la dépréciation d'une créance selon IFRS 9 : lorsque le recouvrement est probable à l'origine, le produit est comptabilisé et une correction de valeur pour pertes attendues est constatée sur la créance ; lorsqu'il ne l'est pas, aucun produit n'est comptabilisé.",
      },
      { type: 'intertitre', texte: "5.2.3 Regroupement et modification des contrats" },
      {
        type: 'paragraphe',
        texte: "Des contrats conclus en même temps ou presque avec le même client sont regroupés lorsqu'ils sont négociés en bloc avec un objectif commercial unique, lorsque le prix de l'un dépend du prix ou de l'exécution de l'autre, ou lorsque les biens ou services promis constituent une seule obligation de prestation (§ 17). Une modification de contrat, qui touche son étendue ou son prix, est comptabilisée selon l'une des trois modalités suivantes.",
      },
      {
        type: 'carte',
        titre: "Tableau 5.4 — Traitement des modifications de contrat (IFRS 15, § 20 et 21)",
        tableau: {
          entetes: ['Situation', 'Traitement', 'Effet'],
          lignes: [
            ["Ajout de biens ou services distincts à un prix reflétant leur prix de vente spécifique", 'Contrat distinct (§ 20)', 'Contrat initial inchangé'],
            ["Biens ou services restants distincts de ceux déjà fournis", "Résiliation du contrat existant et création d'un nouveau contrat (§ 21(a))", 'Prospectif'],
            ["Biens ou services restants non distincts, formant une obligation partiellement remplie", "Modification intégrée au contrat existant (§ 21(b))", 'Ajustement cumulatif des produits à la date de modification'],
          ],
        },
      },
      {
        type: 'carte',
        titre: "Exemple 5.2 — Modification d'un contrat de fourniture de ciment",
        texte: "Une cimenterie s'engage à livrer 1 000 tonnes de ciment à 100 USD la tonne ; le contrôle est transféré à chaque livraison. Après la livraison de 600 tonnes, le client commande 400 tonnes supplémentaires.",
        tableau: {
          entetes: ['', 'Hypothèse A : prix de 95 USD', 'Hypothèse B : prix de 80 USD'],
          lignes: [
            ['Analyse', "Le prix reflète le prix de vente spécifique, diminué des frais commerciaux évités", "Le prix consenti ne reflète pas le prix de vente spécifique"],
            ['Qualification', 'Contrat distinct (§ 20)', 'Résiliation et nouveau contrat (§ 21(a)), les tonnes restantes étant distinctes'],
            ['Prix des 400 tonnes restantes du contrat initial', '100', '(400 × 100 + 400 × 80) / 800 = **90**'],
            ['Prix des 400 tonnes additionnelles', '95', '**90**'],
            ['Produits sur les 800 tonnes restantes', '40 000 + 38 000 = 78 000', '800 × 90 = 72 000'],
          ],
        },
        note: "Dans les deux hypothèses, les 600 tonnes déjà livrées restent comptabilisées à 100 USD : aucun ajustement rétroactif n'intervient. Dans l'hypothèse B, la remise consentie est répartie sur l'ensemble des tonnes restant à livrer, qu'elles relèvent du contrat initial ou de la commande additionnelle.",
      },
    ],
  },
  {
    numero: '5.3',
    titre: "Deuxième étape : l'identification des obligations de prestation",
    navLabel: 'Étape 2 : obligations',
    blocs: [
      { type: 'intertitre', texte: "5.3.1 Promesses explicites et implicites" },
      {
        type: 'paragraphe',
        texte: "À la passation du contrat, l'entité recense les biens et services promis et identifie comme obligation de prestation chaque promesse de fournir un bien ou service distinct, ou une série de biens ou services distincts essentiellement les mêmes et fournis au même rythme (§ 22). Les promesses ne se limitent pas à celles que le contrat énonce : les pratiques commerciales habituelles, la politique affichée ou les déclarations de l'entité peuvent créer chez le client une attente fondée (§ 24). À l'inverse, les activités que l'entité doit mener pour exécuter le contrat sans rien fournir au client, telles que les tâches administratives de mise en place, ne constituent pas des obligations de prestation (§ 25).",
      },
      { type: 'intertitre', texte: "5.3.2 Le caractère distinct" },
      {
        type: 'filet',
        titre: "Texte de référence — IFRS 15, § 27",
        texte: "« Un bien ou un service promis à un client est distinct dès lors que les deux conditions ci-dessous sont remplies : (a) le client peut tirer parti du bien ou du service pris isolément ou en le combinant avec d'autres ressources aisément disponibles (c'est-à-dire que le bien ou le service peut exister de façon distincte) ; (b) la promesse de l'entité de fournir le bien ou le service au client peut être identifiée séparément des autres promesses contenues dans le contrat (c'est-à-dire que la promesse de fournir le bien ou service est distincte à l'intérieur du contrat). »",
      },
      {
        type: 'paragraphe',
        texte: "La première condition s'apprécie au regard du bien ou du service lui-même : le fait que l'entité le vende régulièrement séparément en est un indice (§ 28). La seconde s'apprécie dans le contexte du contrat : il s'agit de déterminer si l'entité promet chaque élément individuellement ou un ensemble dont ces éléments sont les intrants. Le § 29 énumère trois indices de non-séparabilité : un important travail d'intégration des biens ou services pour produire l'extrant prévu, une modification ou personnalisation considérable d'un élément par un autre, et une forte dépendance réciproque entre les éléments. Un bien ou service non distinct est regroupé avec d'autres jusqu'à former un ensemble distinct (§ 30).",
      },
      {
        type: 'carte',
        titre: "Exemple 5.3 — Vente d'un groupe électrogène avec installation et maintenance (FORALEC SARL, société fictive)",
        texte: "FORALEC vend à une minoterie un groupe électrogène, son installation et deux ans de maintenance, pour un prix global.",
        tableau: {
          entetes: ['', 'Hypothèse A : installation standard', 'Hypothèse B : centrale intégrée sur mesure'],
          lignes: [
            ["Nature de l'installation", "Raccordement courant, réalisable par d'autres électriciens", "Conception et intégration du groupe dans une centrale hybride adaptée au réseau de l'usine"],
            ['Analyse du § 27(b)', 'Promesses identifiables séparément', "Important travail d'intégration (§ 29(a)) : le client achète une centrale, non un groupe et un service de pose"],
            ['Obligations de prestation', '**Trois** : groupe, installation, maintenance', '**Deux** : centrale installée, maintenance'],
            ['Comptabilisation', "Groupe à la livraison ; installation à son achèvement ; maintenance sur deux ans", "Centrale selon le transfert du contrôle (souvent progressivement, § 35(b)) ; maintenance sur deux ans"],
          ],
        },
        note: "Le contrat et la facture peuvent être rédigés de manière identique dans les deux hypothèses. La différence tient à la nature de la promesse, qui s'apprécie d'après la substance de la prestation.",
      },
      { type: 'intertitre', texte: "5.3.3 Situations particulières" },
      {
        type: 'carte',
        titre: "Tableau 5.5 — Promesses soumises à des règles particulières (annexe B)",
        tableau: {
          entetes: ['Promesse', 'Règle', 'Référence'],
          lignes: [
            ["Garantie que le client peut acheter séparément", 'Obligation de prestation distincte, à laquelle une part du prix est affectée', 'B29'],
            ["Garantie d'assurance de conformité, non vendue séparément", 'Provision selon IAS 37, sauf service supplémentaire', 'B30-B32'],
            ["Option d'achat conférant un droit significatif", "Obligation de prestation : le client paie d'avance des biens ou services futurs", 'B40, B42'],
            ["Option d'achat au prix de vente spécifique", "Offre promotionnelle, comptabilisée lors de l'exercice", 'B41'],
            ['Frais initiaux non remboursables', "En général, paiement anticipé de biens ou services futurs, comptabilisé lors de leur fourniture", 'B48-B51'],
            ["Licence conférant un droit d'accès à une propriété intellectuelle qui évolue", 'Obligation remplie progressivement', 'B58, B60'],
            ["Licence conférant un droit d'utilisation de la propriété intellectuelle telle qu'elle existe", "Obligation remplie à un moment précis, au plus tôt au début de la période d'utilisation", 'B61'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Le traitement des garanties illustre la logique de la norme. Une garantie qui assure seulement que le produit est conforme aux spécifications convenues ne rend aucun service supplémentaire : elle constitue un coût probable de la vente et relève d'IAS 37. Une garantie prolongée ou vendue séparément fournit en revanche un service de protection : elle absorbe une part du prix, qui n'est comptabilisée en produit qu'au fur et à mesure de la période couverte. Le caractère légal de la garantie, sa durée et la nature des tâches promises sont les facteurs d'appréciation (B31).",
      },
    ],
  },
  {
    numero: '5.4',
    titre: "Troisième étape : la détermination du prix de transaction",
    navLabel: 'Étape 3 : prix',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le prix de transaction est « le montant de contrepartie auquel l'entité s'attend à avoir droit en échange de la fourniture de biens ou de services promis à un client, à l'exclusion des sommes perçues pour le compte de tiers (par exemple les taxes de vente) » (§ 47). La TVA facturée en est donc exclue. Pour le déterminer, l'entité tient compte de la contrepartie variable et de sa limitation, d'une éventuelle composante financement importante, de la contrepartie autre qu'en trésorerie et de la contrepartie payable au client (§ 48), en supposant que le contrat sera exécuté comme prévu, sans résiliation, renouvellement ni modification (§ 49).",
      },
      { type: 'intertitre', texte: "5.4.1 La contrepartie variable et sa limitation" },
      {
        type: 'paragraphe',
        texte: "La contrepartie est variable lorsqu'elle dépend de rabais, remises, remboursements, avoirs, concessions sur le prix, primes de performance, pénalités ou de la réalisation d'un événement futur (§ 51). Elle l'est aussi lorsque les pratiques de l'entité conduisent le client à s'attendre à une concession sur le prix (§ 52). L'entité l'estime selon la méthode qui prédit le plus exactement le montant auquel elle aura droit : l'espérance mathématique, adaptée à un grand nombre de contrats similaires, ou le montant le plus probable, adapté aux contrats n'ayant que deux issues possibles (§ 53).",
      },
      {
        type: 'filet',
        titre: "Texte de référence — IFRS 15, § 56",
        texte: "« L'entité doit inclure dans le prix de transaction tout ou partie du montant de contrepartie variable estimé conformément au paragraphe 53 dans la seule mesure où il est hautement probable que le dénouement ultérieur de l'incertitude relative à la contrepartie variable ne donnera pas lieu à un ajustement à la baisse important du montant cumulatif des produits des activités ordinaires comptabilisé. »",
      },
      {
        type: 'paragraphe',
        texte: "La limitation est une application directe de la prudence au chiffre d'affaires : l'estimation n'est pas retenue pour son montant le plus probable, mais pour le montant qui ne sera vraisemblablement pas contredit. Le § 57 énumère les facteurs qui accroissent le risque d'un ajustement à la baisse : forte sensibilité à des facteurs externes (volatilité d'un marché, conditions climatiques, décisions de tiers), dénouement lointain, expérience limitée, pratique de concessions étendues, large éventail d'issues possibles. L'estimation est mise à jour à chaque clôture (§ 59).",
      },
      {
        type: 'carte',
        titre: "Exemple 5.4 — Prime de performance dans un contrat de construction",
        texte: "Une entreprise construit un entrepôt pour un prix fixe de 2 000 000 USD, assorti d'une prime de 200 000 si l'ouvrage est livré avant le 30 juin N+1. Deux issues sont possibles ; à la passation, l'entreprise estime à 70 % la probabilité d'obtenir la prime, mais le respect du délai dépend de la saison des pluies et de l'acheminement de matériaux importés.",
        tableau: {
          entetes: ['Étape', 'Analyse', 'Montant retenu'],
          lignes: [
            ["Méthode d'estimation (§ 53)", 'Deux issues : montant le plus probable', '200 000'],
            ['Limitation (§ 56-57)', "Facteurs externes (climat, logistique) : il n'est pas hautement probable que la prime soit obtenue", '0'],
            ['Prix de transaction à la passation', '', '**2 000 000**'],
            ["Réestimation (§ 59), lorsque l'achèvement dans le délai devient hautement probable", "La prime est intégrée au prix ; l'ajustement cumulatif est comptabilisé selon l'avancement (§ 88)", '**2 200 000**'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "La vente avec droit de retour constitue un cas particulier de contrepartie variable. L'entité comptabilise un produit pour le montant auquel elle s'attend à avoir droit, un passif au titre des remboursements futurs et un actif représentant son droit de récupérer les produits retournés, évalué d'après la valeur comptable antérieure de ces produits, diminuée des coûts de récupération (B21, B25). L'actif et le passif sont présentés séparément.",
      },
      {
        type: 'carte',
        titre: "Exemple 5.5 — Vente avec droit de retour",
        texte: "Un distributeur vend 1 000 ventilateurs à 50 USD l'unité (coût 30 USD), payables à 30 jours, avec droit de retour pendant 60 jours. L'historique permet d'estimer à 50 unités les retours et de considérer comme hautement probable qu'ils n'excéderont pas ce nombre ; les coûts de récupération sont négligeables.",
        tableau: {
          entetes: ['Compte', 'Débit', 'Crédit'],
          lignes: [
            ['Clients', '50 000', ''],
            ["Produits des activités ordinaires (950 × 50)", '', '47 500'],
            ['Passif au titre des remboursements futurs (50 × 50)', '', '2 500'],
            ['Coût des ventes (950 × 30)', '28 500', ''],
            ['Actif au titre du droit de récupérer les produits (50 × 30)', '1 500', ''],
            ['Stocks (1 000 × 30)', '', '30 000'],
          ],
        },
        note: "La marge comptabilisée (47 500 − 28 500 = 19 000) porte sur les seules ventes que l'entité s'attend à conserver. Le passif et l'actif sont réestimés à chaque clôture ; l'ajustement du passif est porté en produits des activités ordinaires (B24).",
      },
      { type: 'intertitre', texte: "5.4.2 La composante financement" },
      {
        type: 'paragraphe',
        texte: "Lorsque le calendrier des paiements procure au client ou à l'entité un avantage important de financement, le prix est ajusté de la valeur temps de l'argent, afin que le produit reflète le prix de vente au comptant (§ 60-61). L'entité utilise le taux qui serait retenu dans une transaction de financement distincte avec le client, sans le mettre à jour ultérieurement (§ 64), et présente l'effet du financement séparément des produits des activités ordinaires (§ 65). Aucun ajustement n'est requis si l'intervalle entre la fourniture et le paiement n'excède pas un an (§ 63), ni dans les situations du § 62 : paiement d'avance avec livraison à la discrétion du client, contrepartie dépendant d'un événement futur échappant aux parties, écart justifié par une autre raison que le financement, telle qu'une retenue de garantie.",
      },
      {
        type: 'carte',
        titre: "Exemple 5.6 — Vente assortie d'un paiement différé de deux ans",
        texte: "Le 1er janvier N, une entreprise livre un équipement de broyage. Le client paiera 121 000 USD le 31 décembre N+1 ; le prix de vente au comptant est de 100 000 USD, ce qui fait ressortir un taux implicite de 10 %.",
        tableau: {
          entetes: ['Date', 'Écriture', 'Montant'],
          lignes: [
            ['1er janvier N', 'Débit Clients / Crédit Produits des activités ordinaires', '100 000'],
            ['31 décembre N', 'Débit Clients / Crédit Produits d\'intérêts (100 000 × 10 %)', '10 000'],
            ['31 décembre N+1', 'Débit Clients / Crédit Produits d\'intérêts (110 000 × 10 %)', '11 000'],
            ['31 décembre N+1', 'Débit Trésorerie / Crédit Clients', '121 000'],
          ],
        },
        note: "Comptabiliser 121 000 de chiffre d'affaires à la livraison surévaluerait l'activité commerciale de 21 000 et présenterait comme une marge ce qui rémunère un crédit. Symétriquement, un paiement reçu longtemps avant la livraison fait naître une charge d'intérêts, qui augmente le produit comptabilisé à la livraison.",
      },
      { type: 'intertitre', texte: "5.4.3 Contrepartie autre qu'en trésorerie et contrepartie payable au client" },
      {
        type: 'paragraphe',
        texte: "Une contrepartie reçue sous une autre forme que la trésorerie (matériel, matières, titres) est évaluée à sa juste valeur ; à défaut d'estimation raisonnable, elle l'est par référence au prix de vente spécifique des biens ou services fournis (§ 66-67). À l'inverse, les sommes que l'entité verse à son client, telles que participations aux frais de référencement, bons de réduction ou remises différées, réduisent le prix de transaction, sauf si elles rémunèrent un bien ou service distinct fourni par le client ; dans ce cas, seul l'excédent sur la juste valeur de ce bien ou service réduit le prix (§ 70-71). Dans la distribution, ces versements sont fréquents : leur classement en charges commerciales plutôt qu'en réduction du chiffre d'affaires majorerait artificiellement ce dernier.",
      },
    ],
  },
  {
    numero: '5.5',
    titre: "Quatrième étape : la répartition du prix de transaction",
    navLabel: 'Étape 4 : répartition',
    blocs: [
      {
        type: 'paragraphe',
        texte: "La répartition a pour objectif d'affecter à chaque obligation de prestation le montant de contrepartie auquel l'entité s'attend à avoir droit en échange du bien ou service correspondant (§ 73). Elle s'effectue en proportion des prix de vente spécifiques, déterminés à la passation du contrat (§ 74 et 76). Le prix de vente spécifique est le prix auquel l'entité vendrait séparément le bien ou le service ; sa meilleure indication est le prix observable dans des ventes séparées. « Le prix contractuel ou le prix de catalogue d'un bien ou d'un service peut être son prix de vente spécifique (mais on ne doit pas présumer qu'il l'est) » (§ 77).",
      },
      { type: 'intertitre', texte: "5.5.1 L'estimation des prix de vente spécifiques" },
      {
        type: 'carte',
        titre: "Tableau 5.6 — Méthodes d'estimation du prix de vente spécifique (IFRS 15, § 79)",
        tableau: {
          entetes: ['Méthode', 'Principe', "Conditions d'emploi"],
          lignes: [
            ["Évaluation du marché avec ajustement", "Prix qu'un client du marché serait disposé à payer, par référence éventuelle aux prix des concurrents ajustés des coûts et marges de l'entité", 'Méthode générale'],
            ['Coût attendu plus marge', "Coût prévu de l'obligation, majoré d'une marge appropriée", 'Méthode générale'],
            ['Méthode résiduelle', "Prix total diminué des prix de vente spécifiques observables des autres éléments", "Seulement si le prix de vente est très variable ou incertain (§ 79(c))"],
          ],
        },
      },
      { type: 'intertitre', texte: "5.5.2 Répartition d'une remise et d'une contrepartie variable" },
      {
        type: 'paragraphe',
        texte: "Lorsque la somme des prix de vente spécifiques excède le prix du contrat, le client bénéficie d'une remise, répartie proportionnellement entre toutes les obligations de prestation (§ 81). Elle n'est affectée à certaines d'entre elles que si l'entité vend couramment ces éléments séparément et en groupe avec une remise équivalente, ce qui fournit des éléments observables sur l'origine de la remise (§ 82). De même, une contrepartie variable est affectée en totalité à une obligation particulière lorsque ses modalités visent spécifiquement les efforts consacrés à cette obligation (§ 85). Les modifications ultérieures du prix sont réparties selon la même base qu'à la passation, sans tenir compte de l'évolution des prix de vente spécifiques (§ 88).",
      },
      {
        type: 'carte',
        titre: "Exemple 5.7 — Remise affectée à certaines obligations, puis méthode résiduelle",
        texte: "Un intégrateur vend séparément, de façon courante, un logiciel de gestion (prix de vente spécifique 400), un module de paie (300) et un module de stocks (300) ; il vend aussi couramment les deux modules ensemble pour 480, soit une remise de 120. Un client achète le logiciel et les deux modules pour 880.",
        tableau: {
          entetes: ['Élément', 'Répartition proportionnelle (§ 81)', 'Remise affectée aux modules (§ 82)'],
          lignes: [
            ['Logiciel', '880 × 400 / 1 000 = 352', '400'],
            ['Module de paie', '880 × 300 / 1 000 = 264', '480 × 300 / 600 = 240'],
            ['Module de stocks', '880 × 300 / 1 000 = 264', '240'],
            ['**Total**', '**880**', '**880**'],
          ],
        },
        note: "Les trois conditions du § 82 sont réunies : chaque élément est vendu séparément de façon courante, le groupe des deux modules est vendu couramment avec une remise, et cette remise est la même que celle du contrat. La remise est donc affectée aux modules. Si le contrat comprenait en outre une prestation de paramétrage dont le prix varie fortement d'un client à l'autre, pour un prix global de 1 180, son prix de vente spécifique pourrait être estimé par la méthode résiduelle, après affectation de la remise (§ 79(c) et 83) : 1 180 − 880 = 300.",
      },
      {
        type: 'carte',
        titre: "Exemple 5.8 — Contrat portant sur un logiciel et sa maintenance",
        texte: "Illustration du support d'origine, approfondie. Une entreprise vend une licence d'utilisation d'un logiciel et un contrat de maintenance de deux ans, pour un prix global de 12 000, payé d'avance. La licence confère un droit d'utilisation du logiciel tel qu'il existe à la date de sa mise à disposition (B61) ; la maintenance est un service fourni de manière uniforme sur 24 mois.",
        tableau: {
          entetes: ['', 'Cas 1 : prix spécifiques égaux aux prix du contrat', 'Cas 2 : remise sur les prix spécifiques'],
          lignes: [
            ['Prix de vente spécifiques', 'Logiciel 8 000 ; maintenance 4 000 ; total 12 000', 'Logiciel 9 000 ; maintenance 5 000 ; total 14 000'],
            ['Remise', 'Aucune', '2 000, répartie proportionnellement (§ 81)'],
            ['Prix affecté au logiciel', '8 000', '12 000 × 9/14 = **7 714**'],
            ['Prix affecté à la maintenance', '4 000', '12 000 × 5/14 = **4 286**'],
            ['Produit à la mise à disposition du logiciel', '8 000', '7 714'],
            ['Produit mensuel de maintenance', '4 000 / 24 = **166,67**', '4 286 / 24 = **178,57**'],
          ],
        },
        note: "Écritures du cas 1. À l'encaissement : débit Trésorerie 12 000, crédit Passif sur contrat 12 000 (§ 106). À la mise à disposition du logiciel : débit Passif sur contrat 8 000, crédit Produits des activités ordinaires 8 000. Chaque mois : débit Passif sur contrat 166,67, crédit Produits des activités ordinaires 166,67. Le support d'origine enregistre la vente du logiciel par le compte Clients, soldé ensuite par l'encaissement : le résultat est identique. Le paiement d'avance d'une maintenance de deux ans peut comporter une composante financement : l'entité en apprécie le caractère important au regard des critères du § 61, l'exemple la supposant non importante.",
      },
    ],
  },
  {
    numero: '5.6',
    titre: "Cinquième étape : la comptabilisation du produit",
    navLabel: 'Étape 5 : transfert',
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'entité comptabilise le produit lorsqu'elle a rempli, ou à mesure qu'elle remplit, une obligation de prestation en transférant au client le bien ou service promis. « Un actif est transféré lorsque le client en a obtenu (ou à mesure qu'il en obtient) le contrôle » (§ 31). Le contrôle s'entend de « la capacité de décider de l'utilisation de celui-ci et d'en tirer la quasi-totalité des avantages restants », y compris la capacité d'en empêcher l'utilisation par d'autres (§ 33). Le transfert des risques et avantages importants inhérents à la propriété n'est plus qu'un indicateur parmi d'autres de ce transfert du contrôle (§ 38(d)).",
      },
      { type: 'intertitre', texte: "5.6.1 Obligations remplies progressivement" },
      {
        type: 'paragraphe',
        texte: "Pour chaque obligation, l'entité détermine à la passation si elle la remplit progressivement ou à un moment précis (§ 32). L'obligation est remplie progressivement si l'un des trois critères du § 35 est satisfait ; à défaut, elle est remplie à un moment précis (§ 38). Le troisième critère, le plus technique, suppose que l'actif créé ne puisse être utilisé autrement par l'entité, en raison de limitations contractuelles ou pratiques (§ 36), et que l'entité dispose à tout moment d'un droit exécutoire à un paiement couvrant au moins la prestation effectuée si le client résilie le contrat (§ 37).",
      },
      {
        type: 'carte',
        titre: "Tableau 5.7 — Critères de satisfaction progressive d'une obligation (IFRS 15, § 35)",
        tableau: {
          entetes: ['Critère', 'Illustration'],
          lignes: [
            ["(a) Le client reçoit et consomme simultanément les avantages de la prestation au fur et à mesure", "Gardiennage, nettoyage, transport régulier de marchandises, maintenance"],
            ["(b) La prestation crée ou valorise un actif dont le client obtient le contrôle au fur et à mesure", "Construction d'un bâtiment sur le terrain du client"],
            ["(c) L'actif créé n'a pas d'autre utilisation pour l'entité et celle-ci a un droit exécutoire à paiement pour la prestation effectuée", "Fabrication d'un équipement spécifique au site du client, avec indemnité de résiliation couvrant les coûts engagés et une marge"],
          ],
        },
      },
      { type: 'intertitre', texte: "5.6.2 La mesure du degré d'avancement" },
      {
        type: 'paragraphe',
        texte: "L'avancement est mesuré par une méthode unique pour chaque obligation, appliquée de manière uniforme et réévaluée à chaque clôture (§ 40). Les méthodes fondées sur les extrants (prestations exécutées, étapes franchies, unités livrées) mesurent directement la valeur transférée au client (B15) ; les méthodes fondées sur les intrants (coûts engagés, heures de travail) rapportent les efforts consacrés au total prévu (B18). Ces dernières doivent exclure les coûts qui ne reflètent pas le transfert du contrôle, notamment les coûts d'inefficiences importantes non prévus dans le prix (B19(a)). Un changement dans l'évaluation de l'avancement est un changement d'estimation comptable (§ 43). Si l'entité ne peut évaluer raisonnablement le résultat mais s'attend à recouvrer ses coûts, elle limite les produits aux coûts engagés (§ 45).",
      },
      {
        type: 'carte',
        titre: "Exemple 5.9 — Contrat de construction comptabilisé à l'avancement (CONSTRUCTIONS DU LUALABA SA, société fictive)",
        texte: "L'entreprise construit un entrepôt sur le terrain d'une société minière pour un prix fixe de 5 000 000 USD (critère du § 35(b)). L'avancement est mesuré par les coûts engagés rapportés aux coûts totaux estimés. Coûts totaux estimés à l'origine : 4 000 000. Fin N : coûts engagés 1 200 000. Fin N+1 : coûts cumulés 3 000 000 ; coûts totaux réestimés à 4 500 000. N+2 : achèvement, coûts totaux effectifs 4 500 000.",
        tableau: {
          entetes: ['', 'N', 'N+1', 'N+2'],
          lignes: [
            ["Degré d'avancement cumulé", '1 200 / 4 000 = 30 %', '3 000 / 4 500 = 66,67 %', '100 %'],
            ['Produits cumulés', '1 500 000', '3 333 333', '5 000 000'],
            ["Produits de l'exercice", '1 500 000', '1 833 333', '1 666 667'],
            ["Coûts de l'exercice", '1 200 000', '1 800 000', '1 500 000'],
            ["Marge de l'exercice", '**300 000**', '**33 333**', '**166 667**'],
          ],
        },
        note: "La hausse des coûts estimés en N+1 réduit la marge totale de 1 000 000 à 500 000. L'ajustement est cumulatif : la marge cumulée à fin N+1 (333 333) correspond à 66,67 % de la nouvelle marge totale, de sorte que l'exercice N+1 absorbe l'essentiel de la révision (§ 43). Si les coûts totaux avaient été réestimés à 5 400 000, le contrat serait devenu déficitaire (perte totale de 400 000) : l'entité aurait comptabilisé à fin N+1 des produits cumulés de 2 777 778 (55,56 %) pour 3 000 000 de coûts, et une provision pour contrat déficitaire de 177 778 selon IAS 37 (§ 66), de sorte que la totalité de la perte soit constatée dès N+1.",
      },
      { type: 'intertitre', texte: "5.6.3 Obligations remplies à un moment précis" },
      {
        type: 'carte',
        titre: "Tableau 5.8 — Indicateurs du transfert du contrôle à un moment précis (IFRS 15, § 38)",
        tableau: {
          entetes: ['Indicateur', 'Portée'],
          lignes: [
            ['(a) Droit actuel à paiement', "Le client est actuellement tenu de payer"],
            ['(b) Titre de propriété', "Une réserve de propriété conservée à seule fin de protection contre le défaut de paiement n'empêche pas le transfert du contrôle"],
            ['(c) Possession matérielle', "Elle peut ne pas coïncider avec le contrôle : accords de consignation, ventes à livrer"],
            ['(d) Risques et avantages importants', "Sans tenir compte des risques relevant d'une obligation de prestation distincte (maintenance, par exemple)"],
            ['(e) Acceptation par le client', "Formalité si la conformité peut être déterminée objectivement (B84) ; condition du transfert dans le cas contraire (B85)"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Trois situations fréquentes dans la distribution et l'industrie appellent une vigilance particulière. Dans un accord de consignation, le distributeur détient le produit sans en avoir le contrôle, faute d'obligation inconditionnelle de le payer ; le produit n'est comptabilisé qu'à la revente au client final (B77-B78). Dans une vente à livrer, le client obtient le contrôle alors que l'entité conserve la possession matérielle, à condition que l'accord ait un motif réel, que le produit soit identifié séparément, prêt à être livré et indisponible pour d'autres clients (B81) ; l'entité rend alors un service de garde, éventuellement distinct (B82). Enfin, lorsqu'un tiers intervient dans la fourniture, l'entité doit déterminer si elle contrôle le bien ou service avant sa fourniture au client : dans l'affirmative, elle agit pour son propre compte et comptabilise le montant brut (B35B) ; dans la négative, elle agit comme mandataire et ne comptabilise que sa commission (B36).",
      },
      {
        type: 'carte',
        titre: "Exemple 5.10 — Commissionnaire en douane et distributeur : mandataire ou agissant pour son propre compte",
        tableau: {
          entetes: ['Situation', 'Indicateurs (B37)', 'Qualification', 'Produit comptabilisé'],
          lignes: [
            ["Un commissionnaire en douane facture à son client 50 000 USD, dont 42 000 de droits et taxes acquittés pour son compte et 8 000 d'honoraires", "Aucun contrôle sur le service de dédouanement rendu par l'administration ; aucune latitude sur le montant des droits", 'Mandataire pour les droits ; prestataire pour sa propre prestation', '8 000 (B36) ; les 42 000 sont des débours'],
            ["Un distributeur achète des groupes électrogènes à un fabricant, les stocke à Lubumbashi, fixe ses prix de revente et assure le service après-vente", "Responsabilité première de la fourniture ; risque sur stocks ; latitude sur le prix (B37(a)-(c))", 'Agit pour son propre compte', 'Montant brut des ventes (B35B)'],
            ["Une plateforme en ligne met en relation des acheteurs et des artisans, qui expédient eux-mêmes et fixent leurs prix, contre une commission de 10 %", "Pas de contrôle des biens avant leur fourniture ; pas de risque sur stocks", 'Mandataire', 'Commission de 10 % (B36)'],
          ],
        },
        note: "La qualification n'affecte pas le résultat, mais le chiffre d'affaires : un mandataire qui présenterait les 42 000 de droits en produits gonflerait son chiffre d'affaires de plus de cinq fois. Les indicateurs du § B37 ne sont pas des critères cumulatifs ; leur pertinence varie selon la nature du bien ou du service (B37A).",
      },
    ],
  },
  {
    numero: '5.7',
    titre: "Coûts du contrat, présentation et informations à fournir",
    navLabel: 'Coûts et présentation',
    blocs: [
      { type: 'intertitre', texte: "5.7.1 Les coûts d'obtention et d'exécution du contrat" },
      {
        type: 'paragraphe',
        texte: "IFRS 15 traite aussi des coûts engagés pour obtenir ou exécuter un contrat, lorsqu'aucune autre norme ne s'applique. Les coûts marginaux d'obtention, c'est-à-dire ceux qui n'auraient pas été engagés sans l'obtention du contrat, comme une commission de vente, sont comptabilisés en actif si l'entité s'attend à les recouvrer (§ 91-92). Les coûts engagés que le contrat soit obtenu ou non, tels que les frais de préparation d'une offre, sont des charges (§ 93). Les coûts d'exécution sont portés à l'actif s'ils sont directement liés à un contrat identifié, s'ils procurent des ressources servant à remplir des obligations futures et s'ils sont recouvrables (§ 95). Ces actifs sont amortis au rythme de la fourniture des biens ou services auxquels ils se rattachent (§ 99) et dépréciés lorsque leur valeur comptable excède la contrepartie restant à recevoir, diminuée des coûts directs restant à engager (§ 101).",
      },
      {
        type: 'carte',
        titre: "Exemple 5.11 — Coûts d'obtention d'un contrat de maintenance",
        tableau: {
          entetes: ['Coût', 'Traitement', 'Référence'],
          lignes: [
            ["Commission de 3 % versée au commercial sur un contrat de maintenance de trois ans de 300 000", "Actif de 9 000, amorti de 3 000 par an sur la durée du contrat", '§ 91, 99'],
            ["Honoraires d'un conseil juridique pour la négociation, dus que le contrat soit signé ou non", "Charges de l'exercice", '§ 93'],
            ["Commission sur un contrat d'une durée de six mois", "Charges immédiates admises par simplification", '§ 94'],
          ],
        },
      },
      { type: 'intertitre', texte: "5.7.2 Actif sur contrat, passif sur contrat et créance" },
      {
        type: 'paragraphe',
        texte: "Dès que l'une des parties a exécuté ses obligations, le contrat est présenté comme un actif ou un passif sur contrat, selon le rapport entre la prestation de l'entité et le paiement du client (§ 105). Le passif sur contrat représente l'obligation de fournir des biens ou services pour lesquels l'entité a reçu, ou peut exiger, une contrepartie (§ 106) : c'est la nature des produits constatés d'avance. L'actif sur contrat représente un droit à contrepartie pour des biens ou services déjà fournis, lorsque ce droit dépend d'autre chose que de l'écoulement du temps, par exemple de l'achèvement d'une autre prestation (§ 107). La créance est un droit inconditionnel, dont l'exigibilité ne dépend que du passage du temps (§ 108). La distinction importe pour l'analyse du risque : un actif sur contrat comporte, outre le risque de crédit, un risque d'exécution.",
      },
      {
        type: 'carte',
        titre: "Exemple 5.12 — Du passif sur contrat à la créance (en milliers de USD)",
        texte: "Une entreprise conclut le 1er octobre N un contrat de fourniture et d'installation d'une station de pompage pour 1 000, obligation remplie progressivement. Le client verse une avance de 300 à la signature ; le solde est facturé après la réception définitive, prévue en mars N+1. Au 31 décembre N, l'avancement est de 60 %. La réception intervient le 15 mars N+1 et le solde est facturé le même jour.",
        tableau: {
          entetes: ['Date', 'Situation', 'Présentation', 'Fondement'],
          lignes: [
            ['1er octobre N', "Avance de 300 reçue avant toute prestation", 'Passif sur contrat 300', '§ 106'],
            ['31 décembre N', "Produit comptabilisé 600 ; paiements reçus 300 ; solde conditionné à la réception", 'Actif sur contrat 300 (600 − 300)', '§ 107'],
            ['15 mars N+1', 'Achèvement et réception ; facturation du solde de 700', 'Créance 700 ; actif sur contrat soldé', '§ 108'],
          ],
        },
        note: "L'actif sur contrat et la créance ne sont pas de même nature : le premier est un droit conditionné par autre chose que l'écoulement du temps, ici la réception ; la seconde est un droit inconditionnel (§ 108). La distinction importe pour l'analyse du besoin en fonds de roulement et pour la dépréciation, les deux étant toutefois soumis aux pertes de crédit attendues d'IFRS 9. Chaque contrat est présenté pour sa position nette, comme un actif ou comme un passif sur contrat (§ 105).",
      },
      {
        type: 'paragraphe',
        texte: "Les informations à fournir visent à permettre de comprendre la nature, le montant, le calendrier et le degré d'incertitude des produits et des flux de trésorerie issus des contrats (§ 110). Elles portent notamment sur la ventilation des produits, les soldes d'actifs et de passifs sur contrat, les obligations de prestation restant à remplir et les jugements importants exercés pour déterminer le moment de la satisfaction des obligations et le prix de transaction.",
      },
      {
        type: 'filet',
        titre: "Rapprochement avec le SYSCOHADA révisé",
        texte: "Le SYSCOHADA révisé a intégré le principe d'IFRS 15 : la comptabilisation des produits résultant de contrats avec les clients « doit traduire le transfert à un client du contrôle d'un bien ou d'un service, pour le montant auquel le vendeur s'attend à avoir droit », ce transfert intervenant en général à la livraison ou à l'achèvement de la prestation (Titre VII, introduction de la classe 7). Pour les contrats pluri-exercices, le chapitre 23 du Titre VIII, qui se réfère expressément à IAS 11 et à IFRS 15, impose la méthode à l'avancement dès que le résultat à terminaison peut être estimé de façon fiable, la méthode à l'achèvement n'étant pas un choix mais une obligation en l'absence d'une telle estimation. Le chiffre d'affaires partiel est enregistré au compte 4181 Clients, factures à établir ; la perte à terminaison est provisionnée pour sa totalité, le complément correspondant aux travaux non réalisés étant porté au compte 193 Provisions pour pertes sur marchés à achèvement futur. Le texte officiel annonce la formule du pourcentage d'avancement par les coûts sans l'imprimer [texte officiel] ; la logique qu'il décrit est celle d'IFRS 15 (B18-B19). Les écarts entre les deux référentiels tiennent surtout aux sujets que le SYSCOHADA ne traite pas en détail : contrepartie variable et sa limitation, composante financement, répartition du prix entre obligations de prestation, analyse mandant-mandataire.",
      },
    ],
  },
  {
    numero: '5.8',
    titre: "IAS 20 : définitions, champ d'application et comptabilisation des subventions",
    navLabel: 'IAS 20 : principe',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les entreprises reçoivent des soutiens publics sous des formes variées : aides à l'équipement, primes à l'emploi, prêts bonifiés, mises à disposition de terrains. IAS 20 traite de la comptabilisation des subventions publiques et des informations à fournir sur les autres formes d'aide publique (§ 1). La norme repose sur une idée directrice : une subvention n'est pas un apport des propriétaires, mais la contrepartie d'engagements pris par l'entité ; elle doit donc être rattachée aux coûts qu'elle est destinée à compenser.",
      },
      { type: 'intertitre', texte: "5.8.1 Définitions et champ d'application" },
      {
        type: 'paragraphe',
        texte: "L'autorité publique désigne l'État, une autorité locale ou un organisme public, ou tout organisme similaire local, national ou international. Les subventions publiques sont des aides publiques « prenant la forme de transferts de ressources à une entité, en échange du fait que celle-ci s'est conformée ou se conformera à certaines conditions liées à ses activités d'exploitation » ; elles excluent les aides dont la valeur ne peut être raisonnablement déterminée et les transactions qui ne peuvent être distinguées des transactions commerciales habituelles de l'entité (§ 3). La norme distingue les subventions liées à des actifs, dont la condition principale est l'acquisition ou la construction d'actifs à long terme, et les subventions liées au résultat, qui regroupent toutes les autres.",
      },
      {
        type: 'carte',
        titre: "Tableau 5.9 — Éléments exclus du champ d'IAS 20",
        tableau: {
          entetes: ['Élément', 'Justification', 'Référence'],
          lignes: [
            ["Avantages fiscaux déterminés sur le bénéfice imposable : exonérations, crédits d'impôt pour investissement, amortissements accélérés, taux réduits", 'Relèvent de la détermination de l\'impôt (IAS 12)', '§ 2(b)'],
            ["Participation de l'État au capital de l'entité", 'Apport des propriétaires', '§ 2(c)'],
            ['Subventions relatives aux actifs biologiques', 'IAS 41', '§ 2(d)'],
            ["Infrastructures générales (réseau de transport, irrigation) disponibles pour toute une communauté", "Avantage indirect, non spécifique à l'entité", '§ 3 et 38'],
            ["Conseils techniques gratuits, garanties données, politique d'achat public", "Aides non évaluables ou indissociables des transactions commerciales : information en annexe seulement", '§ 34-36'],
          ],
        },
      },
      { type: 'intertitre', texte: "5.8.2 Le fait générateur" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 20, § 7 et 8",
        texte: "« Les subventions publiques, y compris les subventions non monétaires évaluées à la juste valeur, ne doivent pas être comptabilisées tant qu'il n'existe pas une assurance raisonnable que : (a) l'entité se conformera aux conditions attachées aux subventions ; et (b) les subventions seront reçues. » (§ 7). « L'obtention d'une subvention ne fournit pas en elle-même un élément probant permettant de conclure que les conditions attachées à la subvention ont été ou seront remplies. » (§ 8).",
      },
      {
        type: 'paragraphe',
        texte: "Une annonce politique, l'inscription d'un crédit au budget d'un organisme public ou une promesse verbale ne suffisent donc pas à justifier la comptabilisation. Réciproquement, l'encaissement ne l'impose pas si les conditions ne sont pas raisonnablement assurées. La forme de réception, en trésorerie ou par réduction d'une dette envers l'autorité publique, est sans influence (§ 9). Un prêt transformable en subvention est traité comme une subvention lorsqu'il existe une assurance raisonnable que les conditions de dispense de remboursement seront remplies (§ 10). L'avantage d'un prêt public à taux inférieur au marché constitue également une subvention : il est mesuré par la différence entre la valeur initiale du prêt selon IFRS 9 et le montant perçu (§ 10A).",
      },
      { type: 'intertitre', texte: "5.8.3 L'approche par le résultat" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 20, § 12",
        texte: "« Les subventions publiques doivent être comptabilisées en résultat net sur une base systématique sur les périodes au titre desquelles l'entité comptabilise en charges les coûts liés que les subventions sont censées compenser. »",
      },
      {
        type: 'paragraphe',
        texte: "La norme expose les deux approches en présence (§ 13-15). L'approche par le bilan considère la subvention comme un moyen de financement, à inscrire hors du résultat. L'approche par le résultat, retenue par IAS 20, s'appuie sur trois arguments : les subventions proviennent d'une autre source que les actionnaires et ne peuvent être comptabilisées directement en capitaux propres ; elles sont rarement gratuites, l'entité les obtenant en respectant des obligations ; elles prolongent les politiques fiscales, dont les effets passent en résultat. La comptabilisation à l'encaissement n'est admise que s'il n'existe aucune base de répartition sur d'autres périodes (§ 16). Les subventions liées à des actifs amortissables sont rapportées au résultat au rythme des amortissements ; celles qui concernent un actif non amortissable assorti d'obligations le sont sur la période où s'échelonne le coût de ces obligations, par exemple la durée de vie d'un immeuble dont la construction conditionne l'octroi d'un terrain (§ 17-18). Une subvention qui compense des charges déjà engagées ou apporte un soutien financier immédiat sans coûts futurs est comptabilisée en résultat dès qu'elle devient une créance (§ 20-22).",
      },
      {
        type: 'carte',
        titre: "Exemple 5.13 — Prêt public à taux bonifié",
        texte: "Une agroindustrie obtient d'un fonds public un prêt de 1 000 000 USD sur trois ans, au taux de 2 % payable annuellement, remboursable in fine, pour financer une ligne de conditionnement. Le taux du marché pour un emprunt comparable est de 10 %.",
        tableau: {
          entetes: ['Élément', 'Calcul', 'Montant (USD)'],
          lignes: [
            ['Valeur initiale du prêt selon IFRS 9', '20 000 / 1,1 + 20 000 / 1,1² + 1 020 000 / 1,1³', '**801 052**'],
            ['Avantage traité comme subvention (§ 10A)', '1 000 000 − 801 052', '**198 948**'],
            ["Charge d'intérêts de l'année 1 au taux effectif", '801 052 × 10 %', '80 105'],
            ["Charge d'intérêts de l'année 2", '861 157 × 10 %', '86 116'],
            ["Charge d'intérêts de l'année 3", '927 273 × 10 %', '92 727'],
          ],
        },
        note: "La dette est comptabilisée au coût amorti selon IFRS 9 (chapitre 4). La subvention de 198 948, liée à l'acquisition de la ligne, est rapportée au résultat au rythme de l'amortissement de celle-ci (§ 12 et 17) : la charge d'intérêts au taux du marché est ainsi compensée, sur la durée d'utilisation de l'actif financé, par le produit de subvention.",
      },
    ],
  },
  {
    numero: '5.9',
    titre: "IAS 20 : présentation, remboursement et informations à fournir",
    navLabel: 'IAS 20 : présentation',
    blocs: [
      { type: 'intertitre', texte: "5.9.1 Les subventions liées à des actifs" },
      {
        type: 'paragraphe',
        texte: "Les subventions liées à des actifs, y compris les subventions non monétaires évaluées à la juste valeur, sont présentées soit en produits différés, soit en déduction de la valeur comptable de l'actif (§ 24). Les deux méthodes sont acceptables (§ 25). La première inscrit la subvention au passif et la rapporte au résultat sur une base systématique sur la durée d'utilité de l'actif (§ 26) ; la seconde la déduit du coût de l'actif, et la comptabilisation en résultat s'opère par une réduction de la charge d'amortissement (§ 27). Les flux d'investissement et de subvention sont souvent présentés séparément dans le tableau des flux de trésorerie, quelle que soit la méthode retenue au bilan (§ 28). Une subvention non monétaire, telle qu'un terrain, est habituellement évaluée à sa juste valeur, l'enregistrement pour un montant symbolique restant admis (§ 23).",
      },
      {
        type: 'carte',
        titre: "Exemple 5.14 — Machine financée par une subvention d'équipement",
        texte: "Illustration du support d'origine. Une entreprise acquiert une machine de 60 000, amortie linéairement sur 10 ans, et reçoit une subvention de 20 000 liée à cette acquisition.",
        tableau: {
          entetes: ['Écriture', 'Méthode des produits différés (§ 26)', "Méthode de déduction de l'actif (§ 27)"],
          lignes: [
            ["Acquisition", 'Débit Immobilisation 60 000 / Crédit Trésorerie 60 000', 'Débit Immobilisation 60 000 / Crédit Trésorerie 60 000'],
            ['Encaissement de la subvention', 'Débit Trésorerie 20 000 / Crédit Produits différés 20 000', 'Débit Trésorerie 20 000 / Crédit Immobilisation 20 000'],
            ['Amortissement annuel', 'Débit Dotation 6 000 / Crédit Amortissements 6 000', 'Débit Dotation 4 000 / Crédit Amortissements 4 000'],
            ['Reprise annuelle de la subvention', 'Débit Produits différés 2 000 / Crédit Produit de subvention 2 000', 'Aucune écriture distincte'],
            ['Charge nette annuelle', '6 000 − 2 000 = **4 000**', '**4 000**'],
            ['Présentation au bilan après un an', 'Actif 54 000 ; produits différés 18 000', 'Actif 36 000'],
          ],
        },
        note: "L'effet sur le résultat est identique. Les deux méthodes diffèrent par la présentation : la première conserve la valeur brute de l'investissement à l'actif et fait apparaître la subvention au passif ; la seconde réduit le total du bilan et les ratios fondés sur les actifs.",
      },
      { type: 'intertitre', texte: "5.9.2 Les subventions liées au résultat" },
      {
        type: 'paragraphe',
        texte: "Les subventions liées au résultat sont présentées soit en produit, séparément ou dans une rubrique telle que « autres produits », soit en déduction des charges auxquelles elles se rapportent (§ 29). Les partisans de la première méthode font valoir que la compensation des charges et des produits est inappropriée et nuit à la comparaison ; ceux de la seconde, que les charges n'auraient peut-être pas été engagées sans la subvention (§ 30). Les deux méthodes sont admises, une information sur l'effet de la subvention pouvant être nécessaire à la compréhension des états financiers (§ 31).",
      },
      { type: 'intertitre', texte: "5.9.3 Le remboursement des subventions" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 20, § 32",
        texte: "« Une subvention publique qui devient remboursable doit être comptabilisée en tant que changement d'estimation comptable […]. Le remboursement d'une subvention liée au résultat doit être imputé en premier à tout crédit différé non amorti comptabilisé au titre de la subvention. Dans la mesure où le remboursement excède un tel crédit différé, ou s'il n'existe pas de crédit différé, le remboursement doit être comptabilisé immédiatement en résultat net. Le remboursement d'une subvention liée à un actif doit être comptabilisé soit en augmentant la valeur comptable de l'actif, soit en réduisant le solde du produit différé du montant remboursable. Le cumul de l'amortissement supplémentaire qui aurait été comptabilisé en résultat net jusqu'à cette date en l'absence de la subvention doit être comptabilisé immédiatement en résultat net. »",
      },
      {
        type: 'carte',
        titre: "Exemple 5.15 — Remboursement de la subvention de l'exemple 5.14 après quatre ans",
        texte: "À la fin de la quatrième année, l'entreprise manque à une condition de maintien de l'emploi et doit rembourser l'intégralité de la subvention de 20 000.",
        tableau: {
          entetes: ['', 'Méthode des produits différés', "Méthode de déduction de l'actif"],
          lignes: [
            ['Situation avant remboursement', 'Produits différés restants : 20 000 − 4 × 2 000 = 12 000', 'Valeur nette : 40 000 − 4 × 4 000 = 24 000'],
            ['Écriture', 'Débit Produits différés 12 000 ; débit Charges 8 000 / Crédit Trésorerie 20 000', "Débit Immobilisation 20 000 / Crédit Trésorerie 20 000 ; débit Charges 8 000 / Crédit Amortissements 8 000"],
            ['Charge de la période', '**8 000**', '**8 000**, soit le cumul de l\'amortissement supplémentaire (4 × 2 000)'],
            ['Situation après remboursement', 'Actif : 60 000 − 24 000 = 36 000', 'Actif : 60 000 − 24 000 = 36 000'],
          ],
        },
        note: "Le support d'origine résume la règle en indiquant que le remboursement s'impute d'abord sur les produits différés, puis en charges ou en augmentation de l'actif. IAS 20.32 distingue en réalité deux régimes : l'imputation prioritaire sur le crédit différé concerne les subventions liées au résultat ; pour les subventions liées à un actif, le remboursement accroît la valeur de l'actif ou réduit le produit différé, et le rattrapage d'amortissement est constaté en résultat. Les circonstances du remboursement peuvent en outre révéler une perte de valeur de l'actif (§ 33).",
      },
      { type: 'intertitre', texte: "5.9.4 Informations à fournir" },
      {
        type: 'paragraphe',
        texte: "L'entité indique la méthode comptable adoptée pour les subventions, y compris la méthode de présentation ; la nature et l'étendue des subventions comptabilisées et les autres formes d'aide publique dont elle a directement bénéficié ; les conditions non remplies et les autres éventualités relatives à l'aide comptabilisée (§ 39). Cette dernière information est essentielle pour apprécier le risque de remboursement.",
      },
      {
        type: 'filet',
        titre: "Rapprochement avec le SYSCOHADA révisé",
        texte: "Le chapitre 17 du Titre VIII reprend les définitions et le fait générateur d'IAS 20, mais retient une typologie et une présentation propres. Il distingue les subventions d'investissement (compte 14), d'exploitation (compte 71) et d'équilibre (compte 88). La subvention d'investissement est traitée comme un accroissement des capitaux propres : le compte 14 figure parmi les « autres capitaux propres », et la subvention est reprise au compte 799 au rythme de l'amortissement, la reprise annuelle étant égale à la dotation multipliée par le rapport entre la subvention et la valeur d'entrée ; pour un bien non amortissable sans clause d'inaliénabilité, la reprise s'effectue par dixièmes. Dans l'exemple 5.14, la reprise annuelle est de 6 000 × 20 000 / 60 000 = 2 000, comme selon la méthode des produits différés ; seul le classement au bilan diffère. IAS 20 écartant toute inscription directe en capitaux propres (§ 12 et 15), l'établissement d'états IFRS impose de reclasser le solde du compte 14 en produits différés ou en déduction des actifs, avec une incidence sur les capitaux propres ; la différence temporaire qui en résulte s'analyse selon IAS 12, dont le § 33 exclut la comptabilisation d'un impôt différé sur une subvention non imposable (chapitre 6). Une subvention perçue avant la réalisation de ses conditions est portée au compte 4497 État, avances sur subventions ; le remboursement d'une subvention d'investissement réduit le compte 14, celui d'une subvention d'exploitation s'impute d'abord sur le compte 477 et, pour l'excédent, au compte 831 Charges HAO constatées.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ue13c5-cp1',
    titre: "Contrat à éléments multiples d'un équipementier minier (KIVU ÉQUIPEMENTS SA, société fictive)",
    contexte: "Le 1er octobre N, KIVU ÉQUIPEMENTS conclut avec une société minière un contrat portant sur : (1) la livraison d'un concasseur standard, que l'entreprise vend couramment seul au prix de 450 000 USD ; (2) son installation, prestation courante que d'autres entreprises proposent, dont le prix de vente spécifique est estimé à 30 000 USD ; (3) la formation de dix opérateurs, prix spécifique 20 000 USD ; (4) une maintenance de trois ans à compter du 1er janvier N+1, prix spécifique 100 000 USD. Le prix global est de 540 000 USD, payable 50 % à la signature et 50 % à la mise en service. Le concasseur est livré le 15 novembre N, installé le 15 décembre N ; la formation a lieu en janvier N+1. Le contrat comporte en outre la garantie légale de conformité d'un an.",
    questions: [
      {
        num: 1,
        enonce: "Identifiez les obligations de prestation du contrat et justifiez le traitement de la garantie.",
        correction: "Quatre obligations de prestation : concasseur, installation, formation, maintenance. Chacune est distincte (§ 27) : le concasseur est vendu couramment seul, l'installation et la formation sont des prestations courantes réalisables par d'autres, et aucun travail d'intégration important ne lie les éléments (§ 29). La garantie légale de conformité, que le client ne peut acheter séparément et qui ne procure pas de service supplémentaire, relève d'IAS 37 (B30-B31(a)) : l'entité constitue une provision pour garantie, sans affectation de prix.",
      },
      {
        num: 2,
        enonce: "Répartissez le prix de transaction entre les obligations de prestation.",
        correction: "Somme des prix de vente spécifiques : 450 000 + 30 000 + 20 000 + 100 000 = 600 000. Remise : 60 000, soit 10 %, répartie proportionnellement faute d'éléments observables contraires (§ 81). Concasseur : 540 000 × 450/600 = **405 000** ; installation : **27 000** ; formation : **18 000** ; maintenance : **90 000**.",
      },
      {
        num: 3,
        enonce: "Quel chiffre d'affaires KIVU ÉQUIPEMENTS comptabilise-t-elle au titre de N et de N+1 ?",
        correction: "N : concasseur à la livraison (transfert du contrôle, § 38) : 405 000 ; installation à son achèvement le 15 décembre : 27 000. Total N : **432 000**. N+1 : formation en janvier : 18 000 ; maintenance : 90 000 / 3 = 30 000. Total N+1 : **48 000**. Puis 30 000 en N+2 et en N+3.",
      },
      {
        num: 4,
        enonce: "Présentez la situation du contrat au bilan du 31 décembre N, sachant que la mise en service a eu lieu le 15 décembre et que le second versement a été encaissé.",
        correction: "Encaissements : 540 000. Produits comptabilisés : 432 000. Le client a payé 108 000 de plus que les prestations fournies : **passif sur contrat de 108 000** (§ 106), correspondant à la formation (18 000) et à la maintenance (90 000) restant à fournir. En SYSCOHADA, ce montant correspondrait à des produits constatés d'avance (compte 477).",
      },
      {
        num: 5,
        enonce: "Supposez que le contrat prévoie en outre une pénalité de 10 000 USD par semaine de retard de mise en service au-delà du 1er décembre N, et qu'au 1er octobre l'entreprise ait estimé probable un retard de deux semaines. Comment cette clause aurait-elle affecté le prix de transaction ?",
        correction: "Une pénalité est une contrepartie variable (§ 51). L'entreprise estime le montant attendu, ici un retard de deux semaines, soit 20 000, selon la méthode la plus prédictive (§ 53). Le prix de transaction aurait été ramené à 520 000, réparti en proportion des prix de vente spécifiques, sauf si la pénalité vise spécifiquement l'installation, auquel cas elle lui est affectée en totalité (§ 85). La mise en service le 15 décembre aurait confirmé l'estimation ; tout écart ultérieur aurait été réparti selon la même base qu'à la passation (§ 88).",
      },
    ],
  },
  {
    id: 'ue13c5-cp2',
    titre: "Contrat de construction déficitaire : IFRS 15, IAS 37 et SYSCOHADA révisé",
    contexte: "Une entreprise de travaux publics construit pour une société agro-industrielle une station de traitement d'eau sur le site du client, pour un prix fixe de 8 000 000 USD. Les coûts totaux sont estimés à 7 000 000 USD à l'origine. Fin N : coûts engagés 2 100 000 USD, dont 100 000 USD de matériaux gâchés par une erreur de mise en œuvre, non prévus dans le prix ; les coûts totaux estimés restent de 7 000 000 USD, hors ce gaspillage. Fin N+1 : coûts cumulés utiles 5 000 000 USD ; en raison d'une hausse des prix de l'acier, les coûts totaux sont réestimés à 8 400 000 USD.",
    questions: [
      {
        num: 1,
        enonce: "Justifiez la comptabilisation à l'avancement et calculez le degré d'avancement, le produit et la marge de N.",
        correction: "La station est édifiée sur le site du client, qui en obtient le contrôle au fur et à mesure de sa construction : critère du § 35(b). Le gaspillage de 100 000 est exclu de la mesure de l'avancement (B19(a)) et passe en charges (§ 98(b)). Avancement : 2 000 000 / 7 000 000 = 28,57 %. Produit : 8 000 000 × 28,57 % = **2 285 714**. Marge : 2 285 714 − 2 100 000 = **185 714** (soit 285 714 de marge sur les coûts utiles, diminuée du gaspillage de 100 000).",
      },
      {
        num: 2,
        enonce: "Déterminez le traitement à fin N+1.",
        correction: "Le contrat devient déficitaire : perte totale 8 000 000 − 8 400 000 = 400 000. Avancement : 5 000 000 / 8 400 000 = 59,52 %. Produits cumulés : 4 761 905 ; produits de N+1 : 4 761 905 − 2 285 714 = 2 476 191. Coûts utiles de N+1 : 3 000 000. Résultat avant provision : −523 809. Provision pour contrat déficitaire (IAS 37.66) sur la partie restante : coûts restants 3 400 000 − produits restants 3 238 095 = **161 905**. Perte de N+1 : 523 809 + 161 905 = **685 714**, soit l'annulation de la marge de 285 714 constatée en N sur les coûts utiles et la totalité de la perte de 400 000 (le gaspillage de N restant une charge de N).",
      },
      {
        num: 3,
        enonce: "Comment le SYSCOHADA révisé traite-t-il la même situation ?",
        correction: "Le chapitre 23 du Titre VIII impose la méthode à l'avancement lorsque le résultat à terminaison est estimable de façon fiable. Pour un contrat déficitaire, la perte afférente aux travaux réalisés est constatée à travers le chiffre d'affaires à l'avancement (résultat = perte à terminaison × pourcentage d'avancement) et le complément fait l'objet d'une provision : débit 6911 Dotations aux provisions d'exploitation pour risques et charges, crédit 193 Provisions pour pertes sur marchés à achèvement futur (§ 5.1). Il exclut lui aussi les coûts de pertes non prévues de la mesure de l'avancement (§ 3.3.2). Les deux référentiels conduisent ici au même résultat.",
      },
      {
        num: 4,
        enonce: "À la passation, le client avait versé une avance de 1 000 000 USD, et la facturation de N s'élève à 1 500 000 USD. Présentez la position du contrat à fin N.",
        correction: "Produits comptabilisés : 2 285 714. Montants facturés au client, avance comprise : 1 500 000. L'entité a fourni plus qu'elle n'a le droit de facturer : **actif sur contrat de 785 714** (§ 107), soumis au modèle de dépréciation d'IFRS 9. La part facturée et non réglée constitue une créance (§ 108). En SYSCOHADA, le chiffre d'affaires à l'avancement non facturé est porté au compte 4181 Clients, factures à établir, et l'avance au compte 4191.",
      },
    ],
  },
  {
    id: 'ue13c5-cp3',
    titre: "Subvention d'équipement d'une centrale solaire : IAS 20 et SYSCOHADA révisé",
    contexte: "Le 1er janvier N, une société agroalimentaire met en service une centrale solaire de 900 000 USD, amortie linéairement sur 15 ans. Un organisme international lui accorde une subvention de 300 000 USD, sous condition de maintenir l'installation en exploitation pendant 10 ans ; la décision d'octroi est notifiée le 15 novembre N-1 et les fonds sont versés le 1er mars N. La société tient ses comptes en SYSCOHADA révisé et établit des états IFRS pour son groupe.",
    questions: [
      {
        num: 1,
        enonce: "À quelle date la subvention peut-elle être comptabilisée selon IAS 20 ?",
        correction: "Dès qu'il existe une assurance raisonnable que l'entité respectera les conditions et que la subvention sera reçue (§ 7). La notification du 15 novembre N-1 rend l'encaissement raisonnablement assuré ; la condition d'exploitation pendant 10 ans relève de la seule volonté de l'entité, qui a mis la centrale en service. La subvention peut être comptabilisée dès la notification, en contrepartie d'une créance ; le versement du 1er mars N ne modifie pas le traitement (§ 9).",
      },
      {
        num: 2,
        enonce: "Présentez l'effet sur le résultat et le bilan IFRS de N selon les deux méthodes admises.",
        correction: "Méthode des produits différés : amortissement 900 000 / 15 = 60 000 ; produit de subvention 300 000 / 15 = 20 000 ; charge nette 40 000. Bilan fin N : actif 840 000, produits différés 280 000. Méthode de déduction : coût net 600 000, amortissement 40 000 ; actif fin N : 560 000. Charge nette identique : **40 000**.",
      },
      {
        num: 3,
        enonce: "Comment la subvention est-elle traitée dans les comptes SYSCOHADA, et quel retraitement impose le passage aux IFRS ?",
        correction: "En SYSCOHADA, la subvention est créditée au compte 14 (sous-compte 1417, organismes internationaux) par le débit du 4582, et reprise au compte 799 à raison de 60 000 × 300 000 / 900 000 = 20 000 par an. Le solde de 280 000 figure fin N parmi les « autres capitaux propres ». IAS 20 écartant l'inscription en capitaux propres (§ 12 et 15), le retraitement IFRS reclasse les 280 000 en produits différés (ou en déduction de l'actif) : les capitaux propres IFRS sont inférieurs de 280 000, et la différence temporaire correspondante est analysée au regard d'IAS 12 (chapitre 6), qui exclut tout impôt différé si la subvention n'est pas imposable (§ 33).",
      },
      {
        num: 4,
        enonce: "Fin N+3, l'entité décide de démanteler la centrale et doit rembourser 60 % de la subvention. Chiffrez l'incidence selon la méthode des produits différés.",
        correction: "Montant remboursable : 180 000. Produits différés restants fin N+3 : 300 000 − 4 × 20 000 = 220 000. Selon IAS 20.32, le remboursement réduit le produit différé : débit Produits différés 180 000, crédit Dettes 180 000. Le solde de 40 000, qui correspond à la fraction non remboursable, reste à rapporter au résultat ; la décision de démanteler raccourcit la durée d'utilité et impose de réviser l'amortissement et de tester l'actif (§ 33 ; IAS 36). Le remboursement ne génère ici aucune charge immédiate, le produit différé couvrant le montant remboursable.",
      },
    ],
  },
  {
    id: 'ue13c5-cp4',
    titre: "Revue des pratiques de comptabilisation du chiffre d'affaires d'un distributeur",
    contexte: "Lors de l'audit des comptes IFRS d'un distributeur de matériaux de construction établi à Kinshasa, l'auditeur relève les pratiques suivantes. (a) Les marchandises livrées à des revendeurs de l'intérieur, qui ne les paient qu'après les avoir revendues et peuvent restituer les invendus, sont comptabilisées en ventes à la livraison. (b) La société vend en ligne, pour le compte d'un fabricant de carrelage, des produits expédiés directement par ce dernier ; elle ne détient aucun stock, le fabricant fixe les prix et assume les retours ; la société comptabilise en chiffre d'affaires le prix total payé par l'acheteur. (c) En décembre, un client a payé 2 000 tonnes de ciment qu'il a demandé de conserver dans l'entrepôt de la société jusqu'en février ; les sacs sont isolés, étiquetés à son nom et prêts à être enlevés ; la vente a été comptabilisée en décembre. (d) Les frais d'ouverture de compte de 500 USD, non remboursables, facturés aux entreprises clientes lors de leur référencement sont comptabilisés en produits à la facturation. (e) Une remise de fin d'année de 3 % est accordée aux clients dont le volume annuel dépasse un seuil ; elle est comptabilisée en charges commerciales lors de son versement en janvier.",
    questions: [
      {
        num: 1,
        enonce: "Analysez la pratique (a).",
        correction: "Absence d'obligation inconditionnelle de payer et faculté de restitution : ce sont des indicateurs d'un accord de consignation (B78). Les revendeurs n'obtiennent pas le contrôle à la livraison ; le produit doit être comptabilisé lors de la revente au client final (B77). La pratique surévalue le chiffre d'affaires et la marge ; les marchandises en dépôt restent en stock chez le distributeur.",
      },
      {
        num: 2,
        enonce: "Analysez la pratique (b).",
        correction: "La société ne contrôle pas le carrelage avant sa fourniture : absence de risque sur stocks, prix fixé par le fabricant, responsabilité de la conformité et des retours assumée par celui-ci (B37). Elle agit comme mandataire et ne doit comptabiliser que sa commission (B36). La présentation brute gonfle le chiffre d'affaires et les achats, sans effet sur la marge absolue, mais fausse le taux de marge et les ratios d'activité.",
      },
      {
        num: 3,
        enonce: "Analysez la pratique (c).",
        correction: "Il s'agit d'une vente à livrer. Les quatre conditions de B81 sont remplies : motif réel (demande du client), identification séparée des sacs, produit prêt à être livré, indisponibilité pour d'autres clients. Le client a obtenu le contrôle : la vente de décembre est correctement comptabilisée. La société doit toutefois apprécier si le service de garde jusqu'en février constitue une obligation de prestation distincte, à laquelle une part du prix serait affectée (B82).",
      },
      {
        num: 4,
        enonce: "Analysez les pratiques (d) et (e).",
        correction: "(d) Les frais d'ouverture de compte ne rémunèrent pas un bien ou service transféré au client : les formalités de référencement sont des tâches administratives (§ 25). Ils constituent un paiement anticipé des ventes futures, comptabilisé en produit à mesure de ces ventes (B49), ce qui peut justifier un étalement sur la durée estimée de la relation si l'option de continuer à acheter confère un droit significatif. (e) La remise de fin d'année est une contrepartie variable (§ 51) : l'entité doit l'estimer dès les ventes de l'exercice et réduire le chiffre d'affaires en conséquence, sous réserve de la limitation (§ 56), en constatant un passif au titre des remboursements futurs (§ 55). Son classement en charges commerciales lors du versement surévalue le chiffre d'affaires de l'exercice.",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue13',
  numero: 5,
  id: 'ue13-chapitre-5',
  titre: 'Produits des contrats avec les clients et subventions publiques',
  sousTitre: "IFRS 15 et IAS 20 : comptabilisation du chiffre d'affaires et des aides publiques",
  infoBulle: "Chapitre 5 du module IFRS/IAS : produits des activités ordinaires selon IFRS 15 (principe du transfert du contrôle, modèle en cinq étapes, contrepartie variable, composante financement, répartition du prix, comptabilisation progressive ou à un moment précis, coûts du contrat, actifs et passifs sur contrat) ; subventions publiques selon IAS 20 (fait générateur, approche par le résultat, présentation, prêts bonifiés, remboursement) ; rapprochement avec le SYSCOHADA révisé (classe 7, contrats pluri-exercices, compte 14).",
  loiRef: "IFRS 15 · IAS 20 · IAS 37 § 66-69 · SYSCOHADA, Titre VII (classe 7, compte 14) et Titre VIII, ch. 17 et 23",
  moduleLabel: 'UE 13 · IFRS / IAS',
  retourRoute: '/ue13-ifrs-ias',
  coursId: 'ue13-ifrs-ias',
  objectifs: [
    "Énoncer le principe fondamental d'IFRS 15 et en délimiter le champ d'application.",
    "Appliquer le modèle en cinq étapes à un contrat comportant plusieurs biens ou services.",
    "Déterminer le prix de transaction en présence d'une contrepartie variable, d'une composante financement ou d'une contrepartie payable au client.",
    "Répartir le prix de transaction en proportion des prix de vente spécifiques, y compris en présence d'une remise.",
    "Distinguer les obligations remplies progressivement de celles remplies à un moment précis, et mesurer le degré d'avancement.",
    "Traiter les situations particulières : garanties, droits de retour, consignation, ventes à livrer, mandataire, coûts du contrat.",
    "Déterminer le fait générateur d'une subvention publique et appliquer les deux méthodes de présentation des subventions liées à des actifs.",
    "Comptabiliser le remboursement d'une subvention et l'avantage d'un prêt public bonifié.",
    "Rapprocher les traitements IFRS de ceux du SYSCOHADA révisé pour les contrats pluri-exercices et les subventions.",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Le produit des activités ordinaires est comptabilisé lorsque le contrôle d'un bien ou service est transféré au client, pour le montant auquel l'entité s'attend à avoir droit (IFRS 15.2 et 31). La facture et l'encaissement ne sont pas des faits générateurs.",
    "Le modèle comporte cinq étapes : identification du contrat (§ 9), des obligations de prestation (§ 22-30), du prix de transaction (§ 47-72), répartition du prix (§ 73-90) et comptabilisation à mesure de la satisfaction des obligations (§ 31-45).",
    "Un bien ou service est distinct si le client peut en tirer parti isolément ou avec des ressources aisément disponibles et si la promesse est identifiable séparément dans le contrat (§ 27).",
    "La contrepartie variable est estimée par l'espérance mathématique ou le montant le plus probable, et n'est retenue que dans la mesure où il est hautement probable qu'elle ne donnera pas lieu à un ajustement à la baisse important (§ 53 et 56).",
    "Le prix est ajusté d'une composante financement importante lorsque l'intervalle entre fourniture et paiement excède un an (§ 60-65). Les sommes versées au client réduisent le prix, sauf contrepartie d'un bien ou service distinct (§ 70).",
    "Le prix est réparti en proportion des prix de vente spécifiques ; une remise est répartie proportionnellement, sauf éléments observables contraires (§ 74-83).",
    "Une obligation est remplie progressivement si l'un des trois critères du § 35 est satisfait ; l'avancement est mesuré par une méthode fondée sur les extrants ou les intrants, en excluant les inefficiences (B14-B19). Un contrat déficitaire relève d'IAS 37.",
    "Une subvention publique n'est comptabilisée qu'en présence d'une assurance raisonnable que les conditions seront respectées et qu'elle sera reçue (IAS 20.7), puis rapportée au résultat au rythme des coûts qu'elle compense (§ 12).",
    "Les subventions liées à des actifs sont présentées en produits différés ou en déduction de l'actif (§ 24) ; leur inscription directe en capitaux propres, pratiquée par le SYSCOHADA révisé au compte 14, n'est pas admise en IFRS.",
    "Lorsque le recouvrement n'est pas probable, le contrat ne remplit pas le § 9(e) : les sommes reçues sont un passif jusqu'à ce que les conditions des § 15 ou 9 soient remplies. Un mandataire ne comptabilise que sa commission (B36) ; une remise n'est affectée à certaines obligations que si les trois conditions du § 82 sont réunies. L'actif sur contrat, droit conditionnel, se distingue de la créance, droit inconditionnel (§ 105-108).",
  ],
  references: [
    { genre: 'texte', intitule: "IFRS 15 — Produits des activités ordinaires tirés de contrats conclus avec des clients", precision: "§§ 1 à 110, annexe A, annexe B (B14 à B51, B56 à B61, B77 à B86), C1 et C10 (texte français intégral)" },
    { genre: 'texte', intitule: "IAS 20 — Comptabilisation des subventions publiques et informations à fournir sur l'aide publique", precision: "§§ 1 à 39 (texte français intégral)" },
    { genre: 'texte', intitule: "IAS 37 — Provisions, passifs éventuels et actifs éventuels", precision: "§ 66 à 69 (contrats déficitaires)" },
    { genre: 'texte', intitule: "AUDCIF et SYSCOHADA révisé", precision: "Titre VII : introduction de la classe 7, comptes 14 et 71 ; Titre VIII, ch. 17 (subventions et aides publiques) et ch. 23 (contrats pluri-exercices)" },
    { genre: 'texte', intitule: "J.-B. Tshimanga Mulumba (CPCC), IFRS - Produits, contrats & subventions (IFRS 15 & IAS 20)", precision: "support de cours, module 5 : illustrations du logiciel avec maintenance et de la machine subventionnée" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "IFRS 15, IAS 20 et IAS 37 (texte français intégral) ; AUDCIF et SYSCOHADA révisé ; support de cours du module 5 (J.-B. Tshimanga Mulumba, CPCC).",
}

export default chapitre
