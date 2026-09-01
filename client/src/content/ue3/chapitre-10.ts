import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 3 — CHAPITRE 10 : SOCIÉTÉS PARTICULIÈRES
// Société en participation (AUSCGIE art. 854-863), société créée de fait et
// société de fait (art. 864-868), GIE (art. 869-876), transformation
// (art. 181-188). Comptabilisation : Applications 106-107 (opérations faites
// en commun, comptes 188, 4631, 182, 2773, 752, 781) et 96-98 (GIE).
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1',
    question: "Qu'est-ce qui caractérise la société en participation selon l'article 854 de l'AUSCGIE ?",
    options: [
      { id: 'a', texte: "Une société immatriculée mais sans capital" },
      { id: 'b', texte: "Une société dont les associés conviennent qu'elle n'est pas immatriculée au RCCM : elle n'a pas la personnalité morale et n'est pas soumise à publicité" },
      { id: 'c', texte: "Une société cotée en bourse" },
      { id: 'd', texte: "Une société dont les titres sont négociables" },
      { id: 'e', texte: "Une société étrangère opérant dans l'espace OHADA" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 854 : la société en participation est celle dans laquelle les associés conviennent qu'elle n'est pas immatriculée au RCCM ; elle n'a pas la personnalité morale et n'est pas soumise à publicité. Son existence peut être prouvée par tous moyens. Les associés organisent librement objet, durée, fonctionnement, droits et fin, sous réserve des règles impératives communes aux sociétés — exception faite de celles relatives à la personnalité morale (art. 855).",
    articleRef: "AUSCGIE, art. 854-855",
  },
  {
    id: 'q2',
    question: "À quel régime les rapports entre associés d'une société en participation sont-ils soumis ?",
    options: [
      { id: 'a', texte: "Au régime de la SARL" },
      { id: 'b', texte: "À défaut d'organisation différente prévue, aux dispositions applicables aux sociétés en nom collectif" },
      { id: 'c', texte: "Au régime de la SA" },
      { id: 'd', texte: "Au droit commun des contrats uniquement" },
      { id: 'e', texte: "Au régime du GIE" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 856 : à moins qu'une organisation différente n'ait été prévue, les rapports entre associés sont régis par les dispositions applicables aux sociétés en nom collectif. Cette même référence à la SNC gouverne la dissolution (art. 862) et s'applique aux associés d'une société créée de fait ou d'une société de fait reconnue par le juge (art. 868).",
    articleRef: "AUSCGIE, art. 856",
  },
  {
    id: 'q3',
    question: "Qui reste propriétaire des biens mis à la disposition d'une société en participation ?",
    options: [
      { id: 'a', texte: "La société en participation elle-même" },
      { id: 'b', texte: "Chaque associé reste propriétaire des biens qu'il met à disposition, les biens nécessaires à l'activité étant mis à la disposition du gérant — sauf convention d'indivision" },
      { id: 'c', texte: "Le gérant, en tout état de cause" },
      { id: 'd', texte: "Les créanciers sociaux" },
      { id: 'e', texte: "Les biens deviennent indivis de plein droit" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 857 : les biens nécessaires à l'activité sociale sont mis à la disposition du gérant, mais chaque associé reste propriétaire des biens qu'il met à disposition — conséquence logique de l'absence de personnalité morale. Les associés peuvent convenir d'une indivision, ou que l'un d'eux est, à l'égard des tiers, propriétaire des biens acquis (art. 858) ; sont réputés indivis les biens acquis par emploi ou remploi de deniers indivis (art. 859), dont le partage ne peut être demandé avant la dissolution sauf clause contraire (art. 860).",
    articleRef: "AUSCGIE, art. 857-860",
  },
  {
    id: 'q4',
    question: "Comment les associés d'une société en participation sont-ils engagés à l'égard des tiers ?",
    options: [
      { id: 'a', texte: "Tous solidairement dans tous les cas" },
      { id: 'b', texte: "Chacun contracte en son nom personnel et est seul engagé ; mais si les associés agissent expressément en cette qualité, ceux qui ont agi sont tenus indéfiniment et solidairement" },
      { id: 'c', texte: "La société répond seule sur son patrimoine" },
      { id: 'd', texte: "Le gérant est seul engagé en toute hypothèse" },
      { id: 'e', texte: "Les associés ne sont jamais engagés" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 861 : chaque associé contracte en son nom personnel et est seul engagé à l'égard des tiers ; toutefois, si les associés agissent expressément en leur qualité d'associé auprès des tiers, chacun de ceux qui ont agi est tenu par les engagements des autres, indéfiniment et solidairement. Il en va de même de l'associé qui, par son immixtion, a laissé croire au cocontractant qu'il entendait s'engager, s'il est prouvé que l'engagement a tourné à son profit.",
    articleRef: "AUSCGIE, art. 861",
  },
  {
    id: 'q5',
    question: "Comment se dissout une société en participation à durée indéterminée ?",
    options: [
      { id: 'a', texte: "Uniquement par décision de justice" },
      { id: 'b', texte: "À tout moment par notification de bonne foi et non faite à contretemps, adressée par l'un des associés à tous les autres (lettre au porteur contre récépissé ou recommandée avec avis de réception)" },
      { id: 'c', texte: "Par publication au RCCM" },
      { id: 'd', texte: "Elle ne peut jamais être dissoute" },
      { id: 'e', texte: "À l'unanimité obligatoirement" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 863 : lorsque la société est à durée indéterminée, sa dissolution peut résulter à tout moment d'une notification adressée par l'un des associés à tous les autres, par lettre au porteur contre récépissé ou lettre recommandée avec avis de réception — pourvu que cette notification soit **de bonne foi et non faite à contretemps**. Par ailleurs, la société en participation est dissoute par les mêmes événements qui mettent fin à la SNC, sauf convention de continuation (art. 862).",
    articleRef: "AUSCGIE, art. 862-863",
  },
  {
    id: 'q6',
    question: "Quelle différence entre société créée de fait et société de fait ?",
    options: [
      { id: 'a', texte: "Aucune : les termes sont synonymes" },
      { id: 'b', texte: "La société créée de fait naît du comportement de personnes se conduisant comme des associés sans avoir constitué de société ; la société de fait résulte d'une société constituée mais entachée d'un vice de formation non régularisé ou non reconnue par l'Acte uniforme" },
      { id: 'c', texte: "La société de fait est immatriculée, l'autre non" },
      { id: 'd', texte: "La société créée de fait a la personnalité morale" },
      { id: 'e', texte: "La société de fait est une forme de GIE" },
    ],
    reponseCorrecte: 'b',
    explication: "Articles 864 et 865 : il y a société créée de fait lorsque deux ou plusieurs personnes se comportent comme des associés sans avoir constitué l'une des sociétés reconnues par l'Acte uniforme ; il y a société de fait lorsqu'elles ont constitué une société reconnue mais comportant un vice de formation non régularisé, ou une société non reconnue. L'existence de l'une comme de l'autre se prouve par tout moyen (art. 867), tout intéressé pouvant en demander la reconnaissance judiciaire (art. 866) ; reconnue, elle soumet les associés aux règles de la SNC (art. 868).",
    articleRef: "AUSCGIE, art. 864-868",
  },
  {
    id: 'q7',
    question: "Quel est le but exclusif du groupement d'intérêt économique (art. 869) ?",
    options: [
      { id: 'a', texte: "Réaliser et partager des bénéfices" },
      { id: 'b', texte: "Mettre en œuvre, pour une durée déterminée, tous les moyens propres à faciliter ou développer l'activité économique de ses membres, à en améliorer ou accroître les résultats — son activité devant se rattacher à la leur et n'avoir qu'un caractère auxiliaire" },
      { id: 'c', texte: "Gérer un portefeuille de titres" },
      { id: 'd', texte: "Représenter les salariés" },
      { id: 'e', texte: "Se substituer aux sociétés de ses membres" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 869 définit le GIE par son but exclusif — faciliter ou développer l'activité économique de ses membres — et par le caractère **auxiliaire** de son activité, qui doit se rattacher à la leur. Il peut être constitué **sans capital**. L'article 870 en tire la conséquence : le GIE ne donne pas lieu par lui-même à réalisation et à partage des bénéfices.",
    articleRef: "AUSCGIE, art. 869-870",
  },
  {
    id: 'q8',
    question: "Le GIE a-t-il la personnalité morale ?",
    options: [
      { id: 'a', texte: "Non, comme la société en participation" },
      { id: 'b', texte: "Oui : il jouit de la personnalité morale et de la pleine capacité à compter de son immatriculation au RCCM" },
      { id: 'c', texte: "Oui, dès la signature du contrat" },
      { id: 'd', texte: "Seulement s'il a un capital" },
      { id: 'e', texte: "Seulement s'il est composé de sociétés anonymes" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 872 : le GIE jouit de la personnalité morale et de la pleine capacité à compter de son immatriculation au RCCM — contrairement à la société en participation (art. 854), qui n'est pas immatriculée et n'a pas la personnalité morale. Les droits des membres du GIE ne peuvent toutefois pas être représentés par des titres négociables (art. 871).",
    articleRef: "AUSCGIE, art. 871-872",
  },
  {
    id: 'q9',
    question: "Comment les membres d'un GIE répondent-ils de ses dettes ?",
    options: [
      { id: 'a', texte: "Dans la limite de leurs apports" },
      { id: 'b', texte: "Sur leur patrimoine propre et solidairement, sauf convention contraire avec le tiers cocontractant — les créanciers devant d'abord mettre vainement en demeure le groupement" },
      { id: 'c', texte: "Ils ne répondent jamais des dettes du GIE" },
      { id: 'd', texte: "Seul le gérant répond des dettes" },
      { id: 'e', texte: "Uniquement à proportion de leur chiffre d'affaires" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 873 : les membres sont tenus des dettes du groupement sur leur patrimoine propre et sont solidaires du paiement, sauf convention contraire avec le tiers cocontractant ; un nouveau membre peut, si le contrat le permet, être exonéré des dettes nées avant son entrée — la décision d'exonération devant être publiée. L'article 874 tempère : les créanciers ne peuvent poursuivre un membre qu'après avoir vainement mis en demeure le groupement, par exploit d'huissier ou tout moyen établissant la réception effective.",
    articleRef: "AUSCGIE, art. 873-874",
  },
  {
    id: 'q10',
    question: "Un GIE peut-il émettre des obligations ?",
    options: [
      { id: 'a', texte: "Jamais" },
      { id: 'b', texte: "Oui, aux conditions générales d'émission de ces titres, s'il est lui-même composé exclusivement de sociétés autorisées à émettre des obligations" },
      { id: 'c', texte: "Oui, sans condition" },
      { id: 'd', texte: "Oui, s'il dispose d'un capital minimum de 10 000 000" },
      { id: 'e', texte: "Uniquement avec l'accord du RCCM" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 875 : le GIE peut émettre des obligations aux conditions générales d'émission de ces titres s'il est lui-même composé exclusivement de sociétés autorisées à en émettre — écho de l'article 780, qui réserve l'émission aux SA et aux GIE constitués de sociétés anonymes remplissant les conditions d'ancienneté et de capital libéré (chapitre 6).",
    articleRef: "AUSCGIE, art. 875 ; art. 780",
  },
  {
    id: 'q11',
    question: "Comment la contribution des membres aux dettes du GIE est-elle fixée ?",
    options: [
      { id: 'a', texte: "Proportionnellement au chiffre d'affaires réalisé" },
      { id: 'b', texte: "Librement par le contrat ; à défaut, chaque membre supporte une part égale" },
      { id: 'c', texte: "Par décision du gérant" },
      { id: 'd', texte: "Par la juridiction compétente" },
      { id: 'e', texte: "Proportionnellement aux apports uniquement" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 876 : sous réserve des dispositions de l'Acte uniforme, le contrat détermine l'organisation du groupement et fixe librement la contribution de chaque membre aux dettes ; à défaut, chaque membre supporte une part égale. Le contrat, écrit et publié comme celui des sociétés, contient au moins la dénomination, l'identification des membres, la durée, l'objet et l'adresse du siège ; tous les actes destinés aux tiers doivent porter la dénomination suivie des mots « groupement d'intérêt économique » ou du sigle « G.I.E. ».",
    articleRef: "AUSCGIE, art. 876",
  },
  {
    id: 'q12',
    question: "La transformation d'une société entraîne-t-elle la création d'une personne morale nouvelle ?",
    options: [
      { id: 'a', texte: "Oui, systématiquement" },
      { id: 'b', texte: "Non : la transformation régulière ne constitue qu'une modification des statuts, soumise aux mêmes conditions de forme et de délai" },
      { id: 'c', texte: "Oui, sauf en SARL" },
      { id: 'd', texte: "Oui, si la forme d'arrivée est une société par actions" },
      { id: 'e', texte: "Non, mais elle emporte dissolution" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 181 : la transformation est l'opération par laquelle une société change de forme juridique par décision des associés ; la transformation régulière n'entraîne pas la création d'une personne morale nouvelle et ne constitue qu'une modification des statuts. Toutefois, la transformation d'une société à responsabilité limitée aux apports en une société à responsabilité illimitée est décidée à l'unanimité — les délibérations contraires étant nulles.",
    articleRef: "AUSCGIE, art. 181",
  },
  {
    id: 'q13',
    question: "Quand la transformation prend-elle effet, et peut-elle rétroagir ?",
    options: [
      { id: 'a', texte: "Elle rétroagit à l'ouverture de l'exercice" },
      { id: 'b', texte: "Elle prend effet au jour de la décision qui la constate, n'est opposable aux tiers qu'après les formalités de publicité, et **ne peut avoir d'effet rétroactif**" },
      { id: 'c', texte: "Elle prend effet à la clôture de l'exercice" },
      { id: 'd', texte: "Elle prend effet à l'immatriculation modificative uniquement" },
      { id: 'e', texte: "Elle rétroagit d'un an au maximum" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 182 : la transformation prend effet à compter du jour où la décision la constatant est prise ; elle ne devient opposable aux tiers qu'après l'achèvement des formalités de publicité, et **ne peut avoir d'effet rétroactif** — contraste marquant avec la fusion, dont l'article 192 admet une date d'effet conventionnelle antérieure dans certaines bornes (chapitre 8).",
    articleRef: "AUSCGIE, art. 182",
  },
  {
    id: 'q14',
    question: "La transformation impose-t-elle un arrêté des comptes en cours d'exercice ?",
    options: [
      { id: 'a', texte: "Oui, obligatoirement" },
      { id: 'b', texte: "Non, sauf si les associés en décident autrement ; les états financiers de l'exercice de la transformation sont arrêtés et approuvés selon les règles de la nouvelle forme, de même que la répartition des bénéfices" },
      { id: 'c', texte: "Oui, avec intervention d'un expert" },
      { id: 'd', texte: "Non, et les comptes suivent toujours les règles de l'ancienne forme" },
      { id: 'e', texte: "Oui, mais seulement en société par actions" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 183 : la transformation n'entraîne pas un arrêté des comptes si elle survient en cours d'exercice, sauf décision contraire des associés ; les états financiers de synthèse de l'exercice de la transformation sont arrêtés et approuvés suivant les règles régissant la **nouvelle** forme juridique, comme la répartition des bénéfices. Le rapport de gestion est établi par les anciens et les nouveaux organes, chacun pour sa période (art. 185).",
    articleRef: "AUSCGIE, art. 183 et 185",
  },
  {
    id: 'q15',
    question: "Une société sans commissaire aux comptes se transforme en société par actions. Quelle formalité s'impose ?",
    options: [
      { id: 'a', texte: "Aucune formalité particulière" },
      { id: 'b', texte: "La désignation d'un ou plusieurs commissaires à la transformation, chargés d'apprécier sous leur responsabilité la valeur des biens composant l'actif social et les avantages particuliers — à défaut d'approbation expresse des associés, la transformation est nulle" },
      { id: 'c', texte: "Une expertise du greffier" },
      { id: 'd', texte: "Un audit fiscal préalable" },
      { id: 'e', texte: "Le maintien obligatoire de l'ancien gérant" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 187-1 : des commissaires à la transformation sont désignés — sauf accord unanime des associés — par décision de la juridiction compétente à la demande des dirigeants ; ils apprécient sous leur responsabilité la valeur des biens de l'actif social et les avantages particuliers, leur rapport étant tenu à la disposition des associés. Ceux-ci statuent sur l'évaluation et les avantages, qu'ils ne peuvent réduire qu'à l'unanimité ; à défaut d'approbation expresse mentionnée au procès-verbal, **la transformation est nulle**.",
    articleRef: "AUSCGIE, art. 187-1",
  },
  {
    id: 'q16',
    question: "Quels comptes le SYSCOHADA utilise-t-il pour les opérations faites en commun (société en participation) ?",
    options: [
      { id: 'a', texte: "Uniquement les comptes 6 et 7 ordinaires" },
      { id: 'b', texte: "188 Comptes de liaison des sociétés en participation, 4631 Associés — opérations faites en commun et GIE, 182 Dettes liées à des SP, 2773 Créances rattachées à des SP, 752 Quote-part de résultat sur opérations faites en commun, 781 Transferts de charges" },
      { id: 'c', texte: "101 et 4619" },
      { id: 'd', texte: "1611 et 6714" },
      { id: 'e', texte: "816 et 826" },
    ],
    reponseCorrecte: 'b',
    explication: "Comptes clés du chapitre 33 du Guide (Applications 106-107) : 188 (comptes de liaison), 4631 (associés, opérations faites en commun et GIE), 182 (dettes liées à des SP, chez le gérant qui porte un bien pour compte commun), 2773 (créances rattachées à des SP, chez le non-gérant), 752 (quote-part de résultat sur opérations faites en commun) et 781 (transferts de charges, pour les frais avancés).",
    articleRef: "SYSCOHADA — Guide d'application, chapitre 33 (Applications 106-107)",
  },
  {
    id: 'q17',
    question: "Dans l'Application 106, comment le gérant répartit-il le résultat de la participation (268, A pour 3/4 et B pour 1/4) ?",
    options: [
      { id: 'a', texte: "Débit 188 268 / crédit 752 pour 201 (part du gérant) et crédit 4631 pour 67 (part de B)" },
      { id: 'b', texte: "Débit 701 268 / crédit 521" },
      { id: 'c', texte: "Débit 4631 268 / crédit 752 pour 268" },
      { id: 'd', texte: "Débit 752 268 / crédit 188" },
      { id: 'e', texte: "Aucune écriture : le résultat reste dans la participation" },
    ],
    reponseCorrecte: 'a',
    explication: "Dans la comptabilité propre du gérant A, le compte de liaison 188 est débité du résultat de la participation (268), par le crédit de 752 Quote-part de résultat sur opérations faites en commun pour sa propre part (268 × 3/4 = 201) et de 4631 Associé B pour la part de celui-ci (67). Le résultat de la participation était lui-même dégagé, dans la comptabilité autonome, par le solde des comptes de gestion viré au 188.",
    articleRef: "SYSCOHADA — Application 106",
  },
  {
    id: 'q18',
    question: "Un bien acquis par le gérant pour les besoins de la participation, financé pour partie par le non-gérant, se traduit chez ce dernier par :",
    options: [
      { id: 'a', texte: "Un débit du compte d'immobilisation pour la totalité" },
      { id: 'b', texte: "Un débit du compte 2773 Créances rattachées à des sociétés en participation, par le crédit du compte 4631 (associé gérant)" },
      { id: 'c', texte: "Une charge de l'exercice" },
      { id: 'd', texte: "Un débit du compte 261" },
      { id: 'e', texte: "Aucune écriture" },
    ],
    reponseCorrecte: 'b',
    explication: "Application 106 : le matériel (16 000) est inscrit à l'actif du gérant A, qui constate la part de B par le débit de 4631 et le crédit de 182 Dettes liées à des SP (4 000) ; symétriquement, B enregistre sa quote-part au débit de 2773 Créances rattachées à des SP par le crédit de 4631. Le principe de l'article 857 est ainsi traduit : chaque associé reste propriétaire — ou créancier — de ce qu'il apporte, la participation n'ayant pas de patrimoine propre.",
    articleRef: "SYSCOHADA — Application 106 ; AUSCGIE, art. 857",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '10.1',
    titre: "La société en participation : une société sans personnalité morale",
    navLabel: "Participation",
    blocs: [
      {
        type: 'paragraphe',
        texte: "La **société en participation** est celle dans laquelle les associés conviennent qu'elle **n'est pas immatriculée** au registre du commerce et du crédit mobilier : elle n'a pas la personnalité morale et n'est pas soumise à publicité ; son existence peut être prouvée par tous moyens (art. 854). Les associés en règlent librement l'objet, la durée, le fonctionnement, leurs droits et la fin, sous réserve des règles impératives communes aux sociétés — hormis celles relatives à la personnalité morale (art. 855). À défaut d'organisation différente, leurs rapports obéissent aux règles de la **société en nom collectif** (art. 856).",
      },
      {
        type: 'carte',
        titre: "Les biens et les tiers : les conséquences de l'absence de personnalité morale",
        liste: [
          "**Propriété des biens** (art. 857-860) : les biens nécessaires à l'activité sont mis à la disposition du gérant, mais **chaque associé reste propriétaire** de ce qu'il met à disposition. Les associés peuvent convenir d'une indivision, ou que l'un d'eux soit propriétaire à l'égard des tiers des biens acquis. Sont réputés indivis les biens acquis par emploi ou remploi de deniers indivis et ceux qui l'étaient déjà ; sauf clause contraire, nul ne peut en demander le partage avant la dissolution.",
          "**Engagement à l'égard des tiers** (art. 861) : chaque associé **contracte en son nom personnel** et est seul engagé. Mais si les associés agissent expressément en cette qualité, chacun de ceux qui ont agi est tenu par les engagements des autres, **indéfiniment et solidairement** — de même que l'associé qui, par son immixtion, a laissé croire qu'il s'engageait, dès lors que l'engagement a tourné à son profit.",
          "**Dissolution** (art. 862-863) : par les mêmes événements qui mettent fin à la SNC, sauf convention de continuation ; et, en cas de durée indéterminée, par **notification** d'un associé à tous les autres — de bonne foi et non faite à contretemps.",
        ],
      },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[4] },
    ],
  },
  {
    numero: '10.2',
    titre: "Société créée de fait et société de fait",
    navLabel: "Sociétés de fait",
    blocs: [
      {
        type: 'carte',
        titre: "Deux notions voisines, un même régime (art. 864-868)",
        tableau: {
          entetes: ["Notion", "Définition", "Régime"],
          lignes: [
            ["Société **créée de fait** (art. 864)", "Deux ou plusieurs personnes se comportent comme des associés sans avoir constitué l'une des sociétés reconnues par l'Acte uniforme", "Preuve par tout moyen (art. 867) ; reconnaissance judiciaire à la demande de tout intéressé (art. 866) ; règles de la SNC applicables aux associés (art. 868)"],
            ["Société **de fait** (art. 865)", "Une société reconnue a été constituée mais comporte un vice de formation non régularisé, ou la société constituée n'est pas reconnue par l'Acte uniforme", "Même régime probatoire et mêmes effets"],
          ],
        },
        note: "La sanction est lourde pour les associés : le renvoi à la SNC emporte responsabilité indéfinie et solidaire aux dettes sociales. C'est le pendant de la société en participation, à ceci près que celle-ci résulte d'une volonté assumée de ne pas immatriculer, là où la société de fait résulte d'une irrégularité ou d'une absence de formalisation.",
      },
      { type: 'controle', question: QCM[5] },
    ],
  },
  {
    numero: '10.3',
    titre: "Le groupement d'intérêt économique",
    navLabel: "Le GIE",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le **groupement d'intérêt économique** a pour **but exclusif** de mettre en œuvre, pour une durée déterminée, tous les moyens propres à faciliter ou à développer l'activité économique de ses membres, à améliorer ou accroître les résultats de cette activité ; son activité doit se **rattacher** à celle de ses membres et ne peut avoir qu'un caractère **auxiliaire** (art. 869). Il peut être constitué **sans capital** — et ne donne pas lieu, par lui-même, à réalisation et partage de bénéfices (art. 870). C'est un outil de coopération : centrale d'achat, bureau d'études commun, force de vente partagée.",
      },
      {
        type: 'carte',
        titre: "Régime juridique du GIE (art. 871-876)",
        tableau: {
          entetes: ["Question", "Règle"],
          lignes: [
            ["Membres", "Deux ou plusieurs personnes physiques ou morales, y compris des professions libérales réglementées ; les droits des membres ne peuvent être représentés par des **titres négociables** (art. 871)"],
            ["Personnalité morale", "Acquise, avec la pleine capacité, **à compter de l'immatriculation au RCCM** (art. 872)"],
            ["Dettes", "Membres tenus sur leur **patrimoine propre** et **solidairement**, sauf convention contraire avec le tiers cocontractant ; exonération possible du nouveau membre pour les dettes antérieures si le contrat le permet, avec publicité (art. 873)"],
            ["Poursuite des membres", "Seulement après **mise en demeure vaine** du groupement, par exploit d'huissier ou tout moyen établissant la réception (art. 874)"],
            ["Obligations", "Émission possible aux conditions générales, si le GIE est composé **exclusivement de sociétés autorisées** à émettre des obligations (art. 875)"],
            ["Organisation", "Fixée par le contrat, qui règle librement la **contribution aux dettes** — à défaut, part égale ; contrat écrit, publié, comportant dénomination, identification des membres, durée, objet et siège ; mention « groupement d'intérêt économique » ou « G.I.E. » sur les documents destinés aux tiers (art. 876)"],
          ],
        },
      },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[10] },
    ],
  },
  {
    numero: '10.4',
    titre: "La transformation de la société (art. 181-188)",
    navLabel: "Transformation",
    blocs: [
      {
        type: 'paragraphe',
        texte: "La **transformation** est l'opération par laquelle une société **change de forme juridique** par décision des associés. Régulière, elle **n'entraîne pas la création d'une personne morale nouvelle** : elle ne constitue qu'une modification des statuts, soumise aux mêmes conditions de forme et de délai (art. 181). Une exception d'importance : la transformation d'une société où la responsabilité est **limitée** aux apports en une société où elle est **illimitée** exige l'**unanimité** — les délibérations contraires étant nulles.",
      },
      {
        type: 'carte',
        titre: "Effets et formalités",
        tableau: {
          entetes: ["Point", "Règle"],
          lignes: [
            ["Date d'effet", "Au jour de la décision la constatant ; opposable aux tiers après publicité ; **aucun effet rétroactif** (art. 182) — à la différence de la fusion (art. 192)"],
            ["Comptes", "Pas d'arrêté des comptes en cours d'exercice, sauf décision des associés ; états financiers de l'exercice arrêtés et approuvés selon les règles de la **nouvelle** forme, comme la répartition des bénéfices (art. 183)"],
            ["Organes", "La décision met fin aux pouvoirs des organes d'administration ou de gestion ; leurs membres ne peuvent réclamer de dommages et intérêts que si la transformation a été décidée dans le seul but de porter atteinte à leurs droits (art. 184). Rapport de gestion établi par les anciens et les nouveaux organes, chacun pour sa période (art. 185)"],
            ["Engagements et sûretés", "Les droits et obligations contractés sous l'ancienne forme subsistent, ainsi que les sûretés sauf clause contraire ; en cas de passage d'une responsabilité illimitée à une responsabilité limitée, les créanciers antérieurs **conservent leurs droits contre la société et les associés** (art. 186)"],
            ["Commissaire aux comptes", "Fonctions maintenues si la nouvelle forme en requiert un ; sinon, mission cessant par la transformation sauf décision contraire, avec obligation de rendre compte de la période écoulée (art. 187)"],
            ["Commissaires à la transformation", "Société sans commissaire aux comptes se transformant en société par actions : désignation — sauf accord unanime — par la juridiction compétente ; appréciation de la valeur des biens et des avantages particuliers ; réduction possible seulement à l'unanimité ; **transformation nulle** à défaut d'approbation expresse au procès-verbal (art. 187-1)"],
            ["Perte de la personnalité", "Si, à la suite de la transformation, la société n'a plus l'une des formes prévues par l'Acte uniforme, elle perd la personnalité juridique lorsqu'elle exerce une activité commerciale (art. 188)"],
          ],
        },
      },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[14] },
    ],
  },
  {
    numero: '10.5',
    titre: "Comptabiliser les opérations faites en commun (Applications 106-107)",
    navLabel: "Écritures",
    blocs: [
      {
        type: 'paragraphe',
        texte: "La société en participation n'ayant ni personnalité morale ni patrimoine, sa comptabilité s'organise autour de **comptes de liaison**. Le Guide (chapitre 33) retient deux organisations : une **comptabilité autonome** de la participation tenue par le gérant (Application 106) ou une comptabilité **intégrée** à celle des associés. Comptes clés : **188** Comptes de liaison des sociétés en participation ; **4631** Associés, opérations faites en commun et GIE ; **182** Dettes liées à des SP ; **2773** Créances rattachées à des SP ; **752** Quote-part de résultat sur opérations faites en commun ; **781** Transferts de charges.",
      },
      {
        type: 'carte',
        titre: "Application 106 — SP entre A (gérant, 3/4) et B (1/4), en milliers de francs",
        tableau: {
          entetes: ["Niveau", "Écritures caractéristiques"],
          lignes: [
            ["Comptabilité autonome de la participation (tenue par A)", "Seuls les comptes de gestion : achats (601) et charges (612, 616, 628) par le crédit de 188 ; ventes (701) par le débit de 188 — ou par le débit de 4631 pour les ventes réalisées par B. En fin de période, virement du résultat (268) au compte 188."],
            ["Comptabilité propre du gérant A", "Fonds reçus de B : débit 521 / crédit 188. Matériel acquis pour la participation : débit 2413 16 000 / crédit 4812 ; part de B : débit 4631 4 000 / crédit **182 Dettes liées à des SP**. Frais avancés : débit 188 / crédit **781 Transferts de charges** 112. Répartition du résultat : débit 188 268 / crédit **752** 201 (part de A) et crédit 4631 67 (part de B)."],
            ["Comptabilité de B (non-gérant)", "Virement de fonds : débit 4631 / crédit 521 3 000. Quote-part du matériel acquis par A : débit **2773 Créances rattachées à des SP** 4 000 / crédit 4631. Sa quote-part de résultat sera portée au crédit de son compte 752 par le débit de 4631."],
          ],
        },
        note: "Le résultat de la participation (produits 1 800 − charges 1 532 = 268) est réparti selon les quotes-parts convenues : 201 pour A, 67 pour B. Aucun compte de capital n'intervient : la participation n'a pas de patrimoine, seulement des comptes de liaison entre associés — traduction comptable exacte de l'absence de personnalité morale (art. 854) et du maintien de la propriété individuelle des biens (art. 857).",
      },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[16] },
      { type: 'controle', question: QCM[17] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas-1',
    titre: "Cas 1 — Chantier LUKAYA : société en participation entre deux entreprises",
    contexte: "Deux entreprises de BTP, BATIMAT (gérante, 60 %) et CONSTRUKIN (40 %), conviennent d'exécuter en commun un chantier, sans immatriculer de structure nouvelle. Opérations du trimestre (en milliers de francs) : apport de fonds par CONSTRUKIN 5 000 ; achat de matériaux à crédit 9 000 ; acquisition par BATIMAT d'une grue 20 000 pour le chantier (payée à 90 jours) ; facturation du maître d'ouvrage 18 000 encaissée ; frais divers avancés par BATIMAT 800.",
    questions: [
      {
        num: 1,
        enonce: "Qualifiez juridiquement l'accord et précisez ses conséquences sur la propriété de la grue.",
        correction: "C'est une société en participation : les associés conviennent qu'elle n'est pas immatriculée au RCCM ; elle n'a ni personnalité morale ni publicité, et son existence se prouve par tous moyens (art. 854). Faute de patrimoine social, la grue acquise par BATIMAT reste sa propriété (art. 857) : elle figure à son actif, la quote-part de CONSTRUKIN étant traduite par des comptes de liaison. À défaut d'organisation différente, les rapports entre associés obéissent aux règles de la SNC (art. 856).",
      },
      {
        num: 2,
        enonce: "CONSTRUKIN est-elle engagée envers le fournisseur de matériaux avec lequel BATIMAT a contracté seule et en son nom ?",
        correction: "Non, en principe : chaque associé contracte en son nom personnel et est seul engagé à l'égard des tiers (art. 861, al. 1er). CONSTRUKIN ne serait tenue que si les associés avaient agi expressément en leur qualité d'associés — auquel cas ceux qui ont agi sont tenus indéfiniment et solidairement (al. 2) — ou si, par son immixtion, elle avait laissé croire au fournisseur qu'elle entendait s'engager et que l'engagement a tourné à son profit (al. 4).",
      },
      {
        num: 3,
        enonce: "Passez, dans la comptabilité propre de BATIMAT, les écritures relatives aux fonds reçus, à la grue et aux frais avancés.",
        correction: "Fonds : débit 521 Banques 5 000 / crédit 188 Comptes de liaison des SP 5 000. Grue : débit 2411 (ou 2413) 20 000 / crédit 4812 Fournisseurs d'investissements 20 000 ; part de CONSTRUKIN (40 % × 20 000 = 8 000) : débit 4631 Associé CONSTRUKIN 8 000 / crédit 182 Dettes liées à des SP 8 000. Frais avancés : débit 188 800 / crédit 781 Transferts de charges 800 (schéma de l'Application 106).",
      },
      {
        num: 4,
        enonce: "Déterminez le résultat de la participation et passez l'écriture de répartition chez BATIMAT.",
        correction: "Produits : 18 000. Charges : matériaux 9 000 + frais 800 = 9 800 (la grue est une immobilisation, non une charge de la période). Résultat : 8 200. Répartition : BATIMAT 60 % = 4 920 ; CONSTRUKIN 40 % = 3 280. Écriture chez le gérant : débit 188 8 200 / crédit 752 Quote-part de résultat sur opérations faites en commun 4 920 et crédit 4631 Associé CONSTRUKIN 3 280.",
      },
      {
        num: 5,
        enonce: "L'accord est à durée indéterminée et BATIMAT souhaite y mettre fin. Comment procéder ?",
        correction: "L'article 863 permet la dissolution à tout moment par notification adressée par l'un des associés à tous les autres, par lettre au porteur contre récépissé ou lettre recommandée avec avis de réception — à condition qu'elle soit de bonne foi et non faite à contretemps : rompre au milieu du chantier, pour capter seul le marché, serait une rupture à contretemps engageant la responsabilité de son auteur. À défaut de clause contraire, aucun associé ne peut d'ailleurs demander le partage des biens indivis avant la dissolution (art. 860).",
      },
    ],
  },
  {
    id: 'cas-2',
    titre: "Cas 2 — GIE PHARMA-DISTRIB : coopération entre officines",
    contexte: "Six pharmacies constituent un groupement pour mutualiser leurs achats et leur logistique. Le contrat, écrit, prévoit une durée de dix ans, aucun capital, et est publié ; l'immatriculation au RCCM intervient le 15/03/N. Le contrat est muet sur la contribution aux dettes. En N+2, un fournisseur impayé de 30 000 000 assigne directement l'une des pharmacies. En N+3, une septième officine rejoint le groupement et souhaite être exonérée du passif antérieur ; le groupement envisage par ailleurs d'émettre des obligations.",
    questions: [
      {
        num: 1,
        enonce: "Le groupement est-il valablement constitué, et depuis quand a-t-il la personnalité morale ?",
        correction: "Oui : le GIE peut être constitué par deux ou plusieurs personnes physiques ou morales (art. 871), y compris exerçant une profession libérale réglementée, sans capital (art. 869), par un contrat écrit et publié contenant dénomination, identification des membres, durée, objet et siège (art. 876). Son but doit rester exclusivement auxiliaire de l'activité de ses membres — la mutualisation des achats et de la logistique y répond (art. 869). Il jouit de la personnalité morale et de la pleine capacité à compter de son immatriculation, soit le 15/03/N (art. 872).",
      },
      {
        num: 2,
        enonce: "Le fournisseur peut-il assigner directement une pharmacie membre ? Pour quelle part ?",
        correction: "Pas directement : les créanciers ne peuvent poursuivre un membre qu'après avoir vainement mis en demeure le groupement, par exploit d'huissier ou tout moyen établissant la réception effective (art. 874). Cette formalité accomplie, les membres sont tenus sur leur patrimoine propre et **solidairement**, sauf convention contraire avec le tiers cocontractant (art. 873) : le fournisseur peut réclamer la totalité des 30 000 000 à la pharmacie assignée. Le contrat étant muet sur la contribution, chaque membre supporte, dans les rapports entre eux, une part égale (art. 876) — soit un sixième, la pharmacie ayant payé disposant d'un recours pour le surplus.",
      },
      {
        num: 3,
        enonce: "La septième officine peut-elle être exonérée du passif antérieur à son entrée ?",
        correction: "Oui, à deux conditions cumulatives de l'article 873 : que le contrat le permette, et que la décision d'exonération soit publiée. Sans publication, l'exonération reste inopposable aux tiers, qui pourront poursuivre le nouveau membre pour les dettes nées avant son entrée.",
      },
      {
        num: 4,
        enonce: "Le groupement peut-il émettre des obligations ?",
        correction: "Non en l'état : le GIE ne peut émettre d'obligations que s'il est composé **exclusivement de sociétés autorisées** à en émettre (art. 875) — c'est-à-dire de sociétés anonymes remplissant les conditions de l'article 780 (deux ans d'existence, deux bilans approuvés, capital entièrement libéré, art. 781). Un groupement de pharmacies exploitées par des personnes physiques ou sous d'autres formes ne remplit pas cette condition. Rappel : les droits des membres ne peuvent pas non plus être représentés par des titres négociables (art. 871).",
      },
    ],
  },
  {
    id: 'cas-3',
    titre: "Cas 3 — KIMPESE AGRO : transformation d'une SARL en société anonyme",
    contexte: "KIMPESE AGRO SARL (capital 40 000 000, pas de commissaire aux comptes) souhaite se transformer en société anonyme pour lever des fonds. L'assemblée est convoquée le 20/06/N. Un associé minoritaire s'interroge sur le sort des sûretés consenties par la société, sur les comptes de l'exercice en cours et sur la date d'effet de l'opération. Le gérant, dont le mandat court jusqu'en N+2, craint pour ses fonctions.",
    questions: [
      {
        num: 1,
        enonce: "La transformation crée-t-elle une personne morale nouvelle ? Quelles conditions de majorité ?",
        correction: "Non : la transformation régulière n'entraîne pas la création d'une personne morale nouvelle et ne constitue qu'une modification des statuts, soumise aux mêmes conditions de forme et de délai (art. 181). L'unanimité n'est exigée que pour passer d'une société à responsabilité limitée aux apports à une société à responsabilité illimitée : ici, SARL vers SA, la responsabilité reste limitée aux apports — les conditions de modification des statuts de la SARL suffisent. Il faudra en outre respecter le capital minimum de la SA (10 000 000, art. 387) : 40 000 000 y satisfont.",
      },
      {
        num: 2,
        enonce: "Quelle formalité particulière s'impose, la société n'ayant pas de commissaire aux comptes ?",
        correction: "L'article 187-1 : la désignation d'un ou plusieurs **commissaires à la transformation**, chargés d'apprécier sous leur responsabilité la valeur des biens composant l'actif social et les avantages particuliers ; ils sont désignés par décision de la juridiction compétente à la demande des dirigeants, sauf accord unanime des associés. Leur rapport est tenu à la disposition des associés, qui statuent sur l'évaluation et les avantages et ne peuvent les réduire qu'à l'unanimité. À défaut d'approbation expresse mentionnée au procès-verbal, **la transformation est nulle**.",
      },
      {
        num: 3,
        enonce: "Répondez aux inquiétudes de l'associé minoritaire : sûretés, comptes de l'exercice, date d'effet.",
        correction: "Sûretés et engagements : les droits et obligations contractés sous l'ancienne forme subsistent, ainsi que les sûretés, sauf clause contraire dans l'acte constitutif de celles-ci (art. 186). Comptes : la transformation n'entraîne pas d'arrêté des comptes en cours d'exercice, sauf décision des associés ; les états financiers de l'exercice — et la répartition des bénéfices — seront arrêtés et approuvés suivant les règles de la nouvelle forme (art. 183), le rapport de gestion étant établi par les anciens et les nouveaux organes, chacun pour sa période (art. 185). Date d'effet : au jour de la décision, opposable aux tiers seulement après publicité, et **sans effet rétroactif** (art. 182).",
      },
      {
        num: 4,
        enonce: "Le gérant peut-il réclamer des dommages et intérêts pour la perte de ses fonctions ?",
        correction: "En principe non : la décision de transformation met fin aux pouvoirs des organes d'administration ou de gestion, et leurs membres ne peuvent demander des dommages et intérêts du fait de la transformation — ou de son annulation — **que si celle-ci a été décidée dans le seul but de porter atteinte à leurs droits** (art. 184). Il lui faudrait donc établir ce détournement, ce que la finalité affichée (lever des fonds sous forme de SA) rend difficile.",
      },
    ],
  },
  {
    id: 'cas-4',
    titre: "Cas 4 — Requalifications : de la coopération informelle à la société de fait",
    contexte: "Trois artisans exploitent depuis quatre ans un atelier commun : ils partagent les commandes, les charges et les bénéfices, se présentent ensemble aux clients sous une enseigne unique, mais n'ont jamais signé de statuts ni immatriculé quoi que ce soit. Un fournisseur impayé par l'un d'eux, M. L., souhaite poursuivre les deux autres. Par ailleurs, dans une affaire voisine, quatre associés avaient signé des statuts de SARL jamais régularisés faute de dépôt des fonds.",
    questions: [
      {
        num: 1,
        enonce: "Qualifiez la situation des trois artisans.",
        correction: "Il y a société créée de fait : deux ou plusieurs personnes se comportent comme des associés sans avoir constitué entre elles l'une des sociétés reconnues par l'Acte uniforme (art. 864). Les indices sont réunis : apports (l'atelier et le travail), participation aux résultats et aux pertes, comportement d'associés vis-à-vis des tiers sous une enseigne commune.",
      },
      {
        num: 2,
        enonce: "Comment le fournisseur peut-il agir, et avec quelles chances d'atteindre les deux autres artisans ?",
        correction: "Tout intéressé peut demander à la juridiction compétente la reconnaissance de la société créée de fait entre les personnes dont il indique l'identité (art. 866), l'existence se prouvant par tout moyen (art. 867) — factures communes, enseigne, comptes partagés, correspondances. Une fois la société reconnue par le juge, **les règles de la société en nom collectif sont applicables aux associés** (art. 868) : responsabilité indéfinie et solidaire aux dettes sociales. Le fournisseur pourra donc atteindre les deux autres artisans.",
      },
      {
        num: 3,
        enonce: "Qualifiez la seconde situation (statuts de SARL non régularisés).",
        correction: "C'est une société de fait au sens de l'article 865 : les associés ont constitué entre eux une société reconnue par l'Acte uniforme, mais comportant un vice de formation non régularisé — ici l'absence de dépôt des fonds exigé par l'article 313 et de déclaration notariée (art. 314), sans lesquels l'immatriculation ne peut aboutir. Le régime est identique : preuve par tout moyen, reconnaissance judiciaire, application des règles de la SNC aux associés (art. 867-868).",
      },
      {
        num: 4,
        enonce: "Ces deux situations se distinguent-elles de la société en participation ?",
        correction: "Oui, par la volonté. La société en participation résulte d'un choix assumé : les associés **conviennent** qu'elle ne sera pas immatriculée (art. 854), organisent librement leurs rapports (art. 855) et bénéficient du régime protecteur de l'article 861 — chacun n'est engagé que par ses propres contrats, sauf action expresse en qualité d'associé ou immixtion. Les sociétés créée de fait et de fait résultent au contraire d'une négligence ou d'une irrégularité, et leur reconnaissance judiciaire emporte le régime le plus rigoureux, celui de la SNC (art. 868) : responsabilité indéfinie et solidaire pour tous, sans la protection de l'article 861.",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 10,
  id: 'ue3-chapitre-10',
  titre: "Sociétés particulières : participation, GIE, transformation",
  sousTitre: "AUSCGIE, art. 181-188 et 854-876 · SYSCOHADA, Applications 106-107",
  infoBulle: "La société en participation, sans personnalité morale (propriété des biens, engagement des associés, dissolution par notification), les sociétés créée de fait et de fait, le groupement d'intérêt économique (personnalité morale, solidarité des membres, contribution aux dettes) et la transformation de la société — avec la comptabilité des opérations faites en commun (188, 4631, 182, 2773, 752).",
  loiRef: "AUSCGIE (30 janvier 2014) · SYSCOHADA révisé (AUDCIF)",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Maîtriser le régime de la société en participation : absence de personnalité morale, propriété des biens, engagement des associés, dissolution (art. 854-863)",
    "Distinguer société créée de fait et société de fait et connaître leur régime (art. 864-868)",
    "Connaître le GIE : but auxiliaire, personnalité morale, solidarité des membres, contribution aux dettes, émission d'obligations (art. 869-876)",
    "Appliquer les règles de la transformation : absence de personne morale nouvelle, non-rétroactivité, comptes, organes, commissaires à la transformation (art. 181-188)",
    "Comptabiliser les opérations faites en commun : comptes de liaison 188, 4631, 182, 2773, quote-part de résultat 752 (Applications 106-107)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Société en participation : non immatriculée par convention des associés, sans personnalité morale ni publicité, preuve par tous moyens ; rapports régis par la SNC à défaut d'organisation différente (art. 854-856).",
    "Chaque associé reste propriétaire des biens qu'il met à disposition ; l'indivision se conventionne ; pas de partage avant dissolution sauf clause contraire (art. 857-860).",
    "Chacun contracte en son nom et est seul engagé ; mais l'action expresse en qualité d'associé ou l'immixtion profitable engagent indéfiniment et solidairement (art. 861).",
    "Dissolution par les causes de la SNC ou, à durée indéterminée, par notification de bonne foi et non faite à contretemps (art. 862-863).",
    "Sociétés créée de fait (comportement d'associés sans société constituée) et de fait (vice de formation non régularisé ou forme non reconnue) : preuve par tout moyen, reconnaissance judiciaire, règles de la SNC (art. 864-868).",
    "GIE : but exclusivement auxiliaire de l'activité de ses membres, constitution possible sans capital, pas de partage de bénéfices par lui-même ; personnalité morale à l'immatriculation ; droits non représentés par des titres négociables (art. 869-872).",
    "GIE : membres tenus sur leur patrimoine propre et solidairement, après mise en demeure vaine du groupement ; contribution fixée par le contrat, à défaut par parts égales ; obligations émissibles seulement si le GIE est composé exclusivement de sociétés autorisées (art. 873-876).",
    "Transformation : pas de personne morale nouvelle, unanimité si la responsabilité devient illimitée, aucun effet rétroactif, comptes selon la nouvelle forme, engagements et sûretés maintenus, commissaires à la transformation en société par actions à peine de nullité (art. 181-188).",
    "Opérations faites en commun : comptes de liaison 188, comptes d'associés 4631, dettes 182 chez le gérant et créances 2773 chez le non-gérant, quote-part de résultat 752, frais avancés par 781 — aucun compte de capital, la participation n'ayant pas de patrimoine.",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du GIE (AUSCGIE)", precision: "art. 181-188 (transformation), 854-863 (société en participation), 864-868 (société créée de fait et société de fait), 869-876 (groupement d'intérêt économique)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Guide d'application, chapitre 33", precision: "Applications 106-107 (opérations faites en commun : comptabilité autonome de la participation et comptabilité intégrée, chez le gérant et chez le non-gérant)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Plan de comptes", precision: "comptes 182, 188, 2773, 4631, 752, 781 ; comptes de gestion et d'immobilisations mouvementés dans les Applications" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE (Acte uniforme révisé du 30 janvier 2014) · SYSCOHADA révisé — Guide d'application et plan de comptes (AUDCIF)",
}

export default chapitre
