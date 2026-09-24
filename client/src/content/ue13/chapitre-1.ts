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
    titre: "Pourquoi un langage comptable mondial ?",
    navLabel: 'Pourquoi les IFRS',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Une comptabilité n'est jamais neutre sur ses fins : elle répond d'abord à la question « pour qui compte-t-on ? ». Pendant la plus grande partie du XXe siècle, chaque pays y a répondu à sa façon. La France et l'Allemagne ont bâti des plans comptables au service de l'État, du fisc et du créancier. Le bloc soviétique a fait de la comptabilité un instrument de planification. Le monde anglo-saxon, enfin, a confié la normalisation à des organismes privés chargés de protéger l'investisseur. En 1984, l'économiste zaïrois **Kinzonzi Mvutukidi** consacrait sa thèse, *La normalisation comptable* (Foucher, préface de Pierre Lauzel), à la comparaison de ces trois écoles, anglo-saxonne, socialiste et franco-germanique, pour en tirer un modèle de plan comptable adapté aux pays en développement.",
      },
      {
        type: 'paragraphe',
        texte: "L'école anglo-saxonne naît d'un traumatisme. Le krach de 1929 fut aussi une **crise de l'information** : beaucoup de sociétés cotées américaines publiaient des comptes non audités, construits sans règles communes, et les épargnants ne savaient pas ce qu'ils achetaient. Le *Securities Act* de 1933 et le *Securities Exchange Act* de 1934, qui crée la SEC, fondent un modèle durable : transparence obligatoire pour qui fait appel au marché, normes techniques élaborées par des organismes indépendants de l'administration fiscale (APB, puis FASB en 1973). La même année 1973 voit naître à Londres l'**IASC**, fondé par des organisations professionnelles de plusieurs pays pour rapprocher les pratiques nationales.",
      },
      {
        type: 'carte',
        titre: "Harmoniser ou normaliser : deux ambitions différentes",
        tableau: {
          entetes: ['', 'Harmonisation (années 1970-1990)', 'Normalisation IAS/IFRS (depuis 2001)'],
          lignes: [
            ['Ambition', "Réduire les écarts entre systèmes nationaux", "Un corps unique de normes, fondé sur un cadre conceptuel commun"],
            ['Instrument type', "Directives européennes (4e directive de 1978, 7e de 1983)", "Normes de l'IASB, adoptées par chaque juridiction"],
            ['Options', "Nombreuses, pour ménager les traditions nationales", "Réduites, au nom de la comparabilité"],
            ['Limite', "Comparabilité faible : trop d'options coexistent", "Adoption souveraine : une norme IFRS n'oblige personne par elle-même"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Au Congo, la réponse a longtemps été franco-germanique et statistique. La normalisation engagée en 1974 aboutit à la **loi n° 76-020 du 16 juillet 1976** portant normalisation de la comptabilité, modifiée par l'ordonnance-loi n° 81-017 du 3 avril 1981, et à l'ordonnance n° 77-332 du 30 novembre 1977 fixant les modalités d'application obligatoire du Plan comptable général congolais (PCGC). Le rapport ROSC de la Banque mondiale en a résumé l'esprit sans détour : le PCGC « avait d'abord pour objectif premier de répondre aux besoins de l'État en matière de statistiques nationales », les besoins des investisseurs n'y constituant « pas une priorité ».",
      },
      { type: 'controle', question: QCM[23] },
      {
        type: 'filet',
        titre: "Le réquisitoire du ROSC contre le PCGC",
        texte: "Le ROSC de 2010 (chapitre 3) dresse l'inventaire des écarts : pas de cadre conceptuel ; quatre tableaux de synthèse (bilan, tableau de formation du résultat, tableau de financement, TEFF) conçus pour la comptabilité nationale ; présentation des charges par nature seulement ; aucune règle de consolidation ; date de clôture imposée au 31 décembre ; coût historique sans actualisation des créances et dettes ; provisions admises sans obligation juridique ou implicite, là où IAS 37 l'exige. Chaque écart est une leçon sur la logique IFRS, et vous les retrouverez au fil des chapitres.",
      },
    ],
  },
  {
    numero: '1.2',
    titre: "L'architecture : qui fait les normes, et que contient le référentiel ?",
    navLabel: 'Architecture',
    blocs: [
      {
        type: 'paragraphe',
        texte: "En 2001, l'IASC devient l'**IASB** (*International Accounting Standards Board*). Le changement n'est pas qu'un sigle : il s'accompagne d'une gouvernance nouvelle, d'un conseil de membres à temps plein et d'une ambition de normalisation, non plus d'harmonisation. Les normes publiées depuis s'appellent IFRS ; les IAS antérieures restent en vigueur tant qu'elles ne sont pas remplacées. IAS 1, IAS 8, IAS 12 ou IAS 16 s'appliquent toujours aujourd'hui.",
      },
      {
        type: 'carte',
        titre: "Les organes du dispositif",
        liste: [
          "**IFRS Foundation** (trustees) : organisation à but non lucratif qui nomme, surveille et finance les deux conseils de normalisation, et veille au respect du *due process*.",
          "**Monitoring Board** (2009) : réunit des autorités publiques de marché ; il supervise la gouvernance de la Fondation et approuve la nomination des trustees, sans jamais intervenir dans le contenu technique des normes.",
          "**IASB** : l'organe technique. Il fixe son programme, publie les exposés-sondages et les normes comptables IFRS.",
          "**IFRS Interpretations Committee** : publie les interprétations IFRIC (SIC pour les plus anciennes) lorsqu'une norme est appliquée de façon divergente ou reste muette sur un point.",
          "**ISSB** (*International Sustainability Standards Board*, créé en 2021) : élabore les normes d'information en matière de durabilité, IFRS S1 et IFRS S2 (juin 2023), distinctes des normes comptables.",
        ],
      },
      {
        type: 'filet',
        titre: "Ce que recouvre exactement le mot « IFRS » (IAS 1.7 ; IAS 8.5)",
        texte: "Les IFRS « sont les normes et interprétations publiées par l'International Accounting Standards Board (IASB). Elles comprennent : (a) les Normes internationales d'information financière ; (b) les Normes comptables internationales ; (c) les interprétations IFRIC ; et (d) les interprétations SIC. » Le Cadre conceptuel n'est pas dans la liste.",
      },
      { type: 'controle', question: QCM[1] },
      {
        type: 'paragraphe',
        texte: "Une norme ne se lit pas comme un bloc uniforme. Les paragraphes en caractères gras énoncent les principes ; le texte courant les explique ; les annexes précisent. IAS 8.9 fixe la règle de lecture : chaque guide qui accompagne une IFRS « précise s'il fait ou non partie intégrante des IFRS ». Ceux qui en font partie sont obligatoires ; les autres, comme les exemples illustratifs ou les bases des conclusions, éclairent sans lier. Citer un exemple illustratif comme s'il s'agissait de la norme est une faute de méthode fréquente dans les mémoires.",
      },
      { type: 'controle', question: QCM[24] },
      {
        type: 'carte',
        titre: "Un référentiel vivant : les échéances de 2027 à 2029",
        tableau: {
          entetes: ['Texte', 'Objet', 'Application'],
          lignes: [
            ['IFRS 18 (avril 2024)', "Présentation et informations à fournir. « This Standard supersedes IAS 1 » (§ C8)", "Exercices ouverts à compter du 1er janvier 2027"],
            ['IFRS 19 (mai 2024)', "Filiales sans obligation d'information du public : informations à fournir allégées", "1er janvier 2027"],
            ['Amendements à IFRS S2 (11 décembre 2025)', "Informations sur les émissions de gaz à effet de serre", "1er janvier 2027"],
            ['IFRS 20 (mai 2026)', "Actifs et passifs réglementaires ; remplace IFRS 14", "1er janvier 2029, application anticipée permise"],
          ],
        },
        note: "Pour IFRS 19 et IFRS 20, seuls des documents d'accompagnement (analyse des effets, résumé de projet) sont disponibles dans le corpus de la plateforme : aucune de leurs dispositions n'est citée comme texte normatif dans ce cours.",
      },
      { type: 'controle', question: QCM[21] },
    ],
  },
  {
    numero: '1.3',
    titre: "Du due process à la force obligatoire : l'IFRS en droit OHADA et en RDC",
    navLabel: 'Statut juridique',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Une norme IFRS naît d'un processus public, le *due process* : inscription du sujet au programme de travail, recherche et document de discussion, **exposé-sondage** ouvert aux commentaires de toutes les parties prenantes, analyse des lettres reçues, délibérations en séance publique, vote du Board, publication avec une date d'entrée en vigueur et des dispositions transitoires. Ce processus lui donne sa légitimité technique, pas sa force juridique. L'IASB est un organisme privé : sa norme n'oblige que si une autorité publique la rend obligatoire. L'Union européenne le fait norme par norme, par homologation, depuis le règlement (CE) n° 1606/2002, qui impose les IFRS aux comptes consolidés des sociétés cotées à compter de 2005. L'espace OHADA a choisi une autre voie.",
      },
      {
        type: 'filet',
        titre: "L'article 8 de l'AUDCIF : deux jeux d'états, jamais un seul",
        texte: "Article 8, alinéa 4 : les entités dont les titres sont inscrits à une bourse de valeurs et celles qui sollicitent un financement par appel public à l'épargne « doivent établir et présenter les états financiers annuels selon les normes internationales d'informations financières, appelées normes IFRS, **en sus** des états financiers » SYSCOHADA. Alinéa 5 : ces états IFRS « sont destinés exclusivement aux marchés financiers. Ils ne peuvent servir de support de base pour la détermination du bénéfice distribuable ». Article 75 : les états consolidés de ces mêmes entités sont établis selon les normes IFRS. Article 73-1 : les états IFRS approuvés par l'assemblée sont déposés au RCCM et auprès des organes des marchés financiers, et le commissaire aux comptes émet sur eux une opinion. Article 113 : ces dispositions s'appliquent depuis le **1er janvier 2019**.",
      },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[3] },
      {
        type: 'paragraphe',
        texte: "L'alinéa 5 de l'article 8 mérite qu'on s'y arrête. Les IFRS évaluent de nombreux actifs à la juste valeur et font entrer en résultat des profits non réalisés. Distribuer ces profits, ce serait verser des dividendes sur des plus-values qui n'existent peut-être que sur le papier. En réservant le bénéfice distribuable aux états SYSCOHADA, bâtis sur le coût historique et la prudence, le législateur OHADA protège les créanciers sans priver les marchés de l'information IFRS. Chaque jeu d'états sert son public.",
      },
      {
        type: 'paragraphe',
        texte: "En RDC comme dans tout l'espace OHADA, une entreprise privée rencontre les IFRS par trois portes. La porte légale : l'article 8 de l'AUDCIF, pour les entités dont les titres sont cotés ou qui font appel public à l'épargne. La porte du groupe : la filiale d'un groupe étranger remonte à sa mère une liasse IFRS pour la consolidation, tout en tenant ses comptes SYSCOHADA. La porte du financement : l'entreprise qui sollicite un investisseur ou un prêteur international se voit souvent demander des états comparables à ceux de ses concurrents étrangers. Dans les trois cas, les IFRS s'ajoutent au SYSCOHADA, elles ne le remplacent pas.",
      },
      {
        type: 'filet',
        titre: "Lire la phrase d'opinion jusqu'au dernier mot",
        texte: "Lisez toujours la phrase d'opinion jusqu'au bout. Une opinion rendue sur des états établis « conformément au SYSCOHADA révisé » ne dit rien de leur conformité aux IFRS, et inversement : une entreprise qui tient deux jeux d'états peut obtenir deux opinions, sur deux référentiels. Et une déclaration de conformité aux IFRS ne vaut que si elle est « explicite et sans réserve » (IAS 1.16) : la formule « conformes aux IFRS, à l'exception de... » n'en est pas une.",
      },
      { type: 'controle', question: QCM[22] },
    ],
  },
  {
    numero: '1.4',
    titre: "Le Cadre conceptuel : la théorie qui tient l'édifice",
    navLabel: 'Cadre conceptuel',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le Cadre conceptuel pose d'emblée son propre statut : il aide l'IASB à élaborer des normes fondées sur des concepts cohérents, aide les préparateurs à développer des méthodes cohérentes lorsqu'aucune norme ne s'applique ou qu'une norme laisse un choix, et aide chacun à comprendre et interpréter les normes (§ SP1.1). Mais « the Conceptual Framework is not a Standard. Nothing in the Conceptual Framework overrides any Standard or any requirement in a Standard » (§ SP1.2). Son **objectif** en est la fondation, dont tout le reste « découle logiquement » (§ 1.1). Publié en 1989, remanié en 2010 et révisé en mars 2018, il fait autorité par renvoi. Son autorité est indirecte mais réelle : IAS 1.15 impose une représentation fidèle « selon les définitions et les critères de comptabilisation des actifs, des passifs, des produits et des charges exposés dans le Cadre conceptuel », et IAS 8.11(b) en fait la deuxième source de la hiérarchie à consulter en l'absence de norme.",
      },
      {
        type: 'filet',
        titre: "À qui parle l'information financière (Cadre, § 1.2-1.5)",
        texte: "« The objective of general purpose financial reporting is to provide financial information about the reporting entity that is useful to existing and potential investors, lenders and other creditors in making decisions relating to providing resources to the entity » (§ 1.2). Ces décisions portent sur l'achat, la vente ou la conservation de titres, l'octroi ou le règlement de prêts, et l'exercice des droits de vote ou d'influence sur la direction. Elles dépendent des rendements attendus, donc de l'appréciation des flux de trésorerie futurs **et** de la manière dont la direction gère les ressources de l'entité, la *stewardship* (§ 1.3-1.4). Ces utilisateurs sont dits principaux parce qu'ils ne peuvent pas exiger de rapports sur mesure et doivent se fier aux rapports à usage général (§ 1.5). Le texte officiel encodé est en anglais : les passages en français de ce chapitre en sont des traductions de travail.",
      },
      { type: 'controle', question: QCM[0] },
      {
        type: 'carte',
        titre: "Ce que les états financiers ne sont pas (§ 1.6 à 1.11)",
        liste: [
          "**Pas exhaustifs** : ils ne contiennent pas toute l'information utile ; l'utilisateur doit y ajouter l'état de l'économie, le climat politique, les perspectives du secteur (§ 1.6).",
          "**Pas une valeur de l'entité** : ils ne sont pas conçus pour montrer ce que vaut l'entreprise, seulement pour aider à l'estimer (§ 1.7).",
          "**Pas taillés pour chacun** : les utilisateurs principaux ont des besoins potentiellement contradictoires ; l'IASB vise l'ensemble qui répond au plus grand nombre (§ 1.8).",
          "**Pas exacts** : ils reposent pour une bonne part sur des estimations, des jugements et des modèles ; la vision idéale du Cadre ne sera probablement pas atteinte en totalité, du moins à court terme (§ 1.11).",
        ],
      },
      {
        type: 'paragraphe',
        texte: "Pour être utile, l'information doit réunir deux **caractéristiques qualitatives essentielles**. La *pertinence* d'abord : l'information peut faire une différence dans les décisions, parce qu'elle a une valeur prédictive, une valeur de confirmation, ou les deux ; l'importance relative en est « an entity-specific aspect of relevance », et l'IASB refuse pour cette raison de fixer un seuil chiffré uniforme (§ 2.6-2.11). La *fidélité* ensuite : l'information doit représenter la substance des phénomènes, car ne rendre compte que de leur forme juridique, lorsqu'elle en diffère, ne les représenterait pas fidèlement (§ 2.12) ; une image parfaitement fidèle est **complète**, **neutre** et **exempte d'erreurs** (§ 2.13). Exempte d'erreurs ne veut pas dire exacte : une estimation peut être fidèlement représentée si elle est présentée comme telle, si le processus et ses limites sont expliqués, et s'il a été choisi et appliqué sans erreur. Quatre caractéristiques **auxiliaires** renforcent ensuite l'utilité : comparabilité, vérifiabilité, rapidité, compréhensibilité. Aucune ne peut rendre utile une information qui ne serait ni pertinente ni fidèle (§ 2.23 et 2.37).",
      },
      {
        type: 'carte',
        titre: "Trois questions à poser, dans cet ordre (§ 2.21)",
        liste: [
          "**1.** Identifier un phénomène économique susceptible d'être utile aux utilisateurs.",
          "**2.** Déterminer quel type d'information serait le plus pertinent pour ce phénomène, s'il était disponible et pouvait être représenté fidèlement.",
          "**3.** Vérifier si cette information est disponible et peut être représentée fidèlement. Si oui, le processus est achevé ; sinon, reprendre avec le type d'information le plus pertinent suivant.",
        ],
        note: "Contrainte transversale : le coût. Pour chaque projet, l'IASB apprécie si les avantages d'une information justifient les coûts de sa production et de son utilisation (§ 2.39-2.42).",
      },
      {
        type: 'paragraphe',
        texte: "La révision de 2018 a déplacé plusieurs lignes. Elle fait une place précise à la **prudence** : « the exercise of caution when making judgements under conditions of uncertainty », qui *soutient* la neutralité au lieu de la contredire (§ 2.16) et n'autorise ni sous-évaluation des actifs et produits, ni surévaluation des passifs et charges ; elle n'implique pas davantage d'asymétrie systématique (§ 2.17). Elle a logé la primauté de la substance sur la forme au cœur de la fidélité (§ 2.12). Elle a défini l'**entité comptable** : « an entity that is required, or chooses, to prepare financial statements », qui n'est pas nécessairement une personne morale (§ 3.10). Et elle a réécrit les définitions des éléments, que le cadre conceptuel du SYSCOHADA révisé a largement reprises, sans en adopter la neutralité.",
      },
      {
        type: 'tableau',
        tableau: {
          entetes: ['Élément', 'Cadre conceptuel 2018 (IASB)', 'Cadre conceptuel du SYSCOHADA révisé (Titre V)'],
          lignes: [
            ['Actif', "Ressource économique **actuelle** contrôlée du fait d'événements passés (§ 4.3) ; la ressource économique est un **droit** ayant le potentiel de produire des avantages économiques (§ 4.4)", "Élément identifiable du patrimoine représentant une ressource économique **actuelle** contrôlée du fait d'événements passés ; le contrôle suppose aussi d'**assumer l'essentiel des risques** (ch. 4, § 4.1)"],
            ['Passif', "Obligation actuelle de **transférer** une ressource économique du fait d'événements passés (§ 4.26)", "Le « passif » désigne l'ensemble des ressources, capitaux propres compris ; le **passif externe** est l'obligation actuelle de transférer une ressource économique à la suite d'événements passés (ch. 4, § 4.2)"],
            ['Prudence et neutralité', "Prudence entendue comme circonspection, **au service de la neutralité** (§ 2.16-2.17)", "Prudence érigée en convention ; la **neutralité n'est pas retenue** comme caractéristique de l'image fidèle"],
            ['Évaluation', "Plusieurs bases : coût historique et valeurs actuelles (chapitre 6)", "Convention du **coût historique** ; valeur actuelle à l'inventaire (AUDCIF art. 42-43)"],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Du « probable » au « potentiel » : un mot qui change le bilan",
        texte: "Sous le Cadre de 2010, un droit dont les avantages sont peu probables pouvait échouer à la définition même de l'actif. Sous celui de 2018, il suffit que le droit existe et que, « in at least one circumstance », il produise pour l'entité des avantages supérieurs à ceux dont disposent les autres parties : il n'est pas nécessaire que ce soit certain, « or even likely » (§ 4.14). Un droit peut donc être un actif même si la probabilité d'avantages est faible ; cette faible probabilité pèse ensuite sur la comptabilisation et l'évaluation (§ 4.15, 5.15-5.17). Le Cadre prend lui-même l'exemple de l'option achetée : la ressource économique est le droit présent d'exercer l'option, non les avantages futurs que son exercice procurera (§ 4.17). Le raisonnement se fait en deux temps, d'abord « est-ce un actif ? », ensuite « faut-il le comptabiliser, et pour combien ? ».",
      },
      { type: 'controle', question: QCM[14] },
    ],
  },
  {
    numero: '1.5',
    titre: "Mesurer : bases d'évaluation et maintien du capital",
    navLabel: 'Évaluer',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Reconnaître un actif ne suffit pas : il faut lui donner un montant. L'évaluation implique toujours le choix d'une **base d'évaluation** (Cadre 2018, § 6.1). Le Cadre de 2010 en énumérait quatre, combinées dans les mêmes états : le coût historique, le coût actuel, la valeur de réalisation (ou de règlement) et la valeur actuelle au sens de valeur actualisée. Le Cadre de 2018 les réorganise en deux familles : le **coût historique**, qui utilise une information dérivée au moins en partie du prix de la transaction d'origine (§ 6.4), et la **valeur actuelle**, mise à jour pour refléter les conditions à la date d'évaluation et qui n'est pas dérivée, même en partie, de ce prix (§ 6.10).",
      },
      {
        type: 'carte',
        titre: "Les trois valeurs actuelles du Cadre de 2018",
        tableau: {
          entetes: ['Base', 'Point de vue', 'Coûts de transaction'],
          lignes: [
            ["**Juste valeur** (§ 6.12) : prix reçu pour vendre un actif ou payé pour transférer un passif, lors d'une transaction normale entre intervenants du marché", "Celui des intervenants du marché (valeur de sortie)", "Ni à l'entrée, ni à la sortie"],
            ["**Valeur d'utilité** (actifs) ou **valeur d'exécution** (*fulfilment value*, passifs) (§ 6.17) : valeur actualisée des flux que l'entité attend de l'utilisation de l'actif et de sa sortie, ou qu'elle devra transférer pour exécuter le passif", "Celui de l'entité (§ 6.19)", "Pas les coûts d'entrée ; ceux de sortie ou d'exécution sont intégrés"],
            ["**Coût actuel** (§ 6.21) : coût d'un actif équivalent à la date d'évaluation, ou contrepartie qui serait reçue pour un passif équivalent", "Valeur d'entrée, comme le coût historique", "Inclus (ajoutés pour un actif, déduits pour un passif)"],
          ],
        },
        note: "Le tableau 6.1 du Cadre détaille, base par base, l'information produite au bilan et au compte de résultat. La distinction du point de vue (marché ou entité) est capitale : elle sépare IFRS 13 d'IAS 36, que vous retrouverez au chapitre 3.",
      },
      {
        type: 'paragraphe',
        texte: "Derrière la base d'évaluation se cache une question plus profonde : **quel capital l'entité doit-elle préserver avant de pouvoir se dire bénéficiaire ?** Le Cadre distingue le capital financier, synonyme d'actif net ou de capitaux propres, adopté par la plupart des entités, et le capital physique, entendu comme la capacité de production (§ 8.1). Le concept de maintien du capital fait le lien entre capital et résultat, parce qu'il fournit « the point of reference by which profit is measured » : seules les entrées d'actifs excédant ce qui est nécessaire au maintien du capital sont un rendement *du* capital, le reste en est un remboursement (§ 8.4). Le choix dépend des besoins des utilisateurs : capital nominal ou pouvoir d'achat investi pour les uns, capacité opérationnelle pour les autres (§ 8.2). Le capital physique impose l'évaluation au coût actuel (§ 8.5).",
      },
      {
        type: 'carte',
        titre: "Un même exercice, trois résultats",
        texte: "Capitaux propres d'ouverture : 1 000, placés en 100 unités de marchandises à 10. Les 100 unités sont revendues 1 500 en fin d'exercice. Inflation de l'exercice : 20 %. Coût de remplacement d'une unité à la clôture : 13.",
        tableau: {
          entetes: ['Concept', 'Capital à maintenir', 'Résultat', 'Ajustement de maintien du capital'],
          lignes: [
            ['Capital financier nominal', '1 000', '**500**', '0'],
            ["Capital financier à pouvoir d'achat constant", '1 000 × 1,20 = 1 200', '**300**', '200'],
            ['Capital physique', '100 unités × 13 = 1 300', '**200**', '300'],
          ],
        },
        note: "L'ajustement n'est pas une charge : il est porté en capitaux propres comme ajustement de maintien du capital ou réserve de réévaluation (§ 8.10). En période de forte inflation, comme la RDC en a connu, l'écart entre ces résultats cesse d'être théorique.",
      },
      { type: 'controle', question: QCM[19] },
      {
        type: 'filet',
        titre: "Le SYSCOHADA retient la plus faible des deux valeurs",
        texte: "Le cadre conceptuel du SYSCOHADA révisé définit la valeur actuelle comme « une valeur d'estimation du moment qui s'apprécie en fonction du marché et de l'utilité du bien pour l'entité », une notion qui mêle les deux points de vue que le Cadre de l'IASB sépare. Et il en fait un usage essentiellement prudentiel : la valeur nette au bilan est la plus faible de la valeur d'entrée et de la valeur actuelle. Les plus-values latentes restent donc hors bilan, les moins-values y entrent. Côté capital, le SYSCOHADA retient le maintien du capital financier en francs courants, avec exclusion des gains de détention, sauf pour les devises détenues et les instruments financiers.",
      },
      { type: 'controle', question: QCM[20] },
    ],
  },
  {
    numero: '1.6',
    titre: "La juste valeur selon IFRS 13 : un prix de sortie, vu du marché",
    navLabel: 'Juste valeur',
    blocs: [
      {
        type: 'paragraphe',
        texte: "La juste valeur traverse tout le référentiel : immeubles de placement (IAS 40), instruments financiers (IFRS 9), actifs biologiques (IAS 41), regroupements d'entreprises (IFRS 3), valeur recouvrable (IAS 36). Pendant longtemps, chaque norme en donnait sa propre version. **IFRS 13**, applicable depuis 2013, ne dit pas *quand* évaluer à la juste valeur ; elle dit *comment* le faire, pour toutes les normes qui l'imposent ou la permettent. Elle écarte trois mesures voisines mais distinctes : les transactions d'IFRS 2, les opérations de location d'IFRS 16, et deux valeurs spécifiques à l'entité, la valeur nette de réalisation d'IAS 2 et la valeur d'utilité d'IAS 36 (§ 5-7).",
      },
      {
        type: 'filet',
        titre: "Un prix de sortie, entre intervenants du marché (IFRS 13.9)",
        texte: "La juste valeur est « le prix qui serait reçu pour la vente d'un actif ou payé pour le transfert d'un passif lors d'une transaction normale entre des intervenants du marché à la date d'évaluation ». Chaque mot compte. *Reçu pour la vente* : c'est une valeur de sortie, pas un coût d'acquisition. *Transaction normale* : ni liquidation forcée ni vente en catastrophe. *Intervenants du marché* : des acheteurs et vendeurs indépendants, informés, capables et disposés à traiter, et non l'entité elle-même. L'intention de l'entité de conserver l'actif n'entre pas en ligne de compte (§ 1-4).",
      },
      {
        type: 'carte',
        titre: "Les quatre questions de toute évaluation à la juste valeur",
        liste: [
          "**Quel élément ?** Les caractéristiques que le marché prendrait en compte (état, localisation, restrictions de vente ou d'utilisation), au niveau de l'unité de comptabilisation fixée par la norme applicable (§ 11-14).",
          "**Sur quel marché ?** Le **marché principal**, celui qui présente le volume et le niveau d'activité les plus élevés pour l'élément. À défaut seulement, le **marché le plus avantageux**, qui maximise le prix net reçu après coûts de transaction et frais de transport (§ 15-19). Le prix du marché principal prévaut, « même si le prix pratiqué sur un autre marché peut être plus avantageux à la date d'évaluation » (§ 18).",
          "**Avec quelles hypothèses ?** Celles d'intervenants du marché agissant au mieux de leur intérêt économique, décrits par leurs caractéristiques générales et non comme des contreparties identifiées (§ 22-23).",
          "**Quel prix ?** Un prix qui « ne doit pas être ajusté en fonction des coûts de transaction », lesquels « sont plutôt propres à la transaction » (§ 25), mais ajusté des frais de transport lorsque la localisation est une caractéristique de l'élément (§ 26).",
        ],
      },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
      {
        type: 'paragraphe',
        texte: "Pour un actif non financier, un terrain, une usine, une marque, la juste valeur suppose son **utilisation optimale** : celle qui maximise sa valeur du point de vue des intervenants du marché, à condition d'être physiquement possible, légalement admissible et financièrement faisable (§ 27-28). Et « l'utilisation actuelle que l'entité fait d'un actif non financier est présumée être l'utilisation optimale, à moins que le marché ou d'autres facteurs donnent à penser que des intervenants du marché pourraient maximiser la valeur de l'actif en l'utilisant différemment » (§ 29). Une parcelle agricole en bordure d'une ville qui s'étend se valorise peut-être comme terrain à bâtir, même si l'entité continue d'y cultiver. Pour un passif, la norme suppose un **transfert** à un intervenant du marché, le passif restant dû : sa juste valeur intègre le **risque de non-exécution**, y compris le risque de crédit propre de l'entité (§ 34, 42).",
      },
      {
        type: 'carte',
        titre: "La hiérarchie des justes valeurs (§ 72-90)",
        tableau: {
          entetes: ['Niveau', 'Données d\'entrée', 'Exemples'],
          lignes: [
            ['**1**', "Cours non ajustés sur des marchés actifs, pour des éléments **identiques**, accessibles à la date d'évaluation", "Action cotée sur une bourse active"],
            ['**2**', "Données autres que les cours de niveau 1, observables directement ou indirectement", "Cours d'éléments similaires ; taux, courbes, volatilités implicites, écarts de crédit observables"],
            ['**3**', "Données non observables, utilisées seulement à défaut de données observables pertinentes, mais qui reflètent les hypothèses des intervenants du marché", "Flux prévisionnels internes ; écart de crédit estimé sans référence de marché"],
          ],
        },
        note: "La hiérarchie classe les données d'entrée, pas les techniques. La juste valeur « est alors classée globalement au même niveau de la hiérarchie que la donnée d'entrée du plus bas niveau qui est importante pour la juste valeur prise dans son ensemble » (§ 73). Et jamais de décote de bloc reflétant la seule taille de la position détenue (§ 69, § 80).",
      },
      { type: 'controle', question: QCM[9] },
      {
        type: 'paragraphe',
        texte: "Faute de prix observable, on recourt à une **technique d'évaluation** qui maximise les données observables et minimise les autres (§ 61-67). La norme en connaît trois familles : l'approche par le marché (multiples, évaluation matricielle), l'approche par les coûts (coût de remplacement de la capacité de service, corrigé de l'obsolescence) et l'approche par le résultat (actualisation, modèles d'options, bénéfices excédentaires). L'annexe B détaille la plus courante, l'actualisation, sous deux formes : l'ajustement du taux, qui actualise des flux contractuels ou les plus probables à un taux de marché ajusté du risque, et l'**espérance de la valeur actualisée**, qui actualise des flux pondérés par leurs probabilités.",
      },
      {
        type: 'carte',
        titre: "Deux chemins vers 722 : l'espérance de la valeur actualisée",
        liste: [
          "Un flux de trésorerie attendu dans un an, pondéré par les probabilités, 780. Taux sans risque 5 %. Prime de risque exigée par le marché 3 %.",
          "**Méthode 2** (taux ajusté du risque systématique) : 780 / 1,08 = **722**.",
          "**Méthode 1** (flux ajustés du risque) : l'équivalent certain du flux est 722 × 1,05 ≈ 758, soit une déduction d'environ 22 pour le risque ; actualisé au taux sans risque, 758 / 1,05 ≈ **722**.",
          "**Leçon** : le risque se loge soit dans les flux, soit dans le taux, jamais dans les deux (§ B14, B33). L'oublier, c'est le compter deux fois.",
        ],
      },
      { type: 'controle', question: QCM[10] },
      {
        type: 'filet',
        titre: "Le prêt à 2 % qui ne vaut pas son nominal",
        texte: "Le prix de transaction n'égale pas toujours la juste valeur (§ 57-60), notamment entre parties liées ou lorsque les conditions ne sont pas celles du marché. Beaucoup d'entreprises congolaises consentent à leurs salariés des prêts à taux réduit. Le mécanisme : un prêt de 10 000 sur deux ans à 2 %, quand le marché prête à 12 %, vaut 200 / 1,12 + 10 200 / 1,12² ≈ **8 310**. Les 1 690 d'écart ne sont pas un « prêt » : ils traduisent un avantage consenti au salarié, que d'autres normes viennent qualifier (§ 60 : « sauf disposition contraire »). Lorsque ces prêts sont significatifs, les laisser à leur valeur nominale expose l'entreprise à une réserve de son auditeur.",
      },
      {
        type: 'filet',
        titre: "Une juste valeur sans bourse de valeurs",
        texte: "Le ROSC relevait en 2010 que la RDC « n'a pas de bourse de valeurs ». Conséquence pratique : les évaluations de niveau 1 y sont rares et la plupart des justes valeurs relèvent des niveaux 2 et 3. Or c'est au niveau 3 que la norme est la plus exigeante en informations (§ 93) : description des processus d'évaluation, données non observables chiffrées, rapprochement des soldes d'ouverture et de clôture, sensibilité aux hypothèses. Un marché peu actif n'autorise pas pour autant à retenir un prix de liquidation : l'objectif reste le prix d'une transaction normale (§ B37-B47).",
      },
    ],
  },
  {
    numero: '1.7',
    titre: "IAS 1 : les caractéristiques générales des états financiers",
    navLabel: 'IAS 1',
    blocs: [
      {
        type: 'paragraphe',
        texte: "IAS 1 traduit le Cadre en obligations positives. La première est l'**image fidèle** : les états « doivent présenter une image fidèle de la situation financière, de la performance financière et des flux de trésorerie de l'entité », et l'application des IFRS, avec des informations supplémentaires si nécessaire, « est présumée conduire » à cette image (§ 15). Présumée, pas garantie : IAS 1.17 ajoute qu'elle suppose aussi de choisir les méthodes selon IAS 8, de présenter une information pertinente, fiable, comparable et compréhensible, et de compléter l'information lorsque le simple respect des dispositions ne suffit pas à faire comprendre une transaction.",
      },
      {
        type: 'filet',
        titre: "Conforme, ou non : IAS 1.16 ne connaît pas de milieu",
        texte: "« L'entité dont les états financiers sont conformes aux IFRS doit procéder à une déclaration explicite et sans réserve de cette conformité dans les notes. L'entité ne doit décrire des états financiers comme étant conformes aux IFRS que s'ils sont conformes à toutes les dispositions des IFRS. » Et au § 18 : « L'entité ne peut pas corriger des méthodes comptables inappropriées, ni par l'indication des méthodes comptables utilisées, ni par des notes ou d'autres textes explicatifs. »",
      },
      { type: 'controle', question: QCM[5] },
      {
        type: 'paragraphe',
        texte: "La conformité est donc binaire, avec une seule soupape, la **dérogation** des § 19 à 24, que la pratique anglo-saxonne appelle *true and fair override*. Elle n'est ouverte que dans des « circonstances extrêmement rares », lorsque le respect d'une disposition serait trompeur au point d'être contraire à l'objectif des états financiers, et seulement si le cadre réglementaire l'impose ou ne l'interdit pas. Son prix est une transparence totale (§ 20) : déclarer que la direction estime l'image fidèle, désigner la norme écartée, la nature de l'écart, le traitement imposé, la raison pour laquelle il serait trompeur, le traitement appliqué, et chiffrer pour chaque période l'effet sur chaque élément concerné. Si le régulateur interdit l'écart, l'entité applique la norme et réduit le caractère trompeur par des informations en notes (§ 23).",
      },
      { type: 'controle', question: QCM[4] },
      {
        type: 'carte',
        titre: "Les autres caractéristiques générales",
        liste: [
          "**Continuité de l'exploitation** (§ 25-26) : la direction l'évalue elle-même, sur un horizon d'au moins douze mois à compter de la clôture. Elle l'écarte si elle a l'intention de liquider ou de cesser l'activité, ou si aucune autre solution réaliste ne s'offre à elle ; les incertitudes significatives sont indiquées dans tous les cas.",
          "**Comptabilité d'engagement** (§ 27-28) : obligatoire, sauf pour les informations sur les flux de trésorerie ; un élément est comptabilisé lorsqu'il satisfait aux définitions et critères du Cadre.",
          "**Importance relative et regroupement** (§ 29-31) : chaque catégorie significative d'éléments similaires est présentée séparément ; une information imposée par une IFRS peut être omise si elle n'est pas significative, même lorsque la norme dresse une liste « minimale ».",
          "**Non-compensation** (§ 32-35) : pas de compensation d'actifs et de passifs, ni de produits et de charges, sauf si une IFRS l'impose ou l'autorise ; les résultats de cession d'actifs non courants se présentent nets, et les gains et pertes d'un ensemble de transactions similaires aussi, sauf s'ils sont significatifs.",
          "**Fréquence et comparatifs** (§ 36-38) : un jeu complet au moins une fois par an, avec des informations comparatives de la période précédente pour tous les montants présentés.",
        ],
      },
      {
        type: 'filet',
        titre: "Goma, Bukavu et l'hypothèse de continuité",
        texte: "Un distributeur dont les dépôts de Goma et de Bukavu sont devenus inaccessibles doit se poser la question d'IAS 1.25 : existe-t-il des « incertitudes significatives liées à des événements ou à des conditions susceptibles de jeter un doute important sur la capacité de l'entité à poursuivre son activité » ? La direction prend en compte toutes les informations disponibles sur l'avenir, au minimum sur douze mois à compter de la clôture (§ 26), documente son analyse et, si l'incertitude est significative, l'indique dans les notes. L'auditeur peut alors attirer l'attention du lecteur sur cette information, sans pour autant modifier son opinion.",
      },
      { type: 'controle', question: QCM[17] },
      {
        type: 'paragraphe',
        texte: "Le caractère **significatif** mérite une attention particulière, car il gouverne tout le reste. IAS 1.7 le définit ainsi : une information est significative « si on peut raisonnablement s'attendre à ce que son omission, son inexactitude ou son obscurcissement influence les décisions que les principaux utilisateurs [...] prennent ». Le troisième terme, l'obscurcissement, est le plus moderne. La norme en donne cinq cas : formulation nébuleuse, information dispersée dans les états, regroupement d'éléments dissemblables, ventilation d'éléments semblables, et informations non significatives qui dissimulent les significatives. Le § 30A en tire la conséquence : l'entité ne doit pas diminuer la compréhensibilité de ses états en noyant l'essentiel. Une annexe de cent pages peut être moins transparente qu'une annexe de vingt.",
      },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[18] },
    ],
  },
  {
    numero: '1.8',
    titre: "IAS 8 : choisir une méthode quand la norme se tait",
    navLabel: 'IAS 8',
    blocs: [
      {
        type: 'paragraphe',
        texte: "IAS 8 définit les **méthodes comptables** comme « les principes, bases, conventions, règles et pratiques spécifiques appliqués par une entité lors de l'établissement et de la présentation de ses états financiers » (§ 5). La règle de départ est simple : lorsqu'une IFRS s'applique spécifiquement à une transaction, c'est elle qui détermine la méthode (§ 7). Le paragraphe 8 ajoute une souplesse et un garde-fou : on peut ne pas appliquer une méthode dont l'effet n'est pas significatif, mais il est « inapproprié de faire, ou de ne pas corriger, des écarts non significatifs par rapport aux IFRS en vue de parvenir à une présentation particulière ».",
      },
      { type: 'controle', question: QCM[13] },
      {
        type: 'carte',
        titre: "Quand aucune norme ne répond : la hiérarchie d'IAS 8",
        liste: [
          "**Étape 1.** Une IFRS ou une interprétation s'applique-t-elle spécifiquement ? Oui : l'appliquer (§ 7), guides d'application obligatoires compris (§ 9). Non : étape 2.",
          "**Étape 2.** Développer une méthode par jugement, qui produise une information **pertinente** et **fiable** : image fidèle, réalité économique plutôt que forme juridique, neutralité, prudence, exhaustivité (§ 10).",
          "**Étape 3.** Consulter, par ordre décroissant, (a) les IFRS traitant de questions similaires et liées, puis (b) les définitions, critères de comptabilisation et concepts d'évaluation du Cadre conceptuel (§ 11).",
          "**Étape 4, facultative.** Considérer les positions récentes d'autres normalisateurs à cadre similaire, la littérature et les pratiques du secteur, pourvu qu'elles ne contredisent pas l'étape 3 (§ 12).",
          "**Étape 5.** Appliquer la méthode retenue avec **cohérence** aux transactions similaires (§ 13), et ne la changer que si une IFRS l'impose ou si le changement fournit une information fiable et plus pertinente (§ 14).",
        ],
      },
      { type: 'controle', question: QCM[11] },
      {
        type: 'filet',
        titre: "Des droits d'émission reçus gratuitement : que faire ?",
        texte: "Une coopérative agricole du Kwilu reçoit gratuitement des unités de réduction d'émissions qu'elle peut revendre. Le référentiel IFRS ne comporte pas de norme spécifique pour ces droits : IAS 8.10-11 s'impose. Premier réflexe, chercher les normes traitant de questions similaires : un droit négociable, sans substance physique, évoque IAS 38 ; son attribution gratuite par une autorité publique évoque IAS 20. Second réflexe, revenir aux définitions du Cadre : le droit est-il une ressource économique contrôlée ? Oui, s'il est négociable et que l'entité peut en disposer. Plusieurs méthodes peuvent être défendables. L'exigence n'est pas de trouver la seule bonne réponse, mais de retenir une méthode justifiée par la hiérarchie, de l'appliquer avec cohérence (§ 13) et de la décrire en notes.",
      },
      { type: 'controle', question: QCM[12] },
    ],
  },
  {
    numero: '1.9',
    titre: "IFRS et SYSCOHADA révisé : deux théories de l'information",
    navLabel: 'IFRS et SYSCOHADA',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Il serait trop simple d'opposer une comptabilité « moderne » à une comptabilité « fiscale ». Le SYSCOHADA révisé de 2017 s'est beaucoup rapproché de l'IASB : son cadre conceptuel reprend la définition de l'actif comme « ressource économique actuelle contrôlée par l'entité du fait d'événements passés », les mêmes caractéristiques qualitatives essentielles (pertinence, image fidèle) et les mêmes caractéristiques auxiliaires. Mais il s'en sépare sur des choix de fond, qui tiennent à la question de départ : *pour qui compte-t-on ?* L'IASB répond « pour l'investisseur et le prêteur » ; le SYSCOHADA répond par une **pertinence partagée** entre tous les utilisateurs, sans privilégier fondamentalement les uns par rapport aux autres.",
      },
      {
        type: 'tableau',
        tableau: {
          entetes: ['Question', 'Cadre de l\'IASB', 'SYSCOHADA révisé'],
          lignes: [
            ['Utilisateurs', "Principaux : investisseurs, prêteurs, autres créanciers (Cadre § 1.2 et 1.5 ; IAS 1.7)", "Pertinence partagée entre tous les utilisateurs"],
            ['Neutralité', "Composante de la fidélité (§ 2.13) ; la prudence n'est que circonspection à son service (§ 2.16)", "Non retenue, en raison de la primauté de la prudence (art. 3 et 6 AUDCIF)"],
            ['Réalité économique', "Principe général (IAS 8.10(b)(ii) ; Cadre § 2.12, 4.59-4.62)", "Application limitée à quatre cas"],
            ['Évaluation', "Coût historique ou valeur actuelle selon les normes ; juste valeur définie par IFRS 13", "Plus faible de la valeur d'entrée et de la valeur actuelle"],
            ['Maintien du capital', "Selon les besoins des utilisateurs (§ 8.2)", "Capital financier en francs courants, gains de détention exclus sauf devises et instruments financiers"],
            ['Flux opérationnels', "Méthode directe ou indirecte, la directe étant encouragée (IAS 7.18-19)", "Méthode indirecte imposée"],
            ['Rôle en droit OHADA', "États « en sus », destinés aux marchés, sans effet sur le bénéfice distribuable (art. 8)", "États de référence, base du bénéfice distribuable"],
          ],
        },
      },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[16] },
      { type: 'controle', question: QCM[25] },
      {
        type: 'paragraphe',
        texte: "Chacun de ces choix se défend. La neutralité sert un investisseur qui veut une image sans biais pour arbitrer entre des placements. La prudence sert un créancier et un État qui veulent éviter les distributions de profits fictifs. La juste valeur sert la pertinence ; le coût historique sert la vérifiabilité. Le praticien congolais n'a pas à choisir son camp une fois pour toutes. Il tient des états SYSCOHADA pour l'entité commerciale ordinaire, établit des états IFRS « en sus » pour la société cotée ou le groupe qui se finance à l'étranger. Il doit parler les deux langues et savoir, à chaque phrase, laquelle il parle. Les sept chapitres qui suivent vous y entraînent norme par norme.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ue13c1-cp1',
    titre: "Deux jeux d'états : KATANGA MINING SERVICES SA (société fictive)",
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
    titre: "Calcul : évaluer à la juste valeur des cathodes de cuivre",
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
    titre: "Vrai ou faux : huit affirmations entendues en cabinet",
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
  sousTitre: "Du krach de 1929 à l'AUDCIF : la théorie qui tient le référentiel",
  infoBulle: "Chapitre 1 du module IFRS/IAS : histoire et écoles de normalisation, architecture IFRS Foundation-IASB-ISSB, force obligatoire en droit OHADA et en RDC, Cadre conceptuel (2010 et 2018), bases d'évaluation et maintien du capital, juste valeur selon IFRS 13, caractéristiques générales d'IAS 1, hiérarchie d'IAS 8, comparaison avec le SYSCOHADA révisé.",
  loiRef: "Cadre conceptuel (2018) · IAS 1.7, 15-38 · IAS 8.5-14 · IFRS 13 · AUDCIF art. 8, 73-1, 75, 113",
  moduleLabel: 'UE 13 · IFRS / IAS',
  retourRoute: '/ue13-ifrs-ias',
  coursId: 'ue13-ifrs-ias',
  objectifs: [
    "Situer la normalisation IFRS parmi les écoles comptables (anglo-saxonne, socialiste, franco-germanique) et dans l'histoire congolaise, du PCGC de 1976 au SYSCOHADA révisé et à l'article 8 de l'AUDCIF.",
    "Identifier les organes du dispositif, le contenu exact du référentiel (IAS 1.7) et les normes qui entrent en application de 2027 à 2029.",
    "Expliquer la force obligatoire des IFRS en droit OHADA (AUDCIF art. 8, 73-1, 75), et les trois portes par lesquelles une entreprise privée congolaise rencontre les IFRS.",
    "Maîtriser le Cadre conceptuel : objectif, limites, caractéristiques qualitatives, définitions, et ce qui a changé entre 2010 et 2018.",
    "Distinguer les bases d'évaluation et calculer un résultat selon les trois concepts de maintien du capital.",
    "Évaluer à la juste valeur selon IFRS 13 : marché principal ou le plus avantageux, utilisation optimale, hiérarchie des données, espérance de la valeur actualisée.",
    "Appliquer les caractéristiques générales d'IAS 1 et la hiérarchie d'IAS 8, et lire une déclaration de conformité et une opinion d'audit.",
    "Comparer de façon argumentée le Cadre de l'IASB et le cadre conceptuel du SYSCOHADA révisé.",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Pour qui compte-t-on ? L'IASB répond : pour les investisseurs, prêteurs et autres créanciers qui ne peuvent exiger de rapports sur mesure (Cadre § 1.2 et 1.5 ; IAS 1.7). Le SYSCOHADA répond par une pertinence partagée ; le PCGC de 1976 répondait : pour la statistique nationale (ROSC 2010).",
    "Les IFRS comprennent les IFRS, les IAS, les interprétations IFRIC et SIC (IAS 1.7 ; IAS 8.5). Le Cadre conceptuel n'est pas une norme ; en cas de conflit, la norme prédomine. IFRS 18 remplace IAS 1 pour les exercices ouverts à compter du 1er janvier 2027.",
    "En droit OHADA, les entités cotées ou faisant appel public à l'épargne établissent des états IFRS en sus des états SYSCOHADA, destinés exclusivement aux marchés et sans effet sur le bénéfice distribuable (AUDCIF art. 8), déposés et audités (art. 73-1), depuis le 1er janvier 2019 (art. 113).",
    "Cadre : deux caractéristiques essentielles, pertinence et fidélité (complète, neutre, exempte d'erreurs), et quatre auxiliaires. En 2018, l'actif devient une ressource économique actuelle, c'est-à-dire un droit ayant le potentiel de produire des avantages, même peu probables (§ 4.3-4.15), et la prudence revient comme circonspection au service de la neutralité (§ 2.16). Le Cadre n'est pas une norme et ne l'emporte jamais sur une norme (§ SP1.2).",
    "Juste valeur (IFRS 13.9) : prix de sortie, fondé sur le marché, sur le marché principal ou à défaut le plus avantageux, sans coûts de transaction mais après transport, selon l'utilisation optimale ; hiérarchie à trois niveaux fondée sur les données d'entrée ; exigences d'information maximales au niveau 3.",
    "IAS 1 : image fidèle présumée (§ 15) ; conformité à toutes les dispositions ou pas de conformité (§ 16) ; dérogation extrêmement rare et entièrement documentée (§ 19-24) ; continuité évaluée sur au moins douze mois (§ 25-26) ; engagement ; significatif, y compris l'obscurcissement (§ 7) ; non-compensation (§ 32).",
    "IAS 8 : la norme spécifique d'abord (§ 7) ; sinon le jugement, guidé par les normes similaires puis le Cadre (§ 10-11), les pratiques n'intervenant qu'en appoint (§ 12) ; cohérence et permanence (§ 13-14). Aucun écart, même minime, ne peut viser une présentation particulière (§ 8).",
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
