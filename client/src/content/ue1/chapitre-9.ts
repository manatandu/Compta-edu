// Chapitre 9 du module UE1, Droit du travail : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
import type { Chapitre } from '@/lib/chapitre-types'

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '9.1',
    titre: 'Les litiges individuels : la conciliation préalable obligatoire',
    navLabel: '9.1 Litiges individuels et conciliation',
    blocs: [
      { type: 'paragraphe', texte: "Le Titre XIII organise, dans un chapitre dédié aux litiges individuels, un préalable obligatoire dont l'omission est sanctionnée par l'irrecevabilité pure et simple : selon l'article 298, les litiges individuels ne sont pas recevables devant le Tribunal du Travail s'ils n'ont été préalablement soumis à la procédure de conciliation, à l'initiative de l'une des parties, devant l'Inspecteur du Travail du ressort. Cette procédure interrompt les délais de prescription de l'article 317, dès la réception de la demande par l'Inspection, sous réserve que la saisine du Tribunal, en cas de non-conciliation, intervienne dans les douze mois suivant la réception du procès-verbal de non-conciliation (article 299)." },
      { type: 'paragraphe', texte: "L'Inspecteur du Travail saisi adresse une invitation à comparaître dans la quinzaine, sans pouvoir exiger une comparution avant trois jours (article 300). Il procède à un échange de vues sur la base des normes légales, réglementaires, conventionnelles ou contractuelles, les parties pouvant se faire assister ou représenter. À l'issue, il établit un procès-verbal de conciliation ou de non-conciliation, signé par les parties ; si une partie ne comparaît pas à la troisième invitation, un procès-verbal de carence vaut constat de non-conciliation." },
      { type: 'filet', titre: "L'exécution du procès-verbal de conciliation", texte: "En cas d'accord, l'article 301 permet à la partie la plus diligente de faire apposer la formule exécutoire sur le procès-verbal auprès du Président du Tribunal du Travail compétent : l'exécution est alors poursuivie comme un jugement, sans qu'un procès distinct soit nécessaire. En cas d'échec total ou partiel, le litige peut être directement porté devant le Tribunal du Travail (article 302)." },
    ],
  },
  {
    numero: '9.2',
    titre: 'Les conflits collectifs : conciliation et médiation',
    navLabel: '9.2 Conflits collectifs',
    blocs: [
      { type: 'paragraphe', texte: "Le chapitre II définit le conflit collectif comme tout conflit survenu entre un ou plusieurs employeurs et un certain nombre de membres de leur personnel, portant sur les conditions de travail, de nature à compromettre la bonne marche de l'entreprise ou la paix sociale (article 303). Comme pour les litiges individuels, l'irrecevabilité devant le Tribunal du Travail sanctionne l'omission du préalable : conciliation devant l'Inspecteur du Travail, puis, en cas d'échec, médiation devant une commission spécialisée (article 304)." },
      { type: 'carte', titre: 'Le circuit de la procédure', tableau: { entetes: ['Étape', 'Délai', 'Article'], lignes: [['Notification du conflit à l\'Inspecteur du Travail', 'À l\'initiative de la partie la plus diligente', 'Art. 307'], ['Invitation à comparaître en conciliation', '**Dans la quinzaine**, préavis minimal de 3 jours ouvrables', 'Art. 307'], ['Constat d\'accord ou de désaccord', '**Dans le mois** de la première séance', 'Art. 308'], ['Transmission du dossier en cas d\'échec (province ou Ministre selon le champ du conflit)', '**48 heures**', 'Art. 309'], ['Réunion de la Commission de médiation', '**3 jours ouvrables** de la saisine', 'Art. 311'], ['Fin de l\'instruction de la Commission', '**10 jours ouvrables**', 'Art. 311'], ['Opposition possible aux recommandations', '**7 jours francs** à compter de la notification', 'Art. 313']] } },
      { type: 'paragraphe', texte: "La Commission de médiation, présidée par le Président du Tribunal de Paix ou un magistrat désigné, comprend un assesseur employeur et un assesseur travailleur, étrangers à l'établissement concerné (article 310). Elle se prononce en droit sur les conflits d'interprétation d'un texte ou d'une convention collective, en équité sur les autres, et dispose de larges pouvoirs d'enquête, ses membres étant tenus au secret professionnel et ses séances se tenant à huis clos (article 311). En cas d'accord, un procès-verbal est dressé (article 312) ; en cas de désaccord persistant, elle formule des recommandations motivées qui, à défaut d'opposition dans les sept jours francs, acquièrent force exécutoire (article 313)." },
      { type: 'filet', titre: "Le droit de grève : un droit encadré, non un droit préalable", texte: "L'article 315 pose le principe : la cessation collective du travail ne peut avoir lieu qu'à l'occasion d'un conflit collectif et qu'une fois les voies de règlement, conventionnelles ou légales, régulièrement épuisées. Sont interdits tous actes ou menaces tendant à contraindre un travailleur à y participer ou à empêcher le travail ou sa reprise, ainsi que toute mesure de représailles contre les travailleurs grévistes une fois la grève régulièrement déclenchée." },
    ],
  },
  {
    numero: '9.3',
    titre: 'Les Tribunaux du Travail et la prescription des actions',
    navLabel: '9.3 Tribunaux et prescription',
    blocs: [
      { type: 'paragraphe', texte: "Le chapitre III se limite à un renvoi : une loi distincte crée les Tribunaux du Travail et fixe leur organisation et leur fonctionnement (article 316), le Code du travail lui-même n'organisant que les procédures de conciliation et de médiation préalables à leur saisine." },
      { type: 'carte', titre: 'Trois délais de prescription à ne jamais confondre (article 317)', tableau: { entetes: ['Action', 'Délai'], lignes: [['Actions naissant du contrat de travail (règle générale)', '**Trois ans** après le fait qui a donné naissance à l\'action'], ['Actions en paiement du salaire', '**Un an** à compter de la date à laquelle le salaire est dû'], ['Actions en paiement des frais de voyage et de transport', '**Deux ans** après l\'ouverture du droit au voyage']] }, texte: "La prescription n'est interrompue que par quatre causes limitativement énumérées : la citation en justice, l'arrêté de compte mentionnant un solde impayé, la réclamation par lettre recommandée avec avis de réception, et la réclamation devant l'Inspecteur du Travail — cette dernière cause renvoyant précisément au mécanisme d'interruption déjà rencontré à l'article 299." },
    ],
  },
  {
    numero: '9.4',
    titre: 'Les sanctions administratives : la fermeture provisoire de l\'entreprise',
    navLabel: '9.4 Sanctions administratives',
    blocs: [
      { type: 'paragraphe', texte: "Le Titre XIV ouvre à l'Administration du travail une arme de dernier recours, distincte des poursuites pénales : lorsqu'à l'expiration du délai de mise en demeure, l'employeur persiste dans la violation de certains articles limitativement énumérés — parmi lesquels l'âge minimal d'emploi (article 6), la durée du travail (articles 119 à 121), le travail de nuit et la protection des enfants (articles 125-126, 128, 133), la mise en demeure de sécurité (article 171), le service médical d'entreprise (article 177) et la délégation du personnel (article 255) —, le Ministre du Travail ou son délégué, sur proposition de l'Inspecteur du Travail, peut ordonner la fermeture provisoire de tout ou partie de l'entreprise (article 318)." },
      { type: 'filet', titre: "Une fermeture qui ne suspend rien pour les travailleurs", texte: "L'article 318, second alinéa, précise que pendant la fermeture, jusqu'à la cessation des irrégularités constatées, les salaires et autres avantages sociaux restent dus et qu'il ne peut être mis fin au contrat en cours : la sanction pèse sur l'employeur, jamais sur les travailleurs, qui conservent l'intégralité de leurs droits pendant l'arrêt forcé de l'activité." },
      { type: 'paragraphe', texte: "L'article 319 complète ce Titre par une habilitation distincte, sans lien de sanction : le Président de la République peut, sur proposition du Ministre du Travail et après avis du Conseil National du Travail, fixer les taxes et redevances relevant des activités du Ministère du Travail, sans préjudice de la taxe sur la carte de travail pour étrangers déjà rencontrée à l'article 211." },
    ],
  },
  {
    numero: '9.5',
    titre: 'Le barème des amendes et les peines de servitude pénale',
    navLabel: '9.5 Amendes et peines',
    blocs: [
      { type: 'paragraphe', texte: "Le Titre XV, dernier bloc répressif du Code, gradue les sanctions pénales selon la gravité de l'infraction. L'infraction aux dispositions d'une convention collective étendue est passible d'une amende plafonnée à 7 500 francs congolais constants (article 320). Un manquement plus large — une longue liste d'articles couvrant l'âge d'emploi, le contrat de travail, le salaire, la durée du travail, les congés, le règlement d'entreprise, les documents et déclarations — est puni d'une amende plafonnée à 20 000 francs congolais constants (article 321, modifié en 2016), la même peine frappant la partie qui n'aura pas répondu à la troisième invitation de l'Inspecteur ou du Contrôleur du Travail." },
      { type: 'carte', titre: 'Les peines de servitude pénale, du plus léger au plus lourd', tableau: { entetes: ['Fait sanctionné', 'Peine maximale', 'Article'], lignes: [['Obstacle aux fonctions des Inspecteurs, Contrôleurs ou de la Commission de médiation', '30 jours et/ou 30 000 FC constants', 'Art. 322'], ['Violence, menace ou fraude pour contraindre à travailler, à cesser le travail ou à empêcher la reprise', '1 mois et/ou 25 000 FC constants', 'Art. 323'], ['Atteinte à la désignation ou à l\'exercice des fonctions d\'un délégué ; détournement d\'un cautionnement', '2 mois et/ou 25 000 FC constants', 'Art. 324'], ['Divulgation frauduleuse de secrets de fabrication ou d\'affaires, concurrence déloyale', '3 mois et/ou 30 000 FC constants', 'Art. 325'], ['Violation des articles 2 al. 2, 3, 173 (machines dangereuses) et 315 (grève irrégulière)', '6 mois et/ou 30 000 FC constants', 'Art. 326']] } },
      { type: 'paragraphe', texte: "Un régime spécifique et aggravé, par renvoi au Code pénal, frappe l'Inspecteur ou le Contrôleur du Travail qui révèle les secrets de fabrication appris dans l'exercice de ses fonctions ou viole son obligation de confidentialité sur la source d'une plainte (article 327, qui renvoie aux articles 194 et 198 déjà étudiés au chapitre 8). Certaines amendes se multiplient enfin par le nombre de travailleurs concernés — défaut d'inscription au livre de paie, atteintes au salaire, à la durée du travail, aux congés — sans que le total puisse excéder cinquante fois le taux maximal prévu (article 328), l'employeur restant en toute hypothèse civilement responsable du paiement des amendes prononcées contre ses préposés (article 329)." },
    ],
  },
]

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1', question: "Un litige individuel du travail peut-il être porté directement devant le Tribunal du Travail, sans étape préalable ?",
    options: [
      { id: 'a', texte: "Oui, la conciliation devant l'Inspecteur du Travail est purement facultative" },
      { id: 'b', texte: "Non : selon l'article 298, il n'est recevable que s'il a été préalablement soumis à la conciliation devant l'Inspecteur du Travail du ressort" },
      { id: 'c', texte: "Non, il doit d'abord être soumis à la Commission de médiation" },
      { id: 'd', texte: "Oui, mais uniquement pour les litiges portant sur le salaire" },
      { id: 'e', texte: "Non, il doit d'abord être soumis au Conseil National du Travail" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 298',
    explication: "L'article 298 conditionne la recevabilité même du litige individuel devant le Tribunal du Travail à sa soumission préalable à la procédure de conciliation devant l'Inspecteur du Travail du ressort : l'omission de cette étape n'est pas une simple irrégularité, elle rend l'action irrecevable.",
  },
  {
    id: 'q2', question: "Dans quel délai maximal, à compter de la réception du procès-verbal de non-conciliation, la demande doit-elle être portée devant le Tribunal du Travail pour bénéficier de l'interruption de prescription de l'article 299 ?",
    options: [
      { id: 'a', texte: "Trois mois" },
      { id: 'b', texte: "Six mois" },
      { id: 'c', texte: "Douze mois" },
      { id: 'd', texte: "Vingt-quatre mois" },
      { id: 'e', texte: "Aucun délai n'est fixé" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 299',
    explication: "L'article 299 fixe ce délai à douze mois à compter de la réception du procès-verbal de non-conciliation par la partie la plus diligente, sous cette réserve que l'effet interruptif de la demande de conciliation se maintienne.",
  },
  {
    id: 'q3', question: "Un procès-verbal de conciliation signé devant l'Inspecteur du Travail a-t-il, par lui-même, une force exécutoire immédiate sans intervention du Tribunal du Travail ?",
    options: [
      { id: 'a', texte: "Non, un jugement du Tribunal du Travail est toujours nécessaire pour l'exécuter" },
      { id: 'b', texte: "Oui, une fois la formule exécutoire apposée par le Président du Tribunal du Travail compétent, l'exécution est poursuivie comme un jugement" },
      { id: 'c', texte: "Non, seul un accord notarié peut être exécuté" },
      { id: 'd', texte: "Oui, mais uniquement si les deux parties sont assistées d'un avocat" },
      { id: 'e', texte: "Non, il ne vaut que comme preuve dans une instance ultérieure" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 301',
    explication: "L'article 301 permet à la partie la plus diligente de faire apposer la formule exécutoire sur le procès-verbal de conciliation auprès du Président du Tribunal du Travail compétent, l'exécution étant ensuite poursuivie comme celle d'un jugement, sans procès distinct.",
  },
  {
    id: 'q4', question: "Qu'est-ce qui caractérise un conflit collectif du travail, selon l'article 303 ?",
    options: [
      { id: 'a', texte: "Tout désaccord entre deux travailleurs de la même entreprise" },
      { id: 'b', texte: "Un conflit entre un ou plusieurs employeurs et un certain nombre de membres de leur personnel, sur les conditions de travail, de nature à compromettre la bonne marche de l'entreprise ou la paix sociale" },
      { id: 'c', texte: "Uniquement une grève déjà déclenchée" },
      { id: 'd', texte: "Tout litige portant sur plus de dix travailleurs, quelle qu'en soit la nature" },
      { id: 'e', texte: "Un conflit opposant deux syndicats concurrents" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 303',
    explication: "L'article 303 définit le conflit collectif comme tout conflit survenu entre un ou plusieurs employeurs et un certain nombre de membres de leur personnel, portant sur les conditions de travail, lorsqu'il est de nature à compromettre la bonne marche de l'entreprise ou la paix sociale.",
  },
  {
    id: 'q5', question: "Après l'échec de la conciliation devant l'Inspecteur du Travail, le conflit collectif est-il directement porté devant le Tribunal du Travail ?",
    options: [
      { id: 'a', texte: "Oui, sans étape intermédiaire" },
      { id: 'b', texte: "Non, il est obligatoirement soumis à la procédure légale de médiation devant une Commission de médiation" },
      { id: 'c', texte: "Non, il est classé sans suite en l'absence d'accord" },
      { id: 'd', texte: "Oui, mais uniquement si le conflit affecte plus de trois entreprises" },
      { id: 'e', texte: "Non, il est soumis à l'arbitrage exclusif du Ministre du Travail" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 309',
    explication: "L'article 309 impose, en cas de non-conciliation totale ou partielle, la soumission obligatoire du conflit à la procédure légale de médiation devant une Commission de médiation instituée spécialement à cet effet.",
  },
  {
    id: 'q6', question: "Comment est composée la Commission de médiation des conflits collectifs, selon l'article 310 ?",
    options: [
      { id: 'a', texte: "Uniquement de représentants du Ministère du Travail" },
      { id: 'b', texte: "Du Président du Tribunal de Paix (ou un magistrat désigné), d'un assesseur employeur et d'un assesseur travailleur, étrangers à l'établissement concerné" },
      { id: 'c', texte: "De trois magistrats professionnels du Tribunal du Travail" },
      { id: 'd', texte: "Des seuls représentants des deux parties au conflit" },
      { id: 'e', texte: "D'un juge unique, sans assesseurs" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 310',
    explication: "L'article 310 compose la Commission de médiation du Président du Tribunal de Paix (ou d'un magistrat qu'il désigne), présidant la commission, ainsi que d'un assesseur employeur et d'un assesseur travailleur, désignés sur proposition des organisations professionnelles les plus représentatives et devant être étrangers à l'établissement affecté par le conflit.",
  },
  {
    id: 'q7', question: "Dans quel délai, à compter de leur notification, les recommandations de la Commission de médiation acquièrent-elles force exécutoire à défaut d'opposition, selon l'article 313 ?",
    options: [
      { id: 'a', texte: "Trois jours francs" },
      { id: 'b', texte: "Sept jours francs" },
      { id: 'c', texte: "Quinze jours francs" },
      { id: 'd', texte: "Un mois" },
      { id: 'e', texte: "Trois mois" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 313',
    explication: "L'article 313 fixe à sept jours francs à compter de la notification aux parties le délai au terme duquel, en l'absence d'opposition, les recommandations de la Commission de médiation acquièrent force exécutoire.",
  },
  {
    id: 'q8', question: "Une cessation collective de travail (grève) peut-elle être régulièrement déclenchée avant l'épuisement des voies de conciliation et de médiation, selon l'article 315 ?",
    options: [
      { id: 'a', texte: "Oui, le droit de grève est absolu et immédiat" },
      { id: 'b', texte: "Non : la cessation collective ne peut avoir lieu qu'une fois les moyens de règlement, conventionnels ou légaux, régulièrement épuisés" },
      { id: 'c', texte: "Oui, à condition d'un préavis de vingt-quatre heures" },
      { id: 'd', texte: "Non, sauf autorisation expresse du Gouverneur de province" },
      { id: 'e', texte: "Oui, si le conflit porte sur le non-paiement du salaire" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 315',
    explication: "L'article 315 conditionne la régularité de la cessation collective du travail à l'occasion d'un conflit collectif et à l'épuisement préalable des moyens de règlement, conventionnels ou légaux : une grève déclenchée avant cet épuisement n'est pas régulière au sens du Code.",
  },
  {
    id: 'q9', question: "Quel est le délai de prescription de principe pour les actions naissant du contrat de travail, selon l'article 317 ?",
    options: [
      { id: 'a', texte: "Un an" },
      { id: 'b', texte: "Deux ans" },
      { id: 'c', texte: "Trois ans" },
      { id: 'd', texte: "Cinq ans" },
      { id: 'e', texte: "Dix ans" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 317',
    explication: "L'article 317 fixe le délai de principe à trois ans après le fait qui a donné naissance à l'action, avec deux exceptions : un an pour le paiement du salaire, deux ans pour le paiement des frais de voyage et de transport.",
  },
  {
    id: 'q10', question: "Quel délai de prescription particulier s'applique aux actions en paiement du salaire, selon l'article 317 ?",
    options: [
      { id: 'a', texte: "Six mois" },
      { id: 'b', texte: "Un an à compter de la date à laquelle le salaire est dû" },
      { id: 'c', texte: "Deux ans" },
      { id: 'd', texte: "Le même délai de trois ans que le régime général" },
      { id: 'e', texte: "Cinq ans, par analogie avec la prescription civile de droit commun" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 317, 1°',
    explication: "L'article 317, 1°, écarte le délai général de trois ans au profit d'un délai raccourci d'un an à compter de la date à laquelle le salaire est dû, pour les seules actions en paiement du salaire.",
  },
  {
    id: 'q11', question: "Une réclamation formulée par le travailleur auprès de l'employeur, par simple lettre recommandée avec avis de réception, interrompt-elle la prescription au sens de l'article 317 ?",
    options: [
      { id: 'a', texte: "Non, seule une citation en justice interrompt la prescription" },
      { id: 'b', texte: "Oui, elle figure parmi les quatre causes d'interruption limitativement énumérées" },
      { id: 'c', texte: "Oui, mais uniquement si l'employeur y répond expressément" },
      { id: 'd', texte: "Non, elle doit être doublée d'une saisine simultanée de l'Inspecteur du Travail" },
      { id: 'e', texte: "Oui, mais seulement pour les actions en paiement de salaire" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 317',
    explication: "L'article 317 énumère quatre causes d'interruption de la prescription : la citation en justice, l'arrêté de compte mentionnant un solde impayé, la réclamation par lettre recommandée avec avis de réception adressée à l'employeur, et la réclamation devant l'Inspecteur du Travail.",
  },
  {
    id: 'q12', question: "Pendant la fermeture provisoire d'une entreprise ordonnée en application de l'article 318, que deviennent les salaires et les contrats en cours ?",
    options: [
      { id: 'a', texte: "Les salaires cessent d'être dus et les contrats sont automatiquement suspendus" },
      { id: 'b', texte: "Les salaires et avantages sociaux restent dus, et il ne peut être mis fin au contrat en cours" },
      { id: 'c', texte: "Seuls les cadres continuent à percevoir leur salaire" },
      { id: 'd', texte: "Les travailleurs sont automatiquement transférés vers une autre entreprise" },
      { id: 'e', texte: "Le versement des salaires est reporté jusqu'à la réouverture, sans intérêt" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 318, al. 2',
    explication: "L'article 318, second alinéa, protège les travailleurs de l'entreprise fermée : les salaires et autres avantages sociaux restent dus pendant la fermeture, jusqu'à la cessation des irrégularités constatées, et l'employeur ne peut mettre fin au contrat en cours pendant cette période.",
  },
  {
    id: 'q13', question: "Qui peut ordonner la fermeture provisoire de tout ou partie d'une entreprise, selon l'article 318 ?",
    options: [
      { id: 'a', texte: "Le seul Tribunal du Travail" },
      { id: 'b', texte: "Le Ministre ayant le Travail dans ses attributions ou son délégué, sur proposition de l'Inspecteur du Travail" },
      { id: 'c', texte: "Le Président de la République, sans intermédiaire" },
      { id: 'd', texte: "Le Gouverneur de province, seul" },
      { id: 'e', texte: "La Commission de médiation" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 318',
    explication: "L'article 318 réserve ce pouvoir au Ministre ayant le Travail et la Prévoyance Sociale dans ses attributions (ou à son délégué), sur proposition de l'Inspecteur du Travail, et seulement lorsque l'employeur persiste, à l'expiration du délai de mise en demeure, dans la violation des articles limitativement énumérés.",
  },
  {
    id: 'q14', question: "Le montant maximal de l'amende prévue à l'article 321 pour les infractions qu'il énumère est-il de 20 000 ou de 7 500 francs congolais constants ?",
    options: [
      { id: 'a', texte: "7 500 francs congolais constants" },
      { id: 'b', texte: "20 000 francs congolais constants" },
      { id: 'c', texte: "25 000 francs congolais constants" },
      { id: 'd', texte: "30 000 francs congolais constants" },
      { id: 'e', texte: "50 000 francs congolais constants" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 321',
    explication: "L'article 321, modifié en 2016, plafonne à 20 000 francs congolais constants l'amende pour la longue liste d'infractions qu'il énumère (âge d'emploi, contrat de travail, salaire, durée du travail, congés, documents et déclarations, entre autres) — à distinguer du plafond de 7 500 francs constants propre aux infractions à une convention collective étendue (article 320).",
  },
  {
    id: 'q15', question: "Une amende peut-elle être multipliée par le nombre de travailleurs concernés par l'infraction, selon l'article 328 ?",
    options: [
      { id: 'a', texte: "Non, l'amende est toujours forfaitaire, quel que soit le nombre de travailleurs concernés" },
      { id: 'b', texte: "Oui, pour certaines infractions limitativement énumérées, sans que le total puisse excéder cinquante fois le taux maximal prévu" },
      { id: 'c', texte: "Oui, sans aucun plafond global" },
      { id: 'd', texte: "Oui, mais seulement au-delà de dix travailleurs concernés" },
      { id: 'e', texte: "Non, une seule amende globale est prononcée quel que soit le nombre de travailleurs" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 328',
    explication: "L'article 328 prévoit, pour certaines infractions limitativement énumérées (dont le défaut d'inscription au livre de paie, les atteintes au salaire, à la durée du travail ou aux congés), une multiplication de l'amende par travailleur concerné, plafonnée en tout état de cause à cinquante fois le taux maximal prévu par les articles applicables.",
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: "Le litige de M. Kabongo saisi directement au Tribunal du Travail de Lubumbashi",
    contexte: "M. Kabongo, licencié sans préavis d'une entreprise minière de Lubumbashi, saisit directement le Tribunal du Travail d'une demande de dommages-intérêts, dix-huit mois après son licenciement, sans être jamais passé devant l'Inspecteur du Travail. L'employeur soulève devant le Tribunal une exception d'irrecevabilité, tandis que M. Kabongo fait valoir que trois ans ne se sont pas encore écoulés depuis son licenciement et que son action n'est donc pas prescrite.",
    questions: [
      { num: 1, enonce: "L'exception d'irrecevabilité soulevée par l'employeur, tirée de l'absence de conciliation préalable devant l'Inspecteur du Travail, est-elle fondée ?", correction: "Oui. L'article 298 conditionne la recevabilité même du litige individuel devant le Tribunal du Travail à sa soumission préalable à la procédure de conciliation devant l'Inspecteur du Travail du ressort. L'absence totale de cette étape, quelle que soit la solidité du fond de la demande de M. Kabongo, rend son action irrecevable en l'état." },
      { num: 2, enonce: "L'argument de M. Kabongo, selon lequel son action n'est pas prescrite puisque trois ans ne se sont pas écoulés, permet-il d'écarter l'irrecevabilité soulevée par l'employeur ?", correction: "Non. La prescription de l'article 317 et la recevabilité conditionnée par l'article 298 sont deux questions distinctes : une action non prescrite peut néanmoins être irrecevable faute d'avoir respecté le préalable de conciliation. La computation du délai de prescription n'a d'incidence que si l'action est par ailleurs recevable, ce qui suppose d'abord le respect de l'article 298." },
      { num: 3, enonce: "M. Kabongo peut-il encore régulariser sa situation en saisissant, à ce stade, l'Inspecteur du Travail d'une demande de conciliation ?", correction: "Oui, en principe, sous réserve du délai de prescription. Rien n'interdit à M. Kabongo de saisir l'Inspecteur du Travail d'une demande de conciliation à ce stade, dès lors que son action n'est pas prescrite au regard de l'article 317 (trois ans pour l'action indemnitaire liée au licenciement). Cette démarche, une fois le procès-verbal de non-conciliation obtenu, lui ouvrirait alors la voie régulière vers le Tribunal du Travail, dans le délai de douze mois de l'article 299." },
      { num: 4, enonce: "Si M. Kabongo avait, avant même de saisir l'Inspecteur du Travail, adressé une lettre recommandée de réclamation à son employeur, cette lettre aurait-elle eu un effet sur la prescription ?", correction: "Oui. L'article 317 range, parmi les quatre causes d'interruption de la prescription, la réclamation formulée par le travailleur auprès de l'employeur par lettre recommandée avec avis de réception. Une telle lettre, antérieure à la saisine de l'Inspecteur du Travail, aurait donc déjà interrompu le délai de prescription, faisant courir un nouveau délai à compter de son envoi." },
    ],
  },
  {
    id: 'cp2',
    titre: "La grève déclenchée avant l'épuisement de la médiation à l'usine de Kolwezi",
    contexte: "Un conflit collectif oppose les travailleurs d'une usine métallurgique de Kolwezi à leur employeur sur une révision des primes d'ancienneté. La tentative de conciliation devant l'Inspecteur du Travail échoue. Sans attendre la saisine ni la décision de la Commission de médiation, les délégués syndicaux appellent immédiatement à une cessation collective du travail, estimant que « l'échec de la conciliation suffit à justifier la grève ». Des travailleurs qui refusent de participer au mouvement font l'objet de menaces de la part de certains grévistes.",
    questions: [
      { num: 1, enonce: "L'échec de la conciliation devant l'Inspecteur du Travail suffit-il, à lui seul, à autoriser régulièrement la cessation collective du travail ?", correction: "Non. L'article 309 impose, en cas de non-conciliation totale ou partielle, la soumission obligatoire du conflit à la procédure légale de médiation devant une Commission de médiation. L'article 315 conditionne à son tour la régularité de la cessation collective à l'épuisement de l'ensemble des moyens de règlement, conventionnels ou légaux — ce qui inclut la médiation, non seulement la conciliation." },
      { num: 2, enonce: "La grève déclenchée par les délégués syndicaux, avant même la saisine de la Commission de médiation, est-elle régulière au sens de l'article 315 ?", correction: "Non. Elle intervient avant l'épuisement des moyens légaux de règlement du conflit, en particulier la procédure de médiation des articles 309 à 314, qui n'a même pas été engagée. Une telle cessation collective, prématurée au regard du Code, n'est pas régulière, indépendamment du bien-fondé de la revendication salariale elle-même." },
      { num: 3, enonce: "Les menaces proférées contre les travailleurs refusant de participer au mouvement sont-elles conformes au Code du travail ?", correction: "Non, en toute hypothèse. L'article 315, deuxième alinéa, interdit tous actes et toutes menaces tendant à contraindre un travailleur à participer à une cessation collective du travail, que la grève soit elle-même régulière ou non. Ces menaces constituent en outre, potentiellement, l'infraction pénale de l'article 323, litera a, qui vise l'usage de violence, de menace ou de contrainte pour forcer un travailleur à participer à une cessation collective du travail." },
      { num: 4, enonce: "Si la grève avait été déclenchée après épuisement régulier de la conciliation et de la médiation, les travailleurs y ayant pris part bénéficieraient-ils d'une protection particulière ?", correction: "Oui. L'article 315, troisième alinéa, interdit alors toutes menaces, représailles et mesures vexatoires à l'égard des travailleurs qui se proposent de participer à une cessation collective régulièrement déclenchée ou qui y ont pris part — une protection distincte de l'interdiction de contraindre à la participation, qui protège cette fois les grévistes eux-mêmes contre l'employeur ou des tiers." },
    ],
  },
  {
    id: 'cp3',
    titre: "La fermeture provisoire de l'atelier de Bukavu et le sort des salaires",
    contexte: "Après plusieurs mises en demeure restées sans effet concernant le non-respect persistant de la durée légale du travail et l'absence de tout service médical d'entreprise, le Ministre du Travail, sur proposition de l'Inspecteur du Travail, ordonne la fermeture provisoire d'un atelier de confection de Bukavu. L'employeur cesse immédiatement de verser les salaires de ses trente-cinq ouvriers, estimant que « l'entreprise étant fermée, aucun travail n'est fourni, donc aucun salaire n'est dû ».",
    questions: [
      { num: 1, enonce: "La fermeture provisoire ordonnée par le Ministre du Travail est-elle fondée sur les manquements constatés (durée du travail et service médical d'entreprise) ?", correction: "Oui. L'article 318 vise expressément, parmi les articles dont la violation persistante après mise en demeure autorise la fermeture provisoire, les articles 119 à 121 relatifs à la durée du travail et l'article 177 relatif au service médical d'entreprise. Les deux manquements constatés à Bukavu entrent donc dans le champ de cette sanction administrative." },
      { num: 2, enonce: "L'employeur peut-il valablement cesser le versement des salaires au motif que l'entreprise est fermée et qu'aucun travail n'est fourni ?", correction: "Non. L'article 318, second alinéa, dispose sans ambiguïté que pendant la fermeture, jusqu'au moment où il est mis fin aux irrégularités constatées, les salaires et autres avantages sociaux sont dus. L'absence de fourniture de travail, ici imputable à la fermeture décidée par l'autorité administrative en réaction aux propres manquements de l'employeur, ne le libère en rien de son obligation salariale." },
      { num: 3, enonce: "L'employeur pourrait-il mettre fin aux contrats des trente-cinq ouvriers pendant la période de fermeture, pour réduire ses charges ?", correction: "Non. Le même article 318, second alinéa, interdit expressément qu'il soit mis fin au contrat en cours pendant la fermeture. Les trente-cinq contrats se poursuivent donc normalement, avec maintien intégral des salaires et avantages sociaux, jusqu'à ce que l'employeur ait effectivement remédié aux irrégularités constatées." },
      { num: 4, enonce: "La fermeture provisoire prononcée par le Ministre du Travail fait-elle obstacle à des poursuites pénales distinctes contre l'employeur pour les mêmes faits ?", correction: "Non. L'article 318 précise que cette sanction administrative est ordonnée « sans préjudice des dispositions pénales prévues » : la fermeture provisoire et d'éventuelles poursuites pénales, notamment sur le fondement des amendes prévues au Titre XV pour la violation des mêmes articles (durée du travail, service médical), sont deux voies indépendantes qui peuvent se cumuler." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue1',
  numero: 9,
  id: 'ue1-chapitre-9',
  titre: 'Contentieux du travail, sanctions et actualités',
  sousTitre: 'Titres XIII à XV du Code du travail · Loi n°015/2002, art. 297 à 329',
  infoBulle: 'Conciliation et médiation des litiges individuels et des conflits collectifs, Tribunaux du Travail, prescription, sanctions administratives et pénalités.',
  loiRef: 'Titres XIII-XV, art. 297 à 329',
  moduleLabel: 'UE 1 · Droit du travail',
  retourRoute: '/ue1-droit-travail',
  coursId: 'ue1-droit-travail',
  objectifs: [
    'Maîtriser la procédure de conciliation préalable obligatoire des litiges individuels devant l\'Inspecteur du Travail, condition de recevabilité',
    'Connaître le circuit complet des conflits collectifs : conciliation, médiation, force exécutoire des accords et recommandations',
    'Connaître les conditions de régularité de la cessation collective du travail (grève) au regard de l\'article 315',
    'Maîtriser les trois délais de prescription des actions nées du contrat de travail et leurs causes d\'interruption',
    'Connaître le mécanisme de la fermeture provisoire de l\'entreprise, sanction administrative distincte des poursuites pénales',
    'Connaître le barème gradué des amendes et des peines de servitude pénale du Titre XV',
  ],
  sections: SECTIONS,
  aRetenir: [
    'Le litige individuel n\'est recevable devant le Tribunal du Travail qu\'après conciliation préalable devant l\'Inspecteur du Travail (art. 298) ; le conflit collectif suit le même principe, complété par une médiation obligatoire en cas d\'échec de la conciliation (art. 304, 309).',
    'Le procès-verbal de conciliation, revêtu de la formule exécutoire du Président du Tribunal du Travail, s\'exécute comme un jugement (art. 301) ; les recommandations non frappées d\'opposition dans les sept jours francs deviennent, elles aussi, exécutoires (art. 313).',
    'La grève n\'est régulière que si elle survient à l\'occasion d\'un conflit collectif et après épuisement des voies de règlement, conventionnelles ou légales (art. 315) ; toute contrainte à y participer comme toute représaille contre un gréviste régulier sont interdites.',
    'Trois délais de prescription coexistent (art. 317) : trois ans en règle générale, un an pour le salaire, deux ans pour les frais de voyage — interrompus par la citation en justice, l\'arrêté de compte, la réclamation recommandée ou la réclamation devant l\'Inspecteur du Travail.',
    'La fermeture provisoire de l\'entreprise (art. 318) ne suspend ni les salaires ni les contrats en cours, et se cumule, sans préjudice, avec les amendes et peines de servitude pénale du Titre XV, graduées de 7 500 à 30 000 FC constants et de trente jours à six mois selon la gravité.',
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
  sources: 'Sources : Loi n°015/2002 du 16 octobre 2002 portant Code du travail, art. 297 à 329, telle que modifiée par la loi n°16/010 du 15 juillet 2016',
}

export default chapitre
