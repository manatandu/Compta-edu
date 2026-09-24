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
//   B5.5.35, B5.5.37, B5.7.1, B5.1.1. Les passages entre guillemets reproduisent le
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
    titre: "Objectif, définitions et champ d'application d'IAS 2",
    navLabel: 'IAS 2 : champ',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les stocks et les créances clients constituent l'essentiel de l'actif courant d'une entreprise commerciale ou industrielle. Ils sont exposés aux risques ordinaires de l'exploitation : risque de mévente et d'obsolescence pour les premiers, risque de non-paiement pour les secondes. À la différence des immobilisations, ils sont destinés à se convertir à brève échéance en chiffre d'affaires puis en trésorerie. IAS 2 et IFRS 9 poursuivent à leur égard un objectif commun, qui est d'empêcher la présentation au bilan d'actifs courants pour un montant supérieur à celui que l'entité recouvrera, mais elles le mettent en œuvre selon des techniques distinctes : plafonnement du coût par la valeur nette de réalisation pour les stocks, anticipation des pertes de crédit pour les créances. Le chapitre examine successivement ces deux régimes, puis le classement, l'évaluation et la sortie des instruments financiers.",
      },
      { type: 'intertitre', texte: "4.1.1 Objectif de la norme" },
      {
        type: 'paragraphe',
        texte: "Tout coût incorporé au stock est retiré des charges de l'exercice et n'est reconnu en résultat qu'au moment de la vente, sous forme de coût des ventes. La délimitation du coût des stocks commande donc la répartition du résultat entre les exercices. C'est pourquoi IAS 2 définit son objet comme la détermination du montant « des coûts à comptabiliser en tant qu'actif et à différer jusqu'à la comptabilisation des produits correspondants » (§ 1). Un coût indûment porté en stock majore le résultat de l'exercice au détriment de l'exercice suivant ; un coût indûment passé en charges produit l'effet inverse.",
      },
      { type: 'intertitre', texte: "4.1.2 Définitions et champ d'application" },
      {
        type: 'paragraphe',
        texte: "Les stocks sont des actifs « (a) détenus en vue de la vente dans le cours normal de l'activité ; (b) en cours de production pour une telle vente ; ou (c) sous forme de matières premières ou de fournitures devant être consommées dans le processus de production ou de prestation de services » (§ 6). La définition repose sur la destination de l'actif et non sur sa nature : un même terrain constitue un stock chez le promoteur qui le détient pour la revente et une immobilisation chez l'industriel qui y construit son usine (§ 8).",
      },
      {
        type: 'carte',
        titre: "Tableau 4.1 — Champ d'application d'IAS 2 (§ 2-5 et 8)",
        tableau: {
          entetes: ['Catégorie', 'Traitement', 'Référence'],
          lignes: [
            ["Marchandises d'un distributeur, terrains et immeubles détenus pour la revente, produits finis, en-cours, matières et fournitures", "Application intégrale d'IAS 2", '§ 8'],
            ["Instruments financiers ; actifs biologiques et produits agricoles au moment de la récolte", "Hors champ : IAS 32 et IFRS 9 ; IAS 41", '§ 2'],
            ["Stocks des producteurs agricoles, forestiers et miniers évalués à la valeur nette de réalisation selon des pratiques bien établies dans leur secteur", "Exclus des seules règles d'évaluation ; variations en résultat net", '§ 3(a) et 4'],
            ["Stocks des courtiers négociants évalués à la juste valeur diminuée des coûts de vente", "Exclus des seules règles d'évaluation ; variations en résultat net", '§ 3(b) et 5'],
          ],
        },
      },
      { type: 'intertitre', texte: "4.1.3 Principe d'évaluation" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 2, § 9, 6 et 7",
        texte: "« Les stocks doivent être évalués au plus faible du coût et de la valeur nette de réalisation. » (§ 9). La valeur nette de réalisation est « le prix de vente estimé dans le cours normal de l'activité, diminué des coûts estimés pour l'achèvement et des coûts estimés nécessaires pour réaliser la vente » (§ 6). Rapprochée de la juste valeur diminuée des coûts de la vente, elle s'en distingue ainsi : « La première est une valeur spécifique à l'entité, contrairement à la seconde. » (§ 7).",
      },
      {
        type: 'paragraphe',
        texte: "La règle combine deux bases. Le coût, fondé sur les transactions passées, constitue la base normale ; la valeur nette de réalisation, fondée sur les perspectives de vente, intervient comme plafond. Le principe est asymétrique : une valeur nette de réalisation inférieure au coût entraîne une dépréciation, une valeur supérieure ne permet pas de constater la plus-value latente. Le caractère spécifique de la valeur nette de réalisation tient à ce qu'elle intègre les conditions propres de l'entité (circuits de distribution, coûts d'achèvement, contrats conclus), là où la juste valeur retient le point de vue des intervenants du marché.",
      },
      {
        type: 'filet',
        titre: "Observation — Les stocks des producteurs miniers",
        texte: "Un producteur de cuivre établi dans le Haut-Katanga peut être tenté d'évaluer son concentré à la valeur nette de réalisation, variations en résultat, plutôt qu'au plus faible du coût et de cette valeur. IAS 2 ne l'admet que si la pratique est « bien établie » dans le secteur (§ 3(a)) et cite des conditions qui la justifient : vente assurée par un contrat à terme ou une garantie de l'État, ou existence d'un marché actif sur lequel le risque de mévente est négligeable (§ 4). Le métal coté remplit en principe la seconde condition ; un produit intermédiaire dépourvu de débouché liquide la remplit difficilement. L'entité doit documenter la pratique dont elle se prévaut et mesurer la volatilité qu'elle introduit dans son résultat. À défaut, la règle générale du § 9 s'applique.",
      },
    ],
  },
  {
    numero: '4.2',
    titre: "La détermination du coût des stocks",
    navLabel: 'IAS 2 : le coût',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le coût des stocks comprend « tous les coûts d'acquisition, coûts de transformation et autres coûts engagés pour amener les stocks à l'endroit et dans l'état où ils se trouvent » (§ 10). Un coût n'est incorporable que s'il satisfait à ce double critère : il se rattache au stock, et il contribue à le mettre en place et en état. Les coûts de commercialisation, qui interviennent après que le stock a atteint son état de vente, en sont exclus par construction.",
      },
      { type: 'intertitre', texte: "4.2.1 Le coût d'acquisition" },
      {
        type: 'paragraphe',
        texte: "Le coût d'acquisition comprend le prix d'achat, les droits de douane et autres taxes non récupérables, les frais de transport et de manutention et les autres coûts directement attribuables à l'acquisition, diminués des remises, rabais et autres éléments similaires (§ 11). Pour une entreprise congolaise qui importe par le port de Matadi ou par la frontière zambienne, les droits et taxes non récupérables et les frais d'acheminement représentent souvent une fraction importante du coût de revient ; leur omission affecte l'ensemble de la chaîne d'évaluation, de la marge au stock final. La TVA récupérable, en revanche, ne constitue pas un élément du coût.",
      },
      { type: 'intertitre', texte: "4.2.2 Le coût de transformation et l'imputation des frais fixes" },
      {
        type: 'paragraphe',
        texte: "Le coût de transformation comprend les coûts directement liés aux unités produites, comme la main-d'œuvre directe, ainsi qu'une affectation systématique des frais généraux de production variables et fixes (§ 12). Les frais fixes sont imputés sur la base de la **capacité normale** des installations, définie comme la production moyenne attendue sur un certain nombre de périodes dans des circonstances normales, compte tenu de la perte de capacité résultant de l'entretien planifié (§ 13). Les frais fixes non imputés en raison d'une sous-activité sont comptabilisés en charges de la période. En cas de production anormalement élevée, le montant de frais fixes affecté à chaque unité est réduit « de telle sorte que les stocks ne soient pas évalués au-dessus du coût » (§ 13). Le fondement de la règle est économique : le coût d'une capacité inemployée ne rémunère aucune unité produite et ne peut donc être différé dans le stock.",
      },
      {
        type: 'carte',
        titre: "Exemple 4.1 — Imputation rationnelle des frais fixes de production (brasserie du Kasaï, société fictive)",
        texte: "Frais généraux fixes de production de l'exercice : 1 200 000 USD. Capacité normale : 600 000 casiers. Production réelle, réduite par les interruptions de fourniture d'électricité : 450 000 casiers. Coûts variables (matières, main-d'œuvre directe, frais variables) : 3 USD par casier. Stock final : 50 000 casiers.",
        tableau: {
          entetes: ['', 'Imputation rationnelle (IAS 2, § 13)', 'Imputation intégrale (non conforme)'],
          lignes: [
            ['Frais fixes par casier', '1 200 000 / 600 000 = 2,00', '1 200 000 / 450 000 = 2,67'],
            ['Coût unitaire', '3 + 2 = **5,00**', '3 + 2,67 = 5,67'],
            ['Frais fixes imputés à la production', '450 000 × 2 = 900 000', '1 200 000'],
            ['Coût de la sous-activité', '**300 000**, en charges de la période', '0'],
            ['Stock final (50 000 casiers)', '**250 000**', '283 333'],
          ],
        },
        note: "L'imputation intégrale reporterait 33 333 USD de coût de sous-activité sur l'exercice suivant, par l'intermédiaire du stock final. Le SYSCOHADA révisé retient la même méthode sous le nom d'imputation rationnelle des charges fixes (Titre VIII, ch. 14, § 2.3.2).",
      },
      { type: 'intertitre', texte: "4.2.3 Les coûts exclus" },
      {
        type: 'carte',
        titre: "Tableau 4.2 — Coûts exclus du coût des stocks (IAS 2, § 16-18)",
        tableau: {
          entetes: ['Coût', 'Traitement', 'Justification'],
          lignes: [
            ["Montants anormaux de matières, de main-d'œuvre ou d'autres coûts de production gaspillés", 'Charges de la période', "Ils ne contribuent pas à amener le stock dans son état"],
            ["Coûts de stockage, sauf s'ils sont nécessaires au processus de production préalablement à une nouvelle étape", 'Charges de la période', "La maturation d'une bière ou le séchage d'un bois est une étape de production ; l'entreposage de produits finis ne l'est pas"],
            ["Frais généraux administratifs qui ne contribuent pas à amener les stocks à l'endroit et dans l'état où ils se trouvent", 'Charges de la période', "Absence de lien avec la production"],
            ['Frais de commercialisation', 'Charges de la période', "Postérieurs à la mise en état de vente"],
            ["Élément de financement d'un achat à paiement différé", "Charge d'intérêt sur la durée du financement (§ 18)", "Différence entre le prix d'un crédit normal et le montant payé ; incorporation limitée aux cas prévus par IAS 23 (§ 17)"],
          ],
        },
      },
      { type: 'intertitre', texte: "4.2.4 Les formules de coût" },
      {
        type: 'paragraphe',
        texte: "Il reste à répartir le coût entre les unités vendues et les unités en stock. Pour les éléments qui ne sont pas habituellement fongibles et pour ceux qui sont affectés à des projets spécifiques, la méthode de l'identification spécifique est obligatoire (§ 23). Pour les autres, la norme admet deux formules seulement : « la méthode du premier entré, premier sorti (PEPS) ou celle du coût moyen pondéré » (§ 25). La méthode du dernier entré, premier sorti n'est pas autorisée. Une même formule doit être utilisée pour tous les stocks de nature et d'usage similaires ; une différence de situation géographique ou de règles fiscales ne suffit pas à justifier l'emploi de formules différentes (§ 26).",
      },
      {
        type: 'carte',
        titre: "Exemple 4.2 — Incidence de la formule de coût sur le résultat (stock de ciment)",
        texte: "Stock initial : 1 000 sacs à 20. Achat de 3 000 sacs à 22 ; sortie de 2 500 sacs ; achat de 2 000 sacs à 25 ; sortie de 2 000 sacs. Coût total disponible : 20 000 + 66 000 + 50 000 = 136 000. Stock final : 1 500 sacs.",
        tableau: {
          entetes: ['', 'PEPS', 'Coût moyen pondéré après chaque entrée'],
          lignes: [
            ['Sortie 1 (2 500 sacs)', '1 000 × 20 + 1 500 × 22 = 53 000', '2 500 × 21,5 = 53 750'],
            ['Sortie 2 (2 000 sacs)', '1 500 × 22 + 500 × 25 = 45 500', '2 000 × 23,5 = 47 000'],
            ['Coût des ventes', '**98 500**', '**100 750**'],
            ['Stock final (1 500 sacs)', '1 500 × 25 = **37 500**', '1 500 × 23,5 = **35 250**'],
          ],
        },
        note: "En période de hausse des prix, le PEPS valorise le stock final aux prix les plus récents et dégage un résultat plus élevé ; le coût moyen pondéré atténue cet effet. L'écart croît avec le rythme de dépréciation monétaire. La formule retenue figure dans les notes (§ 36(a)) et ne peut être modifiée que dans les conditions d'IAS 8.",
      },
      {
        type: 'filet',
        titre: "Rapprochement avec le SYSCOHADA révisé",
        texte: "L'article 44 de l'AUDCIF et le chapitre 14 du Titre VIII retiennent les mêmes composantes : coût d'acquisition et coût de production, exclusions identiques, imputation rationnelle des charges fixes, identification spécifique pour les biens individualisables, PEPS ou coût moyen pondéré pour les biens fongibles, coût standard et méthode du prix de détail admis lorsqu'ils donnent un résultat proche du coût. Le SYSCOHADA admet en outre, en inventaire intermittent, un coût moyen pondéré calculé sur la durée moyenne de stockage, qu'il illustre par un exemple (rotation de 5, soit 2,4 mois d'écoulement, coût d'entrée d'octobre appliqué au stock final). Sur la détermination du coût, une entité qui établit des états selon les deux référentiels peut donc conserver un calcul unique.",
      },
    ],
  },
  {
    numero: '4.3',
    titre: "La valeur nette de réalisation, la dépréciation et sa reprise",
    navLabel: 'IAS 2 : dépréciation',
    blocs: [
      { type: 'intertitre', texte: "4.3.1 Estimation de la valeur nette de réalisation" },
      {
        type: 'paragraphe',
        texte: "Le coût d'un stock peut devenir irrécouvrable lorsque les articles sont endommagés ou obsolètes, lorsque leur prix de vente a baissé, ou lorsque les coûts d'achèvement ou de vente ont augmenté (§ 28). La dépréciation qui en résulte procède du même principe qu'IAS 36, appliqué à un actif à rotation rapide : un actif ne peut être présenté pour un montant supérieur à celui que sa vente ou son utilisation permettra de recouvrer. L'estimation est fondée sur les éléments probants les plus fiables disponibles à la date de clôture ; elle tient compte des événements postérieurs dans la mesure où ils confirment des conditions existant à la clôture (§ 30), ainsi que de l'objectif dans lequel le stock est détenu (§ 31).",
      },
      { type: 'intertitre', texte: "4.3.2 Règles d'application" },
      {
        type: 'carte',
        titre: "Tableau 4.3 — Règles d'application de la dépréciation des stocks (IAS 2, § 29-33)",
        tableau: {
          entetes: ['Question', 'Règle', 'Référence'],
          lignes: [
            ["Niveau d'appréciation", "Élément par élément, avec regroupement possible d'éléments similaires d'une même gamme de produits ; jamais par grande catégorie ni par secteur opérationnel", '§ 29'],
            ["Stocks affectés à des contrats fermes", "Prix du contrat pour les quantités engagées, prix de vente généraux pour l'excédent ; perte sur contrat excédant les stocks détenus relevant d'IAS 37", '§ 31'],
            ["Matières premières", "Pas de dépréciation si les produits finis auxquels elles sont incorporées seront vendus au coût ou au-dessus ; sinon, dépréciation, le coût de remplacement pouvant constituer la meilleure mesure disponible", '§ 32'],
            ["Reprise", "Lorsque les circonstances ont disparu ou que la valeur nette de réalisation a augmenté, reprise limitée au montant de la dépréciation initiale", '§ 33'],
          ],
        },
      },
      { type: 'intertitre', texte: "4.3.3 Comptabilisation de la dépréciation et de la reprise" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 2, § 34",
        texte: "« Le montant de toute dépréciation des stocks pour les ramener à leur valeur nette de réalisation et toutes les pertes de stocks doivent être comptabilisés en charges de la période au cours de laquelle la dépréciation ou la perte se produit. Le montant de toute reprise d'une dépréciation des stocks résultant d'une augmentation de la valeur nette de réalisation doit être comptabilisé comme une réduction du montant des stocks comptabilisé en charges dans la période au cours de laquelle la reprise intervient. »",
      },
      {
        type: 'carte',
        titre: "Exemple 4.3 — Dépréciation puis reprise sur produits finis (AGROFOOD SA)",
        texte: "Au 31 décembre N, AGROFOOD détient 1 000 unités de produits finis au coût unitaire de 120 USD, soit 120 000. À la suite d'une baisse des prix du marché, le prix de vente estimé s'établit à 110 et les coûts nécessaires à la vente à 10 par unité. En N+1, 600 unités sont vendues ; à la clôture, le prix de vente estimé remonte à 125, les coûts de vente restant de 10.",
        tableau: {
          entetes: ['', 'Clôture N', 'Clôture N+1'],
          lignes: [
            ['Unités en stock', '1 000', '400'],
            ['Valeur nette de réalisation unitaire', '110 − 10 = 100', '125 − 10 = 115'],
            ['Valeur retenue (plus faible du coût de 120 et de la VNR)', '100', '115'],
            ['Dépréciation nécessaire', '1 000 × 20 = **20 000**', '400 × 5 = 2 000'],
            ['Dépréciation existante sur les unités restantes', '—', '400 × 20 = 8 000'],
            ['Écriture de la période', 'Dotation de **20 000**', 'Reprise de **6 000**'],
            ['Stock au bilan', '100 000', '46 000'],
          ],
        },
        note: "La dépréciation afférente aux 600 unités vendues (12 000) sort avec leur valeur comptable dans le coût des ventes de N+1 (§ 34). La reprise de 6 000 réduit le coût des stocks comptabilisé en charges ; elle ne peut porter la valeur du stock au-dessus du coût. Les notes indiquent le montant de la dépréciation de N, celui de la reprise de N+1 et les circonstances qui l'ont provoquée, ici le redressement des prix (§ 36(e)-(g)). Selon le support d'origine du module, cette dépréciation « n'est pas une anticipation pessimiste, mais une correction réaliste de la valeur économique du stock ».",
      },
      { type: 'intertitre', texte: "4.3.4 Informations à fournir" },
      {
        type: 'carte',
        titre: "Tableau 4.4 — Informations à fournir sur les stocks (IAS 2, § 36)",
        tableau: {
          entetes: ['Information', 'Utilité pour le lecteur'],
          lignes: [
            ["Méthodes comptables, dont la formule de coût", "Comparabilité entre entités et entre exercices"],
            ["Valeur comptable totale et par catégories appropriées ; valeur des stocks comptabilisés à la juste valeur diminuée des coûts de vente", "Composition de l'actif courant"],
            ["Montant des stocks comptabilisé en charges ; dépréciations et reprises de la période, avec les circonstances des reprises", "Appréciation de la qualité de la marge et des estimations"],
            ["Valeur comptable des stocks donnés en nantissement de passifs", "Mesure des actifs affectés en garantie aux prêteurs"],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Rapprochement avec le SYSCOHADA révisé",
        texte: "Le SYSCOHADA révisé évalue lui aussi les stocks « au plus faible du coût d'entrée et de la valeur actuelle », la valeur actuelle des stocks représentant la valeur nette de réalisation (Titre VIII, ch. 14, § 3.2.1). Il décline la règle par nature (matières, en-cours, produits intermédiaires, produits finis) selon la logique du § 32 d'IAS 2, exclut toute dépréciation forfaitaire fondée sur la seule rotation, et enregistre dépréciation et reprise par les comptes 6593, 39 et 7593, la dépréciation étant obligatoire même en l'absence de bénéfice. Deux différences subsistent. En cas de cessation de la continuité d'exploitation, il retient explicitement une valeur liquidative. La perte de stocks par sinistre est classée en charges hors activités ordinaires (compte 831) et l'indemnité correspondante en produits hors activités ordinaires (compte 841), alors qu'IAS 1 ne connaît pas cette rubrique.",
      },
    ],
  },
  {
    numero: '4.4',
    titre: "Les instruments financiers : définitions, champ d'application et évaluation initiale",
    navLabel: 'Instruments financiers',
    blocs: [
      {
        type: 'paragraphe',
        texte: "IFRS 9 a pour objectif d'établir des principes d'information financière sur les actifs et passifs financiers qui fournissent des informations utiles « pour l'appréciation des montants, du calendrier et du degré d'incertitude des flux de trésorerie futurs de l'entité » (§ 1.1). Applicable aux exercices ouverts à compter du 1er janvier 2018 (§ 7.1.1), elle a remplacé IAS 39, qui ne subsiste que pour certaines relations de couverture. Dans une entreprise commerciale ou industrielle, son champ couvre les créances clients, la trésorerie et les placements, les prêts consentis au personnel, aux distributeurs ou à des partenaires, les emprunts et les dettes fournisseurs, ainsi que les dérivés de change ou de matières premières.",
      },
      { type: 'intertitre', texte: "4.4.1 Définitions" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 32, § 11",
        texte: "« Un **instrument financier** est tout contrat qui donne lieu à un actif financier pour une entité et à un passif financier ou à un instrument de capitaux propres pour une autre entité. » « Un **instrument de capitaux propres** est tout contrat mettant en évidence un intérêt résiduel dans les actifs d'une entité après déduction de tous ses passifs. »",
      },
      {
        type: 'paragraphe',
        texte: "La définition repose sur deux éléments : l'existence d'un contrat et la symétrie des positions entre deux entités. Un actif financier est notamment de la trésorerie, un instrument de capitaux propres d'une autre entité ou un droit contractuel de recevoir de la trésorerie ou un autre actif financier (IAS 32, § 11). Il en résulte deux exclusions d'importance pratique. Un droit à recevoir des biens ou des services, tel qu'une avance versée à un fournisseur ou une charge constatée d'avance, n'est pas un actif financier, faute de donner droit à de la trésorerie. Une dette d'impôt, qui procède de la loi et non d'un contrat, n'est pas un passif financier (IAS 32, AG11-AG12).",
      },
      { type: 'intertitre', texte: "4.4.2 Champ d'application et comptabilisation initiale" },
      {
        type: 'carte',
        titre: "Tableau 4.5 — Champ d'application et comptabilisation d'IFRS 9",
        tableau: {
          entetes: ['Question', 'Règle', 'Référence'],
          lignes: [
            ["Instruments exclus", "Participations dans des filiales, entreprises associées et coentreprises ; droits et obligations des contrats de location, sauf décomptabilisation et dépréciation des créances locatives ; avantages du personnel ; instruments de capitaux propres de l'émetteur ; contrats d'assurance, notamment", '§ 2.1'],
            ["Contrats portant sur des éléments non financiers", "Inclus s'ils sont réglables en net, sauf lorsqu'ils sont conclus et maintenus pour les besoins d'achat, de vente ou d'utilisation prévus de l'entité", '§ 2.4'],
            ["Date de comptabilisation", "« uniquement lorsqu'elle devient partie aux dispositions contractuelles de l'instrument »", '§ 3.1.1'],
            ["Dérivé", "Valeur fonction d'un sous-jacent ; investissement initial nul ou faible ; règlement à une date future", 'Annexe A'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Deux illustrations précisent la portée du § 2.4. Un contrat à terme sur le cuivre conclu dans un but spéculatif et réglable en net relève d'IFRS 9 ; un contrat de livraison de ciment conclu pour les besoins de production de l'usine n'en relève pas. De même, en application du § 3.1.1, une commande reçue ne constitue pas une créance tant que la livraison n'a pas eu lieu, et une promesse d'embauche ne constitue pas un passif financier.",
      },
      { type: 'intertitre', texte: "4.4.3 Évaluation initiale" },
      {
        type: 'paragraphe',
        texte: "Lors de la comptabilisation initiale, l'actif ou le passif financier est évalué à sa **juste valeur**, majorée ou minorée des coûts de transaction directement attribuables à son acquisition ou à son émission, sauf s'il est évalué à la juste valeur par le biais du résultat net, auquel cas ces coûts sont comptabilisés en charges (§ 5.1.1). Les coûts de transaction sont des coûts marginaux, c'est-à-dire des coûts qui n'auraient pas été engagés en l'absence de l'opération (annexe A). Par exception, une créance client qui ne comporte pas de composante financement importante est évaluée à son prix de transaction au sens d'IFRS 15 (§ 5.1.3), ce qui dispense d'actualiser les créances commerciales à échéance courte.",
      },
      {
        type: 'paragraphe',
        texte: "La juste valeur initiale correspond normalement au prix de transaction. Lorsqu'une partie de la contrepartie versée rémunère autre chose que l'instrument financier, l'entité doit évaluer séparément la juste valeur de l'instrument ; B5.1.1 cite le cas du prêt à long terme ne portant pas intérêt, dont la juste valeur est la valeur actualisée des encaissements futurs au taux du marché d'un instrument similaire. « Tout excédent prêté constitue une charge ou une réduction des produits, à moins qu'il ne remplisse les conditions de comptabilisation en tant qu'autre type d'actif. » (B5.1.1).",
      },
      {
        type: 'carte',
        titre: "Exemple 4.4 — Prêt sans intérêt consenti à un cadre",
        texte: "Une société prête 10 000 USD à l'un de ses cadres, sans intérêt, remboursable en une fois dans deux ans. Le taux du marché pour un prêt comparable est de 8 %.",
        tableau: {
          entetes: ['Étape', 'Calcul', 'Montant (USD)'],
          lignes: [
            ["Juste valeur initiale du prêt", '10 000 / 1,08²', '**8 573**'],
            ["Avantage consenti au cadre, en charges de personnel", '10 000 − 8 573', '**1 427**'],
            ["Produit d'intérêts de l'année 1", '8 573 × 8 %', '686'],
            ["Coût amorti à la fin de l'année 1", '8 573 + 686', '9 259'],
            ["Produit d'intérêts de l'année 2", '9 259 × 8 %', '741'],
            ["Coût amorti à l'échéance", '9 259 + 741', '10 000'],
          ],
        },
        note: "La différence de 1 427 rémunère le cadre : elle constitue un avantage du personnel et non une composante du prêt. Le prêt produit ensuite des intérêts au taux effectif de 8 %, de sorte que sa valeur comptable atteint le montant nominal à l'échéance. La charge totale comptabilisée par la société sur les deux exercices reste nulle en net (1 427 de charges, 1 427 de produits d'intérêts), mais sa répartition entre charges de personnel et produits financiers reflète la substance de l'opération.",
      },
    ],
  },
  {
    numero: '4.5',
    titre: "Le classement des actifs financiers",
    navLabel: 'Classement',
    blocs: [
      {
        type: 'paragraphe',
        texte: "IFRS 9 substitue aux catégories d'IAS 39 un classement fondé sur deux critères. Sauf désignation particulière, un actif financier est classé au coût amorti, à la juste valeur par le biais des autres éléments du résultat global ou à la juste valeur par le biais du résultat net, « en fonction à la fois : (a) du modèle économique que suit l'entité pour la gestion des actifs financiers ; (b) des caractéristiques des flux de trésorerie contractuels de l'actif financier » (§ 4.1.1). Le premier critère porte sur la gestion des actifs par l'entité, le second sur les droits que confère le contrat. Leur combinaison détermine la base d'évaluation, selon le tableau suivant.",
      },
      {
        type: 'carte',
        titre: "Tableau 4.6 — Classement des instruments de dette (IFRS 9, § 4.1.2 à 4.1.4)",
        tableau: {
          entetes: ['Modèle économique', 'Flux constitués uniquement de principal et d\'intérêts', 'Autres flux'],
          lignes: [
            ["Détention pour percevoir les flux contractuels (§ 4.1.2(a))", '**Coût amorti**', 'Juste valeur par le biais du résultat net'],
            ["Détention pour percevoir les flux et vendre (§ 4.1.2A(a))", '**Juste valeur par le biais des autres éléments du résultat global**, avec recyclage', 'Juste valeur par le biais du résultat net'],
            ["Autres modèles, notamment gestion sur la base de la juste valeur ou transaction (§ 4.1.4 ; B4.1.5-B4.1.6)", 'Juste valeur par le biais du résultat net', 'Juste valeur par le biais du résultat net'],
          ],
        },
      },
      { type: 'intertitre', texte: "4.5.1 Le modèle économique" },
      {
        type: 'paragraphe',
        texte: "Le modèle économique est une donnée de fait et non une déclaration d'intention. Il s'apprécie au niveau des portefeuilles, à partir de la fréquence, de la valeur et des motifs des ventes passées ainsi que des attentes de ventes futures ; les ventes « ne peuvent donc pas être considérées isolément » (B4.1.2C). Le modèle de perception des flux contractuels n'exige pas la conservation de tous les actifs jusqu'à l'échéance : des ventes peu fréquentes ou de faible valeur restent compatibles avec lui (B4.1.3), de même que les ventes motivées par une augmentation du risque de crédit (B4.1.3A). Le modèle mixte, qui associe perception et vente, correspond notamment à la gestion des besoins de liquidités courants, au maintien d'un profil de rendement ou à l'adossement de la durée des actifs à celle des passifs (B4.1.4A). Le modèle résiduel vise la gestion en vue de réaliser la juste valeur par la vente, la perception des flux n'y ayant qu'un rôle accessoire (B4.1.5).",
      },
      { type: 'intertitre', texte: "4.5.2 Les caractéristiques des flux contractuels" },
      {
        type: 'paragraphe',
        texte: "Le second critère, désigné dans la pratique par l'acronyme SPPI (*solely payments of principal and interest*), vérifie que l'instrument présente les caractéristiques d'un **contrat de prêt de base**. Le principal est la juste valeur de l'actif lors de sa comptabilisation initiale ; l'intérêt rémunère la valeur temps de l'argent, le risque de crédit associé au principal, les autres risques et frais d'un prêt de base, ainsi qu'une marge (§ 4.1.3). Le critère n'est pas satisfait lorsque les flux exposent le porteur à des risques étrangers à un prêt de base, tels que les variations du cours d'une action ou du prix d'une matière première (B4.1.7A). B4.1.14 en donne des exemples : obligation convertible en un nombre déterminé d'instruments de capitaux propres de l'émetteur, prêt à taux variable inversé, instrument perpétuel dont les intérêts ne sont pas versés si leur paiement compromettait la solvabilité de l'émetteur, les intérêts différés ne portant pas eux-mêmes intérêt.",
      },
      { type: 'intertitre', texte: "4.5.3 Démarche de classement et reclassement" },
      {
        type: 'carte',
        titre: "Tableau 4.7 — Démarche de classement d'un actif financier",
        tableau: {
          entetes: ['Étape', 'Question', 'Conclusion'],
          lignes: [
            ['1', "L'actif est-il un instrument de capitaux propres ?", "Juste valeur par le biais du résultat net, sauf choix irrévocable, titre par titre, pour les autres éléments du résultat global s'il n'est pas détenu à des fins de transaction ; dans ce cas, pas de recyclage et dividendes en résultat (§ 4.1.4, 5.7.5, 5.7.6 ; B5.7.1)"],
            ['2', "Pour un instrument de dette, les flux sont-ils uniquement du principal et des intérêts ?", "Dans la négative : juste valeur par le biais du résultat net"],
            ['3', "Dans l'affirmative, quel est le modèle économique du portefeuille ?", "Perception : coût amorti ; perception et vente : juste valeur par le biais des autres éléments du résultat global ; autre : juste valeur par le biais du résultat net"],
            ['4', "La désignation à la juste valeur par le biais du résultat net élimine-t-elle une non-concordance comptable ?", "Option irrévocable ouverte lors de la comptabilisation initiale (§ 4.1.5)"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Le classement est arrêté lors de la comptabilisation initiale. Un actif financier n'est reclassé que si l'entité modifie son modèle économique de gestion des actifs financiers, « et seulement alors » (§ 4.4.1), ce qui doit demeurer exceptionnel. Pour les passifs, la règle est absolue : « Une entité ne doit reclasser aucun passif financier. » (§ 4.4.2).",
      },
      {
        type: 'filet',
        titre: "Observation — Les participations minoritaires non cotées",
        texte: "De nombreuses entreprises congolaises détiennent des participations minoritaires non cotées : parts dans une société de transport fluvial qui les dessert, actions d'un fournisseur, titres reçus lors d'une restructuration. IFRS 9 impose leur évaluation à la juste valeur. B5.2.3 admet toutefois que, « dans des circonstances limitées », le coût puisse constituer une estimation appropriée de la juste valeur, notamment lorsque les informations récentes sont insuffisantes ou que le coût représente la meilleure estimation au sein d'une large fourchette de valeurs possibles. Il s'agit d'une tolérance d'estimation et non d'une catégorie comptable : l'entité doit vérifier à chaque clôture que ces circonstances persistent. Le choix irrévocable de la présentation en autres éléments du résultat global permet par ailleurs d'isoler la volatilité de ces titres du résultat net.",
      },
    ],
  },
  {
    numero: '4.6',
    titre: "Le coût amorti et la méthode du taux d'intérêt effectif",
    navLabel: 'Coût amorti',
    blocs: [
      { type: 'intertitre', texte: "4.6.1 Définitions" },
      {
        type: 'paragraphe',
        texte: "Le coût amorti ne se confond pas avec le coût historique. L'annexe A le définit comme le montant attribué à l'actif ou au passif financier lors de sa comptabilisation initiale, « diminuée des remboursements en principal, majorée ou diminuée du cumul de l'amortissement, calculé par la méthode du taux d'intérêt effectif, de toute différence entre cette valeur initiale et la valeur à l'échéance et, dans le cas d'un actif financier, ajustée au titre de la correction de valeur pour pertes, le cas échéant ». Le **taux d'intérêt effectif** est l'instrument de cet amortissement : il répartit sur la durée de vie de l'instrument l'ensemble des écarts entre le montant initial et le montant remboursé, qu'il s'agisse de frais de dossier, de coûts de transaction, de décotes ou de primes.",
      },
      {
        type: 'filet',
        titre: "Texte de référence — IFRS 9, annexe A et § 5.4.1",
        texte: "Le taux d'intérêt effectif est le « Taux qui actualise les sorties ou entrées de trésorerie futures estimées sur la durée de vie attendue d'un actif financier ou d'un passif financier de manière à obtenir exactement la valeur comptable brute de l'actif financier ou le coût amorti du passif financier. » Pour le calculer, l'entité prend en compte toutes les modalités contractuelles de l'instrument, « mais elle ne doit pas tenir compte des pertes de crédit attendues » (annexe A). Les produits d'intérêts « doivent être calculés selon la méthode du taux d'intérêt effectif » (§ 5.4.1), par application du taux à la valeur comptable brute, sauf pour les actifs financiers dépréciés.",
      },
      { type: 'intertitre', texte: "4.6.2 Application à un emprunt" },
      {
        type: 'carte',
        titre: "Exemple 4.5 — Emprunt assorti de frais de dossier (MBANZA CIMENT)",
        texte: "Le 1er janvier N, la société emprunte 100 000 USD sur trois ans pour financer un broyeur : intérêt de 10 % payable en fin d'année, remboursement in fine. La banque retient 3 000 USD de frais de dossier ; la société encaisse 97 000. Le taux qui égalise 97 000 et la valeur actualisée des flux futurs (10 000, 10 000 et 110 000) est d'environ **11,23 %**.",
        tableau: {
          entetes: ['Année', "Coût amorti à l'ouverture", "Charge d'intérêts au taux effectif", 'Intérêts payés', 'Frais amortis', 'Coût amorti à la clôture'],
          lignes: [
            ['N', '97 000', '10 896', '10 000', '896', '97 896'],
            ['N+1', '97 896', '10 996', '10 000', '996', '98 892'],
            ['N+2', '98 892', '11 108', '110 000', '1 108', '0'],
            ['**Total**', '', '**33 000**', '', '**3 000**', ''],
          ],
        },
        note: "À l'origine, la dette est comptabilisée pour 97 000 (débit trésorerie, crédit emprunt). En N, la charge d'intérêts de 10 896 est enregistrée en contrepartie d'un décaissement de 10 000 et d'une augmentation de 896 de la dette. Les frais de dossier ne constituent pas une charge immédiate : ils majorent le coût du financement et sont répartis au rythme actuariel. Un étalement linéaire donnerait 1 000 par an ; l'écart est faible dans cet exemple, mais il croît avec la durée de l'emprunt, le niveau des frais et l'éventualité de remboursements anticipés.",
      },
      {
        type: 'filet',
        titre: "Observation — Importance relative et méthodes simplifiées",
        texte: "Dans la pratique, les frais de dossier sont fréquemment passés en charges lors de l'octroi du crédit ou étalés linéairement. IFRS 9 exige la méthode du taux d'intérêt effectif. IAS 8, § 8, dispose qu'« Il convient de ne pas appliquer ces méthodes lorsque l'effet de leur application n'est pas significatif », mais précise aussitôt qu'« il est inapproprié de faire, ou de ne pas corriger, des écarts non significatifs par rapport aux IFRS en vue de parvenir à une présentation particulière ». Le recours à une méthode simplifiée doit donc être justifié par un calcul démontrant le caractère non significatif de l'écart. Le même raisonnement s'applique à l'actualisation des prêts au personnel lorsque les montants sont significatifs.",
      },
      { type: 'intertitre', texte: "4.6.3 Les passifs financiers" },
      {
        type: 'paragraphe',
        texte: "L'entité classe « comme étant ultérieurement évalués au coût amorti tous les passifs financiers à l'exception » de ceux que la norme énumère : passifs à la juste valeur par le biais du résultat net, dont les dérivés, contrats de garantie financière, engagements de prêt à un taux inférieur à celui du marché et contrepartie éventuelle d'un regroupement d'entreprises (§ 4.2.1). Un emprunt bancaire ou obligataire est donc évalué au coût amorti, comme dans l'exemple 4.5 ; il en va de même d'une dette fournisseur à court terme, dont le coût amorti se confond en pratique avec le montant nominal. Le passif financier est décomptabilisé lorsqu'il est éteint, c'est-à-dire lorsque l'obligation est exécutée, annulée ou arrivée à expiration (§ 3.3.1) ; la différence entre sa valeur comptable et la contrepartie payée est comptabilisée en résultat net (§ 3.3.3).",
      },
    ],
  },
  {
    numero: '4.7',
    titre: "La dépréciation des actifs financiers : le modèle des pertes de crédit attendues",
    navLabel: 'Pertes attendues',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le SYSCOHADA révisé ne déprécie une créance que lorsqu'un événement la rend douteuse : retard de paiement, litige, ouverture d'une procédure collective. IFRS 9 adopte la démarche inverse en considérant que le risque de non-paiement existe dès l'origine de la créance et doit être reflété avant sa matérialisation. L'entité comptabilise une correction de valeur au titre des **pertes de crédit attendues** sur les actifs financiers évalués au coût amorti ou à la juste valeur par le biais des autres éléments du résultat global, les créances locatives, les actifs sur contrat, les engagements de prêt et les contrats de garantie financière (§ 5.5.1). La perte de crédit attendue est la « Moyenne pondérée des pertes de crédit, dont les poids sont les risques de défaillance respectifs » (annexe A). Une perte existe même lorsque l'entité s'attend à être payée intégralement, mais avec retard, en raison de la valeur temps de l'argent (B5.5.28).",
      },
      {
        type: 'filet',
        titre: "Texte de référence — IFRS 9, § 5.5.17",
        texte: "Les pertes de crédit attendues doivent refléter « (a) un montant objectif et fondé sur des pondérations probabilistes, qui est déterminé par l'évaluation d'un intervalle de résultats possibles ; (b) la valeur temps de l'argent ; (c) les informations raisonnables et justifiables sur des événements passés, des circonstances actuelles et des prévisions de la conjoncture économique encore à venir, qu'il est possible, à la date de clôture, d'obtenir sans devoir engager des coûts ou des efforts déraisonnables ».",
      },
      {
        type: 'paragraphe',
        texte: "Le point (c) marque la rupture principale avec le modèle antérieur : l'historique des pertes ne suffit plus et doit être ajusté des prévisions relatives à la conjoncture. Le montant retenu n'est pas le scénario le plus probable, mais une moyenne pondérée de plusieurs scénarios plausibles.",
      },
      { type: 'intertitre', texte: "4.7.1 Le modèle général en trois étapes" },
      {
        type: 'carte',
        titre: "Tableau 4.8 — Modèle général de dépréciation (IFRS 9, § 5.5.3, 5.5.5 et 5.4.1)",
        tableau: {
          entetes: ['Situation à la clôture', 'Correction de valeur', 'Base de calcul des intérêts', 'Désignation usuelle'],
          lignes: [
            ["Risque de crédit sans augmentation importante depuis la comptabilisation initiale", "Pertes attendues pour les **douze mois à venir** (§ 5.5.5)", 'Valeur comptable brute (§ 5.4.1)', 'Étape 1'],
            ["Augmentation importante du risque de crédit", "Pertes attendues pour la **durée de vie** (§ 5.5.3)", 'Valeur comptable brute', 'Étape 2'],
            ["Actif financier déprécié (annexe A)", "Pertes attendues pour la durée de vie", '**Coût amorti**, net de la correction (§ 5.4.1(b))', 'Étape 3'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "La norme ne parle pas d'étapes ; cette terminologie est issue de la pratique. Dans une entreprise commerciale ou industrielle, le modèle général concerne principalement les prêts consentis et les placements en titres de dette, les créances clients relevant de l'approche simplifiée (section 4.8). Il impose d'apprécier à chaque clôture si le risque de défaillance sur la durée de vie a augmenté de façon importante depuis l'origine, par comparaison entre les deux dates (§ 5.5.9). Deux présomptions réfutables encadrent ce jugement. L'augmentation importante est présumée lorsque les paiements contractuels sont en souffrance depuis plus de 30 jours (§ 5.5.11), ce seuil constituant le moment le plus tardif de comptabilisation des pertes pour la durée de vie (B5.5.19). La défaillance est présumée au plus tard lorsqu'un paiement est en souffrance depuis 90 jours (B5.5.37). Un instrument présentant un risque de crédit faible peut être présumé ne pas avoir subi d'augmentation importante (§ 5.5.10), mais cette qualification ne peut résulter du seul fait qu'il est garanti ou moins risqué que le pays de l'entité (B5.5.22). Les variations de la correction de valeur sont comptabilisées en résultat net au titre de gain ou de perte de valeur (§ 5.5.8).",
      },
      { type: 'intertitre', texte: "4.7.2 Application à un prêt consenti à un distributeur" },
      {
        type: 'carte',
        titre: "Exemple 4.6 — Évolution de la correction de valeur d'un prêt (MBANZA CIMENT)",
        texte: "Le 1er janvier N, MBANZA CIMENT prête 100 000 USD à son distributeur exclusif du Kwilu, pour trois ans, au taux de 10 % payable en fin d'année, remboursement in fine, sans frais ; le taux effectif est de 10 % et la valeur comptable brute demeure de 100 000. Par convention, la perte attendue est calculée comme le produit de la probabilité de défaillance, du taux de perte en cas de défaillance et de la valeur brute ; cette formule simplifiée omet l'actualisation et la pluralité des scénarios que requiert le § 5.5.17, mais suffit à décrire la mécanique.",
        tableau: {
          entetes: ['Date', 'Situation', 'Calcul', 'Correction de valeur', 'Écriture'],
          lignes: [
            ['Fin N', "Étape 1 : probabilité de défaillance à douze mois de 2 %, taux de perte de 45 %", '100 000 × 2 % × 45 %', '**900**', 'Dotation de 900 (§ 5.5.8) ; coût amorti 99 100'],
            ['Fin N+1', "Étape 2 : intérêt impayé depuis 45 jours (présomption du § 5.5.11) ; probabilité de défaillance sur la durée de vie restante de 15 %", '100 000 × 15 % × 45 %', '**6 750**', 'Dotation complémentaire de 5 850'],
          ],
        },
        note: "Les produits d'intérêts de N+1 sont calculés sur la valeur comptable brute, soit 10 000. Si l'emprunteur connaît des difficultés financières importantes, l'actif devient un actif financier déprécié (étape 3) : les intérêts des périodes suivantes sont calculés sur le coût amorti, net de la correction de valeur (§ 5.4.1(b)). Lorsque l'entité n'a plus d'attente raisonnable de recouvrement, la valeur comptable brute est directement réduite, ce qui constitue une décomptabilisation (§ 5.4.4).",
      },
      {
        type: 'filet',
        titre: "Observation — Les informations prospectives dans le contexte congolais",
        texte: "Pour un distributeur de Lubumbashi qui vend à crédit à des sous-traitants miniers, la prise en compte des « prévisions de la conjoncture économique » porte sur des variables identifiables : le cours du cuivre et du cobalt, dont dépend la solvabilité de sa clientèle ; l'évolution du taux de change du franc congolais, qui fragilise les clients endettés en dollars et rémunérés en francs ; la situation sécuritaire, susceptible d'interrompre l'accès à une province ; le niveau des taux d'intérêt, qui détermine le coût du crédit de ses clients. La norme n'exige pas une prévision exacte, mais une pondération de scénarios plausibles, justifiée et documentée. Deux écueils sont à éviter : l'omission de la conjoncture, qui revient à appliquer le modèle des pertes subies, et son invocation pour lisser le résultat d'un exercice à l'autre.",
      },
    ],
  },
  {
    numero: '4.8',
    titre: "Les créances clients : l'approche simplifiée",
    navLabel: 'Créances clients',
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'application du modèle général à un portefeuille de créances commerciales nombreuses et de courte durée serait disproportionnée. Pour les créances clients et les actifs sur contrat relevant d'IFRS 15 qui ne comportent pas de composante financement importante, l'entité « doit toujours évaluer la correction de valeur pour pertes au montant des pertes de crédit attendues pour la durée de vie » (§ 5.5.15(a)). Cette **approche simplifiée** supprime le suivi de l'évolution du risque depuis l'origine. Pour les créances comportant une composante financement importante et pour les créances locatives, elle est facultative et relève d'un choix de méthode comptable (§ 5.5.15(a)(ii) et (b)).",
      },
      {
        type: 'paragraphe',
        texte: "La mise en œuvre repose généralement sur une matrice de provisionnement, que B5.5.35 cite comme exemple de méthode simplifiée. Elle comporte quatre opérations : le classement des créances par ancienneté, l'application à chaque tranche d'un taux de perte fondé sur l'historique et ajusté des informations actuelles et prospectives, le calcul de la perte attendue et sa comptabilisation. Une clientèle hétérogène justifie des matrices distinctes par segment (région, type de produit, grossistes ou détaillants) lorsque l'historique révèle des profils de pertes différents (B5.5.35).",
      },
      {
        type: 'carte',
        titre: "Exemple 4.7 — Matrice de provisionnement des créances clients (DISTRICOM SA)",
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
        note: "La dotation de 32 000 est comptabilisée en résultat net (§ 5.5.8) et la correction de valeur vient en déduction des créances, présentées au bilan pour 368 000. Si la direction anticipe une dégradation de la conjoncture et porte le taux de la dernière tranche à 50 %, la perte attendue s'élève à 36 000 : l'ajustement prospectif exigé par le § 5.5.17(c) modifie directement le montant comptabilisé.",
      },
      {
        type: 'filet',
        titre: "Rapprochement avec le SYSCOHADA révisé",
        texte: "Le SYSCOHADA révisé déprécie les créances par le compte 491 selon une logique opposée. La dépréciation doit être « certaine quant à sa nature » et porter sur un élément d'actif « individualisé » ; l'entité doit justifier les motifs qui rendent la créance douteuse ou litigieuse, et les événements survenus après la clôture ne sont pas pris en compte (Titre VII, commentaire du compte 49). Dans l'exemple 4.7, si 25 000 des 40 000 de la tranche de plus de 60 jours correspondent à des clients identifiés comme douteux et recouvrables à 40 %, la dépréciation selon le SYSCOHADA s'établit à 15 000, contre 32 000 selon IFRS 9. L'écart ne traduit pas une erreur de l'un des référentiels : il mesure la différence entre un modèle qui constate une perte et un modèle qui l'anticipe. Il se retrouve dans les impôts différés des groupes qui établissent des états selon les deux référentiels (chapitre 6).",
      },
    ],
  },
  {
    numero: '4.9',
    titre: "La décomptabilisation des actifs financiers et la comptabilité de couverture",
    navLabel: 'Sortie et couverture',
    blocs: [
      { type: 'intertitre', texte: "4.9.1 La décomptabilisation des actifs financiers" },
      {
        type: 'paragraphe',
        texte: "Un actif financier n'est décomptabilisé que dans deux cas : l'expiration des droits contractuels aux flux de trésorerie, ou un transfert qui satisfait aux conditions de décomptabilisation (§ 3.2.3). L'analyse d'un transfert repose d'abord sur le critère des **risques et avantages** (§ 3.2.6). Si l'entité transfère la quasi-totalité des risques et avantages inhérents à la propriété de l'actif, elle le décomptabilise ; si elle en conserve la quasi-totalité, « elle doit laisser l'actif financier comptabilisé ». Dans les situations intermédiaires, le critère du **contrôle** est déterminant : en l'absence de contrôle conservé, l'actif est décomptabilisé ; si le contrôle est conservé, l'actif reste comptabilisé dans la mesure de l'implication continue de l'entité. Lors d'une décomptabilisation intégrale, la différence entre la valeur comptable et la contrepartie reçue est comptabilisée en résultat net (§ 3.2.12).",
      },
      {
        type: 'carte',
        titre: "Tableau 4.9 — Affacturage et titrisation selon IFRS 9 et le SYSCOHADA révisé",
        tableau: {
          entetes: ['Opération', 'IFRS 9 (§ 3.2.6)', 'SYSCOHADA révisé (Titre VIII, ch. 15)'],
          lignes: [
            ["Affacturage sans recours, risque d'impayé transféré au factor", 'Décomptabilisation de la créance', "Créance soldée du compte 411 par le compte 4716 Compte d'affacturage ; retenue de garantie au compte 4717"],
            ['Affacturage avec recours intégral', "**Maintien** de la créance ; trésorerie reçue comptabilisée en passif financier (§ 4.2.1(b))", "Pas de traitement distinct : le chapitre 15 décrit un factor garantissant la bonne fin ; créances cédées non échues mentionnées dans les notes"],
            ["Titrisation avec conservation d'une tranche subordonnée", "Analyse des risques conservés ; maintien probable, total ou partiel", "« s'analyse comme une cession » : décomptabilisation dès la remise du bordereau"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "La divergence affecte directement la lecture de la structure financière. Lorsqu'une créance cédée avec recours est retirée du bilan, l'endettement correspondant disparaît également. IFRS 9 raisonne sur la substance économique du risque conservé ; le SYSCOHADA révisé s'attache à la forme juridique du transfert.",
      },
      { type: 'intertitre', texte: "4.9.2 La comptabilité de couverture" },
      {
        type: 'paragraphe',
        texte: "La comptabilité de couverture est facultative. Elle a pour objectif de « représenter dans les états financiers l'effet des activités de gestion des risques de l'entité » (§ 6.1.1) lorsque l'instrument de couverture et l'élément couvert seraient, en son absence, comptabilisés selon des bases différentes : un contrat de change à terme évalué à la juste valeur par le biais du résultat net et un achat futur de carburant libellé en dollars, non encore comptabilisé. Ses conditions sont strictes (§ 6.4.1) : instruments et éléments couverts admissibles, désignation et documentation formelles dès l'origine, lien économique entre l'élément couvert et l'instrument de couverture, absence de prépondérance du risque de crédit, ratio de couverture cohérent avec la gestion effective du risque. En l'absence de documentation initiale, la comptabilité de couverture ne peut être appliquée, quelle que soit l'efficacité économique de la couverture.",
      },
      {
        type: 'filet',
        titre: "Synthèse du chapitre",
        texte: "Stocks et instruments financiers relèvent de normes distinctes, mais obéissent à un même principe : un actif ne peut figurer au bilan pour un montant supérieur à celui qu'il permettra de recouvrer. IAS 2 plafonne le stock à sa valeur nette de réalisation ; IFRS 9 réduit la créance des pertes de crédit attendues. La différence tient au moment de la constatation : IAS 2 requiert un indice de perte (baisse des prix, obsolescence), IFRS 9 anticipe la perte dès la comptabilisation initiale. Ce passage de la perte subie à la perte attendue impose à toute entité appliquant les IFRS un dispositif de suivi de ses créances (balance âgée, historique des pertes, information sur les clients et la conjoncture) plus exigeant que celui requis par la tenue des comptes selon le SYSCOHADA révisé.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ue13c4-cp1',
    titre: "Dépréciation des stocks et des créances clients (TECHMARKET SA)",
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
    titre: "Coût et valeur nette de réalisation des stocks d'une minoterie (MINOTERIE DU KONGO CENTRAL, société fictive)",
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
    titre: "Obligation d'entreprise évaluée au coût amorti et à la juste valeur",
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
    titre: "Classement de la trésorerie et des placements (KASAÏ AGRO SA, société fictive)",
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
  sousTitre: "IAS 2, IFRS 9 et IAS 32 : évaluation des stocks, classement, évaluation et dépréciation des instruments financiers",
  infoBulle: "Chapitre 4 du module IFRS/IAS : stocks (champ, coût d'acquisition et de transformation, capacité normale, formules PEPS et coût moyen, valeur nette de réalisation, dépréciation et reprise) ; instruments financiers (définitions d'IAS 32, champ d'IFRS 9, évaluation initiale, classement selon le modèle économique et les flux contractuels, coût amorti et taux d'intérêt effectif, passifs financiers, pertes de crédit attendues et approche simplifiée, décomptabilisation, couverture) ; passerelles avec le SYSCOHADA révisé, illustrées par des entreprises commerciales et industrielles.",
  loiRef: "IAS 2 · IFRS 9 · IAS 32 § 11 · IAS 8 § 8 · AUDCIF art. 42-44 et 46 · SYSCOHADA, Titre VII (compte 49) et Titre VIII, ch. 14-15",
  moduleLabel: 'UE 13 · IFRS / IAS',
  retourRoute: '/ue13-ifrs-ias',
  coursId: 'ue13-ifrs-ias',
  objectifs: [
    "Délimiter le champ d'application d'IAS 2 et appliquer la règle d'évaluation au plus faible du coût et de la valeur nette de réalisation.",
    "Construire le coût d'un stock, imputer les frais fixes sur la capacité normale et isoler le coût de la sous-activité.",
    "Appliquer les formules PEPS et coût moyen pondéré, et mesurer leur effet en période de hausse des prix.",
    "Déprécier un stock élément par élément, traiter les contrats fermes et les matières premières, et limiter la reprise.",
    "Identifier un instrument financier au sens d'IAS 32, délimiter le champ d'IFRS 9 et déterminer l'évaluation initiale d'un instrument.",
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
    "L'identification spécifique s'impose pour les biens non fongibles ; pour les autres, seuls le PEPS et le coût moyen pondéré sont admis, une même formule s'appliquant aux stocks de nature et d'usage similaires (§ 23-26).",
    "La dépréciation s'apprécie élément par élément, et non par grande catégorie (§ 29) ; le prix du contrat est retenu pour les quantités sous contrat ferme (§ 31) ; la reprise est limitée au montant de la dépréciation initiale (§ 33).",
    "Un actif financier est classé au coût amorti, à la juste valeur par les autres éléments du résultat global ou à la juste valeur par le résultat net selon le modèle économique et les flux contractuels (IFRS 9.4.1.1). Les instruments de capitaux propres sont à la juste valeur, avec une option irrévocable, sans recyclage, pour les autres éléments du résultat global (§ 5.7.5 ; B5.7.1).",
    "Le coût amorti se calcule avec le taux d'intérêt effectif, qui étale frais et décotes sur la durée de vie, sans tenir compte des pertes attendues (annexe A ; § 5.4.1). Les passifs financiers sont au coût amorti, sauf exceptions (§ 4.2.1), et ne sont jamais reclassés (§ 4.4.2).",
    "Les pertes de crédit attendues sont constatées dès l'origine : pertes à douze mois tant que le risque de crédit n'a pas augmenté de façon importante, pertes pour la durée de vie au-delà (§ 5.5.3-5.5.5). Deux présomptions réfutables s'appliquent : 30 jours de retard pour l'augmentation importante (§ 5.5.11), 90 jours pour la défaillance (B5.5.37).",
    "Pour les créances clients sans composante financement importante, la correction de valeur est toujours égale aux pertes attendues pour la durée de vie, la matrice de provisionnement constituant une simplification admise (§ 5.5.15 ; B5.5.35). Le SYSCOHADA révisé ne déprécie que des créances individualisées dont la perte est certaine dans son principe.",
    "Un actif financier cédé reste au bilan si l'entité en conserve la quasi-totalité des risques et avantages (§ 3.2.6) ; un affacturage avec recours s'analyse donc comme un financement. La comptabilité de couverture exige une désignation et une documentation formelles dès l'origine (§ 6.4.1).",
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
