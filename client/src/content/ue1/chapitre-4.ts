// Chapitre 4 du module UE1, Droit du travail : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
import type { Chapitre } from '@/lib/chapitre-types'

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '4.1',
    titre: 'Les modes de résiliation du contrat',
    navLabel: '4.1 Les modes de résiliation',
    blocs: [
      { type: 'paragraphe', texte: 'Le chapitre précédent a étudié la formation, l\'exécution et la suspension du contrat de travail. Ce chapitre en referme le cycle en étudiant sa rupture, sous ses différentes formes. L\'article 61 pose le principe premier : tout contrat de travail peut être résilié à l\'initiative soit de l\'employeur, soit du travailleur. La loi de 2016 a complété ce principe par l\'article 61 bis, qui admet expressément la résiliation d\'un commun accord des parties, distincte des deux voies unilatérales et obéissant à ses propres conditions de validité, notamment l\'absence de vice du consentement du travailleur, la partie structurellement la plus faible du rapport contractuel.' },
      { type: 'paragraphe', texte: 'L\'article 61 ter encadre la forme de cette résiliation, quelle qu\'en soit l\'initiative : elle doit être notifiée par écrit, et la lettre de notification, lorsque l\'initiative est celle de l\'employeur, doit en indiquer expressément le motif. À défaut d\'un tel écrit, le texte ne laisse pas la relation de travail dans l\'incertitude : tout acte d\'une partie tendant à empêcher l\'exécution de ses obligations par l\'autre constitue une modification unilatérale équipollente à un acte de rupture. La partie qui s\'en prévaut doit le faire savoir, dans les huit jours, à l\'autre partie, l\'Inspecteur du Travail étant informé.' },
      { type: 'filet', titre: 'L\'acte équipollent à rupture, un mécanisme protecteur', texte: 'Cette notion, empruntée à une tradition juridique plus large, protège la partie de bonne foi contre une rupture déguisée : l\'employeur qui, sans notification, retire au travailleur ses attributions essentielles, ou le travailleur qui cesse de fait toute prestation sans démission formelle, ne peuvent se réfugier derrière l\'absence d\'écrit pour échapper aux conséquences de la rupture qu\'ils ont, en réalité, provoquée.' },
    ],
  },
  {
    numero: '4.2',
    titre: 'Le licenciement pour motif lié à l\'aptitude ou à la conduite',
    navLabel: '4.2 Le licenciement pour motif valable',
    blocs: [
      { type: 'paragraphe', texte: 'L\'article 62, modifié par la loi de 2016, constitue le cœur du régime protecteur contre le licenciement arbitraire. Il pose que le contrat à durée indéterminée ne peut être résilié à l\'initiative de l\'employeur que pour un motif valable, qui se fonde soit sur des actes du travailleur perpétrés sur les lieux de travail ou trouvant leur origine dans l\'exercice de ses fonctions, soit sur les nécessités du fonctionnement de l\'entreprise, de l\'établissement ou du service. La convenance pure de l\'employeur, détachée de l\'un de ces deux fondements, n\'entre dans aucune de ces catégories.' },
      { type: 'paragraphe', texte: 'Le texte prend soin d\'énumérer, à l\'inverse, une liste de motifs qui ne constituent jamais un licenciement valable : l\'affiliation ou la non-affiliation syndicale, l\'exercice d\'un mandat de représentation des travailleurs, le fait d\'avoir déposé une plainte ou participé à une procédure contre l\'employeur, la race, le sexe, la situation matrimoniale, les responsabilités familiales, la grossesse, la religion, l\'opinion politique, l\'origine sociale ou ethnique, le statut sérologique au VIH avéré ou présumé, et l\'absence pendant le congé de maternité. Cette liste, de nature manifestement anti-discriminatoire, prolonge et concrétise les principes généraux du Titre I déjà étudiés au chapitre 1. Le licenciement fondé sur les nécessités de fonctionnement de l\'entreprise obéit en outre à des conditions fixées par arrêté ministériel, distinctes de la procédure de licenciement collectif étudiée à la section 4.6.' },
      { type: 'carte', titre: 'Le contradictoire préalable, une garantie procédurale', texte: 'Le dernier alinéa de l\'article 62 impose, avant toute décision de licenciement fondée sur l\'aptitude ou la conduite du travailleur, de permettre à l\'intéressé de se défendre contre les reproches formulés ou de s\'expliquer sur les motifs avancés. Cette exigence, distincte du motif de fond lui-même, ouvre un vice de procédure autonome : un motif par ailleurs valable, mais décidé sans que le travailleur ait pu s\'expliquer, expose la rupture à être jugée irrégulière.' },
      { type: 'paragraphe', texte: 'La sanction de la résiliation dépourvue de motif valable figure à l\'article 63 : le travailleur a d\'abord droit à une réintégration ; à défaut de celle-ci, des dommages-intérêts sont fixés par le Tribunal du travail, en tenant compte de la nature des services engagés, de l\'ancienneté du travailleur, de son âge et des droits acquis à quelque titre que ce soit, dans la limite d\'un plafond de trente-six mois de la dernière rémunération. À cette indemnisation de fond s\'ajoute, indépendamment, l\'indemnité de préavis non observé, prévue au dernier alinéa du même article et étudiée à la section suivante.' },
    ],
  },
  {
    numero: '4.3',
    titre: 'Le préavis',
    navLabel: '4.3 Le préavis',
    blocs: [
      { type: 'paragraphe', texte: 'L\'article 64 fixe la durée légale minimale du préavis donné par l\'employeur à quatorze jours ouvrables à compter du lendemain de la notification, majorée de sept jours ouvrables par année entière de services continus, comptée de date à date, sauf durée plus longue fixée par les parties ou une convention collective. Lorsque le préavis est donné par le travailleur, sa durée est réduite à la moitié de celle qu\'aurait dû observer l\'employeur s\'il avait pris l\'initiative de la résiliation, sans jamais pouvoir excéder cette limite, une dissymétrie qui traduit, une fois encore, la fonction protectrice du droit du travail envers la partie la plus vulnérable économiquement.' },
      { type: 'paragraphe', texte: 'Pendant la durée du préavis, l\'article 65 maintient l\'ensemble des obligations réciproques des parties, et accorde au travailleur un jour de liberté par semaine, pris à son choix globalement ou par demi-journées, payé à plein salaire, afin de lui permettre de rechercher un autre emploi. L\'article 68 protège par ailleurs le travailleur en congé ou dont le contrat est suspendu : le préavis ne peut lui être notifié pendant ces périodes, sauf les exceptions strictement délimitées de l\'article 60.' },
      { type: 'carte', titre: 'Deux régimes de départ anticipé à ne pas confondre', tableau: { entetes: ['Article', 'Hypothèse', 'Effet sur la rémunération'], lignes: [['**Art. 66**', 'Cessation à la moitié du préavis reçu de l\'employeur, sans condition particulière', 'Rémunération et allocations familiales dues pour le temps restant'], ['**Art. 67**', 'Départ pour un nouvel emploi trouvé, dans un délai maximal de sept jours à compter de ce nouvel engagement', 'Perte de la rémunération et des allocations pour le temps de préavis restant']] } },
      { type: 'paragraphe', texte: 'Ce dernier régime, moins favorable en apparence, se justifie par l\'idée que le travailleur ayant déjà retrouvé un emploi ne subit plus, à proprement parler, le préjudice économique que le préavis a précisément pour fonction de couvrir : la perte de rémunération pendant la recherche d\'un nouvel emploi. C\'est cette même logique compensatoire, retournée, qui explique le plafonnement à sept jours du délai de départ, afin d\'éviter qu\'un préavis nominal ne soit détourné en avantage indéfiniment reportable.' },
    ],
  },
  {
    numero: '4.4',
    titre: 'La rupture du contrat à durée déterminée et de la clause d\'essai',
    navLabel: '4.4 Rupture du CDD et de l\'essai',
    blocs: [
      { type: 'paragraphe', texte: 'Le contrat à durée déterminée obéit à une logique de rupture radicalement distincte de celle du contrat à durée indéterminée, cohérente avec son économie générale étudiée au chapitre 3 : l\'article 69 dispose qu\'il prend fin à l\'expiration du terme fixé par les parties, et frappe de nullité de plein droit toute clause qui prévoirait le droit d\'y mettre fin par un simple préavis, comme s\'il s\'agissait d\'un contrat à durée indéterminée déguisé. Toute rupture intervenue en violation de ce principe, avant le terme et hors les cas légalement admis, ouvre droit à des dommages-intérêts dont le calcul, à l\'article 70, diffère sensiblement de celui de l\'article 63 : lorsque la rupture irrégulière émane de l\'employeur, ces dommages-intérêts correspondent aux salaires et avantages de toute nature dont le travailleur aurait bénéficié pendant la période restant à courir jusqu\'au terme du contrat, sans référence au plafond de trente-six mois propre au contrat à durée indéterminée.' },
      { type: 'paragraphe', texte: 'L\'article 71 organise, quant à lui, le régime spécifique de la clause d\'essai, dont les plafonds ont été étudiés au chapitre précédent. Chacune des parties peut, pour un motif valable lié à l\'aptitude ou à la conduite de l\'autre, mettre fin au contrat en cours d\'essai, moyennant un préavis de trois jours ouvrables prenant cours le lendemain de la notification. Une exception subsiste toutefois pendant les trois premiers jours de l\'essai : le contrat peut alors être résilié sans préavis, la totalité de la rémunération restant due pour toute journée commencée.' },
    ],
  },
  {
    numero: '4.5',
    titre: 'La faute lourde',
    navLabel: '4.5 La faute lourde',
    blocs: [
      { type: 'paragraphe', texte: 'La faute lourde constitue la voie exceptionnelle permettant de rompre immédiatement tout contrat de travail, sans préavis, quel que soit son type. L\'article 72 la définit non par une liste fermée, mais par un critère général : une partie est réputée avoir commis une faute lourde lorsque les règles de la bonne foi ne permettent pas d\'exiger de l\'autre qu\'elle continue à exécuter le contrat. La partie qui entend s\'en prévaloir doit notifier par écrit sa décision dans les quinze jours ouvrables au plus tard après avoir eu connaissance des faits qu\'elle invoque : Muanda souligne, à propos de ce délai, qu\'il court à compter de la connaissance effective des faits par la partie lésée, et non de leur commission matérielle, ce qui protège l\'employeur ou le travailleur découvrant tardivement des agissements anciens, sous réserve toutefois que la connaissance elle-même ne soit pas artificiellement retardée par sa propre négligence.' },
      { type: 'filet', titre: 'La suspension pour besoin d\'enquête, une mesure conservatoire distincte', texte: 'Pour les besoins de son enquête, l\'employeur peut notifier au travailleur, dans les deux jours ouvrables après avoir eu connaissance des faits, la suspension de ses fonctions. Cette mesure ne peut excéder quinze jours, portés à trente jours si le siège social de l\'entreprise ne se trouve pas sur le lieu d\'exécution du contrat. L\'article 72 précise expressément qu\'elle ne se confond pas avec la suspension du contrat de l\'article 57, et que la période concernée est considérée comme temps de service, ce qui préserve l\'ancienneté du travailleur suspendu à titre conservatoire.' },
      { type: 'paragraphe', texte: 'Les articles 73 et 74 énumèrent, chacun de son côté, les fautes lourdes propres à l\'employeur et au travailleur, sans que ces listes soient exhaustives, le critère général de l\'article 72 restant le socle. Constitue une faute lourde de l\'employeur, notamment, l\'improbité, le harcèlement sexuel ou moral, l\'intimidation ou les injures graves imputables à lui-même ou à son préposé, un préjudice matériel intentionnellement causé, l\'exposition du travailleur à des dangers graves imprévisibles, des retenues indues sur la rémunération, ou la persistance à ne pas appliquer la législation du travail. Constitue, symétriquement, une faute lourde du travailleur l\'improbité, le harcèlement, les voies de fait ou injures graves envers l\'employeur ou son personnel, un préjudice matériel intentionnel, des faits immoraux pendant l\'exécution du contrat, ou une imprudence compromettant la sécurité de l\'entreprise.' },
      { type: 'paragraphe', texte: 'Les conséquences indemnitaires, à l\'article 75, sont dissymétriques et reflètent la fonction distincte de chaque hypothèse : si la rupture procède d\'une faute lourde de l\'employeur, celui-ci est condamné à verser au travailleur des dommages-intérêts selon le mode d\'appréciation de l\'article 63 ; si elle procède d\'une faute lourde du travailleur, c\'est l\'employeur qui peut réclamer au travailleur la réparation du préjudice directement causé par cette faute. Toute résiliation, quelle qu\'en soit la cause, doit être notifiée par écrit et, à l\'initiative de l\'employeur, indiquer expressément le motif, rappel de l\'article 76 qui referme le régime commun de la notification déjà posé à l\'article 61 ter. Enfin, l\'article 77 protège le travailleur d\'une pratique répandue : la quittance pour solde de tout compte délivrée au moment où le contrat prend fin n\'implique aucune renonciation à ses droits, quelle que soit sa formulation.' },
    ],
  },
  {
    numero: '4.6',
    titre: 'Licenciement collectif, certificat de fin de service, substitution d\'employeur et sous-entreprise',
    navLabel: '4.6 Licenciement collectif et fin de contrat',
    blocs: [
      { type: 'paragraphe', texte: 'Les licenciements massifs sont interdits, sauf dérogations déterminées par arrêté ministériel. L\'article 78 organise, pour l\'employeur qui envisage de licencier un ou plusieurs travailleurs pour des raisons économiques telles que la diminution de l\'activité ou une réorganisation intérieure, une procédure exigeante : information écrite des représentants des travailleurs au moins quinze jours à l\'avance pour recueillir leurs suggestions, respect d\'un ordre de licenciement fondé sur la qualification professionnelle, l\'ancienneté et les charges de famille (l\'ancienneté étant majorée d\'un an pour le travailleur marié et d\'un an par enfant à charge), et priorité de réembauche pendant deux ans dans la même catégorie d\'emploi. L\'Inspecteur du Travail s\'assure du respect de cette procédure et des critères retenus ; en cas de manquement, il le notifie par écrit à l\'employeur, qui doit répondre avant de poursuivre. Tout licenciement économique intervenu en violation de ces dispositions est considéré comme abusif.' },
      { type: 'paragraphe', texte: 'Lorsque le contrat prend fin, pour quelque cause que ce soit, l\'article 79 impose à l\'employeur de délivrer au travailleur, au plus tard deux jours ouvrables après la fin du contrat, un certificat attestant uniquement la nature et la durée des services prestés, la date de début et de fin des prestations, et le numéro d\'immatriculation à l\'Institut National de Sécurité Sociale, sans aucune autre indication, notamment appréciative, pouvant y être ajoutée. Ce certificat est exempt de droit de timbre ou d\'enregistrement.' },
      { type: 'carte', titre: 'Substitution d\'employeur : une continuité protectrice', texte: 'En cas de substitution d\'employeur, notamment par cession, succession, fusion, transformation de fonds ou mise en société, l\'article 80 fait subsister tous les contrats de travail en cours au jour de la substitution, entre le nouvel employeur et le personnel. La cessation de l\'activité de l\'entreprise ne dispense pas, sauf force majeure, de respecter les règles de résiliation, et le texte précise expressément que la faillite et la liquidation judiciaire ne sont pas considérées comme des cas de force majeure. Est par ailleurs nulle, sauf désignation précise de l\'employeur ou des employeurs concernés, toute clause obligeant le travailleur à passer en cours de contrat au service d\'un autre employeur (article 81).' },
      { type: 'paragraphe', texte: 'Le dernier chapitre du Titre IV organise enfin le régime de la sous-entreprise. Le sous-entrepreneur, personne physique ou morale qui contracte avec un entrepreneur pour l\'exécution d\'un travail moyennant un prix forfaitaire et engage lui-même la main-d\'œuvre nécessaire, expose l\'entrepreneur principal à une responsabilité de paiement des salaires en cas de son insolvabilité, lorsque les travaux sont exécutés hors des ateliers, magasins ou chantiers de l\'entrepreneur : le travailleur lésé dispose alors d\'une action directe contre celui-ci (articles 82 et 83). Le sous-entrepreneur doit indiquer sa qualité ainsi que le nom et l\'adresse de l\'entrepreneur par voie d\'affiche permanente, et ce dernier doit tenir à jour la liste de ses sous-entrepreneurs (article 84), une exigence de transparence qui protège tant les travailleurs que les autorités de contrôle.' },
    ],
  },
]

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1', question: "Selon les articles 61 et 61 bis, comment un contrat de travail peut-il prendre fin ?",
    options: [
      { id: 'a', texte: "Uniquement à l'initiative de l'employeur, le travailleur ne pouvant que démissionner sans cadre légal propre" },
      { id: 'b', texte: "À l'initiative de l'employeur, à l'initiative du travailleur, ou d'un commun accord des parties" },
      { id: 'c', texte: "Uniquement d'un commun accord, la résiliation unilatérale étant réservée aux contrats à durée déterminée" },
      { id: 'd', texte: "Uniquement par voie judiciaire, sur requête de la partie la plus diligente" },
      { id: 'e', texte: "Par l'employeur seul, sauf autorisation préalable de l'Inspecteur du Travail" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 61 et 61 bis',
    explication: "L'article 61 pose le principe de la résiliation unilatérale, à l'initiative de l'employeur ou du travailleur ; l'article 61 bis, introduit en 2016, y ajoute expressément la résiliation d'un commun accord des parties, sans que l'une de ces trois voies exclue les deux autres.",
  },
  {
    id: 'q2', question: "Un employeur, sans notifier aucune rupture écrite, prend une mesure qui empêche le travailleur d'exécuter ses obligations. Quelle qualification l'article 61 ter donne-t-il à cet acte ?",
    options: [
      { id: 'a', texte: "Une simple sanction disciplinaire, sans effet sur l'existence du contrat" },
      { id: 'b', texte: "Un acte équipollent à rupture, c'est-à-dire une modification unilatérale assimilée à une rupture" },
      { id: 'c', texte: "Un acte sans conséquence tant qu'aucun écrit n'est produit par l'une des parties" },
      { id: 'd', texte: "Une suspension du contrat au sens de l'article 57" },
      { id: 'e', texte: "Une faute lourde de plein droit, sans qu'il soit besoin de la notifier" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 61 ter',
    explication: "L'article 61 ter assimile à un acte de rupture toute mesure d'une partie tendant à empêcher l'exécution de ses obligations par l'autre, à défaut de notification écrite : c'est un acte équipollent à rupture, non une simple sanction ni une suspension, et la partie qui s'en prévaut doit le faire savoir dans les huit jours à l'autre partie, l'Inspecteur du Travail informé.",
  },
  {
    id: 'q3', question: "Sur quoi doit se fonder la résiliation d'un contrat à durée indéterminée à l'initiative de l'employeur ?",
    options: [
      { id: 'a', texte: "La seule convenance de l'employeur, dès lors que le préavis légal est respecté" },
      { id: 'b', texte: "Un motif valable lié à l'aptitude ou à la conduite du travailleur, ou aux nécessités de fonctionnement de l'entreprise" },
      { id: 'c', texte: "Exclusivement une faute du travailleur constatée par l'Inspecteur du Travail" },
      { id: 'd', texte: "L'accord préalable du syndicat, quel que soit le motif invoqué" },
      { id: 'e', texte: "Aucun motif n'est légalement exigé, seule la notification écrite comptant" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 62',
    explication: "L'article 62 exige un motif valable, qui se fonde soit sur des actes du travailleur liés à l'exercice de ses fonctions, soit sur les nécessités de fonctionnement de l'entreprise, de l'établissement ou du service. La seule convenance de l'employeur, non rattachée à l'un de ces fondements, n'est pas un motif valable au sens du texte.",
  },
  {
    id: 'q4', question: "Parmi les situations suivantes, laquelle l'article 62 exclut-il expressément de la liste des motifs valables de licenciement ?",
    options: [
      { id: 'a', texte: "Un acte d'improbité commis par le travailleur sur les lieux de travail" },
      { id: 'b', texte: "Le fait d'avoir déposé une plainte contre l'employeur pour violation de la législation du travail" },
      { id: 'c', texte: "Une insuffisance professionnelle dûment constatée et documentée" },
      { id: 'd', texte: "Une réorganisation intérieure liée aux nécessités de fonctionnement de l'entreprise" },
      { id: 'e', texte: "Un acte perpétré en dehors du lieu de travail mais trouvant son origine dans l'exercice des fonctions" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 62, al. 4',
    explication: "L'article 62 énumère limitativement des motifs qui ne constituent jamais un licenciement valable, dont le fait d'avoir déposé une plainte ou participé à une procédure contre l'employeur pour violation alléguée de la législation du travail. Les autres propositions correspondent à des fondements ou à des exemples que le texte admet ou n'exclut pas.",
  },
  {
    id: 'q5', question: "Avant de licencier un travailleur pour un motif lié à sa conduite, quelle obligation procédurale l'article 62 impose-t-il à l'employeur ?",
    options: [
      { id: 'a', texte: "Aucune, la notification écrite du motif suffisant à elle seule" },
      { id: 'b', texte: "Saisir préalablement le Tribunal du travail pour autorisation" },
      { id: 'c', texte: "Permettre à l'intéressé de se défendre contre les reproches ou de s'expliquer sur les motifs avancés, avant toute décision" },
      { id: 'd', texte: "Obtenir l'accord écrit de la délégation syndicale, quel que soit l'effectif de l'entreprise" },
      { id: 'e', texte: "Attendre un délai de trente jours après la notification du grief" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 62, dernier al.',
    explication: "Le dernier alinéa de l'article 62 impose, avant toute décision, de permettre au travailleur de se défendre contre les reproches formulés ou de s'expliquer sur les motifs avancés : un principe du contradictoire, distinct de toute autorisation judiciaire ou syndicale préalable, qui ne sont pas exigées par ce texte.",
  },
  {
    id: 'q6', question: "Quelle est la conséquence principale d'une résiliation sans motif valable d'un contrat à durée indéterminée ?",
    options: [
      { id: 'a', texte: "Le contrat reste rompu, seule une amende étant due au travailleur" },
      { id: 'b', texte: "Le droit à réintégration pour le travailleur, et à défaut, des dommages-intérêts fixés par le Tribunal du travail" },
      { id: 'c', texte: "La nullité rétroactive de tout contrat conclu ultérieurement par l'employeur avec un tiers pour le même poste" },
      { id: 'd', texte: "Une peine d'emprisonnement systématique pour l'employeur" },
      { id: 'e', texte: "Le seul versement d'une indemnité de préavis, sans autre conséquence" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 63',
    explication: "L'article 63 ouvre d'abord un droit à réintégration ; à défaut de celle-ci, des dommages-intérêts sont fixés par le Tribunal du travail en tenant compte de la nature des services, de l'ancienneté, de l'âge et des droits acquis. Ce n'est ni une simple amende, ni une sanction pénale automatique, ni limité à l'indemnité de préavis.",
  },
  {
    id: 'q7', question: "Quel est le plafond légal des dommages-intérêts dus en cas de résiliation sans motif valable d'un contrat à durée indéterminée ?",
    options: [
      { id: 'a', texte: "Douze mois de la dernière rémunération" },
      { id: 'b', texte: "Vingt-quatre mois de la dernière rémunération" },
      { id: 'c', texte: "Trente-six mois de la dernière rémunération" },
      { id: 'd', texte: "Un mois par année d'ancienneté, sans plafond global" },
      { id: 'e', texte: "Aucun plafond n'est fixé par le Code, le juge appréciant librement" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 63, al. 1',
    explication: "L'article 63 plafonne expressément ces dommages-intérêts à trente-six mois de la dernière rémunération du travailleur, ce plafond s'appliquant quels que soient la nature des services, l'ancienneté ou l'âge pris en compte pour la fixation du montant.",
  },
  {
    id: 'q8', question: "Une rupture de contrat intervient sans que le préavis ait été intégralement observé. Quelle en est la conséquence pécuniaire ?",
    options: [
      { id: 'a', texte: "Aucune, le préavis n'étant qu'une simple recommandation" },
      { id: 'b', texte: "La partie responsable doit une indemnité égale à la rémunération et aux avantages dus pendant le délai de préavis non respecté" },
      { id: 'c', texte: "Une pénalité forfaitaire fixe, égale à un mois de salaire, quelle que soit la durée du préavis restant" },
      { id: 'd', texte: "L'indemnité n'est due que si la rupture émane de l'employeur, jamais du travailleur" },
      { id: 'e', texte: "L'indemnité se substitue systématiquement aux dommages-intérêts de l'article 63" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 63, al. 2',
    explication: "L'article 63, dernier alinéa, impose à la partie responsable de l'inobservation du préavis, employeur ou travailleur indifféremment, de verser une indemnité correspondant à la rémunération et aux avantages dont l'autre partie aurait bénéficié durant le délai de préavis non respecté, sans forfait fixe ni substitution automatique aux autres dommages-intérêts.",
  },
  {
    id: 'q9', question: "Quelle est la durée légale minimale du préavis donné par l'employeur, avant toute majoration liée à l'ancienneté ?",
    options: [
      { id: 'a', texte: "Sept jours ouvrables" },
      { id: 'b', texte: "Quatorze jours ouvrables" },
      { id: 'c', texte: "Un mois calendaire" },
      { id: 'd', texte: "Quinze jours ouvrables" },
      { id: 'e', texte: "Vingt et un jours ouvrables" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 64',
    explication: "L'article 64 fixe le plancher à quatorze jours ouvrables à dater du lendemain de la notification, lorsque le préavis est donné par l'employeur, ce délai étant ensuite augmenté de sept jours ouvrables par année entière de services continus.",
  },
  {
    id: 'q10', question: "Un travailleur ayant six ans d'ancienneté continue démissionne. Quelle est la durée du préavis qu'il doit respecter, toutes choses égales par ailleurs ?",
    options: [
      { id: 'a', texte: "La même durée que celle que l'employeur aurait dû observer" },
      { id: 'b', texte: "La moitié de la durée que l'employeur aurait dû observer s'il avait pris l'initiative de la résiliation" },
      { id: 'c', texte: "Un préavis fixe de quatorze jours, quelle que soit l'ancienneté" },
      { id: 'd', texte: "Aucun préavis n'est dû par le travailleur qui démissionne" },
      { id: 'e', texte: "Le double de la durée applicable à l'employeur, pour compenser la perte de flexibilité de ce dernier" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 64, al. 2',
    explication: "L'article 64 dispose que la durée du préavis à donner par le travailleur est égale à la moitié de celui qu'aurait dû observer l'employeur, sans jamais pouvoir excéder cette limite. Ni l'égalité, ni l'absence de préavis, ni le doublement ne correspondent au texte.",
  },
  {
    id: 'q11', question: "Un travailleur en préavis reçoit un nouvel engagement au vingtième jour d'un préavis de quarante-neuf jours dû par l'employeur. Que prévoit l'article 67 quant à son départ anticipé ?",
    options: [
      { id: 'a', texte: "Il peut partir immédiatement, sans délai, en conservant la rémunération du préavis restant" },
      { id: 'b', texte: "Il peut partir dans un délai fixé de commun accord, sans excéder sept jours, mais perd la rémunération de la période de préavis restant à courir" },
      { id: 'c', texte: "Il ne peut partir avant l'expiration complète du préavis initial, quelle que soit l'opportunité du nouvel emploi" },
      { id: 'd', texte: "Il peut partir à la moitié du préavis initial, comme dans l'hypothèse générale de l'article 66, en conservant sa rémunération" },
      { id: 'e', texte: "Le nouvel employeur doit indemniser l'ancien employeur pour le préavis non exécuté" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 67',
    explication: "L'article 67 permet au travailleur ayant trouvé un nouvel emploi de partir dans un délai fixé de commun accord, sans excéder sept jours à dater de ce nouvel engagement, mais il perd alors le droit à la rémunération et aux allocations familiales de la période de préavis restant à courir. Ce régime doit être distingué de l'hypothèse générale de l'article 66, où le travailleur peut cesser le travail à la moitié du préavis reçu de l'employeur tout en conservant sa rémunération pour le temps restant.",
  },
  {
    id: 'q12', question: "Le préavis de résiliation peut-il être notifié pendant la période de congé du travailleur ?",
    options: [
      { id: 'a', texte: "Oui, sans restriction, le congé étant sans incidence sur le régime du préavis" },
      { id: 'b', texte: "Non, sauf les cas prévus à l'article 60 relatifs à la suspension du contrat" },
      { id: 'c', texte: "Oui, mais uniquement si le congé est inférieur à sept jours" },
      { id: 'd', texte: "Non, jamais, même dans les hypothèses de l'article 60" },
      { id: 'e', texte: "Cette question relève exclusivement de la convention collective, le Code restant muet" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 68',
    explication: "L'article 68 interdit la notification du préavis pendant la période de congé et pendant la suspension du contrat, sauf les cas prévus à l'article 60, qui organisent précisément les hypothèses où une résiliation reste possible malgré une suspension en cours.",
  },
  {
    id: 'q13', question: "Une clause insérée dans un contrat à durée déterminée prévoit le droit d'y mettre fin par un simple préavis. Quel est le sort de cette clause selon l'article 69 ?",
    options: [
      { id: 'a', texte: "Elle est valable, le contrat devenant alors à durée indéterminée de fait" },
      { id: 'b', texte: "Elle est nulle de plein droit, le contrat à durée déterminée prenant fin au terme fixé" },
      { id: 'c', texte: "Elle est valable uniquement si les deux parties l'ont expressément approuvée par écrit séparé" },
      { id: 'd', texte: "Elle est simplement inopposable au travailleur, mais reste opposable à l'employeur" },
      { id: 'e', texte: "Elle transforme le contrat en contrat à l'essai, régi par l'article 71" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 69',
    explication: "L'article 69 est catégorique : le contrat à durée déterminée prend fin à l'expiration du terme fixé par les parties, et la clause prévoyant le droit d'y mettre fin par préavis est nulle de plein droit, quelle que soit la forme de son approbation par les parties.",
  },
  {
    id: 'q14', question: "Un employeur rompt un contrat à durée déterminée avant son terme, en dehors de tout cas prévu par le Code. Comment se calculent les dommages-intérêts dus au travailleur ?",
    options: [
      { id: 'a', texte: "Ils sont plafonnés à trente-six mois, comme pour un contrat à durée indéterminée" },
      { id: 'b', texte: "Ils correspondent aux salaires et avantages dont le travailleur aurait bénéficié pendant la période restant à courir jusqu'au terme du contrat" },
      { id: 'c', texte: "Ils sont fixés forfaitairement à un mois de salaire, quelle que soit la durée restante" },
      { id: 'd', texte: "Aucun dommage-intérêt n'est dû, seule une réintégration étant possible" },
      { id: 'e', texte: "Ils sont calculés selon le barème applicable au préavis de l'article 64" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 70',
    explication: "L'article 70 fait dépendre le montant des dommages-intérêts, en cas de rupture irrégulière imputable à l'employeur, de la période restant à courir jusqu'au terme du contrat, et non d'un plafond de trente-six mois propre au contrat à durée indéterminée, ni d'un forfait, ni du barème de préavis de l'article 64.",
  },
  {
    id: 'q15', question: "Pendant la clause d'essai, hors les trois premiers jours, quel préavis chaque partie doit-elle respecter pour mettre fin au contrat ?",
    options: [
      { id: 'a', texte: "Aucun préavis n'est requis, l'essai pouvant cesser à tout moment sans délai" },
      { id: 'b', texte: "Un préavis de trois jours ouvrables, pour un motif valable lié à l'aptitude ou à la conduite de l'autre partie" },
      { id: 'c', texte: "Le préavis de droit commun de l'article 64, réduit de moitié" },
      { id: 'd', texte: "Un préavis de quinze jours ouvrables, identique pour les deux parties" },
      { id: 'e', texte: "Un préavis dont la durée est laissée à la libre appréciation du juge" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 71',
    explication: "L'article 71 impose, hors les trois premiers jours d'essai où la résiliation reste possible sans préavis, un préavis de trois jours ouvrables prenant cours le lendemain de la notification, pour un motif valable lié à l'aptitude ou à la conduite de l'autre partie. Ce régime spécifique ne se confond ni avec l'absence totale de préavis, ni avec le régime de droit commun de l'article 64.",
  },
  {
    id: 'q16', question: "À partir de quel moment court le délai de quinze jours ouvrables pour notifier une résiliation pour faute lourde ?",
    options: [
      { id: 'a', texte: "À partir du jour où les faits reprochés ont été commis, quelle que soit la date à laquelle ils ont été connus" },
      { id: 'b', texte: "À partir du jour où la partie qui invoque la faute lourde en a eu connaissance" },
      { id: 'c', texte: "À partir de la fin de l'enquête interne, sans limite de durée pour celle-ci" },
      { id: 'd', texte: "À partir de la notification de la suspension conservatoire, si elle a été prononcée" },
      { id: 'e', texte: "Ce délai ne court qu'à compter de la saisine de l'Inspecteur du Travail" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 72, al. 3',
    explication: "L'article 72 fait courir le délai de quinze jours ouvrables à compter du jour où la partie qui se propose de résilier a eu connaissance des faits qu'elle invoque, et non à compter de la commission des faits eux-mêmes, qui peut lui être antérieure et inconnue, ni à compter de la fin d'une enquête sans borne, ni d'une suspension conservatoire ou d'une saisine administrative.",
  },
  {
    id: 'q17', question: "La suspension des fonctions du travailleur pour besoin d'enquête, prévue à l'article 72, se confond-elle avec la suspension du contrat de l'article 57 ?",
    options: [
      { id: 'a', texte: "Oui, ce sont deux dénominations d'une même mesure" },
      { id: 'b', texte: "Non, l'article 72 la qualifie expressément de mesure conservatoire distincte, et la période concernée est considérée comme temps de service" },
      { id: 'c', texte: "Non, mais elle prive le travailleur de toute ancienneté pendant sa durée" },
      { id: 'd', texte: "Oui, et elle en emprunte notamment le régime d'indemnisation de l'article 60" },
      { id: 'e', texte: "Non, elle équivaut juridiquement à une mise à pied disciplinaire de l'article 57" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 72, al. 5-6',
    explication: "L'article 72 précise expressément que la suspension des fonctions pour besoin d'enquête est une mesure conservatoire qui ne peut être confondue avec la suspension du contrat de travail prévue à l'article 57, et que la période concernée est considérée comme temps de service, ce qui exclut toute perte d'ancienneté ou assimilation à une mise à pied disciplinaire.",
  },
  {
    id: 'q18', question: "Lequel des faits suivants relève de la faute lourde de l'employeur au sens de l'article 73, et non de celle du travailleur au sens de l'article 74 ?",
    options: [
      { id: 'a', texte: "Un préposé de l'employeur se rend coupable de harcèlement moral envers le travailleur" },
      { id: 'b', texte: "Le travailleur compromet par imprudence la sécurité de l'établissement" },
      { id: 'c', texte: "Le travailleur cause intentionnellement un préjudice matériel à l'employeur" },
      { id: 'd', texte: "Le travailleur se rend coupable de faits immoraux pendant l'exécution du contrat" },
      { id: 'e', texte: "Le travailleur commet des voies de fait envers un collègue" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 73, a)',
    explication: "L'article 73 range le harcèlement moral ou sexuel, l'improbité, l'intimidation ou les injures graves imputables à l'employeur ou à son préposé parmi les fautes lourdes de l'employeur. Les quatre autres propositions correspondent à des fautes lourdes du travailleur, énumérées à l'article 74.",
  },
  {
    id: 'q19', question: "Le contrat est rompu à la suite d'une faute lourde du travailleur, au sens de l'article 74. Quelle conséquence l'article 75 en tire-t-il pour l'employeur ?",
    options: [
      { id: 'a', texte: "L'employeur doit verser au travailleur des dommages-intérêts calculés selon l'article 63, comme en cas de rupture abusive" },
      { id: 'b', texte: "L'employeur peut réclamer au travailleur la réparation du préjudice directement causé par cette faute lourde" },
      { id: 'c', texte: "Aucune conséquence pécuniaire n'est prévue, la seule rupture du contrat suffisant à sanctionner le travailleur" },
      { id: 'd', texte: "L'employeur doit obligatoirement saisir le Tribunal du travail avant toute rupture, sous peine de nullité" },
      { id: 'e', texte: "L'employeur perd le droit de se prévaloir de la faute s'il ne réclame pas réparation dans les huit jours" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 75, al. 2',
    explication: "L'article 75 distingue nettement les deux hypothèses : lorsque la rupture procède d'une faute lourde de l'employeur (article 73), celui-ci doit verser au travailleur des dommages-intérêts selon le mode de l'article 63 ; lorsqu'elle procède d'une faute lourde du travailleur (article 74), c'est l'employeur qui peut réclamer au travailleur la réparation du préjudice directement causé par cette faute, et non l'inverse.",
  },
  {
    id: 'q20', question: "Le travailleur signe, au moment où son contrat prend fin, une quittance pour solde de tout compte. Quel effet l'article 77 attache-t-il à cette signature ?",
    options: [
      { id: 'a', texte: "Elle emporte renonciation définitive à toute réclamation ultérieure liée au contrat" },
      { id: 'b', texte: "Elle n'implique aucune renonciation du travailleur à ses droits" },
      { id: 'c', texte: "Elle vaut reconnaissance, par le travailleur, du caractère régulier de la rupture" },
      { id: 'd', texte: "Elle ne produit effet que si elle est contresignée par l'Inspecteur du Travail" },
      { id: 'e', texte: "Elle interrompt le délai de prescription applicable aux actions nées du contrat" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 77',
    explication: "L'article 77 est sans ambiguïté : la quittance pour solde de tout compte délivrée au travailleur au moment où le contrat prend fin n'implique aucune renonciation à ses droits, quelle que soit sa formulation, et sans qu'un contreseing administratif ou un effet sur la prescription soit prévu par le texte.",
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: "Le licenciement de M. Tshimanga pour incompatibilité d'humeur",
    contexte: "M. Tshimanga, comptable dans une entreprise de Kinshasa depuis huit ans, reçoit une lettre de licenciement invoquant une « incompatibilité d'humeur persistante avec le nouveau chef comptable ». Aucun entretien préalable ne lui a été proposé pour s'expliquer. La lettre notifie une rupture avec effet immédiat, sans préavis ni indemnité, l'employeur estimant que la relation de confiance était rompue.",
    questions: [
      { num: 1, enonce: "Le motif invoqué, une incompatibilité d'humeur, constitue-t-il un motif valable au sens de l'article 62 ?", correction: "Non, en l'état des faits présentés. L'article 62 exige un motif valable, fondé soit sur des actes du travailleur liés à l'exercice de ses fonctions, soit sur les nécessités de fonctionnement de l'entreprise. Une simple incompatibilité d'humeur, sans acte précis reproché à M. Tshimanga ni lien avec une réorganisation réelle de l'entreprise, ne se rattache à aucun de ces deux fondements : c'est un motif de pure convenance, insuffisant au regard du texte." },
      { num: 2, enonce: "L'absence d'entretien préalable constitue-t-elle un vice distinct de l'absence de motif valable ?", correction: "Oui. Le dernier alinéa de l'article 62 impose, avant toute décision de licenciement fondée sur la conduite du travailleur, de lui permettre de se défendre contre les reproches formulés ou de s'expliquer sur les motifs avancés. Ce vice de procédure existe indépendamment du vice de fond déjà identifié : même à supposer, par hypothèse, qu'un motif valable ait existé, l'absence de tout entretien préalable aurait suffi à irrégulariser la rupture." },
      { num: 3, enonce: "Compte tenu de ce double vice, quelle sanction M. Tshimanga peut-il obtenir, et selon quelles modalités ?", correction: "L'article 63 ouvre d'abord un droit à réintégration. À défaut de réintégration, effectivement possible ou simplement non souhaitée par l'une des parties, des dommages-intérêts sont fixés par le Tribunal du travail, en tenant compte notamment de la nature des services engagés, de l'ancienneté de huit ans de M. Tshimanga, de son âge et des droits acquis, dans la limite du plafond légal de trente-six mois de sa dernière rémunération." },
      { num: 4, enonce: "L'employeur ayant également omis tout préavis, cette omission ouvre-t-elle un droit distinct, cumulable avec les dommages-intérêts de l'article 63 ?", correction: "Oui. L'article 63, dernier alinéa, prévoit que la rupture d'un contrat à durée indéterminée sans préavis, ou sans que le préavis ait été intégralement observé, comporte l'obligation, pour la partie responsable, de verser à l'autre une indemnité correspondant à la rémunération et aux avantages dont elle aurait bénéficié durant le délai de préavis non respecté. Cette indemnité de préavis s'ajoute aux dommages-intérêts pour absence de motif valable : ce sont deux préjudices distincts, l'un tenant à l'irrégularité de fond de la rupture, l'autre à l'inobservation du délai de préavis dû à raison de l'ancienneté de huit ans de M. Tshimanga." },
    ],
  },
  {
    id: 'cp2',
    titre: "Le départ de Mme Kalombo au vingtième jour d'un préavis de quarante-neuf jours",
    contexte: "Mme Kalombo, employée depuis cinq années entières et continues dans une entreprise de Lubumbashi, reçoit de son employeur un préavis de résiliation. Compte tenu de son ancienneté, la durée légale de ce préavis s'élève à quatorze jours, augmentés de sept jours par année entière de service, soit trente-cinq jours supplémentaires, pour un total de quarante-neuf jours ouvrables. Au vingtième jour de ce préavis, Mme Kalombo décroche un nouvel emploi, disponible immédiatement, et souhaite quitter son poste actuel au plus vite.",
    questions: [
      { num: 1, enonce: "Le calcul de quarante-neuf jours de préavis, tel qu'énoncé, est-il conforme à l'article 64 ?", correction: "Oui. L'article 64 fixe le plancher à quatorze jours ouvrables, augmenté de sept jours ouvrables par année entière de services continus, comptée de date à date. Avec cinq années entières, l'augmentation est de trente-cinq jours (5 × 7), portant le total à quarante-neuf jours ouvrables, exactement le chiffre retenu dans l'énoncé." },
      { num: 2, enonce: "Sans avoir trouvé de nouvel emploi, Mme Kalombo aurait-elle pu cesser le travail à la moitié de ce préavis, tout en conservant sa rémunération pour la période restante ?", correction: "Oui, en application de l'article 66. Le travailleur qui reçoit le préavis peut cesser le travail à l'expiration de la moitié du délai que l'employeur est tenu de lui donner, soit ici environ vingt-quatre à vingt-cinq jours ; l'employeur doit alors la rémunération et les allocations familiales pour le temps restant à courir, calculées le cas échéant sur la moyenne des commissions, primes et gratifications des douze derniers mois." },
      { num: 3, enonce: "Mme Kalombo ayant trouvé un nouvel emploi disponible immédiatement, quel régime s'applique concrètement à son départ, et quelle en est la conséquence pécuniaire ?", correction: "C'est l'article 67, et non l'article 66, qui s'applique dès lors qu'un nouvel engagement est en cause : Mme Kalombo peut quitter son employeur actuel dans un délai fixé de commun accord, sans que ce délai puisse excéder sept jours à compter du jour où elle a trouvé ce nouvel emploi. Contrairement à l'hypothèse de l'article 66, elle perd alors le droit à la rémunération et aux allocations familiales de la période de préavis restant à courir au-delà de ce départ anticipé." },
      { num: 4, enonce: "Mme Kalombo peut-elle invoquer l'article 66, plus favorable puisqu'il conserve la rémunération, plutôt que l'article 67, dès lors qu'elle a dépassé la moitié du préavis initial au moment de son départ ?", correction: "Non. Les deux régimes ne sont pas alternatifs au choix du travailleur : l'article 67 s'applique spécifiquement à l'hypothèse où le départ est justifié par un nouvel engagement trouvé par le travailleur, indépendamment du point du préavis atteint, tandis que l'article 66 vise l'hypothèse générale d'un départ à la moitié du préavis, sans référence à un nouvel emploi. Dès lors que Mme Kalombo fonde son départ anticipé sur le nouvel emploi trouvé, c'est le régime spécial et moins favorable de l'article 67, avec perte de la rémunération restante, qui s'applique, quand bien même elle aurait par ailleurs dépassé la moitié du préavis initial." },
    ],
  },
  {
    id: 'cp3',
    titre: "L'insolvabilité du sous-traitant sur le chantier de Kolwezi",
    contexte: "Une entreprise minière confie, par contrat écrit, la réalisation de travaux de terrassement à un sous-entrepreneur local, qui recrute lui-même la main-d'œuvre nécessaire et l'affecte à un chantier situé en dehors des ateliers et installations habituels de l'entreprise minière. Après trois mois d'exécution, le sous-entrepreneur se révèle insolvable et cesse de payer les salaires des travailleurs qu'il a engagés. Ces derniers découvrent en outre qu'aucune affiche n'a jamais été apposée sur le chantier indiquant la qualité du sous-entrepreneur, ni le nom et l'adresse de l'entreprise minière donneuse d'ordre.",
    questions: [
      { num: 1, enonce: "Qui, au sens de l'article 82, a la qualité de sous-entrepreneur dans cette situation, et sur quel critère cette qualification repose-t-elle ?", correction: "L'article 82 définit le sous-entrepreneur comme la personne physique ou morale qui passe avec un entrepreneur un contrat, écrit ou verbal, pour l'exécution d'un certain travail moyennant un prix forfaitaire, et qui engage elle-même la main-d'œuvre nécessaire. C'est précisément la position de l'entreprise locale de terrassement : elle a contracté avec l'entreprise minière pour un travail déterminé et a recruté directement les travailleurs affectés au chantier, ce qui caractérise la sous-entreprise plutôt qu'une simple mise à disposition de personnel." },
      { num: 2, enonce: "Les travaux étant exécutés en dehors des ateliers, magasins ou chantiers de l'entrepreneur principal, l'insolvabilité du sous-entrepreneur engage-t-elle malgré tout la responsabilité de l'entreprise minière pour les salaires impayés ?", correction: "Oui, précisément dans cette hypothèse. L'article 83 prévoit que, lorsque les travaux sont exécutés dans un lieu autre que les ateliers, magasins ou chantiers de l'entrepreneur, ce dernier est, en cas d'insolvabilité du sous-entrepreneur, responsable du paiement des salaires dus aux travailleurs. Le lieu d'exécution hors des installations habituelles, loin d'exonérer l'entreprise minière, est la condition même de sa responsabilité subsidiaire." },
      { num: 3, enonce: "Les travailleurs impayés doivent-ils d'abord poursuivre en vain le sous-entrepreneur insolvable avant de pouvoir agir contre l'entreprise minière, ou disposent-ils d'une action directe ?", correction: "L'article 83, second alinéa, leur ouvre une action directe contre l'entrepreneur, sans qu'un texte n'impose de démontrer au préalable l'échec de poursuites contre le sous-entrepreneur lui-même. Cette action directe simplifie la position des travailleurs, dont la créance salariale ne doit pas dépendre de l'issue incertaine d'une procédure contre un débiteur déjà insolvable." },
      { num: 4, enonce: "L'absence d'affichage indiquant la qualité du sous-entrepreneur et l'identité de l'entrepreneur constitue-t-elle, en elle-même, une irrégularité distincte de l'insolvabilité, et emporte-t-elle une conséquence propre ?", correction: "Oui, sur le plan de la régularité formelle du recours à la sous-entreprise. L'article 84 impose au sous-entrepreneur d'indiquer sa qualité ainsi que le nom et l'adresse de l'entrepreneur par voie d'affiche apposée de façon permanente dans chacun des ateliers, magasins ou chantiers utilisés, et impose à l'entrepreneur de tenir à jour la liste des sous-entrepreneurs avec lesquels il a contracté. Cette obligation d'affichage et de tenue de liste, distincte de la garantie de paiement de l'article 83, vise la transparence de la relation à l'égard des travailleurs et des autorités de contrôle ; son inobservation, ici caractérisée, constitue un manquement propre du sous-entrepreneur, sans toutefois conditionner la responsabilité de paiement déjà acquise de l'entrepreneur au titre de l'article 83." },
    ],
  },
  {
    id: 'cp4',
    titre: "La fusion de deux sociétés minières et les licenciements qui suivent",
    contexte: "Deux sociétés minières du Katanga fusionnent, la seconde absorbant la première. Tous les contrats de travail en cours au jour de la fusion sont maintenus par la société absorbante. Trois mois plus tard, celle-ci, invoquant une réorganisation intérieure rendue nécessaire par le doublonnage de certains postes administratifs, envisage de licencier douze travailleurs. Elle informe la délégation des travailleurs de son intention huit jours avant les licenciements, sans attendre l'avis de l'Inspecteur du Travail, et retient l'ordre des licenciements en ne considérant que l'ancienneté brute de chacun, sans tenir compte des situations familiales.",
    questions: [
      { num: 1, enonce: "Les contrats de travail des salariés de la société absorbée ont-ils valablement subsisté au profit de la société absorbante ?", correction: "Oui. L'article 80 dispose que, lorsqu'il y a substitution d'employeur, notamment par fusion, tous les contrats de travail en cours au jour de la substitution subsistent entre le nouvel employeur et le personnel. La fusion des deux sociétés minières relève très exactement de ce cas de figure, et les contrats se poursuivent de plein droit avec la société absorbante, sans qu'un nouveau contrat ne doive être signé ni qu'un consentement renouvelé des travailleurs ne soit requis." },
      { num: 2, enonce: "Le délai de huit jours retenu pour informer la délégation des travailleurs est-il conforme à l'article 78 ?", correction: "Non. L'article 78 impose à l'employeur d'informer par écrit les représentants des travailleurs des mesures qu'il envisage, au moins quinze jours à l'avance, en vue de recueillir leurs suggestions. Un délai de huit jours, inférieur à ce plancher, méconnaît cette exigence, quand bien même une information, même tardive, aurait bien été donnée." },
      { num: 3, enonce: "Le critère retenu, l'ancienneté brute sans considération des charges de famille, respecte-t-il l'ordre des licenciements imposé par l'article 78 ?", correction: "Non, ou à tout le moins de façon incomplète. L'article 78 impose de tenir compte de la qualification professionnelle, de l'ancienneté dans l'établissement et des charges de famille du travailleur ; en cas d'égalité d'aptitudes professionnelles, il retient les travailleurs les moins anciens, l'ancienneté étant majorée d'un an pour le travailleur marié et d'un an par enfant à charge au sens de l'article 7. En ignorant cette majoration liée à la situation familiale, la société absorbante applique un critère incomplet, susceptible de fausser l'ordre réel des licenciements par rapport à celui que le texte impose." },
      { num: 4, enonce: "Quel contrôle l'Inspecteur du Travail exerce-t-il sur cette procédure, et le fait que la société n'ait pas attendu son avis rend-il la procédure irrégulière de ce seul fait ?", correction: "L'article 78 charge l'Inspecteur du Travail de s'assurer, avant la mise en œuvre des licenciements, du respect de la procédure prescrite et des critères retenus par l'employeur ; en cas de non-respect, il le notifie par écrit à l'employeur, qui est tenu de répondre avant de procéder aux licenciements. Le texte n'organise cependant pas un avis préalable et suspensif de l'Inspecteur du Travail à obtenir avant toute notification aux travailleurs : c'est un contrôle a posteriori de la procédure suivie, articulé à un droit de réponse de l'employeur. Le vice de la procédure, en l'espèce, tient donc moins à l'absence d'attente d'un avis préalable qu'aux deux irrégularités déjà identifiées, le délai d'information insuffisant et le critère d'ancienneté incomplet, sur lesquelles l'Inspecteur du Travail devra précisément se prononcer s'il en est saisi." },
    ],
  },
  {
    id: 'cp5',
    titre: "La suspension pour enquête prolongée au-delà du délai légal",
    contexte: "Un employeur de Kisangani apprend, le 2 mars, des faits qu'il estime constitutifs d'une faute lourde commise par un chef d'équipe : un détournement de matériel remontant, selon les premiers éléments, au mois de janvier précédent. Le 4 mars, il notifie au travailleur la suspension de ses fonctions pour les besoins d'une enquête interne. L'enquête se prolonge, et ce n'est que le 30 mars, soit vingt-six jours ouvrables après avoir eu connaissance des faits, que l'employeur notifie par écrit sa décision de résilier le contrat pour faute lourde, sans préavis ni indemnité. Le siège social de l'entreprise se trouve sur le lieu même d'exécution du contrat.",
    questions: [
      { num: 1, enonce: "Le point de départ du délai pour notifier la résiliation pour faute lourde se situe-t-il au mois de janvier, date de commission alléguée des faits, ou au 2 mars, date à laquelle l'employeur en a eu connaissance ?", correction: "Le point de départ se situe au 2 mars. L'article 72 fait courir le délai de quinze jours ouvrables à compter du jour où la partie qui se propose de résilier a eu connaissance des faits qu'elle invoque, non à compter de leur commission matérielle, qui peut être antérieure et être restée ignorée. La circonstance que le détournement remonterait à janvier est donc sans incidence directe sur le calcul du délai, seule la date de connaissance, le 2 mars, faisant courir celui-ci." },
      { num: 2, enonce: "La notification de la suspension conservatoire, le 4 mars, a-t-elle respecté le délai propre à cette mesure ?", correction: "Oui. L'article 72 accorde à l'employeur la faculté de notifier au travailleur, dans les deux jours ouvrables après avoir eu connaissance des faits, la suspension de ses fonctions pour besoin d'enquête. La connaissance étant acquise le 2 mars et la notification étant intervenue le 4 mars, soit dans les deux jours ouvrables suivants, cette étape de la procédure est régulière." },
      { num: 3, enonce: "Le siège social de l'entreprise se trouvant sur le lieu même d'exécution du contrat, quelle durée maximale la suspension conservatoire pouvait-elle légalement atteindre, et la notification du 30 mars respecte-t-elle le délai global de l'article 72 pour la résiliation elle-même ?", correction: "La durée de la suspension conservatoire ne peut, en principe, excéder quinze jours ; le délai supplémentaire de quinze jours n'est accordé qu'à l'employeur dont le siège social ne se trouve pas sur le lieu d'exécution du contrat, ce qui n'est pas le cas ici. Mais la question de la durée de la suspension conservatoire doit être distinguée de celle, plus générale, du délai pour notifier la résiliation elle-même : ce dernier délai, fixé à quinze jours ouvrables à compter de la connaissance des faits par l'article 72, expirait aux alentours du 23 mars. La notification de la résiliation, intervenue le 30 mars, soit environ vingt-six jours ouvrables après le 2 mars, est donc tardive au regard de ce délai de quinze jours." },
      { num: 4, enonce: "Quelle conséquence tirer de ce dépassement du délai de quinze jours sur la validité de la résiliation notifiée le 30 mars comme rupture pour faute lourde sans préavis ni indemnité ?", correction: "Le délai de quinze jours ouvrables posé par l'article 72 encadre strictement la faculté de rompre le contrat sans préavis pour faute lourde : au-delà de ce délai, l'employeur qui tarde à notifier sa décision ne peut plus se prévaloir de la voie exceptionnelle et immédiate de la faute lourde, précisément parce que ce délai bref traduit l'exigence que la réaction de la partie lésée soit contemporaine de la connaissance des faits, et non différée au gré d'une enquête qui s'éternise. En notifiant la résiliation le 30 mars sans préavis ni indemnité, au-delà du délai légal, l'employeur expose sa décision à être requalifiée en rupture irrégulière du contrat à durée indéterminée, avec les conséquences de l'article 63 (dommages-intérêts, éventuellement plafonnés à trente-six mois, et indemnité de préavis non observé), plutôt qu'en résiliation régulière pour faute lourde au sens des articles 72 et 75." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue1',
  numero: 4,
  id: 'ue1-chapitre-4',
  titre: 'La rupture du contrat de travail',
  sousTitre: 'Titre IV du Code du travail (chapitres VI à VIII) · Loi n°015/2002, art. 61 à 85',
  infoBulle: 'Résiliation, licenciement, préavis, faute lourde, licenciement collectif, substitution d\'employeur et sous-entreprise.',
  loiRef: 'Titre IV (2/2), art. 61 à 85',
  moduleLabel: 'UE 1 · Droit du travail',
  retourRoute: '/ue1-droit-travail',
  coursId: 'ue1-droit-travail',
  objectifs: [
    'Distinguer les modes de résiliation du contrat et le régime du licenciement pour motif lié à l\'aptitude ou à la conduite',
    'Maîtriser le calcul et les effets du préavis, y compris ses régimes dérivés (articles 66, 67 et 71)',
    'Connaître le régime spécifique de la rupture du contrat à durée déterminée',
    'Maîtriser la procédure et les délais de la résiliation pour faute lourde',
    'Connaître le régime du licenciement collectif, de la substitution d\'employeur et de la sous-entreprise',
  ],
  sections: SECTIONS,
  aRetenir: [
    'Le licenciement d\'un contrat à durée indéterminée exige un motif valable lié à l\'aptitude, à la conduite du travailleur ou aux nécessités de fonctionnement de l\'entreprise, ainsi qu\'un entretien contradictoire préalable ; à défaut, le travailleur a droit à réintégration ou à des dommages-intérêts plafonnés à trente-six mois de rémunération.',
    'Le préavis légal minimal est de quatorze jours ouvrables, majoré de sept jours par année d\'ancienneté pour l\'employeur, réduit de moitié pour le travailleur ; les articles 66 et 67 organisent deux régimes de départ anticipé distincts, selon que le travailleur a ou non retrouvé un nouvel emploi.',
    'Le contrat à durée déterminée prend fin au terme fixé, toute clause de préavis y étant nulle de plein droit ; sa rupture irrégulière donne lieu à des dommages-intérêts calculés sur la période restant à courir jusqu\'au terme, non sur un plafond de trente-six mois.',
    'La faute lourde autorise une rupture immédiate sans préavis, sous un délai impératif de quinze jours ouvrables à compter de la connaissance des faits, distincte de la suspension conservatoire pour enquête qui l\'accompagne parfois.',
    'Le licenciement collectif obéit à une procédure stricte (information, critères, priorité de réembauche) ; la substitution d\'employeur maintient les contrats en cours, et le recours à la sous-entreprise engage la responsabilité de l\'entrepreneur principal en cas d\'insolvabilité du sous-traitant.',
  ],
  references: [
    {
        genre: "article",
        auteur: "Pimant C.",
        titre: "Les impératifs légaux lors de la rupture du contrat de travail en droit congolais",
        support: "Village Justice",
        precision: "note professionnelle en ligne"
    },
    {
        genre: "article",
        auteur: "Muanda D. J.",
        titre: "Comprendre la rupture du contrat de travail pour faute lourde en RDC",
        support: "Avocats.cd",
        precision: "note professionnelle en ligne"
    },
    {
        genre: "ouvrage",
        auteur: "Loko Mantuono G.",
        titre: "Droit social, droit du travail et de la sécurité sociale en RDC",
        editeur: "L'Harmattan",
        lieu: "Paris",
        annee: "2022"
    }
],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : Loi n°015/2002 du 16 octobre 2002 portant Code du travail, art. 61 à 85 · Loi n°16/010 du 15 juillet 2016',
}

export default chapitre
