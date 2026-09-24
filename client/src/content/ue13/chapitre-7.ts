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
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '7.1',
    titre: "Le recours aux IFRS dans l'espace OHADA",
    navLabel: 'IFRS et OHADA',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le passage aux IFRS ne se réduit pas à une modification de la présentation des comptes. Il suppose de reconstruire l'information financière selon d'autres principes de comptabilisation et d'évaluation : prééminence de la substance économique, recours plus large à la juste valeur et aux valeurs actualisées, indépendance à l'égard des règles fiscales, informations en annexe plus étendues. Ce chapitre étudie les deux voies par lesquelles une entité peut rejoindre le référentiel de l'IASB : la première adoption des IFRS complètes, régie par IFRS 1, et l'application de la norme IFRS pour les PME, référentiel autonome et simplifié. Il s'achève par une synthèse sur le choix du référentiel.",
      },
      { type: 'intertitre', texte: "7.1.1 Le cadre fixé par l'AUDCIF" },
      {
        type: 'filet',
        titre: "Texte de référence — AUDCIF, art. 8, al. 4 et 5",
        texte: "« Les entités dont les titres sont inscrits à une bourse de valeurs et celles qui sollicitent un financement dans le cadre d'un appel public à l'épargne, doivent établir et présenter les états financiers annuels selon les normes internationales d'informations financières, appelées normes IFRS, en sus des états financiers visés aux alinéas précédents. Les états financiers annuels établis selon les normes IFRS sont destinés exclusivement aux marchés financiers. Ils ne peuvent servir de support de base pour la détermination du bénéfice distribuable visé par l'Acte uniforme relatif au droit des sociétés commerciales et du groupement d'intérêt économique. »",
      },
      {
        type: 'paragraphe',
        texte: "Le droit OHADA organise ainsi une coexistence et non une substitution. Les comptes établis selon le SYSCOHADA révisé demeurent les comptes légaux, qui fondent la détermination du bénéfice distribuable ; les états IFRS s'y ajoutent pour les entités faisant appel au marché. L'article 75 impose en outre l'établissement des états consolidés de ces entités selon les IFRS. Ces obligations s'appliquent depuis le 1er janvier 2019, soit un an après l'entrée en vigueur du SYSCOHADA révisé pour les comptes personnels (art. 113). En dehors de ces cas, l'établissement d'états IFRS est volontaire : filiales de groupes étrangers qui publient en IFRS, entreprises financées par des bailleurs ou des investisseurs internationaux, sociétés préparant une ouverture de leur capital.",
      },
      { type: 'intertitre', texte: "7.1.2 Trois référentiels, trois finalités" },
      {
        type: 'carte',
        titre: "Tableau 7.1 — SYSCOHADA révisé, IFRS pour les PME et IFRS complètes",
        tableau: {
          entetes: ['Critère', 'SYSCOHADA révisé', 'IFRS pour les PME', 'IFRS complètes'],
          lignes: [
            ['Statut dans l\'espace OHADA', 'Obligatoire pour les comptes légaux', 'Volontaire, en complément', 'Obligatoire en sus pour les entités cotées ou faisant appel public à l\'épargne (art. 8 et 75)'],
            ['Entités visées', 'Toutes les entités assujetties', 'Entités sans obligation d\'information du public', 'Toutes, notamment les entités faisant appel au marché'],
            ['Juste valeur', 'Limitée', 'Utilisée de façon ciblée, avec exemptions pour coût ou effort excessif', 'Nombreuses applications (IFRS 9, IFRS 13, IAS 40, IAS 41)'],
            ['Impôts différés', 'Comptes consolidés seulement', 'Oui (section 29)', 'Oui (IAS 12)'],
            ['Goodwill', 'Selon le Dispositif relatif aux comptes consolidés', 'Amorti', 'Non amorti, test annuel'],
            ['Niveau d\'information en annexe', 'Défini par le Titre IX', 'Réduit', 'Étendu'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Ce tableau corrige une opposition fréquente, reprise par le support d'origine du module, entre un SYSCOHADA qui serait « juridique » et des IFRS qui seraient « économiques ». Le SYSCOHADA révisé a intégré de nombreux principes issus des normes internationales, comme l'ont montré les chapitres précédents : contrats pluri-exercices inspirés d'IAS 11 et d'IFRS 15, subventions inspirées d'IAS 20, engagements de retraite inspirés d'IAS 19. Les écarts tiennent moins à l'orientation générale qu'à des choix précis : méthode de l'impôt exigible, traitement asymétrique des écarts de change, prudence dans l'évaluation, place limitée de la juste valeur.",
      },
    ],
  },
  {
    numero: '7.2',
    titre: "IFRS 1 : objectif, champ d'application et définitions",
    navLabel: 'IFRS 1 : champ',
    blocs: [
      {
        type: 'filet',
        titre: "Texte de référence — IFRS 1, § 1",
        texte: "« L'objectif de la présente norme est d'assurer que les premiers états financiers IFRS d'une entité ainsi que ses rapports intermédiaires relatifs à une partie de la période couverte par ces états financiers contiennent des informations de qualité élevée qui : (a) sont transparentes pour les utilisateurs et comparables pour toutes les périodes présentées ; (b) fournissent un point de départ approprié pour une comptabilité conforme aux Normes internationales d'information financière (IFRS) ; et (c) peuvent être produites à un coût qui ne dépasse pas les avantages attendus. »",
      },
      {
        type: 'paragraphe',
        texte: "L'objectif associe deux exigences en tension. La comparabilité voudrait que les IFRS soient appliquées comme si elles l'avaient toujours été ; le rapport coût-avantage commande de ne pas imposer la reconstitution d'informations anciennes qu'il serait coûteux, voire impossible, d'obtenir. IFRS 1 résout cette tension par un principe d'application rétrospective, assorti d'exceptions obligatoires et d'exemptions facultatives limitativement énumérées.",
      },
      { type: 'intertitre', texte: "7.2.1 Champ d'application" },
      {
        type: 'paragraphe',
        texte: "La norme s'applique aux premiers états financiers IFRS de l'entité et aux rapports intermédiaires qui couvrent une partie de leur période (§ 2). Les premiers états financiers IFRS sont les premiers états annuels dans lesquels l'entité adopte les IFRS « par une déclaration explicite et sans réserve de conformité aux IFRS » (§ 3). Tel est le cas même si les états antérieurs comportaient un rapprochement de certains montants avec les IFRS, se déclaraient conformes à certaines IFRS seulement, ou si l'entité avait préparé des états IFRS à usage interne ou une liasse de consolidation pour sa société mère (§ 3). La norme ne s'applique pas à une entité qui applique déjà les IFRS : ses changements de méthodes relèvent d'IAS 8 (§ 5). Une entité qui a cessé d'appliquer les IFRS puis y revient peut choisir entre IFRS 1 et une application rétrospective selon IAS 8 (§ 4A).",
      },
      { type: 'intertitre', texte: "7.2.2 Définitions et calendrier de la transition" },
      {
        type: 'carte',
        titre: "Tableau 7.2 — Définitions d'IFRS 1 (annexe A)",
        tableau: {
          entetes: ['Terme', 'Définition'],
          lignes: [
            ['Nouvel adoptant', 'Entité qui présente ses premiers états financiers IFRS'],
            ['Date de transition aux IFRS', "Début de la première période pour laquelle l'entité présente des informations comparatives complètes selon les IFRS dans ses premiers états financiers IFRS"],
            ["État de la situation financière d'ouverture en IFRS", "État de la situation financière à la date de transition aux IFRS"],
            ['Première période de présentation selon les IFRS', "Période la plus récente couverte par les premiers états financiers IFRS"],
            ['Référentiel comptable antérieur', "Référentiel utilisé juste avant l'adoption des IFRS (pour une entité de l'espace OHADA, le SYSCOHADA révisé)"],
            ['Coût présumé', "Montant utilisé comme substitut du coût ou du coût amorti à une date donnée"],
          ],
        },
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
            ['Contenu minimal', "Trois états de la situation financière, deux états du résultat global, deux tableaux des flux, deux états des variations des capitaux propres, notes", '§ 21'],
          ],
        },
        note: "La décision doit être prise avant la date de transition, ou peu après : l'entité doit pouvoir collecter dès le 1er janvier 2025 les informations nécessaires aux évaluations IFRS de l'exercice comparatif, alors même que ses comptes légaux de 2025 restent établis selon le SYSCOHADA.",
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
        texte: "L'entité prépare et présente un état de la situation financière d'ouverture en IFRS à la date de transition ; c'est le point de départ de sa comptabilité selon les IFRS (§ 6). Elle y applique les mêmes méthodes que pour toutes les périodes présentées (§ 7), sans recourir aux dispositions transitoires des autres normes, sauf dans les cas prévus par les annexes B à E (§ 9).",
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
            ['(b) Ne pas comptabiliser', "Écarts de conversion-actif (compte 478), qui ne sont ni des actifs ni des charges différées en IFRS", 'Chapitre 6'],
            ['(c) Reclasser', "Subventions d'investissement (compte 14), des capitaux propres vers les produits différés ou en déduction des actifs", 'Chapitre 5'],
            ['(d) Évaluer', "Dépréciation des créances selon les pertes de crédit attendues d'IFRS 9", 'Chapitre 4'],
            ['(d) Évaluer', "Engagements de retraite selon la méthode des unités de crédit projetées, si une méthode simplifiée était appliquée", 'Chapitre 6'],
            ['(d) Évaluer', "Immobilisations selon l'approche par composants et les durées d'utilité IFRS, ou selon un coût présumé", 'Chapitres 2 et 7'],
          ],
        },
      },
      { type: 'intertitre', texte: "7.3.2 La comptabilisation des ajustements" },
      {
        type: 'paragraphe',
        texte: "Les ajustements qui résultent de la différence entre les méthodes antérieures et les IFRS découlent d'événements et de transactions antérieurs à la date de transition. L'entité les comptabilise donc « directement en résultats non distribués (ou, le cas échéant, dans une autre catégorie de capitaux propres) à la date de transition aux IFRS » (§ 11). Ils n'affectent pas le résultat des périodes présentées. Chaque ajustement modifiant la valeur comptable d'un actif ou d'un passif sans modifier sa base fiscale, il fait naître une différence temporaire dont l'impôt différé doit être comptabilisé selon IAS 12 dans le même bilan d'ouverture.",
      },
      {
        type: 'carte',
        titre: "Exemple 7.2 — Juste valeur utilisée comme coût présumé",
        texte: "Illustration du support d'origine, complétée. Une immobilisation corporelle figure au bilan SYSCOHADA pour 100 000 à la date de transition. Sa juste valeur est de 140 000 ; l'entité choisit de l'utiliser comme coût présumé (D5). La base fiscale, fondée sur les comptes légaux, reste de 100 000. Taux d'impôt : 30 %.",
        tableau: {
          entetes: ['Compte', 'Débit', 'Crédit'],
          lignes: [
            ['Immobilisations corporelles', '40 000', ''],
            ["Passif d'impôt différé (40 000 × 30 %)", '', '12 000'],
            ['Résultats non distribués', '', '28 000'],
          ],
        },
        note: "Le support comptabilise la totalité des 40 000 en résultats non distribués. Or la valeur comptable IFRS (140 000) excède désormais la base fiscale (100 000) : la différence temporaire imposable de 40 000 impose un passif d'impôt différé (IAS 12.15), de sorte que l'augmentation nette des capitaux propres n'est que de 28 000. L'amortissement IFRS ultérieur est calculé sur 140 000 (annexe A, définition du coût présumé), et le passif d'impôt différé se résorbe au même rythme.",
      },
      {
        type: 'carte',
        titre: "Exemple 7.3 — Rapprochement des capitaux propres à la date de transition (NGUVU LOGISTIQUE SA, société fictive)",
        texte: "Les capitaux propres SYSCOHADA au 1er janvier 2025 s'élèvent à 800 000, auxquels s'ajoutent 60 000 de subventions d'investissement (compte 14). On suppose que les bases fiscales correspondent aux valeurs SYSCOHADA, que la subvention n'est pas imposable et qu'un bénéfice imposable futur est probable. Taux d'impôt : 30 %.",
        tableau: {
          entetes: ['Élément', 'Ajustement avant impôt', 'Impôt différé', 'Effet net'],
          lignes: [
            ['Capitaux propres SYSCOHADA, subventions comprises', '', '', '**860 000**'],
            ['Coût présumé des camions (D5)', '+40 000', '−12 000', '+28 000'],
            ['Reclassement de la subvention en produits différés', '−60 000', '0 (IAS 12.33)', '−60 000'],
            ['Pertes de crédit attendues sur créances (18 000 contre 10 000 en SYSCOHADA)', '−8 000', '+2 400', '−5 600'],
            ['Indemnités de fin de carrière : méthode actuarielle (30 000) au lieu de la méthode simplifiée (25 000)', '−5 000', '+1 500', '−3 500'],
            ['Gain de change latent inscrit au compte 479', '+3 000', '−900', '+2 100'],
            ['**Capitaux propres IFRS au 1er janvier 2025**', '', '**−9 000**', '**821 000**'],
          ],
        },
        note: "Ce rapprochement est l'un de ceux qu'impose le § 24(a)(i). Il doit être suffisamment détaillé pour faire comprendre chaque ajustement significatif (§ 25). Si l'entité découvre à cette occasion une erreur dans ses comptes SYSCOHADA, par exemple une provision omise, elle la présente distinctement des changements de méthodes (§ 26).",
      },
    ],
  },
  {
    numero: '7.4',
    titre: "IFRS 1 : exceptions obligatoires et exemptions facultatives",
    navLabel: 'IFRS 1 : exceptions',
    blocs: [
      {
        type: 'paragraphe',
        texte: "IFRS 1 établit deux catégories de dérogations au principe d'application rétrospective (§ 12). Les exceptions, énoncées aux § 14 à 17 et à l'annexe B, interdisent l'application rétrospective lorsque celle-ci exigerait de reconstituer a posteriori des jugements dont l'issue est désormais connue. Les exemptions, énoncées aux annexes C à E, autorisent l'entité à ne pas appliquer certaines dispositions lorsque le coût de l'application rétrospective excéderait ses avantages. Les unes et les autres sont limitatives : « Une entité ne doit pas appliquer ces exemptions à d'autres éléments par analogie » (§ 18).",
      },
      { type: 'intertitre', texte: "7.4.1 Les exceptions obligatoires" },
      {
        type: 'paragraphe',
        texte: "La première exception porte sur les estimations. Celles établies selon les IFRS à la date de transition doivent être cohérentes avec celles établies à la même date selon le référentiel antérieur, après ajustement des différences de méthodes, sauf éléments probants objectifs d'une erreur (§ 14). Une information reçue après la date de transition sur une estimation antérieure est traitée comme un événement postérieur à la clôture ne donnant pas lieu à ajustement : elle affecte le résultat de l'exercice comparatif, non le bilan d'ouverture (§ 15). Les estimations que le référentiel antérieur n'exigeait pas reflètent les conditions existant à la date de transition, notamment les prix de marché, taux d'intérêt et cours de change (§ 16).",
      },
      {
        type: 'carte',
        titre: "Tableau 7.4 — Exceptions de l'annexe B (IFRS 1, B1)",
        tableau: {
          entetes: ['Exception', 'Règle principale', 'Paragraphe'],
          lignes: [
            ["Décomptabilisation d'actifs et passifs financiers", "Application prospective aux transactions postérieures à la date de transition, sauf option rétrospective si l'information était disponible", 'B2-B3'],
            ['Comptabilité de couverture', "Aucune relation non conforme à IFRS 9 dans le bilan d'ouverture ; aucune désignation rétrospective", 'B4-B6'],
            ['Participations ne donnant pas le contrôle', "Application prospective de certaines dispositions d'IFRS 10", 'B7'],
            ["Classement et évaluation des actifs financiers", "Modèle économique apprécié d'après les faits existant à la date de transition", 'B8-B8C'],
            ["Dépréciation d'actifs financiers", "Application rétrospective d'IFRS 9, section 5.5, avec aménagements", 'B8D-B8G'],
            ['Dérivés incorporés', "Séparation appréciée à la date de conclusion du contrat ou de réexamen", 'B9'],
            ['Prêts publics', "Valeur comptable antérieure maintenue ; IFRS 9 et IAS 20 appliquées prospectivement", 'B10-B12'],
            ["Contrats d'assurance ; impôt différé sur certains passifs", "Dispositions particulières", 'B13-B14'],
          ],
        },
      },
      { type: 'intertitre', texte: "7.4.2 Les exemptions facultatives" },
      {
        type: 'paragraphe',
        texte: "L'annexe D énumère les exemptions ouvertes au choix de l'entité (D1), l'annexe C celles relatives aux regroupements d'entreprises antérieurs à la date de transition. Pour une entreprise commerciale ou industrielle de l'espace OHADA, quatre exemptions présentent un intérêt particulier. Le coût présumé dispense de reconstituer l'historique du coût des immobilisations acquises depuis des décennies ; la dispense relative aux regroupements évite de retraiter des acquisitions anciennes ; celle relative aux écarts de conversion remet à zéro un cumul souvent impossible à reconstituer ; celle relative aux passifs de démantèlement simplifie l'évaluation des actifs miniers et industriels.",
      },
      {
        type: 'carte',
        titre: "Tableau 7.5 — Principales exemptions facultatives",
        tableau: {
          entetes: ['Exemption', 'Contenu', 'Paragraphe'],
          lignes: [
            ['Regroupements d\'entreprises passés', "Pas de retraitement selon IFRS 3 ; si un regroupement est retraité, tous les regroupements postérieurs doivent l'être", 'C1, C4'],
            ['Coût présumé : juste valeur', "Juste valeur d'une immobilisation corporelle à la date de transition utilisée comme coût présumé", 'D5'],
            ['Coût présumé : réévaluation antérieure', "Réévaluation selon le référentiel antérieur, si elle était globalement comparable à la juste valeur ou au coût IFRS indexé", 'D6'],
            ['Extension du coût présumé', "Immeubles de placement au coût, immobilisations incorporelles remplissant les conditions d'IAS 38, actifs au titre de droits d'utilisation", 'D7'],
            ['Écarts de conversion cumulés', "Réputés nuls à la date de transition pour tous les établissements à l'étranger", 'D12-D13'],
            ['Passifs de démantèlement', "Modalités simplifiées d'évaluation des passifs inclus dans le coût des immobilisations", 'D21-D21A'],
            ["Frais de découverture d'une mine à ciel ouvert", "Modalités transitoires pour IFRIC 20", 'D32'],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Observation — L'exemption relative aux avantages du personnel",
        texte: "Le support d'origine du module range les avantages du personnel parmi les exemptions facultatives. Cette exemption, qui permettait de comptabiliser en capitaux propres les écarts actuariels cumulés à la date de transition, a été supprimée : « La publication d'IAS 19 Avantages du personnel (modifiée en juin 2011) a donné lieu à la modification du paragraphe D1 et à la suppression des paragraphes D10 et D11 » (IFRS 1.39L). La liste du § D1 porte d'ailleurs la mention « [supprimé] » au point (e). Le nouvel adoptant évalue donc ses engagements sociaux selon IAS 19 dans son bilan d'ouverture, sans exemption, ce que la suppression du corridor par IAS 19 rend d'ailleurs sans objet.",
      },
    ],
  },
  {
    numero: '7.5',
    titre: "IFRS 1 : présentation et informations à fournir",
    navLabel: 'IFRS 1 : informations',
    blocs: [
      {
        type: 'paragraphe',
        texte: "IFRS 1 ne prévoit aucune exemption aux dispositions des autres normes relatives à la présentation et aux informations à fournir (§ 20). Les premiers états IFRS comprennent au moins trois états de la situation financière et deux exemplaires de chacun des autres états, avec les notes (§ 21). Les résumés historiques ou informations comparatives présentés selon le référentiel antérieur doivent être clairement signalés comme non conformes aux IFRS, avec la nature des principaux ajustements (§ 22).",
      },
      { type: 'intertitre', texte: "7.5.1 L'explication de la transition" },
      {
        type: 'paragraphe',
        texte: "L'entité explique l'incidence de la transition sur sa situation financière, sa performance et ses flux de trésorerie (§ 23). Elle présente à cet effet des rapprochements des capitaux propres à la date de transition et à la clôture du dernier exercice publié selon le référentiel antérieur, un rapprochement du résultat global total de ce dernier exercice et, le cas échéant, les informations d'IAS 36 sur les pertes de valeur comptabilisées ou reprises dans le bilan d'ouverture (§ 24). Les corrections d'erreurs du référentiel antérieur y sont distinguées des changements de méthodes (§ 26). IAS 8 ne s'applique pas aux changements de méthodes liés à la première adoption (§ 27) ; l'entité explique cependant tout changement de méthode ou d'exemption intervenu entre son premier rapport intermédiaire IFRS et ses premiers états annuels (§ 27A).",
      },
      {
        type: 'carte',
        titre: "Tableau 7.6 — Informations spécifiques aux premiers états IFRS",
        tableau: {
          entetes: ['Information', 'Paragraphe'],
          lignes: [
            ["Rapprochements des capitaux propres (date de transition et dernière clôture selon le référentiel antérieur)", '§ 24(a)'],
            ["Rapprochement du résultat global total du dernier exercice selon le référentiel antérieur", '§ 24(b)'],
            ["Explication des ajustements significatifs du tableau des flux de trésorerie", '§ 25'],
            ["Distinction entre corrections d'erreurs et changements de méthodes", '§ 26'],
            ["Juste valeur utilisée comme coût présumé : cumul des justes valeurs et des ajustements, par poste", '§ 30'],
            ["Rapprochements dans les rapports intermédiaires de la première période IFRS", '§ 32'],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Observation — La conduite d'un projet de première adoption",
        texte: "Les exigences d'IFRS 1 font de la première adoption un projet d'organisation plutôt qu'un exercice d'écritures. Le choix de la date de transition, arrêté avant l'ouverture de l'exercice comparatif, conditionne la collecte des informations : justes valeurs à la date de transition, données actuarielles, historique des pertes de crédit, bases fiscales. Les choix d'exemptions engagent durablement les comptes : un coût présumé fixe la base des amortissements futurs, la remise à zéro des écarts de conversion est irréversible. Le système d'information doit permettre de tenir en parallèle les comptes légaux SYSCOHADA en francs congolais et les états IFRS, éventuellement dans une autre monnaie fonctionnelle. La qualité des rapprochements publiés conditionne enfin la confiance des investisseurs dans les premiers états IFRS.",
      },
    ],
  },
  {
    numero: '7.6',
    titre: "La norme IFRS pour les PME : objet et champ d'application",
    navLabel: 'IFRS PME : champ',
    blocs: [
      {
        type: 'paragraphe',
        texte: "La norme IFRS pour les PME (*IFRS for SMEs Accounting Standard*) est un référentiel autonome publié par l'IASB, dont la troisième édition date de février 2025. Organisée en 35 sections, elle est conçue pour se suffire à elle-même : elle simplifie les principes de comptabilisation et d'évaluation des IFRS complètes, supprime des options et réduit les informations à fournir, à l'intention d'entités dont les utilisateurs des états financiers n'ont pas les mêmes besoins que les investisseurs des marchés publics. Les passages cités dans cette section et la suivante sont des traductions de travail des modules pédagogiques en anglais de l'IFRS Foundation.",
      },
      { type: 'intertitre', texte: "7.6.1 La notion d'obligation d'information du public" },
      {
        type: 'carte',
        titre: "Tableau 7.7 — Champ d'application d'IFRS pour les PME (section 1, traduction de travail)",
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
        texte: "La norme ne retient aucun critère quantitatif : une entreprise de grande taille dont les titres ne sont pas négociés et qui ne détient pas d'actifs pour le compte de tiers entre dans son champ. Réciproquement, une petite entité dont les obligations sont négociées sur un marché régional en est exclue. L'IASB a précisé dans la troisième édition que les catégories d'entités citées au § 1.3(b) sont des exemples d'entités remplissant souvent ce critère, dans le but de clarifier et non d'assouplir la définition.",
      },
      {
        type: 'filet',
        titre: "Observation — La place d'IFRS pour les PME dans l'espace OHADA",
        texte: "L'AUDCIF ne mentionne pas la norme IFRS pour les PME. Pour les entités qui y sont soumises, les comptes légaux restent établis selon le SYSCOHADA révisé, et les entités cotées ou faisant appel public à l'épargne, qui ont par définition une obligation d'information du public, doivent produire en sus des états selon les IFRS complètes (art. 8). IFRS pour les PME ne peut donc intervenir qu'à titre volontaire, pour des états complémentaires destinés à des partenaires financiers ou à un groupe. Cette utilisation peut être pertinente pour une entreprise non cotée financée par des bailleurs ou investisseurs internationaux, à condition que les états publiés respectent l'ensemble de la norme pour pouvoir s'en réclamer.",
      },
    ],
  },
  {
    numero: '7.7',
    titre: "La norme IFRS pour les PME : simplifications et différences avec les IFRS complètes",
    navLabel: 'IFRS PME : différences',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les simplifications de la norme procèdent de trois techniques : la suppression de certaines options ou de certains sujets jugés peu pertinents pour les PME, la simplification des principes de comptabilisation et d'évaluation, et l'allègement des informations à fournir. Plusieurs dispositions prévoient en outre une exemption lorsque l'application de la règle générale impliquerait un coût ou un effort excessif (*undue cost or effort*).",
      },
      {
        type: 'carte',
        titre: "Tableau 7.8 — Principales différences entre IFRS pour les PME et IFRS complètes",
        tableau: {
          entetes: ['Sujet', 'IFRS pour les PME', 'IFRS complètes'],
          lignes: [
            ['Goodwill', "Amorti sur sa durée d'utilité ; test de dépréciation seulement en présence d'un indice (sections 19 et 27)", 'Non amorti ; test annuel (IAS 36.10)'],
            ['Immobilisations incorporelles', "Durée d'utilité toujours déterminée ; au plus dix ans si elle ne peut être estimée de façon fiable (18.19-18.20)", 'Durée déterminée ou indéterminée (IAS 38)'],
            ["Coûts d'emprunt", "Charges de la période (25.2, édition 2015)", 'Incorporation aux actifs qualifiés (IAS 23)'],
            ['Immobilisations corporelles', "Modèle du coût ou de la réévaluation, par catégorie (17.15-17.15D)", 'Modèle du coût ou de la réévaluation (IAS 16)'],
            ['Avantages du personnel', "Méthode des unités de crédit projetées, avec simplification si coût ou effort excessif (28.18-28.19) ; écarts actuariels en résultat ou en autres éléments du résultat global, sur option (28.24)", "Méthode des unités de crédit projetées ; réévaluations en autres éléments du résultat global (IAS 19.120)"],
            ['Impôt sur le résultat', "Approche par les différences temporaires, alignée sur IAS 12 et précisée par la troisième édition (section 29)", 'IAS 12'],
            ['Produits', "Modèle en cinq étapes fondé sur IFRS 15 depuis la troisième édition (section 23)", 'IFRS 15'],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Certaines affirmations courantes, reprises par le support d'origine, doivent être nuancées. La réévaluation des immobilisations corporelles n'est pas interdite : la section 17 offre le choix entre modèle du coût et modèle de la réévaluation, les augmentations de valeur étant portées en autres éléments du résultat global sauf reprise d'une diminution antérieure (17.15C). L'absence de corridor n'est pas une spécificité des PME : IAS 19 impose elle-même la comptabilisation immédiate des réévaluations (§ 120(c)), la différence portant sur la faculté, offerte aux PME, de les comptabiliser en résultat. Enfin, la section 29 n'est pas un calcul simplifié des impôts différés : elle repose sur les différences temporaires, et la troisième édition l'a rapprochée d'IAS 12 sur la comptabilisation des actifs d'impôt différé, l'incertitude fiscale et la compensation.",
      },
      { type: 'intertitre', texte: "7.7.1 La transition vers IFRS pour les PME" },
      {
        type: 'paragraphe',
        texte: "La section 35 transpose aux PME la logique d'IFRS 1. À la date de transition, soit le début de la première période présentée, l'entité comptabilise tous les actifs et passifs requis, décomptabilise ceux que la norme n'admet pas, reclasse les éléments mal classés et applique la norme à l'évaluation de tous les éléments (35.7). Elle ne modifie pas rétrospectivement le traitement de certaines transactions énumérées au § 35.9, pour lesquelles l'application rétrospective exigerait des jugements a posteriori, et peut recourir aux exemptions facultatives du § 35.10. L'impraticabilité d'un ajustement est admise et doit être expliquée (35.11), et l'entité explique l'incidence de la transition (35.12-35.13).",
      },
      {
        type: 'carte',
        titre: "Exemple 7.4 — Choix d'un référentiel pour une entreprise congolaise non cotée",
        texte: "Une entreprise agroalimentaire de Lubumbashi, non cotée, sans dépôts de tiers, en croissance, négocie un financement auprès d'un fonds d'investissement étranger qui demande des états financiers « conformes à un référentiel international ».",
        tableau: {
          entetes: ['Option', 'Analyse'],
          lignes: [
            ['Comptes SYSCOHADA seuls', "Obligatoires dans tous les cas ; parfois jugés insuffisants par l'investisseur étranger faute de comparabilité internationale"],
            ['États complémentaires IFRS pour les PME', "Admis : l'entité n'a pas d'obligation d'information du public (1.2-1.3) ; coût de mise en œuvre réduit ; comparabilité internationale"],
            ['États complémentaires IFRS complètes', "Admis ; plus coûteux ; nécessaires si l'entité envisage un appel public à l'épargne (AUDCIF, art. 8) ou si le groupe de l'investisseur publie en IFRS complètes"],
          ],
        },
        note: "IFRS pour les PME constitue ici une solution intermédiaire rationnelle, comme le souligne le support d'origine. Le choix doit cependant anticiper l'évolution de l'entreprise : une introduction en bourse ou une émission d'obligations sur un marché public imposerait le passage aux IFRS complètes et une nouvelle transition selon IFRS 1.",
      },
    ],
  },
  {
    numero: '7.8',
    titre: "Synthèse : logique des IFRS et choix du référentiel",
    navLabel: 'Synthèse',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les chapitres 1 à 7 permettent de dégager les caractéristiques communes aux normes étudiées. La substance prime sur la forme juridique : un affacturage avec recours reste une créance, une consignation n'est pas une vente, un droit de retour réduit le chiffre d'affaires. L'évaluation privilégie l'information prospective : valeur recouvrable fondée sur des flux futurs, pertes de crédit attendues, valeurs actualisées des engagements sociaux. L'information comptable est distincte de la fiscalité, dont l'effet est isolé par l'impôt différé. Enfin, l'étendue des informations en annexe compense la part de jugement que comportent ces évaluations.",
      },
      {
        type: 'carte',
        titre: "Tableau 7.9 — Critères du choix d'un référentiel complémentaire",
        tableau: {
          entetes: ['Critère', 'Orientation'],
          lignes: [
            ['Obligation légale', "Entité cotée ou faisant appel public à l'épargne : IFRS complètes en sus du SYSCOHADA (AUDCIF, art. 8 et 75)"],
            ['Destinataires des états', "Bailleurs, investisseurs, groupe étranger : référentiel attendu par ces utilisateurs"],
            ['Taille et complexité', "Groupes complexes, instruments financiers élaborés : IFRS complètes ; entreprise non cotée de structure simple : IFRS pour les PME"],
            ['Perspectives', "Projet d'introduction en bourse ou d'émission obligataire : préparer directement la transition aux IFRS complètes"],
            ['Coût', "Collecte de données actuarielles, de justes valeurs et de données sur les pertes de crédit ; formation ; système d'information"],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Synthèse du chapitre",
        texte: "IFRS 1 organise une transition contrôlée : application rétrospective des IFRS en vigueur à la fin de la première période, ajustements imputés sur les capitaux propres d'ouverture, exceptions obligatoires là où la rétrospection supposerait des jugements a posteriori, exemptions facultatives là où elle serait trop coûteuse, rapprochements détaillés pour expliquer la transition. IFRS pour les PME offre aux entités sans obligation d'information du public un référentiel international autonome et proportionné. Dans l'espace OHADA, l'un et l'autre s'ajoutent aux comptes légaux établis selon le SYSCOHADA révisé, qui demeurent la base du bénéfice distribuable. La valeur ajoutée des IFRS réside dans la qualité du jugement professionnel qu'elles exigent et dans la transparence de l'information sur ce jugement.",
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
]

const chapitre: Chapitre = {
  ue: 'ue13',
  numero: 7,
  id: 'ue13-chapitre-7',
  titre: 'Première adoption des IFRS et IFRS pour les PME',
  sousTitre: "IFRS 1 et IFRS pour les PME : transition vers le référentiel international et choix du référentiel",
  infoBulle: "Chapitre 7 du module IFRS/IAS : recours aux IFRS dans l'espace OHADA (AUDCIF, art. 8, 75 et 113) ; première adoption selon IFRS 1 (champ, date de transition, bilan d'ouverture, ajustements, exceptions obligatoires, exemptions facultatives, rapprochements) ; norme IFRS pour les PME (obligation d'information du public, simplifications, transition) ; synthèse sur la logique des IFRS et le choix d'un référentiel.",
  loiRef: "IFRS 1 · IFRS for SMEs (3e éd., 2025) · AUDCIF art. 8, 75 et 113",
  moduleLabel: 'UE 13 · IFRS / IAS',
  retourRoute: '/ue13-ifrs-ias',
  coursId: 'ue13-ifrs-ias',
  objectifs: [
    "Situer les IFRS complètes et la norme IFRS pour les PME par rapport au SYSCOHADA révisé dans le droit OHADA.",
    "Déterminer si une entité est un nouvel adoptant, fixer sa date de transition et le contenu de ses premiers états IFRS.",
    "Établir un état de la situation financière d'ouverture en IFRS et comptabiliser les ajustements, y compris leurs effets d'impôt différé.",
    "Appliquer les exceptions obligatoires et choisir les exemptions facultatives d'IFRS 1.",
    "Présenter les rapprochements et informations exigés par IFRS 1.",
    "Déterminer l'éligibilité d'une entité à la norme IFRS pour les PME.",
    "Identifier les principales différences entre IFRS pour les PME et IFRS complètes.",
    "Argumenter le choix d'un référentiel complémentaire au regard de la situation d'une entreprise congolaise.",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Dans l'espace OHADA, les entités cotées ou faisant appel public à l'épargne établissent des états IFRS en sus des états SYSCOHADA ; ces états ne servent pas à déterminer le bénéfice distribuable (AUDCIF, art. 8 et 75), et l'obligation s'applique depuis le 1er janvier 2019 (art. 113).",
    "Les premiers états financiers IFRS sont les premiers états annuels comportant une déclaration explicite et sans réserve de conformité (IFRS 1.3). La date de transition est le début de la première période comparative.",
    "L'entité applique les IFRS en vigueur à la fin de la première période IFRS à toutes les périodes présentées (§ 7-8) et présente au moins trois états de la situation financière (§ 21).",
    "Le bilan d'ouverture comptabilise, décomptabilise, reclasse et évalue selon les IFRS (§ 10) ; les ajustements sont imputés en résultats non distribués (§ 11), avec leurs effets d'impôt différé.",
    "Les exceptions obligatoires (estimations, décomptabilisation, couverture, classement et dépréciation des actifs financiers, prêts publics, notamment) interdisent la rétrospection ; les exemptions facultatives (regroupements passés, coût présumé, écarts de conversion cumulés, notamment) la rendent optionnelle. Aucune ne s'applique par analogie (§ 18). L'exemption relative aux avantages du personnel a été supprimée (§ 39L).",
    "Les premiers états IFRS rapprochent les capitaux propres et le résultat global du référentiel antérieur et des IFRS, en distinguant les corrections d'erreurs (§ 24-26).",
    "IFRS pour les PME s'adresse aux entités sans obligation d'information du public, sans critère de taille : titres non négociés sur un marché public et absence de détention d'actifs de tiers à titre principal (section 1.2-1.4).",
    "Ses principales différences avec les IFRS complètes portent sur l'amortissement du goodwill, la durée déterminée des incorporels, la comptabilisation en charges des coûts d'emprunt et les simplifications des avantages du personnel. La réévaluation des immobilisations corporelles y est admise (17.15).",
  ],
  references: [
    { genre: 'texte', intitule: "IFRS 1 — Première application des Normes internationales d'information financière", precision: "§§ 1 à 33, 39L ; annexes A à D (texte français intégral)" },
    { genre: 'texte', intitule: "IFRS for SMEs Accounting Standard, troisième édition (février 2025)", precision: "modules pédagogiques de l'IFRS Foundation (anglais) : sections 1, 17, 18, 19, 23, 28, 29 et 35 ; édition 2015, section 25 ; citations en traduction de travail" },
    { genre: 'texte', intitule: "AUDCIF", precision: "art. 8 (états IFRS en sus), 75 (comptes consolidés) et 113 (entrée en vigueur)" },
    { genre: 'texte', intitule: "J.-B. Tshimanga Mulumba (CPCC), Première adoption IFRS, IFRS PME & synthèse professionnelle", precision: "support de cours, module 7 : cas de coût présumé et cas de choix du référentiel" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "IFRS 1 (texte français intégral) ; IFRS for SMEs Accounting Standard, 3e édition, modules pédagogiques de l'IFRS Foundation (traductions de travail) ; AUDCIF ; support de cours du module 7 (J.-B. Tshimanga Mulumba, CPCC).",
}

export default chapitre
