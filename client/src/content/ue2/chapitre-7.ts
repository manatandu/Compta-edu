// Chapitre 7 du module UE2, Droit des sociétés : contenu pur.
// Migré depuis l'ancienne page dédiée UE2Chapitre7Page.tsx vers le moteur
// commun components/chapitre/ChapitreManuscrit.tsx, avec vérification
// article par article sur le texte de l'AUSCGIE révisé (art. 121 à 180
// lus intégralement, plus art. 323-332, 338-1 et 433).
// Corrections apportées : l'art. 121 traite des pouvoirs des organes à
// l'égard des tiers et non d'une « définition du dirigeant social » ; la
// procédure d'alerte par le commissaire aux comptes suit les art. 150-152
// (sociétés autres que par actions) et 153-156 (sociétés par actions), et
// l'alerte par les associés les art. 157-158 - les prétendues règles
// « art. 155 inscription à l'ordre du jour à 1/10 », « art. 157 saisine à
// 1/5 » et « art. 158-1 responsabilité du CAC » étaient inventées, de même
// que la « levée du secret professionnel (art. 154) » ; l'expertise de
// gestion est ouverte à 1/10 du capital dans toutes les formes (art. 159),
// sans distinction SARL/SA ; le régime de l'administration provisoire est
// réécrit sur les art. 160-1 à 160-8 exacts (durée de 6 mois prorogeable
// dans la limite de 12, rapport trimestriel au juge, actes outrepassant
// les pouvoirs inopposables) ; la révocation ad nutum des administrateurs
// de SA relève de l'art. 433 (et non « 432 ») ; le régime général des
// actions en responsabilité (art. 161-172) est intégré ; les mentions de
// « jurisprudence CCJA constante » invérifiables ont été reformulées.
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch7-q1', question: "Qui peut être nommé gérant d'une SARL selon l'AUSCGIE ?",
    options: [
      { id: 'a', texte: 'Uniquement un associé de la société' },
      { id: 'b', texte: 'Une personne physique, associée ou non' },
      { id: 'c', texte: 'Une personne morale ou physique' },
      { id: 'd', texte: 'Uniquement le fondateur majoritaire' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 323 AUSCGIE',
    explication: "L'Art. 323 AUSCGIE dispose que la SARL est gérée par une ou plusieurs personnes physiques, associées ou non. Une personne morale ne peut pas être gérante de SARL.",
  },
  {
    id: 'ch7-q2', question: "En l'absence de clause statutaire, quelle est la durée du mandat du gérant de SARL ?",
    options: [
      { id: 'a', texte: '2 ans renouvelables' },
      { id: 'b', texte: '3 ans renouvelables' },
      { id: 'c', texte: '4 ans renouvelables' },
      { id: 'd', texte: '6 ans renouvelables' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 324 AUSCGIE',
    explication: "L'Art. 324 AUSCGIE précise qu'en l'absence de dispositions statutaires, le ou les gérants sont nommés pour quatre (4) ans et sont rééligibles.",
  },
  {
    id: 'ch7-q3', question: 'La nomination ou la cessation de fonctions du dirigeant social doit être publiée :',
    options: [
      { id: 'a', texte: 'Au Journal officiel uniquement' },
      { id: 'b', texte: 'Au Registre du Commerce et du Crédit Mobilier (RCCM)' },
      { id: 'c', texte: "Dans un journal d'annonces légales uniquement" },
      { id: 'd', texte: "La publication n'est pas obligatoire" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 124 AUSCGIE',
    explication: "L'Art. 124 AUSCGIE dispose que la désignation ou la cessation des fonctions des dirigeants sociaux doit être publiée au registre du commerce et du crédit mobilier.",
  },
  {
    id: 'ch7-q4', question: 'Dans les rapports avec les tiers, les clauses statutaires limitant les pouvoirs des dirigeants sont :',
    options: [
      { id: 'a', texte: 'Toujours opposables aux tiers' },
      { id: 'b', texte: 'Opposables aux tiers après publication au RCCM' },
      { id: 'c', texte: 'Inopposables aux tiers de bonne foi' },
      { id: 'd', texte: 'Opposables uniquement aux associés' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 121, 123 AUSCGIE',
    explication: "L'Art. 121 AUSCGIE donne aux organes de gestion, de direction et d'administration tout pouvoir pour engager la société à l'égard des tiers, sans mandat spécial ; toute limitation de leurs pouvoirs légaux par les statuts est inopposable aux tiers de bonne foi. L'Art. 123 confirme que les limitations statutaires, valables entre associés, sont inopposables aux tiers de bonne foi.",
  },
  {
    id: 'ch7-q5', question: "Quelle majorité est requise pour révoquer le gérant d'une SARL ?",
    options: [
      { id: 'a', texte: 'Unanimité des associés' },
      { id: 'b', texte: 'Associés représentant plus de la moitié des parts sociales' },
      { id: 'c', texte: 'Majorité des deux tiers des parts' },
      { id: 'd', texte: 'Majorité simple des associés présents' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 326 AUSCGIE',
    explication: "L'Art. 326 AUSCGIE exige une décision des associés représentant plus de la moitié des parts sociales. Toute délibération prise en violation de cette règle est nulle - et la révocation exige toujours la majorité absolue, même sur seconde consultation (Art. 349).",
  },
  {
    id: 'ch7-q6', question: 'Si la révocation du gérant est prononcée sans juste motif, quelle est la conséquence ?',
    options: [
      { id: 'a', texte: 'La révocation est nulle' },
      { id: 'b', texte: 'Elle peut donner lieu à dommages et intérêts au profit du gérant' },
      { id: 'c', texte: 'Le gérant garde ses fonctions' },
      { id: 'd', texte: 'Les associés sont responsables pénalement' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 326 AUSCGIE',
    explication: "L'Art. 326 al. 2 AUSCGIE prévoit que si la révocation est décidée sans juste motif, elle peut donner lieu à dommages et intérêts. La révocation reste valable : seule son indemnisation est en jeu.",
  },
  {
    id: 'ch7-q7', question: "La révocation du gérant de SARL peut-elle être décidée en dehors de l'ordre du jour ?",
    options: [
      { id: 'a', texte: "Non, elle doit absolument figurer à l'ordre du jour" },
      { id: 'b', texte: "Oui, l'assemblée peut toujours la décider et procéder au remplacement, même hors ordre du jour" },
      { id: 'c', texte: "Oui, mais seulement avec l'accord écrit de tous les associés" },
      { id: 'd', texte: "Non, sauf si le gérant est absent" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 338-1 AUSCGIE',
    explication: "L'Art. 338-1 AUSCGIE interdit à l'assemblée de délibérer sur une question non inscrite à l'ordre du jour, mais réserve une exception expresse : elle peut, même hors ordre du jour, révoquer le gérant et procéder à son remplacement.",
  },
  {
    id: 'ch7-q8', question: 'Le gérant associé peut-il voter sur sa propre rémunération ?',
    options: [
      { id: 'a', texte: 'Oui, comme tout associé' },
      { id: 'b', texte: 'Oui, si les statuts le permettent' },
      { id: 'c', texte: 'Non, ses voix ne sont pas comptées et toute délibération contraire est nulle' },
      { id: 'd', texte: "Non, sauf s'il est le seul associé" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 325 AUSCGIE',
    explication: "L'Art. 325 AUSCGIE dispose que le gérant associé ne prend pas part au vote de la délibération relative à sa rémunération et que ses voix ne sont pas prises en compte pour le calcul de la majorité ; toute délibération contraire est nulle. Exception : la SARL unipersonnelle, où l'associé unique décide librement.",
  },
  {
    id: 'ch7-q9', question: "Quelles sont les 3 sources de responsabilité civile du gérant selon l'art. 330 AUSCGIE ?",
    options: [
      { id: 'a', texte: 'Fautes pénales, dettes fiscales, manquements contractuels' },
      { id: 'b', texte: 'Infractions aux dispositions législatives ou réglementaires, violations des statuts, fautes de gestion' },
      { id: 'c', texte: "Absence aux assemblées, mauvaise comptabilité, conflits d'intérêts" },
      { id: 'd', texte: "Perte de capital, distribution de dividendes, dépassement d'objet social" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 330 AUSCGIE',
    explication: "L'Art. 330 AUSCGIE engage la responsabilité des gérants, individuellement ou solidairement, envers la société ou envers les tiers, pour : (1) les infractions aux dispositions législatives ou réglementaires applicables aux SARL, (2) les violations des statuts, (3) les fautes commises dans leur gestion.",
  },
  {
    id: 'ch7-q10', question: "Quel est le délai de prescription de l'action en responsabilité contre un dirigeant pour une faute ordinaire ?",
    options: [
      { id: 'a', texte: '1 an' },
      { id: 'b', texte: '2 ans' },
      { id: 'c', texte: '3 ans' },
      { id: 'd', texte: '5 ans' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 164, 170, 332 AUSCGIE',
    explication: "Les actions individuelle et sociale se prescrivent par trois (3) ans à compter du fait dommageable ou, s'il a été dissimulé, de sa révélation - et par dix (10) ans pour les crimes (Art. 164 et 170 pour le régime général, Art. 332 pour la SARL).",
  },
  {
    id: 'ch7-q11', question: "Dans la SARL, l'action sociale contre le gérant peut être intentée par :",
    options: [
      { id: 'a', texte: 'Tout associé individuellement, sans condition de seuil' },
      { id: 'b', texte: 'Des associés représentant au moins 1/4 des associés ET 1/4 des parts sociales' },
      { id: 'c', texte: 'La moitié des associés seulement' },
      { id: 'd', texte: "L'assemblée générale uniquement" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 331 AUSCGIE',
    explication: "L'Art. 331 AUSCGIE permet aux associés représentant le quart des associés et le quart des parts sociales d'intenter l'action sociale en responsabilité contre le gérant. Les dommages et intérêts sont alloués à la société, et aucune clause ne peut subordonner l'action à un avis préalable de l'assemblée ni y faire renoncer par avance.",
  },
  {
    id: 'ch7-q12', question: 'Le dirigeant de fait est :',
    options: [
      { id: 'a', texte: 'Un associé majoritaire' },
      { id: 'b', texte: 'Une personne qui exerce réellement les pouvoirs de direction sans titre officiel' },
      { id: 'c', texte: "Un représentant légal mandaté par l'assemblée" },
      { id: 'd', texte: 'Un salarié à fonctions de direction' },
    ],
    reponseCorrecte: 'b', articleRef: 'Notion prétorienne - Art. 330 AUSCGIE',
    explication: "Le dirigeant de fait est celui qui, sans titre officiel, exerce en toute indépendance les pouvoirs de direction normalement dévolus aux dirigeants de droit (signature des contrats, direction du personnel, décisions stratégiques). La doctrine et la jurisprudence lui étendent les responsabilités des dirigeants, notamment pour le comblement du passif organisé par l'Acte uniforme sur les procédures collectives.",
  },
  {
    id: 'ch7-q13', question: "La société est-elle engagée par un acte du dirigeant dépassant l'objet social si le tiers ignorait ce dépassement ?",
    options: [
      { id: 'a', texte: "Non, jamais hors objet social" },
      { id: 'b', texte: "Oui, sauf si la société prouve que le tiers savait ou ne pouvait l'ignorer" },
      { id: 'c', texte: "Non, dès lors que les statuts ont été publiés au RCCM" },
      { id: 'd', texte: "Oui, uniquement si le conseil d'administration a ratifié l'acte" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 122 AUSCGIE',
    explication: "L'Art. 122 AUSCGIE dispose que la société est engagée par les actes des organes de gestion, de direction et d'administration qui ne relèvent pas de l'objet social, à moins qu'elle ne prouve que le tiers savait que l'acte dépassait cet objet ou ne pouvait l'ignorer compte tenu des circonstances - la seule publication des statuts ne suffisant pas à constituer cette preuve.",
  },
  {
    id: 'ch7-q14', question: "La révocation ad nutum (à tout moment, sans motif ni indemnité) s'applique à :",
    options: [
      { id: 'a', texte: 'Gérants de SARL' },
      { id: 'b', texte: 'Administrateurs de SA' },
      { id: 'c', texte: 'Tous les dirigeants OHADA' },
      { id: 'd', texte: 'Membres du GIE' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 433 AUSCGIE',
    explication: "L'Art. 433 al. 2 AUSCGIE dispose que les administrateurs de SA peuvent être révoqués à tout moment par l'assemblée générale ordinaire. Le gérant de SARL, lui, est protégé : sa révocation sans juste motif peut donner lieu à dommages et intérêts (Art. 326).",
  },
  {
    id: 'ch7-q15', question: 'La démission du gérant sans juste motif peut entraîner :',
    options: [
      { id: 'a', texte: 'La nullité de la démission' },
      { id: 'b', texte: 'Une action en réparation du préjudice par la société' },
      { id: 'c', texte: 'Une amende infligée par le tribunal' },
      { id: 'd', texte: 'La responsabilité pénale du gérant' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 327 AUSCGIE',
    explication: "L'Art. 327 AUSCGIE permet au gérant de démissionner librement ; toutefois, si la démission est faite sans juste motif, la société peut demander en justice réparation du préjudice qu'elle subit.",
  },
  {
    id: 'ch7-q16', question: "L'abus de majorité selon l'art. 130 AUSCGIE est caractérisé par :",
    options: [
      { id: 'a', texte: 'Toute décision votée à plus de 75% du capital' },
      { id: 'b', texte: "Une décision votée dans le seul intérêt des majoritaires, contrairement aux intérêts des minoritaires, sans pouvoir être justifiée par l'intérêt de la société" },
      { id: 'c', texte: 'Une décision prise sans quorum' },
      { id: 'd', texte: 'Un vote portant sur la rémunération des gérants' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 130 AUSCGIE',
    explication: "L'Art. 130 AUSCGIE dispose que les décisions collectives constitutives d'un abus de majorité sont nulles, et définit l'abus : décision votée par les majoritaires dans leur seul intérêt, contrairement aux intérêts des minoritaires, sans justification par l'intérêt de la société. Les minoritaires peuvent en outre engager la responsabilité des associés ayant voté la décision.",
  },
  {
    id: 'ch7-q17', question: "En cas d'abus de minorité (art. 131), la juridiction compétente peut :",
    options: [
      { id: 'a', texte: 'Exclure automatiquement les minoritaires' },
      { id: 'b', texte: "Désigner un mandataire ad hoc pour représenter les minoritaires à une prochaine assemblée et voter en leur nom dans le sens de l'intérêt social" },
      { id: 'c', texte: 'Adopter elle-même la décision bloquée' },
      { id: 'd', texte: 'Prononcer la dissolution de la société' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 131 AUSCGIE',
    explication: "L'Art. 131 AUSCGIE vise l'abus de minorité ou d'égalité - l'opposition à des décisions nécessitées par l'intérêt de la société, sans intérêt légitime. La juridiction compétente peut désigner un mandataire ad hoc pour représenter les associés au comportement abusif à une prochaine assemblée et voter en leur nom dans le sens des décisions conformes à l'intérêt social ; leur responsabilité peut aussi être engagée.",
  },
  {
    id: 'ch7-q18', question: "Le bénéfice distribuable selon l'art. 143 AUSCGIE est :",
    options: [
      { id: 'a', texte: "Le résultat de l'exercice uniquement" },
      { id: 'b', texte: "Le résultat de l'exercice, augmenté du report bénéficiaire et diminué des pertes antérieures, des dividendes partiels régulièrement distribués et des sommes portées en réserve" },
      { id: 'c', texte: "Le chiffre d'affaires moins les charges" },
      { id: 'd', texte: "Le résultat diminué uniquement de l'impôt" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 143 AUSCGIE',
    explication: "L'Art. 143 AUSCGIE définit le bénéfice distribuable : résultat de l'exercice + report bénéficiaire − pertes antérieures − dividendes partiels régulièrement distribués − sommes portées en réserve en application de la loi ou des statuts. Aucune distribution ne peut rendre les capitaux propres inférieurs au capital augmenté des réserves indisponibles, et tout dividende distribué en violation de ces règles est un dividende fictif (Art. 144).",
  },
  {
    id: 'ch7-q19', question: "Des associés représentant au moins 1/10 du capital peuvent demander en justice :",
    options: [
      { id: 'a', texte: "La convocation d'une AGE" },
      { id: 'b', texte: "La désignation d'un ou plusieurs experts chargés de présenter un rapport sur une ou plusieurs opérations de gestion" },
      { id: 'c', texte: 'La dissolution de la société' },
      { id: 'd', texte: "La suspension du gérant en urgence" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 159-160 AUSCGIE',
    explication: "L'Art. 159 AUSCGIE permet à un ou plusieurs associés représentant au moins le dixième du capital social - dans toutes les formes de sociétés - de demander à la juridiction compétente, statuant à bref délai, la désignation d'experts sur une ou plusieurs opérations de gestion. Le juge fixe l'étendue de la mission, les honoraires sont supportés par la société et le rapport est adressé au demandeur, aux organes et au commissaire aux comptes (Art. 160).",
  },
  {
    id: 'ch7-q20', question: "Selon l'art. 175 AUSCGIE, une personne est présumée détenir le contrôle d'une société lorsqu'elle :",
    options: [
      { id: 'a', texte: 'Détient plus de 25% du capital' },
      { id: 'b', texte: "Est membre du conseil d'administration" },
      { id: 'c', texte: "Détient, directement ou indirectement ou par personne interposée, plus de la moitié des droits de vote, ou en dispose en vertu d'un accord avec d'autres associés" },
      { id: 'd', texte: 'Assure la présidence de la société' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 173-175 AUSCGIE',
    explication: "L'Art. 175 AUSCGIE pose deux présomptions de contrôle : la détention, directe, indirecte ou par personne interposée, de plus de la moitié des droits de vote ; ou la disposition de plus de la moitié des droits de vote en vertu d'un accord conclu avec d'autres associés. Le contrôle est la détention effective du pouvoir de décision (Art. 174).",
  },
  {
    id: 'ch7-n1', question: "Dans le régime général, à quelle condition un associé peut-il intenter l'action sociale contre les dirigeants ?",
    options: [
      { id: 'a', texte: "Après une mise en demeure des organes compétents restée sans effet pendant 30 jours (Art. 167)" },
      { id: 'b', texte: "Après autorisation de l'assemblée générale" },
      { id: 'c', texte: 'Uniquement en cas de faillite de la société' },
      { id: 'd', texte: "Jamais : seule la société peut agir" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 167 AUSCGIE',
    explication: "L'Art. 167 AUSCGIE permet à un ou plusieurs associés d'intenter l'action sociale après une mise en demeure des organes compétents non suivie d'effet dans le délai de trente (30) jours. Les dommages et intérêts sont alloués à la société - qui doit être régulièrement appelée en cause -, et les frais de l'action sont avancés par la société (Art. 171). Aucune décision d'assemblée ne peut éteindre cette action (Art. 169).",
  },
  {
    id: 'ch7-n2', question: "Deux sociétés peuvent-elles détenir chacune plus de 10% du capital de l'autre ?",
    options: [
      { id: 'a', texte: 'Oui, sans limite' },
      { id: 'b', texte: "Non : une société par actions ou une SARL ne peut posséder de titres d'une société qui détient plus de 10% de son capital (Art. 177)" },
      { id: 'c', texte: 'Oui, avec autorisation du commissaire aux comptes' },
      { id: 'd', texte: "Oui, si les deux sociétés appartiennent au même groupe" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 177 AUSCGIE',
    explication: "L'Art. 177 AUSCGIE interdit les participations croisées : une société par actions ou une SARL ne peut posséder d'actions ou de parts d'une autre société si celle-ci détient une fraction de son capital supérieure à 10%. À défaut d'accord pour régulariser, la société détenant la fraction la plus faible doit céder ses titres, qui sont privés du droit de vote et du droit aux dividendes jusqu'à la cession effective.",
  },
  {
    id: 'ch7-n3', question: "Quelle est la durée maximale de la mission d'un administrateur provisoire ?",
    options: [
      { id: 'a', texte: 'Six (6) mois, prorogeable sans que la durée totale puisse excéder douze (12) mois (Art. 160-2)' },
      { id: 'b', texte: 'Un an, renouvelable indéfiniment' },
      { id: 'c', texte: 'Trois mois non renouvelables' },
      { id: 'd', texte: "Illimitée, jusqu'à la fin du conflit" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 160-2 AUSCGIE',
    explication: "L'Art. 160-2 AUSCGIE dispose que la décision de nomination fixe la durée de la mission de l'administrateur provisoire, laquelle ne peut excéder six (6) mois, sauf prorogation décidée par la juridiction compétente à la requête motivée de l'administrateur - sans que la durée totale puisse excéder douze (12) mois. Sa rémunération est à la charge de la société.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '7.1',
    titre: 'Les dirigeants sociaux : pouvoirs et publicité (Art. 121-124)',
    navLabel: '7.1 Pouvoirs et publicité',
    blocs: [
      { type: 'paragraphe', texte: "Les organes de gestion, de direction et d'administration - gérants, administrateurs, PDG, directeurs généraux, administrateurs généraux, présidents de SAS - incarnent la société vis-à-vis des tiers. L'AUSCGIE pose pour eux quatre principes généraux, valables pour toutes les formes sociales." },
      { type: 'carte', titre: 'Les quatre principes généraux', tableau: { entetes: ['Principe', 'Règle', 'Article'], lignes: [
        ['Plénitude des pouvoirs', "À l'égard des tiers, les organes ont, dans les limites fixées pour chaque type de société, tout pouvoir pour engager la société, sans avoir à justifier d'un mandat spécial ; toute limitation statutaire de leurs pouvoirs légaux est inopposable aux tiers de bonne foi", 'Art. 121'],
        ['Engagement hors objet social', "La société est engagée même par les actes qui ne relèvent pas de l'objet social, à moins qu'elle ne prouve que le tiers savait ou ne pouvait l'ignorer - la seule publication des statuts ne constituant pas cette preuve", 'Art. 122'],
        ['Limitations internes', "Entre associés, les statuts peuvent limiter les pouvoirs des organes ; ces limitations restent inopposables aux tiers de bonne foi", 'Art. 123'],
        ['Publicité', 'La désignation ou la cessation des fonctions des dirigeants sociaux doit être publiée au RCCM', 'Art. 124'],
      ] } },
      { type: 'carte', titre: 'Les organes de direction par forme sociale', tableau: { entetes: ['Forme', 'Organe', 'Référence'], lignes: [
        ['SNC', 'Gérant(s) - tous les associés à défaut de clause', 'Art. 276'],
        ['SCS', 'Gérance par les commandités', 'Art. 298'],
        ['SARL', 'Gérant(s) - personnes physiques uniquement', 'Art. 323'],
        ["SA avec conseil d'administration", 'PDG, ou président du conseil et directeur général dissociés', 'Art. 415'],
        ['SA avec administrateur général', 'Administrateur général (SA d\'au plus 3 actionnaires)', 'Art. 494'],
        ['SAS', 'Président, et le cas échéant directeurs généraux', 'Art. 853-8'],
        ['GIE', 'Administrateur(s) désigné(s) par le contrat ou l\'assemblée', 'Art. 879'],
      ] } },
      { type: 'filet', titre: 'Dirigeant de droit et dirigeant de fait', texte: "Le **dirigeant de droit** est régulièrement désigné par les organes compétents et sa nomination est publiée au RCCM. Le **dirigeant de fait** est celui qui, sans titre officiel, exerce en toute indépendance les pouvoirs de direction : signature des contrats, direction du personnel, négociation avec les banques, décisions stratégiques. La notion est prétorienne : la doctrine et la jurisprudence étendent au dirigeant de fait les responsabilités attachées aux fonctions qu'il exerce réellement, notamment pour le comblement du passif organisé par l'Acte uniforme portant organisation des procédures collectives." },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[11] },
    ],
  },
  {
    numero: '7.2',
    titre: 'Le gérant de SARL : nomination, rémunération, fin des fonctions (Art. 323-327, 338-1)',
    navLabel: '7.2 Le gérant de SARL',
    blocs: [
      { type: 'paragraphe', texte: "La SARL est gérée par **une ou plusieurs personnes physiques, associées ou non** - jamais par une personne morale (Art. 323). Le gérant est nommé dans les statuts ou par un acte postérieur, à la majorité des associés représentant plus de la moitié du capital, sauf clause plus exigeante ; toute délibération contraire est nulle. À défaut de clause statutaire, le mandat est de **quatre (4) ans**, renouvelable (Art. 324)." },
      { type: 'filet', titre: 'La rémunération (Art. 325)', texte: "Les fonctions de gérant sont gratuites ou rémunérées, dans les conditions fixées par les statuts ou par décision collective. Règle anti-conflit d'intérêts : **le gérant associé ne prend pas part au vote** de la délibération relative à sa rémunération et ses voix ne comptent pas pour la majorité - toute délibération contraire est **nulle**. La règle est écartée dans la SARL unipersonnelle, et la fixation de la rémunération n'est pas soumise au régime des conventions réglementées." },
      { type: 'carte', titre: 'La fin des fonctions', tableau: { entetes: ['Mode', 'Régime', 'Article'], lignes: [
        ['Révocation par les associés', "Décision des associés représentant plus de la moitié des parts (majorité absolue exigée dans tous les cas) ; sans juste motif, elle peut donner lieu à dommages et intérêts", 'Art. 326, 349'],
        ['Révocation hors ordre du jour', "L'assemblée peut, même si la question n'est pas inscrite à l'ordre du jour, révoquer le gérant et procéder à son remplacement", 'Art. 338-1'],
        ['Révocation judiciaire', "Par la juridiction compétente du siège social, pour juste motif, à la demande de **tout** associé - l'arme du minoritaire", 'Art. 326 al. 3'],
        ['Démission', "Libre ; si elle est donnée sans juste motif, la société peut demander en justice réparation du préjudice subi", 'Art. 327'],
        ['Comparaison SA', "Les administrateurs de SA sont révocables à tout moment par l'AGO (révocation ad nutum)", 'Art. 433'],
      ] } },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[13] },
    ],
  },
  {
    numero: '7.3',
    titre: "Les pouvoirs du gérant et l'engagement de la société (Art. 122-123, 328-329)",
    navLabel: '7.3 Pouvoirs et engagement',
    blocs: [
      { type: 'paragraphe', texte: "**Entre associés (Art. 328)** : à défaut de détermination statutaire, le gérant peut faire tous les actes de gestion dans l'intérêt de la société. En cas de pluralité de gérants, chacun détient séparément ces pouvoirs, sauf le droit pour chacun de s'opposer à toute opération avant qu'elle ne soit conclue - opposition sans effet à l'égard des tiers, à moins qu'il soit établi qu'ils en ont eu connaissance. **Vis-à-vis des tiers (Art. 329)** : le gérant est investi des pouvoirs les plus étendus pour agir en toute circonstance au nom de la société, sous réserve des pouvoirs que l'Acte uniforme attribue expressément aux associés." },
      { type: 'carte', titre: 'La société est-elle engagée ?', tableau: { entetes: ['Situation', 'Société engagée ?', 'Fondement'], lignes: [
        ["Acte entrant dans l'objet social", '**Oui**', 'Art. 121, 329'],
        ['Acte hors objet social, tiers de bonne foi', '**Oui**', 'Art. 122, 329'],
        ["Acte hors objet social, tiers qui savait ou ne pouvait ignorer (preuve à la charge de la société)", 'Non', 'Art. 122'],
        ['Acte violant une limitation statutaire, tiers de bonne foi', '**Oui** - la limitation est inopposable', 'Art. 121, 123, 329'],
        ["Acte violant une limitation statutaire, tiers dont la connaissance est prouvée", 'Non', 'Art. 123'],
      ] }, note: "La seule publication des statuts au RCCM ne suffit jamais à prouver que le tiers connaissait le dépassement (Art. 122). Le gérant qui viole une limitation interne engage en revanche sa responsabilité envers la société pour violation des statuts (Art. 330)." },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[12] },
    ],
  },
  {
    numero: '7.4',
    titre: 'La responsabilité civile des dirigeants (Art. 161-172, 330-332)',
    navLabel: '7.4 Responsabilité',
    blocs: [
      { type: 'paragraphe', texte: "Chaque dirigeant social est responsable **individuellement envers les tiers** des fautes qu'il commet dans l'exercice de ses fonctions ; si plusieurs dirigeants ont participé aux mêmes faits, leur responsabilité est **solidaire** à l'égard des tiers, la juridiction déterminant entre eux la part contributive de chacun (Art. 161). Il est de même responsable **envers la société** (Art. 165). Pour la SARL, l'Art. 330 précise les trois sources : infractions aux dispositions législatives ou réglementaires, violations des statuts, fautes de gestion." },
      { type: 'carte', titre: 'Action individuelle et action sociale', tableau: { entetes: ['Critère', 'Action individuelle', 'Action sociale'], lignes: [
        ['Préjudice réparé', "Préjudice **distinct** subi personnellement par un tiers ou un associé (Art. 162)", 'Dommage subi par **la société** (Art. 166)'],
        ['Qui agit ?', 'Celui qui subit le préjudice', "Les dirigeants ; ou un ou plusieurs associés après mise en demeure des organes restée sans effet 30 jours (Art. 167) - dans la SARL, des associés représentant 1/4 des associés et 1/4 des parts (Art. 331)"],
        ['Bénéficiaire des dommages et intérêts', "Le demandeur", 'La société - qui doit être appelée en cause (Art. 167)'],
        ['Frais', 'À la charge du demandeur', 'Avancés par la société (Art. 171)'],
        ['Clauses restrictives', '-', "Nulles : ni avis préalable, ni autorisation d'assemblée, ni renonciation anticipée (Art. 168) ; aucun quitus de l'assemblée n'éteint l'action (Art. 169)"],
        ['Prescription', '3 ans (10 ans pour les crimes) - Art. 164', '3 ans (10 ans pour les crimes) - Art. 170, 332'],
      ] } },
      { type: 'filet', titre: "Au-delà du civil", texte: "Les dirigeants encourent aussi des **sanctions pénales** dont l'AUSCGIE fixe les éléments constitutifs (Partie 3, Art. 886 et suivants : dividendes fictifs, abus des biens sociaux, états financiers infidèles, etc.), les peines relevant du droit pénal de chaque État partie. En cas de liquidation des biens avec insuffisance d'actif, l'**action en comblement du passif** organisée par l'Acte uniforme portant organisation des procédures collectives peut mettre tout ou partie du passif à la charge des dirigeants - de droit ou de fait - dont les fautes de gestion ont contribué à l'insuffisance." },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[20] },
    ],
  },
  {
    numero: '7.5',
    titre: 'Abus du droit de vote, dividendes et groupes de sociétés (Art. 129-131, 143-146, 173-180)',
    navLabel: '7.5 Abus, dividendes, groupes',
    blocs: [
      { type: 'carte', titre: 'Abus de majorité et abus de minorité', tableau: { entetes: ['', 'Abus de majorité (Art. 130)', "Abus de minorité ou d'égalité (Art. 131)"], lignes: [
        ['Définition', "Décision votée par les majoritaires dans leur seul intérêt, contrairement aux intérêts des minoritaires, sans pouvoir être justifiée par l'intérêt de la société", "Opposition, par le vote, à des décisions nécessitées par l'intérêt de la société, sans intérêt légitime"],
        ['Sanctions', "**Nullité** de la décision + responsabilité des associés l'ayant votée envers les minoritaires", "Responsabilité des minoritaires + désignation par le juge d'un **mandataire ad hoc** chargé de les représenter à une prochaine assemblée et de voter dans le sens conforme à l'intérêt social"],
      ] }, note: "Chaque associé a le droit de participer aux votes (Art. 125) et ses droits de vote sont proportionnels à sa participation au capital, sauf disposition contraire de l'Acte uniforme (Art. 129) ; toute délibération violant les droits de vote est nulle (Art. 129-1)." },
      { type: 'paragraphe', texte: "**Le dividende (Art. 142-146).** L'assemblée décide de l'affectation du résultat et constitue les dotations à la réserve légale et aux réserves statutaires. Le **bénéfice distribuable** est le résultat de l'exercice, augmenté du report bénéficiaire et diminué des pertes antérieures, des dividendes partiels régulièrement distribués et des sommes portées en réserve. Aucune distribution ne peut rendre les capitaux propres **inférieurs au capital augmenté des réserves indisponibles** (Art. 143). Tout dividende distribué en violation de ces règles est un **dividende fictif** (Art. 144) - source de responsabilité pénale. La mise en paiement intervient dans un délai maximum de **neuf (9) mois** après la clôture, sauf prorogation judiciaire (Art. 146)." },
      { type: 'carte', titre: 'Groupes de sociétés (Art. 173-180)', liste: [
        "**Groupe** : ensemble formé par des sociétés unies par des liens divers permettant à l'une de contrôler les autres (Art. 173) ; le **contrôle** est la détention effective du pouvoir de décision (Art. 174).",
        "**Présomption de contrôle** (Art. 175) : détention, directe, indirecte ou par personne interposée, de plus de la moitié des droits de vote ; ou disposition de plus de la moitié des droits de vote en vertu d'un accord avec d'autres associés.",
        "**Participation** : détention d'au moins 10% du capital d'une autre société (Art. 176).",
        "**Participations croisées interdites** (Art. 177) : une société par actions ou une SARL ne peut posséder de titres d'une société détenant plus de 10% de son capital ; à défaut de régularisation amiable, la société à la fraction la plus faible cède ses titres, privés de vote et de dividendes jusqu'à la cession.",
        "**Société mère et filiale** (Art. 179) : est mère la société qui possède plus de la moitié du capital de l'autre ; la filiale commune suppose une participation suffisante pour bloquer toute décision extraordinaire et une participation à la gestion (Art. 180).",
      ] },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[16] },
      { type: 'controle', question: QCM[17] },
      { type: 'controle', question: QCM[19] },
      { type: 'controle', question: QCM[21] },
    ],
  },
  {
    numero: '7.6',
    titre: "Alerte, expertise de gestion et administration provisoire (Art. 150-160-8)",
    navLabel: '7.6 Alerte et contrôles judiciaires',
    blocs: [
      { type: 'paragraphe', texte: "L'AUSCGIE organise trois mécanismes gradués de vigilance sur la gestion : la **procédure d'alerte**, préventive, sur les faits de nature à compromettre la continuité de l'exploitation ; l'**expertise de gestion**, rétrospective, sur des opérations déterminées ; et l'**administration provisoire**, curative, lorsque le fonctionnement normal de la société est devenu impossible." },
      { type: 'carte', titre: "L'alerte par le commissaire aux comptes", tableau: { entetes: ['Étape', 'Sociétés autres que par actions (Art. 150-152)', 'Sociétés par actions (Art. 153-156)'], lignes: [
        ['1. Demande d\'explications', "Au gérant, par lettre au porteur contre récépissé ou LRAR, sur tout fait de nature à compromettre la continuité de l'exploitation", "Au président du conseil, PDG, administrateur général ou président, dans les mêmes formes"],
        ['2. Réponse', "Sous 15 jours, avec analyse de la situation et mesures envisagées ; le CAC informe la juridiction compétente de ses démarches", 'Sous 15 jours, dans les mêmes termes'],
        ['3. Suite', "Rapport spécial communiqué à la juridiction ; sur demande du CAC, communication aux associés sous 8 jours ou présentation à la prochaine assemblée ; en cas d'urgence, le CAC convoque lui-même l'assemblée", "Invitation à faire délibérer le conseil d'administration (convocation sous 15 jours, délibération dans le mois, CAC convoqué, extrait du PV à la juridiction) ; puis rapport spécial présenté à l'assemblée, que le CAC peut convoquer après réquisition vaine"],
        ['4. Issue', "Si les décisions prises ne permettent pas d'assurer la continuité, le CAC informe la juridiction compétente et lui communique les résultats", "Identique ; dans les 6 mois du déclenchement, le CAC peut reprendre la procédure au point où il l'avait interrompue si la continuité demeure compromise et que l'urgence l'exige"],
      ] } },
      { type: 'filet', titre: "L'alerte par les associés (Art. 157-158)", texte: "Dans les sociétés autres que par actions, **tout associé non gérant** peut, deux (2) fois par exercice, poser par écrit des questions au gérant sur tout fait de nature à compromettre la continuité de l'exploitation ; le gérant répond **par écrit dans les 15 jours** et adresse copie de la question et de la réponse au commissaire aux comptes s'il en existe un (Art. 157). Dans la SA - et la SAS par renvoi (Art. 158-1) -, tout actionnaire dispose du même droit auprès du président du conseil, du PDG ou de l'administrateur général (Art. 158)." },
      { type: 'paragraphe', texte: "**L'expertise de gestion (Art. 159-160).** Un ou plusieurs associés représentant au moins **le dixième du capital social** - quelle que soit la forme sociale - peuvent demander à la juridiction compétente du siège, statuant à bref délai, la désignation d'un ou plusieurs experts chargés de présenter un rapport sur **une ou plusieurs opérations de gestion**. La juridiction détermine l'étendue de la mission et les pouvoirs des experts ; les honoraires sont **supportés par la société** ; le rapport est adressé au demandeur, aux organes de gestion, de direction ou d'administration et au commissaire aux comptes. À la différence de l'alerte, tournée vers l'avenir de l'exploitation, l'expertise porte sur des opérations passées identifiées." },
      { type: 'carte', titre: "L'administration provisoire (Art. 160-1 à 160-8)", tableau: { entetes: ['Aspect', 'Règle', 'Article'], lignes: [
        ['Condition', "Fonctionnement normal de la société rendu **impossible**, du fait des organes ou du fait des associés", 'Art. 160-1'],
        ['Saisine', "Requête des organes de gestion, de direction ou d'administration, ou d'un ou plusieurs associés ; la société est mise en cause à peine d'irrecevabilité", 'Art. 160-2'],
        ['Administrateur', "Personne physique : mandataire judiciaire inscrit sur une liste spéciale ou toute personne justifiant d'une expérience ou qualification particulière", 'Art. 160-2'],
        ['Décision de nomination', "Détermine la mission et les pouvoirs, indique les organes restant en fonction, fixe la rémunération (à la charge de la société) et la durée : **6 mois au plus, prorogeable sans que le total excède 12 mois**", 'Art. 160-2'],
        ['Publicité', 'Avis publié dans les 15 jours dans un journal habilité, avec la cause de la mesure et les limitations de pouvoirs', 'Art. 160-3'],
        ['Pouvoirs', "Il représente la société dans le cadre de sa mission ; tout acte outrepassant ses pouvoirs est **inopposable à la société**", 'Art. 160-4'],
        ['Contrôle', 'Rapport à la juridiction compétente au moins une fois tous les 3 mois ; s\'il a tous les pouvoirs : états financiers dans les 4 mois de la clôture et convocation de l\'assemblée annuelle dans les 6 mois', 'Art. 160-5, 160-6'],
        ['Fin et responsabilité', "Révocable et remplaçable dans les formes de sa nomination - tout associé pouvant demander sa révocation pour motif légitime ; il répond envers la société et les tiers des fautes commises dans ses fonctions", 'Art. 160-7, 160-8'],
      ] } },
      { type: 'controle', question: QCM[18] },
      { type: 'controle', question: QCM[22] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: 'Révocation litigieuse',
    contexte: "L'AG de la SARL GOMA SERVICES réunit des associés représentant 60% du capital. Le point « Révocation du gérant M. Kamba » ne figurait pas à l'ordre du jour. L'assemblée vote quand même sa révocation (60% en faveur) sans lui reprocher de faute précise, puis nomme un remplaçant.",
    questions: [
      { num: 1, enonce: "La révocation de M. Kamba est-elle juridiquement valide alors qu'elle n'était pas à l'ordre du jour ?", correction: "Oui. L'Art. 338-1 AUSCGIE interdit en principe à l'assemblée de délibérer sur une question non inscrite à l'ordre du jour, mais prévoit une exception expresse : elle peut, même dans ce cas, révoquer le gérant et procéder à son remplacement. La majorité requise - plus de la moitié des parts sociales (Art. 326) - est atteinte avec 60%. La révocation est donc régulière." },
      { num: 2, enonce: "M. Kamba peut-il obtenir des dommages et intérêts ?", correction: "Oui, potentiellement. L'Art. 326 al. 2 AUSCGIE dispose que si la révocation est décidée sans juste motif, elle peut donner lieu à dommages et intérêts. Aucune faute précise n'ayant été articulée, M. Kamba peut saisir la juridiction compétente : il devra établir l'absence de juste motif et son préjudice. La révocation elle-même demeure valable - seule son indemnisation est en cause." },
      { num: 3, enonce: "Dans quel cas la révocation peut-elle être prononcée par un tribunal ?", correction: "L'Art. 326 al. 3 AUSCGIE permet à tout associé - même minoritaire - de demander à la juridiction compétente du siège social la révocation du gérant, pour juste motif. Contrairement à la révocation par l'assemblée, qui peut intervenir sans motif à charge d'indemnisation, la révocation judiciaire exige impérativement un juste motif (faute de gestion, violation des statuts, paralysie de la gérance...)." },
    ],
  },
  {
    id: 'cp2',
    titre: 'Dépassement de pouvoirs',
    contexte: "Les statuts de la SARL KIVU IMPORT limitent les pouvoirs du gérant à 100 000 USD par engagement. Le gérant signe un contrat de 250 000 USD sans autorisation préalable. Le fournisseur étranger ignorait cette limitation. Les statuts sont déposés au RCCM.",
    questions: [
      { num: 1, enonce: "La SARL est-elle engagée par ce contrat ?", correction: "Oui. Vis-à-vis des tiers, le gérant est investi des pouvoirs les plus étendus (Art. 329) et les clauses statutaires limitant ses pouvoirs sont inopposables aux tiers de bonne foi (Art. 121, 123, 329). Le fournisseur ignorait la limitation, et la seule publication des statuts au RCCM ne suffit pas à prouver sa connaissance (Art. 122). La SARL est donc engagée et devra exécuter le contrat." },
      { num: 2, enonce: "Que peuvent faire les associés contre le gérant ?", correction: "Le gérant a violé les statuts : il engage sa responsabilité envers la société (Art. 330). Deux voies s'ouvrent : l'action individuelle, pour l'associé qui subirait un préjudice distinct de celui de la société (Art. 162) ; et l'action sociale, intentée par des associés représentant le quart des associés et le quart des parts (Art. 331), les dommages et intérêts étant alloués à la société et les frais avancés par elle (Art. 167, 171). Aucun quitus de l'assemblée ne peut éteindre cette action (Art. 169). Prescription : trois ans (Art. 332). Les associés peuvent enfin le révoquer - la violation des statuts constituant un juste motif (Art. 326)." },
    ],
  },
  {
    id: 'cp3',
    titre: 'Rémunération contestée',
    contexte: "M. Diallo est gérant et associé de la SARL BUKAVU TECH (40% du capital). Une AG réunit 55% du capital et vote la rémunération de M. Diallo. M. Diallo a participé au vote avec ses 40%. Sans ses voix, la résolution n'aurait obtenu que 15%.",
    questions: [
      { num: 1, enonce: "La délibération est-elle valide ?", correction: "Non. L'Art. 325 AUSCGIE dispose que le gérant associé ne prend pas part au vote de la délibération relative à sa rémunération et que ses voix ne sont pas prises en compte pour le calcul de la majorité, toute délibération contraire étant nulle. Décomptées sans les 40% de M. Diallo, les voix favorables ne représentent que 15% du capital : la majorité requise n'est pas atteinte et la délibération est nulle." },
      { num: 2, enonce: "Comment régulariser ?", correction: "Convoquer une nouvelle assemblée et faire voter la rémunération par les seuls autres associés, les voix de M. Diallo étant exclues du calcul. Les sommes déjà versées sur le fondement de la délibération nulle sont sujettes à répétition. À noter : la fixation de la rémunération n'est pas soumise au régime des conventions réglementées (Art. 325 dernier al.), le mécanisme de l'exclusion du vote suffisant à protéger les associés." },
    ],
  },
  {
    id: 'cp4',
    titre: 'Dirigeant de fait en liquidation',
    contexte: "M. Kabila n'est pas gérant officiel de la SARL MANIEMA TRADE, mais depuis 2 ans il signe tous les contrats, dirige le personnel, négocie avec les banques et prend toutes les décisions stratégiques. La société est en liquidation avec un passif important.",
    questions: [
      { num: 1, enonce: "M. Kabila peut-il être qualifié de dirigeant de fait ?", correction: "Oui. Le dirigeant de fait est celui qui, sans titre officiel, exerce en toute indépendance les pouvoirs de direction normalement dévolus aux dirigeants de droit. Les indices classiques sont réunis : signature de l'ensemble des contrats, direction du personnel, négociation bancaire, décisions stratégiques, le tout dans la durée et en pleine indépendance. La qualification est une question de fait appréciée souverainement par le juge." },
      { num: 2, enonce: "Quelles sont les conséquences en liquidation ?", correction: "La doctrine et la jurisprudence étendent au dirigeant de fait les responsabilités des dirigeants : responsabilité civile pour les fautes commises dans la gestion (par transposition des Art. 161 et 330) et, dans le cadre d'une liquidation des biens avec insuffisance d'actif, exposition à l'action en comblement du passif organisée par l'Acte uniforme portant organisation des procédures collectives d'apurement du passif - qui permet de mettre tout ou partie de l'insuffisance d'actif à la charge des dirigeants, de droit ou de fait, dont les fautes de gestion y ont contribué. M. Kabila ne peut donc pas s'abriter derrière l'absence de titre officiel." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue2',
  numero: 7,
  id: 'ue2-ch7',
  titre: 'Les dirigeants sociaux',
  sousTitre: 'Art. 121-180, 323-332 et 338-1 AUSCGIE révisé du 30 janvier 2014',
  infoBulle: "Pouvoirs, responsabilité, révocation des dirigeants sociaux, protection des minoritaires (abus, alerte, expertise de gestion, administration provisoire) et groupes de sociétés.",
  loiRef: 'Art. 121-180, 323-332 AUSCGIE',
  moduleLabel: 'UE 2 · Droit des sociétés',
  retourRoute: '/ue2-droit-societes',
  coursId: 'ue2-droit-societes',
  objectifs: [
    'Maîtriser les principes généraux des pouvoirs des dirigeants et leur publicité (Art. 121-124)',
    'Distinguer dirigeant de droit et dirigeant de fait',
    'Appliquer les règles de nomination, rémunération, révocation et démission du gérant (Art. 323-327, 338-1)',
    "Analyser l'engagement de la société par les actes des dirigeants, y compris hors objet social (Art. 122, 328-329)",
    'Mettre en œuvre les actions individuelle et sociale en responsabilité (Art. 161-172, 330-332)',
    "Identifier l'abus de majorité et de minorité, le dividende fictif et le contrôle dans les groupes (Art. 129-131, 143-146, 173-180)",
    "Comprendre l'alerte, l'expertise de gestion et l'administration provisoire (Art. 150-160-8)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "À l'égard des tiers, les organes de gestion, de direction et d'administration ont tout pouvoir pour engager la société sans mandat spécial ; les limitations statutaires sont inopposables aux tiers de bonne foi, et la société est engagée même hors objet social sauf preuve - que la seule publication des statuts ne constitue pas - de la connaissance du tiers (Art. 121-123).",
    "La désignation et la cessation des fonctions des dirigeants sont publiées au RCCM (Art. 124) ; le gérant de SARL est une personne physique, nommée pour 4 ans à défaut de clause, qui ne vote jamais sa propre rémunération (Art. 323-325).",
    "Le gérant de SARL est révocable à la majorité absolue des parts - même hors ordre du jour -, avec dommages et intérêts si la révocation est sans juste motif, et en justice pour juste motif à la demande de tout associé (Art. 326, 338-1) ; les administrateurs de SA sont révocables ad nutum par l'AGO (Art. 433).",
    "La responsabilité civile des dirigeants naît des infractions à la loi, des violations des statuts et des fautes de gestion (Art. 330) ; l'action individuelle répare le préjudice distinct du demandeur, l'action sociale celui de la société - ouverte aux associés après mise en demeure vaine de 30 jours (régime général, Art. 167) ou au quart des associés détenant le quart des parts (SARL, Art. 331) ; prescription de 3 ans, 10 ans pour les crimes.",
    "Ni clause statutaire ni quitus d'assemblée ne peuvent paralyser l'action sociale (Art. 168-169) ; le dirigeant de fait encourt les mêmes responsabilités que le dirigeant de droit, jusqu'au comblement du passif de l'Acte uniforme sur les procédures collectives.",
    "L'abus de majorité rend la décision nulle et engage les majoritaires ; l'abus de minorité expose à un mandataire ad hoc votant dans le sens de l'intérêt social (Art. 130-131) ; tout dividende distribué hors bénéfice distribuable est fictif (Art. 143-144) et la mise en paiement intervient dans les 9 mois de la clôture (Art. 146).",
    "Le contrôle d'une société est présumé au-delà de la moitié des droits de vote, directement ou par accord (Art. 175) ; les participations croisées au-delà de 10% sont interdites (Art. 177) ; la société mère détient plus de la moitié du capital de sa filiale (Art. 179).",
    "L'alerte du CAC (explications sous 15 jours, délibération des organes, rapport spécial à l'assemblée, information de la juridiction - Art. 150-156) et les questions écrites semestrielles des associés (Art. 157-158) préviennent la rupture de continuité ; le dixième du capital ouvre l'expertise de gestion (Art. 159-160) ; et l'administration provisoire - 6 mois prorogeables dans la limite de 12 - se substitue aux organes quand le fonctionnement normal est impossible (Art. 160-1 à 160-8).",
  ],
  references: [
    {
      genre: 'texte',
      intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)",
      precision: 'adopté le 30 janvier 2014 à Ouagadougou, art. 121 à 180, 323 à 332, 338-1 et 433',
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : AUSCGIE révisé du 30 janvier 2014, art. 121-180, 323-332, 338-1, 433',
}

export default chapitre
