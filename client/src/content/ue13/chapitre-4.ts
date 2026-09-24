import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 13 — Chapitre 4 : Stocks, créances et instruments financiers
// (IAS 2, IFRS 9, IAS 32)
//
// Sources lues sur texte pendant la rédaction :
// - IAS 2 (texte français intégral) : §§ 1 à 42.
// - IFRS 9 (texte intégral de la traduction française officielle, IFRS
//   Foundation) : 1.1, 2.1, 2.4, 3.1.1, 3.2.3, 3.2.6, 3.2.12, 3.3.1, 3.3.3,
//   4.1.1 à 4.1.5, 4.2.1, 4.3.3, 4.4.1, 5.1.1, 5.1.3, 5.4.1, 5.4.4, 5.5.1 à
//   5.5.17, 5.6.2 à 5.6.4, 5.7.1 à 5.7.11, 6.1.1, 6.4.1, 7.1.1 ; annexe A ;
//   B4.1.2C à B4.1.7A, B4.1.14, B5.2.3, B5.5.19, B5.5.22, B5.5.28, B5.5.33,
//   B5.5.35, B5.5.37, B5.7.1. Les passages entre guillemets reproduisent le
//   texte à l'identique ; le reste le paraphrase avec renvoi au §.
// - IAS 32, § 11 et AG11-AG12 (définitions).
// - AUDCIF : art. 42 à 44 et 46 ; SYSCOHADA révisé, Titre VII (compte 49) et
//   Titre VIII, ch. 14 (stocks) et ch. 15 (affacturage, titrisation).
// - IAS 8, § 8 (importance relative).
// - Support de cours d'origine : J.-B. Tshimanga Mulumba (CPCC), « IFRS -
//   Stocks, créances & instruments financiers (IAS 2 & IFRS 9) », module 4 ;
//   ses trois illustrations (AGROFOOD, DISTRICOM, TECHMARKET) sont reprises
//   et approfondies. Public visé : entreprises commerciales et industrielles.
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'ue13c4-q1',
    question: "Lequel de ces stocks est exclu des dispositions d'ÉVALUATION d'IAS 2 ?",
    options: [
      { id: 'a', texte: "Les marchandises d'un supermarché de Kinshasa" },
      { id: 'b', texte: "Des terrains détenus pour la revente par un promoteur immobilier" },
      { id: 'c', texte: "Le stock de cobalt d'un courtier négociant qui l'évalue à la juste valeur diminuée des coûts de vente" },
      { id: 'd', texte: "Des pièces détachées destinées à être consommées dans la production" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 2.3(b) écarte des obligations d'évaluation les stocks des courtiers négociants en marchandises qui les évaluent à la juste valeur diminuée des coûts de vente, les variations passant en résultat net. Ils ne sont exclus « que des obligations d'évaluation » (§ 5) : les autres dispositions, notamment les informations à fournir, restent applicables. Les marchandises d'un détaillant et les terrains d'un promoteur sont des stocks au sens du § 8 ; les fournitures consommées dans la production aussi (§ 6(c)).",
    articleRef: "IAS 2.3(b), 2.5, 2.6 et 2.8",
  },
  {
    id: 'ue13c4-q2',
    question: "Quelle affirmation distingue correctement la valeur nette de réalisation (IAS 2) de la juste valeur (IFRS 13) ?",
    options: [
      { id: 'a', texte: "Ce sont deux noms de la même mesure" },
      { id: 'b', texte: "La valeur nette de réalisation est une valeur spécifique à l'entité ; la juste valeur ne l'est pas" },
      { id: 'c', texte: "La juste valeur est toujours inférieure à la valeur nette de réalisation" },
      { id: 'd', texte: "La valeur nette de réalisation ignore les coûts nécessaires pour vendre" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 2.7 : la valeur nette de réalisation est le montant net que l'entité s'attend à réaliser dans le cours normal de son activité, la juste valeur le prix d'une transaction normale entre intervenants du marché. « La première est une valeur spécifique à l'entité, contrairement à la seconde. » Les deux peuvent diverger, dans un sens comme dans l'autre. La valeur nette de réalisation déduit bien les coûts d'achèvement et les coûts nécessaires pour réaliser la vente (§ 6).",
    articleRef: "IAS 2.6-7",
  },
  {
    id: 'ue13c4-q3',
    question: "Achat de marchandises importées : prix facturé 100 000 USD, remise commerciale 5 000, droits de douane 12 000, TVA récupérable 16 000, transport jusqu'à l'entrepôt 3 000. Quel est le coût d'acquisition ?",
    options: [
      { id: 'a', texte: "126 000 USD" },
      { id: 'b', texte: "115 000 USD" },
      { id: 'c', texte: "110 000 USD" },
      { id: 'd', texte: "105 000 USD" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 2.11 : le coût d'acquisition comprend le prix d'achat, les droits de douane et autres taxes « (autres que les taxes ultérieurement récupérables par l'entité auprès des administrations fiscales) », le transport, la manutention et les autres coûts directement attribuables ; les rabais et remises sont déduits. 100 000 − 5 000 + 12 000 + 3 000 = 110 000. La TVA récupérable est une créance sur l'État, pas un coût du stock.",
    articleRef: "IAS 2.10-11",
  },
  {
    id: 'ue13c4-q4',
    question: "Frais généraux fixes de production : 1 200 000 USD par an. Capacité normale : 600 000 casiers. Production réelle, réduite par des délestages électriques : 450 000 casiers. Quel montant de frais fixes incorporer par casier ?",
    options: [
      { id: 'a', texte: "2,00 USD" },
      { id: 'b', texte: "2,67 USD" },
      { id: 'c', texte: "Aucun : les frais fixes sont toujours des charges de période" },
      { id: 'd', texte: "1,71 USD" },
    ],
    reponseCorrecte: 'a',
    explication: "IAS 2.13 : l'affectation des frais fixes est fondée sur la capacité normale, soit 1 200 000 / 600 000 = 2 USD. « Le montant des frais généraux fixes affecté à chaque unité d'œuvre n'est pas augmenté par suite d'une baisse de production ou d'un outil de production inutilisé. » Les 300 000 non imputés (150 000 casiers × 2) sont une charge de la période. La réponse b gonflerait le stock du coût de la sous-activité. Le SYSCOHADA révisé retient la même règle d'imputation rationnelle (Titre VIII, ch. 14, § 2.3.2).",
    articleRef: "IAS 2.12-13 ; SYSCOHADA, Titre VIII, ch. 14",
  },
  {
    id: 'ue13c4-q5',
    question: "Lequel de ces coûts doit être EXCLU du coût des stocks de produits finis ?",
    options: [
      { id: 'a', texte: "L'amortissement des machines de l'usine" },
      { id: 'b', texte: "Le salaire du chef d'atelier" },
      { id: 'c', texte: "Le loyer de l'entrepôt où les produits finis attendent d'être vendus" },
      { id: 'd', texte: "Le stockage de maturation imposé entre deux étapes de la fabrication" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 2.16 exclut les coûts de stockage, « à moins que ces coûts soient nécessaires au processus de production préalablement à une nouvelle étape de la production », les frais administratifs qui ne contribuent pas à amener les stocks à l'endroit et dans l'état où ils se trouvent, les gaspillages anormaux et les frais de commercialisation. Le stockage des produits finis en attente de vente n'est pas nécessaire à la production ; le stockage de maturation l'est. L'amortissement des machines et l'encadrement de l'usine sont des frais généraux de production (§ 12).",
    articleRef: "IAS 2.12 et 2.16",
  },
  {
    id: 'ue13c4-q6',
    question: "Stock initial 1 000 sacs à 20 ; achat de 3 000 à 22 ; sortie de 2 500 ; achat de 2 000 à 25 ; sortie de 2 000. Valeur du stock final selon le coût moyen pondéré recalculé à chaque entrée ?",
    options: [
      { id: 'a', texte: "37 500" },
      { id: 'b', texte: "35 250" },
      { id: 'c', texte: "33 000" },
      { id: 'd', texte: "36 000" },
    ],
    reponseCorrecte: 'b',
    explication: "Après le premier achat : (20 000 + 66 000) / 4 000 = 21,5. Sortie : 2 500 × 21,5 = 53 750 ; reste 1 500 × 21,5 = 32 250. Après le second achat : (32 250 + 50 000) / 3 500 = 23,5. Sortie : 2 000 × 23,5 = 47 000 ; reste 1 500 × 23,5 = **35 250**. La réponse a (37 500) est le résultat du PEPS. IAS 2.27 admet une moyenne « calculée périodiquement ou lors de la réception de chaque nouvelle livraison ».",
    articleRef: "IAS 2.25 et 2.27",
  },
  {
    id: 'ue13c4-q7',
    question: "Une filiale congolaise voudrait évaluer ses stocks selon la méthode « dernier entré, premier sorti », parce que les prix montent vite. Est-ce possible en IFRS ?",
    options: [
      { id: 'a', texte: "Oui, si la méthode est appliquée de façon permanente" },
      { id: 'b', texte: "Oui, si l'administration fiscale l'accepte" },
      { id: 'c', texte: "Non : pour les biens fongibles, seuls le PEPS et le coût moyen pondéré sont admis" },
      { id: 'd', texte: "Oui, pour les seuls stocks situés hors de la zone euro" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 2.25 : le coût des stocks fongibles « doit être déterminé en utilisant la méthode du premier entré, premier sorti (PEPS) ou celle du coût moyen pondéré ». Le DEPS n'est pas prévu. Le § 26 ajoute qu'une différence de situation géographique « (ou dans les règles fiscales applicables) n'est pas suffisante en soi pour justifier l'utilisation de méthodes différentes ». Seuls les biens non fongibles ou affectés à des projets spécifiques relèvent de l'identification spécifique (§ 23).",
    articleRef: "IAS 2.23-26",
  },
  {
    id: 'ue13c4-q8',
    question: "Un fabricant veut déprécier globalement « ses produits finis » de 10 %, parce que certains articles se vendent mal. Que dit IAS 2 ?",
    options: [
      { id: 'a', texte: "C'est la méthode normale" },
      { id: 'b', texte: "La dépréciation se fait en principe élément par élément ; une dépréciation par catégorie comme « les produits finis » n'est pas appropriée" },
      { id: 'c', texte: "La dépréciation n'est permise qu'à la vente effective" },
      { id: 'd', texte: "Il faut déprécier l'ensemble des stocks du secteur opérationnel" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 2.29 : les stocks sont habituellement dépréciés élément par élément, avec un regroupement possible d'éléments similaires d'une même ligne de produits. « Il n'est cependant pas approprié de déprécier les stocks en fonction de leur catégorie, par exemple les produits finis, ou encore l'ensemble des stocks d'un secteur opérationnel. » Le SYSCOHADA révisé dit de même : un faible taux de rotation est un indice, mais il ne peut justifier une dépréciation forfaitaire (Titre VIII, ch. 14, § 3.2.3.2).",
    articleRef: "IAS 2.29 ; SYSCOHADA, Titre VIII, ch. 14",
  },
  {
    id: 'ue13c4-q9',
    question: "Le prix du clinker acheté par une cimenterie baisse de 20 % à la clôture. Le ciment dans lequel il sera incorporé se vendra toujours au-dessus de son coût. Faut-il déprécier le stock de clinker ?",
    options: [
      { id: 'a', texte: "Oui, de 20 %" },
      { id: 'b', texte: "Oui, à son coût de remplacement" },
      { id: 'c', texte: "Non, puisque le produit fini sera vendu au coût ou au-dessus" },
      { id: 'd', texte: "Non, les matières premières ne sont jamais dépréciées" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 2.32 : les matières premières « ne sont pas dépréciées en dessous du coût s'il est attendu que les produits finis dans lesquels elles seront incorporées seront vendus au coût ou au-dessus de celui-ci ». Ce n'est que si la baisse indique que le coût du produit fini dépasse sa valeur nette de réalisation qu'on les déprécie, le coût de remplacement pouvant alors être la meilleure mesure disponible. La réponse d est fausse : la dépréciation reste possible.",
    articleRef: "IAS 2.32",
  },
  {
    id: 'ue13c4-q10',
    question: "Fin N, 1 500 sacs au coût de 25 ont été dépréciés à 24 (dépréciation de 1 500). Fin N+1, il en reste 800 et leur valeur nette de réalisation est remontée à 27. Quel montant reprendre ?",
    options: [
      { id: 'a', texte: "1 500" },
      { id: 'b', texte: "800" },
      { id: 'c', texte: "2 400" },
      { id: 'd', texte: "Aucun : une dépréciation de stocks n'est jamais reprise" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 2.33 : la dépréciation fait l'objet d'une reprise « (c'est-à-dire que la reprise est limitée au montant de la dépréciation initiale) », de sorte que la valeur comptable soit le plus faible du coût et de la valeur nette de réalisation révisée. Pour les 800 sacs restants, la dépréciation était de 800 × 1 = 800 ; la valeur remonte au coût, 800 × 25 = 20 000, pas à 27. La dépréciation afférente aux sacs vendus est sortie avec eux. La reprise vient en réduction du coût des stocks comptabilisé en charges (§ 34).",
    articleRef: "IAS 2.33-34",
  },
  {
    id: 'ue13c4-q11',
    question: "Une entité détient 1 000 tonnes de farine ; 600 sont engagées dans un contrat de vente ferme à 410 la tonne, le prix du marché étant tombé à 380. Sur quelle base estimer la valeur nette de réalisation ?",
    options: [
      { id: 'a', texte: "380 pour les 1 000 tonnes" },
      { id: 'b', texte: "410 pour les 1 000 tonnes" },
      { id: 'c', texte: "410 pour les 600 tonnes sous contrat, 380 pour les 400 autres, avant coûts de vente" },
      { id: 'd', texte: "La moyenne des deux prix" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 2.31 : la valeur nette de réalisation des quantités détenues pour satisfaire des contrats fermes « est fondée sur le prix spécifié dans le contrat » ; celle des quantités en excédent, sur les prix de vente généraux. Les deux prix se déduisent ensuite des coûts nécessaires pour réaliser la vente. Le SYSCOHADA révisé retient une règle voisine : pas de dépréciation d'un stock couvert par un contrat de vente ferme dont le prix couvre la valeur d'entrée et les frais restant à supporter (Titre VIII, ch. 14, § 4.2).",
    articleRef: "IAS 2.31 ; SYSCOHADA, Titre VIII, ch. 14",
  },
  {
    id: 'ue13c4-q12',
    question: "Lequel de ces éléments N'EST PAS un actif financier au sens d'IAS 32 ?",
    options: [
      { id: 'a', texte: "Une créance sur un client" },
      { id: 'b', texte: "Des actions d'une autre société" },
      { id: 'c', texte: "Une avance versée à un fournisseur, qui sera réglée par la livraison de marchandises" },
      { id: 'd', texte: "Un dépôt à terme dans une banque" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 32.11 : un actif financier est de la trésorerie, un instrument de capitaux propres d'une autre entité, un droit contractuel de recevoir de la trésorerie ou un autre actif financier, ou certains contrats réglés en instruments propres. L'avance au fournisseur donne droit à des marchandises, non à de la trésorerie : c'est un actif non financier. La créance client, les actions et le dépôt à terme sont des actifs financiers.",
    articleRef: "IAS 32.11",
  },
  {
    id: 'ue13c4-q13',
    question: "À quel montant comptabiliser initialement une créance client née d'une vente payable à 60 jours, sans composante financement importante ?",
    options: [
      { id: 'a', texte: "À sa valeur actualisée au taux du marché" },
      { id: 'b', texte: "Au prix de transaction au sens d'IFRS 15" },
      { id: 'c', texte: "À sa juste valeur majorée des frais de relance" },
      { id: 'd', texte: "Au montant encaissable diminué des pertes de crédit attendues" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 9.5.1.3 : par exception au § 5.1.1, les créances clients sont évaluées initialement « à leur prix de transaction (au sens d'IFRS 15) lorsque celles-ci ne comportent pas une composante financement importante ». Les pertes de crédit attendues ne réduisent pas l'évaluation initiale : elles font l'objet d'une correction de valeur distincte (section 5.5), à constater dès l'origine.",
    articleRef: "IFRS 9.5.1.1 et 5.1.3",
  },
  {
    id: 'ue13c4-q14',
    question: "Une entité achète des actions cotées pour les revendre à court terme ; elle paie 2 % de courtage. Comment traiter ce courtage ?",
    options: [
      { id: 'a', texte: "L'ajouter au coût des actions" },
      { id: 'b', texte: "Le comptabiliser en charges : les coûts de transaction ne s'ajoutent qu'aux instruments qui ne sont pas à la juste valeur par le biais du résultat net" },
      { id: 'c', texte: "L'étaler sur la durée de détention prévue" },
      { id: 'd', texte: "Le porter en autres éléments du résultat global" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 9.5.1.1 : l'actif est évalué à sa juste valeur « majorée ou minorée, dans le cas d'un actif financier ou d'un passif financier qui n'est pas à la juste valeur par le biais du résultat net, des coûts de transaction ». Des actions détenues à des fins de transaction sont à la juste valeur par le biais du résultat net : le courtage est une charge immédiate. Pour un actif au coût amorti, il serait intégré au taux d'intérêt effectif.",
    articleRef: "IFRS 9.5.1.1 ; annexe A",
  },
  {
    id: 'ue13c4-q15',
    question: "Une société industrielle place sa trésorerie excédentaire en bons du Trésor, qu'elle conserve jusqu'à l'échéance pour en percevoir les coupons ; leurs flux sont uniquement du principal et des intérêts. Quel classement ?",
    options: [
      { id: 'a', texte: "Coût amorti" },
      { id: 'b', texte: "Juste valeur par le biais des autres éléments du résultat global" },
      { id: 'c', texte: "Juste valeur par le biais du résultat net" },
      { id: 'd', texte: "Au coût historique, sans dépréciation" },
    ],
    reponseCorrecte: 'a',
    explication: "IFRS 9.4.1.2 : l'actif est au coût amorti si sa détention s'inscrit dans un modèle économique « dont l'objectif est de détenir des actifs financiers afin d'en percevoir les flux de trésorerie contractuels » et si ses flux correspondent uniquement à du principal et des intérêts sur le principal restant dû. Il reste soumis au modèle de dépréciation (§ 5.5.1). La réponse d décrit une pratique antérieure sans fondement en IFRS 9.",
    articleRef: "IFRS 9.4.1.2 et 5.5.1",
  },
  {
    id: 'ue13c4-q16',
    question: "Un groupe agro-industriel place ses excédents de trésorerie en obligations qu'il garde pour leurs coupons, mais qu'il vend régulièrement pour financer ses campagnes d'achat de maïs. Où vont les variations de juste valeur ?",
    options: [
      { id: 'a', texte: "En résultat net, immédiatement" },
      { id: 'b', texte: "En autres éléments du résultat global, recyclées en résultat net à la décomptabilisation ; intérêts et pertes de crédit en résultat net" },
      { id: 'c', texte: "En autres éléments du résultat global, sans jamais de recyclage" },
      { id: 'd', texte: "Nulle part : l'actif reste au coût amorti" },
    ],
    reponseCorrecte: 'b',
    explication: "Le modèle « percevoir et vendre » (IFRS 9.4.1.2A ; B4.1.4A, qui cite la gestion des besoins quotidiens de liquidités et l'adossement actif-passif) conduit à la juste valeur par le biais des autres éléments du résultat global. Selon le § 5.7.10, le cumul est reclassé en résultat net à la décomptabilisation ; les intérêts au taux effectif, les pertes de valeur et les écarts de change vont en résultat net. Le résultat net est ainsi le même qu'au coût amorti (§ 5.7.11). La réponse c vise les actions désignées selon le § 5.7.5.",
    articleRef: "IFRS 9.4.1.2A, 5.7.10-5.7.11 ; B4.1.4A",
  },
  {
    id: 'ue13c4-q17',
    question: "Une entité détient une obligation convertible en un nombre fixe d'actions de l'émetteur. Comment la classer chez le porteur ?",
    options: [
      { id: 'a', texte: "Coût amorti pour la partie obligataire, juste valeur pour l'option" },
      { id: 'b', texte: "Juste valeur par le biais du résultat net, en totalité" },
      { id: 'c', texte: "Juste valeur par le biais des autres éléments du résultat global" },
      { id: 'd', texte: "Coût amorti, en totalité" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 9.B4.1.14 (instrument F) : le porteur analyse l'obligation convertible dans sa totalité ; ses flux ne sont pas uniquement du principal et des intérêts, car ils représentent « un rendement qui ne concorde pas avec un contrat de prêt de base », lié à la valeur des actions de l'émetteur. L'actif échoue au critère des flux contractuels et relève de la juste valeur par le biais du résultat net (§ 4.1.4). On ne sépare pas de dérivé incorporé d'un actif financier (§ 4.3.2-4.3.3).",
    articleRef: "IFRS 9.4.1.4 et B4.1.14",
  },
  {
    id: 'ue13c4-q18',
    question: "Une entité détient une participation stratégique minoritaire, non détenue à des fins de transaction, et choisit à l'origine de présenter ses variations de juste valeur en autres éléments du résultat global. Que se passe-t-il à la cession ?",
    options: [
      { id: 'a', texte: "Le cumul est reclassé en résultat net" },
      { id: 'b', texte: "Le cumul n'est jamais viré en résultat net ; il peut être transféré à une autre composante des capitaux propres" },
      { id: 'c', texte: "Le choix est annulé et le titre est réévalué en résultat" },
      { id: 'd', texte: "Le cumul est porté en réserve légale" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 9.5.7.5 ouvre un choix irrévocable, fait titre par titre (B5.7.1). Selon B5.7.1, « Les montants présentés dans les autres éléments du résultat global ne doivent pas être virés ultérieurement au résultat net. » L'entité peut transférer le cumul à une autre composante des capitaux propres. Les dividendes vont en résultat net (§ 5.7.6), sauf s'ils représentent clairement la récupération d'une partie du coût du placement. Il n'y a pas de test de dépréciation sur ces titres.",
    articleRef: "IFRS 9.5.7.5-5.7.6 ; B5.7.1",
  },
  {
    id: 'ue13c4-q19',
    question: "Une société gère un portefeuille d'obligations pour en percevoir les coupons, mais vend chaque année celles dont l'émetteur voit son risque de crédit fortement dégradé. Ces ventes remettent-elles en cause le modèle « percevoir » ?",
    options: [
      { id: 'a', texte: "Oui, toute vente l'interdit" },
      { id: 'b', texte: "Oui, au-delà de trois ventes par an" },
      { id: 'c', texte: "Non : les ventes dues à une augmentation du risque de crédit ne vont pas à l'encontre de ce modèle, quelles que soient leur fréquence et leur valeur" },
      { id: 'd', texte: "Non, à condition que les ventes soient imposées par un prêteur" },
    ],
    reponseCorrecte: 'c',
    explication: "IFRS 9.B4.1.3A : « Sans égard à leur fréquence et à leur valeur, les ventes attribuables à une augmentation du risque de crédit de l'actif ne vont pas à l'encontre d'un modèle économique dont l'objectif est de détenir des actifs financiers afin d'en percevoir les flux de trésorerie contractuels ». Pour les autres ventes, B4.1.3B regarde la fréquence et la valeur ; la question de savoir si la vente est exigée par un tiers « n'est pas pertinente ».",
    articleRef: "IFRS 9.B4.1.3-B4.1.3B",
  },
  {
    id: 'ue13c4-q20',
    question: "Quand une entité peut-elle reclasser un actif financier du coût amorti vers la juste valeur ?",
    options: [
      { id: 'a', texte: "À tout moment, si la direction le juge utile" },
      { id: 'b', texte: "Lorsqu'elle change de modèle économique pour la gestion des actifs financiers, et seulement alors" },
      { id: 'c', texte: "Chaque fois que la juste valeur dépasse le coût amorti" },
      { id: 'd', texte: "Jamais" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 9.4.4.1 : « Lorsque l'entité change de modèle économique pour la gestion des actifs financiers, et seulement alors, elle doit reclasser tous les actifs financiers touchés ». Du coût amorti vers la juste valeur par le biais du résultat net, l'écart entre l'ancien coût amorti et la juste valeur va en résultat net (§ 5.6.2) ; vers la juste valeur par le biais des autres éléments du résultat global, il va en autres éléments du résultat global, sans ajustement du taux effectif ni des pertes attendues (§ 5.6.4).",
    articleRef: "IFRS 9.4.4.1 et 5.6.2-5.6.4",
  },
  {
    id: 'ue13c4-q21',
    question: "Lequel de ces éléments N'ENTRE PAS dans le calcul du taux d'intérêt effectif d'un prêt ?",
    options: [
      { id: 'a', texte: "Les frais de dossier payés ou perçus à l'octroi" },
      { id: 'b', texte: "Les coûts de transaction marginaux" },
      { id: 'c', texte: "Les pertes de crédit attendues" },
      { id: 'd', texte: "Une décote à l'émission" },
    ],
    reponseCorrecte: 'c',
    explication: "Annexe A d'IFRS 9 : pour calculer le taux d'intérêt effectif, l'entité estime les flux en tenant compte de toutes les modalités contractuelles, « mais elle ne doit pas tenir compte des pertes de crédit attendues ». Le calcul inclut en revanche les commissions et frais qui font partie intégrante du taux, les coûts de transaction et les surcotes ou décotes. Exception : pour un actif déprécié dès son acquisition ou sa création, on utilise un taux ajusté en fonction de la qualité de crédit.",
    articleRef: "IFRS 9, annexe A ; B5.4.1-B5.4.3",
  },
  {
    id: 'ue13c4-q22',
    question: "Une société emprunte 100 000 USD sur 3 ans, intérêt de 10 % payé chaque année, remboursement in fine ; la banque retient 3 000 de frais de dossier et la société encaisse net 97 000. Le taux effectif est d'environ 11,23 %. Quelle charge d'intérêts la première année ?",
    options: [
      { id: 'a', texte: "10 000" },
      { id: 'b', texte: "11 000" },
      { id: 'c', texte: "10 896" },
      { id: 'd', texte: "13 000" },
    ],
    reponseCorrecte: 'c',
    explication: "L'emprunt est un passif financier au coût amorti (IFRS 9.4.2.1) ; les frais de dossier viennent en déduction de sa valeur initiale (§ 5.1.1) et le taux effectif les étale (annexe A). Charge de N : 97 000 × 11,23 % ≈ 10 896. Sur ce montant, 10 000 sont payés et 896 augmentent le coût amorti de la dette, qui passe à 97 896. Les 3 000 de frais ne sont donc ni une charge immédiate (réponse d) ni ignorés (réponse a) : ils renchérissent le coût du crédit sur toute sa durée.",
    articleRef: "IFRS 9.4.2.1, 5.1.1 ; annexe A",
  },
  {
    id: 'ue13c4-q23',
    question: "Une société prête 10 000 USD à l'un de ses cadres, sans intérêt, remboursable en une fois dans deux ans. Le taux du marché pour un prêt comparable est de 8 %. À quel montant comptabiliser le prêt à l'origine ?",
    options: [
      { id: 'a', texte: "10 000 USD, le montant versé" },
      { id: 'b', texte: "Environ 8 573 USD, soit la valeur actualisée au taux du marché" },
      { id: 'c', texte: "8 400 USD, soit 10 000 moins deux années d'intérêts simples" },
      { id: 'd', texte: "Zéro, le prêt étant un avantage du personnel" },
    ],
    reponseCorrecte: 'b',
    explication: "Lorsqu'une part de la contrepartie versée l'est pour autre chose que l'instrument financier, l'entité doit évaluer sa juste valeur ; B5.1.1 cite précisément le prêt à long terme qui ne porte pas intérêt, évalué à la valeur actualisée des encaissements futurs au taux du marché d'un instrument similaire : 10 000 / 1,08² ≈ 8 573. « Tout excédent prêté constitue une charge ou une réduction des produits, à moins qu'il ne remplisse les conditions de comptabilisation en tant qu'autre type d'actif » : ici, les 1 427 rémunèrent le cadre. Le prêt produit ensuite des intérêts au taux effectif de 8 %.",
    articleRef: "IFRS 9.5.1.1 ; B5.1.1",
  },
  {
    id: 'ue13c4-q24',
    question: "À la clôture, le risque de crédit d'un prêt n'a pas augmenté de façon importante depuis son octroi. Quelle correction de valeur comptabiliser ?",
    options: [
      { id: 'a', texte: "Aucune, tant qu'il n'y a pas d'impayé" },
      { id: 'b', texte: "Les pertes de crédit attendues pour les 12 mois à venir" },
      { id: 'c', texte: "Les pertes de crédit attendues pour la durée de vie" },
      { id: 'd', texte: "Une provision forfaitaire de 1 % de l'encours" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 9.5.5.5 : sans augmentation importante du risque, la correction de valeur est évaluée « au montant des pertes de crédit attendues pour les 12 mois à venir ». Dès que le risque a augmenté de façon importante, on passe aux pertes attendues pour la durée de vie (§ 5.5.3). La réponse a décrit l'ancien modèle des pertes subies, que la norme a précisément abandonné : une correction est due dès l'octroi.",
    articleRef: "IFRS 9.5.5.3 et 5.5.5",
  },
  {
    id: 'ue13c4-q25',
    question: "Quelles présomptions IFRS 9 attache-t-il aux retards de paiement ?",
    options: [
      { id: 'a', texte: "30 jours : défaillance ; 90 jours : passage en perte" },
      { id: 'b', texte: "Plus de 30 jours : augmentation importante du risque de crédit ; défaillance au plus tard 90 jours après l'échéance ; les deux présomptions sont réfutables" },
      { id: 'c', texte: "60 jours et 180 jours, présomptions irréfragables" },
      { id: 'd', texte: "Aucune : seuls les délais contractuels de paiement comptent" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 9.5.5.11 : il existe une présomption réfutable d'augmentation importante du risque de crédit « lorsque les paiements contractuels sont en souffrance depuis plus de 30 jours » ; B5.5.19 y voit le moment le plus tardif du passage aux pertes pour la durée de vie. B5.5.37 : présomption réfutable que la défaillance ne peut se situer plus de 90 jours après l'échéance impayée. Pour les créances clients, l'approche simplifiée dispense de ce suivi (§ 5.5.15).",
    articleRef: "IFRS 9.5.5.11 ; B5.5.19 ; B5.5.37",
  },
  {
    id: 'ue13c4-q26',
    question: "Pour ses créances clients sans composante financement importante, un distributeur doit-il suivre l'augmentation du risque de crédit créance par créance ?",
    options: [
      { id: 'a', texte: "Oui, comme pour un prêt" },
      { id: 'b', texte: "Non : la correction de valeur est toujours égale aux pertes attendues pour la durée de vie, et une matrice fondée sur l'antériorité des créances est une simplification admise" },
      { id: 'c', texte: "Non : les créances clients sont exclues du modèle de dépréciation" },
      { id: 'd', texte: "Oui, mais seulement pour les créances de plus de 90 jours" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 9.5.5.15(a) : pour les créances clients et actifs sur contrat relevant d'IFRS 15 sans composante financement importante, l'entité « doit toujours évaluer la correction de valeur pour pertes au montant des pertes de crédit attendues pour la durée de vie ». Plus de suivi des étapes. B5.5.35 cite la matrice de calcul, avec des taux par tranche de retard fondés sur l'historique, ajusté des informations actuelles et prospectives.",
    articleRef: "IFRS 9.5.5.15 ; B5.5.35",
  },
  {
    id: 'ue13c4-q27',
    question: "DISTRICOM SA : créances non échues 200 000 (taux de perte attendu 1 %), 1 à 30 jours 100 000 (5 %), 31 à 60 jours 60 000 (15 %), plus de 60 jours 40 000 (40 %). Quelle perte de crédit attendue comptabiliser ?",
    options: [
      { id: 'a', texte: "16 000" },
      { id: 'b', texte: "25 000" },
      { id: 'c', texte: "32 000" },
      { id: 'd', texte: "40 000" },
    ],
    reponseCorrecte: 'c',
    explication: "2 000 + 5 000 + 9 000 + 16 000 = **32 000**, soit 8 % de l'encours de 400 000. La réponse a ne retient que la tranche de plus de 60 jours, à la manière d'une dépréciation individuelle des seules créances douteuses. Or la matrice d'IFRS 9 (B5.5.35) couvre toutes les créances, y compris celles qui ne sont pas échues : même un client à jour porte une perte attendue.",
    articleRef: "IFRS 9.5.5.15 ; B5.5.35",
  },
  {
    id: 'ue13c4-q28',
    question: "Qu'est-ce qui oppose le plus nettement la dépréciation des créances du SYSCOHADA révisé à celle d'IFRS 9 ?",
    options: [
      { id: 'a', texte: "Le SYSCOHADA interdit toute dépréciation des créances" },
      { id: 'b', texte: "Le SYSCOHADA exige une dépréciation certaine quant à sa nature, sur des créances individualisées et justifiées ; IFRS 9 constate des pertes attendues dès l'origine, y compris sur des créances saines" },
      { id: 'c', texte: "IFRS 9 ne permet pas de reprise" },
      { id: 'd', texte: "Aucune différence de fond" },
    ],
    reponseCorrecte: 'b',
    explication: "Le commentaire du compte 49 du SYSCOHADA révisé exige que la dépréciation soit « certaine quant à sa nature », que la créance soit individualisée, et que l'entité puisse justifier les motifs qui la rendent douteuse ou litigieuse ; les événements survenus après la clôture ne sont pas pris en compte. La logique est celle de la perte subie. IFRS 9 constate une perte attendue sur toutes les créances, pondérée par les probabilités et nourrie d'informations prospectives (§ 5.5.17).",
    articleRef: "SYSCOHADA, Titre VII, compte 49 ; IFRS 9.5.5.17",
  },
  {
    id: 'ue13c4-q29',
    question: "Une entité cède 200 000 de créances à un factor, qui peut lui retourner toute facture impayée (recours intégral). Que devient la créance en IFRS 9 ?",
    options: [
      { id: 'a', texte: "Elle est décomptabilisée à la remise des factures" },
      { id: 'b', texte: "Elle reste au bilan : l'entité conserve la quasi-totalité des risques ; le financement reçu est un passif" },
      { id: 'c', texte: "Elle est décomptabilisée pour moitié" },
      { id: 'd', texte: "Elle est reclassée en stocks" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 9.3.2.6(b) : si l'entité conserve la quasi-totalité des risques et avantages, « elle doit laisser l'actif financier comptabilisé ». Avec un recours intégral, le risque d'impayé reste chez le cédant : l'opération est un financement garanti par les créances, et la trésorerie reçue est un passif financier (§ 4.2.1(b)). Le SYSCOHADA révisé solde en revanche le compte 411 par le compte 4716 Compte d'affacturage dès la subrogation (Titre VIII, ch. 15).",
    articleRef: "IFRS 9.3.2.3, 3.2.6 et 4.2.1(b)",
  },
  {
    id: 'ue13c4-q30',
    question: "Laquelle de ces conditions est exigée pour appliquer la comptabilité de couverture selon IFRS 9 ?",
    options: [
      { id: 'a', texte: "Une efficacité comprise entre 80 % et 125 %" },
      { id: 'b', texte: "Une désignation formelle et une documentation dès l'origine de la relation" },
      { id: 'c', texte: "L'accord préalable du commissaire aux comptes" },
      { id: 'd', texte: "Un instrument de couverture coté" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 9.6.4.1(b) : la relation doit faire l'objet « dès son origine d'une désignation formelle et d'une documentation structurée » (instrument, élément couvert, risque couvert, appréciation de l'efficacité). Le § 6.4.1(c) exige un lien économique, un risque de crédit non dominant et un ratio de couverture cohérent. La fourchette de 80 à 125 % (réponse a) est celle d'IAS 39 (AG105(b)) ; IFRS 9 ne l'a pas reprise.",
    articleRef: "IFRS 9.6.4.1 ; IAS 39.AG105",
  },
  {
    id: 'ue13c4-q31',
    question: "Un emprunt bancaire ordinaire, non détenu à des fins de transaction, est évalué après sa comptabilisation initiale…",
    options: [
      { id: 'a', texte: "À la juste valeur par le biais du résultat net" },
      { id: 'b', texte: "Au coût amorti, selon la méthode du taux d'intérêt effectif" },
      { id: 'c', texte: "À sa valeur nominale, les frais étant en charges" },
      { id: 'd', texte: "À la juste valeur par le biais des autres éléments du résultat global" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 9.4.2.1 : l'entité classe « comme étant ultérieurement évalués au coût amorti tous les passifs financiers à l'exception » de ceux qu'il énumère (passifs à la juste valeur par le biais du résultat net, garanties financières, etc.). Les frais d'émission de l'emprunt viennent en déduction de sa valeur initiale (§ 5.1.1) et sont étalés par le taux effectif. Le gain ou la perte à l'extinction va en résultat net (§ 3.3.3).",
    articleRef: "IFRS 9.4.2.1, 5.1.1 et 3.3.3",
  },
  {
    id: 'ue13c4-q32',
    question: "Un prêt devient un actif financier déprécié (difficultés financières importantes de l'emprunteur). Comment calculer ensuite les produits d'intérêts ?",
    options: [
      { id: 'a', texte: "Sur la valeur comptable brute, comme avant" },
      { id: 'b', texte: "Sur le coût amorti, c'est-à-dire net de la correction de valeur pour pertes" },
      { id: 'c', texte: "On cesse de comptabiliser des intérêts" },
      { id: 'd', texte: "Au taux de pénalité contractuel" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 9.5.4.1(b) : pour un actif devenu déprécié après son octroi, l'entité applique le taux effectif « au coût amorti de l'actif financier » dans les périodes suivantes, donc net de la correction de valeur. Les indications de dépréciation sont listées à l'annexe A (difficultés financières importantes, défaillance, faveurs accordées, probabilité de faillite...). Lorsque plus aucun recouvrement n'est raisonnablement attendu, la valeur brute est directement réduite (§ 5.4.4).",
    articleRef: "IFRS 9.5.4.1(b), 5.4.4 ; annexe A",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '4.1',
    titre: "IAS 2 : ce qu'est un stock et la règle qui le gouverne",
    navLabel: 'IAS 2 : principe',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Stocks et créances clients occupent une place centrale dans les états financiers d'une entreprise commerciale ou industrielle, parce qu'ils sont exposés aux risques économiques du quotidien : le risque de ne pas vendre, le risque d'obsolescence, le risque de ne pas être payé. À la différence des immobilisations, ils sont destinés à se transformer rapidement en chiffre d'affaires puis en trésorerie. IAS 2 et IFRS 9 poursuivent donc un même objectif : éviter que l'entreprise présente au bilan des actifs courants pour des montants qu'elle ne récupérera pas. Chacune le fait avec sa propre technique, et c'est cette différence que le chapitre explore.",
      },
      {
        type: 'paragraphe',
        texte: "Le stock est l'actif le plus ordinaire du bilan, et pourtant l'un des plus manipulables. Tout coût porté en stock quitte le compte de résultat de l'exercice pour réapparaître, plus tard, en coût des ventes. IAS 2 répond donc à une seule question de fond : « celle du montant des coûts à comptabiliser en tant qu'actif et à différer jusqu'à la comptabilisation des produits correspondants » (§ 1). Chaque euro, chaque franc ou chaque dollar mal classé déplace du résultat d'une période à l'autre.",
      },
      {
        type: 'carte',
        titre: "Définitions et champ (§ 2-8)",
        liste: [
          "**Les stocks** sont des actifs « (a) détenus en vue de la vente dans le cours normal de l'activité ; (b) en cours de production pour une telle vente ; ou (c) sous forme de matières premières ou de fournitures devant être consommées dans le processus de production ou de prestation de services » (§ 6).",
          "**Ce qui en fait partie** : marchandises d'un détaillant, terrains ou immeubles détenus pour la revente par un promoteur, produits finis, en-cours, matières et fournitures (§ 8).",
          "**Hors champ** : instruments financiers (IAS 32 et IFRS 9), actifs biologiques et produits agricoles au moment de la récolte (IAS 41) (§ 2).",
          "**Exclus des seules règles d'évaluation** : producteurs agricoles, forestiers et miniers qui évaluent leurs stocks à la valeur nette de réalisation selon des pratiques bien établies dans leur secteur, et courtiers négociants qui les évaluent à la juste valeur diminuée des coûts de vente ; dans les deux cas, les variations passent en résultat net (§ 3-5).",
        ],
      },
      { type: 'controle', question: QCM[0] },
      {
        type: 'filet',
        titre: "Une règle d'évaluation en une ligne (§ 9)",
        texte: "« Les stocks doivent être évalués au plus faible du coût et de la valeur nette de réalisation. » La valeur nette de réalisation est « le prix de vente estimé dans le cours normal de l'activité, diminué des coûts estimés pour l'achèvement et des coûts estimés nécessaires pour réaliser la vente » (§ 6). Elle n'est pas la juste valeur : « La première est une valeur spécifique à l'entité, contrairement à la seconde. » (§ 7).",
      },
      { type: 'controle', question: QCM[1] },
      {
        type: 'filet',
        titre: "Le concentré de cuivre peut-il échapper au coût ?",
        texte: "Un producteur de cuivre du Katanga peut-il évaluer son concentré à la valeur nette de réalisation, variations en résultat, plutôt qu'au plus faible du coût et de cette valeur ? IAS 2.3(a) et 2.4 ne le permettent que si la pratique est « bien établie » dans le secteur, et donnent des exemples de conditions : vente assurée par un contrat à terme ou une garantie de l'État, ou marché actif avec un risque de mévente négligeable. Le cuivre coté remplit en principe la seconde condition ; un produit intermédiaire sans débouché liquide, beaucoup moins. L'entité doit documenter la pratique invoquée, et le choix engage la volatilité de son résultat. Par défaut, c'est la règle générale du § 9 qui s'applique.",
      },
    ],
  },
  {
    numero: '4.2',
    titre: "IAS 2 : construire le coût, choisir la formule",
    navLabel: 'IAS 2 : le coût',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le coût des stocks comprend « tous les coûts d'acquisition, coûts de transformation et autres coûts engagés pour amener les stocks à l'endroit et dans l'état où ils se trouvent » (§ 10). Le critère est double : un lien avec le stock, et une contribution à le mettre en place et en état. Le coût d'acquisition comprend le prix d'achat, les droits de douane et taxes non récupérables, le transport et la manutention, remises et rabais déduits (§ 11). Pour une entreprise congolaise qui importe par Matadi ou par la frontière zambienne, les droits de douane et les frais d'acheminement pèsent souvent plus lourd que la marge ; les oublier fausse toute la chaîne.",
      },
      { type: 'controle', question: QCM[2] },
      {
        type: 'paragraphe',
        texte: "Le coût de transformation comprend les coûts directs, comme la main-d'œuvre directe, et une affectation systématique des frais généraux de production, variables et fixes (§ 12). Là se loge la principale difficulté technique de la norme : les frais fixes sont imputés sur la base de la **capacité normale**, c'est-à-dire la production moyenne attendue sur plusieurs périodes dans des circonstances normales, entretien planifié compris (§ 13). Les frais non imputés du fait d'une sous-activité sont une charge de la période. À l'inverse, en période de production anormalement élevée, la part de frais fixes par unité est diminuée « de telle sorte que les stocks ne soient pas évalués au-dessus du coût ».",
      },
      {
        type: 'carte',
        titre: "Les délestages coûtent, mais pas au stock (brasserie du Kasaï, société fictive)",
        texte: "Frais généraux fixes de production de l'exercice : 1 200 000 USD. Capacité normale : 600 000 casiers. Production réelle, réduite par les coupures d'électricité : 450 000 casiers. Coûts variables (matières, main-d'œuvre directe, frais variables) : 3 USD par casier. 50 000 casiers restent en stock à la clôture.",
        tableau: {
          entetes: ['', 'Imputation rationnelle (IAS 2.13)', 'Imputation de tous les frais fixes (erronée)'],
          lignes: [
            ['Frais fixes par casier', '1 200 000 / 600 000 = 2,00', '1 200 000 / 450 000 = 2,67'],
            ['Coût unitaire', '3 + 2 = **5,00**', '3 + 2,67 = 5,67'],
            ['Frais fixes imputés à la production', '450 000 × 2 = 900 000', '1 200 000'],
            ['Charge de sous-activité', '**300 000**, en charges de la période', '0'],
            ['Stock final (50 000 casiers)', '**250 000**', '283 333'],
          ],
        },
        note: "L'imputation de tous les frais fixes transférerait 33 333 USD de coût de la sous-activité dans le stock, donc dans le résultat de l'exercice suivant. La sous-activité est un coût de la période où elle survient, non un coût du produit. Le SYSCOHADA révisé retient exactement la même méthode, sous le nom d'imputation rationnelle des charges fixes (Titre VIII, ch. 14, § 2.3.2).",
      },
      { type: 'controle', question: QCM[3] },
      {
        type: 'carte',
        titre: "Ce qui n'entre jamais dans le coût (§ 16-18)",
        liste: [
          "Les **montants anormaux** de matière, de main-d'œuvre ou d'autres coûts de production gaspillés.",
          "Les **coûts de stockage**, sauf s'ils sont nécessaires au processus de production avant une nouvelle étape : la maturation d'une bière ou le séchage d'un bois, oui ; l'entrepôt des produits finis qui attendent un acheteur, non.",
          "Les **frais administratifs** qui ne contribuent pas à amener les stocks à l'endroit et dans l'état où ils se trouvent, et les **frais de commercialisation**.",
          "L'**élément de financement** d'un achat à paiement différé : la différence entre le prix pour un crédit normal et le montant payé est une charge d'intérêt sur la durée du financement (§ 18). Les coûts d'emprunt ne sont incorporés que dans les cas limités prévus par IAS 23 (§ 17).",
        ],
      },
      { type: 'controle', question: QCM[4] },
      {
        type: 'paragraphe',
        texte: "Reste à affecter le coût aux unités vendues et aux unités restantes. Pour les biens non fongibles ou affectés à des projets spécifiques, l'identification spécifique est obligatoire (§ 23). Pour les autres, la norme n'admet que deux formules : « la méthode du premier entré, premier sorti (PEPS) ou celle du coût moyen pondéré » (§ 25). Le dernier entré, premier sorti n'en fait pas partie. La même formule s'applique à tous les stocks de nature et d'usage similaires ; une différence de situation géographique ou de règles fiscales ne suffit pas à justifier des formules différentes (§ 26).",
      },
      {
        type: 'carte',
        titre: "Mêmes sacs de ciment, deux résultats : PEPS ou coût moyen",
        texte: "Stock initial 1 000 sacs à 20 ; achat de 3 000 sacs à 22 ; sortie de 2 500 ; achat de 2 000 à 25 ; sortie de 2 000. Coût total disponible : 20 000 + 66 000 + 50 000 = 136 000. Stock final : 1 500 sacs.",
        tableau: {
          entetes: ['', 'PEPS', 'Coût moyen pondéré (à chaque entrée)'],
          lignes: [
            ['Sortie 1 (2 500 sacs)', '1 000 × 20 + 1 500 × 22 = 53 000', '2 500 × 21,5 = 53 750'],
            ['Sortie 2 (2 000 sacs)', '1 500 × 22 + 500 × 25 = 45 500', '2 000 × 23,5 = 47 000'],
            ['Coût des ventes', '**98 500**', '**100 750**'],
            ['Stock final (1 500 sacs)', '1 500 × 25 = **37 500**', '1 500 × 23,5 = **35 250**'],
          ],
        },
        note: "Quand les prix montent, le PEPS affiche un stock plus proche des prix récents et un résultat plus élevé ; le coût moyen lisse l'effet. Dans une économie où le franc congolais se déprécie vite, l'écart entre les deux formules peut devenir significatif : il doit être expliqué par la méthode indiquée dans les notes (§ 36(a)), et la formule retenue ne se change pas au gré des résultats (IAS 8).",
      },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[6] },
      {
        type: 'filet',
        titre: "Sur le coût des stocks, SYSCOHADA et IFRS parlent d'une seule voix",
        texte: "L'article 44 de l'AUDCIF et le chapitre 14 du Titre VIII reprennent les mêmes briques : coût d'acquisition et de production, exclusions identiques, imputation rationnelle, identification spécifique pour les biens individualisables, PEPS ou coût moyen pondéré pour les biens fongibles, coût standard et prix de détail tolérés s'ils donnent un résultat proche du coût. Une particularité : en inventaire intermittent, le SYSCOHADA admet un coût moyen pondéré calculé sur la durée moyenne de stockage, illustré par un exemple officiel (rotation de 5, soit 2,4 mois d'écoulement, coût d'entrée d'octobre appliqué au stock final). Une entité qui établit ses deux jeux d'états peut donc, sur ce point, garder un seul calcul de coût.",
      },
    ],
  },
  {
    numero: '4.3',
    titre: "IAS 2 : la valeur nette de réalisation, la dépréciation et sa reprise",
    navLabel: 'IAS 2 : VNR',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Un stock est déprécié lorsque son coût ne sera pas recouvré : produits endommagés ou obsolètes, prix de vente en baisse, coûts d'achèvement ou de vente en hausse (§ 28). La logique est celle d'IAS 36, appliquée à un actif court : un actif ne doit pas figurer pour plus que ce qu'on attend de sa vente ou de son utilisation. L'estimation se fait à la date de clôture sur les éléments probants les plus fiables, en tenant compte des événements postérieurs qui confirment des conditions existant à la clôture (§ 30), et du but dans lequel le stock est détenu (§ 31).",
      },
      {
        type: 'carte',
        titre: "Quatre règles d'application",
        liste: [
          "**Élément par élément** (§ 29), avec un regroupement possible d'éléments similaires d'une même ligne de produits ; jamais par grande catégorie ni pour tout un secteur opérationnel.",
          "**Contrats fermes** (§ 31) : la valeur nette de réalisation des quantités engagées se fonde sur le prix du contrat ; celle de l'excédent, sur les prix généraux. Un contrat déficitaire au-delà des stocks détenus relève d'IAS 37.",
          "**Matières premières** (§ 32) : pas de dépréciation si le produit fini se vendra au coût ou au-dessus ; sinon, dépréciation, le coût de remplacement pouvant être la meilleure mesure disponible.",
          "**Reprise** (§ 33) : lorsque les circonstances ont disparu, la dépréciation est reprise, dans la limite de la dépréciation initiale, et la reprise vient en réduction du coût des stocks passé en charges (§ 34).",
        ],
      },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
      {
        type: 'carte',
        titre: "AGROFOOD SA : 20 000 de dépréciation, puis 6 000 de reprise",
        liste: [
          "Au 31 décembre N, AGROFOOD détient 1 000 unités de produits finis au coût unitaire de 120 USD, soit 120 000. À la suite d'une baisse des prix du marché, le prix de vente estimé tombe à 110 et les coûts nécessaires à la vente sont de 10 par unité.",
          "**Valeur nette de réalisation** : 110 − 10 = **100** par unité, inférieure au coût de 120 : la dépréciation est obligatoire (§ 9 et 28).",
          "**Dépréciation** : (120 − 100) × 1 000 = **20 000**, en charges de N (§ 34). Stock au bilan : 100 000.",
          "**En N+1**, 600 unités sont vendues : leur coût et la dépréciation qui s'y rattache (12 000) sortent ensemble, dans le coût des ventes.",
          "**Fin N+1.** Restent 400 unités ; le marché se redresse : prix 125, coûts de vente 10, valeur nette de réalisation 115. Valeur retenue : le plus faible de 120 et 115, soit 115. Dépréciation nécessaire : 400 × 5 = 2 000 ; dépréciation existante : 400 × 20 = 8 000. **Reprise de 6 000**, en réduction du coût des stocks passé en charges (§ 33-34), et non une remontée au-dessus du coût.",
          "**Notes** : montant de la dépréciation de N, montant de la reprise de N+1 et circonstances qui l'ont provoquée, ici le redressement des prix (§ 36(e)-(g)).",
        ],
        note: "Comme le souligne le support d'origine du module, cette dépréciation « n'est pas une anticipation pessimiste, mais une correction réaliste de la valeur économique du stock ». Elle s'impose même si la perte n'est pas encore réalisée, et même en l'absence de bénéfice dans le SYSCOHADA révisé (compte 6593).",
      },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[10] },
      {
        type: 'carte',
        titre: "Ce que les notes doivent montrer (§ 36)",
        liste: [
          "Les **méthodes** d'évaluation, dont la formule de coût.",
          "La **valeur comptable totale** et par catégories appropriées, et celle des stocks évalués à la juste valeur diminuée des coûts de vente.",
          "Le **montant des stocks passé en charges**, les **dépréciations** et les **reprises** de la période, avec les circonstances de ces reprises.",
          "La valeur des **stocks donnés en nantissement** de passifs : une information que les prêteurs congolais, qui financent volontiers sur gage de marchandises, lisent attentivement.",
        ],
      },
      {
        type: 'filet',
        titre: "Valeur liquidative et sinistre HAO : les deux nuances du SYSCOHADA",
        texte: "Le SYSCOHADA révisé évalue lui aussi les stocks « au plus faible du coût d'entrée et de la valeur actuelle », la valeur actuelle des stocks représentant la valeur nette de réalisation (Titre VIII, ch. 14, § 3.2.1). Il décline la règle par nature (matières, en-cours, produits intermédiaires, produits finis) avec la même logique que le § 32 d'IAS 2, refuse lui aussi toute dépréciation forfaitaire fondée sur la seule rotation, et comptabilise dépréciation et reprise par les comptes 6593, 39 et 7593, la dépréciation étant obligatoire même en l'absence de bénéfice. Deux nuances : en cas de non-continuité d'exploitation, il retient explicitement une valeur liquidative ; et la perte d'un stock par sinistre passe en charges HAO (compte 831), l'indemnité en produits HAO (compte 841), là où IAS 2 et IAS 1 ne connaissent pas de rubrique hors activités ordinaires.",
      },
    ],
  },
  {
    numero: '4.4',
    titre: "IFRS 9 : l'instrument financier, son champ et sa première évaluation",
    navLabel: 'Instruments financiers',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Avec IFRS 9, on change d'univers. L'objectif de la norme est de fournir des informations utiles « pour l'appréciation des montants, du calendrier et du degré d'incertitude des flux de trésorerie futurs de l'entité » (§ 1.1). Elle est entrée en vigueur pour les exercices ouverts à compter du 1er janvier 2018 (§ 7.1.1), en remplacement d'IAS 39, qui ne subsiste que pour certaines relations de couverture. Pour une entreprise commerciale ou industrielle, IFRS 9 gouverne les créances clients, la trésorerie et les placements, les prêts qu'elle consent (au personnel, à ses distributeurs, à des partenaires), ses emprunts et ses dettes fournisseurs, ainsi que les dérivés de change ou de matières premières qu'elle conclut.",
      },
      {
        type: 'filet',
        titre: "Un contrat, deux entités, trois définitions (IAS 32.11)",
        texte: "« Un **instrument financier** est tout contrat qui donne lieu à un actif financier pour une entité et à un passif financier ou à un instrument de capitaux propres pour une autre entité. » Un actif financier est notamment de la trésorerie, un instrument de capitaux propres d'une autre entité, ou un droit contractuel de recevoir de la trésorerie ou un autre actif financier. « Un **instrument de capitaux propres** est tout contrat mettant en évidence un intérêt résiduel dans les actifs d'une entité après déduction de tous ses passifs. » Deux conséquences pratiques : un droit à recevoir des biens ou des services (avance à un fournisseur, charge payée d'avance) n'est pas un actif financier ; une obligation fiscale, qui ne naît pas d'un contrat, n'est pas un passif financier (IAS 32.AG11-AG12).",
      },
      { type: 'controle', question: QCM[11] },
      {
        type: 'carte',
        titre: "Le champ d'IFRS 9 en quatre repères",
        liste: [
          "**Exclus** (§ 2.1) : participations dans des filiales, entreprises associées et coentreprises (IFRS 10, IAS 27, IAS 28), droits et obligations des contrats de location (IFRS 16, sauf décomptabilisation et dépréciation des créances locatives), avantages du personnel, instruments de capitaux propres de l'émetteur, contrats d'assurance, entre autres.",
          "**Inclus par assimilation** (§ 2.4) : les contrats d'achat ou de vente d'un élément non financier réglables en net, sauf ceux conclus et maintenus pour les besoins prévus de l'entité. Un contrat à terme sur le cuivre conclu pour spéculer entre dans IFRS 9 ; un contrat de livraison de ciment pour les besoins de l'usine, non.",
          "**Comptabilisation** (§ 3.1.1) : « uniquement lorsqu'elle devient partie aux dispositions contractuelles de l'instrument ». Une commande reçue n'est pas une créance ; une promesse d'embauche n'est pas un passif financier.",
          "**Dérivé** (annexe A) : un instrument dont la valeur varie en fonction d'un sous-jacent, qui ne requiert pas ou peu d'investissement initial, et dont le règlement se fait à une date future.",
        ],
      },
      {
        type: 'paragraphe',
        texte: "À l'entrée, l'instrument est évalué à sa **juste valeur**, majorée ou minorée des coûts de transaction directement attribuables, sauf s'il est à la juste valeur par le biais du résultat net : ces coûts sont alors des charges (§ 5.1.1). Les coûts de transaction sont des coûts marginaux, c'est-à-dire des coûts qui n'auraient pas été engagés sans l'opération (annexe A). Exception de taille pour les entreprises commerciales : une créance client sans composante financement importante est évaluée à son prix de transaction au sens d'IFRS 15 (§ 5.1.3), ce qui dispense d'actualiser les créances à 30 ou 60 jours.",
      },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[13] },
    ],
  },
  {
    numero: '4.5',
    titre: "Classer un actif financier : modèle économique et flux contractuels",
    navLabel: 'Classement',
    blocs: [
      {
        type: 'paragraphe',
        texte: "IFRS 9 remplace les catégories d'IAS 39 par un raisonnement en deux questions. Sauf désignation particulière, un actif financier est classé au coût amorti, à la juste valeur par le biais des autres éléments du résultat global ou à la juste valeur par le biais du résultat net, « en fonction à la fois : (a) du modèle économique que suit l'entité pour la gestion des actifs financiers ; (b) des caractéristiques des flux de trésorerie contractuels de l'actif financier » (§ 4.1.1). La première question porte sur la manière dont l'entité gère ses actifs, la seconde sur ce que le contrat promet.",
      },
      {
        type: 'tableau',
        tableau: {
          entetes: ['Modèle économique', 'Flux uniquement principal et intérêts', 'Autres flux'],
          lignes: [
            ["Percevoir les flux contractuels (§ 4.1.2(a))", '**Coût amorti**', 'Juste valeur par le biais du résultat net'],
            ["Percevoir les flux et vendre (§ 4.1.2A(a))", '**Juste valeur par le biais des autres éléments du résultat global**, avec recyclage', 'Juste valeur par le biais du résultat net'],
            ["Autre, notamment gestion sur la base de la juste valeur ou transaction (§ 4.1.4 ; B4.1.5-B4.1.6)", 'Juste valeur par le biais du résultat net', 'Juste valeur par le biais du résultat net'],
          ],
        },
      },
      {
        type: 'carte',
        titre: "Le premier critère : le modèle économique",
        liste: [
          "**Il se constate, il ne se déclare pas.** Il s'apprécie au niveau des portefeuilles, d'après la fréquence, la valeur et les raisons des ventes passées et les attentes de ventes futures ; les ventes « ne peuvent donc pas être considérées isolément » (B4.1.2C).",
          "**Percevoir n'oblige pas à tout garder** (B4.1.3) : des ventes rares, ou de faible valeur, restent compatibles ; celles qui répondent à une hausse du risque de crédit le sont toujours (B4.1.3A).",
          "**Percevoir et vendre** (B4.1.4A) : gestion des besoins quotidiens de liquidités, maintien d'un profil de rendement, adossement de la durée des actifs à celle des passifs.",
          "**Résiduel** (B4.1.5) : l'entité gère pour réaliser la juste valeur par la vente ; la perception des flux n'a qu'un rôle accessoire.",
        ],
      },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[15] },
      {
        type: 'paragraphe',
        texte: "Le second critère, souvent appelé test SPPI (*solely payments of principal and interest*), vérifie que le contrat est un **prêt de base**. Le principal est la juste valeur de l'actif lors de la comptabilisation initiale ; les intérêts rémunèrent la valeur temps de l'argent, le risque de crédit, les autres risques et frais d'un prêt de base, et une marge (§ 4.1.3). Dès que les flux exposent le porteur à des risques sans rapport avec un prêt de base, comme la valeur d'une action ou le prix d'une matière première, le test échoue (B4.1.7A). B4.1.14 en donne des exemples : obligation convertible, prêt à taux variable inversé, instrument perpétuel dont les intérêts ne sont pas versés si leur paiement rendait l'émetteur insolvable, les intérêts différés ne portant pas eux-mêmes intérêt.",
      },
      { type: 'controle', question: QCM[16] },
      {
        type: 'carte',
        titre: "Quatre questions pour classer un actif financier",
        liste: [
          "**1.** Est-ce un instrument de capitaux propres ? Juste valeur par le biais du résultat net, sauf choix irrévocable, titre par titre, pour les autres éléments du résultat global s'il n'est pas détenu à des fins de transaction (§ 4.1.4, 5.7.5). Dans ce cas, pas de recyclage et dividendes en résultat (§ 5.7.6 ; B5.7.1).",
          "**2.** Pour un instrument de dette : les flux sont-ils uniquement du principal et des intérêts ? Non : juste valeur par le biais du résultat net.",
          "**3.** Oui : quel est le modèle économique du portefeuille ? Percevoir : coût amorti ; percevoir et vendre : juste valeur par le biais des autres éléments du résultat global ; autre : juste valeur par le biais du résultat net.",
          "**4.** Une désignation à la juste valeur par le biais du résultat net élimine-t-elle une non-concordance comptable ? L'option, irrévocable, reste ouverte à l'origine (§ 4.1.5).",
        ],
        note: "Le classement se fixe à l'origine. On ne reclasse que si l'entité change de modèle économique pour la gestion de ses actifs financiers, « et seulement alors » (§ 4.4.1), ce qui doit rester très rare. Et « Une entité ne doit reclasser aucun passif financier. » (§ 4.4.2).",
      },
      { type: 'controle', question: QCM[17] },
      { type: 'controle', question: QCM[18] },
      { type: 'controle', question: QCM[19] },
      {
        type: 'filet',
        titre: "Des actions non cotées au coût ?",
        texte: "Beaucoup d'entités congolaises détiennent des participations minoritaires non cotées : parts dans une société de transport fluvial qui dessert l'entreprise, actions d'un fournisseur, titres reçus lors d'une restructuration. IFRS 9 impose de les évaluer à la juste valeur (B5.2.3). Le même paragraphe admet toutefois que, « dans des circonstances limitées », le coût puisse constituer une estimation appropriée de la juste valeur : faute d'informations récentes suffisantes, ou lorsque le coût est la meilleure estimation dans une large fourchette. Il s'agit d'une tolérance d'estimation, non d'une catégorie comptable : l'entité doit justifier chaque année que ces circonstances persistent. Le choix des autres éléments du résultat global évite en outre que la volatilité de ces titres ne se lise dans le résultat.",
      },
    ],
  },
  {
    numero: '4.6',
    titre: "Le coût amorti et le taux d'intérêt effectif",
    navLabel: 'Coût amorti',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le coût amorti n'est pas le coût historique. C'est, selon l'annexe A, la valeur attribuée à l'actif ou au passif financier lors de sa comptabilisation initiale, « diminuée des remboursements en principal, majorée ou diminuée du cumul de l'amortissement, calculé par la méthode du taux d'intérêt effectif, de toute différence entre cette valeur initiale et la valeur à l'échéance et, dans le cas d'un actif financier, ajustée au titre de la correction de valeur pour pertes, le cas échéant ». Le moteur du calcul est le **taux d'intérêt effectif**, qui étale sur la durée de vie de l'instrument tout ce qui sépare le montant initial du montant final : frais de dossier, coûts de transaction, décotes et surcotes.",
      },
      {
        type: 'filet',
        titre: "Le taux qui fait tomber juste (annexe A ; § 5.4.1)",
        texte: "Le taux d'intérêt effectif est le « Taux qui actualise les sorties ou entrées de trésorerie futures estimées sur la durée de vie attendue d'un actif financier ou d'un passif financier de manière à obtenir exactement la valeur comptable brute de l'actif financier ou le coût amorti du passif financier. » L'entité prend en compte toutes les modalités contractuelles, « mais elle ne doit pas tenir compte des pertes de crédit attendues ». Et les produits d'intérêts « doivent être calculés selon la méthode du taux d'intérêt effectif » (§ 5.4.1), par application de ce taux à la valeur comptable brute, sauf pour les actifs dépréciés.",
      },
      { type: 'controle', question: QCM[20] },
      {
        type: 'carte',
        titre: "MBANZA CIMENT emprunte 100 000 et encaisse 97 000",
        texte: "Le 1er janvier N, la société emprunte 100 000 USD sur trois ans pour financer un broyeur : intérêt de 10 % payé en fin d'année, remboursement in fine. La banque retient 3 000 USD de frais de dossier : la société encaisse 97 000. Le taux qui égalise 97 000 et les flux futurs (10 000, 10 000 et 110 000) est d'environ **11,23 %**.",
        tableau: {
          entetes: ['Année', "Coût amorti de la dette à l'ouverture", 'Charge d\'intérêts au taux effectif', 'Intérêts payés', 'Part des frais étalée', 'Coût amorti à la clôture'],
          lignes: [
            ['N', '97 000', '10 896', '10 000', '896', '97 896'],
            ['N+1', '97 896', '10 996', '10 000', '996', '98 892'],
            ['N+2', '98 892', '11 108', '110 000', '1 108', '0'],
            ['**Total**', '', '**33 000**', '', '**3 000**', ''],
          ],
        },
        note: "Les 3 000 de frais ne sont pas une charge de N : ils renchérissent le coût du crédit, et le taux effectif les répartit au rythme actuariel (896, puis 996, puis 1 108). La dette figure au bilan pour 97 000 à l'origine, et non pour 100 000 avec des frais en charges. Un étalement linéaire donnerait 1 000 par an ; l'écart est faible ici, mais il grandit avec la durée, le niveau des frais et les remboursements anticipés.",
      },
      { type: 'controle', question: QCM[21] },
      {
        type: 'filet',
        titre: "Frais d'emprunt : en charges, étalés, ou au taux effectif ?",
        texte: "Dans la pratique, beaucoup d'entreprises passent les frais de dossier d'un emprunt en charges dès l'octroi, ou les étalent linéairement. IFRS 9 exige la méthode du taux effectif. IAS 8.8 admet qu'« Il convient de ne pas appliquer ces méthodes lorsque l'effet de leur application n'est pas significatif », mais ajoute aussitôt qu'« il est inapproprié de faire, ou de ne pas corriger, des écarts non significatifs par rapport aux IFRS en vue de parvenir à une présentation particulière ». Une méthode simplifiée se défend donc par un calcul qui démontre que l'écart reste non significatif, pas par une affirmation. Le même raisonnement vaut pour les prêts au personnel sans intérêt : leur actualisation n'est pas un raffinement, dès lors que les montants sont significatifs.",
      },
      { type: 'controle', question: QCM[22] },
      {
        type: 'paragraphe',
        texte: "Pour l'entreprise, la règle générale des passifs financiers est simple. L'entité classe « comme étant ultérieurement évalués au coût amorti tous les passifs financiers à l'exception » de ceux que la norme énumère : passifs à la juste valeur par le biais du résultat net, dont les dérivés, contrats de garantie financière, engagements de prêt à taux inférieur au marché, contrepartie éventuelle d'un regroupement (§ 4.2.1). Un emprunt bancaire ou obligataire est donc évalué au coût amorti, comme dans l'exemple de MBANZA CIMENT ; une dette fournisseur à court terme l'est aussi, et son coût amorti se confond en pratique avec son montant nominal. Le passif sort du bilan lorsqu'il est éteint, c'est-à-dire lorsque l'obligation est exécutée, annulée ou expirée (§ 3.3.1), et l'écart avec le montant payé va en résultat net (§ 3.3.3).",
      },
      { type: 'controle', question: QCM[30] },
    ],
  },
  {
    numero: '4.7',
    titre: "Dépréciation : des pertes subies aux pertes de crédit attendues",
    navLabel: 'Pertes attendues',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le comptable formé au SYSCOHADA déprécie une créance lorsqu'elle devient douteuse : il attend un fait, un retard, un litige, une faillite. IFRS 9 renverse cette logique : l'entreprise ne doit plus attendre que le client soit en difficulté pour constater le risque, parce que le risque de non-paiement existe dès la naissance de la créance. L'entité comptabilise une correction de valeur au titre des **pertes de crédit attendues** sur tous les actifs au coût amorti ou à la juste valeur par le biais des autres éléments du résultat global, les créances locatives, les actifs sur contrat, les engagements de prêt et les garanties financières (§ 5.5.1). La perte attendue est une « Moyenne pondérée des pertes de crédit, dont les poids sont les risques de défaillance respectifs » (annexe A). Il y a perte même si l'on s'attend à être payé en entier, mais en retard (B5.5.28).",
      },
      {
        type: 'filet',
        titre: "Probabilités, temps, conjoncture : les trois exigences du § 5.5.17",
        texte: "Les pertes de crédit attendues doivent refléter « (a) un montant objectif et fondé sur des pondérations probabilistes, qui est déterminé par l'évaluation d'un intervalle de résultats possibles ; (b) la valeur temps de l'argent ; (c) les informations raisonnables et justifiables sur des événements passés, des circonstances actuelles et des prévisions de la conjoncture économique encore à venir, qu'il est possible, à la date de clôture, d'obtenir sans devoir engager des coûts ou des efforts déraisonnables ». Le point (c) est la vraie rupture : l'historique ne suffit plus, il faut y intégrer la conjoncture attendue.",
      },
      {
        type: 'tableau',
        tableau: {
          entetes: ['Situation à la clôture', 'Correction de valeur', 'Base des intérêts', 'Vocabulaire de la pratique'],
          lignes: [
            ["Risque de crédit sans augmentation importante depuis l'origine", "Pertes attendues pour les **12 mois à venir** (§ 5.5.5)", 'Valeur comptable brute (§ 5.4.1)', 'Étape 1 (stage 1)'],
            ["Augmentation importante du risque de crédit", "Pertes attendues pour la **durée de vie** (§ 5.5.3)", 'Valeur comptable brute', 'Étape 2 (stage 2)'],
            ["Actif financier déprécié (annexe A)", "Pertes attendues pour la durée de vie", '**Coût amorti**, net de la correction (§ 5.4.1(b))', 'Étape 3 (stage 3)'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "La norme ne parle pas d'étapes : ce vocabulaire vient de la pratique. Pour une entreprise commerciale ou industrielle, ce modèle général vise surtout les prêts qu'elle consent et ses placements en titres de dette ; ses créances clients suivent l'approche simplifiée (section 4.8). Ce qu'elle impose, c'est d'apprécier à chaque clôture si le risque de défaillance sur la durée de vie a augmenté de façon importante depuis l'origine, en comparant les deux dates (§ 5.5.9). Deux présomptions réfutables balisent le jugement : augmentation importante lorsque les paiements sont en souffrance depuis plus de 30 jours (§ 5.5.11), ce qui constitue le moment le plus tardif du passage aux pertes pour la durée de vie (B5.5.19) ; défaillance au plus tard 90 jours après l'échéance impayée (B5.5.37). Un instrument à risque faible peut être présumé sans augmentation importante (§ 5.5.10), mais pas simplement parce qu'il est garanti ou moins risqué que le pays de l'entité (B5.5.22). Les variations de la correction passent en résultat net comme gain ou perte de valeur (§ 5.5.8).",
      },
      { type: 'controle', question: QCM[23] },
      { type: 'controle', question: QCM[24] },
      {
        type: 'carte',
        titre: "Le distributeur du Kwilu paie en retard : de 900 à 6 750 de pertes attendues",
        liste: [
          "**Convention de calcul.** Pertes attendues = probabilité de défaillance × taux de perte en cas de défaillance × valeur brute. Ce produit simplifié ignore l'actualisation et les scénarios multiples ; la norme exige les deux (§ 5.5.17). Il suffit ici à montrer la mécanique.",
          "Le 1er janvier N, MBANZA CIMENT prête 100 000 USD à son distributeur exclusif du Kwilu, pour trois ans, intérêt de 10 % payé en fin d'année, remboursement in fine, sans frais : le taux effectif est de 10 % et la valeur brute reste de 100 000.",
          "**Fin N, étape 1.** Probabilité de défaillance à 12 mois 2 %, taux de perte 45 % : 100 000 × 2 % × 45 % = **900**. Dotation de 900 en résultat (§ 5.5.8). Coût amorti : 99 100. Produits d'intérêts de N+1 calculés sur la valeur brute : 10 000.",
          "**Fin N+1, étape 2.** Un intérêt est impayé depuis 45 jours : la présomption du § 5.5.11 joue. Probabilité de défaillance sur la durée de vie restante 15 % : 100 000 × 15 % × 45 % = **6 750**. Dotation complémentaire : 6 750 − 900 = **5 850**.",
          "**Si l'emprunteur entre en difficultés financières importantes (étape 3)**, l'actif devient un actif financier déprécié : les intérêts des périodes suivantes se calculent sur le coût amorti net de la correction (§ 5.4.1(b)). Et lorsque plus aucun recouvrement n'est raisonnablement attendu, la valeur brute est réduite directement : c'est une décomptabilisation (§ 5.4.4).",
        ],
      },
      { type: 'controle', question: QCM[31] },
      {
        type: 'filet',
        titre: "Le cuivre, le franc et la sécurité dans la matrice",
        texte: "Que signifie une « prévision de la conjoncture économique » pour un distributeur de Lubumbashi qui vend à crédit à des sous-traitants miniers ? Le cours du cuivre et du cobalt, dont dépend la solvabilité de ses clients ; la trajectoire du franc congolais, qui fragilise les clients endettés en dollars mais payés en francs ; la situation sécuritaire, qui peut couper l'accès à une province ; la hausse des taux d'intérêt, qui renchérit le crédit de ses clients. La norme ne demande pas une prévision exacte, mais une pondération honnête de scénarios plausibles, justifiée et documentée. Deux dérives sont à éviter : ignorer la conjoncture, ce qui revient à revenir aux pertes subies ; ou l'invoquer pour lisser le résultat d'une année sur l'autre.",
      },
    ],
  },
  {
    numero: '4.8',
    titre: "Créances clients : l'approche simplifiée, la matrice et les passerelles",
    navLabel: 'Créances clients',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Pour une entreprise commerciale, le modèle des étapes serait disproportionné. IFRS 9 l'en dispense : pour les créances clients et actifs sur contrat relevant d'IFRS 15 sans composante financement importante, l'entité « doit toujours évaluer la correction de valeur pour pertes au montant des pertes de crédit attendues pour la durée de vie » (§ 5.5.15(a)). Voilà l'**approche simplifiée** : plus de suivi de la dégradation depuis l'origine. Pour les créances avec composante financement et les créances locatives, elle est optionnelle, sur choix de méthode comptable (§ 5.5.15(a)(ii) et (b)).",
      },
      { type: 'controle', question: QCM[25] },
      {
        type: 'carte',
        titre: "DISTRICOM SA : 400 000 de créances, 32 000 de pertes attendues",
        texte: "La méthode pratique tient en quatre temps : classer les créances par ancienneté ; appliquer à chaque tranche un taux de perte estimé ; calculer la perte attendue ; la comptabiliser immédiatement. B5.5.35 cite cette matrice comme exemple de simplification, avec des taux tirés de l'historique des pertes, ajustés des informations actuelles et prospectives.",
        tableau: {
          entetes: ['Ancienneté', 'Montant (USD)', 'Taux de perte attendu', 'Perte attendue'],
          lignes: [
            ['Non échues', '200 000', '1 %', '2 000'],
            ['1 à 30 jours', '100 000', '5 %', '5 000'],
            ['31 à 60 jours', '60 000', '15 %', '9 000'],
            ['Plus de 60 jours', '40 000', '40 %', '16 000'],
            ['**Total**', '**400 000**', '', '**32 000**'],
          ],
        },
        note: "Écriture : charge de dépréciation en résultat net (§ 5.5.8), correction de valeur en déduction des créances ; les créances figurent au bilan pour 368 000, montant plus proche de la trésorerie réellement attendue. Ajustement prospectif : si la direction anticipe une dégradation de la conjoncture et porte le taux de la dernière tranche à 50 %, la perte attendue passe à 36 000. Une clientèle hétérogène justifie des matrices distinctes par segment (région, type de produit, grossistes ou détaillants), si l'historique montre des profils de pertes différents (B5.5.35).",
      },
      { type: 'controle', question: QCM[26] },
      {
        type: 'filet',
        titre: "15 000 ou 32 000 : perte subie contre perte attendue",
        texte: "Le SYSCOHADA révisé déprécie les créances par le compte 491, avec une logique opposée. La dépréciation doit être « certaine quant à sa nature » et l'élément d'actif « individualisé » ; l'entité doit pouvoir justifier les motifs qui rendent la créance douteuse ou litigieuse, et les événements survenus après la clôture ne sont pas pris en compte (Titre VII, commentaire du compte 49). Sur l'exemple de DISTRICOM, supposons que 25 000 des 40 000 de la tranche de plus de 60 jours correspondent à des clients identifiés comme douteux, recouvrables à 40 % : la dépréciation SYSCOHADA serait de 15 000, contre 32 000 en IFRS 9. L'écart n'est pas une erreur de l'un ou de l'autre : il mesure la différence entre un modèle qui constate une perte et un modèle qui l'anticipe. Il se retrouve dans les impôts différés des groupes qui établissent les deux jeux d'états (chapitre 6).",
      },
      { type: 'controle', question: QCM[27] },
    ],
  },
  {
    numero: '4.9',
    titre: "Décomptabiliser, puis couvrir : les deux dernières clés d'IFRS 9",
    navLabel: 'Sortie et couverture',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Un actif financier ne sort du bilan que dans deux cas : lorsque les droits contractuels aux flux expirent, ou lorsque l'entité le transfère dans des conditions qui répondent aux critères de décomptabilisation (§ 3.2.3). Le critère central est celui des **risques et avantages** (§ 3.2.6). Si l'entité transfère la quasi-totalité des risques et avantages, elle décomptabilise ; si elle en conserve la quasi-totalité, « elle doit laisser l'actif financier comptabilisé » ; entre les deux, tout dépend du **contrôle** : sans contrôle, décomptabilisation ; avec contrôle, maintien dans la mesure du lien conservé. À la sortie complète, l'écart entre la valeur comptable et la contrepartie reçue va en résultat net (§ 3.2.12).",
      },
      {
        type: 'carte',
        titre: "Affacturage et titrisation : IFRS 9 face au SYSCOHADA",
        tableau: {
          entetes: ['Opération', 'IFRS 9 (§ 3.2.6)', 'SYSCOHADA révisé (Titre VIII, ch. 15)'],
          lignes: [
            ['Affacturage sans recours, risque d\'impayé transféré au factor', 'Décomptabilisation de la créance', "Créance soldée du compte 411 par le 4716 Compte d'affacturage ; retenue de garantie au 4717"],
            ['Affacturage avec recours intégral', "**Maintien** de la créance ; trésorerie reçue en passif financier (§ 4.2.1(b))", "Pas de traitement distinct : le chapitre 15 décrit un factor qui garantit la bonne fin ; créances cédées non échues mentionnées dans les notes"],
            ['Titrisation avec conservation d\'une tranche subordonnée', "Analyse des risques conservés ; maintien probable, total ou partiel", "« s'analyse comme une cession » : décomptabilisation dès la remise du bordereau"],
          ],
        },
        note: "L'enjeu est considérable pour la lecture du bilan : une créance cédée avec recours qui disparaît du bilan fait aussi disparaître un endettement. IFRS 9 raisonne sur la substance du risque ; le SYSCOHADA, sur la forme juridique du transfert.",
      },
      { type: 'controle', question: QCM[28] },
      {
        type: 'paragraphe',
        texte: "La comptabilité de couverture est facultative. Elle vise à « représenter dans les états financiers l'effet des activités de gestion des risques de l'entité » (§ 6.1.1) lorsque l'instrument de couverture et l'élément couvert seraient, sans elle, comptabilisés sur des bases différentes : un contrat de change à terme à la juste valeur en résultat, un achat futur de carburant en dollars qui n'est pas encore au bilan. Ses conditions sont strictes (§ 6.4.1) : instruments et éléments admis, désignation et documentation dès l'origine, lien économique, risque de crédit non dominant, ratio de couverture cohérent avec la gestion réelle du risque. Faute de documentation initiale, pas de couverture comptable, même si la couverture économique est parfaite.",
      },
      { type: 'controle', question: QCM[29] },
      {
        type: 'filet',
        titre: "Le stock et la créance, une même idée",
        texte: "Stocks et instruments financiers semblent appartenir à deux mondes. Ils obéissent pourtant à une même idée : un actif ne vaut au bilan que ce qu'il rapportera. IAS 2 plafonne le stock à sa valeur nette de réalisation ; IFRS 9 réduit la créance des pertes de crédit qu'on en attend. La différence tient au moment : IAS 2 attend un indice de perte (prix en baisse, obsolescence), IFRS 9 anticipe la perte dès le premier jour. Le passage de la perte subie à la perte attendue est l'une des transformations les plus profondes de la comptabilité financière récente ; il oblige toute entreprise qui applique les IFRS à organiser le suivi de ses créances (balance âgée, historique des pertes, informations sur ses clients) bien au-delà de ce qu'exige la tenue des comptes en SYSCOHADA.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ue13c4-cp1',
    titre: "Synthèse : stocks et créances de TECHMARKET SA",
    contexte: "TECHMARKET SA distribue du matériel électronique à Kinshasa et établit, pour son actionnaire étranger, des états financiers IFRS en plus de ses comptes SYSCOHADA. Au 31 décembre N : coût des stocks 500 000 USD, valeur nette de réalisation estimée 450 000 USD ; créances clients 300 000 USD, dont 220 000 sur des clients solvables (taux de perte attendu 2 %) et 80 000 sur des clients fragiles (taux 25 %). L'inventaire détaillé révèle que les stocks se composent de téléphones (coût 300 000, valeur nette de réalisation 320 000) et d'ordinateurs d'une génération dépassée (coût 200 000, valeur nette de réalisation 130 000).",
    questions: [
      {
        num: 1,
        enonce: "Sur la base des seuls montants globaux, quelle dépréciation des stocks faudrait-il constater ?",
        correction: "Le plus faible du coût et de la valeur nette de réalisation (IAS 2.9) : 500 000 − 450 000 = **50 000**. Ce calcul global n'est toutefois qu'une première approche : il suppose que les gains latents d'une ligne de produits peuvent compenser les pertes d'une autre.",
      },
      {
        num: 2,
        enonce: "Reprenez le calcul avec l'inventaire détaillé. Pourquoi le résultat change-t-il ?",
        correction: "IAS 2.29 impose une dépréciation élément par élément, ou par groupe d'éléments similaires, et interdit de raisonner sur une grande catégorie. Téléphones : valeur nette de réalisation (320 000) supérieure au coût, aucune dépréciation ; ils restent au coût, 300 000, sans constater de plus-value. Ordinateurs : 200 000 − 130 000 = **70 000** de dépréciation. Stock au bilan : 300 000 + 130 000 = 430 000, et non 450 000. Le calcul global masquait 20 000 de perte derrière la marge latente des téléphones.",
      },
      {
        num: 3,
        enonce: "Quelle dépréciation constater sur les créances clients, et selon quelle approche ?",
        correction: "Créances clients sans composante financement importante : pertes attendues pour la durée de vie, selon l'approche simplifiée (IFRS 9.5.5.15). La segmentation par profil de risque est admise (B5.5.35). Clients solvables : 220 000 × 2 % = 4 400 ; clients fragiles : 80 000 × 25 % = 20 000 ; total **24 400**. Créances au bilan : 275 600. La perte attendue sur les clients solvables n'est pas une prudence excessive : même un client à jour porte un risque de défaut que l'historique permet de mesurer.",
      },
      {
        num: 4,
        enonce: "Qu'est-ce qui change dans les comptes SYSCOHADA de la société ?",
        correction: "Pour les stocks, rien sur le fond : le SYSCOHADA révisé évalue aussi au plus faible du coût d'entrée et de la valeur actuelle, égale à la valeur nette de réalisation, et refuse les dépréciations globales (Titre VIII, ch. 14) ; la dépréciation de 70 000 se comptabilise au débit du compte 6593 par le crédit du compte 39. Pour les créances, la différence est réelle : la dépréciation doit être certaine quant à sa nature et porter sur des créances individualisées dont le caractère douteux est justifié (commentaire du compte 49). Les 4 400 calculés sur des clients solvables n'y ont pas leur place ; sur les 80 000 de clients fragiles, seules les créances effectivement douteuses sont dépréciées, au débit du compte 659 par le crédit du compte 491. L'écart entre les deux jeux d'états est une différence temporelle, que le chapitre 6 traitera sous l'angle des impôts différés.",
      },
    ],
  },
  {
    id: 'ue13c4-cp2',
    titre: "Calcul : les stocks de la MINOTERIE DU KONGO CENTRAL (société fictive)",
    contexte: "Exercice N. Achat de blé importé : prix facturé 280 000 USD, remise 8 000, droits de douane 22 000, TVA récupérable 45 000, transport de Matadi à l'usine 12 000. Tout ce blé est transformé en 16 000 tonnes de farine, pour une capacité normale de 20 000 tonnes. Frais généraux fixes de production : 480 000 USD. Coûts variables de transformation : 18 USD la tonne. Autres charges : frais du siège 60 000, publicité 25 000, entrepôt des produits finis 15 000. À la clôture, 2 000 tonnes restent en stock, dont 1 200 engagées dans un contrat de vente ferme à 66 USD la tonne. Le prix du marché est tombé à 58 USD ; les frais de vente sont de 3 USD la tonne.",
    questions: [
      {
        num: 1,
        enonce: "Déterminez le coût d'acquisition du blé.",
        correction: "IAS 2.11 : 280 000 − 8 000 + 22 000 + 12 000 = **306 000 USD**. La TVA récupérable (45 000) est une créance sur l'État, pas un élément du coût. Rapporté à la production, le coût matière est de 306 000 / 16 000 = 19,125 USD la tonne.",
      },
      {
        num: 2,
        enonce: "Calculez le coût de production d'une tonne de farine et la charge de sous-activité.",
        correction: "Frais fixes imputés sur la capacité normale (IAS 2.13) : 480 000 / 20 000 = 24 USD la tonne. Coût unitaire : 19,125 + 18 + 24 = **61,125 USD**. Frais fixes non imputés : (20 000 − 16 000) × 24 = **96 000 USD**, en charges de N. Les frais du siège, la publicité et l'entrepôt des produits finis sont exclus du coût (§ 16(b)-(d)) : ils sont des charges de la période. Imputer tous les frais fixes sur 16 000 tonnes (30 USD la tonne) surévaluerait le stock.",
      },
      {
        num: 3,
        enonce: "Évaluez le stock final au bilan.",
        correction: "Coût : 2 000 × 61,125 = 122 250. Valeur nette de réalisation (IAS 2.31) : pour les 1 200 tonnes sous contrat, 66 − 3 = 63, supérieure au coût, donc aucune dépréciation ; pour les 800 tonnes en excédent, 58 − 3 = 55, inférieure au coût : dépréciation de (61,125 − 55) × 800 = **4 900**. Stock au bilan : 122 250 − 4 900 = **117 350 USD**. La dépréciation se calcule élément par élément, ou par groupe d'éléments similaires ; elle ne peut pas être compensée par la marge dégagée sur les quantités sous contrat (§ 29).",
      },
      {
        num: 4,
        enonce: "Fin N+1, les 800 tonnes sont toujours en stock ; leur valeur nette de réalisation est remontée à 60 USD. Quelle écriture, et selon quelle logique dans le SYSCOHADA ?",
        correction: "Nouvelle valeur : le plus faible de 61,125 et 60, soit 60 ; dépréciation nécessaire : 800 × 1,125 = 900. Reprise : 4 900 − 900 = **4 000**, dans la limite de la dépréciation initiale (IAS 2.33), portée en réduction du coût des stocks comptabilisé en charges de N+1 (§ 34) et expliquée dans les notes (§ 36(f)-(g)). Le SYSCOHADA révisé aboutit au même montant : débit du compte 39 Dépréciations des stocks par le crédit du compte 7593 Reprises de charges pour dépréciation des stocks (Titre VIII, ch. 14, § 4.1).",
      },
    ],
  },
  {
    id: 'ue13c4-cp3',
    titre: "Calcul : une obligation d'entreprise au coût amorti, puis à la juste valeur",
    contexte: "Le 1er janvier N, KIVU TÉLÉCOM SA (société fictive) acquiert une obligation d'entreprise : valeur nominale 200 000 USD, coupon annuel de 6 % payé le 31 décembre, remboursement au pair dans deux ans. Prix payé 195 000, frais de courtage 1 000. Le taux d'intérêt effectif qui égalise 196 000 et les flux futurs (12 000 puis 212 000) est d'environ 7,11 %. Fin N, le risque de crédit de l'émetteur n'a pas augmenté de façon importante : probabilité de défaillance à 12 mois 1,5 %, taux de perte en cas de défaillance 40 % (simplification pédagogique, sans actualisation). Juste valeur de l'obligation fin N : 198 500.",
    questions: [
      {
        num: 1,
        enonce: "L'entité détient l'obligation pour en percevoir les coupons jusqu'à l'échéance. Quel classement, et quelle valeur initiale ?",
        correction: "Les flux sont uniquement du principal et des intérêts, et le modèle économique est de percevoir les flux contractuels : **coût amorti** (IFRS 9.4.1.2). L'actif n'étant pas à la juste valeur par le biais du résultat net, le courtage s'ajoute à sa valeur initiale (§ 5.1.1) : 195 000 + 1 000 = **196 000**. La décote de 4 000 par rapport au nominal et le courtage seront étalés par le taux effectif.",
      },
      {
        num: 2,
        enonce: "Établissez le tableau d'amortissement et le produit d'intérêts de N.",
        correction: "N : 196 000 × 7,11 % ≈ **13 931** de produits d'intérêts, dont 12 000 encaissés ; valeur brute fin N : 196 000 + 13 931 − 12 000 = **197 931**. N+1 : 197 931 × 7,11 % ≈ 14 069 ; 197 931 + 14 069 − 212 000 = 0. Total des produits sur deux ans : 13 931 + 14 069 = **28 000**, soit les coupons (24 000) plus l'écart entre le remboursement (200 000) et le décaissement initial, courtage compris (196 000), c'est-à-dire 4 000.",
      },
      {
        num: 3,
        enonce: "Quelle correction de valeur pour pertes fin N ?",
        correction: "Sans augmentation importante du risque de crédit, pertes attendues pour les 12 mois à venir (§ 5.5.5) : 197 931 × 1,5 % × 40 % ≈ **1 188**, en résultat net comme perte de valeur (§ 5.5.8). Coût amorti fin N : 197 931 − 1 188 = 196 743. Les intérêts de N+1 restent calculés sur la valeur brute, l'actif n'étant pas déprécié (§ 5.4.1).",
      },
      {
        num: 4,
        enonce: "Reprenez le cas si l'obligation est gérée dans un portefeuille « percevoir et vendre ».",
        correction: "Classement à la juste valeur par le biais des autres éléments du résultat global (§ 4.1.2A). Le bilan montre la juste valeur, 198 500. En résultat net, les mêmes montants qu'au coût amorti (§ 5.7.11) : intérêts de 13 931 et perte de valeur de 1 188. La correction de valeur est comptabilisée en autres éléments du résultat global et ne réduit pas la valeur comptable (§ 5.5.2). La réserve de juste valeur reçoit donc la différence entre la juste valeur et la valeur brute (198 500 − 197 931 = 569), augmentée de la correction de valeur (1 188), soit 1 757. À la cession, ce cumul est reclassé en résultat net (§ 5.7.10).",
      },
    ],
  },
  {
    id: 'ue13c4-cp4',
    titre: "Classer : la trésorerie et les placements de KASAÏ AGRO SA (société fictive)",
    contexte: "Au 31 décembre N, un groupe agro-industriel de Mbuji-Mayi détient : (a) des bons du Trésor, conservés jusqu'à l'échéance ; (b) des obligations d'entreprise qu'il vend régulièrement pour financer ses campagnes d'achat de maïs, qui reviennent chaque année ; (c) des actions cotées sur une bourse étrangère, achetées pour être revendues à court terme ; (d) une participation de 5 % dans une société de transport fluvial qui achemine ses produits, conservée pour des raisons stratégiques ; (e) une obligation convertible en actions de l'émetteur ; (f) un contrat de change à terme USD/CDF ; (g) une avance versée à un fournisseur de semences, qui sera réglée par la livraison des semences.",
    questions: [
      {
        num: 1,
        enonce: "Classez chaque élément selon IFRS 9, ou dites pourquoi il en est exclu.",
        correction: "(a) Coût amorti : modèle « percevoir », flux de principal et d'intérêts (§ 4.1.2). (b) Juste valeur par le biais des autres éléments du résultat global : modèle « percevoir et vendre », qui correspond à la gestion des besoins de liquidités citée par B4.1.4A (§ 4.1.2A). (c) Juste valeur par le biais du résultat net : titres détenus à des fins de transaction (§ 4.1.4 ; B4.1.6). (d) Juste valeur par le biais du résultat net, sauf choix irrévocable, à l'origine et titre par titre, pour les autres éléments du résultat global (§ 5.7.5). (e) Juste valeur par le biais du résultat net : échec au critère des flux contractuels (B4.1.14, instrument F). (f) Dérivé, à la juste valeur par le biais du résultat net, sauf comptabilité de couverture documentée (annexe A ; § 6.4.1). (g) Hors champ : l'avance donne droit à des semences, non à de la trésorerie ; ce n'est pas un actif financier (IAS 32.11 ; AG11). Elle reste une avance sur achats de stocks.",
      },
      {
        num: 2,
        enonce: "Comment traiter les frais d'acquisition des éléments (a) et (c) ?",
        correction: "Pour (a), au coût amorti, les coûts de transaction s'ajoutent à la valeur initiale et sont étalés par le taux effectif (§ 5.1.1 ; annexe A). Pour (c), à la juste valeur par le biais du résultat net, ils sont passés en charges immédiatement, puisque le § 5.1.1 ne les ajoute qu'aux instruments qui ne sont pas à la juste valeur par le biais du résultat net.",
      },
      {
        num: 3,
        enonce: "Pour financer un nouveau siège, la direction vend exceptionnellement 10 % des bons du Trésor. Doit-elle reclasser le reste du portefeuille ?",
        correction: "Non. Un reclassement n'intervient que si l'entité change de modèle économique, « et seulement alors » (§ 4.4.1). Une vente peu fréquente, même d'une valeur importante, reste compatible avec le modèle « percevoir » (B4.1.3B). La vente dégage un profit ou une perte en résultat net (§ 5.7.2 ; 3.2.12). Si de telles ventes devenaient fréquentes et importantes, l'entité devrait réexaminer si le modèle de ses futurs achats est encore « percevoir ».",
      },
      {
        num: 4,
        enonce: "Le groupe importe ses engrais en dollars et vend sa farine en francs congolais. Que lui faut-il pour que le contrat de change (f) soit traité en couverture ?",
        correction: "Désigner formellement la relation et la documenter dès l'origine : instrument de couverture, élément couvert (les paiements futurs en dollars pour les engrais), risque couvert, méthode d'appréciation de l'efficacité et détermination du ratio de couverture (§ 6.4.1(b)). Démontrer ensuite un lien économique, l'absence d'effet dominant du risque de crédit et un ratio cohérent avec la gestion réelle (§ 6.4.1(c)). Sans cette documentation initiale, le contrat reste un dérivé dont toutes les variations de juste valeur passent en résultat net, alors que l'élément couvert n'est pas encore au bilan : le résultat devient volatil sans que le risque économique ait changé.",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue13',
  numero: 4,
  id: 'ue13-chapitre-4',
  titre: 'Stocks, créances et instruments financiers',
  sousTitre: "Coût et valeur nette de réalisation (IAS 2) ; classement, coût amorti, pertes de crédit attendues et décomptabilisation (IFRS 9)",
  infoBulle: "Chapitre 4 du module IFRS/IAS : stocks (champ, coût d'acquisition et de transformation, capacité normale, formules PEPS et coût moyen, valeur nette de réalisation, dépréciation et reprise) ; instruments financiers (définitions d'IAS 32, champ d'IFRS 9, évaluation initiale, classement selon le modèle économique et les flux contractuels, coût amorti et taux d'intérêt effectif, passifs financiers, pertes de crédit attendues et approche simplifiée, décomptabilisation, couverture) ; passerelles avec le SYSCOHADA révisé, illustrées par des entreprises commerciales et industrielles.",
  loiRef: "IAS 2 · IFRS 9 · IAS 32 § 11 · IAS 8 § 8 · AUDCIF art. 42-44 et 46 · SYSCOHADA, Titre VII (compte 49) et Titre VIII, ch. 14-15",
  moduleLabel: 'UE 13 · IFRS / IAS',
  retourRoute: '/ue13-ifrs-ias',
  coursId: 'ue13-ifrs-ias',
  objectifs: [
    "Délimiter le champ d'IAS 2 et appliquer sa règle d'évaluation : le plus faible du coût et de la valeur nette de réalisation.",
    "Construire le coût d'un stock, imputer les frais fixes sur la capacité normale et isoler le coût de la sous-activité.",
    "Appliquer les formules PEPS et coût moyen pondéré, et mesurer leur effet en période de hausse des prix.",
    "Déprécier un stock élément par élément, traiter les contrats fermes et les matières premières, et limiter la reprise.",
    "Reconnaître un instrument financier (IAS 32) et le champ d'IFRS 9 ; évaluer un instrument à l'origine.",
    "Classer un actif financier selon le modèle économique et le critère des flux contractuels, et en tirer le traitement des variations de valeur.",
    "Calculer un coût amorti avec le taux d'intérêt effectif, pour un actif comme pour un passif.",
    "Mesurer les pertes de crédit attendues à 12 mois ou pour la durée de vie, et construire une matrice pour les créances clients.",
    "Analyser une cession de créances au regard de la décomptabilisation, et énoncer les conditions de la comptabilité de couverture.",
    "Comparer IAS 2 et IFRS 9 avec le SYSCOHADA révisé, et chiffrer l'écart entre les deux jeux d'états d'une même entreprise.",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Les stocks sont évalués « au plus faible du coût et de la valeur nette de réalisation » (IAS 2.9). La valeur nette de réalisation est une valeur spécifique à l'entité, distincte de la juste valeur (§ 7).",
    "Le coût comprend les coûts d'acquisition, de transformation et les autres coûts engagés pour amener les stocks à l'endroit et dans l'état où ils se trouvent (§ 10). Les frais fixes sont imputés sur la capacité normale ; la sous-activité est une charge de la période (§ 13). Stockage de produits finis, frais administratifs et commerciaux sont exclus (§ 16).",
    "Identification spécifique pour les biens non fongibles ; sinon PEPS ou coût moyen pondéré, jamais DEPS, avec une même formule pour les stocks de nature et d'usage similaires (§ 23-26).",
    "Dépréciation élément par élément, jamais par grande catégorie (§ 29) ; prix du contrat pour les quantités sous contrat ferme (§ 31) ; reprise limitée à la dépréciation initiale (§ 33).",
    "Un actif financier est classé au coût amorti, à la juste valeur par les autres éléments du résultat global ou à la juste valeur par le résultat net selon le modèle économique et les flux contractuels (IFRS 9.4.1.1). Les instruments de capitaux propres sont à la juste valeur, avec une option irrévocable, sans recyclage, pour les autres éléments du résultat global (§ 5.7.5 ; B5.7.1).",
    "Le coût amorti se calcule avec le taux d'intérêt effectif, qui étale frais et décotes sur la durée de vie, sans tenir compte des pertes attendues (annexe A ; § 5.4.1). Les passifs financiers sont au coût amorti, sauf exceptions (§ 4.2.1), et ne sont jamais reclassés (§ 4.4.2).",
    "Les pertes de crédit attendues sont constatées dès l'origine : 12 mois tant que le risque n'a pas augmenté de façon importante, durée de vie ensuite (§ 5.5.3-5.5.5). Présomptions réfutables de 30 jours (augmentation importante) et de 90 jours (défaillance).",
    "Créances clients sans composante financement : toujours les pertes pour la durée de vie, la matrice étant une simplification admise (§ 5.5.15 ; B5.5.35). Le SYSCOHADA, lui, ne déprécie que des créances individualisées dont la perte est certaine dans son principe.",
    "Un actif financier cédé reste au bilan si l'entité en conserve la quasi-totalité des risques et avantages (§ 3.2.6) : un affacturage avec recours est un financement. La couverture exige une documentation dès l'origine (§ 6.4.1).",
  ],
  references: [
    { genre: 'texte', intitule: "IAS 2 — Stocks", precision: "§§ 1 à 42 (texte français intégral)" },
    { genre: 'texte', intitule: "IFRS 9 — Instruments financiers", precision: "chapitres 1 à 7, annexe A et guide d'application B (texte français intégral)" },
    { genre: 'texte', intitule: "IAS 32 — Instruments financiers : Présentation", precision: "§ 11 (définitions)" },
    { genre: 'texte', intitule: "IAS 8 — Méthodes comptables, changements d'estimations comptables et erreurs", precision: "§ 8 (importance relative)" },
    { genre: 'texte', intitule: "AUDCIF et SYSCOHADA révisé", precision: "art. 42 à 44 et 46 ; Titre VII, compte 49 ; Titre VIII, ch. 14 (stocks) et ch. 15 (affacturage, titrisation)" },
    { genre: 'texte', intitule: "J.-B. Tshimanga Mulumba (CPCC), IFRS - Stocks, créances & instruments financiers (IAS 2 & IFRS 9)", precision: "support de cours, module 4 : illustrations AGROFOOD, DISTRICOM et TECHMARKET" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "IAS 2 et IFRS 9 (texte français intégral) ; IAS 32 et IAS 8 ; AUDCIF et SYSCOHADA révisé ; support de cours du module 4 (J.-B. Tshimanga Mulumba, CPCC).",
}

export default chapitre
