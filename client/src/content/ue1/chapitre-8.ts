// Chapitre 8 du module UE1, Droit du travail : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
import type { Chapitre } from '@/lib/chapitre-types'

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '8.1',
    titre: "L'Administration du travail et l'Inspection du Travail",
    navLabel: '8.1 Administration et Inspection du Travail',
    blocs: [
      { type: 'paragraphe', texte: "Le Titre IX ouvre le bloc consacré à l'administration du travail par une définition de mission : sous l'autorité du Ministre ayant le Travail et la Prévoyance Sociale dans ses attributions, l'Administration du travail assure un rôle de conception et de conseil, de coordination et de contrôle dans le domaine du travail, de l'emploi, de la formation et de la prévoyance sociale (article 185). Elle comporte des services centraux auprès du Ministre et des services provinciaux et locaux, organisés par décret présidentiel (article 186)." },
      { type: 'paragraphe', texte: "Le chapitre II confie à l'Inspection du Travail quatre missions cardinales : assurer l'application des dispositions légales relatives aux conditions de travail et à la protection des travailleurs ; fournir informations et conseils techniques aux employeurs et aux travailleurs ; donner des avis sur l'établissement ou la modification d'installations soumises à autorisation administrative ; et porter à l'attention de l'autorité compétente les déficiences ou abus non couverts par les dispositions légales (article 187). Cette mission relève de la compétence exclusive de l'Inspection Générale du Travail sur tout le territoire national, laquelle comporte une Direction au service central et des inspections provinciales et locales (article 188)." },
      { type: 'carte', titre: 'Deux niveaux de ressort, article 191', tableau: { entetes: ['Inspecteur', 'Ressort'], lignes: [['Attaché à l\'Inspection Générale du Travail', '**Toute l\'étendue du territoire national**'], ['Attaché en province ou à Kinshasa', '**Limité à la juridiction administrative d\'attache**']] }, texte: "L'article 192 attribue en outre à l'Inspecteur de l'Inspection Générale une compétence propre pour les litiges où une partie a été mise dans l'impossibilité matérielle de poursuivre la conciliation, les conflits collectifs affectant plusieurs entreprises ou plusieurs ressorts, et certaines visites spéciales — une compétence qui s'ajoute à celle de l'Inspecteur du ressort, sans l'exclure." },
      { type: 'paragraphe', texte: "Avant d'entrer en fonction, Inspecteurs et Contrôleurs du Travail prêtent un serment de fidélité et de confidentialité devant la Cour d'Appel (article 194). Munis de leurs pièces justificatives, ils disposent d'un droit d'entrée libre à toute heure dans tout établissement assujetti, d'un droit d'interrogatoire, de communication des documents, d'affichage obligatoire et de prélèvement d'échantillons (article 196), ainsi que du pouvoir de dresser procès-verbal, de mettre en demeure, et d'ordonner des mesures immédiatement exécutoires en cas de danger imminent et grave — décision alors susceptible d'un recours au Ministre dans les quinze jours ouvrables (article 197). Ils sont tenus à une confidentialité absolue sur la source de toute plainte (article 198), les termes « dispositions légales et réglementaires » qu'ils contrôlent incluant les conventions collectives (article 199)." },
    ],
  },
  {
    numero: '8.2',
    titre: "L'emploi : Direction de l'Emploi, ONEM et Commission de l'Emploi des Étrangers",
    navLabel: '8.2 Direction de l\'Emploi, ONEM',
    blocs: [
      { type: 'paragraphe', texte: "Le chapitre III définit l'emploi comme toute activité non illicite pouvant procurer à un individu les revenus nécessaires pour satisfaire à ses besoins essentiels (article 201), et confie la politique nationale de l'emploi à deux organes distincts : la Direction de l'Emploi et l'Office National de l'Emploi (article 202). La Direction de l'Emploi contribue à la conception et à la mise en œuvre de cette politique — synthèse périodique de la situation de l'emploi, préparation des textes réglementant l'emploi et le placement, accords techniques avec l'étranger, contrôle de l'emploi des nationaux et des étrangers, réglementation du secteur non structuré (article 203)." },
      { type: 'paragraphe', texte: "L'Office National de l'Emploi (ONEM), établissement public à caractère technique et social doté de la personnalité juridique (article 204), a pour mission essentielle de promouvoir l'emploi et de réaliser, en collaboration avec les organismes publics ou privés intéressés, la meilleure organisation du marché de l'emploi (article 205), ses statuts et son organisation étant fixés par décret présidentiel (article 206). Les services privés de placement, quant à eux, sont soumis à un arrêté ministériel qui en fixe les modalités d'ouverture et de fonctionnement (article 207)." },
      { type: 'filet', titre: "La Commission Nationale de l'Emploi des Étrangers", texte: "Instituée auprès du Ministère du Travail (article 208), elle statue sur la délivrance et le renouvellement des cartes de travail pour étrangers, et conseille le Ministre sur les mesures susceptibles de protéger la main-d'œuvre nationale contre la concurrence étrangère (article 209). Une taxe est perçue sur les opérations relatives à l'octroi de la carte de travail pour étrangers, dont le taux est fixé conjointement par les Ministres du Travail et des Finances (article 211)." },
    ],
  },
  {
    numero: '8.3',
    titre: 'Les moyens de contrôle : documents, livre de paie et déclarations',
    navLabel: '8.3 Documents et déclarations',
    blocs: [
      { type: 'paragraphe', texte: "Le Titre X impose à l'employeur un appareil documentaire précis. Le contrat de travail constaté par écrit doit comporter au minimum quinze énonciations énumérées à l'article 212 : identité et immatriculation de l'employeur à la sécurité sociale, identité complète et affiliation du travailleur, situation familiale, nature et modalités du travail, rémunération, lieu et durée d'exécution, durée du préavis, date et lieu de conclusion, et aptitude au travail constatée par un médecin." },
      { type: 'paragraphe', texte: "Tout employeur, hormis celui qui n'occupe que du personnel domestique, doit tenir un livre de paie dans chacun de ses sièges d'exploitation, consignant à chaque paie toute somme attribuée à titre de rémunération (article 213), composé de feuilles numérotées comportant des doubles détachables (article 214) et conforme au modèle fixé par arrêté ministériel, un allègement étant prévu pour les employeurs occupant habituellement moins de vingt-cinq travailleurs (article 215)." },
      { type: 'carte', titre: 'Trois déclarations obligatoires (articles 216 à 218, modifiés en 2016)', tableau: { entetes: ['Déclaration', 'Délai', 'Destinataire'], lignes: [['Ouverture d\'une activité employant des travailleurs', '**Dans la quinzaine précédant l\'ouverture**', 'Service compétent du ministère + ONEM'], ['Engagement ou départ d\'un travailleur', '**Dans les quinze jours**', 'Service compétent du ministère + ONEM'], ['Situation annuelle de la main-d\'œuvre et bilan social', '**Au moins une fois par an**', 'Service compétent du ministère + ONEM']] } },
      { type: 'paragraphe', texte: "Le chapitre II ouvre enfin la possibilité de constituer des secrétariats sociaux, mandataires de leurs affiliés pour l'accomplissement des formalités imposées par la législation du travail et de la sécurité sociale (article 220), leur ouverture étant subordonnée au versement d'une caution et à l'autorisation du Ministre du Travail, sur avis de l'Inspecteur du ressort (article 221)." },
    ],
  },
  {
    numero: '8.4',
    titre: 'Le Conseil National du Travail',
    navLabel: '8.4 Conseil National du Travail',
    blocs: [
      { type: 'paragraphe', texte: "Le Titre XI institue, auprès du Ministre du Travail, un organisme consultatif tripartite dénommé Conseil National du Travail, présidé par le Ministre ou son représentant et comprenant un nombre égal de représentants de l'État, des travailleurs et des employeurs (article 223). Les représentants des travailleurs et des employeurs sont désignés par les organisations professionnelles les plus représentatives, ce caractère représentatif se mesurant, pour les travailleurs, au nombre de suffrages recueillis aux élections de délégués dans l'entreprise, et pour les employeurs, au nombre de travailleurs occupés dans les entreprises membres (article 224)." },
      { type: 'paragraphe', texte: "L'avis du Conseil est requis sur tout projet de texte modifiant ou créant des obligations ou des droits pour les travailleurs et les employeurs en matière de travail ou de sécurité sociale — un avis qui revient systématiquement dans les renvois réglementaires rencontrés au fil de ce module. Il étudie en outre toutes les questions relatives au travail, à la main-d'œuvre et à la prévoyance sociale, y compris les éléments de détermination du salaire minimum interprofessionnel garanti déjà étudié au chapitre 5 (article 225). Le mandat de ses membres, gratuit sous réserve d'indemnités de séance, dure deux ans renouvelables, et le Conseil se réunit au moins deux fois par an (articles 228-229)." },
    ],
  },
  {
    numero: '8.5',
    titre: 'Les organisations professionnelles et les syndicats',
    navLabel: '8.5 Organisations professionnelles',
    blocs: [
      { type: 'paragraphe', texte: "Le Titre XII, le plus long du Code, organise les relations professionnelles. Son premier chapitre pose la liberté syndicale : travailleurs et employeurs ont le droit de se constituer en organisations professionnelles sans autorisation préalable (articles 230-231), d'élaborer librement leurs statuts, d'élire leurs représentants (article 232), et de s'affilier ou de se désaffilier à tout moment (article 233). Toute discrimination liée à l'affiliation syndicale est interdite à l'employeur, qu'il s'agisse de subordonner l'emploi à l'affiliation ou de licencier en raison d'une activité syndicale (article 234) ; les organisations doivent réciproquement s'abstenir de tout acte d'ingérence entre elles (article 235)." },
      { type: 'paragraphe', texte: "Le syndicat, organisation professionnelle au sens de l'article 230 (article 237), doit se faire enregistrer au Ministère du Travail (article 238), sa demande devant joindre des statuts répondant à dix exigences énumérées à l'article 240 : dénomination et siège, objet, conditions d'affiliation et d'exclusion, mode de nomination des dirigeants, règles de gestion financière, mode de vérification des comptes, procédure de l'assemblée générale, sanctions statutaires, procédure de modification et de dissolution, et règlement des conflits internes." },
      { type: 'filet', titre: 'Qui peut diriger un syndicat ? Article 241, modifié en 2016', texte: "Vingt et un ans au moins, nationalité congolaise — ou, pour un étranger sous réserve de réciprocité, vingt années de travail ininterrompu en RDC sous le régime du Code du travail. S'y ajoutent des incapacités tenant au casier judiciaire : condamnation à plus de deux mois de servitude pénale dans les trois dernières années (hors délits de presse et infractions liées aux activités syndicales), internement pour aliénation mentale, condamnation pour banqueroute, ou condamnation à deux ans de servitude pénale sans réhabilitation ni cinq années écoulées depuis la libération." },
      { type: 'paragraphe', texte: "Le Ministre vérifie la conformité des statuts avant enregistrement et peut refuser celui-ci, motifs à l'appui, le syndicat disposant d'un mois pour présenter ses observations avant toute décision définitive, susceptible de recours en justice (articles 242-243). Une fois enregistré, le syndicat jouit de la personnalité civile, ses biens nécessaires à l'activité syndicale étant insaisissables (article 249) ; il peut se dissoudre de plein droit si son objet est atteint ou par vote des deux tiers de l'assemblée générale (article 251), mais ne peut jamais être dissous ou suspendu par voie administrative (article 252) — une garantie d'indépendance vis-à-vis de l'exécutif." },
    ],
  },
  {
    numero: '8.6',
    titre: 'La représentation des travailleurs dans l\'entreprise et l\'éducation ouvrière',
    navLabel: '8.6 Délégation syndicale',
    blocs: [
      { type: 'paragraphe', texte: "Le chapitre II organise la représentation des travailleurs par une délégation élue au scrutin direct et secret de liste, à deux tours, dont le seuil d'effectif déclenchant l'obligation, le nombre de délégués et les conditions d'électorat sont fixés par arrêté ministériel (article 255). Le mandat, de trois ans renouvelables, se perd en cas de perte des conditions d'éligibilité, de démission, de perte d'emploi, ou de désaveu par les travailleurs du syndicat pour faute lourde — la perte du mandat ne devenant toutefois effective qu'après constat de l'Inspecteur du Travail (article 257)." },
      { type: 'carte', titre: 'Une protection renforcée contre le licenciement, article 258', liste: [
        "Tout licenciement d'un délégué (titulaire ou suppléant) est soumis à la condition suspensive de l'approbation de l'Inspecteur du Travail",
        "En cas de faute lourde invoquée, l'employeur peut suspendre les fonctions du délégué dans les conditions de l'article 72, mais le licenciement ne devient effectif qu'après décision de l'Inspecteur",
        "Sauf faute lourde, le préavis est le double de celui de l'article 64, sans pouvoir être inférieur à trois mois",
        "Les candidats aux élections ne peuvent être licenciés du dépôt des listes à la proclamation des résultats, et bénéficient de la même protection pendant six mois après le scrutin s'ils ne sont pas élus",
      ] },
      { type: 'paragraphe', texte: "La compétence de la délégation couvre l'ensemble des conditions de travail : consultation obligatoire sur les horaires, les critères d'embauche et de licenciement, les systèmes de rémunération, le règlement d'entreprise (article 259) ; participation à la discipline du travail (article 260), à la gestion des œuvres sociales et à la formation professionnelle (article 261), et aux mesures de sécurité, d'hygiène et de salubrité (article 262). L'employeur doit l'informer au moins semestriellement sur la marche économique et sociale de l'entreprise, sous réserve d'une confidentialité que les délégués ne peuvent divulguer (article 263). Chaque délégué dispose en outre, individuellement, d'un droit de saisine directe de l'Inspection du Travail pour toute réclamation non réglée (article 264), et bénéficie d'un minimum de quinze heures par mois pour l'exercice de ses fonctions, rémunérées comme temps de travail (article 265)." },
      { type: 'paragraphe', texte: "Le chapitre III ouvre, en marge de la délégation, un droit à l'éducation ouvrière : tout syndicat enregistré peut organiser des stages de formation pour ses membres et délégués (article 267), qui bénéficient à ce titre d'un congé d'éducation ouvrière de douze jours par an, non déductible du congé annuel et payé par l'employeur sur les mêmes bases, hors frais de transport et de séjour (articles 268-269)." },
    ],
  },
  {
    numero: '8.7',
    titre: 'Les conventions collectives',
    navLabel: '8.7 Les conventions collectives',
    blocs: [
      { type: 'paragraphe', texte: "Le chapitre IV, dernier du Titre XII, définit la convention collective comme un accord écrit relatif aux conditions et relations de travail, conclu entre un ou plusieurs employeurs ou organisations d'employeurs, d'une part, et une ou plusieurs organisations de travailleurs, d'autre part (article 272). Elle peut prévoir des dispositions plus favorables aux travailleurs que la loi, mais jamais déroger aux dispositions d'ordre public (article 274) — un principe déjà rencontré à l'article 37 dans le module sur le contrat de travail." },
      { type: 'paragraphe', texte: "Conclue à durée déterminée ou indéterminée (par défaut, indéterminée, article 276), la convention à durée déterminée arrivée à expiration est tacitement reconduite à défaut de dénonciation, et devient alors à durée indéterminée (article 277) ; celle à durée indéterminée peut être dénoncée moyennant un préavis, fixé à trois mois à défaut de stipulation contraire (article 278). L'article 279 impose un contenu minimal impératif — lieu et date, identité des contractants, champ d'application, objet, entrée en vigueur, procédure de conciliation et d'arbitrage, règles en cas d'incapacité temporaire de l'employeur, modalités de versement des cotisations syndicales — et une longue liste, non limitative, de clauses possibles : salaires par catégorie, embauche et licenciement, période d'essai et préavis, congés, heures supplémentaires, primes, majorations pour travaux pénibles, formation professionnelle." },
      { type: 'carte', titre: 'Le dépôt et la publication, article 280', texte: 'La convention est établie en autant d\'originaux qu\'il y a de parties, six originaux supplémentaires étant soumis au visa de l\'Inspecteur du Travail, qui peut exiger la modification des clauses contraires à la loi. Un exemplaire visé est déposé sans frais au greffe du Tribunal du Travail ; un autre est transmis au Ministère du Travail pour publication au Journal Officiel, également sans frais.' },
      { type: 'paragraphe', texte: "La convention collective a force obligatoire pour tous les contractants, les personnes qu'ils représentent et les membres de leurs organisations (article 289), et s'applique nonobstant toute disposition contraire des contrats individuels ou des règlements d'entreprise, sauf disposition plus favorable au travailleur (article 291). Le Ministre du Travail peut, sur demande et après avis d'une commission paritaire, en étendre tout ou partie à l'ensemble d'un secteur professionnel et territorial (article 287) — la convention étendue devenant alors obligatoire pour tous les employeurs et travailleurs du secteur visé, qu'ils l'aient ou non signée (article 290). Enfin, tout employeur ou organisation professionnelle non signataire peut y adhérer après un délai de six mois à compter de son entrée en vigueur, sous réserve de l'accord des parties signataires (article 286)." },
    ],
  },
]

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1', question: "Quelle mission générale l'article 185 assigne-t-il à l'Administration du travail ?",
    options: [
      { id: 'a', texte: "Un rôle exclusivement répressif de sanction des employeurs" },
      { id: 'b', texte: "Un rôle de conception, de conseil, de coordination et de contrôle dans le domaine du travail, de l'emploi, de la formation et de la prévoyance sociale" },
      { id: 'c', texte: "La seule gestion des cotisations de sécurité sociale" },
      { id: 'd', texte: "La représentation exclusive de l'État dans les négociations collectives" },
      { id: 'e', texte: "Un rôle limité à la statistique de l'emploi" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 185',
    explication: "L'article 185 assigne à l'Administration du travail, sous l'autorité du Ministre du Travail, un rôle de conception et de conseil, de coordination et de contrôle dans le domaine du travail, de l'emploi, de la formation et de la prévoyance sociale, avec huit missions détaillées à l'appui.",
  },
  {
    id: 'q2', question: "L'exercice des missions de l'Inspection du Travail relève-t-il d'une compétence partagée entre plusieurs administrations ?",
    options: [
      { id: 'a', texte: "Oui, elle est partagée avec le Ministère de la Justice" },
      { id: 'b', texte: "Non, elle relève de la compétence exclusive de l'Inspection Générale du Travail sur tout le territoire" },
      { id: 'c', texte: "Oui, chaque province dispose d'une compétence totalement autonome" },
      { id: 'd', texte: "Non, elle relève exclusivement de la CNSS" },
      { id: 'e', texte: "Oui, elle est partagée avec l'ONEM" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 188',
    explication: "L'article 188 réserve l'exercice des missions de l'Inspection du Travail à la compétence exclusive de l'Inspection Générale du Travail sur toute l'étendue du territoire national, celle-ci comportant une Direction au service central et des inspections provinciales et locales.",
  },
  {
    id: 'q3', question: "Quel est le pouvoir dont dispose un Inspecteur du Travail, muni de ses pièces justificatives, à l'égard des établissements assujettis à son contrôle ?",
    options: [
      { id: 'a', texte: "Pénétrer librement, sans avertissement préalable, à toute heure du jour et de la nuit" },
      { id: 'b', texte: "Pénétrer uniquement pendant les heures ouvrables, sur rendez-vous préalable" },
      { id: 'c', texte: "Solliciter une autorisation judiciaire préalable pour chaque visite" },
      { id: 'd', texte: "N'agir que sur plainte écrite et signée d'un travailleur nommément identifié" },
      { id: 'e', texte: "Ne visiter que les établissements de plus de cinquante travailleurs" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 196, litera a',
    explication: "L'article 196 autorise les Inspecteurs et Contrôleurs du Travail, munis de pièces justificatives, à pénétrer librement, sans avertissement préalable, à toute heure du jour et de la nuit, dans tout établissement assujetti au contrôle de l'Inspection.",
  },
  {
    id: 'q4', question: "Un Inspecteur du Travail peut-il révéler à l'employeur qu'une visite d'inspection fait suite à une plainte ?",
    options: [
      { id: 'a', texte: "Oui, la transparence est de rigueur" },
      { id: 'b', texte: "Non, il doit traiter la source de la plainte comme absolument confidentielle et s'abstenir de révéler qu'une visite fait suite à une plainte" },
      { id: 'c', texte: "Oui, mais uniquement avec l'accord préalable du plaignant" },
      { id: 'd', texte: "Non, sauf si la plainte émane d'un délégué syndical" },
      { id: 'e', texte: "Oui, dès lors que la plainte est écrite" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 198',
    explication: "L'article 198 impose aux Inspecteurs et Contrôleurs du Travail de traiter comme absolument confidentielle la source de toute plainte et de s'abstenir de révéler à l'employeur qu'une visite fait suite à une plainte, une garantie de protection du plaignant contre d'éventuelles représailles.",
  },
  {
    id: 'q5', question: "Quel établissement public a pour mission essentielle de promouvoir l'emploi et d'organiser le marché de l'emploi, selon l'article 205 ?",
    options: [
      { id: 'a', texte: "La Direction de l'Emploi" },
      { id: 'b', texte: "L'Office National de l'Emploi (ONEM)" },
      { id: 'c', texte: "La Commission Nationale de l'Emploi des Étrangers" },
      { id: 'd', texte: "Le Conseil National du Travail" },
      { id: 'e', texte: "L'Inspection Générale du Travail" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 204-205',
    explication: "L'Office National de l'Emploi, établissement public à caractère technique et social doté de la personnalité juridique (article 204), a pour mission essentielle de promouvoir l'emploi et de réaliser la meilleure organisation possible du marché de l'emploi (article 205).",
  },
  {
    id: 'q6', question: "À quoi sert la Commission Nationale de l'Emploi des Étrangers, selon l'article 209 ?",
    options: [
      { id: 'a', texte: "À fixer le salaire minimum interprofessionnel garanti" },
      { id: 'b', texte: "À statuer sur la délivrance et le renouvellement des cartes de travail pour étrangers" },
      { id: 'c', texte: "À enregistrer les syndicats étrangers" },
      { id: 'd', texte: "À gérer les cotisations sociales des travailleurs étrangers" },
      { id: 'e', texte: "À organiser les élections des délégués du personnel" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 209',
    explication: "La Commission Nationale de l'Emploi des Étrangers statue sur la demande d'engagement et le renouvellement des cartes de travail pour étrangers, et conseille le Ministre sur les mesures susceptibles de protéger la main-d'œuvre nationale.",
  },
  {
    id: 'q7', question: "Un employeur occupant habituellement moins de vingt-cinq travailleurs est-il dispensé de tenir un livre de paie ?",
    options: [
      { id: 'a', texte: "Oui, totalement" },
      { id: 'b', texte: "Non, mais il peut utiliser un livre de paie inspiré du modèle fixé, allégé par rapport au modèle standard" },
      { id: 'c', texte: "Oui, sauf s'il emploie du personnel domestique" },
      { id: 'd', texte: "Non, aucun allègement n'est prévu selon la taille de l'entreprise" },
      { id: 'e', texte: "Oui, à condition d'obtenir une dérogation individuelle du Ministre" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 215, al. 3',
    explication: "L'article 215 prévoit que les employeurs occupant habituellement moins de vingt-cinq travailleurs pourront utiliser un livre de paie inspiré du modèle fixé par arrêté, sans être totalement dispensés de cette obligation.",
  },
  {
    id: 'q8', question: "Dans quel délai l'engagement d'un travailleur doit-il être déclaré au service compétent et à l'ONEM, selon l'article 217 ?",
    options: [
      { id: 'a', texte: "Dans les quinze jours" },
      { id: 'b', texte: "Dans les trente jours" },
      { id: 'c', texte: "Dans les quarante-cinq jours" },
      { id: 'd', texte: "Avant la fin de la période d'essai" },
      { id: 'e', texte: "Aucun délai n'est fixé par le Code" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 217',
    explication: "L'article 217, modifié en 2016, impose une déclaration de l'engagement du travailleur, dans les quinze jours, au service compétent du ministère et à l'Office national de l'emploi ; la même règle s'applique à la déclaration de départ.",
  },
  {
    id: 'q9', question: "Le Conseil National du Travail est-il composé exclusivement de représentants de l'État ?",
    options: [
      { id: 'a', texte: "Oui, il s'agit d'un organe purement administratif" },
      { id: 'b', texte: "Non, il comprend un nombre égal de représentants de l'État, des travailleurs et des employeurs" },
      { id: 'c', texte: "Non, il ne comprend que des représentants des travailleurs" },
      { id: 'd', texte: "Non, il ne comprend que des représentants des employeurs" },
      { id: 'e', texte: "Oui, les travailleurs et employeurs n'y siègent qu'à titre consultatif sans droit de vote" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 223',
    explication: "L'article 223 institue le Conseil National du Travail comme un organisme tripartite, comprenant un nombre égal de représentants de l'État, des travailleurs et des employeurs, présidé par le Ministre du Travail ou son représentant.",
  },
  {
    id: 'q10', question: "L'avis du Conseil National du Travail est-il requis sur tout texte modifiant les droits et obligations des travailleurs et employeurs en matière de travail ou de sécurité sociale ?",
    options: [
      { id: 'a', texte: "Non, son avis n'est que facultatif" },
      { id: 'b', texte: "Oui, selon l'article 225, cet avis est requis sur tous les projets de textes ayant un tel objet" },
      { id: 'c', texte: "Oui, mais uniquement pour les textes de niveau législatif" },
      { id: 'd', texte: "Non, seul l'avis de l'Inspection Générale du Travail est requis" },
      { id: 'e', texte: "Oui, mais son avis ne lie que le Ministre, pas le Président de la République" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 225',
    explication: "L'article 225 requiert l'avis du Conseil National du Travail sur tous les projets de lois, décrets-lois, décrets et arrêtés ministériels ayant pour objet de modifier ou de créer des obligations ou des droits pour les travailleurs et les employeurs en matière de travail ou de sécurité sociale.",
  },
  {
    id: 'q11', question: "Une autorisation administrative préalable est-elle requise pour constituer une organisation professionnelle, selon l'article 231 ?",
    options: [
      { id: 'a', texte: "Oui, systématiquement" },
      { id: 'b', texte: "Non, aucune autorisation préalable n'est requise, sous réserve de remplir les formalités du chapitre" },
      { id: 'c', texte: "Oui, uniquement pour les syndicats de travailleurs, pas pour ceux d'employeurs" },
      { id: 'd', texte: "Oui, une autorisation du Conseil National du Travail est nécessaire" },
      { id: 'e', texte: "Non, mais un dépôt de caution est exigé" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 231',
    explication: "L'article 231 dispense de toute autorisation préalable la constitution d'une organisation professionnelle, à la seule condition de remplir les formalités prévues par le chapitre — enregistrement compris.",
  },
  {
    id: 'q12', question: "Quel âge minimal l'article 241 exige-t-il pour être chargé de l'administration ou de la direction d'un syndicat ?",
    options: [
      { id: 'a', texte: "Dix-huit ans" },
      { id: 'b', texte: "Vingt ans" },
      { id: 'c', texte: "Vingt et un ans" },
      { id: 'd', texte: "Vingt-cinq ans" },
      { id: 'e', texte: "Trente ans" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 241',
    explication: "L'article 241, modifié en 2016, fixe l'âge minimal à vingt et un ans, avec en outre une exigence de nationalité congolaise, sauf pour un étranger justifiant, sous réserve de réciprocité, de vingt années de travail ininterrompu en RDC.",
  },
  {
    id: 'q13', question: "Un syndicat enregistré peut-il être dissous par une décision administrative du Ministre du Travail ?",
    options: [
      { id: 'a', texte: "Oui, à tout moment, pour des raisons d'opportunité" },
      { id: 'b', texte: "Non, l'article 252 exclut toute dissolution ou suspension par voie administrative" },
      { id: 'c', texte: "Oui, mais uniquement après avis du Conseil National du Travail" },
      { id: 'd', texte: "Oui, si le syndicat n'a pas transmis son rapport annuel" },
      { id: 'e', texte: "Oui, en cas de conflit avec un autre syndicat" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 252',
    explication: "L'article 252 pose une garantie d'indépendance des organisations professionnelles à l'égard de l'exécutif : elles ne sont pas sujettes à dissolution ou à suspension par voie administrative, seule une dissolution volontaire ou judiciaire étant possible (article 251).",
  },
  {
    id: 'q14', question: "Le licenciement d'un délégué du personnel, titulaire ou suppléant, peut-il être prononcé par le seul employeur ?",
    options: [
      { id: 'a', texte: "Oui, comme pour tout travailleur ordinaire" },
      { id: 'b', texte: "Non, il est soumis à la condition suspensive de l'approbation de l'Inspecteur du Travail" },
      { id: 'c', texte: "Oui, à condition de verser une indemnité double" },
      { id: 'd', texte: "Non, seul le Tribunal du Travail peut l'autoriser, à l'exclusion de l'Inspecteur du Travail" },
      { id: 'e', texte: "Oui, si le syndicat du délégué a préalablement donné son accord" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 258',
    explication: "L'article 258 soumet tout licenciement d'un délégué titulaire ou suppléant à la condition suspensive de l'approbation de l'Inspecteur du Travail du ressort : le licenciement ne devient effectif qu'après sa décision, même en cas de faute lourde invoquée par l'employeur.",
  },
  {
    id: 'q15', question: "Combien d'heures minimum par mois un délégué du personnel dispose-t-il pour l'exercice de ses fonctions, selon l'article 265 ?",
    options: [
      { id: 'a', texte: "Cinq heures" },
      { id: 'b', texte: "Dix heures" },
      { id: 'c', texte: "Quinze heures" },
      { id: 'd', texte: "Vingt heures" },
      { id: 'e', texte: "Trente heures" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 265',
    explication: "L'article 265 fixe à quinze heures par mois le nombre d'heures minimum dont doivent disposer les représentants des travailleurs pour l'accomplissement de leurs fonctions, ces heures étant considérées et rémunérées comme temps de travail.",
  },
  {
    id: 'q16', question: "Une convention collective peut-elle valablement prévoir des dispositions moins favorables aux travailleurs que la législation en vigueur, si les parties le décident d'un commun accord ?",
    options: [
      { id: 'a', texte: "Oui, la liberté contractuelle des partenaires sociaux prime" },
      { id: 'b', texte: "Non, l'article 274 lui permet d'être plus favorable, mais jamais de déroger aux dispositions d'ordre public" },
      { id: 'c', texte: "Oui, à condition que l'Inspecteur du Travail vise la convention" },
      { id: 'd', texte: "Oui, uniquement dans les secteurs en difficulté économique avérée" },
      { id: 'e', texte: "Non, sauf accord exprès du Ministre du Travail" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 274',
    explication: "L'article 274 autorise la convention collective à comporter des dispositions plus favorables aux travailleurs que la législation, mais lui interdit de déroger aux dispositions d'ordre public — un plancher de protection qu'aucun accord collectif ne peut abaisser.",
  },
  {
    id: 'q17', question: "Une convention collective étendue par arrêté ministériel s'applique-t-elle aux employeurs et travailleurs qui ne l'ont pas signée ?",
    options: [
      { id: 'a', texte: "Non, seuls les signataires et leurs membres y sont tenus" },
      { id: 'b', texte: "Oui : selon l'article 290, la convention étendue a force obligatoire pour les employeurs et travailleurs auxquels elle est étendue" },
      { id: 'c', texte: "Oui, mais uniquement pour les clauses relatives aux salaires" },
      { id: 'd', texte: "Non, l'extension ne vaut que pour les futurs contrats, pas pour les contrats en cours" },
      { id: 'e', texte: "Oui, mais seulement avec l'accord individuel de chaque employeur concerné" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 287 et 290',
    explication: "L'article 287 permet au Ministre du Travail, sur demande et après avis de la commission paritaire, d'étendre tout ou partie d'une convention collective publiée à l'ensemble d'un secteur professionnel et territorial ; l'article 290 rend alors cette convention étendue obligatoire pour tous les employeurs et travailleurs visés, qu'ils l'aient ou non signée.",
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: "La visite surprise de l'Inspecteur du Travail à l'usine textile de Kisangani",
    contexte: "Un Inspecteur du Travail se présente un dimanche à 21 heures à l'entrée d'une usine textile de Kisangani, munie de ses pièces justificatives, à la suite d'une plainte anonyme signalant des conditions de sécurité douteuses sur l'équipe de nuit. Le directeur de l'usine, présent sur place, refuse de le laisser entrer, invoquant l'absence de rendez-vous préalable et le caractère « anormal » d'une visite un dimanche soir. Il exige en outre de connaître l'identité du plaignant avant d'autoriser quoi que ce soit.",
    questions: [
      { num: 1, enonce: "Le directeur peut-il subordonner l'entrée de l'Inspecteur à la prise d'un rendez-vous préalable ?", correction: "Non. L'article 196, litera a, autorise les Inspecteurs et Contrôleurs du Travail, munis de pièces justificatives, à pénétrer librement, sans avertissement préalable, à toute heure du jour et de la nuit, dans tout établissement assujetti au contrôle de l'Inspection. Le caractère dominical et nocturne de la visite, loin d'être anormal, relève précisément de ce que le texte autorise expressément." },
      { num: 2, enonce: "L'Inspecteur est-il tenu de révéler l'identité du plaignant au directeur pour pouvoir procéder à sa visite ?", correction: "Non, en aucun cas. L'article 198 impose aux Inspecteurs et Contrôleurs du Travail de traiter comme absolument confidentielle la source de toute plainte, et de s'abstenir de révéler à l'employeur qu'une visite fait suite à une plainte. Le refus de l'Inspecteur de communiquer cette identité n'est donc pas une faculté, mais une obligation légale qui s'impose à lui." },
      { num: 3, enonce: "Si l'Inspecteur constate, lors de sa visite, un danger grave et imminent pour la sécurité des travailleurs de l'équipe de nuit, quel pouvoir immédiat détient-il ?", correction: "L'article 197, litera f, lui permet d'ordonner ou de faire ordonner que des mesures immédiatement exécutoires soient prises lorsqu'il a un motif raisonnable de considérer qu'il y a danger imminent et grave pour la santé ou la sécurité des travailleurs, l'ampliation du procès-verbal devant alors être adressée à l'employeur et à l'autorité hiérarchique dans les huit jours." },
      { num: 4, enonce: "Le directeur dispose-t-il d'un recours contre une telle mesure immédiatement exécutoire ?", correction: "Oui. L'article 197 lui ouvre un recours auprès du Ministre du Travail, à adresser dans les quinze jours ouvrables à compter de la réception, par lettre recommandée ou par porteur avec accusé de réception. Le Ministre notifie sa décision dans le mois de la réception du recours ; son silence au-delà de ce délai vaut acceptation du recours du directeur." },
    ],
  },
  {
    id: 'cp2',
    titre: "Le syndicat de Mbandaka dirigé par un condamné pour banqueroute",
    contexte: "Un groupe de travailleurs d'une entreprise de transport fluvial de Mbandaka constitue un syndicat et dépose une demande d'enregistrement au Ministère du Travail. Parmi les trois membres proposés pour l'administration et la direction du syndicat figure M. Bofasa, condamné dix ans plus tôt pour banqueroute, aujourd'hui réhabilité par jugement définitif. Le Ministre refuse l'enregistrement du syndicat au seul motif de la présence de M. Bofasa parmi ses dirigeants, sans notifier aucun motif à l'organisation requérante.",
    questions: [
      { num: 1, enonce: "La condamnation pour banqueroute de M. Bofasa constitue-t-elle, en elle-même, une incapacité à diriger un syndicat, selon l'article 241 ?", correction: "Oui, en principe. L'article 241 exclut de l'administration ou de la direction d'un syndicat la personne condamnée du chef de banqueroute, sans distinction quant à l'ancienneté de la condamnation dans cette hypothèse précise — à la différence d'autres cas d'incapacité limités aux trois dernières années ou soumis à un délai de réhabilitation." },
      { num: 2, enonce: "Le fait que M. Bofasa soit aujourd'hui réhabilité par jugement définitif change-t-il cette analyse ?", correction: "Le texte de l'article 241 ne prévoit pas, pour la condamnation du chef de banqueroute spécifiquement, de mécanisme de réhabilitation ou de délai purgeant l'incapacité, à la différence de l'hypothèse distincte de la condamnation pour infraction de droit commun à deux ans de servitude pénale, pour laquelle l'article prévoit expressément une réhabilitation ou l'écoulement de cinq années après la libération. En l'absence d'une telle précision pour la banqueroute, la prudence impose de vérifier ce point auprès du Ministère du Travail avant toute conclusion définitive, le texte du Code ne tranchant pas expressément cette hypothèse." },
      { num: 3, enonce: "Le refus d'enregistrement, non motivé et non notifié à l'organisation requérante, est-il régulier au regard de l'article 242 ?", correction: "Non. L'article 242 impose au Ministre, avant de refuser l'enregistrement d'un syndicat, de lui en notifier le ou les motifs. Un refus sans motivation ni notification méconnaît cette exigence procédurale, indépendamment même du bien-fondé, sur le fond, du motif tiré de la situation de M. Bofasa." },
      { num: 4, enonce: "Si le syndicat retire M. Bofasa de la liste de ses dirigeants proposés, doit-il reprendre toute la procédure d'enregistrement depuis le début ?", correction: "Le Code ne l'exige pas explicitement : l'article 243 permet au syndicat qui a reçu notification d'un refus de présenter ses observations dans le délai d'un mois, ce qui peut inclure une régularisation de la composition de sa direction en réponse au motif notifié, sans qu'une nouvelle demande complète soit nécessairement requise, sous réserve de l'appréciation du Ministère sur la nature de la modification apportée." },
    ],
  },
  {
    id: 'cp3',
    titre: "La convention collective sectorielle et l'entreprise non signataire de Matadi",
    contexte: "Une convention collective du secteur portuaire, signée entre plusieurs syndicats de travailleurs et une organisation patronale, a été régulièrement publiée au Journal Officiel il y a quatre mois. Une entreprise de manutention portuaire de Matadi, non partie à cette convention, souhaite en bénéficier pour harmoniser ses conditions de travail avec celles du secteur, mais s'interroge sur la procédure à suivre, ainsi que sur l'hypothèse où le Ministre déciderait, de sa propre initiative, d'étendre la convention à tout le secteur portuaire.",
    questions: [
      { num: 1, enonce: "L'entreprise de Matadi peut-elle, à ce stade, adhérer unilatéralement à la convention collective déjà en vigueur ?", correction: "Non, pas encore, et pas unilatéralement. L'article 286 ouvre un droit d'adhésion après un délai de six mois à compter de l'entrée en vigueur de la convention, l'adhésion devant en outre faire l'objet d'un accord des parties signataires : elle ne peut jamais être unilatérale. L'entreprise devra donc attendre l'écoulement du délai de six mois et obtenir l'accord des parties signataires." },
      { num: 2, enonce: "Une fois l'adhésion obtenue, l'entreprise pourra-t-elle immédiatement dénoncer la convention si elle change d'avis ?", correction: "Non. L'article 286, dernier alinéa, prive l'adhérent du droit de dénonciation pendant les deux années qui suivent son adhésion, une règle de stabilité qui protège la convention contre des adhésions puis retraits trop rapides et déstabilisants pour le secteur." },
      { num: 3, enonce: "Si le Ministre du Travail décide d'étendre la convention à tout le secteur portuaire, selon quelle procédure et avec quel effet pour l'entreprise de Matadi ?", correction: "Selon l'article 287, le Ministre peut, à la demande d'une des parties et après avis de la commission paritaire prévue à l'article 284, décider l'extension de tout ou partie de la convention aux employeurs et travailleurs du même secteur professionnel et territorial. Une fois cette extension décidée, l'article 290 rend la convention étendue obligatoire pour l'entreprise de Matadi, qu'elle y ait ou non consenti, sans qu'elle ait besoin d'attendre le délai de six mois ni l'accord des parties signataires applicable à l'adhésion volontaire." },
      { num: 4, enonce: "L'extension éventuelle de la convention dispense-t-elle l'entreprise de vérifier si certaines de ses pratiques internes lui sont déjà plus favorables que la convention étendue ?", correction: "Non, cette vérification reste nécessaire mais tourne, le cas échéant, à l'avantage de l'entreprise et de ses travailleurs. L'article 291 précise que les dispositions de la convention collective s'appliquent nonobstant les dispositions contraires des contrats individuels ou règlements d'entreprise, sauf celles qui sont plus favorables aux travailleurs qui en bénéficient : une pratique interne plus favorable que la convention étendue continue donc de s'appliquer, sans être supplantée par cette dernière." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue1',
  numero: 8,
  id: 'ue1-chapitre-8',
  titre: 'Administration du travail et relations collectives',
  sousTitre: 'Titres IX à XII du Code du travail · Loi n°015/2002, art. 185 à 296',
  infoBulle: "Inspection du Travail, Direction de l'Emploi et ONEM, moyens de contrôle, Conseil National du Travail, syndicats, délégation du personnel et conventions collectives.",
  loiRef: 'Titres IX-XII, art. 185 à 296',
  moduleLabel: 'UE 1 · Droit du travail',
  retourRoute: '/ue1-droit-travail',
  coursId: 'ue1-droit-travail',
  objectifs: [
    "Connaître l'organisation et les pouvoirs de l'Inspection du Travail, notamment la mise en demeure et l'arrêt immédiat en cas de danger",
    "Connaître les organes de la politique de l'emploi : Direction de l'Emploi, ONEM et Commission Nationale de l'Emploi des Étrangers",
    "Maîtriser les obligations documentaires de l'employeur (contrat écrit, livre de paie, déclarations) et le rôle des secrétariats sociaux",
    "Connaître le rôle consultatif du Conseil National du Travail et les conditions de constitution et d'enregistrement d'un syndicat",
    "Maîtriser la protection du délégué du personnel contre le licenciement et ses compétences dans l'entreprise",
    "Connaître le régime de la convention collective : contenu, force obligatoire, adhésion et extension",
  ],
  sections: SECTIONS,
  aRetenir: [
    "L'Inspecteur du Travail dispose d'un droit d'entrée libre à toute heure (art. 196), d'un pouvoir de mise en demeure (délai minimal de quatre jours francs) et d'un pouvoir d'arrêt immédiat en cas de danger grave et imminent (art. 197), avec recours possible au Ministre du Travail.",
    "Trois déclarations documentaires rythment la vie de l'entreprise : ouverture d'activité, engagement/départ d'un travailleur (quinze jours), situation annuelle de la main-d'œuvre et bilan social (art. 216 à 218).",
    "Aucune autorisation préalable n'est requise pour constituer un syndicat (art. 231), qui doit toutefois être enregistré au Ministère du Travail ; il ne peut jamais être dissous ou suspendu par voie administrative (art. 252).",
    "Le licenciement d'un délégué du personnel est soumis à la condition suspensive de l'approbation de l'Inspecteur du Travail (art. 258), avec un préavis doublé (minimum trois mois) et une protection étendue aux candidats non élus pendant six mois.",
    "La convention collective peut être plus favorable que la loi, jamais moins (art. 274) ; une fois étendue par le Ministre après avis d'une commission paritaire, elle s'impose à tout le secteur visé, signataire ou non (art. 287 et 290).",
  ],
  references: [
    {
      genre: 'ouvrage',
      auteur: 'Loko Mantuono G.',
      titre: 'Droit social, droit du travail et de la sécurité sociale en RDC',
      editeur: "L'Harmattan",
      lieu: 'Paris',
      annee: '2022',
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : Loi n°015/2002 du 16 octobre 2002 portant Code du travail, art. 185 à 296, telle que modifiée par la loi n°16/010 du 15 juillet 2016',
}

export default chapitre
