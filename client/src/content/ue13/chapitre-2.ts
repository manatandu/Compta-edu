import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 13 — Chapitre 2 : IAS 16 Immobilisations corporelles et IAS 38
// Immobilisations incorporelles
//
// Sources vérifiées sur texte : IAS 16 (§§ 1 à 76) et IAS 38 (§§ 1 à 133),
// lus dans la version française du corpus de référence de la plateforme.
// Les renvois au Cadre conceptuel sont donnés au niveau de ses chapitres
// (texte non encodé dans le corpus).
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'ue13c2-q1',
    question: "Selon IAS 16.7, quelles sont les deux conditions cumulatives pour comptabiliser une immobilisation corporelle en tant qu'actif ?",
    options: [
      { id: 'a', texte: "L'inscription au registre officiel de l'entité et une valeur supérieure à un seuil fixé par la norme" },
      { id: 'b', texte: "La probabilité que les avantages économiques futurs associés à l'élément iront à l'entité, et la possibilité d'évaluer son coût de façon fiable" },
      { id: 'c', texte: "Une durée d'utilité supérieure à cinq ans et un caractère non remplaçable" },
      { id: 'd', texte: "La propriété juridique de l'actif et son inscription au bilan fiscal" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 16.7 : « Le coût d'une immobilisation corporelle doit être comptabilisé en tant qu'actif si, et seulement si : (a) il est probable que les avantages économiques futurs associés à cet élément iront à l'entité ; et (b) le coût de cet élément peut être évalué de façon fiable. » Aucun seuil monétaire ni exigence de propriété juridique. La norme ne prescrit pas non plus l'unité d'évaluation : le jugement s'exerce, et les éléments de faible valeur (moules, outils, matrices) peuvent être regroupés (IAS 16.9).",
    articleRef: 'IAS 16.7 et 16.9',
  },
  {
    id: 'ue13c2-q2',
    question: "Parmi les éléments suivants, lequel ne fait PAS partie du coût d'entrée d'une immobilisation corporelle ?",
    options: [
      { id: 'a', texte: "Les frais de livraison et de manutention initiaux" },
      { id: 'b', texte: "Les droits de douane et taxes non remboursables" },
      { id: 'c', texte: "Les coûts des tests de bon fonctionnement" },
      { id: 'd', texte: "Les frais administratifs et autres frais généraux" },
    ],
    reponseCorrecte: 'd',
    explication: "IAS 16.19 exclut du coût : (a) les coûts d'ouverture d'une nouvelle installation ; (b) les coûts de lancement d'un nouveau produit ou service, y compris publicité et promotion ; (c) les coûts d'exploitation dans un nouveau lieu ou avec une nouvelle catégorie de clients, y compris la formation du personnel ; (d) les frais administratifs et autres frais généraux. Les livraisons, droits de douane et tests de bon fonctionnement sont au contraire inclus (IAS 16.16-17). S'y ajoutent les exclusions d'IAS 16.20 : coûts d'un actif prêt mais non encore mis en service, pertes d'exploitation initiales, coûts de relocalisation ou de restructuration.",
    articleRef: 'IAS 16.16-17, 16.19-20',
  },
  {
    id: 'ue13c2-q3',
    question: "Comment est évalué le coût d'une immobilisation corporelle payée à crédit au-delà des conditions habituelles (IAS 16.23) ?",
    options: [
      { id: 'a', texte: "Au montant total non actualisé des paiements futurs" },
      { id: 'b', texte: "Au prix catalogue du vendeur" },
      { id: 'c', texte: "Au prix comptant équivalent à la date de comptabilisation, la différence avec le total des paiements étant comptabilisée en charges financières sur la période de crédit" },
      { id: 'd', texte: "À la juste valeur à la date de livraison" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 16.23 : « Le coût d'une immobilisation corporelle est le prix comptant équivalent à la date de comptabilisation. Si le règlement est différé au-delà des conditions habituelles de crédit, la différence entre le prix comptant équivalent et le total des paiements est comptabilisée en charges financières sur la période de crédit, à moins que ces charges ne soient incorporées dans le coût de l'actif selon IAS 23. » IAS 38.32 pose exactement la même règle pour les incorporelles.",
    articleRef: 'IAS 16.23 ; IAS 38.32',
  },
  {
    id: 'ue13c2-q4',
    question: "Comment est comptabilisé un écart de réévaluation POSITIF sur une immobilisation corporelle (IAS 16.39) ?",
    options: [
      { id: 'a', texte: "En résultat net, comme produit des activités ordinaires" },
      { id: 'b', texte: "En résultat net, comme produit hors exploitation" },
      { id: 'c', texte: "Dans les autres éléments du résultat global et cumulé en capitaux propres sous la rubrique écarts de réévaluation — sauf dans la mesure où il compense une diminution du même actif précédemment comptabilisée en résultat net" },
      { id: 'd', texte: "En provision au passif, reprise lors de la cession" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 16.39 : l'augmentation est comptabilisée dans les autres éléments du résultat global et cumulée en capitaux propres sous la rubrique écarts de réévaluation ; « toutefois, l'augmentation doit être comptabilisée en résultat net dans la mesure où elle compense une diminution de réévaluation du même actif, précédemment comptabilisée en résultat net ». Symétriquement, IAS 16.40 impose la comptabilisation d'une diminution en résultat net, sauf dans la limite de l'écart de réévaluation créditeur du même actif (imputation en AERG).",
    articleRef: 'IAS 16.39-40',
  },
  {
    id: 'ue13c2-q5',
    question: "Que dit IAS 16.62A du mode d'amortissement fondé sur les produits ?",
    options: [
      { id: 'a', texte: "Il est recommandé pour les actifs de production" },
      { id: 'b', texte: "Il n'est pas approprié : les produits reflètent des facteurs autres que la consommation des avantages économiques de l'actif (intrants, volumes, prix, inflation)" },
      { id: 'c', texte: "Il est permis si l'auditeur l'approuve" },
      { id: 'd', texte: "Il est obligatoire pour les concessions" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 16.62A : « Il n'est pas approprié d'avoir recours, pour un actif utilisé dans une activité donnée, à un mode d'amortissement qui est fonction des produits tirés de cette activité », les produits reflétant habituellement d'autres facteurs (intrants et processus, activités de vente, volumes, prix, inflation). Attention à la nuance avec IAS 38 : pour les incorporelles, IAS 38.98A pose une présomption seulement réfutable, avec deux exceptions (incorporelle exprimée en mesure de produits, ou forte corrélation entre produits et consommation — 98A à 98C).",
    articleRef: 'IAS 16.62A ; IAS 38.98A-98C',
  },
  {
    id: 'ue13c2-q6',
    question: "Quel est le traitement obligatoire des dépenses de la phase de RECHERCHE d'un projet interne (IAS 38.54) ?",
    options: [
      { id: 'a', texte: "Capitalisation si les six critères du § 57 sont satisfaits" },
      { id: 'b', texte: "Capitalisation au-delà d'un seuil de signification" },
      { id: 'c', texte: "Comptabilisation en charges lorsqu'elles sont engagées, sans exception" },
      { id: 'd', texte: "Inscription en stocks jusqu'au terme du projet" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 38.54 : aucune immobilisation incorporelle résultant de la recherche (ou de la phase de recherche d'un projet interne) n'est comptabilisée ; les dépenses de recherche sont comptabilisées en charges lorsqu'elles sont engagées. IAS 38.55 en donne la raison : en phase de recherche, l'entité ne peut pas démontrer l'existence d'une immobilisation incorporelle qui générera des avantages économiques futurs probables. Et si l'entité ne peut pas distinguer les deux phases, tout est traité comme engagé en phase de recherche (IAS 38.53).",
    articleRef: 'IAS 38.53-55',
  },
  {
    id: 'ue13c2-q7',
    question: "Quels éléments générés en interne IAS 38.63 interdit-il de comptabiliser en immobilisations incorporelles ?",
    options: [
      { id: 'a', texte: "Les logiciels développés en interne" },
      { id: 'b', texte: "Les licences d'exploitation détenues par l'entité" },
      { id: 'c', texte: "Les marques, cartouches de titre, titres de publication, listes de clients et éléments similaires en substance" },
      { id: 'd', texte: "Les brevets déposés par l'entité" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 38.63 : « Marques, cartouches de titre, titres de publication, listes de clients et éléments similaires générés en interne ne doivent pas être comptabilisés en incorporelles. » Raison (IAS 38.64) : les dépenses engagées pour les générer ne peuvent pas être distinguées du coût de développement de l'entreprise dans son ensemble. Corollaire d'IAS 38.20 : même les dépenses ultérieures sur ces éléments — qu'ils soient acquis ou générés en interne — sont toujours comptabilisées en résultat net.",
    articleRef: 'IAS 38.20, 38.63-64',
  },
  {
    id: 'ue13c2-q8',
    question: "Quelle est la valeur résiduelle présumée d'une immobilisation incorporelle à durée d'utilité déterminée (IAS 38.100) ?",
    options: [
      { id: 'a', texte: "La juste valeur estimée en fin de durée d'utilité" },
      { id: 'b', texte: "10 % du coût historique, par prudence" },
      { id: 'c', texte: "Une valeur nulle, sauf engagement d'un tiers de racheter l'actif en fin de durée d'utilité, ou existence probable d'un marché actif permettant de la déterminer" },
      { id: 'd', texte: "La valeur recouvrable déterminée selon IAS 36" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 38.100 : la valeur résiduelle d'une immobilisation incorporelle à durée d'utilité déterminée est réputée nulle, sauf (a) engagement d'un tiers de racheter l'actif à la fin de sa durée d'utilité, ou (b) existence d'un marché actif permettant de la déterminer, probable à la fin de la durée d'utilité. Une valeur résiduelle non nulle implique d'ailleurs que l'entité s'attend à sortir l'actif avant la fin de sa vie économique (IAS 38.101).",
    articleRef: 'IAS 38.100-101',
  },
  {
    id: 'ue13c2-q9',
    question: "Quel est le régime d'une immobilisation incorporelle à durée d'utilité INDÉTERMINÉE ?",
    options: [
      { id: 'a', texte: "Amortissement linéaire forfaitaire sur 40 ans" },
      { id: 'b', texte: "Pas d'amortissement, mais un test de dépréciation IAS 36 annuel et à chaque indication de dépréciation, avec réexamen de la durée à chaque période" },
      { id: 'c', texte: "Amortissement sur la durée maximale fiscale" },
      { id: 'd', texte: "Évaluation à la juste valeur par résultat net" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 38.107 : une incorporelle à durée d'utilité indéterminée ne doit pas être amortie. IAS 38.108 impose de comparer sa valeur recouvrable à sa valeur comptable (IAS 36) annuellement et chaque fois qu'il y a une indication de dépréciation. La durée est réexaminée à chaque période, et le passage d'indéterminée à déterminée est traité en changement d'estimation (IAS 38.109) — indice, au demeurant, d'une possible dépréciation (IAS 38.110). « Indéterminée » ne signifie pas « infinie » (IAS 38.91).",
    articleRef: 'IAS 38.91, 38.107-110',
  },
  {
    id: 'ue13c2-q10',
    question: "Lors d'un échange d'actifs ayant une substance commerciale, comment le coût de l'actif reçu est-il évalué (IAS 16.24-26 ; IAS 38.45-47) ?",
    options: [
      { id: 'a', texte: "À la valeur comptable de l'actif cédé, majorée des frais" },
      { id: 'b', texte: "À la juste valeur — celle de l'actif cédé étant utilisée, sauf si la juste valeur de l'actif reçu est plus clairement évidente" },
      { id: 'c', texte: "À la valeur fiscale de l'actif cédé" },
      { id: 'd', texte: "À la valeur d'assurance des actifs échangés" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 16.24 (comme IAS 38.45) : le coût d'un actif acquis par échange est évalué à la juste valeur, sauf si l'opération n'a pas de substance commerciale ou si ni la juste valeur de l'actif reçu ni celle de l'actif cédé ne peut être évaluée de manière fiable — auquel cas le coût est la valeur comptable de l'actif cédé. Si l'entité peut évaluer de manière fiable l'une ou l'autre, « la juste valeur de l'actif cédé est alors utilisée pour évaluer le coût de l'actif reçu, sauf si la juste valeur de l'actif reçu est plus clairement évidente » (IAS 16.26 ; IAS 38.47). La substance commerciale s'apprécie par la modification attendue des flux de trésorerie (IAS 16.25).",
    articleRef: 'IAS 16.24-26 ; IAS 38.45-47',
  },
  {
    id: 'ue13c2-q11',
    question: "Pourquoi les profits de cession d'immobilisations ne doivent-ils pas être classés en produits des activités ordinaires (IAS 16.68 ; IAS 38.113) ?",
    options: [
      { id: 'a', texte: "Pour permettre aux utilisateurs de distinguer les résultats récurrents du cycle d'exploitation des gains ponctuels sur sorties d'actifs" },
      { id: 'b', texte: "Pour des raisons fiscales" },
      { id: 'c', texte: "Pour éviter une double comptabilisation avec les amortissements" },
      { id: 'd', texte: "Parce qu'ils sont comptabilisés en AERG" },
    ],
    reponseCorrecte: 'a',
    explication: "IAS 16.68 dispose que le profit ou la perte de décomptabilisation est inclus dans le résultat net et que « les profits ne doivent pas être classés en produits des activités ordinaires » (règle identique à IAS 38.113). Cette présentation préserve la valeur prédictive de l'information : les gains sur sorties d'actifs sont ponctuels et non représentatifs du cycle d'exploitation. Exception notable (IAS 16.68A) : l'entité qui, dans le cadre de ses activités ordinaires, vend habituellement des actifs qu'elle donnait en location transfère ces actifs en stocks et comptabilise le produit de leur vente en produits des activités ordinaires (IFRS 15).",
    articleRef: 'IAS 16.68-68A ; IAS 38.113',
  },
  {
    id: 'ue13c2-q12',
    question: "Des dépenses initialement passées en charges peuvent-elles être ultérieurement incorporées au coût d'une immobilisation incorporelle (IAS 38.71) ?",
    options: [
      { id: 'a', texte: "Oui, à titre de régularisation selon IAS 8" },
      { id: 'b', texte: "Oui, par retraitement rétrospectif" },
      { id: 'c', texte: "Non : les dépenses initialement comptabilisées en charges ne doivent pas être incorporées dans le coût d'une immobilisation incorporelle à une date ultérieure" },
      { id: 'd', texte: "Oui, avec l'accord du commissaire aux comptes" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 38.71 pose une interdiction absolue : les dépenses relatives à un élément incorporel initialement comptabilisées en charges ne doivent pas être incorporées ultérieurement dans le coût d'une immobilisation incorporelle. C'est le corollaire d'IAS 38.65 : le coût d'une incorporelle générée en interne est la somme des dépenses engagées à partir de la date à laquelle les critères des §§ 21, 22 et 57 ont été satisfaits pour la première fois. Cette irréversibilité empêche de « regonfler » le bilan a posteriori.",
    articleRef: 'IAS 38.65 et 38.71',
  },
  {
    id: 'ue13c2-q13',
    question: "Quand l'amortissement d'une immobilisation corporelle commence-t-il et quand cesse-t-il (IAS 16.55) ?",
    options: [
      { id: 'a', texte: "Il commence à la mise en service effective et cesse dès que l'actif est inutilisé" },
      { id: 'b', texte: "Il commence dès que l'actif est prêt à être mis en service et cesse à la plus rapprochée des dates de classement en détenu en vue de la vente (IFRS 5) ou de décomptabilisation — il ne cesse pas du seul fait que l'actif est laissé inutilisé" },
      { id: 'c', texte: "Il commence à la date de la facture" },
      { id: 'd', texte: "Il commence au 1er janvier suivant l'acquisition" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 16.55 : l'amortissement commence dès que l'actif « se trouve à l'endroit et dans l'état nécessaires pour pouvoir être exploité de la manière prévue par la direction », et cesse à la plus rapprochée des dates de classement en détenu en vue de la vente selon IFRS 5 ou de décomptabilisation. Il ne cesse donc pas lorsque l'actif est laissé inutilisé ou mis hors service, sauf s'il est entièrement amorti — mais en mode d'unités d'œuvre, la dotation peut être nulle en l'absence de production. Un amortissement est dû même si la juste valeur excède la valeur comptable, tant que la valeur résiduelle ne l'excède pas (IAS 16.52, 16.54).",
    articleRef: 'IAS 16.52, 16.54-55',
  },
  {
    id: 'ue13c2-q14',
    question: "Selon IAS 16.35, comment le cumul des amortissements est-il traité à la date de réévaluation ?",
    options: [
      { id: 'a', texte: "Il est nécessairement maintenu tel quel" },
      { id: 'b', texte: "Deux traitements sont possibles : ajuster la valeur comptable brute de manière cohérente avec la réévaluation (a), ou déduire le cumul des amortissements de la valeur comptable brute (b)" },
      { id: 'c', texte: "Il est transféré en résultat net" },
      { id: 'd', texte: "Il est transféré en écart de réévaluation" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 16.35 offre deux méthodes à la date de réévaluation : (a) ajuster la valeur comptable brute d'une manière qui concorde avec la réévaluation (par référence à des données de marché observables ou au prorata), le cumul des amortissements étant ajusté en conséquence ; ou (b) déduire le cumul des amortissements de la valeur comptable brute — l'actif repart alors avec un cumul nul. Dans les deux cas, l'ajustement fait partie de l'accroissement ou de la diminution traité selon les §§ 39-40. Lorsqu'un élément est réévalué, toute sa catégorie l'est aussi, simultanément ou par roulement rapide (IAS 16.36, 16.38).",
    articleRef: 'IAS 16.35-38',
  },
  {
    id: 'ue13c2-q15',
    question: "Comment l'écart de réévaluation cumulé en capitaux propres peut-il être « réalisé » (IAS 16.41) ?",
    options: [
      { id: 'a', texte: "Par transfert en résultat net lors de la cession" },
      { id: 'b', texte: "Par transfert direct en résultats non distribués — intégralement lors de la décomptabilisation, ou progressivement à hauteur de la différence entre l'amortissement sur valeur réévaluée et l'amortissement sur coût initial — sans jamais transiter par le résultat net" },
      { id: 'c', texte: "Par distribution immédiate de dividendes" },
      { id: 'd', texte: "Il ne peut jamais être transféré" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 16.41 : l'écart de réévaluation peut être transféré directement dans les résultats non distribués lors de la décomptabilisation de l'actif (transfert intégral en cas de mise hors service ou de sortie), ou au fur et à mesure de l'utilisation de l'actif — le montant transféré étant alors la différence entre l'amortissement basé sur la valeur comptable réévaluée et l'amortissement basé sur le coût initial. « Les transferts de la rubrique écart de réévaluation à la rubrique résultats non distribués ne se font pas par le biais du résultat net. » Les effets d'impôt suivent IAS 12 (IAS 16.42).",
    articleRef: 'IAS 16.41-42',
  },
  {
    id: 'ue13c2-q16',
    question: "Pour une immobilisation incorporelle acquise séparément, le critère de probabilité des avantages économiques futurs doit-il être démontré ?",
    options: [
      { id: 'a', texte: "Oui, par un plan d'affaires détaillé" },
      { id: 'b', texte: "Non : IAS 38.25 répute ce critère toujours satisfait pour une acquisition séparée, le prix payé reflétant les attentes d'avantages" },
      { id: 'c', texte: "Oui, sauf pour les logiciels" },
      { id: 'd', texte: "Non, mais l'actif doit alors être amorti sur cinq ans maximum" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 38.25 : le critère de probabilité (§ 21(a)) est toujours réputé satisfait pour une immobilisation incorporelle acquise séparément, et son coût peut généralement être évalué de façon fiable (§ 26). Le coût comprend le prix d'achat (droits de douane et taxes non remboursables, après remises et rabais) et les coûts directement attribuables à la préparation de l'actif en vue de son utilisation (§ 27) — honoraires, avantages du personnel, tests de bon fonctionnement (§ 28) — à l'exclusion des coûts de lancement, de formation et des frais généraux (§ 29). En regroupement d'entreprises, les deux critères sont réputés satisfaits et l'actif entre à sa juste valeur (§ 33).",
    articleRef: 'IAS 38.25-29, 38.33',
  },
  {
    id: 'ue13c2-q17',
    question: "Quels sont les six critères cumulatifs de capitalisation des dépenses de développement (IAS 38.57) ?",
    options: [
      { id: 'a', texte: "Faisabilité technique, intention d'achever, capacité de mettre en service ou vendre, génération d'avantages économiques futurs probables, disponibilité des ressources, capacité d'évaluer les dépenses de façon fiable" },
      { id: 'b', texte: "Rentabilité, solvabilité, liquidité, matérialité, prudence, régularité" },
      { id: 'c', texte: "Un marché coté, un brevet déposé, un financement bancaire, un prototype, une équipe dédiée, un audit" },
      { id: 'd', texte: "Il suffit de deux critères sur six" },
    ],
    reponseCorrecte: 'a',
    explication: "IAS 38.57 impose de démontrer TOUT ce qui suit : (a) la faisabilité technique de l'achèvement ; (b) l'intention d'achever et de mettre en service ou de vendre ; (c) la capacité de mettre en service ou de vendre ; (d) la façon dont l'incorporelle générera des avantages économiques futurs probables (existence d'un marché ou, en cas d'usage interne, de son utilité) ; (e) la disponibilité des ressources techniques, financières et autres ; (f) la capacité d'évaluer de façon fiable les dépenses attribuables. La démonstration des avantages suit les principes d'IAS 36 (§ 60), et le coût capitalisé court à compter de la date où les critères sont satisfaits pour la première fois (§ 65).",
    articleRef: 'IAS 38.57, 38.60, 38.65',
  },
  {
    id: 'ue13c2-q18',
    question: "Le modèle de la réévaluation est-il librement applicable aux immobilisations incorporelles ?",
    options: [
      { id: 'a', texte: "Oui, comme pour les corporelles" },
      { id: 'b', texte: "Non : la juste valeur doit être déterminée par référence à un marché actif, cas exceptionnel (licences de taxis ou de pêche, quotas librement cessibles) — impossible pour les marques, brevets ou droits d'édition, chacun étant unique" },
      { id: 'c', texte: "Non, il est interdit pour toutes les incorporelles" },
      { id: 'd', texte: "Oui, sur simple expertise indépendante" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 38.75 : le montant réévalué est la juste valeur déterminée par référence à un marché actif. IAS 38.78 : un tel marché est exceptionnel pour une incorporelle mais possible (licences de taxis, licences de pêche, quotas de production librement cessibles) ; il n'existe pas pour les marques, cartouches de titre, droits d'édition musicale et cinématographique, brevets ou marques commerciales, chacun de ces actifs étant unique. Le modèle ne permet ni de réévaluer des incorporelles non préalablement comptabilisées, ni une comptabilisation initiale à un montant autre que le coût (IAS 38.76). Les écarts suivent les §§ 85-86 (miroir d'IAS 16.39-40).",
    articleRef: 'IAS 38.75-78, 38.85-86',
  },
  {
    id: 'ue13c2-q19',
    question: "Que devient la valeur comptable du composant « inspection majeure » lors d'une nouvelle inspection (IAS 16.14 et 16.70) ?",
    options: [
      { id: 'a', texte: "Elle est conservée et cumulée avec le coût de la nouvelle inspection" },
      { id: 'b', texte: "Toute valeur comptable résiduelle du coût de la précédente inspection est décomptabilisée, et le coût de la nouvelle inspection est comptabilisé à titre de remplacement si les critères du § 7 sont satisfaits" },
      { id: 'c', texte: "Elle est transférée en charges constatées d'avance" },
      { id: 'd', texte: "Elle est virée en écart de réévaluation" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 16.14 : lorsque la poursuite de l'exploitation d'un actif (un avion, par exemple) est soumise à des inspections majeures régulières, le coût de chaque inspection est comptabilisé dans la valeur comptable à titre de remplacement, et toute valeur comptable résiduelle du coût de l'inspection précédente est décomptabilisée — que ce coût ait été identifié ou non à l'origine ; le coût estimé d'une inspection future similaire peut servir d'indication. IAS 16.70 généralise : la partie remplacée est décomptabilisée même si elle n'était pas amortie séparément, le coût de remplacement pouvant servir d'estimation de son coût d'origine.",
    articleRef: 'IAS 16.13-14, 16.70',
  },
  {
    id: 'ue13c2-q20',
    question: "Une équipe de personnel qualifié formée par l'entreprise peut-elle être comptabilisée en immobilisation incorporelle ?",
    options: [
      { id: 'a', texte: "Oui, à hauteur des coûts de formation engagés" },
      { id: 'b', texte: "Non, en règle générale : l'entité n'exerce pas un contrôle suffisant sur les avantages économiques attendus du personnel, qui peut quitter l'entreprise" },
      { id: 'c', texte: "Oui, si un plan de carrière est signé" },
      { id: 'd', texte: "Oui, dans la limite de 10 % des capitaux propres" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 38.15 : une équipe de personnes qualifiées ou les compétences issues d'un effort de formation ne satisfont généralement pas à la définition d'une immobilisation incorporelle, faute de contrôle suffisant sur les avantages économiques attendus — sauf protection par des droits établis. Le contrôle (IAS 38.13) est le pouvoir d'obtenir les avantages économiques futurs et d'en restreindre l'accès aux tiers ; il résulte normalement de droits juridiquement applicables. Même raisonnement pour un portefeuille de clients ou une part de marché sans droits établis (IAS 38.16) — sauf preuve de contrôle par des transactions d'échange sur ces relations. Les dépenses de formation sont toujours des charges (IAS 38.69(b)).",
    articleRef: 'IAS 38.13-16, 38.69',
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '2.1',
    titre: "IAS 16 : champ d'application, définitions et comptabilisation",
    navLabel: 'IAS 16 — Comptabilisation',
    blocs: [
      {
        type: 'paragraphe',
        texte: "IAS 16 prescrit le traitement comptable des **immobilisations corporelles** : comptabilisation des actifs, détermination de leur valeur comptable, dotations aux amortissements et pertes de valeur (IAS 16.1). Elle ne s'applique pas aux actifs classés comme détenus en vue de la vente (IFRS 5), aux actifs biologiques liés à une activité agricole autres que les plantes productrices (IAS 41), aux actifs de prospection et d'évaluation (IFRS 6) ni aux droits miniers et réserves minérales — mais elle s'applique aux immobilisations utilisées pour développer ou maintenir ces actifs (IAS 16.3).",
      },
      {
        type: 'carte',
        titre: 'Définitions clés (IAS 16.6)',
        liste: [
          "**Immobilisations corporelles** : actifs corporels détenus pour être utilisés dans la production ou la fourniture de biens ou de services, pour être loués à des tiers ou à des fins administratives, et dont on s'attend à ce qu'ils soient utilisés sur plus d'une période.",
          "**Valeur comptable** : montant comptabilisé après déduction du cumul des amortissements et du cumul des pertes de valeur.",
          "**Montant amortissable** : coût (ou montant substitué au coût) diminué de la valeur résiduelle.",
          "**Valeur résiduelle** : montant estimé que l'entité obtiendrait actuellement de la sortie de l'actif, net des coûts de sortie, si l'actif avait déjà l'âge et l'état prévus à la fin de sa durée d'utilité.",
          "**Durée d'utilité** : période d'utilisation attendue, ou nombre d'unités d'œuvre attendues de l'actif.",
        ],
      },
      { type: 'controle', question: QCM[0] },
      {
        type: 'paragraphe',
        texte: "Le principe de comptabilisation d'IAS 16.7 — probabilité des avantages économiques futurs et évaluation fiable du coût — s'applique à **tous** les coûts, initiaux comme ultérieurs (IAS 16.10). Trois applications structurantes : les actifs acquis pour des raisons de **sécurité ou d'environnement** sont des actifs, car ils permettent d'obtenir les avantages économiques des autres actifs (IAS 16.11) ; les **coûts d'entretien courant** (main-d'œuvre, consommables, petites pièces — la fonction « réparations et maintenance ») sont des charges (IAS 16.12) ; le **remplacement partiel** est capitalisé lorsque les critères sont satisfaits, la valeur comptable de la partie remplacée étant décomptabilisée (IAS 16.13), et les **inspections majeures** conditionnant la poursuite de l'exploitation sont traitées comme un composant remplacé à chaque inspection (IAS 16.14).",
      },
      {
        type: 'carte',
        titre: "Illustration — société FABRICO",
        texte: "FABRICO acquiert une machine industrielle : prix catalogue 80 000, transport et installation 4 200, formation du personnel 3 000. Coût d'entrée = 80 000 + 4 200 = **84 200** — la formation est exclue (IAS 16.19(c)). Écriture : débit Immobilisations corporelles 84 200 ; crédit Banque/Fournisseurs d'immobilisations 84 200. En N+3, une pièce majeure (valeur brute 10 000, amortissements cumulés 1 500, valeur comptable 8 500) est remplacée pour 12 000 : décomptabilisation — débit Amortissements cumulés 1 500, débit Perte sur sortie 8 500, crédit Immobilisations 10 000 (IAS 16.13 et 16.70) — puis capitalisation de la nouvelle pièce : débit Immobilisations 12 000, crédit Banque 12 000.",
      },
      { type: 'controle', question: QCM[18] },
    ],
  },
  {
    numero: '2.2',
    titre: "IAS 16 : l'évaluation initiale — les éléments du coût",
    navLabel: "IAS 16 — Coût d’entrée",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Une immobilisation corporelle qui remplit les conditions de comptabilisation est évaluée à son **coût** (IAS 16.15). Ce coût comprend trois composantes (IAS 16.16) : le **prix d'achat** — droits de douane et taxes non remboursables inclus, remises et rabais déduits — ; **tout coût directement attribuable** au transfert de l'actif jusqu'à son lieu d'exploitation et à sa mise en état pour l'exploitation prévue par la direction ; et l'**estimation initiale des coûts de démantèlement, d'enlèvement et de remise en état du site**, obligation comptabilisée et évaluée selon IAS 37 (IAS 16.18).",
      },
      {
        type: 'tableau',
        tableau: {
          entetes: ['Inclus dans le coût (IAS 16.17)', 'Exclus du coût (IAS 16.19-20)'],
          lignes: [
            [
              "Avantages du personnel résultant directement de la construction ou de l'acquisition (IAS 19) ; frais de préparation du site ; frais de livraison et de manutention initiaux ; frais d'installation et de montage ; coûts des tests de bon fonctionnement ; honoraires de professionnels.",
              "Coûts d'ouverture d'une nouvelle installation ; coûts de lancement d'un nouveau produit ou service (publicité, promotion) ; coûts d'exploitation dans un nouveau lieu ou avec une nouvelle clientèle (formation comprise) ; frais administratifs et frais généraux ; coûts d'un actif prêt mais non encore mis en service ; pertes d'exploitation initiales ; coûts de relocalisation ou de restructuration.",
            ],
          ],
        },
      },
      { type: 'controle', question: QCM[1] },
      {
        type: 'paragraphe',
        texte: "L'incorporation des coûts **cesse** lorsque l'actif se trouve à l'endroit et dans l'état nécessaires pour être exploité de la manière prévue par la direction (IAS 16.20). Les produits et coûts des éléments fabriqués pendant les tests (échantillons) sont comptabilisés en résultat net (IAS 16.20A), de même que les produits d'**opérations accessoires** non nécessaires — par exemple l'utilisation du terrain comme parking avant le début du chantier (IAS 16.21). Pour un actif **produit par l'entité pour elle-même**, les mêmes principes s'appliquent : profits internes éliminés, coûts anormaux de gaspillage exclus, coûts d'emprunt selon IAS 23 (IAS 16.22).",
      },
      {
        type: 'carte',
        titre: 'Paiement différé et échanges (IAS 16.23-26)',
        texte: "**Paiement différé** : le coût est le *prix comptant équivalent* à la date de comptabilisation ; la différence avec le total des paiements est une charge financière étalée sur la période de crédit (sauf incorporation selon IAS 23). Exemple : acompte de 100, puis 110 dans un an et 121 dans deux ans, taux de 10 % — coût = 100 + 110/1,10 + 121/1,21 = **300** ; la première année, une charge financière de 20 (10 % de 200) est constatée. **Échange d'actifs non monétaires** : coût à la juste valeur, sauf absence de substance commerciale ou impossibilité d'évaluer de manière fiable les deux justes valeurs — auquel cas le coût est la valeur comptable de l'actif cédé. La substance commerciale s'apprécie par la modification attendue de la configuration (risque, calendrier, montant) des flux de trésorerie (IAS 16.25).",
      },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[9] },
    ],
  },
  {
    numero: '2.3',
    titre: "IAS 16 : l'évaluation postérieure — coût ou réévaluation",
    navLabel: 'IAS 16 — Réévaluation',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Après la comptabilisation initiale, l'entité choisit, pour chaque **catégorie** d'immobilisations corporelles, entre le **modèle du coût** — coût diminué du cumul des amortissements et des pertes de valeur (IAS 16.30) — et le **modèle de la réévaluation** — juste valeur à la date de réévaluation, diminuée des amortissements et pertes de valeur ultérieurs, avec des réévaluations d'une régularité suffisante (IAS 16.29 et 16.31). Lorsqu'un élément est réévalué, toute sa catégorie l'est aussi (IAS 16.36), simultanément ou par roulement achevé dans un court délai (IAS 16.38) ; la fréquence dépend de la volatilité des justes valeurs — annuelle en cas de variations importantes, tous les trois à cinq ans sinon (IAS 16.34).",
      },
      {
        type: 'carte',
        titre: "Le traitement des écarts (IAS 16.39-41)",
        liste: [
          "**Écart positif** : en autres éléments du résultat global (AERG), cumulé en capitaux propres sous la rubrique écarts de réévaluation — sauf dans la mesure où il compense une diminution du même actif précédemment passée en résultat net (IAS 16.39).",
          "**Écart négatif** : en résultat net — sauf dans la limite de l'écart de réévaluation créditeur du même actif, où il s'impute en AERG (IAS 16.40).",
          "**Réalisation** : l'écart cumulé peut être transféré directement en résultats non distribués, intégralement lors de la décomptabilisation ou progressivement à hauteur de la différence entre l'amortissement sur valeur réévaluée et l'amortissement sur coût initial — jamais par le biais du résultat net (IAS 16.41). Les effets d'impôt suivent IAS 12 (IAS 16.42).",
        ],
      },
      { type: 'controle', question: QCM[3] },
      {
        type: 'carte',
        titre: 'Illustration — société REVALCO (cycle complet)',
        texte: "Immeuble acquis 100 000 au 01/01/N, durée 20 ans, linéaire, modèle de la réévaluation, méthode de l'écrasement du cumul (IAS 16.35(b)). **31/12/N+2** : cumul d'amortissements 10 000, valeur comptable 90 000 ; juste valeur 108 000 → écart **+18 000** en AERG. Écriture : débit Amortissements cumulés 10 000, débit Immobilisations 8 000, crédit Écart de réévaluation 18 000. **N+3** : nouvel amortissement 108 000 / 18 ans restants = 6 000 ; le supplément de 1 000 par rapport à l'amortissement sur coût historique (5 000) peut être transféré chaque année de l'écart de réévaluation vers les résultats non distribués (IAS 16.41). **31/12/N+3** : valeur comptable 102 000, juste valeur 88 200 → écart **−13 800**, imputé en totalité sur l'écart de réévaluation disponible (17 000 après transfert) : aucune charge en résultat net (IAS 16.40). Solde d'écart de réévaluation : 3 200.",
      },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[14] },
    ],
  },
  {
    numero: '2.4',
    titre: "IAS 16 : amortissement, composants et décomptabilisation",
    navLabel: 'IAS 16 — Amortissement',
    blocs: [
      {
        type: 'paragraphe',
        texte: "**Approche par composants** : chaque partie d'une immobilisation corporelle ayant un coût significatif par rapport au coût total doit être amortie séparément (IAS 16.43) — la cellule et les réacteurs d'un avion, par exemple (IAS 16.44). Les parties de durée et de mode identiques peuvent être regroupées (IAS 16.45), et le reliquat non significatif s'amortit par techniques d'approximation (IAS 16.46). Le **montant amortissable** — coût moins valeur résiduelle — est réparti systématiquement sur la durée d'utilité (IAS 16.50) ; valeur résiduelle et durée d'utilité sont révisées au moins à chaque fin d'exercice, tout changement étant un changement d'estimation comptable selon IAS 8 (IAS 16.51), traité de façon prospective.",
      },
      {
        type: 'carte',
        titre: "Durée d'utilité et modes d'amortissement (IAS 16.55-62A)",
        liste: [
          "**Début et fin** : l'amortissement commence dès que l'actif est prêt à être mis en service et cesse au classement en détenu en vue de la vente (IFRS 5) ou à la décomptabilisation ; il ne cesse pas du seul fait que l'actif est inutilisé (IAS 16.55).",
          "**Facteurs de la durée d'utilité** (IAS 16.56) : usage attendu, usure physique attendue, obsolescence technique ou commerciale, limites juridiques (expiration de contrats de location).",
          "**Terrains et constructions** : actifs distincts même acquis ensemble ; les terrains ne sont pas amortis (durée illimitée, sauf carrières et décharges), les constructions le sont ; la plus-value du terrain n'affecte pas le montant amortissable de la construction (IAS 16.58).",
          "**Modes** : linéaire, dégressif, unités d'œuvre — celui qui reflète le plus étroitement le rythme de consommation des avantages économiques (IAS 16.60, 16.62), réexaminé au moins à chaque fin d'exercice (IAS 16.61).",
          "**Mode fondé sur les produits** : « il n'est pas approprié » d'y recourir, les produits reflétant des facteurs étrangers à la consommation de l'actif — volumes, prix, inflation (IAS 16.62A).",
        ],
      },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[12] },
      {
        type: 'paragraphe',
        texte: "**Dépréciation** : IAS 16 renvoie intégralement à IAS 36 (IAS 16.63) ; les indemnisations de tiers pour des actifs dépréciés, perdus ou cédés sont des produits du résultat net lorsqu'elles deviennent exigibles, événements comptabilisés séparément de la dépréciation et du remplacement (IAS 16.65-66). **Décomptabilisation** : lors de la sortie, ou lorsqu'aucun avantage économique futur n'est attendu de l'utilisation ou de la sortie (IAS 16.67) ; la date de sortie est celle où l'acquéreur obtient le contrôle selon IFRS 15 (IAS 16.69). Le profit ou la perte — différence entre le produit net de sortie et la valeur comptable (IAS 16.71) — est inclus dans le résultat net, et **les profits ne doivent pas être classés en produits des activités ordinaires** (IAS 16.68) — sauf le cas particulier de l'entité qui vend habituellement des actifs auparavant loués, transférés en stocks (IAS 16.68A).",
      },
      {
        type: 'carte',
        titre: 'Illustration — cessions',
        texte: "**Cession avec profit** : machine au coût de 200 000, amortissements cumulés 150 000, prix de cession 80 000. Valeur comptable 50 000 ; profit = 80 000 − 50 000 = **+30 000**. Écriture : débit Amortissements cumulés 150 000, débit Banque 80 000 ; crédit Immobilisations 200 000, crédit Profit sur cession 30 000. **Cession à perte** : équipement au coût de 120 000, amortissements 80 000, prix 25 000 : perte = 25 000 − 40 000 = **−15 000**. Débit Amortissements 80 000, débit Banque 25 000, débit Perte sur cession 15 000 ; crédit Immobilisations 120 000.",
      },
      { type: 'controle', question: QCM[10] },
    ],
  },
  {
    numero: '2.5',
    titre: "IAS 38 : définition, critères et dépenses de recherche-développement",
    navLabel: 'IAS 38 — R&D',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Une **immobilisation incorporelle** est « un actif non monétaire identifiable sans substance physique » (IAS 38.8). Trois attributs commandent la définition : le caractère **identifiable** — l'actif est séparable, ou résulte de droits contractuels ou d'autres droits établis (IAS 38.12) —, le **contrôle** — pouvoir d'obtenir les avantages économiques futurs et d'en restreindre l'accès aux tiers, résultant normalement de droits juridiquement applicables (IAS 38.13) —, et l'existence d'**avantages économiques futurs** — produits, économies de coûts ou autres avantages (IAS 38.17). La comptabilisation exige en outre la probabilité des avantages et l'évaluation fiable du coût (IAS 38.21), appréciées par des hypothèses raisonnables et justifiables, en privilégiant les indications externes (IAS 38.22-23) ; l'évaluation initiale se fait au coût (IAS 38.24).",
      },
      { type: 'controle', question: QCM[19] },
      {
        type: 'carte',
        titre: "Les voies d’entrée d’une incorporelle",
        liste: [
          "**Acquisition séparée** (IAS 38.25-32) : critère de probabilité toujours réputé satisfait ; coût = prix d'achat + coûts directement attribuables ; paiement différé actualisé comme sous IAS 16.",
          "**Regroupement d'entreprises** (IAS 38.33-37) : comptabilisation séparée du goodwill à la juste valeur, y compris les projets de R&D en cours de l'entreprise acquise ; les deux critères de comptabilisation sont réputés satisfaits.",
          "**Subvention publique** (IAS 38.44) : droits d'atterrissage, licences, quotas — juste valeur ou valeur symbolique majorée des coûts directement attribuables (IAS 20).",
          "**Échange** (IAS 38.45-47) : juste valeur, sauf absence de substance commerciale ou justes valeurs non fiables (alors valeur comptable de l'actif cédé).",
          "**Goodwill généré en interne** : jamais comptabilisé en actif (IAS 38.48) — il n'est pas une ressource identifiable, contrôlée et évaluable au coût de façon fiable (IAS 38.49).",
        ],
      },
      { type: 'controle', question: QCM[15] },
      {
        type: 'paragraphe',
        texte: "Pour les incorporelles **générées en interne**, IAS 38.52 impose de distinguer la **phase de recherche** — investigation originale et programmée en vue d'acquérir des connaissances nouvelles — de la **phase de développement** — application de ces résultats à un plan ou modèle avant la production commerciale. Toute dépense de recherche est une **charge** (IAS 38.54), car l'entité ne peut pas encore démontrer l'existence d'une incorporelle générant des avantages probables (IAS 38.55) ; si les deux phases sont indistinguables, tout est réputé recherche (IAS 38.53). Les dépenses de développement ne sont capitalisées que si l'entité démontre **simultanément les six critères** d'IAS 38.57. Le coût capitalisé court à compter de la date où les critères sont satisfaits pour la première fois (IAS 38.65) et comprend les coûts directement attribuables — matériaux et services, avantages du personnel, honoraires d'enregistrement d'un droit, amortissement des brevets et licences utilisés (IAS 38.66) — à l'exclusion des frais de vente et généraux, des inefficacités et pertes initiales et de la formation du personnel (IAS 38.67).",
      },
      { type: 'controle', question: QCM[16] },
      { type: 'controle', question: QCM[5] },
      {
        type: 'filet',
        titre: 'Deux interdictions absolues',
        texte: "IAS 38.63 : les marques, cartouches de titre, titres de publication, listes de clients et éléments similaires en substance générés en interne ne sont jamais comptabilisés en immobilisations incorporelles — leurs dépenses ne peuvent pas être distinguées du coût de développement de l'entreprise dans son ensemble (IAS 38.64), et même leurs dépenses ultérieures restent toujours des charges (IAS 38.20). IAS 38.71 : les dépenses initialement comptabilisées en charges ne sont jamais réincorporées ultérieurement au coût d'une incorporelle. S'y ajoutent les charges par nature d'IAS 38.69 : coûts de démarrage, formation, publicité et promotion (catalogues compris), relocalisation et réorganisation.",
      },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[11] },
    ],
  },
  {
    numero: '2.6',
    titre: "IAS 38 : évaluation postérieure, durée d'utilité et sorties",
    navLabel: 'IAS 38 — Durée et sorties',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Après la comptabilisation initiale, l'entité choisit entre le **modèle du coût** (IAS 38.74) et le **modèle de la réévaluation** (IAS 38.75) — ce dernier subordonné à l'existence d'un **marché actif**, hypothèse exceptionnelle pour une incorporelle (IAS 38.78). La **durée d'utilité** est ensuite appréciée comme déterminée ou indéterminée (IAS 38.88) : indéterminée lorsque, au vu de tous les facteurs pertinents (IAS 38.90 : cycles de vie, obsolescence, stabilité du secteur, actions des concurrents, dépenses de maintenance, limites juridiques…), il n'y a pas de limite prévisible aux entrées nettes de trésorerie. La durée issue de droits contractuels n'excède pas leur période, renouvellements inclus seulement s'ils sont probables sans coût important (IAS 38.94, 38.96).",
      },
      { type: 'controle', question: QCM[17] },
      {
        type: 'tableau',
        tableau: {
          entetes: ["Durée d’utilité déterminée", "Durée d’utilité indéterminée"],
          lignes: [
            [
              "Amortissement systématique sur la durée d'utilité, dès que l'actif est prêt à être mis en service ; mode reflétant le rythme de consommation, linéaire à défaut (IAS 38.97-98). Valeur résiduelle réputée nulle sauf engagement de rachat d'un tiers ou marché actif (IAS 38.100). Durée et mode réexaminés au moins à chaque clôture (IAS 38.104).",
              "Pas d'amortissement (IAS 38.107) ; test de dépréciation IAS 36 annuel et à chaque indication (IAS 38.108) ; durée réexaminée à chaque période — le passage en durée déterminée est un changement d'estimation et un indice de dépréciation (IAS 38.109-110). « Indéterminée » ne signifie pas « infinie » (IAS 38.91).",
            ],
          ],
        },
      },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
      {
        type: 'filet',
        titre: "Le mode fondé sur les produits : présomption réfutable (IAS 38.98A-98C)",
        texte: "À la différence de l'interdiction sèche d'IAS 16.62A, IAS 38.98A pose une présomption réfutable : un mode d'amortissement fonction des produits n'est pas approprié — réfutable seulement si l'incorporelle est exprimée selon une mesure des produits, ou s'il existe une forte corrélation entre produits et consommation des avantages. IAS 38.98C illustre : une concession dont le contrat stipule un montant total déterminé de produits (concession minière limitée à un montant de produits cumulés, autoroute à péage plafonnée) peut être amortie sur cette base.",
      },
      {
        type: 'paragraphe',
        texte: "**Dépréciation** : renvoi intégral à IAS 36 (IAS 38.111). **Décomptabilisation** : lors de la sortie ou lorsqu'aucun avantage économique futur n'est attendu (IAS 38.112) ; le profit ou la perte — différence entre le produit net de sortie et la valeur comptable — est comptabilisé en résultat net, et les profits ne sont pas classés en produits des activités ordinaires (IAS 38.113). L'amortissement ne cesse pas du seul fait que l'incorporelle n'est plus utilisée (IAS 38.117). Côté annexe : indication, par catégorie, des durées, modes, valeurs brutes et rapprochements (IAS 38.118), des raisons d'une durée indéterminée (IAS 38.122) et du **montant total des dépenses de R&D comptabilisées en charges** de la période (IAS 38.126) — information précieuse pour évaluer l'effort de recherche que le bilan ne montre pas.",
      },
      {
        type: 'tableau',
        tableau: {
          entetes: ['Question', 'IAS 16 (corporelles)', 'IAS 38 (incorporelles)'],
          lignes: [
            ["Critères d'actif", 'Avantages probables + coût fiable (16.7)', 'Identifiable + contrôle + avantages (38.8-17), puis 38.21'],
            ['Coût initial', 'Prix + coûts directement attribuables + démantèlement (16.16)', "Prix + coûts directement attribuables (38.27) ; R&D : critères 38.57"],
            ['Réévaluation', 'Juste valeur fiable (16.31)', 'Marché actif exigé — exceptionnel (38.75, 38.78)'],
            ['Valeur résiduelle', 'Estimée, souvent négligeable (16.53)', 'Réputée nulle sauf exceptions (38.100)'],
            ['Non-amortissement', 'Terrains (16.58)', 'Durée indéterminée (38.107)'],
            ['Mode fondé sur les produits', 'Non approprié (16.62A)', 'Présomption réfutable, deux exceptions (38.98A-98C)'],
            ['Profits de cession', 'Jamais en produits ordinaires (16.68)', 'Jamais en produits ordinaires (38.113)'],
          ],
        },
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ue13c2-cp1',
    titre: "Acquisition d'une installation industrielle : paiement échelonné et démantèlement (IAS 16)",
    contexte: "MINEREX acquiert le 1er janvier N une installation de traitement minéralurgique : prix catalogue 500 000, payable 200 000 comptant, 165 000 au 31 décembre N et 181 500 au 31 décembre N+1 ; taux d'actualisation 10 %. Le contrat impose la remise en état du site après 20 ans d'exploitation (coût estimé en valeur actuelle : 80 000). Tests de bon fonctionnement : 15 000. Publicité de lancement : 25 000. Frais administratifs de la direction générale : 10 000.",
    questions: [
      {
        num: 1,
        enonce: "Déterminez le coût d'entrée de l'installation en appliquant IAS 16.16, 16.17, 16.19 et 16.23.",
        correction: "Paiement différé (IAS 16.23) : le coût est le prix comptant équivalent = 200 000 + 165 000/1,10 + 181 500/1,21 = 200 000 + 150 000 + 150 000 = 500 000. Sont inclus : les tests de bon fonctionnement, 15 000 (coût directement attribuable, IAS 16.17(e)) et l'estimation initiale des coûts de démantèlement et de remise en état, 80 000 (IAS 16.16(c), obligation comptabilisée selon IAS 37 par renvoi d'IAS 16.18). Sont exclus : la publicité de lancement, 25 000 (IAS 16.19(b)) et les frais administratifs, 10 000 (IAS 16.19(d)). Coût d'entrée total : 500 000 + 15 000 + 80 000 = 595 000.",
      },
      {
        num: 2,
        enonce: "Passez l'écriture de comptabilisation au 1er janvier N en identifiant chaque contrepartie.",
        correction: "Débit Immobilisations corporelles (installation) 595 000. Crédits : Banque 215 000 (acompte 200 000 + tests 15 000, si réglés comptant) ; Fournisseurs d'immobilisations 300 000 (valeur actuelle des deux échéances : 150 000 + 150 000) ; Provision pour remise en état de site (IAS 37) 80 000. La différence entre les paiements nominaux (346 500) et leur valeur actuelle (300 000) sera comptabilisée en charges financières sur la période de crédit (IAS 16.23) : 30 000 en N (10 % de 300 000) puis 16 500 en N+1 (10 % de 165 000 restants après paiement de la première échéance).",
      },
      {
        num: 3,
        enonce: "Fin N : entretien courant de 12 000, et remplacement d'un composant moteur (valeur brute 80 000, amortissements 60 000) par un moteur neuf de 95 000. Traitements selon IAS 16.12 et 16.13 ?",
        correction: "Entretien courant : charge de la période (IAS 16.12) — débit Charges d'entretien 12 000, crédit Banque 12 000. Remplacement : le coût du moteur neuf est capitalisé si les critères d'IAS 16.7 sont satisfaits, et la valeur comptable du composant remplacé est décomptabilisée (IAS 16.13, renvoyant aux §§ 67-72 ; IAS 16.70 précise que la décomptabilisation s'impose même si la partie n'était pas amortie séparément). Écritures : (1) débit Amortissements cumulés 60 000, débit Perte sur sortie de composant 20 000, crédit Immobilisations (moteur ancien) 80 000 ; (2) débit Immobilisations (moteur neuf) 95 000, crédit Banque 95 000.",
      },
      {
        num: 4,
        enonce: "Après trois ans, la direction porte la durée résiduelle de 17 à 22 ans et la valeur résiduelle de 0 à 50 000. Traitement selon IAS 16.51 ? Différence avec une correction d'erreur ?",
        correction: "IAS 16.51 impose de réviser la valeur résiduelle et la durée d'utilité au moins à chaque fin d'exercice ; les changements sont des changements d'estimation comptable selon IAS 8, traités de façon prospective : le nouvel amortissement se calcule sur la valeur comptable à la date de révision, diminuée de la nouvelle valeur résiduelle, répartie sur la nouvelle durée résiduelle — sans retoucher les exercices antérieurs. Une correction d'erreur relève au contraire d'un traitement rétrospectif (retraitement des périodes antérieures présentées) selon IAS 8 : la frontière tient à ce que l'estimation reposait sur les informations disponibles à l'époque (changement d'estimation) ou méconnaissait des informations disponibles et fiables (erreur).",
      },
      {
        num: 5,
        enonce: "L'installation est vendue pour 420 000 alors que sa valeur comptable est de 380 000. Analysez le résultat de cession et sa présentation (IAS 16.68 et 16.71).",
        correction: "Profit de cession = produit net de sortie − valeur comptable = 420 000 − 380 000 = +40 000 (IAS 16.71). Il est inclus dans le résultat net lors de la décomptabilisation, mais ne doit pas être classé en produits des activités ordinaires (IAS 16.68) : inclure ce gain dans le chiffre d'affaires ferait surestimer la rentabilité récurrente. Sa présentation séparée préserve la valeur prédictive de l'information — la pertinence, caractéristique qualitative fondamentale du Cadre conceptuel (2018, chapitre 2). La date de sortie est celle du transfert du contrôle selon IFRS 15 (IAS 16.69), et la provision de démantèlement suit son propre dénouement selon IAS 37.",
      },
    ],
  },
  {
    id: 'ue13c2-cp2',
    titre: "Logiciel développé en interne : recherche, développement, amortissement, abandon (IAS 38)",
    contexte: "TECHSOL développe en interne un logiciel de gestion destiné à être commercialisé. Phase de recherche du 1er février au 30 juin N : 120 000. À partir du 1er juillet N, les six critères d'IAS 38.57 sont tous satisfaits. Développement du 1er juillet au 31 décembre N : 280 000. Enregistrement du copyright : 8 500. Formation du personnel : 18 000. Publicité et promotion : 22 000.",
    questions: [
      {
        num: 1,
        enonce: "Qualifiez chaque dépense (charges ou immobilisation), avec le paragraphe applicable.",
        correction: "Phase de recherche, 120 000 : charges (IAS 38.54 — aucune incorporelle ne résulte de la recherche). Développement à compter du 1er juillet, 280 000 : capitalisé (IAS 38.57 : six critères démontrés ; IAS 38.65 : le coût court depuis la date où les critères sont satisfaits pour la première fois). Enregistrement du copyright, 8 500 : capitalisé (IAS 38.66(c) : honoraires d'enregistrement d'un droit établi). Formation du personnel, 18 000 : charges (IAS 38.67(c)). Publicité et promotion, 22 000 : charges (IAS 38.69 : dépenses de publicité et de promotion, catalogues compris). Total capitalisé : 288 500 ; total en charges : 160 000.",
      },
      {
        num: 2,
        enonce: "Passez les écritures au 31 décembre N.",
        correction: "(1) Charges : débit Charges de recherche et développement 120 000, débit Charges de formation 18 000, débit Charges de publicité 22 000 ; crédit Banque/Fournisseurs 160 000. (2) Incorporelle générée en interne : débit Immobilisations incorporelles — logiciel en cours 288 500 ; crédit, selon la pratique comptable, Production immobilisée (si les coûts sont d'abord passés en charges par nature) ou Banque/Fournisseurs (comptabilisation directe). IAS 38 fixe le montant capitalisable (§§ 57, 65-67) ; le schéma d'écriture par production immobilisée relève de la technique des plans de comptes, non du texte de la norme.",
      },
      {
        num: 3,
        enonce: "Le logiciel est achevé le 1er janvier N+1, durée d'utilité de quatre ans, valeur résiduelle nulle. Dotation et justification de la valeur résiduelle ?",
        correction: "Montant amortissable = 288 500 − 0 = 288 500 ; dotation linéaire = 288 500 / 4 = 72 125 par an (IAS 38.97 : mode reflétant le rythme de consommation, linéaire à défaut). Écriture : débit Dotation aux amortissements 72 125 ; crédit Amortissements cumulés 72 125. La valeur résiduelle est réputée nulle (IAS 38.100) : ni engagement de rachat d'un tiers, ni marché actif pour un logiciel propriétaire — chaque logiciel est unique, à l'image des actifs cités par IAS 38.78 comme dépourvus de marché actif.",
      },
      {
        num: 4,
        enonce: "En N+2, TECHSOL veut requalifier en développement les 120 000 de recherche initiale, au motif que les critères auraient pu être satisfaits dès mars N. Possible ?",
        correction: "Non. IAS 38.71 interdit d'incorporer ultérieurement au coût d'une incorporelle des dépenses initialement comptabilisées en charges — interdiction absolue, sans exception, corollaire d'IAS 38.65 qui fait courir le coût de la date à laquelle les critères ont été satisfaits pour la première fois. Cette irréversibilité protège la fiabilité de l'information : à défaut, une entité pourrait améliorer rétroactivement son bilan et son résultat en requalifiant des charges passées. Si TECHSOL estime avoir commis une erreur d'appréciation en N, encore faudrait-il démontrer qu'il s'agissait d'une erreur au sens d'IAS 8 (méconnaissance d'informations disponibles et fiables) et non d'un simple changement d'appréciation — la présomption jouant contre la requalification.",
      },
      {
        num: 5,
        enonce: "En N+3, TECHSOL abandonne le logiciel (valeur comptable 72 125, aucun produit de sortie). Analysez la décomptabilisation (IAS 38.112-113).",
        correction: "IAS 38.112 impose la décomptabilisation lors de la sortie ou lorsqu'aucun avantage économique futur n'est attendu de l'utilisation ou de la sortie — l'abandon relève de la seconde hypothèse. Écriture : débit Amortissements cumulés 216 375 (trois annuités de 72 125), débit Perte sur mise hors service 72 125 ; crédit Immobilisations incorporelles 288 500. Comparaison avec une cession : le profit ou la perte de cession est la différence entre le produit net de sortie et la valeur comptable, comptabilisée en résultat net sans classement des profits en produits des activités ordinaires (IAS 38.113) ; ici, faute de produit de sortie, la perte égale la valeur comptable résiduelle.",
      },
    ],
  },
  {
    id: 'ue13c2-cp3',
    titre: "Réévaluation d'un immeuble : cycle positif puis négatif (IAS 16.31-42)",
    contexte: "IMMOTECH détient un immeuble acquis le 1er janvier N−5 au coût de 1 200 000, amorti linéairement sur 40 ans. Au 31 décembre N (après six ans), la catégorie « immeubles » est réévaluée : juste valeur 1 380 000. La durée résiduelle est alors de 34 ans. Au 31 décembre N+2, le marché immobilier chute : juste valeur 900 000.",
    questions: [
      {
        num: 1,
        enonce: "Valeur comptable au 31 décembre N avant réévaluation, écart de réévaluation et traitement (IAS 16.39) ?",
        correction: "Amortissement annuel : 1 200 000 / 40 = 30 000 ; cumul après six ans : 180 000 ; valeur comptable : 1 020 000. Écart de réévaluation = 1 380 000 − 1 020 000 = +360 000. Traitement (IAS 16.39) : comptabilisation dans les autres éléments du résultat global et cumul en capitaux propres sous la rubrique écarts de réévaluation — pas de passage par le résultat net, aucune diminution antérieure du même actif n'ayant été constatée en résultat.",
      },
      {
        num: 2,
        enonce: "Passez l'écriture de réévaluation au 31 décembre N selon la méthode de l'écrasement du cumul (IAS 16.35(b)).",
        correction: "Étape 1 — annulation du cumul des amortissements : débit Amortissements cumulés 180 000, crédit Immobilisations corporelles 180 000. Étape 2 — ajustement à la juste valeur : débit Immobilisations corporelles 360 000, crédit Écart de réévaluation (AERG — capitaux propres) 360 000. Après réévaluation : valeur brute 1 380 000, cumul nul, valeur comptable 1 380 000. La méthode (a) d'IAS 16.35 — ajustement proportionnel de la valeur brute et du cumul — aurait produit la même valeur comptable avec une présentation brute différente.",
      },
      {
        num: 3,
        enonce: "Nouvel amortissement annuel après réévaluation et valeur comptable au 31 décembre N+2 avant la seconde réévaluation ?",
        correction: "Le montant réévalué s'amortit sur la durée résiduelle : 1 380 000 / 34 ≈ 40 588 par an. Valeur comptable au 31/12/N+1 : 1 339 412 ; au 31/12/N+2 : 1 298 824 (arrondis). En parallèle, l'entité peut transférer chaque année de l'écart de réévaluation vers les résultats non distribués la différence entre l'amortissement sur valeur réévaluée (≈ 40 588) et l'amortissement sur coût historique (30 000), soit ≈ 10 588 par an, sans transiter par le résultat net (IAS 16.41).",
      },
      {
        num: 4,
        enonce: "Au 31 décembre N+2, la juste valeur tombe à 900 000. Déterminez l'écart et son traitement (IAS 16.40), l'écart de réévaluation créditeur disponible étant, par hypothèse, de 360 000 (aucun transfert opéré).",
        correction: "Écart = 900 000 − 1 298 824 = −398 824. IAS 16.40 : la diminution s'impute d'abord, en autres éléments du résultat global, dans la limite de l'écart de réévaluation créditeur du même actif (360 000), le solde étant comptabilisé en résultat net : 398 824 − 360 000 = 38 824 en charges. Écriture (méthode 35(b)) : débit Écart de réévaluation 360 000, débit Perte de réévaluation (résultat net) 38 824, débit Amortissements cumulés 81 176 (annulation du cumul N+1 et N+2) ; crédit Immobilisations corporelles 480 000 (ramenant la valeur brute de 1 380 000 à 900 000). Après l'opération : valeur comptable 900 000, écart de réévaluation nul.",
      },
      {
        num: 5,
        enonce: "Analysez la logique économique de la symétrie IAS 16.39-40.",
        correction: "Les gains de réévaluation, non réalisés et réversibles, sont tenus à l'écart du résultat net : ils s'accumulent en capitaux propres via les AERG. Les pertes de réévaluation s'imputent d'abord sur ce coussin, et seul l'excédent frappe le résultat. Le système protège contre le biais optimiste (impossible de doper le bénéfice par une réévaluation à la hausse) comme contre la volatilité excessive (une baisse qui ne fait qu'annuler une hausse antérieure ne pénalise pas le résultat). La règle est mémorisée par asymétrie inversée : hausse → AERG sauf reprise d'une baisse passée en résultat ; baisse → résultat sauf existence d'un écart créditeur du même actif. Enfin, la réalisation de l'écart passe directement en résultats non distribués, jamais par le résultat net (IAS 16.41) : le résultat ne peut jamais « recycler » une réévaluation.",
      },
    ],
  },
  {
    id: 'ue13c2-cp4',
    titre: "Avion en composants : amortissements différenciés et inspection majeure (IAS 16.43-70)",
    contexte: "AEROTEC acquiert un avion commercial le 1er janvier N pour 15 000 000, décomposé en trois composants : cellule 9 000 000 (durée 25 ans, valeur résiduelle 1 500 000) ; moteurs 4 000 000 (durée 15 ans, valeur résiduelle 400 000, potentiel total 15 000 000 km) ; inspection majeure 2 000 000 (à renouveler tous les cinq ans). L'avion parcourt 800 000 km la première année.",
    questions: [
      {
        num: 1,
        enonce: "Pourquoi l'approche par composants s'impose-t-elle (IAS 16.43-44) ?",
        correction: "IAS 16.43 impose d'amortir séparément chaque partie d'une immobilisation dont le coût est significatif par rapport au coût total ; IAS 16.44 cite précisément la cellule et les réacteurs d'un avion. Les trois composants ont des rythmes de consommation radicalement différents (25 ans, 15 ans, 5 ans) : un amortissement global sur 25 ans sous-doterait les moteurs et l'inspection, surestimant le résultat des premières années et faussant la représentation de la consommation des avantages économiques. L'approche par composants assure aussi le traitement correct des renouvellements : capitalisation du nouveau composant et décomptabilisation de l'ancien (IAS 16.13, 16.70), l'inspection majeure étant elle-même un composant (IAS 16.14).",
      },
      {
        num: 2,
        enonce: "Calculez la dotation de l'année N : cellule et inspection en linéaire, moteurs en unités d'œuvre.",
        correction: "Cellule : (9 000 000 − 1 500 000) / 25 = 300 000. Moteurs (unités d'œuvre, IAS 16.62) : (4 000 000 − 400 000) × 800 000 / 15 000 000 = 192 000. Inspection : 2 000 000 / 5 = 400 000. Dotation totale N : 892 000. Justification (IAS 16.60) : le mode doit refléter le rythme de consommation des avantages — le kilométrage pour les moteurs, le temps pour la cellule, l'intervalle entre inspections pour le composant inspection. Le mode choisi est réexaminé au moins à chaque fin d'exercice (IAS 16.61).",
      },
      {
        num: 3,
        enonce: "En N+5, l'inspection majeure est réalisée pour 2 200 000. Écritures (IAS 16.13-14, 16.70) ?",
        correction: "Le composant inspection est entièrement amorti après cinq ans (valeur comptable nulle). (1) Décomptabilisation : débit Amortissements cumulés — inspection 2 000 000, crédit Immobilisations — inspection 2 000 000 (aucun résultat, la valeur comptable étant nulle ; si une valeur résiduelle avait subsisté, elle serait passée en perte, IAS 16.14). (2) Capitalisation de la nouvelle inspection : débit Immobilisations — inspection 2 200 000, crédit Banque/Fournisseurs 2 200 000, amortie sur cinq ans jusqu'à la suivante.",
      },
      {
        num: 4,
        enonce: "En N+8, la durée résiduelle de la cellule est portée à 20 ans et sa valeur résiduelle à 2 000 000. Nouvel amortissement (IAS 16.51) ?",
        correction: "Changement d'estimation comptable, prospectif (IAS 16.51 ; IAS 8). Valeur comptable de la cellule début N+8 : 9 000 000 − 7 × 300 000 = 6 900 000. Nouveau montant amortissable : 6 900 000 − 2 000 000 = 4 900 000, réparti sur 20 ans : 245 000 par an. Les exercices N à N+7 ne sont pas retraités ; seules les périodes courante et futures portent la nouvelle dotation.",
      },
      {
        num: 5,
        enonce: "Impact de l'approche par composants sur la qualité de l'information financière ?",
        correction: "Elle sert les deux caractéristiques qualitatives fondamentales du Cadre conceptuel (2018, chapitre 2). Pertinence : des dotations calées sur la consommation réelle de chaque composant éclairent les sorties de trésorerie futures (renouvellement des moteurs, inspections quinquennales) et la rentabilité récurrente. Fidélité de la représentation : les charges de la période reflètent la consommation effective des avantages, sans lissage artificiel. Elle sert aussi la comparabilité entre compagnies dont les flottes ont des structures différentes. Une comptabilisation globale sur 25 ans surestimerait le résultat des premières années puis ferait apparaître les renouvellements comme des charges brutales — une information trompeuse pour prêteurs et investisseurs.",
      },
    ],
  },
  {
    id: 'ue13c2-cp5',
    titre: "R&D pharmaceutique : frontières de la capitalisation (IAS 38)",
    contexte: "BIOTECH engage en N : (A) études épidémiologiques générales sans cible moléculaire : 200 000 ; (B) tests précliniques sur la molécule B7 : 350 000, dont 180 000 avant le 1er juillet et 170 000 après, les six critères d'IAS 38.57 étant satisfaits à compter du 1er juillet ; (C) dépôt de brevet B7 : 45 000 ; (D) formation des chercheurs à un nouvel équipement : 30 000 ; (E) acquisition d'une licence d'exploitation auprès d'un tiers : 280 000.",
    questions: [
      {
        num: 1,
        enonce: "Classez chaque dépense avec le paragraphe applicable.",
        correction: "(A) 200 000 en charges : phase de recherche (IAS 38.54 ; IAS 38.56(a) — obtention de connaissances nouvelles). (B) 180 000 avant le 1er juillet en charges (IAS 38.54) ; 170 000 après en immobilisation (IAS 38.57 et 38.65 — le coût court de la date où les critères sont satisfaits). (C) 45 000 capitalisés (IAS 38.66(c) : honoraires d'enregistrement d'un droit établi). (D) 30 000 en charges (IAS 38.67(c) : formation du personnel pour exploiter l'actif). (E) 280 000 capitalisés : acquisition séparée (IAS 38.25-27), critère de probabilité réputé satisfait. Total capitalisé : 170 000 + 45 000 + 280 000 = 495 000 ; total charges : 410 000.",
      },
      {
        num: 2,
        enonce: "Passez les écritures au 31 décembre N.",
        correction: "(1) Charges : débit Charges de R&D 380 000 (A + B avant le 1er juillet), débit Charges de formation 30 000 ; crédit Banque 410 000. (2) Immobilisations : débit Immobilisations incorporelles — brevet B7 en cours 215 000 (développement 170 000 + dépôt 45 000), débit Immobilisations incorporelles — licence 280 000 ; crédit Banque 495 000 (ou production immobilisée pour la part générée en interne, selon la technique de comptabilisation retenue).",
      },
      {
        num: 3,
        enonce: "Pourquoi la divulgation d'IAS 38.126 est-elle fondamentale pour une société pharmaceutique ?",
        correction: "IAS 38.126 impose d'indiquer le montant total des dépenses de R&D comptabilisées en charges de la période (dépenses directement attribuables, IAS 38.127). Dans la pharmacie, l'essentiel de la valeur future — le pipeline — naît de dépenses passées en charges (phase de recherche obligatoirement, développement tant que les critères ne sont pas démontrés) : le bilan sous-représente l'effort d'innovation, et le résultat des sociétés à forte R&D en est mécaniquement pénalisé. La divulgation restaure l'information : l'investisseur peut mesurer l'intensité de recherche et corriger ses comparaisons intersectorielles — le biais étant réel face à des secteurs où la capitalisation est plus aisée (le logiciel, où IAS 38.57 se démontre plus tôt).",
      },
      {
        num: 4,
        enonce: "En N+5, un générique rend B7 obsolète : valeur recouvrable 50 000 pour une valeur comptable de 129 000. Traitement (IAS 38.111 ; IAS 36) ?",
        correction: "IAS 38.111 renvoie à IAS 36 pour la dépréciation. Perte de valeur = 129 000 − 50 000 = 79 000, comptabilisée en résultat net : débit Dotation pour dépréciation 79 000 ; crédit Dépréciation cumulée — brevet B7 79 000. L'amortissement ultérieur se recalcule sur la nouvelle base de 50 000 sur la durée résiduelle — la perte de valeur pouvant d'ailleurs signaler que la durée d'amortissement doit être revue (raisonnement analogue à IAS 38.105 côté durée). Une reprise ultérieure est possible dans les conditions d'IAS 36, dans la limite de la valeur comptable nette qui aurait existé sans dépréciation.",
      },
      {
        num: 5,
        enonce: "Le conseil d'administration veut inscrire à l'actif la marque « B7 » créée en interne, estimée à 500 000. Analysez (IAS 38.63-64).",
        correction: "Impossible. IAS 38.63 interdit de comptabiliser en immobilisations incorporelles les marques générées en interne (avec cartouches de titre, titres de publication, listes de clients et éléments similaires) ; IAS 38.64 en donne la raison : leurs dépenses ne peuvent pas être distinguées du coût de développement de l'entreprise dans son ensemble. L'évaluation de 500 000 par le conseil est au surplus une auto-évaluation subjective, contraire à la fidélité de la représentation (information neutre et vérifiable — Cadre conceptuel 2018, chapitre 2) : l'admettre permettrait de gonfler les bilans et d'améliorer artificiellement les ratios d'endettement au détriment des prêteurs. Même les dépenses ultérieures sur ces éléments restent toujours des charges (IAS 38.20). Seule une marque acquise — séparément ou dans un regroupement d'entreprises — entre à l'actif, à son coût ou à sa juste valeur (IAS 38.25-27, 38.33-34).",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue13',
  numero: 2,
  id: 'ue13-chapitre-2',
  titre: 'IAS 16 et IAS 38 : les immobilisations',
  sousTitre: "Immobilisations corporelles et incorporelles : comptabilisation, évaluation, amortissement",
  infoBulle: "Chapitre 2 du module IFRS/IAS : IAS 16 (immobilisations corporelles — coût d'entrée, réévaluation, composants, décomptabilisation) et IAS 38 (immobilisations incorporelles — critères, recherche-développement, durée d'utilité).",
  loiRef: 'IAS 16 §§ 1-76 · IAS 38 §§ 1-133',
  moduleLabel: 'UE 13 · IFRS / IAS',
  retourRoute: '/ue13-ifrs-ias',
  coursId: 'ue13-ifrs-ias',
  objectifs: [
    "Appliquer les conditions de comptabilisation d'une immobilisation corporelle (IAS 16.7) et l'unité d'évaluation par jugement (IAS 16.9).",
    "Composer le coût d'entrée : éléments inclus et exclus (IAS 16.16-20), paiement différé (16.23), échanges (16.24-26), démantèlement (16.16(c) et IAS 37).",
    "Maîtriser les deux modèles d'évaluation postérieure et le traitement symétrique des écarts de réévaluation (IAS 16.29-42).",
    "Pratiquer l'amortissement par composants, la révision des estimations et la décomptabilisation (IAS 16.43-72).",
    "Appliquer la définition et les critères d'IAS 38 (identifiable, contrôle, avantages) et la frontière recherche/développement (IAS 38.51-67).",
    "Distinguer durées d'utilité déterminée et indéterminée, valeur résiduelle présumée nulle et régimes de sortie (IAS 38.88-117).",
  ],
  sections: SECTIONS,
  aRetenir: [
    "IAS 16.7 : comptabilisation en actif si, et seulement si, les avantages économiques futurs sont probables et le coût évaluable de façon fiable — les mêmes critères gouvernent coûts initiaux et ultérieurs (16.10) : entretien courant en charges (16.12), remplacements partiels et inspections majeures capitalisés avec décomptabilisation de la partie remplacée (16.13-14, 16.70).",
    "Coût d'entrée (16.16) : prix d'achat net de remises + coûts directement attribuables + estimation initiale des coûts de démantèlement (IAS 37) ; exclusions strictes (16.19-20) : lancement, formation, frais généraux, pertes initiales. Paiement différé : prix comptant équivalent, le surplus en charges financières (16.23).",
    "Évaluation postérieure par catégorie : modèle du coût (16.30) ou de la réévaluation (16.31). Écart positif en AERG (sauf reprise d'une baisse antérieure en résultat), écart négatif en résultat (sauf imputation sur l'écart créditeur du même actif) — 16.39-40 ; réalisation de l'écart directement en résultats non distribués, jamais par le résultat net (16.41).",
    "Amortissement par composants significatifs (16.43-44) ; début dès que l'actif est prêt, pas d'arrêt pour simple inutilisation (16.55) ; terrains non amortis (16.58) ; mode reflétant la consommation des avantages, le mode fondé sur les produits n'étant pas approprié (16.60, 16.62A) ; révision des estimations prospective (16.51).",
    "Décomptabilisation à la sortie ou en l'absence d'avantages futurs (16.67) ; profit = produit net − valeur comptable (16.71), en résultat net mais jamais en produits des activités ordinaires (16.68).",
    "IAS 38 : incorporelle = actif non monétaire identifiable sans substance physique (38.8), exigeant séparabilité ou droits (38.12), contrôle (38.13) et avantages futurs. Recherche = toujours des charges (38.54) ; développement capitalisé sur démonstration simultanée des six critères de 38.57, à compter de cette date seulement (38.65).",
    "Interdictions : goodwill interne (38.48), marques et listes de clients générées en interne (38.63), réincorporation de charges passées (38.71). Réévaluation subordonnée à un marché actif, exceptionnel (38.75, 38.78).",
    "Durée déterminée : amortissement, valeur résiduelle réputée nulle (38.100) ; durée indéterminée : pas d'amortissement mais test IAS 36 annuel (38.107-108). Mode fondé sur les produits : présomption réfutable avec deux exceptions (38.98A-98C). Annexe : total des dépenses de R&D en charges (38.126).",
  ],
  references: [
    { genre: 'texte', intitule: 'IAS 16 — Immobilisations corporelles', precision: "§§ 1-28 (champ, définitions, comptabilisation, coût), 29-42 (modèles du coût et de la réévaluation), 43-62A (amortissement et composants), 63-76 (dépréciation, décomptabilisation, informations)" },
    { genre: 'texte', intitule: 'IAS 38 — Immobilisations incorporelles', precision: "§§ 1-32 (définition, critères, acquisition séparée), 33-50 (regroupements, subventions, échanges, goodwill interne), 51-71 (recherche et développement), 72-117 (évaluation postérieure, durée d'utilité, sorties), 118-128 (informations à fournir)" },
    { genre: 'texte', intitule: 'Normes liées', precision: "IAS 36 (dépréciation), IAS 37 (provisions de démantèlement), IAS 23 (coûts d’emprunt), IFRS 5 (actifs détenus en vue de la vente), IFRS 13 (juste valeur), IFRS 15 (date de sortie), IFRS 16 (cession-bail)" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "IAS 16 et IAS 38, texte français intégral (corpus IFRS de la plateforme) ; Cadre conceptuel de l'information financière (IASB, 2018), cité au niveau de ses chapitres.",
}

export default chapitre
