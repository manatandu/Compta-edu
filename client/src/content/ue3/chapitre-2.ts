// Chapitre 2 du module UE3, Comptabilité des sociétés : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
//
// Réécriture approfondie (septembre 2026). Sources lues pendant la rédaction :
// - AUSCGIE révisé du 30 janvier 2014 : art. 309 à 316 (SARL), 385 à 413
//   (SA : capital, souscription, dépôt, statuts, retrait des fonds, apports en
//   nature, assemblée constitutive), 558 (actionnaire unique), 774 à 777
//   (défaut de libération), 853-1 à 853-6 (SAS), 886 à 888 (infractions
//   relatives à la constitution), skill auscgie-acte-uniforme ;
// - arrêté interministériel du 30 décembre 2014 (capital et forme des statuts
//   de la SARL en RDC), art. 1 à 3, déjà vérifié pour l'UE2 ;
// - AUDCIF (art. 17) et SYSCOHADA révisé : Applications 58 et 59, plan de
//   comptes (4613, 4617, 4732, 6324, 6325, 6271, 7713), skill syscohada ;
// - Actualite.cd (14 mai 2021) et Village de la Justice (23 août 2022) sur
//   l'absence de peines fixées en RDC, déjà vérifiés pour l'UE2, chapitre 7.
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch2-q1', question: "Selon l'article 311 de l'AUSCGIE, quel est le capital minimum de la SARL ?",
    options: [
      { id: 'a', texte: "10 000 000 FCFA, sans exception" },
      { id: 'b', texte: "1 000 000 FCFA, sauf dispositions nationales contraires" },
      { id: 'c', texte: "Aucun minimum dans l'Acte uniforme" },
      { id: 'd', texte: "5 000 FCFA par associé" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 311 AUSCGIE',
    explication: "« Sauf dispositions nationales contraires, le capital social doit être d'un million (1.000.000) de francs CFA au moins. » Il est divisé en parts égales dont la valeur nominale ne peut être inférieure à 5 000 FCFA (art. 311).",
  },
  {
    id: 'ch2-q2', question: "Qu'a décidé la RDC sur le capital minimum de la SARL ?",
    options: [
      { id: 'a', texte: "Elle a relevé le minimum à 10 000 000 FC" },
      { id: 'b', texte: "Elle applique le minimum d'un million de FCFA converti en francs congolais" },
      { id: 'c', texte: "Le capital est librement fixé par les associés en tenant compte de l'objet social" },
      { id: 'd', texte: "Elle impose un capital en dollars" },
    ],
    reponseCorrecte: 'c', articleRef: "Arrêté du 30 décembre 2014, art. 2",
    explication: "Faisant usage de la réserve de l'article 311, l'arrêté interministériel du 30 décembre 2014 dispose que le capital de la SARL, unipersonnelle ou pluripersonnelle, « est librement fixé par les associés en tenant compte de l'objet social de la société » (art. 2).",
  },
  {
    id: 'ch2-q3', question: "Comment les parts de numéraire d'une SARL sont-elles libérées ?",
    options: [
      { id: 'a', texte: "Intégralement à la souscription" },
      { id: 'b', texte: "De la moitié au moins à la souscription, le surplus dans les deux ans de l'immatriculation" },
      { id: 'c', texte: "Du quart au moins, le surplus dans les trois ans" },
      { id: 'd', texte: "Librement, selon les statuts" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 311-1 AUSCGIE',
    explication: "Les parts de numéraire sont libérées de la moitié au moins de leur valeur nominale lors de la souscription ; le surplus l'est en une ou plusieurs fois dans les deux ans de l'immatriculation, selon les statuts. Les parts d'apports en nature sont intégralement libérées (art. 311-1).",
  },
  {
    id: 'ch2-q4', question: "Une SARL reçoit un apport en nature unique d'une valeur de 6 500 000 FCFA. Un commissaire aux apports est-il requis ?",
    options: [
      { id: 'a', texte: "Non, le seuil est de 10 000 000 FCFA" },
      { id: 'b', texte: "Oui, la valeur dépasse 5 000 000 FCFA" },
      { id: 'c', texte: "Seulement si un associé le demande" },
      { id: 'd', texte: "Non, jamais en SARL" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 312 AUSCGIE',
    explication: "Le contrôle est obligatoire dès que la valeur de l'apport considéré, ou de l'ensemble des apports en nature, est supérieure à 5 000 000 FCFA (art. 312). Il l'est toujours pour les avantages particuliers.",
  },
  {
    id: 'ch2-q5', question: "En RDC, comment prouve-t-on la libération et le dépôt des fonds d'une SARL ?",
    options: [
      { id: 'a', texte: "Uniquement par déclaration notariée" },
      { id: 'b', texte: "Par le bordereau de versement dûment acquitté d'une banque ou d'une institution de microfinance agréée" },
      { id: 'c', texte: "Par une attestation sur l'honneur du gérant" },
      { id: 'd', texte: "Par le procès-verbal de l'assemblée" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 314 AUSCGIE ; arrêté du 30 décembre 2014, art. 3',
    explication: "L'article 314 prévoit une déclaration notariée « sauf dispositions nationales contraires ». L'arrêté du 30 décembre 2014 use de cette réserve : les fonds peuvent être déposés dans une banque ou une institution de microfinance agréée, « le bordereau de versement dûment acquitté » valant preuve de la libération et du dépôt (art. 3).",
  },
  {
    id: 'ch2-q6', question: "Jusqu'à quand les fonds déposés par les associés d'une SARL sont-ils indisponibles ?",
    options: [
      { id: 'a', texte: "Jusqu'à la signature des statuts" },
      { id: 'b', texte: "Jusqu'au jour de l'immatriculation au RCCM ; ils sont ensuite mis à la disposition des gérants" },
      { id: 'c', texte: "Pendant deux ans" },
      { id: 'd', texte: "Jusqu'à la première assemblée annuelle" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 314 AUSCGIE',
    explication: "Les fonds déposés sont indisponibles jusqu'au jour de l'immatriculation ; à compter de ce jour, ils sont mis à la disposition du ou des gérants régulièrement nommés (art. 314, al. 2).",
  },
  {
    id: 'ch2-q7', question: "La SARL n'est pas immatriculée six mois après le premier dépôt des fonds. Que peuvent faire les apporteurs ?",
    options: [
      { id: 'a', texte: "Retirer librement les fonds à la banque" },
      { id: 'b', texte: "Demander au président de la juridiction compétente l'autorisation de retirer le montant de leurs apports" },
      { id: 'c', texte: "Rien, ils doivent attendre l'immatriculation" },
      { id: 'd', texte: "Transformer la SARL en SNC" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 314 AUSCGIE',
    explication: "Dans ce cas, les apporteurs peuvent, individuellement ou par mandataire commun, demander au président de la juridiction compétente l'autorisation de retirer le montant de leurs apports (art. 314, al. 3).",
  },
  {
    id: 'ch2-q8', question: "Un associé n'a pas signé les statuts d'une SARL, ni en personne ni par mandataire muni d'un pouvoir spécial. Quelle est la sanction ?",
    options: [
      { id: 'a', texte: "Il n'est simplement pas associé" },
      { id: 'b', texte: "La société est nulle" },
      { id: 'c', texte: "Une amende fiscale" },
      { id: 'd', texte: "Aucune, si les autres ont signé" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 315 AUSCGIE',
    explication: "« L'associé ou les associés doivent tous intervenir à l'acte instituant la société, en personne ou par mandataire justifiant d'un pouvoir spécial. À défaut, la société est nulle » (art. 315). Les premiers gérants et associés responsables répondent solidairement du dommage (art. 316).",
  },
  {
    id: 'ch2-q9', question: "Dans quel délai se prescrit l'action en responsabilité contre les gérants et associés auxquels la nullité d'une SARL est imputable ?",
    options: [
      { id: 'a', texte: "Un an à compter de l'immatriculation" },
      { id: 'b', texte: "Trois ans à compter du jour où la décision d'annulation est passée en force de chose jugée" },
      { id: 'c', texte: "Cinq ans à compter de la constitution" },
      { id: 'd', texte: "Dix ans" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 316 AUSCGIE',
    explication: "L'action se prescrit par trois ans à compter du jour où la décision d'annulation est passée en force de chose jugée (art. 316, al. 2).",
  },
  {
    id: 'ch2-q10', question: "Quel est le capital minimum d'une SA qui ne fait pas appel public à l'épargne ?",
    options: [
      { id: 'a', texte: "1 000 000 FCFA" },
      { id: 'b', texte: "10 000 000 FCFA" },
      { id: 'c', texte: "100 000 000 FCFA" },
      { id: 'd', texte: "Librement fixé" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 387 et 824 AUSCGIE',
    explication: "« Le capital social minimum est fixé à dix millions (10.000.000) de francs CFA » (art. 387). Il est porté à cent millions pour les sociétés faisant appel public à l'épargne (art. 824).",
  },
  {
    id: 'ch2-q11', question: "À quel moment le capital d'une SA doit-il être entièrement souscrit ?",
    options: [
      { id: 'a', texte: "Avant la date de la signature des statuts" },
      { id: 'b', texte: "Dans les trois ans de l'immatriculation" },
      { id: 'c', texte: "Avant la première assemblée ordinaire" },
      { id: 'd', texte: "À la première augmentation de capital" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 388 AUSCGIE',
    explication: "« Le capital de la société anonyme doit être entièrement souscrit avant la date de la signature des statuts » (art. 388). La souscription est intégrale ; seule la libération peut être fractionnée.",
  },
  {
    id: 'ch2-q12', question: "Tant que le capital d'une SA n'est pas entièrement libéré, que lui est-il interdit ?",
    options: [
      { id: 'a', texte: "De distribuer des dividendes" },
      { id: 'b', texte: "D'augmenter son capital, sauf par apports en nature, et d'émettre des obligations" },
      { id: 'c', texte: "D'embaucher du personnel" },
      { id: 'd', texte: "De contracter un emprunt bancaire" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 389 AUSCGIE',
    explication: "Tant que le capital n'est pas entièrement libéré, la société ne peut ni augmenter son capital, sauf si l'augmentation est réalisée par des apports en nature, ni émettre des obligations ; les actions de numéraire non intégralement libérées restent nominatives (art. 389).",
  },
  {
    id: 'ch2-q13', question: "L'article 389 fait courir le délai de libération du surplus à compter de l'immatriculation. À compter de quand l'article 774 le fait-il courir ?",
    options: [
      { id: 'a', texte: "De la date de souscription" },
      { id: 'b', texte: "De la signature des statuts" },
      { id: 'c', texte: "De la première assemblée" },
      { id: 'd', texte: "De la mise en demeure" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 389 et 774 AUSCGIE',
    explication: "L'article 774 prévoit un solde versé « dans un délai maximum de trois (3) ans à compter de la date de souscription », alors que l'article 389 compte les trois ans « à compter de l'immatriculation ». La discordance figure dans le texte officiel ; par prudence, on appelle le solde dans les trois ans de la souscription, ce qui satisfait les deux textes.",
  },
  {
    id: 'ch2-q14', question: "Dans quel délai les fonds reçus des souscripteurs d'actions de numéraire doivent-ils être déposés ?",
    options: [
      { id: 'a', texte: "Huit jours à compter de leur réception" },
      { id: 'b', texte: "Un mois" },
      { id: 'c', texte: "Avant l'immatriculation, sans délai précis" },
      { id: 'd', texte: "Quinze jours" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 393 AUSCGIE',
    explication: "Le dépôt doit être fait dans un délai de huit jours à compter de la réception des fonds, chez un notaire ou dans un établissement de crédit ou de microfinance agréé, sur un compte spécial au nom de la société en formation (art. 393).",
  },
  {
    id: 'ch2-q15', question: "Qu'atteste le notaire dans la déclaration notariée de souscription et de versement ?",
    options: [
      { id: 'a', texte: "Que les apports en nature ont été correctement évalués" },
      { id: 'b', texte: "Que le montant des souscriptions est conforme aux bulletins et celui des versements aux sommes déposées" },
      { id: 'c', texte: "Que la société est immatriculée" },
      { id: 'd', texte: "Que les comptes du premier exercice sont réguliers" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 394 AUSCGIE',
    explication: "Sur présentation des bulletins et, le cas échéant, du certificat du dépositaire, le notaire affirme que le montant des souscriptions déclarées est conforme aux bulletins et que celui du versement est conforme aux sommes déposées (art. 394). L'évaluation des apports en nature relève du commissaire aux apports.",
  },
  {
    id: 'ch2-q16', question: "Quand le retrait des fonds d'une SA en formation peut-il avoir lieu ?",
    options: [
      { id: 'a', texte: "Dès la signature des statuts" },
      { id: 'b', texte: "Seulement après l'immatriculation, sur présentation du certificat d'immatriculation" },
      { id: 'c', texte: "Dès l'assemblée générale constitutive" },
      { id: 'd', texte: "À tout moment, par décision du conseil" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 398 AUSCGIE',
    explication: "Le retrait ne peut avoir lieu qu'après l'immatriculation ; il est effectué par le PDG, le DG ou l'administrateur général sur présentation au dépositaire du certificat attestant l'immatriculation (art. 398).",
  },
  {
    id: 'ch2-q17', question: "Dans une SA, le contrôle des apports en nature par un commissaire aux apports est :",
    options: [
      { id: 'a', texte: "Obligatoire au-delà de 5 000 000 FCFA" },
      { id: 'b', texte: "Toujours obligatoire, sans seuil" },
      { id: 'c', texte: "Facultatif" },
      { id: 'd', texte: "Réservé aux SA cotées" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 400 AUSCGIE',
    explication: "« La valeur des apports en nature et/ou les avantages particuliers doivent être contrôlés par un commissaire aux apports » (art. 400), sans condition de seuil, à la différence de la SARL.",
  },
  {
    id: 'ch2-q18', question: "Sur première convocation, quel quorum l'assemblée générale constitutive doit-elle réunir ?",
    options: [
      { id: 'a', texte: "Le quart des actions" },
      { id: 'b', texte: "La moitié des actions" },
      { id: 'c', texte: "Les deux tiers des actions" },
      { id: 'd', texte: "Aucun quorum" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 405 et 406 AUSCGIE',
    explication: "L'assemblée ne délibère valablement que si les souscripteurs présents ou représentés possèdent au moins la moitié des actions ; le quart sur deuxième et troisième convocation (art. 405). Elle statue à la majorité des deux tiers des voix (art. 406).",
  },
  {
    id: 'ch2-q19', question: "Lors du vote spécial sur son apport en nature, que peut faire l'apporteur ?",
    options: [
      { id: 'a', texte: "Voter avec toutes ses actions" },
      { id: 'b', texte: "Voter seulement avec ses actions de numéraire" },
      { id: 'c', texte: "Rien : il n'a voix délibérative ni pour lui-même ni comme mandataire, et ses actions sont exclues du quorum et de la majorité" },
      { id: 'd', texte: "Exiger le vote à l'unanimité" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 408 AUSCGIE',
    explication: "Les actions de l'apporteur, même s'il est aussi souscripteur en numéraire, ne sont prises en compte ni pour le quorum ni pour la majorité, et il n'a voix délibérative ni pour lui-même, ni comme mandataire (art. 408).",
  },
  {
    id: 'ch2-q20', question: "L'assemblée constitutive veut réduire la valeur d'un apport en nature. À quelles conditions ?",
    options: [
      { id: 'a', texte: "À la majorité des deux tiers" },
      { id: 'b', texte: "À l'unanimité des souscripteurs et avec le consentement exprès de l'apporteur" },
      { id: 'c', texte: "Sur décision du commissaire aux apports" },
      { id: 'd', texte: "C'est impossible" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 409 AUSCGIE',
    explication: "L'assemblée ne peut réduire la valeur des apports en nature ou des avantages particuliers qu'à l'unanimité des souscripteurs et avec le consentement exprès de l'apporteur ou du bénéficiaire (art. 409, al. 1er).",
  },
  {
    id: 'ch2-q21', question: "Quelle décision l'assemblée générale constitutive prend-elle sur les actes accomplis pendant la formation ?",
    options: [
      { id: 'a', texte: "Aucune : ils engagent les fondateurs" },
      { id: 'b', texte: "Elle statue sur ces actes, au vu d'un rapport établi par les fondateurs" },
      { id: 'c', texte: "Elle les transmet au greffe" },
      { id: 'd', texte: "Elle les soumet au commissaire aux apports" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 410 AUSCGIE',
    explication: "L'assemblée constitutive « statue sur les actes accomplis pour le compte de la société en formation, conformément aux dispositions de l'article 106 », au vu d'un rapport des fondateurs (art. 410, 4°). Les actes repris entrent dans la comptabilité de la société (chapitre 1).",
  },
  {
    id: 'ch2-q22', question: "Une assemblée constitutive a été irrégulièrement convoquée, mais tous les actionnaires étaient présents. L'action en nullité est-elle recevable ?",
    options: [
      { id: 'a', texte: "Oui, toujours" },
      { id: 'b', texte: "Non, lorsque tous les actionnaires étaient présents ou représentés" },
      { id: 'c', texte: "Oui, si le commissaire aux comptes la demande" },
      { id: 'd', texte: "Oui, dans les trois mois" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 412 AUSCGIE',
    explication: "Toute assemblée constitutive irrégulièrement convoquée peut être annulée ; toutefois, « l'action en nullité n'est pas recevable lorsque tous les actionnaires étaient présents ou représentés » (art. 412).",
  },
  {
    id: 'ch2-q23', question: "Le PDG d'une SA émet des actions avant l'immatriculation de la société. Qu'en dit l'AUSCGIE ?",
    options: [
      { id: 'a', texte: "C'est licite si les fonds sont déposés" },
      { id: 'b', texte: "Le fait constitue une infraction pénale" },
      { id: 'c', texte: "C'est une simple irrégularité régularisable" },
      { id: 'd', texte: "L'AUSCGIE ne dit rien" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 886 AUSCGIE',
    explication: "Constitue une infraction pénale le fait, pour les fondateurs, le PDG, le DG, l'administrateur général ou l'administrateur général adjoint d'une SA, « d'émettre des actions avant l'immatriculation » ou à n'importe quelle époque lorsque l'immatriculation est obtenue par fraude ou que la société est irrégulièrement constituée (art. 886).",
  },
  {
    id: 'ch2-q24', question: "Un fondateur fait attribuer frauduleusement à son apport en nature une valeur supérieure à sa valeur réelle. Que risque-t-il ?",
    options: [
      { id: 'a', texte: "Une simple rectification des statuts" },
      { id: 'b', texte: "Une sanction pénale (art. 887, 4°), sans préjudice de la responsabilité solidaire de cinq ans" },
      { id: 'c', texte: "Rien, l'évaluation relève des associés" },
      { id: 'd', texte: "La perte de ses actions de numéraire" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 887 et 403 AUSCGIE',
    explication: "L'article 887, 4°, vise ceux qui, frauduleusement, « auront fait attribuer à un apport en nature, une évaluation supérieure à sa valeur réelle ». Sur le plan civil, les actionnaires répondent solidairement pendant cinq ans, envers les tiers, de la valeur attribuée lorsqu'elle diffère de celle du commissaire (art. 403, 409).",
  },
  {
    id: 'ch2-q25', question: "En RDC, quelles peines s'appliquent aujourd'hui aux infractions de l'AUSCGIE ?",
    options: [
      { id: 'a', texte: "Celles fixées par l'AUSCGIE lui-même" },
      { id: 'b', texte: "Aucune loi nationale fixant ces peines n'a été adoptée selon les sources consultées ; une proposition de loi a été déclarée recevable en 2021 mais pas adoptée" },
      { id: 'c', texte: "Celles du Code des douanes" },
      { id: 'd', texte: "Une amende uniforme de 10 % du capital" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 886 et s. AUSCGIE ; Actualite.cd, 14 mai 2021',
    explication: "L'AUSCGIE définit les infractions ; les peines relèvent du droit national. Une proposition de loi du député Lucain Kasongo, déclarée recevable le 13 mai 2021 et renvoyée en commission, n'a pas été adoptée selon les sources consultées, et les juridictions de Lubumbashi ont statué en sens contraires (Village de la Justice, 2022).",
  },
  {
    id: 'ch2-q26', question: "Quelles règles de constitution s'appliquent à la SAS ?",
    options: [
      { id: 'a', texte: "Celles de la SARL" },
      { id: 'b', texte: "Celles de la SA, dans la mesure où elles sont compatibles, à l'exception notamment de l'art. 387 al. 1er (capital minimum)" },
      { id: 'c', texte: "Aucune : la SAS est entièrement libre" },
      { id: 'd', texte: "Celles de la SNC" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 853-3 et 853-5 AUSCGIE',
    explication: "Les règles de la SA, à l'exception des articles 387 al. 1er, 414 à 561, 690 et 751 à 753, s'appliquent à la SAS dans la mesure où elles sont compatibles (art. 853-3). Le capital est fixé par les statuts (art. 853-5) ; la libération du quart et le commissaire aux apports s'appliquent par renvoi.",
  },
  {
    id: 'ch2-q27', question: "Quel compte reçoit la créance sur un actionnaire qui n'a pas répondu à un appel de fonds ?",
    options: [
      { id: 'a', texte: "4616 Apporteurs, versements anticipés" },
      { id: 'b', texte: "4617 Apporteurs défaillants" },
      { id: 'c', texte: "4619 Apporteurs, capital à rembourser" },
      { id: 'd', texte: "416 Clients douteux" },
    ],
    reponseCorrecte: 'b', articleRef: 'Plan de comptes, compte 4617',
    explication: "La créance d'appel non honorée est transférée du 4613 au 4617 Apporteurs défaillants. Le capital appelé (1012) n'est pas modifié : la dette de l'actionnaire change de nature, pas le capital.",
  },
  {
    id: 'ch2-q28', question: "Un mois après une mise en demeure restée sans effet, qu'arrive-t-il aux actions de l'actionnaire défaillant ?",
    options: [
      { id: 'a', texte: "Elles sont annulées" },
      { id: 'b', texte: "Elles cessent de donner droit au vote, et le droit au dividende et le droit préférentiel de souscription sont suspendus ; la société poursuit leur vente" },
      { id: 'c', texte: "Elles deviennent des actions de jouissance" },
      { id: 'd', texte: "Rien, tant qu'un jugement n'est pas rendu" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 775 AUSCGIE',
    explication: "Un mois après la mise en demeure restée sans effet, la société poursuit de sa propre initiative la vente des actions ; celles-ci cessent de donner droit au vote et sont déduites du quorum et des majorités, et le droit au dividende et le droit préférentiel sont suspendus jusqu'au paiement (art. 775).",
  },
  {
    id: 'ch2-q29', question: "La vente des actions d'un défaillant rapporte plus que sa dette et les frais. À qui revient l'excédent ?",
    options: [
      { id: 'a', texte: "À la société, en produit exceptionnel" },
      { id: 'b', texte: "À l'actionnaire défaillant, qui « profite de la différence »" },
      { id: 'c', texte: "Aux autres actionnaires" },
      { id: 'd', texte: "Au Trésor public" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 776 AUSCGIE',
    explication: "« L'actionnaire défaillant reste débiteur ou profite de la différence. Les frais engagés par la société pour parvenir à la vente sont à la charge de l'actionnaire défaillant » (art. 776, al. 3). Le solde créditeur du 4617 lui est reversé.",
  },
  {
    id: 'ch2-q30', question: "Qui est tenu du montant non libéré d'une action après sa cession ?",
    options: [
      { id: 'a', texte: "Le dernier cessionnaire seulement" },
      { id: 'b', texte: "Le souscripteur initial seulement" },
      { id: 'c', texte: "Solidairement, l'actionnaire défaillant, les cessionnaires successifs et les souscripteurs" },
      { id: 'd', texte: "La société elle-même" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 777 AUSCGIE',
    explication: "L'actionnaire défaillant, les cessionnaires successifs et les souscripteurs sont tenus solidairement du montant non libéré ; celui qui paie a un recours pour le tout contre les titulaires successifs, la charge définitive incombant au dernier d'entre eux (art. 777).",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '2.1',
    titre: "La SARL : capital, souscription et libération",
    navLabel: "SARL : capital",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Goma, au bord du lac Kivu. Un groupe d'investisseurs veut construire **GOMA LACS HÔTELS**. M. R. apportera un terrain bâti au bord du lac ; d'autres souscripteurs apporteront des fonds ; Mme V., qui a conçu le projet, demande une reconnaissance particulière. Faut-il créer une SARL, une SA ou une SAS ? Le choix n'est pas qu'une affaire de statuts. Il fixe le capital minimum, la part à libérer dès la souscription, le contrôle des apports, la forme des actes et, pour le comptable, le rythme des écritures. Ce chapitre compare les formes, puis suit GOMA LACS HÔTELS, qui retiendra la SA.",
      },
      {
        type: 'paragraphe',
        texte: "Le chapitre 1 a posé les règles communes à toutes les sociétés. Celui-ci montre comment elles se déclinent selon la forme choisie, car c'est la forme qui fixe le capital minimum, la fraction à libérer, le contrôle des apports et le circuit des fonds, donc les écritures. La société à responsabilité limitée est une société « dans laquelle les associés ne sont responsables des dettes sociales qu'à concurrence de leurs apports et dont les droits sont représentés par des parts sociales » ; elle peut être instituée par une personne physique ou morale, la SARL unipersonnelle, ou entre plusieurs personnes (art. 309). Sa dénomination est immédiatement précédée ou suivie des mots « société à responsabilité limitée » ou du sigle « S.A.R.L. » (art. 310). C'est, en RDC comme ailleurs dans l'espace OHADA, la forme la plus répandue chez les petites et moyennes entreprises.",
      },
      {
        type: 'filet',
        titre: "Capital minimum : un million de FCFA, sauf dispositions nationales contraires (art. 311)",
        texte: "« Sauf dispositions nationales contraires, le capital social doit être d'un million (1.000.000) de francs CFA au moins. Il est divisé en parts sociales égales dont la valeur nominale ne peut être inférieure à cinq mille (5.000) francs CFA. » En RDC, l'arrêté interministériel du 30 décembre 2014 a fait usage de cette réserve : le capital de la SARL, unipersonnelle ou pluripersonnelle, « est librement fixé par les associés en tenant compte de l'objet social de la société » (art. 2).",
      },
      {
        type: 'paragraphe',
        texte: "La liberté congolaise n'est pas une invitation à constituer des sociétés sans moyens. La formule « en tenant compte de l'objet social » rappelle que le capital doit rester cohérent avec l'activité : une SARL de transport qui prévoit d'exploiter dix camions ne peut raisonnablement démarrer avec un capital symbolique, sauf à dépendre entièrement de l'endettement. Pour le comptable et l'analyste, un capital trop faible se lit immédiatement dans le bilan : capitaux propres minces, dettes financières lourdes, et risque de franchir rapidement le seuil des capitaux propres inférieurs à la moitié du capital, étudié au chapitre 5. Les banques congolaises le savent et demandent souvent aux associés d'apporter des fonds complémentaires, en capital ou en compte courant bloqué, avant d'accorder un crédit.",
      },
      {
        type: 'carte',
        titre: "Souscription et libération (art. 311-1)",
        tableau: {
          entetes: ["Règle", "Contenu"],
          lignes: [
            ["Souscription", "Les parts doivent être souscrites en totalité par les associés."],
            ["Apports en nature", "Parts intégralement libérées dès la souscription."],
            ["Apports en numéraire", "Libération, lors de la souscription, de la **moitié au moins** de la valeur nominale."],
            ["Surplus", "En une ou plusieurs fois, dans un délai de **deux ans** à compter de l'immatriculation au RCCM, selon les modalités statutaires."],
          ],
        },
        note: "C'est la dérogation propre à la SARL au principe de libération intégrale de l'article 41. La mécanique comptable est celle de la libération fractionnée : comptes 109, 1011, 1012, 1013 et 4613 (Application 59, chapitre 1).",
      },
      {
        type: 'paragraphe',
        texte: "La distinction entre souscription et libération prend ici tout son sens. Les associés doivent souscrire la **totalité** du capital : il n'existe pas de SARL dont une partie des parts attendrait un souscripteur. Mais ils peuvent n'en **libérer** qu'une partie : la moitié du numéraire au minimum. Une SARL au capital de 20 000 000 FC, dont 8 000 000 en nature et 12 000 000 en numéraire, doit donc recevoir dès la souscription les biens apportés et au moins 6 000 000 FC ; les 6 000 000 FC restants peuvent être appelés par le gérant, selon les statuts, dans les deux ans de l'immatriculation. Dans les comptes, les 6 000 000 non appelés sont inscrits au débit du 109 et au crédit du 1011 ; ils figureront au bilan en négatif sous le capital (rubrique CB) jusqu'à l'appel.",
      },
      {
        type: 'paragraphe',
        texte: "Le nominal des parts mérite un mot. L'article 311 impose des parts égales d'une valeur nominale d'au moins 5 000 FCFA ; l'arrêté congolais, qui porte sur le montant du capital, ne dit rien d'autre sur ce point, si bien que la prudence commande de retenir un nominal au moins égal à la contre-valeur de ce montant en francs congolais (art. 906). En pratique, les SARL congolaises retiennent des nominaux ronds, 10 000 ou 100 000 FC, qui facilitent les calculs de répartition. Le nombre de parts de chaque associé détermine ensuite ses droits dans les bénéfices et l'actif net, en proportion de ses apports (art. 54), et le comptable doit pouvoir le justifier à tout moment par un tableau de répartition du capital tenu à jour.",
      },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[2] },
    ],
  },
  {
    numero: '2.2',
    titre: "La SARL : contrôle des apports en nature, dépôt des fonds et forme des statuts",
    navLabel: "SARL : contrôle et dépôt",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les statuts doivent nécessairement contenir l'évaluation de chaque apport en nature et la description, le cas échéant l'évaluation, des avantages particuliers stipulés (art. 312, al. 1er). Le contrôle d'un **commissaire aux apports** est obligatoire dès que la valeur de l'apport en nature considéré, ou de l'ensemble des apports en nature, est supérieure à **cinq millions (5.000.000) de francs CFA** ; il l'est toujours pour les avantages particuliers. Choisi sur la liste des commissaires aux comptes, désigné à l'unanimité des futurs associés ou, à défaut, par la juridiction compétente, il établit sous sa responsabilité un rapport annexé aux statuts qui décrit chaque apport, indique le mode d'évaluation et **atteste que la valeur des apports correspond au moins à la valeur du nominal des parts à émettre**.",
      },
      {
        type: 'filet',
        titre: "La sanction : cinq ans de responsabilité solidaire (art. 312)",
        texte: "Lorsqu'il n'y a pas eu de commissaire aux apports, ou lorsque la valeur retenue diffère de celle qu'il a proposée, les associés sont **solidairement responsables pendant cinq ans, à l'égard des tiers, de la valeur attribuée aux apports en nature**. L'obligation de garantie vise la valeur des apports au moment de la constitution ou de l'augmentation de capital, non le maintien de cette valeur.",
      },
      {
        type: 'paragraphe',
        texte: "Ce seuil exprimé en francs CFA se lit en RDC par sa contre-valeur en francs congolais (art. 906, chapitre 1). Pour le comptable, la présence ou l'absence du rapport du commissaire n'est pas un détail de procédure : c'est la pièce qui justifie la valeur d'entrée des biens apportés, puisque l'AUDCIF inscrit ces biens à leur valeur d'apport (art. 36). Un auditeur qui trouve à l'actif un immeuble apporté pour 30 000 000 FC sans rapport de commissaire aux apports ne peut pas s'assurer que cette valeur est justifiée, et il le signalera. Inversement, lorsque le rapport existe mais que les associés ont retenu une valeur plus élevée, la différence engage leur responsabilité et justifie une attention particulière aux dépréciations éventuelles dès la première clôture.",
      },
      {
        type: 'paragraphe',
        texte: "Le commissaire aux apports n'est pas le commissaire aux comptes, même s'il est choisi sur la même liste. Sa mission est ponctuelle : apprécier la valeur des apports en nature et des avantages particuliers au jour de la constitution ou de l'augmentation de capital. Le commissaire aux comptes, lui, certifie les états financiers annuels ; dans la SARL, il n'est obligatoire qu'au-delà des seuils étudiés en UE2. Les honoraires du commissaire aux apports sont une charge de la société (6324 Honoraires des professions réglementées), comme ceux du notaire. Dans la SA, l'article 402 ajoute que les honoraires des experts qu'il se fait assister sont à la charge de la société, sauf clause contraire des statuts.",
      },
      {
        type: 'filet',
        titre: "Question d'étudiant : commissaire aux apports ou commissaire aux comptes ?",
        texte: "Ce ne sont pas les mêmes, même si le commissaire aux apports est choisi sur la même liste. Le commissaire aux comptes contrôle les comptes de la société pendant toute sa vie. Le commissaire aux apports intervient une seule fois, à la constitution ou lors d'une augmentation de capital, pour apprécier la valeur des apports en nature et des avantages particuliers. Chez GOMA LACS HÔTELS, c'est lui qui a évalué le terrain de M. R. à 45 000 000 FC et apprécié l'avantage accordé à Mme V. ; le commissaire aux comptes n'interviendra qu'ensuite, sur les comptes annuels.",
      },
      { type: 'controle', question: QCM[3] },
      {
        type: 'carte',
        titre: "Dépôt, indisponibilité et retrait des fonds (art. 313-314)",
        liste: [
          "**Dépôt immédiat** par le fondateur des fonds provenant de la libération des parts, contre récépissé, dans un compte ouvert au nom de la société en formation, en banque ou dans un établissement de crédit ou de microfinance agréé, ou en l'étude d'un notaire ; mention en est portée dans les statuts (art. 313).",
          "**Constat** : sauf dispositions nationales contraires, libération et dépôt sont constatés par une **déclaration notariée de souscription et de versement** listant les souscripteurs et les sommes versées par chacun (art. 314, al. 1er).",
          "**Indisponibilité** : les fonds sont indisponibles jusqu'au jour de l'immatriculation ; à compter de ce jour, ils sont mis à la disposition du ou des gérants régulièrement nommés (art. 314, al. 2).",
          "**Défaut d'immatriculation** : six mois après le premier dépôt, les apporteurs peuvent, individuellement ou par mandataire commun, demander au président de la juridiction compétente l'autorisation de retirer le montant de leurs apports (art. 314, al. 3).",
        ],
      },
      {
        type: 'filet',
        titre: "Les simplifications congolaises (arrêté du 30 décembre 2014)",
        texte: "L'arrêté a utilisé les deux réserves nationales de l'Acte uniforme pour la SARL. Les statuts peuvent être établis « par acte notarié ou par acte sous seing privé » (art. 1er). Les fonds peuvent être déposés dans un établissement de crédit ou une institution de microfinance agréée, « le bordereau de versement dûment acquitté » valant preuve de la libération et du dépôt (art. 3). La déclaration notariée n'est donc plus indispensable pour une SARL congolaise : le bordereau bancaire en tient lieu.",
      },
      {
        type: 'paragraphe',
        texte: "Dans le dossier comptable, le bordereau acquitté devient ainsi la pièce justificative de la libération. Il doit correspondre, associé par associé, aux sommes portées au crédit du 4613. Deux pièges sont fréquents. Le premier consiste à déposer les fonds sur un compte personnel du gérant plutôt que sur le compte ouvert au nom de la société en formation : les fonds ne sont alors ni déposés au sens de l'article 313, ni libérés au sens de l'article 42, faute d'être devenus la propriété de la société. Le second consiste à retirer les fonds avant l'immatriculation, alors qu'ils sont indisponibles (art. 314) : l'écriture de sortie de banque n'a pas de place avant la naissance de la personne morale.",
      },
      {
        type: 'paragraphe',
        texte: "La forme de l'acte obéit enfin à une règle stricte. Tous les associés doivent intervenir à l'acte instituant la société, en personne ou par mandataire justifiant d'un pouvoir spécial ; « à défaut, la société est nulle » (art. 315). Les premiers gérants et les associés auxquels la nullité est imputable sont solidairement responsables envers les autres associés et les tiers du dommage résultant de l'annulation, l'action se prescrivant par trois ans à compter du jour où la décision d'annulation est passée en force de chose jugée (art. 316). La simplification des statuts sous seing privé ne dispense donc pas de la signature de chacun.",
      },
      {
        type: 'paragraphe',
        texte: "Le bordereau bancaire présente un avantage pratique évident : il est délivré immédiatement par la banque ou l'institution de microfinance, sans frais de notaire. Il présente aussi une limite : il prouve un versement sur un compte, mais ne dit rien de la répartition entre associés si un seul d'entre eux a versé pour tous. Le comptable exigera donc, en plus du bordereau global, un état des versements par associé, signé par le gérant, qui justifie le crédit de chaque sous-compte d'apporteur. Lorsque l'associé verse en dollars américains, le bordereau indique en général le montant en devises : la conversion en francs congolais se fait au cours du jour du versement (art. 51 et 52 AUDCIF), et un apport insuffisant après conversion laisse subsister une créance sur l'associé.",
      },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
    ],
  },
  {
    numero: '2.3',
    titre: "Comptabilisation de la constitution d'une SARL",
    navLabel: "Écritures SARL",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Illustrons la mécanique par une SARL congolaise ordinaire. BUSANGA TRANSPORT SARL est constituée le 02/05/N au capital de 30 000 000 FC, divisé en 3 000 parts de 10 000 FC. M. L. apporte un camion évalué à 12 000 000 FC par un commissaire aux apports ; Mme P. et M. S. souscrivent chacun 900 parts en numéraire, soit 18 000 000 FC au total, libérées de moitié à la souscription par versement sur le compte bancaire ouvert au nom de la société en formation, le bordereau acquitté étant joint au dossier. La société est immatriculée le 12/05/N. Le solde du numéraire est appelé le 01/03/N+1 et versé le 20/03/N+1.",
      },
      {
        type: 'carte',
        titre: "02/05/N : souscription et appel de la fraction exigible",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["4611", "", "Apporteurs, apports en nature (M. L.)", "12 000 000", ""],
            ["4612", "", "Apporteurs, apports en numéraire (moitié appelée)", "9 000 000", ""],
            ["109", "", "Apporteurs, capital souscrit, non appelé", "9 000 000", ""],
            ["", "1011", "Capital souscrit, non appelé", "", "30 000 000"],
            ["4613", "", "Apporteurs, capital appelé, non versé", "21 000 000", ""],
            ["", "4611", "Apporteurs, apports en nature", "", "12 000 000"],
            ["", "4612", "Apporteurs, apports en numéraire", "", "9 000 000"],
            ["1011", "", "Capital souscrit, non appelé", "21 000 000", ""],
            ["", "1012", "Capital souscrit, appelé, non versé", "", "21 000 000"],
          ],
        },
        note: "Le capital est souscrit en totalité (30 000 000 au 1011) ; seule la fraction appelée (nature intégrale et moitié du numéraire, soit 21 000 000) passe au 4613 et au 1012. La fraction non appelée (9 000 000) reste au 109.",
      },
      {
        type: 'carte',
        titre: "02/05/N : réalisation des apports",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["2451", "", "Matériel automobile (camion apporté)", "12 000 000", ""],
            ["521", "", "Banques (compte de la société en formation, fonds indisponibles)", "9 000 000", ""],
            ["", "4613", "Apporteurs, capital appelé, non versé", "", "21 000 000"],
            ["1012", "", "Capital souscrit, appelé, non versé", "21 000 000", ""],
            ["", "1013", "Capital souscrit, appelé, versé, non amorti", "", "21 000 000"],
          ],
        },
        note: "Le camion entre à sa valeur d'apport (art. 36 AUDCIF). Les fonds, déposés au nom de la société en formation, sont indisponibles jusqu'au 12/05/N (art. 314) ; il est utile de les suivre dans un sous-compte bancaire distinct tant qu'ils sont bloqués.",
      },
      {
        type: 'carte',
        titre: "01/03/N+1 et 20/03/N+1 : appel et versement du solde",
        tableau: {
          entetes: ["Date", "Écriture", "Montant"],
          lignes: [
            ["01/03/N+1", "Débit 4613 / crédit 109 ; puis débit 1011 / crédit 1012", "9 000 000"],
            ["20/03/N+1", "Débit 521 / crédit 4613 ; puis débit 1012 / crédit 1013", "9 000 000"],
            ["Situation finale", "1013 = 30 000 000 ; 109, 1011, 1012 et 4613 soldés", "—"],
          ],
        },
        note: "L'appel intervient moins de deux ans après l'immatriculation du 12/05/N : il respecte l'article 311-1.",
      },
      {
        type: 'paragraphe',
        texte: "Au 31/12/N, le bilan de BUSANGA TRANSPORT présente dans ses capitaux propres une rubrique CA Capital de 30 000 000 et une rubrique CB Apporteurs, capital non appelé de − 9 000 000. Les frais de constitution payés (honoraires, frais du guichet unique, annonces légales) figurent dans les charges du premier exercice. La Note 13 des Notes annexes présente le capital associé par associé et indique, pour le capital non appelé, le délai restant pour l'appeler : ici, jusqu'au 12/05/N+2 au plus tard.",
      },
      {
        type: 'paragraphe',
        texte: "Les statuts peuvent aussi prévoir que certains associés libèrent davantage que la moitié dès la souscription. La fraction versée au-delà de ce qui est appelé n'est pas encore exigible : elle est portée au crédit du compte 4616 Apporteurs, versements anticipés, et restera au passif, dans la rubrique DM Autres dettes, jusqu'à l'appel du solde. À l'appel, le 4616 est soldé par imputation sur la créance d'appel (débit 4616, crédit 4613), et l'associé n'a plus rien à verser pour cette fraction. Cette technique évite de déroger à l'égalité entre associés : la décision d'appel reste collective et s'applique à tous, mais l'associé qui a déjà versé en est simplement libéré par compensation comptable. Le gérant, qui procède aux appels selon les modalités statutaires, doit veiller à ce que l'ensemble du numéraire soit appelé et versé avant l'expiration du délai de deux ans de l'article 311-1.",
      },
      {
        type: 'paragraphe',
        texte: "La SARL unipersonnelle suit exactement les mêmes écritures, avec un seul compte d'apporteur. Deux particularités méritent l'attention du comptable. D'abord, l'associé unique est souvent aussi le gérant : les flux entre son patrimoine personnel et celui de la société doivent être strictement séparés, et toute somme qu'il met à disposition au-delà de son apport relève du compte courant 462, jamais du capital. Ensuite, la confusion des patrimoines est la première cause de difficulté des petites SARL : payer des dépenses personnelles avec la trésorerie sociale ou encaisser des recettes sociales sur un compte personnel prive la comptabilité de toute fiabilité et expose le dirigeant aux sanctions étudiées en UE2.",
      },
    ],
  },
  {
    numero: '2.4',
    titre: "La SA : capital, souscription intégrale et libération du quart",
    navLabel: "SA : capital",
    blocs: [
      {
        type: 'paragraphe',
        texte: "La société anonyme est une société « dans laquelle les actionnaires ne sont responsables des dettes sociales qu'à concurrence de leurs apports et dont les droits des actionnaires sont représentés par des actions » ; elle peut ne comprendre qu'un seul actionnaire (art. 385). Le capital minimum est de **dix millions (10.000.000) de francs CFA**, divisé en actions dont le montant nominal, un nombre entier, est librement fixé par les statuts (art. 387) ; l'article 824 porte ce minimum à cent millions pour les sociétés faisant appel public à l'épargne. Le capital doit être **entièrement souscrit avant la date de la signature des statuts** (art. 388).",
      },
      {
        type: 'carte',
        titre: "La libération des actions de numéraire (art. 389)",
        liste: [
          "**Un quart au moins** de la valeur nominale libéré lors de la souscription.",
          "Surplus libéré dans un délai maximal de **trois ans** à compter de l'immatriculation au RCCM, selon les modalités des statuts ou une décision du conseil d'administration ou de l'administrateur général.",
          "Les actions de numéraire non intégralement libérées restent obligatoirement sous la **forme nominative**.",
          "Tant que le capital n'est pas entièrement libéré : **ni augmentation de capital** (sauf par apports en nature) **ni émission d'obligations**.",
          "Les actions **ne peuvent représenter des apports en industrie**, en cohérence avec l'interdiction de l'article 50-1.",
        ],
      },
      {
        type: 'filet',
        titre: "Deux points de départ pour un même délai [texte officiel]",
        texte: "L'article 389 fait courir le délai de trois ans « à compter de l'immatriculation ». L'article 774, placé dans le titre consacré aux valeurs mobilières, prévoit que le solde est versé au fur et à mesure des appels « dans un délai maximum de trois (3) ans à compter de la date de souscription ». La discordance figure dans le texte officiel. La prudence commande d'appeler le solde dans les trois ans de la souscription : cette date, antérieure à l'immatriculation, satisfait les deux textes.",
      },
      {
        type: 'paragraphe',
        texte: "La souscription en numéraire est constatée par un **bulletin de souscription** établi par les fondateurs, daté et signé par le souscripteur qui écrit en toutes lettres le nombre de titres souscrits (art. 390), dressé en deux exemplaires originaux, l'un pour la société en formation, l'autre pour le notaire (art. 391). Il comporte les mentions de l'article 392 : dénomination, forme, capital à souscrire en distinguant nature et numéraire, siège prévu, nombre et valeur nominale des actions, modalités d'émission, identité du souscripteur et versements effectués, dépositaire des fonds, notaire chargé de la déclaration. Pour le comptable, les bulletins sont les pièces justificatives de l'écriture de souscription : leur total doit égaler le capital en numéraire crédité au 1011 et au 1012.",
      },
      {
        type: 'paragraphe',
        texte: "Pourquoi une libération minimale plus faible dans la SA que dans la SARL ? Parce que la SA est conçue pour des projets plus lourds, où les actionnaires s'engagent sur des montants importants qu'ils ne peuvent pas toujours mobiliser d'un coup. En contrepartie, la loi entoure la libération fractionnée de garde-fous : forme nominative, qui permet à la société de connaître à tout moment ses débiteurs ; interdiction d'augmenter le capital en numéraire ou d'emprunter par obligations tant que les actionnaires n'ont pas eux-mêmes tenu leurs engagements ; et procédure d'exécution forcée contre le défaillant (section 2.9). Enfin, la négociation d'actions non entièrement libérées ou d'actions de numéraire dont le quart n'a pas été versé est pénalement sanctionnée (art. 888).",
      },
      {
        type: 'paragraphe',
        texte: "Suivons sur la durée une SA dont le capital de 100 000 000 FC est libéré du quart à la souscription, puis appelé en trois fractions égales au cours des trois années suivantes. À la constitution, le compte 1013 porte 25 000 000 et le compte 1011 porte 75 000 000, avec en contrepartie un 109 débiteur de 75 000 000. À chaque appel, 25 000 000 passent du 109 au 4613 et du 1011 au 1012 ; à chaque versement, du 4613 à la banque et du 1012 au 1013. Au bilan, la rubrique CA reste constante à 100 000 000, tandis que la rubrique CB, négative, passe de − 75 000 000 à − 50 000 000, puis − 25 000 000, puis zéro. Les capitaux propres augmentent ainsi à mesure des appels, sans qu'aucune décision d'augmentation de capital n'intervienne : c'est l'exécution progressive d'un engagement déjà pris.",
      },
      {
        type: 'filet',
        titre: "Et si GOMA LACS HÔTELS avait choisi la SARL ?",
        texte: "Les actions de numéraire de GOMA LACS HÔTELS sont libérées du quart à la souscription, comme le permet la SA. Dans une SARL, les parts de numéraire auraient dû être libérées de la moitié au moins de leur valeur nominale lors de la souscription. Pour les 10 500 titres de numéraire de 10 000 FC, cela aurait représenté au moins 52 500 000 FC à verser dès l'origine, au lieu de 26 250 000 FC. La SA ménage donc davantage la trésorerie des fondateurs au départ, au prix d'une organisation plus lourde : commissaire aux comptes dès l'origine, assemblée constitutive en cas d'apports en nature.",
      },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[11] },
    ],
  },
  {
    numero: '2.5',
    titre: "La SA : dépôt des fonds, déclaration notariée, statuts et retrait",
    navLabel: "SA : circuit des fonds",
    blocs: [
      {
        type: 'carte',
        titre: "Le circuit des fonds (art. 393-398)",
        tableau: {
          entetes: ["Étape", "Règle"],
          lignes: [
            ["Dépôt", "Dans les **huit jours** de la réception des fonds, chez un notaire ou dans un établissement de crédit ou de microfinance agréé de l'État partie du siège, sur un **compte spécial** au nom de la société en formation, avec la liste des souscripteurs et de leurs versements (art. 393)."],
            ["Déclaration notariée", "Sur présentation des bulletins et, le cas échéant, du certificat du dépositaire, le notaire dresse la **déclaration notariée de souscription et de versement**, attestant la conformité des souscriptions aux bulletins et des versements aux sommes déposées (art. 394)."],
            ["Statuts", "Signés par tous les souscripteurs, en personne ou par mandataire spécialement habilité, **après** l'établissement du certificat du dépositaire (art. 396) ; mentions renforcées de l'article 397 (mode d'administration, premiers organes, forme des actions, clauses d'agrément et de préemption)."],
            ["Retrait", "Uniquement **après l'immatriculation**, par le PDG, le DG ou l'administrateur général, sur certificat d'immatriculation ; six mois après le versement sans immatriculation, tout souscripteur peut demander en référé la nomination d'un administrateur chargé de restituer les fonds, sous déduction de ses frais (art. 398)."],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Chaque étape a sa pièce, et chaque pièce son rôle comptable. La liste remise au dépositaire et le certificat du dépositaire justifient les sommes versées par chaque souscripteur, donc le crédit du 4613. La déclaration notariée, que l'AUDCIF range parmi les « éléments de contrôle » du compte 101, justifie le capital souscrit et libéré. Le certificat d'immatriculation marque la date à partir de laquelle les fonds deviennent disponibles. Le relevé du compte spécial, enfin, permet de rapprocher la trésorerie comptable de la trésorerie réelle. Un dossier de constitution de SA sans l'une de ces pièces est un dossier incomplet.",
      },
      {
        type: 'paragraphe',
        texte: "Le dépositaire est souvent le notaire. Dans ce cas, les fonds ne sont pas encore à la banque de la société : ils transitent comptablement par le compte **4732 Mandataires**, comme dans l'Application 58. À la réception des fonds par le notaire, la société débite 4732 et crédite 4613 ; au reversement, après l'immatriculation, elle débite 521 pour le montant net reçu et les comptes de charges pour les honoraires et frais retenus (6324, 6325), par le crédit de 4732. Lorsque le dépositaire est une banque, les fonds sont directement portés au débit du 521, sur un compte spécial indisponible jusqu'à l'immatriculation.",
      },
      {
        type: 'paragraphe',
        texte: "Le délai de huit jours de l'article 393 et l'indisponibilité de l'article 398 protègent les souscripteurs contre le risque que leurs fonds soient utilisés avant que la société n'existe. La loi pénale renforce cette protection : l'article 887 sanctionne ceux qui, par la déclaration notariée ou le certificat du dépositaire, affirment sincères des souscriptions qu'ils savent fictives, ou déclarent versés des fonds qui n'ont pas été mis définitivement à la disposition de la société, ainsi que ceux qui remettent au notaire ou au dépositaire des listes ou bulletins mentionnant de telles souscriptions ou de tels versements. Le comptable qui constaterait un écart entre les bulletins, la déclaration notariée et le relevé du compte spécial doit le signaler sans délai.",
      },
      {
        type: 'paragraphe',
        texte: "Le choix du dépositaire a des conséquences pratiques. Un dépôt en banque ou en institution de microfinance agréée met les fonds sur un compte spécial au nom de la société en formation, qui apparaît directement au débit du 521 ; il génère parfois des frais de tenue de compte, qui sont des charges bancaires (631) du premier exercice. Un dépôt chez le notaire fait transiter les fonds par le compte 4732 jusqu'au reversement. Dans les deux cas, le dépositaire doit communiquer, jusqu'au retrait des fonds, la liste des souscripteurs et de leurs versements à tout souscripteur qui en fait la demande (art. 393). Cette transparence est une protection pour les actionnaires minoritaires, qui peuvent vérifier que chacun a tenu son engagement.",
      },
      { type: 'controle', question: QCM[13] },
      {
        type: 'paragraphe',
        texte: "Attention à une confusion fréquente : les simplifications de l'arrêté du 30 décembre 2014 ne concernent que la SARL, dont il détermine « la forme des statuts et le capital social ». La société anonyme congolaise reste soumise au droit commun de l'Acte uniforme : bulletins de souscription, dépôt sur compte spécial dans les huit jours, déclaration notariée de souscription et de versement (art. 394), statuts signés après le certificat du dépositaire. Le guichet unique traite les deux formes, mais le dossier d'une SA comprend nécessairement l'acte notarié. Pour le comptable, cela signifie que la pièce justificative de la libération n'est pas la même selon la forme : bordereau acquitté pour la SARL, déclaration notariée accompagnée du certificat du dépositaire pour la SA.",
      },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[15] },
    ],
  },
  {
    numero: '2.6',
    titre: "La SA : apports en nature, avantages particuliers et assemblée constitutive",
    navLabel: "SA : assemblée constitutive",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Lorsque la SA est constituée avec des apports en nature ou des avantages particuliers, un régime renforcé s'ajoute au précédent (art. 399). Le contrôle d'un **commissaire aux apports est obligatoire sans seuil** (art. 400), c'est la différence majeure avec la SARL. Son rapport décrit chaque apport et chaque avantage, en indique la valeur, précise le mode d'évaluation et les raisons de ce choix, et établit que la valeur correspond au moins au nominal des actions à émettre (art. 401). Il peut se faire assister d'experts, dont les honoraires sont à la charge de la société sauf clause contraire (art. 402). Le rapport est annexé aux statuts ; si la valeur retenue diffère de celle qu'il propose, les actionnaires sont solidairement responsables pendant cinq ans, envers les tiers, de la valeur attribuée (art. 403).",
      },
      {
        type: 'paragraphe',
        texte: "Les **avantages particuliers** sont des droits accordés à une personne, associée ou non, en rémunération d'un service rendu lors de la constitution : par exemple une part des bénéfices pendant quelques années au profit d'un fondateur qui a monté le projet. Ils ne sont pas des apports et ne donnent pas lieu à l'émission d'actions ; ils ne sont donc pas inscrits au capital. Mais ils pèsent sur les autres actionnaires, d'où le contrôle obligatoire du commissaire aux apports, qui, lorsqu'il ne peut pas les chiffrer, en apprécie « la consistance et les incidences sur la situation des actionnaires » (art. 401). Comptablement, les sommes versées au bénéficiaire au titre de l'avantage seront traitées lors de leur exigibilité selon leur nature, charge ou répartition du bénéfice selon les stipulations des statuts.",
      },
      {
        type: 'carte',
        titre: "L'assemblée générale constitutive (art. 404-413)",
        liste: [
          "Convoquée par les fondateurs après la déclaration notariée, par lettre au porteur contre récépissé ou recommandée, quinze jours au moins avant sa date (art. 404).",
          "**Quorum** : moitié des actions sur première convocation, quart sur deuxième et troisième (art. 405) ; **majorité des deux tiers** des voix, bulletins blancs non comptés (art. 406) ; présidence par l'actionnaire ayant le plus grand nombre d'actions ou, à défaut, par le doyen d'âge (art. 407).",
          "**Vote spécial** sur chaque apport en nature et chaque avantage particulier : l'apporteur ou le bénéficiaire ne vote pas, même comme mandataire, et ses actions sont exclues du quorum et de la majorité (art. 408).",
          "La valeur d'un apport ou d'un avantage ne peut être **réduite** qu'à l'**unanimité** des souscripteurs, avec le consentement exprès de l'apporteur ; si la valeur retenue diffère de celle du commissaire, actionnaires et administrateurs sont solidairement responsables envers les tiers pendant cinq ans (art. 409).",
          "L'assemblée **constate** la souscription intégrale et la libération légale, **adopte** les statuts (modifiables seulement à l'unanimité), **nomme** les premiers administrateurs ou l'administrateur général et le premier commissaire aux comptes, **statue** sur les actes de la période de formation et peut **donner mandat** de prendre des engagements avant l'immatriculation (art. 410).",
          "Une assemblée irrégulièrement convoquée peut être annulée, sauf si tous les actionnaires étaient présents ou représentés (art. 412) ; les fondateurs et administrateurs auxquels la nullité est imputable peuvent être déclarés solidairement responsables du dommage causé aux tiers (art. 413).",
        ],
      },
      {
        type: 'paragraphe',
        texte: "Le calcul du quorum de l'article 408 est un exercice classique. Soit une SA de 10 000 actions, dont 3 000 attribuées à un apporteur en nature qui a aussi souscrit 500 actions de numéraire. Pour le vote spécial sur son apport, ses 3 500 actions sont exclues : le quorum se calcule sur 6 500 actions, et la moitié sur première convocation représente 3 250 actions. La majorité des deux tiers se calcule sur les voix des seuls souscripteurs présents ou représentés autorisés à voter. Pour les autres résolutions, comme l'adoption des statuts ou la nomination des administrateurs, l'apporteur vote avec toutes ses actions.",
      },
      {
        type: 'paragraphe',
        texte: "Le procès-verbal de l'assemblée indique la date et le lieu, le mode de convocation, l'ordre du jour, le quorum, les résolutions et le résultat des votes ; il mentionne l'acceptation de leurs fonctions par les premiers administrateurs et le premier commissaire aux comptes, et il est archivé au siège avec la feuille de présence (art. 411). Pour le comptable, ce procès-verbal justifie deux séries d'écritures : l'entrée des biens apportés à leur valeur d'apport votée, et la reprise des actes de la période de formation approuvés en application de l'article 410, 4°.",
      },
      {
        type: 'paragraphe',
        texte: "L'assemblée constitutive adopte les statuts, qu'elle ne peut modifier qu'à l'unanimité de tous les souscripteurs (art. 410, 2°). Cette règle protège les souscripteurs qui se sont engagés au vu d'un projet de statuts : une majorité ne peut, au dernier moment, changer les règles du jeu. Elle nomme aussi le premier commissaire aux comptes, dont la mission commencera avec le premier exercice. Pour le comptable, la date de l'assemblée est souvent celle des premières écritures de la SA : souscription, appel, entrée des apports en nature, et reprise des actes de la période de formation. Toutes ces écritures sont datées et justifiées par le procès-verbal, qui devient la pièce maîtresse du dossier permanent.",
      },
      {
        type: 'filet',
        titre: "Le regard de l'auditeur",
        texte: "Dans le procès-verbal de l'assemblée constitutive de GOMA LACS HÔTELS, l'auditeur vérifie d'abord le quorum. Pour le vote sur l'apport de M. R., ses 5 000 actions, y compris ses 500 actions de numéraire, ne comptent ni dans le quorum ni dans la majorité (art. 408). Sur 9 500 actions présentes, il n'en reste que 4 500 à prendre en compte, face à une base de 10 000 : le quorum de la moitié n'est pas atteint sur première convocation. Une approbation votée en ignorant cette règle fragiliserait toute la constitution, et avec elle les écritures du comptable.",
      },
      { type: 'controle', question: QCM[16] },
      {
        type: 'paragraphe',
        texte: "Pour les résolutions ordinaires de l'assemblée constitutive, la majorité se calcule sur les voix des souscripteurs présents ou représentés. Si, sur une SA de 10 000 actions, 6 000 actions sont présentes et que 4 100 votent pour l'adoption des statuts, 1 500 contre et 400 blanc, la majorité requise est des deux tiers des voix exprimées hors bulletins blancs (art. 406), soit deux tiers de 5 600 voix, ou 3 734 voix environ : la résolution est adoptée avec 4 100 voix. Rappelons toutefois que les statuts ne peuvent être modifiés qu'à l'unanimité (art. 410, 2°) : l'assemblée adopte ou rejette le projet, elle ne le réécrit pas à la majorité. Les résolutions sur la valeur des apports suivent, elles, les règles spéciales des articles 408 et 409.",
      },
      { type: 'controle', question: QCM[17] },
      { type: 'controle', question: QCM[18] },
      { type: 'controle', question: QCM[19] },
      { type: 'controle', question: QCM[20] },
      { type: 'controle', question: QCM[21] },
    ],
  },
  {
    numero: '2.7',
    titre: "Comptabilisation : la constitution d'une SA libérée du quart",
    navLabel: "Écritures SA",
    blocs: [
      {
        type: 'paragraphe',
        texte: "La mécanique comptable est celle du chapitre 1, paramétrée par les règles propres de la SA. Soit KATANGA MINERAUX SA, constituée le 15/02/N au capital de **40 000 000 FC** (4 000 actions de numéraire de 10 000 FC), libérée du minimum légal, le quart, à la souscription. Les fonds sont déposés chez le notaire le 10/02/N. La société est immatriculée le 28/02/N ; le notaire reverse les fonds le 05/03/N sous déduction de 1 200 000 d'honoraires et 300 000 de frais d'actes.",
      },
      {
        type: 'carte',
        titre: "15/02/N : souscription et appel du quart",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["109", "", "Apporteurs, capital souscrit, non appelé (3/4)", "30 000 000", ""],
            ["4613", "", "Apporteurs, capital appelé, non versé (1/4)", "10 000 000", ""],
            ["", "1011", "Capital souscrit, non appelé", "", "30 000 000"],
            ["", "1012", "Capital souscrit, appelé, non versé", "", "10 000 000"],
          ],
        },
        note: "Le capital souscrit total (40 000 000) est ventilé entre fraction appelée (1012) et non appelée (1011) ; la créance conditionnelle pour la fraction non appelée loge en 109, la créance exigible en 4613.",
      },
      {
        type: 'carte',
        titre: "Libération du quart chez le notaire, puis reversement après immatriculation",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["4732", "", "Mandataires : notaire", "10 000 000", ""],
            ["", "4613", "Apporteurs, capital appelé, non versé", "", "10 000 000"],
            ["1012", "", "Capital souscrit, appelé, non versé", "10 000 000", ""],
            ["", "1013", "Capital souscrit, appelé, versé, non amorti", "", "10 000 000"],
            ["521", "", "Banques (05/03/N)", "8 500 000", ""],
            ["6324", "", "Honoraires des professions réglementées", "1 200 000", ""],
            ["6325", "", "Frais d'actes et de contentieux", "300 000", ""],
            ["", "4732", "Mandataires : notaire", "", "10 000 000"],
          ],
        },
        note: "Le reversement suit l'immatriculation (art. 398). Les frais sont des charges du premier exercice. Les appels ultérieurs suivent le cycle de l'Application 59 : 4613 contre 109 et 1011 vers 1012 à l'appel, puis 521 contre 4613 et 1012 vers 1013 au versement.",
      },
      {
        type: 'paragraphe',
        texte: "Remarquez que les fonds reçus du notaire (8 500 000) sont inférieurs au capital libéré (10 000 000). Il n'y a là aucune anomalie : le capital libéré mesure l'exécution de l'engagement des actionnaires, et l'actionnaire qui a versé 2 500 000 a entièrement libéré son quart, quels que soient les frais que la société paie ensuite avec ces fonds. L'erreur à ne pas commettre serait de ne virer au 1013 que 8 500 000, ou d'imputer les frais sur le capital : le capital ne se réduit que par une décision régulière (chapitre 5). Les frais diminuent le résultat, donc les capitaux propres, pas le capital.",
      },
      {
        type: 'paragraphe',
        texte: "Au 31/12/N, en l'absence d'autre appel, les capitaux propres de KATANGA MINERAUX présentent : rubrique CA Capital 40 000 000, rubrique CB Apporteurs, capital non appelé − 30 000 000, et le résultat de l'exercice, qui intègre les 1 500 000 de frais de constitution. La Note 13 indique que le capital non appelé doit l'être dans les trois ans ; compte tenu de la discordance entre les articles 389 et 774, la société a intérêt à fixer l'échéance au plus tard au 15/02/N+3, trois ans après la souscription.",
      },
      {
        type: 'paragraphe',
        texte: "Le calendrier de KATANGA MINERAUX illustre la chronologie imposée par la loi : dépôt des fonds (10/02/N) dans les huit jours de leur réception, signature des statuts après le certificat du dépositaire (15/02/N), immatriculation (28/02/N), puis seulement retrait des fonds (05/03/N). Toute écriture qui ne respecterait pas cet ordre, par exemple un paiement fournisseur tiré sur le compte spécial avant le 28/02/N, trahirait une irrégularité. Le comptable de la société en formation doit donc tenir un échéancier des formalités, et ne comptabiliser les dépenses payées avec les fonds du capital qu'à partir du retrait régulier. Les dépenses antérieures, payées par les fondateurs, relèvent de la reprise des engagements étudiée au chapitre 1.",
      },
      { type: 'controle', question: QCM[12] },
    ],
  },
  {
    numero: '2.8',
    titre: "La SAS et les sociétés unipersonnelles par actions",
    navLabel: "SAS et SASU",
    blocs: [
      {
        type: 'paragraphe',
        texte: "La société par actions simplifiée est une société « instituée par un ou plusieurs associés et dont les statuts prévoient librement l'organisation et le fonctionnement de la société sous réserve des règles impératives » du livre qui lui est consacré ; ses associés ne répondent des dettes qu'à concurrence de leurs apports et leurs droits sont représentés par des actions (art. 853-1). Lorsqu'elle ne compte qu'un associé, celui-ci est dénommé « associé unique » et la société est désignée par les mots « société par actions simplifiée unipersonnelle » ou le sigle « SASU » (art. 853-1 et 853-2).",
      },
      {
        type: 'paragraphe',
        texte: "Pour la constitution, la règle clé est le renvoi de l'article 853-3 : « Dans la mesure où elles sont compatibles avec les dispositions particulières prévues par le présent livre, les règles concernant les sociétés anonymes, à l'exception des articles 387 alinéa 1er, 414 à 561, 690, 751 à 753 ci-dessus, sont applicables à la société par actions simplifiée. » Sont ainsi écartés le capital minimum de la SA et l'essentiel des règles sur le conseil d'administration et les assemblées. Restent applicables, par renvoi, la souscription intégrale (art. 388), la libération du quart avec solde dans les trois ans (art. 389), le dépôt des fonds et le retrait après immatriculation (art. 393 à 398) et le contrôle des apports en nature par un commissaire aux apports (art. 400 et suivants). Le capital et le nominal sont fixés par les statuts, et la SAS peut émettre des actions inaliénables d'industrie (art. 853-5).",
      },
      {
        type: 'carte',
        titre: "Constitution comparée : SARL, SA, SAS",
        tableau: {
          entetes: ["Point", "SARL", "SA", "SAS"],
          lignes: [
            ["Capital minimum", "Libre en RDC (arrêté 2014, art. 2)", "10 000 000 FCFA (art. 387)", "Fixé par les statuts (art. 853-5)"],
            ["Libération minimale du numéraire", "Moitié ; solde sous 2 ans", "Quart ; solde sous 3 ans", "Quart ; solde sous 3 ans (renvoi, art. 853-3)"],
            ["Commissaire aux apports", "Au-delà de 5 000 000 FCFA", "Toujours", "Toujours (renvoi)"],
            ["Preuve du dépôt", "Bordereau acquitté en RDC (arrêté 2014, art. 3)", "Déclaration notariée (art. 394)", "Déclaration notariée (renvoi)"],
            ["Apport en industrie", "Admis dans les limites de l'art. 50-3", "Interdit (art. 50-1, 389)", "Actions inaliénables (art. 853-5)"],
            ["Assemblée constitutive", "Non", "Oui en présence d'apports en nature ou d'avantages particuliers", "En principe comme la SA : les art. 404 à 413 ne figurent pas parmi ceux que l'art. 853-3 écarte"],
          ],
        },
        note: "Pour la SAS, les règles de la SA ne s'appliquent que « dans la mesure où elles sont compatibles » avec le livre qui lui est propre (art. 853-3) : vérifier chaque point dans les statuts.",
      },
      {
        type: 'paragraphe',
        texte: "Dans la SA à actionnaire unique, les décisions qui doivent être prises en assemblée le sont par l'actionnaire unique (art. 558). Dans la SASU, l'associé unique exerce les pouvoirs dévolus aux associés, et ses décisions qui donneraient lieu à publicité légale si elles étaient prises par une assemblée sont publiées dans les mêmes formes (art. 853-1). Sur le plan comptable, rien ne change : la constitution d'une SASU se comptabilise comme celle d'une SA, avec un seul compte d'apporteur, et la vigilance sur la séparation des patrimoines est la même que pour la SARL unipersonnelle.",
      },
      {
        type: 'paragraphe',
        texte: "La SAS séduit par sa souplesse : organisation libre de la direction autour d'un président obligatoire, absence de capital minimum, possibilité d'actions d'industrie et de clauses statutaires encadrant l'entrée et la sortie des associés, étudiées en UE2. Pour le comptable, cette souplesse a une contrepartie : les statuts deviennent la première source de règles, avant même l'Acte uniforme, puisque celui-ci ne s'applique que « dans la mesure » de sa compatibilité. Avant de comptabiliser la constitution d'une SAS, il faut donc lire les statuts : qui appelle les fonds, dans quel délai, qui peut retirer les fonds déposés, et comment les décisions collectives sont prises. Les écritures, elles, sont celles de la SA.",
      },
      {
        type: 'paragraphe',
        texte: "Le choix de la forme a enfin un coût comptable qu'il faut anticiper dès la constitution. La SA doit désigner un commissaire aux comptes et un suppléant dès l'origine, nommés par l'assemblée constitutive ou par les statuts, et en supporter les honoraires chaque année. La SARL et la SAS n'y sont tenues qu'au-delà de certains seuils, étudiés en UE2. La SA suppose aussi un conseil d'administration ou un administrateur général, avec les procès-verbaux correspondants. Pour une petite entreprise de Bukavu ou de Kananga, ces coûts fixes pèsent lourd : c'est une raison fréquente de préférer la SARL, ou la SAS lorsque les associés recherchent une organisation plus souple ou prévoient l'entrée d'investisseurs.",
      },
      { type: 'controle', question: QCM[25] },
    ],
  },
  {
    numero: '2.9',
    titre: "L'actionnaire défaillant (art. 774-777) et son traitement comptable",
    navLabel: "Défaillance",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le solde des actions est versé « au fur et à mesure des appels du conseil d'administration ou de l'administrateur général » (art. 774). Si un actionnaire ne répond pas à un appel, l'article 775 organise l'**exécution** : la société lui adresse une mise en demeure par lettre au porteur contre récépissé ou recommandée avec avis de réception ; un mois après, restée sans effet, elle poursuit **de sa propre initiative** la vente des actions. À compter de ce même délai, les actions concernées **cessent de donner droit au vote**, elles sont déduites du quorum et des majorités, et le **droit au dividende** comme le **droit préférentiel de souscription** sont suspendus jusqu'au paiement.",
      },
      {
        type: 'carte',
        titre: "La vente forcée (art. 776) et la solidarité (art. 777)",
        liste: [
          "Actions **cotées** : vente en bourse. Actions **non cotées** : enchères publiques par un notaire.",
          "Publicité préalable : publication des numéros des actions dans un journal habilité trente jours après la mise en demeure ; avis au débiteur et à ses codébiteurs ; vente au plus tôt quinze jours après cet avis.",
          "L'actionnaire défaillant **reste débiteur ou profite de la différence** entre le produit de la vente et sa dette ; les frais de la vente sont à sa charge.",
          "**Solidarité** : le défaillant, les cessionnaires successifs et les souscripteurs sont tenus solidairement du montant non libéré ; la société peut agir avant, après ou en même temps que la vente ; celui qui paie a un recours pour le tout contre les titulaires successifs, la charge définitive incombant au dernier d'entre eux (art. 777).",
        ],
      },
      {
        type: 'carte',
        titre: "Traduction comptable : le compte 4617 Apporteurs défaillants",
        tableau: {
          entetes: ["Étape", "Écriture"],
          lignes: [
            ["Constat de la défaillance", "La fraction appelée et non versée est transférée : débit 4617 Apporteurs défaillants / crédit 4613 Apporteurs, capital appelé, non versé."],
            ["Vente des titres (art. 776)", "Le produit de la vente est encaissé : débit 521 Banques / crédit 4617."],
            ["Frais et intérêts à la charge du défaillant", "Les frais de vente engagés par la société, enregistrés en charges, et l'intérêt de retard de plein droit (art. 43) sont portés au débit du 4617, par le crédit des comptes de produits concernés (intérêts au 7713)."],
            ["Dénouement", "Le solde créditeur éventuel du 4617 est reversé au défaillant, qui « profite de la différence » : débit 4617 / crédit 521. Un solde débiteur reste une créance recouvrable contre lui et ses coobligés solidaires (art. 777)."],
          ],
        },
        note: "Le Guide d'application ne consacre pas d'Application numérotée à la défaillance : ce schéma applique le plan de comptes (4617) à la procédure des articles 775-777. La vente ne change rien au capital : les titres existent toujours, seul leur titulaire change, et aucun compte 101 n'est mouvementé.",
      },
      {
        type: 'paragraphe',
        texte: "Un point mérite d'être compris. Le capital appelé (1012) reste inchangé tant que l'appel n'est pas payé : c'est la créance qui change de compte, pas le capital. Lorsque le produit de la vente couvre la dette, la fraction appelée peut être considérée comme versée et virée du 1012 au 1013. Lorsque la vente ne couvre pas la dette, la société conserve une créance sur le défaillant et ses coobligés, qu'elle pourra déprécier si son recouvrement devient douteux ; la fraction correspondante reste alors non versée tant qu'aucun coobligé n'a payé. Le comptable suit donc en parallèle deux questions distinctes : le recouvrement de la créance (4617) et l'état de libération du capital (1012, 1013).",
      },
      {
        type: 'paragraphe',
        texte: "Le calendrier de la défaillance se calcule à partir de la mise en demeure. Si elle est reçue le 05/04/N, la suspension du vote, du dividende et du droit préférentiel intervient un mois plus tard, le 05/05/N ; la publication des numéros des actions a lieu trente jours après la mise en demeure ; la vente ne peut intervenir moins de quinze jours après l'envoi de l'avis au débiteur. Si la créance sur le défaillant devient douteuse, la société peut la déprécier : le plan de comptes prévoit le compte 496 Dépréciations des comptes apporteurs, associés et groupe. La dépréciation ne touche pas le capital ; elle constate seulement que la créance ne sera peut-être pas recouvrée en totalité.",
      },
      {
        type: 'filet',
        titre: "Erreur fréquente",
        texte: "Réduire le capital appelé (1012) quand un actionnaire ne paie pas son appel. Le capital ne change pas : c'est la créance qui change de compte. La créance d'appel non payée peut être isolée au 4617, puis dépréciée au besoin par le 496 si son recouvrement devient douteux. Le 1012 n'est viré au 1013 que lorsque la fraction appelée est effectivement versée, par le défaillant, par un coobligé ou grâce au produit de la vente de ses actions. Le comptable suit donc deux questions en parallèle : le recouvrement de la créance et l'état de libération du capital.",
      },
      { type: 'controle', question: QCM[26] },
      {
        type: 'paragraphe',
        texte: "La procédure d'exécution des articles 775 à 777 est placée dans le titre consacré aux valeurs mobilières émises par les sociétés par actions ; elle vise donc les actionnaires. Dans la SARL, dont les parts ne sont pas des valeurs mobilières négociables, la société qui n'obtient pas le versement d'un associé dispose des moyens du droit commun : intérêt légal de plein droit (art. 43), dommages et intérêts, action en exécution contre l'associé débiteur. Comptablement, le traitement est le même : la créance d'appel non payée peut être isolée au compte 4617, puis dépréciée au besoin par le compte 496, et le capital appelé reste au 1012 tant qu'il n'est pas versé.",
      },
      { type: 'controle', question: QCM[27] },
      { type: 'controle', question: QCM[28] },
      { type: 'controle', question: QCM[29] },
    ],
  },
  {
    numero: '2.10',
    titre: "Irrégularités de la constitution : nullités, responsabilités et infractions",
    navLabel: "Irrégularités",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Une constitution irrégulière n'est pas seulement une affaire de juristes : elle fragilise les écritures du comptable, qui reposent toutes sur la validité de l'acte de société. L'Acte uniforme prévoit trois séries de sanctions. Les **nullités** frappent l'acte lui-même : la SARL dont un associé n'est pas intervenu à l'acte est nulle (art. 315), et l'assemblée constitutive irrégulièrement convoquée peut être annulée, sauf présence ou représentation de tous les actionnaires (art. 412). Les **responsabilités civiles** obligent ceux qui ont causé le dommage à le réparer : premiers gérants et associés responsables de la nullité de la SARL (art. 316), fondateurs et administrateurs responsables de la nullité de l'assemblée constitutive (art. 413), actionnaires et administrateurs garants pendant cinq ans de la valeur des apports lorsqu'elle s'écarte de celle du commissaire (art. 403, 409). Les **infractions pénales**, enfin, visent les comportements frauduleux.",
      },
      {
        type: 'carte',
        titre: "Les infractions relatives à la constitution (art. 886-888)",
        tableau: {
          entetes: ["Article", "Comportement visé"],
          lignes: [
            ["886", "Émettre des actions avant l'immatriculation, ou à n'importe quelle époque lorsque l'immatriculation est obtenue par fraude ou que la société est irrégulièrement constituée (fondateurs, PDG, DG, administrateur général ou adjoint d'une SA)."],
            ["887, 1° et 2°", "Affirmer sincères des souscriptions fictives ou déclarer versés des fonds non mis définitivement à la disposition de la société, dans la déclaration notariée ou le certificat du dépositaire ; remettre au notaire ou au dépositaire des listes ou bulletins mentionnant de telles souscriptions ou de tels versements."],
            ["887, 3° et 4°", "Obtenir des souscriptions par simulation ou publication de faits faux ; publier des noms de personnes présentées faussement comme attachées à la société ; faire attribuer frauduleusement à un apport en nature une évaluation supérieure à sa valeur réelle."],
            ["888", "Négocier sciemment des actions non entièrement libérées, ou des actions de numéraire dont le quart du nominal n'a pas été versé."],
          ],
        },
        note: "L'Acte uniforme définit les éléments constitutifs ; le quantum des peines relève du droit national de chaque État partie.",
      },
      {
        type: 'filet',
        titre: "En RDC : des peines toujours en attente",
        texte: "Selon les sources consultées, la RDC n'a pas adopté de loi fixant les peines applicables aux infractions des Actes uniformes. Une proposition de loi modifiant le Code pénal à cette fin, initiée par le député Lucain Kasongo, a été déclarée recevable par l'Assemblée nationale le 13 mai 2021 et renvoyée en commission (Actualite.cd, 14 mai 2021). Il s'agit d'une initiative parlementaire dont nous n'avons trouvé aucune trace d'adoption. En 2022, des praticiens relevaient que le tribunal de commerce de Lubumbashi avait jugé en sens contraires, l'une de ses décisions retenant l'absence de peine, l'autre appliquant l'ordonnance-loi n° 66/286 du 2 mai 1966 (Village de la Justice, 23 août 2022). Ce vide ne rend pas les comportements licites : les nullités et responsabilités civiles s'appliquent pleinement.",
      },
      {
        type: 'paragraphe',
        texte: "Le comptable et le commissaire aux comptes occupent ici une position d'observateurs privilégiés. Les rapprochements décrits dans ce chapitre (bulletins et déclaration notariée, bordereau et comptes d'apporteurs, rapport du commissaire aux apports et valeurs d'entrée, certificat d'immatriculation et date du retrait des fonds) sont précisément ceux qui révèlent une souscription fictive, un versement simulé ou un apport surévalué. Une souscription fictive se traduit par un capital crédité sans encaissement réel, donc par une créance sur apporteur qui ne se solde jamais ; un apport surévalué par une immobilisation dont la valeur d'entrée ne résiste pas au premier test de dépréciation. La rigueur des écritures de constitution est ainsi la première ligne de défense contre la fraude.",
      },
      {
        type: 'paragraphe',
        texte: "Pour le commissaire aux comptes, ces irrégularités ne se traitent pas de la même manière selon leur gravité. Une erreur de virement entre le 1012 et le 1013 se corrige par une écriture de régularisation. Un apport surévalué appelle une dépréciation et une information dans les Notes annexes. Une souscription fictive ou un retrait prématuré des fonds engagent la responsabilité des dirigeants et doivent être portés à la connaissance des associés. Le commissaire aux comptes n'est pas un juge : il décrit, il quantifie et il informe. Mais son rapport sur les premiers états financiers d'une société est souvent le premier document où les irrégularités de la constitution apparaissent au grand jour.",
      },
      { type: 'controle', question: QCM[22] },
      { type: 'controle', question: QCM[23] },
      {
        type: 'paragraphe',
        texte: "Retour à GOMA LACS HÔTELS, dont le cas 5 détaille les chiffres. La société a choisi la SA pour accueillir plusieurs investisseurs et un apport en nature important. Ce choix a imposé un commissaire aux apports pour le terrain de M. R. et l'avantage de Mme V., un dépôt des fonds de numéraire sur un compte spécial, et une assemblée constitutive dont le quorum se calcule sans les actions de l'apporteur. Sur deuxième convocation, le quart suffit, et la valeur de 45 000 000 FC ne peut être réduite qu'avec l'unanimité des souscripteurs et l'accord exprès de M. R. Chacune de ces règles se traduit dans les comptes : 4612 pour l'apport en nature, 4613 et 1012 pour l'appel du quart, 1013 pour la fraction versée, et 109 pour les trois quarts qui restent à appeler.",
      },
      { type: 'controle', question: QCM[24] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas1',
    titre: "LUALABA HOLDING SA : constitution libérée du quart",
    contexte: "LUALABA HOLDING SA est constituée au capital de 80 000 000 FC (8 000 actions de numéraire de 10 000 FC), intégralement souscrit avant la signature des statuts. Les actions sont libérées du quart à la souscription, les fonds étant déposés chez le notaire, qui les reversera après l'immatriculation sous déduction de 2 600 000 d'honoraires et 400 000 de frais d'actes. Dix-huit mois plus tard, le conseil d'administration appelle un deuxième quart.",
    questions: [
      { num: 1, enonce: "Vérifiez la régularité de l'opération au regard des articles 387 à 389.", correction: "Capital de 80 000 000 FC supérieur à la contre-valeur du minimum de 10 000 000 FCFA (art. 387, 906) ; souscription intégrale avant signature des statuts (art. 388) ; libération du quart, soit 20 000 000, avec surplus dans les trois ans (art. 389 ; trois ans de la souscription selon l'art. 774, par prudence). Tant que le capital n'est pas entièrement libéré, les actions restent nominatives, et la société ne peut ni augmenter son capital sauf en nature, ni émettre d'obligations." },
      { num: 2, enonce: "Passez les écritures de souscription et d'appel du premier quart.", correction: "Débit 109 Apporteurs, capital souscrit, non appelé 60 000 000 ; débit 4613 Apporteurs, capital appelé, non versé 20 000 000 ; crédit 1011 Capital souscrit, non appelé 60 000 000 ; crédit 1012 Capital souscrit, appelé, non versé 20 000 000." },
      { num: 3, enonce: "Passez les écritures de libération du premier quart chez le notaire, puis du reversement après immatriculation.", correction: "Réception par le notaire : débit 4732 Mandataires 20 000 000 / crédit 4613 20 000 000, puis virement débit 1012 / crédit 1013 20 000 000. Reversement, après immatriculation (art. 398) : débit 521 Banques 17 000 000 ; débit 6324 Honoraires des professions réglementées 2 600 000 ; débit 6325 Frais d'actes et de contentieux 400 000 ; crédit 4732 20 000 000." },
      { num: 4, enonce: "Passez les écritures de l'appel et du versement du deuxième quart.", correction: "Appel : débit 4613 20 000 000 / crédit 109 20 000 000, et virement débit 1011 / crédit 1012 20 000 000. Versement : débit 521 20 000 000 / crédit 4613 20 000 000, puis débit 1012 / crédit 1013 20 000 000. Après ces opérations : 1013 = 40 000 000 ; 1011 = 40 000 000 ; 109 = 40 000 000, la moitié restant à appeler." },
      { num: 5, enonce: "La société souhaite émettre un emprunt obligataire avant l'appel du solde. Est-ce possible ?", correction: "Non. Tant que le capital n'est pas entièrement libéré, la société ne peut ni augmenter son capital, sauf par apports en nature, ni émettre des obligations (art. 389). Elle doit d'abord appeler et obtenir la libération du solde. L'emprunt obligataire est étudié au chapitre 6." },
    ],
  },
  {
    id: 'cas2',
    titre: "MAI-NDOMBE SARL : apports en nature et commissaire aux apports",
    contexte: "Trois associés constituent MAI-NDOMBE SARL au capital de 24 000 000 FC (parts de 10 000 FC) : Mme A. apporte un entrepôt évalué à 9 000 000 ; M. B. apporte un véhicule utilitaire évalué à 3 500 000 ; M. C. souscrit 11 500 000 en numéraire, libérés de moitié à la souscription. Les fonds sont versés sur un compte ouvert au nom de la société en formation dans une banque agréée, contre bordereau acquitté.",
    questions: [
      { num: 1, enonce: "Un commissaire aux apports est-il obligatoire ?", correction: "Oui. Le contrôle est requis dès que la valeur de l'apport considéré, ou de l'ensemble des apports en nature, dépasse 5 000 000 FCFA (art. 312). L'entrepôt dépasse à lui seul le seuil, et l'ensemble des apports en nature (12 500 000) le dépasse aussi. Le commissaire, choisi sur la liste des commissaires aux comptes et désigné à l'unanimité des futurs associés, ou à défaut par la juridiction compétente, établit un rapport annexé aux statuts." },
      { num: 2, enonce: "Les associés retiennent pour l'entrepôt 10 000 000, au lieu des 9 000 000 proposés par le commissaire. Conséquences ?", correction: "La valeur retenue peut différer de celle du commissaire, mais les associés sont alors solidairement responsables pendant cinq ans, envers les tiers, de la valeur attribuée aux apports en nature (art. 312). La garantie porte sur la valeur au moment de la constitution. Comptablement, l'entrepôt entrerait pour 10 000 000 (valeur d'apport, art. 36 AUDCIF), et l'écart avec l'avis du commissaire justifierait une vigilance particulière sur une éventuelle dépréciation à la clôture." },
      { num: 3, enonce: "Vérifiez la libération et passez les écritures de souscription et d'appel (valeurs du commissaire).", correction: "Apports en nature intégralement libérés (art. 311-1, al. 1er) ; numéraire libéré de moitié, soit 5 750 000, le solde dans les deux ans de l'immatriculation. Écritures : débit 4611 12 500 000 ; débit 4612 5 750 000 ; débit 109 5 750 000 ; crédit 1011 24 000 000. Appel : débit 4613 18 250 000 / crédit 4611 12 500 000 et crédit 4612 5 750 000 ; virement débit 1011 / crédit 1012 18 250 000." },
      { num: 4, enonce: "Passez les écritures de réalisation des apports et le virement de capital.", correction: "Nature : débit 2313 Bâtiments administratifs et commerciaux 9 000 000 ; débit 2451 Matériel automobile 3 500 000 ; crédit 4613 12 500 000. Numéraire : débit 521 5 750 000 / crédit 4613 5 750 000, le bordereau acquitté prouvant la libération et le dépôt (arrêté du 30 décembre 2014, art. 3), les fonds restant indisponibles jusqu'à l'immatriculation (art. 314). Virement : débit 1012 / crédit 1013 18 250 000. Restent 1011 = 5 750 000 et 109 = 5 750 000." },
      { num: 5, enonce: "Quatre mois après le dépôt, la société n'est pas immatriculée. Que peut faire M. C. ?", correction: "Les fonds sont indisponibles jusqu'à l'immatriculation (art. 314, al. 2). Ce n'est qu'à défaut d'immatriculation dans les six mois du premier dépôt que les apporteurs peuvent demander au président de la juridiction compétente l'autorisation de retirer leurs apports (art. 314, al. 3). À quatre mois, M. C. doit encore attendre ; il peut en revanche s'informer auprès du GUCE de l'état du dossier, dont le délai légal de traitement est de trois jours ouvrables à partir du dossier complet (décret n° 14/014, art. 18)." },
    ],
  },
  {
    id: 'cas3',
    titre: "ARUWIMI SA : l'actionnaire défaillant",
    contexte: "ARUWIMI SA (capital 50 000 000 FC, 5 000 actions de 10 000 libérées du quart) appelle le deuxième quart, soit 2 500 par action. M. D., titulaire de 400 actions non cotées, ne verse pas les 1 000 000 appelés malgré la mise en demeure reçue le 05/04/N. Le 10/07/N, ses 400 actions sont vendues aux enchères publiques par un notaire pour 4 600 000. Les frais de vente s'élèvent à 150 000 et l'intérêt de retard dû est arrêté à 30 000.",
    questions: [
      { num: 1, enonce: "Décrivez la procédure et vérifiez sa régularité (art. 775-776).", correction: "Mise en demeure par lettre au porteur contre récépissé ou recommandée (05/04/N) ; un mois après, restée sans effet, la société peut poursuivre la vente. Actions non cotées : enchères publiques par un notaire (art. 776). La société publie les numéros des actions dans un journal habilité trente jours après la mise en demeure, avise M. D. et ne vend que quinze jours au moins après cet avis : le calendrier est compatible avec une vente au 10/07/N." },
      { num: 2, enonce: "Quels droits de M. D. sont affectés entre la mise en demeure et la vente ?", correction: "Un mois après la mise en demeure restée sans effet, ses 400 actions cessent de donner droit au vote et sont déduites du quorum et des majorités ; son droit au dividende et son droit préférentiel de souscription sont suspendus jusqu'au paiement (art. 775, al. 2 et 3)." },
      { num: 3, enonce: "Passez l'écriture de constat de la défaillance et celle de la vente.", correction: "Constat : débit 4617 Apporteurs défaillants 1 000 000 / crédit 4613 1 000 000 ; la créance change de nature, le capital appelé (1012) n'est pas modifié. Vente : débit 521 Banques 4 600 000 / crédit 4617 4 600 000. La vente transfère les titres à l'adjudicataire : aucun compte de capital n'est mouvementé." },
      { num: 4, enonce: "Imputez les frais et l'intérêt, déterminez le solde revenant à M. D. et passez l'écriture de reversement.", correction: "Frais (art. 776, al. 3) et intérêt de plein droit (art. 43) sont à la charge du défaillant : débit 4617 180 000, par le crédit des produits concernés (récupération des frais enregistrés en charges, et 7713 pour l'intérêt de 30 000). Solde du 4617 : 4 600 000 − 1 000 000 − 180 000 = 3 420 000 créditeur. M. D. profite de la différence : débit 4617 3 420 000 / crédit 521 3 420 000. La dette d'appel étant couverte, la fraction appelée peut être virée du 1012 au 1013 pour 1 000 000." },
      { num: 5, enonce: "Si la vente n'avait produit que 900 000, qui la société aurait-elle pu poursuivre ?", correction: "La dette (1 000 000 + 180 000) n'aurait pas été couverte : M. D. serait resté débiteur de 280 000. L'article 777 rend solidaires le défaillant, les cessionnaires successifs et les souscripteurs du montant non libéré ; la société peut agir contre eux avant, après ou en même temps que la vente. Celui qui paie a un recours pour le tout contre les titulaires successifs, la charge définitive incombant au dernier d'entre eux." },
    ],
  },
  {
    id: 'cas4',
    titre: "Comparatif SARL, SA, SAS : conseil au créateur",
    contexte: "Un entrepreneur de Kisangani veut créer une société de négoce avec un capital de 30 000 000 FC. Il apportera un immeuble évalué à 12 000 000 ; ses partenaires apporteront 18 000 000 en numéraire, mais souhaitent étaler leurs versements le plus longtemps possible. Un partenaire propose de « garantir l'émission de titres négociables » pour lever des fonds si la SARL est retenue.",
    questions: [
      { num: 1, enonce: "Comparez capital minimum et libération du numéraire en SARL, SA et SAS.", correction: "SARL : capital librement fixé en RDC (arrêté du 30 décembre 2014, art. 2) ; numéraire libéré de moitié, surplus dans les deux ans (art. 311-1). SA : minimum de 10 000 000 FCFA en contre-valeur (art. 387, 906) ; quart, surplus dans les trois ans (art. 389). SAS : capital fixé par les statuts (art. 853-5) ; quart et trois ans par renvoi (art. 853-3). Pour l'étalement maximal, SA et SAS permettent de ne verser que 4 500 000 sur 18 000 000 à la souscription, contre 9 000 000 en SARL." },
      { num: 2, enonce: "Comparez le contrôle de l'apport de l'immeuble.", correction: "En SARL, un commissaire aux apports est requis si la valeur dépasse 5 000 000 FCFA (art. 312) ; en SA et en SAS, il l'est toujours (art. 400 ; art. 853-3), avec en SA un vote spécial de l'assemblée constitutive dont l'apporteur est exclu (art. 408). Dans tous les cas, l'apport en nature est intégralement libéré et évalué dans les statuts, et un écart avec l'avis du commissaire engage une responsabilité solidaire de cinq ans envers les tiers (art. 312, 403, 409)." },
      { num: 3, enonce: "Que penser de la proposition de « garantir l'émission de titres négociables » en SARL ?", correction: "Elle est illicite. Seules les sociétés par actions émettent des titres négociables ; l'émission ou la garantie de titres négociables par les autres sociétés est nulle (art. 58). Lever des fonds par titres négociables suppose une SA ; la SAS, elle, ne peut pas faire publiquement appel à l'épargne (art. 853-4)." },
      { num: 4, enonce: "Si la SA est retenue avec libération du quart, quelles contraintes pèseront sur la société jusqu'à la libération intégrale ?", correction: "Actions de numéraire nominatives ; interdiction d'augmenter le capital sauf en nature et d'émettre des obligations (art. 389) ; exécution forcée contre tout défaillant (art. 775-777) ; obligation d'achever la libération dans les trois ans ; et sanction pénale de la négociation d'actions non entièrement libérées (art. 888). Comptablement, le 109 restera inscrit en négatif sous le capital, et la Note 13 indiquera le délai restant." },
    ],
  },
  {
    id: 'cas5',
    titre: "GOMA LACS HÔTELS SA : apports en nature et assemblée constitutive",
    contexte: "GOMA LACS HÔTELS SA est constituée au capital de 150 000 000 FC (15 000 actions de 10 000 FC). M. R. apporte un terrain bâti au bord du lac évalué à 45 000 000 FC par le commissaire aux apports et reçoit 4 500 actions ; il souscrit en outre 500 actions de numéraire. Les autres souscripteurs prennent 10 000 actions de numéraire. Les actions de numéraire (10 500) sont libérées du quart, les fonds étant déposés à la banque sur un compte spécial. Les statuts accordent à Mme V., fondatrice qui a conçu le projet, un avantage particulier. À l'assemblée constitutive, sur première convocation, sont présents ou représentés des souscripteurs détenant 9 500 actions, dont les 5 000 de M. R.",
    questions: [
      { num: 1, enonce: "Qui doit contrôler l'apport de M. R. et l'avantage de Mme V. ?", correction: "Un commissaire aux apports, obligatoire sans seuil pour les apports en nature et les avantages particuliers dans la SA (art. 400). Son rapport décrit chaque apport et avantage, en indique la valeur et le mode d'évaluation, et établit que la valeur correspond au moins au nominal des actions à émettre ; s'il ne peut chiffrer l'avantage, il en apprécie la consistance et les incidences sur la situation des actionnaires (art. 401)." },
      { num: 2, enonce: "Le quorum est-il atteint pour le vote spécial sur l'apport de M. R. ?", correction: "Pour ce vote, les actions de M. R., y compris ses actions de numéraire, ne sont pas prises en compte (art. 408). Base de calcul : 15 000 − 5 000 = 10 000 actions ; actions présentes prises en compte : 9 500 − 5 000 = 4 500. Quorum sur première convocation : la moitié, soit 5 000 actions (art. 405). 4 500 < 5 000 : le quorum n'est pas atteint pour ce vote, qui devra être repris sur deuxième convocation, où le quart suffira (2 500 actions)." },
      { num: 3, enonce: "Sur deuxième convocation, des actionnaires veulent ramener la valeur du terrain à 40 000 000. À quelles conditions ?", correction: "L'assemblée ne peut réduire la valeur d'un apport en nature qu'à l'unanimité des souscripteurs et avec le consentement exprès de l'apporteur, mentionné au procès-verbal (art. 409). À défaut, soit l'assemblée approuve la valeur de 45 000 000 à la majorité des deux tiers (art. 406), soit elle la désapprouve et la constitution ne peut aboutir en l'état." },
      { num: 4, enonce: "La valeur de 45 000 000 est approuvée. Passez les écritures de souscription, d'appel et de réalisation des apports.", correction: "Numéraire : 10 500 actions × 10 000 = 105 000 000, dont un quart appelé (26 250 000) et trois quarts non appelés (78 750 000). Souscription et appel : débit 4611 45 000 000 ; débit 4613 26 250 000 ; débit 109 78 750 000 ; crédit 1011 78 750 000 ; crédit 1012 71 250 000 (45 000 000 + 26 250 000) ; puis débit 4613 45 000 000 / crédit 4611 45 000 000. Réalisation : débit 2231 (terrain bâti) ou comptes de terrain et de bâtiment ventilés selon le rapport 45 000 000 / crédit 4613 45 000 000 ; débit 521 26 250 000 / crédit 4613 26 250 000 ; virement débit 1012 / crédit 1013 71 250 000." },
      { num: 5, enonce: "Que doit constater et décider l'assemblée, et quand les fonds deviennent-ils disponibles ?", correction: "Elle constate la souscription intégrale et la libération conforme aux articles 388 et 389, adopte les statuts, nomme les premiers administrateurs ou l'administrateur général et le premier commissaire aux comptes, statue sur les actes de la période de formation et peut donner mandat pour les engagements avant immatriculation (art. 410). Les fonds du compte spécial ne peuvent être retirés qu'après l'immatriculation, par le PDG, le DG ou l'administrateur général, sur présentation du certificat d'immatriculation (art. 398)." },
    ],
  },
  {
    id: 'cas6',
    titre: "KWANGO NÉGOCE SA : un dossier de constitution suspect",
    contexte: "Mission d'audit d'ouverture chez KWANGO NÉGOCE SA (capital 60 000 000 FC, 6 000 actions de 10 000, libérées du quart). Constats : (a) la déclaration notariée atteste un versement de 15 000 000, mais le relevé du compte spécial n'a reçu que 11 000 000 ; le solde du 4613 est de 4 000 000 depuis la constitution, il y a deux ans ; (b) 3 000 000 ont été prélevés sur le compte spécial la veille de l'immatriculation pour payer un acompte sur un véhicule ; (c) un fondateur a cédé 800 actions à un tiers trois mois après la constitution, avant tout second appel ; (d) le matériel apporté a été inscrit pour 20 000 000 alors que le rapport du commissaire aux apports retenait 14 000 000, sans vote unanime ni consentement mentionné.",
    questions: [
      { num: 1, enonce: "Analysez le constat (a). Quelles conséquences comptables et juridiques ?", correction: "Seuls 11 000 000 ont été encaissés : le capital n'est libéré qu'à hauteur de ce montant (art. 42), et le 4613 de 4 000 000 est une créance réelle sur des souscripteurs qui n'ont pas versé. Le virement de 15 000 000 au 1013 est donc erroné pour 4 000 000, qui doivent rester au 1012. Sur le plan juridique, affirmer versés des fonds qui ne l'ont pas été dans la déclaration notariée relève de l'article 887, 1° ; la société doit par ailleurs réclamer les sommes dues, avec l'intérêt légal de plein droit (art. 43), et au besoin engager la procédure des articles 775 à 777." },
      { num: 2, enonce: "Analysez le constat (b).", correction: "Le retrait des fonds ne peut avoir lieu qu'après l'immatriculation, par le PDG, le DG ou l'administrateur général, sur présentation du certificat d'immatriculation (art. 398). Le prélèvement de la veille est irrégulier. Comptablement, la société n'existait pas encore : l'acompte n'est à la charge de la société que si l'engagement d'achat a été repris selon les articles 106 à 113 ; à défaut, il s'agit d'une créance sur la personne qui a disposé des fonds (4711 Débiteurs divers ou compte courant de l'intéressé)." },
      { num: 3, enonce: "Analysez le constat (c).", correction: "Les 800 actions n'étaient libérées que du quart : leur négociation, si elle a été faite sciemment, entre dans les prévisions de l'article 888, 1°, qui vise la négociation d'actions non entièrement libérées. Civilement, le fondateur cédant reste tenu solidairement avec le cessionnaire du montant non libéré (art. 777). Comptablement, la société met à jour ses sous-comptes par apporteur et son registre des actions nominatives, les actions non libérées devant rester nominatives (art. 389)." },
      { num: 4, enonce: "Analysez le constat (d).", correction: "La valeur retenue (20 000 000) diffère de celle du commissaire (14 000 000). La loi ne l'interdit pas, mais actionnaires et administrateurs sont alors solidairement responsables envers les tiers, pendant cinq ans, de la valeur attribuée (art. 403 et 409) ; si la surévaluation est frauduleuse, l'article 887, 4° est en cause. Comptablement, le matériel est inscrit à sa valeur d'apport statutaire, mais l'auditeur doit tester sa valeur actuelle : si elle est inférieure à la valeur nette comptable, une dépréciation s'impose dès la clôture." },
      { num: 5, enonce: "Quelle conclusion l'auditeur tire-t-il pour la RDC quant aux sanctions pénales ?", correction: "Les faits relèvent des infractions définies par l'AUSCGIE (art. 887, 888), mais selon les sources consultées, la RDC n'a pas adopté de loi fixant les peines ; la proposition de loi déclarée recevable le 13 mai 2021 n'a pas été adoptée, et les décisions de Lubumbashi sont divergentes. L'auditeur ne se prononce pas sur la peine : il décrit les irrégularités, en tire les corrections comptables, signale les faits dans son rapport et laisse aux autorités compétentes l'appréciation pénale. Les nullités et responsabilités civiles restent pleinement applicables." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 2,
  id: 'ue3-chapitre-2',
  titre: "La constitution selon la forme sociale : SARL, SA, SAS et incidents de libération",
  sousTitre: "AUSCGIE révisé, art. 309-316 (SARL), 385-413 (SA), 774-777 (défaut de libération), 853-1 à 853-5 (SAS), 886-888 (infractions) · arrêté congolais du 30 décembre 2014",
  infoBulle: "Les règles de constitution propres à chaque forme et leurs écritures : capital et libération de la SARL (moitié, deux ans, capital libre en RDC) et de la SA (quart, trois ans), commissaire aux apports, dépôt et indisponibilité des fonds, bordereau acquitté en RDC, assemblée constitutive, SAS et sociétés unipersonnelles, actionnaire défaillant (compte 4617), nullités, responsabilités et infractions de la constitution.",
  loiRef: "Art. 309-316, 385-413, 558, 774-777, 853-1 à 853-5, 886-888 AUSCGIE · arrêté du 30 décembre 2014, art. 1-3 · SYSCOHADA, App. 58-59",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Connaître le capital minimum et le régime de libération de la SARL (art. 311, 311-1 ; arrêté de 2014) et de la SA (art. 387-389)",
    "Maîtriser le contrôle des apports en nature : seuil de 5 000 000 FCFA en SARL (art. 312), contrôle sans seuil en SA (art. 400-403)",
    "Suivre le circuit des fonds et ses pièces : dépôt, bordereau ou déclaration notariée, indisponibilité, retrait (art. 313-314, 393-398)",
    "Comprendre les votes de l'assemblée générale constitutive et calculer un quorum en présence d'un apporteur (art. 404-413)",
    "Comptabiliser la constitution d'une SARL libérée de moitié et d'une SA libérée du quart",
    "Situer la SAS et les sociétés unipersonnelles par rapport à la SA (art. 853-1 à 853-5, 558)",
    "Traiter la défaillance d'un actionnaire, juridiquement et comptablement (art. 774-777, compte 4617)",
    "Identifier les nullités, responsabilités et infractions de la constitution, et leur état en droit congolais (art. 315-316, 412-413, 886-888)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "SARL : capital minimum d'un million de FCFA sauf dispositions nationales contraires (art. 311) ; en RDC, capital librement fixé en tenant compte de l'objet social (arrêté du 30 décembre 2014, art. 2). Numéraire libéré de moitié, surplus dans les deux ans ; nature intégralement libérée (art. 311-1).",
    "SARL : commissaire aux apports au-delà de 5 000 000 FCFA et toujours pour les avantages particuliers ; à défaut ou en cas d'écart, responsabilité solidaire des associés pendant cinq ans (art. 312). En RDC, statuts notariés ou sous seing privé, et bordereau de versement acquitté comme preuve de la libération et du dépôt (arrêté, art. 1 et 3).",
    "Fonds indisponibles jusqu'à l'immatriculation ; restitution possible après six mois sans immatriculation (art. 314, 398). Tous les associés doivent intervenir à l'acte de SARL, à peine de nullité (art. 315).",
    "SA : capital minimum 10 000 000 FCFA (art. 387), souscription intégrale avant les statuts (art. 388), numéraire libéré du quart, surplus dans les trois ans (de l'immatriculation selon l'art. 389, de la souscription selon l'art. 774 : discordance du texte officiel).",
    "Tant que le capital de la SA n'est pas entièrement libéré : actions nominatives, pas d'augmentation de capital sauf en nature, pas d'obligations (art. 389) ; la négociation d'actions non libérées est une infraction (art. 888).",
    "SA : dépôt sous huit jours sur compte spécial, déclaration notariée, statuts signés après le certificat du dépositaire, retrait après immatriculation (art. 393-398) ; les fonds chez le notaire transitent par le compte 4732.",
    "SA : commissaire aux apports sans seuil (art. 400) ; assemblée constitutive : quorum moitié puis quart, majorité des deux tiers, vote spécial sans l'apporteur, réduction de valeur à l'unanimité avec consentement de l'apporteur (art. 405-409).",
    "La SAS suit les règles de la SA compatibles, sauf notamment le capital minimum (art. 853-3) ; son capital est fixé par les statuts (art. 853-5).",
    "Défaillance : mise en demeure, vente forcée un mois après, suspension du vote, du dividende et du droit préférentiel ; solidarité des titulaires successifs (art. 775-777). En comptabilité : 4613 vers 4617, encaissement de la vente, frais et intérêts au débit du 4617, reversement du solde ; le capital n'est pas mouvementé.",
    "Infractions de la constitution (art. 886-888) : émission prématurée d'actions, souscriptions ou versements fictifs, surévaluation frauduleuse d'apports, négociation d'actions non libérées. En RDC, les peines n'ont pas été fixées par la loi selon les sources consultées ; une proposition de loi recevable en 2021 n'a pas été adoptée.",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)", precision: "30 janvier 2014 ; art. 42, 43, 58, 309-316, 385-413, 558, 774-777, 824, 853-1 à 853-5, 886-888 et 906" },
    { genre: 'texte', intitule: "Arrêté interministériel n° 002/CAB/MIN/JGS&DH/014 et n° 243/CAB/MIN/FINANCES/2014 du 30 décembre 2014 déterminant la forme des statuts et le capital social de la société à responsabilité limitée", precision: "art. 1 à 3" },
    { genre: 'texte', intitule: "Décret n° 14/014 du 8 mai 2014 portant création, organisation et fonctionnement du Guichet unique de création d'entreprise", precision: "art. 18" },
    { genre: 'texte', intitule: "Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF)", precision: "art. 17 et 36 ; Titre VII, compte 101 (éléments de contrôle) ; Note annexe 13" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, Guide d'application et plan de comptes", precision: "Applications 58 et 59 ; comptes 109, 1011-1013, 4611-4617, 4732, 6324, 6325, 7713" },
    { genre: 'article', auteur: "Actualite.cd", titre: "Assemblée nationale : la proposition de loi modifiant et complétant le code pénal déclarée recevable et envoyée à la commission PAJ", support: "actualite.cd", precision: "14 mai 2021" },
    { genre: 'article', auteur: "Makungu Mwewa G., Mwila Sashi T. et Masangu Ngandu Y.", titre: "Répression des crimes économiques en droit OHADA : cas de la RDC", support: "Village de la Justice", precision: "23 août 2022" },
    { genre: 'ouvrage', auteur: "Mapapa Mbangala A., Nkoy Mbangala C. et Mensah Freitas C.", titre: "Comptabilité des sociétés OHADA", editeur: "Droit Afrique", lieu: "s.l.", annee: "2026" },
    { genre: 'ouvrage', auteur: "Nzoimbengene Luyindula B. D.", titre: "Comptabilité des sociétés suivant le système comptable OHADA révisé", editeur: "2e éd., à compte d'auteur", lieu: "s.l.", annee: "2025" },
    { genre: 'ouvrage', auteur: "Dobill M.", titre: "Comptabilité OHADA, tome 3 : comptabilité des sociétés", editeur: "Karthala", lieu: "Paris", annee: "2013" },
    { genre: 'ouvrage', auteur: "Anoukaha F., Cissé A., Diouf N., Nguebou Toukam J., Pougoué P.-G. et Samb M.", titre: "OHADA. Sociétés commerciales et GIE", editeur: "Bruylant, coll. Droit uniforme africain", lieu: "Bruxelles", annee: "2002" },
    { genre: 'ouvrage', auteur: "Diouf N., Masamba Makela R., Pougoué P.-G. et Sawadogo F. M. (coord.)", titre: "Code vert OHADA 2025. Traité et actes uniformes commentés et annotés", editeur: "Juriscope", lieu: "Poitiers", annee: "2025" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE révisé du 30 janvier 2014 · arrêté interministériel du 30 décembre 2014 · décret n° 14/014 du 8 mai 2014 · AUDCIF et SYSCOHADA révisé · Actualite.cd (2021) · Village de la Justice (2022).",
}

export default chapitre
