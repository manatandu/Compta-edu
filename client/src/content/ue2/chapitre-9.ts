// Chapitre 9 du module UE2, Droit des sociétés : contenu pur.
// Migré depuis l'ancienne page dédiée UE2Chapitre9Page.tsx vers le moteur
// commun components/chapitre/ChapitreManuscrit.tsx, avec vérification
// article par article sur le texte de l'AUSCGIE révisé (art. 161-199,
// livres 3 à 6 de la Partie 1) et de l'AUPCAP du 10 septembre 2015
// (art. 1 à 5-14, 6 à 24-5, 25-51, 52-53, 67-69, 95-96, 139-143,
// 170-193, 194-205, 257-258 - tous lus). Corrections majeures : la
// section sur les liens de droit entre sociétés est réécrite sur le
// texte réel (groupe = art. 173, contrôle = art. 174-175, participation
// = art. 176 « égale ou supérieure à 10% » sans plafond, participations
// croisées = art. 177-178, société mère/filiale = art. 179-180) - les
// anciens seuils « 10 à 50% », le « contrôle de fait sur deux exercices »,
// le délai de cession « d'un an » et la « cession forcée par le juge »
// ne figurent pas dans l'Acte uniforme. La prorogation de la conciliation
// est décidée par le président de la juridiction (art. 5-3), non par le
// conciliateur ; l'action en nullité du concordat appartient au ministère
// public ET aux contrôleurs (art. 140).
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch9-q1', question: "Selon l'Art. 181 AUSCGIE, la transformation régulière d'une société entraîne-t-elle la création d'une personne morale nouvelle ?",
    options: [
      { id: 'a', texte: 'Oui, toujours' },
      { id: 'b', texte: "Non, elle ne constitue qu'une modification des statuts" },
      { id: 'c', texte: 'Oui, sauf si les associés en décident autrement' },
      { id: 'd', texte: 'Seulement pour la transformation en SA' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 181 AUSCGIE',
    explication: "L'Art. 181 al. 2 AUSCGIE dispose que la transformation régulière d'une société n'entraîne pas la création d'une personne morale nouvelle : elle ne constitue qu'une modification des statuts, soumise aux mêmes conditions de forme et de délai que celle-ci.",
  },
  {
    id: 'ch9-q2', question: "La transformation d'une société à responsabilité limitée en société à responsabilité illimitée requiert :",
    options: [
      { id: 'a', texte: 'La majorité simple des associés' },
      { id: 'b', texte: 'Les 2/3 des associés' },
      { id: 'c', texte: "L'unanimité des associés" },
      { id: 'd', texte: 'La majorité des 3/4 du capital' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 181 AUSCGIE',
    explication: "L'Art. 181 al. 3 AUSCGIE impose l'unanimité des associés lorsque la transformation fait passer d'une forme où la responsabilité est limitée aux apports à une forme où elle est illimitée. Les délibérations prises en violation de cette règle sont nulles.",
  },
  {
    id: 'ch9-q3', question: "À quelle date la transformation d'une société prend-elle effet ?",
    options: [
      { id: 'a', texte: 'À la date de publication au RCCM' },
      { id: 'b', texte: 'À la date de la prochaine assemblée générale' },
      { id: 'c', texte: 'À compter du jour où la décision la constatant est prise' },
      { id: 'd', texte: 'À la date de la signature des nouveaux statuts' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 182 AUSCGIE',
    explication: "L'Art. 182 AUSCGIE précise que la transformation prend effet à compter du jour où la décision la constatant est prise ; elle ne peut avoir d'effet rétroactif. Mais elle ne devient opposable aux tiers qu'après achèvement des formalités de publicité prévues à l'Art. 265.",
  },
  {
    id: 'ch9-q4', question: "Lors d'une transformation, que devient le commissaire aux comptes de la société ?",
    options: [
      { id: 'a', texte: 'Sa mission cesse automatiquement dans tous les cas' },
      { id: 'b', texte: 'Il continue si la nouvelle forme requiert un commissaire aux comptes' },
      { id: 'c', texte: 'Il doit être renommé par la nouvelle assemblée' },
      { id: 'd', texte: 'Sa mission est suspendue 6 mois' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 187 AUSCGIE',
    explication: "L'Art. 187 AUSCGIE : la transformation ne met pas fin aux fonctions du commissaire aux comptes si la nouvelle forme sociale requiert sa nomination. Lorsqu'elle n'est pas requise, sa mission cesse par la transformation, sauf décision contraire des associés - et il rend compte de sa mission pour la période écoulée à l'assemblée statuant sur les comptes de l'exercice.",
  },
  {
    id: 'ch9-q5', question: "La fusion entraîne-t-elle la liquidation de la société absorbée ?",
    options: [
      { id: 'a', texte: "Oui, avec liquidation complète de l'actif" },
      { id: 'b', texte: 'Non, elle entraîne la dissolution sans liquidation et la transmission universelle du patrimoine' },
      { id: 'c', texte: "Oui, avec partage de l'actif entre les associés" },
      { id: 'd', texte: "Non, la société absorbée continue d'exister" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 191 AUSCGIE',
    explication: "L'Art. 191 AUSCGIE dispose que la fusion ou la scission entraîne la dissolution SANS liquidation des sociétés qui disparaissent et la transmission universelle de leur patrimoine aux sociétés bénéficiaires, dans l'état où il se trouve à la date de réalisation définitive de l'opération.",
  },
  {
    id: 'ch9-q6', question: "Quelle est la soulte maximale pouvant être versée lors d'une fusion selon l'AUSCGIE ?",
    options: [
      { id: 'a', texte: "5% de la valeur d'échange des parts" },
      { id: 'b', texte: "10% de la valeur d'échange des parts ou actions attribuées" },
      { id: 'c', texte: '15% du capital de la société absorbante' },
      { id: 'd', texte: 'Pas de limite fixée par la loi' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 191 AUSCGIE',
    explication: "L'Art. 191 al. 2 AUSCGIE prévoit que les associés peuvent éventuellement recevoir, en échange de leurs apports, une soulte dont le montant ne peut dépasser dix pour cent (10%) de la valeur d'échange des parts ou actions attribuées.",
  },
  {
    id: 'ch9-q7', question: "Le projet de fusion doit être déposé au RCCM et publié avant la première AG au moins :",
    options: [
      { id: 'a', texte: '15 jours avant' },
      { id: 'b', texte: '1 mois avant' },
      { id: 'c', texte: '2 mois avant' },
      { id: 'd', texte: '3 mois avant' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 194 AUSCGIE',
    explication: "L'Art. 194 AUSCGIE impose que le dépôt au RCCM et la publicité par avis dans un journal habilité à recevoir les annonces légales aient lieu au moins un (1) mois avant la date de la première assemblée générale appelée à statuer sur l'opération.",
  },
  {
    id: 'ch9-q8', question: "L'apport partiel d'actif est soumis au régime de :",
    options: [
      { id: 'a', texte: 'La fusion' },
      { id: 'b', texte: 'La scission' },
      { id: 'c', texte: 'La dissolution' },
      { id: 'd', texte: 'La liquidation' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 195 AUSCGIE',
    explication: "L'Art. 195 AUSCGIE dispose que l'apport partiel d'actif - opération par laquelle une société fait apport d'une branche autonome d'activité à une société préexistante ou à créer - est soumis au régime de la scission. La société apporteuse ne disparaît pas du fait de cet apport.",
  },
  {
    id: 'ch9-q9', question: 'La cessation des paiements est définie comme :',
    options: [
      { id: 'a', texte: "L'incapacité à payer une dette précise à son échéance" },
      { id: 'b', texte: "L'impossibilité de faire face au passif exigible avec l'actif disponible" },
      { id: 'c', texte: "Le fait d'avoir plus de dettes que d'actifs au bilan" },
      { id: 'd', texte: 'Un retard de paiement supérieur à 90 jours' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 1-3 et 25 AUPCAP',
    explication: "Les Art. 1-3 et 25 AUPCAP définissent la cessation des paiements comme l'état où le débiteur se trouve dans l'impossibilité de faire face à son passif exigible avec son actif disponible - à l'exclusion des situations où les réserves de crédit ou les délais de paiement dont il bénéficie de la part de ses créanciers lui permettent d'y faire face.",
  },
  {
    id: 'ch9-q10', question: "La conciliation AUPCAP est ouverte à l'entreprise qui :",
    options: [
      { id: 'a', texte: "Est en cessation des paiements depuis moins d'un mois" },
      { id: 'b', texte: "Connaît des difficultés avérées ou prévisibles mais n'est pas encore en cessation des paiements" },
      { id: 'c', texte: 'A un passif supérieur à son actif' },
      { id: 'd', texte: 'Est en redressement judiciaire depuis moins de 6 mois' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 5-1 AUPCAP',
    explication: "L'Art. 5-1 AUPCAP ouvre la conciliation aux personnes visées à l'Art. 1-1 qui connaissent des difficultés avérées ou prévisibles mais qui ne sont PAS encore en état de cessation des paiements. L'objectif est un accord amiable avec les principaux créanciers et cocontractants.",
  },
  {
    id: 'ch9-q11', question: 'Quelle est la durée maximale de la procédure de conciliation (hors prorogation) ?',
    options: [
      { id: 'a', texte: '1 mois' },
      { id: 'b', texte: '2 mois' },
      { id: 'c', texte: '3 mois' },
      { id: 'd', texte: '6 mois' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 5-3 AUPCAP',
    explication: "L'Art. 5-3 AUPCAP : la conciliation est ouverte par le président de la juridiction compétente, statuant à huis clos, pour une durée n'excédant pas trois (3) mois, qu'il peut proroger d'un (1) mois au plus par décision spécialement motivée, à la demande du débiteur et après avis écrit du conciliateur. À l'expiration, elle prend fin de plein droit, et aucune nouvelle conciliation ne peut être ouverte avant trois (3) mois.",
  },
  {
    id: 'ch9-q12', question: 'La conciliation AUPCAP est une procédure :',
    options: [
      { id: 'a', texte: 'Publique et contradictoire' },
      { id: 'b', texte: 'Préventive, consensuelle et confidentielle' },
      { id: 'c', texte: 'Judiciaire et obligatoire avant tout redressement' },
      { id: 'd', texte: 'Réservée aux grandes entreprises' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 2 et 5-1 AUPCAP',
    explication: "L'Art. 2 AUPCAP définit la conciliation comme une procédure préventive, consensuelle et confidentielle, destinée à éviter la cessation des paiements afin d'effectuer la restructuration financière ou opérationnelle de l'entreprise. Toute personne qui a connaissance de la conciliation est tenue à la confidentialité (Art. 5-1), et ni la décision d'ouverture ni l'homologation de l'accord ne font l'objet d'une publicité (Art. 5-3, 5-10).",
  },
  {
    id: 'ch9-q13', question: "Le règlement préventif aboutit à l'adoption d'un :",
    options: [
      { id: 'a', texte: 'Accord de conciliation' },
      { id: 'b', texte: 'Concordat préventif' },
      { id: 'c', texte: 'Concordat de redressement' },
      { id: 'd', texte: 'Plan de liquidation' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 2 et 18 AUPCAP',
    explication: "L'Art. 2 AUPCAP : le règlement préventif est une procédure collective préventive destinée à éviter la cessation des paiements et à permettre l'apurement du passif au moyen d'un concordat préventif. Une fois homologué, le concordat est obligatoire pour tous les créanciers antérieurs à la décision d'ouverture, chirographaires ou garantis (Art. 18).",
  },
  {
    id: 'ch9-q14', question: 'Le redressement judiciaire est applicable quand :',
    options: [
      { id: 'a', texte: "L'entreprise a des difficultés prévisibles" },
      { id: 'b', texte: "L'entreprise est en cessation des paiements mais sa situation n'est pas irrémédiablement compromise" },
      { id: 'c', texte: "L'entreprise est en cessation des paiements et sa situation est irrémédiablement compromise" },
      { id: 'd', texte: "L'entreprise a un passif supérieur à 50% de son actif" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 2 AUPCAP',
    explication: "L'Art. 2 AUPCAP : le redressement judiciaire est une procédure collective destinée au sauvetage de l'entreprise débitrice en cessation des paiements mais dont la situation n'est PAS irrémédiablement compromise, et à l'apurement de son passif au moyen d'un concordat de redressement. Si la situation est irrémédiablement compromise, c'est la liquidation des biens.",
  },
  {
    id: 'ch9-q15', question: 'La liquidation des biens a pour but :',
    options: [
      { id: 'a', texte: "De sauver l'entreprise grâce à un concordat" },
      { id: 'b', texte: "De réaliser l'actif de l'entreprise irrémédiablement compromise pour apurer son passif" },
      { id: 'c', texte: "De restructurer financièrement l'entreprise" },
      { id: 'd', texte: 'De négocier des délais de paiement avec les créanciers' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 2 AUPCAP',
    explication: "L'Art. 2 AUPCAP : la liquidation des biens est une procédure collective destinée à la réalisation de l'actif de l'entreprise débitrice en cessation des paiements dont la situation est irrémédiablement compromise, pour apurer son passif.",
  },
  {
    id: 'ch9-q16', question: "Quelle est la règle d'unanimité en matière de transformation de société ?",
    options: [
      { id: 'a', texte: "L'unanimité est toujours requise pour toute transformation" },
      { id: 'b', texte: "L'unanimité est requise uniquement si la transformation fait passer d'une responsabilité limitée à une responsabilité illimitée" },
      { id: 'c', texte: "L'unanimité est requise seulement pour la transformation d'une SARL en SA" },
      { id: 'd', texte: "L'unanimité n'est jamais requise pour les transformations" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 181 AUSCGIE',
    explication: "L'Art. 181 al. 3 AUSCGIE : l'unanimité n'est requise que lorsque la transformation conduit d'une forme où la responsabilité des associés est limitée à leurs apports vers une forme où elle est illimitée. Pour les autres transformations, ce sont les conditions ordinaires de modification des statuts qui s'appliquent.",
  },
  {
    id: 'ch9-q17', question: 'Une fusion peut-elle intervenir entre des sociétés de formes juridiques différentes (SARL et SA) ?',
    options: [
      { id: 'a', texte: 'Non, les sociétés doivent être de même forme' },
      { id: 'b', texte: "Oui, sauf disposition contraire de l'AUSCGIE" },
      { id: 'c', texte: 'Oui, mais uniquement si les deux ont le même capital' },
      { id: 'd', texte: 'Non, sauf autorisation du tribunal' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 196 AUSCGIE',
    explication: "L'Art. 196 AUSCGIE : sauf disposition contraire de l'Acte uniforme, les opérations de fusion, de scission et d'apport partiel d'actif peuvent intervenir entre des sociétés de forme différente. Elles peuvent même concerner des sociétés dont le siège n'est pas situé dans le même État partie (Art. 199).",
  },
  {
    id: 'ch9-q18', question: "La déclaration de conformité (Art. 198 AUSCGIE) doit être déposée :",
    options: [
      { id: 'a', texte: 'Auprès du Ministère des finances' },
      { id: 'b', texte: "Au greffe, à peine de nullité de l'opération" },
      { id: 'c', texte: 'Au RCCM, dans les 30 jours' },
      { id: 'd', texte: 'Auprès du notaire rédacteur des actes' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 198 AUSCGIE',
    explication: "L'Art. 198 AUSCGIE : à peine de nullité, les sociétés participant à une opération de fusion, scission ou apport partiel d'actifs sont tenues de déposer au greffe une déclaration dans laquelle elles relatent tous les actes effectués en vue d'y procéder et par laquelle elles affirment que l'opération a été réalisée en conformité de l'Acte uniforme.",
  },
  {
    id: 'ch9-q19', question: "Une « petite entreprise » au sens de l'AUPCAP est une entreprise dont :",
    options: [
      { id: 'a', texte: "L'effectif est inférieur ou égal à 10 travailleurs" },
      { id: 'b', texte: "L'effectif est inférieur ou égal à 20 travailleurs et le chiffre d'affaires n'excède pas 50 millions FCFA HT sur les 12 derniers mois" },
      { id: 'c', texte: "L'effectif est inférieur ou égal à 50 travailleurs" },
      { id: 'd', texte: "L'effectif est inférieur ou égal à 100 travailleurs et le CA n'excède pas 100 millions FCFA HT" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 1-3 AUPCAP',
    explication: "L'Art. 1-3 AUPCAP : la petite entreprise est toute entreprise individuelle, société ou autre personne morale de droit privé dont le nombre de travailleurs est inférieur ou égal à vingt (20) et dont le chiffre d'affaires n'excède pas cinquante millions (50 000 000) de FCFA hors taxes au cours des douze (12) mois précédant la saisine. Elle peut bénéficier des procédures simplifiées (Art. 1-2).",
  },
  {
    id: 'ch9-q20', question: "L'AUPCAP révisé de 2015 a été adopté à :",
    options: [
      { id: 'a', texte: 'Libreville, Gabon' },
      { id: 'b', texte: 'Dakar, Sénégal' },
      { id: 'c', texte: "Grand-Bassam, Côte d'Ivoire" },
      { id: 'd', texte: 'Yaoundé, Cameroun' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 257-258 AUPCAP',
    explication: "L'AUPCAP révisé a été adopté le 10 septembre 2015 à Grand-Bassam (Côte d'Ivoire) et publié au Journal officiel de l'OHADA le 25 septembre 2015 ; il est entré en vigueur quatre-vingt-dix (90) jours après cette publication (Art. 258), soit le 24 décembre 2015. Il abroge l'Acte uniforme du 10 avril 1998 et ne s'applique qu'aux procédures ouvertes après son entrée en vigueur (Art. 257).",
  },
  {
    id: 'ch9-n1', question: "Une fusion projetée augmente les engagements des associés de la société absorbée. Quelle majorité est requise ?",
    options: [
      { id: 'a', texte: 'Les conditions ordinaires de modification des statuts' },
      { id: 'b', texte: "L'unanimité des associés ou actionnaires concernés, à peine de nullité des délibérations" },
      { id: 'c', texte: 'La majorité des 2/3 en AGE' },
      { id: 'd', texte: "L'accord du commissaire aux comptes suffit" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 197 AUSCGIE',
    explication: "L'Art. 197 AUSCGIE : les opérations de fusion, scission et apport partiel d'actif sont décidées, pour chaque société, dans les conditions requises pour la modification de ses statuts. Toutefois, si l'opération a pour effet d'augmenter les engagements des associés ou actionnaires d'une ou plusieurs sociétés en cause, elle ne peut être décidée qu'à l'unanimité desdits associés ou actionnaires - les délibérations contraires sont nulles.",
  },
  {
    id: 'ch9-n2', question: "Selon l'Art. 176 AUSCGIE, une société a une « participation » dans une autre lorsqu'elle possède :",
    options: [
      { id: 'a', texte: 'Entre 10% et 50% de son capital' },
      { id: 'b', texte: 'Une fraction de capital égale ou supérieure à 10%' },
      { id: 'c', texte: 'Plus de la moitié de son capital' },
      { id: 'd', texte: 'Au moins une action, quelle que soit la fraction' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 176 AUSCGIE',
    explication: "L'Art. 176 AUSCGIE : lorsqu'une société possède dans une autre une fraction de capital égale ou supérieure à dix pour cent (10%), la première est considérée comme ayant une participation dans la seconde - sans plafond. Au-delà de la moitié du capital, on passe dans la relation société mère-filiale (Art. 179).",
  },
  {
    id: 'ch9-n3', question: "La suspension des poursuites individuelles attachée à l'ouverture du règlement préventif s'applique-t-elle aux créances de salaires ?",
    options: [
      { id: 'a', texte: 'Oui, comme à toutes les créances antérieures' },
      { id: 'b', texte: "Non : elle s'applique aux créances chirographaires et garanties, à l'exception des créances de salaires et d'aliments" },
      { id: 'c', texte: 'Oui, mais seulement pendant un mois' },
      { id: 'd', texte: 'Non, elle ne concerne que les créances bancaires' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 9 AUPCAP',
    explication: "L'Art. 9 AUPCAP : la décision d'ouverture du règlement préventif suspend ou interdit toutes les poursuites individuelles tendant au paiement des créances antérieures pour une durée maximale de trois (3) mois, prorogeable d'un (1) mois. Elle vise les voies d'exécution comme les mesures conservatoires, et s'applique aux créances chirographaires et garanties - à l'exception des créances de salaires et d'aliments.",
  },
  {
    id: 'ch9-n4', question: 'Dans quel délai les créances super-privilégiées des travailleurs doivent-elles être payées après la décision ouvrant le redressement judiciaire ou la liquidation des biens ?',
    options: [
      { id: 'a', texte: 'Dans les 3 mois, après vérification des créances' },
      { id: 'b', texte: 'Au plus tard dans les 10 jours, sur simple décision du juge-commissaire' },
      { id: 'c', texte: 'À la clôture de la procédure' },
      { id: 'd', texte: 'Dans les 30 jours, après accord des contrôleurs' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 95-96 AUPCAP',
    explication: "Les créances résultant du contrat de travail ou d'apprentissage sont garanties par le super privilège des salaires (Art. 95). L'Art. 96 impose au syndic de payer toutes les créances super-privilégiées au plus tard dans les dix (10) jours qui suivent la décision d'ouverture, sur simple décision du juge-commissaire, sous déduction des acomptes déjà perçus ; à défaut de fonds, elles sont acquittées sur les premières rentrées, avant toute autre créance.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '9.1',
    titre: 'La transformation de la société (Art. 181-188 AUSCGIE)',
    navLabel: '9.1 Transformation',
    blocs: [
      { type: 'paragraphe', texte: "La **transformation** est l'opération par laquelle une société change de forme juridique par décision des associés (Art. 181). Régulièrement décidée, elle n'entraîne **pas la création d'une personne morale nouvelle** : elle ne constitue qu'une **modification des statuts**, soumise aux mêmes conditions de forme et de délai - c'est le principe de continuité de la personne morale." },
      { type: 'carte', titre: 'Qui décide, et à quelle majorité ?', tableau: { entetes: ['Type de transformation', 'Règle de décision', 'Article'], lignes: [
        ['Responsabilité limitée vers responsabilité illimitée (ex. SARL vers SNC)', "**Unanimité des associés** - les délibérations contraires sont **nulles**", 'Art. 181 al. 3'],
        ['Toutes les autres transformations', 'Conditions de modification des statuts propres à la forme quittée', 'Art. 181 al. 2'],
      ] }, note: "La transformation prend effet **au jour de la décision** qui la constate, sans effet rétroactif possible, mais n'est opposable aux tiers qu'après les formalités de publicité de l'Art. 265 (Art. 182)." },
      { type: 'paragraphe', texte: "**Effets sur les comptes et les organes.** La transformation en cours d'exercice n'entraîne pas d'arrêté des comptes, sauf décision contraire des associés ; les états financiers de l'exercice sont arrêtés et approuvés selon les règles de la **nouvelle** forme, de même que la répartition des bénéfices (Art. 183). La décision **met fin aux pouvoirs des organes d'administration ou de gestion** ; leurs membres ne peuvent demander des dommages et intérêts que si la transformation a été décidée **dans le seul but de porter atteinte à leurs droits** (Art. 184). Le rapport de gestion est établi par les anciens et les nouveaux organes, chacun pour sa période (Art. 185)." },
      { type: 'filet', titre: 'Continuité des droits et protection des créanciers (Art. 186)', texte: "Les droits et obligations contractés sous l'ancienne forme **subsistent** sous la nouvelle, de même que les sûretés, sauf clause contraire dans l'acte constitutif de ces sûretés. Et lorsqu'une société à responsabilité **illimitée** se transforme en société à responsabilité **limitée**, les créanciers dont la dette est antérieure à la transformation conservent leurs droits **contre la société et contre les associés** : on ne s'évade pas de ses dettes en changeant de forme." },
      { type: 'carte', titre: 'Commissaire aux comptes et commissaire à la transformation', liste: [
        "**Commissaire aux comptes (Art. 187).** Ses fonctions continuent si la nouvelle forme requiert un commissaire aux comptes ; sinon, sa mission cesse par la transformation, sauf décision contraire des associés - il rend alors compte de sa mission pour la période écoulée à l'assemblée statuant sur les comptes de l'exercice.",
        "**Commissaire à la transformation (Art. 187-1).** Lorsqu'une société **sans** commissaire aux comptes se transforme en **société par actions**, un ou plusieurs commissaires à la transformation apprécient sous leur responsabilité la valeur des biens composant l'actif social et les avantages particuliers. Ils sont désignés, sauf accord unanime des associés, par la juridiction compétente à la demande des dirigeants.",
        "Les associés statuent sur l'évaluation des biens et l'octroi des avantages particuliers, qu'ils ne peuvent réduire qu'à l'unanimité. **À défaut d'approbation expresse mentionnée au procès-verbal, la transformation est nulle** (Art. 187-1 in fine).",
        "Si la société n'a plus, après transformation, l'une des formes prévues par l'AUSCGIE, elle **perd la personnalité juridique** si elle exerce une activité commerciale (Art. 188).",
      ] },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[15] },
    ],
  },
  {
    numero: '9.2',
    titre: "Fusion, scission et apport partiel d'actif (Art. 189-199 AUSCGIE)",
    navLabel: '9.2 Fusion et scission',
    blocs: [
      { type: 'carte', titre: 'Trois opérations de restructuration', tableau: { entetes: ['Opération', 'Définition', 'Sort de la société', 'Article'], lignes: [
        ['Fusion', "Deux ou plusieurs sociétés se réunissent pour n'en former qu'une seule, par création d'une société nouvelle ou par absorption par l'une d'entre elles - une société même en liquidation peut être absorbée", 'La ou les sociétés qui disparaissent transmettent leur patrimoine à titre universel', 'Art. 189'],
        ['Scission', "Le patrimoine d'une société est partagé entre plusieurs sociétés existantes ou nouvelles", 'La société scindée disparaît, son patrimoine est transmis à titre universel', 'Art. 190'],
        ["Apport partiel d'actif", "Une société fait apport d'une **branche autonome d'activité** à une société préexistante ou à créer - soumis au régime de la scission", "La société apporteuse **ne disparaît pas**", 'Art. 195'],
      ] } },
      { type: 'filet', titre: "Effets de la fusion et de la scission (Art. 191)", texte: "Dissolution **sans liquidation** des sociétés qui disparaissent et **transmission universelle** de leur patrimoine aux sociétés bénéficiaires, dans l'état où il se trouve à la date de réalisation définitive de l'opération. Les associés des sociétés qui disparaissent acquièrent **simultanément la qualité d'associés des sociétés bénéficiaires**, selon le contrat de fusion ou de scission, avec une **soulte** éventuelle plafonnée à **10% de la valeur d'échange** des titres attribués. Il n'est pas procédé à l'échange pour les parts ou actions détenues par la société bénéficiaire ou par la société qui disparaît (ou pour leur compte) : on ne s'attribue pas de titres à soi-même." },
      { type: 'carte', titre: "Date de prise d'effet (Art. 192)", tableau: { entetes: ['Cas', "Date d'effet"], lignes: [
        ["Création d'une ou plusieurs sociétés nouvelles", 'Date d\'immatriculation au RCCM de la nouvelle société ou de la dernière d\'entre elles'],
        ['Absorption et autres cas', "Date de la **dernière assemblée générale** ayant approuvé l'opération, sauf clause contraire du contrat - la date choisie ne pouvant être ni postérieure à la clôture de l'exercice en cours des sociétés bénéficiaires, ni antérieure à la clôture du dernier exercice clos des sociétés qui transmettent leur patrimoine"],
      ] } },
      { type: 'carte', titre: 'Le projet de fusion ou de scission (Art. 193)', liste: [
        "Établi par le conseil d'administration, l'administrateur général ou le ou les gérants de **chacune** des sociétés participantes.",
        "**1°** Forme, dénomination, numéro RCCM et siège de toutes les sociétés participantes ; **2°** motifs et conditions de l'opération ; **3°** désignation et évaluation de l'actif et du passif transmis.",
        "**4°** Modalités de remise des parts ou actions, date de jouissance, date d'effet comptable ; **5°** dates des comptes utilisés pour établir les conditions de l'opération.",
        "**6°** Rapport d'échange des titres et, le cas échéant, montant de la soulte ; **7°** montant prévu de la prime de fusion ou de scission ; **8°** droits accordés aux associés ayant des droits spéciaux et aux porteurs de titres autres que des actions, et avantages particuliers.",
      ] },
      { type: 'filet', titre: 'Publicité préalable (Art. 194)', texte: "Le projet est **déposé au RCCM** du siège de chaque société et fait l'objet d'un **avis dans un journal d'annonces légales** publié par chacune des sociétés participantes - avec dénomination, forme, siège, capital, numéro RCCM, évaluation de l'actif et du passif transmis, rapport d'échange et prime prévue. Le dépôt et la publicité doivent avoir lieu **au moins un (1) mois avant la première assemblée générale** appelée à statuer sur l'opération." },
      { type: 'paragraphe', texte: "**Décision et conformité.** L'opération est décidée, pour chaque société, **dans les conditions requises pour la modification de ses statuts**, selon les procédures suivies en matière d'augmentation du capital et de dissolution (Art. 197). Si elle a pour effet d'**augmenter les engagements** des associés ou actionnaires d'une des sociétés, l'**unanimité** de ceux-ci est requise, à peine de nullité. Ces opérations peuvent intervenir entre sociétés de **forme différente** (Art. 196) et entre sociétés dont les sièges sont situés dans des **États parties différents**, chaque société restant soumise à l'AUSCGIE dans l'État de son siège (Art. 199). Enfin, à peine de **nullité**, les sociétés participantes déposent au greffe une **déclaration de conformité** relatant tous les actes effectués et affirmant que l'opération a été réalisée en conformité de l'Acte uniforme (Art. 198)." },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[16] },
      { type: 'controle', question: QCM[17] },
      { type: 'controle', question: QCM[20] },
    ],
  },
  {
    numero: '9.3',
    titre: 'Groupes de sociétés, participations et filiales (Art. 173-180 AUSCGIE)',
    navLabel: '9.3 Groupes de sociétés',
    blocs: [
      { type: 'paragraphe', texte: "Le Livre 4 de la Partie 1 organise les **liens de droit entre sociétés**. Un **groupe de sociétés** est l'ensemble formé par des sociétés unies entre elles par des liens divers qui permettent à l'une d'elles de **contrôler** les autres (Art. 173). Le **contrôle** d'une société est la **détention effective du pouvoir de décision** au sein de cette société (Art. 174) - une définition substantielle, qui regarde le pouvoir réel et non le seul pourcentage." },
      { type: 'carte', titre: 'Les notions et leurs seuils exacts', tableau: { entetes: ['Notion', 'Définition légale', 'Article'], lignes: [
        ['Groupe de sociétés', "Ensemble de sociétés unies par des liens permettant à l'une de contrôler les autres", 'Art. 173'],
        ['Contrôle', 'Détention effective du pouvoir de décision', 'Art. 174'],
        ['Présomption de contrôle', "Détention, directe, indirecte ou par personne interposée, de **plus de la moitié des droits de vote** ; ou disposition de plus de la moitié des droits de vote en vertu d'un accord conclu avec d'autres associés", 'Art. 175'],
        ['Participation', 'Détention d\'une fraction de capital **égale ou supérieure à 10%** - sans plafond', 'Art. 176'],
        ['Société mère et filiale', "Une société est mère d'une autre quand elle possède dans la seconde **plus de la moitié du capital** ; la seconde est sa filiale", 'Art. 179'],
        ['Filiale commune', "Société dont le capital est possédé par plusieurs sociétés mères qui détiennent séparément une participation suffisante pour qu'aucune décision extraordinaire ne puisse être prise sans leur accord, et qui participent à sa gestion", 'Art. 180'],
      ] } },
      { type: 'filet', titre: 'Les participations croisées sont encadrées (Art. 177-178)', texte: "Entre **sociétés par actions et SARL** : une société par actions ou une SARL **ne peut posséder** d'actions ou de parts d'une autre société si celle-ci détient une fraction de son capital **supérieure à 10%** (Art. 177). À défaut d'accord pour régulariser, c'est la société qui détient la **fraction la plus faible** du capital de l'autre qui doit céder ; si les participations réciproques sont de même importance, chacune réduit la sienne à 10% au plus. Jusqu'à leur cession effective, les titres à céder sont **privés du droit de vote et du paiement des dividendes**. Lorsqu'une société d'une **autre forme** (SNC, SCS...) a parmi ses associés une société par actions ou une SARL détenant plus de 10% de son capital, elle ne peut détenir aucun titre de celle-ci ; si la participation est de 10% au plus, elle ne peut détenir plus de 10% du capital de l'autre - avec la même sanction de privation du vote et des dividendes sur les titres à céder (Art. 178)." },
      { type: 'paragraphe', texte: "**Pourquoi ces règles ?** Les participations croisées créent un capital fictif : chaque société finance indirectement ses propres titres via l'autre, et les dirigeants peuvent verrouiller les assemblées en votant réciproquement. La sanction - privation du vote et des dividendes jusqu'à cession - neutralise immédiatement l'intérêt de la fraude, sans attendre la cession elle-même." },
      { type: 'controle', question: QCM[21] },
    ],
  },
  {
    numero: '9.4',
    titre: "Les difficultés de l'entreprise : l'AUPCAP et la conciliation",
    navLabel: '9.4 AUPCAP et conciliation',
    blocs: [
      { type: 'paragraphe', texte: "Le traitement des difficultés relève d'un autre Acte uniforme : l'**AUPCAP** (Acte uniforme portant organisation des procédures collectives d'apurement du passif), adopté le **10 septembre 2015 à Grand-Bassam** (Côte d'Ivoire), publié au Journal officiel de l'OHADA le 25 septembre 2015 et entré en vigueur le 24 décembre 2015, en remplacement de l'Acte de 1998. Son objet (Art. 1) : préserver les activités économiques et les niveaux d'emplois, redresser rapidement les entreprises viables, liquider les entreprises non viables en maximisant la valeur des actifs, et établir un ordre précis de paiement des créances. Il s'applique à toute **personne physique exerçant une activité professionnelle indépendante** (civile, commerciale, artisanale ou agricole), à toute **personne morale de droit privé** et aux entreprises publiques ayant cette forme (Art. 1-1)." },
      { type: 'carte', titre: 'Les quatre procédures (Art. 2)', tableau: { entetes: ['Procédure', 'Nature', 'Condition', 'Issue'], lignes: [
        ['Conciliation', '**Préventive, consensuelle, confidentielle**', 'Difficultés avérées ou prévisibles, PAS de cessation des paiements', 'Accord de conciliation négocié avec les principaux créanciers'],
        ['Règlement préventif', 'Collective, préventive, judiciaire', 'Difficultés financières ou économiques **sérieuses**, PAS de cessation des paiements', 'Concordat préventif homologué'],
        ['Redressement judiciaire', 'Collective, curative', 'Cessation des paiements, situation **non** irrémédiablement compromise', 'Concordat de redressement'],
        ['Liquidation des biens', 'Collective, curative', 'Cessation des paiements, situation **irrémédiablement compromise**', "Réalisation de l'actif pour apurer le passif"],
      ] } },
      { type: 'filet', titre: 'Deux définitions clés (Art. 1-3, 25)', texte: "La **cessation des paiements** est l'état où le débiteur se trouve dans l'**impossibilité de faire face à son passif exigible avec son actif disponible** - à l'exclusion des situations où les réserves de crédit ou les délais de paiement accordés par les créanciers lui permettent d'y faire face. La **petite entreprise** - au plus **20 travailleurs** et **50 millions FCFA HT** de chiffre d'affaires sur les 12 mois précédant la saisine - a accès à des procédures **simplifiées** de règlement préventif, de redressement judiciaire et de liquidation des biens (Art. 1-2)." },
      { type: 'paragraphe', texte: "**La conciliation (Art. 5-1 à 5-14).** Ouverte au débiteur qui connaît des difficultés avérées ou prévisibles sans être en cessation des paiements, elle vise un **accord amiable** avec les principaux créanciers et cocontractants ; toute personne qui en a connaissance est tenue à la **confidentialité** (Art. 5-1). Le président de la juridiction compétente, saisi par requête du débiteur - seul ou conjointement avec des créanciers - accompagnée de documents de moins de 30 jours (Art. 5-2), statue **à huis clos** et ouvre la procédure pour **trois (3) mois au plus**, prorogeables d'**un (1) mois** par décision spécialement motivée à la demande du débiteur, après avis écrit du conciliateur ; à l'expiration, la conciliation prend fin de plein droit et aucune nouvelle conciliation ne peut être ouverte avant trois mois (Art. 5-3). Le **conciliateur** doit être indépendant et impartial : il ne doit avoir perçu aucune rémunération du débiteur ou de ses créanciers dans les 24 mois, ni être parent ou allié du débiteur jusqu'au 4ème degré, ni magistrat en fonction ou l'ayant quitté depuis moins de cinq ans (Art. 5-4). Pendant la recherche de l'accord, le président peut, à la demande du débiteur, **reporter le paiement** des sommes dues et **suspendre les poursuites** engagées par un créancier appelé à la conciliation (Art. 5-7)." },
      { type: 'carte', titre: "L'issue de la conciliation", liste: [
        "**Accord trouvé** : à la requête de la partie la plus diligente, l'accord est déposé au rang des minutes d'un notaire, ou **homologué / exequaturé** par la juridiction statuant à huis clos - l'homologation est de droit et ne peut être refusée que si l'accord est contraire à l'ordre public ; elle ne fait l'objet d'aucune publicité et le contenu de l'accord reste confidentiel (Art. 5-10).",
        "**Pendant l'exécution de l'accord** : interruption ou interdiction de toute action en justice et de toute poursuite individuelle sur les meubles et immeubles du débiteur pour les créances qui en font l'objet ; les garants et coobligés peuvent s'en prévaloir (Art. 5-12).",
        "**Inexécution** : la juridiction ayant connu de la conciliation prononce la **résolution** de l'accord ; les créanciers recouvrent l'intégralité de leurs créances, déduction faite des sommes perçues (Art. 5-13).",
        "**Échec ou cessation des paiements** : en cas d'impossibilité de parvenir à un accord, le conciliateur fait rapport au président qui met fin à la conciliation (Art. 5-8) ; la survenance de la cessation des paiements y met fin sans délai (Art. 5-6), et l'ouverture d'un règlement préventif, d'un redressement judiciaire ou d'une liquidation des biens y met fin de plein droit (Art. 5-14).",
      ] },
      { type: 'filet', titre: "Le privilège de l'argent frais (Art. 5-11)", texte: "Pour inciter au sauvetage, ceux qui consentent dans l'accord homologué un **nouvel apport en trésorerie** - ou fournissent un nouveau bien ou service - en vue d'assurer la poursuite de l'activité sont payés par **privilège** selon les rangs des Art. 166 et 167 si une liquidation des biens est ouverte par la suite. Ce privilège ne bénéficie ni aux apports en capital, ni aux créances antérieures à l'ouverture de la conciliation." },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[19] },
    ],
  },
  {
    numero: '9.5',
    titre: 'Le règlement préventif et le concordat préventif (Art. 6 à 24-5 AUPCAP)',
    navLabel: '9.5 Règlement préventif',
    blocs: [
      { type: 'paragraphe', texte: "Le **règlement préventif** est ouvert au débiteur qui, **sans être en cessation des paiements**, justifie de **difficultés financières ou économiques sérieuses** (Art. 6). C'est une procédure judiciaire et collective, à la différence de la conciliation. La requête - du débiteur seul ou conjointe avec des créanciers - est irrecevable si un concordat préventif ou de redressement est encore en cours d'exécution, avant l'expiration de **trois (3) ans** depuis l'homologation d'un précédent concordat préventif, ou de **dix-huit (18) mois** depuis la fin d'un règlement préventif n'ayant pas abouti à un concordat. Elle est accompagnée de quatorze documents datant de moins de 30 jours (Art. 6-1), dont un **projet de concordat préventif** exigé à peine d'irrecevabilité - celui-ci précise les modalités de continuation de l'entreprise, de maintien et de financement, de règlement du passif antérieur, le niveau et les perspectives d'emploi et l'éventuel remplacement de dirigeants (Art. 7)." },
      { type: 'carte', titre: 'Le déroulement de la procédure', tableau: { entetes: ['Étape', 'Règle', 'Article'], lignes: [
        ['Ouverture', "Si le projet de concordat paraît **sérieux**, le président ouvre la procédure et désigne un **expert au règlement préventif**", 'Art. 8'],
        ['Suspension des poursuites', "La décision d'ouverture suspend ou interdit toutes les poursuites individuelles sur les créances antérieures - voies d'exécution et mesures conservatoires - pour **3 mois au plus, prorogeables d'1 mois**, à l'exception des créances de **salaires et d'aliments**", 'Art. 9'],
        ['Discipline du débiteur', "Interdiction, à peine de **nullité de droit**, de payer les créances antérieures, de faire un acte de disposition étranger à l'exploitation normale ou de consentir une sûreté, sauf autorisation motivée du président", 'Art. 11'],
        ["Rapport de l'expert", "Établi dans les **3 mois** de l'ouverture, prorogeables d'**1 mois** à titre exceptionnel, sous peine d'engager sa responsabilité", 'Art. 13'],
        ['Décision', 'La juridiction, saisie dès le dépôt du rapport, se prononce au plus tard dans les **30 jours**, faute de quoi le règlement préventif prend fin de plein droit', 'Art. 14'],
      ] } },
      { type: 'filet', titre: "L'expert au règlement préventif est un mandataire judiciaire (Art. 4-1, 4-2)", texte: "Nul ne peut être désigné expert au règlement préventif ou syndic s'il n'est inscrit sur la **liste nationale des mandataires judiciaires**. Les conditions d'inscription : plein exercice des droits civils et civiques ; absence de sanction disciplinaire ou de condamnation incompatible ; être **expert-comptable ou habilité par la législation nationale** ; justifier d'un domicile fiscal dans l'État partie et être à jour de ses obligations fiscales ; présenter des garanties de moralité jugées suffisantes. L'expert doit être indépendant, neutre et impartial (Art. 4-4) et prête serment avant d'entrer en fonction." },
      { type: 'paragraphe', texte: "**L'homologation (Art. 15).** La juridiction statue en audience non publique. Si elle constate la cessation des paiements, elle prononce d'office le redressement judiciaire ou la liquidation des biens. Sinon, elle **homologue le concordat préventif** si trois conditions sont réunies : les conditions de validité du concordat sont remplies ; aucun motif tiré de l'intérêt collectif ou de l'ordre public n'y fait obstacle ; les délais consentis n'excèdent pas **trois (3) ans** pour l'ensemble des créanciers et **un (1) an** pour les créanciers de salaires. Aux créanciers qui refusent tout délai et toute remise, la juridiction peut rendre opposable un délai n'excédant pas **deux (2) ans** - mais les créanciers de salaires et d'aliments ne peuvent se voir imposer aucun délai qu'ils n'ont pas consenti, ni consentir aucune remise. L'**effet** de l'homologation (Art. 18) : le concordat devient **obligatoire pour tous les créanciers antérieurs** à la décision d'ouverture, chirographaires ou garantis ; les créanciers munis de sûretés ne perdent pas leurs garanties, mais ne peuvent les réaliser qu'en cas d'annulation ou de résolution du concordat ; et le débiteur recouvre la libre administration et disposition de ses biens dès que la décision passe en force de chose jugée." },
      { type: 'filet', titre: 'Résolution et annulation du concordat (Art. 21, 139-143)', texte: "La **résolution** peut être prononcée en cas d'inexécution par le débiteur de ses engagements concordataires - la juridiction appréciant, après avis du ministère public et des contrôleurs, si les manquements sont assez graves pour compromettre définitivement l'exécution - à la requête d'un créancier ou des contrôleurs, ou d'office (Art. 139). L'**annulation** sanctionne le **dol** résultant d'une dissimulation d'actif ou d'une exagération du passif découvert après l'homologation ; l'action n'appartient qu'au **ministère public et aux contrôleurs**, dans le délai d'**un (1) an** suivant la découverte du dol (Art. 140). Dans les deux cas, si la cessation des paiements est constatée, la juridiction prononce le redressement judiciaire ou la liquidation des biens (Art. 141)." },
      { type: 'paragraphe', texte: "**Le règlement préventif simplifié (Art. 24 à 24-5).** Réservé à la **petite entreprise** (Art. 1-3), sur déclaration sur l'honneur jointe à la requête. La procédure peut être ouverte **même sans projet de concordat préventif**, celui-ci étant alors établi par le débiteur avec le concours de l'expert. Les délais de trois mois (suspension des poursuites) et d'un mois (prorogation du rapport) sont réduits respectivement à **deux (2) mois** et **quinze (15) jours**. La décision d'appliquer le régime simplifié n'est susceptible d'aucun recours." },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[22] },
      { type: 'controle', question: QCM[18] },
    ],
  },
  {
    numero: '9.6',
    titre: 'Redressement judiciaire et liquidation des biens (Art. 25 s. AUPCAP)',
    navLabel: '9.6 Redressement et liquidation',
    blocs: [
      { type: 'paragraphe', texte: "Les procédures curatives sont ouvertes à **tout débiteur en état de cessation des paiements** (Art. 25). Le débiteur doit faire une **déclaration de cessation des paiements** au greffe **au plus tard dans les trente (30) jours** qui suivent celle-ci, avec les pièces de l'Art. 26, en précisant s'il demande le redressement judiciaire ou la liquidation des biens ; le projet de concordat de redressement est déposé en même temps ou dans les **soixante (60) jours** de l'ouverture (Art. 27). La procédure peut aussi être ouverte sur demande d'un **créancier** - à condition que sa créance soit **certaine, liquide et exigible** (Art. 28) - ou par **saisine d'office** de la juridiction, notamment sur informations du ministère public, des commissaires aux comptes ou des institutions représentatives du personnel (Art. 29). La juridiction fixe provisoirement la **date de cessation des paiements** - à défaut, elle est réputée être celle de la décision - sans pouvoir remonter plus de **dix-huit (18) mois** avant le prononcé de l'ouverture (Art. 34)." },
      { type: 'carte', titre: 'Redressement judiciaire ou liquidation des biens ? (Art. 33, 52-53)', tableau: { entetes: ['Critère', 'Redressement judiciaire', 'Liquidation des biens'], lignes: [
        ['Condition commune', 'Cessation des paiements', 'Cessation des paiements'],
        ['Critère de choix', "Concordat **sérieux** proposé ou ayant des chances sérieuses d'être obtenu, ou cession globale envisageable", 'Dans le cas contraire : situation irrémédiablement compromise'],
        ['Régime du débiteur', "**Assistance** obligatoire du syndic pour tous les actes d'administration et de disposition ; le débiteur accomplit seul les actes conservatoires et de gestion courante (Art. 52)", "**Dessaisissement** de l'administration et de la disposition de ses biens ; le syndic agit seul en représentation du débiteur ; la décision emporte **dissolution de plein droit** de la personne morale (Art. 53)"],
        ['Issue', "Concordat de redressement homologué : continuation ou cession de l'entreprise", "Réalisation de l'actif et apurement du passif ; clôture examinée dans les **18 mois** (prorogeables 6 mois une fois)"],
        ['Conversion', "À l'expiration de **6 mois** (prorogeables 3 mois une fois) sans concordat, la juridiction convertit le redressement en liquidation des biens", '-'],
      ] } },
      { type: 'filet', titre: 'La période suspecte (Art. 67-69)', texte: "Elle court de la **date de cessation des paiements** à la décision d'ouverture (Art. 67). Sont **inopposables de droit** à la masse les actes faits pendant cette période : actes à titre gratuit translatifs de propriété, contrats commutatifs déséquilibrés, paiements de dettes **non échues**, paiements de dettes échues par un mode anormal, sûretés réelles consenties pour garantir une dette antérieure, et inscriptions provisoires d'hypothèque ou de nantissement judiciaires conservatoires (Art. 68). Peuvent en outre être déclarés **inopposables facultativement**, s'ils ont causé préjudice à la masse, les actes à titre gratuit faits dans les six mois précédant la période suspecte et les actes à titre onéreux ou paiements reçus par qui connaissait la cessation des paiements (Art. 69)." },
      { type: 'paragraphe', texte: "**Les organes de la procédure (Art. 35, 39-49).** La décision d'ouverture désigne le **juge-commissaire** - parmi les juges du siège - qui veille au déroulement régulier et rapide de la procédure et à la protection des intérêts en présence, et un à trois **syndics**, mandataires judiciaires inscrits sur la liste nationale ; l'expert du règlement préventif du même débiteur ne peut être désigné syndic. Un à cinq **contrôleurs** peuvent être nommés parmi les créanciers non salariés, plus un contrôleur représentant du personnel ; leurs fonctions sont gratuites et ils ne répondent que de leurs fautes lourdes (Art. 48-49). Le ministère public est informé du déroulement de la procédure (Art. 47)." },
      { type: 'filet', titre: 'Les salaires sont super-privilégiés (Art. 95-96)', texte: "Les créances résultant du contrat de travail ou d'apprentissage sont garanties par le **super privilège des salaires** - qui couvre, dans la limite de la fraction insaisissable, les rémunérations dues au titre des **douze (12) derniers mois** (Art. 1-3). Le syndic doit les payer **au plus tard dans les dix (10) jours** de la décision d'ouverture, sur simple décision du juge-commissaire ; à défaut de fonds, elles sont acquittées sur les **premières rentrées**, avant toute autre créance." },
      { type: 'carte', titre: 'Les dirigeants fautifs répondent de la défaillance', liste: [
        "**Comblement du passif (Art. 183).** En cas d'insuffisance d'actif, la juridiction peut, en cas de **faute de gestion ayant contribué** à cette insuffisance, mettre les dettes de la personne morale, en tout ou partie, avec ou sans solidarité, à la charge de tous les dirigeants ou de certains d'entre eux - dirigeants de droit ou **de fait**, rémunérés ou non (Art. 180). L'action se prescrit par **trois (3) ans** à compter de l'arrêté définitif de l'état des créances (Art. 186).",
        "**Extension de la procédure (Art. 189).** Peut être déclaré personnellement en redressement judiciaire ou liquidation des biens le dirigeant qui a exercé une activité personnelle sous le couvert de la personne morale, disposé du crédit ou des biens sociaux comme des siens propres, ou poursuivi abusivement dans son intérêt personnel une exploitation déficitaire - ainsi que celui qui n'acquitte pas le passif mis à sa charge.",
        "**Faillite personnelle (Art. 194-203).** Prononcée notamment contre ceux qui ont soustrait la comptabilité, détourné ou dissimulé une partie de l'actif, reconnu frauduleusement des dettes inexistantes, ou usé du crédit et des biens sociaux comme des leurs (Art. 196). Elle emporte l'**interdiction générale de faire le commerce** et de diriger, gérer, administrer ou contrôler toute entreprise, pour une durée de **six (6) mois à dix (10) ans** (Art. 203).",
        "**Banqueroute.** Le Titre VI de l'AUPCAP (Art. 226 à 246) définit les éléments constitutifs de la banqueroute simple et de la banqueroute frauduleuse et des infractions assimilées, réprimées selon le droit pénal de chaque État partie.",
      ] },
      { type: 'paragraphe', texte: "**Clôtures et procédure simplifiée.** La liquidation des biens se clôt pour **insuffisance d'actif** - sans faire recouvrer aux créanciers l'exercice individuel de leurs actions, sauf exceptions telles que la faillite personnelle, la banqueroute ou la fraude (Art. 173-174) - ou pour **extinction du passif** (Art. 178), qui emporte la réhabilitation de plein droit du débiteur (Art. 204). La **liquidation des biens simplifiée** (Art. 179 à 179-10) est réservée à la petite entreprise **non propriétaire d'un actif immobilier** : vente de gré à gré des biens désignés par la juridiction dans les 90 jours, vérification limitée aux créances utiles et aux créances salariales, clôture au plus tard **cent vingt (120) jours** après l'ouverture, prorogeables de soixante (60) jours." },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[23] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas1',
    titre: 'Transformation contestée',
    contexte: "La SARL KINDU TRADE (4 associés, responsabilité limitée) décide de se transformer en SNC (responsabilité illimitée). 3 associés représentant 75% du capital votent pour. L'associé MWAMBA (25%) vote contre.",
    questions: [
      { num: 1, enonce: 'La transformation est-elle valide ?', correction: "Non. L'Art. 181 al. 3 AUSCGIE dispose que la transformation d'une société dans laquelle la responsabilité des associés est limitée à leurs apports en une société dans laquelle elle est illimitée est décidée à l'unanimité des associés - car elle aggrave l'engagement de chacun au-delà de son apport : un associé de SNC répond indéfiniment et solidairement des dettes sociales. Avec 75% seulement, l'unanimité fait défaut : le même Art. 181 al. 3 précise que les délibérations prises en violation de cette règle sont nulles. M. MWAMBA peut donc faire annuler la délibération. À l'inverse, une transformation dans l'autre sens (SNC vers SARL) suivrait les conditions ordinaires de modification des statuts, mais les créanciers antérieurs conserveraient leurs droits contre la société ET contre les associés (Art. 186 al. 2)." },
      { num: 2, enonce: 'Quels sont les effets de la transformation sur le gérant en place ?', correction: "L'Art. 184 AUSCGIE dispose que la décision de transformation met fin aux pouvoirs des organes d'administration ou de gestion de la société. Le gérant perd donc ses fonctions du seul fait de la transformation - régulièrement décidée. Il ne peut demander des dommages et intérêts du fait de la transformation (ou de son annulation) que s'il démontre qu'elle a été décidée dans le seul but de porter atteinte à ses droits (Art. 184 al. 2). Le rapport de gestion de l'exercice est établi par les anciens et les nouveaux organes, chacun pour sa période de gestion (Art. 185), et les droits et obligations contractés sous l'ancienne forme subsistent sous la nouvelle (Art. 186 al. 1)." },
    ],
  },
  {
    id: 'cas2',
    titre: 'Fusion-absorption',
    contexte: "La SA GOMA HOLDING veut absorber la SARL BUKAVU SERVICES. Le projet de fusion est établi, mais il n'a été déposé au RCCM et publié que 3 semaines avant l'AG d'approbation.",
    questions: [
      { num: 1, enonce: 'Cette opération respecte-t-elle le délai légal de publicité ? Une SA peut-elle d\'ailleurs absorber une SARL ?', correction: "Sur la forme : non. L'Art. 194 AUSCGIE impose que le dépôt du projet au RCCM du siège de chacune des sociétés et l'avis inséré dans un journal d'annonces légales aient lieu au moins un (1) mois avant la date de la première assemblée générale appelée à statuer sur l'opération. Trois semaines sont insuffisantes : la publicité est irrégulière et l'opération contestable. Sur le principe : oui - l'Art. 196 AUSCGIE permet, sauf disposition contraire de l'Acte uniforme, les fusions entre sociétés de forme différente ; une SA peut donc absorber une SARL. Chaque société décide dans les conditions requises pour la modification de ses propres statuts (Art. 197), et l'unanimité serait requise si l'opération augmentait les engagements des associés de l'une d'elles (Art. 197 al. 2)." },
      { num: 2, enonce: "Que se passe-t-il si les sociétés omettent de déposer la déclaration de conformité ?", correction: "L'Art. 198 AUSCGIE sanctionne cette omission par la nullité : à peine de nullité, les sociétés participant à une opération de fusion, scission ou apport partiel d'actifs sont tenues de déposer au greffe une déclaration dans laquelle elles relatent tous les actes effectués en vue d'y procéder et par laquelle elles affirment que l'opération a été réalisée en conformité de l'Acte uniforme. C'est le verrou final de la procédure : projet de fusion complet (Art. 193), publicité un mois avant l'AG (Art. 194), approbation par chaque société (Art. 197), puis déclaration de conformité (Art. 198). Si la fusion aboutit, elle emportera dissolution sans liquidation de BUKAVU SERVICES et transmission universelle de son patrimoine à GOMA HOLDING, ses associés devenant actionnaires de l'absorbante avec une soulte éventuelle plafonnée à 10% (Art. 191)." },
    ],
  },
  {
    id: 'cas3',
    titre: 'Entreprise en difficulté',
    contexte: "La SARL MANIEMA COMMERCE connaît des difficultés de trésorerie depuis 3 mois. Elle n'est pas encore en cessation des paiements, mais ses dettes fournisseurs s'accumulent. Le gérant hésite entre conciliation et règlement préventif.",
    questions: [
      { num: 1, enonce: 'Quelle procédure est la plus adaptée, et pourquoi ?', correction: "Les deux procédures préventives sont juridiquement ouvertes : la société n'est pas en cessation des paiements, condition commune (Art. 5-1 et 6 AUPCAP). Le choix dépend de la gravité et du besoin de discrétion. La conciliation (Art. 5-1 s.) convient aux difficultés avérées ou prévisibles : elle est consensuelle et strictement confidentielle - ni l'ouverture ni l'homologation de l'accord ne sont publiées (Art. 5-3, 5-10) -, courte (3 mois + 1), et aboutit à un accord amiable avec les principaux créanciers seulement. Le règlement préventif (Art. 6 s.) suppose des difficultés financières ou économiques sérieuses ; il est judiciaire et collectif : suspension générale des poursuites individuelles (Art. 9), discipline stricte du débiteur (Art. 11) et concordat préventif homologué s'imposant à tous les créanciers antérieurs (Art. 18). Pour des difficultés de trésorerie naissantes avec quelques fournisseurs à convaincre, la conciliation est la voie la plus adaptée - rapide, discrète, sans stigmate ; le règlement préventif se justifierait si le passif était plus large et nécessitait de discipliner l'ensemble des créanciers." },
      { num: 2, enonce: "Que se passe-t-il si la conciliation échoue et que l'entreprise tombe en cessation des paiements ?", correction: "D'abord, la survenance de la cessation des paiements met fin sans délai à la conciliation : le conciliateur et le débiteur doivent en informer le président, qui y met fin après les avoir entendus (Art. 5-6). Le débiteur doit alors déclarer sa cessation des paiements au greffe dans les trente (30) jours (Art. 25). La juridiction, constatant la cessation des paiements, choisit selon l'Art. 33 : redressement judiciaire si un concordat sérieux est proposé ou a des chances sérieuses d'être obtenu (ou si une cession globale est envisageable) - avec assistance du débiteur par le syndic (Art. 52) ; liquidation des biens dans le cas contraire - avec dessaisissement du débiteur et dissolution de plein droit de la personne morale (Art. 53). À noter : si un accord de conciliation avait été homologué et qu'une liquidation des biens est ouverte ensuite, les apporteurs d'argent frais de l'accord seraient payés par privilège (Art. 5-11)." },
    ],
  },
  {
    id: 'cas4',
    titre: "Apport partiel d'actif",
    contexte: "La SA KIVU INDUSTRY veut céder sa branche d'activité « distribution alimentaire » à une nouvelle SARL qu'elle vient de créer, tout en conservant sa branche « production industrielle ».",
    questions: [
      { num: 1, enonce: 'Quelle opération juridique convient à cette situation ?', correction: "L'apport partiel d'actif (Art. 195 AUSCGIE) : l'opération par laquelle une société fait apport d'une branche autonome d'activité à une société préexistante ou à créer. La société apporteuse NE DISPARAÎT PAS du fait de cet apport - KIVU INDUSTRY conserve sa branche production et reçoit, en contrepartie de l'apport, des parts de la SARL bénéficiaire. La condition de qualification est l'autonomie de la branche apportée : un ensemble cohérent d'actifs et de passifs capable d'un fonctionnement propre. L'apport partiel d'actif est soumis au régime de la scission, et il peut intervenir entre sociétés de forme différente (Art. 196) - ici d'une SA vers une SARL." },
      { num: 2, enonce: "Quelles formalités s'appliquent à cette opération ?", correction: "Le régime de la scission s'applique (Art. 195). (1) Un projet d'apport est établi par les organes de gestion des sociétés concernées, avec les mentions de l'Art. 193 : désignation et évaluation de l'actif et du passif transmis, rapport d'échange, prime éventuelle, droits particuliers. (2) Dépôt au RCCM et avis dans un journal d'annonces légales au moins un (1) mois avant la première AG appelée à statuer (Art. 194). (3) Décision, pour chaque société, dans les conditions requises pour la modification de ses statuts (Art. 197) - à l'unanimité si l'opération augmentait les engagements des associés. (4) Déclaration de conformité déposée au greffe, à peine de nullité (Art. 198)." },
    ],
  },
  {
    id: 'cas5',
    titre: 'Participations croisées',
    contexte: "La SA ALPHA détient 15% du capital de la SARL BETA. BETA souhaite à son tour acquérir 8% du capital d'ALPHA, « pour sceller le partenariat ». Les deux dirigeants vous consultent sur la licéité du montage.",
    questions: [
      { num: 1, enonce: "BETA peut-elle acquérir 8% du capital d'ALPHA ?", correction: "Non. L'Art. 177 AUSCGIE dispose qu'une société par actions ou une SARL ne peut posséder d'actions ou de parts sociales d'une autre société si celle-ci détient une fraction de son capital supérieure à dix pour cent (10%). ALPHA détenant 15% de BETA - soit plus de 10% -, BETA ne peut posséder aucune action d'ALPHA. Si le montage était néanmoins réalisé, la régularisation s'imposerait : à défaut d'accord entre les sociétés, c'est celle qui détient la fraction la plus faible du capital de l'autre - ici BETA avec 8% contre 15% - qui doit céder ses titres. Et jusqu'à leur cession effective, les actions à céder sont privées du droit de vote et du paiement des dividendes (Art. 177 al. 3) : la sanction neutralise immédiatement tout intérêt au capital fictif et au verrouillage réciproque des assemblées." },
      { num: 2, enonce: "Comment qualifier juridiquement la position d'ALPHA dans BETA ?", correction: "ALPHA a une participation dans BETA au sens de l'Art. 176 AUSCGIE : elle possède une fraction de capital égale ou supérieure à 10% (ici 15%). Elle n'est pas société mère : l'Art. 179 réserve cette qualité à la société qui possède plus de la moitié du capital de l'autre, laquelle devient alors sa filiale. ALPHA n'est pas davantage présumée contrôler BETA : la présomption de l'Art. 175 suppose plus de la moitié des droits de vote, détenus directement, indirectement ou par personne interposée, ou en vertu d'un accord avec d'autres associés - encore que le contrôle, défini comme la détention effective du pouvoir de décision (Art. 174), puisse en théorie être établi autrement. En l'état, ALPHA est donc un associé significatif titulaire d'une simple participation, et le groupe de sociétés (Art. 173) n'est pas constitué." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue2',
  numero: 9,
  id: 'ue2-chapitre9',
  titre: "Transformation des sociétés et difficultés d'entreprise",
  sousTitre: 'Art. 173-199 AUSCGIE révisé du 30 janvier 2014 et AUPCAP du 10 septembre 2015',
  infoBulle: "Transformation de la société, fusions, scissions et apports partiels d'actif, groupes de sociétés et participations croisées, puis le droit des entreprises en difficulté : conciliation, règlement préventif, redressement judiciaire et liquidation des biens de l'AUPCAP 2015.",
  loiRef: 'Art. 173-199 AUSCGIE · AUPCAP 2015',
  moduleLabel: 'UE 2 · Droit des sociétés',
  retourRoute: '/ue2-droit-societes',
  coursId: 'ue2-droit-societes',
  objectifs: [
    'Maîtriser le régime juridique de la transformation : décision, effets, protection des créanciers (Art. 181-188 AUSCGIE)',
    "Distinguer fusion, scission et apport partiel d'actif et dérouler leurs formalités (Art. 189-199)",
    'Qualifier les liens entre sociétés : groupe, contrôle, participation, filiale, participations croisées (Art. 173-180)',
    "Identifier les quatre procédures de l'AUPCAP 2015 et leurs conditions d'ouverture (Art. 2)",
    'Différencier conciliation et règlement préventif, puis redressement judiciaire et liquidation des biens',
  ],
  sections: SECTIONS,
  aRetenir: [
    "La transformation ne crée pas de personne morale nouvelle : simple modification des statuts, prenant effet au jour de la décision et opposable aux tiers après publicité (Art. 181-182) ; l'unanimité n'est exigée que pour passer d'une responsabilité limitée à une responsabilité illimitée, à peine de nullité (Art. 181 al. 3).",
    "La transformation met fin aux pouvoirs des organes de gestion (Art. 184), maintient droits, obligations et sûretés (Art. 186), et exige un commissaire à la transformation - à peine de nullité faute d'approbation expresse de l'évaluation - quand une société sans CAC devient société par actions (Art. 187-1).",
    "Fusion et scission emportent dissolution sans liquidation et transmission universelle du patrimoine, avec soulte plafonnée à 10% (Art. 191) ; l'apport partiel d'actif porte sur une branche autonome, sans disparition de l'apporteuse, sous le régime de la scission (Art. 195).",
    "La procédure des restructurations : projet complet (Art. 193), dépôt au RCCM et avis publié au moins un mois avant la première AG (Art. 194), décision aux conditions de modification des statuts - unanimité si les engagements augmentent (Art. 197) -, déclaration de conformité au greffe à peine de nullité (Art. 198).",
    "Participation = fraction égale ou supérieure à 10% (Art. 176) ; société mère = plus de la moitié du capital (Art. 179) ; le contrôle est la détention effective du pouvoir de décision, présumée au-delà de la moitié des droits de vote (Art. 174-175) ; les participations croisées prohibées privent les titres à céder du vote et des dividendes (Art. 177-178).",
    "L'AUPCAP 2015 organise quatre procédures : conciliation (préventive, consensuelle, confidentielle - 3 mois + 1), règlement préventif (difficultés sérieuses sans cessation des paiements, concordat préventif), redressement judiciaire (cessation des paiements, situation non irrémédiablement compromise) et liquidation des biens (situation irrémédiablement compromise) - Art. 2.",
    "La cessation des paiements - impossibilité de faire face au passif exigible avec l'actif disponible - doit être déclarée dans les 30 jours (Art. 25) ; le concordat préventif homologué s'impose à tous les créanciers antérieurs (Art. 18), et la suspension des poursuites épargne salaires et aliments (Art. 9).",
    "Redressement = assistance du débiteur ; liquidation = dessaisissement et dissolution de plein droit (Art. 52-53) ; les salaires super-privilégiés sont payés sous 10 jours (Art. 95-96) ; les dirigeants fautifs encourent comblement du passif, extension de la procédure et faillite personnelle de 6 mois à 10 ans (Art. 183, 189, 196, 203).",
  ],
  references: [
    {
      genre: 'texte',
      intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)",
      precision: 'adopté le 30 janvier 2014 à Ouagadougou, art. 173 à 199',
    },
    {
      genre: 'texte',
      intitule: "Acte uniforme portant organisation des procédures collectives d'apurement du passif (AUPCAP)",
      precision: "adopté le 10 septembre 2015 à Grand-Bassam (Côte d'Ivoire), publié au JO OHADA du 25 septembre 2015, art. 1 à 258",
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : AUSCGIE révisé du 30 janvier 2014, art. 173-199 · AUPCAP du 10 septembre 2015, art. 1 à 258',
}

export default chapitre
