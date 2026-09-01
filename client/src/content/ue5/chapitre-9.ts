import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 5 — Chapitre 9 : Le contrôle des finances publiques
//
// Sources vérifiées article par article :
// - Constitution du 18 février 2006 (art. 173, 178, 179, 180) ;
// - LOFIP, loi n° 11/011 du 13 juillet 2011, telle que modifiée par les lois
//   n° 18/010 de 2018 et n° 23/030 de 2023 (art. 28-31, 82, 111-131) ;
// - Loi organique n° 18/024 du 13 novembre 2018 portant composition,
//   organisation et fonctionnement de la Cour des comptes (art. 1-39, 84,
//   88-146).
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch9-q1',
    question: "Selon l'article 111 de la LOFIP, qu'est-ce que le contrôle administratif ?",
    options: [
      { id: 'a', texte: "Le contrôle exercé par la Cour des comptes sur les comptables publics" },
      { id: 'b', texte: "Le contrôle de l'administration sur ses services" },
      { id: 'c', texte: "Le contrôle politique exercé par le Parlement sur le Gouvernement" },
      { id: 'd', texte: "Le contrôle exercé par les juridictions administratives sur les actes budgétaires" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 111 de la LOFIP le définit d'une phrase : « Le contrôle administratif est le contrôle de l'administration sur ses services. » C'est un contrôle interne, par opposition au contrôle juridictionnel (Cour des comptes) et au contrôle politique (Parlement).",
    articleRef: 'Art. 111 LOFIP',
  },
  {
    id: 'ch9-q2',
    question: "D'après l'article 112 de la LOFIP, quels actes sont soumis au visa préalable du contrôleur budgétaire ?",
    options: [
      { id: 'a', texte: "Uniquement les actes d'ordonnancement dépassant un seuil fixé par décret" },
      { id: 'b', texte: "Tous les actes portant engagement, liquidation et ordonnancement — notamment les contrats, arrêtés, mesures ou décisions des ordonnateurs" },
      { id: 'c', texte: "Seulement les contrats de marchés publics" },
      { id: 'd', texte: "Les actes de recettes uniquement" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 112 de la LOFIP dispose que « tous les actes portant engagement, liquidation et ordonnancement sont soumis à son visa préalable notamment, les contrats, arrêtés, mesures ou décisions émanant d'un responsable d'Institution, d'un ministre, d'un responsable de service déconcentré ou d'un fonctionnaire habilité de l'administration ». Le visa couvre les trois premières phases de la chaîne de la dépense, sans condition de montant.",
    articleRef: 'Art. 112 LOFIP',
  },
  {
    id: 'ch9-q3',
    question: "Selon l'article 113 de la LOFIP, que fait le contrôleur budgétaire si les actes de l'ordonnateur lui paraissent entachés d'irrégularités ?",
    options: [
      { id: 'a', texte: "Il saisit directement la Cour des comptes" },
      { id: 'b', texte: "Il refuse le visa, et il ne peut en aucun cas être sanctionné pour ce refus" },
      { id: 'c', texte: "Il accorde un visa conditionnel en attendant la régularisation" },
      { id: 'd', texte: "Il suspend l'opération pendant trente jours avant de statuer" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 113 de la LOFIP dispose que le contrôleur budgétaire « obtient communication de toutes les pièces propres à justifier les engagements et les liquidations de dépenses » et que, si les actes de l'ordonnateur lui paraissent entachés d'irrégularités, « le contrôleur refuse le visa. Pour ce faire, il ne peut en aucun cas être sanctionné. » Cette immunité garantit son indépendance fonctionnelle.",
    articleRef: 'Art. 113 LOFIP',
  },
  {
    id: 'ch9-q4',
    question: "En cas de désaccord persistant entre le contrôleur budgétaire et l'ordonnateur, qui peut autoriser de passer outre le refus de visa (art. 114 LOFIP) ?",
    options: [
      { id: 'a', texte: "Le Président de la République, par ordonnance motivée" },
      { id: 'b', texte: "Le ministre ayant le budget dans ses attributions au niveau central, ou le représentant du pouvoir central en province, par autorisation motivée écrite" },
      { id: 'c', texte: "La Cour des comptes, après procédure contradictoire" },
      { id: 'd', texte: "Le Premier ministre, par instruction permanente" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 114 de la LOFIP prévoit qu'en cas de désaccord persistant, le contrôleur budgétaire en réfère « au ministre ayant le budget dans ses attributions au niveau central ou au représentant du pouvoir central en province. Il ne peut être passé outre au refus de visa que sur autorisation motivée écrite dudit ministre ou représentant du pouvoir central. »",
    articleRef: 'Art. 114 LOFIP',
  },
  {
    id: 'ch9-q5',
    question: "Selon l'article 115 de la LOFIP, auprès de qui les contrôleurs budgétaires sont-ils affectés ?",
    options: [
      { id: 'a', texte: "Uniquement auprès des ministères des Finances et du Budget" },
      { id: 'b', texte: "Auprès de chaque institution et ministère de dépenses et auprès des services déconcentrés de l'État" },
      { id: 'c', texte: "Auprès de la seule Cour des comptes" },
      { id: 'd', texte: "Auprès des seuls ministères dépassant un seuil de dépenses" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 115 de la LOFIP dispose : « Les contrôleurs budgétaires sont affectés auprès de chaque institution et ministère de dépenses et auprès des services déconcentrés de l'État. » Le maillage du contrôle a priori est donc universel.",
    articleRef: 'Art. 115 LOFIP',
  },
  {
    id: 'ch9-q6',
    question: "Selon l'article 116 de la LOFIP, sur quoi porte le contrôle effectué par l'ordonnateur ?",
    options: [
      { id: 'a', texte: "Sur la seule vérification des signatures et des pièces justificatives" },
      { id: 'b', texte: "Sur la régularité des opérations, l'exhaustivité de leur enregistrement, l'efficacité de la dépense et le suivi et la maîtrise des coûts" },
      { id: 'c', texte: "Exclusivement sur la disponibilité des crédits" },
      { id: 'd', texte: "Sur la conservation des droits, privilèges et hypothèques" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 116 de la LOFIP précise que le contrôle de l'ordonnateur porte sur « la régularité des opérations de recettes et de dépenses, l'exhaustivité de leur enregistrement, l'efficacité de la dépense en conformité avec le budget et le suivi et la maîtrise des coûts en relation avec la mise en œuvre des actions ou activités programmées ». C'est un autocontrôle qui intègre déjà la logique de performance.",
    articleRef: 'Art. 116 LOFIP',
  },
  {
    id: 'ch9-q7',
    question: "Selon l'article 117 de la LOFIP, sur quels domaines porte le contrôle effectué par le comptable public ?",
    options: [
      { id: 'a', texte: "L'efficacité des programmes et la performance des actions" },
      { id: 'b', texte: "La réalisation des recettes, l'exécution des dépenses et la gestion du patrimoine" },
      { id: 'c', texte: "Uniquement la disponibilité des crédits" },
      { id: 'd', texte: "La régularité des procédures de passation des marchés publics" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 117 de la LOFIP dispose : « Le contrôle effectué par le comptable public porte sur la réalisation des recettes, l'exécution des dépenses ainsi que la gestion du patrimoine. » Les articles 118, 119 et 120 détaillent chacun de ces trois domaines, chaque fois avec l'adverbe « exclusivement » qui borne la compétence du comptable.",
    articleRef: 'Art. 117 LOFIP',
  },
  {
    id: 'ch9-q8',
    question: "En matière de recettes, sur quoi porte exclusivement le contrôle du comptable public (art. 118 LOFIP) ?",
    options: [
      { id: 'a', texte: "Sur la réalité des créances et la solvabilité des débiteurs" },
      { id: 'b', texte: "Sur l'autorisation de la perception, l'exactitude de la liquidation et de la mise en recouvrement, et la régularité des réductions et annulations de titres" },
      { id: 'c', texte: "Sur la conformité des recettes aux prévisions de la loi de finances" },
      { id: 'd', texte: "Sur l'opportunité économique des recettes perçues" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 118 de la LOFIP dispose qu'en matière de recettes, « le comptable public contrôle exclusivement l'autorisation de leur perception, l'exactitude de leur liquidation et mise en recouvrement et de la régularité des réductions et des annulations de titres y afférents ». Un contrôle de régularité, jamais d'opportunité.",
    articleRef: 'Art. 118 LOFIP',
  },
  {
    id: 'ch9-q9',
    question: "Selon l'article 119 de la LOFIP, à quelle condition un ordonnancement de dépense peut-il être transféré au comptable public ?",
    options: [
      { id: 'a', texte: "Après approbation du Conseil des ministres" },
      { id: 'b', texte: "Après avoir été revêtu du visa du contrôleur budgétaire" },
      { id: 'c', texte: "Après publication au Journal officiel" },
      { id: 'd', texte: "Après certification par l'Inspection générale des finances" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 119 de la LOFIP est formel : « tout ordonnancement de dépense ne peut être transféré au comptable public qu'après avoir été revêtu du visa du contrôleur budgétaire ». Le comptable procède ensuite à son propre contrôle de régularité avant paiement : qualité de l'ordonnateur, assignation de la dépense, validité de la créance au regard des pièces justificatives, existence de l'intervention des contrôles préalables, existence d'oppositions, caractère libératoire du règlement et règles de prescription.",
    articleRef: 'Art. 119 LOFIP',
  },
  {
    id: 'ch9-q10',
    question: "En matière de patrimoine, sur quoi porte exclusivement le contrôle du comptable public (art. 120 LOFIP) ?",
    options: [
      { id: 'a', texte: "Sur l'inventaire annuel des biens meubles et immeubles" },
      { id: 'b', texte: "Sur la conservation des droits, privilèges et hypothèques" },
      { id: 'c', texte: "Sur la valorisation comptable des actifs immobilisés" },
      { id: 'd', texte: "Sur la régularité des cessions de biens domaniaux" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 120 de la LOFIP dispose : « En matière de patrimoine, le comptable public contrôle exclusivement la conservation des droits, privilèges et hypothèques. » Les décisions de gestion patrimoniale relèvent des ordonnateurs.",
    articleRef: 'Art. 120 LOFIP',
  },
  {
    id: 'ch9-q11',
    question: "Selon l'article 121 de la LOFIP, quelle est l'étendue de la compétence de l'Inspection générale des finances (IGF) ?",
    options: [
      { id: 'a', texte: "Une compétence limitée aux ministères gestionnaires de recettes fiscales" },
      { id: 'b', texte: "Une compétence générale de contrôle des finances et des biens publics, couvrant toutes les opérations financières du pouvoir central et des organismes bénéficiant de son concours financier" },
      { id: 'c', texte: "Une compétence juridictionnelle pour juger les comptables publics" },
      { id: 'd', texte: "Une compétence limitée aux opérations de dépenses" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 121 de la LOFIP confère à l'IGF « une compétence générale en matière de contrôle des finances et des biens publics » : toute enquête ou mission de contrôle, de vérification, de contre-vérification et de surveillance de toutes les opérations financières, en recettes et en dépenses, du pouvoir central ainsi que des organismes ou entreprises de toute nature bénéficiant de son concours financier sous forme de participation en capital, de subvention, de prêt, d'avance ou de garantie.",
    articleRef: 'Art. 121 LOFIP',
  },
  {
    id: 'ch9-q12',
    question: "D'après l'article 122 de la LOFIP, comment les missions de l'IGF sont-elles déclenchées ?",
    options: [
      { id: 'a', texte: "Par résolution du Parlement uniquement" },
      { id: 'b', texte: "Elles sont ordonnées par l'inspecteur général des finances-chef de service, sur instruction du Premier ministre, sur réquisition des autorités politiques, administratives et judiciaires ou sur dénonciation des tiers" },
      { id: 'c', texte: "Exclusivement par ordonnance du Président de la République" },
      { id: 'd', texte: "Par la Cour des comptes sur requête des justiciables" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 122 de la LOFIP dispose que les missions de l'IGF sont ordonnées, selon un programme d'action annuel ou ponctuel approuvé par le ministre ayant les finances dans ses attributions, par l'inspecteur général des finances-chef de service, « soit sur instruction du Premier ministre, soit sur réquisition des autorités politiques, administratives et judiciaires ou sur dénonciation des tiers ». L'IGF veille à l'application des lois et règlements régissant les finances publiques et à l'uniformisation des méthodes de travail.",
    articleRef: 'Art. 122 LOFIP',
  },
  {
    id: 'ch9-q13',
    question: "Selon l'article 180 de la Constitution, quelle est la mission de la Cour des comptes ?",
    options: [
      { id: 'a', texte: "Juger pénalement les ministres auteurs de détournements" },
      { id: 'b', texte: "Contrôler, dans les conditions fixées par la loi, la gestion des finances de l'État, des biens publics ainsi que les comptes des provinces, des ETD et des organismes publics, et publier chaque année un rapport" },
      { id: 'c', texte: "Autoriser préalablement toutes les dépenses publiques" },
      { id: 'd', texte: "Examiner les projets de loi de finances avant leur dépôt au Parlement" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 180 de la Constitution dispose : « La Cour des comptes contrôle, dans les conditions fixées par la loi, la gestion des finances de l'État, des biens publics ainsi que les comptes des provinces, des entités territoriales décentralisées ainsi que des organismes publics. Elle publie, chaque année, un rapport remis au Président de la République, au Parlement et au Gouvernement. Le rapport est publié au Journal officiel. » L'article 123 de la LOFIP en tire la vérification a posteriori, sur pièces et, en cas de besoin, sur place.",
    articleRef: 'Art. 180 Constitution ; art. 123 LOFIP',
  },
  {
    id: 'ch9-q14',
    question: "Comment la loi organique n° 18/024 du 13 novembre 2018 qualifie-t-elle la Cour des comptes (art. 3) ?",
    options: [
      { id: 'a', texte: "Un service public rattaché au ministère des Finances" },
      { id: 'b', texte: "L'institution supérieure de contrôle des finances et des biens publics, juridiction financière compétente sur toute l'étendue du territoire, comprenant un siège et un parquet, et relevant de l'Assemblée nationale" },
      { id: 'c', texte: "Une commission technique du Parlement sans pouvoir juridictionnel" },
      { id: 'd', texte: "Une chambre spécialisée du Conseil d'État" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 3 de la loi organique n° 18/024 dispose que la Cour des comptes « est l'institution supérieure de contrôle des finances et des biens publics en République Démocratique du Congo. Elle est une juridiction financière ayant compétence sur toute l'étendue du territoire national. Elle comprend un siège et un parquet. Elle relève de l'Assemblée nationale. » Elle n'est soumise qu'à l'autorité de la loi et jouit d'une autonomie administrative et financière avec dotation propre (art. 5).",
    articleRef: 'Art. 3 et 5, loi organique n° 18/024',
  },
  {
    id: 'ch9-q15',
    question: "Selon l'article 35 de la loi organique n° 18/024, de quelles fonctions particulières la Cour des comptes est-elle investie ?",
    options: [
      { id: 'a', texte: "Des fonctions d'ordonnateur délégué du budget de l'État" },
      { id: 'b', texte: "Des fonctions de commissaire aux comptes de l'État : elle certifie la régularité, la sincérité et la fidélité des comptes du pouvoir central, des provinces et des ETD" },
      { id: 'c', texte: "Des fonctions de caissier de l'État" },
      { id: 'd', texte: "Des fonctions de tutelle sur la Banque centrale du Congo" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 35 de la loi organique n° 18/024 dispose : « La Cour des comptes est investie des fonctions de Commissaires aux comptes de l'État. A ce titre, elle certifie la régularité, la sincérité et la fidélité des comptes du pouvoir central, des provinces et des entités territoriales décentralisées. » Le rapport de certification est joint au rapport qui accompagne le projet de loi, d'édit ou de décision portant reddition des comptes.",
    articleRef: 'Art. 35, loi organique n° 18/024',
  },
  {
    id: 'ch9-q16',
    question: "Selon l'article 126 de la LOFIP, à quels deux types d'arrêts aboutit le jugement des comptes des comptables publics par la Cour des comptes ?",
    options: [
      { id: 'a', texte: "Des arrêts de validation ou des arrêts de nullité" },
      { id: 'b', texte: "Des arrêts de quitus ou des arrêts de débet" },
      { id: 'c', texte: "Des jugements de condamnation ou d'acquittement" },
      { id: 'd', texte: "Des ordonnances de règlement ou de rejet" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 126 de la LOFIP dispose que la Cour des comptes « juge les comptes des comptables publics pour aboutir soit à des arrêts de quitus, soit à des arrêts de débet suivant les modalités prévues dans le règlement général sur la comptabilité publique ». La loi organique n° 18/024 affine : le quitus vaut pour le comptable sorti de fonctions, la décharge pour celui encore en fonction (art. 113 de la loi organique).",
    articleRef: 'Art. 126 LOFIP',
  },
  {
    id: 'ch9-q17',
    question: "Selon l'article 125 de la LOFIP, sur quoi porte le contrôle juridictionnel exercé sur la gestion des ordonnateurs ?",
    options: [
      { id: 'a', texte: "Sur la performance des programmes qu'ils gèrent" },
      { id: 'b', texte: "Sur la régularité de leurs actes, règlements ou décisions" },
      { id: 'c', texte: "Sur la légalité des seules procédures de marchés publics" },
      { id: 'd', texte: "Sur la conformité de leurs états financiers au SYSCOHADA" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 125 de la LOFIP dispose : « Le contrôle juridictionnel est effectué sur la gestion des ordonnateurs, eu égard à la régularité de leurs actes, règlements ou décisions. » Il se distingue du jugement des comptes des comptables publics (art. 126), qui aboutit aux arrêts de quitus ou de débet.",
    articleRef: 'Art. 125 LOFIP',
  },
  {
    id: 'ch9-q18',
    question: "Comment la Cour des comptes statue-t-elle sur les comptes des comptables publics, selon la loi organique n° 18/024 (art. 110 et 113) ?",
    options: [
      { id: 'a', texte: "Par un arrêt unique et définitif, sans procédure contradictoire" },
      { id: 'b', texte: "Par des arrêts successivement provisoires et définitifs : l'arrêt provisoire enjoint au comptable de s'expliquer dans un délai maximum d'un mois ; à défaut de rétablissement de la situation, l'arrêt définitif le met en débet, assorti d'intérêts au taux directeur de la Banque centrale" },
      { id: 'c', texte: "Par simple lettre du Premier président" },
      { id: 'd', texte: "Par une décision administrative du ministre des Finances" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 110 de la loi organique n° 18/024 dispose que la Cour « statue sur les comptes par des arrêts successivement provisoires et définitifs » ; l'arrêt provisoire enjoint au comptable public principal assignataire d'apporter, dans un délai maximum d'un mois, toute explication ou justification à sa décharge. Faute de réponse dans les délais, les injonctions sont réputées admises (art. 111). Si le comptable n'a pas satisfait au dispositif, l'arrêt définitif le met en débet, « assorti des intérêts au taux directeur fixé par la Banque Centrale du Congo » courant depuis la notification de l'arrêt provisoire (art. 113) ; sinon la Cour prononce la décharge (comptable en fonction) ou le quitus (comptable sorti de fonctions).",
    articleRef: 'Art. 110-113, loi organique n° 18/024',
  },
  {
    id: 'ch9-q19',
    question: "Selon l'article 130 de la LOFIP, qu'est-ce qu'un comptable de fait ?",
    options: [
      { id: 'a', texte: "Un comptable public nommé par intérim sans acte officiel" },
      { id: 'b', texte: "Toute personne qui s'ingère dans les opérations de recettes, de dépenses ou de maniement de valeurs sans avoir qualité pour le faire ou sans avoir le titre de comptable public" },
      { id: 'c', texte: "Un agent comptable agissant sous la direction d'un comptable principal" },
      { id: 'd', texte: "Un comptable dont le compte de gestion est en déficit" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 130 de la LOFIP définit le comptable de fait comme « toute personne qui s'ingère dans les opérations de recettes, de dépenses ou de maniement de valeurs sans avoir qualité pour le faire ou sans avoir le titre de comptable public ». Sans préjudice des sanctions pénales ou administratives, elle est soumise aux mêmes obligations et assume les mêmes responsabilités qu'un comptable public. La loi organique n° 18/024 organise la procédure de déclaration et d'apurement de la gestion de fait (art. 117 à 126).",
    articleRef: 'Art. 130 LOFIP',
  },
  {
    id: 'ch9-q20',
    question: "Quelle est la sanction de la faute de gestion selon l'article 129 de la LOFIP, et quelle cause d'exonération la loi organique n° 18/024 prévoit-elle ?",
    options: [
      { id: 'a', texte: "Une peine d'emprisonnement de un à cinq ans, sans exonération possible" },
      { id: 'b', texte: "Une amende ne pouvant atteindre le double du traitement ou salaire brut annuel ni être inférieure au quart ; l'auteur est exonéré s'il établit avoir reçu un ordre écrit non manifestement illégal de sa hiérarchie, la responsabilité du donneur d'ordre se substituant alors à la sienne" },
      { id: 'c', texte: "La révocation d'office, sans autre sanction" },
      { id: 'd', texte: "La confiscation de ses biens personnels" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 129 de la LOFIP fixe la sanction : une amende « dont le montant ne pourra atteindre le double du traitement ou salaire brut annuel alloué à la date de l'infraction sans être inférieur au quart », outre les sanctions disciplinaires, civiles et/ou pénales. L'article 32 de la loi organique n° 18/024 ajoute la cause d'exonération : l'auteur d'une faute de gestion « n'est passible d'aucune sanction s'il est établi qu'il a reçu un ordre écrit, pour autant qu'il ne soit pas manifestement illégal, de sa hiérarchie », après rapport circonstancié fait par lui ; la responsabilité du donneur d'ordre se substitue alors à celle du subordonné. Les fautes de gestion sont prescrites après dix ans à dater de leur découverte (art. 137 de la loi organique).",
    articleRef: 'Art. 129 LOFIP ; art. 32 et 137, loi organique n° 18/024',
  },
  {
    id: 'ch9-q21',
    question: "Selon l'article 131 de la LOFIP, comment la responsabilité personnelle et pécuniaire du comptable public est-elle mise en cause ?",
    options: [
      { id: 'a', texte: "Par une décision du ministre des Finances" },
      { id: 'b', texte: "Au moyen d'une décision de débet prononcée par la Cour des comptes" },
      { id: 'c', texte: "Par un jugement du tribunal de grande instance" },
      { id: 'd', texte: "Par un rapport de l'IGF transmis au Parlement" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 131 de la LOFIP dispose que les fautes de gestion commises par les contrôleurs budgétaires, les comptables publics et les ordonnateurs — autres que les membres du Gouvernement et les responsables d'institution — sont examinées et jugées par la Cour des comptes, et que « la responsabilité personnelle et pécuniaire du comptable est mise en cause au moyen d'une décision de débet prononcée par la Cour des comptes ». Le débet met à la charge du comptable le montant du déficit constaté.",
    articleRef: 'Art. 131 LOFIP',
  },
  {
    id: 'ch9-q22',
    question: "D'après l'article 127 de la LOFIP, quelles sont les prérogatives du Parlement dans le contrôle de l'exécution de la loi de finances ?",
    options: [
      { id: 'a', texte: "Il peut demander des informations, mais elles peuvent lui être refusées pour secret administratif" },
      { id: 'b', texte: "Les informations qu'il demande ou les investigations sur pièces ou sur place qu'il entend conduire ne peuvent lui être refusées ; il procède à l'audition des ministres et des responsables des programmes" },
      { id: 'c', texte: "Il exerce un contrôle juridictionnel aboutissant à des arrêts de débet" },
      { id: 'd', texte: "Il autorise préalablement chaque dépense supérieure à un seuil" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 127 de la LOFIP qualifie le contrôle parlementaire de « contrôle politique » et dispose : « Les informations qu'il demande ou les investigations sur pièces ou sur place qu'il entend conduire, ne peuvent lui être refusées. Il procède à l'audition des ministres et des responsables des programmes. » Le contrôle a posteriori s'exerce lors de l'examen et du vote du projet de loi portant reddition des comptes, occasion à laquelle le Parlement prononce, s'il échet, la décharge des ordonnateurs.",
    articleRef: 'Art. 127 LOFIP',
  },
  {
    id: 'ch9-q23',
    question: "Selon les articles 28 et 29 de la LOFIP, quel est l'objet de la loi portant reddition des comptes ?",
    options: [
      { id: 'a', texte: "Autoriser des dépenses provisoires en début d'exercice" },
      { id: 'b', texte: "Constater les résultats définitifs de l'exécution de la loi de finances, arrêter le compte général du pouvoir central, régler définitivement le budget, ratifier les crédits ouverts par ordonnance-loi et approuver les dépassements de force majeure" },
      { id: 'c', texte: "Fixer les taux d'imposition de l'exercice suivant" },
      { id: 'd', texte: "Ratifier les accords internationaux de l'exercice" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 28 de la LOFIP dispose que la loi portant reddition des comptes « constate les résultats définitifs de l'exécution de la loi de finances de l'année à laquelle elle se rapporte et approuve les différences entre les résultats et les prévisions ». L'article 29 ajoute qu'elle arrête le compte général du pouvoir central, règle définitivement le budget de l'exercice précédent, « ratifie, le cas échéant, les crédits ouverts par Ordonnance-loi du Président de la République », approuve par le vote de crédits complémentaires les dépassements résultant des cas de force majeure et annule les crédits non consommés (compte tenu des reports des articles 53 et 93). L'article 30 décrit le compte de résultats.",
    articleRef: 'Art. 28-30 LOFIP',
  },
  {
    id: 'ch9-q24',
    question: "Comment la Cour des comptes assiste-t-elle le Parlement, selon l'article 124 de la LOFIP et l'article 34 de la loi organique n° 18/024 ?",
    options: [
      { id: 'a', texte: "Elle rédige à sa place le projet de loi de finances" },
      { id: 'b', texte: "Elle l'assiste dans le contrôle de l'exécution de la loi de finances, évalue les rapports de performance, transmet ses observations sur le compte général et sur le projet de loi de reddition des comptes, et reçoit du Gouvernement, au plus tard le 15 août, les éléments d'exécution du budget au premier semestre" },
      { id: 'c', texte: "Elle vote la loi de reddition des comptes en lieu et place du Parlement" },
      { id: 'd', texte: "Elle se limite à publier son rapport annuel au Journal officiel" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 124 de la LOFIP dispose que la Cour des comptes « assiste l'Assemblée nationale dans le contrôle de l'exécution de la loi de finances » et « évalue notamment les rapports de performance ». L'article 34 de la loi organique n° 18/024 étend cette assistance au Parlement, aux Assemblées provinciales et aux organes délibérants des ETD : transmission annuelle des observations sur les comptes généraux et sur les projets de reddition des comptes, et observations sur le rapport d'exécution du budget au premier semestre — le Gouvernement devant transmettre à la Cour, au plus tard le 15 août, les éléments portant sur cette exécution.",
    articleRef: 'Art. 124 LOFIP ; art. 34, loi organique n° 18/024',
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '9.1',
    titre: "Vue d'ensemble : les quatre étages du contrôle",
    navLabel: "Vue d'ensemble",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'exécution du budget est enserrée dans un système de contrôles à plusieurs étages. La LOFIP en organise trois : le **contrôle administratif** — « le contrôle de l'administration sur ses services » (art. 111) —, le **contrôle juridictionnel** confié à la Cour des comptes (art. 123 à 126) et le **contrôle parlementaire**, qui est un contrôle politique (art. 127). Le socle constitutionnel est posé aux articles 178 à 180 : l'article 178 institue la Cour des comptes et la fait relever de l'Assemblée nationale, l'article 179 renvoie sa composition, son organisation et son fonctionnement à une loi organique — c'est la loi organique n° 18/024 du 13 novembre 2018 —, et l'article 180 définit sa mission de contrôle et son rapport annuel publié au Journal officiel.",
      },
      {
        type: 'tableau',
        tableau: {
          entetes: ['Type de contrôle', 'Nature', 'Moment', 'Organes', 'Bases'],
          lignes: [
            ['Administratif a priori', 'Interne, préventif', "Avant l'exécution de la dépense", 'Contrôleur budgétaire', 'Art. 112-115, 119 LOFIP'],
            ['Administratif interne et a posteriori', 'Interne', "Pendant et après l'exécution", 'Ordonnateur, comptable public, IGF', 'Art. 116-122 LOFIP'],
            ['Juridictionnel', 'Externe, a posteriori', 'Après exécution', 'Cour des comptes', 'Art. 178-180 Const. ; art. 123-126 LOFIP ; loi organique n° 18/024'],
            ['Parlementaire', 'Politique', 'En cours de gestion et a posteriori', 'Assemblée nationale et Sénat', 'Art. 100 et 138 Const. ; art. 127 LOFIP'],
          ],
        },
      },
      { type: 'controle', question: QCM[0] },
      {
        type: 'filet',
        titre: 'La primauté du contrôle de la Cour des comptes',
        texte: "L'article 38 de la loi organique n° 18/024 affirme la prépondérance de la juridiction financière : « Le contrôle de la Cour des comptes tient tout autre en état à l'exception du contrôle politique exercé par le Parlement, les assemblées provinciales et les organes délibérants des entités territoriales décentralisées. » Tout refus de s'y soumettre ou toute manœuvre dilatoire expose son auteur aux pénalités prévues par la loi.",
      },
      { type: 'controle', question: QCM[12] },
    ],
  },
  {
    numero: '9.2',
    titre: 'Le contrôle a priori : le contrôleur budgétaire',
    navLabel: 'Contrôleur budgétaire',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le contrôle administratif a priori des opérations budgétaires de dépenses du pouvoir central est assuré par le **contrôleur budgétaire** (art. 112). Tous les actes portant engagement, liquidation et ordonnancement sont soumis à son **visa préalable** — notamment les contrats, arrêtés, mesures ou décisions émanant d'un responsable d'institution, d'un ministre, d'un responsable de service déconcentré ou d'un fonctionnaire habilité. Le visa couvre donc les trois premières phases de la chaîne de la dépense, sans condition de montant, et l'article 119 verrouille le dispositif : aucun ordonnancement ne peut être transféré au comptable public sans ce visa.",
      },
      { type: 'controle', question: QCM[1] },
      {
        type: 'carte',
        titre: "L'indépendance fonctionnelle du contrôleur (art. 113-114 LOFIP)",
        liste: [
          "**Accès aux pièces** : le contrôleur obtient communication de toutes les pièces propres à justifier les engagements et les liquidations et à éclairer sa décision (art. 113).",
          "**Refus de visa protégé** : si les actes de l'ordonnateur lui paraissent entachés d'irrégularités, il refuse le visa et « ne peut en aucun cas être sanctionné » pour ce refus (art. 113).",
          "**Désaccord persistant** : le contrôleur en réfère au ministre ayant le budget dans ses attributions (ou au représentant du pouvoir central en province) ; il ne peut être passé outre au refus que sur **autorisation motivée écrite** de ce ministre ou représentant (art. 114).",
          "**Maillage universel** : les contrôleurs budgétaires sont affectés auprès de chaque institution et ministère de dépenses et auprès des services déconcentrés de l'État (art. 115).",
        ],
      },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[4] },
    ],
  },
  {
    numero: '9.3',
    titre: "Ordonnateur, comptable public et Inspection générale des finances",
    navLabel: 'Ordonnateur, comptable, IGF',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le contrôle interne se poursuit chez les acteurs de l'exécution eux-mêmes. Le contrôle de l'**ordonnateur** porte sur la régularité des opérations de recettes et de dépenses, l'exhaustivité de leur enregistrement, l'efficacité de la dépense en conformité avec le budget et le suivi et la maîtrise des coûts (art. 116) : l'autocontrôle intègre déjà la logique de performance. Le contrôle du **comptable public** porte sur trois domaines (art. 117), chacun borné par l'adverbe *exclusivement* : les recettes (autorisation de perception, exactitude de la liquidation et de la mise en recouvrement, régularité des réductions et annulations de titres — art. 118), les dépenses (contrôle de régularité avant paiement : qualité de l'ordonnateur, assignation, validité de la créance au regard des pièces, intervention des contrôles préalables, oppositions, caractère libératoire, prescription — art. 119) et le patrimoine (conservation des droits, privilèges et hypothèques — art. 120).",
      },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[7] },
      {
        type: 'carte',
        titre: "L'Inspection générale des finances (art. 121-122 LOFIP)",
        texte: "L'IGF dispose d'une **compétence générale** en matière de contrôle des finances et des biens publics : toute enquête ou mission de contrôle, de vérification, de contre-vérification et de surveillance de toutes les opérations financières, en recettes et en dépenses, du pouvoir central ainsi que des organismes ou entreprises de toute nature bénéficiant de son concours financier sous forme de participation en capital, de subvention, de prêt, d'avance ou de garantie (art. 121). Ses missions sont ordonnées par l'inspecteur général des finances-chef de service — sur instruction du Premier ministre, sur réquisition des autorités politiques, administratives et judiciaires, ou sur dénonciation des tiers — selon un programme d'action annuel ou ponctuel approuvé par le ministre des Finances (art. 122). Au niveau provincial et local, l'article 210 étend ce dispositif mutatis mutandis.",
        note: "L'IGF exerce un contrôle administratif : elle enquête et rapporte, mais ne juge pas. Le jugement des comptes et des fautes de gestion appartient à la Cour des comptes, qui peut d'ailleurs recourir aux services de l'IGF pour des enquêtes à caractère technique (art. 37 de la loi organique n° 18/024).",
      },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[8] },
    ],
  },
  {
    numero: '9.4',
    titre: "La Cour des comptes : institution et missions",
    navLabel: 'Cour des comptes',
    blocs: [
      {
        type: 'paragraphe',
        texte: "La loi organique n° 18/024 du 13 novembre 2018 — prise en application des articles 179 et 180 de la Constitution — fait de la Cour des comptes *« l'institution supérieure de contrôle des finances et des biens publics »*, une **juridiction financière** compétente sur toute l'étendue du territoire national, comprenant un siège et un parquet, et relevant de l'Assemblée nationale (art. 3). Elle n'est soumise dans l'exercice de ses attributions qu'à l'autorité de la loi et jouit d'une autonomie administrative et financière avec dotation propre (art. 5). Ses membres — magistrats du siège et Procureur général — sont nommés par le Président de la République après avis de l'Assemblée nationale (art. 11 ; art. 178 de la Constitution) ; le Premier président a un mandat de cinq ans renouvelable une seule fois (art. 12).",
      },
      { type: 'controle', question: QCM[13] },
      {
        type: 'carte',
        titre: "Les missions de la Cour des comptes (loi organique n° 18/024, art. 24 à 39)",
        liste: [
          "**Pouvoir général et permanent de contrôle** de la gestion des finances, des biens et des comptes du pouvoir central, des provinces, des ETD et de leurs organismes auxiliaires, ainsi que de toute personne bénéficiaire d'un concours financier public (art. 24 et 31).",
          "**Jugement des comptes** des comptables publics principaux assignataires et des personnes déclarées comptables de fait (art. 25), avec amende pour retard dans la production des comptes plafonnée à un mois de rémunération (art. 26).",
          "**Vérification de régularité et de performance** : régularité des opérations sur pièces et sur place, mobilisation optimale des recettes, économie, efficience et efficacité des crédits, fonds et valeurs (art. 28) ; évaluation des politiques, programmes et actions publics, avec observations et recommandations dont elle suit la mise en œuvre (art. 29).",
          "**Contrôle des entreprises et établissements publics** : comptes annuels transmis dans les trois mois de leur adoption (art. 30).",
          "**Assistance aux organes délibérants** : Parlement, Assemblées provinciales et organes délibérants des ETD, avec observations sur les comptes généraux et les projets de reddition des comptes ; le Gouvernement transmet au plus tard le 15 août les éléments d'exécution du budget au premier semestre (art. 34).",
          "**Commissaire aux comptes de l'État** : certification de la régularité, de la sincérité et de la fidélité des comptes du pouvoir central, des provinces et des ETD (art. 35).",
          "**Conseiller** du Président de la République, du Parlement, des exécutifs et organes délibérants en matière de finances publiques (art. 36).",
          "**Mesures conservatoires** : en cas de graves irrégularités, proposition de suspension ou de destitution, blocage de comptes bancaires, interdiction de sortie du territoire, interdiction d'accomplir certains actes de gestion, proposition de nomination d'un intérimaire — l'autorité saisie répond dans les cinq jours francs (art. 39).",
        ],
      },
      {
        type: 'filet',
        titre: 'Les chambres des comptes déconcentrées',
        texte: "Innovation de la loi organique de 2018, annoncée par l'article 211 de la LOFIP : des chambres des comptes déconcentrées sont créées en province, avec le ministère public y rattaché. La chambre ayant son siège dans un chef-lieu de province porte le nom de ce chef-lieu et exerce l'ensemble des compétences dévolues à la Cour des comptes sur les comptes de la province et des ETD de son ressort ; le Premier président peut en outre lui déléguer le contrôle d'un organisme d'État situé dans son ressort (art. 84 de la loi organique).",
      },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[23] },
    ],
  },
  {
    numero: '9.5',
    titre: "Le contrôle juridictionnel : comptes, gestion de fait, discipline budgétaire",
    navLabel: 'Contrôle juridictionnel',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le contrôle juridictionnel des recettes et des dépenses publiques est effectué par la Cour des comptes, contrôle *« externe à l'Administration et a posteriori »* (art. 126 LOFIP). Il vise deux cibles distinctes : la **gestion des ordonnateurs**, contrôlée « eu égard à la régularité de leurs actes, règlements ou décisions » (art. 125), et les **comptes des comptables publics**, que la Cour juge « pour aboutir soit à des arrêts de quitus, soit à des arrêts de débet » (art. 126). La procédure devant la Cour est *« inquisitoriale, secrète, écrite et contradictoire »* (art. 88 de la loi organique) ; le dépôt des comptes opère saisine de la Cour, et son action sur un compte régulièrement déposé se prescrit le 31 décembre de la dixième année suivant sa réception (art. 91 de la loi organique).",
      },
      { type: 'controle', question: QCM[16] },
      {
        type: 'carte',
        titre: "Le jugement des comptes : arrêts provisoires puis définitifs (loi organique, art. 110 à 116)",
        liste: [
          "**Arrêt provisoire** : il enjoint au comptable public principal assignataire d'apporter, dans un délai maximum d'un mois, toute explication ou justification à sa décharge ; il peut contenir des injonctions fermes ou pour l'avenir, des réserves et des mentions (art. 110). Faute de réponse dans les délais, les injonctions sont réputées admises (art. 111).",
          "**Arrêt définitif** : si le comptable n'a pas rétabli la situation de son compte ni obtenu une décharge de responsabilité, la Cour le met en **débet**, assorti d'intérêts au taux directeur de la Banque centrale du Congo courant depuis la notification de l'arrêt provisoire ; sinon, elle prononce un arrêt de **décharge** (comptable en fonction) ou de **quitus** (comptable sorti de fonctions) (art. 113).",
          "**Réquisition** : si le comptable produit un ordre de réquisition valide de l'ordonnateur pour les opérations en cause, sa responsabilité personnelle et pécuniaire est dégagée et celle de l'ordonnateur est examinée au titre des fautes de gestion (art. 114).",
          "**Force majeure** : la décharge de responsabilité résultant d'un cas de force majeure est accordée par un arrêt de la Cour ; le débet non apuré fait obstacle à la décharge ou au quitus, et la Cour peut faire inscrire une hypothèque sur les biens du condamné (art. 115).",
        ],
      },
      { type: 'controle', question: QCM[17] },
      {
        type: 'carte',
        titre: "La gestion de fait (loi organique, art. 117 à 126)",
        texte: "La Cour statue sur les gestions de fait d'office ou sur requête du Procureur général, saisi notamment par les autorités politiques et administratives (art. 118) ; l'action en déclaration de gestion de fait se prescrit par dix ans à dater de la découverte des actes (art. 118). La procédure suit le schéma des arrêts provisoires et définitifs : arrêt provisoire de déclaration de gestion de fait enjoignant de produire un compte unique dans un délai maximal d'un mois (art. 119), reconnaissance par l'autorité compétente du caractère d'utilité publique des opérations — seules les dépenses d'utilité publique avérée sont admises, le débet étant constitué du solde (art. 122) —, et condamnation possible à une **amende pour immixtion** dont le montant ne peut dépasser le total des sommes indûment détenues ou maniées (art. 124). Lorsque plusieurs personnes sont impliquées, elles sont déclarées conjointement et solidairement responsables (art. 120). Le débet prononcé contre le comptable de fait ne peut faire l'objet d'aucune décharge ou remise, « sauf par une grâce présidentielle » (art. 123).",
      },
      { type: 'controle', question: QCM[18] },
      {
        type: 'paragraphe',
        texte: "La **discipline budgétaire et financière** vise les fautes de gestion définies aux articles 129 et 214 de la LOFIP : non-respect des règles d'engagement, engagement sans pouvoir ou sans crédits disponibles, dissimulation permettant une fausse imputation, avantage injustifié, infraction aux règles d'exécution des recettes et des dépenses. Sont justiciables devant la Cour les contrôleurs budgétaires, les comptables publics, les ordonnateurs autres que les responsables des organes politiques, et tout responsable ou agent des entreprises et établissements publics ; les membres du Gouvernement et des exécutifs répondent de leurs fautes de gestion devant les organes politiques compétents (art. 32 de la loi organique ; art. 128 LOFIP). La sanction est une amende comprise entre le quart et le double du traitement ou salaire brut annuel (art. 129 LOFIP), outre les sanctions disciplinaires, civiles et pénales, et les poursuites devant la Cour ne font pas obstacle à l'action pénale (art. 137 de la loi organique).",
      },
      { type: 'controle', question: QCM[19] },
      { type: 'controle', question: QCM[20] },
    ],
  },
  {
    numero: '9.6',
    titre: 'Le contrôle parlementaire et la reddition des comptes',
    navLabel: 'Contrôle parlementaire',
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le contrôle parlementaire est un **contrôle politique** (art. 127 LOFIP). Il s'exerce d'abord en cours de gestion : le Parlement veille à la bonne exécution de la loi de finances, et *« les informations qu'il demande ou les investigations sur pièces ou sur place qu'il entend conduire, ne peuvent lui être refusées »* ; il procède à l'audition des ministres et des responsables des programmes. Il s'exerce ensuite a posteriori, lors de l'examen et du vote du projet de **loi portant reddition des comptes**, occasion à laquelle le Parlement prononce, s'il échet, la **décharge des ordonnateurs**. La Cour des comptes l'assiste dans ce contrôle et évalue notamment les rapports de performance (art. 124).",
      },
      { type: 'controle', question: QCM[21] },
      {
        type: 'carte',
        titre: 'La loi portant reddition des comptes (art. 28 à 30 et 82, 84 LOFIP)',
        liste: [
          "**Objet** (art. 28) : constater les résultats définitifs de l'exécution de la loi de finances et approuver les différences entre résultats et prévisions ; elle est présentée dans les mêmes formes que la loi de finances de l'exercice clos.",
          "**Contenu** (art. 29) : arrêter le compte général du pouvoir central, régler définitivement le budget de l'exercice précédent, ratifier le cas échéant les crédits ouverts par ordonnance-loi du Président de la République, approuver par le vote de crédits complémentaires les dépassements résultant de cas de force majeure, annuler les crédits non consommés compte tenu des reports (art. 53 et 93).",
          "**Compte de résultats** (art. 30) : déficit ou excédent du budget général et des budgets annexes, profits et pertes des comptes spéciaux et des opérations de trésorerie.",
          "**Documents joints** (art. 82) : rapport explicatif des dépassements, rapport d'évaluation de l'exécution par programme, rapport de la Cour des comptes prévu par l'article 180 de la Constitution, rapport annuel de performance par programme.",
          "**Calendrier** (art. 84) : dépôt à l'Assemblée nationale au plus tard le 15 mai de l'année suivant l'exécution du budget ; à défaut, dépôt avant la fin de la session ordinaire de mars, avec le rapport de la Cour des comptes.",
        ],
        note: "L'article 173 de la Constitution ferme la boucle : « Le compte général de la République est soumis chaque année au Parlement par la Cour des comptes avec ses observations. Le compte général de la République est arrêté par la loi. »",
      },
      { type: 'controle', question: QCM[22] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ch9-cp1',
    titre: 'Un contrat signé sans visa du contrôleur budgétaire',
    contexte: "Le directeur de l'administration du ministère de l'Éducation nationale signe un marché de 500 millions de FC avec une entreprise de construction sans le soumettre au visa préalable du contrôleur budgétaire, en invoquant l'urgence de la rentrée scolaire. Informé après coup, le contrôleur refuse toute validation rétroactive. Le comptable public reçoit néanmoins les mandats de paiement.",
    questions: [
      {
        num: 1,
        enonce: "Analysez la régularité du contrat au regard des articles 112 et 119 de la LOFIP.",
        correction: "Le contrat est irrégulier. L'article 112 impose que « tous les actes portant engagement, liquidation et ordonnancement » soient soumis au visa préalable du contrôleur budgétaire — les contrats sont expressément cités. Le visa est une condition de régularité de l'engagement, non une formalité régularisable après coup. L'article 119 verrouille la chaîne : aucun ordonnancement ne peut être transféré au comptable public sans ce visa. L'urgence n'est pas une cause exonératoire prévue par la LOFIP ; la seule voie de dérogation est celle de l'article 114 (autorisation motivée écrite du ministre du Budget pour passer outre un refus de visa), qui suppose précisément que le contrôleur ait été saisi.",
      },
      {
        num: 2,
        enonce: "Le comptable public peut-il payer les mandats reçus ?",
        correction: "Non. L'article 119 de la LOFIP subordonne le transfert de tout ordonnancement au visa du contrôleur budgétaire, et impose au comptable un contrôle de régularité avant paiement portant notamment sur « l'existence de l'intervention des contrôles préalables ». Constatant l'absence de visa, le comptable doit refuser le paiement — l'article 33 de la loi organique n° 18/024 le confirme : le comptable public principal assignataire « refuse de payer toute dépense entachée d'irrégularités » et renvoie le dossier à l'ordonnateur avec ses observations. S'il payait, il engagerait sa responsabilité personnelle et pécuniaire, mise en cause par une décision de débet de la Cour des comptes (art. 131 LOFIP).",
      },
      {
        num: 3,
        enonce: "Quelles sanctions le directeur encourt-il ?",
        correction: "Il a commis une faute de gestion : l'article 129 de la LOFIP vise expressément la personne « qui n'aura pas respecté les règles d'engagement des dépenses » et, le cas échéant, « qui aura engagé des dépenses sans disponibilité des crédits ». En tant qu'ordonnateur autre qu'un membre du Gouvernement, il est justiciable de la Cour des comptes (art. 131 LOFIP ; art. 32 de la loi organique n° 18/024). La sanction est une amende comprise entre le quart et le double de son traitement brut annuel (art. 129), outre les sanctions disciplinaires, civiles et/ou pénales. Il ne pourrait s'exonérer qu'en établissant avoir reçu un ordre écrit non manifestement illégal de sa hiérarchie, auquel cas la responsabilité du donneur d'ordre se substituerait à la sienne (art. 32 de la loi organique).",
      },
    ],
  },
  {
    id: 'ch9-cp2',
    titre: 'Un contrôleur budgétaire révoqué après un refus de visa',
    contexte: "Le contrôleur budgétaire du ministère des Infrastructures refuse de viser un contrat d'un milliard de FC pour imputation budgétaire erronée et absence de crédits disponibles. Le ministre des Infrastructures obtient sa révocation pour « obstruction au fonctionnement des services » ; deux jours plus tard, son successeur vise l'acte sans réserve.",
    questions: [
      {
        num: 1,
        enonce: "La révocation est-elle légale au regard de l'article 113 de la LOFIP ?",
        correction: "Non. L'article 113 de la LOFIP dispose que si les actes de l'ordonnateur paraissent entachés d'irrégularités, « le contrôleur refuse le visa. Pour ce faire, il ne peut en aucun cas être sanctionné. » La protection est absolue : elle couvre toute forme de sanction, y compris déguisée en mesure d'administration (révocation, mutation-sanction). Révoquer un contrôleur pour un refus de visa fondé sur une imputation erronée et une absence de crédits — deux irrégularités caractérisées — viole frontalement l'article 113.",
      },
      {
        num: 2,
        enonce: "Quelle procédure le ministre aurait-il dû suivre pour contester le refus ?",
        correction: "Celle de l'article 114 de la LOFIP : en cas de désaccord persistant, le contrôleur budgétaire en réfère au ministre ayant le budget dans ses attributions, et « il ne peut être passé outre au refus de visa que sur autorisation motivée écrite dudit ministre ». Le ministre des Infrastructures ne pouvait donc ni imposer le visa ni obtenir la révocation : la seule issue légale était une autorisation écrite et motivée du ministre du Budget — laquelle, en présence d'une absence de crédits, exposerait d'ailleurs son signataire, puisque l'engagement sans crédits disponibles est une faute de gestion (art. 129).",
      },
      {
        num: 3,
        enonce: "Le visa accordé par le successeur régularise-t-il le contrat ?",
        correction: "Non, si les conditions de fond ne sont toujours pas réunies. Le visa atteste la régularité budgétaire de l'acte ; si l'imputation reste erronée et les crédits indisponibles, le visa du successeur est lui-même irrégulier et son auteur, en tant que contrôleur budgétaire, est justiciable de la Cour des comptes pour faute de gestion (art. 131 LOFIP ; art. 32 de la loi organique n° 18/024 : les contrôleurs budgétaires figurent au premier rang des justiciables en matière de discipline budgétaire et financière). L'engagement pris sans crédits reste au surplus irrégulier au regard de l'article 10 de la LOFIP, qui interdit d'exécuter une dépense si les crédits nécessaires ne sont pas disponibles au budget.",
      },
    ],
  },
  {
    id: 'ch9-cp3',
    titre: 'Une gestion de fait au ministère de la Santé',
    contexte: "Un chef de service du ministère de la Santé, sans titre de comptable public, perçoit directement des fonds de bailleurs destinés à un programme de vaccination, paie les prestataires et tient une comptabilité informelle. Une mission de l'IGF découvre que 200 millions de FC ne sont justifiés par aucune pièce. L'intéressé plaide une gestion « informelle mais efficace ».",
    questions: [
      {
        num: 1,
        enonce: "Qualifiez juridiquement la situation du chef de service.",
        correction: "C'est un comptable de fait. L'article 130 de la LOFIP répute comptable de fait « toute personne qui s'ingère dans les opérations de recettes, de dépenses ou de maniement de valeurs sans avoir qualité pour le faire ou sans avoir le titre de comptable public ». La conséquence est immédiate : sans préjudice des sanctions pénales ou administratives, il est soumis aux mêmes obligations et assume les mêmes responsabilités qu'un comptable public. La loi organique n° 18/024 (art. 7 pt 11) définit la gestion de fait comme « l'immixtion d'une personne sans qualité ni mandat dans la gestion des deniers, valeurs et biens publics ».",
      },
      {
        num: 2,
        enonce: "L'argument de l'efficacité informelle est-il recevable ?",
        correction: "Non. Le maniement des fonds publics exige une habilitation légale ; l'efficacité alléguée ne purge jamais l'incompétence. L'article 129 de la LOFIP érige en faute de gestion le fait d'avoir « engagé des dépenses sans en avoir le pouvoir ou reçu délégation », indépendamment du résultat obtenu. Tout au plus la procédure de gestion de fait permet-elle de tenir compte de l'utilité réelle des dépenses : l'autorité compétente statue sur le caractère d'utilité publique des opérations, et la Cour des comptes n'impute à charge du comptable de fait que les dépenses dont l'utilité publique n'est pas avérée, le débet étant constitué du solde (art. 122 de la loi organique). L'utilité éventuelle des paiements réduit le débet ; elle n'efface ni la déclaration de gestion de fait ni l'amende pour immixtion.",
      },
      {
        num: 3,
        enonce: "Quelle juridiction est compétente et quelles condamnations sont possibles pour les 200 millions de FC injustifiés ?",
        correction: "La Cour des comptes. Elle juge les comptes des personnes qu'elle a déclarées comptables de fait (art. 25 de la loi organique) selon la procédure des arrêts provisoires et définitifs : arrêt provisoire de déclaration de gestion de fait enjoignant de produire un compte unique et certifié dans un délai maximal d'un mois (art. 119-120), puis, à défaut de justification, arrêt définitif de débet pour les 200 millions non justifiés — débet qui ne peut faire l'objet d'aucune décharge ou remise, sauf grâce présidentielle (art. 123). S'y ajoutent l'amende pour immixtion dans les fonctions de comptable public, plafonnée au total des sommes indûment détenues ou maniées (art. 27 et 124), et, le cas échéant, l'action pénale, la procédure de gestion de fait n'y faisant pas obstacle (art. 126 de la loi organique).",
      },
    ],
  },
  {
    id: 'ch9-cp4',
    titre: "Un refus de communication opposé au Parlement",
    contexte: "La commission des finances de l'Assemblée nationale demande au ministre du Budget les rapports d'exécution budgétaire du premier semestre et les rapports de performance. Le ministre invoque « le secret de l'administration » et refuse ; le ministre des Finances décline par ailleurs une invitation à une audition.",
    questions: [
      {
        num: 1,
        enonce: "Le secret de l'administration peut-il être opposé au Parlement en matière budgétaire ?",
        correction: "Non. L'article 127 de la LOFIP est catégorique : les informations que le Parlement demande « ou les investigations sur pièces ou sur place qu'il entend conduire, ne peuvent lui être refusées ». La loi ne prévoit aucune exception tirée d'un secret administratif pour les documents d'exécution budgétaire. Le refus viole en outre l'article 100 de la Constitution, qui charge le Parlement de contrôler le Gouvernement, les entreprises publiques ainsi que les établissements et services publics.",
      },
      {
        num: 2,
        enonce: "Le ministre des Finances peut-il décliner l'audition ?",
        correction: "Non. L'article 127 de la LOFIP dispose que le Parlement « procède à l'audition des ministres et des responsables des programmes » — formulation impérative. L'article 138 de la Constitution range d'ailleurs l'audition par les commissions parmi les moyens d'information et de contrôle de l'Assemblée nationale et du Sénat, aux côtés de la question orale ou écrite, de la question d'actualité, de l'interpellation et de la commission d'enquête ; ces moyens donnent lieu, le cas échéant, à la motion de défiance ou de censure (art. 146 et 147).",
      },
      {
        num: 3,
        enonce: "Quels leviers l'Assemblée nationale peut-elle activer ?",
        correction: "Les moyens de l'article 138 de la Constitution : question orale ou écrite avec ou sans débat, question d'actualité, interpellation, commission d'enquête, audition par les commissions. En cas d'obstruction persistante, la responsabilité politique peut être mise en cause : motion de défiance contre le ministre concerné (signée par un dixième des députés) ou motion de censure contre le Gouvernement (signée par un quart des députés), adoptées à la majorité absolue (art. 146) — leur adoption rend le ministre ou le Gouvernement démissionnaire (art. 147). Le Parlement peut aussi s'appuyer sur la Cour des comptes, qui l'assiste dans le contrôle de l'exécution de la loi de finances (art. 124 LOFIP) et doit recevoir du Gouvernement, au plus tard le 15 août, les éléments d'exécution du budget au premier semestre (art. 34 de la loi organique n° 18/024).",
      },
    ],
  },
  {
    id: 'ch9-cp5',
    titre: 'Une loi de reddition des comptes en souffrance',
    contexte: "En juin de l'année N+2, le Gouvernement n'a toujours pas déposé le projet de loi portant reddition des comptes de l'exercice N. Le rapport de la Cour des comptes sur cet exercice fait état de dépassements de crédits de 450 milliards de FC ouverts par ordonnance-loi présidentielle et de 73 milliards de FC de dépenses payées sans ordonnancement préalable.",
    questions: [
      {
        num: 1,
        enonce: "Pourquoi l'absence de loi de reddition des comptes constitue-t-elle une violation des obligations légales ?",
        correction: "La loi portant reddition des comptes a un objet légal précis : constater les résultats définitifs de l'exécution de la loi de finances et approuver les écarts (art. 28 LOFIP), arrêter le compte général du pouvoir central et régler définitivement le budget de l'exercice précédent (art. 29), établir le compte de résultats (art. 30). Son dépôt est enfermé dans un délai : au plus tard le 15 mai de l'année suivant celle de l'exécution du budget, ou à défaut avant la fin de la session ordinaire de mars, avec le rapport de la Cour des comptes (art. 84). Son absence prive le Parlement de son contrôle a posteriori et de son pouvoir de prononcer la décharge des ordonnateurs (art. 127), et laisse le compte général de la République sans l'arrêt par la loi qu'exige l'article 173 de la Constitution.",
      },
      {
        num: 2,
        enonce: "Les 450 milliards de FC ouverts par ordonnance-loi peuvent-ils être régularisés sans cette loi ?",
        correction: "Non. L'article 29 de la LOFIP réserve à la loi portant reddition des comptes le soin de ratifier « le cas échéant, les crédits ouverts par Ordonnance-loi du Président de la République » et d'approuver, par le vote de crédits complémentaires, les dépassements résultant des cas de force majeure. La ratification est un acte législatif : tant qu'elle n'est pas intervenue, ces crédits demeurent autorisés à titre précaire par l'ordonnance-loi, sans confirmation définitive du Parlement. Seul le vote de la loi de reddition des comptes peut clore juridiquement l'exercice.",
      },
      {
        num: 3,
        enonce: "Quelles responsabilités les 73 milliards de FC payés sans ordonnancement préalable engagent-ils ?",
        correction: "Le paiement sans ordonnancement préalable rompt la chaîne de la dépense (art. 90 LOFIP) hors des cas limitativement admis de paiement sans ordonnancement préalable. Les ordonnateurs et agents impliqués ont commis des fautes de gestion (art. 129 : non-respect des règles d'engagement, infraction aux règles d'exécution des dépenses), examinées et jugées par la Cour des comptes (art. 131). Les comptables publics qui ont payé sans ordonnancement visé voient leurs comptes jugés selon la procédure des arrêts provisoires et définitifs, pouvant aboutir à des arrêts de débet (art. 126 LOFIP ; art. 110-113 de la loi organique n° 18/024). La Cour peut en outre insérer ces irrégularités dans son rapport annuel remis au Président de la République, au Parlement et au Gouvernement et publié au Journal officiel (art. 180 de la Constitution), et proposer des mesures conservatoires contre les auteurs (art. 39 de la loi organique).",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue5',
  numero: 9,
  id: 'ue5-ch9',
  titre: 'Le contrôle des finances publiques',
  sousTitre: "Contrôleur budgétaire, IGF, Cour des comptes et Parlement",
  infoBulle: "Chapitre 9 du module Finances publiques : les quatre étages du contrôle — administratif (contrôleur budgétaire, ordonnateur, comptable, IGF), juridictionnel (Cour des comptes) et parlementaire — et la loi de reddition des comptes.",
  loiRef: "Constitution, art. 173, 178-180 · LOFIP, art. 28-31, 111-131 · Loi organique n° 18/024",
  moduleLabel: 'UE 5 · Finances publiques',
  retourRoute: '/ue5-finances-publiques',
  coursId: 'ue5-finances-publiques',
  objectifs: [
    "Distinguer les types de contrôle des finances publiques : administratif a priori et interne, juridictionnel, parlementaire.",
    "Maîtriser le régime du visa préalable du contrôleur budgétaire et les garanties de son indépendance (art. 112 à 115, 119 LOFIP).",
    "Délimiter les contrôles de l'ordonnateur et du comptable public (art. 116 à 120) et la compétence générale de l'IGF (art. 121-122).",
    "Présenter la Cour des comptes : statut constitutionnel, missions et organisation issues de la loi organique n° 18/024 du 13 novembre 2018.",
    "Expliquer le jugement des comptes (arrêts provisoires et définitifs, quitus, décharge, débet), la gestion de fait et la discipline budgétaire et financière.",
    "Décrire le contrôle parlementaire et le contenu de la loi portant reddition des comptes (art. 28 à 30, 82, 84, 127 LOFIP).",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Le contrôle administratif est le contrôle de l'administration sur ses services (art. 111 LOFIP) ; il coexiste avec le contrôle juridictionnel de la Cour des comptes et le contrôle politique du Parlement.",
    "Tous les actes d'engagement, de liquidation et d'ordonnancement sont soumis au visa préalable du contrôleur budgétaire (art. 112) ; son refus de visa ne peut jamais être sanctionné (art. 113) et ne peut être surmonté que par autorisation motivée écrite du ministre du Budget (art. 114). Aucun ordonnancement n'atteint le comptable sans ce visa (art. 119).",
    "Le comptable public contrôle « exclusivement » : en recettes, l'autorisation de perception et l'exactitude des liquidations (art. 118) ; en dépenses, la régularité avant paiement (art. 119) ; en patrimoine, la conservation des droits, privilèges et hypothèques (art. 120).",
    "L'IGF a une compétence générale de contrôle des finances et des biens publics, sur le pouvoir central et tout organisme bénéficiant de son concours financier (art. 121) ; ses missions sont ordonnées par son chef de service sur instruction du Premier ministre, réquisition d'autorités ou dénonciation de tiers (art. 122).",
    "La Cour des comptes, institution supérieure de contrôle et juridiction financière relevant de l'Assemblée nationale (loi organique n° 18/024, art. 3), vérifie a posteriori la régularité des opérations, certifie les comptes de l'État (art. 35), assiste le Parlement (art. 124 LOFIP ; art. 34) et publie chaque année un rapport (art. 180 de la Constitution).",
    "Elle juge les comptes des comptables publics par arrêts successivement provisoires et définitifs : quitus ou décharge si le compte est conforme, débet — avec intérêts au taux directeur de la BCC — sinon (art. 126 LOFIP ; art. 110-113 de la loi organique). La réquisition valide de l'ordonnateur dégage le comptable et déplace la responsabilité vers l'ordonnateur.",
    "Le comptable de fait (art. 130 LOFIP) assume les obligations d'un comptable public ; la faute de gestion (art. 129) est punie d'une amende du quart au double du traitement brut annuel, l'ordre écrit non manifestement illégal de la hiérarchie exonérant le subordonné (art. 32 de la loi organique).",
    "Le contrôle parlementaire est politique : informations et investigations ne peuvent être refusées, les ministres sont auditionnés (art. 127), et la loi de reddition des comptes — déposée au plus tard le 15 mai de l'année suivante (art. 84) — clôt l'exercice, ratifie les crédits ouverts par ordonnance-loi et permet la décharge des ordonnateurs.",
  ],
  references: [
    { genre: 'texte', intitule: "Constitution de la République Démocratique du Congo du 18 février 2006, telle que modifiée par la loi n° 11/002 du 20 janvier 2011", precision: "art. 100, 138, 146-147 (contrôle parlementaire), 173 (compte général), 178 à 180 (Cour des comptes)" },
    { genre: 'texte', intitule: "Loi n° 11/011 du 13 juillet 2011 relative aux finances publiques, telle que modifiée par la loi n° 18/010 du 09 juillet 2018 et par la loi n° 23/030 du 28 juin 2023", precision: "art. 28 à 31 (reddition des comptes), 82, 84, 111 à 131 (contrôles et sanctions)" },
    { genre: 'texte', intitule: "Loi organique n° 18/024 du 13 novembre 2018 portant composition, organisation et fonctionnement de la Cour des comptes", precision: "art. 1 à 39 (statut et missions), 84 (chambres des comptes déconcentrées), 88 à 146 (procédure : jugement des comptes, gestion de fait, discipline budgétaire et financière, contrôle extra-juridictionnel)" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Constitution de la RDC (18 février 2006, révisée en 2011) ; loi n° 11/011 du 13 juillet 2011 relative aux finances publiques (LOFIP), modifiée en 2018 et 2023 ; loi organique n° 18/024 du 13 novembre 2018 sur la Cour des comptes.",
}

export default chapitre
