import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 13 — Chapitre 1 : Fondements, cadre conceptuel et architecture des IFRS
//
// Sources lues sur texte pendant la rédaction :
// - IAS 1 (texte français intégral) : § 7 (définitions, dont « significatif »
//   et l'obscurcissement), §§ 15 à 38 (caractéristiques générales).
// - IAS 8 (texte français intégral) : § 5 (définitions), §§ 7 à 14.
// - IAS 7 §§ 18-19 (méthodes directe et indirecte).
// - IFRS 13 (texte intégral de la traduction française officielle) : § 9,
//   §§ 15-26, 27-33, 57-60, 61-90, annexe A, § B27-B30 ; les passages entre
//   guillemets le reproduisent à l'identique.
// - IFRS 18, annexe C § C8 et annexe D (texte anglais intégral) : IFRS 18
//   remplace IAS 1, amendements applicables au 1er janvier 2027.
// - AUDCIF (2017) : art. 8, 73-1, 75, 113 ; Cadre conceptuel du SYSCOHADA
//   révisé (Titre V : utilisateurs, postulats, conventions, caractéristiques
//   qualitatives, actif, valeur actuelle, maintien du capital).
// - Rapport ROSC Comptabilité et audit RDC (Banque mondiale, 2010), ch. 3.
// - Support de cours d'origine : J.-B. Tshimanga Mulumba (CPCC), « Normes
//   comptables internationales (IAS/IFRS) », module 1 : fondements
//   conceptuels, normalisation internationale, lecture africaine et contexte
//   de la RDC. Public visé : entreprises commerciales et industrielles.
// - Cadre conceptuel révisé de 2018 : texte officiel anglais (IFRS Foundation),
//   encodé dans le skill ifrs (references/cadre-conceptuel-2018/). Cité par
//   numéro de paragraphe ; les citations françaises en sont des traductions
//   de travail.
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'ue13c1-q1',
    question: "Selon le Cadre conceptuel, à qui s'adresse en priorité l'information financière à usage général ?",
    options: [
      { id: 'a', texte: "À l'administration fiscale, pour asseoir l'impôt" },
      { id: 'b', texte: "Aux investisseurs, aux prêteurs et aux autres créanciers, actuels et potentiels, pour leurs décisions de fourniture de ressources à l'entité" },
      { id: 'c', texte: "À la banque centrale, pour le contrôle prudentiel" },
      { id: 'd', texte: "À l'ensemble des parties prenantes, sans hiérarchie, selon une pertinence partagée" },
    ],
    reponseCorrecte: 'b',
    explication: "Le Cadre de 2018 (§ 1.2) fixe pour objectif de fournir des informations utiles aux investisseurs, aux prêteurs et aux autres créanciers actuels et potentiels pour leurs décisions sur la fourniture de ressources à l'entité. Il précise que d'autres parties, comme les autorités de réglementation, peuvent trouver ces rapports utiles, mais qu'ils ne leur sont pas prioritairement destinés (§ 1.10). La version de 2010 disait la même chose aux paragraphes OB2 et OB10. La « pertinence partagée » (réponse d) est la position du cadre conceptuel du SYSCOHADA révisé, pas celle de l'IASB.",
    articleRef: "Cadre conceptuel (2018), § 1.2, 1.5 et 1.10",
  },
  {
    id: 'ue13c1-q2',
    question: "Selon IAS 1.7 et IAS 8.5, que recouvre l'expression « IFRS » ?",
    options: [
      { id: 'a', texte: "Uniquement les normes publiées depuis 2001" },
      { id: 'b', texte: "Les IFRS, les IAS, les interprétations IFRIC et les interprétations SIC" },
      { id: 'c', texte: "Les IFRS et le Cadre conceptuel" },
      { id: 'd', texte: "Les IFRS, les IAS et les bases de conclusions" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.7 et IAS 8.5 définissent les IFRS comme « les normes et interprétations publiées par l'International Accounting Standards Board (IASB) », comprenant (a) les Normes internationales d'information financière, (b) les Normes comptables internationales, (c) les interprétations IFRIC et (d) les interprétations SIC. Le Cadre conceptuel n'en fait pas partie : il n'est pas une norme et, en cas de conflit, la norme l'emporte (Cadre, § SP1.2).",
    articleRef: "IAS 1.7 ; IAS 8.5",
  },
  {
    id: 'ue13c1-q3',
    question: "Une SA dont les actions sont inscrites à une bourse de valeurs d'un État partie de l'OHADA établit ses comptes annuels. Que lui impose l'article 8 de l'AUDCIF ?",
    options: [
      { id: 'a', texte: "De remplacer les états SYSCOHADA par des états IFRS" },
      { id: 'b', texte: "D'établir des états financiers selon les normes IFRS en sus des états SYSCOHADA" },
      { id: 'c', texte: "De choisir librement entre SYSCOHADA et IFRS" },
      { id: 'd', texte: "D'établir des états IFRS seulement si elle consolide des filiales" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 8, alinéa 4, de l'AUDCIF dispose que les entités dont les titres sont inscrits à une bourse de valeurs et celles qui sollicitent un financement par appel public à l'épargne doivent établir et présenter leurs états financiers annuels selon les normes IFRS « en sus » des états SYSCOHADA. Les deux jeux coexistent ; aucun ne remplace l'autre.",
    articleRef: "AUDCIF, art. 8 al. 4",
  },
  {
    id: 'ue13c1-q4',
    question: "Les états financiers IFRS d'une société cotée de l'espace OHADA font apparaître un résultat de 900 millions, contre 700 millions dans ses états SYSCOHADA. Sur quelle base l'assemblée apprécie-t-elle le bénéfice distribuable ?",
    options: [
      { id: 'a', texte: "Sur les états IFRS, plus favorables" },
      { id: 'b', texte: "Sur la moyenne des deux résultats" },
      { id: 'c', texte: "Pas sur les états IFRS : ils sont destinés exclusivement aux marchés financiers et ne peuvent servir de base au bénéfice distribuable" },
      { id: 'd', texte: "Au choix du conseil d'administration" },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 8, alinéa 5, de l'AUDCIF est sans ambiguïté : les états IFRS « sont destinés exclusivement aux marchés financiers. Ils ne peuvent servir de support de base pour la détermination du bénéfice distribuable » visé par l'AUSCGIE. Le législateur OHADA a ainsi neutralisé un risque bien réel : distribuer des profits de juste valeur non réalisés.",
    articleRef: "AUDCIF, art. 8 al. 5",
  },
  {
    id: 'ue13c1-q5',
    question: "Quelle affirmation sur la dérogation d'IAS 1.19 est FAUSSE ?",
    options: [
      { id: 'a', texte: "Elle suppose que le respect de la disposition serait trompeur au point d'être contraire à l'objectif des états financiers" },
      { id: 'b', texte: "Elle n'est possible que si le cadre réglementaire l'impose ou ne l'interdit pas" },
      { id: 'c', texte: "Elle oblige à chiffrer, pour chaque période présentée, l'effet de l'écart sur chaque élément concerné" },
      { id: 'd', texte: "Elle est ouverte dès que la direction juge une norme mal adaptée à son secteur d'activité" },
    ],
    reponseCorrecte: 'd',
    explication: "La dérogation est réservée aux « circonstances extrêmement rares » (IAS 1.19). Surtout, IAS 1.24(b) pose une présomption réfutable : si, dans des circonstances similaires, d'autres entités se conforment à la disposition, son respect n'est pas réputé trompeur. Une norme « mal adaptée au secteur » est par définition appliquée par les autres entités du secteur. Les réponses a, b et c reprennent fidèlement IAS 1.19 et 1.20(d).",
    articleRef: "IAS 1.19, 1.20 et 1.24",
  },
  {
    id: 'ue13c1-q6',
    question: "Une société industrielle déclare en note : « Les états financiers sont préparés conformément aux IFRS. La norme IFRS 16 n'a pas pu être appliquée. » Que dit IAS 1.16 de cette déclaration ?",
    options: [
      { id: 'a', texte: "Elle est valable, puisque l'écart est expliqué en note" },
      { id: 'b', texte: "Elle est valable si le commissaire aux comptes l'accepte" },
      { id: 'c', texte: "Elle est contradictoire : on ne peut décrire des états comme conformes aux IFRS que s'ils sont conformes à toutes les dispositions des IFRS" },
      { id: 'd', texte: "Elle est valable pendant une période transitoire de deux ans" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 1.16 exige une déclaration « explicite et sans réserve » de conformité, et l'entité « ne doit décrire des états financiers comme étant conformes aux IFRS que s'ils sont conformes à toutes les dispositions des IFRS ». IAS 1.18 ajoute que des méthodes inappropriées ne se corrigent pas par des notes. Ni l'explication, ni l'accord d'un tiers ne rendent conformes des états qui ne le sont pas : une mention « conformes aux IFRS, à l'exception d'IFRS 16 » n'est pas une déclaration de conformité.",
    articleRef: "IAS 1.16 et 1.18",
  },
  {
    id: 'ue13c1-q7',
    question: "Selon IAS 1.7, une information est « obscurcie » lorsque…",
    options: [
      { id: 'a', texte: "elle figure dans les notes plutôt que dans le corps des états" },
      { id: 'b', texte: "elle est communiquée de telle manière que son effet sur les principaux utilisateurs est similaire à celui de son omission ou de son inexactitude" },
      { id: 'c', texte: "elle est rédigée dans une autre langue que celle du siège" },
      { id: 'd', texte: "elle n'a pas été auditée" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.7 ajoute l'obscurcissement à l'omission et à l'inexactitude dans la définition du caractère significatif. Elle en donne cinq cas : formulation nébuleuse, information dispersée, regroupement inapproprié d'éléments dissemblables, ventilation inappropriée d'éléments semblables, informations non significatives qui dissimulent les informations significatives. Noyer le lecteur est une manière de lui cacher l'essentiel.",
    articleRef: "IAS 1.7 (définition de « significatif »)",
  },
  {
    id: 'ue13c1-q8',
    question: "Un actif se vend sur deux marchés. Marché X : prix 104, coûts de transaction 6, transport 4. Marché Y : prix 100, coûts de transaction 1, transport 4. Il n'existe pas de marché principal. Quelle est la juste valeur selon IFRS 13 ?",
    options: [
      { id: 'a', texte: "104" },
      { id: 'b', texte: "100" },
      { id: 'c', texte: "96" },
      { id: 'd', texte: "95" },
    ],
    reponseCorrecte: 'c',
    explication: "Sans marché principal, on retient le marché le plus avantageux, celui qui maximise le prix net reçu après coûts de transaction et frais de transport : X donne 104 − 6 − 4 = 94, Y donne 100 − 1 − 4 = 95. Le marché Y l'emporte. Mais la juste valeur n'est pas ajustée des coûts de transaction (§ 25) ; elle l'est des frais de transport lorsque la localisation est une caractéristique de l'actif (§ 26). Juste valeur = 100 − 4 = 96.",
    articleRef: "IFRS 13.16-26 et annexe A",
  },
  {
    id: 'ue13c1-q9',
    question: "Même énoncé, mais le marché X est le marché principal de l'actif (volume d'activité le plus élevé). Quelle est la juste valeur ?",
    options: [
      { id: 'a', texte: "94, prix net de tous les coûts" },
      { id: 'b', texte: "96, comme sur le marché le plus avantageux" },
      { id: 'c', texte: "104, prix brut du marché X" },
      { id: 'd', texte: "100" },
    ],
    reponseCorrecte: 'd',
    explication: "Quand un marché principal existe, son prix prévaut, même si un autre marché serait plus avantageux à la date d'évaluation (IFRS 13.18). Sur X, la juste valeur est 104, diminuée des seuls frais de transport (4), soit 100. Les coûts de transaction (6) ne sont jamais déduits. Le marché le plus avantageux n'est qu'un marché de repli, en l'absence de marché principal.",
    articleRef: "IFRS 13.18 et 13.25-26",
  },
  {
    id: 'ue13c1-q10',
    question: "Une obligation non cotée est évaluée par actualisation de flux contractuels, avec un taux intégrant un écart de crédit estimé par la direction faute de donnée observable, cet écart étant important pour l'évaluation. À quel niveau de la hiérarchie se classe la juste valeur ?",
    options: [
      { id: 'a', texte: "Niveau 1" },
      { id: 'b', texte: "Niveau 2" },
      { id: 'c', texte: "Niveau 3" },
      { id: 'd', texte: "Aucun : ce n'est pas une juste valeur" },
    ],
    reponseCorrecte: 'c',
    explication: "La hiérarchie classe les données d'entrée, non les techniques. Le classement global se fait au niveau de la donnée d'entrée la plus basse qui est importante pour la juste valeur prise dans son ensemble (IFRS 13.73). Un écart de crédit non observable et important fait basculer l'évaluation au niveau 3, même si les autres données (taux sans risque, flux contractuels) sont observables.",
    articleRef: "IFRS 13.72-75 et 13.86-90",
  },
  {
    id: 'ue13c1-q11',
    question: "Un flux attendu dans un an s'élève à 780. Le taux sans risque est de 5 % et les intervenants du marché exigent une prime de risque de 3 %. Quelle est la juste valeur, arrondie ?",
    options: [
      { id: 'a', texte: "743" },
      { id: 'b', texte: "757" },
      { id: 'c', texte: "722" },
      { id: 'd', texte: "780" },
    ],
    reponseCorrecte: 'c',
    explication: "Méthode 2 de l'espérance de la valeur actualisée : on actualise le flux attendu au taux sans risque majoré de la prime de risque systématique, 780 / 1,08 ≈ 722. La méthode 1 donne le même résultat par un autre chemin : on convertit le flux en équivalent certain (722 × 1,05 ≈ 758, soit une déduction d'environ 22 pour le risque), puis on l'actualise au taux sans risque. La réponse a (780 / 1,05) oublie la prime de risque.",
    articleRef: "IFRS 13.B27-B30",
  },
  {
    id: 'ue13c1-q12',
    question: "Selon IAS 8.11, dans quel ordre la direction consulte-t-elle les sources lorsqu'aucune IFRS ne s'applique spécifiquement ?",
    options: [
      { id: 'a', texte: "Pratiques du secteur, puis Cadre conceptuel, puis normes similaires" },
      { id: 'b', texte: "Normes traitant de questions similaires et liées, puis définitions, critères de comptabilisation et concepts d'évaluation du Cadre conceptuel" },
      { id: 'c', texte: "Règles fiscales nationales, puis Cadre conceptuel" },
      { id: 'd', texte: "US GAAP, puis normes similaires" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 8.11 énumère deux sources « par ordre décroissant » : (a) les dispositions des IFRS traitant de questions similaires et liées ; (b) les définitions, critères de comptabilisation et concepts d'évaluation du Cadre conceptuel. Les positions d'autres normalisateurs, la littérature et les pratiques du secteur (IAS 8.12) ne viennent qu'en appoint facultatif (« peut également considérer »), et seulement si elles ne contredisent pas ces deux sources.",
    articleRef: "IAS 8.10-12",
  },
  {
    id: 'ue13c1-q13',
    question: "Parmi les qualités qu'IAS 8.10(b) exige d'une méthode développée par jugement, laquelle n'y figure PAS ?",
    options: [
      { id: 'a', texte: "Traduire la réalité économique et non simplement la forme juridique" },
      { id: 'b', texte: "Être neutre" },
      { id: 'c', texte: "Être prudente" },
      { id: 'd', texte: "Être conforme au traitement fiscal" },
    ],
    reponseCorrecte: 'd',
    explication: "IAS 8.10(b) exige des informations fiables en ce sens que les états financiers (i) présentent une image fidèle, (ii) traduisent la réalité économique et non simplement la forme juridique, (iii) sont neutres, (iv) sont prudents, (v) sont complets dans tous leurs aspects significatifs. La conformité fiscale n'y figure pas : comptabilité IFRS et fiscalité sont délibérément dissociées, et IAS 12 gère ensuite l'écart par les impôts différés.",
    articleRef: "IAS 8.10(b)",
  },
  {
    id: 'ue13c1-q14',
    question: "Une entité a arrondi à la baisse, volontairement, une provision de quelques milliers de francs, sans effet significatif, pour afficher un résultat « rond ». Que dit IAS 8.8 ?",
    options: [
      { id: 'a', texte: "C'est admis : l'écart n'est pas significatif" },
      { id: 'b', texte: "C'est inapproprié : on ne peut faire, ou laisser subsister, des écarts non significatifs dans le but de parvenir à une présentation particulière" },
      { id: 'c', texte: "C'est admis si l'auditeur l'accepte" },
      { id: 'd', texte: "C'est une erreur qui impose un retraitement rétrospectif" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 8.8 dispense d'appliquer une méthode dont l'effet n'est pas significatif. Mais la même phrase ferme la porte à l'abus : « il est inapproprié de faire, ou de ne pas corriger, des écarts non significatifs par rapport aux IFRS en vue de parvenir à une présentation particulière ». L'intention suffit à disqualifier l'écart, si minime soit-il.",
    articleRef: "IAS 8.8",
  },
  {
    id: 'ue13c1-q15',
    question: "Selon le Cadre conceptuel de 2018, faut-il que l'entrée d'avantages économiques soit probable pour qu'un actif existe ?",
    options: [
      { id: 'a', texte: "Oui, elle doit être au moins probable" },
      { id: 'b', texte: "Non : il suffit d'un droit qui a le potentiel de produire des avantages économiques ; une faible probabilité pèse sur la décision de comptabiliser, pas sur l'existence de l'actif" },
      { id: 'c', texte: "Oui, elle doit être certaine" },
      { id: 'd', texte: "La question ne se pose que pour les actifs financiers" },
    ],
    reponseCorrecte: 'b',
    explication: "Le Cadre de 2018 définit l'actif comme « a present economic resource controlled by the entity as a result of past events » (§ 4.3), la ressource économique étant « a right that has the potential to produce economic benefits » (§ 4.4). Le § 4.14 précise qu'il n'est pas nécessaire que les avantages soient certains, « or even likely ». La probabilité intervient au stade de la comptabilisation, parmi les facteurs qui peuvent rendre l'information peu pertinente (§ 5.15-5.17). Le cadre conceptuel du SYSCOHADA révisé a repris cette définition d'une « ressource économique actuelle contrôlée » (Titre V, ch. 4).",
    articleRef: "Cadre 2018, § 4.3, 4.4, 4.14 et 5.15-5.17 ; SYSCOHADA révisé, Titre V",
  },
  {
    id: 'ue13c1-q16',
    question: "Le cadre conceptuel du SYSCOHADA révisé retient l'image fidèle comme caractéristique essentielle. Quelle composante de l'image fidèle écarte-t-il, à la différence de l'IASB ?",
    options: [
      { id: 'a', texte: "L'exhaustivité" },
      { id: 'b', texte: "L'absence d'erreurs" },
      { id: 'c', texte: "La neutralité, en raison de la primauté de la convention de prudence" },
      { id: 'd', texte: "La comparabilité" },
    ],
    reponseCorrecte: 'c',
    explication: "Le cadre conceptuel du SYSCOHADA révisé ne retient pas la neutralité comme caractéristique de l'image fidèle, en raison de la primauté de la convention de prudence (art. 3 et 6 AUDCIF). L'IASB fait l'inverse : l'information fidèle est complète, neutre et exempte d'erreurs (§ 2.13), et « neutrality is supported by the exercise of prudence », la prudence étant définie comme « the exercise of caution when making judgements under conditions of uncertainty » (§ 2.16). Le § 2.17 ajoute qu'elle n'implique aucune asymétrie systématique. La comparabilité (d) est une caractéristique auxiliaire dans les deux référentiels.",
    articleRef: "SYSCOHADA révisé, cadre conceptuel, ch. 3 ; Cadre 2018, § 2.13-2.17",
  },
  {
    id: 'ue13c1-q17',
    question: "Combien d'applications du postulat de prééminence de la réalité économique sur l'apparence juridique le SYSCOHADA révisé retient-il ?",
    options: [
      { id: 'a', texte: "Aucune : c'est un principe général sans liste" },
      { id: 'b', texte: "Quatre : réserve de propriété, location-acquisition, effets escomptés non échus, personnel facturé par d'autres entités" },
      { id: 'c', texte: "Cinq, dont les biens du concédant chez le concessionnaire" },
      { id: 'd', texte: "Deux : crédit-bail et affacturage" },
    ],
    reponseCorrecte: 'b',
    explication: "Le SYSCOHADA révisé fait de la prééminence de la réalité une « application limitée » en quatre cas : biens sous clause de réserve de propriété, biens en location-acquisition, effets remis à l'escompte non échus, personnel facturé par d'autres entités. L'ancien cinquième cas (biens du concédant chez le concessionnaire) a été supprimé. Sous IFRS, la même idée est un principe général, que la méthode développée par jugement doit respecter (IAS 8.10(b)(ii)) et qui s'applique aux définitions du Cadre.",
    articleRef: "SYSCOHADA révisé, cadre conceptuel, postulats ; IAS 8.10(b)(ii)",
  },
  {
    id: 'ue13c1-q18',
    question: "À la clôture, la direction d'une société minière du Haut-Katanga envisage de fermer le site dans quatre mois, faute de financement. Selon IAS 1.25, que doit-elle faire ?",
    options: [
      { id: 'a', texte: "Rien de particulier, la continuité est toujours présumée" },
      { id: 'b', texte: "Si aucune autre solution réaliste n'existe, ne pas retenir la base de continuité, l'indiquer avec la base retenue et la raison ; à défaut, au minimum indiquer les incertitudes significatives" },
      { id: 'c', texte: "Attendre l'avis du commissaire aux comptes avant toute décision" },
      { id: 'd', texte: "Évaluer la continuité sur les seuls quatre mois restants" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.25 impose à la direction d'évaluer elle-même la capacité à poursuivre l'exploitation. La base de continuité est écartée si la direction a l'intention de liquider ou de cesser l'activité ou si aucune autre solution réaliste ne s'offre à elle ; ce fait est alors indiqué, avec la base retenue et la raison. En présence d'incertitudes significatives, elles doivent être indiquées. L'horizon d'évaluation porte au minimum sur douze mois à compter de la clôture (IAS 1.26), pas sur quatre.",
    articleRef: "IAS 1.25-26",
  },
  {
    id: 'ue13c1-q19',
    question: "Selon IAS 1.33, laquelle de ces présentations N'EST PAS une compensation ?",
    options: [
      { id: 'a', texte: "Présenter une créance client nette de la dette envers le même client, sans droit juridique de compensation" },
      { id: 'b', texte: "Présenter les stocks nets de la dépréciation pour obsolescence" },
      { id: 'c', texte: "Présenter le chiffre d'affaires net des achats" },
      { id: 'd', texte: "Présenter les intérêts reçus nets des intérêts payés, significatifs, sans norme l'autorisant" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 1.33 précise que « l'évaluation d'actifs nets de réductions de valeur (par exemple des réductions de valeur au titre de l'obsolescence des stocks et de créances douteuses) n'est pas une compensation ». Les trois autres présentations sont des compensations, interdites par IAS 1.32 sauf si une IFRS les impose ou les autorise.",
    articleRef: "IAS 1.32-33",
  },
  {
    id: 'ue13c1-q20',
    question: "Une entreprise commence l'exercice avec des capitaux propres de 1 000, entièrement placés en 100 unités de marchandises. Elle les revend 1 500. L'inflation de l'exercice est de 20 % et le coût de remplacement d'une unité passe à 13. Quel résultat dégage le maintien du capital physique ?",
    options: [
      { id: 'a', texte: "500" },
      { id: 'b', texte: "300" },
      { id: 'c', texte: "200" },
      { id: 'd', texte: "0" },
    ],
    reponseCorrecte: 'c',
    explication: "En capital physique, il faut d'abord reconstituer la capacité de production de début d'exercice, soit 100 unités au coût actuel de 13, c'est-à-dire 1 300. Le résultat est donc 1 500 − 1 300 = 200. En capital financier nominal, le résultat serait 500 ; en capital financier à pouvoir d'achat constant, 1 500 − 1 000 × 1,20 = 300. Le concept de maintien du capital fournit le point de référence à partir duquel on mesure le résultat (Cadre 2018, § 8.4), et le maintien du capital physique impose l'évaluation au coût actuel (§ 8.5).",
    articleRef: "Cadre 2018, § 8.1-8.5",
  },
  {
    id: 'ue13c1-q21',
    question: "Quel concept de maintien du capital le SYSCOHADA révisé retient-il ?",
    options: [
      { id: 'a', texte: "Le capital physique" },
      { id: 'b', texte: "Le capital financier en pouvoir d'achat constant" },
      { id: 'c', texte: "Le capital financier en francs courants, avec exclusion des gains de détention, sauf pour les devises détenues et les instruments financiers" },
      { id: 'd', texte: "Aucun, la question relevant du droit des sociétés" },
    ],
    reponseCorrecte: 'c',
    explication: "Le cadre conceptuel du SYSCOHADA révisé retient le maintien du capital financier, en francs courants, avec exclusion des gains de détention, sauf pour les devises détenues et les instruments financiers. Le Cadre de l'IASB fonde le choix du concept sur les besoins des utilisateurs (§ 8.2), la plupart des entités adoptant le capital financier (§ 8.1).",
    articleRef: "SYSCOHADA révisé, cadre conceptuel, ch. 5 ; Cadre 2018, § 8.1-8.2",
  },
  {
    id: 'ue13c1-q22',
    question: "Qu'annonce l'annexe C d'IFRS 18, § C8 ?",
    options: [
      { id: 'a', texte: "IFRS 18 complète IAS 1 sans la remplacer" },
      { id: 'b', texte: "IFRS 18 remplace IAS 1 (« This Standard supersedes IAS 1 »)" },
      { id: 'c', texte: "IFRS 18 remplace IAS 8" },
      { id: 'd', texte: "IFRS 18 ne s'applique qu'aux sociétés d'assurance" },
    ],
    reponseCorrecte: 'b',
    explication: "Le § C8 d'IFRS 18 (Presentation and Disclosure in Financial Statements) énonce : « This Standard supersedes IAS 1. » L'annexe D fixe l'application des amendements corrélatifs aux exercices ouverts à compter du 1er janvier 2027. Les caractéristiques générales étudiées dans ce chapitre (image fidèle, continuité, engagement) ne disparaissent pas pour autant : IFRS 18 les reprend ou les transfère, point traité au chapitre 8.",
    articleRef: "IFRS 18, § C8 et annexe D",
  },
  {
    id: 'ue13c1-q23',
    question: "Une filiale congolaise d'un groupe étranger tient ses comptes en SYSCOHADA et les retraite chaque année en IFRS pour la consolidation de sa mère. Quelle est la limite de ce retraitement de fin d'exercice ?",
    options: [
      { id: 'a', texte: "Aucune : c'est la méthode prévue par les IFRS" },
      { id: 'b', texte: "Il convertit après coup des données saisies pour un autre référentiel : sans informations collectées dès l'origine (composants, historique des pertes, justes valeurs), certains retraitements reposent sur des estimations fragiles" },
      { id: 'c', texte: "Il est interdit par l'AUDCIF" },
      { id: 'd', texte: "Il dispense la filiale de tenir des comptes SYSCOHADA" },
    ],
    reponseCorrecte: 'b',
    explication: "Retraiter en fin d'exercice est légitime, mais c'est traduire ; basculer, c'est collecter et saisir l'information selon les IFRS dès l'origine. Une approche par composants (IAS 16.43), une matrice de pertes de crédit fondée sur l'historique des créances (IFRS 9, B5.5.35) ou une évaluation à la juste valeur exigent des données que la comptabilité SYSCOHADA ne produit pas spontanément. Le retraitement ne dispense pas des comptes SYSCOHADA : l'article 8 de l'AUDCIF fait des IFRS des états établis « en sus ».",
    articleRef: "AUDCIF art. 8 ; IAS 16.43 ; IFRS 9, B5.5.35",
  },
  {
    id: 'ue13c1-q24',
    question: "Selon le ROSC Comptabilité et audit de la Banque mondiale (2010), quel était l'objectif premier du Plan comptable général congolais de 1976 ?",
    options: [
      { id: 'a', texte: "Informer les investisseurs étrangers" },
      { id: 'b', texte: "Répondre aux besoins de l'État en matière de statistiques nationales" },
      { id: 'c', texte: "Converger vers les IAS" },
      { id: 'd', texte: "Encadrer la consolidation des groupes" },
    ],
    reponseCorrecte: 'b',
    explication: "Le ROSC relève que le PCGC « avait d'abord pour objectif premier de répondre aux besoins de l'État en matière de statistiques nationales » : les besoins des investisseurs n'y étaient pas une priorité. Il notait aussi l'absence de cadre conceptuel, l'absence de toute règle de consolidation et la seule présentation des charges par nature. Le Cadre de l'IASB en prend exactement le contre-pied.",
    articleRef: "ROSC RDC 2010, ch. 3, § 42",
  },
  {
    id: 'ue13c1-q25',
    question: "Selon IAS 8.9, un guide d'application qui accompagne une IFRS est-il obligatoire ?",
    options: [
      { id: 'a', texte: "Toujours" },
      { id: 'b', texte: "Jamais" },
      { id: 'c', texte: "Seulement s'il précise qu'il fait partie intégrante de la norme" },
      { id: 'd', texte: "Seulement pour les sociétés cotées" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 8.9 : « Chaque guide précise s'il fait ou non partie intégrante des IFRS. Les guides faisant partie intégrante des IFRS sont obligatoires. » Les autres ne contiennent pas de dispositions obligatoires. Réflexe du praticien : lire l'en-tête d'une annexe avant de la citer comme obligatoire.",
    articleRef: "IAS 8.9",
  },
  {
    id: 'ue13c1-q26',
    question: "Quelle différence la norme IAS 7 fait-elle, par rapport au SYSCOHADA révisé, pour la présentation des flux liés aux activités opérationnelles ?",
    options: [
      { id: 'a', texte: "Aucune : les deux imposent la méthode indirecte" },
      { id: 'b', texte: "IAS 7 laisse le choix entre méthode directe et indirecte et encourage la directe ; le SYSCOHADA révisé impose l'indirecte" },
      { id: 'c', texte: "IAS 7 impose la méthode directe" },
      { id: 'd', texte: "IAS 7 ne traite pas des flux opérationnels" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 7.18 permet la méthode directe (principales catégories d'entrées et de sorties brutes) ou la méthode indirecte (résultat net ajusté). IAS 7.19 encourage la directe, qui apporte des informations utiles pour estimer les flux futurs, non disponibles par la méthode indirecte. Le cadre conceptuel du SYSCOHADA révisé impose au contraire la méthode indirecte pour les flux opérationnels.",
    articleRef: "IAS 7.18-19 ; SYSCOHADA révisé, cadre conceptuel",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '1.1',
    titre: "Genèse et logique de la normalisation comptable internationale",
    navLabel: 'Genèse',
    blocs: [
      {
        type: 'paragraphe',
        texte: "La comptabilité est un langage de communication financière : elle traduit la réalité économique de l'entreprise en une information destinée à éclairer des décisions. Ce langage n'est jamais neutre quant à ses fins, car il dépend des destinataires qu'il privilégie. Pendant la plus grande partie du XXe siècle, chaque pays a fixé ses propres règles, sous l'influence de sa fiscalité et de sa tradition juridique, de sorte que les états financiers restaient difficilement comparables d'un pays à l'autre. La mondialisation des échanges, la croissance des groupes multinationaux et la mobilité des capitaux ont rendu cette diversité coûteuse pour les investisseurs, et c'est de ce besoin de comparabilité qu'est née la normalisation comptable internationale.",
      },
      { type: 'intertitre', texte: "1.1.1 Les grandes écoles de normalisation" },
      {
        type: 'paragraphe',
        texte: "La doctrine distingue traditionnellement trois écoles. L'école franco-germanique a construit des plans comptables au service de l'État, du fisc et du créancier, avec une forte dépendance entre comptabilité et fiscalité. L'école socialiste a fait de la comptabilité un instrument de planification de l'économie. L'école anglo-saxonne, enfin, a confié l'élaboration des normes à des organismes privés chargés de protéger l'investisseur. En 1984, l'économiste zaïrois Kinzonzi Mvutukidi a consacré sa thèse, *La normalisation comptable* (Foucher, préface de Pierre Lauzel), à la comparaison de ces trois écoles, afin d'en tirer un modèle de plan comptable adapté aux pays en développement.",
      },
      {
        type: 'paragraphe',
        texte: "Le modèle anglo-saxon trouve son origine dans la crise de 1929, qui fut aussi une crise de l'information financière : de nombreuses sociétés cotées américaines publiaient des comptes non audités, établis sans règles communes. Le *Securities Act* de 1933 et le *Securities Exchange Act* de 1934, qui institue la SEC, fondent un système durable, reposant sur la transparence obligatoire pour les entités qui font appel au marché et sur des normes techniques élaborées par des organismes indépendants de l'administration fiscale (l'APB, puis le FASB en 1973). La même année 1973, des organisations professionnelles de plusieurs pays fondent à Londres l'International Accounting Standards Committee (IASC), chargé de rapprocher les pratiques nationales.",
      },
      { type: 'intertitre', texte: "1.1.2 De l'harmonisation à la normalisation" },
      {
        type: 'carte',
        titre: "Tableau 1.1 — Harmonisation et normalisation comptables",
        tableau: {
          entetes: ['', 'Harmonisation (années 1970-1990)', 'Normalisation IAS/IFRS (depuis 2001)'],
          lignes: [
            ['Objectif', "Réduire les écarts entre systèmes nationaux", "Instituer un corps unique de normes, fondé sur un cadre conceptuel commun"],
            ['Instrument', "Directives européennes (4e directive de 1978, 7e directive de 1983)", "Normes de l'IASB, adoptées par chaque juridiction"],
            ['Options offertes', "Nombreuses, afin de ménager les traditions nationales", "Réduites, au nom de la comparabilité"],
            ['Limite', "Comparabilité faible, en raison de la coexistence des options", "Adoption souveraine : une norme IFRS ne s'impose que par l'acte d'une autorité publique"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "L'opposition entre ces deux démarches recouvre une opposition plus profonde entre deux logiques. La logique des investisseurs, qui inspire les IFRS, vise à aider la décision économique ; elle privilégie l'image fidèle, la substance économique et, lorsque la norme le prévoit, la juste valeur, et elle sépare nettement comptabilité financière et fiscalité. La logique fiscale, propre au modèle continental dont relève le SYSCOHADA, vise d'abord à sécuriser l'assiette de l'impôt et à protéger les créanciers ; elle privilégie la prudence, le coût historique et la forme juridique. Les IFRS ne suppriment pas la fiscalité, mais elles dissocient l'information destinée aux marchés du calcul de l'impôt.",
      },
      { type: 'intertitre', texte: "1.1.3 L'expérience congolaise" },
      {
        type: 'paragraphe',
        texte: "En République démocratique du Congo, la normalisation engagée en 1974 a abouti à la loi n° 76-020 du 16 juillet 1976 portant normalisation de la comptabilité, modifiée par l'ordonnance-loi n° 81-017 du 3 avril 1981, et à l'ordonnance n° 77-332 du 30 novembre 1977 fixant les modalités d'application obligatoire du Plan comptable général congolais (PCGC). Selon le rapport ROSC de la Banque mondiale, ce plan « avait d'abord pour objectif premier de répondre aux besoins de l'État en matière de statistiques nationales », les besoins des investisseurs n'y constituant « pas une priorité ». Le même rapport relève l'absence de cadre conceptuel, des tableaux de synthèse conçus pour la comptabilité nationale, une présentation des charges exclusivement par nature, l'absence de règles de consolidation et l'admission de provisions sans obligation juridique ou implicite. Ces écarts éclairent, par contraste, la logique des normes étudiées dans ce module. L'adhésion de la RDC à l'OHADA a ensuite substitué au PCGC le SYSCOHADA, révisé en 2017.",
      },
    ],
  },
  {
    numero: '1.2',
    titre: "Architecture institutionnelle et contenu du référentiel",
    navLabel: 'Architecture',
    blocs: [
      {
        type: 'paragraphe',
        texte: "En 2001, l'IASC est remplacé par l'International Accounting Standards Board (IASB). La réforme dépasse le changement d'appellation : elle dote l'organisme d'une gouvernance nouvelle, d'un conseil composé de membres à temps plein et d'une mission de normalisation, et non plus seulement d'harmonisation. Les normes publiées depuis 2001 portent le nom d'IFRS ; les IAS antérieures demeurent en vigueur tant qu'elles n'ont pas été remplacées, de sorte que IAS 1, IAS 8, IAS 12 ou IAS 16 s'appliquent toujours.",
      },
      { type: 'intertitre', texte: "1.2.1 Les organes du dispositif" },
      {
        type: 'carte',
        titre: "Tableau 1.2 — Organes de la normalisation internationale",
        tableau: {
          entetes: ['Organe', 'Mission'],
          lignes: [
            ['IFRS Foundation (administrateurs)', "Organisation à but non lucratif qui nomme, surveille et finance les conseils de normalisation, et veille au respect de la procédure d'élaboration des normes"],
            ['Monitoring Board (2009)', "Réunit des autorités publiques de marché ; supervise la gouvernance de la Fondation et approuve la nomination des administrateurs, sans intervenir dans le contenu technique des normes"],
            ['IASB', "Organe technique : fixe son programme de travail, publie les exposés-sondages et les normes IFRS"],
            ['IFRS Interpretations Committee', "Publie les interprétations IFRIC (SIC pour les plus anciennes) lorsqu'une norme est appliquée de façon divergente ou reste silencieuse sur une question"],
            ['ISSB (2021)', "Élabore les normes d'information en matière de durabilité, IFRS S1 et IFRS S2 (juin 2023), distinctes des normes comptables"],
          ],
        },
      },
      { type: 'intertitre', texte: "1.2.2 Le contenu du référentiel et la valeur de ses composantes" },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 1, § 7 ; IAS 8, § 5",
        texte: "Les IFRS « sont les normes et interprétations publiées par l'International Accounting Standards Board (IASB). Elles comprennent : (a) les Normes internationales d'information financière ; (b) les Normes comptables internationales ; (c) les interprétations IFRIC ; et (d) les interprétations SIC. »",
      },
      {
        type: 'paragraphe',
        texte: "Le Cadre conceptuel ne figure pas dans cette énumération. Au sein même d'une norme, toutes les composantes n'ont pas la même autorité : les paragraphes en caractères gras énoncent les principes, le texte courant les explicite et les annexes en précisent l'application. IAS 8.9 précise que chaque guide accompagnant une IFRS indique s'il fait ou non partie intégrante de la norme. Les guides qui en font partie sont obligatoires ; les autres, tels que les exemples illustratifs ou les bases des conclusions, éclairent l'interprétation sans lier l'entité. Citer un exemple illustratif comme s'il s'agissait du texte de la norme constitue donc une erreur de méthode.",
      },
      { type: 'intertitre', texte: "1.2.3 Un référentiel en évolution" },
      {
        type: 'carte',
        titre: "Tableau 1.3 — Textes entrant en application de 2027 à 2029",
        tableau: {
          entetes: ['Texte', 'Objet', 'Application'],
          lignes: [
            ['IFRS 18 (avril 2024)', "Présentation et informations à fournir ; « This Standard supersedes IAS 1 » (§ C8)", "Exercices ouverts à compter du 1er janvier 2027"],
            ['IFRS 19 (mai 2024)', "Informations à fournir allégées pour les filiales sans obligation d'information du public", "1er janvier 2027"],
            ['Amendements à IFRS S2 (11 décembre 2025)', "Informations sur les émissions de gaz à effet de serre", "1er janvier 2027"],
            ['IFRS 20 (mai 2026)', "Actifs et passifs réglementaires ; remplace IFRS 14", "1er janvier 2029, application anticipée permise"],
          ],
        },
        note: "Pour IFRS 19 et IFRS 20, seuls des documents d'accompagnement (analyse des effets, résumé de projet) sont disponibles dans le corpus de la plateforme ; aucune de leurs dispositions n'est citée comme texte normatif dans ce cours.",
      },
    ],
  },
  {
    numero: '1.3',
    titre: "Élaboration des normes et force obligatoire en droit OHADA",
    navLabel: 'Statut juridique',
    blocs: [
      { type: 'intertitre', texte: "1.3.1 La procédure d'élaboration" },
      {
        type: 'paragraphe',
        texte: "Une norme IFRS résulte d'une procédure publique et formalisée, le *due process* : identification du sujet et inscription au programme de travail, phase de recherche et document de discussion, exposé-sondage soumis aux commentaires de toutes les parties prenantes, analyse des réponses, délibérations en séance publique, vote du Board, puis publication assortie d'une date d'entrée en vigueur et de dispositions transitoires. Cette procédure confère à la norme sa légitimité technique, mais non sa force juridique. L'IASB étant un organisme de droit privé, ses normes ne s'imposent que si une autorité publique les rend obligatoires. L'Union européenne procède par homologation, norme par norme, depuis le règlement (CE) n° 1606/2002, qui a imposé les IFRS aux comptes consolidés des sociétés cotées à compter de 2005. L'espace OHADA a retenu une autre solution.",
      },
      { type: 'intertitre', texte: "1.3.2 Le régime de l'AUDCIF" },
      {
        type: 'filet',
        titre: "Texte de référence — AUDCIF, articles 8, 73-1, 75 et 113",
        texte: "Article 8, alinéa 4 : les entités dont les titres sont inscrits à une bourse de valeurs et celles qui sollicitent un financement dans le cadre d'un appel public à l'épargne « doivent établir et présenter les états financiers annuels selon les normes internationales d'informations financières, appelées normes IFRS, en sus des états financiers » établis selon le SYSCOHADA. Alinéa 5 : ces états IFRS « sont destinés exclusivement aux marchés financiers. Ils ne peuvent servir de support de base pour la détermination du bénéfice distribuable ». Article 75 : les états consolidés de ces entités sont établis selon les normes IFRS. Article 73-1 : les états IFRS approuvés par l'assemblée sont déposés au RCCM et auprès des organes des marchés financiers, et font l'objet d'une opinion du commissaire aux comptes. Article 113 : ces dispositions s'appliquent depuis le 1er janvier 2019.",
      },
      {
        type: 'paragraphe',
        texte: "La restriction de l'alinéa 5 s'explique par la nature des évaluations IFRS. Ces normes évaluent de nombreux actifs à la juste valeur et font entrer dans le résultat des profits non réalisés. Asseoir une distribution sur de tels profits reviendrait à verser des dividendes prélevés sur des plus-values latentes, au détriment des créanciers. En réservant la détermination du bénéfice distribuable aux états SYSCOHADA, fondés sur le coût historique et la prudence, le législateur OHADA protège les créanciers sans priver les marchés de l'information IFRS.",
      },
      { type: 'intertitre', texte: "1.3.3 Les situations dans lesquelles une entreprise privée applique les IFRS" },
      {
        type: 'paragraphe',
        texte: "Une entreprise privée établie en RDC peut être amenée à produire des états IFRS dans trois situations. La première est légale : elle concerne les entités visées par l'article 8 de l'AUDCIF. La deuxième tient à l'appartenance à un groupe : la filiale d'un groupe étranger transmet à sa société mère une liasse établie selon les IFRS pour les besoins de la consolidation, tout en tenant ses comptes selon le SYSCOHADA. La troisième tient au financement : un investisseur ou un prêteur international peut exiger des états comparables à ceux des concurrents étrangers de l'entreprise. Dans chacune de ces situations, les états IFRS s'ajoutent aux états SYSCOHADA sans s'y substituer.",
      },
      {
        type: 'filet',
        titre: "Observation — Portée de l'opinion d'audit",
        texte: "L'opinion d'un commissaire aux comptes ne vaut que pour le référentiel qu'elle désigne. Une opinion exprimée sur des états établis conformément au SYSCOHADA révisé ne se prononce pas sur leur conformité aux IFRS, et inversement ; une entreprise qui établit deux jeux d'états peut donc recevoir deux opinions distinctes. De même, une déclaration de conformité aux IFRS n'est valable que si elle est « explicite et sans réserve » (IAS 1.16) : une mention de conformité « à l'exception de » telle norme ne constitue pas une déclaration de conformité.",
      },
    ],
  },
  {
    numero: '1.4',
    titre: "Le Cadre conceptuel de l'information financière",
    navLabel: 'Cadre conceptuel',
    blocs: [
      { type: 'intertitre', texte: "1.4.1 Statut et autorité du Cadre" },
      {
        type: 'paragraphe',
        texte: "Le Cadre conceptuel constitue le socle théorique des IFRS. Il aide l'IASB à élaborer des normes fondées sur des concepts cohérents, aide les préparateurs à définir des méthodes cohérentes lorsqu'aucune norme ne s'applique ou qu'une norme laisse un choix, et aide l'ensemble des parties à comprendre et à interpréter les normes (§ SP1.1). Il précise toutefois que « the Conceptual Framework is not a Standard. Nothing in the Conceptual Framework overrides any Standard or any requirement in a Standard » (§ SP1.2). Publié en 1989 et révisé en mars 2018, il fait autorité par renvoi : IAS 1.15 exige une représentation fidèle des transactions « selon les définitions et les critères de comptabilisation des actifs, des passifs, des produits et des charges exposés dans le Cadre conceptuel », et IAS 8.11(b) en fait l'une des sources à consulter en l'absence de norme applicable. Le texte officiel encodé dans le corpus est en anglais ; les passages traduits dans ce chapitre sont des traductions de travail.",
      },
      { type: 'intertitre', texte: "1.4.2 L'objectif de l'information financière" },
      {
        type: 'filet',
        titre: "Texte de référence — Cadre conceptuel, § 1.2",
        texte: "« The objective of general purpose financial reporting is to provide financial information about the reporting entity that is useful to existing and potential investors, lenders and other creditors in making decisions relating to providing resources to the entity. »",
      },
      {
        type: 'paragraphe',
        texte: "Ces décisions portent sur l'achat, la vente ou la conservation de titres, sur l'octroi ou le règlement de prêts, et sur l'exercice des droits de vote ou d'influence sur la direction. Elles dépendent des rendements attendus, donc de l'appréciation des flux de trésorerie futurs et de la manière dont la direction gère les ressources de l'entité, ce que le Cadre désigne par le terme de *stewardship* (§ 1.3-1.4). Ces utilisateurs sont qualifiés de principaux parce qu'ils ne peuvent exiger de l'entité des rapports établis à leur intention et doivent se fier aux rapports à usage général (§ 1.5). Le Cadre marque aussi les limites de l'information financière : elle n'est pas exhaustive et doit être complétée par des informations sur l'économie et le secteur (§ 1.6) ; elle n'a pas pour objet de montrer la valeur de l'entité, mais d'aider à l'estimer (§ 1.7) ; elle repose dans une large mesure sur des estimations et des jugements (§ 1.11).",
      },
      { type: 'intertitre', texte: "1.4.3 Les caractéristiques qualitatives" },
      {
        type: 'paragraphe',
        texte: "L'information utile réunit deux caractéristiques qualitatives essentielles. La pertinence signifie que l'information peut influencer les décisions, parce qu'elle a une valeur prédictive, une valeur de confirmation, ou les deux ; l'importance relative en constitue un aspect propre à chaque entité, raison pour laquelle l'IASB ne fixe aucun seuil chiffré uniforme (§ 2.6-2.11). La fidélité signifie que l'information représente la substance des phénomènes économiques, et non seulement leur forme juridique lorsque celle-ci en diffère (§ 2.12) ; une représentation parfaitement fidèle est complète, neutre et exempte d'erreurs (§ 2.13). L'absence d'erreurs n'équivaut pas à l'exactitude : une estimation est fidèlement représentée si elle est présentée comme telle, si sa méthode et ses limites sont expliquées, et si elle a été établie sans erreur. Quatre caractéristiques auxiliaires, la comparabilité, la vérifiabilité, la rapidité et la compréhensibilité, renforcent l'utilité d'une information pertinente et fidèle, sans pouvoir compenser l'absence de ces deux qualités (§ 2.23 et 2.37).",
      },
      {
        type: 'paragraphe',
        texte: "Le Cadre propose une démarche en trois temps pour appliquer ces caractéristiques (§ 2.21) : identifier un phénomène économique susceptible d'être utile aux utilisateurs ; déterminer le type d'information le plus pertinent sur ce phénomène ; vérifier que cette information est disponible et peut être représentée fidèlement, faute de quoi l'analyse est reprise avec le type d'information pertinent suivant. Le coût de production de l'information constitue une contrainte transversale (§ 2.39-2.42). Le Cadre de 2018 précise en outre le rôle de la prudence, définie comme « the exercise of caution when making judgements under conditions of uncertainty » : elle soutient la neutralité, n'autorise ni la sous-évaluation des actifs et des produits ni la surévaluation des passifs et des charges, et n'implique aucune asymétrie systématique (§ 2.16-2.17).",
      },
      { type: 'intertitre', texte: "1.4.4 La définition des éléments et la comparaison avec le SYSCOHADA révisé" },
      {
        type: 'paragraphe',
        texte: "Le Cadre définit l'actif comme « a present economic resource controlled by the entity as a result of past events » (§ 4.3), la ressource économique étant « a right that has the potential to produce economic benefits » (§ 4.4). Il n'est pas nécessaire que la production d'avantages soit certaine, « or even likely » (§ 4.14) : une faible probabilité ne remet pas en cause l'existence de l'actif, mais intervient dans la décision de le comptabiliser et dans son évaluation (§ 4.15 ; § 5.15-5.17). Le Cadre retient ainsi, dans le cas d'une option achetée, que la ressource économique est le droit présent d'exercer l'option, et non les avantages que procurera son exercice (§ 4.17). Le passif est une obligation actuelle de transférer une ressource économique du fait d'événements passés (§ 4.26). Le cadre conceptuel du SYSCOHADA révisé a repris l'essentiel de ces définitions, sans en adopter la neutralité.",
      },
      {
        type: 'carte',
        titre: "Tableau 1.4 — Cadre conceptuel de l'IASB et cadre conceptuel du SYSCOHADA révisé",
        tableau: {
          entetes: ['Élément', 'Cadre conceptuel 2018 (IASB)', 'Cadre conceptuel du SYSCOHADA révisé (Titre V)'],
          lignes: [
            ['Actif', "Ressource économique actuelle contrôlée du fait d'événements passés (§ 4.3) ; la ressource économique est un droit ayant le potentiel de produire des avantages économiques (§ 4.4)", "Élément identifiable du patrimoine représentant une ressource économique actuelle contrôlée du fait d'événements passés ; le contrôle suppose aussi d'assumer l'essentiel des risques (ch. 4, § 4.1)"],
            ['Passif', "Obligation actuelle de transférer une ressource économique du fait d'événements passés (§ 4.26)", "Le passif désigne l'ensemble des ressources, capitaux propres compris ; le passif externe est l'obligation actuelle de transférer une ressource économique à la suite d'événements passés (ch. 4, § 4.2)"],
            ['Prudence et neutralité', "Prudence entendue comme circonspection, au service de la neutralité (§ 2.16-2.17)", "Prudence érigée en convention ; la neutralité n'est pas retenue comme caractéristique de l'image fidèle"],
            ['Évaluation', "Coût historique et valeurs actuelles (chapitre 6)", "Convention du coût historique ; valeur actuelle à l'inventaire (AUDCIF, art. 42-43)"],
          ],
        },
      },
    ],
  },
  {
    numero: '1.5',
    titre: "Bases d'évaluation et maintien du capital",
    navLabel: 'Évaluation',
    blocs: [
      { type: 'intertitre', texte: "1.5.1 Coût historique et valeurs actuelles" },
      {
        type: 'paragraphe',
        texte: "La comptabilisation d'un élément suppose le choix d'une base d'évaluation (Cadre, § 6.1). Le Cadre de 2018 regroupe ces bases en deux familles. Le coût historique utilise une information dérivée, au moins en partie, du prix de la transaction d'origine (§ 6.4). La valeur actuelle est mise à jour pour refléter les conditions existant à la date d'évaluation et n'est pas dérivée, même en partie, de ce prix (§ 6.10). La valeur actuelle comprend elle-même trois mesures, qui se distinguent par le point de vue adopté et par le traitement des coûts de transaction.",
      },
      {
        type: 'carte',
        titre: "Tableau 1.5 — Les trois mesures de la valeur actuelle",
        tableau: {
          entetes: ['Mesure', 'Point de vue', 'Coûts de transaction'],
          lignes: [
            ["Juste valeur (§ 6.12) : prix reçu pour vendre un actif ou payé pour transférer un passif lors d'une transaction normale entre intervenants du marché", "Celui des intervenants du marché ; valeur de sortie", "Ni à l'entrée, ni à la sortie"],
            ["Valeur d'utilité (actifs) ou valeur d'exécution (passifs) (§ 6.17) : valeur actualisée des flux que l'entité attend de l'utilisation et de la sortie de l'actif, ou qu'elle devra transférer pour exécuter le passif", "Celui de l'entité (§ 6.19)", "Coûts de sortie ou d'exécution inclus ; coûts d'entrée exclus"],
            ["Coût actuel (§ 6.21) : coût d'un actif équivalent à la date d'évaluation, ou contrepartie qui serait reçue pour un passif équivalent", "Valeur d'entrée", "Inclus"],
          ],
        },
        note: "La distinction entre le point de vue du marché et celui de l'entité fonde la différence entre la juste valeur d'IFRS 13 et la valeur d'utilité d'IAS 36, étudiée au chapitre 3.",
      },
      { type: 'intertitre', texte: "1.5.2 Les concepts de maintien du capital" },
      {
        type: 'paragraphe',
        texte: "Le choix d'une base d'évaluation se rattache à une question plus fondamentale : quel capital l'entité doit-elle préserver avant de constater un bénéfice ? Le Cadre distingue le capital financier, assimilé à l'actif net ou aux capitaux propres, retenu par la plupart des entités, et le capital physique, entendu comme la capacité de production (§ 8.1). Le concept de maintien du capital fournit « the point of reference by which profit is measured » : seules les entrées d'actifs excédant le montant nécessaire au maintien du capital constituent un rendement du capital, le surplus correspondant à un remboursement de celui-ci (§ 8.4). Le choix dépend des besoins des utilisateurs (§ 8.2), et le concept de capital physique impose l'évaluation au coût actuel (§ 8.5).",
      },
      {
        type: 'carte',
        titre: "Exemple 1.1 — Détermination du résultat selon trois concepts de maintien du capital",
        texte: "Les capitaux propres d'ouverture, soit 1 000, sont investis dans 100 unités de marchandises au prix unitaire de 10. Les 100 unités sont revendues 1 500 en fin d'exercice. L'inflation de l'exercice est de 20 % et le coût de remplacement d'une unité s'élève à 13 à la clôture.",
        tableau: {
          entetes: ['Concept', 'Capital à maintenir', 'Résultat', 'Ajustement de maintien du capital'],
          lignes: [
            ['Capital financier nominal', '1 000', '500', '0'],
            ["Capital financier en pouvoir d'achat constant", '1 000 × 1,20 = 1 200', '300', '200'],
            ['Capital physique', '100 unités × 13 = 1 300', '200', '300'],
          ],
        },
        note: "L'ajustement n'est pas une charge : il est porté en capitaux propres au titre du maintien du capital ou d'une réserve de réévaluation (§ 8.10). En période d'inflation forte, situation que la RDC a connue, l'écart entre ces trois mesures du résultat devient significatif.",
      },
      {
        type: 'filet',
        titre: "Rapprochement avec le SYSCOHADA révisé",
        texte: "Le cadre conceptuel du SYSCOHADA révisé définit la valeur actuelle comme « une valeur d'estimation du moment qui s'apprécie en fonction du marché et de l'utilité du bien pour l'entité ». Cette notion réunit les deux points de vue que le Cadre de l'IASB distingue, et elle reçoit un usage essentiellement prudentiel : la valeur retenue au bilan est la plus faible de la valeur d'entrée et de la valeur actuelle, de sorte que les moins-values latentes sont constatées et les plus-values latentes ignorées. En matière de capital, le SYSCOHADA retient le maintien du capital financier en unités monétaires courantes, les gains de détention étant exclus sauf pour les devises et les instruments financiers.",
      },
    ],
  },
  {
    numero: '1.6',
    titre: "L'évaluation à la juste valeur selon IFRS 13",
    navLabel: 'Juste valeur',
    blocs: [
      {
        type: 'paragraphe',
        texte: "La juste valeur intervient dans de nombreuses normes : immeubles de placement (IAS 40), instruments financiers (IFRS 9), actifs biologiques (IAS 41), regroupements d'entreprises (IFRS 3), valeur recouvrable (IAS 36). IFRS 13, applicable depuis 2013, ne détermine pas les cas dans lesquels la juste valeur doit être utilisée ; elle définit la manière de l'évaluer pour toutes les normes qui l'imposent ou la permettent. Elle exclut de son champ les transactions relevant d'IFRS 2 et d'IFRS 16, ainsi que deux mesures propres à l'entité, la valeur nette de réalisation d'IAS 2 et la valeur d'utilité d'IAS 36 (§ 5-7).",
      },
      { type: 'intertitre', texte: "1.6.1 Définition et composantes de l'évaluation" },
      {
        type: 'filet',
        titre: "Texte de référence — IFRS 13, § 9",
        texte: "La juste valeur est « le prix qui serait reçu pour la vente d'un actif ou payé pour le transfert d'un passif lors d'une transaction normale entre des intervenants du marché à la date d'évaluation ».",
      },
      {
        type: 'paragraphe',
        texte: "Cette définition appelle trois remarques. Il s'agit d'une valeur de sortie, et non d'un coût d'acquisition. La transaction de référence est une transaction normale, ce qui exclut les ventes forcées et les liquidations. Enfin, le prix est celui dont conviendraient des intervenants du marché indépendants, informés, capables et désireux de conclure une transaction, et non l'entité elle-même ; l'intention de l'entité de conserver l'actif est donc sans incidence. L'évaluation requiert de préciser l'élément évalué, avec les caractéristiques que le marché prendrait en compte, telles que son état, sa localisation ou les restrictions attachées à sa vente (§ 11-14), ainsi que le marché de référence. Ce marché est le marché principal, c'est-à-dire celui qui présente le volume et le niveau d'activité les plus élevés pour l'élément ; à défaut seulement, il s'agit du marché le plus avantageux, qui maximise le montant net reçu après coûts de transaction et frais de transport (§ 15-19). Le prix du marché principal prévaut « même si le prix pratiqué sur un autre marché peut être plus avantageux à la date d'évaluation » (§ 18).",
      },
      {
        type: 'paragraphe',
        texte: "Le prix retenu repose sur les hypothèses d'intervenants du marché agissant au mieux de leur intérêt économique (§ 22-23). Il « ne doit pas être ajusté en fonction des coûts de transaction », lesquels « sont plutôt propres à la transaction » (§ 25), mais il est ajusté des frais de transport lorsque la localisation constitue une caractéristique de l'élément (§ 26). Pour un actif non financier, l'évaluation suppose son utilisation optimale, physiquement possible, légalement admissible et financièrement faisable (§ 27-28), l'utilisation actuelle étant présumée optimale « à moins que le marché ou d'autres facteurs donnent à penser que des intervenants du marché pourraient maximiser la valeur de l'actif en l'utilisant différemment » (§ 29). Pour un passif, la norme suppose son transfert à un intervenant du marché, de sorte que sa juste valeur intègre le risque de non-exécution, y compris le risque de crédit propre de l'entité (§ 34 et 42).",
      },
      { type: 'intertitre', texte: "1.6.2 Hiérarchie des données et techniques d'évaluation" },
      {
        type: 'carte',
        titre: "Tableau 1.6 — Hiérarchie des justes valeurs (§ 72-90)",
        tableau: {
          entetes: ['Niveau', "Données d'entrée", 'Exemples'],
          lignes: [
            ['1', "Cours non ajustés sur des marchés actifs pour des éléments identiques, accessibles à la date d'évaluation", "Action cotée sur une bourse active"],
            ['2', "Données autres que les cours de niveau 1, observables directement ou indirectement", "Cours d'éléments similaires ; taux, courbes de taux, volatilités implicites, écarts de crédit observables"],
            ['3', "Données non observables, utilisées à défaut de données observables pertinentes et reflétant les hypothèses des intervenants du marché", "Prévisions internes de flux ; écart de crédit estimé sans référence de marché"],
          ],
        },
        note: "La hiérarchie classe les données d'entrée, et non les techniques d'évaluation. La juste valeur « est alors classée globalement au même niveau de la hiérarchie que la donnée d'entrée du plus bas niveau qui est importante pour la juste valeur prise dans son ensemble » (§ 73). Aucune décote de bloc liée à la seule taille de la position détenue n'est admise (§ 69 et 80).",
      },
      {
        type: 'paragraphe',
        texte: "En l'absence de prix observable, l'entité recourt à une technique d'évaluation qui maximise l'utilisation des données observables pertinentes et minimise celle des données non observables (§ 61-67). La norme distingue trois approches : l'approche par le marché (multiples, évaluation matricielle), l'approche par les coûts (coût de remplacement de la capacité de service, corrigé de l'obsolescence) et l'approche par le résultat (actualisation de flux, modèles d'évaluation d'options). L'annexe B développe l'actualisation sous deux formes : la technique d'ajustement du taux, qui actualise des flux contractuels ou les plus probables à un taux ajusté du risque, et la technique de l'espérance de la valeur actualisée, qui actualise des flux pondérés par leurs probabilités.",
      },
      {
        type: 'carte',
        titre: "Exemple 1.2 — Espérance de la valeur actualisée (IFRS 13, B27-B30)",
        liste: [
          "Données : flux de trésorerie attendu dans un an, pondéré par les probabilités, 780 ; taux sans risque 5 % ; prime exigée par le marché au titre du risque systématique 3 %.",
          "Méthode 2, par ajustement du taux : 780 / 1,08 = 722.",
          "Méthode 1, par ajustement des flux : l'équivalent certain du flux s'établit à 722 × 1,05, soit environ 758, ce qui correspond à une déduction d'environ 22 au titre du risque ; actualisé au taux sans risque, il donne 758 / 1,05, soit environ 722.",
          "Les deux méthodes conduisent au même résultat, à condition que le risque soit pris en compte soit dans les flux, soit dans le taux, mais non dans les deux à la fois (B14 et B33).",
        ],
      },
      { type: 'intertitre', texte: "1.6.3 Applications dans le contexte congolais" },
      {
        type: 'paragraphe',
        texte: "Le prix de transaction ne correspond pas toujours à la juste valeur, notamment entre parties liées ou lorsque les conditions de la transaction ne sont pas celles du marché (§ 57-60). Les prêts consentis au personnel à taux réduit en offrent une illustration fréquente dans les entreprises congolaises. Un prêt de 10 000 sur deux ans à 2 %, lorsque le marché prête à 12 %, a une juste valeur de 200 / 1,12 + 10 200 / 1,12², soit environ 8 310. L'écart de 1 690 ne représente pas une créance, mais un avantage consenti au salarié, dont la qualification relève d'autres normes, ainsi que le réserve le § 60.",
      },
      {
        type: 'filet',
        titre: "Observation — La juste valeur en l'absence de marché organisé",
        texte: "Le rapport ROSC relevait en 2010 que la RDC « n'a pas de bourse de valeurs ». Les évaluations de niveau 1 y sont donc rares, et la plupart des justes valeurs relèvent des niveaux 2 et 3. Les exigences d'information sont alors les plus étendues (§ 93) : description du processus d'évaluation, données non observables quantifiées, rapprochement entre soldes d'ouverture et de clôture, sensibilité aux hypothèses. L'étroitesse du marché n'autorise pas pour autant à retenir un prix de liquidation, l'objectif demeurant le prix d'une transaction normale (§ B37-B47). Comme le relève le support d'origine du module, la juste valeur peut ainsi devenir « théoriquement pertinente mais pratiquement fragile en contexte africain ».",
      },
    ],
  },
  {
    numero: '1.7',
    titre: "Les caractéristiques générales des états financiers selon IAS 1",
    navLabel: 'IAS 1',
    blocs: [
      { type: 'intertitre', texte: "1.7.1 Image fidèle et conformité aux IFRS" },
      {
        type: 'paragraphe',
        texte: "IAS 1 transpose les principes du Cadre en obligations. Les états financiers « doivent présenter une image fidèle de la situation financière, de la performance financière et des flux de trésorerie de l'entité », et l'application des IFRS, complétée si nécessaire d'informations supplémentaires, « est présumée conduire » à cette image (§ 15). La présomption n'est pas une garantie : IAS 1.17 exige également de choisir les méthodes comptables conformément à IAS 8, de présenter une information pertinente, fiable, comparable et compréhensible, et de fournir des informations complémentaires lorsque le respect des seules dispositions ne suffit pas à faire comprendre une transaction.",
      },
      {
        type: 'filet',
        titre: "Texte de référence — IAS 1, § 16 et 18",
        texte: "« L'entité dont les états financiers sont conformes aux IFRS doit procéder à une déclaration explicite et sans réserve de cette conformité dans les notes. L'entité ne doit décrire des états financiers comme étant conformes aux IFRS que s'ils sont conformes à toutes les dispositions des IFRS. » (§ 16). « L'entité ne peut pas corriger des méthodes comptables inappropriées, ni par l'indication des méthodes comptables utilisées, ni par des notes ou d'autres textes explicatifs. » (§ 18).",
      },
      {
        type: 'paragraphe',
        texte: "La conformité aux IFRS n'admet donc pas de degré. La seule exception réside dans la dérogation prévue aux § 19 à 24, désignée dans la pratique anglo-saxonne par l'expression *true and fair override*. Elle n'est ouverte que dans des « circonstances extrêmement rares », lorsque l'application d'une disposition serait trompeuse au point d'être contraire à l'objectif des états financiers, et seulement si le cadre réglementaire l'impose ou ne l'interdit pas. Elle s'accompagne d'une obligation d'information complète (§ 20) : l'entité indique que la direction estime les états conformes à l'image fidèle, désigne la norme écartée, la nature de l'écart, le traitement imposé et la raison pour laquelle il serait trompeur, décrit le traitement appliqué et chiffre, pour chaque période, l'effet de l'écart sur chaque élément concerné. Lorsque le cadre réglementaire interdit la dérogation, l'entité applique la norme et atténue le caractère trompeur par des informations en notes (§ 23).",
      },
      { type: 'intertitre', texte: "1.7.2 Les autres caractéristiques générales" },
      {
        type: 'carte',
        titre: "Tableau 1.7 — Caractéristiques générales des états financiers (IAS 1, § 25-38)",
        tableau: {
          entetes: ['Caractéristique', 'Contenu'],
          lignes: [
            ["Continuité d'exploitation (§ 25-26)", "Évaluée par la direction sur un horizon d'au moins douze mois à compter de la clôture ; écartée si la direction a l'intention de liquider l'entité ou de cesser son activité, ou si aucune autre solution réaliste ne s'offre à elle ; les incertitudes significatives sont indiquées dans tous les cas"],
            ["Comptabilité d'engagement (§ 27-28)", "Obligatoire, sauf pour l'information sur les flux de trésorerie ; un élément est comptabilisé lorsqu'il satisfait aux définitions et aux critères du Cadre"],
            ["Importance relative et regroupement (§ 29-31)", "Présentation séparée de chaque catégorie significative d'éléments similaires ; une information imposée par une norme peut être omise si elle n'est pas significative"],
            ["Non-compensation (§ 32-35)", "Pas de compensation entre actifs et passifs, ni entre produits et charges, sauf si une norme l'impose ou l'autorise"],
            ["Fréquence et comparatifs (§ 36-38)", "Jeu complet d'états au moins une fois par an, avec des informations comparatives pour tous les montants présentés"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "L'appréciation de la continuité d'exploitation revêt une importance particulière dans le contexte congolais. Une entreprise de distribution dont les dépôts situés à Goma et à Bukavu sont devenus inaccessibles doit rechercher s'il existe des « incertitudes significatives liées à des événements ou à des conditions susceptibles de jeter un doute important sur la capacité de l'entité à poursuivre son activité » (§ 25). La direction prend en compte toutes les informations disponibles sur l'avenir, au minimum sur les douze mois suivant la clôture (§ 26), documente son analyse et, si une incertitude significative subsiste, l'indique dans les notes. Le commissaire aux comptes peut alors attirer l'attention des lecteurs sur cette information sans modifier son opinion.",
      },
      { type: 'intertitre', texte: "1.7.3 La notion d'information significative" },
      {
        type: 'paragraphe',
        texte: "La notion d'information significative gouverne l'ensemble de la présentation. IAS 1.7 dispose qu'une information est significative « si on peut raisonnablement s'attendre à ce que son omission, son inexactitude ou son obscurcissement influence les décisions que les principaux utilisateurs [...] prennent ». La mention de l'obscurcissement est la plus récente ; la norme en donne cinq cas : formulation imprécise, information dispersée dans les états, regroupement d'éléments dissemblables, ventilation d'éléments semblables, et informations non significatives masquant les informations significatives. Le § 30A en tire la conséquence que l'entité ne doit pas réduire la compréhensibilité de ses états en y noyant les informations essentielles, de sorte qu'une annexe abondante peut être moins transparente qu'une annexe concise.",
      },
    ],
  },
  {
    numero: '1.8',
    titre: "Le choix des méthodes comptables selon IAS 8",
    navLabel: 'IAS 8',
    blocs: [
      {
        type: 'paragraphe',
        texte: "IAS 8 définit les méthodes comptables comme « les principes, bases, conventions, règles et pratiques spécifiques appliqués par une entité lors de l'établissement et de la présentation de ses états financiers » (§ 5). Lorsqu'une norme s'applique spécifiquement à une transaction, elle détermine la méthode à retenir (§ 7). Le § 8 admet de ne pas appliquer une méthode dont l'effet n'est pas significatif, mais précise qu'« il est inapproprié de faire, ou de ne pas corriger, des écarts non significatifs par rapport aux IFRS en vue de parvenir à une présentation particulière » de la situation de l'entité. L'intention de parvenir à une présentation particulière suffit ainsi à rendre l'écart inacceptable, quelle que soit son importance.",
      },
      { type: 'intertitre', texte: "1.8.1 La hiérarchie des sources en l'absence de norme applicable" },
      {
        type: 'carte',
        titre: "Tableau 1.8 — Démarche prescrite par IAS 8, § 7 à 14",
        tableau: {
          entetes: ['Étape', 'Contenu', 'Fondement'],
          lignes: [
            ['1', "Appliquer la norme ou l'interprétation qui traite spécifiquement de la transaction, y compris les guides d'application qui en font partie intégrante", "§ 7 et 9"],
            ['2', "À défaut, élaborer une méthode par jugement, produisant une information pertinente et fiable : image fidèle, substance économique, neutralité, prudence, exhaustivité", "§ 10"],
            ['3', "Consulter, dans l'ordre, les normes traitant de questions similaires et liées, puis les définitions, critères de comptabilisation et concepts d'évaluation du Cadre", "§ 11"],
            ['4', "Le cas échéant, prendre en compte les positions récentes d'autres normalisateurs fondées sur un cadre similaire, la doctrine et les pratiques du secteur, dans la mesure où elles ne contredisent pas l'étape 3", "§ 12"],
            ['5', "Appliquer la méthode retenue de façon cohérente aux transactions similaires, et ne la modifier que si une norme l'impose ou si le changement fournit une information fiable et plus pertinente", "§ 13-14"],
          ],
        },
      },
      { type: 'intertitre', texte: "1.8.2 Application : les droits d'émission reçus gratuitement" },
      {
        type: 'paragraphe',
        texte: "Une coopérative agricole du Kwilu reçoit gratuitement des unités de réduction d'émissions qu'elle peut revendre. Aucune norme IFRS ne traite spécifiquement de ces droits, de sorte que la démarche des § 10 et 11 d'IAS 8 s'applique. L'examen des normes traitant de questions similaires oriente vers IAS 38, s'agissant d'un droit négociable dépourvu de substance physique, et vers IAS 20, s'agissant d'une attribution gratuite par une autorité publique. Le recours au Cadre conduit à rechercher si le droit constitue une ressource économique contrôlée par l'entité, ce qui est le cas s'il est négociable et que l'entité peut en disposer. Plusieurs méthodes peuvent se justifier ; l'exigence consiste à retenir une méthode fondée sur la hiérarchie d'IAS 8, à l'appliquer de façon cohérente (§ 13) et à la décrire dans les notes.",
      },
    ],
  },
  {
    numero: '1.9',
    titre: "IFRS et SYSCOHADA révisé : deux conceptions de l'information financière",
    navLabel: 'IFRS et SYSCOHADA',
    blocs: [
      {
        type: 'paragraphe',
        texte: "La différence entre les IFRS et le SYSCOHADA révisé n'est pas seulement technique ; elle est aussi philosophique et institutionnelle. Les IFRS ont été conçues pour des économies financiarisées, où les marchés de capitaux occupent une place centrale. Le SYSCOHADA a été pensé pour des économies dans lesquelles la comptabilité remplit également une fonction juridique, fiscale et de contrôle. Le SYSCOHADA révisé de 2017 s'est néanmoins rapproché du Cadre de l'IASB : il en reprend la définition de l'actif, les caractéristiques qualitatives essentielles et les caractéristiques auxiliaires. Il s'en sépare sur des choix de fond, qui tiennent à la désignation des destinataires de l'information : l'IASB privilégie l'investisseur et le prêteur, tandis que le SYSCOHADA retient une pertinence partagée entre l'ensemble des utilisateurs.",
      },
      {
        type: 'carte',
        titre: "Tableau 1.9 — Comparaison des deux référentiels",
        tableau: {
          entetes: ['Question', "Cadre de l'IASB", 'SYSCOHADA révisé'],
          lignes: [
            ['Utilisateurs', "Principaux : investisseurs, prêteurs et autres créanciers (Cadre, § 1.2 et 1.5 ; IAS 1.7)", "Pertinence partagée entre tous les utilisateurs"],
            ['Neutralité', "Composante de la fidélité (§ 2.13) ; la prudence est une circonspection à son service (§ 2.16)", "Non retenue, en raison de la primauté de la prudence (AUDCIF, art. 3 et 6)"],
            ['Substance économique', "Principe général (IAS 8.10(b)(ii) ; Cadre, § 2.12 et 4.59-4.62)", "Application limitée à quatre cas"],
            ['Évaluation', "Coût historique ou valeur actuelle selon les normes ; juste valeur définie par IFRS 13", "Plus faible de la valeur d'entrée et de la valeur actuelle"],
            ['Maintien du capital', "Selon les besoins des utilisateurs (§ 8.2)", "Capital financier en unités monétaires courantes"],
            ['Flux de trésorerie opérationnels', "Méthode directe ou indirecte, la méthode directe étant encouragée (IAS 7.18-19)", "Méthode indirecte imposée"],
            ['Rôle en droit OHADA', "États établis en sus, destinés aux marchés, sans effet sur le bénéfice distribuable (AUDCIF, art. 8)", "États de référence, base du bénéfice distribuable"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Chacun de ces choix répond à une finalité. La neutralité sert l'investisseur qui recherche une image dépourvue de biais pour arbitrer entre des placements ; la prudence sert le créancier et l'État, qui entendent prévenir la distribution de profits fictifs. La juste valeur privilégie la pertinence, le coût historique la vérifiabilité. Le support d'origine de ce module souligne qu'en RDC, le coût historique offre simplicité, sécurité fiscale et adaptation à des marchés peu liquides, au prix de valeurs parfois éloignées de la réalité économique, tandis que la juste valeur, plus proche de cette réalité, se heurte à la faible profondeur des marchés et à la subjectivité des estimations. Le praticien congolais doit maîtriser les deux référentiels et savoir, pour chaque opération, lequel il applique ; les chapitres suivants en font l'étude norme par norme.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ue13c1-cp1',
    titre: "Établissement parallèle d'états SYSCOHADA et IFRS (KATANGA MINING SERVICES SA, société fictive)",
    contexte: "KATANGA MINING SERVICES SA, sous-traitant minier de Lubumbashi, est la filiale d'un groupe coté à l'étranger. Elle tient ses comptes selon le SYSCOHADA révisé et remonte chaque année une liasse IFRS à sa mère. Pour l'exercice N : résultat SYSCOHADA 1 200 000 USD ; résultat IFRS 1 650 000 USD. L'écart vient pour l'essentiel d'un immeuble loué à des tiers, évalué en IFRS selon le modèle de la juste valeur (+500 000 de variation en N), et des pertes de crédit attendues sur les créances clients (−50 000). Les actionnaires minoritaires congolais demandent un dividende calculé sur le résultat IFRS. Le directeur financier propose par ailleurs d'écrire dans les notes que les états IFRS sont « conformes aux IFRS, à l'exception d'IFRS 16 ».",
    questions: [
      {
        num: 1,
        enonce: "Le dividende peut-il être calculé sur le résultat IFRS ?",
        correction: "Non. L'article 8 de l'AUDCIF est explicite : les états IFRS « ne peuvent servir de support de base pour la détermination du bénéfice distribuable visé par l'Acte uniforme relatif au droit des sociétés commerciales et du groupement d'intérêt économique ». Le bénéfice distribuable se détermine sur les états SYSCOHADA. La raison est économique : les 500 000 de variation de juste valeur sont un profit latent ; les distribuer, ce serait verser en trésorerie un gain que l'entreprise n'a pas encaissé, au détriment de ses créanciers.",
      },
      {
        num: 2,
        enonce: "Expliquez l'écart de 450 000 entre les deux résultats par les philosophies des deux référentiels.",
        correction: "L'immeuble : IAS 40 permet le modèle de la juste valeur, dont les variations passent en résultat net (IAS 40.35) ; le SYSCOHADA révisé ne connaît que le coût, avec amortissement (Titre VIII, ch. 10). Le coût historique affronte ici la juste valeur. Les créances : IFRS 9 constate des pertes attendues dès l'origine (§ 5.5.15), le SYSCOHADA ne déprécie que des créances individualisées dont la perte est certaine dans son principe (commentaire du compte 49). Deuxième ligne de fracture, la neutralité face à la prudence : le cadre IFRS vise une image sans biais, orientée vers l'investisseur ; le SYSCOHADA protège d'abord les créanciers et l'État.",
      },
      {
        num: 3,
        enonce: "Que penser de la formule proposée par le directeur financier ?",
        correction: "Elle est contradictoire. IAS 1.16 exige une déclaration de conformité « explicite et sans réserve », et interdit de décrire des états comme conformes aux IFRS « que s'ils sont conformes à toutes les dispositions des IFRS ». Les notes ne réparent pas une méthode inappropriée (IAS 1.18). Soit la filiale applique IFRS 16, soit elle ne déclare pas la conformité aux IFRS ; le groupe, qui consolide, devra de toute façon retraiter ses contrats de location.",
      },
      {
        num: 4,
        enonce: "Quelle confiance accorder aux 500 000 de variation de juste valeur, dans le contexte congolais ?",
        correction: "Une confiance mesurée, et documentée. Faute de marché immobilier actif et de transactions comparables observables, la juste valeur reposera souvent sur des données non observables : elle relève alors du niveau 3 de la hiérarchie d'IFRS 13 (§ 73 et 86), avec des informations renforcées sur les techniques et les hypothèses. IAS 40.32 encourage le recours à un évaluateur indépendant qualifié et expérimenté pour la zone et la catégorie d'immeuble. Comme le dit le support du module, la juste valeur peut devenir « théoriquement pertinente mais pratiquement fragile en contexte africain » : c'est une raison de la documenter, non de l'écarter.",
      },
    ],
  },
  {
    id: 'ue13c1-cp2',
    titre: "Évaluation à la juste valeur de cathodes de cuivre (IFRS 13)",
    contexte: "KIPUSHI MÉTAUX SA (société fictive) est un courtier-négociant de Lubumbashi. Comme IAS 2.3(b) le permet aux courtiers-négociants en marchandises, elle évalue ses stocks à la juste valeur diminuée des coûts de vente. Au 31 décembre, elle détient 500 tonnes de cathodes, stockées à Lubumbashi. Deux débouchés sont accessibles. Vente aux négociants locaux de Lubumbashi : prix 9 400 USD/t, coûts de transaction 150 USD/t, pas de transport. Vente à l'export via Durban : prix 9 900 USD/t, coûts de transaction 100 USD/t, transport jusqu'à Durban 520 USD/t. Par ailleurs, KIPUSHI détient une créance litigieuse sur un client : la direction estime à 60 % la probabilité d'encaisser 1 000 000 USD dans un an, et à 40 % celle de n'encaisser que 400 000 USD. Taux sans risque : 5 % ; prime de risque exigée par le marché pour ce type de créance : 4 %.",
    questions: [
      {
        num: 1,
        enonce: "Aucun des deux marchés n'est le marché principal. Déterminez la juste valeur des 500 tonnes.",
        correction: "Sans marché principal, on retient le marché le plus avantageux, en comparant les prix nets de coûts de transaction et de transport (IFRS 13.17 et annexe A). Lubumbashi : 9 400 − 150 − 0 = 9 250 USD/t. Durban : 9 900 − 100 − 520 = 9 280 USD/t. Durban est le plus avantageux. La juste valeur n'est pas diminuée des coûts de transaction (§ 25), mais elle l'est du transport, puisque la localisation est une caractéristique de l'actif (§ 26) : 9 900 − 520 = 9 380 USD/t, soit 9 380 × 500 = **4 690 000 USD**. Les coûts de vente (100 USD/t, soit 50 000 USD) sont ensuite déduits au titre d'IAS 2.3(b), qui vise la juste valeur « diminuée des coûts de vente » : 4 640 000 USD au bilan.",
      },
      {
        num: 2,
        enonce: "L'analyse révèle que le marché des négociants de Lubumbashi traite l'essentiel des volumes : c'est le marché principal. Que devient la juste valeur ? Commentez.",
        correction: "Le prix du marché principal prévaut, même si un autre marché serait plus avantageux à la date d'évaluation (§ 18). Juste valeur : 9 400 USD/t, sans transport à déduire puisque le stock est sur place, soit **4 700 000 USD** ; après coûts de vente de 150 USD/t (75 000 USD), 4 625 000 USD. Le paradoxe n'est qu'apparent : la juste valeur est plus élevée à Lubumbashi (9 400 contre 9 380), mais le montant net au bilan est plus faible (4 625 000 contre 4 640 000), parce que les coûts de vente y sont plus lourds. La juste valeur et le produit net de cession sont deux grandeurs différentes : la première ignore les coûts de transaction, le second les intègre.",
      },
      {
        num: 3,
        enonce: "Les prix de Lubumbashi proviennent de cotations de négociants, sur un marché où les transactions sont peu fréquentes. À quel niveau de la hiérarchie classez-vous l'évaluation ?",
        correction: "Le niveau 1 suppose des cours non ajustés sur un marché actif pour des éléments identiques (§ 76). Un marché aux transactions peu fréquentes n'est pas actif ; des cours sur marchés non actifs pour des éléments identiques sont des données de niveau 2 (§ 81-85). Si les cotations exigeaient un ajustement important fondé sur des données non observables, l'évaluation basculerait au niveau 3 (§ 73). Le classement commande l'étendue des informations à fournir (§ 93).",
      },
      {
        num: 4,
        enonce: "Évaluez la créance litigieuse par l'espérance de la valeur actualisée, selon les deux méthodes de l'annexe B.",
        correction: "Flux attendu : 0,60 × 1 000 000 + 0,40 × 400 000 = 760 000 USD. Méthode 2 (taux incluant la prime) : 760 000 / 1,09 ≈ **697 248 USD**. Méthode 1 (équivalent certain actualisé au taux sans risque) : l'équivalent certain cohérent avec la prime de marché est 697 248 × 1,05 ≈ 732 110 USD, soit une déduction d'environ 27 890 USD pour le risque ; 732 110 / 1,05 ≈ 697 248 USD. Les deux méthodes convergent si l'ajustement du risque est cohérent (§ B27-B30). Erreur à éviter : actualiser 760 000 à 9 % après avoir déjà réduit les flux pour le risque, ce qui compte le risque deux fois.",
      },
    ],
  },
  {
    id: 'ue13c1-cp3',
    titre: "Analyse critique d'affirmations relatives au référentiel IFRS",
    contexte: "Un stagiaire note, au fil de sa première semaine dans un cabinet de Kinshasa, des affirmations de ses collègues. Pour chacune, dites si elle est vraie ou fausse et justifiez par le texte.",
    questions: [
      {
        num: 1,
        enonce: "« Le Cadre conceptuel prime sur les normes, puisqu'il en est la philosophie. »",
        correction: "Faux. « The Conceptual Framework is not a Standard. Nothing in the Conceptual Framework overrides any Standard or any requirement in a Standard » (Cadre, § SP1.2). Il fait autorité par les renvois d'IAS 1.15 et d'IAS 8.11(b), et comme source du jugement en l'absence de norme spécifique, jamais contre une norme.",
      },
      {
        num: 2,
        enonce: "« Une interprétation IFRIC n'est qu'un avis ; on peut s'en écarter en l'expliquant. »",
        correction: "Faux. IAS 1.7 et IAS 8.5 incluent les interprétations IFRIC et SIC dans la définition même des IFRS. S'en écarter interdit la déclaration de conformité d'IAS 1.16, qui porte sur « toutes les dispositions des IFRS ».",
      },
      {
        num: 3,
        enonce: "« La juste valeur d'un immeuble, c'est ce qu'il vaut pour nous, compte tenu de l'usage que nous en faisons. »",
        correction: "Faux. On reconnaît la valeur d'utilité, propre à l'entité. La juste valeur est une mesure fondée sur le marché, non spécifique à l'entité (IFRS 13.1-4 et § 9) : elle retient l'utilisation optimale du point de vue des intervenants du marché, l'usage actuel n'étant présumé optimal qu'en l'absence d'indication contraire (§ 27-30).",
      },
      {
        num: 4,
        enonce: "« On n'est jamais obligé de publier une information qu'une IFRS n'impose pas. »",
        correction: "Faux. IAS 1.17(c) et 1.31 imposent de fournir des informations supplémentaires lorsque le simple respect des dispositions particulières ne permet pas aux utilisateurs de comprendre l'incidence d'une transaction ou d'une situation. La liste d'une norme est un minimum, et parfois un maximum inutile : une information imposée mais non significative peut être omise (§ 31).",
      },
      {
        num: 5,
        enonce: "« Les états IFRS d'une société faisant appel public à l'épargne dans l'espace OHADA remplacent ses états SYSCOHADA. »",
        correction: "Faux. L'article 8 de l'AUDCIF impose les états IFRS « en sus » des états SYSCOHADA, et leur interdit de servir de base au bénéfice distribuable. L'article 73-1 impose le dépôt des deux jeux.",
      },
      {
        num: 6,
        enonce: "« Un gain de juste valeur de niveau 3 est un gain comme un autre. »",
        correction: "Faux dans ses effets. Il est comptabilisé selon la norme applicable, comme tout autre gain, mais il repose sur des données non observables : IFRS 13.93 exige alors un rapprochement détaillé des soldes, la description des processus d'évaluation et une analyse de sensibilité. La norme traite l'incertitude par la transparence, pas par l'exclusion.",
      },
      {
        num: 7,
        enonce: "« Si aucune norme ne traite d'une opération, on applique les usages de la place. »",
        correction: "Faux, ou du moins incomplet. IAS 8.11 impose d'abord les IFRS traitant de questions similaires, puis le Cadre conceptuel. Les pratiques du secteur ne viennent qu'en appoint facultatif, et seulement si elles ne contredisent pas ces sources (IAS 8.12).",
      },
      {
        num: 8,
        enonce: "« La prudence a disparu des IFRS. »",
        correction: "Faux, mais la nuance est essentielle. IAS 8.10(b)(iv) exige d'une méthode développée par jugement qu'elle soit « prudente ». Le Cadre de 2018 a réintroduit la prudence comme circonspection au service de la neutralité (§ 2.16), sans asymétrie systématique en faveur de la sous-évaluation (§ 2.17). Le SYSCOHADA révisé, lui, fait primer la prudence au point d'écarter la neutralité.",
      },
    ],
  },
  {
    id: 'ue13c1-cp4',
    titre: "Deux jeux d'états pour une même société",
    contexte: "LUKAYA CIMENTS SA (société fictive), dont le siège est à Kinshasa, lève des fonds par un emprunt obligataire proposé au public. Pour l'exercice N, son résultat SYSCOHADA est de 700 millions de CDF. Ses états IFRS font apparaître 900 millions, la différence provenant pour l'essentiel d'un gain de juste valeur de 250 millions sur un immeuble de placement, évalué selon le modèle de la juste valeur, et d'une charge supplémentaire de 50 millions. Un administrateur propose de distribuer 800 millions, « puisque le résultat IFRS le permet ».",
    questions: [
      {
        num: 1,
        enonce: "LUKAYA CIMENTS doit-elle établir des états IFRS ? Qu'en fait-elle ensuite ?",
        correction: "Oui. Elle sollicite un financement par appel public à l'épargne : l'article 8, alinéa 4, de l'AUDCIF lui impose des états IFRS en sus des états SYSCOHADA. Une fois approuvés par l'assemblée générale ordinaire, elle les dépose au RCCM et auprès des organes habilités des marchés financiers (art. 73-1). Le commissaire aux comptes émet sur eux une opinion propre : certification, réserve, opinion défavorable ou impossibilité d'exprimer une opinion.",
      },
      {
        num: 2,
        enonce: "Que répondez-vous à l'administrateur ?",
        correction: "Que la proposition est irrecevable sur la base invoquée. Les états IFRS « ne peuvent servir de support de base pour la détermination du bénéfice distribuable » (art. 8 al. 5). Le bénéfice distribuable s'apprécie sur les états SYSCOHADA, selon les règles de l'AUSCGIE : il part du résultat de 700 millions, et non de 900. Le gain de 250 millions est latent : il n'a produit aucune trésorerie, et le distribuer reviendrait à verser un dividende sur une plus-value qui peut disparaître avec le marché.",
      },
      {
        num: 3,
        enonce: "« La juste valeur est plus pertinente, la prudence plus fiable. » Discutez en une quinzaine de lignes, en mobilisant les deux cadres conceptuels.",
        correction: "Plan possible. (1) La juste valeur sert la pertinence au sens de l'IASB : elle donne une valeur prédictive et de confirmation à jour, utile à l'investisseur qui arbitre (Cadre § 1.2 et 2.6-2.10). Mais elle peut coûter en vérifiabilité, surtout au niveau 3, dans une économie sans bourse : le Cadre l'admet, puisque les états reposent pour une bonne part sur des estimations (§ 1.11), et il admet qu'une incertitude d'évaluation élevée peut imposer un arbitrage entre pertinence et fidélité (§ 2.22), et IFRS 13 compense par l'information (§ 93). (2) La prudence du SYSCOHADA sert la protection des créanciers et prévient les distributions fictives ; mais en écartant la neutralité, elle accepte un biais, qui peut aller jusqu'aux réserves occultes que son propre cadre conceptuel condamne. (3) Le droit OHADA tranche par la répartition des rôles plutôt que par la hiérarchie : la prudence gouverne la distribution (états SYSCOHADA), la pertinence gouverne l'information des marchés (états IFRS). Conclusion : l'opposition n'est pas entre vérité et erreur, mais entre deux utilisateurs de référence.",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue13',
  numero: 1,
  id: 'ue13-chapitre-1',
  titre: 'Fondements, cadre conceptuel et architecture des IFRS',
  sousTitre: "Normalisation internationale, Cadre conceptuel, IFRS 13, IAS 1 et IAS 8",
  infoBulle: "Chapitre 1 du module IFRS/IAS : histoire et écoles de normalisation, architecture IFRS Foundation-IASB-ISSB, force obligatoire en droit OHADA et en RDC, Cadre conceptuel (2018), bases d'évaluation et maintien du capital, juste valeur selon IFRS 13, caractéristiques générales d'IAS 1, hiérarchie d'IAS 8, comparaison avec le SYSCOHADA révisé.",
  loiRef: "Cadre conceptuel (2018) · IAS 1.7, 15-38 · IAS 8.5-14 · IFRS 13 · AUDCIF art. 8, 73-1, 75, 113",
  moduleLabel: 'UE 13 · IFRS / IAS',
  retourRoute: '/ue13-ifrs-ias',
  coursId: 'ue13-ifrs-ias',
  objectifs: [
    "Situer la normalisation IFRS parmi les écoles comptables et dans l'histoire comptable congolaise, du PCGC de 1976 au SYSCOHADA révisé.",
    "Décrire l'architecture institutionnelle de la normalisation internationale et le contenu exact du référentiel IFRS.",
    "Exposer la force obligatoire des IFRS en droit OHADA et les situations dans lesquelles une entreprise privée congolaise les applique.",
    "Présenter le Cadre conceptuel de 2018 : statut, objectif, caractéristiques qualitatives, définition des éléments.",
    "Distinguer les bases d'évaluation et déterminer un résultat selon les différents concepts de maintien du capital.",
    "Évaluer un élément à la juste valeur selon IFRS 13.",
    "Appliquer les caractéristiques générales d'IAS 1 et la hiérarchie des sources d'IAS 8.",
    "Comparer de manière argumentée le Cadre de l'IASB et le cadre conceptuel du SYSCOHADA révisé.",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Le Cadre de l'IASB destine l'information financière aux investisseurs, prêteurs et autres créanciers, qui ne peuvent exiger de rapports établis à leur intention (Cadre, § 1.2 et 1.5 ; IAS 1.7). Le SYSCOHADA retient une pertinence partagée entre les utilisateurs ; le PCGC de 1976 servait d'abord la statistique nationale (ROSC 2010).",
    "Le référentiel IFRS comprend les IFRS, les IAS et les interprétations IFRIC et SIC (IAS 1.7 ; IAS 8.5). Le Cadre conceptuel n'est pas une norme et ne prévaut jamais sur une norme (§ SP1.2). IFRS 18 remplace IAS 1 pour les exercices ouverts à compter du 1er janvier 2027.",
    "En droit OHADA, les entités cotées ou faisant appel public à l'épargne établissent des états IFRS en sus des états SYSCOHADA ; ces états sont destinés aux marchés et ne servent pas à déterminer le bénéfice distribuable (AUDCIF, art. 8), et ils sont déposés et audités (art. 73-1) depuis le 1er janvier 2019 (art. 113).",
    "Les caractéristiques qualitatives essentielles sont la pertinence et la fidélité ; quatre caractéristiques auxiliaires les renforcent. L'actif est une ressource économique actuelle, c'est-à-dire un droit ayant le potentiel de produire des avantages, même peu probables (§ 4.3-4.15) ; la prudence est une circonspection au service de la neutralité (§ 2.16).",
    "La juste valeur est un prix de sortie déterminé du point de vue des intervenants du marché, sur le marché principal ou, à défaut, sur le marché le plus avantageux, hors coûts de transaction et selon l'utilisation optimale ; la hiérarchie à trois niveaux classe les données d'entrée (IFRS 13).",
    "IAS 1 présume l'image fidèle par l'application des IFRS (§ 15), exige une déclaration de conformité sans réserve (§ 16), n'admet la dérogation que dans des circonstances extrêmement rares (§ 19-24) et impose l'appréciation de la continuité d'exploitation sur au moins douze mois (§ 25-26).",
    "IAS 8 impose d'appliquer la norme spécifique (§ 7), à défaut une méthode élaborée par jugement en référence aux normes similaires puis au Cadre (§ 10-11), avec cohérence et permanence (§ 13-14) ; aucun écart ne peut viser une présentation particulière (§ 8).",
  ],
  references: [
    { genre: 'texte', intitule: "IASB, Conceptual Framework for Financial Reporting (Cadre conceptuel de l'information financière), révisé en mars 2018", precision: "texte officiel anglais : SP1.1-SP1.5, chapitres 1 à 8, tableaux 4.1 et 6.1" },
    { genre: 'texte', intitule: "IAS 1 — Présentation des états financiers", precision: "§ 7 (définitions) et §§ 15 à 38 (caractéristiques générales)" },
    { genre: 'texte', intitule: "IAS 8 — Méthodes comptables, changements d'estimations comptables et erreurs", precision: "§ 5 et §§ 7 à 14" },
    { genre: 'texte', intitule: "IFRS 13 — Évaluation de la juste valeur", precision: "§ 9, §§ 15 à 90, § 93, annexe A, §§ B27 à B30" },
    { genre: 'texte', intitule: "IFRS 18 — Presentation and Disclosure in Financial Statements", precision: "annexe C, § C8, et annexe D" },
    { genre: 'texte', intitule: "Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF, 2017)", precision: "art. 8, 73-1, 75 et 113 ; cadre conceptuel du SYSCOHADA révisé (Titre V)" },
    { genre: 'texte', intitule: "J.-B. Tshimanga Mulumba (CPCC), Normes comptables internationales (IAS/IFRS)", precision: "support de cours, module 1 : fondements conceptuels, normalisation internationale et architecture IFRS" },
    { genre: 'texte', intitule: "Banque mondiale, Rapport sur le respect des normes et codes (ROSC), Comptabilité et audit, RDC", precision: "2010, chapitre 3 : le PCGC et les IFRS" },
    { genre: 'ouvrage', auteur: "Kinzonzi Mvutukidi Ngindu K.", titre: "La normalisation comptable", editeur: "Foucher", lieu: "Paris", annee: "1984" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "IAS 1, IAS 7, IAS 8 et IFRS 13 (texte français) ; IFRS 18 (texte anglais) ; AUDCIF et cadre conceptuel du SYSCOHADA révisé ; ROSC RDC (2010) ; support de cours du module 1 (J.-B. Tshimanga Mulumba, CPCC). Cadre conceptuel de 2018 : texte officiel anglais de l'IFRS Foundation, cité par paragraphe en traduction de travail.",
}

export default chapitre
