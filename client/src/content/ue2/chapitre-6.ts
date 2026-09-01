// Chapitre 6 du module UE2, Droit des sociétés : contenu pur.
// Migré depuis l'ancienne page dédiée UE2Chapitre6Page.tsx vers le moteur
// commun components/chapitre/ChapitreManuscrit.tsx, avec vérification
// article par article sur le texte de l'AUSCGIE révisé (art. 869 à 885,
// lus intégralement). L'ancienne page était globalement fidèle au texte ;
// les citations de jurisprudence qui ne pouvaient être vérifiées sur une
// source de ce logiciel (arrêts CCJA, tribunal de commerce, Cour de
// cassation française) ont été retirées et remplacées par le fondement
// textuel des règles qu'elles illustraient (art. 872, 876 et 877).
// Enrichissements : art. 869 al. 3 (constitution sans capital), art. 873
// (publication de la décision d'exonération), art. 874 al. 2 (forme de la
// mise en demeure), art. 876 (admission et retrait des membres, publicité
// du contrat, sigle obligatoire), art. 877 al. 3 (voix inégales), art. 881
// (répression en cas d'émission d'obligations).
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'gie-q1', question: "Selon l'article 869 de l'AUSCGIE, quel est le but exclusif du GIE ?",
    options: [
      { id: 'a', texte: "Réaliser et partager des bénéfices entre ses membres" },
      { id: 'b', texte: "Faciliter ou développer l'activité économique de ses membres" },
      { id: 'c', texte: "Créer une entreprise commune indépendante de ses membres" },
      { id: 'd', texte: "Gérer le patrimoine collectif de ses membres" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 869 AUSCGIE',
    explication: "L'Art. 869 dispose que le GIE a pour but exclusif de mettre en œuvre, pour une durée déterminée, tous les moyens propres à faciliter ou à développer l'activité économique de ses membres, à améliorer ou à accroître les résultats de cette activité. Son activité doit se rattacher à l'activité économique de ses membres et ne peut avoir qu'un caractère auxiliaire par rapport à celle-ci.",
  },
  {
    id: 'gie-q2', question: "Selon l'article 870 de l'AUSCGIE, le GIE peut-il donner lieu à réalisation et partage de bénéfices ?",
    options: [
      { id: 'a', texte: "Oui, si le contrat de groupement le prévoit" },
      { id: 'b', texte: "Oui, si l'assemblée générale l'autorise à la majorité" },
      { id: 'c', texte: "Non, le GIE ne donne pas lieu par lui-même à réalisation et à partage des bénéfices" },
      { id: 'd', texte: "Oui, uniquement pour les membres personnes morales" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 870 AUSCGIE',
    explication: "L'Art. 870 est formel : le GIE ne donne pas lieu par lui-même à réalisation et à partage des bénéfices. C'est l'une des différences fondamentales entre le GIE et les sociétés commerciales.",
  },
  {
    id: 'gie-q3', question: "Combien de personnes minimum sont nécessaires pour constituer un GIE selon l'article 871 ?",
    options: [
      { id: 'a', texte: "Une (1) personne physique ou morale" },
      { id: 'b', texte: "Trois (3) personnes physiques ou morales" },
      { id: 'c', texte: "Deux (2) personnes physiques ou morales" },
      { id: 'd', texte: "Cinq (5) personnes physiques ou morales" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 871 AUSCGIE',
    explication: "Selon l'Art. 871 AUSCGIE, deux (2) ou plusieurs personnes physiques ou morales peuvent constituer entre elles un GIE, y compris les personnes exerçant une profession libérale soumise à un statut législatif ou réglementaire ou dont le titre est protégé.",
  },
  {
    id: 'gie-q4', question: "Selon l'article 871, les droits des membres du GIE peuvent-ils être représentés par des titres négociables ?",
    options: [
      { id: 'a', texte: "Oui, si le contrat de groupement le prévoit" },
      { id: 'b', texte: "Non, les droits des membres ne peuvent être représentés par des titres négociables" },
      { id: 'c', texte: "Oui, mais uniquement sous forme d'obligations" },
      { id: 'd', texte: "Oui, avec l'accord de l'assemblée générale à l'unanimité" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 871 AUSCGIE',
    explication: "L'Art. 871 al. 2 dispose expressément que les droits des membres ne peuvent être représentés par des titres négociables. Cette règle est absolue et ne souffre d'aucune dérogation contractuelle.",
  },
  {
    id: 'gie-q5', question: "À quel moment le GIE acquiert-il la personnalité morale selon l'article 872 ?",
    options: [
      { id: 'a', texte: "À la signature du contrat de groupement" },
      { id: 'b', texte: "À la date de la première assemblée générale" },
      { id: 'c', texte: "À compter de son immatriculation au RCCM" },
      { id: 'd', texte: "À la date de publication dans le journal d'annonces légales" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 872 AUSCGIE',
    explication: "L'Art. 872 dispose que le GIE jouit de la personnalité morale et de la pleine capacité à compter de son immatriculation au registre du commerce et du crédit mobilier. Sans immatriculation, pas de personnalité morale.",
  },
  {
    id: 'gie-q6', question: "Selon l'article 873, sur quoi les membres du GIE sont-ils tenus des dettes du groupement ?",
    options: [
      { id: 'a', texte: "Dans la limite de leurs apports uniquement" },
      { id: 'b', texte: "Sur leur patrimoine propre (responsabilité indéfinie)" },
      { id: 'c', texte: "Dans la limite d'un plafond fixé par le contrat" },
      { id: 'd', texte: "Uniquement si le GIE est insolvable depuis plus de 6 mois" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 873 AUSCGIE',
    explication: "L'Art. 873 al. 1 dispose que les membres du GIE sont tenus des dettes du groupement sur leur patrimoine propre : responsabilité indéfinie, comparable à celle des associés d'une SNC. Ils sont en outre solidaires du paiement des dettes, sauf convention contraire avec le tiers cocontractant (al. 2).",
  },
  {
    id: 'gie-q7', question: "Selon l'article 874, avant de poursuivre un membre du GIE pour le paiement d'une dette, que doit faire le créancier ?",
    options: [
      { id: 'a', texte: "Obtenir un jugement contre le GIE" },
      { id: 'b', texte: "Attendre 3 ans après la naissance de la dette" },
      { id: 'c', texte: "Avoir vainement mis en demeure le groupement" },
      { id: 'd', texte: "Obtenir l'accord de l'assemblée générale des membres" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 874 AUSCGIE',
    explication: "L'Art. 874 dispose que les créanciers du groupement ne peuvent poursuivre le paiement des dettes contre un associé qu'après avoir vainement mis en demeure le groupement. La mise en demeure est faite par exploit d'huissier ou notifiée par tout moyen permettant d'établir sa réception effective par le destinataire.",
  },
  {
    id: 'gie-q8', question: "Selon l'article 875, à quelle condition le GIE peut-il émettre des obligations ?",
    options: [
      { id: 'a', texte: "Toujours, sans condition particulière" },
      { id: 'b', texte: "S'il est composé exclusivement de sociétés autorisées à émettre des obligations" },
      { id: 'c', texte: "Si au moins la moitié des membres sont des sociétés anonymes" },
      { id: 'd', texte: "Avec l'autorisation de la juridiction compétente" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 875 AUSCGIE',
    explication: "L'Art. 875 permet au GIE d'émettre des obligations, aux conditions générales d'émission de ces titres, uniquement s'il est lui-même composé exclusivement de sociétés autorisées à émettre des obligations. La condition tient donc strictement à la composition du groupement.",
  },
  {
    id: 'gie-q9', question: "Quand le contrat de groupement ne précise pas la contribution aux dettes, quelle règle s'applique ?",
    options: [
      { id: 'a', texte: "Chaque membre supporte une part proportionnelle à ses apports" },
      { id: 'b', texte: "Le membre le plus important supporte la totalité des dettes" },
      { id: 'c', texte: "Chaque membre supporte une part égale" },
      { id: 'd', texte: "Les dettes sont réparties selon l'ancienneté des membres" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 876 AUSCGIE',
    explication: "L'Art. 876 dispose que le contrat fixe librement la contribution de chaque membre aux dettes ; à défaut, chaque membre supporte une part égale. Le contrat peut prévoir une autre répartition, mais la règle supplétive est l'égalité.",
  },
  {
    id: 'gie-q10', question: "Parmi les mentions obligatoires du contrat de groupement (Art. 876), laquelle figure dans la liste légale ?",
    options: [
      { id: 'a', texte: "Le montant du capital social du GIE" },
      { id: 'b', texte: "La liste des biens apportés par chaque membre" },
      { id: 'c', texte: "La durée pour laquelle le GIE est constitué" },
      { id: 'd', texte: "Le nombre minimum de salariés du GIE" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 876 AUSCGIE',
    explication: "L'Art. 876 impose cinq mentions au contrat, rédigé par écrit : 1°) la dénomination ; 2°) l'identité, la forme, l'adresse et le numéro RCCM de chaque membre ; 3°) la durée pour laquelle le GIE est constitué ; 4°) l'objet ; 5°) l'adresse du siège. Le capital social n'y figure pas : le GIE peut être constitué sans capital (Art. 869 al. 3).",
  },
  {
    id: 'gie-q11', question: "Dans le silence du contrat, comment les décisions de l'assemblée générale du GIE sont-elles prises ?",
    options: [
      { id: 'a', texte: "À la majorité simple des membres présents" },
      { id: 'b', texte: "À la majorité des deux tiers" },
      { id: 'c', texte: "À l'unanimité" },
      { id: 'd', texte: "À la majorité absolue de tous les membres" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 877 AUSCGIE',
    explication: "L'Art. 877 al. 2 dispose que le contrat peut prévoir que toutes les décisions, ou certaines d'entre elles, sont prises aux conditions de quorum et de majorité qu'il fixe ; dans le silence du contrat, les décisions sont prises à l'unanimité. Chaque membre dispose alors d'un véritable droit de veto.",
  },
  {
    id: 'gie-q12', question: "Qui peut exiger la convocation obligatoire de l'assemblée générale du GIE ?",
    options: [
      { id: 'a', texte: "Un seul membre du GIE" },
      { id: 'b', texte: "Un tiers au moins des membres en nombre" },
      { id: 'c', texte: "Un quart au moins des membres en nombre" },
      { id: 'd', texte: "La moitié au moins des membres en nombre" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 878 AUSCGIE',
    explication: "L'Art. 878 dispose que l'assemblée est obligatoirement réunie à la demande d'un quart au moins des membres du GIE en nombre. Cette règle impérative protège les membres minoritaires.",
  },
  {
    id: 'gie-q13', question: "Les limitations de pouvoirs imposées à un administrateur du GIE sont-elles opposables aux tiers ?",
    options: [
      { id: 'a', texte: "Oui, si elles sont publiées au RCCM" },
      { id: 'b', texte: "Oui, si le tiers en avait connaissance" },
      { id: 'c', texte: "Non, toute limitation de pouvoirs est inopposable aux tiers" },
      { id: 'd', texte: "Oui, si elles figurent dans le contrat de groupement" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 879 AUSCGIE',
    explication: "L'Art. 879 dispose que, dans les rapports avec les tiers, un administrateur engage le GIE pour tout acte entrant dans l'objet de celui-ci et que toute limitation de pouvoirs est inopposable aux tiers. La règle protège la sécurité des transactions conclues avec le groupement.",
  },
  {
    id: 'gie-q14', question: "Lorsque le GIE émet des obligations, quelle est la durée du mandat du commissaire aux comptes ?",
    options: [
      { id: 'a', texte: "Trois (3) exercices" },
      { id: 'b', texte: "Cinq (5) exercices" },
      { id: 'c', texte: "Six (6) exercices" },
      { id: 'd', texte: "Quatre (4) exercices" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 880 AUSCGIE',
    explication: "L'Art. 880 dispose que, lorsque le GIE émet des obligations, le contrôle des états financiers de synthèse doit être exercé par un ou plusieurs commissaires aux comptes choisis sur la liste officielle et nommés par l'assemblée pour une durée de six (6) exercices. Le commissaire a alors le même statut, les mêmes attributions et les mêmes responsabilités que celui d'une SA.",
  },
  {
    id: 'gie-q15', question: "La transformation d'une société en GIE entraîne-t-elle la dissolution de la société ?",
    options: [
      { id: 'a', texte: "Oui, avec création d'une nouvelle personne morale" },
      { id: 'b', texte: "Non, la transformation se fait sans dissolution ni création d'une personne morale nouvelle" },
      { id: 'c', texte: "Oui, mais la nouvelle personne morale reprend toutes les obligations" },
      { id: 'd', texte: "Non, mais elle entraîne la création d'une nouvelle personne morale" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 882 AUSCGIE',
    explication: "L'Art. 882 al. 1 dispose que toute société dont l'objet correspond à la définition du GIE peut être transformée en GIE sans donner lieu à dissolution ou à création d'une personne morale nouvelle. La continuité juridique est totale.",
  },
  {
    id: 'gie-q16', question: "Un GIE peut être transformé en quelle(s) forme(s) de société sans dissolution ?",
    options: [
      { id: 'a', texte: "En SA ou en SAS uniquement" },
      { id: 'b', texte: "En SNC ou en SARL" },
      { id: 'c', texte: "En SA, SNC ou SARL au choix" },
      { id: 'd', texte: "En coopérative uniquement" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 882 AUSCGIE',
    explication: "L'Art. 882 al. 2 prévoit qu'un GIE peut être transformé en société en nom collectif ou en société à responsabilité limitée, sans dissolution ni création d'une personne morale nouvelle. La transformation en SA n'est pas prévue par ce texte.",
  },
  {
    id: 'gie-q17', question: "Parmi les causes de dissolution du GIE listées à l'article 883, laquelle est correcte ?",
    options: [
      { id: 'a', texte: "La perte de la moitié du capital social" },
      { id: 'b', texte: "L'arrivée du terme pour lequel le GIE a été constitué" },
      { id: 'c', texte: "La réduction du nombre de membres en dessous de cinq" },
      { id: 'd', texte: "Le refus d'un exercice par le commissaire aux comptes" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 883 AUSCGIE',
    explication: "L'Art. 883 liste cinq causes de dissolution : 1°) l'arrivée du terme ; 2°) la réalisation ou l'extinction de l'objet ; 3°) la décision des membres dans les conditions de l'Art. 877 ; 4°) la décision judiciaire pour justes motifs ; 5°) le décès d'une personne physique ou la dissolution d'une personne morale membre, sauf clause contraire du contrat.",
  },
  {
    id: 'gie-q18', question: "Si un membre du GIE est frappé d'incapacité, que se passe-t-il par défaut ?",
    options: [
      { id: 'a', texte: "Le GIE continue automatiquement avec les membres restants" },
      { id: 'b', texte: "Le GIE est dissout, à moins que sa continuation soit prévue par le contrat ou décidée à l'unanimité des autres membres" },
      { id: 'c', texte: "Le membre incapable est remplacé par son héritier" },
      { id: 'd', texte: "Le GIE est suspendu pendant 6 mois avant dissolution" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 884 AUSCGIE',
    explication: "L'Art. 884 dispose que si l'un des membres est frappé d'incapacité, de faillite personnelle ou d'interdiction de diriger, gérer, administrer ou contrôler une entreprise, le GIE est dissout, à moins que sa continuation ne soit prévue par le contrat ou que les autres membres ne le décident à l'unanimité.",
  },
  {
    id: 'gie-q19', question: "Après dissolution du GIE, si le contrat ne prévoit pas les modalités de répartition de l'excédent d'actif, comment est-il réparti ?",
    options: [
      { id: 'a', texte: "Proportionnellement aux apports" },
      { id: 'b', texte: "Il est versé à l'État" },
      { id: 'c', texte: "Par parts égales entre les membres" },
      { id: 'd', texte: "Selon l'ancienneté des membres" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 885 AUSCGIE',
    explication: "L'Art. 885 dispose qu'après paiement des dettes, l'excédent d'actif est réparti entre les membres dans les conditions prévues par le contrat ; à défaut, la répartition est faite par parts égales.",
  },
  {
    id: 'gie-q20', question: "Dans le silence du contrat, de combien de voix chaque membre dispose-t-il à l'assemblée générale du GIE ?",
    options: [
      { id: 'a', texte: "D'un nombre de voix proportionnel à sa contribution aux dettes" },
      { id: 'b', texte: "D'une voix - le contrat pouvant toutefois attribuer à chaque membre un nombre de voix différent" },
      { id: 'c', texte: "De deux voix pour les membres fondateurs" },
      { id: 'd', texte: "D'un nombre de voix fixé chaque année par l'administrateur" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 877 al. 3 AUSCGIE',
    explication: "L'Art. 877 al. 3 permet au contrat d'attribuer à chaque membre un nombre de voix différent de celui attribué aux autres ; à défaut, chaque membre dispose d'une voix. L'assemblée générale est par ailleurs habilitée à prendre toute décision, y compris de dissolution anticipée ou de prorogation (Art. 877 al. 1).",
  },
  {
    id: 'gie-n1', question: "Un membre peut-il se retirer du GIE en cours de vie sociale ?",
    options: [
      { id: 'a', texte: "Non, l'adhésion est définitive jusqu'au terme" },
      { id: 'b', texte: "Oui, dans les conditions prévues par le contrat, sous réserve d'avoir exécuté ses obligations (Art. 876)" },
      { id: 'c', texte: "Oui, librement et sans condition" },
      { id: 'd', texte: "Uniquement avec l'autorisation de la juridiction compétente" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 876 AUSCGIE',
    explication: "L'Art. 876 prévoit qu'au cours de la vie sociale, le groupement peut accepter de nouveaux membres dans les conditions fixées par le contrat, et que tout membre peut se retirer dans les conditions prévues par le contrat, sous réserve qu'il ait exécuté ses obligations.",
  },
  {
    id: 'gie-n2', question: "Un nouveau membre du GIE peut-il échapper aux dettes nées avant son entrée ?",
    options: [
      { id: 'a', texte: "Non, jamais : il répond de toutes les dettes du groupement" },
      { id: 'b', texte: "Oui, si le contrat le permet - et la décision d'exonération doit être publiée (Art. 873)" },
      { id: 'c', texte: "Oui, automatiquement pour toutes les dettes antérieures" },
      { id: 'd', texte: "Oui, sur simple lettre adressée aux créanciers" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 873 AUSCGIE',
    explication: "L'Art. 873 al. 1 permet d'exonérer un nouveau membre des dettes nées antérieurement à son entrée dans le groupement, à la double condition que le contrat le permette et que la décision d'exonération soit publiée. Sans clause et sans publication, le nouveau membre répond de l'ensemble des dettes sur son patrimoine propre.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '6.1',
    titre: 'Définition, nature et caractères du GIE (Art. 869-871)',
    navLabel: '6.1 Définition et caractères',
    blocs: [
      { type: 'paragraphe', texte: "Le **groupement d'intérêt économique (GIE)** est une structure originale, distincte des sociétés commerciales par son objet, son fonctionnement et l'absence de capital obligatoire. Il n'est pas une fin en soi : il est l'outil commun d'entreprises ou de professionnels qui conservent chacun leur activité propre." },
      { type: 'filet', titre: 'Art. 869 AUSCGIE', texte: "« Le groupement d'intérêt économique est celui qui a pour but exclusif de mettre en œuvre pour une durée déterminée, tous les moyens propres à faciliter ou à développer l'activité économique de ses membres, à améliorer ou à accroître les résultats de cette activité. Son activité doit se rattacher à l'activité économique de ses membres et ne peut avoir qu'un caractère auxiliaire par rapport à celle-ci. Il peut être constitué **sans capital**. »" },
      { type: 'carte', titre: 'Les caractères essentiels', liste: [
        "**But exclusif** : le GIE ne peut servir que l'activité économique de ses membres. Chaque membre doit avoir une activité préexistante à laquelle le groupement apporte un soutien - un GIE qui développerait une activité autonome et principale sortirait de sa définition légale.",
        "**Caractère auxiliaire** : l'activité du GIE se rattache à celle de ses membres et n'est jamais qu'un accessoire. C'est la condition de qualification du groupement.",
        "**Pas de partage de bénéfices** : le GIE ne donne pas lieu par lui-même à réalisation et à partage des bénéfices (Art. 870) ; les gains d'efficacité reviennent aux membres sous forme de coûts réduits, non de dividendes.",
        "**Durée déterminée** : exigée par l'Art. 869 et mentionnée obligatoirement au contrat (Art. 876).",
        "**Sans capital** : le GIE peut être constitué sans capital (Art. 869 al. 3) - cotisations, mises à disposition de moyens ou de personnel suffisent.",
        "**Titres non négociables** : les droits des membres ne peuvent être représentés par des titres négociables (Art. 871 al. 2).",
      ] },
      { type: 'carte', titre: 'Comparatif : GIE, SARL, SNC', tableau: { entetes: ['Critère', 'GIE', 'SARL', 'SNC'], lignes: [
        ['But', "Auxiliaire : faciliter l'activité des membres (Art. 869)", 'Réaliser et partager des bénéfices', 'Réaliser et partager des bénéfices'],
        ['Capital minimum', 'Aucun - constitution sans capital possible', '1 000 000 FCFA sauf dispositions nationales contraires (Art. 311)', 'Aucun'],
        ['Partage des bénéfices', 'Non (Art. 870)', 'Oui', 'Oui'],
        ['Responsabilité des membres', 'Indéfinie sur le patrimoine propre, solidaire sauf convention contraire (Art. 873)', 'Limitée aux apports (Art. 309)', 'Indéfinie et solidaire (Art. 270)'],
        ['Durée', 'Déterminée, obligatoire (Art. 869)', '99 ans max (Art. 28)', '99 ans max (Art. 28)'],
        ['Titres négociables', 'Interdits (Art. 871)', 'Non (parts sociales)', 'Non (parts sociales)'],
      ] } },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[3] },
    ],
  },
  {
    numero: '6.2',
    titre: 'Constitution et contrat de groupement (Art. 871-872, 876)',
    navLabel: '6.2 Constitution',
    blocs: [
      { type: 'paragraphe', texte: "**Qui peut constituer un GIE ?** Deux (2) ou plusieurs personnes physiques ou morales, **y compris les personnes exerçant une profession libérale** soumise à un statut législatif ou réglementaire ou dont le titre est protégé (Art. 871) : médecins, avocats, experts-comptables ou architectes peuvent ainsi mutualiser leurs moyens dans un GIE. Le groupement jouit de la personnalité morale et de la **pleine capacité à compter de son immatriculation au RCCM** (Art. 872) : avant l'immatriculation, il ne peut ni contracter, ni ester en justice, ni posséder de patrimoine." },
      { type: 'carte', titre: 'Le contrat de groupement (Art. 876) : cinq mentions obligatoires', tableau: { entetes: ['N°', 'Mention', 'Précision'], lignes: [
        ['1', 'La dénomination du GIE', "Sur tous les actes destinés aux tiers, elle est suivie des mots « groupement d'intérêt économique » ou du sigle « G.I.E. » - toute infraction constitue une contravention"],
        ['2', 'L\'identité des membres', 'Nom, raison ou dénomination sociale, forme juridique, adresse du domicile ou du siège et, s\'il y a lieu, numéro RCCM de chacun'],
        ['3', 'La durée', 'Déterminée, conformément à l\'Art. 869'],
        ['4', 'L\'objet', "Auxiliaire à l'activité économique des membres"],
        ['5', "L'adresse du siège", 'Siège du groupement'],
      ] }, note: "Le contrat est rédigé **par écrit** et soumis aux mêmes conditions de publicité que les sociétés ; toutes ses modifications sont établies et publiées dans les mêmes conditions et ne sont opposables aux tiers qu'à dater de cette publicité (Art. 876)." },
      { type: 'paragraphe', texte: "**Le contrat, constitution du groupement.** Sous réserve des dispositions de l'Acte uniforme, le contrat détermine librement l'organisation du GIE et fixe la **contribution de chaque membre aux dettes** - à défaut, chaque membre supporte une part égale. Au cours de la vie sociale, le groupement peut **accepter de nouveaux membres** dans les conditions fixées par le contrat, et **tout membre peut se retirer** dans les conditions prévues, sous réserve d'avoir exécuté ses obligations (Art. 876)." },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[20] },
    ],
  },
  {
    numero: '6.3',
    titre: 'La responsabilité des membres (Art. 873-875)',
    navLabel: '6.3 Responsabilité des membres',
    blocs: [
      { type: 'paragraphe', texte: "La contrepartie de la souplesse du GIE est la rigueur du régime de responsabilité : les membres sont tenus des dettes du groupement **sur leur patrimoine propre** (Art. 873 al. 1) - responsabilité indéfinie, sans plafond, comparable à celle des associés d'une SNC - et ils sont **solidaires** du paiement des dettes, **sauf convention contraire avec le tiers cocontractant** (Art. 873 al. 2). La solidarité peut donc être écartée, mais uniquement dans le contrat conclu avec le créancier lui-même : une clause du contrat de groupement n'y suffirait pas." },
      { type: 'filet', titre: "Deux protections des membres", texte: "**L'exonération du nouveau membre** : un membre qui entre dans le groupement peut, *si le contrat le permet*, être exonéré des dettes nées antérieurement à son entrée - et la décision d'exonération **doit être publiée** (Art. 873 al. 1). **La mise en demeure préalable** : les créanciers ne peuvent poursuivre un membre qu'après avoir **vainement mis en demeure le groupement**, par exploit d'huissier ou par tout moyen permettant d'établir sa réception effective (Art. 874). C'est une condition de recevabilité de toute poursuite individuelle." },
      { type: 'carte', titre: 'Comparatif des régimes de responsabilité', tableau: { entetes: ['Forme', 'Étendue', 'Solidarité', 'Poursuite préalable de la structure'], lignes: [
        ['GIE', 'Indéfinie, sur le patrimoine propre (Art. 873)', 'Oui, sauf convention contraire avec le tiers', 'Mise en demeure vaine du groupement (Art. 874)'],
        ['SNC', 'Indéfinie (Art. 270)', 'Oui', 'Mise en demeure vaine + 60 jours (Art. 271)'],
        ['SARL', 'Limitée aux apports (Art. 309)', 'Non', 'Sans objet'],
        ['SA', 'Limitée aux apports (Art. 385)', 'Non', 'Sans objet'],
      ] } },
      { type: 'paragraphe', texte: "**L'émission d'obligations (Art. 875).** Le GIE peut émettre des obligations, aux conditions générales d'émission de ces titres, à la seule condition d'être **composé exclusivement de sociétés autorisées à émettre des obligations**. Dans ce cas, la répression des infractions relatives aux obligations s'applique aux dirigeants du groupement ainsi qu'aux dirigeants des sociétés membres (Art. 881)." },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[21] },
    ],
  },
  {
    numero: '6.4',
    titre: "Administration, assemblée générale et contrôle (Art. 877-881)",
    navLabel: '6.4 Gouvernance et contrôle',
    blocs: [
      { type: 'paragraphe', texte: "**L'administration (Art. 879).** Le GIE est administré par une ou plusieurs personnes **physiques ou morales** - une personne morale administratrice devant désigner un représentant permanent qui encourt les mêmes responsabilités civiles et pénales que s'il était administrateur en son nom propre. Le contrat, ou à défaut l'assemblée, organise librement l'administration, nomme les administrateurs et détermine leurs attributions, leurs pouvoirs et leurs conditions de révocation. Dans les rapports avec les tiers, un administrateur engage le groupement pour **tout acte entrant dans l'objet** de celui-ci, et **toute limitation de pouvoirs est inopposable aux tiers**." },
      { type: 'filet', titre: "L'assemblée générale, organe souverain (Art. 877-878)", texte: "L'assemblée générale des membres est **habilitée à prendre toute décision**, y compris de dissolution anticipée ou de prorogation, dans les conditions déterminées par le contrat (Art. 877 al. 1). Le contrat peut fixer des conditions de quorum et de majorité ; **dans son silence, les décisions sont prises à l'unanimité** (al. 2). Il peut aussi attribuer à chaque membre un nombre de voix différent ; **à défaut, chaque membre dispose d'une voix** (al. 3). Enfin, l'assemblée est **obligatoirement réunie** à la demande d'un quart au moins des membres en nombre (Art. 878) - garantie impérative des minoritaires." },
      { type: 'paragraphe', texte: "**Le contrôle (Art. 880).** En principe, le contrôle de la gestion et celui des états financiers de synthèse sont exercés dans les conditions prévues par le contrat. Mais lorsque le GIE **émet des obligations**, la loi impose un double contrôle : un **contrôle de gestion** par une ou plusieurs personnes physiques nommées par l'assemblée, et un **contrôle des états financiers** par un ou plusieurs commissaires aux comptes choisis sur la liste officielle et nommés par l'assemblée pour **six (6) exercices** - avec le même statut, les mêmes attributions et les mêmes responsabilités que le commissaire aux comptes d'une SA." },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[19] },
    ],
  },
  {
    numero: '6.5',
    titre: 'La transformation du GIE (Art. 882)',
    navLabel: '6.5 Transformation',
    blocs: [
      { type: 'paragraphe', texte: "L'Art. 882 organise les transformations dans les deux sens, sous le signe de la **continuité juridique** : aucune de ces opérations n'entraîne dissolution ni création d'une personne morale nouvelle. Les contrats en cours, les dettes, les créances et le personnel suivent la personne morale qui change simplement de forme." },
      { type: 'carte', titre: 'Les trois transformations de l\'Art. 882', tableau: { entetes: ['Opération', 'Condition', 'Effet', 'Protection des créanciers'], lignes: [
        ['Société → GIE', "L'objet de la société doit correspondre à la définition du GIE (activité auxiliaire)", 'Ni dissolution ni personne morale nouvelle', 'Continuité des droits'],
        ['GIE → SNC', '-', 'Ni dissolution ni personne morale nouvelle', "Continuité - le régime de responsabilité indéfinie et solidaire demeure"],
        ['GIE → SARL', '-', 'Ni dissolution ni personne morale nouvelle', "**Règle spéciale** : les créanciers dont la dette est antérieure à la transformation conservent leurs droits contre le GIE **et ses associés**"],
      ] }, note: "La protection renforcée du passage en SARL s'explique par le changement de régime de responsabilité : les créanciers qui avaient contracté en comptant sur la responsabilité indéfinie des membres ne peuvent se voir opposer la limitation aux apports pour leurs créances antérieures (Art. 882 al. 3)." },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[15] },
    ],
  },
  {
    numero: '6.6',
    titre: 'Dissolution et liquidation (Art. 883-885)',
    navLabel: '6.6 Dissolution et liquidation',
    blocs: [
      { type: 'carte', titre: 'Les cinq causes de dissolution (Art. 883)', tableau: { entetes: ['N°', 'Cause', 'Observation'], lignes: [
        ['1', "L'arrivée du terme", 'Le GIE étant à durée déterminée (Art. 869), le terme emporte dissolution, sauf prorogation décidée par l\'assemblée (Art. 877)'],
        ['2', "La réalisation ou l'extinction de l'objet", "L'objet accompli ou devenu impossible fait disparaître la raison d'être du groupement"],
        ['3', 'La décision des membres', "Dans les conditions de l'Art. 877 : majorité contractuelle ou, dans le silence du contrat, unanimité"],
        ['4', 'La décision judiciaire pour justes motifs', 'Prononcée par la juridiction compétente'],
        ['5', "Le décès d'une personne physique ou la dissolution d'une personne morale membre", '**Sauf clause contraire du contrat**'],
      ] } },
      { type: 'filet', titre: "Incapacité, faillite ou interdiction d'un membre (Art. 884)", texte: "Si l'un des membres est frappé d'incapacité, de faillite personnelle ou d'interdiction de diriger, gérer, administrer ou contrôler une entreprise, quelle qu'en soit la forme ou l'objet, le GIE est **dissout** - à moins que sa continuation ne soit prévue par le contrat, ou que **les autres membres ne le décident à l'unanimité**. Une simple majorité ne suffit pas en l'absence de clause." },
      { type: 'paragraphe', texte: "**La liquidation (Art. 885).** La dissolution du GIE entraîne sa liquidation, et **la personnalité du groupement subsiste pour les besoins de sa liquidation**. Celle-ci s'opère conformément aux dispositions du contrat ; à défaut, un liquidateur est nommé par l'assemblée générale ou, si elle n'a pu y procéder, par décision de la juridiction compétente. Après paiement des dettes, **l'excédent d'actif est réparti** entre les membres dans les conditions prévues par le contrat - à défaut, **par parts égales**." },
      { type: 'controle', question: QCM[16] },
      { type: 'controle', question: QCM[17] },
      { type: 'controle', question: QCM[18] },
      { type: 'controle', question: QCM[8] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: "Médecins et création d'un GIE",
    contexte: "M. DIALLO est médecin généraliste installé en ville. Il souhaite créer, avec cinq autres médecins spécialistes, un groupement d'intérêt économique afin de partager un laboratoire d'analyses médicales et d'optimiser les coûts de fonctionnement de leurs cabinets respectifs. Ces médecins exercent une profession libérale soumise à un statut législatif. Ils se demandent si la loi leur permet de constituer un GIE et selon quelles conditions.",
    questions: [
      { num: 1, enonce: "Les médecins exerçant une profession libérale réglementée peuvent-ils constituer un GIE ?", correction: "Oui. L'Art. 871 AUSCGIE dispose expressément que deux (2) ou plusieurs personnes physiques ou morales peuvent constituer entre elles un GIE, y compris les personnes exerçant une profession libérale soumise à un statut législatif ou réglementaire ou dont le titre est protégé. Les médecins entrent parfaitement dans cette catégorie." },
      { num: 2, enonce: "Quelles sont les conditions de constitution ?", correction: "(a) Être au moins deux personnes (Art. 871) ; (b) avoir chacun une activité économique propre à laquelle le GIE sera auxiliaire - le partage du laboratoire facilite l'activité des cabinets, ce qui correspond au but exclusif de l'Art. 869 ; (c) rédiger par écrit un contrat de groupement comportant les cinq mentions obligatoires de l'Art. 876 (dénomination, identité des membres, durée déterminée, objet, siège), soumis aux mêmes conditions de publicité que les sociétés ; (d) immatriculer le groupement au RCCM." },
      { num: 3, enonce: "Les médecins doivent-ils disposer d'un capital minimum pour créer ce GIE ?", correction: "Non. L'Art. 869 al. 3 dispose expressément que le GIE « peut être constitué sans capital ». Aucun capital minimum n'est exigé : le groupement peut fonctionner par cotisations des membres ou par mise en commun de moyens. C'est l'un des traits qui le distinguent des sociétés commerciales." },
      { num: 4, enonce: "La création du GIE suffit-elle à lui conférer la personnalité morale ?", correction: "Non. La seule signature du contrat ne suffit pas : l'Art. 872 dispose que le GIE jouit de la personnalité morale et de la pleine capacité à compter de son immatriculation au RCCM. Avant l'immatriculation, le groupement ne peut ni contracter en son nom, ni ester en justice, ni posséder de patrimoine : l'immatriculation est constitutive, non déclarative." },
    ],
  },
  {
    id: 'cp2',
    titre: "Prise de décision et exclusion d'un membre",
    contexte: "Le GIE TRANSPORT-AFRIQUE regroupe sept transporteurs. Son contrat de groupement ne contient aucune clause sur les modalités de prise de décision. Une assemblée est réunie et cinq membres sur sept votent pour exclure le membre M. KONÉ, qui perturberait le fonctionnement du groupement selon eux. M. KONÉ conteste cette décision. Par ailleurs, le contrat prévoit qu'un comité de gestion de trois membres peut prendre les décisions courantes de fonctionnement. Ce comité a décidé seul, sans convoquer l'assemblée, de suspendre les droits de vote de M. KONÉ pendant six mois.",
    questions: [
      { num: 1, enonce: "La décision d'exclusion prise à la majorité de 5/7 est-elle valable ?", correction: "Non. L'Art. 877 al. 2 AUSCGIE dispose que le contrat peut fixer des conditions de quorum et de majorité, mais que dans le silence du contrat, les décisions sont prises à l'unanimité. Le contrat de TRANSPORT-AFRIQUE ne contenant aucune clause sur les modalités de décision, la règle de l'unanimité s'impose. Deux membres ayant voté contre, la décision d'exclusion n'a pas pu être valablement adoptée." },
      { num: 2, enonce: "Quelle règle s'applique dans le silence du contrat pour les décisions de l'assemblée ?", correction: "L'unanimité (Art. 877 al. 2). Cette règle supplétive donne à chaque membre un droit de veto tant que le contrat n'organise pas expressément le quorum et la majorité. Le contrat aurait pu prévoir une majorité simple ou qualifiée, pour toutes les décisions ou certaines d'entre elles - mais uniquement de manière expresse." },
      { num: 3, enonce: "La décision du comité de gestion de suspendre les droits de vote de M. KONÉ est-elle valable ?", correction: "Non. L'Art. 877 al. 1 habilite l'assemblée générale des membres à prendre toute décision dans les conditions déterminées par le contrat. Le comité n'a reçu du contrat que les « décisions courantes de fonctionnement » : une mesure qui prive un membre de son droit de vote touche aux droits que ce membre tient du contrat de groupement, et excède manifestement la gestion courante. Elle relève de l'assemblée - qui, dans le silence du contrat sur les majorités, aurait dû statuer à l'unanimité. La suspension décidée par le seul comité est donc inopérante." },
      { num: 4, enonce: "Le contrat aurait-il pu organiser autrement les votes ?", correction: "Oui, sur deux plans (Art. 877). D'une part, le contrat peut prévoir que toutes les décisions, ou certaines d'entre elles, sont prises aux conditions de quorum et de majorité qu'il fixe - ce qui aurait permis une exclusion à la majorité qualifiée si une clause d'exclusion avait été stipulée. D'autre part, il peut attribuer à chaque membre un nombre de voix différent de celui des autres ; à défaut, chaque membre dispose d'une voix." },
    ],
  },
  {
    id: 'cp3',
    titre: 'Responsabilité des membres et mise en demeure préalable',
    contexte: "Le GIE AGRO-NORD a commandé pour 15 000 000 FCFA de matériel agricole à la société EQUIPAG-SA. Le GIE n'ayant pas payé sa dette, EQUIPAG-SA décide de poursuivre directement M. OUÉDRAOGO, membre du GIE, sans avoir au préalable mis en demeure le GIE lui-même. M. OUÉDRAOGO est entré dans le GIE après la commande et fait valoir qu'il ne devrait pas être tenu de cette dette. Par ailleurs, le contrat conclu avec EQUIPAG-SA contient une clause excluant la solidarité entre membres.",
    questions: [
      { num: 1, enonce: "La poursuite directe de M. OUÉDRAOGO sans mise en demeure préalable du GIE est-elle valable ?", correction: "Non. L'Art. 874 AUSCGIE dispose que les créanciers du groupement ne peuvent poursuivre le paiement des dettes contre un associé qu'après avoir vainement mis en demeure le groupement - la mise en demeure étant faite par exploit d'huissier ou notifiée par tout moyen permettant d'établir sa réception effective. EQUIPAG-SA doit d'abord mettre en demeure le GIE AGRO-NORD, et seulement si cette démarche reste vaine, se retourner contre les membres." },
      { num: 2, enonce: "M. OUÉDRAOGO peut-il être exonéré de la dette née avant son entrée dans le GIE ?", correction: "Oui, à deux conditions cumulatives (Art. 873 al. 1) : que le contrat de groupement permette l'exonération d'un nouveau membre des dettes nées antérieurement à son entrée, et que la décision d'exonération ait été publiée. Il faut donc vérifier le contrat du GIE AGRO-NORD et la publication : sans clause ou sans publication, M. OUÉDRAOGO répond de la dette comme les autres membres." },
      { num: 3, enonce: "La solidarité entre membres est-elle une règle absolue ?", correction: "Non. L'Art. 873 al. 2 pose la solidarité du paiement des dettes, sauf convention contraire avec le tiers cocontractant. En l'espèce, le contrat conclu avec EQUIPAG-SA écarte la solidarité : cette clause, convenue avec le créancier lui-même, lui est opposable. Chaque membre n'est alors tenu que de sa part - fixée par le contrat de groupement ou, à défaut, par parts égales (Art. 876)." },
      { num: 4, enonce: "Quelle est l'étendue de la responsabilité de M. OUÉDRAOGO s'il est tenu de la dette ?", correction: "S'il est tenu (pas de clause d'exonération publiée, et après mise en demeure vaine du groupement), sa responsabilité est indéfinie : il répond sur l'ensemble de son patrimoine propre (Art. 873 al. 1), sans plafond - à hauteur de sa seule part si la solidarité a été conventionnellement écartée avec EQUIPAG-SA. C'est le même degré d'exposition que celui d'un associé de SNC." },
    ],
  },
  {
    id: 'cp4',
    titre: 'Transformation du GIE en SARL',
    contexte: "Le GIE AGRO-SAHEL, constitué de quatre exploitants agricoles, a développé une activité très rentable de commercialisation de produits agricoles. Ses membres souhaitent désormais lui donner une forme sociétaire permettant le partage de bénéfices. Ils envisagent de transformer le GIE en SARL. M. BAMBA, fournisseur du GIE depuis deux ans, détient une créance impayée de 8 000 000 FCFA sur le GIE AGRO-SAHEL et s'inquiète de perdre son droit de poursuite contre les anciens membres du GIE après la transformation.",
    questions: [
      { num: 1, enonce: "La transformation du GIE AGRO-SAHEL en SARL est-elle juridiquement possible ?", correction: "Oui. L'Art. 882 al. 2 AUSCGIE prévoit expressément qu'un GIE peut être transformé en société à responsabilité limitée sans donner lieu à dissolution ni à création d'une personne morale nouvelle - sous réserve de satisfaire aux conditions de constitution de la SARL (statuts conformes, capital, mentions obligatoires). Cette voie permet précisément de passer d'une structure sans partage de bénéfices (Art. 870) à une forme sociétaire lucrative." },
      { num: 2, enonce: "Cette transformation entraîne-t-elle dissolution du GIE ou création d'une nouvelle personne morale ?", correction: "Ni l'une ni l'autre. L'Art. 882 al. 2 est explicite : la transformation se fait sans dissolution ni création d'une personne morale nouvelle. La même personne morale continue, sous une forme nouvelle ; les contrats en cours, dettes et créances subsistent sans formalité de cession." },
      { num: 3, enonce: "M. BAMBA conserve-t-il ses droits après la transformation ?", correction: "Oui, intégralement. L'Art. 882 al. 3 dispose qu'en cas de transformation du GIE en SARL, les créanciers dont la dette est antérieure à la transformation conservent leurs droits contre le GIE et ses associés. M. BAMBA pourra donc poursuivre la SARL (continuatrice du GIE) et, pour sa créance antérieure, les anciens membres à titre personnel, selon le régime de l'Art. 873 - la limitation de responsabilité de la SARL ne lui est pas opposable pour cette dette." },
      { num: 4, enonce: "Si les membres avaient voulu conserver une responsabilité indéfinie, quelle autre transformation était possible ?", correction: "La transformation en société en nom collectif, également prévue par l'Art. 882 al. 2 sans dissolution ni création d'une personne morale nouvelle. La SNC maintient la responsabilité indéfinie et solidaire des associés (Art. 270), structure de responsabilité comparable à celle du GIE - c'est pourquoi cette transformation n'appelle pas de règle spéciale de protection des créanciers antérieurs." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue2',
  numero: 6,
  id: 'ue2-ch6',
  titre: "Le groupement d'intérêt économique (GIE)",
  sousTitre: 'Art. 869 à 885 AUSCGIE révisé du 30 janvier 2014',
  infoBulle: "Structure auxiliaire au service de l'activité économique de ses membres : sans capital obligatoire, sans partage de bénéfices, mais avec responsabilité indéfinie des membres sur leur patrimoine propre.",
  loiRef: 'Art. 869-885 AUSCGIE',
  moduleLabel: 'UE 2 · Droit des sociétés',
  retourRoute: '/ue2-droit-societes',
  coursId: 'ue2-droit-societes',
  objectifs: [
    'Définir le GIE et comprendre son caractère auxiliaire (Art. 869-870)',
    'Maîtriser les conditions de constitution et les mentions obligatoires du contrat (Art. 871-872, 876)',
    'Analyser le régime de responsabilité indéfinie et solidaire des membres (Art. 873-874)',
    "Comprendre la gouvernance : assemblée générale souveraine et règle d'unanimité supplétive (Art. 877-879)",
    'Distinguer les transformations sans dissolution et la protection des créanciers antérieurs (Art. 882)',
    'Identifier les causes de dissolution et les règles de liquidation (Art. 883-885)',
  ],
  sections: SECTIONS,
  aRetenir: [
    "Le GIE a pour but exclusif de faciliter ou développer l'activité économique de ses membres, pour une durée déterminée, avec un caractère strictement auxiliaire ; il peut être constitué sans capital (Art. 869) et ne donne pas lieu par lui-même à réalisation et partage des bénéfices (Art. 870).",
    "Deux personnes physiques ou morales suffisent, professions libérales réglementées comprises ; les droits des membres ne peuvent être représentés par des titres négociables (Art. 871) ; la personnalité morale naît de l'immatriculation au RCCM (Art. 872).",
    "Le contrat écrit, publié comme des statuts, contient cinq mentions obligatoires et fixe librement l'organisation, la contribution aux dettes (par parts égales à défaut), l'admission de nouveaux membres et le retrait (Art. 876).",
    "Les membres répondent des dettes du groupement sur leur patrimoine propre, solidairement sauf convention contraire avec le tiers ; un nouveau membre peut être exonéré des dettes antérieures si le contrat le permet et si la décision est publiée (Art. 873) ; toute poursuite individuelle suppose la mise en demeure vaine du groupement (Art. 874).",
    "L'assemblée générale peut prendre toute décision ; dans le silence du contrat, l'unanimité s'impose et chaque membre dispose d'une voix ; un quart des membres en nombre peut exiger sa réunion (Art. 877-878).",
    "L'administrateur engage le groupement pour tout acte entrant dans l'objet, toute limitation de pouvoirs étant inopposable aux tiers (Art. 879) ; l'émission d'obligations, réservée aux GIE composés exclusivement de sociétés qui y sont autorisées (Art. 875), déclenche un contrôle de gestion et un commissaire aux comptes nommé pour six exercices (Art. 880).",
    "Le GIE se transforme en SNC ou en SARL - et une société à objet auxiliaire en GIE - sans dissolution ni personne morale nouvelle ; en cas de passage en SARL, les créanciers antérieurs conservent leurs droits contre le groupement et ses associés (Art. 882).",
    "Cinq causes de dissolution (terme, objet, décision des membres, justes motifs judiciaires, décès ou dissolution d'un membre sauf clause contraire - Art. 883) ; l'incapacité, la faillite ou l'interdiction d'un membre dissout le GIE sauf clause ou unanimité des autres (Art. 884) ; la personnalité subsiste pour la liquidation et l'excédent d'actif se partage selon le contrat ou par parts égales (Art. 885).",
  ],
  references: [
    {
      genre: 'texte',
      intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)",
      precision: 'adopté le 30 janvier 2014 à Ouagadougou, art. 869 à 885',
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : AUSCGIE révisé du 30 janvier 2014, art. 869 à 885',
}

export default chapitre
