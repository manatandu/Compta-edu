// Chapitre 1 du module UE1, Droit du travail : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
import type { Chapitre } from '@/lib/chapitre-types'

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '1.1',
    titre: 'Objet et finalité du droit du travail',
    navLabel: '1.1 Objet et finalité',
    blocs: [
      { type: 'paragraphe', texte: 'Le droit du travail est la branche du droit qui régit les rapports individuels et collectifs nés à l\'occasion du travail salarié. En République Démocratique du Congo, il repose sur la loi n°015/2002 du 16 octobre 2002 portant Code du travail, modifiée et complétée par la loi n°16/010 du 15 juillet 2016. Le Code compte seize titres et trois cent trente-quatre articles ; il constitue le socle de référence de l\'ensemble de ce manuel.' },
      { type: 'paragraphe', texte: 'Cette branche du droit poursuit une finalité qui la distingue nettement du droit commun des contrats : elle organise une relation structurellement inégale, celle du travailleur, économiquement dépendant de son emploi pour assurer sa subsistance et celle de sa famille, face à l\'employeur, qui détient le pouvoir de direction, d\'organisation et, en dernier ressort, de rupture du lien contractuel. Le législateur ne s\'est pas contenté d\'encadrer un échange de prestations ; il a construit, article après article, un dispositif de protection minimale auquel le contrat individuel ne peut déroger que dans un sens plus favorable au travailleur.' },
      { type: 'paragraphe', texte: 'Cette prémisse permet de trancher un débat récurrent dans la doctrine congolaise : le contrat de travail est-il véritablement négocié entre les parties, ou n\'est-il, dans la grande majorité des cas, qu\'un contrat d\'adhésion que le travailleur accepte en bloc, faute de pouvoir en discuter les termes ? Kapuku (2026) observe que l\'égalité juridique proclamée par le droit commun des obligations masque, dans les faits, une inégalité économique structurelle entre l\'employeur qui fixe les conditions d\'engagement et le travailleur qui les accepte par nécessité. C\'est précisément pour corriger ce déséquilibre que le Code du travail impose des règles impératives là où le droit civil se contenterait de règles supplétives.' },
      { type: 'filet', titre: 'Principe de faveur', texte: 'La loi fixe un plancher de protection, jamais un plafond. Toute clause du contrat, du règlement intérieur ou d\'une convention collective qui abaisserait ce plancher est réputée non écrite.' },
      { type: 'paragraphe', texte: 'Cette logique protectrice explique pourquoi le droit du travail se lit rarement comme un texte supplétif : la plupart de ses dispositions sont d\'ordre public social, c\'est-à-dire qu\'elles s\'imposent indépendamment de la volonté des parties. Elle n\'est du reste pas une invention récente du législateur de 2002. Luwenyema Lulue relevait déjà, dans son Précis de droit du travail zaïrois publié à Kinshasa en 1989, que le droit du travail zaïrois s\'était construit sur cette même vocation protectrice, héritée pour partie de la législation coloniale du travail et prolongée par les réformes successives de l\'État congolais. Le Code de 2002 poursuit ainsi une tradition doctrinale continue, plutôt qu\'il ne rompt avec elle.' },
      { type: 'paragraphe', texte: 'Comprendre cette finalité en amont conditionne la lecture de tous les chapitres qui suivent, du contrat de travail à la rémunération, en passant par la rupture et le décompte final. Chaque règle technique étudiée dans ce manuel, aussi précise soit-elle, se justifie in fine par cette recherche d\'équilibre entre la protection du travailleur et les nécessités de gestion de l\'employeur.' },
    ],
  },
  {
    numero: '1.2',
    titre: 'Sources et hiérarchie des normes',
    navLabel: '1.2 Sources et hiérarchie',
    blocs: [
      { type: 'paragraphe', texte: 'Le droit du travail congolais se déploie à plusieurs niveaux hiérarchisés, chacun ne pouvant que préciser ou améliorer le niveau supérieur, jamais le contredire en défaveur du travailleur.' },
      { type: 'tableau', tableau: { entetes: ['Niveau', 'Source', 'Exemple'], lignes: [['Constitutionnel', 'Constitution du 18 février 2006 (droit et devoir au travail)', 'Art. 36'], ['Législatif', 'Loi n°015/2002, mod. loi n°16/010', 'Code du travail, art. 1–334'], ['Réglementaire', 'Décrets et arrêtés d\'exécution', 'Décret n°25/22 du 30/05/2025 (SMIG)'], ['Conventionnel', 'Conventions et accords collectifs', 'Convention d\'entreprise ou de branche'], ['Contractuel', 'Le contrat individuel et le règlement d\'entreprise', 'CDD, CDI']] } },
      { type: 'paragraphe', texte: 'À ces sources internes s\'ajoutent les conventions de l\'Organisation internationale du travail ratifiées par la RDC, qui s\'intègrent à l\'ordre juridique interne dès leur ratification et priment sur toute loi nationale contraire. La RDC figure parmi la cinquantaine d\'États membres de l\'OIT ayant ratifié l\'ensemble des huit conventions fondamentales de l\'Organisation, dont la convention n°138 sur l\'âge minimum d\'admission à l\'emploi et la convention n°182 sur les pires formes de travail des enfants, toutes deux ratifiées en 2001. Ces deux textes irriguent directement les articles 3 à 6 du Code, étudiés à la section 1.6 du présent chapitre.' },
      { type: 'paragraphe', texte: 'La hiérarchie ainsi construite reste vivante : elle continue d\'évoluer au gré des ratifications et des réformes réglementaires. La convention n°190 de l\'OIT, relative à la violence et au harcèlement dans le monde du travail, n\'est à ce jour pas ratifiée par la RDC ; des organisations syndicales et de la société civile en plaident la ratification, ce qui illustre qu\'une source de droit peut exister sur le plan international sans encore produire d\'effet en droit interne tant que l\'acte de ratification n\'est pas intervenu.' },
      { type: 'paragraphe', texte: 'La doctrine, enfin, n\'est pas une source de droit au sens strict : elle ne crée aucune règle contraignante. Elle joue néanmoins un rôle d\'interprétation et de systématisation indispensable à la pratique du droit du travail, en particulier dans un contexte où la jurisprudence publiée reste peu accessible. L\'ouvrage collectif de Loko Mantuono, Droit social, droit du travail et de la sécurité sociale en RDC, publié chez L\'Harmattan en 2022, en offre une synthèse récente qui reprend et actualise cette architecture des sources.' },
    ],
  },
  {
    numero: '1.3',
    titre: 'Champ d\'application du Code du travail',
    navLabel: '1.3 Champ d\'application',
    blocs: [
      { type: 'paragraphe', texte: 'Le champ d\'application du Code est défini par son article 1er. Il régit les relations individuelles et collectives de travail entre travailleurs et employeurs sur toute l\'étendue du territoire, mais un nombre limité de catégories en est expressément exclu, parce qu\'elles relèvent de statuts particuliers distincts du régime contractuel de droit privé.' },
      { type: 'carte', titre: 'Article 1er, Loi n°015/2002', note: '« La présente loi est applicable aux travailleurs et aux employeurs exerçant leur activité professionnelle sur toute l\'étendue de la République Démocratique du Congo. Elle ne s\'applique pas : aux magistrats ; aux juges consulaires et assesseurs des tribunaux du travail ; aux agents de carrière des services publics de l\'État régis par le statut général et les statuts particuliers de la fonction publique ; aux membres des Forces armées et de la Police nationale. »' },
      { type: 'paragraphe', texte: 'Ces exclusions ne signifient pas une absence de protection : les catégories concernées relèvent d\'un statut légal ou réglementaire propre plutôt que du régime organisé par le Code. Un magistrat ou un fonctionnaire de carrière ne peut donc jamais se prévaloir des règles de préavis, de licenciement ou de décompte final étudiées dans ce manuel. Il relève d\'un contentieux et d\'une procédure disciplinaire distincts.' },
      { type: 'paragraphe', texte: 'Chacune de ces quatre exclusions répond à une même logique : celle de statuts déjà pourvus d\'un régime disciplinaire et contentieux propre, dont la superposition avec le Code créerait un conflit de compétence. Le magistrat relève du statut de la magistrature et de l\'autorité du Conseil supérieur de la magistrature ; l\'agent de carrière de la fonction publique relève de la loi portant statut des agents de carrière des services publics de l\'État ; le militaire ou le policier relève de la justice militaire. Le juge consulaire et l\'assesseur des tribunaux du travail, quant à eux, ne sont pas des salariés du tribunal auprès duquel ils siègent : ils exercent une fonction juridictionnelle bénévole ou indemnisée, étrangère par nature au salariat.' },
      { type: 'paragraphe', texte: 'Le champ d\'application ainsi délimité n\'est pas figé. Il fait aujourd\'hui l\'objet d\'un débat qui dépasse le strict commentaire de l\'article 1er : celui de la place des travailleurs domestiques, chauffeurs et femmes de ménage employés par des particuliers. Ces travailleurs ne figurent pas parmi les catégories exclues et relèvent donc, en droit positif, du Code du travail commun. La pratique révèle cependant une protection largement théorique, faute de contrat écrit, d\'affiliation à la CNSS ou de contrôle de l\'inspection du travail dans la sphère domestique. Une proposition de loi déposée le 15 mai 2026 par le député Prince Kangila Kawele entend précisément instituer un régime légal spécifique pour cette catégorie de travailleurs. Il s\'agit à ce stade d\'une initiative législative, non d\'un texte en vigueur : elle doit être présentée comme telle, sans être confondue avec le droit positif applicable aujourd\'hui.' },
    ],
  },
  {
    numero: '1.4',
    titre: 'Définitions fondamentales',
    navLabel: '1.4 Définitions fondamentales',
    blocs: [
      { type: 'paragraphe', texte: 'L\'article 7 fixe onze définitions qui conditionnent l\'interprétation de l\'ensemble du Code. Les plus structurantes pour la suite du manuel sont le travailleur, l\'employeur, le contrat de travail et la rémunération, notion reprise telle quelle au chapitre 5 et mobilisée dans le calcul du décompte final au chapitre 10. Les définitions suivantes, moins fréquemment commentées, n\'en conditionnent pas moins la lecture de plusieurs chapitres ultérieurs.' },
      { type: 'tableau', tableau: { entetes: ['Notion', 'Définition (art. 7)'], lignes: [['Travailleur', 'Personne physique engagée à mettre son activité professionnelle, moyennant rémunération, sous la direction et l\'autorité d\'autrui.'], ['Employeur', 'Personne physique ou morale, publique ou privée, qui utilise les services d\'un ou plusieurs travailleurs en vertu d\'un contrat de travail.'], ['Contrat de travail', 'Convention par laquelle le travailleur s\'engage à fournir une prestation, sous la subordination de l\'employeur, moyennant rémunération.'], ['Entreprise', 'Organisation économique de production ou de distribution de biens ou de services, exploitée par une ou plusieurs personnes.'], ['Établissement', 'Unité technique de production, distincte de l\'entreprise qui peut en compter plusieurs, où s\'exécute la relation de travail.'], ['Recrutement', 'Toute activité visant à rassembler des candidats en vue de leur offrir un emploi salarié.'], ['Jour ouvrable', 'Tout jour où il est possible de travailler, à l\'exclusion du repos hebdomadaire et des jours fériés légaux.'], ['Temps de services', 'Durée pendant laquelle le travailleur a été occupé de manière effective ou assimilée au service d\'un même employeur.'], ['Famille du travailleur', 'Conjoint et enfants à charge, ces derniers ouvrant droit jusqu\'à vingt-cinq ans s\'ils poursuivent des études.']] } },
      { type: 'paragraphe', texte: 'La définition de la rémunération distingue explicitement ce qui entre dans son assiette de ce qui en est exclu :' },
      { type: 'tableau', tableau: { entetes: ['Compris', 'Exclu'], lignes: [['Salaire, commissions, indemnité de vie chère, primes, gratifications, avantages en nature.', 'Soins de santé, indemnité de logement, allocations familiales légales, indemnité de transport, frais de voyage.']] } },
      { type: 'paragraphe', texte: 'Cette distinction, en apparence purement définitionnelle, alimente une part importante des litiges pratiques en matière de paie. Une gratification annuelle qualifiée de libérale par l\'employeur, mais versée avec une régularité telle qu\'elle en devient prévisible, tend en pratique à être requalifiée en élément de rémunération soumis aux cotisations sociales. Kiyana relève, à propos du contrat de travail en RDC, que la rédaction du contrat et des bulletins de paie gagne à anticiper cette distinction plutôt qu\'à la découvrir lors d\'un contentieux.' },
    ],
  },
  {
    numero: '1.5',
    titre: 'Le lien de subordination',
    navLabel: '1.5 Lien de subordination',
    blocs: [
      { type: 'paragraphe', texte: 'La définition légale du contrat de travail met en avant un critère central : la subordination. C\'est lui, et non la seule existence d\'une rémunération, qui distingue le contrat de travail d\'un contrat d\'entreprise ou d\'un mandat, distinction dont dépend l\'accès au régime protecteur du Code. Un prestataire indépendant, aussi régulièrement rémunéré soit-il, n\'est pas un travailleur au sens de l\'article 7 s\'il n\'est pas placé sous l\'autorité d\'un employeur.' },
      { type: 'paragraphe', texte: 'La subordination se caractérise par l\'exécution d\'un travail sous l\'autorité d\'un employeur qui dispose du pouvoir de donner des ordres et des directives, d\'en contrôler l\'exécution et de sanctionner les manquements de son subordonné. La jurisprudence congolaise, comme l\'observe la doctrine, ne s\'arrête pas à une définition abstraite : elle apprécie un faisceau d\'indices concrets, dont aucun n\'est à lui seul décisif.' },
      { type: 'tableau', tableau: { entetes: ['Indice', 'Manifestation concrète'], lignes: [['Pouvoir de direction', 'L\'employeur fixe les tâches, les méthodes et les objectifs du travailleur.'], ['Pouvoir de surveillance', 'L\'employeur vérifie l\'exécution du travail, par une hiérarchie ou un contrôle direct.'], ['Organisation du travail', 'Le lieu et l\'horaire de travail sont imposés par l\'employeur, non choisis librement.'], ['Exclusivité', 'Le travailleur consacre son activité à un employeur unique, à l\'exclusion d\'une clientèle propre.'], ['Pouvoir de sanction', 'L\'employeur peut sanctionner disciplinairement les manquements constatés.']] } },
      { type: 'paragraphe', texte: 'Ce raisonnement par faisceau d\'indices explique pourquoi la qualification donnée par les parties elles-mêmes au contrat, qu\'elles l\'aient appelé prestation de service ou convention de sous-traitance, ne lie pas le juge. Si les faits révèlent une subordination réelle, la relation sera requalifiée en contrat de travail, avec toutes les conséquences que cela emporte : affiliation à la CNSS, application du régime de préavis et de licenciement, droit aux congés payés.' },
      { type: 'filet', titre: 'Distinction pratique', texte: 'Contrat de travail : l\'employeur fixe les moyens et les méthodes, le travailleur exécute sous contrôle. Contrat d\'entreprise : le prestataire s\'engage sur un résultat, en choisissant librement ses moyens. Mandat : le mandataire représente le mandant dans un acte juridique déterminé, sans lien de subordination.' },
    ],
  },
  {
    numero: '1.6',
    titre: 'Capacité de contracter et travail des enfants',
    navLabel: '1.6 Capacité de contracter',
    blocs: [
      { type: 'paragraphe', texte: 'L\'article 6 fixe l\'âge minimum de capacité à contracter un contrat de travail à dix-huit ans révolus. Ce principe connaît une dérogation strictement encadrée, et non un simple assouplissement laissé à l\'appréciation des parties.' },
      { type: 'carte', titre: 'Article 6, Loi n°015/2002, synthèse des conditions', note: 'Le mineur doit avoir au moins quinze ans. L\'engagement requiert une autorisation du Président du Tribunal de paix du ressort, délivrée sur avis conforme d\'un examen psycho-médical et après avis de l\'inspecteur du travail du ressort. Entre seize et dix-huit ans, seuls des travaux légers déterminés par arrêté du ministre ayant le Travail dans ses attributions peuvent être autorisés, à l\'exclusion de tout travail dangereux ou de nuit.' },
      { type: 'paragraphe', texte: 'Cette architecture doit être lue en cohérence avec les articles 3 à 5 du même titre, consacrés aux pires formes de travail des enfants et à la mise en place d\'un Comité national de lutte contre ce phénomène. Elle prolonge en droit interne deux engagements internationaux ratifiés par la RDC en 2001 : la convention n°138 de l\'OIT sur l\'âge minimum d\'admission à l\'emploi, et la convention n°182 sur l\'interdiction des pires formes de travail des enfants, qui inclut notamment les travaux susceptibles de nuire à la santé, à la sécurité ou à la moralité de l\'enfant.' },
      { type: 'paragraphe', texte: 'La difficulté, largement documentée par la doctrine et les organisations internationales, tient moins à l\'existence de la règle qu\'à son application effective dans le secteur informel, où l\'essentiel du travail des enfants échappe structurellement au contrôle de l\'inspection du travail. Ce constat ne retire rien à la valeur normative de l\'article 6 : il invite à distinguer, dans l\'analyse d\'un cas, la règle de droit applicable de son effectivité pratique, deux questions qu\'un juriste doit savoir traiter séparément.' },
    ],
  },
]

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1', question: 'Quelle loi constitue actuellement le Code du travail congolais ?',
    options: [
      { id: 'a', texte: 'La loi n°015/2002 du 16 octobre 2002, modifiée par la loi n°16/010 du 15 juillet 2016' },
      { id: 'b', texte: 'La loi n°16/010 du 15 juillet 2016, seule, qui a abrogé la loi de 2002' },
      { id: 'c', texte: 'Le décret du 27 février 1887 sur le travail, toujours en vigueur en parallèle' },
      { id: 'd', texte: 'La loi n°015/2002 du 16 octobre 2002, dans sa version originale non modifiée' },
      { id: 'e', texte: "L'ordonnance-loi n°67/310 du 9 août 1967 portant Code du travail" },
    ],
    reponseCorrecte: 'a', articleRef: 'Introduction',
    explication: "Le Code du travail actuellement en vigueur est la loi n°015/2002 du 16 octobre 2002, telle que modifiée et complétée par la loi n°16/010 du 15 juillet 2016. La loi de 2016 modifie le texte de 2002, elle ne l'abroge pas ; le texte de 2002 seul, sans ses modifications, ne reflète donc plus le droit actuel.",
  },
  {
    id: 'q2', question: 'Combien de titres et d\'articles compte le Code du travail ?',
    options: [
      { id: 'a', texte: 'Dix titres, deux cents articles' },
      { id: 'b', texte: 'Seize titres, trois cent trente-quatre articles' },
      { id: 'c', texte: 'Vingt titres, quatre cents articles' },
      { id: 'd', texte: 'Seize titres, deux cent trente-quatre articles' },
      { id: 'e', texte: 'Treize titres, trois cent trente-quatre articles' },
    ],
    reponseCorrecte: 'b', articleRef: '1.1',
    explication: 'Le Code compte seize titres et trois cent trente-quatre articles. Les distracteurs proches (deux cent trente-quatre, treize titres) visent à vérifier une mémorisation précise, non approximative.',
  },
  {
    id: 'q3', question: 'Comment se nomme le principe selon lequel une norme inférieure ne peut prévoir une protection moindre que la loi ?',
    options: [
      { id: 'a', texte: 'Le principe de faveur' },
      { id: 'b', texte: 'Le principe de proportionnalité' },
      { id: 'c', texte: 'Le principe de spécialité' },
      { id: 'd', texte: "Le principe de l'autonomie de la volonté" },
      { id: 'e', texte: 'Le principe de la hiérarchie des normes, seul et suffisant à lui expliquer ce mécanisme' },
    ],
    reponseCorrecte: 'a', articleRef: '1.1',
    explication: "Le principe de faveur signifie que la loi fixe un plancher de protection : le contrat, le règlement intérieur ou la convention collective ne peuvent y déroger que favorablement au travailleur. La hiérarchie des normes (option e) est le cadre général dans lequel s'inscrit le principe de faveur, mais elle ne rend pas compte, à elle seule, de la règle spécifique qui autorise une dérogation seulement favorable : une norme inférieure ordinaire ne peut pas déroger du tout à une norme supérieure, alors qu'en droit du travail, elle le peut favorablement.",
  },
  {
    id: 'q4', question: 'Quel âge le Code fixe-t-il, en principe, pour la capacité de contracter un contrat de travail ?',
    options: [
      { id: 'a', texte: 'Seize ans révolus' },
      { id: 'b', texte: 'Dix-huit ans révolus' },
      { id: 'c', texte: 'Vingt et un ans révolus' },
      { id: 'd', texte: 'Quinze ans révolus, âge de la dérogation devenu le principe' },
      { id: 'e', texte: "Dix-huit ans révolus, sauf autorisation parentale écrite qui abaisse ce seuil à seize ans" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 6',
    explication: "L'article 6 fixe l'âge minimum de capacité à contracter à dix-huit ans révolus, avec une dérogation strictement encadrée dès quinze ans, non par simple autorisation parentale mais par une procédure à trois conditions cumulatives (option e, piège classique confondant l'accord des parents avec l'autorisation légale).",
  },
  {
    id: 'q5', question: 'Lequel de ces travailleurs relève du Code du travail ?',
    options: [
      { id: 'a', texte: "Un agent de carrière de la fonction publique" },
      { id: 'b', texte: 'Un magistrat' },
      { id: 'c', texte: 'Un salarié de droit privé, quelle que soit sa fonction' },
      { id: 'd', texte: 'Un membre de la Police nationale congolaise' },
      { id: 'e', texte: 'Un assesseur du tribunal du travail' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 1er',
    explication: "L'article 1er exclut les magistrats, juges consulaires et assesseurs, agents de carrière de la fonction publique et membres des FARDC/PNC. Tout autre salarié de droit privé relève du Code, quelle que soit sa fonction dans l'entreprise.",
  },
  {
    id: 'q6', question: 'Qui doit autoriser l\'engagement d\'un mineur de quinze ans ?',
    options: [
      { id: 'a', texte: 'Le maire de la commune, sur simple demande des parents' },
      { id: 'b', texte: 'Le Président du Tribunal de paix du ressort, sur avis conforme d\'un examen psycho-médical et après avis de l\'inspecteur du travail' },
      { id: 'c', texte: "L'inspecteur du travail seul, sans autre formalité" },
      { id: 'd', texte: 'Le tuteur légal du mineur, avec confirmation du médecin de famille' },
      { id: 'e', texte: 'Le Président du Tribunal de paix seul, sans avis médical ni avis de l\'inspecteur du travail' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 6',
    explication: "L'autorisation relève du Président du Tribunal de paix du ressort, délivrée sur avis conforme d'un examen psycho-médical et après avis de l'inspecteur du travail : les trois conditions sont cumulatives. L'option e isole correctement l'autorité compétente mais omet les deux avis requis, ce qui la rend incomplète et donc fausse.",
  },
  {
    id: 'q7', question: 'Quels sont les trois éléments mis en avant par la définition légale du contrat de travail ?',
    options: [
      { id: 'a', texte: 'La rémunération, la durée, le lieu de travail' },
      { id: 'b', texte: 'La prestation, la subordination, la rémunération' },
      { id: 'c', texte: "L'ancienneté, la qualification, le grade" },
      { id: 'd', texte: 'La subordination, la durée, le lieu de travail' },
      { id: 'e', texte: 'La prestation, la rémunération, la durée déterminée du contrat' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 7, point 3',
    explication: "Le contrat de travail se définit par une prestation fournie sous la subordination de l'employeur, moyennant rémunération. La durée n'entre pas dans cette définition : un CDI comme un CDD sont l'un et l'autre des contrats de travail, la durée déterminée n'étant qu'une modalité, non un élément constitutif.",
  },
  {
    id: 'q8', question: "L'indemnité de logement entre-t-elle dans la rémunération au sens de l'article 7 ?",
    options: [
      { id: 'a', texte: "Oui, systématiquement" },
      { id: 'b', texte: 'Non, elle en est expressément exclue' },
      { id: 'c', texte: "Oui, mais seulement pour les cadres" },
      { id: 'd', texte: "Non, mais uniquement lorsqu'elle dépasse un certain montant" },
      { id: 'e', texte: "Oui, dès lors qu'elle est versée en espèces plutôt qu'en nature" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 7, point 8',
    explication: "L'indemnité de logement est expressément exclue de la rémunération, sans condition de montant ni de mode de versement, au même titre que les soins de santé, les allocations familiales légales, l'indemnité de transport et les frais de voyage.",
  },
  {
    id: 'q9', question: "Quelle convention de l'OIT porte sur l'âge minimum d'admission à l'emploi, et quand la RDC l'a-t-elle ratifiée ?",
    options: [
      { id: 'a', texte: 'La convention n°182, ratifiée en 1999' },
      { id: 'b', texte: 'La convention n°138, ratifiée en 2001' },
      { id: 'c', texte: 'La convention n°190, ratifiée en 2020' },
      { id: 'd', texte: 'La convention n°138, ratifiée en 1999, année de son adoption par l\'OIT' },
      { id: 'e', texte: 'La convention n°182, ratifiée en 2001' },
    ],
    reponseCorrecte: 'b', articleRef: '1.2 / 1.6',
    explication: "La convention n°138 de l'OIT porte sur l'âge minimum d'admission à l'emploi ; la RDC l'a ratifiée en 2001, en même temps que la convention n°182 sur les pires formes de travail des enfants. L'option d confond l'année d'adoption de la convention n°182 par l'OIT (1999) avec l'année de ratification par la RDC (2001) : ce sont deux dates distinctes, à ne pas mélanger.",
  },
  {
    id: 'q10', question: "Qu'est-ce qui distingue fondamentalement un contrat de travail d'un contrat d'entreprise ?",
    options: [
      { id: 'a', texte: "Le montant de la rémunération versée" },
      { id: 'b', texte: 'Le lien de subordination à l\'employeur' },
      { id: 'c', texte: 'La durée de la relation contractuelle' },
      { id: 'd', texte: "L'existence d'un contrat écrit" },
      { id: 'e', texte: 'Le nombre de clients ou de donneurs d\'ordre du prestataire' },
    ],
    reponseCorrecte: 'b', articleRef: '1.5',
    explication: "C'est le lien de subordination, et non le montant, la durée, l'existence d'un écrit ou le nombre de donneurs d'ordre, qui distingue le contrat de travail du contrat d'entreprise. Un prestataire peut n'avoir qu'un seul client sans pour autant être subordonné, s'il conserve la maîtrise de ses méthodes.",
  },
  {
    id: 'q11', question: 'Comment l\'article 7 définit-il le "temps de services" ?',
    options: [
      { id: 'a', texte: "La durée totale de la carrière professionnelle du travailleur, tous employeurs confondus" },
      { id: 'b', texte: "La durée pendant laquelle le travailleur a été occupé de manière effective ou assimilée au service d'un même employeur" },
      { id: 'c', texte: "Le nombre d'heures travaillées sur une semaine donnée" },
      { id: 'd', texte: "La durée du préavis restant à courir avant la fin du contrat" },
      { id: 'e', texte: "La durée d'occupation effective ou assimilée, incluant les interruptions dues au fait du travailleur lui-même" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 7, point 10',
    explication: "Le temps de services correspond à la durée d'occupation effective ou assimilée au service d'un même employeur, quelles qu'aient été les interruptions dues au fait de cet employeur. L'option e inverse un point précis de la définition : ce sont les interruptions dues au fait de l'employeur qui sont assimilées à du temps de services, non celles dues au fait du travailleur.",
  },
  {
    id: 'q12', question: 'Une gratification versée chaque année avec une régularité constante peut-elle être requalifiée en élément de rémunération soumis à cotisation ?',
    options: [
      { id: 'a', texte: 'Non, une gratification reste toujours un acte libéral, quelle que soit sa régularité' },
      { id: 'b', texte: "Oui : une régularité prévisible tend à faire perdre son caractère libéral à la gratification" },
      { id: 'c', texte: 'Non, sauf disposition contraire du contrat' },
      { id: 'd', texte: "Oui, mais uniquement si son montant dépasse un mois de salaire" },
      { id: 'e', texte: "Non, l'article 7 exclut expressément et sans exception toute gratification de la rémunération" },
    ],
    reponseCorrecte: 'b', articleRef: '1.4',
    explication: "Une gratification versée avec une régularité telle qu'elle en devient prévisible tend, en pratique, à être requalifiée en élément de rémunération soumis aux cotisations sociales. L'option e inverse la règle : l'article 7 inclut au contraire les gratifications dans la rémunération, ce n'est que leur caractère éventuellement libéral et imprévisible qui peut, en pratique, en écarter certaines occurrences isolées.",
  },
  {
    id: 'q13', question: "Un juge consulaire d'un tribunal de commerce est-il un travailleur au sens du Code du travail ?",
    options: [
      { id: 'a', texte: "Oui, dès lors qu'il perçoit une indemnité" },
      { id: 'b', texte: "Non, il exerce une fonction juridictionnelle, étrangère par nature au salariat" },
      { id: 'c', texte: 'Oui, s\'il siège plus de trois fois par an' },
      { id: 'd', texte: "Non, mais uniquement s'il siège bénévolement, sans aucune indemnité" },
      { id: 'e', texte: "Cela dépend de la juridiction commerciale concernée" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 1er / 1.3',
    explication: "Le juge consulaire n'est pas salarié de la juridiction auprès de laquelle il siège : il exerce une fonction juridictionnelle, bénévole ou indemnisée, exclue du champ du Code par l'article 1er. L'exclusion ne dépend donc ni du versement d'une indemnité (option d, piège), ni de la fréquence des séances (option c), ni de la juridiction précise (option e) : elle tient à la nature même de la fonction.",
  },
  {
    id: 'q14', question: 'Une société qualifie un livreur de « prestataire indépendant » mais lui impose ses horaires et ses méthodes de travail. Cette qualification contractuelle empêche-t-elle une requalification en contrat de travail ?',
    options: [
      { id: 'a', texte: "Oui, la qualification donnée par les parties au contrat lie le juge" },
      { id: 'b', texte: "Non : si les faits révèlent une subordination réelle, la relation est requalifiée quelle que soit l'étiquette contractuelle" },
      { id: 'c', texte: "Cela dépend uniquement du montant facturé chaque mois" },
      { id: 'd', texte: "Oui, sauf si le livreur en fait expressément la demande devant le tribunal du travail" },
      { id: 'e', texte: "Non, mais seulement si un écrit contredit expressément la qualification de prestataire indépendant" },
    ],
    reponseCorrecte: 'b', articleRef: '1.5',
    explication: "La qualification donnée par les parties ne lie pas le juge : c'est le faisceau d'indices concrets, direction, surveillance, organisation imposée, exclusivité, sanction, qui détermine la nature réelle de la relation. Aucun écrit contradictoire n'est requis (option e) : la requalification s'opère au vu des faits, même en présence d'un contrat qui affirme le contraire.",
  },
  {
    id: 'q15', question: "Entre seize et dix-huit ans, quels travaux un mineur peut-il légalement exercer ?",
    options: [
      { id: 'a', texte: "Tout travail, dès lors que ses parents y consentent par écrit" },
      { id: 'b', texte: "Uniquement des travaux légers déterminés par arrêté ministériel, à l'exclusion de tout travail dangereux ou de nuit" },
      { id: 'c', texte: "Tout travail rémunéré au moins au SMIG" },
      { id: 'd', texte: "Des travaux légers, y compris de nuit si l'employeur assure un encadrement renforcé" },
      { id: 'e', texte: "Les mêmes travaux qu'un adulte, la limitation aux travaux légers ne s'appliquant qu'avant seize ans" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 6',
    explication: "Entre seize et dix-huit ans, seuls des travaux légers déterminés par arrêté ministériel sont autorisés, à l'exclusion de tout travail dangereux ou de nuit, sans exception même en cas d'encadrement renforcé (option d, piège). La limitation ne disparaît pas à seize ans (option e) : elle s'assouplit, elle ne s'efface pas.",
  },
  {
    id: 'q16', question: "Les travailleurs domestiques, chauffeurs et femmes de ménage employés par des particuliers sont-ils actuellement exclus du champ d'application du Code ?",
    options: [
      { id: 'a', texte: "Oui, ils relèvent d'un statut spécifique depuis 2020" },
      { id: 'b', texte: "Non, ils ne figurent pas parmi les catégories exclues par l'article 1er et relèvent donc, en droit positif, du Code commun" },
      { id: 'c', texte: "Oui, depuis l'adoption de la proposition de loi de mai 2026" },
      { id: 'd', texte: "Non, mais seulement s'ils ont signé un contrat écrit avec leur employeur particulier" },
      { id: 'e', texte: "Le Code est muet sur leur situation, qui relève d'un vide juridique total" },
    ],
    reponseCorrecte: 'b', articleRef: '1.3',
    explication: "Les travailleurs domestiques relèvent en droit positif du Code du travail commun, faute d'exclusion expresse, que la relation soit ou non formalisée par un écrit (option d, piège : l'absence d'écrit n'exclut pas l'existence du contrat de travail, voir 1.4). La proposition de loi de mai 2026 n'est, à ce stade, qu'une initiative législative, non un texte en vigueur.",
  },
  {
    id: 'q17', question: "Quelle est la portée juridique actuelle de la proposition de loi Kangila Kawele sur les travailleurs domestiques ?",
    options: [
      { id: 'a', texte: "Elle est en vigueur depuis son dépôt le 15 mai 2026" },
      { id: 'b', texte: "Elle n'a aucune portée normative tant qu'elle n'a pas été adoptée : c'est une initiative législative, à distinguer du droit positif" },
      { id: 'c', texte: "Elle modifie immédiatement l'article 1er du Code" },
      { id: 'd', texte: "Elle est déjà appliquée par les juridictions du travail à titre de droit souple" },
      { id: 'e', texte: "Elle abroge, dès son dépôt, les dispositions contraires du droit positif" },
    ],
    reponseCorrecte: 'b', articleRef: '1.3',
    explication: "Une proposition de loi déposée ne produit aucun effet de droit tant qu'elle n'a pas été adoptée selon la procédure législative complète. Aucune des options a, c, d, e ne décrit correctement ce stade : le dépôt n'emporte ni entrée en vigueur, ni modification, ni application anticipée, ni abrogation.",
  },
  {
    id: 'q18', question: "Un cadre supérieur négocie individuellement chaque clause de son contrat avec son employeur. Cela suffit-il à réfuter la thèse du contrat de travail comme contrat d'adhésion telle que la présente Kapuku ?",
    options: [
      { id: 'a', texte: "Oui, un contrat négocié individuellement échappe par définition à la logique d'adhésion" },
      { id: 'b', texte: "Non : la thèse porte sur la généralité des relations de travail, dont la majorité échappe à toute négociation réelle ; l'existence de situations minoritaires de négociation effective ne l'invalide pas" },
      { id: 'c', texte: "Cela dépend uniquement du niveau de rémunération du cadre" },
      { id: 'd', texte: "Oui, car le principe de faveur ne s'applique pas aux contrats individuellement négociés" },
      { id: 'e', texte: "Non, car aucun contrat de travail, quel que soit le profil du salarié, ne peut jamais être considéré comme négocié" },
    ],
    reponseCorrecte: 'b', articleRef: '1.1',
    explication: "La thèse de Kapuku décrit une tendance générale, non une règle sans exception. Certains profils à fort pouvoir de négociation échappent partiellement à la logique d'adhésion, sans que cela invalide le constat dominant. Le principe de faveur, contrairement à l'option d, s'applique à tout contrat de travail sans exception liée au mode de négociation ; et l'option e, à l'inverse, nie toute négociation possible, ce qui est aussi excessif que l'option a.",
  },
  {
    id: 'q19', question: "Une personne travaille trois jours par semaine pour une société, facture un prix forfaitaire par mission, choisit librement son lieu de travail, mais reçoit des instructions précises sur la méthode à suivre. Quel indice pèse le plus lourd dans l'appréciation du lien de subordination ?",
    options: [
      { id: 'a', texte: "Le mode de facturation au forfait, qui exclut par nature la subordination" },
      { id: 'b', texte: "Le contrôle des méthodes de travail, qui doit être mis en balance avec le libre choix du lieu et l'absence d'exclusivité, dans un examen global du faisceau d'indices" },
      { id: 'c', texte: "Le nombre de jours travaillés par semaine, seul critère retenu par la jurisprudence" },
      { id: 'd', texte: "Le libre choix du lieu de travail, qui écarte à lui seul toute subordination" },
      { id: 'e', texte: "Aucun indice ne peut être apprécié tant que le nombre de clients de cette personne n'est pas connu" },
    ],
    reponseCorrecte: 'b', articleRef: '1.5',
    explication: "Aucun indice n'est décisif isolément, ni le mode de facturation (option a), ni le nombre de jours (option c), ni le libre choix du lieu (option d) : c'est l'appréciation globale du faisceau qui permet de qualifier la relation. Le nombre de clients (option e) est un facteur pertinent, notamment pour apprécier l'exclusivité, mais son absence ne bloque pas l'analyse : les autres indices disponibles suffisent à raisonner.",
  },
  {
    id: 'q20', question: "Un magistrat exerce, en parallèle de ses fonctions judiciaires, une activité d'enseignant salarié dans une université privée. Cette seconde activité relève-t-elle du Code du travail ?",
    options: [
      { id: 'a', texte: "Non, l'exclusion de l'article 1er couvre toute activité professionnelle du magistrat, y compris accessoire" },
      { id: 'b', texte: "Oui : l'exclusion de l'article 1er est attachée à la fonction de magistrat, non à la personne ; son activité d'enseignant salarié, distincte de sa fonction judiciaire, relève du droit commun du travail" },
      { id: 'c', texte: "Cela dépend uniquement du nombre d'heures d'enseignement par semaine" },
      { id: 'd', texte: "Non, car un magistrat ne peut légalement exercer aucune activité rémunérée accessoire" },
      { id: 'e', texte: "Oui, mais seulement si l'université a le statut d'établissement public" },
    ],
    reponseCorrecte: 'b', articleRef: '1.3',
    explication: "L'exclusion de l'article 1er est fonctionnelle : elle s'attache à la qualité de magistrat dans l'exercice de sa fonction juridictionnelle, non à toute activité que la personne pourrait exercer par ailleurs. La question de savoir si le cumul d'activités du magistrat est par ailleurs autorisé par son statut propre (option d) est distincte de la question posée, celle du régime applicable à l'activité d'enseignement elle-même ; et ce régime ne dépend pas de la nature publique ou privée de l'université (option e), mais du fait que l'enseignant y est salarié sous subordination.",
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: 'Le livreur à vélo',
    contexte: "Une société de restauration rapide de Kinshasa collabore avec des livreurs à vélo qu'elle qualifie de « partenaires indépendants ». Chaque livreur signe un contrat de prestation de service, choisit librement ses horaires de connexion à l'application, mais doit respecter un itinéraire imposé par le système, un délai de livraison strict sous peine de désactivation de son compte, et porter un uniforme fourni par la société. M. Bofenda, l'un de ces livreurs, roule avec son propre vélo et son propre téléphone, et livre parallèlement pour une seconde application concurrente deux jours par semaine. L'algorithme de la société abaisse cependant sa priorité d'attribution de commandes lorsque son taux d'acceptation descend sous 80 %, ce qui, en pratique, l'incite fortement à ne jamais refuser une course. Après un différend sur une désactivation qu'il conteste, M. Bofenda saisit le tribunal du travail en soutenant qu'il a toujours été un salarié.",
    questions: [
      { num: 1, enonce: "La liberté de choisir ses horaires de connexion, la possession de son propre vélo et de son propre téléphone, ainsi que la collaboration avec une seconde application, suffisent-elles à écarter la qualification de contrat de travail ?", correction: "Non, mais ces éléments doivent être réellement pesés, pas seulement écartés. La propriété du matériel et le travail pour un second donneur d'ordre sont des indices sérieux d'indépendance économique, qui affaiblissent l'exclusivité. Ils sont cependant mis en balance avec l'itinéraire imposé, le délai strict sanctionné par une désactivation, et l'uniforme fourni : ces derniers, relatifs à l'organisation et au contrôle du travail lui-même, l'emportent en général dans l'appréciation globale, car ils touchent au cœur de l'exécution de la prestation, alors que la propriété du vélo ou le second donneur d'ordre ne portent que sur les conditions périphériques de l'activité." },
      { num: 2, enonce: "Le mécanisme de priorité algorithmique lié au taux d'acceptation s'analyse-t-il juridiquement comme un pouvoir de sanction, alors même qu'aucune sanction nommée n'est prononcée ?", correction: "Oui, par requalification fonctionnelle. Le droit du travail ne s'arrête pas à l'absence du mot « sanction » : il regarde l'effet économique du mécanisme sur le travailleur. En abaissant la priorité d'attribution, donc les revenus, en réaction à un comportement, ici le refus de courses, la société exerce un pouvoir de contrainte comportementale équivalant fonctionnellement à une sanction disciplinaire déguisée, ce qui est étranger au contrat d'entreprise, dans lequel le prestataire reste libre de refuser une mission sans pénalité automatique." },
      { num: 3, enonce: "La désactivation du compte de M. Bofenda pour un retard s'analyse-t-elle différemment du mécanisme de priorité évoqué à la question précédente ?", correction: "Elle est plus radicale mais de même nature : la désactivation prive totalement le livreur de sa source de revenus, en réaction à un manquement identifié, ce qui remplit la fonction d'une sanction disciplinaire lourde, proche d'une mise à pied ou d'un licenciement dans la logique du droit du travail. La gradation entre les deux mécanismes, priorité abaissée puis désactivation, dessine même une échelle de sanctions comparable à celle d'un règlement intérieur d'entreprise." },
      { num: 4, enonce: "Devant le tribunal du travail, à qui incombe la charge de prouver l'existence, ou l'absence, du lien de subordination ?", correction: "Le demandeur, ici M. Bofenda, doit apporter les éléments de fait permettant au juge d'apprécier le faisceau d'indices, mais il ne doit pas prouver une définition abstraite : il lui suffit d'établir les faits précis, itinéraire imposé, délai sanctionné, uniforme fourni, mécanisme de priorité. C'est ensuite au juge, et non aux parties, de qualifier juridiquement ces faits, sans être lié par le contrat de prestation de service qui les qualifierait autrement. La société devra, de son côté, apporter les éléments démontrant la réalité de l'indépendance alléguée, propriété du matériel, pluralité de donneurs d'ordre, absence de contrainte réelle." },
      { num: 5, enonce: "Si la relation est requalifiée en contrat de travail, quelles conséquences pour la société au regard du chapitre étudié ?", correction: "La société devient employeur au sens de l'article 7, avec les obligations afférentes : affiliation de M. Bofenda à la CNSS, application du régime de préavis et de licenciement, respect du principe de faveur pour toute clause du contrat de prestation initial moins protectrice que le Code. Cette requalification n'est en outre pas limitée à M. Bofenda : si les mêmes clauses et le même dispositif algorithmique s'appliquent à l'ensemble des livreurs de la plateforme, le raisonnement retenu pour l'un d'eux est transposable à tous, ce qui en fait un enjeu structurel pour le modèle économique de la société, non un différend isolé." },
    ],
  },
  {
    id: 'cp2',
    titre: "La double activité de Mme Ngalula",
    contexte: "Mme Ngalula est employée en contrat à durée indéterminée par une banque de Lubumbashi, où elle perçoit un salaire de base de 1 200 000 FC par mois et travaille du lundi au vendredi. Le samedi, elle donne des cours de comptabilité dans un centre de formation privé, facturé à l'heure selon un tarif qu'elle a elle-même fixé. Le centre lui impose cependant un syllabus détaillé, contrôle sa présence par une feuille d'émargement et lui interdit contractuellement d'enseigner pour un centre concurrent. En fin d'année, la banque lui verse une gratification de 1 200 000 FC, présentée par la direction comme un acte de pure libéralité « à la discrétion exclusive de la direction », mais versée sans interruption ni variation depuis six exercices consécutifs.",
    questions: [
      { num: 1, enonce: "Mme Ngalula a-t-elle deux employeurs au sens de l'article 7, ou sa relation avec le centre de formation reste-t-elle une prestation indépendante malgré le syllabus imposé et l'exclusivité contractuelle ?", correction: "La question mérite un examen plus approfondi qu'une réponse de principe. Le syllabus imposé et l'émargement contrôlé sont des indices de direction et de surveillance ; la clause d'exclusivité prive Mme Ngalula de la possibilité de proposer ses services à un concurrent, ce qui affaiblit l'argument de l'indépendance économique. Ces éléments, mis bout à bout, rapprochent sa relation avec le centre d'un véritable lien de subordination, malgré la facturation à l'heure et le tarif qu'elle a elle-même fixé, qui ne sont que des indices contraires, non décisifs à eux seuls. Un examen approfondi des faits pourrait donc conduire à requalifier également cette seconde relation en contrat de travail à temps partiel, ce qui ferait de Mme Ngalula une salariée à deux employeurs distincts." },
      { num: 2, enonce: "En supposant que la seconde relation soit bien requalifiée en contrat de travail, la banque peut-elle s'opposer à ce cumul d'emplois ?", correction: "Le Code n'interdit pas par principe le cumul d'emplois auprès de deux employeurs distincts, dès lors qu'il n'existe pas de clause d'exclusivité dans le contrat conclu avec la banque et que l'activité du samedi n'entre pas en concurrence avec celle-ci. La banque pourrait en revanche s'y opposer si son propre contrat de travail contenait une clause de non-concurrence ou d'exclusivité, ce qui n'est pas indiqué dans les faits, ou si l'activité du samedi affectait la disponibilité ou les capacités de Mme Ngalula pendant sa semaine de travail bancaire." },
      { num: 3, enonce: "La gratification annuelle de 1 200 000 FC doit-elle être intégrée à l'assiette de sa rémunération versée par la banque au sens de l'article 7 ?", correction: "Oui, malgré la clause contractuelle qui la présente comme relevant de la « discrétion exclusive de la direction ». Une telle clause, aussi explicite soit-elle, ne peut neutraliser la réalité des faits : la régularité du versement sur six exercices consécutifs, sans interruption ni variation de montant, lui fait perdre son caractère aléatoire et discrétionnaire. Elle devient un élément prévisible de la rémunération au sens de l'article 7 point 8, qui inclut expressément les gratifications, quelle que soit la qualification que lui donne le contrat, en application du même raisonnement qu'à la section 1.4 sur la portée limitée des qualifications contractuelles." },
      { num: 4, enonce: "Quelle incidence pratique cette double qualification, gratification requalifiée et éventuel second contrat de travail, a-t-elle pour la banque et pour le centre de formation ?", correction: "Pour la banque : la gratification requalifiée entre dans l'assiette de calcul de tout élément assis sur le salaire, notamment les cotisations sociales et, le cas échéant, un futur décompte final étudié au chapitre 10. Pour le centre de formation, si sa relation avec Mme Ngalula est elle aussi requalifiée : il devient employeur à part entière, avec les obligations afférentes, affiliation CNSS, respect du principe de faveur, alors même qu'il pensait n'être lié que par un contrat de prestation de service. Les deux qualifications sont indépendantes l'une de l'autre : la première ne conditionne pas la seconde, mais toutes deux illustrent la même méthode, celle du faisceau d'indices l'emportant sur la lettre du contrat." },
    ],
  },
  {
    id: 'cp3',
    titre: "L'apprenti mécanicien de quinze ans",
    contexte: "Un garage de Matadi engage Jonas, quinze ans, pour l'assister dans des tâches de mécanique légère, sur simple accord verbal avec ses parents, sans autorisation du Tribunal de paix, sans examen psycho-médical et sans avis de l'inspecteur du travail. Jonas travaille cinq jours par semaine, six heures par jour, y compris certaines tâches de manutention de pièces lourdes, pour une rémunération journalière de 5 000 FC versée en espèces, sans reçu. Après quatre mois, un contrôle de l'inspection du travail révèle la situation. Le propriétaire du garage affirme de bonne foi qu'il pensait suffisant l'accord des parents, et qu'il n'a « fait qu'aider une famille dans le besoin ». Jonas, pour sa part, réclame le paiement de deux mois de salaire que le garagiste refuse de lui verser, invoquant précisément l'irrégularité de l'engagement pour se soustraire au paiement.",
    questions: [
      { num: 1, enonce: "L'accord verbal des parents, conjugué à la bonne foi invoquée par le garagiste, suffit-il à rendre cet engagement conforme à l'article 6 ?", correction: "Non, ni l'un ni l'autre. L'accord parental n'a aucune incidence sur la capacité légale du mineur : l'article 6 exige cumulativement une autorisation du Président du Tribunal de paix, un avis conforme d'un examen psycho-médical et un avis de l'inspecteur du travail, trois conditions institutionnelles qu'aucun accord familial, même de bonne foi, ne peut suppléer. La bonne foi du garagiste, si elle peut être prise en compte dans l'appréciation de sa responsabilité personnelle, ne rend pas l'engagement régulier : les conditions de l'article 6 sont de nature objective, indépendantes de l'intention de l'employeur." },
      { num: 2, enonce: "La manutention de pièces lourdes et la durée de six heures par jour seraient-elles admissibles même si les trois conditions de l'article 6 avaient été respectées ?", correction: "Non, sur les deux points. Entre seize et dix-huit ans, seuls des travaux légers déterminés par arrêté ministériel sont autorisés, à l'exclusion de tout travail dangereux ; à quinze ans, la dérogation est plus stricte encore. La manutention de pièces lourdes relève, par nature, d'un travail que le Code entend exclure pour un mineur, indépendamment du respect de la procédure d'autorisation. La durée quotidienne devrait, par ailleurs, être appréciée à l'aune des règles de durée du travail spécifiques aux mineurs, objet du chapitre 6, mais l'ampleur relevée ici, six heures par jour sur cinq jours pour un enfant de quinze ans, appelle déjà, à ce stade du raisonnement, la plus grande réserve." },
      { num: 3, enonce: "Le garagiste peut-il valablement refuser de payer les deux mois de salaire de Jonas en invoquant l'irrégularité de l'engagement dont il est lui-même l'auteur ?", correction: "Non, et c'est le point le plus important de ce cas. Un employeur ne peut pas se prévaloir de sa propre violation de l'article 6 pour se soustraire à ses obligations envers le travailleur qu'il a irrégulièrement engagé. La finalité protectrice du droit du travail, étudiée en 1.1, interdit qu'une règle destinée à protéger le mineur soit retournée contre lui pour le priver de la rémunération d'un travail effectivement fourni. Jonas a droit au paiement intégral du travail accompli, la nullité éventuelle de l'engagement ne produisant ses effets que pour l'avenir, non de manière rétroactive à son détriment." },
      { num: 4, enonce: "Quelle qualification juridique cet engagement appelle-t-il au regard de la finalité protectrice étudiée en 1.1, et quelles suites l'inspection du travail peut-elle y donner ?", correction: "Un engagement conclu en violation des conditions impératives de l'article 6 se heurte au caractère d'ordre public social des dispositions protectrices du Code : les parties ne pouvaient, par leur seul accord, y déroger. Ce n'est pas un cas isolé de non-conformité administrative, mais l'illustration de la tension, relevée en 1.6, entre l'existence de la règle et son application effective dans le secteur informel. L'inspection du travail peut faire cesser l'engagement irrégulier, orienter Jonas et sa famille vers les autorités compétentes en matière de protection de l'enfance, et, indépendamment de la cessation de la relation, exiger le paiement des sommes dues pour le travail déjà accompli." },
    ],
  },
  {
    id: 'cp4',
    titre: "L'agent de sécurité mis à disposition",
    contexte: "Une société de gardiennage emploie M. Kabongo depuis trois ans et l'affecte, dans le cadre d'un contrat commercial renouvelable, à la surveillance d'un site industriel appartenant à une entreprise cliente, où il travaille depuis dix-huit mois. Sur le site, M. Kabongo reçoit ses consignes quotidiennes directement du responsable de sécurité de l'entreprise cliente, qui contrôle également ses horaires de faction et lui a, à deux reprises, adressé un avertissement écrit pour manquement au règlement du site. Son salaire de base continue d'être versé par la société de gardiennage, qui reste seule signataire de son contrat de travail, mais l'entreprise cliente lui verse directement, chaque mois, une « prime de risque industriel » de 80 000 FC, sans en informer la société de gardiennage. Lorsque l'entreprise cliente met fin au contrat commercial pour réduire ses coûts, elle informe la société de gardiennage qu'elle ne souhaite plus la présence de M. Kabongo sur le site, sans autre justification. La société de gardiennage envisage alors de lui notifier une rupture de contrat, faute d'autre site disponible.",
    questions: [
      { num: 1, enonce: "Qui est l'employeur de M. Kabongo au sens de l'article 7 : la société de gardiennage ou l'entreprise cliente, compte tenu de l'ensemble des faits, y compris la prime de risque versée directement ?", correction: "La société de gardiennage demeure en principe l'employeur formel : elle a conclu le contrat de travail, verse le salaire de base et conserve, sur le papier, le pouvoir de recrutement et de licenciement. Le versement direct d'une prime par l'entreprise cliente, sans passer par la société de gardiennage, est cependant un fait nouveau et significatif : il traduit un pouvoir de rémunération exercé directement par le donneur d'ordre, qui s'ajoute au pouvoir de direction, de surveillance et, désormais, de sanction déjà exercés par le responsable de sécurité du site. Le faisceau d'indices commence ainsi à basculer vers un exercice de fait, par l'entreprise cliente, de plusieurs attributs normalement réservés à l'employeur." },
      { num: 2, enonce: "Les deux avertissements écrits adressés par le responsable de sécurité du site changent-ils l'analyse par rapport à un simple contrôle des horaires de faction ?", correction: "Oui, significativement. Un contrôle des horaires relève d'un encadrement opérationnel courant, compatible avec une mise à disposition licite. Un avertissement écrit est en revanche un acte disciplinaire formel, qui suppose normalement d'être pris par l'employeur ou par une personne agissant en son nom et sous son autorité. Que l'entreprise cliente exerce elle-même ce pouvoir disciplinaire, sans qu'il soit indiqué que la société de gardiennage en ait été informée ou y ait consenti, constitue un indice fort d'exercice de fait du pouvoir de sanction, l'un des cinq indices étudiés en 1.5, par une personne qui n'est pourtant pas signataire du contrat de travail." },
      { num: 3, enonce: "Face à la fin du contrat commercial, la société de gardiennage peut-elle rompre le contrat de travail de M. Kabongo au seul motif qu'elle n'a plus de site à lui confier ?", correction: "Rien, à ce stade du chapitre, ne permet de répondre que la société de gardiennage puisse rompre librement et sans condition le contrat : la rupture du contrat de travail, ses motifs valables et la procédure applicable, seront étudiés au chapitre 4. Ce qu'il est possible d'affirmer dès à présent, c'est que la fin du contrat commercial entre les deux sociétés n'entraîne pas automatiquement la fin du contrat de travail de M. Kabongo avec son employeur, ces deux contrats étant juridiquement distincts : l'un lie deux sociétés, l'autre lie M. Kabongo à son seul employeur. La société de gardiennage reste tenue de ses obligations envers lui tant qu'elle n'a pas rompu régulièrement ce second contrat, qu'elle lui trouve ou non une nouvelle affectation." },
      { num: 4, enonce: "En cas de litige, M. Kabongo aurait-il intérêt à demander la requalification de l'entreprise cliente en coemployeur, plutôt que de s'en tenir à la société de gardiennage seule ?", correction: "Cela dépend de sa stratégie et de la solvabilité respective des deux sociétés, mais l'intérêt est réel sur le plan juridique : si le faisceau d'indices, avertissements disciplinaires, prime versée directement, contrôle quotidien, permet de retenir un exercice de fait des attributs de l'employeur par l'entreprise cliente, celle-ci pourrait être tenue solidairement responsable des obligations sociales dues à M. Kabongo, aux côtés de la société de gardiennage. Cette hypothèse de coemploi, esquissée ici sur la base des indices étudiés en 1.5, sera reprise et approfondie au chapitre 8 à propos des relations collectives et de la sous-traitance de main-d'œuvre." },
    ],
  },
  {
    id: 'cp5',
    titre: "La femme de ménage de Mme Ilunga",
    contexte: "Mme Ilunga, particulière employeuse à Kinshasa, engage Mme Kabeya, qui travaille à son domicile quatre jours par semaine, six heures par jour, sans contrat écrit, sans déclaration à la CNSS et sans bulletin de paie, pour une rémunération mensuelle convenue oralement de 90 000 FC. Lorsque Mme Ilunga voyage, c'est sa fille majeure, qui réside dans le même foyer, qui donne les instructions quotidiennes à Mme Kabeya et lui remet parfois elle-même la rémunération du mois en espèces. Mme Ilunga a entendu parler d'une proposition de loi récente sur le statut des travailleurs domestiques et vous consulte, à la fois sur ses obligations actuelles et sur le fait de savoir si elle est bien la seule à devoir en répondre, compte tenu du rôle que joue sa fille.",
    questions: [
      { num: 1, enonce: "Cette relation de travail relève-t-elle aujourd'hui du Code du travail, malgré l'absence de tout écrit ?", correction: "Oui. Les travailleurs domestiques ne figurent pas parmi les catégories exclues par l'article 1er. Mme Kabeya est un travailleur au sens de l'article 7 dès lors qu'elle fournit une prestation sous subordination, moyennant rémunération, quand bien même aucun contrat écrit n'a été formalisé : l'existence du contrat de travail résulte de la réunion de ces éléments de fait, non d'un formalisme documentaire, ainsi qu'il a été vu en 1.4 à propos de la définition de l'article 7." },
      { num: 2, enonce: "Qui est l'employeur de Mme Kabeya au sens de l'article 7 : Mme Ilunga seule, ou également sa fille, qui donne des instructions et remet parfois la rémunération en son absence ?", correction: "En principe, Mme Ilunga demeure l'employeuse, puisque c'est elle qui a engagé Mme Kabeya et qui décide, en dernier ressort, des conditions de la relation. Le rôle de sa fille, ponctuel et lié à l'absence de sa mère, s'analyse plutôt comme une délégation domestique de fait, comparable à celle d'un responsable de site dans une entreprise, qui exécute une autorité qui reste, sur le principe, celle de l'employeur titulaire. Si toutefois la fille en venait à exercer ces attributs de façon permanente et autonome, au point de se substituer durablement à sa mère, la question d'une qualité d'employeur partagée ou transférée pourrait légitimement se poser, sur le modèle du raisonnement retenu pour la mise à disposition de personnel." },
      { num: 3, enonce: "L'absence de contrat écrit, de déclaration à la CNSS et de bulletin de paie rend-elle la relation de travail inexistante en droit, ou expose-t-elle simplement Mme Ilunga à des conséquences distinctes ?", correction: "Elle ne rend pas la relation inexistante : l'existence du contrat de travail ne dépend pas d'un écrit, ainsi qu'il vient d'être répondu à la première question. Ces absences constituent en revanche des manquements distincts aux obligations de l'employeur, chacun exposant Mme Ilunga à des conséquences propres : l'absence de déclaration CNSS l'expose à un risque de redressement et de régularisation rétroactive des cotisations, l'absence de bulletin de paie la prive de preuve écrite du montant réellement convenu en cas de litige sur la rémunération, ce qui pourrait, en pratique, jouer contre elle si Mme Kabeya alléguait un montant supérieur à celui reconnu oralement." },
      { num: 4, enonce: "Que répondre à Mme Ilunga sur la portée de la proposition de loi Kangila Kawele dont elle a entendu parler ?", correction: "Il convient de lui indiquer clairement que cette proposition, déposée le 15 mai 2026, n'est à ce jour qu'une initiative parlementaire sans force obligatoire, quel qu'en soit le contenu envisagé. Ses obligations actuelles sont celles du Code du travail commun, applicable dès aujourd'hui à la relation qu'elle a nouée avec Mme Kabeya, indépendamment du sort futur de ce texte en discussion : ni son adoption ni son rejet éventuels ne changent rétroactivement la qualification de la relation en cours, qui s'apprécie au regard du droit positif tel qu'il existe à la date des faits." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue1',
  numero: 1,
  id: 'ue1-chapitre-1',
  titre: 'Notions fondamentales et sources du droit du travail',
  sousTitre: 'Titre I du Code du travail · Loi n°015/2002, art. 1 à 7',
  infoBulle: 'Champ d\'application, sources et définitions légales du droit du travail congolais.',
  loiRef: 'Titre I, art. 1 à 7',
  moduleLabel: 'UE 1 · Droit du travail',
  retourRoute: '/ue1-droit-travail',
  coursId: 'ue1-droit-travail',
  objectifs: [
    'Situer le droit du travail congolais dans sa hiérarchie des normes et connaître ses sources',
    'Délimiter le champ d\'application du Code du travail et ses catégories exclues',
    'Maîtriser les définitions légales de l\'article 7, en particulier travailleur, employeur, contrat de travail et rémunération',
    'Distinguer le contrat de travail des conventions voisines par le critère du lien de subordination',
    'Connaître les règles de capacité de contracter et la protection des mineurs',
  ],
  sections: SECTIONS,
  aRetenir: [
    'Le Code du travail organise un socle impératif de protection ; le contrat ne peut y déroger que favorablement au travailleur.',
    'Son champ d\'application exclut magistrats, juges consulaires, agents de carrière et membres des FARDC/PNC ; les travailleurs domestiques n\'en sont, à ce jour, pas exclus.',
    'Le contrat de travail se distingue par le lien de subordination, apprécié à travers un faisceau d\'indices, non par la seule rémunération.',
    'La rémunération inclut salaire et primes, mais exclut soins de santé, logement, transport et allocations familiales légales.',
    'La capacité de contracter est fixée à dix-huit ans, avec une dérogation encadrée dès quinze ans et des travaux légers seuls admis entre seize et dix-huit ans.',
  ],
  references: [
    {
        genre: "ouvrage",
        auteur: "Luwenyema Lulue",
        titre: "Précis de droit du travail zaïrois",
        editeur: "éditions Lule",
        lieu: "Kinshasa",
        annee: "1989"
    },
    {
        genre: "ouvrage",
        auteur: "Loko Mantuono G.",
        titre: "Droit social, droit du travail et de la sécurité sociale en RDC",
        editeur: "L'Harmattan",
        lieu: "Paris",
        annee: "2022"
    },
    {
        genre: "article",
        auteur: "Kapuku H.",
        titre: "Le contrat de travail dans le contexte congolais : un contrat négocié ou un contrat d'adhésion ?",
        support: "Village Justice",
        precision: "janvier 2026"
    },
    {
        genre: "texte",
        intitule: "Kiyana M., « Le contrat de travail en République Démocratique du Congo », note professionnelle en ligne"
    },
    {
        genre: "texte",
        intitule: "Organisation internationale du Travail, conventions n°138 (1973) et n°182 (1999), ratifiées par la RDC en 2001"
    }
],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : Loi n°015/2002 du 16 octobre 2002 portant Code du travail, art. 1 à 7 · Loi n°16/010 du 15 juillet 2016',
}

export default chapitre
