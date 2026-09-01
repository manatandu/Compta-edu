// Chapitre 10 du module UE2, Droit des sociétés : contenu pur.
// Migré depuis l'ancienne page dédiée UE2Chapitre10Page.tsx vers le moteur
// commun components/chapitre/ChapitreManuscrit.tsx, avec vérification
// article par article sur le texte de l'AUSCGIE révisé (Livre 7,
// art. 200-241, et Livre 8, art. 242-256 - lus en intégralité).
// L'ancienne page était globalement fidèle au texte ; corrections de
// détail : la qualification de « clause essentielle » des statuts
// appartient à la juridiction compétente (art. 243-244), la liste
// exacte des nullités de la liquidation est celle de l'art. 215-1
// (art. 206, 211 al. 1, 213, 214 et 215), et l'articulation avec
// l'AUPCAP est explicitée (art. 203 al. 2). Enrichissements sur la
// régularisation des nullités (art. 246-250), la tierce opposition
// (art. 252), la nullité des fusions (art. 254) et les obligations
// périodiques du liquidateur (art. 232-236).
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch10-q1', question: "Selon l'Art. 200 AUSCGIE, combien de causes légales peuvent entraîner la fin d'une société ?",
    options: [
      { id: 'a', texte: '4 causes' },
      { id: 'b', texte: '5 causes' },
      { id: 'c', texte: '7 causes' },
      { id: 'd', texte: '10 causes' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 200 AUSCGIE',
    explication: "L'Art. 200 AUSCGIE énumère 7 causes : expiration du temps pour lequel la société a été constituée, réalisation ou extinction de l'objet, annulation du contrat de société, décision des associés aux conditions prévues pour modifier les statuts, dissolution anticipée prononcée par la juridiction compétente pour justes motifs, effet d'un jugement ordonnant la liquidation des biens, et toute autre cause prévue par les statuts.",
  },
  {
    id: 'ch10-q2', question: "La dissolution d'une société a effet à l'égard des tiers :",
    options: [
      { id: 'a', texte: 'Le jour de la décision de dissolution' },
      { id: 'b', texte: "À compter de sa publication dans un journal d'annonces légales" },
      { id: 'c', texte: 'À compter du dépôt au RCCM' },
      { id: 'd', texte: 'Immédiatement, sans formalité' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 201 AUSCGIE',
    explication: "L'Art. 201 al. 1 AUSCGIE précise que la dissolution n'a d'effet à l'égard des tiers qu'à compter de sa publication par avis inséré dans un journal habilité à recevoir les annonces légales dans l'État partie du siège social.",
  },
  {
    id: 'ch10-q3', question: "Lors de la dissolution d'une société, la personnalité morale :",
    options: [
      { id: 'a', texte: 'Disparaît immédiatement' },
      { id: 'b', texte: "Subsiste pour les besoins de la liquidation, jusqu'à la publication de la clôture" },
      { id: 'c', texte: 'Est suspendue pendant 6 mois' },
      { id: 'd', texte: 'Est transférée aux liquidateurs' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 205 AUSCGIE',
    explication: "L'Art. 205 AUSCGIE dispose que la personnalité morale de la société subsiste pour les besoins de la liquidation et jusqu'à la publication de la clôture de celle-ci. La société conserve donc sa capacité pendant toute cette période.",
  },
  {
    id: 'ch10-q4', question: "Dans une SARL, comment est nommé le liquidateur lors d'une liquidation décidée par les associés ?",
    options: [
      { id: 'a', texte: "À l'unanimité des associés" },
      { id: 'b', texte: 'À la majorité en capital des associés' },
      { id: 'c', texte: "Aux conditions de l'AGE" },
      { id: 'd', texte: 'Par le tribunal uniquement' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 206 AUSCGIE',
    explication: "L'Art. 206, 3° AUSCGIE : dans les SARL, le liquidateur est nommé à la majorité en capital des associés. Dans les SNC, l'unanimité est requise ; dans les SCS, l'unanimité des commandités et la majorité en capital des commanditaires ; dans les sociétés par actions, les conditions de quorum et de majorité des AGE.",
  },
  {
    id: 'ch10-q5', question: 'Le liquidateur peut-il continuer les affaires en cours sans autorisation judiciaire ?',
    options: [
      { id: 'a', texte: 'Oui, toujours, dans le cadre de la liquidation' },
      { id: 'b', texte: "Non : il ne peut continuer les affaires en cours ou en engager de nouvelles que s'il y a été autorisé par décision de justice" },
      { id: 'c', texte: "Oui, si les associés l'ont autorisé dans l'acte de nomination" },
      { id: 'd', texte: 'Non, le liquidateur ne peut jamais continuer des affaires' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 231 AUSCGIE',
    explication: "L'Art. 231 AUSCGIE habilite le liquidateur à payer les créanciers et à répartir entre les associés le solde disponible. Mais il ne peut continuer les affaires en cours ou en engager de nouvelles, pour les besoins de la liquidation, que s'il y a été autorisé par décision de justice.",
  },
  {
    id: 'ch10-q6', question: "La cession de l'actif de la société en liquidation au liquidateur lui-même est :",
    options: [
      { id: 'a', texte: "Autorisée avec l'accord de l'assemblée générale" },
      { id: 'b', texte: 'Interdite' },
      { id: 'c', texte: "Autorisée avec l'accord des 2/3 des associés" },
      { id: 'd', texte: "Autorisée avec l'accord du tribunal" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 214 AUSCGIE',
    explication: "L'Art. 214 AUSCGIE interdit la cession de tout ou partie de l'actif de la société en liquidation au liquidateur, à ses employés ou à leurs conjoints, ascendants ou descendants. L'interdiction est absolue - aucune autorisation ne peut la lever - et les opérations contraires sont nulles (Art. 215-1).",
  },
  {
    id: 'ch10-q7', question: 'Dans quel délai la clôture de la liquidation doit-elle intervenir après la dissolution ?',
    options: [
      { id: 'a', texte: '1 an' },
      { id: 'b', texte: '2 ans' },
      { id: 'c', texte: '3 ans' },
      { id: 'd', texte: '5 ans' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 216 AUSCGIE',
    explication: "L'Art. 216 AUSCGIE impose que la clôture de la liquidation intervienne dans un délai de trois (3) ans à compter de la dissolution. À défaut, le ministère public ou tout intéressé peut saisir la juridiction compétente du siège afin qu'il soit procédé à la liquidation ou à son achèvement.",
  },
  {
    id: 'ch10-q8', question: 'Après la clôture de la liquidation, dans quel délai le liquidateur doit-il demander la radiation au RCCM ?',
    options: [
      { id: 'a', texte: '15 jours' },
      { id: 'b', texte: '1 mois à compter de la publication de la clôture' },
      { id: 'c', texte: '3 mois' },
      { id: 'd', texte: '6 mois' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 220 AUSCGIE',
    explication: "L'Art. 220 AUSCGIE : sur justification de l'accomplissement des formalités de dépôt des comptes définitifs au RCCM (Art. 219), le liquidateur demande la radiation de la société au RCCM dans le délai d'un (1) mois à compter de la publication de la clôture de la liquidation.",
  },
  {
    id: 'ch10-q9', question: 'Le boni de liquidation (après remboursement du nominal) est réparti entre les associés :',
    options: [
      { id: 'a', texte: 'À parts égales entre tous les associés' },
      { id: 'b', texte: 'En proportion de leur participation au capital, sauf clause contraire des statuts' },
      { id: 'c', texte: 'Uniquement aux associés fondateurs' },
      { id: 'd', texte: 'Selon décision du liquidateur' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 237 AUSCGIE',
    explication: "L'Art. 237 AUSCGIE : sauf clause contraire des statuts, le partage des capitaux propres subsistant après remboursement du nominal des actions ou parts sociales est effectué entre les associés dans les mêmes proportions que leur participation au capital social.",
  },
  {
    id: 'ch10-q10', question: "L'action en responsabilité contre le liquidateur se prescrit par :",
    options: [
      { id: 'a', texte: '1 an' },
      { id: 'b', texte: '2 ans' },
      { id: 'c', texte: '3 ans à compter du fait dommageable ou de sa révélation' },
      { id: 'd', texte: '5 ans' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 221 AUSCGIE',
    explication: "L'Art. 221 AUSCGIE : le liquidateur est responsable, envers la société comme envers les tiers, des conséquences dommageables de ses fautes. L'action sociale ou individuelle se prescrit par trois (3) ans à compter du fait dommageable ou, s'il a été dissimulé, de sa révélation - et par dix (10) ans lorsque le fait est qualifié crime.",
  },
  {
    id: 'ch10-q11', question: 'Toute action contre les associés non liquidateurs après dissolution se prescrit par :',
    options: [
      { id: 'a', texte: '3 ans à compter de la dissolution' },
      { id: 'b', texte: '5 ans à compter de la publication de la dissolution au RCCM' },
      { id: 'c', texte: '10 ans à compter de la clôture de la liquidation' },
      { id: 'd', texte: '1 an à compter du partage du boni' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 222 AUSCGIE',
    explication: "L'Art. 222 AUSCGIE : toute action contre les associés non liquidateurs ou leurs conjoints survivants, héritiers ou ayants-cause se prescrit par cinq (5) ans à compter de la publication de la dissolution de la société au RCCM.",
  },
  {
    id: 'ch10-q12', question: 'La mention obligatoire sur les actes pendant la liquidation est :',
    options: [
      { id: 'a', texte: '« société dissoute »' },
      { id: 'b', texte: '« société en liquidation », avec le nom du ou des liquidateurs' },
      { id: 'c', texte: '« société en faillite »' },
      { id: 'd', texte: "« société en cessation d'activité »" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 204 AUSCGIE',
    explication: "L'Art. 204 AUSCGIE : la société est en liquidation dès l'instant de sa dissolution, et la mention « société en liquidation » ainsi que le nom du ou des liquidateurs doivent figurer sur tous les actes et documents émanant de la société et destinés aux tiers - lettres, factures, annonces et publications diverses.",
  },
  {
    id: 'ch10-q13', question: "La dissolution d'une société met-elle fin aux fonctions du commissaire aux comptes ?",
    options: [
      { id: 'a', texte: 'Oui, immédiatement' },
      { id: 'b', texte: 'Non, ses fonctions subsistent' },
      { id: 'c', texte: 'Oui, sauf accord des associés' },
      { id: 'd', texte: 'Oui, mais il reste 6 mois pour rendre ses comptes' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 225 AUSCGIE',
    explication: "L'Art. 225 AUSCGIE dispose expressément que la dissolution de la société ne met pas fin aux fonctions du commissaire aux comptes - à la différence de la transformation, où le maintien dépend de la nouvelle forme (Art. 187).",
  },
  {
    id: 'ch10-q14', question: "La nullité d'une société entraîne :",
    options: [
      { id: 'a', texte: 'Sa dissolution avec effet rétroactif' },
      { id: 'b', texte: 'Sa dissolution sans rétroactivité, suivie de sa liquidation' },
      { id: 'c', texte: 'La responsabilité pénale automatique des fondateurs' },
      { id: 'd', texte: 'Le remboursement immédiat de tous les apports' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 253 AUSCGIE',
    explication: "L'Art. 253 AUSCGIE : lorsque la nullité de la société est prononcée, elle met fin, SANS rétroactivité, à l'exécution du contrat. Il est procédé à sa dissolution et, pour les sociétés pluripersonnelles, à leur liquidation. Le passé social n'est pas anéanti - protection des tiers et des associés.",
  },
  {
    id: 'ch10-q15', question: "L'action en nullité d'une fusion ou d'une scission se prescrit par :",
    options: [
      { id: 'a', texte: '3 ans' },
      { id: 'b', texte: '6 mois à compter de la dernière inscription au RCCM rendue nécessaire par l\'opération' },
      { id: 'c', texte: '1 an à compter de la fusion' },
      { id: 'd', texte: "2 ans à compter de l'AG d'approbation" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 251 AUSCGIE',
    explication: "L'Art. 251 al. 3 AUSCGIE prévoit un délai spécial : l'action en nullité d'une fusion ou d'une scission se prescrit par six (6) mois à compter de la date de la dernière inscription au RCCM rendue nécessaire par l'opération - contre trois (3) ans pour la nullité de la société ou des actes et délibérations.",
  },
  {
    id: 'ch10-q16', question: "Dans une SARL en liquidation, la cession globale de l'actif requiert :",
    options: [
      { id: 'a', texte: "L'unanimité des associés" },
      { id: 'b', texte: 'La majorité exigée pour la modification des statuts' },
      { id: 'c', texte: 'La majorité en capital' },
      { id: 'd', texte: 'Une décision judiciaire' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 215 AUSCGIE',
    explication: "L'Art. 215, 3° AUSCGIE : dans les SARL, la cession globale de l'actif ou son apport à une autre société - notamment par voie de fusion - est autorisée à la majorité exigée pour la modification des statuts. SNC : unanimité ; SCS : unanimité des commandités et majorité en capital des commanditaires ; sociétés par actions : conditions des AGE. Les opérations contraires sont nulles (Art. 215-1).",
  },
  {
    id: 'ch10-q17', question: "Dans quelle situation la dissolution d'une société n'entraîne-t-elle PAS de liquidation ?",
    options: [
      { id: 'a', texte: 'Lorsque les associés y renoncent' },
      { id: 'b', texte: 'Lorsque tous les titres sont détenus par un seul associé personne morale' },
      { id: 'c', texte: 'Lorsque la société est déficitaire' },
      { id: 'd', texte: 'Lorsque le liquidateur désigné y renonce' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 201 AUSCGIE',
    explication: "L'Art. 201 al. 4 AUSCGIE : la dissolution d'une société dont tous les titres sont détenus par un seul associé entraîne la transmission universelle du patrimoine à cet associé, sans liquidation - les créanciers pouvant faire opposition dans les trente (30) jours de la publication. L'al. 5 exclut ce mécanisme lorsque l'associé unique est une personne physique : la dissolution entraîne alors de plein droit la mise en liquidation.",
  },
  {
    id: 'ch10-q18', question: 'Lors d\'une liquidation ordonnée par décision de justice, les pouvoirs des dirigeants sociaux prennent fin :',
    options: [
      { id: 'a', texte: '30 jours après la décision de justice' },
      { id: 'b', texte: 'À dater de la décision de justice qui ordonne la liquidation' },
      { id: 'c', texte: 'À la date de nomination du liquidateur' },
      { id: 'd', texte: 'À la clôture de la liquidation' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 224 AUSCGIE',
    explication: "L'Art. 224 AUSCGIE : les pouvoirs du conseil d'administration ou des dirigeants sociaux prennent fin à dater de la décision de justice qui ordonne la liquidation de la société. Le liquidateur se substitue à eux pour tous les actes de la liquidation (Art. 230).",
  },
  {
    id: 'ch10-q19', question: "L'action en nullité d'une société se prescrit par :",
    options: [
      { id: 'a', texte: '1 an à compter de la constitution' },
      { id: 'b', texte: "3 ans à compter de l'immatriculation, sauf illicéité de l'objet social" },
      { id: 'c', texte: '5 ans à compter de la première AG' },
      { id: 'd', texte: '10 ans en cas de fraude' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 251 AUSCGIE',
    explication: "L'Art. 251 al. 1 AUSCGIE : les actions en nullité de la société se prescrivent par trois (3) ans à compter de l'immatriculation ou de la publication de l'acte modifiant les statuts - sauf si la nullité est fondée sur l'illicéité de l'objet social, qui reste imprescriptible, et sous réserve de la forclusion de six mois de l'Art. 248.",
  },
  {
    id: 'ch10-q20', question: "Les sommes attribuées à des créanciers ou associés qui n'ont pu leur être versées sont déposées sur un compte séquestre auprès du Trésor public :",
    options: [
      { id: 'a', texte: '6 mois après la clôture' },
      { id: 'b', texte: "À l'expiration d'un délai d'un an à compter de la clôture de la liquidation" },
      { id: 'c', texte: '3 ans après la dissolution' },
      { id: 'd', texte: 'Immédiatement après la décision de répartition' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 240 AUSCGIE',
    explication: "L'Art. 240 AUSCGIE : si les sommes attribuées à des créanciers ou à des associés n'ont pu leur être versées, elles sont déposées, à l'expiration du délai d'un (1) an à compter de la clôture de la liquidation, sur un compte séquestre ouvert auprès du Trésor public. En amont, les sommes affectées aux répartitions sont déposées sous quinze (15) jours sur un compte bancaire ouvert au nom de la société en liquidation (Art. 239).",
  },
  {
    id: 'ch10-n1', question: "La cession d'un actif de la société en liquidation à son ancien directeur général est :",
    options: [
      { id: 'a', texte: 'Interdite dans tous les cas' },
      { id: 'b', texte: "Possible avec l'autorisation de la juridiction compétente (liquidateur et CAC entendus), sauf consentement unanime des associés" },
      { id: 'c', texte: 'Libre, comme toute vente' },
      { id: 'd', texte: "Possible avec l'accord du seul liquidateur" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 213 AUSCGIE',
    explication: "L'Art. 213 AUSCGIE distingue cette hypothèse de l'interdiction absolue de l'Art. 214 : la cession de tout ou partie de l'actif à une personne ayant eu dans la société la qualité d'associé en nom, de commandité, de gérant, d'administrateur, d'administrateur général, de directeur général ou autre dirigeant social ou de commissaire aux comptes ne peut avoir lieu qu'avec l'autorisation de la juridiction compétente, le liquidateur et le commissaire aux comptes entendus - sauf consentement unanime des associés. Les opérations contraires sont nulles (Art. 215-1).",
  },
  {
    id: 'ch10-n2', question: 'Quelle est la durée maximale du mandat du liquidateur désigné par décision de justice ?',
    options: [
      { id: 'a', texte: '1 an, non renouvelable' },
      { id: 'b', texte: '3 ans, renouvelables par décision de justice à la requête du liquidateur' },
      { id: 'c', texte: '5 ans' },
      { id: 'd', texte: 'Illimitée' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 227 AUSCGIE',
    explication: "L'Art. 227 AUSCGIE : la durée du mandat du liquidateur ne peut excéder trois (3) ans, renouvelables par décision de justice à sa requête. Dans sa demande de renouvellement, il doit indiquer les raisons pour lesquelles la liquidation n'a pu être clôturée, les mesures qu'il envisage et les délais nécessaires à l'achèvement.",
  },
  {
    id: 'ch10-n3', question: "Dans une SARL ou une société par actions, la nullité de la société peut-elle résulter du vice de consentement d'un associé ?",
    options: [
      { id: 'a', texte: 'Oui, comme dans toute société' },
      { id: 'b', texte: "Non, sauf si le vice ou l'incapacité atteint tous les associés fondateurs" },
      { id: 'c', texte: 'Oui, si l\'associé détient plus de 10% du capital' },
      { id: 'd', texte: 'Non, jamais, en aucune circonstance' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 242 AUSCGIE',
    explication: "L'Art. 242 al. 3 AUSCGIE : dans les SARL et les sociétés par actions, la nullité de la société ne peut résulter ni d'un vice de consentement ni de l'incapacité d'un associé, à moins que celle-ci n'atteigne tous les associés fondateurs. La stabilité de ces sociétés de capitaux l'emporte sur le vice individuel - l'associé victime conserve ses recours personnels.",
  },
  {
    id: 'ch10-n4', question: 'La juridiction saisie d\'une action en nullité peut-elle statuer immédiatement ?',
    options: [
      { id: 'a', texte: 'Oui, dès la première audience' },
      { id: 'b', texte: "Non : elle ne peut prononcer la nullité moins de 2 mois après l'exploit introductif d'instance, et peut fixer un délai pour couvrir la nullité" },
      { id: 'c', texte: 'Oui, si le demandeur le requiert' },
      { id: 'd', texte: 'Non, elle doit attendre 1 an' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 247 AUSCGIE',
    explication: "L'Art. 247 AUSCGIE organise la faveur à la régularisation : la juridiction peut, même d'office, fixer un délai pour permettre de couvrir la nullité, et elle ne peut pas la prononcer moins de deux (2) mois après la date de l'exploit introductif d'instance. Si une assemblée doit être convoquée pour couvrir la nullité, elle accorde le délai nécessaire. Et l'action est éteinte si la cause de nullité a cessé d'exister le jour où elle statue sur le fond en première instance - sauf illicéité de l'objet social (Art. 246).",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '10.1',
    titre: 'Les causes et les effets de la dissolution (Art. 200-202)',
    navLabel: '10.1 La dissolution',
    blocs: [
      { type: 'carte', titre: 'Les 7 causes de dissolution (Art. 200)', liste: [
        "**1°** L'expiration du temps pour lequel la société a été constituée - la prorogation devant être décidée avant le terme.",
        "**2°** La réalisation ou l'extinction de son objet.",
        "**3°** L'annulation du contrat de société (renvoi au régime des nullités, Art. 242 s.).",
        "**4°** La décision des associés, prise aux conditions prévues pour modifier les statuts.",
        "**5°** La dissolution anticipée prononcée par la juridiction compétente à la demande d'un associé **pour justes motifs** - notamment l'inexécution de ses obligations par un associé ou la **mésentente entre associés empêchant le fonctionnement normal** de la société.",
        "**6°** L'effet d'un jugement ordonnant la **liquidation des biens** de la société (AUPCAP).",
        "**7°** Toute autre cause prévue par les statuts.",
      ] },
      { type: 'paragraphe', texte: "**Effets (Art. 201).** La dissolution n'a d'effet à l'égard des tiers qu'à compter de sa **publication** par avis dans un journal d'annonces légales de l'État partie du siège. La dissolution de la société **pluripersonnelle** entraîne de plein droit sa **mise en liquidation**, la personnalité morale subsistant pour les besoins de la liquidation jusqu'à la clôture. La publicité complète comprend l'avis dans un journal d'annonces légales, le dépôt au RCCM des actes ou procès-verbaux décidant ou constatant la dissolution, et la modification de l'inscription au RCCM (Art. 202)." },
      { type: 'filet', titre: "L'exception de l'associé unique personne morale (Art. 201 al. 4-5)", texte: "La dissolution d'une société dont tous les titres sont détenus par un **seul associé** entraîne la **transmission universelle du patrimoine** à cet associé, **sans liquidation**. Garde-fou : les créanciers peuvent faire **opposition** devant la juridiction compétente dans les **trente (30) jours** de la publication ; la juridiction rejette l'opposition ou ordonne le remboursement des créances ou la constitution de garanties jugées suffisantes - et la transmission n'est réalisée qu'à l'issue du délai d'opposition ou après son dénouement. Ce mécanisme est **écarté lorsque l'associé unique est une personne physique** : la dissolution entraîne alors de plein droit la mise en liquidation." },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[16] },
    ],
  },
  {
    numero: '10.2',
    titre: 'Le liquidateur : nomination, pouvoirs et cessions encadrées (Art. 203-215-1)',
    navLabel: '10.2 Le liquidateur',
    blocs: [
      { type: 'paragraphe', texte: "Le régime général (Art. 203 s.) s'applique à toute liquidation de société commerciale, qu'elle soit organisée **à l'amiable** - conformément aux statuts ou à l'accord des associés - ou **ordonnée par décision de justice**. Il ne s'applique **pas** lorsque la liquidation intervient dans le cadre de l'**AUPCAP** (liquidation des biens, chapitre 9) : les deux régimes ne se cumulent jamais. La société est en liquidation **dès l'instant de sa dissolution**, et la mention **« société en liquidation »** avec le nom du ou des liquidateurs doit figurer sur tous les actes et documents destinés aux tiers - lettres, factures, annonces, publications (Art. 204)." },
      { type: 'carte', titre: 'Nomination du liquidateur par les associés (Art. 206-212)', tableau: { entetes: ['Forme sociale', 'Majorité requise'], lignes: [
        ['SNC', 'Unanimité des associés'],
        ['SCS', 'Unanimité des commandités et majorité en capital des commanditaires'],
        ['SARL', 'Majorité en capital des associés'],
        ['Sociétés par actions', "Conditions de quorum et de majorité des assemblées générales extraordinaires"],
      ] }, note: "Le liquidateur peut être un associé ou un tiers, et même une personne morale (Art. 207). Si les associés n'ont pu le nommer, il est désigné par décision de justice à la demande de tout intéressé (Art. 208). Plusieurs liquidateurs peuvent agir séparément mais présentent un rapport commun (Art. 209). Sa rémunération est fixée par la décision qui le nomme (Art. 210) ; il est révoqué selon les formes de sa nomination, tout associé pouvant demander en justice sa révocation pour motifs légitimes (Art. 211). Sa nomination et sa révocation ne sont opposables aux tiers qu'à compter de leur publication (Art. 212)." },
      { type: 'carte', titre: "Les cessions d'actif sous surveillance (Art. 213-215-1)", tableau: { entetes: ['Cessionnaire', 'Régime', 'Article'], lignes: [
        ["Liquidateur, ses employés, leurs conjoints, ascendants ou descendants", '**Interdiction absolue** - aucune autorisation possible', 'Art. 214'],
        ["Ancien associé en nom, commandité, gérant, administrateur, administrateur général, directeur général, autre dirigeant ou commissaire aux comptes", "**Autorisation de la juridiction compétente**, le liquidateur et le CAC entendus - sauf consentement unanime des associés", 'Art. 213'],
        ["Cession globale de l'actif ou apport à une autre société (fusion)", 'SNC : unanimité · SCS : unanimité des commandités + majorité en capital des commanditaires · SARL : majorité de modification des statuts · sociétés par actions : conditions des AGE', 'Art. 215'],
      ] }, note: "Les délibérations et opérations prises ou réalisées en violation des Art. 206, 211 al. 1, 213, 214 et 215 sont **nulles** (Art. 215-1)." },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[20] },
    ],
  },
  {
    numero: '10.3',
    titre: 'Clôture de la liquidation, radiation et prescriptions (Art. 216-222)',
    navLabel: '10.3 La clôture',
    blocs: [
      { type: 'paragraphe', texte: "La clôture de la liquidation doit intervenir dans un délai de **trois (3) ans** à compter de la dissolution ; à défaut, le **ministère public ou tout intéressé** peut saisir la juridiction compétente du siège afin qu'il soit procédé à la liquidation ou à son achèvement (Art. 216). En fin de liquidation, les associés sont convoqués pour statuer sur les **comptes définitifs**, sur le **quitus** de la gestion du liquidateur et la décharge de son mandat, et pour **constater la clôture** (Art. 217) ; à défaut de convocation, tout associé peut faire désigner un mandataire ad hoc chargé d'y procéder. Si l'assemblée de clôture ne peut délibérer ou refuse d'approuver les comptes, la **juridiction compétente statue** sur ces comptes et, le cas échéant, sur la clôture, en lieu et place de l'assemblée (Art. 218)." },
      { type: 'carte', titre: 'Les formalités finales', liste: [
        "**Dépôt des comptes définitifs au RCCM** de l'État partie du siège, accompagnés de la décision de l'assemblée (comptes, quitus, décharge) ou, à défaut, de la décision de justice qui en tient lieu (Art. 219).",
        "**Radiation** : sur justification de ces formalités, le liquidateur demande la radiation de la société au RCCM dans le délai d'**un (1) mois** à compter de la publication de la clôture (Art. 220).",
      ] },
      { type: 'filet', titre: 'Deux prescriptions à ne pas confondre (Art. 221-222)', texte: "**Contre le liquidateur** : responsable, envers la société comme envers les tiers, des conséquences dommageables de ses fautes ; l'action sociale ou individuelle se prescrit par **trois (3) ans** à compter du fait dommageable ou de sa révélation s'il a été dissimulé - **dix (10) ans** lorsque le fait est qualifié crime. **Contre les associés non liquidateurs** (ou leurs conjoints survivants, héritiers et ayants-cause) : **cinq (5) ans** à compter de la publication de la dissolution au RCCM." },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[10] },
    ],
  },
  {
    numero: '10.4',
    titre: 'La liquidation encadrée par les Art. 223-241 : organes, exercices, répartitions',
    navLabel: '10.4 Le déroulement',
    blocs: [
      { type: 'paragraphe', texte: "Les **dispositions particulières** (Art. 224-241) s'appliquent dans deux cas (Art. 223) : la liquidation **à l'amiable, à défaut de clauses statutaires ou conventionnelles** expresses (ou lorsque les associés en conviennent), et la liquidation **ordonnée par décision de justice**, rendue à bref délai à la demande de personnes justifiant d'un intérêt légitime : la **majorité des associés** d'une SNC, des associés représentant **au moins le dixième du capital** dans les autres formes, les **créanciers sociaux**, ou le **représentant de la masse des obligataires** - les clauses contraires étant alors réputées non écrites. Dans ce cadre judiciaire, les pouvoirs du conseil d'administration ou des dirigeants prennent fin **à dater de la décision de justice** qui ordonne la liquidation (Art. 224), tandis que la dissolution ne met pas fin aux fonctions du **commissaire aux comptes** (Art. 225)." },
      { type: 'carte', titre: 'Le liquidateur judiciaire et ses obligations', tableau: { entetes: ['Obligation', 'Règle', 'Article'], lignes: [
        ['Désignation', 'Par la décision de justice qui ordonne la liquidation', 'Art. 226'],
        ['Durée du mandat', "**3 ans maximum**, renouvelables par décision de justice - la demande de renouvellement indique les raisons du retard, les mesures envisagées et les délais nécessaires", 'Art. 227'],
        ['Rapport initial', "Dans les **6 mois** de sa nomination (portés à 12 mois par décision de justice), il convoque l'assemblée et fait rapport sur la situation actif/passif, la poursuite des opérations et le délai d'achèvement ; à défaut, un mandataire ad hoc convoque l'assemblée", 'Art. 228'],
        ['Pouvoirs', "Représente et engage la société pour tous les actes de la liquidation ; pouvoirs les plus étendus pour réaliser l'actif, même à l'amiable ; restrictions statutaires **inopposables aux tiers**", 'Art. 230'],
        ['Limites', "Paie les créanciers et répartit le solde ; ne peut continuer les affaires en cours ou en engager de nouvelles qu'avec **autorisation de justice**", 'Art. 231'],
        ['Comptes annuels', "États financiers de synthèse et rapport écrit dans les **3 mois** de la clôture de chaque exercice ; assemblée annuelle dans les **6 mois** de la clôture (sauf dispense judiciaire)", 'Art. 232-233'],
      ] }, note: "Les décisions annuelles sont prises aux majorités propres à chaque forme (unanimité en SNC, majorité en capital en SARL, conditions d'AGE dans les sociétés par actions) ; les associés liquidateurs prennent part au vote, et les délibérations contraires sont nulles (Art. 235). En période de liquidation, les associés conservent leur droit de communication des documents sociaux (Art. 234)." },
      { type: 'filet', titre: 'Répartitions et boni de liquidation (Art. 237-241)', texte: "Sauf clause contraire des statuts, le partage des capitaux propres subsistant après remboursement du **nominal** des actions ou parts est effectué **proportionnellement à la participation au capital** (Art. 237). Toute décision de répartition est publiée et notifiée individuellement aux titulaires de titres nominatifs (Art. 238) ; les sommes affectées aux répartitions sont déposées sous **quinze (15) jours** sur un compte bancaire ouvert au nom de la société en liquidation (Art. 239), et celles qui n'ont pu être versées sont consignées, après **un (1) an** à compter de la clôture, sur un **compte séquestre au Trésor public** (Art. 240). Le liquidateur peut décider des répartitions en cours de liquidation, sous réserve des droits des créanciers ; après mise en demeure infructueuse, tout intéressé peut demander à la juridiction de statuer sur l'opportunité d'une telle répartition (Art. 241)." },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[17] },
      { type: 'controle', question: QCM[19] },
      { type: 'controle', question: QCM[21] },
    ],
  },
  {
    numero: '10.5',
    titre: 'Les nullités : causes strictes et faveur à la régularisation (Art. 242-250-1)',
    navLabel: '10.5 Les nullités',
    blocs: [
      { type: 'carte', titre: 'Pas de nullité sans texte', tableau: { entetes: ['Objet', 'Causes de nullité admises', 'Article'], lignes: [
        ['La société elle-même', "Disposition de l'AUSCGIE la prévoyant expressément, ou textes régissant la nullité des contrats. Dans les **SARL et sociétés par actions**, ni le vice de consentement ni l'incapacité d'un associé ne suffisent, sauf s'ils atteignent **tous les associés fondateurs**", 'Art. 242'],
        ['Actes, décisions ou délibérations **modifiant** les statuts', "Disposition expresse de l'AUSCGIE, textes régissant la nullité des contrats en général, ou violation d'une clause des statuts **jugée essentielle par la juridiction compétente**", 'Art. 243'],
        ['Actes, décisions ou délibérations **ne modifiant pas** les statuts', "Disposition expresse de l'AUSCGIE, violation d'une disposition **impérative** de l'AUSCGIE ou des textes régissant les contrats, ou violation d'une clause des statuts jugée essentielle par la juridiction", 'Art. 244'],
      ] }, note: "Dans les SNC et SCS, l'accomplissement des formalités de publicité est requis **à peine de nullité**, sans que la société ou les associés puissent s'en prévaloir à l'égard des tiers - la juridiction ayant la faculté de ne pas prononcer la nullité si aucune fraude n'est constatée (Art. 245)." },
      { type: 'paragraphe', texte: "**Le droit des nullités favorise la survie de la société.** L'action en nullité est **éteinte** lorsque la cause de nullité a cessé d'exister le jour où la juridiction statue sur le fond en première instance - sauf illicéité de l'objet social (Art. 246). La juridiction peut, même d'office, **fixer un délai pour couvrir la nullité**, et ne peut la prononcer moins de **deux (2) mois** après l'exploit introductif d'instance ; si une assemblée doit être convoquée pour régulariser, elle accorde le délai nécessaire (Art. 247). Ces règles s'appliquent à **toutes** les nullités encourues (Art. 250-1)." },
      { type: 'filet', titre: 'Vice de consentement, incapacité, défaut de publicité (Art. 248-250)', texte: "Quand la nullité est fondée sur un **vice du consentement ou l'incapacité** d'un associé et que la régularisation peut intervenir, tout intéressé peut **mettre en demeure** l'associé concerné de régulariser ou d'agir en nullité dans un délai de **six (6) mois à peine de forclusion** (Art. 248). La société ou un associé peut aussi soumettre à la juridiction toute mesure supprimant l'intérêt à agir du demandeur - notamment le **rachat de ses titres** ; la juridiction peut alors prononcer la nullité ou rendre obligatoires les mesures proposées, l'associé dont le rachat est demandé **ne prenant pas part au vote** (Art. 249). Pour les nullités fondées sur la violation des règles de **publicité**, tout intéressé peut mettre la société en demeure d'y procéder sous **trente (30) jours**, puis faire désigner un mandataire chargé d'accomplir la formalité (Art. 250)." },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[22] },
      { type: 'controle', question: QCM[23] },
    ],
  },
  {
    numero: '10.6',
    titre: 'Prescription, effets des nullités et responsabilités (Art. 251-256)',
    navLabel: '10.6 Effets des nullités',
    blocs: [
      { type: 'carte', titre: 'Les prescriptions de l\'action en nullité (Art. 251-252)', tableau: { entetes: ["Type d'action", 'Délai', 'Point de départ'], lignes: [
        ['Nullité de la société', '**3 ans** (sauf illicéité de l\'objet social)', "Immatriculation ou publication de l'acte modifiant les statuts"],
        ['Nullité des actes, décisions ou délibérations', '**3 ans** (sauf illicéité de l\'objet social)', 'Jour où la nullité est encourue'],
        ["Nullité d'une fusion ou d'une scission", '**6 mois**', 'Dernière inscription au RCCM rendue nécessaire par l\'opération'],
        ['Tierce opposition contre la décision prononçant la nullité de la société', '**6 mois**', "Publication de la décision dans un journal d'annonces légales"],
      ] } },
      { type: 'paragraphe', texte: "**Effets de la nullité prononcée (Art. 253-254).** La nullité de la société met fin, **sans rétroactivité**, à l'exécution du contrat : il est procédé à sa dissolution et, pour les sociétés pluripersonnelles, à leur liquidation - le passé social reste acquis. La décision prononçant la nullité d'une **fusion ou d'une scission** est publiée dans le mois où elle devient définitive ; elle est **sans effet sur les obligations nées** à la charge ou au profit des sociétés bénéficiaires entre la prise d'effet de l'opération et la publication de la décision, les sociétés ayant participé à la fusion étant **solidairement responsables** de l'exécution des obligations à la charge de l'absorbante." },
      { type: 'filet', titre: 'Protection des tiers et responsabilité (Art. 255-256)', texte: "Ni la société ni les associés ne peuvent se prévaloir d'une nullité **à l'égard des tiers de bonne foi**. Exception : la nullité pour vice de consentement ou incapacité est opposable, même aux tiers de bonne foi, par l'incapable, son représentant légal ou la personne dont le consentement a été vicié. Les associés et dirigeants **auxquels la nullité est imputable** peuvent être déclarés solidairement responsables du dommage résultant pour les tiers de l'annulation ; cette action se prescrit par **trois (3) ans** à compter du jour où la décision d'annulation est passée en force de chose jugée - et la disparition de la cause de nullité ne fait pas obstacle à l'action en réparation du préjudice causé par le vice, prescrite par trois ans à compter du jour où la nullité a été couverte." },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[18] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas1',
    titre: 'Dissolution pour mésentente',
    contexte: "La SARL KINSHASA TECH est paralysée depuis 8 mois. Les associés MBOTE (60%) et NZUZI (40%) s'opposent systématiquement sur toutes les décisions importantes. Aucune AG valide ne peut être tenue. L'entreprise perd des marchés. NZUZI veut la dissolution.",
    questions: [
      { num: 1, enonce: 'NZUZI peut-il obtenir la dissolution de la société en justice ?', correction: "Oui. L'Art. 200, 5° AUSCGIE prévoit la dissolution anticipée prononcée par la juridiction compétente à la demande d'un associé pour justes motifs, notamment en cas d'inexécution de ses obligations par un associé ou de mésentente entre associés empêchant le fonctionnement normal de la société. Deux conditions se dégagent du texte : une mésentente réelle - et non un simple désaccord ponctuel - et une paralysie du fonctionnement social. En l'espèce, huit mois de blocage systématique, l'impossibilité de tenir une AG valide et la perte de marchés caractérisent la mésentente paralysante : le juste motif est constitué. Tout associé peut agir, quelle que soit sa participation - NZUZI, avec 40%, a qualité. La juridiction conserve toutefois un pouvoir d'appréciation : elle vérifiera que le demandeur n'est pas lui-même à l'origine exclusive de la mésentente et que la paralysie est avérée." },
      { num: 2, enonce: 'Quels effets la dissolution entraîne-t-elle pour la société ?', correction: "La dissolution de cette société pluripersonnelle entraîne de plein droit sa mise en liquidation (Art. 201 al. 2), la personnalité morale subsistant pour les besoins de la liquidation jusqu'à la publication de la clôture (Art. 205) : la société peut encore contracter et ester en justice pour les besoins de la liquidation. La dissolution n'a d'effet à l'égard des tiers qu'à compter de sa publication dans un journal d'annonces légales (Art. 201 al. 1), complétée par le dépôt au RCCM et la modification de l'inscription (Art. 202). Dès la dissolution, la mention « société en liquidation » et le nom du ou des liquidateurs doivent figurer sur tous les actes et documents destinés aux tiers (Art. 204). Un liquidateur est nommé - à la majorité en capital dans la SARL (Art. 206, 3°) ou, à défaut d'accord, par décision de justice (Art. 208) - et la clôture doit intervenir dans les trois ans (Art. 216)." },
    ],
  },
  {
    id: 'cas2',
    titre: "Irrégularité dans la cession d'actifs",
    contexte: "Lors de la liquidation de la SARL GOMA BATIMENT, le liquidateur KIBAMBE vend des équipements à son cousin, également salarié de la société en liquidation. Les associés n'ont pas donné d'accord unanime.",
    questions: [
      { num: 1, enonce: 'Cette cession est-elle valide ?', correction: "Il faut décomposer la double qualité de l'acheteur au regard des Art. 213 et 214 AUSCGIE. L'Art. 214 interdit la cession de tout ou partie de l'actif au liquidateur, à ses employés ou à leurs conjoints, ascendants ou descendants : un cousin n'entre pas dans cette énumération limitative (ni conjoint, ni ascendant, ni descendant du liquidateur), et le texte vise les employés du liquidateur, non les salariés de la société en liquidation. L'interdiction absolue de l'Art. 214 n'est donc pas littéralement applicable. Mais la cession reste irrégulière si l'acheteur a eu dans la société une qualité visée par l'Art. 213 (associé en nom, gérant, dirigeant, CAC) - hypothèse à vérifier - et, surtout, l'opération faite au profit d'un proche du liquidateur, sans transparence ni autorisation, expose celui-ci à une révocation pour motifs légitimes (Art. 211) et engage sa responsabilité s'il a sacrifié l'intérêt de la liquidation (Art. 221). La leçon : l'interdiction de l'Art. 214 est d'interprétation stricte, mais le liquidateur qui contracte avec ses proches le fait à ses risques." },
      { num: 2, enonce: "Quelle est la sanction des cessions prohibées, et qui peut l'invoquer ?", correction: "L'Art. 215-1 AUSCGIE frappe de nullité les délibérations et opérations prises ou réalisées en violation des Art. 206 (nomination du liquidateur), 211 al. 1 (révocation), 213 (cession à un ancien dirigeant ou CAC sans autorisation judiciaire ni consentement unanime), 214 (cession au liquidateur, à ses employés ou à leurs proches) et 215 (cession globale sans la majorité requise). La nullité d'un acte ne modifiant pas les statuts peut être invoquée par tout intéressé - associé, société, voire créancier justifiant d'un intérêt - dans le délai de trois ans à compter du jour où elle est encourue (Art. 251 al. 2). S'y ajoutent la responsabilité civile du liquidateur pour les conséquences dommageables de ses fautes (Art. 221, prescription de trois ans) et sa révocation, demandée en justice par tout associé pour motifs légitimes (Art. 211 al. 2)." },
    ],
  },
  {
    id: 'cas3',
    titre: "Nullité d'une délibération",
    contexte: "L'AG de la SA BUKAVU MINING vote une modification des statuts en violation d'une clause des statuts. Un actionnaire minoritaire découvre l'irrégularité 2 ans et 8 mois après la délibération.",
    questions: [
      { num: 1, enonce: 'La délibération peut-elle être annulée ?', correction: "Peut-être - à une condition décisive. L'Art. 243 AUSCGIE n'admet la nullité des actes, décisions ou délibérations modifiant les statuts que dans trois cas : une disposition de l'AUSCGIE la prévoyant expressément, les textes régissant la nullité des contrats en général, ou la violation d'une clause des statuts jugée essentielle par la juridiction compétente. La violation d'une clause statutaire ne suffit donc pas en elle-même : c'est au juge - et non aux statuts ni aux parties - de qualifier la clause d'essentielle, au regard de son importance dans l'équilibre du pacte social (clause de répartition du pouvoir, d'agrément, de majorité renforcée...). Si la juridiction retient ce caractère essentiel, la nullité peut être prononcée ; sinon, l'actionnaire devra se rabattre sur la responsabilité. À noter que la juridiction favorisera d'abord la régularisation : délai pour couvrir la nullité, interdiction de statuer moins de deux mois après l'assignation (Art. 247), extinction de l'action si la cause de nullité disparaît avant le jugement (Art. 246)." },
      { num: 2, enonce: "L'action en nullité est-elle encore recevable ?", correction: "Oui. L'Art. 251 al. 2 AUSCGIE fixe la prescription des actions en nullité des actes, décisions ou délibérations à trois (3) ans à compter du jour où la nullité est encourue - c'est-à-dire du jour de la délibération irrégulière. L'actionnaire agit 2 ans et 8 mois après : il est dans le délai. Attention aux deux régimes spéciaux : l'action en nullité d'une fusion ou d'une scission se prescrit par six (6) mois seulement à compter de la dernière inscription au RCCM (Art. 251 al. 3), et la nullité fondée sur l'illicéité de l'objet social échappe à la prescription. Enfin, même prononcée, la nullité ne pourra être opposée aux tiers de bonne foi (Art. 255)." },
    ],
  },
  {
    id: 'cas4',
    titre: 'Clôture de liquidation et radiation',
    contexte: "La SARL MANIEMA COMMERCE est en liquidation depuis 4 ans. Le liquidateur n'a pas encore convoqué l'assemblée de clôture ni déposé les comptes définitifs.",
    questions: [
      { num: 1, enonce: 'Le délai légal est-il dépassé ? Quels recours existent ?', correction: "Oui. L'Art. 216 AUSCGIE impose que la clôture de la liquidation intervienne dans un délai de trois (3) ans à compter de la dissolution. Avec quatre ans, le délai est dépassé d'un an : le ministère public ou tout intéressé - associé, créancier - peut saisir la juridiction compétente dans le ressort de laquelle est situé le siège afin qu'il soit procédé à la liquidation ou, si elle a été commencée, à son achèvement. Par ailleurs, si le liquidateur ne convoque pas l'assemblée de clôture, tout associé peut demander à la juridiction, statuant à bref délai, la désignation d'un mandataire ad hoc chargé de procéder à la convocation (Art. 217 al. 2). Et tout associé peut demander en justice la révocation du liquidateur pour motifs légitimes (Art. 211) - l'inertie prolongée en est un." },
      { num: 2, enonce: 'Quelles sont les étapes formelles pour clore la liquidation ?', correction: "(1) Convocation des associés en fin de liquidation pour statuer sur les comptes définitifs, sur le quitus de la gestion du liquidateur et la décharge de son mandat, et pour constater la clôture (Art. 217). (2) Si l'assemblée ne peut délibérer ou refuse d'approuver les comptes, la juridiction compétente statue en lieu et place, à la demande du liquidateur ou de tout intéressé (Art. 218). (3) Dépôt des comptes définitifs au RCCM, accompagnés de la décision de l'assemblée ou de la décision de justice (Art. 219). (4) Radiation de la société au RCCM demandée par le liquidateur dans le mois de la publication de la clôture (Art. 220). Enfin, les sommes non versées aux créanciers ou associés sont consignées sur un compte séquestre au Trésor public un an après la clôture (Art. 240)." },
    ],
  },
  {
    id: 'cas5',
    titre: "Régularisation d'une nullité",
    contexte: "M. ILUNGA, associé fondateur de la SNC LUALABA TRANSPORT, prouve que son consentement a été obtenu par manœuvres dolosives lors de la constitution, il y a 18 mois. Les autres associés veulent sauver la société. M. ILUNGA menace d'agir en nullité de la société.",
    questions: [
      { num: 1, enonce: "L'action en nullité de M. ILUNGA a-t-elle des chances d'aboutir ?", correction: "Le terrain est réel mais étroit. Dans une SNC - à la différence des SARL et sociétés par actions, où l'Art. 242 al. 3 exclut la nullité pour vice de consentement sauf s'il atteint tous les fondateurs -, la nullité de la société peut résulter des textes régissant la nullité des contrats, donc d'un dol viciant le consentement d'un associé (Art. 242 al. 1). L'action, intentée 18 mois après l'immatriculation, est dans le délai de trois ans de l'Art. 251 al. 1. Mais le droit des nullités est tout entier orienté vers la survie de la société : l'action s'éteint si la cause de nullité cesse d'exister avant que la juridiction statue au fond (Art. 246), le juge peut fixer un délai pour couvrir la nullité et ne peut la prononcer moins de deux mois après l'assignation (Art. 247), et surtout la nullité prononcée n'aurait aucun effet rétroactif : dissolution suivie de liquidation, sans anéantissement du passé (Art. 253)." },
      { num: 2, enonce: 'Comment les autres associés peuvent-ils neutraliser cette menace ?', correction: "Deux leviers. D'abord, la mise en demeure de l'Art. 248 : lorsque la nullité est fondée sur un vice du consentement et que la régularisation peut intervenir, toute personne y ayant intérêt peut mettre en demeure M. ILUNGA de régulariser ou d'agir en nullité dans un délai de six (6) mois, à peine de forclusion - l'attentisme du demandeur est ainsi enfermé dans un délai bref. Ensuite, le rachat de l'Art. 249 : la société ou un associé peut soumettre à la juridiction toute mesure supprimant l'intérêt à agir du demandeur, notamment le rachat de ses titres sociaux ; la juridiction peut alors soit prononcer la nullité, soit rendre obligatoires les mesures proposées, préalablement adoptées par la société aux conditions de modification des statuts - M. ILUNGA, dont le rachat est demandé, ne prenant pas part au vote et ses parts étant exclues du quorum et de la majorité. La société sort ainsi de la crise en désintéressant l'associé victime du dol, sans disparaître." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue2',
  numero: 10,
  id: 'ue2-chapitre10',
  titre: 'Dissolution, liquidation et nullités',
  sousTitre: 'Art. 200 à 256 AUSCGIE révisé du 30 janvier 2014',
  infoBulle: "Les sept causes de dissolution, le régime complet de la liquidation - liquidateur, cessions encadrées, clôture, radiation - et le droit des nullités de la société et des actes sociaux, avec ses mécanismes de régularisation.",
  loiRef: 'Art. 200-256 AUSCGIE',
  moduleLabel: 'UE 2 · Droit des sociétés',
  retourRoute: '/ue2-droit-societes',
  coursId: 'ue2-droit-societes',
  objectifs: [
    'Identifier les 7 causes légales de dissolution et leurs effets (Art. 200-202)',
    "Maîtriser la nomination, les pouvoirs et les interdictions du liquidateur (Art. 206-215-1)",
    'Dérouler la clôture de la liquidation, ses délais et ses prescriptions (Art. 216-222)',
    'Appliquer le régime encadré de la liquidation : organes, exercices, répartitions (Art. 223-241)',
    'Raisonner sur les nullités : causes strictes, régularisation, prescription, effets (Art. 242-256)',
  ],
  sections: SECTIONS,
  aRetenir: [
    "Sept causes de dissolution (Art. 200), dont la dissolution judiciaire pour justes motifs - inexécution de ses obligations par un associé ou mésentente empêchant le fonctionnement normal ; effet envers les tiers à compter de la publication seulement (Art. 201).",
    "La dissolution de la société pluripersonnelle emporte de plein droit la mise en liquidation, la personnalité morale subsistant jusqu'à la publication de la clôture (Art. 201, 205) ; l'associé unique personne morale recueille le patrimoine par transmission universelle sans liquidation, sous réserve de l'opposition des créanciers dans les 30 jours - mécanisme écarté pour l'associé unique personne physique.",
    "Mention « société en liquidation » et nom des liquidateurs sur tous les actes destinés aux tiers (Art. 204) ; liquidateur nommé à l'unanimité (SNC), à la majorité en capital (SARL) ou aux conditions d'AGE (sociétés par actions), révocable en justice pour motifs légitimes (Art. 206, 211).",
    "Cessions d'actif : interdiction absolue au profit du liquidateur, de ses employés et de leurs proches (Art. 214) ; autorisation judiciaire - sauf consentement unanime - pour les anciens dirigeants et CAC (Art. 213) ; majorités renforcées pour la cession globale (Art. 215) ; toutes ces violations sont nulles (Art. 215-1).",
    "Clôture dans les 3 ans de la dissolution (Art. 216) : comptes définitifs, quitus, dépôt au RCCM, puis radiation dans le mois de la publication de la clôture (Art. 217-220) ; responsabilité du liquidateur prescrite par 3 ans, actions contre les associés non liquidateurs par 5 ans (Art. 221-222).",
    "En liquidation judiciaire, les pouvoirs des dirigeants cessent dès la décision (Art. 224), le CAC demeure (Art. 225), le liquidateur a un mandat de 3 ans renouvelable (Art. 227) et rend compte chaque année ; le boni est partagé proportionnellement au capital sauf clause contraire (Art. 237).",
    "Pas de nullité sans texte : la société n'est annulable que sur disposition expresse ou droit commun des contrats - jamais pour vice de consentement ou incapacité d'un associé dans les SARL et sociétés par actions, sauf atteinte de tous les fondateurs (Art. 242) ; la clause statutaire violée doit être jugée essentielle par la juridiction (Art. 243-244).",
    "La régularisation est reine : extinction de l'action si la cause cesse avant le jugement, délai pour couvrir, deux mois minimum avant prononcé, mise en demeure de six mois à peine de forclusion, rachat des titres de l'associé victime (Art. 246-249) ; prescriptions de 3 ans (société, actes) et 6 mois (fusions) ; nullité sans rétroactivité, inopposable aux tiers de bonne foi (Art. 251-255).",
  ],
  references: [
    {
      genre: 'texte',
      intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)",
      precision: 'adopté le 30 janvier 2014 à Ouagadougou, art. 200 à 256 (Livres 7 et 8 de la Partie 1)',
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : AUSCGIE révisé du 30 janvier 2014, art. 200 à 256',
}

export default chapitre
