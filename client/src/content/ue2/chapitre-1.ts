// Chapitre 1 du module UE2, Droit des sociétés : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
//
// Réécriture approfondie (septembre 2026). Sources lues pendant la rédaction :
// - AUSCGIE révisé du 30 janvier 2014, texte intégral des art. 1 à 80, 97 à
//   120-5, 242 à 262, 269-1 à 269-2-1, 907 à 920, et, pour les formes
//   sociales, art. 186, 270, 293, 293-1, 309 à 312, 385 à 389, 400, 824,
//   853-1 à 853-4, 854 et 864 à 868 (skill auscgie-acte-uniforme) ;
// - décret n° 14/014 du 8 mai 2014 portant création, organisation et
//   fonctionnement du Guichet unique de création d'entreprise (texte intégral,
//   leganet.cd) ;
// - arrêté interministériel n° 002/CAB/MIN/JGS&DH/014 et
//   n° 243/CAB/MIN/FINANCES/2014 du 30 décembre 2014, art. 1 à 3 (tels que
//   reproduits par le cabinet Yav & Associates, 6 janvier 2015) ;
// - ordonnance-loi n° 22/030 du 8 septembre 2022 relative à la promotion de
//   l'entrepreneuriat et des startups, art. 1, 2 et 26 (skill
//   droit-economique-investissement-rdc) ;
// - adhésion de la RDC : loi n° 10/002 du 11 février 2010 (visée par le
//   décret n° 14/014), dépôt des instruments le 13 juillet 2012 et entrée en
//   vigueur le 12 septembre 2012 (ohada.com) ;
// - actualité : compte rendu du Conseil des ministres du 4 mai 2020
//   (DeskEco), Radio Okapi (27 juin 2023), projet TRANSFORME (11 juillet
//   2025), Banque mondiale (13 février 2026).
// La date d'entrée en vigueur de l'AUSCGIE révisé (5 mai 2014) est calculée
// à partir de l'art. 920 : quatre-vingt-dix jours après la publication au
// Journal officiel de l'OHADA du 4 février 2014.
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch1-q1', question: "Quel critère détermine l'application de l'AUSCGIE à une société commerciale ?",
    options: [
      { id: 'a', texte: 'La nationalité de la majorité des associés' },
      { id: 'b', texte: "La situation du siège social sur le territoire d'un État partie" },
      { id: 'c', texte: 'La nationalité du gérant ou du directeur général' },
      { id: 'd', texte: "Le lieu où la société réalise l'essentiel de son chiffre d'affaires" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 1 AUSCGIE',
    explication: "L'art. 1 soumet à l'Acte uniforme « toute société commerciale, y compris celle dans laquelle un État ou une personne morale de droit public est associé, dont le siège social est situé sur le territoire de l'un des États parties ». La nationalité des associés ou des dirigeants et le lieu de l'activité sont indifférents.",
  },
  {
    id: 'ch1-q2', question: "Depuis quelle date les Actes uniformes de l'OHADA sont-ils en vigueur en RDC ?",
    options: [
      { id: 'a', texte: '17 octobre 1993' },
      { id: 'b', texte: '11 février 2010' },
      { id: 'c', texte: '13 juillet 2012' },
      { id: 'd', texte: '12 septembre 2012' },
    ],
    reponseCorrecte: 'd', articleRef: "Loi n° 10/002 du 11 février 2010 ; adhésion au Traité OHADA",
    explication: "La loi n° 10/002 du 11 février 2010 a autorisé l'adhésion ; les instruments ont été déposés à Dakar le 13 juillet 2012 et le droit OHADA est entré en vigueur en RDC soixante jours plus tard, le 12 septembre 2012. Le 17 octobre 1993 est la date de signature du Traité à Port-Louis.",
  },
  {
    id: 'ch1-q3', question: "L'AUSCGIE révisé, adopté le 30 janvier 2014 et publié au Journal officiel de l'OHADA le 4 février 2014, est entré en vigueur :",
    options: [
      { id: 'a', texte: 'le 30 janvier 2014, jour de son adoption' },
      { id: 'b', texte: 'le 4 février 2014, jour de sa publication' },
      { id: 'c', texte: 'le 5 mai 2014, quatre-vingt-dix jours après sa publication' },
      { id: 'd', texte: 'le 30 janvier 2016, deux ans après son adoption' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 920 AUSCGIE',
    explication: "L'art. 920 prévoit que l'Acte uniforme « entrera en vigueur quatre-vingt-dix (90) jours à compter de la date de sa publication au Journal Officiel de l'OHADA ». Publié le 4 février 2014, il est donc entré en vigueur le 5 mai 2014. Le délai de deux ans est celui de la mise en harmonie des statuts (art. 908), non celui de l'entrée en vigueur.",
  },
  {
    id: 'ch1-q4', question: "Les statuts d'une SARL contiennent une clause contraire à une disposition impérative de l'AUSCGIE. Quelle est la sanction ?",
    options: [
      { id: 'a', texte: 'La nullité de la société' },
      { id: 'b', texte: 'La clause est réputée non écrite, les statuts demeurent' },
      { id: 'c', texte: "La clause reste valable entre associés mais est inopposable aux tiers" },
      { id: 'd', texte: "L'annulation de l'immatriculation au RCCM" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 2 AUSCGIE',
    explication: "Selon l'art. 2 al. 2, « est réputée non écrite toute clause statutaire contraire à une disposition du présent Acte uniforme ». La sanction est chirurgicale : seule la clause disparaît. La nullité de la société est réservée aux cas limitativement prévus, notamment par l'art. 74-1.",
  },
  {
    id: 'ch1-q5', question: "Selon l'art. 4 al. 2 AUSCGIE, la société commerciale est créée :",
    options: [
      { id: 'a', texte: "dans l'intérêt de l'associé majoritaire" },
      { id: 'b', texte: "dans l'intérêt commun des associés" },
      { id: 'c', texte: "dans l'intérêt des créanciers sociaux" },
      { id: 'd', texte: "dans l'intérêt général de l'État du siège" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 4 al. 2 AUSCGIE',
    explication: "« La société commerciale est créée dans l'intérêt commun des associés. » Cette formule fonde le contrôle des abus de majorité ou de minorité : une décision prise dans l'intérêt exclusif de certains associés, au détriment des autres, trahit la finalité même du contrat de société.",
  },
  {
    id: 'ch1-q6', question: "Laquelle de ces formes sociales NE peut PAS être constituée par un associé unique ?",
    options: [
      { id: 'a', texte: 'La SARL' },
      { id: 'b', texte: 'La SA' },
      { id: 'c', texte: 'La SAS' },
      { id: 'd', texte: 'La SNC' },
    ],
    reponseCorrecte: 'd', articleRef: 'Art. 5, 270, 309 al. 2, 385 al. 2 et 853-1 AUSCGIE',
    explication: "L'art. 5 n'admet l'associé unique que « dans les cas prévus par le présent Acte uniforme » : la SARL (art. 309 al. 2), la SA (art. 385 al. 2) et la SAS (art. 853-1). La SNC, où « tous les associés sont commerçants » (art. 270), suppose une pluralité d'associés.",
  },
  {
    id: 'ch1-q7', question: "Toutes les parts d'une SNC se retrouvent entre les mains d'un seul associé. Quelle en est la conséquence ?",
    options: [
      { id: 'a', texte: 'La dissolution de plein droit immédiate' },
      { id: 'b', texte: "Aucune : la SNC peut devenir unipersonnelle" },
      { id: 'c', texte: "Tout intéressé peut demander la dissolution en justice si la situation n'est pas régularisée dans un an" },
      { id: 'd', texte: 'La transformation automatique en SARL unipersonnelle' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 60 AUSCGIE',
    explication: "L'art. 60 écarte la dissolution de plein droit : tout intéressé peut demander la dissolution si la situation n'a pas été régularisée dans le délai d'un an ; le juge peut accorder un délai maximal de six mois et ne peut prononcer la dissolution si la régularisation est intervenue au jour où il statue sur le fond.",
  },
  {
    id: 'ch1-q8', question: "Deux époux peuvent-ils être ensemble associés d'une SNC ?",
    options: [
      { id: 'a', texte: 'Oui, sans restriction' },
      { id: 'b', texte: "Oui, s'ils sont mariés sous le régime de la séparation des biens" },
      { id: 'c', texte: "Non, car ils y seraient tenus des dettes sociales indéfiniment et solidairement" },
      { id: 'd', texte: "Non, car les époux ne peuvent jamais être coassociés" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 9, 270 et 74-1 AUSCGIE',
    explication: "L'art. 9 interdit aux époux d'être associés d'une société dans laquelle ils seraient tenus des dettes sociales indéfiniment ou solidairement ; or, dans la SNC, tous les associés en répondent indéfiniment et solidairement (art. 270). La violation est sanctionnée par la nullité de la société (art. 74-1). Rien n'interdit en revanche aux époux d'être coassociés d'une SARL, d'une SA ou d'une SAS.",
  },
  {
    id: 'ch1-q9', question: "Lequel de ces apports est interdit par l'AUSCGIE ?",
    options: [
      { id: 'a', texte: "Une somme d'argent" },
      { id: 'b', texte: 'Un droit de bail sur un entrepôt' },
      { id: 'c', texte: "Des connaissances techniques mises à la disposition de la société" },
      { id: 'd', texte: "L'engagement de se porter caution des dettes de la société" },
    ],
    reponseCorrecte: 'd', articleRef: 'Art. 40 AUSCGIE',
    explication: "L'art. 40 énumère limitativement trois apports : l'argent (numéraire), les droits portant sur des biens mobiliers ou immobiliers, corporels ou incorporels (nature), et les connaissances techniques ou professionnelles ou les services (industrie). « Tout autre apport est interdit. » Un simple engagement de garantie n'entre dans aucune de ces catégories ; une société constituée en violation de l'art. 40 est nulle (art. 74-1).",
  },
  {
    id: 'ch1-q10', question: "À quel moment un apport en numéraire est-il considéré comme libéré ?",
    options: [
      { id: 'a', texte: "Dès la signature du bulletin de souscription" },
      { id: 'b', texte: "Dès que l'associé a émis un chèque à l'ordre de la société" },
      { id: 'c', texte: "Lorsque la société est devenue propriétaire des sommes et les a intégralement et définitivement encaissées" },
      { id: 'd', texte: "À l'immatriculation de la société au RCCM" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 42 AUSCGIE',
    explication: "« Ne sont considérés comme libérés que les apports en numéraire correspondant à des sommes dont la société est devenue propriétaire et qu'elle a intégralement et définitivement encaissées » (art. 42). Un chèque non encore encaissé, ou un encaissement susceptible d'être remis en cause, ne libère pas l'apporteur.",
  },
  {
    id: 'ch1-q11', question: "Les apports en industrie concourent-ils à la formation du capital social ?",
    options: [
      { id: 'a', texte: 'Oui, pour la valeur fixée par les statuts' },
      { id: 'b', texte: "Non, mais ils donnent lieu à des titres ouvrant droit au vote et au partage des bénéfices et de l'actif net" },
      { id: 'c', texte: 'Oui, mais seulement dans la SAS' },
      { id: 'd', texte: "Non, et ils ne donnent droit à aucun titre social" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 50-3 AUSCGIE',
    explication: "L'art. 50-3 al. 1 : « Les apports en industrie ne concourent pas à la formation du capital social mais donnent lieu à l'attribution de titres sociaux ouvrant droit au vote et au partage des bénéfices et de l'actif net, à charge de contribuer aux pertes. »",
  },
  {
    id: 'ch1-q12', question: "Les droits de vote attachés aux titres rémunérant des apports en industrie sont plafonnés à :",
    options: [
      { id: 'a', texte: '10 % des droits de vote' },
      { id: 'b', texte: '25 % des droits de vote' },
      { id: 'c', texte: '33 % des droits de vote' },
      { id: 'd', texte: '50 % des droits de vote' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 50-3 al. 2 et 3 AUSCGIE',
    explication: "Les droits de vote attachés à ces titres ne peuvent être supérieurs à 25 % de l'ensemble des droits de vote (al. 2), et la part totale attachée à ces titres ne peut excéder 25 % des bénéfices, de l'actif net et des pertes de la société (al. 3). Le double plafond protège les apporteurs en capital.",
  },
  {
    id: 'ch1-q13', question: "Dans quelle forme sociale les apports en industrie sont-ils interdits ?",
    options: [
      { id: 'a', texte: 'La SNC' },
      { id: 'b', texte: 'La SARL' },
      { id: 'c', texte: 'La SA' },
      { id: 'd', texte: 'La SCS' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 50-1 al. 2 et 389 al. 5 AUSCGIE',
    explication: "L'art. 50-1 al. 2 dispose que « les apports en industrie sont interdits dans les sociétés anonymes », et l'art. 389 le rappelle : « Les actions ne peuvent représenter des apports en industrie. » La SA est la société de capitaux par excellence.",
  },
  {
    id: 'ch1-q14', question: "Les statuts d'une SARL attribuent à l'associé A 100 % des bénéfices. Cette clause est :",
    options: [
      { id: 'a', texte: 'Valable si tous les associés y ont consenti' },
      { id: 'b', texte: 'Réputée non écrite' },
      { id: 'c', texte: "Cause de nullité de la société" },
      { id: 'd', texte: "Valable pendant les trois premiers exercices seulement" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 54 al. 2 AUSCGIE',
    explication: "L'art. 54 al. 2 répute non écrites « les clauses attribuant à un associé la totalité du profit procuré par la société ou l'exonérant de la totalité des pertes, ainsi que celles excluant un associé totalement du profit ou mettant à sa charge la totalité des pertes ». Le consentement unanime n'y change rien, et la sanction frappe la clause, non la société.",
  },
  {
    id: 'ch1-q15', question: "Une SARL peut-elle émettre des titres négociables (obligations, par exemple) ?",
    options: [
      { id: 'a', texte: "Oui, avec l'accord unanime des associés" },
      { id: 'b', texte: "Oui, si son capital dépasse 10 000 000 FCFA" },
      { id: 'c', texte: "Non : l'émission est réservée aux sociétés par actions, et les titres émis en violation sont nuls" },
      { id: 'd', texte: "Non, sauf garantie d'une banque" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 57 et 58 AUSCGIE',
    explication: "« Les sociétés par actions émettent des titres négociables. L'émission de ces titres est interdite pour les sociétés autres » que celles-ci, auxquelles il est aussi interdit de garantir une émission de titres négociables ; « sont nuls tous contrats conclus, titres émis ou garanties accordées » en violation (art. 58). Les parts de SARL sont cessibles, non négociables (art. 57).",
  },
  {
    id: 'ch1-q16', question: "Dans une SARL, les parts représentant des apports en numéraire doivent être libérées lors de la souscription :",
    options: [
      { id: 'a', texte: "Intégralement" },
      { id: 'b', texte: "De la moitié au moins, le surplus dans les deux ans de l'immatriculation" },
      { id: 'c', texte: "Du quart au moins, le surplus dans les trois ans de l'immatriculation" },
      { id: 'd', texte: "Librement, selon les statuts" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 311-1 AUSCGIE',
    explication: "L'art. 311-1 impose la libération de la moitié au moins de la valeur nominale lors de la souscription ; le surplus est libéré en une ou plusieurs fois dans un délai de deux ans à compter de l'immatriculation. Les parts représentant des apports en nature sont intégralement libérées. Le quart et trois ans valent pour la SA (art. 389).",
  },
  {
    id: 'ch1-q17', question: "Dans une SARL, l'évaluation des apports en nature doit être contrôlée par un commissaire aux apports lorsque leur valeur dépasse :",
    options: [
      { id: 'a', texte: '1 000 000 FCFA' },
      { id: 'b', texte: '5 000 000 FCFA' },
      { id: 'c', texte: '10 000 000 FCFA' },
      { id: 'd', texte: "Jamais : les associés évaluent seuls les apports en nature" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 312 AUSCGIE',
    explication: "Le contrôle est obligatoire dès que la valeur de l'apport considéré, ou de l'ensemble des apports en nature, est supérieure à cinq millions de francs CFA ; les avantages particuliers sont toujours contrôlés. Sans commissaire, ou si la valeur retenue diffère de la sienne, les associés sont solidairement responsables pendant cinq ans, à l'égard des tiers, de la valeur attribuée aux apports en nature.",
  },
  {
    id: 'ch1-q18', question: "Quelle est la durée maximale d'une société, et à partir de quand court-elle ?",
    options: [
      { id: 'a', texte: '50 ans, à compter de la signature des statuts' },
      { id: 'b', texte: '99 ans, à compter de la signature des statuts' },
      { id: 'c', texte: "99 ans, à compter de l'immatriculation au RCCM" },
      { id: 'd', texte: 'Illimitée' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 28 et 29 AUSCGIE',
    explication: "La durée ne peut excéder quatre-vingt-dix-neuf ans (art. 28) et son point de départ est la date d'immatriculation au RCCM, sauf disposition contraire de l'Acte uniforme (art. 29). L'arrivée du terme entraîne la dissolution de plein droit, sauf prorogation (art. 30).",
  },
  {
    id: 'ch1-q19', question: "Quand les associés doivent-ils être consultés sur la prorogation de la société ?",
    options: [
      { id: 'a', texte: "Un an au moins avant la date d'expiration de la durée" },
      { id: 'b', texte: "Trois mois au moins avant la date d'expiration" },
      { id: 'c', texte: "Le jour de l'expiration" },
      { id: 'd', texte: "Dans l'année qui suit l'expiration" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 35 et 36 AUSCGIE',
    explication: "« Un (1) an au moins avant la date d'expiration de la durée de la société, les associés doivent être consultés » (art. 35). À défaut, tout associé peut demander au juge du siège, statuant à bref délai, la désignation d'un mandataire ad hoc chargé de provoquer la consultation (art. 36).",
  },
  {
    id: 'ch1-q20', question: "Le siège statutaire d'une société est fixé à Kinshasa, mais sa direction effective se trouve à Lubumbashi. Qu'en résulte-t-il ?",
    options: [
      { id: 'a', texte: "Seul le siège statutaire compte, pour tous" },
      { id: 'b', texte: "Les tiers peuvent se prévaloir du siège statutaire, mais la société ne peut le leur opposer" },
      { id: 'c', texte: "La société est nulle" },
      { id: 'd', texte: "Le siège réel s'impose aux tiers comme à la société" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 26 AUSCGIE',
    explication: "« Les tiers peuvent se prévaloir du siège statutaire, mais celui-ci ne leur est pas opposable par la société si le siège réel est situé en un autre lieu » (art. 26). Le tiers choisit le siège le plus favorable à ses intérêts ; la société ne peut se retrancher derrière un siège fictif.",
  },
  {
    id: 'ch1-q21', question: "À quel moment une société commerciale acquiert-elle la personnalité juridique ?",
    options: [
      { id: 'a', texte: 'À la signature des statuts' },
      { id: 'b', texte: 'Au dépôt des fonds en banque' },
      { id: 'c', texte: "À l'immatriculation au registre du commerce et du crédit mobilier" },
      { id: 'd', texte: "À la publication de l'avis de constitution" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 98 et 101 AUSCGIE',
    explication: "La société est constituée à la signature de ses statuts (art. 101), mais elle ne jouit de la personnalité juridique qu'à compter de son immatriculation au RCCM (art. 98). Avant, son existence n'est pas opposable aux tiers, qui peuvent néanmoins s'en prévaloir (art. 101 al. 2).",
  },
  {
    id: 'ch1-q22', question: "Un fondateur a signé un contrat pour le compte de la société en formation, contrat qui n'a jamais été repris par la société. Qui en répond ?",
    options: [
      { id: 'a', texte: 'La société, automatiquement, dès son immatriculation' },
      { id: 'b', texte: "Les personnes qui ont souscrit l'engagement, solidairement et indéfiniment" },
      { id: 'c', texte: "Personne : le contrat est nul" },
      { id: 'd', texte: "L'ensemble des associés, à proportion de leurs apports" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 106 à 110 AUSCGIE',
    explication: "Les actes non repris dans les conditions de l'Acte uniforme « sont inopposables à la société et les personnes qui les ont souscrits sont tenues solidairement et indéfiniment par les obligations qu'ils comportent » (art. 110 al. 2). Repris, ils sont réputés avoir été contractés par la société dès l'origine (art. 110 al. 1).",
  },
  {
    id: 'ch1-q23', question: "Que risque une demande d'immatriculation déposée sans déclaration de régularité et de conformité ?",
    options: [
      { id: 'a', texte: 'Une simple amende' },
      { id: 'b', texte: "Le rejet de la demande d'immatriculation" },
      { id: 'c', texte: "La nullité de la société" },
      { id: 'd', texte: "Rien, la déclaration étant facultative" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 73 et 74 AUSCGIE',
    explication: "La déclaration par laquelle fondateurs et premiers dirigeants attestent la conformité de la constitution est « exigée à peine de rejet de la demande d'immatriculation » (art. 73 al. 2). Elle n'est pas requise lorsqu'une déclaration notariée de souscription et de versement a été établie et déposée (art. 74).",
  },
  {
    id: 'ch1-q24', question: "Dans quel délai l'avis de constitution doit-il être inséré dans un journal habilité à recevoir les annonces légales ?",
    options: [
      { id: 'a', texte: "Quinze jours suivant l'immatriculation" },
      { id: 'b', texte: 'Trente jours suivant la signature des statuts' },
      { id: 'c', texte: "Deux mois suivant l'immatriculation" },
      { id: 'd', texte: 'Aucun délai légal' },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 261 et 262 AUSCGIE',
    explication: "« Dans un délai de quinze (15) jours suivant l'immatriculation, un avis est inséré dans un journal habilité à recevoir les annonces légales dans l'État partie du siège social » (art. 261). L'art. 262 en fixe le contenu, en plus des mentions communes de l'art. 257-1.",
  },
  {
    id: 'ch1-q25', question: "Selon le décret n° 14/014 du 8 mai 2014, dans quel délai maximal les formalités de création d'entreprise doivent-elles être accomplies au GUCE ?",
    options: [
      { id: 'a', texte: 'Vingt-quatre heures' },
      { id: 'b', texte: "Trois jours ouvrables à partir de la réception du dossier complet" },
      { id: 'c', texte: 'Quinze jours calendaires' },
      { id: 'd', texte: 'Un mois' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 18 al. 3 du décret n° 14/014 du 8 mai 2014',
    explication: "« Toutes les formalités de Création d'Entreprise au Guichet Unique de Création d'Entreprise s'accomplissent dans un délai qui ne peut dépasser trois jours ouvrables, à partir de la réception du dossier complet. » Le point de départ est le dossier complet : un dossier incomplet ne fait pas courir le délai.",
  },
  {
    id: 'ch1-q26', question: "En RDC, comment est fixé le capital social d'une SARL depuis l'arrêté interministériel du 30 décembre 2014 ?",
    options: [
      { id: 'a', texte: '1 000 000 FCFA au moins, conformément à l\'art. 311 AUSCGIE' },
      { id: 'b', texte: "Librement par les associés, en tenant compte de l'objet social" },
      { id: 'c', texte: "10 000 000 FCFA au moins" },
      { id: 'd', texte: "Par le greffier du RCCM, selon l'activité" },
    ],
    reponseCorrecte: 'b', articleRef: "Art. 311 AUSCGIE ; art. 2 de l'arrêté interministériel du 30 décembre 2014",
    explication: "L'art. 311 fixe le minimum à un million de FCFA « sauf dispositions nationales contraires ». La RDC a usé de cette faculté : « le capital social de la Société à Responsabilité Limitée unipersonnelle ou pluripersonnelle est librement fixé par les associés en tenant compte de l'objet social de la société » (art. 2 de l'arrêté).",
  },
  {
    id: 'ch1-q27', question: "Laquelle de ces irrégularités est une cause de nullité de la société selon l'art. 74-1 ?",
    options: [
      { id: 'a', texte: "L'omission de la durée dans les statuts" },
      { id: 'b', texte: "Le défaut de publication de l'avis de constitution" },
      { id: 'c', texte: "Un objet social illicite" },
      { id: 'd', texte: "L'absence de sigle dans la dénomination" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 20, 74-1 et 75 AUSCGIE',
    explication: "L'art. 74-1 frappe de nullité les sociétés constituées en violation des art. 7, 8, 9, 20 (objet licite), 37 al. 1er et 40. L'omission d'une mention statutaire ou d'une formalité appelle, elle, une action en régularisation sous astreinte (art. 75), prescrite par trois ans (art. 77).",
  },
  {
    id: 'ch1-q28', question: "Le juge reconnaît l'existence d'une société créée de fait entre deux commerçants. Quelles règles s'appliquent aux associés ?",
    options: [
      { id: 'a', texte: 'Celles de la SARL' },
      { id: 'b', texte: 'Celles de la société en participation' },
      { id: 'c', texte: 'Celles de la société en nom collectif' },
      { id: 'd', texte: "Aucune : une société de fait n'a pas de régime" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 864 à 868 AUSCGIE',
    explication: "L'art. 868 dispose que, lorsque l'existence d'une société créée de fait ou d'une société de fait est reconnue par le juge, « les règles de la société en nom collectif sont applicables aux associés » : responsabilité indéfinie et solidaire pour les dettes sociales. L'existence de la société se prouve par tout moyen (art. 867).",
  },
  {
    id: 'ch1-q29', question: "Un pacte d'associés conclu en marge des statuts peut organiser :",
    options: [
      { id: 'a', texte: "Uniquement la transmission des titres sociaux" },
      { id: 'b', texte: "Notamment les relations entre associés, la composition des organes, la conduite des affaires, l'accès au capital et la transmission des titres" },
      { id: 'c', texte: "Tout ce qu'il veut, même contre les règles impératives de l'Acte uniforme" },
      { id: 'd', texte: "Rien : les conventions extra-statutaires sont interdites" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 2-1 AUSCGIE',
    explication: "L'art. 2-1 autorise les conventions extra-statutaires « en vue notamment d'organiser » ces cinq objets, mais « sous réserve du respect des dispositions du présent Acte uniforme auxquelles il ne peut être dérogé et des clauses statutaires ». Le pacte est libre dans son objet, pas au-dessus de la loi ni des statuts.",
  },
  {
    id: 'ch1-q30', question: "Une société étrangère exploite une succursale en RDC. Quelle obligation pèse sur elle ?",
    options: [
      { id: 'a', texte: "Aucune : la succursale est une personne morale de droit congolais" },
      { id: 'b', texte: "L'apporter à une société de droit d'un État partie au plus tard deux ans après sa création, sauf dispense ministérielle" },
      { id: 'c', texte: "La transformer en bureau de liaison dans les trente jours" },
      { id: 'd', texte: "Obtenir un agrément de la CCJA" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 116 à 120 AUSCGIE',
    explication: "La succursale n'a pas de personnalité juridique distincte (art. 117). Appartenant à une personne étrangère, elle doit être apportée à une société de droit d'un État partie, préexistante ou à créer, deux ans au plus tard après sa création, sauf dispense par arrêté du ministre du commerce, accordée pour deux ans non renouvelables ; à défaut, elle est radiée du RCCM après décision de justice (art. 120).",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '1.1',
    titre: "L'OHADA, l'AUSCGIE et leur application en RDC",
    navLabel: "1.1 L'OHADA et la RDC",
    blocs: [
      { type: 'paragraphe', texte: "Le droit congolais des sociétés commerciales n'est plus, depuis 2012, un droit national. Il est tiré d'un Acte uniforme adopté par le Conseil des ministres de l'Organisation pour l'harmonisation en Afrique du droit des affaires (OHADA), institution créée par le Traité relatif à l'harmonisation du droit des affaires en Afrique, signé à Port-Louis le 17 octobre 1993 et révisé à Québec le 17 octobre 2008. L'idée qui a présidé à la création de l'OHADA est simple : un investisseur qui hésite à s'engager dans un pays dont il ne connaît pas le droit s'engagera plus volontiers si ce droit est le même que celui des pays voisins, s'il est écrit, accessible, et si son interprétation est unifiée par une juridiction commune. Les Actes uniformes répondent au premier besoin ; la Cour commune de justice et d'arbitrage (CCJA), établie à Abidjan, répond au second. Pour l'étudiant congolais, la conséquence pratique est considérable : les règles étudiées dans ce module sont identiques, au mot près, de Dakar à Lubumbashi, et la jurisprudence de la CCJA rendue sur un litige camerounais ou ivoirien éclaire directement l'application du texte à Kinshasa." },
      { type: 'paragraphe', texte: "L'adhésion de la République démocratique du Congo s'est faite en trois temps. La loi n° 10/002 du 11 février 2010 a d'abord autorisé l'adhésion au Traité du 17 octobre 1993 tel que révisé le 17 octobre 2008. Les instruments d'adhésion ont ensuite été déposés à Dakar le 13 juillet 2012. Le droit OHADA est enfin entré en vigueur sur le territoire congolais le 12 septembre 2012, soit soixante jours après ce dépôt, faisant de la RDC le dix-septième État partie. Cette date est la frontière chronologique de toute question de droit des sociétés en RDC : une société constituée avant le 12 septembre 2012 est née sous l'empire du décret du Roi-Souverain du 27 février 1887 sur les sociétés commerciales, texte de l'État indépendant du Congo plusieurs fois retouché, tandis qu'une société constituée après cette date naît directement sous le droit uniforme." },
      { type: 'carte', titre: "Chronologie des textes applicables aux sociétés en RDC", tableau: { entetes: ['Date', 'Événement', 'Portée pour les sociétés'], lignes: [
        ['27 février 1887', "Décret du Roi-Souverain relatif aux sociétés commerciales", "Droit congolais des sociétés jusqu'en 2012 (SNC, SCS, SPRL, SARL au sens congolais, coopérative)"],
        ['17 avril 1997', "Premier Acte uniforme relatif au droit des sociétés commerciales et du GIE", "Applicable en RDC à compter de l'adhésion"],
        ['11 février 2010', "Loi n° 10/002 autorisant l'adhésion de la RDC au Traité OHADA", "Fondement interne de l'adhésion"],
        ['13 juillet 2012', "Dépôt des instruments d'adhésion à Dakar", "Point de départ du délai d'entrée en vigueur"],
        ['12 septembre 2012', "Entrée en vigueur du droit OHADA en RDC", "Les sociétés nouvelles naissent sous le droit uniforme"],
        ['30 janvier 2014', "Adoption à Ouagadougou de l'AUSCGIE révisé", "Publié au Journal officiel de l'OHADA le 4 février 2014"],
        ['5 mai 2014', "Entrée en vigueur de l'AUSCGIE révisé", "90 jours après la publication (art. 920) ; ouverture du délai de mise en harmonie de deux ans (art. 908)"],
      ] }, note: "La date du 5 mai 2014 se déduit de l'art. 920 : l'Acte uniforme « entrera en vigueur quatre-vingt-dix (90) jours à compter de la date de sa publication au Journal Officiel de l'OHADA ». Le préambule vise l'avis n° 02/2012/AU de la CCJA du 9 novembre 2012, consultée sur le projet de révision." },
      { type: 'paragraphe', texte: "La RDC a connu une situation transitoire singulière, que la doctrine congolaise a qualifiée de « chevauchement » des mises en harmonie. Les sociétés existantes au 12 septembre 2012 devaient d'abord se conformer à l'Acte uniforme de 1997 ; or, avant même l'expiration de ce premier délai, l'Acte révisé est entré en vigueur le 5 mai 2014, ouvrant un nouveau délai de deux ans. L'art. 908 pose la règle : les sociétés constituées antérieurement « sont soumises à ses dispositions » et « sont tenues de mettre leurs statuts en harmonie avec les dispositions du présent Acte uniforme dans un délai de deux (2) ans à compter de son entrée en vigueur ». La mise en harmonie abroge, modifie ou remplace les clauses statutaires contraires aux dispositions impératives et ajoute les compléments rendus obligatoires (art. 909) ; elle peut être décidée par l'assemblée statuant aux conditions des décisions ordinaires, à condition de ne modifier, quant au fond, que les clauses incompatibles avec le droit nouveau (art. 910). À défaut de mise en harmonie dans le délai, les clauses contraires sont réputées non écrites et les dispositions nouvelles s'appliquent (art. 915)." },
      { type: 'filet', titre: "Le problème particulier des SPRL et des SARL congolaises", texte: "Le droit de 1887 connaissait deux formes que l'OHADA ignore sous ce nom : la société privée à responsabilité limitée (SPRL), proche de la SARL OHADA, et la société par actions à responsabilité limitée, dite « SARL » congolaise, qui correspond en réalité à la société anonyme OHADA. Pour ces sociétés, une simple mise en harmonie des statuts ne suffisait pas : il fallait choisir une forme organisée par l'Acte uniforme et adopter de nouveaux statuts, SPRL vers SARL OHADA, SARL congolaise vers SA. Me Emery Mukendi Wafwana a souligné dès mai 2014 que la transformation de ces formes ne pouvait se fonder sur la seule mise en harmonie de l'art. 908. Le praticien qui rencontre aujourd'hui une « SPRL » dans un contrat ou un registre doit donc vérifier que la société a bien été transformée : l'art. 914 prévoit la dissolution de plein droit des SARL et SA dont le capital est resté inférieur au minimum légal à l'expiration du délai." },
      { type: 'paragraphe', texte: "Le champ d'application de l'Acte uniforme est défini par l'art. 1 avec une économie remarquable. Le critère est unique : le siège social. « Toute société commerciale, y compris celle dans laquelle un État ou une personne morale de droit public est associé, dont le siège social est situé sur le territoire de l'un des États parties » est soumise à l'Acte uniforme. La nationalité des associés ou des dirigeants, l'origine des capitaux et le lieu de l'activité sont indifférents : une SARL dont le siège est à Kinshasa relève de l'AUSCGIE même si tous ses associés sont étrangers et si elle exporte toute sa production. La mention des sociétés à participation publique a une importance particulière en RDC, où de nombreuses entreprises du portefeuille de l'État ont été transformées en sociétés commerciales : elles relèvent du même droit que les sociétés privées, sous réserve des textes propres aux sociétés soumises à un régime particulier (art. 916). Le GIE est également soumis à l'Acte uniforme (art. 1 al. 2)." },
      { type: 'paragraphe', texte: "Deux autres règles de l'art. 1 et de l'art. 2 organisent la cohabitation du droit uniforme avec les autres sources. D'une part, les sociétés et les GIE « demeurent soumis aux lois non contraires au présent Acte uniforme qui sont applicables dans l'État partie où se situe leur siège social » (art. 1 al. 3) : le droit fiscal, le droit du travail, le droit minier, la réglementation bancaire ou le droit pénal congolais continuent de s'appliquer, tant qu'ils ne contredisent pas l'Acte uniforme. D'autre part, les statuts ne peuvent déroger à l'Acte uniforme « sauf dans les cas où celui-ci autorise expressément » les associés soit à substituer des clauses statutaires à ses dispositions, soit à les compléter ; et « est réputée non écrite toute clause statutaire contraire » (art. 2). La plupart des règles de l'Acte uniforme sont donc impératives ; la liberté statutaire n'existe que là où le texte l'ouvre, par des formules comme « sauf clause contraire des statuts » ou « les statuts peuvent prévoir ». L'étudiant doit acquérir le réflexe de rechercher, pour chaque règle, si le texte laisse cette marge." },
      { type: 'paragraphe', texte: "L'art. 3 tire la conséquence de cette organisation : « Toutes personnes, quelle que soit leur nationalité, désirant exercer en société, une activité commerciale sur le territoire de l'un des États parties, doivent choisir l'une des formes de société qui convient à l'activité envisagée, parmi celles prévues par le présent Acte uniforme. » Il n'existe pas de forme sociale commerciale en dehors de celles que l'Acte énumère ; les associés peuvent aussi choisir de s'associer en GIE. Le droit congolais conserve toutefois des règles propres aux étrangers : l'ordonnance-loi n° 22/030 du 8 septembre 2022 relative à la promotion de l'entrepreneuriat et des startups, qui s'applique « à toute entreprise individuelle ou sociétaire, quels que soient sa forme juridique et son secteur d'activités » (art. 2), impose à l'étranger résidant en RDC, avant d'entamer une activité entrepreneuriale, d'en faire la déclaration auprès du Guichet unique de création d'entreprise ou, à défaut, au greffe du tribunal de commerce (art. 26). Ces règles ne créent pas de forme sociale nouvelle ; elles encadrent l'accès des personnes à l'activité, ce que l'art. 1 al. 3 autorise." },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[2] },
    ],
  },
  {
    numero: '1.2',
    titre: "La société, un contrat au service d'un intérêt commun (Art. 4, 12, 114-115, 854, 864-868)",
    navLabel: '1.2 La notion de société',
    blocs: [
      { type: 'filet', titre: "Article 4 AUSCGIE", texte: "« La société commerciale est créée par deux (2) ou plusieurs personnes qui conviennent, par un contrat, d'affecter à une activité des biens en numéraire ou en nature, ou de l'industrie, dans le but de partager le bénéfice ou de profiter de l'économie qui peut en résulter. Les associés s'engagent à contribuer aux pertes dans les conditions prévues par le présent Acte uniforme. La société commerciale est créée dans l'intérêt commun des associés. »" },
      { type: 'paragraphe', texte: "Cette définition fait de la société, d'abord, un contrat. Les associés « conviennent, par un contrat » : la société naît d'un accord de volontés, soumis comme tout contrat aux conditions de validité du droit commun (consentement, capacité, objet, cause), sous réserve du régime propre des nullités étudié à la section 1.10. L'art. 12 le confirme en qualifiant les statuts : ils constituent « soit le contrat de société, en cas de pluralité d'associés, soit l'acte de volonté d'une seule personne, en cas d'associé unique ». Mais la société n'est pas qu'un contrat. Dès son immatriculation, elle devient une personne juridique distincte de ses associés (art. 98), titulaire de son propre patrimoine, et son fonctionnement est largement réglé par des dispositions impératives que les associés ne peuvent écarter (art. 2). La doctrine décrit cette double nature en disant que la société est à la fois un contrat et une institution : contrat à sa naissance, institution dans son fonctionnement." },
      { type: 'paragraphe', texte: "De la définition se dégagent trois éléments constitutifs, que le juge recherche chaque fois qu'il doit qualifier une relation d'affaires. Le premier est l'apport : chaque associé « affecte à une activité » des biens en numéraire ou en nature, ou son industrie. L'art. 37 en fait une obligation (« Chaque associé doit faire un apport à la société ») et l'art. 40 en fixe la liste limitative. Le deuxième est la vocation aux résultats : les associés veulent « partager le bénéfice ou profiter de l'économie qui peut en résulter », et ils « s'engagent à contribuer aux pertes ». La mention de l'économie est importante : une société peut avoir pour but de faire réaliser des économies à ses membres, par exemple par des achats groupés, et non seulement de dégager un bénéfice distribuable. Le troisième élément n'est pas nommé par le texte, mais il en découle : c'est l'*affectio societatis*, la volonté de collaborer sur un pied d'égalité à une œuvre commune, en acceptant les aléas de l'entreprise." },
      { type: 'tableau', tableau: { entetes: ['Élément', 'Fondement', 'Ce qui le distingue d\'une figure voisine'], lignes: [
        ["Apport", "Art. 4, 37, 40", "Le prêteur remet des fonds mais reste créancier d'un remboursement et d'un intérêt ; l'associé renonce à ce droit pour recevoir des titres dont la valeur dépend du sort de la société"],
        ["Vocation aux bénéfices et aux pertes", "Art. 4, 53, 54", "Le salarié perçoit une rémunération indépendante des résultats ; l'associé n'a droit qu'à une part des bénéfices distribués et supporte les pertes"],
        ["Affectio societatis", "Art. 4 al. 2, 864", "Le salarié est subordonné ; le fournisseur ou le client défend son intérêt propre ; l'associé collabore à égalité dans l'intérêt commun"],
        ["Intérêt commun", "Art. 4 al. 2", "L'association poursuit un but autre que le partage de bénéfices ; l'indivision n'est pas un projet commun organisé mais une situation de concours de droits sur un même bien"],
      ] } },
      { type: 'paragraphe', texte: "L'alinéa 2 de l'art. 4, ajouté par la révision de 2014, donne à ces éléments leur orientation : la société est créée « dans l'intérêt commun des associés ». Cette formule n'est pas décorative. Elle signifie que la majorité, qui décide normalement pour tous, ne peut pas utiliser la société pour servir ses intérêts propres contre ceux de la minorité ; inversement, la minorité ne peut bloquer une décision nécessaire à la survie de la société dans le seul but de nuire. Les art. 130 et 131 organisent précisément la sanction de ces comportements : sont nulles les décisions constitutives d'un abus de majorité, prises par les majoritaires « dans leur seul intérêt, contrairement aux intérêts des associés minoritaires, sans que cette décision ne puisse être justifiée par l'intérêt de la société » (art. 130) ; et les minoritaires ou égalitaires qui s'opposent sans intérêt légitime à une décision nécessitée par l'intérêt de la société engagent leur responsabilité, le juge pouvant désigner un mandataire ad hoc pour voter en leur nom (art. 131). Ces règles seront étudiées avec le fonctionnement des sociétés. La notion d'intérêt commun des associés sert aussi de fil directeur au juge qui doit apprécier la validité d'une clause statutaire ou d'un pacte : une stipulation qui fait profiter un associé de la société au détriment des autres s'écarte de la finalité assignée par la loi." },
      { type: 'paragraphe', texte: "Le contrat de société n'est pas toujours formalisé, et l'Acte uniforme organise les situations dans lesquelles il existe sans être immatriculé. Il faut distinguer trois figures, que les étudiants confondent souvent. La société en participation est celle dans laquelle les associés conviennent qu'elle n'est pas immatriculée : elle n'a pas la personnalité morale, n'est pas soumise à publicité, et son existence peut être prouvée par tous moyens (art. 114 et 854). C'est un choix délibéré, fréquent pour des opérations ponctuelles, comme un consortium de chantier. La société créée de fait existe lorsque deux ou plusieurs personnes « se comportent comme des associés sans avoir constitué entre elles l'une des sociétés reconnues par le présent Acte uniforme » (art. 864) : personne n'a voulu créer de société, mais les comportements en révèlent une. La société de fait, enfin, est celle que les parties ont voulu constituer mais qui comporte un vice de formation non régularisé, ou qui a pris une forme non reconnue par l'Acte uniforme (art. 865)." },
      { type: 'carte', titre: "Sociétés sans immatriculation : les trois régimes", tableau: { entetes: ['Figure', 'Définition', 'Personnalité', 'Régime'], lignes: [
        ['Société en participation', "Les associés conviennent de ne pas l'immatriculer (art. 114, 854)", 'Non', "Art. 854 et s. ; preuve par tous moyens"],
        ['Société créée de fait', "Des personnes se comportent comme des associés sans avoir constitué de société (art. 864)", 'Non', "Reconnaissance judiciaire (art. 866) ; règles de la SNC (art. 868)"],
        ['Société de fait', "Société reconnue mais viciée non régularisée, ou forme non reconnue (art. 865)", 'Non', "Règles de la SNC une fois reconnue (art. 868)"],
        ['Société non écrite', "Contrat ou acte unilatéral non établi par écrit, donc non immatriculable (art. 115)", 'Non', "Renvoi aux art. 864 et s."],
      ] }, note: "Dans les trois dernières hypothèses, la reconnaissance judiciaire entraîne l'application aux associés des règles de la SNC : chacun répond indéfiniment et solidairement des dettes sociales. L'existence de la société créée de fait ou de fait « est prouvée par tout moyen » (art. 867), et tout intéressé peut en demander la reconnaissance (art. 866)." },
      { type: 'paragraphe', texte: "La portée pratique de la société créée de fait est considérable en RDC, où une part importante de l'activité économique se déroule dans l'informel. Deux frères qui exploitent ensemble un commerce à Kisangani, mettent en commun leurs économies, partagent les recettes et décident ensemble des achats ont, sans le savoir, constitué une société créée de fait. Le jour où ils se séparent, ou le jour où un créancier les poursuit, le juge peut reconnaître cette société et appliquer les règles de la SNC : responsabilité indéfinie et solidaire à l'égard des créanciers, et partage de l'actif selon les règles de la liquidation plutôt qu'appropriation par celui qui détient le fonds. Le juge recherche alors, par tous moyens, les trois éléments de l'art. 4 : des apports réels de chacun, une participation aux bénéfices et aux pertes, et une collaboration sur un pied d'égalité. La simple cohabitation, l'entraide familiale ou le prêt d'un local ne suffisent pas ; c'est la réunion des trois éléments qui caractérise la société. La leçon, pour le conseil d'entreprise, est de formaliser la société dès l'origine : la société créée de fait est la forme qui protège le moins ses membres." },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[27] },
    ],
  },
  {
    numero: '1.3',
    titre: "L'associé : pluralité, associé unique et capacité (Art. 5, 7-9, 60)",
    navLabel: "1.3 L'associé",
    blocs: [
      { type: 'paragraphe', texte: "La définition de l'art. 4 suppose deux associés au moins. L'art. 5 introduit l'exception : « La société commerciale peut être également créée, dans les cas prévus par le présent Acte uniforme, par une seule personne, dénommée « associé unique », par un acte écrit. » La règle est une exception, et l'Acte uniforme en donne la liste par forme. La SARL « peut être instituée par une personne physique ou morale, ou entre deux ou plusieurs personnes physiques ou morales » (art. 309 al. 2). La SA « peut ne comprendre qu'un seul actionnaire » (art. 385 al. 2). La SAS est « instituée par un ou plusieurs associés » ; lorsqu'elle ne comporte qu'une seule personne, celle-ci est dénommée associé unique et exerce les pouvoirs dévolus aux associés lorsque le texte prévoit une décision collective (art. 853-1), et la société prend la dénomination de société par actions simplifiée unipersonnelle, ou le sigle SASU (art. 853-2). En revanche, la SNC, dans laquelle « tous les associés sont commerçants », et la SCS, qui associe par définition des commandités et des commanditaires, supposent une pluralité d'associés." },
      { type: 'paragraphe', texte: "L'associé unique n'est pas un entrepreneur individuel déguisé : il crée une personne morale distincte de lui, titulaire de son propre patrimoine. C'est tout l'intérêt de la SARL unipersonnelle pour le commerçant congolais : ses biens personnels échappent, en principe, aux poursuites des créanciers de la société, alors que l'entrepreneur individuel répond de ses dettes professionnelles sur tout son patrimoine. Cette séparation a un prix : le respect du formalisme sociétaire. L'associé unique doit tenir la comptabilité de la société, distinguer ses dépenses personnelles de celles de la société, prendre ses décisions dans les formes prévues, et les publier lorsqu'elles donneraient lieu à publicité si elles avaient été prises par une assemblée, comme le rappelle expressément l'art. 853-1 al. 3 pour la SAS. La confusion des patrimoines, fréquente dans les petites entreprises, expose l'associé unique au risque d'être poursuivi personnellement lorsque la société sera en difficulté, sur le terrain de la responsabilité ou des procédures collectives." },
      { type: 'filet', titre: "Réunion de tous les titres en une seule main (Art. 60)", texte: "« Dans le cas des sociétés dont la forme unipersonnelle n'est pas autorisée par le présent Acte uniforme, la détention par un seul associé de tous les titres sociaux n'entraîne pas la dissolution de plein droit de la société. Tout intéressé peut demander à la juridiction compétente cette dissolution, si la situation n'a pas été régularisée dans le délai d'un (1) an. La juridiction compétente peut accorder à la société un délai maximal de six (6) mois pour régulariser la situation. Elle ne peut prononcer la dissolution si, au jour où elle statue sur le fond, cette régularisation a eu lieu. »" },
      { type: 'paragraphe', texte: "L'art. 60 règle le sort d'une société de personnes qui, en cours de vie, perd tous ses associés sauf un, par exemple à la suite du décès d'un associé de SNC dont les parts sont rachetées par l'autre. Le législateur a voulu sauver l'entreprise : la société ne disparaît pas automatiquement, elle dispose d'un an pour se régulariser, par l'entrée d'un nouvel associé ou par une transformation en SARL ou en SAS, formes qui admettent l'associé unique. Même au-delà de ce délai, la dissolution n'est pas automatique : il faut qu'un intéressé la demande, le juge peut encore accorder six mois, et il ne peut prononcer la dissolution si la régularisation est intervenue au jour où il statue. Ce mécanisme illustre une constante de l'Acte uniforme, que l'on retrouvera avec le régime des nullités : la préférence pour la régularisation plutôt que pour la disparition de la société, dans l'intérêt des salariés, des créanciers et de l'économie." },
      { type: 'paragraphe', texte: "Toute personne ne peut pas devenir associée de toute société. L'art. 7 écarte d'abord la personne physique ou morale qui « fait l'objet d'une interdiction, incapacité ou incompatibilité prévue par une disposition légale ou réglementaire ». Les interdictions visées sont celles des textes nationaux ou uniformes : interdiction d'exercer le commerce prononcée à titre de sanction, incompatibilités attachées à certaines fonctions publiques ou professions réglementées. Il faut soigneusement distinguer : l'incompatibilité avec la qualité de commerçant n'interdit pas d'être associé d'une SARL ou d'une SA, puisque l'associé de ces sociétés n'a pas la qualité de commerçant ; elle interdit en revanche d'être associé d'une SNC, dont « tous les associés sont commerçants » (art. 270), et, par l'effet du renvoi de l'art. 293-1 au régime de la SNC, d'être commandité d'une SCS. L'analyse doit donc toujours croiser le statut de la personne et la forme de la société." },
      { type: 'paragraphe', texte: "Les art. 8 et 9 protègent deux catégories de personnes contre les risques de la responsabilité illimitée. Selon l'art. 8, « les mineurs et les majeurs incapables ne peuvent être associés d'une société dans laquelle ils seraient tenus des dettes sociales au-delà de leurs apports ». Un mineur peut donc recevoir des parts de SARL ou des actions de SA par succession ou donation ; il ne peut pas être associé de SNC ni commandité de SCS. Selon l'art. 9, « des époux ne peuvent être associés d'une société dans laquelle ils seraient tenus des dettes sociales indéfiniment ou solidairement ». Le législateur a voulu éviter que la faillite de la société n'emporte d'un coup l'ensemble du patrimoine familial. La règle est précise : elle n'interdit pas aux époux d'être coassociés, elle leur interdit de l'être là où ils répondraient tous deux indéfiniment ou solidairement, c'est-à-dire dans la SNC, ou comme commandités d'une même SCS. Deux époux peuvent parfaitement constituer ensemble une SARL, une SA ou une SAS, ou être l'un commandité et l'autre commanditaire d'une SCS." },
      { type: 'carte', titre: "Qui peut être associé de quelle forme ?", tableau: { entetes: ['Personne', 'SNC', 'SCS', 'SARL', 'SA / SAS'], lignes: [
        ["Mineur ou majeur incapable (art. 8)", 'Non', 'Commanditaire seulement', 'Oui', 'Oui'],
        ["Deux époux ensemble (art. 9)", 'Non', "Pas tous deux commandités", 'Oui', 'Oui'],
        ["Personne frappée d'une interdiction d'exercer le commerce (art. 7)", 'Non (associés commerçants, art. 270)', "Pas comme commandité (régime de la SNC, art. 293-1)", "Oui, sauf interdiction spécifique", "Oui, sauf interdiction spécifique"],
        ["Personne morale", 'Oui', 'Oui', 'Oui (art. 309)', 'Oui'],
        ["Associé unique (art. 5)", 'Non', 'Non', 'Oui (art. 309 al. 2)', 'Oui (art. 385 al. 2, 853-1)'],
      ] }, note: "La violation des art. 7, 8 et 9 est sanctionnée par la nullité de la société (art. 74-1). Mais dans les SARL et les sociétés par actions, « la nullité de la société ne peut résulter ni d'un vice de consentement ni de l'incapacité d'un associé à moins que celle-ci n'atteigne tous les associés fondateurs » (art. 242 al. 3) : ces formes protègent davantage la stabilité de la personne morale." },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[6] },
    ],
  },
  {
    numero: '1.4',
    titre: "Les apports : numéraire, nature et industrie (Art. 37-50-4)",
    navLabel: '1.4 Les apports',
    blocs: [
      { type: 'paragraphe', texte: "L'apport est l'acte par lequel l'associé transfère à la société un bien ou met à sa disposition son activité, en contrepartie de titres sociaux. L'art. 37 en fait une obligation de chaque associé et un rapport de créance : « Chaque associé est débiteur envers la société de tout ce qu'il s'est obligé à lui apporter en numéraire, en nature ou en industrie. » La société peut donc poursuivre l'associé défaillant comme tout créancier. En contrepartie, les associés reçoivent des titres émis par la société (art. 38). Les règles des apports s'appliquent à la constitution comme aux apports réalisés au cours de la vie sociale, à l'occasion d'une augmentation de capital (art. 39). L'art. 40 fixe la liste des apports possibles et la ferme : l'associé peut apporter « de l'argent, par apport en numéraire », « des droits portant sur des biens en nature, mobiliers ou immobiliers, corporels ou incorporels, par apport en nature », ou « des connaissances techniques ou professionnelles ou des services, par apport en industrie ». Et le texte ajoute : « Tout autre apport est interdit. » La sanction est la plus sévère du droit des sociétés : la société constituée en violation de l'art. 40, comme celle où un associé ne fait aucun apport (art. 37 al. 1er), est nulle (art. 74-1)." },
      { type: 'paragraphe', texte: "L'apport en numéraire est réalisé « par le transfert à la société de la propriété des sommes d'argent que l'associé s'est engagé à lui apporter » (art. 41 al. 1). Le principe est la libération intégrale à la constitution, « sauf disposition contraire du présent Acte uniforme » (art. 41 al. 2) ; les deux principales dérogations concernent la SARL, où la moitié au moins doit être libérée à la souscription et le surplus dans les deux ans de l'immatriculation (art. 311-1), et la SA, où le quart au moins est libéré et le surplus dans un délai qui ne peut excéder trois ans (art. 389). La libération s'apprécie strictement : « Ne sont considérés comme libérés que les apports en numéraire correspondant à des sommes dont la société est devenue propriétaire et qu'elle a intégralement et définitivement encaissées » (art. 42). En cas de retard, les sommes dues portent de plein droit intérêt au taux légal à compter du jour où le versement devait être effectué, sans préjudice de dommages et intérêts (art. 43). Lors d'une augmentation de capital, et à moins que les statuts ne l'interdisent, l'apport en numéraire peut être réalisé par compensation avec une créance certaine, liquide et exigible sur la société (art. 44) : c'est le mécanisme de la conversion de créances en capital, fréquent lorsqu'un associé a financé la société par des avances en compte courant." },
      { type: 'paragraphe', texte: "L'apport en nature porte sur tout autre bien que de l'argent : un immeuble, un véhicule, un fonds de commerce, une marque, un brevet, un droit au bail, des créances. Il est réalisé « par le transfert des droits réels ou personnels correspondant aux biens apportés et par la mise à la disposition effective de la société des biens sur lesquels portent ces droits » ; et, contrairement au numéraire, il est toujours « libéré intégralement lors de la constitution de la société » (art. 45). L'associé peut apporter la propriété du bien ou seulement sa jouissance. Lorsque l'apport est en propriété, « l'apporteur est garant envers la société comme un vendeur envers son acheteur » (art. 46) : il doit la garantie d'éviction et la garantie des vices cachés. Lorsqu'il est en jouissance, il est garant « comme un bailleur envers son preneur » (art. 47) ; mais si l'apport en jouissance porte sur des choses de genre ou des biens normalement appelés à être renouvelés, comme un stock de marchandises, la société en devient propriétaire, à charge d'en rendre une pareille quantité, qualité et valeur, et l'apporteur est alors garant comme un vendeur. Lorsque le bien apporté est soumis à publicité pour être opposable aux tiers, comme un immeuble enregistré ou un fonds de commerce, la formalité peut être accomplie avant l'immatriculation, mais elle ne produit ses effets rétroactivement qu'à compter de l'immatriculation (art. 48)." },
      { type: 'paragraphe', texte: "L'évaluation des apports en nature est le point sensible de la constitution. Un apport surévalué gonfle artificiellement le capital, trompe les créanciers qui se fient à ce chiffre et lèse les apporteurs en numéraire, dont les parts représentent de l'argent réel. L'art. 49 pose le principe : « Les associés évaluent les apports en nature. Dans les cas prévus par le présent Acte uniforme, cette évaluation est contrôlée par un commissaire aux apports. » Dans la SARL, le contrôle est obligatoire dès que la valeur de l'apport considéré, ou de l'ensemble des apports en nature, est supérieure à cinq millions de FCFA, et il est toujours obligatoire pour les avantages particuliers (art. 312). Le commissaire aux apports est choisi sur la liste des commissaires aux comptes, désigné à l'unanimité des futurs associés ou, à défaut, par le juge ; il établit un rapport annexé aux statuts, qui décrit les apports, indique le mode d'évaluation retenu et atteste que la valeur des apports correspond au moins à la valeur nominale des parts à émettre. Surtout, lorsqu'il n'y a pas eu de commissaire ou que la valeur retenue diffère de celle qu'il a proposée, « les associés sont solidairement responsables pendant cinq (5) ans, à l'égard des tiers, de la valeur attribuée aux apports en nature » (art. 312). Dans la SA, le contrôle par un commissaire aux apports est systématique, quel que soit le montant (art. 400)." },
      { type: 'carte', titre: "L'apport en industrie depuis la révision de 2014 (Art. 50-1 à 50-4)", liste: [
        "**Définition (art. 50-1)** : l'apport est réalisé « par la mise à disposition effective de la société de connaissances techniques ou professionnelles ou de services ». Il est interdit dans les sociétés anonymes, et l'art. 389 le rappelle : « Les actions ne peuvent représenter des apports en industrie. »",
        "**Obligations de l'apporteur (art. 50-2)** : il « doit rendre à la société la contribution promise et lui doit compte de tous les gains qu'il a réalisés par l'activité faisant l'objet de son apport ». Les statuts décrivent l'apport, la durée des prestations, le nombre de titres attribués, leurs droits dans le partage des bénéfices et de l'actif net, et les modalités de liquidation des titres si l'apporteur cesse son activité.",
        "**Hors capital (art. 50-3 al. 1)** : l'apport en industrie ne concourt pas à la formation du capital social, mais donne lieu à des titres ouvrant droit au vote et au partage des bénéfices et de l'actif net, à charge de contribuer aux pertes.",
        "**Double plafond (art. 50-3 al. 2 et 3)** : les droits de vote attachés à ces titres ne peuvent dépasser 25 % de l'ensemble des droits de vote, et leur part totale ne peut excéder 25 % des bénéfices, de l'actif net et des pertes.",
        "**Titres personnels (art. 50-4)** : ils ne sont ni cessibles ni transmissibles et n'ont pas de valeur nominale.",
      ] },
      { type: 'paragraphe', texte: "L'apport en industrie répond à une situation fréquente dans les jeunes entreprises : un ingénieur, un informaticien ou un technicien expérimenté apporte son savoir-faire à des associés qui apportent l'argent. Pourquoi ne concourt-il pas au capital ? Parce que le capital est le gage des créanciers, et qu'un savoir-faire ne peut être saisi ni vendu pour les désintéresser ; l'inclure dans le capital afficherait une solidité fictive. Pourquoi le double plafond de 25 % ? Pour empêcher que l'apporteur en industrie, qui ne risque aucun bien, ne prenne le contrôle de la société au détriment de ceux qui ont risqué leur argent. Pourquoi des titres incessibles ? Parce que l'apport est attaché à la personne : si l'apporteur cessait son activité ou cédait ses titres, la contrepartie disparaîtrait. L'apporteur doit enfin compte à la société de tous les gains réalisés par l'activité faisant l'objet de son apport : l'ingénieur qui apporte son expertise en géologie minière ne peut pas conserver pour lui les honoraires de missions qu'il réaliserait à titre personnel dans ce même domaine." },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[16] },
    ],
  },
  {
    numero: '1.5',
    titre: "Les titres sociaux et les droits de l'associé (Art. 51-59)",
    navLabel: '1.5 Les titres sociaux',
    blocs: [
      { type: 'paragraphe', texte: "En contrepartie de ses apports, l'associé reçoit des titres sociaux. L'art. 51 les définit et les nomme : ils « représentent les droits des associés et sont dénommés actions dans les sociétés par actions et parts sociales dans les autres sociétés ». Les sociétés par actions sont la SA et la SAS ; la SNC, la SCS et la SARL émettent des parts sociales. Quelle que soit leur appellation, « les titres sociaux sont des biens meubles » (art. 52) : ils peuvent être donnés en garantie, saisis par les créanciers personnels de l'associé, recueillis dans une succession, et ils le sont même lorsque la société possède des immeubles. Ce caractère mobilier a des conséquences fiscales et successorales importantes, puisque l'associé ne détient pas directement les biens de la société mais un droit incorporel contre elle." },
      { type: 'filet', titre: "Article 53 AUSCGIE : les droits attachés aux titres", texte: "« Les titres sociaux confèrent à leur titulaire : 1°) un droit sur les bénéfices réalisés par la société lorsque leur distribution a été décidée ; 2°) un droit sur les actifs nets de la société lors de leur répartition, à sa dissolution ou à l'occasion d'une réduction de son capital ; 3°) le cas échéant, l'obligation de contribuer aux pertes sociales dans les conditions prévues pour chaque forme de société ; 4°) le droit de participer aux votes des décisions collectives des associés, à moins que le présent Acte uniforme en dispose autrement pour certaines catégories de titres sociaux. »" },
      { type: 'paragraphe', texte: "Chacun de ces droits appelle une précision. Le droit aux bénéfices n'existe que « lorsque leur distribution a été décidée » : l'associé n'a pas de droit acquis à percevoir un dividende chaque année, il a le droit de participer à la décision d'affecter le résultat et, si une distribution est votée, d'en recevoir sa part. Le droit sur l'actif net s'exerce à la dissolution, lorsqu'après paiement des dettes il reste un boni de liquidation, ou lors d'une réduction de capital par remboursement. L'obligation de contribuer aux pertes s'exerce « dans les conditions prévues pour chaque forme » : dans la SARL ou la SA, elle se limite à la perte des apports ; dans la SNC, elle s'étend aux dettes sociales. Le droit de vote, enfin, est le droit politique de l'associé ; il ne peut être supprimé que par l'Acte uniforme lui-même, pour certaines catégories de titres comme les actions de préférence sans droit de vote étudiées avec la SA. L'art. 55 verrouille l'ensemble : ces droits « ne peuvent être suspendus ou supprimés que par des dispositions expresses du présent Acte uniforme »." },
      { type: 'paragraphe', texte: "L'art. 54 fixe la mesure de ces droits : « Sauf clause contraire des statuts ou dispositions contraires du présent Acte uniforme, les droits et l'obligation de chaque associé [...] sont proportionnels à ses apports, qu'ils soient faits lors de la constitution de la société ou au cours de la vie sociale. » La proportionnalité est la règle supplétive : les statuts peuvent l'aménager, en prévoyant par exemple un dividende prioritaire au profit de l'associé qui a apporté la technologie, ou une répartition inégale du boni. Mais cette liberté a une limite absolue, posée par l'alinéa 2 : « sont réputées non écrites les clauses attribuant à un associé la totalité du profit procuré par la société ou l'exonérant de la totalité des pertes, ainsi que celles excluant un associé totalement du profit ou mettant à sa charge la totalité des pertes. » Ce sont les clauses dites léonines, du nom de la fable où le lion s'attribue toutes les parts. Elles contredisent l'essence même du contrat de société, qui suppose que chacun court la chance du gain et le risque de la perte. La sanction est la même que celle de l'art. 2 : la clause disparaît, la société demeure." },
      { type: 'carte', titre: "Ce que les statuts peuvent et ne peuvent pas faire", tableau: { entetes: ['Stipulation', 'Validité', 'Fondement'], lignes: [
        ["Répartition des bénéfices 60/40 alors que les apports sont 50/50", "Valable : aménagement de la proportionnalité", "Art. 54 al. 1 (sauf clause contraire)"],
        ["Dividende prioritaire de 8 % du nominal avant toute autre répartition", "Valable s'il n'aboutit pas à priver les autres de tout profit", "Art. 54 al. 1 ; avantage particulier mentionné aux statuts (art. 13, 9°)"],
        ["Associé exonéré de toute perte", "Réputée non écrite", "Art. 54 al. 2"],
        ["Intérêt fixe garanti même en l'absence de bénéfice", "Réputée non écrite dans ses effets : elle revient à exonérer l'associé des pertes", "Art. 4, 53, 54 al. 2"],
        ["Associé privé de tout droit de vote hors cas prévu par l'Acte uniforme", "Réputée non écrite", "Art. 53, 4° et 55"],
      ] } },
      { type: 'paragraphe', texte: "Les titres de même catégorie émis par une société ont la même valeur nominale (art. 56). Leur circulation dépend de la forme sociale : « Les parts sociales sont cessibles. Les actions sont cessibles ou négociables » (art. 57). La différence est technique mais essentielle : la cession d'une part sociale obéit au droit civil de la cession de créance et aux conditions d'agrément propres à chaque forme, tandis que la négociation d'une action se fait par simple virement de compte à compte, sans formalité à l'égard de la société. L'art. 58 en tire une règle de police : seules les sociétés par actions émettent des titres négociables ; « l'émission de ces titres est interdite pour les sociétés autres » et il leur est « également interdit de garantir une émission de titres négociables ». La sanction est radicale : « Sont nuls tous contrats conclus, titres émis ou garanties accordées en violation des dispositions du présent alinéa. » Une SARL qui voudrait se financer en émettant des obligations devra donc d'abord se transformer en SA ou en SAS." },
      { type: 'paragraphe', texte: "Reste une question pratique qui revient à chaque départ d'associé : quelle est la valeur de ses titres ? L'art. 59 y répond pour tous les cas où l'Acte uniforme prévoit une cession forcée ou un rachat par la société : la valeur est déterminée, « à défaut d'accord amiable entre les parties, par expert désigné, soit par les parties, soit à défaut d'accord entre elles, par décision de la juridiction compétente statuant à bref délai ». La règle protège l'associé sortant contre une évaluation imposée par la majorité, et la société contre des prétentions excessives. En pratique, l'expert retient des méthodes de valorisation reconnues, patrimoniales, de rendement ou de flux, qui relèvent de l'évaluation financière étudiée en comptabilité des sociétés ; le juriste doit simplement savoir que, faute d'accord, c'est la voie de l'expertise qui s'impose." },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[14] },
    ],
  },
  {
    numero: '1.6',
    titre: "Le capital social : notion, montant et variations (Art. 61-72, 269-1)",
    navLabel: '1.6 Le capital social',
    blocs: [
      { type: 'paragraphe', texte: "« Toute société doit avoir un capital social qui est indiqué dans ses statuts » (art. 61). Le capital « représente le montant des apports en capital faits par les associés à la société » et augmente, le cas échéant, des incorporations de réserves, de bénéfices ou de primes d'apport, d'émission ou de fusion (art. 62). Il se divise en parts sociales ou en actions selon la forme (art. 64), et les titres émis en contrepartie des apports ont une valeur égale à celle des apports (art. 63). Le capital n'est pas une somme d'argent conservée dans un coffre : c'est un chiffre, inscrit au passif du bilan, qui mesure ce que les associés ont engagé et que la société ne peut leur restituer librement. Sa fonction première est la protection des créanciers : tant que le capital n'est pas réduit selon les formes légales, l'actif correspondant ne peut être distribué aux associés, ce qui garantit aux créanciers un minimum de consistance patrimoniale. C'est le sens de la règle, étudiée avec l'affectation du résultat, selon laquelle un dividende ne peut être prélevé que sur le bénéfice distribuable, jamais sur le capital." },
      { type: 'paragraphe', texte: "Le montant du capital « est librement déterminé par les associés », mais l'Acte uniforme « peut fixer un capital social minimum en raison de la forme ou de l'objet de la société » (art. 65). Il le fait pour la SA, dont le capital minimum est de dix millions de FCFA (art. 387), porté à cent millions pour la société dont les titres sont inscrits à une bourse des valeurs ou qui fait publiquement appel à l'épargne (art. 824) ; et pour la SARL, un million de FCFA, « sauf dispositions nationales contraires » (art. 311). La sanction du minimum est double : si le capital de la société en formation n'atteint pas le minimum, la société ne peut être valablement constituée ; et si, après la constitution, le capital est réduit en dessous du minimum, la société doit être dissoute, à moins que le capital ne soit reporté à un montant au moins égal au minimum (art. 66). La SNC, la SCS et la SAS n'ont pas de capital minimum : pour la SAS, l'art. 853-3 écarte expressément l'application de l'art. 387 al. 1er." },
      { type: 'filet', titre: "Le choix congolais : un capital de SARL librement fixé", texte: "Usant de la réserve de l'art. 311, la RDC a adopté l'arrêté interministériel n° 002/CAB/MIN/JGS&DH/014 et n° 243/CAB/MIN/FINANCES/2014 du 30 décembre 2014 déterminant la forme des statuts et le capital social de la SARL. Son art. 2 dispose : « Le capital social de la Société à Responsabilité Limitée unipersonnelle ou pluripersonnelle est librement fixé par les associés en tenant compte de l'objet social de la société. » Son art. 1 permet d'établir les statuts « par acte notarié ou par acte sous seing privé », et son art. 3 admet que les fonds soient logés dans un établissement de crédit ou dans une institution de microfinance agréée, « le bordereau de versement dûment acquitté » valant preuve de la libération et du dépôt des fonds." },
      { type: 'paragraphe', texte: "La formule de l'arrêté mérite attention : le capital est libre, mais il doit être fixé « en tenant compte de l'objet social ». Ce n'est pas une invitation à constituer des SARL au capital symbolique. Un capital manifestement dérisoire au regard de l'activité projetée, par exemple une SARL de travaux publics au capital de quelques dollars, expose la société à des difficultés concrètes : les banques refusent le crédit, les donneurs d'ordre publics et privés exigent des garanties, et les tiers peuvent y voir l'indice d'une sous-capitalisation fautive susceptible d'engager la responsabilité des fondateurs en cas de défaillance. La doctrine a souligné que le capital social, même affaibli dans son rôle traditionnel de gage des créanciers par la suppression des minima, reste en droit OHADA un instrument de détection et de mesure des difficultés : c'est notamment par rapport à la moitié du capital que s'apprécie la perte des capitaux propres qui oblige à consulter les associés, dans les quatre mois de l'approbation des comptes, sur la dissolution anticipée de la société (art. 371 pour la SARL, art. 664 pour la SA ; G. R. Lanou, Revue de l'ERSUMA, 2019). Un capital trop faible fait jouer ce signal dès les premières pertes." },
      { type: 'paragraphe', texte: "Le capital est en principe fixe : il ne peut être augmenté ou réduit qu'aux conditions de modification des statuts propres à chaque forme (art. 67 al. 1). L'augmentation se fait par nouveaux apports ou par incorporation de réserves, de bénéfices ou de primes (art. 68), l'incorporation se traduisant par l'émission de titres nouveaux ou l'élévation du nominal des titres existants, les deux procédés pouvant être combinés (art. 63 al. 2). La réduction se fait par remboursement aux associés d'une partie de leurs apports, en numéraire ou par attribution d'actifs, ou par imputation des pertes (art. 69 et 70), toujours sous le contrôle des règles du minimum (art. 71). Le principe de fixité connaît une exception introduite en 2014 : les statuts des SA ne faisant pas appel public à l'épargne et des SAS peuvent stipuler que le capital est variable, susceptible d'augmentation par des versements successifs ou l'admission d'associés nouveaux et de diminution par la reprise totale ou partielle des apports (art. 269-1). La société doit alors ajouter à sa forme les mots « à capital variable » sur tous ses documents (art. 269-2), et ses statuts organisent les modalités de souscription, de libération et de reprise des apports (art. 269-2-1)." },
      { type: 'filet', titre: "Le verrou de l'Article 72", texte: "« Les statuts peuvent être modifiés, dans les conditions prévues par le présent Acte uniforme, pour chaque forme de société. En aucun cas, les engagements d'un associé ne peuvent être augmentés sans le consentement de celui-ci. » Aucune majorité, si large soit-elle, ne peut imposer à un associé un apport supplémentaire, une garantie nouvelle ou le passage d'une responsabilité limitée à une responsabilité illimitée. C'est pourquoi la transformation d'une SARL en SNC exige l'accord de chacun des associés qui deviendraient tenus indéfiniment." },
      { type: 'controle', question: QCM[25] },
    ],
  },
  {
    numero: '1.7',
    titre: "Les statuts : forme, mentions, dénomination, objet, siège et durée (Art. 10-36)",
    navLabel: '1.7 Les statuts',
    blocs: [
      { type: 'paragraphe', texte: "Les statuts sont l'acte fondateur de la société et sa charte de fonctionnement. Leur forme est fixée par l'art. 10 : « Sauf dispositions nationales contraires, les statuts sont établis par acte notarié ou par tout acte offrant des garanties d'authenticité dans l'État du siège de la société déposé avec reconnaissance d'écritures et de signatures par toutes les parties au rang des minutes d'un notaire. Ils ne peuvent être modifiés qu'en la même forme. » La réserve initiale est celle qu'a utilisée la RDC pour la SARL : l'arrêté du 30 décembre 2014 permet d'établir les statuts de la SARL par acte sous seing privé. Lorsque les statuts sont sous seing privé, il en est dressé autant d'originaux que nécessaire pour le dépôt au siège et l'accomplissement des formalités ; un original est remis à chaque associé dans la SNC, la SCS et la SARL, et, dans les autres sociétés, aux associés qui l'ont demandé (art. 11). Une copie des statuts est toujours tenue à la disposition des associés par la société." },
      { type: 'carte', titre: "Les treize mentions obligatoires des statuts (Art. 13)", liste: [
        "1° la forme de la société ; 2° sa dénomination suivie, le cas échéant, de son sigle ; 3° la nature et le domaine de son activité, qui forment son objet social ; 4° son siège social ; 5° sa durée ;",
        "6° l'identité des apporteurs en numéraire, le montant de leurs apports, le nombre et la valeur des titres reçus ; 7° l'identité des apporteurs en nature, la nature et l'évaluation de leur apport, le nombre et la valeur des titres reçus ; 8° l'identité des apporteurs en industrie, la nature et la durée de leurs prestations, le nombre et la valeur des titres reçus ;",
        "9° l'identité des bénéficiaires d'avantages particuliers et la nature de ceux-ci ; 10° le montant du capital social ; 11° le nombre et la valeur des titres émis, en distinguant le cas échéant les différentes catégories ;",
        "12° les clauses relatives à la répartition du résultat, à la constitution des réserves et à la répartition du boni de liquidation ; 13° les modalités de son fonctionnement.",
      ], note: "L'omission d'une mention n'entraîne pas la nullité : elle ouvre à tout intéressé et au ministère public une action en régularisation sous astreinte (art. 75), et engage la responsabilité solidaire des fondateurs et premiers dirigeants (art. 78)." },
      { type: 'paragraphe', texte: "La dénomination sociale est le nom de la société. Toute société en a une, mentionnée dans les statuts (art. 14) ; elle peut inclure le nom d'un ou plusieurs associés ou anciens associés, sauf disposition contraire (art. 15), mais elle ne peut reprendre la dénomination d'une société déjà immatriculée au RCCM (art. 16). C'est la raison pour laquelle la vérification de la dénomination est la première étape de la procédure au guichet unique. L'art. 17 impose une transparence précieuse pour les tiers : la dénomination doit figurer sur tous les actes et documents destinés aux tiers, notamment les lettres, factures, annonces et publications, précédée ou suivie immédiatement, en caractères lisibles, de la forme de la société, du montant de son capital, de l'adresse de son siège et de son numéro RCCM. Chaque forme ajoute sa propre mention : « société à responsabilité limitée » ou « SARL » (art. 310), « société anonyme » ou « SA » suivie du mode d'administration (art. 386), « SAS » ou « SASU » (art. 853-2). Une facture congolaise qui porte seulement « Établissements Mbala » sans forme, capital ni RCCM méconnaît ces dispositions." },
      { type: 'paragraphe', texte: "L'objet social est l'activité que la société entreprend ; il doit être « déterminé et décrit » dans les statuts (art. 19). Il remplit deux fonctions. Il délimite d'abord le champ de l'activité, ce qui a des conséquences sur les pouvoirs des dirigeants selon les formes sociales, étudiées au chapitre consacré au fonctionnement. Il conditionne ensuite la validité de la société : « Toute société doit avoir un objet licite » (art. 20), et la violation de cette règle entraîne la nullité de la société (art. 74-1), nullité que, contrairement aux autres, aucune régularisation ne peut couvrir (art. 246). Lorsque l'activité est réglementée, la société doit se conformer aux règles particulières qui la régissent (art. 21) : banque, assurance, microfinance, mines, hydrocarbures, pharmacie, transport aérien, télécommunications. En RDC, ces activités exigent un agrément, une licence ou un titre délivré par l'autorité sectorielle, avant tout démarrage de l'activité et souvent avant même la constitution." },
      { type: 'paragraphe', texte: "Le siège social est le domicile de la société. Il est fixé, au choix des associés, « soit au lieu du principal établissement de la société, soit à son centre de direction administrative et financière » (art. 24). Il ne peut être constitué « uniquement par une domiciliation à une boite postale » et doit être localisé par une adresse ou une indication géographique suffisamment précise (art. 25), exigence concrète dans des villes où l'adressage est parfois incomplet. L'art. 26 protège les tiers contre les sièges fictifs : ils « peuvent se prévaloir du siège statutaire, mais celui-ci ne leur est pas opposable par la société si le siège réel est situé en un autre lieu ». Le siège détermine l'application de l'AUSCGIE (art. 1), la juridiction compétente, le greffe du RCCM et, souvent, le rattachement fiscal. Il se modifie aux conditions de modification des statuts, mais peut être transféré dans la même ville par simple décision des organes de gérance ou d'administration (art. 27)." },
      { type: 'paragraphe', texte: "Toute société a enfin une durée, mentionnée dans les statuts, qui « ne peut excéder quatre-vingt-dix-neuf ans » (art. 28) et qui court de l'immatriculation au RCCM (art. 29). La limitation est une règle d'ordre public : elle interdit les engagements perpétuels et garantit aux associés qu'une échéance obligera un jour à reconsidérer le pacte. L'arrivée du terme entraîne la dissolution de plein droit, à moins que la prorogation n'ait été décidée (art. 30). La prorogation peut être décidée une ou plusieurs fois, aux conditions de modification des statuts (art. 32 et 33), et elle n'entraîne pas la création d'une personne juridique nouvelle (art. 34) : les contrats, les dettes, les autorisations administratives se poursuivent. Pour éviter qu'une société ne disparaisse par négligence, « un (1) an au moins avant la date d'expiration de la durée de la société, les associés doivent être consultés » sur la prorogation (art. 35) ; à défaut, tout associé peut demander au juge du siège, statuant à bref délai, la désignation d'un mandataire ad hoc chargé de provoquer cette consultation (art. 36)." },
      { type: 'controle', question: QCM[17] },
      { type: 'controle', question: QCM[18] },
      { type: 'controle', question: QCM[19] },
    ],
  },
  {
    numero: '1.8',
    titre: "Les formes sociales, la commercialité et les établissements secondaires (Art. 6, 116-120-5)",
    navLabel: '1.8 Formes et établissements',
    blocs: [
      { type: 'paragraphe', texte: "L'art. 6 pose la règle de la commercialité : « Le caractère commercial d'une société est déterminé par sa forme ou par son objet. Sont commerciales à raison de leur forme et quel que soit leur objet, les sociétés en nom collectif, les sociétés en commandite simple, les sociétés à responsabilité limitée, les sociétés anonymes et les sociétés par actions simplifiées. » Une SARL qui exerce une activité de conseil, d'enseignement ou d'agriculture, activités civiles par nature, est donc commerciale par sa forme : elle relève de l'AUSCGIE, de l'immatriculation au RCCM, des juridictions commerciales et du droit des procédures collectives. La commercialité par l'objet vise les sociétés qui, sans avoir l'une des cinq formes, exercent une activité commerciale, hypothèse qui correspond notamment à la société créée de fait entre commerçants." },
      { type: 'carte', titre: "Les cinq formes sociales (approfondies aux chapitres 3 à 6)", tableau: { entetes: ['Forme', 'Définition légale', 'Responsabilité', 'Capital minimum', 'Associés'], lignes: [
        ['SNC', "Tous les associés sont commerçants et répondent indéfiniment et solidairement des dettes sociales (art. 270)", 'Indéfinie et solidaire', 'Aucun', 'Deux au moins'],
        ['SCS', "Coexistence d'associés commandités indéfiniment et solidairement responsables et d'associés commanditaires responsables dans la limite de leurs apports ; capital divisé en parts sociales (art. 293)", 'Mixte', 'Aucun', 'Un commandité et un commanditaire au moins'],
        ['SARL', "Associés responsables des dettes sociales à concurrence de leurs apports ; droits représentés par des parts sociales (art. 309)", 'Limitée aux apports', "1 000 000 FCFA sauf dispositions nationales contraires (art. 311) ; libre en RDC", 'Un ou plusieurs'],
        ['SA', "Actionnaires responsables à concurrence de leurs apports ; droits représentés par des actions (art. 385)", 'Limitée aux apports', "10 000 000 FCFA (art. 387) ; 100 000 000 FCFA si cotée ou appel public à l'épargne (art. 824)", 'Un ou plusieurs'],
        ['SAS', "Statuts prévoyant librement l'organisation et le fonctionnement, sous réserve des règles impératives ; associés responsables à concurrence de leurs apports (art. 853-1)", 'Limitée aux apports', 'Aucun (art. 853-3 écarte l\'art. 387 al. 1er)', 'Un ou plusieurs'],
      ] }, note: "Le GIE (art. 869 et s.) n'est pas une société : c'est un groupement destiné à faciliter ou développer l'activité de ses membres, étudié au chapitre 6. La SAS « ne peut faire publiquement appel à l'épargne » (art. 853-4)." },
      { type: 'paragraphe', texte: "Le choix de la forme est la première décision du créateur, et il obéit à quelques critères simples. La protection du patrimoine personnel oriente vers la SARL, la SA ou la SAS, où la responsabilité est limitée aux apports. La simplicité et le faible coût orientent vers la SARL, dont le capital est libre en RDC et dont le fonctionnement est encadré par des règles éprouvées. Le besoin d'une gouvernance sur mesure, par exemple pour organiser l'entrée d'investisseurs avec des droits particuliers, oriente vers la SAS, dont les statuts fixent librement l'organisation. Le projet d'une entreprise de grande taille, appelée à lever des capitaux importants ou à s'introduire en bourse, oriente vers la SA, seule forme ouverte à l'appel public à l'épargne. La SNC convient à des associés qui se connaissent et se font entièrement confiance, souvent dans un cadre familial, au prix d'une responsabilité illimitée qui en fait une forme rare en pratique ; la SCS permet d'associer des financeurs passifs, les commanditaires, à des gestionnaires engagés, les commandités. La classification doctrinale traditionnelle oppose les sociétés de personnes, fondées sur la considération de la personne des associés, et les sociétés de capitaux, fondées sur l'apport financier, la SARL occupant une position intermédiaire." },
      { type: 'paragraphe', texte: "Une société implantée dans un État partie peut y exercer son activité sans créer de filiale, par un établissement secondaire. La succursale est « un établissement commercial ou industriel ou de prestations de services, appartenant à une société ou à une personne physique et doté d'une certaine autonomie de gestion » (art. 116). Elle n'a pas de personnalité juridique distincte : les droits et obligations nés de son activité sont compris dans le patrimoine de la société qui la possède (art. 117). Elle peut appartenir à une société étrangère, et elle est alors soumise au droit de l'État partie où elle est située (art. 118) ; elle est immatriculée au RCCM (art. 119). La règle la plus importante est celle de l'art. 120 : quand elle appartient à une personne étrangère, la succursale doit être apportée à une société de droit d'un État partie, préexistante ou à créer, deux ans au plus tard après sa création, sauf dispense par arrêté du ministre chargé du commerce, accordée pour deux ans non renouvelables. À défaut, le greffier procède à la radiation de la succursale après décision de la juridiction compétente. L'Acte uniforme pousse ainsi les investisseurs étrangers à filialiser leur activité durable." },
      { type: 'paragraphe', texte: "Le bureau de représentation ou de liaison, créé en 2014, est un établissement plus léger : il est « chargé de faire le lien entre » la société qui l'a créé « et le marché de l'État partie dans lequel il se situe », n'est pas doté d'une autonomie de gestion et « n'exerce qu'une activité préparatoire ou auxiliaire » (art. 120-1). Il n'a pas de personnalité juridique (art. 120-2), peut appartenir à une société étrangère et est soumis au droit de l'État où il est situé (art. 120-3), et il est immatriculé au RCCM (art. 120-4). Il ne peut pas conclure d'opérations commerciales pour son propre compte : dès que son activité le justifie, il doit être transformé en succursale, par une demande de rectification au RCCM formulée dans les trente jours suivant ce changement de situation, sous peine de radiation (art. 120-5). Le praticien congolais rencontre souvent ces bureaux dans les secteurs minier et pétrolier, où des groupes étrangers prospectent le marché avant d'investir." },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[29] },
    ],
  },
  {
    numero: '1.9',
    titre: "De la signature des statuts à la personnalité juridique : formation, immatriculation, publicité et guichet unique (Art. 73-74, 97-113, 256-1-262)",
    navLabel: '1.9 Naître à la vie juridique',
    blocs: [
      { type: 'paragraphe', texte: "La naissance d'une société se déroule en trois temps que l'Acte uniforme distingue soigneusement. La société est d'abord « en formation lorsqu'elle n'est pas encore constituée » (art. 100). Elle est ensuite « constituée à compter de la signature de ses statuts ou, le cas échéant, de leur adoption par l'assemblée générale constitutive » (art. 101 al. 1). Elle ne « jouit de la personnalité juridique » qu'à compter de son immatriculation au RCCM (art. 98), obligatoire pour toute société à l'exception de la société en participation (art. 97). Entre la constitution et l'immatriculation, « l'existence de la société n'est pas opposable aux tiers. Néanmoins, ceux-ci peuvent s'en prévaloir » (art. 101 al. 2), et les rapports entre associés sont régis par le contrat de société et par les règles générales des contrats et des obligations (art. 105). La personnalité juridique, une fois acquise, survit aux changements : la transformation régulière de la société, la prorogation de sa durée ou toute autre modification statutaire n'entraîne pas la création d'une personne juridique nouvelle (art. 99)." },
      { type: 'paragraphe', texte: "Pendant la période de formation, les fondateurs agissent. Sont qualifiées de fondateurs « toutes les personnes qui participent activement aux opérations conduisant à la constitution de la société » ; leur rôle commence dès les premiers actes en vue de la constitution et prend fin dès que les statuts ont été signés par tous les associés ou adoptés par l'assemblée constitutive (art. 102). Ils doivent être domiciliés sur le territoire d'un État partie, par une adresse précise et non une simple boîte postale (art. 103). À la signature des statuts, les dirigeants sociaux se substituent à eux et agissent au nom de la société constituée et non encore immatriculée (art. 104). Or une société en formation a des besoins immédiats : louer un local, commander du matériel, ouvrir un compte, recruter. Qui est engagé par ces actes, alors que la société n'a pas encore de personnalité ? L'Acte uniforme organise un mécanisme de reprise." },
      { type: 'carte', titre: "La reprise des engagements pris avant l'immatriculation", tableau: { entetes: ['Période et situation', 'Mode de reprise', 'Article'], lignes: [
        ["Avant la constitution : actes des fondateurs pour la société en formation", "Portés à la connaissance des associés dans un « état des actes et engagements accomplis pour le compte de la société en formation », indiquant la nature et la portée de chaque obligation", 'Art. 106'],
        ["Société constituée sans assemblée constitutive", "L'état est annexé aux statuts ; leur signature emporte reprise dès l'immatriculation", 'Art. 107'],
        ["Reprise après la constitution", "Approbation par l'assemblée générale ordinaire, pleinement informée ; les auteurs des actes ne votent pas et leurs voix ne comptent ni pour le quorum ni pour la majorité", 'Art. 108'],
        ["Société constituée avec assemblée constitutive", "Résolution spéciale de l'assemblée constitutive", 'Art. 109'],
        ["Entre constitution et immatriculation : actes des dirigeants mandatés", "Mandat donné dans les statuts, par acte séparé ou en assemblée constitutive pour des engagements déterminés ; l'immatriculation emporte reprise", 'Art. 111'],
        ["Actes excédant le mandat ou étrangers à lui", "Approbation par l'assemblée générale ordinaire, les associés auteurs ne votant pas", 'Art. 112, 113'],
      ] }, note: "Effet de la reprise (art. 110) : les actes repris sont « réputés avoir été contractés par celle-ci dès l'origine ». À défaut de reprise, ils sont inopposables à la société, et « les personnes qui les ont souscrits sont tenues solidairement et indéfiniment par les obligations qu'ils comportent »." },
      { type: 'paragraphe', texte: "L'immatriculation suppose un contrôle préalable de la régularité de la constitution. Les fondateurs et les premiers membres des organes de gestion, d'administration et de direction déposent au RCCM une « déclaration de régularité et de conformité », dans laquelle ils indiquent toutes les opérations effectuées pour constituer régulièrement la société et attestent que cette constitution a été réalisée conformément à l'Acte uniforme ; elle est exigée « à peine de rejet de la demande d'immatriculation » (art. 73). La déclaration est signée par ses auteurs, ou par certains d'entre eux mandatés à cet effet ; elle est de nouveau requise en cas de modification des statuts (art. 73-1 et 76). Elle n'est pas nécessaire lorsqu'une déclaration notariée de souscription et de versement des fonds a été établie et déposée (art. 74), comme c'est le cas dans la SA. Après l'immatriculation, la publicité informe les tiers : dans les quinze jours, un avis est inséré dans un journal habilité à recevoir les annonces légales (art. 261). Cet avis, signé par le notaire ou par les fondateurs, contient les mentions communes de l'art. 257-1 (dénomination, forme, capital, siège, numéro RCCM) et celles de l'art. 262 : objet sommairement indiqué, durée, montant des apports en numéraire et en nature, nombre de titres émis en contrepartie de chaque catégorie d'apports, identité des associés tenus indéfiniment, des premiers dirigeants et commissaires aux comptes, références du dépôt et de l'immatriculation, partie libérée du capital et avantages particuliers. Les formalités peuvent être accomplies par voie électronique (art. 256-1)." },
      { type: 'filet', titre: "Le Guichet unique de création d'entreprise (décret n° 14/014 du 8 mai 2014)", texte: "Le décret crée « un service public doté de l'autonomie administrative et financière dénommé « Guichet Unique de Création d'Entreprise » ; « GUCE » en sigle » (art. 1), placé sous l'autorité du ministère de la Justice (art. 2), qui exerce sur tout le territoire « toutes les missions relatives à la création d'entreprise, aux inscriptions modificatives et aux formalités de radiation de l'immatriculation des personnes physiques ou morales » (art. 4). La demande se fait par un formulaire unique (art. 17), et « toutes les formalités de Création d'Entreprise au Guichet Unique de Création d'Entreprise s'accomplissent dans un délai qui ne peut dépasser trois jours ouvrables, à partir de la réception du dossier complet » (art. 18). Nul ne peut exiger plus de frais que ceux prévus par les textes, sous peine d'actions disciplinaire ou pénale (art. 22). Là où le GUCE n'est pas installé, le greffe du tribunal de commerce ou du tribunal de grande instance en fait office (art. 29)." },
      { type: 'carte', titre: "La procédure de création d'une personne morale au GUCE (art. 16, B, du décret n° 14/014)", liste: [
        "1. Vérification de la dénomination sociale.",
        "2. Vérification de la preuve du dépôt, dans un compte bancaire, des apports en numéraire des associés.",
        "3. Authentification des statuts (étape que l'arrêté du 30 décembre 2014 a rendue facultative pour la SARL, dont les statuts peuvent être sous seing privé).",
        "4. Immatriculation au Registre du commerce et du crédit mobilier : naissance de la personnalité juridique (art. 98 AUSCGIE).",
        "5. Attribution du numéro d'identification nationale.",
        "6. Publication des actes de société au Journal officiel de la RDC et sur le site web du Guichet unique.",
        "7. Attribution du numéro d'impôt.",
        "8. Attribution du numéro d'affiliation à l'Institut national de sécurité sociale (aujourd'hui la CNSS).",
        "9. Déclaration à l'Office national de l'emploi et à l'Inspection générale du travail.",
        "10. Demande du permis d'exploitation et dépôt de la déclaration d'une installation classée.",
        "11. Demande d'immatriculation à l'Institut national de préparation professionnelle.",
      ], note: "Dix services étatiques interviennent (art. 9) ; trois siègent au sein du GUCE par leurs délégués : l'Office notarial, le greffe du RCCM et le centre d'ordonnancement de l'administration des recettes non fiscales. L'art. 20 dispose que « la publication sur le web du Guichet Unique de Création d'Entreprise des actes de sociétés vaut publication légale »." },
      { type: 'paragraphe', texte: "L'articulation entre le décret congolais et l'Acte uniforme appelle une remarque de méthode. L'art. 261 AUSCGIE exige l'insertion de l'avis dans « un journal habilité à recevoir les annonces légales », et l'art. 257 énumère les supports habilités : le journal officiel, les journaux habilités par les autorités compétentes, le Bulletin national des RCCM, et certains quotidiens nationaux d'information générale. Le décret prévoit, lui, la publication au Journal officiel de la RDC et sur le site du GUCE, et donne à cette dernière valeur de publication légale. Dans la hiérarchie des normes, l'Acte uniforme prime le décret national ; la publication au Journal officiel satisfait sans difficulté l'art. 257, et la publication sur le site du GUCE doit être regardée comme une publicité complémentaire tant qu'aucun texte ne range ce site parmi les supports habilités. Le conseil prudent consiste à vérifier que l'avis figure bien dans un support mentionné à l'art. 257 dans le délai de quinze jours." },
      { type: 'paragraphe', texte: "La réalité du guichet unique a évolué depuis 2014, et l'étudiant doit en connaître l'actualité. Le 4 mai 2020, le Conseil des ministres a adopté un projet de décret faisant du GUCE un établissement public à caractère administratif et technique doté de la personnalité juridique, présenté comme une exigence de célérité dans le domaine des affaires ; les documents du projet TRANSFORME le décrivent aujourd'hui comme un établissement public sous tutelle du ministère de la Justice. Le délai de trois jours ouvrables n'a pas toujours été tenu : en juin 2023, Radio Okapi relevait que, au lieu du délai maximum annoncé en 2014, il fallait compter plusieurs semaines, voire des mois, pour obtenir l'ensemble des documents. Des progrès ont suivi. En juillet 2025, à l'occasion d'une visite de la Banque mondiale, le GUCE a été présenté comme capable de délivrer un RCCM en quarante-huit heures, avec l'intégration effective du numéro d'identification nationale et du numéro d'impôt, l'objectif affiché étant une création d'entreprise entièrement en ligne. Selon la Banque mondiale (13 février 2026), des caravanes mobiles du GUCE soutenues par le projet TRANSFORME ont permis en 2025 la formalisation de 4 613 micro, petites et moyennes entreprises : 1 425 à Mbuji-Mayi et 1 565 à Kananga en avril et juillet, puis 1 623 à Bunia en novembre, réduisant à quelques heures des démarches qui prenaient des mois dans des villes dépourvues de bureau permanent." },
      { type: 'controle', question: QCM[20] },
      { type: 'controle', question: QCM[21] },
      { type: 'controle', question: QCM[22] },
      { type: 'controle', question: QCM[23] },
      { type: 'controle', question: QCM[24] },
    ],
  },
  {
    numero: '1.10',
    titre: "Pactes d'associés, irrégularités de la constitution et responsabilités (Art. 2-1, 74-1-80, 242-255)",
    navLabel: '1.10 Pactes et nullités',
    blocs: [
      { type: 'paragraphe', texte: "Les statuts ne disent pas tout. Les associés éprouvent souvent le besoin d'organiser entre eux des questions qu'ils ne veulent pas rendre publiques ou qu'ils veulent régler plus finement que les statuts. La révision de 2014 a consacré cette pratique à l'art. 2-1 : « Sous réserve du respect des dispositions du présent Acte uniforme auxquelles il ne peut être dérogé et des clauses statutaires, les associés peuvent conclure des conventions extra-statutaires en vue notamment d'organiser, selon les modalités qu'ils ont librement arrêtées : les relations entre associés ; la composition des organes sociaux ; la conduite des affaires de la société ; l'accès au capital social ; la transmission des titres sociaux. » Le pacte d'associés est un contrat : il n'est pas publié au RCCM, il lie ses seuls signataires, et sa violation se règle en principe par la responsabilité contractuelle entre eux. Il ne peut contredire ni les règles impératives de l'Acte uniforme ni les statuts ; une clause léonine ne devient pas licite parce qu'elle est logée dans un pacte plutôt que dans les statuts." },
      { type: 'tableau', tableau: { entetes: ['Clause courante', 'Objet', 'Rattachement à l\'art. 2-1'], lignes: [
        ["Préemption", "Priorité d'achat des associés en cas de cession de titres", "Transmission des titres sociaux"],
        ["Inaliénabilité temporaire", "Interdiction de céder pendant une durée limitée, pour stabiliser l'actionnariat", "Transmission des titres sociaux"],
        ["Sortie conjointe (tag along)", "Droit du minoritaire de céder aux mêmes conditions que le majoritaire", "Relations entre associés ; transmission"],
        ["Sortie forcée (drag along)", "Obligation du minoritaire de céder si une offre globale est acceptée par la majorité", "Transmission des titres sociaux"],
        ["Répartition des sièges", "Désignation des membres des organes par chaque groupe d'associés", "Composition des organes sociaux"],
        ["Anti-dilution", "Droit de souscrire pour maintenir sa participation", "Accès au capital social"],
      ] } },
      { type: 'paragraphe', texte: "Lorsque la constitution est irrégulière, l'Acte uniforme distingue deux degrés de gravité. Les vices les plus graves entraînent la nullité de la société. L'art. 74-1 les énumère : « Les sociétés constituées en violation des articles 7, 8, 9, 20, 37 alinéa 1er et 40 ci-dessus sont nulles », c'est-à-dire les violations des règles d'interdiction, d'incapacité et d'incompatibilité, de protection des mineurs, des incapables et des époux, de licéité de l'objet, d'obligation d'apport et de liste des apports. Le principe général est posé par l'art. 242 : « La nullité d'une société ne peut résulter que d'une disposition du présent Acte uniforme la prévoyant expressément ou [...] des textes régissant la nullité des contrats » ; dans les SARL et les sociétés par actions, elle ne peut résulter ni d'un vice du consentement ni de l'incapacité d'un associé, à moins que celle-ci n'atteigne tous les associés fondateurs. Les autres irrégularités, plus nombreuses, appellent la régularisation : si les statuts omettent une mention obligatoire ou si une formalité a été omise ou irrégulièrement accomplie, « tout intéressé peut demander à la juridiction compétente [...] que soit ordonnée, sous astreinte, la régularisation de la constitution », le ministère public pouvant agir aux mêmes fins (art. 75). Cette action se prescrit par trois ans à compter de l'immatriculation ou de la publication de l'acte modifiant les statuts (art. 77)." },
      { type: 'carte', titre: "Le régime de la nullité de la société (Art. 246 à 255), en bref", tableau: { entetes: ['Règle', 'Contenu', 'Article'], lignes: [
        ["Extinction", "L'action s'éteint si la cause de nullité a cessé le jour où le juge statue au fond en première instance, sauf objet illicite", 'Art. 246'],
        ["Délai pour couvrir", "Le juge peut, même d'office, fixer un délai pour couvrir la nullité ; pas de nullité moins de deux mois après l'assignation", 'Art. 247'],
        ["Vice du consentement ou incapacité", "Mise en demeure de régulariser ou d'agir dans les six mois, à peine de forclusion ; rachat possible des titres", 'Art. 248, 249'],
        ["Prescription", "Trois ans à compter de l'immatriculation ou de la publication de l'acte modificatif, sauf objet illicite", 'Art. 251'],
        ["Effets", "Sans rétroactivité : la nullité met fin à l'exécution du contrat ; dissolution puis liquidation", 'Art. 253'],
        ["Protection des tiers", "Ni la société ni les associés ne peuvent se prévaloir de la nullité à l'égard des tiers de bonne foi, sauf l'incapable ou la victime du vice du consentement", 'Art. 255'],
      ] }, note: "Le régime complet des nullités est étudié au chapitre 10, avec la dissolution. Dans la SNC et la SCS, l'accomplissement des formalités de publicité est requis à peine de nullité, sans que les associés puissent s'en prévaloir à l'égard des tiers, le juge pouvant ne pas la prononcer en l'absence de fraude (art. 245)." },
      { type: 'paragraphe', texte: "Les irrégularités de la constitution engagent enfin la responsabilité de ceux qui l'ont conduite. « Les fondateurs, ainsi que les premiers membres des organes de gestion, de direction ou d'administration, sont solidairement responsables du préjudice causé soit par le défaut d'une mention obligatoire dans les statuts, soit par l'omission ou l'accomplissement irrégulier d'une formalité prescrite pour la constitution de la société » (art. 78). En cas de modification des statuts, les dirigeants alors en fonction encourent la même responsabilité (art. 79). L'action se prescrit par trois ans à compter de l'immatriculation ou de la publication de l'acte modificatif (art. 80). La solidarité est une protection efficace pour la victime, qui peut réclamer la totalité de la réparation à l'un quelconque des responsables ; elle incite les fondateurs à vérifier soigneusement chaque étape, ce qui fait de la déclaration de régularité et de conformité de l'art. 73 un acte engageant et non une formalité de pure forme." },
      { type: 'paragraphe', texte: "Au terme de ce chapitre, l'étudiant dispose de la grille d'analyse qu'il appliquera à chaque forme sociale dans les chapitres suivants. Face à une société, il se demande d'abord si le droit uniforme s'applique (siège dans un État partie, date de constitution et mise en harmonie) ; puis si les éléments constitutifs sont réunis (apports licites, vocation aux résultats sans clause léonine, affectio societatis) ; si les associés avaient la capacité requise pour la forme choisie ; si le capital, les statuts et leurs mentions sont conformes ; et à quel stade de sa naissance se trouve la société (formation, constitution, immatriculation), ce qui détermine qui est engagé par les actes accomplis. Enfin, face à une irrégularité, il distingue ce qui relève de la nullité, limitée et favorable à la régularisation, de ce qui relève de la simple régularisation sous astreinte, et il recherche qui en répond." },
      { type: 'controle', question: QCM[26] },
      { type: 'controle', question: QCM[28] },
      { type: 'controle', question: QCM[3] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas1',
    titre: 'La société KINSHASA TRADING',
    contexte: "Trois commerçants de Kinshasa souhaitent créer une société d'importation de matériel électrique. Ils veulent protéger leur patrimoine personnel, démarrer avec un capital modeste, éviter les frais de notaire si possible, et savoir à quel moment la société pourra signer des contrats en son propre nom.",
    questions: [
      { num: 1, enonce: "Quelles formes l'AUSCGIE leur offre-t-il, et laquelle recommander ?", correction: "L'art. 6 reconnaît cinq formes commerciales par la forme : SNC, SCS, SARL, SA et SAS. La SNC est à écarter, puisque tous les associés y sont commerçants et répondent indéfiniment et solidairement des dettes sociales (art. 270), ce qui contredit l'objectif de protection du patrimoine ; la SCS impose au moins un commandité tenu de la même manière (art. 293). La SA exige un capital minimum de dix millions de FCFA (art. 387) et un commissaire aux comptes. Restent la SARL et la SAS, toutes deux à responsabilité limitée aux apports (art. 309 et 853-1). Pour trois associés recherchant simplicité et faible capital, la SARL est la recommandation naturelle : son capital est librement fixé en RDC en tenant compte de l'objet social (art. 311 et art. 2 de l'arrêté interministériel du 30 décembre 2014), et ses statuts peuvent être établis sous seing privé (art. 1 du même arrêté, dans le prolongement de la réserve de l'art. 10). La SAS se justifierait s'ils voulaient une gouvernance sur mesure." },
      { num: 2, enonce: "Peuvent-ils se passer du notaire, et comment prouver la libération du capital ?", correction: "Oui pour la SARL. L'art. 10 impose l'acte notarié « sauf dispositions nationales contraires », et l'art. 1 de l'arrêté du 30 décembre 2014 permet d'établir les statuts de la SARL « par acte notarié ou par acte sous seing privé ». Les statuts sous seing privé sont alors établis en autant d'originaux que nécessaire, un original étant remis à chaque associé (art. 11). Pour la libération, la moitié au moins de chaque part en numéraire doit être libérée à la souscription, le surplus dans les deux ans de l'immatriculation (art. 311-1). Les fonds peuvent être déposés dans une banque ou une institution de microfinance agréée, et le bordereau de versement acquitté vaut preuve de la libération et du dépôt (art. 3 de l'arrêté). Rappel : un apport n'est libéré que lorsque la société a intégralement et définitivement encaissé les sommes (art. 42)." },
      { num: 3, enonce: "À partir de quand la société peut-elle contracter en son nom, et quelles formalités restent à accomplir ?", correction: "La société est constituée à la signature des statuts (art. 101), mais elle n'acquiert la personnalité juridique qu'à son immatriculation au RCCM (art. 98). Avant cette date, son existence n'est pas opposable aux tiers (art. 101 al. 2) ; les actes nécessaires doivent être passés selon les mécanismes de reprise des art. 106 à 113. Les fondateurs et premiers gérants déposent la déclaration de régularité et de conformité, faute de quoi l'immatriculation serait rejetée (art. 73). Au GUCE, le dossier complet doit être traité en trois jours ouvrables au plus (art. 18 du décret n° 14/014 du 8 mai 2014), et la pratique récente annonce un RCCM en quarante-huit heures à Kinshasa (projet TRANSFORME, juillet 2025). Dans les quinze jours de l'immatriculation, un avis contenant les mentions des art. 257-1 et 262 est inséré dans un journal habilité (art. 261). Enfin, sur tous ses documents, la société fera figurer sa dénomination suivie de la mention SARL, de son capital, de son siège et de son numéro RCCM (art. 17 et 310)." },
    ],
  },
  {
    id: 'cas2',
    titre: "L'affectio societatis en question",
    contexte: "Deux entrepreneurs de Lubumbashi exploitent ensemble, depuis trois ans, un commerce de pièces détachées : ils ont financé le stock à parts égales, se partagent les bénéfices par moitié et prennent ensemble les décisions, mais n'ont jamais signé de statuts. L'un d'eux conteste aujourd'hui l'existence de toute société pour s'approprier le fonds.",
    questions: [
      { num: 1, enonce: 'Une société peut-elle exister sans statuts écrits ?', correction: "Oui, sous la figure de la société créée de fait. L'art. 864 dispose qu'il y a société créée de fait lorsque deux ou plusieurs personnes physiques ou morales se comportent comme des associés sans avoir constitué entre elles l'une des sociétés reconnues par l'Acte uniforme. Tout intéressé peut demander au juge la reconnaissance de cette société (art. 866), et son existence se prouve par tout moyen (art. 867) : factures communes, comptes partagés, témoignages des fournisseurs. Le juge recherchera les éléments de l'art. 4 : des apports (le financement paritaire du stock), la vocation aux bénéfices et aux pertes (le partage par moitié), et l'affectio societatis (la codirection du commerce, sur un pied d'égalité)." },
      { num: 2, enonce: 'Quelles conséquences si le juge reconnaît la société créée de fait ?', correction: "L'art. 868 attache à la reconnaissance judiciaire l'application des règles de la SNC aux associés. Chacun des exploitants répond donc indéfiniment et solidairement des dettes contractées pour le commerce (art. 270), et la société sera dissoute et liquidée selon le droit commun. L'associé qui contestait l'existence de la société ne peut pas s'approprier le fonds : l'actif commun sera partagé après paiement du passif. La leçon pratique est de formaliser la société dès l'origine, car la société créée de fait cumule la responsabilité illimitée et l'incertitude probatoire." },
    ],
  },
  {
    id: 'cas3',
    titre: "L'investisseur au rendement garanti",
    contexte: "Pour attirer M. KASONGO dans le capital de la SARL MBUJI AGRO, les autres associés lui promettent, par une clause des statuts, un « intérêt fixe de 15 % l'an sur son apport, dû même en l'absence de bénéfices », et précisent qu'il « ne supportera aucune perte ». M. KASONGO apporte 40 % du capital.",
    questions: [
      { num: 1, enonce: 'Ces clauses sont-elles valables ?', correction: "Non. L'art. 54 pose d'abord la règle supplétive de proportionnalité : sauf clause contraire, les droits et l'obligation de chaque associé sont proportionnels à ses apports ; une répartition inégale est donc en principe permise. Mais l'al. 2 répute non écrites les clauses exonérant un associé de la totalité des pertes. La clause exonérant M. KASONGO de toute perte est une clause léonine, réputée non écrite. Quant à l'intérêt fixe dû même sans bénéfice, il contredit la définition de l'associé (art. 4 : partager le bénéfice et contribuer aux pertes) et le droit aux bénéfices, qui n'existe que « lorsque leur distribution a été décidée » (art. 53, 1°) : garantir une rémunération indépendante des résultats revient à l'exonérer des pertes. La clause encourt le même sort." },
      { num: 2, enonce: 'La société est-elle en péril ? Que reste-t-il à M. KASONGO ?', correction: "La société survit : la sanction de l'art. 54 al. 2, comme celle de l'art. 2, frappe la clause, non la société. La nullité de la société n'est encourue que dans les cas de l'art. 74-1 (violation des art. 7, 8, 9, 20, 37 al. 1er et 40), qui ne visent pas la clause léonine. M. KASONGO redevient un associé ordinaire, avec des droits proportionnels à ses 40 % (art. 54 al. 1). S'il souhaite une rémunération privilégiée licite, les statuts peuvent lui accorder un dividende prioritaire prélevé sur les bénéfices distribuables, mentionné comme avantage particulier (art. 13, 9°) et contrôlé par un commissaire aux apports (art. 312 al. 3), sans jamais aboutir à la privation totale des autres associés ni à son exonération totale des pertes." },
    ],
  },
  {
    id: 'cas4',
    titre: 'Les époux associés',
    contexte: "M. et Mme ILUNGA, mariés, ont constitué avec un ami une SNC de transport à Kolwezi, chacun des trois détenant un tiers des parts. Deux ans après l'immatriculation, un créancier impayé de la société découvre leur mariage et menace d'invoquer la nullité de la société ; les époux voudraient sauver l'entreprise.",
    questions: [
      { num: 1, enonce: 'La société est-elle nulle ?', correction: "Le vice est réel. L'art. 9 interdit aux époux d'être associés d'une société dans laquelle ils seraient tenus des dettes sociales indéfiniment ou solidairement ; or, dans la SNC, tous les associés répondent indéfiniment et solidairement des dettes sociales (art. 270). L'art. 74-1 sanctionne de nullité les sociétés constituées en violation de l'art. 9. L'action en nullité se prescrit par trois ans à compter de l'immatriculation (art. 251 al. 1) : intentée deux ans après, elle est recevable. Mais la nullité opérerait sans rétroactivité, par dissolution puis liquidation (art. 253), et ni la société ni les associés ne pourraient s'en prévaloir à l'égard des tiers de bonne foi (art. 255) : le créancier conserve ses droits pour les dettes déjà nées." },
      { num: 2, enonce: 'Comment les époux peuvent-ils sauver la société ?', correction: "Par la régularisation, que le droit des nullités favorise. L'action en nullité est éteinte lorsque la cause de nullité a cessé d'exister le jour où le juge statue au fond en première instance, seule l'illicéité de l'objet social échappant à cette règle (art. 246) ; le juge peut même fixer un délai pour couvrir la nullité et ne peut la prononcer moins de deux mois après l'assignation (art. 247). Deux issues : l'un des époux cède ses parts à l'ami associé ou à un tiers avant le jugement ; ou la société se transforme en une forme où les époux ne sont plus tenus indéfiniment et solidairement, par exemple une SARL (art. 309). Dans ce second cas, les créanciers dont la dette est antérieure à la transformation conservent leurs droits contre la société et les associés (art. 186 al. 2). La cause de nullité disparue, l'action du créancier tombe." },
    ],
  },
  {
    id: 'cas5',
    titre: 'Les apports de la SARL GOMA TECH',
    contexte: "Trois associés constituent à Goma la SARL GOMA TECH, spécialisée dans l'installation de systèmes solaires. AMANI apporte en numéraire l'équivalent de 4 000 000 FCFA, dont il verse 1 500 000 à la souscription. BAHATI apporte un camion-grue qu'ils évaluent ensemble à l'équivalent de 6 000 000 FCFA, sans recourir à un commissaire aux apports « pour économiser les frais ». CIZA, ingénieur en énergie, apporte son savoir-faire ; les statuts lui attribuent 30 % des droits de vote et 30 % des bénéfices. Les statuts fixent le capital à 10 000 000 FCFA d'équivalent.",
    questions: [
      { num: 1, enonce: "La clause relative à CIZA est-elle régulière ?", correction: "Non. L'apport de CIZA est un apport en industrie (art. 40, 3°, et 50-1), permis dans la SARL. Mais l'art. 50-3 fixe un double plafond : les droits de vote attachés aux titres rémunérant des apports en industrie ne peuvent être supérieurs à 25 % de l'ensemble des droits de vote, et leur part totale ne peut excéder 25 % des bénéfices, de l'actif net et des pertes. Une attribution de 30 % méconnaît ces deux plafonds ; la clause, contraire à une disposition de l'Acte uniforme, est réputée non écrite (art. 2 al. 2), et les statuts doivent être rectifiés pour ramener les droits de CIZA dans la limite de 25 %. Les statuts doivent aussi décrire l'apport, la durée des prestations, le nombre de titres, leurs droits et les modalités de leur liquidation si CIZA cesse son activité (art. 50-2). Ses titres seront incessibles, intransmissibles et sans valeur nominale (art. 50-4), et CIZA devra rendre compte à la société des gains réalisés par son activité d'ingénieur dans ce domaine (art. 50-2)." },
      { num: 2, enonce: "Le capital de 10 000 000 FCFA est-il correctement calculé ?", correction: "Oui. L'apport en industrie de CIZA « ne concourt pas à la formation du capital social » (art. 50-3 al. 1) ; le capital représente le montant des apports en capital (art. 62), soit 4 000 000 d'AMANI plus 6 000 000 de BAHATI, total 10 000 000. En RDC, ce montant est librement fixé en tenant compte de l'objet social (arrêté du 30 décembre 2014, art. 2). Les montants de l'Acte uniforme étant exprimés en FCFA, leur application en RDC passe par la contre-valeur en monnaie nationale prévue par l'art. 906, ce qui intéresse en particulier le seuil de l'art. 312 examiné ci-dessous." },
      { num: 3, enonce: "Que penser de l'évaluation du camion sans commissaire aux apports ?", correction: "Elle est irrégulière. Dans la SARL, l'évaluation des apports en nature est obligatoirement contrôlée par un commissaire aux apports dès que la valeur de l'apport considéré, ou de l'ensemble des apports en nature, est supérieure à 5 000 000 FCFA (art. 312 al. 2) ; le camion de 6 000 000 franchit le seuil. Trois conséquences : tout intéressé et le ministère public peuvent demander la régularisation sous astreinte, dans les trois ans de l'immatriculation (art. 75 et 77) ; les fondateurs et premiers gérants sont solidairement responsables du préjudice causé par cette formalité omise (art. 78), dans le même délai (art. 80) ; et, faute de commissaire, « les associés sont solidairement responsables pendant cinq (5) ans, à l'égard des tiers, de la valeur attribuée aux apports en nature » (art. 312 al. 7). Si le camion ne valait en réalité que 3 000 000, les créanciers pourraient réclamer aux associés la différence." },
      { num: 4, enonce: "AMANI a-t-il suffisamment libéré son apport ?", correction: "Non. Dans la SARL, les parts représentant des apports en numéraire sont libérées lors de la souscription de la moitié au moins de leur valeur nominale (art. 311-1 al. 2) : AMANI devait verser au moins 2 000 000, et non 1 500 000. Le surplus doit ensuite être libéré en une ou plusieurs fois dans les deux ans de l'immatriculation (art. 311-1 al. 3). AMANI reste débiteur envers la société de tout ce qu'il s'est obligé à apporter (art. 37 al. 2), et les sommes non versées à l'échéance portent de plein droit intérêt au taux légal, sans préjudice de dommages et intérêts (art. 43). Le bordereau de versement produit au GUCE ne pourra justifier que ce qui a réellement été encaissé (art. 42)." },
    ],
  },
  {
    id: 'cas6',
    titre: 'Les fondateurs pressés de KIVU LOGISTIQUE',
    contexte: "En mars, MUKENDI et TSHALA, qui préparent la constitution de la SAS KIVU LOGISTIQUE, signent un bail commercial pour un entrepôt à Bukavu « au nom de la société en formation ». Les statuts sont signés en avril, sans qu'aucun état des actes accomplis n'y soit annexé ; ils désignent MUKENDI président. Fin avril, avant l'immatriculation, MUKENDI achète un chariot élévateur au nom de la société, sans mandat. La société est immatriculée en mai ; en juin, la majorité refuse de payer le loyer et le chariot. Par ailleurs, une société sud-africaine, associée minoritaire, a ouvert à Lubumbashi un bureau de liaison qui commence à facturer des prestations de transport à des clients locaux.",
    questions: [
      { num: 1, enonce: "Qui doit payer le loyer de l'entrepôt ?", correction: "Le bail a été signé avant la constitution, pour le compte de la société en formation. Les actes de cette période doivent être portés à la connaissance des associés avant la signature des statuts et décrits dans un « état des actes et engagements accomplis pour le compte de la société en formation » (art. 106). Dans une société constituée sans assemblée constitutive, c'est l'annexion de cet état aux statuts et leur signature qui emportent reprise dès l'immatriculation (art. 107). Aucun état n'ayant été annexé, la reprise automatique n'a pas joué. Reste la reprise postérieure par une décision collective ordinaire, pleinement informée, à laquelle MUKENDI et TSHALA ne prendraient pas part (art. 108). À défaut, le bail est inopposable à la société, et MUKENDI et TSHALA, qui l'ont souscrit, sont tenus solidairement et indéfiniment des loyers (art. 110 al. 2). Si la société reprend le bail, elle est réputée l'avoir conclu dès l'origine (art. 110 al. 1)." },
      { num: 2, enonce: "Et l'achat du chariot élévateur ?", correction: "L'achat se situe entre la constitution (signature des statuts) et l'immatriculation. Les dirigeants agissent alors au nom de la société constituée et non encore immatriculée (art. 104), mais la reprise automatique à l'immatriculation suppose un mandat donné dans les statuts, par acte séparé ou en assemblée, pour des engagements déterminés et précisés (art. 111). MUKENDI n'ayant pas de mandat, l'acte ne peut être repris que par une approbation des associés dans les conditions ordinaires, MUKENDI ne votant pas (art. 112). À défaut, l'art. 110, rendu applicable par l'art. 113, joue : l'achat est inopposable à la société et MUKENDI en répond personnellement, solidairement et indéfiniment." },
      { num: 3, enonce: "Le bureau de liaison sud-africain est-il en règle ?", correction: "Non. Le bureau de représentation ou de liaison n'exerce « qu'une activité préparatoire ou auxiliaire » et n'a pas d'autonomie de gestion (art. 120-1). Facturer des prestations de transport à des clients est une activité commerciale propre : le bureau fonctionne en réalité comme une succursale. L'art. 120-5 impose alors une demande de rectification au RCCM dans les trente jours suivant ce changement de situation, à peine de radiation après décision de justice. Devenue succursale d'une société étrangère, elle devra, en vertu de l'art. 120, être apportée à une société de droit d'un État partie, préexistante ou à créer, deux ans au plus tard après sa création, sauf dispense par arrêté du ministre chargé du commerce, accordée pour deux ans non renouvelables. Ni le bureau ni la succursale n'ont de personnalité juridique : la société sud-africaine répond de leurs engagements sur tout son patrimoine (art. 117 et 120-2)." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue2',
  numero: 1,
  id: 'ue2-chapitre-1',
  titre: 'La société commerciale : notion, constitution et naissance',
  sousTitre: "AUSCGIE révisé du 30 janvier 2014, art. 1 à 120-5, 242 à 262 et 907 à 920 · Guichet unique de création d'entreprise et capital libre de la SARL en RDC",
  infoBulle: "L'OHADA et son application en RDC depuis le 12 septembre 2012, la définition de la société et les sociétés sans immatriculation, l'associé unique et la capacité des associés, les trois apports, les titres sociaux et les clauses léonines, le capital social, les statuts, les cinq formes et les établissements secondaires, la naissance de la personnalité juridique au GUCE, les pactes d'associés et les nullités.",
  loiRef: 'Art. 1-120-5, 242-262, 907-920 AUSCGIE · décret n° 14/014 du 8 mai 2014 · arrêté du 30 décembre 2014',
  moduleLabel: 'UE 2 · Droit des sociétés',
  retourRoute: '/ue2-droit-societes',
  coursId: 'ue2-droit-societes',
  objectifs: [
    "Situer l'AUSCGIE dans l'ordre juridique congolais : adhésion de la RDC, entrée en vigueur des Actes uniformes, transition depuis le décret de 1887 et mise en harmonie des statuts (art. 1-3, 907-920)",
    "Définir la société et en identifier les éléments constitutifs, puis distinguer la société en participation, la société créée de fait et la société de fait (art. 4, 12, 114-115, 854, 864-868)",
    "Déterminer qui peut être associé de quelle forme sociale et apprécier le régime de l'associé unique (art. 5, 7-9, 60, 309, 385, 853-1)",
    "Qualifier les apports en numéraire, en nature et en industrie et en appliquer les règles de libération, d'évaluation et de plafonnement (art. 37-50-4, 311-1, 312, 389, 400)",
    "Analyser les droits attachés aux titres sociaux et reconnaître une clause léonine (art. 51-59)",
    "Expliquer la fonction du capital social, ses variations et le choix congolais du capital libre de la SARL (art. 61-72, 269-1 ; arrêté du 30 décembre 2014)",
    "Conduire la création d'une société en RDC, de la formation à l'immatriculation et à la publicité, au Guichet unique de création d'entreprise (art. 73-74, 97-113, 256-1-262 ; décret n° 14/014)",
    "Distinguer, face à une irrégularité de constitution, la nullité, la régularisation et la responsabilité des fondateurs (art. 2-1, 74-1-80, 242-255)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Le droit OHADA est en vigueur en RDC depuis le 12 septembre 2012 ; l'AUSCGIE révisé, adopté le 30 janvier 2014 et publié le 4 février 2014, est entré en vigueur quatre-vingt-dix jours plus tard, le 5 mai 2014 (art. 920), et les sociétés existantes disposaient de deux ans pour mettre leurs statuts en harmonie (art. 908, 915).",
    "L'AUSCGIE s'applique à toute société commerciale dont le siège est dans un État partie, quelle que soit la nationalité des associés (art. 1) ; les lois nationales non contraires demeurent applicables, et toute clause statutaire contraire à l'Acte uniforme est réputée non écrite (art. 1 al. 3 et 2).",
    "La société est un contrat créé dans l'intérêt commun des associés, qui suppose des apports, la vocation aux bénéfices et aux pertes et l'affectio societatis (art. 4) ; des personnes qui se comportent comme des associés sans avoir constitué de société forment une société créée de fait, soumise une fois reconnue aux règles de la SNC (art. 864-868).",
    "L'associé unique n'est admis que dans la SARL, la SA et la SAS (art. 5, 309, 385, 853-1) ; les mineurs et incapables ne peuvent être tenus au-delà de leurs apports, ni les époux indéfiniment ou solidairement (art. 8-9), à peine de nullité (art. 74-1).",
    "Seuls trois apports sont permis, tout autre étant interdit (art. 40) : le numéraire, libéré intégralement en principe mais pour moitié en SARL et pour un quart en SA (art. 41, 311-1, 389) ; la nature, toujours libérée intégralement et contrôlée par un commissaire aux apports au-delà de 5 000 000 FCFA en SARL et toujours en SA (art. 45, 312, 400) ; l'industrie, hors capital, plafonnée à 25 % des votes et des résultats, interdite en SA (art. 50-1 à 50-4).",
    "Les titres sociaux sont des meubles conférant des droits proportionnels aux apports sauf clause contraire (art. 52-54) ; les clauses léonines sont réputées non écrites (art. 54 al. 2), et seules les sociétés par actions émettent des titres négociables (art. 58).",
    "Le capital est librement fixé sauf minimum légal (art. 65) : dix millions de FCFA pour la SA, cent millions si elle est cotée, un million pour la SARL sauf dispositions nationales contraires ; en RDC, le capital de la SARL est libre mais doit tenir compte de l'objet social (arrêté du 30 décembre 2014). Les engagements d'un associé ne peuvent jamais être augmentés sans son consentement (art. 72).",
    "Les statuts comportent treize mentions obligatoires (art. 13) ; la durée ne peut excéder quatre-vingt-dix-neuf ans à compter de l'immatriculation, et les associés doivent être consultés sur la prorogation un an au moins avant le terme (art. 28-36).",
    "La société est constituée à la signature des statuts et acquiert la personnalité à l'immatriculation (art. 98, 101) ; les actes antérieurs non repris engagent solidairement et indéfiniment leurs auteurs (art. 110) ; la déclaration de régularité conditionne l'immatriculation (art. 73) et l'avis de constitution est publié dans les quinze jours (art. 261). Au GUCE, les formalités doivent être accomplies en trois jours ouvrables au plus à compter du dossier complet (décret n° 14/014, art. 18).",
    "Les pactes d'associés sont libres dans le respect des règles impératives et des statuts (art. 2-1) ; la nullité de la société est limitée aux cas de l'art. 74-1 et favorise la régularisation (art. 242, 246-255), les autres irrégularités appelant une régularisation sous astreinte (art. 75, 77) et engageant la responsabilité solidaire des fondateurs (art. 78-80).",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)", precision: "adopté le 30 janvier 2014 à Ouagadougou, JO OHADA n° spécial du 4 février 2014 ; art. 1 à 120-5, 130, 131, 186, 242 à 262, 269-1 à 269-2-1, 270, 293, 309 à 312, 371, 385 à 389, 400, 664, 824, 853-1 à 853-4, 854, 864 à 868 et 906 à 920" },
    { genre: 'texte', intitule: "Traité relatif à l'harmonisation du droit des affaires en Afrique", precision: "signé à Port-Louis le 17 octobre 1993, révisé à Québec le 17 octobre 2008" },
    { genre: 'texte', intitule: "Loi n° 10/002 du 11 février 2010 autorisant l'adhésion de la République démocratique du Congo au Traité relatif à l'harmonisation du droit des affaires en Afrique", precision: "instruments déposés à Dakar le 13 juillet 2012 ; entrée en vigueur le 12 septembre 2012" },
    { genre: 'texte', intitule: "Décret du Roi-Souverain du 27 février 1887 relatif aux sociétés commerciales", precision: "droit congolais des sociétés antérieur à l'OHADA" },
    { genre: 'texte', intitule: "Décret n° 14/014 du 8 mai 2014 portant création, organisation et fonctionnement du Guichet unique de création d'entreprise", precision: "art. 1, 2, 4, 9, 16 à 18, 20, 22 et 29" },
    { genre: 'texte', intitule: "Arrêté interministériel n° 002/CAB/MIN/JGS&DH/014 et n° 243/CAB/MIN/FINANCES/2014 du 30 décembre 2014 déterminant la forme des statuts et le capital social de la société à responsabilité limitée", precision: "art. 1 à 3" },
    { genre: 'texte', intitule: "Ordonnance-loi n° 22/030 du 8 septembre 2022 relative à la promotion de l'entrepreneuriat et des startups", precision: "art. 1, 2 et 26" },
    { genre: 'ouvrage', auteur: "Pougoué P.-G., Anoukaha F. et Nguebou Toukam J.", titre: "Le droit des sociétés commerciales et du groupement d'intérêt économique OHADA", editeur: "Presses universitaires d'Afrique", lieu: "Yaoundé", annee: "1998" },
    { genre: 'ouvrage', auteur: "Anoukaha F., Cissé A., Diouf N., Nguebou Toukam J., Pougoué P.-G. et Samb M.", titre: "OHADA. Sociétés commerciales et GIE", editeur: "Bruylant, coll. Droit uniforme africain", lieu: "Bruxelles", annee: "2002" },
    { genre: 'ouvrage', auteur: "Pougoué P.-G. (dir.)", titre: "Encyclopédie du droit OHADA", editeur: "Lamy", lieu: "Paris", annee: "2011" },
    { genre: 'ouvrage', auteur: "Diouf N., Masamba Makela R., Pougoué P.-G. et Sawadogo F. M. (coord.)", titre: "Code vert OHADA 2025. Traité et actes uniformes commentés et annotés", editeur: "Juriscope", lieu: "Poitiers", annee: "2025" },
    { genre: 'ouvrage', auteur: "Masamba R.", titre: "L'OHADA en RDC. Manuel de vulgarisation", editeur: "congolegal.cd", lieu: "s.l.", annee: "2012" },
    { genre: 'article', auteur: "Lanou G. R.", titre: "L'utilité juridique du capital social en droit OHADA des sociétés commerciales", support: "Revue de l'ERSUMA", precision: "n° 10, 2019, p. 177-205" },
    { genre: 'article', auteur: "Mukendi Wafwana E.", titre: "OHADA - SPRL et SARL congolaises : mise en harmonie des statuts ou transformation en sociétés organisées par l'AUDSC-GIE ?", support: "Lexology", precision: "1er mai 2014" },
    { genre: 'article', auteur: "Yav & Associates", titre: "Forme des statuts et fixation du capital minimum d'une SARL de droit OHADA en R.D. Congo", support: "Légavox", precision: "6 janvier 2015" },
    { genre: 'article', auteur: "Radio Okapi", titre: "Lenteur administrative au Guichet unique de création d'entreprise (GUCE)", support: "Radio Okapi, émission Échos d'économie", precision: "27 juin 2023" },
    { genre: 'article', auteur: "Projet TRANSFORME", titre: "Le GUCE à l'ère du numérique : vers une création d'entreprise 100 % digitale", support: "transforme.cd", precision: "11 juillet 2025" },
    { genre: 'article', auteur: "Karray Z. et van Zoelen Cortes J.", titre: "Rapprocher le guichet des entrepreneurs : la dernière étape de la formalisation en République démocratique du Congo", support: "Banque mondiale", precision: "13 février 2026" },
    { genre: 'article', auteur: "DeskEco", titre: "RDC : le Guichet unique de création d'entreprise devient un établissement public à caractère administratif avec une personnalité juridique", support: "deskeco.com", precision: "5 mai 2020, compte rendu du Conseil des ministres du 4 mai 2020" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  outil: {
    label: 'Simulateur : constituer votre société',
    description: "Choisissez une forme sociale et un pays de constitution, renseignez les mentions obligatoires des statuts (art. 13 AUSCGIE), ajoutez les associés et leurs apports, et obtenez un récapitulatif avec vérification de conformité légale.",
    route: '/ue2/simulateur-constitution',
  },
  sources: "Sources : AUSCGIE révisé du 30 janvier 2014 · Traité OHADA du 17 octobre 1993 révisé le 17 octobre 2008 · Loi n° 10/002 du 11 février 2010 · Décret n° 14/014 du 8 mai 2014 (GUCE) · Arrêté interministériel du 30 décembre 2014 (SARL) · Ordonnance-loi n° 22/030 du 8 septembre 2022 · Banque mondiale et projet TRANSFORME (2025-2026) · Radio Okapi (2023).",
}

export default chapitre
