// Chapitre 1 du module UE2, Droit des sociétés : contenu pur.
// Migré depuis l'ancienne page dédiée UE2Chapitre1Page.tsx vers le moteur
// commun components/chapitre/ChapitreManuscrit.tsx, avec vérification
// article par article sur le texte de l'AUSCGIE révisé (art. 1 à 80 lus
// en intégralité ; extraits vérifiés : 97-101, 259-262, 270, 309-312,
// 385-389, 400, 853-1, 853-2, 864-868). Corrections : l'art. 5 ne cite
// aucune forme sociale (les formes unipersonnelles résultent des art. 309
// al. 2, 385 al. 2 et 853-1) et n'a ni al. 2 ni al. 3 - le registre des
// décisions et la réunion des titres en une main relèvent d'autres
// textes (art. 60 pour la seconde) ; l'art. 77 prescrit l'action en
// RÉGULARISATION (la nullité relève de l'art. 251) ; le « principe de
// légalité de la nullité » est l'art. 242, l'art. 74-1 n'étant que la
// liste des violations sanctionnées ; l'apport en industrie est hors
// capital par l'art. 50-3 (non 50-2) ; l'avis de constitution est publié
// dans les 15 jours de l'immatriculation (art. 261, non « 30 jours ») ;
// la libération partielle de la SARL relève de l'art. 311-1 (moitié,
// solde sous 2 ans), l'art. 312 régissant le commissaire aux apports
// (seuil de 5 000 000 FCFA). Le simulateur interactif de constitution
// est conservé sur sa propre page (/ue2/simulateur-constitution),
// appelée par la carte « Outil pratique » du moteur.
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch1-q1', question: "Quel critère détermine l'application de l'AUSCGIE à une société ?",
    options: [
      { id: 'a', texte: 'La nationalité des associés' },
      { id: 'b', texte: 'Le siège social situé dans un État partie' },
      { id: 'c', texte: 'La nationalité du gérant' },
      { id: 'd', texte: "Le lieu d'immatriculation des associés" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 1 AUSCGIE',
    explication: "L'Art. 1 AUSCGIE pose le critère du siège social : toute société commerciale - y compris celle dans laquelle un État ou une personne morale de droit public est associé - dont le siège social est situé sur le territoire de l'un des États parties est soumise à l'Acte uniforme, peu importe la nationalité des associés ou des dirigeants.",
  },
  {
    id: 'ch1-q2', question: "Depuis quelle date le droit OHADA s'applique-t-il en RDC ?",
    options: [
      { id: 'a', texte: '17 octobre 1993' },
      { id: 'b', texte: '30 janvier 2014' },
      { id: 'c', texte: '12 septembre 2012' },
      { id: 'd', texte: '5 mai 2014' },
    ],
    reponseCorrecte: 'c', articleRef: 'Traité OHADA - adhésion de la RDC',
    explication: "La RDC est devenue le 17ème État partie de l'OHADA : le Traité y est entré en vigueur le 12 septembre 2012. Le 17 octobre 1993 est la date de signature du Traité à Port-Louis, et le 30 janvier 2014 celle de la révision de l'AUSCGIE à Ouagadougou.",
  },
  {
    id: 'ch1-q3', question: "L'apport en industrie d'un associé entre-t-il dans le capital social de la société ?",
    options: [
      { id: 'a', texte: 'Oui, au même titre que les apports en numéraire' },
      { id: 'b', texte: "Non : il ne concourt pas à la formation du capital social" },
      { id: 'c', texte: 'Oui, mais seulement dans les SARL' },
      { id: 'd', texte: 'Cela dépend des statuts' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 50-3 AUSCGIE',
    explication: "L'Art. 50-3 AUSCGIE dispose que les apports en industrie ne concourent pas à la formation du capital social, mais donnent lieu à l'attribution de titres sociaux ouvrant droit au vote et au partage des bénéfices et de l'actif net, à charge de contribuer aux pertes - avec un double plafond de 25%.",
  },
  {
    id: 'ch1-q4', question: "Les statuts de la SARL KINSHASA TRADE prévoient que l'associé LUMU recevra 100% des bénéfices. Cette clause est :",
    options: [
      { id: 'a', texte: "Valide si les autres associés l'acceptent" },
      { id: 'b', texte: 'Valide uniquement pour les SARL' },
      { id: 'c', texte: 'Réputée non écrite : clause léonine' },
      { id: 'd', texte: "Valide si elle figure dans un pacte d'associés" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 54 al. 2 AUSCGIE',
    explication: "L'Art. 54 al. 2 AUSCGIE répute non écrites les clauses attribuant à un associé la totalité du profit procuré par la société ou l'exonérant de la totalité des pertes, ainsi que celles excluant un associé totalement du profit ou mettant à sa charge la totalité des pertes. La clause disparaît, la société demeure - et la règle vaut aussi pour les conventions extra-statutaires, qui ne peuvent déroger aux dispositions impératives (Art. 2 et 2-1).",
  },
  {
    id: 'ch1-q5', question: 'Parmi les formes suivantes, laquelle peut avoir un associé unique en droit OHADA ?',
    options: [
      { id: 'a', texte: 'La SNC' },
      { id: 'b', texte: 'La SCS' },
      { id: 'c', texte: 'La SARL' },
      { id: 'd', texte: 'Toutes les formes' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 5, 309, 385, 853-1 AUSCGIE',
    explication: "L'Art. 5 AUSCGIE permet la création par une seule personne « dans les cas prévus par le présent Acte uniforme ». Ces cas sont la SARL (Art. 309 al. 2 : instituée par une personne physique ou morale), la SA (Art. 385 al. 2 : elle peut ne comprendre qu'un seul actionnaire) et la SAS (Art. 853-1 : instituée par un ou plusieurs associés ; le sigle SASU vient de l'Art. 853-2). La SNC et la SCS, sociétés de personnes à responsabilité illimitée, exigent au moins deux associés.",
  },
  {
    id: 'ch1-q6', question: "Une SARL qui exerce une activité civile (ex. conseil) est-elle commerciale ?",
    options: [
      { id: 'a', texte: 'Non, car son activité est civile' },
      { id: 'b', texte: 'Oui : la SARL est commerciale par sa forme, quel que soit son objet' },
      { id: 'c', texte: 'Cela dépend du montant de son capital' },
      { id: 'd', texte: 'Oui, seulement si elle le déclare au RCCM' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 6 AUSCGIE',
    explication: "L'Art. 6 AUSCGIE : le caractère commercial d'une société est déterminé par sa forme ou par son objet. Sont commerciales à raison de leur forme et quel que soit leur objet les SNC, SCS, SARL, SA et SAS. La forme l'emporte donc sur la nature de l'activité.",
  },
  {
    id: 'ch1-q7', question: "Quel est le capital minimum légal d'une SARL en RDC depuis l'arrêté du 30 décembre 2014 ?",
    options: [
      { id: 'a', texte: "1 000 000 FCFA comme dans tout l'espace OHADA" },
      { id: 'b', texte: '500 000 FCFA' },
      { id: 'c', texte: 'Librement fixé par les associés : aucun minimum légal' },
      { id: 'd', texte: '100 000 FCFA' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 311 AUSCGIE · Arrêté interministériel RDC du 30/12/2014',
    explication: "L'Art. 311 AUSCGIE fixe le capital minimum de la SARL à un million de FCFA « sauf dispositions nationales contraires » : la règle est supplétive depuis la révision de 2014. La RDC a utilisé cette faculté par l'arrêté interministériel n° 002 et n° 243 du 30 décembre 2014 : le capital de la SARL y est librement fixé par les associés en tenant compte de l'objet social.",
  },
  {
    id: 'ch1-q8', question: "En RDC, les statuts d'une SARL doivent-ils obligatoirement être authentifiés par un notaire ?",
    options: [
      { id: 'a', texte: 'Oui, toujours' },
      { id: 'b', texte: 'Non : le recours au notaire est facultatif depuis la réforme de 2014' },
      { id: 'c', texte: 'Oui, sauf pour les SARL unipersonnelles' },
      { id: 'd', texte: 'Non, jamais : les statuts notariés sont interdits en RDC' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 10 AUSCGIE · Arrêté interministériel RDC du 30/12/2014',
    explication: "L'Art. 10 AUSCGIE impose en principe l'acte notarié ou tout acte offrant des garanties d'authenticité, mais « sauf dispositions nationales contraires ». La RDC a saisi cette ouverture : depuis l'arrêté interministériel du 30 décembre 2014, les statuts d'une SARL peuvent être établis par acte sous seing privé, le recours au notaire restant possible mais facultatif.",
  },
  {
    id: 'ch1-q9', question: 'Quel est le délai légal maximum pour créer une entreprise au GUCE en RDC ?',
    options: [
      { id: 'a', texte: '7 jours ouvrables' },
      { id: 'b', texte: '30 jours calendaires' },
      { id: 'c', texte: '3 jours ouvrables' },
      { id: 'd', texte: '24 heures' },
    ],
    reponseCorrecte: 'c', articleRef: 'Décret n° 14/014 du 08/05/2014 (GUCE)',
    explication: "Le Guichet Unique de Création d'Entreprise, institué par le décret n° 14/014 du 8 mai 2014, doit délivrer l'ensemble des documents constitutifs dans un délai maximum de trois (3) jours ouvrables à compter du dépôt du dossier complet - RCCM, numéro d'identification fiscale, identité nationale et immatriculations sociales en un seul retrait.",
  },
  {
    id: 'ch1-q10', question: 'Quel événement confère à une société sa personnalité juridique ?',
    options: [
      { id: 'a', texte: 'La signature des statuts' },
      { id: 'b', texte: 'Le dépôt des fonds en banque' },
      { id: 'c', texte: "L'immatriculation au registre du commerce et du crédit mobilier" },
      { id: 'd', texte: "L'autorisation du Ministère du Commerce" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 98 et 101 AUSCGIE',
    explication: "L'Art. 98 AUSCGIE : toute société jouit de la personnalité juridique à compter de son immatriculation au RCCM, à moins que l'Acte uniforme n'en dispose autrement. La société est constituée dès la signature des statuts (Art. 101), mais avant son immatriculation son existence n'est pas opposable aux tiers - qui peuvent néanmoins s'en prévaloir.",
  },
  {
    id: 'ch1-q11', question: "Un pacte d'associés est-il opposable à la société elle-même ?",
    options: [
      { id: 'a', texte: 'Oui, toujours' },
      { id: 'b', texte: "Oui, s'il est signé par le gérant" },
      { id: 'c', texte: "Non, sauf si ses clauses sont reprises dans les statuts" },
      { id: 'd', texte: 'Non, jamais, en aucun cas' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 2-1 AUSCGIE',
    explication: "L'Art. 2-1 AUSCGIE consacre les conventions extra-statutaires, conclues « sous réserve du respect des dispositions du présent Acte uniforme auxquelles il ne peut être dérogé et des clauses statutaires ». Elles lient leurs signataires entre eux ; pour être opposables à la société et aux tiers, leurs règles doivent être reprises dans les statuts. La violation d'un pacte se résout en principe en responsabilité civile entre signataires.",
  },
  {
    id: 'ch1-q12', question: 'Les époux MUTOMBO veulent créer une SNC à Kinshasa, à eux deux. Cette association est-elle possible ?',
    options: [
      { id: 'a', texte: "Oui, les époux peuvent s'associer dans toutes les formes" },
      { id: 'b', texte: 'Non : la SNC rend les associés indéfiniment et solidairement responsables, ce qui est interdit entre époux' },
      { id: 'c', texte: 'Oui, si leur capital est supérieur à 1 000 000 FCFA' },
      { id: 'd', texte: 'Oui, uniquement si un seul époux est gérant' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 9, 270 et 74-1 AUSCGIE',
    explication: "L'Art. 9 AUSCGIE interdit aux époux d'être associés d'une société dans laquelle ils seraient tenus des dettes sociales indéfiniment ou solidairement. Or l'Art. 270 définit la SNC comme la société dans laquelle tous les associés sont commerçants et répondent indéfiniment et solidairement des dettes sociales. Et l'Art. 74-1 sanctionne de nullité les sociétés constituées en violation de l'Art. 9. Les époux peuvent en revanche être coassociés d'une SARL, d'une SA ou d'une SAS - ou commanditaires d'une SCS.",
  },
  {
    id: 'ch1-q13', question: "Lorsqu'une société est déclarée nulle, quel est le sort des actes accomplis avant l'annulation ?",
    options: [
      { id: 'a', texte: 'Tous les actes sont annulés rétroactivement' },
      { id: 'b', texte: "La nullité met fin au contrat sans rétroactivité et reste inopposable aux tiers de bonne foi" },
      { id: 'c', texte: "Les actes sont suspendus jusqu'à la liquidation" },
      { id: 'd', texte: 'Les dirigeants remboursent personnellement toutes les dettes' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 253 et 255 AUSCGIE',
    explication: "L'Art. 253 AUSCGIE : la nullité prononcée met fin, SANS rétroactivité, à l'exécution du contrat - il est procédé à la dissolution et, pour les sociétés pluripersonnelles, à la liquidation. Et l'Art. 255 interdit à la société comme aux associés de se prévaloir d'une nullité à l'égard des tiers de bonne foi - seule la nullité pour vice de consentement ou incapacité leur est opposable, par l'incapable ou la victime du vice.",
  },
  {
    id: 'ch1-q14', question: "Quelle est la durée maximale d'une société commerciale selon l'AUSCGIE ?",
    options: [
      { id: 'a', texte: '50 ans' },
      { id: 'b', texte: '75 ans' },
      { id: 'c', texte: '99 ans' },
      { id: 'd', texte: 'Illimitée si les statuts ne fixent pas de terme' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 28 AUSCGIE',
    explication: "L'Art. 28 AUSCGIE : toute société a une durée, mentionnée dans ses statuts, qui ne peut excéder quatre-vingt-dix-neuf (99) ans. Le point de départ est la date d'immatriculation au RCCM (Art. 29), et l'arrivée du terme entraîne la dissolution de plein droit sauf prorogation décidée dans les conditions des Art. 32 et suivants (Art. 30).",
  },
  {
    id: 'ch1-q15', question: "Les titres sociaux issus d'un apport en industrie peuvent-ils être cédés ?",
    options: [
      { id: 'a', texte: 'Oui, librement, comme toute part sociale' },
      { id: 'b', texte: 'Oui, avec accord unanime des associés' },
      { id: 'c', texte: 'Non : ils ne sont ni cessibles ni transmissibles' },
      { id: 'd', texte: "Oui, à condition que le cessionnaire assume aussi l'obligation de service" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 50-4 AUSCGIE',
    explication: "L'Art. 50-4 AUSCGIE : les titres sociaux résultant d'apports en industrie ne sont ni cessibles ni transmissibles, et ils n'ont pas de valeur nominale. Les statuts déterminent en outre les modalités de leur liquidation en cas de cessation par l'apporteur de l'activité faisant l'objet de son apport (Art. 50-2).",
  },
  {
    id: 'ch1-q16', question: "Les droits de vote attachés aux titres issus d'apports en industrie ne peuvent pas dépasser :",
    options: [
      { id: 'a', texte: "10% de l'ensemble des droits de vote" },
      { id: 'b', texte: "25% de l'ensemble des droits de vote" },
      { id: 'c', texte: "50% de l'ensemble des droits de vote" },
      { id: 'd', texte: 'Aucune limite : les statuts fixent librement' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 50-3 AUSCGIE',
    explication: "L'Art. 50-3 AUSCGIE pose un double plafond de vingt-cinq pour cent (25%) : les droits de vote attachés aux titres issus d'apports en industrie ne peuvent excéder 25% de l'ensemble des droits de vote, et la part totale attachée à ces titres ne peut excéder 25% des bénéfices, de l'actif net et des pertes de la société.",
  },
  {
    id: 'ch1-n1', question: "Un associé peut-il apporter à la société autre chose que du numéraire, un bien en nature ou son industrie ?",
    options: [
      { id: 'a', texte: 'Oui, tout apport est possible si les statuts le prévoient' },
      { id: 'b', texte: "Non : l'Art. 40 énumère les trois types d'apports et interdit tout autre apport" },
      { id: 'c', texte: "Oui, avec l'accord du commissaire aux comptes" },
      { id: 'd', texte: 'Oui, dans les seules SAS' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 40 AUSCGIE',
    explication: "L'Art. 40 AUSCGIE énumère limitativement les apports : de l'argent (apport en numéraire), des droits portant sur des biens en nature, mobiliers ou immobiliers, corporels ou incorporels (apport en nature), et des connaissances techniques ou professionnelles ou des services (apport en industrie) - et conclut : « Tout autre apport est interdit ». Chaque associé doit faire un apport (Art. 37), dont il est débiteur envers la société.",
  },
  {
    id: 'ch1-n2', question: "Une AGE votée à 95% peut-elle imposer à un associé un versement supplémentaire au-delà de son apport ?",
    options: [
      { id: 'a', texte: 'Oui, la majorité qualifiée suffit' },
      { id: 'b', texte: "Non : en aucun cas les engagements d'un associé ne peuvent être augmentés sans son consentement" },
      { id: 'c', texte: 'Oui, si les statuts le prévoient' },
      { id: 'd', texte: "Oui, avec l'autorisation du tribunal" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 72 AUSCGIE',
    explication: "L'Art. 72 al. 2 AUSCGIE est catégorique : « En aucun cas, les engagements d'un associé ne peuvent être augmentés sans le consentement de celui-ci. » Aucune majorité, même écrasante, ne peut imposer un appel de fonds supplémentaire, une transformation aggravant la responsabilité ou toute charge nouvelle à un associé qui n'y consent pas personnellement.",
  },
  {
    id: 'ch1-n3', question: "Quelles violations entraînent la nullité de la société selon l'Art. 74-1 AUSCGIE ?",
    options: [
      { id: 'a', texte: 'Toute irrégularité dans les statuts' },
      { id: 'b', texte: 'Les violations des Art. 7, 8, 9, 20, 37 al. 1er et 40 (incapacités, époux, objet illicite, absence ou nature prohibée des apports)' },
      { id: 'c', texte: "Uniquement le défaut d'immatriculation" },
      { id: 'd', texte: 'Le seul défaut de capital minimum' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 74-1 AUSCGIE',
    explication: "L'Art. 74-1 AUSCGIE dispose que sont nulles les sociétés constituées en violation des Art. 7 (interdictions, incapacités, incompatibilités), 8 (mineurs et majeurs incapables dans les sociétés à risque illimité), 9 (époux tenus indéfiniment ou solidairement), 20 (objet licite), 37 al. 1er (obligation d'apport) et 40 (types d'apports autorisés). Pour les simples irrégularités de forme, l'Acte uniforme préfère la régularisation : action sous astreinte de l'Art. 75, prescrite par trois ans (Art. 77).",
  },
  {
    id: 'ch1-n4', question: 'À la constitution, les apports en numéraire d\'une SARL doivent être libérés :',
    options: [
      { id: 'a', texte: 'Intégralement, sans exception' },
      { id: 'b', texte: "De la moitié au moins de leur valeur nominale, le surplus dans les 2 ans de l'immatriculation" },
      { id: 'c', texte: "Du quart au moins, le surplus dans les 5 ans" },
      { id: 'd', texte: 'Librement, selon les statuts' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 41 et 311-1 AUSCGIE',
    explication: "Le principe de l'Art. 41 est la libération intégrale des apports en numéraire lors de la constitution, « sauf disposition contraire du présent Acte uniforme ». Pour la SARL, l'Art. 311-1 permet la libération de la moitié au moins à la souscription, le surplus intervenant en une ou plusieurs fois dans un délai de deux (2) ans à compter de l'immatriculation. Pour la SA, l'Art. 389 admet le quart au moins, avec libération du surplus dans les trois (3) ans. Les apports en nature, eux, sont toujours intégralement libérés (Art. 45).",
  },
  {
    id: 'ch1-n5', question: 'Tous les titres d\'une SNC se retrouvent entre les mains d\'un seul associé. La société est-elle dissoute de plein droit ?',
    options: [
      { id: 'a', texte: 'Oui, immédiatement' },
      { id: 'b', texte: "Non : tout intéressé peut demander la dissolution en justice si la situation n'est pas régularisée dans le délai d'un an" },
      { id: 'c', texte: 'Oui, après 6 mois' },
      { id: 'd', texte: 'Non, elle devient automatiquement une SARL unipersonnelle' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 60 AUSCGIE',
    explication: "L'Art. 60 AUSCGIE : dans les sociétés dont la forme unipersonnelle n'est pas autorisée (SNC, SCS), la détention par un seul associé de tous les titres n'entraîne pas la dissolution de plein droit. Tout intéressé peut demander la dissolution en justice si la situation n'a pas été régularisée dans le délai d'un (1) an ; la juridiction peut accorder un délai maximal de six (6) mois supplémentaires, et ne peut prononcer la dissolution si la régularisation a eu lieu au jour où elle statue au fond.",
  },
  {
    id: 'ch1-n6', question: "À quel moment une société est-elle « constituée » au sens de l'AUSCGIE ?",
    options: [
      { id: 'a', texte: 'À son immatriculation au RCCM' },
      { id: 'b', texte: "À la signature de ses statuts ou à leur adoption par l'assemblée générale constitutive" },
      { id: 'c', texte: 'Au dépôt des fonds en banque' },
      { id: 'd', texte: "À la publication de l'avis de constitution" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 100-101 AUSCGIE',
    explication: "Il faut distinguer trois moments : la société est « en formation » tant qu'elle n'est pas constituée (Art. 100) ; elle est « constituée » à compter de la signature de ses statuts ou de leur adoption par l'assemblée générale constitutive (Art. 101) ; elle acquiert la personnalité juridique à son immatriculation au RCCM (Art. 98). Avant l'immatriculation, son existence n'est pas opposable aux tiers - mais ceux-ci peuvent s'en prévaloir (Art. 101 al. 2).",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '1.1',
    titre: "L'OHADA et le champ d'application de l'AUSCGIE (Art. 1-3)",
    navLabel: "1.1 L'OHADA",
    blocs: [
      { type: 'paragraphe', texte: "L'**Organisation pour l'Harmonisation en Afrique du Droit des Affaires (OHADA)** est née du **Traité de Port-Louis du 17 octobre 1993**, révisé à Québec le 17 octobre 2008. Elle regroupe **17 États parties**, dont la **République Démocratique du Congo** depuis le **12 septembre 2012**. Son instrument central est l'**Acte uniforme**, directement applicable dans tous les États parties. Le droit des sociétés relève de l'**AUSCGIE** - Acte uniforme relatif au droit des sociétés commerciales et du groupement d'intérêt économique - adopté dans sa version révisée le **30 janvier 2014 à Ouagadougou** et publié au Journal officiel de l'OHADA du 4 février 2014. La **CCJA** (Cour Commune de Justice et d'Arbitrage) en assure l'interprétation uniforme." },
      { type: 'filet', titre: "Le critère unique : le siège social (Art. 1)", texte: "« Toute société commerciale, y compris celle dans laquelle un État ou une personne morale de droit public est associé, dont le **siège social** est situé sur le territoire de l'un des États parties [...] est soumise aux dispositions du présent Acte uniforme. » La nationalité des associés, celle des dirigeants et le lieu d'activité sont **sans incidence** : une société au siège fixé à Kinshasa est soumise à l'AUSCGIE même si tous ses associés sont étrangers. Le GIE est également soumis à l'Acte uniforme, et les sociétés demeurent régies par les **lois nationales non contraires** de l'État du siège (Art. 1 al. 3) : le droit national comble les silences, il ne contredit pas." },
      { type: 'carte', titre: "Ce que l'Art. 1 emporte en pratique", tableau: { entetes: ['Règle', 'Signification', 'Exemple'], lignes: [
        ['Critère exclusif du siège social', "Seul le lieu du siège détermine l'application de l'AUSCGIE", 'SARL au siège à Kinshasa : soumise à l\'AUSCGIE même si ses associés sont tous français'],
        ["Sociétés d'État incluses", "Les sociétés où l'État ou une personne morale de droit public est associé sont soumises à l'AUSCGIE", "Les sociétés commerciales publiques congolaises relèvent de l'AUSCGIE"],
        ['Primauté du droit uniforme', "Les lois nationales ne s'appliquent que si elles ne sont pas contraires (Art. 1 al. 3 ; Art. 10 du Traité)", "Une loi congolaise contraire à l'AUSCGIE est écartée dans ce domaine"],
        ['Liberté encadrée des statuts', "Les statuts ne peuvent déroger à l'Acte uniforme que là où il l'autorise ; toute clause contraire est réputée non écrite (Art. 2)", "Une clause statutaire contraire à une règle impérative disparaît, les statuts demeurent"],
      ] } },
      { type: 'paragraphe', texte: "Avant 2012, la RDC appliquait encore le décret du 27 février 1887 sur les sociétés commerciales, plusieurs fois retouché mais inadapté aux réalités modernes. L'adhésion à l'OHADA a substitué à ce droit hérité un corpus moderne partagé avec seize autres États : l'ancienne SPRL congolaise correspond désormais à la **SARL** OHADA, l'ancienne « société par actions à responsabilité limitée » à la **SA**, et la révision de 2014 a apporté des institutions nouvelles - **SAS**, apports en industrie encadrés, conventions extra-statutaires (Art. 2-1). Enfin, toute personne, quelle que soit sa nationalité, qui souhaite exercer en société une activité commerciale dans un État partie **doit choisir l'une des formes prévues** par l'Acte uniforme, ou s'associer en GIE (Art. 3)." },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
    ],
  },
  {
    numero: '1.2',
    titre: "La définition de la société et la qualité d'associé (Art. 4-9)",
    navLabel: '1.2 Définition et associés',
    blocs: [
      { type: 'filet', titre: 'La définition légale (Art. 4)', texte: "« La société commerciale est créée par deux (2) ou plusieurs personnes qui conviennent, par un contrat, d'affecter à une activité des biens en numéraire ou en nature, ou de l'industrie, dans le but de partager le bénéfice ou de profiter de l'économie qui peut en résulter. Les associés s'engagent à contribuer aux pertes dans les conditions prévues par le présent Acte uniforme. » Et l'alinéa 2 ajoute : « La société commerciale est créée **dans l'intérêt commun des associés**. »" },
      { type: 'paragraphe', texte: "Trois **éléments constitutifs** se dégagent de ce texte. **1° Les apports** : chaque associé doit apporter quelque chose - argent, bien ou industrie (Art. 37, 40). **2° La vocation aux résultats** : partager le bénéfice ou profiter de l'économie, et contribuer aux pertes - la privation totale de l'un ou de l'autre est léonine (Art. 54 al. 2). **3° L'*affectio societatis*** : la volonté de collaborer à une œuvre commune, dans l'intérêt commun, sur un pied d'égalité relative - c'est elle qui distingue l'associé du salarié (subordonné), du prêteur (créancier d'un intérêt fixe) ou du simple client, et c'est elle que le juge recherche pour reconnaître une **société créée de fait** entre personnes qui se comportent comme des associés sans avoir constitué de société (Art. 864)." },
      { type: 'carte', titre: "L'associé unique : l'exception organisée (Art. 5)", texte: "« La société commerciale peut être également créée, dans les cas prévus par le présent Acte uniforme, par une seule personne, dénommée 'associé unique', par un acte écrit. » L'Art. 5 renvoie donc aux textes propres à chaque forme :", tableau: { entetes: ['Forme unipersonnelle', 'Base légale', 'Ce que dit le texte'], lignes: [
        ['SARL unipersonnelle', 'Art. 309 al. 2', 'La SARL « peut être instituée par une personne physique ou morale »'],
        ['SA unipersonnelle', 'Art. 385 al. 2', "« La société anonyme peut ne comprendre qu'un seul actionnaire »"],
        ['SAS unipersonnelle (SASU)', 'Art. 853-1 et 853-2', "La SAS est « instituée par un ou plusieurs associés » ; l'associé unique exerce les pouvoirs dévolus aux associés, et la société prend le sigle SASU"],
      ] }, note: "La SNC et la SCS ne peuvent pas être unipersonnelles : leur régime suppose au moins deux associés. Si tous les titres d'une telle société se réunissent en une seule main, il n'y a pas dissolution de plein droit : tout intéressé peut demander la dissolution en justice si la situation n'est pas régularisée dans **un (1) an**, le juge pouvant accorder six (6) mois de plus (Art. 60)." },
      { type: 'filet', titre: "Qui peut être associé ? (Art. 7-9)", texte: "Ne peut être associée la personne frappée d'une **interdiction, incapacité ou incompatibilité** légale ou réglementaire (Art. 7). Les **mineurs et majeurs incapables** ne peuvent être associés d'une société où ils seraient tenus des dettes sociales **au-delà de leurs apports** (Art. 8) - la SARL leur est ouverte, la SNC leur est fermée. Et des **époux** ne peuvent être associés d'une société dans laquelle ils seraient tenus des dettes sociales **indéfiniment ou solidairement** (Art. 9) : pas de SNC entre époux, pas de double commandite - mais rien n'interdit aux époux d'être coassociés d'une SARL, d'une SA, d'une SAS, ou commanditaires d'une SCS. La violation de ces trois articles est sanctionnée par la **nullité de la société** (Art. 74-1)." },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[11] },
    ],
  },
  {
    numero: '1.3',
    titre: 'Les apports et le capital social (Art. 37-50-4, 61-72)',
    navLabel: '1.3 Apports et capital',
    blocs: [
      { type: 'paragraphe', texte: "**Chaque associé doit faire un apport** à la société, dont il est débiteur envers elle (Art. 37) ; en contrepartie, il reçoit des **titres sociaux** (Art. 38). L'Art. 40 énumère limitativement les trois types d'apports - numéraire, nature, industrie - et conclut : « **Tout autre apport est interdit.** » Les apports en **numéraire** sont en principe libérés intégralement lors de la constitution, sauf disposition contraire de l'Acte uniforme (Art. 41) : la SARL admet la libération de la **moitié** au moins, le surplus sous **deux (2) ans** (Art. 311-1) ; la SA admet le **quart**, le surplus sous **trois (3) ans** (Art. 389). Le retard de versement porte de plein droit intérêt au taux légal (Art. 43). Les apports en **nature** - transfert de droits réels ou personnels et mise à disposition effective des biens - sont **toujours libérés intégralement** à la constitution (Art. 45) ; l'apporteur en propriété garantit la société comme un vendeur, l'apporteur en jouissance comme un bailleur (Art. 46-47). Les associés évaluent ces apports, sous le contrôle d'un **commissaire aux apports** dans les cas prévus (Art. 49) - obligatoire en SARL dès que la valeur des apports en nature dépasse **cinq millions (5 000 000) de FCFA** (Art. 312), et systématique dans la SA (Art. 400)." },
      { type: 'carte', titre: "L'apport en industrie : le régime de la révision de 2014 (Art. 50-1 à 50-4)", liste: [
        "**Définition (Art. 50-1)** : mise à disposition effective de connaissances techniques ou professionnelles ou de services. Les apports en industrie sont **interdits dans les sociétés anonymes**.",
        "**Obligations de l'apporteur (Art. 50-2)** : rendre la contribution promise et rendre compte de **tous les gains réalisés** par l'activité faisant l'objet de son apport. Les statuts décrivent l'apport, la durée des prestations, le nombre de titres attribués et leurs droits, ainsi que les modalités de liquidation des titres en cas de cessation de l'activité.",
        "**Hors capital, double plafond (Art. 50-3)** : les apports en industrie **ne concourent pas à la formation du capital social**, mais donnent droit au vote et au partage des bénéfices et de l'actif net, à charge de contribuer aux pertes. Les droits de vote attachés à ces titres ne peuvent dépasser **25%** de l'ensemble des droits de vote, et la part totale de ces titres ne peut excéder **25%** des bénéfices, de l'actif net et des pertes.",
        "**Titres verrouillés (Art. 50-4)** : ni cessibles ni transmissibles, sans valeur nominale - l'apport est attaché à la personne de l'apporteur.",
      ] },
      { type: 'carte', titre: 'Le capital social (Art. 61-72)', tableau: { entetes: ['Règle', 'Contenu', 'Article'], lignes: [
        ['Existence', 'Toute société a un capital social indiqué dans ses statuts', 'Art. 61'],
        ['Composition', "Montant des apports en capital, augmenté le cas échéant des incorporations de réserves, bénéfices ou primes", 'Art. 62'],
        ['Montant', "**Librement déterminé par les associés**, sauf minimum fixé par l'Acte uniforme en raison de la forme ou de l'objet", 'Art. 65'],
        ['Sanction du minimum', "Sous le minimum, la société ne peut être valablement constituée ; si le capital y descend en cours de vie, dissolution à moins d'une recapitalisation", 'Art. 66'],
        ['Fixité et variations', "Le capital est fixe ; il peut être augmenté ou réduit aux conditions de modification des statuts - ou variable dans les cas des Art. 269-1 s.", 'Art. 67-71'],
      ] }, note: "Verrou absolu de l'Art. 72 al. 2 : « En aucun cas, les engagements d'un associé ne peuvent être augmentés sans le consentement de celui-ci. » Aucune majorité ne peut imposer un versement supplémentaire ou une charge nouvelle à un associé qui la refuse." },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[16] },
      { type: 'controle', question: QCM[19] },
    ],
  },
  {
    numero: '1.4',
    titre: "Les formes sociales reconnues et la commercialité (Art. 6)",
    navLabel: '1.4 Les formes sociales',
    blocs: [
      { type: 'paragraphe', texte: "L'AUSCGIE reconnaît **cinq formes de sociétés commerciales** et le **GIE**. L'Art. 6 pose la règle de la commercialité : le caractère commercial d'une société est déterminé **par sa forme ou par son objet**, et sont commerciales **à raison de leur forme et quel que soit leur objet** les SNC, SCS, SARL, SA et SAS - une SARL de conseil exerçant une activité civile reste une société commerciale. Le choix de la forme détermine le régime de responsabilité, la gouvernance, les formalités et la capacité à lever des capitaux." },
      { type: 'carte', titre: 'Panorama des cinq formes (approfondies aux chapitres 3 à 6)', tableau: { entetes: ['Forme', 'Sigle', 'Catégorie', 'Responsabilité des associés', 'Capital minimum OHADA', 'Associés'], lignes: [
        ['Société en nom collectif', 'SNC', 'Personnes', '**Indéfinie et solidaire** pour tous - tous commerçants (Art. 270)', 'Libre', '2 au moins'],
        ['Société en commandite simple', 'SCS', 'Personnes (mixte)', 'Commandités : indéfinie et solidaire · Commanditaires : limitée aux apports', 'Libre', '1 commandité + 1 commanditaire'],
        ['Société à responsabilité limitée', 'SARL', 'Mixte', 'Limitée aux apports (Art. 309)', "1 000 000 FCFA **sauf dispositions nationales contraires** (Art. 311) - libre en RDC", '1 (SARL-U) ou plus'],
        ['Société anonyme', 'SA', 'Capitaux', 'Limitée aux apports (Art. 385)', '**10 000 000 FCFA** (Art. 387)', '1 (SA-U) ou plus'],
        ['Société par actions simplifiée', 'SAS', 'Capitaux', 'Limitée aux apports (Art. 853-1)', 'Libre', '1 (SASU) ou plus'],
      ] }, note: "Le **GIE** n'est pas une société : c'est un groupement de moyens au service de l'activité de ses membres, étudié au chapitre 6. Les sociétés de personnes reposent sur l'*intuitu personae* - l'identité des associés prime, les cessions sont verrouillées - tandis que les sociétés de capitaux privilégient le capital investi et la protection du patrimoine personnel." },
      { type: 'carte', titre: 'Choisir sa forme : les critères pratiques', tableau: { entetes: ['Priorité du projet', 'Forme indiquée', 'Raison'], lignes: [
        ['Protéger le patrimoine personnel', 'SARL, SA ou SAS', 'Responsabilité limitée aux apports'],
        ['Simplicité et faible capital', 'SARL', 'Capital libre en RDC, formalités allégées depuis 2014'],
        ["Faire appel public à l'épargne", 'SA', "Seule forme admise à l'appel public à l'épargne - la SAS l'a expressément interdit (Art. 853-4)"],
        ['Liberté statutaire maximale', 'SAS', "Les statuts organisent librement le fonctionnement, sous réserve des règles impératives (Art. 853-1)"],
        ['Confiance entre partenaires', 'SNC', 'Structure fermée, adaptée aux projets familiaux - au prix de la responsabilité illimitée'],
        ['Investisseurs passifs + gestionnaires', 'SCS', 'Les commandités gèrent, les commanditaires financent sans gérer'],
      ] } },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[20] },
    ],
  },
  {
    numero: '1.5',
    titre: 'Les statuts, la durée et la modification du pacte social (Art. 10-36, 72)',
    navLabel: '1.5 Statuts et durée',
    blocs: [
      { type: 'paragraphe', texte: "Les statuts constituent soit le **contrat de société**, soit l'**acte de volonté** de l'associé unique (Art. 12). Ils sont établis par **acte notarié** ou par tout acte offrant des garanties d'authenticité déposé au rang des minutes d'un notaire - mais « **sauf dispositions nationales contraires** » (Art. 10) : c'est cette réserve qui a permis à la RDC d'admettre l'acte sous seing privé. L'Art. 13 impose **treize mentions obligatoires** : forme, dénomination et sigle, objet social, siège, durée, identité des apporteurs en numéraire, en nature et en industrie avec leurs apports et titres reçus, bénéficiaires d'avantages particuliers, montant du capital, nombre et valeur des titres émis, clauses de répartition du résultat, de constitution des réserves et de répartition du boni de liquidation, et modalités de fonctionnement." },
      { type: 'carte', titre: 'Dénomination, objet, siège (Art. 14-27)', liste: [
        "**Dénomination sociale** (Art. 14-18) : obligatoire, distincte de celle de toute société déjà immatriculée (Art. 16), portée sur tous les documents destinés aux tiers avec la forme, le capital, l'adresse du siège et le numéro RCCM (Art. 17).",
        "**Objet social** (Art. 19-22) : l'activité entreprise, déterminée et décrite dans les statuts ; il doit être **licite** (Art. 20) - à peine de nullité de la société (Art. 74-1) - et les activités réglementées imposent leurs règles particulières (Art. 21).",
        "**Siège social** (Art. 23-27) : fixé au lieu du principal établissement ou au centre de direction administrative et financière (Art. 24) ; une simple boîte postale ne suffit pas (Art. 25). Les tiers peuvent se prévaloir du siège statutaire, mais la société ne peut le leur opposer si le siège réel est ailleurs (Art. 26). Le transfert dans la même ville relève d'une simple décision des organes de gérance ou d'administration (Art. 27).",
      ] },
      { type: 'filet', titre: 'La durée : 99 ans, prorogeables (Art. 28-36)', texte: "Toute société a une durée, mentionnée dans les statuts, qui **ne peut excéder 99 ans** (Art. 28) ; elle court de l'**immatriculation au RCCM** (Art. 29). L'arrivée du terme entraîne la **dissolution de plein droit**, sauf prorogation décidée à temps (Art. 30). La durée peut être prorogée **une ou plusieurs fois**, aux conditions de modification des statuts (Art. 32-33), sans création d'une personne juridique nouvelle (Art. 34). Garde-fou : les associés doivent être consultés sur la prorogation **un (1) an au moins avant** l'expiration (Art. 35) ; à défaut, tout associé peut faire désigner en justice un **mandataire ad hoc** chargé de provoquer la consultation (Art. 36). Enfin, les statuts se modifient aux conditions propres à chaque forme, avec le verrou de l'Art. 72 al. 2 : jamais d'augmentation des engagements d'un associé sans son consentement." },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[17] },
    ],
  },
  {
    numero: '1.6',
    titre: "Naître à la vie juridique : immatriculation, publicité et guichet unique congolais",
    navLabel: '1.6 Créer sa société en RDC',
    blocs: [
      { type: 'paragraphe', texte: "La chronologie de la naissance d'une société comporte trois moments distincts. La société est **en formation** tant qu'elle n'est pas constituée (Art. 100) ; elle est **constituée** dès la signature de ses statuts ou leur adoption par l'assemblée générale constitutive (Art. 101) ; elle acquiert la **personnalité juridique à son immatriculation au RCCM** (Art. 98) - avant quoi son existence n'est pas opposable aux tiers, qui peuvent néanmoins s'en prévaloir. Les fondateurs et premiers dirigeants déposent au RCCM une **déclaration de régularité et de conformité**, exigée **à peine de rejet de la demande d'immatriculation** (Art. 73), sauf lorsqu'une déclaration notariée de souscription et de versement en tient lieu (Art. 74). Dans les **quinze (15) jours suivant l'immatriculation**, un **avis** est inséré dans un journal habilité à recevoir les annonces légales (Art. 261), dont l'Art. 262 détaille le contenu - objet, durée, apports, associés tenus indéfiniment, premiers dirigeants et commissaires aux comptes, partie libérée du capital, avantages particuliers." },
      { type: 'filet', titre: 'La réforme congolaise du 30 décembre 2014 : le capital libre', texte: "L'Art. 311 AUSCGIE fixe le capital minimum de la SARL à un million de FCFA « **sauf dispositions nationales contraires** » - règle devenue supplétive avec la révision de 2014. La RDC a saisi cette faculté par l'**arrêté interministériel n° 002 et n° 243 du 30 décembre 2014** (Justice / PME) : le capital de la SARL y est **librement fixé par les associés en tenant compte de l'objet social**, les statuts peuvent être établis **sous seing privé** sans notaire (dans le prolongement de la réserve de l'Art. 10), et un simple **bordereau de versement bancaire** suffit comme preuve de libération. Prudence : capital libre ne signifie pas capital de complaisance - un capital dérisoire au regard de l'objet social expose les fondateurs et fragilise le crédit de la société auprès des banques et fournisseurs." },
      { type: 'carte', titre: 'Créer sa société au GUCE (décret n° 14/014 du 8 mai 2014)', liste: [
        "**1. Choix de la forme et vérification de la dénomination** au RCCM - une société ne peut prendre la dénomination d'une société déjà immatriculée (Art. 16).",
        "**2. Rédaction des statuts** avec les treize mentions obligatoires de l'Art. 13 - sous seing privé ou par acte notarié, au choix.",
        "**3. Dépôt du capital en banque** au nom de la société en formation, avec bordereau de versement (SARL : moitié au moins libérée, Art. 311-1).",
        "**4. Constitution du dossier** : demande d'immatriculation, statuts, bordereau bancaire, procès-verbaux, formulaire unique, pièces d'identité, justificatif du siège.",
        "**5. Dépôt au Guichet Unique de Création d'Entreprise** et paiement des frais officiels.",
        "**6. Retrait, sous trois (3) jours ouvrables**, de l'ensemble des documents : RCCM (qui emporte la personnalité juridique, Art. 98), numéro d'identification fiscale, identité nationale et immatriculations sociales.",
        "**7. Publication de l'avis de constitution** dans un journal d'annonces légales dans les 15 jours de l'immatriculation (Art. 261-262).",
        "**8. Immatriculation à la CNSS** en cas d'embauche de salariés - cotisations du régime général : pensions 10% (5% employeur, 5% travailleur), prestations aux familles 6,5% et risques professionnels 1,5% à charge de l'employeur (décret n° 18/041 du 24 novembre 2018).",
        "**9. Agréments sectoriels** éventuels (banque, mines, assurance, pharmacie...), obtenus auprès des régulateurs compétents avant le démarrage de l'activité réglementée (Art. 21).",
      ] },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[21] },
    ],
  },
  {
    numero: '1.7',
    titre: "Pactes d'associés et nullités de la constitution (Art. 2-1, 74-1 à 80)",
    navLabel: '1.7 Pactes et nullités',
    blocs: [
      { type: 'filet', titre: 'Les conventions extra-statutaires (Art. 2-1)', texte: "Introduit par la révision de 2014, l'Art. 2-1 consacre les **pactes d'associés** : « Sous réserve du respect des dispositions du présent Acte uniforme auxquelles il ne peut être dérogé et des clauses statutaires, les associés peuvent conclure des conventions extra-statutaires en vue notamment d'organiser, selon les modalités qu'ils ont librement arrêtées : les **relations entre associés** ; la **composition des organes sociaux** ; la **conduite des affaires** de la société ; l'**accès au capital social** ; la **transmission des titres sociaux**. »" },
      { type: 'carte', titre: 'Le pacte en pratique', tableau: { entetes: ['Caractéristique', 'Règle', 'Conséquence'], lignes: [
        ['Forme et confidentialité', "Libre, non publié au RCCM", 'Le contenu reste confidentiel entre signataires'],
        ['Clauses courantes', 'Préemption, inaliénabilité temporaire, sortie conjointe ou forcée, non-concurrence, gouvernance', "Organisation des entrées, des sorties et de la protection des minoritaires"],
        ['Double limite', "Respect des dispositions impératives de l'Acte uniforme ET des clauses statutaires (Art. 2-1)", "Une clause léonine est réputée non écrite même logée dans un pacte (Art. 54 al. 2) ; toute clause statutaire contraire à l'Acte uniforme l'est aussi (Art. 2)"],
        ['Opposabilité', 'Le pacte lie ses signataires', "Inopposable à la société et aux tiers sauf reprise dans les statuts ; sa violation se résout en responsabilité entre signataires"],
      ] } },
      { type: 'paragraphe', texte: "**Les nullités de la constitution.** L'Art. 74-1 énumère les violations qui rendent la société **nulle** : Art. 7 (interdictions, incapacités, incompatibilités), Art. 8 (mineurs et majeurs incapables tenus au-delà de leurs apports), Art. 9 (époux tenus indéfiniment ou solidairement), Art. 20 (objet licite), Art. 37 al. 1er (obligation d'apport) et Art. 40 (types d'apports autorisés). Pour le reste, l'Acte uniforme préfère la **régularisation** : si les statuts omettent des mentions obligatoires ou qu'une formalité a été omise ou irrégulièrement accomplie, tout intéressé - et le ministère public - peut demander en justice la régularisation **sous astreinte** (Art. 75) ; cette action se prescrit par **trois (3) ans** à compter de l'immatriculation ou de la publication de l'acte modificatif (Art. 77). Le régime général des nullités - extinction si la cause a cessé, délai pour couvrir, prescription triennale de l'action en nullité, absence de rétroactivité, protection des tiers de bonne foi (Art. 242 à 256) - est étudié au chapitre 10." },
      { type: 'filet', titre: 'La responsabilité des fondateurs (Art. 78-80)', texte: "Les fondateurs et les premiers membres des organes de gestion, de direction ou d'administration sont **solidairement responsables** du préjudice causé soit par le défaut d'une mention obligatoire dans les statuts, soit par l'omission ou l'accomplissement irrégulier d'une formalité de constitution (Art. 78). En cas de modification des statuts, les dirigeants alors en fonction encourent les mêmes responsabilités (Art. 79). L'action se prescrit par **trois (3) ans** à compter de l'immatriculation ou de la publication de l'acte modificatif (Art. 80)." },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[18] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas1',
    titre: 'La société KINSHASA TRADING',
    contexte: "Trois personnes d'affaires souhaitent créer une société commerciale à Kinshasa pour l'importation de marchandises. Elles veulent protéger leur patrimoine personnel, démarrer avec un capital modeste, et se demandent quelle forme choisir et quelles formalités accomplir.",
    questions: [
      { num: 1, enonce: "Quelles formes de sociétés commerciales l'AUSCGIE leur offre-t-il, et laquelle recommander ?", correction: "L'Art. 6 AUSCGIE reconnaît cinq formes commerciales par leur forme : SNC, SCS, SARL, SA et SAS. La SNC est à écarter : tous les associés y sont commerçants et répondent indéfiniment et solidairement des dettes sociales (Art. 270), ce qui contredit l'objectif de protection du patrimoine. La SA suppose un capital minimum de 10 000 000 FCFA (Art. 387). Restent la SARL et la SAS, toutes deux à responsabilité limitée aux apports (Art. 309 et 853-1) et sans capital minimum contraignant - la SARL bénéficiant en RDC du capital librement fixé par les associés (Art. 311 « sauf dispositions nationales contraires » et arrêté interministériel du 30 décembre 2014). Pour trois associés voulant un cadre éprouvé et des formalités simples, la SARL est la recommandation naturelle ; la SAS se justifierait pour une gouvernance sur mesure." },
      { num: 2, enonce: "Quels sont les trois éléments constitutifs de leur future société ?", correction: "L'Art. 4 AUSCGIE les révèle : (1) les apports - chaque associé doit apporter du numéraire, un bien en nature ou son industrie (Art. 37 et 40, qui interdit tout autre apport) ; (2) la vocation aux résultats - partager le bénéfice ou profiter de l'économie, et s'engager à contribuer aux pertes, sans clause léonine (Art. 54 al. 2) ; (3) l'affectio societatis - la volonté de collaborer à une œuvre commune dans l'intérêt commun des associés (Art. 4 al. 2). L'absence de l'un de ces éléments empêche la qualification de société ou expose à la requalification." },
      { num: 3, enonce: 'La personnalité morale naît-elle dès la signature des statuts ?', correction: "Non. La signature des statuts rend la société « constituée » (Art. 101), mais la personnalité juridique ne naît qu'à l'immatriculation au RCCM (Art. 98). Entre les deux, l'existence de la société n'est pas opposable aux tiers - même si ceux-ci peuvent s'en prévaloir (Art. 101 al. 2). En pratique congolaise, l'immatriculation s'obtient au Guichet Unique de Création d'Entreprise dans un délai de trois jours ouvrables (décret n° 14/014 du 8 mai 2014), et l'avis de constitution est publié dans un journal d'annonces légales dans les quinze jours de l'immatriculation (Art. 261)." },
    ],
  },
  {
    id: 'cas2',
    titre: "L'affectio societatis en question",
    contexte: "Deux entrepreneurs de Lubumbashi exploitent ensemble, depuis trois ans, un commerce de pièces détachées : ils ont financé le stock à parts égales, se partagent les bénéfices par moitié et prennent ensemble les décisions - mais n'ont jamais signé de statuts. L'un d'eux conteste aujourd'hui l'existence de toute société pour s'approprier le fonds.",
    questions: [
      { num: 1, enonce: 'Une société peut-elle exister sans statuts écrits ?', correction: "Oui, sous la figure de la société créée de fait. L'Art. 864 AUSCGIE dispose qu'il y a société créée de fait lorsque deux ou plusieurs personnes physiques ou morales se comportent comme des associés sans avoir constitué entre elles l'une des sociétés reconnues par l'Acte uniforme. Tout intéressé peut demander à la juridiction compétente la reconnaissance de cette société (Art. 866), et son existence se prouve par tout moyen (Art. 867) : factures communes, comptes partagés, témoignages. Le juge recherchera les trois éléments de l'Art. 4 : apports (le financement paritaire du stock), vocation aux bénéfices et aux pertes (le partage par moitié), et affectio societatis (la codirection du commerce)." },
      { num: 2, enonce: 'Quelles conséquences si le juge reconnaît la société créée de fait ?', correction: "L'Art. 868 AUSCGIE attache à la reconnaissance judiciaire une conséquence lourde : les règles de la société en nom collectif sont applicables aux associés. Chacun des deux exploitants répond donc indéfiniment et solidairement des dettes contractées pour le commerce (Art. 270), et la dissolution-liquidation de cette société obéira au droit commun. L'associé qui contestait l'existence de la société ne peut donc pas s'approprier le fonds : l'actif commun sera partagé selon les règles sociales. La leçon pratique : formaliser la société dès l'origine, car la société créée de fait offre la protection la plus faible - responsabilité illimitée et incertitude probatoire." },
    ],
  },
  {
    id: 'cas3',
    titre: "L'investisseur au rendement garanti",
    contexte: "Pour attirer M. KASONGO dans le capital de la SARL MBUJI AGRO, les autres associés lui promettent, par une clause des statuts, un « intérêt fixe de 15% l'an sur son apport, dû même en l'absence de bénéfices », et précisent qu'il « ne supportera aucune perte ». M. KASONGO apporte 40% du capital.",
    questions: [
      { num: 1, enonce: 'Ces clauses sont-elles valables ?', correction: "Non. L'Art. 54 AUSCGIE pose d'abord la règle supplétive de proportionnalité : sauf clause contraire, les droits et l'obligation de chaque associé sont proportionnels à ses apports - une répartition inégalitaire est donc en principe permise. Mais l'al. 2 répute non écrites les clauses attribuant à un associé la totalité du profit ou l'exonérant de la totalité des pertes, ainsi que celles excluant un associé totalement du profit ou mettant à sa charge la totalité des pertes. La clause exonérant M. KASONGO de toute perte est exactement une clause léonine : elle est réputée non écrite. Quant à l'« intérêt fixe dû même sans bénéfices », il contredit la définition même de l'associé (Art. 4 : partager le bénéfice ET contribuer aux pertes) : servir une rémunération garantie indépendante du résultat revient à l'exonérer des pertes, et le versement de sommes en l'absence de bénéfice distribuable heurte le mécanisme du droit aux bénéfices de l'Art. 53, 1°, qui suppose une distribution décidée. La clause encourt le même sort." },
      { num: 2, enonce: 'La société elle-même est-elle en péril ? Que reste-t-il à M. KASONGO ?', correction: "La société survit : la sanction de l'Art. 54 al. 2 est chirurgicale - la clause est réputée non écrite, le reste des statuts et la société demeurent. La nullité de la société elle-même n'est encourue que dans les cas de l'Art. 74-1 (violations des Art. 7, 8, 9, 20, 37 al. 1er et 40), qui ne visent pas la clause léonine. M. KASONGO redevient un associé ordinaire : ses droits aux bénéfices et sa contribution aux pertes se calculent proportionnellement à ses 40%, conformément à la règle supplétive de l'Art. 54 al. 1. S'il souhaite une rémunération privilégiée licite, la voie existe : un avantage particulier stipulé aux statuts (mentionné au titre de l'Art. 13, 9°) - par exemple un dividende prioritaire - qui module la répartition sans jamais atteindre la privation totale de l'un ou de l'autre côté." },
    ],
  },
  {
    id: 'cas4',
    titre: 'Les époux associés',
    contexte: "M. et Mme ILUNGA, mariés, ont constitué avec un ami une SNC de transport à Kolwezi, chacun des trois détenant un tiers des parts. Deux ans plus tard, un créancier impayé de la société découvre leur mariage et menace d'invoquer la nullité de la société ; les époux, eux, voudraient sauver l'entreprise.",
    questions: [
      { num: 1, enonce: 'La société est-elle nulle ?', correction: "Le vice est réel. L'Art. 9 AUSCGIE dispose que des époux ne peuvent être associés d'une société dans laquelle ils seraient tenus des dettes sociales indéfiniment ou solidairement ; or, dans la SNC, tous les associés sont commerçants et répondent indéfiniment et solidairement des dettes sociales (Art. 270). Les époux ILUNGA sont donc coassociés en violation de l'Art. 9, et l'Art. 74-1 sanctionne de nullité les sociétés constituées en violation de cet article. L'action en nullité se prescrit par trois (3) ans à compter de l'immatriculation (Art. 251 al. 1) : intentée deux ans après, elle serait recevable. Mais la nullité prononcée opérerait sans rétroactivité - dissolution puis liquidation (Art. 253) - et ne serait pas opposable aux tiers de bonne foi (Art. 255) : le créancier conserve donc son recours contre la société et les associés pour les dettes déjà nées." },
      { num: 2, enonce: 'Comment les époux peuvent-ils sauver la société ?', correction: "Par la régularisation, que le droit des nullités favorise systématiquement. L'action en nullité est éteinte lorsque la cause de nullité a cessé d'exister le jour où la juridiction statue sur le fond en première instance - seule l'illicéité de l'objet social échappe à cette faveur (Art. 246) ; la juridiction peut même fixer un délai pour couvrir la nullité et ne peut la prononcer moins de deux (2) mois après l'assignation (Art. 247). Concrètement, plusieurs issues : l'un des époux cède ses parts au troisième associé ou à un tiers avant le jugement ; ou la société se transforme en une forme où les époux ne sont plus tenus indéfiniment et solidairement - une SARL, par exemple, où la responsabilité est limitée aux apports (Art. 309), la transformation d'une société à responsabilité illimitée vers une responsabilité limitée laissant aux créanciers antérieurs leurs droits contre la société et les associés (Art. 186 al. 2). La cause de nullité disparue, l'action du créancier tombe." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue2',
  numero: 1,
  id: 'ue2-chapitre-1',
  titre: 'La société commerciale',
  sousTitre: 'Art. 1 à 80, 97-101 et 261-262 AUSCGIE révisé du 30 janvier 2014 · droit congolais de la création d\'entreprise',
  infoBulle: "L'OHADA et le champ d'application de l'AUSCGIE, la définition de la société et ses éléments constitutifs, les apports et le capital, les cinq formes sociales, les statuts et la durée, la naissance de la personnalité juridique et les réformes congolaises du guichet unique et du capital libre.",
  loiRef: 'Art. 1-80 AUSCGIE · Traité OHADA · droit RDC',
  moduleLabel: 'UE 2 · Droit des sociétés',
  retourRoute: '/ue2-droit-societes',
  coursId: 'ue2-droit-societes',
  objectifs: [
    "Maîtriser le champ d'application de l'AUSCGIE et le critère du siège social (Art. 1-3)",
    "Identifier les trois éléments constitutifs de la société et le régime de l'associé unique (Art. 4-9)",
    'Qualifier les trois types d\'apports, leurs règles de libération et le capital social (Art. 37-72)',
    'Distinguer les cinq formes sociales et leurs critères de choix (Art. 6, 270, 309, 385, 853-1)',
    "Appliquer les réformes congolaises : capital libre de la SARL et création au guichet unique (arrêté du 30/12/2014, décret n° 14/014)",
    "Raisonner sur les pactes d'associés, les nullités de la constitution et la responsabilité des fondateurs (Art. 2-1, 74-1 à 80)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "L'AUSCGIE s'applique à toute société commerciale dont le siège social est situé dans un État partie, quelle que soit la nationalité des associés (Art. 1) ; les statuts ne peuvent y déroger que là où il l'autorise, toute clause contraire étant réputée non écrite (Art. 2).",
    "La société naît d'un contrat exigeant trois éléments : des apports (numéraire, nature ou industrie - tout autre apport est interdit, Art. 40), la vocation aux bénéfices et aux pertes sans clause léonine (Art. 4, 54), et l'affectio societatis - dont la preuve par tout moyen peut faire reconnaître une société créée de fait, soumise aux règles de la SNC (Art. 864-868).",
    "L'associé unique n'est possible qu'en SARL, SA et SAS (Art. 5, 309 al. 2, 385 al. 2, 853-1) ; mineurs, majeurs incapables et époux ne peuvent être tenus indéfiniment ou solidairement (Art. 8-9), à peine de nullité de la société (Art. 74-1).",
    "L'apport en industrie ne concourt pas au capital et subit un double plafond de 25% (vote ; bénéfices, actif net et pertes) ; ses titres ne sont ni cessibles ni transmissibles, et il est interdit dans la SA (Art. 50-1 à 50-4).",
    "Libération des apports en numéraire : intégrale en principe (Art. 41), moitié au moins en SARL avec surplus sous 2 ans (Art. 311-1), quart au moins en SA avec surplus sous 3 ans (Art. 389) ; les apports en nature sont toujours intégralement libérés et contrôlés par commissaire aux apports au-delà de 5 000 000 FCFA en SARL (Art. 45, 312).",
    "La durée ne peut excéder 99 ans à compter de l'immatriculation ; le terme dissout de plein droit sauf prorogation, sur consultation obligatoire un an au moins avant l'expiration (Art. 28-36) ; et en aucun cas les engagements d'un associé ne peuvent être augmentés sans son consentement (Art. 72).",
    "La société est constituée à la signature des statuts (Art. 101) mais n'acquiert la personnalité juridique qu'à l'immatriculation au RCCM (Art. 98) ; la déclaration de régularité et de conformité conditionne l'immatriculation (Art. 73) et l'avis de constitution est publié dans les 15 jours (Art. 261).",
    "En RDC, le capital de la SARL est librement fixé et les statuts peuvent être sous seing privé (Art. 10 et 311 « sauf dispositions nationales contraires » ; arrêté interministériel du 30/12/2014), et le guichet unique délivre l'ensemble des documents de création en trois jours ouvrables (décret n° 14/014 du 08/05/2014).",
    "Les pactes d'associés organisent relations, organes, affaires sociales, accès au capital et transmission des titres, sous réserve des règles impératives et des statuts (Art. 2-1) ; les nullités de constitution sont limitées à la liste de l'Art. 74-1, la régularisation étant toujours préférée (Art. 75-77) et les fondateurs solidairement responsables des irrégularités (Art. 78-80).",
  ],
  references: [
    {
      genre: 'texte',
      intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)",
      precision: 'adopté le 30 janvier 2014 à Ouagadougou, art. 1 à 80, 97 à 101, 261-262, 270, 309-312, 385-389, 853-1 et 864-868',
    },
    {
      genre: 'texte',
      intitule: "Traité relatif à l'harmonisation du droit des affaires en Afrique",
      precision: 'signé à Port-Louis le 17 octobre 1993, révisé à Québec le 17 octobre 2008 ; en vigueur en RDC depuis le 12 septembre 2012',
    },
    {
      genre: 'texte',
      intitule: 'Arrêté interministériel n° 002 et n° 243 du 30 décembre 2014 (RDC)',
      precision: 'capital de la SARL librement fixé, statuts sous seing privé, preuve bancaire de libération',
    },
    {
      genre: 'texte',
      intitule: "Décret n° 14/014 du 8 mai 2014 (RDC)",
      precision: "création du Guichet Unique de Création d'Entreprise",
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  outil: {
    label: 'Simulateur : constituer votre société',
    description: "Choisissez une forme sociale et un pays de constitution, renseignez les mentions obligatoires des statuts (Art. 13 AUSCGIE), ajoutez les associés et leurs apports, et obtenez un récapitulatif avec vérification de conformité légale.",
    route: '/ue2/simulateur-constitution',
  },
  sources: "Sources : AUSCGIE révisé du 30 janvier 2014 · Traité OHADA du 17 octobre 1993 · Arrêté interministériel RDC n° 002 et n° 243 du 30/12/2014 · Décret n° 14/014 du 08/05/2014 · Décret n° 18/041 du 24/11/2018 (CNSS)",
}

export default chapitre
