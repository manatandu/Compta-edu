// Chapitre 2 du module UE2, Droit des sociétés : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
//
// Réécriture approfondie (septembre 2026). Le chapitre 2 portait jusqu'ici sur
// la constitution des sociétés, désormais traitée en profondeur au chapitre 1.
// Il couvre la vie financière de la société, jusque-là absente du module.
// Sources lues pendant la rédaction :
// - AUSCGIE révisé du 30 janvier 2014, texte intégral des art. 81 à 96-1,
//   137 à 149, 263 à 269-7, 346, 546, 889, 890 et 890-1 (skill
//   auscgie-acte-uniforme) ;
// - AUDCIF du 26 janvier 2017, art. 2, 5, 7, 8, 11, 13, 23, 24, 111 et 113,
//   et fonctionnement des comptes 11, 12, 13 et 465 du SYSCOHADA révisé
//   (skill audcif-acte-uniforme) ;
// - loi n° 23/053 du 30 novembre 2023, art. 120 (retenue de 20 % sur les
//   revenus des capitaux mobiliers), et arrêté ministériel n° 008/CAB/MIN/
//   FINANCES/2025 du 19 février 2025 (skill fiscalite-rdc) ;
// - loi de finances n° 25/060 du 29 décembre 2025 pour l'exercice 2026,
//   dividende prioritaire des entreprises minières du portefeuille de l'État
//   (skill fiscalite-rdc, lecture du projet de loi : numéro d'article non
//   vérifié au Journal officiel, donc non cité) ;
// - loi n° 26/034 du 20 août 2026 relative aux marchés boursiers : procédure
//   d'adoption et contenu d'après Agence Ecofin (septembre 2026) et
//   Bankable (avril 2025) ; le texte de la loi n'a pas été lu, aucun de ses
//   articles n'est donc cité.
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch2-q1', question: "Qui établit et arrête les états financiers de synthèse à la clôture de l'exercice ?",
    options: [
      { id: 'a', texte: "L'assemblée générale des associés" },
      { id: 'b', texte: "Le commissaire aux comptes" },
      { id: 'c', texte: "Le gérant, le conseil d'administration ou l'administrateur général, selon le cas" },
      { id: 'd', texte: "Le greffier du RCCM" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 137 AUSCGIE',
    explication: "« À la clôture de chaque exercice, le gérant ou le conseil d'administration ou l'administrateur général, selon le cas, établit et arrête les états financiers de synthèse » (art. 137). L'assemblée les approuve ensuite ; le commissaire aux comptes les certifie ; il ne les établit pas.",
  },
  {
    id: 'ch2-q2', question: "Selon l'AUDCIF, l'exercice comptable :",
    options: [
      { id: 'a', texte: "est librement fixé par les statuts" },
      { id: 'b', texte: "est de douze mois et coïncide avec l'année civile" },
      { id: 'c', texte: "est de dix-huit mois au plus" },
      { id: 'd', texte: "commence à la date de l'immatriculation" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 7 AUDCIF',
    explication: "Les états financiers regroupent les informations « au moins une fois par an sur une période de douze mois, appelée exercice » et « l'exercice coïncide avec l'année civile » (art. 7). Seul le premier exercice peut être plus court (début au premier semestre) ou plus long (début au second semestre).",
  },
  {
    id: 'ch2-q3', question: "Un jeu complet d'états financiers annuels du Système normal comprend :",
    options: [
      { id: 'a', texte: "Le bilan et le compte de résultat" },
      { id: 'b', texte: "Le bilan, le compte de résultat, le tableau des flux de trésorerie et les notes annexes" },
      { id: 'c', texte: "Le bilan, le compte de résultat et le rapport de gestion" },
      { id: 'd', texte: "La balance, le grand-livre et le journal" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 8 et 26 AUDCIF',
    explication: "« Un jeu complet d'états financiers annuels comprend le Bilan, le Compte de résultat, le Tableau des flux de trésorerie ainsi que les Notes annexes » (art. 8). Le rapport de gestion est un document distinct (art. 138 AUSCGIE) ; journal, grand-livre et balance sont des livres comptables (art. 19 AUDCIF).",
  },
  {
    id: 'ch2-q4', question: "Dans quel délai maximal les états financiers annuels doivent-ils être arrêtés ?",
    options: [
      { id: 'a', texte: "Deux mois après la clôture" },
      { id: 'b', texte: "Quatre mois après la clôture" },
      { id: 'c', texte: "Six mois après la clôture" },
      { id: 'd', texte: "Neuf mois après la clôture" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 23 AUDCIF',
    explication: "« Les états financiers annuels sont arrêtés au plus tard dans les quatre mois qui suivent la date de clôture de l'exercice » (art. 23 AUDCIF). Six mois est le délai de tenue de l'assemblée qui les approuve (art. 140 AUSCGIE), neuf mois celui de la mise en paiement des dividendes (art. 146).",
  },
  {
    id: 'ch2-q5', question: "Une SA doit réunir l'assemblée qui statue sur les états financiers de l'exercice clos le 31 décembre 2025 au plus tard :",
    options: [
      { id: 'a', texte: "Le 31 mars 2026" },
      { id: 'b', texte: "Le 30 avril 2026" },
      { id: 'c', texte: "Le 30 juin 2026" },
      { id: 'd', texte: "Le 30 septembre 2026" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 140 AUSCGIE',
    explication: "L'assemblée statuant sur les états financiers « doit obligatoirement se tenir dans les six (6) mois de la clôture de l'exercice » (art. 140 al. 2), soit le 30 juin 2026 pour un exercice clos le 31 décembre 2025. Les documents doivent être adressés au commissaire aux comptes quarante-cinq jours au moins avant l'assemblée (al. 1).",
  },
  {
    id: 'ch2-q6', question: "Le rapport de gestion doit notamment exposer :",
    options: [
      { id: 'a', texte: "Uniquement le montant du bénéfice" },
      { id: 'b', texte: "La situation de l'exercice, son évolution prévisible, les événements postérieurs à la clôture, les perspectives de continuation, la trésorerie et le plan de financement" },
      { id: 'c', texte: "La liste nominative des salariés" },
      { id: 'd', texte: "Le détail des rémunérations de chaque associé" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 138 AUSCGIE',
    explication: "L'art. 138 impose un rapport de gestion exposant « la situation de la société durant l'exercice écoulé, son évolution prévisible, les événements importants survenus entre la date de clôture de l'exercice et la date à laquelle il est établi et, en particulier, les perspectives de continuation de l'activité, l'évolution de la situation de trésorerie et le plan de financement ».",
  },
  {
    id: 'ch2-q7', question: "Quels engagements hors bilan l'état annexé doit-il obligatoirement recenser selon l'AUSCGIE ?",
    options: [
      { id: 'a', texte: "Les cautionnements, avals et garanties donnés, ainsi que les sûretés réelles consenties" },
      { id: 'b', texte: "Les contrats de travail en cours" },
      { id: 'c', texte: "Les commandes clients non livrées" },
      { id: 'd', texte: "Aucun : les engagements hors bilan ne sont jamais publiés" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 139 AUSCGIE',
    explication: "Figurent dans l'état annexé « 1°) un état des cautionnements, avals et garanties donnés par la société ; 2°) un état des sûretés réelles consenties par la société » (art. 139). Ces engagements ne figurent pas au bilan mais peuvent peser lourdement sur la solvabilité.",
  },
  {
    id: 'ch2-q8', question: "Dans une SARL, la dotation à la réserve légale est :",
    options: [
      { id: 'a', texte: "Facultative" },
      { id: 'b', texte: "D'un vingtième au moins du bénéfice, jusqu'au dixième du capital" },
      { id: 'c', texte: "D'un dixième au moins du bénéfice diminué des pertes antérieures, jusqu'au cinquième du capital" },
      { id: 'd', texte: "De la moitié du bénéfice, sans plafond" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 346 al. 2 AUSCGIE (SARL) ; art. 546, 2° (SA)',
    explication: "Est obligatoirement constituée, sur le bénéfice de l'exercice diminué le cas échéant des pertes antérieures, une dotation égale à un dixième au moins affectée à la réserve légale ; elle cesse d'être obligatoire lorsque la réserve atteint le cinquième du capital, et toute délibération contraire est nulle (art. 346 al. 2 pour la SARL, art. 546, 2° pour la SA).",
  },
  {
    id: 'ch2-q9', question: "Comment se calcule le bénéfice distribuable ?",
    options: [
      { id: 'a', texte: "Résultat de l'exercice seulement" },
      { id: 'b', texte: "Résultat de l'exercice + report bénéficiaire - pertes antérieures - dividendes partiels - dotations aux réserves légales ou statutaires" },
      { id: 'c', texte: "Chiffre d'affaires - charges d'exploitation" },
      { id: 'd', texte: "Résultat + toutes les réserves, y compris la réserve légale" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 143 al. 1 AUSCGIE',
    explication: "« Le bénéfice distribuable est le résultat de l'exercice, augmenté du report bénéficiaire et diminué des pertes antérieures, des dividendes partiels régulièrement distribués ainsi que des sommes portées en réserve en application de la loi ou des statuts » (art. 143 al. 1).",
  },
  {
    id: 'ch2-q10', question: "Résultat de l'exercice : 50 ; report à nouveau créditeur : 10 ; pertes antérieures : 0 ; dotation à la réserve légale : 5. Le bénéfice distribuable est de :",
    options: [
      { id: 'a', texte: '50' },
      { id: 'b', texte: '55' },
      { id: 'c', texte: '60' },
      { id: 'd', texte: '45' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 143 al. 1 AUSCGIE',
    explication: "50 (résultat) + 10 (report bénéficiaire) - 5 (réserve légale) = 55. La réserve légale se calcule ici sur le bénéfice diminué des pertes antérieures, soit 10 % de 50 = 5 (art. 346 ou 546).",
  },
  {
    id: 'ch2-q11', question: "L'assemblée peut-elle distribuer des réserves ?",
    options: [
      { id: 'a', texte: "Non, jamais" },
      { id: 'b', texte: "Oui, toutes les réserves, y compris la réserve légale" },
      { id: 'c', texte: "Oui, à condition qu'elles ne soient pas indisponibles par la loi ou les statuts, en indiquant les postes prélevés" },
      { id: 'd', texte: "Oui, mais seulement en cas de perte de l'exercice" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 143 al. 2 et 3 AUSCGIE',
    explication: "L'assemblée peut décider la distribution de tout ou partie des réserves « à la condition qu'il ne s'agisse pas de réserves considérées comme indisponibles par la loi ou par les statuts », toute délibération contraire étant nulle, et elle « indique expressément les postes de réserve sur lesquels les prélèvements sont effectués ».",
  },
  {
    id: 'ch2-q12', question: "Capital : 100 ; réserve légale : 10 ; réserves statutaires indisponibles : 5 ; capitaux propres après la distribution envisagée : 110. La distribution est-elle possible ?",
    options: [
      { id: 'a', texte: "Oui, car les capitaux propres restent supérieurs au capital" },
      { id: 'b', texte: "Non, car les capitaux propres deviendraient inférieurs au capital augmenté des réserves non distribuables (115)" },
      { id: 'c', texte: "Oui, si l'assemblée statue à l'unanimité" },
      { id: 'd', texte: "Non, car aucune distribution n'est possible avant dix exercices" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 143 al. 4 AUSCGIE',
    explication: "Sauf réduction de capital, « aucune distribution ne peut être faite aux associés lorsque les capitaux propres sont ou deviendraient, à la suite de cette distribution, inférieurs au montant du capital augmenté des réserves que la loi ou les statuts ne permettent pas de distribuer » : ici 100 + 10 + 5 = 115 > 110. La délibération serait nulle.",
  },
  {
    id: 'ch2-q13', question: "Qu'est-ce qu'un dividende fictif ?",
    options: [
      { id: 'a', texte: "Un dividende promis mais jamais payé" },
      { id: 'b', texte: "Un dividende distribué en violation des règles de détermination des sommes distribuables" },
      { id: 'c', texte: "Un dividende payé en actions" },
      { id: 'd', texte: "Un dividende versé à un associé fictif" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 144 al. 3 AUSCGIE',
    explication: "« Tout dividende distribué en violation des règles énoncées au présent article est un dividende fictif » (art. 144). Il correspond en réalité à un prélèvement sur le capital ou sur des réserves indisponibles, au détriment des créanciers.",
  },
  {
    id: 'ch2-q14', question: "Dans une SARL, un dividende fictif peut-il être réclamé aux associés qui l'ont reçu ?",
    options: [
      { id: 'a', texte: "Non, les dividendes perçus sont définitivement acquis" },
      { id: 'b', texte: "Oui, par une action en répétition prescrite par trois ans à compter de la mise en distribution" },
      { id: 'c', texte: "Oui, pendant dix ans" },
      { id: 'd', texte: "Seulement si l'associé était de mauvaise foi" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 346 al. 3 et 4 AUSCGIE',
    explication: "« La répétition des dividendes, ne correspondant pas à des bénéfices réellement acquis, peut être exigée des associés qui les ont reçus », et « l'action en répétition se prescrit par le délai de trois (3) ans à compter de la date de mise en distribution du dividende » (art. 346).",
  },
  {
    id: 'ch2-q15', question: "Les dirigeants qui, sciemment et au moyen d'un inventaire frauduleux, répartissent des dividendes fictifs :",
    options: [
      { id: 'a', texte: "N'encourent qu'une responsabilité civile" },
      { id: 'b', texte: "Encourent une sanction pénale, la peine étant fixée par le droit national" },
      { id: 'c', texte: "Ne sont pas responsables si l'assemblée a voté la distribution" },
      { id: 'd', texte: "Sont automatiquement révoqués par le greffier" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 889 AUSCGIE',
    explication: "L'art. 889 range parmi les infractions la répartition sciemment opérée de dividendes fictifs en l'absence d'inventaire ou au moyen d'inventaire frauduleux. L'Acte uniforme définit l'infraction ; la peine relève du droit pénal de chaque État partie.",
  },
  {
    id: 'ch2-q16', question: "Qu'est-ce que le « premier dividende » ?",
    options: [
      { id: 'a', texte: "Le premier dividende versé après la constitution" },
      { id: 'b', texte: "Un dividende statutaire calculé comme un intérêt sur le montant libéré des titres, payable seulement s'il existe des bénéfices distribuables suffisants" },
      { id: 'c', texte: "Un intérêt fixe dû même en l'absence de bénéfice" },
      { id: 'd', texte: "Le dividende réservé à l'associé majoritaire" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 145 AUSCGIE',
    explication: "Les statuts peuvent prévoir un premier dividende, versé « dans la mesure où l'assemblée constate l'existence de bénéfices distribuables et à la condition que ces bénéfices soient suffisants pour en permettre le paiement » ; « il est calculé comme un intérêt sur le montant libéré des actions » (art. 145). Il n'est jamais garanti en l'absence de bénéfice.",
  },
  {
    id: 'ch2-q17', question: "Dans quel délai maximal les dividendes votés doivent-ils être mis en paiement ?",
    options: [
      { id: 'a', texte: "Un mois après l'assemblée" },
      { id: 'b', texte: "Six mois après la clôture de l'exercice" },
      { id: 'c', texte: "Neuf mois après la clôture de l'exercice, sauf prolongation judiciaire" },
      { id: 'd', texte: "Aucun délai" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 146 AUSCGIE',
    explication: "« Dans tous les cas, la mise en paiement des dividendes doit avoir lieu dans un délai maximum de neuf (9) mois après la clôture de l'exercice. La prolongation de ce délai peut être accordée par la juridiction compétente » (art. 146 al. 2).",
  },
  {
    id: 'ch2-q18', question: "Quelle écriture SYSCOHADA constate la décision de distribuer un dividende ?",
    options: [
      { id: 'a', texte: "Débit 465, crédit 521" },
      { id: 'b', texte: "Débit 131 (ou 121, 11), crédit 465 Associés, dividendes à payer" },
      { id: 'c', texte: "Débit 101, crédit 131" },
      { id: 'd', texte: "Débit 661, crédit 465" },
    ],
    reponseCorrecte: 'b', articleRef: 'SYSCOHADA révisé, comptes 11, 12, 13 et 465',
    explication: "Le compte 465 est « crédité des sommes dues à titre de dividendes, par le débit des comptes Résultat, Réserves, Report à nouveau », puis débité lors du règlement par le crédit de la trésorerie. Le dividende n'est pas une charge : il ne passe jamais par la classe 6.",
  },
  {
    id: 'ch2-q19', question: "En RDC, depuis le 1er janvier 2026, la société qui verse un dividende à une personne physique doit :",
    options: [
      { id: 'a', texte: "Verser le dividende brut, l'associé déclarant seul son revenu" },
      { id: 'b', texte: "Retenir l'IRPP de 20 % sur les revenus des capitaux mobiliers et le reverser au plus tard le 15 du mois suivant" },
      { id: 'c', texte: "Retenir 30 % d'impôt sur les sociétés" },
      { id: 'd', texte: "Payer une taxe de 1 % du chiffre d'affaires" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 120 et 126 de la loi n° 23/053 du 30 novembre 2023 ; art. 2 de l\'arrêté n° 008/CAB/MIN/FINANCES/2025',
    explication: "La retenue sur les revenus des capitaux mobiliers est de 20 % (art. 120 de la loi n° 23/053). Le débiteur du revenu calcule, retient et reverse l'impôt au plus tard le 15 du mois qui suit le versement ou la mise à disposition (art. 2 de l'arrêté n° 008/2025, en vigueur au 1er janvier 2026).",
  },
  {
    id: 'ch2-q20', question: "Dans quel délai les états financiers approuvés doivent-ils être déposés au RCCM ?",
    options: [
      { id: 'a', texte: "Dans les quinze jours de la clôture" },
      { id: 'b', texte: "Dans le mois qui suit leur approbation" },
      { id: 'c', texte: "Dans les six mois de la clôture" },
      { id: 'd', texte: "Le dépôt est facultatif" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 269 et 890-1 AUSCGIE',
    explication: "Les sociétés déposent au RCCM, « dans le mois qui suit leur approbation par l'organe compétent », leurs états financiers de synthèse ; en cas de refus d'approbation, une copie de la décision est déposée dans le même délai (art. 269). Le défaut de dépôt est pénalement sanctionné (art. 890-1).",
  },
  {
    id: 'ch2-q21', question: "Une société refuse depuis plus de trente jours de déposer ses états financiers malgré la demande d'un fournisseur. Que peut faire ce dernier ?",
    options: [
      { id: 'a', texte: "Rien, seul le ministère public peut agir" },
      { id: 'b', texte: "Demander au juge, statuant à bref délai, d'enjoindre au dirigeant de déposer sous astreinte" },
      { id: 'c', texte: "Demander la dissolution de la société" },
      { id: 'd', texte: "Consulter les comptes au siège social" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 269 al. 4 AUSCGIE',
    explication: "À la demande de tout intéressé, la juridiction compétente, statuant à bref délai, peut enjoindre sous astreinte au dirigeant de procéder au dépôt, « dès lors que la requête amiable du demandeur auprès de la société est restée vaine pendant trente (30) jours ».",
  },
  {
    id: 'ch2-q22', question: "Quelles sociétés peuvent adopter un capital variable ?",
    options: [
      { id: 'a', texte: "Toutes les sociétés commerciales" },
      { id: 'b', texte: "Les SA ne faisant pas appel public à l'épargne et les SAS" },
      { id: 'c', texte: "Uniquement les SARL" },
      { id: 'd', texte: "Uniquement les SA cotées" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 269-1 AUSCGIE',
    explication: "L'art. 269-1 permet de stipuler un capital variable dans les statuts « des sociétés anonymes ne faisant pas appel public à l'épargne et sociétés par actions simplifiées ». La société ajoute à sa forme les mots « à capital variable » (art. 269-2).",
  },
  {
    id: 'ch2-q23', question: "Dans une société à capital variable, le capital ne peut être réduit par reprise des apports en dessous :",
    options: [
      { id: 'a', texte: "De la moitié du capital statutaire" },
      { id: 'b', texte: "D'une somme fixée par les statuts, qui ne peut être inférieure ni au dixième du capital statutaire ni au minimum légal de la forme" },
      { id: 'c', texte: "De zéro" },
      { id: 'd', texte: "Du montant des réserves" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 269-5 AUSCGIE',
    explication: "Les statuts déterminent un plancher qui ne peut être inférieur « ni au dixième du capital social stipulé dans les statuts ni au montant minimal du capital exigé pour la forme de la société » ; toute réduction au-delà est nulle (art. 269-5).",
  },
  {
    id: 'ch2-q24', question: "Un associé se retire d'une société à capital variable. Reste-t-il tenu des dettes sociales ?",
    options: [
      { id: 'a', texte: "Non, il est libéré dès son retrait" },
      { id: 'b', texte: "Oui, pendant cinq ans, dans la limite des sommes qui lui ont été restituées" },
      { id: 'c', texte: "Oui, indéfiniment et sans limite" },
      { id: 'd', texte: "Oui, pendant un an seulement" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 269-6 al. 3 AUSCGIE',
    explication: "L'associé qui cesse de faire partie de la société « reste tenu, pendant cinq (5) ans, envers les associés et envers les tiers, de toutes les obligations existant au moment de son retrait », mais seulement « dans la limite des sommes qui lui ont été restituées avant son départ » (art. 269-6).",
  },
  {
    id: 'ch2-q25', question: "Une offre de titres adressée à 60 personnes physiques, pour un montant total de 30 000 000 FCFA sur douze mois, constitue-t-elle une offre au public ?",
    options: [
      { id: 'a', texte: "Oui, dès qu'il y a plus de dix destinataires" },
      { id: 'b', texte: "Non : le montant est inférieur à 50 000 000 FCFA sur douze mois" },
      { id: 'c', texte: "Oui, toute offre écrite est une offre au public" },
      { id: 'd', texte: "Cela dépend de l'accord du greffier" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 81-1 AUSCGIE',
    explication: "Ne constitue pas une offre au public l'offre dont le montant total est inférieur à 50 000 000 FCFA calculé sur douze mois (art. 81-1, a), ni celle adressée uniquement à des investisseurs qualifiés ou à moins de cent personnes autres que des investisseurs qualifiés (art. 81-1, b). Ici, les deux exemptions jouent.",
  },
  {
    id: 'ch2-q26', question: "Une SARL organise une souscription publique de parts sociales par voie de presse. Quelle est la sanction ?",
    options: [
      { id: 'a', texte: "Aucune, si le visa est obtenu" },
      { id: 'b', texte: "Une amende fiscale" },
      { id: 'c', texte: "La nullité de l'opération" },
      { id: 'd', texte: "La transformation automatique en SA" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 82 AUSCGIE',
    explication: "« Il est interdit aux sociétés n'y ayant pas été autorisées par le présent Acte uniforme de faire publiquement appel à l'épargne », et « toute opération effectuée en violation des dispositions du présent article est nulle » (art. 82). Seule la SA peut y recourir ; la SAS en est exclue (art. 853-4).",
  },
  {
    id: 'ch2-q27', question: "Qui délivre le visa du document d'information en l'absence d'organisme de contrôle de la bourse dans l'État du siège ?",
    options: [
      { id: 'a', texte: "Le greffier du RCCM" },
      { id: 'b', texte: "La CCJA" },
      { id: 'c', texte: "Le ministre chargé des finances" },
      { id: 'd', texte: "L'assemblée générale de la société" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 90 AUSCGIE',
    explication: "Le projet de document d'information est soumis au visa de l'organisme de contrôle de la bourse des valeurs de l'État du siège ; « en l'absence de cet organisme, il est soumis au visa du ministre chargé des finances » (art. 90). Le visa est accordé dans le mois suivant le récépissé, deux mois en cas d'investigations complémentaires.",
  },
  {
    id: 'ch2-q28', question: "Un fait nouveau significatif survient entre le visa et la clôture de l'offre. Un investisseur qui avait déjà souscrit :",
    options: [
      { id: 'a', texte: "Est définitivement engagé" },
      { id: 'b', texte: "Peut retirer son acceptation dans les trois jours ouvrables suivant la publication du supplément" },
      { id: 'c', texte: "Peut se retirer à tout moment pendant un an" },
      { id: 'd', texte: "Doit saisir le juge pour se retirer" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 92 AUSCGIE',
    explication: "L'émetteur établit un supplément soumis au visa ; « les investisseurs qui ont déjà accepté d'acheter des valeurs mobilières ou d'y souscrire avant que le supplément ne soit publié ont le droit de retirer leur acceptation, dans un délai de trois (3) jours ouvrables après la publication du supplément » (art. 92 al. 3).",
  },
  {
    id: 'ch2-q29', question: "Les entités qui font appel public à l'épargne établissent-elles des états financiers selon les normes IFRS ?",
    options: [
      { id: 'a', texte: "Non, seul le SYSCOHADA est admis" },
      { id: 'b', texte: "Oui, en remplacement des états SYSCOHADA" },
      { id: 'c', texte: "Oui, en sus des états SYSCOHADA, sans qu'ils puissent servir de base au bénéfice distribuable" },
      { id: 'd', texte: "Oui, et ils servent seuls de base au bénéfice distribuable" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 8 al. 3 et 4 AUDCIF',
    explication: "Les entités cotées ou faisant appel public à l'épargne établissent des états financiers selon les normes IFRS « en sus » des états SYSCOHADA ; ces états IFRS sont « destinés exclusivement aux marchés financiers » et « ne peuvent servir de support de base pour la détermination du bénéfice distribuable » (art. 8 AUDCIF).",
  },
  {
    id: 'ch2-q30', question: "Un litige entre deux associés d'une SARL au sujet du partage des dividendes peut être tranché :",
    options: [
      { id: 'a', texte: "Uniquement par le tribunal de commerce" },
      { id: 'b', texte: "Par la juridiction compétente, ou par arbitrage ou un autre mode alternatif de règlement des différends" },
      { id: 'c', texte: "Uniquement par le gérant" },
      { id: 'd', texte: "Uniquement par la CCJA en premier ressort" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 147 à 149 AUSCGIE',
    explication: "Le litige relève de la juridiction compétente (art. 147), mais peut aussi être soumis à l'arbitrage, par clause compromissoire statutaire ou non, par compromis, ou à d'autres modes alternatifs (art. 148) ; l'arbitrage suit l'Acte uniforme relatif au droit de l'arbitrage ou tout autre système convenu (art. 149).",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '2.1',
    titre: "L'exercice social et les états financiers de synthèse (Art. 137, 139 AUSCGIE ; Art. 7-13, 23-24 AUDCIF)",
    navLabel: "2.1 Exercice et états financiers",
    blocs: [
      { type: 'paragraphe', texte: "Une société commerciale vit au rythme de ses exercices. Chaque année, elle doit rendre compte à ses associés, aux tiers et à l'administration de ce qu'elle a fait des moyens qui lui ont été confiés. Le droit des sociétés organise cette reddition de comptes en renvoyant, pour son contenu technique, au droit comptable : « À la clôture de chaque exercice, le gérant ou le conseil d'administration ou l'administrateur général, selon le cas, établit et arrête les états financiers de synthèse conformément aux dispositions de l'Acte uniforme portant organisation et harmonisation des comptabilités des entreprises » (art. 137 AUSCGIE). Cet Acte uniforme du 24 mars 2000 a été abrogé et remplacé par l'Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF) du 26 janvier 2017, applicable aux comptes personnels depuis le 1er janvier 2018 (art. 112 et 113 AUDCIF). Le renvoi de l'art. 137 doit donc se lire aujourd'hui comme un renvoi à l'AUDCIF et au Système comptable OHADA révisé, le SYSCOHADA, qui lui est annexé (art. 5 AUDCIF)." },
      { type: 'intertitre', texte: "2.1.1 L'exercice et le jeu complet d'états financiers" },
      { type: 'paragraphe', texte: "L'AUDCIF définit d'abord l'exercice. Les états financiers regroupent les informations « au moins une fois par an sur une période de douze mois, appelée exercice », et « l'exercice coïncide avec l'année civile » (art. 7). Deux exceptions concernent le premier exercice : il peut être plus court que douze mois s'il débute au premier semestre de l'année civile, et plus long s'il débute au second semestre. Une société immatriculée le 15 mars 2026 clôturera donc son premier exercice le 31 décembre 2026, après neuf mois et demi ; une société immatriculée le 10 octobre 2026 pourra le clôturer le 31 décembre 2027, après près de quinze mois. En cas de cessation d'activité, la durée de la liquidation compte pour un seul exercice, sous réserve de situations annuelles provisoires. La règle de l'exercice civil, propre au droit OHADA, simplifie la comparaison entre entreprises et le travail de l'administration fiscale." },
      { type: 'filet', titre: "Texte de référence — AUDCIF, art. 8 : le jeu complet d'états financiers", texte: "« Un jeu complet d'états financiers annuels comprend le Bilan, le Compte de résultat, le Tableau des flux de trésorerie ainsi que les Notes annexes. Les états financiers forment un tout indissociable et décrivent de façon régulière et sincère les événements, opérations et situations de l'exercice pour donner une image fidèle du patrimoine, de la situation financière et du résultat de l'entité. »" },
      { type: 'paragraphe', texte: "Le bilan décrit séparément l'actif et le passif et fait apparaître distinctement les capitaux propres ; le compte de résultat récapitule les produits et les charges et fait apparaître en cascade les résultats intermédiaires puis le bénéfice ou la perte nette ; le tableau des flux de trésorerie retrace les entrées et sorties de liquidités ; les notes annexes complètent et précisent l'ensemble (art. 29 AUDCIF). On relèvera une discordance de vocabulaire entre les deux Actes uniformes : l'art. 269 AUSCGIE, rédigé en 2014, énumère encore « le bilan, le compte de résultat, le tableau financier des ressources et emplois et l'état annexé », selon la terminologie de l'ancien SYSCOHADA. Depuis 2018, le tableau financier des ressources et emplois (TAFIRE) a cédé la place au tableau des flux de trésorerie, et l'état annexé aux notes annexes. L'étudiant doit savoir lire l'art. 269 à la lumière du droit comptable en vigueur, qui est l'objet même du renvoi de l'art. 137." },
      { type: 'carte', titre: "Tableau 2.1 — Le système comptable applicable selon l'entité", tableau: { entetes: ['Système', 'Entités concernées', 'États à produire', 'Texte'], lignes: [
        ["Système normal", "Toute entité, sauf exception liée à sa taille", "Bilan, compte de résultat, tableau des flux de trésorerie, notes annexes", "Art. 11 et 26 AUDCIF"],
        ["Système minimal de trésorerie (SMT)", "Entités dont le chiffre d'affaires hors taxes est inférieur à 60 millions FCFA (négoce), 40 millions (artisanat) ou 30 millions (services), sauf option", "Bilan, compte de résultat, tableau de flux de trésorerie et notes, dressés à partir d'une comptabilité de trésorerie", "Art. 13 et 28 AUDCIF"],
        ["États IFRS en sus", "Entités dont les titres sont inscrits à une bourse ou qui font appel public à l'épargne", "États selon les normes IFRS, destinés aux marchés financiers, en plus des états SYSCOHADA", "Art. 8 al. 3 et 4 AUDCIF"],
        ["Hors SYSCOHADA", "Établissements de crédit et de microfinance, acteurs du marché financier, assurances, organismes de sécurité sociale, entités à but non lucratif", "Référentiels sectoriels", "Art. 5 al. 3 AUDCIF"],
      ] }, note: "Les seuils du SMT sont exprimés en FCFA « ou l'équivalent dans l'unité monétaire ayant cours légal dans l'État partie » : en RDC, ils se convertissent en francs congolais." },
      { type: 'intertitre', texte: "2.1.2 Les délais d'établissement et de dépôt" },
      { type: 'paragraphe', texte: "Deux délais encadrent cette production. Les états financiers « sont arrêtés au plus tard dans les quatre mois qui suivent la date de clôture de l'exercice » (art. 23 AUDCIF), et la date d'arrêté doit figurer dans toute transmission. Les livres, documents et pièces justificatives sont conservés pendant dix ans (art. 24). Le droit des sociétés ajoute une exigence de transparence sur les engagements qui n'apparaissent pas au bilan : l'état annexé, aujourd'hui les notes annexes, doit contenir « un état des cautionnements, avals et garanties donnés par la société » et « un état des sûretés réelles consenties par la société » (art. 139 AUSCGIE). Un associé ou un créancier qui ne regarderait que le bilan ignorerait que la société a garanti les dettes d'une filiale ou hypothéqué son usine ; l'art. 139 l'oblige à le dire." },
      { type: 'intertitre', texte: "2.1.3 L'image fidèle et sa sanction pénale" },
      { type: 'paragraphe', texte: "L'exigence centrale du droit comptable est l'image fidèle. L'AUDCIF en fait une présomption : « Toute entité qui applique correctement le Système comptable OHADA est réputée donner, dans ses états financiers, une image fidèle de sa situation et de ses opérations » (art. 10 al. 1). Mais la présomption n'est pas absolue : « Lorsque l'application d'une prescription comptable se révèle insuffisante ou inadaptée pour donner l'image fidèle, des informations complémentaires ou des justifications nécessaires sont obligatoirement fournies dans les Notes annexes » (art. 10 al. 2). Le dirigeant ne peut donc se retrancher derrière le respect formel des règles lorsqu'il sait que les comptes trompent sur la réalité ; il doit alors compléter l'information. Les états financiers doivent en outre être comparables d'un exercice à l'autre : le bilan d'ouverture correspond au bilan de clôture précédent, toute compensation non juridiquement fondée entre actif et passif ou entre charges et produits est interdite, et chaque poste comporte le chiffre de l'exercice précédent (art. 34 AUDCIF). Ces règles de forme sont essentielles pour les associés, qui apprécient la gestion en comparant les exercices." },
      { type: 'paragraphe', texte: "L'établissement de comptes fidèles n'est pas une simple obligation technique : il est pénalement sanctionné. L'AUDCIF range parmi les infractions le fait, pour les dirigeants, de ne pas avoir, pour chaque exercice, dressé l'inventaire et établi les états financiers ainsi que le rapport de gestion, et le fait d'avoir sciemment établi et communiqué des états financiers ne donnant pas une image fidèle du patrimoine, de la situation financière et du résultat (art. 111 AUDCIF). L'AUSCGIE incrimine de son côté la publication ou la présentation aux associés, en vue de dissimuler la véritable situation de la société, d'états financiers ne donnant pas une image fidèle (art. 890). Dans les deux cas, l'Acte uniforme définit l'infraction et renvoie au droit pénal national pour la peine." },
    ],
  },
  {
    numero: '2.2',
    titre: "Le rapport de gestion, le contrôle et l'approbation des comptes (Art. 138, 140, 141)",
    navLabel: '2.2 Rapport et approbation',
    blocs: [
      { type: 'intertitre', texte: "2.2.1 Le rapport de gestion et la permanence des méthodes" },
      { type: 'paragraphe', texte: "Aux états financiers, le dirigeant joint un rapport de gestion « dans lequel il expose la situation de la société durant l'exercice écoulé, son évolution prévisible, les événements importants survenus entre la date de clôture de l'exercice et la date à laquelle il est établi et, en particulier, les perspectives de continuation de l'activité, l'évolution de la situation de trésorerie et le plan de financement » (art. 138). Le rapport de gestion est tourné vers l'avenir : il doit permettre aux associés d'apprécier si la société pourra continuer son activité, ce qui rejoint la procédure d'alerte étudiée avec le fonctionnement des sociétés. Un gérant qui passerait sous silence la perte d'un contrat représentant la moitié du chiffre d'affaires, survenue en février après la clôture de décembre, manquerait à l'obligation d'exposer les événements postérieurs à la clôture." },
      { type: 'paragraphe', texte: "Toute modification de méthode doit être signalée : « Toute modification dans la présentation des états financiers de synthèse ou dans les méthodes d'évaluation, d'amortissement ou de provisions conformes au droit comptable doit être signalée dans le rapport de gestion et, le cas échéant, dans celui du commissaire aux comptes » (art. 141). La règle rejoint le principe comptable de permanence des méthodes (art. 9 AUDCIF) et l'obligation d'indiquer toute modification dans les notes annexes (art. 33 AUDCIF). Elle protège les associés contre un embellissement artificiel du résultat : passer d'un amortissement sur cinq ans à un amortissement sur dix ans divise par deux la dotation annuelle et gonfle mécaniquement le bénéfice, sans que la société se soit en rien enrichie." },
      { type: 'intertitre', texte: "2.2.2 Les erreurs découvertes après la clôture" },
      { type: 'paragraphe', texte: "Le droit comptable règle aussi le sort des erreurs découvertes après coup, question qui touche directement l'affectation du résultat. Une erreur commise et découverte au cours du même exercice se corrige par une inscription en négatif des éléments erronés, suivie de l'enregistrement exact ; mais « la correction d'une erreur significative commise au cours d'un exercice antérieur doit être opérée par ajustement du compte report à nouveau », et toute correction de cette nature fait l'objet d'une information dans les notes annexes (art. 20 AUDCIF). Ainsi, si l'on découvre en 2026 qu'une charge de 2024 a été omise, on ne l'impute pas sur le résultat de 2026, mais sur le report à nouveau : les capitaux propres sont corrigés sans fausser le résultat de l'exercice en cours. Pour l'assemblée, cela signifie que le report à nouveau qui entre dans le calcul du bénéfice distribuable (art. 143) peut avoir été modifié par une correction d'erreur, ce que les notes annexes doivent lui permettre de comprendre." },
      { type: 'intertitre', texte: "2.2.3 Le calendrier de l'approbation des comptes" },
      { type: 'filet', titre: "Texte de référence — AUSCGIE, art. 140", texte: "« Dans les sociétés anonymes, les sociétés par actions simplifiées et, le cas échéant, dans les sociétés à responsabilité limitée, les états financiers de synthèse annuels et le rapport de gestion sont adressés aux commissaires aux comptes, quarante-cinq (45) jours au moins avant la date de l'assemblée générale ordinaire. Ces documents sont présentés à l'assemblée générale de la société statuant sur les états financiers de synthèse qui doit obligatoirement se tenir dans les six (6) mois de la clôture de l'exercice. »" },
      { type: 'carte', titre: "Tableau 2.2 — Le calendrier de l'approbation des comptes", tableau: { entetes: ['Étape', 'Délai', 'Texte', 'Exemple (clôture au 31 décembre 2025)'], lignes: [
        ["Arrêté des états financiers par le dirigeant", "Au plus tard quatre mois après la clôture", "Art. 23 AUDCIF ; art. 137 AUSCGIE", "Au plus tard le 30 avril 2026"],
        ["Transmission au commissaire aux comptes", "45 jours au moins avant l'assemblée", "Art. 140 al. 1", "Au plus tard le 16 mai 2026 pour une assemblée le 30 juin"],
        ["Tenue de l'assemblée d'approbation", "Dans les six mois de la clôture", "Art. 140 al. 2", "Au plus tard le 30 juin 2026"],
        ["Dépôt des états financiers au RCCM", "Dans le mois qui suit l'approbation", "Art. 269", "Au plus tard le 30 juillet 2026 pour une approbation le 30 juin"],
        ["Mise en paiement des dividendes", "Au plus tard neuf mois après la clôture", "Art. 146", "Au plus tard le 30 septembre 2026"],
      ] } },
      { type: 'intertitre', texte: "2.2.4 Le contrôle du commissaire aux comptes" },
      { type: 'paragraphe', texte: "Le commissaire aux comptes, obligatoire dans la SA et, au-delà de certains seuils, dans la SARL et la SAS, vérifie la régularité et la sincérité des comptes et certifie qu'ils donnent une image fidèle ; son statut et sa mission sont étudiés avec la SA. Le délai de quarante-cinq jours lui laisse le temps d'accomplir ses diligences avant de présenter son rapport à l'assemblée. L'assemblée, enfin, approuve ou refuse d'approuver les comptes. L'approbation n'est pas une formalité : elle vaut reconnaissance par les associés de la gestion de l'exercice, et elle conditionne tout le reste, puisque l'affectation du résultat et la distribution de dividendes supposent des comptes approuvés (art. 144). En cas de refus d'approbation, la copie de la décision est déposée au RCCM dans le mois (art. 269 al. 2), et les dirigeants doivent présenter des comptes rectifiés ; aucun dividende ne peut être distribué sur la base de comptes non approuvés." },
    ],
  },
  {
    numero: '2.3',
    titre: "L'affectation du résultat et les réserves (Art. 142, 143 al. 2-3, 346, 546)",
    navLabel: '2.3 Affectation et réserves',
    blocs: [
      { type: 'paragraphe', texte: "Une fois les comptes approuvés, les associés décident du sort du résultat. « L'assemblée générale décide de l'affectation du résultat dans le respect des dispositions légales et statutaires. Elle constitue les dotations nécessaires à la réserve légale et aux réserves statutaires » (art. 142). Affecter un bénéfice, c'est choisir entre trois destinations : le garder dans la société sous forme de réserves, le distribuer aux associés sous forme de dividendes, ou en différer la décision en le portant au report à nouveau. Affecter une perte, c'est décider de l'imputer sur les réserves existantes ou de la reporter à nouveau, en attendant les bénéfices futurs. Cette décision relève des associés, et non des dirigeants, parce qu'elle touche directement à leurs droits patrimoniaux : le droit aux bénéfices ne naît que « lorsque leur distribution a été décidée » (art. 53, 1°)." },
      { type: 'intertitre', texte: "2.3.1 La nature des réserves" },
      { type: 'paragraphe', texte: "Les réserves sont des bénéfices laissés à la disposition de la société et non incorporés au capital. Le SYSCOHADA les enregistre au compte 11, subdivisé en réserve légale (111), réserves statutaires ou contractuelles (112), réserves réglementées (113) et autres réserves, dont les réserves facultatives (1181). Il distingue les réserves indisponibles, légales, réglementées et statutaires, et les réserves libres ou facultatives. La distinction est essentielle, puisque seules les réserves disponibles peuvent être distribuées. La réserve légale est la plus importante, et le législateur l'impose dans les deux formes les plus courantes." },
      { type: 'intertitre', texte: "2.3.2 La réserve légale" },
      { type: 'filet', titre: "Texte de référence — AUSCGIE, art. 346 al. 2 (SARL) et 546, 2° (SA) : la réserve légale", texte: "SARL : « Il est obligatoirement constitué sur le bénéfice de l'exercice diminué, le cas échéant, des pertes antérieures, une dotation égale à un dixième au moins affectée à la formation d'un fonds de réserve dit « réserve légale ». Cette dotation cesse d'être obligatoire lorsque la réserve atteint le cinquième du montant du capital social. Toute délibération prise en violation du présent alinéa est nulle. » La même règle figure à l'art. 546, 2°, pour l'assemblée générale ordinaire de la SA, « à peine de nullité de toute délibération contraire »." },
      { type: 'paragraphe', texte: "La réserve légale fonctionne comme un matelas de sécurité constitué progressivement : 10 % au moins du bénéfice de chaque exercice, après imputation des pertes antérieures, jusqu'à ce qu'elle atteigne 20 % du capital. Dans une SARL au capital de 50 000 000 FC, la réserve légale devra atteindre 10 000 000 FC ; tant que ce seuil n'est pas atteint, chaque exercice bénéficiaire l'alimente d'au moins un dixième de son bénéfice. Si la réserve descend sous ce seuil, par exemple parce qu'elle a été utilisée pour absorber une perte, l'obligation renaît. La dotation se calcule sur le bénéfice diminué des pertes antérieures : une société qui réalise 30 000 000 FC de bénéfice mais traîne 4 000 000 FC de pertes antérieures dotera au moins 2 600 000 FC, soit 10 % de 26 000 000 FC. La sanction de la nullité frappe toute délibération qui omettrait cette dotation ou la sous-évaluerait." },
      { type: 'intertitre', texte: "2.3.3 Les réserves statutaires et facultatives" },
      { type: 'paragraphe', texte: "Les statuts peuvent imposer d'autres réserves, dites statutaires, par exemple une réserve pour investissement ou une réserve de sécurité égale à un pourcentage du bénéfice. Elles sont, comme la réserve légale, indisponibles, tant que les statuts n'ont pas été modifiés. L'assemblée peut enfin, librement, doter des réserves facultatives (art. 144), qu'elle pourra ultérieurement distribuer. L'art. 143 al. 2 et 3 encadre cette distribution : l'assemblée « peut décider la distribution de tout ou partie des réserves à la condition qu'il ne s'agisse pas de réserves considérées comme indisponibles par la loi ou par les statuts », toute délibération contraire étant nulle, et elle « indique expressément les postes de réserve sur lesquels les prélèvements sont effectués ». Cette dernière exigence permet de vérifier que le prélèvement porte bien sur des réserves disponibles." },
      { type: 'intertitre', texte: "2.3.4 L'affectation d'une perte" },
      { type: 'paragraphe', texte: "L'affectation d'une perte obéit à une logique inverse. La perte de l'exercice est enregistrée au débit du compte 139 ; l'assemblée peut décider de l'imputer sur les réserves disponibles, ou la reporter à nouveau au compte 129, en attendant qu'elle soit absorbée par les bénéfices futurs. Tant que le report à nouveau débiteur subsiste, il réduit le bénéfice distribuable des exercices suivants (art. 143 al. 1) et la base de calcul de la réserve légale (art. 346 et 546). Lorsque les pertes s'accumulent au point que les capitaux propres deviennent inférieurs à la moitié du capital, le droit des sociétés impose une réaction : dans la SARL, le gérant ou le commissaire aux comptes doit, dans les quatre mois de l'approbation des comptes ayant fait apparaître la perte, consulter les associés sur l'opportunité d'une dissolution anticipée (art. 371) ; dans la SA, le conseil d'administration ou l'administrateur général convoque dans le même délai l'assemblée générale extraordinaire à cet effet (art. 664). L'affectation du résultat n'est donc pas qu'une question de partage : elle est aussi un instrument de surveillance de la santé financière de la société." },
      { type: 'carte', titre: "Tableau 2.3 — Les écritures d'affectation du résultat dans le SYSCOHADA", tableau: { entetes: ['Opération', 'Débit', 'Crédit'], lignes: [
        ["Dotation à la réserve légale", "131 Résultat net : bénéfice", "111 Réserve légale"],
        ["Dotation aux réserves statutaires et facultatives", "131", "112 Réserves statutaires ; 1181 Réserves facultatives"],
        ["Dividendes décidés", "131 (ou 121, ou 11 pour une distribution de réserves)", "465 Associés, dividendes à payer"],
        ["Bénéfice non affecté", "131", "121 Report à nouveau créditeur"],
        ["Imputation d'une perte antérieure sur le bénéfice", "131", "129 Report à nouveau débiteur"],
        ["Perte de l'exercice reportée", "129 Report à nouveau débiteur", "139 Résultat net : perte"],
      ] }, note: "Fonctionnement tiré des comptes 11, 12, 13 et 465 du SYSCOHADA révisé. Le compte 13 est soldé lors de la comptabilisation de l'affectation, décidée au cours de l'exercice suivant ; en attendant, l'entité peut utiliser le compte 130 « Résultat en instance d'affectation »." },
    ],
  },
  {
    numero: '2.4',
    titre: "Le bénéfice distribuable : calcul et limites (Art. 143 al. 1 et 4)",
    navLabel: '2.4 Le bénéfice distribuable',
    blocs: [
      { type: 'intertitre', texte: "2.4.1 La construction du bénéfice distribuable" },
      { type: 'filet', titre: "Texte de référence — AUSCGIE, art. 143 al. 1", texte: "« Le bénéfice distribuable est le résultat de l'exercice, augmenté du report bénéficiaire et diminué des pertes antérieures, des dividendes partiels régulièrement distribués ainsi que des sommes portées en réserve en application de la loi ou des statuts. »" },
      { type: 'paragraphe', texte: "Le bénéfice distribuable n'est pas le bénéfice comptable. Il se construit à partir du résultat de l'exercice, que l'on corrige de quatre éléments. On ajoute le report bénéficiaire, c'est-à-dire les bénéfices d'exercices antérieurs laissés en attente d'affectation (compte 121). On retranche les pertes antérieures non encore absorbées (compte 129), car une société ne peut distribuer tant qu'elle n'a pas reconstitué ce qu'elle a perdu. On retranche les dividendes partiels régulièrement distribués, c'est-à-dire les acomptes déjà versés sur le dividende de l'exercice. On retranche enfin les dotations obligatoires aux réserves légale et statutaires. Le résultat de ce calcul est le plafond de ce que l'assemblée peut distribuer au titre de l'exercice ; elle peut y ajouter, en le disant expressément, des prélèvements sur des réserves disponibles (art. 143 al. 2 et 3)." },
      { type: 'carte', titre: "Exemple 2.1 — Le bénéfice distribuable de la SARL KASAI BOIS (exercice 2025, en francs congolais)", tableau: { entetes: ['Élément', 'Montant', 'Commentaire'], lignes: [
        ["Capital social", "50 000 000", "Réserve légale plafonnée à 1/5, soit 10 000 000"],
        ["Réserve légale existante", "6 000 000", "Plafond non atteint : dotation obligatoire"],
        ["Report à nouveau débiteur (pertes antérieures)", "4 000 000", "À imputer avant toute distribution"],
        ["Résultat net de l'exercice 2025", "30 000 000", "Point de départ du calcul"],
        ["Dotation à la réserve légale", "2 600 000", "10 % × (30 000 000 - 4 000 000) ; la réserve atteint 8 600 000, sous le plafond"],
        ["Réserve statutaire prévue par les statuts", "1 000 000", "Indisponible"],
        ["**Bénéfice distribuable**", "**22 400 000**", "30 000 000 - 4 000 000 - 2 600 000 - 1 000 000"],
        ["Décision de l'assemblée : dividendes", "15 000 000", "Porté au crédit du 465"],
        ["Décision de l'assemblée : réserve facultative", "5 000 000", "Distribuable plus tard"],
        ["Décision de l'assemblée : report à nouveau", "2 400 000", "Solde non affecté"],
      ] }, note: "Contrôle de l'art. 143 al. 4 : capitaux propres après distribution = 50 000 000 + 8 600 000 + 1 000 000 + 5 000 000 + 2 400 000 = 67 000 000, supérieurs au capital augmenté des réserves indisponibles (50 000 000 + 8 600 000 + 1 000 000 = 59 600 000). La distribution est régulière." },
      { type: 'paragraphe', texte: "L'écriture d'affectation correspondante débite le compte 131 de 30 000 000 FC et crédite le 129 de 4 000 000 (apurement des pertes antérieures), le 111 de 2 600 000, le 112 de 1 000 000, le 1181 de 5 000 000, le 465 de 15 000 000 et le 121 de 2 400 000 ; le total des crédits égale bien le débit. L'exemple montre que, sur un bénéfice de 30 000 000 FC, les associés ne peuvent se partager au plus que 22 400 000 FC, et qu'ils ont ici choisi d'en conserver une partie dans l'entreprise. Ce choix de politique financière, arbitrage entre la rémunération immédiate des associés et l'autofinancement de la croissance, est l'une des décisions les plus importantes de l'assemblée annuelle." },
      { type: 'intertitre', texte: "2.4.2 La préservation des capitaux propres" },
      { type: 'paragraphe', texte: "L'art. 143 al. 4 ajoute une seconde limite, indépendante du calcul précédent et plus protectrice des créanciers : « Sauf en cas de réduction de capital, aucune distribution ne peut être faite aux associés lorsque les capitaux propres sont ou deviendraient, à la suite de cette distribution, inférieurs au montant du capital augmenté des réserves que la loi ou les statuts ne permettent pas de distribuer. Toute délibération prise en violation du présent alinéa est nulle. » Cette règle de conservation du capital garantit que la distribution ne se fait jamais aux dépens du capital et des réserves indisponibles, qui constituent le gage minimal des créanciers. Elle s'apprécie après la distribution, ce qui oblige à simuler l'état des capitaux propres une fois les dividendes sortis. Dans une société qui a accumulé des pertes importantes, il peut arriver qu'un bénéfice de l'exercice existe, mais que les capitaux propres restent inférieurs au capital : aucune distribution n'est alors possible tant que la situation n'est pas rétablie." },
      { type: 'intertitre', texte: "2.4.3 Les sociétés établissant des comptes IFRS" },
      { type: 'paragraphe', texte: "Une précision d'actualité concerne les sociétés qui établissent des comptes selon les normes IFRS. Les entités cotées ou faisant appel public à l'épargne doivent produire des états IFRS « en sus » des états SYSCOHADA, mais ces états IFRS « sont destinés exclusivement aux marchés financiers » et « ne peuvent servir de support de base pour la détermination du bénéfice distribuable visé par l'Acte uniforme relatif au droit des sociétés commerciales et du groupement d'intérêt économique » (art. 8 al. 4 AUDCIF). Le bénéfice distribuable se calcule toujours à partir des comptes SYSCOHADA, dont les règles de prudence protègent mieux les créanciers que certaines évaluations à la juste valeur admises par les IFRS. La question deviendra concrète en RDC avec l'ouverture annoncée de la Bourse de Kinshasa (section 2.9)." },
    ],
  },
  {
    numero: '2.5',
    titre: "Les dividendes : décision, paiement, retenue fiscale et dividendes fictifs (Art. 144-146, 346, 889)",
    navLabel: '2.5 Les dividendes',
    blocs: [
      { type: 'paragraphe', texte: "« Après approbation des états financiers de synthèse et constatation de l'existence de sommes distribuables, l'assemblée générale détermine : le cas échéant, les dotations à des réserves facultatives ; la part de bénéfices à distribuer, selon le cas, aux actions ou aux parts sociales ; le montant du report à nouveau éventuel. Cette part de bénéfice revenant à chaque action ou à chaque part sociale est appelée dividende » (art. 144). Le texte fixe un ordre logique : approbation des comptes, constatation des sommes distribuables, puis décision de distribution. Le dividende naît de cette décision ; avant elle, l'associé n'a qu'une vocation aux bénéfices, après elle, il est créancier de la société pour le montant voté. Le montant revenant à chaque titre suit la règle de proportionnalité de l'art. 54, sauf aménagement statutaire et sous réserve de l'interdiction des clauses léonines." },
      { type: 'intertitre', texte: "2.5.1 Le premier dividende et les acomptes" },
      { type: 'paragraphe', texte: "Les statuts peuvent prévoir un « premier dividende », versé aux titres « dans la mesure où l'assemblée constate l'existence de bénéfices distribuables et à la condition que ces bénéfices soient suffisants pour en permettre le paiement » ; il « est calculé comme un intérêt sur le montant libéré des actions » (art. 145). Le premier dividende rémunère d'abord le capital effectivement versé, avant le partage du surplus : dans une SA où certains actionnaires n'ont libéré que le quart de leurs actions, il est équitable de servir d'abord un intérêt sur ce qui a été réellement apporté. Mais le premier dividende n'est jamais un intérêt garanti : sans bénéfice distribuable suffisant, il n'est pas dû. Un intérêt fixe payable en toute hypothèse serait, on l'a vu au chapitre 1, une clause léonine." },
      { type: 'paragraphe', texte: "L'art. 143 mentionne, parmi les éléments qui réduisent le bénéfice distribuable, « les dividendes partiels régulièrement distribués ». Il s'agit des acomptes sur dividende, versés en cours d'exercice ou avant l'approbation des comptes, lorsque la société anticipe un bénéfice. Le texte impose qu'ils aient été « régulièrement » distribués, c'est-à-dire sur la base d'un bénéfice effectivement constaté ; un acompte versé au vu d'un bénéfice espéré qui ne se réalise pas encourt les mêmes griefs qu'un dividende fictif. Au moment de l'assemblée annuelle, l'acompte déjà versé s'impute sur le dividende de l'exercice : si l'assemblée vote un dividende total de 20 000 000 FC alors qu'un acompte de 8 000 000 a été payé en septembre, il ne reste que 12 000 000 à verser, et le bénéfice distribuable disponible pour d'autres affectations a été réduit d'autant." },
      { type: 'intertitre', texte: "2.5.2 La mise en paiement et la retenue fiscale" },
      { type: 'paragraphe', texte: "Le paiement obéit à des règles de délai. Les modalités de mise en paiement « sont fixées par la collectivité des associés ou, à défaut, par le conseil d'administration, l'administrateur général ou les gérants » ; et « dans tous les cas, la mise en paiement des dividendes doit avoir lieu dans un délai maximum de neuf (9) mois après la clôture de l'exercice », le juge pouvant prolonger ce délai (art. 146). La règle protège les associés minoritaires contre une majorité qui voterait un dividende pour ne jamais le payer, ou le paierait avec des années de retard. Comptablement, la décision de distribution crédite le compte 465 « Associés, dividendes à payer » par le débit du résultat, du report à nouveau ou des réserves ; le paiement débite le 465 par le crédit de la trésorerie. Le dividende n'est pas une charge de la société : il ne passe jamais par la classe 6 et n'est pas déductible du résultat fiscal." },
      { type: 'filet', titre: "La retenue fiscale sur les dividendes en RDC depuis le 1er janvier 2026", texte: "Depuis la réforme de l'impôt sur le revenu par la loi n° 23/053 du 30 novembre 2023, applicable au 1er janvier 2026, les dividendes versés aux personnes physiques relèvent de l'IRPP dans la catégorie des revenus des capitaux mobiliers, soumis à une retenue à la source de 20 % (art. 120). L'arrêté ministériel n° 008/CAB/MIN/FINANCES/2025 du 19 février 2025 fixe la mécanique : le débiteur du revenu, c'est-à-dire la société distributrice, calcule, retient et reverse l'impôt au service des impôts dont il relève, au plus tard le 15 du mois qui suit le versement ou la mise à disposition des revenus (art. 2), la retenue étant opérée sur le montant net du revenu imposable (art. 3). La fiscalité du dividende est étudiée en détail dans le module de fiscalité ; le juriste d'entreprise doit simplement savoir que la société est collecteur de l'impôt au moment du paiement." },
      { type: 'paragraphe', texte: "Reprenons l'exemple de la SARL KASAI BOIS : si les 15 000 000 FC de dividendes reviennent à des associés personnes physiques et que le montant net imposable coïncide avec le montant distribué, la société retiendra 3 000 000 FC (20 %) et ne versera que 12 000 000 FC aux associés. L'écriture de paiement débite le 465 de 15 000 000, crédite la banque (521) de 12 000 000 et le compte 447 « État, impôts retenus à la source » de 3 000 000, ce dernier étant soldé lors du reversement au Trésor avant le 15 du mois suivant. Le calendrier est serré : dividendes décidés le 30 juin, payés le 31 juillet, retenue reversée au plus tard le 15 août." },
      { type: 'intertitre', texte: "2.5.3 Les dividendes fictifs" },
      { type: 'paragraphe', texte: "Le dividende distribué en méconnaissance de ces règles est qualifié de fictif : « Tout dividende distribué en violation des règles énoncées au présent article est un dividende fictif » (art. 144 al. 3). Il s'agit en réalité d'un remboursement déguisé du capital ou d'un prélèvement sur des réserves indisponibles, au détriment des créanciers. Trois sanctions s'y attachent. La nullité, d'abord, de la délibération qui viole l'art. 143. La restitution, ensuite : dans la SARL, « la répétition des dividendes, ne correspondant pas à des bénéfices réellement acquis, peut être exigée des associés qui les ont reçus », et l'action se prescrit par trois ans à compter de la mise en distribution (art. 346 al. 3 et 4). La sanction pénale, enfin, des dirigeants qui, « en l'absence d'inventaire ou au moyen d'inventaire frauduleux, ont, sciemment, opéré entre les actionnaires ou les associés la répartition de dividendes fictifs » (art. 889)." },
      { type: 'paragraphe', texte: "Une actualité congolaise illustre la tension entre le droit uniforme et les besoins des finances publiques. La loi de finances n° 25/060 du 29 décembre 2025 pour l'exercice 2026 a prévu, pour les entreprises minières du portefeuille de l'État, un dividende prioritaire et intangible calculé sur le bénéfice net comptable, déclaré au plus tard le 15 mai et payé dans les huit jours de la réception des titres de perception, indépendamment de la tenue de l'assemblée générale. Le mécanisme, conçu pour sécuriser les recettes de l'État actionnaire, s'écarte du schéma de l'AUSCGIE, où le dividende suppose l'approbation des comptes et une décision de l'assemblée sur des sommes distribuables (art. 142 à 144). L'Acte uniforme prime les lois nationales contraires, et le montant versé devra en tout état de cause respecter la limite de conservation du capital de l'art. 143 al. 4. La question de la compatibilité de ce dispositif avec le droit OHADA reste à trancher ; elle illustre le raisonnement que doit mener le juriste face à toute règle nationale qui touche au fonctionnement des sociétés." },
    ],
  },
  {
    numero: '2.6',
    titre: "Le dépôt des comptes et la publicité de la vie sociale (Art. 263-269, 890-1)",
    navLabel: '2.6 Dépôt et publicité',
    blocs: [
      { type: 'intertitre', texte: "2.6.1 Le dépôt des états financiers au RCCM" },
      { type: 'filet', titre: "Texte de référence — AUSCGIE, art. 269", texte: "« Les sociétés commerciales sont tenues de déposer au registre du commerce et du crédit mobilier de l'État partie du siège social, dans le mois qui suit leur approbation par l'organe compétent, les états financiers de synthèse, à savoir le bilan, le compte de résultat, le tableau financier des ressources et emplois et l'état annexé de l'exercice écoulé. En cas de refus d'approbation de ces documents, une copie de la décision de l'organe compétent est déposée dans le même délai. Les états financiers susvisés peuvent faire l'objet d'un dépôt électronique [...]. À la demande de tout intéressé, la juridiction compétente peut, statuant à bref délai, enjoindre sous astreinte au dirigeant de toute société commerciale de procéder au dépôt des documents énumérés par l'alinéa premier, dès lors que la requête amiable du demandeur auprès de la société est restée vaine pendant trente (30) jours. »" },
      { type: 'paragraphe', texte: "Le dépôt des comptes au RCCM est la contrepartie de la responsabilité limitée. Les associés d'une SARL, d'une SA ou d'une SAS ne répondant des dettes sociales qu'à concurrence de leurs apports, les créanciers n'ont d'autre gage que le patrimoine de la société ; ils doivent donc pouvoir en connaître l'état. Le fournisseur qui hésite à accorder un crédit de quatre-vingt-dix jours, la banque qui étudie un prêt, le candidat investisseur qui envisage d'entrer au capital consultent les comptes déposés. L'obligation pèse sur toutes les sociétés commerciales, y compris la SNC. Elle est doublement sanctionnée : civilement, par l'injonction sous astreinte que tout intéressé peut obtenir après une demande amiable restée sans effet pendant trente jours ; pénalement, puisque l'art. 890-1 incrimine les dirigeants « qui n'ont pas déposé, dans le mois qui suit leur approbation, les états financiers de synthèse »." },
      { type: 'paragraphe', texte: "Il ne faut pas confondre ce dépôt avec la remise des états financiers à l'administration fiscale : en RDC, la déclaration de l'impôt sur les sociétés des entreprises relevant du système normal est appuyée du bilan, du compte de résultat, du tableau des flux de trésorerie, du tableau de variation des capitaux propres et des notes annexes conformes à l'AUDCIF (art. 13 de la loi n° 004/2003 portant réforme des procédures fiscales, modifié par la loi n° 23/052 du 30 novembre 2023), et, sous peine de rejet, ces états doivent être certifiés par un expert-comptable inscrit au tableau de l'ONEC (art. 14). Ce sont deux obligations distinctes, qui répondent à deux finalités différentes : la déclaration fiscale sert au calcul de l'impôt et reste couverte par le secret fiscal, tandis que le dépôt au RCCM sert l'information du public. L'art. 269 permet le dépôt électronique, en cohérence avec l'art. 256-1 et avec l'objectif de dématérialisation poursuivi par le guichet unique, étudié au chapitre 1. Il en découle une règle de pratique professionnelle : le calendrier de clôture d'un client doit inclure, après l'assemblée, le dépôt au RCCM dans le mois." },
      { type: 'intertitre', texte: "2.6.2 La publicité des modifications de la vie sociale" },
      { type: 'paragraphe', texte: "Au-delà des comptes annuels, toute modification importante de la vie sociale doit être rendue publique. Lorsqu'une mention de l'avis de constitution devient caduque, par suite d'une modification des statuts ou d'une décision des organes, « la modification est publiée par avis inséré dans un journal habilité à recevoir les annonces légales » ; cet avis rappelle les mentions de l'avis initial et indique le titre, la date, le numéro et le lieu de publication des avis précédents ainsi que les modifications intervenues (art. 263). Les opérations sur le capital appellent un dépôt complémentaire au greffe : copie certifiée conforme de la délibération qui a décidé ou autorisé l'augmentation ou la réduction dans le délai d'un mois, décision de l'organe qui a réalisé l'augmentation, et copie de la déclaration notariée de souscription et de versement (art. 264)." },
      { type: 'paragraphe', texte: "Prenons un exemple. Une SARL constituée à Kinshasa en 2024 décide en 2026 de transférer son siège à Lubumbashi, de porter son capital de 20 000 000 à 50 000 000 FC par apports nouveaux et de changer de gérant. Le transfert du siège dans une autre ville suppose une modification des statuts (art. 27), et l'adresse du siège figure parmi les mentions de l'avis de constitution (art. 257-1) : un avis modificatif doit donc être publié, rappelant les références de l'avis initial (art. 263). L'augmentation de capital appelle en outre le dépôt au greffe de la délibération dans le mois, de la décision qui a réalisé l'augmentation et de la déclaration de souscription et de versement (art. 264). Le changement de gérant modifie l'identité des dirigeants mentionnée dans l'avis (art. 262, 6°) et doit donc aussi être publié. Pour chaque modification statutaire, les dirigeants déposent enfin une déclaration de régularité et de conformité (art. 73-1). Toutes ces formalités relèvent du guichet unique, compétent pour les inscriptions modificatives (décret n° 14/014, art. 4)." },
      { type: 'carte', titre: "Tableau 2.4 — Les formalités de publicité au cours de la vie sociale", tableau: { entetes: ['Événement', 'Formalités', 'Délai', 'Texte'], lignes: [
        ["Modification des statuts rendant caduque une mention de l'avis de constitution", "Avis dans un journal habilité ; déclaration de régularité et de conformité", "—", "Art. 263, 73-1"],
        ["Augmentation ou réduction du capital", "Avis ; dépôt au greffe de la délibération, de la décision de réalisation et de la déclaration notariée", "Un mois pour la délibération", "Art. 264"],
        ["Transformation", "Insertion ; dépôt de deux exemplaires des procès-verbaux ; inscription modificative ; dépôt des nouveaux statuts et de la déclaration de conformité ; mention à la conservation des hypothèques", "—", "Art. 265"],
        ["Nomination du liquidateur", "Avis contenant dix mentions, dont la mention « société en liquidation »", "Un mois", "Art. 266"],
        ["Clôture de la liquidation", "Avis signé du liquidateur ; indication du RCCM où sont déposés les comptes", "—", "Art. 268"],
        ["Approbation des comptes annuels", "Dépôt des états financiers au RCCM", "Un mois après l'approbation", "Art. 269"],
      ] }, note: "Les formalités sont accomplies à la diligence et sous la responsabilité des représentants légaux (art. 259) ; si une formalité ne portant ni sur la constitution ni sur une modification statutaire est omise, tout intéressé peut, un mois après une mise en demeure restée vaine, faire désigner un mandataire chargé de l'accomplir." },
    ],
  },
  {
    numero: '2.7',
    titre: "Le capital variable (Art. 269-1 à 269-7)",
    navLabel: '2.7 Le capital variable',
    blocs: [
      { type: 'paragraphe', texte: "Le principe de fixité du capital (art. 67 al. 1) impose une modification des statuts, avec ses formalités et ses coûts, à chaque entrée ou sortie d'un associé qui apporte ou reprend des fonds. Ce formalisme convient mal aux structures dont le sociétariat évolue en permanence, comme les sociétés de salariés, les regroupements de professionnels ou les véhicules d'investissement. La révision de 2014 a introduit une alternative : « Il peut être stipulé dans les statuts des sociétés anonymes ne faisant pas appel public à l'épargne et sociétés par actions simplifiées que le capital social est susceptible soit d'augmentation par des versements successifs des associés ou l'admission d'associés nouveaux, soit de diminution par la reprise totale ou partielle des apports effectués » (art. 269-1). La SARL, la SNC et la SCS ne peuvent pas adopter ce régime, ni la SA qui fait appel public à l'épargne." },
      { type: 'intertitre', texte: "2.7.1 Les conditions de la variabilité" },
      { type: 'paragraphe', texte: "La variabilité se paie de transparence : la société doit ajouter à sa forme les mots « à capital variable » sur tous les actes et documents destinés aux tiers (art. 269-2). Les statuts organisent les modalités de souscription, de libération et de reprise des apports (art. 269-2-1). En contrepartie, la société est dispensée des formalités de dépôt et de publication pour les augmentations et diminutions opérées dans ce cadre et pour les retraits d'associés autres que les dirigeants, et les créanciers ne disposent pas du droit d'opposition normalement ouvert en cas de réduction de capital non motivée par des pertes (art. 269-3). Les statuts peuvent donner aux dirigeants, à l'assemblée ou à la collectivité des associés le droit de s'opposer au transfert des titres, tout transfert réalisé en violation de ce droit étant nul (art. 269-4) : la société contrôle ainsi la composition de son sociétariat." },
      { type: 'filet', titre: "Les garde-fous de la variabilité", texte: "Plancher (art. 269-5) : « Les statuts déterminent une somme au-dessous de laquelle le capital ne peut être réduit par les reprises des apports autorisées par l'article 269-1 ci-dessus. Cette somme ne peut être inférieure ni au dixième du capital social stipulé dans les statuts ni au montant minimal du capital exigé pour la forme de la société considérée par les dispositions la régissant. Toute réduction de capital au-delà de la limite prescrite par les statuts est nulle. » Responsabilité de l'associé sortant (art. 269-6 al. 3) : il « reste tenu, pendant cinq (5) ans, envers les associés et envers les tiers, de toutes les obligations existant au moment de son retrait », mais seulement « dans la limite des sommes qui lui ont été restituées avant son départ »." },
      { type: 'intertitre', texte: "2.7.2 Le retrait et l'exclusion des associés" },
      { type: 'paragraphe', texte: "Chaque associé peut, à moins de conventions contraires et dans la limite du plancher, se retirer à tout moment ; les statuts peuvent aussi permettre à l'assemblée d'exclure un associé à la majorité qu'ils fixent, toute décision prise en violation de cette majorité étant nulle (art. 269-6). La société n'est dissoute ni par la mort ou le retrait d'un associé, ni par sa liquidation, son interdiction d'exercer le commerce ou son incapacité : elle continue de plein droit entre les autres (art. 269-7). Pour les créanciers, le plancher statutaire et la responsabilité quinquennale de l'associé sortant compensent la perte du droit d'opposition. Pour le comptable, le capital variable impose de suivre avec rigueur les entrées et reprises d'apports au compte 101 et aux comptes d'apporteurs 461, puisque le capital figurant au bilan n'est plus celui des statuts." },
      { type: 'paragraphe', texte: "Un exemple illustre le mécanisme. Une SAS à capital variable est créée par dix associés apportant chacun 3 000 000 FC ; le capital statutaire est de 30 000 000 FC, et les statuts fixent le plancher à 5 000 000 FC, montant supérieur au dixième du capital statutaire (3 000 000) exigé par l'art. 269-5. Dans l'année, quatre nouveaux associés entrent en apportant chacun 3 000 000 FC : le capital effectif passe à 42 000 000 FC sans modification des statuts ni publicité. L'année suivante, six associés se retirent et reprennent leurs apports : le capital redescend à 24 000 000 FC, toujours au-dessus du plancher. Si onze associés voulaient se retirer ensemble, le capital tomberait à 9 000 000 FC, encore au-dessus du plancher ; mais une reprise qui le ferait descendre sous 5 000 000 FC serait nulle (art. 269-5 al. 3). Chaque associé sortant reste tenu pendant cinq ans, dans la limite de ses 3 000 000 FC repris, des dettes existant à la date de son départ (art. 269-6)." },
    ],
  },
  {
    numero: '2.8',
    titre: "L'appel public à l'épargne : notion, exemptions et interdictions (Art. 81-85, 853-4)",
    navLabel: "2.8 L'appel public à l'épargne",
    blocs: [
      { type: 'paragraphe', texte: "Une société peut se financer de trois manières : par les apports de ses associés, par le crédit bancaire, ou en sollicitant l'épargne du public, c'est-à-dire en proposant à des investisseurs qu'elle ne connaît pas de souscrire ses actions ou ses obligations. Cette dernière voie est la plus puissante, car elle donne accès à une masse de capitaux sans commune mesure avec celle d'un cercle d'associés ; elle est aussi la plus dangereuse pour les épargnants, qui investissent sur la foi d'informations fournies par la société elle-même. C'est pourquoi l'AUSCGIE la réserve à certaines sociétés et l'entoure d'un régime d'information et de contrôle rigoureux. Sont réputées faire publiquement appel à l'épargne les sociétés dont les valeurs mobilières sont admises à la négociation sur la bourse des valeurs d'un État partie, à dater de cette admission, et les sociétés ou personnes qui offrent au public d'un État partie des valeurs mobilières dans les conditions de l'art. 83 (art. 81)." },
      { type: 'intertitre', texte: "2.8.1 La définition de l'offre au public" },
      { type: 'paragraphe', texte: "L'offre au public est constituée par l'une des deux opérations suivantes : « une communication adressée sous quelque forme et par quelque moyen que ce soit à des personnes et présentant une information suffisante sur les conditions de l'offre et sur les valeurs mobilières à offrir, de manière à mettre une personne en mesure d'envisager d'acheter ou de souscrire ces valeurs », ou « un placement de valeurs mobilières par des intermédiaires financiers dans le cadre soit d'une émission soit d'une cession » (art. 83). La définition est volontairement large : une publication sur un réseau social présentant les conditions d'une souscription d'actions peut constituer une offre au public, dès lors qu'elle met ses destinataires en mesure d'envisager d'y souscrire." },
      { type: 'intertitre', texte: "2.8.2 Les exemptions" },
      { type: 'paragraphe', texte: "Les exemptions de l'art. 81-1 obéissent à deux règles d'application. D'abord, elles s'apprécient globalement : le plafond de 50 000 000 FCFA se calcule sur douze mois et pour l'ensemble des États parties, et le seuil de cent personnes par marché boursier régional ou, à défaut, par État partie. Une société ne peut pas contourner la règle en fractionnant son offre en plusieurs opérations successives de 40 000 000 FCFA. Ensuite, elles ne valent que pour l'offre initiale : « Toute revente de valeurs mobilières ayant déjà fait l'objet d'un ou de plusieurs des types d'offres visés à l'article 81-1 ci-dessus est considérée comme une offre distincte et peut constituer une offre au public » (art. 81-3). Un investisseur qualifié qui a acquis des titres dans le cadre d'un placement privé ne peut donc pas les revendre ensuite au grand public sans document d'information. Le placement par des intermédiaires financiers donne lieu à la publication d'un document d'information si aucune des exemptions n'est remplie pour le placement final (art. 81-3 al. 2)." },
      { type: 'carte', titre: "Encadré 2.1 — Les opérations exclues de l'offre au public (art. 81-1 et 81-2)", liste: [
        "L'offre dont le montant total dans les États parties est **inférieur à 50 000 000 FCFA**, calculé sur une période de douze mois (art. 81-1, a).",
        "L'offre adressée **uniquement à des investisseurs qualifiés** agissant pour compte propre (art. 81-1, b), c'est-à-dire aux personnes disposant des compétences et des moyens nécessaires pour appréhender les risques des opérations sur instruments financiers : établissements de crédit et intermédiaires financiers agréés, organismes de placement collectif et leurs sociétés de gestion, entreprises d'assurance et de réassurance, mutuelles, institutions de prévoyance (art. 81-2).",
        "L'offre adressée à **moins de cent personnes** physiques ou morales agissant pour compte propre, autres que des investisseurs qualifiés, par marché boursier régional ou, à défaut, par État partie (art. 81-1, b).",
        "Toute revente de titres ayant bénéficié de ces exemptions est une offre distincte, qui peut constituer une offre au public (art. 81-3).",
      ] },
      { type: 'intertitre', texte: "2.8.3 L'interdiction et le monopole de la société anonyme" },
      { type: 'filet', titre: "Texte de référence — AUSCGIE, art. 82 : l'interdiction", texte: "« Il est interdit aux sociétés n'y ayant pas été autorisées par le présent Acte uniforme de faire publiquement appel à l'épargne. Il est également interdit à toute personne de procéder à la cession par appel public à l'épargne des titres d'une société n'étant pas autorisée à faire publiquement appel à l'épargne par le présent Acte uniforme. Toute opération effectuée en violation des dispositions du présent article est nulle. »" },
      { type: 'paragraphe', texte: "Seule la société anonyme est autorisée à faire publiquement appel à l'épargne, et elle est alors soumise à un régime renforcé : capital minimum de cent millions de FCFA (art. 824), conseil d'administration élargi, comité d'audit, publicité périodique, étudiés avec la SA. La SAS « ne peut faire publiquement appel à l'épargne » (art. 853-4), et les sociétés autres que les sociétés par actions ne peuvent même pas émettre de titres négociables (art. 58). Une SARL qui organiserait une souscription publique de parts, ou une SAS qui proposerait ses actions sur internet à un large public, commettrait une opération nulle. Lorsqu'une société place ses titres dans un autre État partie que celui de son siège, elle est soumise aux règles de l'appel public à l'épargne dans les deux États (art. 84), et, si l'offre dépasse 50 000 000 FCFA, un ou plusieurs établissements de crédit de l'autre État doivent garantir la bonne fin de l'opération, des intermédiaires locaux assurer le service financier et des commissaires aux comptes de cet État vérifier les états financiers (art. 85). Lorsqu'un marché financier couvre plusieurs États, comme en zone UEMOA ou CEMAC, ces États sont considérés comme un seul pour l'application de ces règles (art. 81 al. 3)." },
    ],
  },
  {
    numero: '2.9',
    titre: "Le document d'information, le visa et le futur marché boursier congolais (Art. 86-96-1)",
    navLabel: "2.9 Visa et Bourse de Kinshasa",
    blocs: [
      { type: 'paragraphe', texte: "Toute société qui fait publiquement appel à l'épargne doit, au préalable, publier un document destiné à l'information du public, contenant « toutes les informations qui [...] sont nécessaires pour permettre aux investisseurs d'évaluer en connaissance de cause le patrimoine, la situation financière, les résultats et les perspectives de l'émetteur et des garants éventuels, ainsi que les droits attachés à ces valeurs mobilières » (art. 86). Ce document comprend un résumé des informations clés, dans une formulation simple et concise, assorti d'un avertissement indiquant qu'il doit être lu comme une introduction au document complet et que toute décision d'investir doit se fonder sur l'examen exhaustif de celui-ci (art. 86-1). Certaines informations peuvent être omises avec l'accord de l'autorité compétente, notamment lorsqu'elles sont d'importance mineure ou que leur divulgation serait contraire à l'intérêt public ou gravement préjudiciable à l'émetteur sans risque d'induire le public en erreur (art. 88)." },
      { type: 'paragraphe', texte: "Le projet de document est soumis au visa de l'organisme de contrôle de la bourse des valeurs de l'État du siège « et, le cas échéant, des autres États parties dont le public est sollicité. En l'absence de cet organisme, il est soumis au visa du ministre chargé des finances de ces États parties » (art. 90). L'autorité s'assure que l'opération ne comporte pas d'irrégularités et ne s'accompagne pas d'actes contraires aux intérêts des investisseurs ; elle peut exiger des mentions complémentaires, des explications, des investigations complémentaires aux frais de la société ou un avertissement rédigé par ses soins. Le récépissé de dépôt est délivré le jour même, et le visa est accordé dans le mois, ou dans les deux mois en cas d'investigations complémentaires ; le refus est motivé (art. 90). Le visa est refusé si les demandes de l'autorité ne sont pas satisfaites ou si l'opération s'accompagne d'actes contraires aux intérêts des investisseurs (art. 91)." },
      { type: 'intertitre', texte: "2.9.1 La responsabilité de l'information" },
      { type: 'paragraphe', texte: "La responsabilité de l'information pèse sur ceux qui la produisent. « La responsabilité des informations fournies dans un document d'information incombe à l'émetteur ou à l'offreur et à leur organe d'administration ou de direction et, le cas échéant, au garant » ; le document identifie clairement ces personnes et contient leur déclaration certifiant que, à leur connaissance, les données sont conformes à la réalité et ne comportent pas d'omissions de nature à en altérer la portée (art. 96). La responsabilité attachée au seul résumé est plus étroite : elle n'est engagée que si le résumé est trompeur, inexact ou contradictoire par rapport au reste du document, ou s'il ne fournit pas les informations essentielles (art. 96 al. 2, 86-1). Le visa de l'autorité ne décharge pas l'émetteur : il atteste que le document a été examiné, non que l'investissement est sûr. Un document d'information reste valide douze mois au plus après son approbation, pour autant qu'il soit complété par les suppléments requis (art. 96-1)." },
      { type: 'carte', titre: "Tableau 2.5 — Les règles applicables au document d'information", tableau: { entetes: ['Règle', 'Contenu', 'Article'], lignes: [
        ["Supplément", "Fait nouveau significatif, erreur ou inexactitude entre le visa et la clôture de l'offre : supplément soumis au visa dans les sept jours ouvrables", "Art. 92 al. 1 et 2"],
        ["Droit de rétractation", "Les investisseurs ayant déjà souscrit peuvent retirer leur acceptation dans les trois jours ouvrables suivant la publication du supplément", "Art. 92 al. 3"],
        ["Diffusion", "Journaux habilités, brochure au siège, site internet de l'émetteur ou des intermédiaires, de la bourse et, le cas échéant, de l'autorité ; au moins six jours ouvrables avant la clôture pour une première admission d'actions", "Art. 93"],
        ["Publicité promotionnelle", "Reconnaissable comme telle, non trompeuse, cohérente avec le document d'information, auquel elle renvoie", "Art. 94"],
        ["Dispenses", "Actions de substitution, offres d'échange, fusions, actions gratuites ou en paiement du dividende, offres aux salariés et dirigeants, sous conditions", "Art. 95 et 95-1"],
        ["Responsabilité", "L'émetteur ou l'offreur, leurs organes et le garant ; déclaration de conformité des personnes responsables", "Art. 96"],
        ["Validité", "Douze mois au plus après l'approbation, sous réserve des suppléments", "Art. 96-1"],
      ] } },
      { type: 'intertitre', texte: "2.9.2 Vers un marché boursier congolais" },
      { type: 'paragraphe', texte: "Ces règles, longtemps théoriques en RDC, pays sans bourse des valeurs, sont en passe de devenir pratiques. Le projet de loi portant organisation et fonctionnement des marchés boursiers a été adopté en Conseil des ministres le 18 avril 2025 à Lubumbashi ; il prévoyait deux bourses, l'une pour les valeurs mobilières et l'autre pour les matières premières, une autorité de régulation, un dépositaire central, une banque de règlement, des entreprises de marché et des organismes de placement collectif. Adoptée par l'Assemblée nationale le 5 juin 2026 et par le Sénat le 24 juillet 2026, la loi n° 26/034 du 20 août 2026 relative aux marchés boursiers a été promulguée. Selon le ministre des Finances, qui a annoncé le 4 septembre 2026 la mise en place d'un comité d'opérationnalisation, la prochaine étape est le déploiement de l'Autorité de régulation des marchés financiers (ARMF) et de son règlement général ; la Kinshasa Stock Exchange devra ensuite obtenir son agrément, les premières cotations étant visées entre juin et décembre 2027. La Société financière internationale accompagne le projet depuis un partenariat signé le 18 juin 2026, et le gouvernement envisage que des sociétés minières figurent parmi les premières entreprises cotées." },
      { type: 'paragraphe', texte: "Trois conséquences en découlent. D'abord, jusqu'à ce que l'ARMF soit opérationnelle, l'art. 90 AUSCGIE confie le visa d'un éventuel appel public à l'épargne au ministre chargé des finances ; l'entrée en fonction de l'autorité de régulation transférera cette compétence à « l'organisme de contrôle de la bourse des valeurs ». Ensuite, les sociétés qui s'introduiront en bourse devront produire, en plus de leurs états SYSCOHADA, des états financiers selon les normes IFRS (art. 8 AUDCIF), ce qui ouvre des débouchés aux comptables formés aux deux référentiels. Enfin, la loi nationale sur les marchés boursiers s'articulera avec l'AUSCGIE, qui continue de régir l'appel public à l'épargne dans tous ses aspects de droit des sociétés ; le texte congolais organise les institutions et le fonctionnement du marché, il ne peut contredire l'Acte uniforme. Le texte de la loi n° 26/034 n'ayant pas encore été largement diffusé, ses articles ne sont pas cités dans ce cours ; ils seront intégrés dès que leur texte officiel aura été vérifié." },
    ],
  },
  {
    numero: '2.10',
    titre: "Les litiges entre associés, l'arbitrage et la synthèse du cycle financier (Art. 147-149)",
    navLabel: '2.10 Litiges et synthèse',
    blocs: [
      { type: 'paragraphe', texte: "La vie financière de la société est une source majeure de conflits entre associés : désaccord sur l'affectation du résultat, sur le montant des dividendes, sur la sincérité des comptes, sur la valeur des titres d'un associé sortant. L'AUSCGIE pose d'abord la compétence de principe du juge : « Tout litige entre associés ou entre un ou plusieurs associés et la société relève de la juridiction compétente » (art. 147). En RDC, il s'agit en principe du tribunal de commerce, là où il est installé. Mais le texte ouvre largement la voie aux modes alternatifs : le litige « peut également être soumis à l'arbitrage, soit par une clause compromissoire, statutaire ou non, soit par compromis ou à d'autres modes alternatifs de règlement des différends » (art. 148), et l'arbitrage est réglé par l'Acte uniforme relatif au droit de l'arbitrage ou par tout autre système convenu (art. 149)." },
      { type: 'intertitre', texte: "2.10.1 La clause compromissoire" },
      { type: 'paragraphe', texte: "La clause compromissoire peut figurer dans les statuts, ce qui la rend applicable à tous les associés, présents et futurs, ou dans un pacte d'associés, auquel cas elle ne lie que ses signataires. Le compromis est conclu après la naissance du litige. Les autres modes alternatifs visés par l'art. 148 comprennent notamment la médiation, que l'OHADA a encadrée par un Acte uniforme spécifique. L'arbitrage présente pour les sociétés trois avantages : la confidentialité, précieuse lorsque le litige révèle des informations financières sensibles ; la rapidité ; et la possibilité de choisir des arbitres compétents en comptabilité et en finance, capables d'apprécier un calcul de bénéfice distribuable ou une évaluation de titres. Il suppose en revanche des frais plus élevés qu'une procédure judiciaire, et il n'est pas adapté aux petits litiges." },
      { type: 'intertitre', texte: "2.10.2 Synthèse du cycle financier" },
      { type: 'carte', titre: "Tableau 2.6 — Grille de contrôle du cycle financier annuel d'une société", tableau: { entetes: ['Étape', 'Question à se poser', 'Texte'], lignes: [
        ["1. Clôture", "L'exercice coïncide-t-il avec l'année civile ? Quel système comptable (normal, SMT, IFRS en sus) ?", "Art. 7, 8, 11, 13 AUDCIF"],
        ["2. Arrêté des comptes", "Les états sont-ils arrêtés dans les quatre mois ? Les engagements hors bilan figurent-ils dans les notes ?", "Art. 23 AUDCIF ; art. 137, 139 AUSCGIE"],
        ["3. Rapport de gestion", "Expose-t-il l'avenir, les événements postérieurs, la trésorerie et les changements de méthode ?", "Art. 138, 141"],
        ["4. Contrôle et approbation", "Documents transmis au commissaire 45 jours avant ? Assemblée dans les six mois ?", "Art. 140"],
        ["5. Affectation", "Réserve légale dotée (10 % jusqu'à 20 % du capital) ? Réserves statutaires respectées ?", "Art. 142, 346, 546"],
        ["6. Distribution", "Bénéfice distribuable correctement calculé ? Capitaux propres préservés après distribution ?", "Art. 143, 144"],
        ["7. Paiement", "Dividendes payés dans les neuf mois ? Retenue de 20 % reversée avant le 15 du mois suivant ?", "Art. 146 AUSCGIE ; loi n° 23/053, art. 120"],
        ["8. Dépôt", "États financiers déposés au RCCM dans le mois de l'approbation ?", "Art. 269, 890-1"],
      ] } },
      { type: 'paragraphe', texte: "Le droit des sociétés et le droit comptable forment, pour la vie financière de la société, un ensemble indissociable. Le droit comptable dit comment mesurer le résultat ; le droit des sociétés dit qui en décide, dans quelles limites et avec quelles garanties pour les créanciers. Les chapitres suivants étudieront les règles propres à chaque forme sociale, en commençant par les sociétés de personnes ; la grille ci-dessus s'appliquera à chacune d'elles, avec les adaptations propres à la SNC, où la responsabilité illimitée des associés rend la question du bénéfice distribuable moins vitale pour les créanciers, et à la SA, où la présence du commissaire aux comptes et d'actionnaires nombreux rend au contraire chaque étape plus formelle." },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas1',
    titre: 'Le calendrier de clôture de la SARL LUALABA SERVICES',
    contexte: "La SARL LUALABA SERVICES, dotée d'un commissaire aux comptes, clôture son exercice le 31 décembre 2025. Le gérant propose d'arrêter les comptes le 15 mai 2026, de les envoyer au commissaire aux comptes le 1er juin, de réunir l'assemblée le 20 juin, de déposer les comptes au RCCM « quand il aura le temps », et de payer les dividendes en décembre 2026.",
    questions: [
      { num: 1, enonce: "Le calendrier proposé respecte-t-il les délais légaux ?", correction: "Non, sur quatre points. L'arrêté des comptes au 15 mai dépasse le délai de quatre mois après la clôture, qui expire le 30 avril 2026 (art. 23 AUDCIF). La transmission au commissaire aux comptes le 1er juin pour une assemblée le 20 juin ne respecte pas le délai de quarante-cinq jours au moins (art. 140 al. 1) : pour une assemblée le 20 juin, l'envoi devait intervenir au plus tard le 6 mai. Le dépôt au RCCM doit intervenir dans le mois qui suit l'approbation (art. 269), soit au plus tard le 20 juillet, et son omission est pénalement sanctionnée (art. 890-1). Enfin, les dividendes doivent être mis en paiement dans les neuf mois de la clôture, soit au plus tard le 30 septembre 2026, sauf prolongation accordée par le juge (art. 146). Seule la date de l'assemblée respecte le délai de six mois (art. 140 al. 2)." },
      { num: 2, enonce: "Proposez un calendrier conforme.", correction: "Arrêté des comptes et du rapport de gestion (art. 137, 138) au plus tard le 30 avril 2026 ; transmission au commissaire aux comptes le même jour ou dans les jours suivants, et en tout cas quarante-cinq jours au moins avant l'assemblée (art. 140) ; assemblée d'approbation et d'affectation au plus tard le 30 juin 2026, par exemple le 20 juin ; dépôt des états financiers au RCCM au plus tard le 20 juillet (art. 269) ; paiement des dividendes au plus tard le 30 septembre (art. 146) et reversement de la retenue de 20 % au plus tard le 15 du mois suivant le paiement (arrêté n° 008/2025, art. 2). S'y ajoute, sur le plan fiscal, la déclaration de l'impôt sur les sociétés appuyée des états financiers certifiés (art. 13 et 14 de la loi n° 004/2003 modifiée), à l'échéance fixée par la législation fiscale." },
    ],
  },
  {
    id: 'cas2',
    titre: "L'affectation du résultat de la SA TANGANYIKA FOODS",
    contexte: "La SA TANGANYIKA FOODS, au capital de 200 000 000 FC, présente au 31 décembre 2025 : réserve légale 30 000 000 FC ; réserves statutaires (indisponibles) 10 000 000 FC ; réserves facultatives 20 000 000 FC ; report à nouveau débiteur 8 000 000 FC ; résultat net de l'exercice 58 000 000 FC. Les statuts imposent une réserve statutaire de 5 % du bénéfice de l'exercice. Les actionnaires majoritaires veulent distribuer 70 000 000 FC.",
    questions: [
      { num: 1, enonce: "Calculez la dotation à la réserve légale et le bénéfice distribuable.", correction: "La dotation à la réserve légale est d'un dixième au moins du bénéfice diminué des pertes antérieures (art. 546, 2°) : 10 % × (58 000 000 - 8 000 000) = 5 000 000 FC. Le plafond est le cinquième du capital, soit 40 000 000 FC ; la réserve passe de 30 000 000 à 35 000 000, sous le plafond : la dotation entière est obligatoire. La réserve statutaire est de 5 % × 58 000 000 = 2 900 000 FC (en retenant la base fixée par les statuts). Bénéfice distribuable (art. 143 al. 1) : 58 000 000 - 8 000 000 - 5 000 000 - 2 900 000 = 42 100 000 FC." },
      { num: 2, enonce: "La distribution de 70 000 000 FC est-elle possible ?", correction: "Pas sur le seul bénéfice distribuable, limité à 42 100 000 FC. L'assemblée peut toutefois y ajouter des prélèvements sur les réserves disponibles, à condition de désigner expressément les postes prélevés (art. 143 al. 2 et 3). Seules les réserves facultatives (20 000 000 FC) sont disponibles ; la réserve légale et les réserves statutaires sont indisponibles. Le maximum distribuable est donc de 42 100 000 + 20 000 000 = 62 100 000 FC, inférieur aux 70 000 000 souhaités. Il faut encore vérifier la limite de l'art. 143 al. 4 : capitaux propres après une distribution de 62 100 000 = 200 000 000 (capital) + 35 000 000 (réserve légale) + 12 900 000 (réserves statutaires) + 0 (réserves facultatives et report épuisés) = 247 900 000 FC, égaux au capital augmenté des réserves indisponibles (247 900 000) : la limite est respectée, mais au franc près. Une distribution de 70 000 000 FC serait nulle et constituerait un dividende fictif (art. 144 al. 3)." },
      { num: 3, enonce: "Passez l'écriture d'affectation pour une distribution de 60 000 000 FC, dont 17 900 000 prélevés sur les réserves facultatives, le reste du bénéfice étant affecté comme la loi et les statuts l'exigent.", correction: "Le bénéfice de 58 000 000 FC est affecté ainsi : apurement du report débiteur 8 000 000 (crédit 129), réserve légale 5 000 000 (crédit 111), réserve statutaire 2 900 000 (crédit 112), dividendes 42 100 000 (crédit 465) ; total 58 000 000 au débit du 131. Le complément de dividendes de 17 900 000 est prélevé sur les réserves facultatives : débit 1181, crédit 465. Le compte 465 est ainsi crédité de 60 000 000 au total. Au paiement, s'agissant d'actionnaires personnes physiques, la société retiendra 20 % sur le montant net imposable et reversera la retenue au plus tard le 15 du mois suivant (loi n° 23/053, art. 120 ; arrêté n° 008/2025, art. 2) : débit 465, crédit 521 pour le net versé et crédit 447 pour la retenue." },
    ],
  },
  {
    id: 'cas3',
    titre: 'Le dividende fictif de la SARL KWILU TRANSPORT',
    contexte: "Pour satisfaire ses deux associés, le gérant de la SARL KWILU TRANSPORT a présenté des comptes 2024 bénéficiaires en omettant de provisionner une créance manifestement irrécouvrable et en surévaluant le stock de pièces détachées. L'assemblée a voté et payé en juillet 2025 un dividende de 12 000 000 FC. Un audit réalisé en 2026 montre que, correctement établis, les comptes 2024 étaient déficitaires. Un fournisseur impayé s'interroge sur ses recours.",
    questions: [
      { num: 1, enonce: "Le dividende versé est-il régulier ?", correction: "Non. Le dividende ne peut être prélevé que sur des sommes distribuables constatées après approbation de comptes réguliers (art. 143 et 144). Des comptes correctement établis faisant apparaître une perte, aucun bénéfice distribuable n'existait : le dividende de 12 000 000 FC est un dividende fictif (art. 144 al. 3), payé en réalité sur le capital et les réserves, au détriment des créanciers. La délibération qui l'a décidé méconnaît l'art. 143 et encourt la nullité." },
      { num: 2, enonce: "Peut-on obtenir la restitution des sommes versées, et dans quel délai ?", correction: "Oui. Dans la SARL, « la répétition des dividendes, ne correspondant pas à des bénéfices réellement acquis, peut être exigée des associés qui les ont reçus » (art. 346 al. 3). L'action se prescrit par trois ans à compter de la mise en distribution (art. 346 al. 4) : le dividende ayant été mis en distribution en juillet 2025, l'action est possible jusqu'en juillet 2028. Elle permet de reconstituer le patrimoine social, gage du fournisseur impayé." },
      { num: 3, enonce: "Quelles responsabilités pèsent sur le gérant ?", correction: "Sur le plan pénal, l'art. 889 incrimine les dirigeants qui, au moyen d'inventaire frauduleux, ont sciemment réparti des dividendes fictifs ; l'art. 890 incrimine la présentation aux associés d'états financiers ne donnant pas une image fidèle en vue de dissimuler la situation de la société ; l'art. 111 AUDCIF sanctionne l'établissement sciemment inexact des états financiers. Les peines relèvent du droit pénal congolais. Sur le plan civil, le gérant engage sa responsabilité envers la société et, pour leur préjudice personnel, envers les tiers, selon le régime des art. 161 et suivants étudié avec les dirigeants. Enfin, l'omission de la provision et la surévaluation du stock méconnaissent la convention de prudence et l'obligation d'image fidèle (art. 6 et 8 AUDCIF)." },
    ],
  },
  {
    id: 'cas4',
    titre: 'La SAS à capital variable des consultants de Kinshasa',
    contexte: "Douze consultants créent à Kinshasa une SAS à capital variable dont le capital statutaire est de 60 000 000 FC. Les statuts fixent le capital plancher à 4 000 000 FC. Chaque consultant apporte 5 000 000 FC. Deux ans plus tard, trois consultants se retirent et obtiennent la reprise de leurs apports ; peu après, la société fait faillite en laissant des dettes nées avant leur départ.",
    questions: [
      { num: 1, enonce: "La clause fixant le plancher est-elle valable ?", correction: "Non. Le plancher statutaire ne peut être inférieur « ni au dixième du capital social stipulé dans les statuts ni au montant minimal du capital exigé pour la forme » (art. 269-5). La SAS n'ayant pas de capital minimum (art. 853-3 écarte l'art. 387 al. 1er), seule joue la limite du dixième : 10 % de 60 000 000 = 6 000 000 FC. Un plancher de 4 000 000 FC est donc irrégulier ; la clause contraire à l'Acte uniforme est réputée non écrite (art. 2) et le plancher légal de 6 000 000 FC s'impose. Toute réduction en dessous est nulle (art. 269-5 al. 3)." },
      { num: 2, enonce: "Les consultants sortis peuvent-ils être poursuivis par les créanciers ?", correction: "Oui, dans une certaine mesure. L'associé qui cesse de faire partie de la société « reste tenu, pendant cinq (5) ans, envers les associés et envers les tiers, de toutes les obligations existant au moment de son retrait », mais seulement « dans la limite des sommes qui lui ont été restituées avant son départ » (art. 269-6 al. 3). Les créanciers dont les créances sont nées avant le départ des trois consultants peuvent donc réclamer à chacun jusqu'à 5 000 000 FC, montant repris, pendant cinq ans. Cette garantie compense l'absence de droit d'opposition des créanciers aux reprises d'apports (art. 269-3 al. 2)." },
      { num: 3, enonce: "La société devait-elle publier les retraits au RCCM ?", correction: "Non pour les simples associés : les actes constatant les augmentations ou diminutions de capital opérées dans le cadre de la variabilité, et les retraits d'associés autres que les dirigeants de la SAS, ne sont pas assujettis aux formalités de dépôt et de publication (art. 269-3 al. 1). En revanche, la société doit faire figurer la mention « à capital variable » sur tous ses actes et documents (art. 269-2), et le retrait d'un dirigeant reste soumis à publicité." },
    ],
  },
  {
    id: 'cas5',
    titre: "L'appel à l'épargne de la SAS AGRI-BUKAVU",
    contexte: "La SAS AGRI-BUKAVU, spécialisée dans le café, publie sur les réseaux sociaux une annonce invitant « tous les Congolais » à devenir actionnaires en achetant des actions à 50 000 FC chacune, avec un objectif de collecte de 400 000 000 FC. Plus de mille personnes ont déjà versé des fonds par monnaie mobile.",
    questions: [
      { num: 1, enonce: "S'agit-il d'un appel public à l'épargne ?", correction: "Oui. Une communication adressée par quelque moyen que ce soit, présentant une information suffisante sur les conditions de l'offre et sur les titres, de manière à permettre d'envisager de souscrire, constitue une offre au public (art. 83). Aucune exemption de l'art. 81-1 ne joue : le montant, converti selon l'art. 906, dépasse très largement le seuil de 50 000 000 FCFA sur douze mois, et l'offre s'adresse à plus de cent personnes qui ne sont pas des investisseurs qualifiés. La société fait donc publiquement appel à l'épargne au sens de l'art. 81." },
      { num: 2, enonce: "L'opération est-elle valable ?", correction: "Non. La SAS « ne peut faire publiquement appel à l'épargne » (art. 853-4), et « il est interdit aux sociétés n'y ayant pas été autorisées par le présent Acte uniforme de faire publiquement appel à l'épargne », « toute opération effectuée en violation » étant nulle (art. 82). Les souscriptions sont nulles et les souscripteurs peuvent obtenir la restitution de leurs fonds. Même une SA aurait dû publier au préalable un document d'information visé (art. 86 et 90) : en RDC, faute d'autorité boursière opérationnelle, le visa relève pour l'instant du ministre chargé des finances (art. 90), en attendant la mise en place de l'Autorité de régulation des marchés financiers prévue par la loi n° 26/034 du 20 août 2026." },
      { num: 3, enonce: "Comment la société aurait-elle pu lever des fonds régulièrement ?", correction: "Plusieurs voies existaient. Elle pouvait ouvrir son capital à un nombre limité d'investisseurs par une offre restreinte, adressée à moins de cent personnes non qualifiées ou à des investisseurs qualifiés, ou limitée à moins de 50 000 000 FCFA sur douze mois (art. 81-1), en veillant à ce que les titres ne soient pas ensuite revendus au public (art. 81-3). Elle pouvait recourir au crédit bancaire ou aux apports en compte courant de ses associés (compte 462). Pour un appel public, il lui aurait fallu se transformer en SA, porter son capital au minimum de 100 000 000 FCFA exigé des sociétés faisant appel public à l'épargne (art. 824), établir un document d'information soumis au visa (art. 86 et 90) et respecter le régime renforcé de la SA faisant appel public à l'épargne." },
    ],
  },
  {
    id: 'cas6',
    titre: 'Le conflit sur les dividendes chez MBOKA IMMO',
    contexte: "Dans la SARL MBOKA IMMO, l'associé majoritaire (70 %) fait voter chaque année la mise en réserve facultative de la totalité des bénéfices distribuables, alors qu'il perçoit par ailleurs, comme gérant, une rémunération très élevée. L'associée minoritaire (30 %), privée de tout dividende depuis cinq ans, veut agir. Les statuts contiennent une clause compromissoire.",
    questions: [
      { num: 1, enonce: "La mise en réserve systématique est-elle illicite ?", correction: "Pas en soi : l'assemblée détermine librement les dotations aux réserves facultatives (art. 144), et le droit aux bénéfices n'existe que « lorsque leur distribution a été décidée » (art. 53, 1°). Mais la décision devient abusive si les majoritaires l'ont votée « dans leur seul intérêt, contrairement aux intérêts des associés minoritaires, sans que cette décision ne puisse être justifiée par l'intérêt de la société » (art. 130). Une mise en réserve durable, sans projet d'investissement, alors que le majoritaire capte les bénéfices par sa rémunération de gérant, peut caractériser cet abus. Les décisions constitutives d'un abus de majorité sont nulles, et les associés qui les ont votées peuvent être condamnés à réparer le préjudice des minoritaires (art. 130)." },
      { num: 2, enonce: "Devant qui l'associée doit-elle agir ?", correction: "Le litige entre associés relève en principe de la juridiction compétente (art. 147). Mais les statuts contenant une clause compromissoire, il doit être soumis à l'arbitrage (art. 148), réglé par l'Acte uniforme relatif au droit de l'arbitrage ou par le système convenu (art. 149). L'arbitrage offre ici la confidentialité, utile dans un conflit portant sur la rémunération du gérant et la politique financière, et la possibilité de désigner un arbitre compétent en finance d'entreprise. Les parties peuvent aussi recourir à la médiation, autre mode alternatif visé par l'art. 148." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue2',
  numero: 2,
  id: 'ue2-chapitre-2',
  titre: 'La vie financière de la société : comptes, résultat, dividendes et appel au public',
  sousTitre: "AUSCGIE révisé, art. 81 à 96-1, 137 à 149, 263 à 269-7 · AUDCIF et SYSCOHADA révisé · fiscalité des dividendes et marché boursier en RDC",
  infoBulle: "L'exercice et les états financiers, le rapport de gestion et l'approbation des comptes, l'affectation du résultat et la réserve légale, le calcul du bénéfice distribuable, les dividendes et leur retenue fiscale, le dépôt des comptes et la publicité, le capital variable, l'appel public à l'épargne et la future Bourse de Kinshasa, les litiges entre associés.",
  loiRef: 'Art. 81-96-1, 137-149, 263-269-7, 346, 546, 889-890-1 AUSCGIE · AUDCIF · loi n° 23/053',
  moduleLabel: 'UE 2 · Droit des sociétés',
  retourRoute: '/ue2-droit-societes',
  coursId: 'ue2-droit-societes',
  objectifs: [
    "Articuler l'AUSCGIE et l'AUDCIF pour la production des états financiers annuels : exercice, systèmes comptables, délais et engagements hors bilan (art. 137, 139 AUSCGIE ; art. 7-13, 23-24 AUDCIF)",
    "Organiser le calendrier de clôture, du rapport de gestion à l'approbation par l'assemblée (art. 138, 140, 141)",
    "Appliquer les règles d'affectation du résultat et de constitution de la réserve légale dans la SARL et la SA (art. 142, 346, 546)",
    "Calculer le bénéfice distribuable et vérifier la règle de conservation des capitaux propres (art. 143)",
    "Décider, comptabiliser et payer un dividende, retenue fiscale comprise, et identifier un dividende fictif et ses sanctions (art. 144-146, 346, 889 ; loi n° 23/053)",
    "Accomplir le dépôt des comptes et les formalités de publicité de la vie sociale (art. 263-269, 890-1)",
    "Maîtriser le régime du capital variable (art. 269-1 à 269-7)",
    "Qualifier un appel public à l'épargne, en connaître les exemptions, le document d'information et le visa, et situer la réforme boursière congolaise de 2026 (art. 81-96-1)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Les états financiers sont établis et arrêtés par les dirigeants (art. 137) au plus tard quatre mois après la clôture d'un exercice de douze mois qui coïncide avec l'année civile ; le jeu complet comprend bilan, compte de résultat, tableau des flux de trésorerie et notes annexes (art. 7, 8 et 23 AUDCIF).",
    "Le rapport de gestion expose la situation, l'évolution prévisible, les événements postérieurs, la continuité, la trésorerie et le plan de financement (art. 138) ; les documents sont adressés au commissaire aux comptes 45 jours au moins avant l'assemblée, qui se tient dans les six mois de la clôture (art. 140).",
    "La réserve légale reçoit un dixième au moins du bénéfice diminué des pertes antérieures, jusqu'au cinquième du capital, à peine de nullité (art. 346 SARL, 546 SA).",
    "Bénéfice distribuable = résultat + report bénéficiaire - pertes antérieures - dividendes partiels - dotations aux réserves légales et statutaires (art. 143 al. 1) ; les réserves disponibles peuvent s'y ajouter sur désignation expresse ; aucune distribution ne peut ramener les capitaux propres sous le capital augmenté des réserves indisponibles (art. 143 al. 4).",
    "Le dividende naît de la décision de l'assemblée après approbation des comptes (art. 144) ; il est payé dans les neuf mois de la clôture (art. 146), comptabilisé au compte 465 et soumis en RDC à une retenue de 20 % reversée au plus tard le 15 du mois suivant (loi n° 23/053, art. 120 ; arrêté n° 008/2025).",
    "Le dividende fictif, versé sans bénéfice distribuable, est sujet à répétition dans les trois ans dans la SARL (art. 346) et fait encourir aux dirigeants une sanction pénale (art. 889).",
    "Les états financiers approuvés sont déposés au RCCM dans le mois, sous peine d'injonction sous astreinte et de sanction pénale (art. 269, 890-1) ; ce dépôt est distinct de leur remise à l'administration fiscale, où ils doivent être certifiés par un expert-comptable de l'ONEC.",
    "Le capital variable, ouvert aux SA sans appel public à l'épargne et aux SAS, dispense de publicité les variations de capital mais impose un plancher d'au moins un dixième du capital statutaire et laisse l'associé sortant tenu cinq ans dans la limite des sommes reprises (art. 269-1 à 269-7).",
    "Seule la SA peut faire publiquement appel à l'épargne, sous peine de nullité (art. 82, 853-4) ; les offres inférieures à 50 000 000 FCFA sur douze mois ou limitées aux investisseurs qualifiés ou à moins de cent personnes en sont exemptées (art. 81-1) ; le document d'information est soumis au visa de l'autorité boursière ou, à défaut, du ministre des finances (art. 90).",
    "La RDC s'est dotée d'une loi relative aux marchés boursiers (loi n° 26/034 du 20 août 2026) ; la Bourse de Kinshasa vise ses premières cotations en 2027, et les sociétés cotées devront produire des états IFRS en sus des états SYSCOHADA, qui restent seuls la base du bénéfice distribuable (art. 8 AUDCIF).",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)", precision: "30 janvier 2014 ; art. 53, 58, 81 à 96-1, 130, 137 à 149, 259, 263 à 269-7, 346, 546, 824, 853-4, 889, 890 et 890-1" },
    { genre: 'texte', intitule: "Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF) et Système comptable OHADA révisé", precision: "26 janvier 2017 ; art. 2, 5 à 13, 23, 24, 26, 28, 29, 33, 111 à 113 ; comptes 11, 12, 13, 447, 465 et 521" },
    { genre: 'texte', intitule: "Loi n° 23/053 du 30 novembre 2023 relative à l'impôt sur les sociétés et à l'impôt sur le revenu des personnes physiques", precision: "art. 120 et 126 ; applicable au 1er janvier 2026" },
    { genre: 'texte', intitule: "Arrêté ministériel n° 008/CAB/MIN/FINANCES/2025 du 19 février 2025 fixant les modalités de perception et de reversement de la retenue de l'IRPP dans la catégorie des revenus des capitaux mobiliers", precision: "art. 2 à 4" },
    { genre: 'texte', intitule: "Loi n° 004/2003 du 13 mars 2003 portant réforme des procédures fiscales, telle que modifiée par la loi n° 23/052 du 30 novembre 2023", precision: "art. 13 et 14 (états financiers joints à la déclaration et certification par un expert-comptable de l'ONEC)" },
    { genre: 'texte', intitule: "Loi de finances n° 25/060 du 29 décembre 2025 pour l'exercice 2026", precision: "dividende prioritaire des entreprises minières du portefeuille de l'État" },
    { genre: 'texte', intitule: "Loi n° 26/034 du 20 août 2026 relative aux marchés boursiers", precision: "texte non encore reproduit dans ce cours ; procédure d'adoption d'après la presse économique" },
    { genre: 'texte', intitule: "Acte uniforme relatif au droit de l'arbitrage et Acte uniforme relatif à la médiation", precision: "23 novembre 2017, auxquels renvoient les art. 148 et 149 AUSCGIE" },
    { genre: 'ouvrage', auteur: "Pougoué P.-G. (dir.)", titre: "Encyclopédie du droit OHADA", editeur: "Lamy", lieu: "Paris", annee: "2011" },
    { genre: 'ouvrage', auteur: "Diouf N., Masamba Makela R., Pougoué P.-G. et Sawadogo F. M. (coord.)", titre: "Code vert OHADA 2025. Traité et actes uniformes commentés et annotés", editeur: "Juriscope", lieu: "Poitiers", annee: "2025" },
    { genre: 'ouvrage', auteur: "Anoukaha F., Cissé A., Diouf N., Nguebou Toukam J., Pougoué P.-G. et Samb M.", titre: "OHADA. Sociétés commerciales et GIE", editeur: "Bruylant, coll. Droit uniforme africain", lieu: "Bruxelles", annee: "2002" },
    { genre: 'article', auteur: "Lanou G. R.", titre: "L'utilité juridique du capital social en droit OHADA des sociétés commerciales", support: "Revue de l'ERSUMA", precision: "n° 10, 2019, p. 177-205" },
    { genre: 'article', auteur: "Agence Ecofin", titre: "RDC : la Bourse de Kinshasa vise ses premières cotations entre juin et décembre 2027", support: "agenceecofin.com", precision: "septembre 2026" },
    { genre: 'article', auteur: "Mukoko P.", titre: "Marchés boursiers : la RDC pose les bases de son cadre légal", support: "Bankable", precision: "22 avril 2025" },
    { genre: 'article', auteur: "Zoom Eco", titre: "RDC : le Sénat donne son feu vert à la création de la Bourse de Kinshasa", support: "zoom-eco.net", precision: "27 juillet 2026" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE révisé du 30 janvier 2014 · AUDCIF du 26 janvier 2017 et SYSCOHADA révisé · Loi n° 23/053 du 30 novembre 2023 et arrêté n° 008/2025 (retenue sur les capitaux mobiliers) · Loi n° 004/2003 modifiée par la loi n° 23/052 · Loi de finances n° 25/060 pour 2026 · Loi n° 26/034 du 20 août 2026 relative aux marchés boursiers (d'après la presse économique).",
}

export default chapitre
