// Chapitre 1 du module UE5, Finances publiques : contenu pur.
// Migré depuis l'ancienne page dédiée UE5Chapitre1Page.tsx vers le moteur
// commun components/chapitre/ChapitreManuscrit.tsx, avec vérification sur
// les textes : LOFIP n° 11/011 du 13 juillet 2011 (parties 1, 2 et 4 lues
// en intégralité) telle que modifiée par les lois n° 18/010 du 9 juillet
// 2018 et n° 23/030 du 28 juin 2023 ; Constitution du 18 février 2006
// (art. 3, 122, 123, 170-181) ; RGCP en vigueur (décret n° 24/10 du
// 14 octobre 2024, art. 1-11 et 50) ; lois de finances 2025 (n° 24/011)
// et 2026 (n° 25/060 du 29 décembre 2025). Corrections majeures : la
// citation prêtée à l'art. 174 de la Constitution était inventée -
// l'art. 174 pose la légalité de l'impôt, l'architecture budgétaire
// relevant de l'art. 175 al. 1 ; l'art. 176 est la Banque centrale du
// Congo, la libre administration des provinces venant de l'art. 3 ;
// les 40% sont « retenus à la source » (art. 175 al. 2, texte exact) ;
// la séparation ordonnateur/comptable relève des art. 102-109 LOFIP et
// de l'art. 4 du RGCP (les « art. 109-110 » cités étaient erronés, comme
// les « art. 95-96 » pour les régies, qui relèvent de l'art. 50 du RGCP) ;
// le RGCP n° 13/050 de 2013 est abrogé ; la dotation de péréquation de la
// LF 2025 est de 2 376,5 milliards FC (art. 10), non « 2 282,9 ».
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch1-q1', question: 'Quel article de la Constitution habilite le législateur à fixer les règles concernant les finances publiques ?',
    options: [
      { id: 'a', texte: 'Art. 120' },
      { id: 'b', texte: 'Art. 122 point 3' },
      { id: 'c', texte: 'Art. 174' },
      { id: 'd', texte: 'Art. 175' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 122 Constitution · Art. 1 LOFIP',
    explication: "L'Art. 122 point 3 de la Constitution range « les finances publiques » dans le domaine de la loi, et le point 10 y ajoute « l'assiette, le taux et les modalités de recouvrement des impositions de toute nature ». C'est sur ce fondement que l'Art. 1er de la LOFIP ouvre : « La présente loi fixe, conformément à l'article 122 point 3 de la Constitution, les règles concernant les finances publiques. »",
  },
  {
    id: 'ch1-q2', question: "Selon la LOFIP, les finances de l'État comprennent les recettes et dépenses de :",
    options: [
      { id: 'a', texte: 'Pouvoir central uniquement' },
      { id: 'b', texte: 'Pouvoir central + Provinces uniquement' },
      { id: 'c', texte: 'Pouvoir central + Provinces + Entités territoriales décentralisées' },
      { id: 'd', texte: 'Gouvernement central et ministères' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 2 et 3 LOFIP',
    explication: "L'Art. 2 de la LOFIP dispose qu'elle s'applique « aux finances de l'État, à savoir les finances du pouvoir central, celles des provinces, ainsi que celles des entités territoriales décentralisées et de leurs organismes auxiliaires ». L'Art. 3 définit les finances de l'État comme l'ensemble des recettes et dépenses de ces trois étages.",
  },
  {
    id: 'ch1-q3', question: "Quel pourcentage des recettes à caractère national est alloué aux provinces selon l'Art. 175 de la Constitution ?",
    options: [
      { id: 'a', texte: '25%' },
      { id: 'b', texte: '30%' },
      { id: 'c', texte: '40%' },
      { id: 'd', texte: '50%' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 175 Constitution',
    explication: "L'Art. 175 al. 2 de la Constitution dispose : « La part des recettes à caractère national allouées aux provinces est établie à 40%. Elle est retenue à la source. » Le mécanisme constitutionnel est donc la retenue à la source - le compte de la province est crédité lors du nivellement vers le Compte général du Trésor (Art. 3 et 220 LOFIP) -, même si la pratique parle souvent de « rétrocession ».",
  },
  {
    id: 'ch1-q4', question: 'Quelle est la principale différence entre finances publiques et finances privées ?',
    options: [
      { id: 'a', texte: 'Les finances privées utilisent des impôts' },
      { id: 'b', texte: "Les finances publiques visent l'intérêt général et sont soumises au principe de légalité" },
      { id: 'c', texte: "Les finances publiques n'ont pas de comptabilité" },
      { id: 'd', texte: 'Il n\'y a aucune différence' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 9, 10 LOFIP · Art. 174 Constitution',
    explication: "Les finances publiques sont dominées par la légalité : pas d'impôt sans loi (Art. 174 Constitution, Art. 9 LOFIP), pas de dépense sans compétence, texte régulier et crédits disponibles (Art. 10 LOFIP) ; elles visent l'intérêt général, sont financées par le prélèvement obligatoire et contrôlées par le Parlement, la Cour des comptes et l'IGF. Les finances privées obéissent à la liberté contractuelle et visent le profit, sous comptabilité SYSCOHADA.",
  },
  {
    id: 'ch1-q5', question: 'La LOFIP est la loi n° :',
    options: [
      { id: 'a', texte: '11/011 du 13 juillet 2011' },
      { id: 'b', texte: '11/022 du 24 décembre 2011' },
      { id: 'c', texte: '13/050 du 6 novembre 2013' },
      { id: 'd', texte: '10/010 du 27 avril 2010' },
    ],
    reponseCorrecte: 'a', articleRef: 'LOFIP · lois n° 18/010 et 23/030',
    explication: "La LOFIP est la loi n° 11/011 du 13 juillet 2011 relative aux finances publiques, telle que modifiée par la loi n° 18/010 du 9 juillet 2018 et par la loi n° 23/030 du 28 juin 2023. Le n° 13/050 du 6 novembre 2013 était le décret portant Règlement général sur la comptabilité publique - abrogé et remplacé par le décret n° 24/10 du 14 octobre 2024, RGCP en vigueur.",
  },
  {
    id: 'ch1-q6', question: "Quel ministre est le régulateur de la trésorerie et l'ordonnateur général des recettes du pouvoir central ?",
    options: [
      { id: 'a', texte: 'Le Ministre du Budget' },
      { id: 'b', texte: 'Le Ministre des Finances' },
      { id: 'c', texte: 'Le Ministre du Plan' },
      { id: 'd', texte: 'Le Premier Ministre' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 106 LOFIP',
    explication: "L'Art. 106 de la LOFIP : le ministre ayant les finances dans ses attributions est, en sus de sa qualité d'ordonnateur du budget de son ministère, ordonnateur général de toutes les recettes du pouvoir central - il les constate, les liquide et les ordonnance. Il est le régulateur de la trésorerie et désigne les comptables publics. Le Ministre du Budget, lui, est ordonnateur des charges communes et contrôleur général du budget par le truchement des contrôleurs budgétaires (Art. 105).",
  },
  {
    id: 'ch1-q7', question: 'Parmi les ressources des provinces, laquelle est créditée directement lors du nivellement des recettes vers le Trésor ?',
    options: [
      { id: 'a', texte: 'Les fonds de concours' },
      { id: 'b', texte: 'La part de 40% des recettes à caractère national, retenue à la source' },
      { id: 'c', texte: "La subvention d'équilibre de l'État" },
      { id: 'd', texte: 'Les dons et legs extérieurs' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 175 Constitution · Art. 3 et 220 LOFIP',
    explication: "La retenue à la source est définie par l'Art. 3 de la LOFIP comme l'opération bancaire consistant à créditer le compte de la province génératrice des recettes d'une quotité de 40% du montant recouvré au titre des recettes à caractère national, lors du nivellement au profit du Compte général du Trésor. Pour les recettes de catégorie A, elle s'opère sur instruction permanente du Ministre des Finances (Art. 220).",
  },
  {
    id: 'ch1-q8', question: "Quel est l'objet de l'article 1er de la LOFIP ?",
    options: [
      { id: 'a', texte: 'Définir les principes budgétaires' },
      { id: 'b', texte: "Fixer les règles concernant les finances publiques, conformément à l'art. 122 point 3 de la Constitution" },
      { id: 'c', texte: 'Créer la Cour des comptes' },
      { id: 'd', texte: "Établir le plan comptable de l'État" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 1 LOFIP',
    explication: "L'Art. 1er fixe l'objet de la loi : les règles concernant les finances publiques, les règles spécifiques d'affectation des ressources et des charges, d'élaboration, de présentation, d'adoption et d'exécution des lois de finances, des édits budgétaires et des décisions budgétaires, ainsi que les règles de contrôle, de responsabilité et de sanctions, et les rapports entre pouvoir central, provinces et ETD. Les principes budgétaires viennent aux Art. 4 à 11.",
  },
  {
    id: 'ch1-q9', question: "« Les finances publiques et les finances privées obéissent aux mêmes règles car toutes deux gèrent de l'argent. » Cette affirmation est :",
    options: [
      { id: 'a', texte: "Vraie, l'argent obéit aux mêmes règles partout" },
      { id: 'b', texte: 'Fausse : les finances publiques sont soumises à la légalité et visent l\'intérêt général' },
      { id: 'c', texte: 'Vraie, car la comptabilité est identique' },
      { id: 'd', texte: 'Vraie pour les entreprises publiques' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 9-11 LOFIP · Art. 174 Constitution',
    explication: "L'affirmation est fausse. Les finances publiques reposent sur l'autorisation préalable du Parlement (la loi de finances), la légalité de l'impôt (Art. 174 Constitution, Art. 9 LOFIP), l'interdiction d'exécuter une dépense sans texte ni crédits (Art. 10), la sincérité des comptes (Art. 11) et des contrôles administratif, juridictionnel et parlementaire. Les finances privées obéissent à la liberté contractuelle et recherchent le profit.",
  },
  {
    id: 'ch1-q10', question: "Selon l'Art. 175 de la Constitution, la clé de répartition des recettes à caractère national est :",
    options: [
      { id: 'a', texte: '50% Pouvoir central / 50% Provinces' },
      { id: 'b', texte: '60% Pouvoir central / 40% Provinces' },
      { id: 'c', texte: '70% Pouvoir central / 30% Provinces' },
      { id: 'd', texte: '40% Pouvoir central / 60% Provinces' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 175 Constitution · Art. 218 LOFIP',
    explication: "L'Art. 175 al. 2 de la Constitution établit à 40% la part des recettes à caractère national allouée aux provinces, retenue à la source - les 60% restants revenant au pouvoir central. L'Art. 218 de la LOFIP précise toutefois que cette allocation tient compte du transfert effectif des compétences : le pouvoir central peut retenir de la quote-part provinciale le coût des compétences non transférées, dans les conditions définies par une loi de finances.",
  },
  {
    id: 'ch1-q11', question: 'Les finances des ETD comprennent, entre autres, la quote-part sur les impôts et taxes :',
    options: [
      { id: 'a', texte: 'Nationaux uniquement' },
      { id: 'b', texte: "Provinciaux d'intérêt commun" },
      { id: 'c', texte: 'Municipaux uniquement' },
      { id: 'd', texte: 'Fonciers uniquement' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 3 et 225 LOFIP',
    explication: "L'Art. 3 de la LOFIP définit les finances de l'ETD : ressources propres, recettes à caractère national provenant de la province, quote-part des impôts et taxes provinciaux d'intérêt commun, autres transferts du pouvoir central et de la province, et ressources extérieures. L'Art. 225 chiffre les droits des ETD : 40% de la part des recettes à caractère national allouées aux provinces, et 40% des impôts et taxes provinciaux d'intérêt commun.",
  },
  {
    id: 'ch1-q12', question: 'Qui désigne les comptables publics du pouvoir central ?',
    options: [
      { id: 'a', texte: 'Le Parlement' },
      { id: 'b', texte: 'Le Président de la République' },
      { id: 'c', texte: 'Le Ministre des Finances' },
      { id: 'd', texte: 'Le Ministre du Budget' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 106 et 109 LOFIP',
    explication: "L'Art. 106 de la LOFIP donne au ministre ayant les finances dans ses attributions le pouvoir de désigner les comptables publics. L'Art. 109 définit le comptable public - tout agent ayant qualité pour exécuter, au nom et pour le compte du pouvoir central, des opérations de recettes, de dépenses, de maniement de fonds et de valeurs - et précise qu'il relève de la responsabilité du Ministre des Finances.",
  },
  {
    id: 'ch1-q13', question: '« Le budget de la province » et « le budget provincial » sont-ils synonymes en droit congolais ?',
    options: [
      { id: 'a', texte: 'Oui, les deux termes sont identiques' },
      { id: 'b', texte: 'Non : le budget provincial intègre les budgets des ETD dans celui de la province' },
      { id: 'c', texte: 'Oui, sauf pour les ETD rurales' },
      { id: 'd', texte: "Non, le budget provincial est voté par l'Assemblée nationale" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 3 et 6 LOFIP',
    explication: "L'Art. 3 de la LOFIP distingue le « budget de la province » (prévisions des recettes et dépenses de la seule province) du « budget provincial » (prévisions des ETD intégrées dans celles de la province). L'Art. 6 organise la pyramide : le budget de l'ETD est intégré dans le budget de la province pour constituer le budget provincial, et les budgets provinciaux sont consolidés avec le budget du pouvoir central pour constituer le Budget de l'État. L'édit budgétaire provincial est voté par l'Assemblée provinciale.",
  },
  {
    id: 'ch1-q14', question: 'La loi de finances n° 25/060 du 29 décembre 2025 (exercice 2026) a arrêté le budget du pouvoir central en équilibre à :',
    options: [
      { id: 'a', texte: '49 846 milliards FC' },
      { id: 'b', texte: '50 691,8 milliards FC' },
      { id: 'c', texte: '54 335,8 milliards FC' },
      { id: 'd', texte: '51 553,5 milliards FC' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 6-7 LF 2026 (loi n° 25/060)',
    explication: "L'Art. 6 de la loi n° 25/060 du 29 décembre 2025 arrête le budget du pouvoir central 2026 en équilibre à 54 335 751 192 461 FC, les recettes du budget général étant fixées à 48 969 279 573 100 FC (Art. 7). La part des recettes à caractère national allouée aux provinces s'élève à 7 694,5 milliards FC (Art. 8) et la Caisse nationale de péréquation à 744,6 milliards FC (Art. 9).",
  },
  {
    id: 'ch1-q15', question: 'Une province souhaite créer un nouvel impôt pour financer ses écoles. Cette décision est :',
    options: [
      { id: 'a', texte: 'Possible, car la province gère ses propres ressources' },
      { id: 'b', texte: 'Impossible : il ne peut être établi d\'impôts que par la loi, et les assemblées provinciales ne peuvent créer ni impôt, ni taxe, ni droit, ni redevance' },
      { id: 'c', texte: 'Possible sur autorisation du Gouverneur' },
      { id: 'd', texte: "Possible si l'Assemblée provinciale l'approuve" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 9 LOFIP · Art. 122 pt. 10 et 174 Constitution',
    explication: "L'Art. 174 de la Constitution pose qu'« il ne peut être établi d'impôts que par la loi », et l'Art. 122 point 10 réserve à la loi l'assiette, le taux et le recouvrement des impositions. L'Art. 9 de la LOFIP le traduit : les Assemblées provinciales et les organes délibérants des ETD « ne peuvent créer ni impôt, ni taxe, ni droit ou redevance ». Seule nuance : l'Assemblée nationale et le Sénat peuvent, par une loi d'habilitation fondée sur l'art. 205 al. 2 de la Constitution, autoriser les assemblées locales à fixer le taux et/ou les modalités de recouvrement de certains impôts provinciaux et locaux - jamais à les créer.",
  },
  {
    id: 'ch1-n1', question: 'Combien de catégories de lois de finances la LOFIP reconnaît-elle ?',
    options: [
      { id: 'a', texte: 'Deux : la loi de finances initiale et la loi rectificative' },
      { id: 'b', texte: 'Quatre : loi de finances de l\'année, lois rectificatives, loi portant reddition des comptes, loi portant ouverture de crédits provisoires' },
      { id: 'c', texte: 'Trois : initiale, rectificative et de règlement' },
      { id: 'd', texte: 'Une seule : le budget annuel' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 18 LOFIP',
    explication: "L'Art. 18 de la LOFIP : ont le caractère de loi de finances la loi de finances de l'année, les lois de finances rectificatives, la loi portant reddition des comptes et la loi portant ouverture de crédits provisoires. Sous réserve d'exceptions limitativement énumérées, seule une loi de finances rectificative peut, en cours d'année, modifier les dispositions de la loi de finances de l'année (Art. 26).",
  },
  {
    id: 'ch1-n2', question: "Le pouvoir central peut-il financer son budget par des avances de la Banque centrale du Congo ?",
    options: [
      { id: 'a', texte: 'Oui, dans la limite de 10% des recettes' },
      { id: 'b', texte: 'Non : le recours aux avances de la BCC est prohibé, pour le pouvoir central comme pour les provinces et les ETD' },
      { id: 'c', texte: 'Oui, avec l\'accord du Parlement' },
      { id: 'd', texte: 'Oui, en cas d\'urgence seulement' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 16 LOFIP · Art. 176 Constitution',
    explication: "L'Art. 16 de la LOFIP est catégorique : « Le recours aux avances de la Banque Centrale du Congo est prohibé tant pour le pouvoir central que pour la province et l'entité territoriale décentralisée. » C'est un verrou de discipline monétaire : la BCC - institut d'émission indépendant chargé de la stabilité monétaire (Art. 176 Constitution) - ne finance pas les déficits publics. La soutenabilité impose aussi d'équilibrer les charges courantes par des ressources internes et de ne pas emprunter plus que le montant de ses investissements (Art. 15).",
  },
  {
    id: 'ch1-n3', question: "L'exercice budgétaire congolais s'étend :",
    options: [
      { id: 'a', texte: 'Du 1er juillet au 30 juin' },
      { id: 'b', texte: 'Du 1er janvier au 31 décembre - une règle posée par la Constitution elle-même' },
      { id: 'c', texte: 'Sur toute période de 12 mois fixée par le Gouvernement' },
      { id: 'd', texte: 'Du 1er avril au 31 mars' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 172 Constitution · Art. 5 LOFIP',
    explication: "L'Art. 172 de la Constitution dispose que « l'exercice budgétaire commence le premier janvier et se termine le 31 décembre » - l'annualité est donc constitutionnalisée. L'Art. 5 de la LOFIP le reprend en y greffant la modernité : les crédits découlent d'une budgétisation pluriannuelle sur un horizon de trois années, incluant le cadre des dépenses à moyen terme.",
  },
  {
    id: 'ch1-n4', question: 'Les fonctions d\'ordonnateur et de comptable public peuvent-elles être cumulées ?',
    options: [
      { id: 'a', texte: 'Oui, pour accélérer les paiements' },
      { id: 'b', texte: 'Non : elles sont incompatibles, et même les conjoints, ascendants et descendants des ordonnateurs ne peuvent être comptables des mêmes organismes' },
      { id: 'c', texte: 'Oui, dans les petites ETD' },
      { id: 'd', texte: 'Oui, sur autorisation du Ministre des Finances' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 4 RGCP (décret n° 24/10 du 14/10/2024) · Art. 102-109 LOFIP',
    explication: "L'Art. 4 du RGCP en vigueur (décret n° 24/10 du 14 octobre 2024) dispose : « Les fonctions d'ordonnateur et celles de comptable public sont incompatibles », et interdit même aux conjoints, ascendants et descendants des ordonnateurs d'être comptables publics des organismes où ceux-ci exercent. La LOFIP organise le tandem : l'ordonnateur engage, liquide et ordonnance (Art. 103), le comptable public - seul habilité au maniement des fonds - exécute recettes et dépenses (Art. 109).",
  },
  {
    id: 'ch1-n5', question: 'Comment la retenue à la source des 40% s\'applique-t-elle aux recettes de catégorie B (douanes, accises, grandes entreprises, pétroliers) ?',
    options: [
      { id: 'a', texte: 'Comme pour la catégorie A : au profit de la province de perception' },
      { id: 'b', texte: 'Elle est répartie entre les provinces suivant leur capacité contributive et leur poids démographique, avec 10% de la part provinciale attribués à la province productrice pour les recettes pétrolières' },
      { id: 'c', texte: 'Elle est supprimée pour la catégorie B' },
      { id: 'd', texte: 'Elle est versée intégralement à Kinshasa' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 219-221 LOFIP',
    explication: "L'Art. 219 de la LOFIP classe les recettes à caractère national en deux catégories : A (recettes administratives, judiciaires et domaniales collectées en province ; impôts perçus au lieu de réalisation) et B (recettes collectées au niveau central, douanes et accises, impôts des grandes entreprises, pétroliers producteurs). Pour la catégorie A, les 40% sont portés au compte de la province génératrice lors du nivellement (Art. 220). Pour la catégorie B, la retenue s'effectue suivant la capacité contributive et le poids démographique des provinces (Art. 221) - avec, pour les recettes pétrolières, 10% de la part provinciale attribués à la province productrice à titre compensatoire des dommages environnementaux.",
  },
  {
    id: 'ch1-n6', question: 'Comment le budget de la Caisse nationale de péréquation est-il alimenté ?',
    options: [
      { id: 'a', texte: 'Par des dons extérieurs uniquement' },
      { id: 'b', texte: "Par le Trésor public, à concurrence de 10% de la totalité des recettes à caractère national revenant à l'État chaque année" },
      { id: 'c', texte: 'Par 5% du PIB' },
      { id: 'd', texte: 'Par une contribution volontaire des provinces riches' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 181 Constitution · Art. 222 LOFIP',
    explication: "L'Art. 181 de la Constitution institue la Caisse nationale de péréquation, dotée de la personnalité juridique et placée sous la tutelle du Gouvernement, avec un budget alimenté par le Trésor public « à concurrence de dix pour cent de la totalité des recettes à caractère national revenant à l'État chaque année » ; sa mission : financer des projets et programmes d'investissement public pour assurer la solidarité nationale et corriger le déséquilibre de développement entre les provinces et entre les ETD. L'Art. 222 de la LOFIP renvoie à ces 10% assis sur les recettes des catégories A et B ; une loi organique fixe son organisation et son fonctionnement.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '1.1',
    titre: 'La notion de finances publiques et la LOFIP',
    navLabel: '1.1 Notion et LOFIP',
    blocs: [
      { type: 'paragraphe', texte: "Les **finances publiques** désignent l'ensemble des règles applicables aux recettes et aux dépenses des entités qui composent l'État. En RDC, leur texte fondateur est la **loi n° 11/011 du 13 juillet 2011 relative aux finances publiques (LOFIP)**, telle que modifiée par la **loi n° 18/010 du 9 juillet 2018** et la **loi n° 23/030 du 28 juin 2023**. Son article 1er annonce le programme : fixer, conformément à l'**article 122 point 3 de la Constitution**, les règles concernant les finances publiques - affectation des ressources et des charges, élaboration, présentation, adoption et exécution des **lois de finances**, des **édits budgétaires** (provinces) et des **décisions budgétaires** (ETD), contrôle, responsabilités et sanctions, et rapports entre le pouvoir central, les provinces et les ETD." },
      { type: 'filet', titre: "Champ d'application (Art. 2) et définitions (Art. 3)", texte: "La LOFIP s'applique « aux finances de l'État, à savoir les finances du pouvoir central, celles des provinces, ainsi que celles des entités territoriales décentralisées et de leurs organismes auxiliaires » (Art. 2). L'Art. 3 aligne les définitions - passées à **43 points** avec la révision de 2023, qui y a ajouté notamment le **débat d'orientation budgétaire** et la **dotation budgétaire** (crédits des institutions de la République non soumis à la règle de la performance, par opposition aux **programmes** ministériels). Y figurent les finances de l'État (recettes et dépenses des trois étages), les finances du pouvoir central, celles de la province - ressources propres, recettes nationales retenues à la source, ressources de la Caisse nationale de péréquation, autres transferts, ressources extérieures - et celles de l'ETD." },
      { type: 'carte', titre: 'Finances publiques et finances privées', tableau: { entetes: ['Critère', 'Finances publiques', 'Finances privées'], lignes: [
        ['Finalité', 'Intérêt général - service public', 'Intérêt particulier - profit'],
        ['Régime juridique', "Légalité : pas d'impôt sans loi (Art. 174 Constitution, Art. 9 LOFIP), pas de dépense sans texte ni crédits (Art. 10 LOFIP)", 'Liberté contractuelle'],
        ['Ressources', 'Prélèvements obligatoires, emprunts autorisés par la loi de finances', 'Ventes, emprunts librement négociés'],
        ['Contrôle', 'Parlement, Cour des comptes, Inspection générale des finances, contrôleurs budgétaires', 'Associés, commissaires aux comptes'],
        ['Comptabilité', 'Comptabilité publique (LOFIP, Art. 95-101 ; RGCP - décret n° 24/10 du 14 octobre 2024)', 'SYSCOHADA (AUDCIF)'],
      ] } },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
    ],
  },
  {
    numero: '1.2',
    titre: 'Le cadre constitutionnel des finances publiques',
    navLabel: '1.2 Cadre constitutionnel',
    blocs: [
      { type: 'paragraphe', texte: "La Constitution du 18 février 2006, telle que modifiée par la loi n° 11/002 du 20 janvier 2011, consacre aux finances publiques une section entière (Art. 170 à 181). Elle pose d'abord des règles de structure : le **Franc congolais** est l'unité monétaire (Art. 170), **les finances du pouvoir central et celles des provinces sont distinctes** (Art. 171), et **l'exercice budgétaire commence le premier janvier et se termine le 31 décembre** (Art. 172) - l'annualité budgétaire a donc rang constitutionnel. Le **compte général de la République** est soumis chaque année au Parlement par la Cour des comptes, avec ses observations, et arrêté par la loi (Art. 173)." },
      { type: 'carte', titre: 'Les articles clés, dans leur texte exact', tableau: { entetes: ['Article', 'Ce qu\'il dit réellement'], lignes: [
        ['Art. 122 pt. 3 et 10', "La loi fixe les règles concernant « les finances publiques » (pt. 3) et « l'assiette, le taux et les modalités de recouvrement des impositions de toute nature » (pt. 10) - fondement de la LOFIP"],
        ['Art. 174', "**Légalité de l'impôt** : « Il ne peut être établi d'impôts que par la loi » ; la contribution aux charges publiques est un devoir pour toute personne vivant en RDC ; aucune exemption ou allègement fiscal qu'en vertu de la loi"],
        ['Art. 175', "« Le budget des recettes et des dépenses de l'État, à savoir celui du pouvoir central et des provinces, est arrêté chaque année par une loi » (al. 1) ; « La part des recettes à caractère national allouées aux provinces est établie à 40%. **Elle est retenue à la source** » (al. 2) ; la loi fixe la nomenclature des autres recettes locales (al. 3)"],
        ['Art. 176-177', "La **Banque centrale du Congo** : institut d'émission chargé de la garde des fonds publics, de la stabilité monétaire, de la politique monétaire et du contrôle bancaire, indépendante et autonome ; organisée par une loi organique"],
        ['Art. 178-180', "La **Cour des comptes**, relevant de l'Assemblée nationale, contrôle la gestion des finances de l'État, des biens publics et les comptes des provinces, des ETD et des organismes publics ; elle publie chaque année un rapport remis au Président de la République, au Parlement et au Gouvernement"],
        ['Art. 181', "La **Caisse nationale de péréquation**, dotée de la personnalité juridique, finance des projets et programmes d'investissement public pour assurer la solidarité nationale et corriger le déséquilibre de développement ; budget alimenté par le Trésor à concurrence de **10% des recettes à caractère national** ; tutelle du Gouvernement ; loi organique"],
      ] }, note: "Attention aux confusions répandues : l'architecture budgétaire tripartite ne vient pas de l'art. 174 - qui pose la légalité de l'impôt - mais de l'art. 175 al. 1 combiné à la LOFIP ; et l'art. 176 ne traite pas de l'autonomie provinciale mais de la Banque centrale. La **libre administration** des provinces et des ETD, avec l'autonomie de gestion de leurs ressources économiques, humaines, financières et techniques, est posée par l'**art. 3** de la Constitution - la loi en déterminant les principes fondamentaux (Art. 123 pt. 1)." },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[17] },
      { type: 'controle', question: QCM[14] },
    ],
  },
  {
    numero: '1.3',
    titre: "Les trois étages des finances de l'État",
    navLabel: '1.3 Les trois étages',
    blocs: [
      { type: 'carte', titre: 'Pouvoir central, provinces, ETD', tableau: { entetes: ['Étage', 'Acte budgétaire', 'Organe qui vote', 'Ressources principales'], lignes: [
        ['Pouvoir central', "Loi de finances de l'année", 'Parlement (Assemblée nationale et Sénat)', "Ressources internes (recettes courantes, en capital, exceptionnelles) et extérieures (Art. 34 LOFIP)"],
        ['Province', '**Édit budgétaire**', 'Assemblée provinciale', "Ressources propres, 40% des recettes nationales retenus à la source, Caisse nationale de péréquation, transferts, ressources extérieures (Art. 3 LOFIP)"],
        ['ETD (ville, commune, secteur, chefferie)', '**Décision budgétaire**', "Organe délibérant de l'ETD", "Ressources propres, recettes nationales via la province, quote-part des impôts provinciaux d'intérêt commun, transferts (Art. 3 LOFIP)"],
      ] }, note: "L'art. 3 de la Constitution dote les provinces et les ETD de la personnalité juridique et de la libre administration ; il énumère quatre catégories d'ETD : la ville, la commune, le secteur et la chefferie." },
      { type: 'filet', titre: "La pyramide de consolidation (Art. 6 LOFIP)", texte: "« Le budget de l'entité territoriale décentralisée est **intégré** en recettes et en dépenses dans le budget de la province pour constituer le **budget provincial**. Les budgets provinciaux sont **consolidés** avec le budget du pouvoir central pour constituer le **Budget de l'État**. » D'où deux notions à ne pas confondre : le budget *de la province* (ses seules opérations) et le budget *provincial* (qui intègre les ETD). La consolidation, opérée « pour des raisons statistiques et informatives » (Art. 223 et 227), suit un calendrier : le budget de la province est voté après celui du pouvoir central et celui de l'ETD après celui de la province (Art. 228) ; la décision budgétaire est transmise au Gouverneur pour intégration au plus tard le 30 mars, l'édit de consolidation est transmis au Gouvernement central au plus tard le 20 avril (Art. 229), et le projet de **loi de consolidation** est déposé à l'Assemblée nationale au plus tard le 31 mai pour être voté au plus tard le 15 juin (Art. 224)." },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[12] },
    ],
  },
  {
    numero: '1.4',
    titre: 'La répartition des recettes nationales : les 40% et la péréquation',
    navLabel: '1.4 Les 40% et la péréquation',
    blocs: [
      { type: 'paragraphe', texte: "L'Art. 218 de la LOFIP met en œuvre l'art. 175 de la Constitution : les provinces ont droit à **quarante pour cent des recettes à caractère national, retenues à la source**. La retenue à la source est une opération bancaire : le compte de la province génératrice est crédité de la quotité de 40% lors du **nivellement** des recettes mobilisées en province vers le Compte général du Trésor (Art. 3). Tempérament important : l'allocation « tient compte du transfert effectif des compétences et des responsabilités en matière des dépenses » - le pouvoir central peut retenir de la quote-part provinciale le coût des compétences non transférées, dans les conditions définies par une loi de finances (Art. 218)." },
      { type: 'carte', titre: 'Catégories A et B (Art. 219-221 LOFIP)', tableau: { entetes: ['Catégorie', 'Contenu', 'Mécanisme des 40%'], lignes: [
        ['A', "Recettes administratives, judiciaires et domaniales collectées en province ; recettes des impôts perçues à leur lieu de réalisation", "Retenue portée au compte de la **province génératrice** lors du nivellement, sur instruction permanente du Ministre des Finances (Art. 220)"],
        ['B', "Recettes collectées au niveau du pouvoir central ; douanes et accises ; impôts des grandes entreprises ; pétroliers producteurs", "Répartition entre les provinces suivant leur **capacité contributive** et leur **poids démographique** (arrêté conjoint Finances/Budget) ; pour les recettes pétrolières, **10% de la part provinciale** vont à la province productrice à titre compensatoire (Art. 221)"],
      ] } },
      { type: 'filet', titre: 'La Caisse nationale de péréquation (Art. 181 Constitution, Art. 222 LOFIP)', texte: "Parce que la retenue à la source favorise mécaniquement les provinces à forte activité économique, la Constitution institue un correctif : la **Caisse nationale de péréquation**, dotée de la personnalité juridique et placée sous la tutelle du Gouvernement. Sa mission : financer des projets et programmes d'investissement public « en vue d'assurer la solidarité nationale et de corriger le déséquilibre de développement entre les provinces et entre les autres entités territoriales décentralisées ». Son budget est alimenté par le Trésor public à concurrence de **10% de la totalité des recettes à caractère national** revenant à l'État chaque année (Art. 181 ; Art. 222 LOFIP, assis sur les catégories A et B). Une loi organique fixe son organisation et son fonctionnement. En chiffres : la loi de finances 2025 a doté la Caisse de 2 376,5 milliards FC (Art. 10 LF 2025) et la loi de finances 2026 de 744,6 milliards FC (Art. 9 LF 2026)." },
      { type: 'paragraphe', texte: "**Et les ETD ?** Elles ont droit à **40% de la part des recettes à caractère national allouées aux provinces** - conformément à l'art. 115 de la loi organique n° 08/016 sur les ETD - ainsi qu'à **40% des impôts et taxes provinciaux d'intérêt commun** (Art. 225 LOFIP). La répartition entre ETD se fait selon la capacité contributive, la superficie et le poids démographique (Art. 226)." },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[19] },
      { type: 'controle', question: QCM[20] },
    ],
  },
  {
    numero: '1.5',
    titre: 'Les acteurs : ministres, ordonnateurs et comptables publics',
    navLabel: '1.5 Les acteurs',
    blocs: [
      { type: 'carte', titre: 'Le tandem Budget / Finances dans la LOFIP', tableau: { entetes: ['Ministre', 'Attributions textuelles', 'Articles'], lignes: [
        ['Ministre du Budget', "Établit chaque année le **cadre budgétaire à moyen terme** à 3 ans, transmis à l'Assemblée nationale au plus tard le 1er juin pour le **débat d'orientation budgétaire** (au plus tard le 15 juin) ; prépare le projet de loi de finances de l'année, de crédits provisoires et de finances rectificative ; met les crédits à disposition des ordonnateurs par arrêté ; **ordonnateur des charges communes** et **contrôleur général du budget** par le truchement des contrôleurs budgétaires ; pouvoir de régulation des crédits", 'Art. 13 (réd. 2023), 77, 88, 103, 105'],
        ['Ministre des Finances', "**Ordonnateur général de toutes les recettes** du pouvoir central (il les constate, liquide et ordonnance) ; **régulateur de la trésorerie** ; **désigne les comptables publics** ; conclut les opérations financières (emprunts, prêts, garanties, prises de participation) après avis du Ministre du Budget ; supervise le projet de loi portant reddition des comptes", 'Art. 28, 77, 106, 108'],
      ] }, note: "Toute décision ayant une répercussion sur les recettes ou les dépenses, et tout acte créant des emplois ou modifiant le statut pécuniaire des agents, doivent être soumis à l'avis préalable du Ministre du Budget et, le cas échéant, du Ministre des Finances (Art. 107)." },
      { type: 'filet', titre: "La séparation de l'ordonnateur et du comptable public", texte: "Sont compétents en matière d'exécution du budget **l'ordonnateur et le comptable public** (Art. 102 LOFIP). L'**ordonnateur** - responsable d'institution, ministre, responsable de budget annexe ou son délégué - a le pouvoir, dans la limite des crédits, d'**engager, liquider et ordonnancer** les dépenses (Art. 103). Le **comptable public** est tout agent ayant qualité pour exécuter, au nom et pour le compte du pouvoir central, des opérations de recettes, de dépenses et de **maniement de fonds et de valeurs** ; il relève du Ministre des Finances (Art. 109). Le RGCP en vigueur - **décret n° 24/10 du 14 octobre 2024**, qui abroge le décret n° 13/050 de 2013 - verrouille la frontière : « Les fonctions d'ordonnateur et celles de comptable public sont **incompatibles** », jusqu'à interdire aux conjoints, ascendants et descendants des ordonnateurs d'être comptables des mêmes organismes (Art. 4 RGCP). Un **contrôleur budgétaire** est affecté auprès de chaque ordonnateur : tous les actes d'engagement, de liquidation et d'ordonnancement sont soumis à son **visa préalable** (Art. 104, 112 LOFIP)." },
      { type: 'carte', titre: 'Les sanctions du régime financier (Art. 128-131 LOFIP)', liste: [
        "**Responsabilité des ordonnateurs** : ils répondent des certifications qu'ils délivrent ; les ordonnateurs non membres du Gouvernement et les comptables publics encourent des sanctions disciplinaires, civiles et/ou pénales (Art. 128).",
        "**Faute de gestion** (Art. 129) : engager des dépenses sans pouvoir, sans crédits disponibles, dissimuler une fausse imputation, se procurer un avantage injustifié... - sanctionnée d'une amende pouvant atteindre le double du traitement brut annuel, sans être inférieure au quart.",
        "**Comptable de fait** (Art. 130) : toute personne qui s'ingère dans les opérations de recettes, de dépenses ou de maniement de valeurs sans titre de comptable public assume les mêmes obligations et responsabilités qu'un comptable public - sans préjudice des sanctions pénales.",
        "**Juge des fautes** (Art. 131) : les fautes de gestion des contrôleurs budgétaires, comptables publics et ordonnateurs non membres du Gouvernement sont jugées par la **Cour des comptes** ; la responsabilité personnelle et pécuniaire du comptable est mise en cause par une **décision de débet**.",
      ] },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[18] },
    ],
  },
  {
    numero: '1.6',
    titre: "L'actualité budgétaire : lois de finances 2025 et 2026",
    navLabel: '1.6 Actualité 2025-2026',
    blocs: [
      { type: 'paragraphe', texte: "La LOFIP reconnaît quatre catégories de lois de finances (Art. 18) : la loi de finances de l'année, les **lois de finances rectificatives** - seules habilitées, sous réserve d'exceptions limitatives, à modifier en cours d'année la loi de finances initiale (Art. 26) -, la loi portant **reddition des comptes** et la loi portant **ouverture de crédits provisoires**. L'exercice 2025 en a offert une illustration complète : la loi de finances initiale n° 24/011 avait arrêté le budget du pouvoir central en équilibre à **51 553,5 milliards FC** (Art. 7), sur des hypothèses de croissance de 5,7%, d'inflation moyenne de 10,3% et d'un taux de change moyen de 2 954,4 FC/USD ; en cours d'année, la **loi de finances rectificative n° 25/044 du 28 juin 2025** a révisé ce cadrage - budget ramené à environ 50 692 milliards FC selon les données publiées avec la LFR, sur des hypothèses actualisées - avant que la **loi n° 25/060 du 29 décembre 2025** n'ouvre l'exercice 2026." },
      { type: 'carte', titre: 'La loi de finances n° 25/060 du 29 décembre 2025 (exercice 2026)', tableau: { entetes: ['Grandeur', 'Montant', 'Article'], lignes: [
        ['Budget du pouvoir central, en équilibre', '**54 335 751 192 461 FC**', 'Art. 6'],
        ['Recettes du budget général', '48 969 279 573 100 FC', 'Art. 7'],
        ['Part des recettes à caractère national allouée aux provinces (40%)', '7 694 540 952 980 FC', 'Art. 8'],
        ['Caisse nationale de péréquation', '744 632 995 450 FC', 'Art. 9'],
        ['Investissements PDL-145 Territoires', '824 718 610 629 FC', 'Art. 80'],
      ] }, note: "La LF 2026 accélère aussi la réforme : neuf ministères pilotes entrent dans la déconcentration de l'ordonnancement prévue à l'art. 103 de la LOFIP (Art. 5 LF 2026), et les mesures fiscales s'appliquent pour la première fois sous l'empire de la réforme IS/IRPP entrée en vigueur le 1er janvier 2026." },
      { type: 'filet', titre: 'Ce que la séquence 2025-2026 illustre', texte: "**L'annualité et son correctif** : le budget couvre l'année civile (Art. 172 Constitution, Art. 5 LOFIP), mais la LFR permet d'ajuster les autorisations en cours d'exercice lorsque la conjoncture s'écarte des hypothèses. **La sincérité** (Art. 11 LOFIP) : réviser les prévisions plutôt que d'exécuter un budget devenu irréaliste. **La compétence exclusive du législateur** : la révision passe par une loi votée au Parlement - le Gouvernement ne modifie pas seul les autorisations (Art. 122 pt. 3 Constitution, Art. 26 LOFIP). **La transparence renforcée depuis 2023** : le cadre budgétaire à moyen terme est débattu à l'Assemblée nationale (débat d'orientation budgétaire, au plus tard le 15 juin), et le projet de loi de finances est déposé au plus tard le **15 septembre**, l'Assemblée disposant de 40 jours pour l'adopter (Art. 83 LOFIP)." },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[16] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: 'La taxe sur les marchés publics de la Province du Kwilu',
    contexte: "L'Assemblée provinciale du Kwilu vote une délibération instituant une « taxe spéciale sur les marchés publics » de 5% sur tous les contrats passés par les services de l'État dans la province. Le Gouverneur promulgue la délibération, et le ministre provincial du Budget commence à émettre des avis de paiement aux entreprises attributaires.",
    questions: [
      { num: 1, enonce: "Quelle est la valeur juridique de cette délibération au regard de la Constitution et de la LOFIP ?", correction: "La délibération est inconstitutionnelle et illégale. L'Art. 174 de la Constitution pose qu'« il ne peut être établi d'impôts que par la loi », et l'Art. 122 point 10 réserve à la loi nationale l'assiette, le taux et les modalités de recouvrement des impositions de toute nature. L'Art. 9 de la LOFIP en tire la conséquence explicite : « Les Assemblées provinciales, les organes délibérants des entités territoriales décentralisées ne peuvent créer ni impôt, ni taxe, ni droit ou redevance. » La seule ouverture est une loi d'habilitation votée par l'Assemblée nationale et le Sénat sur le fondement de l'art. 205 al. 2 de la Constitution, permettant aux assemblées locales de fixer le taux et/ou les modalités de recouvrement de certains impôts provinciaux et locaux - jamais d'en créer. Faute d'une telle habilitation, la « taxe spéciale » est dépourvue de toute base légale." },
      { num: 2, enonce: 'Quels recours sont ouverts contre cette taxe et sa perception ?', correction: "Les entreprises visées peuvent contester les avis de paiement devant le juge administratif compétent, la délibération étant privée de base légale ; l'inconstitutionnalité de la délibération peut être soulevée devant la Cour constitutionnelle, et l'illégalité peut être invoquée par voie d'exception à l'occasion de chaque acte de perception. Sur le terrain financier, les agents provinciaux qui percevraient ces sommes s'exposent : quiconque s'ingère dans le maniement de deniers publics sans titre est réputé comptable de fait et assume les obligations et responsabilités d'un comptable public (Art. 130 LOFIP), et la méconnaissance des règles d'exécution des recettes constitue une faute de gestion justiciable de la Cour des comptes (Art. 129 et 131 LOFIP)." },
      { num: 3, enonce: 'Quelles ressources la Province du Kwilu peut-elle légalement mobiliser ?', correction: "L'Art. 3 de la LOFIP énumère les finances de la province : (1) ses ressources propres, dans le cadre de la nomenclature des recettes locales fixée par la loi nationale (Art. 175 al. 3 Constitution, Art. 9 LOFIP) ; (2) les recettes à caractère national retenues à la source - 40%, créditées à la province pour les recettes de catégorie A générées sur son territoire et réparties selon la capacité contributive et le poids démographique pour la catégorie B (Art. 218-221) ; (3) les ressources de la Caisse nationale de péréquation (Art. 181 Constitution) ; (4) les autres transferts du pouvoir central ; (5) les ressources extérieures. La province peut aussi plaider, en loi de finances, pour la répartition qui lui est la plus favorable - mais la création d'un prélèvement nouveau reste le monopole du législateur national." },
    ],
  },
  {
    id: 'cp2',
    titre: 'Le budget de la commune de Ngaliema',
    contexte: "La commune de Ngaliema (ETD de la ville de Kinshasa) prépare sa décision budgétaire. Le Bourgmestre présente un projet comprenant : (1) des recettes propres de taxes locales pour 450 millions FC ; (2) une quote-part attendue des impôts provinciaux d'intérêt commun pour 380 millions FC ; (3) des transferts de la Province de Kinshasa pour 200 millions FC. Un conseiller propose d'ajouter une « subvention nationale directe » de 100 millions FC.",
    questions: [
      { num: 1, enonce: "La structure de financement proposée est-elle conforme à la LOFIP ?", correction: "Oui, pour ses trois premières lignes. L'Art. 3 de la LOFIP définit les finances de l'ETD comme comprenant les ressources propres (taxes locales levées dans le cadre de la nomenclature légale : 450 M FC), la quote-part des impôts et taxes provinciaux d'intérêt commun (380 M FC - l'Art. 225 fixe cette quote-part à 40% des impôts et taxes provinciaux d'intérêt commun), les autres transferts du pouvoir central et de la province (200 M FC) ainsi que les recettes à caractère national provenant de la province et les ressources extérieures. Le projet pourrait d'ailleurs être complété : l'Art. 225 donne aussi aux ETD droit à 40% de la part des recettes à caractère national allouées aux provinces, répartis entre ETD selon la capacité contributive, la superficie et le poids démographique (Art. 226)." },
      { num: 2, enonce: "La « subvention nationale directe » est-elle juridiquement fondée ?", correction: "Elle est possible mais doit être fondée sur un texte. L'Art. 3 de la LOFIP mentionne, parmi les finances de l'ETD, « les autres transferts du pouvoir central et de la province » : un concours direct du pouvoir central n'est donc pas exclu par principe, mais il suppose une inscription dans la loi de finances - la loi de finances de l'année peut précisément « définir les modalités de répartition des concours du pouvoir central aux provinces et entités territoriales décentralisées » (Art. 25 LOFIP). Par ailleurs, la Caisse nationale de péréquation a pour mission constitutionnelle de financer des projets et programmes d'investissement public entre les provinces et entre les ETD (Art. 181). Le conseiller doit donc désigner le fondement : ligne de concours inscrite en loi de finances ou projet financé par la péréquation - une simple prévision unilatérale dans la décision budgétaire ne crée aucun droit." },
      { num: 3, enonce: "Comment le budget de Ngaliema s'articule-t-il avec le Budget de l'État ?", correction: "Par intégrations successives (Art. 6 LOFIP) : le budget de l'ETD est intégré en recettes et en dépenses dans le budget de la province pour constituer le budget provincial ; les budgets provinciaux sont ensuite consolidés avec le budget du pouvoir central pour constituer le Budget de l'État. Le calendrier suit la même logique descendante : la décision budgétaire de Ngaliema est votée après l'édit budgétaire de Kinshasa, lui-même voté après la loi de finances (Art. 228) ; elle est transmise au Gouverneur pour intégration au plus tard le 30 mars, l'édit de consolidation part au Gouvernement central au plus tard le 20 avril (Art. 229), et le projet de loi de consolidation est déposé à l'Assemblée nationale au plus tard le 31 mai pour un vote au plus tard le 15 juin (Art. 224). Cette consolidation est opérée « pour des raisons statistiques et informatives » (Art. 223, 227) : elle n'absorbe pas l'autonomie budgétaire des étages inférieurs." },
    ],
  },
  {
    id: 'cp3',
    titre: "Le pont inachevé et l'annualité budgétaire",
    contexte: "Le ministère des Travaux publics a engagé en novembre 2024 un marché de construction d'un pont de 8 milliards FC, avec livraison prévue en mars 2026. Les crédits ont été ouverts sur l'exercice 2024. Au 31 décembre 2024, les travaux ne sont qu'à 40% et le solde de 4,8 milliards FC n'a pas été payé. Le directeur des finances du ministère affirme que les crédits non consommés de 2024 sont « automatiquement reportés » sur 2025.",
    questions: [
      { num: 1, enonce: "Que dit exactement le principe d'annualité, et l'affirmation du directeur est-elle exacte ?", correction: "L'Art. 5 de la LOFIP dispose que « l'exercice budgétaire s'étend sur une année civile allant du 1er janvier au 31 décembre » - règle que l'Art. 172 de la Constitution élève au rang constitutionnel - tout en précisant que les crédits découlent d'une budgétisation pluriannuelle sur trois ans. Les crédits budgétaires « sont autorisés pour une année » (Art. 42). L'affirmation d'un report « automatique » est donc inexacte : le report existe, mais il est un acte juridique conditionné, jamais un effet de plein droit. Deux fondements : l'Art. 53 - les autorisations d'engagement pluriannuelles et les crédits de paiement non consommés sont reportés sur l'exercice suivant, sur le même programme et le même titre, par arrêtés de report pris conjointement par le Ministre du Budget et le ministre intéressé au plus tard le 31 mars - et l'Art. 93 - les crédits couvrant des obligations existant au 31 octobre et non payées au 31 décembre peuvent être reportés, selon la procédure de l'Art. 94 (état approuvé par ordonnance-loi, arrêté du Ministre du Budget, ratification en loi de finances rectificative). Sans ces actes, rien ne passe d'un exercice à l'autre." },
      { num: 2, enonce: 'Comment la LOFIP organise-t-elle le financement des opérations pluriannuelles comme ce pont ?', correction: "Par le couple autorisations d'engagement / crédits de paiement. L'autorisation d'engagement est « la permission de signer sur l'année considérée un ou plusieurs marchés pour un montant total maximum mais dont l'exécution peut se réaliser sur plusieurs exercices budgétaires selon un échéancier des paiements » (Art. 3) ; elle constitue la limite supérieure des dépenses pouvant être engagées, tandis que les crédits de paiement plafonnent les dépenses ordonnançables ou payables pendant l'année (Art. 42). La loi de finances fixe, par ministère et par programme, le montant des autorisations d'engagement annuelles et pluriannuelles ainsi que des crédits de paiement (Art. 22), et les autorisations pluriannuelles d'investissement peuvent être révisées pour tenir compte des modifications techniques ou des variations de coûts (Art. 52). Pour le pont : une AE pluriannuelle de 8 milliards en 2024, avec des CP échelonnés sur 2024, 2025 et 2026 - c'est l'omission de cet échelonnement qui a créé la difficulté." },
      { num: 3, enonce: "Quelles limites calendaires encadrent l'exécution en fin d'exercice ?", correction: "Trois verrous. D'abord, les engagements de dépenses - autres que celles de personnel - se rapportant aux autorisations d'engagement annuelles « ne peuvent intervenir après le 31 octobre de chaque année » (Art. 92) : la fin d'exercice est réservée à la liquidation et au paiement, pas aux engagements nouveaux. Ensuite, les recettes et dépenses sont rattachées au budget de l'année où elles sont encaissées ou prises en charge par le comptable public (Art. 92), avec une période complémentaire possible : dans les conditions fixées par décret du Premier ministre, les recettes et dépenses peuvent être comptabilisées au cours d'une période complémentaire dont la durée « ne peut excéder le 31 janvier de l'année suivante » (Art. 97) - et lorsqu'une loi de finances rectificative est promulguée au cours du dernier mois de l'année, ses opérations peuvent s'exécuter durant cette période. Enfin, les reports doivent être actés au plus tard le 31 mars (Art. 53). Rien de tout cela n'opère automatiquement : chaque passage d'exercice suppose un acte." },
    ],
  },
  {
    id: 'cp4',
    titre: "Le Gouverneur qui voulait payer lui-même",
    contexte: "Le Gouverneur du Haut-Katanga, ordonnateur du budget provincial, demande au receveur provincial (comptable public) de lui remettre chaque semaine une avance de 500 millions FC « à sa disposition personnelle » pour régler directement les fournisseurs, en invoquant l'urgence des travaux routiers. Le receveur hésite.",
    questions: [
      { num: 1, enonce: 'Quel principe cette demande viole-t-elle, et sur quels textes repose-t-il ?', correction: "La séparation de l'ordonnateur et du comptable public. La LOFIP répartit l'exécution du budget entre deux acteurs exclusifs : l'ordonnateur, qui engage, liquide et ordonnance (Art. 103, applicable aux provinces par le régime des édits budgétaires), et le comptable public, seul agent ayant qualité pour exécuter les opérations de recettes, de dépenses et de maniement de fonds et de valeurs (Art. 109). Le RGCP en vigueur - décret n° 24/10 du 14 octobre 2024, applicable au budget du pouvoir central, des provinces et des ETD (Art. 1er) - le dit sans détour : « Les fonctions d'ordonnateur et celles de comptable public sont incompatibles » (Art. 4). Remettre des fonds « à la disposition personnelle » du Gouverneur reviendrait à lui transférer le maniement des deniers publics, c'est-à-dire à cumuler les deux fonctions en une seule main - précisément ce que le droit financier interdit pour prévenir les détournements." },
      { num: 2, enonce: "Quels risques courent le receveur et le Gouverneur s'ils passent outre ?", correction: "Pour le receveur : le comptable public est responsable des deniers qu'il manie ; en remettant des fonds sans titre régulier de dépense, il s'expose à la mise en cause de sa responsabilité personnelle et pécuniaire par une décision de débet prononcée par la Cour des comptes (Art. 131 LOFIP), ainsi qu'aux sanctions disciplinaires, civiles et pénales de l'Art. 128. Pour le Gouverneur : en maniant des fonds publics sans avoir le titre de comptable public, il devient comptable de fait - « toute personne qui s'ingère dans les opérations de recettes, de dépenses ou de maniement de valeurs sans avoir qualité pour le faire... est réputée comptable de fait » - soumis aux mêmes obligations et responsabilités qu'un comptable public, sans préjudice des sanctions pénales (Art. 130). S'y ajoute la faute de gestion (Art. 129) : engagement de dépenses hors règles, avantage injustifié - amende pouvant atteindre le double du traitement brut annuel, prononcée par la Cour des comptes (Art. 131). Le receveur a donc le devoir de refuser." },
      { num: 3, enonce: "Quelle voie légale existe-t-il pour accélérer des paiements urgents sans briser la séparation ?", correction: "La régie d'avances, organisée par l'Art. 50 du RGCP : une procédure qui autorise un agent de carrière des services publics à régler, avec des fonds mis à sa disposition par un comptable public assignataire, des dettes définitivement constatées par ledit comptable. La création d'une régie est de l'initiative de l'ordonnateur, mais suppose l'avis conforme du comptable public assignataire, et l'acte constitutif est pris par le ministre - ou l'échevin - ayant les finances dans ses attributions. La séparation est ainsi préservée : le régisseur n'est pas l'ordonnateur, il agit sous le contrôle du comptable qui a constaté les dettes, et les fonds restent tracés. Symétriquement, la régie de recettes permet à un agent d'encaisser au nom et pour le compte d'un comptable public, à charge de reversement. L'urgence ne justifie jamais la confusion des fonctions - elle justifie l'organisation d'une régie." },
    ],
  },
  {
    id: 'cp5',
    titre: 'La Caisse nationale de péréquation et le Mai-Ndombe',
    contexte: "La Province du Mai-Ndombe, à faible activité économique, perçoit peu au titre de la retenue à la source des 40%. Son Gouverneur critique le mécanisme de l'art. 175 de la Constitution - « plus une province est riche, plus elle reçoit » - et réclame des transferts directs vers les provinces pauvres. Son conseiller juridique lui répond qu'un mécanisme constitutionnel existe déjà.",
    questions: [
      { num: 1, enonce: 'La critique économique du Gouverneur est-elle fondée au regard des textes ?', correction: "Oui, dans son constat. L'Art. 175 al. 2 de la Constitution dispose que la part de 40% des recettes à caractère national allouées aux provinces « est retenue à la source » : pour les recettes de catégorie A, le compte de la province génératrice est crédité lors du nivellement (Art. 219-220 LOFIP) - une province qui génère peu de recettes perçoit donc mécaniquement peu. Le correctif existe pourtant au sein même du mécanisme : les recettes de catégorie B (douanes et accises, impôts des grandes entreprises, pétroliers) ne sont pas retenues au lieu de perception mais réparties entre toutes les provinces suivant leur capacité contributive et leur poids démographique (Art. 221) - et l'allocation globale tient compte du transfert effectif des compétences (Art. 218). La critique vaut donc surtout pour la catégorie A ; elle est légitime économiquement, mais la règle est constitutionnelle et s'applique uniformément." },
      { num: 2, enonce: 'Quel mécanisme constitutionnel le conseiller a-t-il en tête ? Décrivez-le précisément.', correction: "La Caisse nationale de péréquation de l'Art. 181 de la Constitution : institution dotée de la personnalité juridique, placée sous la tutelle du Gouvernement, dont la mission est « de financer des projets et programmes d'investissement public, en vue d'assurer la solidarité nationale et de corriger le déséquilibre de développement entre les provinces et entre les autres entités territoriales décentralisées ». Son budget est alimenté par le Trésor public « à concurrence de dix pour cent de la totalité des recettes à caractère national revenant à l'État chaque année » - l'Art. 222 de la LOFIP assoit ces 10% sur l'ensemble des recettes des catégories A et B. Une loi organique fixe son organisation et son fonctionnement. Concrètement, la dotation est inscrite chaque année en loi de finances : 2 376,5 milliards FC dans la loi de finances 2025 (Art. 10), 744,6 milliards FC dans la loi de finances 2026 (Art. 9 de la loi n° 25/060)." },
      { num: 3, enonce: 'Le Mai-Ndombe peut-il exiger une dotation déterminée de la Caisse ?', correction: "Non, pas comme un droit subjectif à un montant prédéterminé. L'Art. 181 crée la Caisse et sa mission, mais finance des « projets et programmes d'investissement public » - non des subventions de fonctionnement automatiques - et renvoie à une loi organique pour son organisation et son fonctionnement. Le montant global est arrêté chaque année par la loi de finances, votée par le Parlement, et son emploi est orienté vers la correction des déséquilibres de développement : le Mai-Ndombe est précisément le type de province que la mission de la Caisse vise, et il peut faire valoir ses projets dans les procédures de sélection et plaider sa cause lors de l'examen du projet de loi de finances. Mais l'opposabilité s'arrête là : pas de créance automatique, un droit à concourir dans un mécanisme de solidarité nationale dont le Parlement et le Gouvernement gardent la clé." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue5',
  numero: 1,
  id: 'ue5-chapitre-1',
  titre: 'Introduction aux finances publiques',
  sousTitre: 'LOFIP n° 11/011 du 13 juillet 2011 (mod. 2018 et 2023) · Constitution du 18 février 2006, art. 122 et 170-181',
  infoBulle: "La notion de finances publiques, la LOFIP et son champ, le cadre constitutionnel (légalité de l'impôt, 40% retenus à la source, Cour des comptes, Caisse nationale de péréquation), les trois étages budgétaires, les acteurs de l'exécution et l'actualité des lois de finances 2025-2026.",
  loiRef: 'LOFIP · Constitution RDC · RGCP 2024',
  moduleLabel: 'UE 5 · Finances publiques',
  retourRoute: '/ue5-finances-publiques',
  coursId: 'ue5-finances-publiques',
  objectifs: [
    "Définir les finances publiques selon la LOFIP (art. 1-3) et les distinguer des finances privées",
    "Situer le cadre constitutionnel exact : art. 122, 171-175 (légalité de l'impôt, 40% retenus à la source), 178-181",
    "Identifier les trois étages des finances de l'État et la pyramide d'intégration et de consolidation (art. 2, 3, 6 LOFIP)",
    'Expliquer la répartition des recettes nationales : catégories A et B, retenue à la source, Caisse nationale de péréquation (art. 217-229)',
    "Distinguer les rôles des Ministres du Budget et des Finances, de l'ordonnateur et du comptable public (art. 102-110 LOFIP ; RGCP 2024)",
    'Analyser l\'actualité budgétaire : lois de finances 2025 (n° 24/011), rectificative n° 25/044 et 2026 (n° 25/060)',
  ],
  sections: SECTIONS,
  aRetenir: [
    "La LOFIP - loi n° 11/011 du 13 juillet 2011, modifiée par les lois n° 18/010 (2018) et n° 23/030 (2023) - fixe, sur le fondement de l'art. 122 pt. 3 de la Constitution, les règles des finances publiques des trois étages : pouvoir central, provinces, ETD (art. 1-2).",
    "Légalité de l'impôt : il ne peut être établi d'impôts que par la loi (art. 174 Constitution, art. 9 LOFIP) ; les assemblées provinciales et locales ne peuvent créer ni impôt, ni taxe, ni droit, ni redevance - une loi d'habilitation peut seulement leur confier la fixation du taux ou du recouvrement de certains impôts locaux.",
    "L'exercice budgétaire court du 1er janvier au 31 décembre - règle constitutionnelle (art. 172) - et aucune dépense ne peut être exécutée sans compétence, sans texte régulier et sans crédits disponibles (art. 10 LOFIP) ; les avances de la Banque centrale sont prohibées (art. 16).",
    "Les 40% des recettes à caractère national sont retenus à la source au profit des provinces (art. 175 Constitution) : crédit direct à la province génératrice pour la catégorie A, répartition selon capacité contributive et poids démographique pour la catégorie B, avec 10% de la part provinciale à la province productrice pour le pétrole (art. 218-221 LOFIP) ; les ETD reçoivent 40% de la part provinciale et 40% des impôts provinciaux d'intérêt commun (art. 225).",
    "La Caisse nationale de péréquation (art. 181 Constitution) - personnalité juridique, tutelle du Gouvernement, budget alimenté à concurrence de 10% des recettes à caractère national - corrige les déséquilibres de développement entre provinces et entre ETD.",
    "Le budget de l'ETD est intégré dans celui de la province (budget provincial), et les budgets provinciaux sont consolidés avec celui du pouvoir central pour former le Budget de l'État (art. 6 LOFIP) - consolidation statistique et informative, votée selon un calendrier descendant puis remontant (art. 223-229).",
    "Le Ministre du Budget prépare le budget, met les crédits à disposition et contrôle par les contrôleurs budgétaires (visa préalable) ; le Ministre des Finances est ordonnateur général des recettes, régulateur de la trésorerie et désigne les comptables publics (art. 77, 88, 103-106, 112 LOFIP).",
    "Les fonctions d'ordonnateur et de comptable public sont incompatibles (art. 4 du RGCP - décret n° 24/10 du 14 octobre 2024, qui a remplacé le décret n° 13/050 de 2013) ; qui manie des fonds publics sans titre est comptable de fait (art. 130 LOFIP), et la Cour des comptes juge les fautes de gestion et prononce les débets (art. 129-131).",
    "Quatre catégories de lois de finances (art. 18 LOFIP) ; l'exercice 2025 (budget initial de 51 553,5 milliards FC, rectifié par la loi n° 25/044) et la loi n° 25/060 du 29 décembre 2025 pour 2026 (54 335,8 milliards FC, provinces 7 694,5 milliards, péréquation 744,6 milliards) en donnent l'illustration vivante.",
  ],
  references: [
    {
      genre: 'texte',
      intitule: 'Loi n° 11/011 du 13 juillet 2011 relative aux finances publiques (LOFIP)',
      precision: 'telle que modifiée par la loi n° 18/010 du 9 juillet 2018 et par la loi n° 23/030 du 28 juin 2023 ; art. 1-16, 17-131 et 217-229',
    },
    {
      genre: 'texte',
      intitule: 'Constitution de la République Démocratique du Congo du 18 février 2006',
      precision: 'telle que modifiée par la loi n° 11/002 du 20 janvier 2011 ; art. 3, 122, 123, 170 à 181',
    },
    {
      genre: 'texte',
      intitule: 'Décret n° 24/10 du 14 octobre 2024 portant Règlement général sur la comptabilité publique (RGCP)',
      precision: 'art. 1 à 11 et 50 ; abroge le décret n° 13/050 du 6 novembre 2013',
    },
    {
      genre: 'texte',
      intitule: 'Lois de finances n° 24/011 (exercice 2025), n° 25/044 du 28 juin 2025 (rectificative) et n° 25/060 du 29 décembre 2025 (exercice 2026)',
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : LOFIP n° 11/011 du 13 juillet 2011 (mod. lois n° 18/010 et n° 23/030) · Constitution du 18 février 2006 · RGCP, décret n° 24/10 du 14 octobre 2024 · LF n° 24/011 (2025), LFR n° 25/044, LF n° 25/060 (2026)',
}

export default chapitre
