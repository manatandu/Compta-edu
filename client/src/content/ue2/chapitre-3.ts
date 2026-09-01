// Chapitre 3 du module UE2, Droit des sociétés : contenu pur.
// Migré depuis l'ancienne page dédiée UE2Chapitre3Page.tsx vers le moteur
// commun components/chapitre/ChapitreManuscrit.tsx, avec enrichissement du
// contenu vérifié article par article sur le texte de l'AUSCGIE révisé
// (art. 270 à 292 pour la SNC, art. 293 à 308 pour la SCS, art. 9).
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'l1q1', question: "Selon l'Art. 270 AUSCGIE, quelle est la définition légale exacte de la SNC ?",
    options: [
      { id: 'a', texte: "Société dont les associés répondent dans la limite de leurs apports" },
      { id: 'b', texte: "Société dans laquelle tous les associés sont commerçants et répondent indéfiniment et solidairement des dettes sociales" },
      { id: 'c', texte: "Société dont le capital est divisé en actions librement négociables" },
      { id: 'd', texte: "Société dans laquelle coexistent des associés à responsabilité limitée et illimitée" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 270 AUSCGIE',
    explication: "L'Art. 270 AUSCGIE définit la SNC comme celle dans laquelle tous les associés sont commerçants et répondent indéfiniment (sur tout leur patrimoine personnel) et solidairement (chacun peut être poursuivi pour la totalité) des dettes sociales.",
  },
  {
    id: 'l1q2', question: "Avant de poursuivre un associé de SNC, que doit obligatoirement faire le créancier ?",
    options: [
      { id: 'a', texte: "Saisir directement les biens personnels de l'associé le plus solvable" },
      { id: 'b', texte: "Obtenir un jugement favorable contre la société" },
      { id: 'c', texte: "Mettre la société en demeure et attendre 60 jours sans paiement (Art. 271 AUSCGIE)" },
      { id: 'd', texte: "Notifier tous les associés individuellement" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 271 AUSCGIE',
    explication: "L'Art. 271 AUSCGIE impose une condition préalable impérative : le créancier doit mettre en demeure la société (par acte d'huissier ou tout moyen permettant d'établir sa réception effective) et attendre au minimum 60 jours. Sans cette mise en demeure, les poursuites contre les associés sont irrecevables.",
  },
  {
    id: 'l1q3', question: "Des époux peuvent-ils être associés ensemble dans une SNC ?",
    options: [
      { id: 'a', texte: "Oui, sans restriction aucune" },
      { id: 'b', texte: "Oui, si leur régime matrimonial est la séparation de biens" },
      { id: 'c', texte: "Non, l'Art. 9 AUSCGIE l'interdit expressément" },
      { id: 'd', texte: "Oui, mais uniquement si l'un d'eux n'est pas gérant" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 9 AUSCGIE',
    explication: "L'Art. 9 AUSCGIE dispose que des époux ne peuvent être associés d'une société dans laquelle ils seraient tenus des dettes sociales indéfiniment ou solidairement. La SNC entre exactement dans cette catégorie.",
  },
  {
    id: 'l2q1', question: "Dans une SNC sans clause statutaire de gérance, qui assure la gestion ?",
    options: [
      { id: 'a', texte: "L'associé détenant le plus de parts sociales" },
      { id: 'b', texte: "Un gérant désigné par le RCCM" },
      { id: 'c', texte: "Tous les associés sont réputés être gérants (Art. 276 AUSCGIE)" },
      { id: 'd', texte: "La société ne peut pas fonctionner" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 276 AUSCGIE',
    explication: "L'Art. 276 AUSCGIE dispose qu'à défaut d'organisation de la gérance par les statuts, tous les associés sont réputés être gérants. Chacun peut accomplir tous les actes de gestion dans l'intérêt de la société.",
  },
  {
    id: 'l2q2', question: "La cession de parts sociales dans une SNC requiert :",
    options: [
      { id: 'a', texte: "L'accord d'une majorité de 2/3 des associés" },
      { id: 'b', texte: "Le consentement unanime de tous les associés (Art. 274 AUSCGIE)" },
      { id: 'c', texte: "Uniquement l'accord du gérant" },
      { id: 'd', texte: "L'autorisation du RCCM" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 274 AUSCGIE',
    explication: "L'Art. 274 AUSCGIE impose le consentement unanime des associés pour toute cession de parts sociales dans une SNC. Toute cession intervenue en violation de cette règle est nulle.",
  },
  {
    id: 'l2q3', question: "Que se passe-t-il si un gérant statutaire de SNC est révoqué ?",
    options: [
      { id: 'a', texte: "Il continue à gérer jusqu'à la prochaine AG" },
      { id: 'b', texte: "La révocation peut entraîner la dissolution de la société, sauf clause contraire (Art. 279)" },
      { id: 'c', texte: "Le RCCM nomme un gérant provisoire" },
      { id: 'd', texte: "La révocation n'est pas possible pour un gérant statutaire" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 279 AUSCGIE',
    explication: "L'Art. 279 AUSCGIE prévoit que la révocation d'un gérant associé désigné par les statuts (décidée à l'unanimité des autres associés) entraîne la dissolution de la société, à moins que sa continuation ne soit prévue dans les statuts ou que les autres associés ne la décident à l'unanimité.",
  },
  {
    id: 'l2q4', question: "Comment est fixée la rémunération d'un gérant qui est lui-même associé de SNC ?",
    options: [
      { id: 'a', texte: "Par le gérant lui-même" },
      { id: 'b', texte: "Par l'unanimité de tous les associés y compris le gérant" },
      { id: 'c', texte: "Par la majorité en nombre et capital des AUTRES associés, le gérant exclu (Art. 278 al. 2)" },
      { id: 'd', texte: "Par le conseil de surveillance" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 278 al. 2 AUSCGIE',
    explication: "L'Art. 278 al. 2 AUSCGIE écarte le gérant-associé du vote sur sa propre rémunération : celle-ci est fixée à la majorité en nombre et en capital des autres associés. Les délibérations prises en violation de cette règle sont nulles (Art. 278 al. 3).",
  },
  {
    id: 'e1', question: "À défaut d'unanimité des associés sur une cession de parts de SNC, que permet l'AUSCGIE ?",
    options: [
      { id: 'a', texte: "Le juge peut autoriser la cession forcée à la majorité" },
      { id: 'b', texte: "La cession ne peut avoir lieu, mais les statuts peuvent aménager une procédure de rachat pour permettre le retrait de l'associé cédant (Art. 274 al. 2)" },
      { id: 'c', texte: "La cession devient libre après un délai de six mois" },
      { id: 'd', texte: "L'associé peut céder ses parts à la société elle-même sans formalité" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 274 al. 2 AUSCGIE',
    explication: "L'Art. 274 al. 2 AUSCGIE dispose qu'à défaut d'unanimité, la cession ne peut avoir lieu, mais que les statuts peuvent aménager une procédure de rachat pour permettre le retrait de l'associé cédant. C'est la soupape de sécurité de l'intuitu personae : l'associé prisonnier de ses parts peut sortir si les statuts l'ont organisé.",
  },
  {
    id: 'e2', question: "En cas de pluralité de gérants dans une SNC, un gérant peut-il s'opposer à une opération engagée par un autre gérant ?",
    options: [
      { id: 'a', texte: "Non, chaque gérant est totalement indépendant" },
      { id: 'b', texte: "Oui, chacun peut s'opposer à toute opération avant qu'elle ne soit conclue ; mais cette opposition est sans effet à l'égard des tiers, sauf s'il est établi qu'ils en ont eu connaissance" },
      { id: 'c', texte: "Oui, et l'opposition annule automatiquement l'opération même vis-à-vis des tiers" },
      { id: 'd', texte: "Seulement avec l'autorisation de l'assemblée des associés" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 277 et 277-1 AUSCGIE',
    explication: "L'Art. 277 AUSCGIE donne à chaque gérant, en cas de pluralité, les mêmes pouvoirs que s'il était seul gérant, sauf le droit pour chacun de s'opposer à toute opération avant qu'elle ne soit conclue. L'Art. 277-1 précise que cette opposition est sans effet à l'égard des tiers, à moins qu'il soit établi qu'ils en ont eu connaissance.",
  },
  {
    id: 'l3q1', question: "Combien de fois par an les associés non gérants peuvent-ils consulter les livres comptables ?",
    options: [
      { id: 'a', texte: "Une fois" },
      { id: 'b', texte: "Deux fois (Art. 289 AUSCGIE)" },
      { id: 'c', texte: "Trois fois" },
      { id: 'd', texte: "À tout moment sans restriction" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 289 AUSCGIE',
    explication: "L'Art. 289 AUSCGIE accorde aux associés non gérants le droit de consulter au siège social, deux fois par an, tous les documents et pièces comptables ainsi que les procès-verbaux, avec un préavis de 15 jours aux gérants. Ils peuvent en prendre copie à leurs frais et se faire assister d'un expert-comptable ou d'un commissaire aux comptes.",
  },
  {
    id: 'l3q2', question: "Un associé de SNC décède. Ses héritiers sont mineurs non émancipés et les statuts prévoient la continuation. Quelle transformation s'impose ?",
    options: [
      { id: 'a', texte: "Transformation en SA dans 6 mois" },
      { id: 'b', texte: "Dissolution immédiate" },
      { id: 'c', texte: "Transformation en société en commandite dans 1 an, le mineur devenant commanditaire (Art. 290)" },
      { id: 'd', texte: "Les mineurs reprennent les parts avec responsabilité illimitée" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 290 AUSCGIE',
    explication: "L'Art. 290 AUSCGIE impose, en cas de continuation avec des héritiers mineurs non émancipés, la transformation de la société dans le délai d'un an à compter du décès en société en commandite dont le mineur devient commanditaire. À défaut, elle est dissoute. Dans l'intervalle, les mineurs ne répondent des dettes sociales qu'à concurrence des parts de la succession de leur auteur.",
  },
  {
    id: 'l3q3', question: "Dans une SNC, l'AG annuelle doit se tenir dans quel délai ?",
    options: [
      { id: 'a', texte: "3 mois après la clôture" },
      { id: 'b', texte: "6 mois après la clôture (Art. 288 AUSCGIE)" },
      { id: 'c', texte: "9 mois après la clôture" },
      { id: 'd', texte: "12 mois après la clôture" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 288 AUSCGIE',
    explication: "L'Art. 288 AUSCGIE fixe à 6 mois après la clôture de l'exercice le délai pour tenir l'assemblée générale annuelle de la SNC. Ce délai est identique pour la SCS (Art. 306).",
  },
  {
    id: 'e3', question: "Une SNC ne dépasse aucun des seuils rendant le commissaire aux comptes obligatoire. Sa nomination peut-elle néanmoins être imposée ?",
    options: [
      { id: 'a', texte: "Non, elle est impossible sous les seuils" },
      { id: 'b', texte: "Oui, elle peut être demandée en justice par un ou plusieurs associés détenant au moins le dixième du capital social (Art. 289-1)" },
      { id: 'c', texte: "Oui, mais uniquement par décision unanime des associés" },
      { id: 'd', texte: "Oui, sur simple demande d'un créancier de la société" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 289-1 AUSCGIE',
    explication: "L'Art. 289-1 AUSCGIE rend la nomination d'un commissaire aux comptes facultative pour les SNC sous les seuils, mais permet qu'elle soit demandée en justice par un ou plusieurs associés détenant au moins le dixième du capital social. C'est une protection des minoritaires contre l'opacité de la gestion.",
  },
  {
    id: 'l4q1', question: "Quelle est la définition légale de la SCS selon l'Art. 293 AUSCGIE ?",
    options: [
      { id: 'a', texte: "Société dans laquelle tous les associés ont une responsabilité limitée à leurs apports" },
      { id: 'b', texte: "Société dans laquelle coexistent des commandités (responsabilité illimitée) et des commanditaires (responsabilité limitée aux apports)" },
      { id: 'c', texte: "Société anonyme par actions simplifiée" },
      { id: 'd', texte: "Société dont le capital est divisé en actions cotées en bourse" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 293 AUSCGIE',
    explication: "L'Art. 293 AUSCGIE définit la SCS comme celle dans laquelle coexistent un ou plusieurs associés indéfiniment et solidairement responsables des dettes sociales (« associés commandités ») avec un ou plusieurs associés responsables dans la limite de leurs apports (« associés commanditaires »), le capital étant divisé en parts sociales.",
  },
  {
    id: 'l4q2', question: "Un commanditaire peut-il accomplir des actes de gestion externe même avec une procuration ?",
    options: [
      { id: 'a', texte: "Oui, avec une procuration validée par les commandités" },
      { id: 'b', texte: "Oui, pour les actes n'excédant pas 5 000 000 FCFA" },
      { id: 'c', texte: "Non, l'Art. 299 AUSCGIE interdit tout acte de gestion externe au commanditaire, même par procuration" },
      { id: 'd', texte: "Oui, si la procuration est notariée" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 299 AUSCGIE',
    explication: "L'Art. 299 AUSCGIE est catégorique : les commanditaires ne peuvent faire aucun acte de gestion externe, même en vertu d'une procuration. Une procuration ne peut pas légaliser ce que la loi interdit.",
  },
  {
    id: 'l4q3', question: "Que risque un commanditaire dont le nom figure dans la dénomination sociale de la SCS ?",
    options: [
      { id: 'a', texte: "Une amende administrative" },
      { id: 'b', texte: "Il devient automatiquement commandité" },
      { id: 'c', texte: "Il répond indéfiniment et solidairement des dettes sociales (Art. 294 AUSCGIE)" },
      { id: 'd', texte: "La dénomination est nulle mais sans autre conséquence" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 294 al. 2 AUSCGIE',
    explication: "L'Art. 294 al. 2 AUSCGIE dispose que le nom d'un associé commanditaire ne peut en aucun cas être incorporé à la dénomination sociale, à défaut de quoi ce dernier répond indéfiniment et solidairement des dettes sociales.",
  },
  {
    id: 'l5q1', question: "Quelle majorité est requise pour modifier les statuts d'une SCS ?",
    options: [
      { id: 'a', texte: "Majorité simple de tous les associés" },
      { id: 'b', texte: "Unanimité de tous les associés (commandités + commanditaires)" },
      { id: 'c', texte: "Consentement de tous les commandités + majorité en nombre et en capital des commanditaires (Art. 305)" },
      { id: 'd', texte: "Majorité des commandités uniquement" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 305 AUSCGIE',
    explication: "L'Art. 305 AUSCGIE requiert le consentement de tous les associés commandités ET la majorité en nombre et en capital des associés commanditaires pour toute modification des statuts de la SCS. Toute délibération prise en violation de cet article est nulle.",
  },
  {
    id: 'l5q2', question: "Que se passe-t-il lors du décès d'un associé commanditaire dans une SCS ?",
    options: [
      { id: 'a', texte: "La SCS est dissoute de plein droit" },
      { id: 'b', texte: "La SCS continue - le décès d'un commanditaire ne met pas fin à la société (Art. 308)" },
      { id: 'c', texte: "Les héritiers doivent obligatoirement être agréés par les commandités" },
      { id: 'd', texte: "La SCS doit être transformée en SNC dans 1 an" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 308 AUSCGIE',
    explication: "L'Art. 308 AUSCGIE dispose expressément que la société continue malgré le décès d'un associé commanditaire. C'est une différence fondamentale avec la SNC où le décès d'un associé entraîne en principe la dissolution.",
  },
  {
    id: 'l5q3', question: "Un commanditaire peut-il exercer un contrôle sur la gestion de la SCS sans perdre sa responsabilité limitée ?",
    options: [
      { id: 'a', texte: "Non, tout contrôle lui est interdit" },
      { id: 'b', texte: "Oui, les avis et conseils, les actes de contrôle et de surveillance n'engagent pas les commanditaires (Art. 301)" },
      { id: 'c', texte: "Oui, mais uniquement pour les actes inférieurs à 1 000 000 FCFA" },
      { id: 'd', texte: "Non, sauf autorisation expresse des commandités" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 301 AUSCGIE',
    explication: "L'Art. 301 AUSCGIE dispose que les avis et conseils, les actes de contrôle et de surveillance n'engagent pas les associés commanditaires. Ces actes ne constituent pas une gestion externe et ne font pas perdre la responsabilité limitée.",
  },
  {
    id: 'e4', question: "Outre la communication des livres, quel droit l'Art. 307 AUSCGIE accorde-t-il aux commanditaires et aux commandités non gérants ?",
    options: [
      { id: 'a', texte: "Le droit de convoquer eux-mêmes l'assemblée générale annuelle" },
      { id: 'b', texte: "Le droit de poser par écrit des questions sur la gestion sociale, auxquelles il doit être répondu également par écrit" },
      { id: 'c', texte: "Le droit de révoquer le gérant à la majorité simple" },
      { id: 'd', texte: "Le droit de bloquer toute cession de parts" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 307 AUSCGIE',
    explication: "L'Art. 307 AUSCGIE accorde aux associés commanditaires et aux associés commandités non gérants, deux fois par an, la communication des livres et documents sociaux ET le droit de poser par écrit des questions sur la gestion sociale, auxquelles il doit être répondu également par écrit. Le gérant ne peut pas rester silencieux.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '3.1',
    titre: 'La SNC : définition, responsabilité et intuitu personae (Art. 270-273)',
    navLabel: '3.1 SNC : définition et responsabilité',
    blocs: [
      { type: 'paragraphe', texte: "La **société en nom collectif (SNC)** est la plus ancienne et la plus rigoureuse des formes sociales du droit OHADA. L'Art. 270 AUSCGIE la définit comme celle dans laquelle **tous les associés sont commerçants et répondent indéfiniment et solidairement des dettes sociales**. Cette définition concentre en une phrase les trois piliers du régime, et explique pourquoi la SNC est devenue rare en pratique : la responsabilité illimitée sur le patrimoine personnel est difficilement compatible avec la prise de risque entrepreneuriale, et la SARL comme la SAS l'ont largement supplantée." },
      { type: 'carte', titre: 'Les trois piliers de la SNC (Art. 270)', liste: [
        "**Tous les associés ont la qualité de commerçant.** Conséquences : un mineur non émancipé ne peut pas être associé ; des époux ne peuvent pas s'y associer ensemble, l'Art. 9 AUSCGIE interdisant aux époux d'être associés d'une société où ils seraient tenus des dettes sociales indéfiniment ou solidairement ; les personnes frappées d'incompatibilité avec l'exercice du commerce non plus.",
        "**Responsabilité indéfinie.** Chaque associé répond des dettes sociales sur la totalité de son patrimoine personnel, sans aucune limite : immeubles, véhicules, comptes bancaires, salaires. Aucun bouclier patrimonial.",
        "**Responsabilité solidaire.** Le créancier peut choisir librement contre quel associé agir et lui réclamer la totalité de la dette - il poursuivra naturellement le plus solvable. L'associé qui a payé au-delà de sa part dispose ensuite d'un recours en contribution contre ses co-associés.",
      ] },
      { type: 'filet', titre: 'Art. 271 AUSCGIE - Condition préalable impérative aux poursuites', texte: "Les créanciers de la société ne peuvent poursuivre le paiement des dettes sociales contre un associé que **soixante (60) jours au moins** après avoir vainement mis en demeure la société. La mise en demeure est faite **par acte d'huissier ou notifiée par tout moyen permettant d'établir sa réception effective** par le destinataire. Ce délai peut être prorogé par décision de la juridiction compétente statuant à bref délai, sans que la prorogation puisse excéder **trente (30) jours**. Sans cette mise en demeure préalable, les poursuites contre les associés sont irrecevables." },
      { type: 'paragraphe', texte: "La SNC est désignée par une **dénomination sociale**, à laquelle peut être incorporé le nom d'un ou plusieurs associés, et qui doit être immédiatement précédée ou suivie, en caractères lisibles, des mots *« société en nom collectif »* ou du sigle *« S.N.C. »* (Art. 272). Le capital social, dont aucun montant minimum n'est imposé, est divisé en **parts sociales de même valeur nominale** (Art. 273)." },
      { type: 'paragraphe', texte: "Le principe d'**intuitu personae** (« en considération de la personne ») est le fondement philosophique de la SNC : chaque associé s'engage en fonction de la personne de ses co-associés, puisque la défaillance de l'un peut ruiner les autres. Il explique toutes les règles strictes du régime : cession des parts à l'unanimité, dissolution de principe au décès d'un associé, droit de contrôle individuel de chaque associé sur la gestion." },
      { type: 'carte', titre: "Vue d'ensemble du régime de la SNC", tableau: { entetes: ['Caractéristique', 'Règle SNC', 'Référence'], lignes: [
        ['Qualité des associés', 'Tous commerçants', 'Art. 270'],
        ['Responsabilité', 'Indéfinie et solidaire sur le patrimoine personnel', 'Art. 270'],
        ["Poursuite d'un associé", 'Mise en demeure préalable de la société + 60 jours min. (prorogation judiciaire max. 30 jours)', 'Art. 271'],
        ['Dénomination', 'Doit comporter « société en nom collectif » ou « S.N.C. »', 'Art. 272'],
        ['Capital minimum', 'Aucun - parts sociales de même valeur nominale', 'Art. 273'],
        ['Cession des parts', 'Consentement unanime des associés', 'Art. 274'],
        ['CAC obligatoire', 'Si 2 des 3 seuils : bilan > 250 M, CA > 500 M FCFA, effectif > 50', 'Art. 289-1'],
      ] } },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[2] },
    ],
  },
  {
    numero: '3.2',
    titre: 'La SNC : cession des parts et gérance (Art. 274-282)',
    navLabel: '3.2 SNC : cession et gérance',
    blocs: [
      { type: 'paragraphe', texte: "La cession des parts d'une SNC est l'une des opérations les plus encadrées du droit OHADA. L'Art. 274 AUSCGIE pose le principe de l'**unanimité** : les parts sociales ne peuvent être cédées qu'avec le consentement unanime des associés, et **toute cession intervenue en violation de cette règle est nulle**. C'est la traduction la plus directe de l'intuitu personae : nul ne peut imposer un nouvel associé aux autres." },
      { type: 'filet', titre: "Art. 274 al. 2 - La soupape de sortie de l'associé cédant", texte: "À défaut d'unanimité, la cession ne peut avoir lieu, mais **les statuts peuvent aménager une procédure de rachat pour permettre le retrait de l'associé cédant**. Sans cette clause, l'associé auquel ses co-associés refusent tout cessionnaire reste prisonnier de ses parts - et de sa responsabilité indéfinie. La rédaction des statuts est donc décisive." },
      { type: 'carte', titre: 'Formalités de cession (Art. 275) - trois voies possibles', liste: [
        "**1. Signification à la société par exploit d'huissier** : notification formelle par acte extrajudiciaire, voie la plus sécurisante juridiquement.",
        "**2. Acceptation de la cession par la société dans un acte authentique** : la société accepte formellement la cession dans un acte notarié.",
        "**3. Dépôt d'un original de l'acte de cession au siège social** contre remise par le gérant d'une attestation de dépôt : voie la plus simple en pratique.",
      ], note: "La cession doit être constatée par écrit. Elle n'est opposable aux tiers qu'après l'accomplissement de l'une de ces formalités **et** après publication par dépôt en annexe au registre du commerce et du crédit mobilier (Art. 275)." },
      { type: 'paragraphe', texte: "Les statuts organisent la gérance (Art. 276). Ils peuvent désigner un ou plusieurs gérants, **associés ou non, personnes physiques ou morales**, ou en prévoir la désignation dans un acte ultérieur. Si une personne morale est gérante, ses dirigeants sont soumis aux mêmes conditions et obligations et encourent les mêmes responsabilités civiles et pénales que s'ils étaient gérants en leur nom propre, sans préjudice de la responsabilité solidaire de la personne morale qu'ils dirigent. **À défaut d'organisation de la gérance par les statuts, tous les associés sont réputés être gérants.**" },
      { type: 'carte', titre: "L'organisation de la gérance", tableau: { entetes: ['Situation', 'Règle applicable', 'Article'], lignes: [
        ['Aucune clause statutaire', 'Tous les associés sont réputés être gérants', 'Art. 276'],
        ['Pouvoirs entre associés', "À défaut de détermination statutaire, le gérant peut accomplir tous les actes de gestion dans l'intérêt de la société", 'Art. 277'],
        ['Pluralité de gérants', "Chacun détient les mêmes pouvoirs que s'il était seul gérant, sauf le droit pour chacun de s'opposer à toute opération *avant qu'elle ne soit conclue*", 'Art. 277'],
        ['Pouvoirs vis-à-vis des tiers', "Le gérant engage la société par les actes entrant dans l'objet social ; l'opposition d'un gérant aux actes d'un autre est sans effet à l'égard des tiers, sauf s'il est établi qu'ils en ont eu connaissance", 'Art. 277-1'],
        ['Clauses limitant les pouvoirs', 'Inopposables aux tiers de bonne foi', 'Art. 277-1'],
        ['Révocation : tous associés gérants ou gérant associé statutaire', 'Unanimité des autres associés - entraîne dissolution, sauf continuation statutaire ou décidée à l\'unanimité des autres', 'Art. 279'],
        ['Révocation : gérant non statutaire (associé ou non)', 'Majorité en nombre et en capital des associés (des *autres* associés si le gérant est associé)', 'Art. 280'],
        ['Révocation sans justes motifs', 'Peut donner lieu à dommages et intérêts', 'Art. 281'],
        ['Sanction des irrégularités', 'Les actes ou délibérations pris en violation des Art. 279 et 280 al. 2 et 3 sont nuls', 'Art. 282'],
      ] } },
      { type: 'paragraphe', texte: "**Rémunération du gérant (Art. 278).** Sauf clause contraire des statuts, la rémunération des gérants est fixée par les associés, à la **majorité en nombre et en capital**. Si le gérant est lui-même associé, la décision est prise à la majorité en nombre et en capital des **autres** associés : le gérant ne vote pas sur sa propre rémunération. Les délibérations prises en violation de ces règles sont **nulles** (Art. 278 al. 3)." },
      { type: 'paragraphe', texte: "**Droit de retrait du gérant révoqué (Art. 280 al. 1).** Le gérant associé révoqué peut décider de se retirer de la société en demandant le remboursement de ses titres sociaux, dont la valeur est fixée, à défaut d'accord entre les parties, par un expert désigné par la juridiction compétente statuant à bref délai. Si la révocation est décidée sans justes motifs, elle peut donner lieu à des dommages et intérêts (Art. 281) - les deux droits se cumulent." },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
    ],
  },
  {
    numero: '3.3',
    titre: 'La SNC : décisions collectives, contrôle et dissolution (Art. 283-292)',
    navLabel: '3.3 SNC : décisions et dissolution',
    blocs: [
      { type: 'paragraphe', texte: "Toutes les décisions qui excèdent les pouvoirs des gérants sont prises à l'**unanimité** des associés ; les statuts peuvent toutefois prévoir que certaines décisions seront prises à une majorité qu'ils fixent (Art. 283). Les décisions collectives sont prises **en assemblée ou par consultation écrite**, la consultation écrite n'étant possible que si la réunion d'une assemblée n'est pas demandée par l'un des associés (Art. 284). Les statuts définissent les règles de modalités de consultation, de quorum et de majorité (Art. 285). Dans les trois cas, les délibérations prises en violation de ces règles sont **nulles**." },
      { type: 'filet', titre: 'Convocation et procès-verbal (Art. 286-287)', texte: "L'assemblée générale est convoquée par le ou l'un des gérants **au moins quinze (15) jours avant sa tenue**, par lettre au porteur contre récépissé, lettre recommandée avec demande d'avis de réception, télécopie ou courrier électronique. Les convocations par télécopie ou courrier électronique ne sont valables que si l'associé a **préalablement donné son accord écrit** et communiqué son numéro ou son adresse. La convocation indique la date, le lieu de réunion et l'ordre du jour. Toute assemblée irrégulièrement convoquée peut être annulée, mais **l'action en nullité n'est pas recevable lorsque tous les associés étaient présents ou représentés**. Le procès-verbal doit être signé par chacun des associés présents ou représentés ; en cas de consultation écrite, la réponse de chaque associé y est annexée et le procès-verbal est signé par les gérants (Art. 287)." },
      { type: 'paragraphe', texte: "**L'assemblée générale annuelle (Art. 288)** se tient chaque année dans les **six (6) mois** qui suivent la clôture de l'exercice : le rapport de gestion, l'inventaire et les états financiers de synthèse établis par les gérants y sont soumis à l'approbation des associés. Ces documents, le texte des résolutions proposées et, le cas échéant, le rapport du commissaire aux comptes sont communiqués aux associés **au moins quinze (15) jours avant** l'assemblée. Celle-ci ne peut valablement se tenir que si elle réunit **une majorité d'associés représentant la moitié du capital social** - toute délibération prise en violation de ce quorum est nulle. L'assemblée est présidée par l'associé représentant, par lui-même ou comme mandataire, le plus grand nombre de parts sociales." },
      { type: 'carte', titre: 'Droit de consultation des associés non gérants (Art. 289)', liste: [
        "**Fréquence** : deux (2) fois par an, au siège social.",
        "**Documents accessibles** : tous les documents et pièces comptables, ainsi que les procès-verbaux des délibérations et décisions collectives, avec le droit d'en prendre copie à leurs frais.",
        "**Préavis obligatoire** : avertir les gérants au moins quinze (15) jours à l'avance, par lettre au porteur contre récépissé, lettre recommandée avec avis de réception ou télécopie.",
        "**Assistance** : droit de se faire assister par un expert-comptable ou un commissaire aux comptes, à leurs frais.",
      ] },
      { type: 'filet', titre: 'Art. 289-1 - Le commissaire aux comptes dans la SNC', texte: "Les SNC qui remplissent, à la clôture de l'exercice, **deux (2) des trois conditions** suivantes - total du bilan supérieur à **250 000 000 FCFA**, chiffre d'affaires annuel supérieur à **500 000 000 FCFA**, effectif permanent supérieur à **50 personnes** - sont tenues de désigner au moins un commissaire aux comptes. L'obligation cesse lorsque la société n'a pas rempli deux de ces conditions pendant les **deux exercices** précédant l'expiration du mandat. Pour les autres SNC, la nomination est facultative, mais elle peut être **demandée en justice par un ou plusieurs associés détenant au moins le dixième du capital social**. Les dispositions des Art. 377 et suivants s'appliquent à tout commissaire ainsi désigné." },
      { type: 'carte', titre: 'La fin de la SNC (Art. 290-292)', tableau: { entetes: ['Cause', 'Règle', 'Article'], lignes: [
        ["Décès d'un associé", "Principe : la société prend fin. Exception : les statuts peuvent prévoir la continuation entre les associés survivants seuls, ou avec les héritiers ou successeurs du défunt, avec ou sans agrément", 'Art. 290'],
        ['Héritiers non agréés', "Les associés survivants doivent racheter leurs parts sociales aux héritiers ou successeurs non agréés", 'Art. 290'],
        ['Héritiers mineurs non émancipés', "En cas de continuation, ils ne répondent des dettes sociales qu'à **concurrence des parts de la succession** de leur auteur ; la société doit être transformée dans **1 an** en société en commandite dont le mineur devient commanditaire, à défaut de quoi elle est dissoute", 'Art. 290'],
        ['Liquidation des biens, faillite, incapacité, interdiction frappant un associé', 'La société prend fin, à moins que les statuts ne prévoient la continuation ou que les autres associés ne la décident à l\'unanimité', 'Art. 291'],
        ['Remboursement des parts', "Valeur fixée conformément à l'Art. 59 (accord des parties ou expert) ; les associés tenus au rachat sont **indéfiniment et solidairement** tenus du paiement de ces parts", 'Art. 292'],
      ] } },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[12] },
    ],
  },
  {
    numero: '3.4',
    titre: 'La SCS : dualité commandités / commanditaires (Art. 293-301)',
    navLabel: '3.4 SCS : commandités et commanditaires',
    blocs: [
      { type: 'paragraphe', texte: "La **société en commandite simple (SCS)** est une forme hybride qui fait coexister deux catégories d'associés aux statuts radicalement différents. L'Art. 293 AUSCGIE la définit comme celle dans laquelle coexistent un ou plusieurs associés indéfiniment et solidairement responsables des dettes sociales, dénommés **« associés commandités »**, avec un ou plusieurs associés responsables des dettes sociales dans la limite de leurs apports, dénommés **« associés commanditaires »** ou « associés en commandite », et dont le capital est divisé en parts sociales. L'Art. 293-1, inséré par la révision de 2014, précise que **les dispositions relatives aux SNC sont applicables aux SCS sous réserve des règles propres** des Art. 293 à 308 : la SCS est techniquement une SNC à deux vitesses." },
      { type: 'carte', titre: 'Deux statuts radicalement opposés', tableau: { entetes: ['Critère', 'Commandités (associés actifs)', 'Commanditaires (investisseurs)'], lignes: [
        ['Responsabilité', 'Indéfinie et solidaire, sur tout le patrimoine', 'Limitée à leurs apports'],
        ['Gérance', 'Seuls habilités à gérer (Art. 298)', 'Aucun acte de gestion externe, même par procuration (Art. 299)'],
        ['Dénomination sociale', 'Leur nom peut y figurer', 'Leur nom ne peut **en aucun cas** y être incorporé (Art. 294)'],
        ['Surveillance', '-', 'Avis, conseils, actes de contrôle et de surveillance autorisés (Art. 301)'],
        ['Information', 'Commandités non gérants : communication 2 fois/an (Art. 307)', 'Communication des livres et questions écrites 2 fois/an (Art. 307)'],
      ] } },
      { type: 'filet', titre: 'Deux sanctions redoutables pour le commanditaire', texte: "**Nom dans la dénomination (Art. 294 al. 2)** : la dénomination sociale doit être précédée ou suivie des mots *« société en commandite simple »* ou du sigle *« S.C.S. »* ; le nom d'un commanditaire ne peut en aucun cas y être incorporé, à défaut de quoi ce dernier **répond indéfiniment et solidairement des dettes sociales**. **Immixtion dans la gestion (Art. 300)** : le commanditaire qui contrevient à la prohibition de l'Art. 299 est obligé indéfiniment et solidairement avec les commandités pour les dettes et engagements *dérivant des actes de gestion qu'il a faits* ; suivant le nombre ou la gravité de ces actes, il peut être obligé **pour tous les engagements de la société ou pour quelques-uns seulement**." },
      { type: 'paragraphe', texte: "La frontière est tracée par l'Art. 301 : **les avis et conseils, les actes de contrôle et de surveillance n'engagent pas les associés commanditaires**. Le commanditaire peut donc conseiller, vérifier, interroger - mais jamais agir au nom de la société vis-à-vis des tiers." },
      { type: 'carte', titre: 'Mentions statutaires obligatoires propres à la SCS (Art. 295)', liste: [
        "**1.** Le montant ou la valeur des apports de **tous** les associés ;",
        "**2.** La part dans ce montant ou cette valeur de **chaque** associé commandité ou commanditaire ;",
        "**3.** La part **globale** des associés commandités et la part de **chaque** associé commanditaire dans la répartition des bénéfices et dans le boni de liquidation.",
      ], note: "Ces indications s'ajoutent aux mentions communes à toutes les sociétés. Elles rendent la géométrie financière de la commandite transparente dès la constitution." },
      { type: 'paragraphe', texte: "**Cession des parts (Art. 296-297).** Le principe reste l'unanimité : les parts ne peuvent être cédées qu'avec le consentement de tous les associés. Les statuts peuvent toutefois stipuler trois assouplissements : **1°** la libre cessibilité des parts des commanditaires *entre associés* ; **2°** la cession des parts des commanditaires à des tiers étrangers à la société avec le consentement de **tous les commandités** et de la **majorité en nombre et en capital des commanditaires** ; **3°** la cession par un commandité d'**une partie** de ses parts à un commanditaire ou à un tiers, avec le même double consentement. Toute cession intervenue en violation de ces règles est **nulle**. Les formalités d'opposabilité sont identiques à celles de la SNC : écrit, puis signification par huissier, acceptation dans un acte authentique ou dépôt au siège contre attestation, et publication au RCCM (Art. 297)." },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[15] },
    ],
  },
  {
    numero: '3.5',
    titre: 'La SCS : gérance, décisions collectives et dissolution (Art. 298-308)',
    navLabel: '3.5 SCS : décisions et dissolution',
    blocs: [
      { type: 'paragraphe', texte: "La SCS est gérée par **tous les associés commandités**, sauf clause contraire des statuts qui peuvent désigner un ou plusieurs gérants **parmi les associés commandités**, ou en prévoir la désignation par un acte ultérieur, dans les mêmes conditions et avec les mêmes pouvoirs que dans une SNC (Art. 298). Un commanditaire ne peut donc jamais être gérant." },
      { type: 'carte', titre: 'Décisions collectives et assemblées (Art. 302-307)', tableau: { entetes: ['Objet', 'Règle applicable', 'Article'], lignes: [
        ['Décisions excédant les pouvoirs des gérants', "Prises par la collectivité des associés ; les statuts fixent les modalités (assemblée ou consultation écrite), le quorum et les majorités - délibérations contraires nulles", 'Art. 302'],
        ['Assemblée de droit', "La réunion d'une assemblée de **tous** les associés est de droit si elle est demandée soit par **un** commandité, soit par le **quart en nombre et en capital** des commanditaires", 'Art. 302 al. 3'],
        ['Convocation', "Par un gérant, au moins 15 jours avant, mêmes moyens et mêmes garanties que dans la SNC ; nullité irrecevable si tous les associés étaient présents ou représentés", 'Art. 303'],
        ['Procès-verbal', "Signé par chacun des associés présents ; en cas de consultation écrite, réponses annexées et signature des gérants", 'Art. 304'],
        ['Modification des statuts', "Consentement de **tous les commandités** + **majorité en nombre et en capital des commanditaires** - délibération contraire nulle", 'Art. 305'],
        ['AG annuelle', "Dans les 6 mois de la clôture ; documents communiqués 15 jours avant ; quorum : majorité d'associés représentant **au moins la moitié du capital** ; présidence à l'associé représentant le plus grand nombre de parts", 'Art. 306'],
      ] } },
      { type: 'filet', titre: 'Art. 307 - Le contrôle par les questions écrites', texte: "Les associés commanditaires et les associés commandités non gérants ont le droit, **deux (2) fois par an**, d'obtenir communication des livres et des documents sociaux **et de poser par écrit des questions sur la gestion sociale, auxquelles il doit être répondu également par écrit**. C'est l'instrument de surveillance par excellence du commanditaire : il contrôle sans gérer, et le gérant est légalement tenu de répondre." },
      { type: 'paragraphe', texte: "**La fin de la SCS (Art. 308)** illustre la dissymétrie entre les deux catégories d'associés. La société **continue malgré le décès d'un associé commanditaire** : l'investisseur est interchangeable. S'il est stipulé que malgré le décès d'un commandité la société continue avec ses héritiers, ceux-ci **deviennent associés commanditaires lorsqu'ils sont mineurs non émancipés** - le droit convertit automatiquement leur statut pour les protéger de la responsabilité illimitée." },
      { type: 'filet', titre: "Le décès du seul commandité (Art. 308 al. 2 et 3)", texte: "Si l'associé décédé était **seul associé commandité** et si ses héritiers sont mineurs non émancipés, il doit être procédé à son **remplacement par un nouvel associé commandité** ou à la **transformation de la société**, dans un délai d'**un (1) an** à compter du décès. À défaut, la société est **dissoute de plein droit** à l'expiration de ce délai : une commandite sans commandité n'est plus une commandite." },
      { type: 'carte', titre: 'Comparatif SNC / SCS', tableau: { entetes: ['Critère', 'SNC', 'SCS'], lignes: [
        ['Associés', 'Une seule catégorie, tous commerçants', 'Deux catégories : commandités / commanditaires'],
        ['Responsabilité', 'Indéfinie et solidaire pour tous', 'Indéfinie et solidaire pour les commandités ; limitée aux apports pour les commanditaires'],
        ['Gérance', 'Tous les associés (à défaut de clause)', 'Commandités seulement (Art. 298)'],
        ['Cession des parts', 'Unanimité (Art. 274), rachat statutaire possible', 'Unanimité, trois assouplissements statutaires (Art. 296)'],
        ["Décès d'un associé", 'Dissolution en principe (Art. 290)', 'Continuation si le défunt est commanditaire (Art. 308)'],
        ['Modification des statuts', "Unanimité, sauf majorité statutaire (Art. 283)", 'Tous les commandités + majorité en nombre et capital des commanditaires (Art. 305)'],
      ] } },
      { type: 'controle', question: QCM[16] },
      { type: 'controle', question: QCM[17] },
      { type: 'controle', question: QCM[18] },
      { type: 'controle', question: QCM[19] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ec1',
    titre: "SNC MUANDA TRADING : décès d'un associé",
    contexte: "La SNC MUANDA TRADING comprend 3 associés : BONDO (35 parts), KALO (40 parts) et MWILA (25 parts). Les statuts prévoient la continuation avec les associés survivants et les héritiers agréés. BONDO décède. Ses héritiers sont : sa femme NGOZI (adulte) et ses enfants JULES (17 ans) et MARIE (14 ans), tous deux mineurs non émancipés. Aucun des héritiers n'est agréé unanimement par les associés survivants.",
    questions: [
      { num: 1, enonce: "Sans clause de continuation, que se serait-il passé au décès de BONDO ?", correction: "En l'absence de clause statutaire de continuation, le décès de BONDO aurait entraîné la fin de la SNC : l'Art. 290 AUSCGIE dispose que la société prend fin par le décès d'un associé, sauf clause statutaire de continuation. La clause prévoyant la continuation écarte cette dissolution de principe." },
      { num: 2, enonce: "JULES et MARIE peuvent-ils devenir associés de la SNC ?", correction: "Non. Les mineurs non émancipés ne peuvent pas être associés d'une SNC car tous les associés doivent avoir la qualité de commerçant (Art. 270 AUSCGIE), qualité interdite aux mineurs non émancipés. En cas de continuation avec des héritiers mineurs, l'Art. 290 impose la transformation de la société dans un délai d'un an en société en commandite dont les mineurs deviennent commanditaires, à défaut de quoi elle est dissoute ; dans l'intervalle, les mineurs ne répondent des dettes sociales qu'à concurrence des parts de la succession de leur auteur." },
      { num: 3, enonce: "Les héritiers n'étant pas agréés, quelles obligations s'imposent à KALO et MWILA ?", correction: "KALO et MWILA doivent racheter les parts de BONDO aux héritiers non agréés (Art. 290 al. 2 AUSCGIE). La valeur des titres est fixée conformément à l'Art. 59 AUSCGIE (accord des parties ou, à défaut, expert). Ils sont tenus indéfiniment et solidairement du paiement de ces parts (Art. 292 al. 2)." },
    ],
  },
  {
    id: 'ec2',
    titre: 'SCS KIVU INVEST : immixtion du commanditaire',
    contexte: "La SCS KIVU INVEST a un commandité (MUTOMBO) et deux commanditaires (TSHIMANGA - 80% du capital, KAYEMBE - 20%). Mécontent de la gestion de MUTOMBO, TSHIMANGA prend trois initiatives : (A) il envoie une note de conseils stratégiques, (B) il signe seul un contrat d'approvisionnement de 5 000 USD, (C) il consulte les livres de comptes deux fois dans l'année avec préavis de 15 jours.",
    questions: [
      { num: 1, enonce: "Analyser chacune des trois actions de TSHIMANGA", correction: "(A) Autorisé - L'Art. 301 AUSCGIE dispose que les avis et conseils, les actes de contrôle et de surveillance n'engagent pas les commanditaires. (B) INTERDIT - L'Art. 299 interdit tout acte de gestion externe, même en vertu d'une procuration. TSHIMANGA devient obligé indéfiniment et solidairement avec le commandité pour les dettes et engagements dérivant de cet acte (Art. 300) ; selon le nombre ou la gravité des actes, le juge peut l'obliger pour tous les engagements de la société ou pour quelques-uns seulement. (C) Autorisé - Le droit de communication de l'Art. 307 permet aux commanditaires d'obtenir, deux fois par an, communication des livres et documents sociaux. La démarche de TSHIMANGA est régulière." },
      { num: 2, enonce: "TSHIMANGA adresse ensuite par écrit une liste de questions sur la gestion sociale. MUTOMBO peut-il se contenter d'y répondre oralement, ou de ne pas y répondre ?", correction: "Non. L'Art. 307 AUSCGIE donne aux commanditaires le droit, deux fois par an, de poser par écrit des questions sur la gestion sociale, « auxquelles il doit être répondu également par écrit ». La réponse écrite est une obligation légale du gérant : ni le silence ni une simple réponse orale ne satisfont au texte. Ce mécanisme de questions écrites est précisément l'instrument par lequel le commanditaire surveille la gestion sans s'y immiscer (Art. 301)." },
    ],
  },
  {
    id: 'ec3',
    titre: 'SNC BUKAVU NEGOCE : créancier et délai de 60 jours',
    contexte: "La SNC BUKAVU NEGOCE doit 10 000 USD à RAWINDO. Sans paiement depuis 3 mois, RAWINDO veut poursuivre KEZA, l'une des trois associées. RAWINDO n'a pas encore formellement mis en demeure la société. Il envisage : (1) d'agir directement contre KEZA aujourd'hui, (2) d'agir dans 45 jours après une mise en demeure par téléphone.",
    questions: [
      { num: 1, enonce: "RAWINDO peut-il agir immédiatement contre KEZA ?", correction: "Non. L'Art. 271 AUSCGIE dispose que les créanciers ne peuvent poursuivre un associé que soixante (60) jours au moins après avoir vainement mis en demeure la société. Sans mise en demeure préalable, les poursuites contre les associés sont irrecevables, c'est-à-dire rejetées par le juge sans examen au fond." },
      { num: 2, enonce: "Une mise en demeure par téléphone suffit-elle ? Et après 45 jours ?", correction: "Non. L'Art. 271 exige une mise en demeure par acte d'huissier ou notifiée « par tout moyen permettant d'établir sa réception effective par le destinataire » : un simple appel téléphonique ne laisse aucune preuve de réception (à la différence d'une lettre recommandée avec avis de réception ou d'un acte d'huissier). Et même avec une mise en demeure régulière, 45 jours sont insuffisants : le délai légal minimum est de 60 jours - il peut même être prorogé par le juge, statuant à bref délai, de 30 jours au maximum." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue2',
  numero: 3,
  id: 'ue2-chapitre-3',
  titre: 'SNC et SCS : sociétés de personnes',
  sousTitre: 'Art. 270 à 292 (SNC) et 293 à 308 (SCS) AUSCGIE révisé du 30 janvier 2014',
  infoBulle: "Les deux sociétés de personnes du droit OHADA : la société en nom collectif (responsabilité indéfinie et solidaire de tous) et la société en commandite simple (commandités responsables indéfiniment, commanditaires dans la limite de leurs apports).",
  loiRef: 'Art. 270-308 AUSCGIE',
  moduleLabel: 'UE 2 · Droit des sociétés',
  retourRoute: '/ue2-droit-societes',
  coursId: 'ue2-droit-societes',
  objectifs: [
    'Maîtriser la définition et les trois piliers de la SNC : commerçants, responsabilité indéfinie et solidaire (Art. 270)',
    "Appliquer la procédure préalable de mise en demeure avant poursuite d'un associé (Art. 271)",
    'Comprendre les règles de cession des parts (unanimité, Art. 274) et de gérance (Art. 276-282)',
    'Distinguer commandités et commanditaires dans la SCS et leurs droits/interdictions (Art. 293-301)',
    'Analyser les causes de dissolution et leurs spécificités SNC/SCS (Art. 290-292, 308)',
  ],
  sections: SECTIONS,
  aRetenir: [
    "Dans la SNC, tous les associés sont commerçants et répondent indéfiniment et solidairement des dettes sociales (Art. 270) ; le créancier doit d'abord mettre la société en demeure et attendre 60 jours au moins - prorogeables de 30 jours au plus par le juge - avant de poursuivre un associé (Art. 271).",
    "Les parts de SNC ne se cèdent qu'à l'unanimité, toute cession contraire étant nulle ; à défaut d'unanimité, seuls les statuts peuvent organiser un rachat permettant le retrait du cédant (Art. 274).",
    "À défaut de clause statutaire, tous les associés sont gérants (Art. 276) ; le gérant engage la société par les actes entrant dans l'objet social, les clauses limitatives étant inopposables aux tiers de bonne foi (Art. 277-1) ; le gérant associé ne vote jamais sa propre rémunération (Art. 278).",
    "La SNC prend fin en principe par le décès d'un associé (Art. 290) ; en cas de continuation avec des héritiers mineurs non émancipés, ceux-ci ne répondent des dettes qu'à concurrence des parts de la succession et la société doit être transformée en commandite dans l'année, à défaut de quoi elle est dissoute.",
    "Dans la SCS coexistent commandités (responsabilité indéfinie et solidaire, seuls gérants possibles) et commanditaires (responsabilité limitée aux apports) ; les règles de la SNC s'appliquent sous réserve des Art. 293 à 308 (Art. 293 et 293-1).",
    "Le commanditaire ne peut faire aucun acte de gestion externe, même par procuration (Art. 299), sous peine de responsabilité indéfinie et solidaire pour les engagements dérivant de ses actes, voire pour tous (Art. 300) ; avis, conseils, contrôle et questions écrites - avec réponse écrite obligatoire - restent permis (Art. 301, 307).",
    "La SCS continue malgré le décès d'un commanditaire ; si le seul commandité décède en laissant des héritiers mineurs, il faut le remplacer ou transformer la société dans l'année, sous peine de dissolution de plein droit (Art. 308).",
  ],
  references: [
    {
      genre: 'texte',
      intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)",
      precision: 'adopté le 30 janvier 2014 à Ouagadougou, art. 270 à 292 (SNC) et 293 à 308 (SCS)',
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : AUSCGIE révisé du 30 janvier 2014, art. 270 à 292 (SNC), art. 293 à 308 (SCS) et art. 9',
}

export default chapitre
