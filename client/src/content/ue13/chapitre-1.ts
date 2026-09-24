import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 13 — Chapitre 1 : Fondements, cadre conceptuel et architecture des IFRS
//
// Sources lues sur texte pendant la rédaction :
// - IAS 1 (texte français intégral) : § 7 (définitions, dont « significatif »
//   et l'obscurcissement), §§ 15 à 38 (caractéristiques générales).
// - IAS 8 (texte français intégral) : § 5 (définitions), §§ 7 à 14.
// - IAS 7 §§ 18-19 (méthodes directe et indirecte).
// - IFRS 13 (texte français, transcription condensée) : § 9 (citation
//   littérale), §§ 15-26, 27-33, 57-60, 61-90, annexe A, § B27-B30.
// - IFRS 18, annexe C § C8 et annexe D (texte anglais intégral) : IFRS 18
//   remplace IAS 1, amendements applicables au 1er janvier 2027.
// - AUDCIF (2017) : art. 8, 73-1, 75, 113 ; Cadre conceptuel du SYSCOHADA
//   révisé (Titre V : utilisateurs, postulats, conventions, caractéristiques
//   qualitatives, actif, valeur actuelle, maintien du capital).
// - GCEC-IFRS de la BCC (vol. 1, ch. 1) : contexte congolais (loi 76-020,
//   ordonnance 77-332, COPIMECI), conformité aux IFRS, reprise du Cadre
//   conceptuel de 2010 avec ses renvois de paragraphes (OB, QC, 4.x).
// - Rapport ROSC Comptabilité et audit RDC (Banque mondiale, 2010), ch. 3.
// - Rapports publiés : BOA RDC 2018 (note 3.1 et rapport du CAC), BCDC 2018
//   (rapport du CAC), Rawbank 2025 (rapport du CAC).
// - Cadre conceptuel révisé de 2018 : le texte de l'IASB n'est pas encodé dans
//   le corpus. Ses apports sont repris de la présentation qu'en donne le
//   manuel DSCG 4 (Obert, Dunod 2025, fiche 12), et signalés comme tels.
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
    explication: "L'objectif posé au paragraphe OB2 du Cadre est de fournir des informations utiles aux investisseurs, aux prêteurs et aux autres créanciers actuels et potentiels pour leurs décisions sur la fourniture de ressources à l'entité. Le Cadre précise que les autorités de réglementation peuvent trouver ces rapports utiles, mais qu'ils ne visent pas prioritairement leurs besoins (OB10). La « pertinence partagée » (réponse d) est la position du cadre conceptuel du SYSCOHADA révisé, pas celle de l'IASB.",
    articleRef: "Cadre conceptuel, OB2 et OB10 (repris au GCEC-IFRS, vol. 1, § 2.1.1)",
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
    explication: "IAS 1.7 et IAS 8.5 définissent les IFRS comme « les normes et interprétations publiées par l'International Accounting Standards Board (IASB) », comprenant (a) les Normes internationales d'information financière, (b) les Normes comptables internationales, (c) les interprétations IFRIC et (d) les interprétations SIC. Le Cadre conceptuel n'en fait pas partie : il n'est pas une norme et, en cas de conflit, la norme l'emporte (GCEC-IFRS, vol. 1, § 2).",
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
    question: "Une banque déclare en note : « Les états financiers sont préparés conformément aux IFRS. La norme IFRS 9 n'a pas pu être appliquée. » Que dit IAS 1.16 de cette déclaration ?",
    options: [
      { id: 'a', texte: "Elle est valable, puisque l'écart est expliqué en note" },
      { id: 'b', texte: "Elle est valable si le régulateur a autorisé le report d'IFRS 9" },
      { id: 'c', texte: "Elle est contradictoire : on ne peut décrire des états comme conformes aux IFRS que s'ils sont conformes à toutes les dispositions des IFRS" },
      { id: 'd', texte: "Elle est valable pendant une période transitoire de deux ans" },
    ],
    reponseCorrecte: 'c',
    explication: "Cette formulation figure mot pour mot dans la note 3.1 des états IFRS 2018 de BOA RDC. IAS 1.16 exige une déclaration « explicite et sans réserve » et interdit de qualifier des états de conformes aux IFRS s'ils ne respectent pas toutes les dispositions des IFRS. IAS 1.18 ajoute que des méthodes inappropriées ne se corrigent pas par des notes. L'autorisation du régulateur peut régler la question prudentielle, pas la conformité aux IFRS : le commissaire aux comptes a d'ailleurs émis une opinion avec réserve sur ce point.",
    articleRef: "IAS 1.16 et 1.18 ; BOA RDC, états IFRS 2018",
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
    explication: "IAS 8.8 dispense d'appliquer une méthode dont l'effet n'est pas significatif. Mais la même phrase ferme la porte à l'abus : « il est inapproprié de faire, ou de ne pas corriger, des écarts non significatifs par rapport aux IFRS en vue de parvenir à une présentation particulière ». C'est l'intention qui disqualifie l'écart, même minime.",
    articleRef: "IAS 8.8",
  },
  {
    id: 'ue13c1-q15',
    question: "Qu'est-ce qui distingue la définition de l'actif du Cadre de 2018 de celle du Cadre de 2010 (reprise par le GCEC-IFRS) ?",
    options: [
      { id: 'a', texte: "2018 exige la propriété juridique, 2010 non" },
      { id: 'b', texte: "2010 lie l'actif à des avantages économiques futurs « attendus » ; 2018 le définit comme une ressource économique actuelle, c'est-à-dire un droit qui a le potentiel de produire des avantages" },
      { id: 'c', texte: "Aucune différence de fond" },
      { id: 'd', texte: "2018 supprime la notion de contrôle" },
    ],
    reponseCorrecte: 'b',
    explication: "Le Cadre de 2010, tel que le reprend le GCEC-IFRS (§ 2.3.3, renvoi au § 4.4), définit l'actif comme « une ressource contrôlée par l'entité du fait d'événements passés et dont des avantages économiques futurs sont attendus ». Le Cadre révisé de 2018 retient une « ressource économique actuelle » contrôlée du fait d'événements passés, la ressource économique étant « un droit ayant le potentiel de produire des avantages économiques » (présentation d'Obert, DSCG 4). L'accent passe de la probabilité des avantages à l'existence d'un droit. Le contrôle reste central dans les deux versions.",
    articleRef: "GCEC-IFRS vol. 1 § 2.3.3 (Cadre 2010, 4.4) ; Cadre 2018 d'après Obert, fiche 12",
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
    explication: "Le cadre conceptuel du SYSCOHADA révisé ne retient pas la neutralité comme caractéristique de l'image fidèle, en raison de la primauté de la convention de prudence (art. 3 et 6 AUDCIF). L'IASB fait l'inverse : l'information fidèle est complète, neutre et exempte d'erreurs, et la prudence n'y est admise que comme circonspection au service de la neutralité (Cadre 2018, d'après Obert). La comparabilité (d) est une caractéristique auxiliaire dans les deux référentiels.",
    articleRef: "SYSCOHADA révisé, cadre conceptuel, ch. 3 ; Cadre IASB 2018",
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
    explication: "En capital physique, il faut d'abord reconstituer la capacité de production de début d'exercice, soit 100 unités au coût actuel de 13, c'est-à-dire 1 300. Le résultat est donc 1 500 − 1 300 = 200. En capital financier nominal, le résultat serait 500 ; en capital financier à pouvoir d'achat constant, 1 500 − 1 000 × 1,20 = 300. Le concept de maintien du capital fixe le point de référence à partir duquel on mesure le résultat (Cadre, 4.59-4.60).",
    articleRef: "Cadre conceptuel, 4.57-4.60 (repris au GCEC-IFRS, § 2.6)",
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
    explication: "Le cadre conceptuel du SYSCOHADA révisé retient le maintien du capital financier, en francs courants, avec exclusion des gains de détention, sauf pour les devises détenues et les instruments financiers. Le Cadre de l'IASB laisse le choix du concept aux besoins des utilisateurs (4.58), la plupart des entités adoptant le capital financier (4.57).",
    articleRef: "SYSCOHADA révisé, cadre conceptuel, ch. 5 ; Cadre IASB 4.57-4.58",
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
    question: "En 2018, BOA RDC a retraité en IFRS ses états établis selon le guide comptable national. Pourquoi sa note précise-t-elle qu'« un retraitement des états financiers n'est pas un passage aux IFRS » ?",
    options: [
      { id: 'a', texte: "Parce que les IFRS interdisent tout retraitement" },
      { id: 'b', texte: "Parce qu'un passage intégral suppose de revoir les procédures pour que l'information soit saisie et produite directement selon les IFRS, et pas seulement convertie en fin d'exercice" },
      { id: 'c', texte: "Parce que la BCC n'avait pas encore publié le GCEC-IFRS" },
      { id: 'd', texte: "Parce que le retraitement ne portait que sur le bilan" },
    ],
    reponseCorrecte: 'b',
    explication: "La note de BOA RDC explique qu'un passage intégral « implique que les procédures de la Banque soient complètement revues de sorte que l'information financière soit saisie de manière à rendre disponibles les données financières et permettre leur présentation conformément aux IFRS ». Retraiter en fin d'exercice, c'est traduire ; basculer, c'est penser et saisir en IFRS dès l'origine. Le retraitement a réduit le total bilan de FC 369,9 milliards à FC 365,6 milliards.",
    articleRef: "BOA RDC, états IFRS 2018, base de préparation",
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
    explication: "Le ROSC relève que le PCGC « avait d'abord pour objectif premier de répondre aux besoins de l'État en matière de statistiques nationales » : les besoins des investisseurs n'y étaient pas une priorité. Il notait aussi l'absence de cadre conceptuel, l'absence de toute règle de consolidation et la seule présentation des charges par nature. C'est l'exact opposé de la logique du Cadre de l'IASB.",
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
        titre: "Passerelle : ce que le ROSC reprochait au PCGC",
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
        titre: "Ce que dit la norme : IAS 1.7 et IAS 8.5",
        texte: "Les IFRS « sont les normes et interprétations publiées par l'International Accounting Standards Board (IASB). Elles comprennent : (a) les Normes internationales d'information financière ; (b) les Normes comptables internationales ; (c) les interprétations IFRIC ; et (d) les interprétations SIC. » Le Cadre conceptuel n'est pas dans la liste. Le GCEC-IFRS de la Banque centrale du Congo le dit à sa manière : le Cadre « n'est pas une norme. Dans le cas où il existerait un conflit avec une norme, c'est la norme qui prédomine ».",
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
        titre: "Ce que dit l'AUDCIF : un double jeu d'états, pas une substitution",
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
        texte: "En RDC, le secteur bancaire a suivi un chemin propre, qui passe par le régulateur. La loi bancaire n° 003/2002 fixe le cadre des comptes des établissements de crédit ; la Banque centrale du Congo (BCC) crée en février 2010 le **COPIMECI** (Comité de pilotage de la migration des cadres comptables des établissements de crédit et des institutions de microfinance aux normes IFRS), dont les travaux produisent le **GCEC-IFRS** (2012). Le guide adopte le référentiel IFRS « dans toutes ses composantes » afin que les établissements puissent faire une « déclaration explicite et sans réserve de conformité aux IFRS », et prévoit que les normes nouvelles s'appliqueront à leurs dates d'effet « sans qu'il soit nécessaire de modifier le GCEC-IFRS ».",
      },
      {
        type: 'filet',
        titre: "Dans les comptes publiés : ce que certifie réellement l'auditeur",
        texte: "Lisez toujours la phrase d'opinion jusqu'au bout. Pour Rawbank (exercice 2025, rapport du commissaire aux comptes daté du 13 avril 2026), l'auditeur conclut que les états donnent une image fidèle « conformément aux règles et méthodes comptables applicables aux établissements de crédit (Guide Comptable des Établissements de Crédit) en vigueur en République Démocratique du Congo ». Pour BOA RDC et la BCDC (exercice 2018, états retraités en IFRS à la demande de la BCC), les auditeurs se prononcent « conformément aux normes internationales d'information financière (IFRS) ». Ce ne sont pas les mêmes référentiels. Une opinion sur un guide national, même d'inspiration IFRS, ne vaut pas déclaration de conformité aux IFRS au sens d'IAS 1.16.",
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
        texte: "Le Cadre conceptuel est, selon la formule du GCEC-IFRS, la « pierre d'assise » du référentiel : les autres aspects du Cadre découlent logiquement de son **objectif** (OB1). Publié en 1989, amendé en 2010 et entièrement révisé en 2018, il sert à l'IASB pour écrire des normes cohérentes, et aux préparateurs pour traiter les cas qu'aucune norme ne règle. Son autorité est indirecte mais réelle : IAS 1.15 impose une représentation fidèle « selon les définitions et les critères de comptabilisation des actifs, des passifs, des produits et des charges exposés dans le Cadre conceptuel », et IAS 8.11(b) en fait la deuxième source de la hiérarchie à consulter en l'absence de norme.",
      },
      {
        type: 'filet',
        titre: "Ce que dit le Cadre : l'objectif (OB2)",
        texte: "L'objectif de l'information financière à usage général est « de fournir, au sujet de l'entité [...] qui la présente, des informations utiles aux investisseurs, aux prêteurs et aux autres créanciers actuels et potentiels aux fins de leur prise de décisions sur la fourniture de ressources à l'entité ». Ces utilisateurs sont dits principaux parce qu'ils ne peuvent pas exiger de l'entité des rapports sur mesure : IAS 1.7 le rappelle, ils doivent « se fier aux rapports financiers à usage général pour obtenir une bonne partie des informations financières dont ils ont besoin ».",
      },
      { type: 'controle', question: QCM[0] },
      {
        type: 'carte',
        titre: "Ce que les états financiers ne sont pas (OB6 à OB11)",
        liste: [
          "**Pas exhaustifs** : ils ne contiennent pas toute l'information utile ; l'utilisateur doit y ajouter l'état de l'économie, le climat politique, les perspectives du secteur (OB6).",
          "**Pas une valeur de l'entité** : ils ne sont pas conçus pour montrer ce que vaut l'entreprise, seulement pour aider à l'estimer (OB7).",
          "**Pas taillés pour chacun** : les utilisateurs principaux ont des besoins potentiellement contradictoires ; l'IASB vise l'ensemble qui répond au plus grand nombre (OB8).",
          "**Pas exacts** : ils reposent pour une bonne part sur des estimations, des jugements et des modèles ; la vision idéale du Cadre ne sera probablement jamais pleinement réalisée (OB11).",
        ],
      },
      {
        type: 'paragraphe',
        texte: "Pour être utile, l'information doit réunir deux **caractéristiques qualitatives essentielles**. La *pertinence* d'abord : l'information peut faire une différence dans les décisions, parce qu'elle a une valeur prédictive, une valeur de confirmation, ou les deux ; l'importance relative en est un aspect propre à chaque entité, et l'IASB refuse pour cette raison de fixer un seuil chiffré uniforme (QC11). La *fidélité* ensuite : une image parfaitement fidèle est **complète**, **neutre** et **exempte d'erreurs**. Exempte d'erreurs ne veut pas dire exacte : une estimation peut être fidèlement représentée si elle est présentée comme telle, si le processus et ses limites sont expliqués, et s'il a été choisi et appliqué sans erreur. Quatre caractéristiques **auxiliaires** renforcent ensuite l'utilité : comparabilité, vérifiabilité, rapidité, compréhensibilité. Aucune ne peut rendre utile une information qui ne serait ni pertinente ni fidèle.",
      },
      {
        type: 'carte',
        titre: "Pas à pas : appliquer les caractéristiques essentielles (QC18)",
        liste: [
          "**1.** Identifier un phénomène économique susceptible d'être utile aux utilisateurs.",
          "**2.** Déterminer quel type d'information serait le plus pertinent pour ce phénomène, s'il était disponible et pouvait être représenté fidèlement.",
          "**3.** Vérifier si cette information est disponible et peut être représentée fidèlement. Si oui, le processus est achevé ; sinon, reprendre avec le type d'information le plus pertinent suivant.",
        ],
        note: "Contrainte transversale : le coût. Pour chaque projet, l'IASB apprécie si les avantages d'une information justifient les coûts de sa production et de son utilisation (QC38).",
      },
      {
        type: 'paragraphe',
        texte: "La révision de 2018 a déplacé plusieurs lignes. Elle a réintroduit la **prudence**, absente de la version de 2010, mais sous une forme précise : la circonspection dans l'exercice du jugement en situation d'incertitude, qui *soutient* la neutralité au lieu de la contredire. Elle a logé la primauté de la substance sur la forme au cœur de la fidélité : l'information fidèle « dépeint la substance économique de la transaction [...], laquelle ne correspond pas toujours à sa forme juridique ». Elle a introduit la notion d'**entité comptable**, celle qui prépare des états financiers à usage général, par choix ou par obligation. Et elle a réécrit les définitions des éléments.",
      },
      {
        type: 'tableau',
        tableau: {
          entetes: ['Élément', 'Cadre 2010 (repris par le GCEC-IFRS)', 'Cadre 2018 (présentations DSCG 4 : Obert, Baratay)'],
          lignes: [
            ['Actif', "Ressource contrôlée par l'entité du fait d'événements passés et dont des avantages économiques futurs sont **attendus** (4.4)", "Ressource économique **actuelle** contrôlée du fait d'événements passés ; la ressource économique est un **droit** ayant le potentiel de produire des avantages économiques"],
            ['Passif', "Obligation actuelle résultant d'événements passés dont l'extinction devrait se traduire par une sortie de ressources (4.4)", "Obligation actuelle de céder une ressource économique du fait d'événements passés"],
            ['Comptabilisation', "Deux critères : avantage futur **probable** ; coût ou valeur évaluable de manière **fiable** (4.38)", "Définition remplie, **et** comptabilisation qui fournit à la fois une information pertinente et une image fidèle de l'élément"],
            ['Prudence', "Absente des caractéristiques qualitatives", "Réintroduite comme circonspection, au service de la neutralité"],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Jugement professionnel : pourquoi le passage du « probable » au « potentiel » compte",
        texte: "Sous le Cadre de 2010, un droit dont les avantages sont peu probables pouvait échouer à la définition même de l'actif. Sous celui de 2018, le droit existe dès lors qu'il a le *potentiel* de produire des avantages ; la faible probabilité se traite ensuite, au stade de la comptabilisation et de l'évaluation. Exemple : une option d'achat de terrain très en dehors de la monnaie reste un actif au sens de 2018, puisqu'elle constitue un droit ; sa faible valeur se reflète dans son évaluation. Le raisonnement se fait en deux temps, d'abord « est-ce un actif ? », ensuite « faut-il le comptabiliser, et pour combien ? ».",
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
        texte: "Reconnaître un actif ne suffit pas : il faut lui donner un montant. L'évaluation est « le processus de détermination des montants monétaires » auxquels les éléments figurent dans les états (Cadre 2010, 4.53, repris par le GCEC-IFRS), et elle implique toujours le choix d'une **base d'évaluation**. Le Cadre de 2010 en énumérait quatre, combinées dans les mêmes états : le coût historique, le coût actuel, la valeur de réalisation (ou de règlement) et la valeur actuelle au sens de valeur actualisée. Le Cadre de 2018 les réorganise en deux familles : le **coût historique**, dérivé au moins en partie du prix de la transaction d'origine, et la **valeur actuelle**, qui reflète les conditions à la date d'évaluation et ne repose pas, même en partie, sur ce prix.",
      },
      {
        type: 'carte',
        titre: "Les trois valeurs actuelles du Cadre de 2018",
        tableau: {
          entetes: ['Base', 'Point de vue', 'Coûts de transaction'],
          lignes: [
            ["**Juste valeur** : prix reçu pour vendre un actif ou payé pour transférer un passif entre intervenants du marché", "Celui des intervenants du marché", "Ni à l'entrée, ni à la sortie"],
            ["**Valeur d'utilité** (actifs) ou **de remboursement** (passifs) : valeur actualisée des flux que l'entité attend de l'utilisation de l'actif ou devra transférer pour éteindre le passif", "Celui de l'entité", "Pas les coûts d'entrée ; les coûts de sortie sont intégrés"],
            ["**Coût actuel** : contrepartie à payer aujourd'hui pour un actif équivalent, ou à recevoir pour assumer un passif équivalent", "Valeur d'entrée à la date d'évaluation", "Inclus (ajoutés pour un actif, déduits pour un passif)"],
          ],
        },
        note: "Source : présentation du Cadre de 2018 par Baratay (DSCG 4, Gualino, 2023). La distinction du point de vue (marché ou entité) est capitale : elle sépare IFRS 13 d'IAS 36, que vous retrouverez au chapitre 3.",
      },
      {
        type: 'paragraphe',
        texte: "Derrière la base d'évaluation se cache une question plus profonde : **quel capital l'entité doit-elle préserver avant de pouvoir se dire bénéficiaire ?** Le Cadre distingue le capital financier, synonyme d'actif net, adopté par la plupart des entités (4.57), et le capital physique, entendu comme la capacité de production. Le concept de maintien du capital « établit le lien entre le concept de capital et le concept de résultat parce qu'il fournit le point de référence par lequel le résultat est évalué » (4.60). Le choix dépend des besoins des utilisateurs : capital nominal ou pouvoir d'achat investi pour les uns, capacité opérationnelle pour les autres (4.58).",
      },
      {
        type: 'carte',
        titre: "Pas à pas : un même exercice, trois résultats",
        texte: "Capitaux propres d'ouverture : 1 000, placés en 100 unités de marchandises à 10. Les 100 unités sont revendues 1 500 en fin d'exercice. Inflation de l'exercice : 20 %. Coût de remplacement d'une unité à la clôture : 13.",
        tableau: {
          entetes: ['Concept', 'Capital à maintenir', 'Résultat', 'Ajustement de maintien du capital'],
          lignes: [
            ['Capital financier nominal', '1 000', '**500**', '0'],
            ["Capital financier à pouvoir d'achat constant", '1 000 × 1,20 = 1 200', '**300**', '200'],
            ['Capital physique', '100 unités × 13 = 1 300', '**200**', '300'],
          ],
        },
        note: "L'ajustement n'est pas une charge : il est porté en capitaux propres, comme une réserve de maintien du capital. En période de forte inflation, comme la RDC en a connu, l'écart entre ces résultats cesse d'être théorique.",
      },
      { type: 'controle', question: QCM[19] },
      {
        type: 'filet',
        titre: "Passerelle SYSCOHADA : la plus faible des deux valeurs",
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
        titre: "Ce que dit la norme : IFRS 13.9",
        texte: "La juste valeur est « le prix qui serait reçu pour la vente d'un actif ou payé pour le transfert d'un passif lors d'une transaction normale entre des intervenants du marché à la date d'évaluation ». Chaque mot compte. *Reçu pour la vente* : c'est une valeur de sortie, pas un coût d'acquisition. *Transaction normale* : ni liquidation forcée ni vente en catastrophe. *Intervenants du marché* : des acheteurs et vendeurs indépendants, informés, capables et disposés à traiter, et non l'entité elle-même. L'intention de l'entité de conserver l'actif n'entre pas en ligne de compte (§ 1-4).",
      },
      {
        type: 'carte',
        titre: "Les quatre questions de toute évaluation à la juste valeur",
        liste: [
          "**Quel élément ?** Les caractéristiques que le marché prendrait en compte (état, localisation, restrictions de vente ou d'utilisation), au niveau de l'unité de comptabilisation fixée par la norme applicable (§ 11-14).",
          "**Sur quel marché ?** Le **marché principal**, celui qui présente le volume et le niveau d'activité les plus élevés pour l'élément. À défaut seulement, le **marché le plus avantageux**, qui maximise le prix net reçu après coûts de transaction et frais de transport (§ 15-19). Le prix du marché principal prévaut même si un autre marché serait plus avantageux à la date d'évaluation.",
          "**Avec quelles hypothèses ?** Celles d'intervenants du marché agissant au mieux de leur intérêt économique, décrits par leurs caractéristiques générales et non comme des contreparties identifiées (§ 22-23).",
          "**Quel prix ?** Un prix non ajusté des coûts de transaction, qui sont propres à la transaction et non à l'élément (§ 25), mais ajusté des frais de transport lorsque la localisation est une caractéristique de l'élément (§ 26).",
        ],
      },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
      {
        type: 'paragraphe',
        texte: "Pour un actif non financier, un terrain, une usine, une marque, la juste valeur suppose son **utilisation optimale** : celle qui maximise sa valeur du point de vue des intervenants du marché, à condition d'être physiquement possible, légalement admissible et financièrement faisable (§ 27-28). L'usage actuel de l'entité est présumé optimal, sauf si le marché indique le contraire. Une parcelle agricole en bordure d'une ville qui s'étend se valorise peut-être comme terrain à bâtir, même si l'entité continue d'y cultiver. Pour un passif, la norme suppose un **transfert** à un intervenant du marché, le passif restant dû : sa juste valeur intègre le **risque de non-exécution**, y compris le risque de crédit propre de l'entité (§ 34, 42).",
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
        note: "La hiérarchie classe les données d'entrée, pas les techniques. La juste valeur prise dans son ensemble se classe au niveau de la donnée la plus basse qui est importante pour l'évaluation (§ 73). Et jamais de décote de bloc reflétant la seule taille de la position détenue (§ 69, § 80).",
      },
      { type: 'controle', question: QCM[9] },
      {
        type: 'paragraphe',
        texte: "Faute de prix observable, on recourt à une **technique d'évaluation** qui maximise les données observables et minimise les autres (§ 61-67). La norme en connaît trois familles : l'approche par le marché (multiples, évaluation matricielle), l'approche par les coûts (coût de remplacement de la capacité de service, corrigé de l'obsolescence) et l'approche par le résultat (actualisation, modèles d'options, bénéfices excédentaires). L'annexe B détaille la plus courante, l'actualisation, sous deux formes : l'ajustement du taux, qui actualise des flux contractuels ou les plus probables à un taux de marché ajusté du risque, et l'**espérance de la valeur actualisée**, qui actualise des flux pondérés par leurs probabilités.",
      },
      {
        type: 'carte',
        titre: "Pas à pas : l'espérance de la valeur actualisée (§ B27-B30)",
        liste: [
          "**Donnée** : flux de trésorerie attendu dans un an, pondéré par les probabilités, 780. Taux sans risque 5 %. Prime de risque exigée par le marché 3 %.",
          "**Méthode 2** (taux ajusté du risque systématique) : 780 / 1,08 = **722**.",
          "**Méthode 1** (flux ajustés du risque) : l'équivalent certain du flux est 722 × 1,05 ≈ 758, soit une déduction d'environ 22 pour le risque ; actualisé au taux sans risque, 758 / 1,05 ≈ **722**.",
          "**Leçon** : le risque se loge soit dans les flux, soit dans le taux, jamais dans les deux (§ B14, B33). L'oublier, c'est le compter deux fois.",
        ],
      },
      { type: 'controle', question: QCM[10] },
      {
        type: 'filet',
        titre: "Dans les comptes publiés : les prêts au personnel de la BCDC",
        texte: "Le prix de transaction n'égale pas toujours la juste valeur (§ 57-60), notamment entre parties liées ou lorsque les conditions ne sont pas celles du marché. Exercice 2018 : le commissaire aux comptes de la BCDC émet une opinion avec réserve parce que la banque « n'a pas procédé au retraitement (au taux le plus élevé sur le marché des prêts) des crédits octroyés à ses agents », soit FC 7,631 milliards, et qu'il n'a donc pu conclure sur leur valeur. Le mécanisme : un prêt de 10 000 sur deux ans à 2 %, quand le marché prête à 12 %, vaut 200 / 1,12 + 10 200 / 1,12² ≈ **8 310**. Les 1 690 d'écart ne sont pas un « prêt » : ils traduisent un avantage consenti au salarié, que d'autres normes viennent qualifier (§ 60 : « sauf disposition contraire »).",
      },
      {
        type: 'filet',
        titre: "Jugement professionnel : la juste valeur dans une économie sans bourse",
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
        titre: "Ce que dit la norme : IAS 1.16 et 1.18",
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
        titre: "Dans les comptes publiés : la continuité à l'épreuve de la crise dans l'Est",
        texte: "Les états 2025 de Rawbank ont été arrêtés le 7 avril 2026 « dans un contexte évolutif de crise militaro-politique dans l'est de la République Démocratique du Congo ». Le commissaire aux comptes a formulé une observation renvoyant à la note 45, consacrée à cette crise et à l'analyse de son impact sur les états financiers, en précisant qu'elle ne modifie pas son opinion. Voilà ce que produit concrètement IAS 1.25 : la direction évalue, documente et informe ; l'auditeur attire l'attention du lecteur sur l'information fournie.",
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
        titre: "Arbre de décision : la hiérarchie d'IAS 8",
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
        titre: "Jugement professionnel : des droits d'émission reçus gratuitement",
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
            ['Utilisateurs', "Principaux : investisseurs, prêteurs, autres créanciers (OB2 ; IAS 1.7)", "Pertinence partagée entre tous les utilisateurs"],
            ['Neutralité', "Composante de la fidélité ; la prudence n'est que circonspection à son service", "Non retenue, en raison de la primauté de la prudence (art. 3 et 6 AUDCIF)"],
            ['Réalité économique', "Principe général (IAS 8.10(b)(ii) ; Cadre)", "Application limitée à quatre cas"],
            ['Évaluation', "Coût historique ou valeur actuelle selon les normes ; juste valeur définie par IFRS 13", "Plus faible de la valeur d'entrée et de la valeur actuelle"],
            ['Maintien du capital', "Au choix, selon les besoins des utilisateurs (4.58)", "Capital financier en francs courants, gains de détention exclus sauf devises et instruments financiers"],
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
        texte: "Chacun de ces choix se défend. La neutralité sert un investisseur qui veut une image sans biais pour arbitrer entre des placements. La prudence sert un créancier et un État qui veulent éviter les distributions de profits fictifs. La juste valeur sert la pertinence ; le coût historique sert la vérifiabilité. Le praticien congolais n'a pas à choisir son camp une fois pour toutes. Il tient des états SYSCOHADA pour l'entité commerciale ordinaire, applique le GCEC-IFRS s'il travaille en banque, établit des états IFRS « en sus » pour la société cotée ou le groupe qui se finance à l'étranger. Il doit parler les deux langues et savoir, à chaque phrase, laquelle il parle. Les sept chapitres qui suivent vous y entraînent norme par norme.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ue13c1-cp1',
    titre: "Dossier réel : les premiers états IFRS de BOA RDC (exercice 2018)",
    contexte: "À la demande de la Banque centrale du Congo, BOA RDC SA a retraité en IFRS ses états 2017 et 2018, établis selon le guide comptable national. Extraits de sa note 3 : « Les présents états financiers ont été préparés conformément aux Normes internationales d'information financière (IFRS) publiées par l'International Accounting Standards Board. La norme IFRS 9 n'a pas pu être appliquée. Par une circulaire, la Banque Centrale du Congo, en sa qualité de régulateur, a autorisé les banques en difficulté d'implémentation de la norme IFRS 9, de la transposer dès la clôture de l'année 2019, ceci en remplacement de l'IAS 39. » La base de préparation ajoute qu'« un retraitement des états financiers n'est pas un passage aux IFRS », et que le retraitement a fait passer le total bilan de FC 369 888 733 740 à FC 365 633 130 983. Le commissaire aux comptes a émis une opinion avec réserve, fondée sur la non-application d'IFRS 9, obligatoire pour les exercices ouverts à compter du 1er janvier 2018.",
    questions: [
      {
        num: 1,
        enonce: "Confrontez la déclaration de conformité de la note 3.1 aux exigences d'IAS 1.",
        correction: "La déclaration est contradictoire. IAS 1.16 exige une déclaration « explicite et sans réserve » et interdit de décrire des états comme conformes aux IFRS s'ils ne sont pas conformes à « toutes les dispositions des IFRS ». Annoncer la conformité, puis l'exception d'IFRS 9 dans la phrase suivante, revient à une conformité partielle, que la norme ne connaît pas. IAS 1.18 ferme la dernière issue : on ne corrige pas une méthode inappropriée par une note qui l'avoue. La formulation correcte aurait été une description exacte du référentiel suivi, par exemple des états établis selon les IFRS à l'exception d'IFRS 9, sans revendiquer la conformité aux IFRS.",
      },
      {
        num: 2,
        enonce: "La circulaire de la BCC autorisant le report d'IFRS 9 ne suffit-elle pas à régulariser la situation ?",
        correction: "Elle règle la question prudentielle et réglementaire, pas la question normative. L'IASB est seul à fixer le contenu et la date d'effet d'IFRS 9 ; un régulateur national peut décider de ce qu'il exige des établissements qu'il supervise, mais il ne peut pas rendre « conformes aux IFRS » des états qui ne le sont pas. Deux cadres coexistent : celui du régulateur (le GCEC et ses mesures d'application) et celui de l'IASB. D'où l'opinion avec réserve : l'auditeur se prononce par rapport au référentiel revendiqué, ici les IFRS. On retrouve la logique d'IAS 1.19 et 1.23 : même lorsque le cadre réglementaire intervient, il ne transforme pas un écart en conformité, il appelle au mieux une information complète sur l'écart.",
      },
      {
        num: 3,
        enonce: "Que signifie la phrase « un retraitement des états financiers n'est pas un passage aux IFRS » ? Pourquoi est-elle éclairante pour un futur praticien ?",
        correction: "Retraiter, c'est convertir en fin d'exercice des comptes tenus selon un autre référentiel. Basculer, c'est revoir les procédures pour que l'information soit saisie et produite dès l'origine selon les IFRS : classement des instruments financiers, calcul des pertes attendues, taux d'intérêt effectif, juste valeur, informations sur les risques. La note de BOA RDC le dit elle-même : le passage intégral « implique que les procédures de la Banque soient complètement revues ». Pour le praticien, la leçon est double. Techniquement, un retraitement ne capte pas toujours les données que les IFRS exigent. Et le choix de référentiel engage les systèmes d'information, pas seulement la direction financière.",
      },
      {
        num: 4,
        enonce: "Le retraitement a réduit le total bilan d'environ FC 4,26 milliards. Calculez l'écart en pourcentage et proposez deux causes plausibles, sans prétendre les identifier.",
        correction: "Écart : 369 888 733 740 − 365 633 130 983 = 4 255 602 757 FC, soit 4 255 602 757 / 369 888 733 740 ≈ 1,15 % du total initial. Causes plausibles, à vérifier dans les notes de rapprochement et non à affirmer : l'application stricte de la non-compensation et des critères de comptabilisation (suppression d'actifs qui ne répondent pas à la définition, comme certaines charges étalées que le ROSC signalait dans le référentiel national) ; l'évaluation de créances au coût amorti ou à la juste valeur au lieu de leur valeur nominale. Notez que la même note mentionne des terrains et bâtiments réévalués à la juste valeur, ce qui joue en sens inverse : un total bilan net résulte de mouvements de signes opposés.",
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
        correction: "Faux. Le Cadre n'est pas une norme et, en cas de conflit, la norme prédomine (GCEC-IFRS, vol. 1, § 2). Il fait autorité par les renvois d'IAS 1.15 et d'IAS 8.11(b), et comme source du jugement en l'absence de norme spécifique, jamais contre une norme.",
      },
      {
        num: 2,
        enonce: "« Une interprétation IFRIC n'est qu'un avis ; on peut s'en écarter en l'expliquant. »",
        correction: "Faux. IAS 1.7 et IAS 8.5 incluent les interprétations IFRIC et SIC dans la définition même des IFRS. S'en écarter interdit la déclaration de conformité d'IAS 1.16, qui porte sur « toutes les dispositions des IFRS ».",
      },
      {
        num: 3,
        enonce: "« La juste valeur d'un immeuble, c'est ce qu'il vaut pour nous, compte tenu de l'usage que nous en faisons. »",
        correction: "Faux. C'est la définition de la valeur d'utilité, spécifique à l'entité. La juste valeur est une mesure fondée sur le marché, non spécifique à l'entité (IFRS 13.1-4 et § 9) : elle retient l'utilisation optimale du point de vue des intervenants du marché, l'usage actuel n'étant présumé optimal qu'en l'absence d'indication contraire (§ 27-30).",
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
        correction: "Faux, mais la nuance est essentielle. IAS 8.10(b)(iv) exige d'une méthode développée par jugement qu'elle soit « prudente ». Le Cadre de 2018 a réintroduit la prudence comme circonspection au service de la neutralité, pas comme un biais systématique en faveur de la sous-évaluation. C'est le SYSCOHADA révisé qui fait primer la prudence au point d'écarter la neutralité.",
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
        correction: "Plan possible. (1) La juste valeur sert la pertinence au sens de l'IASB : elle donne une valeur prédictive et de confirmation à jour, utile à l'investisseur qui arbitre (OB2 ; QC6-QC11). Mais elle peut coûter en vérifiabilité, surtout au niveau 3, dans une économie sans bourse : le Cadre l'admet, puisque les états reposent pour une bonne part sur des estimations (OB11), et IFRS 13 compense par l'information (§ 93). (2) La prudence du SYSCOHADA sert la protection des créanciers et prévient les distributions fictives ; mais en écartant la neutralité, elle accepte un biais, qui peut aller jusqu'aux réserves occultes que son propre cadre conceptuel condamne. (3) Le droit OHADA tranche par la répartition des rôles plutôt que par la hiérarchie : la prudence gouverne la distribution (états SYSCOHADA), la pertinence gouverne l'information des marchés (états IFRS). Conclusion : l'opposition n'est pas entre vérité et erreur, mais entre deux utilisateurs de référence.",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue13',
  numero: 1,
  id: 'ue13-chapitre-1',
  titre: 'Fondements, cadre conceptuel et architecture des IFRS',
  sousTitre: "Du krach de 1929 au GCEC-IFRS : la théorie qui tient le référentiel",
  infoBulle: "Chapitre 1 du module IFRS/IAS : histoire et écoles de normalisation, architecture IFRS Foundation-IASB-ISSB, force obligatoire en droit OHADA et en RDC, Cadre conceptuel (2010 et 2018), bases d'évaluation et maintien du capital, juste valeur selon IFRS 13, caractéristiques générales d'IAS 1, hiérarchie d'IAS 8, comparaison avec le SYSCOHADA révisé.",
  loiRef: "Cadre conceptuel · IAS 1.7, 15-38 · IAS 8.5-14 · IFRS 13 · AUDCIF art. 8, 73-1, 75, 113",
  moduleLabel: 'UE 13 · IFRS / IAS',
  retourRoute: '/ue13-ifrs-ias',
  coursId: 'ue13-ifrs-ias',
  objectifs: [
    "Situer la normalisation IFRS parmi les écoles comptables (anglo-saxonne, socialiste, franco-germanique) et dans l'histoire congolaise, du PCGC de 1976 au GCEC-IFRS.",
    "Identifier les organes du dispositif, le contenu exact du référentiel (IAS 1.7) et les normes qui entrent en application de 2027 à 2029.",
    "Expliquer la force obligatoire des IFRS en droit OHADA (AUDCIF art. 8, 73-1, 75) et dans le secteur bancaire congolais.",
    "Maîtriser le Cadre conceptuel : objectif, limites, caractéristiques qualitatives, définitions, et ce qui a changé entre 2010 et 2018.",
    "Distinguer les bases d'évaluation et calculer un résultat selon les trois concepts de maintien du capital.",
    "Évaluer à la juste valeur selon IFRS 13 : marché principal ou le plus avantageux, utilisation optimale, hiérarchie des données, espérance de la valeur actualisée.",
    "Appliquer les caractéristiques générales d'IAS 1 et la hiérarchie d'IAS 8, et lire une déclaration de conformité et une opinion d'audit.",
    "Comparer de façon argumentée le Cadre de l'IASB et le cadre conceptuel du SYSCOHADA révisé.",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Pour qui compte-t-on ? L'IASB répond : pour les investisseurs, prêteurs et autres créanciers qui ne peuvent exiger de rapports sur mesure (OB2 ; IAS 1.7). Le SYSCOHADA répond par une pertinence partagée ; le PCGC de 1976 répondait : pour la statistique nationale (ROSC 2010).",
    "Les IFRS comprennent les IFRS, les IAS, les interprétations IFRIC et SIC (IAS 1.7 ; IAS 8.5). Le Cadre conceptuel n'est pas une norme ; en cas de conflit, la norme prédomine. IFRS 18 remplace IAS 1 pour les exercices ouverts à compter du 1er janvier 2027.",
    "En droit OHADA, les entités cotées ou faisant appel public à l'épargne établissent des états IFRS en sus des états SYSCOHADA, destinés exclusivement aux marchés et sans effet sur le bénéfice distribuable (AUDCIF art. 8), déposés et audités (art. 73-1), depuis le 1er janvier 2019 (art. 113).",
    "Cadre : deux caractéristiques essentielles, pertinence et fidélité (complète, neutre, exempte d'erreurs), et quatre auxiliaires. En 2018, l'actif devient une ressource économique actuelle, c'est-à-dire un droit ayant le potentiel de produire des avantages, et la prudence revient comme circonspection au service de la neutralité.",
    "Juste valeur (IFRS 13.9) : prix de sortie, fondé sur le marché, sur le marché principal ou à défaut le plus avantageux, sans coûts de transaction mais après transport, selon l'utilisation optimale ; hiérarchie à trois niveaux fondée sur les données d'entrée ; exigences d'information maximales au niveau 3.",
    "IAS 1 : image fidèle présumée (§ 15) ; conformité à toutes les dispositions ou pas de conformité (§ 16) ; dérogation extrêmement rare et entièrement documentée (§ 19-24) ; continuité évaluée sur au moins douze mois (§ 25-26) ; engagement ; significatif, y compris l'obscurcissement (§ 7) ; non-compensation (§ 32).",
    "IAS 8 : la norme spécifique d'abord (§ 7) ; sinon le jugement, guidé par les normes similaires puis le Cadre (§ 10-11), les pratiques n'intervenant qu'en appoint (§ 12) ; cohérence et permanence (§ 13-14). Aucun écart, même minime, ne peut viser une présentation particulière (§ 8).",
  ],
  references: [
    { genre: 'texte', intitule: "IAS 1 — Présentation des états financiers", precision: "§ 7 (définitions) et §§ 15 à 38 (caractéristiques générales)" },
    { genre: 'texte', intitule: "IAS 8 — Méthodes comptables, changements d'estimations comptables et erreurs", precision: "§ 5 et §§ 7 à 14" },
    { genre: 'texte', intitule: "IFRS 13 — Évaluation de la juste valeur", precision: "§ 9, §§ 15 à 90, § 93, annexe A, §§ B27 à B30" },
    { genre: 'texte', intitule: "IFRS 18 — Presentation and Disclosure in Financial Statements", precision: "annexe C, § C8, et annexe D" },
    { genre: 'texte', intitule: "Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF, 2017)", precision: "art. 8, 73-1, 75 et 113 ; cadre conceptuel du SYSCOHADA révisé (Titre V)" },
    { genre: 'texte', intitule: "Banque centrale du Congo, Guide comptable des établissements de crédit (GCEC-IFRS)", precision: "volume 1, chapitre 1 : contexte, conformité aux IFRS, Cadre conceptuel" },
    { genre: 'texte', intitule: "Banque mondiale, Rapport sur le respect des normes et codes (ROSC), Comptabilité et audit, RDC", precision: "2010, chapitre 3 : le PCGC et les IFRS" },
    { genre: 'ouvrage', auteur: "Kinzonzi Mvutukidi Ngindu K.", titre: "La normalisation comptable", editeur: "Foucher", lieu: "Paris", annee: "1984" },
    { genre: 'ouvrage', auteur: "Obert R.", titre: "DSCG 4 Comptabilité et audit, fiches de révision", editeur: "Dunod", lieu: "Paris", annee: "2025" },
    { genre: 'ouvrage', auteur: "Baratay C.", titre: "Les Carrés DSCG 4, Comptabilité et audit", editeur: "Gualino", lieu: "Paris", annee: "2023" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "IAS 1, IAS 7, IAS 8 et IFRS 13 (texte français) ; IFRS 18 (texte anglais) ; AUDCIF et cadre conceptuel du SYSCOHADA révisé ; GCEC-IFRS (BCC, 2012) ; ROSC RDC (2010) ; rapports annuels de BOA RDC et de la BCDC (2018) et de Rawbank (2025). Le texte du Cadre conceptuel de 2018 n'est pas encodé : ses apports sont repris des manuels DSCG 4 (Obert ; Baratay).",
}

export default chapitre
