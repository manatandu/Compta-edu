import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 13 — Chapitre 7 : Première adoption des IFRS et IFRS pour les PME
// (IFRS 1, IFRS for SMEs Accounting Standard)
//
// Sources lues sur texte pendant la rédaction :
// - IFRS 1 (traduction française officielle) : §§ 1 à 33, 39L ; annexe A ;
//   annexe B (B1 à B10) ; annexe C (C1, C4) ; annexe D (D1, D5 à D8, D12,
//   D13).
// - IFRS for SMEs Accounting Standard, troisième édition (février 2025),
//   modules pédagogiques de l'IFRS Foundation en anglais : sections 1.1 à
//   1.7, 17.15 à 17.15D, 18.19-18.20, 19 (amortissement du goodwill), 23
//   (refonte fondée sur IFRS 15), 28.18, 28.19, 28.24, 29 (modifications),
//   35.7, 35.9, 35.10 ; édition 2015 : section 25.2. Les passages cités de
//   ces textes anglais sont des traductions de travail.
// - AUDCIF : art. 8, 75 et 113.
// - Support de cours d'origine : J.-B. Tshimanga Mulumba (CPCC), « Première
//   adoption IFRS, IFRS PME & synthèse professionnelle », module 7. Quatre
//   affirmations du support sont rectifiées dans le texte : l'exemption
//   relative aux avantages du personnel n'existe plus dans IFRS 1 ; l'écriture
//   de coût présumé omet l'impôt différé ; IFRS pour les PME autorise le
//   modèle de la réévaluation pour les immobilisations corporelles ; la
//   section 29 n'est pas une version simplifiée des impôts différés.
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'ue13c7-q1',
    question: "Selon l'AUDCIF, quelles entités doivent établir des états financiers annuels selon les normes IFRS ?",
    options: [
      { id: 'a', texte: "Toutes les sociétés anonymes" },
      { id: 'b', texte: "Les entités dont les titres sont inscrits à une bourse de valeurs et celles qui sollicitent un financement par appel public à l'épargne, en sus des états SYSCOHADA" },
      { id: 'c', texte: "Les filiales de groupes étrangers" },
      { id: 'd', texte: "Les entités dont le chiffre d'affaires dépasse un seuil" },
    ],
    reponseCorrecte: 'b',
    explication: "AUDCIF, art. 8, al. 4 : ces entités « doivent établir et présenter les états financiers annuels selon les normes internationales d'informations financières, appelées normes IFRS, en sus des états financiers » SYSCOHADA. L'art. 75 étend l'obligation à leurs états consolidés. Ces dispositions s'appliquent depuis le 1er janvier 2019 (art. 113).",
    articleRef: "AUDCIF, art. 8, 75 et 113",
  },
  {
    id: 'ue13c7-q2',
    question: "Les états financiers IFRS établis en application de l'AUDCIF peuvent-ils servir à déterminer le bénéfice distribuable ?",
    options: [
      { id: 'a', texte: "Oui, ils se substituent aux états SYSCOHADA" },
      { id: 'b', texte: "Non : ils sont destinés exclusivement aux marchés financiers" },
      { id: 'c', texte: "Oui, sur décision de l'assemblée générale" },
      { id: 'd', texte: "Seulement pour les sociétés cotées" },
    ],
    reponseCorrecte: 'b',
    explication: "AUDCIF, art. 8, al. 5 : les états IFRS « sont destinés exclusivement aux marchés financiers. Ils ne peuvent servir de support de base pour la détermination du bénéfice distribuable » au sens de l'AUSCGIE. Les comptes SYSCOHADA demeurent la base légale.",
    articleRef: "AUDCIF, art. 8",
  },
  {
    id: 'ue13c7-q3',
    question: "Qu'est-ce que les premiers états financiers IFRS au sens d'IFRS 1 ?",
    options: [
      { id: 'a', texte: "Les premiers états comportant un rapprochement avec les IFRS" },
      { id: 'b', texte: "Les premiers états financiers annuels dans lesquels l'entité adopte les IFRS par une déclaration explicite et sans réserve de conformité" },
      { id: 'c', texte: "Les premiers états audités par un cabinet international" },
      { id: 'd', texte: "La liasse de consolidation transmise à la société mère" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 1.3 et annexe A : ce sont les premiers états financiers annuels comportant une déclaration explicite et sans réserve de conformité aux IFRS. Des états établis selon des dispositions nationales avec un rapprochement de certains montants (§ 3(a)(v)) ou une liasse de consolidation (§ 3(c)) n'en sont pas.",
    articleRef: "IFRS 1.3 ; annexe A",
  },
  {
    id: 'ue13c7-q4',
    question: "Une entité présente ses premiers états IFRS pour l'exercice clos le 31 décembre 2026, avec un exercice comparatif. Quelle est sa date de transition ?",
    options: [
      { id: 'a', texte: "1er janvier 2026" },
      { id: 'b', texte: "1er janvier 2025" },
      { id: 'c', texte: "31 décembre 2026" },
      { id: 'd', texte: "Le jour de la décision d'adopter les IFRS" },
    ],
    reponseCorrecte: 'b',
    explication: "Annexe A : la date de transition est le « début de la première période pour laquelle une entité présente des informations comparatives complètes selon les IFRS ». Avec un comparatif 2025, c'est le 1er janvier 2025, comme dans l'exemple du § 8 (premiers états 20X5, transition au 1er janvier 20X4).",
    articleRef: "IFRS 1, annexe A et § 8",
  },
  {
    id: 'ue13c7-q5',
    question: "Combien d'états de la situation financière les premiers états financiers IFRS doivent-ils comprendre au minimum ?",
    options: [
      { id: 'a', texte: "Un" },
      { id: 'b', texte: "Deux" },
      { id: 'c', texte: "Trois" },
      { id: 'd', texte: "Quatre" },
    ],
    reponseCorrecte: 'c',
    explication: "IFRS 1.21 : au moins trois états de la situation financière (clôture, clôture comparative et ouverture à la date de transition), deux états du résultat net et des autres éléments du résultat global, deux tableaux des flux de trésorerie et deux états des variations des capitaux propres, avec les notes.",
    articleRef: "IFRS 1.21",
  },
  {
    id: 'ue13c7-q6',
    question: "Quelle version des IFRS le nouvel adoptant applique-t-il dans son bilan d'ouverture ?",
    options: [
      { id: 'a', texte: "Les versions en vigueur à la date de transition" },
      { id: 'b', texte: "Les IFRS en vigueur à la fin de la première période de présentation IFRS, appliquées à toutes les périodes présentées" },
      { id: 'c', texte: "Les versions en vigueur à la date de chaque transaction" },
      { id: 'd', texte: "Au choix de l'entité" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 1.7-8 : l'entité applique les mêmes méthodes pour le bilan d'ouverture et toutes les périodes présentées, conformes aux IFRS en vigueur à la fin de la première période de présentation IFRS ; elle ne doit pas appliquer des versions antérieures. Une norme non encore obligatoire peut être appliquée si elle autorise l'application anticipée.",
    articleRef: "IFRS 1.7-8",
  },
  {
    id: 'ue13c7-q7',
    question: "Où sont comptabilisés les ajustements résultant du passage des méthodes antérieures aux IFRS dans le bilan d'ouverture ?",
    options: [
      { id: 'a', texte: "En résultat net du premier exercice IFRS" },
      { id: 'b', texte: "Directement en résultats non distribués (ou dans une autre catégorie de capitaux propres) à la date de transition" },
      { id: 'c', texte: "En autres éléments du résultat global de l'exercice comparatif" },
      { id: 'd', texte: "En écart de conversion" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 1.11 : les ajustements découlent d'événements et de transactions antérieurs à la date de transition ; l'entité les comptabilise « directement en résultats non distribués (ou, le cas échéant, dans une autre catégorie de capitaux propres) à la date de transition aux IFRS ».",
    articleRef: "IFRS 1.11",
  },
  {
    id: 'ue13c7-q8',
    question: "Lequel de ces éléments figure parmi les exceptions OBLIGATOIRES à l'application rétrospective (annexe B) ?",
    options: [
      { id: 'a', texte: "La juste valeur comme coût présumé" },
      { id: 'b', texte: "Le montant cumulé des écarts de conversion" },
      { id: 'c', texte: "La comptabilité de couverture" },
      { id: 'd', texte: "Les regroupements d'entreprises passés" },
    ],
    reponseCorrecte: 'c',
    explication: "IFRS 1.B1 énumère les exceptions obligatoires : décomptabilisation d'actifs et passifs financiers, comptabilité de couverture, participations ne donnant pas le contrôle, classement et évaluation des actifs financiers, dépréciation d'actifs financiers, dérivés incorporés, prêts publics, contrats d'assurance, impôt différé sur certains passifs. Le coût présumé, les écarts de conversion et les regroupements passés sont des exemptions facultatives (annexes C et D).",
    articleRef: "IFRS 1.B1 ; C1 ; D1",
  },
  {
    id: 'ue13c7-q9',
    question: "Selon IFRS 1.14, les estimations établies à la date de transition selon les IFRS doivent :",
    options: [
      { id: 'a', texte: "intégrer toutes les informations disponibles à la date de publication des premiers états IFRS" },
      { id: 'b', texte: "être cohérentes avec celles établies à la même date selon le référentiel antérieur, sauf éléments probants objectifs montrant qu'elles étaient erronées" },
      { id: 'c', texte: "être refaites par un expert indépendant" },
      { id: 'd', texte: "être remplacées par des valeurs de marché" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 1.14 interdit l'usage rétrospectif de l'information ultérieure. Une information reçue après la date de transition sur une estimation antérieure est traitée comme un événement postérieur ne donnant pas lieu à ajustement : elle affecte le résultat de la période suivante, non le bilan d'ouverture (§ 15), sauf si elle révèle une erreur.",
    articleRef: "IFRS 1.14-16",
  },
  {
    id: 'ue13c7-q10',
    question: "Une entité peut-elle appliquer une exemption de l'annexe D, par analogie, à un élément que la norme ne vise pas ?",
    options: [
      { id: 'a', texte: "Oui, si l'élément est similaire" },
      { id: 'b', texte: "Non : IFRS 1 l'interdit expressément" },
      { id: 'c', texte: "Oui, avec l'accord de l'auditeur" },
      { id: 'd', texte: "Oui, pour les éléments non significatifs" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 1.18 : « Une entité ne doit pas appliquer ces exemptions à d'autres éléments par analogie. » La règle est répétée à la fin du § D1. Les exemptions sont limitatives, de même que les exceptions (§ 12-13).",
    articleRef: "IFRS 1.18 ; D1",
  },
  {
    id: 'ue13c7-q11',
    question: "Quel est l'effet de l'exemption relative au montant cumulé des écarts de conversion (D13) ?",
    options: [
      { id: 'a', texte: "Les écarts cumulés sont reclassés en résultat à la date de transition" },
      { id: 'b', texte: "Les écarts cumulés de tous les établissements à l'étranger sont réputés nuls à la date de transition, et le résultat de cession ultérieur exclut les écarts antérieurs" },
      { id: 'c', texte: "Les écarts de conversion ne sont plus jamais comptabilisés" },
      { id: 'd', texte: "L'entité peut choisir établissement par établissement" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 1.D13 : si le nouvel adoptant se prévaut de l'exemption, le montant cumulé des écarts de conversion pour tous les établissements à l'étranger est réputé nul à la date de transition, et le profit ou la perte sur une cession ultérieure exclut les écarts nés avant cette date.",
    articleRef: "IFRS 1.D12-D13",
  },
  {
    id: 'ue13c7-q12',
    question: "Qu'est-ce qu'un coût présumé au sens d'IFRS 1 ?",
    options: [
      { id: 'a', texte: "Le coût estimé d'un actif à construire" },
      { id: 'b', texte: "Un montant utilisé comme substitut du coût ou du coût amorti à une date donnée, l'amortissement ultérieur partant de ce montant" },
      { id: 'c', texte: "La valeur fiscale d'un actif" },
      { id: 'd', texte: "La valeur d'utilité selon IAS 36" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 1, annexe A : le coût présumé est un « montant utilisé comme substitut du coût ou du coût amorti à une date donnée. L'amortissement ultérieur suppose que l'entité avait initialement comptabilisé l'actif ou le passif à la date donnée et que son coût était égal au coût présumé. »",
    articleRef: "IFRS 1, annexe A ; D5-D8",
  },
  {
    id: 'ue13c7-q13',
    question: "Un nouvel adoptant peut-il utiliser comme coût présumé une réévaluation légale pratiquée selon son référentiel antérieur ?",
    options: [
      { id: 'a', texte: "Non, seule la juste valeur à la date de transition est admise" },
      { id: 'b', texte: "Oui, si la réévaluation était globalement comparable à la juste valeur ou au coût IFRS ajusté d'un indice de prix" },
      { id: 'c', texte: "Oui, sans condition" },
      { id: 'd', texte: "Seulement pour les terrains" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 1.D6 : une réévaluation établie selon le référentiel antérieur, à la date de transition ou avant, peut servir de coût présumé à la date de réévaluation si elle était globalement comparable à la juste valeur ou au coût (ou coût amorti) selon les IFRS ajusté, par exemple, d'un indice des prix général ou spécifique.",
    articleRef: "IFRS 1.D6",
  },
  {
    id: 'ue13c7-q14',
    question: "L'exemption relative aux avantages du personnel (écarts actuariels) figure-t-elle encore dans IFRS 1 ?",
    options: [
      { id: 'a', texte: "Oui, au paragraphe D10" },
      { id: 'b', texte: "Non : les paragraphes D10 et D11 ont été supprimés à la suite de la modification d'IAS 19 en juin 2011" },
      { id: 'c', texte: "Oui, pour les entités de moins de 50 salariés" },
      { id: 'd', texte: "Oui, sur option globale" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 1.39L : la publication d'IAS 19 modifiée en juin 2011 « a donné lieu à la modification du paragraphe D1 et à la suppression des paragraphes D10 et D11 ». La liste du § D1 marque le point (e) comme supprimé. Les engagements sociaux sont donc évalués rétrospectivement selon IAS 19 dans le bilan d'ouverture.",
    articleRef: "IFRS 1.39L ; D1",
  },
  {
    id: 'ue13c7-q15',
    question: "Un nouvel adoptant peut-il désigner rétrospectivement comme couverture une opération conclue avant la date de transition ?",
    options: [
      { id: 'a', texte: "Oui, si la couverture était efficace" },
      { id: 'b', texte: "Non : les transactions antérieures à la date de transition ne doivent pas être désignées rétrospectivement comme couvertures" },
      { id: 'c', texte: "Oui, avec une documentation établie a posteriori" },
      { id: 'd', texte: "Oui, pour les couvertures de change" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 1.B6 : « Les transactions conclues avant la date de transition aux IFRS ne doivent pas être désignées rétrospectivement comme opérations de couverture. » Le bilan d'ouverture ne reflète pas une relation de couverture ne satisfaisant pas aux conditions d'IFRS 9 (B5).",
    articleRef: "IFRS 1.B4-B6",
  },
  {
    id: 'ue13c7-q16',
    question: "Un nouvel adoptant a reçu un prêt public à taux inférieur au marché, non comptabilisé conformément aux IFRS selon son référentiel antérieur. Quelle valeur retient-il dans son bilan d'ouverture ?",
    options: [
      { id: 'a', texte: "La juste valeur du prêt à la date de transition, l'écart étant une subvention" },
      { id: 'b', texte: "La valeur comptable du prêt selon le référentiel antérieur" },
      { id: 'c', texte: "Le montant nominal actualisé au taux du marché d'origine" },
      { id: 'd', texte: "Zéro" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 1.B10 : sauf application de B11, le nouvel adoptant applique IFRS 9 et IAS 20 de manière prospective aux prêts publics existants et utilise la valeur comptable selon le référentiel antérieur comme valeur du prêt dans le bilan d'ouverture ; il ne comptabilise pas l'avantage de taux comme une subvention.",
    articleRef: "IFRS 1.B10",
  },
  {
    id: 'ue13c7-q17',
    question: "Que doivent comprendre les premiers états IFRS pour expliquer la transition ?",
    options: [
      { id: 'a', texte: "Une simple mention du changement de référentiel" },
      { id: 'b', texte: "Des rapprochements des capitaux propres à la date de transition et à la clôture du dernier exercice publié selon le référentiel antérieur, et un rapprochement du résultat global de cet exercice" },
      { id: 'c', texte: "Le retraitement des cinq derniers exercices" },
      { id: 'd', texte: "Un rapport spécial de l'auditeur" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 1.24(a)-(b) impose ces rapprochements, suffisamment détaillés pour faire comprendre les ajustements significatifs (§ 25). Les corrections d'erreurs du référentiel antérieur doivent y être distinguées des changements de méthodes (§ 26).",
    articleRef: "IFRS 1.23-26",
  },
  {
    id: 'ue13c7-q18',
    question: "IAS 8 s'applique-t-elle aux changements de méthodes effectués lors de la première adoption ?",
    options: [
      { id: 'a', texte: "Oui, intégralement" },
      { id: 'b', texte: "Non : IFRS 1 écarte les dispositions d'IAS 8 relatives aux changements de méthodes pour les premiers états IFRS" },
      { id: 'c', texte: "Seulement pour les estimations" },
      { id: 'd', texte: "Seulement pour les erreurs" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 1.27 : « IAS 8 ne s'applique pas aux changements de méthodes comptables effectués par une entité qui applique les IFRS pour la première fois ». Symétriquement, IFRS 1 ne s'applique pas aux changements de méthodes d'une entité appliquant déjà les IFRS (§ 5).",
    articleRef: "IFRS 1.5 et 27",
  },
  {
    id: 'ue13c7-q19',
    question: "Selon IFRS for SMEs (section 1), une entité a une obligation d'information du public (public accountability) notamment lorsque :",
    options: [
      { id: 'a', texte: "son chiffre d'affaires dépasse un seuil fixé par l'IASB" },
      { id: 'b', texte: "ses titres de capitaux propres ou de dette sont négociés sur un marché public, ou elle détient des actifs à titre fiduciaire pour un large groupe de tiers dans le cadre de son activité principale" },
      { id: 'c', texte: "elle a plus de 250 salariés" },
      { id: 'd', texte: "elle appartient à un groupe international" },
    ],
    reponseCorrecte: 'b',
    explication: "Section 1.3 (troisième édition, traduction de travail) : obligation d'information du public si les instruments de dette ou de capitaux propres sont négociés, ou en cours d'émission, sur un marché public, ou si l'entité détient des actifs à titre fiduciaire pour un large groupe de tiers dans le cadre de l'une de ses activités principales. La norme ne retient aucun critère de taille.",
    articleRef: "IFRS for SMEs (3e éd.), section 1.2-1.3",
  },
  {
    id: 'ue13c7-q20',
    question: "Une agence de voyages qui reçoit des acomptes de ses clients avant le voyage a-t-elle, de ce seul fait, une obligation d'information du public ?",
    options: [
      { id: 'a', texte: "Oui, elle détient des fonds de tiers" },
      { id: 'b', texte: "Non : la détention d'actifs de tiers accessoire à l'activité principale ne rend pas l'entité publiquement responsable" },
      { id: 'c', texte: "Oui, si les acomptes dépassent 10 % du bilan" },
      { id: 'd', texte: "Seulement si elle est une société anonyme" },
    ],
    reponseCorrecte: 'b',
    explication: "Section 1.4 (traduction de travail) : la détention d'actifs de tiers pour des raisons accessoires à une activité principale, comme pour les agents de voyages ou immobiliers, les écoles, les coopératives exigeant un dépôt nominal ou les vendeurs encaissant des paiements avant livraison, ne rend pas l'entité publiquement responsable.",
    articleRef: "IFRS for SMEs (3e éd.), section 1.4",
  },
  {
    id: 'ue13c7-q21',
    question: "Une filiale sans obligation d'information du public, dont la mère publie en IFRS complètes, peut-elle appliquer IFRS for SMEs dans ses propres états ?",
    options: [
      { id: 'a', texte: "Non, elle doit suivre le référentiel de sa mère" },
      { id: 'b', texte: "Oui, la section 1.6 ne l'interdit pas, à condition d'appliquer toutes les dispositions de la norme" },
      { id: 'c', texte: "Seulement avec l'accord de la mère" },
      { id: 'd', texte: "Seulement si elle est cotée" },
    ],
    reponseCorrecte: 'b',
    explication: "Section 1.6 (traduction de travail) : une filiale dont la mère applique les IFRS complètes n'est pas empêchée d'appliquer IFRS for SMEs si elle-même n'a pas d'obligation d'information du public ; ses états déclarés conformes doivent respecter toutes les dispositions de la norme.",
    articleRef: "IFRS for SMEs (3e éd.), section 1.6",
  },
  {
    id: 'ue13c7-q22',
    question: "Selon la troisième édition d'IFRS for SMEs, une PME peut-elle évaluer ses immobilisations corporelles selon le modèle de la réévaluation ?",
    options: [
      { id: 'a', texte: "Non, la réévaluation est interdite" },
      { id: 'b', texte: "Oui : elle choisit le modèle du coût ou celui de la réévaluation pour une catégorie entière d'immobilisations" },
      { id: 'c', texte: "Seulement pour les terrains" },
      { id: 'd', texte: "Seulement en cas d'hyperinflation" },
    ],
    reponseCorrecte: 'b',
    explication: "Section 17.15 (traduction de travail) : l'entité choisit le modèle du coût (17.15A) ou le modèle de la réévaluation (17.15B) comme méthode comptable, appliquée à une catégorie entière. Les augmentations vont en autres éléments du résultat global, sauf reprise d'une diminution antérieure (17.15C). L'affirmation selon laquelle la réévaluation serait interdite est inexacte.",
    articleRef: "IFRS for SMEs (3e éd.), section 17.15-17.15D",
  },
  {
    id: 'ue13c7-q23',
    question: "Selon IFRS for SMEs, le goodwill est-il amorti ?",
    options: [
      { id: 'a', texte: "Non, il fait l'objet d'un test annuel comme selon IAS 36" },
      { id: 'b', texte: "Oui, sur sa durée d'utilité, et il n'est testé qu'en présence d'un indice de perte de valeur" },
      { id: 'c', texte: "Il est passé en charges immédiatement" },
      { id: 'd', texte: "Il est imputé sur les capitaux propres" },
    ],
    reponseCorrecte: 'b',
    explication: "Selon la section 19 (troisième édition), le goodwill est évalué au coût diminué de l'amortissement cumulé et des pertes de valeur (19.34, selon le module pédagogique) et les unités auxquelles il est affecté ne sont testées qu'en présence d'un indice (27.7). IFRS 3 et IAS 36 interdisent l'amortissement et imposent un test annuel.",
    articleRef: "IFRS for SMEs (3e éd.), sections 19 et 27 ; IAS 36.10",
  },
  {
    id: 'ue13c7-q24',
    question: "Selon IFRS for SMEs, quelle est la durée d'utilité maximale d'une immobilisation incorporelle dont la durée ne peut être établie de façon fiable ?",
    options: [
      { id: 'a', texte: "Durée indéterminée, sans amortissement" },
      { id: 'b', texte: "Dix ans" },
      { id: 'c', texte: "Cinq ans" },
      { id: 'd', texte: "Vingt ans" },
    ],
    reponseCorrecte: 'b',
    explication: "Section 18.19-18.20 (traduction de travail) : toutes les immobilisations incorporelles sont réputées avoir une durée d'utilité déterminée ; si elle ne peut être établie de façon fiable, elle est fixée selon la meilleure estimation de la direction sans excéder dix ans. IAS 38 admet au contraire des durées indéterminées.",
    articleRef: "IFRS for SMEs (3e éd.), section 18.19-18.20",
  },
  {
    id: 'ue13c7-q25',
    question: "Comment IFRS for SMEs traite-t-elle les coûts d'emprunt (édition 2015) ?",
    options: [
      { id: 'a', texte: "Incorporation obligatoire aux actifs qualifiés" },
      { id: 'b', texte: "Comptabilisation en charges de la période au cours de laquelle ils sont engagés" },
      { id: 'c', texte: "Étalement sur la durée de l'emprunt" },
      { id: 'd', texte: "Imputation sur les capitaux propres" },
    ],
    reponseCorrecte: 'b',
    explication: "Section 25.2 (édition 2015, traduction de travail) : l'entité comptabilise tous les coûts d'emprunt en charges de la période au cours de laquelle ils sont engagés. IAS 23 impose au contraire l'incorporation des coûts d'emprunt directement attribuables à un actif qualifié.",
    articleRef: "IFRS for SMEs (éd. 2015), section 25.2 ; IAS 23",
  },
  {
    id: 'ue13c7-q26',
    question: "Selon IFRS for SMEs, comment une PME peut-elle comptabiliser les écarts actuariels d'un régime à prestations définies ?",
    options: [
      { id: 'a', texte: "Uniquement selon la méthode du corridor" },
      { id: 'b', texte: "Intégralement dans la période, en résultat ou en autres éléments du résultat global, sur option appliquée à tous les régimes" },
      { id: 'c', texte: "Uniquement en capitaux propres" },
      { id: 'd', texte: "Étalés sur la durée résiduelle de service" },
    ],
    reponseCorrecte: 'b',
    explication: "Section 28.24 (traduction de travail) : tous les écarts actuariels sont comptabilisés dans la période où ils surviennent, soit en résultat, soit en autres éléments du résultat global, par choix de méthode appliqué à tous les régimes. IAS 19 impose les autres éléments du résultat global (§ 120(c)) ; aucun des deux référentiels ne connaît de corridor.",
    articleRef: "IFRS for SMEs (3e éd.), section 28.24 ; IAS 19.120",
  },
  {
    id: 'ue13c7-q27',
    question: "Quelle simplification IFRS for SMEs autorise-t-elle si la méthode des unités de crédit projetées implique un coût ou un effort excessif ?",
    options: [
      { id: 'a', texte: "Ne pas comptabiliser l'obligation" },
      { id: 'b', texte: "Évaluer l'obligation comme si tous les salariés quittaient l'entité à la clôture, en ignorant augmentations de salaire, services futurs et mortalité en activité, sans actualisation" },
      { id: 'c', texte: "Retenir les cotisations versées" },
      { id: 'd', texte: "Appliquer le corridor" },
    ],
    reponseCorrecte: 'b',
    explication: "Section 28.19 (traduction de travail) : l'entité peut alors évaluer l'obligation relative au personnel actuel en supposant que tous les salariés quittent l'entité à la date de clôture, en ignorant les augmentations futures de salaire, les services futurs et la mortalité en activité, et sans actualisation ; droits acquis et non acquis restent inclus.",
    articleRef: "IFRS for SMEs (3e éd.), section 28.18-28.19",
  },
  {
    id: 'ue13c7-q28',
    question: "Sur quelle norme la section 23 de la troisième édition d'IFRS for SMEs est-elle désormais fondée ?",
    options: [
      { id: 'a', texte: "IAS 18 et IAS 11" },
      { id: 'b', texte: "IFRS 15" },
      { id: 'c', texte: "IAS 20" },
      { id: 'd', texte: "IFRS 16" },
    ],
    reponseCorrecte: 'b',
    explication: "Selon le module de la section 23, la deuxième édition reposait sur IAS 11 et IAS 18 ; la troisième édition a révisé la section pour la fonder sur IFRS 15, avec un modèle en cinq étapes (traduction de travail).",
    articleRef: "IFRS for SMEs (3e éd.), section 23",
  },
  {
    id: 'ue13c7-q29',
    question: "Lors de la première application du SYSCOHADA révisé, à quoi sert le compte 475 « Compte transitoire lié à la révision du SYSCOHADA » ?",
    options: [
      { id: 'a', texte: "À enregistrer les écarts de conversion sur les dettes en devises" },
      { id: 'b', texte: "À enregistrer les retraitements de la première année d'application, rapportés au résultat du premier exercice ou étalés sur cinq ans au plus, pour éviter que leur imputation ne fasse tomber les capitaux propres sous la moitié du capital social" },
      { id: 'c', texte: "À enregistrer l'impôt différé né des retraitements" },
      { id: 'd', texte: "À enregistrer les écarts de réévaluation légale" },
    ],
    reponseCorrecte: 'b',
    explication: "Le chapitre 41 du Titre VIII du SYSCOHADA révisé pose le principe d'une imputation en report à nouveau, mais préconise le compte 475 (4751 actif, 4752 passif) pour éviter une perte de la moitié du capital au sens des art. 371 et 664 de l'AUSCGIE. Le compte est rapporté au résultat du premier exercice ou étalé sur une durée qui ne doit pas dépasser cinq ans. IFRS 1 impute au contraire les ajustements directement en résultats non distribués (§ 11).",
    articleRef: "SYSCOHADA révisé, Titre VIII, ch. 41, § 1.2 ; IFRS 1.11",
  },
  {
    id: 'ue13c7-q30',
    question: "Une filiale congolaise devient nouvel adoptant plusieurs années après sa société mère européenne. Comment peut-elle évaluer ses actifs et passifs dans ses propres états financiers ?",
    options: [
      { id: 'a', texte: "Obligatoirement aux valeurs figurant dans les états consolidés de la mère, ajustements de consolidation compris" },
      { id: 'b', texte: "Au choix, aux valeurs qui figurent pour elle dans les consolidés de la mère (hors ajustements de consolidation et effets du regroupement), ou aux valeurs résultant de l'application d'IFRS 1 à sa propre date de transition" },
      { id: 'c', texte: "Obligatoirement à la juste valeur à sa date de transition" },
      { id: 'd', texte: "Aux valeurs SYSCOHADA, sans retraitement" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 1.D16 ouvre cette option à la filiale qui adopte après sa mère. La solution est différente dans la situation inverse : une mère qui adopte après sa filiale reprend obligatoirement, dans ses consolidés, les valeurs IFRS de la filiale, après ajustements de consolidation (D17).",
    articleRef: "IFRS 1.D16-D17",
  },
  {
    id: 'ue13c7-q31',
    question: "Un nouvel adoptant a reçu avant sa date de transition un prêt public à taux inférieur au marché, comptabilisé au nominal selon le référentiel antérieur. Sauf information disponible à l'origine, quelle valeur retient-il dans son bilan d'ouverture ?",
    options: [
      { id: 'a', texte: "La juste valeur du prêt à la date de transition" },
      { id: 'b', texte: "La juste valeur initiale du prêt, amortie jusqu'à la date de transition" },
      { id: 'c', texte: "La valeur comptable selon le référentiel antérieur, sans comptabiliser l'avantage de taux comme subvention" },
      { id: 'd', texte: "Zéro, le prêt étant assimilé à une subvention" },
    ],
    reponseCorrecte: 'c',
    explication: "Exception B10 : la valeur comptable antérieure est utilisée comme valeur comptable du prêt dans le bilan d'ouverture, et IFRS 9 et IAS 20 s'appliquent prospectivement. L'entité peut appliquer ces normes rétrospectivement si l'information nécessaire avait été obtenue lors de la comptabilisation initiale du prêt (B11).",
    articleRef: "IFRS 1.B10-B11",
  },
  {
    id: 'ue13c7-q32',
    question: "Selon l'exemption D21 relative aux passifs de démantèlement, comment le nouvel adoptant détermine-t-il la composante de démantèlement incluse dans le coût de l'actif ?",
    options: [
      { id: 'a', texte: "Il retient la provision constituée selon le référentiel antérieur" },
      { id: 'b', texte: "Il évalue le passif selon IAS 37 à la date de transition, l'actualise jusqu'à la date d'origine au meilleur taux historique ajusté du risque, puis calcule l'amortissement cumulé jusqu'à la date de transition" },
      { id: 'c', texte: "Il reconstitue chaque révision de l'estimation depuis l'origine selon IFRIC 1" },
      { id: 'd', texte: "Il comptabilise le passif sans composante d'actif" },
    ],
    reponseCorrecte: 'b',
    explication: "IFRS 1.D21 (a) à (c). L'exemption dispense de reconstituer les variations du passif antérieures à la date de transition, que IFRIC 1 imposerait d'ajouter au coût de l'actif et d'amortir prospectivement.",
    articleRef: "IFRS 1.D21",
  },
  {
    id: 'ue13c7-q33',
    question: "Quelle faculté la section 35 d'IFRS pour les PME (3e éd.) offre-t-elle en matière d'impôt différé au nouvel adoptant ?",
    options: [
      { id: 'a', texte: "Ne jamais comptabiliser d'impôt différé" },
      { id: 'b', texte: "Appliquer la section 29 de façon prospective à compter de la date de transition" },
      { id: 'c', texte: "Appliquer la méthode de l'impôt exigible pendant cinq ans" },
      { id: 'd', texte: "Aucune : la section 29 s'applique rétrospectivement sans exception" },
    ],
    reponseCorrecte: 'b',
    explication: "Section 35.10(h) (traduction de travail) : le nouvel adoptant peut appliquer la section 29 prospectivement à compter de la date de transition, tout en appliquant rétrospectivement l'exception du § 29.3A. IFRS 1 ne prévoit pas d'exemption équivalente pour IAS 12. Pour une entreprise de l'espace OHADA, dont les comptes individuels ne comportent pas d'impôt différé, cette faculté réduit sensiblement le coût de la transition.",
    articleRef: "IFRS for SMEs (3e éd.), section 35.10(h)",
  },
  {
    id: 'ue13c7-q34',
    question: "Selon la section 2 d'IFRS pour les PME (3e éd.), comment s'apprécie l'exemption pour coût ou effort excessif ?",
    options: [
      { id: 'a', texte: "Elle s'applique à toute disposition de la norme dès que son application est coûteuse" },
      { id: 'b', texte: "Elle n'existe que là où une disposition la prévoit, et suppose que le coût ou l'effort supplémentaire excède substantiellement les avantages pour les utilisateurs, selon un seuil plus bas que dans les IFRS complètes" },
      { id: 'c', texte: "Elle est appréciée une fois pour toutes à la date de transition" },
      { id: 'd', texte: "Elle dispense de toute information en annexe" },
    ],
    reponseCorrecte: 'b',
    explication: "Paragraphes 2.28 à 2.31 (traduction de travail) : l'exemption ne s'applique qu'aux dispositions qui la prévoient ; le jugement porte sur la comparaison entre le coût supplémentaire et les avantages pour les utilisateurs, avec un seuil plus bas que pour les entités ayant une obligation d'information du public ; il est renouvelé à chaque évaluation ultérieure ; l'entité indique qu'elle s'en prévaut et pourquoi.",
    articleRef: "IFRS for SMEs (3e éd.), § 2.28-2.31",
  },
  {
    id: 'ue13c7-q35',
    question: "Une société minière congolaise vend son cuivre en dollars, s'endette en dollars et règle en dollars l'essentiel de ses coûts. Ses comptes légaux sont tenus en francs congolais. Pour ses états IFRS :",
    options: [
      { id: 'a', texte: "Sa monnaie fonctionnelle est nécessairement le franc congolais, monnaie des comptes légaux" },
      { id: 'b', texte: "Sa monnaie fonctionnelle est normalement le dollar, monnaie de l'environnement économique principal, et ses valeurs historiques doivent être reconstituées en dollars" },
      { id: 'c', texte: "Elle choisit librement sa monnaie de présentation et sa monnaie fonctionnelle" },
      { id: 'd', texte: "Il suffit de convertir le bilan SYSCOHADA au cours de clôture" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 21.8-9 : la monnaie fonctionnelle est celle de l'environnement économique principal, déterminée d'abord par la monnaie qui influence le plus les prix de vente et les coûts. Les éléments non monétaires étant évalués au coût historique dans la monnaie fonctionnelle, une simple conversion au cours de clôture des soldes en francs congolais ne donne pas les valeurs IFRS. La monnaie de présentation peut, elle, être choisie librement.",
    articleRef: "IAS 21.8-9 ; SYSCOHADA révisé, Titre VIII, ch. 36",
  },
  {
    id: 'ue13c7-q36',
    question: "Un nouvel adoptant n'applique pas IFRS 3 à une acquisition réalisée avant sa date de transition. Quel traitement réserve-t-il au goodwill dans son bilan d'ouverture ?",
    options: [
      { id: 'a', texte: "Il annule l'amortissement pratiqué selon le référentiel antérieur" },
      { id: 'b', texte: "Il réévalue le goodwill à sa juste valeur" },
      { id: 'c', texte: "Il reprend la valeur comptable antérieure, ajustée des seuls reclassements d'incorporels, et effectue un test de dépréciation selon IAS 36 à la date de transition, même sans indice de perte de valeur" },
      { id: 'd', texte: "Il le décomptabilise en résultats non distribués" },
    ],
    reponseCorrecte: 'c',
    explication: "IFRS 1.C4(g) : la valeur antérieure est retenue après deux ajustements, dont un test de dépréciation effectué à la date de transition même en l'absence d'indication de perte de valeur. C4(h) interdit tout autre ajustement, notamment pour annuler un amortissement antérieur du goodwill.",
    articleRef: "IFRS 1.C4(g)-(h)",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '7.1',
    titre: "Le recours aux IFRS dans l'espace OHADA",
    navLabel: 'IFRS et OHADA',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le passage aux IFRS ne se réduit pas à une modification de la présentation des comptes. Il suppose de reconstruire l'information financière selon d'autres principes de comptabilisation et d'évaluation : prééminence de la substance économique, recours plus large à la juste valeur et aux valeurs actualisées, indépendance à l'égard des règles fiscales, informations en annexe plus étendues. Ce chapitre étudie les deux voies par lesquelles une entité peut rejoindre le référentiel de l'IASB : la première adoption des IFRS complètes, régie par IFRS 1, et l'application de la norme IFRS pour les PME, référentiel autonome et simplifié. Il s'achève par une synthèse sur le choix du référentiel. Le point de départ est juridique : dans l'espace OHADA, c'est l'Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF) qui détermine quelles entités doivent produire des états IFRS, et à quelles fins.",
      },
      { type: 'intertitre', texte: "7.1.1 Le cadre fixé par l'AUDCIF" },
      {
        type: 'filet',
        titre: "Texte de référence — AUDCIF, art. 8, al. 4 et 5",
        texte: "« Les entités dont les titres sont inscrits à une bourse de valeurs et celles qui sollicitent un financement dans le cadre d'un appel public à l'épargne, doivent établir et présenter les états financiers annuels selon les normes internationales d'informations financières, appelées normes IFRS, en sus des états financiers visés aux alinéas précédents. Les états financiers annuels établis selon les normes IFRS sont destinés exclusivement aux marchés financiers. Ils ne peuvent servir de support de base pour la détermination du bénéfice distribuable visé par l'Acte uniforme relatif au droit des sociétés commerciales et du groupement d'intérêt économique. »",
      },
      {
        type: 'paragraphe',
        texte: "Le droit OHADA organise ainsi une coexistence et non une substitution. Les comptes établis selon le SYSCOHADA révisé demeurent les comptes légaux ; les états IFRS s'y ajoutent pour les entités faisant appel au marché. L'article 75 étend la règle aux comptes de groupe : « Les états financiers consolidés des entités dont les titres sont inscrits à une bourse de valeurs et celles qui sollicitent un financement dans le cadre d'un appel public à l'épargne doivent être établis et présentés selon les normes IFRS. » Quant au calendrier, l'article 113 fixe l'entrée en vigueur au 1er janvier 2018 pour les comptes personnels et au 1er janvier 2019 « pour les comptes consolidés, les comptes combinés et les états financiers selon normes IFRS ». En dehors de ces cas, l'établissement d'états IFRS est volontaire : filiales de groupes étrangers qui publient en IFRS, entreprises financées par des bailleurs ou des investisseurs internationaux, sociétés préparant une ouverture de leur capital.",
      },
      { type: 'intertitre', texte: "7.1.2 Les raisons de la coexistence des deux jeux de comptes" },
      {
        type: 'paragraphe',
        texte: "La règle de l'article 8 selon laquelle les états IFRS ne peuvent servir de base au bénéfice distribuable n'est pas une précaution de forme. Le droit des sociétés attache aux comptes légaux des effets juridiques précis : détermination du bénéfice distribuable et des dividendes, constitution des réserves, mais aussi mécanismes d'alerte sur la continuité de la société. Les articles 371 (SARL) et 664 (SA) de l'AUSCGIE imposent ainsi de consulter les associés sur la dissolution anticipée lorsque, « du fait de pertes constatées dans les états financiers de synthèse, les capitaux propres de la société deviennent inférieurs à la moitié du capital social » (art. 664). Si ces seuils dépendaient d'évaluations à la juste valeur ou de retraitements de première adoption, leur franchissement pourrait résulter d'un simple changement de référentiel, sans perte économique. En isolant les états IFRS dans une fonction d'information des marchés, l'AUDCIF préserve la stabilité des effets juridiques des comptes.",
      },
      {
        type: 'paragraphe',
        texte: "La même logique vaut pour la fiscalité. En pratique, l'administration fiscale détermine le résultat imposable à partir des comptes légaux, retraités selon les règles propres à l'impôt. Les états IFRS n'ont aucune fonction fiscale ; les écarts entre valeurs comptables IFRS et bases fiscales y sont traduits par l'impôt différé (IAS 12), ce qui explique qu'un retraitement de première adoption s'accompagne presque toujours d'un effet d'impôt différé (section 7.3).",
      },
      { type: 'intertitre', texte: "7.1.3 Monnaie de tenue des comptes et monnaie fonctionnelle" },
      {
        type: 'paragraphe',
        texte: "Une difficulté propre à de nombreuses entreprises congolaises tient à la monnaie. Le SYSCOHADA raisonne en unités monétaires légales du pays : dans sa présentation de la comptabilité pluri-monétaire, il distingue la comptabilité « normale en unités monétaires légales (UML) » des comptabilités auxiliaires tenues en devises, qui sont intégrées en fin d'exercice après conversion au cours d'inventaire (Titre VIII, ch. 36). En République démocratique du Congo, la loi n° 23/053 en tire la conséquence fiscale : la comptabilité des entreprises soumises à l'impôt sur les sociétés est tenue en français et « exprimée en Franc congolais » (art. 141). IAS 21 retient une autre notion : la monnaie fonctionnelle, « monnaie de l'environnement économique principal dans lequel l'entité exerce ses activités » (§ 8), déterminée d'abord par la monnaie qui influence le plus les prix de vente et les coûts (§ 9).",
      },
      {
        type: 'paragraphe',
        texte: "Une société minière qui vend du cuivre en dollars, s'endette en dollars et paie une large part de ses coûts en dollars aura normalement le dollar pour monnaie fonctionnelle en IFRS, tout en tenant ses comptes légaux en francs congolais. Le nouvel adoptant doit alors non seulement retraiter les méthodes, mais aussi reconstituer ses éléments non monétaires en dollars historiques : les immobilisations, les stocks et les capitaux propres ne peuvent être obtenus par simple conversion des soldes en francs congolais au cours de clôture. Cette reconstitution est souvent la tâche la plus lourde d'une première adoption en RDC ; elle éclaire l'intérêt des exemptions de coût présumé étudiées à la section 7.5.",
      },
      { type: 'intertitre', texte: "7.1.4 Trois référentiels, trois finalités" },
      {
        type: 'carte',
        titre: "Tableau 7.1 — SYSCOHADA révisé, IFRS pour les PME et IFRS complètes",
        tableau: {
          entetes: ['Critère', 'SYSCOHADA révisé', 'IFRS pour les PME', 'IFRS complètes'],
          lignes: [
            ["Statut dans l'espace OHADA", 'Obligatoire pour les comptes légaux', 'Volontaire, en complément', "Obligatoire en sus pour les entités cotées ou faisant appel public à l'épargne (art. 8 et 75)"],
            ['Entités visées', 'Toutes les entités assujetties', "Entités sans obligation d'information du public", 'Toutes, notamment les entités faisant appel au marché'],
            ['Monnaie', 'Unités monétaires légales', 'Monnaie fonctionnelle (section 30)', 'Monnaie fonctionnelle (IAS 21)'],
            ['Juste valeur', 'Limitée', 'Utilisée de façon ciblée, avec exemptions pour coût ou effort excessif', 'Nombreuses applications (IFRS 9, IFRS 13, IAS 40, IAS 41)'],
            ['Impôts différés', 'Comptes consolidés seulement', 'Oui (section 29)', 'Oui (IAS 12)'],
            ['Goodwill', 'Selon le Dispositif relatif aux comptes consolidés', "Amorti, sur dix ans au plus si la durée d'utilité ne peut être estimée de façon fiable", 'Non amorti, test annuel'],
            ["Niveau d'information en annexe", 'Défini par le Titre IX', 'Réduit', 'Étendu'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Ce tableau corrige une opposition fréquente, reprise par le support d'origine du module, entre un SYSCOHADA qui serait « juridique » et des IFRS qui seraient « économiques ». Le SYSCOHADA révisé a intégré de nombreux principes issus des normes internationales : contrats pluri-exercices inspirés d'IAS 11 et d'IFRS 15, subventions inspirées d'IAS 20, engagements de retraite inspirés d'IAS 19, réévaluation inspirée d'IAS 16 et d'IAS 29. Son chapitre 41, consacré à la première application du SYSCOHADA révisé, reprend même l'architecture d'IFRS 1 (section 7.3). Les écarts tiennent moins à l'orientation générale qu'à des choix précis : méthode de l'impôt exigible dans les comptes individuels, traitement asymétrique des écarts de change latents, prudence dans l'évaluation, place limitée de la juste valeur, subordination de certains choix comptables à la protection des capitaux propres.",
      },
    ],
  },
  {
    numero: '7.2',
    titre: "IFRS 1 : objectif, champ d'application et calendrier de la transition",
    navLabel: 'IFRS 1 : champ',
    blocs: [
      {
        type: 'filet',
        titre: "Texte de référence — IFRS 1, § 1",
        texte: "« L'objectif de la présente norme est d'assurer que les premiers états financiers IFRS d'une entité ainsi que ses rapports intermédiaires relatifs à une partie de la période couverte par ces états financiers contiennent des informations de qualité élevée qui : (a) sont transparentes pour les utilisateurs et comparables pour toutes les périodes présentées ; (b) fournissent un point de départ approprié pour une comptabilité conforme aux Normes internationales d'information financière (IFRS) ; et (c) peuvent être produites à un coût qui ne dépasse pas les avantages attendus. »",
      },
      {
        type: 'paragraphe',
        texte: "L'objectif associe deux exigences en tension. La comparabilité voudrait que les IFRS soient appliquées comme si elles l'avaient toujours été : c'est la seule manière de rendre comparables les périodes présentées et de fournir un point de départ fiable pour les exercices suivants. Le rapport coût-avantage commande, lui, de ne pas imposer la reconstitution d'informations anciennes qu'il serait coûteux, voire impossible, d'obtenir. IFRS 1 résout cette tension par un principe d'application rétrospective, assorti de dérogations limitativement énumérées. Toute la norme se lit comme l'arbitrage, point par point, entre ces deux exigences.",
      },
      { type: 'intertitre', texte: "7.2.1 La notion de premiers états financiers IFRS" },
      {
        type: 'paragraphe',
        texte: "La norme s'applique aux premiers états financiers IFRS de l'entité et aux rapports intermédiaires présentés selon IAS 34 pour une partie de la période qu'ils couvrent (§ 2). Le critère décisif est formel : les premiers états financiers IFRS sont les premiers états annuels dans lesquels l'entité adopte les IFRS « par une déclaration explicite et sans réserve de conformité aux IFRS incluse dans ces états financiers » (§ 3). Le choix de ce critère s'explique par la fonction de la déclaration : c'est elle qui engage l'entité à l'égard des utilisateurs. Aussi longtemps qu'elle n'a pas été faite, les utilisateurs n'ont reçu aucune assurance de conformité, quelle que soit la qualité technique des comptes antérieurs.",
      },
      {
        type: 'carte',
        titre: "Tableau 7.2 — Situations de nouvel adoptant et situations exclues (IFRS 1, § 3 à 5)",
        tableau: {
          entetes: ['Situation antérieure', 'Qualification', 'Paragraphe'],
          lignes: [
            ["Comptes selon des dispositions nationales incompatibles avec les IFRS", 'Nouvel adoptant', '§ 3(a)(i)'],
            ["Comptes conformes aux IFRS dans tous leurs aspects, mais sans déclaration explicite et sans réserve", 'Nouvel adoptant', '§ 3(a)(ii)'],
            ["Déclaration de conformité à certaines IFRS seulement ; application de certaines IFRS pour combler un vide du référentiel national", 'Nouvel adoptant', '§ 3(a)(iii)-(iv)'],
            ["Comptes nationaux avec rapprochement de certains montants avec les IFRS", 'Nouvel adoptant', '§ 3(a)(v)'],
            ["États IFRS à usage interne uniquement ; liasse de consolidation IFRS sans jeu complet d'états", 'Nouvel adoptant', '§ 3(b)-(c)'],
            ["Aucun état financier pour les périodes précédentes", 'Nouvel adoptant', '§ 3(d)'],
            ["Déclaration explicite et sans réserve l'année précédente, même assortie d'une opinion d'audit avec réserve", 'Pas nouvel adoptant', '§ 4(b)-(c)'],
            ["Entité appliquant déjà les IFRS et changeant de méthode", "Pas nouvel adoptant : IAS 8", '§ 5'],
            ["Entité ayant cessé d'appliquer les IFRS puis reprenant leur application", "Choix entre IFRS 1 et application rétrospective selon IAS 8", '§ 4A-4B, 23A-23B'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Le cas de la reprise d'application (§ 4A) illustre la logique coût-avantage de la norme. Une entité qui a publié en IFRS, puis a cessé de le faire, peut disposer des informations nécessaires pour appliquer les IFRS comme si elle ne les avait jamais abandonnées. Rien ne justifie alors de lui imposer les dérogations d'IFRS 1, qui réduisent la comparabilité ; la norme lui laisse le choix. Dans les deux branches de l'option, elle explique pourquoi elle avait cessé d'appliquer les IFRS et pourquoi elle les applique de nouveau (§ 23A), et, si elle n'applique pas IFRS 1, pourquoi elle a choisi d'appliquer les IFRS comme si elle n'avait jamais cessé de le faire (§ 23B).",
      },
      { type: 'intertitre', texte: "7.2.2 Les normes applicables : la règle de la version unique" },
      {
        type: 'paragraphe',
        texte: "Les méthodes comptables doivent être conformes « à chaque IFRS en vigueur à la fin de la première période pour laquelle elle présente de l'information financière selon les IFRS » (§ 7), et l'entité ne doit pas appliquer des versions différentes des IFRS en vigueur à des dates antérieures (§ 8). Les dispositions transitoires des autres normes ne s'appliquent pas au nouvel adoptant, sauf dans les cas prévus aux annexes B à E (§ 9). Cette règle a une justification simple : un nouvel adoptant qui appliquerait successivement les versions en vigueur à chaque date présenterait des périodes non comparables entre elles. Elle a une conséquence pratique importante : une norme publiée pendant la période de transition, applicable à la clôture de la première période IFRS, s'applique à toutes les périodes présentées, y compris au bilan d'ouverture. Une norme non encore obligatoire peut être appliquée par anticipation si elle le permet (§ 8).",
      },
      {
        type: 'carte',
        titre: "Exemple 7.1 — Calendrier d'une première adoption",
        texte: "Une société de télécommunications établie à Kinshasa décide de publier ses premiers états IFRS pour l'exercice clos le 31 décembre 2026, avec un exercice comparatif.",
        tableau: {
          entetes: ['Date', 'Élément', 'Référence'],
          lignes: [
            ['1er janvier 2025', "Date de transition : état de la situation financière d'ouverture en IFRS", 'Annexe A ; § 6'],
            ['31 décembre 2025', "Dernière clôture selon le référentiel antérieur (SYSCOHADA) ; clôture comparative IFRS", '§ 21 et 24(a)(ii)'],
            ['31 décembre 2026', 'Clôture de la première période de présentation IFRS', 'Annexe A'],
            ['Normes appliquées', "IFRS en vigueur au 31 décembre 2026, pour toutes les périodes présentées", '§ 7-8'],
            ['Contenu minimal', "Trois états de la situation financière, deux états du résultat net et des autres éléments du résultat global, deux tableaux des flux de trésorerie, deux états des variations des capitaux propres, notes", '§ 21'],
          ],
        },
        note: "La décision doit être prise avant la date de transition, ou peu après : l'entité doit pouvoir collecter dès le 1er janvier 2025 les informations nécessaires aux évaluations IFRS de l'exercice comparatif, alors même que ses comptes légaux de 2025 restent établis selon le SYSCOHADA. IFRS 18, obligatoire pour les exercices ouverts à compter du 1er janvier 2027, peut être appliquée par anticipation (chapitre 8) ; si l'entité fait ce choix dans ses premiers états IFRS, elle l'applique aussi à l'exercice comparatif 2025 (§ 7-8).",
      },
      { type: 'intertitre', texte: "7.2.3 Les groupes : filiale et société mère adoptant à des dates différentes" },
      {
        type: 'paragraphe',
        texte: "Beaucoup d'entreprises congolaises sont les filiales de groupes étrangers qui publient déjà en IFRS. Lorsqu'une filiale devient nouvel adoptant après sa société mère, IFRS 1 lui ouvre une option (D16) : évaluer ses actifs et passifs, dans ses propres états, soit aux valeurs qui figurent pour elle dans les états consolidés de la mère, compte tenu de la date de transition de la mère et en l'absence d'ajustements de consolidation et d'effets du regroupement par lequel la mère l'a acquise, soit aux valeurs résultant de l'application d'IFRS 1 à sa propre date de transition. La première branche évite de tenir deux jeux de valeurs IFRS pour les mêmes actifs ; la seconde peut être préférable si la filiale souhaite retenir des méthodes différentes de celles du groupe, par exemple le modèle du coût quand le groupe applique le modèle de la réévaluation. La situation inverse est traitée de façon impérative : une mère qui adopte après sa filiale reprend, dans ses comptes consolidés, les valeurs IFRS des états de la filiale, après ajustements de consolidation (D17).",
      },
      {
        type: 'carte',
        titre: "Exemple 7.2 — Filiale d'un groupe publiant déjà en IFRS",
        texte: "Une brasserie de Kinshasa, filiale d'un groupe européen dont la date de transition aux IFRS remonte à 2005, publie ses premiers états IFRS au 31 décembre 2026. Sa liasse de consolidation reprend, pour ses usines, les valeurs IFRS du groupe : coût d'acquisition historique, approche par composants, durées d'utilité du groupe.",
        tableau: {
          entetes: ['Option', 'Conséquences'],
          lignes: [
            ["D16(a) : valeurs retenues dans les consolidés de la mère", "Reprise des valeurs de la liasse, hors ajustements de consolidation (élimination des marges internes) et hors écarts d'acquisition du groupe ; cohérence entre comptes individuels et consolidés ; les exemptions de la brasserie sont celles déjà exercées par le groupe en 2005"],
            ["D16(b) : application d'IFRS 1 à sa propre date de transition (1er janvier 2025)", "Possibilité d'utiliser la juste valeur au 1er janvier 2025 comme coût présumé (D5) ; valeurs différentes de celles du groupe, donc deux jeux de valeurs à suivre"],
          ],
        },
        note: "La liasse de consolidation établie selon les IFRS ne dispense pas la brasserie d'appliquer IFRS 1 : elle ne constitue pas un jeu complet d'états financiers (§ 3(c)). Elle facilite en revanche l'application de la branche D16(a).",
      },
    ],
  },
  {
    numero: '7.3',
    titre: "IFRS 1 : l'état de la situation financière d'ouverture",
    navLabel: "IFRS 1 : bilan d'ouverture",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'entité prépare et présente un état de la situation financière d'ouverture en IFRS à la date de transition ; c'est le point de départ de sa comptabilité selon les IFRS (§ 6). Elle y applique les mêmes méthodes que pour toutes les périodes présentées (§ 7). Construire ce bilan revient à se demander, pour chaque élément, quel montant figurerait à la date de transition si les IFRS en vigueur à la clôture de la première période IFRS avaient toujours été appliquées, puis à vérifier si une exception ou une exemption modifie la réponse.",
      },
      { type: 'intertitre', texte: "7.3.1 Les quatre opérations du bilan d'ouverture" },
      {
        type: 'filet',
        titre: "Texte de référence — IFRS 1, § 10",
        texte: "« Hormis les cas décrits aux paragraphes 13 à 19 et aux annexes B à E, dans son état de la situation financière d'ouverture en IFRS, une entité doit : (a) comptabiliser tous les actifs et passifs dont les IFRS imposent la comptabilisation ; (b) ne pas comptabiliser des éléments en tant qu'actifs ou passifs si les IFRS n'autorisent pas une telle comptabilisation ; (c) reclasser les éléments qu'elle a comptabilisés selon le référentiel comptable antérieur comme un certain type d'actif, de passif ou de composante des capitaux propres, mais qui sont considérés comme un type différent d'actif, de passif ou de composante des capitaux propres selon les IFRS ; et (d) appliquer les IFRS pour évaluer tous les actifs et passifs comptabilisés. »",
      },
      {
        type: 'carte',
        titre: "Tableau 7.3 — Retraitements usuels du passage du SYSCOHADA révisé aux IFRS",
        tableau: {
          entetes: ['Opération (§ 10)', 'Illustration', 'Chapitre de référence'],
          lignes: [
            ['(a) Comptabiliser', "Impôts différés actifs et passifs, absents des comptes individuels SYSCOHADA", 'Chapitre 6'],
            ['(a) Comptabiliser', "Gains de change latents sur éléments monétaires, différés au compte 479", 'Chapitre 6'],
            ['(a) Comptabiliser', "Actifs au titre de droits d'utilisation et obligations locatives des contrats antérieurs à la révision du SYSCOHADA, restés hors bilan (SYSCOHADA, ch. 41, § 2.8)", 'Section 7.5'],
            ['(b) Ne pas comptabiliser', "Écarts de conversion-actif (compte 478), qui ne sont ni des actifs ni des charges différées en IFRS", 'Chapitre 6'],
            ['(c) Reclasser', "Subventions d'investissement (compte 14), des capitaux propres vers les produits différés ou en déduction des actifs", 'Chapitre 5'],
            ['(d) Évaluer', "Dépréciation des créances selon les pertes de crédit attendues d'IFRS 9", 'Chapitre 4'],
            ['(d) Évaluer', "Engagements de retraite selon la méthode des unités de crédit projetées, si une méthode simplifiée était appliquée", 'Chapitre 6'],
            ['(d) Évaluer', "Immobilisations selon l'approche par composants et les durées d'utilité IFRS, ou selon un coût présumé", 'Chapitres 2 et 7'],
          ],
        },
      },
      { type: 'intertitre', texte: "7.3.2 L'imputation des ajustements et ses fondements" },
      {
        type: 'paragraphe',
        texte: "Les ajustements qui résultent de la différence entre les méthodes antérieures et les IFRS découlent d'événements et de transactions antérieurs à la date de transition. L'entité les comptabilise donc « directement en résultats non distribués (ou, le cas échéant, dans une autre catégorie de capitaux propres) à la date de transition aux IFRS » (§ 11). L'argument est celui du rattachement : faire transiter ces ajustements par le résultat d'une période présentée reviendrait à y inscrire des produits et des charges qui ne relèvent pas de sa performance. Chaque ajustement modifiant la valeur comptable d'un actif ou d'un passif sans modifier sa base fiscale, il fait naître une différence temporaire dont l'impôt différé est comptabilisé selon IAS 12 dans le même bilan d'ouverture. L'exception B14 renforce cette exigence : les exemptions d'IAS 12 relatives à la comptabilisation initiale ne dispensent pas le nouvel adoptant de comptabiliser l'impôt différé attaché aux contrats de location et aux passifs de démantèlement.",
      },
      {
        type: 'filet',
        titre: "Analyse comparée — La première application du SYSCOHADA révisé",
        texte: "Le chapitre 41 du Titre VIII du SYSCOHADA révisé, consacré à la première application du référentiel révisé, reprend l'architecture d'IFRS 1 : l'entité prépare son bilan d'ouverture à la date de transition, qui constitue « le point de départ de sa comptabilité selon le SYSCOHADA révisé » ; elle comptabilise les actifs et passifs requis, reclasse les éléments et s'abstient de comptabiliser ce que le référentiel n'admet pas ; les premiers états financiers sont ceux « qui sont confirmés par une déclaration explicite et sans réserve de conformité SYSCOHADA révisé ». La divergence porte sur l'imputation. Le principe est le même qu'en IFRS : l'effet après impôt du changement est imputé en report à nouveau. Mais le SYSCOHADA préconise un compte transitoire, le compte 475, subdivisé en 4751 (actif) et 4752 (passif), pour éviter que l'effet cumulé des imputations n'entraîne une perte de la moitié du capital social au sens des articles 371 et 664 de l'AUSCGIE ; ce compte est rapporté au résultat du premier exercice ou étalé sur une durée qui ne doit pas dépasser cinq ans. Le législateur comptable OHADA a ainsi fait prévaloir la protection des effets juridiques des capitaux propres sur la pureté de l'imputation. IFRS 1 ignore cette préoccupation : les états IFRS n'ont pas, dans l'espace OHADA, de fonction juridique de ce type (art. 8 de l'AUDCIF).",
      },
      {
        type: 'carte',
        titre: "Exemple 7.3 — Juste valeur utilisée comme coût présumé",
        texte: "Illustration du support d'origine, complétée. Une flotte de camions figure au bilan SYSCOHADA pour 100 000 à la date de transition, avec une durée d'utilité résiduelle de huit ans. Sa juste valeur est de 140 000 ; l'entité choisit de l'utiliser comme coût présumé (D5). La base fiscale, fondée sur les comptes légaux, reste de 100 000. Taux d'impôt : 30 %.",
        tableau: {
          entetes: ['Compte', 'Débit', 'Crédit'],
          lignes: [
            ['Immobilisations corporelles', '40 000', ''],
            ["Passif d'impôt différé (40 000 × 30 %)", '', '12 000'],
            ['Résultats non distribués', '', '28 000'],
          ],
        },
        note: "Le support comptabilise la totalité des 40 000 en résultats non distribués. Or la valeur comptable IFRS (140 000) excède désormais la base fiscale (100 000) : la différence temporaire imposable de 40 000 impose un passif d'impôt différé (IAS 12.15), de sorte que l'augmentation nette des capitaux propres n'est que de 28 000. Pour la suite, le coût présumé tient lieu de coût (annexe A) : la dotation IFRS annuelle est de 140 000 / 8 = **17 500**, contre 12 500 dans les comptes légaux. La différence de 5 000 réduit chaque année le résultat IFRS avant impôt et résorbe le passif d'impôt différé de 1 500 ; l'effet net sur le résultat IFRS est de −3 500 par an pendant huit ans, soit au total les 28 000 portés en capitaux propres d'ouverture.",
      },
      { type: 'intertitre', texte: "7.3.3 Un bilan d'ouverture complet" },
      {
        type: 'paragraphe',
        texte: "L'exemple suivant reconstitue le bilan d'ouverture d'une société de logistique à partir de son bilan SYSCOHADA. On suppose que les bases fiscales correspondent aux valeurs SYSCOHADA, que la subvention d'investissement n'est pas imposable et qu'un bénéfice imposable futur suffisant est probable pour justifier la comptabilisation des actifs d'impôt différé. Le taux d'impôt est de 30 %. Les actifs et passifs d'impôt différé sont présentés sans compensation.",
      },
      {
        type: 'carte',
        titre: "Exemple 7.4 — Du bilan SYSCOHADA au bilan d'ouverture IFRS au 1er janvier 2025 (NGUVU LOGISTIQUE SA, société fictive)",
        tableau: {
          entetes: ['Poste', 'SYSCOHADA', 'Ajustement', 'IFRS', 'Motif'],
          lignes: [
            ['Camions', '100 000', '+40 000', '140 000', 'Coût présumé (D5)'],
            ['Autres immobilisations corporelles', '700 000', '', '700 000', ''],
            ['Stocks', '150 000', '', '150 000', ''],
            ['Créances clients nettes', '190 000', '−8 000', '182 000', 'Pertes attendues 18 000 contre dépréciation 10 000 (IFRS 9)'],
            ["Actif d'impôt différé", '—', '+3 900', '3 900', '(8 000 + 5 000) × 30 %'],
            ['Trésorerie', '60 000', '', '60 000', ''],
            ["**Total de l'actif**", '**1 200 000**', '', '**1 235 900**', ''],
            ['Capital', '500 000', '', '500 000', ''],
            ['Réserves et résultats non distribués', '300 000', '+21 000', '321 000', 'Somme des ajustements nets'],
            ["Subventions d'investissement", '60 000', '−60 000', '—', 'Reclassement (§ 10(c) ; IAS 20)'],
            ['Produits différés (subvention)', '—', '+60 000', '60 000', 'Pas d\'impôt différé (IAS 12.33)'],
            ['Provision pour indemnités de fin de carrière', '25 000', '+5 000', '30 000', 'Unités de crédit projetées (IAS 19)'],
            ["Passif d'impôt différé", '—', '+12 900', '12 900', '(40 000 + 3 000) × 30 %'],
            ['Emprunts', '200 000', '', '200 000', ''],
            ['Fournisseurs et autres dettes', '112 000', '', '112 000', ''],
            ['Écart de conversion-passif (479)', '3 000', '−3 000', '—', 'Gain latent reconnu (IAS 21)'],
            ['**Total du passif et des capitaux propres**', '**1 200 000**', '', '**1 235 900**', ''],
          ],
        },
        note: "Les ajustements nets en résultats non distribués se décomposent ainsi : camions +28 000 ; pertes de crédit −5 600 ; indemnités de fin de carrière −3 500 ; gain de change +2 100 ; total **+21 000**. Les capitaux propres IFRS s'élèvent à 821 000, contre 860 000 en SYSCOHADA en y incluant les subventions d'investissement. Le passage de l'un à l'autre fait l'objet du rapprochement exigé par le § 24(a)(i) (section 7.6).",
      },
    ],
  },
  {
    numero: '7.4',
    titre: "IFRS 1 : les exceptions obligatoires à l'application rétrospective",
    navLabel: 'IFRS 1 : exceptions',
    blocs: [
      {
        type: 'paragraphe',
        texte: "IFRS 1 établit deux catégories de dérogations au principe d'application rétrospective (§ 12). Les exceptions, énoncées aux § 14 à 17 et à l'annexe B, interdisent l'application rétrospective. Les exemptions, énoncées aux annexes C à E, la rendent facultative. La distinction repose sur deux justifications différentes. Les exceptions répondent à un risque de fiabilité : appliquer rétrospectivement certaines dispositions obligerait la direction à porter aujourd'hui des jugements sur des situations passées dont elle connaît désormais l'issue. Une couverture désignée après coup, une estimation révisée à la lumière d'informations postérieures seraient nécessairement influencées par cette connaissance. Les exemptions répondent à un problème de coût : l'application rétrospective serait possible, mais trop onéreuse au regard de l'information obtenue. Les unes et les autres sont limitatives : l'entité « ne doit pas appliquer ces exemptions à d'autres éléments par analogie » (§ 18).",
      },
      { type: 'intertitre', texte: "7.4.1 Les estimations" },
      {
        type: 'filet',
        titre: "Texte de référence — IFRS 1, § 14",
        texte: "« Les estimations établies selon les IFRS par une entité à la date de transition aux IFRS doivent être cohérentes avec les estimations établies à la même date selon le référentiel comptable antérieur (après les ajustements destinés à refléter toute différence entre les méthodes comptables), sauf si des éléments probants objectifs montrent que ces dernières estimations étaient erronées. »",
      },
      {
        type: 'paragraphe',
        texte: "La règle interdit d'utiliser le recul. Une information reçue après la date de transition sur une estimation antérieure est traitée comme un événement postérieur à la clôture ne donnant pas lieu à ajustement : elle affecte le résultat de l'exercice comparatif, non le bilan d'ouverture (§ 15). La norme distingue deux situations. Si l'estimation existait déjà selon le référentiel antérieur, elle est reprise, sous réserve des différences de méthode et des erreurs avérées. Si les IFRS exigent une estimation que le référentiel antérieur n'imposait pas, elle doit refléter les conditions existant à la date de transition ; en particulier, les prix de marché, taux d'intérêt et cours de change sont ceux de cette date (§ 16). Les mêmes règles s'appliquent à la fin de la période comparative (§ 17).",
      },
      {
        type: 'carte',
        titre: "Exemple 7.5 — Application de la règle des estimations",
        texte: "Date de transition : 1er janvier 2025. Au 31 décembre 2024, l'entité a déprécié de 20 000 un lot de pièces détachées à rotation lente, sur la base des prix de vente alors observés. En mai 2025, le lot est cédé à un prix qui aurait justifié une dépréciation de 35 000. Par ailleurs, l'entité n'avait jamais évalué la provision pour démantèlement d'un entrepôt loué, que le SYSCOHADA ne l'obligeait pas à actualiser ; les IFRS exigent une valeur actualisée.",
        tableau: {
          entetes: ['Élément', "Bilan d'ouverture IFRS", 'Exercice comparatif 2025'],
          lignes: [
            ['Dépréciation du lot', "20 000 : estimation cohérente avec celle du 31 décembre 2024, sauf erreur avérée (§ 14)", "Charge complémentaire de 15 000 en 2025 (§ 15)"],
            ['Provision pour démantèlement', "Estimation nouvelle, actualisée au taux de marché du 1er janvier 2025 (§ 16)", "Désactualisation et révisions ultérieures selon IAS 37"],
          ],
        },
        note: "La dépréciation n'est pas corrigée dans le bilan d'ouverture parce que l'estimation du 31 décembre 2024 n'était pas erronée : elle reposait sur les informations disponibles à cette date. Il en irait autrement si l'entité avait ignoré, au 31 décembre 2024, une information déjà connue, par exemple une offre ferme de rachat à bas prix : il s'agirait alors d'une erreur, présentée comme telle dans les rapprochements (§ 26).",
      },
      { type: 'intertitre', texte: "7.4.2 Les exceptions de l'annexe B" },
      {
        type: 'carte',
        titre: "Tableau 7.4 — Exceptions de l'annexe B (IFRS 1, B1)",
        tableau: {
          entetes: ['Exception', 'Règle principale', 'Justification', 'Paragraphe'],
          lignes: [
            ["Décomptabilisation d'actifs et passifs financiers", "Application prospective aux transactions postérieures à la date de transition ; application rétrospective possible si l'information avait été obtenue à l'origine", "Reconstituer après coup les flux et les risques transférés serait peu fiable", 'B2-B3'],
            ['Comptabilité de couverture', "Évaluation de tous les dérivés à la juste valeur ; élimination des profits et pertes différés ; aucune relation non conforme à IFRS 9 ; aucune désignation rétrospective", "Une couverture désignée après coup choisirait les relations favorables", 'B4-B6'],
            ['Participations ne donnant pas le contrôle', "Application prospective de certaines dispositions d'IFRS 10 (attribution des résultats, variations de pourcentage, perte de contrôle)", 'Cohérence avec le traitement des regroupements passés', 'B7'],
            ["Classement et évaluation des actifs financiers", "Modèle économique et caractéristiques des flux appréciés d'après les faits existant à la date de transition ; règle de repli si le taux d'intérêt effectif est impraticable", "Le modèle économique d'origine ne peut être reconstitué sans recul", 'B8-B8C'],
            ["Dépréciation d'actifs financiers", "Application rétrospective d'IFRS 9, section 5.5, avec informations obtenues sans coût ni effort déraisonnables ; à défaut, pertes attendues pour la durée de vie", "Le risque de crédit initial est souvent inconnu", 'B8D-B8G'],
            ['Dérivés incorporés', "Séparation appréciée à la date de conclusion du contrat ou de réexamen", 'Respect des conditions contractuelles initiales', 'B9'],
            ['Prêts publics', "Valeur comptable antérieure maintenue ; IFRS 9 et IAS 20 appliquées prospectivement, sauf information disponible à l'origine", "La juste valeur initiale d'un prêt ancien ne peut être établie sans recul", 'B10-B12'],
            ["Contrats d'assurance", "Dispositions transitoires d'IFRS 17", '—', 'B13'],
            ["Impôt différé sur contrats de location et démantèlement", "Comptabilisation de l'impôt différé malgré les exemptions d'IAS 12.15 et 24", "Éviter une asymétrie durable", 'B14'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Deux exceptions concernent directement les entreprises commerciales et industrielles. La dépréciation des créances d'abord : le nouvel adoptant applique le modèle des pertes de crédit attendues de façon rétrospective, ce qui suppose de comparer le risque de crédit à la date de transition avec celui de la comptabilisation initiale (B8E). S'il ne peut déterminer, sans coûts ou efforts déraisonnables, si le risque a augmenté de façon importante, il comptabilise les pertes attendues pour la durée de vie jusqu'à la décomptabilisation de l'instrument (B8G). Pour des créances commerciales, la question est souvent sans objet, puisque la méthode simplifiée d'IFRS 9 impose déjà les pertes attendues pour la durée de vie (chapitre 4). La décomptabilisation ensuite : une entreprise qui a cédé des créances avant la date de transition, et les a sorties de son bilan selon le SYSCOHADA, ne les réinscrit pas, même si IFRS 9 n'aurait pas admis la décomptabilisation (B2).",
      },
      {
        type: 'carte',
        titre: "Exemple 7.6 — Prêt public à taux bonifié (B10-B11)",
        texte: "Le 1er janvier 2023, une entreprise agro-industrielle a reçu d'un fonds public de soutien à l'industrie un prêt de 1 000 000, au taux de 2 % payable annuellement, remboursable in fine le 31 décembre 2027. Le taux du marché pour un emprunt comparable était de 12 %. Selon le SYSCOHADA, le prêt figure au nominal. Date de transition : 1er janvier 2025.",
        tableau: {
          entetes: ['Traitement', 'Valeur du prêt au 1er janvier 2025', 'Conséquence'],
          lignes: [
            ['Exception B10 (règle générale)', '**1 000 000** : valeur comptable antérieure', "Pas de subvention comptabilisée ; taux d'intérêt effectif de 2 % sur la durée restante"],
            ["Application rétrospective (B11), si l'information de 2023 était disponible", "Juste valeur initiale : 20 000 × 3,6048 + 1 000 000 × 0,5674 = **639 523** ; coût amorti au 1er janvier 2025 (valeur actualisée à 12 % des flux restants) : 20 000 × 2,4018 + 1 000 000 × 0,7118 = **759 817**", "Avantage initial de 360 477 traité comme subvention selon IAS 20 ; charge d'intérêts à 12 %"],
          ],
        },
        note: "La valeur retenue par l'exception B10 surévalue la dette de 240 183 par rapport à une application rétrospective. L'IASB a accepté cette imprécision parce que la juste valeur initiale d'un prêt ancien, et en particulier le taux de marché applicable à la date de son octroi, ne pourrait être reconstituée qu'avec le recul. Les coefficients d'actualisation utilisés sont 1/1,12⁵ = 0,5674 et 1/1,12³ = 0,7118 ; les facteurs d'annuité correspondants sont 3,6048 et 2,4018.",
      },
      {
        type: 'paragraphe',
        texte: "L'exception relative à la couverture mérite une attention particulière dans les économies dollarisées. Une entreprise qui a conclu avant la date de transition un contrat de change à terme pour se prémunir contre la hausse du dollar sur un achat d'équipement ne peut traiter cette opération en couverture dans son bilan d'ouverture que si la relation satisfaisait déjà aux conditions d'IFRS 9, documentation comprise. À défaut, le dérivé est évalué à sa juste valeur (B4) et ses variations affectent le résultat. Pour un nouvel adoptant, la documentation des relations de couverture doit donc être en place au plus tard à la date de transition.",
      },
    ],
  },
  {
    numero: '7.5',
    titre: "IFRS 1 : les exemptions facultatives",
    navLabel: 'IFRS 1 : exemptions',
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'annexe C traite des regroupements d'entreprises antérieurs à la date de transition ; l'annexe D énumère les autres exemptions ouvertes au choix de l'entité (D1) ; l'annexe E contient des exemptions temporaires, aujourd'hui largement éteintes. Chaque exemption est un choix de méthode qui engage durablement les comptes : un coût présumé fixe la base des amortissements futurs, la remise à zéro des écarts de conversion modifie le résultat de toute cession future d'une filiale étrangère. Le choix doit donc être raisonné au regard de l'information disponible, du coût de sa reconstitution et des effets futurs.",
      },
      { type: 'intertitre', texte: "7.5.1 Les regroupements d'entreprises antérieurs" },
      {
        type: 'paragraphe',
        texte: "Le nouvel adoptant peut ne pas appliquer rétrospectivement IFRS 3 aux regroupements antérieurs à la date de transition ; s'il retraite un regroupement, il doit retraiter tous les regroupements postérieurs et appliquer IFRS 10 à partir de la même date (C1). L'exemption n'est pas un gel intégral. Le classement antérieur de l'opération est maintenu (C4(a)) ; tous les actifs acquis et passifs repris sont comptabilisés, sauf exceptions (C4(b)) ; les éléments que les IFRS n'admettent pas sont exclus (C4(c)) ; les actifs et passifs que les IFRS évaluent à la juste valeur le sont, l'ajustement étant porté en résultats non distribués (C4(d)). Le goodwill est repris à sa valeur antérieure, après deux ajustements seulement, dont un test de dépréciation obligatoire selon IAS 36 à la date de transition, « Qu'il y ait ou non une indication que le goodwill a pu perdre de la valeur » (C4(g)(ii)). Aucun autre ajustement n'est admis : l'amortissement antérieur du goodwill, pratiqué en SYSCOHADA, n'est pas annulé (C4(h)(ii)).",
      },
      { type: 'intertitre', texte: "7.5.2 Le coût présumé" },
      {
        type: 'carte',
        titre: "Tableau 7.5 — Les formes du coût présumé",
        tableau: {
          entetes: ['Fondement', 'Actifs concernés', 'Condition', 'Paragraphe'],
          lignes: [
            ['Juste valeur à la date de transition', "Immobilisations corporelles ; immeubles de placement au coût ; actifs au titre de droits d'utilisation ; incorporels remplissant les critères de comptabilisation et de réévaluation d'IAS 38", 'Aucune, sinon la mesure de la juste valeur (IFRS 13)', 'D5, D7'],
            ['Réévaluation selon le référentiel antérieur', 'Mêmes actifs', "Réévaluation globalement comparable à la juste valeur, ou au coût IFRS ajusté d'un indice des prix général ou spécifique", 'D6, D7'],
            ['Juste valeur établie lors d’un événement', "Tout ou partie des actifs et passifs", "Évaluation liée à un événement tel qu'une privatisation ou un premier appel public à l'épargne", 'D8'],
            ['Valeur antérieure des actifs pétroliers et gaziers', 'Actifs comptabilisés par centres de coûts globaux', 'Test de dépréciation à la date de transition', 'D8A'],
            ['Valeur antérieure des actifs à tarifs réglementés', "Immobilisations d'activités soumises à une réglementation des tarifs", 'Test de dépréciation à la date de transition', 'D8B'],
            ['Juste valeur après hyperinflation grave', 'Tous les actifs et passifs détenus à la date de normalisation', "Monnaie fonctionnelle affectée d'une hyperinflation grave avant la date de transition", 'D26-D30'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Le coût présumé peut être choisi élément par élément : l'entité n'est pas tenue de l'appliquer à toute une catégorie d'immobilisations. Cette souplesse permet de le réserver aux actifs dont le coût historique IFRS est impossible ou coûteux à reconstituer, ou dont la valeur comptable antérieure s'est éloignée de toute réalité économique. Elle expose aussi l'entité à une critique de sélectivité : utiliser la juste valeur pour les seuls actifs dont la valeur a augmenté accroît les capitaux propres d'ouverture, mais alourdit les amortissements futurs. L'information exigée par le § 30 (cumul des justes valeurs et des ajustements, poste par poste) permet aux utilisateurs d'apprécier ces choix.",
      },
      {
        type: 'filet',
        titre: "Analyse — La réévaluation légale congolaise peut-elle servir de coût présumé ?",
        texte: "Jusqu'au 31 décembre 2025, l'Ordonnance-loi n° 89-017 du 18 février 1989 rendait la réévaluation de l'actif immobilisé obligatoire pour les entreprises autres que celles au régime forfaitaire (art. 2), selon des coefficients fixés par année d'acquisition et actualisés par arrêté du Ministre des Finances (art. 7 et 22), et interdisait la réévaluation libre (art. 19). Pour les bilans clos au 31 décembre 2022, l'arrêté ministériel n° 004 du 13 février 2022 fixait par exemple un coefficient de 12,05 pour les biens acquis en 2003. Ce texte a été abrogé par l'article 152 de la loi n° 23/053 du 30 novembre 2023, entrée en vigueur au 1er janvier 2026. Désormais, « La réévaluation de l'actif immobilisé des entreprises est libre. Elle s'effectue conformément aux articles 62 à 65 de l'Acte uniforme révisé du 26 janvier 2017 relatif au droit comptable et à l'information financière » ; elle peut aussi être légale lorsque la situation économique le justifie, un arrêté fixant alors les coefficients (art. 129). Pour un nouvel adoptant dont la date de transition est antérieure ou proche de 2026, la question est donc de savoir si une réévaluation légale pratiquée sous l'ancien régime satisfait à la condition du § D6 : être « globalement comparable » à la juste valeur, ou au coût IFRS « ajusté, par exemple, en fonction des variations d'un indice des prix général ou spécifique ». Trois éléments doivent être examinés. D'abord, les coefficients mesuraient l'érosion du pouvoir d'achat du franc congolais : pour une entité dont la monnaie fonctionnelle IFRS est le franc congolais, ils peuvent approcher un coût indexé ; pour une entité dont la monnaie fonctionnelle est le dollar, ils ne correspondent à aucun indice pertinent, car le coût historique IFRS doit être exprimé en dollars. Ensuite, l'ordonnance-loi imposait de retenir les coefficients « tels quels, sans majoration ni réduction » (art. 8), sans plafonnement à la valeur actuelle, alors que le SYSCOHADA retient, en réévaluation légale, la plus faible de la valeur indiciaire et de la valeur actuelle (Titre VIII, ch. 28, § 3.1.1). Enfin, c'est à la date de la réévaluation, antérieure ou égale à la date de transition, que le coût présumé est fixé (D6). La réponse dépend donc des faits ; à défaut de comparabilité démontrée, l'entité recourt à la juste valeur (D5) ou reconstitue le coût historique. Une réévaluation libre pratiquée depuis 2026 selon les articles 62 à 65 de l'AUDCIF, fondée sur des valeurs actuelles, se prête plus aisément à l'application du § D6.",
      },
      { type: 'intertitre', texte: "7.5.3 Les autres exemptions utiles aux entreprises de l'espace OHADA" },
      {
        type: 'carte',
        titre: "Tableau 7.6 — Autres exemptions de l'annexe D",
        tableau: {
          entetes: ['Exemption', 'Contenu', 'Intérêt pratique', 'Paragraphe'],
          lignes: [
            ['Contrats de location', "Obligation locative évaluée à la valeur actualisée des loyers restants au taux marginal de la date de transition ; droit d'utilisation égal à l'obligation ajustée, ou reconstitué ; simplifications contrat par contrat", "Le SYSCOHADA révisé n'a pas retraité les contrats en cours à sa date d'application (ch. 41, § 2.8)", 'D9, D9B-D9E'],
            ['Écarts de conversion cumulés', "Réputés nuls pour tous les établissements à l'étranger", 'Historique souvent impossible à reconstituer', 'D12-D13A'],
            ['Participations dans les états individuels', "Coût selon IAS 27, ou coût présumé : juste valeur ou valeur comptable antérieure, participation par participation", 'Évite de reconstituer le coût IFRS de participations anciennes', 'D14-D15A'],
            ['Filiales, entreprises associées et coentreprises', "Valeurs des consolidés de la mère (D16) ; reprise obligatoire des valeurs de la filiale par la mère adoptant après elle (D17)", 'Filiales de groupes étrangers', 'D16-D17'],
            ['Instruments financiers composés', "Pas de distinction des deux parts de capitaux propres si la composante passif est éteinte", 'Obligations convertibles remboursées', 'D18'],
            ['Démantèlement', "Passif évalué selon IAS 37 à la date de transition, puis actualisé à la date d'origine pour estimer la composante de coût, amortie jusqu'à la date de transition", 'Sites miniers, industriels et pétroliers', 'D21-D21A'],
            ["Coûts d'emprunt", "Application d'IAS 23 à compter de la date de transition ou d'une date antérieure, sans retraiter les coûts incorporés antérieurement", 'Grands projets de construction', 'D23'],
            ['Hyperinflation grave', "Juste valeur comme coût présumé des actifs et passifs détenus à la date de normalisation de la monnaie", 'Entités dont la monnaie a connu une hyperinflation grave', 'D26-D30'],
            ["Frais de découverture d'une mine à ciel ouvert", "Dispositions transitoires d'IFRIC 20", 'Secteur minier', 'D32'],
            ['Produits des activités ordinaires', "Mesures de simplification d'IFRS 15 ; pas de retraitement des contrats achevés avant la première période présentée", 'Contrats pluri-exercices anciens', 'D34-D35'],
          ],
        },
      },
      {
        type: 'carte',
        titre: "Exemple 7.7 — Passif de démantèlement d'un site d'exploitation (D21)",
        texte: "Une société d'exploitation de carrière a mis en service une installation de concassage le 1er janvier 2015, pour une durée d'utilité de vingt ans. Elle devra démanteler l'installation et remettre le site en état en fin d'exploitation. Selon le référentiel antérieur, elle a constitué progressivement une provision, de 200 000 au 1er janvier 2025. À cette date de transition, le passif évalué selon IAS 37 s'élève à 500 000. Le meilleur taux historique d'actualisation est estimé à 8 %.",
        tableau: {
          entetes: ['Étape (D21)', 'Calcul', 'Montant'],
          lignes: [
            ['(a) Passif selon IAS 37 à la date de transition', '', '500 000'],
            ["(b) Composante de coût estimée au 1er janvier 2015", '500 000 / 1,08¹⁰ = 500 000 / 2,1589', '231 597'],
            ['(c) Amortissement cumulé au 1er janvier 2025', '231 597 × 10 / 20', '115 799'],
            ['Valeur nette de la composante de démantèlement', '231 597 − 115 799', '115 798'],
            ['Ajustement des capitaux propres avant impôt', '115 798 − (500 000 − 200 000)', '**−184 202**'],
          ],
        },
        note: "Sans l'exemption, l'entité devrait reconstituer chaque révision de l'estimation depuis 2015, l'ajouter au coût de l'actif et l'amortir prospectivement, conformément à IFRIC 1. L'exemption remplace cette reconstitution par un calcul unique. L'impôt différé sur la composante d'actif et sur le passif doit être comptabilisé malgré l'exemption d'IAS 12 relative à la comptabilisation initiale (B14(b)).",
      },
      {
        type: 'paragraphe',
        texte: "L'exemption relative aux écarts de conversion cumulés est d'une application simple mais d'une portée durable. Supposons qu'un groupe congolais détienne une filiale zambienne dont l'écart de conversion cumulé, s'il pouvait être reconstitué, serait une perte de 80 000 à la date de transition. S'il applique l'exemption, cet écart est réputé nul (D13(a)) ; si la filiale est cédée plus tard alors que les écarts nés depuis la transition représentent une perte de 15 000, le résultat de cession n'inclura que cette perte de 15 000, au lieu de 95 000 (D13(b)). Le choix vaut pour tous les établissements à l'étranger.",
      },
      {
        type: 'filet',
        titre: "Observation — L'exemption relative aux avantages du personnel",
        texte: "Le support d'origine du module range les avantages du personnel parmi les exemptions facultatives. Cette exemption, qui permettait de comptabiliser en capitaux propres les écarts actuariels cumulés à la date de transition, a été supprimée : « La publication d'IAS 19 Avantages du personnel (modifiée en juin 2011) a donné lieu à la modification du paragraphe D1 et à la suppression des paragraphes D10 et D11 » (IFRS 1.39L). La liste du § D1 porte d'ailleurs la mention « [supprimé] » au point (e). Le nouvel adoptant évalue donc ses engagements sociaux selon IAS 19 dans son bilan d'ouverture, sans exemption, ce que la suppression du corridor par IAS 19 rend d'ailleurs sans objet.",
      },
    ],
  },
  {
    numero: '7.6',
    titre: "IFRS 1 : présentation, rapprochements et informations à fournir",
    navLabel: 'IFRS 1 : informations',
    blocs: [
      {
        type: 'paragraphe',
        texte: "IFRS 1 ne prévoit aucune exemption aux dispositions des autres normes relatives à la présentation et aux informations à fournir (§ 20). La raison en est que l'information est précisément le moyen par lequel la norme compense les dérogations qu'elle admet en matière d'évaluation : l'utilisateur doit pouvoir comprendre ce qui a changé et pourquoi. Les premiers états IFRS comprennent au moins trois états de la situation financière et deux exemplaires de chacun des autres états, avec les notes (§ 21). Les résumés historiques ou informations comparatives présentés selon le référentiel antérieur doivent être clairement signalés comme non conformes aux IFRS, avec la nature des principaux ajustements, sans obligation de les quantifier (§ 22).",
      },
      { type: 'intertitre', texte: "7.6.1 Les rapprochements" },
      {
        type: 'paragraphe',
        texte: "L'entité explique l'incidence de la transition sur sa situation financière, sa performance et ses flux de trésorerie (§ 23). Elle présente à cet effet des rapprochements des capitaux propres à la date de transition et à la clôture du dernier exercice publié selon le référentiel antérieur, ainsi qu'un rapprochement du résultat global total de ce dernier exercice ; le point de départ de ce dernier rapprochement est le résultat global selon le référentiel antérieur ou, à défaut, le résultat net (§ 24(a)-(b)). Pour une entité SYSCOHADA, qui ne présente pas d'état du résultat global, le point de départ est donc le résultat net. Les rapprochements doivent être suffisamment détaillés pour faire comprendre chaque ajustement significatif ; s'il existait un tableau des flux de trésorerie selon le référentiel antérieur, les ajustements significatifs de ce tableau sont expliqués (§ 25). Les corrections d'erreurs du référentiel antérieur sont distinguées des changements de méthodes (§ 26).",
      },
      {
        type: 'carte',
        titre: "Exemple 7.8 — Rapprochements de NGUVU LOGISTIQUE SA (suite de l'exemple 7.4)",
        texte: "Hypothèses pour 2025 : résultat net SYSCOHADA 120 000 ; aucun dividende ; quote-part de subvention virée au résultat 10 000, identique en SYSCOHADA et en IFRS ; pertes de crédit attendues 22 000 au 31 décembre 2025 contre une dépréciation SYSCOHADA de 12 000 ; indemnités de fin de carrière 34 000 selon IAS 19 contre 28 000 en SYSCOHADA, l'écart d'évaluation de l'exercice comprenant une perte actuarielle de 1 000 portée en autres éléments du résultat global ; le gain de change latent de 3 000 s'est réalisé en 2025.",
        tableau: {
          entetes: ['Rapprochement', 'Montant'],
          lignes: [
            ['**Résultat net SYSCOHADA 2025**', '**120 000**'],
            ['Supplément d\'amortissement des camions (17 500 − 12 500)', '−5 000'],
            ['Pertes de crédit attendues : variation de l\'écart (10 000 − 8 000)', '−2 000'],
            ['Gain de change déjà inclus dans les capitaux propres d\'ouverture IFRS', '−3 000'],
            ['Impôt différé sur ces ajustements (10 000 × 30 %)', '+3 000'],
            ['**Résultat net IFRS 2025**', '**113 000**'],
            ['Perte actuarielle en autres éléments du résultat global, nette d\'impôt (1 000 − 300)', '−700'],
            ['**Résultat global total IFRS 2025 (§ 24(b))**', '**112 300**'],
            ['**Capitaux propres SYSCOHADA au 31 décembre 2025, subventions comprises (920 000 + 50 000)**', '**970 000**'],
            ['Camions : 40 000 − 5 000, net d\'impôt différé (35 000 × 70 %)', '+24 500'],
            ['Subvention reclassée en produits différés', '−50 000'],
            ['Pertes de crédit attendues : 10 000 × 70 %', '−7 000'],
            ['Indemnités de fin de carrière : 6 000 × 70 %', '−4 200'],
            ['**Capitaux propres IFRS au 31 décembre 2025 (§ 24(a)(ii))**', '**933 300**'],
          ],
        },
        note: "Contrôle : capitaux propres IFRS d'ouverture 821 000 + résultat global 112 300 = 933 300. L'écart d'évaluation des indemnités de fin de carrière passe de 5 000 à 6 000 ; l'augmentation de 1 000 correspond à la perte actuarielle, portée en autres éléments du résultat global et non en résultat net. Le gain de change de 3 000, comptabilisé en résultat SYSCOHADA lors de sa réalisation, a déjà été intégré aux capitaux propres d'ouverture IFRS : il est éliminé du résultat IFRS pour ne pas être compté deux fois.",
      },
      { type: 'intertitre', texte: "7.6.2 Les autres informations spécifiques" },
      {
        type: 'carte',
        titre: "Tableau 7.7 — Informations spécifiques aux premiers états IFRS",
        tableau: {
          entetes: ['Information', 'Paragraphe'],
          lignes: [
            ["Rapprochements des capitaux propres (date de transition et dernière clôture selon le référentiel antérieur)", '§ 24(a)'],
            ["Rapprochement du résultat global total du dernier exercice selon le référentiel antérieur", '§ 24(b)'],
            ["Informations d'IAS 36 sur les pertes de valeur comptabilisées ou reprises dans le bilan d'ouverture", '§ 24(c)'],
            ["Explication des ajustements significatifs du tableau des flux de trésorerie", '§ 25'],
            ["Distinction entre corrections d'erreurs et changements de méthodes", '§ 26'],
            ["Changements de méthodes ou d'exemptions entre le premier rapport intermédiaire IFRS et les premiers états annuels", '§ 27A'],
            ["Absence d'états financiers pour les périodes précédentes", '§ 28'],
            ["Actifs et passifs financiers désignés à la juste valeur par le biais du résultat net à la date de transition", '§ 29-29A'],
            ["Juste valeur utilisée comme coût présumé : cumul des justes valeurs et des ajustements, par poste", '§ 30'],
            ["Coût présumé des participations dans les états individuels", '§ 31'],
            ["Coût présumé des actifs pétroliers et gaziers, des actifs à tarifs réglementés, ou après hyperinflation grave", '§ 31A-31C'],
            ["Rapprochements dans les rapports intermédiaires de la première période IFRS", '§ 32-33'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "IAS 8 ne s'applique pas aux changements de méthodes liés à la première adoption (§ 27) : la transition est régie en entier par IFRS 1. Si l'entité publie des rapports intermédiaires selon IAS 34 pendant sa première période IFRS, chacun comprend les rapprochements des capitaux propres et du résultat global de la période intermédiaire comparable, et le premier d'entre eux comprend en outre les rapprochements annuels du § 24 (§ 32). Comme IAS 34 suppose que les utilisateurs disposent des derniers états annuels, le nouvel adoptant doit y ajouter les informations significatives que ses derniers états selon le référentiel antérieur ne contenaient pas (§ 33).",
      },
      {
        type: 'filet',
        titre: "Observation — La conduite d'un projet de première adoption",
        texte: "Les exigences d'IFRS 1 font de la première adoption un projet d'organisation plutôt qu'un exercice d'écritures. Le choix de la date de transition, arrêté avant l'ouverture de l'exercice comparatif, conditionne la collecte des informations : justes valeurs à la date de transition, données actuarielles, historique des pertes de crédit, bases fiscales, documentation des couvertures. La détermination de la monnaie fonctionnelle précède tous les autres travaux, puisqu'elle commande la reconstitution des valeurs historiques. Le système d'information doit permettre de tenir en parallèle les comptes légaux SYSCOHADA en francs congolais et les états IFRS, éventuellement dans une autre monnaie. La qualité des rapprochements publiés conditionne enfin la confiance des investisseurs dans les premiers états IFRS, et le travail de l'auditeur sur le bilan d'ouverture.",
      },
    ],
  },
  {
    numero: '7.7',
    titre: "La norme IFRS pour les PME : fondements et champ d'application",
    navLabel: 'IFRS PME : champ',
    blocs: [
      {
        type: 'paragraphe',
        texte: "La norme IFRS pour les PME (*IFRS for SMEs Accounting Standard*) est un référentiel autonome publié par l'IASB. Sa troisième édition, publiée en février 2025, s'applique aux exercices ouverts à compter du 1er janvier 2027, avec application anticipée permise. Organisée en 35 sections, elle se suffit à elle-même : elle simplifie les principes de comptabilisation et d'évaluation des IFRS complètes, supprime des options et réduit les informations à fournir. Les passages cités dans cette section et la suivante sont des traductions de travail des modules pédagogiques en anglais de l'IFRS Foundation.",
      },
      { type: 'intertitre', texte: "7.7.1 Le fondement : des utilisateurs aux besoins différents" },
      {
        type: 'paragraphe',
        texte: "L'existence d'un référentiel distinct repose sur un argument relatif aux utilisateurs. Les états financiers d'une entité cotée s'adressent à une multitude d'investisseurs qui ne peuvent exiger d'informations particulières ; ceux d'une entité non cotée s'adressent à un cercle plus restreint de prêteurs, de fournisseurs et d'associés, dont les besoins portent davantage sur la trésorerie, la solvabilité et les engagements à court terme que sur les justes valeurs ou les instruments complexes. Le rapport coût-avantage de l'information n'est donc pas le même. La norme en tire une conséquence méthodologique explicite : plusieurs dispositions sont assorties d'une exemption pour coût ou effort excessif, appréciée selon un seuil plus bas que dans les IFRS complètes.",
      },
      {
        type: 'filet',
        titre: "Texte de référence — IFRS for SMEs (3e éd.), § 2.29 (traduction de travail)",
        texte: "« Une entité engagerait un coût ou un effort excessif pour appliquer une disposition si le coût supplémentaire (par exemple, les honoraires d'évaluateurs) ou l'effort supplémentaire (par exemple, le travail des salariés) excédait substantiellement les avantages que les utilisateurs retireraient de cette information. La présente norme exige habituellement d'une PME qu'elle apprécie le coût ou l'effort excessif selon un seuil plus bas que celui que d'autres normes IFRS imposent aux entités ayant une obligation d'information du public, parce que les PME ne sont pas responsables envers des parties prenantes publiques. »",
      },
      {
        type: 'paragraphe',
        texte: "L'exemption ne se présume pas : elle n'existe que là où une disposition la prévoit et ne s'étend pas aux autres (2.28). Le jugement est porté à la date de la comptabilisation initiale, puis renouvelé à chaque évaluation ultérieure si l'exemption s'y applique (2.30). L'entité qui s'en prévaut indique ce fait et les raisons pour lesquelles l'application de la disposition entraînerait un coût ou un effort excessif (2.31).",
      },
      { type: 'intertitre', texte: "7.7.2 La notion d'obligation d'information du public" },
      {
        type: 'carte',
        titre: "Tableau 7.8 — Champ d'application d'IFRS pour les PME (section 1, traduction de travail)",
        tableau: {
          entetes: ['Paragraphe', 'Contenu'],
          lignes: [
            ['1.2', "Les PME sont les entités qui (a) n'ont pas d'obligation d'information du public et (b) publient des états financiers à usage général pour des utilisateurs externes, tels qu'investisseurs, prêteurs, autres créanciers et agences de notation"],
            ['1.3(a)', "Obligation d'information du public si les instruments de dette ou de capitaux propres de l'entité sont négociés sur un marché public, ou en cours d'émission en vue d'une telle négociation, y compris sur des marchés locaux ou régionaux"],
            ['1.3(b)', "Obligation d'information du public si l'entité détient des actifs à titre fiduciaire pour un large groupe de tiers dans le cadre de l'une de ses activités principales"],
            ['1.4', "La détention d'actifs de tiers accessoire à une activité principale (agents de voyages ou immobiliers, écoles, coopératives exigeant un dépôt nominal, fournisseurs encaissant des paiements avant livraison) ne crée pas d'obligation d'information du public"],
            ['1.5', "Une entité ayant une obligation d'information du public ne peut déclarer ses états conformes à la norme, même si la loi l'y autorise"],
            ['1.6-1.7', "Une filiale ou une mère sans obligation d'information du public peut appliquer la norme dans ses propres états, même si le groupe publie en IFRS complètes"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "La norme ne retient aucun critère quantitatif. Une entreprise de grande taille dont les titres ne sont pas négociés et qui ne détient pas d'actifs pour le compte de tiers entre dans son champ ; une petite entité dont les obligations sont négociées sur un marché régional en est exclue. Le choix d'un critère qualitatif tient au fondement de la norme : ce qui justifie des simplifications n'est pas la taille, mais l'absence d'utilisateurs publics qui dépendent des états financiers sans pouvoir exiger d'autres informations. Le module de la section 1 ajoute une raison pratique : il n'est pas possible d'élaborer des seuils chiffrés applicables et durables dans toutes les juridictions (Base des conclusions, BC1.6(c)). La décision d'imposer ou de permettre l'usage de la norme appartient aux autorités législatives et réglementaires de chaque juridiction (Préface, P13), qui peuvent fixer leurs propres seuils ; une entité visée par de tels seuils doit néanmoins vérifier qu'elle répond à la définition de la section 1 avant de se déclarer conforme. L'IASB a précisé dans la troisième édition que les catégories d'entités citées au § 1.3(b) sont des exemples d'entités remplissant souvent ce critère, dans le but de clarifier et non d'assouplir la définition.",
      },
      {
        type: 'filet',
        titre: "Observation — La place d'IFRS pour les PME dans l'espace OHADA",
        texte: "L'AUDCIF ne mentionne pas la norme IFRS pour les PME. Pour les entités qui y sont soumises, les comptes légaux restent établis selon le SYSCOHADA révisé, et les entités cotées ou faisant appel public à l'épargne, qui ont par définition une obligation d'information du public, doivent produire en sus des états selon les IFRS complètes (art. 8). IFRS pour les PME ne peut donc intervenir qu'à titre volontaire, pour des états complémentaires destinés à des partenaires financiers ou à un groupe. Cette utilisation peut être pertinente pour une entreprise non cotée financée par des bailleurs ou investisseurs internationaux, à condition que les états publiés respectent l'ensemble de la norme pour pouvoir s'en réclamer. Le module de la section 1 précise enfin qu'un référentiel national « substantiellement » identique à la norme ne permet pas de s'en réclamer ; seul un texte identique mot pour mot, au nom près, ou la norme elle-même le permet (paragraphes 1.5 et 3.3).",
      },
    ],
  },
  {
    numero: '7.8',
    titre: "La norme IFRS pour les PME : différences avec les IFRS complètes et transition",
    navLabel: 'IFRS PME : différences',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les simplifications de la norme procèdent de trois techniques : la suppression de certaines options ou de sujets jugés peu pertinents pour les PME, la simplification des principes de comptabilisation et d'évaluation, et l'allègement des informations à fournir. Elles ne sont pas uniformes : certaines sections reprennent en substance la norme complète dans un langage plus simple (provisions, section 21), d'autres s'en écartent nettement (instruments financiers, goodwill, incorporels, coûts d'emprunt).",
      },
      { type: 'intertitre', texte: "7.8.1 Les principales différences" },
      {
        type: 'carte',
        titre: "Tableau 7.9 — Principales différences entre IFRS pour les PME (3e éd.) et IFRS complètes",
        tableau: {
          entetes: ['Sujet', 'IFRS pour les PME', 'IFRS complètes'],
          lignes: [
            ['Instruments financiers : classement', "Instruments de base ou plus complexes selon leurs conditions contractuelles, sans critère de modèle économique (section 11)", "Modèle économique et caractéristiques des flux (IFRS 9)"],
            ['Instruments financiers : dépréciation', "Pertes subies : dépréciation en présence d'une indication objective (11.21-11.26)", 'Pertes de crédit attendues (IFRS 9, section 5.5)'],
            ['Goodwill', "Amorti sur sa durée d'utilité, au plus dix ans si elle ne peut être estimée de façon fiable (19.34) ; test de dépréciation selon la section 27", 'Non amorti ; test annuel (IAS 36.10)'],
            ['Immobilisations incorporelles', "Durée d'utilité toujours déterminée, au plus dix ans si elle ne peut être estimée de façon fiable (18.19-18.20) ; dépenses de recherche et de développement en charges (18.14)", 'Durée déterminée ou indéterminée ; activation des frais de développement remplissant les critères (IAS 38)'],
            ["Coûts d'emprunt", "Charges de la période", 'Incorporation aux actifs qualifiés (IAS 23)'],
            ['Immobilisations corporelles', "Modèle du coût ou de la réévaluation ; révision de la durée, de la valeur résiduelle et du mode d'amortissement seulement en présence d'une indication de changement significatif", 'Modèle du coût ou de la réévaluation ; révision annuelle (IAS 16)'],
            ['Actifs destinés à être cédés', "Pas d'équivalent d'IFRS 5 : l'amortissement continue", "Arrêt de l'amortissement des actifs détenus en vue de la vente (IFRS 5)"],
            ['Avantages du personnel', "Unités de crédit projetées, ou méthode simplifiée si coût ou effort excessif ; écarts actuariels en résultat ou en autres éléments du résultat global, sur option", "Unités de crédit projetées ; réévaluations en autres éléments du résultat global (IAS 19.120)"],
            ['Écarts de conversion', "Pas de reclassement en résultat lors de la cession d'un établissement à l'étranger (section 30)", 'Reclassement en résultat (IAS 21)'],
            ['Impôt sur le résultat', "Approche par les différences temporaires, alignée sur IAS 12 (section 29)", 'IAS 12'],
            ['Produits', "Modèle en cinq étapes fondé sur IFRS 15 (section 23)", 'IFRS 15'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Certaines affirmations courantes, reprises par le support d'origine, doivent être nuancées. La réévaluation des immobilisations corporelles n'est pas interdite : la section 17 offre le choix entre modèle du coût et modèle de la réévaluation. L'absence de corridor n'est pas une spécificité des PME : IAS 19 impose elle-même la comptabilisation immédiate des réévaluations (§ 120(c)), la différence portant sur la faculté, offerte aux PME, de les comptabiliser en résultat. La section 29 n'est pas un calcul simplifié des impôts différés : elle repose sur les différences temporaires. Enfin, le choix du modèle des pertes subies pour la dépréciation des actifs financiers est une différence de fond, non de présentation : il retarde la comptabilisation des pertes jusqu'à l'apparition d'une indication objective.",
      },
      {
        type: 'carte',
        titre: "Exemple 7.9 — Incidence chiffrée de trois différences sur le résultat",
        texte: "Une entreprise acquiert le 1er janvier 2027 une société concurrente, dégageant un goodwill de 600 000 dont la durée d'utilité ne peut être estimée de façon fiable. Au cours de l'exercice, elle engage 200 000 de dépenses de développement d'un logiciel de gestion de flotte, qui remplissent les critères d'activation d'IAS 38, et supporte 50 000 d'intérêts sur un emprunt affecté à la construction d'un entrepôt, actif qualifié encore en construction à la clôture. Aucune perte de valeur n'est constatée ; l'amortissement du logiciel ne commence qu'en 2028.",
        tableau: {
          entetes: ['Élément', 'IFRS pour les PME : charge 2027', 'IFRS complètes : charge 2027'],
          lignes: [
            ['Goodwill', '60 000 (600 000 / 10 ans, 19.34)', '0 (test annuel, IAS 36)'],
            ['Développement', '200 000 (18.14)', '0 (actif incorporel, IAS 38)'],
            ["Intérêts d'emprunt", '50 000', "0 (incorporés au coût de l'entrepôt, IAS 23)"],
            ['**Total des charges**', '**310 000**', '**0**'],
          ],
        },
        note: "L'écart de 310 000 est un écart de rythme, non de montant total : en IFRS complètes, le logiciel et les intérêts incorporés seront amortis ultérieurement, et le goodwill pourra faire l'objet de pertes de valeur. Il montre néanmoins qu'un même ensemble de transactions peut produire des résultats sensiblement différents selon le référentiel ; la comparaison d'entités appliquant l'un et l'autre exige donc des retraitements.",
      },
      { type: 'intertitre', texte: "7.8.2 La transition vers IFRS pour les PME" },
      {
        type: 'paragraphe',
        texte: "La section 35 transpose aux PME la logique d'IFRS 1, quel que soit le référentiel antérieur, qu'il s'agisse d'un référentiel national, des IFRS complètes ou de règles fiscales (35.1). À la date de transition, soit le début de la première période présentée, l'entité comptabilise tous les actifs et passifs requis, décomptabilise ceux que la norme n'admet pas, reclasse les éléments mal classés et applique la norme à l'évaluation de tous les éléments (35.7) ; les ajustements sont portés en résultats non distribués (35.8). Elle ne modifie pas rétrospectivement le traitement de sept catégories de transactions (35.9) et peut recourir aux exemptions facultatives de 35.10. Les différences avec IFRS 1 révèlent la logique propre de la norme.",
      },
      {
        type: 'carte',
        titre: "Tableau 7.10 — IFRS 1 et section 35 : comparaison",
        tableau: {
          entetes: ['Point', 'IFRS 1', 'Section 35 (3e éd., traduction de travail)'],
          lignes: [
            ["Bilan d'ouverture", "Présenté : trois états de la situation financière (§ 21)", "Établi, mais sa présentation n'est pas exigée selon le module pédagogique"],
            ['Exceptions obligatoires', "Estimations ; annexe B (neuf catégories)", "Sept catégories : décomptabilisation, couverture, estimations, activités abandonnées, participations ne donnant pas le contrôle, prêts publics, contrats achevés (35.9)"],
            ['Réévaluation comme coût présumé', "Condition de comparabilité avec la juste valeur ou un coût indexé (D6)", "Le texte de 35.10(d) ne reprend pas cette condition"],
            ['Impôt différé', 'Application rétrospective d\'IAS 12', "Application prospective possible de la section 29 à compter de la date de transition (35.10(h))"],
            ['Impraticabilité', 'Pas de dispense générale', "Ajustements différés à la première période où ils sont praticables, avec indication des montants non retraités (35.11)"],
            ['Rapprochements', 'Capitaux propres à deux dates ; résultat global total', "Capitaux propres à deux dates ; résultat net ; description de chaque changement de méthode (35.13)"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "L'exemption de 35.10(h) intéresse particulièrement les entreprises de l'espace OHADA. Leurs comptes individuels SYSCOHADA ne comportent pas d'impôt différé ; reconstituer les différences temporaires de toutes les périodes antérieures serait coûteux. La section 35 permet d'appliquer la section 29 à compter de la date de transition seulement, ce qui réduit sensiblement le coût de la première application.",
      },
      {
        type: 'carte',
        titre: "Exemple 7.10 — Choix d'un référentiel pour une entreprise congolaise non cotée",
        texte: "Une entreprise agroalimentaire de Lubumbashi, non cotée, sans dépôts de tiers, en croissance, négocie un financement auprès d'un fonds d'investissement étranger qui demande des états financiers « conformes à un référentiel international ».",
        tableau: {
          entetes: ['Option', 'Analyse'],
          lignes: [
            ['Comptes SYSCOHADA seuls', "Obligatoires dans tous les cas ; parfois jugés insuffisants par l'investisseur étranger faute de comparabilité internationale"],
            ['États complémentaires IFRS pour les PME', "Admis : l'entité n'a pas d'obligation d'information du public (1.2-1.3) ; coût réduit, notamment par l'application prospective de la section 29 (35.10(h)) ; comparabilité internationale"],
            ['États complémentaires IFRS complètes', "Admis ; plus coûteux ; nécessaires si l'entité envisage un appel public à l'épargne (AUDCIF, art. 8) ou si le groupe de l'investisseur publie en IFRS complètes et entend consolider l'entreprise"],
          ],
        },
        note: "IFRS pour les PME constitue ici une solution intermédiaire rationnelle, comme le souligne le support d'origine. Le choix doit cependant anticiper l'évolution de l'entreprise : une introduction en bourse ou une émission d'obligations sur un marché public imposerait le passage aux IFRS complètes et une nouvelle transition selon IFRS 1, dans laquelle les états IFRS pour les PME constitueraient le référentiel antérieur.",
      },
    ],
  },
  {
    numero: '7.9',
    titre: "Synthèse : logique des IFRS et choix du référentiel",
    navLabel: 'Synthèse',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les chapitres 1 à 7 permettent de dégager les caractéristiques communes aux normes étudiées. La substance prime sur la forme juridique : un affacturage avec recours reste une créance, une consignation n'est pas une vente, un droit de retour réduit le chiffre d'affaires. L'évaluation privilégie l'information prospective : valeur recouvrable fondée sur des flux futurs, pertes de crédit attendues, valeurs actualisées des engagements sociaux. L'information comptable est distincte de la fiscalité, dont l'effet est isolé par l'impôt différé. L'étendue des informations en annexe compense la part de jugement que comportent ces évaluations. IFRS 1 applique ces principes à la transition elle-même : elle privilégie la comparabilité, ne s'en écarte que pour des raisons de fiabilité ou de coût énumérées limitativement, et compense chaque écart par une information.",
      },
      { type: 'intertitre', texte: "7.9.1 Les critères du choix" },
      {
        type: 'carte',
        titre: "Tableau 7.11 — Critères du choix d'un référentiel complémentaire",
        tableau: {
          entetes: ['Critère', 'Orientation'],
          lignes: [
            ['Obligation légale', "Entité cotée ou faisant appel public à l'épargne : IFRS complètes en sus du SYSCOHADA, pour les comptes individuels et consolidés (AUDCIF, art. 8 et 75)"],
            ['Destinataires des états', "Bailleurs, investisseurs, groupe étranger : référentiel attendu par ces utilisateurs ; consolidation par un groupe publiant en IFRS complètes"],
            ['Taille et complexité', "Groupes complexes, instruments financiers élaborés, regroupements fréquents : IFRS complètes ; entreprise non cotée de structure simple : IFRS pour les PME"],
            ['Monnaie', "Monnaie fonctionnelle différente de la monnaie légale : coût de reconstitution des valeurs historiques ; intérêt des exemptions de coût présumé"],
            ['Perspectives', "Projet d'introduction en bourse ou d'émission obligataire : préparer directement la transition aux IFRS complètes"],
            ['Coût', "Collecte de données actuarielles, de justes valeurs et de données sur les pertes de crédit ; formation ; système d'information permettant la tenue parallèle"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Ces critères ne s'additionnent pas mécaniquement. L'obligation légale prime : aucune considération de coût ne dispense une entité faisant appel public à l'épargne des IFRS complètes. En l'absence d'obligation, le choix relève d'un arbitrage entre le coût de production de l'information et l'avantage que les destinataires en retirent, soit exactement le raisonnement que l'IASB applique dans ses propres normes. L'expert-comptable qui conseille une entreprise congolaise sur ce choix doit donc partir des destinataires de l'information et de leurs décisions, avant de considérer la technique comptable.",
      },
      { type: 'intertitre', texte: "7.9.2 Les conditions d'une information IFRS fiable dans le contexte congolais" },
      {
        type: 'paragraphe',
        texte: "L'adoption d'un référentiel ne garantit pas, à elle seule, la qualité de l'information produite. Plusieurs dispositions étudiées dans ce module supposent des données de marché : la juste valeur utilisée comme coût présumé, les taux d'actualisation des engagements sociaux et des provisions, les pertes de crédit attendues fondées sur des informations prospectives. Là où les marchés sont étroits, comme c'est souvent le cas pour l'immobilier industriel, les équipements spécialisés ou les titres non cotés, ces évaluations reposent sur des données non observables et sur des hypothèses de la direction. IFRS 13 ne les interdit pas, mais exige alors une information détaillée sur les techniques et les données utilisées (chapitre 1). La crédibilité des premiers états IFRS dépend donc autant de la documentation des jugements que des montants eux-mêmes.",
      },
      {
        type: 'paragraphe',
        texte: "Trois conditions pratiques en découlent. La première est la compétence : les évaluations actuarielles, les tests de dépréciation et les évaluations de juste valeur requièrent des spécialistes, internes ou externes, dont les travaux doivent pouvoir être examinés par l'auditeur. La deuxième est la cohérence entre les deux jeux de comptes : chaque écart entre les comptes légaux et les états IFRS doit pouvoir être expliqué par un retraitement identifié, ce qui suppose un système d'information conçu pour la tenue parallèle. La troisième est la stabilité des choix : les exemptions d'IFRS 1 et les options des normes, une fois exercées, engagent les exercices suivants, et leur remise en cause ultérieure relève d'IAS 8. Réunir ces conditions a un coût, qui entre dans l'arbitrage décrit ci-dessus et explique que, hors obligation légale, les états IFRS restent l'apanage des entreprises exposées à des utilisateurs internationaux.",
      },
      {
        type: 'filet',
        titre: "Synthèse du chapitre",
        texte: "IFRS 1 organise une transition contrôlée : application rétrospective des IFRS en vigueur à la fin de la première période, ajustements imputés sur les capitaux propres d'ouverture avec leurs effets d'impôt différé, exceptions obligatoires là où la rétrospection supposerait des jugements a posteriori, exemptions facultatives là où elle serait trop coûteuse, rapprochements détaillés pour expliquer la transition. Le SYSCOHADA révisé a repris cette architecture pour sa propre première application, en la subordonnant à la protection des capitaux propres. IFRS pour les PME offre aux entités sans obligation d'information du public un référentiel international autonome et proportionné, dont la section 35 allège encore la transition. Dans l'espace OHADA, l'un et l'autre s'ajoutent aux comptes légaux établis selon le SYSCOHADA révisé, qui demeurent la base du bénéfice distribuable. La valeur ajoutée des IFRS réside dans la qualité du jugement professionnel qu'elles exigent et dans la transparence de l'information sur ce jugement.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ue13c7-cp1',
    titre: "Qualification d'un nouvel adoptant et calendrier de transition",
    contexte: "Quatre sociétés congolaises s'interrogent sur l'application d'IFRS 1. (A) Une brasserie a toujours publié selon le SYSCOHADA, mais a fourni chaque année à sa société mère belge une liasse de consolidation établie selon les IFRS ; elle décide de publier des états IFRS complets pour l'exercice clos le 31 décembre 2026. (B) Une société minière publie depuis 2020 des états IFRS contenant une déclaration explicite et sans réserve de conformité ; son auditeur a émis une opinion avec réserve sur les états 2025. (C) Une société de distribution a publié en 2025 des états SYSCOHADA accompagnés d'un rapprochement du résultat avec les IFRS. (D) Une société qui avait publié en IFRS jusqu'en 2021, puis selon le seul SYSCOHADA de 2022 à 2025, reprend la publication d'états IFRS en 2026.",
    questions: [
      {
        num: 1,
        enonce: "Lesquelles de ces sociétés sont des nouveaux adoptants au sens d'IFRS 1 ?",
        correction: "(A) Oui : la liasse de consolidation ne constitue pas un jeu complet d'états IFRS (§ 3(c)). (B) Non : ses états antérieurs contenaient une déclaration de conformité sans réserve ; une réserve de l'auditeur ne modifie pas cette situation (§ 4(c)). (C) Oui : un rapprochement de certains montants avec les IFRS ne vaut pas adoption (§ 3(a)(v)). (D) Elle peut choisir d'appliquer IFRS 1 ou d'appliquer les IFRS rétrospectivement selon IAS 8, comme si elle n'avait jamais cessé de le faire (§ 4A), en expliquant pourquoi elle avait cessé et pourquoi elle reprend l'application des IFRS (§ 23A).",
      },
      {
        num: 2,
        enonce: "Pour la brasserie (A), déterminez la date de transition, les normes applicables et les états à présenter.",
        correction: "Premiers états IFRS au 31 décembre 2026 avec un comparatif : date de transition au **1er janvier 2025** (annexe A). Normes : IFRS en vigueur au 31 décembre 2026, appliquées à toutes les périodes (§ 7-8). États : bilans au 1er janvier 2025, au 31 décembre 2025 et au 31 décembre 2026, deux états du résultat global, deux tableaux des flux, deux états des variations des capitaux propres, notes (§ 21).",
      },
      {
        num: 3,
        enonce: "La brasserie utilisait, pour sa liasse de consolidation, des évaluations IFRS. Peut-elle reprendre ces évaluations dans son bilan d'ouverture ?",
        correction: "Oui, pour autant qu'elles soient conformes aux IFRS en vigueur au 31 décembre 2026 et aux choix d'exemptions retenus. IFRS 1 prévoit d'ailleurs, pour une filiale devenue nouvel adoptant après sa mère, la possibilité d'évaluer ses actifs et passifs aux valeurs comptables retenues dans les états consolidés de la mère (D16). L'estimation des montants à la date de transition doit rester cohérente avec les informations disponibles à cette date (§ 14-16).",
      },
    ],
  },
  {
    id: 'ue13c7-cp2',
    titre: "Bilan d'ouverture IFRS d'une société de transport (KATANGA FRET SA, société fictive)",
    contexte: "KATANGA FRET SA adopte les IFRS avec une date de transition au 1er janvier 2025. Son bilan SYSCOHADA à cette date fait apparaître : capitaux propres hors subventions 1 500 000 USD ; subvention d'investissement (compte 14) 120 000 USD ; flotte de camions à la valeur nette comptable de 900 000 USD, dont la juste valeur est estimée à 1 050 000 USD ; écart de conversion-actif (compte 478) de 15 000 USD, entièrement provisionné ; créances clients 600 000 USD, dépréciées de 20 000 USD en SYSCOHADA, alors que la matrice de pertes attendues conduit à 32 000 USD ; provision pour indemnités de départ calculée par une méthode simplifiée à 40 000 USD, contre 55 000 USD selon la méthode des unités de crédit projetées. On suppose que les bases fiscales correspondent aux valeurs SYSCOHADA, que la subvention n'est pas imposable et que les bénéfices imposables futurs sont probables. Taux d'impôt : 30 %.",
    questions: [
      {
        num: 1,
        enonce: "Classez chaque retraitement selon les quatre opérations du § 10 d'IFRS 1.",
        correction: "Coût présumé des camions : évaluation (§ 10(d)), sur option D5. Subvention : reclassement des capitaux propres vers les produits différés ou en déduction des actifs (§ 10(c)). Écart de conversion-actif : non comptabilisé en IFRS (§ 10(b)) ; la perte latente est intégrée à la valeur de la dette convertie au cours de clôture, et la provision correspondante disparaît. Pertes de crédit attendues et indemnités de départ : évaluation selon IFRS 9 et IAS 19 (§ 10(d)). Impôts différés : comptabilisation (§ 10(a)).",
      },
      {
        num: 2,
        enonce: "Le compte 478 et sa provision appellent-ils un ajustement des capitaux propres ?",
        correction: "Non. En SYSCOHADA, la dette figure déjà au cours de clôture (la différence étant portée au compte 478) et la provision de 15 000 a réduit le résultat. En IFRS, la dette est également au cours de clôture et la perte de 15 000 a affecté les résultats antérieurs. Le retraitement consiste à éliminer le compte 478 et la provision, qui se compensent : l'effet sur les capitaux propres est nul.",
      },
      {
        num: 3,
        enonce: "Établissez le rapprochement des capitaux propres au 1er janvier 2025.",
        correction: "Point de départ, subventions comprises : 1 620 000. Coût présumé : +150 000, impôt différé −45 000 ; net +105 000. Subvention reclassée : −120 000 (pas d'impôt différé, IAS 12.33). Pertes de crédit : −12 000, impôt différé +3 600 ; net −8 400. Indemnités de départ : −15 000, impôt différé +4 500 ; net −10 500. Écart de conversion : 0. Capitaux propres IFRS : 1 620 000 + 105 000 − 120 000 − 8 400 − 10 500 = **1 586 100 USD**. Tous ces ajustements sont imputés en résultats non distribués (§ 11), à l'exception du reclassement de la subvention, qui modifie le classement d'un élément.",
      },
      {
        num: 4,
        enonce: "Quelles informations KATANGA FRET doit-elle publier au titre du coût présumé ?",
        correction: "Pour chaque poste du bilan d'ouverture concerné, le cumul des justes valeurs utilisées comme coût présumé (1 050 000) et le montant cumulé des ajustements des valeurs comptables antérieures (+150 000) (§ 30). Ces informations complètent les rapprochements des § 24 et 25.",
      },
    ],
  },
  {
    id: 'ue13c7-cp3',
    titre: "Exceptions et exemptions : situations particulières d'un nouvel adoptant",
    contexte: "Une société cimentière, nouvel adoptant avec une date de transition au 1er janvier 2025, analyse les situations suivantes. (a) Le 31 décembre 2024, elle avait estimé à 200 000 USD une provision pour litige ; le jugement rendu en mars 2025 la condamne à 260 000 USD. (b) En 2023, elle avait conclu un contrat de change à terme pour couvrir un achat de broyeur, sans documentation de couverture. (c) En 2019, elle avait acquis une carrière par voie d'acquisition d'une société, comptabilisée selon les règles alors applicables. (d) Elle a bénéficié en 2022 d'un prêt d'un fonds public à taux bonifié, comptabilisé à sa valeur nominale. (e) Elle détient une filiale en Zambie, consolidée depuis 2015, dont les écarts de conversion n'ont jamais été suivis.",
    questions: [
      {
        num: 1,
        enonce: "Traitez les situations (a) et (b).",
        correction: "(a) Exception relative aux estimations (§ 14-15) : sauf erreur avérée, le bilan d'ouverture retient 200 000, estimation cohérente avec l'information disponible au 31 décembre 2024 ; l'écart de 60 000 révélé par le jugement de mars 2025 est comptabilisé en résultat de l'exercice 2025. (b) Exception relative à la couverture (B4-B6) : faute de documentation, la relation ne peut être reflétée dans le bilan d'ouverture ni désignée rétrospectivement ; le dérivé est évalué à sa juste valeur selon IFRS 9.",
      },
      {
        num: 2,
        enonce: "Traitez les situations (c) et (d).",
        correction: "(c) Exemption relative aux regroupements d'entreprises (C1) : l'entité peut ne pas retraiter l'acquisition de 2019 selon IFRS 3 ; si elle retraite ce regroupement, elle doit retraiter tous les regroupements postérieurs. (d) Exception relative aux prêts publics (B10) : la valeur comptable antérieure du prêt est maintenue dans le bilan d'ouverture, sans comptabiliser l'avantage de taux comme subvention ; IFRS 9 s'applique ensuite de manière prospective, sauf si l'information nécessaire avait été obtenue lors de la comptabilisation initiale (B11).",
      },
      {
        num: 3,
        enonce: "Traitez la situation (e) et indiquez la conséquence de ce choix lors d'une cession future de la filiale.",
        correction: "Exemption D12-D13 : le montant cumulé des écarts de conversion pour tous les établissements à l'étranger peut être réputé nul au 1er janvier 2025. Lors d'une cession ultérieure de la filiale zambienne, le résultat de cession n'inclura que les écarts nés après la date de transition (D13(b)). Le choix vaut pour tous les établissements à l'étranger, non pour la seule filiale zambienne.",
      },
      {
        num: 4,
        enonce: "La société souhaite également ne pas appliquer IAS 19 rétrospectivement à ses indemnités de départ, en invoquant une exemption relative aux avantages du personnel. Est-ce possible ?",
        correction: "Non. L'exemption qui figurait aux § D10 et D11 a été supprimée lors de la modification d'IAS 19 en juin 2011 (IFRS 1.39L), et IFRS 1 interdit d'appliquer une exemption par analogie (§ 18). Les engagements sont évalués selon IAS 19 dans le bilan d'ouverture, l'ajustement étant imputé en résultats non distribués (§ 11).",
      },
    ],
  },
  {
    id: 'ue13c7-cp4',
    titre: "Éligibilité à la norme IFRS pour les PME",
    contexte: "Un cabinet d'expertise comptable de Kinshasa examine l'éligibilité de cinq clients à la norme IFRS pour les PME, pour des états complémentaires à leurs comptes SYSCOHADA. (1) Une société de télécommunications non cotée, de très grande taille, détenue par un groupe étranger qui publie en IFRS complètes. (2) Une agence immobilière qui encaisse les loyers pour le compte des propriétaires avant de les leur reverser. (3) Une coopérative agricole dont les membres versent une part sociale d'un montant nominal. (4) Une société de transport dont les obligations sont négociées sur un marché financier régional. (5) Une société de gestion de fonds de placement ouverts au public.",
    questions: [
      {
        num: 1,
        enonce: "Analysez l'éligibilité des clients (1), (2) et (3).",
        correction: "(1) Éligible : aucune négociation de titres sur un marché public ni détention d'actifs pour des tiers ; la taille n'est pas un critère (1.2-1.3), et l'appartenance à un groupe publiant en IFRS complètes n'y fait pas obstacle (1.6). (2) Éligible : la détention de fonds de tiers est accessoire à l'activité principale d'agence immobilière (1.4). (3) Éligible : les coopératives exigeant un dépôt nominal de leurs membres sont expressément citées au § 1.4.",
      },
      {
        num: 2,
        enonce: "Analysez l'éligibilité des clients (4) et (5).",
        correction: "(4) Non éligible : ses instruments de dette sont négociés sur un marché public, y compris régional (1.3(a)). Si elle sollicite ce financement par appel public à l'épargne dans l'espace OHADA, elle doit en outre établir des états selon les IFRS complètes (AUDCIF, art. 8). (5) Non éligible : la détention d'actifs à titre fiduciaire pour un large groupe de tiers constitue son activité principale (1.3(b)).",
      },
      {
        num: 3,
        enonce: "Le client (4) souhaite néanmoins présenter des états « établis selon IFRS pour les PME », au motif qu'une réglementation locale l'y autoriserait. Que lui répondre ?",
        correction: "Même si une loi ou une réglementation l'autorisait, une entité ayant une obligation d'information du public ne peut pas décrire ses états comme conformes à la norme IFRS pour les PME (1.5). Elle doit appliquer les IFRS complètes pour pouvoir se réclamer d'un référentiel de l'IASB.",
      },
    ],
  },
  {
    id: 'ue13c7-cp5',
    titre: "Rapprochements de première adoption (KIVU AGRO SA, société fictive)",
    contexte: "KIVU AGRO SA publie ses premiers états IFRS au 31 décembre 2026, avec une date de transition au 1er janvier 2025. Ses capitaux propres SYSCOHADA au 1er janvier 2025 s'élèvent à 2 000 000 ; elle n'a pas de subvention d'investissement. Deux retraitements sont identifiés à cette date : (1) un bâtiment industriel, de valeur nette comptable 900 000 et de durée d'utilité résiduelle quinze ans, a une juste valeur de 1 200 000 que l'entité choisit d'utiliser comme coût présumé ; (2) les créances clients, dépréciées de 30 000 en SYSCOHADA, appellent une correction de valeur pour pertes attendues de 50 000. En 2025, le résultat net SYSCOHADA est de 250 000 et aucun dividende n'est distribué ; au 31 décembre 2025, la dépréciation SYSCOHADA des créances est de 35 000 et la correction de valeur IFRS de 45 000. Les bases fiscales correspondent aux valeurs SYSCOHADA ; taux d'impôt 30 % ; les actifs d'impôt différé sont recouvrables.",
    questions: [
      {
        num: 1,
        enonce: "Établissez le rapprochement des capitaux propres au 1er janvier 2025 (IFRS 1.24(a)(i)).",
        correction: "Capitaux propres SYSCOHADA : 2 000 000. Bâtiment : +300 000, passif d'impôt différé −90 000, net **+210 000**. Pertes de crédit attendues : −20 000, actif d'impôt différé +6 000, net **−14 000**. Capitaux propres IFRS au 1er janvier 2025 : 2 000 000 + 210 000 − 14 000 = **2 196 000**. Les ajustements sont imputés en résultats non distribués (§ 11).",
      },
      {
        num: 2,
        enonce: "Établissez le rapprochement du résultat de l'exercice 2025 (IFRS 1.24(b)).",
        correction: "Résultat net SYSCOHADA : 250 000. Supplément d'amortissement du bâtiment : 300 000 / 15 = −20 000. Pertes de crédit : l'écart entre IFRS et SYSCOHADA passe de 20 000 à 10 000, d'où un produit de +10 000 en IFRS. Impôt différé : (−20 000 + 10 000) × 30 % = +3 000. Résultat net IFRS 2025 : 250 000 − 20 000 + 10 000 + 3 000 = **243 000**. Aucun élément n'affecte les autres éléments du résultat global : le résultat global total est égal au résultat net. Le point de départ est le résultat net SYSCOHADA, faute d'état du résultat global selon le référentiel antérieur (§ 24(b)).",
      },
      {
        num: 3,
        enonce: "Établissez le rapprochement des capitaux propres au 31 décembre 2025 et contrôlez sa cohérence avec les deux rapprochements précédents.",
        correction: "Capitaux propres SYSCOHADA : 2 000 000 + 250 000 = 2 250 000. Bâtiment : (300 000 − 20 000) × 70 % = +196 000. Pertes de crédit : −10 000 × 70 % = −7 000. Capitaux propres IFRS au 31 décembre 2025 : **2 439 000**. Contrôle : 2 196 000 + 243 000 = 2 439 000.",
      },
      {
        num: 4,
        enonce: "En mars 2025, la faillite d'un client révèle qu'une créance de 40 000, existant au 31 décembre 2024, est irrécouvrable. La correction de valeur de 50 000 retenue au 1er janvier 2025 reposait sur les informations disponibles à cette date. Faut-il modifier le bilan d'ouverture ?",
        correction: "Non, sauf si des éléments probants objectifs montrent que l'estimation au 1er janvier 2025 était erronée, par exemple si la situation du client était déjà connue et avait été ignorée (§ 14). L'information reçue après la date de transition est traitée comme un événement postérieur à la clôture ne donnant pas lieu à ajustement : ses effets sont comptabilisés dans le résultat de 2025 (§ 15). Si une erreur était établie, sa correction serait présentée distinctement des changements de méthodes dans les rapprochements (§ 26).",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue13',
  numero: 7,
  id: 'ue13-chapitre-7',
  titre: 'Première adoption des IFRS et IFRS pour les PME',
  sousTitre: "IFRS 1 et IFRS pour les PME : transition vers le référentiel international et choix du référentiel",
  infoBulle: "Chapitre 7 du module IFRS/IAS : recours aux IFRS dans l'espace OHADA (AUDCIF, art. 8, 75 et 113 ; AUSCGIE, art. 371 et 664 ; monnaie fonctionnelle) ; première adoption selon IFRS 1 (champ, groupes, bilan d'ouverture complet, comparaison avec la première application du SYSCOHADA révisé, exceptions obligatoires, exemptions facultatives dont le coût présumé et la réévaluation légale congolaise, rapprochements chiffrés) ; norme IFRS pour les PME, troisième édition (fondements, obligation d'information du public, différences chiffrées, transition selon la section 35) ; synthèse sur le choix d'un référentiel.",
  loiRef: "IFRS 1 · IFRS for SMEs (3e éd., 2025) · AUDCIF art. 8, 75 et 113 · SYSCOHADA révisé, ch. 41",
  moduleLabel: 'UE 13 · IFRS / IAS',
  retourRoute: '/ue13-ifrs-ias',
  coursId: 'ue13-ifrs-ias',
  objectifs: [
    "Situer les IFRS complètes et la norme IFRS pour les PME par rapport au SYSCOHADA révisé dans le droit OHADA.",
    "Déterminer si une entité est un nouvel adoptant, fixer sa date de transition et le contenu de ses premiers états IFRS, y compris dans un groupe.",
    "Identifier l'incidence de la monnaie fonctionnelle sur une première adoption en RDC.",
    "Établir un état de la situation financière d'ouverture en IFRS complet et comptabiliser les ajustements, y compris leurs effets d'impôt différé.",
    "Comparer IFRS 1 avec la première application du SYSCOHADA révisé (chapitre 41) et en expliquer la divergence.",
    "Appliquer les exceptions obligatoires et choisir les exemptions facultatives d'IFRS 1.",
    "Établir les rapprochements des capitaux propres et du résultat global exigés par IFRS 1.",
    "Déterminer l'éligibilité d'une entité à la norme IFRS pour les PME.",
    "Identifier et chiffrer les principales différences entre IFRS pour les PME et IFRS complètes, et comparer la section 35 avec IFRS 1.",
    "Argumenter le choix d'un référentiel complémentaire au regard de la situation d'une entreprise congolaise.",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Dans l'espace OHADA, les entités cotées ou faisant appel public à l'épargne établissent des états IFRS en sus des états SYSCOHADA ; ces états ne servent pas à déterminer le bénéfice distribuable (AUDCIF, art. 8 et 75), et l'obligation s'applique depuis le 1er janvier 2019 (art. 113). Cette séparation préserve les effets juridiques des comptes légaux, notamment les seuils des art. 371 et 664 de l'AUSCGIE.",
    "La monnaie fonctionnelle IFRS (IAS 21) peut différer de la monnaie légale des comptes SYSCOHADA : une entreprise congolaise dollarisée doit alors reconstituer ses valeurs historiques en dollars.",
    "Les premiers états financiers IFRS sont les premiers états annuels comportant une déclaration explicite et sans réserve de conformité (IFRS 1.3). La date de transition est le début de la première période comparative.",
    "L'entité applique les IFRS en vigueur à la fin de la première période IFRS à toutes les périodes présentées (§ 7-8) et présente au moins trois états de la situation financière (§ 21). Une filiale adoptant après sa mère peut reprendre les valeurs des consolidés du groupe (D16).",
    "Le bilan d'ouverture comptabilise, décomptabilise, reclasse et évalue selon les IFRS (§ 10) ; les ajustements sont imputés en résultats non distribués (§ 11), avec leurs effets d'impôt différé. Le SYSCOHADA révisé a repris cette architecture pour sa première application, mais préconise un compte transitoire (475) pour protéger les capitaux propres.",
    "Les exceptions obligatoires (estimations, décomptabilisation, couverture, classement et dépréciation des actifs financiers, prêts publics, notamment) interdisent la rétrospection pour éviter les jugements a posteriori ; les exemptions facultatives (regroupements passés, coût présumé, contrats de location, écarts de conversion cumulés, démantèlement, notamment) la rendent optionnelle pour des raisons de coût. Aucune ne s'applique par analogie (§ 18). L'exemption relative aux avantages du personnel a été supprimée (§ 39L).",
    "Une réévaluation antérieure ne vaut coût présumé que si elle était globalement comparable à la juste valeur ou à un coût indexé (D6) : une réévaluation légale pratiquée en RDC sous l'Ordonnance-loi n° 89-017 (abrogée depuis le 1er janvier 2026 par la loi n° 23/053, qui rend la réévaluation libre par principe) doit être examinée au regard de la monnaie fonctionnelle et de l'absence de plafonnement à la valeur actuelle.",
    "Les premiers états IFRS rapprochent les capitaux propres et le résultat global du référentiel antérieur et des IFRS, en distinguant les corrections d'erreurs (§ 24-26).",
    "IFRS pour les PME (3e éd., applicable aux exercices ouverts à compter du 1er janvier 2027) s'adresse aux entités sans obligation d'information du public, sans critère de taille : titres non négociés sur un marché public et absence de détention d'actifs de tiers à titre principal (section 1.2-1.4). L'exemption pour coût ou effort excessif s'y apprécie selon un seuil plus bas (2.29).",
    "Ses principales différences avec les IFRS complètes portent sur la dépréciation des actifs financiers (pertes subies), l'amortissement du goodwill, la durée déterminée des incorporels et la comptabilisation en charges du développement et des coûts d'emprunt. La réévaluation des immobilisations corporelles y est admise.",
    "La section 35 transpose IFRS 1 avec des allègements : sept exceptions, application prospective possible de la section 29 (35.10(h)), dispense en cas d'impraticabilité (35.11).",
  ],
  references: [
    { genre: 'texte', intitule: "IFRS 1 — Première application des Normes internationales d'information financière", precision: "§§ 1 à 33, 39L ; annexes A à E (texte français intégral)" },
    { genre: 'texte', intitule: "IFRS for SMEs Accounting Standard, troisième édition (février 2025)", precision: "modules pédagogiques de l'IFRS Foundation (anglais) : sections 1, 2, 11, 17, 18, 19, 23, 28, 29, 30 et 35 ; édition 2015, section 25 ; citations en traduction de travail" },
    { genre: 'texte', intitule: "AUDCIF", precision: "art. 8 (états IFRS en sus), 75 (comptes consolidés) et 113 (entrée en vigueur)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, Titre VIII", precision: "ch. 28 (réévaluation des bilans), ch. 36 (comptabilité pluri-monétaire), ch. 41 (première application du SYSCOHADA révisé)" },
    { genre: 'texte', intitule: "AUSCGIE", precision: "art. 371 et 664 (capitaux propres inférieurs à la moitié du capital social)" },
    { genre: 'texte', intitule: "IAS 21 — Effets des variations des cours des monnaies étrangères", precision: "§ 8 à 14 (monnaie fonctionnelle)" },
    { genre: 'texte', intitule: "Loi n° 23/053 du 30 novembre 2023 (RDC)", precision: "art. 129 (réévaluation), 141 (tenue de la comptabilité en francs congolais), 152 (abrogations) et 153 (entrée en vigueur)" },
    { genre: 'texte', intitule: "Ordonnance-loi n° 89-017 du 18 février 1989 relative à la réévaluation de l'actif immobilisé (RDC), abrogée au 1er janvier 2026", precision: "art. 2, 7, 8, 19 et 22 ; coefficients des bilans clos au 31 décembre 2022 (A.M. n° 004 du 13 février 2022)" },
    { genre: 'texte', intitule: "J.-B. Tshimanga Mulumba (CPCC), Première adoption IFRS, IFRS PME & synthèse professionnelle", precision: "support de cours, module 7 : cas de coût présumé et cas de choix du référentiel" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "IFRS 1 (texte français intégral) ; IAS 21 ; IFRS for SMEs Accounting Standard, 3e édition, modules pédagogiques de l'IFRS Foundation, sections 1, 2, 11, 17, 18, 19, 28, 30 et 35 (traductions de travail) ; AUDCIF et SYSCOHADA révisé ; AUSCGIE ; loi n° 23/053 et Ordonnance-loi n° 89-017 (RDC) ; support de cours du module 7 (J.-B. Tshimanga Mulumba, CPCC).",
}

export default chapitre
