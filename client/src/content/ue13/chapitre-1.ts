import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 13 — Chapitre 1 : Fondements conceptuels, normalisation et architecture IFRS
//
// Sources vérifiées sur texte : IAS 1 « Présentation des états financiers »
// (§§ 15 à 34) et IAS 8 « Méthodes comptables, changements dans les estimations
// comptables et erreurs » (§§ 7 à 13), lus dans leur version française
// intégrale. Le texte du Cadre conceptuel de l'information financière (IASB,
// 2018) n'est pas encodé dans le corpus de référence de la plateforme : les
// développements qui s'y rapportent sont cités au niveau du chapitre du Cadre,
// sans pseudo-références de paragraphe, et son rôle normatif est établi par
// les renvois exprès d'IAS 1.15 et d'IAS 8.11(b). Les éléments historiques et
// institutionnels (IASC, IASB, ISSB, due process) relèvent de faits notoires
// documentés par l'IFRS Foundation, non d'un texte normatif.
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'ue13c1-q1',
    question: "Selon le Cadre conceptuel de l'IASB, quel est l'objectif de l'information financière à usage général ?",
    options: [
      { id: 'a', texte: "Calculer l'assiette fiscale de l'État" },
      { id: 'b', texte: "Fournir des informations utiles aux investisseurs actuels et potentiels, aux prêteurs et aux autres créanciers pour leurs décisions de fourniture de ressources à l'entité" },
      { id: 'c', texte: "Protéger les créanciers par l'application systématique du principe de prudence" },
      { id: 'd', texte: "Garantir la conformité des états financiers aux règles fiscales nationales" },
    ],
    reponseCorrecte: 'b',
    explication: "Le chapitre 1 du Cadre conceptuel (2018) assigne à l'information financière à usage général l'objectif de fournir, au sujet de l'entité, des informations utiles aux investisseurs actuels et potentiels, aux prêteurs et aux autres créanciers pour les aider à prendre des décisions concernant la fourniture de ressources à l'entité. C'est la « logique investisseurs » : l'État fiscal n'est pas l'utilisateur prioritaire.",
    articleRef: "Cadre conceptuel IASB (2018), chapitre 1",
  },
  {
    id: 'ue13c1-q2',
    question: "En quelle année l'IASC (International Accounting Standards Committee) a-t-il été créé ?",
    options: [
      { id: 'a', texte: "1929" },
      { id: 'b', texte: "1945" },
      { id: 'c', texte: "1973" },
      { id: 'd', texte: "2001" },
    ],
    reponseCorrecte: 'c',
    explication: "L'IASC a été créé en 1973 par les organisations professionnelles comptables de plusieurs pays (dont les États-Unis, le Royaume-Uni, la France, l'Allemagne et le Japon). Il a publié les premières normes IAS, avant sa transformation en IASB en 2001.",
    articleRef: "Histoire de la normalisation (IFRS Foundation)",
  },
  {
    id: 'ue13c1-q3',
    question: "Quelle est la différence essentielle entre l'IASC et l'IASB ?",
    options: [
      { id: 'a', texte: "L'IASB est un organe gouvernemental tandis que l'IASC était privé" },
      { id: 'b', texte: "L'IASB publie des normes appelées IAS alors que l'IASC publiait des IFRS" },
      { id: 'c', texte: "L'IASB, issu de la réforme de 2001, dispose d'une gouvernance renforcée et publie des normes plus rigoureuses, orientées investisseurs" },
      { id: 'd', texte: "L'IASC n'a jamais publié de normes" },
    ],
    reponseCorrecte: 'c',
    explication: "En 2001, l'IASC a été réformé en IASB (International Accounting Standards Board), avec une gouvernance renforcée et une indépendance accrue. Les normes publiées depuis 2001 s'appellent IFRS ; les IAS antérieures restent en vigueur tant qu'elles ne sont pas remplacées — IAS 1, IAS 8, IAS 12 ou IAS 16 sont toujours applicables aujourd'hui.",
    articleRef: "Histoire de la normalisation (IFRS Foundation)",
  },
  {
    id: 'ue13c1-q4',
    question: "Quel organe publie des interprétations officielles lorsque l'application d'une norme IFRS est ambiguë ou divergente ?",
    options: [
      { id: 'a', texte: "Le Monitoring Board" },
      { id: 'b', texte: "L'ISSB" },
      { id: 'c', texte: "L'IFRS Interpretations Committee (interprétations IFRIC, anciennement SIC)" },
      { id: 'd', texte: "La SEC américaine" },
    ],
    reponseCorrecte: 'c',
    explication: "L'IFRS Interpretations Committee publie les interprétations (IFRIC ; SIC pour les plus anciennes) lorsqu'une norme est ambiguë ou que des pratiques divergentes se développent. Ces interprétations font partie du référentiel IFRS au même titre que les normes : une entité qui déclare la conformité aux IFRS doit s'y conformer (IAS 1.16 exige une conformité à « toutes les dispositions des IFRS »).",
    articleRef: "IFRS Foundation ; IAS 1.16",
  },
  {
    id: 'ue13c1-q5',
    question: "Laquelle de ces affirmations caractérise correctement la logique IFRS par opposition à la logique du SYSCOHADA ?",
    options: [
      { id: 'a', texte: "Les IFRS privilégient le coût historique et la prudence fiscale, le SYSCOHADA la juste valeur" },
      { id: 'b', texte: "Les IFRS sont orientées vers les investisseurs et privilégient la réalité économique des transactions sur leur simple forme juridique" },
      { id: 'c', texte: "Les IFRS sont imposées de plein droit dans les États membres de l'OHADA" },
      { id: 'd', texte: "Les IFRS suppriment la comptabilité fiscale dans les pays qui les adoptent" },
    ],
    reponseCorrecte: 'b',
    explication: "La logique IFRS est orientée vers l'information des apporteurs de capitaux : image fidèle, juste valeur là où les normes la prescrivent, vision prospective, et primauté de la réalité économique — IAS 8.10(b)(ii) exige des informations qui « traduisent la réalité économique des transactions, des autres événements et des conditions et non pas simplement leur forme juridique ». Le SYSCOHADA, de tradition continentale, reste proche de la fiscalité et du coût historique. Les IFRS ne suppriment pas la fiscalité : elles en séparent la comptabilité financière, ce qui engendre les impôts différés (IAS 12).",
    articleRef: "IAS 8.10(b)(ii)",
  },
  {
    id: 'ue13c1-q6',
    question: "Quelles sont les grandes étapes du « due process » par lequel l'IASB élabore une norme ?",
    options: [
      { id: 'a', texte: "Un vote unique du Monitoring Board" },
      { id: 'b', texte: "Inscription à l'agenda, consultation préliminaire (Discussion Paper), exposé-sondage (Exposure Draft) ouvert aux commentaires publics, analyse des commentaires, délibérations et vote, publication de la norme avec sa date d'entrée en vigueur" },
      { id: 'c', texte: "Une négociation intergouvernementale suivie d'un traité" },
      { id: 'd', texte: "Une décision unilatérale du président de l'IASB" },
    ],
    reponseCorrecte: 'b',
    explication: "Le due process de l'IASB, décrit dans le Due Process Handbook de l'IFRS Foundation, enchaîne six moments : identification du sujet et inscription à l'agenda ; recherche et consultation préliminaire (souvent un Discussion Paper) ; publication d'un exposé-sondage ouvert aux commentaires de toutes les parties prenantes ; analyse des commentaires ; délibérations publiques et vote ; publication de la norme définitive avec ses dispositions transitoires. Les normes sont ensuite adoptées juridiquement par chaque juridiction selon ses propres mécanismes.",
    articleRef: "IFRS Foundation, Due Process Handbook",
  },
  {
    id: 'ue13c1-q7',
    question: "Selon le Cadre conceptuel de l'IASB (2018), qu'est-ce qu'un actif ?",
    options: [
      { id: 'a', texte: "Un bien dont l'entité est propriétaire juridique" },
      { id: 'b', texte: "Une ressource économique actuelle contrôlée par l'entité du fait d'événements passés" },
      { id: 'c', texte: "Tout bien inscrit à l'actif selon le plan comptable national" },
      { id: 'd', texte: "Un bien corporel d'une durée d'utilité supérieure à douze mois" },
    ],
    reponseCorrecte: 'b',
    explication: "Le chapitre 4 du Cadre conceptuel (2018) définit l'actif comme une ressource économique actuelle contrôlée par l'entité du fait d'événements passés, la ressource économique étant un droit qui a le potentiel de produire des avantages économiques. Le critère déterminant est le contrôle, non la propriété juridique — application directe de la primauté de la réalité économique. C'est à ces définitions et critères de comptabilisation qu'IAS 1.15 et IAS 8.11(b) renvoient expressément.",
    articleRef: "Cadre conceptuel IASB (2018), chapitre 4 ; IAS 1.15 ; IAS 8.11(b)",
  },
  {
    id: 'ue13c1-q8',
    question: "Pourquoi la crise de 1929 est-elle qualifiée de crise de l'information comptable ?",
    options: [
      { id: 'a', texte: "Les entreprises appliquaient mal les IFRS" },
      { id: 'b', texte: "Les états financiers des sociétés cotées étaient souvent non audités, les résultats manipulés, et aucune règle commune n'encadrait leur présentation" },
      { id: 'c', texte: "Les normes comptables imposées par les gouvernements étaient trop strictes" },
      { id: 'd', texte: "La SEC refusait de publier les comptes des sociétés cotées" },
    ],
    reponseCorrecte: 'b',
    explication: "Avant 1933, aucune règle fédérale n'imposait aux sociétés cotées américaines la publication d'états financiers audités et normalisés : l'opacité et les manipulations ont amplifié la panique — les investisseurs « ne savaient pas ce qu'ils achetaient ». La réponse américaine (Securities Act de 1933, Securities Exchange Act de 1934 créant la SEC) a posé les fondements du modèle anglo-saxon : protection de l'investisseur, transparence obligatoire, normalisation confiée à des organismes techniques indépendants de l'État fiscal.",
    articleRef: "Histoire de la normalisation ; Securities Acts 1933-1934",
  },
  {
    id: 'ue13c1-q9',
    question: "Qu'est-ce que l'ISSB ?",
    options: [
      { id: 'a', texte: "L'organe de régulation des marchés créé en 1934" },
      { id: 'b', texte: "L'International Sustainability Standards Board, créé par l'IFRS Foundation en novembre 2021 (COP26) pour élaborer des normes mondiales d'information en matière de durabilité — premières normes IFRS S1 et IFRS S2 publiées en juin 2023" },
      { id: 'c', texte: "Le comité d'interprétation des normes IFRS" },
      { id: 'd', texte: "Un comité d'adaptation des IFRS pour l'Afrique" },
    ],
    reponseCorrecte: 'b',
    explication: "L'ISSB a été créé par l'IFRS Foundation lors de la COP26 (Glasgow, novembre 2021) pour développer des normes d'information sur la durabilité destinées aux marchés financiers. Ses deux premières normes, IFRS S1 (obligations générales d'information sur la durabilité) et IFRS S2 (informations relatives au climat), ont été publiées en juin 2023. L'ISSB opère aux côtés de l'IASB, sous la même fondation — les normes S restent distinctes des normes comptables IFRS.",
    articleRef: "IFRS Foundation, 2021-2023",
  },
  {
    id: 'ue13c1-q10',
    question: "Quelles sont les deux caractéristiques qualitatives fondamentales de l'information financière selon le Cadre conceptuel (2018) ?",
    options: [
      { id: 'a', texte: "La comparabilité et la vérifiabilité" },
      { id: 'b', texte: "La rapidité et l'intelligibilité" },
      { id: 'c', texte: "La pertinence et la fidélité de la représentation" },
      { id: 'd', texte: "La prudence et le coût historique" },
    ],
    reponseCorrecte: 'c',
    explication: "Le chapitre 2 du Cadre conceptuel (2018) distingue deux caractéristiques qualitatives fondamentales — la pertinence (valeur prédictive ou de confirmation) et la fidélité de la représentation (information complète, neutre et exempte d'erreurs) — et quatre caractéristiques auxiliaires qui en renforcent l'utilité : comparabilité, vérifiabilité, rapidité et compréhensibilité. Les caractéristiques auxiliaires ne peuvent pas rendre utile une information qui ne serait ni pertinente ni fidèle.",
    articleRef: "Cadre conceptuel IASB (2018), chapitre 2",
  },
  {
    id: 'ue13c1-q11',
    question: "Depuis quand les IFRS sont-elles obligatoires pour les comptes consolidés des sociétés cotées de l'Union européenne ?",
    options: [
      { id: 'a', texte: "2001" },
      { id: 'b', texte: "2005, en application du règlement (CE) n° 1606/2002" },
      { id: 'c', texte: "2010" },
      { id: 'd', texte: "Elles n'y sont pas obligatoires" },
    ],
    reponseCorrecte: 'b',
    explication: "Le règlement (CE) n° 1606/2002 du 19 juillet 2002 a rendu les IFRS obligatoires pour les comptes consolidés des sociétés cotées sur un marché réglementé européen à compter des exercices ouverts en 2005, après homologation de chaque norme par la Commission européenne. C'est le moment charnière de la généralisation mondiale des IFRS : plus de 140 juridictions les imposent ou les permettent aujourd'hui.",
    articleRef: "Règlement (CE) n° 1606/2002",
  },
  {
    id: 'ue13c1-q12',
    question: "Quel est le rôle du Monitoring Board dans la gouvernance de l'IFRS Foundation ?",
    options: [
      { id: 'a', texte: "Rédiger les normes IFRS en cas de désaccord au sein de l'IASB" },
      { id: 'b', texte: "Superviser la gouvernance de la Fondation, participer à la nomination des trustees et veiller à l'indépendance de l'IASB, sans intervenir dans le contenu technique des normes" },
      { id: 'c', texte: "Publier les interprétations des normes" },
      { id: 'd', texte: "Sanctionner financièrement les entreprises non conformes" },
    ],
    reponseCorrecte: 'b',
    explication: "Le Monitoring Board, créé en 2009 dans le sillage de la crise financière de 2008, réunit des autorités publiques de marchés (dont l'OICV/IOSCO). Il supervise la gouvernance de l'IFRS Foundation, approuve la nomination des trustees et veille à la responsabilité publique du dispositif — mais ne rédige aucune norme et n'intervient pas dans les décisions techniques, qui restent le monopole de l'IASB.",
    articleRef: "Gouvernance IFRS Foundation",
  },
  {
    id: 'ue13c1-q13',
    question: "Que dispose IAS 1.15 au sujet de l'image fidèle ?",
    options: [
      { id: 'a', texte: "L'image fidèle est une notion facultative laissée au jugement de l'auditeur" },
      { id: 'b', texte: "Les états financiers doivent présenter une image fidèle de la situation financière, de la performance financière et des flux de trésorerie ; l'application des IFRS, accompagnée d'informations supplémentaires si nécessaire, est présumée y conduire" },
      { id: 'c', texte: "L'image fidèle se limite au bilan" },
      { id: 'd', texte: "L'image fidèle résulte de la seule conformité au droit fiscal national" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.15 dispose : « Les états financiers doivent présenter une image fidèle de la situation financière, de la performance financière et des flux de trésorerie de l'entité. » La présentation d'une image fidèle nécessite une représentation fidèle des effets des transactions selon les définitions et critères de comptabilisation « exposés dans le Cadre conceptuel de l'information financière », et « l'application des IFRS, accompagnée de la présentation d'informations supplémentaires lorsque nécessaire, est présumée conduire à des états financiers qui donnent une image fidèle ».",
    articleRef: 'IAS 1.15',
  },
  {
    id: 'ue13c1-q14',
    question: "À quelle condition une entité peut-elle décrire ses états financiers comme conformes aux IFRS (IAS 1.16) ?",
    options: [
      { id: 'a', texte: "Dès qu'elle applique la majorité des normes" },
      { id: 'b', texte: "Si elle procède à une déclaration explicite et sans réserve de conformité dans les notes, et seulement si les états sont conformes à toutes les dispositions des IFRS" },
      { id: 'c', texte: "Sur autorisation de son auditeur" },
      { id: 'd', texte: "Si son régulateur national l'y autorise, même en cas d'écarts" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.16 dispose : « L'entité dont les états financiers sont conformes aux IFRS doit procéder à une déclaration explicite et sans réserve de cette conformité dans les notes. L'entité ne doit décrire des états financiers comme étant conformes aux IFRS que s'ils sont conformes à toutes les dispositions des IFRS. » Il n'existe pas de conformité partielle : c'est tout ou rien. IAS 1.18 ajoute qu'on ne corrige pas des méthodes comptables inappropriées par de simples notes explicatives.",
    articleRef: 'IAS 1.16 et 1.18',
  },
  {
    id: 'ue13c1-q15',
    question: "Dans quelles conditions IAS 1 permet-elle de s'écarter d'une disposition d'une IFRS (« true and fair override ») ?",
    options: [
      { id: 'a', texte: "Jamais : aucune dérogation n'est possible" },
      { id: 'b', texte: "Dans les circonstances extrêmement rares où la direction estime que le respect de la disposition serait trompeur au point d'être contraire à l'objectif des états financiers, si le cadre réglementaire l'impose ou ne l'interdit pas, avec des informations détaillées en notes" },
      { id: 'c', texte: "Chaque fois que la direction juge le traitement IFRS défavorable au résultat" },
      { id: 'd', texte: "Sur simple accord du commissaire aux comptes" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.19 réserve l'écart aux « circonstances extrêmement rares où la direction estime que le respect d'une disposition d'une IFRS serait trompeur au point d'être contraire à l'objectif des états financiers décrit dans le Cadre conceptuel », et à condition que le cadre réglementaire impose ou n'interdise pas un tel écart. IAS 1.20 impose alors d'indiquer la norme écartée, la nature de l'écart, la raison pour laquelle le traitement serait trompeur et l'effet financier de l'écart pour chaque période. Si le cadre réglementaire interdit l'écart, IAS 1.23 impose de réduire le caractère trompeur par des informations en notes.",
    articleRef: 'IAS 1.19-24',
  },
  {
    id: 'ue13c1-q16',
    question: "Que prévoit IAS 1 en matière de continuité de l'exploitation ?",
    options: [
      { id: 'a', texte: "La continuité est toujours présumée, sans évaluation" },
      { id: 'b', texte: "La direction doit évaluer la capacité de l'entité à poursuivre son exploitation, sur un horizon d'au moins douze mois à compter de la clôture, indiquer les incertitudes significatives et, si la base de continuité n'est pas retenue, l'indiquer avec la base retenue et la raison" },
      { id: 'c', texte: "Seul l'auditeur évalue la continuité" },
      { id: 'd', texte: "La continuité ne concerne que les banques" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.25 impose à la direction d'évaluer la capacité de l'entité à poursuivre son exploitation et de préparer les états financiers sur la base de la continuité, sauf intention de liquider ou de cesser l'activité ou absence d'autre solution réaliste ; les incertitudes significatives doivent être indiquées, et l'abandon de la base de continuité doit être signalé avec la base retenue et sa raison. IAS 1.26 précise que l'évaluation porte sur toutes les informations disponibles concernant l'avenir, « au minimum, sans toutefois s'y limiter, sur douze mois à compter de la date de clôture ».",
    articleRef: 'IAS 1.25-26',
  },
  {
    id: 'ue13c1-q17',
    question: "Selon IAS 1.27, sur quelle base l'entité établit-elle ses états financiers ?",
    options: [
      { id: 'a', texte: "Sur la base de caisse (encaissements-décaissements) pour tous les états" },
      { id: 'b', texte: "Selon la méthode de la comptabilité d'engagement, sauf pour les informations relatives aux flux de trésorerie" },
      { id: 'c', texte: "Selon la méthode choisie librement chaque année" },
      { id: 'd', texte: "Selon les règles fiscales nationales" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.27 dispose : « L'entité doit établir ses états financiers selon la méthode de la comptabilité d'engagement, sauf pour les informations relatives aux flux de trésorerie. » IAS 1.28 précise que les éléments sont alors comptabilisés en tant qu'actifs, passifs, capitaux propres, produits et charges lorsqu'ils satisfont aux définitions et critères de comptabilisation définis dans le Cadre conceptuel — nouvelle illustration du rôle normatif indirect du Cadre.",
    articleRef: 'IAS 1.27-28',
  },
  {
    id: 'ue13c1-q18',
    question: "Que dispose IAS 1.32 en matière de compensation ?",
    options: [
      { id: 'a', texte: "La compensation des actifs et passifs est toujours permise pour alléger le bilan" },
      { id: 'b', texte: "L'entité ne doit pas compenser les actifs et les passifs, ni les produits et les charges, sauf si la compensation est imposée ou autorisée par une IFRS" },
      { id: 'c', texte: "La compensation est obligatoire pour les opérations intragroupe" },
      { id: 'd', texte: "La compensation relève du libre choix de la direction" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.32 dispose : « L'entité ne doit pas compenser les actifs et les passifs ou les produits et les charges, sauf si cette compensation est imposée ou autorisée par une IFRS. » IAS 1.33 explique que la compensation réduit la capacité des utilisateurs à comprendre les transactions et à évaluer les flux de trésorerie futurs — mais l'évaluation d'actifs nets de réductions de valeur (dépréciation de stocks, créances douteuses) n'est pas une compensation.",
    articleRef: 'IAS 1.32-33',
  },
  {
    id: 'ue13c1-q19',
    question: "En l'absence d'une IFRS applicable spécifiquement à une transaction, comment la direction choisit-elle sa méthode comptable (IAS 8) ?",
    options: [
      { id: 'a', texte: "Elle applique obligatoirement les règles fiscales nationales" },
      { id: 'b', texte: "Elle exerce son jugement pour développer une méthode donnant une information pertinente et fiable, en se référant d'abord aux IFRS traitant de questions similaires, puis aux définitions, critères de comptabilisation et concepts d'évaluation du Cadre conceptuel" },
      { id: 'c', texte: "Elle s'abstient de comptabiliser la transaction" },
      { id: 'd', texte: "Elle demande une dérogation à l'IASB" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 8.10 impose à la direction, en l'absence d'IFRS spécifique, de faire usage de jugement pour développer une méthode donnant des informations pertinentes et fiables. IAS 8.11 fixe la hiérarchie des sources, par ordre décroissant : (a) les dispositions des IFRS traitant de questions similaires et liées ; (b) « les définitions, les critères de comptabilisation et les concepts d'évaluation des actifs, des passifs, des produits et des charges énoncés dans le Cadre conceptuel ». IAS 8.12 permet en outre de considérer les positions récentes d'autres normalisateurs utilisant un cadre similaire, la littérature comptable et les pratiques.",
    articleRef: 'IAS 8.10-12',
  },
  {
    id: 'ue13c1-q20',
    question: "Où le principe de primauté de la réalité économique sur la forme juridique est-il expressément formulé dans les normes encodées ?",
    options: [
      { id: 'a', texte: "Nulle part : c'est une simple doctrine" },
      { id: 'b', texte: "À l'IAS 8.10(b)(ii) : les informations doivent traduire « la réalité économique des transactions, des autres événements et des conditions et non pas simplement leur forme juridique »" },
      { id: 'c', texte: "Dans le règlement (CE) n° 1606/2002" },
      { id: 'd', texte: "Uniquement dans les normes de durabilité IFRS S1 et S2" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 8.10(b)(ii) exige, pour les méthodes développées par jugement, des informations fiables « en ce sens que les états financiers [...] traduisent la réalité économique des transactions, des autres événements et des conditions et non pas simplement leur forme juridique » — aux côtés de la neutralité, de la prudence et de l'exhaustivité (IAS 8.10(b)(iii) à (v)). Le Cadre conceptuel (2018) rattache la même idée à la fidélité de la représentation. Illustration classique : le preneur d'un contrat de location comptabilise un actif au titre du droit d'utilisation et une dette de loyers (IFRS 16), bien que la propriété juridique demeure au bailleur.",
    articleRef: 'IAS 8.10(b)',
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '1.1',
    titre: 'Pourquoi une normalisation comptable internationale ?',
    navLabel: 'Pourquoi les IFRS ?',
    blocs: [
      {
        type: 'paragraphe',
        texte: "La comptabilité est un **langage de communication financière** : elle traduit la réalité économique des entreprises en informations utiles à la décision. Or, longtemps, chaque pays a parlé son propre dialecte : des règles nationales hétérogènes, souvent modelées par la fiscalité et le droit local, orientées vers la protection du créancier et de l'État plus que vers l'information des marchés. Résultat : des états financiers incomparables d'un pays à l'autre, un obstacle majeur à la circulation internationale des capitaux.",
      },
      {
        type: 'carte',
        titre: 'Les limites des référentiels nationaux',
        liste: [
          "**Hétérogénéité** : des règles différentes d'un pays à l'autre, sans langage commun.",
          "**Emprise fiscale** : la comptabilité servait d'abord à asseoir l'impôt, non à informer les investisseurs.",
          "**Faible comparabilité internationale** : impossible d'analyser avec les mêmes critères les comptes d'entreprises relevant de référentiels différents.",
          "**Orientation administrative** : une information tournée vers l'État et les créanciers plutôt que vers les marchés financiers.",
        ],
      },
      {
        type: 'paragraphe',
        texte: "La crise de 1929 a été le premier électrochoc : au-delà du krach boursier, c'est une **crise de la crédibilité de l'information comptable**. Beaucoup de sociétés cotées américaines publiaient des états financiers non audités, aux résultats manipulés, sans règle commune de présentation ; les investisseurs *ne savaient pas ce qu'ils achetaient*. La réponse américaine fonde le modèle anglo-saxon : le **Securities Act de 1933** (transparence obligatoire des offres publiques), le **Securities Exchange Act de 1934** créant la **SEC**, puis la délégation progressive de la normalisation à des organismes techniques privés et indépendants de l'État fiscal (APB, puis FASB en 1973).",
      },
      { type: 'controle', question: QCM[7] },
      {
        type: 'filet',
        titre: "De l'harmonisation à la normalisation",
        texte: "Les années 1970-1990 sont celles de l'harmonisation : réduire les différences entre systèmes nationaux sans imposer de règle unique (les 4e et 7e directives comptables européennes de 1978 et 1983 en sont l'exemple type). Bilan : une comparabilité limitée, car trop d'options coexistaient. La normalisation — la logique IAS/IFRS — va plus loin : des normes uniques, fondées sur un cadre conceptuel commun, applicables indépendamment des législations nationales. Le tournant est l'année 2001, avec la transformation de l'IASC en IASB.",
      },
      { type: 'controle', question: QCM[1] },
    ],
  },
  {
    numero: '1.2',
    titre: "L'architecture institutionnelle : IFRS Foundation, IASB, Interpretations Committee, ISSB",
    navLabel: 'Architecture',
    blocs: [
      {
        type: 'paragraphe',
        texte: "La normalisation internationale repose sur une **architecture institutionnelle indépendante** : aucun gouvernement ne peut dicter le contenu d'une norme IFRS. L'ensemble est chapeauté par l'**IFRS Foundation**, organisation à but non lucratif qui nomme, surveille et finance les conseils de normalisation.",
      },
      {
        type: 'carte',
        titre: 'Les organes du dispositif',
        liste: [
          "**Monitoring Board** (créé en 2009, après la crise financière de 2008) : organe de supervision publique réunissant des autorités de marchés ; il approuve la nomination des trustees et veille à la responsabilité publique du dispositif, sans jamais intervenir dans le contenu technique des normes.",
          "**IFRS Foundation** (trustees) : nomme, surveille et finance l'IASB et l'ISSB, supervise le due process et la stratégie d'ensemble.",
          "**IASB** (International Accounting Standards Board, 2001) : l'organe technique qui fixe son programme de travail, approuve les exposés-sondages et publie les normes comptables IFRS. Ses membres, à temps plein, représentent la diversité géographique mondiale.",
          "**IFRS Interpretations Committee** : publie les interprétations (IFRIC ; SIC pour les plus anciennes) lorsqu'une norme est ambiguë ou appliquée de façon divergente ; elles font partie du référentiel au même titre que les normes.",
          "**ISSB** (International Sustainability Standards Board, 2021) : élabore les normes d'information en matière de durabilité — IFRS S1 et IFRS S2, publiées en juin 2023 —, distinctes des normes comptables.",
        ],
      },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[11] },
      {
        type: 'tableau',
        tableau: {
          entetes: ['Date', 'Étape'],
          lignes: [
            ['1973', "Création de l'IASC — publication des premières normes IAS"],
            ['Années 1980-1990', "Limites des IAS : trop d'options alternatives, faible force contraignante"],
            ['2001', "Transformation de l'IASC en IASB — gouvernance renforcée ; les nouvelles normes s'appellent IFRS, les IAS restent en vigueur tant qu'elles ne sont pas remplacées"],
            ['2002-2005', "Règlement (CE) n° 1606/2002 : IFRS obligatoires pour les comptes consolidés des sociétés cotées de l'UE à compter de 2005"],
            ['2009', 'Création du Monitoring Board'],
            ['2021', "Création de l'ISSB lors de la COP26 (Glasgow)"],
            ['2023', 'Publication des normes de durabilité IFRS S1 et IFRS S2'],
          ],
        },
      },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[10] },
    ],
  },
  {
    numero: '1.3',
    titre: "Le due process et le statut juridique des IFRS",
    navLabel: 'Due process',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les IFRS ne sont pas des règles imposées par un État : elles sont le produit d'un **processus international, indépendant et participatif**, le *due process*, décrit dans le Due Process Handbook de l'IFRS Foundation. Ses grandes étapes : identification du sujet et inscription à l'agenda ; recherche et consultation préliminaire, souvent par un *Discussion Paper* ; publication d'un **exposé-sondage** (*Exposure Draft*) ouvert aux commentaires écrits de toutes les parties prenantes — entreprises, cabinets d'audit, régulateurs, universités ; analyse des commentaires par le staff technique ; délibérations en séance publique et vote du Board ; publication de la norme définitive avec sa date d'entrée en vigueur et ses dispositions transitoires.",
      },
      { type: 'controle', question: QCM[5] },
      {
        type: 'filet',
        titre: 'Le statut juridique des IFRS : une adoption, jamais une application de plein droit',
        texte: "Une norme publiée par l'IASB n'a, par elle-même, aucune force obligatoire : chaque juridiction l'adopte selon ses propres mécanismes — homologation norme par norme par la Commission européenne pour l'Union européenne (règlement (CE) n° 1606/2002), transposition ou renvoi législatif ailleurs. Dans l'espace OHADA, le référentiel de droit commun demeure le SYSCOHADA (AUDCIF) : aucune norme IFRS n'y a force obligatoire à moins d'être rendue applicable par un texte — l'AUDCIF impose d'ailleurs aux sociétés cotées et à certaines entités des états financiers en normes IFRS en sus des états SYSCOHADA, et en RDC le secteur bancaire applique le référentiel IFRS via le Guide comptable des établissements de crédit (GCEC-IFRS) édicté par la Banque centrale du Congo.",
      },
    ],
  },
  {
    numero: '1.4',
    titre: "Le cadre conceptuel de l’IASB",
    navLabel: 'Cadre conceptuel',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le **Cadre conceptuel de l'information financière** (version révisée de 2018) est le socle théorique des IFRS. Ce n'est pas une norme et il ne prime jamais sur une norme particulière ; mais son autorité est réelle, car les normes elles-mêmes y renvoient : IAS 1.15 exige une représentation fidèle « selon les définitions et les critères de comptabilisation des actifs, des passifs, des produits et des charges exposés dans le Cadre conceptuel », et IAS 8.11(b) en fait la deuxième source de la hiérarchie que la direction doit consulter en l'absence de norme spécifique. Le Cadre guide l'IASB dans l'élaboration des normes, aide les préparateurs à traiter les situations non couvertes et donne sa cohérence à l'ensemble du référentiel.",
      },
      { type: 'controle', question: QCM[0] },
      {
        type: 'carte',
        titre: 'Les caractéristiques qualitatives (Cadre conceptuel 2018, chapitre 2)',
        tableau: {
          entetes: ['Caractéristiques fondamentales', 'Caractéristiques auxiliaires'],
          lignes: [
            [
              "**Pertinence** : l'information peut faire une différence dans les décisions (valeur prédictive et/ou de confirmation). **Fidélité de la représentation** : information complète, neutre, exempte d'erreurs.",
              "**Comparabilité**, **vérifiabilité**, **rapidité**, **compréhensibilité** : elles renforcent l'utilité de l'information, mais ne peuvent pas rendre utile une information ni pertinente ni fidèle.",
            ],
          ],
        },
      },
      { type: 'controle', question: QCM[9] },
      {
        type: 'carte',
        titre: 'Les éléments des états financiers (Cadre conceptuel 2018, chapitre 4)',
        liste: [
          "**Actif** : ressource économique actuelle contrôlée par l'entité du fait d'événements passés — le critère est le *contrôle*, non la propriété juridique.",
          "**Passif** : obligation actuelle de l'entité de transférer une ressource économique, résultant d'événements passés.",
          "**Capitaux propres** : intérêt résiduel dans les actifs après déduction de tous les passifs.",
          "**Produits** : augmentations d'actifs ou diminutions de passifs qui accroissent les capitaux propres, autres que les apports des détenteurs de droits sur ceux-ci.",
          "**Charges** : diminutions d'actifs ou augmentations de passifs qui réduisent les capitaux propres, autres que les distributions aux détenteurs de droits sur ceux-ci.",
        ],
        note: "Le texte intégral du Cadre conceptuel n'est pas encodé dans le corpus de référence de la plateforme : les renvois ci-dessus sont donnés au niveau des chapitres du Cadre (2018) ; les formulations normatives vérifiées verbatim dans ce chapitre proviennent d'IAS 1 et d'IAS 8.",
      },
      { type: 'controle', question: QCM[6] },
    ],
  },
  {
    numero: '1.5',
    titre: "Les caractéristiques générales des états financiers selon IAS 1",
    navLabel: 'IAS 1',
    blocs: [
      {
        type: 'paragraphe',
        texte: "La norme IAS 1 « Présentation des états financiers » traduit le cadre en obligations positives. **Image fidèle** : les états financiers doivent présenter une image fidèle de la situation financière, de la performance financière et des flux de trésorerie, l'application des IFRS étant présumée y conduire (IAS 1.15). **Conformité** : la conformité aux IFRS fait l'objet d'une déclaration explicite et sans réserve dans les notes, et ne peut être revendiquée que si les états sont conformes à *toutes* les dispositions des IFRS (IAS 1.16) ; des méthodes comptables inappropriées ne se corrigent ni par leur description ni par des notes (IAS 1.18).",
      },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[13] },
      {
        type: 'filet',
        titre: "La dérogation exceptionnelle (« true and fair override », IAS 1.19-24)",
        texte: "Dans les circonstances extrêmement rares où la direction estime que le respect d'une disposition d'une IFRS serait trompeur au point d'être contraire à l'objectif des états financiers décrit dans le Cadre conceptuel, l'entité s'écarte de cette disposition — si le cadre réglementaire l'impose ou ne l'interdit pas — en indiquant la norme écartée, la nature et la raison de l'écart et son effet financier pour chaque période (IAS 1.20). Si le cadre réglementaire interdit l'écart, l'entité doit réduire le caractère trompeur perçu par des informations appropriées en notes (IAS 1.23). IAS 1.24 pose même une présomption réfutable : si d'autres entités se conforment à la disposition dans des circonstances similaires, son respect n'est pas réputé trompeur.",
      },
      { type: 'controle', question: QCM[14] },
      {
        type: 'carte',
        titre: 'Les autres caractéristiques générales (IAS 1.25-33)',
        liste: [
          "**Continuité de l'exploitation** (IAS 1.25-26) : évaluation par la direction sur un horizon d'au moins douze mois à compter de la clôture ; indication des incertitudes significatives ; mention de la base retenue si la continuité est abandonnée.",
          "**Comptabilité d'engagement** (IAS 1.27-28) : obligatoire, sauf pour les informations sur les flux de trésorerie ; les éléments sont comptabilisés lorsqu'ils satisfont aux définitions et critères du Cadre conceptuel.",
          "**Importance relative et regroupement** (IAS 1.29-31) : présentation séparée de chaque catégorie significative d'éléments similaires ; une information imposée par une IFRS peut être omise si elle est non significative, et les informations significatives ne doivent pas être noyées sous des informations non significatives (IAS 1.30A).",
          "**Non-compensation** (IAS 1.32-33) : pas de compensation d'actifs et de passifs, ni de produits et de charges, sauf si une IFRS l'impose ou l'autorise ; l'évaluation d'actifs nets de dépréciations n'est pas une compensation.",
        ],
      },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[16] },
      { type: 'controle', question: QCM[17] },
    ],
  },
  {
    numero: '1.6',
    titre: 'Logique IFRS et logique SYSCOHADA : deux philosophies',
    navLabel: 'IFRS vs SYSCOHADA',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les IFRS incarnent une **logique investisseurs** : information au service de la décision économique des apporteurs de capitaux, vision prospective centrée sur la capacité à générer des flux de trésorerie futurs, comptabilité séparée de la fiscalité. Les référentiels de tradition continentale — dont le **SYSCOHADA** — restent davantage marqués par la sécurisation de l'assiette fiscale, la prudence, le coût historique et la primauté de la forme juridique. La hiérarchie d'IAS 8 verbalise le premier pilier de la philosophie IFRS : en développant une méthode par jugement, la direction doit produire des états financiers qui « traduisent la réalité économique des transactions, des autres événements et des conditions et non pas simplement leur forme juridique » (IAS 8.10(b)(ii)).",
      },
      {
        type: 'tableau',
        tableau: {
          entetes: ['Critère', 'Logique IFRS', 'Logique SYSCOHADA'],
          lignes: [
            ['Objectif', "Information économique pour la décision", "Détermination du résultat et de l'assiette fiscale"],
            ['Utilisateur central', 'Investisseurs et prêteurs', 'État, administration fiscale, créanciers'],
            ["Évaluation", "Coût et juste valeur, selon les normes applicables", 'Coût historique dominant'],
            ['Principe directeur', 'Image fidèle (IAS 1.15)', 'Prudence'],
            ['Vision temporelle', 'Prospective (flux futurs)', 'Rétrospective'],
            ['Relation comptabilité/fiscalité', "Séparées — d'où les impôts différés (IAS 12)", 'Étroitement liées'],
            ['Primauté', "Réalité économique (IAS 8.10(b)(ii))", 'Forme juridique'],
          ],
        },
      },
      { type: 'controle', question: QCM[4] },
      {
        type: 'filet',
        titre: 'La substance avant la forme : une illustration',
        texte: "Un contrat de location illustre la divergence : le preneur IFRS comptabilise un actif au titre du droit d'utilisation et une dette de loyers (IFRS 16), parce qu'il contrôle l'utilisation de l'actif, alors même que la propriété juridique demeure au bailleur. La séparation d'avec la fiscalité produit quant à elle le mécanisme des impôts différés d'IAS 12 : les différences temporelles entre valeurs comptables IFRS et bases fiscales sont comptabilisées en actifs ou passifs d'impôt différé.",
      },
      { type: 'controle', question: QCM[18] },
      { type: 'controle', question: QCM[19] },
      {
        type: 'paragraphe',
        texte: "Cette opposition n'est ni neutre ni purement technique : la normalisation IFRS est le produit d'une histoire (l'essor du capitalisme financier, la crise de 1929), d'une crise de confiance et d'un choix assumé en faveur des marchés et de l'investisseur. Pour le praticien congolais, elle se traduit concrètement : SYSCOHADA pour les entités relevant de l'AUDCIF, référentiel IFRS pour les établissements de crédit (GCEC-IFRS de la Banque centrale du Congo) et pour les groupes qui se financent sur les marchés internationaux — avec, souvent, la nécessité de maîtriser les deux langages.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ue13c1-cp1',
    titre: "La crise informationnelle de 1929 et ses enseignements",
    contexte: "En 1929, les bourses mondiales s'effondrent. L'analyse historique révèle que de nombreuses sociétés cotées américaines publiaient des états financiers non audités, aux résultats manipulés, sans règle commune de présentation. Les investisseurs ne pouvaient distinguer les entreprises solvables de celles en faillite imminente.",
    questions: [
      {
        num: 1,
        enonce: "En quoi la crise de 1929 était-elle aussi une crise de l'information comptable, et quels mécanismes liés à l'absence de normalisation ont amplifié la panique ?",
        correction: "Au-delà du krach, 1929 révèle une défaillance informationnelle : états non audités, résultats manipulés, absence de règle commune de présentation. Sans information fiable et comparable, les investisseurs ne pouvaient évaluer la solidité réelle des émetteurs ; l'incertitude radicale a transformé les premières faillites en panique générale, faute de tout mécanisme d'alerte fondé sur des comptes crédibles. La normalisation comptable est précisément ce qui rend l'information comparable et vérifiable — les caractéristiques que le Cadre conceptuel érigera plus tard en qualités de l'information utile.",
      },
      {
        num: 2,
        enonce: "Quelles réformes institutionnelles américaines ont répondu à cette crise, et en quoi fondent-elles la logique IFRS actuelle ?",
        correction: "Le Securities Act de 1933 impose la transparence des offres publiques de valeurs mobilières ; le Securities Exchange Act de 1934 crée la SEC, régulateur permanent des marchés et des sociétés cotées ; la normalisation technique est ensuite déléguée à des organismes privés indépendants (APB puis FASB). Trois principes en résultent, que l'on retrouve au cœur des IFRS : la protection de l'investisseur comme finalité première de l'information financière, la transparence obligatoire, et l'indépendance de la normalisation comptable vis-à-vis de l'État fiscal — l'IASB étant lui-même un normalisateur technique privé supervisé par l'IFRS Foundation et le Monitoring Board.",
      },
      {
        num: 3,
        enonce: "Un État dont les sociétés cotées publient des comptes peu fiables souhaite restaurer la confiance des investisseurs. Quelles mesures institutionnelles recommanderiez-vous, à la lumière de 1929 et de la logique IFRS ?",
        correction: "Quatre chantiers complémentaires : (1) rendre effectif l'audit légal des sociétés cotées par des professionnels indépendants ; (2) doter le marché d'un régulateur indépendant, à l'image de la SEC, habilité à exiger la publication d'états financiers conformes à un référentiel normalisé ; (3) imposer aux sociétés cotées un référentiel garantissant la comparabilité internationale — les IFRS, dont la conformité doit alors être totale et faire l'objet de la déclaration explicite et sans réserve d'IAS 1.16 ; (4) investir dans la formation des préparateurs et des auditeurs, condition de l'application réelle des normes. L'expérience montre que la norme sans institutions de contrôle ne produit pas la confiance.",
      },
      {
        num: 4,
        enonce: "« La normalisation comptable internationale n'est ni neutre ni purement technique. » Discutez.",
        correction: "La normalisation IFRS est le produit d'une histoire économique (essor du capitalisme financier, crise de 1929, mondialisation des capitaux) et d'un choix : faire de l'investisseur l'utilisateur de référence de l'information financière. Ce choix structure tout le référentiel — objectif de l'information (chapitre 1 du Cadre conceptuel), primauté de la réalité économique (IAS 8.10(b)(ii)), vision prospective. Il n'est pas neutre : il peut servir moins bien d'autres utilisateurs (États, salariés, créanciers locaux) et avantager les économies à marchés financiers profonds. C'est pourquoi l'adoption des IFRS reste une décision souveraine de chaque juridiction, et pourquoi des référentiels alternatifs, comme le SYSCOHADA, conservent leur légitimité propre dans leur espace.",
      },
      {
        num: 5,
        enonce: "Montrez, avec des exemples, comment la primauté de la réalité économique peut créer des tensions avec un référentiel fondé sur la forme juridique.",
        correction: "Deux exemples classiques. Les contrats de location : sous IFRS 16, le preneur comptabilise un actif au titre du droit d'utilisation et une dette de loyers parce qu'il contrôle l'utilisation de l'actif — alors qu'un référentiel attaché à la forme juridique laisse l'actif chez le bailleur, propriétaire. Les cessions de créances avec recours : si le cédant conserve l'essentiel des risques et avantages, IFRS 9 maintient les créances à son bilan malgré la cession juridiquement parfaite. Ces divergences imposent aux groupes opérant sous deux référentiels de tenir des retraitements systématiques, et illustrent la formule d'IAS 8.10(b)(ii) : traduire « la réalité économique des transactions [...] et non pas simplement leur forme juridique ».",
      },
    ],
  },
  {
    id: 'ue13c1-cp2',
    titre: "Une conformité « partielle » aux IFRS et une dérogation invoquée",
    contexte: "Une société déclare dans ses notes que ses états financiers sont « établis conformément aux IFRS, à l'exception d'IAS 36 sur les dépréciations, jugée inadaptée à notre secteur ». Sa direction ajoute qu'elle s'estime couverte par la « dérogation d'image fidèle » d'IAS 1.",
    questions: [
      {
        num: 1,
        enonce: "La déclaration de conformité de cette société est-elle acceptable au regard d'IAS 1 ?",
        correction: "Non. IAS 1.16 dispose que l'entité « ne doit décrire des états financiers comme étant conformes aux IFRS que s'ils sont conformes à toutes les dispositions des IFRS ». Une conformité « à l'exception de » n'est pas une conformité : la déclaration explicite et sans réserve exigée par IAS 1.16 est impossible ici. IAS 1.18 ajoute qu'une entité ne peut corriger des méthodes comptables inappropriées ni par l'indication des méthodes utilisées, ni par des notes ou textes explicatifs — l'aveu en annexe ne purge pas l'écart.",
      },
      {
        num: 2,
        enonce: "La dérogation d'IAS 1.19 peut-elle couvrir l'écart invoqué ?",
        correction: "Très difficilement. IAS 1.19 réserve l'écart aux « circonstances extrêmement rares » où le respect d'une disposition serait trompeur au point d'être contraire à l'objectif des états financiers décrit dans le Cadre conceptuel, et seulement si le cadre réglementaire impose ou n'interdit pas l'écart. Le simple caractère « inadapté au secteur » n'atteint pas ce seuil : IAS 1.24 pose une présomption réfutable que si d'autres entités se conforment à la disposition dans des circonstances similaires, son respect n'est pas trompeur. Et même une dérogation fondée exigerait les informations d'IAS 1.20 : norme écartée, nature de l'écart, traitement imposé par la norme, raison pour laquelle il serait trompeur, traitement appliqué et effet financier chiffré pour chaque période présentée.",
      },
      {
        num: 3,
        enonce: "En l'absence de norme applicable à une transaction spécifique de son secteur, comment la société aurait-elle dû procéder ?",
        correction: "Par la hiérarchie d'IAS 8. Lorsqu'aucune IFRS ne s'applique spécifiquement, la direction exerce son jugement pour développer une méthode donnant une information pertinente et fiable — c'est-à-dire donnant une image fidèle, traduisant la réalité économique et non la seule forme juridique, neutre, prudente et complète (IAS 8.10). Elle se réfère d'abord aux dispositions des IFRS traitant de questions similaires et liées, puis aux définitions, critères de comptabilisation et concepts d'évaluation du Cadre conceptuel (IAS 8.11), et peut considérer les positions récentes d'autres normalisateurs à cadre similaire, la littérature et les pratiques du secteur (IAS 8.12). Ce chemin est l'inverse d'une mise à l'écart unilatérale d'une norme existante : IAS 36 s'appliquant spécifiquement aux dépréciations, IAS 8.7 impose de la suivre.",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue13',
  numero: 1,
  id: 'ue13-chapitre-1',
  titre: 'Fondements conceptuels, normalisation et architecture IFRS',
  sousTitre: "De la crise de 1929 au cadre conceptuel de l'IASB",
  infoBulle: "Chapitre 1 du module IFRS/IAS : pourquoi une normalisation internationale, l'architecture IFRS Foundation-IASB-ISSB, le due process, le cadre conceptuel et les caractéristiques générales d'IAS 1.",
  loiRef: "Cadre conceptuel IASB (2018) · IAS 1.15-34 · IAS 8.7-13 · Règlement (CE) n° 1606/2002",
  moduleLabel: 'UE 13 · IFRS / IAS',
  retourRoute: '/ue13-ifrs-ias',
  coursId: 'ue13-ifrs-ias',
  objectifs: [
    "Comprendre la nécessité de la normalisation comptable internationale et les limites des référentiels nationaux.",
    "Retracer l'histoire de la normalisation : crise de 1929, Securities Acts, IASC (1973), IASB (2001), adoption européenne (2005), ISSB (2021).",
    "Identifier les organes de l'IFRS Foundation (Monitoring Board, trustees, IASB, Interpretations Committee, ISSB) et le déroulement du due process.",
    "Maîtriser le cadre conceptuel : objectif de l'information financière, caractéristiques qualitatives, éléments des états financiers.",
    "Connaître les caractéristiques générales d'IAS 1 : image fidèle, conformité totale, dérogation exceptionnelle, continuité, engagement, importance relative, non-compensation.",
    "Opposer la logique investisseurs des IFRS à la logique du SYSCOHADA et situer la pratique congolaise (AUDCIF, GCEC-IFRS).",
  ],
  sections: SECTIONS,
  aRetenir: [
    "La normalisation internationale répond à l'incomparabilité des référentiels nationaux et à la mondialisation des capitaux ; la crise de 1929, crise de l'information comptable, a fondé le modèle anglo-saxon (Securities Acts de 1933-1934, SEC, normalisation déléguée à des organismes techniques indépendants).",
    "IASC créé en 1973, transformé en IASB en 2001 : les normes publiées depuis s'appellent IFRS, les IAS restant en vigueur tant qu'elles ne sont pas remplacées. L'Union européenne les impose aux comptes consolidés des sociétés cotées depuis 2005 (règlement (CE) n° 1606/2002).",
    "L'IFRS Foundation nomme et finance l'IASB (normes comptables) et l'ISSB (normes de durabilité IFRS S1/S2, 2023) ; l'Interpretations Committee publie les interprétations ; le Monitoring Board supervise la gouvernance sans toucher à la technique.",
    "Le Cadre conceptuel (2018) n'est pas une norme mais irrigue le référentiel : IAS 1.15 et IAS 8.11(b) y renvoient expressément pour les définitions et critères de comptabilisation. Caractéristiques fondamentales : pertinence et fidélité de la représentation.",
    "IAS 1 : image fidèle présumée par l'application des IFRS (1.15) ; conformité totale et déclaration explicite et sans réserve (1.16) ; dérogation réservée aux circonstances extrêmement rares avec informations détaillées (1.19-24) ; continuité évaluée sur au moins douze mois (1.25-26) ; comptabilité d'engagement (1.27) ; importance relative (1.29-31) ; non-compensation sauf norme contraire (1.32).",
    "IAS 8 : en présence d'une norme spécifique, on l'applique (8.7) ; à défaut, jugement encadré par la hiérarchie — normes similaires, puis Cadre conceptuel (8.10-12) — avec l'exigence de traduire la réalité économique et non la simple forme juridique (8.10(b)(ii)).",
    "IFRS = logique investisseurs, prospective, séparée de la fiscalité (d'où les impôts différés d'IAS 12) ; SYSCOHADA = tradition continentale, prudence et coût historique. En RDC : SYSCOHADA pour les entités OHADA, référentiel IFRS pour les établissements de crédit (GCEC-IFRS de la BCC).",
  ],
  references: [
    { genre: 'texte', intitule: "IAS 1 — Présentation des états financiers", precision: "§§ 15 à 34 : image fidèle et conformité, dérogation, continuité de l'exploitation, comptabilité d'engagement, importance relative, compensation" },
    { genre: 'texte', intitule: "IAS 8 — Méthodes comptables, changements dans les estimations comptables et erreurs", precision: "§§ 7 à 13 : sélection des méthodes comptables et hiérarchie des sources en l'absence de norme spécifique" },
    { genre: 'texte', intitule: "Cadre conceptuel de l'information financière (IASB, 2018)", precision: "chapitres 1 (objectif), 2 (caractéristiques qualitatives) et 4 (éléments des états financiers) — texte non encodé dans le corpus de la plateforme, cité au niveau des chapitres" },
    { genre: 'texte', intitule: "Règlement (CE) n° 1606/2002 du 19 juillet 2002 sur l'application des normes comptables internationales", precision: "IFRS obligatoires pour les comptes consolidés des sociétés cotées de l'UE à compter de 2005" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "IAS 1 et IAS 8 (texte français intégral) ; Cadre conceptuel de l'information financière (IASB, 2018) ; IFRS Foundation (histoire, gouvernance, due process) ; règlement (CE) n° 1606/2002.",
}

export default chapitre
