import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 3 — CHAPITRE 2 : LA CONSTITUTION SELON LA FORME SOCIALE
// SARL (AUSCGIE art. 309-316), SA (art. 385-410) et défaut de libération
// (art. 774-777). Comptabilisation : mécanique des Applications 58-59 du
// Guide SYSCOHADA (chapitre 1) transposée aux règles propres de chaque forme ;
// comptes vérifiés dans le plan (4616, 4617, 467).
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1',
    question: "Selon l'article 311 de l'AUSCGIE, le capital social minimum de la SARL est, sauf dispositions nationales contraires :",
    options: [
      { id: 'a', texte: "10 000 000 de francs CFA" },
      { id: 'b', texte: "1 000 000 de francs CFA au moins, divisé en parts sociales égales d'une valeur nominale d'au moins 5 000 francs CFA" },
      { id: 'c', texte: "100 000 francs CFA" },
      { id: 'd', texte: "Aucun minimum n'est prévu" },
      { id: 'e', texte: "5 000 000 de francs CFA" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 311 fixe le minimum à un million (1 000 000) de francs CFA, divisé en parts sociales égales dont la valeur nominale ne peut être inférieure à cinq mille (5 000) francs CFA — mais il réserve expressément les « dispositions nationales contraires » : chaque État partie peut fixer un montant différent. Avant de citer ce chiffre comme définitif pour un État donné, il faut vérifier sa législation nationale.",
    articleRef: "AUSCGIE, art. 311",
  },
  {
    id: 'q2',
    question: "Comment les parts de numéraire d'une SARL sont-elles libérées selon l'article 311-1 ?",
    options: [
      { id: 'a', texte: "Intégralement à la souscription, sans exception" },
      { id: 'b', texte: "De la moitié au moins de leur valeur nominale à la souscription, le surplus dans un délai de deux ans à compter de l'immatriculation" },
      { id: 'c', texte: "Du quart au moins à la souscription, le surplus dans les trois ans" },
      { id: 'd', texte: "Librement, selon le calendrier fixé par le gérant" },
      { id: 'e', texte: "Dans les cinq ans de la constitution" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 311-1 impose la souscription intégrale des parts par les associés ; les parts d'apports en nature sont intégralement libérées ; les parts de numéraire sont libérées à la souscription de la moitié au moins de leur valeur nominale, le surplus intervenant en une ou plusieurs fois dans un délai de deux ans à compter de l'immatriculation au RCCM, selon les modalités des statuts. C'est la dérogation propre à la SARL au principe de libération intégrale de l'article 41.",
    articleRef: "AUSCGIE, art. 311-1",
  },
  {
    id: 'q3',
    question: "Dans une SARL, l'intervention d'un commissaire aux apports est obligatoire pour les apports en nature :",
    options: [
      { id: 'a', texte: "Dans tous les cas, sans seuil" },
      { id: 'b', texte: "Dès que la valeur de l'apport considéré, ou de l'ensemble des apports en nature, est supérieure à 5 000 000 de francs CFA — et toujours pour les avantages particuliers" },
      { id: 'c', texte: "Jamais : les associés évaluent seuls" },
      { id: 'd', texte: "Uniquement si un associé le demande" },
      { id: 'e', texte: "Uniquement au-delà de 10 000 000 de francs CFA" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 312 impose le contrôle du commissaire aux apports dès que la valeur de l'apport en nature considéré, ou celle de l'ensemble des apports en nature, dépasse cinq millions (5 000 000) de francs CFA ; l'évaluation des avantages particuliers est, elle, obligatoirement contrôlée. À défaut de commissaire, ou si la valeur retenue diffère de celle qu'il propose, les associés sont solidairement responsables pendant cinq ans, à l'égard des tiers, de la valeur attribuée aux apports en nature.",
    articleRef: "AUSCGIE, art. 312",
  },
  {
    id: 'q4',
    question: "Les fonds provenant de la libération des parts d'une SARL en formation sont :",
    options: [
      { id: 'a', texte: "Remis directement au gérant, qui peut en disposer aussitôt" },
      { id: 'b', texte: "Déposés immédiatement en banque, dans un établissement de crédit ou de microfinance agréé, ou chez un notaire, et indisponibles jusqu'à l'immatriculation au RCCM" },
      { id: 'c', texte: "Conservés en caisse par le fondateur" },
      { id: 'd', texte: "Versés au greffe du tribunal" },
      { id: 'e', texte: "Placés obligatoirement en titres d'État" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 313 impose le dépôt immédiat par le fondateur, contre récépissé, dans un compte ouvert au nom de la société en formation (banque, établissement de crédit ou de microfinance dûment agréé) ou en l'étude d'un notaire. L'article 314 ajoute que la libération et le dépôt sont constatés par une déclaration notariée de souscription et de versement, et que les fonds sont indisponibles jusqu'au jour de l'immatriculation au RCCM — date à laquelle ils sont mis à la disposition du ou des gérants.",
    articleRef: "AUSCGIE, art. 313 et 314",
  },
  {
    id: 'q5',
    question: "Si la SARL n'est pas immatriculée dans les six mois du premier dépôt des fonds, que peuvent faire les apporteurs ?",
    options: [
      { id: 'a', texte: "Rien : les fonds restent bloqués indéfiniment" },
      { id: 'b', texte: "Demander au président de la juridiction compétente l'autorisation de retirer le montant de leurs apports, individuellement ou par mandataire" },
      { id: 'c', texte: "Retirer les fonds librement au guichet" },
      { id: 'd', texte: "Saisir uniquement le notaire" },
      { id: 'e', texte: "Convertir leurs apports en prêt à la société" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 314, dernier alinéa : à défaut d'immatriculation au RCCM dans le délai de six mois à compter du premier dépôt, les apporteurs peuvent, soit individuellement, soit par mandataire les représentant collectivement, demander au président de la juridiction compétente l'autorisation de retirer le montant de leurs apports.",
    articleRef: "AUSCGIE, art. 314",
  },
  {
    id: 'q6',
    question: "Le capital social minimum de la société anonyme est fixé par l'article 387 de l'AUSCGIE à :",
    options: [
      { id: 'a', texte: "1 000 000 de francs CFA" },
      { id: 'b', texte: "10 000 000 de francs CFA, divisé en actions dont le montant nominal est librement fixé par les statuts" },
      { id: 'c', texte: "100 000 000 de francs CFA pour toutes les SA" },
      { id: 'd', texte: "25 000 000 de francs CFA" },
      { id: 'e', texte: "Aucun minimum" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 387 fixe le capital minimum de la SA à dix millions (10 000 000) de francs CFA, divisé en actions dont le montant nominal — exprimé en nombre entier — est librement fixé par les statuts. Le minimum de 100 000 000 concerne les SA faisant appel public à l'épargne (art. 824). La SA peut ne comprendre qu'un seul actionnaire (art. 385).",
    articleRef: "AUSCGIE, art. 385 et 387",
  },
  {
    id: 'q7',
    question: "Comment les actions de numéraire d'une SA sont-elles libérées à la constitution ?",
    options: [
      { id: 'a', texte: "Intégralement, sans dérogation possible" },
      { id: 'b', texte: "D'un quart au moins de leur valeur nominale à la souscription, le surplus dans un délai maximal de trois ans à compter de l'immatriculation" },
      { id: 'c', texte: "De la moitié au moins, le solde dans les deux ans" },
      { id: 'd', texte: "Au gré des actionnaires" },
      { id: 'e', texte: "D'un dixième à la souscription" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 389 : les actions de numéraire sont libérées, lors de la souscription, d'un quart au moins de leur valeur nominale ; la libération du surplus intervient dans un délai qui ne peut excéder trois ans à compter de l'immatriculation au RCCM, selon les modalités définies par les statuts ou par une décision du conseil d'administration ou de l'administrateur général. Le capital doit par ailleurs être entièrement souscrit avant la signature des statuts (art. 388).",
    articleRef: "AUSCGIE, art. 388 et 389",
  },
  {
    id: 'q8',
    question: "Tant que le capital d'une SA n'est pas entièrement libéré, la société ne peut :",
    options: [
      { id: 'a', texte: "Distribuer aucun salaire" },
      { id: 'b', texte: "Ni augmenter son capital — sauf par apports en nature — ni émettre des obligations" },
      { id: 'c', texte: "Tenir d'assemblée générale" },
      { id: 'd', texte: "Conclure aucun contrat commercial" },
      { id: 'e', texte: "Nommer de commissaire aux comptes" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 389, avant-dernier alinéa : tant que le capital n'est pas entièrement libéré, la société ne peut ni augmenter son capital — sauf si l'augmentation est réalisée par des apports en nature — ni émettre des obligations. En outre, les actions de numéraire non intégralement libérées restent obligatoirement nominatives, et les actions ne peuvent jamais représenter des apports en industrie.",
    articleRef: "AUSCGIE, art. 389",
  },
  {
    id: 'q9',
    question: "Dans quel délai les fonds provenant de la souscription des actions de numéraire d'une SA doivent-ils être déposés ?",
    options: [
      { id: 'a', texte: "Huit jours à compter de la réception des fonds, chez un notaire ou dans un établissement de crédit ou de microfinance agréé de l'État partie du siège, sur un compte spécial au nom de la société en formation" },
      { id: 'b', texte: "Un mois à compter de la signature des statuts" },
      { id: 'c', texte: "Trois jours ouvrables, à la caisse de la société" },
      { id: 'd', texte: "Aucun délai n'est fixé" },
      { id: 'e', texte: "Quinze jours, au greffe" },
    ],
    reponseCorrecte: 'a',
    explication: "L'article 393 : les fonds sont déposés par les personnes qui les ont reçus, pour le compte de la société en formation, chez un notaire ou dans un établissement de crédit ou de microfinance dûment agréé domicilié dans l'État partie du siège, sur un compte spécial ouvert au nom de la société — dans un délai de huit jours à compter de la réception des fonds, avec remise d'une liste des souscripteurs et de leurs versements.",
    articleRef: "AUSCGIE, art. 393",
  },
  {
    id: 'q10',
    question: "Quand le retrait des fonds d'une SA en formation peut-il avoir lieu ?",
    options: [
      { id: 'a', texte: "Dès la signature des statuts" },
      { id: 'b', texte: "Après l'immatriculation au RCCM, sur présentation au dépositaire du certificat attestant l'immatriculation ; à défaut d'immatriculation six mois après le versement, tout souscripteur peut demander en référé la restitution" },
      { id: 'c', texte: "Dès la déclaration notariée de souscription et de versement" },
      { id: 'd', texte: "À la première assemblée générale ordinaire" },
      { id: 'e', texte: "À tout moment, sur simple demande du fondateur" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 398 : le retrait ne peut avoir lieu qu'après l'immatriculation au RCCM ; il est effectué par le président-directeur général, le directeur général ou l'administrateur général sur présentation du certificat d'immatriculation. Six mois après le versement, si la société n'est pas immatriculée, tout souscripteur peut demander en référé la nomination d'un administrateur chargé de retirer les fonds pour les restituer aux souscripteurs.",
    articleRef: "AUSCGIE, art. 398",
  },
  {
    id: 'q11',
    question: "Dans une SA constituée avec apports en nature, le contrôle du commissaire aux apports est :",
    options: [
      { id: 'a', texte: "Facultatif en dessous de 5 000 000 de francs CFA, comme en SARL" },
      { id: 'b', texte: "Obligatoire pour la valeur de tout apport en nature et de tout avantage particulier, sans seuil" },
      { id: 'c', texte: "Remplacé par l'avis du conseil d'administration" },
      { id: 'd', texte: "Réservé aux SA faisant appel public à l'épargne" },
      { id: 'e', texte: "Effectué par le greffier" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 400 : la valeur des apports en nature et/ou les avantages particuliers « doivent être contrôlés par un commissaire aux apports », choisi sur la liste des commissaires aux comptes et désigné à l'unanimité par les futurs associés ou, à défaut, par la juridiction compétente. Contrairement à la SARL (seuil de 5 000 000, art. 312), aucun seuil n'exonère la SA de ce contrôle. Son rapport, annexé aux statuts, atteste que la valeur des apports correspond au moins à la valeur du nominal des actions à émettre (art. 401, 403).",
    articleRef: "AUSCGIE, art. 400-403",
  },
  {
    id: 'q12',
    question: "Lors du vote de l'assemblée générale constitutive sur l'évaluation d'un apport en nature, l'apporteur concerné :",
    options: [
      { id: 'a', texte: "Vote normalement, comme tout souscripteur" },
      { id: 'b', texte: "N'a pas voix délibérative, ni pour lui-même ni comme mandataire, et ses actions sont déduites pour le calcul du quorum et de la majorité" },
      { id: 'c', texte: "Dispose d'un droit de veto" },
      { id: 'd', texte: "Vote uniquement sur les apports des autres" },
      { id: 'e', texte: "Doit s'abstenir seulement s'il est également fondateur" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 408 : chaque apport en nature et chaque avantage particulier fait l'objet d'un vote spécial de l'assemblée ; les actions de l'apporteur ou du bénéficiaire, même s'il est aussi souscripteur en numéraire, ne sont pas prises en compte pour le quorum et la majorité, et il n'a voix délibérative ni pour lui-même ni comme mandataire. L'assemblée ne peut réduire la valeur des apports qu'à l'unanimité des souscripteurs et avec le consentement exprès de l'apporteur (art. 409).",
    articleRef: "AUSCGIE, art. 408 et 409",
  },
  {
    id: 'q13',
    question: "L'assemblée générale constitutive de la SA délibère valablement, sur première convocation, si les souscripteurs présents ou représentés possèdent au moins :",
    options: [
      { id: 'a', texte: "Le quart des actions" },
      { id: 'b', texte: "La moitié des actions ; à défaut, le quart sur deuxième et troisième convocations — et elle statue à la majorité des deux tiers des voix" },
      { id: 'c', texte: "Les trois quarts des actions" },
      { id: 'd', texte: "La totalité des actions" },
      { id: 'e', texte: "Aucun quorum n'est exigé" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 405 fixe le quorum : moitié des actions sur première convocation, quart sur deuxième convocation, et même quorum du quart sur troisième convocation. L'article 406 : l'assemblée statue à la majorité des deux tiers des voix des souscripteurs présents ou représentés — les bulletins blancs n'étant pas pris en compte —, sous réserve des votes spéciaux (art. 409 et 410, 2°, notamment la modification des statuts qui exige l'unanimité).",
    articleRef: "AUSCGIE, art. 405, 406 et 410",
  },
  {
    id: 'q14',
    question: "Une SA au capital de 40 000 000 (4 000 actions de 10 000) libère ses actions de numéraire du minimum légal à la souscription. Quel montant est appelé, et où figure le solde ?",
    options: [
      { id: 'a', texte: "20 000 000 appelés ; solde en compte 4616" },
      { id: 'b', texte: "10 000 000 appelés (le quart) ; les 30 000 000 non appelés figurent au débit du compte 109 en regard du crédit de 1011" },
      { id: 'c', texte: "40 000 000 appelés immédiatement" },
      { id: 'd', texte: "10 000 000 appelés ; le solde est inscrit en report à nouveau" },
      { id: 'e', texte: "Rien n'est appelé : la libération est libre" },
    ],
    reponseCorrecte: 'b',
    explication: "Minimum légal SA : le quart (art. 389), soit 40 000 000 × 1/4 = 10 000 000 appelés (4613 puis 1012 → 1013 au versement). La fraction souscrite non appelée, 30 000 000, est portée au débit de 109 — Apporteurs, capital souscrit, non appelé, par le crédit de 1011 — Capital souscrit, non appelé, selon la mécanique de l'Application 59. Elle devra être appelée dans les trois ans de l'immatriculation.",
    articleRef: "AUSCGIE, art. 389 ; SYSCOHADA, Application 59",
  },
  {
    id: 'q15',
    question: "En cas de non-paiement des sommes appelées sur des actions, la première démarche de la société selon l'article 775 est :",
    options: [
      { id: 'a', texte: "La vente immédiate des actions en bourse" },
      { id: 'b', texte: "Une mise en demeure par lettre au porteur contre récépissé ou lettre recommandée avec avis de réception ; un mois après, restée sans effet, la société poursuit de sa propre initiative la vente des actions" },
      { id: 'c', texte: "La saisie des biens personnels de l'actionnaire" },
      { id: 'd', texte: "L'annulation pure et simple des actions" },
      { id: 'e', texte: "L'exclusion votée en assemblée générale ordinaire" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 775 organise la procédure : mise en demeure formelle ; un mois après, restée sans effet, la société poursuit de sa propre initiative la vente des actions. À compter du même délai, les actions non libérées cessent de donner droit au vote (et sont déduites du quorum et des majorités), et le droit au dividende comme le droit préférentiel de souscription sont suspendus jusqu'au paiement.",
    articleRef: "AUSCGIE, art. 775",
  },
  {
    id: 'q16',
    question: "Comment la vente des actions de l'actionnaire défaillant s'opère-t-elle (art. 776) ?",
    options: [
      { id: 'a', texte: "De gré à gré, au prix fixé par le conseil d'administration" },
      { id: 'b', texte: "En bourse pour les actions cotées ; aux enchères publiques par un notaire pour les actions non cotées, après publication et information du débiteur" },
      { id: 'c', texte: "Par adjudication au plus offrant des autres actionnaires uniquement" },
      { id: 'd', texte: "Par rachat obligatoire de la société elle-même" },
      { id: 'e', texte: "Par tirage au sort" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 776 : la vente des actions cotées s'effectue en bourse ; celle des actions non cotées, aux enchères publiques par un notaire. La société publie les numéros des actions mises en vente dans un journal d'annonces légales trente jours après la mise en demeure, avise le débiteur (et ses codébiteurs), et ne peut vendre moins de quinze jours après cet avis. L'actionnaire défaillant reste débiteur ou profite de la différence ; les frais de la vente sont à sa charge.",
    articleRef: "AUSCGIE, art. 776",
  },
  {
    id: 'q17',
    question: "Qui est tenu du montant non libéré d'une action selon l'article 777 ?",
    options: [
      { id: 'a', texte: "Le seul actionnaire actuel" },
      { id: 'b', texte: "L'actionnaire défaillant, les cessionnaires successifs et les souscripteurs, tenus solidairement — la charge définitive incombant au dernier titulaire" },
      { id: 'c', texte: "La société elle-même" },
      { id: 'd', texte: "Le commissaire aux comptes" },
      { id: 'e', texte: "Les administrateurs, sur leurs deniers personnels" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 777 institue une solidarité : l'actionnaire défaillant, les cessionnaires successifs et les souscripteurs sont tenus solidairement du montant non libéré. La société peut agir contre eux avant, après ou en même temps que la vente, pour la somme due et le remboursement des frais. Celui qui a désintéressé la société dispose d'un recours pour le tout contre les titulaires successifs, la charge définitive incombant au dernier d'entre eux.",
    articleRef: "AUSCGIE, art. 777",
  },
  {
    id: 'q18',
    question: "Quel compte du plan SYSCOHADA reçoit la créance sur un apporteur qui n'a pas répondu à l'appel de capital ?",
    options: [
      { id: 'a', texte: "4616 — Apporteurs, versements anticipés" },
      { id: 'b', texte: "4617 — Apporteurs défaillants" },
      { id: 'c', texte: "462 — Associés, comptes courants" },
      { id: 'd', texte: "465 — Associés, dividendes à payer" },
      { id: 'e', texte: "409 — Fournisseurs débiteurs" },
    ],
    reponseCorrecte: 'b',
    explication: "Le plan de comptes prévoit le compte 4617 — Apporteurs défaillants : la fraction appelée et non versée par l'associé défaillant y est transférée depuis 4613, où elle est suivie jusqu'au dénouement (exécution de la vente des titres prévue aux articles 775-776, imputation des frais et intérêts, reversement du solde éventuel). Le compte 4616 enregistre au contraire les versements reçus par anticipation, et le 467 le restant dû sur capital appelé.",
    articleRef: "Plan de comptes SYSCOHADA — comptes 4613, 4616, 4617, 467",
  },
  {
    id: 'q19',
    question: "Une SARL reçoit un apport en nature de 6 500 000 francs CFA (machine unique). Un commissaire aux apports est-il requis ?",
    options: [
      { id: 'a', texte: "Non : le seuil ne s'applique qu'aux SA" },
      { id: 'b', texte: "Oui : la valeur de l'apport excède le seuil de 5 000 000 de francs CFA fixé par l'article 312" },
      { id: 'c', texte: "Non, si tous les associés sont d'accord sur la valeur" },
      { id: 'd', texte: "Oui, mais seulement si un créancier l'exige" },
      { id: 'e', texte: "Non : les machines sont dispensées d'évaluation" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 312 impose le contrôle d'un commissaire aux apports dès que la valeur de l'apport en nature considéré — ou de l'ensemble des apports en nature — dépasse 5 000 000 de francs CFA : c'est le cas ici (6 500 000). Son rapport, annexé aux statuts, atteste que la valeur des apports correspond au moins au nominal des parts à émettre. À défaut, ou si la valeur retenue diffère de la sienne, les associés sont solidairement responsables de cette valeur envers les tiers pendant cinq ans.",
    articleRef: "AUSCGIE, art. 312",
  },
  {
    id: 'q20',
    question: "Les actions de numéraire d'une SA non intégralement libérées peuvent-elles être au porteur ?",
    options: [
      { id: 'a', texte: "Oui, librement" },
      { id: 'b', texte: "Non : elles doivent rester sous la forme nominative tant qu'elles ne sont pas intégralement libérées" },
      { id: 'c', texte: "Oui, avec l'accord du conseil d'administration" },
      { id: 'd', texte: "Oui, si elles sont cotées" },
      { id: 'e', texte: "La forme des actions est indifférente à la libération" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 389, alinéa 3 : les actions représentant des apports en numéraire non intégralement libérées doivent rester sous la forme nominative. La raison est pratique : la société doit pouvoir identifier à tout moment le débiteur du solde de libération — identification qui fonde aussi la solidarité des titulaires successifs organisée par l'article 777.",
    articleRef: "AUSCGIE, art. 389",
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
        texte: "La société à responsabilité limitée est celle « dans laquelle les associés ne sont responsables des dettes sociales qu'à concurrence de leurs apports et dont les droits sont représentés par des parts sociales » ; elle peut être instituée par une personne physique ou morale — la SARL unipersonnelle — ou entre plusieurs (art. 309). Sa dénomination sociale est immédiatement précédée ou suivie des mots « société à responsabilité limitée » ou du sigle « S.A.R.L. » (art. 310).",
      },
      {
        type: 'filet',
        titre: "Capital minimum : 1 000 000 FCFA... sauf dispositions nationales contraires (art. 311)",
        texte: "« Sauf dispositions nationales contraires, le capital social doit être d'un million (1 000 000) de francs CFA au moins. Il est divisé en parts sociales égales dont la valeur nominale ne peut être inférieure à cinq mille (5 000) francs CFA. » La réserve initiale est essentielle : chaque État partie peut fixer un montant différent — avant de citer le chiffre pour un État donné, vérifier sa législation nationale.",
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
        note: "C'est la dérogation propre à la SARL au principe de libération intégrale posé par l'article 41 (chapitre 1) — la mécanique comptable est celle de la libération fractionnée : comptes 109, 1011/1012/1013, 4613 (Application 59).",
      },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
    ],
  },
  {
    numero: '2.2',
    titre: "La SARL : contrôle des apports en nature et dépôt des fonds",
    navLabel: "SARL : contrôle et dépôt",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les statuts doivent nécessairement contenir l'évaluation de chaque apport en nature et la description — le cas échéant l'évaluation — des avantages particuliers stipulés (art. 312, al. 1er). Le contrôle d'un **commissaire aux apports** est obligatoire dès que la valeur de l'apport en nature considéré, ou de l'ensemble des apports en nature, excède **cinq millions (5 000 000) de francs CFA** ; il l'est toujours pour les avantages particuliers. Choisi sur la liste des commissaires aux comptes, désigné à l'unanimité des futurs associés ou, à défaut, par la juridiction compétente, il établit sous sa responsabilité un rapport annexé aux statuts qui décrit chaque apport, indique le mode d'évaluation et **atteste que la valeur des apports correspond au moins à la valeur du nominal des parts à émettre**.",
      },
      {
        type: 'filet',
        titre: "La sanction : cinq ans de responsabilité solidaire (art. 312, al. 7)",
        texte: "Lorsqu'il n'y a pas eu de commissaire aux apports, ou lorsque la valeur retenue diffère de celle qu'il a proposée, les associés sont **solidairement responsables pendant cinq ans, à l'égard des tiers, de la valeur attribuée aux apports en nature**. L'obligation de garantie vise la valeur des apports au moment de la constitution (ou de l'augmentation de capital), non le maintien de cette valeur.",
      },
      {
        type: 'carte',
        titre: "Dépôt, indisponibilité et retrait des fonds (art. 313-314)",
        liste: [
          "**Dépôt immédiat** par le fondateur des fonds provenant de la libération des parts, contre récépissé, dans un compte ouvert au nom de la société en formation — banque, établissement de crédit ou de microfinance dûment agréé — ou en l'étude d'un notaire ; mention en est portée dans les statuts (art. 313).",
          "**Constat notarié** : sauf dispositions nationales contraires, libération et dépôt sont constatés par un notaire du ressort du siège, au moyen d'une **déclaration notariée de souscription et de versement** listant les souscripteurs et les sommes versées par chacun (art. 314, al. 1er).",
          "**Indisponibilité** : les fonds sont indisponibles jusqu'au jour de l'immatriculation au RCCM ; à compter de ce jour, ils sont mis à la disposition du ou des gérants régulièrement nommés (art. 314, al. 2).",
          "**Défaut d'immatriculation** : six mois après le premier dépôt, les apporteurs peuvent — individuellement ou par mandataire commun — demander au président de la juridiction compétente l'autorisation de retirer le montant de leurs apports (art. 314, al. 3).",
        ],
      },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[4] },
    ],
  },
  {
    numero: '2.3',
    titre: "La SA : capital, souscription intégrale et libération du quart",
    navLabel: "SA : capital",
    blocs: [
      {
        type: 'paragraphe',
        texte: "La société anonyme est celle « dans laquelle les actionnaires ne sont responsables des dettes sociales qu'à concurrence de leurs apports et dont les droits des actionnaires sont représentés par des actions » ; elle peut ne comprendre qu'un seul actionnaire (art. 385). Le capital minimum est de **dix millions (10 000 000) de francs CFA**, divisé en actions dont le montant nominal — un nombre entier — est librement fixé par les statuts (art. 387) ; pour les sociétés dont les titres sont placés dans le public, l'article 824 porte ce minimum à cent millions. Le capital doit être **entièrement souscrit avant la date de signature des statuts** (art. 388).",
      },
      {
        type: 'carte',
        titre: "La libération des actions de numéraire (art. 389)",
        liste: [
          "**Un quart au moins** de la valeur nominale libéré lors de la souscription.",
          "Surplus libéré dans un délai maximal de **trois ans** à compter de l'immatriculation au RCCM, selon les modalités des statuts ou une décision du conseil d'administration ou de l'administrateur général.",
          "Les actions de numéraire non intégralement libérées restent obligatoirement sous la **forme nominative**.",
          "Tant que le capital n'est pas entièrement libéré : **ni augmentation de capital** (sauf par apports en nature) **ni émission d'obligations**.",
          "Les actions **ne peuvent représenter des apports en industrie** — cohérent avec l'interdiction de l'article 50-1.",
        ],
      },
      {
        type: 'paragraphe',
        texte: "La souscription en numéraire est constatée par un **bulletin de souscription** établi par les fondateurs, daté et signé par le souscripteur qui écrit en toutes lettres le nombre de titres souscrits (art. 390), dressé en deux exemplaires originaux — un pour la société en formation, un pour le notaire (art. 391) — et comportant les mentions de l'article 392 : dénomination, forme, capital à souscrire en distinguant nature et numéraire, siège prévu, nombre et valeur nominale des actions, modalités d'émission, identité du souscripteur et versements effectués, dépositaire des fonds, notaire chargé de la déclaration, et mention de la remise d'une copie au souscripteur.",
      },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[7] },
    ],
  },
  {
    numero: '2.4',
    titre: "La SA : dépôt des fonds, commissaire aux apports et assemblée constitutive",
    navLabel: "SA : formalités",
    blocs: [
      {
        type: 'carte',
        titre: "Le circuit des fonds (art. 393-398)",
        tableau: {
          entetes: ["Étape", "Règle"],
          lignes: [
            ["Dépôt", "Dans les **huit jours** de la réception des fonds, chez un notaire ou dans un établissement de crédit ou de microfinance agréé de l'État partie du siège, sur un **compte spécial** au nom de la société en formation, avec la liste des souscripteurs et de leurs versements (art. 393)."],
            ["Déclaration notariée", "Sur présentation des bulletins et du certificat du dépositaire, le notaire dresse la **déclaration notariée de souscription et de versement**, attestant la conformité des souscriptions et des versements (art. 394)."],
            ["Statuts", "Signés par tous les souscripteurs, en personne ou par mandataire spécialement habilité, **après** l'établissement du certificat du dépositaire (art. 396) ; mentions renforcées de l'article 397 (mode d'administration, premiers organes, forme des actions, clauses d'agrément...)."],
            ["Retrait", "Uniquement **après l'immatriculation** au RCCM, par le PDG, le DG ou l'administrateur général, sur certificat d'immatriculation ; six mois après le versement sans immatriculation, tout souscripteur peut demander en référé la nomination d'un administrateur chargé de restituer les fonds (art. 398)."],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "En présence d'apports en nature ou d'avantages particuliers, le contrôle d'un **commissaire aux apports est obligatoire sans seuil** (art. 400) — c'est la différence majeure avec la SARL et son seuil de 5 000 000. Son rapport décrit chaque apport, en indique la valeur et le mode d'évaluation, et établit que cette valeur correspond au moins au nominal des actions à émettre (art. 401) ; il est annexé aux statuts, et si la valeur retenue diffère de la sienne, les actionnaires sont solidairement responsables de cette valeur envers les tiers pendant cinq ans (art. 403).",
      },
      {
        type: 'carte',
        titre: "L'assemblée générale constitutive (art. 404-410)",
        liste: [
          "Convoquée par les fondateurs après la déclaration notariée, quinze jours au moins avant sa date (art. 404).",
          "**Quorum** : moitié des actions sur première convocation, quart sur deuxième et troisième (art. 405) ; **majorité des deux tiers** des voix, bulletins blancs non comptés (art. 406).",
          "**Vote spécial** sur chaque apport en nature et chaque avantage particulier : l'apporteur ne vote pas, même comme mandataire, et ses actions sont déduites du quorum et de la majorité (art. 408) ; la valeur d'un apport ne peut être réduite qu'à l'**unanimité** des souscripteurs avec le consentement exprès de l'apporteur (art. 409).",
          "L'assemblée **constate** que le capital est entièrement souscrit et libéré dans les conditions des articles 388-389, **adopte** les statuts (modifiables à l'unanimité seulement), **nomme** les premiers administrateurs ou l'administrateur général et le premier commissaire aux comptes (art. 410).",
        ],
      },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[12] },
    ],
  },
  {
    numero: '2.5',
    titre: "Comptabilisation : la constitution d'une SA libérée du quart",
    navLabel: "Écritures SA",
    blocs: [
      {
        type: 'paragraphe',
        texte: "La mécanique comptable est celle du chapitre 1 (Applications 58 et 59), paramétrée par les règles propres de la forme. Illustration : une SA est constituée au capital de **40 000 000** (4 000 actions de numéraire de 10 000), libérée du minimum légal — le quart — à la souscription, les fonds transitant par le notaire.",
      },
      {
        type: 'carte',
        titre: "Souscription et appel du quart",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["109", "", "Apporteurs, capital souscrit, non appelé (3/4)", "30 000 000", ""],
            ["4613", "", "Apporteurs, capital appelé, non versé (1/4)", "10 000 000", ""],
            ["", "1011", "Capital souscrit, non appelé", "", "30 000 000"],
            ["", "1012", "Capital souscrit, appelé, non versé", "", "10 000 000"],
          ],
        },
        note: "Le capital souscrit total (40 000 000) est ventilé entre fraction appelée (1012) et non appelée (1011) ; la créance conditionnelle sur les apporteurs pour la fraction non appelée loge en 109, la créance exigible en 4613.",
      },
      {
        type: 'carte',
        titre: "Libération du quart et virement de capital",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["4732", "", "Mandataires — Notaire", "10 000 000", ""],
            ["", "4613", "Apporteurs, capital appelé, non versé", "", "10 000 000"],
            ["1012", "", "Capital souscrit, appelé, non versé", "10 000 000", ""],
            ["", "1013", "Capital souscrit, appelé, versé, non amorti", "", "10 000 000"],
            ["521", "", "Banques (au reversement par le notaire, net des frais)", "—", ""],
          ],
        },
        note: "Le reversement par le notaire suit le schéma de l'Application 58 : débit 521 pour le net, débit 6324/6325 pour les honoraires et frais d'actes — des charges de l'exercice —, crédit 4732 pour le total. Les appels ultérieurs, dans la limite de trois ans (art. 389), suivent le cycle de l'Application 59 : 4613 à 109, 1011 à 1012, puis 521 à 4613 et 1012 à 1013.",
      },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[19] },
    ],
  },
  {
    numero: '2.6',
    titre: "L'actionnaire défaillant (art. 775-777) et son traitement comptable",
    navLabel: "Défaillance",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le solde des actions est versé « au fur et à mesure des appels du conseil d'administration ou de l'administrateur général », dans le délai maximal de trois ans (art. 774). Si un actionnaire ne répond pas à un appel, l'article 775 organise l'**exécution en bourse ou aux enchères** : la société lui adresse une mise en demeure (lettre au porteur contre récépissé ou recommandée avec avis de réception) ; un mois après, restée sans effet, elle poursuit **de sa propre initiative** la vente des actions. À compter de ce même délai d'un mois, les actions concernées **cessent de donner droit au vote** — elles sont déduites du quorum et des majorités — et le **droit au dividende** comme le **droit préférentiel de souscription** sont suspendus jusqu'au paiement.",
      },
      {
        type: 'carte',
        titre: "La vente forcée (art. 776) et la solidarité (art. 777)",
        liste: [
          "Actions **cotées** : vente en bourse. Actions **non cotées** : enchères publiques par un notaire.",
          "Publicité préalable : publication des numéros des actions dans un journal d'annonces légales trente jours après la mise en demeure ; avis au débiteur et à ses codébiteurs ; vente au plus tôt quinze jours après cet avis.",
          "L'actionnaire défaillant **reste débiteur ou profite de la différence** entre le produit de la vente et sa dette ; les frais de la vente sont à sa charge.",
          "**Solidarité** : le défaillant, les cessionnaires successifs et les souscripteurs sont tenus solidairement du montant non libéré ; celui qui paie dispose d'un recours pour le tout contre les titulaires successifs, la charge définitive incombant au dernier d'entre eux (art. 777).",
        ],
      },
      {
        type: 'carte',
        titre: "Traduction comptable : le compte 4617 — Apporteurs défaillants",
        tableau: {
          entetes: ["Étape", "Écriture"],
          lignes: [
            ["Constat de la défaillance", "La fraction appelée et non versée est transférée : débit 4617 Apporteurs défaillants / crédit 4613 Apporteurs, capital appelé, non versé."],
            ["Vente des titres (art. 776)", "Le produit de la vente est encaissé : débit 521 Banques / crédit 4617."],
            ["Frais et intérêts à la charge du défaillant", "Les frais engagés par la société et l'intérêt de retard, dus par le défaillant, sont portés au débit de 4617 (les frais ayant été enregistrés en charges, leur récupération et l'intérêt sont constatés en produits)."],
            ["Dénouement", "Le solde créditeur éventuel de 4617 — le défaillant « profite de la différence » — lui est reversé : débit 4617 / crédit 521. Un solde débiteur reste une créance recouvrable contre lui et ses coobligés solidaires (art. 777)."],
          ],
        },
        note: "Le Guide d'application ne consacre pas d'Application numérotée à la défaillance : le schéma ci-dessus applique le plan de comptes (4617) à la procédure des articles 775-777. Sur le plan du capital, la vente ne change rien : les titres existent toujours, seul leur titulaire change — aucun compte 101 n'est mouvementé.",
      },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[16] },
      { type: 'controle', question: QCM[17] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas-1',
    titre: "Cas 1 — LUALABA HOLDING SA : constitution libérée du quart",
    contexte: "LUALABA HOLDING SA est constituée au capital de 80 000 000 FC (8 000 actions de numéraire de 10 000 FC), intégralement souscrit avant la signature des statuts. Les actions sont libérées du quart à la souscription, les fonds étant déposés chez le notaire, qui les reversera après l'immatriculation sous déduction de 3 000 000 d'honoraires et frais d'actes (2 600 000 d'honoraires, 400 000 de frais d'actes). Dix-huit mois plus tard, le conseil d'administration appelle un deuxième quart.",
    questions: [
      {
        num: 1,
        enonce: "Vérifiez la régularité de l'opération au regard des articles 387 à 389 de l'AUSCGIE.",
        correction: "Capital de 80 000 000 ≥ minimum de 10 000 000 (art. 387) ; souscription intégrale avant signature des statuts (art. 388) ; libération du quart au moins à la souscription — 20 000 000 — avec surplus à libérer dans les trois ans de l'immatriculation (art. 389) : l'opération est régulière. Conséquences accessoires : les actions restent nominatives tant qu'elles ne sont pas intégralement libérées, et la société ne peut ni augmenter son capital (sauf apports en nature) ni émettre d'obligations avant libération intégrale.",
      },
      {
        num: 2,
        enonce: "Passez les écritures de souscription et d'appel du premier quart.",
        correction: "Débit 109 Apporteurs, capital souscrit, non appelé 60 000 000 (les trois quarts) ; débit 4613 Apporteurs, capital appelé, non versé 20 000 000 (le quart) ; crédit 1011 Capital souscrit, non appelé 60 000 000 ; crédit 1012 Capital souscrit, appelé, non versé 20 000 000.",
      },
      {
        num: 3,
        enonce: "Passez les écritures de libération du premier quart chez le notaire, puis du reversement des fonds après immatriculation.",
        correction: "Réception par le notaire : débit 4732 Mandataires — Notaire 20 000 000 / crédit 4613 pour 20 000 000, puis virement débit 1012 / crédit 1013 pour 20 000 000. Reversement (après immatriculation, art. 398) : débit 521 Banques 17 000 000 ; débit 6324 Honoraires des professions réglementées 2 600 000 ; débit 6325 Frais d'actes et de contentieux 400 000 ; crédit 4732 pour 20 000 000. Les frais de constitution sont des charges de l'exercice (SYSCOHADA révisé).",
      },
      {
        num: 4,
        enonce: "Passez les écritures de l'appel et du versement du deuxième quart.",
        correction: "Appel : débit 4613 20 000 000 / crédit 109 20 000 000, et virement débit 1011 / crédit 1012 pour 20 000 000. Versement : débit 521 Banques 20 000 000 / crédit 4613 pour 20 000 000, puis débit 1012 / crédit 1013 pour 20 000 000. Après ces opérations : 1013 = 40 000 000 ; 1011 = 40 000 000 ; 109 = 40 000 000 (moitié restant à appeler, dans la limite des trois ans de l'article 389).",
      },
      {
        num: 5,
        enonce: "La société souhaite, avant l'appel du solde, émettre un emprunt obligataire pour financer un projet. Est-ce possible ?",
        correction: "Non. L'article 389, avant-dernier alinéa, interdit à la société, tant que le capital n'est pas entièrement libéré, d'augmenter son capital — sauf par apports en nature — et d'émettre des obligations. La société doit d'abord appeler et obtenir la libération du solde (dans la limite des trois ans), avant toute émission obligataire (qui sera étudiée au chapitre 6).",
      },
    ],
  },
  {
    id: 'cas-2',
    titre: "Cas 2 — MAI-NDOMBE SARL : apports en nature et commissaire aux apports",
    contexte: "Trois associés constituent MAI-NDOMBE SARL au capital de 24 000 000 FC (parts de 10 000 FC) : Mme A. apporte un entrepôt évalué à 9 000 000 ; M. B. apporte un véhicule utilitaire évalué à 3 500 000 ; M. C. souscrit 11 500 000 en numéraire, libérés de moitié à la souscription. Les fonds sont déposés en banque sur un compte ouvert au nom de la société en formation.",
    questions: [
      {
        num: 1,
        enonce: "Un commissaire aux apports est-il obligatoire ? Analysez au regard de l'article 312.",
        correction: "Oui. Le contrôle est requis dès que la valeur de l'apport en nature considéré, ou de l'ensemble des apports en nature, excède 5 000 000 FCFA. L'entrepôt (9 000 000) dépasse à lui seul le seuil, et l'ensemble des apports en nature (12 500 000) le dépasse également. Le commissaire, choisi sur la liste des commissaires aux comptes et désigné à l'unanimité des futurs associés (à défaut, par la juridiction compétente), établit un rapport annexé aux statuts attestant que la valeur des apports correspond au moins au nominal des parts à émettre.",
      },
      {
        num: 2,
        enonce: "Les associés retiennent pour l'entrepôt une valeur de 10 000 000, supérieure à celle proposée par le commissaire aux apports (9 000 000). Quelles conséquences ?",
        correction: "L'évaluation retenue peut différer de celle du commissaire, mais l'article 312, alinéa 7, attache à cet écart une sanction : les associés sont solidairement responsables pendant cinq ans, à l'égard des tiers, de la valeur attribuée aux apports en nature. La garantie porte sur la valeur au moment de la constitution, non sur son maintien ultérieur.",
      },
      {
        num: 3,
        enonce: "Vérifiez la régularité de la libération des apports et passez les écritures de souscription et d'appel (valeurs initiales : entrepôt 9 000 000, véhicule 3 500 000).",
        correction: "Apports en nature : libération intégrale obligatoire dès la souscription (art. 311-1, al. 1er) — c'est le cas. Numéraire : moitié au moins à la souscription (art. 311-1, al. 2) — 5 750 000 appelés, 5 750 000 dans les deux ans de l'immatriculation. Écritures : débit 4611 Apporteurs, apports en nature 12 500 000 ; débit 4612 Apporteurs, apports en numéraire 5 750 000 ; débit 109 Apporteurs, capital souscrit, non appelé 5 750 000 ; crédit 1011 Capital souscrit, non appelé 24 000 000. Appel de la fraction exigible : débit 4613 pour 18 250 000 / crédit 4611 pour 12 500 000 et crédit 4612 pour 5 750 000 ; virement débit 1011 / crédit 1012 pour 18 250 000.",
      },
      {
        num: 4,
        enonce: "Passez les écritures de réalisation des apports (nature et numéraire) et le virement de capital.",
        correction: "Nature : débit 2313 (ou 231) Bâtiments 9 000 000 ; débit 2451 (ou 245) Matériel de transport 3 500 000 ; crédit 4613 pour 12 500 000. Numéraire : débit 521 Banques 5 750 000 / crédit 4613 pour 5 750 000 — dépôt immédiat sur le compte de la société en formation (art. 313), fonds indisponibles jusqu'à l'immatriculation (art. 314). Virement : débit 1012 / crédit 1013 pour 18 250 000. Restent 1011 = 5 750 000 et 109 = 5 750 000 pour le solde du numéraire, à appeler dans les deux ans.",
      },
      {
        num: 5,
        enonce: "Quatre mois après le dépôt, la société n'est toujours pas immatriculée et M. C. s'inquiète. Que peut-il faire, et à partir de quand ?",
        correction: "Les fonds sont indisponibles jusqu'à l'immatriculation (art. 314, al. 2). Ce n'est que si la société n'est pas immatriculée dans le délai de six mois à compter du premier dépôt que les apporteurs peuvent — individuellement ou par mandataire commun — demander au président de la juridiction compétente l'autorisation de retirer le montant de leurs apports (art. 314, al. 3). À quatre mois, M. C. doit encore attendre deux mois.",
      },
    ],
  },
  {
    id: 'cas-3',
    titre: "Cas 3 — ARUWIMI SA : l'actionnaire défaillant",
    contexte: "ARUWIMI SA (capital 50 000 000, 5 000 actions de 10 000 libérées du quart à la constitution) appelle le deuxième quart, soit 2 500 par action. M. D., titulaire de 400 actions non cotées, ne verse pas les 1 000 000 appelés malgré la mise en demeure reçue le 05/04/N. Le 10/07/N, ses 400 actions sont vendues aux enchères publiques par un notaire pour 4 600 000. Les frais de vente s'élèvent à 150 000 et l'intérêt de retard dû est arrêté à 30 000.",
    questions: [
      {
        num: 1,
        enonce: "Décrivez la procédure suivie par la société et vérifiez sa régularité (art. 775-776).",
        correction: "Mise en demeure par lettre au porteur contre récépissé ou recommandée avec avis de réception (05/04/N) ; un mois après (05/05/N), restée sans effet, la société peut poursuivre de sa propre initiative la vente. S'agissant d'actions non cotées, la vente s'opère aux enchères publiques par un notaire (art. 776) ; la société doit publier les numéros des actions dans un journal d'annonces légales trente jours après la mise en demeure, aviser M. D., et ne vendre que quinze jours au moins après cet avis — calendrier respecté avec une vente au 10/07/N.",
      },
      {
        num: 2,
        enonce: "Quels droits de M. D. sont affectés entre la mise en demeure et la vente ?",
        correction: "Un mois après la mise en demeure restée sans effet, ses 400 actions cessent de donner droit à l'admission aux votes et sont déduites du calcul du quorum et des majorités ; son droit au dividende et son droit préférentiel de souscription sont suspendus jusqu'au paiement des sommes dues (art. 775, al. 2 et 3).",
      },
      {
        num: 3,
        enonce: "Passez l'écriture de constat de la défaillance et celle de la vente.",
        correction: "Constat : débit 4617 Apporteurs défaillants 1 000 000 / crédit 4613 Apporteurs, capital appelé, non versé 1 000 000 — la créance d'appel change de nature, le capital appelé (1012) n'étant pas modifié. Vente : débit 521 Banques 4 600 000 / crédit 4617 pour 4 600 000. La vente transfère les titres à l'adjudicataire : aucun compte de capital n'est mouvementé.",
      },
      {
        num: 4,
        enonce: "Imputez les frais de vente (150 000) et l'intérêt de retard (30 000), puis déterminez le solde revenant à M. D. et passez l'écriture de reversement.",
        correction: "Frais et intérêts sont à la charge du défaillant (art. 776, al. 3 ; art. 43 pour l'intérêt de plein droit) : débit 4617 pour 180 000, par le crédit des comptes de produits concernés (récupération des frais engagés — préalablement enregistrés en charges — et intérêt de retard en revenus financiers). Décompte du compte 4617 : crédit 4 600 000 (vente) − débit 1 000 000 (solde d'appel) − débit 180 000 (frais et intérêts) = solde créditeur 3 420 000. M. D. « profite de la différence » (art. 776) : débit 4617 3 420 000 / crédit 521 Banques 3 420 000.",
      },
      {
        num: 5,
        enonce: "Si la vente n'avait produit que 900 000, qui la société aurait-elle pu poursuivre pour le solde ?",
        correction: "Le produit (900 000) n'aurait pas couvert la dette (1 000 000 + 180 000 = 1 180 000) : M. D. serait resté débiteur de 280 000. L'article 777 institue une solidarité : le défaillant, les cessionnaires successifs et les souscripteurs sont tenus solidairement du montant non libéré ; la société peut agir contre eux avant, après ou en même temps que la vente, pour la somme due et les frais. Celui qui paie a un recours pour le tout contre les titulaires successifs, la charge définitive incombant au dernier d'entre eux.",
      },
    ],
  },
  {
    id: 'cas-4',
    titre: "Cas 4 — Comparatif SARL / SA : conseil au créateur",
    contexte: "Un entrepreneur veut créer une société de négoce avec un capital de 30 000 000 FC. Il hésite entre la SARL et la SA. Il apportera un immeuble évalué à 12 000 000 ; ses partenaires apporteront 18 000 000 en numéraire, mais souhaitent étaler leurs versements le plus longtemps possible. L'un des partenaires propose en outre de « garantir l'émission de titres négociables » pour lever des fonds rapidement si la SARL est retenue.",
    questions: [
      {
        num: 1,
        enonce: "Comparez les exigences de capital minimum et de libération du numéraire dans les deux formes.",
        correction: "SARL : capital minimum de 1 000 000 FCFA sauf dispositions nationales contraires, parts d'au moins 5 000 (art. 311) ; numéraire libéré de moitié au moins à la souscription, surplus dans les deux ans de l'immatriculation (art. 311-1). SA : capital minimum de 10 000 000 (art. 387) ; numéraire libéré du quart au moins, surplus dans les trois ans (art. 389). Le projet (30 000 000) satisfait les deux minima. Pour l'étalement maximal : la SA permet de ne verser que 4 500 000 sur 18 000 000 à la souscription (le quart) avec trois ans pour le solde, contre 9 000 000 (la moitié) et deux ans en SARL.",
      },
      {
        num: 2,
        enonce: "Comparez le contrôle de l'apport de l'immeuble (12 000 000) dans les deux formes.",
        correction: "En SARL, le commissaire aux apports est requis car la valeur (12 000 000) excède le seuil de 5 000 000 (art. 312). En SA, il est requis sans condition de seuil (art. 400), avec un vote spécial de l'assemblée générale constitutive sur l'apport, duquel l'apporteur est exclu (art. 408). Dans les deux cas, les apports en nature doivent être intégralement libérés dès la souscription et évalués dans les statuts, et un écart avec la valeur proposée par le commissaire engage la responsabilité solidaire de cinq ans envers les tiers (art. 312 ; art. 403 et 409).",
      },
      {
        num: 3,
        enonce: "Que penser de la proposition de « garantir l'émission de titres négociables » en SARL ?",
        correction: "Elle est illicite. L'article 58 réserve l'émission de titres négociables aux sociétés par actions et interdit aux autres sociétés — dont la SARL — tant d'émettre de tels titres que d'en garantir une émission : sont nuls tous contrats conclus, titres émis ou garanties accordées en violation de cette interdiction. Lever des fonds par titres négociables suppose une société par actions.",
      },
      {
        num: 4,
        enonce: "Si la SA est retenue et que les partenaires ne libèrent que le quart, quelles contraintes pèseront sur la société jusqu'à la libération intégrale ?",
        correction: "Trois contraintes de l'article 389 : les actions de numéraire non intégralement libérées restent nominatives ; la société ne peut pas augmenter son capital, sauf par apports en nature ; elle ne peut pas émettre d'obligations. S'y ajoute le risque d'exécution contre tout actionnaire défaillant aux appels (mise en demeure, vente forcée, suspension des droits — art. 775-777), et l'obligation d'achever la libération dans les trois ans de l'immatriculation.",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 2,
  id: 'ue3-chapitre-2',
  titre: "La constitution selon la forme sociale : SARL, SA, incidents de libération",
  sousTitre: "AUSCGIE, art. 309-316 (SARL), 385-410 (SA), 774-777 (défaut de libération)",
  infoBulle: "Les règles de constitution propres à chaque forme : capital et libération de la SARL (moitié, deux ans) et de la SA (quart, trois ans), commissaire aux apports, dépôt et indisponibilité des fonds, assemblée générale constitutive, et le régime de l'actionnaire défaillant avec sa traduction comptable (compte 4617).",
  loiRef: "AUSCGIE (30 janvier 2014) · SYSCOHADA révisé (AUDCIF)",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Connaître le capital minimum et le régime de libération de la SARL (art. 311, 311-1) et de la SA (art. 387-389)",
    "Maîtriser le contrôle des apports en nature : seuil de 5 000 000 en SARL (art. 312), contrôle sans seuil en SA (art. 400-403)",
    "Suivre le circuit des fonds : dépôt, déclaration notariée, indisponibilité, retrait (art. 313-314, 393-398)",
    "Comprendre le rôle et les votes de l'assemblée générale constitutive de la SA (art. 404-410)",
    "Comptabiliser une constitution libérée du quart et le dénouement d'une défaillance d'actionnaire (compte 4617, art. 775-777)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "SARL : capital minimum 1 000 000 FCFA *sauf dispositions nationales contraires*, parts ≥ 5 000 (art. 311) ; numéraire libéré de moitié à la souscription, surplus dans les deux ans de l'immatriculation (art. 311-1) ; apports en nature intégralement libérés.",
    "SARL : commissaire aux apports obligatoire au-delà de 5 000 000 FCFA (apport considéré ou ensemble des apports en nature) et toujours pour les avantages particuliers ; à défaut ou en cas d'écart, responsabilité solidaire des associés pendant cinq ans (art. 312).",
    "SA : capital minimum 10 000 000 FCFA (art. 387), souscription intégrale avant signature des statuts (art. 388), numéraire libéré du quart avec surplus dans les trois ans (art. 389).",
    "Tant que le capital de la SA n'est pas entièrement libéré : actions de numéraire nominatives, pas d'augmentation de capital (sauf nature), pas d'émission d'obligations (art. 389).",
    "SA : commissaire aux apports sans seuil (art. 400) ; assemblée constitutive — quorum moitié puis quart, majorité des deux tiers, vote spécial sur chaque apport dont l'apporteur est exclu, réduction de valeur à l'unanimité seulement (art. 405-410).",
    "Fonds indisponibles jusqu'à l'immatriculation ; restitution possible à défaut d'immatriculation dans les six mois (art. 314, 398).",
    "Défaillance : mise en demeure, puis un mois après, vente forcée (bourse ou enchères notariales), suspension du vote, du dividende et du DPS ; solidarité du défaillant, des cessionnaires successifs et des souscripteurs (art. 775-777).",
    "Comptabilité de la défaillance : transfert 4613 → 4617, encaissement du produit de vente, imputation des frais et intérêts au débit de 4617, reversement du solde au défaillant — le capital (101) n'est jamais mouvementé par la vente.",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du GIE (AUSCGIE)", precision: "art. 309-316 (SARL : capital, libération, commissaire aux apports, dépôt des fonds), 385-410 (SA : capital, souscription, bulletins, dépôt, commissaire aux apports, assemblée constitutive), 774-777 (défaut de libération des actions)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Guide d'application", precision: "Applications 58 et 59 (mécanique de la libération intégrale et fractionnée, transposée aux règles propres de chaque forme)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Plan de comptes", precision: "comptes 109, 1011-1013, 4611-4613, 4616 (versements anticipés), 4617 (apporteurs défaillants), 467, 4732" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE (Acte uniforme révisé du 30 janvier 2014) · SYSCOHADA révisé — Guide d'application et plan de comptes (AUDCIF)",
}

export default chapitre
