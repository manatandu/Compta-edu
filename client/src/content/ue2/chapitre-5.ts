// Chapitre 5 du module UE2, Droit des sociétés : contenu pur.
// Migré depuis l'ancienne page dédiée UE2Chapitre5Page.tsx vers le moteur
// commun components/chapitre/ChapitreManuscrit.tsx, avec vérification
// article par article sur le texte de l'AUSCGIE révisé (livre SARL
// intégral, art. 309 à 384, plus art. 159, 189-191, 200-205 et 853-13).
// Corrections apportées à cette occasion : conventions interdites à
// l'art. 356 (et non 367, qui traite de la réduction du capital) ;
// cessions entre conjoints, ascendants et descendants libres à défaut de
// clause statutaire (art. 318, l'ancienne page inventait une « analogie
// jurisprudentielle » avec le régime des tiers) ; unanimité de l'art. 359
// couvrant la transformation en SNC ET en SAS ainsi que le transfert du
// siège hors OHADA ; expertise de gestion ouverte à 1/10 du capital
// (art. 159) et non 1/5 ; révocation judiciaire du gérant fondée sur
// l'art. 326 al. 3 (et non « 337 ») ; SARL-U régie par les art. 334, 347
// et 357 (l'« art. 334-1 » n'existe pas) ; transformation conditionnée
// par les art. 374-375 (capitaux propres ≥ capital, rapport du CAC) ;
// CAC de la SAS exigeant deux des trois seuils (art. 853-13), comme la
// SARL ; effets de la fusion fondés sur l'art. 191.
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1', question: "Selon l'Art. 309 AUSCGIE, quelle est la définition exacte de la SARL ?",
    options: [
      { id: 'a', texte: "Société où les associés sont responsables indéfiniment et solidairement" },
      { id: 'b', texte: "Société dans laquelle les associés ne sont responsables qu'à concurrence de leurs apports, droits représentés par des parts sociales" },
      { id: 'c', texte: "Société où les droits sont représentés par des actions" },
      { id: 'd', texte: "Société réservée aux personnes physiques uniquement" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 309 AUSCGIE',
    explication: "L'Art. 309 AUSCGIE définit la SARL comme une société dans laquelle les associés ne sont responsables des dettes sociales qu'à concurrence de leurs apports et dont les droits sont représentés par des parts sociales.",
  },
  {
    id: 'q2', question: "Quel est le capital minimum légal d'une SARL en RDC ?",
    options: [
      { id: 'a', texte: "1 000 000 FCFA (règle supplétive AUSCGIE)" },
      { id: 'b', texte: "Capital librement fixé par les associés (arrêtés interministériels RDC de 2014)" },
      { id: 'c', texte: "5 000 000 FCFA" },
      { id: 'd', texte: "10 000 000 FCFA" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 311 AUSCGIE + arrêtés RDC du 30/12/2014',
    explication: "L'Art. 311 AUSCGIE fixe le capital à 1 000 000 FCFA au moins « sauf dispositions nationales contraires ». La RDC a usé de cette réserve : les arrêtés interministériels n° 002 et n° 243 du 30/12/2014 ont rendu le capital de la SARL librement fixé par les associés.",
  },
  {
    id: 'q3', question: "La valeur nominale minimale d'une part sociale de SARL est de :",
    options: [
      { id: 'a', texte: "1 000 FCFA" },
      { id: 'b', texte: "5 000 FCFA" },
      { id: 'c', texte: "10 000 FCFA" },
      { id: 'd', texte: "Aucun minimum légal" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 311 AUSCGIE',
    explication: "L'Art. 311 AUSCGIE dispose que le capital est divisé en parts sociales égales dont la valeur nominale ne peut être inférieure à cinq mille (5 000) francs CFA.",
  },
  {
    id: 'q4', question: "La SARL peut-elle être constituée par une seule personne ?",
    options: [
      { id: 'a', texte: "Non, minimum 2 associés" },
      { id: 'b', texte: "Oui, par une personne physique ou morale (SARL unipersonnelle)" },
      { id: 'c', texte: "Non, minimum 3 associés" },
      { id: 'd', texte: "Oui, mais seulement une personne physique" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 309 al. 2 AUSCGIE',
    explication: "L'Art. 309 al. 2 AUSCGIE dispose que la SARL peut être instituée par une personne physique ou morale, ou entre deux ou plusieurs personnes physiques ou morales. La SARL unipersonnelle est donc pleinement admise.",
  },
  {
    id: 'q5', question: "Quelle est la durée du mandat du gérant en l'absence de disposition statutaire ?",
    options: [
      { id: 'a', texte: "2 ans" },
      { id: 'b', texte: "3 ans" },
      { id: 'c', texte: "4 ans" },
      { id: 'd', texte: "6 ans" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 324 AUSCGIE',
    explication: "L'Art. 324 AUSCGIE dispose qu'en l'absence de dispositions statutaires, le ou les gérants sont nommés pour quatre (4) ans. Ils sont rééligibles.",
  },
  {
    id: 'q6', question: "Quelle fraction des parts représentant des apports en numéraire doit être libérée à la souscription dans une SARL ?",
    options: [
      { id: 'a', texte: "La totalité (100%)" },
      { id: 'b', texte: "Au moins 1/4" },
      { id: 'c', texte: "Au moins 1/2" },
      { id: 'd', texte: "Au moins 3/4" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 311-1 AUSCGIE',
    explication: "L'Art. 311-1 AUSCGIE impose que les parts représentant des apports en numéraire soient libérées, lors de la souscription du capital, de la moitié au moins de leur valeur nominale, le surplus intervenant en une ou plusieurs fois dans un délai de deux (2) ans à compter de l'immatriculation. Les parts représentant des apports en nature sont, elles, intégralement libérées.",
  },
  {
    id: 'q7', question: "À défaut de clause statutaire, la cession de parts sociales à un tiers étranger à la SARL requiert le consentement de :",
    options: [
      { id: 'a', texte: "La majorité simple des associés" },
      { id: 'b', texte: "La majorité des associés non cédants représentant les 3/4 des parts sociales, déduction faite des parts du cédant" },
      { id: 'c', texte: "L'unanimité des associés" },
      { id: 'd', texte: "Le gérant seul" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 319 AUSCGIE',
    explication: "L'Art. 319 AUSCGIE laisse d'abord les statuts organiser librement la transmission à des tiers. À défaut, la cession n'est possible qu'avec le consentement de la majorité des associés non cédants représentant les trois quarts des parts sociales, déduction faite des parts de l'associé cédant. Le projet est notifié par le cédant à la société et à chacun des associés ; le silence gardé trois mois vaut consentement.",
  },
  {
    id: 'q8', question: "La révocation du gérant sans juste motif ouvre droit à :",
    options: [
      { id: 'a', texte: "Rien, la révocation est libre (ad nutum)" },
      { id: 'b', texte: "Dommages et intérêts" },
      { id: 'c', texte: "La nullité de la révocation" },
      { id: 'd', texte: "Un préavis obligatoire de 6 mois" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 326 AUSCGIE',
    explication: "L'Art. 326 AUSCGIE rend le gérant, statutaire ou non, révocable par décision des associés représentant plus de la moitié des parts sociales. Si la révocation est décidée sans juste motif, elle peut donner lieu à dommages et intérêts. Le gérant est en outre révocable par la juridiction compétente, pour juste motif, à la demande de tout associé.",
  },
  {
    id: 'q9', question: "Pour modifier les statuts de la SARL, quelle majorité est requise ?",
    options: [
      { id: 'a', texte: "Majorité simple (50%+1)" },
      { id: 'b', texte: "Majorité des 2/3" },
      { id: 'c', texte: "Au moins les 3/4 du capital social" },
      { id: 'd', texte: "L'unanimité" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 358 AUSCGIE',
    explication: "L'Art. 358 AUSCGIE dispose que les modifications des statuts sont décidées par les associés représentant au moins les trois quarts du capital social. Toute délibération contraire est nulle (Art. 360-1).",
  },
  {
    id: 'q10', question: "Quand les capitaux propres deviennent inférieurs à la moitié du capital social, que doit faire le gérant dans les 4 mois ?",
    options: [
      { id: 'a', texte: "Dissoudre immédiatement la société" },
      { id: 'b', texte: "Consulter les associés sur l'opportunité de la dissolution anticipée" },
      { id: 'c', texte: "Saisir le tribunal de commerce" },
      { id: 'd', texte: "Réduire le capital social" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 371 AUSCGIE',
    explication: "L'Art. 371 AUSCGIE impose au gérant ou, le cas échéant, au commissaire aux comptes, de consulter les associés sur l'opportunité de prononcer la dissolution anticipée, dans les quatre (4) mois qui suivent l'approbation des comptes ayant fait apparaître que les capitaux propres sont devenus inférieurs à la moitié du capital social.",
  },
  {
    id: 'q11', question: "Les clauses statutaires limitant les pouvoirs du gérant sont-elles opposables aux tiers de bonne foi ?",
    options: [
      { id: 'a', texte: "Oui, elles s'imposent à tous" },
      { id: 'b', texte: "Oui, si elles ont été publiées au RCCM" },
      { id: 'c', texte: "Non, elles sont inopposables aux tiers de bonne foi" },
      { id: 'd', texte: "Oui, uniquement pour les actes hors objet social" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 329 AUSCGIE',
    explication: "L'Art. 329 AUSCGIE investit le gérant des pouvoirs les plus étendus vis-à-vis des tiers ; la société est engagée même par ses actes qui ne relèvent pas de l'objet social, à moins qu'elle ne prouve que le tiers savait ou ne pouvait ignorer le dépassement - la seule publication des statuts ne suffisant pas à constituer cette preuve. Les clauses statutaires limitant ces pouvoirs sont inopposables aux tiers de bonne foi.",
  },
  {
    id: 'q12', question: "L'action sociale en responsabilité contre le gérant peut être intentée par les associés représentant :",
    options: [
      { id: 'a', texte: "Plus de la moitié des parts" },
      { id: 'b', texte: "Au moins le tiers des associés et le tiers des parts" },
      { id: 'c', texte: "Le quart des associés et le quart des parts" },
      { id: 'd', texte: "L'unanimité des associés non gérants" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 331 AUSCGIE',
    explication: "L'Art. 331 AUSCGIE permet aux associés représentant le quart des associés et le quart des parts sociales d'intenter, individuellement ou en se groupant, l'action sociale en responsabilité contre le gérant. Aucune clause statutaire ne peut subordonner cette action à un avis préalable de l'assemblée ni y faire renoncer par avance.",
  },
  {
    id: 'q13', question: "La SARL est-elle dissoute en cas de faillite d'un associé ?",
    options: [
      { id: 'a', texte: "Oui, comme la SNC" },
      { id: 'b', texte: "Non : la SARL n'est pas dissoute par l'interdiction, la faillite ou l'incapacité d'un associé, ni - sauf clause contraire - par son décès" },
      { id: 'c', texte: "Oui, si l'associé est gérant" },
      { id: 'd', texte: "Oui, si l'associé détient plus de 50% des parts" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 384 AUSCGIE',
    explication: "L'Art. 384 AUSCGIE dispose que la SARL n'est pas dissoute en cas d'interdiction, faillite ou incapacité d'un associé et que, sauf clause contraire des statuts, elle n'est pas non plus dissoute par le décès d'un associé. C'est ce qui la rapproche des sociétés de capitaux et la distingue de la SNC.",
  },
  {
    id: 'q14', question: "Un gérant associé veut fixer lui-même sa rémunération en assemblée. Peut-il voter ?",
    options: [
      { id: 'a', texte: "Oui, il a le droit de vote comme tout associé" },
      { id: 'b', texte: "Oui, mais avec un plafond de voix" },
      { id: 'c', texte: "Non, ses voix ne sont pas prises en compte pour le calcul de la majorité" },
      { id: 'd', texte: "Non, la délibération est automatiquement nulle même sans son vote" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 325 AUSCGIE',
    explication: "L'Art. 325 AUSCGIE écarte le gérant associé du vote de la délibération relative à sa rémunération : ses voix ne sont pas prises en compte pour le calcul de la majorité, et toute délibération prise en violation de cette règle est nulle. La règle ne s'applique pas à la SARL unipersonnelle, et la fixation de la rémunération n'est pas soumise au régime des conventions réglementées.",
  },
  {
    id: 'q15', question: "Dans quels cas l'unanimité des associés de SARL est-elle requise ?",
    options: [
      { id: 'a', texte: "Pour toute modification des statuts" },
      { id: 'b', texte: "Augmentation des engagements des associés, transformation en SNC ou en SAS, transfert du siège dans un État non partie à l'OHADA (Art. 359)" },
      { id: 'c', texte: "Uniquement pour la dissolution anticipée" },
      { id: 'd', texte: "Jamais : les 3/4 suffisent toujours" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 359 AUSCGIE',
    explication: "L'Art. 359 AUSCGIE exige l'unanimité dans trois cas : 1°) l'augmentation des engagements des associés ; 2°) la transformation de la société en société en nom collectif ou en société par actions simplifiée ; 3°) le transfert du siège social dans un État autre qu'un État partie.",
  },
  {
    id: 'q16', question: "La durée du mandat du commissaire aux comptes dans une SARL est de :",
    options: [
      { id: 'a', texte: "6 exercices" },
      { id: 'b', texte: "3 exercices" },
      { id: 'c', texte: "4 exercices" },
      { id: 'd', texte: "1 exercice renouvelable" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 379 AUSCGIE',
    explication: "L'Art. 379 AUSCGIE dispose que le commissaire aux comptes est nommé pour trois (3) exercices par un ou plusieurs associés représentant plus de la moitié du capital social ; à défaut de cette majorité et sauf clause contraire, il est nommé à la majorité des votes émis.",
  },
  {
    id: 'q17', question: "La décision d'augmenter le capital d'une SARL par incorporation de réserves est adoptée par les associés représentant :",
    options: [
      { id: 'a', texte: "L'unanimité" },
      { id: 'b', texte: "Au moins 3/4 du capital" },
      { id: 'c', texte: "Au moins la moitié des parts sociales (dérogation de l'Art. 360)" },
      { id: 'd', texte: "La majorité simple des votes émis" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 360 AUSCGIE',
    explication: "Par dérogation à l'Art. 358 (3/4), l'Art. 360 AUSCGIE permet de décider l'augmentation du capital par incorporation de bénéfices, de réserves ou de primes d'apports, d'émission ou de fusion à la majorité des associés représentant au moins la moitié des parts sociales.",
  },
  {
    id: 'q18', question: "Pour être opposable aux tiers, le nantissement des parts sociales d'une SARL doit être :",
    options: [
      { id: 'a', texte: "Approuvé par l'AGO" },
      { id: 'b', texte: "Constaté par acte notarié ou acte sous seing privé signifié à la société, et publié au RCCM" },
      { id: 'c', texte: "Validé par le commissaire aux comptes" },
      { id: 'd', texte: "Enregistré auprès de l'administration fiscale" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 322 AUSCGIE',
    explication: "L'Art. 322 AUSCGIE exige, pour l'opposabilité aux tiers, que le nantissement des parts soit constaté par un acte notarié ou par acte sous seing privé signifié à la société et publié au RCCM. Le consentement de la société à un projet de nantissement emporte agrément du cessionnaire en cas de réalisation forcée, sauf rachat sans délai par la société en vue de réduire son capital.",
  },
  {
    id: 'q19', question: "Lors d'une fusion de SARL par absorption, la société absorbée est :",
    options: [
      { id: 'a', texte: "Liquidée avant la fusion" },
      { id: 'b', texte: "Transformée en filiale" },
      { id: 'c', texte: "Dissoute sans liquidation, son patrimoine étant transmis à titre universel à la société absorbante" },
      { id: 'd', texte: "Maintenue en qualité de société en sommeil" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 189 et 191 AUSCGIE',
    explication: "L'Art. 191 AUSCGIE dispose que la fusion entraîne la dissolution sans liquidation des sociétés qui disparaissent et la transmission universelle de leur patrimoine aux sociétés bénéficiaires, les associés des sociétés qui disparaissent acquérant la qualité d'associés des sociétés bénéficiaires. L'Art. 382 rend applicables aux fusions de SARL les articles 672, 676, 679, 688 et 689.",
  },
  {
    id: 'q20', question: "La SARL doit obligatoirement nommer un CAC si elle remplit :",
    options: [
      { id: 'a', texte: "Au moins 1 des 3 conditions légales" },
      { id: 'b', texte: "Au moins 2 des 3 conditions légales (Art. 376)" },
      { id: 'c', texte: "Les 3 conditions cumulativement" },
      { id: 'd', texte: "Dès lors que le capital dépasse 5 millions FCFA" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 376 AUSCGIE',
    explication: "L'Art. 376 AUSCGIE impose au moins un commissaire aux comptes aux SARL remplissant, à la clôture de l'exercice, deux des trois conditions suivantes : total du bilan supérieur à 125 000 000 FCFA, chiffre d'affaires annuel supérieur à 250 000 000 FCFA, effectif permanent supérieur à 50 personnes. Sous les seuils, la nomination reste facultative mais peut être demandée en justice par des associés détenant au moins le dixième du capital.",
  },
  {
    id: 'n1', question: "Qui peut exiger la réunion d'une assemblée d'associés de SARL ?",
    options: [
      { id: 'a', texte: "Uniquement le gérant" },
      { id: 'b', texte: "Des associés détenant la moitié des parts, ou le quart des associés détenant le quart des parts ; tout associé peut en outre demander en justice un mandataire ad hoc (Art. 337)" },
      { id: 'c', texte: "Uniquement le commissaire aux comptes" },
      { id: 'd', texte: "Tout associé, quel que soit le nombre de parts, sans condition" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 337 AUSCGIE',
    explication: "L'Art. 337 AUSCGIE confie la convocation au gérant, mais un ou plusieurs associés détenant la moitié des parts sociales - ou, s'ils représentent au moins le quart des associés, le quart des parts - peuvent exiger la réunion d'une assemblée. Tout associé peut demander en justice la désignation d'un mandataire ad hoc chargé de convoquer l'assemblée, et le commissaire aux comptes peut y procéder après avoir vainement requis le gérant.",
  },
  {
    id: 'n2', question: "En assemblée ordinaire, la majorité de plus de la moitié du capital n'est pas atteinte. Que se passe-t-il ?",
    options: [
      { id: 'a', texte: "La décision est définitivement rejetée" },
      { id: 'b', texte: "Sauf clause contraire, les associés sont convoqués ou consultés une seconde fois et les décisions sont prises à la majorité des votes émis - mais la révocation du gérant exige toujours la majorité absolue (Art. 349)" },
      { id: 'c', texte: "Le gérant tranche seul" },
      { id: 'd', texte: "Le juge est automatiquement saisi" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 349 AUSCGIE',
    explication: "L'Art. 349 AUSCGIE prévoit que les décisions ordinaires sont adoptées par les associés représentant plus de la moitié du capital ; si cette majorité n'est pas obtenue et sauf clause contraire, une seconde consultation permet de statuer à la majorité des votes émis, quelle que soit la proportion de capital représentée. La révocation des gérants ne peut toutefois, dans tous les cas, intervenir qu'à la majorité absolue.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '5.1',
    titre: 'Définition, nature hybride et capital (Art. 309-316)',
    navLabel: '5.1 Définition et capital',
    blocs: [
      { type: 'paragraphe', texte: "La **société à responsabilité limitée (SARL)** est la forme la plus répandue en zone OHADA pour les PME et les entreprises familiales. Sa nature est **hybride** : comme dans la SA, la responsabilité des associés est limitée aux apports ; comme dans les sociétés de personnes, la cession des parts à un tiers est filtrée par un agrément, trace d'un *intuitu personae* modéré." },
      { type: 'filet', titre: 'Art. 309 AUSCGIE', texte: "« La société à responsabilité limitée est une société dans laquelle les associés ne sont responsables des dettes sociales qu'à concurrence de leurs apports et dont les droits sont représentés par des parts sociales. » Elle peut être instituée par **une personne physique ou morale**, ou entre deux ou plusieurs personnes physiques ou morales (al. 2) : la SARL unipersonnelle est admise. Sa dénomination est précédée ou suivie des mots *« société à responsabilité limitée »* ou du sigle *« S.A.R.L. »* (Art. 310)." },
      { type: 'carte', titre: 'Capital et libération', tableau: { entetes: ['Paramètre', 'Règle AUSCGIE', 'Règle RDC', 'Article'], lignes: [
        ['Capital minimum', "1 000 000 FCFA, « sauf dispositions nationales contraires »", 'Libre - arrêtés interministériels n° 002 et n° 243 du 30/12/2014', 'Art. 311'],
        ["Valeur nominale d'une part", 'Parts égales, nominal ≥ 5 000 FCFA', 'Identique', 'Art. 311'],
        ["Nombre d'associés", '1 ou plusieurs (SARL unipersonnelle admise)', 'Identique', 'Art. 309'],
        ['Libération du numéraire', 'Moitié au moins à la souscription ; surplus dans les 2 ans de l\'immatriculation', 'Identique', 'Art. 311-1'],
        ['Apports en nature', 'Souscription intégrale et libération intégrale', 'Identique', 'Art. 311-1'],
        ['Dépôt des fonds', "Immédiat, contre récépissé, en banque, établissement de crédit ou de microfinance agréé, ou chez un notaire ; indisponibles jusqu'à l'immatriculation, restituables sur autorisation judiciaire après 6 mois", 'Identique', 'Art. 313-314'],
      ] } },
      { type: 'paragraphe', texte: "**Le commissaire aux apports (Art. 312).** Les statuts contiennent l'évaluation de chaque apport en nature. Cette évaluation est contrôlée par un commissaire aux apports dès que la valeur de l'apport considéré, ou de l'ensemble des apports en nature, dépasse **cinq millions (5 000 000) de FCFA** - le contrôle étant toujours obligatoire pour les avantages particuliers. À défaut de commissaire, ou si la valeur retenue diffère de la sienne, les associés sont **solidairement responsables pendant cinq (5) ans**, à l'égard des tiers, de la valeur attribuée aux apports." },
      { type: 'carte', titre: 'La nature hybride : SNC / SARL / SA', tableau: { entetes: ['Critère', 'SNC', 'SARL', 'SA'], lignes: [
        ['Responsabilité des associés', 'Illimitée et solidaire', '**Limitée aux apports**', 'Limitée aux apports'],
        ['Titres', 'Parts sociales', 'Parts sociales', 'Actions (négociables)'],
        ['Cession à un tiers', 'Unanimité (Art. 274)', 'Majorité des associés non cédants aux 3/4 des parts (Art. 319)', 'Libre en principe (Art. 764)'],
        ['Intuitu personae', 'Fort', 'Modéré', 'Faible'],
        ['Décès ou faillite d\'un associé', 'Dissolution en principe (Art. 290-291)', 'Pas de dissolution - sauf clause contraire pour le décès (Art. 384)', 'Pas de dissolution'],
      ] } },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[3] },
    ],
  },
  {
    numero: '5.2',
    titre: 'Les parts sociales : cession, décès, nantissement (Art. 317-322)',
    navLabel: '5.2 Cession des parts',
    blocs: [
      { type: 'paragraphe', texte: "La part sociale n'est **pas négociable** : sa cession suit un régime écrit et gradué selon la qualité du cessionnaire. La cession entre vifs doit être constatée par écrit ; elle n'est opposable à la société qu'après signification par exploit d'huissier (ou notification établissant sa réception effective), acceptation dans un acte authentique, ou dépôt d'un original au siège contre attestation du gérant - et aux tiers qu'après ces formalités, modification des statuts et publicité au RCCM (Art. 317)." },
      { type: 'carte', titre: 'Trois régimes de cession', tableau: { entetes: ['Cession', 'Régime à défaut de clause statutaire', 'Article'], lignes: [
        ['Entre associés', '**Libre** - les statuts peuvent l\'organiser autrement', 'Art. 318'],
        ['Entre conjoints, ascendants et descendants', '**Libre** - les statuts peuvent prévoir des modalités', 'Art. 318'],
        ['À des tiers étrangers à la société', "Consentement de la **majorité des associés non cédants représentant les 3/4 des parts**, déduction faite des parts du cédant ; projet notifié par le cédant à la société et à chaque associé ; silence de 3 mois = consentement acquis", 'Art. 319'],
        ['Aux héritiers en cas de décès', "Libre, sauf clause d'agrément statutaire - dont les délais et la majorité ne peuvent être plus stricts que ceux de l'Art. 319", 'Art. 321'],
      ] }, note: "Toute cession intervenue en violation des clauses statutaires ou, à défaut, des règles légales est **nulle** (Art. 318, 319, 321)." },
      { type: 'filet', titre: "Le refus d'agrément (Art. 319-320)", texte: "Si la société refuse de consentir à la cession, les associés sont **indéfiniment et solidairement tenus**, dans les trois (3) mois de la notification du refus, d'acquérir les parts à un prix fixé, à défaut d'accord, par expert nommé par la juridiction compétente - délai prorogeable une seule fois par le juge, sans excéder cent vingt (120) jours, les sommes dues portant alors intérêt au taux légal. La société peut aussi, avec le consentement du cédant, racheter les parts en réduisant son capital. Si aucune solution n'intervient dans les délais, **l'associé cédant peut librement réaliser la cession initialement prévue** ou renoncer et conserver ses parts (Art. 320)." },
      { type: 'paragraphe', texte: "**Le nantissement des parts (Art. 322).** Lorsque la société consent à un projet de nantissement dans les conditions prévues pour la cession à des tiers, ce consentement emporte agrément du cessionnaire en cas de réalisation forcée des parts régulièrement nanties - à moins que la société ne préfère racheter sans délai les parts en vue de réduire son capital. Pour être opposable aux tiers, le nantissement est constaté par acte notarié ou par acte sous seing privé **signifié à la société et publié au RCCM**." },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[17] },
    ],
  },
  {
    numero: '5.3',
    titre: 'La gérance de la SARL (Art. 323-332)',
    navLabel: '5.3 La gérance',
    blocs: [
      { type: 'paragraphe', texte: "La SARL est gérée par **une ou plusieurs personnes physiques, associées ou non** (Art. 323). Le gérant est nommé dans les statuts ou dans un acte postérieur - dans ce second cas, à la majorité des associés représentant **plus de la moitié du capital**, sauf clause exigeant une majorité supérieure. En l'absence de dispositions statutaires, il est nommé pour **quatre (4) ans**, rééligible (Art. 324)." },
      { type: 'carte', titre: 'Le statut du gérant', tableau: { entetes: ['Question', 'Règle', 'Article'], lignes: [
        ['Rémunération', "Fonctions gratuites ou rémunérées par les statuts ou décision collective ; le gérant associé ne vote pas sur sa propre rémunération (délibération contraire nulle) ; la fixation n'est pas soumise au régime des conventions réglementées", 'Art. 325'],
        ['Révocation par les associés', 'Décision des associés représentant plus de la moitié des parts ; sans juste motif, elle peut donner lieu à dommages et intérêts', 'Art. 326'],
        ['Révocation judiciaire', "Par la juridiction compétente, pour juste motif, à la demande de **tout** associé", 'Art. 326 al. 3'],
        ['Démission', "Libre ; si elle est faite sans juste motif, la société peut demander en justice réparation du préjudice", 'Art. 327'],
        ['Pouvoirs entre associés', "Tous les actes de gestion dans l'intérêt de la société ; en cas de pluralité, chacun agit séparément avec droit d'opposition avant conclusion, l'opposition étant sans effet à l'égard des tiers sauf connaissance", 'Art. 328'],
        ['Pouvoirs vis-à-vis des tiers', "Pouvoirs les plus étendus ; la société est engagée même par les actes hors objet social, sauf preuve que le tiers savait ou ne pouvait ignorer (la seule publication des statuts ne suffit pas) ; clauses limitatives inopposables aux tiers de bonne foi", 'Art. 329'],
      ] } },
      { type: 'filet', titre: 'La responsabilité du gérant (Art. 330-332)', texte: "Les gérants sont responsables, individuellement ou solidairement, envers la société ou envers les tiers, des infractions aux dispositions légales applicables aux SARL, des violations des statuts et des fautes de gestion (Art. 330). Outre l'action individuelle en réparation du préjudice personnel, les associés représentant **le quart des associés et le quart des parts sociales** peuvent intenter l'**action sociale** ; aucune clause ne peut la subordonner à l'avis préalable de l'assemblée ni y faire renoncer par avance, et aucune décision d'assemblée ne peut éteindre cette action (Art. 331). Prescription : **trois (3) ans** à compter du fait dommageable ou de sa révélation, **dix (10) ans** si le fait est qualifié de crime (Art. 332)." },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[11] },
    ],
  },
  {
    numero: '5.4',
    titre: 'Décisions collectives et droits des associés (Art. 333-349)',
    navLabel: '5.4 Décisions collectives',
    blocs: [
      { type: 'paragraphe', texte: "La SARL n'a pas de conseil d'administration : la souveraineté appartient directement aux associés. Les décisions collectives sont prises **en assemblée**, mais les statuts peuvent prévoir la **consultation écrite** pour toutes les décisions ou certaines d'entre elles - *excepté l'assemblée générale annuelle* (Art. 333). Chaque associé dispose d'un nombre de voix égal à celui de ses parts ; l'associé unique prend seul les décisions de la compétence de l'assemblée (Art. 334). Un associé peut se faire représenter par son conjoint (sauf si la société ne comprend que les deux époux) ou par un autre associé (sauf si les associés ne sont que deux), et par un tiers seulement si les statuts le permettent (Art. 334-336)." },
      { type: 'carte', titre: 'Convocation et tenue', liste: [
        "**Qui convoque ?** Le gérant ; à défaut, des associés détenant la moitié des parts - ou le quart des associés détenant le quart des parts - peuvent exiger la réunion ; tout associé peut demander en justice un mandataire ad hoc ; le commissaire aux comptes peut convoquer après avoir vainement requis le gérant (Art. 337).",
        "**Délai et formes** : 15 jours au moins avant la réunion, par lettre au porteur contre récépissé, lettre recommandée avec avis de réception, télécopie ou courrier électronique - ces deux derniers moyens supposant l'accord écrit préalable de l'associé (Art. 338).",
        "**Ordre du jour** : l'assemblée ne peut délibérer sur une question qui n'y est pas inscrite - mais elle peut, en toutes circonstances, révoquer le gérant et le remplacer (Art. 338-1).",
        "**Consultation écrite** : texte des résolutions et documents adressés à chaque associé ; délai minimal de 15 jours à compter de la réception pour voter (Art. 340).",
        "**Sanctions** : l'assemblée irrégulièrement convoquée peut être annulée, sauf si tous les associés étaient présents ou représentés (Art. 339) ; procès-verbal signé par chacun des associés présents (Art. 342).",
      ] },
      { type: 'paragraphe', texte: "**Les droits des associés.** Ils disposent d'un **droit d'information permanent** sur les affaires sociales (Art. 344). Avant l'assemblée annuelle, le droit de communication porte sur les états financiers, le rapport de gestion, le texte des résolutions et, le cas échéant, les rapports du commissaire aux comptes, et s'exerce durant les **quinze jours** précédant l'assemblée ; dès la communication, tout associé peut poser par écrit des questions auxquelles le gérant répond **au cours de l'assemblée** (Art. 345). À toute époque, l'associé obtient copie des documents des trois derniers exercices, et tout associé non gérant peut, **deux fois par exercice**, poser par écrit des questions sur tout fait de nature à compromettre la continuité de l'exploitation, la réponse étant communiquée au commissaire aux comptes (Art. 345). Enfin, des associés représentant au moins **le dixième du capital** peuvent demander en justice une expertise de gestion (Art. 159)." },
      { type: 'filet', titre: 'Le dividende et la réserve légale (Art. 346)', texte: "La répartition des bénéfices s'effectue conformément aux statuts. Il est obligatoirement constitué, sur le bénéfice diminué des pertes antérieures, une dotation d'**un dixième au moins** affectée à la **réserve légale**, jusqu'à ce que celle-ci atteigne **le cinquième du capital social** - toute délibération contraire est nulle. La répétition des dividendes ne correspondant pas à des bénéfices réellement acquis peut être exigée des associés qui les ont reçus ; l'action se prescrit par trois (3) ans à compter de la mise en distribution." },
      { type: 'carte', titre: 'Les majorités dans la SARL', tableau: { entetes: ['Décision', 'Majorité', 'Article'], lignes: [
        ['Décisions ordinaires (comptes, nomination du gérant et du CAC, conventions, autorisations statutaires)', "Plus de la moitié du capital ; sur seconde consultation et sauf clause contraire, majorité des votes émis", 'Art. 347, 349'],
        ['Révocation du gérant', '**Toujours** à la majorité absolue', 'Art. 349 al. 3'],
        ['Modification des statuts', 'Au moins les 3/4 du capital social', 'Art. 358'],
        ["Augmentation de capital par incorporation de bénéfices, réserves ou primes", 'Au moins la moitié des parts sociales', 'Art. 360'],
        ["Augmentation des engagements, transformation en SNC ou en SAS, transfert du siège hors de l'espace OHADA", '**Unanimité**', 'Art. 359'],
        ["Agrément d'une cession à un tiers", 'Majorité des associés non cédants représentant les 3/4 des parts (hors parts du cédant)', 'Art. 319'],
      ] }, note: "L'assemblée annuelle se réunit dans les six (6) mois de la clôture de l'exercice, délai prorogeable par la juridiction compétente ; à défaut, le ministère public ou tout associé peut faire enjoindre le gérant sous astreinte (Art. 348). Les délibérations violant ces règles sont nulles (Art. 349, 360-1)." },
      { type: 'controle', question: QCM[20] },
      { type: 'controle', question: QCM[21] },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[16] },
    ],
  },
  {
    numero: '5.5',
    titre: 'Conventions, commissaire aux comptes et capitaux propres (Art. 350-356, 371-373, 376-381)',
    navLabel: '5.5 Conventions et contrôle',
    blocs: [
      { type: 'carte', titre: 'Les trois régimes de conventions', tableau: { entetes: ['Type', 'Champ', 'Procédure et sanction', 'Article'], lignes: [
        ['Libres', "Opérations courantes conclues à des conditions normales", 'Aucune formalité', 'Art. 352'],
        ['Réglementées', "Conventions entre la société et l'un de ses gérants ou associés, directement ou par personne interposée ; conventions avec une entreprise individuelle ou une société dont un dirigeant est simultanément gérant ou associé de la SARL", "Rapport du gérant ou du CAC à l'assemblée annuelle (contenu détaillé par l'Art. 353) ; l'associé concerné ne vote pas (Art. 354) ; les conventions non approuvées produisent leurs effets, à charge pour le gérant ou l'associé d'en supporter les conséquences préjudiciables (Art. 355)", 'Art. 350-355'],
        ['Interdites', "Emprunts auprès de la société, découverts en compte courant, cautionnements ou avals de leurs engagements par la société - pour les personnes physiques gérantes ou associées, leurs conjoints, ascendants, descendants et personnes interposées", '**Nullité du contrat**', 'Art. 356'],
      ] }, note: "Dans la SARL unipersonnelle, la convention conclue avec l'associé unique est seulement mentionnée sur le registre des délibérations (Art. 350 dernier al.)." },
      { type: 'filet', titre: 'Le commissaire aux comptes de la SARL (Art. 376-381)', texte: "La désignation d'au moins un commissaire aux comptes s'impose aux SARL remplissant, à la clôture de l'exercice, **deux des trois conditions** suivantes : total du bilan supérieur à **125 000 000 FCFA**, chiffre d'affaires annuel supérieur à **250 000 000 FCFA**, effectif permanent supérieur à **50 personnes** - l'obligation cessant après deux exercices sous les seuils (Art. 376). Sous les seuils, la nomination est facultative mais peut être **demandée en justice** par des associés détenant au moins le dixième du capital. Le commissaire est nommé pour **trois (3) exercices** par des associés représentant plus de la moitié du capital (Art. 379) ; les délibérations prises sur le rapport d'un commissaire irrégulièrement nommé sont nulles (Art. 380). Mêmes seuils que la SAS (Art. 853-13) ; dans la SA, en revanche, le commissaire est toujours obligatoire." },
      { type: 'paragraphe', texte: "**La perte de la moitié du capital (Art. 371-373).** Si, du fait des pertes constatées dans les états financiers, les capitaux propres deviennent **inférieurs à la moitié du capital social**, le gérant - ou le commissaire aux comptes - doit, dans les **quatre (4) mois** suivant l'approbation des comptes ayant fait apparaître la perte, consulter les associés sur l'opportunité de prononcer la **dissolution anticipée**. Si la dissolution est écartée, la société doit, dans les **deux (2) ans** suivant la clôture de l'exercice déficitaire, **reconstituer ses capitaux propres** jusqu'à la moitié au moins du capital - à défaut, réduire son capital du montant des pertes non imputables sur les réserves, sans descendre sous le minimum légal (Art. 372). Faute de consultation ou de reconstitution dans les délais, **tout intéressé** peut demander en justice la dissolution, l'action s'éteignant si la cause a disparu au jour où le juge statue sur le fond (Art. 373)." },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[19] },
    ],
  },
  {
    numero: '5.6',
    titre: 'Capital, transformation, fusion et dissolution (Art. 357-370, 374-375, 382-384)',
    navLabel: '5.6 Transformation et dissolution',
    blocs: [
      { type: 'paragraphe', texte: "**Augmentation du capital (Art. 360-365).** L'augmentation par apports en numéraire suit le régime de la constitution : dépôt des fonds en banque ou chez un notaire, libération de la **moitié au moins** à la souscription et du surplus dans les **deux ans** (Art. 361, 361-1) ; si l'augmentation n'est pas réalisée dans les six mois du premier dépôt, tout souscripteur peut demander en justice la restitution des fonds (Art. 362). Pour les apports en nature, un **commissaire aux apports** est désigné dès que la valeur excède 5 000 000 FCFA - il peut aussi être nommé par la juridiction à la demande de tout associé - et l'apporteur ne prend pas part au vote (Art. 363-364). **Réduction du capital (Art. 366-370)** : elle ne peut porter atteinte à l'égalité des associés ; l'achat de ses propres parts par la société est interdit, sauf autorisation donnée au gérant d'acheter un nombre déterminé de parts pour les annuler dans le cadre d'une réduction non motivée par des pertes ; les créanciers antérieurs peuvent former **opposition dans les trente (30) jours** de la publication, et les opérations ne peuvent commencer pendant ce délai." },
      { type: 'filet', titre: 'La transformation (Art. 374-375, 359)', texte: "La SARL peut se transformer en société d'une autre forme sans création d'une personne morale nouvelle. Deux conditions de fond : la société doit avoir, au moment de la transformation, des **capitaux propres au moins égaux à son capital social**, et la transformation ne peut être faite qu'au vu d'un **rapport d'un commissaire aux comptes** certifiant que cette condition est remplie - toute transformation contraire est **nulle** (Art. 374-375). Majorités : 3/4 du capital pour la transformation en SA (modification des statuts, Art. 358), qui suppose aussi d'atteindre le capital minimum de 10 000 000 FCFA de la forme cible (Art. 387) ; **unanimité** pour la transformation en SNC ou en SAS (Art. 359)." },
      { type: 'paragraphe', texte: "**Fusion et scission (Art. 382-383).** Les articles 672, 676, 679, 688 et 689 s'appliquent aux fusions et scissions de SARL au profit de sociétés de même forme. La fusion entraîne la **dissolution sans liquidation** des sociétés qui disparaissent et la **transmission universelle** de leur patrimoine aux sociétés bénéficiaires, leurs associés devenant associés des bénéficiaires, avec une soulte éventuelle plafonnée à 10% de la valeur d'échange (Art. 189, 191). Lorsque la fusion crée une SARL nouvelle, celle-ci peut être constituée sans autre apport que celui des sociétés qui fusionnent (Art. 383)." },
      { type: 'carte', titre: 'Dissolution et liquidation', liste: [
        "**Causes communes** (Art. 200) : expiration de la durée, réalisation ou extinction de l'objet, annulation du contrat de société, décision des associés aux conditions des modifications statutaires (donc 3/4 du capital), dissolution anticipée judiciaire pour justes motifs (inexécution de ses obligations par un associé, mésentente empêchant le fonctionnement normal), liquidation des biens, causes statutaires.",
        "**Causes écartées** (Art. 384) : la SARL n'est pas dissoute par l'interdiction, la faillite ou l'incapacité d'un associé, ni - sauf clause contraire des statuts - par le décès d'un associé.",
        "**Effets** : la dissolution n'a d'effet à l'égard des tiers qu'à compter de sa publication ; elle entraîne de plein droit la mise en liquidation, la mention « société en liquidation » figurant sur tous les actes destinés aux tiers (Art. 201, 204).",
        "**Personnalité morale** : elle subsiste pour les besoins de la liquidation, jusqu'à la publication de la clôture de celle-ci (Art. 205).",
        "**Boni de liquidation** : après réalisation de l'actif et apurement du passif, les associés reprennent leurs apports, l'excédent étant réparti - sauf clause contraire - proportionnellement à leurs droits.",
      ] },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[18] },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[5] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: "Constitution d'une SARL en RDC",
    contexte: "M. BATAMBA et Mme LUKOMBO souhaitent créer ensemble une SARL pour exploiter un salon de coiffure à Kinshasa. Ils prévoient un capital de 500 000 CDF, divisé en 100 parts de 5 000 CDF chacune. M. BATAMBA apporte 300 000 CDF en numéraire et Mme LUKOMBO apporte son matériel de coiffure évalué à 200 000 CDF. Ils souhaitent nommer M. BATAMBA comme gérant.",
    questions: [
      { num: 1, enonce: "Le capital de 500 000 CDF est-il conforme au droit OHADA applicable en RDC ?", correction: "Oui. L'Art. 311 AUSCGIE fixe le minimum à 1 000 000 FCFA « sauf dispositions nationales contraires ». La RDC a usé de cette réserve par les arrêtés interministériels n° 002 et n° 243 du 30/12/2014, qui rendent le capital de la SARL librement fixé par les associés. Un capital de 500 000 CDF est donc valable." },
      { num: 2, enonce: "La valeur nominale des parts (5 000 CDF) est-elle conforme ?", correction: "Oui. L'Art. 311 AUSCGIE exige des parts sociales égales dont la valeur nominale ne peut être inférieure à 5 000 FCFA. Les 100 parts de 5 000 CDF respectent ce plancher et forment bien le capital de 500 000 CDF." },
      { num: 3, enonce: "Quelles règles de libération s'appliquent aux apports de chacun ?", correction: "Apport en nature de Mme LUKOMBO : les parts représentant des apports en nature doivent être intégralement libérées (Art. 311-1 al. 1). Son évaluation figure dans les statuts ; un commissaire aux apports ne serait obligatoire que si la valeur excédait 5 000 000 FCFA (Art. 312) - ce qui n'est pas le cas -, mais à défaut de commissaire, les associés répondent solidairement pendant 5 ans, envers les tiers, de la valeur attribuée. Apport en numéraire de M. BATAMBA : libération de la moitié au moins à la souscription, soit 150 000 CDF, le solde dans les deux ans de l'immatriculation (Art. 311-1) ; les fonds sont déposés immédiatement contre récépissé et restent indisponibles jusqu'à l'immatriculation (Art. 313-314)." },
      { num: 4, enonce: "M. BATAMBA peut-il être nommé gérant ? Par quelle procédure ?", correction: "Oui. La SARL est gérée par une ou plusieurs personnes physiques, associées ou non (Art. 323) : M. BATAMBA, personne physique associée, est éligible. La nomination se fait dans les statuts ou dans un acte postérieur - dans ce cas par décision des associés représentant plus de la moitié du capital, sauf clause exigeant plus. À défaut de précision statutaire, son mandat sera de quatre (4) ans, renouvelable (Art. 324)." },
    ],
  },
  {
    id: 'cp2',
    titre: 'Cession de parts à un tiers',
    contexte: "La SARL PHARMA-CONGO a 5 associés dont M. MUKADI qui détient 30 parts sur 100. M. MUKADI souhaite vendre ses 30 parts à un ami, M. TSHIAMALA, qui est extérieur à la société. Les statuts ne contiennent aucune clause sur les cessions. Les autres associés hésitent à accepter cette cession.",
    questions: [
      { num: 1, enonce: "La cession à M. TSHIAMALA est-elle libre ou soumise à agrément ?", correction: "À défaut de clause statutaire, la cession à un tiers étranger à la société n'est possible qu'avec le consentement de la majorité des associés non cédants représentant les trois quarts des parts sociales, déduction faite des parts du cédant (Art. 319). M. MUKADI doit notifier le projet de cession à la société et à chacun des autres associés. Si la société n'a pas fait connaître sa décision dans les trois (3) mois de la dernière notification, le consentement est réputé acquis." },
      { num: 2, enonce: "Quelle majorité est requise pour agréer la cession ?", correction: "Il faut un double seuil : la majorité en nombre des associés non cédants (au moins 3 des 4 autres associés), représentant les 3/4 des parts hors celles du cédant. Les 4 autres associés détiennent 70 parts : 3/4 × 70 = 52,5, soit des associés totalisant au moins 53 parts. Un accord réunissant moins que cette double majorité vaut refus." },
      { num: 3, enonce: "Si le projet de cession est refusé, que se passe-t-il ?", correction: "Les associés sont indéfiniment et solidairement tenus, dans les trois (3) mois de la notification du refus, d'acquérir les parts à un prix fixé, à défaut d'accord, par un expert nommé par la juridiction compétente - le délai pouvant être prorogé une seule fois par le juge, sans excéder 120 jours, les sommes dues portant alors intérêt au taux légal (Art. 319). La société peut aussi, avec le consentement de M. MUKADI, racheter les parts en réduisant son capital. Si aucune de ces solutions n'intervient dans les délais, M. MUKADI peut librement réaliser la cession initialement prévue avec M. TSHIAMALA, ou y renoncer et conserver ses parts (Art. 320)." },
      { num: 4, enonce: "Quelle forme doit prendre la cession ?", correction: "La cession de parts entre vifs doit être constatée par écrit (Art. 317). Elle n'est opposable à la société qu'après l'une des formalités suivantes : signification par exploit d'huissier ou notification établissant sa réception effective, acceptation dans un acte authentique, ou dépôt d'un original au siège social contre attestation du gérant. Elle n'est opposable aux tiers qu'après cette formalité, la modification des statuts et la publicité au RCCM." },
    ],
  },
  {
    id: 'cp3',
    titre: 'Pouvoirs et révocation du gérant',
    contexte: "M. LOKWA est gérant de la SARL IMPORT-EXPORT LOMAMI. Les statuts stipulent qu'il ne peut pas contracter d'emprunt supérieur à 5 000 000 FCFA sans accord préalable des associés. Sans consulter personne, M. LOKWA signe un contrat de crédit bancaire de 8 000 000 FCFA avec une banque. Les associés, mécontents, décident de le révoquer lors d'une assemblée.",
    questions: [
      { num: 1, enonce: "La banque peut-elle se prévaloir du contrat de crédit de 8 000 000 FCFA ?", correction: "Oui. L'Art. 329 AUSCGIE dispose que les clauses statutaires limitant les pouvoirs du gérant sont inopposables aux tiers de bonne foi, et que la société est engagée même par les actes du gérant hors objet social, à moins qu'elle ne prouve que le tiers savait ou ne pouvait ignorer le dépassement - la seule publication des statuts ne suffisant pas à constituer cette preuve. Sauf preuve de la mauvaise foi de la banque, la SARL est engagée par le contrat." },
      { num: 2, enonce: "M. LOKWA peut-il être tenu responsable envers la société ?", correction: "Oui. En violant la clause statutaire, M. LOKWA commet une violation des statuts, source de responsabilité envers la société (Art. 330). Outre l'action individuelle de tout associé lésé, les associés représentant le quart des associés et le quart des parts peuvent intenter l'action sociale pour obtenir réparation de l'entier préjudice de la société (Art. 331), dans le délai de trois ans (Art. 332)." },
      { num: 3, enonce: "Comment révoque-t-on M. LOKWA ? Quelle majorité faut-il ?", correction: "Le gérant, statutaire ou non, est révocable par décision des associés représentant plus de la moitié des parts sociales (Art. 326) - la révocation pouvant même être décidée alors qu'elle n'est pas inscrite à l'ordre du jour (Art. 338-1). La révocation exige, dans tous les cas, la majorité absolue : la règle de la seconde consultation à la majorité des votes émis ne lui est pas applicable (Art. 349 al. 3)." },
      { num: 4, enonce: "M. LOKWA a-t-il droit à des dommages-intérêts si la révocation est brutale ?", correction: "L'Art. 326 al. 2 n'ouvre droit à dommages et intérêts que si la révocation est décidée sans juste motif. Or la violation délibérée d'une clause statutaire constitue un juste motif : les associés peuvent donc le révoquer sans s'exposer à indemnisation. À l'inverse, tout associé aurait aussi pu demander sa révocation en justice pour juste motif (Art. 326 al. 3)." },
    ],
  },
  {
    id: 'cp4',
    titre: 'Décisions collectives : majorités',
    contexte: "La SARL AGROBIO-CONGO a 4 associés : A (40 parts), B (30 parts), C (20 parts), D (10 parts) - total 100 parts. Ordre du jour de l'assemblée : (1) approbation des comptes N, (2) modification de l'objet social, (3) transformation de la SARL en SNC.",
    questions: [
      { num: 1, enonce: "Quelle majorité faut-il pour approuver les comptes de l'exercice N ?", correction: "L'approbation des états financiers est une décision ordinaire (Art. 347), adoptée par des associés représentant plus de la moitié du capital, soit plus de 50 parts (Art. 349). A + B = 70 parts > 50 : adoptée. A seul (40 parts) : rejetée en première consultation - mais, sauf clause contraire, une seconde consultation permettrait de statuer à la majorité des votes émis, quelle que soit la proportion de capital représentée." },
      { num: 2, enonce: "Quelle majorité faut-il pour modifier l'objet social ?", correction: "La modification de l'objet social modifie les statuts : décision extraordinaire prise par les associés représentant au moins les trois quarts du capital, soit 75 parts au minimum (Art. 358). A+B+C = 90 parts : suffisant ; A+B+D = 80 parts : suffisant ; A+B = 70 parts : insuffisant. Toute délibération contraire est nulle (Art. 360-1)." },
      { num: 3, enonce: "Quelle majorité faut-il pour la transformation en SNC ?", correction: "L'unanimité (Art. 359 2°), car la transformation en SNC fait passer les associés d'une responsabilité limitée à une responsabilité indéfinie et solidaire - une augmentation de leurs engagements qui ne peut jamais leur être imposée. Il faut donc l'accord de A, B, C et D : un seul refus bloque l'opération. Il faudrait en outre des capitaux propres au moins égaux au capital social et un rapport de commissaire aux comptes le certifiant (Art. 374-375)." },
    ],
  },
  {
    id: 'cp5',
    titre: 'CAC et capitaux propres dégradés',
    contexte: "La SARL TECHNO-CONGO clôture l'exercice N avec les données suivantes : total bilan = 150 000 000 FCFA, chiffre d'affaires = 200 000 000 FCFA, effectif = 60 salariés. Par ailleurs, lors de la clôture, les capitaux propres s'élèvent à 8 000 000 FCFA pour un capital social de 20 000 000 FCFA.",
    questions: [
      { num: 1, enonce: "La SARL TECHNO-CONGO est-elle obligée de nommer un CAC ?", correction: "Oui. L'Art. 376 impose un commissaire aux comptes dès que deux des trois conditions sont remplies à la clôture. Ici : bilan 150 M > 125 M (remplie) ; CA 200 M < 250 M (non remplie) ; effectif 60 > 50 (remplie). Deux conditions sur trois : la nomination d'au moins un commissaire aux comptes, pour trois exercices (Art. 379), est obligatoire." },
      { num: 2, enonce: "Les capitaux propres sont-ils dans une situation critique ?", correction: "Oui. Les capitaux propres (8 000 000 FCFA) sont inférieurs à la moitié du capital social (20 000 000 / 2 = 10 000 000 FCFA). Le dispositif de l'Art. 371 est déclenché dès lors que cette situation résulte des pertes constatées dans les états financiers de synthèse." },
      { num: 3, enonce: "Quelle est la procédure obligatoire ?", correction: "Le gérant - ou le commissaire aux comptes - doit, dans les quatre (4) mois suivant l'approbation des comptes ayant fait apparaître la perte, consulter les associés sur l'opportunité de prononcer la dissolution anticipée (Art. 371). Si la dissolution est écartée, la société doit, dans les deux (2) ans suivant la clôture de l'exercice déficitaire, reconstituer ses capitaux propres à hauteur de la moitié au moins du capital ; à défaut, réduire son capital du montant des pertes non imputées sur les réserves (Art. 372). Faute de consultation ou de reconstitution dans les délais, tout intéressé peut demander en justice la dissolution - l'action s'éteignant si la cause a disparu au jour où le juge statue (Art. 373)." },
    ],
  },
  {
    id: 'cp6',
    titre: 'Conventions réglementées et interdites',
    contexte: "Dans la SARL BATIMENT-KIVU, le gérant M. RWEMA est également associé (40 parts sur 100). Trois situations sont à analyser : (A) M. RWEMA loue son entrepôt personnel à la SARL pour 500 000 FCFA/mois ; (B) M. RWEMA emprunte 2 000 000 FCFA à la SARL ; (C) La SARL cautionne le prêt immobilier personnel de M. RWEMA auprès d'une banque.",
    questions: [
      { num: 1, enonce: "Situation A : la location de l'entrepôt est-elle une convention réglementée ?", correction: "Oui. La location d'un bien personnel du gérant à la société est une convention intervenue directement entre la société et l'un de ses gérants (Art. 350). Le gérant - ou le commissaire aux comptes s'il en existe un - présente à l'assemblée annuelle un rapport dont le contenu est détaillé par l'Art. 353 (identification des parties, nature, prix et modalités). M. RWEMA, associé concerné, ne prend pas part au vote et ses voix ne comptent pas pour la majorité (Art. 354). Même non approuvée, la convention produit ses effets, mais M. RWEMA supporte les conséquences préjudiciables pour la société (Art. 355)." },
      { num: 2, enonce: "Situation B : l'emprunt de M. RWEMA auprès de la SARL est-il autorisé ?", correction: "Non. L'Art. 356 AUSCGIE interdit aux personnes physiques gérantes ou associées de contracter, sous quelque forme que ce soit, des emprunts auprès de la société ou de se faire consentir par elle un découvert en compte courant, à peine de nullité du contrat. La nullité ne peut être couverte par une approbation des associés, et l'opération expose en outre son auteur à des sanctions pénales." },
      { num: 3, enonce: "Situation C : la caution bancaire est-elle autorisée ?", correction: "Non. Le même Art. 356 interdit de faire cautionner ou avaliser par la société les engagements des gérants ou associés personnes physiques envers les tiers - l'interdiction s'étendant à leurs conjoints, ascendants, descendants et personnes interposées. Le cautionnement consenti est nul : la banque ne peut pas s'en prévaloir contre la SARL." },
    ],
  },
  {
    id: 'cp7',
    titre: "Dissolution et liquidation d'une SARL",
    contexte: "Les associés de la SARL TRANSPORT-MANIEMA décident de dissoudre la société par anticipation. Le bilan au jour de la dissolution est : actif = 50 000 000 FCFA (dont créances 20 000 000 FCFA), passif exigible = 35 000 000 FCFA, capital = 10 000 000 FCFA, réserves = 5 000 000 FCFA. Un liquidateur est nommé. Associés : X (60%), Y (40%).",
    questions: [
      { num: 1, enonce: "Quelle majorité est nécessaire pour voter la dissolution anticipée ?", correction: "La société prend fin par décision des associés aux conditions prévues pour la modification des statuts (Art. 200 4°), soit au moins les trois quarts du capital (Art. 358). X seul (60%) est insuffisant ; Y seul (40%) aussi. Y ne pouvant fractionner son vote, la dissolution exige ici l'accord conjoint de X et de Y (100%)." },
      { num: 2, enonce: "Quelles sont les missions du liquidateur ?", correction: "Dès la dissolution, la société est en liquidation et la mention « société en liquidation », avec le nom du liquidateur, figure sur tous les actes destinés aux tiers (Art. 204). Le liquidateur réalise l'actif (recouvrement des 20 000 000 FCFA de créances, vente des autres biens), apure le passif exigible (35 000 000 FCFA), établit les comptes de liquidation et les soumet aux associés en vue de la clôture." },
      { num: 3, enonce: "Calculer le boni ou le mali de liquidation.", correction: "Actif net = 50 000 000 − 35 000 000 = 15 000 000 FCFA. Après remboursement des apports (capital de 10 000 000 FCFA), le boni de liquidation s'élève à 15 000 000 − 10 000 000 = 5 000 000 FCFA. Réparti proportionnellement aux droits : X reçoit 60% × 5 000 000 = 3 000 000 FCFA ; Y reçoit 40% × 5 000 000 = 2 000 000 FCFA." },
      { num: 4, enonce: "Quand la personnalité morale de la SARL prend-elle fin ?", correction: "La personnalité morale de la société subsiste pour les besoins de la liquidation, jusqu'à la publication de la clôture de celle-ci (Art. 205). La dissolution elle-même n'a d'effet à l'égard des tiers qu'à compter de sa publication (Art. 201). Jusque-là, la société continue d'exister sous la dénomination « SARL TRANSPORT-MANIEMA, société en liquidation »." },
    ],
  },
  {
    id: 'cp8',
    titre: 'SARL unipersonnelle',
    contexte: "Mme BIKELE crée seule une SARL unipersonnelle pour exercer une activité de conseil. Elle est à la fois associée unique et gérante. Elle souhaite louer à la société un bureau appartenant à sa mère. Elle veut aussi fixer sa propre rémunération de gérante.",
    questions: [
      { num: 1, enonce: "Comment Mme BIKELE prend-elle les décisions normalement réservées à l'assemblée générale ?", correction: "L'associé unique prend seul les décisions de la compétence de l'assemblée (Art. 334). Pour les décisions ordinaires comme extraordinaires, les Art. 347 et 357 renvoient au régime de la société unipersonnelle des Art. 558 à 561 : les décisions revêtent la forme de procès-verbaux versés aux archives de la société, et celles qui donneraient lieu à publicité si elles étaient prises par une assemblée sont publiées dans les mêmes formes. Aucune convocation ni quorum n'est requis." },
      { num: 2, enonce: "La règle d'abstention du gérant sur sa rémunération s'applique-t-elle ici ?", correction: "Non. L'Art. 325 écarte le gérant associé du vote sur sa rémunération, mais précise expressément que cette règle n'est pas applicable lorsque la société ne comprend qu'un seul associé. Mme BIKELE fixe donc librement sa rémunération en qualité d'associée unique - la fixation de la rémunération n'étant au demeurant pas soumise au régime des conventions réglementées." },
      { num: 3, enonce: "La location du bureau appartenant à sa mère est-elle soumise à une procédure particulière ?", correction: "Cela dépend. Le régime des conventions réglementées vise les conventions intervenues directement ou par personne interposée entre la société et l'un de ses gérants ou associés (Art. 350). Si la mère de Mme BIKELE agit comme personne interposée de la gérante-associée unique, la convention entre dans ce champ : s'agissant d'une convention conclue en réalité avec l'associée unique, il en est alors seulement fait mention sur le registre des délibérations (Art. 350 dernier al.). Si la mère contracte pour son propre compte, sans interposition, la convention est conclue avec un tiers ordinaire et échappe au dispositif - restant soumise au droit commun." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue2',
  numero: 5,
  id: 'ue2-ch5',
  titre: 'La société à responsabilité limitée (SARL)',
  sousTitre: 'Art. 309 à 384 AUSCGIE révisé du 30 janvier 2014',
  infoBulle: "La forme hybride du droit OHADA : responsabilité limitée aux apports, parts sociales non négociables, agrément des cessions à des tiers, gérance par une ou plusieurs personnes physiques.",
  loiRef: 'Art. 309-384 AUSCGIE',
  moduleLabel: 'UE 2 · Droit des sociétés',
  retourRoute: '/ue2-droit-societes',
  coursId: 'ue2-droit-societes',
  objectifs: [
    'Maîtriser la définition et la nature hybride de la SARL (Art. 309)',
    'Analyser les règles de libération des parts sociales, en numéraire et en nature (Art. 311-1 à 314)',
    "Appliquer le régime d'agrément des cessions de parts à un tiers (Art. 317-320)",
    'Comprendre la nomination, les pouvoirs, la responsabilité et la révocation du gérant (Art. 323-332)',
    'Calculer les majorités des décisions ordinaires et extraordinaires (Art. 349, 358-360)',
    'Distinguer les conventions libres, réglementées et interdites (Art. 350-356)',
    'Appliquer la procédure des capitaux propres inférieurs à la moitié du capital (Art. 371-373)',
    "Identifier les seuils du commissaire aux comptes et le régime de la transformation (Art. 374-376, 379)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "La SARL limite la responsabilité des associés à leurs apports et peut être unipersonnelle (Art. 309) ; capital de 1 000 000 FCFA sauf dispositions nationales contraires - libre en RDC depuis les arrêtés du 30/12/2014 -, parts égales de 5 000 FCFA au moins (Art. 311), numéraire libéré de moitié à la souscription et du solde sous deux ans (Art. 311-1).",
    "Les cessions entre associés et aux conjoints, ascendants et descendants sont libres à défaut de clause (Art. 318) ; la cession à un tiers exige, à défaut de clause, la majorité des associés non cédants représentant les 3/4 des parts hors celles du cédant, le silence de trois mois valant consentement, et le refus obligeant les associés à racheter dans les trois mois - faute de quoi le cédant retrouve sa liberté (Art. 319-320).",
    "Le gérant - personne physique, associée ou non, nommé pour 4 ans à défaut de clause - engage la société même au-delà de l'objet social et les clauses limitatives sont inopposables aux tiers de bonne foi (Art. 323-324, 329) ; il est révocable à la majorité absolue des parts, avec dommages-intérêts si la révocation est sans juste motif, et en justice pour juste motif à la demande de tout associé (Art. 326, 349).",
    "Décisions ordinaires : plus de la moitié du capital, puis majorité des votes émis sur seconde consultation (Art. 349) ; modifications des statuts : 3/4 du capital (Art. 358) ; incorporation de réserves : moitié des parts (Art. 360) ; unanimité pour l'augmentation des engagements, la transformation en SNC ou en SAS et le transfert du siège hors OHADA (Art. 359).",
    "L'action sociale contre le gérant appartient aux associés représentant le quart des associés et le quart des parts (Art. 331) ; l'expertise de gestion s'ouvre au dixième du capital (Art. 159) ; la réserve légale absorbe un dixième du bénéfice jusqu'au cinquième du capital (Art. 346).",
    "Conventions réglementées : rapport, vote sans l'intéressé, effets maintenus à charge du responsable (Art. 350-355) ; conventions interdites - emprunts, découverts, cautions au profit des gérants et associés personnes physiques et de leurs proches : nullité (Art. 356).",
    "Capitaux propres inférieurs à la moitié du capital : consultation des associés dans les 4 mois, reconstitution dans les 2 ans ou réduction du capital, dissolution judiciaire à la demande de tout intéressé à défaut (Art. 371-373).",
    "Le CAC devient obligatoire au franchissement de deux des trois seuils (bilan 125 M, CA 250 M, effectif 50) et son mandat est de trois exercices (Art. 376, 379) ; la transformation exige des capitaux propres au moins égaux au capital et un rapport de CAC (Art. 374-375) ; la SARL n'est pas dissoute par la faillite, l'interdiction, l'incapacité - ni, sauf clause contraire, par le décès - d'un associé (Art. 384).",
  ],
  references: [
    {
      genre: 'texte',
      intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)",
      precision: 'adopté le 30 janvier 2014 à Ouagadougou, art. 309 à 384 (SARL), art. 159, 189-191 et 200-205',
    },
    {
      genre: 'texte',
      intitule: 'Arrêtés interministériels n° 002 et n° 243 du 30 décembre 2014 (RDC)',
      precision: 'libéralisation du capital social de la SARL en République Démocratique du Congo',
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : AUSCGIE révisé du 30 janvier 2014, art. 309 à 384 · art. 159, 189-191, 200-205 · Arrêtés interministériels RDC n° 002 et n° 243 du 30/12/2014',
}

export default chapitre
